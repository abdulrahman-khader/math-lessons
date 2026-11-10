import { num, STag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): طائرة تحمل ٢١٣ راكبًا في كل رحلة، وطارت ٣ رحلات؛ سالم: عدد من ثلاثة أرقام لم نضرب مثله، وخالد: والمئات؟
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

/** طائرة عليها عدد ركابها، تتجه إلى اليسار */
const Plane = ({ x, y, op }: { x: number; y: number; op: number }) => (
  <g opacity={op} transform={`translate(${x - (1 - op) * 60} ${y})`}>
    <path d="M-110 0 Q-100 -22 -60 -22 L90 -22 Q118 -22 118 0 Q118 22 90 22 L-60 22 Q-100 22 -110 0Z" fill="#fff" stroke="#5b6b7f" strokeWidth={3} />
    <path d="M10 -20 L-30 -70 L-5 -70 L45 -20Z M10 20 L-30 64 L-5 64 L45 20Z" fill="#9fb8d6" stroke="#5b6b7f" strokeWidth={2.5} />
    <path d="M90 -20 L112 -54 L124 -54 L114 -18Z" fill="#9fb8d6" stroke="#5b6b7f" strokeWidth={2.5} />
    {[0, 1, 2, 3, 4].map((k) => (
      <circle key={k} cx={-50 + k * 24} cy={-6} r={6} fill="#CFE8F7" stroke="#5b6b7f" strokeWidth={1.5} />
    ))}
    <text x={10} y={16} textAnchor="middle" fontSize={20} fontWeight={800} fill="#1F6FD1">
      {num(213)}
    </text>
  </g>
);

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ رَاكِبًا فِي الرِّحْلَاتِ؟"
      boardAt={25}
      table={false}
      salem={[
        [12, 'sad'],
        [25, 'think'],
      ]}
      khalid={[[19, 'idea']]}
      bubbles={[
        [12, 19, 'boy', 'ثَلَاثَةُ أَرْقَامٍ! لَمْ نَضْرِبْ مِثْلَهُ'],
        [19, 25, 'boy2', 'الْآحَادُ وَالْعَشَرَاتُ… وَالْمِئَاتُ؟'],
      ]}
    >
      {[0, 1, 2].map((i) => (
        <Plane key={i} x={1000 - i * 300} y={300 + (i % 2) * 70} op={tw(t, 7 + i * 0.6, 8 + i * 0.6)} />
      ))}
      <STag x={700} y={300} w={280} h={64} size={32} op={Math.min(tw(t, 1, 2), 1 - tw(t, 6.5, 7))} color="#1F6FD1">
        {num(213)} رَاكِبًا فِي كُلِّ رِحْلَةٍ
      </STag>
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={31}
    scene={scene}
    lines={[
      [0, 'n', 'طَائِرَةٌ تَحْمِلُ **٢١٣** رَاكِبًا فِي كُلِّ رِحْلَةٍ'],
      [7, 'n', 'طَارَتِ الطَّائِرَةُ **٣** رِحْلَاتٍ مُمْتَلِئَةً'],
      [12, 'boy', 'سَالِمٌ: عَدَدٌ مِنْ ثَلَاثَةِ أَرْقَامٍ! لَمْ نَضْرِبْ مِثْلَهُ'],
      [19, 'boy2', 'خَالِدٌ: نَضْرِبُ الْآحَادَ وَالْعَشَرَاتِ… وَالْمِئَاتِ؟'],
      [25, 'n', 'كَمْ رَاكِبًا حَمَلَتِ الطَّائِرَةُ فِي ٣ رِحْلَاتٍ؟'],
    ]}
  />
);
