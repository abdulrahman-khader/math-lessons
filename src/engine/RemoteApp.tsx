import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Checkbox } from '@base-ui/react/checkbox';
import { Collapsible } from '@base-ui/react/collapsible';
import { DirectionProvider } from '@base-ui/react/direction-provider';
import { Drawer } from '@base-ui/react/drawer';
import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { SECTION_NAMES } from './sections';
import { clock, duration, num } from './digits';
import { PRESETS, SCALE_MAX, SCALE_MIN, SCALE_STEP } from './components/Timer';
import { MAX_MISTAKES, rankRows, teamStarCounts, topRows } from './stars';
import { BUILD, remoteLink, type LinkStatus, type RemoteCmd, type RemoteState } from './remote';
import { IconNextRtl, IconPrevRtl, IconReset, IconStar, IconTimer } from './components/icons';
import { RemoteChartCard } from './components/RemoteChartCard';
import { RemoteFamilyCard } from './components/RemoteFamilyCard';
import { RemoteWidgetCard } from './components/RemoteWidgetCard';

/*
 * شاشة التحكم على الجوال.
 * صفحة إعداد قبل الحصة (الفصل، وقت انتهاء الحصة، الفرق وتوزيع الطلاب)، ثم صفحة الدرس:
 * المعلومات في الأعلى، وفي الأسفل قرب الإبهام صف الأدوات (كل أداة تفتح لوحة خاصة بها) وشريط الأسهم.
 */

/** مواضع المؤقت على الشاشة: صفوف من الأعلى إلى الأسفل، وأعمدة من اليسار إلى اليمين كما تُرى الشاشة */
const SPOTS = [-1, 0, 1].flatMap((ay) => [-1, 0, 1].map((ax) => ({ ax, ay })));
const TEAM_OPTS = [0, 2, 3, 4];

type Sheet = 'teams' | 'wheel' | 'stars' | 'timer' | 'slides' | 'groups' | 'absent' | null;

/* ---------- أيقونات الجوال ---------- */
const Svg = ({ children, w = 2 }: { children: ReactNode; w?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
/** سهمان مزدوجان للشريحة: في RTL «التالي» يشير إلى اليسار */
const IconSlideNext = () => (
  <Svg>
    <path d="M12 6l-6 6 6 6M19 6l-6 6 6 6" />
  </Svg>
);
const IconSlidePrev = () => (
  <Svg>
    <path d="M12 6l6 6-6 6M5 6l6 6-6 6" />
  </Svg>
);
/** عجلة جوائز: دائرة مقسومة ومؤشر في الأعلى، لا مقود سيارة */
const IconPrizeWheel = () => (
  <Svg w={1.8}>
    <circle cx="12" cy="13" r="8.5" />
    <path d="M12 13V4.5M12 13l7.4-4.2M12 13l7.4 4.2M12 13v8.5M12 13l-7.4 4.2M12 13L4.6 8.8" />
    <path d="M10.2 2h3.6L12 4.6z" fill="currentColor" />
  </Svg>
);
const IconTeams = () => (
  <Svg w={1.8}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19c.6-3 2.8-5 5.5-5s4.9 2 5.5 5" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M16 14c2.4 0 4.1 1.6 4.6 4.2" />
  </Svg>
);
const IconList = () => (
  <Svg w={1.8}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <circle cx="4.5" cy="6" r="1" fill="currentColor" />
    <circle cx="4.5" cy="12" r="1" fill="currentColor" />
    <circle cx="4.5" cy="18" r="1" fill="currentColor" />
  </Svg>
);
/** إعداد الحصة: ثلاثة منزلقات */
const IconGear = () => (
  <Svg w={1.8}>
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </Svg>
);
const IconBulb = () => (
  <Svg w={1.8}>
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
  </Svg>
);

/* ---------- وقت الحصة: يحفظه الجوال لليوم نفسه ---------- */
interface Timing {
  /** وقت انتهاء الحصة «HH:MM» كما اختاره المعلم */
  end: string;
  /** متى ضُغط «ابدأ الدرس» (ملّي ثانية) */
  start: number;
  day: string;
}
const today = () => new Date().toDateString();
function loadTiming(channel: string): Timing | null {
  try {
    const t = JSON.parse(localStorage.getItem(`remote:timing:${channel}`) ?? 'null') as Timing | null;
    return t && t.day === today() ? t : null;
  } catch {
    return null;
  }
}
function saveTiming(channel: string, t: Timing) {
  try {
    localStorage.setItem(`remote:timing:${channel}`, JSON.stringify(t));
  } catch {
    /* تجاهل */
  }
}
/** «HH:MM» اليوم بالملّي ثانية */
function endMs(end: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(end);
  if (!m) return null;
  const d = new Date();
  d.setHours(Number(m[1]), Number(m[2]), 0, 0);
  return d.getTime();
}
/** «٩:٤٥» بأرقام هندية، ١٢ ساعة */
function clockAr(end: string) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(end);
  if (!m) return '';
  const h = Number(m[1]) % 12 || 12;
  return `${num(h)}:${num(Number(m[2])).padStart(2, '٠')}`;
}
/** عدد الدقائق بالتمييز الصحيح: دقيقة، دقيقتين، ٣ دقائق، ١١ دقيقة */
function minutesAr(n: number) {
  if (n === 1) return 'دقيقة';
  if (n === 2) return 'دقيقتين';
  if (n >= 3 && n <= 10) return `${num(n)} دقائق`;
  return `${num(n)} دقيقة`;
}

/** خط الوقت: متأخر أم في الوقت، والباقي حتى نهاية الحصة. الدقائق المقترحة للشرائح تُوزَّع على الوقت المتاح */
function Pacing({ timing, mins, cur }: { timing: Timing; mins: number[]; cur: number }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(id);
  }, []);
  const end = endMs(timing.end);
  if (!end || end <= timing.start || !mins.length) return null;
  const plan = mins.reduce((a, b) => a + b, 0) || 1;
  const per = (end - timing.start) / plan;
  const due = timing.start + per * mins.slice(0, cur + 1).reduce((a, b) => a + b, 0);
  const late = Math.round((now - due) / 60000);
  const left = Math.max(0, Math.round((end - now) / 60000));
  return (
    <div className={'r2pace' + (late > 0 ? ' late' : '')}>
      <span>{late > 0 ? `متأخر ${minutesAr(late)}` : 'في الوقت'}</span>
      <small>
        باقٍ {num(left)} د، ينتهي {clockAr(timing.end)}
      </small>
    </div>
  );
}

/** لوحة تنزلق من الأسفل فوق الدرس (Base UI Drawer): تُسحب إلى الأسفل لتُغلق، أو بزر ✕ */
function Sheet({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  return (
    <Drawer.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Drawer.Portal>
        <Drawer.Backdrop className="r2back" />
        <Drawer.Viewport className="r2vp">
          <Drawer.Popup className="r2panel" dir="rtl">
            <span className="r2grip" />
            <Drawer.Content className="r2content">
              <header>
                <Drawer.Title className="r2ttl">{title}</Drawer.Title>
                <Drawer.Close className="r2x" aria-label="إغلاق">
                  ✕
                </Drawer.Close>
              </header>
              <div className="r2body">{children}</div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

/** اختيار واحد من عدة (Base UI ToggleGroup) */
function Segs({ label, value, items, onPick }: { label: string; value: string; items: { v: string; t: string }[]; onPick: (v: string) => void }) {
  return (
    <ToggleGroup className="r2segs" aria-label={label} value={[value]} onValueChange={(v) => v[0] !== undefined && onPick(v[0])}>
      {items.map((it) => (
        <Toggle key={it.v} value={it.v} className="r2seg">
          {it.t}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}

/** قسم يُطوى ويُفتح (Base UI Collapsible) */
function Fold({ title, className, children }: { title: ReactNode; className?: string; children: ReactNode }) {
  return (
    <Collapsible.Root className={'r2more' + (className ? ' ' + className : '')}>
      <Collapsible.Trigger className="r2fold">
        <span>{title}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Collapsible.Trigger>
      <Collapsible.Panel className="r2fpanel">{children}</Collapsible.Panel>
    </Collapsible.Root>
  );
}

/** ترتيب هذا الأسبوع حتى الآن: للمعلم على جواله فقط، لا يظهر على الشاشة */
function RemoteRanking({ list }: { list: [string, number, number, number?, number?][] }) {
  const top = topRows(rankRows(list.map(([name, stars, mistakes, absences]) => ({ name, stars, mistakes, absences }))));
  if (!top.length) return null;
  return (
    <details className="rrank">
      <summary>الترتيب حتى الآن (لك وحدك)</summary>
      <ol>
        {top.map((r) => (
          <li key={r.name}>
            <b>{num(r.rank)}</b> {r.name} <small>المجموع {num(r.total)}</small>
          </li>
        ))}
      </ol>
    </details>
  );
}

/** نجم الأسبوع: إظهار اللوحة على الشاشة، ونجمة أو غلطة لكل طالب؛ الضغط على الاسم يفتح حذف نجمة أو غلطة */
function StarsSheet({ stars, send }: { stars: NonNullable<RemoteState['stars']>; send: (c: RemoteCmd) => void }) {
  return (
    <>
      <div className="r2line">
        <span>على الشاشة</span>
        <button className="r2btn" onClick={() => send({ c: 'stars', open: !stars.open })}>
          {stars.open ? 'إخفاء' : 'إظهار'}
        </button>
      </div>
      <Fold title="منصة الأسبوع الماضي">
        <div className="r2row">
          <button className="r2btn" onClick={() => send({ c: 'podium', a: 'open' })}>
            افتح المنصة
          </button>
          <button className="r2btn" onClick={() => send({ c: 'podium', a: 'next' })}>
            أظهر المركز التالي
          </button>
        </div>
      </Fold>
      <RemoteRanking list={stars.list} />
      {stars.list.map(([name, st, mi, ab = 0]) => (
        <Collapsible.Root key={name} className="rstar">
          <div className="r2srow">
            <Collapsible.Trigger className="r2name">
              <b>{name}</b>
            </Collapsible.Trigger>
            <span className="r2cnt star">★{num(st)}</span>
            <span className={'r2cnt bad' + (mi >= MAX_MISTAKES ? ' barred' : '')}>✕{num(mi)}</span>
            <button className="r2sq bad" aria-label={`غلطة على ${name}`} onClick={() => send({ c: 'star', s: name, d: -1 })}>
              ✕
            </button>
            <button className="r2sq star" aria-label={`نجمة لـ${name}`} onClick={() => send({ c: 'star', s: name, d: 1 })}>
              ★
            </button>
          </div>
          <Collapsible.Panel className="r2undo">
            <div>
              <span>النجوم هذا الأسبوع: {num(st)}</span>
              <button className="r2sq" aria-label={`احذف نجمة من ${name}`} disabled={!st} onClick={() => send({ c: 'starRemove', s: name, d: 1 })}>
                −
              </button>
            </div>
            <div>
              <span>
                الأغلاط هذا الأسبوع: {num(mi)}
                {mi >= MAX_MISTAKES && ' (لا يدخل نجم الأسبوع)'}
              </span>
              <button className="r2sq" aria-label={`احذف غلطة من ${name}`} disabled={!mi} onClick={() => send({ c: 'starRemove', s: name, d: -1 })}>
                −
              </button>
            </div>
            <div>
              <span>أيام الغياب هذا الأسبوع: {num(ab)}</span>
            </div>
          </Collapsible.Panel>
        </Collapsible.Root>
      ))}
    </>
  );
}

/**
 * الغياب: أسماء طلاب الفصل، ولمس الاسم يسجّله غائبًا اليوم (ولمسه ثانيةً يلغي ذلك).
 * الغائب اليوم لا يدخل العجلة، ولا يُنقص غيابُه نجومَه: يفصل فقط بين المتعادلين في نجم الأسبوع.
 */
/** عدد الغائبين اليوم في الفصل المختار */
const absentCount = (st: RemoteState) => (st.stars?.list ?? []).filter(([, , , , a]) => a).length;

function AbsentList({ stars, send }: { stars: NonNullable<RemoteState['stars']>; send: (c: RemoteCmd) => void }) {
  const away = stars.list.filter(([, , , , a]) => a).length;
  return (
    <>
      <p className="r2note">
        المس اسم الغائب. لا يدخل العجلة اليوم. الغائبون: {num(away)} من {num(stars.list.length)}
      </p>
      <div className="r2absent">
        {stars.list.map(([name, , , , a]) => (
          <button key={name} className={a ? 'on' : ''} aria-pressed={!!a} aria-label={`غائب اليوم: ${name}`} onClick={() => send({ c: 'absent', s: name })}>
            <b>{name}</b>
            <span>{a ? 'غائب' : 'حاضر'}</span>
          </button>
        ))}
      </div>
    </>
  );
}

/** المؤقت: يعدّ تنازليًا وحده من آخر حالة وصلت من الآيباد */
function TimerSheet({ t, at, send, fixed }: { t: RemoteState['timer']; at: number; send: (c: RemoteCmd) => void; /** التصميم الجديد: المؤقت في رأس الشاشة، فلا مكان ولا حجم يُغيَّر */ fixed?: boolean }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!t.run) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [t.run, at]);
  const left = t.run ? Math.max(0, Math.ceil(t.left - (now - at) / 1000)) : t.left;
  return (
    <div className="rtimer">
      <p className={'r2clock' + (left === 0 && t.show ? ' end' : '')}>{clock(t.show ? left : 0)}</p>
      <div className="rpresets">
        {PRESETS.map((sec) => (
          <button key={sec} className="r2btn" onClick={() => send({ c: 'timer', a: 'start', sec })}>
            {duration(sec)}
          </button>
        ))}
      </div>
      {t.show && (
        <>
          <div className="r2row">
            <button className="r2btn" onClick={() => send({ c: 'timer', a: 'add', sec: -10 })}>
              − ١٠ ث
            </button>
            <button className="r2btn" onClick={() => send({ c: 'timer', a: 'add', sec: 10 })}>
              + ١٠ ث
            </button>
          </div>
          <button className="r2btn r2pri" disabled={t.left === 0} onClick={() => send({ c: 'timer', a: 'toggle' })}>
            {t.run ? 'إيقاف مؤقت' : 'متابعة'}
          </button>
          <div className="r2line">
            <span>على الشاشة</span>
            <button className="r2btn" onClick={() => send({ c: 'timer', a: 'close' })}>
              إغلاق المؤقت
            </button>
          </div>
          {!fixed && (
          <Fold title="مكان المؤقت وحجمه" className="rtview">
            <div className="r2row">
              <button className="r2btn" disabled={(t.view?.s ?? 1) <= SCALE_MIN} onClick={() => send({ c: 'timerView', v: { s: (t.view?.s ?? 1) - SCALE_STEP } })}>
                تصغير −
              </button>
              <button className="r2btn" disabled={(t.view?.s ?? 1) >= SCALE_MAX} onClick={() => send({ c: 'timerView', v: { s: (t.view?.s ?? 1) + SCALE_STEP } })}>
                تكبير +
              </button>
            </div>
            <div className="rspots" role="group" aria-label="مكان المؤقت">
              {SPOTS.map((p) => {
                const on = Math.round(t.view?.ax ?? 0) === p.ax && Math.round(t.view?.ay ?? 0) === p.ay;
                return <button key={`${p.ax}${p.ay}`} className={on ? 'on' : ''} aria-label="ضع المؤقت هنا" onClick={() => send({ c: 'timerView', v: p })} />;
              })}
            </div>
          </Fold>
          )}
        </>
      )}
    </div>
  );
}

/** العجلة: الفصل، ومن خرجوا منها (مطويّة)، وخيار إخراج الاسم بعد ظهوره، والاسم الذي خرج، وزر الإدارة */
/** نهاية الحصة: نجوم الفرق حسب ترتيبها، تُعرض أولًا ثم تُؤكَّد */
function TeamStars({ st, send }: { st: RemoteState; send: (c: RemoteCmd) => void }) {
  const [ask, setAsk] = useState(false);
  const stars = st.stars;
  if (st.teams.length < 2 || !stars) return null;
  if (st.teamStarsDone)
    return (
      <>
        <p className="r2note">وُزِّعت نجوم الفرق في هذه الحصة</p>
        <button className="r2btn" onClick={() => send({ c: 'teamPodium', open: !st.teamPodium })}>
          {st.teamPodium ? 'إغلاق ترتيب الفرق' : 'إظهار ترتيب الفرق'}
        </button>
      </>
    );
  if (!ask)
    return (
      <button className="r2btn rsup" onClick={() => setAsk(true)}>
        ★ توزيع نجوم الفرق
      </button>
    );
  const per = teamStarCounts(st.teams.map((t) => t.score));
  const order = st.teams.map((_, i) => i).sort((a, b) => st.teams[b].score - st.teams[a].score);
  const present = (i: number) => stars.list.filter((r, j) => st.teamOf?.[j] === i && !r[4]).length;
  return (
    <div className="rtstars">
      {order.map((i) => (
        <div key={i} className="rteam" style={{ '--tc': st.teams[i].color } as React.CSSProperties}>
          <span>{st.teams[i].name}</span>
          <small>الحاضرون {num(present(i))}</small>
          <b>★ {num(per[i])}</b>
        </div>
      ))}
      <p className="r2note">النجوم لكل طالبٍ حاضرٍ في الفريق، والغائب لا يأخذ.</p>
      <div className="r2row">
        <button className="r2btn" onClick={() => setAsk(false)}>
          إلغاء
        </button>
        <button
          className="r2btn r2pri r2grow"
          onClick={() => {
            send({ c: 'teamStars' });
            setAsk(false);
          }}
        >
          تأكيد التوزيع
        </button>
      </div>
    </div>
  );
}

function WheelSheet({ st, send }: { st: RemoteState; send: (c: RemoteCmd) => void }) {
  const out = st.wheelOut ?? [];
  const picked = st.stars?.list.find(([n]) => n === st.wheelResult);
  /* مع الفرق: من خرج اسمه يكسب نقطة لفريقه بدل نجمة له */
  const ti = picked && st.stars ? (st.teamOf?.[st.stars.list.indexOf(picked)] ?? -1) : -1;
  const team = ti >= 0 ? st.teams[ti] : undefined;
  return (
    <>
      {!!st.klasses?.length && <KlassPicker st={st} send={send} />}
      {!!st.klass && st.teams.length > 0 && (
        <Segs
          label="من يدخل العجلة"
          value={String(st.wheelTeam ?? -1)}
          items={[{ v: '-1', t: 'الكل' }, ...st.teams.map((t, i) => ({ v: String(i), t: t.name }))]}
          onPick={(v) => send({ c: 'wheelTeam', t: Number(v) })}
        />
      )}
      {out.length > 0 && (
        <Fold
          className="r2out"
          title={
            <>
              خارج العجلة <small>({num(out.length)})</small>
            </>
          }
        >
          <div className="r2chips">
            {out.map((n) => (
              <button key={n} className="r2chip" aria-label={`أرجِع ${n} إلى العجلة`} onClick={() => send({ c: 'wheelReturn', s: n })}>
                {n} ↩
              </button>
            ))}
          </div>
          <button className="r2link" onClick={() => send({ c: 'wheelRestore' })}>
            أرجِع الكل
          </button>
        </Fold>
      )}
      {!!st.klass && (
        <label className="r2check">
          <Checkbox.Root className="r2box" checked={st.wheelRemove ?? true} onCheckedChange={(on) => send({ c: 'wheelRemove', on })}>
            <Checkbox.Indicator className="r2tick">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8.5l3.2 3.2L13 4.5" />
              </svg>
            </Checkbox.Indicator>
          </Checkbox.Root>
          أخرِج الاسم من العجلة بعد ظهوره
        </label>
      )}
      {st.wheelResult && st.wheelResult !== '—' && (
        <div className="rpicked">
          <small>خرج الآن</small>
          <p className="wres">{st.wheelResult}</p>
          {picked && (
            <small>
              ★ {num(picked[1])}، ✕ {num(picked[2])}
            </small>
          )}
        </div>
      )}
      <div className="r2row">
        {team ? (
          <button className="r2btn rsup rtpoint" style={{ '--tc': team.color } as React.CSSProperties} aria-label={`نقطة لفريق ${team.name}`} onClick={() => send({ c: 'score', team: ti, d: 1 })}>
            + نقطة لفريق {team.name}
          </button>
        ) : (
          picked && (
            <button className="r2btn rsup" aria-label={`نجمة لـ${picked[0]}`} onClick={() => send({ c: 'star', s: picked[0], d: 1 })}>
              ★ نجمة
            </button>
          )
        )}
        <button className="r2btn r2pri r2grow" onClick={() => send({ c: 'spin' })}>
          أدِر العجلة
        </button>
      </div>
      {st.wheel && (
        <button className="r2btn" onClick={() => send({ c: 'wheel', open: false })}>
          إغلاق العجلة
        </button>
      )}
    </>
  );
}

function KlassPicker({ st, send }: { st: RemoteState; send: (c: RemoteCmd) => void }) {
  return <Segs label="الفصل" value={st.klass ?? ''} items={st.klasses!.map((k) => ({ v: k.id, t: k.name }))} onPick={(id) => send({ c: 'klass', id })} />;
}

/** توزيع الطلاب على الفرق: عشوائيًا، أو بنقل طالب بالضغط على اسمه، وعرض الفرق على الشاشة */
function GroupsSheet({ st, send }: { st: RemoteState; send: (c: RemoteCmd) => void }) {
  const list = st.stars?.list ?? [];
  const of = st.teamOf ?? [];
  const n = st.teams.length;
  if (!st.klass || !list.length) return <p className="r2note">لا فصل مختار. أضف الفصل وأسماء طلابه من الآيباد، ثم اختره هنا.</p>;
  if (!n) return <p className="r2note">اختر عدد الفرق أولًا.</p>;
  return (
    <>
      <button className="r2btn" onClick={() => send({ c: 'teamsShuffle' })}>
        وزّع عشوائيًّا
      </button>
      {[...st.teams.map((_, i) => i), -1].map((ti) => {
        const names = list.filter((_, j) => (of[j] ?? -1) === ti).map(([nm]) => nm);
        if (ti < 0 && !names.length) return null;
        const t = st.teams[ti];
        return (
          <div key={ti} className="r2group" style={t ? ({ '--tc': t.color } as React.CSSProperties) : undefined}>
            <b>
              {t ? t.name : 'بلا فريق'} <small>{num(names.length)}</small>
            </b>
            <div className="r2chips">
              {names.map((nm) => (
                <button key={nm} className="r2chip" aria-label={`انقل ${nm} إلى الفريق التالي`} onClick={() => send({ c: 'teamMove', s: nm, team: (ti + 1) % n })}>
                  {nm}
                </button>
              ))}
            </div>
          </div>
        );
      })}
      <p className="r2note">اضغط اسمًا لنقله إلى الفريق التالي.</p>
      <button className={'r2btn' + (st.teamsShown ? ' on' : '')} onClick={() => send({ c: 'teamsShow', open: !st.teamsShown })}>
        {st.teamsShown ? 'إخفاء الفرق عن الشاشة' : 'اعرض الفرق على الشاشة'}
      </button>
    </>
  );
}

/** صفحة الإعداد قبل الحصة */
function Setup({ st, send, timing, setEnd, onStart, onGroups, onAbsent }: { st: RemoteState; send: (c: RemoteCmd) => void; timing: Timing | null; setEnd: (e: string) => void; onStart: () => void; onGroups: () => void; onAbsent: () => void }) {
  const of = st.teamOf ?? [];
  return (
    <div className="r2setup">
      <header>
        <h1>قبل الحصة</h1>
        <small>{st.lesson}</small>
      </header>
      {!!st.klasses?.length && (
        <section>
          <h2>الفصل</h2>
          <KlassPicker st={st} send={send} />
        </section>
      )}
      {!!st.stars?.list.length && (
        <section>
          <h2>الغياب</h2>
          <button className="r2btn r2absentbtn" onClick={onAbsent}>
            تسجيل الغياب
            <small>{absentCount(st) ? `الغائبون اليوم: ${num(absentCount(st))}` : 'الكل حاضر'}</small>
          </button>
        </section>
      )}
      <section>
        <h2>تنتهي الحصة الساعة</h2>
        <label className="r2time">
          <input type="time" value={timing?.end ?? ''} onChange={(e) => setEnd(e.target.value)} aria-label="وقت انتهاء الحصة" />
          {timing?.end ? <b>{clockAr(timing.end)}</b> : <span>اختر الوقت</span>}
        </label>
      </section>
      <section>
        <h2>عدد الفرق</h2>
        <Segs label="عدد الفرق" value={String(st.teams.length)} items={TEAM_OPTS.map((n) => ({ v: String(n), t: n ? num(n) : 'بدون' }))} onPick={(n) => send({ c: 'teamsN', n: Number(n) })} />
      </section>
      {st.teams.length > 0 && (
        <section>
          <h2>أسماء الفرق</h2>
          {st.teams.map((t, i) => (
            <label key={i} className="r2tname" style={{ '--tc': t.color } as React.CSSProperties}>
              <i />
              <input defaultValue={t.name} key={t.name} aria-label={`اسم الفريق ${num(i + 1)}`} onBlur={(e) => e.target.value.trim() && e.target.value !== t.name && send({ c: 'teamName', i, name: e.target.value })} />
              {!!st.klass && <small>{num(of.filter((x) => x === i).length)} طالب</small>}
            </label>
          ))}
          <button className="r2btn" onClick={onGroups}>
            توزيع الطلاب على الفرق
          </button>
        </section>
      )}
      <button className="r2btn r2pri r2start" onClick={onStart}>
        ابدأ الدرس
      </button>
    </div>
  );
}

export function RemoteApp({ channel }: { channel: string }) {
  const [st, setSt] = useState<RemoteState | null>(null);
  /** وقت وصول آخر حالة، ليعدّ المؤقت منه */
  const [stAt, setStAt] = useState(0);
  const [link, setLink] = useState<LinkStatus>({ direct: false, relay: false, limited: false, pending: 0, rtt: null, via: null });
  const online = link.direct || link.relay;
  const [waiting, setWaiting] = useState(false);
  const linkRef = useRef<ReturnType<typeof remoteLink> | null>(null);
  const gotState = useRef(false);
  /** الآيباد يعرض نسخة أقدم من الجوال */
  const [ipadOld, setIpadOld] = useState(false);
  const [phoneOld, setPhoneOld] = useState(false);
  /** آخر قائمة شرائح وصلت (لا تُرسل في كل رسالة) */
  const [titles, setTitles] = useState<[string, number][]>([]);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [timing, setTiming] = useState<Timing | null>(() => loadTiming(channel));
  /** صفحة الإعداد تظهر أول مرة في اليوم، أو من زر الإعداد */
  const [setup, setSetup] = useState(() => !loadTiming(channel)?.start);
  const [confirmReset, setConfirmReset] = useState(false);

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
        if (raw.slides?.length) setTitles(raw.slides);
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
  const setEnd = (end: string) => {
    const t = { end, start: timing?.start ?? 0, day: today() };
    setTiming(t);
    saveTiming(channel, t);
  };
  const start = () => {
    const t = { end: timing?.end ?? '', start: Date.now(), day: today() };
    setTiming(t);
    saveTiming(channel, t);
    setSetup(false);
    setSheet(null);
    if (st?.teamsShown) send({ c: 'teamsShow', open: false });
  };

  const [shown, total] = st?.steps ?? [0, 0];
  const moreSteps = shown < total;
  // سرعة الاتصال وطريقه ظاهرة للمعلم، فيعرف إن كان البطء من الشبكة
  const speed = link.rtt !== null ? `، ${num(link.rtt)} م.ث` : '';
  const route = link.via === 'turn' ? 'متصل عبر خادم وسيط' : 'متصل مباشرة بالآيباد';
  const status = !online
    ? 'جارٍ الاتصال…'
    : !st
      ? waiting
        ? 'افتح الدرس على الآيباد واضغط «الجوال» ثم «تشغيل»'
        : 'جارٍ البحث عن الآيباد…'
      : link.direct
        ? route + speed + (link.pending ? '، يرسل…' : '')
        : link.relay
          ? 'متصل عبر الخادم الاحتياطي (أبطأ)' + (link.pending ? '، يرسل…' : '')
          : 'يعيد الاتصال بالآيباد…' + (link.pending ? ' (الضغطات محفوظة)' : '');
  const ok = online && !!st && !link.pending;

  const warnings = (
    <>
      {link.limited && !link.direct && (
        <p className="rwarn">خادم الربط وصل حدّه اليومي على هذه الشبكة. جرّب أن يتصل الجوال بإنترنت الجوال (لا الواي فاي)، أو حاول غدًا.</p>
      )}
      {ipadOld && <p className="rwarn">الدرس على الآيباد نسخة قديمة: أغلق صفحة الدرس على الآيباد وافتحها من جديد لتظهر كل الأزرار.</p>}
      {phoneOld && <p className="rwarn">هذه الصفحة نسخة قديمة: أغلقها وامسح الرمز من جديد.</p>}
    </>
  );

  const secKey = st ? (Object.keys(SECTION_NAMES) as (keyof typeof SECTION_NAMES)[]).find((k) => SECTION_NAMES[k] === st.sec) : undefined;
  if (!st || setup)
    return (
      <DirectionProvider direction="rtl">
      <div className="remote r2" data-sec="start">
        <header className="rhead">
          <span className={'dot' + (ok ? ' ok' : '')}>{status}</span>
        </header>
        {warnings}
        {st && <Setup st={st} send={send} timing={timing} setEnd={setEnd} onStart={start} onGroups={() => setSheet('groups')} onAbsent={() => setSheet('absent')} />}
        {st && (
          <Sheet open={sheet === 'groups'} title="توزيع الطلاب" onClose={() => setSheet(null)}>
            <GroupsSheet st={st} send={send} />
          </Sheet>
        )}
        {st && (
          <Sheet open={sheet === 'absent'} title="الغياب" onClose={() => setSheet(null)}>
            {!!st.klasses?.length && <KlassPicker st={st} send={send} />}
            {st.stars ? <AbsentList stars={st.stars} send={send} /> : <p className="r2note">لا أسماء في هذا الفصل.</p>}
          </Sheet>
        )}
      </div>
      </DirectionProvider>
    );

  return (
    <DirectionProvider direction="rtl">
    <div className="remote r2" data-sec={secKey ?? 'start'}>
      <header className="rhead">
        <span className="r2sec">
          {st.sec}، {num(st.cur + 1)} من {num(st.total)}
        </span>
        <span className={'dot' + (ok ? ' ok' : '')} title={status}>
          {ok ? (link.direct ? 'متصل مباشرة' : 'متصل عبر الخادم') : status}
        </span>
        <button className="r2icon" aria-label="إعداد الحصة" onClick={() => setSetup(true)}>
          <IconGear />
        </button>
      </header>
      {warnings}

      <div className="r2title">
        <h1>{st.title || '—'}</h1>
        {st.hasHint && (
          <button className="r2icon" aria-label="التلميح" onClick={() => send({ c: 'hint' })}>
            <IconBulb />
          </button>
        )}
        <button className="r2icon" aria-label="إعادة هذه الشريحة" onClick={() => setConfirmReset(true)}>
          <IconReset />
        </button>
      </div>
      {confirmReset && (
        <div className="r2confirm">
          <p>إعادة هذه الشريحة؟ تختفي خطواتها وإجاباتها.</p>
          <div className="r2row">
            <button
              className="r2btn r2danger"
              onClick={() => {
                send({ c: 'resetSlide' });
                setConfirmReset(false);
              }}
            >
              أعِدها
            </button>
            <button className="r2btn" onClick={() => setConfirmReset(false)}>
              إلغاء
            </button>
          </div>
        </div>
      )}

      {timing?.start && timing.end ? <Pacing timing={timing} mins={st.mins ?? []} cur={st.cur} /> : null}

      {total > 0 && (
        <div className="r2steps" aria-label={`الخطوة ${num(shown)} من ${num(total)}`}>
          {Array.from({ length: total }, (_, i) => (
            <i key={i} className={i < shown ? 'on' : ''} />
          ))}
          <small>
            {num(shown)} من {num(total)}
          </small>
        </div>
      )}

      {moreSteps && st.upNext && (
        <div className="r2next">
          <small>التالي على الشاشة</small>
          <p>{st.upNext}</p>
        </div>
      )}

      {/* ملاحظات المعلم: لا تظهر على شاشة العرض، بل هنا فقط */}
      {st.notes && (
        <section className="rcard notes">
          <h2>
            ملاحظة <small>{num(st.min)} د</small>
          </h2>
          <p>{st.notes}</p>
        </section>
      )}

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

      {st.widget && <RemoteWidgetCard w={st.widget} send={(key, v) => send({ c: 'widget', key, v })} />}
      {st.family && <RemoteFamilyCard f={st.family} send={(v) => send({ c: 'family', ...v })} />}
      {st.chart && <RemoteChartCard chart={st.chart} send={(i, v) => send({ c: 'chart', i, v })} onMode={(m) => send({ c: 'chartMode', m })} />}

      {/* في الأسفل قرب الإبهام: صف الأدوات، ثم الأسهم */}
      <footer className="r2foot">
        <div className="r2tools">
          <button onClick={() => setSheet('teams')}>
            <IconTeams />
            الفرق
          </button>
          <button onClick={() => setSheet('wheel')}>
            <IconPrizeWheel />
            العجلة
          </button>
          <button onClick={() => setSheet('stars')}>
            <IconStar />
            النجوم
          </button>
          <button className={st.timer.show ? 'on' : ''} onClick={() => setSheet('timer')}>
            <IconTimer />
            المؤقت
          </button>
          <button onClick={() => setSheet('slides')}>
            <IconList />
            الشرائح
          </button>
        </div>
        <nav className="rnav" aria-label="التنقل">
          <button className="pslide" aria-label="الشريحة السابقة" disabled={st.cur === 0} onClick={() => send({ c: 'slide', d: -1 })}>
            <IconSlidePrev />
          </button>
          <button className="prev" aria-label="الخطوة السابقة" disabled={st.cur === 0 && shown === 0} onClick={() => send({ c: 'back' })}>
            <IconPrevRtl />
          </button>
          {/* الخطوة التالية: وفي آخر خطوة تنتقل إلى الشريحة التالية، كالسهم في لوحة المفاتيح */}
          <button className="next" aria-label="الخطوة التالية" disabled={st.cur === st.total - 1 && !moreSteps} onClick={() => send({ c: 'next' })}>
            <IconNextRtl />
          </button>
          <button className="nslide" aria-label="الشريحة التالية" disabled={st.cur === st.total - 1} onClick={() => send({ c: 'slide', d: 1 })}>
            <IconSlideNext />
          </button>
        </nav>
      </footer>

      <Sheet open={sheet === 'teams'} title="الفرق" onClose={() => setSheet(null)}>
          {st.teams.length ? (
            st.teams.map((t, i) => (
              <div key={i} className="rteam" style={{ '--tc': t.color } as React.CSSProperties}>
                <button className="r2sq" aria-label={`إنقاص نقطة من ${t.name}`} onClick={() => send({ c: 'score', team: i, d: -1 })}>
                  −
                </button>
                <span>{t.name}</span>
                <b>{num(t.score)}</b>
                <button className="r2plus" aria-label={`إضافة نقطة إلى ${t.name}`} onClick={() => send({ c: 'score', team: i, d: 1 })}>
                  +
                </button>
              </div>
            ))
          ) : (
            <p className="r2note">لا فرق في هذه الحصة. اخترها من صفحة الإعداد.</p>
          )}
          <TeamStars st={st} send={send} />
      </Sheet>
      <Sheet open={sheet === 'wheel'} title="العجلة" onClose={() => setSheet(null)}>
          <WheelSheet st={st} send={send} />
      </Sheet>
      <Sheet open={sheet === 'stars'} title="النجوم" onClose={() => setSheet(null)}>
          {st.stars ? <StarsSheet stars={st.stars} send={send} /> : <p className="r2note">لا فصل مختار. أضف الفصل وأسماء طلابه من الآيباد، ثم اختره من صفحة الإعداد.</p>}
      </Sheet>
      <Sheet open={sheet === 'timer'} title="المؤقت" onClose={() => setSheet(null)}>
          <TimerSheet t={st.timer} at={stAt} send={send} fixed={st.v2} />
      </Sheet>
      <Sheet open={sheet === 'slides'} title="الشرائح" onClose={() => setSheet(null)}>
          <div className="r2slides">
            {st.sections.map((o, si) => (
              <div key={o.first} className="r2secgrp">
                <h3>{o.name}</h3>
                {titles.length
                  ? titles.map(([t, s], i) =>
                      s === si ? (
                        <button
                          key={i}
                          className={i === st.cur ? 'here' : ''}
                          aria-current={i === st.cur ? 'page' : undefined}
                          onClick={() => {
                            send({ c: 'goto', i });
                            setSheet(null);
                          }}
                        >
                          <small>{num(i + 1)}</small> {t || o.name}
                        </button>
                      ) : null,
                    )
                  : (
                      <button
                        onClick={() => {
                          send({ c: 'goto', i: o.first });
                          setSheet(null);
                        }}
                      >
                        <small>{num(o.first + 1)}</small> {o.name}
                      </button>
                    )}
              </div>
            ))}
          </div>
      </Sheet>
    </div>
    </DirectionProvider>
  );
}
