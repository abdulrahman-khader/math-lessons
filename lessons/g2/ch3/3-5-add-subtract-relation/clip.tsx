import { Clip, ClipTitle, Cube, SvgEq, lerp, tw, type EqPart } from '@engine';

/* مقطع فكرة الدرس: ٦ مكعبات و٢ (مثال غير مثال الكتاب) ← أربع حقائق مترابطة */

const A = 6, B = 2, N = A + B;

const BLUE = '#4f9be0', RED = '#e8635a';
const CA = { v: A, color: BLUE }, CB = { v: B, color: RED };
const S = 52;
const trainX = (k: number, gap: number) => 700 + ((N - 1) / 2 - k) * (S + 6) - (k >= A ? gap : 0) + gap / 2;

/** [يظهر عند، x، y، الجملة] */
const FACTS: [number, number, number, EqPart[]][] = [
  [9.5, 1000, 330, [CA, '+', CB, '=', N]],
  [14.5, 1000, 450, [N, '−', CB, '=', CA]],
  [20.5, 420, 450, [N, '−', CA, '=', CB]],
  [26, 420, 330, [CB, '+', CA, '=', N]],
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

      {Array.from({ length: N }, (_, k) => {
        const red = k >= A;
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
      [4.5, 'عندنا **٦** مكعبات زرقاء ومكعبان أحمران'],
      [8.5, 'نضمّها معًا: ٦ + ٢ = **٨**'],
      [14.5, 'نأخذ الحمراء **٢**، فيبقى ٦: ٨ − ٢ = **٦**'],
      [20.5, 'نأخذ الزرقاء **٦**، فيبقى ٢: ٨ − ٦ = **٢**'],
      [26, 'ونستطيع أن نبدأ بالحمراء: ٢ + ٦ = **٨**'],
      [31, 'أربع **حقائق مترابطة** بالأعداد نفسها: ٦ و٢ و٨'],
      [35.5, 'الجمع **عكس** الطرح'],
    ]}
  />
);
