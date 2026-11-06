import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٦٨ − ٢٢ تقريبًا ٥٠ (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="تَقْدِيرُ نَاتِجِ الطَّرْحِ" q="٦٨ − ٢٢" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={250} y={70} w={900} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={135} fontSize={42} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٦٨ أقرب إلى ٧٠</text>
        </ClipCard>
        <ClipCard x={250} y={190} w={900} h={100} op={fade(t, 14, 99)} color="var(--ink)">
          <text x={700} y={255} fontSize={42} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>٢٢ أقرب إلى ٢٠</text>
        </ClipCard>
        <g opacity={tw(t, 22, 22.5)}><SvgEq x={700} y={400} size={64} parts={[70, '−', 20, '=', { v: 50, color: 'var(--good)' }]} /></g>
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
      [6, '**٦٨** أقرب إلى ٧٠'],
      [14, '**٢٢** أقرب إلى ٢٠'],
      [22, 'نطرح العشرات: ٧٠ − ٢٠ = **٥٠**'],
      [29, '٦٨ − ٢٢ يساوي **٥٠** تقريبًا'],
    ]}
  />
);
