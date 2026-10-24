import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useSlide } from '../context';
import { num } from '../digits';
import type { HlKey } from '../types';
import { Eq } from './Layout';
import { Step } from './Steps';

/* ---------- المكعبات المتصلة (الصفوف الأولى) ---------- */

/** ألوان المكعبات كما في الكتاب */
export const CUBE = { green: '#4fae3a', yellow: '#f6c21c', orange: '#f28a1d', blue: '#2f3f9e', red: '#d7302a' } as const;

export interface CubePart {
  n: number;
  color: string;
}

/** شكل كل عنصر في الصف: مكعبات متصلة كما في الكتاب، أو أشياء من القصة */
export type ItemShape = 'cube' | 'spoon' | 'juice' | 'frog';

interface TrainProps {
  /** الأجزاء من اليمين إلى اليسار: الجزء الأول هو العدد الأول في جملة الجمع */
  parts: CubePart[];
  shape?: ItemShape;
  /** عرض العنصر الواحد بوحدات الرسم */
  size?: number;
  /**
   * رقم الصف في الشريحة، لتتحكم به خطوات الحل دون أن تختلط صفوف عدة:
   * خطوة فيها hl ‹p{k}› تضمّ الجزأين (الجمع)، و‹v{k}› تأخذ take[0]، و‹x{k}› تأخذ take[1].
   * الخطوات تتراكم، فتُعتمد آخر مرحلة: x قبل v.
   */
  k?: number;
  take?: [number, number?];
  /** يتقدّمان على الخطوات (للمستكشف): الجزآن مضمومان، والجزء المأخوذ */
  joined?: boolean;
  removed?: number | null;
  /** عدد عناصر كل جزء تحته */
  counts?: boolean;
  /** أجزاء لا يُكتب عددها لأنه الجواب ولم يُذكر في السؤال */
  hide?: number[];
  label?: string;
}

const SHAPE_H: Record<ItemShape, number> = { cube: 1, spoon: 1.9, juice: 1.45, frog: 1 };
const SHAPE_W: Record<ItemShape, number> = { cube: 1, spoon: 0.92, juice: 1.08, frog: 1.2 };

function Item({ shape, x, s, color }: { shape: ItemShape; x: number; s: number; color: string }) {
  const h = s * SHAPE_H[shape];
  if (shape === 'spoon')
    return (
      <g>
        <ellipse cx={x + s / 2} cy={h * 0.2} rx={s * 0.3} ry={h * 0.18} fill={color} stroke="#0005" strokeWidth={2} />
        <ellipse cx={x + s / 2 - s * 0.06} cy={h * 0.16} rx={s * 0.1} ry={h * 0.07} fill="#fff6" />
        <rect x={x + s / 2 - s * 0.075} y={h * 0.36} width={s * 0.15} height={h * 0.6} rx={s * 0.07} fill={color} stroke="#0005" strokeWidth={2} />
      </g>
    );
  if (shape === 'frog')
    return (
      <g>
        <ellipse cx={x + s / 2} cy={h * 0.62} rx={s * 0.44} ry={h * 0.32} fill={color} stroke="#0005" strokeWidth={2} />
        <circle cx={x + s * 0.3} cy={h * 0.3} r={s * 0.14} fill={color} stroke="#0005" strokeWidth={2} />
        <circle cx={x + s * 0.7} cy={h * 0.3} r={s * 0.14} fill={color} stroke="#0005" strokeWidth={2} />
        <circle cx={x + s * 0.3} cy={h * 0.3} r={s * 0.07} fill="#fff" />
        <circle cx={x + s * 0.7} cy={h * 0.3} r={s * 0.07} fill="#fff" />
        <circle cx={x + s * 0.31} cy={h * 0.31} r={s * 0.035} fill="#13213b" />
        <circle cx={x + s * 0.71} cy={h * 0.31} r={s * 0.035} fill="#13213b" />
        <path d={`M${x + s * 0.34} ${h * 0.66} q${s * 0.16} ${h * 0.1} ${s * 0.32} 0`} fill="none" stroke="#0007" strokeWidth={2.5} strokeLinecap="round" />
      </g>
    );
  if (shape === 'juice')
    return (
      <g>
        <line x1={x + s * 0.62} y1={h * 0.02} x2={x + s * 0.55} y2={h * 0.2} stroke="#0007" strokeWidth={3} strokeLinecap="round" />
        <rect x={x + s * 0.14} y={h * 0.18} width={s * 0.72} height={h * 0.8} rx={s * 0.08} fill={color} stroke="#0005" strokeWidth={2} />
        <rect x={x + s * 0.22} y={h * 0.45} width={s * 0.56} height={h * 0.26} rx={s * 0.05} fill="#fffd" />
      </g>
    );
  return (
    <g>
      <rect x={x + 1.5} y={0} width={s - 3} height={s - 3} rx={s * 0.12} fill={color} stroke="#0004" strokeWidth={2} />
      <circle cx={x + s / 2 - 1.5} cy={s / 2 - 1.5} r={s * 0.17} fill="none" stroke="#0003" strokeWidth={2.5} />
    </g>
  );
}

/**
 * صف من العناصر بألوان الأجزاء. الجمع: يقترب الجزآن حتى يتلاصقا ويظهر المجموع فوقهما.
 * الطرح: يُؤخذ جزء فينزل ويبهت، ويبقى الآخر.
 */
export function CubeTrain({ parts, shape = 'cube', size = 46, k = 0, take = [0, 1], joined, removed, counts = true, hide = [], label }: TrainProps) {
  const { activeHl } = useSlide();
  const stage = activeHl.has(`x${k}`) ? 2 : activeHl.has(`v${k}`) ? 1 : 0;
  const gone = removed !== undefined ? removed : stage === 2 ? (take[1] ?? null) : stage === 1 ? take[0] : null;
  const together = joined ?? (stage > 0 || activeHl.has(`p${k}`));

  const unit = size * SHAPE_W[shape];
  // العناصر غير المكعبات بينها فراغ صغير
  const step = shape === 'cube' ? unit : unit * 1.08;
  const ih = size * SHAPE_H[shape];
  const pad = 8;
  const top = counts ? size * 1.3 : pad; // مساحة المجموع فوق الصف
  // الجزء المأخوذ ينزل قليلًا، ويبقى عدده داخل الرسم
  const drop = Math.min(ih * 0.55, size * 0.45);
  const apart = size * 0.9;
  const total = parts.reduce((s, p) => s + p.n, 0);
  const wJoined = total * step;
  const W = wJoined + (parts.length - 1) * apart + pad * 2;
  const H = top + ih + size * (counts ? 1.4 : 0.7) + pad;
  // من اليمين: الجزء الأول عند الحافة اليمنى. المضموم يتوسّط المساحة نفسها
  const start = together ? W - pad - (W - pad * 2 - wJoined) / 2 : W - pad;
  const gap = together ? 0 : apart;
  let x = start;
  const shapes: ReactNode[] = [];
  const marks: ReactNode[] = [];
  parts.forEach((p, i) => {
    const w = p.n * step;
    x -= w;
    const off = gone === i;
    const dy = top + (off ? drop : 0);
    shapes.push(
      <g key={i} className={'cpart' + (off ? ' off' : '')} style={{ transform: `translate(${x}px, ${dy}px)` }}>
        {Array.from({ length: p.n }, (_, j) => (
          <Item key={j} shape={shape} x={j * step} s={unit} color={p.color} />
        ))}
      </g>,
    );
    if (counts && !hide.includes(i))
      marks.push(
        <text key={i} className={'ccount' + (off ? ' off' : '')} textAnchor="middle" style={{ transform: `translate(${x + w / 2}px, ${dy + ih + size * 0.9}px)` }}>
          {num(p.n)}
        </text>,
      );
    x -= gap;
  });
  const left = start - wJoined;
  return (
    <svg className="cubes" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label ?? `${num(parts[0]?.n ?? 0)} و${num(parts[1]?.n ?? 0)}`}>
      {counts && (
        <g className={'ctotal' + (together && gone === null ? ' on' : '')}>
          <path d={`M${left + 4} ${top - 6} v-10 H${start - 4} v10`} fill="none" stroke="var(--ink)" strokeWidth={3} />
          <text x={(left + start) / 2} y={top - 22} textAnchor="middle" style={{ fontSize: size * 0.72 }}>
            {num(total)}
          </text>
        </g>
      )}
      {shapes}
      {marks}
    </svg>
  );
}

/* ---------- خانة إجابة تمتلئ في مكانها ---------- */

/** مربع فارغ يظهر فيه الناتج عند «الخطوة التالية»، بترتيبه في الصفحة. */
/** box: مربع كما في الكتاب حين يرسم □؛ وإلا سطر نقاط «......» في دروس الصف الثاني */
/** خانة تمتلئ عند الخطوة التالية: عدد، أو إشارة عملية (+ أو −) */
export function Blank({ v, hl, box }: { v: number | string; hl?: readonly HlKey[]; box?: boolean }) {
  return (
    <span className={'blank' + (box ? ' box' : '')}>
      <Step hl={hl} className="bv">
        {typeof v === 'number' ? num(v) : v}
      </Step>
    </span>
  );
}

/** سطر جملة عددية: «٦ + ٧ =» ثم خانة الناتج، تُقرأ من اليمين كما في الكتاب */
export function FactLine({ a, op, b, v, hl }: { a: number; op: '+' | '−'; b: number; v: number; hl?: readonly HlKey[] }) {
  return (
    <div className="fline">
      <Eq>
        {num(a)} {op} {num(b)} =
      </Eq>
      <Blank v={v} hl={hl} />
    </div>
  );
}

/** جمع أو طرح رأسي كما في الكتاب: الإشارة يمين العدد الثاني، والآحاد تحت الآحاد */
export function VSum({ a, op, b, v, hl, missing }: { a: number; op: '+' | '−'; b: number; v: number; hl?: readonly HlKey[]; missing?: 'b' }) {
  // العدد المفقود في الوسط يُرسم مربعًا كما في الكتاب
  // missing='b': العدد الثاني هو المفقود (خانة في الوسط) والناتج معروف تحت الخط
  return (
    <div className="vsum" aria-label={`${num(a)} ${op} ${missing === 'b' ? '؟' : num(b)}`}>
      <span />
      <span className="vn">{num(a)}</span>
      <span className="vop">{op}</span>
      <span className="vn">{missing === 'b' ? <Blank v={b} hl={hl} box /> : num(b)}</span>
      <span className="vline" />
      <span />
      <span className="vn vans">{missing === 'b' ? num(v) : <Blank v={v} hl={hl} />}</span>
    </div>
  );
}

/* ---------- مستكشف الحقائق المترابطة ---------- */

const PICKS = ['add1', 'add2', 'sub1', 'sub2'] as const;
type Pick = (typeof PICKS)[number];

/**
 * يختار المعلم أو الطالب عدد المكعبات من كل لون، فتظهر الحقائق الأربع المترابطة.
 * الضغط على حقيقة طرح يأخذ الجزء المطروح من الصف، والضغط على حقيقة جمع يعيده.
 */
export function FactFamily({ start = [5, 4] as [number, number], max = 9 }: { start?: [number, number]; max?: number }) {
  const [a, setA] = useState(start[0]);
  const [b, setB] = useState(start[1]);
  /** لا جملة مختارة في البداية: الجزآن منفصلان */
  const [pick, setPick] = useState<Pick | null>(null);
  const c = a + b;
  const A = CUBE.green;
  const B = CUBE.yellow;
  const n = (v: number, color: string) => <b style={{ color }}>{num(v)}</b>;
  const facts: { k: Pick; eq: ReactNode; take: number | null }[] = [
    { k: 'add1', eq: <>{n(a, A)} + {n(b, B)} = {num(c)}</>, take: null },
    { k: 'add2', eq: <>{n(b, B)} + {n(a, A)} = {num(c)}</>, take: null },
    { k: 'sub1', eq: <>{num(c)} − {n(b, B)} = {n(a, A)}</>, take: 1 },
    { k: 'sub2', eq: <>{num(c)} − {n(a, A)} = {n(b, B)}</>, take: 0 },
  ];
  const take = facts.find((f) => f.k === pick)?.take ?? null;
  const joined = pick !== null;

  /* التحكم من الجوال: يسجّل المستكشف في شريحته، ويُبلغ عند كل تغيير */
  const slide = useSlide();
  const latest = useRef({ a, b, pick, max });
  latest.current = { a, b, pick, max };
  useEffect(() => {
    const fit = (v: number) => Math.max(1, Math.min(latest.current.max, Math.round(v)));
    slide.setFamily({
      get: () => ({
        a: latest.current.a,
        b: latest.current.b,
        max: latest.current.max,
        pick: latest.current.pick ? PICKS.indexOf(latest.current.pick) : -1,
        colors: [A, B],
        names: ['الخضراء', 'الصفراء'],
      }),
      set: (v) => {
        if (Number.isFinite(v.a)) setA(fit(v.a!));
        if (Number.isFinite(v.b)) setB(fit(v.b!));
        if (Number.isFinite(v.pick)) setPick(PICKS[v.pick!] ?? null);
      },
    });
    return () => slide.setFamily(null);
  }, [slide.setFamily]);
  useEffect(() => slide.touch(), [a, b, pick, slide.touch]);
  const stepper = (label: string, color: string, v: number, set: (v: number) => void) => (
    <div className="ffstep" style={{ borderColor: color }}>
      <span style={{ color }}>{label}</span>
      <button aria-label={`إنقاص ${label}`} disabled={v <= 1} onClick={() => set(v - 1)}>
        −
      </button>
      <b>{num(v)}</b>
      <button aria-label={`زيادة ${label}`} disabled={v >= max} onClick={() => set(v + 1)}>
        +
      </button>
    </div>
  );
  return (
    <div className="ffam">
      <div className="ffcubes">
        <CubeTrain parts={[{ n: a, color: A }, { n: b, color: B }]} joined={joined} removed={take} size={44} />
        <div className="ffsteps">
          {stepper('الخضراء', A, a, setA)}
          {stepper('الصفراء', B, b, setB)}
        </div>
      </div>
      <div className="fffacts">
        {facts.map((f) => (
          <button key={f.k} className={'fffact' + (pick === f.k ? ' on' : '') + (f.take === null ? ' add' : ' sub')} onClick={() => setPick(f.k)}>
            <Eq>{f.eq}</Eq>
          </button>
        ))}
      </div>
    </div>
  );
}
