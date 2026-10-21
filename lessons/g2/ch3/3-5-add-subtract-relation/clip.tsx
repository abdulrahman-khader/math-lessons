import { Clip, ClipTitle, Cube, SvgEq, lerp, tw, type EqPart } from '@engine';

/* مقطع فكرة الدرس: ٥ مكعبات و٤ مكعبات (أستعد ص ٧٢) ← أربع حقائق مترابطة */

const BLUE = '#4f9be0', RED = '#e8635a';
const C5 = { v: 5, color: BLUE }, C4 = { v: 4, color: RED };
const S = 52;
const trainX = (k: number, gap: number) => 700 + (4 - k) * (S + 6) - (k >= 5 ? gap : 0) + gap / 2;

/** [يظهر عند، x، y، الجملة] */
const FACTS: [number, number, number, EqPart[]][] = [
  [9.5, 1000, 330, [C5, '+', C4, '=', 9]],
  [14.5, 1000, 450, [9, '−', C4, '=', C5]],
  [20.5, 420, 450, [9, '−', C5, '=', C4]],
  [26, 420, 330, [C4, '+', C5, '=', 9]],
];

function scene(t: number) {
  const gap = 90 * (1 - tw(t, 8.5, 9.5));
  // أي مجموعة أُخذت الآن
  const takeRed = tw(t, 14.5, 15.5) * (1 - tw(t, 19.5, 20.3));
  const takeBlue = tw(t, 20.5, 21.5) * (1 - tw(t, 25.5, 26.3));
  const ring = tw(t, 31, 31.6);
  return (
    <>
      <ClipTitle t={t} title="الْعَلاقَةُ بَيْنَ الْجَمْعِ وَالطَّرْحِ" q="كيف يساعدنا الجمع على الطرح؟" />

      {Array.from({ length: 9 }, (_, k) => {
        const red = k >= 5;
        const take = red ? takeRed : takeBlue;
        return (
          <Cube
            key={k}
            x={trainX(k, gap)}
            y={lerp(150, 230, take)}
            s={S}
            color={red ? RED : BLUE}
            op={tw(t, 4.5 + k * 0.2, 4.8 + k * 0.2) * (1 - 0.8 * take)}
          />
        );
      })}

      {FACTS.map(([s, x, y, parts], i) => (
        <g key={i} opacity={tw(t, s, s + 0.6)}>
          {ring > 0 && <rect x={x - 200} y={y - 72} width={400} height={96} rx={16} fill="var(--paper)" stroke="var(--hl)" strokeWidth={4} opacity={ring} />}
          <SvgEq x={x} y={y} size={66} parts={parts} />
        </g>
      ))}
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={40}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'عندنا **٥** مكعبات زرقاء و**٤** مكعبات حمراء'],
      [8.5, 'نضمّها معًا: ٥ + ٤ = **٩**'],
      [14.5, 'نأخذ الحمراء **٤**، فيبقى ٥: ٩ − ٤ = **٥**'],
      [20.5, 'نأخذ الزرقاء **٥**، فيبقى ٤: ٩ − ٥ = **٤**'],
      [26, 'ونستطيع أن نبدأ بالحمراء: ٤ + ٥ = **٩**'],
      [31, 'أربع **حقائق مترابطة** بالأعداد نفسها: ٥ و٤ و٩'],
      [35.5, 'الجمع **عكس** الطرح'],
    ]}
  />
);
