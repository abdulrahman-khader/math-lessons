import { useId, type ReactNode } from 'react';
import { useSlide } from '../context';
import { num } from '../digits';
import type { HlKey } from '../types';
import { Eq, QCard } from './Layout';
import { Step } from './Steps';

/*
 * المتباينات (الصف الثالث المتوسط).
 * المتباينة تُكتب بترتيبها المنطقي من اليمين («س > ٤»)، والمتصفح يعكس رمزها كما في الكتاب.
 */

/** خطوة حل كما في الكتاب: المتباينة، وبجانبها ما فعلناه بخط أصغر */
export function Alg({ children, why }: { children: ReactNode; why?: ReactNode }) {
  return (
    <span className="alg">
      <Eq>{children}</Eq>
      {why && <span className="why">{why}</span>}
    </span>
  );
}

export interface IneqMark {
  v: number;
  /** دائرة مغلقة (≤ أو ≥)؛ وإلا مفتوحة */
  closed?: boolean;
}

interface LineProps {
  min: number;
  max: number;
  /** النقاط على الخط (واحدة للمتباينة البسيطة، واثنتان للجزء بينهما) */
  marks: IneqMark[];
  /** جهة التظليل: الأعداد الأكبر، أو الأصغر، أو ما بين النقطتين */
  shade: 'right' | 'left' | 'between';
  /** يظهر التمثيل حين تظهر خطوة فيها هذا المفتاح؛ وإلا يظهر دائمًا */
  show?: HlKey;
  /** لون التظليل (للتمثيلين المتداخلين) */
  color?: string;
  /** تمثيل ثانٍ فوق الأول (السؤال ١٩) */
  second?: { marks: IneqMark[]; shade: 'right' | 'left'; color: string; show?: HlKey };
}

/** العدد بإشارة السالب كما في الكتاب: −٥ */
export const sgn = (v: number) => (v < 0 ? '−' + num(-v) : num(v));

const W = 600;
const PAD = 40;
const Y = 70;

/** خط الأعداد من اليسار إلى اليمين كما في الكتاب، ودائرة مفتوحة أو مغلقة، وتظليل نحو جهة الحل */
export function IneqLine({ min, max, marks, shade, show, color = 'var(--sec)', second }: LineProps) {
  const { activeHl } = useSlide();
  // معرّفات الأسهم فريدة لكل خط، فلا يأخذ خطٌّ لونَ سهمٍ من خطٍّ في شريحة أخرى
  const uid = useId().replace(/:/g, '');
  const x = (v: number) => PAD + ((v - min) / (max - min)) * (W - 2 * PAD);
  const ticks = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const every = ticks.length > 13 ? 2 : 1;
  const ray = (ms: IneqMark[], sh: 'right' | 'left' | 'between', c: string, y: number, key?: HlKey) => {
    if (key && !activeHl.has(key)) return null;
    const a = x(ms[0].v);
    const b = sh === 'between' ? x(ms[1].v) : sh === 'right' ? W - 8 : 8;
    const arrow = sh !== 'between';
    return (
      <g>
        <line x1={a} y1={y} x2={b} y2={y} stroke={c} strokeWidth={9} strokeLinecap="round" markerEnd={arrow ? `url(#${uid}${c === color ? 'a' : 'b'})` : undefined} />
        {ms.map((m, i) => (
          <circle key={i} cx={x(m.v)} cy={y} r={11} fill={m.closed ? c : '#fff'} stroke={c} strokeWidth={5} />
        ))}
      </g>
    );
  };
  return (
    <svg className="iqline" viewBox={`0 0 ${W} 130`} role="img" aria-label="خط الأعداد">
      <defs>
        {[['a', color], ['b', second?.color ?? color]].map(([k, c]) => (
          <marker key={k} id={`${uid}${k}`} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="2.6" markerHeight="2.6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={c} />
          </marker>
        ))}
        <marker id={`${uid}ax`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 1 L9 5 L0 9" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
        </marker>
      </defs>
      <line x1={6} y1={Y} x2={W - 6} y2={Y} stroke="var(--ink)" strokeWidth={3} markerStart={`url(#${uid}ax)`} markerEnd={`url(#${uid}ax)`} />
      {ticks.map((v, i) => (
        <g key={v}>
          <line x1={x(v)} y1={Y - 10} x2={x(v)} y2={Y + 10} stroke="var(--ink)" strokeWidth={2.5} />
          {i % every === 0 && (
            <text x={x(v)} y={Y + 48} textAnchor="middle" direction="rtl" className="iqnum">
              {sgn(v)}
            </text>
          )}
        </g>
      ))}
      {ray(marks, shade, color, Y, show)}
      {second && ray(second.marks, second.shade, second.color, Y - 26, second.show)}
    </svg>
  );
}

/**
 * سؤال متباينة في بطاقة ضمن مجموعة: المتباينة، ثم خطوات الحل (المتباينة وما فعلناه)، ثم مجموعة الحل.
 * steps: [المتباينة، ما فعلناه]
 */
export function IneqCard({ n, q, words, steps, ans, label = 'مَجْمُوعَةُ الْحَلِّ' }: { n: number | string; q: ReactNode; /** السؤال كلمات (يلتف)، لا متباينة */ words?: boolean; steps: [ReactNode, ReactNode][]; ans: ReactNode; label?: ReactNode }) {
  const body = (
    <>
      <div className={'iqq' + (words ? ' words' : '')}>{words ? q : <Eq>{q}</Eq>}</div>
      {steps.map(([e, why], i) => (
        <Step key={i}>
          <Alg why={why}>{e}</Alg>
        </Step>
      ))}
      <Step kind="ans" label={label}>
        <Eq>{ans}</Eq>
      </Step>
    </>
  );
  // «تحقَّقْ منْ فهمِكَ» (٢أ، ٢ب…) ليست من أسئلة الكتاب المرقّمة، فلا تُعدّ
  if (typeof n === 'string')
    return (
      <div className="card qcard iqcard">
        <span className="qnum wide">{n}</span>
        {body}
      </div>
    );
  return (
    <QCard n={n} className="iqcard">
      {body}
    </QCard>
  );
}
