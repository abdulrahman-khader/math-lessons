import { Clip, ClipCard, ClipTitle, SvgEq, fade, num, tw } from '@engine';
import voice from './voice';

/*
 * مقطع فكرة الدرس (مثال غير أمثلة الكتاب: الكتاب ٢٤ طاولة ومضاعفات ٧، والقصة ٢٨، والأداة ٤٠):
 * ١ القواسم: نرتب ١٦ نقطة في صفوف متساوية: ١ × ١٦، ٢ × ٨، ٤ × ٤، فالقواسم ١، ٢، ٤، ٨، ١٦.
 * ٢ المضاعفات: نقفز ٨ كل مرة على خط الأعداد: ٨، ١٦، ٢٤، ٣٢، ٤٠.
 * ٣ الصلة بينهما: ٢ × ٨ = ١٦، فالعدد ٨ قاسم للعدد ١٦، و١٦ مضاعف للعدد ٨.
 */

const BLUE = '#1F6FD1';
const GREEN = 'var(--good)';
const ORANGE = '#E07A1F';

/** صفوف من النقاط تبدأ من اليمين (x هو الطرف الأيمن) */
function Dots({ r, c, x, y, op, d = 40 }: { r: number; c: number; x: number; y: number; op: number; d?: number }) {
  if (op <= 0.01) return null;
  return (
    <g opacity={op}>
      {Array.from({ length: r * c }, (_, i) => (
        <circle key={i} cx={x - (i % c) * d} cy={y + Math.floor(i / c) * d} r={d * 0.38} fill={BLUE} />
      ))}
    </g>
  );
}

/** الترتيبات: [الصفوف، الأعمدة، زمن الظهور، أعلى الترتيب] */
const WAYS: [number, number, number, number][] = [
  [1, 16, 5, 50],
  [2, 8, 10, 120],
  [4, 4, 14, 215],
];

/** خط الأعداد من ٠ إلى ٤٠، من اليسار إلى اليمين كما في الكتاب */
const X = (v: number) => 130 + (v / 40) * 1140;
const LY = 320;

function NumberLine({ t }: { t: number }) {
  return (
    <g>
      <line x1={X(0) - 30} y1={LY} x2={X(40) + 30} y2={LY} stroke="var(--ink)" strokeWidth={4} />
      {Array.from({ length: 21 }, (_, i) => i * 2).map((v) => (
        <line key={v} x1={X(v)} y1={LY - (v % 8 ? 9 : 18)} x2={X(v)} y2={LY + (v % 8 ? 9 : 18)} stroke="var(--ink)" strokeWidth={v % 8 ? 2 : 4} />
      ))}
      <text x={X(0)} y={LY + 58} textAnchor="middle" fontSize={34} fontWeight={700} fill="var(--ink)">
        {num(0)}
      </text>
      {[1, 2, 3, 4, 5].map((k) => {
        const a = tw(t, 29 + (k - 1) * 1.5, 30 + (k - 1) * 1.5);
        const from = X((k - 1) * 8);
        const to = X(k * 8);
        const mid = (from + to) / 2;
        const hot = k === 2 && t >= 37;
        return (
          <g key={k} opacity={a}>
            <path d={`M${from} ${LY - 6} Q${mid} ${LY - 120} ${to} ${LY - 6}`} fill="none" stroke={GREEN} strokeWidth={5} />
            <text x={mid} y={LY - 76} textAnchor="middle" fontSize={30} fontWeight={800} fill={GREEN}>
              {num(8)}
            </text>
            <circle cx={to} cy={LY} r={hot ? 40 : 32} fill="#fff" stroke={hot ? ORANGE : GREEN} strokeWidth={hot ? 7 : 5} />
            <text x={to} y={LY + 12} textAnchor="middle" fontSize={34} fontWeight={800} fill={hot ? ORANGE : GREEN}>
              {num(k * 8)}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function scene(t: number) {
  const part1 = fade(t, 4.5, 24.5);
  const part2 = fade(t, 25, 41.5);
  const part3 = fade(t, 42, 99);
  return (
    <>
      <ClipTitle t={t} title="القواسمُ والمضاعفاتُ" q="ما الفرقُ بينَهما؟ وما الصِّلةُ؟" />

      {/* ١ القواسم: ١٦ نقطة في صفوف متساوية */}
      <g opacity={part1}>
        {WAYS.map(([r, c, s, y]) => (
          <g key={r}>
            <Dots r={r} c={c} x={1320} y={y} op={tw(t, s, s + 0.6)} />
            <g opacity={tw(t, s + 0.4, s + 1)}>
              <SvgEq x={330} y={y + (r - 1) * 20 + 20} size={60} parts={[r, '×', c, '=', 16]} />
            </g>
          </g>
        ))}
        <ClipCard x={60} y={370} w={1280} h={110} op={fade(t, 18, 24.5)} color={GREEN}>
          <text x={1180} y={438} textAnchor="middle" direction="rtl" fontSize={40} fontWeight={800} fill={GREEN}>
            الْقَوَاسِمُ:
          </text>
          <SvgEq x={620} y={440} size={50} parts={[1, '،', 2, '،', 4, '،', 8, '،', 16]} color={GREEN} />
        </ClipCard>
      </g>

      {/* ٢ المضاعفات: نقفز ٨ كل مرة */}
      <g opacity={part2}>
        <text x={700} y={90} textAnchor="middle" direction="rtl" fontSize={50} fontWeight={800} fill={GREEN}>
          مُضَاعَفَاتُ الْعَدَدِ ٨
        </text>
        <NumberLine t={t} />
      </g>

      {/* ٣ الصلة: ٢ × ٨ = ١٦ */}
      <g opacity={part3}>
        <SvgEq x={700} y={140} size={90} parts={[2, '×', { v: 8, color: BLUE }, '=', { v: 16, color: ORANGE }]} />
        <g opacity={tw(t, 43.5, 44.3)}>
          <ClipCard x={760} y={220} w={560} h={110} op={1} color={BLUE}>
            <text x={1040} y={290} textAnchor="middle" direction="rtl" fontSize={42} fontWeight={800} fill={BLUE}>
              ٨ قَاسِمٌ لِلْعَدَدِ ١٦
            </text>
          </ClipCard>
        </g>
        <g opacity={tw(t, 46, 46.8)}>
          <ClipCard x={80} y={220} w={560} h={110} op={1} color={ORANGE}>
            <text x={360} y={290} textAnchor="middle" direction="rtl" fontSize={42} fontWeight={800} fill={ORANGE}>
              ١٦ مُضَاعَفٌ لِلْعَدَدِ ٨
            </text>
          </ClipCard>
        </g>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={52}
    scene={scene}
    captions={[
      [0, 'فِكْرَةُ الدَّرْسِ: الْقَوَاسِمُ وَالْمُضَاعَفَاتُ'],
      [5, 'نُرَتِّبُ **١٦** نُقْطَةً فِي صُفُوفٍ مُتَسَاوِيَةٍ: صَفٌّ وَاحِدٌ'],
      [10, 'أَوْ صَفَّانِ، فِي كُلِّ صَفٍّ **٨**'],
      [14, 'أَوْ **٤** صُفُوفٍ، فِي كُلِّ صَفٍّ **٤**'],
      [18, 'الْأَعْدَادُ الَّتِي نَضْرِبُهَا هِيَ **الْقَوَاسِمُ**'],
      [25, 'أَمَّا **الْمُضَاعَفَاتُ** فَهِيَ نَوَاتِجُ الضَّرْبِ'],
      [29, 'نَقْفِزُ **٨** كُلَّ مَرَّةٍ: ٨، ١٦، ٢٤، ٣٢، ٤٠'],
      [37, 'نَجِدُ **١٦** بَيْنَ مُضَاعَفَاتِ ٨'],
      [42, 'لِأَنَّ ٢ × ٨ = ١٦: **٨ قَاسِمٌ** لِلْعَدَدِ ١٦، وَ**١٦ مُضَاعَفٌ** لِلْعَدَدِ ٨'],
    ]}
  />
);
