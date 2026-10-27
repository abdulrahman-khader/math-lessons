import { useEffect, useState } from 'react';
import { num } from '../digits';
import type { RemoteWidget } from '../remote';

/** بطاقة الجوال لأي أداة تفاعلية: عدّادات بـ + و −، وأزرار، وسطر حالة */
export function RemoteWidgetCard({ w, send }: { w: RemoteWidget; send: (key: string, v?: number) => void }) {
  /** القيمة التي أرسلها الجوال ولم تصل حالتها بعد: الضغطات السريعة تُبنى عليها فلا تضيع ضغطة */
  const [sent, setSent] = useState<Record<string, number>>({});
  useEffect(() => {
    setSent((o) => {
      const left = Object.fromEntries(Object.entries(o).filter(([k, v]) => w.steppers.some((s) => s.key === k && s.value !== v)));
      return Object.keys(left).length === Object.keys(o).length ? o : left;
    });
  }, [w]);
  // إن لم تصل الحالة (أداة أخرى، أو قيمة رفضها الآيباد) تعود القيم إلى ما يرسله الآيباد
  useEffect(() => {
    if (!Object.keys(sent).length) return;
    const t = setTimeout(() => setSent({}), 3000);
    return () => clearTimeout(t);
  }, [sent]);
  const step = (key: string, v: number) => {
    setSent((o) => ({ ...o, [key]: v }));
    send(key, v);
  };
  return (
    <section className="rcard rwidget">
      <h2>{w.title}</h2>
      {w.info && <p className="rwinfo">{w.info}</p>}
      {w.steppers.length > 0 && (
        <div className="rvals">
          {w.steppers.map((s0) => {
            const s = { ...s0, value: sent[s0.key] ?? s0.value };
            return (
              <div key={s.key} className="rval" style={s.color ? { borderColor: s.color } : undefined}>
                <span style={s.color ? { color: s.color } : undefined}>{s.label}</span>
                <button aria-label={`إنقاص ${s.label}`} disabled={s.value <= s.min} onClick={() => step(s.key, s.value - 1)}>
                  −
                </button>
                <b>{num(s.value)}</b>
                <button aria-label={`زيادة ${s.label}`} disabled={s.value >= s.max} onClick={() => step(s.key, s.value + 1)}>
                  +
                </button>
              </div>
            );
          })}
        </div>
      )}
      {w.buttons.length > 0 && (
        <div className="rtools">
          {w.buttons.map((b) => (
            <button key={b.key} className={'rbtn' + (b.on ? ' primary' : '')} disabled={b.disabled} onClick={() => (setSent({}), send(b.key))}>
              {b.label}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
