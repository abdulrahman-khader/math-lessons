import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: عجلات السيارات (مثال غير أمثلة الكتاب): ١ ← ٤، ٢ ← ٨، ٣ ← ١٢ ⇐ القاعدة △ × ٤ ⇐ ٥ سيارات = ٢٠ عجلة */

const ROWS: [number, number, number][] = [
  [1, 4, 5],
  [2, 8, 9],
  [3, 12, 13],
  [5, 20, 27],
];

function Car({ x, y, op }: { x: number; y: number; op: number }) {
  if (op <= 0.01) return null;
  return (
    <g opacity={op} transform={`translate(${x},${y})`}>
      <rect x={-60} y={-30} width={120} height={36} rx={10} fill="#4f9be0" stroke="var(--ink)" strokeWidth={3} />
      <rect x={-34} y={-54} width={68} height={28} rx={8} fill="#a9d1f5" stroke="var(--ink)" strokeWidth={3} />
      {[-36, 36].map((dx) => (
        <circle key={dx} cx={dx} cy={10} r={14} fill="#13213b" />
      ))}
    </g>
  );
}

function scene(t: number) {
  const tbl = fade(t, 4.5, 99);
  return (
    <>
      <ClipTitle t={t} title="اكتشافُ قاعدةٍ من جدولٍ" q="كم عجلةً لخمسِ سياراتٍ؟" />
      {/* الجدول يمينًا */}
      <g opacity={tbl}>
        <rect x={860} y={40} width={460} height={70} fill="#a8d5ba" stroke="var(--ink)" strokeWidth={3} />
        <text x={1090} y={88} fontSize={34} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>
          {t < 20 ? 'القاعدةُ: ؟' : 'القاعدةُ: △ × ٤'}
        </text>
        <rect x={860} y={110} width={230} height={60} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
        <rect x={1090} y={110} width={230} height={60} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
        <text x={1205} y={150} fontSize={28} textAnchor="middle" style={{ fontWeight: 800 }}>السيارات</text>
        <text x={975} y={150} fontSize={28} textAnchor="middle" style={{ fontWeight: 800 }}>العجلات</text>
        {ROWS.map(([a, b, s], i) => {
          const y = 170 + i * 72;
          return (
            <g key={i} opacity={tw(t, s, s + 0.5)}>
              <rect x={860} y={y} width={230} height={72} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
              <rect x={1090} y={y} width={230} height={72} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
              <SvgEq x={1205} y={y + 52} size={42} parts={[a]} />
              <g opacity={i < 3 ? 1 : tw(t, 31, 31.6)}>
                <SvgEq x={975} y={y + 52} size={42} parts={[b]} color={i < 3 ? 'var(--ink)' : 'var(--good)'} />
              </g>
            </g>
          );
        })}
      </g>
      {/* السيارات يسارًا */}
      {[0, 1, 2, 3, 4].map((k) => {
        const s = k < 3 ? ROWS[k][2] : 27 + (k - 3) * 0.6;
        return <Car key={k} x={120 + (k % 3) * 200} y={150 + Math.floor(k / 3) * 150} op={fade(t, s, 99)} />;
      })}
      <ClipCard x={60} y={400} w={700} h={96} op={fade(t, 20, 99)} color="var(--qs)">
        <g transform="translate(410,465)">
          {t < 31 ? (
            <SvgEq x={0} y={0} size={46} parts={['△', '×', 4]} />
          ) : (
            <SvgEq x={0} y={0} size={46} parts={[5, '×', 4, '=', 20]} color="var(--good)" />
          )}
        </g>
      </ClipCard>
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
      [5, 'سيارة واحدة لها **٤** عجلات'],
      [9, 'سيارتان لهما **٨** عجلات'],
      [13, '٣ سيارات لها **١٢** عجلة'],
      [17, 'ماذا نفعل بعدد السيارات لنحصل على عدد العجلات؟'],
      [20, 'نضرب في ٤: القاعدة **△ × ٤**'],
      [27, 'نطبّق القاعدة على ٥ سيارات'],
      [31, '٥ × ٤ = **٢٠** عجلة'],
      [36, 'نكتشف القاعدة من الجدول، ثم **نطبّقها**'],
    ]}
  />
);
