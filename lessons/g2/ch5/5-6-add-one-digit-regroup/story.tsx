import { BoardRow, Crate, num, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): في المكتبة ٣٦ كتابًا وأحضر خالد ٧؛ سالم يكتب ٣١٣ (الخطأ المشهور: يضع ١٣ بجانب ٣)، وخالد: هذا أكثر من ثلاثمئة!
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

const BOOKS = ['#C0392B', '#2E86C1', '#27AE60', '#8E44AD', '#E67E22'];

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board={
        <g>
          <BoardRow parts={['٣٦', '+', '٧', '=', '٣١٣']} op={1 - tw(t, 25.5, 26)} color={t >= 19 ? '#FF9A9A' : '#fff'} />
          <text x={700} y={134} textAnchor="middle" fontSize={50} fontWeight={800} fill="#fff" direction="rtl" opacity={tw(t, 26, 27)}>
            كَمْ كِتَابًا فِي الْمَكْتَبَةِ؟
          </text>
        </g>
      }
      boardAt={10}
      salem={[
        [19, 'sad'],
        [26, 'think'],
      ]}
      khalid={[
        [19, 'think'],
        [23, 'idea'],
      ]}
      bubbles={[
        [10, 19, 'boy', '٦ وَ٧ تُسَاوِي ١٣… إِذَنْ ٣١٣!'],
        [19, 26, 'boy2', '٣١٣؟ هَذَا كَثِيرٌ جِدًّا!'],
      ]}
    >
      {[0, 1, 2].map((i) => (
        <Crate key={i} x={1030 - i * 120} y={392} n={10} kind="book" color={BOOKS[i]} label={num(10)} op={tw(t, 1 + i * 0.4, 2 + i * 0.4)} s={0.9} />
      ))}
      <Crate x={670} y={392} n={6} kind="book" color={BOOKS[3]} label={num(6)} op={tw(t, 2.5, 3.5)} s={0.9} />
      <Crate x={420} y={392} n={7} kind="book" color={BOOKS[4]} label={num(7)} op={tw(t, 5, 6)} s={0.9} />
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={32}
    scene={scene}
    lines={[
      [0, 'n', 'فِي الْمَكْتَبَةِ **٣٦** كِتَابًا'],
      [5, 'n', 'أَحْضَرَ خَالِدٌ **٧** كُتُبٍ أُخْرَى'],
      [10, 'boy', 'سَالِمٌ: ٦ وَ٧ تُسَاوِي ١٣، وَ٣ عَشَرَاتٍ… إِذَنْ ٣١٣!'],
      [19, 'boy2', 'خَالِدٌ: ٣١٣؟ هَذَا أَكْثَرُ مِنْ ثَلَاثِمِئَةِ كِتَابٍ!'],
      [26, 'n', 'أَيْنَ الْخَطَأُ؟ **كَمْ كِتَابًا فِي الْمَكْتَبَةِ؟**'],
    ]}
  />
);
