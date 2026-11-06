import {
  BookLabel, Card, Cols, Eq, Goals, PlaceCard, PlaceSum, QuestionGroup, QuestionSlide, SlideHead, SubMat, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ١٤٢';
const PRACTICE = 'أتدرَّبُ، ص ١٤٣';
const FIND = 'أَجِدُ نَاتِجَ الطَّرْحِ مُسْتَعْمِلًا الْقِطَعَ:';
const SOLVE = 'أَحُلُّ الْمَسْأَلَةَ، ص ١٤٣';

export default defineLesson({
  meta: {
    id: 'g2-6-3-subtract-no-regroup',
    design: 'v2',
    code: '٦-٣',
    title: 'الطَّرْحُ بِدُونِ إِعَادَةِ التَّجْمِيعِ',
    shortTitle: 'الطرح بدون إعادة التجميع',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل السادس: طرح الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١٤٢–١٤٣',
    minutes: 45,
    idea: 'أَطْرَحُ عَدَدًا مُكَوَّنًا مِنْ رَقْمٍ وَاحِدٍ أَوْ مِنْ رَقْمَيْنِ مِنْ عَدَدٍ مُكَوَّنٍ مِنْ رَقْمَيْنِ بِدُونِ إِعَادَةِ تَجْمِيعٍ.',
    bookQuestions: 14,
  },
  sectionDesc: {"engage": "الآحاد والعشرات", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٤", "practice": "الأسئلة ٥–١٣", "hot": "السؤال ١٤", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَطْرَحُ عَدَدًا مِنْ عَدَدٍ مُكَوَّنٍ مِنْ رَقْمَيْنِ بِدُونِ إِعَادَةِ تَجْمِيعٍ.', ["أُمَثِّلُ الْعَدَدَ.", "أَطْرَحُ الآحَادَ.", "أَطْرَحُ الْعَشَرَاتِ."]),
    askSlide('engage', 'الآحاد والعشرات', [["٧٤ فِيهِ:", ["٧ عَشَرَاتٍ وَ٤ آحَادٍ", "٤ عَشَرَاتٍ وَ٧ آحَادٍ", "٧٤ عَشَرَةً"], "٧ عَشَرَاتٍ وَ٤ آحَادٍ"], ["٨ − ٣ = ؟", ["٤", "٥", "٦"], "٥"], ["٦٠ − ٢٠ = ؟", ["٤٠", "٨٠", "٤"], "٤٠"]], 'مراجعة المنازل.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: نطرح الآحاد أولًا، ثم العشرات. كل ضغطة خانة، وتُشطب القطع معها.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٤٢" kind="rule">أجد ناتج الطرح ٧٤ − ٥١</SlideHead>
          <Cols even>
            <SubMat a={74} b={51} />
            <PlaceSum nums={[74, 51]} op="−" table matHl />
            <Card kind="rule" cap="الْخُطُوَاتُ"><Goals items={['أُمَثِّلُ الْعَدَدَ ٧٤', 'أَطْرَحُ الآحَادَ', 'أَطْرَحُ الْعَشَرَاتِ']} /></Card>
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٩٦ − ٤٢ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أطرح المنزلتين', [["٤٨ − ٥ = ؟", ["٤٣", "٤٤", "٥٣"], "٤٣"], ["٦٧ − ٢٥ = ؟", ["٤٢", "٤٣", "٣٢"], "٤٢"], ["مِنْ أَيْنَ نَبْدَأُ؟", ["الآحَادِ", "الْعَشَرَاتِ", "الْعَدَدِ الأَصْغَرِ"], "الآحَادِ"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={120}>
          <PlaceCard n={1} nums={[17, 3]} op="−" table />
          <PlaceCard n={2} nums={[61, 50]} op="−" table />
          <PlaceCard n={3} nums={[34, 14]} op="−" table />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="مَا الرَّقْمُ الَّذِي سَأَحْصُلُ عَلَيْهِ فِي مَنْزِلَةِ الْعَشَرَاتِ عِنْدَمَا أَجِدُ نَاتِجَ الطَّرْحِ ٦٦ − ٦٤؟"
          hint="كَمْ عَشَرَةً فِي كُلِّ عَدَدٍ؟"
          steps={[
            { text: <Eq>٦ − ٦ = ٠</Eq> },
            { text: <Eq>٦٦ − ٦٤ = ٢</Eq> },
            { text: 'الرَّقْمُ ٠', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 6,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={150}>
          <PlaceCard n={5} nums={[29, 3]} op="−" table />
          <PlaceCard n={6} nums={[67, 5]} op="−" table />
          <PlaceCard n={7} nums={[48, 4]} op="−" table />
          <PlaceCard n={8} nums={[54, 2]} op="−" table />
          <PlaceCard n={9} nums={[65, 3]} op="−" table />
          <PlaceCard n={10} nums={[39, 12]} op="−" table />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={90}>
          <PlaceCard n={11} nums={[94, 21]} op="−" table />
          <PlaceCard n={12} nums={[55, 14]} op="−" table />
          <PlaceCard n={13} nums={[82, 12]} op="−" table />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={14} chart={null} time={120}
          question={<><BookLabel>الْحِسُّ الْعَدَدِيُّ:</BookLabel> مَعَ عَبْدِ الرَّحْمَنِ ٣٠ كُرَةً زُجَاجِيَّةً فِي حَقِيبَةٍ، وَ٢٠ كُرَةً زُجَاجِيَّةً فِي حَقِيبَةٍ أُخْرَى. أَعْطَى ١٠ كُرَاتٍ مِنْهَا لِأَخِيهِ سُعُودٍ. كَمْ كُرَةً زُجَاجِيَّةً بَقِيَتْ مَعَ عَبْدِ الرَّحْمَنِ؟</>}
          hint="كَمْ كُرَةً مَعَهُ قَبْلَ أَنْ يُعْطِيَ؟"
          steps={[
            { text: <Eq>٣٠ + ٢٠ = ٥٠</Eq> },
            { text: <Eq>٥٠ − ١٠ = ٤٠</Eq> },
            { text: '٤٠ كُرَةً زُجَاجِيَّةً', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>الطَّرْحُ بِدُونِ<br />إِعَادَةِ التَّجْمِيعِ</>, [{"cap": "أُمَثِّلُ", "text": "الْعَدَدَ الأَوَّلَ"}, {"cap": "أَطْرَحُ", "text": "الآحَادَ مِنَ الآحَادِ"}, {"cap": "ثُمَّ", "text": "الْعَشَرَاتِ مِنَ الْعَشَرَاتِ"}, {"cap": "أَنْتَبِهُ", "text": "كُلُّ رَقْمٍ فِي مَنْزِلَتِهِ"}]),
    exitSlide('أطرح المنزلتين', [["٣٨ − ٥ = ؟", ["٣٣", "٣٤", "٤٣"], "٣٣"], ["٧٦ − ٢٤ = ؟", ["٥٢", "٥٠", "٩٠"], "٥٢"], ["٩٩ − ٤٥ = ؟", ["٥٤", "٤٥", "٥٥"], "٥٤"]]),
    endSlide,
  ],
});
