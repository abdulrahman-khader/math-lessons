import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

const COLORS = [
  { c: '#e03131', label: 'أحمر' },
  { c: '#1864ab', label: 'أزرق' },
  { c: '#2b8a3e', label: 'أخضر' },
];

interface Props {
  active: boolean;
  onClose: () => void;
  slide: number;
  /** يتغير عند تغيّر حجم المسرح أو وضع العرض */
  layoutKey: string;
  main: RefObject<HTMLElement>;
}

/** قلم فوق الشريحة؛ لكل شريحة رسمها المحفوظ حتى نهاية الحصة. */
export function Pen({ active, onClose, slide, layoutKey, main }: Props) {
  const cv = useRef<HTMLCanvasElement>(null);
  const store = useRef<Record<number, string>>({});
  const [color, setColor] = useState('#e03131');
  const drawing = useRef<{ x: number; y: number } | null>(null);
  const shown = useRef(slide);

  const size = () => {
    const c = cv.current;
    const m = main.current;
    if (!c || !m) return;
    const flow = document.body.classList.contains('flow');
    const w = m.clientWidth;
    const h = flow ? (m.querySelector<HTMLElement>('.slide.active')?.scrollHeight ?? m.clientHeight) : m.clientHeight;
    if (c.width !== w || c.height !== h) {
      c.width = w;
      c.height = h;
    }
    c.style.height = h + 'px';
  };
  const save = (i: number) => {
    try {
      if (cv.current) store.current[i] = cv.current.toDataURL();
    } catch {
      /* تجاهل */
    }
  };
  const load = (i: number) => {
    const c = cv.current;
    const x = c?.getContext('2d');
    if (!c || !x) return;
    x.clearRect(0, 0, c.width, c.height);
    const d = store.current[i];
    if (d) {
      const im = new Image();
      im.onload = () => x.drawImage(im, 0, 0);
      im.src = d;
    }
  };

  // عند تغيير الشريحة أو الحجم: احفظ رسم الشريحة السابقة وحمّل رسم الحالية
  useLayoutEffect(() => {
    save(shown.current);
    shown.current = slide;
    size();
    load(slide);
  }, [slide, layoutKey]);

  useEffect(() => {
    document.body.classList.toggle('pen', active);
  }, [active]);

  const pos = (e: React.PointerEvent) => {
    const c = cv.current!;
    const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) * c.width) / r.width, y: ((e.clientY - r.top) * c.height) / r.height };
  };

  return (
    <>
      <canvas
        ref={cv}
        id="ink"
        onPointerDown={(e) => {
          drawing.current = pos(e);
          cv.current!.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const last = drawing.current;
          const x = cv.current?.getContext('2d');
          if (!last || !x) return;
          const p = pos(e);
          x.lineCap = 'round';
          x.lineJoin = 'round';
          if (color === 'hl') {
            x.globalAlpha = 0.35;
            x.strokeStyle = '#ffd43b';
            x.lineWidth = 30;
          } else {
            x.globalAlpha = 1;
            x.strokeStyle = color;
            x.lineWidth = 5;
          }
          x.beginPath();
          x.moveTo(last.x, last.y);
          x.lineTo(p.x, p.y);
          x.stroke();
          drawing.current = p;
        }}
        onPointerUp={() => (drawing.current = null)}
        onPointerCancel={() => (drawing.current = null)}
      />
      <div id="penbar" aria-label="أدوات القلم">
        {COLORS.map((k) => (
          <button key={k.c} className={color === k.c ? 'sel' : ''} aria-label={k.label} onClick={() => setColor(k.c)}>
            <span className="sw" style={{ background: k.c }} />
          </button>
        ))}
        <button className={color === 'hl' ? 'sel' : ''} aria-label="تظليل" onClick={() => setColor('hl')}>
          <span className="sw" style={{ background: '#ffd43b', borderRadius: '.2em' }} />
        </button>
        <button
          aria-label="مسح"
          onClick={() => {
            const c = cv.current;
            c?.getContext('2d')?.clearRect(0, 0, c.width, c.height);
            delete store.current[slide];
          }}
        >
          مسح
        </button>
        <button aria-label="إغلاق القلم" onClick={onClose}>
          ✕
        </button>
      </div>
    </>
  );
}
