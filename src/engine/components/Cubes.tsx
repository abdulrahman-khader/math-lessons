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

interface TrainProps {
  /** الأجزاء من اليمين إلى اليسار: الجزء الأول هو العدد الأول في جملة الجمع */
  parts: CubePart[];
  /** طول ضلع المكعب بوحدات الرسم */
  size?: number;
  /** الجزء المأخوذ (للطرح)؛ يتقدّم على stages */
  removed?: number | null;
  /**
   * أي جزء يُؤخذ في كل مرحلة من مراحل الحل: المرحلة k تبدأ عند ظهور خطوة فيها hl ‹g{k}›.
   * تُعتمد أعلى مرحلة ظاهرة (الخطوات تتراكم)، فالمثال [0، 1] يأخذ الأول ثم يعيده ويأخذ الثاني.
   */
  stages?: number[];
  /** عدد مكعبات كل جزء تحته */
  counts?: boolean;
  label?: string;
}

/** صف مكعبات متصلة بألوان الأجزاء، يُؤخذ منه جزء ليمثّل الطرح. */
export function CubeTrain({ parts, size = 46, removed, stages, counts = true, label }: TrainProps) {
  const { activeHl } = useSlide();
  let stage = 0;
  activeHl.forEach((k) => {
    const m = /^g(\d+)$/.exec(k);
    if (m) stage = Math.max(stage, +m[1]);
  });
  const gone = removed !== undefined ? removed : stage > 0 && stages ? (stages[stage - 1] ?? null) : null;

  const gap = size * 0.5;
  const pad = 8;
  const total = parts.reduce((s, p) => s + p.n, 0);
  const W = total * size + (parts.length - 1) * gap + pad * 2;
  const H = size * (counts ? 2.6 : 1.9) + pad;
  // من اليمين: الجزء الأول عند الحافة اليمنى
  let x = W - pad;
  const shapes: ReactNode[] = [];
  const marks: ReactNode[] = [];
  parts.forEach((p, i) => {
    const w = p.n * size;
    x -= w;
    const off = gone === i;
    const y = pad + (off ? size * 0.7 : 0);
    shapes.push(
      <g key={i} className={'cpart' + (off ? ' off' : '')} style={{ transform: `translateY(${y}px)` }}>
        {Array.from({ length: p.n }, (_, k) => (
          <g key={k}>
            <rect x={x + k * size + 1.5} y={0} width={size - 3} height={size - 3} rx={size * 0.12} fill={p.color} stroke="#0004" strokeWidth={2} />
            <circle cx={x + k * size + size / 2 - 1.5} cy={size / 2 - 1.5} r={size * 0.17} fill="none" stroke="#0003" strokeWidth={2.5} />
          </g>
        ))}
      </g>,
    );
    if (counts)
      marks.push(
        <text key={i} x={x + w / 2} y={pad + size * (off ? 2.45 : 1.75)} textAnchor="middle" className={'ccount' + (off ? ' off' : '')}>
          {num(p.n)}
        </text>,
      );
    x -= gap;
  });
  return (
    <svg className="cubes" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label ?? `مكعبات: ${parts.map((p) => num(p.n)).join(' و')}`}>
      {shapes}
      {marks}
    </svg>
  );
}

/* ---------- خانة إجابة تمتلئ في مكانها ---------- */

/** مربع فارغ يظهر فيه الناتج عند «الخطوة التالية»، بترتيبه في الصفحة. */
export function Blank({ v, hl }: { v: number; hl?: readonly HlKey[] }) {
  return (
    <span className="blank">
      <Step hl={hl} className="bv">
        {num(v)}
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
export function VSum({ a, op, b, v }: { a: number; op: '+' | '−'; b: number; v: number }) {
  return (
    <div className="vsum" aria-label={`${num(a)} ${op} ${num(b)}`}>
      <span />
      <span className="vn">{num(a)}</span>
      <span className="vop">{op}</span>
      <span className="vn">{num(b)}</span>
      <span className="vline" />
      <span />
      <span className="vn vans">
        <Blank v={v} />
      </span>
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
  const [pick, setPick] = useState<Pick>('add1');
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
        pick: PICKS.indexOf(latest.current.pick),
        colors: [A, B],
        names: ['الخضراء', 'الصفراء'],
      }),
      set: (v) => {
        if (Number.isFinite(v.a)) setA(fit(v.a!));
        if (Number.isFinite(v.b)) setB(fit(v.b!));
        if (Number.isFinite(v.pick) && PICKS[v.pick!]) setPick(PICKS[v.pick!]);
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
        <CubeTrain parts={[{ n: a, color: A }, { n: b, color: B }]} removed={take} size={44} />
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
