import { Clip, ClipCard, ClipTitle, Cube, SvgEq, fade, tw } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٣ × ١٨ بالمكعبات (مثال غير أمثلة الكتاب): ٢٤ آحادًا تصبح عشرتين و٤ آحاد */

const ORANGE = '#e8701a';

function Rod({ x, op = 1 }: { x: number; op?: number }) {
  if (op <= 0.01) return null;
  return (
    <g opacity={op}>
      {Array.from({ length: 10 }, (_, i) => <rect key={i} x={x} y={100 + i * 26} width={26} height={26} fill={ORANGE} stroke="var(--ink)" strokeWidth={1.5} />)}
    </g>
  );
}

function scene(t: number) {
  const body = fade(t, 4.5, 99);
  const merged = tw(t, 19, 20);
  return (
    <>
      <ClipTitle t={t} title="الضربُ بالمكعَّباتِ" q="كمْ مكعَّبًا في ٣ مجموعاتٍ، في كلٍّ منها ١٨ مكعَّبًا؟" size={70} />
      <g opacity={body}>
        <SvgEq x={700} y={60} size={54} parts={[3, '×', 18]} />
        {/* العشرات الثلاث */}
        {[0, 1, 2].map((i) => <Rod key={i} x={1120 - i * 46} op={tw(t, 8 + i * 0.5, 8.5 + i * 0.5)} />)}
        {/* العشرتان الجديدتان من الآحاد */}
        {[3, 4].map((i) => <Rod key={i} x={1120 - i * 46} op={merged} />)}
        {/* الآحاد: ٢٤ مكعبًا؛ ٢٠ منها تتحول إلى عشرتين */}
        {Array.from({ length: 24 }, (_, i) => (
          <Cube
            key={i} s={34} color={ORANGE}
            x={740 - (i % 6) * 46} y={130 + Math.floor(i / 6) * 50}
            op={tw(t, 12, 12.6) * (i < 20 ? 1 - merged : 1)}
          />
        ))}
        <g opacity={tw(t, 27, 27.6)}>
          <SvgEq x={700} y={405} size={50} parts={[50, '+', 4, '=', { v: 54, color: 'var(--good)' }]} />
        </g>
        <ClipCard x={330} y={442} w={740} h={68} op={fade(t, 33, 99)} color="var(--good)">
          <text x={700} y={488} fontSize={34} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>كلُّ ١٠ آحادٍ تصبحُ عشرةً واحدةً</text>
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
      [8, 'في المجموعات ٣ عشرات'],
      [12, 'و٣ × ٨ = **٢٤** آحادًا'],
      [19, 'نعيد التجميع: ٢٤ = **عشرتان و٤ آحاد**'],
      [27, 'صار لدينا ٥ عشرات و٤ آحاد: **٥٤**'],
      [33, 'كل ١٠ آحاد تصبح **عشرة واحدة**'],
    ]}
  />
);
