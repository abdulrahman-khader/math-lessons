import { CLIP_W, Clip, ClipCard, ClipTitle, fade, tw } from '@engine';

/* مقطع فكرة الدرس: الألعاب المفضلة (مثال غير مثال الكتاب): الكرة ٦، الدراجة ٤. صورة = ١، ثم صورة = ٢ */

const ROWS: [string, string, number][] = [
  ['⚽ الكرة', '⚽', 6],
  ['🚲 الدراجة', '🚲', 4],
];

function Row({ y, icon, label, n, per, t, a }: { y: number; icon: string; label: string; n: number; per: number; t: number; a: number }) {
  const k = n / per;
  return (
    <g>
      <rect x={980} y={y - 45} width={280} height={90} fill="#fff3b0" stroke="var(--ink)" strokeWidth={3} />
      <text x={1120} y={y + 14} fontSize={38} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>{label}</text>
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x={890 - i * 90} y={y - 45} width={90} height={90} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
          {i < k && (
            <text x={935 - i * 90} y={y + 18} fontSize={52} textAnchor="middle" opacity={tw(t, a + i * 0.5, a + i * 0.5 + 0.3)}>{icon}</text>
          )}
        </g>
      ))}
    </g>
  );
}

function scene(t: number) {
  const per = t < 21 ? 1 : 2;
  const a = per === 1 ? 6 : 23;
  return (
    <>
      <ClipTitle t={t} title="التَّمْثِيلُ بِالصُّوَرِ" q="الكرة ٦ طلاب، والدراجة ٤ طلاب" />
      <g opacity={fade(t, 4.5, 99)}>
        {ROWS.map(([label, icon, n], i) => (
          <Row key={`${per}-${i}`} y={150 + i * 110} icon={icon} label={label} n={n} per={per} t={t} a={a + i * 3.5} />
        ))}
        <ClipCard x={CLIP_W / 2 - 300} y={330} w={600} h={80} color={per === 1 ? 'var(--ex)' : 'var(--qs)'}>
          <text x={CLIP_W / 2} y={382} fontSize={36} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>
            {per === 1 ? 'المفتاح: كل صورة = طالب واحد' : 'المفتاح: كل صورة = طالبان'}
          </text>
        </ClipCard>
      </g>
      <g opacity={fade(t, 33, 99)}>
        <text x={CLIP_W / 2} y={475} fontSize={40} textAnchor="middle" direction="rtl" fill="var(--good)" style={{ fontWeight: 800 }}>
          ٣ صور × ٢ = ٦ طلاب للكرة ✓
        </text>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={42}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [5, 'كل صورة تمثّل **طالبًا واحدًا**'],
      [6, 'الكرة: **٦** صور'],
      [9.5, 'الدراجة: **٤** صور'],
      [16, 'المفتاح يخبرنا كم تمثّل الصورة'],
      [21, 'نغيّر المفتاح: كل صورة = **طالبان**'],
      [23, 'الكرة: ٦ طلاب ← **٣** صور فقط'],
      [26.5, 'الدراجة: ٤ طلاب ← **صورتان**'],
      [33, 'نتحقق بالعدّ: ٢ + ٢ + ٢ = **٦**'],
    ]}
  />
);
