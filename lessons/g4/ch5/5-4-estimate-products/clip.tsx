import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٧ × ٣٨ (مثال غير أمثلة الكتاب): نقرّب ٣٨ إلى ٤٠ ثم نضرب ذهنيًّا */

function scene(t: number) {
  const body = fade(t, 4.5, 99);
  const a = 260;
  const pos = (n: number) => a + (n - 30) * 88;
  return (
    <>
      <ClipTitle t={t} title="تقديرُ نواتجِ الضربِ" q="في ٧ صناديقَ، في كلٍّ منها ٣٨ كرةً" />
      <g opacity={body}>
        <SvgEq x={700} y={80} size={60} parts={[7, '×', 38]} />
        <g opacity={tw(t, 9, 9.6)}>
          <line x1={a - 30} y1={200} x2={pos(40) + 30} y2={200} stroke="var(--ink)" strokeWidth={4} />
          {Array.from({ length: 11 }, (_, i) => (
            <g key={i}>
              <line x1={pos(30 + i)} y1={186} x2={pos(30 + i)} y2={214} stroke="var(--ink)" strokeWidth={3} />
              <SvgEq x={pos(30 + i)} y={254} size={30} parts={[30 + i]} />
            </g>
          ))}
          <circle cx={pos(38)} cy={200} r={15} fill="var(--good)" />
        </g>
        <g opacity={tw(t, 15, 15.6)}>
          <path d={`M${pos(38)} 170 Q${pos(39)} 120 ${pos(40)} 170`} fill="none" stroke="var(--good)" strokeWidth={5} />
        </g>
        <g opacity={tw(t, 21, 21.6)}>
          <SvgEq x={700} y={340} size={60} parts={[7, '×', 40, '=', { v: 280, color: 'var(--good)' }]} />
        </g>
        <ClipCard x={250} y={385} w={900} h={95} op={fade(t, 28, 99)} color="var(--good)">
          <text x={700} y={448} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>في الصناديقِ ٢٨٠ كرةً تقريبًا</text>
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
      [5, 'لا نحتاج إجابة دقيقة، بل **تقديرًا**'],
      [9, 'أين يقع **٣٨** على خط الأعداد؟'],
      [15, '٣٨ أقرب إلى **٤٠** من ٣٠'],
      [21, 'نضرب ذهنيًّا: ٧ × ٤٠ = **٢٨٠**'],
      [28, 'في الصناديق **٢٨٠** كرة تقريبًا'],
    ]}
  />
);
