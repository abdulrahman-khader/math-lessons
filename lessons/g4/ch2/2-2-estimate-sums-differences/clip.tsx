import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: مثال غير أمثلة الكتاب */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="تَقْدِيرُ الْمَجْمُوعِ" q="٤٢٦ + ٢٨١" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٤٢٦ تقرب إلى ٤٠٠</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 13, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٢٨١ تقرب إلى ٣٠٠</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 20, 99)} color="var(--good)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٤٠٠ + ٣٠٠ = ٧٠٠</text>
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
      [6, '**٤٢٦** تقرب إلى ٤٠٠'],
      [13, '**٢٨١** تقرب إلى ٣٠٠'],
      [20, 'المجموع **٧٠٠** تقريبًا'],
    ]}
  />
);
