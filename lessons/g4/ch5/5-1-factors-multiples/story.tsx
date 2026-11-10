import { Item, num, STag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): المعلم يرتب ٢٨ كرسيًّا في صفوف متساوية؛ سالم يجرب ٣ صفوف فيبقى كرسي، وخالد: نجرب عددًا آخر من الصفوف.
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="بِكَمْ طَرِيقَةٍ نُرَتِّبُهَا؟"
      boardAt={24}
      table={false}
      salem={[
        [13, 'sad'],
        [24, 'think'],
      ]}
      khalid={[[18, 'idea']]}
      bubbles={[
        [8, 13, 'boy', 'نَجْعَلُهَا ٣ صُفُوفٍ!'],
        [13, 18, 'boy', 'بَقِيَ كُرْسِيٌّ وَاحِدٌ!'],
        [18, 24, 'boy2', 'نُجَرِّبُ عَدَدًا آخَرَ!'],
      ]}
    >
      {/* ٢٨ كرسيًّا: ٣ صفوف من ٩ ويبقى واحد (أحمر) */}
      <g opacity={tw(t, 8, 9)}>
        {Array.from({ length: 27 }, (_, i) => (
          <Item key={i} kind="cube" cx={940 - (i % 9) * 60} cy={250 + Math.floor(i / 9) * 56} r={20} color="#C99263" />
        ))}
        <Item kind="cube" cx={400} cy={250} r={20} color="#C62A1C" lit={t >= 13} />
      </g>
      <STag x={700} y={430} w={150} h={66} size={40} op={Math.min(tw(t, 1, 2), 1 - tw(t, 7.5, 8))} color="#1F6FD1">
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
      [0, 'n', 'يُرِيدُ الْمُعَلِّمُ تَرْتِيبَ **٢٨** كُرْسِيًّا فِي صُفُوفٍ مُتَسَاوِيَةٍ'],
      [8, 'boy', 'سَالِمٌ: نَجْعَلُهَا ٣ صُفُوفٍ!'],
      [13, 'boy', 'سَالِمٌ: بَقِيَ كُرْسِيٌّ وَاحِدٌ!'],
      [18, 'boy2', 'خَالِدٌ: نُجَرِّبُ عَدَدًا آخَرَ مِنَ الصُّفُوفِ!'],
      [24, 'n', 'بِكَمْ طَرِيقَةٍ نُرَتِّبُ الْكَرَاسِيَّ؟'],
    ]}
  />
);
