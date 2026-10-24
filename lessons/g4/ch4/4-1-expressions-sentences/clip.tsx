import { CLIP_W, Clip, ClipCard, ClipTitle, SvgEq, fade, tw, type EqPart } from '@engine';

/* مقطع فكرة الدرس: ٩ أقلام حمراء و٦ زرقاء (مثال غير مثال الكتاب) ← عبارة، ثم جملة، ثم عملية مفقودة */

const RED = '#e8635a', BLUE = '#4f9be0';
const A = 9, B = 6;

/** قلم صغير: دائرة ملونة في صف، الأحمر يمينًا ثم الأزرق كما تُقرأ الجملة */
function Dots({ t }: { t: number }) {
  const op = fade(t, 4.5, 27);
  if (op <= 0.01) return null;
  const S = 54;
  const all = A + B;
  return (
    <g opacity={op}>
      {Array.from({ length: all }, (_, k) => {
        const red = k < A;
        // من اليمين: الحمراء أولًا، ثم فراغ، ثم الزرقاء
        const x = CLIP_W / 2 + ((all - 1) / 2 - k) * S - (red ? 0 : 30) + 15;
        return <circle key={k} cx={x} cy={140} r={22} fill={red ? RED : BLUE} stroke="var(--ink)" strokeWidth={3} opacity={tw(t, 4.6 + k * 0.12, 4.9 + k * 0.12)} />;
      })}
    </g>
  );
}

function Label({ t, a, b, y, color, text }: { t: number; a: number; b: number; y: number; color: string; text: string }) {
  return (
    <ClipCard x={CLIP_W / 2 - 330} y={y} w={660} h={78} op={fade(t, a, b)} color={color}>
      <text x={CLIP_W / 2} y={y + 52} fontSize={36} textAnchor="middle" direction="rtl" fill={color} style={{ fontWeight: 800 }}>
        {text}
      </text>
    </ClipCard>
  );
}

const sum: EqPart[] = [{ v: A, color: RED }, '+', { v: B, color: BLUE }, '=', 15];
/** المقارنة بمعناها: ٩ + ٦ أكبر من ١١ */
const cmp: EqPart[] = [{ v: A, color: RED }, '+', { v: B, color: BLUE }, '>', 11];

function scene(t: number) {
  // الجزء الأول: العبارة (٣ أجزاء) ثم الجملة (٥ أجزاء)
  const first = fade(t, 9, 27);
  const show = t < 15 ? 3 : 5;
  const second = fade(t, 21, 27);
  // الجزء الثاني: العملية المفقودة
  const miss = fade(t, 27.5, 46, 0.6);
  const tryPlus = fade(t, 30.5, 46);
  const tryMinus = fade(t, 35, 46);
  return (
    <>
      <ClipTitle t={t} title="العِباراتُ والجُملُ العددِيَّةُ" q="ما الفرقُ بينَ العبارةِ والجملةِ؟" />
      <Dots t={t} />

      <g opacity={first}>
        <SvgEq x={CLIP_W / 2} y={290} size={72} parts={sum} show={show} />
        <Label t={t} a={10} b={15} y={340} color="var(--rule)" text="عبارةٌ عدديةٌ: أعدادٌ وعملياتٌ" />
        <Label t={t} a={15.5} b={21} y={340} color="var(--qs)" text="جملةٌ عدديةٌ: فيها إشارةُ =" />
      </g>
      <g opacity={second}>
        <SvgEq x={CLIP_W / 2} y={430} size={62} parts={cmp} />
      </g>

      <g opacity={miss}>
        <SvgEq x={CLIP_W / 2} y={170} size={80} parts={[17, { v: '؟', box: true }, 3, '=', 14]} />
        <g opacity={tryPlus}>
          <SvgEq x={CLIP_W / 2 + 300} y={330} size={60} parts={[17, '+', 3, '=', 20]} />
          <text x={CLIP_W / 2 + 300} y={420} fontSize={44} textAnchor="middle" fill="var(--bad)" style={{ fontWeight: 800 }}>
            ٢٠ لا تساوي ١٤ ✗
          </text>
        </g>
        <g opacity={tryMinus}>
          <SvgEq x={CLIP_W / 2 - 300} y={330} size={60} parts={[17, '−', 3, '=', 14]} color="var(--good)" />
          <text x={CLIP_W / 2 - 300} y={420} fontSize={44} textAnchor="middle" fill="var(--good)" style={{ fontWeight: 800 }}>
            صحيحةٌ ✓
          </text>
        </g>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={46}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'في العلبة **٩** أقلام حمراء و**٦** أقلام زرقاء'],
      [9, 'نكتب **٩ + ٦**: أعداد وعملية تمثّل عدد الأقلام كلها'],
      [10, 'هذه **عبارة عددية**'],
      [15, 'نضيف إشارة = والناتج: **٩ + ٦ = ١٥**'],
      [15.5, 'صارت **جملة عددية**'],
      [21, 'والجملة قد تقارن أيضًا: ١٥ **أكبر من** ١١'],
      [27.5, 'ما العملية المفقودة؟ ١٧ ○ ٣ = ١٤'],
      [30.5, 'نجرّب الجمع: ١٧ + ٣ = ٢٠، **ليست** ١٤'],
      [35, 'نجرّب الطرح: ١٧ − ٣ = ١٤، **صحيحة**'],
      [40, 'العبارة: أعداد وعمليات · الجملة: فيها **= أو > أو <**'],
    ]}
  />
);
