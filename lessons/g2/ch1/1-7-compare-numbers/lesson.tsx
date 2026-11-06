import {
  BookLabel, Card, CompareCard, Grid, Mark, QuestionGroup, QuestionSlide, Sentence, SlideHead, TenOnes, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ٢٥';
const PRACTICE = 'أتدرَّبُ، ص ٢٦';
const FIND = 'أُقَارِنُ بَيْنَ كُلِّ عَدَدَيْنِ، وَأَكْتُبُ >، <، = فِي ◯:';
const SOLVE = 'أَحُلُّ الْمَسْأَلَةَ، ص ٢٦';

export default defineLesson({
  meta: {
    id: 'g2-1-7-compare-numbers',
    design: 'v2',
    code: '١-٧',
    title: 'مُقَارَنَةُ الأَعْدَادِ',
    shortTitle: 'مقارنة الأعداد',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الأول: القيمة المنزلية حتى ١٠٠ والأنماط',
    source: 'الجزء الأول، ص ٢٥–٢٦',
    minutes: 45,
    idea: 'أُقَارِنُ بَيْنَ عَدَدَيْنِ مُسْتَعْمِلًا الإِشَارَاتِ (>، <، =).',
    bookQuestions: 23,
  },
  sectionDesc: {"engage": "نتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٥", "practice": "الأسئلة ٦–٢٢", "hot": "السؤال ٢٣", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أُقَارِنُ بَيْنَ عَدَدَيْنِ مُسْتَعْمِلًا الإِشَارَاتِ.', ["أُقَارِنُ الْعَشَرَاتِ أَوَّلًا.", "فَإِذَا تَسَاوَتْ أُقَارِنُ الآحَادَ.", "أَكْتُبُ الإِشَارَةَ."], <Mark>الْمُقَارَنَةُ، أَكْبَرُ مِنْ، أَصْغَرُ مِنْ، يُسَاوِي</Mark>),
    askSlide('engage', 'نتذكر', [["أَيُّهُمَا أَكْبَرُ؟", ["٧", "٣", "٠"], "٧"], ["فِي ٤٦ كَمْ عَشَرَةً؟", ["٤", "٦", "١٠"], "٤"], ["أَيُّهُمَا أَقَلُّ؟", ["٢", "٨", "٩"], "٢"]], 'نراجع المنازل.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: أقارن العشرات، فإذا كانت متساوية أقارن الآحاد.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ٢٥" kind="rule">أكبر، أصغر، يساوي</SlideHead>
          <Grid cols={3}>
            <Card kind="ex" cap="أَكْبَرُ مِنْ"><TenOnes values={[37, 24]} /><Sentence t={[37, { b: '>', box: true }, 24]} /></Card>
            <Card kind="ex" cap="أَصْغَرُ مِنْ"><TenOnes values={[32, 35]} /><Sentence t={[32, { b: '<', box: true }, 35]} /></Card>
            <Card kind="ex" cap="يُسَاوِي"><TenOnes values={[16, 16]} /><Sentence t={[16, { b: '=', box: true }, 16]} /></Card>
          </Grid>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٥٣ و٥٨ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أي إشارة؟', [["٤٥ ◯ ٥٤", ["<", ">", "="], "<"], ["٧٢ ◯ ٢٧", [">", "<", "="], ">"], ["٣٠ ◯ ٣٠", ["=", ">", "<"], "="]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 5,
      notes: 'كل ضغطة إشارة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={120}>
          <CompareCard n={1} a={54} b={20} blocks />
          <CompareCard n={2} a={31} b={31} blocks />
          <CompareCard n={3} a={42} b={24} />
          <CompareCard n={4} a={63} b={64} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ أُفَسِّرُ أَنَّ ٢٨ أَكْبَرُ مِنْ ٢٦؟"
          hint="مَاذَا نُقَارِنُ إِذَا تَسَاوَتِ الْعَشَرَاتُ؟"
          steps={[
            { text: 'الْعَشَرَاتُ مُتَسَاوِيَةٌ.' },
            { text: 'فِي الآحَادِ ٨ أَكْبَرُ مِنْ ٦؛ لِذَا ٢٨ أَكْبَرُ مِنْ ٢٦.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'أتذكر من الكتاب: أقارن بين العشرات أولًا.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={2} time={60}>
          <CompareCard n={6} a={30} b={31} blocks />
          <CompareCard n={7} a={23} b={23} blocks />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <CompareCard n={8} a={81} b={50} />
          <CompareCard n={9} a={92} b={92} />
          <CompareCard n={10} a={25} b={26} />
          <CompareCard n={11} a={77} b={76} />
          <CompareCard n={12} a={89} b={98} />
          <CompareCard n={13} a={55} b={55} />
          <CompareCard n={14} a={21} b={60} />
          <CompareCard n={15} a={49} b={39} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <CompareCard n={16} a={0} b={74} />
          <CompareCard n={17} a={80} b={80} />
          <CompareCard n={18} a={42} b={24} />
          <CompareCard n={19} a={70} b={69} />
          <CompareCard n={20} a={15} b={15} />
          <CompareCard n={21} a={38} b={53} />
          <CompareCard n={22} a={30} b={40} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={23} chart={null} time={120}
          question={<><BookLabel>الْحِسُّ الْعَدَدِيُّ:</BookLabel> أَرَادَ فَهْدٌ أَنْ يَشْتَرِيَ مَجْمُوعَةً مِنَ الْكُرَاتِ الزُّجَاجِيَّةِ مِنْ مَحَلِّ أَلْعَابٍ، فَقَالَتْ لَهُ أُمُّهُ: إِنَّهُ يَسْتَطِيعُ أَنْ يَشْتَرِيَ أَقَلَّ مِنْ ٢٥. مَا أَكْبَرُ عَدَدٍ يُمْكِنُ أَنْ يَشْتَرِيَهُ فَهْدٌ؟</>}
          hint="مَا الْعَدَدُ الَّذِي يَسْبِقُ ٢٥؟"
          steps={[
            { text: 'أَقَلُّ مِنْ ٢٥ يَعْنِي قَبْلَهُ.' },
            { text: '٢٤ كُرَةً', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>مُقَارَنَةُ<br />الأَعْدَادِ</>, [{"cap": "أُقَارِنُ", "text": "الْعَشَرَاتِ أَوَّلًا"}, {"cap": "ثُمَّ", "text": "الآحَادَ إِذَا تَسَاوَتِ الْعَشَرَاتُ"}, {"cap": "الإِشَارَاتُ", "text": ">، <، ="}, {"cap": "مِثَالٌ", "text": "٣٧ أَكْبَرُ مِنْ ٢٤"}]),
    exitSlide('أقارن', [["٦٣ ◯ ٣٦", [">", "<", "="], ">"], ["١٨ ◯ ٢١", ["<", ">", "="], "<"], ["٤٩ ◯ ٤٩", ["=", ">", "<"], "="]]),
    endSlide,
  ],
});
