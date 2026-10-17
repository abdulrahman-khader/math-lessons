import { useEffect, useRef, useState } from 'react';
import { DragChart } from './DragChart';
import { num } from '../digits';
import { sGood } from '../sound';
import type { ChartSpec } from '../types';

export interface Challenge {
  text: string;
  test: (values: number[]) => boolean;
}

interface Props {
  spec: ChartSpec;
  intro: string;
  challenges: Challenge[];
  /** قيمة المكعب الواحد في وضع المكعبات */
  snap?: number;
}

const MODES = [
  { k: 'cubes', label: '١ مكعبات' },
  { k: 'bars', label: '٢ أعمدة' },
  { k: 'line', label: '٣ خطوط' },
] as const;

/**
 * استكشاف محسوس ← صوري ← مجرد: يسحب الطالب القيم ويرى وصف كل جزء من الخط (صعود/هبوط/ثبات)
 * ويحقق التحديات. يشغل عمودي الشريحة كليهما.
 */
export function TrendExplorer({ spec, intro, challenges, snap = 1 }: Props) {
  const [values, setValues] = useState<(number | null)[]>(spec.values.slice());
  const [mode, setMode] = useState<NonNullable<ChartSpec['mode']>>('line');
  const vals = values.map((v) => v ?? 0);
  const done = challenges.map((c) => c.test(vals));
  const prev = useRef(done);
  useEffect(() => {
    if (done.some((d, i) => d && !prev.current[i])) sGood();
    prev.current = done;
  });

  return (
    <div className="cols">
      <div className="qcol">
        <p style={{ fontSize: '.85em' }}>{intro}</p>
        <div className="ctrls">
          {MODES.map((m) => (
            <button key={m.k} className={'btn' + (mode === m.k ? ' sel' : '')} onClick={() => setMode(m.k)}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="readout">
          {vals.slice(0, -1).map((a, i) => {
            const d = vals[i + 1] - a;
            const k = d > 0 ? 'up' : d < 0 ? 'down' : 'flat';
            const w = k === 'up' ? `صعود ↗ زاد ${num(d)}` : k === 'down' ? `هبوط ↘ قل ${num(-d)}` : 'ثبات ← لم يتغير';
            return (
              <div key={i}>
                من {spec.labels[i]} إلى {spec.labels[i + 1]}: <span className={`chip ${k}`}>{w}</span>
              </div>
            );
          })}
        </div>
        <div className="chal">
          <b style={{ color: 'var(--qs)' }}>تحديات:</b>
          {challenges.map((c, i) => (
            <div key={i} className={done[i] ? 'ok' : ''}>
              <span className="ck">✓</span>
              {c.text}
            </div>
          ))}
        </div>
      </div>
      <DragChart
        spec={spec}
        values={values}
        onChange={setValues}
        editable={spec.labels.map((_, i) => i)}
        snap={snap}
        mode={mode}
        remote={{
          modes: MODES.map((m) => ({ k: m.k, label: m.label })),
          onMode: (m) => MODES.some((x) => x.k === m) && setMode(m as (typeof MODES)[number]['k']),
          challenges: challenges.map((c, i) => ({ text: c.text, done: done[i] })),
        }}
      />
    </div>
  );
}
