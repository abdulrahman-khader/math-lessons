import type { ReactNode } from 'react';
import { useSlide } from '../context';
import { num } from '../digits';
import type { HlKey } from '../types';

/*
 * أدوات تنظيم البيانات (الصف الرابع، الفصل الثالث): لوحة الإشارات، الجداول، الأعمدة الأفقية،
 * القطاعات الدائرية، القرص الدوّار، والكيس. كلها تُبرَز من خطوات الحل بمفاتيح hl نفسها:
 * p{i} العنصر i، v{i} قيمته، g{i} دليل القراءة إلى المحور.
 */

/* ---------- كسر رأسي ---------- */

/** كسر كما في الكتاب: البسط فوق المقام */
export const Frac = ({ n, d }: { n: number; d: number }) => (
  <span className="frac" aria-label={`${num(n)} من ${num(d)}`}>
    <span>{num(n)}</span>
    <span>{num(d)}</span>
  </span>
);

/* ---------- الإشارات ---------- */

/** إشارات العدّ: كل خمس حزمة (أربعة خطوط ومائل)، والحزم تبدأ من اليمين كما في الكتاب */
export function Tally({ n, color = 'var(--ink)', h = 30 }: { n: number; color?: string; h?: number }) {
  const step = h * 0.26;
  const gap = h * 0.55;
  const groups = Math.floor(n / 5);
  const rest = n % 5;
  const W = Math.max(1, groups * (4 * step + gap) + rest * step + 4);
  const lines: ReactNode[] = [];
  let x = W - 2;
  for (let g = 0; g < groups; g++) {
    const x1 = x - 3 * step;
    for (let i = 0; i < 4; i++) lines.push(<line key={`${g}-${i}`} x1={x - i * step} x2={x - i * step} y1={2} y2={h - 2} />);
    lines.push(<line key={`${g}-d`} x1={x + step * 0.5} x2={x1 - step * 0.5} y1={h * 0.28} y2={h * 0.72} />);
    x -= 4 * step + gap;
  }
  for (let i = 0; i < rest; i++) lines.push(<line key={`r${i}`} x1={x - i * step} x2={x - i * step} y1={2} y2={h - 2} />);
  return (
    <svg className="tally" viewBox={`0 0 ${W} ${h}`} style={{ height: '1.1em', width: 'auto', stroke: color }} role="img" aria-label={`${num(n)} إشارات`}>
      {lines}
    </svg>
  );
}

/* ---------- الجداول ---------- */

/**
 * خلية جدول: نص أو عدد، أو إشارات (tally)، أو خلية مخفية تظهر عند مفتاح k
 * (مربع رمادي كما في الكتاب حتى تظهر).
 */
export type Cell = string | number | { v?: string | number; tally?: number; k?: HlKey; color?: string; node?: ReactNode };

interface GridProps {
  title?: string;
  /** صف العناوين */
  head?: ReactNode[];
  rows: Cell[][];
  /** لون رأس الجدول كما في الكتاب */
  tone?: 'blue' | 'orange' | 'salmon' | 'green';
  /**
   * rows: الصف i يُبرز بمفتاح p{i} (جداول التكرار ولوحات الإشارات).
   * cols: جدول أفقي، العمود الأول عناوين، والعمود j (بعده) يُبرز بمفتاح p{j} (جداول الأنماط).
   */
  orient?: 'rows' | 'cols';
  /** خط أصغر للجداول الطويلة */
  small?: boolean;
}

function CellView({ c }: { c: Cell }) {
  const { activeHl } = useSlide();
  if (typeof c === 'number') return <>{num(c)}</>;
  if (typeof c === 'string') return <>{c}</>;
  if (c.k && !activeHl.has(c.k)) return <span className="cellhide" aria-label="مخفي" />;
  const v = c.v === undefined ? null : typeof c.v === 'number' ? num(c.v) : c.v;
  return (
    <span className={c.k ? 'cellshow' : undefined}>
      {c.node ?? (c.tally !== undefined ? <Tally n={c.tally} color={c.color} /> : v)}
    </span>
  );
}

/** جدول بيانات بإبراز الصفوف أو الأعمدة، وخلايا تظهر مع خطوات الحل */
export function DataGrid({ title, head, rows, tone = 'blue', orient = 'rows', small }: GridProps) {
  const { activeHl } = useSlide();
  const cols = Math.max(head?.length ?? 0, ...rows.map((r) => r.length));
  return (
    <table className={`dgrid ${tone}${small ? ' small' : ''}${orient === 'cols' ? ' horiz' : ''}`}>
      {(title || head) && (
        <thead>
          {title && (
            <tr>
              <th colSpan={cols} className="dg-title">
                {title}
              </th>
            </tr>
          )}
          {head && (
            <tr>
              {head.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          )}
        </thead>
      )}
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className={orient === 'rows' && activeHl.has(`p${i}`) ? 'on' : undefined}>
            {r.map((c, j) => {
              const colOn = orient === 'cols' && j > 0 && activeHl.has(`p${j - 1}`);
              return orient === 'cols' && j === 0 ? (
                <th key={j}>
                  <CellView c={c} />
                </th>
              ) : (
                <td key={j} className={colOn ? 'on' : undefined}>
                  <CellView c={c} />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- الأعمدة الأفقية ---------- */

interface HBarsProps {
  title?: string;
  /** التسميات من الأعلى إلى الأسفل كما تظهر في الكتاب */
  labels: string[];
  values: number[];
  max: number;
  /** المسافة بين خطوط الشبكة الرأسية */
  grid: number;
  /** المسافة بين الأعداد على المحور الأفقي */
  lab: number;
  xTitle?: string;
  yTitle?: string;
  color?: string;
  /** يكتب قيمة كل عمود عند طرفه كما في بعض رسوم الكتاب؛ تُبرز بالمفتاح v{i} */
  ends?: boolean;
}

/** تمثيل بالأعمدة الأفقية: المحور الأفقي من اليسار إلى اليمين كما في الكتاب */
export function HBars({ title, labels, values, max, grid, lab, xTitle, yTitle, color = '#8bc34a', ends }: HBarsProps) {
  const { activeHl } = useSlide();
  const on = (k: string) => (activeHl.has(k) ? ' on' : '');
  const W = 760;
  const H = 440;
  const m = { l: 150, r: ends ? 70 : 30, t: title ? 56 : 20, b: xTitle ? 86 : 50 };
  const pw = W - m.l - m.r;
  const ph = H - m.t - m.b;
  const n = labels.length;
  const X = (v: number) => m.l + (pw * v) / max;
  const Y = (i: number) => m.t + (ph * (i + 0.5)) / n;
  const bh = Math.min((ph / n) * 0.55, 60);
  const ticks: number[] = [];
  for (let v = 0; v <= max + 1e-9; v += grid) ticks.push(+v.toFixed(6));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="cs hbars" role="img" aria-label={title ?? 'تمثيل بالأعمدة'}>
      <rect className="plot" x={m.l} y={m.t} width={pw} height={ph} />
      {ticks.map((v) => (
        <line key={`g${v}`} className="gl" x1={X(v)} x2={X(v)} y1={m.t} y2={m.t + ph} />
      ))}
      {ticks
        .filter((v) => Math.abs(v / lab - Math.round(v / lab)) < 1e-9)
        .map((v) => (
          <text key={`l${v}`} className="yl" x={X(v)} y={m.t + ph + 32} textAnchor="middle">
            {num(v)}
          </text>
        ))}
      {labels.map((L, i) => (
        <g key={i}>
          <line className={'guide' + on(`g${i}`)} x1={X(values[i])} x2={X(values[i])} y1={Y(i)} y2={m.t + ph} />
          <rect className={'bar' + on(`p${i}`)} x={m.l} y={Y(i) - bh / 2} width={X(values[i]) - m.l} height={bh} style={activeHl.has(`p${i}`) ? undefined : { fill: color }} />
          <text className={'xl' + on(`p${i}`)} x={m.l - 12} y={Y(i)} textAnchor="end" dominantBaseline="middle">
            {L}
          </text>
          {ends && (
            <text className={'hv' + on(`v${i}`)} x={X(values[i]) + 10} y={Y(i)} dominantBaseline="middle">
              {num(values[i])}
            </text>
          )}
        </g>
      ))}
      <line className="ax" x1={m.l} x2={m.l + pw} y1={m.t + ph} y2={m.t + ph} />
      <line className="ax" x1={m.l} x2={m.l} y1={m.t} y2={m.t + ph} />
      {title && (
        <text className="ct" x={m.l + pw / 2} y={36} textAnchor="middle">
          {title}
        </text>
      )}
      {xTitle && (
        <text className="at" x={m.l + pw / 2} y={H - 16} textAnchor="middle">
          {xTitle}
        </text>
      )}
      {yTitle && (
        <text className="at" transform={`translate(26 ${m.t + ph / 2}) rotate(-90)`} textAnchor="middle">
          {yTitle}
        </text>
      )}
      {labels.map((_, i) => {
        const t = num(values[i]);
        const w = t.length * 14 + 26;
        return (
          <g key={`v${i}`} className={'vt' + on(`v${i}`)}>
            <rect x={X(values[i]) + 8} y={Y(i) - 17} width={w} height={34} rx={8} />
            <text x={X(values[i]) + 8 + w / 2} y={Y(i) + 7} textAnchor="middle">
              {t}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- القطاعات الدائرية والقرص الدوّار ---------- */

export interface Slice {
  label: string;
  value: number;
  color: string;
  /** نص إضافي تحت التسمية (عدد أو كسر) */
  sub?: string;
}

interface PieProps {
  title?: string;
  /** القطاعات باتجاه عقارب الساعة بدءًا من الأعلى، كما في الكتاب */
  slices: Slice[];
  /** مؤشر القرص الدوّار بالدرجات (٠ = الأعلى) */
  pointer?: number;
  /** أصغر للقرص في عمود ضيق */
  size?: number;
  /** حجم خط التسميات */
  fs?: number;
  /** قطاعات بارزة دائمًا (للمستكشف)، تتقدّم على الخطوات */
  picked?: number[];
  /** زاوية بداية أول قطاع بالدرجات (٠ = الأعلى)، لمطابقة رسم الكتاب */
  start?: number;
}

/** تمثيل بالقطاعات الدائرية؛ القطاع i يبرز (ويبهت غيره) بمفتاح p{i} */
/** لون غامق؟ (لكتابة الاسم بالأبيض فوقه) */
function isDark(hex: string) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return false;
  const n = parseInt(m[1], 16);
  const lum = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum < 120;
}

export function Pie({ title, slices, pointer, size = 300, fs = 26, picked, start = 0 }: PieProps) {
  const { activeHl } = useSlide();
  const lit = picked ?? slices.map((_, i) => i).filter((i) => activeHl.has(`p${i}`));
  const any = lit.length > 0;
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const R = 150;
  const pad = 70;
  const S = (R + pad) * 2;
  // العنوان نص عادي فوق الرسم (يلتف إن طال)، لا داخل SVG
  const top = 0;
  const cx = S / 2;
  const cy = S / 2 + top;
  const pt = (a: number, r: number) => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
  let a0 = (start * Math.PI) / 180;
  /** إطار القطاعات المبرزة يُرسم فوق كل القطاعات حتى لا يغطيه القطاع المجاور */
  const outlines: { i: number; d: string }[] = [];
  const parts = slices.map((s, i) => {
    const a1 = a0 + (2 * Math.PI * s.value) / total;
    const mid = (a0 + a1) / 2;
    const on = lit.includes(i);
    const [x0, y0] = pt(a0, R);
    const [x1, y1] = pt(a1, R);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const d = s.value >= total ? `M${cx - R} ${cy} a${R} ${R} 0 1 0 ${2 * R} 0 a${R} ${R} 0 1 0 ${-2 * R} 0` : `M${cx} ${cy} L${x0} ${y0} A${R} ${R} 0 ${large} 1 ${x1} ${y1} Z`;
    if (on) outlines.push({ i, d });
    const frac = s.value / total;
    /** قطاع ضيق لا يتسع لاسمه أفقيًا: يُكتب الاسم والعدد على سطر واحد بطول القطاع داخله */
    const thin = frac < 0.07 && frac >= 0.04;
    /** قطاع ضيق جدًا: الاسم خارج الدائرة بجانبه */
    const tiny = frac < 0.04;
    const [lx, ly] = pt(mid, tiny ? R + 14 : thin ? R * 0.62 : R * 0.6);
    // خارج الدائرة يمتد الاسم بعيدًا عنها (يسارًا في النصف الأيسر، يمينًا في الأيمن)
    const anchor = !tiny ? 'middle' : Math.sin(mid) < 0 ? 'end' : 'start';
    // بطول القطاع: اتجاه نصف القطر، ويُقلب نصف دورة في النصف الأيسر حتى لا يُقرأ مقلوبًا
    const deg = (mid * 180) / Math.PI - 90 + (Math.sin(mid) < 0 ? 180 : 0);
    a0 = a1;
    return (
      // القطاع المبرز يبقى في مكانه داخل الدائرة (لا يُسحب للخارج) ويُميَّز بإطار داكن، والباقي يبهت
      <g key={i} className={'slice' + (on ? ' on' : any ? ' dim' : '') + (!tiny && isDark(s.color) ? ' light' : '')}>
        <path d={d} fill={s.color} />
        {thin ? (
          <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="pie-l" style={{ fontSize: fs * 0.85 }} transform={`rotate(${deg} ${lx} ${ly})`}>
            {s.label}
            {s.sub && <tspan className="pie-s">{' ' + s.sub}</tspan>}
          </text>
        ) : (
          <>
            <text x={lx} y={ly - (s.sub ? fs * 0.35 : 0)} textAnchor={anchor} dominantBaseline="middle" className="pie-l" style={{ fontSize: fs }}>
              {s.label}
            </text>
            {s.sub && (
              <text x={lx} y={ly + fs * 0.75} textAnchor={anchor} dominantBaseline="middle" className="pie-s" style={{ fontSize: fs * 0.85 }}>
                {s.sub}
              </text>
            )}
          </>
        )}
      </g>
    );
  });
  const pa = ((pointer ?? 0) * Math.PI) / 180;
  const [px, py] = pt(pa, R * 0.78);
  const svg = (
    <svg viewBox={`0 0 ${S} ${S + top}`} className="pie" style={{ maxWidth: size }} role="img" aria-label={title ?? 'تمثيل بالقطاعات الدائرية'}>
      {parts}
      <circle cx={cx} cy={cy} r={R} className="pie-edge" />
      {outlines.map((o) => (
        <path key={o.i} d={o.d} className="pie-hl" />
      ))}
      {pointer !== undefined && (
        <g className="pointer">
          <line x1={cx - (px - cx) * 0.2} y1={cy - (py - cy) * 0.2} x2={px} y2={py} />
          <circle cx={cx} cy={cy} r={9} />
        </g>
      )}
    </svg>
  );
  return title ? (
    <figure className="piefig" style={{ maxWidth: size }}>
      <figcaption>{title}</figcaption>
      {svg}
    </figure>
  ) : (
    svg
  );
}

/* ---------- الكيس ---------- */

export interface BagItem {
  name: string;
  n: number;
  color: string;
}

/**
 * كيس شفاف فيه كرات أو مكعبات بألوانها. اللون i يبرز (ويبهت غيره) بمفتاح p{i}.
 * picked يتقدّم على الخطوات (للمستكشف).
 */
/**
 * out: الكرة المسحوبة (رقمها بين كل الكرات بالترتيب) تخرج فوق فتحة الكيس، ومكانها يبقى فارغًا.
 * id يتغير مع كل سحبة لتُعاد الحركة. null = لم نسحب بعد (تُحجز المساحة فوق الكيس).
 */
export function Bag({ items, shape = 'ball', picked, size = 380, out }: { items: BagItem[]; shape?: 'ball' | 'cube'; picked?: number[]; size?: number; out?: { k: number; id: number } | null }) {
  const { activeHl } = useSlide();
  const lit = picked ?? items.map((_, i) => i).filter((i) => activeHl.has(`p${i}`));
  const flat = items.flatMap((it, i) => Array.from({ length: it.n }, () => ({ i, color: it.color })));
  const total = flat.length;
  const per = total <= 4 ? 2 : total <= 9 ? 3 : total <= 16 ? 4 : 5;
  const rowsN = Math.ceil(total / per);
  const cell = 46;
  const W = 300;
  const H = 120 + rowsN * cell + 40;
  const bodyTop = 100;
  const top = out === undefined ? 0 : 84;
  const pos = (k: number) => {
    const row = Math.floor(k / per);
    const inRow = Math.min(per, total - row * per);
    return [W / 2 + (k % per - (inRow - 1) / 2) * cell, bodyTop + 24 + row * cell + cell / 2];
  };
  const drawn = out && out.k < total ? flat[out.k] : null;
  return (
    <svg viewBox={`0 ${-top} ${W} ${H + top}`} className="bag" style={{ maxWidth: size }} role="img" aria-label={items.map((it) => `${num(it.n)} ${it.name}`).join('، ')}>
      <path d={`M115 60 Q100 30 120 28 L180 28 Q200 30 185 60 Z`} className="bag-neck" />
      <path d={`M115 62 C40 90 18 ${H - 70} 40 ${H - 22} Q150 ${H} 260 ${H - 22} C282 ${H - 70} 260 90 185 62 Z`} className="bag-body" />
      <path d="M112 64 Q150 74 188 64" className="bag-tie" />
      {flat.map((b, k) => {
        const [x, y] = pos(k);
        if (drawn && out!.k === k) return <circle key={k} cx={x} cy={y} r={cell * 0.44} className="bag-gone" />;
        const cls = 'bag-item' + (lit.length ? (lit.includes(b.i) ? ' on' : ' dim') : '');
        return shape === 'cube' ? (
          <rect key={k} className={cls} x={x - cell * 0.42} y={y - cell * 0.42} width={cell * 0.84} height={cell * 0.84} rx={5} fill={b.color} />
        ) : (
          <g key={k} className={cls}>
            <circle cx={x} cy={y} r={cell * 0.44} fill={b.color} />
            <circle cx={x - cell * 0.14} cy={y - cell * 0.14} r={cell * 0.12} fill="#fff8" />
          </g>
        );
      })}
      {drawn && (() => {
        const [x, y] = pos(out!.k);
        const r = cell * 0.62;
        return (
          <g key={out!.id} className="bag-out" style={{ ['--dx' as string]: `${x - W / 2}px`, ['--dy' as string]: `${y + 40}px` }}>
            {shape === 'cube' ? (
              <rect x={W / 2 - r} y={-40 - r} width={r * 2} height={r * 2} rx={6} fill={drawn.color} />
            ) : (
              <>
                <circle cx={W / 2} cy={-40} r={r} fill={drawn.color} />
                <circle cx={W / 2 - r * 0.32} cy={-40 - r * 0.32} r={r * 0.27} fill="#fff8" />
              </>
            )}
          </g>
        );
      })()}
    </svg>
  );
}

/* ---------- وصف الاحتمال ---------- */

/** وصف الاحتمال بالكلمات من عدد الحالات المرغوبة والكلية */
export function chanceWord(k: number, n: number) {
  if (k <= 0) return 'مستحيل';
  if (k >= n) return 'مؤكَّد';
  if (2 * k === n) return 'متساوي الإمكانية';
  return 2 * k > n ? 'أكثر احتمالًا' : 'أقل احتمالًا';
}
