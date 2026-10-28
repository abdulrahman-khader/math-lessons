import { useCallback, useEffect, useState } from 'react';
import { classesOf, GRADES, setGrade, useRoster } from './classes';
import { ClassesModal } from './components/Classes';
import { IconFull, IconHome, IconStar, IconWheel } from './components/icons';
import { StarCheer, StarsModal, type Cheer } from './components/Stars';
import { WheelModal } from './components/Wheel';
import { sBad, sGood } from './sound';
import { useStars } from './stars';

const GRADE_KEY = 'stars:grade';

function readGrade() {
  try {
    const g = localStorage.getItem(GRADE_KEY);
    if (g && GRADES.some((x) => x.k === g)) return g;
  } catch {
    /* التخزين غير متاح */
  }
  return GRADES[GRADES.length - 1].k;
}

/**
 * صفحة نجم الأسبوع من قائمة الدروس، دون فتح درس: الصف والفصل، ولوحة النجوم، والعجلة، وتعديل الفصول.
 * النجوم والفصول هي نفسها التي في الدروس (التخزين واحد للموقع كله).
 */
export function StarsApp() {
  const [grade, setGradeK] = useState(readGrade);
  const { roster, update } = useRoster();
  const classes = classesOf(roster, grade);
  const lastId = roster.grades[grade]?.last ?? '';
  const klass = classes.find((c) => c.id === lastId) ?? (classes.length === 1 ? classes[0] : undefined);
  const { events, add, undo } = useStars();
  const [cheer, setCheer] = useState<Cheer | null>(null);
  const endCheer = useCallback(() => setCheer(null), []);
  const [starsOpen, setStarsOpen] = useState(true);
  const [wheelOpen, setWheelOpen] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [names, setNames] = useState('');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1600, window.innerHeight / 900));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  useEffect(() => {
    document.title = 'نجم الأسبوع';
  }, []);

  const chooseGrade = (g: string) => {
    setGradeK(g);
    setPicked([]);
    try {
      localStorage.setItem(GRADE_KEY, g);
    } catch {
      /* تجاهل */
    }
  };
  const chooseKlass = (id: string) => {
    setPicked([]);
    update((r) => setGrade(r, grade, (g) => ({ ...g, last: id })));
  };
  const giveStar = (name: string, d: 1 | -1) => {
    if (!klass?.students.includes(name)) return;
    add(klass.id, name, d);
    setCheer((c) => ({ name, d, n: (c?.n ?? 0) + 1 }));
    if (d > 0) sGood();
    else sBad();
  };
  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  };

  return (
    <div id="app" data-page="stars">
      <div id="stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <header id="hdr">
          <a className="ib" href="./" aria-label="قائمة الدروس">
            <IconHome />
            <span className="lbl">الدروس</span>
          </a>
          <div className="ttl">
            <b>نجم الأسبوع</b>
            <span>النجوم نفسها التي في الدروس</span>
          </div>
          <span className="sp" />
          <div className="tools">
            <button className={'ib' + (starsOpen ? ' on' : '')} onClick={() => setStarsOpen(true)}>
              <IconStar />
              <span className="lbl">النجوم</span>
            </button>
            <button className={'ib' + (wheelOpen ? ' on' : '')} onClick={() => setWheelOpen(true)}>
              <IconWheel />
              <span className="lbl">العجلة</span>
            </button>
            <button className="ib" onClick={fullscreen}>
              <IconFull />
              <span className="lbl">ملء الشاشة</span>
            </button>
          </div>
        </header>
        <div className="spick">
          <b>الصف:</b>
          {GRADES.map((g) => (
            <button key={g.k} className={'btn' + (g.k === grade ? ' sel' : '')} onClick={() => chooseGrade(g.k)}>
              {g.name}
            </button>
          ))}
          <b className="sgap">الفصل:</b>
          {classes.map((c) => (
            <button key={c.id} className={'btn' + (klass?.id === c.id ? ' sel' : '')} onClick={() => chooseKlass(c.id)}>
              {c.name}
            </button>
          ))}
          <button className="btn hide" onClick={() => setClassesOpen(true)}>
            {classes.length ? 'تعديل الفصول' : 'أضف فصولك وأسماء الطلاب'}
          </button>
        </div>
        <main id="main">
          {!starsOpen && !wheelOpen && (
            <div className="sidle">
              <button className="btn primary" onClick={() => setStarsOpen(true)}>
                <IconStar /> افتح نجم الأسبوع
              </button>
            </div>
          )}
          <StarsModal
            open={starsOpen}
            onClose={() => setStarsOpen(false)}
            klass={klass}
            events={events}
            onStar={giveStar}
            onUndo={() => klass && undo(klass.id)}
            onManage={() => setClassesOpen(true)}
            noKlass="اختر الصف والفصل من الأعلى، فتظهر بطاقات طلابه هنا."
          />
          <WheelModal
            open={wheelOpen}
            onClose={() => setWheelOpen(false)}
            names={names}
            onNames={setNames}
            klass={klass}
            picked={picked}
            onPick={(n) => setPicked((p) => [...p, n])}
            onRestore={() => setPicked([])}
            onManage={() => setClassesOpen(true)}
            onStar={giveStar}
          />
          <StarCheer cheer={cheer} klass={klass} onDone={endCheer} />
          <ClassesModal open={classesOpen} onClose={() => setClassesOpen(false)} grade={grade} roster={roster} update={update} />
        </main>
      </div>
    </div>
  );
}
