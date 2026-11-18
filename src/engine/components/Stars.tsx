import { useEffect, useRef, useState } from 'react';
import { digits, num } from '../digits';
import { gradeName, useRoster, type Klass } from '../classes';
import { backup, copyText, rankingText, isThursday, MAX_MISTAKES, lastEvent, pastWeeks, rankRows, restore, starCounts, tally, topRows, weekLabel, weekRows, weekStart, byName, type PickEvent, type StarEvent, type StarRow } from '../stars';
import { sPlace } from '../sound';
import { IconStar } from './icons';

interface Props {
  open: boolean;
  onClose: () => void;
  klass: Klass | undefined;
  events: StarEvent[];
  /** خروج الأسماء في العجلة، لسجل الطالب */
  picks?: PickEvent[];
  /** حذف ضغطة بعينها من السجل */
  onDrop?: (e: StarEvent) => void;
  onStar: (name: string, d: 1 | -1) => void;
  onUndo: () => void;
  onManage: () => void;
  /** ما يُقال حين لم يُختر فصل */
  noKlass?: string;
  /** أوامر الجوال: يزداد n مع كل أمر؛ podium يفتح منصة الأسبوع الماضي، وnext يُظهر المركز التالي */
  req?: { n: number; a: 'podium' | 'next' };
}

type Tab = 'week' | 'now' | 'podium' | 'archive' | 'log';

/** درجات المنصة من اليمين: الرابع، الثاني، الأول، الثالث، الخامس */

/**
 * نجم الأسبوع: بطاقة لكل طالب بنجومه وأغلاطه ومجموعه أمام الطلاب، وزرّا ⭐ و✖.
 * يوم الخميس تُفتح على منصة نجوم الأسبوع الذي انتهى أمس.
 */
export function StarsModal({ open, onClose, klass, events, picks = [], onDrop, onStar, onUndo, onManage, noKlass = 'اختر فصلًا في الصفحة الأولى من الدرس، فتظهر بطاقات طلابه هنا.', req }: Props) {
  const [tab, setTab] = useState<Tab>('week');
  /** آخر بطاقة تغيّرت، لوميضها: ذهبي للنجمة وأحمر للغلطة */
  const [flash, setFlash] = useState<{ name: string; d: 1 | -1; n: number } | null>(null);
  /** أسبوع مفتوح من السجل على منصته، أو −١ للسجل كله */
  const [arch, setArch] = useState(-1);
  /** الأعداد مخفية عند كل فتح، ولا تظهر للطلاب إلا إذا أظهرها المعلم */
  const [shown, setShown] = useState(false);
  /** «نُسخ» يظهر على زر النسخ لحظة */
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (open) {
      setTab(isThursday() ? 'podium' : 'week');
      setShown(false);
      setArch(-1);
    }
  }, [open]);
  /** يزداد مع كل «أظهر التالي» من الجوال، فتكشف المنصة المفتوحة مركزًا */
  const [nextReq, setNextReq] = useState(0);
  const lastReq = useRef(req?.n ?? 0);
  useEffect(() => {
    if (!req || req.n === lastReq.current) return;
    lastReq.current = req.n;
    if (req.a === 'podium') setTab('podium');
    else setNextReq((n) => n + 1);
  }, [req?.n]);
  const last = klass && lastEvent(events, klass.id);
  /** لا وميض لضغطة قديمة عند فتح الدرس؛ فقط لما يُضغط بعد ذلك */
  const seen = useRef(last?.t);
  useEffect(() => {
    if (!last || last.t === seen.current) return;
    seen.current = last.t;
    const d = last.d;
    if (d !== 0) setFlash((f) => ({ name: last.s, d, n: (f?.n ?? 0) + 1 }));
  }, [last?.t]);

  if (!open) return null;
  const now = Date.now();
  const cur = weekStart(now);
  const weeks = klass ? pastWeeks(events, klass.id, now) : [];
  const rows = klass ? tally(events, klass.id, klass.students, cur) : [];

  const give = (name: string, d: 1 | -1) => onStar(name, d);
  /** الأسبوع الذي تعرضه اللوحة الآن، لنسخ ترتيبه */
  const copyWeek = !klass ? null : tab === 'week' || tab === 'now' ? cur : tab === 'podium' ? weekStart(cur - 1) : tab === 'archive' && arch >= 0 && weeks[arch] != null ? weeks[arch] : null;
  const copyRanking = async () => {
    if (!klass || copyWeek == null) return;
    const rs = copyWeek === cur ? rows : weekRows(events, klass.id, klass.students, copyWeek);
    if (await copyText(rankingText(rs, `نجوم الأسبوع — ${klass.name} — ${weekLabel(copyWeek)}`))) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal show" role="dialog" aria-label="نجم الأسبوع" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mbox sbox">
        <div className="crow">
          <h3>
            <IconStar /> نجم الأسبوع{klass && <> — <bdi>{klass.name}</bdi></>}
          </h3>
          <span className="sp" />
          {klass && (
            <>
              <button className={'btn' + (tab === 'week' ? ' sel' : '')} onClick={() => setTab('week')}>
                هذا الأسبوع
              </button>
              <button className={'btn' + (tab === 'now' ? ' sel' : '')} onClick={() => setTab('now')}>
                الترتيب حتى الآن
              </button>
              <button className={'btn' + (tab === 'podium' ? ' sel' : '')} onClick={() => setTab('podium')}>
                نجوم الأسبوع الماضي
              </button>
              <button className={'btn' + (tab === 'archive' ? ' sel' : '')} onClick={() => setTab('archive')}>
                سجل الأسابيع
              </button>
              <button className={'btn' + (tab === 'log' ? ' sel' : '')} onClick={() => setTab('log')}>
                السجل اليومي
              </button>
              {tab === 'week' && (
                <button className={'btn sshow' + (shown ? ' sel' : '')} aria-pressed={shown} onClick={() => setShown((x) => !x)}>
                  {shown ? 'إخفاء النجوم' : 'إظهار النجوم'}
                </button>
              )}
            </>
          )}
          {copyWeek != null && (
            <button className="btn" onClick={copyRanking}>
              {copied ? 'نُسخ ✓' : 'نسخ الترتيب'}
            </button>
          )}
          <button className="btn hide" onClick={onClose}>
            إغلاق
          </button>
        </div>

        {!klass ? (
          <div className="sempty">
            <p>{noKlass}</p>
            <button className="btn primary" onClick={onManage}>
              أضف فصولك وأسماء الطلاب
            </button>
          </div>
        ) : !klass.students.length ? (
          <div className="sempty">
            <p>لا أسماء في «{klass.name}» بعد.</p>
            <button className="btn primary" onClick={onManage}>
              أضف أسماء الطلاب
            </button>
          </div>
        ) : tab === 'week' ? (
          <>
            <p className="swk">
              {weekLabel(cur)} — {shown ? `المجموع = النجوم − الأغلاط، ومن أخذ ${num(MAX_MISTAKES)} أغلاط لا يدخل نجوم الأسبوع` : 'النجوم مخفية'}
            </p>
            <div className="sgrid">
              {rows.map((r) => (
                // مفتاح جديد مع كل ضغطة على البطاقة نفسها يعيد تشغيل الوميض
                <div
                  key={flash?.name === r.name ? `${r.name}-${flash.n}` : r.name}
                  className={'scard' + (flash?.name === r.name ? (flash.d > 0 ? ' up' : ' down') : '') + (shown && r.barred ? ' barred' : '')}
                >
                  <button className="sb up" aria-label={`نجمة لـ${r.name}`} onClick={() => give(r.name, 1)}>
                    <IconStar />
                  </button>
                  <span className="smid">
                    <b className="sname">{r.name}</b>
                    {shown && (
                      <span className="scount">
                        <span className="st">
                          <IconStar /> {num(r.stars)}
                        </span>
                        <span className="mi">✖ {num(r.mistakes)}</span>
                        {r.absences > 0 && <span className="ab">غ {num(r.absences)}</span>}
                      </span>
                    )}
                    {shown && r.barred && <span className="sbar">لا يدخل نجم الأسبوع</span>}
                  </span>
                  <span className={'stot' + (shown ? '' : ' hid')} title="المجموع">
                    {shown ? num(r.total) : '؟'}
                  </span>
                  <button className="sb down" aria-label={`غلطة على ${r.name}`} onClick={() => give(r.name, -1)}>
                    ✖
                  </button>
                </div>
              ))}
            </div>
            {last && (
              <button className="btn sundo" onClick={onUndo}>
                تراجع عن آخر ضغطة: {last.d > 0 ? 'نجمة لـ' : last.d < 0 ? 'غلطة على ' : 'غياب '}
                {last.s}
              </button>
            )}
          </>
        ) : tab === 'now' ? (
          <Podium key={`now-${cur}`} rows={rows} label={weekLabel(cur)} next={nextReq} soFar />
        ) : tab === 'podium' ? (
          <Podium key={`last-${cur}`} rows={weekRows(events, klass.id, klass.students, weekStart(cur - 1))} label={weekLabel(weekStart(cur - 1))} next={nextReq} />
        ) : tab === 'log' ? (
          <StudentLog events={events} picks={picks} klass={klass} onDrop={onDrop} />
        ) : arch >= 0 && weeks[arch] != null ? (
          <>
            <div className="crow">
              <button className="btn" onClick={() => setArch(-1)}>
                كل الأسابيع
              </button>
            </div>
            <Podium key={`arch-${weeks[arch]}`} rows={weekRows(events, klass.id, klass.students, weeks[arch])} label={weekLabel(weeks[arch])} next={nextReq} />
          </>
        ) : (
          <History events={events} klass={klass} weeks={weeks} onOpen={setArch} />
        )}
      </div>
    </div>
  );
}

/**
 * منصة نجوم أسبوع: الخمسة كلهم على درجات المنصة وبالحجم نفسه، فلا يُفصل أحد عنهم.
 * المتعادلون يقفون معًا على درجة واحدة (فقد يصيرون ستة أو سبعة)، والدرجة التي لا أحد عليها لا تُرسم.
 * للتقديم تبدأ مخفية، وتُكشف المراكز واحدًا واحدًا من الخامس إلى الأول (الزر، أو المسافة، أو الجوال).
 */
function Podium({ rows, label, soFar = false, next = 0 }: { rows: StarRow[]; label: string; soFar?: boolean; next?: number }) {
  const top = topRows(rows);
  /** عمود لكل طالب: الأول في الوسط، ثم يمينه ويساره بالتناوب (المتعادلون أعمدة متجاورة بالارتفاع نفسه) */
  const cols: { r: StarRow; i: number }[] = [];
  top.forEach((r, i) => (i % 2 ? cols.unshift({ r, i }) : cols.push({ r, i })));
  /** عدد الأعمدة الظاهرة؛ الكشف من آخر طالب إلى الأول */
  const [shown, setShown] = useState(0);
  const all = shown >= top.length;
  // كل مركز بصوته: الكشف من آخر طالب، فالذي يظهر الآن هو top[top.length − n − 1]
  const reveal = () =>
    setShown((n) => {
      if (n >= top.length) return n;
      sPlace(top[top.length - n - 1].rank);
      return n + 1;
    });
  const lastNext = useRef(next);
  useEffect(() => {
    if (next !== lastNext.current) reveal();
    lastNext.current = next;
  }, [next]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'ArrowLeft' || e.key === 'Enter') {
        e.preventDefault();
        reveal();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [top.length]);

  if (!top.length) return <p className="sempty">لا نجوم في أسبوع {label}.</p>;
  const isShown = (i: number) => i >= top.length - shown;
  /** ظهر صاحب المركز الأول: قصاصات فوق المنصة */
  const firstOut = top.some((r, i) => r.rank === 1 && isShown(i));
  return (
    <div className="podium">
      <div className="crow">
        <p className="swk">
          {soFar ? 'الترتيب حتى الآن، ويتغيّر حتى الأربعاء' : 'نجوم أسبوع'} {label} — {num(top.length)} {top.length > 10 ? 'نجمًا' : 'نجوم'}
        </p>
        <span className="sp" />
        <button className="btn primary" disabled={all} onClick={reveal}>
          {shown ? 'أظهر التالي' : 'ابدأ من المركز الأخير'}
        </button>
        <button className="btn" disabled={all} onClick={() => setShown(top.length)}>
          أظهر الكل
        </button>
      </div>
      <div className={'psteps' + (top.length > 5 ? ' many' : '')} style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}>
        {firstOut && <Confetti />}
        {cols.map(({ r, i }) => (
          <div key={r.name} className={`pstep p${r.rank}` + (isShown(i) ? ' on' : '')}>
            <div className="pnames">
              {isShown(i) ? (
                <span className="pwho">
                  <b>{r.name}</b>
                  <small>
                    المجموع {num(r.total)} — <IconStar /> {num(r.stars)} ✖ {num(r.mistakes)}
                  </small>
                </span>
              ) : (
                <span className="pwho hidden" aria-label="لم يظهر بعد">
                  <b>؟</b>
                </span>
              )}
            </div>
            <div className="pblock">
              <IconStar />
              <span>{num(r.rank)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** نهاية الحصة: الفرق على المنصة كلها معًا، مرتبة بنقاطها، ومع كل فريق نجوم كل طالب فيه */
export function TeamPodium({ teams, onClose }: { teams: { name: string; score: number; color: string; stars: number }[]; onClose: () => void }) {
  const levels = [...new Set(teams.map((t) => t.score))].sort((a, b) => b - a);
  const ranked = teams.map((t) => ({ ...t, rank: levels.indexOf(t.score) + 1 })).sort((a, b) => a.rank - b.rank);
  /** الأول في الوسط، ثم يمينه ويساره بالتناوب */
  const cols: typeof ranked = [];
  ranked.forEach((t, i) => (i % 2 ? cols.unshift(t) : cols.push(t)));
  useEffect(() => {
    sPlace(1);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="tpod" role="dialog" aria-label="ترتيب الفرق" onClick={onClose}>
      <h2>ترتيب الفرق</h2>
      <div className="psteps" style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}>
        <Confetti />
        {cols.map((t) => (
          <div key={t.name} className={`pstep p${t.rank} on`} style={{ '--tc': t.color } as React.CSSProperties}>
            <div className="pnames">
              <span className="pwho">
                <b>{t.name}</b>
                <small>
                  النقاط {num(t.score)} — <IconStar /> {num(t.stars)} لكل طالب
                </small>
              </span>
            </div>
            <div className="pblock">
              <IconStar />
              <span>{num(t.rank)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** إعلان على الشاشة: d = ١ نجمة، و−١ غلطة */
export interface Cheer {
  name: string;
  d: 1 | -1;
  /** يزداد مع كل ضغطة فيُعاد الإعلان حتى للطالب نفسه */
  n: number;
  /** نقطة لفريق: العنوان بدل «نجمة جديدة»، ولون الفريق للنجمة والاسم */
  msg?: string;
  color?: string;
}

/** إعلان على الشاشة حين يأخذ طالب نجمة أو غلطة (من اللوحة أو العجلة أو الجوال): الرمز كبيرًا واسمه، بلا عدد نجومه. لا يعترض الضغطات فتتوالى الإعلانات. */
/** قصاصات ملوّنة تنطلق من الزاويتين السفليتين ثم تتساقط. رسم على Canvas، وتُترك مع «تقليل الحركة» */
function Confetti() {
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current;
    const x = c?.getContext('2d');
    if (!c || !x || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const W = (c.width = c.clientWidth * 2);
    const H = (c.height = c.clientHeight * 2);
    const COLORS = ['#f5b400', '#ffd43b', '#f08c00', '#1c7ed6', '#2f9e44', '#e64980', '#7048e8', '#13213b'];
    type P = { x: number; y: number; vx: number; vy: number; r: number; vr: number; w: number; h: number; c: string; round: boolean; delay: number };
    const ps: P[] = [];
    const burst = (n: number, x0: number, dir: number, delay: number) => {
      for (let i = 0; i < n; i++) {
        const a = (-Math.PI / 2) + dir * (0.15 + Math.random() * 0.55);
        const v = (0.022 + Math.random() * 0.02) * H;
        ps.push({ x: x0, y: H + 10, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, w: 10 + Math.random() * 12, h: 6 + Math.random() * 8, c: COLORS[i % COLORS.length], round: Math.random() < 0.3, delay });
      }
    };
    burst(110, 0, 1, 250);
    burst(110, W, -1, 250);
    // مطر خفيف من الأعلى
    for (let i = 0; i < 70; i++) ps.push({ x: Math.random() * W, y: -20 - Math.random() * H * 0.4, vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 4, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, w: 10 + Math.random() * 10, h: 6 + Math.random() * 6, c: COLORS[i % COLORS.length], round: Math.random() < 0.3, delay: 700 });
    const t0 = performance.now();
    let last = t0;
    let raf = 0;
    const f = (t: number) => {
      const dt = Math.min(2, (t - last) / 16.7);
      last = t;
      x.clearRect(0, 0, W, H);
      const fade = Math.max(0, Math.min(1, (3700 - (t - t0)) / 500));
      x.globalAlpha = fade;
      for (const p of ps) {
        if (t - t0 < p.delay) continue;
        p.vy += 0.55 * dt;
        p.vx *= Math.pow(0.985, dt);
        p.vy = Math.min(p.vy, 9 + p.w * 0.25);
        p.x += p.vx * dt + Math.sin((t + p.w * 90) / 260) * 1.2;
        p.y += p.vy * dt;
        p.r += p.vr * dt;
        if (p.y > H + 40) continue;
        x.save();
        x.translate(p.x, p.y);
        x.rotate(p.r);
        x.scale(1, Math.cos(p.r * 1.7));
        x.fillStyle = p.c;
        if (p.round) {
          x.beginPath();
          x.arc(0, 0, p.h * 0.7, 0, 2 * Math.PI);
          x.fill();
        } else x.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        x.restore();
      }
      if (t - t0 < 4200) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={cv} className="cheer-confetti" aria-hidden="true" />;
}

/** إعلان نجمة (احتفال بقصاصات) أو غلطة (هادئ) على الشاشة كلها، باسم الطالب */
export function StarCheer({ cheer, klass, onDone }: { cheer: Cheer | null; klass: Klass | undefined; onDone: () => void }) {
  const bad = !!cheer && cheer.d < 0;
  useEffect(() => {
    if (!cheer) return;
    const t = setTimeout(onDone, bad ? 2400 : 4000);
    return () => clearTimeout(t);
  }, [cheer, onDone, bad]);
  if (!cheer || (!klass && !cheer.msg)) return null;
  return (
    <div key={cheer.n} className={'cheer' + (bad ? ' bad' : ' good')} role="status" style={cheer.color ? ({ '--cc': cheer.color } as React.CSSProperties) : undefined}>
      {!bad && <Confetti />}
      <div className="cheer-card">
        <div className="cheer-star" aria-hidden="true">
          {!bad && <span className="cheer-rays" />}
          {!bad && <span className="cheer-ring" />}
          {bad ? (
            <svg viewBox="0 0 100 100" className="cheer-x">
              <circle cx="50" cy="50" r="46" />
              <path d="M34 34 L66 66 M66 34 L34 66" />
            </svg>
          ) : cheer.msg ? (
            <span className="cheer-pt">
              <bdi dir="ltr">+١</bdi>
            </span>
          ) : (
            <svg viewBox="0 0 24 24" className="cheer-svg">
              <path d="M12 2.2l2.95 6.2 6.8.86-5 4.7 1.28 6.74L12 17.4l-6.03 3.3 1.28-6.74-5-4.7 6.8-.86z" />
            </svg>
          )}
        </div>
        {!bad && <div className="cheer-msg">{cheer.msg ?? 'نجمة جديدة'}</div>}
        <div className="cheer-name">{cheer.name}</div>
      </div>
    </div>
  );
}

/** «ضغطة واحدة»، «ضغطتان»، «٣ ضغطات»، «١٢ ضغطة» */
const presses = (n: number) => (n === 1 ? 'ضغطة واحدة' : n === 2 ? 'ضغطتان' : n <= 10 ? `${num(n)} ضغطات` : `${num(n)} ضغطة`);

/**
 * سجل الأسابيع: كل أسبوع سابق بنجومه (لا يُحذف شيء مع الوقت)، وكم مرة كان كل طالب نجم الأسبوع.
 * ونسخة احتياطية تُنزَّل ملفًا وتُسترجع، فلا تضيع النجوم إن مُسحت بيانات المتصفح.
 */
function History({ events, klass, weeks, onOpen }: { events: StarEvent[]; klass: Klass; weeks: number[]; onOpen: (i: number) => void }) {
  const [msg, setMsg] = useState('');
  // كل طلاب الفصل، ومن لم يكن نجمًا بعدُ عددُه صفر
  const won = starCounts(events, klass.id, klass.students);
  const counts = [...won, ...klass.students.filter((n) => !won.some((c) => c.name === n)).map((name) => ({ name, n: 0 }))];
  const save = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([backup()], { type: 'application/json' }));
    const d = new Date();
    a.download = `نجوم-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const load = async (f: File | undefined) => {
    if (!f) return;
    const n = restore(await f.text());
    if (n === null) setMsg('هذا الملف ليس نسخة نجوم.');
    else {
      setMsg(n ? `استُرجع ${presses(n)}.` : 'كل ما في النسخة موجود هنا من قبل.');
      if (n) setTimeout(() => location.reload(), 900);
    }
  };
  return (
    <div className="shist">
      <div className="crow">
        <p className="swk">كل الأسابيع محفوظة، ولا يُحذف منها شيء.</p>
        <span className="sp" />
        <button className="btn" onClick={save}>
          تنزيل نسخة احتياطية
        </button>
        <label className="btn">
          استرجاع نسخة
          <input type="file" accept="application/json,.json" hidden onChange={(e) => load(e.target.files?.[0])} />
        </label>
      </div>
      {msg && <p className="swk">{msg}</p>}
      {!weeks.length ? (
        <p className="sempty">لا أسابيع سابقة بعد: تظهر هنا بعد أول أسبوع فيه نجوم.</p>
      ) : (
        <div className="shcols">
          <ol className="sweeks">
            {weeks.map((w, i) => {
              const rows = weekRows(events, klass.id, klass.students, w);
              const top = topRows(rows);
              /** بقية الطلاب بعد النجوم، بمجموعهم في ذلك الأسبوع */
              const rest = rankRows(rows)
                .filter((r) => !top.some((t) => t.name === r.name))
                .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name, 'ar'));
              return (
                <li key={w}>
                  <button onClick={() => onOpen(i)}>
                    <b>{weekLabel(w)}</b>
                    <span>
                      {top.length
                        ? top.map((r, j) => (
                            <span key={r.name} className="swho">
                              {j > 0 && '، '}
                              <bdi>{r.name}</bdi> <IconStar /> {num(r.total)}
                            </span>
                          ))
                        : 'لا نجوم في هذا الأسبوع'}
                    </span>
                    {rest.length > 0 && (
                      <span className="srest">
                        {rest.map((r, j) => (
                          <span key={r.name}>
                            {j > 0 && '، '}
                            <bdi>{r.name}</bdi> {num(r.total)}
                            {r.barred && ' ✕'}
                          </span>
                        ))}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="scounts">
            <b>مرات نجم الأسبوع</b>
            {counts.length ? (
              <table>
                <tbody>
                  {counts.map((c) => (
                    <tr key={c.name}>
                      <td>
                        <bdi>{c.name}</bdi>
                      </td>
                      <td>
                        <IconStar /> {num(c.n)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="swk">لا أحد بعد.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const two = (n: number) => (n < 10 ? '0' : '') + n;
const dayStart = (t: number) => {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};
/** «الأحد ١٥/١١» */
const dayLabel = (t: number) => {
  const d = new Date(t);
  return `${DAYS[d.getDay()]} ${num(d.getDate())}/${num(d.getMonth() + 1)}`;
};
/** «٩:٠٥» */
const clock = (t: number) => {
  const d = new Date(t);
  return `${num(d.getHours())}:${digits(two(d.getMinutes()))}`;
};

type LogRow = { t: number; k: string; s: string; l?: string; kind: 'pick' | 'star' | 'team' | 'mistake' | 'absent'; e?: StarEvent };
const KIND: Record<LogRow['kind'], string> = {
  pick: 'خرج اسمه في العجلة',
  star: 'نجمة',
  team: 'نجمة من توزيع الفرق',
  mistake: 'غلطة',
  absent: 'غائب',
};
/** «نجمة»، «نجمتان»، «٣ نجوم»، «١١ نجمة» وما يشبهها */
const counted = (n: number, one: string, two: string, few: string) => (n === 1 ? one : n === 2 ? two : n <= 10 ? `${num(n)} ${few}` : `${num(n)} ${one}`);

/**
 * السجل اليومي: الأيام، ثم فصول اليوم، ثم طلاب الفصل وما حدث لكل واحد بوقته: خروج اسمه في العجلة،
 * ونجومه (ومنها توزيع الفرق)، وأغلاطه، وغيابه. يكشف النجمة التي أُعطيت بالغلط فتُحذف وحدها،
 * والطالب الذي خرج اسمه ولم يأخذ شيئًا.
 */
function StudentLog({ events, picks, onDrop }: { events: StarEvent[]; picks: PickEvent[]; klass: Klass; onDrop?: (e: StarEvent) => void }) {
  const { roster } = useRoster();
  const [day, setDay] = useState<number | null>(null);
  const [kid, setKid] = useState<string | null>(null);
  const [ask, setAsk] = useState<StarEvent | null>(null);
  const classes = Object.entries(roster.grades).flatMap(([g, v]) => v.classes.map((c) => ({ ...c, grade: gradeName(g) })));
  const rows: LogRow[] = [
    ...events.map((e): LogRow => ({ t: e.t, k: e.k, s: e.s, l: e.l, e, kind: e.d === 0 ? 'absent' : e.d < 0 ? 'mistake' : e.w === 'team' ? 'team' : 'star' })),
    ...picks.map((p): LogRow => ({ t: p.t, k: p.k, s: p.s, l: p.l, kind: 'pick' })),
  ].sort((a, b) => a.t - b.t);
  const days = [...new Set(rows.map((r) => dayStart(r.t)))].sort((a, b) => b - a);
  const ofDay = day == null ? [] : rows.filter((r) => dayStart(r.t) === day);
  const klassOf = (id: string) => classes.find((c) => c.id === id);
  const kname = (id: string) => {
    const c = klassOf(id);
    return c ? `${c.name} — ${c.grade}` : 'فصل محذوف';
  };
  const sum = (list: LogRow[]) => {
    const n = (k: LogRow['kind'][]) => list.filter((r) => k.includes(r.kind)).length;
    const out: string[] = [];
    const st = n(['star', 'team']);
    if (st) out.push(counted(st, 'نجمة', 'نجمتان', 'نجوم'));
    const mi = n(['mistake']);
    if (mi) out.push(counted(mi, 'غلطة', 'غلطتان', 'أغلاط'));
    const ab = n(['absent']);
    if (ab) out.push(counted(ab, 'غائب', 'غائبان', 'غائبين'));
    const pk = n(['pick']);
    if (pk) out.push(`العجلة ${num(pk)}`);
    return out.join('، ') || '—';
  };

  const crumbs = (
    <div className="crow slcrumbs">
      <button className={'btn' + (day == null ? ' sel' : '')} onClick={() => (setDay(null), setKid(null))}>
        كل الأيام
      </button>
      {day != null && (
        <>
          <span>‹</span>
          <button className={'btn' + (kid == null ? ' sel' : '')} onClick={() => setKid(null)}>
            {dayLabel(day)}
          </button>
        </>
      )}
      {day != null && kid != null && (
        <>
          <span>‹</span>
          <button className="btn sel">{kname(kid)}</button>
        </>
      )}
    </div>
  );

  if (day == null)
    return (
      <div className="slog">
        {crumbs}
        {!days.length ? (
          <p className="sempty">لا شيء في السجل بعد.</p>
        ) : (
          <div className="sllist">
            {days.map((d) => {
              const list = rows.filter((r) => dayStart(r.t) === d);
              const ks = new Set(list.map((r) => r.k)).size;
              return (
                <button key={d} onClick={() => setDay(d)}>
                  <b>{dayLabel(d)}</b>
                  <span>{counted(ks, 'فصل', 'فصلان', 'فصول')}</span>
                  <small>{sum(list)}</small>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );

  if (kid == null) {
    const ks = [...new Set(ofDay.map((r) => r.k))];
    return (
      <div className="slog">
        {crumbs}
        <div className="sllist">
          {ks.map((k) => {
            const list = ofDay.filter((r) => r.k === k);
            const lessons = [...new Set(list.map((r) => r.l).filter(Boolean))];
            return (
              <button key={k} onClick={() => setKid(k)}>
                <b>{kname(k)}</b>
                <span>{lessons.join('، ') || '—'}</span>
                <small>{sum(list)}</small>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const list = ofDay.filter((r) => r.k === kid);
  const names = [...new Set([...(klassOf(kid)?.students ?? []), ...list.map((r) => r.s)])].sort(byName);
  const lessons = [...new Set(list.map((r) => r.l).filter(Boolean))];
  return (
    <div className="slog">
      {crumbs}
      {lessons.length > 0 && <p className="swk">الدرس: {lessons.join('، ')}</p>}
      <div className="slrows">
        <table>
          <tbody>
            {names.map((n) => {
              const mine = list.filter((r) => r.s === n);
              const absent = mine.some((r) => r.kind === 'absent');
              const acts = mine.filter((r) => r.kind !== 'absent');
              return (
                <tr key={n} className={absent ? 'absent' : ''}>
                  <td className="slwho">
                    <bdi>{n}</bdi>
                    {absent && <span className="slabs">غائب</span>}
                  </td>
                  <td className="slacts">
                    {!acts.length ? (
                      <span className="slnone">{absent ? '' : 'لا شيء'}</span>
                    ) : (
                      acts.map((r, i) => (
                        <span key={i} className={'slact k-' + r.kind}>
                          <small>{clock(r.t)}</small> {r.kind === 'star' || r.kind === 'team' ? <IconStar /> : r.kind === 'mistake' ? '✖' : '◎'} {KIND[r.kind]}
                          {r.e && onDrop &&
                            (ask === r.e ? (
                              <>
                                <button className="btn danger" onClick={() => (onDrop(r.e!), setAsk(null))}>
                                  تأكيد الحذف
                                </button>
                                <button className="btn" onClick={() => setAsk(null)}>
                                  إلغاء
                                </button>
                              </>
                            ) : (
                              <button className="btn sldel" aria-label="حذف" onClick={() => setAsk(r.e!)}>
                                حذف
                              </button>
                            ))}
                        </span>
                      ))
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
