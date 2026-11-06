import {
  BookGroup, BookLabel, Cols, Eq, Lines, QCard, QCol, QText, QuestionGroup, QuestionSlide, Sentence, SlideHead, Solution, Stack, Step, VMul2, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'تأكَّدْ، ص ١٧٦';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ١٧٧';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٧٨';
const FIND = 'أَوْجِدْ ناتجَ الضَّربِ:';
const CHECK2 = 'تأكَّدْ، ص ١٧٧';
const REAL = 'مسألةٌ منْ واقعِ الحياةِ، ص ١٧٨';

export default defineLesson({
  meta: {
    id: 'g4-6-1-multiply-tens',
    design: 'v2',
    code: '٦-١',
    title: 'الضَّربُ في مُضاعفاتِ العشرةِ',
    shortTitle: 'الضرب في مضاعفات العشرة',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل السادس: الضرب في عدد من رقمين',
    source: 'الجزء الأول، ص ١٧٥–١٧٨',
    minutes: 45,
    idea: 'أضربُ أعدادًا في مُضاعفاتِ العشرةِ.',
    bookQuestions: 29,
  },
  sectionDesc: {"engage": "تذكّر الضرب", "explain": "أمثلة الكتاب", "elab": "نعمل معًا", "check": "الأسئلة ١–٨", "practice": "الأسئلة ٩–٢٦", "hot": "الأسئلة ٢٧–٢٩", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أضربُ أعدادًا في مُضاعفاتِ العشرةِ.', ["أضربُ الآحادَ، فيكونُ الناتجُ صفرًا.", "أضربُ العشراتِ.", "أتحقَّقُ بخصائصِ الضَّربِ."]),
    askSlide('engage', 'تذكّر الضرب', [["٤ × ١٠ = ؟", ["٤٠", "١٤", "٤٠٠"], "٤٠"], ["٢ × ٣٥ = ؟", ["٧٠", "٦٥", "٣٧"], "٧٠"], ["٥ × ٢٠ = ؟", ["١٠٠", "٢٥", "١٠"], "١٠٠"]], 'مراجعة: الضرب في العشرة وفي عدد من رقم واحد.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: منزلة الآحاد في الناتج صفر دائمًا.',
      content: (
        <>
          <SlideHead tag="استعدَّ، ص ١٧٥" kind="rule">صور حازم</SlideHead>
          <Cols>
            <QCol>
              <QText>التقطَ حازمٌ ٢٠ صورةً لبعضِ معالمِ المملكةِ وآثارِها، ثمَّ طبعَ منْ كلِّ صورةٍ ٢٥ نسخةً. ما عددُ الصُّورِ الَّتي طبعَها؟</QText>
              <Solution>
                <Step><BookLabel>الخطوةُ ١:</BookLabel> نضربُ الآحادَ: صفرُ آحادٍ × ٢٥ = ٠</Step>
                <Step hl={['n0']}><BookLabel>الخطوةُ ٢:</BookLabel> نضربُ العشراتِ: ٢ عشراتٍ × ٢٥ = ٥٠ عشرةً</Step>
                <Step kind="ans" label="عددُ الصُّورِ">٥٠٠ صورةٍ</Step>
              </Solution>
            </QCol>
            <VMul2 a={25} b={20} byHl />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'نتحقق بخصائص الضرب: ٣٠ = ٣ × ١٠.',
      content: (
        <>
          <SlideHead tag="مثالٌ منْ واقعِ الحياةِ، ص ١٧٦" kind="rule">تجارة</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>تجارةٌ:</BookLabel> لدى متجرٍ ٣٠ جهازَ تسجيلٍ، إذا كانَ ثمنُ الواحدِ منها ١٢٥ ريالًا. فما ثمنُ هذهِ الأجهزةِ؟</QText>
              <Solution>
                <Step hl={['n0']}>نضربُ الآحادَ ثمَّ العشراتِ: ٣ عشراتٍ × ١٢٥ = ٣٧٥ عشرةً</Step>
                <Step kind="ans" label="ثمنُ الأجهزةِ">٣٧٥٠ ريالًا</Step>
                <Step><BookLabel>تحقَّقْ:</BookLabel> <Eq>١٠ × ٣٧٥ = ٣٧٥٠</Eq></Step>
              </Solution>
            </QCol>
            <VMul2 a={125} b={30} byHl />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٣٤ × ٢٠ (مثال غير أمثلة الكتاب). أوقفه قبل الناتج.'),
    askSlide('elab', 'أضرب في العشرات', [["٤٢ × ٢٠ = ؟", ["٨٤٠", "٨٤", "٦٢"], "٨٤٠"], ["١٥ × ٦٠ = ؟", ["٩٠٠", "٩٠", "٧٥"], "٩٠٠"], ["منزلةُ الآحادِ في ٧٨ × ٣٠ هيَ:", ["٠", "٨", "٣"], "٠"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 6,
      notes: 'كل ضغطة ناتج سؤال.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={180}>
          <QCard n={1}><VMul2 a={36} b={10} /></QCard>
          <QCard n={2}><VMul2 a={53} b={30} /></QCard>
          <QCard n={3}><VMul2 a={79} b={80} /></QCard>
          <QCard n={4}><Lines><Sentence t={[255, '×', 20, '=', { b: 5100, box: true }]} /></Lines></QCard>
          <QCard n={5}><Lines><Sentence t={[389, '×', 40, '=', { b: 15560, box: true }]} /></Lines></QCard>
          <QCard n={6}><Lines><Sentence t={[518, '×', 70, '=', { b: 36260, box: true }]} /></Lines></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK2} n={7} chart={null} time={120}
          question={<><BookLabel>القياسُ:</BookLabel> يقطعُ سعيدٌ ٢٠ كيلومترًا أسبوعيًّا بدرَّاجتِهِ. إذا كانَ في السَّنةِ ٥٢ أسبوعًا تقريبًا، فكمْ كيلومترًا يقطعُ في السَّنةِ؟</>}
          hint="ماذا تعني كلمةُ «أسبوعيًّا»؟"
          steps={[
            { text: 'نضربُ عددَ الأسابيعِ في ٢٠.' },
            { text: <Eq>٥٢ × ٢٠ = ١٠٤٠</Eq> },
            { text: '١٠٤٠ كيلومترًا', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK2} n={8} tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]} chart={null}
          question="فسِّرْ كيفَ يمكنُكَ أنْ تستفيدَ منْ حسابِ ٤ × ٦٧، لتحسبَ ٤٠ × ٦٧"
          hint="ما العلاقةُ بينَ ٤ و٤٠؟"
          steps={[
            { text: <Eq>٤ × ٦٧ = ٢٦٨</Eq> },
            { text: '٤٠ = ٤ × ١٠' },
            { text: 'أضربُ الناتجَ في ١٠، فيكونُ ٢٦٨٠.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={120}>
          <QCard n={9}><VMul2 a={15} b={20} /></QCard>
          <QCard n={10}><VMul2 a={27} b={30} /></QCard>
          <QCard n={11}><VMul2 a={46} b={40} /></QCard>
          <QCard n={12}><VMul2 a={53} b={60} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 6,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={2} time={180}>
          <QCard n={13}><Lines><Sentence t={[80, '×', 80, '=', { b: 6400, box: true }]} /></Lines></QCard>
          <QCard n={14}><Lines><Sentence t={[94, '×', 90, '=', { b: 8460, box: true }]} /></Lines></QCard>
          <QCard n={15}><Lines><Sentence t={[275, '×', 10, '=', { b: 2750, box: true }]} /></Lines></QCard>
          <QCard n={16}><Lines><Sentence t={[312, '×', 30, '=', { b: 9360, box: true }]} /></Lines></QCard>
          <QCard n={17}><Lines><Sentence t={[381, '×', 50, '=', { b: 19050, box: true }]} /></Lines></QCard>
          <QCard n={18}><Lines><Sentence t={[457, '×', 50, '=', { b: 22850, box: true }]} /></Lines></QCard>
          <QCard n={19}><Lines><Sentence t={[564, '×', 70, '=', { b: 39480, box: true }]} /></Lines></QCard>
          <QCard n={20}><Lines><Sentence t={[698, '×', 80, '=', { b: 55840, box: true }]} /></Lines></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={21} chart={null} time={60}
          question={"إذا كانَ ٧ × ٢٩ = ٢٠٣، فما ناتجُ ٧٠ × ٢٩؟"}
          hint="ما العلاقةُ بينَ ٧ و٧٠؟"
          steps={[
            { text: '٧٠ = ٧ × ١٠' },
            { text: <Eq>١٠ × ٢٠٣ = ٢٠٣٠</Eq> },
            { text: '٢٠٣٠', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={22} chart={null} time={60}
          question={"إذا كانَ ٣ × ٥٢ = ١٥٦ فما ناتجُ ٣٠ × ٥٢؟"}
          hint="ما العلاقةُ بينَ ٣ و٣٠؟"
          steps={[
            { text: '٣٠ = ٣ × ١٠' },
            { text: <Eq>١٠ × ١٥٦ = ١٥٦٠</Eq> },
            { text: '١٥٦٠', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={23} chart={null} time={60}
          question={"يأكلُ طائرٌ صغيرٌ ١٤ دودةً كلَّ يومٍ. فكمْ دودةً يأكلُ في ٢٠ يومًا؟"}
          hint="أيُّ عمليَّةٍ تناسبُ «كلَّ يومٍ»؟"
          steps={[
            { text: 'نضربُ عددَ الدِّيدانِ في عددِ الأيَّامِ.' },
            { text: <Eq>١٤ × ٢٠ = ٢٨٠</Eq> },
            { text: '٢٨٠ دودةً', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'نقرأ المسألة معًا، ثم نحل كل سؤال.',
      content: (
        <BookGroup source={REAL} intro="طيورٌ: يتغذَّى طائرُ الطَّنَّانِ كلَّ ١٠ دقائقَ، ويطيرُ ٤٠ كيلومترًا في السَّاعةِ، ويخفقُ بجناحيْهِ منْ ٦٠ إلى ٨٠ مرَّةً كلَّ ثانيةٍ. استفِدْ منْ هذهِ المعلوماتِ في الإجابةِ عنِ الأسئلةِ التَّاليةِ:" qs={[
            { n: 24, question: "ما أكبرُ عددٍ منْ خفقاتِ الأجنحةِ للطَّائرِ في ١٥ ثانيةً؟", steps: [{ text: <Eq>٨٠ × ١٥ = ١٢٠٠</Eq> }, { text: '١٢٠٠ خفقةٍ', kind: 'ans' }] },
            { n: 25, question: "كمْ دقيقةً تكونُ قدِ انقضتْ إذا أكلَ الطَّائرُ ٤٥ مرَّةً؟", steps: [{ text: <Eq>٤٥ × ١٠ = ٤٥٠</Eq> }, { text: '٤٥٠ دقيقةً', kind: 'ans' }] },
            { n: 26, question: "إذا طارَ الطَّائرُ مدَّةَ ٢٠ ساعةً، فكمْ كيلومترًا يكونُ قدْ قطعَ؟", steps: [{ text: <Eq>٤٠ × ٢٠ = ٨٠٠</Eq> }, { text: '٨٠٠ كيلومترٍ', kind: 'ans' }] },
        ]} />
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={27} chart={null} time={120}
          question={<><BookLabel>مسألةٌ مفتوحةٌ:</BookLabel> اكتُبْ مسألةً عدديَّةً فيها عددانِ كلٌّ منهُما مكوَّنٌ منْ رقمينِ، وناتجُ ضربِ العددينِ يحتوي على ٣ أصفارٍ.</>}
          hint="جرِّبْ عددًا منْ مضاعفاتِ العشرةِ في ٢٥."
          steps={[
            { text: 'نجرِّبُ ٢٥ و٤٠.' },
            { text: <Eq>٢٥ × ٤٠ = ١٠٠٠</Eq>, kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={28} chart={<Stack><Eq>١٥ × ٣٠</Eq><Eq>٢٨ × ٢٠</Eq><Eq>٤١ × ٢١</Eq><Eq>٦٧ × ٤٠</Eq></Stack>} time={120}
          question={<><BookLabel>اكتشفِ المختلفَ:</BookLabel> عيِّنْ مسألةَ الضَّربِ الَّتي تختلفُ عنِ المسائلِ الثَّلاثِ الأُخرى:</>}
          hint="في أيِّ مسألةٍ لا نضربُ في مضاعفٍ للعشرةِ؟"
          steps={[
            { text: '٣٠ و٢٠ و٤٠ منْ مضاعفاتِ العشرةِ.' },
            { text: <Eq>٤١ × ٢١</Eq>, kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={HOT} n={29} tags={[{ kind: 'warn', text: 'اُكْتُبْ' }]} chart={null}
          question="كمْ صفرًا في ناتجِ الضَّربِ ٥٠ × ٦٠؟ اشرَحْ ذلكَ."
          hint="كمْ يساوي ٥ × ٦؟"
          steps={[
            { text: <Eq>٥ × ٦ = ٣٠</Eq> },
            { text: 'نضيفُ صفرَيِ العددينِ: ٣٠٠٠' },
            { text: '٣ أصفارٍ', kind: 'ans', label: 'عددُ الأصفارِ' },
          ]}
        />
      ),
    },
    mindSlide(<>الضَّربُ في<br />مضاعفاتِ العشرةِ</>, [{"cap": "الآحادُ", "text": "منزلةُ الآحادِ في الناتجِ صفرٌ"}, {"cap": "العشراتُ", "text": "٢ عشراتٍ × ٢٥ = ٥٠ عشرةً"}, {"cap": "مثالٌ", "text": "٢٥ × ٢٠ = ٥٠٠"}, {"cap": "تحقَّقْ", "text": "٢٠ = ٢ × ١٠"}]),
    exitSlide('أضرب في العشرات', [["٢٣ × ١٠ = ؟", ["٢٣٠", "٢٣", "٢٣٠٠"], "٢٣٠"], ["٤٤ × ٢٠ = ؟", ["٨٨٠", "٨٨", "٦٤"], "٨٨٠"], ["١٣٠ × ٣٠ = ؟", ["٣٩٠٠", "٣٩٠", "١٦٠"], "٣٩٠٠"]]),
    endSlide,
  ],
});
