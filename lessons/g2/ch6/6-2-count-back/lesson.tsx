import {
  BookLabel, Card, Cols, Eq, QCard, QuestionGroup, QuestionSlide, Sentence, SentenceCard, SlideHead, Solution, Step, SumCard, TenOnes, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ١٤٠';
const PRACTICE = 'أتدرَّبُ، ص ١٤١';
const FIND = 'أَطْرَحُ بِالْعَدِّ التَّنَازُلِيِّ، أَسْتَعْمِلُ الْقِطَعَ:';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٤١';

export default defineLesson({
  meta: {
    id: 'g2-6-2-count-back',
    design: 'v2',
    code: '٦-٢',
    title: 'الطَّرْحُ بِالْعَدِّ التَّنَازُلِيِّ',
    shortTitle: 'الطرح بالعد التنازلي',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل السادس: طرح الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١٤٠–١٤١',
    minutes: 45,
    idea: 'أَطْرَحُ بِالْعَدِّ التَّنَازُلِيِّ.',
    bookQuestions: 22,
  },
  sectionDesc: {"engage": "طرح العشرات", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٥", "practice": "الأسئلة ٦–٢١", "hot": "السؤال ٢٢", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَطْرَحُ بِالْعَدِّ التَّنَازُلِيِّ.', ["أَعُدُّ تَنَازُلِيًّا بِالآحَادِ.", "أَعُدُّ تَنَازُلِيًّا بِالْعَشَرَاتِ.", "أَخْتَارُ كَيْفَ أَعُدُّ."]),
    askSlide('engage', 'طرح العشرات', [["٥٠ − ٢٠ = ؟", ["٣٠", "٧٠", "٣"], "٣٠"], ["٨٠ − ١٠ = ؟", ["٩٠", "٧٠", "٧٩"], "٧٠"], ["مَا الْعَدَدُ قَبْلَ ٤٠؟", ["٣٩", "٤١", "٣٠"], "٣٩"]], 'ربط بالدرس ٦-١.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: نبدأ بالعدد الكبير ونعدّ إلى الوراء.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٤٠" kind="rule">أعدّ تنازليًّا</SlideHead>
          <Cols even>
            <Card kind="ex" cap="أَجِدُ نَاتِجَ ٥٧ − ٣">
              <TenOnes values={[57]} cross={[0, 3]} />
              <Solution>
                <Step>أَعُدُّ تَنَازُلِيًّا بِالآحَادِ: ٥٦، ٥٥، ٥٤</Step>
                <Step kind="ans" label="النَّاتِجُ"><Eq>٥٧ − ٣ = ٥٤</Eq></Step>
              </Solution>
            </Card>
            <Card kind="ex" cap="أَجِدُ نَاتِجَ ٥٧ − ٣٠">
              <TenOnes values={[57]} cross={[3, 0]} />
              <Solution>
                <Step>أَعُدُّ تَنَازُلِيًّا بِالْعَشَرَاتِ: ٤٧، ٣٧، ٢٧</Step>
                <Step kind="ans" label="النَّاتِجُ"><Eq>٥٧ − ٣٠ = ٢٧</Eq></Step>
              </Solution>
            </Card>
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٨٤ − ٣ و٨٤ − ٣٠ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أعدّ تنازليًّا', [["٤٦ − ٢ = ؟", ["٤٤", "٢٦", "٤٨"], "٤٤"], ["٤٦ − ٢٠ = ؟", ["٤٤", "٢٦", "٣٦"], "٢٦"], ["كَيْفَ أَعُدُّ لِأَطْرَحَ ٣؟", ["بِالآحَادِ", "بِالْعَشَرَاتِ", "بِالْمِئَاتِ"], "بِالآحَادِ"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 6,
      notes: 'اطلب من الطالب أن يعدّ بصوت عالٍ.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={120}>
          <QCard n={1} className="tenscard"><TenOnes values={[37]} cross={[0, 2]} /><Sentence t={[37, '−', 2, '=', { b: 35 }]} /></QCard>
          <QCard n={2} className="tenscard"><TenOnes values={[37]} cross={[2, 0]} /><Sentence t={[37, '−', 20, '=', { b: 17 }]} /></QCard>
          <QCard n={3} className="tenscard"><TenOnes values={[69]} cross={[0, 3]} /><Sentence t={[69, '−', 3, '=', { b: 66 }]} /></QCard>
          <QCard n={4} className="tenscard"><TenOnes values={[69]} cross={[3, 0]} /><Sentence t={[69, '−', 30, '=', { b: 39 }]} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ تَوَصَّلْتُ إِلَى الإِجَابَةِ عَنِ السُّؤَالَيْنِ ٣، ٤؟"
          hint="كَيْفَ عَدَدْنَا فِي كُلِّ سُؤَالٍ؟"
          steps={[
            { text: 'السُّؤَالُ ٣: عَدَدْتُ بِالآحَادِ: ٦٨، ٦٧، ٦٦' },
            { text: 'السُّؤَالُ ٤: عَدَدْتُ بِالْعَشَرَاتِ: ٥٩، ٤٩، ٣٩' },
            { text: 'عَدَدْتُ تَنَازُلِيًّا مِنَ الْعَدَدِ ٦٩.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'أتذكر من الكتاب: عندما أعدّ تنازليًّا بالعشرات، أطرح ١٠ في كل مرة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={2} time={150}>
          <SentenceCard n={6} lines={[[24, '−', 2, '=', { b: 22 }]]} />
          <SentenceCard n={7} lines={[[24, '−', 20, '=', { b: 4 }]]} />
          <SentenceCard n={8} lines={[[79, '−', 3, '=', { b: 76 }]]} />
          <SentenceCard n={9} lines={[[79, '−', 30, '=', { b: 49 }]]} />
          <SentenceCard n={10} lines={[[96, '−', 1, '=', { b: 95 }]]} />
          <SentenceCard n={11} lines={[[96, '−', 10, '=', { b: 86 }]]} />
          <SentenceCard n={12} lines={[[54, '−', 3, '=', { b: 51 }]]} />
          <SentenceCard n={13} lines={[[54, '−', 30, '=', { b: 24 }]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <SumCard n={14} sums={[{ a: 61, op: '−', b: 1, v: 60 }]} />
          <SumCard n={15} sums={[{ a: 6, op: '−', b: 2, v: 4 }]} />
          <SumCard n={16} sums={[{ a: 68, op: '−', b: 3, v: 65 }]} />
          <SumCard n={17} sums={[{ a: 78, op: '−', b: 1, v: 77 }]} />
          <SumCard n={18} sums={[{ a: 87, op: '−', b: 30, v: 57 }]} />
          <SumCard n={19} sums={[{ a: 45, op: '−', b: 20, v: 25 }]} />
          <SumCard n={20} sums={[{ a: 87, op: '−', b: 3, v: 84 }]} />
          <SumCard n={21} sums={[{ a: 66, op: '−', b: 1, v: 65 }]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 4,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={22} chart={null} time={120} long
          question={<><BookLabel>التَّفْكِيرُ الرِّيَاضِيُّ:</BookLabel> لَدَى كُلٍّ مِنْ حَمَدٍ وَسَلْمَانَ ٥ أَوْرَاقٍ نَقْدِيَّةٍ مِنْ فِئَةِ عَشَرَةِ رِيَالَاتٍ وَ٧ قِطَعٍ نَقْدِيَّةٍ مِنْ فِئَةِ الرِّيَالِ. فَإِذَا أَنْفَقَ حَمَدٌ ٣ رِيَالَاتٍ، وَأَنْفَقَ سَلْمَانُ وَرَقَتَيْنِ مِنْ فِئَةِ عَشَرَةِ رِيَالَاتٍ، فَمَنْ مَعَهُ نُقُودٌ أَكْثَرُ مِنَ الآخَرِ الآنَ؟ أُفَسِّرُ كَيْفَ تَوَصَّلْتُ إِلَى الإِجَابَةِ.</>}
          hint="كَمْ رِيَالًا مَعَ كُلٍّ مِنْهُمَا؟"
          steps={[
            { text: 'مَعَ كُلٍّ مِنْهُمَا ٥٧ رِيَالًا.' },
            { text: <>حَمَدٌ: <Eq>٥٧ − ٣ = ٥٤</Eq></> },
            { text: <>سَلْمَانُ: <Eq>٥٧ − ٢٠ = ٣٧</Eq></> },
            { text: 'حَمَدٌ', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>الْعَدُّ<br />التَّنَازُلِيُّ</>, [{"cap": "أَبْدَأُ", "text": "بِالْعَدَدِ الْكَبِيرِ"}, {"cap": "الآحَادُ", "text": "٥٧، ٥٦، ٥٥، ٥٤"}, {"cap": "الْعَشَرَاتُ", "text": "٥٧، ٤٧، ٣٧، ٢٧"}, {"cap": "أَنْتَبِهُ", "text": "أَطْرَحُ ١٠ فِي كُلِّ مَرَّةٍ مَعَ الْعَشَرَاتِ"}]),
    exitSlide('أعدّ تنازليًّا', [["٤٨ − ٣ = ؟", ["٤٥", "١٨", "٥١"], "٤٥"], ["٧٥ − ٢٠ = ؟", ["٧٣", "٥٥", "٩٥"], "٥٥"], ["٦٢ − ٤٠ = ؟", ["٢٢", "٥٨", "١٠٢"], "٢٢"]]),
    endSlide,
  ],
});
