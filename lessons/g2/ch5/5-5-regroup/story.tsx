import { Crate, num, SBag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): مع سالم علبة فيها ١٠ أقلام و٨ أقلام سائبة، وخالد يعطيه ٥؛ صارت السائبة ١٣، وخالد: نربط كل عشرة معًا!
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

const ORANGE = '#E8A33A';

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ قَلَمًا مَعَ سَالِمٍ؟"
      boardAt={25}
      salem={[
        [13, 'sad'],
        [25, 'think'],
      ]}
      khalid={[[19, 'idea']]}
      bubbles={[
        [13, 19, 'boy', 'الْأَقْلَامُ السَّائِبَةُ كَثِيرَةٌ!'],
        [19, 25, 'boy2', 'نَرْبِطُ كُلَّ عَشَرَةٍ مَعًا!'],
      ]}
    >
      <SBag x={980} y={322} color={ORANGE} kind="pencil" label={num(10)} op={tw(t, 1, 2)} />
      <Crate x={800} y={392} n={t >= 9 ? 13 : 8} kind="pencil" color={ORANGE} label={num(t >= 9 ? 13 : 8)} op={tw(t, 2, 3)} />
      <Crate x={420} y={392} n={5} kind="pencil" color={ORANGE} label={num(5)} op={Math.min(tw(t, 8, 8.6), 1 - tw(t, 8.8, 9.2))} />
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={31}
    scene={scene}
    lines={[
      [0, 'n', 'مَعَ سَالِمٍ عُلْبَةٌ فِيهَا **١٠** أَقْلَامٍ، وَ**٨** أَقْلَامٍ سَائِبَةٍ'],
      [8, 'n', 'أَعْطَاهُ خَالِدٌ **٥** أَقْلَامٍ'],
      [13, 'boy', 'سَالِمٌ: الْأَقْلَامُ السَّائِبَةُ كَثِيرَةٌ!'],
      [19, 'boy2', 'خَالِدٌ: نَرْبِطُ كُلَّ عَشَرَةٍ مَعًا!'],
      [25, 'n', 'كَمْ قَلَمًا مَعَ سَالِمٍ؟ **وَكَمْ عُلْبَةً نَمْلَأُ؟**'],
    ]}
  />
);
