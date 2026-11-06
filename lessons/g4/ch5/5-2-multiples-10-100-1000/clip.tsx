import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٣ × ٨ ثم مضاعفاته (مثال غير أمثلة الكتاب): الناتج الأساسي ثم الأصفار */

const ROWS: [number, number, number][] = [
  [8, 24, 5],
  [80, 240, 11],
  [800, 2400, 17],
  [8000, 24000, 23],
];

function scene(t: number) {
  const body = fade(t, 4.5, 99);
  return (
    <>
      <ClipTitle t={t} title="الضربُ في مضاعفاتِ ١٠ و١٠٠ و١٠٠٠" q="ما ناتجُ ٣ × ٨٠٠٠؟" />
      <g opacity={body}>
        {ROWS.map(([a, b, s], i) => (
          <g key={a} opacity={tw(t, s, s + 0.6)}>
            <SvgEq x={700} y={110 + i * 80} size={60} parts={[3, '×', a, '=', { v: b, color: 'var(--good)' }]} />
          </g>
        ))}
        <ClipCard x={200} y={400} w={1000} h={90} op={fade(t, 30, 99)} color="var(--good)">
          <text x={700} y={460} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الحقيقةُ الأساسيَّةُ ثمَّ الأصفارُ</text>
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
      [5, 'نبدأ بالحقيقة الأساسية: ٣ × ٨ = **٢٤**'],
      [11, '٨٠ فيها صفر واحد، فالناتج **٢٤٠**'],
      [17, '٨٠٠ فيها صفران، فالناتج **٢٤٠٠**'],
      [23, '٨٠٠٠ فيها ثلاثة أصفار، فالناتج **٢٤٠٠٠**'],
      [30, 'نجد ناتج الحقيقة الأساسية، ثم نضيف **الأصفار**'],
    ]}
  />
);
