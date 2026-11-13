import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { EngineCtx, SlideScope, V2Ctx, type EngineApi, type SlideApi } from './context';
import { TimerPill, V2Header, V2Progress } from './components/V2Chrome';
import { num } from './digits';
import { SECTION_NAMES, TEAM_COLORS, V2_TEAM_COLORS } from './sections';
import { sBad, setMuted, sGood, sStar } from './sound';
import { absentToday, teamStarCounts, useStars, tally, weekStart } from './stars';
import { useSaved } from './store';
import { classesOf, gradeOf, setClass, setGrade, shuffleTeams, useRoster, type Klass } from './classes';
import { ClassesModal, GroupsModal } from './components/Classes';
import type { Lesson, SectionKey, SlideDef } from './types';
import { Home } from './components/Home';
import { Pen } from './components/Pen';
import { RemotePanel } from './components/RemotePanel';
import { BUILD, deviceChannel, hostLink, remoteEnabled, remoteUrl, setRemoteEnabled, type RemoteCmd, type RemoteState, type WheelMode } from './remote';
import { TIMER_OFF, TimerWidget, fixView, type TimerState } from './components/Timer';
import { WheelModal } from './components/Wheel';
import { StarCheer, StarsModal, TeamPodium, type Cheer } from './components/Stars';
import { BookCtx } from './components/QuestionSlide';
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
  /** الفرق التي خرج منها اسم في جولة العجلة الحالية */
  const [round, setRound] = useState<number[]>([]);
  /** العجلة تختار فريقًا، والفرق التي خرجت في جولتها */
  const [wheelMode, setWheelMode] = useState<WheelMode>('students');
  const [teamTurns, setTeamTurns] = useState<number[]>([]);
  /** وُزّعت نجوم الفرق في هذه الحصة */
  const [teamStarsDone, setTeamStarsDone] = useState(false);
  /** ترتيب الفرق ظاهر على الشاشة */
  const [teamPodium, setTeamPodium] = useState(false);
  const [teamFilter, setTeamFilter] = useState(-1);
  /** يخرج الاسم من العجلة بعد ظهوره (مع الفصل) */
  const [wheelRemove, setWheelRemove] = useState(true);
  /** الفرق وطلابها ظاهرة على الشاشة (من صفحة إعداد الحصة في الجوال) */
  const [teamsShown, setTeamsShown] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);
  const [groupsOpen, setGroupsOpen] = useState(false);
  const chooseKlass = (id: string) => {
    setKlassId(id);
    setPicked([]);
    setRound([]);
    setTeamFilter(-1);
    updateRoster((r) => setGrade(r, grade, (g) => ({ ...g, last: id })));
  };
  /* نجم الأسبوع: مشترك بين كل الدروس، لطلاب الفصل المختار */
  const { events: starEvents, add: addStarEvent, undo: undoStar, remove: removeStar, toggleAbsent } = useStars();
  const [starsOpen, setStarsOpen] = useState(false);
  const [starsReq, setStarsReq] = useState<{ n: number; a: 'podium' | 'next' }>({ n: 0, a: 'next' });
  const [cheer, setCheer] = useState<Cheer | null>(null);
  const endCheer = useCallback(() => setCheer(null), []);
  /** نهاية الحصة: كل طالب حاضر في الفريق الأول نجوم بعدد الفرق، والذي بعده أقل بنجمة، والمتعادلون سواء */
  const giveTeamStars = () => {
    if (!klass || st.nTeams < 2 || teamStarsDone) return;
    const per = teamStarCounts(st.scores.slice(0, st.nTeams));
    for (const s of klass.students) {
      const t = klass.team[s];
      if (!(s in klass.team) || t >= st.nTeams || absentToday(starEvents, klass.id, s)) continue;
      for (let i = 0; i < per[t]; i++) addStarEvent(klass.id, s, 1);
    }
    setTeamStarsDone(true);
    setTeamPodium(true);
  };
  const closeTeamPodium = useCallback(() => setTeamPodium(false), []);
  const giveStar = (name: string, d: 1 | -1) => {
    if (!klass?.students.includes(name)) return;
    addStarEvent(klass.id, name, d);
    setCheer((c) => ({ name, d, n: (c?.n ?? 0) + 1 }));
    if (d > 0) sStar();
    else sBad();
  };
  const [pen, setPen] = useState(false);
  const [layout, setLayout] = useState({ flow: false, scale: 1 });
  /** عدد مرات إعادة كل شريحة؛ تغيّره يعيد تركيب الشريحة فتعود كل حالتها (الخطوات، الإجابات، السحب، الكتابة) */
  const [resets, setResets] = useState<Record<number, number>>({});
  /** عدد مرات إعادة الدرس كاملًا؛ يدخل في مفتاح كل شريحة وفي مفتاح القلم */
  const [lessonGen, setLessonGen] = useState(0);
  /** قائمة الإعادة: مغلقة، أو مفتوحة، أو تنتظر تأكيد إعادة الدرس كاملًا */
  const [resetMenu, setResetMenu] = useState<'closed' | 'open' | 'confirm'>('closed');
  /** المسرح: قائمة الأدوات في التصميم الجديد تُرسم داخله حتى تكبر وتصغر معه */
  const stageRef = useRef<HTMLDivElement>(null);
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
  /** التصميم الجديد يعرض خطوات الشريحة في شريط التقدّم، فيحتاج التحديث دائمًا */
  const v2 = lesson.meta.design === 'v2';
  const slideChanged = useCallback(() => {
    if (remoteLive.current || v2) setSlideTick((t) => t + 1);
  }, [v2]);
  const linkRef = useRef<ReturnType<typeof hostLink> | null>(null);
  const onCmdRef = useRef<(c: RemoteCmd) => void>(() => {});

  const slides: SlideDef[] = useMemo(() => [{ sec: 'start', min: 1, notes: HOME_NOTES, content: null }, ...lesson.slides], [lesson]);
  // خطة الحصة (٤٥ دقيقة) تُرسل إلى الجوال: وقت كل شريحة
  const plan = useMemo(() => planMins(slides.map((x) => x.min), lesson.meta.minutes ?? 45), [slides, lesson]);
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

  /* التصميم الجديد: خطوات العمل بخط ٤٠، وتصغر حتى ٣٥ في الشريحة التي لا تتسع لها كل خطواتها ظاهرةً (فلا يتحرك شيء عند إظهارها) */
  useLayoutEffect(() => {
    if (!v2 || layout.flow) return;
    const s = mainRef.current?.querySelector<HTMLElement>('.slide.active');
    if (!s || !s.querySelector('.step.sstep')) return;
    const over = () => s.scrollHeight > s.clientHeight + 1 || s.scrollWidth > s.clientWidth + 1;
    s.classList.add('fitprobe');
    let px = 40;
    s.style.setProperty('--sfs', px + 'px');
    while (over() && px > 35) s.style.setProperty('--sfs', --px + 'px');
    s.classList.remove('fitprobe');
  }, [cur, v2, layout.flow]);

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
        setTeamsShown(false);
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
        if (c.team < 0 || c.team >= st.nTeams) break;
        if (c.d > 0) {
          // نقطة من الجوال: إعلان على الشاشة كالنجمة، باسم الفريق ولونه
          patch((s) => ({ scores: s.scores.map((v, j) => (j === c.team ? v + 1 : v)) }));
          setCheer((x) => ({ name: st.names[c.team], d: 1, n: (x?.n ?? 0) + 1, msg: 'نقطة', color: (v2 ? V2_TEAM_COLORS : TEAM_COLORS)[c.team] }));
          sStar();
        } else addScore(c.team, -1);
        break;
      case 'wheel':
        setWheelOpen(c.open);
        break;
      case 'klass':
        if (c.id === '' || classes.some((k) => k.id === c.id)) chooseKlass(c.id);
        break;
      case 'wheelRestore':
        setPicked([]);
        setRound([]);
        setTeamTurns([]);
        break;
      case 'stars':
        setStarsOpen(c.open);
        break;
      case 'star':
        giveStar(c.s, c.d > 0 ? 1 : -1);
        break;
      case 'podium':
        if (c.a === 'open') setStarsOpen(true);
        setStarsReq((r) => ({ n: r.n + 1, a: c.a === 'open' ? 'podium' : 'next' }));
        break;
      case 'starUndo':
        if (klass) undoStar(klass.id);
        break;
      case 'teamStars':
        giveTeamStars();
        break;
      case 'teamPodium':
        setTeamPodium(c.open && st.nTeams > 1);
        break;
      case 'absent':
        if (klass?.students.includes(c.s)) toggleAbsent(klass.id, c.s);
        break;
      case 'starRemove':
        if (klass?.students.includes(c.s)) removeStar(klass.id, c.s, c.d > 0 ? 1 : -1);
        break;
      case 'wheelReturn':
        setPicked((p) => p.filter((n) => n !== c.s));
        break;
      case 'wheelRemove':
        setWheelRemove(!!c.on);
        break;
      case 'wheelMode':
        if (c.m === 'team' || c.m === 'students' || c.m === 'none') setWheelMode(c.m);
        setTeamFilter(-1);
        setTeamTurns([]);
        break;
      case 'wheelTeam':
        if (c.t >= -1 && c.t < st.nTeams) setTeamFilter(c.t);
        break;
      case 'teamsN':
        if (c.n >= 0 && c.n <= 4) {
          patch({ nTeams: Math.round(c.n) });
          setTeamTurns([]);
        }
        break;
      case 'teamName':
        if (c.i >= 0 && c.i < 4 && typeof c.name === 'string') patch((x) => ({ names: x.names.map((n, i) => (i === c.i ? c.name.trim().slice(0, 24) || n : n)) }));
        break;
      case 'teamsShuffle':
        if (klass && st.nTeams > 0) updateRoster((r) => setClass(r, grade, klass.id, (k) => ({ ...k, team: shuffleTeams(k.students, st.nTeams) })));
        break;
      case 'teamMove':
        if (klass?.students.includes(c.s) && c.team >= 0 && c.team < st.nTeams) updateRoster((r) => setClass(r, grade, klass.id, (k) => ({ ...k, team: { ...k.team, [c.s]: c.team } })));
        break;
      case 'teamsShow':
        setTeamsShown(!!c.open);
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
        } else if (c.a === 'add') {
          const d = Math.round(c.sec);
          if (Number.isFinite(d)) setTimer((x) => ({ ...x, show: true, left: Math.min(3600, Math.max(0, x.left + d)) }));
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
        min: plan[cur] ?? sl.min,
        steps: [info.shown, info.total],
        hasHint: !!active?.querySelector('.btn.hint, .hintbox'),
        teams: Array.from({ length: st.nTeams }, (_, i) => ({ name: st.names[i], score: st.scores[i], color: (v2 ? V2_TEAM_COLORS : TEAM_COLORS)[i] })),
        sections: sections.map((o) => ({ name: SECTION_NAMES[o.k], first: o.first })),
        wheel: wheelOpen,
        wheelResult,
        klasses: classes.map((k) => ({ id: k.id, name: k.name })),
        klass: klass?.id ?? '',
        wheelPicked: picked.length,
        stars: klass
          ? { open: starsOpen, list: tally(starEvents, klass.id, klass.students, weekStart(Date.now())).map((r) => [r.name, r.stars, r.mistakes, r.absences, absentToday(starEvents, klass.id, r.name) ? 1 : 0] as [string, number, number, number, number]) }
          : null,
        chart: slideApis.current[cur]?.chart()?.get() ?? null,
        family: slideApis.current[cur]?.family()?.get() ?? null,
        widget: slideApis.current[cur]?.widget()?.get() ?? null,
        mcqs: (slideApis.current[cur]?.mcqs() ?? []).map((m) => m.get()),
        timer: { show: timerNow.current.show, run: timerNow.current.run, left: timerNow.current.left, view: st.timerView },
        upNext: upNextText(active),
        mins: plan,
        wheelOut: picked,
        wheelRemove,
        wheelTeam: teamFilter,
        wheelRound: round,
        wheelMode,
        wheelTeamTurns: teamTurns,
        v2,
        teamsShown,
        teamStarsDone,
        teamPodium,
      };
      if (klass && state.stars) state.teamOf = state.stars.list.map(([n]) => (n in klass.team && klass.team[n] < st.nTeams ? klass.team[n] : -1));
      state.slides = slideTitles(mainRef.current, slides.length).map((t, i) => [t, sections.findIndex((o) => i >= o.first && i <= o.last)] as [string, number]);
      // خادم الرسائل يقبل ٤ ك.ب للرسالة: تُقصَّر الملاحظات إن لزم
      const size = () => new Blob([JSON.stringify({ state })]).size;
      if (size() > 3800) delete state.slides;
      while (size() > 3800 && state.notes.length > 40) state.notes = state.notes.slice(0, Math.floor(state.notes.length * 0.7)) + '…';
      linkRef.current?.send(state);
      // عبر الخادم (بلا اتصال مباشر) تُجمَّع التحديثات أكثر حفاظًا على حصة الرسائل
    }, direct ? 40 : 1500);
    return () => clearTimeout(t);
  }, [remoteOn, phoneSeen, direct, cur, slideTick, timer.show, timer.run, timer.gen, timer.left, st.scores, st.names, st.nTeams, st.timerView, plan, wheelOpen, wheelResult, slides, sections, lesson, classes, klass, picked, round, wheelMode, teamTurns, starsOpen, starEvents, wheelRemove, teamFilter, teamsShown, teamStarsDone, teamPodium]);

  const enableRemote = (on: boolean) => {
    setRemoteEnabled(on);
    setRemoteOn(on);
  };

  /* لوحة المفاتيح: في RTL السهم الأيسر للتالي والأيمن للسابق */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tg = (e.target as HTMLElement).tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA') return;
      // قائمة الأدوات أو نافذة التأكيد مفتوحة: الأسهم والمفاتيح لها
      if ((e.target as HTMLElement).closest?.('[role="menu"], [role="alertdialog"]')) return;
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
      if (starsOpen) {
        if (e.key === 'Escape') setStarsOpen(false);
        return;
      }
      // التصميم الجديد: السهمان يمشيان في الخطوات ثم ينتقلان إلى الشريحة المجاورة (كزر «التالي» في الجوال وجهاز العرض)،
      // و⌘ أو Ctrl مع السهم (أو Page Up/Down) ينقل شريحة كاملة
      const whole = !v2 || e.metaKey || e.ctrlKey;
      if (e.key === 'ArrowLeft' || e.key === 'PageDown') {
        e.preventDefault();
        if (e.key === 'PageDown' || whole || !slideApis.current[cur]?.reveal()) goto(cur + 1);
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        e.preventDefault();
        if (e.key === 'PageUp' || whole || !slideApis.current[cur]?.unreveal()) goto(cur - 1);
      } else if (e.code === 'Space') {
        e.preventDefault();
        (document.activeElement as HTMLElement | null)?.blur?.();
        // Shift مع المسافة: كل خطوات الشريحة دفعة واحدة
        if (e.shiftKey) while (slideApis.current[cur]?.reveal());
        else slideApis.current[cur]?.reveal();
      } else if (e.code === 'KeyH') {
        e.preventDefault();
        slideApis.current[cur]?.toggleHint();
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
  }, [cur, wheelOpen, starsOpen, classesOpen, groupsOpen, resetMenu, remotePanel, goto, resetSlide, v2]);

  const s = slides[cur];
  const m = lesson.meta;
  const toolBtn = (on: boolean) => 'ib' + (on ? ' on' : '');
  const toolsEl = (
    <div className="tools">
    {v2 && (
      <button className="ib" title="قائمة الدروس" aria-label="الصفحة الرئيسية: قائمة الدروس" onClick={goHome}>
        <IconHome />
        <span className="lbl">الرئيسية</span>
      </button>
    )}
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
      <button className={toolBtn(starsOpen)} title="نجم الأسبوع" aria-label="نجم الأسبوع" onClick={() => setStarsOpen(true)}>
        <IconStar />
        <span className="lbl">النجوم</span>
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
  );

  return (
    <EngineCtx.Provider value={engine}>
      <V2Ctx.Provider value={v2}>
      <BookCtx.Provider value={m.id.startsWith('g2-')}>
      <div id="app" ref={appRef} data-lesson={m.id} data-design={m.design} data-book-questions={m.bookQuestions}>
        <div id="stage" ref={stageRef} style={layout.flow ? undefined : { transform: `translate(-50%, -50%) scale(${layout.scale})` }}>
          <header id="hdr" className={v2 ? 'v2' : undefined}>
            {v2 ? (
              <V2Header
                sec={s.sec}
                title={m.shortTitle}
                teams={Array.from({ length: st.nTeams }, (_, i) => ({ name: st.names[i], score: st.scores[i], color: V2_TEAM_COLORS[i] }))}
                onScore={(i) => addScore(i, 1)}
                phone={remoteOn ? (online && phoneSeen ? 'on' : 'off') : null}
                timer={<TimerPill t={timer} set={setTimer} />}
                menu={{
                  home: goHome,
                  fullscreen,
                  pen,
                  togglePen: () => setPen(!pen),
                  timer: timer.show,
                  toggleTimer: () => setTimer((x) => (x.show ? { ...x, show: false, run: false } : { ...x, show: true, run: false, left: 60 })),
                  wheel: () => setWheelOpen(true),
                  stars: () => setStarsOpen(true),
                  muted: st.muted,
                  toggleMute: () => patch({ muted: !st.muted }),
                  phone: remoteOn,
                  openPhone: () => setRemotePanel(true),
                  resetSlide,
                  resetLesson,
                  container: stageRef,
                }}
              />
            ) : (
            <>
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
            {toolsEl}
            </>
            )}
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
            {!v2 && <TimerWidget t={timer} set={setTimer} view={st.timerView} onView={(v) => patch({ timerView: fixView(v) })} />}
          </main>


          {v2 ? (
            <V2Progress sections={sections} cur={cur} steps={slideApis.current[cur]?.info() ?? { shown: 0, total: 0 }} goto={goto} />
          ) : (
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
          )}

          <WheelModal open={wheelOpen} onClose={() => setWheelOpen(false)} names={st.wheel} onNames={(w) => patch({ wheel: w })} spinReq={spinReq}
            onResult={setWheelResult}
            klass={klass}
            nTeams={wheelMode === 'none' ? 0 : st.nTeams}
            teamFilter={teamFilter}
            picked={picked}
            onPick={(n) => setPicked((p) => (p.includes(n) ? p : [...p, n]))}
            onRestore={() => {
              setPicked([]);
              setRound([]);
            }}
            round={round}
            onRound={setRound}
            teamNames={wheelMode === 'team' && st.nTeams > 1 ? st.names.slice(0, st.nTeams) : undefined}
            teamTurns={teamTurns}
            onTeamTurns={setTeamTurns}
            remove={wheelRemove}
            autoClose={2500}
            absent={klass ? klass.students.filter((n) => absentToday(starEvents, klass.id, n)) : []}
          />
          {teamsShown && klass && st.nTeams > 0 && <TeamsBoard klass={klass} names={st.names.slice(0, st.nTeams)} colors={v2 ? V2_TEAM_COLORS : TEAM_COLORS} onClose={() => setTeamsShown(false)} />}
          <StarsModal
            open={starsOpen}
            onClose={() => setStarsOpen(false)}
            klass={klass}
            events={starEvents}
            onStar={giveStar}
            onUndo={() => klass && undoStar(klass.id)}
            req={starsReq}
            onManage={() => setClassesOpen(true)}
          />
          <StarCheer cheer={cheer} klass={klass} onDone={endCheer} />
          {teamPodium && !cheer && st.nTeams > 1 && (
            <TeamPodium
              teams={(() => {
                const per = teamStarCounts(st.scores.slice(0, st.nTeams));
                return Array.from({ length: st.nTeams }, (_, i) => ({ name: st.names[i], score: st.scores[i], color: (v2 ? V2_TEAM_COLORS : TEAM_COLORS)[i], stars: per[i] }));
              })()}
              onClose={closeTeamPodium}
            />
          )}
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
      </BookCtx.Provider>
      </V2Ctx.Provider>
    </EngineCtx.Provider>
  );
}

/** نص الخطوة التالية في الشريحة كما سيظهر، للجوال */
function upNextText(active: Element | null | undefined): string | undefined {
  const step = active?.querySelector('.step:not(.shown)');
  if (!step) return undefined;
  const clean = (t?: string | null) => (t ?? '').replace(/\s+/g, ' ').trim();
  const label = clean(step.closest('.aslotrow')?.querySelector('.alabel')?.textContent);
  const text = clean(step.classList.contains('aslot') ? step.querySelector('.aval')?.textContent : step.textContent);
  const t = (step.classList.contains('ans') ? (label || 'الإجابة') + ': ' : '') + text;
  return t.length > 70 ? t.slice(0, 68) + '…' : t || undefined;
}

/** عنوان كل شريحة كما يظهر فيها، لقائمة الشرائح في الجوال */
/**
 * خطة الحصة: دقائق كل شريحة بحيث يكون مجموعها مدة الحصة (٤٥ دقيقة).
 * لكل شريحة دقيقة على الأقل، والباقي يُوزَّع بنسبة الدقائق المقترحة في الدرس.
 */
export function planMins(raw: number[], total: number): number[] {
  const out = raw.map(() => 0);
  const idx = raw.map((_, i) => i);
  if (!idx.length) return out;
  idx.forEach((i) => (out[i] = 1));
  const extra = total - idx.length;
  if (extra <= 0) return out;
  const w = idx.reduce((a, i) => a + Math.max(0, raw[i]), 0) || idx.length;
  const share = idx.map((i) => ((raw[i] > 0 ? raw[i] : w / idx.length) / w) * extra);
  const floor = share.map(Math.floor);
  let left = extra - floor.reduce((a, b) => a + b, 0);
  // الكسور الأكبر تأخذ الدقائق الباقية
  const order = share.map((v, k) => [v - floor[k], k] as const).sort((a, b) => b[0] - a[0]);
  for (const [, k] of order) {
    if (left <= 0) break;
    floor[k]++;
    left--;
  }
  idx.forEach((i, k) => (out[i] += floor[k]));
  return out;
}

function slideTitles(main: Element | null, n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    if (i === 0) return 'البداية';
    const el = main?.querySelector(`section.slide[data-index="${i}"]`);
    const t = (el?.querySelector('h2, .qhead, .v2qh')?.textContent ?? '').replace(/\s+/g, ' ').trim();
    return t.length > 32 ? t.slice(0, 30) + '…' : t;
  });
}

/** الفرق وطلابها على الشاشة: عمود لكل فريق بلونه */
function TeamsBoard({ klass, names, colors, onClose }: { klass: Klass; names: string[]; colors: string[]; onClose: () => void }) {
  return (
    <div className="teamsboard" role="dialog" aria-label="فرق اليوم" onClick={onClose}>
      <div className="tbin">
        <h2>
          فرق اليوم <small>{klass.name}</small>
        </h2>
        <div className="tbcols" style={{ gridTemplateColumns: `repeat(${names.length}, 1fr)` }}>
          {names.map((n, i) => (
            <div key={i} className="tbcol" style={{ '--tc': colors[i] } as React.CSSProperties}>
              <b>{n}</b>
              {klass.students
                .filter((s) => klass.team[s] === i)
                .map((s) => (
                  <span key={s}>{s}</span>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
