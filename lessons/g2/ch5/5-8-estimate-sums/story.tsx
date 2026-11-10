import { Item, num, STag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): مع سالم ١٠٠ ريال، ويريد كرة بـ٣٩ وكتابًا بـ٥٢؛ سالم يريد ورقة ليجمع، وخالد: لا نحتاج العدد بالضبط.
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="هَلْ تَكْفِي ١٠٠ رِيَالٍ؟"
      boardAt={25}
      salem={[
        [13, 'think'],
        [25, 'think'],
      ]}
      khalid={[[19, 'idea']]}
      bubbles={[
        [13, 19, 'boy', 'أَحْتَاجُ وَرَقَةً لِأَجْمَعَ!'],
        [19, 25, 'boy2', 'لَا نَحْتَاجُ الْعَدَدَ بِالضَّبْطِ!'],
      ]}
    >
      <g opacity={tw(t, 6, 7)}>
        <Item kind="ball" cx={860} cy={330} r={46} color="#E8793A" />
        <STag x={860} y={250} w={140} h={60} size={34} color="#C62A1C">
          {num(39)} رِيَالًا
        </STag>
      </g>
      <g opacity={tw(t, 7.5, 8.5)}>
        <Item kind="book" cx={560} cy={325} r={34} color="#2E86C1" />
        <STag x={560} y={250} w={140} h={60} size={34} color="#C62A1C">
          {num(52)} رِيَالًا
        </STag>
      </g>
      <g opacity={tw(t, 1, 2)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Item key={i} kind="coin" cx={1040 - i * 14} cy={372 - i * 4} r={20} color="#F2C94C" />
        ))}
        <STag x={1010} y={300} w={120} h={56} size={32} color="#0E8A4F">
          {num(100)}
        </STag>
      </g>
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={31}
    scene={scene}
    lines={[
      [0, 'n', 'مَعَ سَالِمٍ **١٠٠** رِيَالٍ فِي السُّوقِ'],
      [6, 'n', 'يُرِيدُ كُرَةً بِـ**٣٩** رِيَالًا، وَكِتَابًا بِـ**٥٢** رِيَالًا'],
      [13, 'boy', 'سَالِمٌ: أَحْتَاجُ وَرَقَةً وَقَلَمًا لِأَجْمَعَ!'],
      [19, 'boy2', 'خَالِدٌ: لَا نَحْتَاجُ الْعَدَدَ بِالضَّبْطِ!'],
      [25, 'n', 'هَلْ تَكْفِي **١٠٠** رِيَالٍ؟ **كَيْفَ نَعْرِفُ بِسُرْعَةٍ؟**'],
    ]}
  />
);
