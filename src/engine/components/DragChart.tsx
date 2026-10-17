import { useRef, useState, type PointerEvent } from 'react';
import { ChartSvg, geom } from './Chart';
import type { ChartSpec } from '../types';

interface Props {
  spec: ChartSpec;
  values: (number | null)[];
  onChange: (values: (number | null)[]) => void;
  /** المواضع التي يمكن سحبها */
  editable: number[];
  /** التقريب عند السحب */
  snap?: number;
  mode?: ChartSpec['mode'];
  /** نقطة «اسحب» الإرشادية، تختفي بعد أول سحب عندها */
  ghost?: number;
}

/** رسم يغيّر الطالب قيمه بسحب النقطة أو أعلى العمود. يعمل باللمس والقلم والفأرة. */
export function DragChart({ spec, values, onChange, editable, snap = 1, mode, ghost }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useRef(-1);
  const [ghostAt, setGhostAt] = useState(ghost ?? null);

  const pick = (e: PointerEvent) => {
    const svg = ref.current!.querySelector('svg')!;
    const r = svg.getBoundingClientRect();
    const g = geom(spec);
    const x = ((e.clientX - r.left) * g.W) / r.width;
    const y = ((e.clientY - r.top) * g.H) / r.height;
    return { i: Math.floor(((x - g.m.l) / g.pw) * g.n), v: spec.min + (1 - (y - g.m.t) / g.ph) * (spec.max - spec.min) };
  };
  const setv = (i: number, raw: number) => {
    const v = Math.max(spec.min, Math.min(spec.max, Math.round(raw / snap) * snap));
    if (values[i] === v) return;
    const next = values.slice();
    next[i] = v;
    if (ghostAt === i) setGhostAt(null);
    onChange(next);
  };

  return (
    <div
      ref={ref}
      className="chart dragchart"
      onPointerDown={(e) => {
        if (document.body.classList.contains('pen')) return;
        const p = pick(e);
        if (!editable.includes(p.i)) return;
        active.current = p.i;
        ref.current!.setPointerCapture(e.pointerId);
        setv(p.i, p.v);
        e.preventDefault();
      }}
      onPointerMove={(e) => active.current >= 0 && setv(active.current, pick(e).v)}
      onPointerUp={() => (active.current = -1)}
      onPointerCancel={() => (active.current = -1)}
    >
      <ChartSvg spec={spec} values={values} mode={mode} ghost={ghostAt} />
    </div>
  );
}
