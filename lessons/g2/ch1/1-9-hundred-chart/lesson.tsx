import {
  Cols, HundredChart, Mark, QCol, QText, QuestionGroup, QuestionSlide, SeqCard, SlideHead, Solution, Step, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ٣٠';
const PRACTICE = 'أتدرَّبُ، ص ٣١';
const FIND = 'أَسْتَعْمِلُ لَوْحَةَ الْمِئَةِ:';
const FILL = 'أَمْلَأُ الْفَرَاغَ بِالْعَدَدِ الْمُنَاسِبِ، ثُمَّ أَصِفُ النَّمَطَ:';
const SOLVE = 'أَحُلُّ الْمَسْأَلَةَ، ص ٣١';
const EVEN = Array.from({ length: 50 }, (_, i) => (i + 1) * 2);
const FIVES = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
const TENS = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
const ODD = Array.from({ length: 30 }, (_, i) => i * 2 + 1);

export default defineLesson({
  meta: {
    id: 'g2-1-9-hundred-chart',
    design: 'v2',
    code: '١-٩',
    title: 'الأَنْمَاطُ عَلَى لَوْحَةِ الْمِئَةِ',
    shortTitle: 'الأنماط على لوحة المئة',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الأول: القيمة المنزلية حتى ١٠٠ والأنماط',
    source: 'الجزء الأول، ص ٣٠–٣١',
    minutes: 45,
    idea: 'أَعُدُّ قَفْزِيًّا لِتَكْوِينِ أَنْمَاطٍ عَلَى لَوْحَةِ الْمِئَةِ.',
    bookQuestions: 12,
  },
  sectionDesc: {"engage": "نتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٤", "practice": "الأسئلة ٥–١٠", "hot": "السؤالان ١١–١٢", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَعُدُّ قَفْزِيًّا لِتَكْوِينِ أَنْمَاطٍ عَلَى لَوْحَةِ الْمِئَةِ.', ["أَعُدُّ اثْنَيْنَاتٍ.", "أَعُدُّ خَمْسَاتٍ وَعَشَرَاتٍ.", "أَصِفُ النَّمَطَ."], <Mark>الْعَدُّ الْقَفْزِيُّ</Mark>),
    askSlide('engage', 'نتذكر', [["٢، ٤، ٦، ؟", ["٧", "٨", "١٠"], "٨"], ["٥، ١٠، ١٥، ؟", ["١٦", "٢٠", "٢٥"], "٢٠"], ["١٠، ٢٠، ٣٠، ؟", ["٣١", "٤٠", "٥٠"], "٤٠"]], 'ربط بالدرس ١-٨.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: نعدّ أزواج الأحذية اثنينات، ثم ننظر إلى اللوحة.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ٣٠" kind="rule">العد القفزي</SlideHead>
          <Cols>
            <QCol>
              <QText>أَسْتَعْمِلُ الأَنْمَاطَ فِي الْعَدِّ. وَهُوَ مَا يُسَمَّى الْعَدَّ الْقَفْزِيَّ. أَعُدُّ أَزْوَاجَ الأَحْذِيَةِ اثْنَيْنَاتٍ.</QText>
              <Solution>
                <Step hl={['n0']}>٢، ٤، ٦، ٨</Step>
                <Step>يُشَكِّلُ الْعَدُّ الْقَفْزِيُّ اثْنَيْنَاتٍ عَلَى لَوْحَةِ الْمِئَةِ نَمَطًا.</Step>
              </Solution>
            </QCol>
            <HundredChart max={60} sets={[{ nums: ODD, color: '#f7b2a7' }]} />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: العد ثلاثات (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أعدّ قفزيًّا', [["٥٠، ٦٠، ٧٠، ؟", ["٧١", "٨٠", "٩٠"], "٨٠"], ["٢٥، ٣٠، ٣٥، ؟", ["٤٠", "٣٦", "٤٥"], "٤٠"], ["٦٢، ٦٤، ٦٦، ؟", ["٦٧", "٦٨", "٧٠"], "٦٨"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} chart={<HundredChart sets={[{ nums: EVEN, color: '#a9c8ec' }]} />} time={60}
          question={"أَبْدَأُ بِالْعَدَدِ ٢، وَأَعُدُّ اثْنَيْنَاتٍ، وَأُلَوِّنُ الأَعْدَادَ بِاللَّوْنِ الأَزْرَقِ."}
          hint="مَا الْعَدَدُ بَعْدَ ٢ إِذَا قَفَزْنَا اثْنَيْنِ؟"
          steps={[
            { text: '٢، ٤، ٦، ٨، … ١٠٠', hl: ['n0'] },
            { text: 'الأَعْدَادُ الزَّوْجِيَّةُ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} chart={<HundredChart sets={[{ nums: FIVES, color: '#ffd166' }]} />} time={60}
          question={"أَبْدَأُ بِالْعَدَدِ ٥، وَأَعُدُّ خَمْسَاتٍ، وَأُحَوِّطُ الأَعْدَادَ."}
          hint="مَا الْعَدَدُ بَعْدَ ٥ إِذَا قَفَزْنَا خَمْسَةً؟"
          steps={[
            { text: '٥، ١٠، ١٥، ٢٠، … ١٠٠', hl: ['n0'] },
            { text: 'عَمُودَانِ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} chart={<HundredChart sets={[{ nums: TENS, color: '#8fd19e' }]} />} time={60}
          question={"أَبْدَأُ بِالْعَدَدِ ١٠، وَأَعُدُّ عَشَرَاتٍ، وَأَضَعُ خَطًّا تَحْتَ كُلِّ عَدَدٍ."}
          hint="مَا الْعَدَدُ بَعْدَ ١٠ إِذَا قَفَزْنَا عَشَرَةً؟"
          steps={[
            { text: '١٠، ٢٠، ٣٠، … ١٠٠', hl: ['n0'] },
            { text: 'الْعَمُودُ الأَخِيرُ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="مَا الأَنْمَاطُ الَّتِي كَوَّنْتُهَا عَلَى لَوْحَةِ الْمِئَةِ؟"
          hint="كَيْفَ تَبْدُو الأَعْدَادُ الْمُلَوَّنَةُ؟"
          steps={[
            { text: 'الْعَدُّ بِالِاثْنَيْنَاتِ: ٥ أَعْمِدَةٍ.' },
            { text: 'أَعْمِدَةٌ رَأْسِيَّةٌ: ٥ لِلِاثْنَيْنَاتِ، وَ٢ لِلْخَمْسَاتِ، وَ١ لِلْعَشَرَاتِ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'أعدّ اثنينات، أعدّ أربعات.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={1} time={90}>
          <SeqCard n={5} items={[2, 4, 6, 8, null, null, null, null]} ans={[10, 12, 14, 16]} />
          <SeqCard n={6} items={[12, 16, 20, 24, null, null, null]} ans={[28, 32, 36]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'ثم نقول: العد القفزي باثنين، بعشرة، بثلاثة، بخمسة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FILL} cols={2} time={120}>
          <SeqCard n={7} items={[34, 36, 38, null]} ans={[40]} />
          <SeqCard n={8} items={[10, null, 30, 40]} ans={[20]} />
          <SeqCard n={9} items={[55, 58, null, 64]} ans={[61]} />
          <SeqCard n={10} items={[75, null, null, 90]} ans={[80, 85]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={11} chart={null} time={120}
          question={"لَدَيْكَ ٦ قُفَّازَاتٍ فِي كُلٍّ مِنْهَا ٥ أَصَابِعَ. كَمْ إِصْبَعًا فِيهَا كُلِّهَا؟"}
          hint="نَعُدُّ خَمْسَاتٍ سِتَّ مَرَّاتٍ."
          steps={[
            { text: '٥، ١٠، ١٥، ٢٠، ٢٥، ٣٠' },
            { text: '٣٠ إِصْبَعًا', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={12} chart={null} time={120}
          question={"لِمَجْمُوعَةٍ مِنَ الدَّرَّاجَاتِ الْهَوَائِيَّةِ ٢٠ عَجَلَةً، إِذَا كَانَ لِكُلِّ دَرَّاجَةٍ عَجَلَتَانِ، فَمَا عَدَدُ هَذِهِ الدَّرَّاجَاتِ؟"}
          hint="نَعُدُّ اثْنَيْنَاتٍ حَتَّى ٢٠."
          steps={[
            { text: '٢، ٤، ٦، ٨، ١٠، ١٢، ١٤، ١٦، ١٨، ٢٠' },
            { text: '١٠ دَرَّاجَاتٍ هَوَائِيَّةٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>لَوْحَةُ<br />الْمِئَةِ</>, [{"cap": "اثْنَيْنَاتٌ", "text": "٢، ٤، ٦، ٨"}, {"cap": "خَمْسَاتٌ", "text": "٥، ١٠، ١٥، ٢٠"}, {"cap": "عَشَرَاتٌ", "text": "١٠، ٢٠، ٣٠، ٤٠"}, {"cap": "أُلَاحِظُ", "text": "الأَعْدَادُ تُكَوِّنُ أَعْمِدَةً"}]),
    exitSlide('أعدّ قفزيًّا', [["٤٠، ٤٥، ٥٠، ؟", ["٥٥", "٥١", "٦٠"], "٥٥"], ["٦٠، ٧٠، ٨٠، ؟", ["٨١", "٩٠", "١٠٠"], "٩٠"], ["٨٤، ٨٦، ٨٨، ؟", ["٨٩", "٩٠", "٩٢"], "٩٠"]]),
    endSlide,
  ],
});
