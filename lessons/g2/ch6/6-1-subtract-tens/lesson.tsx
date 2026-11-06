import {
  Blank, BookLabel, Eq, Lines, QText, QuestionGroup, QuestionSlide, Sentence, SentenceCard, SlideHead, SumCard, TenOnes, TensCard, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ١٣٨';
const PRACTICE = 'أتدرَّبُ، ص ١٣٩';
const FIND = 'أَسْتَعْمِلُ حَقَائِقَ الطَّرْحِ وَالْقِطَعَ؛ لِأَجِدَ نَاتِجَ الطَّرْحِ:';
const SOLVE = 'أَحُلُّ الْمَسْأَلَةَ، ص ١٣٩';

export default defineLesson({
  meta: {
    id: 'g2-6-1-subtract-tens',
    design: 'v2',
    code: '٦-١',
    title: 'طَرْحُ الْعَشَرَاتِ',
    shortTitle: 'طرح العشرات',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل السادس: طرح الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١٣٨–١٣٩',
    minutes: 45,
    idea: 'أَطْرَحُ الْعَشَرَاتِ بِاسْتِعْمَالِ حَقَائِقِ الطَّرْحِ.',
    bookQuestions: 22,
  },
  sectionDesc: {"engage": "حقائق الطرح", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٧", "practice": "الأسئلة ٨–٢١", "hot": "السؤال ٢٢", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَطْرَحُ الْعَشَرَاتِ بِاسْتِعْمَالِ حَقَائِقِ الطَّرْحِ.', ["أَقْرَأُ الْعَشَرَاتِ مِنَ الْقِطَعِ.", "أَطْرَحُ الْعَشَرَاتِ كَمَا أَطْرَحُ الآحَادَ.", "أَكْتُبُ نَاتِجَ الطَّرْحِ."]),
    askSlide('engage', 'حقائق الطرح', [["٧ − ٤ = ؟", ["٣", "٤", "٥"], "٣"], ["٩ − ٦ = ؟", ["٣", "٥", "٦"], "٣"], ["٥ − ١ = ؟", ["٣", "٤", "٦"], "٤"]], 'مراجعة حقائق الطرح التي سنستعملها.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: أعرف أن ٥ − ١ = ٤، إذن ٥٠ − ١٠ = ٤٠.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٣٨" kind="rule">حقائق الطرح تساعدني</SlideHead>
          <QText>حَقَائِقُ الطَّرْحِ تُسَاعِدُنِي عَلَى طَرْحِ الْعَشَرَاتِ.</QText>
          <TenOnes values={[50]} cross={[1, 0]} big />
          <Lines>
            <div className="tenline"><b>٥</b> عَشَرَاتٍ − <b>١</b> عَشَرَاتٍ = <Blank v={4} /> عَشَرَاتٍ</div>
            <Sentence t={[50, '−', 10, '=', { b: 40 }]} big />
          </Lines>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٨٠ − ٥٠ بعلب الأقلام (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أطرح العشرات', [["٧٠ − ٢٠ = ؟", ["٥٠", "٩٠", "٥"], "٥٠"], ["٩٠ − ٣٠ = ؟", ["٦", "٦٠", "٧٠"], "٦٠"], ["أَيُّ حَقِيقَةٍ تُسَاعِدُنَا عَلَى ٦٠ − ٤٠؟", ["٦ − ٤", "٦ + ٤", "٤ − ٢"], "٦ − ٤"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 5,
      notes: 'كل ضغطة خانة: العشرات، ثم الجملة بالأعداد.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={120}>
          <TensCard n={1} a={60} b={40} op="−" rods />
          <TensCard n={2} a={40} b={20} op="−" rods />
          <TensCard n={3} a={30} b={10} op="−" />
          <TensCard n={4} a={50} b={20} op="−" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'بلا قطع.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={60}>
          <SentenceCard n={5} lines={[[80, '−', 40, '=', { b: 40 }]]} />
          <SentenceCard n={6} lines={[[70, '−', 30, '=', { b: 40 }]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ أَسْتَفِيدُ مِنْ حَقِيقَةِ الطَّرْحِ ٩ − ٦ لِأَجِدَ النَّاتِجَ ٩٠ − ٦٠؟"
          hint="كَمْ عَشَرَةً فِي ٩٠؟ وَكَمْ عَشَرَةً فِي ٦٠؟"
          steps={[
            { text: <Eq>٩ − ٦ = ٣</Eq> },
            { text: '٩ عَشَرَاتٍ − ٦ عَشَرَاتٍ = ٣ عَشَرَاتٍ' },
            { text: <Eq>٩٠ − ٦٠ = ٣٠</Eq>, kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={2} time={120}>
          <TensCard n={8} a={40} b={30} op="−" rods />
          <TensCard n={9} a={60} b={30} op="−" rods />
          <TensCard n={10} a={50} b={30} op="−" />
          <TensCard n={11} a={60} b={10} op="−" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <SentenceCard n={12} lines={[[60, '−', 20, '=', { b: 40 }]]} />
          <SentenceCard n={13} lines={[[70, '−', 40, '=', { b: 30 }]]} />
          <SumCard n={14} sums={[{ a: 20, op: '−', b: 10, v: 10 }]} />
          <SumCard n={15} sums={[{ a: 80, op: '−', b: 30, v: 50 }]} />
          <SumCard n={16} sums={[{ a: 70, op: '−', b: 60, v: 10 }]} />
          <SumCard n={17} sums={[{ a: 90, op: '−', b: 50, v: 40 }]} />
          <SumCard n={18} sums={[{ a: 50, op: '−', b: 40, v: 10 }]} />
          <SumCard n={19} sums={[{ a: 80, op: '−', b: 20, v: 60 }]} />
          <SumCard n={20} sums={[{ a: 90, op: '−', b: 70, v: 20 }]} />
          <SumCard n={21} sums={[{ a: 60, op: '−', b: 40, v: 20 }]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={22} chart={null} time={120}
          question={<><BookLabel>الْحِسُّ الْعَدَدِيُّ:</BookLabel> اشْتَرَتْ نُورَةُ ٧٠ قَلَمًا؛ مِنْهَا ٢٠ قَلَمًا أَزْرَقَ، وَالْبَاقِي أَقْلَامٌ خَضْرَاءُ. كَمْ قَلَمًا أَخْضَرَ اشْتَرَتْ نُورَةُ؟</>}
          hint="مَاذَا تَعْنِي كَلِمَةُ «الْبَاقِي»؟"
          steps={[
            { text: '٧٠ قَلَمًا، مِنْهَا ٢٠ أَزْرَقُ.' },
            { text: 'نَطْرَحُ لِنَعْرِفَ الْبَاقِيَ.' },
            { text: <Eq>٧٠ − ٢٠ = ٥٠</Eq> },
            { text: '٥٠ قَلَمًا أَخْضَرَ', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>طَرْحُ<br />الْعَشَرَاتِ</>, [{"cap": "الْحَقِيقَةُ", "text": "٥ − ٢ = ٣"}, {"cap": "الْعَشَرَاتُ", "text": "٥ عَشَرَاتٍ − ٢ عَشَرَاتٍ = ٣ عَشَرَاتٍ"}, {"cap": "الأَعْدَادُ", "text": "٥٠ − ٢٠ = ٣٠"}, {"cap": "أَنْتَبِهُ", "text": "النَّاتِجُ عَشَرَاتٌ، لَا آحَادٌ"}]),
    exitSlide('أطرح العشرات', [["٥٠ − ٣٠ = ؟", ["٢", "٢٠", "٨٠"], "٢٠"], ["٨٠ − ٦٠ = ؟", ["٢٠", "٢٠٠", "٤٠"], "٢٠"], ["٩٠ − ٤٠ = ؟", ["٥٠", "٦٠", "١٣٠"], "٥٠"]]),
    endSlide,
  ],
});
