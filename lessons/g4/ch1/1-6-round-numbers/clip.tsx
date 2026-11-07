import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٤٦٢٨١٧ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="تَقْرِيبُ الأَعْدَادِ" q="٤٦٢٨١٧ إلى أقرب ألف" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نضع خطًّا تحت منزلة الألوف: ٢</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 13, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الرقم عن يمينها ٨</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 20, 99)} color="var(--ink)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٨ أكبر من ٥: نضيف ١</text>
        </ClipCard>
        <ClipCard x={230} y={384} w={940} h={100} op={fade(t, 27, 99)} color="var(--good)">
          <text x={700} y={450} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٤٦٣٠٠٠</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={36}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [6, 'نحدد منزلة **الألوف**'],
      [13, 'ننظر إلى الرقم **٨**'],
      [20, '٨ أكبر من ٥: **نضيف ١**'],
      [27, 'الناتج **٤٦٣٠٠٠**'],
    ]}
  />
);
