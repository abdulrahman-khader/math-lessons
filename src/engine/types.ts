import type { ReactNode } from 'react';
import { hasWesternDigits } from './digits';

/** أقسام الحصة بالترتيب. الأسماء المعروضة في sections.ts */
export type SectionKey = 'start' | 'engage' | 'explore' | 'explain' | 'elab' | 'check' | 'practice' | 'hot' | 'close';

export interface LessonMeta {
  /** معرّف ثابت، يُستعمل مفتاحًا للحفظ في المتصفح. لا تغيّره بعد استعمال الدرس في الصف. */
  id: string;
  /** رقم الدرس كما في الكتاب: ٣-٤ */
  code: string;
  /** بالتشكيل كما في الكتاب: التَّمثيلُ بالخُطوطِ */
  title: string;
  /** بلا تشكيل، للرأس وعنوان الصفحة */
  shortTitle: string;
  subject: string;
  grade: string;
  chapter: string;
  /** مثل: الجزء الأول · ص ٨٧–٨٩ */
  source: string;
  minutes: number;
  idea: string;
  /** عدد أسئلة الكتاب في الدرس. الاختبارات تتحقق أن كل سؤال من ١ إلى هذا العدد موجود. */
  bookQuestions: number;
}

export interface SlideDef {
  sec: SectionKey;
  /** الدقائق المقترحة */
  min: number;
  /** ملاحظات المعلم */
  notes: string;
  content: ReactNode;
}

export interface Lesson {
  meta: LessonMeta;
  /** وصف قصير لكل قسم في فهرس الصفحة الرئيسية */
  sectionDesc: Partial<Record<SectionKey, string>>;
  slides: SlideDef[];
}

export function defineLesson(l: Lesson): Lesson {
  const check = (s: string, where: string) => {
    if (hasWesternDigits(s)) throw new Error(`أرقام غربية في ${where}: "${s}". اكتبها بالأرقام الهندية-العربية.`);
  };
  Object.entries(l.meta).forEach(([k, v]) => typeof v === 'string' && k !== 'id' && check(v, `meta.${k}`));
  l.slides.forEach((s, i) => check(s.notes, `ملاحظات الشريحة ${i + 1}`));
  return l;
}

/* ---------- الرسوم البيانية ---------- */

export interface ChartSpec {
  title?: string;
  /** تسميات المحور الأفقي من اليسار إلى اليمين كما في الكتاب */
  labels: string[];
  /** null = نقطة ناقصة (للسحب أو للإكمال) */
  values: (number | null)[];
  min: number;
  max: number;
  /** المسافة بين خطوط الشبكة الأفقية */
  grid: number;
  /** أول خط شبكة إن لم يكن min (مع brk) */
  gridFrom?: number;
  /** المسافة بين الأرقام المكتوبة على المحور الرأسي */
  lab: number;
  labFrom?: number;
  /** علامة كسر المحور عندما لا يبدأ من الصفر */
  brk?: boolean;
  yTitle?: string;
  xTitle?: string;
  /** حجم خط تسميات المحور الأفقي إن كانت طويلة */
  xfs?: number;
  mode?: 'line' | 'bars' | 'cubes';
  /** خطوط شبكة رأسية عند كل تسمية */
  vgrid?: boolean;
  /** لون خط التمثيل؛ الكتاب يرسمه أسود في أسئلة التمرين */
  line?: string;
  /** هامش المحور الرأسي إن كانت أرقامه طويلة */
  ml?: number;
  /** قيمة المكعب الواحد في وضع المكعبات */
  cube?: number;
}

/** يتحقق من بيانات الرسم عند تحميل الدرس؛ الخطأ يوقف الدرس فتلتقطه الاختبارات قبل الصف. */
export function defineChart<T extends ChartSpec>(c: T): T {
  const name = c.title ?? c.labels.join('،');
  const fail = (m: string) => {
    throw new Error(`الرسم «${name}»: ${m}`);
  };
  if (c.labels.length !== c.values.length) fail(`عدد التسميات ${c.labels.length} لا يساوي عدد القيم ${c.values.length}`);
  if (!(c.max > c.min)) fail('max يجب أن يكون أكبر من min');
  if (!(c.grid > 0) || !(c.lab > 0)) fail('grid و lab يجب أن يكونا موجبين');
  c.values.forEach((v, i) => {
    if (v != null && (v < c.min || v > c.max)) fail(`القيمة ${v} عند «${c.labels[i]}» خارج المحور (${c.min}–${c.max})`);
  });
  [c.title, c.xTitle, c.yTitle, ...c.labels].forEach((s) => {
    if (s && hasWesternDigits(s)) fail(`أرقام غربية في "${s}"`);
  });
  return c;
}

/** مفاتيح الإبراز في الرسم: العنوان، المحوران، الخط، كل النقاط، أو عنصر عند الموضع i */
export type HlKey =
  | 'title'
  | 'xaxis'
  | 'yaxis'
  | 'line'
  | 'pts'
  | `p${number}` // النقطة أو العمود
  | `v${number}` // بطاقة القيمة
  | `x${number}` // تسمية المحور الأفقي
  | `g${number}` // دليل رأسي من النقطة إلى المحور الأفقي
  | `h${number}`; // دليل أفقي من النقطة إلى المحور الرأسي
