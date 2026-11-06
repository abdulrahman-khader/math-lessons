import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٣ × ٣٢ (مثال غير أمثلة الكتاب): الآحاد ثم العشرات */

function scene(t: number) {
  const body = fade(t, 4.5, 99);
  return (
    <>
      <ClipTitle t={t} title="الضربُ دونَ إعادةِ التجميعِ" q="كم قلمًا في ٣ علبٍ، في كلٍّ منها ٣٢ قلمًا؟" />
      <g opacity={body}>
        <SvgEq x={700} y={80} size={60} parts={[3, '×', 32]} />
        <g opacity={tw(t, 8, 8.6)}>
          <rect x={960} y={130} width={160} height={200} fill="#a9c8ec" stroke="var(--ink)" strokeWidth={3} />
          <SvgEq x={1040} y={240} size={38} parts={[3, '×', 2]} />
        </g>
        <g opacity={tw(t, 14, 14.6)}>
          <rect x={280} y={130} width={680} height={200} fill="#f8cf9f" stroke="var(--ink)" strokeWidth={3} />
          <SvgEq x={620} y={240} size={46} parts={[3, '×', 30]} />
        </g>
        <g opacity={tw(t, 20, 20.6)}>
          <SvgEq x={700} y={400} size={56} parts={[6, '+', 90, '=', { v: 96, color: 'var(--good)' }]} />
        </g>
        <ClipCard x={300} y={425} w={800} h={80} op={fade(t, 27, 99)} color="var(--good)">
          <text x={700} y={480} fontSize={38} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نضربُ الآحادَ، ثمَّ العشراتِ</text>
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
      [8, 'نضرب الآحاد: ٣ × ٢ = **٦**'],
      [14, 'ثم العشرات: ٣ × ٣٠ = **٩٠**'],
      [20, 'نجمع نواتج الضرب الجزئية: **٩٦**'],
      [27, 'نضرب **الآحاد**، ثم **العشرات**'],
    ]}
  />
);
