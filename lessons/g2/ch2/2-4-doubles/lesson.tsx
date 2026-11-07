import {
  CubeBox, Eq, Lines, Mark, QText, QuestionGroup, QuestionSlide, Sentence, SentenceCard, SlideHead, SumCard, TowerCard, Towers, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ٤٤';
const PRACTICE = 'أتدرَّبُ، ص ٤٥';
const FIND = 'أَجِدُ نَاتِجَ الْجَمْعِ مُسْتَعْمِلًا الْمُكَعَّبَاتِ:';
const FIND2 = 'أَجِدُ نَاتِجَ الْجَمْعِ، ثُمَّ أُحَوِّطُ حَقَائِقَ جَمْعِ الْعَدَدِ وَنَفْسِهِ:';
const SOLVE = 'أَحُلُّ الْمَسْأَلَةَ، ص ٤٥';

export default defineLesson({
  meta: {
    id: 'g2-2-4-doubles',
    design: 'v2',
    code: '٢-٤',
    title: 'جَمْعُ الْعَدَدِ وَنَفْسِهِ',
    shortTitle: 'جمع العدد ونفسه',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثاني: طرائق الجمع',
    source: 'الجزء الأول، ص ٤٤–٤٥',
    minutes: 45,
    idea: 'أَجْمَعُ الْعَدَدَ وَنَفْسَهُ.',
    bookQuestions: 20,
  },
  sectionDesc: {"engage": "نتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٧", "practice": "الأسئلة ٨–١٩", "hot": "السؤال ٢٠", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَجْمَعُ الْعَدَدَ وَنَفْسَهُ.', ["أَعْرِفُ حَقِيقَةَ جَمْعِ الْعَدَدِ وَنَفْسِهِ.", "أُمَثِّلُهَا بِالْمُكَعَّبَاتِ.", "أَتَذَكَّرُ نَاتِجَهَا."], <Mark>الْعَدَدُ وَنَفْسُهُ</Mark>),
    askSlide('engage', 'نتذكر', [["٢ + ٢ = ؟", ["٣", "٤", "٥"], "٤"], ["٣ + ٣ = ؟", ["٥", "٦", "٧"], "٦"], ["أَيُّهَا فِيهِ عَدَدَانِ مُتَسَاوِيَانِ؟", ["٤ + ٤", "٤ + ٣", "٤ + ١"], "٤ + ٤"]], 'نلاحظ العددين المتساويين.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: ٦ + ٦: عدد مضاف + عدد مضاف = ناتج الجمع.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ٤٤" kind="rule">العدد ونفسه</SlideHead>
          <QText>عِنْدَمَا يَتَسَاوَى الْعَدَدَانِ الْمُضَافَانِ فِي جُمْلَةِ الْجَمْعِ فَذَلِكَ يُسَمَّى حَقِيقَةَ جَمْعِ الْعَدَدِ وَنَفْسِهِ.</QText>
          <CubeBox dbl><Towers a={6} b={6} colors={['#d7302a', '#8a4fb5']} k={0} /></CubeBox>
          <Lines><Sentence t={[6, '+', 6, '=', { b: 12 }]} big /></Lines>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٧ + ٧ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'العدد ونفسه', [["٤ + ٤ = ؟", ["٦", "٨", "٩"], "٨"], ["٦ + ٦ = ؟", ["١٢", "١٠", "١٣"], "١٢"], ["أَيُّهَا حَقِيقَةُ جَمْعِ الْعَدَدِ وَنَفْسِهِ؟", ["٥ + ٥", "٥ + ٣", "٥ + ٠"], "٥ + ٥"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={60}>
          <TowerCard n={1} lines={[[4, '+', 4, '=', { b: 8 }]]} a={4} b={4} k={1} colors={['#4fae3a', '#f6c21c']} />
          <TowerCard n={2} lines={[[3, '+', 3, '=', { b: 6 }]]} a={3} b={3} k={2} colors={['#4fae3a', '#f6c21c']} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={90}>
          <SentenceCard n={3} lines={[[5, '+', 5, '=', { b: 10 }]]} />
          <SentenceCard n={4} lines={[[9, '+', 9, '=', { b: 18 }]]} />
          <SentenceCard n={5} lines={[[7, '+', 7, '=', { b: 14 }]]} />
          <SentenceCard n={6} lines={[[8, '+', 8, '=', { b: 16 }]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ أَتَذَكَّرُ نَاتِجَ الْجَمْعِ ٥ + ٥، ٢ + ٢؟"
          hint="مَاذَا تُلَاحِظُ فِي الْعَدَدَيْنِ؟"
          steps={[
            { text: 'هُمَا مِنْ حَقَائِقِ جَمْعِ الْعَدَدِ وَنَفْسِهِ.' },
            { text: <Eq>٥ + ٥ = ١٠</Eq> },
            { text: '٥ + ٥ = ١٠ كَأَصَابِعِ الْيَدَيْنِ، وَ٢ + ٢ = ٤', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'تظهر دائرة حول حقائق العدد ونفسه.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND2} cols={3} time={120}>
          <SumCard n={8} sums={[{ a: 0, op: '+', b: 0, v: 0 }]} ring="زوج" />
          <SumCard n={9} sums={[{ a: 8, op: '+', b: 8, v: 16 }]} ring="زوج" />
          <SumCard n={10} sums={[{ a: 3, op: '+', b: 6, v: 9 }]} />
          <SumCard n={11} sums={[{ a: 7, op: '+', b: 1, v: 8 }]} />
          <SumCard n={12} sums={[{ a: 5, op: '+', b: 2, v: 7 }]} />
          <SumCard n={13} sums={[{ a: 4, op: '+', b: 4, v: 8 }]} ring="زوج" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND2} cols={3} time={120}>
          <SumCard n={14} sums={[{ a: 8, op: '+', b: 3, v: 11 }]} />
          <SumCard n={15} sums={[{ a: 2, op: '+', b: 2, v: 4 }]} ring="زوج" />
          <SumCard n={16} sums={[{ a: 7, op: '+', b: 7, v: 14 }]} ring="زوج" />
          <SumCard n={17} sums={[{ a: 1, op: '+', b: 1, v: 2 }]} ring="زوج" />
          <SumCard n={18} sums={[{ a: 9, op: '+', b: 3, v: 12 }]} />
          <SumCard n={19} sums={[{ a: 7, op: '+', b: 2, v: 9 }]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={20} chart={null} time={120} intro="الْحِسُّ الْعَدَدِيُّ: أَرْسُمُ صُورَةً لِأَحُلَّ الْمَسْأَلَةَ، ثُمَّ أَكْتُبُ الْجُمْلَةَ الْعَدَدِيَّةَ."
          question={"عِنْدَ أَمَلَ ٣ طَائِرَاتٍ وَرَقِيَّةٍ، وَعِنْدَ ابْتِسَامَ الْعَدَدُ نَفْسُهُ مِنَ الطَّائِرَاتِ الْوَرَقِيَّةِ. كَمْ طَائِرَةً لَدَيْهِمَا مَعًا؟"}
          hint="مَاذَا يَعْنِي «الْعَدَدُ نَفْسُهُ»؟"
          steps={[
            { text: 'عِنْدَ ابْتِسَامَ ٣ طَائِرَاتٍ أَيْضًا.' },
            { text: <Eq>٣ + ٣ = ٦</Eq> },
            { text: '٦ طَائِرَاتٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>جَمْعُ الْعَدَدِ<br />وَنَفْسِهِ</>, [{"cap": "الْعَدَدَانِ", "text": "مُتَسَاوِيَانِ"}, {"cap": "مِثَالٌ", "text": "٦ + ٦ = ١٢"}, {"cap": "أَتَذَكَّرُ", "text": "٥ + ٥ = ١٠"}, {"cap": "أُمَثِّلُ", "text": "بُرْجَانِ مُتَسَاوِيَانِ"}]),
    exitSlide('العدد ونفسه', [["١ + ١ = ؟", ["٢", "١", "٣"], "٢"], ["٧ + ٧ = ؟", ["١٤", "١٣", "١٥"], "١٤"], ["٩ + ٩ = ؟", ["١٨", "١٧", "١٩"], "١٨"]]),
    endSlide,
  ],
});
