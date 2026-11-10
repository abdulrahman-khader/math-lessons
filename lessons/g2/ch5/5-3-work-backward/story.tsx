import { num, STag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): كان مع خالد ملصقات لا نعرف عددها؛ أعطى سالمًا ٥، ثم أعطاه المعلم ٨، فصار معه ٢١. البداية ١٨ (لا تظهر).
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

const GRAY = '#6b7280';
const RED = '#C62A1C';
const GREEN = '#0E8A4F';
const BLUE = '#1F6FD1';

/** سهم من اليمين إلى اليسار على الطاولة */
const Arrow = ({ x1, x2, op }: { x1: number; x2: number; op: number }) => (
  <g opacity={op} stroke="#555" strokeWidth={5} strokeLinecap="round" fill="none">
    <path d={`M${x1} 350 L${x2} 350`} />
    <path d={`M${x2 + 14} 338 L${x2} 350 L${x2 + 14} 362`} />
  </g>
);

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ كَانَ مَعَهُ فِي الْبِدَايَةِ؟"
      boardAt={29}
      salem={[
        [21, 'sad'],
        [29, 'think'],
      ]}
      khalid={[[25, 'idea']]}
      bubbles={[
        [21, 25, 'boy', 'لَا نَعْرِفُ الْبِدَايَةَ!'],
        [25, 29, 'boy2', 'نَرْجِعُ مِنَ النِّهَايَةِ!'],
      ]}
    >
      {/* الطريق من البداية (يمين) إلى النهاية (يسار) */}
      <STag x={1010} y={350} w={110} h={80} size={52} op={tw(t, 1, 2)} color={GRAY}>
        ؟
      </STag>
      <Arrow x1={950} x2={860} op={tw(t, 6, 7)} />
      <STag x={790} y={350} w={130} h={70} size={30} op={tw(t, 6, 7)} color={RED}>
        أَعْطَى ٥
      </STag>
      <Arrow x1={720} x2={630} op={tw(t, 11, 12)} />
      <STag x={560} y={350} w={130} h={70} size={30} op={tw(t, 11, 12)} color={GREEN}>
        أَخَذَ ٨
      </STag>
      <Arrow x1={490} x2={430} op={tw(t, 16, 17)} />
      <STag x={370} y={350} w={100} h={80} size={46} op={tw(t, 16, 17)} color={BLUE}>
        {num(21)}
      </STag>
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={35}
    scene={scene}
    lines={[
      [0, 'n', 'كَانَ مَعَ خَالِدٍ مُلْصَقَاتٌ، لَا نَعْرِفُ كَمْ'],
      [6, 'n', 'أَعْطَى سَالِمًا **٥** مُلْصَقَاتٍ'],
      [11, 'n', 'ثُمَّ أَعْطَاهُ الْمُعَلِّمُ **٨** مُلْصَقَاتٍ'],
      [16, 'n', 'الْآنَ مَعَهُ **٢١** مُلْصَقًا'],
      [21, 'boy', 'سَالِمٌ: لَا نَعْرِفُ الْبِدَايَةَ!'],
      [25, 'boy2', 'خَالِدٌ: نَرْجِعُ مِنَ النِّهَايَةِ!'],
      [29, 'n', 'كَمْ مُلْصَقًا كَانَ مَعَ خَالِدٍ فِي الْبِدَايَةِ؟'],
    ]}
  />
);
