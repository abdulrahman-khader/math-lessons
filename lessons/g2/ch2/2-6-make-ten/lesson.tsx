import {
  BookLabel, BookSource, Cols, Ctrls, Eq, Lines, NextButton, QCard, QText, QuestionGroup, QuestionSlide, Sentence, SentenceCard, SlideHead, Solution, Stack, Step, SumCard, TenFrames, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ٥٠';
const PRACTICE = 'أتدرَّبُ، ص ٥١';
const FIND = 'أَجِدُ نَاتِجَ الْجَمْعِ مُسْتَعْمِلًا الْقِطَعَ الْحَمْرَاءَ وَالصَّفْرَاءَ:';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ٥١';

export default defineLesson({
  meta: {
    id: 'g2-2-6-make-ten',
    design: 'v2',
    code: '٢-٦',
    title: 'الْجَمْعُ بِتَكْوِينِ الْعَشَرَةِ',
    shortTitle: 'الجمع بتكوين العشرة',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثاني: طرائق الجمع',
    source: 'الجزء الأول، ص ٥٠–٥١',
    minutes: 45,
    idea: 'أُكَوِّنُ عَشَرَةً لِأَجِدَ نَاتِجَ الْجَمْعِ.',
    bookQuestions: 22,
  },
  sectionDesc: {"engage": "نتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٧", "practice": "الأسئلة ٨–٢١", "hot": "السؤال ٢٢", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أُكَوِّنُ عَشَرَةً لِأَجِدَ نَاتِجَ الْجَمْعِ.', ["أُمَثِّلُ الْعَدَدَيْنِ.", "أُحَرِّكُ قِطَعًا لِأُكَوِّنَ ١٠", "أَجِدُ نَاتِجَ الْجَمْعِ."]),
    askSlide('engage', 'نتذكر', [["٨ + ؟ = ١٠", ["٢", "٣", "١"], "٢"], ["٦ + ؟ = ١٠", ["٤", "٣", "٥"], "٤"], ["١٠ + ٢ = ؟", ["١٢", "١١", "٢٠"], "١٢"]], 'أعداد تكوّن العشرة.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: نكمل الإطار الأول ثم نعدّ ما بقي.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ٥٠" kind="rule">لأجد ناتج ٨ + ٤</SlideHead>
          <Cols>
            <Solution>
              <Step><BookLabel>أَوَّلًا:</BookLabel> أُمَثِّلُ ٨ بِالْحَمْرَاءِ، وَ٤ بِالصَّفْرَاءِ.</Step>
              <Step hl={['n0']}><BookLabel>ثَانِيًا:</BookLabel> أُحَرِّكُ دَائِرَتَيْنِ صَفْرَاوَيْنِ لِتَكْوِينِ ١٠</Step>
              <Step>أُمَثِّلُ ٨ + ٤ عَلَى صُورَةِ ١٠ + ٢</Step>
              <Step kind="ans" label="أَخِيرًا: نَاتِجُ الْجَمْعِ"><Eq>٨ + ٤ = ١٢</Eq></Step>
            </Solution>
            <TenFrames a={8} b={4} moved />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٩ + ٦ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أكوّن عشرة', [["٩ + ٣: نُحَرِّكُ مِنَ الثَّلَاثَةِ", ["١", "٢", "٣"], "١"], ["٩ + ٣ = ١٠ + ؟", ["٢", "٣", "١"], "٢"], ["٧ + ٤ = ؟", ["١١", "١٠", "١٢"], "١١"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 4,
      notes: 'السؤالان ٢ و٣ إطاراهما فارغان في الكتاب: تظهر القطع مع الناتج.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={120}>
          <QCard n={1} className="tenscard"><Sentence t={[9, '+', 5, '=', { b: 14 }]} /><TenFrames a={9} b={5} /></QCard>
          <QCard n={2} className="tenscard"><Sentence t={[7, '+', 3, '=', { b: 10, hl: ["n2"] }]} /><TenFrames a={7} b={3} k={2} /></QCard>
          <QCard n={3} className="tenscard"><Sentence t={[8, '+', 5, '=', { b: 13, hl: ["n3"] }]} /><TenFrames a={8} b={5} k={3} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={60}>
          <SentenceCard n={4} lines={[[6, '+', 5, '=', { b: 11 }]]} />
          <SentenceCard n={5} lines={[[4, '+', 9, '=', { b: 13 }]]} />
          <SentenceCard n={6} lines={[[2, '+', 9, '=', { b: 11 }]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ يُسَاعِدُنِي تَكْوِينُ الْعَدَدِ عَشَرَةٍ عَلَى إِيجَادِ نَاتِجِ الْجَمْعِ؟"
          hint="مَاذَا يَبْقَى بَعْدَ تَكْوِينِ الْعَشَرَةِ؟"
          steps={[
            { text: 'أُكْمِلُ الْعَشَرَةَ مِنْ أَحَدِ الْعَدَدَيْنِ.' },
            { text: 'أُضِيفُ مَا بَقِيَ إِلَى ١٠، فَيَسْهُلُ الْجَمْعُ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'أتذكر من الكتاب: أكوّن عشرة لأجمع أو أجمع العدد ونفسه.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={120}>
          <SentenceCard n={8} lines={[[7, '+', 7, '=', { b: 14 }]]} />
          <SentenceCard n={9} lines={[[4, '+', 8, '=', { b: 12 }]]} />
          <SentenceCard n={10} lines={[[8, '+', 9, '=', { b: 17 }]]} />
          <SentenceCard n={11} lines={[[7, '+', 5, '=', { b: 12 }]]} />
          <SentenceCard n={12} lines={[[6, '+', 8, '=', { b: 14 }]]} />
          <SentenceCard n={13} lines={[[4, '+', 6, '=', { b: 10 }]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <SumCard n={14} sums={[{ a: 3, op: '+', b: 7, v: 10 }]} />
          <SumCard n={15} sums={[{ a: 8, op: '+', b: 8, v: 16 }]} />
          <SumCard n={16} sums={[{ a: 7, op: '+', b: 8, v: 15 }]} />
          <SumCard n={17} sums={[{ a: 1, op: '+', b: 9, v: 10 }]} />
          <SumCard n={18} sums={[{ a: 2, op: '+', b: 8, v: 10 }]} />
          <SumCard n={19} sums={[{ a: 9, op: '+', b: 9, v: 18 }]} />
          <SumCard n={20} sums={[{ a: 3, op: '+', b: 9, v: 12 }]} />
          <SumCard n={21} sums={[{ a: 6, op: '+', b: 9, v: 15 }]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 4,
      notes: 'الجبر: الطرف الأيسر يزيد والأيمن يزيد، فيبقى الطرفان متساويين.',
      content: (
        <>
          <BookSource>{HOT}</BookSource>
          <QCard n={22}>
            <Cols even>
              <QText><BookLabel>الْجَبْرُ:</BookLabel> أَكْتُبُ الأَعْدَادَ الْمَفْقُودَةَ، ثُمَّ أَجِدُ النَّمَطَ الْمُتَّبَعَ، وَأَصِفُهُ:</QText>
              <Lines>
                <Sentence t={[10, '+', 0, '=', 9, '+', 1]} />
                <Sentence t={[10, '+', 1, '=', 9, '+', 2]} />
                <Sentence t={[10, '+', { b: 2, box: true }, '=', { b: 9, box: true }, '+', 3]} />
                <Sentence t={[10, '+', { b: 3, box: true }, '=', { b: 9, box: true }, '+', { b: 4, box: true }]} />
                <Sentence t={[{ b: 10, box: true }, '+', { b: 4, box: true }, '=', { b: 9, box: true }, '+', { b: 5, box: true }]} />
              </Lines>
            </Cols>
            <Stack><Step kind="ans" label="النَّمَطُ">يَزْدَادُ كُلُّ عَدَدٍ مَفْقُودٍ ١</Step></Stack>
          </QCard>
          <Ctrls><NextButton /></Ctrls>
        </>
      ),
    },
    mindSlide(<>تَكْوِينُ<br />الْعَشَرَةِ</>, [{"cap": "أُمَثِّلُ", "text": "الْعَدَدَيْنِ"}, {"cap": "أُحَرِّكُ", "text": "قِطَعًا لِأُكْمِلَ ١٠"}, {"cap": "أَجْمَعُ", "text": "١٠ + ٢ = ١٢"}, {"cap": "مِثَالٌ", "text": "٨ + ٤ = ١٢"}]),
    exitSlide('أكوّن عشرة', [["٩ + ٢ = ؟", ["١١", "١٠", "١٢"], "١١"], ["٨ + ٥ = ؟", ["١٣", "١٢", "١٤"], "١٣"], ["٦ + ٧ = ؟", ["١٣", "١٢", "١٤"], "١٣"]]),
    endSlide,
  ],
});
