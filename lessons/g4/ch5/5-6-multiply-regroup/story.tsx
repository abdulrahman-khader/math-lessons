import { Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): في المكتبة ٤ رفوف على كل منها ١٨ كتابًا؛ سالم: ٤ × ٨ = ٣٢، أين أكتب ٣٢؟ وخالد: فيها عشرات وآحاد.
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

const BOOKS = ['#C0392B', '#2E86C1', '#27AE60', '#8E44AD', '#E67E22'];

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="كَمْ كِتَابًا فِي الْمَكْتَبَةِ؟"
      boardAt={22}
      table={false}
      salem={[
        [8, 'think'],
        [22, 'think'],
      ]}
      khalid={[[15, 'idea']]}
      bubbles={[
        [8, 15, 'boy', 'أَيْنَ أَكْتُبُ ٣٢؟'],
        [15, 22, 'boy2', '٣٢ فِيهَا عَشَرَاتٌ وَآحَادٌ!'],
      ]}
    >
      {[0, 1, 2, 3].map((r) => (
        <g key={r} opacity={tw(t, 1 + r * 0.5, 2 + r * 0.5)}>
          <rect x={430} y={268 + r * 46} width={540} height={10} rx={3} fill="#9C6B40" />
          {Array.from({ length: 18 }, (_, k) => (
            <rect key={k} x={440 + k * 29} y={234 + r * 46} width={24} height={36} rx={2} fill={BOOKS[(k + r) % 5]} />
          ))}
        </g>
      ))}
    </StoryStage>
  );
}

export const StoryClip = () => (
  <Story
    voice={voice}
    duration={28}
    scene={scene}
    lines={[
      [0, 'n', 'فِي الْمَكْتَبَةِ **٤** رُفُوفٍ، عَلَى كُلِّ رَفٍّ **١٨** كِتَابًا'],
      [8, 'boy', 'سَالِمٌ: ٤ × ٨ = ٣٢… أَيْنَ أَكْتُبُ ٣٢؟'],
      [15, 'boy2', 'خَالِدٌ: ٣٢ فِيهَا عَشَرَاتٌ وَآحَادٌ… نُفَكِّرُ!'],
      [22, 'n', 'كَمْ كِتَابًا فِي الْمَكْتَبَةِ؟'],
    ]}
  />
);
