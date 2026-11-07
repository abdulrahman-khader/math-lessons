import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٣٥٤٢٠٦ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="دَوْرَةُ الأَعْدَادِ" q="٣٥٤٢٠٦" size={70} />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نجزّئ كل ثلاثة أرقام: ٣٥٤ | ٢٠٦</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 14, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>دورة الألوف: ٣٥٤</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 21, 99)} color="var(--ink)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>دورة الواحدات: ٢٠٦</text>
        </ClipCard>
        <ClipCard x={230} y={384} w={940} h={100} op={fade(t, 28, 99)} color="var(--good)">
          <text x={700} y={450} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>ثلاث مئة وأربعة وخمسون ألفًا ومئتان وستة</text>
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
      [6, 'نجزّئ كل **ثلاثة** أرقام'],
      [14, 'دورة **الألوف**: ٣٥٤'],
      [21, 'دورة **الواحدات**: ٢٠٦'],
      [28, 'نقرأ العدد كاملًا'],
    ]}
  />
);
