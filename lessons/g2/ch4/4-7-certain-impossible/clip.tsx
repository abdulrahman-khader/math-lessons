import { CLIP_W, Clip, ClipCard, ClipTitle, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: صندوق كرات (مثال غير مثال الكتاب): ٦ كرات زرقاء ← الزرقاء أكيد، والحمراء مستحيل */

const BLUE = '#4f9be0', RED = '#e8635a';

function scene(t: number) {
  const balls = Array.from({ length: 6 }, (_, i) => ({ x: 520 + (i % 3) * 120, y: 240 + Math.floor(i / 3) * 110 }));
  // سحب كرة: تصعد كرة من الصندوق
  const up = (a: number) => tw(t, a, a + 1) * (1 - tw(t, a + 5, a + 6));
  const draws = [10, 17];
  return (
    <>
      <ClipTitle t={t} title="أَكِيدٌ وَمُسْتَحِيلٌ" q="في الصندوق ٦ كرات زرقاء" />
      <g opacity={fade(t, 4.5, 99)}>
        <rect x={440} y={170} width={400} height={260} rx={18} fill="#fff7e0" stroke="var(--ink)" strokeWidth={5} />
        {balls.map((b, i) => {
          const lift = i < draws.length ? up(draws[i]) : 0;
          return <circle key={i} cx={b.x} cy={b.y - lift * 200} r={44} fill={BLUE} stroke="var(--ink)" strokeWidth={3} />;
        })}
      </g>
      {[
        [10, 22, 'نسحب كرة: دائمًا **زرقاء**', 'var(--good)', 'سحب الزرقاء: أكيدٌ ✓'],
        [22, 32, '', 'var(--bad)', 'سحب الحمراء: مستحيلٌ ✗'],
      ].map(([a, b, , c, s]) => (
        <ClipCard key={a as number} x={900} y={200} w={460} h={110} op={fade(t, a as number, b as number)} color={c as string}>
          <text x={1130} y={268} fontSize={36} textAnchor="middle" direction="rtl" fill={c as string} style={{ fontWeight: 800 }}>{s as string}</text>
        </ClipCard>
      ))}
      <g opacity={fade(t, 22, 32)}>
        <circle cx={1130} cy={400} r={44} fill={RED} stroke="var(--ink)" strokeWidth={3} />
        <line x1={1080} y1={350} x2={1180} y2={450} stroke="var(--bad)" strokeWidth={8} />
      </g>
      <ClipCard x={CLIP_W / 2 - 520} y={440} w={1040} h={70} op={fade(t, 32, 99)} color="var(--rule)">
        <text x={CLIP_W / 2} y={488} fontSize={34} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>أكيد: سيحدث دائمًا · مستحيل: لن يحدث أبدًا</text>
      </ClipCard>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={40}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [5, 'في الصندوق **٦** كرات، كلها زرقاء'],
      [10, 'نسحب كرة… **زرقاء**'],
      [17, 'نسحب مرة أخرى… **زرقاء** أيضًا!'],
      [22, 'هل نسحب كرة حمراء؟ لا يوجد أحمر: **مستحيل**'],
      [32, 'الزرقاء **أكيد**، والحمراء **مستحيل**'],
    ]}
  />
);
