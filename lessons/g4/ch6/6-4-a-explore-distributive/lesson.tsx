import {
  Area4, Card, Cols, Eq, Lines, Mark, QCard, QuestionGroup, QuestionSlide, Sentence, SlideHead, Solution, Stack, Step, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const THINK = 'فكِّرْ، ص ١٨٧';
const CHECK = 'تأكَّدْ، ص ١٨٧';
const USE = 'استعملْ نموذجَ المستطيلِ وخاصيةَ التوزيعِ لتجدَ ناتجَ الضَّربِ:';

export default defineLesson({
  meta: {
    id: 'g4-6-4-a-explore-distributive',
    design: 'v2',
    code: '٦-٤',
    title: 'استكشافٌ: ضربُ عددٍ منْ رقمينِ في عددٍ منْ رقمينِ',
    shortTitle: 'استكشاف: ضرب عدد من رقمين في عدد من رقمين',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل السادس: الضرب في عدد من رقمين',
    source: 'الجزء الأول، ص ١٨٦–١٨٧',
    minutes: 45,
    idea: 'أستكشفُ الضَّربَ في عددٍ منْ رقمينِ.',
    bookQuestions: 10,
  },
  sectionDesc: {"engage": "تجزئة العدد", "explore": "نشاط", "explain": "خاصية التوزيع", "check": "الأسئلة ١–١٠", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أستكشفُ الضَّربَ في عددٍ منْ رقمينِ.', ["أُجزِّئُ العددينِ إلى عشراتٍ وآحادٍ.", "أجدُ نواتجَ الضَّربِ الجزئيَّةَ.", "أجمعُها."], <Mark>خاصيةُ توزيعِ الضَّربِ على الجمعِ</Mark>),
    askSlide('engage', 'تجزئة العدد', [["١٥ = ؟ + ٥", ["١٠", "٥", "١٥"], "١٠"], ["١٠ × ١٠ = ؟", ["١٠٠", "٢٠", "١٠٠٠"], "١٠٠"], ["٣ × ١١ = ؟", ["٣٣", "١٤", "٣١"], "٣٣"]], 'نراجع التجزئة والضرب في عشرة.'),
    {
      sec: 'explore', min: 7,
      notes: 'النشاط كما في الكتاب: نجزّئ ١٥ و١٢، ثم نجد نواتج كل جزء ونجمعها.',
      content: (
        <>
          <SlideHead tag="نشاطٌ، ص ١٨٦" kind="ex">أوجدْ ناتجَ ١٢ × ١٥</SlideHead>
          <Cols>
            <Solution>
              <Step hl={['n0']}><Eq>١٠ × ١٠ = ١٠٠</Eq></Step>
              <Step hl={['n1']}><Eq>١٠ × ٥ = ٥٠</Eq></Step>
              <Step hl={['n2']}><Eq>٢ × ١٠ = ٢٠</Eq></Step>
              <Step hl={['n3']}><Eq>٢ × ٥ = ١٠</Eq></Step>
              <Step kind="ans" label="نجمعُ النواتجَ"><Eq>١٢ × ١٥ = ١٨٠</Eq></Step>
            </Solution>
            <Area4 w={[10, 5]} h={[10, 2]} />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'اقرأ المفهوم من الكتاب.',
      content: (
        <>
          <SlideHead tag="مفهومٌ أساسيٌّ، ص ١٨٦" kind="rule">خاصية التوزيع</SlideHead>
          <Card kind="rule" cap="خاصيةُ التوزيعِ">لضربِ مجموعِ عددينِ في عددٍ ثالثٍ، اضرِبْ كلًّا منهُما في ذلكَ العددِ، ثمَّ اجمعْ ناتجَيِ الضَّربِ.</Card>
          <Solution>
            <Step><Eq>٣ × ١١ = ٣ × (١٠ + ١)</Eq></Step>
            <Step><Eq>= (٣ × ١٠) + (٣ × ١)</Eq></Step>
            <Step kind="ans" label="الناتجُ"><Eq>٣٠ + ٣ = ٣٣</Eq></Step>
          </Solution>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ١٣ × ١٤ (مثال غير أمثلة الكتاب).'),
    {
      sec: 'check', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={THINK} n={1} chart={null} time={120}
          question={"كيفَ تستعملُ خاصيةَ التوزيعِ لتجدَ ناتجَ ١٢ × ١٨؟"}
          hint="كيفَ نُجزِّئُ ١٨؟"
          steps={[
            { text: 'نُجزِّئُ ١٨ إلى ١٠ و٨' },
            { text: <Eq>١٢ × ١٠ = ١٢٠</Eq> },
            { text: <Eq>١٢ × ٨ = ٩٦</Eq> },
            { text: <Eq>١٢٠ + ٩٦ = ٢١٦</Eq>, kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} chart={<Area4 w={[10, 7]} h={[10, 2]} />} time={120}
          question={"اكتُبْ جملةَ الضَّربِ لهذا النموذجِ:"}
          hint="ما بُعدا المستطيلِ؟"
          steps={[
            { text: 'العرضُ ١٠ + ٧ = ١٧' },
            { text: 'الارتفاعُ ١٠ + ٢ = ١٢' },
            { text: <Eq>١٢ × ١٧ = ٢٠٤</Eq>, kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} chart={<Area4 w={[20, 3]} h={[10, 4]} />} time={120}
          question={"اكتُبْ جملةَ الضَّربِ لهذا النموذجِ:"}
          hint="ما بُعدا المستطيلِ؟"
          steps={[
            { text: 'العرضُ ٢٠ + ٣ = ٢٣' },
            { text: 'الارتفاعُ ١٠ + ٤ = ١٤' },
            { text: <Eq>١٤ × ٢٣ = ٣٢٢</Eq>, kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 4,
      notes: 'ضغطة للنواتج الجزئية وضغطة لمجموعها.',
      content: (
        <QuestionGroup source={CHECK} instruction={USE} cols={3} time={120}>
          <QCard n={4}><Stack><Lines><Sentence t={[12, '×', 10]} /></Lines><Step>١٠٠ + ٢٠</Step><Lines><Sentence t={['=' , { b: 120, box: true }]} /></Lines></Stack></QCard>
          <QCard n={5}><Stack><Lines><Sentence t={[14, '×', 18]} /></Lines><Step>١٠٠ + ٨٠ + ٤٠ + ٣٢</Step><Lines><Sentence t={['=' , { b: 252, box: true }]} /></Lines></Stack></QCard>
          <QCard n={6}><Stack><Lines><Sentence t={[25, '×', 28]} /></Lines><Step>٤٠٠ + ١٦٠ + ١٠٠ + ٤٠</Step><Lines><Sentence t={['=' , { b: 700, box: true }]} /></Lines></Stack></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 4,
      notes: 'ضغطة للنواتج الجزئية وضغطة لمجموعها.',
      content: (
        <QuestionGroup source={CHECK} instruction={USE} cols={3} time={120}>
          <QCard n={7}><Stack><Lines><Sentence t={[16, '×', 13]} /></Lines><Step>١٠٠ + ٣٠ + ٦٠ + ١٨</Step><Lines><Sentence t={['=' , { b: 208, box: true }]} /></Lines></Stack></QCard>
          <QCard n={8}><Stack><Lines><Sentence t={[17, '×', 15]} /></Lines><Step>١٠٠ + ٥٠ + ٧٠ + ٣٥</Step><Lines><Sentence t={['=' , { b: 255, box: true }]} /></Lines></Stack></QCard>
          <QCard n={9}><Stack><Lines><Sentence t={[19, '×', 20]} /></Lines><Step>٢٠٠ + ١٨٠</Step><Lines><Sentence t={['=' , { b: 380, box: true }]} /></Lines></Stack></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={10} tags={[{ kind: 'warn', text: 'اُكْتُبْ' }]} chart={null}
          question="كيفَ تجدُ ناتجَ ١٦ × ١٩؟"
          hint="كيفَ نُجزِّئُ العددينِ؟"
          steps={[
            { text: 'نُجزِّئُ العددينِ إلى عشراتٍ وآحادٍ.' },
            { text: <Eq>١٠٠ + ٩٠ + ٦٠ + ٥٤ = ٣٠٤</Eq> },
            { text: 'أجمعُ النواتجَ الجزئيَّةَ، فيكونُ الناتجُ ٣٠٤.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    mindSlide(<>خاصيةُ<br />التوزيعِ</>, [{"cap": "أُجزِّئُ", "text": "١٥ = ١٠ + ٥"}, {"cap": "أضربُ", "text": "كلَّ جزءٍ في كلِّ جزءٍ"}, {"cap": "أجمعُ", "text": "١٠٠ + ٥٠ + ٢٠ + ١٠"}, {"cap": "الناتجُ", "text": "١٢ × ١٥ = ١٨٠"}]),
    exitSlide('خاصية التوزيع', [["١١ × ١٢ = ؟", ["١٣٢", "٢٣", "١٢١"], "١٣٢"], ["١٠ × ١٥ = ؟", ["١٥٠", "٢٥", "١٠٥"], "١٥٠"], ["١٣ × ١٢ = ؟", ["١٥٦", "٢٥", "١٤٦"], "١٥٦"]]),
    endSlide,
  ],
});
