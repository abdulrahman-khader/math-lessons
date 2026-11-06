import { Clip, ClipCard, ClipTitle, SvgBlocks, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: علب أقلام (مثال غير مثال الكتاب): ٢٠ + ٦٠ = ٨٠ */

function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="جَمْعُ الْعَشَرَاتِ" q="في كل علبة ١٠ أقلام" />
      <g opacity={fade(t, 4.5, 99)}>
        <SvgBlocks x={880} y={40} tens={2} s={24} op={tw(t, 6, 6.5)} />
        <SvgBlocks x={320} y={40} tens={6} s={24} op={tw(t, 11, 11.5)} tenColor="#4f9be0" />
        <g opacity={tw(t, 16, 16.5)}><SvgEq x={700} y={360} size={62} parts={[2, '+', 6, '=', { v: 8, color: 'var(--good)' }]} /></g>
        <g opacity={tw(t, 23, 23.5)}><SvgEq x={700} y={450} size={62} parts={[20, '+', 60, '=', { v: 80, color: 'var(--good)' }]} /></g>
        <ClipCard x={160} y={300} w={330} h={100} op={fade(t, 30, 99)} color="var(--good)">
          <text x={325} y={364} fontSize={32} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٨ عشرات = ٨٠</text>
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
      [6, 'عندنا **علبتان**: عشرتان'],
      [11, 'وعندنا **٦** علب: ٦ عشرات'],
      [16, 'نجمع كما نجمع الآحاد: ٢ + ٦ = **٨**'],
      [23, 'إذن ٢٠ + ٦٠ = **٨٠**'],
      [30, '**٨** عشرات هي ٨٠ قلمًا'],
    ]}
  />
);
