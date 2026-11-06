import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ١٨ كرسيًّا في صفوف متساوية (مثال غير أمثلة الكتاب): القواسم، ثم مضاعفات العدد ١١ */

const WAYS: [number, number, number][] = [
  [1, 18, 5],
  [2, 9, 10],
  [3, 6, 15],
];

function Chairs({ r, c, x, y, op }: { r: number; c: number; x: number; y: number; op: number }) {
  if (op <= 0.01) return null;
  return (
    <g opacity={op}>
      {Array.from({ length: r * c }, (_, i) => (
        <rect key={i} x={x + (i % c) * 36} y={y + Math.floor(i / c) * 36} width={28} height={28} rx={6} fill="#f2b705" stroke="var(--ink)" strokeWidth={2} />
      ))}
    </g>
  );
}

function scene(t: number) {
  const part1 = fade(t, 4.5, 27);
  const part2 = fade(t, 27.5, 99);
  return (
    <>
      <ClipTitle t={t} title="القواسمُ والمضاعفاتُ" q="كيف نرتّبُ ١٨ كرسيًّا في صفوفٍ متساويةٍ؟" />

      <g opacity={part1}>
        {WAYS.map(([r, c, s], i) => (
          <g key={i}>
            <Chairs r={r} c={c} x={60} y={40 + [0, 60, 156][i]} op={tw(t, s, s + 0.6)} />
            <g opacity={tw(t, s, s + 0.6)}>
              <SvgEq x={1000} y={84 + i * 100} size={52} parts={[r, '×', c, '=', 18]} />
            </g>
          </g>
        ))}
        <ClipCard x={60} y={340} w={1280} h={120} op={fade(t, 20, 27)} color="var(--good)">
          <SvgEq x={700} y={418} size={46} parts={[1, '،', 2, '،', 3, '،', 6, '،', 9, '،', 18]} color="var(--good)" />
        </ClipCard>
      </g>

      <g opacity={part2}>
        <text x={700} y={100} fontSize={44} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>مضاعفاتُ العددِ ١١</text>
        {[1, 2, 3, 4, 5].map((k, i) => (
          <g key={k} opacity={tw(t, 30 + i * 2.4, 30.6 + i * 2.4)}>
            <rect x={1120 - i * 230} y={170} width={190} height={130} rx={18} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
            <SvgEq x={1215 - i * 230} y={225} size={32} parts={[11, '×', k]} />
            <SvgEq x={1215 - i * 230} y={280} size={46} parts={[{ v: 11 * k, color: 'var(--good)' }]} />
          </g>
        ))}
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={46}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [5, 'صف واحد فيه **١٨** كرسيًّا'],
      [10, 'أو صفان في كل صف **٩** كراسي'],
      [15, 'أو **٣** صفوف في كل صف **٦** كراسي'],
      [20, 'هذه الأعداد كلها **قواسم** العدد ١٨'],
      [27.5, 'أما **المضاعفات** فنجدها بالضرب'],
      [31, 'نضرب ١١ في ١ ثم ٢ ثم ٣…'],
      [38, 'كل ناتج هو **مضاعف** للعدد ١١'],
    ]}
  />
);
