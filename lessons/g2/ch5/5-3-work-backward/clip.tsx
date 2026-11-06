import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ملصقات مريم (مثال غير مثال الكتاب): ٨ + ٣ + ٦ = ١٧ */

const Box = ({ x, label, v, op, color }: { x: number; label: string; v: string; op: number; color: string }) =>
  op <= 0.01 ? null : (
    <g opacity={op}>
      <rect x={x} y={90} width={270} height={150} rx={18} fill="#fff" stroke={color} strokeWidth={5} />
      <text x={x + 135} y={140} fontSize={30} textAnchor="middle" direction="rtl" fill="var(--muted)">{label}</text>
      <text x={x + 135} y={210} fontSize={62} textAnchor="middle" direction="rtl" fill={color} style={{ fontWeight: 800 }}>{v}</text>
    </g>
  );

function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="أَحُلُّ عَكْسِيًّا" q="كم ملصقًا كان مع مريم؟" />
      <g opacity={fade(t, 4.5, 99)}>
        <Box x={1060} label="البداية" v={t > 30 ? '١٧' : '؟'} op={tw(t, 5, 5.5)} color="var(--bad)" />
        <Box x={740} label="أعطت" v="٦" op={tw(t, 7, 7.5)} color="var(--ink)" />
        <Box x={420} label="أعطت" v="٣" op={tw(t, 10, 10.5)} color="var(--ink)" />
        <Box x={100} label="بقي" v="٨" op={tw(t, 13, 13.5)} color="var(--good)" />
        <g opacity={tw(t, 20, 20.5)}><SvgEq x={700} y={340} size={64} parts={[8, '+', 3, '+', 6, '=', { v: t > 30 ? 17 : '؟', color: 'var(--good)' }]} /></g>
        <ClipCard x={230} y={410} w={940} h={84} op={fade(t, 35, 99)} color="var(--good)">
          <text x={700} y={465} fontSize={36} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نبدأ من النهاية ونرجع إلى البداية</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={42}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [5, 'أعطت مريم **٦** ملصقات ثم **٣**، فبقي معها **٨**'],
      [20, 'نبدأ بما بقي، ونعيد ما أعطته: **نجمع**'],
      [30, '٨ + ٣ + ٦ = **١٧** ملصقًا'],
      [35, 'نبدأ من النهاية ونرجع إلى **البداية**'],
    ]}
  />
);
