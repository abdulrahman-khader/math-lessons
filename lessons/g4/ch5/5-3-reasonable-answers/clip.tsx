import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٤ حافلات في كل منها ٥٠ مقعدًا و١٨٠ طالبًا (مثال غير أمثلة الكتاب) */

function Bus({ x, op }: { x: number; op: number }) {
  if (op <= 0.01) return null;
  return (
    <g opacity={op} transform={`translate(${x},110)`}>
      <rect width={230} height={100} rx={16} fill="#f2b705" stroke="var(--ink)" strokeWidth={3} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={16 + i * 52} y={16} width={42} height={34} rx={5} fill="#e9f0fb" stroke="var(--ink)" strokeWidth={2} />)}
      <circle cx={50} cy={102} r={18} fill="var(--ink)" />
      <circle cx={180} cy={102} r={18} fill="var(--ink)" />
    </g>
  );
}

function scene(t: number) {
  const body = fade(t, 4.5, 99);
  return (
    <>
      <ClipTitle t={t} title="هلِ الإجابةُ معقولةٌ؟" q="٤ حافلاتٍ لـ ١٨٠ طالبًا، هلْ تكفي؟" />
      <g opacity={body}>
        {[0, 1, 2, 3].map((i) => <Bus key={i} x={1090 - i * 280} op={tw(t, 5 + i * 0.8, 5.5 + i * 0.8)} />)}
        <g opacity={tw(t, 12, 12.6)}>
          <SvgEq x={700} y={320} size={56} parts={[4, '×', 50, '=', { v: 200, color: 'var(--good)' }]} />
        </g>
        <g opacity={tw(t, 19, 19.6)}>
          <SvgEq x={700} y={400} size={56} parts={[200, '>', 180]} />
        </g>
        <ClipCard x={300} y={425} w={800} h={80} op={fade(t, 26, 99)} color="var(--good)">
          <text x={700} y={480} fontSize={38} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نعم، القولُ معقولٌ</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={38}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [5, 'في كل حافلة **٥٠** مقعدًا'],
      [12, 'نضرب لنعرف عدد المقاعد: ٤ × ٥٠ = **٢٠٠**'],
      [19, 'نقارن: ٢٠٠ أكبر من **١٨٠**'],
      [26, 'إذن القول **معقول**، والحافلات تكفي'],
    ]}
  />
);
