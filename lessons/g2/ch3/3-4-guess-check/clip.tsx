import { Clip, ClipTitle, num, tw } from '@engine';

/* مقطع فكرة الدرس: قطط حديقة الحيوانات (أستعد ص ٦٨): ٩ قطط، السوداء أكثر من البنية بـ ٣ */

const BROWN = '#a0673a', BLACK = '#2b2b33', GREY = '#c9d4e3';
const catX = (i: number) => 700 + (4 - i) * 125;
/** [البداية، البنية] */
const GUESSES: [number, number][] = [
  [15, 2],
  [23, 3],
];
const COLS = [1040, 815, 590, 365];
const HEADS = ['البنية', 'السوداء', 'المجموع', 'أتحقّق'];

function Cat({ x, y, color, s = 1, op = 1 }: { x: number; y: number; color: string; s?: number; op?: number }) {
  if (op <= 0.01) return null;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} opacity={op}>
      <ellipse cx={0} cy={34} rx={30} ry={26} fill={color} stroke="var(--ink)" strokeWidth={2.5} />
      <path d="M-24,-10 L-20,-44 L-4,-24 Z M24,-10 L20,-44 L4,-24 Z" fill={color} stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
      <circle cx={0} cy={-6} r={26} fill={color} stroke="var(--ink)" strokeWidth={2.5} />
      <circle cx={-9} cy={-9} r={4} fill={color === BLACK ? '#ffd23f' : 'var(--ink)'} />
      <circle cx={9} cy={-9} r={4} fill={color === BLACK ? '#ffd23f' : 'var(--ink)'} />
    </g>
  );
}

function scene(t: number) {
  const g = [...GUESSES].reverse().find(([s]) => t >= s);
  const brown = g ? g[1] : 0;
  const black = brown + 3;
  const table = tw(t, 13, 13.6);
  return (
    <>
      <ClipTitle t={t} size={64} title="أَحُلُّ الْمَسْأَلَةَ: أُخَمِّنُ وَأَتَحَقَّقُ" q="كم قطة بنية؟ وكم قطة سوداء؟" />

      {Array.from({ length: 9 }, (_, i) => {
        const color = !g ? GREY : i < brown ? BROWN : i < brown + black ? BLACK : GREY;
        const extra = g && i >= brown + black;
        return <Cat key={i} x={catX(i)} y={110} color={color} s={0.95} op={tw(t, 4.5 + i * 0.15, 4.9 + i * 0.15) * (extra ? 0.45 : 1)} />;
      })}

      {table > 0.01 && (
        <g opacity={table}>
          <rect x={250} y={230} width={900} height={250} rx={14} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
          <rect x={250} y={230} width={900} height={60} rx={14} fill="var(--rule-t)" stroke="var(--ink)" strokeWidth={3} />
          {[1, 2, 3].map((k) => (
            <line key={k} x1={1150 - k * 225} y1={230} x2={1150 - k * 225} y2={480} stroke="var(--line)" strokeWidth={2} />
          ))}
          <line x1={250} y1={385} x2={1150} y2={385} stroke="var(--line)" strokeWidth={2} />
          {HEADS.map((h, k) => (
            <text key={h} x={COLS[k]} y={272} fontSize={30} textAnchor="middle">{h}</text>
          ))}
          {GUESSES.map(([s, b], r) => {
            const y = 352 + r * 95;
            const ok = b + b + 3 === 9;
            return (
              <g key={s}>
                <text x={COLS[0]} y={y} fontSize={44} textAnchor="middle" fill={BROWN} opacity={tw(t, s, s + 0.5)}>{num(b)}</text>
                <text x={COLS[1]} y={y} fontSize={44} textAnchor="middle" opacity={tw(t, s + 2, s + 2.5)}>{num(b + 3)}</text>
                <text x={COLS[2]} y={y} fontSize={44} textAnchor="middle" opacity={tw(t, s + 4, s + 4.5)}>{num(b + b + 3)}</text>
                <text x={COLS[3]} y={y} fontSize={44} textAnchor="middle" fill={ok ? 'var(--good)' : 'var(--bad)'} opacity={tw(t, s + 5.5, s + 6)}>{ok ? '✓' : '✗'}</text>
              </g>
            );
          })}
        </g>
      )}
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={37}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'في الحديقة **٩** قطط، بعضها بنيّ وبعضها أسود'],
      [9, 'عدد القطط السوداء أكثر من البنية بـ **٣**'],
      [13, 'لا نعرف الجواب بعد… **نخمّن** ثم **نتحقّق**'],
      [15, 'أخمّن **٢** بنية، فتكون السوداء ٢ + ٣ = ٥'],
      [19, 'المجموع ٢ + ٥ = ٧، أقل من ٩ ✗ نخمّن من جديد'],
      [23, 'أخمّن **٣** بنية، فتكون السوداء ٣ + ٣ = ٦'],
      [27, 'المجموع ٣ + ٦ = **٩** ✓ التخمين صحيح'],
      [31, 'الحل: **٣** قطط بنية و**٦** قطط سوداء'],
    ]}
  />
);
