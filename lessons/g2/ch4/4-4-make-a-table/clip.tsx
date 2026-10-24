import { CLIP_W, Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';

/* مقطع فكرة الدرس: عجلات الدراجات (مثال غير مثال الكتاب): لكل دراجة عجلتان، كم عجلة لـ ٦ دراجات؟ */

const N = 6;
const T0 = 9, DT = 2.5;

function Bike({ x, y, op }: { x: number; y: number; op: number }) {
  if (op <= 0.01) return null;
  return (
    <g opacity={op} transform={`translate(${x},${y})`}>
      <circle cx={-30} cy={0} r={22} fill="none" stroke="var(--ink)" strokeWidth={5} />
      <circle cx={30} cy={0} r={22} fill="none" stroke="var(--ink)" strokeWidth={5} />
      <path d="M-30,0 L-5,-30 L20,-30 L30,0 M-5,-30 L5,0" fill="none" stroke="#e8635a" strokeWidth={5} />
    </g>
  );
}

function scene(t: number) {
  const shown = t < T0 ? 0 : Math.min(N, Math.floor((t - T0) / DT) + 1);
  return (
    <>
      <ClipTitle t={t} title="أُنْشِئُ جَدْوَلًا" q="لكل دراجة عجلتان. كم عجلة لـ ٦ دراجات؟" />
      <g opacity={fade(t, 4.5, 99)}>
        {Array.from({ length: N }, (_, i) => (
          <Bike key={i} x={1240 - i * 190} y={110} op={tw(t, T0 + i * DT, T0 + i * DT + 0.4)} />
        ))}
        {['الدراجات', 'العجلات'].map((h, r) => (
          <g key={h}>
            <rect x={1170} y={200 + r * 90} width={180} height={90} fill="#c8e6c9" stroke="var(--ink)" strokeWidth={3} />
            <text x={1260} y={258 + r * 90} fontSize={34} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>{h}</text>
            {Array.from({ length: N }, (_, j) => (
              <g key={j}>
                <rect x={1050 - j * 120} y={200 + r * 90} width={120} height={90} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
                {j < shown && <SvgEq x={1110 - j * 120} y={262 + r * 90} size={48} parts={[r === 0 ? j + 1 : 2 * (j + 1)]} color={r === 1 && j === N - 1 ? 'var(--good)' : 'var(--ink)'} />}
              </g>
            ))}
          </g>
        ))}
      </g>
      <ClipCard x={CLIP_W / 2 - 420} y={410} w={840} h={90} op={fade(t, 26, 99)} color="var(--good)">
        <text x={CLIP_W / 2} y={468} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>
          {t < 32 ? '٦ دراجات لها ١٢ عجلة' : 'نتحقق: ٢ + ٢ + ٢ + ٢ + ٢ + ٢ = ١٢ ✓'}
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
      [5, 'نُنشئ جدولًا: صف للدراجات وصف للعجلات'],
      [9, 'دراجة واحدة: **٢** عجلة'],
      [11.5, 'دراجتان: **٤** عجلات'],
      [14, 'نعدّ بالاثنينات: ٦، ٨، ١٠…'],
      [26, '٦ دراجات: **١٢** عجلة'],
      [32, 'نتحقق بالجمع المتكرر'],
    ]}
  />
);
