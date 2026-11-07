import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: علب العصير (مثال غير مثال الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="أَخْتَارُ الْخُطَّةَ" q="٦ علب، ثمن العلبة ٩ ريالات" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>جدول: ٩، ١٨، ٢٧، ٣٦، ٤٥، ٥٤</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 14, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>جملة عددية: ٦ × ٩ = ٥٤</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 22, 99)} color="var(--good)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الخطتان تعطيان ٥٤ ريالًا</text>
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
      [6, 'خطة **الجدول**'],
      [14, 'خطة **الجملة العددية**'],
      [22, 'الخطتان تعطيان **٥٤** ريالًا'],
    ]}
  />
);
