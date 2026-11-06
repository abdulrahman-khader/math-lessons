import { Clip, ClipCard, ClipTitle, SvgEq, fade, num, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٤ × ٣٦ (مثال غير أمثلة الكتاب): نكتب الآحاد، ونحمل العشرات ونجمعها بعد الضرب */

const D = ({ x, y, v, op = 1, color = 'var(--ink)', size = 72 }: { x: number; y: number; v: number | string; op?: number; color?: string; size?: number }) =>
  op <= 0.01 ? null : (
    <text x={x} y={y} opacity={op} fontSize={size} textAnchor="middle" fill={color} direction="ltr" style={{ fontWeight: 800 }}>
      {typeof v === 'number' ? num(v) : v}
    </text>
  );

function scene(t: number) {
  const body = fade(t, 4.5, 99);
  return (
    <>
      <ClipTitle t={t} title="الضربُ معَ إعادةِ التجميعِ" q="كمْ تفاحةً في ٤ صناديقَ، في كلٍّ منها ٣٦ تفاحةً؟" size={70} />
      <g opacity={body}>
        {/* الضرب الرأسي */}
        <D x={960} y={80} v={2} size={46} color="var(--bad)" op={tw(t, 15, 15.5)} />
        <D x={960} y={160} v={3} />
        <D x={1040} y={160} v={6} />
        <D x={1115} y={250} v="×" />
        <D x={1040} y={250} v={4} />
        <line x1={850} x2={1150} y1={280} y2={280} stroke="var(--ink)" strokeWidth={5} />
        <D x={1040} y={360} v={4} color="var(--good)" op={tw(t, 15, 15.5)} />
        <D x={960} y={360} v={4} color="var(--good)" op={tw(t, 28, 28.5)} />
        <D x={880} y={360} v={1} color="var(--good)" op={tw(t, 28, 28.5)} />
        {/* الجمل */}
        <g opacity={tw(t, 9, 9.5)}>
          <SvgEq x={460} y={120} size={54} parts={[4, '×', 6, '=', 24]} />
        </g>
        <g opacity={tw(t, 21, 21.5)}>
          <SvgEq x={460} y={220} size={54} parts={[4, '×', 3, '=', 12]} />
        </g>
        <g opacity={tw(t, 25, 25.5)}>
          <SvgEq x={460} y={320} size={54} parts={[12, '+', 2, '=', 14]} />
        </g>
        <ClipCard x={230} y={415} w={940} h={84} op={fade(t, 34, 99)} color="var(--good)">
          <text x={700} y={470} fontSize={36} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نضربُ أوَّلًا، ثمَّ نجمعُ العشراتِ المحمولةَ</text>
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
      [9, 'نضرب الآحاد: ٤ × ٦ = **٢٤**'],
      [15, 'نكتب **٤** آحاد، ونعيد تجميع **٢** عشرات'],
      [21, 'نضرب العشرات: ٤ × ٣ = **١٢**'],
      [25, 'نجمع: ١٢ + ٢ = **١٤** عشرة'],
      [28, 'الناتج: **١٤٤**'],
      [34, 'نضرب أولًا، ثم **نجمع** العشرات المحمولة'],
    ]}
  />
);
