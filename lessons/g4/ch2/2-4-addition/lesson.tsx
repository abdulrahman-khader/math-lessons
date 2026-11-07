import {
  Blocks3, BookLabel, BookSource, Cols, Eq, EstAddCard, FnTable, FormQ, Grid, MCQ, NearQ, QCard, QCol, QText, QuestionGroup, QuestionSlide, SlideHead, Solution, Stack, Step, ColAdd, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'تأكَّدْ، ص ٥٨';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ٥٨';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ٥٩';
const TEST = 'تدريبٌ على اختبارٍ، ص ٥٩';
const REVIEW = 'مراجعةٌ تراكميةٌ، ص ٥٩';


export default defineLesson({
  meta: {
    id: 'g4-2-4-addition',
    design: 'v2',
    code: '٢-٤',
    title: 'الجمعُ',
    shortTitle: 'الجمع',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الثاني: الجمع والطرح',
    source: 'الجزء الأول، ص ٥٦–٥٩',
    minutes: 45,
    idea: 'أجمعُ أعدادًا تتكوَّنُ منْ عدَّةِ أرقامٍ.',
    bookQuestions: 31,
  },
  sectionDesc: {"engage": "تذكّر", "explain": "أمثلة الكتاب", "elab": "نعمل معًا", "check": "الأسئلة ١–٦", "practice": "الأسئلة ٧–١٧", "hot": "الأسئلة ١٨–٣١", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أجمعُ أعدادًا تتكوَّنُ منْ عدَّةِ أرقامٍ.', ["أُقدِّرُ أوَّلًا.", "أجمعُ منزلةً منزلةً معَ إعادةِ التجميعِ.", "أتحقَّقُ منْ معقوليَّةِ الإجابةِ."]),
    askSlide('engage', 'تذكّر', [["٧ + ٨ =", ["١٥", "١٤", "١٦"], "١٥"], ["٣٦ + ٢٨ =", ["٦٤", "٥٤", "٦٥"], "٦٤"], ["١٣ آحادًا =", ["عشرةٌ و٣ آحادٍ", "٣ عشراتٍ", "١٣ عشرةً"], "عشرةٌ و٣ آحادٍ"]], 'مراجعة إعادة التجميع.'),
    {
      sec: 'explain', min: 5,
      notes: 'النشاط من الكتاب: أعدنا تجميع الآحاد فقط.',
      content: (
        <>
          <SlideHead tag="استعدَّ، ص ٥٦" kind="rule">نشاط عملي</SlideHead>
          <QText>النموذجُ المجاورُ يُمثِّلُ ١٣٥ + ١٢٧</QText>
          <Cols even><Blocks3 v={135} /><Blocks3 v={127} /></Cols>
          <Solution>
            <Step>نُقدِّرُ: <Eq>١٤٠ + ١٣٠ = ٢٧٠</Eq></Step>
            <Step>الآحادُ: <Eq>٥ + ٧ = ١٢</Eq>، فنُعيدُ التجميعَ.</Step>
            <Step>العشراتُ: <Eq>١ + ٣ + ٢ = ٦</Eq>، فلا نُعيدُ التجميعَ.</Step>
            <Step kind="ans" label="الناتجُ"><Eq>١٣٥ + ١٢٧ = ٢٦٢</Eq></Step>
          </Solution>
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'الإجابة ٧١٧٣ قريبة من التقدير ٧١٠٠.',
      content: (
        <>
          <SlideHead tag="مثالٌ، ص ٥٦" kind="rule">الجمع مع إعادة التجميع</SlideHead>
          <Cols>
            <Solution>
              <Step><BookLabel>قدِّرْ:</BookLabel> <Eq>٦٨٠٠ + ٣٠٠ = ٧١٠٠</Eq></Step>
              <Step hl={['n0']}><BookLabel>الخطوةُ ١:</BookLabel> الآحادُ <Eq>٤ + ٩ = ١٣</Eq></Step>
              <Step hl={['n1']}>لا تتَّسعُ المنزلةُ لرقمينِ: يصعدُ ١</Step>
              <Step hl={['n2']}><BookLabel>الخطوةُ ٢:</BookLabel> العشراتُ <Eq>١ + ٢ + ٤ = ٧</Eq></Step>
              <Step hl={['n4']}><BookLabel>الخطوةُ ٣:</BookLabel> المئاتُ <Eq>٨ + ٣ = ١١</Eq></Step>
              <Step hl={['n5']}>يصعدُ ١ إلى الألوفِ</Step>
              <Step hl={['n6']}><BookLabel>الخطوةُ ٤:</BookLabel> الألوفُ <Eq>١ + ٦ = ٧</Eq></Step>
              <Step kind="ans" label="الناتجُ">٧١٧٣</Step>
            </Solution>
            <ColAdd nums={[6824, 349]} sync />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'نتحقق: ١٠٥٤٠ قريبة من ١١٠٠٠.',
      content: (
        <>
          <SlideHead tag="مثالٌ منْ واقعِ الحياةِ، ص ٥٧" kind="rule">تذاكر</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>تذاكرُ:</BookLabel> يمثِّلُ الجدولُ المجاورُ عددَ التذاكرِ المبيعةِ يومَيِ الأربعاءِ والخميسِ لحضورِ مباراتَيْ كرةِ قدمٍ. فما مجموعُ التذاكرِ المبيعةِ؟</QText>
              <Solution>
                <Step><BookLabel>قدِّرْ:</BookLabel> <Eq>٦٠٠٠ + ٥٠٠٠ = ١١٠٠٠</Eq></Step>
              </Solution>
            </QCol>
            <Stack>
              <FnTable title="مبيعاتُ التذاكرِ" heads={['اليومُ', 'العددُ']} rows={[['الأربعاءُ', '٥٧١٣'], ['الخميسُ', '٤٨٢٧']]} />
              {/* كل ضغطة منزلة، ثم الإجابة بعد الجمع */}
              <ColAdd nums={[5713, 4827]} />
              <Step kind="ans" label="المجموعُ">١٠٥٤٠ تذكرةً</Step>
            </Stack>
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٣٥٨ + ٢٧٤ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أجمع', [["٢٤٨ + ١٣٥ =", ["٣٨٣", "٣٧٣", "٣٨٤"], "٣٨٣"], ["٦٥٠ + ٢٧٠ =", ["٩٢٠", "٨٢٠", "٩١٠"], "٩٢٠"], ["١٢٠٨ + ٣٩٤ =", ["١٦٠٢", "١٥٠٢", "١٦١٢"], "١٦٠٢"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={'أوجدْ ناتجَ الجمعِ، ثمَّ تحقَّقْ منْ معقوليَّةِ الإجابةِ بالتقديرِ:'} cols={2} time={180}>
          <EstAddCard n={1} a={394} b={84} est={<Eq>٣٩٠ + ٨٠ = ٤٧٠</Eq>} />
          <EstAddCard n={2} a={1592} b={429} est={<Eq>١٦٠٠ + ٤٠٠ = ٢٠٠٠</Eq>} />
          <EstAddCard n={3} a={2971} b={864} est={<Eq>٣٠٠٠ + ٩٠٠ = ٣٩٠٠</Eq>} />
          <EstAddCard n={4} a={29380} b={8253} est={<Eq>٢٩٠٠٠ + ٨٠٠٠ = ٣٧٠٠٠</Eq>} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} chart={null} time={120}
          question={"يجمعُ فريقُ أصدقاءِ البيئةِ في المدرسةِ الزُّجاجاتِ الفارغةَ منْ أجلِ إعادةِ تدويرِها. فإذا جمعَ الفريقُ ١٧٨ زجاجةً في الشهرِ الأوَّلِ و٢٣٦ زجاجةً في الشهرِ الثاني، فكمْ زجاجةً جمعَ الفريقُ في الشهرينِ معًا؟"}
          hint="أيُّ عمليَّةٍ تناسبُ؟"
          steps={[
            { text: <Eq>١٧٨ + ٢٣٦ = ٤١٤</Eq> },
            { text: '٤١٤ زجاجةً', kind: 'ans' },
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
          question="وضِّحْ أهمِّيَّةَ ترتيبِ المنازلِ في الأعدادِ تحتَ بعضِها عندَ جمعِها."
          hint="ماذا نجمعُ معَ الآحادِ؟"
          steps={[
            { text: 'نجمعُ الآحادَ معَ الآحادِ.' },
            { text: 'الجمعُ يكونُ بينَ أرقامِ المنزلةِ نفسِها، فيصحُّ الناتجُ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={'أوجدْ ناتجَ الجمعِ، ثمَّ تحقَّقْ منْ معقوليَّةِ الإجابةِ بالتقديرِ:'} cols={2} time={180}>
          <EstAddCard n={7} a={364} b={58} est={<Eq>٣٦٠ + ٦٠ = ٤٢٠</Eq>} />
          <EstAddCard n={8} a={290} b={693} est={<Eq>٣٠٠ + ٧٠٠ = ١٠٠٠</Eq>} />
          <EstAddCard n={9} a={6742} b={975} est={<Eq>٦٧٠٠ + ١٠٠٠ = ٧٧٠٠</Eq>} />
          <EstAddCard n={10} a={8346} b={7208} est={<Eq>٨٣٠٠ + ٧٢٠٠ = ١٥٥٠٠</Eq>} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={'أوجدْ ناتجَ الجمعِ، ثمَّ تحقَّقْ منْ معقوليَّةِ الإجابةِ بالتقديرِ:'} cols={2} time={180}>
          <EstAddCard n={11} a={6481} b={2756} est={<Eq>٦٥٠٠ + ٢٨٠٠ = ٩٣٠٠</Eq>} />
          <EstAddCard n={12} a={23824} b={7346} est={<Eq>٢٤٠٠٠ + ٧٠٠٠ = ٣١٠٠٠</Eq>} />
          <EstAddCard n={13} a={82828} b={4789} est={<Eq>٨٣٠٠٠ + ٥٠٠٠ = ٨٨٠٠٠</Eq>} />
          <EstAddCard n={14} a={37178} b={82370} est={<Eq>٣٧٠٠٠ + ٨٢٠٠٠ = ١١٩٠٠٠</Eq>} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={'أوجدْ ناتجَ الجمعِ، ثمَّ تحقَّقْ منْ معقوليَّةِ الإجابةِ بالتقديرِ:'} cols={1} time={60}>
          <EstAddCard n={15} a={693782} b={47816} est={<Eq>٦٩٤٠٠٠ + ٤٨٠٠٠ = ٧٤٢٠٠٠</Eq>} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={16} chart={null} time={120}
          question={"كشفتْ إحصائياتٌ مروريَّةٌ على جسرِ الملكِ فهدٍ في أحدِ الأيامِ عنْ عبورِ ٨٧٧٨ سيَّارةً في اتجاهِ البحرينِ، و٧١٢٦ سيَّارةً في اتجاهِ السعوديةِ. ما مجموعُ السيَّاراتِ الَّتي قدْ عبرتِ الجسرَ في ذلكَ اليومِ؟"}
          hint="أيُّ عمليَّةٍ تناسبُ؟"
          steps={[
            { text: <Eq>٨٧٧٨ + ٧١٢٦ = ١٥٩٠٤</Eq> },
            { text: '١٥٩٠٤ سيَّاراتٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={17} chart={null} time={120}
          question={"يرغبُ بكرٌ في شراءِ ملابسَ رياضيةٍ ثمنُها ١٥٠ ريالًا، وكرةِ قدمٍ ثمنُها ٣٠ ريالًا. فإذا كانَ معهُ ٢٠٠ ريالٍ، وقدِ اشترى منها كتابًا ثمنُهُ ١٥ ريالًا، فهلْ يكفي ما بقيَ معهُ لشراءِ الملابسِ الرياضيةِ وكرةِ القدمِ؟"}
          hint="كمْ بقيَ معَ بكرٍ؟"
          steps={[
            { text: <Eq>٢٠٠ − ١٥ = ١٨٥</Eq> },
            { text: <Eq>١٥٠ + ٣٠ = ١٨٠</Eq> },
            { text: 'نعمْ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={18} chart={null} time={120}
          question={<><BookLabel>مسألةٌ مفتوحةٌ:</BookLabel> اكتُبْ عددينِ كلٌّ منهُما يتكوَّنُ منْ خمسةِ أرقامٍ، ويبلغُ مجموعُهُما ٦٠٠٠٠ تقريبًا.</>}
          hint="ما عددانِ مجموعُهُما ٦٠٠٠٠؟"
          steps={[
            { text: <Eq>٣٤٠٠٠ + ٢٦٠٠٠ = ٦٠٠٠٠</Eq> },
            { text: '٣٤٠٠٠ و٢٦٠٠٠', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
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
          question="كيفَ يمكنُ أنْ نجمعَ عددينِ كلٌّ منهُما يتكوَّنُ منْ أربعةِ أرقامٍ، ومجموعُهُما يتكوَّنُ منْ خمسةِ أرقامٍ؟"
          hint="ماذا يحدثُ إذا كانَ مجموعُ الألوفِ ١٠ أوْ أكثرَ؟"
          steps={[
            { text: 'مجموعُ الألوفِ ١٠ أوْ أكثرُ.' },
            { text: <Eq>٦٥٠٠ + ٤٨٠٠ = ١١٣٠٠</Eq> },
            { text: 'عندَ إعادةِ تجميعِ الألوفِ تظهرُ منزلةٌ جديدةٌ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
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
            <QCard n={20}><MCQ q="ذهبتْ مها إلى السوقِ لشراءِ لعبةِ أطفالٍ لأختِها الصغيرةِ. إذا كانَ ثمنُ اللعبةِ ٢٦ ريالًا، وكانَ لديها ورقتانِ نقديتانِ منْ فئةِ ١٠ ريالاتٍ، وورقةٌ واحدةٌ منْ فئةِ ٥ ريالاتٍ. فأيُّ العباراتِ التاليةِ صحيحةٌ؟ (الدرس ٢-٣)" options={["أ) سيتبقَّى لديها مبلغٌ أقلُّ منْ ٥ ريالاتٍ.", "ب) لا تستطيعُ شراءَ اللعبةِ لأنَّها لا تملكُ المالَ الكافيَ لشرائِها.", "جـ) لديها المبلغُ المطلوبُ بالضبطِ.", "د) سيُعيدُ لها البائعُ أكثرَ منْ ٥ ريالاتٍ."]} answer="ب) لا تستطيعُ شراءَ اللعبةِ لأنَّها لا تملكُ المالَ الكافيَ لشرائِها." /></QCard>
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
            <QCard n={21}><MCQ q="في مكتبةِ المدرسةِ ١٧ كرسيًّا إضافيًّا، وفي المطعمِ ٤٥ كرسيًّا إضافيًّا. أيٌّ ممَّا يأتي يوضِّحُ كيفيةَ إيجادِ العددِ الكلِّيِّ للكراسيِّ الإضافيَّةِ؟ (الدرس ٢-٤)" options={["أ) ١٧ + ٤٥", "ب) ١٧ − ٤٥", "جـ) ١٧ × ٤٥", "د) ١٧ ÷ ٤٥"]} answer="أ) ١٧ + ٤٥" /></QCard>
          </Grid>
        </>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٢-٢.',
      content: (
        <QuestionGroup source={REVIEW} instruction={'قدِّرِ الناتجَ بتقريبِ الأعدادِ إلى أقربِ قيمةٍ منزليَّةٍ مُعطاةٍ:'} cols={2} time={60}>
          <FormQ n={22} show={<><Eq>١٩٦ + ١٨٤</Eq>؛ عشرةٍ</>} rows={[['التَّقديرُ', <Eq>٢٠٠ + ١٨٠ = ٣٨٠</Eq>]]} />
          <FormQ n={23} show={<><Eq>٣٩٦٢ + ٥٣٦</Eq>؛ مئةٍ</>} rows={[['التَّقديرُ', <Eq>٤٠٠٠ + ٥٠٠ = ٤٥٠٠</Eq>]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'مراجعة الدرس ٢-١.',
      content: (
        <QuestionGroup source={REVIEW} instruction={'اجمعْ ذهنيًّا:'} cols={2} time={90}>
          <FormQ n={24} show={<Eq>١٠ + ٢٥ + ١٨</Eq>} rows={[['الناتجُ', <Eq>٣٥ + ١٨ = ٥٣</Eq>]]} />
          <FormQ n={25} show={<Eq>٢٦ + ١٤ + ٣</Eq>} rows={[['الناتجُ', <Eq>٤٠ + ٣ = ٤٣</Eq>]]} />
          <FormQ n={26} show={<Eq>١٥ + ١٢ + ٣٠</Eq>} rows={[['الناتجُ', <Eq>٤٥ + ١٢ = ٥٧</Eq>]]} />
          <FormQ n={27} show={<Eq>١٩ + ٢٥ + ٣١</Eq>} rows={[['الناتجُ', <Eq>٥٠ + ١٩ + ٦ = ٧٥</Eq>]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'مراجعة الدرس ١-٦.',
      content: (
        <QuestionGroup source={REVIEW} instruction={'قرِّبْ كلَّ عددٍ إلى أقربِ قيمةٍ منزليَّةٍ مُعطاةٍ:'} cols={2} time={90}>
          <NearQ n={28} v={987} step={10} name="عشرةٍ" />
          <NearQ n={29} v={2159} step={100} name="مئةٍ" />
          <NearQ n={30} v={78368} step={1000} name="ألفٍ" />
          <NearQ n={31} v={4019} step={100} name="مئةٍ" />
        </QuestionGroup>
      ),
    },
    mindSlide(<>الجمعُ</>, [{"cap": "أُقدِّرُ", "text": "قبلَ الجمعِ"}, {"cap": "أجمعُ", "text": "منَ الآحادِ إلى أكبرِ منزلةٍ"}, {"cap": "أُعيدُ التجميعَ", "text": "عندَ ١٠ أوْ أكثرَ"}, {"cap": "أتحقَّقُ", "text": "بالتقديرِ"}]),
    exitSlide('أجمع', [["٣٤٥ + ٢٣٤ =", ["٥٧٩", "٥٦٩", "٥٨٩"], "٥٧٩"], ["٤٦٨ + ٢٧٥ =", ["٧٤٣", "٦٤٣", "٧٣٣"], "٧٤٣"], ["٢٥٠٨ + ١٧٩٤ =", ["٤٣٠٢", "٤٢٠٢", "٤٣١٢"], "٤٣٠٢"]]),
    endSlide,
  ],
});
