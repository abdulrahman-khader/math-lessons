import { CLIP_W, Clip, ClipCard, ClipTitle, Cube, SvgEq, fade, tw } from '@engine';

/* مقطع فكرة الدرس: جملة واحدة بثلاث طرق (رسم، كلمات، أرقام) بمثالين غير أمثلة الكتاب: ٤٠ − ١٣ = ٢٧ ثم ٥ + ٦ = ١١ */

const YELLOW = '#f6c21c', RED = '#e8635a', BLUE = '#4f9be0';
const N = 40, TAKE = 13;

/** بطاقة نصية في نصف المشهد الأيسر */
function Say({ t, a, b, y, cap, text, color = 'var(--rule)' }: { t: number; a: number; b: number; y: number; cap: string; text: string; color?: string }) {
  return (
    <ClipCard x={30} y={y} w={800} h={116} op={fade(t, a, b)} color={color}>
      <text x={805} y={y + 40} fontSize={26} textAnchor="start" direction="rtl" fill={color} style={{ fontWeight: 800 }}>
        {cap}
      </text>
      <text x={430} y={y + 92} fontSize={32} textAnchor="middle" direction="rtl" style={{ fontWeight: 700 }}>
        {text}
      </text>
    </ClipCard>
  );
}

function scene(t: number) {
  const s = 38;
  // الجزء الأول: ٤٠ مكعبًا في ٤ أبراج، يُشطب منها ١٣ واحدًا بعد الآخر من آخرها
  const part1 = fade(t, 4.5, 27.5);
  const part2 = fade(t, 28, 47);
  return (
    <>
      <ClipTitle t={t} title="تَمثيلُ الجُملِ العَددِيَّةِ" q="كم طريقةً نعرض بها الجملة العددية؟" />

      <g opacity={part1}>
        {Array.from({ length: N }, (_, i) => {
          const tower = Math.floor(i / 10);
          const j = i % 10;
          const x = 1220 - tower * (s + 26);
          const y = 440 - j * s;
          const k = N - 1 - i; // ترتيب الشطب: من آخر مكعب
          const crossed = k < TAKE ? tw(t, 9.5 + k * 0.3, 9.8 + k * 0.3) : 0;
          return <Cube key={i} x={x} y={y} s={s - 2} color={YELLOW} op={tw(t, 4.6 + i * 0.05, 4.9 + i * 0.05)} crossed={crossed} />;
        })}
        <Say t={t} a={14.5} b={27.5} y={50} cap="الرسم" text="٤٠ مكعبًا، نشطب منها ١٣" color="var(--ex)" />
        <Say t={t} a={17} b={27.5} y={190} cap="الكلمات" text="أربعون ناقصُ ثلاثةَ عشرَ يساوي سبعةً وعشرين" color="var(--qs)" />
        <g opacity={fade(t, 21.5, 27.5)}>
          <SvgEq x={430} y={420} size={72} parts={[40, '−', 13, '=', 27]} />
        </g>
      </g>

      <g opacity={part2}>
        <SvgEq x={CLIP_W / 2} y={120} size={80} parts={[{ v: 5, color: RED }, '+', { v: 6, color: BLUE }, '=', 11]} />
        {Array.from({ length: 11 }, (_, i) => {
          const red = i < 5;
          // الأحمر يمينًا كما تُقرأ الجملة، ثم فراغ، ثم الأزرق
          const x = CLIP_W / 2 + 330 - i * 58 - (red ? 0 : 40);
          return <Cube key={i} x={x} y={250} s={50} color={red ? RED : BLUE} op={tw(t, 31 + i * 0.12, 31.3 + i * 0.12)} />;
        })}
        <g opacity={fade(t, 35, 47)}>
          <text x={CLIP_W / 2} y={380} fontSize={44} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }} fill="var(--qs)">
            خمسةٌ زائدُ ستةٍ يساوي أحدَ عشرَ
          </text>
        </g>
        <g opacity={fade(t, 40, 47)}>
          <text x={CLIP_W / 2} y={470} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }} fill="var(--rule)">
            رسمٌ ← كلماتٌ ← أرقامٌ: الجملةُ نفسُها
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
      [4.5, 'في مكتبة الفصل **٤٠** قصة: أربعة أبراج في كل منها ١٠'],
      [9.5, 'استُعيرت **١٣** قصة: نشطب ١٣ مكعبًا'],
      [14.5, 'هذا **الرسم**'],
      [17, 'ونقولها **بالكلمات**'],
      [21.5, 'ونكتبها **بالأرقام**: ٤٠ − ١٣ = ٢٧'],
      [28, 'والآن نبدأ من الجملة: **٥ + ٦ = ١١**'],
      [31, 'نرسمها: ٥ مكعبات حمراء و٦ زرقاء'],
      [35, 'ونقرؤها: خمسةٌ زائدُ ستةٍ يساوي **أحدَ عشرَ**'],
      [40, 'الجملة العددية تُمثَّل **بالرسم** أو **بالكلمات** أو **بالأرقام**'],
    ]}
  />
);
