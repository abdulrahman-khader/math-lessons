import {
  BookGroup, BookLabel, BookSource, Cols, DivWork, Eq, Grid, Lines, LongDiv, MCQ, QCard, QCol, QText, QuestionGroup, QuestionSlide, Sentence, SlideHead, Solution, Step, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'تأكَّدْ، ص ١٢٥';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ١٢٦';
const DATA = 'ملفُّ البياناتِ، ص ١٢٦';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٢٦';
const TEST = 'تدريبٌ على اختبارٍ، ص ١٢٧';
const REVIEW = 'مراجعةٌ تراكميَّةٌ، ص ١٢٧';
const FIND = 'أوجدْ ناتجَ القسمةِ في كلٍّ ممَّا يأتي:';
const FIND_R = 'أَوجِدْ ناتجَ وباقيَ القسمةِ في كلٍّ ممَّا يأتي:';

export default defineLesson({
  meta: {
    id: 'g5-4-4-divide-two-digits',
    design: 'v2',
    code: '٤-٤',
    title: 'القسمةُ علَى عددٍ منْ رقمينِ',
    shortTitle: 'القسمة على عدد من رقمين',
    subject: 'الرياضيات',
    grade: 'الصف الخامس الابتدائي',
    chapter: 'الفصل الرابع: القسمة',
    source: 'الجزء الأول، ص ١٢٤–١٢٧',
    minutes: 45,
    idea: 'أقسمُ أعدادًا منْ ثلاثةِ أرقامٍ علَى عددٍ منْ رقمينِ.',
    bookQuestions: 33,
  },
  sectionDesc: { engage: 'تذكّر', explain: 'أمثلة الكتاب', elab: 'نعمل معًا', check: 'الأسئلة ١–٦', practice: 'الأسئلة ٧–١٨', hot: 'الأسئلة ١٩–٣٣', close: 'ملخص، تذكرة الخروج' },
  slides: [
    goalsSlide('أقسمُ أعدادًا منْ ثلاثةِ أرقامٍ علَى عددٍ منْ رقمينِ.', ['أُقدِّرُ الناتجَ أوَّلًا.', 'أقسمُ، أضربُ، أطرحُ، أُنزِلُ.', 'أتحقَّقُ منَ الناتجِ.']),
    askSlide('engage', 'تذكّر', [['٨٤ ÷ ٤ = ؟', ['٢١', '٢٤', '٨٠'], '٢١'], ['٣٦ × ٢ = ؟', ['٧٢', '٣٨', '٦٢'], '٧٢'], ['٤٠٠ ÷ ٤٠ = ؟', ['١٠', '١٠٠', '٤'], '١٠']], 'مراجعة القسمة على رقم واحد، والضرب، والقسمة على العشرات.'),
    {
      sec: 'explain', min: 3,
      notes: 'نقرأ المسألة، ونسأل: كم مرة يتكرر ٣٦ في ٧٢؟',
      content: (
        <>
          <SlideHead tag="استعدَّ، ص ١٢٤" kind="rule">الكعكة</SlideHead>
          <Cols>
            <QCol>
              <QText>جهَّزَ مخبزٌ كعكةً كبيرةً تكفِي لإِطعامِ ٣٦ شَخصًا. كَمْ كعكةً يحتاجُ المخبزُ لإِطعامِ ٧٢ شَخصًا؟</QText>
              <Solution>
                <Step>نقسمُ عددَ الأشخاصِ على ٣٦</Step>
                <Step><Eq>٢ × ٣٦ = ٧٢</Eq></Step>
                <Step><Eq>٧٢ ÷ ٣٦ = ٢</Eq></Step>
                <Step kind="ans" label="يحتاجُ المخبزُ">كعكتينِ</Step>
              </Solution>
            </QCol>
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: أسأل قبل كل خطوة: ماذا نفعل الآن؟ نقسم، نضرب، نطرح، ننزل.',
      content: (
        <>
          <SlideHead tag="مثالٌ منْ واقعِ الحياةِ، ص ١٢٤" kind="rule">القسمةُ علَى عددٍ منْ رقمينِ</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>طعامٌ:</BookLabel> ارجِعْ إلى المَعلوماتِ أعلاهُ. كَم كَعكةً تكفِي لإِطعامِ ٣٩٦ شخصًا؟</QText>
              <Solution>
                <Step><BookLabel>قدِّرْ:</BookLabel> <Eq>٤٠٠ ÷ ٤٠ = ١٠</Eq></Step>
                <Step hl={['n0']}><BookLabel>الخطوةُ ١:</BookLabel> نقسمُ <Eq>٣٩ ÷ ٣٦</Eq></Step>
                <Step hl={['n1', 'n2']}>نضربُ ونطرحُ: <Eq>٣٩ − ٣٦ = ٣</Eq></Step>
                <Step hl={['n3', 'n4']}><BookLabel>الخطوةُ ٢:</BookLabel> نُنزِلُ ٦، ونقسمُ <Eq>٣٦ ÷ ٣٦ = ١</Eq></Step>
                <Step hl={['n5', 'n6']}>نضربُ ونطرحُ: <Eq>٣٦ − ٣٦ = ٠</Eq></Step>
                <Step kind="ans" label="نحتاجُ إلى">١١ كعكةً</Step>
              </Solution>
            </QCol>
            <LongDiv a={396} d={36} byHl />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'الباقي أصغر من المقسوم عليه دائمًا. التحقق: نضرب الناتج في المقسوم عليه ثم نجمع الباقي.',
      content: (
        <>
          <SlideHead tag="مثالٌ، ص ١٢٥" kind="rule">القسمةُ معَ باقٍ</SlideHead>
          <Cols>
            <QCol>
              <QText>أَوجِدْ ناتجَ وباقيَ قسمةِ ٧٥١ ÷ ٣٠</QText>
              <Solution>
                <Step><BookLabel>قدِّرْ:</BookLabel> <Eq>٧٥٠ ÷ ٣٠ = ٢٥</Eq></Step>
                <Step hl={['n0']}><BookLabel>الخطوةُ ١:</BookLabel> نقسمُ <Eq>٧٥ ÷ ٣٠</Eq></Step>
                <Step hl={['n1', 'n2']}>نضربُ ونطرحُ: <Eq>٧٥ − ٦٠ = ١٥</Eq></Step>
                <Step hl={['n3', 'n4']}><BookLabel>الخطوةُ ٢:</BookLabel> نُنزِلُ ١، ونقسمُ <Eq>١٥١ ÷ ٣٠</Eq></Step>
                <Step hl={['n5', 'n6']}>نضربُ ونطرحُ: <Eq>١٥١ − ١٥٠ = ١</Eq></Step>
                <Step kind="ans" label="الناتجُ والباقي">٢٥ والباقي ١</Step>
                <Step><BookLabel>تحقَّقْ:</BookLabel> <Eq>٢٥ × ٣٠ + ١ = ٧٥١</Eq></Step>
              </Solution>
            </QCol>
            <LongDiv a={751} d={30} byHl />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 4,
      notes: 'هنا لا نبدأ بالعشرات: ٢٠ أصغر من ٥٢، فيكون الناتج رقمًا واحدًا.',
      content: (
        <>
          <SlideHead tag="مثالٌ منْ واقعِ الحياةِ، ص ١٢٥" kind="rule">القياسُ</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>القياسُ:</BookLabel> عَمِلَتْ ممرضةٌ متدربةٌ في مستشفًى ٢٠٨ ساعاتٍ خِلالَ سنةٍ. إذا كانَتْ تَعملُ العددَ نفسَهُ مِنَ الساعاتِ أُسبوعيًّا، فكمْ ساعةً كانَتْ تَعملُ في الأُسبوعِ؟ (السنةُ القمريةُ ٥٢ أسبوعًا)</QText>
              <Solution>
                <Step><BookLabel>قدِّرْ:</BookLabel> <Eq>٢٠٠ ÷ ٥٠ = ٤</Eq></Step>
                <Step hl={['n0']}>٢٠ أصغرُ منْ ٥٢، فنقسمُ ٢٠٨</Step>
                <Step hl={['n1', 'n2']}>نضربُ ونطرحُ: <Eq>٢٠٨ − ٢٠٨ = ٠</Eq></Step>
                <Step kind="ans" label="كانَتْ تعملُ">٤ ساعاتٍ</Step>
              </Solution>
            </QCol>
            <LongDiv a={208} d={52} byHl />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٥٥٢ ÷ ٢٣ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أقسم على رقمين', [['٨٤ ÷ ٤٢ = ؟', ['٢', '٤', '٤٢'], '٢'], ['٢٦٤ ÷ ٢٢: أوَّلُ رقمٍ في الناتجِ؟', ['١', '٢', '١٢'], '١'], ['٢٦٤ ÷ ٢٢ = ؟', ['١٢', '١١', '٢٢'], '١٢']], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 6,
      notes: 'كل ضغطة قطعة: رقم الناتج، ثم الضرب، ثم الطرح، ثم الإنزال.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={4} time={240}>
          <QCard n={1}><LongDiv a={176} d={16} /></QCard>
          <QCard n={2}><LongDiv a={192} d={24} /></QCard>
          <QCard n={3}><LongDiv a={375} d={46} /></QCard>
          <QCard n={4}><LongDiv a={289} d={31} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} chart={<LongDiv a={988} d={13} byHl />} time={120}
          question="قُسمتْ أرضُ حديقةٍ عامةٍ مساحتُها ٩٨٨ مترًا إلى ١٣ منطقةً متساويةَ المساحةِ. أوجدْ مساحةَ المنطقةِ الواحدةِ؟"
          hint="ماذا تعني «متساويةَ المساحةِ»؟"
          steps={[
            { text: 'نقسمُ المساحةَ على ١٣' },
            { text: <Eq>٩٨ ÷ ١٣ = ٧</Eq>, hl: ['n0', 'n1', 'n2'] },
            { text: 'نُنزِلُ ٨', hl: ['n3'] },
            { text: <Eq>٧٨ ÷ ١٣ = ٦</Eq>, hl: ['n4', 'n5', 'n6'] },
            { text: '٧٦ مترًا مربَّعًا', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={6} tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]} chart={null}
          question="اشرحْ كيفَ يكونُ التقديرُ مُفيدًا عندَ القِسمةِ على أعدادٍ من رَقمينِ."
          hint="ماذا يخبرُنا التقديرُ قبلَ أنْ نقسمَ؟"
          steps={[
            { text: <>مثلًا: <Eq>٤٠٠ ÷ ٤٠ = ١٠</Eq></> },
            { text: 'يُخبرُنا بعددِ أرقامِ الناتجِ، ونتحقَّقُ بهِ منْ معقوليَّةِ الإجابةِ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 6,
      notes: 'كل ضغطة قطعة. ٩: نقسم ١٨ مباشرة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND_R} cols={4} time={240}>
          <QCard n={7}><LongDiv a={98} d={14} /></QCard>
          <QCard n={8}><LongDiv a={97} d={32} /></QCard>
          <QCard n={9}><LongDiv a={18} d={11} /></QCard>
          <QCard n={10}><LongDiv a={216} d={18} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 6,
      notes: 'في ١٤: بعد إنزال ١ لا يقبل القسمة على ١٨، فنكتب ٠ في الناتج.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND_R} cols={4} time={240}>
          <QCard n={11}><LongDiv a={544} d={47} /></QCard>
          <QCard n={12}><LongDiv a={359} d={70} /></QCard>
          <QCard n={13}><LongDiv a={160} d={32} /></QCard>
          <QCard n={14}><LongDiv a={901} d={18} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={15} chart={<LongDiv a={384} d={24} byHl />} time={120}
          question="يقطعُ قاربٌ مسافةَ ٣٨٤ كيلومترًا في ٢٤ ساعةً، ما مُعدَّلُ المَسافةِ التي يَقطعُها في ساعةٍ وَاحدةٍ؟"
          hint="المسافةُ في ساعةٍ واحدةٍ: أيُّ عمليَّةٍ؟"
          steps={[
            { text: 'نقسمُ المسافةَ على عددِ السَّاعاتِ' },
            { text: <Eq>٣٨ ÷ ٢٤ = ١</Eq>, hl: ['n0', 'n1', 'n2'] },
            { text: 'نُنزِلُ ٤', hl: ['n3'] },
            { text: <Eq>١٤٤ ÷ ٢٤ = ٦</Eq>, hl: ['n4', 'n5', 'n6'] },
            { text: '١٦ كيلومترًا', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={16} chart={<LongDiv a={288} d={12} byHl />} time={120}
          question="لَدى سَميرةَ ٢٨٨ صورةً، وتُريدُ أنْ تَضعَها في ألْبومٍ تتَّسعُ كلُّ صفحةٍ مِنْ صَفَحاتِه لـ١٢ صورةً. كم صَفحةً مِنَ الألْبومِ تلزمُ لِذَلكَ؟"
          hint="كمْ مرَّةً يتكرَّرُ ١٢ في ٢٨٨؟"
          steps={[
            { text: 'نقسمُ عددَ الصُّورِ على ١٢' },
            { text: <Eq>٢٨ ÷ ١٢ = ٢</Eq>, hl: ['n0', 'n1', 'n2'] },
            { text: 'نُنزِلُ ٨', hl: ['n3'] },
            { text: <Eq>٤٨ ÷ ١٢ = ٤</Eq>, hl: ['n4', 'n5', 'n6'] },
            { text: '٢٤ صفحةً', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'نقرّب إلى أقرب عدد صحيح: إذا كان الباقي أقل من نصف ٢٦ (١٣) لا نزيد الناتج.',
      content: (
        <BookGroup
          source={DATA}
          intro="تَزدادُ كتلةُ العِجْلِ الرَّضيعِ ١٤٠ كيلوجرامًا في أوَّلِ ٢٦ أُسبوعًا من حَياتِهِ، وفي الـ ٢٦ أسبوعًا التاليةِ تزدادُ كتلتُهُ ١٦٠ كيلوجرامًا. كَم كيلوجرامًا تقريبًا تزدادُ كتلةُ العِجْلِ خلالَ أسبوعٍ؟ قَرِّبْ إجابتَكَ إلى أقربِ عَددٍ صحيحٍ."
          qs={[
            { n: 17, question: 'في أوَّلِ ٢٦ أُسبوعًا؟', steps: [{ text: <Eq>١٤٠ ÷ ٢٦ = ٥ والباقي ١٠</Eq> }, { text: '١٠ أقلُّ منْ نصفِ ٢٦' }, { text: '٥ كيلوجراماتٍ تقريبًا', kind: 'ans' }] },
            { n: 18, question: 'في ثاني ٢٦ أسبوعًا؟', steps: [{ text: <Eq>١٦٠ ÷ ٢٦ = ٦ والباقي ٤</Eq> }, { text: '٤ أقلُّ منْ نصفِ ٢٦' }, { text: '٦ كيلوجراماتٍ تقريبًا', kind: 'ans' }] },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نتحقق من كل حل بالضرب: ٣٨ × ٢١ + ٢٠ = ٨١٨. خطأ فيصل في الطرح الثاني: ٩ × ٢١ = ١٨٩ لا ١٨٨.',
      content: (
        <QuestionSlide
          source={HOT} n={19} time={120}
          chart={
            <Grid cols={2}>
              <DivWork name="عبدُ العزيزِ" a={818} d={21} q="38" rows={[['63', 2, true], ['188', 3], ['168', 3, true], ['20', 3]]} />
              <DivWork name="فَيصلٌ" a={818} d={21} q="39" rows={[['63', 2, true], ['188', 3], ['188', 3, true], ['000', 3]]} />
            </Grid>
          }
          question={<><BookLabel>اكْتشفِ الخطأَ:</BookLabel> أوجَدَ كلٌّ مِن عبدِ العزيزِ وَفيصلٍ ناتجَ قسمةِ ٨١٨ ÷ ٢١، أيُّهمَا كانتْ إجابتُهُ صحيحةً؟ فَسِّرْ إجابتَكَ.</>}
          hint="كمْ يساوي ٩ × ٢١؟"
          steps={[
            { text: <Eq>٩ × ٢١ = ١٨٩</Eq> },
            { text: 'عبدُ العزيزِ', kind: 'ans', label: 'الإجابةُ الصَّحيحةُ' },
            { text: 'فيصلٌ طرحَ ١٨٨ بدلًا منْ ١٨٩', kind: 'ans', label: 'التَّفسيرُ' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={HOT} n={20} tags={[{ kind: 'warn', text: 'اُكْتُبْ' }]} chart={null}
          question="ما أوجهُ الشبهِ والاختلافِ بينَ القسمةِ علَى عددٍ منْ رقمٍ واحدٍ والقسمةِ على عددٍ من رقمينِ؟"
          hint="ما الخطواتُ الَّتي نكرِّرُها في كلِّ قسمةٍ؟"
          steps={[
            { text: 'نقسمُ، نضربُ، نطرحُ، نُنزِلُ في الحالتينِ.', kind: 'ans', label: 'الشَّبَهُ' },
            { text: 'معَ الرقمينِ نبدأُ غالبًا بأوَّلِ رقمينِ، ونستعملُ التقديرَ.', kind: 'ans', label: 'الاختلافُ' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'تدريب على اختبار.',
      content: (
        <>
          <BookSource>{TEST}</BookSource>
          <Grid cols={1}>
            <QCard n={21}><MCQ q="وزَّعَ خالدٌ ٧٥ ريـالًا على أبنائِهِ الثلاثةِ بالتَّساوي. ما نصيبُ كلٍّ منهم؟ (الدرس ٤-٣)" options={['أ) ٧٥', 'ب) ٢٥', 'جـ) ١٥', 'د) ٢٠']} answer="ب) ٢٥" /></QCard>
          </Grid>
        </>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'تدريب على اختبار.',
      content: (
        <>
          <BookSource>{TEST}</BookSource>
          <Grid cols={1}>
            <QCard n={22}><MCQ q="موقفٌ للسياراتِ مكونٌ من عدةِ أجزاءٍ، يتسعُ كلٌّ منها لـ ١٢ سيارةً، إذا كانتْ سعةُ الموقفِ ٤٠٨ سياراتٍ، فمن كمْ جزءٍ يتكونُ الموقفُ؟ (الدرس ٤-٤)" options={['أ) ١٢', 'ب) ٣٢', 'جـ) ٣٤', 'د) ٤٠']} answer="جـ) ٣٤" /></QCard>
          </Grid>
        </>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٤-٤: نطرح أجرة الحافلة أولًا.',
      content: (
        <QuestionSlide
          source={REVIEW} n={23} chart={null} time={120}
          question="استأجرَ عددٌ منَ الأشخاصِ حافلةً بـ ٤٥٠ ريالًا؛ للقيامِ برحلةٍ إلى متحفِ دار المدينةِ، ودفعَ كلٌّ منهُم ١٥ ريالًا رسومَ دخولِ المتحفِ. إذا بلغَ مجموعُ تكاليفِ الرحلةِ ٧٢٠ ريالًا، فكمْ شخصًا شارَكَ في الرحلةِ؟"
          hint="كمْ ريالًا دُفعَ لدخولِ المتحفِ فقطْ؟"
          steps={[
            { text: <Eq>٧٢٠ − ٤٥٠ = ٢٧٠</Eq> },
            { text: <Eq>٢٧٠ ÷ ١٥ = ١٨</Eq> },
            { text: '١٨ شخصًا', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٣-١: نضرب الأرقام غير الصفرية ثم نضع الأصفار.',
      content: (
        <QuestionGroup source={REVIEW} instruction="أوجدْ ناتجَ الضربِ ذهنيًّا في كلٍّ ممَّا يأتي:" cols={2} time={90}>
          <QCard n={24}><Lines><Sentence t={[4, '×', 600, '=', { b: 2400, box: true }]} /></Lines></QCard>
          <QCard n={25}><Lines><Sentence t={[30, '×', 70, '=', { b: 2100, box: true }]} /></Lines></QCard>
          <QCard n={26}><Lines><Sentence t={[10, '×', 15, '=', { b: 150, box: true }]} /></Lines></QCard>
          <QCard n={27}><Lines><Sentence t={[80, '×', 800, '=', { b: 64000, box: true }]} /></Lines></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٢-٤: نرتب الفواصل تحت بعضها.',
      content: (
        <QuestionGroup source={REVIEW} instruction="اجمعْ أوِ اطرحْ:" cols={2} time={90}>
          <QCard n={28}><Lines><Sentence t={[64.2, '+', 3.9, '=', { b: 68.1, box: true }]} /></Lines></QCard>
          <QCard n={29}><Lines><Sentence t={[11.65, '+', 18.91, '=', { b: 30.56, box: true }]} /></Lines></QCard>
          <QCard n={30}><Lines><Sentence t={[7.8, '−', 4.9, '=', { b: 2.9, box: true }]} /></Lines></QCard>
          <QCard n={31}><Lines><Sentence t={[16.2, '−', 12.8, '=', { b: 3.4, box: true }]} /></Lines></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٢-٣: نبدأ من المبلغ ونرجع خطوة خطوة.',
      content: (
        <QuestionSlide
          source={REVIEW} n={32} chart={null} time={120} long
          question="تتقاضَى مكتبةُ إحدَى الجامعاتِ رسومَ تأخيرِ إعادةِ الكتابِ المُعارِ لطلابِهَا في الوقتِ المحددِ ريالينِ عن كلِّ يومٍ منَ الأيامِ الثلاثةِ الأُولَى، و٥ ريالاتٍ عنْ كلِّ يومٍ بعدَ ذلكَ. إذا أعادَ طالبٌ كتابًا ودفعَ ٢٦ ريالًا رسومَ تأخيرٍ. فكمْ يومًا تأخرَ في إعادتِهِ؟ (استعملْ خطةَ الحلِّ عكسيًّا)."
          hint="كمْ دفعَ عنِ الأيامِ الثلاثةِ الأُولى؟"
          steps={[
            { text: <Eq>٢٦ − ٣ × ٢ = ٢٠</Eq> },
            { text: <Eq>٢٠ ÷ ٥ = ٤</Eq> },
            { text: <Eq>٣ + ٤ = ٧</Eq> },
            { text: '٧ أيامٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ١-٦: نكتب الأطوال بعدد الأرقام نفسه بعد الفاصلة.',
      content: (
        <QuestionSlide
          source={REVIEW} n={33} time={90}
          chart={<div className="ribbon"><i /><span>٦٫٤٥ م</span></div>}
          question={<><BookLabel>القِياسُ:</BookLabel> استعملتْ مشاعلُ الشريطَ المجاورَ في تغليفِ وتزيينِ منتجاتِهَا من الهدايا، إذا كانَ لديها شريطانِ آخرانِ طولاهُمَا ٦٫٤ م ، ٦٫٥ م، رتِّبْ أطوالَ هذهِ الشرائطِ منَ الأصغرِ إلى الأكبرِ.</>}
          hint="كيفَ نكتبُ ٦٫٤ بمنزلتينِ عشريَّتينِ؟"
          steps={[
            { text: <Eq>٦٫٤٠ &lt; ٦٫٤٥ &lt; ٦٫٥٠</Eq> },
            { text: '٦٫٤ م، ٦٫٤٥ م، ٦٫٥ م', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>القسمةُ علَى<br />عددٍ منْ رقمينِ</>, [{ cap: 'أوَّلًا', text: 'أُقدِّرُ الناتجَ' }, { cap: 'أكرِّرُ', text: 'أقسمُ، أضربُ، أطرحُ، أُنزِلُ' }, { cap: 'الباقي', text: 'أصغرُ منَ المقسومِ عليهِ' }, { cap: 'تحقَّقْ', text: 'الناتجُ × المقسومِ عليهِ + الباقي' }]),
    exitSlide('أقسم على رقمين', [['٨٨ ÷ ٢٢ = ؟', ['٤', '٦٦', '٣'], '٤'], ['٢٧٣ ÷ ٢١ = ؟', ['١٣', '١٢', '٣١'], '١٣'], ['٥٠٠ ÷ ٢٤ = ؟', ['٢٠ والباقي ٢٠', '٢٠ والباقي ٢', '٢١ والباقي ٤'], '٢٠ والباقي ٢٠']]),
    endSlide,
  ],
});
