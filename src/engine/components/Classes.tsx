import { useEffect, useState } from 'react';
import { num } from '../digits';
import { GRADES, classesOf, gradeName, newClass, parseNames, setClass, setGrade, shuffleTeams, type Klass, type Roster } from '../classes';
import { TEAM_COLORS } from '../sections';

interface ClassesProps {
  open: boolean;
  onClose: () => void;
  /** صف الدرس الحالي: يُفتح عليه أولًا */
  grade: string;
  roster: Roster;
  update: (f: (r: Roster) => Roster) => void;
}

/** إدارة الفصول: عدد فصول كل صف، واسم كل فصل، وأسماء طلابه (اسم في كل سطر). */
export function ClassesModal({ open, onClose, grade, roster, update }: ClassesProps) {
  const [g, setG] = useState(grade);
  const classes = classesOf(roster, g);
  const [sel, setSel] = useState<string>('');
  const k = classes.find((c) => c.id === sel) ?? classes[0];
  /** نص الأسماء كما يُكتب؛ يُحفظ مفكوكًا إلى أسماء، ويبقى النص نفسه حتى يكتب المعلم سطرًا جديدًا فارغًا */
  const [text, setText] = useState('');
  useEffect(() => setText(k ? k.students.join('\n') : ''), [k?.id, open]);
  useEffect(() => {
    if (open) setG(grade);
  }, [open, grade]);

  if (!open) return null;
  const grades = GRADES.some((x) => x.k === grade) ? GRADES : [...GRADES, { k: grade, name: gradeName(grade) }];

  const setCount = (n: number) => {
    if (n < 0 || n > 8) return;
    if (n < classes.length) {
      const last = classes[classes.length - 1];
      if (last.students.length && !window.confirm(`سيُحذف «${last.name}» وأسماء طلابه (${num(last.students.length)}). متأكد؟`)) return;
    }
    update((r) =>
      setGrade(r, g, (x) => ({
        ...x,
        classes: n > x.classes.length ? [...x.classes, ...Array.from({ length: n - x.classes.length }, (_, i) => newClass(x.classes.length + i))] : x.classes.slice(0, n),
      })),
    );
  };

  const saveNames = (t: string) => {
    setText(t);
    if (!k) return;
    const students = parseNames(t);
    update((r) => setClass(r, g, k.id, (c) => ({ ...c, students, team: Object.fromEntries(Object.entries(c.team).filter(([s]) => students.includes(s))) })));
  };

  return (
    <div className="modal show" role="dialog" aria-label="فصول الطلاب" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mbox cbox">
        <div className="crow">
          <h3>فصول الطلاب</h3>
          <span className="sp" />
          {grades.map((x) => (
            <button key={x.k} className={'btn' + (x.k === g ? ' sel' : '')} onClick={() => setG(x.k)}>
              {x.name}
            </button>
          ))}
        </div>
        <div className="crow">
          <b>عدد فصول {gradeName(g)}:</b>
          <button className="btn" aria-label="إنقاص فصل" disabled={!classes.length} onClick={() => setCount(classes.length - 1)}>
            −
          </button>
          <b className="ccount">{num(classes.length)}</b>
          <button className="btn" aria-label="إضافة فصل" disabled={classes.length >= 8} onClick={() => setCount(classes.length + 1)}>
            +
          </button>
        </div>
        {k ? (
          <>
            <div className="crow">
              {classes.map((c) => (
                <button key={c.id} className={'btn' + (c.id === k.id ? ' sel' : '')} onClick={() => setSel(c.id)}>
                  {c.name} <small>({num(c.students.length)})</small>
                </button>
              ))}
            </div>
            <label className="crow">
              <b>اسم الفصل:</b>
              <input className="cname" value={k.name} onChange={(e) => update((r) => setClass(r, g, k.id, (c) => ({ ...c, name: e.target.value })))} />
            </label>
            <label htmlFor="cnames">
              <b>أسماء الطلاب</b> (اسم في كل سطر، ويمكن لصق القائمة كاملة) · {num(k.students.length)} طالبًا
            </label>
            <textarea id="cnames" value={text} onChange={(e) => saveNames(e.target.value)} />
          </>
        ) : (
          <p className="cempty">اضغط + لإضافة فصل.</p>
        )}
        <p className="cnote">تُحفظ الفصول في هذا الجهاز، وتظهر في كل الدروس.</p>
        <button className="btn primary" onClick={onClose}>
          تم
        </button>
      </div>
    </div>
  );
}

interface GroupsProps {
  open: boolean;
  onClose: () => void;
  klass: Klass | undefined;
  nTeams: number;
  teamNames: string[];
  setTeams: (team: Record<string, number>) => void;
}

/** توزيع طلاب الفصل على الفرق: الضغط على اسم ينقله إلى العمود التالي، أو توزيع عشوائي متوازن. */
export function GroupsModal({ open, onClose, klass, nTeams, teamNames, setTeams }: GroupsProps) {
  if (!open || !klass) return null;
  const teamOf = (s: string) => {
    const t = klass.team[s];
    return t !== undefined && t < nTeams ? t : -1;
  };
  const move = (s: string) => {
    const t = teamOf(s) + 1;
    const next = { ...klass.team };
    if (t >= nTeams) delete next[s];
    else next[s] = t;
    setTeams(next);
  };
  const cols = [-1, ...Array.from({ length: nTeams }, (_, i) => i)];
  const free = klass.students.filter((s) => teamOf(s) < 0).length;
  return (
    <div className="modal show" role="dialog" aria-label="توزيع الطلاب على الفرق" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mbox gbox">
        <div className="crow">
          <h3>فرق {klass.name}</h3>
          <span className="sp" />
          <button className="btn" onClick={() => setTeams(shuffleTeams(klass.students, nTeams))}>
            وزّع عشوائيًا
          </button>
          <button className="btn hide" onClick={() => setTeams({})}>
            مسح التوزيع
          </button>
        </div>
        <p className="cnote">اضغط اسم الطالب لينتقل إلى الفريق التالي.</p>
        <div className="gcols" style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}>
          {cols.map((t) => (
            <div key={t} className="gcol" style={t >= 0 ? { borderColor: TEAM_COLORS[t] } : undefined}>
              <b style={t >= 0 ? { color: TEAM_COLORS[t] } : undefined}>
                {t < 0 ? `بلا فريق (${num(free)})` : `${teamNames[t]} (${num(klass.students.filter((s) => teamOf(s) === t).length)})`}
              </b>
              {klass.students
                .filter((s) => teamOf(s) === t)
                .map((s) => (
                  <button key={s} className="gname" style={t >= 0 ? { borderColor: TEAM_COLORS[t] } : undefined} onClick={() => move(s)}>
                    {s}
                  </button>
                ))}
            </div>
          ))}
        </div>
        <button className="btn primary" onClick={onClose}>
          تم
        </button>
      </div>
    </div>
  );
}
