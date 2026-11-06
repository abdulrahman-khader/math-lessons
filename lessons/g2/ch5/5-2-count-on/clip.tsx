import { Clip, ClipCard, ClipTitle, SvgBlocks, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٥١ + ٣ بالآحاد، و٥١ + ٣٠ بالعشرات (مثال غير أمثلة الكتاب) */

function scene(t: number) {
  const A = 8, B = 22;
  return (
    <>
      <ClipTitle t={t} title="الْعَدُّ التَّصَاعُدِيُّ" q="نبدأ بالعدد الأكبر، ثم نعدّ" />
      <g opacity={fade(t, 4.5, 99)}>
        <SvgBlocks x={880} y={20} tens={5} ones={1} s={20} />
        <SvgBlocks x={1100} y={20} ones={[0, 1, 2, 3][Math.floor(Math.min(3, Math.max(0, (t - A) / 2.5)))]} s={20} op={fade(t, A, B)} tenColor="#4f9be0" oneColor="#4f9be0" />
        <SvgBlocks x={1090} y={20} tens={[0, 1, 2, 3][Math.floor(Math.min(3, Math.max(0, (t - B) / 2.5)))]} s={20} op={fade(t, B, 99)} tenColor="#4f9be0" />
        <g opacity={fade(t, A, B)}>
          <SvgEq x={420} y={130} size={60} parts={['٥١', '،', '٥٢', '،', '٥٣', '،', '٥٤']} show={2 + 2 * Math.floor(Math.max(0, (t - A) / 2.5))} />
          <g opacity={tw(t, 16, 16.5)}><SvgEq x={420} y={260} size={60} parts={[51, '+', 3, '=', { v: 54, color: 'var(--good)' }]} /></g>
        </g>
        <g opacity={fade(t, B, 99)}>
          <SvgEq x={420} y={130} size={60} parts={['٥١', '،', '٦١', '،', '٧١', '،', '٨١']} show={2 + 2 * Math.floor(Math.max(0, (t - B) / 2.5))} />
          <g opacity={tw(t, 30, 30.5)}><SvgEq x={420} y={260} size={60} parts={[51, '+', 30, '=', { v: 81, color: 'var(--good)' }]} /></g>
        </g>
        <ClipCard x={230} y={400} w={940} h={84} op={fade(t, 35, 99)} color="var(--good)">
          <text x={700} y={455} fontSize={36} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نعدّ بالآحاد أو نعدّ بالعشرات</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={42}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [8, 'نبدأ بالعدد **٥١**، ونعدّ ٣ آحاد'],
      [16, '٥١ + ٣ = **٥٤**'],
      [22, 'نبدأ بالعدد **٥١**، ونعدّ ٣ عشرات'],
      [30, '٥١ + ٣٠ = **٨١**'],
      [35, 'نعدّ بالآحاد أو **نعدّ بالعشرات**'],
    ]}
  />
);
