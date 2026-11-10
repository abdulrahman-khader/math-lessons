import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { num } from '../digits';
import TENS from '../voice/tens';
import { hush, rich, speak } from './Clip';
import { useRemoteWidget } from './Primary';

/*
 * الأصابع: كل إصبع = ١٠. يدان على الشاشة، كل ضغطة «التالي» تشغّل خطوة:
 * ٠ كل إصبع عشرة (عمود من ١٠ حبات) ← ١ اليد الأولى تعدّ ← ٢ اليد الثانية ← ٣ نعدّ الأصابع كلها ← ٤ الجملة.
 * الصوت يعدّ بالعشرات (src/engine/voice/tens، يولّده npm run voice -- --words).
 * المعلم يغيّر عدد أصابع كل يد (١–٥) من السبورة أو الجوال، فيرجع العرض إلى البداية.
 */

const SK = '#F4C9A6';
const SKL = '#FADBC0';
const SKD = '#DFA07A';
const SKS = '#B06F4C';
const NAIL = '#F9DCCF';
const CR = '#C4855F';
const HC = [
  { f: '#FBEAF0', s: '#D4537E', t: '#993556' },
  { f: '#E6F1FB', s: '#378ADD', t: '#185FA5' },
];
/** خط مفاصل الأصابع (أعلى ظهر الكف) */
const K = 196;

/** «٣ عَشَرَاتٍ» بالعدّ العربي الصحيح */
export const tensText = (n: number) => (n === 1 ? 'عَشَرَةٌ وَاحِدَةٌ' : n === 2 ? 'عَشَرَتَانِ' : `${num(n)} عَشَرَاتٍ`);

function Badge({ x, y, txt, c, big }: { x: number; y: number; txt: string; c: (typeof HC)[0]; big: boolean }) {
  const r = big ? 24 : 19;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#fff" stroke={c.s} strokeWidth={big ? 4 : 3} />
      <text x={x} y={y + (big ? 8 : 6)} textAnchor="middle" fontSize={big ? 22 : 17} fontWeight={700} fill={c.t}>
        {txt}
      </text>
    </g>
  );
}

/** شكل إصبع (من ظهر اليد) قاعدته عند (٠، ٠) وطرفه عند −h: يضيق قليلًا نحو طرفه */
const fingerPath = (w: number, h: number) => {
  const r = w / 2;
  const t = r * 0.84;
  return `M${-r} 30 L${-r} 0 C${-r} ${-h * 0.5} ${-t} ${-h + t * 1.6} ${-t} ${-h + t} Q${-t} ${-h} 0 ${-h} Q${t} ${-h} ${t} ${-h + t} C${t} ${-h + t * 1.6} ${r} ${-h * 0.5} ${r} 0 L${r} 30Z`;
};

interface Part {
  key: string;
  x: number;
  y: number;
  rot: number;
  w: number;
  h: number;
  /** مرفوع: ظفر وتجاعيد مفصلين؛ مقبوض: لا يظهر منه إلا بروز المفصل عند حافة الكف، فلا يبرز شيء زائد */
  up: boolean;
  thumb?: boolean;
}

/** تفاصيل الإصبع فوق لونه: الظفر وتجاعيد المفاصل، أو ظل المفصل المقبوض */
function FingerDetail({ p }: { p: Part }) {
  const { w, h } = p;
  const r = w / 2;
  const t = r * 0.84;
  if (!p.up)
    return (
      <g transform={`translate(${p.x} ${p.y}) rotate(${p.rot})`}>
        {/* المفصل المقبوض: أعلاه مضيء وأسفله ظل الانثناء */}
        <ellipse cx={0} cy={-h + 6} rx={r * 0.55} ry={3.5} fill={SKL} opacity={0.8} />
      </g>
    );
  const nl = Math.min(h * 0.3, w * 0.95);
  return (
    <g transform={`translate(${p.x} ${p.y}) rotate(${p.rot})`}>
      {/* الظفر: لونه أفتح، وفيه هلال عند قاعدته ولمعة */}
      <path d={`M${-t + 4} ${-h + t + 2} Q${-t + 4} ${-h + 4} 0 ${-h + 4} Q${t - 4} ${-h + 4} ${t - 4} ${-h + t + 2} L${t - 4.5} ${-h + nl} Q0 ${-h + nl + 4} ${-t + 4.5} ${-h + nl}Z`} fill={NAIL} stroke={CR} strokeWidth={1.2} />
      <path d={`M${-t + 7} ${-h + nl - 3} Q0 ${-h + nl + 1} ${t - 7} ${-h + nl - 3}`} stroke="#fff" strokeWidth={2} fill="none" opacity={0.6} />
      <path d={`M${-t * 0.35} ${-h + 9} L${-t * 0.35} ${-h + nl * 0.6}`} stroke="#fff" strokeWidth={2.5} strokeLinecap="round" opacity={0.55} />
      {/* تجاعيد المفصل الأوسط والأعلى */}
      {!p.thumb && (
        <g stroke={CR} fill="none" strokeLinecap="round">
          <path d={`M${-r + 5} ${-h * 0.5} q${r * 0.5} -4 ${r - 2} 0 q${r * 0.5} 4 ${r - 3} 0`} strokeWidth={1.6} opacity={0.75} />
          <path d={`M${-r + 7} ${-h * 0.46} q${r - 7} 3 ${w - 14} 0`} strokeWidth={1.2} opacity={0.5} />
          <path d={`M${-r + 7} ${-h * 0.73} q${r - 7} 3 ${w - 14} 0`} strokeWidth={1.2} opacity={0.5} />
        </g>
      )}
      {p.thumb && <path d={`M${-r + 6} ${-h * 0.55} q${r - 6} 4 ${w - 12} 0`} stroke={CR} strokeWidth={1.4} fill="none" strokeLinecap="round" opacity={0.65} />}
      {/* لمعة على طول الإصبع */}
      <path d={`M${-r * 0.45} ${-h * 0.12} L${-r * 0.4} ${-h * 0.42}`} stroke={SKL} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
    </g>
  );
}

/**
 * يد من ظهرها. كل ما هو جلد يُرسم مرتين: حدّ سميك تحت ثم لون فوقه، فتلتحم الأصابع بالكف في شكل واحد بلا خطوط بينها.
 * base أول خانة لها في up/lab، dir يقلبها (الأولى عن اليمين، والثانية عن اليسار).
 */
function Hand({ cx, dir, base, c, up, lab, hi, g, gp }: { cx: number; dir: 1 | -1; base: number; c: (typeof HC)[0]; up: boolean[]; lab: string[]; hi: number; g: string; gp: string }) {
  // الأصابع من الخنصر إلى السبابة بأطوالها الحقيقية تقريبًا، تنفرج قليلًا
  const F = [
    { o: 47, w: 24, h: 70, rot: 9 },
    { o: 18, w: 27, h: 92, rot: 3 },
    { o: -12, w: 28, h: 102, rot: -1 },
    { o: -41, w: 27, h: 92, rot: -5 },
  ];
  const parts: Part[] = F.map((f, i) => {
    const gi = base + (dir > 0 ? i : 4 - i);
    const isUp = up[gi];
    return { key: `f${gi}`, x: cx + f.o * dir, y: K + 6, rot: f.rot * dir, w: f.w, h: isUp ? f.h : 13, up: isUp };
  });
  const ti = base + (dir > 0 ? 4 : 0);
  const tUp = up[ti];
  const thumb: Part = tUp
    ? { key: 'th', x: cx - 56 * dir, y: K + 74, rot: -44 * dir, w: 30, h: 76, up: true, thumb: true }
    : { key: 'th', x: cx - 56 * dir, y: K + 78, rot: -38 * dir, w: 28, h: 20, up: false, thumb: true };
  const all = [...parts, thumb];
  const palm = `M${cx - 62} ${K - 2} C${cx - 70} ${K + 40} ${cx - 64} ${K + 80} ${cx - 48} ${K + 104} L${cx + 48} ${K + 104} C${cx + 64} ${K + 80} ${cx + 70} ${K + 40} ${cx + 62} ${K - 2} Q${cx} ${K - 18} ${cx - 62} ${K - 2}Z`;
  const shape = (fill: string, stroke?: string) => (
    <g fill={fill} stroke={stroke} strokeWidth={stroke ? 5 : 0} strokeLinejoin="round">
      {all.map((p) => (
        <path key={p.key} d={fingerPath(p.w, p.h)} transform={`translate(${p.x} ${p.y}) rotate(${p.rot})`} fill={stroke ? fill : `url(#${g})`} />
      ))}
      <path d={palm} fill={stroke ? fill : `url(#${gp})`} />
    </g>
  );
  const labels: ReactNode[] = [];
  all.forEach((p) => {
    const gi = p.thumb ? ti : Number(p.key.slice(1));
    if (!p.up || !lab[gi]) return;
    const a = (p.rot * Math.PI) / 180;
    const d = p.h + 26;
    labels.push(<Badge key={p.key} x={p.x + Math.sin(a) * d} y={p.y - Math.cos(a) * d} txt={lab[gi]} c={c} big={hi === gi} />);
  });
  return (
    <g>
      {/* ظل اليد */}
      <ellipse cx={cx} cy={K + 108} rx={70} ry={8} fill="#000" opacity={0.08} />
      {shape(SKS, SKS)}
      {shape(SK)}
      {/* ظهر الكف: بروز المفاصل، وأوتار خفيفة، وظل جهة الإبهام */}
      {parts.map((p) => (
        <ellipse key={p.key} cx={p.x} cy={K + 6} rx={p.w * 0.32} ry={5} fill={SKL} opacity={p.up ? 0.7 : 0.4} />
      ))}
      {parts.map((p) => (
        <path key={p.key} d={`M${p.x} ${K + 18} Q${p.x + (cx - p.x) * 0.3} ${K + 60} ${cx + (p.x - cx) * 0.35} ${K + 96}`} stroke={CR} strokeWidth={1.5} fill="none" opacity={0.22} />
      ))}
      <path d={`M${cx - 60 * dir} ${K + 36} C${cx - 66 * dir} ${K + 66} ${cx - 54 * dir} ${K + 88} ${cx - 40 * dir} ${K + 100}`} stroke={SKD} strokeWidth={8} fill="none" opacity={0.5} strokeLinecap="round" />
      {/* ظل خفيف بين الأصابع المرفوعة */}
      {parts.slice(0, -1).map((p, i) =>
        p.up && parts[i + 1].up ? <path key={p.key} d={`M${(p.x + parts[i + 1].x) / 2} ${K - 4} l0 -14`} stroke={SKS} strokeWidth={2} opacity={0.35} strokeLinecap="round" /> : null,
      )}
      {all.map((p) => (
        <FingerDetail key={p.key} p={p} />
      ))}
      {/* الكمّ: لونه لون اليد */}
      <path d={`M${cx - 54} ${K + 98} L${cx + 54} ${K + 98} L${cx + 62} ${K + 150} L${cx - 62} ${K + 150}Z`} fill={c.f} stroke={c.s} strokeWidth={2.5} />
      <rect x={cx - 58} y={K + 94} width={116} height={16} rx={6} fill={c.s} />
      {labels}
    </g>
  );
}

const LAST = 4;

export function Fingers({ a: a0, b: b0 }: { a: number; b: number }) {
  const [a, setA] = useState(a0);
  const [b, setB] = useState(b0);
  const [step, setStep] = useState(0);
  const [up, setUp] = useState<boolean[]>(() => Array(10).fill(false));
  const [lab, setLab] = useState<string[]>(() => Array(10).fill(''));
  const [hi, setHi] = useState(-1);
  const [cap, setCap] = useState<string>('كُلُّ إِصْبَعٍ = **١٠**');
  const run = useRef(0);
  const root = useRef<HTMLDivElement>(null);
  const gid = 'sk' + useId().replace(/:/g, '');

  // يتوقف العدّ إذا غادر المعلم الشريحة
  useEffect(() => {
    const sec = root.current?.closest('section.slide');
    if (!sec) return;
    const mo = new MutationObserver(() => {
      if (!sec.classList.contains('active')) {
        run.current++;
        hush();
      }
    });
    mo.observe(sec, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  const play = async (s: number, A = a, Bn = b) => {
    const id = ++run.current;
    const ok = () => id === run.current;
    hush();
    const u = Array(10).fill(false) as boolean[];
    const l = Array(10).fill('') as string[];
    const show = (h = -1) => {
      setUp([...u]);
      setLab([...l]);
      setHi(h);
    };
    const say = (i: number) => speak(TENS[i].src, TENS[i].d);
    setStep(s);
    if (s === 0) {
      show();
      setCap('كُلُّ إِصْبَعٍ = **١٠**');
      await say(0);
      return;
    }
    // ما سبق هذه الخطوة يظهر جاهزًا
    if (s >= 2) for (let i = 0; i < A; i++) (u[i] = true), (l[i] = num((i + 1) * 10));
    if (s >= 3) for (let i = 0; i < Bn; i++) u[5 + i] = true;
    if (s === 3) l.fill('');
    if (s === 1 || s === 2) {
      const n = s === 1 ? A : Bn;
      const at = s === 1 ? 0 : 5;
      show();
      setCap(s === 1 ? 'الْيَدُ الْأُولَى' : 'الْيَدُ الثَّانِيَةُ');
      for (let i = 1; i <= n; i++) {
        if (!ok()) return;
        u[at + i - 1] = true;
        l[at + i - 1] = num(i * 10);
        show(at + i - 1);
        setCap(`**${num(i * 10)}**`);
        await say(i);
      }
      if (!ok()) return;
      show();
      setCap(`${s === 1 ? 'الْيَدُ الْأُولَى' : 'الْيَدُ الثَّانِيَةُ'}: ${tensText(n)} = **${num(n * 10)}**`);
      return;
    }
    if (s === 3) {
      show();
      setCap('نَعُدُّ الْأَصَابِعَ كُلَّهَا');
      const seq = [...Array.from({ length: A }, (_, i) => i), ...Array.from({ length: Bn }, (_, i) => 5 + i)];
      for (let k = 0; k < seq.length; k++) {
        if (!ok()) return;
        l[seq[k]] = num((k + 1) * 10);
        show(seq[k]);
        setCap(`**${num((k + 1) * 10)}**`);
        await say(k + 1);
      }
      if (ok()) show();
      return;
    }
    // الجملة: بالعشرات ثم بالأعداد
    for (let k = 0; k < seq0(A, Bn).length; k++) l[seq0(A, Bn)[k]] = num((k + 1) * 10);
    show();
    setCap(`${tensText(A)} + ${tensText(Bn)} = **${tensText(A + Bn)}**|${num(A * 10)} + ${num(Bn * 10)} = **${num((A + Bn) * 10)}**`);
  };

  const next = () => play(Math.min(LAST, step + 1));
  const again = () => play(step);
  const reset = () => play(0);
  const setHand = (k: 'a' | 'b', v: number) => {
    const n = Math.max(1, Math.min(5, v));
    const A = k === 'a' ? n : a;
    const Bn = k === 'b' ? n : b;
    setA(A);
    setB(Bn);
    run.current++;
    hush();
    setUp(Array(10).fill(false));
    setLab(Array(10).fill(''));
    setHi(-1);
    setStep(0);
    setCap('كُلُّ إِصْبَعٍ = **١٠**');
  };

  useRemoteWidget(
    () => ({
      title: 'الأصابع',
      info: `${num(a * 10)} + ${num(b * 10)}`,
      steppers: [
        { key: 'a', label: 'اليد الأولى', value: a, min: 1, max: 5, color: HC[0].s },
        { key: 'b', label: 'اليد الثانية', value: b, min: 1, max: 5, color: HC[1].s },
      ],
      buttons: [
        { key: 'next', label: 'التالي', disabled: step >= LAST },
        { key: 'again', label: 'أعد الخطوة' },
        { key: 'reset', label: 'من البداية' },
      ],
    }),
    (k, v) => {
      if ((k === 'a' || k === 'b') && v !== undefined) setHand(k, v);
      else if (k === 'next') next();
      else if (k === 'again') again();
      else if (k === 'reset') reset();
    },
    [a, b, step],
  );

  const na = up.slice(0, 5).filter(Boolean).length;
  const nb = up.slice(5).filter(Boolean).length;
  const [cap1, cap2] = cap.split('|');
  return (
    <div className="fingers" ref={root}>
      <svg viewBox="0 0 700 340" role="img" aria-label={`يدان: ${tensText(na)} و${tensText(nb)}`}>
        <defs>
          <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={SKD} />
            <stop offset="0.38" stopColor={SKL} />
            <stop offset="0.7" stopColor={SK} />
            <stop offset="1" stopColor={SKD} />
          </linearGradient>
          <radialGradient id={gid + 'p'} cx="0.45" cy="0.35" r="0.75">
            <stop offset="0" stopColor={SKL} />
            <stop offset="0.6" stopColor={SK} />
            <stop offset="1" stopColor={SKD} />
          </radialGradient>
        </defs>
        <Hand cx={510} dir={1} base={0} c={HC[0]} up={up} lab={lab} hi={hi} g={gid} gp={gid + 'p'} />
        <Hand cx={190} dir={-1} base={5} c={HC[1]} up={up} lab={lab} hi={hi} g={gid} gp={gid + 'p'} />
        {na > 0 && (
          <text x={510} y={332} textAnchor="middle" fontSize={28} fontWeight={800} fill={HC[0].t}>
            {num(na * 10)}
          </text>
        )}
        {nb > 0 && (
          <text x={190} y={332} textAnchor="middle" fontSize={28} fontWeight={800} fill={HC[1].t}>
            {num(nb * 10)}
          </text>
        )}
        {step === 0 && (
          <g>
            <rect x={326} y={70} width={48} height={200} rx={10} fill={HC[0].f} stroke={HC[0].s} strokeWidth={2.5} />
            {Array.from({ length: 10 }, (_, i) => (
              <circle key={i} cx={350} cy={88 + i * 18.5} r={7} fill={HC[0].s} />
            ))}
            <text x={350} y={56} textAnchor="middle" fontSize={26} fontWeight={700} fill={HC[0].t}>
              {num(10)}
            </text>
          </g>
        )}
      </svg>
      <div className="fcap" aria-live="polite">
        <span>{rich(cap1)}</span>
        {cap2 && (
          <span className="eq fcap2">
            {rich(cap2)}
          </span>
        )}
      </div>
      <div className="hopx-ctrl">
        <button className="btn primary" disabled={step >= LAST} onClick={(e) => (e.currentTarget.blur(), next())}>
          التالي
        </button>
        <button className="btn" onClick={(e) => (e.currentTarget.blur(), again())}>
          أعد الخطوة
        </button>
        <button className="btn" onClick={(e) => (e.currentTarget.blur(), reset())}>
          من البداية
        </button>
        {(['a', 'b'] as const).map((k, i) => (
          <div className="ffstep" key={k} style={{ color: HC[i].t }}>
            <span>{i ? 'الْيَدُ الثَّانِيَةُ' : 'الْيَدُ الْأُولَى'}</span>
            <button aria-label="إنقاص الأصابع" disabled={(k === 'a' ? a : b) <= 1} onClick={() => setHand(k, (k === 'a' ? a : b) - 1)}>
              −
            </button>
            <b>{num(k === 'a' ? a : b)}</b>
            <button aria-label="زيادة الأصابع" disabled={(k === 'a' ? a : b) >= 5} onClick={() => setHand(k, (k === 'a' ? a : b) + 1)}>
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/** ترتيب العدّ: أصابع اليد الأولى ثم الثانية */
const seq0 = (A: number, Bn: number) => [...Array.from({ length: A }, (_, i) => i), ...Array.from({ length: Bn }, (_, i) => 5 + i)];
