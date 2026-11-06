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
export function PlaceRows({ items }: { items: { kind: PlaceKind; count: number; label: string; eq: string }[] }) {
  const { activeHl, nowHl } = useSlide();
  return (
    <div className="dotlist">
      {items.map((it, i) => (
        <div key={i} className={'dotrow prow' + (activeHl.has(`n${i}`) ? ' shown' : '') + (nowHl.has(`n${i}`) ? ' now' : '')}>
          <div className="pblocks">
            {Array.from({ length: it.count }, (_, k) => <Block key={k} kind={it.kind} />)}
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

/** الضرب الرأسي كما في الكتاب: خانات الناتج تمتلئ من الآحاد إلى اليسار */
export function VMul({ a, b }: { a: number; b: number }) {
  const out = String(a * b).split('').reverse().map(Number);
  return (
    <div className="vmul" role="img" aria-label={`${num(a)} × ${num(b)}`}>
      <span className="vrow">{num(a)}</span>
      <span className="vrow">× {num(b)}</span>
      <span className="vrow vres">
        {out.map((d, i) => <Blank key={i} v={d} box />)}
      </span>
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
