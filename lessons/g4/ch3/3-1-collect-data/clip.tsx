import { Clip, ClipTitle, Person, fade, num, tw } from '@engine';

/* مقطع فكرة الدرس: مسح ١٢ طالبًا عن لونهم المفضل ← لوحة إشارات ← جدول تكراري (مثال غير مثال الكتاب) */

const HOBBIES = [
  { name: 'الأزرق', color: '#7fb3e6' },
  { name: 'الأخضر', color: '#9fd17a' },
  { name: 'الأحمر', color: '#f08a8a' },
];
/** لون كل طالب بالترتيب: الأزرق ٦، الأخضر ٤، الأحمر ٢ */
const ANS = [0, 1, 0, 2, 0, 1, 0, 1, 2, 0, 1, 0];
const COUNT_AT = (i: number) => 15 + i * 0.9;
const MARK = ANS.map((h, i) => ANS.slice(0, i).filter((x) => x === h).length);
const TOTALS = HOBBIES.map((_, h) => ANS.filter((x) => x === h).length);

const ROW_Y = [215, 295, 375];
const pos = (i: number) => [1345 - (i % 6) * 82, i < 6 ? 150 : 330];

function Tally({ x, y, m, op }: { x: number; y: number; m: number; op: number }) {
  const g = Math.floor(m / 5), r = m % 5;
  const bx = x - g * 86;
  return r < 4 ? (
    <line x1={bx - r * 15} y1={y - 18} x2={bx - r * 15} y2={y + 18} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" opacity={op} />
  ) : (
    <line x1={bx + 9} y1={y + 14} x2={bx - 54} y2={y - 14} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" opacity={op} />
  );
}

function Table({ x, w, head, op, cell, hl }: { x: number; w: number; head: [string, string]; op: number; cell: (h: number) => React.ReactNode; hl: number }) {
  if (op <= 0.01) return null;
  const split = x + w * 0.52;
  return (
    <g opacity={op}>
      <rect x={x} y={130} width={w} height={290} rx={14} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
      <rect x={x} y={130} width={w} height={50} rx={14} fill="var(--rule-t)" stroke="var(--ink)" strokeWidth={3} />
      <line x1={split} y1={130} x2={split} y2={420} stroke="var(--ink)" strokeWidth={2} />
      <text x={(split + x + w) / 2} y={166} fontSize={26} textAnchor="middle">{head[0]}</text>
      <text x={(x + split) / 2} y={166} fontSize={26} textAnchor="middle">{head[1]}</text>
      {HOBBIES.map((h, i) => (
        <g key={h.name}>
          {i > 0 && <line x1={x} y1={ROW_Y[i] - 40} x2={x + w} y2={ROW_Y[i] - 40} stroke="var(--line)" strokeWidth={2} />}
          <text x={(split + x + w) / 2} y={ROW_Y[i] + 10} fontSize={28} textAnchor="middle">{h.name}</text>
          {cell(i)}
        </g>
      ))}
      {hl > 0.01 && <rect x={x - 6} y={ROW_Y[0] - 40} width={w + 12} height={80} rx={10} fill="none" stroke="var(--hl)" strokeWidth={6} opacity={hl} />}
    </g>
  );
}

function scene(t: number) {
  const hl = fade(t, 38.5, 46);
  return (
    <>
      <ClipTitle t={t} title="جَمْعُ البَياناتِ وتنظِيمُها" q="كيف نعرف بسرعة أيّ لون هو الأكثر؟" />

      {/* الطالبات وإجاباتهن */}
      {ANS.map((h, i) => {
        const [x, y] = pos(i);
        const pop = tw(t, 4.5 + i * 0.2, 5 + i * 0.2);
        const counted = tw(t, COUNT_AT(i), COUNT_AT(i) + 0.4);
        return (
          <g key={i} opacity={1 - 0.6 * counted}>
            <Person x={x} y={y} s={pop * 0.85} fill={t > 10 ? HOBBIES[h].color : '#dbe5f1'} label={HOBBIES[h].name} labelOpacity={tw(t, 6 + i * 0.25, 6.5 + i * 0.25)} />
          </g>
        );
      })}

      {/* لوحة الإشارات */}
      <Table
        x={450}
        w={400}
        head={['اللون', 'الإشارات']}
        op={tw(t, 14, 14.8)}
        hl={hl}
        cell={(r) =>
          ANS.map((h, i) => (h === r ? <Tally key={i} x={620} y={ROW_Y[r] + 2} m={MARK[i]} op={tw(t, COUNT_AT(i) + 0.2, COUNT_AT(i) + 0.5)} /> : null))
        }
      />

      {/* الجدول التكراري */}
      <Table
        x={60}
        w={330}
        head={['اللون', 'التكرار']}
        op={tw(t, 27.5, 28.3)}
        hl={hl}
        cell={(r) => (
          <text x={60 + 330 * 0.26} y={ROW_Y[r] + 12} fontSize={40} textAnchor="middle" fill="var(--rule)" opacity={tw(t, 29 + r, 29.5 + r)}>
            {num(TOTALS[r])}
          </text>
        )}
      />
      <g opacity={tw(t, 34, 34.6)}>
        <rect x={60} y={436} width={330} height={60} rx={12} fill="var(--rule-t)" stroke="var(--rule)" strokeWidth={3} />
        <text x={60 + 330 * 0.74} y={476} fontSize={28} textAnchor="middle">المجموع</text>
        <text x={60 + 330 * 0.26} y={478} fontSize={38} textAnchor="middle" fill="var(--rule)">{num(12)}</text>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={46}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'سألنا **١٢** طالبًا عن لونهم المفضّل: هذا **مسح**'],
      [10, 'الإجابات التي جمعناها هي **البيانات**'],
      [14.5, 'ننظّمها في **لوحة إشارات**: كل إشارة = طالبة واحدة'],
      [22.8, 'الإشارة الخامسة تقطع الأربع، فتصير **حزمة** من ٥'],
      [27.5, 'وفي **الجدول التكراري** نكتب العدد بدل الإشارات'],
      [34, 'المجموع **١٢** = عدد الطلاب الذين سألناهم'],
      [38.5, 'الأزرق هو الأكثر: **٦** طلاب'],
    ]}
  />
);
