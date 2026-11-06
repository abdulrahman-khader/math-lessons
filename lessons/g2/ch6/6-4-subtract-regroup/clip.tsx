import { Clip, ClipCard, ClipTitle, SvgBlocks, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٥٣ − ٧ = ٤٦ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="الطَّرْحُ بِإِعَادَةِ التَّجْمِيعِ" q="٥٣ − ٧" size={68} />
      <g opacity={fade(t, 4.5, 99)}>
        <rect x={500} y={20} width={400} height={290} fill="#fff" stroke="var(--ink)" strokeWidth={4} />
        <rect x={900} y={20} width={320} height={290} fill="#fff" stroke="var(--ink)" strokeWidth={4} />
        <SvgBlocks x={530} y={50} tens={t > 14 ? 4 : 5} s={22} />
        <SvgBlocks x={930} y={50} ones={t > 22 ? 6 : t > 14 ? 13 : 3} s={20} />
        <g opacity={tw(t, 28, 28.5)}><SvgEq x={250} y={190} size={60} parts={[53, '−', 7, '=', { v: 46, color: 'var(--good)' }]} /></g>
        <ClipCard x={230} y={400} w={940} h={84} op={fade(t, 33, 99)} color="var(--good)">
          <text x={700} y={455} fontSize={36} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>عشرة واحدة = ١٠ آحاد</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={40}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [5, 'نمثّل العدد **٥٣**: ٣ آحاد لا تكفي لطرح ٧'],
      [14, 'نفك عشرة: صارت **١٣** آحادًا'],
      [22, 'نطرح ٧ آحاد: بقي **٦**'],
      [28, '٥٣ − ٧ = **٤٦**'],
      [33, 'عشرة واحدة = **١٠ آحاد**'],
    ]}
  />
);
