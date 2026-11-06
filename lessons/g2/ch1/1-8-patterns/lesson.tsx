import {
  BookLabel, Eq, GrowCard, Mark, QText, QuestionGroup, QuestionSlide, SeqCard, SeqLine, SlideHead, Step, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ٢٨';
const PRACTICE = 'أتدرَّبُ، ص ٢٩';
const FIND = 'أُكْمِلُ رَسْمَ الشَّكْلِ التَّالِي فِي كُلٍّ مِنَ الأَنْمَاطِ الآتِيَةِ، ثُمَّ أَكْتُبُ الْعَدَدَ:';
const FILL = 'أَمْلَأُ الْفَرَاغَاتِ بِالأَعْدَادِ الْمُنَاسِبَةِ فِي كِلَا النَّمَطَيْنِ الآتِيَيْنِ:';
const SOLVE = 'أَحُلُّ الْمَسْأَلَةَ، ص ٢٩';

export default defineLesson({
  meta: {
    id: 'g2-1-8-patterns',
    design: 'v2',
    code: '١-٨',
    title: 'الأَنْمَاطُ',
    shortTitle: 'الأنماط',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الأول: القيمة المنزلية حتى ١٠٠ والأنماط',
    source: 'الجزء الأول، ص ٢٨–٢٩',
    minutes: 45,
    idea: 'أُحَدِّدُ الأَنْمَاطَ وَأَصِفُهَا.',
    bookQuestions: 12,
  },
  sectionDesc: {"engage": "نتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٥", "practice": "الأسئلة ٦–١١", "hot": "السؤال ١٢", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أُحَدِّدُ الأَنْمَاطَ وَأَصِفُهَا.', ["أُلَاحِظُ مَا يَتَكَرَّرُ.", "أُكْمِلُ النَّمَطَ.", "أَصِفُ النَّمَطَ."], <Mark>النَّمَطُ</Mark>),
    askSlide('engage', 'نتذكر', [["٢ + ٢ = ؟", ["٤", "٢", "٦"], "٤"], ["٤ + ٢ = ؟", ["٦", "٥", "٨"], "٦"], ["١٠ + ١٠ = ؟", ["٢٠", "١٠", "١٠٠"], "٢٠"]], 'نعدّ بالاثنينات والعشرات.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: أضيف ٢ في كل مرة.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ٢٨" kind="rule">أكمل النمط</SlideHead>
          <QText>كَثِيرًا مَا نُشَاهِدُ الأَنْمَاطَ حَوْلَنَا. فَبَعْضُ الأَنْمَاطِ تَمْتَدُّ فَتُصْبِحُ أَكْبَرَ، وَبَعْضُهَا الآخَرُ يُصْبِحُ أَصْغَرَ.</QText>
          <SeqLine items={[2, 4, 6, null]} ans={[8]} />
          <Step>أُضِيفُ ٢ إِلَى كُلِّ عَدَدٍ.</Step>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٣، ٦، ٩ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'ما التالي؟', [["٥، ١٠، ١٥، ؟", ["١٦", "٢٠", "٢٥"], "٢٠"], ["٩، ٧، ٥، ؟", ["٣", "٤", "٦"], "٣"], ["١٠، ٢٠، ٣٠، ؟", ["٣١", "٤٠", "٥٠"], "٤٠"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 3,
      notes: 'كل ضغطة تكمل نمطًا.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={60}>
          <GrowCard n={1} items={[1, 2, 3, 4, null]} ans={5} kind="star" color="#6cbb8c" />
          <GrowCard n={2} items={[6, 5, 4, null]} ans={3} kind="triangle" color="#6fa8dc" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 3,
      notes: 'كل ضغطة تكمل نمطًا.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={60}>
          <GrowCard n={3} items={[4, 9, 16, null]} ans={25} kind="square" color="#f4a261" />
          <GrowCard n={4} items={[2, 4, 6, null]} ans={8} kind="circle" color="#9b6dc6" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="أَصِفُ النَّمَطَ فِي التَّمْرِينِ ٣."
          hint="كَيْفَ يَكْبَرُ الْمُرَبَّعُ؟"
          steps={[
            { text: 'الأَعْدَادُ: ٤، ٩، ١٦، ٢٥' },
            { text: 'كُلُّ مُرَبَّعٍ أَكْبَرُ مِنْ سَابِقِهِ بِصَفٍّ وَعَمُودٍ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FILL} cols={1} time={90}>
          <SeqCard n={6} items={[5, 10, 15, 20, null, null, null]} ans={[25, 30, 35]} />
          <SeqCard n={7} items={[10, 20, 30, null, 50, null, null, 80]} ans={[40, 60, 70]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={2} time={75}>
          <GrowCard n={8} items={[3, 6, 9, null]} ans={12} kind="square" color="#6cbb8c" />
          <GrowCard n={9} items={[3, 5, null, 9]} ans={7} kind="circle" color="#6fa8dc" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={2} time={75}>
          <GrowCard n={10} items={[3, 6, 10, null]} ans={15} kind="square" color="#f4a261" />
          <GrowCard n={11} items={[1, 4, 9, null]} ans={16} kind="triangle" color="#9b6dc6" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={12} chart={null} time={120}
          question={<><BookLabel>تَفْكِيرٌ بَصَرِيٌّ:</BookLabel> وَفَّرَتْ أَمِيرَةُ ١٠ رِيَالَاتٍ فِي الأُسْبُوعِ الأَوَّلِ، وَ٢٠ رِيَالًا فِي الأُسْبُوعِ الثَّانِي، وَ٣٠ رِيَالًا فِي الأُسْبُوعِ الثَّالِثِ. فَإِذَا اسْتَمَرَّتْ أَمِيرَةُ فِي التَّوْفِيرِ بِهَذَا النَّمَطِ مُدَّةَ ٦ أَسَابِيعَ، فَمَا مَجْمُوعُ مَا سَتُوَفِّرُهُ فِي نِهَايَةِ الْمُدَّةِ؟</>}
          hint="مَا النَّمَطُ؟"
          steps={[
            { text: 'الأَسَابِيعُ: ١٠، ٢٠، ٣٠، ٤٠، ٥٠، ٦٠' },
            { text: <Eq>١٠ + ٢٠ + ٣٠ + ٤٠ + ٥٠ + ٦٠ = ٢١٠</Eq> },
            { text: '٢١٠ رِيَالَاتٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>الأَنْمَاطُ</>, [{"cap": "أُلَاحِظُ", "text": "مَا يَتَكَرَّرُ"}, {"cap": "أُكْمِلُ", "text": "٢، ٤، ٦، ٨"}, {"cap": "أَصِفُ", "text": "أُضِيفُ ٢ إِلَى كُلِّ عَدَدٍ"}, {"cap": "أَنْتَبِهُ", "text": "النَّمَطُ يَكْبَرُ أَوْ يَصْغَرُ"}]),
    exitSlide('أكمل النمط', [["١، ٣، ٥، ؟", ["٦", "٧", "٩"], "٧"], ["٢٠، ٣٠، ٤٠، ؟", ["٤١", "٥٠", "٦٠"], "٥٠"], ["١٠، ٨، ٦، ؟", ["٤", "٥", "٧"], "٤"]]),
    endSlide,
  ],
});
