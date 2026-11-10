import {
  BookLabel, Card, Cols, Eq, Goals, PlaceCard, PlaceMat, PlaceSum, QuestionGroup, QuestionSlide, Sentence, SlideHead, Stack,
  askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide, storySlide, RegroupExplorer,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

const CHECK = 'أتأكَّدُ، ص ١١٦';
const PRACTICE = 'أتدرَّبُ، ص ١١٧';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١١٧';
const FIND = 'أَجِدُ نَاتِجَ الْجَمْعِ مُسْتَعْمِلًا الْقِطَعَ:';
const P = ({ n, a, b }: { n: number; a: number; b: number }) => <PlaceCard n={n} nums={[a, b]} table />;

export default defineLesson({
  meta: {
    id: 'g2-5-4-add-two-digit',
    design: 'v2',
    code: '٥-٤',
    title: 'جَمْعُ عَدَدٍ مِنْ رَقْمَيْنِ إِلَى عَدَدٍ مِنْ رَقْمٍ وَاحِدٍ أَوْ رَقْمَيْنِ',
    shortTitle: 'جمع عدد من رقمين إلى عدد من رقم أو رقمين',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الخامس: جمع الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١١٦–١١٧',
    minutes: 45,
    idea: 'أَجْمَعُ عَدَدًا مُكَوَّنًا مِنْ رَقْمَيْنِ مَعَ عَدَدٍ مُكَوَّنٍ مِنْ رَقْمٍ وَاحِدٍ، أَوْ رَقْمَيْنِ.',
    bookQuestions: 14,
  },
  sectionDesc: {
    engage: 'الآحاد والعشرات',
    explain: 'أستعد',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٤',
    practice: 'الأسئلة ٥–١٣',
    hot: 'السؤال ١٤',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    goalsSlide('أَجْمَعُ عَدَدًا مُكَوَّنًا مِنْ رَقْمَيْنِ مَعَ عَدَدٍ مُكَوَّنٍ مِنْ رَقْمٍ وَاحِدٍ، أَوْ رَقْمَيْنِ.', ['أَكْتُبُ الْعَدَدَيْنِ فِي جَدْوَلِ الْمَنَازِلِ.', 'أَجْمَعُ الآحَادَ.', 'أَجْمَعُ الْعَشَرَاتِ.']),
    askSlide('engage', 'الآحاد والعشرات', [
      ['فِي الْعَدَدِ ٣٦، كَمْ عَشَرَةً؟', ['٣', '٦', '٩'], '٣'],
      ['فِي الْعَدَدِ ١٨، كَمْ آحَادًا؟', ['١', '٨', '٩'], '٨'],
      ['٥ عَشَرَاتٍ وَ٢ آحَادٍ =', ['٢٥', '٥٢', '٧'], '٥٢'],
    ], 'مراجعة المنازل من التهيئة ص ١٠٩.'),
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند السؤال واسأل: كيف نرتب التفاح لنعدّه بسهولة؟'),
    {
      sec: 'explore', min: 4,
      notes: 'نحل مسألة القصة: معنا ٤٣ ونضيف ٣٥. اضغط «نضيف واحدًا» ٥ مرات و«نضيف عشرة» ٣ مرات، واسأل: هل احتجنا إعادة التجميع؟',
      content: (
        <>
          <SlideHead tag="نَحُلُّ مَسْأَلَةَ الْقِصَّةِ" kind="ex">نَجْمَعُ الْآحَادَ وَالْعَشَرَاتِ</SlideHead>
          <RegroupExplorer start={43} add={3} addOnes={5} />
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: نبدأ دائمًا من اليمين: الآحاد ثم العشرات. كل ضغطة خانة.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١١٦" kind="rule">أجد ناتج الجمع ١٥ + ٢٤</SlideHead>
          <Cols even>
            <PlaceMat a={15} b={24} />
            <Stack>
              <PlaceSum nums={[15, 24]} table />
              <Sentence t={[15, '+', 24, '=', { b: 39 }]} big />
            </Stack>
            <Card kind="rule" cap="الْخُطُوَاتُ">
              <Goals items={['أَكْتُبُ الْعَدَدَيْنِ', 'أَجْمَعُ الآحَادَ', 'أَجْمَعُ الْعَشَرَاتِ']} />
            </Card>
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: مثال غير مثال الكتاب. أوقفه قبل كل خانة واسأل عن الرقم.'),
    askSlide('elab', 'أجمع المنزلتين', [
      ['٢٢ + ٥ = ؟', ['٢٧', '٧٢', '٢٥'], '٢٧'],
      ['٣١ + ٤٦ = ؟', ['٧٧', '٧٦', '٣٧'], '٧٧'],
      ['مِنْ أَيْنَ نَبْدَأُ؟', ['الآحَادِ', 'الْعَشَرَاتِ', 'الْعَدَدِ الأَصْغَرِ'], 'الآحَادِ'],
    ], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 5,
      notes: 'كل ضغطة خانة: الآحاد ثم العشرات.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={120}>
          <P n={1} a={13} b={4} />
          <P n={2} a={11} b={36} />
          <P n={3} a={36} b={13} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: نبدأ بالآحاد ثم العشرات.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ أَجْمَعُ عَدَدَيْنِ كُلٌّ مِنْهُمَا مُكَوَّنٌ مِنْ رَقْمَيْنِ؟"
          hint="مِنْ أَيْنَ نَبْدَأُ؟"
          steps={[
            { text: 'نَجْمَعُ الآحَادَ أَوَّلًا.' },
            { text: 'ثُمَّ نَجْمَعُ الْعَشَرَاتِ.' },
            { text: 'أَكْتُبُ كُلَّ نَاتِجٍ فِي مَنْزِلَتِهِ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 7,
      notes: 'أتذكر من الكتاب: أبدأ دائمًا من اليمين.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={150}>
          <P n={5} a={22} b={3} />
          <P n={6} a={42} b={2} />
          <P n={7} a={4} b={44} />
          <P n={8} a={52} b={6} />
          <P n={9} a={62} b={14} />
          <P n={10} a={18} b={61} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'اسأل: ماذا كتبنا في خانة الآحاد؟ ولماذا؟',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={90}>
          <P n={11} a={14} b={23} />
          <P n={12} a={35} b={14} />
          <P n={13} a={82} b={4} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'كتبت رقية ٦ في منزلة العشرات، وصوابها منزلة الآحاد.',
      content: (
        <QuestionSlide
          source={HOT} n={14} long
          question={<><BookLabel>أَكْتَشِفُ الْخَطَأَ وَأُصَحِّحُهُ:</BookLabel> جَمَعَتْ رُقَيَّةُ ٢٣ + ٦ كَمَا هُوَ فِي الْجَدْوَلِ الْمُجَاوِرِ. أَجِدُ خَطَأَ رُقَيَّةَ، ثُمَّ أُصَحِّحُهُ:</>}
          hint="فِي أَيِّ مَنْزِلَةٍ الرَّقْمُ ٦؟"
          steps={[
            { text: 'كَتَبَتْ ٦ فِي مَنْزِلَةِ الْعَشَرَاتِ.', kind: 'ans', label: 'الْخَطَأُ' },
            { text: '٦ آحَادٍ: مَكَانُهَا مَنْزِلَةُ الآحَادِ.' },
            { text: <Eq>٢٣ + ٦ = ٢٩</Eq>, kind: 'ans', label: 'التَّصْحِيحُ' },
          ]}
          chart={<PlaceSum nums={[23, 60]} table wrong={[83, 0]} />}
        />
      ),
    },
    mindSlide(<>جَمْعُ<br />عَدَدَيْنِ</>, [
      { cap: 'أَكْتُبُ', text: 'الآحَادُ تَحْتَ الآحَادِ، وَالْعَشَرَاتُ تَحْتَ الْعَشَرَاتِ' },
      { cap: 'أَبْدَأُ', text: 'بِالآحَادِ مِنَ الْيَمِينِ' },
      { cap: 'ثُمَّ', text: 'أَجْمَعُ الْعَشَرَاتِ' },
      { cap: 'أَنْتَبِهُ', text: 'كُلُّ رَقْمٍ فِي مَنْزِلَتِهِ' },
    ]),
    exitSlide('أجمع المنزلتين', [
      ['٣٢ + ٦ = ؟', ['٣٨', '٩٢', '٣٦'], '٣٨'],
      ['٤١ + ١٧ = ؟', ['٥٨', '٥٧', '٤٨'], '٥٨'],
      ['٧ + ٦٢ = ؟', ['٦٩', '٩٢', '١٣٢'], '٦٩'],
    ]),
    endSlide,
  ],
});
