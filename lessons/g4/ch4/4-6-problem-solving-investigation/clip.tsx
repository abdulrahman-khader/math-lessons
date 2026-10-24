import { Clip, ClipCard, ClipTitle, Person, SvgEq, fade, tw } from '@engine';

/* مقطع فكرة الدرس: مسألة واحدة بخطتين (مثال غير مثال الكتاب): ٢٠ طالبًا، كل ٤ على طاولة، كم طاولة؟ ← ٥ طاولات */

const N = 20, PER = 4, TABLES = 5;
const COLORS = ['#e8635a', '#4f9be0', '#4fae3a', '#f6c21c', '#9b6bd1'];

function scene(t: number) {
  const plan1 = fade(t, 4.5, 21);
  const plan2 = fade(t, 21.5, 37);
  return (
    <>
      <ClipTitle t={t} title="استقصاءُ حلِّ المسألةِ" q="في الفصلِ ٢٠ طالبًا، يجلسُ كلُّ ٤ على طاولةٍ. كم طاولةً؟" size={64} />

      {/* الخطة ١: رسم صورة */}
      <g opacity={plan1}>
        <ClipCard x={950} y={30} w={420} h={80} color="var(--ex)">
          <text x={1160} y={82} fontSize={34} textAnchor="middle" direction="rtl" fill="var(--ex)" style={{ fontWeight: 800 }}>الخطة ١: رسمُ صورةٍ</text>
        </ClipCard>
        {Array.from({ length: N }, (_, i) => {
          const g = Math.floor(i / PER);
          const k = i % PER;
          const x = 1240 - g * 250 + (k % 2) * 70;
          const y = 220 + Math.floor(k / 2) * 110;
          const grouped = tw(t, 9 + g * 1.2, 9.6 + g * 1.2);
          return <Person key={i} x={x} y={y} s={0.75 * tw(t, 5 + i * 0.12, 5.4 + i * 0.12)} fill={grouped > 0.5 ? COLORS[g] : '#cfd6e0'} />;
        })}
        {Array.from({ length: TABLES }, (_, g) => (
          <rect key={g} x={1210 - g * 250} y={400} width={130} height={22} rx={8} fill="#b0703a" opacity={tw(t, 9 + g * 1.2, 9.6 + g * 1.2)} />
        ))}
        <g opacity={fade(t, 16, 21)}>
          <text x={700} y={490} fontSize={40} textAnchor="middle" direction="rtl" fill="var(--good)" style={{ fontWeight: 800 }}>٥ طاولاتٍ</text>
        </g>
      </g>

      {/* الخطة ٢: الطرح المتكرر */}
      <g opacity={plan2}>
        <ClipCard x={850} y={30} w={520} h={80} color="var(--qs)">
          <text x={1110} y={82} fontSize={34} textAnchor="middle" direction="rtl" fill="var(--qs)" style={{ fontWeight: 800 }}>الخطة ٢: الطرحُ المتكررُ</text>
        </ClipCard>
        {[20, 16, 12, 8, 4].map((a, i) => (
          <g key={a} opacity={tw(t, 23 + i * 1.6, 23.6 + i * 1.6)}>
            <SvgEq x={700} y={190 + i * 66} size={50} parts={[a, '−', 4, '=', a - 4]} />
            <text x={1000} y={190 + i * 66} fontSize={34} textAnchor="middle" fill={COLORS[i]} style={{ fontWeight: 800 }}>{['١', '٢', '٣', '٤', '٥'][i]}</text>
          </g>
        ))}
      </g>

      <ClipCard x={300} y={170} w={800} h={200} op={fade(t, 37.5, 99)} color="var(--good)">
        <text x={700} y={250} fontSize={44} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>خطتان مختلفتان ← الإجابةُ نفسُها</text>
        <SvgEq x={700} y={330} size={56} parts={[5, '×', 4, '=', 20]} color="var(--good)" />
      </ClipCard>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={46}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'الخطة الأولى: **نرسم** الطلاب'],
      [9, 'نجمع كل **٤** طلاب حول طاولة'],
      [16, 'عددنا الطاولات: **٥**'],
      [21.5, 'الخطة الثانية: **نطرح** ٤ في كل مرة حتى نصل إلى الصفر'],
      [31, 'طرحنا **٥** مرات، إذن ٥ طاولات'],
      [37.5, 'نختار الخطة المناسبة، ثم **نتحقق**: ٥ × ٤ = ٢٠'],
    ]}
  />
);
