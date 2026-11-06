import { Clip, ClipCard, ClipTitle, SvgBlocks, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٨٠ − ٥٠ = ٣٠ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="طَرْحُ الْعَشَرَاتِ" q="في كل علبة ١٠ أقلام" />
      <g opacity={fade(t, 4.5, 99)}>
        <SvgBlocks x={760} y={40} tens={t > 11 ? 3 : 8} s={24} />
        <g opacity={fade(t, 8, 11)}><SvgBlocks x={892} y={40} tens={5} s={24} tenColor="#c9ccd4" /></g>
        <g opacity={tw(t, 15, 15.5)}><SvgEq x={380} y={160} size={60} parts={[8, '−', 5, '=', { v: 3, color: 'var(--good)' }]} /></g>
        <g opacity={tw(t, 22, 22.5)}><SvgEq x={380} y={290} size={60} parts={[80, '−', 50, '=', { v: 30, color: 'var(--good)' }]} /></g>
        <ClipCard x={160} y={380} w={600} h={90} op={fade(t, 29, 99)} color="var(--good)">
          <text x={460} y={440} fontSize={34} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٣ عشرات = ٣٠</text>
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
      [5, 'عندنا **٨** علب: ٨ عشرات'],
      [8, 'نأخذ **٥** علب'],
      [15, 'نطرح كما نطرح الآحاد: ٨ − ٥ = **٣**'],
      [22, 'إذن ٨٠ − ٥٠ = **٣٠**'],
      [29, 'بقي **٣٠** قلمًا'],
    ]}
  />
);
