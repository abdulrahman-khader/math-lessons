import { Fragment } from 'react';
import { num } from '../digits';
import { useSlide } from '../context';
import { Blank } from './Cubes';

/* ---------- قطع الضرب في الصف الرابع: ترتيب النقاط في صفوف، وجدول الضرب ---------- */

/** نقاط في صفوف متساوية كما في الكتاب */
export function DotArray({ rows, cols, big }: { rows: number; cols: number; big?: boolean }) {
  return (
    <div className={'dotarr' + (big ? ' big' : '')} style={{ '--c': cols } as React.CSSProperties} role="img" aria-label={`${num(rows)} × ${num(cols)}`}>
      {Array.from({ length: rows * cols }, (_, i) => (
        <i key={i} />
      ))}
    </div>
  );
}

/**
 * ترتيبات عدد واحد، بعضها تحت بعض. كل ترتيب مخفي ومكانه محفوظ حتى تذكره خطوة (hl: n{i})،
 * وتظلّله الخطوة الحالية.
 */
export function DotArrays({ items }: { items: [number, number][] }) {
  const { activeHl, nowHl } = useSlide();
  return (
    <div className="dotlist">
      {items.map(([r, c], i) => (
        <div key={i} className={'dotrow' + (activeHl.has(`n${i}`) ? ' shown' : '') + (nowHl.has(`n${i}`) ? ' now' : '')}>
          <span className="eq">
            {num(r)} × {num(c)} = {num(r * c)}
          </span>
          <DotArray rows={r} cols={c} />
        </div>
      ))}
    </div>
  );
}

/** جدول الضرب كما في الكتاب؛ تظليل صف العدد n وعموده يظهر مع الخطوة (hl: h0 الصف، g0 العمود) */
export function TimesTable({ n, size = 10 }: { n: number; size?: number }) {
  const { activeHl } = useSlide();
  const nums = Array.from({ length: size }, (_, i) => i + 1);
  const row = activeHl.has('h0');
  const col = activeHl.has('g0');
  return (
    <table className="times">
      <thead>
        <tr>
          <th>×</th>
          {nums.map((c) => (
            <th key={c}>{num(c)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {nums.map((r) => (
          <tr key={r}>
            <th>{num(r)}</th>
            {nums.map((c) => (
              <td key={c} className={(row && r === n) || (col && c === n) ? 'on' : undefined}>
                {num(r * c)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export type PlaceKind = 'one' | 'ten' | 'hundred' | 'thousand';

/** قطعة قاعدة العشرة: آحاد، عشرة، مئة، ألف */
function Block({ kind }: { kind: PlaceKind }) {
  const line = { stroke: '#7a3b00', strokeWidth: 1 };
  if (kind === 'one') return <svg viewBox="0 0 12 12" className="pb one"><rect x={1} y={1} width={10} height={10} fill="#e8701a" {...line} /></svg>;
  if (kind === 'ten')
    return (
      <svg viewBox="0 0 12 102" className="pb ten">
        {Array.from({ length: 10 }, (_, i) => <rect key={i} x={1} y={1 + i * 10} width={10} height={10} fill="#e8701a" {...line} />)}
      </svg>
    );
  const grid = Array.from({ length: 100 }, (_, i) => <rect key={i} x={(i % 10) * 10} y={Math.floor(i / 10) * 10} width={10} height={10} fill="#e8701a" {...line} />);
  if (kind === 'hundred') return <svg viewBox="-1 -1 102 102" className="pb hundred">{grid}</svg>;
  return (
    <svg viewBox="-1 -1 132 132" className="pb thousand">
      <path d="M30 0 H130 V100 L100 130 V30 Z" fill="#b5520f" {...line} />
      <path d="M0 30 L30 0 H130 L100 30 Z" fill="#f0935a" {...line} />
      <g transform="translate(0,30)">{grid}</g>
    </svg>
  );
}

/** صفوف من قطع قاعدة العشرة مع جملتها؛ كل صف مخفي ومكانه محفوظ حتى تذكره خطوة (hl: n{i}) */
export function PlaceRows({ items }: { items: { kind: PlaceKind; count: number; plus?: { kind: PlaceKind; count: number }; label: string; eq: string }[] }) {
  const { activeHl, nowHl } = useSlide();
  return (
    <div className="dotlist">
      {items.map((it, i) => (
        <div key={i} className={'dotrow prow' + (activeHl.has(`n${i}`) ? ' shown' : '') + (nowHl.has(`n${i}`) ? ' now' : '')}>
          <div className="pblocks">
            {Array.from({ length: it.count }, (_, k) => <Block key={k} kind={it.kind} />)}
            {it.plus && Array.from({ length: it.plus.count }, (_, k) => <Block key={`p${k}`} kind={it.plus!.kind} />)}
          </div>
          <span className="eq">{it.eq}</span>
          <small>{it.label}</small>
        </div>
      ))}
    </div>
  );
}

/** مفكرة شهر كما في الكتاب: الأيام المعلَّمة في دائرة. يبدأ الشهر من اليوم start (٠ السبت) */
export function MonthCal({ days, marked, start }: { days: number; marked: number[]; start: number }) {
  const names = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
  const cells = [...Array<number>(start).fill(0), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(0);
  return (
    <table className="mcal">
      <thead>
        <tr>{names.map((n) => <th key={n}>{n}</th>)}</tr>
      </thead>
      <tbody>
        {Array.from({ length: cells.length / 7 }, (_, r) => (
          <tr key={r}>
            {cells.slice(r * 7, r * 7 + 7).map((d, i) => (
              <td key={i} className={marked.includes(d) ? 'on' : undefined}>{d ? num(d) : ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * الضرب الرأسي كما في الكتاب: علامة × على يمين الرقم، وخانات الناتج تمتلئ من الآحاد إلى اليسار، وكل رقم يُحمل يظهر فوق منزلته
 * بعد الخانة التي نتج عنها. مكان الرقم المحمول فارغ قبل ظهوره حتى لا يكشف الحاجة إلى إعادة التجميع.
 * regroup يحفظ سطر الأرقام المحمولة في البطاقات كلها.
 */
export function VMul({ a, b, regroup }: { a: number; b: number; regroup?: boolean }) {
  const top = String(a).split('').reverse().map(Number);
  const out = String(a * b).split('').reverse().map(Number);
  const w = Math.max(top.length, out.length);
  /** عمود الخانة i من اليمين */
  const col = (i: number) => w - i;
  let carry = 0;
  const cells = out.map((d, i) => {
    const next = i < top.length ? Math.floor((top[i] * b + carry) / 10) : 0;
    carry = next;
    const show = next > 0 && i + 1 < top.length;
    return (
      <Fragment key={i}>
        <span className="vd" style={{ gridRow: 5, gridColumn: col(i) }}><Blank v={d} box /></span>
        {show && <span className="vd vc" style={{ gridRow: 1, gridColumn: col(i + 1) }}><Blank v={next} box /></span>}
      </Fragment>
    );
  });
  return (
    <div className={'vmul' + (regroup ? ' room' : '')} style={{ '--w': w } as React.CSSProperties} role="img" aria-label={`${num(a)} × ${num(b)}`}>
      {top.map((d, i) => <span key={i} className="vd" style={{ gridRow: 2, gridColumn: col(i) }}>{num(d)}</span>)}
      <span className="vd" style={{ gridRow: 3, gridColumn: col(0) }}>{num(b)}</span>
      <span className="vd" style={{ gridRow: 3, gridColumn: w + 1 }}>×</span>
      <i className="vline" />
      {cells}
    </div>
  );
}

/** مجموعات متساوية من العشرات والآحاد كما في نماذج الكتاب */
export function BlockGroups({ groups, tens, ones, big }: { groups: number; tens: number; ones: number; big?: boolean }) {
  return (
    <div className={'bgroups' + (big ? ' big' : '')} role="img" aria-label={`${num(groups)} × ${num(tens * 10 + ones)}`}>
      {Array.from({ length: groups }, (_, g) => (
        <div key={g} className="bgroup">
          {Array.from({ length: tens }, (_, k) => <Block key={k} kind="ten" />)}
          <div className="bones">
            {Array.from({ length: ones }, (_, k) => <Block key={k} kind="one" />)}
          </div>
        </div>
      ))}
    </div>
  );
}

/** نمط أشكال كما في الكتاب، يُقرأ من اليمين */
export function ShapeRow({ items }: { items: ('circle' | 'triangle' | 'square')[] }) {
  const line = { stroke: 'var(--ink)', strokeWidth: 3 };
  return (
    <div className="shaperow" role="img" aria-label="نمط أشكال">
      {items.map((k, i) => (
        <svg key={i} viewBox="0 0 60 60">
          {k === 'circle' && <circle cx={30} cy={30} r={26} fill="#6fa8dc" {...line} />}
          {k === 'triangle' && <path d="M30 5 L56 55 H4 Z" fill="#6cbb8c" {...line} />}
          {k === 'square' && <rect x={5} y={5} width={50} height={50} fill="#ef7f6a" {...line} />}
        </svg>
      ))}
    </div>
  );
}

/** نموذج المستطيل: جزء لكل مكوّن من العدد، الآحاد ثم العشرات كما في الكتاب. grid يرسم الوحدات، والناتج الجزئي يظهر مع الخطوة (hl: n{i}) */
export function AreaModel({ h, parts, grid }: { h: number; parts: number[]; grid?: boolean }) {
  const { activeHl, nowHl } = useSlide();
  return (
    <div className="areaw">
      <div className="atop">
        {parts.map((p, i) => <span key={i} style={{ flexGrow: grid ? p : Math.max(p, 4) }}>{num(p)}</span>)}
      </div>
      <div className="arow">
        <b>{num(h)}</b>
        <div className={'area' + (grid ? ' grid' : '')} style={{ '--h': h } as React.CSSProperties}>
          {parts.map((p, i) => (
            <div key={i} className={`apart a${i}` + (nowHl.has(`n${i}`) ? ' now' : '')} style={{ flexGrow: grid ? p : Math.max(p, 4) }}>
              {activeHl.has(`n${i}`) && <span className="eq">{num(h)} × {num(p)} = {num(h * p)}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
