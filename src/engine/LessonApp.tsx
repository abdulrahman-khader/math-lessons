import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { EngineCtx, SlideScope, type EngineApi, type SlideApi } from './context';
import { num } from './digits';
import { SECTION_NAMES, TEAM_COLORS } from './sections';
import { setMuted, sGood } from './sound';
import { useSaved } from './store';
import type { Lesson, SectionKey, SlideDef } from './types';
import { Home } from './components/Home';
import { Pen } from './components/Pen';
import { TIMER_OFF, TimerWidget, type TimerState } from './components/Timer';
import { WheelModal } from './components/Wheel';
import { IconFull, IconHome, IconNextRtl, IconPen, IconPrevRtl, IconSound, IconStar, IconTeacher, IconTimer, IconWheel } from './components/icons';

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
  const [pen, setPen] = useState(false);
  const [layout, setLayout] = useState({ flow: false, scale: 1 });
  const appRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const slideApis = useRef<(SlideApi | null)[]>([]);

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
    document.body.classList.toggle('teacher', st.teacher);
  }, [st.teacher]);
  useEffect(() => {
    document.body.classList.toggle('flow', layout.flow);
  }, [layout.flow]);
  useEffect(() => {
    const s = mainRef.current?.querySelector<HTMLElement>('.slide.active');
    if (s) s.scrollTop = 0;
  }, [cur]);

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
  }, [st.teacher]);

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

  const engine = useMemo<EngineApi>(
    () => ({ nTeams: st.nTeams, teamNames: st.names, scores: st.scores, addScore, startTimer, goto, registerSlide }),
    [st.nTeams, st.names, st.scores, addScore, startTimer, goto, registerSlide],
  );

  /* لوحة المفاتيح: في RTL السهم الأيسر للتالي والأيمن للسابق */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tg = (e.target as HTMLElement).tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA') return;
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
      } else if (e.key === 'Home') goto(0);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [cur, wheelOpen, goto]);

  const s = slides[cur];
  const m = lesson.meta;
  const toolBtn = (on: boolean) => 'ib' + (on ? ' on' : '');

  return (
    <EngineCtx.Provider value={engine}>
      <div id="app" ref={appRef} data-lesson={m.id} data-book-questions={m.bookQuestions}>
        <div id="stage" style={layout.flow ? undefined : { transform: `scale(${layout.scale})` }}>
          <header id="hdr">
            <button className="ib" title="الصفحة الرئيسية" aria-label="الصفحة الرئيسية" onClick={() => goto(0)}>
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
              <button className={toolBtn(st.teacher)} title="وضع المعلم / الطالب" aria-label="وضع المعلم أو الطالب" onClick={() => patch({ teacher: !st.teacher })}>
                <IconTeacher />
                <span className="lbl">{st.teacher ? 'المعلم' : 'الطالب'}</span>
              </button>
              <button className={toolBtn(st.muted)} title={st.muted ? 'تشغيل الصوت' : 'كتم الصوت'} aria-label="كتم الصوت" onClick={() => patch({ muted: !st.muted })}>
                <IconSound muted={st.muted} />
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
                <SlideScope index={i}>
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
                    />
                  ) : (
                    sl.content
                  )}
                </SlideScope>
              </section>
            ))}
            <Pen active={pen} onClose={() => setPen(false)} slide={cur} layoutKey={`${layout.flow}-${layout.scale}-${st.teacher}`} main={mainRef} />
            <TimerWidget t={timer} set={setTimer} />
          </main>

          <div id="notes">
            <b>{num(s.min)} د</b>
            <span>{s.notes}</span>
          </div>

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

          <WheelModal open={wheelOpen} onClose={() => setWheelOpen(false)} names={st.wheel} onNames={(w) => patch({ wheel: w })} />
        </div>
      </div>
    </EngineCtx.Provider>
  );
}
