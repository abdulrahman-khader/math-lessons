import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ١٣ × ١٤ = ١٨٢ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="خَاصِيَّةُ التَّوْزِيعِ" q="١٣ × ١٤" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>١٠ × ١٠ = ١٠٠ ، ١٠ × ٤ = ٤٠</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 15, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٣ × ١٠ = ٣٠ ، ٣ × ٤ = ١٢</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 24, 99)} color="var(--good)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>١٠٠ + ٤٠ + ٣٠ + ١٢ = ١٨٢</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={34}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [6, 'نضرب العشرة في كل جزء'],
      [15, 'نضرب ٣ في كل جزء'],
      [24, 'نجمع النواتج: **١٨٢**'],
    ]}
  />
);
