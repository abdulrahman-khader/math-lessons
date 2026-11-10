import {
  BookLabel, Card, Cols, Ctrls, Definition, Eq, ExitTicket, FnTable, GoHomeButton, Goals, Grid, IfTeams, Lines, MCQ, MindMap, NextButton, QCard, QCol, QText,
  QuestionGroup, QuestionSlide, Sentence, SlideHead, Solution, Stack, Step, Winner, defineLesson, storySlide, RoundExplorer, trapSlide,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

const CHECK = 'تأكَّدْ، ص ١٤٨';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ١٤٩';
const REAL = 'مسألةٌ منْ واقعِ الحياةِ، ص ١٤٩';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٥٠';
const TEST = 'تدريبٌ على اختبارٍ، ص ١٥٠';
const REVIEW = 'مراجعةٌ تراكميةٌ، ص ١٥٠';
const ESTC = 'قَدِّرِ الناتجَ، ثمَّ اذْكُرْ إذَا كانَ التَّقديرُ أكبرَ مِنْ أمْ أقلَّ مِنَ الإجابةِ الدقيقةِ لناتجِ الضَّربِ:';
const ESTP = 'قَدِّرْ ناتجَ الضَّربِ، ثمَّ اذكُرْ إذَا كانَ التَّقديرُ أكبرَ مِنْ أمْ أقلَّ مِنَ الإجابةِ الدقيقةِ لناتجِ الضَّربِ:';
const FUN = 'تَرْفيهٌ: تذهبُ كلٌّ منْ نوفَ وسميرةَ إلى مدينةِ الألعابِ، وتجمعانِ نقاطًا من أجلِ الحُصولِ على جوائزَ، والشَّكلُ التَّالي يُوَضِّحُ عَدَدَ النُّقَاطِ اللَّازمَةِ لِلْحُصُولِ عَلى كُلِّ جَائزةٍ مِنْهَا.';

/** العدد المكتوب بالأرقام العربية عددًا */
const toInt = (s: string) => Number([...s].map((c) => '٠١٢٣٤٥٦٧٨٩'.indexOf(c)).join(''));

/** بطاقة تقدير: الضرب كما في الكتاب، ثم العدد بعد التقريب، ثم التقدير، ثم أكبر أم أقل */
const Est = ({ n, a, b, e, big }: { n: number; a: number; b: number; e: string; big: boolean }) => (
  <QCard n={n}>
    <Stack>
      <Lines><Sentence t={[a, '×', b]} /></Lines>
      {/* العدد المقرَّب = التقدير ÷ العدد الآخر (كما قرّبه الكتاب) */}
      <Step><Lines><Sentence t={[toInt(e) / b, '×', b]} /></Lines></Step>
      <Stack><Step kind="ans" label="التَّقْدِيرُ">{e}</Step></Stack>
      <Stack><Step kind="ans" label="الْمُقَارَنَةُ">{big ? 'أَكْبَرُ' : 'أَقَلُّ'}</Step></Stack>
    </Stack>
  </QCard>
);
const One = ({ n, a, b }: { n: number; a: number; b: number }) => (
  <QCard n={n}>
    <Lines><Sentence t={[a, '×', b, '=', { b: a * b, box: true }]} /></Lines>
  </QCard>
);
const PRIZES = <FnTable title="الجوائزُ" heads={['الجائزةُ', 'النقاطُ']} rows={[['لعبةُ السيارةِ', 2000], ['الدبدوبُ', 10000], ['الغوريلا', 50000], ['الكرةُ', 500]]} />;

export default defineLesson({
  meta: {
    id: 'g4-5-4-estimate-products',
    design: 'v2',
    code: '٥-٤',
    title: 'تقديرُ نواتجِ الضَّربِ',
    shortTitle: 'تقدير نواتج الضرب',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الخامس: الضرب في عدد من رقم واحد',
    source: 'الجزء الأول، ص ١٤٧–١٥٠',
    minutes: 45,
    idea: 'أُقدِّرُ نواتجَ الضربِ باستعمالِ التقريبِ.',
    bookQuestions: 36,
  },
  sectionDesc: {
    engage: 'تذكّر التقريب',
    explore: 'استعد: المسابقة الثقافية',
    explain: 'الأمثلة ١–٣',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٨',
    practice: 'الأسئلة ٩–٢٥',
    hot: 'الأسئلة ٢٦–٣٦',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. التقدير حين لا نحتاج إجابة دقيقة.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أُقدِّرُ نواتجَ الضربِ باستعمالِ التقريبِ.</Card>
              <Card kind="rule" cap="المفردات">التَّقديرُ</Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals items={['أقرّب العامل الأكبر من ١٠.', 'أضرب ذهنيًّا.', 'أعرف: التقدير أكبر أم أقل؟']} />
            </Card>
          </Cols>
        </>
      ),
    },
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة التقريب والضرب الذهني.',
      content: (
        <>
          <SlideHead tag="تذكّر" kind="ink">التقريب</SlideHead>
          <Grid cols={3}>
            <MCQ q="قرِّبِ ٦٧ إلى أقربِ عشرةٍ" options={['٦٠', '٧٠', '٨٠']} answer="٧٠" award />
            <MCQ q="قرِّبِ ٣٢٠ إلى أقربِ مئةٍ" options={['٣٠٠', '٤٠٠', '٣٢٠']} answer="٣٠٠" award />
            <MCQ q="٥ × ٤٠ = ؟" options={['٢٠', '٢٠٠', '٢٠٠٠']} answer="٢٠٠" award />
          </Grid>
        </>
      ),
    },
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند السؤال واسأل: هل نحتاج العدد بالضبط؟ إلى أي عدد نقرّب ٣٤؟'),
    {
      sec: 'explore', min: 4,
      notes: 'مثال جديد غير القصة: ٥٨ × ٤. ٥٨ أقرب إلى ٦٠، فالناتج نحو ٦٠ × ٤ = ٢٤٠. غيّر العدد واسأل: متى نقرّب إلى العشرة الأصغر؟',
      content: (
        <>
          <SlideHead tag="نُجَرِّبُ مِثَالًا آخَرَ" kind="ex">نُقَرِّبُ ثُمَّ نَضْرِبُ</SlideHead>
          <RoundExplorer start={58} times={4} />
        </>
      ),
    },
    {
      sec: 'explore', min: 2,
      notes: 'هل نحتاج العدد الدقيق؟ كلمة «التقريبي» هي المفتاح.',
      content: (
        <>
          <SlideHead tag="اسْتَعِدَّ، ص ١٤٧" kind="qs">المسابقةُ الثقافيةُ</SlideHead>
          <QText>شاركتْ ٢٦ مدرسةً في مسابقةٍ ثقافيةٍ تعقدُها إدارةُ التعليمِ، إذا كانتْ كلُّ مدرسةٍ قدْ أرسلتْ ٦ طلابٍ للمشاركةِ، فما العددُ التَّقريبيُّ للطُّلَّابِ الَّذينَ شاركُوا في هذهِ المُسابقةِ؟</QText>
          <Definition kind="rule">يمكنُكَ استعمالُ التَّقديرِ عندمَا لا تحتاجُ إلى إجابةٍ دقيقةٍ.</Definition>
        </>
      ),
    },
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: ٢٦ أقرب إلى ٣٠ من ٢٠.',
      content: (
        <>
          <SlideHead tag="مثال ١، من واقع الحياة، ص ١٤٧" kind="ex">التقديرُ باستعمالِ التَّقريبِ</SlideHead>
          <Card kind="rule" cap="تذكَّرْ">عندَ تقريبِ نواتجِ الضربِ قرِّبِ العاملَ عندما يكونُ أكبرَ منْ ١٠</Card>
          <QCol>
            <QText><BookLabel>مَدرَسةٌ:</BookLabel> ما العددُ التَّقريبيُّ للطُّلَّابِ الَّذينَ شاركُوا في المُسابقةِ الثَّقافيَّةِ؟</QText>
            <Ctrls><NextButton /></Ctrls>
            <Solution>
              <Step>نُقَرِّبُ ٢٦ إِلَى أَقْرَبِ عَشَرَةٍ: ٣٠</Step>
              <Step><Eq>٦ × ٣٠ = ١٨٠</Eq></Step>
              <Step kind="ans" label="عَدَدُ الطُّلَّابِ">١٨٠ طَالِبًا تَقْرِيبًا</Step>
            </Solution>
          </QCol>
        </>
      ),
    },
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: ١٠٤ أقرب إلى ١٠٠.',
      content: (
        <>
          <SlideHead tag="مثال ٢، ص ١٤٧" kind="ex">التقريبُ إلى أقربِ مئةٍ</SlideHead>
          <QCol>
            <QText><BookLabel>حفلٌ مَدرسيٌّ:</BookLabel> في إحدَى المدارسِ ١٠٤ طلابٍ، ولكلِّ طالبٍ الحقُّ في أنْ يدعُوَ ٣ مِن أقربائِهِ للحفلِ المَدرسيِّ. قدِّرْ عددَ المدعوِّينَ؟</QText>
            <Ctrls><NextButton /></Ctrls>
            <Solution>
              <Step>نُقَرِّبُ ١٠٤ إِلَى أَقْرَبِ مِئَةٍ: ١٠٠</Step>
              <Step><Eq>٣ × ١٠٠ = ٣٠٠</Eq></Step>
              <Step kind="ans" label="عَدَدُ الْمَدْعُوِّينَ">٣٠٠ شَخْصٍ تَقْرِيبًا</Step>
            </Solution>
          </QCol>
        </>
      ),
    },
    {
      sec: 'explain', min: 3,
      notes: 'قرّبنا إلى قيمة أكبر، فالتقدير أكبر من الدقيق.',
      content: (
        <>
          <SlideHead tag="مثال ٣، ص ١٤٨" kind="ex">تقديرُ النواتجِ الكبيرةِ</SlideHead>
          <Cols>
            <QCol>
              <QText>قدِّرْ ناتجَ ٨ × ١٩٩٣.</QText>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>نُقَرِّبُ ١٩٩٣ إِلَى أَقْرَبِ أَلْفٍ: ٢٠٠٠</Step>
                <Step><Eq>٨ × ٢٠٠٠ = ١٦٠٠٠</Eq></Step>
                <Step kind="ans" label="التَّقْدِيرُ">١٦٠٠٠</Step>
              </Solution>
            </QCol>
            <Card kind="rule" cap="تذكَّرْ">عندما تُقرِّبُ إلى قيمةٍ أعلَى فإنَّ تقديرَ الضربِ يكونُ أكبرَ منَ الإجابةِ الدقيقةِ. وعندما تُقرِّبُ إلى قيمةٍ أقلَّ فإنَّ تقديرَ ناتجِ الضربِ يكونُ أقلَّ منَ الإجابةِ الدقيقةِ.</Card>
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: ٧ × ٣٨ (مثال غير أمثلة الكتاب).',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },
    {
      sec: 'elab', min: 3,
      notes: 'نعمل معًا: التقريب أولًا ثم الضرب.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">قدِّرْ</SlideHead>
          <Grid cols={3}>
            <MCQ q="قدِّرْ ٤ × ٦٨" options={['٢٤٠', '٢٨٠', '٣٢٠']} answer="٢٨٠" award />
            <MCQ q="قدِّرْ ٣ × ٢١٠" options={['٦٠٠', '٩٠٠', '٦٣٠']} answer="٦٠٠" award />
            <MCQ q="قرَّبْنا ٦٨ إلى ٧٠. فالتقديرُ:" options={['أكبر', 'أقل']} answer="أكبر" award />
          </Grid>
        </>
      ),
    },
    trapSlide(
      [
      { q: '٢٣ × ٤', a: '٨٠' },
      { q: '٢٧ × ٤', a: '١٢٠' },
      { q: '٢٧ × ٦', a: '١٨٠' },
      { q: '٤٧٣ × ٦', a: '٣٠٠٠' },
      { q: '٢٥ × ٤', a: '١٢٠', trap: true },
      ],
      'نقرّب العامل الأكبر ثم نضرب. الأخير فخ: ٢٥ في المنتصف، فنقرّبها إلى ٣٠ لا إلى ٢٠.', '≈',
    ),
    {
      sec: 'check', min: 3,
      notes: 'نقرّب إلى أكبر قيمة مكانية: إذا زدنا فالتقدير أكبر.',
      content: (
        <QuestionGroup source={CHECK} instruction={ESTC} cols={3} time={120}>
          <Est n={1} a={449} b={5} e="٢٠٠٠" big={false} />
          <Est n={2} a={47} b={4} e="٢٠٠" big />
          <Est n={3} a={3293} b={4} e="١٢٠٠٠" big={false} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 3,
      notes: '٨٧٠ إلى ٩٠٠ و٥٥٠٠ إلى ٦٠٠٠ و٧٤٢٠ إلى ٧٠٠٠.',
      content: (
        <QuestionGroup source={CHECK} instruction={ESTC} cols={3} time={120}>
          <Est n={4} a={870} b={9} e="٨١٠٠" big />
          <Est n={5} a={5500} b={6} e="٣٦٠٠٠" big />
          <Est n={6} a={7420} b={9} e="٦٣٠٠٠" big={false} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'التقدير ٨٠٠٠ والدقيق ٩٠٠٠، وكلاهما أقل من ٩٨٣٠.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} time={60}
          question="قرَّرَ عليٌّ وعائلتُه أنْ يوفِّرُوا ١١٢٥ ريالًا شهريًّا مدَّةَ ٨ أشهرٍ. إذا كانَتْ تكاليفُ الرِّحلةِ إلى مصايفِ عسيرٍ تبلغُ ٩٨٣٠ ريالًا، فهلْ ما سيوفِّرونَه يغطِّي تكاليفَ الرِّحلةِ؟ اِشْرَحْ ذلكَ."
          hint="قرّب ١١٢٥ ثم اضرب."
          steps={[
            { text: <Eq>٨ × ١٠٠٠ = ٨٠٠٠</Eq> },
            { text: <>الدقيقُ: <Eq>٨ × ١١٢٥ = ٩٠٠٠</Eq></> },
            { label: 'الْإِجَابَةُ', text: 'لَا، لَا يُغَطِّي التَّكَالِيفَ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'تحدّث: ١٤٩٩ قريب من ١٥٠٠ لا من ١٠٠٠.',
      content: (
        <QuestionSlide
          source={CHECK} n={8} tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]}
          question="اِفْتَرِضْ أنَّ عائلةَ عليٍّ ستوفِّرُ مبلغَ ١٤٩٩ ريالًا في كلِّ شهرٍ مدَّةَ ٨ أشهرٍ. لماذَا يُعطِي التَّقريبُ إلى أقربِ ألفٍ مؤشِّرًا خاطئًا عنْ مبلغِ التَّوفيرِ؟"
          hint="إلى أي ألف يتقرّب ١٤٩٩؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: '١٤٩٩ يَتَقَرَّبُ إِلَى ١٠٠٠، وَهُوَ أَقْرَبُ إِلَى ١٥٠٠', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    ...[
      [[9, 32, 5, '١٥٠', false], [10, 562, 6, '٣٦٠٠', true], [11, 729, 8, '٥٦٠٠', false]],
      [[12, 949, 4, '٣٦٠٠', false], [13, 28, 5, '١٥٠', true], [14, 647, 8, '٤٨٠٠', false]],
      [[15, 355, 5, '٢٠٠٠', true], [16, 450, 7, '٣٥٠٠', true], [17, 3500, 9, '٣٦٠٠٠', true]],
      [[18, 8816, 6, '٥٤٠٠٠', true], [19, 9498, 9, '٨١٠٠٠', false], [20, 9310, 7, '٦٣٠٠٠', false]],
    ].map((row) => ({
      sec: 'practice' as const, min: 3,
      notes: 'نقرّب ثم نضرب، ونسأل: قرّبنا إلى أعلى أم أقل؟',
      content: (
        <QuestionGroup source={PRACTICE} instruction={ESTP} cols={3} time={120}>
          {(row as [number, number, number, string, boolean][]).map(([n, a, b, e, big]) => <Est key={n} n={n} a={a} b={b} e={e} big={big} />)}
        </QuestionGroup>
      ),
    })),
    {
      sec: 'practice', min: 2,
      notes: 'نقرّب ٢٤ إلى ٢٠.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={21} time={60}
          question="في كلِّ فصلٍ منْ فصولِ مدرسةِ حسَّانَ بنِ ثابتٍ الابتدائيَّةِ ٢٤ طالبًا. كمْ يبلغُ عددُ طلَّابِ المدرسةِ تقريبًا، إذَا كانَ عددُ فُصولِ المدرسةِ ٨ فصولٍ؟"
          hint="إلى أي عشرة يتقرّب ٢٤؟"
          steps={[
            { text: 'نُقَرِّبُ ٢٤ إِلَى أَقْرَبِ عَشَرَةٍ: ٢٠' },
            { text: <Eq>٨ × ٢٠ = ١٦٠</Eq> },
            { label: 'عَدَدُ الطُّلَّابِ', text: '١٦٠ طَالِبًا تَقْرِيبًا', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرّب ١٥٨ إلى ٢٠٠.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={22} time={60}
          question="تبلغُ المسافةُ بينَ مدينتي مكَّةَ وجدَّةَ ذهابًا وإيابًا ١٥٨ كيلومترًا، إذَا كانَ فهدٌ يقطعُ هذهِ المسافةَ ٦ مرَّاتٍ في الأسبوعِ، فكمْ كيلومترًا تقريبًا يكونُ مجموعُ المسافاتِ التي يقطعُها فهدٌ في الأسبوعِ؟"
          hint="إلى أي مئة يتقرّب ١٥٨؟"
          steps={[
            { text: 'نُقَرِّبُ ١٥٨ إِلَى أَقْرَبِ مِئَةٍ: ٢٠٠' },
            { text: <Eq>٦ × ٢٠٠ = ١٢٠٠</Eq> },
            { label: 'الْمَسَافَةُ', text: '١٢٠٠ كِيلُومِتْرٍ تَقْرِيبًا', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: '٢ × ٥١٥٠ = ١٠٣٠٠: الدبدوب ١٠٠٠٠.',
      content: (
        <QuestionSlide
          source={REAL} n={23} time={60} intro={FUN}
          question="ذهبت نوف مرَّتينِ، وحصلَتْ على ٥١٥٠ نقطةً في كلِّ مرَّةٍ. مَا أكبرُ جائزةٍ يمكنُها أنْ تحصلَ عليْهَا؟"
          hint="كم نقطة جمعت تقريبًا؟"
          steps={[
            { text: 'نُقَرِّبُ ٥١٥٠ إِلَى أَقْرَبِ أَلْفٍ: ٥٠٠٠' },
            { text: <Eq>٢ × ٥٠٠٠ = ١٠٠٠٠</Eq> },
            { label: 'أَكْبَرُ جَائِزَةٍ', text: 'الدُّبْدُوبُ', kind: 'ans' },
          ]}
          chart={PRIZES}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: '٥ × ٢٠٠٠ = ١٠٠٠٠.',
      content: (
        <QuestionSlide
          source={REAL} n={24} time={45}
          question="كمْ لعبةَ سيَّارةٍ يمكنُ أنْ تحصلَ عليْهَا نوف بالنِّقَاطِ الَّتي جمعَتها؟"
          hint="كم مرة تدخل ٢٠٠٠ في ١٠٠٠٠؟"
          steps={[
            { text: <Eq>٥ × ٢٠٠٠ = ١٠٠٠٠</Eq> },
            { label: 'عَدَدُ السَّيَّارَاتِ', text: '٥ سَيَّارَاتٍ', kind: 'ans' },
          ]}
          chart={PRIZES}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: '٧ × ٩٠٠٠ = ٦٣٠٠٠: الغوريلا والدبدوب معًا ٦٠٠٠٠.',
      content: (
        <QuestionSlide
          source={REAL} n={25} time={60}
          question="إذا ذهبتْ سميرة ٧ مرَّاتٍ إلى مدينةِ الألعابِ، وجمعَتْ فِي كلِّ مرَّةٍ ٩٠٥٠ نقطةً، فما أكبرُ جائزتينِ يمكنُها الحصولُ عليها؟"
          hint="كم نقطة جمعت تقريبًا؟"
          steps={[
            { text: 'نُقَرِّبُ ٩٠٥٠ إِلَى أَقْرَبِ أَلْفٍ: ٩٠٠٠' },
            { text: <Eq>٧ × ٩٠٠٠ = ٦٣٠٠٠</Eq> },
            { text: <Eq>٥٠٠٠٠ + ١٠٠٠٠ = ٦٠٠٠٠</Eq> },
            { label: 'الْجَائِزَتَانِ', text: 'الْغُورِيلَا وَالدُّبْدُوبُ', kind: 'ans' },
          ]}
          chart={PRIZES}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'الحس العددي: اتجاه التقريب يحدد الجواب.',
      content: (
        <QuestionSlide
          source={HOT} n={26} tags={[{ kind: 'warn', text: 'الحسُّ العدديُّ' }]}
          question="اِشْرَحْ كيفَ يُمكنكَ أنْ تعرفَ إذَا كانَ تقديرُكَ أكبرَ أمْ أقلَّ مِنَ الإجابةِ الدقيقةِ لمسألةِ ضَرْبٍ."
          hint="هل قرّبت إلى أعلى أم إلى أقل؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'أَكْبَرُ إِذَا قَرَّبْتُ إِلَى عَدَدٍ أَكْبَرَ، وَأَقَلُّ إِذَا قَرَّبْتُ إِلَى عَدَدٍ أَصْغَرَ', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'أكتب: الدقيق ٧٥٦ قريب من ٨٠٠.',
      content: (
        <QuestionSlide
          source={HOT} n={27} tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="كيفَ يمكنُ استعمالُ التَّقريبِ للتَّأكُّدِ مِن معقوليةِ الإجابةِ الدقيقةِ لحاصلِ ضربِ ٤ × ١٨٩؟"
          hint="قرّب ١٨٩ إلى أقرب مئة."
          steps={[
            { text: 'نُقَرِّبُ ١٨٩ إِلَى أَقْرَبِ مِئَةٍ: ٢٠٠' },
            { text: <Eq>٤ × ٢٠٠ = ٨٠٠</Eq> },
            { label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: '٨٠٠ قَرِيبٌ مِنْ ٧٥٦، فَالْإِجَابَةُ مَعْقُولَةٌ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٥-٢ والدرس ٥-٤.',
      content: (
        <QuestionGroup source={TEST} cols={2} time={60}>
          <QCard n={28}>
            <MCQ q="أيُّ أزواجِ الأعدادِ الآتيةِ هوَ الأنسبُ لإكمالِ جملةِ الضربِ التاليةِ: ● × ١٠٠ = ● ؟ (الدرس ٥-٢)" options={['أ) ٧٣، ٧٣٠', 'ب) ٧٣، ٧٣٠٠٠', 'جـ) ٧٣٠، ٧٠٣٠', 'د) ٧٣، ٧٣٠٠']} answer="د) ٧٣، ٧٣٠٠" />
          </QCard>
          <QCard n={29}>
            <MCQ q="قدِّرْ ناتجَ ضربِ ٦٤٩ × ٧: (الدرس ٥-٤)" options={['أ) ٤٢٠٠', 'ب) ٤٩٠٠', 'جـ) ٤٥٥٠', 'د) ٤٤٨٠']} answer="أ) ٤٢٠٠" />
          </QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'مهارة سابقة: الصيغة القياسية.',
      content: (
        <QuestionSlide
          source={REVIEW} n={30} time={45}
          question="اكتبِ الصيغةَ القياسيةَ للعددِ ثلاثةِ ملايينَ وخمسِ مائةٍ وسبعٍ وأربعينَ ألفًا وواحدٍ. (مهارة سابقة)"
          hint="كم خانة في الملايين؟"
          steps={[{ label: 'الصِّيغَةُ الْقِيَاسِيَّةُ', text: '٣٥٤٧٠٠١', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مهارة سابقة: نقرّب ثم نطرح.',
      content: (
        <QuestionSlide
          source={REVIEW} n={31} time={60}
          question="تبلغُ مساحةُ دولةِ الكويتِ ١٧٨٢٠ كيلومترًا مربعًا، وتبلغُ مساحةُ دولةِ لبنانَ ١٠٤٥٢ كيلومترًا مربعًا. قدِّرِ الفرقَ بينَ مساحتَي هاتينِ الدولتينِ بالتقريبِ إلى أقربِ ألفٍ. (مهارة سابقة)"
          hint="قرّب كل مساحة إلى أقرب ألف."
          steps={[
            { text: 'نُقَرِّبُ ١٧٨٢٠ إِلَى ١٨٠٠٠' },
            { text: 'وَنُقَرِّبُ ١٠٤٥٢ إِلَى ١٠٠٠٠' },
            { text: <Eq>١٨٠٠٠ − ١٠٠٠٠ = ٨٠٠٠</Eq> },
            { label: 'الْفَرْقُ', text: '٨٠٠٠ كِيلُومِتْرٍ مُرَبَّعٍ تَقْرِيبًا', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'الجملة بالكلمات.',
      content: (
        <QuestionSlide
          source={REVIEW} n={32} time={30}
          question="مثِّلِ الجملةَ العدديةَ ٣ + ٩ = ١٢ بالكلماتِ."
          hint="كيف نقرأ + و=؟"
          steps={[{ label: 'بِالْكَلِمَاتِ', text: 'ثَلَاثَةٌ زَائِدُ تِسْعَةٍ يُسَاوِي اثْنَيْ عَشَرَ', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٥-٢.',
      content: (
        <QuestionGroup source={REVIEW} instruction="أوجدْ ناتجَ الضربِ مستعملًا الحسابَ الذهنيَّ: (الدرس ٥-٢)" time={60}>
          <One n={33} a={3} b={40} />
          <One n={34} a={4} b={800} />
          <One n={35} a={9} b={600} />
          <One n={36} a={7} b={9000} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب إكمال كل فرع شفهيًا قبل أن تشير إليه.',
      content: (
        <>
          <SlideHead tag="أهمّ الأفكار" kind="rule">ملخص الدرس</SlideHead>
          <MindMap
            center={<>تقدير<br />نواتج الضرب</>}
            items={[
              { kind: 'rule', cap: 'أولًا', text: 'أقرّب العامل الأكبر من ١٠' },
              { kind: 'ex', cap: 'ثانيًا', text: 'أضرب ذهنيًّا' },
              { kind: 'qs', cap: 'أكبر', text: 'إذا قرّبت إلى قيمة أعلى' },
              { kind: 'warn', cap: 'أقل', text: 'إذا قرّبت إلى قيمة أقل' },
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
            <MCQ q="قدِّرْ ٣ × ٤٩" options={['١٢٠', '١٥٠', '١٨٠']} answer="١٥٠" />
            <MCQ q="قدِّرْ ٦ × ٣١٠" options={['١٨٠٠', '٢٤٠٠', '١٨٦٠']} answer="١٨٠٠" />
            <MCQ q="قدَّرْنا ٤ × ٢٨٣ بـ ٤ × ٣٠٠. التقديرُ:" options={['أكبر من الدقيق', 'أقل من الدقيق']} answer="أكبر من الدقيق" />
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
