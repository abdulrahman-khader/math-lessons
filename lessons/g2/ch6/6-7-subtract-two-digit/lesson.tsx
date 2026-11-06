import {
  BookLabel, Cols, Eq, HBars, PlaceCard, PlaceSum, QCol, QuestionGroup, QuestionSlide, SlideHead, Solution, Step, SubMat, SumCard, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ١٥٢';
const PRACTICE = 'أتدرَّبُ، ص ١٥٣';
const FIND = 'أَجِدُ نَاتِجَ الطَّرْحِ مُسْتَعْمِلًا الْقِطَعَ:';
const SOLVE = 'أَحُلُّ الْمَسْأَلَةَ، ص ١٥٣';
const FIND2 = 'أَجِدُ نَاتِجَ الطَّرْحِ:';

export default defineLesson({
  meta: {
    id: 'g2-6-7-subtract-two-digit',
    design: 'v2',
    code: '٦-٧',
    title: 'طَرْحُ عَدَدَيْنِ كُلٌّ مِنْهُمَا مُكَوَّنٌ مِنْ رَقْمَيْنِ',
    shortTitle: 'طرح عددين من رقمين',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل السادس: طرح الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١٥٢–١٥٣',
    minutes: 45,
    idea: 'أَطْرَحُ عَدَدَيْنِ كُلٌّ مِنْهُمَا مُكَوَّنٌ مِنْ رَقْمَيْنِ.',
    bookQuestions: 14,
  },
  sectionDesc: {"engage": "أتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٤", "practice": "الأسئلة ٥–١٣", "hot": "السؤال ١٤", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَطْرَحُ عَدَدَيْنِ كُلٌّ مِنْهُمَا مُكَوَّنٌ مِنْ رَقْمَيْنِ.', ["أُفَكِّرُ: هَلْ تَكْفِي الآحَادُ؟", "أَطْرَحُ الآحَادَ.", "أَطْرَحُ الْعَشَرَاتِ."]),
    askSlide('engage', 'أتذكر', [["٣٢ − ٧ = ؟", ["٢٥", "٣٥", "٢٦"], "٢٥"], ["٦٤ − ٢١ = ؟", ["٤٣", "٤٥", "٨٥"], "٤٣"], ["٧٠ − ٣٠ = ؟", ["٤٠", "٤", "١٠٠"], "٤٠"]], 'ربط بالدرسين ٦-٣ و٦-٦.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: نعيد التجميع، ثم نطرح الآحاد، ثم العشرات.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٥٢" kind="rule">أجد ناتج الطرح ٥٢ − ١٧</SlideHead>
          <Cols even>
            <QCol>
              <Solution>
                <Step><BookLabel>الْخُطْوَةُ ١:</BookLabel> هَلْ نَسْتَطِيعُ أَنْ نَطْرَحَ ٧ آحَادٍ؟</Step>
                <Step><BookLabel>الْخُطْوَةُ ٢:</BookLabel> ٢ آحَادٍ + ١٠ آحَادٍ = ١٢ آحَادًا</Step>
              </Solution>
            </QCol>
            <PlaceSum nums={[52, 17]} op="−" table carry matHl />
            <SubMat a={52} b={17} />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٧٣ − ٤٨ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أطرح وأعيد التجميع', [["٤٢ − ١٨: مَاذَا نَكْتُبُ فَوْقَ الآحَادِ؟", ["١٢", "٢", "١٨"], "١٢"], ["٤٢ − ١٨: نَاتِجُ الآحَادِ؟", ["٤", "٦", "٨"], "٤"], ["٤٢ − ١٨ = ؟", ["٢٤", "٣٤", "٣٦"], "٢٤"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 6,
      notes: 'السؤال ٢ بلا إعادة تجميع.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={150}>
          <PlaceCard n={1} nums={[35, 17]} op="−" table carry />
          <PlaceCard n={2} nums={[47, 24]} op="−" table carry />
          <PlaceCard n={3} nums={[41, 16]} op="−" table carry />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ يَخْتَلِفُ طَرْحُ ٤١ − ١٦ عَنْ طَرْحِ ٤١ − ٦؟"
          hint="مَاذَا نَطْرَحُ فِي كُلِّ مَرَّةٍ؟"
          steps={[
            { text: <Eq>٤١ − ١٦ = ٢٥</Eq> },
            { text: <Eq>٤١ − ٦ = ٣٥</Eq> },
            { text: 'فِي ٤١ − ١٦ أَطْرَحُ الآحَادَ وَالْعَشَرَاتِ، وَفِي ٤١ − ٦ أَطْرَحُ الآحَادَ فَقَطْ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND2} cols={3} time={150}>
          <PlaceCard n={5} nums={[50, 24]} op="−" table carry />
          <PlaceCard n={6} nums={[82, 37]} op="−" table carry />
          <PlaceCard n={7} nums={[37, 29]} op="−" table carry />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'بلا جدول: الخط المنقط يفصل بين المنزلتين.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND2} cols={3} time={120}>
          <PlaceCard n={8} nums={[26, 19]} op="−" carry />
          <PlaceCard n={9} nums={[74, 18]} op="−" carry />
          <PlaceCard n={10} nums={[46, 23]} op="−" carry />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'بلا مربعات، كما في الكتاب.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND2} cols={3} time={90}>
          <SumCard n={11} sums={[{ a: 87, op: '−', b: 72, v: 15 }]} />
          <SumCard n={12} sums={[{ a: 34, op: '−', b: 26, v: 8 }]} />
          <SumCard n={13} sums={[{ a: 47, op: '−', b: 36, v: 11 }]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 4,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={14} chart={<HBars title="عَدَدُ الأَصْدَافِ الَّتِي جُمِعَتْ" labels={['إِيمَانُ', 'لُبْنَى', 'كَرِيمَةُ']} values={[14, 16, 8]} max={16} grid={2} lab={2} color="#f4a261" />} time={120}
          question={<><BookLabel>أَسْتَعْمِلُ الْبَيَانَاتِ:</BookLabel> أَضَعُ سُؤَالًا عَلَى الإِجَابَةِ الْمُعْطَاةِ مُسْتَعْمِلًا التَّمْثِيلَ الآتِيَ: إِذَا كَانَتِ الإِجَابَةُ «إِيمَانُ»، فَالسُّؤَالُ هُوَ: وَإِذَا كَانَتِ الإِجَابَةُ ٢٤، فَالسُّؤَالُ هُوَ:</>}
          hint="مَاذَا نَقْرَأُ مِنَ التَّمْثِيلِ لِكُلِّ بِنْتٍ؟"
          steps={[
            { text: <Eq>١٦ + ٨ = ٢٤</Eq> },
            { text: 'مَنْ جَمَعَتْ ١٤ صَدَفَةً؟', kind: 'ans', label: 'الإِجَابَةُ «إِيمَانُ»' },
            { text: 'كَمْ صَدَفَةً جَمَعَتْ لُبْنَى وَكَرِيمَةُ مَعًا؟', kind: 'ans', label: 'الإِجَابَةُ ٢٤' },
          ]}
        />
      ),
    },
    mindSlide(<>أَطْرَحُ رَقْمَيْنِ<br />مِنْ رَقْمَيْنِ</>, [{"cap": "أُفَكِّرُ", "text": "هَلْ تَكْفِي الآحَادُ؟"}, {"cap": "أَطْرَحُ", "text": "الآحَادَ أَوَّلًا"}, {"cap": "ثُمَّ", "text": "الْعَشَرَاتِ"}, {"cap": "مِثَالٌ", "text": "٥٢ − ١٧ = ٣٥"}]),
    exitSlide('أطرح عددين', [["٣٨ − ١٥ = ؟", ["٢٣", "٢٤", "٥٣"], "٢٣"], ["٦٣ − ٢٧ = ؟", ["٣٦", "٤٦", "٤٤"], "٣٦"], ["٨٠ − ٤٥ = ؟", ["٣٥", "٤٥", "٢٥"], "٣٥"]]),
    endSlide,
  ],
});
