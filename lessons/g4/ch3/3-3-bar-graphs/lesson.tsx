import { useState } from 'react';
import {
  Card, Chart, Cols, Ctrls, DragChart, Eq, GoHomeButton, HBars, IfTeams, MCQ, Mark, MindMap, NextButton, QCol, QuestionSlide, SlideHead,
  Solution, Stack, Step, Winner, defineChart, defineLesson, num,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- البيانات ---------- */

/** استعد ومثال ١ (ص ٨٤): كما في درس ٣-٤ */
const heights = defineChart({
  mode: 'bars',
  title: 'أطوالُ طلّابِ الصّفِّ الرّابعِ',
  labels: ['١٣٠', '١٣٥', '١٤٠', '١٤٥', '١٥٠', '١٥٥', '١٦٠'],
  values: [2, 0, 3, 7, 5, 0, 3],
  min: 0, max: 10, grid: 1, lab: 1,
  yTitle: 'عددُ الطلّابِ', xTitle: 'الطّولُ بالسّنتمترات',
});

/** تدرّب ٧–١٠ (ص ٨٥) */
const contest = defineChart({
  mode: 'bars',
  title: 'مسابقةُ الرياضياتِ',
  labels: ['سمَر', 'هُدى', 'هيا', 'رهف', 'مشاعل', 'منى', 'ريم'],
  values: [80, 60, 140, 60, 100, 100, 60],
  min: 0, max: 160, grid: 20, lab: 20,
  yTitle: 'الدرجاتُ', xTitle: 'الطالبةُ', xfs: 20,
});

/** تأكّد ١–٦ (ص ٨٥): القيم مقروءة من الرسم (أطراف الأعمدة على خطوط الشبكة) */
const TITLES = { title: 'البطولاتُ الرياضيةُ للصفوفِ', labels: ['السادسُ', 'الخامسُ', 'الرابعُ', 'الثالثُ'], values: [6, 8, 3, 5], max: 12, grid: 1, lab: 2, xTitle: 'عددُ البطولاتِ', yTitle: 'الصفُّ' };
const Titles = () => (
  <div className="chart">
    <HBars {...TITLES} />
  </div>
);

const CHECK = 'تأكَّدْ · ص ٨٥';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ · ص ٨٥';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ٨٥';

/** مستكشف: الطلاب يحرّكون الأعمدة، والجملة تصف الأكثر والأقل */
const sports = defineChart({
  mode: 'bars',
  title: 'الرياضةُ المفضَّلةُ في صفِّنا',
  labels: ['القدم', 'السلة', 'السباحة', 'الجري'],
  values: [8, 5, 4, 3],
  min: 0, max: 12, grid: 1, lab: 2,
  yTitle: 'عددُ الطلّابِ', xTitle: 'الرياضةُ',
});
function BarExplorer() {
  const [v, setV] = useState<(number | null)[]>(sports.values.slice());
  const vals = v.map((x) => x ?? 0);
  const hi = Math.max(...vals);
  const lo = Math.min(...vals);
  const names = (t: number) => sports.labels.filter((_, i) => vals[i] === t).join(' و');
  return (
    <Cols style={{ gridTemplateColumns: '1fr 1.1fr', alignItems: 'center' }}>
      <Stack>
        <Card kind="ex" cap="الأكثر">
          {names(hi)} ({num(hi)})
        </Card>
        <Card kind="qs" cap="الأقل">
          {names(lo)} ({num(lo)})
        </Card>
        <Card kind="rule" cap="الفرق بين الأكثر والأقل">
          <Eq>
            {num(hi)} − {num(lo)} = {num(hi - lo)}
          </Eq>
        </Card>
      </Stack>
      <DragChart spec={sports} values={v} onChange={setV} editable={[0, 1, 2, 3]} snap={1} />
    </Cols>
  );
}

export default defineLesson({
  meta: {
    id: 'g4-3-3-bar-graphs',
    code: '٣-٣',
    title: 'التَّمثيلُ بالأعمدةِ',
    shortTitle: 'التمثيل بالأعمدة',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الثالث: تنظيم البيانات وعرضها وتفسيرها',
    source: 'الجزء الأول · ص ٨٤–٨٥',
    minutes: 45,
    idea: 'أُفسِّرُ التَّمثِيلَ بالأعمدة.',
    bookQuestions: 13,
  },
  sectionDesc: {
    engage: 'ربط بالدرس السابق · أطوال الطلاب',
    explore: 'اسحب الأعمدة',
    explain: 'القاعدة · مثال ١',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٦',
    practice: 'الأسئلة ٧–١٠',
    hot: 'الأسئلة ١١–١٣',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردة. اسأل: أين رأيتم أعمدة تقارن بين أشياء؟',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أُفسِّرُ التَّمثِيلَ بالأعمدة.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>التَّمثيلُ بالأعمدةِ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أقرأ قيمة عمود من التمثيل.</li>
                <li>أحدد الأكثر والأقل.</li>
                <li>أحسب الفرق والمجموع من التمثيل.</li>
                <li>أكتب جملة تصف البيانات.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },


    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'start', min: 1,
      notes: 'مقطع قصير (أقل من دقيقة) لا يبدأ إلا عندما تضغط تشغيل. أوقفه بعد ظهور الأعمدة واسأل: أيّ رياضة هي الأكثر؟ كيف عرفت دون أن تقرأ الأعداد؟ يمكن تشغيله وإيقافه من الجوال.',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 3,
      notes: 'ربط بالدرس ٣-١: من الجدول التكراري إلى الأعمدة. ثم «استعد» من الكتاب: ما الطول الأكثر تكرارًا؟',
      content: (
        <>
          <SlideHead tag="اسْتَعِدَّ · ص ٨٤" kind="qs">أطوال طلاب الصف الرابع</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">قاسَ طُلَّابُ الصَّفِّ الرَّابعِ أطوالَهُمْ، وَكانتْ كَمَا هيَ مُبيَّنةٌ في التَّمثِيلِ المُجاورِ. مَا الطُّولُ الأكثرُ تكرارًا؟</p>
              <MCQ q="ما الطول الأكثر تكرارًا؟" options={['١٤٠ سم', '١٤٥ سم', '١٥٠ سم']} answer="١٤٥ سم" award />
              <Card kind="qs" cap="سؤال للتفكير">كيف عرفت بسرعة دون أن تقرأ كل الأعداد؟</Card>
            </QCol>
            <Chart spec={heights} />
          </Cols>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'مسح سريع: كم طالبًا يفضّل كل رياضة؟ ادعُ طالبًا يسحب أعلى كل عمود إلى العدد الصحيح، وراقبوا بطاقات الأكثر والأقل.',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">الرياضة المفضّلة في صفّنا</SlideHead>
          <p style={{ fontSize: '.82em', fontWeight: 700, margin: 0 }}>اسحب أعلى كل عمود إلى عدد الطلاب الذين يفضّلون تلك الرياضة.</p>
          <BarExplorer />
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ القاعدة من الكتاب. أشر: كل عمود فئة، وطوله قيمتها.',
      content: (
        <>
          <SlideHead tag="القاعدة · ص ٨٤" kind="rule">ما التمثيل بالأعمدة؟</SlideHead>
          <Card kind="rule" style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.85 }}>
            يُستعملُ <Mark>التَّمثيلُ بالأعمدةِ</Mark> للمقارنَةِ بينَ البياناتِ باستعمالِ أعمدةٍ ذاتِ أطوالٍ مختلفةٍ لتمثيلِ القيَمِ المُعْطَاة. يُمكنُكَ تفسيرُ البياناتِ المُمَثَّلةِ بالأعمدةِ.
          </Card>
          <Cols even>
            <Card kind="ex" cap="العمود الأطول">القيمة الأكبر.</Card>
            <Card kind="ex" cap="العمود الأقصر">القيمة الأصغر.</Card>
            <Card kind="ex" cap="أقرأ القيمة">من أعلى العمود أتحرك أفقيًّا إلى المحور.</Card>
          </Cols>
        </>
      ),
    },

    /* ================= مثال ١ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: أشر إلى العمود الأطول، ثم تحرك إلى المحور الرأسي (٧ طلاب)، ثم إلى الأسفل (١٤٥).',
      content: (
        <>
          <SlideHead tag="مثالٌ من واقعِ الحياةِ · ص ٨٤" kind="ex">تفسير التمثيل بالأعمدة</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">
                <b style={{ color: 'var(--ex)' }}>القِياسُ:</b> ما الطُّولُ الأكثرُ تكرارًا؟
              </p>
              <Ctrls>
                <NextButton />
              </Ctrls>
              <Solution>
                <Step hl={['p3']}>يُمثِّلُ العمودُ الأطولُ الطُّولَ الأكثرَ تكرارًا.</Step>
                <Step hl={['h3', 'v3']}>عدد الطلاب: ٧</Step>
                <Step hl={['g3', 'x3']}>والطول تحت العمود: ١٤٥</Step>
                <Step kind="ans">لِذَا فإنَّ الطُّولَ الأكثرَ تكرارًا هوَ: ١٤٥ سنتمترًا.</Step>
              </Solution>
            </QCol>
            <Chart spec={heights} />
          </Cols>
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 4,
      notes: 'نعمل معًا على تمثيل الأطوال نفسه. اختر طالبًا بالعجلة يشير إلى العمود قبل أن يختار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أقرأ التمثيل</SlideHead>
          <Cols>
            <QCol style={{ gap: '.3em' }}>
              <MCQ q="أ) كم طالبًا طوله ١٥٠ سم؟" options={['٣', '٥', '٧']} answer="٥" award />
              <MCQ q="ب) ما الطولان اللذان لم يسجّلهما أي طالب؟" options={['١٣٥ و١٥٥', '١٣٠ و١٦٠', '١٤٠ و١٥٠']} answer="١٣٥ و١٥٥" award />
              <MCQ q="ج) كم طالبًا قاس طوله؟" options={['١٥', '٢٠', '٢٥']} answer="٢٠" award />
            </QCol>
            <Chart spec={heights} />
          </Cols>
        </>
      ),
    },

    /* ================= تأكد ١–٦ ================= */
    {
      sec: 'check', min: 1,
      notes: 'أطول عمود أفقي = أكبر عدد.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={30}
          intro="استعملِ التَّمثيلَ بالأعمدةِ المجاورَ للإجابةِ عنِ الأسئلةِ منْ ١ إلَى ٦:"
          question="ما الصَّفُّ الذي حصلَ علَى أكبرِ عددٍ منَ البطولاتِ؟"
          hint="ابحث عن أطول عمود."
          steps={[
            { text: 'أطول عمود: الصفّ الخامس.', hl: ['p1'] },
            { text: 'أتحرك إلى الأسفل: ٨ بطولات.', hl: ['g1', 'v1'] },
            { text: 'الصَّفُّ الخامسُ (٨ بطولات).', kind: 'ans' },
          ]}
          chart={<Titles />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'ابدأ من ٣ على المحور الأفقي، وابحث عن العمود الذي ينتهي عنده.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} time={30}
          question="ما الصَّفُّ الذي حصَلَ علَى ٣ بطولاتٍ؟"
          hint="العدد ٣ بين ٢ و٤ على المحور الأفقي."
          steps={[
            { text: 'العمود الذي ينتهي عند ٣:', hl: ['g2', 'v2'] },
            { text: 'الصَّفُّ الرَّابعُ', hl: ['p2'], kind: 'ans' },
          ]}
          chart={<Titles />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: '«كم تزيد» = طرح.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} time={60}
          question="كمْ تزيدُ بطولاتُ الصَّفِّ الخامسِ على الصَّفِّ السادسِ؟"
          hint="اقرأ العددين، ثم اطرح."
          steps={[
            { text: 'الخامسُ: ٨', hl: ['p1', 'v1'] },
            { text: 'السادسُ: ٦', hl: ['p0', 'v0'] },
            { text: <Eq>٨ − ٦ = ٢</Eq> },
            { text: 'بطولتان', kind: 'ans' },
          ]}
          chart={<Titles />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: '«معًا» = جمع.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} time={60}
          question="كمْ بطولةً حصلَ عليهَا الصَّفانِ (الثالثُ والرابعُ معًا)؟"
          hint="اقرأ العددين، ثم اجمع."
          steps={[
            { text: 'الثالثُ: ٥', hl: ['p3', 'v3'] },
            { text: 'الرابعُ: ٣', hl: ['p2', 'v2'] },
            { text: <Eq>٥ + ٣ = ٨</Eq> },
            { text: '٨ بطولاتٍ', kind: 'ans' },
          ]}
          chart={<Titles />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اقبل أي جملة صحيحة. ركّز على كلمات المقارنة: أكثر، أقل، يساوي.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} time={60}
          question="أكْتُبْ جملةً تصفُ البياناتِ في هذَا التمثيلِ."
          hint="قارن بين الصفوف: من الأكثر؟ ومن الأقل؟"
          steps={[
            { text: 'الصف الخامس حصل على أكبر عدد من البطولات (٨).', hl: ['p1', 'v1'] },
            { text: 'والصف الرابع حصل على أقل عدد (٣).', hl: ['p2', 'v2'] },
            { text: 'مثال: حصل الصف الخامس على أكثر البطولات، وحصل الصف الرابع على أقلها.', kind: 'ans' },
          ]}
          chart={<Titles />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'تحدث: اطلب من طالبين وصف طريقتهما: أقرأ، ثم أجمع.',
      content: (
        <QuestionSlide
          source={CHECK} n={6} tags={[{ kind: 'warn', text: 'تحدَّثْ' }]}
          question="كيفَ أجبْتَ عَنِ السُّؤَالِ الرَّابعِ ؟"
          hint="ابدأ بـ: «قرأتُ…ثم…»."
          steps={[
            { text: 'قرأتُ عدد بطولات الصف الثالث من نهاية عموده: ٥', hl: ['p3', 'g3', 'v3'] },
            { text: 'وقرأتُ عدد بطولات الصف الرابع: ٣', hl: ['p2', 'g2', 'v2'] },
            { text: 'ثم جمعتُ العددين: ٥ + ٣ = ٨ بطولات.', kind: 'ans' },
          ]}
          chart={<Titles />}
        />
      ),
    },

    /* ================= تدرب ٧–١٠ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'الأعمدة المتساوية في الطول = الدرجة نفسها. في التمثيل مجموعتان.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={7} time={45}
          intro="يُبَيِّنُ التَّمثيلُ المجاورُ درجاتِ سبعةٍ منَ الطالباتِ في مسابقةِ الرِّيَاضِيَّاتِ:"
          question="مَنِ الطالباتِ اللَّاتي حصلْنَ علَى الدرجةِ نفسِها؟"
          hint="ابحث عن أعمدة متساوية في الطول."
          steps={[
            { text: 'هُدى ورهف وريم: ٦٠ درجة لكل منهن.', hl: ['p1', 'p3', 'p6', 'v1', 'v3', 'v6'] },
            { text: 'مشاعل ومنى: ١٠٠ درجة لكل منهما.', hl: ['p4', 'p5', 'v4', 'v5'] },
            { text: 'هُدى ورهف وريم (٦٠)، ومشاعل ومنى (١٠٠).', kind: 'ans' },
          ]}
          chart={<Chart spec={contest} />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: '«كم تزيد» = طرح.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={8} time={45}
          question="كمْ تزيدُ درجةُ هَيَا علَى درجةِ سَمَرَ؟"
          hint="اقرأ الدرجتين، ثم اطرح الأصغر من الأكبر."
          steps={[
            { text: 'هيا: ١٤٠', hl: ['p2', 'h2', 'v2'] },
            { text: 'سمر: ٨٠', hl: ['p0', 'h0', 'v0'] },
            { text: <Eq>١٤٠ − ٨٠ = ٦٠</Eq> },
            { text: '٦٠ درجةً', kind: 'ans' },
          ]}
          chart={<Chart spec={contest} />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: '«كم تنقص» = طرح أيضًا.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={9} time={45}
          question="كمْ تنقصُ درجةُ ريمَ عنْ درجةِ مشاعلَ؟"
          hint="اقرأ الدرجتين، ثم اطرح."
          steps={[
            { text: 'مشاعل: ١٠٠', hl: ['p4', 'h4', 'v4'] },
            { text: 'ريم: ٦٠', hl: ['p6', 'h6', 'v6'] },
            { text: <Eq>١٠٠ − ٦٠ = ٤٠</Eq> },
            { text: '٤٠ درجةً', kind: 'ans' },
          ]}
          chart={<Chart spec={contest} />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'خمّن ثم تحقق: ابدأ بأعلى درجة ١٤٠، كم تحتاج لتصل ٢٢٠؟ (٨٠ = سمر).',
      content: (
        <QuestionSlide
          source={PRACTICE} n={10} time={90}
          question="مَنِ الطالبتانِ اللتانِ مجموعُ درجاتِهِمَا يساوي ٢٢٠ درجةً؟ وضحْ كيفَ وجدتَ الإجابةَ."
          hint="ابدأ بأعلى درجة: ٢٢٠ − ١٤٠ = ؟"
          steps={[
            { text: 'أعلى درجة: هيا ١٤٠', hl: ['p2', 'v2'] },
            { text: <Eq>٢٢٠ − ١٤٠ = ٨٠</Eq> },
            { text: 'الدرجة ٨٠ لسمر', hl: ['p0', 'v0'] },
            { text: 'هيا وسمر: ١٤٠ + ٨٠ = ٢٢٠', kind: 'ans' },
          ]}
          chart={<Chart spec={contest} />}
        />
      ),
    },

    /* ================= مهارات التفكير العليا ١١–١٣ ================= */
    {
      sec: 'hot', min: 2,
      notes: 'مسألة مفتوحة: اقبل كل مثال من الحياة (نشرة أخبار، تطبيق، لوحة في المدرسة).',
      content: (
        <QuestionSlide
          source={HOT} n={11} tps
          question={
            <>
              <b style={{ color: 'var(--ex)' }}>مَسْأَلَةٌ مَفْتُوحَةٌ:</b> هلْ شاهدْتَ تمثيلًا بالأعمدةِ خارجَ غُرفةِ الصَّفِّ؟ صِفِ البياناتِ الَّتِي يَعْرِضُهَا ذلكَ التَّمثيلُ؟
            </>
          }
          hint="فكّر في الأخبار، والتطبيقات، والمتاجر، ولوحات المدرسة."
          steps={[
            { text: 'مثال: تمثيل في نشرة الأخبار لعدد زوار مدينة في كل شهر.' },
            { text: 'يعرض فئات (الأشهر) وقيمة كل فئة (عدد الزوار)، فنقارن بينها.', kind: 'ans' },
          ]}
          chart={<Chart spec={heights} />}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'الحس العددي: عندما ينتهي العمود بين خطين لا نعرف القيمة بالضبط.',
      content: (
        <QuestionSlide
          source={HOT} n={12} tps
          question={
            <>
              <b style={{ color: 'var(--ex)' }}>الحِسُّ العدديُّ:</b> لماذَا يكونُ التَّقديرُ ضروريًّا أحيانًا عندَ قراءةِ البياناتِ الَّتي يعرِضُها التَّمثيلُ بالأعمدةِ؟
            </>
          }
          hint="ماذا نفعل إذا انتهى العمود بين خطّين من خطوط الشبكة؟"
          steps={[
            { text: 'أحيانًا ينتهي العمود بين خطّين من خطوط الشبكة، أو بين عددين على المحور.' },
            { text: 'فلا نعرف القيمة بالضبط، فنقدّرها بأقرب عدد.', kind: 'ans' },
          ]}
          chart={<Titles />}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'أكتب: قارن التدريج الحالي (٢٠) بالتدريج المقترح (١٠٠).',
      content: (
        <QuestionSlide
          source={HOT} n={13} tags={[{ kind: 'warn', text: 'أكتُبُ' }]}
          question="هَل ستُصبحُ قراءةُ البياناتِ في التَّمثيلِ المُخَصَّصِ للأسئلةِ منْ ٧ إلَى ١٠ أسهلَ إذا اختزْنَا تدريجًا للمحوَرِ الرَّأْسِيِّ بزيادةِ ١٠٠ كلَّ مرَّةٍ؟ فسِّرْ إجابَتَكَ."
          long
          hint="الدرجات ٦٠ و٨٠ و١٠٠ و١٤٠: أين تقع بين ٠ و١٠٠ و٢٠٠؟"
          steps={[
            { text: 'بتدريج ١٠٠ يكون على المحور ٠ و١٠٠ و٢٠٠ فقط.' },
            { text: 'فتقع معظم الدرجات (٦٠، ٨٠، ١٤٠) بين الخطوط، ونضطر إلى التقدير.', hl: ['p0', 'p1', 'p2'] },
            { text: 'لا، تصبح القراءة أصعب؛ التدريج بزيادة ٢٠ أنسب لهذه البيانات.', kind: 'ans' },
          ]}
          chart={<Chart spec={contest} />}
        />
      ),
    },

    /* ================= الختام ================= */
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب إكمال كل فرع شفهيًا قبل أن تشير إليه.',
      content: (
        <>
          <SlideHead tag="ملخص الدرس" kind="rule">خريطة ذهنية</SlideHead>
          <MindMap
            center={<>التمثيل<br />بالأعمدة</>}
            items={[
              { kind: 'rule', cap: 'متى أستعمله؟', text: 'للمقارنة بين البيانات.' },
              { kind: 'ex', cap: 'أقرأ القيمة', text: 'من نهاية العمود إلى المحور.' },
              { kind: 'qs', cap: 'أقارن', text: 'الأطول = الأكثر، والأقصر = الأقل.' },
              { kind: 'warn', cap: 'أحسب', text: 'الفرق بالطرح، والمجموع بالجمع.' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 3,
      notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">مسابقة الرياضيات</SlideHead>
          <Cols style={{ gridTemplateColumns: '1fr 1.15fr' }}>
            <Chart spec={contest} />
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="ما درجة مشاعل؟" options={['٨٠', '١٠٠', '١٤٠']} answer="١٠٠" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="من حصلت على أعلى درجة؟" options={['سمَر', 'هيا', 'منى']} answer="هيا" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="كم تزيد درجة منى على درجة هُدى؟" options={['٢٠', '٤٠', '٦٠']} answer="٤٠" /></Card>
            </div>
          </Cols>
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
