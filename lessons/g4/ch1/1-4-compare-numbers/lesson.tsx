import {
  BookLabel, BookSource, Cols, CompareCard, Eq, FnTable, FormQ, Grid, LineBox, Lines, MCQ, Mark, NumberLine, QCard, QCol, QText, QuestionGroup, QuestionSlide, Sentence, SlideHead, Solution, Stack, Step, ValueQ, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'تأكَّدْ، ص ٢٥';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ٢٦';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ٢٦';
const TEST = 'تدريبٌ على اختبارٍ، ص ٢٧';
const REVIEW = 'مراجعةٌ تراكميةٌ، ص ٢٧';
const REAL = 'مسألةٌ منْ واقعِ الحياةِ، ص ٢٦';
const LANG = <FnTable heads={['اللغةُ', 'عددُ الصفحاتِ']} rows={[['الصينيَّةُ', '١٠٥٧٣٦٢٣٦'], ['الإنجليزيَّةُ', '٢٨٦٦٤٢٧٥٧'], ['اليابانيَّةُ', '٦٦٧٦٣٨٣٨'], ['الإسبانيَّةُ', '٥٥٨٨٧٠٦٣']]} />;
const CITY = <FnTable title="عددُ سكانِ بعضِ مدنِ المملكةِ" heads={['المدينةُ', 'عددُ السكانِ']} rows={[['الرياضُ', '٥٢٥٤٥٦٠'], ['بريدةُ', '٦١٤٠٩٣'], ['جدةُ', '٣٤٥٦٢٥٩'], ['مكةُ المكرمةُ', '١٦٧٥٣٦٨'], ['الدمامُ', '٩٠٣٥٩٧'], ['المدينةُ المنورةُ', '١١٨٠٧٧٠']]} />;

export default defineLesson({
  meta: {
    id: 'g4-1-4-compare-numbers',
    design: 'v2',
    code: '١-٤',
    title: 'المقارنةُ بينَ الأعدادِ',
    shortTitle: 'المقارنة بين الأعداد',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الأول: القيمة المنزلية',
    source: 'الجزء الأول، ص ٢٤–٢٧',
    minutes: 45,
    idea: 'أقارنُ بينَ أعدادٍ ضِمنَ الملايينِ.',
    bookQuestions: 30,
  },
  sectionDesc: {"engage": "تذكّر", "explain": "أمثلة الكتاب", "elab": "نعمل معًا", "check": "الأسئلة ١–٥", "practice": "الأسئلة ٦–١٦", "hot": "الأسئلة ١٧–٣٠", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أقارنُ بينَ أعدادٍ ضِمنَ الملايينِ.', ["أستعملُ خطَّ الأعدادِ.", "أُقارنُ بالقيمةِ المنزليَّةِ.", "أكتبُ الرمزَ المناسبَ."], <Mark>خطُّ الأعدادِ، أكبرُ منْ، أصغرُ منْ، يُساوي</Mark>),
    askSlide('engage', 'تذكّر', [["أيُّها أكبرُ؟", ["٣٠٠", "٢٩٩", "١٠٠"], "٣٠٠"], ["٤٥ ◯ ٥٤", ["<", ">", "="], "<"], ["٩٠ ◯ ٩٠", ["=", ">", "<"], "="]], 'مراجعة الرموز.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: الأعداد على خط الأعداد تكبر كلما اتجهنا يمينًا.',
      content: (
        <>
          <SlideHead tag="استعدَّ، ص ٢٤" kind="rule">المزارع السمكية</SlideHead>
          <QText>قدَّرتْ إدارتا المصائدِ البحريةِ والمزارعِ السمكيةِ كمياتِ إنتاجِ المزارعِ السمكيةِ في المياهِ العذبةِ عامَ ١٤٢٧هـ بـ ٣٤٥٦ طنًّا، بينما بلغتْ في عامِ ١٤٣٠هـ ٣٧٥٩ طنًّا. في أيِّ العامينِ كانَ الإنتاجُ أكبرَ؟</QText>
          <LineBox small><NumberLine min={3000} max={3800} step={200} /></LineBox>
          <Solution>
            <Step>الأعدادُ على الجهةِ اليمنى أكبرُ.</Step>
            <Step><Eq>٣٧٥٩ {'>'} ٣٤٥٦</Eq></Step>
            <Step kind="ans" label="الإنتاجُ الأكبرُ">عامَ ١٤٣٠هـ</Step>
          </Solution>
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'نبدأ من المنزلة الكبرى.',
      content: (
        <>
          <SlideHead tag="مثالٌ منْ واقعِ الحياةِ، ص ٢٥" kind="rule">الحجاج</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>حجٌّ:</BookLabel> يُظهرُ الجدولُ المجاورُ أعدادَ الحُجَّاجِ منْ خارجِ المملكةِ في العامينِ ١٤٣٧هـ و١٤٣٨هـ: في أيِّ العامينِ كانَ عددُ الحُجَّاجِ أكبرَ؟</QText>
              <Solution>
                <Step><BookLabel>الخطوةُ ١:</BookLabel> نكتبُ العددينِ رأسيًّا.</Step>
                <Step><BookLabel>الخطوةُ ٢:</BookLabel> ١ = ١، فننتقلُ إلى المنزلةِ التاليةِ.</Step>
                <Step><BookLabel>الخطوةُ ٣:</BookLabel> <Eq>٧ {'>'} ٣</Eq></Step>
                <Step kind="ans" label="العددُ الأكبرُ">عامَ ١٤٣٨هـ</Step>
              </Solution>
            </QCol>
            <FnTable heads={['العامُ', 'عددُ الحُجَّاجِ']} rows={[['١٤٣٧هـ', '١٣٢٥٣٧٢'], ['١٤٣٨هـ', '١٧٥٢٠١٤']]} />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٣٤٢٥١٨ و٣٤٧١٠٢ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أي رمز؟', [["٤٥٠٢٦ ◯ ٤٥٠٦٢", ["<", ">", "="], "<"], ["٩٩٩٩ ◯ ١٠٠٠٠", ["<", ">", "="], "<"], ["٧٢٠٠٠٠ ◯ ٧٠٢٠٠٠", [">", "<", "="], ">"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={'قارنْ بينَ العددينِ في كلٍّ ممَّا يأتي مستعملًا ( > ، < ، = ):'} cols={2} time={60}>
          <CompareCard n={1} a={1798} b={1789} />
          <CompareCard n={2} a={50402} b={50406} />
          <CompareCard n={3} a={10027301} b={10207301} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} chart={null} time={120}
          question={"اشترتْ سارةُ خاتمًا بـ ١٨٣٤ ريالًا، واشترتْ نورةُ خاتمًا آخرَ بـ ١٢٨٦ ريالًا. أيُّ الخاتمينِ أكثرُ سعرًا؟"}
          hint="قارنْ رقمَيْ منزلةِ المئاتِ."
          steps={[
            { text: 'الألوفُ متساويةٌ.' },
            { text: '٨ أكبرُ منْ ٢' },
            { text: 'خاتمُ سارةَ', kind: 'ans' },
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
          question="فسِّرْ لماذا يكونُ العددُ المكوَّنُ منْ خمسةِ أرقامٍ أصغرَ منَ العددِ المكوَّنِ منْ ستةِ أرقامٍ دائمًا؟"
          hint="ما أكبرُ عددٍ منْ خمسةِ أرقامٍ؟"
          steps={[
            { text: 'أكبرُ عددٍ منْ خمسةِ أرقامٍ ٩٩٩٩٩' },
            { text: 'أصغرُ عددٍ منْ ستةِ أرقامٍ ١٠٠٠٠٠' },
            { text: '١٠٠٠٠٠ أكبرُ منْ ٩٩٩٩٩', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={'قارنْ بينَ العددينِ في كلٍّ ممَّا يأتي مستعملًا ( > ، < ، = ):'} cols={3} time={120}>
          <CompareCard n={6} a={3030} b={3030} />
          <CompareCard n={7} a={5980} b={5090} />
          <CompareCard n={8} a={304999} b={305049} />
          <CompareCard n={9} a={76101} b={77000} />
          <CompareCard n={10} a={12683} b={12638} />
          <CompareCard n={11} a={2999214} b={2999214} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={12} chart={null} time={60}
          question={"اكتُبْ رقمًا مناسبًا في ■، لتصبحَ الجملةُ التاليةُ صحيحةً: ٦٥٨٤٣١ < ■٠٠٠٠٠"}
          hint="ما أوَّلُ رقمٍ في ٦٥٨٤٣١؟"
          steps={[
            { text: '■ أكبرُ منْ ٦' },
            { text: '٧', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={13} chart={null} time={60}
          question={"اكتُبْ رقمًا مناسبًا في ■، لتصبحَ الجملةُ التاليةُ صحيحةً: ١٣٤٢٦٤٦ > ١■٨٩٠٣٥"}
          hint="قارنْ منزلةَ مئاتِ الألوفِ."
          steps={[
            { text: '■ أصغرُ منْ ٣' },
            { text: '٢', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={14} chart={null} time={60}
          question={"استقبلَ عليٌّ ١١٢٧ رسالةً على بريدِهِ الإلكترونيِّ خلالَ عامٍ، بينَما استقبلَ فهدٌ ١١٣٢ رسالةً خلالَ العامِ نفسِهِ، فأيُّهما قدِ استقبلَ رسائلَ أكثرَ؟"}
          hint="قارنْ منزلةَ العشراتِ."
          steps={[
            { text: 'الألوفُ والمئاتُ متساويةٌ.' },
            { text: '٣ أكبرُ منْ ٢' },
            { text: 'فهدٌ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={REAL} n={15} chart={LANG} time={60} intro="تقنيةٌ: يوضِّحُ الجدولُ المجاورُ أكثرَ ٤ لغاتٍ كُتبتْ بها صفحاتٌ على الشبكةِ العنكبوتيَّةِ (الإنترنت)."
          question={"ما اللغةُ الَّتي كُتبتْ بها صفحاتٌ أكثرُ؟"}
          hint="أيُّ الأعدادِ رقمُهُ الأوَّلُ أكبرُ؟"
          steps={[
            { text: 'الإنجليزيَّةُ ٢٨٦٦٤٢٧٥٧' },
            { text: 'الإنجليزيَّةُ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={REAL} n={16} chart={LANG} time={60}
          question={"أيُّ اللغتينِ كُتبتْ بها صفحاتٌ أقلُّ: الإسبانيَّةُ أمِ اليابانيَّةُ؟"}
          hint="قارنِ الرقمَ الأوَّلَ."
          steps={[
            { text: '٥٥٨٨٧٠٦٣ أصغرُ منْ ٦٦٧٦٣٨٣٨' },
            { text: 'الإسبانيَّةُ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={17} chart={null} time={120}
          question={<><BookLabel>مسألةٌ مفتوحةٌ:</BookLabel> اكتُبْ عددًا منْ سبعةِ أرقامٍ أكبرَ منَ العددِ ٨٤٥٨٩٤٢.</>}
          hint="ماذا لوْ كانَ الرقمُ الأوَّلُ ٩؟"
          steps={[
            { text: '٩٠٠٠٠٠٠', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={18} chart={<Stack><Eq>١٠٠٠٠</Eq><Eq>١٠ مئاتٍ</Eq><Eq>عشرةُ آلافٍ</Eq><Eq>١٠٠ مئةٍ</Eq></Stack>} time={120}
          question={<><BookLabel>اكتشفِ المختلفَ:</BookLabel> حدِّدِ العددَ المختلفَ فيما يلي، ثمَّ وضِّحْ إجابتَكَ:</>}
          hint="احسُبْ قيمةَ كلِّ بطاقةٍ."
          steps={[
            { text: '١٠٠٠٠ = عشرةُ آلافٍ = ١٠٠ مئةٍ' },
            { text: '١٠ مئاتٍ تساوي ١٠٠٠' },
            { text: '١٠ مئاتٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={HOT} n={19} tags={[{ kind: 'warn', text: 'اُكْتُبْ' }]} chart={null}
          question="كيفَ تقارنُ بينَ الأعدادِ باستعمالِ القيمةِ المنزليَّةِ؟"
          hint="منْ أيِّ منزلةٍ نبدأُ؟"
          steps={[
            { text: 'أحاذي منازلَ العددينِ.' },
            { text: 'أبدأُ منَ المنزلةِ الكبرى.' },
            { text: 'عندَ أوَّلِ اختلافٍ، صاحبُ الرقمِ الأكبرِ هوَ العددُ الأكبرُ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'تدريب على اختبار.',
      content: (
        <>
          <BookSource>{TEST}</BookSource>
          <Grid cols={2}>
            <QCard n={20}><MCQ q="اكتُبِ العددَ: تسعةَ ملايينَ ومئتينِ وسبعةً وأربعينَ ألفًا وثماني مئةٍ وستةَ عشرَ بالصيغةِ القياسيَّةِ: (الدرس ١-٢)" options={["أ) ٩٢٧٤٨١٦", "ب) ٩٢٤٧٨١٦", "جـ) ٩٢٢٤٧٨١٦", "د) ٩٠٠٢٤٧٨١٦"]} answer="ب) ٩٢٤٧٨١٦" /></QCard>
            <QCard n={21}><MCQ q="ما الرقمُ الَّذي يجعلُ الجملةَ العدديَّةَ صحيحةً؟ ٨٢■٥٩ < ٨٢٣٥٩ (الدرس ١-٤)" options={["أ) ٢", "ب) ٣", "جـ) ٤", "د) ٥"]} answer="أ) ٢" /></QCard>
          </Grid>
        </>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ١-١.',
      content: (
        <QuestionGroup source={REVIEW} instruction={'اكتُبِ القيمةَ المنزليَّةَ للرقمِ الَّذي تحتَهُ خطٌّ فيما يلي:'} cols={3} time={60}>
          <ValueQ n={22} v={64542} at={1} />
          <ValueQ n={23} v={201056} at={4} />
          <ValueQ n={24} v={100914} at={0} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ١-٢.',
      content: (
        <QuestionGroup source={REVIEW} instruction={'اكتُبْ كلًّا منَ الأعدادِ التاليةِ بالصيغتينِ القياسيَّةِ والتحليليَّةِ:'} cols={1} time={60}>
          <FormQ n={25} show={'ستينَ ألفًا وثلاثَ مئةٍ وسبعينَ'} rows={[['الصيغةُ القياسيَّةُ', '٦٠٣٧٠'], ['الصيغةُ التحليليَّةُ', <Eq>٧٠ + ٣٠٠ + ٦٠٠٠٠</Eq>]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ١-٢.',
      content: (
        <QuestionGroup source={REVIEW} instruction={'اكتُبْ كلًّا منَ الأعدادِ التاليةِ بالصيغتينِ القياسيَّةِ والتحليليَّةِ:'} cols={1} time={60}>
          <FormQ n={26} show={'ثلاثَ مئةٍ وستةَ عشرَ مليونًا وخمسَ مئةٍ وأربعةً وعشرينَ ألفًا وواحدًا'} rows={[['الصيغةُ القياسيَّةُ', '٣١٦٥٢٤٠٠١'], ['الصيغةُ التحليليَّةُ', <Eq>١ + ٤٠٠٠ + ٢٠٠٠٠ + ٥٠٠٠٠٠ + ٦٠٠٠٠٠٠ + ١٠٠٠٠٠٠٠ + ٣٠٠٠٠٠٠٠٠</Eq>]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ١-٤.',
      content: (
        <QuestionGroup source={REVIEW} instruction={'قارنْ بينَ العددينِ في كلٍّ ممَّا يأتي مستعملًا ( > ، < ، = ):'} cols={2} time={60}>
          <CompareCard n={27} a={8402} b={8099} />
          <QCard n={28}><Stack><Lines><Sentence t={[589, { b: '<', box: true }, 709]} /></Lines><small>٩ + ٨٠ + ٥٠٠ ◯ ٧٠٠ + ٩</small></Stack></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={REVIEW} n={29} chart={CITY} time={60} intro="يوضِّحُ الجدولُ المجاورُ أعدادَ سكانِ بعضِ مدنِ المملكةِ العربيةِ السعوديةِ في أحدِ الأعوامِ. استعملِ الجدولَ في الإجابةِ عنِ السؤالينِ ٢٩، ٣٠:"
          question={"ما المدينةُ الَّتي تضمُّ أكبرَ عددٍ منَ السكانِ؟"}
          hint="أيُّ الأعدادِ أكبرُ؟"
          steps={[
            { text: 'الرياضُ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={REVIEW} n={30} chart={CITY} time={60}
          question={"أيُّ المدنِ أقلُّ سكانًا؛ الدمامُ أمِ المدينةُ المنورةُ؟"}
          hint="قارنْ عددَ أرقامِ العددينِ."
          steps={[
            { text: '٩٠٣٥٩٧ منْ ستةِ أرقامٍ.' },
            { text: 'الدمامُ', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>المقارنةُ بينَ<br />الأعدادِ</>, [{"cap": "خطُّ الأعدادِ", "text": "الأكبرُ على اليمينِ"}, {"cap": "القيمةُ المنزليَّةُ", "text": "أبدأُ منَ المنزلةِ الكبرى"}, {"cap": "الأرقامُ", "text": "الأكثرُ أرقامًا هوَ الأكبرُ"}, {"cap": "الرموزُ", "text": ">، <، ="}]),
    exitSlide('أقارن', [["٤٢٣٠ ◯ ٤٣٢٠", ["<", ">", "="], "<"], ["٦٠٠٠٠٠ ◯ ٩٩٩٩٩", [">", "<", "="], ">"], ["١٥٢٠٤٠٠ ◯ ١٥٢٠٤٠٠", ["=", ">", "<"], "="]]),
    endSlide,
  ],
});
