import { useEffect, useState } from 'react';
import { TIMER_VIEW, type TimerView } from './components/Timer';

/** ما يبقى محفوظًا في المتصفح بين الحصص */
export interface Saved {
  slide: number;
  scores: number[];
  nTeams: number;
  names: string[];
  teacher: boolean;
  muted: boolean;
  wheel: string;
  /** مكان المؤقت وحجمه */
  timerView: TimerView;
}

export const DEFAULT_SAVED: Saved = {
  slide: 0,
  scores: [0, 0, 0, 0],
  nTeams: 2,
  names: ['الصقور', 'النخيل', 'الفرسان', 'النجوم'],
  teacher: true,
  muted: false,
  wheel: '',
  timerView: TIMER_VIEW,
};

function load(key: string): Saved {
  try {
    const s = JSON.parse(localStorage.getItem(key) ?? 'null');
    if (s && typeof s === 'object') return { ...DEFAULT_SAVED, ...s };
  } catch {
    /* التخزين قد يكون محظورًا؛ الدرس يعمل دونه */
  }
  return DEFAULT_SAVED;
}

export function useSaved(lessonId: string) {
  const key = `lesson:${lessonId}`;
  const [initial] = useState(() => load(key));
  const [st, setSt] = useState<Saved>(initial);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(st));
    } catch {
      /* تجاهل */
    }
  }, [key, st]);
  const patch = (p: Partial<Saved> | ((s: Saved) => Partial<Saved>)) =>
    setSt((s) => ({ ...s, ...(typeof p === 'function' ? p(s) : p) }));
  return { st, patch, resumeFrom: initial.slide };
}
