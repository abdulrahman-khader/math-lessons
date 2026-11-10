import { Crate, num, SBag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): مع سالم ٣٨ كرة ومع خالد ٢٧؛ الكرات السائبة ١٥، أكثر من عشرة، وخالد: نملأ كيسًا جديدًا!
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

const ORANGE = '#E8793A';
const GREEN = '#2E9E6A';

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ كُرَةً مَعَهُمَا؟"
      boardAt={25}
      salem={[
        [12, 'think'],
        [25, 'think'],
      ]}
      khalid={[[18, 'idea']]}
      bubbles={[
        [12, 18, 'boy', 'عِنْدَنَا ١٥ كُرَةً سَائِبَةً!'],
        [18, 25, 'boy2', 'نَمْلَأُ كِيسًا جَدِيدًا!'],
      ]}
    >
      {[0, 1, 2].map((i) => (
        <SBag key={i} x={1045 - i * 100} y={322} color={ORANGE} kind="ball" label={num(10)} s={0.8} op={tw(t, 5 + i * 0.4, 6 + i * 0.4)} />
      ))}
      <Crate x={745} y={392} n={8} kind="ball" color={ORANGE} label={num(8)} s={0.8} op={tw(t, 6.5, 7.5)} />
      {[0, 1].map((i) => (
        <SBag key={i} x={360 + i * 100} y={322} color={GREEN} kind="ball" label={num(10)} s={0.8} op={tw(t, 7 + i * 0.4, 8 + i * 0.4)} />
      ))}
      <Crate x={575} y={392} n={7} kind="ball" color={GREEN} label={num(7)} s={0.8} op={tw(t, 8.5, 9.5)} />
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={31}
    scene={scene}
    lines={[
      [0, 'n', 'سَالِمٌ وَخَالِدٌ يَجْمَعَانِ كُرَاتِ الْمَلْعَبِ'],
      [5, 'n', 'مَعَ سَالِمٍ **٣٨** كُرَةً، وَمَعَ خَالِدٍ **٢٧** كُرَةً'],
      [12, 'boy', 'سَالِمٌ: عِنْدَنَا ١٥ كُرَةً سَائِبَةً!'],
      [18, 'boy2', 'خَالِدٌ: ١٥ أَكْثَرُ مِنْ عَشَرَةٍ… نَمْلَأُ كِيسًا جَدِيدًا!'],
      [25, 'n', 'كَمْ كُرَةً مَعَهُمَا؟'],
    ]}
  />
);
