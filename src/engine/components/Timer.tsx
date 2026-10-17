import { useEffect, useState } from 'react';
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

/** مؤقت كبير في منتصف الشاشة؛ يومض ويصدر صوتًا عند الانتهاء. */
export function TimerWidget({ t, set }: { t: TimerState; set: (f: (t: TimerState) => TimerState) => void }) {
  const [done, setDone] = useState(false);

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

  if (!t.show) return null;
  return (
    <div id="timerw" className={'show' + (done ? ' done' : '')} role="timer">
      <span id="tval">{clock(t.left)}</span>
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
    </div>
  );
}
