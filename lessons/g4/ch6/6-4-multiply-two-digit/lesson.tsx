import {
  BookGroup, BookLabel, Cols, Eq, FnTable, QCard, QCol, QText, QuestionGroup, QuestionSlide, SlideHead, Solution, Stack, Step, VMul2, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'تأكَّدْ، ص ١٨٩';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ١٩٠';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٩٠';
const FIND = 'أَوْجِدْ ناتجَ الضَّربِ:';
const REAL = 'مسألةٌ منْ واقعِ الحياةِ، ص ١٩٠';

export default defineLesson({
  meta: {
    id: 'g4-6-4-multiply-two-digit',
    design: 'v2',
    code: '٦-٤',
    title: 'ضربُ عددٍ منْ رقمينِ في عددٍ منْ رقمينِ',
    shortTitle: 'ضرب عدد من رقمين في عدد من رقمين',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل السادس: الضرب في عدد من رقمين',
    source: 'الجزء الأول، ص ١٨٨–١٩٠',
    minutes: 45,
    idea: 'أجدُ ناتجَ ضربِ عددٍ منْ رقمينِ في عددٍ منْ رقمينِ.',
    bookQuestions: 21,
  },
  sectionDesc: {"engage": "تذكّر", "explain": "أمثلة الكتاب", "elab": "نعمل معًا", "check": "الأسئلة ١–٥", "practice": "الأسئلة ٦–١٨", "hot": "الأسئلة ١٩–٢١", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أجدُ ناتجَ ضربِ عددٍ منْ رقمينِ في عددٍ منْ رقمينِ.', ["أضربُ في الآحادِ.", "أضربُ في العشراتِ.", "أجمعُ الناتجينِ."]),
    askSlide('engage', 'تذكّر', [["٤٣ × ٢ = ؟", ["٨٦", "٤٥", "٦٨"], "٨٦"], ["٤٣ × ١٠ = ؟", ["٤٣٠", "٥٣", "٤٣"], "٤٣٠"], ["٨٦ + ٤٣٠ = ؟", ["٥١٦", "٤١٦", "٥٠٦"], "٥١٦"]], 'هذه الأعداد نفسها نحتاجها في مثال الكتاب.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: الطريقة الثانية في الكتاب، والأولى نواتج جزئية كما في الاستكشاف.',
      content: (
        <>
          <SlideHead tag="استعدَّ، ص ١٨٨" kind="rule">الذئب</SlideHead>
          <Cols>
            <QCol>
              <QText>إذا كانَ الذِّئبُ يقطعُ ٤٣ كيلومترًا في السَّاعةِ، فكمْ يقطعُ في ١٢ ساعةً؟</QText>
              <Solution>
                <Step hl={['n0']}><BookLabel>الخطوةُ ١:</BookLabel> نضربُ الآحادَ: <Eq>٢ × ٤٣ = ٨٦</Eq></Step>
                <Step hl={['n1']}><BookLabel>الخطوةُ ٢:</BookLabel> نضربُ العشراتَ: <Eq>١٠ × ٤٣ = ٤٣٠</Eq></Step>
                <Step hl={['n2']}><BookLabel>الخطوةُ ٣:</BookLabel> نجمعُ: <Eq>٨٦ + ٤٣٠ = ٥١٦</Eq></Step>
                <Step kind="ans" label="يقطعُ الذِّئبُ">٥١٦ كيلومترًا</Step>
              </Solution>
            </QCol>
            <VMul2 a={43} b={12} byHl />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'تحقق: ٩١٢ قريب من التقدير ٨٠٠.',
      content: (
        <>
          <SlideHead tag="مثالٌ منْ واقعِ الحياةِ، ص ١٨٩" kind="rule">الفواتير</SlideHead>
          <Cols>
            <QCol>
              <QText>كمْ ريالًا يُسدِّدُ لفاتورةِ الماءِ في سنتينِ؟ تبلغُ فاتورةُ الماءِ لمنزلِ محمَّدٍ ٣٨ ريالًا شهريًّا، وهناكَ ٢٤ شهرًا في السَّنتينِ.</QText>
              <Solution>
                <Step><BookLabel>قدِّرْ:</BookLabel> <Eq>٤٠ × ٢٠ = ٨٠٠</Eq></Step>
                <Step hl={['n0']}><BookLabel>الخطوةُ ١:</BookLabel> <Eq>٤ × ٣٨ = ١٥٢</Eq></Step>
                <Step hl={['n1']}><BookLabel>الخطوةُ ٢:</BookLabel> <Eq>٢٠ × ٣٨ = ٧٦٠</Eq></Step>
                <Step hl={['n2']}><BookLabel>الخطوةُ ٣:</BookLabel> نجمعُ النواتجَ.</Step>
                <Step kind="ans" label="يدفعُ محمَّدٌ">٩١٢ ريالًا</Step>
              </Solution>
            </QCol>
            <VMul2 a={38} b={24} byHl />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٢٧ × ١٣ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أضرب وأجمع', [["٣١ × ١٢: ناتجُ ضربِ الآحادِ؟", ["٦٢", "٣١", "٣١٠"], "٦٢"], ["٣١ × ١٢: ناتجُ ضربِ العشراتِ؟", ["٣١٠", "٣١", "٦٢"], "٣١٠"], ["٣١ × ١٢ = ؟", ["٣٧٢", "٣٦٢", "٤٢"], "٣٧٢"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 6,
      notes: 'كل ضغطة سطر: ضرب الآحاد، ضرب العشرات، الجمع.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={180}>
          <QCard n={1}><VMul2 a={35} b={24} /></QCard>
          <QCard n={2}><VMul2 a={57} b={42} /></QCard>
          <QCard n={3}><VMul2 a={92} b={81} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} chart={null} time={120}
          question={"زرعَ فلَّاحٌ ٣٥ صفًّا منْ نبتةِ الطَّماطمِ. إذا كانَ في كلِّ صفٍّ ٢٥ نبتةً، فكمْ نبتةً قدْ زرعَها؟"}
          hint="أيُّ عمليَّةٍ تناسبُ «في كلِّ صفٍّ»؟"
          steps={[
            { text: 'نضربُ عددَ الصُّفوفِ في عددِ النَّباتاتِ.' },
            { text: <Eq>٣٥ × ٢٥ = ٨٧٥</Eq> },
            { text: '٨٧٥ نبتةً', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]} chart={null}
          question="ما الخطواتُ الَّتي تتبعُها لإيجادِ ناتجِ ضربِ ٥٦ × ٢٣؟ اشرَحْ ذلكَ."
          hint="بماذا نبدأُ؟"
          steps={[
            { text: <Eq>٣ × ٥٦ = ١٦٨</Eq> },
            { text: <Eq>٢٠ × ٥٦ = ١١٢٠</Eq> },
            { text: <Eq>١٦٨ + ١١٢٠ = ١٢٨٨</Eq>, kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 6,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={240}>
          <QCard n={6}><VMul2 a={19} b={15} /></QCard>
          <QCard n={7}><VMul2 a={42} b={38} /></QCard>
          <QCard n={8}><VMul2 a={52} b={47} /></QCard>
          <QCard n={9}><VMul2 a={68} b={46} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 6,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={240}>
          <QCard n={10}><VMul2 a={47} b={24} /></QCard>
          <QCard n={11}><VMul2 a={64} b={46} /></QCard>
          <QCard n={12}><VMul2 a={83} b={67} /></QCard>
          <QCard n={13}><VMul2 a={91} b={78} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={14} chart={null} time={120}
          question={"يعدُّ نباتُ الخيزرانِ (البامبو) أسرعَ النباتاتِ نموًّا، فيبلغُ معدَّلُ نموِّهِ ٩١ سم يوميًّا. فكمْ سنتمترًا تنمو نبتةٌ في ٣ أسابيعَ؟"}
          hint="كمْ يومًا في ٣ أسابيعَ؟"
          steps={[
            { text: '٣ أسابيعَ = ٢١ يومًا' },
            { text: <Eq>٩١ × ٢١ = ١٩١١</Eq> },
            { text: '١٩١١ سم', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={15} chart={null} time={120}
          question={<><BookLabel>القياسُ:</BookLabel> تجمعُ مؤسَّسةٌ لإعادةِ تدويرِ الورقِ ٢٨ حاويةً منَ الورقِ يوميًّا، كمْ حاويةً تجمعُ في ١٥ يومًا؟</>}
          hint="أيُّ عمليَّةٍ تناسبُ «يوميًّا»؟"
          steps={[
            { text: <Eq>٢٨ × ١٥ = ٤٢٠</Eq> },
            { text: '٤٢٠ حاويةً', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'نقرأ المسألة معًا، ثم نحل كل سؤال.',
      content: (
        <BookGroup source={REAL} intro="سيَّاراتٌ: يُبيِّنُ الجدولُ المجاورُ عددَ السيَّاراتِ الصَّغيرةِ والسيَّاراتِ الكبيرةِ الَّتي يتمُّ فحصُها في ورشةٍ خلالَ شهرٍ:" chart={<FnTable title="الصيانةُ الدوريَّةُ" heads={['السيَّاراتُ', 'العددُ']} rows={[['الصغيرةُ', 60], ['الكبيرةُ', 46]]} />} qs={[
            { n: 16, question: "كمْ سيَّارةً صغيرةً يتمُّ فحصُها في ١١ شهرًا؟", steps: [{ text: <Eq>٦٠ × ١١ = ٦٦٠</Eq> }, { text: '٦٦٠ سيَّارةً', kind: 'ans' }] },
            { n: 17, question: "كمْ سيَّارةً كبيرةً يتمُّ فحصُها في ١٢ شهرًا؟", steps: [{ text: <Eq>٤٦ × ١٢ = ٥٥٢</Eq> }, { text: '٥٥٢ سيَّارةً', kind: 'ans' }] },
            { n: 18, question: "كمْ يزيدُ عددُ السيَّاراتِ الصَّغيرةِ الَّتي يتمُّ فحصُها في ١٥ سنةً على عددِ السيَّاراتِ الكبيرةِ؟", steps: [{ text: '١٥ سنةً = ١٨٠ شهرًا' }, { text: <Eq>٦٠ − ٤٦ = ١٤</Eq> }, { text: <Eq>١٤ × ١٨٠ = ٢٥٢٠</Eq> }, { text: '٢٥٢٠ سيَّارةً', kind: 'ans' }] },
        ]} />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={19} chart={<Stack><Eq>٢٠ × ■■ = ■٠٠</Eq></Stack>} time={120}
          question={<><BookLabel>مسألةٌ مفتوحةٌ:</BookLabel> اكتُبِ الرقمَ المفقودَ في كلِّ ■، لتكونَ جملةُ الضَّربِ صحيحةً:</>}
          hint="ماذا لوْ ضربْنا ٢٠ في ١٥؟"
          steps={[
            { text: <Eq>٢٠ × ١٥ = ٣٠٠</Eq> },
            { text: '١٥ و٣٠٠', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={20} chart={<Stack><Eq>٢٢ × ١٥</Eq><Eq>٤٥ × ٢٨</Eq><Eq>٣٧ × ١٨</Eq><Eq>٦٦ × ٢٥</Eq></Stack>} time={120}
          question={<><BookLabel>اكتشفِ المختلفَ:</BookLabel> أيُّ عمليَّاتِ الضَّربِ الآتيةِ تختلفُ عنِ العمليَّاتِ الثَّلاثِ الباقيةِ؟</>}
          hint="بماذا ينتهي كلُّ ناتجٍ؟"
          steps={[
            { text: '٣٣٠، ١٢٦٠، ١٦٥٠ تنتهي بصفرٍ.' },
            { text: <Eq>٣٧ × ١٨ = ٦٦٦</Eq> },
            { text: <Eq>٣٧ × ١٨</Eq>, kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={HOT} n={21} tags={[{ kind: 'warn', text: 'اُكْتُبْ' }]} chart={null}
          question="إذا ضربْتَ عددينِ كلٌّ منهُما يتكوَّنُ منْ رقمينِ، فإنَّ ناتجَ الضَّربِ لنْ يكونَ منْ رقمينِ. فسِّرْ إجابتَكَ."
          hint="ما أصغرُ عددٍ منْ رقمينِ؟"
          steps={[
            { text: 'أصغرُ عددٍ منْ رقمينِ ١٠' },
            { text: <Eq>١٠ × ١٠ = ١٠٠</Eq> },
            { text: 'أصغرُ ناتجٍ ١٠٠، وهوَ منْ ٣ أرقامٍ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    mindSlide(<>ضربُ رقمينِ<br />في رقمينِ</>, [{"cap": "أوَّلًا", "text": "أضربُ في الآحادِ"}, {"cap": "ثانيًا", "text": "أضربُ في العشراتِ"}, {"cap": "ثالثًا", "text": "أجمعُ الناتجينِ"}, {"cap": "تحقَّقْ", "text": "أُقارنُ بالتقديرِ"}]),
    exitSlide('أضرب في رقمين', [["٢٣ × ١٢ = ؟", ["٢٧٦", "٢٦٦", "٣٥"], "٢٧٦"], ["٣٤ × ٢١ = ؟", ["٧١٤", "٦١٤", "٥٥"], "٧١٤"], ["٤٥ × ٣٢ = ؟", ["١٤٤٠", "٧٧", "١٣٤٠"], "١٤٤٠"]]),
    endSlide,
  ],
});
