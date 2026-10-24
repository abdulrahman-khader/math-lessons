import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import { clock, num } from '../digits';
import { isMuted } from '../sound';
import { useRemoteWidget } from './Primary';

/* ---------- مقطع فكرة الدرس: مشهد متحرك قصير يُرسم من الزمن t ---------- */

/** مساحة الرسم داخل المقطع؛ المشهد يُكتب بهذه الإحداثيات ويتّسع مع الشاشة */
export const CLIP_W = 1400;
export const CLIP_H = 520;

export const ease = (x: number) => {
  x = Math.max(0, Math.min(1, x));
  return x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;
};
/** صفر قبل a، واحد بعد b، وانتقال ناعم بينهما */
export const tw = (t: number, a: number, b: number) => ease((t - a) / (b - a));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
/** شفافية عنصر يظهر عند a ويختفي عند b */
export const fade = (t: number, a: number, b = Infinity, f = 0.5) => Math.min(tw(t, a, a + f), 1 - tw(t, b - f, b));

/** قطاع دائري: الزوايا بالدرجات باتجاه عقارب الساعة من الأعلى */
export function sector(cx: number, cy: number, a0: number, a1: number, r: number) {
  if (r < 1) return '';
  const p = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${cx + r * Math.sin(a)},${cy - r * Math.cos(a)}`;
  };
  return `M${cx},${cy} L${p(a0)} A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(a1)} Z`;
}

/** طالب: رأس وكتفان، مركزه (x, y) */
export function Person({ x, y, s = 1, fill, label, labelOpacity = 1 }: { x: number; y: number; s?: number; fill: string; label?: string; labelOpacity?: number }) {
  if (s < 0.02) return null;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M-30,40 Q-30,4 0,4 Q30,4 30,40 Z" fill={fill} stroke="var(--ink)" strokeWidth={3} />
      <circle cy={-20} r={20} fill={fill} stroke="var(--ink)" strokeWidth={3} />
      {label && (
        <text y={80} fontSize={26} textAnchor="middle" opacity={labelOpacity}>
          {label}
        </text>
      )}
    </g>
  );
}

/** بطاقة نص داخل المشهد */
export function ClipCard({ x, y, w, h, op = 1, color = 'var(--hl)', children }: { x: number; y: number; w: number; h: number; op?: number; color?: string; children: ReactNode }) {
  if (op <= 0.01) return null;
  return (
    <g opacity={op}>
      <rect x={x} y={y} width={w} height={h} rx={22} fill="var(--paper)" stroke={color} strokeWidth={4} />
      {children}
    </g>
  );
}

/** كسر عمودي داخل SVG */
export function SvgFrac({ x, y, n, d, size = 44, color = 'var(--ink)' }: { x: number; y: number; n: number; d: number; size?: number; color?: string }) {
  return (
    <g>
      <text x={x} y={y - size * 0.2} fontSize={size} textAnchor="middle" fill={color}>
        {num(n)}
      </text>
      <rect x={x - size * 0.4} y={y - 2} width={size * 0.8} height={4} fill={color} />
      <text x={x} y={y + size * 0.85} fontSize={size} textAnchor="middle" fill={color}>
        {num(d)}
      </text>
    </g>
  );
}

/** عنوان افتتاحي يظهر في أول المقطع ثم يختفي عند until */
export function ClipTitle({ t, title, q, until = 4.2, size = 80 }: { t: number; title: string; q: string; until?: number; size?: number }) {
  const op = 1 - tw(t, until - 0.5, until);
  if (op <= 0.01) return null;
  return (
    <g opacity={op}>
      <text x={CLIP_W / 2} y={200} fontSize={size} textAnchor="middle" fill="var(--rule)" style={{ fontFamily: 'var(--display)' }}>
        {title}
      </text>
      <text x={CLIP_W / 2} y={310} fontSize={40} textAnchor="middle" direction="rtl">
        {q}
      </text>
    </g>
  );
}

export type EqPart = number | string | { v: number | string; color?: string; box?: boolean; op?: number };

/**
 * جملة عددية تُقرأ من اليمين كما في الكتاب: ١٠ − ٣ = ٧.
 * كل جزء يوضع في مكانه بنفسه، فلا يغيّر اتجاه النص ترتيب الأعداد.
 * show: كم جزءًا يظهر (من اليمين)، للإظهار التدريجي.
 */
export function SvgEq({ x, y, parts, size = 64, show = Infinity, color = 'var(--ink)' }: { x: number; y: number; parts: EqPart[]; size?: number; show?: number; color?: string }) {
  const items = parts.map((p) => {
    const o = typeof p === 'object' ? p : { v: p };
    const s = typeof o.v === 'number' ? num(o.v) : o.v;
    const w = o.box ? size * 1.25 : /[٠-٩]/.test(s) ? s.length * size * 0.58 : size * 0.7;
    return { ...o, s, w };
  });
  const gap = size * 0.28;
  const total = items.reduce((a, it) => a + it.w, 0) + gap * (items.length - 1);
  let edge = x + total / 2; // يبدأ من اليمين
  return (
    <g>
      {items.map((it, i) => {
        const cx = edge - it.w / 2;
        edge -= it.w + gap;
        const op = Math.max(0, Math.min(1, show - i)) * (it.op ?? 1);
        if (op <= 0.01) return null;
        return (
          <g key={i} opacity={op}>
            {it.box && <rect x={cx - it.w / 2} y={y - size * 0.95} width={it.w} height={size * 1.25} rx={10} fill="var(--paper)" stroke={it.color ?? 'var(--hl)'} strokeWidth={4} />}
            <text x={cx} y={y} fontSize={size} textAnchor="middle" fill={it.color ?? color}>
              {it.s}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/** مكعب مربع؛ crossed يشطبه بخط مائل */
export function Cube({ x, y, s = 44, color, op = 1, crossed = 0 }: { x: number; y: number; s?: number; color: string; op?: number; crossed?: number }) {
  if (op <= 0.01) return null;
  return (
    <g opacity={op}>
      <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={6} fill={color} stroke="var(--ink)" strokeWidth={2.5} />
      {crossed > 0 && <line x1={x - s * 0.6} y1={y + s * 0.6} x2={x - s * 0.6 + s * 1.2 * crossed} y2={y + s * 0.6 - s * 1.2 * crossed} stroke="var(--bad)" strokeWidth={6} strokeLinecap="round" />}
    </g>
  );
}

/** **كلمة** تُبرز في النص المرافق */
const rich = (s: string) => s.split('**').map((p, i) => (i % 2 ? <b key={i}>{p}</b> : <Fragment key={i}>{p}</Fragment>));
const plain = (s: string) => s.replace(/\*\*/g, '');
const mmss = (s: number) => clock(Math.floor(s));

/** صوت جملة واحدة من النص المرافق: الملف ومدته بالثواني (يولّدهما scripts/voice.mjs) */
export interface VoiceLine {
  src: string;
  d: number;
}

/*
 * عنصر صوت واحد لكل الصفحة: Safari على الآيباد لا يسمح بتشغيل الصوت إلا بعد لمسة،
 * فيُفتح هذا العنصر مرة واحدة مع أول لمسة، ويبقى مفتوحًا حتى لو شُغّل المقطع بعدها من الجوال.
 */
let shared: HTMLAudioElement | null = null;
/** ملف WAV صامت فارغ لفتح عنصر الصوت */
const SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
function voiceAudio() {
  if (shared) return shared;
  shared = new Audio();
  shared.preload = 'auto';
  // يُشغَّل صوت صامت قصير ثم يُوقف، إلا إذا بدأ المقطع صوته في أثناء ذلك (أول ضغطة تكون غالبًا زر التشغيل نفسه)
  const unlock = () => {
    const a = shared!;
    if (a.src) return;
    a.src = SILENT;
    a.play()
      .catch(() => {})
      .finally(() => {
        if (a.src === SILENT) a.pause();
      });
  };
  document.addEventListener('pointerdown', unlock, { once: true, capture: true });
  return shared;
}

export interface ClipProps {
  /** المدة بالثواني */
  duration: number;
  /** النص المرافق: [بداية بالثواني، نص]. **كلمة** تُبرز. */
  captions: [number, string][];
  /** المشهد عند اللحظة t، بإحداثيات CLIP_W × CLIP_H */
  scene: (t: number) => ReactNode;
  /** صوت كل جملة من captions بالترتيب (null = بلا صوت) */
  voice?: (VoiceLine | null)[];
}

/**
 * لا يبدأ إلا إذا شغّله المعلم (من السبورة أو الجوال)، ويتوقف إذا غادر الشريحة.
 * أزرار التشغيل والإيقاف تظهر أيضًا في الجوال.
 */
export function Clip({ duration, captions, scene, voice }: ClipProps) {
  const root = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const tRef = useRef(0);
  tRef.current = t;
  /** الجملة المحمَّلة في عنصر الصوت الآن (-١ = لا شيء) */
  const spoken = useRef(-1);
  const audio = voice?.length ? voiceAudio() : null;
  /** ما دام صوت جملة يُقرأ، لا يتقدم المقطع إلى الجملة التالية حتى ينتهي */
  const speaking = () => !!audio && spoken.current >= 0 && !audio.paused && !audio.ended;

  // لا يبدأ إلا بضغطة من المعلم، ويتوقف إذا غادر الشريحة
  useEffect(() => {
    const sec = root.current?.closest('section.slide');
    if (!sec) return;
    const mo = new MutationObserver(() => !sec.classList.contains('active') && setPlaying(false));
    mo.observe(sec, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    let raf = requestAnimationFrame(function frame(now) {
      let next = Math.min(duration, tRef.current + (now - last) / 1000);
      if (speaking()) next = Math.min(next, (captions[spoken.current + 1]?.[0] ?? duration) - 0.001);
      last = now;
      setT(next);
      if (next >= duration) setPlaying(false);
      else raf = requestAnimationFrame(frame);
    });
    return () => cancelAnimationFrame(raf);
  }, [playing, duration]);

  let ci = 0;
  captions.forEach(([s], i) => t >= s && (ci = i));

  // صوت الجملة الحالية: يبدأ مع ظهورها، ويتوقف مع الإيقاف
  useEffect(() => {
    if (!audio) return;
    const line = voice?.[ci];
    if (!playing || !line || isMuted()) {
      audio.pause();
      if (!line) spoken.current = -1;
      return;
    }
    const offset = tRef.current - captions[ci][0];
    if (spoken.current !== ci) {
      spoken.current = ci;
      audio.src = line.src;
      if (offset > 0.3 && offset < line.d) audio.currentTime = offset;
      if (offset >= line.d) return;
    }
    if (audio.paused && !audio.ended) audio.play().catch(() => {});
  }, [playing, ci]);
  // عند مغادرة الشريحة أو إزالة المقطع
  useEffect(() => () => audio?.pause(), []);

  const toggle = () => {
    if (!playing && tRef.current >= duration) setT(0);
    setPlaying(!playing);
  };
  const restart = () => {
    spoken.current = -1;
    setT(0);
    setPlaying(true);
  };
  const seek = (v: number) => {
    spoken.current = -1;
    audio?.pause();
    setT(Math.max(0, Math.min(duration, v)));
  };

  const cap = captions[ci]?.[1] ?? '';
  const ended = t >= duration;

  useRemoteWidget(
    () => ({
      title: 'مقطع فكرة الدرس',
      info: plain(cap) || (ended ? 'انتهى المقطع' : ''),
      steppers: [],
      buttons: [
        { key: 'play', label: playing ? 'إيقاف المقطع' : ended ? 'إعادة المقطع' : 'تشغيل المقطع', on: true },
        { key: 'restart', label: 'من البداية' },
      ],
    }),
    (k) => (k === 'play' ? toggle() : k === 'restart' && restart()),
    [playing, ci, ended],
  );

  return (
    <div className="clip" ref={root}>
      <div className="clip-scene">
        <svg viewBox={`0 0 ${CLIP_W} ${CLIP_H}`} aria-hidden="true">
          {scene(t)}
        </svg>
        {!playing && t === 0 && (
          <button className="clip-big" aria-label="تشغيل المقطع" onClick={(e) => (e.currentTarget.blur(), toggle())}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5 L8 19 L19 12 Z" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>
      <div className="clip-cap" key={ci}>
        <span>{rich(cap)}</span>
      </div>
      <div className="clip-bar">
        <button className="btn primary" onClick={(e) => (e.currentTarget.blur(), toggle())}>
          {playing ? 'إيقاف' : ended ? 'إعادة' : 'تشغيل'}
        </button>
        <button className="btn" onClick={(e) => (e.currentTarget.blur(), restart())}>
          من البداية
        </button>
        <div
          className="clip-track"
          role="slider"
          aria-label="موضع المقطع"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={Math.round(t)}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            seek(((r.right - e.clientX) / r.width) * duration);
          }}
        >
          <div className="clip-fill" style={{ inlineSize: `${(t / duration) * 100}%` }} />
        </div>
        <span className="clip-time">
          {mmss(t)} / {mmss(duration)}
        </span>
      </div>
    </div>
  );
}
