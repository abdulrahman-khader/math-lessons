import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٩ + ٦ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="تَكْوِينُ الْعَشَرَةِ" q="٩ + ٦" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نحرّك واحدًا: ٩ + ١ = ١٠</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 14, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>يبقى ٥</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 21, 99)} color="var(--good)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>١٠ + ٥ = ١٥</text>
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
      [6, 'نكوّن عشرة: ٩ + ١ = **١٠**'],
      [14, 'يبقى من الستة **٥**'],
      [21, '١٠ + ٥ = **١٥**'],
    ]}
  />
);
