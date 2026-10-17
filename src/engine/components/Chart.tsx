import type { ReactNode } from 'react';
import { useSlide } from '../context';
import { num } from '../digits';
import type { ChartSpec } from '../types';

export interface Geom {
  W: number;
  H: number;
  m: { l: number; r: number; t: number; b: number };
  pw: number;
  ph: number;
  n: number;
  X: (i: number) => number;
  Y: (v: number) => number;
}

/** المحور الأفقي يسير من اليسار إلى اليمين كما في الكتاب، حتى داخل صفحة RTL */
export function geom(c: ChartSpec): Geom {
  const W = 760;
  const H = 480;
  const m = { l: c.ml ?? 104, r: 26, t: c.title ? 62 : 26, b: c.xTitle ? 92 : 56 };
  const pw = W - m.l - m.r;
  const ph = H - m.t - m.b;
  const n = c.labels.length;
  return { W, H, m, pw, ph, n, X: (i) => m.l + (pw * (i + 0.5)) / n, Y: (v) => m.t + ph * (1 - (v - c.min) / (c.max - c.min)) };
}

const range = (from: number, to: number, step: number) => {
  const out: number[] = [];
  for (let v = from; v <= to + 1e-9; v += step) out.push(+v.toFixed(6));
  return out;
};

interface Props {
  spec: ChartSpec;
  /** قيم بديلة (للرسوم القابلة للسحب) */
  values?: (number | null)[];
  mode?: ChartSpec['mode'];
  /** موضع نقطة «اسحب» الإرشادية */
  ghost?: number | null;
}

/** رسم بياني SVG: خطوط أو أعمدة أو مكعبات، مع أدلة قراءة تُبرَز من خطوات الحل في الشريحة نفسها. */
export function ChartSvg({ spec: c, values, mode, ghost }: Props) {
  const { activeHl } = useSlide();
  const on = (k: string) => (activeHl.has(k) ? ' on' : '');
  const vals = values ?? c.values;
  const g = geom(c);
  const { W, H, m, pw, ph, X, Y } = g;
  const base = m.t + ph;
  const md = mode ?? c.mode ?? 'line';
  const parts: ReactNode[] = [];

  const segs: string[][] = [];
  let seg: string[] = [];
  vals.forEach((v, i) => {
    if (v == null) {
      if (seg.length) segs.push(seg);
      seg = [];
    } else seg.push(`${X(i)},${Y(v)}`);
  });
  if (seg.length) segs.push(seg);

  if (md === 'bars') {
    const bw = Math.min((pw / g.n) * 0.55, 90);
    vals.forEach((v, i) => {
      if (v) parts.push(<rect key={`b${i}`} className={'bar' + on(`p${i}`)} x={X(i) - bw / 2} y={Y(v)} width={bw} height={base - Y(v)} />);
    });
  } else if (md === 'cubes') {
    const u = c.cube ?? 1;
    const h = base - Y(c.min + u);
    const w = Math.min(h * 1.25, (pw / g.n) * 0.6);
    vals.forEach((v, i) => {
      if (v == null) return;
      for (let k = 0; k < Math.round(v / u); k++)
        parts.push(<rect key={`c${i}-${k}`} className="cube" x={X(i) - w / 2} y={base - (k + 1) * h + 2} width={w} height={h - 4} rx={4} />);
    });
  } else {
    segs.forEach((sg, j) =>
      parts.push(<polyline key={`l${j}`} className={'ln' + on('line')} points={sg.join(' ')} style={c.line ? { stroke: c.line } : undefined} />),
    );
    parts.push(
      <g key="pts" className={'ptsall' + on('pts')}>
        {vals.map((v, i) => {
          if (v == null) return null;
          const big = activeHl.has(`p${i}`) || activeHl.has('pts');
          return <circle key={i} className={'pt' + on(`p${i}`)} cx={X(i)} cy={Y(v)} r={big ? 13 : 8} />;
        })}
      </g>,
    );
  }

  const ghostY = Y((c.min + c.max) / 2);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="cs" role="img" aria-label={c.title ?? 'تمثيل بالخطوط'}>
      <rect className="plot" x={m.l} y={m.t} width={pw} height={ph} />
      {range(c.gridFrom ?? c.min, c.max, c.grid).map((v) => (
        <line key={`gl${v}`} className="gl" x1={m.l} x2={m.l + pw} y1={Y(v)} y2={Y(v)} />
      ))}
      {c.vgrid && c.labels.map((_, i) => <line key={`vg${i}`} className="gl" x1={X(i)} x2={X(i)} y1={m.t} y2={base} />)}
      {range(c.labFrom ?? c.min, c.max, c.lab).map((v) => (
        <text key={`yl${v}`} className="yl" x={m.l - 12} y={Y(v)} textAnchor="end" dominantBaseline="middle">
          {num(v)}
        </text>
      ))}
      {c.brk && <path className="brk" d={`M${m.l - 10} ${base - 2} l10 -6 l-10 -6 l10 -6`} />}
      <line className={'ax' + on('xaxis')} x1={m.l} x2={m.l + pw} y1={base} y2={base} />
      <line className={'ax' + on('yaxis')} x1={m.l} x2={m.l} y1={m.t} y2={base} />
      {c.labels.map((L, i) => (
        <text key={`xl${i}`} className={'xl' + on(`x${i}`) + on('xaxis')} x={X(i)} y={base + 30} textAnchor="middle" style={{ fontSize: c.xfs ?? 21 }}>
          {L}
        </text>
      ))}
      {c.title && (
        <text className={'ct' + on('title')} x={m.l + pw / 2} y={36} textAnchor="middle">
          {c.title}
        </text>
      )}
      {c.yTitle && (
        <text className={'at' + on('yaxis')} transform={`translate(26 ${m.t + ph / 2}) rotate(-90)`} textAnchor="middle">
          {c.yTitle}
        </text>
      )}
      {c.xTitle && (
        <text className={'at' + on('xaxis')} x={m.l + pw / 2} y={H - 14} textAnchor="middle">
          {c.xTitle}
        </text>
      )}
      {vals.map((v, i) =>
        v == null ? null : (
          <g key={`gd${i}`}>
            <line className={'guide' + on(`g${i}`)} x1={X(i)} x2={X(i)} y1={Y(v)} y2={base} />
            <line className={'guide' + on(`h${i}`)} x1={X(i)} x2={m.l} y1={Y(v)} y2={Y(v)} />
          </g>
        ),
      )}
      {parts}
      {ghost != null && (
        <>
          <circle className="ghost" cx={X(ghost)} cy={ghostY} r={14} />
          <text className="gtext" x={X(ghost)} y={ghostY - 26} textAnchor="middle">
            اسحب
          </text>
        </>
      )}
      {vals.map((v, i) => {
        if (v == null) return null;
        const t = num(v);
        const w = t.length * 14 + 26;
        let y = Y(v) - 48;
        if (y < m.t - 8) y = Y(v) + 18;
        return (
          <g key={`vt${i}`} className={'vt' + on(`v${i}`)}>
            <rect x={X(i) - w / 2} y={y} width={w} height={34} rx={8} />
            <text x={X(i)} y={y + 24} textAnchor="middle">
              {t}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** رسم ثابت داخل إطار */
export function Chart(props: Props) {
  return (
    <div className="chart">
      <ChartSvg {...props} />
    </div>
  );
}
