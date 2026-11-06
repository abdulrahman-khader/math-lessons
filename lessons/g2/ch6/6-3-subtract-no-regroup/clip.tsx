import { Clip, ClipCard, ClipTitle, SvgVertical, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٩٦ − ٤٢ = ٥٤ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="الطَّرْحُ بِالْمَنَازِلِ" q="٩٦ − ٤٢" />
      <g opacity={fade(t, 4.5, 99)}>
        <SvgVertical x={940} y={140} nums={[96, 42]} op="−" ones={t > 12 ? 4 : undefined} tens={t > 21 ? 5 : undefined} />
        <ClipCard x={160} y={130} w={560} h={110} op={fade(t, 12, 99)} color="var(--good)">
          <text x={440} y={200} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الآحاد: ٦ − ٢ = ٤</text>
        </ClipCard>
        <ClipCard x={160} y={270} w={560} h={110} op={fade(t, 21, 99)} color="var(--good)">
          <text x={440} y={340} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>العشرات: ٩ − ٤ = ٥</text>
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
      [5, 'نكتب كل رقم في **منزلته**'],
      [12, 'نطرح الآحاد: ٦ − ٢ = **٤**'],
      [21, 'نطرح العشرات: ٩ − ٤ = **٥**'],
      [29, '٩٦ − ٤٢ = **٥٤**'],
    ]}
  />
);
