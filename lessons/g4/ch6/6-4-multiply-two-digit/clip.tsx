import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٢٧ × ١٣ = ٣٥١ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="الضَّرْبُ فِي عَدَدٍ مِنْ رَقْمَيْنِ" q="٢٧ × ١٣" size={68} />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نضرب في الآحاد: ٣ × ٢٧ = ٨١</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 15, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نضرب في العشرات: ١٠ × ٢٧ = ٢٧٠</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 24, 99)} color="var(--good)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نجمع: ٨١ + ٢٧٠ = ٣٥١</text>
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
      [6, 'نضرب في الآحاد: **٨١**'],
      [15, 'نضرب في العشرات: **٢٧٠**'],
      [24, 'نجمع: **٣٥١**'],
    ]}
  />
);
