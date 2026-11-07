import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: كتب سعد (مثال غير مثال الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="أَخْتَارُ الْخُطَّةَ" q="قرأ سعد ٣ كتب، ثم ٤، ثم ٣" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نكتب جملة عددية</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 13, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٣ + ٣ + ٤</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 21, 99)} color="var(--good)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٣ + ٣ + ٤ = ١٠ كتب</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={30}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [6, 'نختار: **جملة عددية**'],
      [13, 'نرتب: ٣ + ٣ + ٤'],
      [21, 'قرأ **١٠** كتب'],
    ]}
  />
);
