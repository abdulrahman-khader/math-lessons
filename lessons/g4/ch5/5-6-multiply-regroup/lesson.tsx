import {
  AreaModel, BlockGroups, BookLabel, BulletCard, Card, Cols, Ctrls, Definition, Eq, ExitTicket, GoHomeButton, Goals, Grid, HBars, IfTeams, Lines, MCQ, MindMap, NextButton, QCard, QCol, QText,
  QuestionGroup, QuestionSlide, Sentence, SlideHead, Solution, Stack, Step, VMul, Winner, defineLesson, storySlide, SplitArray,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

const CHECK = 'تأكَّدْ، ص ١٥٨';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ١٥٩';
const REAL = 'مسألةٌ منْ واقعِ الحياةِ، ص ١٥٩';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٦٠';
const TEST = 'تدريبٌ على اختبارٍ، ص ١٦٠';
const REVIEW = 'مراجعةٌ تراكميةٌ، ص ١٦٠';
const FIND = 'أَوْجِدْ ناتجَ الضَّربِ، واستعملِ النَّماذجَ إذا لزِمَ الأمرُ:';
const AIRSHIP = 'مناطيدُ: صُنعَ أوَّلُ منطادٍ قبلَ أكثرَ منْ ٨٠ سنةً.';
const FACTS = (
  <BulletCard
    cap="حقائقُ عنِ المنطادِ"
    items={[
      'يطيرُ بسرعةٍ بينَ ٤٨ – ٦٤ كيلومترًا في السَّاعةِ، وقدْ تصلُ سرعتُهُ إلى ١٠٥ كيلومتراتٍ في السَّاعةِ.',
      'مُتوسِّطُ ارتفاعِ طيرانِهِ هوَ ٦٠٠ مترٍ.',
      'سَعةُ خزَّانِ الوقودِ ١٨٧٦ لترًا.',
    ]}
  />
);

/** بطاقة ضرب رأسي مع إعادة التجميع: كل ضغطة تملأ خانة */
const Mul = ({ n, a, b }: { n: number; a: number; b: number }) => (
  <QCard n={n}>
    <VMul a={a} b={b} regroup />
  </QCard>
);

const One = ({ n, a, b }: { n: number; a: number; b: number }) => (
  <QCard n={n}>
    <Lines><Sentence t={[a, '×', b, '=', { b: a * b, box: true }]} /></Lines>
  </QCard>
);

/** بطاقة تقدير: الضرب كما في الكتاب، ثم التقدير */
const Est = ({ n, a, b, e }: { n: number; a: number; b: number; e: string }) => (
  <QCard n={n}>
    <Stack>
      <Lines><Sentence t={[a, '×', b]} /></Lines>
      <Stack><Step kind="ans" label="التَّقْدِيرُ">{e}</Step></Stack>
    </Stack>
  </QCard>
);

export default defineLesson({
  meta: {
    id: 'g4-5-6-multiply-regroup',
    design: 'v2',
    code: '٥-٦',
    title: 'ضَربُ عددٍ مِن رقمينِ في عددٍ مِن رقمٍ واحدٍ معَ إعادةِ التَّجميعِ',
    shortTitle: 'الضرب مع إعادة التجميع',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الخامس: الضرب في عدد من رقم واحد',
    source: 'الجزء الأول، ص ١٥٧–١٦٠',
    minutes: 45,
    idea: 'أضربُ عددًا مِن رقمينِ في عددٍ مِن رقمٍ واحدٍ معَ إعادةِ التَّجميعِ.',
    bookQuestions: 32,
  },
  sectionDesc: {
    engage: 'تذكّر الضرب',
    explore: 'استعد: البناية',
    explain: 'المثالان ١ و٢',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٥',
    practice: 'الأسئلة ٦–١٨',
    hot: 'الأسئلة ١٩–٣٢',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Card kind="rule" cap="فكرة الدرس">أضربُ عددًا مِن رقمينِ في عددٍ مِن رقمٍ واحدٍ معَ إعادةِ التَّجميعِ.</Card>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals items={['أضرب الآحاد وأعيد التجميع.', 'أضرب العشرات ثم أجمع ما حملته.', 'أتأكد من معقولية الإجابة بالتقدير.']} />
            </Card>
          </Cols>
        </>
      ),
    },
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الدرس ٥-٥ ونشاط الاستكشاف.',
      content: (
        <>
          <SlideHead tag="تذكّر، الدرس ٥-٥" kind="ink">الضرب</SlideHead>
          <Grid cols={3}>
            <MCQ q="٣ × ٢١ = ؟" options={['٦٣', '٢٤', '٦١']} answer="٦٣" award />
            <MCQ q="٢٤ آحادًا = ؟" options={['٢ عشرات و٤ آحاد', '٤ عشرات و٢ آحاد', '٢٤ عشرة']} answer="٢ عشرات و٤ آحاد" award />
            <MCQ q="قدِّرْ ٤ × ٢٨" options={['٨٠', '١٢٠', '٣٢']} answer="١٢٠" award />
          </Grid>
        </>
      ),
    },
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند السؤال واسأل: أين نكتب الـ٣٢؟'),
    {
      sec: 'explore', min: 4,
      notes: 'مثال جديد غير القصة: ٣ صفوف في كل صف ٢٦. بعد «نجزّئ»: ٣ × ٢٠ = ٦٠ و٣ × ٦ = ١٨، ثم ٦٠ + ١٨ = ٧٨.',
      content: (
        <>
          <SlideHead tag="نُجَرِّبُ مِثَالًا آخَرَ" kind="ex">نُجَزِّئُ الْعَدَدَ</SlideHead>
          <SplitArray rows={3} n={26} />
        </>
      ),
    },
    {
      sec: 'explore', min: 2,
      notes: 'نسأل: كيف نجد الناتج؟ ونترك الحل للمثال ١.',
      content: (
        <>
          <SlideHead tag="اسْتَعِدَّ، ص ١٥٧" kind="qs">شققُ البنايةِ</SlideHead>
          <QText>بِنَايةٌ من خمسةِ طَوَابِقَ، في كلِّ طابقٍ ١٣ شقَّةً. كمْ شقَّةً في هذِهِ البِنايةِ؟</QText>
        </>
      ),
    },
    {
      sec: 'explain', min: 4,
      notes: 'الطريقة ١ بالنماذج، والطريقة ٢ بالورقة والقلم: كل ضغطة تملأ خانة.',
      content: (
        <>
          <SlideHead tag="مثال ١، من واقع الحياة، ص ١٥٧" kind="ex">الضربُ معَ إعادةِ التجميعِ</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>مَبانٍ:</BookLabel> كمْ شقَّةً في بنايةٍ مكوَّنةٍ مِن خمسةِ طَوَابِقَ، في كلِّ طابقٍ ١٣ شقَّةً؟</QText>
              <Ctrls><NextButton /></Ctrls>
              <VMul a={13} b={5} regroup />
              <Solution>
                <Step kind="ans" label="عَدَدُ الشُّقَقِ">٦٥ شَقَّةً</Step>
              </Solution>
            </QCol>
            <BlockGroups big groups={5} tens={1} ones={3} />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 4,
      notes: 'نقدّر أولًا: ٨ × ١٠ = ٨٠، ثم نضرب، ونتحقق بنموذج المستطيل.',
      content: (
        <>
          <SlideHead tag="مثال ٢، من واقع الحياة، ص ١٥٨" kind="ex">الضربُ معَ إعادةِ التجميعِ</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>زَواحفُ:</BookLabel> تضعُ أُنثَى السُّلحفاةِ الصَّحراويَّةِ ٨ بيضاتٍ في المرَّةِ الواحدةِ. كمْ بيضةً تضعُ ١٢ سُلحفاةً؟</QText>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>نقدِّرُ: <Eq>٨ × ١٠ = ٨٠</Eq></Step>
              </Solution>
              <VMul a={12} b={8} regroup />
            </QCol>
            <Stack>
              <AreaModel h={8} parts={[2, 10]} />
              <Solution>
                <Step hl={['n0', 'n1']}>نتحقَّقُ: <Eq>١٦ + ٨٠ = ٩٦</Eq></Step>
                <Step kind="ans" label="عَدَدُ الْبَيْضَاتِ">٩٦ بَيْضَةً</Step>
              </Solution>
            </Stack>
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 1,
      notes: 'خطأ شائع: ضرب العشرات المحمولة بدل جمعها.',
      content: (
        <>
          <SlideHead tag="تَذَكَّرْ، ص ١٥٨" kind="rule">العشراتُ بعدَ التجميعِ</SlideHead>
          <Definition kind="rule">لا تضربْ في العشراتِ الَّتي أعدتَ تجميعَهَا مرَّةً أخرى، بلِ اجمعْهَا معَ ناتجِ الضَّربِ.</Definition>
        </>
      ),
    },
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: ٤ × ٣٦ (مثال غير أمثلة الكتاب).',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },
    {
      sec: 'elab', min: 3,
      notes: 'نعمل معًا: الآحاد أولًا، ثم نجمع ما حملناه.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">اضربْ</SlideHead>
          <Grid cols={3}>
            <MCQ q="٣ × ١٧ = ؟" options={['٣١', '٥١', '٤١']} answer="٥١" award />
            <MCQ q="٤ × ٢٣ = ؟" options={['٩٢', '٨٢', '٢٧']} answer="٩٢" award />
            <MCQ q="٢ × ٣٨ = ؟" options={['٦٦', '٤٠', '٧٦']} answer="٧٦" award />
          </Grid>
        </>
      ),
    },
    {
      sec: 'check', min: 4,
      notes: 'كل ضغطة تملأ خانة: الآحاد، ثم الرقم المحمول، ثم العشرات.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={120}>
          <Mul n={1} a={13} b={4} />
          <Mul n={2} a={27} b={3} />
          <Mul n={3} a={13} b={8} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'يتكرر الجزء نفسه كل أسبوع.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} time={60}
          question="القِيَاسُ: تقومُ شركةٌ بصيانةِ جزءٍ طولِهِ ١٤ كلم مِن طريقٍ طويلةٍ خلالَ أُسبوعٍ. فكمْ كيلومترًا ستقومُ الشركةُ بصيانتِهِ في ٤ أسابيعَ، إذا استمرَّ العملُ بالنمطِ نفسِهِ؟"
          hint="كمْ أسبوعًا؟ وكمْ كيلومترًا في كلِّ أسبوعٍ؟"
          steps={[
            { text: <Eq>٤ × ١٤ = ٥٦</Eq> },
            { label: 'طُولُ الطَّرِيقِ', text: '٥٦ كِيلُومِتْرًا', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'تحدث: يشرح الطالب على السبورة.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]}
          question="اِشْرَحْ كيفَ تجدُ ناتجَ ٦ × ٣٧"
          hint="بماذا نبدأُ؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'نَضْرِبُ الْآحَادَ وَنَحْمِلُ ٤ عَشَرَاتٍ، ثُمَّ نَضْرِبُ الْعَشَرَاتِ وَنَجْمَعُ ٤، فَالنَّاتِجُ ٢٢٢', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'الآحاد ثم الرقم المحمول ثم العشرات.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={180}>
          <Mul n={6} a={46} b={2} />
          <Mul n={7} a={15} b={4} />
          <Mul n={8} a={53} b={2} />
          <Mul n={9} a={92} b={3} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'السؤالان ٨ و٩ بلا إعادة تجميع في الآحاد؛ ناتجهما من ثلاثة أرقام.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={180}>
          <Mul n={10} a={18} b={8} />
          <Mul n={11} a={14} b={9} />
          <Mul n={12} a={28} b={4} />
          <Mul n={13} a={31} b={8} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نضرب طول الحشرة في عددها.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={14} time={45}
          question="القِيَاسُ: يصلُ طولُ أحدِ أنواعِ الحشراتِ العصويَّةِ إلى ٤٥ سم. ما طُولُ ٣ حشراتٍ من هذَا النَّوعِ؟"
          hint="ما العمليةُ؟"
          steps={[
            { text: <Eq>٣ × ٤٥ = ١٣٥</Eq> },
            { label: 'الطُّولُ', text: '١٣٥ سَنْتِمِتْرًا', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: '٦ فطائر في كل منها ٢٥ قطعة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={15} time={45}
          question="يضعُ صانعُ الفطائرِ ٢٥ قطعةَ زيتونٍ في الفطيرةِ الواحدةِ. ما عددُ قِطعِ الزَّيتونِ الَّتي يضعُهَا في ٦ فطائرَ؟"
          hint="كمْ فطيرةً؟"
          steps={[
            { text: <Eq>٦ × ٢٥ = ١٥٠</Eq> },
            { label: 'عَدَدُ الْقِطَعِ', text: '١٥٠ قِطْعَةً', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: '١٨٧٦ أقرب إلى ١٩٠٠ منها إلى ١٨٠٠.',
      content: (
        <QuestionSlide
          source={REAL} n={16} time={45} intro={AIRSHIP}
          question="ما سعةُ خزَّانِ وقودِ المنطادِ مقرَّبًا إلَى أقربِ مئةٍ؟"
          hint="ما رقمُ العشراتِ؟"
          steps={[
            { text: 'سَعَةُ الْخَزَّانِ ١٨٧٦ لِتْرًا' },
            { text: 'رَقْمُ الْعَشَرَاتِ ٧ أَكْبَرُ مِنْ ٥' },
            { label: 'السَّعَةُ', text: '١٩٠٠ لِتْرٍ', kind: 'ans' },
          ]}
          chart={FACTS}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: '٣ ساعات، في كل ساعة ٥٩ كلم.',
      content: (
        <QuestionSlide
          source={REAL} n={17} time={60}
          question="ما المسافةُ الَّتي يقطعُهَا المنطادُ في ٣ ساعاتٍ، إذا طارَ بسرعةِ ٥٩ كلم/ ساعةٍ؟"
          hint="كمْ كيلومترًا في كلِّ ساعةٍ؟"
          steps={[
            { text: <Eq>٣ × ٥٩ = ١٧٧</Eq> },
            { label: 'الْمَسَافَةُ', text: '١٧٧ كِيلُومِتْرًا', kind: 'ans' },
          ]}
          chart={FACTS}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'متوسط الارتفاع ٦٠٠ متر من الحقائق.',
      content: (
        <QuestionSlide
          source={REAL} n={18} time={60}
          question="ما أعلى ارتفاعٍ يصلُ إليهِ المنطادُ إذا كانَ ذلكَ الارتفاعُ يُساوي ٥ أمثالِ متوسِّطِ ارتفاعِ طيرانِهِ؟"
          hint="ما متوسِّطُ الارتفاعِ؟"
          steps={[
            { text: <Eq>٥ × ٦٠٠ = ٣٠٠٠</Eq> },
            { label: 'الِارْتِفَاعُ', text: '٣٠٠٠ مِتْرٍ', kind: 'ans' },
          ]}
          chart={FACTS}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مسألة مفتوحة: تقبل كل جملتين صحيحتين.',
      content: (
        <QuestionSlide
          source={HOT} n={19} tags={[{ kind: 'warn', text: 'مسألةٌ مفتوحةٌ' }]}
          question="أُكْتُبْ جُملتَيْ ضَربٍ يكونُ ناتجُ كلٍّ منهمَا ١٢٠."
          hint="ما حقائقُ الضربِ الَّتي تعطي ١٢؟"
          steps={[
            { label: 'الْجُمْلَةُ الْأُولَى', text: <Eq>٤ × ٣٠ = ١٢٠</Eq>, kind: 'ans' },
            { label: 'الْجُمْلَةُ الثَّانِيَةُ', text: <Eq>٢ × ٦٠ = ١٢٠</Eq>, kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'الحس العددي: نقارن ٢١ بالعدد ٢٠.',
      content: (
        <QuestionSlide
          source={HOT} n={20} tags={[{ kind: 'warn', text: 'الحسُّ العدديُّ' }]}
          question="كيفَ تعرفُ أنَّ ٢١ × ٣ أكبرُ مِن ٦٠ دونَ إجراءِ عمليَّةِ الضَّربِ؟"
          hint="ما ناتجُ ٢٠ × ٣؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'لِأَنَّ ٢٠ × ٣ = ٦٠، وَ٢١ أَكْبَرُ مِنْ ٢٠', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'اكتشف المختلف: نبحث عن التي لا تحتاج إلى إعادة التجميع.',
      content: (
        <QuestionSlide
          source={HOT} n={21} tags={[{ kind: 'warn', text: 'اكتشفِ المختلفَ' }]}
          question="أيُّ مسائلِ الضَّربِ التَّاليةِ تختلفُ عنِ المسائلِ الثَّلاثِ الأُخرَى؟"
          hint="أيُّها لا يحتاجُ إلى إعادةِ التَّجميعِ؟"
          steps={[
            { text: 'نَضْرِبُ آحَادَ كُلِّ مَسْأَلَةٍ' },
            { text: <Eq>٣ × ٣ = ٩</Eq> },
            { label: 'الْمَسْأَلَةُ الْمُخْتَلِفَةُ', text: <Eq>٣ × ٣٣</Eq>, kind: 'ans' },
          ]}
          chart={
            <Grid cols={2}>
              <Card kind="ex"><Eq>٣ × ٣٣</Eq></Card>
              <Card kind="ex"><Eq>٤ × ٢٣</Eq></Card>
              <Card kind="ex"><Eq>٥ × ١٥</Eq></Card>
              <Card kind="ex"><Eq>٧ × ١٨</Eq></Card>
            </Grid>
          }
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'أكتب: الآحاد، ثم إعادة التجميع، ثم العشرات.',
      content: (
        <QuestionSlide
          source={HOT} n={22} tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="أُكْتُبْ وصفًا للخُطواتِ الَّتي تتَّبعُهَا لتجدَ ناتجَ ٤ × ٧٦"
          hint="بماذا نبدأُ؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'نَضْرِبُ الْآحَادَ: ٢٤، وَنَحْمِلُ ٢، ثُمَّ الْعَشَرَاتِ: ٢٨ + ٢ = ٣٠، فَالنَّاتِجُ ٣٠٤', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'تدريب على اختبار.',
      content: (
        <QuestionGroup source={TEST} cols={2} time={60}>
          <QCard n={23}>
            <MCQ q="وُزِّعَ طلَّابُ الصفِّ الرابعِ في مدرسةٍ ما علَى ٣ فصولٍ دراسيَّةٍ، في كلٍّ منهَا ٢١ طالبًا، ما عددُ طلَّابِ الصفِّ الرابعِ في هذهِ المدرسةِ؟ (الدرس ٥-٥)" options={['أ) ٣٦ طالبًا', 'ب) ٦٠ طالبًا', 'جـ) ٦١ طالبًا', 'د) ٦٣ طالبًا']} answer="د) ٦٣ طالبًا" />
          </QCard>
          <QCard n={24}>
            <MCQ q="طولُ عربةِ القطارِ ٨ متراتٍ. ما طولُ ٢٤ عربةَ قطارٍ؟ (الدرس ٥-٦)" options={['أ) ١٦٠ مترًا', 'ب) ١٦٢ مترًا', 'جـ) ١٩٢ مترًا', 'د) ٢٤٠ مترًا']} answer="جـ) ١٩٢ مترًا" />
          </QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٥-٢.',
      content: (
        <QuestionGroup source={REVIEW} instruction="أوجدْ ناتجَ الضربِ، مُستعملًا الحسابَ الذهنيَّ: (الدرس ٥-٢)" cols={3} time={60}>
          <One n={25} a={4} b={20} />
          <One n={26} a={3} b={800} />
          <One n={27} a={6000} b={5} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٥-٤: نقرب العدد الأكبر إلى أكبر منزلة.',
      content: (
        <QuestionGroup source={REVIEW} instruction="قدِّرْ ناتجَ الضربِ في كلٍّ ممَّا يأتي: (الدرس ٥-٤)" cols={3} time={75}>
          <Est n={28} a={2} b={265} e="٦٠٠" />
          <Est n={29} a={3} b={849} e="٢٤٠٠" />
          <Est n={30} a={7} b={5513} e="٤٢٠٠٠" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مهارة سابقة: نقرأ الطولين من التمثيل ونطرح.',
      content: (
        <QuestionSlide
          source={REVIEW} n={31} time={45}
          question="التمثيلُ بالأعمدةِ التالي يبيِّنُ عددَ أقمارِ بعضِ الكواكبِ. استعملِ التمثيلَ لتحديدِ كمْ يزيدُ عددُ أقمارِ المشتري علَى عددِ أقمارِ زُحلَ. (مهارة سابقة)"
          hint="ما طولُ كلِّ عمودٍ؟"
          steps={[
            { text: 'الْمُشْتَرِي ٦٠، وَزُحَلُ ٥٠', hl: ['p3', 'p1'] },
            { text: <Eq>٦٠ − ٥٠ = ١٠</Eq> },
            { label: 'الزِّيَادَةُ', text: '١٠ أَقْمَارٍ', kind: 'ans' },
          ]}
          chart={<HBars title="عددُ أقمارِ الكواكبِ" labels={['أورانوس', 'زحل', 'نبتون', 'المشتري']} values={[27, 50, 13, 60]} max={70} grid={10} lab={10} xTitle="عددُ الأقمارِ" />}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٥-٣.',
      content: (
        <QuestionSlide
          source={REVIEW} n={32} time={60}
          question="توفِّرُ ريمُ ٤٠ ريالًا أسبوعيًّا فهلْ منَ المعقولِ القولُ بأنَّهَا ستوفِّرُ ٣٠٠ ريالٍ في ٦ أسابيعَ؟ وضِّحْ إجابتَكَ. (الدرس ٥-٣)"
          hint="كمْ توفِّرُ في ٦ أسابيعَ؟"
          steps={[
            { text: <Eq>٦ × ٤٠ = ٢٤٠</Eq> },
            { text: '٢٤٠ أَقَلُّ مِنْ ٣٠٠' },
            { label: 'الْقَرَارُ', text: 'غَيْرُ مَعْقُولٍ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب إكمال كل فرع شفهيًا قبل أن تشير إليه.',
      content: (
        <>
          <SlideHead tag="أهمّ الأفكار" kind="rule">ملخص الدرس</SlideHead>
          <MindMap
            center={<>الضرب مع<br />إعادة التجميع</>}
            items={[
              { kind: 'rule', cap: 'الآحاد', text: 'أضرب وأكتب الآحاد' },
              { kind: 'ex', cap: 'أعيد التجميع', text: 'أكتب العشرات فوق منزلتها' },
              { kind: 'qs', cap: 'العشرات', text: 'أضرب، ثم أجمع ما حملته' },
              { kind: 'warn', cap: 'أتأكد', text: 'بالتقدير' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 2,
      notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">ثلاثة أسئلة</SlideHead>
          <ExitTicket>
            <MCQ q="٢ × ٣٧ = ؟" options={['٦٤', '٧٤', '٣٩']} answer="٧٤" />
            <MCQ q="٥ × ١٦ = ؟" options={['٨٠', '٥٦', '٧٠']} answer="٨٠" />
            <MCQ q="في ٣ علبٍ، في كلٍّ منها ٢٤ قلمًا. كمْ قلمًا؟" options={['٢٧', '٦٢', '٧٢']} answer="٧٢" />
          </ExitTicket>
        </>
      ),
    },
    {
      sec: 'close', min: 1,
      notes: 'أعلن الفريق الفائز إن كانت في الحصة فرق، واشكر الطلاب.',
      content: (
        <>
          <SlideHead tag="الختام" kind="ink">
            <IfTeams>الفريق الفائز</IfTeams>
            <IfTeams none>انتهى الدرس، شكرًا لكم</IfTeams>
          </SlideHead>
          <Stack>
            <Winner />
            <GoHomeButton />
          </Stack>
        </>
      ),
    },
  ],
});
