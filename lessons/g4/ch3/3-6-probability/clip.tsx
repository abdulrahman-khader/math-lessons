import { Clip, ClipCard, ClipTitle, chanceWord, lerp, num, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: كيس فيه ١٠ كرات (مثال غير مثال الكتاب) ← وصف الاحتمال بالكلمات والأعداد */

const BLUE = '#3fa9d6', RED = '#e8463c', YELLOW = '#f2cf3a', GREEN = '#2fa65a';
const TOTAL = 10;
const BALLS = [RED, BLUE, RED, RED, YELLOW, BLUE, RED, RED, BLUE, RED];
const BALL_XY = [
  [1115, 195], [1185, 195],
  [1080, 255], [1150, 255], [1220, 255],
  [1080, 315], [1150, 315], [1220, 315],
  [1115, 375], [1185, 375],
];

/** [البداية، العنوان، لون العنوان، أي الكرات تُبرز، العدد] */
const CASES: [number, string, string, (c: string) => boolean, number][] = [
  [15, 'صفراء', YELLOW, (c) => c === YELLOW, 1],
  [21, 'حمراء', RED, (c) => c === RED, 6],
  [27, 'خضراء', GREEN, () => false, 0],
  [33, 'حمراء أو زرقاء أو صفراء', BLUE, () => true, 10],
];

function scene(t: number) {
  const bag = tw(t, 4.5, 5.3);
  const lift = tw(t, 10, 11.2) * (1 - tw(t, 14, 15));
  const cur = [...CASES].reverse().find(([s]) => t >= s && t < 39);
  return (
    <>
      <ClipTitle t={t} title="الاحتمالُ" q="هل نعرف لون الكرة قبل أن نسحبها؟" />

      {bag > 0.01 && (
        <g opacity={bag}>
          <path d="M1060,150 Q1040,120 1075,112 L1265,112 Q1300,120 1280,150 Q1340,240 1310,370 Q1290,420 1150,420 Q1010,420 990,370 Q960,240 1060,150 Z" fill="#f4e6cf" stroke="#8a6a3b" strokeWidth={4} />
          <path d="M1060,150 Q1170,170 1280,150" fill="none" stroke="#8a6a3b" strokeWidth={4} />
          {BALLS.map((c, i) => {
            const [x, y] = BALL_XY[i];
            const out = i === 0 ? lift : 0;
            const on = !cur || cur[3](c);
            return (
              <g key={i} opacity={on ? 1 : 0.25}>
                <circle cx={x} cy={lerp(y, 60, out)} r={30} fill={out > 0.3 ? '#c9d4e3' : c} stroke="var(--ink)" strokeWidth={2.5} />
                {out > 0.3 && <text x={x} y={lerp(y, 60, out) + 14} fontSize={40} textAnchor="middle">؟</text>}
              </g>
            );
          })}
          <text x={1150} y={470} fontSize={28} textAnchor="middle" direction="rtl">
            {`${num(TOTAL)} كرات: ${num(6)} حمراء، ${num(3)} زرقاء، وصفراء واحدة`}
          </text>
        </g>
      )}

      {/* بطاقة لكل حالة */}
      {CASES.map(([s, title, color, , k], i) => {
        const x = i % 2 ? 80 : 490;
        const y = i < 2 ? 50 : 270;
        const op = tw(t, s, s + 0.6);
        const word = chanceWord(k, TOTAL);
        return (
          <ClipCard key={title} x={x} y={y} w={380} h={190} op={op} color={cur?.[0] === s ? 'var(--hl)' : 'var(--line)'}>
            <circle cx={x + 340} cy={y + 42} r={14} fill={color} stroke="var(--ink)" strokeWidth={2} />
            <text x={x + 315} y={y + 52} fontSize={title.length > 12 ? 24 : 30} textAnchor="start" direction="rtl">{title}</text>
            <text x={x + 190} y={y + 112} fontSize={42} textAnchor="middle" direction="rtl">{`${num(k)} من ${num(TOTAL)}`}</text>
            <text x={x + 190} y={y + 166} fontSize={36} textAnchor="middle" fill="var(--hl)">{word}</text>
          </ClipCard>
        );
      })}
      {t >= 27 && t < 33 && <text x={1150} y={90} fontSize={34} textAnchor="middle" fill={GREEN} opacity={tw(t, 27.5, 28)}>لا توجد كرة خضراء</text>}
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={45}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'في الكيس **١٠** كرات ملوّنة'],
      [10, 'نسحب كرة دون أن ننظر… لا نعرف لونها بالتأكيد'],
      [15, 'كرة صفراء: ١ من ١٠ ← **أقل احتمالًا**'],
      [21, 'كرة حمراء: ٦ من ١٠ ← **أكثر احتمالًا**'],
      [27, 'كرة خضراء: لا توجد في الكيس ← **مستحيل**'],
      [33, 'كرة حمراء أو زرقاء أو صفراء: ١٠ من ١٠ ← **مؤكَّد**'],
      [39, 'نصف **الاحتمال** بالكلمات وبالأعداد'],
    ]}
  />
);
