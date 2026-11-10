import { Crate, num, STag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): جمع سالم وخالد ٤٠ علبة، وخالد جمع ٦ أكثر؛ سالم يظن كلًّا منهما ٢٠، وخالد: لا، أنا أكثر!
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ جَمَعَ كُلٌّ مِنْهُمَا؟"
      boardAt={24}
      salem={[
        [13, 'think'],
        [24, 'think'],
      ]}
      khalid={[[19, 'idea']]}
      bubbles={[
        [13, 19, 'boy', 'هَلْ جَمَعَ كُلٌّ مِنَّا ٢٠؟'],
        [19, 24, 'boy2', 'لَا، أَنَا جَمَعْتُ أَكْثَرَ!'],
      ]}
    >
      <g opacity={tw(t, 1, 2)}>
        {Array.from({ length: 4 }, (_, i) => (
          <Crate key={i} x={460 + i * 160} y={392} n={10} kind="cube" color="#9AA5B1" s={0.85} />
        ))}
        <STag x={700} y={270} w={130} h={74} size={48} color="#1F6FD1">
          {num(40)}
        </STag>
      </g>
      <STag x={700} y={190} w={260} h={56} size={30} op={tw(t, 7, 8)} color="#C62A1C">
        خَالِدٌ: ٦ أَكْثَرُ
      </STag>
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={30}
    scene={scene}
    lines={[
      [0, 'n', 'جَمَعَ سَالِمٌ وَخَالِدٌ **٤٠** عُلْبَةً لِلتَّدْوِيرِ'],
      [7, 'n', 'جَمَعَ خَالِدٌ **٦** عُلَبٍ أَكْثَرَ مِنْ سَالِمٍ'],
      [13, 'boy', 'سَالِمٌ: هَلْ جَمَعَ كُلٌّ مِنَّا ٢٠؟'],
      [19, 'boy2', 'خَالِدٌ: لَا، أَنَا جَمَعْتُ أَكْثَرَ!'],
      [24, 'n', 'كَمْ عُلْبَةً جَمَعَ كُلٌّ مِنْهُمَا؟ **أَيُّ خُطَّةٍ نَخْتَارُ؟**'],
    ]}
  />
);
