import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: عددان مجموعهما ١٠ وفرقهما ٢ (مثال غير مثال الكتاب) */

const Row = ({ y, a, b, ok }: { y: number; a: number; b: number; ok: boolean }) => (
  <g>
    <SvgEq x={930} y={y} size={56} parts={[a, '+', b, '=', a + b]} />
    <SvgEq x={460} y={y} size={56} parts={[a, '−', b, '=', { v: a - b, color: ok ? 'var(--good)' : 'var(--bad)' }]} />
    <text x={160} y={y} fontSize={60} textAnchor="middle" fill={ok ? 'var(--good)' : 'var(--bad)'} style={{ fontWeight: 800 }}>{ok ? '✓' : '✗'}</text>
  </g>
);

function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="أُخَمِّنُ وَأَتَحَقَّقُ" q="عددان مجموعهما ١٠، والفرق بينهما ٢" size={70} />
      <g opacity={fade(t, 4.5, 99)}>
        <g opacity={tw(t, 7, 7.5)}><Row y={130} a={7} b={3} ok={false} /></g>
        <g opacity={tw(t, 17, 17.5)}><Row y={270} a={6} b={4} ok /></g>
        <ClipCard x={230} y={380} w={940} h={84} op={fade(t, 28, 99)} color="var(--good)">
          <text x={700} y={435} fontSize={36} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>العددان: ٦ و٤</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={36}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [7, 'نخمّن ٧ و٣: المجموع ١٠، لكن الفرق **٤**'],
      [17, 'نخمّن مرة أخرى ٦ و٤: المجموع ١٠، والفرق **٢**'],
      [28, 'العددان هما **٦** و**٤**'],
    ]}
  />
);
