import type { ReactNode } from 'react';
import { num } from '../digits';
import { useSlide } from '../context';
import { WordChoice } from './ChanceBook';
import { Blank } from './Cubes';
import { QCard, Stack } from './Layout';
import { Block } from './Multiply';
import { TenOnes } from './Place';
import { Sentence } from './Primary';
import { Step } from './Steps';

const StepAns = ({ label, children }: { label: string; children: ReactNode }) => <Step kind="ans" label={label}>{children}</Step>;

/* ---------- قطع الأعداد حتى ١٠٠ في الصف الثاني: القيمة المنزلية، التقدير، الترتيب، المقارنة، الأنماط ---------- */

/** «أحوّط القيمة المنزلية»: العدد والرقم الملوَّن، ثم الخياران كما في الكتاب */
export function ValueCard({ n, v, tens, blocks }: { n: number; v: number; tens?: boolean; blocks?: boolean }) {
  const t = Math.floor(v / 10);
  const o = v % 10;
  const small = num(tens ? t : o);
  const big = num((tens ? t : o) * 10);
  return (
    <QCard n={n} className="tenscard">
      <div className="pv" dir="ltr">
        <span className={tens ? 'on' : undefined}>{num(t)}</span>
        <span className={tens ? undefined : 'on'}>{num(o)}</span>
      </div>
      {blocks && <TenOnes values={[v]} />}
      <WordChoice words={[small, big]} ans={tens ? big : small} />
    </QCard>
  );
}

/** «١٠ آحاد = عشرة»: القطع ثم الجملة؛ fromTens: يبدأ بالعشرات */
export function OnesTensCard({ n, tens, fromTens }: { n: number; tens: number; fromTens?: boolean }) {
  return (
    <QCard n={n} className="tenscard">
      <TenOnes values={[tens * 10]} />
      <div className="tenline">
        {fromTens ? <><b>{num(tens)}</b> عَشَرَاتٍ = <Blank v={tens * 10} /> آحَادًا</> : <><b>{num(tens * 10)}</b> آحَادًا = <Blank v={tens} /> عَشَرَاتٍ</>}
      </div>
    </QCard>
  );
}

/** عدد بالقطع: الآحاد، ثم العشرات، ثم الجملة */
export function WriteBlocksCard({ n, v }: { n: number; v: number }) {
  const t = Math.floor(v / 10);
  const o = v % 10;
  return (
    <QCard n={n} className="tenscard">
      <TenOnes values={[v]} />
      <div className="tenline"><Blank v={o} /> آحَادٍ <Blank v={t} /> عَشَرَاتٍ</div>
      <Sentence t={[{ b: o }, '+', { b: t * 10 }, '=', { b: v }]} />
    </QCard>
  );
}

/** عدد بالكلمات أو بالأرقام وخانته */
export function WordNumCard({ n, show, ans }: { n: number; show: ReactNode; ans: number | string }) {
  return (
    <QCard n={n} className="tenscard">
      <div className="tenline wn">{show}</div>
      <Blank v={ans} />
    </QCard>
  );
}

/** أعداد ثابتة موزعة في وعاء؛ العدد نفسه يرسم الوضع نفسه دائمًا */
function Jar({ count, color, label }: { count: number; color: string; label: ReactNode }) {
  const cols = 8;
  return (
    <div className="jarw">
      <svg viewBox="0 0 130 170" className="jar" role="img" aria-label="وعاء">
        <rect x={25} y={2} width={80} height={16} rx={4} fill="#d8342c" />
        <rect x={12} y={18} width={106} height={148} rx={14} fill="#eef5fb" stroke="#7d8da1" strokeWidth={3} />
        {Array.from({ length: count }, (_, i) => (
          <circle key={i} cx={22 + (i % cols) * 12.4 + (Math.floor(i / cols) % 2) * 5} cy={156 - Math.floor(i / cols) * 11.5} r={6} fill={color} stroke="#0003" />
        ))}
      </svg>
      <small>{label}</small>
    </div>
  );
}

/** «أقدّر العدد»: وعاء معروف فيه ١٠، ووعاء نقدّره، والخيارات */
export function JarCard({ n, count, unit, options, color = '#4f9be0' }: { n: number; count: number; unit: string; options: [number, number, number]; color?: string }) {
  const words = options.map((o) => `${num(o)} تَقْرِيبًا`);
  return (
    <QCard n={n} className="tenscard">
      <div className="jars">
        <Jar count={count} color={color} label="؟" />
        <Jar count={10} color={color} label={`${num(10)} ${unit}`} />
      </div>
      <WordChoice words={words} ans={`${num(count)} تَقْرِيبًا`} />
    </QCard>
  );
}

/** وعاءان بلا بطاقة سؤال: للشرح */
export function JarPair({ count, unit, color = '#4f9be0' }: { count: number; unit: string; color?: string }) {
  return (
    <div className="jars">
      <Jar count={count} color={color} label="؟" />
      <Jar count={10} color={color} label={`${num(10)} ${unit}`} />
    </div>
  );
}

/** سطر أعداد بلا بطاقة سؤال */
export function SeqLine({ items, ans }: { items: (number | null)[]; ans: number[] }) {
  let k = 0;
  return (
    <div className="seq">
      {items.map((x, i) => (
        <span key={i}>{x === null ? <Blank v={ans[k++]} /> : num(x)}{i < items.length - 1 && '،'}</span>
      ))}
    </div>
  );
}

/** أعداد متتالية، أولها يمينًا؛ null خانة تمتلئ بالعدد الذي في ans */
export function SeqCard({ n, items, ans }: { n: number; items: (number | null)[]; ans: number[] }) {
  let k = 0;
  return (
    <QCard n={n} className="tenscard">
      <div className="seq">
        {items.map((x, i) => (
          <span key={i}>{x === null ? <Blank v={ans[k++]} /> : num(x)}{i < items.length - 1 && '،'}</span>
        ))}
      </div>
    </QCard>
  );
}

/** مقارنة عددين: الأول يمينًا؛ blocks: قطع الكتاب فوقها */
export function CompareCard({ n, a, b, blocks }: { n: number; a: number; b: number; blocks?: boolean }) {
  return (
    <QCard n={n} className="tenscard">
      {blocks && <TenOnes values={[a, b]} />}
      <Sentence t={[a, { b: a > b ? '>' : a < b ? '<' : '=', box: true }, b]} />
    </QCard>
  );
}

/** نمط أشكال ينمو: كل عمود عدد؛ null: الخانة التالية تمتلئ */
export function GrowCard({ n, items, ans, kind = 'circle', color = '#6fa8dc' }: { n: number; items: (number | null)[]; ans: number; kind?: 'circle' | 'triangle' | 'square' | 'star'; color?: string }) {
  const { activeHl } = useSlide();
  const on = activeHl.has(`n${n}`);
  const cols = Math.ceil(Math.sqrt(Math.max(ans, ...items.map((x) => x ?? 0))));
  const mark = (k: number) => (
    <svg key={k} viewBox="0 0 20 20" className="gm">
      {kind === 'circle' && <circle cx={10} cy={10} r={9} fill={color} stroke="#0005" />}
      {kind === 'square' && <rect x={1} y={1} width={18} height={18} fill={color} stroke="#0005" />}
      {kind === 'triangle' && <path d="M10 1 L19 19 H1 Z" fill={color} stroke="#0005" />}
      {kind === 'star' && <path d="M10 1 12.6 7.2 19 7.6 14 12 15.7 19 10 15.2 4.3 19 6 12 1 7.6 7.4 7.2Z" fill={color} stroke="#0005" />}
    </svg>
  );
  return (
    <QCard n={n} className="tenscard">
      <div className="grow">
        {items.map((c, i) => (
          <div key={i} className="gcol">
            <div className="gmarks" style={{ gridTemplateColumns: `repeat(${cols}, 22px)`, visibility: c === null && !on ? 'hidden' : undefined }}>{Array.from({ length: c ?? ans }, (_, k) => mark(k))}</div>
            {c === null ? <Blank v={ans} hl={[`n${n}`] as never} /> : <b>{num(c)}</b>}
          </div>
        ))}
      </div>
    </QCard>
  );
}

/** لوحة المئة؛ تتلون أعداد المجموعة k مع الخطوة (hl: n{k}) */
export function HundredChart({ sets, max = 100 }: { sets?: { nums: number[]; color: string }[]; max?: number }) {
  const { activeHl } = useSlide();
  return (
    <table className="hundred">
      <tbody>
        {Array.from({ length: max / 10 }, (_, r) => (
          <tr key={r}>
            {Array.from({ length: 10 }, (_, c) => {
              const v = r * 10 + c + 1;
              const hit = sets?.find((s, k) => activeHl.has(`n${k}`) && s.nums.includes(v));
              return <td key={c} style={hit ? { background: hit.color } : undefined}>{num(v)}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** إطارا عشرة بقطع حمراء وصفراء؛ moved: تنتقل الصفراء لتكمل الإطار الأول مع الخطوة (hl: n0). hidden: تظهر القطع مع الخطوة (hl: n{k}) */
export function TenFrames({ a, b, moved, k }: { a: number; b: number; moved?: boolean; k?: number }) {
  const { activeHl } = useSlide();
  const go = moved && activeHl.has('n0');
  const hide = k !== undefined && !activeHl.has(`n${k}`);
  const shift = go ? Math.min(10 - a, b) : 0;
  const frame = (reds: number, yellows: number) => (
    <div className="tframe">
      {Array.from({ length: 10 }, (_, i) => (
        <i key={i}>{!hide && i < reds + yellows && <b className={i < reds ? 'r' : 'y'} />}</i>
      ))}
    </div>
  );
  return (
    <div className="tframes">
      {frame(a, shift)}
      {frame(0, b - shift)}
    </div>
  );
}

/** ثلاثة أعداد رأسيًّا؛ rings: العددان اللذان نبدأ بهما، pair: مجموعهما في مربع الكتاب */
export function ThreeCard({ n, nums, rings, pair }: { n: number; nums: [number, number, number]; rings?: [number, number]; pair?: number }) {
  return (
    <QCard n={n} className="vcard">
      <div className="v3">
        {nums.map((x, i) => (
          <span key={i} className="v3d">
            {num(x)}
            {rings?.includes(i) && <Step className="dring">{num(x)}</Step>}
            {i === 2 && <em>+</em>}
          </span>
        ))}
        <i />
        <Blank v={nums[0] + nums[1] + nums[2]} hl={undefined} />
      </div>
      {pair !== undefined && <Blank v={pair} box />}
    </QCard>
  );
}

const PLACES = ['الآحادِ', 'العشراتِ', 'المئاتِ', 'الألوفِ', 'عشراتِ الألوفِ', 'مئاتِ الألوفِ', 'الملايينِ', 'عشراتِ الملايينِ', 'مئاتِ الملايينِ'];

/** «اكتب القيمة المنزلية للرقم الذي تحته خط»: at موضع الرقم من اليمين عند القراءة (٠ أكبر منزلة) */
export function ValueQ({ n, v, at }: { n: number; v: number; at: number }) {
  const s = String(v);
  const power = s.length - at - 1;
  return (
    <QCard n={n}>
      <Stack>
        <div className="bignum" dir="ltr">{s.split('').map((d, i) => (i === at ? <u key={i}>{num(Number(d))}</u> : <span key={i}>{num(Number(d))}</span>))}</div>
        <Stack><StepAns label={`منزلةُ ${PLACES[power]}`}>{num(Number(s[at]) * 10 ** power)}</StepAns></Stack>
      </Stack>
    </QCard>
  );
}

/** عدد مطلوب كتابته بصيغ أخرى؛ كل صيغة خانة إجابة */
export function FormQ({ n, show, rows }: { n: number; show: ReactNode; rows: [string, ReactNode][] }) {
  return (
    <QCard n={n}>
      <Stack>
        <div className="formshow">{show}</div>
        {rows.map(([label, text]) => <Stack key={label}><StepAns label={label}>{text}</StepAns></Stack>)}
      </Stack>
    </QCard>
  );
}

/** ترتيب أعداد؛ asc من الأصغر إلى الأكبر */
export function OrderQ({ n, nums, asc }: { n: number; nums: number[]; asc?: boolean }) {
  const sorted = [...nums].sort((a, b) => (asc ? a - b : b - a));
  return (
    <QCard n={n}>
      <Stack>
        <div className="formshow">{nums.map((x) => num(x)).join('، ')}</div>
        <Stack><StepAns label="التَّرتيبُ">{sorted.map((x) => num(x)).join('، ')}</StepAns></Stack>
      </Stack>
    </QCard>
  );
}

/** تقريب عدد إلى منزلة: step عشرة أو مئة أو ألف… */
export function NearQ({ n, v, step, name }: { n: number; v: number; step: number; name: string }) {
  return (
    <QCard n={n}>
      <Stack>
        <div className="formshow">{num(v)}؛ {name}</div>
        <Stack><StepAns label="التَّقريبُ">{num(Math.round(v / step) * step)}</StepAns></Stack>
      </Stack>
    </QCard>
  );
}

/** مكعبات الألف */
export function Thousands({ count }: { count: number }) {
  return <div className="thous" role="img" aria-label={`${num(count)} × ${num(1000)}`}>{Array.from({ length: count }, (_, i) => <Block key={i} kind="thousand" />)}</div>;
}

/** جدول منازل كبير: الدورات والمنازل، والعدد في خاناته */
export function PeriodTable({ v, ring }: { v: number; ring?: number }) {
  const heads: [string, string[]][] = [['دورةُ الملايينِ', ['مئاتٌ', 'عشراتٌ', 'آحادٌ']], ['دورةُ الألوفِ', ['مئاتٌ', 'عشراتٌ', 'آحادٌ']], ['دورةُ الواحداتِ', ['مئاتٌ', 'عشراتٌ', 'آحادٌ']]];
  const s = String(v).padStart(9, ' ');
  const from = String(v).length > 6 ? 0 : 3;
  return (
    <table className="data ptable" dir="ltr">
      <thead>
        <tr>{heads.slice(from / 3).map(([h]) => <th key={h} colSpan={3}>{h}</th>)}</tr>
        <tr>{heads.slice(from / 3).flatMap(([h, c]) => c.map((x) => <th key={h + x}>{x}</th>))}</tr>
      </thead>
      <tbody>
        <tr>{s.slice(from).split('').map((d, i) => <td key={i} className={ring === i + from ? 'on' : undefined}>{d === ' ' ? '' : num(Number(d))}</td>)}</tr>
      </tbody>
    </table>
  );
}
