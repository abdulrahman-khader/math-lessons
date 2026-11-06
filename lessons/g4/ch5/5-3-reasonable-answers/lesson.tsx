import {
  BulletCard, Card, Cols, Ctrls, Eq, ExitTicket, FnTable, GoHomeButton, Goals, Grid, IfTeams, MCQ, MindMap, MonthCal, NextButton, QCol, QText,
  QuestionSlide, SlideHead, Solution, Stack, Step, Winner, defineLesson,
} from '@engine';
import { IntroClip } from './clip';

const SKILL = 'حلِّلِ المهارةَ، ص ١٤٦';
const PRACTICE = 'تدرَّبْ على المهارةِ، ص ١٤٦';
const BACK = 'ارجعْ إلى المسألةِ السَّابقةِ ثمَّ أجبْ عن الأسئلةِ ١ - ٤:';
const DECIDE = 'قَرِّرْ إذَا كانتِ الإجابةُ معقولةً أمْ لا، وَاذْكُرِ السَّبَبَ:';
const VERDICT = 'الْقَرَارُ';
const STORY = 'أَهْدَى سعدٌ ثلاثةَ صناديقَ مِن الأقلامِ لطلَّابِ مدرستِه، كلُّ صندوقٍ منهَا يحتوي على ٩٠٠ قلمٍ. وقد كانَ طلَّابُ المدرسةِ يحتاجونَ إلى ٢٥٠٠ قلمٍ كلَّ شهرٍ. قالَ سعدٌ: إنَّ الأقلامَ تكفِي طُلَّابَ المدرسةِ أكثرَ من شهرٍ. فهلْ هذا معقولٌ؟';

export default defineLesson({
  meta: {
    id: 'g4-5-3-reasonable-answers',
    design: 'v2',
    code: '٥-٣',
    title: 'مهارةُ حَلِّ المسألةِ: تحديدُ معقوليةِ الإجابةِ',
    shortTitle: 'تحديد معقولية الإجابة',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الخامس: الضرب في عدد من رقم واحد',
    source: 'الجزء الأول، ص ١٤٥–١٤٦',
    minutes: 45,
    idea: 'أستعملُ مهارةَ تحديدِ معقوليةِ الإجابةِ لأحلَّ المسألةَ.',
    bookQuestions: 10,
  },
  sectionDesc: {
    engage: 'تذكّر الضرب الذهني',
    explore: 'مسألة الأقلام',
    explain: 'افهم، خطط، حل، تحقق',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٤',
    practice: 'الأسئلة ٥–٩',
    hot: 'السؤال ١٠',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. معقول تعني: هل الجواب يناسب المسألة؟',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Card kind="rule" cap="فكرة الدرس">أستعملُ مهارةَ تحديدِ معقوليةِ الإجابةِ لأحلَّ المسألةَ.</Card>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals items={['أحسب ما تطلبه المسألة.', 'أقارن الناتج بالقول.', 'أقرر: معقول أم لا، وأذكر السبب.']} />
            </Card>
          </Cols>
        </>
      ),
    },
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الدرس ٥-٢.',
      content: (
        <>
          <SlideHead tag="تذكّر، الدرس ٥-٢" kind="ink">الضرب الذهني</SlideHead>
          <Grid cols={3}>
            <MCQ q="٤ × ٢٠٠ = ؟" options={['٨٠', '٨٠٠', '٨٠٠٠']} answer="٨٠٠" award />
            <MCQ q="٦ × ٣٠ = ؟" options={['١٨', '١٨٠', '١٨٠٠']} answer="١٨٠" award />
            <MCQ q="أيُّهما أكبرُ؟" options={['٢٧٠٠', '٢٥٠٠']} answer="٢٧٠٠" award />
          </Grid>
        </>
      ),
    },
    {
      sec: 'explore', min: 2,
      notes: 'اقرأ المسألة، واطلب توقّع الطلاب قبل الحساب.',
      content: (
        <>
          <SlideHead tag="مهارةُ حَلِّ المسألةِ، ص ١٤٥" kind="qs">أقلامُ سعدٍ</SlideHead>
          <QText>{STORY}</QText>
        </>
      ),
    },
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: افهم وخطط كما في الكتاب.',
      content: (
        <>
          <SlideHead tag="ص ١٤٥" kind="ex">أفهمُ، أخطِّطُ</SlideHead>
          <Cols even>
            <BulletCard cap="ما معطياتُ المسألةِ؟" items={['أهدَى للمدرسةِ ثلاثةَ صناديقَ.', 'كلُّ صندوقٍ يحتوي على ٩٠٠ قلمٍ.', 'يحتاجُ الطُّلَّابُ إلى ٢٥٠٠ قلمٍ شهريًّا.']} />
            <Stack>
              <Card kind="qs" cap="ما المطلوبُ؟">هلْ منَ المعقولِ القولُ بأنَّ ٣ صناديقَ منَ الأقلامِ تكفي الطُّلَّابَ أكثرَ منْ شهرٍ؟</Card>
              <Card kind="rule" cap="خَطِّطْ">أَوْجِدْ ناتجَ ٣ × ٩٠٠، ثمَّ قَرِّرْ إنْ كانَ الناتجُ معقولًا أمْ لا.</Card>
            </Stack>
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: الحل بالحقيقة الأساسية، والتحقق بالجمع.',
      content: (
        <>
          <SlideHead tag="ص ١٤٥" kind="ex">أحلُّ، أتحقَّقُ</SlideHead>
          <QCol>
            <Ctrls><NextButton /></Ctrls>
            <Solution>
              <Step><Eq>٣ × ٩ = ٢٧</Eq> ثمَّ نضيفُ صفرينِ.</Step>
              <Step><Eq>٣ × ٩٠٠ = ٢٧٠٠</Eq></Step>
              <Step><Eq>٢٧٠٠ {'>'} ٢٥٠٠</Eq></Step>
              <Step kind="ans" label={VERDICT}>نَعَمْ، مَعْقُولٌ</Step>
              <Step>نتحقَّقُ بالجمعِ: <Eq>٩٠٠ + ٩٠٠ + ٩٠٠ = ٢٧٠٠</Eq></Step>
            </Solution>
          </QCol>
        </>
      ),
    },
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: الحافلات (مثال غير أمثلة الكتاب).',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },
    {
      sec: 'elab', min: 3,
      notes: 'نعمل معًا: اطلب الحساب قبل الاختيار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">معقولٌ أمْ لا؟</SlideHead>
          <Grid cols={2}>
            <MCQ q="٥ علبٍ، في كلٍّ منها ٢٠ قلمًا. هلْ تكفي ٨٠ طالبًا؟" options={['معقول', 'غير معقول']} answer="معقول" award />
            <MCQ q="٣ رفوفٍ، على كلٍّ منها ٤٠ كتابًا. هلْ فيها ٢٠٠ كتابٍ؟" options={['معقول', 'غير معقول']} answer="غير معقول" award />
          </Grid>
        </>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نضرب لأن الصناديق متساوية.',
      content: (
        <QuestionSlide
          source={SKILL} n={1} intro={BACK}
          question="للحكمِ على معقوليةِ كلامِ سعدٍ، لماذا ضربتَ ٣ في العددِ ٩٠٠؟"
          hint="ماذا يعني ٣ صناديق في كل منها ٩٠٠؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'لِنَجِدَ مَجْمُوعَ الْأَقْلَامِ فِي الصَّنَادِيقِ', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'الصفران من ٩٠٠.',
      content: (
        <QuestionSlide
          source={SKILL} n={2}
          question="وضحْ لماذا يوجدُ صِفرانِ في ناتجِ الضَّربِ ٣ × ٩٠٠"
          hint="كم صفرًا في ٩٠٠؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'لِأَنَّ فِي ٩٠٠ صِفْرَيْنِ وَ٣ × ٩ = ٢٧', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'تقبل إجابات أخرى صحيحة.',
      content: (
        <QuestionSlide
          source={SKILL} n={3}
          question="راجعِ المسألةَ، ما الَّذي يمكنُ أنْ يجعلَ كلامَ سعدٍ غيرَ معقولٍ؟"
          hint="ماذا لو زادت حاجة الطلاب؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'لَوْ زَادَتْ حَاجَةُ الطُّلَّابِ عَلَى ٢٧٠٠ قَلَمٍ', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: '٥ × ٩٠٠ = ٤٥٠٠ و٢ × ٢٥٠٠ = ٥٠٠٠.',
      content: (
        <QuestionSlide
          source={SKILL} n={4} time={60}
          question="اِفْتَرِضْ أنَّ سعدًا أهدَى المدرسةَ خمسةَ صناديقَ منَ الأقلامِ، فهلْ منَ المعقولِ القولُ بأنَّ الأقلامَ تكفي الطُّلَّابَ مدَّةَ شهرينِ؟ اِشْرَحْ ذلكَ."
          hint="كم قلمًا في ٥ صناديق؟ وكم يحتاج الطلاب في شهرين؟"
          steps={[
            { text: <>الأقلامُ: <Eq>٥ × ٩٠٠ = ٤٥٠٠</Eq></> },
            { text: <>الحاجةُ: <Eq>٢ × ٢٥٠٠ = ٥٠٠٠</Eq></> },
            { text: <Eq>٤٥٠٠ {'<'} ٥٠٠٠</Eq> },
            { label: VERDICT, text: 'لَا، غَيْرُ مَعْقُولٍ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'نعد الأيام المعلّمة: ١٠ أيام.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={5} time={90} long intro={DECIDE}
          question="القِيَاسُ: المُفكِّرةُ الآتيةُ تُظْهِرُ الأيَّامَ الَّتي يستعملُ فيهَا طارقٌ درَّاجتَهُ في كلِّ شهرٍ: يقودُ طارقٌ درَّاجتَهُ مسافةَ ١٠ كيلومتراتٍ في المرَّةِ الواحدةِ. فهلْ منَ المعقولِ القولُ بأنَّ طارقًا قادَ درَّاجتَهُ أكثرَ من ٥٠٠ كيلُومترٍ في ٦ أشهُرٍ؟"
          hint="كم يومًا في الشهر؟"
          steps={[
            { text: <><Eq>١٠ × ١٠ = ١٠٠</Eq> ، <Eq>٦ × ١٠٠ = ٦٠٠</Eq></> },
            { label: VERDICT, text: 'نَعَمْ، مَعْقُولٌ', kind: 'ans' },
          ]}
          chart={<MonthCal days={30} start={3} marked={[3, 4, 6, 9, 15, 17, 19, 22, 26, 29]} />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'في الأسبوع ٧ أيام.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={6} time={60}
          question="يقومُ باسمٌ بتوزيعِ ٤٠ صحيفةً يوميًّا. فهلْ ٤٠٠ تقديرٌ معقولٌ لعددِ الصُّحُفِ الَّتي يوزِّعُها باسمٌ أُسبوعيًّا؟"
          hint="كم يومًا في الأسبوع؟"
          steps={[
            { text: <Eq>٧ × ٤٠ = ٢٨٠</Eq> },
            { label: VERDICT, text: 'لَا، غَيْرُ مَعْقُولٍ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نضيف ما توفره إلى ما لديها.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={7} time={60}
          question="تُوفِّرُ ريمُ ٨٠ ريالًا أُسبوعيًّا لشراءِ حاسُوبٍ ثمنُهُ ٢٠٠٠ ريالٍ. إذا كانَ لديهَا ١٥٠٠ ريالٍ، فهلْ مِنَ المعقولِ بأنَّهُ يمكنُها شراءُ جهازِ الحاسُوبِ بعدَ ٦ أسابيعَ من توفيرِهَا؟"
          hint="كم توفر في ٦ أسابيع؟"
          steps={[
            { text: <Eq>٦ × ٨٠ = ٤٨٠</Eq> },
            { text: <Eq>١٥٠٠ + ٤٨٠ = ١٩٨٠</Eq> },
            { label: VERDICT, text: 'لَا، غَيْرُ مَعْقُولٍ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نضرب ٦٠ في ٤.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={8} time={45}
          question="تُمضِي العنودُ ٦٠ دقيقةً أسبوعيًّا مشيًا داخلَ أحدِ المتنزهاتِ، فهلْ منَ المعقولِ بأنَّ العنودَ تُمضِي ٢٤٠ دقيقةً مشيًا داخلَ المتنزهِ خلالَ ٤ أسابيعَ؟"
          hint="ما ناتج ٤ × ٦٠؟"
          steps={[
            { text: <Eq>٤ × ٦٠ = ٢٤٠</Eq> },
            { label: VERDICT, text: 'نَعَمْ، مَعْقُولٌ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نجمع الأربعة: ٤٨ + ٥٢ = ١٠٠ و٤٧ + ٥٣ = ١٠٠.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={9} time={60}
          question="تُظهرُ القائمةُ الآتيةُ مجموعَ الرِّيالاتِ الَّتي يوفِّرُها مجموعةٌ منَ الأطفالِ في حصَّالاتِهم، فهلْ منَ المعقولِ القولُ بأنَّ مجموعَ ما يُوفِّرُهُ الأطفالُ جميعًا هوَ ٢٠٠ ريالٍ تقريبًا؟"
          hint="ابحث عن عددين مجموعهما ١٠٠."
          steps={[
            { text: <Eq>٤٨ + ٥٢ = ١٠٠</Eq> },
            { text: <Eq>٤٧ + ٥٣ = ١٠٠</Eq> },
            { label: VERDICT, text: 'نَعَمْ، مَعْقُولٌ', kind: 'ans' },
          ]}
          chart={<FnTable title="الحصَّالاتُ" heads={['الطفلةُ', 'عددُ الرِّيالاتِ']} rows={[['ناهدُ', 48], ['نُهَى', 52], ['خلودُ', 47], ['وفاءُ', 53]]} />}
        />
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'أكتب: اقرأ مسألتين من الطلاب.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={10} tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="مسألةً يَكُونُ ١٨٠ ريالًا إجابةً معقولةً لَهَا."
          hint="ما الأعداد التي ناتج ضربها ١٨٠؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'اشْتَرَى فَهْدٌ ٦ كُتُبٍ ثَمَنُ كُلٍّ مِنْهَا ٣٠ رِيَالًا، فَكَمْ دَفَعَ؟', kind: 'ans' }]}
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
            center={<>هل الإجابة<br />معقولة؟</>}
            items={[
              { kind: 'rule', cap: 'أفهم', text: 'ما المعطيات؟ وما القول؟' },
              { kind: 'ex', cap: 'أحسب', text: 'أجد الناتج' },
              { kind: 'qs', cap: 'أقارن', text: 'الناتج بالقول' },
              { kind: 'warn', cap: 'أقرر', text: 'معقول أم لا، مع السبب' },
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
            <MCQ q="٢ × ٤٠٠ = ؟" options={['٨٠', '٨٠٠', '٨٠٠٠']} answer="٨٠٠" />
            <MCQ q="٣ أكياسٍ في كلٍّ منها ٥٠ كرةً. هلْ فيها ١٠٠ كرةٍ فقطْ؟" options={['معقول', 'غير معقول']} answer="غير معقول" />
            <MCQ q="يوفِّرُ ٢٠ ريالًا أسبوعيًّا. هلْ يجمعُ ٨٠ ريالًا في ٤ أسابيعَ؟" options={['معقول', 'غير معقول']} answer="معقول" />
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
