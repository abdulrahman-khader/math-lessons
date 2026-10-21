import { Clip, ClipTitle, SvgEq, num, tw, type EqPart } from '@engine';

/* مقطع فكرة الدرس: مثلث الحقائق للأعداد ٣ و٧ و١٠ (أستعد ص ٧٦) ← أربع حقائق مترابطة */

const TOP = { x: 1060, y: 105, v: 10 };
const LEFT = { x: 890, y: 400, v: 3 };
const RIGHT = { x: 1230, y: 400, v: 7 };
const CORNERS = [TOP, LEFT, RIGHT];

/** [يظهر عند، x، y، الجملة، الرؤوس المبرزة] */
const FACTS: [number, number, number, EqPart[], number[]][] = [
  [10, 610, 230, [7, '+', 3, '=', { v: 10, color: 'var(--rule)' }], [2, 1, 0]],
  [15, 230, 230, [10, '−', 3, '=', { v: 7, color: 'var(--rule)' }], [0, 1, 2]],
  [20, 610, 390, [3, '+', 7, '=', { v: 10, color: 'var(--rule)' }], [1, 2, 0]],
  [25, 230, 390, [10, '−', 7, '=', { v: 3, color: 'var(--rule)' }], [0, 2, 1]],
];

function scene(t: number) {
  const tri = tw(t, 4.5, 5.3);
  const cur = [...FACTS].reverse().find(([s]) => t >= s && t < 30);
  const all = tw(t, 30, 30.6);
  return (
    <>
      <ClipTitle t={t} title="الْحَقَائِقُ الْمُتَرَابِطَةُ" q="كم جملة نكوّن من ثلاثة أعداد؟" />

      {tri > 0.01 && (
        <g opacity={tri}>
          <path d={`M${TOP.x},${TOP.y} L${LEFT.x},${LEFT.y} L${RIGHT.x},${RIGHT.y} Z`} fill="#e2edfb" stroke="var(--rule)" strokeWidth={6} strokeLinejoin="round" />
          {CORNERS.map((c, i) => {
            const on = cur?.[4].includes(i);
            return (
              <g key={i}>
                <circle cx={c.x} cy={c.y} r={54} fill="var(--paper)" stroke={on ? 'var(--hl)' : 'var(--rule)'} strokeWidth={on ? 8 : 5} />
                <text x={c.x} y={c.y + 22} fontSize={60} textAnchor="middle" fill={i === 0 ? 'var(--rule)' : undefined}>{num(c.v)}</text>
              </g>
            );
          })}
          <text x={TOP.x} y={500} fontSize={26} textAnchor="middle" fill="var(--muted)" opacity={tw(t, 6, 6.6) * (1 - tw(t, 9.5, 10))}>المجموع في الأعلى، والجزآن في الأسفل</text>
        </g>
      )}

      {FACTS.map(([s, x, y, parts], i) => (
        <g key={i} opacity={tw(t, s, s + 0.6)}>
          {(cur?.[0] === s || all > 0) && <rect x={x - 180} y={y - 70} width={360} height={94} rx={16} fill="var(--paper)" stroke="var(--hl)" strokeWidth={4} opacity={cur?.[0] === s ? 1 : all} />}
          <SvgEq x={x} y={y} size={62} parts={parts} />
        </g>
      ))}
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={36}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'مثلث الحقائق: المجموع **١٠** في الأعلى، والجزآن ٣ و٧ في الأسفل'],
      [10, 'نجمع الجزأين: ٧ + ٣ = **١٠**'],
      [15, 'نطرح جزءًا من المجموع: ١٠ − ٣ = **٧**'],
      [20, 'نغيّر ترتيب الجمع: ٣ + ٧ = **١٠**'],
      [25, 'ونطرح الجزء الآخر: ١٠ − ٧ = **٣**'],
      [30, 'أربع جمل بالأعداد نفسها: **مجموعة الحقائق المترابطة**'],
    ]}
  />
);
