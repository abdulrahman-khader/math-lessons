import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ترتيب ٥٢٧٣ و٥٧٢٣ و٢٧٥٣ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="تَرْتِيبُ الأَعْدَادِ" q="٥٢٧٣، ٥٧٢٣، ٢٧٥٣" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>المنزلة الكبرى: ٥، ٥، ٢</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 13, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٢٧٥٣ هو الأصغر</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 20, 99)} color="var(--ink)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٧ أكبر من ٢</text>
        </ClipCard>
        <ClipCard x={230} y={384} w={940} h={100} op={fade(t, 27, 99)} color="var(--good)">
          <text x={700} y={450} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٥٧٢٣، ٥٢٧٣، ٢٧٥٣</text>
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
      [6, 'نبدأ من المنزلة **الكبرى**'],
      [13, '٢٧٥٣ هو **الأصغر**'],
      [20, '٧ أكبر من **٢**'],
      [27, 'الترتيب من الأكبر إلى الأصغر'],
    ]}
  />
);
