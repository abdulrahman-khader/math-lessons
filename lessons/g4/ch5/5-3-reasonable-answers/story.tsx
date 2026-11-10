import { BoardRow, num, STag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): مقصف المدرسة يبيع ٤٨ عصيرًا كل يوم؛ سالم يقول: في ٥ أيام ٢٤٠٠ عصير، وخالد: هذا كثير جدًّا، هل هو معقول؟
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

const JUICE = ['#F2994A', '#EB5757', '#6FCF97'];

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board={<BoardRow parts={['٢٤٠٠', '؟']} size={70} color="#FF9A9A" />}
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
        [8, 13, 'boy', 'فِي ٥ أَيَّامٍ ٢٤٠٠ عَصِيرٍ!'],
        [13, 18, 'boy2', '٢٤٠٠؟ هَذَا كَثِيرٌ جِدًّا!'],
        [18, 23, 'boy2', 'هَلْ هَذَا مَعْقُولٌ؟'],
      ]}
    >
      {/* ثلاجة المقصف: ٥ صفوف من العصير */}
      <g opacity={tw(t, 1, 2)}>
        <rect x={520} y={250} width={360} height={150} rx={12} fill="#EAF2FB" stroke="#5b6b7f" strokeWidth={4} />
        {Array.from({ length: 4 }, (_, r) => Array.from({ length: 10 }, (_, c) => <rect key={`${r}-${c}`} x={540 + c * 33} y={262 + r * 34} width={22} height={28} rx={4} fill={JUICE[(r + c) % 3]} />))}
        <STag x={700} y={222} w={200} h={52} size={28} color="#1F6FD1">
          {num(48)} عَصِيرًا كُلَّ يَوْمٍ
        </STag>
      </g>
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={28}
    scene={scene}
    lines={[
      [0, 'n', 'مَقْصَفُ الْمَدْرَسَةِ يَبِيعُ **٤٨** عَصِيرًا كُلَّ يَوْمٍ'],
      [8, 'boy', 'سَالِمٌ: فِي ٥ أَيَّامٍ يَبِيعُ ٢٤٠٠ عَصِيرٍ!'],
      [13, 'boy2', 'خَالِدٌ: ٢٤٠٠؟ هَذَا كَثِيرٌ جِدًّا!'],
      [18, 'boy2', 'خَالِدٌ: لِنُفَكِّرْ: هَلْ هَذَا مَعْقُولٌ؟'],
      [23, 'n', 'هَلْ إِجَابَةُ سَالِمٍ مَعْقُولَةٌ؟ **كَيْفَ نَعْرِفُ؟**'],
    ]}
  />
);
