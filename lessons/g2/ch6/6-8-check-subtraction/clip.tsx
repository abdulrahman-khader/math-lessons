import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٦٤ − ٢٩ = ٣٥ ونتحقق بالجمع (مثال غير أمثلة الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="أَتَحَقَّقُ بِالْجَمْعِ" q="٦٤ − ٢٩ = ٣٥" />
      <g opacity={fade(t, 4.5, 99)}>
        <SvgEq x={700} y={120} size={64} parts={[64, '−', 29, '=', 35]} />
        <g opacity={tw(t, 11, 11.5)}><SvgEq x={700} y={250} size={64} parts={[{ v: 35, color: 'var(--good)' }, '+', { v: 29, color: 'var(--good)' }, '=', { v: t > 19 ? 64 : '؟', color: 'var(--bad)' }]} /></g>
        <ClipCard x={230} y={350} w={940} h={84} op={fade(t, 26, 99)} color="var(--good)">
          <text x={700} y={405} fontSize={36} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الناتج يساوي العدد الأول: الإجابة صحيحة ✓</text>
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
      [5, 'وجدنا ناتج الطرح: **٣٥**'],
      [11, 'نجمع الناتج والعدد المطروح'],
      [19, '٣٥ + ٢٩ = **٦٤**'],
      [26, 'يساوي العدد الأول: إجابتنا **صحيحة**'],
    ]}
  />
);
