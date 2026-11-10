import { BoardRow, Crate, num, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): مصنع يملأ ٦ صناديق في كل منها ٧٠٠ قلم؛ سالم: ٧٠٠ عدد كبير، وخالد: نحن نعرف ٦ × ٧!
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board={<BoardRow parts={['٦', '×', '٧٠٠', '=', '؟']} />}
      boardAt={22}
      salem={[
        [8, 'think'],
        [22, 'think'],
      ]}
      khalid={[[14, 'idea']]}
      bubbles={[
        [8, 14, 'boy', '٧٠٠ عَدَدٌ كَبِيرٌ!'],
        [14, 22, 'boy2', 'نَحْنُ نَعْرِفُ ٦ فِي ٧!'],
      ]}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <Crate key={i} x={1030 - i * 130} y={392} n={5} kind="pencil" color="#E8A33A" label={num(700)} s={0.95} op={tw(t, 1 + i * 0.4, 2 + i * 0.4)} />
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
      [0, 'n', 'مَصْنَعٌ يَمْلَأُ **٦** صَنَادِيقَ، فِي كُلِّ صُنْدُوقٍ **٧٠٠** قَلَمٍ'],
      [8, 'boy', 'سَالِمٌ: ٧٠٠ عَدَدٌ كَبِيرٌ! كَيْفَ نَضْرِبُ؟'],
      [14, 'boy2', 'خَالِدٌ: نَحْنُ نَعْرِفُ ٦ × ٧!'],
      [22, 'n', 'كَمْ قَلَمًا فِي الصَّنَادِيقِ؟'],
    ]}
  />
);
