import {
  BookLabel, Cols, Eq, PlaceCard, PlaceMat, PlaceSum, QCol, QuestionGroup, QuestionSlide, SlideHead, Solution, Step, SubMat, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ١٥٠';
const PRACTICE = 'أتدرَّبُ، ص ١٥١';
const FIND = 'أَجِدُ نَاتِجَ الطَّرْحِ مُسْتَعْمِلًا الْقِطَعَ:';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٥١';

export default defineLesson({
  meta: {
    id: 'g2-6-6-subtract-one-digit',
    design: 'v2',
    code: '٦-٦',
    title: 'طَرْحُ عَدَدٍ مُكَوَّنٍ مِنْ رَقْمٍ وَاحِدٍ مِنْ عَدَدٍ مُكَوَّنٍ مِنْ رَقْمَيْنِ',
    shortTitle: 'طرح عدد من رقم من عدد من رقمين',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل السادس: طرح الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١٥٠–١٥١',
    minutes: 45,
    idea: 'أَطْرَحُ عَدَدًا مُكَوَّنًا مِنْ رَقْمٍ وَاحِدٍ مِنْ عَدَدٍ مُكَوَّنٍ مِنْ رَقْمَيْنِ.',
    bookQuestions: 11,
  },
  sectionDesc: {"engage": "أتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٤", "practice": "الأسئلة ٥–١٠", "hot": "السؤال ١١", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَطْرَحُ عَدَدًا مُكَوَّنًا مِنْ رَقْمٍ وَاحِدٍ مِنْ عَدَدٍ مُكَوَّنٍ مِنْ رَقْمَيْنِ.', ["أُفَكِّرُ: هَلْ تَكْفِي الآحَادُ؟", "أَكْتُبُ إِعَادَةَ التَّجْمِيعِ فِي الْمُرَبَّعَيْنِ.", "أَطْرَحُ الآحَادَ ثُمَّ الْعَشَرَاتِ."]),
    askSlide('engage', 'أتذكر', [["٣١ − ٤ = ؟", ["٢٧", "٣٧", "٣٥"], "٢٧"], ["٤ آحَادٍ + ١٠ آحَادٍ =", ["١٤ آحَادًا", "٥ آحَادٍ", "٤٠"], "١٤ آحَادًا"], ["١٤ − ٦ = ؟", ["٨", "٧", "٩"], "٨"]], 'ربط بالدرس ٦-٤.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: نكتب ٢ و١٤ في المربعين، ونشطب ٣ و٤، ثم نطرح.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٥٠" kind="rule">أجد ناتج الطرح ٣٤ − ٦</SlideHead>
          <Cols even>
            <QCol>
              <Solution>
                <Step><BookLabel>الْخُطْوَةُ ١:</BookLabel> هَلْ نَسْتَطِيعُ أَنْ نَطْرَحَ ٦ آحَادٍ؟</Step>
                <Step><BookLabel>الْخُطْوَةُ ٢:</BookLabel> نُعِيدُ تَجْمِيعَ عَشَرَةٍ وَاحِدَةٍ إِلَى ١٠ آحَادٍ: ٤ آحَادٍ + ١٠ آحَادٍ = ١٤ آحَادًا</Step>
              </Solution>
            </QCol>
            <PlaceSum nums={[34, 6]} op="−" table carry matHl />
            <SubMat a={34} b={6} />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٦٢ − ٨ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أين أكتب؟', [["٤٣ − ٧: مَاذَا نَكْتُبُ فَوْقَ الآحَادِ؟", ["١٣", "٣", "٤"], "١٣"], ["٤٣ − ٧: مَاذَا نَكْتُبُ فَوْقَ الْعَشَرَاتِ؟", ["٣", "٤", "٥"], "٣"], ["٤٣ − ٧ = ؟", ["٣٦", "٤٦", "٣٤"], "٣٦"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 6,
      notes: 'كل ضغطة خانة. السؤال ٢ بلا إعادة تجميع: يبقى المربعان فارغين.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={150}>
          <PlaceCard n={1} nums={[23, 5]} op="−" table carry />
          <PlaceCard n={2} nums={[58, 4]} op="−" table carry />
          <PlaceCard n={3} nums={[26, 9]} op="−" table carry />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ أُعِيدُ تَجْمِيعَ عَشَرَةٍ وَاحِدَةٍ؟"
          hint="كَمْ آحَادًا فِي الْعَشَرَةِ؟"
          steps={[
            { text: 'أَفُكُّ عَشَرَةً وَاحِدَةً مِنَ الْعَشَرَاتِ.' },
            { text: 'أُبْدِلُهَا بِـ ١٠ آحَادٍ أَضُمُّهَا إِلَى الآحَادِ، فَتَنْقُصُ الْعَشَرَاتُ وَاحِدَةً.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={150}>
          <PlaceCard n={5} nums={[27, 8]} op="−" table carry />
          <PlaceCard n={6} nums={[32, 7]} op="−" table carry />
          <PlaceCard n={7} nums={[36, 5]} op="−" table carry />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={150}>
          <PlaceCard n={8} nums={[34, 7]} op="−" table carry />
          <PlaceCard n={9} nums={[74, 3]} op="−" table carry />
          <PlaceCard n={10} nums={[54, 4]} op="−" table carry />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={11} chart={<PlaceMat a={46} />} time={120}
          question={<><BookLabel>التَّفْكِيرُ النَّاقِدُ:</BookLabel> لَدَيَّ ٦ آحَادٍ وَ٤ عَشَرَاتٍ فِي الْجَدْوَلِ الْمُجَاوِرِ. مَا أَكْبَرُ رَقْمٍ مِنَ الآحَادِ يُمْكِنُ أَنْ أَطْرَحَهُ دُونَ الْحَاجَةِ إِلَى إِعَادَةِ التَّجْمِيعِ؟ كَيْفَ أَعْرِفُ ذَلِكَ؟</>}
          hint="كَمْ آحَادًا فِي الْجَدْوَلِ؟"
          steps={[
            { text: 'فِي الْجَدْوَلِ ٦ آحَادٍ.' },
            { text: 'نَطْرَحُ رَقْمًا لَا يَزِيدُ عَلَى ٦.' },
            { text: <Eq>٤٦ − ٦ = ٤٠</Eq> },
            { text: '٦', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>أَطْرَحُ رَقْمًا<br />مِنْ رَقْمَيْنِ</>, [{"cap": "أُفَكِّرُ", "text": "هَلْ تَكْفِي الآحَادُ؟"}, {"cap": "أُعِيدُ التَّجْمِيعَ", "text": "٣٤ تَصِيرُ ٢ عَشَرَاتٍ وَ١٤ آحَادًا"}, {"cap": "أَطْرَحُ", "text": "الآحَادَ، ثُمَّ الْعَشَرَاتِ"}, {"cap": "مِثَالٌ", "text": "٣٤ − ٦ = ٢٨"}]),
    exitSlide('أطرح وأعيد التجميع', [["٢٥ − ٧ = ؟", ["١٨", "٢٨", "١٢"], "١٨"], ["٤٠ − ٣ = ؟", ["٣٧", "٤٣", "٣٣"], "٣٧"], ["٦١ − ٩ = ؟", ["٥٢", "٦٨", "٥٨"], "٥٢"]]),
    endSlide,
  ],
});
