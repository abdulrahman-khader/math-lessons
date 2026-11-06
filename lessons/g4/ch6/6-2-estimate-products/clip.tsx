import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٣٨ × ٢٢ تقريبًا ٨٠٠ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="تَقْدِيرُ نَاتِجِ الضَّرْبِ" q="٣٨ × ٢٢" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٣٨ تقرب إلى ٤٠</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 13, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٢٢ تقرب إلى ٢٠</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 20, 99)} color="var(--good)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٤٠ × ٢٠ = ٨٠٠</text>
        </ClipCard>
        <ClipCard x={230} y={384} w={940} h={100} op={fade(t, 28, 99)} color="var(--rule)">
          <text x={700} y={450} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الناتج ٨٠٠ تقريبًا</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={34}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [6, '**٣٨** تقرب إلى ٤٠'],
      [13, '**٢٢** تقرب إلى ٢٠'],
      [20, 'نضرب: ٤٠ × ٢٠ = **٨٠٠**'],
      [28, 'الناتج **٨٠٠** تقريبًا'],
    ]}
  />
);
