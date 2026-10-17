import { useCallback, useEffect, useRef, useState } from 'react';
import { digits } from '../digits';
import { sGood } from '../sound';

const COLORS = ['#a5d8ff', '#b2f2bb', '#ffd8a8', '#d0bfff', '#ffec99', '#99e9f2', '#fcc2d7', '#c0eb75'];
const DEFAULT_NAMES = Array.from({ length: 25 }, (_, i) => 'رقم ' + digits(i + 1)).join('\n');

interface Props {
  open: boolean;
  onClose: () => void;
  names: string;
  onNames: (s: string) => void;
}

/** عجلة أسماء عشوائية. النص على Canvas يحتاج ctx.direction = 'rtl' صراحةً؛ لا يرثه من الصفحة. */
export function WheelModal({ open, onClose, names, onNames }: Props) {
  const cv = useRef<HTMLCanvasElement>(null);
  const ang = useRef(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('—');
  const [remove, setRemove] = useState(false);
  const text = names || DEFAULT_NAMES;
  const list = text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
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
      x.fillText('أضف أسماء', C, C);
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
      x.rotate(s + a / 2);
      x.fillStyle = '#13213b';
      x.font = `bold ${N.length > 18 ? 20 : 26}px Tajawal, Tahoma`;
      // في RTL تعني «start» الحافة اليمنى: يبدأ الاسم من قرب الحافة الخارجية ويتجه نحو المركز
      x.textAlign = 'start';
      x.fillText(n, R - 16, 8);
      x.restore();
    });
    x.beginPath();
    x.arc(C, C, 34, 0, 2 * Math.PI);
    x.fillStyle = '#13213b';
    x.fill();
  }, []);

  useEffect(() => {
    if (open) draw();
  }, [open, text, draw]);

  const spin = () => {
    const N = list;
    if (!N.length || spinning) return;
    setSpinning(true);
    setResult('…');
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
      sGood();
      if (remove) setTimeout(() => onNames(N.filter((_, i) => i !== pick).join('\n')), 900);
    };
    requestAnimationFrame(f);
  };

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
            <input type="checkbox" checked={remove} onChange={(e) => setRemove(e.target.checked)} style={{ width: '1.3em', height: '1.3em' }} /> احذف الاسم بعد
            اختياره
          </label>
          <label htmlFor="wnames" style={{ fontWeight: 800 }}>
            الأسماء (اسم في كل سطر):
          </label>
          <textarea id="wnames" value={text} onChange={(e) => onNames(e.target.value)} />
          <button className="btn hide" onClick={onClose}>
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
