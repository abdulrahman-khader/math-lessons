import { CLIP_W, Clip, ClipCard, ClipTitle, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: بالونات في صندوق (مثال غير مثال الكتاب): ٧ زرقاء و٢ صفراء */

const BLUE = '#4f9be0', YELLOW = '#f6c21c';
const LIST = [BLUE, BLUE, YELLOW, BLUE, BLUE, BLUE, YELLOW, BLUE, BLUE];

function Balloon({ x, y, c, op }: { x: number; y: number; c: string; op: number }) {
  if (op <= 0.01) return null;
  return (
    <g opacity={op}>
      <line x1={x} y1={y + 40} x2={x} y2={y + 90} stroke="var(--ink)" strokeWidth={2} />
      <ellipse cx={x} cy={y} rx={34} ry={42} fill={c} stroke="var(--ink)" strokeWidth={3} />
    </g>
  );
}

function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="أَكْثَرُ إِمْكَانِيَّةً وَأَقَلُّ إِمْكَانِيَّةً" q="٧ بالونات زرقاء و٢ صفراء" size={64} />
      <g opacity={fade(t, 4.5, 99)}>
        {LIST.map((c, i) => (
          <Balloon key={i} x={260 + (i % 5) * 110} y={140 + Math.floor(i / 5) * 170} c={c} op={tw(t, 5 + i * 0.25, 5.4 + i * 0.25)} />
        ))}
      </g>
      {[
        [10, 18, 'الأزرق: ٧ ← أكثر إمكانية', 'var(--rule)'],
        [18, 26, 'الأصفر: ٢ ← أقل إمكانية', '#b07d00'],
        [26, 99, 'العدد الأكبر ← الفرصة الأكبر', 'var(--good)'],
      ].map(([a, b, s, c]) => (
        <ClipCard key={a as number} x={880} y={170} w={480} h={110} op={fade(t, a as number, b as number)} color={c as string}>
          <text x={1120} y={238} fontSize={34} textAnchor="middle" direction="rtl" fill={c as string} style={{ fontWeight: 800 }}>{s as string}</text>
        </ClipCard>
      ))}
      <ClipCard x={CLIP_W / 2 - 480} y={430} w={960} h={70} op={fade(t, 32, 99)} color="var(--qs)">
        <text x={CLIP_W / 2} y={477} fontSize={32} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>
          لو أخذنا بالونًا دون أن ننظر، غالبًا يكون أزرق
        </text>
      </ClipCard>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={40}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [5, 'في الصندوق **٧** بالونات زرقاء و**٢** صفراء'],
      [10, 'الأزرق أكثر عددًا: أخذه **أكثر إمكانية**'],
      [18, 'الأصفر أقل عددًا: أخذه **أقل إمكانية**'],
      [26, 'نقارن العددين لنعرف **الفرصة**'],
      [32, 'الأكثر عددًا هو الأكثر إمكانية'],
    ]}
  />
);
