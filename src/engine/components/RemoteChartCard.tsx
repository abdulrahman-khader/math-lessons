import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { num } from '../digits';
import type { RemoteChart } from '../remote';

const W = 340;
const H = 210;
const M = { l: 40, r: 14, t: 16, b: 34 };
const PW = W - M.l - M.r;
const PH = H - M.t - M.b;

/** وصف جزء من الخط كما في TrendExplorer على الآيباد */
function trend(a: number, b: number) {
  const d = b - a;
  if (d > 0) return { k: 'up', t: `صعود ↗ زاد ${num(d)}` };
  if (d < 0) return { k: 'down', t: `هبوط ↘ قل ${num(-d)}` };
  return { k: 'flat', t: 'ثبات ← لم يتغير' };
}

/**
 * الرسم التفاعلي على الجوال: يسحب المعلم النقطة (أو يضغط + و −) فتتغير على الآيباد.
 * أثناء السحب يُعرض الرسم محليًا، ويُرسل الأمر عند رفع الإصبع فقط؛ فلا تُستنزف حصة الرسائل.
 */
export function RemoteChartCard({ chart: c, send, onMode }: { chart: RemoteChart; send: (i: number, v: number) => void; onMode: (m: string) => void }) {
  const [vals, setVals] = useState(c.values);
  const dragging = useRef(-1);
  const svg = useRef<SVGSVGElement>(null);

  // حالة الآيباد هي المرجع، إلا أثناء السحب
  useEffect(() => {
    if (dragging.current < 0) setVals(c.values);
  }, [c.values]);

  const n = c.labels.length;
  const X = (i: number) => M.l + (PW * (i + 0.5)) / n;
  const Y = (v: number) => M.t + PH * (1 - (v - c.min) / (c.max - c.min));
  const clamp = (v: number) => Math.max(c.min, Math.min(c.max, Math.round(v / c.step) * c.step));

  const at = (e: PointerEvent) => {
    const r = svg.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) * W) / r.width;
    const y = ((e.clientY - r.top) * H) / r.height;
    return { i: Math.floor(((x - M.l) / PW) * n), v: c.min + (1 - (y - M.t) / PH) * (c.max - c.min) };
  };
  const local = (i: number, v: number) => setVals((old) => old.map((x, j) => (j === i ? v : x)));
  const end = () => {
    const i = dragging.current;
    dragging.current = -1;
    const v = vals[i];
    if (i >= 0 && v != null && v !== c.values[i]) send(i, v);
  };
  const bump = (i: number, d: number) => {
    const v = clamp((vals[i] ?? c.min) + d * c.step);
    local(i, v);
    send(i, v);
  };

  const ticks = [c.min, (c.min + c.max) / 2, c.max].map((v) => clamp(v));
  // مقاطع الخط المتصلة؛ القيمة الناقصة (null) تقطع الخط
  const segs: string[][] = [[]];
  vals.forEach((v, i) => (v == null ? segs.push([]) : segs[segs.length - 1].push(`${X(i)},${Y(v)}`)));

  return (
    <section className="rcard rchart">
      <h2>{c.title ?? 'التمثيل بالخطوط'}</h2>
      {c.modes && (
        <div className="rmodes">
          {c.modes.map((m) => (
            <button key={m.k} className={'rbtn' + (c.mode === m.k ? ' primary' : '')} onClick={() => onMode(m.k)}>
              {m.label}
            </button>
          ))}
        </div>
      )}
      <svg
        ref={svg}
        className="rsvg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="اسحب النقاط لتغيير القيم"
        onPointerDown={(e) => {
          const p = at(e);
          if (!c.editable.includes(p.i)) return;
          dragging.current = p.i;
          svg.current!.setPointerCapture(e.pointerId);
          local(p.i, clamp(p.v));
          e.preventDefault();
        }}
        onPointerMove={(e) => dragging.current >= 0 && local(dragging.current, clamp(at(e).v))}
        onPointerUp={end}
        onPointerCancel={end}
      >
        <rect x={M.l} y={M.t} width={PW} height={PH} fill="#fff" />
        {ticks.map((v) => (
          <g key={v}>
            <line x1={M.l} x2={M.l + PW} y1={Y(v)} y2={Y(v)} stroke="#dbe5f1" strokeWidth={1.5} />
            <text x={M.l - 6} y={Y(v)} textAnchor="end" dominantBaseline="middle" className="rtick">
              {num(v)}
            </text>
          </g>
        ))}
        <line x1={M.l} x2={M.l + PW} y1={M.t + PH} y2={M.t + PH} stroke="#13213b" strokeWidth={2.5} />
        <line x1={M.l} x2={M.l} y1={M.t} y2={M.t + PH} stroke="#13213b" strokeWidth={2.5} />
        {c.labels.map((L, i) => (
          <text key={i} x={X(i)} y={H - 10} textAnchor="middle" className="rtick">
            {L}
          </text>
        ))}
        {segs.filter((sg) => sg.length > 1).map((sg, j) => (
          <polyline key={j} points={sg.join(' ')} fill="none" stroke="#e8590c" strokeWidth={4} strokeLinejoin="round" />
        ))}
        {vals.map((v, i) =>
          c.editable.includes(i) ? (
            <circle key={i} cx={X(i)} cy={v == null ? Y((c.min + c.max) / 2) : Y(v)} r={11} className={'rpt' + (v == null ? ' ghost' : '')} />
          ) : v == null ? null : (
            <circle key={i} cx={X(i)} cy={Y(v)} r={7} fill="#fff" stroke="#13213b" strokeWidth={3} />
          ),
        )}
      </svg>

      <div className="rvals">
        {c.editable.map((i) => (
          <div key={i} className="rval">
            <span>{c.labels[i]}</span>
            <button aria-label={`إنقاص ${c.labels[i]}`} onClick={() => bump(i, -1)}>
              −
            </button>
            <b>{vals[i] == null ? '—' : num(vals[i]!)}</b>
            <button aria-label={`زيادة ${c.labels[i]}`} onClick={() => bump(i, 1)}>
              +
            </button>
          </div>
        ))}
      </div>

      <div className="rtrends">
        {vals.slice(0, -1).map((a, i) => {
          const b = vals[i + 1];
          if (a == null || b == null) return null;
          const t = trend(a, b);
          return (
            <div key={i}>
              {c.labels[i]} ← {c.labels[i + 1]}: <span className={`chip ${t.k}`}>{t.t}</span>
            </div>
          );
        })}
      </div>

      {c.challenges && (
        <div className="chal rchal">
          {c.challenges.map((ch, i) => (
            <div key={i} className={ch.done ? 'ok' : ''}>
              <span className="ck">✓</span>
              {ch.text}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
