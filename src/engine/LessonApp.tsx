import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { EngineCtx, SlideScope, type EngineApi, type SlideApi } from './context';
import { num } from './digits';
import { SECTION_NAMES, TEAM_COLORS } from './sections';
import { setMuted, sGood } from './sound';
import { useSaved } from './store';
import { classesOf, gradeOf, setClass, setGrade, useRoster } from './classes';
import { ClassesModal, GroupsModal } from './components/Classes';
import type { Lesson, SectionKey, SlideDef } from './types';
import { Home } from './components/Home';
import { Pen } from './components/Pen';
import { RemotePanel } from './components/RemotePanel';
import { BUILD, deviceChannel, hostLink, remoteEnabled, remoteUrl, setRemoteEnabled, type RemoteCmd, type RemoteState } from './remote';
import { TIMER_OFF, TimerWidget, fixView, type TimerState } from './components/Timer';
import { WheelModal } from './components/Wheel';
import { IconFull, IconHome, IconReset, IconNextRtl, IconPen, IconPhone, IconPrevRtl, IconSound, IconStar, IconTimer, IconWheel } from './components/icons';

const HOME_NOTES = 'رحّب بالطلاب، وقسّمهم إلى فرق وسمِّ كل فريق. اضغط «متابعة» إن كنت توقفت في حصة سابقة. الاختصارات: الأسهم للتنقل، المسافة للخطوة التالية، F لملء الشاشة.';
const STAGE_W = 1600;
const STAGE_H = 900;
/** أقل من هذا العرض تتحول الشرائح من مسرح مُحجَّم إلى صفحة تمرير (الجوال) */
const FLOW_BELOW = 820;

function fullscreen() {
  try {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  } catch {
    /* غير مدعوم */
  }
}

export function LessonApp({ lesson }: { lesson: Lesson }) {
  const { st, patch, resumeFrom } = useSaved(lesson.meta.id);
  const [cur, setCur] = useState(0);
  const [timer, setTimer] = useState<TimerState>(TIMER_OFF);
  const [wheelOpen, setWheelOpen] = useState(false);
  /* فصول الطلاب: مشتركة بين كل الدروس، والفصل المختار لهذه الحصة يبدأ بآخر فصل اختير في هذا الصف */
  const grade = gradeOf(lesson.meta.id);
  const { roster, update: updateRoster } = useRoster();
  const classes = classesOf(roster, grade);
  const [klassId, setKlassId] = useState(() => roster.grades[grade]?.last ?? '');
  const klass = classes.find((c) => c.id === klassId);
  /** أسماء خرجت من العجلة في هذه الحصة فلا تتكرر */
  const [picked, setPicked] = useState<string[]>([]);
  const [teamFilter, setTeamFilter] = useState(-1);
  const [classesOpen, setClassesOpen] = useState(false);
  const [groupsOpen, setGroupsOpen] = useState(false);
  const chooseKlass = (id: string) => {
    setKlassId(id);
    setPicked([]);
    setTeamFilter(-1);
    updateRoster((r) => setGrade(r, grade, (g) => ({ ...g, last: id })));
  };
  const [pen, setPen] = useState(false);
  const [layout, setLayout] = useState({ flow: false, scale: 1 });
  /** عدد مرات إعادة كل شريحة؛ تغيّره يعيد تركيب الشريحة فتعود كل حالتها (الخطوات، الإجابات، السحب، الكتابة) */
  const [resets, setResets] = useState<Record<number, number>>({});
  /** عدد مرات إعادة الدرس كاملًا؛ يدخل في مفتاح كل شريحة وفي مفتاح القلم */
  const [lessonGen, setLessonGen] = useState(0);
  /** قائمة الإعادة: مغلقة، أو مفتوحة، أو تنتظر تأكيد إعادة الدرس كاملًا */
  const [resetMenu, setResetMenu] = useState<'closed' | 'open' | 'confirm'>('closed');
  const appRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const slideApis = useRef<(SlideApi | null)[]>([]);

  /* التحكم من الجوال */
  const [remotePanel, setRemotePanel] = useState(false);
  const [remoteOn, setRemoteOn] = useState(remoteEnabled);
  const [channel, setChannel] = useState(() => deviceChannel());
  const [online, setOnline] = useState(false);
  /** قناة مباشرة مع الجوال مفتوحة (بلا حد للرسائل) */
  const [direct, setDirect] = useState(false);
  const [limited, setLimited] = useState(false);
  const [phoneSeen, setPhoneSeen] = useState(false);
  const [wheelResult, setWheelResult] = useState('');
  const [spinReq, setSpinReq] = useState(0);
  /** يزداد مع كل تغيّر داخل شريحة (خطوة، تلميح) فتُرسل الحالة من جديد */
  const [slideTick, setSlideTick] = useState(0);
  /** لا يُعاد رسم التطبيق مع كل خطوة إلا إذا كان جوال متصلًا ينتظر الحالة */
  const remoteLive = useRef(false);
  const slideChanged = useCallback(() => {
    if (remoteLive.current) setSlideTick((t) => t + 1);
  }, []);
  const linkRef = useRef<ReturnType<typeof hostLink> | null>(null);
  const onCmdRef = useRef<(c: RemoteCmd) => void>(() => {});

  const slides: SlideDef[] = useMemo(() => [{ sec: 'start', min: 1, notes: HOME_NOTES, content: null }, ...lesson.slides], [lesson]);
  const sections = useMemo(() => {
    const out: { k: SectionKey; first: number; last: number }[] = [];
    slides.forEach((s, i) => {
      const o = out.find((x) => x.k === s.sec);
      if (o) o.last = i;
      else out.push({ k: s.sec, first: i, last: i });
    });
    return out;
  }, [slides]);

  const goto = useCallback(
    (i: number) => {
      const n = Math.max(0, Math.min(slides.length - 1, i));
      setCur(n);
      patch({ slide: n });
    },
    [slides.length],
  );

  useEffect(() => setMuted(st.muted), [st.muted]);
  useEffect(() => {
    document.title = `${lesson.meta.shortTitle} ${lesson.meta.code}`;
  }, [lesson]);
  useEffect(() => {
    document.body.classList.toggle('flow', layout.flow);
  }, [layout.flow]);
  useEffect(() => {
    const s = mainRef.current?.querySelector<HTMLElement>('.slide.active');
    if (s) s.scrollTop = 0;
  }, [cur]);

  /* الصف الثاني: أسئلة الكتاب بأكبر خط يتسع للشريحة (--qfs)، ويُعاد الحساب عند إظهار خطوة أو تلميح */
  useLayoutEffect(() => {
    if (!lesson.meta.id.startsWith('g2') || layout.flow) return;
    const s = mainRef.current?.querySelector<HTMLElement>('.slide.active');
    if (!s || !s.querySelector(':scope > .bookrow') || !s.querySelector(':scope > .qgrid')) return;
    const cards = [...s.querySelectorAll<HTMLElement>(':scope > .qgrid > .qcard')];
    const over = () => s.scrollHeight > s.clientHeight + 1 || s.scrollWidth > s.clientWidth + 1 || cards.some((c) => c.scrollWidth > c.clientWidth + 2);
    const fit = () => {
      let k = 1.7;
      s.style.setProperty('--qfs', k + 'em');
      while (over() && k > 0.85) {
        k = Math.round((k - 0.05) * 100) / 100;
        s.style.setProperty('--qfs', k + 'em');
      }
    };
    fit();
    const mo = new MutationObserver(fit);
    mo.observe(s, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, [cur, lesson.meta.id, layout.flow]);

  /* التحجيم: المسرح ثابت ١٦٠٠×٩٠٠ ويُكبَّر أو يُصغَّر ليملأ الشاشة */
  useLayoutEffect(() => {
    const fit = () => {
      const flow = window.innerWidth < FLOW_BELOW;
      const a = appRef.current;
      const scale = a ? Math.min(a.clientWidth / STAGE_W, a.clientHeight / STAGE_H) : 1;
      setLayout({ flow, scale });
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const addScore = useCallback(
    (i: number, d: number) => {
      if (d > 0) sGood();
      patch((s) => ({ scores: s.scores.map((v, j) => (j === i ? Math.max(0, v + d) : v)) }));
    },
    [],
  );
  const startTimer = useCallback((sec: number) => setTimer((x) => ({ show: true, left: sec, run: true, gen: x.gen + 1 })), []);
  const registerSlide = useCallback((i: number, api: SlideApi | null) => {
    slideApis.current[i] = api;
  }, []);
  /** على الموقع: قائمة الدروس (index.html بجانب ملف الدرس). ملف محفوظ دون اتصال لا قائمة معه: أول شريحة. */
  const goHome = () => {
    if (/^https?:$/.test(location.protocol)) location.href = './';
    else goto(0);
  };
  const resetSlide = useCallback(() => setResets((r) => ({ ...r, [cur]: (r[cur] ?? 0) + 1 })), [cur]);
  /** إعادة الدرس كاملًا: كل الشرائح ورسوم القلم والنقاط والمؤقت، ثم العودة إلى البداية. أسماء الفرق وعددها تبقى. */
  const resetLesson = () => {
    setResets({});
    setLessonGen((g) => g + 1);
    setPen(false);
    setTimer(TIMER_OFF);
    patch({ scores: [0, 0, 0, 0] });
    setResetMenu('closed');
    goto(0);
  };

  const engine = useMemo<EngineApi>(
    () => ({ nTeams: st.nTeams, teamNames: st.names, scores: st.scores, addScore, startTimer, goto, registerSlide, slideChanged }),
    [st.nTeams, st.names, st.scores, addScore, startTimer, goto, registerSlide, slideChanged],
  );

  /* أوامر الجوال: تُنفَّذ بأحدث حالة عبر المرجع */
  onCmdRef.current = (c: RemoteCmd) => {
    setPhoneSeen(true);
    const api = slideApis.current[cur];
    switch (c.c) {
      case 'hello':
        setSlideTick((t) => t + 1);
        break;
      case 'next':
        if (!api?.reveal()) goto(cur + 1);
        break;
      case 'prev':
        goto(cur - 1);
        break;
      case 'back':
        if (!api?.unreveal()) goto(cur - 1);
        break;
      case 'slide':
        goto(cur + (c.d > 0 ? 1 : -1));
        break;
      case 'goto':
        goto(c.i);
        break;
      case 'hint':
        api?.toggleHint();
        break;
      case 'resetSlide':
        resetSlide();
        break;
      case 'score':
        if (c.team >= 0 && c.team < st.nTeams) addScore(c.team, c.d > 0 ? 1 : -1);
        break;
      case 'wheel':
        setWheelOpen(c.open);
        break;
      case 'klass':
        if (c.id === '' || classes.some((k) => k.id === c.id)) chooseKlass(c.id);
        break;
      case 'wheelRestore':
        setPicked([]);
        break;
      case 'spin':
        setWheelOpen(true);
        setSpinReq((n) => n + 1);
        break;
      case 'chart':
        if (Number.isFinite(c.v)) api?.chart()?.set(c.i, c.v);
        break;
      case 'chartMode':
        api?.chart()?.setMode?.(c.m);
        break;
      case 'widget':
        api?.widget()?.act(String(c.key), c.v);
        break;
      case 'family':
        api?.family()?.set({ a: c.a, b: c.b, pick: c.pick });
        break;
      case 'mcq':
        api?.mcqs()[c.k]?.choose(c.o);
        break;
      case 'mcqAward':
        api?.mcqs()[c.k]?.award(c.team);
        break;
      case 'timer':
        if (c.a === 'start') {
          if (c.sec > 0 && c.sec <= 3600) startTimer(Math.round(c.sec));
        } else if (c.a === 'toggle') setTimer((x) => (x.left > 0 ? { ...x, show: true, run: !x.run } : x));
        else setTimer((x) => ({ ...x, show: false, run: false }));
        break;
      case 'timerView':
        patch((x) => ({ timerView: fixView({ ...x.timerView, ...c.v }) }));
        break;
    }
  };

  useEffect(() => {
    if (!remoteOn) return;
    const link = hostLink(
      channel,
      (c) => onCmdRef.current(c),
      (s) => {
        setOnline(s.relay || s.direct);
        setDirect(s.direct);
        setLimited(s.limited);
      },
    );
    linkRef.current = link;
    return () => {
      link.stop();
      linkRef.current = null;
      setOnline(false);
      setDirect(false);
      setPhoneSeen(false);
    };
  }, [remoteOn, channel]);

  remoteLive.current = remoteOn && phoneSeen;
  const timerNow = useRef(timer);
  timerNow.current = timer;
  /* إرسال الحالة إلى الجوال بعد كل تغيير (مجمَّعة)، فقط بعد أن يتصل جوال */
  useEffect(() => {
    if (!remoteOn || !phoneSeen) return;
    const t = setTimeout(() => {
      const active = mainRef.current?.querySelector('.slide.active');
      const head = active?.querySelector('h2, .qhead')?.textContent?.trim();
      const info = slideApis.current[cur]?.info() ?? { shown: 0, total: 0 };
      const sl = slides[cur];
      const state: RemoteState = {
        v: BUILD,
        lesson: `${lesson.meta.shortTitle} ${lesson.meta.code}`,
        cur,
        total: slides.length,
        sec: SECTION_NAMES[sl.sec],
        title: cur === 0 ? 'البداية' : (head ?? '').slice(0, 160),
        notes: sl.notes.slice(0, 900),
        min: sl.min,
        steps: [info.shown, info.total],
        hasHint: !!active?.querySelector('.btn.hint'),
        teams: Array.from({ length: st.nTeams }, (_, i) => ({ name: st.names[i], score: st.scores[i], color: TEAM_COLORS[i] })),
        sections: sections.map((o) => ({ name: SECTION_NAMES[o.k], first: o.first })),
        wheel: wheelOpen,
        wheelResult,
        klasses: classes.map((k) => ({ id: k.id, name: k.name })),
        klass: klass?.id ?? '',
        wheelPicked: picked.length,
        chart: slideApis.current[cur]?.chart()?.get() ?? null,
        family: slideApis.current[cur]?.family()?.get() ?? null,
        widget: slideApis.current[cur]?.widget()?.get() ?? null,
        mcqs: (slideApis.current[cur]?.mcqs() ?? []).map((m) => m.get()),
        timer: { show: timerNow.current.show, run: timerNow.current.run, left: timerNow.current.left, view: st.timerView },
      };
      // خادم الرسائل يقبل ٤ ك.ب للرسالة: تُقصَّر الملاحظات إن لزم
      const size = () => new Blob([JSON.stringify({ state })]).size;
      while (size() > 3800 && state.notes.length > 40) state.notes = state.notes.slice(0, Math.floor(state.notes.length * 0.7)) + '…';
      linkRef.current?.send(state);
      // عبر الخادم (بلا اتصال مباشر) تُجمَّع التحديثات أكثر حفاظًا على حصة الرسائل
    }, direct ? 250 : 1500);
    return () => clearTimeout(t);
  }, [remoteOn, phoneSeen, direct, cur, slideTick, timer.show, timer.run, timer.gen, st.scores, st.names, st.nTeams, st.timerView, wheelOpen, wheelResult, slides, sections, lesson, classes, klass, picked]);

  const enableRemote = (on: boolean) => {
    setRemoteEnabled(on);
    setRemoteOn(on);
  };

  /* لوحة المفاتيح: في RTL السهم الأيسر للتالي والأيمن للسابق */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tg = (e.target as HTMLElement).tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA') return;
      if (remotePanel) {
        if (e.key === 'Escape') setRemotePanel(false);
        return;
      }
      if (resetMenu !== 'closed') {
        if (e.key === 'Escape') setResetMenu('closed');
        return;
      }
      if (classesOpen || groupsOpen) {
        if (e.key === 'Escape') {
          setClassesOpen(false);
          setGroupsOpen(false);
        }
        return;
      }
      if (wheelOpen) {
        if (e.key === 'Escape') setWheelOpen(false);
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageDown') {
        e.preventDefault();
        goto(cur + 1);
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        e.preventDefault();
        goto(cur - 1);
      } else if (e.code === 'Space') {
        e.preventDefault();
        (document.activeElement as HTMLElement | null)?.blur?.();
        slideApis.current[cur]?.reveal();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        fullscreen();
      } else if (e.code === 'KeyR' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        resetSlide();
      } else if (e.key === 'Home') goto(0);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [cur, wheelOpen, classesOpen, groupsOpen, resetMenu, remotePanel, goto, resetSlide]);

  const s = slides[cur];
  const m = lesson.meta;
  const toolBtn = (on: boolean) => 'ib' + (on ? ' on' : '');

  return (
    <EngineCtx.Provider value={engine}>
      <div id="app" ref={appRef} data-lesson={m.id} data-book-questions={m.bookQuestions}>
        <div id="stage" style={layout.flow ? undefined : { transform: `translate(-50%, -50%) scale(${layout.scale})` }}>
          <header id="hdr">
            <button className="ib" title="قائمة الدروس" aria-label="الصفحة الرئيسية: قائمة الدروس" onClick={goHome}>
              <IconHome />
              <span className="lbl">الرئيسية</span>
            </button>
            <div className="ttl">
              <b>{m.shortTitle}</b>
              <span>
                {m.subject} · {m.grade} · الدرس {m.code}
              </span>
            </div>
            <span id="secChip">{SECTION_NAMES[s.sec]}</span>
            <span className="sp" />
            <div className="tools">
              <span className="rmenu">
                <button
                  className={toolBtn(resetMenu !== 'closed')}
                  title="إعادة"
                  aria-label="إعادة"
                  aria-expanded={resetMenu !== 'closed'}
                  onClick={() => setResetMenu((x) => (x === 'closed' ? 'open' : 'closed'))}
                >
                  <IconReset />
                  <span className="lbl">إعادة</span>
                </button>
                {resetMenu !== 'closed' && (
                  <>
                    <span className="rback" onClick={() => setResetMenu('closed')} />
                    <span className="rpop" role="menu">
                      {resetMenu === 'open' ? (
                        <>
                          <button
                            role="menuitem"
                            onClick={() => {
                              resetSlide();
                              setResetMenu('closed');
                            }}
                          >
                            إعادة هذه الشريحة <small>(R)</small>
                          </button>
                          <button role="menuitem" className="all" onClick={() => setResetMenu('confirm')}>
                            إعادة الدرس كاملًا
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="q">تُمحى كل الإجابات والرسوم ونقاط الفرق، ويعود الدرس إلى البداية. متأكد؟</span>
                          <button role="menuitem" className="all" onClick={resetLesson}>
                            نعم، أعد الدرس
                          </button>
                          <button role="menuitem" onClick={() => setResetMenu('closed')}>
                            إلغاء
                          </button>
                        </>
                      )}
                    </span>
                  </>
                )}
              </span>
              <button className={toolBtn(pen)} title="قلم الرسم" aria-label="قلم الرسم" onClick={() => setPen(!pen)}>
                <IconPen />
                <span className="lbl">قلم</span>
              </button>
              <button
                className={toolBtn(timer.show)}
                title="المؤقت"
                aria-label="المؤقت"
                onClick={() => setTimer((x) => (x.show ? { ...x, show: false, run: false } : { ...x, show: true, run: false, left: 60 }))}
              >
                <IconTimer />
                <span className="lbl">مؤقت</span>
              </button>
              <button className="ib" title="عجلة الأسماء" aria-label="عجلة الأسماء" onClick={() => setWheelOpen(true)}>
                <IconWheel />
                <span className="lbl">العجلة</span>
              </button>
              <button className={toolBtn(st.muted)} title={st.muted ? 'تشغيل الصوت' : 'كتم الصوت'} aria-label="كتم الصوت" onClick={() => patch({ muted: !st.muted })}>
                <IconSound muted={st.muted} />
              </button>
              <button className={toolBtn(remoteOn)} title="التحكم من الجوال" aria-label="التحكم من الجوال" onClick={() => setRemotePanel(true)}>
                <IconPhone />
                <span className="lbl">الجوال</span>
              </button>
              <button className="ib" title="ملء الشاشة (F)" aria-label="ملء الشاشة" onClick={fullscreen}>
                <IconFull />
                <span className="lbl">ملء الشاشة</span>
              </button>
            </div>
          </header>

          <main id="main" ref={mainRef}>
            {slides.map((sl, i) => (
              <section key={i} className={'slide' + (i === cur ? ' active' : '')} data-sec={sl.sec} data-index={i}>
                <SlideScope index={i} key={`${lessonGen}-${resets[i] ?? 0}`}>
                  {i === 0 ? (
                    <Home
                      lesson={lesson}
                      sections={sections}
                      goto={goto}
                      resumeFrom={resumeFrom}
                      nTeams={st.nTeams}
                      names={st.names}
                      setTeams={(n) => patch({ nTeams: n })}
                      setName={(j, name) => patch((x) => ({ names: x.names.map((v, k) => (k === j ? name : v)) }))}
                      resetScores={() => patch({ scores: [0, 0, 0, 0] })}
                      classes={classes}
                      klass={klass}
                      setKlass={chooseKlass}
                      onManage={() => setClassesOpen(true)}
                      onGroups={() => setGroupsOpen(true)}
                    />
                  ) : (
                    sl.content
                  )}
                </SlideScope>
              </section>
            ))}
            <Pen key={lessonGen} active={pen} onClose={() => setPen(false)} slide={cur} resetCount={resets[cur] ?? 0} layoutKey={`${layout.flow}-${layout.scale}`} main={mainRef} />
            <TimerWidget t={timer} set={setTimer} view={st.timerView} onView={(v) => patch({ timerView: fixView(v) })} />
          </main>


          <footer id="ftr">
            <button className="btn nav" aria-label="الشريحة السابقة" disabled={cur === 0} onClick={() => goto(cur - 1)}>
              <IconPrevRtl />
              السابق
            </button>
            <div id="prog">
              <div id="segs">
                {sections.map((o) => {
                  const f = cur > o.last ? 1 : cur < o.first ? 0 : (cur - o.first + 1) / (o.last - o.first + 1);
                  return (
                    <button key={o.k} title={SECTION_NAMES[o.k]} aria-label={SECTION_NAMES[o.k]} className={s.sec === o.k ? 'cur' : ''} onClick={() => goto(o.first)}>
                      <i style={{ width: `${f * 100}%` }} />
                    </button>
                  );
                })}
              </div>
              <div id="pinfo">
                <span>{SECTION_NAMES[s.sec]}</span>
                <span>
                  {num(cur + 1)} / {num(slides.length)}
                </span>
              </div>
            </div>
            <div id="teams">
              {Array.from({ length: st.nTeams }, (_, i) => (
                <div key={i} className="team" style={{ borderColor: TEAM_COLORS[i], color: TEAM_COLORS[i] }}>
                  <button aria-label="إنقاص نقطة" onClick={() => addScore(i, -1)}>
                    −
                  </button>
                  <span className="tn">
                    {st.names[i]} <IconStar /> {num(st.scores[i])}
                  </span>
                  <button aria-label="إضافة نقطة" onClick={() => addScore(i, 1)}>
                    +
                  </button>
                </div>
              ))}
            </div>
            <button className="btn nav primary" aria-label="الشريحة التالية" disabled={cur === slides.length - 1} onClick={() => goto(cur + 1)}>
              التالي
              <IconNextRtl />
            </button>
          </footer>

          <WheelModal open={wheelOpen} onClose={() => setWheelOpen(false)} names={st.wheel} onNames={(w) => patch({ wheel: w })} spinReq={spinReq}
            onResult={setWheelResult}
            klass={klass}
            nTeams={st.nTeams}
            teamNames={st.names}
            teamFilter={teamFilter}
            onTeamFilter={setTeamFilter}
            picked={picked}
            onPick={(n) => setPicked((p) => [...p, n])}
            onRestore={() => setPicked([])}
            onManage={() => setClassesOpen(true)}
          />
          <ClassesModal open={classesOpen} onClose={() => setClassesOpen(false)} grade={grade} roster={roster} update={updateRoster} />
          <GroupsModal
            open={groupsOpen}
            onClose={() => setGroupsOpen(false)}
            klass={klass}
            nTeams={st.nTeams}
            teamNames={st.names}
            setTeams={(team) => klass && updateRoster((r) => setClass(r, grade, klass.id, (k) => ({ ...k, team })))}
          />
          <RemotePanel
            open={remotePanel}
            onClose={() => setRemotePanel(false)}
            enabled={remoteOn}
            online={online}
            direct={direct}
            limited={limited}
            phoneSeen={phoneSeen}
            url={remoteUrl(channel, lesson.meta.id)}
            onEnable={enableRemote}
            onNewCode={() => setChannel(deviceChannel(true))}
          />
        </div>
      </div>
    </EngineCtx.Provider>
  );
}
