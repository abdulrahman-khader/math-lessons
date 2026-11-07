import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: رزم الورق حتى مليون (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="إِلَى الْمِلْيُونِ" q="كل مرة نضرب في ١٠" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>١٠ رزم = ١٠٠٠ ورقة</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 13, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>١٠٠ رزمة = ١٠٠٠٠ ورقة</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 20, 99)} color="var(--ink)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>١٠٠٠ رزمة = ١٠٠٠٠٠ ورقة</text>
        </ClipCard>
        <ClipCard x={230} y={384} w={940} h={100} op={fade(t, 27, 99)} color="var(--good)">
          <text x={700} y={450} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>١٠٠٠٠ رزمة = مليون ورقة</text>
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
      [6, 'الرزمة ١٠٠ ورقة: ١٠ رزم **١٠٠٠**'],
      [13, '١٠٠ رزمة: **١٠٠٠٠**'],
      [20, '١٠٠٠ رزمة: **١٠٠٠٠٠**'],
      [27, '١٠٠٠٠ رزمة: **مليون** ورقة'],
    ]}
  />
);
