import { Clip, ClipCard, ClipTitle, fade, lerp, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ترتيب أربعة أبراج من ثلاث معلومات (مثال غير مثال الكتاب). كل معلومة تضع برجًا في مكانه دون تغيير ما قبله. */

type Id = 'red' | 'blue' | 'green' | 'yellow';
const COLOR: Record<Id, string> = { red: '#e8635a', blue: '#4f9be0', green: '#4fae3a', yellow: '#f6c21c' };
const NAME: Record<Id, string> = { red: 'الأحمر', blue: 'الأزرق', green: 'الأخضر', yellow: 'الأصفر' };
const H: Record<Id, number> = { red: 300, blue: 240, green: 180, yellow: 120 };

/** الترتيب بعد كل معلومة، من الأعلى (يمينًا) إلى الأقصر */
const STAGES: [number, Id[]][] = [
  [5, ['blue', 'green']],
  [13, ['red', 'blue', 'green']],
  [21, ['red', 'blue', 'green', 'yellow']],
];
const CLUES: [number, string][] = [
  [5, 'البرجُ الأزرقُ أعلى من الأخضرِ'],
  [13, 'البرجُ الأحمرُ أعلى من الأزرقِ'],
  [21, 'البرجُ الأصفرُ أقصرُ من الأخضرِ'],
];

const slotX = (i: number) => 1240 - i * 150;

function Tower({ id, t }: { id: Id; t: number }) {
  // أول مرحلة يظهر فيها البرج، ومكانه في كل مرحلة يتحرك إليه بنعومة
  const first = STAGES.find(([, o]) => o.includes(id))!;
  const op = tw(t, first[0], first[0] + 0.6);
  if (op <= 0.01) return null;
  let x = slotX(first[1].indexOf(id));
  for (const [s, o] of STAGES) if (s > first[0]) x = lerp(x, slotX(o.indexOf(id)), tw(t, s, s + 1));
  const h = H[id];
  return (
    <g opacity={op}>
      <rect x={x - 50} y={470 - h} width={100} height={h} rx={10} fill={COLOR[id]} stroke="var(--ink)" strokeWidth={3} />
      <text x={x} y={505} fontSize={28} textAnchor="middle" style={{ fontWeight: 800 }}>
        {NAME[id]}
      </text>
    </g>
  );
}

function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="الاستدلالُ المنطقيُّ" q="كيف نرتّب أشياء من معلومات «أعلى من» و«أقصر من»؟" />
      <g opacity={fade(t, 4.5, 99)}>
        <text x={1290} y={150} fontSize={26} textAnchor="middle" fill="var(--rule)" style={{ fontWeight: 800 }}>الأعلى</text>
        <text x={740} y={150} fontSize={26} textAnchor="middle" fill="var(--rule)" style={{ fontWeight: 800 }}>الأقصر</text>
        <line x1={640} x2={1330} y1={470} y2={470} stroke="var(--ink)" strokeWidth={4} />
      </g>
      {(['red', 'blue', 'green', 'yellow'] as Id[]).map((id) => (
        <Tower key={id} id={id} t={t} />
      ))}
      {CLUES.map(([s, text], i) => (
        <ClipCard key={i} x={30} y={60 + i * 100} w={560} h={80} op={fade(t, s, 99)} color={t < s + 6 ? 'var(--hl)' : 'var(--line)'}>
          <text x={570} y={60 + i * 100 + 52} fontSize={30} textAnchor="start" direction="rtl" style={{ fontWeight: 700 }}>
            {`${['١', '٢', '٣'][i]}) ${text}`}
          </text>
        </ClipCard>
      ))}
      <ClipCard x={30} y={380} w={560} h={100} op={fade(t, 29, 99)} color="var(--good)">
        <text x={310} y={442} fontSize={32} textAnchor="middle" direction="rtl" fill="var(--good)" style={{ fontWeight: 800 }}>
          {t < 35 ? 'الأحمر، الأزرق، الأخضر، الأصفر' : 'تحقّقنا: يتفق مع المعلومات ✓'}
        </text>
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
      [5, 'المعلومة الأولى: الأزرق **أعلى** من الأخضر، فالأزرق قبله'],
      [13, 'الأحمر **أعلى** من الأزرق: نضعه في الأول، ولا نحرّك الباقي'],
      [21, 'الأصفر **أقصر** من الأخضر: مكانه في آخر الصف'],
      [29, 'الترتيب من الأعلى: **الأحمر، الأزرق، الأخضر، الأصفر**'],
      [35, 'نتحقق: كل معلومة **صحيحة** في هذا الترتيب'],
    ]}
  />
);
