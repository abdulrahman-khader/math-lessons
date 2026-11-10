import { Item, num, STag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): في يوم الرياضة ٢٨ طالبًا يتوزعون على فرق متساوية؛ سالم يجعلها ٣ فرق فيبقى طالب، وخالد: نجرب عددًا آخر من الفرق.
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

const SHIRTS = ['#1F6FD1', '#0E8A4F', '#E8A33A'];

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="بِكَمْ طَرِيقَةٍ نُوَزِّعُهُمْ؟"
      boardAt={24}
      table={false}
      salem={[
        [13, 'sad'],
        [24, 'think'],
      ]}
      khalid={[[18, 'idea']]}
      bubbles={[
        [8, 13, 'boy', 'نَجْعَلُهُمْ ٣ فِرَقٍ!'],
        [13, 18, 'boy', 'بَقِيَ طَالِبٌ بِلَا فَرِيقٍ!'],
        [18, 24, 'boy2', 'نُجَرِّبُ عَدَدًا آخَرَ!'],
      ]}
    >
      {/* ٢٨ طالبًا: ٣ فرق من ٩ ويبقى طالب بلا فريق (أحمر) */}
      <g opacity={tw(t, 8, 9)}>
        {Array.from({ length: 27 }, (_, i) => (
          <Item key={i} kind="ball" cx={1000 - Math.floor(i / 9) * 230 - (i % 3) * 52} cy={240 + Math.floor((i % 9) / 3) * 56} r={20} color={SHIRTS[Math.floor(i / 9)]} />
        ))}
        <Item kind="ball" cx={360} cy={296} r={20} color="#C62A1C" lit={t >= 13} />
      </g>
      <STag x={700} y={420} w={150} h={66} size={40} op={Math.min(tw(t, 1, 2), 1 - tw(t, 7.5, 8))} color="#1F6FD1">
        {num(28)}
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
      [0, 'n', 'فِي يَوْمِ الرِّيَاضَةِ **٢٨** طَالِبًا، يَتَوَزَّعُونَ عَلَى فِرَقٍ مُتَسَاوِيَةٍ'],
      [8, 'boy', 'سَالِمٌ: نَجْعَلُهُمْ ٣ فِرَقٍ!'],
      [13, 'boy', 'سَالِمٌ: بَقِيَ طَالِبٌ بِلَا فَرِيقٍ!'],
      [18, 'boy2', 'خَالِدٌ: نُجَرِّبُ عَدَدًا آخَرَ مِنَ الْفِرَقِ!'],
      [24, 'n', 'بِكَمْ طَرِيقَةٍ نُوَزِّعُ الطُّلَّابَ عَلَى فِرَقٍ مُتَسَاوِيَةٍ؟'],
    ]}
  />
);
