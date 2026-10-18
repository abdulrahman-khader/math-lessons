import { num } from '../digits';
import type { RemoteWidget } from '../remote';

/** بطاقة الجوال لأي أداة تفاعلية: عدّادات بـ + و −، وأزرار، وسطر حالة */
export function RemoteWidgetCard({ w, send }: { w: RemoteWidget; send: (key: string, v?: number) => void }) {
  return (
    <section className="rcard rwidget">
      <h2>{w.title}</h2>
      {w.info && <p className="rwinfo">{w.info}</p>}
      {w.steppers.length > 0 && (
        <div className="rvals">
          {w.steppers.map((s) => (
            <div key={s.key} className="rval" style={s.color ? { borderColor: s.color } : undefined}>
              <span style={s.color ? { color: s.color } : undefined}>{s.label}</span>
              <button aria-label={`إنقاص ${s.label}`} disabled={s.value <= s.min} onClick={() => send(s.key, s.value - 1)}>
                −
              </button>
              <b>{num(s.value)}</b>
              <button aria-label={`زيادة ${s.label}`} disabled={s.value >= s.max} onClick={() => send(s.key, s.value + 1)}>
                +
              </button>
            </div>
          ))}
        </div>
      )}
      {w.buttons.length > 0 && (
        <div className="rtools">
          {w.buttons.map((b) => (
            <button key={b.key} className={'rbtn' + (b.on ? ' primary' : '')} disabled={b.disabled} onClick={() => send(b.key)}>
              {b.label}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
