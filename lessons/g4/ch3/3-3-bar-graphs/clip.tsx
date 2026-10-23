import { Clip, ClipTitle, SvgEq, fade, num, tw } from '@engine';

/* مقطع فكرة الدرس: من الجدول التكراري إلى الأعمدة، ثم الأكثر والأقل والفرق (مثال غير مثال الكتاب) */

const SPORTS = [
  { name: 'الحصان', n: 4, color: '#f2a03d' },
  { name: 'القطة', n: 7, color: '#4f9be0' },
  { name: 'الأرنب', n: 2, color: '#e0607e' },
  { name: 'الصقر', n: 6, color: '#3fb6a8' },
];
const MOST = 1, LEAST = 2;
const BASE = 430, U = 32, AX = 200;
const barX = (i: number) => 300 + i * 150; // من اليسار كما في الكتاب
const GROW = (i: number) => 11 + i * 2.2;

function scene(t: number) {
  const table = fade(t, 4.5, 23);
  const axes = tw(t, 10, 10.8);
  const solid = tw(t, 20.5, 21.5);
  const most = fade(t, 24, 30), least = fade(t, 30, 35);
  const diff = tw(t, 35, 35.8);
  return (
    <>
      <ClipTitle t={t} title="التَّمثيلُ بالأعمدةِ" q="كيف نقارن بين البيانات بنظرة واحدة؟" />

      {/* الجدول التكراري */}
      {table > 0.01 && (
        <g opacity={table}>
          <rect x={1010} y={110} width={330} height={300} rx={14} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
          <rect x={1010} y={110} width={330} height={52} rx={14} fill="var(--rule-t)" stroke="var(--ink)" strokeWidth={3} />
          <line x1={1180} y1={110} x2={1180} y2={410} stroke="var(--ink)" strokeWidth={2} />
          <text x={1260} y={146} fontSize={26} textAnchor="middle">الحيوان</text>
          <text x={1095} y={146} fontSize={26} textAnchor="middle">التكرار</text>
          {SPORTS.map((s, i) => (
            <g key={s.name}>
              <text x={1260} y={208 + i * 60} fontSize={28} textAnchor="middle">{s.name}</text>
              <text x={1095} y={210 + i * 60} fontSize={34} textAnchor="middle" fill={s.color}>{num(s.n)}</text>
            </g>
          ))}
        </g>
      )}

      {/* المحوران والشبكة */}
      <g opacity={axes}>
        <text x={540} y={70} fontSize={30} textAnchor="middle">الحيوان المفضّل</text>
        {[2, 4, 6, 8, 10].map((v) => (
          <g key={v}>
            <line x1={AX} y1={BASE - v * U} x2={900} y2={BASE - v * U} stroke="var(--gridline)" strokeWidth={2} />
            <text x={AX - 26} y={BASE - v * U + 10} fontSize={24} textAnchor="middle">{num(v)}</text>
          </g>
        ))}
        <text x={AX - 26} y={BASE + 10} fontSize={24} textAnchor="middle">{num(0)}</text>
        <line x1={AX} y1={BASE} x2={910} y2={BASE} stroke="var(--ink)" strokeWidth={3} />
        <line x1={AX} y1={BASE} x2={AX} y2={BASE - 10.6 * U} stroke="var(--ink)" strokeWidth={3} />
      </g>

      {/* الأعمدة: مربعات تتراكم ثم تصير عمودًا */}
      {SPORTS.map((s, i) => {
        const x = barX(i);
        const shown = Math.min(s.n, Math.floor((t - GROW(i)) / 0.22) + 1);
        const dim = (most > 0.5 && i !== MOST) || (least > 0.5 && i !== LEAST) ? 0.3 : 1;
        return (
          <g key={s.name} opacity={dim}>
            {shown > 0 &&
              Array.from({ length: shown }, (_, k) => (
                <rect key={k} x={x - 45} y={BASE - (k + 1) * U} width={90} height={U} fill={s.color} stroke="#fff" strokeWidth={3 * (1 - solid)} />
              ))}
            {solid > 0 && <rect x={x - 45} y={BASE - s.n * U} width={90} height={s.n * U} fill="none" stroke="var(--ink)" strokeWidth={2.5} opacity={solid} />}
            <text x={x} y={BASE + 40} fontSize={26} textAnchor="middle" opacity={axes}>{s.name}</text>
            <text x={x} y={BASE - s.n * U - 14} fontSize={30} textAnchor="middle" opacity={solid}>{num(s.n)}</text>
          </g>
        );
      })}
      {most > 0.01 && <rect x={barX(MOST) - 54} y={BASE - 7 * U - 9} width={108} height={7 * U + 9} rx={6} fill="none" stroke="var(--hl)" strokeWidth={6} opacity={most} />}
      {least > 0.01 && <rect x={barX(LEAST) - 54} y={BASE - 2 * U - 9} width={108} height={2 * U + 9} rx={6} fill="none" stroke="var(--hl)" strokeWidth={6} opacity={least} />}

      {/* الفرق بين الأكثر والأقل */}
      {diff > 0.01 && (
        <g opacity={diff}>
          {/* الفرق في الفراغ بين العمودين */}
          <line x1={(barX(MOST) + barX(LEAST)) / 2} y1={BASE - 7 * U} x2={(barX(MOST) + barX(LEAST)) / 2} y2={BASE - 2 * U} stroke="var(--hl)" strokeWidth={5} />
          <line x1={barX(LEAST) - 45} y1={BASE - 2 * U} x2={(barX(MOST) + barX(LEAST)) / 2 - 10} y2={BASE - 2 * U} stroke="var(--hl)" strokeWidth={3} strokeDasharray="6 5" />
          <rect x={(barX(MOST) + barX(LEAST)) / 2 - 20} y={BASE - 4.5 * U - 24} width={40} height={44} rx={8} fill="var(--paper)" />
          <text x={(barX(MOST) + barX(LEAST)) / 2} y={BASE - 4.5 * U + 10} fontSize={34} textAnchor="middle" fill="var(--hl)">{num(5)}</text>
          <SvgEq x={1170} y={290} size={60} parts={[7, '−', 2, '=', { v: 5, color: 'var(--hl)' }]} />
        </g>
      )}
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={43}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'سألنا طلاب الصف: ما حيوانك المفضّل؟'],
      [10, 'نحوّل كل عدد إلى **عمود**: كل مربع = طالب واحد'],
      [20.5, 'طول العمود يدلّ على العدد'],
      [24, 'العمود الأطول = **الأكثر**: القطة ٧'],
      [30, 'العمود الأقصر = **الأقل**: الأرنب ٢'],
      [35, 'الفرق بين الأكثر والأقل: ٧ − ٢ = **٥**'],
    ]}
  />
);
