import { useCallback, useEffect, useRef, useState } from 'react';
import { digits, num } from '../digits';
import type { Klass } from '../classes';
import { sClick, sGood } from '../sound';

const DEFAULT_NAMES = Array.from({ length: 25 }, (_, i) => 'رقم ' + digits(i + 1)).join('\n');
const FONT = '"Noto Naskh Arabic", "Geeza Pro", Tajawal, Tahoma, serif';
const INK = '#13213b';
/** الشرائح بلونين متناوبين، والفائز وحده ملوّن */
const SLICE = ['#ffffff', '#e3e8ef', '#f0f3f7'];
/* مع عدد فردي تلتقي الشريحتان الأولى والأخيرة: الأخيرة بلون ثالث بينهما */
const WIN = '#f08c00';
const DIM = '#f1f3f6';
const DIM_TEXT = '#a7b0bd';
/** المؤشر على يسار العجلة، مقابل الاسم */
const POINTER = Math.PI;
const SIZE = 1000;

interface Props {
  /** الغائبون اليوم: لا يدخلون العجلة */
  absent?: string[];
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
  /** -١ الفصل كله، أو رقم فريق (يختاره المعلم من الجوال) */
  teamFilter?: number;
  /** من خرجت أسماؤهم في هذه الحصة (لا تتكرر) */
  picked?: string[];
  onPick?: (name: string) => void;
  onRestore?: () => void;
  /** هل يخرج الاسم بعد ظهوره. يُتحكم به من الجوال */
  remove?: boolean;
}

/**
 * عجلة الأسماء على شاشة الفصل: العجلة والاسم فقط، بلا أزرار ولا أرقام يراها الطلاب.
 * المعلم يديرها من الجوال، أو يلمس العجلة (أو المسافة)، ويغلقها بلمسة خارجها أو Esc.
 * النص على Canvas يحتاج ctx.direction = 'rtl' صراحةً؛ لا يرثه من الصفحة.
 */
export function WheelModal({ open, onClose, names, onNames, spinReq = 0, onResult, klass, nTeams = 0, teamFilter = -1, picked = [], onPick, onRestore, remove: removeProp, absent = [] }: Props) {
  const cv = useRef<HTMLCanvasElement>(null);
  const ang = useRef(0);
  const [spinning, setSpinning] = useState(false);
  /** الاسم تحت السهم أثناء الدوران، ثم الفائز */
  const [live, setLive] = useState('');
  /** بعد التوقف: الأسماء كما كانت والفائز بينها، فلا تتحرك الشرائح حين يخرج اسمه */
  const shown = useRef<{ list: string[]; win: number } | null>(null);
  const remove = removeProp ?? !!klass;
  const text = names || DEFAULT_NAMES;
  const hasTeams = !!klass && nTeams > 0 && Object.values(klass.team).some((t) => t < nTeams);
  const filter = hasTeams ? teamFilter : -1;
  const pool = klass ? klass.students.filter((s) => (filter < 0 || klass.team[s] === filter) && !absent.includes(s)) : [];
  const list = klass
    ? pool.filter((s) => !picked.includes(s))
    : text
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
  const emptyMsg = klass && pool.length ? 'خرجت كل الأسماء' : 'لا أسماء';
  const emptyRef = useRef(emptyMsg);
  emptyRef.current = emptyMsg;
  const listRef = useRef(list);
  listRef.current = list;

  const draw = useCallback(() => {
    const c = cv.current;
    const x = c?.getContext('2d');
    if (!c || !x) return;
    const N = shown.current?.list ?? listRef.current;
    const win = shown.current?.win ?? -1;
    const C = SIZE / 2;
    const R = C - 62;
    x.clearRect(0, 0, SIZE, SIZE);
    x.direction = 'rtl';
    x.textBaseline = 'middle';
    if (!N.length) {
      x.beginPath();
      x.arc(C, C, R, 0, 2 * Math.PI);
      x.fillStyle = DIM;
      x.fill();
      x.fillStyle = DIM_TEXT;
      x.font = `700 56px ${FONT}`;
      x.textAlign = 'center';
      x.fillText(emptyRef.current, C, C);
      return;
    }
    const a = (2 * Math.PI) / N.length;
    const size = N.length > 26 ? 36 : N.length > 16 ? 44 : N.length > 10 ? 52 : 60;
    N.forEach((n, i) => {
      const s = ang.current + i * a;
      const isWin = i === win;
      x.beginPath();
      x.moveTo(C, C);
      x.arc(C, C, R, s, s + a);
      x.closePath();
      x.fillStyle = isWin ? WIN : win >= 0 ? DIM : N.length % 2 && i === N.length - 1 ? SLICE[2] : SLICE[i % 2];
      x.fill();
      x.strokeStyle = '#ffffff';
      x.lineWidth = 3;
      x.stroke();
      x.save();
      x.translate(C, C);
      const mid = s + a / 2;
      x.rotate(mid);
      x.fillStyle = isWin ? '#ffffff' : win >= 0 ? DIM_TEXT : INK;
      x.font = `700 ${isWin ? size + 6 : size}px ${FONT}`;
      // الاسم يمتد من قرب الحافة الخارجية نحو المركز. في النصف الأيسر يُقلب نصف دورة حتى لا يُقرأ مقلوبًا.
      // في RTL تعني «start» الحافة اليمنى و«end» اليسرى.
      if (Math.cos(mid) < 0) {
        x.rotate(Math.PI);
        x.textAlign = 'end';
        x.fillText(n, -(R - 28), 2);
      } else {
        x.textAlign = 'start';
        x.fillText(n, R - 28, 2);
      }
      x.restore();
    });
    x.beginPath();
    x.arc(C, C, R, 0, 2 * Math.PI);
    x.strokeStyle = INK;
    x.lineWidth = 12;
    x.stroke();
    x.beginPath();
    x.arc(C, C, 46, 0, 2 * Math.PI);
    x.fillStyle = INK;
    x.fill();
    // السهم خارج الحافة اليسرى يشير إلى الداخل
    const px = C - R;
    x.beginPath();
    x.moveTo(px + 22, C);
    x.lineTo(px - 52, C - 34);
    x.lineTo(px - 52, C + 34);
    x.closePath();
    x.fillStyle = INK;
    x.fill();
  }, []);

  /* الفصل أو الفريق تغيّر، أو أُرجعت أسماء: تُرسم القائمة الجديدة */
  const key = (klass?.id ?? '') + '|' + filter + '|' + list.join('\n');
  const lastKey = useRef(key);
  useEffect(() => {
    if (!open) return;
    const win = shown.current && shown.current.list[shown.current.win];
    // خروج الفائز وحده لا يمحو الرسمة الحالية
    if (lastKey.current !== key && !(win && !list.includes(win) && shown.current!.list.filter((n) => n !== win).join('\n') === list.join('\n'))) {
      shown.current = null;
      if (!spinning) setLive('');
    }
    lastKey.current = key;
    draw();
  }, [open, key, emptyMsg, draw]);

  useEffect(() => {
    if (open) return;
    shown.current = null;
    setLive('');
  }, [open]);

  const spin = () => {
    if (spinning) return;
    const N = list;
    if (!N.length) {
      if (klass && picked.length) onRestore?.();
      return;
    }
    shown.current = null;
    setSpinning(true);
    onResult?.('…');
    const a = (2 * Math.PI) / N.length;
    const pick = Math.floor(Math.random() * N.length);
    const target = POINTER - (pick * a + a / 2);
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const start = ang.current;
    const delta = (((target - start) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const total = delta + (reduce ? 0 : 2 * Math.PI * 5);
    const dur = reduce ? 1 : 4200;
    const t0 = performance.now();
    const under = () => N[Math.floor((((POINTER - ang.current) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) / a) % N.length];
    let last = under();
    let lastClick = 0;
    const f = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      ang.current = start + total * (1 - Math.pow(1 - p, 4));
      draw();
      const now = under();
      if (now !== last) {
        last = now;
        setLive(now);
        if (t - lastClick > 45) {
          lastClick = t;
          sClick();
        }
      }
      if (p < 1) return void requestAnimationFrame(f);
      shown.current = { list: N, win: pick };
      draw();
      setSpinning(false);
      setLive(N[pick]);
      onResult?.(N[pick]);
      sGood();
      if (remove) (klass ? onPick?.(N[pick]) : onNames(N.filter((_, i) => i !== pick).join('\n')));
    };
    requestAnimationFrame(f);
  };

  const lastSpin = useRef(spinReq);
  useEffect(() => {
    if (spinReq !== lastSpin.current && open) spin();
    lastSpin.current = spinReq;
  }, [spinReq, open]);

  const spinRef = useRef(spin);
  spinRef.current = spin;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        spinRef.current();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const done = !spinning && !!shown.current;
  return (
    <div className="wheel2" role="dialog" aria-label="عجلة الأسماء" data-left={list.length} data-pool={klass ? pool.length : list.length} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <canvas ref={cv} width={SIZE} height={SIZE} role="button" tabIndex={0} aria-label={list.length ? 'أدِر العجلة' : 'أرجع كل الأسماء'} onClick={spin} />
      <p className={'wname' + (done ? ' done' : spinning ? ' moving' : '')} aria-live="polite" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <span key={done ? live : 'x'}>{live || '؟'}</span>
      </p>
      <span className="sr-only">
        باقٍ {num(list.length)} من {num(klass ? pool.length : list.length)}
      </span>
    </div>
  );
}
