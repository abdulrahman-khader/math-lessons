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
  /** ١ نجمة، −١ غلطة، ٠ غياب (يوم واحد) */
  d: 1 | -1 | 0;
}

export interface StarRow {
  name: string;
  stars: number;
  mistakes: number;
  /** أيام الغياب: لا تنقص المجموع، وتفصل فقط بين المتعادلين (من لم يغب يتقدّم) */
  absences: number;
  /** ٣ أغلاط أو أكثر في الأسبوع: لا يدخل نجوم ذلك الأسبوع */
  barred: boolean;
  /** النجوم ناقص الأغلاط، ولا ينزل تحت الصفر */
  total: number;
  /** ١ للأول؛ المتعادلون في المجموع والأغلاط يأخذون الرتبة نفسها، والذي بعدهم الرتبة التالية مباشرة */
  rank: number;
}

const KEY = 'stars';
const EVENT = 'stars-changed';
/** عدد نجوم الأسبوع المعلنين كل خميس */
export const TOP = 5;
/** من أخذ هذا العدد من الأغلاط في أسبوع لا يدخل نجوم ذلك الأسبوع */
export const MAX_MISTAKES = 3;
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
  const m = new Map(students.map((s) => [s, { stars: 0, mistakes: 0, absences: 0 }]));
  for (const e of events) {
    if (e.k !== k || e.t < from || e.t >= to) continue;
    const r = m.get(e.s);
    if (!r) continue;
    if (e.d > 0) r.stars++;
    else if (e.d < 0) r.mistakes++;
    else r.absences++;
  }
  return rankRows([...students].sort(byName).map((name) => ({ name, ...m.get(name)! })));
}

/**
 * المجموع والمركز لكل طالب: الأعلى مجموعًا، وعند التساوي الأقل أغلاطًا، ثم الأقل غيابًا.
 * من أخذ ٣ أغلاط أو أكثر محروم من نجوم الأسبوع، ويبقى مركزه في اللوحة.
 */
export function rankRows(list: { name: string; stars: number; mistakes: number; absences?: number }[]): StarRow[] {
  const rows = list.map((r) => ({ ...r, absences: r.absences ?? 0, barred: r.mistakes >= MAX_MISTAKES, total: Math.max(0, r.stars - r.mistakes), rank: 0 }));
  // رتب بلا فجوات: إن تعادل اثنان في الثالث فالذي بعدهما رابع لا خامس، فتبقى المراكز خمسة وقد يزيد أصحابها
  const key = (r: StarRow) => `${r.total}:${r.mistakes}:${r.absences}`;
  const better = (a: StarRow, b: StarRow) =>
    a.total > b.total || (a.total === b.total && (a.mistakes < b.mistakes || (a.mistakes === b.mistakes && a.absences < b.absences)));
  for (const r of rows) r.rank = 1 + new Set(rows.filter((o) => better(o, r)).map(key)).size;
  return rows;
}

/**
 * نجوم الأسبوع: أول خمسة طلاب ممن مجموعهم فوق الصفر ولم يأخذوا ٣ أغلاط، مرتّبين، ومعهم كل من تعادل مع الخامس
 * (طالبان في الأول وستة في الثاني = ثمانية نجوم، ولا أحد بعدهم).
 */
export function topRows(rows: StarRow[]) {
  const out: StarRow[] = [];
  // المحروم لا يدخل، والرتب تُعاد بين الباقين فلا يبقى مركز فارغ
  const ok = rankRows(rows.filter((x) => x.total > 0 && !x.barred));
  for (const r of ok.sort((a, b) => a.rank - b.rank)) {
    if (out.length >= TOP && r.rank !== out[out.length - 1].rank) break;
    out.push(r);
  }
  return out;
}

/**
 * صفوف أسبوع سابق: طلاب الفصل الآن، ومعهم كل من أخذ نجمة أو غلطة في ذلك الأسبوع
 * (فلا يختفي من السجل طالب نُقل أو حُذف اسمه من الفصل بعد ذلك).
 */
export function weekRows(events: StarEvent[], k: string, students: string[], from: number): StarRow[] {
  const to = nextWeek(from);
  const names = new Set(students);
  for (const e of events) if (e.k === k && e.t >= from && e.t < to) names.add(e.s);
  return tally(events, k, [...names], from, to);
}

/** كم مرة كان كل طالب من نجوم الأسبوع، في كل الأسابيع السابقة؛ الأكثر أولًا */
export function starCounts(events: StarEvent[], k: string, students: string[], now = Date.now()): { name: string; n: number }[] {
  const m = new Map<string, number>();
  for (const w of pastWeeks(events, k, now)) for (const r of topRows(weekRows(events, k, students, w))) m.set(r.name, (m.get(r.name) ?? 0) + 1);
  return [...m].map(([name, n]) => ({ name, n })).sort((a, b) => b.n - a.n || byName(a.name, b.name));
}

/** نسخة احتياطية من النجوم والفصول معًا، تُنزَّل ملفًا وتُسترجع منه */
export function backup(): string {
  const get = (key: string) => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? 'null');
    } catch {
      return null;
    }
  };
  return JSON.stringify({ kind: 'math-lessons-stars', at: Date.now(), stars: get(KEY), classes: get('classes') });
}

/**
 * يسترجع نسخة احتياطية: يضيف ما فيها من نجوم إلى السجل دون تكرار ودون حذف شيء موجود،
 * ويعيد الفصول إن لم يكن على هذا الجهاز فصول. يعيد عدد النجوم والأغلاط المضافة، أو null إن لم يكن الملف نسخة نجوم.
 */
export function restore(text: string): number | null {
  let data: { kind?: string; stars?: { events?: StarEvent[] }; classes?: unknown };
  try {
    data = JSON.parse(text);
  } catch {
    return null;
  }
  if (data?.kind !== 'math-lessons-stars' || !Array.isArray(data.stars?.events)) return null;
  const all = load();
  const id = (e: StarEvent) => `${e.t}|${e.k}|${e.s}|${e.d}`;
  const have = new Set(all.map(id));
  const add = data.stars.events.filter((e) => e && typeof e.t === 'number' && !have.has(id(e)));
  save([...all, ...add].sort((a, b) => a.t - b.t));
  try {
    if (data.classes && !localStorage.getItem('classes')) localStorage.setItem('classes', JSON.stringify(data.classes));
  } catch {
    /* تجاهل */
  }
  return add.length;
}

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
  const add = useCallback((k: string, s: string, d: 1 | -1 | 0) => {
    // السجل كله يبقى: كل أسبوع ونجومه محفوظة، ولا يُحذف شيء مع الوقت
    const next = [...load(), { t: Date.now(), k, s, d }];
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
  /** غياب اليوم: يُسجَّل مرة في اليوم، والضغط ثانيةً يلغيه */
  const toggleAbsent = useCallback((k: string, who: string) => {
    const all = load();
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    const i = all.findIndex((e) => e.k === k && e.s === who && e.d === 0 && e.t >= day.getTime());
    const next = i >= 0 ? all.filter((_, j) => j !== i) : [...all, { t: Date.now(), k, s: who, d: 0 as const }];
    setEvents(next);
    save(next);
  }, []);
  /** يحذف آخر نجمة (d=١) أو آخر غلطة (d=−١) أو آخر غياب (d=٠) لطالب في هذا الأسبوع */
  const remove = useCallback((k: string, who: string, d: 1 | -1 | 0) => {
    const all = load();
    const from = weekStart(Date.now());
    let i = all.length - 1;
    while (i >= 0 && !(all[i].k === k && all[i].s === who && all[i].d === d && all[i].t >= from)) i--;
    if (i < 0) return;
    const next = all.filter((_, j) => j !== i);
    setEvents(next);
    save(next);
  }, []);
  return { events, add, undo, remove, toggleAbsent };
}

/** هل سُجّل الطالب غائبًا اليوم؟ */
export function absentToday(events: StarEvent[], k: string, who: string, now = Date.now()): boolean {
  const day = new Date(now);
  day.setHours(0, 0, 0, 0);
  return events.some((e) => e.k === k && e.s === who && e.d === 0 && e.t >= day.getTime());
}

/** آخر ضغطة في الفصل خلال هذا الأسبوع، لزر «تراجع» */
export function lastEvent(events: StarEvent[], k: string, now = Date.now()): StarEvent | undefined {
  const from = weekStart(now);
  for (let i = events.length - 1; i >= 0; i--) if (events[i].k === k) return events[i].t >= from ? events[i] : undefined;
  return undefined;
}
