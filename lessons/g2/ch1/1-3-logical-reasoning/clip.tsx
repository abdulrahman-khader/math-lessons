import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ثلاث تفاحات (مثال غير مثال الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="الِاسْتِدْلَالُ الْمَنْطِقِيُّ" q="ليست كبيرة، وليست حمراء" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--bad)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>ليست كبيرة: نستبعد الكبيرة</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 14, 99)} color="var(--bad)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>ليست حمراء: نستبعد الحمراء</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 22, 99)} color="var(--good)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>بقيت الصغيرة الخضراء</text>
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
      [6, 'نستبعد **الكبيرة**'],
      [14, 'نستبعد **الحمراء**'],
      [22, 'بقيت الصغيرة **الخضراء**'],
    ]}
  />
);
