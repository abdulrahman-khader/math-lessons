import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٧ + ٧ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="جَمْعُ الْعَدَدِ وَنَفْسِهِ" q="٧ + ٧" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>العددان متساويان</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 13, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>بُرجان: ٧ و٧</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 21, 99)} color="var(--good)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٧ + ٧ = ١٤</text>
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
      [6, 'العددان **متساويان**'],
      [13, 'برجان: **٧** و**٧**'],
      [21, '٧ + ٧ = **١٤**'],
    ]}
  />
);
