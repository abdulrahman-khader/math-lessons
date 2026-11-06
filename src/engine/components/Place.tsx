import { Fragment, useState, type ReactNode } from 'react';
import { num } from '../digits';
import { useSlide } from '../context';
import type { SlideDef } from '../types';
import { Blank } from './Cubes';
import { Card, Cols, QCard, SlideHead, Stack, IfTeams, GoHomeButton, MindMap, Winner } from './Layout';
import { ExitTicket, Goals, Grid } from './Blocks';
import { MCQ } from './MCQ';
import { Block } from './Multiply';
import { Sentence } from './Primary';
import { Step } from './Steps';
import { WordChoice } from './ChanceBook';

/* ---------- قطع الجمع والطرح في الصف الثاني: العشرات والآحاد، وجدول المنازل ---------- */

const T = (x: number) => Math.floor(x / 10) % 10;
const O = (x: number) => x % 10;

/** مجموعات من العشرات والآحاد، الأولى يمينًا كما تُقرأ الجملة */
export function TenOnes({ values, big }: { values: number[]; big?: boolean }) {
  return (
    <div className={'tenones' + (big ? ' big' : '')} role="img" aria-label={values.map((v) => num(v)).join(' و')}>
      {values.map((v, i) => (
        <div key={i} className="tgroup">
          <div className="bones">{Array.from({ length: O(v) }, (_, k) => <Block key={k} kind="one" />)}</div>
          {Array.from({ length: Math.floor(v / 10) }, (_, k) => <Block key={k} kind="ten" />)}
        </div>
      ))}
    </div>
  );
}

/** سؤال جمع عشرات كما في الكتاب: العصي، ثم «٤ عشرات + ٢ عشرات = □ عشرات»، ثم الجملة بالأعداد */
export function TensCard({ n, a, b, op = '+', rods }: { n: number; a: number; b: number; op?: '+' | '−'; rods?: boolean }) {
  const v = op === '+' ? a + b : a - b;
  return (
    <QCard n={n} className="tenscard">
      {rods && <TenOnes values={op === '+' ? [a, b] : [a]} />}
      <div className="tenline">
        <b>{num(a / 10)}</b> عَشَرَاتٍ <span>{op}</span> <b>{num(b / 10)}</b> عَشَرَاتٍ <span>=</span> <Blank v={v / 10} /> عَشَرَاتٍ
      </div>
      <Sentence t={[a, op, b, '=', { b: v }]} />
    </QCard>
  );
}

/**
 * جمع أو طرح في جدول المنازل كما في الكتاب: خانة الآحاد ثم الرقم المحمول ثم خانة العشرات، كل ضغطة خانة.
 * table: جدول بعنواني آحاد وعشرات؛ وإلا خط منقط بين المنزلتين. carry: مربع الكتاب فوق العشرات.
 */
export function PlaceSum({ nums, op = '+', table, carry, rings, wrong, matHl }: { nums: number[]; op?: '+' | '−'; table?: boolean; carry?: boolean; rings?: number[]; wrong?: [number, number]; matHl?: boolean }) {
  const total = op === '+' ? nums.reduce((s, x) => s + x, 0) : nums[0] - nums[1];
  const onesSum = nums.reduce((s, x) => s + O(x), 0);
  const c = op === '+' ? Math.floor(onesSum / 10) : 0;
  const row0 = (table ? 1 : 0) + (carry ? 1 : 0) + 1;
  const last = row0 + nums.length - 1;
  const cell = (r: number, col: number) => ({ gridRow: r + 1, gridColumn: col });
  return (
    <div className={'psum' + (table ? ' tb' : '') + (total > 99 ? ' h' : '')} role="img" aria-label={nums.map((x) => num(x)).join(` ${op} `)} style={{ '--n': nums.length } as React.CSSProperties}>
      {table && (
        <>
          <span className="ph t" style={cell(0, 2)}>عَشَرَاتٌ</span>
          <span className="ph o" style={cell(0, 3)}>آحَادٌ</span>
        </>
      )}
      {nums.map((x, i) => (
        <Fragment key={i}>
          <span className="pd" style={cell(row0 + i, 2)}>{x >= 10 ? num(T(x)) : ''}</span>
          <span className="pd" style={cell(row0 + i, 3)}>
            {wrong && O(x) === 0 ? '' : num(O(x))}
            {rings?.includes(i) && <Step className="dring">{num(O(x))}</Step>}
          </span>
        </Fragment>
      ))}
      <span className="pop" style={cell(last, 4)}>{op}</span>
      <i className="pline" style={{ gridRow: last + 2, gridColumn: '1 / 4' }} />
      {wrong ? (
        <>
          <span className="pd" style={cell(last + 2, 2)}>{num(T(wrong[0]))}</span>
          <span className="pd" style={cell(last + 2, 3)}>{num(O(wrong[0]))}</span>
        </>
      ) : (
        <>
          <span className="pd" style={cell(last + 2, 3)}><Blank v={O(total)} box hl={matHl ? ['n0'] : undefined} /></span>
          {carry && (
            <span className="pd pc" style={cell(table ? 1 : 0, 2)}>
              {c ? <Blank v={c} box hl={matHl ? ['n1'] : undefined} /> : <Blank v="" box empty />}
            </span>
          )}
          <span className="pd" style={cell(last + 2, 2)}><Blank v={T(total)} box /></span>
          {total > 99 && <span className="pd" style={cell(last + 2, 1)}><Blank v={Math.floor(total / 100)} box /></span>}
        </>
      )}
      {table && <i className="pcol" style={{ gridRow: `1 / span ${last + 3}`, gridColumn: 3 }} />}
      {!table && <i className="pdash" style={{ gridRow: `1 / span ${last + 3}`, gridColumn: 3 }} />}
    </div>
  );
}

/** بطاقة سؤال جدول المنازل؛ blocks: قطع الكتاب بجانب الجدول */
export function PlaceCard({ n, nums, op, table, carry, blocks, rings }: { n: number; nums: number[]; op?: '+' | '−'; table?: boolean; carry?: boolean; blocks?: boolean; rings?: number[] }) {
  return (
    <QCard n={n} className="vcard pcard">
      <PlaceSum nums={nums} op={op} table={table} carry={carry} rings={rings} />
      {blocks && <TenOnes values={nums} />}
    </QCard>
  );
}

const onesWord = (k: number) => (k > 10 ? 'آحَادًا' : 'آحَادٍ');

/** جدول «أجمع الآحاد، وأجمع العشرات»: كل صف سؤال من الكتاب، وكل ضغطة خانة */
export function RegroupTable({ rows }: { rows: { n: number; a: number; b: number }[] }) {
  return (
    <table className="data rgt">
      <thead>
        <tr>
          <th />
          <th>أَجْمَعُ الآحَادَ، وَأَجْمَعُ الْعَشَرَاتِ</th>
          <th>هَلْ هُنَاكَ ضَرُورَةٌ لِإِعَادَةِ التَّجْمِيعِ؟ (أُحَوِّطُ الإِجَابَةَ)</th>
          <th>أَكْتُبُ نَاتِجَ الْجَمْعِ</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ n, a, b }) => {
          const ones = O(a) + O(b);
          const tens = T(a) + T(b);
          return (
            <tr key={n} data-qnum={n}>
              <th><span className="qnum">{num(n)}</span> <span className="eq">{num(a)} + {num(b)}</span></th>
              <td><Blank v={ones} /> {onesWord(ones)} <Blank v={tens} /> عَشَرَاتٍ</td>
              <td><WordChoice words={['نَعَمْ', 'لَا']} ans={ones >= 10 ? 'نَعَمْ' : 'لَا'} /></td>
              <td><Blank v={a + b} /></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/**
 * لوحة المنازل بالقطع: العددان بعضهما تحت بعض، وتجتمع الآحاد مع التحويط. hl: n0 تحويط عشرة آحاد، n1 استبدالها بعشرة.
 */
export function PlaceMat({ a, b, big }: { a: number; b?: number; big?: boolean }) {
  const { activeHl } = useSlide();
  const ring = activeHl.has('n0');
  const done = activeHl.has('n1');
  const ones = O(a) + (b === undefined ? 0 : O(b));
  const left = done ? ones - 10 : ones;
  const rods = (k: number) => Array.from({ length: k }, (_, i) => <Block key={i} kind="ten" />);
  const cubes = (k: number) => Array.from({ length: k }, (_, i) => <Block key={i} kind="one" />);
  const split = b !== undefined && !ring && !done;
  return (
    <div className={'pmat' + (big ? ' big' : '') + (split ? ' two' : '')}>
      <div className="pmh t">عَشَرَاتٌ</div>
      <div className="pmh o">آحَادٌ</div>
      <div className="pmc t">
        {split ? <><div className="pmr">{rods(T(a))}</div><div className="pmr">{rods(T(b))}</div></> : <>{rods(T(a) + (b === undefined ? 0 : T(b)))}{done && <span className="newten"><Block kind="ten" /></span>}</>}
      </div>
      <div className="pmc o">
        {split ? (
          <><div className="pmring">{cubes(O(a))}</div><div className="pmring">{cubes(O(b))}</div></>
        ) : ring && !done ? (
          <><div className="pmring on">{cubes(10)}</div>{left > 10 && <div className="pmring">{cubes(left - 10)}</div>}</>
        ) : (
          <div className="pmring">{cubes(left)}</div>
        )}
      </div>
    </div>
  );
}

/** المستكشف: نضيف قطعًا إلى اللوحة، فإذا بلغت الآحاد عشرة أو أكثر نعيد التجميع */
export function RegroupExplorer({ start = 17, tensOnly }: { start?: number; tensOnly?: boolean }) {
  const [t, setT] = useState(Math.floor(start / 10));
  const [o, setO] = useState(start % 10);
  const btn = (label: ReactNode, on: () => void, off?: boolean) => (
    <button type="button" className="btn" disabled={off} onClick={on}>{label}</button>
  );
  return (
    <div className="pexplore">
      <div className="pmat big">
        <div className="pmh t">عَشَرَاتٌ</div>
        <div className="pmh o">آحَادٌ</div>
        <div className="pmc t">{Array.from({ length: t }, (_, k) => <Block key={k} kind="ten" />)}</div>
        <div className="pmc o"><div className="pmring">{Array.from({ length: o }, (_, k) => <Block key={k} kind="one" />)}</div></div>
      </div>
      <Stack>
        <div className="pnow"><b>{num(t)}</b> عَشَرَاتٍ وَ<b>{num(o)}</b> {onesWord(o)}</div>
        {!tensOnly && btn('أُضِيفُ آحَادًا', () => setO(o + 1), o >= 18)}
        {btn('أُضِيفُ عَشَرَةً', () => setT(t + 1), t >= 8)}
        {!tensOnly && btn('أُعِيدُ التَّجْمِيعَ', () => { setO(o - 10); setT(t + 1); }, o < 10 || t >= 9)}
        {btn('أَبْدَأُ مِنْ جَدِيدٍ', () => { setT(Math.floor(start / 10)); setO(start % 10); })}
      </Stack>
    </div>
  );
}

const near = (x: number) => Math.round(x / 10) * 10;

/** تقدير الناتج كما في الكتاب: العددان، وبجانب كل واحد أقرب عشرة له، ثم ناتج التقريب */
export function RoundSum({ a, b, op = '+' }: { a: number; b: number; op?: '+' | '−' }) {
  const ra = near(a);
  const rb = near(b);
  const at = (r: number, c: number) => ({ gridRow: r, gridColumn: c });
  return (
    <div className="rsum">
      <span style={at(1, 4)}>{num(a)}</span>
      <span style={at(2, 4)}>{num(b)}</span>
      <span style={at(2, 5)}>{op}</span>
      <i style={{ gridRow: 3, gridColumn: '4 / 6' }} />
      <span className="rar" style={at(1, 3)}>⟵</span>
      <span className="rar" style={at(2, 3)}>⟵</span>
      <span style={at(1, 1)}><Blank v={ra} box /></span>
      <span style={at(2, 1)}><Blank v={rb} box /></span>
      <span style={at(2, 2)}>{op}</span>
      <i style={{ gridRow: 3, gridColumn: '1 / 3' }} />
      <span style={at(4, 1)}><Blank v={op === '+' ? ra + rb : ra - rb} box /></span>
    </div>
  );
}

export function RoundCard({ n, a, b, op }: { n: number; a: number; b: number; op?: '+' | '−' }) {
  return (
    <QCard n={n} className="vcard rcard">
      <RoundSum a={a} b={b} op={op} />
    </QCard>
  );
}

/** شريحة الأهداف */
export const goalsSlide = (idea: ReactNode, goals: string[], words?: ReactNode): SlideDef => ({
  sec: 'start', min: 1,
  notes: 'اقرأ فكرة الدرس، واسأل الطلاب ماذا يتوقعون أن يتعلموا.',
  content: (
    <>
      <h2>ماذا سنتعلم اليوم؟</h2>
      <Cols even>
        <Stack>
          <Card kind="rule" cap="فكرة الدرس">{idea}</Card>
          {words && <Card kind="rule" cap="المفردات">{words}</Card>}
        </Stack>
        <Card kind="ex" cap="في نهاية الدرس أستطيع أن…"><Goals items={goals} /></Card>
      </Cols>
    </>
  ),
});

type Mind = { cap: string; text: string };

/** ملخص الدرس: أربعة فروع */
export const mindSlide = (center: ReactNode, items: [Mind, Mind, Mind, Mind]): SlideDef => ({
  sec: 'close', min: 1,
  notes: 'اطلب من الطلاب إكمال كل فرع شفهيًا قبل أن تشير إليه.',
  content: (
    <>
      <SlideHead tag="أهمّ الأفكار" kind="rule">ملخص الدرس</SlideHead>
      <MindMap
        center={center}
        items={[{ kind: 'rule', ...items[0] }, { kind: 'ex', ...items[1] }, { kind: 'qs', ...items[2] }, { kind: 'warn', ...items[3] }]}
      />
    </>
  ),
});

type Ticket = [q: string, options: [string, string, string], answer: string];

/** تذكرة الخروج: سهل، متوسط، صعب */
export const exitSlide = (title: string, qs: [Ticket, Ticket, Ticket]): SlideDef => ({
  sec: 'close', min: 3,
  notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة.',
  content: (
    <>
      <SlideHead tag="تذكرة الخروج" kind="qs">{title}</SlideHead>
      <ExitTicket>
        {qs.map(([q, options, answer]) => <MCQ key={q} q={q} options={options} answer={answer as never} />)}
      </ExitTicket>
    </>
  ),
});

/** أسئلة اختيار للصف كله: تهيئة أو «نعمل معًا» */
export const askSlide = (sec: 'engage' | 'elab', title: string, qs: Ticket[], notes: string): SlideDef => ({
  sec, min: 3, notes,
  content: (
    <>
      <SlideHead tag={sec === 'engage' ? 'نتذكر' : 'نعمل معًا'} kind={sec === 'engage' ? 'ink' : 'ex'}>{title}</SlideHead>
      <Grid cols={3}>
        {qs.map(([q, options, answer]) => <MCQ key={q} q={q} options={options} answer={answer as never} award />)}
      </Grid>
    </>
  ),
});

/** شريحة مقطع فكرة الدرس */
export const clipSlide = (clip: ReactNode, notes: string): SlideDef => ({
  sec: 'explain', min: 1, notes,
  content: (
    <>
      <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
      {clip}
    </>
  ),
});

/** شريحة الختام نفسها في كل درس */
export const endSlide: SlideDef = {
  sec: 'close', min: 1,
  notes: 'أعلن الفريق الفائز إن كانت في الحصة فرق، واشكر الطلاب.',
  content: (
    <>
      <SlideHead tag="الختام" kind="ink">
        <IfTeams>الفريق الفائز</IfTeams>
        <IfTeams none>انتهى الدرس، شكرًا لكم</IfTeams>
      </SlideHead>
      <Stack>
        <Winner />
        <GoHomeButton />
      </Stack>
    </>
  ),
};

/** عشرات وآحاد داخل مقطع SVG: العشرات يسارًا، والآحاد بعدها في عمودين من خمسة */
export function SvgBlocks({ x, y, tens = 0, ones = 0, s = 18, op = 1, tenColor = '#e8701a', oneColor = '#e8701a' }: { x: number; y: number; tens?: number; ones?: number; s?: number; op?: number; tenColor?: string; oneColor?: string }) {
  if (op <= 0.01) return null;
  const line = { stroke: '#7a3b00', strokeWidth: 1.5 };
  const onesX = x + tens * (s + 8) + 10;
  return (
    <g opacity={op}>
      {Array.from({ length: tens }, (_, k) => (
        <g key={k}>
          {Array.from({ length: 10 }, (_, i) => <rect key={i} x={x + k * (s + 8)} y={y + i * s} width={s} height={s} fill={tenColor} {...line} />)}
        </g>
      ))}
      {Array.from({ length: ones }, (_, k) => (
        <rect key={k} x={onesX + Math.floor(k / 5) * (s * 1.5 + 6)} y={y + (k % 5) * (s * 2)} width={s * 1.5} height={s * 1.5} fill={oneColor} {...line} />
      ))}
    </g>
  );
}

/** جمع أو طرح رأسي داخل مقطع: رقما كل عدد في منزلتيهما، والإشارة يمين العدد الأخير */
export function SvgVertical({ x, y, nums, op = '+', size = 76, ones, tens, carry, opacity = 1 }: { x: number; y: number; nums: number[]; op?: string; size?: number; ones?: number; tens?: number; carry?: number; opacity?: number }) {
  const gap = size * 1.25;
  const D = (cx: number, cy: number, v: number | string, o = 1, color = 'var(--ink)', sz = size) =>
    o <= 0.01 ? null : <text x={cx} y={cy} opacity={o} fontSize={sz} textAnchor="middle" fill={color} direction="ltr" style={{ fontWeight: 800 }}>{typeof v === 'number' ? num(v) : v}</text>;
  const line = y + (nums.length - 1) * gap + size * 0.35;
  return (
    <g opacity={opacity}>
      {nums.map((v, i) => (
        <g key={i}>
          {v >= 10 && D(x - size * 0.5, y + i * gap, T(v))}
          {D(x + size * 0.5, y + i * gap, O(v))}
        </g>
      ))}
      {D(x + size * 1.5, y + (nums.length - 1) * gap, op)}
      <line x1={x - size * 1.2} x2={x + size * 2} y1={line} y2={line} stroke="var(--ink)" strokeWidth={5} />
      {carry !== undefined && D(x - size * 0.5, y - size, 1, carry, 'var(--bad)', size * 0.6)}
      {ones !== undefined && D(x + size * 0.5, line + size * 1.1, ones >= 0 ? ones : 0, 1, 'var(--good)')}
      {tens !== undefined && D(x - size * 0.5, line + size * 1.1, tens, 1, 'var(--good)')}
    </g>
  );
}
