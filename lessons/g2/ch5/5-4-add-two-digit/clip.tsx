import { Clip, ClipCard, ClipTitle, SvgBlocks, SvgVertical, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٤٢ + ٣٥ = ٧٧ (مثال غير أمثلة الكتاب) */

function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="جَمْعُ عَدَدَيْنِ" q="٤٢ + ٣٥" />
      <g opacity={fade(t, 4.5, 99)}>
        <SvgBlocks x={760} y={40} tens={4} ones={2} s={20} />
        <SvgBlocks x={1040} y={40} tens={3} ones={5} s={20} tenColor="#4f9be0" oneColor="#4f9be0" />
        <SvgVertical x={360} y={110} nums={[42, 35]} ones={t > 12 ? 7 : undefined} tens={t > 21 ? 7 : undefined} />
        <ClipCard x={700} y={340} w={560} h={110} op={fade(t, 12, 21)} color="var(--good)">
          <text x={980} y={410} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الآحاد: ٢ + ٥ = ٧</text>
        </ClipCard>
        <ClipCard x={700} y={340} w={560} h={110} op={fade(t, 21, 30)} color="var(--good)">
          <text x={980} y={410} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>العشرات: ٤ + ٣ = ٧</text>
        </ClipCard>
        <ClipCard x={700} y={340} w={560} h={110} op={fade(t, 30, 99)} color="var(--good)">
          <text x={980} y={410} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الآحاد أولًا، ثم العشرات</text>
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
      [5, 'الآحاد تحت **الآحاد**، والعشرات تحت **العشرات**'],
      [12, 'نجمع الآحاد: ٢ + ٥ = **٧**'],
      [21, 'نجمع العشرات: ٤ + ٣ = **٧**'],
      [30, '٤٢ + ٣٥ = **٧٧**'],
    ]}
  />
);
