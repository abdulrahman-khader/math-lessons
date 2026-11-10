import { Crate, num, STag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): ثلاث سلال فيها ١٣ و٢٤ و١٧ تفاحة؛ سالم يقول: ثلاثة أعداد صعبة، وخالد: نبحث عن عددين يصنعان عشرة.
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

const COLORS = ['#D9443A', '#5BA33B', '#E8A33A'];

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ تُفَّاحَةً فِي السِّلَالِ؟"
      boardAt={25}
      salem={[
        [12, 'sad'],
        [25, 'think'],
      ]}
      khalid={[[18, 'idea']]}
      bubbles={[
        [12, 18, 'boy', 'ثَلَاثَةُ أَعْدَادٍ! هَذَا صَعْبٌ!'],
        [18, 25, 'boy2', 'نَبْحَثُ عَنْ عَشَرَةٍ!'],
      ]}
    >
      {[
        [1000, 13],
        [700, 24],
        [400, 17],
      ].map(([x, v], i) => (
        <g key={i} opacity={tw(t, 5 + i * 1.2, 6 + i * 1.2)}>
          <Crate x={x} y={392} n={5} kind="apple" color={COLORS[i]} />
          <STag x={x} y={290} w={110} h={70} size={44} color={COLORS[i]}>
            {num(v)}
          </STag>
        </g>
      ))}
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={31}
    scene={scene}
    lines={[
      [0, 'n', 'فِي الْحَدِيقَةِ ثَلَاثُ سِلَالٍ'],
      [5, 'n', 'فِيهَا **١٣** وَ**٢٤** وَ**١٧** تُفَّاحَةً'],
      [12, 'boy', 'سَالِمٌ: ثَلَاثَةُ أَعْدَادٍ! هَذَا صَعْبٌ!'],
      [18, 'boy2', 'خَالِدٌ: نَبْحَثُ عَنْ عَدَدَيْنِ يَصْنَعَانِ عَشَرَةً!'],
      [25, 'n', 'كَمْ تُفَّاحَةً فِي السِّلَالِ الثَّلَاثِ؟'],
    ]}
  />
);
