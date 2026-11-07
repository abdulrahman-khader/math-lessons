import {
  Card, Eq, Grid, Intro, QuestionGroup, QuestionSlide, Sentence, SentenceCard, SlideHead, SumCard, TowerCard, Towers, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ٤٨';
const PRACTICE = 'أتدرَّبُ، ص ٤٩';
const FIND = 'أَجِدُ نَاتِجَ الْجَمْعِ مُسْتَعْمِلًا الْمُكَعَّبَاتِ:';
const SOLVE = 'أَحُلُّ الْمَسْأَلَةَ، ص ٤٩';

export default defineLesson({
  meta: {
    id: 'g2-2-5-near-doubles',
    design: 'v2',
    code: '٢-٥',
    title: 'جَمْعُ الْعَدَدِ وَنَفْسِهِ مُضَافًا إِلَيْهِ ١، أَوْ مَطْرُوحًا مِنْهُ ١',
    shortTitle: 'جمع العدد ونفسه مضافًا إليه ١ أو مطروحًا منه ١',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثاني: طرائق الجمع',
    source: 'الجزء الأول، ص ٤٨–٤٩',
    minutes: 45,
    idea: 'أَسْتَعْمِلُ حَقَائِقَ جَمْعِ الْعَدَدِ وَنَفْسِهِ؛ لِأَجِدَ نَاتِجَ الْجَمْعِ فِي حَقَائِقَ أُخْرَى.',
    bookQuestions: 24,
  },
  sectionDesc: {"engage": "نتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٦", "practice": "الأسئلة ٧–٢٢", "hot": "السؤالان ٢٣–٢٤", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَسْتَعْمِلُ حَقَائِقَ جَمْعِ الْعَدَدِ وَنَفْسِهِ؛ لِأَجِدَ نَاتِجَ الْجَمْعِ فِي حَقَائِقَ أُخْرَى.', ["أَبْدَأُ بِالْعَدَدِ وَنَفْسِهِ.", "أَزِيدُ ١ عَلَى النَّاتِجِ.", "أَنْقُصُ ١ مِنَ النَّاتِجِ."]),
    askSlide('engage', 'نتذكر', [["٦ + ٦ = ؟", ["١٢", "١١", "١٣"], "١٢"], ["٤ + ٤ = ؟", ["٨", "٧", "٩"], "٨"], ["٨ + ١ = ؟", ["٩", "٨", "٧"], "٩"]], 'ربط بالدرس ٢-٤.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: ٦ + ٧ أكبر من ٦ + ٦ بواحد، و٦ + ٥ أصغر منها بواحد.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ٤٨" kind="rule">أزيد ١ أو أنقص ١</SlideHead>
          <Intro>إِذَا عَرَفْتُ أَنَّ ٦ + ٦ = ١٢، فَيُمْكِنُنِي أَنْ أَجِدَ نَاتِجَ جَمْعِ ٦ + ٧، ٦ + ٥.</Intro>
          <Grid cols={3}>
            <Card kind="ex" cap="الْعَدَدُ وَنَفْسُهُ"><Towers a={6} b={6} colors={['#4fae3a', '#4fae3a']} k={0} size={16} /><Sentence t={[6, '+', 6, '=', { b: 12 }]} /></Card>
            <Card kind="ex" cap="الْعَدَدُ وَنَفْسُهُ مُضَافًا إِلَيْهِ ١"><Towers a={6} b={7} colors={['#4fae3a', '#d7302a']} k={1} size={16} /><Sentence t={[6, '+', 7, '=', { b: 13 }]} /></Card>
            <Card kind="ex" cap="الْعَدَدُ وَنَفْسُهُ مَطْرُوحًا مِنْهُ ١"><Towers a={6} b={5} colors={['#4fae3a', '#4fae3a']} k={2} size={16} /><Sentence t={[6, '+', 5, '=', { b: 11 }]} /></Card>
          </Grid>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٨ + ٩ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أستعمل العدد ونفسه', [["٥ + ٥ = ١٠، إِذَنْ ٥ + ٦ =", ["١١", "٩", "١٠"], "١١"], ["٣ + ٣ = ٦، إِذَنْ ٣ + ٢ =", ["٥", "٧", "٦"], "٥"], ["أَيُّ حَقِيقَةٍ تُسَاعِدُ عَلَى ٧ + ٨؟", ["٧ + ٧", "٧ + ١", "٨ + ١"], "٧ + ٧"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 2,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={60}>
          <TowerCard n={1} lines={[[3, '+', 3, '=', { b: 6 }], [3, '+', 4, '=', { b: 7 }]]} a={3} b={4} k={1} colors={['#4fae3a', '#f6c21c']} />
          <SentenceCard n={2} lines={[[7, '+', 7, '=', { b: 14 }], [7, '+', 8, '=', { b: 15 }]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={90}>
          <SentenceCard n={3} lines={[[2, '+', 2, '=', { b: 4 }], [2, '+', 1, '=', { b: 3 }]]} />
          <SentenceCard n={4} lines={[[5, '+', 5, '=', { b: 10 }], [5, '+', 6, '=', { b: 11 }]]} />
          <SentenceCard n={5} lines={[[9, '+', 9, '=', { b: 18 }], [9, '+', 8, '=', { b: 17 }]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={6} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ أَسْتَفِيدُ مِنْ حَقَائِقِ جَمْعِ الْعَدَدِ وَنَفْسِهِ فِي تَعَلُّمِ حَقَائِقِ جَمْعِ الْعَدَدِ وَنَفْسِهِ مُضَافًا إِلَيْهِ ١، أَوْ مَطْرُوحًا مِنْهُ ١؟"
          hint="مَاذَا تَغَيَّرَ فِي الْعَدَدِ الثَّانِي؟"
          steps={[
            { text: <Eq>٦ + ٦ = ١٢</Eq> },
            { text: 'أَزِيدُ ١ عَلَى النَّاتِجِ، أَوْ أَنْقُصُ ١ مِنْهُ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <SentenceCard n={7} lines={[[4, '+', 4, '=', { b: 8 }]]} />
          <SentenceCard n={8} lines={[[4, '+', 5, '=', { b: 9 }]]} />
          <SentenceCard n={9} lines={[[1, '+', 1, '=', { b: 2 }]]} />
          <SentenceCard n={10} lines={[[1, '+', 2, '=', { b: 3 }]]} />
          <SentenceCard n={11} lines={[[4, '+', 4, '=', { b: 8 }]]} />
          <SentenceCard n={12} lines={[[4, '+', 3, '=', { b: 7 }]]} />
          <SentenceCard n={13} lines={[[8, '+', 8, '=', { b: 16 }]]} />
          <SentenceCard n={14} lines={[[8, '+', 7, '=', { b: 15 }]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <SumCard n={15} sums={[{ a: 3, op: '+', b: 2, v: 5 }]} />
          <SumCard n={16} sums={[{ a: 7, op: '+', b: 8, v: 15 }]} />
          <SumCard n={17} sums={[{ a: 4, op: '+', b: 3, v: 7 }]} />
          <SumCard n={18} sums={[{ a: 8, op: '+', b: 7, v: 15 }]} />
          <SumCard n={19} sums={[{ a: 5, op: '+', b: 4, v: 9 }]} />
          <SumCard n={20} sums={[{ a: 8, op: '+', b: 9, v: 17 }]} />
          <SumCard n={21} sums={[{ a: 6, op: '+', b: 5, v: 11 }]} />
          <SumCard n={22} sums={[{ a: 9, op: '+', b: 9, v: 18 }]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={23} chart={null} time={120} intro="الْحِسُّ الْعَدَدِيُّ:"
          question={"أَكْتُبُ حَقَائِقَ جَمْعِ الْعَدَدِ وَنَفْسِهِ الَّتِي تُسَاعِدُنِي عَلَى أَنْ أَجِدَ نَاتِجَ ٧ + ٨."}
          hint="مَا الْعَدَدَانِ الْمُتَسَاوِيَانِ الْقَرِيبَانِ؟"
          steps={[
            { text: <Eq>٧ + ٧ = ١٤</Eq>, kind: 'ans', label: 'حَقِيقَةٌ' },
            { text: <Eq>٨ + ٨ = ١٦</Eq>, kind: 'ans', label: 'أَوْ' },
            { text: <Eq>٧ + ٨ = ١٥</Eq>, kind: 'ans', label: 'النَّاتِجُ' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={24} chart={null} time={120} intro="الْحِسُّ الْعَدَدِيُّ:"
          question={"أَكْتُبُ حَقَائِقَ جَمْعِ الْعَدَدِ وَنَفْسِهِ الَّتِي تُسَاعِدُنِي عَلَى أَنْ أَجِدَ نَاتِجَ ٥ + ٦."}
          hint="مَا الْعَدَدَانِ الْمُتَسَاوِيَانِ الْقَرِيبَانِ؟"
          steps={[
            { text: <Eq>٥ + ٥ = ١٠</Eq>, kind: 'ans', label: 'حَقِيقَةٌ' },
            { text: <Eq>٦ + ٦ = ١٢</Eq>, kind: 'ans', label: 'أَوْ' },
            { text: <Eq>٥ + ٦ = ١١</Eq>, kind: 'ans', label: 'النَّاتِجُ' },
          ]}
        />
      ),
    },
    mindSlide(<>الْعَدَدُ وَنَفْسُهُ<br />مَعَ ١</>, [{"cap": "أَبْدَأُ", "text": "٤ + ٤ = ٨"}, {"cap": "أَزِيدُ", "text": "٤ + ٥ = ٩"}, {"cap": "أَنْقُصُ", "text": "٤ + ٣ = ٧"}, {"cap": "أَتَذَكَّرُ", "text": "النَّاتِجُ يَزِيدُ وَاحِدًا أَوْ يَنْقُصُ وَاحِدًا"}]),
    exitSlide('أزيد أو أنقص', [["٢ + ٢ = ٤، إِذَنْ ٢ + ٣ =", ["٥", "٣", "٤"], "٥"], ["٦ + ٦ = ١٢، إِذَنْ ٦ + ٥ =", ["١١", "١٣", "١٢"], "١١"], ["٩ + ٨ = ؟", ["١٧", "١٨", "١٦"], "١٧"]]),
    endSlide,
  ],
});
