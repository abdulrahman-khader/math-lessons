import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { clock, duration } from '../digits';
import { sEnd } from '../sound';

export interface TimerState {
  show: boolean;
  left: number;
  run: boolean;
  /** يزيد عند كل تشغيل جديد ليعيد ضبط الإيقاع */
  gen: number;
}

export const TIMER_OFF: TimerState = { show: false, left: 60, run: false, gen: 0 };

export const PRESETS = [30, 60, 120, 180, 300];

/**
 * مكان المؤقت وحجمه، محفوظان بين الحصص.
 * ax وay من −١ إلى ١: موضعه داخل المساحة الفارغة (٠ = الوسط، −١ = الحافة اليسرى/العليا، ١ = اليمنى/السفلى).
 * بهذه النسب يبقى المؤقت داخل الشاشة مهما تغيّر حجمه.
 */
export interface TimerView {
  s: number;
  ax: number;
  ay: number;
}
export const TIMER_VIEW: TimerView = { s: 1, ax: 0, ay: 0 };
export const SCALE_MIN = 0.5;
export const SCALE_MAX = 1.8;
export const SCALE_STEP = 0.15;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const n = (x: unknown, d: number) => (typeof x === 'number' && Number.isFinite(x) ? x : d);
export const fixView = (v: TimerView): TimerView => ({
  s: clamp(Math.round(n(v.s, 1) * 100) / 100, SCALE_MIN, SCALE_MAX),
  ax: clamp(n(v.ax, 0), -1, 1),
  ay: clamp(n(v.ay, 0), -1, 1),
});

interface Props {
  t: TimerState;
  set: (f: (t: TimerState) => TimerState) => void;
  view: TimerView;
  onView: (v: TimerView) => void;
}

/** مؤقت كبير يومض ويصدر صوتًا عند الانتهاء. يُسحب من رقمه إلى أي مكان، ويُكبَّر ويُصغَّر. */
export function TimerWidget({ t, set, view, onView }: Props) {
  const [done, setDone] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  /** المساحة الفارغة حول المؤقت (بوحدات المسرح) لتحويل النسب إلى إزاحة */
  const [free, setFree] = useState({ x: 0, y: 0 });
  /** أثناء السحب يُعرض الموضع محليًا ويُحفظ عند رفع الإصبع */
  const [drag, setDrag] = useState<TimerView | null>(null);
  const start = useRef<{ x: number; y: number; v: TimerView; k: number } | null>(null);
  const v = drag ?? view;

  useEffect(() => {
    if (!t.run) return;
    setDone(false);
    const id = setInterval(() => set((s) => (s.run ? { ...s, left: Math.max(0, s.left - 1), run: s.left - 1 > 0 } : s)), 1000);
    return () => clearInterval(id);
  }, [t.run, t.gen, set]);

  // الوصول إلى الصفر لا يحدث إلا بالعدّ التنازلي؛ كل الإعدادات أكبر من صفر
  useEffect(() => {
    if (t.show && t.left === 0) {
      sEnd();
      setDone(true);
    }
  }, [t.left, t.show]);

  useLayoutEffect(() => {
    const el = box.current;
    // في وضع الجوال (flow) المؤقت ثابت على الشاشة فلا offsetParent له
    const parent = (el?.offsetParent as HTMLElement | null) ?? document.documentElement;
    if (!el) return;
    const measure = () => setFree({ x: Math.max(0, parent.clientWidth - el.offsetWidth * v.s), y: Math.max(0, parent.clientHeight - el.offsetHeight * v.s) });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [t.show, v.s]);

  if (!t.show) return null;
  const tx = (v.ax * free.x) / 2;
  const ty = (v.ay * free.y) / 2;
  const resize = (d: number) => onView(fixView({ ...view, s: view.s + d * SCALE_STEP }));

  return (
    <div id="timerw" ref={box} className={'show' + (done ? ' done' : '')} role="timer" style={{ transform: `translate(${tx}px, ${ty}px) scale(${v.s})` }}>
      <span
        id="tval"
        title="اسحب لتحريك المؤقت"
        onPointerDown={(e) => {
          const el = box.current!;
          // نسبة بكسلات الشاشة إلى وحدات المسرح (المسرح مُحجَّم)
          const k = el.getBoundingClientRect().width / (el.offsetWidth * v.s) || 1;
          start.current = { x: e.clientX, y: e.clientY, v: view, k };
          e.currentTarget.setPointerCapture(e.pointerId);
          e.preventDefault();
        }}
        onPointerMove={(e) => {
          const s0 = start.current;
          if (!s0) return;
          const dx = (e.clientX - s0.x) / s0.k;
          const dy = (e.clientY - s0.y) / s0.k;
          setDrag(fixView({ ...s0.v, ax: free.x ? s0.v.ax + (2 * dx) / free.x : 0, ay: free.y ? s0.v.ay + (2 * dy) / free.y : 0 }));
        }}
        onPointerUp={() => {
          start.current = null;
          if (drag) onView(drag);
          setDrag(null);
        }}
        onPointerCancel={() => {
          start.current = null;
          setDrag(null);
        }}
      >
        {clock(t.left)}
      </span>
      <div className="tbtns">
        {PRESETS.map((s) => (
          <button key={s} onClick={() => set((x) => ({ show: true, left: s, run: true, gen: x.gen + 1 }))}>
            {duration(s).replace(' ', '')}
          </button>
        ))}
        <button onClick={() => set((x) => (x.left > 0 ? { ...x, run: !x.run } : x))}>{t.run ? 'إيقاف' : 'تشغيل'}</button>
        <button aria-label="إغلاق المؤقت" onClick={() => set((x) => ({ ...x, show: false, run: false }))}>
          ✕
        </button>
      </div>
      <div className="tbtns tview">
        <button aria-label="تصغير المؤقت" disabled={view.s <= SCALE_MIN} onClick={() => resize(-1)}>
          تصغير −
        </button>
        <button aria-label="تكبير المؤقت" disabled={view.s >= SCALE_MAX} onClick={() => resize(1)}>
          تكبير +
        </button>
        <button aria-label="المؤقت في الوسط" onClick={() => onView({ ...view, ax: 0, ay: 0 })}>
          الوسط
        </button>
      </div>
    </div>
  );
}
