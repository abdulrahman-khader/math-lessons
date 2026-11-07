import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/*
 * مقطع فكرة الدرس: ٥٥٢ ÷ ٢٣ = ٢٤ (مثال غير أمثلة الكتاب)، على كرسي القسمة كما في الدرس:
 * المقسوم عليه عن يسار الخط وتحته خط، والناتج فوق خط المقسوم من أكبر منزلة،
 * وأسهم الشرح: سهم الضرب «×» من رقم الناتج إلى المقسوم عليه، وسهم مكان ناتج الضرب، وسهم الإنزال، وسهم القسمة «÷».
 */

const ORANGE = '#e8701a';
const BLUE = '#1f62b0';
const FS = 62;
/** مراكز أعمدة أرقام المقسوم ٥ ٥ ٢ من اليسار */
const C = [420, 490, 560];
const CW = 70;
const SIGN = 622;
/** المقسوم عليه */
const DX = 300;
/** خطوط الكتابة: الناتج، المقسوم، ثم صفّا كل خطوة */
const Y = { q: 118, top: 136, div: 196, r3: 268, r4: 338, r5: 410, r6: 480 };

const digit = (x: number, y: number, s: string, op: number, color = 'var(--ink)') =>
  op > 0.01 ? (
    <text x={x} y={y} fontSize={FS} textAnchor="middle" fill={color} opacity={op} style={{ fontWeight: 700 }}>
      {s}
    </text>
  ) : null;

/** سهم يُرسم تدريجيًّا من بدايته (k من ٠ إلى ١) */
function Arrow({ d, k, color, op = 1 }: { d: string; k: number; color: string; op?: number }) {
  if (k <= 0.01 || op <= 0.01) return null;
  return (
    <path d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" opacity={op} markerEnd={k > 0.95 ? `url(#ah-${color === BLUE ? 'b' : 'o'})` : undefined} />
  );
}

/** دائرة عليها علامة العملية */
const Badge = ({ x, y, s, color, op }: { x: number; y: number; s: string; color: string; op: number }) =>
  op > 0.01 ? (
    <g opacity={op}>
      <circle cx={x} cy={y} r={26} fill={color} />
      <text x={x} y={y + 13} fontSize={40} textAnchor="middle" fill="#fff" style={{ fontWeight: 800 }}>{s}</text>
    </g>
  ) : null;

/** ملاحظة الخطوة الحالية عن يمين القسمة */
const Note = ({ t, a, b, text, color = BLUE }: { t: number; a: number; b: number; text: string; color?: string }) => (
  <ClipCard x={780} y={190} w={540} h={110} op={fade(t, a, b)} color={color}>
    <text x={1050} y={262} fontSize={46} textAnchor="middle" direction="rtl" fill={color} style={{ fontWeight: 800 }}>{text}</text>
  </ClipCard>
);

/** سهم الضرب: قوس من رقم الناتج إلى المقسوم عليه وفوقه «×» */
const mulArc = (cx: number) => `M${cx} ${Y.q - 50} C${cx} ${Y.q - 105} ${DX} ${Y.q - 105} ${DX} ${Y.top + 8}`;
/** سهم من المقسوم عليه إلى بداية سطر (مكان الكتابة أو العدد الذي نقسمه) */
const toRow = (x: number, y: number) => `M${DX} ${Y.div + 22} Q${DX} ${y - 20} ${x - 14} ${y - 20}`;

function scene(t: number) {
  const chair = fade(t, 4.5, 99);
  // ما يظهر من الكتابة
  const q1 = fade(t, 8.5, 99);
  const p1 = fade(t, 15.5, 99);
  const d1 = fade(t, 17.5, 99);
  const down = tw(t, 20, 21.5);
  const q2 = fade(t, 24, 99);
  const p2 = fade(t, 26.2, 99);
  const d2 = fade(t, 27.4, 99);
  const done = fade(t, 28.5, 99);
  const live = 1 - done; // الأسهم والإبراز تختفي عند الخاتمة
  return (
    <>
      <defs>
        {[['o', ORANGE], ['b', BLUE]].map(([k, c]) => (
          <marker key={k} id={`ah-${k}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill={c} />
          </marker>
        ))}
      </defs>
      <ClipTitle t={t} title="القِسْمَةُ عَلَى عَدَدٍ مِنْ رَقْمَيْنِ" q="" size={68} />
      <g opacity={1 - tw(t, 3.7, 4.2)}>
        <SvgEq x={700} y={320} parts={[552, '÷', 23]} size={52} />
      </g>

      <g opacity={chair}>
        {/* إبراز العدد الذي نقسمه الآن */}
        <rect x={C[0] - CW / 2} y={Y.div - 58} width={CW * 2} height={76} rx={10} fill="#dbe8fb" opacity={fade(t, 6, 13) * live} />
        <rect x={C[1] - CW / 2} y={Y.r4 - 58} width={CW * 2} height={76} rx={10} fill="#dbe8fb" opacity={fade(t, 22.5, 25.5) * live} />

        {/* كرسي القسمة */}
        <text x={DX} y={Y.div} fontSize={FS} textAnchor="middle" fill="#b3341a" style={{ fontWeight: 700 }}>٢٣</text>
        <path d={`M${DX - 58} ${Y.div + 18} H${C[0] - CW / 2 - 8} V${Y.top} H${SIGN + 30}`} fill="none" stroke="var(--ink)" strokeWidth={5} />
        {digit(C[0], Y.div, '٥', 1)}
        {digit(C[1], Y.div, '٥', 1)}
        {digit(C[2], Y.div, '٢', 1)}

        {/* الناتج من أكبر منزلة */}
        {digit(C[0], Y.q, '٢', q1, 'var(--good)')}
        {digit(C[1], Y.q, '٤', q2, 'var(--good)')}

        {/* الخطوة الأولى: ٤٦ ثم ٩ */}
        <g opacity={p1}>
          {digit(C[0], Y.r3, '٤', 1)}
          {digit(C[1], Y.r3, '٦', 1)}
          {digit(SIGN, Y.r3, '−', 1)}
          <line x1={C[0] - CW / 2} x2={C[1] + CW / 2} y1={Y.r3 + 16} y2={Y.r3 + 16} stroke="var(--ink)" strokeWidth={4} />
        </g>
        {digit(C[1], Y.r4, '٩', d1)}

        {/* الإنزال: سهم أزرق ثم ٢ */}
        <Arrow d={`M${C[2]} ${Y.div + 24} V${Y.r4 - 62}`} k={down} color={BLUE} />
        {digit(C[2], Y.r4, '٢', fade(t, 21.3, 99), BLUE)}

        {/* الخطوة الثانية: ٩٢ ثم ٠ */}
        <g opacity={p2}>
          {digit(C[1], Y.r5, '٩', 1)}
          {digit(C[2], Y.r5, '٢', 1)}
          {digit(SIGN, Y.r5, '−', 1)}
          <line x1={C[1] - CW / 2} x2={C[2] + CW / 2} y1={Y.r5 + 16} y2={Y.r5 + 16} stroke="var(--ink)" strokeWidth={4} />
        </g>
        {digit(C[2], Y.r6, '٠', d2)}

        {/* أسهم الشرح */}
        <Arrow d={mulArc(C[0])} k={tw(t, 13, 14.2)} color={ORANGE} op={fade(t, 13, 17.5)} />
        <Badge x={(C[0] + DX) / 2} y={Y.q - 92} s="×" color={ORANGE} op={fade(t, 13.6, 17.5)} />
        <Arrow d={toRow(C[0] - CW / 2, Y.r3)} k={tw(t, 14.6, 15.6)} color={ORANGE} op={fade(t, 14.6, 17.5)} />

        <Arrow d={toRow(C[1] - CW / 2, Y.r4)} k={tw(t, 22.5, 23.5)} color={BLUE} op={fade(t, 22.5, 25.5)} />
        <Badge x={DX + 34} y={Y.r4 - 52} s="÷" color={BLUE} op={fade(t, 23, 25.5)} />

        <Arrow d={mulArc(C[1])} k={tw(t, 25, 26)} color={ORANGE} op={fade(t, 25, 28.5)} />
        <Badge x={(C[1] + DX) / 2} y={Y.q - 92} s="×" color={ORANGE} op={fade(t, 25.4, 28.5)} />
        <Arrow d={toRow(C[1] - CW / 2, Y.r5)} k={tw(t, 25.6, 26.3)} color={ORANGE} op={fade(t, 25.6, 28.5)} />
      </g>

      {/* ملاحظة كل خطوة */}
      <Note t={t} a={6} b={13} text="كم ٢٣ في ٥٥؟ ٢" />
      <Note t={t} a={13} b={17.3} text="نضرب ٢ × ٢٣ = ٤٦" color={ORANGE} />
      <Note t={t} a={17.3} b={20} text="نطرح ٥٥ − ٤٦ = ٩" />
      <Note t={t} a={20} b={22.5} text="ننزل ٢ فيصبح ٩٢" />
      <Note t={t} a={22.5} b={25} text="كم ٢٣ في ٩٢؟ ٤" />
      <Note t={t} a={25} b={28.5} text="نضرب ٤ × ٢٣ = ٩٢" color={ORANGE} />
      <ClipCard x={780} y={150} w={540} h={190} op={done} color="var(--good)">
        <text x={1050} y={225} fontSize={50} textAnchor="middle" direction="rtl" fill="var(--good)" style={{ fontWeight: 800 }}>الناتج ٢٤</text>
        <text x={1050} y={300} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 700 }}>نتحقق: ٢٤ × ٢٣ = ٥٥٢</text>
      </ClipCard>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={37}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [6, 'كم ٢٣ في ٥٥؟ **٢**'],
      [13, 'نضرب ونطرح: يبقى **٩**'],
      [20, 'ننزل ٢: كم ٢٣ في ٩٢؟ **٤**'],
      [28, 'الناتج **٢٤**، ونتحقق بالضرب'],
    ]}
  />
);
