import { BoardRow, Crate, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): في الفصل ٢٨ طالبًا يحتاج كل منهم ٣ دفاتر؛ سالم يقول ٨٤٠، وخالد: هذا كثير جدًّا، هل هو معقول؟
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board={<BoardRow parts={['٨٤٠', '؟']} size={70} color="#FF9A9A" />}
      boardAt={8}
      salem={[
        [8, 'happy'],
        [13, 'think'],
      ]}
      khalid={[
        [13, 'think'],
        [18, 'idea'],
      ]}
      bubbles={[
        [8, 13, 'boy', 'نَحْتَاجُ ٨٤٠ دَفْتَرًا!'],
        [13, 18, 'boy2', '٨٤٠؟ هَذَا كَثِيرٌ جِدًّا!'],
        [18, 23, 'boy2', 'هَلْ هَذَا مَعْقُولٌ؟'],
      ]}
    >
      {[0, 1, 2].map((i) => (
        <Crate key={i} x={900 - i * 200} y={392} n={10} kind="book" color={['#2E86C1', '#27AE60', '#8E44AD'][i]} s={0.95} op={tw(t, 1 + i * 0.5, 2 + i * 0.5)} />
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
      [0, 'n', 'فِي الْفَصْلِ **٢٨** طَالِبًا، يَحْتَاجُ كُلُّ طَالِبٍ **٣** دَفَاتِرَ'],
      [8, 'boy', 'سَالِمٌ: نَحْتَاجُ ٨٤٠ دَفْتَرًا!'],
      [13, 'boy2', 'خَالِدٌ: ٨٤٠؟ هَذَا كَثِيرٌ جِدًّا!'],
      [18, 'boy2', 'خَالِدٌ: لِنُفَكِّرْ: هَلْ هَذَا مَعْقُولٌ؟'],
      [23, 'n', 'هَلْ إِجَابَةُ سَالِمٍ مَعْقُولَةٌ؟ **كَيْفَ نَعْرِفُ؟**'],
    ]}
  />
);
