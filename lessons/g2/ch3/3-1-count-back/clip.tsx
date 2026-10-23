import { Clip, ClipTitle, SvgEq, fade, num, tw } from '@engine';

/* مقطع فكرة الدرس: النحلة تقفز إلى الخلف على خط الأعداد (مثال غير مثال الكتاب): ٩ − ٤ = ٥، ثم ٧ − ٣ = ٤ */

const Y = 330;
const X = (v: number) => 150 + v * 110; // خط الأعداد من اليسار كما في الكتاب
const HOP = 1.8;

/** [البداية، العدد الأكبر، المطروح] */
const PROBS: [number, number, number][] = [
  [8, 9, 4],
  [27, 7, 3],
];

function Bee({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={-6} cy={-22} rx={14} ry={10} fill="#dff3ff" stroke="var(--ink)" strokeWidth={2} />
      <ellipse cx={8} cy={-24} rx={14} ry={10} fill="#dff3ff" stroke="var(--ink)" strokeWidth={2} />
      <ellipse cx={0} cy={0} rx={26} ry={18} fill="#ffd23f" stroke="var(--ink)" strokeWidth={3} />
      <rect x={-6} y={-17} width={7} height={34} fill="var(--ink)" />
      <rect x={8} y={-15} width={6} height={30} fill="var(--ink)" />
      <circle cx={-16} cy={-4} r={3.5} fill="var(--ink)" />
    </g>
  );
}

function scene(t: number) {
  const p = [...PROBS].reverse().find(([s]) => t >= s - 4) ?? PROBS[0];
  const [s, a, b] = p;
  const line = tw(t, 6.5, 7.3);
  const hopsDone = Math.max(0, Math.min(b, (t - (s + 3)) / HOP));
  const k = Math.floor(hopsDone);
  const f = tw(hopsDone - k, 0, 0.8);
  // موضع النحلة: على قوس القفزة الحالية
  const from = a - k;
  const bx = k >= b ? X(a - b) : X(from) + (X(from - 1) - X(from)) * f;
  const by = k >= b ? Y - 34 : Y - 34 - Math.sin(Math.PI * f) * 80;
  const done = tw(t, s + 3 + b * HOP + 0.3, s + 3 + b * HOP + 0.9);
  const probOp = fade(t, s - 3.5, p === PROBS[0] ? PROBS[1][0] - 4 : 99);
  return (
    <>
      <ClipTitle t={t} title="الطَّرْحُ بِالْعَدِّ التَّنَازُلِيِّ" q="كيف نطرح بالقفز إلى الخلف؟" />

      <g opacity={probOp}>
        <SvgEq x={700} y={110} size={72} parts={[a, '−', b, '=', { v: done > 0.5 ? a - b : '؟', box: true }]} />
      </g>

      {/* خط الأعداد */}
      <g opacity={line}>
        <line x1={X(0) - 50} y1={Y} x2={X(10) + 50} y2={Y} stroke="var(--ink)" strokeWidth={4} />
        <path d={`M${X(0) - 50},${Y} l18,-11 M${X(0) - 50},${Y} l18,11 M${X(10) + 50},${Y} l-18,-11 M${X(10) + 50},${Y} l-18,11`} stroke="var(--ink)" strokeWidth={4} fill="none" />
        {Array.from({ length: 11 }, (_, v) => (
          <g key={v}>
            <line x1={X(v)} y1={Y - 14} x2={X(v)} y2={Y + 14} stroke="var(--ink)" strokeWidth={3} />
            <text x={X(v)} y={Y + 56} fontSize={38} textAnchor="middle" fill={v === a - b && done > 0.5 ? 'var(--hl)' : undefined}>{num(v)}</text>
          </g>
        ))}
      </g>

      {/* البداية */}
      {t > s && probOp > 0.01 && (
        <g opacity={probOp}>
          <circle cx={X(a)} cy={Y + 44} r={32} fill="none" stroke="var(--rule)" strokeWidth={4} opacity={tw(t, s, s + 0.5)} />
          {Array.from({ length: Math.min(b, k + (f > 0 ? 1 : 0)) }, (_, j) => {
            const x0 = X(a - j), x1 = X(a - j - 1);
            const part = j < k ? 1 : f;
            return (
              <g key={j}>
                <path d={`M${x0},${Y - 8} Q${(x0 + x1) / 2},${Y - 120} ${x1},${Y - 8}`} fill="none" stroke="var(--hl)" strokeWidth={4} strokeDasharray="10 8" opacity={part} />
                <text x={(x0 + x1) / 2} y={Y - 80} fontSize={30} textAnchor="middle" fill="var(--hl)" opacity={part}>{num(j + 1)}</text>
              </g>
            );
          })}
          {done > 0 && <circle cx={X(a - b)} cy={Y} r={12} fill="var(--hl)" opacity={done} />}
          <Bee x={bx} y={by} />
        </g>
      )}
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={43}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'نريد أن نجد ناتج الطرح: ٩ − ٤'],
      [8, 'نبدأ من العدد الأكبر **٩**'],
      [11, 'نعدّ إلى الخلف **٤** قفزات: ٨، ٧، ٦، ٥'],
      [19.5, 'وقفنا عند **٥**، إذن ٩ − ٤ = ٥'],
      [23.5, 'لنجرّب: ٧ − ٣'],
      [27, 'نبدأ من **٧**'],
      [30, 'نعدّ إلى الخلف **٣** قفزات: ٦، ٥، ٤'],
      [36.5, 'وقفنا عند **٤**، إذن ٧ − ٣ = ٤'],
      [39.5, 'نعدّ **إلى الخلف** لنطرح'],
    ]}
  />
);
