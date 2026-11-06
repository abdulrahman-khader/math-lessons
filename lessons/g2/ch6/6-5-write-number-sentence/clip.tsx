import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: حمام على السور ١٣ − ٥ = ٨ (مثال غير مثال الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="أَكْتُبُ جُمْلَةً عَدَدِيَّةً" q="على السور ١٣ حمامة، طارت منها ٥" size={70} />
      <g opacity={fade(t, 4.5, 99)}>
        <line x1={200} x2={1200} y1={200} y2={200} stroke="var(--ink)" strokeWidth={8} />
        {Array.from({ length: 13 }, (_, i) => <circle key={i} cx={240 + i * 72} cy={165 - (i >= 8 ? tw(t, 12, 14) * 130 : 0)} r={28} fill="#7fb2e5" stroke="var(--ink)" strokeWidth={3} opacity={i >= 8 ? 1 - tw(t, 14, 15) : 1} />)}
        <g opacity={tw(t, 20, 20.5)}><SvgEq x={700} y={340} size={64} parts={[13, { v: '−', color: 'var(--bad)' }, 5, '=', { v: t > 26 ? 8 : '؟', color: 'var(--good)' }]} /></g>
        <ClipCard x={230} y={400} w={940} h={84} op={fade(t, 31, 99)} color="var(--good)">
          <text x={700} y={455} fontSize={36} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>أتحقق: ٨ + ٥ = ١٣</text>
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
      [5, 'على السور **١٣** حمامة'],
      [12, 'طارت منها **٥**'],
      [20, 'نقص العدد، فنطرح: ١٣ − ٥'],
      [26, 'بقي **٨** حمامات'],
      [31, 'نتحقق: ٨ + ٥ = **١٣**'],
    ]}
  />
);
