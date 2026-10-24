import { CLIP_W, Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';

/* مقطع فكرة الدرس: الفاكهة المفضلة (مثال غير مثال الكتاب): إشارة لكل إجابة، والخامسة خط مائل، ثم نعدّ */

/** ترتيب الإجابات كما وصلت: ٠ تفاح، ١ موز، ٢ برتقال */
const ANSWERS = [0, 1, 0, 2, 0, 1, 0, 0, 2, 1, 0];
const FRUITS = ['🍎 تفاح', '🍌 موز', '🍊 برتقال'];
const T0 = 5, DT = 1.6;

function Marks({ n, x, y }: { n: number; x: number; y: number }) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const g = Math.floor(i / 5), k = i % 5;
    const gx = x - g * 110;
    if (k < 4) out.push(<line key={i} x1={gx - k * 20} x2={gx - k * 20} y1={y - 30} y2={y + 30} stroke="var(--ink)" strokeWidth={6} strokeLinecap="round" />);
    else out.push(<line key={i} x1={gx + 16} x2={gx - 78} y1={y - 16} y2={y + 16} stroke="var(--bad)" strokeWidth={6} strokeLinecap="round" />);
  }
  return <g>{out}</g>;
}

function scene(t: number) {
  const done = Math.max(0, Math.min(ANSWERS.length, Math.floor((t - T0) / DT) + 1));
  const counts = [0, 1, 2].map((f) => ANSWERS.slice(0, t < T0 ? 0 : done).filter((a) => a === f).length);
  const showNum = tw(t, 25, 26);
  return (
    <>
      <ClipTitle t={t} title="جَدْوَلُ الإِشَارَاتِ" q="ما فاكهتُكَ المُفضَّلةُ؟" />
      <g opacity={fade(t, 4.5, 99)}>
        {FRUITS.map((f, i) => {
          const y = 120 + i * 120;
          return (
            <g key={f}>
              <rect x={900} y={y - 50} width={400} height={100} fill="#d9efe0" stroke="var(--ink)" strokeWidth={3} />
              <rect x={360} y={y - 50} width={540} height={100} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
              <rect x={220} y={y - 50} width={140} height={100} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
              <text x={1100} y={y + 14} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>{f}</text>
              <Marks n={counts[i]} x={860} y={y} />
              <g opacity={showNum}><SvgEq x={290} y={y + 22} size={56} parts={[counts[i]]} /></g>
            </g>
          );
        })}
      </g>
      <ClipCard x={CLIP_W / 2 - 360} y={430} w={720} h={80} op={fade(t, 30, 99)} color="var(--good)">
        <text x={CLIP_W / 2} y={482} fontSize={36} textAnchor="middle" direction="rtl" fill="var(--good)" style={{ fontWeight: 800 }}>
          التفاح الأكثر تفضيلًا: ٦ طلاب
        </text>
      </ClipCard>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={40}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [5, 'كل طالب يجيب، فنرسم **إشارة** في صف فاكهته'],
      [13, 'الإشارة **الخامسة** نرسمها خطًا مائلًا فوق الأربع'],
      [21, 'سجّلنا كل الإجابات'],
      [25, 'نعدّ الإشارات: تفاح **٦**، موز **٣**، برتقال **٢**'],
      [30, 'أكثر الإشارات في صف **التفاح**'],
      [35, 'جدول الإشارات يساعدنا على **العدّ** بسرعة'],
    ]}
  />
);
