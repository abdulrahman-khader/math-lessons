import { Clip, ClipTitle, SvgBlocks, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٣٦ قطعة (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="الآحَادُ وَالْعَشَرَاتُ" q="٣٦ قطعة" />
      <g opacity={fade(t, 4.5, 99)}>
        <SvgBlocks x={520} y={40} tens={t > 12 ? 3 : 0} ones={t > 12 ? 6 : 0} s={24} />
        <g opacity={tw(t, 20, 20.5)}><SvgEq x={700} y={380} size={64} parts={[6, '+', 30, '=', { v: 36, color: 'var(--good)' }]} /></g>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={32}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [6, 'كل **١٠** آحاد تصير عشرة واحدة'],
      [12, '٣٦ قطعة: **٣** عشرات و**٦** آحاد'],
      [20, '٦ + ٣٠ = **٣٦**'],
    ]}
  />
);
