import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';

/* مقطع فكرة الدرس: صناديق أقلام في كل منها ٧ أقلام حمراء والباقي زرقاء (مثال غير أمثلة الكتاب): الزرقاء = △ − ٧ */

const ROWS: [number, number, number][] = [
  [10, 3, 5],
  [12, 5, 10],
  [15, 8, 20],
  [20, 13, 26],
];
const RED = '#e8635a', BLUE = '#4f9be0';

/** صندوق أقلام: ٧ حمراء ثم الزرقاء، كأعواد رأسية */
function Box({ n, t, a }: { n: number; t: number; a: number }) {
  const op = fade(t, a, 99);
  if (op <= 0.01) return null;
  const blue = tw(t, a + 1.2, a + 2);
  return (
    <g opacity={op}>
      <rect x={60} y={150} width={n * 30 + 30} height={170} rx={14} fill="var(--paper)" stroke="var(--ink)" strokeWidth={4} />
      {Array.from({ length: n }, (_, i) => {
        const red = i < 7;
        const x = 60 + n * 30 - i * 30;
        return <rect key={i} x={x} y={175} width={18} height={120} rx={6} fill={red ? RED : BLUE} stroke="var(--ink)" strokeWidth={2} opacity={red ? 1 : blue} />;
      })}
    </g>
  );
}

function scene(t: number) {
  const row = ROWS.reduce((k, r, i) => (t >= r[2] ? i : k), -1);
  return (
    <>
      <ClipTitle t={t} title="جداولُ الدَّوالِّ" q="كم قلمًا أزرقَ في الصندوق؟" />
      {row >= 0 && <Box key={row} n={ROWS[row][0]} t={t} a={ROWS[row][2]} />}
      <g opacity={fade(t, 5, 99)}>
        <rect x={900} y={30} width={420} height={64} fill="#f4a582" stroke="var(--ink)" strokeWidth={3} />
        <text x={1110} y={74} fontSize={32} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>
          {t < 15 ? 'القاعدةُ: ؟' : 'القاعدةُ: △ − ٧'}
        </text>
        {['كل الأقلام △', 'الزرقاء □'].map((h, i) => (
          <g key={h}>
            <rect x={1110 - i * 210} y={94} width={210} height={56} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
            <text x={1215 - i * 210} y={132} fontSize={26} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>{h}</text>
          </g>
        ))}
        {ROWS.map(([a, b, s], i) => (
          <g key={i} opacity={tw(t, s, s + 0.5)}>
            <rect x={1110} y={150 + i * 62} width={210} height={62} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
            <rect x={900} y={150 + i * 62} width={210} height={62} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
            <SvgEq x={1215} y={196 + i * 62} size={38} parts={[a]} />
            <g opacity={tw(t, s + 2, s + 2.5)}>
              <SvgEq x={1005} y={196 + i * 62} size={38} parts={[{ v: b, color: BLUE }]} />
            </g>
          </g>
        ))}
      </g>
      <ClipCard x={60} y={380} w={760} h={110} op={fade(t, 15, 99)} color="var(--qs)">
        <SvgEq x={440} y={455} size={52} parts={t < 31 ? ['□', '=', '△', '−', 7] : [20, '−', 7, '=', { v: 13, color: BLUE }]} />
      </ClipCard>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={42}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [5, 'في الصندوق **١٠** أقلام: ٧ حمراء، والباقي زرقاء'],
      [7, 'الزرقاء **٣**'],
      [10, 'صندوق فيه **١٢** قلمًا: الزرقاء ٥'],
      [15, 'نطرح الحمراء دائمًا: القاعدة **△ − ٧**'],
      [20, '١٥ − ٧ = **٨** أقلام زرقاء'],
      [26, 'وصندوق فيه **٢٠** قلمًا؟'],
      [31, '٢٠ − ٧ = **١٣**'],
      [36, 'نتحقق بالعملية العكسية: ١٣ + ٧ = **٢٠**'],
    ]}
  />
);
