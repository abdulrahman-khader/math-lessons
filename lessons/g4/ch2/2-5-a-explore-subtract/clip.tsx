import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: مثال غير أمثلة الكتاب */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="الطَّرْحُ بِالنَّمَاذِجِ" q="٥٣٠ − ٢٨٠" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الآحاد: ٠ − ٠ = ٠</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 13, 99)} color="var(--bad)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٣ عشرات لا تكفي: نفك مئة</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 20, 99)} color="var(--ink)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>١٣ − ٨ = ٥ ، و٤ − ٢ = ٢</text>
        </ClipCard>
        <ClipCard x={230} y={384} w={940} h={100} op={fade(t, 27, 99)} color="var(--good)">
          <text x={700} y={450} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٥٣٠ − ٢٨٠ = ٢٥٠</text>
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
      [6, 'نطرح **الآحاد**'],
      [13, 'نفك **مئة** إلى ١٠ عشرات'],
      [20, 'نطرح العشرات والمئات'],
      [27, 'الفرق **٢٥٠**'],
    ]}
  />
);
