import { Clip, ClipTitle, Person, SvgEq, fade, num, tw } from '@engine';

/* مقطع فكرة الدرس: الرحلة العلمية (ص ٨٢): كل معلِّمَين مع ٩ طلاب، والمعلمون ١٦ */

const COLS = 8;
const COL_AT = (j: number) => 14.5 + j * 1.6;
const HEAD_X = 1160, CW = 118, TOP = 190, RH = 80;
const colX = (j: number) => HEAD_X - CW * (j + 0.5);

function scene(t: number) {
  const group = fade(t, 4.5, 14);
  const table = tw(t, 13.5, 14.3);
  const steps = fade(t, 18, 27);
  const final = tw(t, 28.5, 29.3);
  const check = tw(t, 35, 35.6);
  return (
    <>
      <ClipTitle t={t} title="خُطَّةُ حَلِّ الْمَسْأَلَةِ: إنشاءُ جدولٍ" q="١٦ معلِّمًا في الرحلة… فكم طالبًا؟" />

      {/* مجموعة واحدة: معلِّمان و٩ طلاب */}
      {group > 0.01 && (
        <g opacity={group}>
          {[0, 1].map((k) => (
            <Person key={k} x={1000 - k * 90} y={250} s={1.15 * tw(t, 4.6 + k * 0.2, 5 + k * 0.2)} fill="#13213b" />
          ))}
          {Array.from({ length: 9 }, (_, k) => (
            <Person key={k} x={760 - (k % 5) * 70} y={k < 5 ? 200 : 310} s={0.7 * tw(t, 5.2 + k * 0.15, 5.6 + k * 0.15)} fill="#ffcf6b" />
          ))}
          <text x={955} y={360} fontSize={30} textAnchor="middle" opacity={tw(t, 6, 6.5)}>معلِّمان</text>
          <text x={620} y={420} fontSize={30} textAnchor="middle" opacity={tw(t, 7, 7.5)}>{num(9)} طلاب</text>
        </g>
      )}

      {/* جدول النمط */}
      {table > 0.01 && (
        <g opacity={table}>
          <rect x={HEAD_X - CW * COLS} y={TOP} width={CW * COLS + 200} height={RH * 2} rx={12} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
          <rect x={HEAD_X} y={TOP} width={200} height={RH * 2} rx={12} fill="#e1f3e7" stroke="var(--ink)" strokeWidth={3} />
          <line x1={HEAD_X - CW * COLS} y1={TOP + RH} x2={HEAD_X + 200} y2={TOP + RH} stroke="var(--ink)" strokeWidth={2} />
          {Array.from({ length: COLS - 1 }, (_, j) => (
            <line key={j} x1={HEAD_X - CW * (j + 1)} y1={TOP} x2={HEAD_X - CW * (j + 1)} y2={TOP + RH * 2} stroke="var(--line)" strokeWidth={2} />
          ))}
          <text x={HEAD_X + 100} y={TOP + 50} fontSize={26} textAnchor="middle">عدد المعلِّمين</text>
          <text x={HEAD_X + 100} y={TOP + RH + 50} fontSize={26} textAnchor="middle">عدد الطلاب</text>
          {Array.from({ length: COLS }, (_, j) => {
            const op = tw(t, COL_AT(j), COL_AT(j) + 0.5);
            const last = j === COLS - 1;
            return (
              <g key={j} opacity={op}>
                {last && final > 0 && <rect x={HEAD_X - CW * (j + 1) + 4} y={TOP + 4} width={CW - 8} height={RH * 2 - 8} rx={10} fill="none" stroke="var(--hl)" strokeWidth={6} opacity={final} />}
                <text x={colX(j)} y={TOP + 54} fontSize={38} textAnchor="middle">{num(2 * (j + 1))}</text>
                <text x={colX(j)} y={TOP + RH + 54} fontSize={38} textAnchor="middle" fill={last ? 'var(--hl)' : 'var(--rule)'}>
                  {num(9 * (j + 1))}
                </text>
              </g>
            );
          })}
          {/* +٢ و +٩ بين الأعمدة */}
          {steps > 0.01 &&
            [0, 1, 2].map((j) => (
              <g key={j} opacity={steps}>
                <path d={`M${colX(j) - 14},${TOP - 14} Q${colX(j) - CW / 2},${TOP - 50} ${colX(j + 1) + 14},${TOP - 14}`} fill="none" stroke="var(--ex)" strokeWidth={3} />
                <text x={colX(j) - CW / 2} y={TOP - 46} fontSize={28} textAnchor="middle" direction="ltr" fill="var(--ex)">{'+' + num(2)}</text>
                <path d={`M${colX(j) - 14},${TOP + RH * 2 + 14} Q${colX(j) - CW / 2},${TOP + RH * 2 + 50} ${colX(j + 1) + 14},${TOP + RH * 2 + 14}`} fill="none" stroke="var(--rule)" strokeWidth={3} />
                <text x={colX(j) - CW / 2} y={TOP + RH * 2 + 78} fontSize={28} textAnchor="middle" direction="ltr" fill="var(--rule)">{'+' + num(9)}</text>
              </g>
            ))}
        </g>
      )}

      {/* أتحقق */}
      {check > 0.01 && (
        <g opacity={check}>
          <SvgEq x={900} y={470} size={46} parts={[16, '÷', 2, '=', 8]} />
          <SvgEq x={460} y={470} size={46} parts={[8, '×', 9, '=', { v: 72, color: 'var(--hl)' }]} />
        </g>
      )}
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={44}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'كل **٢** معلِّمَين يصطحبان مجموعة من **٩** طلاب'],
      [9.5, 'إذا كان المعلِّمون **١٦**، فكم طالبًا؟ ننشئ **جدولًا**'],
      [14.5, 'مجموعة واحدة: ٢ معلِّمان و٩ طلاب'],
      [18, 'كل مجموعة جديدة: يزيد المعلِّمون **٢** ويزيد الطلاب **٩**'],
      [24, 'نكمل النمط حتى يصل المعلِّمون إلى **١٦**'],
      [28.5, '١٦ معلِّمًا ← **٧٢** طالبًا'],
      [35, 'أتحقّق: **٨** مجموعات، في كل مجموعة ٩ طلاب'],
    ]}
  />
);
