import { num, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): موقف المثال الأول نفسه، المسابقة الثقافية: ٢٦ مدرسة، من كل مدرسة ٦ طلاب.
 * تتوقف عند السؤال بلا جواب، و«استعد» و«مثال ١» بعدها يحلّانه (٣٠ × ٦ = ١٨٠).
 */

/** مدرسة صغيرة، وعليها عدد طلابها المشاركين */
const School = ({ x, y, op, badge }: { x: number; y: number; op: number; badge: number }) => (
  <g opacity={op} transform={`translate(${x} ${y})`}>
    <path d="M-24 -10 L0 -30 L24 -10 Z" fill="#C0392B" />
    <rect x={-22} y={-10} width={44} height={36} fill="#F5E6C8" stroke="#A67C2E" strokeWidth={2.5} />
    <rect x={-6} y={8} width={12} height={18} fill="#8B5A2B" />
    <rect x={-17} y={-3} width={9} height={8} fill="#CFE8F7" />
    <rect x={8} y={-3} width={9} height={8} fill="#CFE8F7" />
    <line x1={0} y1={-30} x2={0} y2={-44} stroke="#555" strokeWidth={2} />
    <path d="M0 -44 L14 -40 L0 -36 Z" fill="#167a3a" />
    <g opacity={badge}>
      <circle cx={18} cy={-30} r={14} fill="var(--good)" />
      <text x={18} y={-22} fontSize={20} fontWeight={800} fill="#fff" textAnchor="middle">{num(6)}</text>
    </g>
  </g>
);

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ طَالِبًا تَقْرِيبًا؟"
      boardAt={27}
      table={false}
      salem={[
        [16, 'think'],
        [27, 'think'],
      ]}
      khalid={[[22, 'idea']]}
      bubbles={[
        [16, 22, 'boy', 'سَأَعُدُّ وَاحِدًا وَاحِدًا… يَطُولُ!'],
        [22, 27, 'boy2', 'نُرِيدُ الْعَدَدَ تَقْرِيبًا فَقَطْ!'],
      ]}
    >
      {Array.from({ length: 26 }, (_, i) => (
        <School
          key={i}
          x={1060 - (i % 13) * 60}
          y={i < 13 ? 290 : 385}
          op={tw(t, 6 + i * 0.15, 6.6 + i * 0.15)}
          badge={tw(t, 11.5 + i * 0.08, 12 + i * 0.08)}
        />
      ))}
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={33}
    scene={scene}
    lines={[
      [0, 'n', 'إِدَارَةُ التَّعْلِيمِ تُقِيمُ مُسَابَقَةً ثَقَافِيَّةً'],
      [6, 'n', 'شَارَكَتْ **٢٦** مَدْرَسَةً'],
      [11, 'n', 'وَأَرْسَلَتْ كُلُّ مَدْرَسَةٍ **٦** طُلَّابٍ'],
      [16, 'boy', 'سَالِمٌ: سَأَعُدُّ الطُّلَّابَ وَاحِدًا وَاحِدًا… يَطُولُ!'],
      [22, 'boy2', 'خَالِدٌ: نُرِيدُ الْعَدَدَ تَقْرِيبًا فَقَطْ'],
      [27, 'n', 'كَمْ طَالِبًا تَقْرِيبًا شَارَكُوا فِي الْمُسَابَقَةِ؟'],
    ]}
  />
);
