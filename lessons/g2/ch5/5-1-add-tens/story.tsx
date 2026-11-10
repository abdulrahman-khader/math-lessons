import { Bubble, Kid, SBag, Story, StoryBackdrop, Table, fade, num, tw, type StoryTalk } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس: سالم وخالد يُحضران حلوى للفصل، مع سالم ٣ أكياس ومع خالد ٤، في كل كيس ١٠.
 * سالم يعدّ حبةً حبةً فيضيع عند ٨، وخالد يقول: هناك طريقة أسرع! ويتوقف المقطع عند السؤال بلا جواب.
 * الأرقام غير أرقام الكتاب (٥٠ + ٣٠) وغير مقطع الفكرة (٢٠ + ٦٠). الأصابع بعدها تحل مسألة القصة.
 */

const PINK = '#D4537E';
const BLUE = '#378ADD';

function scene(t: number, s: StoryTalk) {
  const kin = tw(t, 0, 2);
  const counting = t >= 16 && t < 25;
  // يعدّ مع صوته: حبة كل ثانية تقريبًا حتى ٨، ثم ينسى
  const n = counting ? Math.min(8, Math.floor((t - 16) * 0.95) + 1) : t >= 25 && t < 29 ? 8 : 0;
  const lost = t >= 25 && t < 33;
  return (
    <>
      <StoryBackdrop
        boardOp={tw(t, 33, 34.2)}
        board={
          <text x={700} y={134} textAnchor="middle" fontSize={54} fontWeight={800} fill="#fff" direction="rtl">
            كَمْ حَبَّةً مَعَهُمَا؟
          </text>
        }
      />
      <Table x1={300} x2={1100} y={392} />
      {[0, 1, 2].map((i) => (
        <SBag key={i} x={1030 - i * 108} y={322} color={PINK} label={num(10)} op={tw(t, 6 + i * 0.7, 7 + i * 0.7)} lit={Math.max(0, Math.min(10, n - i * 10))} dim={counting || (t >= 25 && t < 29)} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <SBag key={i} x={370 + i * 108} y={322} color={BLUE} label={num(10)} op={tw(t, 12 + i * 0.6, 13 + i * 0.6)} />
      ))}
      <Kid x={1220 + (1 - kin) * 300} y={225} boy look={-1} mood={lost ? 'sad' : t >= 33 ? 'think' : 'happy'} talk={s.talking && s.who === 'boy'} now={s.now} name="سَالِمٌ" />
      <Kid x={180 - (1 - kin) * 300} y={225} boy alt look={1} mood={t >= 29 ? 'idea' : 'happy'} talk={s.talking && s.who === 'boy2'} now={s.now} name="خَالِدٌ" />
      {/* آخر ثلاثة أعداد عدّها، كل عدد وحده من اليمين (الأحدث أكبر)، فلا يتداخل في أي متصفح */}
      <Bubble x={960} y={22} w={380} tailX={1200} op={fade(t, 16, 25)} raw>
        {[2, 1, 0].map((back, k) =>
          n - back >= 1 ? (
            <text key={back} x={1270 - k * 110} y={74} fontSize={back ? 32 : 44} fontWeight={800} textAnchor="middle" fill={back ? '#8a8a96' : '#2f2a28'}>
              {num(n - back)}
            </text>
          ) : null,
        )}
      </Bubble>
      <Bubble x={960} y={22} w={380} tailX={1200} op={fade(t, 25, 29)}>
        أُوهْ! نَسِيتُ!
      </Bubble>
      <Bubble x={40} y={16} w={400} tailX={330} op={fade(t, 29, 33)}>
        هُنَاكَ طَرِيقَةٌ أَسْرَعُ!
      </Bubble>
    </>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={39}
    scene={scene}
    lines={[
      [0, 'n', 'سَالِمٌ وَخَالِدٌ يُحْضِرَانِ حَلْوَى لِلْفَصْلِ'],
      [6, 'n', 'مَعَ سَالِمٍ **٣ أَكْيَاسٍ**، فِي كُلِّ كِيسٍ **١٠** حَبَّاتٍ'],
      [12, 'n', 'وَمَعَ خَالِدٍ **٤ أَكْيَاسٍ**'],
      [16, 'boy', 'سَالِمٌ يَعُدُّ حَبَّةً حَبَّةً…'],
      [25, 'boy', 'سَالِمٌ: أُوهْ! نَسِيتُ!'],
      [29, 'boy2', 'خَالِدٌ: هُنَاكَ طَرِيقَةٌ أَسْرَعُ!'],
      [33, 'n', 'كَمْ حَبَّةً مَعَهُمَا؟ **كَيْفَ نَعْرِفُ بِسُرْعَةٍ؟**'],
    ]}
  />
);
