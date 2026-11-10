import { num, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): رحلة بـ٧ حافلات في كل منها ٣٤ مقعدًا؛ سالم يضرب بالضبط فيطول، وخالد: المدير يريد العدد تقريبًا.
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

/** حافلة صغيرة عليها عدد مقاعدها */
const Bus = ({ x, y, op }: { x: number; y: number; op: number }) => (
  <g opacity={op} transform={`translate(${x} ${y})`}>
    <rect x={-75} y={-38} width={150} height={66} rx={14} fill="#F2C94C" stroke="#B8860B" strokeWidth={3} />
    {[0, 1, 2].map((k) => (
      <rect key={k} x={-62 + k * 42} y={-28} width={34} height={22} rx={4} fill="#CFE8F7" />
    ))}
    <circle cx={-44} cy={30} r={12} fill="#333" />
    <circle cx={44} cy={30} r={12} fill="#333" />
    <text y={20} textAnchor="middle" fontSize={24} fontWeight={800} fill="#7a5600">
      {num(34)}
    </text>
  </g>
);

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ مَقْعَدًا تَقْرِيبًا؟"
      boardAt={24}
      table={false}
      salem={[
        [11, 'think'],
        [24, 'think'],
      ]}
      khalid={[[18, 'idea']]}
      bubbles={[
        [11, 18, 'boy', 'سَأَضْرِبُ بِالضَّبْطِ… يَطُولُ!'],
        [18, 24, 'boy2', 'نُرِيدُ الْعَدَدَ تَقْرِيبًا فَقَطْ!'],
      ]}
    >
      {Array.from({ length: 7 }, (_, i) => (
        <Bus key={i} x={1040 - (i % 4) * 190} y={i < 4 ? 270 : 380} op={tw(t, 1 + i * 0.4, 2 + i * 0.4)} />
      ))}
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={30}
    scene={scene}
    lines={[
      [0, 'n', 'ذَهَبَتِ الْمَدْرَسَةُ فِي رِحْلَةٍ بِـ**٧** حَافِلَاتٍ'],
      [6, 'n', 'فِي كُلِّ حَافِلَةٍ **٣٤** مَقْعَدًا'],
      [11, 'boy', 'سَالِمٌ: سَأَضْرِبُ بِالضَّبْطِ… هَذَا يَأْخُذُ وَقْتًا!'],
      [18, 'boy2', 'خَالِدٌ: الْمُدِيرُ يُرِيدُ الْعَدَدَ تَقْرِيبًا فَقَطْ'],
      [24, 'n', 'كَمْ مَقْعَدًا تَقْرِيبًا فِي الْحَافِلَاتِ؟'],
    ]}
  />
);
