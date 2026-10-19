import { useCallback, useEffect, useRef, useState } from 'react';
import { digits, num } from '../digits';
import type { Klass } from '../classes';
import { TEAM_COLORS } from '../sections';
import { sGood } from '../sound';

const COLORS = ['#a5d8ff', '#b2f2bb', '#ffd8a8', '#d0bfff', '#ffec99', '#99e9f2', '#fcc2d7', '#c0eb75'];
const DEFAULT_NAMES = Array.from({ length: 25 }, (_, i) => 'رقم ' + digits(i + 1)).join('\n');

interface Props {
  open: boolean;
  onClose: () => void;
  names: string;
  onNames: (s: string) => void;
  /** يزداد عند طلب التدوير من الجوال */
  spinReq?: number;
  /** الاسم المختار (أو «…» أثناء الدوران) لعرضه على الجوال */
  onResult?: (name: string) => void;
  /** الفصل المختار: العجلة تدور على طلابه بدل النص */
  klass?: Klass;
  nTeams?: number;
  teamNames?: string[];
  /** -١ الفصل كله، أو رقم فريق */
  teamFilter?: number;
  onTeamFilter?: (t: number) => void;
  /** من خرجت أسماؤهم في هذه الحصة (لا تتكرر) */
  picked?: string[];
  onPick?: (name: string) => void;
  onRestore?: () => void;
  onManage?: () => void;
}

/** عجلة أسماء عشوائية. النص على Canvas يحتاج ctx.direction = 'rtl' صراحةً؛ لا يرثه من الصفحة. */
export function WheelModal({ open, onClose, names, onNames, spinReq = 0, onResult, klass, nTeams = 0, teamNames = [], teamFilter = -1, onTeamFilter, picked = [], onPick, onRestore, onManage }: Props) {
  const cv = useRef<HTMLCanvasElement>(null);
  const ang = useRef(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('—');
  const [removeFree, setRemoveFree] = useState(false);
  /** مع الفصل: الاسم الذي يخرج لا يعود حتى يُضغط «أرجع الأسماء» */
  const [removeClass, setRemoveClass] = useState(true);
  const remove = klass ? removeClass : removeFree;
  const text = names || DEFAULT_NAMES;
  const hasTeams = !!klass && nTeams > 0 && Object.values(klass.team).some((t) => t < nTeams);
  const filter = hasTeams ? teamFilter : -1;
  const pool = klass ? klass.students.filter((s) => filter < 0 || klass.team[s] === filter) : [];
  const list = klass
    ? pool.filter((s) => !picked.includes(s))
    : text
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
  const emptyMsg = klass && pool.length ? 'خرجت كل الأسماء' : 'أضف أسماء';
  const emptyRef = useRef(emptyMsg);
  emptyRef.current = emptyMsg;
  const listRef = useRef(list);
  listRef.current = list;

  const draw = useCallback(() => {
    const c = cv.current;
    const x = c?.getContext('2d');
    if (!c || !x) return;
    const N = listRef.current;
    const R = 290;
    const C = 300;
    x.clearRect(0, 0, 600, 600);
    x.direction = 'rtl';
    if (!N.length) {
      x.fillStyle = '#13213b';
      x.font = 'bold 32px Tajawal, Tahoma';
      x.textAlign = 'center';
      x.fillText(emptyRef.current, C, C);
      return;
    }
    const a = (2 * Math.PI) / N.length;
    N.forEach((n, i) => {
      const s = ang.current + i * a;
      x.beginPath();
      x.moveTo(C, C);
      x.arc(C, C, R, s, s + a);
      x.closePath();
      x.fillStyle = COLORS[i % COLORS.length];
      x.fill();
      x.strokeStyle = '#13213b';
      x.lineWidth = 2;
      x.stroke();
      x.save();
      x.translate(C, C);
      const mid = s + a / 2;
      x.rotate(mid);
      x.fillStyle = '#13213b';
      x.font = `bold ${N.length > 18 ? 20 : 26}px Tajawal, Tahoma`;
      // الاسم يمتد من قرب الحافة الخارجية نحو المركز. في النصف الأيسر يُقلب نصف دورة حتى لا يُقرأ مقلوبًا.
      // في RTL تعني «start» الحافة اليمنى و«end» اليسرى.
      const c = Math.cos(mid);
      if (c < 0) {
        x.rotate(Math.PI);
        x.textAlign = 'end';
        x.fillText(n, -(R - 16), 8);
      } else {
        x.textAlign = 'start';
        x.fillText(n, R - 16, 8);
      }
      x.restore();
    });
    x.beginPath();
    x.arc(C, C, 34, 0, 2 * Math.PI);
    x.fillStyle = '#13213b';
    x.fill();
  }, []);

  useEffect(() => {
    if (open) draw();
  }, [open, list.join('\n'), emptyMsg, draw]);

  const spin = () => {
    const N = list;
    if (!N.length || spinning) return;
    setSpinning(true);
    setResult('…');
    onResult?.('…');
    const a = (2 * Math.PI) / N.length;
    const pick = Math.floor(Math.random() * N.length);
    // المؤشر في الأعلى (زاوية -π/2)
    const target = -Math.PI / 2 - (pick * a + a / 2);
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const start = ang.current;
    const delta = ((((target - start) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
    const total = delta + (reduce ? 0 : 2 * Math.PI * 5);
    const dur = reduce ? 1 : 3200;
    const t0 = performance.now();
    const f = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      ang.current = start + total * (1 - Math.pow(1 - p, 3));
      draw();
      if (p < 1) return void requestAnimationFrame(f);
      setSpinning(false);
      setResult(N[pick]);
      onResult?.(N[pick]);
      sGood();
      if (remove) setTimeout(() => (klass ? onPick?.(N[pick]) : onNames(N.filter((_, i) => i !== pick).join('\n'))), 900);
    };
    requestAnimationFrame(f);
  };

  const lastSpin = useRef(spinReq);
  useEffect(() => {
    if (spinReq !== lastSpin.current && open) spin();
    lastSpin.current = spinReq;
  }, [spinReq, open]);

  if (!open) return null;
  return (
    <div className="modal show" role="dialog" aria-label="عجلة الأسماء" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mbox">
        <div className="wwrap">
          <canvas ref={cv} id="wheelc" width={600} height={600} />
        </div>
        <div className="wside">
          <h3>من سيجيب؟</h3>
          <div id="wres">{result}</div>
          <button className="btn primary" onClick={spin}>
            أدِر العجلة
          </button>
          <label className="row" style={{ fontWeight: 700 }}>
            <input
              type="checkbox"
              checked={remove}
              onChange={(e) => (klass ? setRemoveClass : setRemoveFree)(e.target.checked)}
              style={{ width: '1.3em', height: '1.3em' }}
            />{' '}
            {klass ? 'لا يتكرر الاسم في الحصة' : 'احذف الاسم بعد اختياره'}
          </label>
          {klass ? (
            <>
              <p className="wklass">
                <b>{klass.name}</b> · باقٍ {num(list.length)} من {num(pool.length)}
              </p>
              {hasTeams && (
                <div className="row wteams">
                  <button className={'btn' + (filter < 0 ? ' sel' : '')} onClick={() => onTeamFilter?.(-1)}>
                    الكل
                  </button>
                  {teamNames.slice(0, nTeams).map((t, i) => (
                    <button key={i} className={'btn' + (filter === i ? ' sel' : '')} style={{ borderColor: TEAM_COLORS[i] }} onClick={() => onTeamFilter?.(i)}>
                      {t}
                    </button>
                  ))}
                </div>
              )}
              {picked.length > 0 && (
                <button className="btn" onClick={onRestore}>
                  أرجع كل الأسماء ({num(picked.length)})
                </button>
              )}
            </>
          ) : (
            <>
              <label htmlFor="wnames" style={{ fontWeight: 800 }}>
                الأسماء (اسم في كل سطر):
              </label>
              <textarea id="wnames" value={text} onChange={(e) => onNames(e.target.value)} />
            </>
          )}
          {onManage && (
            <button className="btn" onClick={onManage}>
              {klass ? 'تعديل أسماء الفصول' : 'أسماء فصولي'}
            </button>
          )}
          <button className="btn hide" onClick={onClose}>
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
