import { Clip, ClipCard, ClipTitle, SvgVertical, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٦٢ − ٨ = ٥٤ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="طَرْحُ رَقْمٍ مِنْ رَقْمَيْنِ" q="٦٢ − ٨" />
      <g opacity={fade(t, 4.5, 99)}>
        <SvgVertical x={940} y={160} nums={[62, 8]} op="−" borrow={tw(t, 13, 13.5)} ones={t > 20 ? 4 : undefined} tens={t > 26 ? 5 : undefined} />
        <ClipCard x={160} y={110} w={560} h={100} op={fade(t, 7, 99)} color="var(--bad)">
          <text x={440} y={175} fontSize={36} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٢ آحاد لا تكفي لطرح ٨</text>
        </ClipCard>
        <ClipCard x={160} y={230} w={560} h={100} op={fade(t, 13, 99)} color="var(--bad)">
          <text x={440} y={295} fontSize={36} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نفك عشرة: ٥ عشرات و١٢ آحادًا</text>
        </ClipCard>
        <ClipCard x={160} y={350} w={560} h={100} op={fade(t, 20, 99)} color="var(--good)">
          <text x={440} y={415} fontSize={36} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>١٢ − ٨ = ٤</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={38}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [7, '**٢** آحاد لا تكفي لطرح ٨'],
      [13, 'نفك عشرة: **٥** عشرات و**١٢** آحادًا'],
      [20, 'نطرح الآحاد: ١٢ − ٨ = **٤**'],
      [26, 'تبقى **٥** عشرات'],
      [31, '٦٢ − ٨ = **٥٤**'],
    ]}
  />
);
