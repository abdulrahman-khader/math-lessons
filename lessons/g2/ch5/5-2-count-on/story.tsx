import { Crate, num, SBag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): سالم معه ٣٤ كرة (٣ أكياس و٤)، وخالد يعطيه ٢٣. سالم يعدّ من واحد فيتعب، وخالد: لا نبدأ من واحد!
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

const RED = '#D4537E';
const BLUE = '#378ADD';

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ كُرَةً مَعَ سَالِمٍ الْآنَ؟"
      boardAt={29}
      salem={[
        [21, 'sad'],
        [29, 'think'],
      ]}
      khalid={[[25, 'idea']]}
      bubbles={[
        [13, 21, 'boy', 'وَاحِدٌ، اثْنَانِ، ثَلَاثَةٌ…'],
        [21, 25, 'boy', 'هَذَا طَوِيلٌ جِدًّا!'],
        [25, 29, 'boy2', 'لَا نَبْدَأُ مِنْ وَاحِدٍ!'],
      ]}
    >
      {[0, 1, 2].map((i) => (
        <SBag key={i} x={1040 - i * 105} y={322} color={RED} kind="ball" label={num(10)} op={tw(t, 1 + i * 0.4, 2 + i * 0.4)} />
      ))}
      <Crate x={725} y={392} n={4} kind="ball" color={RED} label={num(4)} op={tw(t, 2.5, 3.5)} />
      {[0, 1].map((i) => (
        <SBag key={i} x={365 + i * 105} y={322} color={BLUE} kind="ball" label={num(10)} op={tw(t, 7 + i * 0.5, 8 + i * 0.5)} />
      ))}
      <Crate x={585} y={392} n={3} kind="ball" color={BLUE} label={num(3)} op={tw(t, 8.5, 9.5)} />
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={35}
    scene={scene}
    lines={[
      [0, 'n', 'مَعَ سَالِمٍ **٣٤** كُرَةً: ٣ أَكْيَاسٍ وَ٤ كُرَاتٍ'],
      [7, 'n', 'أَعْطَاهُ خَالِدٌ **٢٣** كُرَةً أُخْرَى'],
      [13, 'boy', 'سَالِمٌ: سَأَعُدُّ مِنْ وَاحِدٍ…'],
      [21, 'boy', 'سَالِمٌ: هَذَا طَوِيلٌ جِدًّا!'],
      [25, 'boy2', 'خَالِدٌ: لَا نَبْدَأُ مِنْ وَاحِدٍ!'],
      [29, 'n', 'كَمْ كُرَةً مَعَ سَالِمٍ الْآنَ؟ **مِنْ أَيْنَ نَبْدَأُ الْعَدَّ؟**'],
    ]}
  />
);
