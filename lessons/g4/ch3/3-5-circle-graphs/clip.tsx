import { Clip, ClipCard, Person, SvgFrac, fade, lerp, num, sector, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٨ طلاب ← مجموعات ← حول دائرة ← قطاعات (مثال غير مثال الكتاب) */

const CITIES = [
  { name: 'البرتقال', n: 4, color: '#ffab4a', ink: '#13213b' },
  { name: 'التفاح', n: 2, color: '#d9534f', ink: '#ffffff' },
  { name: 'المانجو', n: 2, color: '#f6d743', ink: '#13213b' },
];
const CHOICES = [0, 1, 0, 2, 0, 2, 1, 0];
const ORDER = CHOICES.map((c, i) => [c, i]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).map((x) => x[1]);
const SLOT: number[] = [];
ORDER.forEach((kid, s) => (SLOT[kid] = s));

const CX = 700, CY = 250, R = 215;
const pt = (deg: number, r: number) => [CX + r * Math.sin((deg * Math.PI) / 180), CY - r * Math.cos((deg * Math.PI) / 180)];
const rowX = (i: number) => 700 + (3.5 - i) * 150;
const GROUP_X = (() => {
  const xs: number[] = [];
  let x = 0;
  ORDER.forEach((kid, s) => {
    if (s && CHOICES[ORDER[s - 1]] !== CHOICES[kid]) x += 60;
    xs[kid] = x;
    x += 110;
  });
  const w = x - 110;
  return xs.map((v) => 700 + w / 2 - v);
})();
let acc = 0;
const GROUPS = CITIES.map((c) => {
  const g = { ...c, a0: acc, a1: acc + c.n * 45 };
  acc = g.a1;
  return g;
});

/** [من، إلى، القطاعات المبرزة، العنوان، العدد، الكسر] */
const FOCUS: [number, number, number[], string, string, [number, number] | null][] = [
  [31.5, 37, [0], 'البرتقال', '٤ من ٨', [1, 2]],
  [37, 42, [1], 'التفاح', '٢ من ٨', [1, 4]],
  [42, 47, [1, 2], 'التفاح والمانجو', '٢ من ٨ لكلٍّ منهما', null],
];
const RECAP = ['الدائرة كلها = كل الطلاب', 'القطاع الأكبر = الأكثر اختيارًا', 'نصف الدائرة = نصف الطلاب'];

function scene(t: number) {
  const toColor = tw(t, 9, 10.5), toGroup = tw(t, 11, 13.5), toRing = tw(t, 15, 18);
  const merged = tw(t, 27, 29.5);
  const focus = FOCUS.find(([a, b]) => t >= a && t < b);
  const shift = 230 * tw(t, 47, 48.5);
  const title = 1 - tw(t, 3.7, 4.2);
  return (
    <>
      {title > 0 && (
        <g opacity={title}>
          <text x={700} y={190} fontSize={84} textAnchor="middle" fill="var(--rule)" style={{ fontFamily: 'var(--display)' }}>
            التَّمثيلُ بِالقِطاعاتِ الدَّائريَّةِ
          </text>
          <text x={700} y={300} fontSize={40} textAnchor="middle">
            كيف نرسم «كل الطلاب» في دائرة واحدة؟
          </text>
        </g>
      )}

      {/* المفتاح */}
      <g opacity={fade(t, 9.5, 31.5)}>
        {CITIES.map((c, i) => (
          <g key={c.name} transform={`translate(1330,${80 + i * 56})`}>
            <rect x={-14} y={-18} width={34} height={34} rx={8} fill={c.color} stroke="var(--ink)" strokeWidth={2} />
            <text x={-30} y={10} fontSize={30} textAnchor="start" direction="rtl">
              {c.name}
            </text>
          </g>
        ))}
      </g>

      <g transform={`translate(${shift},0)`}>
        {/* قطعة لكل طالب تنمو مكانه */}
        <g opacity={1 - merged}>
          {ORDER.map((kid, s) => (
            <path key={s} d={sector(CX, CY, s * 45, (s + 1) * 45, R * tw(t, 21 + s * 0.45, 21.8 + s * 0.45))} fill={CITIES[CHOICES[kid]].color} stroke="#fff" strokeWidth={3} />
          ))}
        </g>
        {/* قطاع لكل مدينة */}
        {GROUPS.map((g, i) => {
          const on = !focus || focus[2].includes(i);
          const mid = (g.a0 + g.a1) / 2;
          const [lx, ly] = pt(mid, g.n > 1 ? R * 0.55 : R * 0.68);
          return (
            <g key={g.name} opacity={on ? 1 : 0.3}>
              <path d={sector(CX, CY, g.a0, g.a1, R)} fill={g.color} stroke="#fff" strokeWidth={4} opacity={merged} />
              {/* سطران منفصلان: Safari يخلط الاسم بالعدد إذا جُمعا في نص واحد */}
              <g style={{ fill: g.ink }} opacity={tw(t, 29, 30.5)}>
                <text x={lx} y={ly - 4} fontSize={g.n > 1 ? 34 : 26} textAnchor="middle" style={{ fill: g.ink }}>{g.name}</text>
                <text x={lx} y={ly + (g.n > 1 ? 36 : 28)} fontSize={g.n > 1 ? 34 : 26} textAnchor="middle" style={{ fill: g.ink }}>{num(g.n)}</text>
              </g>
            </g>
          );
        })}
        {focus &&
          focus[2].map((i) => (
            <path key={i} d={sector(CX, CY, GROUPS[i].a0, GROUPS[i].a1, R)} fill="none" stroke="var(--ink)" strokeWidth={9} strokeLinejoin="round" />
          ))}

        {/* الطلاب: صف، ثم مجموعات، ثم حول الدائرة */}
        {CHOICES.map((c, i) => {
          const [rx, ry] = pt((SLOT[i] + 0.5) * 45, R * 0.62);
          const x = lerp(lerp(rowX(i), GROUP_X[i], toGroup), rx, toRing);
          const y = lerp(CY + 10, ry, toRing);
          const pop = tw(t, 4.5 + i * 0.25, 5 + i * 0.25);
          const s = pop * lerp(1, 0.75, toRing) * (1 - tw(t, 21 + SLOT[i] * 0.45, 21.6 + SLOT[i] * 0.45));
          return <Person key={i} x={x} y={y} s={s} fill={toColor > 0.5 ? CITIES[c].color : '#dbe5f1'} label={CITIES[c].name} labelOpacity={toColor * (1 - toRing)} />;
        })}
      </g>

      {/* البطاقة الجانبية */}
      {focus && (
        <ClipCard x={60} y={110} w={400} h={270} op={Math.min(tw(t, focus[0], focus[0] + 0.5), 1 - tw(t, focus[1] - 0.4, focus[1]))}>
          <text x={260} y={180} fontSize={40} textAnchor="middle">{focus[3]}</text>
          <text x={260} y={255} fontSize={focus[5] ? 44 : 34} textAnchor="middle" direction="rtl">{focus[4]}</text>
          {focus[5] ? (
            <>
              <text x={420} y={335} fontSize={40} textAnchor="start" direction="rtl" style={{ fill: 'var(--hl)' }}>
                {focus[5][1] === 2 ? 'نصف الدائرة' : 'ربع الدائرة'}
              </text>
              <SvgFrac x={150} y={322} n={focus[5][0]} d={focus[5][1]} size={38} color="var(--hl)" />
            </>
          ) : (
            <text x={260} y={335} fontSize={38} textAnchor="middle" style={{ fill: 'var(--hl)' }}>قطاعان متساويان</text>
          )}
        </ClipCard>
      )}

      {/* الملخص */}
      {RECAP.map((r, i) => {
        const op = tw(t, 47.5 + i * 0.8, 48.3 + i * 0.8);
        return op > 0 ? (
          <g key={r} opacity={op}>
            <rect x={50} y={90 + i * 120} width={560} height={92} rx={16} fill="var(--rule-t)" />
            <rect x={600} y={90 + i * 120} width={10} height={92} fill="var(--rule)" />
            <text x={580} y={148 + i * 120} fontSize={34} textAnchor="start" direction="rtl">{r}</text>
          </g>
        ) : null;
      })}
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={54}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'سألنا **٨** طلاب: ما عصيرك المفضّل؟'],
      [9, 'كل لون عصير… نجمع طلاب كل عصير معًا'],
      [15, 'الآن نرتّب الطلاب الثمانية حول دائرة'],
      [20.5, 'كل طالب = قطعة واحدة من **٨** قطع متساوية'],
      [26.5, 'نضمّ قطع العصير الواحد… فيصير لكل عصير **قطاع**'],
      [31.5, 'البرتقال: **٤** طلاب من **٨** ← نصف الدائرة'],
      [37, 'التفاح: **٢** من **٨** ← ربع الدائرة'],
      [42, 'التفاح والمانجو: قطاعان متساويان ← العدد نفسه'],
      [47, 'هذا هو **التمثيل بالقطاعات الدائرية**'],
    ]}
  />
);
