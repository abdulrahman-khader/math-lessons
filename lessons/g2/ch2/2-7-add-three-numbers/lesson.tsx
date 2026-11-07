import {
  Card, Cols, Eq, FnTable, Lines, QuestionGroup, QuestionSlide, Sentence, SentenceCard, SlideHead, ThreeCard, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ٥٢';
const PRACTICE = 'أتدرَّبُ، ص ٥٣';
const FIND = 'أَجِدُ نَاتِجَ الْجَمْعِ، بِحَيْثُ أُحَوِّطُ الْعَدَدَيْنِ اللَّذَيْنِ أَبْدَأُ بِهِمَا، ثُمَّ أَكْتُبُ النَّاتِجَ:';
const FIND2 = 'أَجِدُ نَاتِجَ الْجَمْعِ:';
const FILE = 'مَلَفُّ الْبَيَانَاتِ، ص ٥٣';
const HOBBY = <FnTable title="هِوَايَاتُ الطُّلَّابِ" heads={['الْهِوَايَةُ', 'عَدَدُ الطُّلَّابِ']} rows={[['السِّبَاحَةُ', 7], ['صَيْدُ الأَسْمَاكِ', 4], ['كُرَةُ الْقَدَمِ', 4], ['الْجَرْيُ', 3]]} />;

export default defineLesson({
  meta: {
    id: 'g2-2-7-add-three-numbers',
    design: 'v2',
    code: '٢-٧',
    title: 'جَمْعُ ثَلَاثَةِ أَعْدَادٍ',
    shortTitle: 'جمع ثلاثة أعداد',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثاني: طرائق الجمع',
    source: 'الجزء الأول، ص ٥٢–٥٣',
    minutes: 45,
    idea: 'أُعِيدُ تَرْتِيبَ الأَعْدَادِ لِيَسْهُلَ عَلَيَّ جَمْعُهَا.',
    bookQuestions: 21,
  },
  sectionDesc: {"engage": "نتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٧", "practice": "الأسئلة ٨–١٩", "hot": "السؤالان ٢٠–٢١", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أُعِيدُ تَرْتِيبَ الأَعْدَادِ لِيَسْهُلَ عَلَيَّ جَمْعُهَا.', ["أَبْحَثُ عَنْ عَدَدَيْنِ مُتَسَاوِيَيْنِ.", "أَبْحَثُ عَنْ عَدَدَيْنِ مَجْمُوعُهُمَا ١٠", "أَجْمَعُ الْعَدَدَ الثَّالِثَ."]),
    askSlide('engage', 'نتذكر', [["٤ + ٤ = ؟", ["٨", "٧", "٩"], "٨"], ["٦ + ٤ = ؟", ["١٠", "٩", "١١"], "١٠"], ["١٠ + ٤ = ؟", ["١٤", "١٣", "٤٠"], "١٤"]], 'ربط بالدرسين ٢-٤ و٢-٦.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: الطريقتان تعطيان ١٤.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ٥٢" kind="rule">طريقتان لجمع ٤ و٦ و٤</SlideHead>
          <Cols even>
            <Card kind="ex" cap="أَجِدُ نَاتِجَ جَمْعِ الْعَدَدِ وَنَفْسِهِ ٤ + ٤">
              <Lines><Sentence t={[4, '+', 4, '=', { b: 8 }]} /><Sentence t={[8, '+', 6, '=', { b: 14 }]} /></Lines>
            </Card>
            <Card kind="ex" cap="أَجِدُ نَاتِجَ الْجَمْعِ ٤ + ٦">
              <Lines><Sentence t={[4, '+', 6, '=', { b: 10 }]} /><Sentence t={[10, '+', 4, '=', { b: 14 }]} /></Lines>
            </Card>
          </Cols>
          <Card kind="rule" cap="أَتَذَكَّرُ">نَاتِجُ الْجَمْعِ لَا يَتَغَيَّرُ مَهْمَا تَغَيَّرَ تَرْتِيبُ الأَعْدَادِ، وَهَذَا مَا نُسَمِّيهِ الْخَاصِّيَّةَ التَّجْمِيعِيَّةَ.</Card>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٣ + ٧ + ٥ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'بأي عددين أبدأ؟', [["٢ + ٨ + ٣: نَبْدَأُ بِـ", ["٢ وَ٨", "٨ وَ٣", "٢ وَ٣"], "٢ وَ٨"], ["٥ + ٥ + ٤ = ؟", ["١٤", "١٣", "١٥"], "١٤"], ["٢ + ٨ + ٣ = ؟", ["١٣", "١٢", "١٠"], "١٣"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 4,
      notes: 'كل ضغطة: تحويط، ثم مجموع العددين، ثم الناتج.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={120}>
          <ThreeCard n={1} nums={[7, 4, 7]} rings={[0, 2]} pair={14} />
          <ThreeCard n={2} nums={[9, 1, 2]} rings={[0, 1]} pair={10} />
          <ThreeCard n={3} nums={[3, 9, 3]} rings={[0, 2]} pair={6} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={120}>
          <ThreeCard n={4} nums={[2, 4, 2]} rings={[0, 2]} pair={4} />
          <ThreeCard n={5} nums={[2, 7, 8]} rings={[0, 2]} pair={10} />
          <ThreeCard n={6} nums={[1, 6, 9]} rings={[0, 2]} pair={10} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="لِمَاذَا اخْتَرْتُ الْعَدَدَيْنِ اللَّذَيْنِ بَدَأْتُ بِجَمْعِهِمَا فِي السُّؤَالِ ٦؟"
          hint="مَا مَجْمُوعُ ١ وَ٩؟"
          steps={[
            { text: <Eq>١ + ٩ = ١٠</Eq> },
            { text: <Eq>١٠ + ٦ = ١٦</Eq> },
            { text: 'لِأَنَّ تَكْوِينَ الْعَشَرَةِ يُسَهِّلُ الْجَمْعَ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'أتذكر من الكتاب: عندما أجمع عددين أبحث أولًا عن حقائق أعرفها.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND2} cols={2} time={90}>
          <SentenceCard n={8} lines={[[4, '+', 3, '+', 4, '=', { b: 11 }]]} />
          <SentenceCard n={9} lines={[[4, '+', 3, '+', 7, '=', { b: 14 }]]} />
          <SentenceCard n={10} lines={[[5, '+', 5, '+', 5, '=', { b: 15 }]]} />
          <SentenceCard n={11} lines={[[6, '+', 6, '+', 3, '=', { b: 15 }]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND2} cols={4} time={90}>
          <ThreeCard n={12} nums={[5, 7, 5]} />
          <ThreeCard n={13} nums={[3, 5, 7]} />
          <ThreeCard n={14} nums={[6, 6, 5]} />
          <ThreeCard n={15} nums={[8, 4, 1]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND2} cols={4} time={90}>
          <ThreeCard n={16} nums={[9, 8, 1]} />
          <ThreeCard n={17} nums={[2, 2, 8]} />
          <ThreeCard n={18} nums={[7, 7, 1]} />
          <ThreeCard n={19} nums={[1, 7, 3]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={FILE} n={20} chart={HOBBY} time={120} intro="تُعَدُّ السِّبَاحَةُ وَاحِدَةً مِنْ أَهَمِّ الرِّيَاضَاتِ الَّتِي تُسَاعِدُ عَلَى بِنَاءِ جِسْمٍ سَلِيمٍ. أَسْتَعِينُ بِالْجَدْوَلِ لِأُجِيبَ عَمَّا يَأْتِي:"
          question={"مَا عَدَدُ الطُّلَّابِ الَّذِينَ يَهْوَوْنَ صَيْدَ الأَسْمَاكِ وَكُرَةَ الْقَدَمِ وَالْجَرْيَ؟"}
          hint="مَا الأَعْدَادُ الثَّلَاثَةُ؟"
          steps={[
            { text: <Eq>٤ + ٤ + ٣ = ١١</Eq> },
            { text: '١١ طَالِبًا', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={FILE} n={21} chart={HOBBY} time={120}
          question={"مَا عَدَدُ الطُّلَّابِ الَّذِينَ يَهْوَوْنَ السِّبَاحَةَ وَصَيْدَ الأَسْمَاكِ وَالْجَرْيَ؟"}
          hint="مَا الأَعْدَادُ الثَّلَاثَةُ؟"
          steps={[
            { text: <Eq>٧ + ٤ + ٣ = ١٤</Eq> },
            { text: '١٤ طَالِبًا', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>جَمْعُ ثَلَاثَةِ<br />أَعْدَادٍ</>, [{"cap": "أَبْحَثُ", "text": "عَنْ عَدَدَيْنِ مُتَسَاوِيَيْنِ"}, {"cap": "أَوْ", "text": "عَنْ عَدَدَيْنِ مَجْمُوعُهُمَا ١٠"}, {"cap": "أَجْمَعُ", "text": "الْعَدَدَ الثَّالِثَ"}, {"cap": "أَتَذَكَّرُ", "text": "التَّرْتِيبُ لَا يُغَيِّرُ النَّاتِجَ"}]),
    exitSlide('ثلاثة أعداد', [["٣ + ٣ + ٢ = ؟", ["٨", "٧", "٩"], "٨"], ["٦ + ٤ + ٥ = ؟", ["١٥", "١٤", "١٦"], "١٥"], ["٧ + ٢ + ٣ = ؟", ["١٢", "١١", "١٣"], "١٢"]]),
    endSlide,
  ],
});
