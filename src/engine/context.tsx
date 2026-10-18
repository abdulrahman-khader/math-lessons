import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { HlKey } from './types';
import type { RemoteChart, RemoteFamily, RemoteMcq, RemoteWidget } from './remote';

/** أداة تفاعلية عامة تسجّل نفسها ليتحكم بها الجوال (انظر useRemoteWidget) */
export interface WidgetCtrl {
  get: () => RemoteWidget;
  act: (key: string, v?: number) => void;
}

/** مستكشف الحقائق المترابطة يسجّل نفسه ليتحكم به الجوال */
export interface FamilyCtrl {
  get: () => RemoteFamily;
  set: (v: { a?: number; b?: number; pick?: number }) => void;
}

/** سؤال اختيار من متعدد يسجّل نفسه ليُجاب من الجوال */
export interface McqCtrl {
  el: () => HTMLElement | null;
  get: () => RemoteMcq;
  choose: (o: string) => void;
  award: (team: number) => void;
}

/** رسم تفاعلي يسجّل نفسه في شريحته ليتحكم به الجوال */
export interface ChartCtrl {
  get: () => RemoteChart;
  set: (i: number, v: number) => void;
  setMode?: (m: string) => void;
}

/* ---------- سياق المحرك: ما تحتاجه المكوّنات من الحصة كلها ---------- */

export interface EngineApi {
  nTeams: number;
  teamNames: string[];
  addScore: (team: number, delta: number) => void;
  scores: number[];
  startTimer: (sec: number) => void;
  goto: (slide: number) => void;
  registerSlide: (index: number, api: SlideApi | null) => void;
  /** تُستدعى عند تغيّر حالة شريحة (خطوة، تلميح) ليصل التحديث إلى جهاز التحكم */
  slideChanged: () => void;
}

export const EngineCtx = createContext<EngineApi | null>(null);

export function useEngine(): EngineApi {
  const e = useContext(EngineCtx);
  if (!e) throw new Error('useEngine خارج LessonApp');
  return e;
}

/* ---------- سياق الشريحة: الخطوات والإبراز والتلميح ---------- */

interface StepMeta {
  el: () => HTMLElement | null;
  hl: readonly HlKey[];
  group?: string;
}

export interface SlideApi {
  /** يُظهر الخطوة التالية بترتيب ظهورها في الصفحة. يعيد false إن لم يبقَ شيء. */
  reveal: () => boolean;
  hideAll: () => void;
  /** يُخفي آخر خطوة ظاهرة. يعيد false إن لم تكن خطوة ظاهرة. */
  unreveal: () => boolean;
  toggleHint: () => void;
  /** عدد الخطوات الظاهرة من مجموعها */
  info: () => { shown: number; total: number };
  chart: () => ChartCtrl | null;
  family: () => FamilyCtrl | null;
  widget: () => WidgetCtrl | null;
  /** أسئلة الاختيار في الشريحة بترتيب ظهورها */
  mcqs: () => McqCtrl[];
}

interface SlideState extends SlideApi {
  register: (id: string, meta: StepMeta) => () => void;
  isShown: (id: string) => boolean;
  isGroupOpen: (group: string) => boolean;
  /** مفاتيح الإبراز للخطوات الظاهرة، يقرؤها كل رسم في الشريحة */
  activeHl: ReadonlySet<string>;
  hintOpen: boolean;
  /** عدد الخطوات الظاهرة ومجموعها، لتعطيل أسهم الخطوات عند الطرفين */
  shownCount: number;
  stepTotal: number;
  setChart: (c: ChartCtrl | null) => void;
  setFamily: (c: FamilyCtrl | null) => void;
  setWidget: (c: WidgetCtrl | null) => void;
  registerMcq: (id: string, c: McqCtrl) => () => void;
  /** تغيّرت حالة رسم تفاعلي: أبلغ جهاز التحكم */
  touch: () => void;
}

const SlideCtx = createContext<SlideState | null>(null);

export function useSlide(): SlideState {
  const s = useContext(SlideCtx);
  if (!s) throw new Error('هذا المكوّن يجب أن يكون داخل شريحة');
  return s;
}

/** مجموعة الحل التي تنتمي إليها الخطوة (داخل <Solution>) */
export const GroupCtx = createContext<string | undefined>(undefined);

export function SlideScope({ index, children }: { index: number; children: ReactNode }) {
  const engine = useEngine();
  const steps = useRef(new Map<string, StepMeta>());
  const [shown, setShown] = useState<string[]>([]);
  const shownRef = useRef(shown);
  shownRef.current = shown;
  const [hintOpen, setHintOpen] = useState(false);
  const [stepTotal, setStepTotal] = useState(0);

  const register = useCallback((id: string, meta: StepMeta) => {
    steps.current.set(id, meta);
    setStepTotal(steps.current.size);
    return () => {
      steps.current.delete(id);
      setStepTotal(steps.current.size);
    };
  }, []);

  const reveal = useCallback(() => {
    const pending = [...steps.current.entries()]
      .filter(([id]) => !shownRef.current.includes(id))
      .map(([id, m]) => ({ id, el: m.el() }))
      .filter((x): x is { id: string; el: HTMLElement } => !!x.el)
      .sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    if (!pending.length) return false;
    const next = [...shownRef.current, pending[0].id];
    shownRef.current = next;
    setShown(next);
    // التلميح لما قبل الحل؛ يُغلق عند ظهور الحل فيترك له المساحة
    setHintOpen(false);
    return true;
  }, []);

  const hideAll = useCallback(() => {
    shownRef.current = [];
    setShown([]);
  }, []);

  const unreveal = useCallback(() => {
    if (!shownRef.current.length) return false;
    const next = shownRef.current.slice(0, -1);
    shownRef.current = next;
    setShown(next);
    return true;
  }, []);

  const toggleHint = useCallback(() => setHintOpen((h) => !h), []);
  const info = useCallback(() => ({ shown: shownRef.current.length, total: steps.current.size }), []);
  const chartRef = useRef<ChartCtrl | null>(null);
  const chart = useCallback(() => chartRef.current, []);
  const setChart = useCallback((c: ChartCtrl | null) => {
    chartRef.current = c;
  }, []);
  const widgetRef = useRef<WidgetCtrl | null>(null);
  const widget = useCallback(() => widgetRef.current, []);
  const setWidget = useCallback((c: WidgetCtrl | null) => {
    widgetRef.current = c;
  }, []);
  const familyRef = useRef<FamilyCtrl | null>(null);
  const family = useCallback(() => familyRef.current, []);
  const setFamily = useCallback((c: FamilyCtrl | null) => {
    familyRef.current = c;
  }, []);
  const mcqMap = useRef(new Map<string, McqCtrl>());
  const registerMcq = useCallback((id: string, c: McqCtrl) => {
    mcqMap.current.set(id, c);
    return () => {
      mcqMap.current.delete(id);
    };
  }, []);
  const mcqs = useCallback(
    () =>
      [...mcqMap.current.values()]
        .map((c) => ({ c, el: c.el() }))
        .filter((x): x is { c: McqCtrl; el: HTMLElement } => !!x.el)
        .sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        .map((x) => x.c),
    [],
  );

  useEffect(() => {
    engine.registerSlide(index, { reveal, hideAll, unreveal, toggleHint, info, chart, family, widget, mcqs });
    return () => engine.registerSlide(index, null);
  }, [engine, index, reveal, hideAll, unreveal, toggleHint, info, chart, family, widget, mcqs]);

  const { slideChanged } = engine;
  useEffect(() => slideChanged(), [shown, hintOpen, slideChanged]);

  const value = useMemo<SlideState>(() => {
    const metas = shown.map((id) => steps.current.get(id)).filter((m): m is StepMeta => !!m);
    const activeHl = new Set(metas.flatMap((m) => m.hl));
    const groups = new Set(metas.map((m) => m.group).filter(Boolean));
    return {
      reveal,
      hideAll,
      unreveal,
      shownCount: shown.length,
      stepTotal,
      register,
      isShown: (id) => shown.includes(id),
      isGroupOpen: (g) => groups.has(g),
      activeHl,
      hintOpen,
      toggleHint,
      info,
      chart,
      setChart,
      family,
      setFamily,
      widget,
      setWidget,
      mcqs,
      registerMcq,
      touch: slideChanged,
    };
  }, [shown, hintOpen, stepTotal, reveal, hideAll, unreveal, register, toggleHint, info, chart, setChart, family, setFamily, widget, setWidget, mcqs, registerMcq, slideChanged]);

  return <SlideCtx.Provider value={value}>{children}</SlideCtx.Provider>;
}
