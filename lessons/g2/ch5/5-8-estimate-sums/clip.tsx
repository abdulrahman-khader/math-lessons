import { Clip, ClipTitle, SvgEq, fade, lerp, num, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٤٢ + ٢٧ تقريبًا ٧٠ (مثال غير أمثلة الكتاب) */

const X = (v: number, a: number, b: number) => lerp(160, 1240, (v - a) / (b - a));

function Line({ a, b, v, to, y, k, op }: { a: number; b: number; v: number; to: number; y: number; k: number; op: number }) {
  if (op <= 0.01) return null;
  return (
    <g opacity={op}>
      <line x1={100} x2={1300} y1={y} y2={y} stroke="var(--ink)" strokeWidth={4} />
      {Array.from({ length: b - a + 1 }, (_, i) => (
        <g key={i}>
          <line x1={X(a + i, a, b)} x2={X(a + i, a, b)} y1={y - 12} y2={y + 12} stroke="var(--ink)" strokeWidth={3} />
          <text x={X(a + i, a, b)} y={y + 46} fontSize={30} textAnchor="middle" fill={a + i === to ? 'var(--good)' : 'var(--ink)'} style={{ fontWeight: a + i === to ? 800 : 500 }}>{num(a + i)}</text>
        </g>
      ))}
      <circle cx={lerp(X(v, a, b), X(to, a, b), k)} cy={y} r={15} fill="var(--bad)" />
    </g>
  );
}

function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="تَقْدِيرُ نَاتِجِ الْجَمْعِ" q="٤٢ + ٢٧" />
      <g opacity={fade(t, 4.5, 99)}>
        <Line a={40} b={50} v={42} to={40} y={90} k={tw(t, 10, 12)} op={tw(t, 6, 6.5)} />
        <Line a={20} b={30} v={27} to={30} y={240} k={tw(t, 18, 20)} op={tw(t, 14, 14.5)} />
        <g opacity={tw(t, 24, 24.5)}><SvgEq x={700} y={420} size={62} parts={[40, '+', 30, '=', { v: 70, color: 'var(--good)' }]} /></g>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={38}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [6, '**٤٢** أقرب إلى ٤٠'],
      [14, '**٢٧** أقرب إلى ٣٠'],
      [24, 'نجمع العشرات: ٤٠ + ٣٠ = **٧٠**'],
      [31, '٤٢ + ٢٧ يساوي **٧٠** تقريبًا'],
    ]}
  />
);
