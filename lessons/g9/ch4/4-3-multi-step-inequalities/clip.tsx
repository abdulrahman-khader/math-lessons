import { Clip, ClipCard, ClipTitle, fade, lerp, tw } from '@engine';
import voice from './voice';

/*
 * مقطع فكرة الدرس: ١٠ − ٣س ≤ ٤ ← −٣س ≤ −٦ ← س ≥ ٢ (مثال غير أمثلة الكتاب).
 * الفكرة: نحل كالمعادلة، وحين نقسم على عدد سالب ينقلب اتجاه الإشارة، ثم نمثل الحل ونتحقق.
 * الإشارة تُرسم خطوطًا لا حرفًا، فلا يعكسها اتجاه النص: ≤ تُرى في السطر من اليمين «٤ ≥ …» كما في الكتاب.
 */

const BLUE = '#1554b8';
const RED = '#c62a1c';
const GREEN = '#067a3a';
const FS = 76;

type Part = string | { rel: 'le' | 'ge'; color?: string; flip?: number };

/** عرض تقريبي لجزء من السطر */
const width = (p: Part, size: number) => (typeof p === 'string' ? p.length * size * 0.55 : size * 0.9);

/**
 * إشارة ≤ أو ≥ بترتيبها المنطقي في سطر يُقرأ من اليمين؛ في الرسم تنعكس كما في الكتاب.
 * flip من ٠ إلى ١ يقلبها أفقيًّا (لحظة القسمة على سالب).
 */
function Rel({ cx, y, size, rel, color = 'var(--ink)', flip = 0 }: { cx: number; y: number; size: number; rel: 'le' | 'ge'; color?: string; flip?: number }) {
  const h = size * 0.34;
  // ≤ منطقيًّا في سطر من اليمين ← رأسها إلى اليمين في الرسم
  const dir = rel === 'le' ? 1 : -1;
  const sx = dir * Math.cos(flip * Math.PI);
  const top = y - size * 0.62;
  return (
    <g transform={`translate(${cx} ${top}) scale(${sx === 0 ? 0.001 : sx} 1)`}>
      <path d={`M${-h * 0.8} ${-h} L${h * 0.8} 0 L${-h * 0.8} ${h}`} fill="none" stroke={color} strokeWidth={size * 0.08} strokeLinecap="round" strokeLinejoin="round" />
      <line x1={-h * 0.8} y1={h * 1.55} x2={h * 0.8} y2={h * 1.55} stroke={color} strokeWidth={size * 0.08} strokeLinecap="round" />
    </g>
  );
}

/** سطر متباينة يبدأ من اليمين: كل جزء في مكانه، فلا يغيّر اتجاه النص ترتيبه */
function Line({ x, y, parts, size = FS, op = 1, color = 'var(--ink)' }: { x: number; y: number; parts: Part[]; size?: number; op?: number; color?: string }) {
  if (op <= 0.01) return null;
  const gap = size * 0.3;
  const total = parts.reduce((a, p) => a + width(p, size), 0) + gap * (parts.length - 1);
  let edge = x + total / 2;
  return (
    <g opacity={op}>
      {parts.map((p, i) => {
        const w = width(p, size);
        const cx = edge - w / 2;
        edge -= w + gap;
        if (typeof p === 'string')
          return (
            <text key={i} x={cx} y={y} fontSize={size} textAnchor="middle" direction="rtl" fill={color} style={{ fontWeight: 700 }}>
              {p}
            </text>
          );
        return <Rel key={i} cx={cx} y={y} size={size} rel={p.rel} color={p.color ?? color} flip={p.flip} />;
      })}
    </g>
  );
}

/** ملاحظة الخطوة عن يسار المتباينة */
const Note = ({ t, a, b, text, color = BLUE }: { t: number; a: number; b: number; text: string; color?: string }) => (
  <ClipCard x={70} y={150} w={520} h={100} op={fade(t, a, b)} color={color}>
    <text x={330} y={216} fontSize={42} textAnchor="middle" direction="rtl" fill={color} style={{ fontWeight: 800 }}>
      {text}
    </text>
  </ClipCard>
);

/** خط الأعداد من −١ إلى ٦، والحل س ≥ ٢ */
function NumLine({ t }: { t: number }) {
  const op = fade(t, 24, 99);
  if (op <= 0.01) return null;
  const x0 = 140;
  const step = 150;
  const X = (v: number) => x0 + (v + 1) * step;
  const y = 400;
  const grow = tw(t, 25.5, 28);
  const label = (v: number) => (v < 0 ? `−${'٠١٢٣٤٥٦٧٨٩'[-v]}` : '٠١٢٣٤٥٦٧٨٩'[v]);
  return (
    <g opacity={op}>
      <line x1={X(-1) - 40} y1={y} x2={X(6) + 40} y2={y} stroke="var(--ink)" strokeWidth={4} />
      {[-1, 0, 1, 2, 3, 4, 5, 6].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={y - 14} x2={X(v)} y2={y + 14} stroke="var(--ink)" strokeWidth={3} />
          <text x={X(v)} y={y + 62} fontSize={40} textAnchor="middle" direction="rtl" fill="var(--ink)" style={{ fontWeight: 700 }}>
            {label(v)}
          </text>
        </g>
      ))}
      <line x1={X(2)} y1={y} x2={lerp(X(2), X(6) + 30, grow)} y2={y} stroke={BLUE} strokeWidth={14} strokeLinecap="round" />
      {grow > 0.98 && <path d={`M${X(6) + 30} ${y - 22} L${X(6) + 62} ${y} L${X(6) + 30} ${y + 22} Z`} fill={BLUE} />}
      <circle cx={X(2)} cy={y} r={18} fill={BLUE} stroke={BLUE} strokeWidth={5} />
      {/* التحقق بـ س = ٣ */}
      <g opacity={fade(t, 32, 99)}>
        <circle cx={X(3)} cy={y} r={26} fill="none" stroke={GREEN} strokeWidth={6} />
      </g>
    </g>
  );
}

function scene(t: number) {
  const s1 = fade(t, 5, 99);
  const s2 = fade(t, 9, 99);
  const s3 = fade(t, 15, 99);
  const flip = tw(t, 17, 19);
  const up = tw(t, 23, 24.5); // الأسطر تصعد لتفسح لخط الأعداد
  const yy = (y: number) => lerp(y, y - 400, up);
  const rows = 1 - tw(t, 23, 24);
  return (
    <>
      <ClipTitle t={t} title="حَلُّ الْمُتَبَايِنَاتِ الْمُتَعَدِّدَةِ الْخُطُوَاتِ" q="" size={64} />
      <g opacity={rows}>
        <Line x={960} y={yy(140)} op={s1} parts={['١٠', '−', '٣س', { rel: 'le' }, '٤']} />
        <Line x={960} y={yy(260)} op={s2} parts={['−٣س', { rel: 'le' }, '−٦']} />
        <Line x={960} y={yy(380)} op={s3} parts={['س', { rel: 'le', color: RED, flip }, '٢']} />
      </g>
      <Note t={t} a={9} b={14.5} text="نطرحُ ١٠ منَ الطرفينِ" />
      <Note t={t} a={15} b={22.5} text="نقسمُ على −٣: تنقلبُ الإشارةُ" color={RED} />
      {/* الحل بعد الانقلاب، فوق خط الأعداد */}
      <g opacity={fade(t, 24, 99)}>
        <Line x={380} y={200} parts={['س', { rel: 'ge', color: BLUE }, '٢']} size={86} color={BLUE} />
      </g>
      <NumLine t={t} />
      <g opacity={fade(t, 32, 99)}>
        <ClipCard x={760} y={100} w={560} h={110} op={1} color={GREEN}>
          <text x={1040} y={170} fontSize={40} textAnchor="middle" direction="rtl" fill={GREEN} style={{ fontWeight: 800 }}>
            س = ٣: ١٠ − ٩ = ١، و١ ≤ ٤ ✓
          </text>
        </ClipCard>
      </g>
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
      [6, 'نطرح **١٠** من الطرفين كما في المعادلة'],
      [14, 'نقسم على **−٣**: تنقلب الإشارة'],
      [24, 'نمثل الحل **س ≥ ٢** بدائرة مغلقة'],
      [32, 'نتحقق: **س = ٣** تحقق المتباينة'],
    ]}
  />
);
