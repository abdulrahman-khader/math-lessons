import { digits, num } from '../digits';
import { SECTION_NAMES, TEAM_COLORS } from '../sections';
import type { Klass } from '../classes';
import type { Lesson, SectionKey } from '../types';
import { Card, Tag } from './Layout';

interface Props {
  lesson: Lesson;
  sections: { k: SectionKey; first: number }[];
  goto: (i: number) => void;
  resumeFrom: number;
  nTeams: number;
  names: string[];
  setTeams: (n: number) => void;
  setName: (i: number, name: string) => void;
  resetScores: () => void;
  /** فصول صف هذا الدرس، والفصل المختار لهذه الحصة */
  classes: Klass[];
  klass: Klass | undefined;
  setKlass: (id: string) => void;
  onManage: () => void;
  onGroups: () => void;
}

/** الصفحة الرئيسية لكل درس: العنوان، إعداد الفرق، فهرس الأقسام، والمتابعة من آخر شريحة. */
export function Home({ lesson, sections, goto, resumeFrom, nTeams, names, setTeams, setName, resetScores, classes, klass, setKlass, onManage, onGroups }: Props) {
  const placed = klass ? klass.students.filter((s) => (klass.team[s] ?? 99) < nTeams).length : 0;
  const m = lesson.meta;
  return (
    <div className="home">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.45em' }}>
        <span style={{ alignSelf: 'flex-start' }}>
          <Tag kind="ink">{m.chapter}</Tag>
        </span>
        <div>
          <span className="num">{m.code}</span>
          <h1>{m.title}</h1>
        </div>
        <p className="lead">
          {m.subject} · {m.grade} · {m.source} · {num(m.minutes)} دقيقة
        </p>
        <Card kind="rule" cap="فكرة الدرس">
          {m.idea}
        </Card>
        <div className="teamset">
          <div className="row">
            <b>الفصل:</b>
            {classes.map((c) => (
              <button key={c.id} className={'btn' + (klass?.id === c.id ? ' sel' : '')} onClick={() => setKlass(c.id)}>
                {c.name}
              </button>
            ))}
            {classes.length > 0 && (
              <button className={'btn' + (!klass ? ' sel' : '')} onClick={() => setKlass('')}>
                بدون
              </button>
            )}
            <button className="btn hide" onClick={onManage}>
              {classes.length ? 'تعديل الفصول' : 'أضف فصولك وأسماء الطلاب'}
            </button>
          </div>
          <div className="row">
            <b>عدد الفرق:</b>
            {[0, 2, 3, 4].map((n) => (
              <button key={n} className={'btn' + (nTeams === n ? ' sel' : '')} onClick={() => setTeams(n)}>
                {n === 0 ? 'بدون' : num(n)}
              </button>
            ))}
            {nTeams > 0 && klass && klass.students.length > 0 && (
              <button className="btn" onClick={onGroups}>
                توزيع الطلاب ({num(placed)}/{num(klass.students.length)})
              </button>
            )}
            {nTeams > 0 && (
              <button className="btn hide" onClick={resetScores}>
                تصفير النقاط
              </button>
            )}
          </div>
          <div className="row">
            {names.slice(0, nTeams).map((n, i) => (
              <input
                key={i}
                value={n}
                style={{ borderColor: TEAM_COLORS[i] }}
                aria-label={'اسم الفريق ' + digits(i + 1)}
                onChange={(e) => setName(i, e.target.value || 'فريق ' + digits(i + 1))}
              />
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.4em' }}>
        <h3>فهرس الحصة</h3>
        <div className="tiles">
          {sections
            .filter((s) => s.k !== 'start')
            .map((s) => (
              <button key={s.k} className="tile" onClick={() => goto(s.first)}>
                {SECTION_NAMES[s.k]}
                <small>{lesson.sectionDesc[s.k] ?? ''}</small>
              </button>
            ))}
        </div>
        {resumeFrom > 0 && (
          <button className="btn primary" onClick={() => goto(resumeFrom)}>
            متابعة من الشريحة {num(resumeFrom + 1)}
          </button>
        )}
      </div>
    </div>
  );
}
