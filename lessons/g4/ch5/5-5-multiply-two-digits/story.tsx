import { Crate, num, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): مع سالم علبتان في كل منهما ٤٣ قلمًا؛ سالم يعدّ قلمًا قلمًا، وخالد: نجزئ ٤٣ إلى ٤٠ و٣!
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ قَلَمًا فِي الْعُلْبَتَيْنِ؟"
      boardAt={20}
      salem={[
        [8, 'sad'],
        [20, 'think'],
      ]}
      khalid={[[14, 'idea']]}
      bubbles={[
        [8, 14, 'boy', 'وَاحِدٌ، اثْنَانِ، ثَلَاثَةٌ…'],
        [14, 20, 'boy2', 'نُجَزِّئُ ٤٣ إِلَى ٤٠ وَ٣!'],
      ]}
    >
      {[0, 1].map((i) => (
        <Crate key={i} x={880 - i * 360} y={392} n={15} kind="pencil" color={['#E8A33A', '#2E86C1'][i]} label={num(43)} s={1.1} op={tw(t, 1 + i * 0.6, 2 + i * 0.6)} />
      ))}
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={26}
    scene={scene}
    lines={[
      [0, 'n', 'مَعَ سَالِمٍ عُلْبَتَانِ، فِي كُلِّ عُلْبَةٍ **٤٣** قَلَمًا'],
      [8, 'boy', 'سَالِمٌ: أَعُدُّ: وَاحِدٌ، اثْنَانِ، ثَلَاثَةٌ…'],
      [14, 'boy2', 'خَالِدٌ: نُجَزِّئُ ٤٣ إِلَى ٤٠ وَ٣!'],
      [20, 'n', 'كَمْ قَلَمًا فِي الْعُلْبَتَيْنِ؟'],
    ]}
  />
);
