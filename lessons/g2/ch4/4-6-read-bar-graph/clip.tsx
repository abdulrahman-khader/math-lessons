import { Clip, ClipCard, ClipTitle, SvgEq, fade } from '@engine';

/* مقطع فكرة الدرس: ألعاب الحديقة المفضلة (مثال غير مثال الكتاب): الأرجوحة ٧، الزحليقة ٤، الدوّامة ٤، الميزان ٢ */

const BARS: [string, number, string][] = [
  ['الأرجوحة', 7, '#4f9be0'],
  ['الزحليقة', 4, '#f6a54a'],
  ['الدوّامة', 4, '#5fbf87'],
  ['الميزان', 2, '#b48ad8'],
];
const S = 46;
const X0 = 1100;

function scene(t: number) {
  const hl = t >= 8 && t < 15 ? [0] : t >= 15 && t < 22 ? [3] : t >= 22 && t < 29 ? [1, 2] : t >= 29 && t < 36 ? [0, 3] : [];
  return (
    <>
      <ClipTitle t={t} title="قِرَاءَةُ الأَعْمِدَةِ" q="ما لعبتك المفضلة في الحديقة؟" />
      <g opacity={fade(t, 4.5, 99)}>
        {BARS.map(([label, n, color], i) => {
          const x = X0 - i * 160;
          const on = hl.includes(i);
          return (
            <g key={label}>
              {Array.from({ length: 8 }, (_, k) => (
                <rect key={k} x={x} y={400 - (k + 1) * S} width={110} height={S} stroke={on ? 'var(--hl)' : 'var(--ink)'} strokeWidth={on ? 5 : 3} fill={k < n ? color : 'var(--paper)'} />
              ))}
              <text x={x + 55} y={440} fontSize={30} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>{label}</text>
            </g>
          );
        })}
        {Array.from({ length: 9 }, (_, k) => (
          <SvgEq key={k} x={X0 + 150} y={410 - k * S} size={28} parts={[k]} />
        ))}
      </g>
      {[
        [8, 15, 'الأكثر: الأرجوحة (٧)'],
        [15, 22, 'الأقل: الميزان (٢)'],
        [22, 29, 'متساويان: الزحليقة والدوّامة (٤)'],
        [29, 36, 'تزيد الأرجوحة على الميزان: ٧ − ٢ = ٥'],
        [36, 99, 'أنظر إلى أعلى العمود وأقرأ العدد'],
      ].map(([a, b, s]) => (
        <ClipCard key={a as number} x={60} y={180} w={480} h={110} op={fade(t, a as number, b as number)} color="var(--good)">
          <text x={300} y={248} fontSize={30} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>{s as string}</text>
        </ClipCard>
      ))}
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={42}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [5, 'هذا تمثيل بالأعمدة لألعاب الحديقة'],
      [8, 'أطول عمود: **الأرجوحة** ٧ طلاب'],
      [15, 'أقصر عمود: **الميزان** طالبان'],
      [22, 'عمودان بالطول نفسه: **متساويان**'],
      [29, 'كم تزيد الأرجوحة على الميزان؟ **٥**'],
      [36, 'من الأعمدة نعرف **الأكثر والأقل** بسرعة'],
    ]}
  />
);
