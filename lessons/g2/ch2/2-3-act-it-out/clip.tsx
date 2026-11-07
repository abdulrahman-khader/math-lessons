import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: أقلام سعد ٥ + ٣ (مثال غير مثال الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="أُمَثِّلُ الْمَسْأَلَةَ" q="مع سعد ٥ أقلام، وأخذ ٣" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نضع ٥ نماذج</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 13, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نضيف ٣ نماذج</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 21, 99)} color="var(--good)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٥ + ٣ = ٨ أقلام</text>
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
      [6, 'نضع **٥** نماذج'],
      [13, 'نضيف **٣** نماذج'],
      [21, '٥ + ٣ = **٨** أقلام'],
    ]}
  />
);
