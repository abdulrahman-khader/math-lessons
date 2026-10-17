import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { HlKey } from './types';

/* ---------- سياق المحرك: ما تحتاجه المكوّنات من الحصة كلها ---------- */

export interface EngineApi {
  nTeams: number;
  teamNames: string[];
  addScore: (team: number, delta: number) => void;
  scores: number[];
  startTimer: (sec: number) => void;
  goto: (slide: number) => void;
  registerSlide: (index: number, api: SlideApi | null) => void;
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
}

interface SlideState extends SlideApi {
  register: (id: string, meta: StepMeta) => () => void;
  isShown: (id: string) => boolean;
  isGroupOpen: (group: string) => boolean;
  /** مفاتيح الإبراز للخطوات الظاهرة، يقرؤها كل رسم في الشريحة */
  activeHl: ReadonlySet<string>;
  hintOpen: boolean;
  toggleHint: () => void;
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

  const register = useCallback((id: string, meta: StepMeta) => {
    steps.current.set(id, meta);
    return () => {
      steps.current.delete(id);
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

  useEffect(() => {
    engine.registerSlide(index, { reveal, hideAll });
    return () => engine.registerSlide(index, null);
  }, [engine, index, reveal, hideAll]);

  const value = useMemo<SlideState>(() => {
    const metas = shown.map((id) => steps.current.get(id)).filter((m): m is StepMeta => !!m);
    const activeHl = new Set(metas.flatMap((m) => m.hl));
    const groups = new Set(metas.map((m) => m.group).filter(Boolean));
    return {
      reveal,
      hideAll,
      register,
      isShown: (id) => shown.includes(id),
      isGroupOpen: (g) => groups.has(g),
      activeHl,
      hintOpen,
      toggleHint: () => setHintOpen((h) => !h),
    };
  }, [shown, hintOpen, reveal, hideAll, register]);

  return <SlideCtx.Provider value={value}>{children}</SlideCtx.Provider>;
}
