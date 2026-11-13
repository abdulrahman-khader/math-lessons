import { Clip, ClipCard, ClipTitle, Kid, fade, num, tw, type ClipTalk } from '@engine';
import voice from './money-voice';

/*
 * من واقع الحياة: سالم في المكتبة. الدفتر بـ١٨ ريالًا (٦ دفاتر: التقدير ١٢٠، الحقيقي ١٠٨)
 * وعلبة الألوان بـ٢٢ ريالًا (٥ علب: التقدير ١٠٠، الحقيقي ١١٠). كم يحتاج تقريبًا؟
 * المقطع يعرض الموقف ويتوقف عند السؤال، والحل في الشريحتين بعده بأوراق نقدية.
 */

const NOTE: Record<number, [string, string]> = {
  10: ['#E9DDF3', '#7B4FA0'],
  100: ['#DDEFE0', '#2E7D4F'],
};

/** ورقة نقدية بسيطة عليها قيمتها */
export const Note = ({ x, y, v, s = 1, op = 1 }: { x: number; y: number; v: 10 | 100; s?: number; op?: number }) => {
  if (op <= 0.01) return null;
  const [bg, ink] = NOTE[v];
  return (
    <g opacity={op} transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-60} y={-30} width={120} height={60} rx={7} fill={bg} stroke={ink} strokeWidth={3} />
      <rect x={-52} y={-22} width={104} height={44} rx={4} fill="none" stroke={ink} strokeWidth={1.5} strokeDasharray="4 3" />
      <circle cx={-34} cy={0} r={11} fill="none" stroke={ink} strokeWidth={2} />
      <text x={14} y={2} fontSize={30} fontWeight={800} fill={ink} textAnchor="middle">{num(v)}</text>
      <text x={14} y={20} fontSize={12} fontWeight={700} fill={ink} textAnchor="middle" direction="rtl">رِيَالٌ</text>
    </g>
  );
};

/** بطاقة سعر */
export const Tag = ({ x, y, v, op = 1, color = '#C0392B', s = 1 }: { x: number; y: number; v: number; op?: number; color?: string; s?: number }) => {
  if (op <= 0.01) return null;
  return (
    <g opacity={op} transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-44 -24 H30 L48 0 L30 24 H-44 Z" fill="#fff" stroke={color} strokeWidth={3} />
      <circle cx={32} cy={0} r={5} fill={color} />
      <text x={-8} y={10} fontSize={28} fontWeight={800} fill={color} textAnchor="middle">{num(v)}</text>
    </g>
  );
};

/** دفتر */
export const Notebook = ({ x, y, op = 1, s = 1 }: { x: number; y: number; op?: number; s?: number }) => {
  if (op <= 0.01) return null;
  return (
    <g opacity={op} transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-28} y={-38} width={56} height={76} rx={5} fill="#3D7CC9" stroke="#24538C" strokeWidth={3} />
      <rect x={-14} y={-20} width={34} height={16} rx={3} fill="#fff" />
      {[-26, -10, 6, 22].map((cy) => (
        <circle key={cy} cx={-28} cy={cy} r={4} fill="none" stroke="#555" strokeWidth={2} />
      ))}
    </g>
  );
};

/** علبة ألوان */
export const ColorBox = ({ x, y, op = 1, s = 1 }: { x: number; y: number; op?: number; s?: number }) => {
  if (op <= 0.01) return null;
  const cols = ['#E74C3C', '#F39C12', '#F1C40F', '#27AE60', '#2980B9', '#8E44AD'];
  return (
    <g opacity={op} transform={`translate(${x} ${y}) scale(${s})`}>
      {cols.map((c, i) => (
        <g key={c}>
          <rect x={-33 + i * 11} y={-36} width={9} height={30} fill={c} />
          <path d={`M${-33 + i * 11} -36 L${-28.5 + i * 11} -46 L${-24 + i * 11} -36 Z`} fill={c} />
        </g>
      ))}
      <rect x={-38} y={-14} width={76} height={50} rx={5} fill="#F5E6C8" stroke="#A67C2E" strokeWidth={3} />
    </g>
  );
};

/* ---------- الصور داخل خطوات الحل (تظهر مع الخطوة) ---------- */

/** السعر قبل التقريب وبعده */
export const RoundTags = ({ from, to }: { from: number; to: number }) => (
  <svg viewBox="0 0 300 70" width={360} height={84} aria-hidden>
    <Tag x={250} y={35} v={from} />
    <path d="M190 35 H130" stroke="var(--good)" strokeWidth={5} fill="none" />
    <path d="M132 24 L112 35 L132 46 Z" fill="var(--good)" />
    <Tag x={60} y={35} v={to} color="var(--good)" />
  </svg>
);

/** مجموعات من أوراق العشرة: groups مجموعة، في كلٍّ منها per ورقة، فوقها الغرض */
export const NoteGroups = ({ groups, per, item }: { groups: number; per: number; item: 'book' | 'colors' }) => {
  const gw = 120;
  const h = 100 + per * 52 + 40;
  return (
    <svg viewBox={`0 0 ${groups * gw} ${h}`} width={groups * gw * (170 / h)} height={170} aria-hidden>
      {Array.from({ length: groups }, (_, i) => {
        const cx = groups * gw - gw / 2 - i * gw;
        return (
          <g key={i}>
            {item === 'book' ? <Notebook x={cx} y={46} s={0.95} /> : <ColorBox x={cx} y={54} s={0.95} />}
            {Array.from({ length: per }, (_, k) => (
              <Note key={k} x={cx} y={124 + k * 52} v={10} s={0.85} />
            ))}
            <text x={cx} y={h - 8} fontSize={30} fontWeight={800} textAnchor="middle" fill="var(--good)">{num(per * 10)}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** اتجاه التقريب: السعر الحقيقي، والسعر بعد التقريب فوقه (قرّبنا إلى أكبر) أو تحته (إلى أقل) */
export const RoundDir = ({ from, to, w = 430 }: { from: number; to: number; w?: number }) => {
  const up = to > from;
  const c = up ? 'var(--good)' : 'var(--bad)';
  return (
    <svg viewBox="0 0 360 170" width={w} height={(w * 170) / 360} aria-hidden>
      <Tag x={270} y={up ? 130 : 40} v={from} color="#555" />
      <text x={270} y={up ? 92 : 102} fontSize={22} fontWeight={700} textAnchor="middle" direction="rtl" fill="#555">الْحَقِيقِيُّ</text>
      <path d={up ? 'M190 130 Q140 130 120 66' : 'M190 40 Q140 40 120 104'} stroke={c} strokeWidth={5} fill="none" />
      <path d={up ? 'M108 72 L120 50 L134 70 Z' : 'M108 98 L120 120 L134 100 Z'} fill={c} />
      <Tag x={70} y={up ? 40 : 130} v={to} color={c} />
    </svg>
  );
};

/* ---------- المقطع: الموقف والسؤال ---------- */

function scene(t: number, s: ClipTalk) {
  const body = fade(t, 4.3, 99);
  return (
    <>
      <ClipTitle t={t} title="في المكتبةِ" q="كم ريالًا يحتاجُ تقريبًا؟" />
      <g opacity={body}>
        <Kid x={1250} y={215} boy look={-1} mood={t >= 23 ? 'think' : 'happy'} now={s.now} name="سَالِمٌ" />
        {/* الرف */}
        <line x1={60} y1={340} x2={1000} y2={340} stroke="#A67C2E" strokeWidth={8} opacity={tw(t, 9, 9.5)} />
        <line x1={60} y1={480} x2={1000} y2={480} stroke="#A67C2E" strokeWidth={8} opacity={tw(t, 16, 16.5)} />
        <Tag x={920} y={290} v={18} s={1.3} op={tw(t, 9.5, 10)} />
        {Array.from({ length: 6 }, (_, i) => (
          <Notebook key={i} x={780 - i * 110} y={296} op={tw(t, 10.5 + i * 0.5, 11 + i * 0.5)} />
        ))}
        <Tag x={920} y={430} v={22} s={1.3} op={tw(t, 16.5, 17)} />
        {Array.from({ length: 5 }, (_, i) => (
          <ColorBox key={i} x={780 - i * 115} y={440} op={tw(t, 17.5 + i * 0.6, 18 + i * 0.6)} />
        ))}
        {/* السؤال */}
        <ClipCard x={170} y={110} w={700} h={110} op={fade(t, 28, 99)} color="var(--rule)">
          <text x={520} y={182} fontSize={48} fontWeight={800} textAnchor="middle" direction="rtl" fill="var(--rule)">كَمْ رِيَالًا يَحْتَاجُ تَقْرِيبًا؟</text>
        </ClipCard>
      </g>
    </>
  );
}

export const MoneyClip = () => (
  <Clip
    voice={voice}
    duration={34}
    scene={scene}
    captions={[
      [0, 'في المكتبةِ'],
      [4.5, 'سالمٌ يشتري أدواتِ المدرسةِ'],
      [9, '**٦** دفاترَ، الدفترُ بـ**١٨** ريالًا'],
      [16, 'و**٥** علبِ ألوانٍ، العلبةُ بـ**٢٢** ريالًا'],
      [23, 'لا نحتاجُ الحسابَ الدقيقَ الآنَ'],
      [28, '**كم ريالًا يحتاجُ تقريبًا؟**'],
    ]}
  />
);
