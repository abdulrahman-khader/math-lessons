import { Clip, ClipTitle, SvgEq, lerp, tw, type EqPart } from '@engine';

/* مقطع فكرة الدرس: الدومينو المخفي (مثال غير مثال الكتاب): ٨ + □ = ١٣، أفكّر ١٣ − ٨ = ٥ */

const KNOWN = 8, TOTAL = 13, MISSING = TOTAL - KNOWN;

const DOTS: Record<number, [number, number][]> = {
  // ثمانٍ: ٣ × ٣ بلا الوسط، وخمس: مثل حجر النرد
  8: [-1, 0, 1].flatMap((r) => [-1, 0, 1].map((c): [number, number] => [c, r])).filter(([c, r]) => c || r),
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
};

function Half({ cx, n }: { cx: number; n: number }) {
  return (
    <>
      {DOTS[n].map(([c, r], i) => (
        <circle key={i} cx={cx + c * 62} cy={165 + r * 58} r={17} fill="var(--ink)" />
      ))}
    </>
  );
}

function scene(t: number) {
  const tile = tw(t, 4.5, 5.3);
  const lift = tw(t, 23, 24.2);
  const found = t > 23;
  const eq1: EqPart[] = [KNOWN, '+', { v: found ? MISSING : '', box: true, color: found ? 'var(--hl)' : undefined }, '=', { v: TOTAL, op: tw(t, 9, 9.5) }];
  const eq2: EqPart[] = [TOTAL, '−', KNOWN, '=', { v: t > 19 ? MISSING : '؟', color: 'var(--hl)' }];
  return (
    <>
      <ClipTitle t={t} title="الأَعْدَادُ الْمَفْقُودَةُ" q="كيف نجد العدد المخبّأ؟" />

      {tile > 0.01 && (
        <g opacity={tile}>
          <rect x={440} y={60} width={520} height={210} rx={26} fill="var(--paper)" stroke="var(--ink)" strokeWidth={4} />
          <line x1={700} y1={74} x2={700} y2={256} stroke="var(--ink)" strokeWidth={4} />
          <Half cx={830} n={KNOWN} />
          <Half cx={570} n={MISSING} />
          {/* الغطاء */}
          <g transform={`translate(0,${lerp(0, -40, lift)})`} opacity={1 - lift}>
            <rect x={450} y={70} width={240} height={190} rx={20} fill="#9aa5b8" stroke="var(--ink)" strokeWidth={3} />
            <text x={570} y={196} fontSize={96} textAnchor="middle" fill="#fff">؟</text>
          </g>
        </g>
      )}

      <g opacity={tw(t, 9, 9.6)}>
        <text x={1030} y={355} fontSize={30} textAnchor="middle" fill="var(--muted)">جملة الجمع</text>
        <SvgEq x={1030} y={450} size={70} parts={eq1} />
      </g>
      <g opacity={tw(t, 14, 14.6)}>
        <text x={370} y={355} fontSize={30} textAnchor="middle" fill="var(--muted)">أفكّر</text>
        <SvgEq x={370} y={450} size={70} parts={eq2} />
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={34}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'قطعة دومينو: نصفها **٨** نقاط، والنصف الآخر مخبّأ'],
      [9, 'مجموع النقاط كلها **١٣**'],
      [14, 'أفكّر في حقيقة الطرح المرتبطة: ١٣ − ٨'],
      [19, '١٣ − ٨ = **٥**'],
      [23, 'العدد المفقود **٥**: ٨ + ٥ = ١٣'],
      [28.5, 'أجد العدد المفقود في جملة الجمع **بالطرح**'],
    ]}
  />
);
