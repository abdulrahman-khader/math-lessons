import { useCallback, useEffect, useState } from 'react';
import { digits } from './digits';

/**
 * نجم الأسبوع: نجمة (+١) أو غلطة (−١) لطالب في فصل. يُحفظ كل ضغط مع وقته تحت مفتاح واحد للموقع كله
 * (مثل الفصول)، فالنجوم مشتركة بين كل الدروس. الأسبوع من الخميس إلى الأربعاء: النجوم تُعلَن كل خميس
 * عن الأسبوع الذي انتهى يوم الأربعاء، والمجاميع تُحسب من السجل فلا يحتاج الأسبوع الجديد إلى تصفير.
 */
export interface StarEvent {
  /** وقت الضغط (ملّي ثانية) */
  t: number;
  /** معرّف الفصل */
  k: string;
  /** اسم الطالب */
  s: string;
  d: 1 | -1;
}

export interface StarRow {
  name: string;
  stars: number;
  mistakes: number;
  /** النجوم ناقص الأغلاط، ولا ينزل تحت الصفر */
  total: number;
  /** ١ للأول؛ المتعادلون في المجموع والأغلاط يأخذون الرتبة نفسها، والذي بعدهم الرتبة التالية مباشرة */
  rank: number;
}

const KEY = 'stars';
const EVENT = 'stars-changed';
/** عدد نجوم الأسبوع المعلنين كل خميس */
export const TOP = 5;
/** السجل يُبقي هذه المدة فقط، فلا يكبر التخزين مع السنة */
const KEEP_WEEKS = 20;
const DAY = 86400000;
const THURSDAY = 4;

/** بداية الأسبوع (الخميس ٠٠:٠٠ بالتوقيت المحلي) الذي يقع فيه الوقت t */
export function weekStart(t: number): number {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() - THURSDAY + 7) % 7));
  return d.getTime();
}

/** بداية الأسبوع التالي؛ بالتاريخ لا بإضافة ٧ أيام، حتى لا يخطئ عند تغيّر التوقيت الصيفي */
export function nextWeek(start: number): number {
  const d = new Date(start);
  d.setDate(d.getDate() + 7);
  return d.getTime();
}

/** «الخميس ٢٣/١٠ – الأربعاء ٢٩/١٠» */
export function weekLabel(start: number): string {
  const a = new Date(start);
  const b = new Date(nextWeek(start) - DAY / 2);
  const f = (d: Date) => digits(`${d.getDate()}/${d.getMonth() + 1}`);
  return `الخميس ${f(a)} – الأربعاء ${f(b)}`;
}

export const isThursday = (t = Date.now()) => new Date(t).getDay() === THURSDAY;

/** ترتيب الأسماء أبجديًا (ا ب ت ث …) */
export const byName = (a: string, b: string) => a.localeCompare(b, 'ar');

/** مجاميع طلاب الفصل في أسبوع مرتّبين أبجديًا، ورتبهم: الأعلى مجموعًا، وعند التساوي الأقل أغلاطًا */
export function tally(events: StarEvent[], k: string, students: string[], from: number, to = nextWeek(from)): StarRow[] {
  const m = new Map(students.map((s) => [s, { stars: 0, mistakes: 0 }]));
  for (const e of events) {
    if (e.k !== k || e.t < from || e.t >= to) continue;
    const r = m.get(e.s);
    if (!r) continue;
    if (e.d > 0) r.stars++;
    else r.mistakes++;
  }
  return rankRows([...students].sort(byName).map((name) => ({ name, ...m.get(name)! })));
}

/** المجموع والمركز لكل طالب من نجومه وأغلاطه */
export function rankRows(list: { name: string; stars: number; mistakes: number }[]): StarRow[] {
  const rows = list.map((r) => ({ ...r, total: Math.max(0, r.stars - r.mistakes), rank: 0 }));
  // رتب بلا فجوات: إن تعادل اثنان في الثالث فالذي بعدهما رابع لا خامس، فتبقى المراكز خمسة وقد يزيد أصحابها
  const key = (r: StarRow) => `${r.total}:${r.mistakes}`;
  const better = (a: StarRow, b: StarRow) => a.total > b.total || (a.total === b.total && a.mistakes < b.mistakes);
  for (const r of rows) r.rank = 1 + new Set(rows.filter((o) => better(o, r)).map(key)).size;
  return rows;
}

/** نجوم الأسبوع: أصحاب المراكز ١–٥ ممن مجموعهم فوق الصفر، مرتّبين (ستة أو سبعة إن تعادل بعضهم) */
export const topRows = (rows: StarRow[]) => rows.filter((r) => r.rank <= TOP && r.total > 0).sort((a, b) => a.rank - b.rank);

/** بدايات الأسابيع السابقة التي فيها نجوم أو أغلاط لهذا الفصل، الأحدث أولًا */
export function pastWeeks(events: StarEvent[], k: string, now = Date.now()): number[] {
  const cur = weekStart(now);
  const set = new Set<number>();
  for (const e of events) if (e.k === k && e.t < cur) set.add(weekStart(e.t));
  return [...set].sort((a, b) => b - a);
}

function load(): StarEvent[] {
  try {
    const r = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (Array.isArray(r?.events)) return r.events as StarEvent[];
  } catch {
    /* التخزين قد يكون محظورًا؛ الدرس يعمل دون نجوم */
  }
  return [];
}

function save(events: StarEvent[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ events }));
  } catch {
    /* تجاهل */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** سجل النجوم، وإضافة نجمة أو غلطة، والتراجع عن آخر ضغطة في فصل */
export function useStars() {
  const [events, setEvents] = useState<StarEvent[]>(load);
  useEffect(() => {
    const re = () => setEvents(load());
    const onStorage = (e: StorageEvent) => e.key === KEY && re();
    window.addEventListener(EVENT, re);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, re);
      window.removeEventListener('storage', onStorage);
    };
  }, []);
  const add = useCallback((k: string, s: string, d: 1 | -1) => {
    const now = Date.now();
    const keepFrom = weekStart(now) - KEEP_WEEKS * 7 * DAY;
    const next = [...load().filter((e) => e.t >= keepFrom), { t: now, k, s, d }];
    setEvents(next);
    save(next);
  }, []);
  const undo = useCallback((k: string) => {
    const all = load();
    let i = all.length - 1;
    while (i >= 0 && all[i].k !== k) i--;
    if (i < 0) return;
    const next = all.filter((_, j) => j !== i);
    setEvents(next);
    save(next);
  }, []);
  return { events, add, undo };
}

/** آخر ضغطة في الفصل خلال هذا الأسبوع، لزر «تراجع» */
export function lastEvent(events: StarEvent[], k: string, now = Date.now()): StarEvent | undefined {
  const from = weekStart(now);
  for (let i = events.length - 1; i >= 0; i--) if (events[i].k === k) return events[i].t >= from ? events[i] : undefined;
  return undefined;
}
