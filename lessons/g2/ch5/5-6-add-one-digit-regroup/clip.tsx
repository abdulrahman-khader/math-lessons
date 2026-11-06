import { Clip, ClipCard, ClipTitle, SvgVertical, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٥٨ + ٦ = ٦٤ (مثال غير أمثلة الكتاب) */

function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="الرَّقْمُ الْمَحْمُولُ" q="٥٨ + ٦" />
      <g opacity={fade(t, 4.5, 99)}>
        <SvgVertical x={900} y={150} nums={[58, 6]} carry={tw(t, 18, 18.5)} ones={t > 13 ? 4 : undefined} tens={t > 24 ? 6 : undefined} />
        <ClipCard x={160} y={110} w={560} h={100} op={fade(t, 7, 99)} color="var(--good)">
          <text x={440} y={175} fontSize={38} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الآحاد: ٨ + ٦ = ١٤</text>
        </ClipCard>
        <ClipCard x={160} y={230} w={560} h={100} op={fade(t, 18, 99)} color="var(--bad)">
          <text x={440} y={295} fontSize={38} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نحمل عشرة واحدة</text>
        </ClipCard>
        <ClipCard x={160} y={350} w={560} h={100} op={fade(t, 24, 99)} color="var(--good)">
          <text x={440} y={415} fontSize={38} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>العشرات: ١ + ٥ = ٦</text>
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
      [7, 'نجمع الآحاد: ٨ + ٦ = **١٤**'],
      [13, 'نكتب **٤** في الآحاد'],
      [18, 'ونكتب العشرة **١** فوق العشرات'],
      [24, 'نجمع العشرات: ١ + ٥ = **٦**'],
      [30, '٥٨ + ٦ = **٦٤**'],
    ]}
  />
);
