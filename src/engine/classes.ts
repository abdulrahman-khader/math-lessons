import { useCallback, useEffect, useState } from 'react';
import { digits } from './digits';

/**
 * فصول الطلاب: يكتبها المعلم مرة واحدة فتظهر في كل الدروس (العجلة والفرق).
 * تُحفظ في المتصفح تحت مفتاح واحد للموقع كله، لا لكل درس؛ فكل ملفات الدروس على الموقع تقرؤها.
 */
export interface Klass {
  id: string;
  name: string;
  students: string[];
  /** فريق كل طالب (٠–٣) بالاسم؛ من لا فريق له غير موجود هنا */
  team: Record<string, number>;
}

export interface Roster {
  /** لكل صف (g2، g4…) فصوله، وآخر فصل اختير فيه ليكون جاهزًا في الحصة التالية */
  grades: Record<string, { classes: Klass[]; last?: string }>;
}

const KEY = 'classes';
const EVENT = 'classes-changed';

/** الصفوف المعروفة، تظهر في إدارة الفصول حتى يجهّز المعلم كل صفوفه من أي درس */
export const GRADES: { k: string; name: string }[] = [
  { k: 'g2', name: 'الصف الثاني' },
  { k: 'g4', name: 'الصف الرابع' },
];

/** g4-3-1-collect-data ← g4 */
export const gradeOf = (lessonId: string) => lessonId.split('-')[0];

export const gradeName = (k: string) => GRADES.find((g) => g.k === k)?.name ?? k;

/** أسماء الطلاب من نص (اسم في كل سطر)، دون فراغات ودون تكرار */
export function parseNames(text: string): string[] {
  const out: string[] = [];
  for (const line of text.split('\n')) {
    const s = line.trim().replace(/\s+/g, ' ');
    if (s && !out.includes(s)) out.push(s);
  }
  return out;
}

export function newClass(i: number): Klass {
  return { id: Math.random().toString(36).slice(2, 9), name: 'فصل ' + digits(i + 1), students: [], team: {} };
}

function load(): Roster {
  try {
    const r = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (r && typeof r === 'object' && r.grades && typeof r.grades === 'object') return r as Roster;
  } catch {
    /* التخزين قد يكون محظورًا؛ الدرس يعمل دون فصول */
  }
  return { grades: {} };
}

/** الفصول المحفوظة، وتحديثها يحفظها فورًا ويُعلم أي مكوّن آخر يقرؤها (وأي نافذة أخرى عبر حدث storage) */
export function useRoster() {
  const [roster, setRoster] = useState<Roster>(load);
  useEffect(() => {
    const re = () => setRoster(load());
    const onStorage = (e: StorageEvent) => e.key === KEY && re();
    window.addEventListener(EVENT, re);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, re);
      window.removeEventListener('storage', onStorage);
    };
  }, []);
  const update = useCallback((f: (r: Roster) => Roster) => {
    const next = f(load());
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* تجاهل */
    }
    setRoster(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return { roster, update };
}

/** فصول صف واحد */
export const classesOf = (r: Roster, grade: string) => r.grades[grade]?.classes ?? [];

/** يغيّر فصول صف واحد ويُبقي الباقي */
export function setGrade(r: Roster, grade: string, f: (g: { classes: Klass[]; last?: string }) => { classes: Klass[]; last?: string }): Roster {
  return { ...r, grades: { ...r.grades, [grade]: f(r.grades[grade] ?? { classes: [] }) } };
}

/** يغيّر فصلًا واحدًا */
export function setClass(r: Roster, grade: string, id: string, f: (k: Klass) => Klass): Roster {
  return setGrade(r, grade, (g) => ({ ...g, classes: g.classes.map((k) => (k.id === id ? f(k) : k)) }));
}

/** توزيع عشوائي متوازن على n فرق */
export function shuffleTeams(students: string[], n: number): Record<string, number> {
  const a = [...students];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return Object.fromEntries(a.map((s, i) => [s, i % n]));
}
