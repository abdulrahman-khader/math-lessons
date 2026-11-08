import { useRef, useState, type ReactNode } from 'react';
import { num } from '../digits';
import { Bag, type BagItem } from './DataViz';
import { Card, Cols, QCard, QCol } from './Layout';
import { LiveTally, useTallies } from './LiveTally';
import { useRemoteWidget } from './Primary';
import { Step } from './Steps';

/*
 * قطع الاحتمال في الصف الثاني (أكيد، مستحيل، أكثر إمكانية، أقل إمكانية) بشكل الكتاب:
 * مكعب ملوّن داخل النص، وكلمتان تُحوَّط الصحيحة منهما، وأكياس يلوّنها الطلاب أو يسحبون منها.
 */

/** ألوان المكعبات كما في الكتاب */
export const CUBE_COLORS = { green: '#4fae3a', yellow: '#f6c21c', red: '#d7302a', orange: '#f28a1d', blue: '#2f3f9e', purple: '#8e44ad', gray: '#e3e7ed' };

/** مكعب صغير بلون داخل النص؛ big: أكبر، بجانب الكيس */
export const CubeChip = ({ c, big }: { c: string; big?: boolean }) => <span aria-hidden className={'cchip' + (big ? ' big' : '')} style={{ background: c }} />;

/** كلمتا الكتاب، والصحيحة تُحوَّط عند الخطوة */
export function WordChoice<W extends string>({ words, ans }: { words: readonly W[]; ans: W }) {
  return (
    <div className="row cwords">
      {words.map((w) => (
        <span key={w} className="cword">
          {w}
          {w === ans && <Step className="cring">{w}</Step>}
        </span>
      ))}
    </div>
  );
}

const SURE = ['أَكِيدٌ', 'مُسْتَحِيلٌ'] as const;

/** «أحوّط»: المكعب المختار بجانب الكيس، والكلمتان تحتهما */
export function CircleRow({ n, pick, items, ans }: { n: number; pick: string; items: BagItem[]; ans: (typeof SURE)[number] }) {
  return (
    <QCard n={n} className="ccard">
      <div className="cbody">
        <div className="row cpick">
          <CubeChip c={pick} big />
          <Bag items={items} shape="cube" size={230} />
        </div>
        <WordChoice words={SURE} ans={ans} />
      </div>
    </QCard>
  );
}

const LIKELY = ['أَكْثَرُ إِمْكَانِيَّةً', 'أَقَلُّ إِمْكَانِيَّةً'] as const;

/** «سحب … من سحب …»: الكيس ونصّ الكتاب، والعبارة الصحيحة تُحوَّط عند الخطوة */
export function CompareQ({ n, a, b, items, ans }: { n: number; a: string; b: string; items: BagItem[]; ans: (typeof LIKELY)[number] }) {
  return (
    <QCard n={n} className="ccard">
      <div className="cbody">
        <b>
          يُوجَدُ {num(items[0].n)} <CubeChip c={items[0].color} /> وَ {num(items[1].n)} <CubeChip c={items[1].color} /> فِي كِيسٍ.
        </b>
        <Bag items={items} shape="cube" size={200} />
        <b>
          سَحْبُ <CubeChip c={a} /> …… مِنْ سَحْبِ <CubeChip c={b} />
        </b>
        <WordChoice words={LIKELY} ans={ans} />
      </div>
    </QCard>
  );
}

/** عدد سحبات تجربة الكتاب: «أسحب مكعبًا وأعيده ١٠ مرات» */
const DRAWS = 10;
const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * تجربة السحب: «نسحبُ مكعبًا» يُخرج مكعبًا عشوائيًا من الكيس، وتُضاف إشارته في صف لونه،
 * ثم يعود المكعب إلى الكيس مع السحبة التالية. لمس الصف يضيف إشارة يدويًا (إن سحبوا من كيس حقيقي).
 */
export function DrawTally({ id, items }: { id: string; items: BagItem[] }) {
  const [v, set] = useTallies(id, items.length);
  const vRef = useRef(v);
  vRef.current = v;
  const [out, setOut] = useState<{ k: number; id: number } | null>(null);
  const busy = useRef(false);
  const total = v.reduce((a, b) => a + b, 0);
  const flat = items.flatMap((it, i) => Array.from({ length: it.n }, () => i));
  const done = total >= DRAWS;
  const draw = () => {
    if (busy.current || done || !flat.length) return;
    busy.current = true;
    const k = Math.floor(Math.random() * flat.length);
    setOut({ k, id: Date.now() });
    // الإشارة بعد أن يخرج المكعب من الكيس
    window.setTimeout(
      () => {
        set(vRef.current.map((x, j) => (j === flat[k] ? x + 1 : x)));
        busy.current = false;
      },
      reduced() ? 0 : 700,
    );
  };
  const label = done ? `سحبنا ${num(DRAWS)} مرات` : `نسحبُ مكعبًا (${num(total)} من ${num(DRAWS)})`;
  return (
    <div className="dtally">
      <div className="dbag">
        <Bag items={items} shape="cube" size={240} out={out} />
        <button className="btn primary ddraw" onClick={(e) => (e.currentTarget.blur(), draw())} disabled={done}>
          {label}
        </button>
      </div>
      <LiveTally
        id={id}
        head="اللَّوْنُ"
        count={false}
        title="نتائج السحب"
        extra={{ label: done ? `سحبنا ${num(DRAWS)} مرات` : 'اسحب مكعبًا', disabled: done, on: draw }}
        rows={items.map((it) => ({
          name: it.name,
          label: (
            <>
              <CubeChip c={it.color} /> {it.name}
            </>
          ),
        }))}
      />
    </div>
  );
}

/* ---------- «أُلَوِّنُ»: الطلاب يلوّنون مكعبات الكيس بأنفسهم ---------- */

const C = CUBE_COLORS;
/** ألوان التلوين؛ لمس المكعب ينقله إلى اللون التالي ثم يعيده رماديًا */
const PAINT = [
  { name: 'أحمر', all: 'حمراء', c: C.red },
  { name: 'أصفر', all: 'صفراء', c: C.yellow },
  { name: 'أخضر', all: 'خضراء', c: C.green },
  { name: 'أزرق', all: 'زرقاء', c: C.blue },
];

export interface ColorDef {
  n: number;
  pick: string;
  word: string;
  /** لون حل دليل المعلم */
  fill: string;
  total: number;
}

/**
 * الحكم على تلوين الطلاب: «أكيد» صحيح إن كانت المكعبات كلها بلون الاختيار،
 * و«مستحيل» صحيح إن لُوِّنت كلها ولا مكعب منها بلون الاختيار.
 */
function verdict(cs: number[], pick: string, word: string) {
  const p = PAINT.findIndex((x) => x.c === pick);
  const { name, all } = PAINT[p];
  if (cs.every((x) => x < 0)) return null;
  if (word.startsWith('أَكِيد'))
    return cs.every((x) => x === p)
      ? { ok: true, text: `صحيحٌ: كلُّ المكعباتِ ${all}، فاختيارُ الـ${name} أكيدٌ.` }
      : { ok: false, text: `ليس بعدُ: ليكونَ الاختيارُ أكيدًا تكونُ كلُّ المكعباتِ ${all}.` };
  if (cs.some((x) => x === p)) return { ok: false, text: `في الكيسِ مكعبٌ ${name}، فاختيارُه ممكنٌ لا مستحيلٌ.` };
  if (cs.some((x) => x < 0)) return { ok: false, text: `ليس بعدُ: نلوّنُ كلَّ المكعباتِ بألوانٍ غيرِ الـ${name}.` };
  return { ok: true, text: `صحيحٌ: لا مكعبَ ${name} في الكيسِ، فاختيارُه مستحيلٌ.` };
}

/** عدد مكعبات كل لون ← مكعبات الكيس مرتّبة (-١ رمادي) */
const fromCounts = (counts: number[], total: number) => {
  const out: number[] = [];
  counts.forEach((k, c) => out.push(...Array(k).fill(c)));
  return [...out, ...Array(total - out.length).fill(-1)];
};

/**
 * سؤالا «أُلَوِّنُ» في الشريحة: يلوّن الطلاب المكعبات بأنفسهم (لمس المكعب، أو عدد كل لون من الجوال).
 * الحكم يظهر وحده بمجرد أن يبدأ التلوين؛ وقبله «التالي» يُظهر حل دليل المعلم.
 */
export function ColorPair({ qs }: { qs: ColorDef[] }) {
  const [cubes, setCubes] = useState(() => qs.map((q) => Array<number>(q.total).fill(-1)));
  const counts = cubes.map((cs) => PAINT.map((_, c) => cs.filter((x) => x === c).length));
  const tap = (q: number, i: number) =>
    setCubes((all) => all.map((cs, j) => (j !== q ? cs : cs.map((x, k) => (k !== i ? x : x + 1 >= PAINT.length ? -1 : x + 1)))));
  useRemoteWidget(
    () => ({
      title: 'تلوين المكعبات',
      steppers: qs.flatMap((q, j) =>
        PAINT.map((p, c) => ({
          key: `${j}:${c}`,
          label: `${num(q.n)}، ${p.name}`,
          value: counts[j][c],
          min: 0,
          max: counts[j][c] + q.total - counts[j].reduce((a, b) => a + b, 0),
          color: p.c,
        })),
      ),
      buttons: [{ key: 'clear', label: 'امسح التلوين' }],
    }),
    (k, v) => {
      if (k === 'clear') return setCubes(qs.map((q) => Array<number>(q.total).fill(-1)));
      const [j, c] = k.split(':').map(Number);
      if (v === undefined) return;
      setCubes((all) => all.map((cs, x) => (x !== j ? cs : fromCounts(counts[j].map((n, y) => (y === c ? v : n)), qs[j].total))));
    },
    [cubes.map((cs) => cs.join()).join('|')],
  );
  return (
    <div className="qgrid two">
      {qs.map(({ n, pick, word, fill, total }, q) => {
        const v = verdict(cubes[q], pick, word);
        return (
          <QCard key={n} n={n} className="ccard">
            <div className="cbody">
              <b>
                اخْتِيَارُ <CubeChip c={pick} /> {word}
              </b>
              <div className="cbags">
                <div className="paintbag">
                  {cubes[q].map((x, i) => (
                    <button key={i} aria-label={`لوّن المكعب ${num(i + 1)}`} style={{ background: x < 0 ? C.gray : PAINT[x].c }} onClick={() => tap(q, i)} />
                  ))}
                </div>
                {!v && (
                  <Step className="cover">
                    <Bag items={[{ name: 'ملوّن', n: total, color: fill }]} shape="cube" size={170} />
                  </Step>
                )}
              </div>
              {v && <b className={'cverdict' + (v.ok ? ' ok' : '')}>{v.text}</b>}
            </div>
          </QCard>
        );
      })}
    </div>
  );
}

/** استكشاف: نختار الكيس، ثم نسحب مكعبًا (السحب عشوائي) */
export function DrawExplorer({ bags, question }: { bags: { name: string; items: BagItem[] }[]; question: ReactNode }) {
  const [b, setB] = useState(0);
  const [got, setGot] = useState<string[]>([]);
  const draw = () => {
    const flat = bags[b].items.flatMap((it) => Array.from({ length: it.n }, () => it.name));
    setGot((g) => [...g, flat[Math.floor(Math.random() * flat.length)]].slice(-8));
  };
  return (
    <Cols>
      <QCol>
        <div className="row cbagpick">
          {bags.map((x, i) => (
            <button key={x.name} className={'btn' + (i === b ? ' sel' : '')} onClick={() => (setB(i), setGot([]))}>
              {x.name}
            </button>
          ))}
        </div>
        <button className="btn primary" onClick={draw}>
          اسحب مكعبًا
        </button>
        <b className="cgot">سَحَبْنَا: {got.join('، ') || '…'}</b>
        <Card kind="qs" cap="سؤال">
          {question}
        </Card>
      </QCol>
      <Bag items={bags[b].items} shape="cube" size={300} />
    </Cols>
  );
}

/** سؤال تجربة من الكتاب: «أضع … و… في كيس»، ثم الكيس وجدول إشارات يملؤه الصف */
export function DrawCard({ n, id, items }: { n: number; id: string; items: [BagItem, BagItem] }) {
  return (
    <QCard n={n}>
      <div className="cbody start">
        <b>
          أَضَعُ {num(items[0].n)} <CubeChip c={items[0].color} /> وَ {num(items[1].n)} <CubeChip c={items[1].color} /> فِي كِيسٍ.
        </b>
        <DrawTally id={id} items={items} />
      </div>
    </QCard>
  );
}
