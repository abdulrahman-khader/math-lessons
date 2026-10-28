import { useEffect, useRef, useState } from 'react';
import { num } from '../digits';
import type { Klass } from '../classes';
import { isThursday, lastEvent, pastWeeks, tally, topRows, weekLabel, weekStart, type StarEvent, type StarRow } from '../stars';
import { sEnd, sGood } from '../sound';
import { IconStar } from './icons';

interface Props {
  open: boolean;
  onClose: () => void;
  klass: Klass | undefined;
  events: StarEvent[];
  onStar: (name: string, d: 1 | -1) => void;
  onUndo: () => void;
  onManage: () => void;
  /** أوامر الجوال: يزداد n مع كل أمر؛ podium يفتح منصة الأسبوع الماضي، وnext يُظهر المركز التالي */
  req?: { n: number; a: 'podium' | 'next' };
}

type Tab = 'week' | 'now' | 'podium' | 'archive';

/** درجات المنصة من اليمين: الرابع، الثاني، الأول، الثالث، الخامس */

/**
 * نجم الأسبوع: بطاقة لكل طالب بنجومه وأغلاطه ومجموعه أمام الطلاب، وزرّا ⭐ و✖.
 * يوم الخميس تُفتح على منصة نجوم الأسبوع الذي انتهى أمس.
 */
export function StarsModal({ open, onClose, klass, events, onStar, onUndo, onManage, req }: Props) {
  const [tab, setTab] = useState<Tab>('week');
  /** آخر بطاقة تغيّرت، لوميضها: ذهبي للنجمة وأحمر للغلطة */
  const [flash, setFlash] = useState<{ name: string; d: 1 | -1; n: number } | null>(null);
  const [arch, setArch] = useState(0);
  useEffect(() => {
    if (open) setTab(isThursday() ? 'podium' : 'week');
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
    setFlash((f) => ({ name: last.s, d: last.d, n: (f?.n ?? 0) + 1 }));
  }, [last?.t]);

  if (!open) return null;
  const now = Date.now();
  const cur = weekStart(now);
  const weeks = klass ? pastWeeks(events, klass.id, now) : [];
  const rows = klass ? tally(events, klass.id, klass.students, cur) : [];

  const give = (name: string, d: 1 | -1) => onStar(name, d);

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
              <button className={'btn' + (tab === 'archive' ? ' sel' : '')} onClick={() => setTab('archive')} disabled={weeks.length < 2}>
                الأرشيف
              </button>
            </>
          )}
          <button className="btn hide" onClick={onClose}>
            إغلاق
          </button>
        </div>

        {!klass ? (
          <div className="sempty">
            <p>اختر فصلًا في الصفحة الأولى من الدرس، فتظهر بطاقات طلابه هنا.</p>
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
              {weekLabel(cur)} — المجموع = النجوم − الأغلاط
            </p>
            <div className="sgrid">
              {rows.map((r) => (
                // مفتاح جديد مع كل ضغطة على البطاقة نفسها يعيد تشغيل الوميض
                <div key={flash?.name === r.name ? `${r.name}-${flash.n}` : r.name} className={'scard' + (flash?.name === r.name ? (flash.d > 0 ? ' up' : ' down') : '')}>
                  <button className="sb up" aria-label={`نجمة لـ${r.name}`} onClick={() => give(r.name, 1)}>
                    <IconStar />
                  </button>
                  <span className="smid">
                    <b className="sname">{r.name}</b>
                    <span className="scount">
                      <span className="st">
                        <IconStar /> {num(r.stars)}
                      </span>
                      <span className="mi">✖ {num(r.mistakes)}</span>
                    </span>
                  </span>
                  <span className="stot" title="المجموع">
                    {num(r.total)}
                  </span>
                  <button className="sb down" aria-label={`غلطة على ${r.name}`} onClick={() => give(r.name, -1)}>
                    ✖
                  </button>
                </div>
              ))}
            </div>
            {last && (
              <button className="btn sundo" onClick={onUndo}>
                تراجع عن آخر ضغطة: {last.d > 0 ? 'نجمة لـ' : 'غلطة على '}
                {last.s}
              </button>
            )}
          </>
        ) : tab === 'now' ? (
          <Podium key={`now-${cur}`} rows={rows} label={weekLabel(cur)} next={nextReq} soFar />
        ) : tab === 'podium' ? (
          <Podium key={`last-${cur}`} rows={tally(events, klass.id, klass.students, weekStart(cur - 1))} label={weekLabel(weekStart(cur - 1))} next={nextReq} />
        ) : (
          <>
            <div className="crow">
              {weeks.slice(1).map((w, i) => (
                <button key={w} className={'btn' + (i === arch ? ' sel' : '')} onClick={() => setArch(i)}>
                  {weekLabel(w)}
                </button>
              ))}
            </div>
            {weeks[arch + 1] != null && <Podium key={`arch-${weeks[arch + 1]}`} rows={tally(events, klass.id, klass.students, weeks[arch + 1])} label={weekLabel(weeks[arch + 1])} next={nextReq} />}
          </>
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
  const reveal = () =>
    setShown((n) => {
      if (n >= top.length) return n;
      if (n + 1 === top.length) sEnd();
      else sGood();
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

/** إعلان على الشاشة حين يأخذ طالب نجمة (من اللوحة أو العجلة أو الجوال): نجمة كبيرة واسمه، بلا عدد نجومه. الغلطة لا تُعلَن. لا يعترض الضغطات فتتوالى النجوم. */
export function StarCheer({ cheer, klass, onDone }: { cheer: { name: string; n: number } | null; klass: Klass | undefined; onDone: () => void }) {
  useEffect(() => {
    if (!cheer) return;
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [cheer, onDone]);
  if (!cheer || !klass) return null;
  return (
    <div key={cheer.n} className="cheer" role="status">
      <div className="cheer-card">
        <div className="cheer-star">
          <IconStar />
        </div>
        <div className="cheer-name">{cheer.name}</div>
        <div className="cheer-msg">أخذ نجمة!</div>
      </div>
    </div>
  );
}
