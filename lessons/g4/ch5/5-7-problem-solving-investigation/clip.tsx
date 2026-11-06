import { Clip, ClipCard, ClipTitle, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٣ صناديق في كل منها ١٧ كرة (مثال غير أمثلة الكتاب): الخطوات الأربع */

const STEPS: [string, string, number][] = [
  ['افْهَمْ', '٣ صناديقَ، في كلٍّ منها ١٧ كرةً', 8],
  ['خَطِّطْ', 'نكتبُ جملةً عدديَّةً', 14],
];

function scene(t: number) {
  const body = fade(t, 4.5, 99);
  return (
    <>
      <ClipTitle t={t} title="أختارُ الخطَّةَ المناسبةَ" q="كمْ كرةً في ٣ صناديقَ، في كلٍّ منها ١٧ كرةً؟" size={70} />
      <g opacity={body}>
        {STEPS.map(([cap, text, at], i) => (
          <ClipCard key={cap} x={120} y={50 + i * 110} w={1160} h={92} op={tw(t, at, at + 0.6)} color="var(--rule)">
            <text x={1250} y={108 + i * 110} fontSize={38} textAnchor="start" direction="rtl" fill="var(--rule)" style={{ fontWeight: 800 }}>{cap}</text>
            <text x={1060} y={108 + i * 110} fontSize={36} textAnchor="start" direction="rtl" style={{ fontWeight: 700 }}>{text}</text>
          </ClipCard>
        ))}
        <ClipCard x={120} y={270} w={1160} h={92} op={tw(t, 20, 20.6)} color="var(--rule)">
          <text x={1250} y={328} fontSize={38} textAnchor="start" direction="rtl" fill="var(--rule)" style={{ fontWeight: 800 }}>حُلَّ</text>
          <SvgEq x={700} y={332} size={48} parts={[3, '×', 17, '=', { v: 51, color: 'var(--good)' }]} />
        </ClipCard>
        <ClipCard x={120} y={380} w={1160} h={92} op={tw(t, 27, 27.6)} color="var(--good)">
          <text x={1250} y={438} fontSize={38} textAnchor="start" direction="rtl" fill="var(--good)" style={{ fontWeight: 800 }}>تَحَقَّقْ</text>
          <SvgEq x={700} y={442} size={48} parts={[17, '+', 17, '+', 17, '=', { v: 51, color: 'var(--good)' }]} />
        </ClipCard>
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
      [8, '**نفهم**: ٣ صناديق، في كل منها ١٧ كرة'],
      [14, '**نخطط**: نكتب جملة عددية'],
      [20, '**نحل**: ٣ × ١٧ = ٥١'],
      [27, '**نتحقق** بالجمع المتكرر: ٥١'],
    ]}
  />
);
