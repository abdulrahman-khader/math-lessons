import { Clip, ClipCard, ClipTitle, SvgBlocks, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٤٦ + ٧ = ٥٣ (مثال غير أمثلة الكتاب): عشرة آحاد تصير عشرة واحدة */

function scene(t: number) {
  const done = t > 22;
  return (
    <>
      <ClipTitle t={t} title="إِعَادَةُ التَّجْمِيعِ" q="٤٦ + ٧" />
      <g opacity={fade(t, 4.5, 99)}>
        <rect x={500} y={20} width={400} height={290} fill="#fff" stroke="var(--ink)" strokeWidth={4} />
        <rect x={900} y={20} width={320} height={290} fill="#fff" stroke="var(--ink)" strokeWidth={4} />
        <SvgBlocks x={530} y={50} tens={done ? 5 : 4} s={22} />
        <SvgBlocks x={930} y={50} ones={done ? 3 : t > 9 ? 13 : 6} s={20} />
        <rect x={926} y={40} width={180} height={220} rx={16} fill="none" stroke="var(--bad)" strokeWidth={5} strokeDasharray="12 8" opacity={fade(t, 15, 22)} />
        <g opacity={tw(t, 28, 28.5)}><SvgEq x={250} y={190} size={60} parts={[46, '+', 7, '=', { v: 53, color: 'var(--good)' }]} /></g>
        <ClipCard x={230} y={400} w={940} h={84} op={fade(t, 33, 99)} color="var(--good)">
          <text x={700} y={455} fontSize={36} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>١٠ آحاد = عشرة واحدة</text>
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
      [5, 'نمثّل العدد **٤٦**'],
      [9, 'نضيف ٧ آحاد: صارت **١٣** آحادًا'],
      [15, 'نحوّط **١٠** آحاد'],
      [22, 'نستبدل بها **عشرة واحدة**'],
      [28, '٤٦ + ٧ = **٥٣**'],
      [33, '١٠ آحاد = **عشرة واحدة**'],
    ]}
  />
);
