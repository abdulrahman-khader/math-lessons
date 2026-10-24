import { CLIP_W, Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: كيف نذهب إلى الحديقة؟ (مثال غير مثال الكتاب): مشيًا ٣، بالسيارة ٥، بالدراجة ٢ */

const BARS: [string, number, string, number][] = [
  ['🚶 مشيًا', 3, '#f6a54a', 6],
  ['🚗 بالسيارة', 5, '#4f9be0', 12],
  ['🚲 بالدراجة', 2, '#5fbf87', 19],
];
const S = 78;

function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="التَّمْثِيلُ بِالأَعْمِدَةِ" q="كيف نذهب إلى الحديقة؟" />
      <g opacity={fade(t, 4.5, 99)}>
        {BARS.map(([label, n, color, a], i) => {
          const y = 70 + i * (S + 20);
          return (
            <g key={label}>
              <rect x={980} y={y} width={260} height={S} fill="#fff3b0" stroke="var(--ink)" strokeWidth={3} />
              <text x={1110} y={y + S / 2 + 12} fontSize={34} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>{label}</text>
              {Array.from({ length: 6 }, (_, j) => (
                <rect key={j} x={980 - (j + 1) * S} y={y} width={S} height={S} stroke="var(--ink)" strokeWidth={3}
                  fill={j < n ? color : 'var(--paper)'} fillOpacity={j < n ? tw(t, a + j * 0.8, a + j * 0.8 + 0.4) : 1} />
              ))}
            </g>
          );
        })}
        {Array.from({ length: 7 }, (_, k) => (
          <SvgEq key={k} x={980 - k * S} y={380} size={32} parts={[k]} />
        ))}
      </g>
      <ClipCard x={CLIP_W / 2 - 400} y={410} w={800} h={90} op={fade(t, 26, 99)} color="var(--good)">
        <text x={CLIP_W / 2} y={468} fontSize={38} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>
          {t < 32 ? 'أطول عمود: بالسيارة (٥)' : 'أقصر عمود: بالدراجة (٢)'}
        </text>
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
      [5, 'نلوّن **مربعًا واحدًا** لكل طالب'],
      [6, 'مشيًا: **٣** طلاب، ٣ مربعات'],
      [12, 'بالسيارة: **٥** مربعات'],
      [19, 'بالدراجة: **مربعان**'],
      [26, 'العمود **الأطول** يعني الأكثر'],
      [32, 'والعمود **الأقصر** يعني الأقل'],
    ]}
  />
);
