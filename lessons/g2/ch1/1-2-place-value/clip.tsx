import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٥٥ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="الْقِيمَةُ الْمَنْزِلِيَّةُ" q="الرقمان متشابهان في ٥٥" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الرقم الأول: ٥ آحاد = ٥</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 14, 99)} color="var(--good)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الرقم الثاني: ٥ عشرات = ٥٠</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 23, 99)} color="var(--rule)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>المكان يغيّر القيمة</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={32}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [6, 'في الآحاد: قيمته **٥**'],
      [14, 'في العشرات: قيمته **٥٠**'],
      [23, 'مكان الرقم يغيّر **قيمته**'],
    ]}
  />
);
