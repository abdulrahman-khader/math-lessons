import {
  BookLabel, Cols, Eq, PlaceCard, PlaceMat, PlaceSum, QCol, QuestionGroup, QuestionSlide, SlideHead, Solution, Stack, Step,
  askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide, storySlide, RegroupExplorer,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

const CHECK = 'أتأكَّدُ، ص ١٢٢';
const PRACTICE = 'أتدرَّبُ، ص ١٢٣';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٢٣';
const FIND = 'أَجِدُ نَاتِجَ الْجَمْعِ مُسْتَعْمِلًا الْقِطَعَ:';

type Q = { n: number; a: number; b: number };
const T = ({ n, a, b }: Q) => <PlaceCard n={n} nums={[a, b]} table carry />;
const D = ({ n, a, b }: Q) => <PlaceCard n={n} nums={[a, b]} carry />;

export default defineLesson({
  meta: {
    id: 'g2-5-6-add-one-digit-regroup',
    design: 'v2',
    code: '٥-٦',
    title: 'جَمْعُ عَدَدٍ مِنْ رَقْمَيْنِ إِلَى عَدَدٍ مِنْ رَقْمٍ وَاحِدٍ بِإِعَادَةِ التَّجْمِيعِ',
    shortTitle: 'جمع عدد من رقمين وعدد من رقم بإعادة التجميع',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الخامس: جمع الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١٢٢–١٢٣',
    minutes: 45,
    idea: 'أَجْمَعُ عَدَدًا مُكَوَّنًا مِنْ رَقْمٍ وَاحِدٍ إِلَى عَدَدٍ مُكَوَّنٍ مِنْ رَقْمَيْنِ مَعَ إِعَادَةِ التَّجْمِيعِ.',
    bookQuestions: 17,
  },
  sectionDesc: {
    engage: 'إعادة التجميع',
    explain: 'أستعد',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٧',
    practice: 'الأسئلة ٨–١٦',
    hot: 'السؤال ١٧',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    goalsSlide('أَجْمَعُ عَدَدًا مُكَوَّنًا مِنْ رَقْمٍ وَاحِدٍ إِلَى عَدَدٍ مُكَوَّنٍ مِنْ رَقْمَيْنِ مَعَ إِعَادَةِ التَّجْمِيعِ.', ['أَجْمَعُ الآحَادَ.', 'أُعِيدُ التَّجْمِيعَ عِنْدَ الضَّرُورَةِ.', 'أَجْمَعُ الْعَشَرَاتِ.']),
    askSlide('engage', 'إعادة التجميع', [
      ['١٠ آحَادٍ تُسَاوِي:', ['عَشَرَةً وَاحِدَةً', '١٠ عَشَرَاتٍ', '٠'], 'عَشَرَةً وَاحِدَةً'],
      ['١٣ آحَادًا تُسَاوِي:', ['عَشَرَةً وَ٣ آحَادٍ', '٣ عَشَرَاتٍ', '١٣ عَشَرَةً'], 'عَشَرَةً وَ٣ آحَادٍ'],
      ['٢٦ + ٥ = ؟', ['٢١', '٣١', '٣٠'], '٣١'],
    ], 'ربط بالدرس ٥-٥.'),
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند خطأ سالم واسأل: لماذا ٣١٣ خطأ؟ (أكثر من ٣٠٠ كتاب!) ولا تعطِ الطريقة بعد.'),
    {
      sec: 'explore', min: 4,
      notes: 'نحل مسألة القصة: معنا ٣٦ ونضيف ٧. حين تصير الآحاد ١٣ اسأل: هل نكتب ١٣ بجانب ٣؟ ثم «نعيد التجميع» ونرى أين تذهب العشرة.',
      content: (
        <>
          <SlideHead tag="نَحُلُّ مَسْأَلَةَ الْقِصَّةِ" kind="ex">أَيْنَ تَذْهَبُ الْعَشَرَةُ؟</SlideHead>
          <RegroupExplorer start={36} addOnes={7} />
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: نكتب ١٢ كاملة في منزلة الآحاد، ونسأل: هل يتّسع المكان لرقمين؟ لا، فيصعد ١ إلى المربع فوق العشرات ثم يُجمع معها.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٢٢" kind="rule">أجد ناتج الجمع ١٧ + ٥</SlideHead>
          <Cols even>
            <QCol>
              <Solution>
                <Step hl={['n0']}><BookLabel>الْخُطْوَةُ ١:</BookLabel> نَجْمَعُ الآحَادَ: <Eq>٧ + ٥ = ١٢</Eq></Step>
                <Step>لَا يَكُونُ فِي الْمَنْزِلَةِ رَقْمَانِ</Step>
                <Step hl={['n1']}><BookLabel>الْخُطْوَةُ ٢:</BookLabel> نُعِيدُ التَّجْمِيعَ: يَصْعَدُ ١ إِلَى الْعَشَرَاتِ</Step>
                <Step hl={['n2']}><BookLabel>الْخُطْوَةُ ٣:</BookLabel> نَجْمَعُ الْعَشَرَاتِ: <Eq>١ + ١ = ٢</Eq></Step>
              </Solution>
            </QCol>
            <Stack>
              <PlaceSum nums={[17, 5]} table carry sync />
            </Stack>
            <PlaceMat a={17} b={5} />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٥٨ + ٦ (مثال غير أمثلة الكتاب). أوقفه قبل كل خانة.'),
    askSlide('elab', 'أين أكتب؟', [
      ['٣٧ + ٤: نَاتِجُ الآحَادِ ١١. مَاذَا نَكْتُبُ فِي الآحَادِ؟', ['١', '١١', '٠'], '١'],
      ['وَأَيْنَ نَكْتُبُ الْعَشَرَةَ؟', ['فَوْقَ الْعَشَرَاتِ', 'فَوْقَ الآحَادِ', 'لَا نَكْتُبُهَا'], 'فَوْقَ الْعَشَرَاتِ'],
      ['٣٧ + ٤ = ؟', ['٤١', '٣١', '٣١١'], '٤١'],
    ], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 5,
      notes: 'كل ضغطة خانة: الآحاد، ثم الرقم المحمول إن وُجد، ثم العشرات. المربع يبقى فارغًا إذا لم نعد التجميع.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={150}>
          <T n={1} a={18} b={6} />
          <T n={2} a={43} b={3} />
          <T n={3} a={25} b={4} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 3,
      notes: 'بلا جدول: الخط المنقط يفصل بين المنزلتين.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={90}>
          <D n={4} a={19} b={6} />
          <D n={5} a={36} b={5} />
          <D n={6} a={68} b={4} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: اطلب من طالب أن يشرح بالقطع.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ أَقُومُ بِإِعَادَةِ التَّجْمِيعِ؟"
          hint="كَمْ آحَادًا تُسَاوِي الْعَشَرَةُ؟"
          steps={[
            { text: 'نَجْمَعُ الآحَادَ.' },
            { text: 'إِذَا بَلَغَ النَّاتِجُ ١٠ أَوْ أَكْثَرَ، أُبْدِلُ بِهَا عَشَرَةً وَاحِدَةً، وَأَنْقُلُهَا إِلَى مَنْزِلَةِ الْعَشَرَاتِ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'اسأل: هل نحتاج إلى إعادة التجميع هنا؟',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={150}>
          <T n={8} a={24} b={7} />
          <T n={9} a={35} b={5} />
          <T n={10} a={16} b={9} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'السؤال ١١ بلا إعادة تجميع.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={150}>
          <T n={11} a={56} b={1} />
          <T n={12} a={72} b={8} />
          <T n={13} a={38} b={8} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'بلا جدول.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={90}>
          <D n={14} a={24} b={4} />
          <D n={15} a={43} b={9} />
          <D n={16} a={13} b={7} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'أعادت إسراء التجميع دون حاجة: ٣ + ٦ = ٩ فقط.',
      content: (
        <QuestionSlide
          source={HOT} n={17} chart={null}
          question={<><BookLabel>أَكْتَشِفُ الْخَطَأَ وَأُصَحِّحُهُ:</BookLabel> تَقُولُ إِسْرَاءُ: إِنَّ نَاتِجَ جَمْعِ ٢٣، ٦ يُسَاوِي ٣٩. لِمَاذَا أَخْطَأَتْ إِسْرَاءُ؟ أُصَحِّحُ خَطَأَهَا.</>}
          hint="كَمْ يُسَاوِي ٣ + ٦؟"
          steps={[
            { text: <>نَجْمَعُ الآحَادَ: <Eq>٣ + ٦ = ٩</Eq></> },
            { text: 'أَعَادَتِ التَّجْمِيعَ دُونَ حَاجَةٍ', kind: 'ans', label: 'الْخَطَأُ' },
            { text: <Eq>٢٣ + ٦ = ٢٩</Eq>, kind: 'ans', label: 'التَّصْحِيحُ' },
          ]}
        />
      ),
    },
    mindSlide(<>أَجْمَعُ<br />وَأُعِيدُ التَّجْمِيعَ</>, [
      { cap: 'أَوَّلًا', text: 'أَجْمَعُ الآحَادَ' },
      { cap: 'ثَانِيًا', text: 'أُعِيدُ التَّجْمِيعَ عِنْدَ الضَّرُورَةِ' },
      { cap: 'ثَالِثًا', text: 'أَجْمَعُ الْعَشَرَاتِ' },
      { cap: 'أَنْتَبِهُ', text: 'لَا أَنْسَى الْعَشَرَةَ الْمَحْمُولَةَ' },
    ]),
    exitSlide('أجمع وأعيد التجميع', [
      ['١٦ + ٥ = ؟', ['٢١', '١١', '٢٢'], '٢١'],
      ['٤٩ + ٣ = ؟', ['٥٢', '٤٢', '٥٣'], '٥٢'],
      ['٦٤ + ٦ = ؟', ['٦٠', '٧٠', '٦١٠'], '٧٠'],
    ]),
    endSlide,
  ],
});
