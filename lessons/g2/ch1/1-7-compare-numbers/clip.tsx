import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٥٣ و٥٨ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="مُقَارَنَةُ الأَعْدَادِ" q="٥٣ و٥٨" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>العشرات: ٥ و٥ متساوية</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 14, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الآحاد: ٣ أصغر من ٨</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 22, 99)} color="var(--good)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٥٣ أصغر من ٥٨</text>
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
      [6, 'العشرات **متساوية**'],
      [14, 'الآحاد: ٣ أصغر من **٨**'],
      [22, '٥٣ **أصغر من** ٥٨'],
    ]}
  />
);
