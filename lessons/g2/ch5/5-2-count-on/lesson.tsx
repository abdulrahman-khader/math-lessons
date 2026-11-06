import {
  BookLabel, Card, Cols, Eq, QCard, QText, QuestionGroup, QuestionSlide, RegroupExplorer, Sentence, SentenceCard, SlideHead, Solution, Step, SumCard, TenOnes,
  askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ١١٢';
const PRACTICE = 'أتدرَّبُ، ص ١١٣';
const SOLVE = 'أَحُلُّ الْمَسْأَلَةَ، ص ١١٣';
const FIND = 'أَجْمَعُ بِالْعَدِّ التَّصَاعُدِيِّ مُسْتَعْمِلًا الْقِطَعَ:';

type Q = { n: number; a: number; b: number };
const S = ({ n, a, b }: Q) => <SentenceCard n={n} lines={[[a, '+', b, '=', { b: a + b }]]} />;
const V = ({ n, a, b }: Q) => <SumCard n={n} sums={[{ a, op: '+', b, v: a + b }]} />;
const B = ({ n, a, b }: Q) => (
  <QCard n={n} className="tenscard">
    <TenOnes values={[a, b]} />
    <Sentence t={[a, '+', b, '=', { b: a + b }]} />
  </QCard>
);

export default defineLesson({
  meta: {
    id: 'g2-5-2-count-on',
    design: 'v2',
    code: '٥-٢',
    title: 'الْجَمْعُ بِالْعَدِّ التَّصَاعُدِيِّ',
    shortTitle: 'الجمع بالعد التصاعدي',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الخامس: جمع الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١١٢–١١٣',
    minutes: 45,
    idea: 'أَجْمَعُ بِالْعَدِّ التَّصَاعُدِيِّ.',
    bookQuestions: 24,
  },
  sectionDesc: {
    engage: 'جمع العشرات',
    explore: 'أعدّ بالآحاد والعشرات',
    explain: 'أستعد',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٧',
    practice: 'الأسئلة ٨–٢٣',
    hot: 'السؤال ٢٤',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    goalsSlide('أَجْمَعُ بِالْعَدِّ التَّصَاعُدِيِّ.', ['أَعُدُّ تَصَاعُدِيًّا بِالآحَادِ.', 'أَعُدُّ تَصَاعُدِيًّا بِالْعَشَرَاتِ.', 'أَخْتَارُ كَيْفَ أَعُدُّ.']),
    askSlide('engage', 'جمع العشرات', [
      ['٣٠ + ٢٠ = ؟', ['٥', '٥٠', '٣٢'], '٥٠'],
      ['٦٠ + ١٠ = ؟', ['٧٠', '٦١', '٥٠'], '٧٠'],
      ['مَا الْعَدَدُ بَعْدَ ٢٩؟', ['٢٨', '٣٠', '٣٩'], '٣٠'],
    ], 'ربط بالدرس ٥-١.'),
    {
      sec: 'explore', min: 4,
      notes: 'ادعُ طالبًا: يضيف آحادًا مرة ثم عشرة مرة. اسأل: أيّ رقم يتغير في كل مرة؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">أعدّ بالآحاد والعشرات</SlideHead>
          <RegroupExplorer start={23} />
        </>
      ),
    },
    {
      sec: 'explain', min: 4,
      notes: 'أنا أعمل: نبدأ بالعدد الأكبر ونعدّ. نعدّ بالآحاد عند جمع ٣، وبالعشرات عند جمع ٣٠.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١١٢" kind="rule">أعدّ تصاعديًّا</SlideHead>
          <Cols even>
            <Card kind="ex" cap="أَجِدُ نَاتِجَ الْجَمْعِ ٢٦ + ٣">
              <QText>أَعُدُّ تَصَاعُدِيًّا بِالآحَادِ.</QText>
              <Solution>
                <Step>أَبْدَأُ بِالْعَدَدِ ٢٦، ثُمَّ أَعُدُّ تَصَاعُدِيًّا ٢٧، ٢٨، ٢٩</Step>
                <Step kind="ans" label="نَاتِجُ الْجَمْعِ"><Eq>٢٦ + ٣ = ٢٩</Eq></Step>
              </Solution>
            </Card>
            <Card kind="ex" cap="أَجِدُ نَاتِجَ الْجَمْعِ ٢٦ + ٣٠">
              <QText>أَعُدُّ تَصَاعُدِيًّا بِالْعَشَرَاتِ.</QText>
              <Solution>
                <Step>أَبْدَأُ بِالْعَدَدِ ٢٦، ثُمَّ أَعُدُّ تَصَاعُدِيًّا ٣٦، ٤٦، ٥٦</Step>
                <Step kind="ans" label="نَاتِجُ الْجَمْعِ"><Eq>٢٦ + ٣٠ = ٥٦</Eq></Step>
              </Solution>
            </Card>
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: مثال غير مثال الكتاب. أوقفه قبل الناتج واسأل: كم سنعدّ؟'),
    askSlide('elab', 'أعدّ تصاعديًّا', [
      ['٤١ + ٢ = ؟', ['٤٢', '٤٣', '٦١'], '٤٣'],
      ['٤١ + ٢٠ = ؟', ['٤٣', '٥١', '٦١'], '٦١'],
      ['كَيْفَ أَعُدُّ لِأَجْمَعَ ٣٠؟', ['بِالآحَادِ', 'بِالْعَشَرَاتِ', 'بِالْمِئَاتِ'], 'بِالْعَشَرَاتِ'],
    ], 'نعمل معًا: اختر طالبًا بالعجلة، واطلب منه العدّ بصوت عالٍ.'),
    {
      sec: 'check', min: 6,
      notes: 'اطلب من الطالب أن يعدّ بصوت عالٍ ويشير إلى القطع.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={120}>
          <B n={1} a={47} b={2} />
          <B n={2} a={47} b={20} />
          <B n={3} a={13} b={3} />
          <B n={4} a={13} b={30} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'بلا قطع: نبدأ بالعدد الأكبر حتى لو جاء ثانيًا.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={60}>
          <S n={5} a={5} b={24} />
          <S n={6} a={60} b={32} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: ٤٠ فيها ٤ عشرات.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَمْ عَشَرَةً أَعُدُّ تَصَاعُدِيًّا لِأَجْمَعَ ٣٢ + ٤٠؟ أُوَضِّحُ إِجَابَتِي."
          hint="كَمْ عَشَرَةً فِي الْعَدَدِ ٤٠؟"
          steps={[
            { text: 'فِي ٤٠ أَرْبَعُ عَشَرَاتٍ.' },
            { text: 'نَبْدَأُ مِنْ ٣٢: ٤٢، ٥٢، ٦٢، ٧٢' },
            { text: '٤ عَشَرَاتٍ', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 6,
      notes: 'كل ضغطة ناتج سؤال. اسأل: هل نعدّ بالآحاد أم بالعشرات؟',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={180}>
          <S n={8} a={66} b={3} />
          <S n={9} a={12} b={70} />
          <S n={10} a={12} b={2} />
          <S n={11} a={25} b={10} />
          <S n={12} a={53} b={20} />
          <S n={13} a={3} b={14} />
          <S n={14} a={66} b={30} />
          <S n={15} a={20} b={76} />
          <S n={16} a={32} b={1} />
          <S n={17} a={30} b={32} />
          <S n={18} a={3} b={32} />
          <S n={19} a={40} b={44} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'الجمع الرأسي بالعدّ التصاعدي.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={90}>
          <V n={20} a={3} b={44} />
          <V n={21} a={10} b={88} />
          <V n={22} a={1} b={88} />
          <V n={23} a={32} b={20} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 4,
      notes: 'نحل الجزأين: الأحمر بالعدّ بالآحاد، والأخضر بالعدّ بالعشرات.',
      content: (
        <QuestionSlide
          source={SOLVE} n={24} chart={null} long
          question={<><BookLabel>الْحِسُّ الْعَدَدِيُّ:</BookLabel> سَجَّلَ كُلٌّ مِنَ الْفَرِيقِ الأَحْمَرِ وَالْفَرِيقِ الأَخْضَرِ ٢٥ نُقْطَةً لِكُلٍّ مِنْهُمَا فِي الشَّوْطِ الأَوَّلِ مِنْ مُبَارَاةِ كُرَةِ السَّلَّةِ، وَقَبْلَ انْتِهَاءِ الشَّوْطِ الأَوَّلِ سَجَّلَ الْفَرِيقُ الأَحْمَرُ ٣ نِقَاطٍ أُخْرَى. مَا مَجْمُوعُ النِّقَاطِ الَّتِي أَحْرَزَهَا الْفَرِيقُ الأَحْمَرُ؟ وَفِي الشَّوْطِ الثَّانِي أَحْرَزَ الْفَرِيقُ الأَخْضَرُ ٣٠ نُقْطَةً أُخْرَى. مَا مَجْمُوعُ النِّقَاطِ الَّتِي أَحْرَزَهَا الْفَرِيقُ الأَخْضَرُ؟</>}
          hint="هَلْ نَعُدُّ بِالآحَادِ أَمْ بِالْعَشَرَاتِ؟"
          steps={[
            { text: <>الأَحْمَرُ: <Eq>٢٥ + ٣ = ٢٨</Eq>، الأَخْضَرُ: <Eq>٢٥ + ٣٠ = ٥٥</Eq></> },
            { text: '٢٨ نُقْطَةً', kind: 'ans', label: 'الْفَرِيقُ الأَحْمَرُ' },
            { text: '٥٥ نُقْطَةً', kind: 'ans', label: 'الْفَرِيقُ الأَخْضَرُ' },
          ]}
        />
      ),
    },
    mindSlide(<>الْعَدُّ<br />التَّصَاعُدِيُّ</>, [
      { cap: 'أَبْدَأُ', text: 'بِالْعَدَدِ الأَكْبَرِ' },
      { cap: 'الآحَادُ', text: '٢٦، ٢٧، ٢٨، ٢٩' },
      { cap: 'الْعَشَرَاتُ', text: '٢٦، ٣٦، ٤٦، ٥٦' },
      { cap: 'أَنْتَبِهُ', text: 'الْعَشَرَةُ تُغَيِّرُ رَقْمَ الْعَشَرَاتِ' },
    ]),
    exitSlide('أعدّ تصاعديًّا', [
      ['٣٥ + ٢ = ؟', ['٣٧', '٥٥', '٣٦'], '٣٧'],
      ['٣٥ + ٣٠ = ؟', ['٣٨', '٦٥', '٤٥'], '٦٥'],
      ['٤ + ٥٢ = ؟', ['٥٦', '٩٢', '٦٢'], '٥٦'],
    ]),
    endSlide,
  ],
});
