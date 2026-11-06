import { Clip, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٨٤ − ٣ و٨٤ − ٣٠ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="الْعَدُّ التَّنَازُلِيُّ" q="نبدأ بالعدد الكبير، ثم نعدّ إلى الوراء" />
      <g opacity={fade(t, 4.5, 99)}>
        <g opacity={fade(t, 7, 21)}>
          <SvgEq x={700} y={150} size={64} parts={['٨٤', '،', '٨٣', '،', '٨٢', '،', '٨١']} show={2 + 2 * Math.floor(Math.max(0, (t - 7) / 2.2))} />
          <g opacity={tw(t, 15, 15.5)}><SvgEq x={700} y={300} size={64} parts={[84, '−', 3, '=', { v: 81, color: 'var(--good)' }]} /></g>
        </g>
        <g opacity={fade(t, 21, 99)}>
          <SvgEq x={700} y={150} size={64} parts={['٨٤', '،', '٧٤', '،', '٦٤', '،', '٥٤']} show={2 + 2 * Math.floor(Math.max(0, (t - 21) / 2.2))} />
          <g opacity={tw(t, 29, 29.5)}><SvgEq x={700} y={300} size={64} parts={[84, '−', 30, '=', { v: 54, color: 'var(--good)' }]} /></g>
        </g>
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
      [7, 'نبدأ بالعدد **٨٤**، ونعدّ ٣ آحاد إلى الوراء'],
      [15, '٨٤ − ٣ = **٨١**'],
      [21, 'نبدأ بالعدد **٨٤**، ونعدّ ٣ عشرات إلى الوراء'],
      [29, '٨٤ − ٣٠ = **٥٤**'],
    ]}
  />
);
