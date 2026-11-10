import { Crate, num, SBag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): قطف سالم ٤٣ تفاحة وخالد ٣٥؛ سالم يخلطها كلها فتختلط عليه، وخالد: نرتبها، الأكياس معًا والحبات معًا.
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

const RED = '#D9443A';
const GREEN = '#5BA33B';
/** الصناديق تهتز وسالم يخلط التفاح */
const wob = (t: number, k: number) => (t >= 15 && t < 22 ? Math.sin(t * 14 + k) * 5 : 0);

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ تُفَّاحَةً مَعَهُمَا؟"
      boardAt={30}
      salem={[
        [20, 'sad'],
        [30, 'think'],
      ]}
      khalid={[[24, 'idea']]}
      bubbles={[
        [15, 20, 'boy', 'نَخْلِطُهَا كُلَّهَا وَنَعُدُّ!'],
        [20, 24, 'boy', 'اخْتَلَطَتْ عَلَيَّ!'],
        [24, 30, 'boy2', 'نُرَتِّبُهَا أَوَّلًا!'],
      ]}
    >
      {[0, 1, 2, 3].map((i) => (
        <SBag key={i} x={1045 - i * 100} y={322} color={RED} kind="apple" label={num(10)} s={0.8} op={tw(t, 5 + i * 0.4, 6 + i * 0.4)} />
      ))}
      <Crate x={650} y={392 + wob(t, 0)} n={3} kind="apple" color={RED} op={tw(t, 6.5, 7.5)} s={0.8} />
      {[0, 1, 2].map((i) => (
        <SBag key={i} x={360 + i * 100} y={322} color={GREEN} kind="apple" label={num(10)} s={0.8} op={tw(t, 10 + i * 0.4, 11 + i * 0.4)} />
      ))}
      <Crate x={555} y={392 + wob(t, 1)} n={5} kind="apple" color={GREEN} op={tw(t, 11.5, 12.5)} s={0.8} />
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={36}
    scene={scene}
    lines={[
      [0, 'n', 'سَالِمٌ وَخَالِدٌ يَقْطِفَانِ التُّفَّاحَ'],
      [5, 'n', 'قَطَفَ سَالِمٌ **٤٣** تُفَّاحَةً'],
      [10, 'n', 'وَقَطَفَ خَالِدٌ **٣٥** تُفَّاحَةً'],
      [15, 'boy', 'سَالِمٌ: نَخْلِطُهَا كُلَّهَا وَنَعُدُّ!'],
      [20, 'boy', 'سَالِمٌ: اخْتَلَطَتْ عَلَيَّ!'],
      [24, 'boy2', 'خَالِدٌ: نُرَتِّبُهَا: الْأَكْيَاسُ مَعًا، وَالْحَبَّاتُ مَعًا!'],
      [30, 'n', 'كَمْ تُفَّاحَةً مَعَهُمَا؟'],
    ]}
  />
);
