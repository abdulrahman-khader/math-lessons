import {
  AreaModel, BookLabel, BulletCard, Card, Cols, Ctrls, Eq, ExitTicket, FnTable, GoHomeButton, Goals, Grid, IfTeams, MCQ, MindMap, NextButton, QCol, QText,
  QuestionSlide, ShapeRow, SlideHead, Solution, Stack, Step, Winner, defineLesson, storySlide,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

const SOLVE = 'حُلَّ مسائلَ مُتنوِّعةً، ص ١٦٢';
const PLANS = ['إنشاءُ جدولٍ', 'كتابةُ جملةٍ عدديَّةٍ', 'تمثيلُ المسألةِ', 'البحثُ عن نمطٍ'];
const STORY = 'عُلبةُ الحلوَى الواحدةُ تكفِي ١٥ مدعوًّا لحفلِ نجاحِي، وعندِي ٤ عُلبٍ. أَوْجِدْ كمْ مدعوًّا تكفيهِم العُلبُ الأربعُ؟';

const Plans = () => <BulletCard cap="الخطط" items={PLANS} />;

export default defineLesson({
  meta: {
    id: 'g4-5-7-problem-solving-investigation',
    design: 'v2',
    code: '٥-٧',
    title: 'اسْتِقْصَاءُ حَلِّ الْمَسْأَلَةِ',
    shortTitle: 'استقصاء حل المسألة',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الخامس: الضرب في عدد من رقم واحد',
    source: 'الجزء الأول، ص ١٦١–١٦٢',
    minutes: 45,
    idea: 'أختارُ الخُطَّةَ المناسبةَ لأحلَّ المسألةَ.',
    bookQuestions: 9,
  },
  sectionDesc: {
    engage: 'تذكّر الضرب',
    explain: 'عبدالمجيد: افهم، خطط، حل، تحقق',
    elab: 'نعمل معًا',
    practice: 'الأسئلة ١–٩',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. لا نتعلم خطة جديدة؛ نختار من الخطط التي نعرفها.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Card kind="rule" cap="فكرة الدرس">أختارُ الخُطَّةَ المناسبةَ لأحلَّ المسألةَ.</Card>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals items={['أحدد المعطيات والمطلوب.', 'أختار خطة مناسبة.', 'أحل المسألة وأتحقق من الحل.']} />
            </Card>
          </Cols>
        </>
      ),
    },
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الدرس ٥-٦.',
      content: (
        <>
          <SlideHead tag="تذكّر، الدرس ٥-٦" kind="ink">الضرب مع إعادة التجميع</SlideHead>
          <Grid cols={3}>
            <MCQ q="٣ × ٢٤ = ؟" options={['٦٢', '٧٢', '٢٧']} answer="٧٢" award />
            <MCQ q="٥ × ١٣ = ؟" options={['٥٣', '٦٥', '١٨']} answer="٦٥" award />
            <MCQ q="٢ × ٤٧ = ؟" options={['٨٤', '٤٩', '٩٤']} answer="٩٤" award />
          </Grid>
        </>
      ),
    },
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند السؤال واسأل: أي خطة تناسب؟ ودع الطلاب يرسمون جدولًا بالأيام.'),
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: نقرأ المسألة ونحدد المعطيات والمطلوب ثم الخطة.',
      content: (
        <>
          <SlideHead tag="استقصاء حل المسألة، ص ١٦١" kind="ex">عبدُالمجيدِ</SlideHead>
          <QText long><BookLabel>عبدُالمجيدِ:</BookLabel> {STORY}</QText>
          <Cols even>
            <BulletCard cap="افْهَمْ: ما معطياتُ المسألةِ؟" items={['لدَى عبدِالمجيدِ ٤ عُلبِ حلوَى.', 'العُلبةُ الواحدةُ تكفِي ١٥ مدعوًّا.']} />
            <Stack>
              <Card kind="qs" cap="ما المطلوبُ؟">ما عددُ المدعوِّينَ الَّذينَ تكفيهِمُ العُلبُ الأربعُ؟</Card>
              <Card kind="rule" cap="خَطِّطْ">اِضْرِبْ عددَ المدعوِّينَ الَّذينَ تكفيهِمُ العُلبةُ الواحدةُ في عددِ العُلبِ الَّتي عندَ عبدِالمجيدِ.</Card>
            </Stack>
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 3,
      notes: 'حل وتحقق كما في الكتاب: نواتج الضرب الجزئية ثم الجمع المتكرر.',
      content: (
        <>
          <SlideHead tag="استقصاء حل المسألة، ص ١٦١" kind="ex">حُلَّ، ثمَّ تَحَقَّقْ</SlideHead>
          <Cols>
            <QCol>
              <QText>تحتاجُ إلى إيجادِ ١٥ × ٤</QText>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step hl={['n0']}><Eq>٤ × ٥ = ٢٠</Eq></Step>
                <Step hl={['n1']}><Eq>٤ × ١٠ = ٤٠</Eq></Step>
                <Step><Eq>٢٠ + ٤٠ = ٦٠</Eq></Step>
                <Step kind="ans" label="عَدَدُ الْمَدْعُوِّينَ">٦٠ مَدْعُوًّا</Step>
                <Step>نتحقَّقُ: <Eq>١٥ + ١٥ + ١٥ + ١٥ = ٦٠</Eq></Step>
              </Solution>
            </QCol>
            <AreaModel h={4} parts={[5, 10]} />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: ٣ × ١٧ (مثال غير أمثلة الكتاب).',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },
    {
      sec: 'elab', min: 3,
      notes: 'نعمل معًا: نختار الخطة ونذكر السبب.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أيُّ خطَّةٍ أنسبُ؟</SlideHead>
          <Grid cols={2}>
            <MCQ q="أعدادٌ تزيدُ ٥ كلَّ مرَّةٍ: ٥، ١٠، ١٥، … ما العددُ العاشرُ؟" options={['البحثُ عن نمطٍ', 'تمثيلُ المسألةِ']} answer="البحثُ عن نمطٍ" award />
            <MCQ q="٣ صناديقَ، في كلٍّ منها ٢٤ قلمًا. كمْ قلمًا؟" options={['كتابةُ جملةٍ عدديَّةٍ', 'إنشاءُ جدولٍ']} answer="كتابةُ جملةٍ عدديَّةٍ" award />
          </Grid>
        </>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'كل صف: نضرب عدد المركبات في ١٢.',
      content: (
        <QuestionSlide
          source={SOLVE} n={1} time={90} long
          intro="اخترِ الخُطَّةَ المناسبةَ ممَّا يلي لحلِّ كلٍّ منَ المسائلِ التَّاليةِ:"
          question="الجبرُ: إذا كانَتْ حمُولةُ مركبةٍ ١٢ شخصًا، فاعملْ جدولًا لتجدَ بوساطتِهِ عددَ الأشخاصِ الَّذينَ تَسَعُهُمْ (١٠ مركباتٍ، ١١ مركبةً، ١٢ مركبةً، ١٣ مركبةً)."
          hint="كمْ شخصًا في المركبةِ الواحدةِ؟"
          steps={[{ label: 'الْخُطَّةُ', text: 'إِنْشَاءُ جَدْوَلٍ', kind: 'ans' }]}
          chart={<FnTable title="حمولةُ المركباتِ" heads={['المركباتُ', 'الأشخاصُ']} rows={[[10, { b: 120 }], [11, { b: 132 }], [12, { b: 144 }], [13, { b: 156 }]]} />}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'كل قميص مع بنطالين ثم ٣ أحذية.',
      content: (
        <QuestionSlide
          source={SOLVE} n={2} time={75}
          question="أمامَ حسنٍ ٣ قمصانٍ، وبنطالانِ وَ ٣ أحذيةٍ ليختارَ منها زِيًّا رياضيًّا. كمْ مظهرًا مختلفًا يمكنُهُ الاختيارُ مِنها؟"
          hint="كمْ مظهرًا مع القميصِ الواحدِ؟"
          steps={[
            { text: <Eq>٣ × ٢ = ٦</Eq> },
            { text: <Eq>٦ × ٣ = ١٨</Eq> },
            { label: 'عَدَدُ الْمَظَاهِرِ', text: '١٨ مَظْهَرًا', kind: 'ans' },
          ]}
          chart={<Plans />}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'نجد نصيب الدب الواحد أولًا.',
      content: (
        <QuestionSlide
          source={SOLVE} n={3} time={75}
          question="إذا علمتَ أنَّ ٤ دببةٍ تأكلُ ٢٠٠٠ نملةٍ في اليومِ. فمَا عددُ النملِ الَّذي يأكلُهُ دبَّانِ في اليومِ؟"
          hint="كمْ يأكلُ الدبُّ الواحدُ؟"
          steps={[
            { text: <Eq>٢٠٠٠ ÷ ٤ = ٥٠٠</Eq> },
            { text: <Eq>٢ × ٥٠٠ = ١٠٠٠</Eq> },
            { label: 'عَدَدُ النَّمْلِ', text: '١٠٠٠ نَمْلَةٍ', kind: 'ans' },
          ]}
          chart={<Plans />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'جملة عددية واحدة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={4} time={60}
          question="يتكونُ دفترُ ملصقاتٍ منْ ٥ أوراقٍ، فِي كلِّ ورقةٍ ١٨ مُلصقًا. فكمْ ملصقًا فِي الدفترِ؟"
          hint="ما الجملةُ العدديَّةُ؟"
          steps={[
            { text: <Eq>٥ × ١٨ = ٩٠</Eq> },
            { label: 'عَدَدُ الْمُلْصَقَاتِ', text: '٩٠ مُلْصَقًا', kind: 'ans' },
          ]}
          chart={<Plans />}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'كل عدد ضعف الذي قبله.',
      content: (
        <QuestionSlide
          source={SOLVE} n={5} time={75}
          question="الجبرُ: أكملِ النَّمطَ، ثمّ صِفْهُ: ١٠٠، ٢٠٠، ٤٠٠، ■، ١٦٠٠، ■، ٦٤٠٠"
          hint="ماذا يحدثُ لكلِّ عددٍ؟"
          steps={[
            { text: <Eq>٢ × ٤٠٠ = ٨٠٠</Eq> },
            { text: <Eq>٢ × ١٦٠٠ = ٣٢٠٠</Eq> },
            { label: 'الْعَدَدَانِ', text: '٨٠٠، ٣٢٠٠', kind: 'ans' },
            { label: 'النَّمَطُ', text: 'كُلُّ عَدَدٍ ضِعْفُ الَّذِي قَبْلَهُ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'يتكرر النمط كل ٤ أشكال، ونبدأ العد من اليمين.',
      content: (
        <QuestionSlide
          source={SOLVE} n={6} time={75}
          question="الهندسةُ: إذا تكرَّرَ النَّمطُ التَّالي، فمَا الشَّكلُ الَّذي سيكونُ رقمُهُ ١٨؟"
          hint="كلَّ كمْ شكلًا يتكرَّرُ النَّمطُ؟"
          steps={[
            { text: 'يَتَكَرَّرُ النَّمَطُ كُلَّ ٤ أَشْكَالٍ' },
            { text: <Eq>٤ × ٤ = ١٦</Eq> },
            { text: 'الشَّكْلُ ١٨ هُوَ الثَّانِي فِي النَّمَطِ' },
            { label: 'الشَّكْلُ', text: 'الْمُثَلَّثُ', kind: 'ans' },
          ]}
          chart={<ShapeRow items={['circle', 'triangle', 'square', 'square', 'circle', 'triangle', 'square', 'square']} />}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'نجمع ما تبرعت به نجلاء وروان ثم نطرح من المجموع.',
      content: (
        <QuestionSlide
          source={SOLVE} n={7} time={75}
          question="تبرَّعَتْ كلٌّ مِنْ نجلاءَ وجمانةَ وروانَ لإحدَى الجمعيَّاتِ الخيريَّةِ، إذا كانَتْ نجلاءُ قدْ تبرَّعَتْ بـ ١٢٠ ريالًا، وتبرَّعَتْ روانُ بـ ٥٠ ريالًا، وكانَ مجموعُ مَا تبرَّعْنَ بِهِ جميعًا ٣٢٠ ريالًا، فبكمْ ريالٍ تبرَّعَتْ جمانةُ؟"
          hint="كمْ تبرَّعَتْ نجلاءُ وروانُ معًا؟"
          steps={[
            { text: <Eq>١٢٠ + ٥٠ = ١٧٠</Eq> },
            { text: <Eq>٣٢٠ − ١٧٠ = ١٥٠</Eq> },
            { label: 'تَبَرُّعُ جُمَانَةَ', text: '١٥٠ رِيَالًا', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'خطة تمثيل المسألة: يقف أربعة طلاب بأسماء الصور.',
      content: (
        <QuestionSlide
          source={SOLVE} n={8} time={90}
          question="رُتِّبَتْ أربعُ صورٍ علَى النَّحوِ الآتِي: صورةُ الحصانِ عنْ يسارِ صورةِ الجملِ، وجاءَتْ صورةُ السيارةِ أخيرًا وعنْ يمينِهَا صورةُ الحافلةِ. فما ترتيبُ هذِهِ الصُّورِ؟"
          hint="أيُّ صورةٍ في آخرِ الترتيبِ؟"
          steps={[
            { text: 'السَّيَّارَةُ أَخِيرًا، وَقَبْلَهَا الْحَافِلَةُ' },
            { text: 'الْحِصَانُ عَنْ يَسَارِ الْجَمَلِ' },
            { label: 'التَّرْتِيبُ مِنَ الْيَمِينِ', text: 'الْجَمَلُ، الْحِصَانُ، الْحَافِلَةُ، السَّيَّارَةُ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'أكتب: يقارن الطلاب خططهم؛ قد تختلف.',
      content: (
        <QuestionSlide
          source={SOLVE} n={9} tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="أُكْتُبْ الخُطَّةَ الَّتي اتَّبعْتَهَا، في حلِّ السُّؤالِ رقمِ ٧؟ اِشْرَحْ كيفَ استعملتَهَا."
          hint="ماذا كتبْنا أوَّلًا؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'كِتَابَةُ جُمْلَةٍ عَدَدِيَّةٍ: جَمَعْنَا ١٢٠ وَ٥٠، ثُمَّ طَرَحْنَا مِنْ ٣٢٠', kind: 'ans' }]}
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
            center={<>استقصاء<br />حل المسألة</>}
            items={[
              { kind: 'rule', cap: 'افهم', text: 'المعطيات والمطلوب' },
              { kind: 'ex', cap: 'خطط', text: 'أختار الخطة المناسبة' },
              { kind: 'qs', cap: 'حل', text: 'أنفذ الخطة' },
              { kind: 'warn', cap: 'تحقق', text: 'أراجع الإجابة' },
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
            <MCQ q="ما أولُ خطوةٍ في حلِّ المسألةِ؟" options={['حُلَّ', 'افْهَمْ', 'تَحَقَّقْ']} answer="افْهَمْ" />
            <MCQ q="٤ أكياسٍ، في كلٍّ منها ١٦ تفاحةً. كمْ تفاحةً؟" options={['٦٤', '٢٠', '٤٦']} answer="٦٤" />
            <MCQ q="٣، ٦، ١٢، ٢٤، ؟" options={['٣٠', '٣٦', '٤٨']} answer="٤٨" />
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
