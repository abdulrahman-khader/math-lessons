import { Crate, num, SBag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): مع خالد ٣ أكياس في كل منها ١٧ كرة؛ سالم: ٣ × ٧ = ٢١ آحادًا، أكثر من عشرة! وخالد: نعيد التجميع كما في الجمع.
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ كُرَةً مَعَ خَالِدٍ؟"
      boardAt={22}
      salem={[
        [8, 'think'],
        [22, 'think'],
      ]}
      khalid={[[15, 'idea']]}
      bubbles={[
        [8, 15, 'boy', '٢١ آحَادًا! أَكْثَرُ مِنْ عَشَرَةٍ!'],
        [15, 22, 'boy2', 'نُعِيدُ التَّجْمِيعَ كَمَا فِي الْجَمْعِ!'],
      ]}
    >
      {[0, 1, 2].map((i) => (
        <g key={i} opacity={tw(t, 1 + i * 0.5, 2 + i * 0.5)}>
          <SBag x={960 - i * 230} y={322} color="#D4537E" kind="ball" label={num(10)} s={0.8} />
          <Crate x={870 - i * 230} y={392} n={7} kind="ball" color="#D4537E" label={num(7)} s={0.75} />
        </g>
      ))}
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={28}
    scene={scene}
    lines={[
      [0, 'n', 'مَعَ خَالِدٍ **٣** أَكْيَاسٍ، فِي كُلِّ كِيسٍ **١٧** كُرَةً'],
      [8, 'boy', 'سَالِمٌ: ٣ × ٧ = ٢١ آحَادًا! أَكْثَرُ مِنْ عَشَرَةٍ'],
      [15, 'boy2', 'خَالِدٌ: نُعِيدُ التَّجْمِيعَ كَمَا فِي الْجَمْعِ!'],
      [22, 'n', 'كَمْ كُرَةً مَعَ خَالِدٍ؟'],
    ]}
  />
);
