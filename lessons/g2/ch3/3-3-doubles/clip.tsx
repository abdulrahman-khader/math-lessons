import { Clip, ClipTitle, Cube, SvgEq, tw, type EqPart } from '@engine';

/* مقطع فكرة الدرس: برجان متساويان (أستعد ص ٦٦): ٨ + ٨ = ١٦، إذن ١٦ − ٨ = ٨ */

const ORANGE = '#f4913a', GREEN = '#5cb85c';
const S = 44, BOTTOM = 470;
const cubeY = (k: number) => BOTTOM - (k + 0.5) * (S + 2);
const TOWERS = [
  { x: 1150, color: ORANGE },
  { x: 1000, color: GREEN },
];
const CROSS = (k: number) => 18 + k * 0.45;

function scene(t: number) {
  const eq1: EqPart[] = [8, '+', 8, '=', { v: 16, color: 'var(--rule)' }];
  const eq2: EqPart[] = [16, '−', 8, '=', { v: t > 23 ? 8 : '؟', box: true }];
  const leftOver = tw(t, 22, 23);
  return (
    <>
      <ClipTitle t={t} size={58} title="الطَّرْحُ باسْتِعْمَالِ حَقَائِقِ جَمْعِ الْعَدَدِ وَنَفْسِهِ" q="هل نحتاج أن نعدّ لنجد ١٦ − ٨؟" />

      {TOWERS.map((tw_, j) =>
        Array.from({ length: 8 }, (_, k) => {
          const op = tw(t, 4.5 + j * 2 + k * 0.2, 4.8 + j * 2 + k * 0.2);
          const crossed = j === 0 ? tw(t, CROSS(k), CROSS(k) + 0.35) : 0;
          return <Cube key={`${j}-${k}`} x={tw_.x} y={cubeY(k)} s={S} color={tw_.color} op={op * (j === 0 ? 1 - 0.55 * leftOver : 1)} crossed={crossed} />;
        }),
      )}
      {leftOver > 0 && <rect x={TOWERS[1].x - 34} y={cubeY(7) - 34} width={68} height={8 * (S + 2) + 22} rx={10} fill="none" stroke="var(--hl)" strokeWidth={6} opacity={leftOver} />}

      <g opacity={tw(t, 10, 10.6)}>
        <text x={470} y={150} fontSize={30} textAnchor="middle" fill="var(--muted)">أعرف أنّ</text>
        <SvgEq x={470} y={235} size={78} parts={eq1} />
      </g>
      <g opacity={tw(t, 15, 15.6)}>
        <text x={470} y={330} fontSize={30} textAnchor="middle" fill="var(--muted)">إذن</text>
        <SvgEq x={470} y={420} size={78} parts={eq2} />
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={34}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'برجان متساويان: في كل برج **٨** مكعبات'],
      [10, 'جمع العدد ونفسه: ٨ + ٨ = **١٦**'],
      [15, 'الآن نريد أن نجد: ١٦ − ٨'],
      [18, 'نشطب البرج البرتقالي: **٨** مكعبات'],
      [22.5, 'يبقى البرج الأخضر: ١٦ − ٨ = **٨**'],
      [27.5, 'إذا عرفتُ ٨ + ٨ = ١٦، عرفتُ أنّ ١٦ − ٨ = **٨**'],
    ]}
  />
);
