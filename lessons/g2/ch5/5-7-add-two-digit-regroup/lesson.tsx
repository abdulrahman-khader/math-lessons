import {
  BookLabel, Cols, DataTable, Eq, PlaceCard, PlaceMat, PlaceSum, QCol, QuestionGroup, QuestionSlide, SlideHead, Solution, Step, SumCard,
  askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide, storySlide, RegroupExplorer,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

const CHECK = 'أتأكَّدُ، ص ١٢٤';
const PRACTICE = 'أتدرَّبُ، ص ١٢٥';
const SOLVE = 'أَحُلُّ الْمَسْأَلَةَ، ص ١٢٥';
const FIND = 'أَجِدُ نَاتِجَ الْجَمْعِ مُسْتَعْمِلًا الْقِطَعَ:';

type Q = { n: number; a: number; b: number };
const T = ({ n, a, b }: Q) => <PlaceCard n={n} nums={[a, b]} table carry />;
const D = ({ n, a, b }: Q) => <PlaceCard n={n} nums={[a, b]} carry />;
const V = ({ n, a, b }: Q) => <SumCard n={n} sums={[{ a, op: '+', b, v: a + b }]} />;

export default defineLesson({
  meta: {
    id: 'g2-5-7-add-two-digit-regroup',
    design: 'v2',
    code: '٥-٧',
    title: 'جَمْعُ عَدَدَيْنِ مُكَوَّنَيْنِ مِنْ رَقْمَيْنِ بِإِعَادَةِ التَّجْمِيعِ',
    shortTitle: 'جمع عددين من رقمين بإعادة التجميع',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الخامس: جمع الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١٢٤–١٢٥',
    minutes: 45,
    idea: 'أَجْمَعُ عَدَدَيْنِ يَتَكَوَّنُ كُلٌّ مِنْهُمَا مِنْ رَقْمَيْنِ مَعَ إِعَادَةِ التَّجْمِيعِ.',
    bookQuestions: 17,
  },
  sectionDesc: {
    engage: 'أتذكر',
    explain: 'أستعد',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٧',
    practice: 'الأسئلة ٨–١٦',
    hot: 'السؤال ١٧',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    goalsSlide('أَجْمَعُ عَدَدَيْنِ يَتَكَوَّنُ كُلٌّ مِنْهُمَا مِنْ رَقْمَيْنِ مَعَ إِعَادَةِ التَّجْمِيعِ.', ['أَجْمَعُ الآحَادَ وَأُعِيدُ التَّجْمِيعَ.', 'أَكْتُبُ الْعَشَرَةَ فِي مَنْزِلَةِ الْعَشَرَاتِ.', 'أَجْمَعُ ثَلَاثَةَ أَرْقَامٍ فِي الْعَشَرَاتِ.']),
    askSlide('engage', 'أتذكر', [
      ['٢٨ + ٤ = ؟', ['٣٢', '٢٢', '٣٣'], '٣٢'],
      ['٣١ + ٢٥ = ؟', ['٥٦', '٥٥', '٦٦'], '٥٦'],
      ['١ + ٢ + ٣ = ؟', ['٥', '٦', '٧'], '٦'],
    ], 'ربط بالدرسين ٥-٤ و٥-٦.'),
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند السؤال واسأل: ماذا نفعل بالكرات السائبة الـ١٥؟'),
    {
      sec: 'explore', min: 4,
      notes: 'مثال جديد غير القصة: معنا ٢٩ ونضيف ٣٤. نضيف الآحاد أولًا، ونعيد التجميع حين تصير ١٠ أو أكثر، ثم نضيف العشرات الثلاث.',
      content: (
        <>
          <SlideHead tag="نُجَرِّبُ مِثَالًا آخَرَ" kind="ex">نَجْمَعُ وَنُعِيدُ التَّجْمِيعَ</SlideHead>
          <RegroupExplorer start={29} add={3} addOnes={4} />
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: نكتب ١٣ كاملة في منزلة الآحاد، ولأن المنزلة لا تتّسع لرقمين يصعد ١ إلى العشرات؛ في العشرات ثلاثة أرقام: المحمول والرقمان.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٢٤" kind="rule">أجد ناتج الجمع ١٨ + ٢٥</SlideHead>
          <Cols even>
            <QCol>
              <Solution>
                <Step hl={['n0']}><BookLabel>الْخُطْوَةُ ١:</BookLabel> نَجْمَعُ الآحَادَ: <Eq>٨ + ٥ = ١٣</Eq></Step>
                <Step>لَا يَكُونُ فِي الْمَنْزِلَةِ رَقْمَانِ</Step>
                <Step hl={['n1']}><BookLabel>الْخُطْوَةُ ٢:</BookLabel> نُعِيدُ التَّجْمِيعَ: يَصْعَدُ ١ إِلَى الْعَشَرَاتِ</Step>
                <Step hl={['n2']}><BookLabel>الْخُطْوَةُ ٣:</BookLabel> نَجْمَعُ الْعَشَرَاتِ: <Eq>١ + ١ + ٢ = ٤</Eq></Step>
              </Solution>
            </QCol>
            <PlaceSum nums={[18, 25]} table carry sync />
            <PlaceMat a={18} b={25} />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٣٧ + ٢٦ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أجمع وأعيد التجميع', [
      ['٢٧ + ١٦: نَاتِجُ الآحَادِ؟', ['١٣', '٣', '٩'], '١٣'],
      ['٢٧ + ١٦: نَاتِجُ الْعَشَرَاتِ مَعَ الْمَحْمُولِ؟', ['٣', '٤', '٥'], '٤'],
      ['٢٧ + ١٦ = ؟', ['٣٣', '٤٣', '٤٤'], '٤٣'],
    ], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 5,
      notes: 'السؤال ٢ بلا إعادة تجميع: يبقى المربع فارغًا.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={150}>
          <T n={1} a={47} b={29} />
          <T n={2} a={12} b={24} />
          <T n={3} a={15} b={16} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 3,
      notes: 'بلا جدول.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={90}>
          <D n={4} a={82} b={14} />
          <D n={5} a={15} b={19} />
          <D n={6} a={33} b={17} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: السؤال الثاني هو ١٢ + ٢٤.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="مَا أَوَّلُ خُطْوَةٍ أَقُومُ بِهَا لِأَحُلَّ السُّؤَالَ الثَّانِيَ؟"
          hint="مِنْ أَيِّ مَنْزِلَةٍ نَبْدَأُ؟"
          steps={[
            { text: 'السُّؤَالُ الثَّانِي: ١٢ + ٢٤' },
            { text: <>أَجْمَعُ الآحَادَ أَوَّلًا: <Eq>٢ + ٤ = ٦</Eq></>, kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'أتذكر من الكتاب: أكتب العشرة الناتجة عن جمع الآحاد في منزلة العشرات.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={150}>
          <T n={8} a={14} b={35} />
          <T n={9} a={32} b={38} />
          <T n={10} a={19} b={46} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'بلا جدول.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={120}>
          <D n={11} a={81} b={16} />
          <D n={12} a={23} b={39} />
          <D n={13} a={66} b={32} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'بلا مربع ولا خط منقط: كما في الكتاب.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={90}>
          <V n={14} a={74} b={16} />
          <V n={15} a={35} b={44} />
          <V n={16} a={54} b={16} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'الحس العددي: الجدول من الكتاب.',
      content: (
        <QuestionSlide
          source={SOLVE} n={17}
          question={<><BookLabel>الْحِسُّ الْعَدَدِيُّ:</BookLabel> أَكْتُبُ جُمْلَةً عَدَدِيَّةً؛ لِكَيْ أَجِدَ مَجْمُوعَ طُلَّابِ الصَّفِّ الثَّانِي فِي مَدْرَسَتِي:</>}
          hint="أَيُّ عَمَلِيَّةٍ تُعْطِينَا الْمَجْمُوعَ؟"
          steps={[
            { text: '٢٧ طَالِبًا وَ٢٦ طَالِبًا.' },
            { text: 'الْمَجْمُوعُ: نَجْمَعُ.' },
            { text: <Eq>٢٧ + ٢٦ = ٥٣</Eq>, kind: 'ans', label: 'الْجُمْلَةُ الْعَدَدِيَّةُ' },
            { text: '٥٣ طَالِبًا', kind: 'ans' },
          ]}
          chart={<DataTable rows={[['الصَّفُّ الثَّانِي (أ)', 27], ['الصَّفُّ الثَّانِي (ب)', 26]]} />}
        />
      ),
    },
    mindSlide(<>جَمْعُ عَدَدَيْنِ<br />بِإِعَادَةِ التَّجْمِيعِ</>, [
      { cap: 'أَوَّلًا', text: 'أَجْمَعُ الآحَادَ' },
      { cap: 'ثَانِيًا', text: 'أُعِيدُ التَّجْمِيعَ عِنْدَ الضَّرُورَةِ' },
      { cap: 'ثَالِثًا', text: 'أَجْمَعُ الْعَشَرَاتِ مَعَ الْمَحْمُولِ' },
      { cap: 'مِثَالٌ', text: '١٨ + ٢٥ = ٤٣' },
    ]),
    exitSlide('أجمع وأعيد التجميع', [
      ['٢٤ + ١٨ = ؟', ['٤٢', '٣٢', '٤٣'], '٤٢'],
      ['٣٥ + ٤٥ = ؟', ['٨٠', '٧٠', '٨١'], '٨٠'],
      ['١٩ + ٢٧ = ؟', ['٤٦', '٣٦', '٤٧'], '٤٦'],
    ]),
    endSlide,
  ],
});
