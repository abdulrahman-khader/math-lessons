import { Clip, ClipTitle, SvgEq, lerp, num, tw } from '@engine';
import { bean } from './charts';

/* مقطع فكرة الدرس: نبتة الفول تنمو كل أسبوع ← نقاط ← خط (بيانات لغز التهيئة) */

const V = bean.values as number[];
const BASE = 440, U = 24, AX = 210;
const px = (i: number) => 310 + i * 140; // من اليسار كما في الكتاب
const py = (v: number) => BASE - v * U;
const WEEK = (i: number) => 10 + i * 2.6;
const PLANT_X = 1180;

/** طول النبتة الآن: يكبر من قياس الأسبوع السابق إلى قياس هذا الأسبوع */
function height(t: number) {
  let h = 0;
  V.forEach((v, i) => {
    const prev = i ? V[i - 1] : 0;
    if (t >= WEEK(i) - 1.4) h = lerp(prev, v, tw(t, WEEK(i) - 1.4, WEEK(i)));
  });
  return h;
}

function Plant({ h }: { h: number }) {
  const top = py(h);
  const leaves = Math.floor(h / 2);
  return (
    <g>
      {h > 0 && <path d={`M${PLANT_X},${BASE} C${PLANT_X - 10},${(BASE + top) / 2} ${PLANT_X + 10},${(BASE + top) / 2} ${PLANT_X},${top}`} stroke="#3f8f3a" strokeWidth={8} fill="none" strokeLinecap="round" />}
      {Array.from({ length: leaves }, (_, k) => {
        const y = BASE - (k + 1) * 2 * U + 8;
        const d = k % 2 ? 1 : -1;
        return <ellipse key={k} cx={PLANT_X + d * 26} cy={y} rx={26} ry={11} fill="#6cc04a" stroke="#3f8f3a" strokeWidth={2} transform={`rotate(${d * -25},${PLANT_X + d * 26},${y})`} />;
      })}
      <path d={`M${PLANT_X - 60},${BASE} L${PLANT_X + 60},${BASE} L${PLANT_X + 45},${BASE + 62} L${PLANT_X - 45},${BASE + 62} Z`} fill="#c9733f" stroke="var(--ink)" strokeWidth={3} />
    </g>
  );
}

function scene(t: number) {
  const axes = tw(t, 9, 9.8);
  const h = height(t);
  const line = tw(t, 24, 27);
  const steep = tw(t, 28, 28.6) * (1 - tw(t, 39, 39.5));
  const pts = V.map((v, i) => [px(i), py(v)]);
  const len = pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
  return (
    <>
      <ClipTitle t={t} title="التَّمثيلُ بالخُطوطِ" q="كيف نرى التغيّر مع مرور الزمن؟" />

      {t > 4.2 && <Plant h={h} />}

      {/* المحوران */}
      <g opacity={axes}>
        <text x={560} y={52} fontSize={30} textAnchor="middle">طول نبتة الفول</text>
        {[2, 4, 6, 8, 10, 12, 14].map((v) => (
          <g key={v}>
            <line x1={AX} y1={py(v)} x2={920} y2={py(v)} stroke="var(--gridline)" strokeWidth={2} />
            <text x={AX - 26} y={py(v) + 9} fontSize={22} textAnchor="middle">{num(v)}</text>
          </g>
        ))}
        <line x1={AX} y1={BASE} x2={930} y2={BASE} stroke="var(--ink)" strokeWidth={3} />
        <line x1={AX} y1={BASE} x2={AX} y2={py(14.6)} stroke="var(--ink)" strokeWidth={3} />
        {bean.labels.map((l, i) => (
          <text key={l} x={px(i)} y={BASE + 34} fontSize={22} textAnchor="middle">{l}</text>
        ))}
        <text x={570} y={BASE + 68} fontSize={22} textAnchor="middle">الأسبوع</text>
      </g>

      {/* دليل أفقي من رأس النبتة إلى النقطة */}
      {V.map((v, i) => {
        const g = tw(t, WEEK(i), WEEK(i) + 0.4) * (1 - tw(t, WEEK(i) + 1.6, WEEK(i) + 2));
        return g > 0.01 ? <line key={i} x1={PLANT_X - 20} y1={py(v)} x2={px(i) + 14} y2={py(v)} stroke="var(--hl)" strokeWidth={3} strokeDasharray="8 7" opacity={g} /> : null;
      })}

      {/* الخط بين النقاط */}
      {line > 0 && (
        <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="var(--plot)" strokeWidth={6} strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - line)} opacity={steep > 0.5 ? 0.35 : 1} />
      )}
      {steep > 0.01 && <line x1={pts[1][0]} y1={pts[1][1]} x2={pts[2][0]} y2={pts[2][1]} stroke="var(--plot)" strokeWidth={11} strokeLinecap="round" opacity={steep} />}

      {/* النقاط وقيمها */}
      {V.map((v, i) => {
        const op = tw(t, WEEK(i) + 0.3, WEEK(i) + 0.7);
        const on = steep < 0.5 || i === 1 || i === 2;
        return op > 0.01 ? (
          <g key={i} opacity={op * (on ? 1 : 0.35)}>
            <circle cx={px(i)} cy={py(v)} r={11} fill="var(--plot)" stroke="#fff" strokeWidth={3} />
            <text x={px(i) - 26} y={py(v) - 14} fontSize={26} textAnchor="middle" fill="var(--rule)">{num(v)}</text>
          </g>
        ) : null;
      })}

      {steep > 0.01 && (
        <g opacity={steep}>
          <SvgEq x={390} y={170} size={42} parts={[9, '−', 4, '=', { v: 5, color: 'var(--hl)' }]} />
        </g>
      )}
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={42}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'زرعنا بذرة فول، ونقيس طولها في نهاية كل أسبوع'],
      [10, 'كل أسبوع نضع **نقطة** عند طول النبتة'],
      [24, 'نصل النقاط بخط: هذا هو **التمثيل بالخطوط**'],
      [28, 'أشدّ صعود بين الأسبوعين الثاني والثالث: زادت **٥** سم'],
      [34, 'الخط يصعد = الطول **يزيد** مع مرور الزمن'],
      [39, 'التمثيل بالخطوط يوضّح **التغيّر مع مرور الزمن**'],
    ]}
  />
);
