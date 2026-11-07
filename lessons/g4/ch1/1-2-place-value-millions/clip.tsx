import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٤٢٠٥٣٠٠ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="دَوْرَةُ الْمَلَايِينِ" q="٤٢٠٥٣٠٠" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>دورة الملايين: ٤</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 13, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>دورة الألوف: ٢٠٥</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 20, 99)} color="var(--ink)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>دورة الواحدات: ٣٠٠</text>
        </ClipCard>
        <ClipCard x={230} y={384} w={940} h={100} op={fade(t, 27, 99)} color="var(--good)">
          <text x={700} y={450} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>أربعة ملايين ومئتان وخمسة آلاف وثلاث مئة</text>
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
      [6, 'دورة **الملايين**: ٤'],
      [13, 'دورة **الألوف**: ٢٠٥'],
      [20, 'دورة **الواحدات**: ٣٠٠'],
      [27, 'نقرأ العدد كاملًا'],
    ]}
  />
);
