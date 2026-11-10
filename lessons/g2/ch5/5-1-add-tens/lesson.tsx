import {
  BookLabel, Card, Cols, Eq, ExitTicket, Goals, Grid, Lines, MCQ, MindMap, QText, QuestionGroup, QuestionSlide, RegroupExplorer, Sentence, SentenceCard,
  SlideHead, SumCard, TenOnes, TensCard, Blank, defineLesson, endSlide, clipSlide, storySlide, Fingers, trapSlide,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ، ص ١١٠';
const PRACTICE = 'أتدرَّبُ، ص ١١١';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١١١';
const FIND = 'أَجِدُ نَاتِجَ الْجَمْعِ مُسْتَعْمِلًا قِطَعَ الْعَشَرَاتِ:';
const SentenceQ = ({ n, a, b }: { n: number; a: number; b: number }) => <SentenceCard n={n} lines={[[a, '+', b, '=', { b: a + b }]]} />;
const V = ({ n, a, b }: { n: number; a: number; b: number }) => <SumCard n={n} sums={[{ a, op: '+', b, v: a + b }]} />;

export default defineLesson({
  meta: {
    id: 'g2-5-1-add-tens',
    design: 'v2',
    code: '٥-١',
    title: 'جَمْعُ الْعَشَرَاتِ',
    shortTitle: 'جمع العشرات',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الخامس: جمع الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١١٠–١١١',
    minutes: 45,
    idea: 'أَسْتَعْمِلُ حَقَائِقَ الْجَمْعِ لِأَجْمَعَ الْعَشَرَاتِ.',
    bookQuestions: 22,
  },
  sectionDesc: {
    engage: 'حقائق الجمع',
    explore: 'الأصابع، أضيف عشرات',
    explain: 'أستعد',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٧',
    practice: 'الأسئلة ٨–٢١',
    hot: 'السؤال ٢٢',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. اسأل: كم وحدة في العشرة الواحدة؟',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Card kind="rule" cap="فكرة الدرس">أَسْتَعْمِلُ حَقَائِقَ الْجَمْعِ لِأَجْمَعَ الْعَشَرَاتِ.</Card>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals items={['أَقْرَأُ الْعَشَرَاتِ مِنَ الْقِطَعِ.', 'أَجْمَعُ الْعَشَرَاتِ كَمَا أَجْمَعُ الآحَادَ.', 'أَكْتُبُ نَاتِجَ الْجَمْعِ.']} />
            </Card>
          </Cols>
        </>
      ),
    },
    {
      sec: 'engage', min: 3,
      notes: 'مراجعة حقائق الجمع التي سنستعملها بعد قليل.',
      content: (
        <>
          <SlideHead tag="نتذكر" kind="ink">حقائق الجمع</SlideHead>
          <Grid cols={3}>
            <MCQ q="٣ + ٤ = ؟" options={['٦', '٧', '٨']} answer="٧" award />
            <MCQ q="٢ + ٦ = ؟" options={['٨', '٩', '٤']} answer="٨" award />
            <MCQ q="١ + ٥ = ؟" options={['٤', '٥', '٦']} answer="٦" award />
          </Grid>
        </>
      ),
    },
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند السؤال ودع الطلاب يقترحون: كيف نعرف بسرعة؟ لا تعطِ الجواب؛ نعود إليها بعد الشرح.'),
    {
      sec: 'explore', min: 4,
      notes: 'مثال جديد غير القصة: ٤٠ + ٢٠. اضغط «التالي» والفصل يعدّ مع الصوت. ثم غيّر العددين واسأل: كم صار؟',
      content: (
        <>
          <SlideHead tag="نُجَرِّبُ مِثَالًا آخَرَ" kind="ex">نَعُدُّ بِالْعَشَرَاتِ</SlideHead>
          <Fingers a={4} b={2} />
        </>
      ),
    },
    {
      sec: 'explore', min: 4,
      notes: 'اقرأ المهمة. ادعُ طالبًا يضغط «نُضِيفُ عَشَرَةً» مرة بعد مرة، والفصل يعدّ: ٢٠، ٣٠… حتى يضيفوا ٥ عشرات. اسأل: كم صار معنا؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">أضيف عشرات</SlideHead>
          <RegroupExplorer start={10} tensOnly add={5} />
        </>
      ),
    },
    {
      sec: 'explain', min: 4,
      notes: 'أنا أعمل: نعدّ العشرات كما نعدّ الآحاد. ٥ + ٣ = ٨، إذن ٥ عشرات + ٣ عشرات = ٨ عشرات.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١١٠" kind="rule">حقائق الجمع تساعدني</SlideHead>
          <QText>حَقَائِقُ الْجَمْعِ تُسَاعِدُنِي عَلَى جَمْعِ الْعَشَرَاتِ. أَجِدُ نَاتِجَ ٥٠ + ٣٠</QText>
          <TenOnes values={[50, 30]} big />
          <Lines>
            <div className="tenline"><b>٥</b> عَشَرَاتٍ + <b>٣</b> عَشَرَاتٍ = <Blank v={8} /> عَشَرَاتٍ</div>
            <Sentence t={[50, '+', 30, '=', { b: 80 }]} big />
          </Lines>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: علب الأقلام (مثال غير مثال الكتاب). أوقفه قبل الناتج واسأل: كم علبة صارت؟'),
    {
      sec: 'elab', min: 4,
      notes: 'نعمل معًا: اختر طالبًا بالعجلة، واطلب منه قول الحقيقة التي استعملها.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أجمع العشرات</SlideHead>
          <Grid cols={3}>
            <MCQ q="٢ عَشَرَاتٍ + ٢ عَشَرَاتٍ = ؟" options={['٤ عَشَرَاتٍ', '٢ عَشَرَاتٍ', '٤ آحَادٍ']} answer="٤ عَشَرَاتٍ" award />
            <MCQ q="٧٠ + ١٠ = ؟" options={['٧١', '٨٠', '٩٠']} answer="٨٠" award />
            <MCQ q="٤٠ + ٥٠ = ؟" options={['٩', '٩٠', '٨٠']} answer="٩٠" award />
          </Grid>
        </>
      ),
    },
    trapSlide(
      [
      { q: '٣ + ٤', a: '٧' },
      { q: '٣٠ + ٤٠', a: '٧٠' },
      { q: '٣٠ + ٥٠', a: '٨٠' },
      { q: '٦٠ + ٣٠', a: '٩٠' },
      { q: '٣٠ + ٤', a: '٣٤', trap: true },
      ],
      'كل سطر يغيّر شيئًا واحدًا؛ اطلب الجواب قبل كشفه. الأخير فخ: ٣٠ + ٤ ليست ٧٠، فالـ٤ آحاد لا عشرات.',
    ),
    {
      sec: 'check', min: 5,
      notes: 'كل ضغطة خانة: العشرات أولًا ثم الجملة بالأعداد.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={120}>
          <TensCard n={1} a={40} b={20} rods />
          <TensCard n={2} a={60} b={10} rods />
          <TensCard n={3} a={30} b={40} />
          <TensCard n={4} a={20} b={30} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'السؤالان ٥ و٦ بلا قطع: اسأل عن الحقيقة قبل الناتج.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={60}>
          <SentenceQ n={5} a={30} b={50} />
          <SentenceQ n={6} a={20} b={20} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: نستعمل حقيقة الآحاد للعشرات.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ أَسْتَفِيدُ مِنْ حَقِيقَةِ الْجَمْعِ ٤ + ٥ لِأَعْرِفَ نَاتِجَ ٤٠ + ٥٠؟"
          hint="كَمْ عَشَرَةً فِي ٤٠؟ وَكَمْ عَشَرَةً فِي ٥٠؟"
          steps={[
            { text: <Eq>٤ + ٥ = ٩</Eq> },
            { text: '٤ عَشَرَاتٍ + ٥ عَشَرَاتٍ = ٩ عَشَرَاتٍ' },
            { text: 'أَجْمَعُ الْعَشَرَاتِ كَمَا أَجْمَعُ الآحَادَ، فَالنَّاتِجُ ٩٠.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'مثل الأسئلة الأولى. اطلب من طالب أن يشير إلى العصي ويعدّها.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={2} time={120}>
          <TensCard n={8} a={10} b={70} rods />
          <TensCard n={9} a={30} b={10} rods />
          <TensCard n={10} a={20} b={50} />
          <TensCard n={11} a={60} b={30} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'الجمع الرأسي: كل ضغطة ناتج سؤال.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <SentenceQ n={12} a={50} b={10} />
          <SentenceQ n={13} a={20} b={40} />
          <V n={14} a={40} b={40} />
          <V n={15} a={40} b={30} />
          <V n={16} a={50} b={40} />
          <V n={17} a={30} b={20} />
          <V n={18} a={50} b={20} />
          <V n={19} a={80} b={10} />
          <V n={20} a={20} b={70} />
          <V n={21} a={30} b={30} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'الحس العددي: نقرأ القصة ونكتب الجملة.',
      content: (
        <QuestionSlide
          source={HOT} n={22} chart={null} long
          question={<><BookLabel>الْحِسُّ الْعَدَدِيُّ:</BookLabel> جَمَعَتْ آمِنَةُ ٤٠ جَزَرَةً يَوْمَ الْجُمُعَةِ، ثُمَّ جَمَعَتْ ١٠ جَزَرَاتٍ أُخْرَى يَوْمَ السَّبْتِ. كَمْ جَزَرَةً جَمَعَتْ آمِنَةُ فِي الْيَوْمَيْنِ؟</>}
          hint="مَاذَا تَعْنِي كَلِمَةُ «أُخْرَى»؟"
          steps={[
            { text: 'جَمَعَتْ ٤٠ جَزَرَةً، ثُمَّ ١٠ جَزَرَاتٍ.' },
            { text: 'نَجْمَعُ الْعَدَدَيْنِ.' },
            { text: <Eq>٤٠ + ١٠ = ٥٠</Eq> },
            { text: '٥٠ جَزَرَةً', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب إكمال كل فرع شفهيًا.',
      content: (
        <>
          <SlideHead tag="أهمّ الأفكار" kind="rule">ملخص الدرس</SlideHead>
          <MindMap
            center={<>جَمْعُ<br />الْعَشَرَاتِ</>}
            items={[
              { kind: 'rule', cap: 'الْحَقِيقَةُ', text: '٣ + ٢ = ٥' },
              { kind: 'ex', cap: 'الْعَشَرَاتُ', text: '٣ عَشَرَاتٍ + ٢ عَشَرَاتٍ = ٥ عَشَرَاتٍ' },
              { kind: 'qs', cap: 'الأَعْدَادُ', text: '٣٠ + ٢٠ = ٥٠' },
              { kind: 'warn', cap: 'أَنْتَبِهُ', text: '٣٠ + ٢٠ يَخْتَلِفُ عَنْ ٣ + ٢' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 3,
      notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">أجمع العشرات</SlideHead>
          <ExitTicket>
            <MCQ q="١٠ + ٢٠ = ؟" options={['٣', '٣٠', '٢١']} answer="٣٠" />
            <MCQ q="٦٠ + ٢٠ = ؟" options={['٨٠', '٦٢', '٤٠']} answer="٨٠" />
            <MCQ q="أَيُّ حَقِيقَةٍ تُسَاعِدُنِي عَلَى ٧٠ + ٢٠؟" options={['٧ + ٢', '٧ − ٢', '٢ + ٢']} answer="٧ + ٢" />
          </ExitTicket>
        </>
      ),
    },
    endSlide,
  ],
});
