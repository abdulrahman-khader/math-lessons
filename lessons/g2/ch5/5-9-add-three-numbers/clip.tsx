import { Clip, ClipCard, ClipTitle, SvgVertical, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٢٣ + ١٧ + ٣١ = ٧١ (مثال غير أمثلة الكتاب) */

function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="جَمْعُ ثَلَاثَةِ أَعْدَادٍ" q="٢٣ + ١٧ + ٣١" />
      <g opacity={fade(t, 4.5, 99)}>
        <SvgVertical x={940} y={110} nums={[23, 17, 31]} size={62} sum={11} carry={tw(t, 18.5, 20)} ones={t > 13 ? 1 : undefined} tens={t > 25 ? 7 : undefined} />
        {[0, 1].map((i) => <circle key={i} cx={971} cy={90 + i * 78} r={38} fill="none" stroke="var(--bad)" strokeWidth={5} opacity={fade(t, 7, 18)} />)}
        <ClipCard x={160} y={110} w={560} h={100} op={fade(t, 7, 99)} color="var(--bad)">
          <text x={440} y={175} fontSize={38} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نبحث عن عشرة: ٣ + ٧ = ١٠</text>
        </ClipCard>
        <ClipCard x={160} y={230} w={560} h={100} op={fade(t, 13, 99)} color="var(--good)">
          <text x={440} y={295} fontSize={38} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>الآحاد: ١٠ + ١ = ١١</text>
        </ClipCard>
        <ClipCard x={160} y={350} w={560} h={100} op={fade(t, 25, 99)} color="var(--good)">
          <text x={440} y={415} fontSize={38} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>العشرات: ١ + ٢ + ١ + ٣ = ٧</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={38}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [7, 'نبحث عن عشرة: ٣ + ٧ = **١٠**'],
      [13, 'ونجمع الباقي: ١٠ + ١ = **١١**'],
      [18, 'لا يكون في المنزلة رقمان: يصعد **١** إلى العشرات'],
      [25, 'نجمع العشرات: **٧**'],
      [32, '٢٣ + ١٧ + ٣١ = **٧١**'],
    ]}
  />
);
