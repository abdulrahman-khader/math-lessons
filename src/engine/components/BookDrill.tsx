import type { ComponentProps, ReactNode } from 'react';
import type { HlKey } from '../types';
import { CubeTrain, FactLine, VSum, type CubePart } from './Cubes';
import { QCard } from './Layout';
import { Domino, FactTriangle, Sentence, Towers, type Token } from './Primary';
import { Step } from './Steps';

/*
 * تمارين صفحة الكتاب في الصف الثاني (طرق الطرح): بطاقات صغيرة كثيرة، كل واحدة جملة أو طرح رأسي
 * تمتلئ خانة ناتجه عند «التالي». الدرس يعطي الأعداد فقط، والشكل كله هنا.
 */

/** لوحة المكعبات (أو الأبراج)؛ dbl: برجان متقابلان، sm: أصغر */
export const CubeBox = ({ dbl, sm, children }: { dbl?: boolean; sm?: boolean; children: ReactNode }) => (
  <div className={'chart cubebox' + (dbl ? ' dbl' : '') + (sm ? ' sm' : '')}>{children}</div>
);

/** لوحة خط الأعداد؛ small: أقصر، فوق صفحة تمارين */
export const LineBox = ({ small, children }: { small?: boolean; children: ReactNode }) => (
  <div className={'chart nlbox' + (small ? ' sm' : '')}>{children}</div>
);

/** دائرة الكتاب حول البطاقة («أحوّط المسألة…»)، تظهر مع خطوتها */
const Ring = ({ children }: { children?: ReactNode }) => (children ? <Step className="ring">{children}</Step> : null);

/** بطاقة جمل أفقية؛ two: جملتان في عمودين (دومينو)، ring: الكتاب يطلب تحويطها */
export function SentenceCard({ n, lines, ring, two }: { n: number; lines: Token[][]; ring?: ReactNode; two?: boolean }) {
  return (
    <QCard n={n}>
      <div className={'flines' + (two ? ' two72' : '')}>
        {lines.map((t, i) => (
          <Sentence key={i} t={t} />
        ))}
      </div>
      <Ring>{ring}</Ring>
    </QCard>
  );
}

type SumProps = ComponentProps<typeof VSum>;

/** بطاقة طرح (أو جمع) رأسي، واحد أو أكثر جنبًا إلى جنب */
export function SumCard({ n, sums, ring }: { n: number; sums: SumProps[]; ring?: ReactNode }) {
  return (
    <QCard n={n} className="vcard">
      <div className="vrow">
        {sums.map((s, i) => (
          <VSum key={i} {...s} />
        ))}
      </div>
      <Ring>{ring}</Ring>
    </QCard>
  );
}

/** مجموعة حقائق من جزأين: الجمع، ثم طرح الجزء الثاني، ثم الأول */
export function FamilyCard({ n, a, b }: { n: number; a: number; b: number }) {
  const c = a + b;
  return (
    <QCard n={n} className="fcard">
      <div className="flines">
        <FactLine a={a} op="+" b={b} v={c} />
        <FactLine a={c} op="−" b={b} v={a} />
        <FactLine a={c} op="−" b={a} v={b} />
      </div>
    </QCard>
  );
}

/** دومينو نصفه مخفي: جملة الجمع بالعدد المفقود، وجملة الطرح التي تجده؛ النصف يظهر مع أول ناتج */
export function DominoCard({ n, known, total }: { n: number; known: number; total: number }) {
  const m = total - known;
  return (
    <QCard n={n} className="dcard">
      <Domino known={known} missing={m} k={n} />
      <div className="flines two72">
        <Sentence t={[known, '+', { box: true, b: m, hl: [`p${n}` as HlKey] }, '=', total]} />
        <Sentence t={[total, '−', known, '=', { box: true, b: m }]} />
      </div>
    </QCard>
  );
}

/**
 * مثلث حقائق مترابطة وحقائقه كاملة: جمعان ثم طرحان، كل الأعداد في خانات تمتلئ بالترتيب.
 * إن تساوى الجزآن فحقيقتان فقط.
 */
export function TriFamilyCard({ n, top, left, right, color }: { n: number; top: number; left: number; right: number; color: readonly [string, string] }) {
  const same = left === right;
  return (
    <QCard n={n} className="tricard">
      <FactTriangle top={top} left={left} right={right} color={color[0]} edge={color[1]} />
      <div className="flines tri2">
        <Sentence t={[{ b: right }, '+', { b: left }, '=', { b: top }]} />
        <Sentence t={[{ b: top }, '−', { b: right }, '=', { b: left }]} />
        {!same && <Sentence t={[{ b: left }, '+', { b: right }, '=', { b: top }]} />}
        {!same && <Sentence t={[{ b: top }, '−', { b: left }, '=', { b: right }]} />}
      </div>
    </QCard>
  );
}

/** عدّ تنازلي يظهر عددًا عددًا مع «التالي» (مثل إطلاق الصاروخ) */
export function Countdown({ items }: { items: string[] }) {
  return (
    <div className="countdown">
      {items.map((x) => (
        <Step key={x} className="cd">
          {x}
        </Step>
      ))}
    </div>
  );
}

/** بطاقة جمل بجانب برجين من المكعبات (جمع العدد ونفسه)؛ k: مفتاح الإبراز للبرجين */
export function TowerCard({ n, lines, a, b, k, colors }: { n: number; lines: Token[][]; a: number; b: number; k: number; colors: [string, string] }) {
  return (
    <QCard n={n} className="tcard">
      <div className="flines">
        {lines.map((t, i) => (
          <Sentence key={i} t={t} />
        ))}
      </div>
      <div className="twbox">
        <Towers a={a} b={b} k={k} colors={colors} size={22} />
      </div>
    </QCard>
  );
}

/**
 * صف مكعبات بجزأين وحقائقه الثلاث كما في الكتاب: الجمع (يضمّ الجزأين)، ثم طرح الجزء الذي يُؤخذ أولًا، ثم الآخر.
 * take[0]: الجزء الذي يُؤخذ في الطرح الأول (٠ الأول، ١ الثاني). الإبراز: p{k} ثم v{k} ثم x{k}.
 */
export function TrainFactCard({ n, parts, k, take }: { n: number; parts: [CubePart, CubePart]; k: number; take: [number, number] }) {
  const [a, b] = [parts[0].n, parts[1].n];
  const c = a + b;
  const first = take[0] === 0 ? a : b;
  return (
    <QCard n={n} className="ccard">
      <CubeTrain parts={parts} k={k} take={take} size={30} counts={false} />
      <div className="flines two72">
        <FactLine a={a} op="+" b={b} v={c} hl={[`p${k}` as HlKey]} />
        <FactLine a={c} op="−" b={first} v={c - first} hl={[`v${k}` as HlKey]} />
        <span />
        <FactLine a={c} op="−" b={c - first} v={first} hl={[`x${k}` as HlKey]} />
      </div>
    </QCard>
  );
}

/** دومينو نصفه مخفي بجانب جمل الكتاب نفسها (طرح ثم جمع)؛ النصف يظهر مع خطوة p{n} */
export function DominoLinesCard({ n, known, missing, lines }: { n: number; known: number; missing: number; lines: Token[][] }) {
  return (
    <QCard n={n} className="dcard">
      <Domino known={known} missing={missing} k={n} />
      <div className="flines">
        {lines.map((t, i) => (
          <Sentence key={i} t={t} />
        ))}
      </div>
    </QCard>
  );
}

/** مثلث حقائق بجانب جمل الكتاب كما هي (بعضها مكتوب وبعضها خانات تمتلئ) */
export function TriangleCard({ n, top, left, right, color, lines }: { n: number; top: number; left: number; right: number; color: readonly [string, string]; lines: Token[][] }) {
  return (
    <QCard n={n} className="tricard">
      <FactTriangle top={top} left={left} right={right} color={color[0]} edge={color[1]} />
      <FactGrid lines={lines} />
    </QCard>
  );
}

/** جمل الحقائق المترابطة في عمودين (الجمع يمينًا والطرح يسارًا) */
export function FactGrid({ lines, big }: { lines: Token[][]; big?: boolean }) {
  return (
    <div className="flines tri2">
      {lines.map((t, i) => (
        <Sentence key={i} t={t} big={big} />
      ))}
    </div>
  );
}
