import { useEffect, useRef, useState } from 'react';
import { num } from './digits';
import { remoteLink, type RemoteCmd, type RemoteState } from './remote';
import { IconNextRtl, IconPrevRtl } from './components/icons';
import { RemoteChartCard } from './components/RemoteChartCard';

/** شاشة الجوال: أزرار التحكم بالآيباد، وملاحظات المعلم للشريحة الحالية */
export function RemoteApp({ channel }: { channel: string }) {
  const [st, setSt] = useState<RemoteState | null>(null);
  const [online, setOnline] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const linkRef = useRef<ReturnType<typeof remoteLink> | null>(null);
  const gotState = useRef(false);

  useEffect(() => {
    document.title = 'التحكم بالدرس';
    document.body.classList.add('remote-body');
    const link = remoteLink(
      channel,
      (s) => {
        gotState.current = true;
        setWaiting(false);
        setSt(s);
      },
      setOnline,
    );
    linkRef.current = link;
    return () => link.stop();
  }, [channel]);

  /* «مرحبًا» عند الاتصال وكل بضع ثوانٍ حتى يرد الآيباد، وعند العودة إلى الصفحة */
  useEffect(() => {
    if (!online) return;
    gotState.current = false;
    const hello = () => linkRef.current?.send({ c: 'hello' });
    hello();
    const wait = setTimeout(() => !gotState.current && setWaiting(true), 4000);
    const iv = setInterval(() => !gotState.current && hello(), 5000);
    const vis = () => document.visibilityState === 'visible' && hello();
    document.addEventListener('visibilitychange', vis);
    return () => {
      clearTimeout(wait);
      clearInterval(iv);
      document.removeEventListener('visibilitychange', vis);
    };
  }, [online]);

  /* إبقاء شاشة الجوال مضاءة أثناء الحصة، حيث يدعمه المتصفح */
  const wake = useRef(false);
  const send = (c: RemoteCmd) => {
    linkRef.current?.send(c);
    if (!wake.current) {
      wake.current = true;
      (navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<unknown> } }).wakeLock?.request('screen').catch(() => {});
    }
  };

  const [shown, total] = st?.steps ?? [0, 0];
  const moreSteps = shown < total;
  const status = !online ? 'جارٍ الاتصال…' : !st ? (waiting ? 'افتح الدرس على الآيباد واضغط «الجوال» ثم «تشغيل»' : 'جارٍ البحث عن الآيباد…') : 'متصل بالآيباد';

  return (
    <div className="remote">
      <header className="rhead">
        <b>{st?.lesson ?? 'التحكم بالدرس'}</b>
        <span className={'dot' + (online && st ? ' ok' : '')}>{status}</span>
      </header>

      {st && (
        <>
          <section className="rcard now">
            <div className="rrow">
              <span className="rsec">{st.sec}</span>
              <span className="pg">
                {num(st.cur + 1)} / {num(st.total)}
              </span>
            </div>
            <h1>{st.title || '—'}</h1>
            {total > 0 && (
              <p className="steps">
                الخطوات: {num(shown)} / {num(total)}
              </p>
            )}
          </section>

          <div className="rnav">
            <button className="rbtn prev" aria-label="السابق" disabled={st.cur === 0} onClick={() => send({ c: 'prev' })}>
              <IconPrevRtl />
              السابق
            </button>
            <button className="rbtn next" aria-label="التالي" disabled={st.cur === st.total - 1 && !moreSteps} onClick={() => send({ c: 'next' })}>
              {moreSteps ? 'الخطوة التالية' : 'الشريحة التالية'}
              <IconNextRtl />
            </button>
          </div>

          {st.chart && <RemoteChartCard chart={st.chart} send={(i, v) => send({ c: 'chart', i, v })} onMode={(m) => send({ c: 'chartMode', m })} />}

          <div className="rtools">
            {st.hasHint && (
              <button className="rbtn" onClick={() => send({ c: 'hint' })}>
                التلميح
              </button>
            )}
            <button className="rbtn" onClick={() => send({ c: 'resetSlide' })}>
              إعادة الشريحة
            </button>
            <button className="rbtn" onClick={() => send({ c: 'teacher', on: !st.teacher })}>
              {st.teacher ? 'إخفاء الملاحظات عن الشاشة' : 'إظهار الملاحظات على الشاشة'}
            </button>
          </div>

          <section className="rcard">
            <h2>عجلة الأسماء</h2>
            {st.wheel && st.wheelResult && <p className="wres">{st.wheelResult}</p>}
            <div className="rtools">
              <button className="rbtn primary" onClick={() => send({ c: 'spin' })}>
                أدِر العجلة
              </button>
              {st.wheel && (
                <button className="rbtn" onClick={() => send({ c: 'wheel', open: false })}>
                  إغلاق العجلة
                </button>
              )}
            </div>
          </section>

          {st.teams.length > 0 && (
            <section className="rcard">
              <h2>نقاط الفرق</h2>
              {st.teams.map((t, i) => (
                <div key={i} className="rteam" style={{ borderColor: t.color }}>
                  <button aria-label={`إنقاص نقطة من ${t.name}`} onClick={() => send({ c: 'score', team: i, d: -1 })}>
                    −
                  </button>
                  <span style={{ color: t.color }}>
                    {t.name} <b>{num(t.score)}</b>
                  </span>
                  <button aria-label={`إضافة نقطة إلى ${t.name}`} onClick={() => send({ c: 'score', team: i, d: 1 })}>
                    +
                  </button>
                </div>
              ))}
            </section>
          )}

          <section className="rcard notes">
            <h2>
              ملاحظات المعلم <small>{num(st.min)} د</small>
            </h2>
            <p>{st.notes}</p>
          </section>

          <section className="rcard">
            <h2>انتقل إلى</h2>
            <div className="rsecs">
              {st.sections.map((o) => (
                <button key={o.first} className="rbtn" onClick={() => send({ c: 'goto', i: o.first })}>
                  {o.name}
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
