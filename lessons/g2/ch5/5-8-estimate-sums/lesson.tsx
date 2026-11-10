import {
  BookLabel, Cols, DataTable, Eq, LineBox, Mark, NumberLine, QText, QuestionGroup, QuestionSlide, RoundCard, RoundSum, SlideHead, Solution, Step,
  askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide, storySlide, RoundExplorer,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

const CHECK = 'أتأكَّدُ، ص ١٢٦';
const PRACTICE = 'أتدرَّبُ، ص ١٢٧';
const SOLVE = 'أَحُلُّ الْمَسْأَلَةَ، ص ١٢٧';
const FIND = 'أُقَرِّبُ إِلَى أَقْرَبِ عَشَرَةٍ، ثُمَّ أُقَدِّرُ نَاتِجَ الْجَمْعِ:';

type Q = { n: number; a: number; b: number };
const R = ({ n, a, b }: Q) => <RoundCard n={n} a={a} b={b} />;

export default defineLesson({
  meta: {
    id: 'g2-5-8-estimate-sums',
    design: 'v2',
    code: '٥-٨',
    title: 'تَقْدِيرُ نَاتِجِ الْجَمْعِ',
    shortTitle: 'تقدير ناتج الجمع',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الخامس: جمع الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١٢٦–١٢٧',
    minutes: 45,
    idea: 'أُقَدِّرُ نَاتِجَ الْجَمْعِ.',
    bookQuestions: 14,
  },
  sectionDesc: {
    engage: 'أقرب عشرة',
    explain: 'أستعد',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٤',
    practice: 'الأسئلة ٥–١٣',
    hot: 'السؤال ١٤',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    goalsSlide('أُقَدِّرُ نَاتِجَ الْجَمْعِ.', ['أُقَرِّبُ الْعَدَدَ إِلَى أَقْرَبِ عَشَرَةٍ.', 'أَجْمَعُ الْعَشَرَاتِ.', 'أُقَدِّرُ نَاتِجَ الْجَمْعِ.'], <Mark>التَّقْرِيبُ</Mark>),
    askSlide('engage', 'أقرب عشرة', [
      ['٨٧ أَقْرَبُ إِلَى:', ['٨٠', '٩٠', '٧٠'], '٩٠'],
      ['٣٢ أَقْرَبُ إِلَى:', ['٣٠', '٤٠', '٢٠'], '٣٠'],
      ['٣٠ + ٢٠ = ؟', ['٥', '٥٠', '٣٢'], '٥٠'],
    ], 'مراجعة من التهيئة ص ١٠٩.'),
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند السؤال واسأل: هل نحتاج الناتج بالضبط لنعرف؟'),
    {
      sec: 'explore', min: 4,
      notes: 'مثال جديد غير القصة: ٦٤ بين ٦٠ و٧٠، فأي العشرتين أقرب؟ ثم غيّر العدد (٦٥، ٦٨…) واسأل قبل الضغط.',
      content: (
        <>
          <SlideHead tag="نُجَرِّبُ مِثَالًا آخَرَ" kind="ex">أَقْرَبُ عَشَرَةٍ</SlideHead>
          <RoundExplorer start={64} />
        </>
      ),
    },
    {
      sec: 'explain', min: 6,
      notes: 'أنا أعمل: ١٤ أقرب إلى ١٠، و١٩ أقرب إلى ٢٠. الناتج تقريبي، وليس دقيقًا.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٢٦" kind="rule">أقدّر ناتج الجمع ١٤ + ١٩</SlideHead>
          <QText>إِذَا لَمْ أَكُنْ بِحَاجَةٍ إِلَى إِجَابَةٍ دَقِيقَةٍ فَإِنَّنِي أُقَدِّرُ الإِجَابَةَ.</QText>
          <LineBox small><NumberLine min={10} max={20} /></LineBox>
          <Cols even>
            <Solution>
              <Step><BookLabel>الْخُطْوَةُ ١:</BookLabel> ١٤ أَقْرَبُ إِلَى ١٠، وَ١٩ أَقْرَبُ إِلَى ٢٠.</Step>
              <Step><BookLabel>الْخُطْوَةُ ٢:</BookLabel> نَجْمَعُ الْعَشَرَاتِ.</Step>
            </Solution>
            <RoundSum a={14} b={19} />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٤٢ + ٢٧ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أقرّب وأقدّر', [
      ['٢٣ أَقْرَبُ إِلَى:', ['٢٠', '٣٠', '١٠'], '٢٠'],
      ['٢٦ أَقْرَبُ إِلَى:', ['٢٠', '٣٠', '٤٠'], '٣٠'],
      ['٢٣ + ٢٦ يُسَاوِي تَقْرِيبًا:', ['٤٠', '٥٠', '٦٠'], '٥٠'],
    ], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 5,
      notes: 'اطلب من طالب أن يشير إلى العدد على خط الأعداد.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={120} above={<LineBox small><NumberLine min={20} max={40} /></LineBox>}>
            <R n={1} a={21} b={26} />
            <R n={2} a={25} b={28} />
            <R n={3} a={33} b={38} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: نقرّب ثم نجمع العشرات.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ أُقَدِّرُ نَاتِجَ الْجَمْعِ؟"
          hint="مَاذَا نَفْعَلُ بِكُلِّ عَدَدٍ أَوَّلًا؟"
          steps={[
            { text: 'أُقَرِّبُ كُلَّ عَدَدٍ إِلَى أَقْرَبِ عَشَرَةٍ.' },
            { text: 'ثُمَّ أَجْمَعُ الْعَشَرَاتِ، فَأَحْصُلُ عَلَى النَّاتِجِ التَّقْرِيبِيِّ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'أتذكر من الكتاب: ١، ٢، ٣، ٤ تقرّب إلى أدنى، و٥ وما بعدها إلى أعلى.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={120} above={<LineBox small><NumberLine min={30} max={50} /></LineBox>}>
            <R n={5} a={31} b={47} />
            <R n={6} a={43} b={38} />
            <R n={7} a={45} b={38} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={180}>
          <R n={8} a={34} b={49} />
          <R n={9} a={31} b={32} />
          <R n={10} a={36} b={31} />
          <R n={11} a={43} b={30} />
          <R n={12} a={50} b={33} />
          <R n={13} a={43} b={33} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'التفكير الرياضي: التقدير يكفي لمعرفة المبلغ اللازم.',
      content: (
        <QuestionSlide
          source={SOLVE} n={14}
          question={<><BookLabel>التَّفْكِيرُ الرِّيَاضِيُّ:</BookLabel> أَرَادَ بِلَالٌ وَأَخُوهُ عَلِيٌّ أَنْ يَشْتَرِيَا لُعْبَةَ الْمُكَعَّبَاتِ، وَكَانَ هُنَاكَ مَجْمُوعَتَانِ مِنْهَا، وَلِمَعْرِفَةِ ثَمَنِ الْمَجْمُوعَتَيْنِ تَقْرِيبًا، أُقَدِّرُ ثَمَنَهُمَا مُسْتَعْمِلًا الْجَدْوَلَ الآتِيَ:</>}
          hint="إِلَى أَيِّ عَشَرَةٍ يَقْرُبُ كُلُّ ثَمَنٍ؟"
          steps={[
            { text: '٤٧ أَقْرَبُ إِلَى ٥٠.' },
            { text: '٢٩ أَقْرَبُ إِلَى ٣٠.' },
            { text: <Eq>٥٠ + ٣٠ = ٨٠</Eq> },
            { text: '٨٠ رِيَالًا تَقْرِيبًا', kind: 'ans' },
          ]}
          chart={<DataTable rows={[['الْمَجْمُوعَةُ الْكَبِيرَةُ', '٤٧ رِيَالًا'], ['الْمَجْمُوعَةُ الصَّغِيرَةُ', '٢٩ رِيَالًا']]} />}
        />
      ),
    },
    mindSlide(<>تَقْدِيرُ<br />نَاتِجِ الْجَمْعِ</>, [
      { cap: 'أُقَرِّبُ', text: 'كُلَّ عَدَدٍ إِلَى أَقْرَبِ عَشَرَةٍ' },
      { cap: 'أَجْمَعُ', text: 'الْعَشَرَاتِ' },
      { cap: 'مِثَالٌ', text: '١٤ + ١٩ يُسَاوِي ٣٠ تَقْرِيبًا' },
      { cap: 'أَتَذَكَّرُ', text: '٥ وَمَا بَعْدَهَا إِلَى الْعَشَرَةِ الأَعْلَى' },
    ]),
    exitSlide('أقدّر ناتج الجمع', [
      ['٢٨ أَقْرَبُ إِلَى:', ['٢٠', '٣٠', '٤٠'], '٣٠'],
      ['٣١ + ١٩ يُسَاوِي تَقْرِيبًا:', ['٤٠', '٥٠', '٦٠'], '٥٠'],
      ['٤٦ + ٢٤ يُسَاوِي تَقْرِيبًا:', ['٦٠', '٧٠', '٨٠'], '٧٠'],
    ]),
    endSlide,
  ],
});
