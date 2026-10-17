import { useEffect, useRef, useState } from 'react';
import { clock, duration, num } from './digits';
import { PRESETS, SCALE_MAX, SCALE_MIN, SCALE_STEP } from './components/Timer';

/** مواضع المؤقت على الشاشة: صفوف من الأعلى إلى الأسفل، وأعمدة من اليسار إلى اليمين كما تُرى الشاشة */
const SPOTS = [-1, 0, 1].flatMap((ay) => [-1, 0, 1].map((ax) => ({ ax, ay })));
import { BUILD, remoteLink, type LinkStatus, type RemoteCmd, type RemoteState } from './remote';
import { IconNextRtl, IconPrevRtl } from './components/icons';
import { RemoteChartCard } from './components/RemoteChartCard';

/** شاشة الجوال: أزرار التحكم بالآيباد، وملاحظات المعلم للشريحة الحالية */
/** المؤقت على الجوال: يعدّ تنازليًا وحده من آخر حالة وصلت من الآيباد */
function RemoteTimer({ t, at, send }: { t: RemoteState['timer']; at: number; send: (c: RemoteCmd) => void }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!t.run) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [t.run, at]);
  const left = t.run ? Math.max(0, Math.ceil(t.left - (now - at) / 1000)) : t.left;
  return (
    <section className="rcard rtimer">
      <h2>المؤقت</h2>
      {t.show && <p className={'rclock' + (left === 0 ? ' end' : '')}>{clock(left)}</p>}
      <div className="rpresets">
        {PRESETS.map((sec) => (
          <button key={sec} className="rbtn" onClick={() => send({ c: 'timer', a: 'start', sec })}>
            {duration(sec)}
          </button>
        ))}
      </div>
      {t.show && (
        <div className="rtview">
          <div>
            <b>الحجم</b>
            <div className="rtools">
              <button className="rbtn" disabled={(t.view?.s ?? 1) <= SCALE_MIN} onClick={() => send({ c: 'timerView', v: { s: (t.view?.s ?? 1) - SCALE_STEP } })}>
                تصغير −
              </button>
              <button className="rbtn" disabled={(t.view?.s ?? 1) >= SCALE_MAX} onClick={() => send({ c: 'timerView', v: { s: (t.view?.s ?? 1) + SCALE_STEP } })}>
                تكبير +
              </button>
            </div>
          </div>
          <div>
            <b>المكان على الشاشة</b>
            <div className="rspots" role="group" aria-label="مكان المؤقت">
              {SPOTS.map((p) => {
                const on = Math.round(t.view?.ax ?? 0) === p.ax && Math.round(t.view?.ay ?? 0) === p.ay;
                return <button key={`${p.ax}${p.ay}`} className={on ? 'on' : ''} aria-label="ضع المؤقت هنا" onClick={() => send({ c: 'timerView', v: p })} />;
              })}
            </div>
          </div>
        </div>
      )}
      {t.show && (
        <div className="rtools">
          <button className="rbtn primary" disabled={t.left === 0} onClick={() => send({ c: 'timer', a: 'toggle' })}>
            {t.run ? 'إيقاف مؤقت' : 'متابعة'}
          </button>
          <button className="rbtn" onClick={() => send({ c: 'timer', a: 'close' })}>
            إغلاق المؤقت
          </button>
        </div>
      )}
    </section>
  );
}

export function RemoteApp({ channel }: { channel: string }) {
  const [st, setSt] = useState<RemoteState | null>(null);
  /** وقت وصول آخر حالة، ليعدّ المؤقت منه */
  const [stAt, setStAt] = useState(0);
  const [link, setLink] = useState<LinkStatus>({ direct: false, relay: false, limited: false });
  const online = link.direct || link.relay;
  const [waiting, setWaiting] = useState(false);
  const linkRef = useRef<ReturnType<typeof remoteLink> | null>(null);
  const gotState = useRef(false);
  /** الآيباد يعرض نسخة أقدم من الجوال */
  const [ipadOld, setIpadOld] = useState(false);
  const [phoneOld, setPhoneOld] = useState(false);

  useEffect(() => {
    document.title = 'التحكم بالدرس';
    document.body.classList.add('remote-body');
    const link = remoteLink(
      channel,
      (raw) => {
        gotState.current = true;
        setWaiting(false);
        const v = raw.v ?? '0';
        if (Number(v) > Number(BUILD)) {
          // الجوال أقدم: يعيد التحميل مرة واحدة بالنسخة الجديدة متجاوزًا ما حفظه المتصفح
          const key = `remote:reload:${v}`;
          let tried = false;
          try {
            tried = sessionStorage.getItem(key) === '1';
            sessionStorage.setItem(key, '1');
          } catch {
            /* تجاهل */
          }
          if (!tried) return location.replace(`${location.origin}${location.pathname}?v=${v}#remote=${channel}`);
          setPhoneOld(true);
        }
        setIpadOld(Number(v) < Number(BUILD));
        // حالة من نسخة أقدم قد تنقصها حقول: قيم افتراضية بدل أن تتعطل الشاشة
        setSt({ ...raw, mcqs: raw.mcqs ?? [], chart: raw.chart ?? null, timer: raw.timer ?? { show: false, run: false, left: 0 } });
        setStAt(Date.now());
      },
      setLink,
    );
    linkRef.current = link;
    return () => link.stop();
  }, [channel]);

  /*
   * «مرحبًا» ليرسل الآيباد حالته. عبر القناة المباشرة فورًا ومجانًا.
   * إن تعذّر الاتصال المباشر: عبر الخادم بعد ١٢ ثانية ثم كل ٣٠ ثانية فقط، حفاظًا على حصة الرسائل اليومية.
   */
  useEffect(() => {
    if (!link.direct && !link.relay) return;
    const hello = () => linkRef.current?.send({ c: 'hello', v: BUILD });
    const timers: ReturnType<typeof setTimeout>[] = [];
    let iv: ReturnType<typeof setInterval> | undefined;
    if (link.direct) {
      gotState.current = false;
      hello();
    } else {
      timers.push(
        setTimeout(() => {
          if (!gotState.current) hello();
          iv = setInterval(() => !gotState.current && hello(), 30000);
        }, 12000),
      );
    }
    timers.push(setTimeout(() => !gotState.current && setWaiting(true), link.direct ? 4000 : 16000));
    const vis = () => document.visibilityState === 'visible' && link.direct && hello();
    document.addEventListener('visibilitychange', vis);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(iv);
      document.removeEventListener('visibilitychange', vis);
    };
  }, [link.direct, link.relay]);

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
  const status = !online ? 'جارٍ الاتصال…' : !st ? (waiting ? 'افتح الدرس على الآيباد واضغط «الجوال» ثم «تشغيل»' : 'جارٍ البحث عن الآيباد…') : link.direct ? 'متصل مباشرة بالآيباد' : 'متصل عبر الخادم (أبطأ، وله حد يومي)';

  return (
    <div className="remote">
      <header className="rhead">
        <b>{st?.lesson ?? 'التحكم بالدرس'}</b>
        <span className={'dot' + (online && st ? ' ok' : '')}>{status}</span>
      </header>

      {link.limited && !link.direct && (
        <p className="rwarn">خادم الربط وصل حدّه اليومي على هذه الشبكة. جرّب أن يتصل الجوال بإنترنت الجوال (لا الواي فاي)، أو حاول غدًا.</p>
      )}
      {ipadOld && <p className="rwarn">الدرس على الآيباد نسخة قديمة: أغلق صفحة الدرس على الآيباد وافتحها من جديد لتظهر كل الأزرار.</p>}
      {phoneOld && <p className="rwarn">هذه الصفحة نسخة قديمة: أغلقها وامسح الرمز من جديد.</p>}

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

          {st.mcqs.length > 0 && (
            <section className="rcard rmcqs">
              <h2>{st.mcqs.length > 1 ? 'الأسئلة' : 'السؤال'}</h2>
              {st.mcqs.map((m, k) => (
                <div key={k} className={'rmcq' + (m.right ? ' done' : '')}>
                  <p className="rq">{m.q || `الشكل ${num(k + 1)} من اليمين`}</p>
                  <div className="ropts">
                    {m.options.map((o) => (
                      <button
                        key={o}
                        className={'ropt' + (m.right && o === m.answer ? ' right' : !m.right && m.wrong === o ? ' wrong' : '')}
                        disabled={m.right}
                        onClick={() => send({ c: 'mcq', k, o })}
                      >
                        {o}
                        {o === m.answer && !m.right && <small className="rkey">الصحيحة</small>}
                      </button>
                    ))}
                  </div>
                  {m.right ? <p className="rfb ok">صح ✓</p> : m.wrong ? <p className="rfb no">حاول مرة ثانية</p> : null}
                  {m.canAward && (
                    <div className="raward">
                      امنح نجمة:
                      {st.teams.map((t, i) => (
                        <button key={i} style={{ borderColor: t.color, color: t.color }} onClick={() => send({ c: 'mcqAward', k, team: i })}>
                          +★ {t.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

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

          <RemoteTimer t={st.timer} at={stAt} send={send} />

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
