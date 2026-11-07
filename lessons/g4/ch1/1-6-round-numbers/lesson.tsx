import {
  BookLabel, BookSource, CompareCard, DataTable, Eq, FormQ, Grid, LineBox, MCQ, Mark, NearQ, NumberLine, OrderQ, QCard, QText, QuestionGroup, QuestionSlide, SlideHead, Solution, Step, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'تأكَّدْ، ص ٣٤';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ٣٥';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ٣٥';
const TEST = 'تدريبٌ على اختبارٍ، ص ٣٦';
const REVIEW = 'مراجعةٌ تراكميةٌ، ص ٣٦';

export default defineLesson({
  meta: {
    id: 'g4-1-6-round-numbers',
    design: 'v2',
    code: '١-٦',
    title: 'تقريبُ الأعدادِ',
    shortTitle: 'تقريب الأعداد',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الأول: القيمة المنزلية',
    source: 'الجزء الأول، ص ٣٣–٣٦',
    minutes: 45,
    idea: 'أُقرِّبُ أعدادًا ضِمنَ الملايينِ.',
    bookQuestions: 30,
  },
  sectionDesc: {"engage": "تذكّر", "explain": "أمثلة الكتاب", "elab": "نعمل معًا", "check": "الأسئلة ١–٧", "practice": "الأسئلة ٨–١٥", "hot": "الأسئلة ١٦–٣٠", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أُقرِّبُ أعدادًا ضِمنَ الملايينِ.', ["أضعُ خطًّا تحتَ منزلةِ التقريبِ.", "أنظرُ إلى الرقمِ عنْ يمينِها.", "أضعُ الأصفارَ."], <Mark>التقديرُ، التقريبُ</Mark>),
    askSlide('engage', 'تذكّر', [["٢٧ أقربُ إلى:", ["٣٠", "٢٠", "٤٠"], "٣٠"], ["٢٤ أقربُ إلى:", ["٢٠", "٣٠", "٢٥"], "٢٠"], ["٣٥ أقربُ إلى:", ["٤٠", "٣٠", "٥٠"], "٤٠"]], 'مراجعة التقريب إلى أقرب عشرة.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: نقرأ موضع العدد على الخط.',
      content: (
        <>
          <SlideHead tag="استعدَّ، ص ٣٣" kind="rule">وزن الشاحنة</SlideHead>
          <QText>تزنُ شاحنةٌ وهيَ محملةٌ ٣٦٥٥٤ كجم، فما وزنُها التقريبيُّ؟ قرِّبْ وزنَ الشاحنةِ إلى أقربِ ألفٍ.</QText>
          <LineBox small><NumberLine min={36000} max={37000} step={200} /></LineBox>
          <Solution>
            <Step>٣٦٥٥٤ أقربُ إلى ٣٧٠٠٠ منْهُ إلى ٣٦٠٠٠</Step>
            <Step kind="ans" label="الوزنُ التقريبيُّ">٣٧٠٠٠ كجم</Step>
          </Solution>
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'مثال الكتاب: قطر زحل ١٢٠٥٣٦ كلم.',
      content: (
        <>
          <SlideHead tag="مفهومٌ أساسيٌّ، ص ٣٣" kind="rule">تقريب الأعداد</SlideHead>
          <Solution>
            <Step><BookLabel>الخطوةُ ١:</BookLabel> ضعْ خطًّا تحتَ الرقمِ في المنزلةِ الَّتي سيتمُّ التقريبُ إليها.</Step>
            <Step><BookLabel>الخطوةُ ٢:</BookLabel> انظرْ إلى الرقمِ الَّذي عنْ يمينِ المنزلةِ.</Step>
            <Step><BookLabel>الخطوةُ ٣:</BookLabel> إذا كانَ أقلَّ منْ ٥ فلا تُغيِّرْ شيئًا، وإلَّا فأضفْ ١</Step>
            <Step><BookLabel>الخطوةُ ٤:</BookLabel> ضعْ صفرًا مكانَ كلِّ رقمٍ عنْ يمينِ الرقمِ الَّذي تحتَهُ خطٌّ.</Step>
            <Step kind="ans" label="١٢٠٥٣٦ إلى أقربِ ألفٍ">١٢١٠٠٠</Step>
          </Solution>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٤٦٢٨١٧ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أقرّب', [["٧٤٣ إلى أقربِ مئةٍ:", ["٧٠٠", "٨٠٠", "٧٤٠"], "٧٠٠"], ["٥٦٩٠ إلى أقربِ ألفٍ:", ["٦٠٠٠", "٥٠٠٠", "٥٧٠٠"], "٦٠٠٠"], ["٣٤٥ إلى أقربِ عشرةٍ:", ["٣٥٠", "٣٤٠", "٣٠٠"], "٣٥٠"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={'قرِّبْ كلَّ عددٍ إلى أقربِ قيمةٍ منزليَّةٍ مُعطاةٍ:'} cols={3} time={150}>
          <NearQ n={1} v={927} step={10} name="عشرةٍ" />
          <NearQ n={2} v={934} step={100} name="مئةٍ" />
          <NearQ n={3} v={4282} step={1000} name="ألفٍ" />
          <NearQ n={4} v={43032} step={10000} name="عشرةِ آلافٍ" />
          <NearQ n={5} v={593205} step={100000} name="مئةِ ألفٍ" />
          <NearQ n={6} v={1709385} step={1000000} name="مليونٍ" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]} chart={null}
          question="ما أصغرُ عددٍ إذا قرَّبناهُ إلى أقربِ ألفٍ نحصلُ على ٨٠٠٠؟ فسِّرْ إجابتَكَ."
          hint="ما العددُ الَّذي يقعُ في منتصفِ المسافةِ؟"
          steps={[
            { text: 'منتصفُ ٧٠٠٠ و٨٠٠٠ هوَ ٧٥٠٠' },
            { text: '٧٥٠٠؛ لأنَّ الرقمَ ٥ يُقرِّبُ إلى أعلى.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={'قرِّبْ كلَّ عددٍ إلى أقربِ قيمةٍ منزليَّةٍ مُعطاةٍ:'} cols={3} time={150}>
          <NearQ n={8} v={568} step={10} name="عشرةٍ" />
          <NearQ n={9} v={148245} step={100} name="مئةٍ" />
          <NearQ n={10} v={493580} step={1000} name="ألفٍ" />
          <NearQ n={11} v={791275} step={100000} name="مئةِ ألفٍ" />
          <NearQ n={12} v={95230} step={10000} name="عشرةِ آلافٍ" />
          <NearQ n={13} v={3190236} step={1000000} name="مليونٍ" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={14} chart={null} time={120} long
          question={<><BookLabel>القياسُ:</BookLabel> تقعُ محميةُ الإمامِ سعودِ بنِ عبدالعزيزِ الملكيةِ بمنطقةِ مكةَ المكرمةِ قربَ الطائفِ وتتميزُ بأنَّها مُسيَّجةٌ، وتعملُ كمُختبرٍ طبيعيٍّ لإعادةِ توطينِ أنواعِ الكائناتِ المهدَّدةِ بالانقراضِ، وتبلغُ مساحتُها ٢٢٤٠ كلم². فهلْ يعدُّ ٢٢٠٠ كلم² تقريبًا مناسبًا لهذهِ المساحةِ؟ فسِّرْ إجابتَكَ.</>}
          hint="إلى أقربِ أيِّ منزلةٍ قُرِّبَ؟"
          steps={[
            { text: '٤ أقلُّ منْ ٥' },
            { text: '٢٢٤٠ إلى أقربِ مئةٍ يساوي ٢٢٠٠' },
            { text: 'نعمْ', kind: 'ans' },
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
          question={"قُرِّبَ العددُ ١٤١٥٦٠٧٤ إلى العددِ ١٤١٥٦١٠٠، ما القيمةُ المنزليَّةُ الَّتي قُرِّبَ إليها؟"}
          hint="أينَ تبدأُ الأصفارُ؟"
          steps={[
            { text: 'الأصفارُ في الآحادِ والعشراتِ.' },
            { text: 'منزلةُ المئاتِ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={16} chart={null} time={120}
          question={<><BookLabel>مسألةٌ مفتوحةٌ:</BookLabel> اكتُبْ خمسةَ أعدادٍ تُساوي المليونَ تقريبًا.</>}
          hint="ما الأعدادُ القريبةُ منَ المليونِ؟"
          steps={[
            { text: '٩٩٩٥٠٠، ٩٩٩٨٠٠، ١٠٠٠٢٠٠، ١٠٠٠٤٠٠، ١٠٠٢٠٠٠', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={17} chart={<DataTable rows={[['سعودٌ', '٨٣٣٠٠٠٠٠'], ['فيصلٌ', '٨٠٠٠٠٠٠٠']]} />} time={120}
          question={<><BookLabel>اكتشفِ الخطأَ:</BookLabel> قامَ سعودٌ وفيصلٌ بتقريبِ العددِ ٨٣٢٧٥٩٢٥ إلى أقربِ مئةِ ألفٍ كمَا هوَ مبيَّنٌ أدناهُ. فأيُّهما كانَ تقريبُهُ صحيحًا؟ فسِّرْ إجابتَكَ.</>}
          hint="ما الرقمُ في منزلةِ عشراتِ الألوفِ؟"
          steps={[
            { text: '٧ أكبرُ منْ ٥، فنضيفُ ١ إلى ٢' },
            { text: 'سعودٌ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={HOT} n={18} tags={[{ kind: 'warn', text: 'اُكْتُبْ' }]} chart={null}
          question="مسألةٌ منْ واقعِ الحياةِ حولَ عددٍ قُرِّبَ إلى ٦٧٠٠٠٠."
          hint="أيُّ عددٍ يقربُ إلى ٦٧٠٠٠٠؟"
          steps={[
            { text: 'عددُ سكانِ مدينةٍ ٦٦٨٤٣٠ نسمةً.' },
            { text: 'بالتقريبِ إلى أقربِ عشرةِ آلافٍ يصبحُ ٦٧٠٠٠٠', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
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
          <Grid cols={1}>
            <QCard n={19}><MCQ q="أيٌّ ممَّا يلي يمثِّلُ ترتيبًا صحيحًا منَ الأصغرِ إلى الأكبرِ؟ (الدرس ١-٥)" options={["أ) ١٣٥٧، ٣١٥٧، ٧٥٣١، ٥١٣٧", "ب) ١٣٧٥، ٣٥١٧، ٥٧٣١، ٧٥١٣", "جـ) ١٣٧٥، ٣٥١٧، ٧٥٣١، ٧٥١٣", "د) ٧٥١٣، ٥٧٣١، ٣٧٥١، ١٣٥٧"]} answer="ب) ١٣٧٥، ٣٥١٧، ٥٧٣١، ٧٥١٣" /></QCard>
          </Grid>
        </>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'تدريب على اختبار.',
      content: (
        <>
          <BookSource>{TEST}</BookSource>
          <Grid cols={1}>
            <QCard n={20}><MCQ q="العددُ ٥٨٦٤٩٣٦ مقرَّبًا إلى أقربِ عشرةِ آلافٍ هوَ: (الدرس ١-٦)" options={["أ) ٥٨٧٠٠٠٠", "ب) ١٠٠٠٠٠٠", "جـ) ٥٨٦٠٠٠٠", "د) ٥٨٦٥٠٠٠"]} answer="جـ) ٥٨٦٠٠٠٠" /></QCard>
          </Grid>
        </>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرسين ١-١ و١-٢.',
      content: (
        <QuestionGroup source={REVIEW} instruction={'اكتُبِ الصِّيغتينِ القياسيَّةَ واللَّفظيَّةَ للعددِ:'} cols={1} time={60}>
          <FormQ n={21} show={<Eq>٥٠٠ + ٦٠٠٠٠ + ٣٠٠٠٠٠٠</Eq>} rows={[['الصيغةُ القياسيَّةُ', '٣٠٦٠٥٠٠'], ['الصيغةُ اللفظيَّةُ', 'ثلاثةُ ملايينَ وستونَ ألفًا وخمسُ مئةٍ']]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'مراجعة الدرس ١-٥.',
      content: (
        <QuestionGroup source={REVIEW} instruction={'رتِّبِ الأعدادَ التاليةَ منَ الأصغرِ إلى الأكبرِ:'} cols={2} time={90}>
          <OrderQ n={22} nums={[456, 801, 399]} asc />
          <OrderQ n={23} nums={[2634, 2800, 2599]} asc />
          <OrderQ n={24} nums={[18090, 18009, 18900]} asc />
          <OrderQ n={25} nums={[39271, 29371, 73921]} asc />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ١-٤.',
      content: (
        <QuestionGroup source={REVIEW} instruction={'قارنْ بينَ العددينِ في كلٍّ ممَّا يأتي مستعملًا ( > ، < ، = ):'} cols={2} time={60}>
          <CompareCard n={26} a={182} b={185} />
          <CompareCard n={27} a={24009} b={24090} />
          <CompareCard n={28} a={5677} b={5677} />
          <CompareCard n={29} a={34207} b={34270} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={REVIEW} n={30} chart={null} time={60}
          question={"أعلى قمَّةٍ في المملكةِ العربيةِ السعوديةِ هيَ قمَّةُ جبلِ السودةِ الواقعِ في الشمالِ الغربيِّ منْ مدينةِ أبها، حيثُ يبلغُ ارتفاعُها ٣٠١٥ مترًا عنْ مستوى سطحِ البحرِ. قرِّبْ هذا العددَ إلى أقربِ مئةٍ."}
          hint="ما الرقمُ عنْ يمينِ المئاتِ؟"
          steps={[
            { text: '١ أقلُّ منْ ٥' },
            { text: '٣٠٠٠ مترٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>تقريبُ<br />الأعدادِ</>, [{"cap": "أضعُ", "text": "خطًّا تحتَ منزلةِ التقريبِ"}, {"cap": "أنظرُ", "text": "إلى الرقمِ عنْ يمينِها"}, {"cap": "٥ فأكثرُ", "text": "أضيفُ ١"}, {"cap": "أقلُّ منْ ٥", "text": "لا أُغيِّرُ شيئًا"}]),
    exitSlide('أقرّب', [["٦٨٣ إلى أقربِ عشرةٍ:", ["٦٨٠", "٦٩٠", "٧٠٠"], "٦٨٠"], ["٤١٥٠ إلى أقربِ مئةٍ:", ["٤٢٠٠", "٤١٠٠", "٤٠٠٠"], "٤٢٠٠"], ["٢٧٦٠٠٠٠ إلى أقربِ مليونٍ:", ["٣٠٠٠٠٠٠", "٢٠٠٠٠٠٠", "٢٨٠٠٠٠٠"], "٣٠٠٠٠٠٠"]]),
    endSlide,
  ],
});
