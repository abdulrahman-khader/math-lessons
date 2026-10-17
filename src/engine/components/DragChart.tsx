import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ChartSvg, geom } from './Chart';
import { useSlide } from '../context';
import type { RemoteChart } from '../remote';
import type { ChartSpec } from '../types';

/** ما يضيفه مكوّن أعلى (مثل TrendExplorer) إلى ما يراه الجوال */
export interface DragRemoteExtra {
  modes?: { k: string; label: string }[];
  onMode?: (m: string) => void;
  challenges?: { text: string; done: boolean }[];
}

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
  remote?: DragRemoteExtra;
}

/** رسم يغيّر الطالب قيمه بسحب النقطة أو أعلى العمود. يعمل باللمس والقلم والفأرة. */
export function DragChart({ spec, values, onChange, editable, snap = 1, mode, ghost, remote }: Props) {
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

  /* التحكم من الجوال: يسجّل الرسم في شريحته، ويُبلغ عند كل تغيير */
  const slide = useSlide();
  const latest = useRef({ spec, values, editable, snap, mode, remote, setv });
  latest.current = { spec, values, editable, snap, mode, remote, setv };
  useEffect(() => {
    slide.setChart({
      get: (): RemoteChart => {
        const l = latest.current;
        return {
          title: l.spec.title,
          labels: l.spec.labels,
          values: l.values,
          editable: l.editable,
          min: l.spec.min,
          max: l.spec.max,
          step: l.snap,
          mode: l.mode ?? l.spec.mode ?? 'line',
          modes: l.remote?.modes,
          challenges: l.remote?.challenges,
        };
      },
      set: (i, v) => latest.current.editable.includes(i) && latest.current.setv(i, v),
      setMode: (m) => latest.current.remote?.onMode?.(m),
    });
    return () => slide.setChart(null);
  }, [slide.setChart]);
  const doneKey = remote?.challenges?.map((c) => +c.done).join('');
  useEffect(() => slide.touch(), [values, mode, doneKey, slide.touch]);

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
