import { CLIP_W, Clip, ClipCard, ClipTitle, fade, tw } from '@engine';

/* مقطع فكرة الدرس: العصائر المفضلة (مثال غير مثال الكتاب)، كل صورة = طالبان: برتقال ٤ صور، تفاح ٢، مانجو ٣ */

const ROWS: [string, string, number][] = [
  ['البرتقال', '🍊', 4],
  ['التفاح', '🍎', 2],
  ['المانجو', '🥭', 3],
];

function scene(t: number) {
  const hl = t >= 10 && t < 17 ? 0 : t >= 17 && t < 24 ? 1 : t >= 24 && t < 32 ? -2 : -1;
  return (
    <>
      <ClipTitle t={t} title="قِرَاءَةُ التَّمْثِيلِ بِالصُّوَرِ" q="العصائرُ المفضَّلةُ" />
      <g opacity={fade(t, 4.5, 99)}>
        {ROWS.map(([l, ic, n], i) => {
          const y = 110 + i * 100;
          const on = hl === i || (hl === -2 && i !== 1);
          return (
            <g key={l}>
              <rect x={1000} y={y - 42} width={240} height={84} fill={on ? '#ffd8a8' : '#fff3b0'} stroke={on ? 'var(--hl)' : 'var(--ink)'} strokeWidth={on ? 6 : 3} />
              <text x={1120} y={y + 14} fontSize={38} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>{ic} {l}</text>
              {Array.from({ length: 5 }, (_, j) => (
                <g key={j}>
                  <rect x={916 - j * 84} y={y - 42} width={84} height={84} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
                  {j < n && <text x={958 - j * 84} y={y + 18} fontSize={50} textAnchor="middle">{ic}</text>}
                </g>
              ))}
            </g>
          );
        })}
        <ClipCard x={40} y={60} w={460} h={64} color="var(--qs)" op={tw(t, 6, 7)}>
          <text x={270} y={103} fontSize={30} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>المفتاح: كل صورة = طالبان</text>
        </ClipCard>
      </g>
      {[
        [10, 17, 'البرتقال: ٤ صور ← ٢ + ٢ + ٢ + ٢ = ٨ طلاب'],
        [17, 24, 'التفاح: صورتان ← ٤ طلاب، وهو الأقل'],
        [24, 32, 'البرتقال والمانجو معًا: ٨ + ٦ = ١٤ طالبًا'],
        [32, 99, 'أقرأ المفتاح أولًا، ثم أعدّ الصور'],
      ].map(([a, b, s]) => (
        <ClipCard key={a as number} x={CLIP_W / 2 - 520} y={380} w={1040} h={100} op={fade(t, a as number, b as number)} color="var(--good)">
          <text x={CLIP_W / 2} y={445} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>{s as string}</text>
        </ClipCard>
      ))}
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={40}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [5, 'هذا تمثيل بالصور للعصائر المفضلة'],
      [6, 'أقرأ **المفتاح** أولًا: كل صورة = طالبان'],
      [10, 'كم طالبًا يفضّل البرتقال؟ **٨**'],
      [17, 'ما العصير الأقل؟ **التفاح**'],
      [24, 'كم طالبًا يفضّل البرتقال والمانجو؟ **١٤**'],
      [32, 'المفتاح + عدّ الصور = **الإجابة**'],
    ]}
  />
);
