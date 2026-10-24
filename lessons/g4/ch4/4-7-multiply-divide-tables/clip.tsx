import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: علب البيض (مثال غير أمثلة الكتاب): في كل علبة ٦ بيضات ← △ × ٦، ثم العكس ٣٠ بيضة ← ٣٠ ÷ ٦ = ٥ علب */

const ROWS: [number, number, number][] = [
  [1, 6, 5],
  [2, 12, 9],
  [3, 18, 13],
];

function Carton({ x, y, op }: { x: number; y: number; op: number }) {
  if (op <= 0.01) return null;
  return (
    <g opacity={op} transform={`translate(${x},${y})`}>
      <rect x={-75} y={-40} width={150} height={80} rx={10} fill="#d8b98a" stroke="var(--ink)" strokeWidth={3} />
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx={-48 + (i % 3) * 48} cy={-16 + Math.floor(i / 3) * 32} rx={16} ry={13} fill="#fffaf0" stroke="var(--ink)" strokeWidth={2} />
      ))}
    </g>
  );
}

function scene(t: number) {
  const part1 = fade(t, 4.5, 26);
  const part2 = fade(t, 26.5, 99);
  const shown = ROWS.filter(([, , s]) => t >= s).length;
  return (
    <>
      <ClipTitle t={t} title="جداولُ الضربِ والقسمةِ" q="في كلِّ علبةٍ ٦ بيضاتٍ" />

      <g opacity={part1}>
        {Array.from({ length: shown }, (_, k) => (
          <Carton key={k} x={150 + k * 180} y={180} op={tw(t, ROWS[k][2], ROWS[k][2] + 0.5)} />
        ))}
        <rect x={900} y={40} width={420} height={64} fill="#f6b26b" stroke="var(--ink)" strokeWidth={3} />
        <text x={1110} y={84} fontSize={32} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>
          {t < 17 ? 'القاعدةُ: ؟' : 'القاعدةُ: △ × ٦'}
        </text>
        {['العلب △', 'البيض □'].map((h, i) => (
          <g key={h}>
            <rect x={1110 - i * 210} y={104} width={210} height={56} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
            <text x={1215 - i * 210} y={142} fontSize={28} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>{h}</text>
          </g>
        ))}
        {ROWS.map(([a, b, s], i) => (
          <g key={i} opacity={tw(t, s, s + 0.5)}>
            <rect x={1110} y={160 + i * 62} width={210} height={62} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
            <rect x={900} y={160 + i * 62} width={210} height={62} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
            <SvgEq x={1215} y={206 + i * 62} size={38} parts={[a]} />
            <SvgEq x={1005} y={206 + i * 62} size={38} parts={[b]} />
          </g>
        ))}
        <ClipCard x={60} y={330} w={700} h={100} op={fade(t, 17, 26)} color="var(--qs)">
          <SvgEq x={410} y={400} size={50} parts={['□', '=', '△', '×', 6]} />
        </ClipCard>
      </g>

      <g opacity={part2}>
        <text x={700} y={110} fontSize={44} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>والآن معنا ٣٠ بيضةً. كم علبةً نملأ؟</text>
        {Array.from({ length: 5 }, (_, k) => (
          <Carton key={k} x={1180 - k * 210} y={240} op={tw(t, 30 + k * 0.7, 30.5 + k * 0.7)} />
        ))}
        <ClipCard x={300} y={340} w={800} h={110} op={fade(t, 34, 99)} color="var(--good)">
          <SvgEq x={700} y={415} size={56} parts={[30, '÷', 6, '=', 5]} color="var(--good)" />
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={44}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [5, 'علبة واحدة فيها **٦** بيضات'],
      [9, 'علبتان فيهما **١٢** بيضة'],
      [13, '٣ علب فيها **١٨** بيضة'],
      [17, 'نضرب عدد العلب في ٦: القاعدة **△ × ٦**'],
      [26.5, 'والعكس: معنا **٣٠** بيضة، كم علبة؟'],
      [30, 'نوزّع ٦ في كل علبة…'],
      [34, '٣٠ ÷ ٦ = **٥** علب: القسمة عكس الضرب'],
    ]}
  />
);
