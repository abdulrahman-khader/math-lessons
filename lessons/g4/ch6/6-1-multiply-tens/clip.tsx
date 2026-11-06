import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٣٤ × ٢٠ = ٦٨٠ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="الضَّرْبُ فِي الْعَشَرَاتِ" q="٣٤ × ٢٠" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 7, 99)} color="var(--good)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الآحاد: ٠ × ٣٤ = ٠</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 15, 99)} color="var(--good)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>العشرات: ٢ × ٣٤ = ٦٨ عشرة</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 24, 99)} color="var(--rule)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٣٤ × ٢٠ = ٦٨٠</text>
        </ClipCard>
        <ClipCard x={230} y={384} w={940} h={100} op={fade(t, 30, 99)} color="var(--rule)">
          <text x={700} y={450} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>منزلة الآحاد صفر دائمًا</text>
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
      [7, 'نضرب الآحاد: **صفر**'],
      [15, 'نضرب العشرات: ٢ × ٣٤ = **٦٨** عشرة'],
      [24, 'الناتج: **٦٨٠**'],
      [30, 'منزلة الآحاد **صفر** دائمًا'],
    ]}
  />
);
