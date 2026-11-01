import { useState, type ReactNode } from 'react';
import { num } from '../digits';
import type { HlKey } from '../types';
import { DataGrid, Frac, Pie, type Cell, type Slice } from './DataViz';
import { Card, Cols, Stack } from './Layout';
import { useRemoteWidget } from './Primary';

/*
 * قطع جاهزة للبيانات: لوحة الإشارات، والجدول التكراري، والبيانات الخام، ولوحة الصورة.
 * الدرس يعطيها البيانات فقط، وشكلها من الجداول المشتركة (التصميم C في التصميم الجديد).
 */

/** صف بيانات: التسمية وعددها */
export type DataRow = [label: string, n: number];

/** خلية تظهر مع الخطوة التي فيها hl ‹v{i}› */
const at = (i: number, c: { v?: string | number; tally?: number }): Cell => ({ ...c, k: `v${i}` as HlKey });

/** لوحة الصورة لجدول أو أكثر (بلا إطار في التصميم الجديد) */
export const TableBox = ({ children }: { children: ReactNode }) => <div className="chart tbl">{children}</div>;

/** لوحة الصورة لرسم أو صورة */
export const PicBox = ({ children }: { children: ReactNode }) => <div className="chart pic">{children}</div>;


/** لوحة إشارات؛ reveal: إشارات كل صف تظهر مع خطوتها (v{i})، والصف يُبرز بـ p{i} */
export function TallyTable({ title, head, rows, reveal, tone = 'salmon', small }: { title?: string; head: string; rows: DataRow[]; reveal?: boolean; tone?: 'salmon' | 'orange'; small?: boolean }) {
  return <DataGrid title={title} head={[head, 'الإشاراتُ']} tone={tone} small={small} rows={rows.map(([l, n], i) => [l, reveal ? at(i, { tally: n }) : { tally: n }])} />;
}

/** جدول تكراري؛ reveal: عدد كل صف يظهر مع خطوته (v{i}) */
export function FreqTable({ title, head, rows, reveal, count = 'التَّكرارُ', small }: { title?: string; head: string; rows: DataRow[]; reveal?: boolean; count?: string; small?: boolean }) {
  return <DataGrid title={title} head={[head, count]} small={small} rows={rows.map(([l, n], i) => [l, reveal ? at(i, { v: n }) : n])} />;
}

/** بيانات خام كما جُمعت، أعمدةً من اليمين؛ head: عنوان لكل عمود (ويُكتب الجدول بحجمه العادي) */
export function RawData({ title, head, cols }: { title?: string; head?: string[]; cols: string[][] }) {
  const h = Math.max(...cols.map((c) => c.length));
  return <DataGrid title={title} head={head} small={!head} rows={Array.from({ length: h }, (_, r) => cols.map((c) => c[r] ?? ''))} />;
}

/** طريقة خاطئة لكتابة ٥ بالإشارات: خمس إشارات بلا خط مائل */
export const WrongTally = () => <span className="tally5">|||||</span>;

/**
 * مسح في الصف: زر لكل خيار يضيف صوتًا، ولوحة الإشارات والجدول التكراري يتغيران معه.
 * يُتحكم به من السبورة أو من الجوال.
 */
export function VoteExplorer({ title, head, options }: { title: string; head: string; options: string[] }) {
  const [n, setN] = useState(() => options.map(() => 0));
  const add = (i: number, d: number) => setN((x) => x.map((v, j) => (j === i ? Math.max(0, Math.min(30, v + d)) : v)));
  const clear = () => setN(options.map(() => 0));
  const total = n.reduce((a, b) => a + b, 0);
  const top = Math.max(...n);
  useRemoteWidget(
    () => ({
      title,
      info: `عدد الأصوات: ${num(total)}`,
      steppers: options.map((f, i) => ({ key: String(i), label: f, value: n[i], min: 0, max: 30 })),
      buttons: [{ key: 'clear', label: 'تصويت جديد' }],
    }),
    (k, v) => {
      if (k === 'clear') clear();
      else if (v !== undefined) add(+k, v - n[+k]);
    },
    [n],
  );
  return (
    <Cols className="vote">
      <Stack>
        {options.map((f, i) => (
          <div key={f} className="ffstep">
            <span>{f}</span>
            <button aria-label={`إنقاص ${f}`} disabled={!n[i]} onClick={() => add(i, -1)}>
              −
            </button>
            <b>{num(n[i])}</b>
            <button aria-label={`صوت ل${f}`} onClick={() => add(i, 1)}>
              +
            </button>
          </div>
        ))}
        <button className="btn" onClick={clear}>
          تصويت جديد
        </button>
      </Stack>
      <DataGrid title={title} head={[head, 'الإشاراتُ']} tone="salmon" rows={options.map((f, i) => [f, { tally: n[i] }])} />
      <Stack>
        <DataGrid title={title} head={[head, 'التَّكرارُ']} rows={[...options.map((f, i): Cell[] => [f, n[i]]), ['المجموعُ', total]]} />
        {/* يُحسب من تصويت الصف، ويتغير مع كل صوت */}
        {total > 0 && (
          <b className="votetop">
            الأكثرُ تصويتًا: {options.filter((_, i) => n[i] === top).join(' و')} ({num(top)})
          </b>
        )}
      </Stack>
    </Cols>
  );
}

/**
 * جدول نمط أفقي كما في الكتاب: الصف الأول عناوين، والعمود j (بعد العناوين) يظهر مع خطوة فيها hl ‹v{j}›
 * إن كان رقمه في hide، ويُبرز بمفتاح p{j}.
 */
export function PatternTable({ heads, rows, hide = [], tone = 'green', small }: { heads: string[]; rows: (number | string)[][]; hide?: number[]; tone?: 'green' | 'blue'; small?: boolean }) {
  const grid: Cell[][] = heads.map((h, r) => [h, ...rows[r].map((v, j): Cell => (hide.includes(j) ? { v, k: `v${j}` as HlKey } : v))]);
  return <DataGrid orient="cols" tone={tone} rows={grid} small={small} />;
}

const seq = (a: number, n: number) => Array.from({ length: n }, (_, i) => a * (i + 1));

/** مستكشف جدول النمط: ما يزيده كل صف، وعمود جديد مع كل ضغطة (من السبورة أو الجوال) */
export function PatternExplorer({ heads }: { heads: [string, string] }) {
  const [a, setA] = useState(2);
  const [b, setB] = useState(9);
  const [cols, setCols] = useState(3);
  const fit = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
  useRemoteWidget(
    () => ({
      title: 'جدول النمط',
      info: `${num(a * cols)} ← ${num(b * cols)}`,
      steppers: [
        { key: 'a', label: 'يزيد الصف الأول', value: a, min: 1, max: 9 },
        { key: 'b', label: 'يزيد الصف الثاني', value: b, min: 1, max: 12 },
      ],
      buttons: [
        { key: 'next', label: 'العمود التالي', on: true, disabled: cols >= 8 },
        { key: 'reset', label: 'من جديد' },
      ],
    }),
    (k, v) => {
      if (k === 'a' && v !== undefined) setA(fit(v, 1, 9));
      else if (k === 'b' && v !== undefined) setB(fit(v, 1, 12));
      else if (k === 'next') setCols((c) => Math.min(8, c + 1));
      else if (k === 'reset') setCols(1);
    },
    [a, b, cols],
  );
  const stepper = (label: string, v: number, set: (v: number) => void, hi: number) => (
    <div className="ffstep">
      <span>{label}</span>
      <button aria-label={`إنقاص ${label}`} disabled={v <= 1} onClick={() => set(fit(v - 1, 1, hi))}>
        −
      </button>
      <b>{num(v)}</b>
      <button aria-label={`زيادة ${label}`} disabled={v >= hi} onClick={() => set(fit(v + 1, 1, hi))}>
        +
      </button>
    </div>
  );
  return (
    <Stack>
      <div className="hopx-ctrl">
        {stepper('يزيد الصف الأول', a, setA, 9)}
        {stepper('يزيد الصف الثاني', b, setB, 12)}
        <button className="btn step-btn" disabled={cols >= 8} onClick={() => setCols((c) => c + 1)}>
          العمود التالي
        </button>
        <button className="btn" onClick={() => setCols(1)}>
          من جديد
        </button>
      </div>
      <TableBox>
        <PatternTable heads={heads} rows={[seq(a, cols), seq(b, cols)]} />
      </TableBox>
    </Stack>
  );
}

/** تمثيل بالقطاعات الدائرية في لوحة الصورة */
export function PieBox({ title, slices, size = 440, fs = 24 }: { title?: string; slices: Slice[]; size?: number; fs?: number }) {
  return (
    <PicBox>
      <Pie title={title} slices={slices} size={size} fs={fs} />
    </PicBox>
  );
}

/** دوائر صغيرة، كلٌّ منها جزء ملوّن من الكل وكسره تحتها */
export function FractionPies({ fracs, color = '#f4813f' }: { fracs: [n: number, d: number][]; color?: string }) {
  return (
    <div className="qgrid four">
      {fracs.map(([a, d]) => (
        <Card key={`${a}${d}`} kind="ex" className="fracpie">
          <Pie slices={[{ label: '', value: a, color }, { label: '', value: d - a, color: '#f1d9c4' }]} size={130} />
          <p>
            <Frac n={a} d={d} />
          </p>
        </Card>
      ))}
    </div>
  );
}

/** مستكشف القطاعات: عدد الطلاب في كل فئة يغيّر حجم قطاعها، وكسرها من الكل بجانبها */
export function PieExplorer({ title, names, colors, start }: { title: string; names: string[]; colors: string[]; start: number[] }) {
  const [n, setN] = useState(start);
  const total = n.reduce((a, b) => a + b, 0);
  const set = (i: number, v: number) => setN((x) => x.map((y, j) => (j === i ? Math.max(0, Math.min(12, v)) : y)));
  useRemoteWidget(
    () => ({
      title: 'القطاعات الدائرية',
      info: n.map((v, i) => `${names[i]} ${num(v)} من ${num(total)}`).join('، '),
      steppers: names.map((l, i) => ({ key: String(i), label: l, value: n[i], min: 0, max: 12, color: colors[i] })),
      buttons: [],
    }),
    (k, v) => v !== undefined && set(+k, v),
    [n],
  );
  return (
    <Cols>
      <Stack>
        {names.map((l, i) => (
          <div key={l} className="ffstep" style={{ borderColor: colors[i] }}>
            <span>{l}</span>
            <button aria-label={`إنقاص ${l}`} disabled={n[i] <= 0} onClick={() => set(i, n[i] - 1)}>
              −
            </button>
            <b>{num(n[i])}</b>
            <button aria-label={`زيادة ${l}`} disabled={n[i] >= 12} onClick={() => set(i, n[i] + 1)}>
              +
            </button>
            <span className="pex-f">{total ? <Frac n={n[i]} d={total} /> : null}</span>
          </div>
        ))}
      </Stack>
      <PicBox>
        <Pie title={title} slices={names.map((l, i) => ({ label: l, value: n[i], color: colors[i] }))} size={340} />
      </PicBox>
    </Cols>
  );
}
