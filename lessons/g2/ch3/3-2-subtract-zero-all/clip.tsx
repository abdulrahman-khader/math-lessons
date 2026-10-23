import { Clip, ClipTitle, SvgEq, tw, type EqPart } from '@engine';

/* مقطع فكرة الدرس: ٦ ضفادع على أوراق اللوتس (مثال غير مثال الكتاب): ٦ − ٦ = ٠، ثم ٦ − ٠ = ٦ */

const N = 6;
const padX = (i: number) => 700 + ((N - 1) / 2 - i) * 172;
const PAD_Y = 360;
const JUMP = (i: number) => 9 + i * 0.7;

function Frog({ x, y, op = 1 }: { x: number; y: number; op?: number }) {
  if (op <= 0.01) return null;
  return (
    <g transform={`translate(${x},${y})`} opacity={op}>
      <ellipse cx={0} cy={0} rx={42} ry={30} fill="#58b84a" stroke="var(--ink)" strokeWidth={3} />
      <circle cx={-16} cy={-28} r={13} fill="#58b84a" stroke="var(--ink)" strokeWidth={3} />
      <circle cx={16} cy={-28} r={13} fill="#58b84a" stroke="var(--ink)" strokeWidth={3} />
      <circle cx={-16} cy={-29} r={6} fill="#fff" />
      <circle cx={16} cy={-29} r={6} fill="#fff" />
      <circle cx={-15} cy={-29} r={3} fill="var(--ink)" />
      <circle cx={17} cy={-29} r={3} fill="var(--ink)" />
      <path d="M-14,4 Q0,14 14,4" stroke="var(--ink)" strokeWidth={3} fill="none" />
    </g>
  );
}

function scene(t: number) {
  const pond = tw(t, 4.2, 5);
  const back = tw(t, 21.5, 23); // عودة الضفادع للمثال الثاني
  const second = t >= 21.5;
  const eq1: EqPart[] = [N, '−', { v: N, op: tw(t, 9, 9.5) }, '=', { v: t > 14.5 ? 0 : '؟', box: true, op: tw(t, 9, 9.5) }];
  const eq2: EqPart[] = [N, '−', { v: 0, op: tw(t, 25, 25.5) }, '=', { v: t > 29 ? N : '؟', box: true, op: tw(t, 25, 25.5) }];
  return (
    <>
      <ClipTitle t={t} title="طَرْحُ الصِّفْرِ وَطَرْحُ الْكُلِّ" q="ماذا يبقى إذا قفزت الضفادع كلها؟" />

      <g opacity={pond}>
        <ellipse cx={700} cy={385} rx={600} ry={110} fill="#bfe3f2" />
        {Array.from({ length: N }, (_, i) => (
          <ellipse key={i} cx={padX(i)} cy={PAD_Y + 6} rx={70} ry={28} fill="#2f9a4a" stroke="#1e6b33" strokeWidth={3} />
        ))}
        <g opacity={second ? 0 : 1}>
          <SvgEq x={700} y={130} size={76} parts={eq1} />
        </g>
        <g opacity={tw(t, 22, 22.6)}>
          <SvgEq x={700} y={130} size={76} parts={eq2} />
        </g>
      </g>

      {Array.from({ length: N }, (_, i) => {
        const x0 = padX(i), y0 = PAD_Y - 22;
        if (!second) {
          // المثال الأول: تقفز كلها إلى الماء
          const j = tw(t, JUMP(i), JUMP(i) + 0.9);
          const x = x0 + 110 * j;
          const y = y0 - Math.sin(Math.PI * Math.min(j, 0.85) / 0.85) * 120 + (j > 0.85 ? (j - 0.85) * 400 : 0);
          const ripple = tw(t, JUMP(i) + 0.8, JUMP(i) + 1.6);
          return (
            <g key={i}>
              <Frog x={x} y={y} op={pond * (1 - tw(t, JUMP(i) + 0.75, JUMP(i) + 0.9))} />
              {ripple > 0 && ripple < 1 && <ellipse cx={x0 + 110} cy={y0 + 60} rx={20 + 50 * ripple} ry={8 + 18 * ripple} fill="none" stroke="#fff" strokeWidth={4} opacity={1 - ripple} />}
            </g>
          );
        }
        // المثال الثاني: تعود ولا يقفز أي ضفدع (تهتز في مكانها فقط)
        const wiggle = t > 25 && t < 28.5 ? Math.abs(Math.sin((t - 25) * 6 + i)) * 8 : 0;
        return <Frog key={i} x={x0} y={y0 - wiggle - (1 - back) * 60} op={back} />;
      })}
    </>
  );
}

export const IntroClip = () => (
  <Clip
    duration={38}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [4.5, 'على أوراق اللوتس **٦** ضفادع'],
      [9, 'قفزت الضفادع **كلها** إلى الماء'],
      [14.5, 'لم يبقَ أيّ ضفدع: ٦ − ٦ = **٠**'],
      [18, 'عندما أطرح العدد من **نفسه** يكون الناتج **صفرًا**'],
      [21.5, 'عادت الضفادع **الستة**'],
      [25, 'هذه المرة لم يقفز أيّ ضفدع: نطرح **صفرًا**'],
      [29, 'بقيت الضفادع كلها: ٦ − ٠ = **٦**'],
      [33, 'عندما أطرح **الصفر** يبقى العدد **نفسه**'],
    ]}
  />
);
