import { Clip, ClipCard, ClipTitle, SvgEq, fade, num, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٣ × ٢٤٦ (مثال غير أمثلة الكتاب): الآحاد، ثم العشرات، ثم المئات */

const D = ({ x, y, v, op = 1, color = 'var(--ink)', size = 68 }: { x: number; y: number; v: number | string; op?: number; color?: string; size?: number }) =>
  op <= 0.01 ? null : (
    <text x={x} y={y} opacity={op} fontSize={size} textAnchor="middle" fill={color} direction="ltr" style={{ fontWeight: 800 }}>
      {typeof v === 'number' ? num(v) : v}
    </text>
  );

function scene(t: number) {
  const body = fade(t, 4.5, 99);
  return (
    <>
      <ClipTitle t={t} title="ضربُ عددٍ مِن ثلاثةِ أرقامٍ" q="كمْ كتابًا في ٣ مكتباتٍ، في كلٍّ منها ٢٤٦ كتابًا؟" size={70} />
      <g opacity={body}>
        <D x={980} y={76} v={1} size={44} color="var(--bad)" op={tw(t, 9, 9.5)} />
        <D x={900} y={76} v={1} size={44} color="var(--bad)" op={tw(t, 16, 16.5)} />
        <D x={900} y={150} v={2} />
        <D x={980} y={150} v={4} />
        <D x={1060} y={150} v={6} />
        <D x={1135} y={235} v="×" />
        <D x={1060} y={235} v={3} />
        <line x1={850} x2={1170} y1={262} y2={262} stroke="var(--ink)" strokeWidth={5} />
        <D x={1060} y={340} v={8} color="var(--good)" op={tw(t, 9, 9.5)} />
        <D x={980} y={340} v={3} color="var(--good)" op={tw(t, 16, 16.5)} />
        <D x={900} y={340} v={7} color="var(--good)" op={tw(t, 23, 23.5)} />
        <g opacity={tw(t, 9, 9.5)}><SvgEq x={440} y={100} size={50} parts={[3, '×', 6, '=', 18]} /></g>
        <g opacity={tw(t, 16, 16.5)}><SvgEq x={440} y={200} size={50} parts={[12, '+', 1, '=', 13]} /></g>
        <g opacity={tw(t, 23, 23.5)}><SvgEq x={440} y={300} size={50} parts={[6, '+', 1, '=', 7]} /></g>
        <ClipCard x={230} y={405} w={940} h={84} op={fade(t, 30, 99)} color="var(--good)">
          <text x={700} y={460} fontSize={38} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الآحادُ، ثمَّ العشراتُ، ثمَّ المئاتُ</text>
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
      [9, 'الآحاد: ٣ × ٦ = **١٨**، نكتب ٨ ونعيد تجميع ١'],
      [16, 'العشرات: ١٢ + ١ = **١٣**، نكتب ٣ ونعيد تجميع ١'],
      [23, 'المئات: ٦ + ١ = **٧**'],
      [30, 'الناتج **٧٣٨**: الآحاد، ثم العشرات، ثم المئات'],
    ]}
  />
);
