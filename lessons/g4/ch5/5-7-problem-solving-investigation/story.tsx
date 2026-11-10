import { Item, num, STag, Story, StoryStage, type StoryTalk, tw } from '@engine';
import voice from './story-voice';

/*
 * القصة التي تفتح الدرس (أولاد فقط): سالم يدّخر ٥ ريالات كل يوم ليشتري كرة بـ٣٥ ريالًا؛ متى يشتريها؟ خالد: نختار خطة، جدول أم نمط؟
 * تتوقف عند السؤال بلا جواب، وأرقامها غير أرقام الكتاب وغير مقطع الفكرة.
 */

function scene(t: number, s: StoryTalk) {
  return (
    <StoryStage
      t={t}
      s={s}
      board="بَعْدَ كَمْ يَوْمًا يَشْتَرِيهَا؟"
      boardAt={23}
      salem={[
        [12, 'think'],
        [23, 'think'],
      ]}
      khalid={[[17, 'idea']]}
      bubbles={[
        [12, 17, 'boy', 'مَتَى أَشْتَرِي الْكُرَةَ؟'],
        [17, 23, 'boy2', 'نَخْتَارُ خُطَّةً: جَدْوَلٌ أَمْ نَمَطٌ؟'],
      ]}
    >
      <g opacity={tw(t, 1, 2)}>
        {Array.from({ length: Math.min(7, Math.floor(Math.max(0, t - 1) / 1.5) + 1) }, (_, i) => (
          <g key={i}>
            {[0, 1, 2, 3, 4].map((k) => (
              <Item key={k} kind="coin" cx={1040 - i * 70} cy={372 - k * 7} r={20} color="#F2C94C" />
            ))}
          </g>
        ))}
      </g>
      <g opacity={tw(t, 6, 7)}>
        <Item kind="ball" cx={420} cy={330} r={46} color="#E8793A" />
        <STag x={420} y={250} w={140} h={60} size={34} color="#C62A1C">
          {num(35)} رِيَالًا
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
      [0, 'n', 'يَدَّخِرُ سَالِمٌ **٥** رِيَالَاتٍ كُلَّ يَوْمٍ'],
      [6, 'n', 'يُرِيدُ شِرَاءَ كُرَةٍ ثَمَنُهَا **٣٥** رِيَالًا'],
      [12, 'boy', 'سَالِمٌ: مَتَى أَشْتَرِي الْكُرَةَ؟'],
      [17, 'boy2', 'خَالِدٌ: نَخْتَارُ خُطَّةً: جَدْوَلٌ أَمْ نَمَطٌ؟'],
      [23, 'n', 'بَعْدَ كَمْ يَوْمًا يَشْتَرِي سَالِمٌ الْكُرَةَ؟'],
    ]}
  />
);
