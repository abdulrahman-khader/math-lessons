import { useState } from 'react';
import {
  Card, Cols, Ctrls, Eq, Frac, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, Pie, QCol, QuestionSlide, SlideHead, Solution, Stack,
  Step, Winner, defineLesson, num, useRemoteWidget, type Slice,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- البيانات (القطاعات باتجاه عقارب الساعة من الأعلى كما في الكتاب) ---------- */

/** استعد وأمثلة ١–٣ (ص ٩٠) */
const AIR: Slice[] = [
  { label: 'نيتروجين', value: 78, color: '#f1d9c4' },
  { label: 'غازات أخرى', value: 1, color: '#f4a742' },
  { label: 'أكسجين', value: 21, color: '#2f9a8c' },
];

/** تأكّد ١–٤ (ص ٩١) */
const TRIPS: Slice[] = [
  { label: 'جدة', value: 4, color: '#f1d9c4' },
  { label: 'الرياض', value: 2, color: '#ffab4a' },
  { label: 'الخبر', value: 1, color: '#2f9a8c' },
  { label: 'حائل', value: 1, color: '#45b5d3' },
];

/** تدرّب ٥–١١ (ص ٩١): المجموع ٥٠٠ */
const FRUIT: Slice[] = [
  { label: 'تفاح', sub: '١١٠', value: 110, color: '#9bc56b' },
  { label: 'برتقال', sub: '١٢٥', value: 125, color: '#ffab4a' },
  { label: 'كمثرى', sub: '٥٠', value: 50, color: '#dde27a' },
  { label: 'عنب', sub: '٧٥', value: 75, color: '#8a63c4' },
  { label: 'كرز', sub: '٣٠', value: 30, color: '#a0484f' },
  { label: 'بطيخ', sub: '٦٠', value: 60, color: '#e86a5a' },
  { label: 'موز', sub: '٥٠', value: 50, color: '#fff27a' },
];

/** اكتشف الخطأ ١٢ (ص ٩٢): ستة أجزاء متساوية في الرسمين */
const colors6 = (sub: (n: number) => string): Slice[] => [
  { label: 'أحمر', sub: sub(2), value: 2, color: '#e8645a' },
  { label: 'أخضر', sub: sub(1), value: 1, color: '#8fbf5a' },
  { label: 'أزرق', sub: sub(3), value: 3, color: '#45b0d0' },
];

const CHECK = 'تأكَّدْ · ص ٩١';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ · ص ٩١';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ٩٢';

const PieBox = ({ title, slices, size = 440, fs = 24 }: { title?: string; slices: Slice[]; size?: number; fs?: number }) => (
  <div className="chart pic">
    <Pie title={title} slices={slices} size={size} fs={fs} />
  </div>
);
const Trips = () => <PieBox title="الرِّحلاتُ المَيدانيَّةُ المُفضَلة لِطلَّابِ الصَّفِّ الرَّابِعِ" slices={TRIPS} />;
const Fruit = () => <PieBox title="الفاكهةُ المفضلةُ لِطُلابِ المَدْرسَة" slices={FRUIT} fs={21} />;

/** مستكشف: عدد الطلاب في كل فئة، فيتغيّر حجم كل قطاع */
const NAMES = ['القراءة', 'الرسم', 'الرياضة'];
const COLS = ['#45b0d0', '#ffab4a', '#8fbf5a'];
function PieExplorer() {
  const [n, setN] = useState([6, 3, 3]);
  const total = n.reduce((a, b) => a + b, 0);
  const set = (i: number, v: number) => setN((x) => x.map((y, j) => (j === i ? Math.max(0, Math.min(12, v)) : y)));
  useRemoteWidget(
    () => ({
      title: 'القطاعات الدائرية',
      info: n.map((v, i) => `${NAMES[i]} ${num(v)} من ${num(total)}`).join(' · '),
      steppers: NAMES.map((l, i) => ({ key: String(i), label: l, value: n[i], min: 0, max: 12, color: COLS[i] })),
      buttons: [],
    }),
    (k, v) => v !== undefined && set(+k, v),
    [n],
  );
  return (
    <Cols style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
      <Stack>
        {NAMES.map((l, i) => (
          <div key={l} className="ffstep" style={{ borderColor: COLS[i] }}>
            <span>{l}</span>
            <button aria-label={`إنقاص ${l}`} disabled={n[i] <= 0} onClick={() => set(i, n[i] - 1)}>
              −
            </button>
            <b>{num(n[i])}</b>
            <button aria-label={`زيادة ${l}`} disabled={n[i] >= 12} onClick={() => set(i, n[i] + 1)}>
              +
            </button>
            <span className="pex-f">
              {total ? <Frac n={n[i]} d={total} /> : null}
            </span>
          </div>
        ))}
      </Stack>
      <div className="chart pic">
        <Pie title="الهواية المفضّلة" slices={NAMES.map((l, i) => ({ label: l, value: n[i], color: COLS[i] }))} size={340} />
      </div>
    </Cols>
  );
}

export default defineLesson({
  meta: {
    id: 'g4-3-5-circle-graphs',
    code: '٣-٥',
    title: 'التَّمثيلُ بِالقِطاعاتِ الدَّائريَّةِ',
    shortTitle: 'التمثيل بالقطاعات الدائرية',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الثالث: تنظيم البيانات وعرضها وتفسيرها',
    source: 'الجزء الأول · ص ٩٠–٩٢',
    minutes: 45,
    idea: 'أُفسِّرُ التَّمثيلَ بِالقِطاعاتِ الدَّائريَّة.',
    bookQuestions: 12,
  },
  sectionDesc: {
    engage: 'الغلاف الجوي',
    explore: 'كيف يتغيّر القطاع؟',
    explain: 'القاعدة · الأمثلة ١–٣',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٤',
    practice: 'الأسئلة ٥–١١',
    hot: 'السؤال ١٢',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردة. اسأل: أين رأيتم دائرة مقسّمة إلى أجزاء؟ (الكعكة، البيتزا، شاشة البطارية).',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أُفسِّرُ التَّمثيلَ بِالقِطاعاتِ الدَّائريَّة.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>التَّمثيلُ بِالقِطاعاتِ الدَّائريَّةِ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أحدد الجزء الأكبر والأصغر.</li>
                <li>أصف القطاع بكسر: نصف، ربع، ثلاثة أرباع.</li>
                <li>أقرأ الأعداد من القطاعات وأحسب بها.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'start', min: 1,
      notes: 'مقطع قصير (أقل من دقيقة) لا يبدأ إلا عندما تضغط تشغيل. أوقفه عند كل خطوة واسأل قبل أن يكمل: كم طالبًا اختار جدة؟ ما الكسر الذي يمثّله قطاعها؟ يمكن تشغيله وإيقافه من الجوال.',
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
      notes: 'اقرأ «استعد» من الكتاب. اسأل: أيّ الغازين يأخذ مساحة أكبر من الدائرة؟',
      content: (
        <>
          <SlideHead tag="اسْتَعِدَّ · ص ٩٠" kind="qs">الغلاف الجوي</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">يَتكوَّنُ الغِلافُ الجَّويُّ لِلأرضِ مِن عَددٍ مِن الغَازَاتِ. ويمثِّلُ النيتُروجينُ والأُكسجينُ النِّسبةَ الأعْلى مِن هَذه الغَازَاتِ.</p>
              <MCQ q="أيّ الغازات يأخذ الجزء الأكبر من الدائرة؟" options={['الأكسجين', 'النيتروجين', 'غازات أخرى']} answer="النيتروجين" award />
              <Card kind="qs" cap="سؤال للتفكير">لماذا نرسم البيانات هنا في دائرة، لا في أعمدة؟</Card>
            </QCol>
            <PieBox title="الغَازاتُ المُكوِّنةُ لِلغلافِ الجَوِّيِّ" slices={AIR} />
          </Cols>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا يغيّر الأعداد. اسأل: متى يصبح قطاع القراءة نصف الدائرة؟ (عندما يساوي مجموع الآخرَين). ومتى يصبح ربعها؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">كيف يتغيّر القطاع؟</SlideHead>
          <p style={{ fontSize: '.82em', fontWeight: 700, margin: 0 }}>غيّر عدد الطلاب في كل هواية، وراقب حجم كل قطاع والكسر بجانبه.</p>
          <PieExplorer />
          <Card kind="rule" cap="لاحظ">الدائرة كلها = كل الطلاب. وكل قطاع جزء من الكل.</Card>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ القاعدة، ثم بطاقة «تذكّر» عن الكسور في الدائرة.',
      content: (
        <>
          <SlideHead tag="القاعدة · ص ٩٠" kind="rule">ما التمثيل بالقطاعات الدائرية؟</SlideHead>
          <Card kind="rule" style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.85 }}>
            يُستعملُ <Mark>التَّمثيلُ بالقِطاعَاتِ الدَّائريَّةِ</Mark> لِلمقارَنةِ بَينَ البَيانَاتِ كَجزءٍ مِنَ الكُلِّ باستعمالِ أجزاءٍ مِنَ الدَّائرة.
          </Card>
          <div className="qgrid four">
            {[
              [1, 4],
              [1, 2],
              [3, 4],
              [1, 3],
            ].map(([a, d]) => (
              <Card key={`${a}${d}`} kind="ex">
                <Pie slices={[{ label: '', value: a, color: '#f4813f' }, { label: '', value: d - a, color: '#f1d9c4' }]} size={130} />
                <p style={{ margin: 0, textAlign: 'center', fontSize: '1.2em', fontWeight: 800 }}>
                  <Frac n={a} d={d} />
                </p>
              </Card>
            ))}
          </div>
        </>
      ),
    },

    /* ================= أمثلة ١–٣ ================= */
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: أمثلة الكتاب الثلاثة بالترتيب. مع كل مثال يبرز القطاع المقصود.',
      content: (
        <>
          <SlideHead tag="أمثلةٌ من واقعِ الحياةِ · ص ٩٠" kind="ex">تفسير التمثيل بالقطاعات الدائرية</SlideHead>
          <Cols style={{ gridTemplateColumns: '1.25fr 1fr' }}>
            <QCol>
              <p className="qtext" style={{ fontSize: '.9em' }}>
                <b style={{ color: 'var(--ex)' }}>علوم:</b> أَستخدمُ التَّمثيلَ بالقِطاعَاتِ الدَّائريَّة الَّذي يُوضِّحُ الغَازَاتِ المُكوِّنةَ للغِلافِ الجوِّيِّ لِلأرضِ.
              </p>
              <Ctrls>
                <NextButton />
              </Ctrls>
              <Solution>
                <Step hl={['p0']}>
                  <b>١ مَا الغَازُ الأكثرُ انتشَارًا؟</b> يُمثِّلُ الجُزءُ الأكبَرُ مِن القِطاعِ الغَازَ الَّذي يتكوَّنُ منه مُعظمُ الغلافِ الجَويِّ، وَهُو النيتُروجين.
                </Step>
                <Step hl={['p2']}>
                  <b>٢ ما أكثرُ الغازاتِ انتشارًا بعدَ النيتروجين؟</b> يَأتِي الأُكسجينُ في المرتَبَةِ الثَّانيَةِ.
                </Step>
                <Step hl={['p0', 'p2']} kind="ans">
                  <b>٣</b> النيتُروجين حوالي ثَلاثَةِ أرباعِ (<Frac n={3} d={4} />) الدَّائرةِ، والأُكسجينُ حوالي رُبعِ (<Frac n={1} d={4} />) الدَّائرَةِ.
                </Step>
              </Solution>
            </QCol>
            <PieBox title="الغَازاتُ المُكوِّنةُ لِلغلافِ الجَوِّيِّ" slices={AIR} />
          </Cols>
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 4,
      notes: 'نعمل معًا: اختر طالبًا بالعجلة. اطلب منه الإشارة إلى القطاع قبل الاختيار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">كم من الدائرة؟</SlideHead>
          <Cols>
            <QCol style={{ gap: '.3em' }}>
              <MCQ q="أ) ما الجزء الذي تمثّله «جدة»؟" options={['ربع', 'نصف', 'ثلاثة أرباع']} answer="نصف" award />
              <MCQ q="ب) ما الجزء الذي تمثّله «الرياض»؟" options={['ربع', 'نصف', 'ثُمن']} answer="ربع" award />
              <MCQ q="ج) «الخبر» و«حائل» معًا يساويان:" options={['ربعًا', 'نصفًا', 'الدائرة كلها']} answer="ربعًا" award />
            </QCol>
            <Trips />
          </Cols>
        </>
      ),
    },

    /* ================= تأكد ١–٤ ================= */
    {
      sec: 'check', min: 1,
      notes: 'أكبر قطاع = الأكثر تفضيلًا.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={30}
          intro="اِستعملِ التَّمثيلَ بِالقِطاعاتِ الدَّائريَّةِ فِي الشَّكلِ المُجاورِ لِلإجابةِ عَنِ الأَسئلةِ من ١ إلى ٤:"
          question="مَا الرِّحلةُ المَيدانيَّةُ المُفضَّلةُ عِندَ أكثرِ طُلَّابِ الصَّف الرَّابِع؟"
          hint="ابحث عن أكبر قطاع."
          steps={[
            { text: 'أكبر قطاع: جدة.', hl: ['p0'] },
            { text: 'جدة', kind: 'ans' },
          ]}
          chart={<Trips />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'قطاع جدة نصف الدائرة تمامًا.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} time={30}
          question="مَا الجزء الذي يمثل الرحلة الميدانية المُفضَّلة لَدى أكثرِ طُلَّابِ الصَّفِ الرَّابعِ؟"
          hint="هل يأخذ قطاع جدة ربع الدائرة؟ أم نصفها؟"
          steps={[
            { text: 'قطاع جدة يملأ نصف الدائرة.', hl: ['p0'] },
            { text: <>النصف (<Frac n={1} d={2} />)</>, kind: 'ans' },
          ]}
          chart={<Trips />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'الربع الأيسر العلوي مقسوم بين الخبر وحائل، فكل منهما أقل من ربع.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} time={60}
          question={
            <>
              هَلْ يُفضِّلُ أكثَرَ مِن رُبعِ (<Frac n={1} d={4} />) الصَّفِّ الذَّهابَ إِلَى الخُبرِ؟ وضِّح إجَابَتك.
            </>
          }
          hint="قارن قطاع الخبر بقطاع الرياض (ربع الدائرة)."
          steps={[
            { text: 'الربع الأعلى من النصف الأيسر مقسوم بين الخبر وحائل.', hl: ['p2', 'p3'] },
            { text: 'فقطاع الخبر أصغر من ربع الدائرة (ثُمنها تقريبًا).', hl: ['p2'] },
            { text: 'لا، الخبر أقل من ربع الصف.', kind: 'ans' },
          ]}
          chart={<Trips />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'ثلاث رحلات: لا تكفي جدة والرياض لأنهما رحلتان. نحتاج نصفًا + ربعًا من ثلاث قطاعات.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} time={60}
          question={
            <>
              حَدِّدْ ثَلاث رَحلاتٍ مَيدانيَّةٍ يُفضِّلهَا ثَلاثةُ أرباعِ (<Frac n={3} d={4} />) طُلَّاب الصَّف الرَّابع؟
            </>
          }
          hint="ثلاثة أرباع = نصف + ربع. أيّ قطاعين صغيرين معًا يساويان ربعًا؟"
          steps={[
            { text: 'جدة نصف الدائرة.', hl: ['p0'] },
            { text: 'الخبر وحائل معًا ربع الدائرة.', hl: ['p0', 'p2', 'p3'] },
            { text: 'جدة والخبر وحائل: نصف + ربع = ثلاثة أرباع.', kind: 'ans' },
          ]}
          chart={<Trips />}
        />
      ),
    },

    /* ================= تدرب ٥–١١ ================= */
    {
      sec: 'practice', min: 1,
      notes: 'ابحث عن العدد ١١٠ داخل القطاعات.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={5} time={30}
          intro="يُبيِّنُ التَّمثيلُ بالقِطاعاتِ الدَّائريَّةِ فِي الشَّكلِ المُجاورِ الفَاكِهةَ المُفضَّلةَ عِندَ طُلَّابِ المَدرسَةِ:"
          question="مَا الفَاكِهةُ المُفضَّلةُ لَدى ١١٠ من طلابِ المَدرسة؟"
          hint="ابحث عن العدد ١١٠."
          steps={[{ text: 'التفاح', hl: ['p0'], kind: 'ans' }]}
          chart={<Fruit />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'اقرأ العدد المكتوب داخل قطاع البطيخ.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={6} time={30}
          question="كَمْ عَددُ الطُّلابِ الَّذينَ يُفضِّلُونَ البَطِّيخَ؟"
          hint="اقرأ العدد في قطاع البطيخ."
          steps={[{ text: '٦٠ طالبًا', hl: ['p5'], kind: 'ans' }]}
          chart={<Fruit />}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'نحتاج المجموع أولًا (٥٠٠)، فربعه ١٢٥. في الكتاب إجابتان: العنب والموز، أو العنب والكمثرى.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={7} time={120}
          question="أي نوعينِ من الفَاكهةِ معًا كانت المُفضَّلَةَ لِرُبعِ الطُّلاب؟"
          hint="اجمع كل الطلاب، ثم أوجد الربع، ثم ابحث عن نوعين مجموعهما يساويه."
          steps={[
            { text: <Eq>١١٠ + ١٢٥ + ٥٠ + ٧٥ + ٣٠ + ٦٠ + ٥٠ = ٥٠٠</Eq> },
            { text: <>ربع ٥٠٠ = ١٢٥ (لأن ١٢٥ + ١٢٥ + ١٢٥ + ١٢٥ = ٥٠٠)</> },
            { text: <Eq>٧٥ + ٥٠ = ١٢٥</Eq>, hl: ['p3', 'p6'] },
            { text: 'العنب والموز (أو العنب والكمثرى).', hl: ['p3', 'p6', 'p2'], kind: 'ans' },
          ]}
          chart={<Fruit />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'أكبر قطاع وأكبر عدد.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={8} time={45}
          question="مَا الفَاكِهةُ الأَكْثرُ تَفضِيلًا لدَى الطُّلابِ ؟ كَمْ عَددُ الطُّلابِ الَّذينَ اِختَارُوا تِلكَ الفَاكِهةَ؟"
          hint="ابحث عن أكبر قطاع."
          steps={[
            { text: 'أكبر قطاع: البرتقال.', hl: ['p1'] },
            { text: 'البرتقال، ١٢٥ طالبًا.', kind: 'ans' },
          ]}
          chart={<Fruit />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'أصغر قطاع وأصغر عدد.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={9} time={45}
          question="مَا الفَاكِهةُ الأقل تفضِيلًا لدَى الطُّلابِ ؟ كَمْ عَددُ الطُّلابِ الَّذينَ اِختَارُوا تِلكَ الفَاكِهةَ؟"
          hint="ابحث عن أصغر قطاع."
          steps={[
            { text: 'أصغر قطاع: الكرز.', hl: ['p4'] },
            { text: 'الكرز، ٣٠ طالبًا.', kind: 'ans' },
          ]}
          chart={<Fruit />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'اجمع الموز والكمثرى أولًا، ثم قارن بالتفاح.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={10} time={60}
          question="هَلْ كانَ التُّفاحُ مُفضَّلًا أكثَر مِنَ المَوزِ وَالكُمثرَى مَعًا، أمْ أقَلَّ؟"
          hint="اجمع الموز والكمثرى، ثم قارن الناتج بالتفاح."
          steps={[
            { text: <Eq>٥٠ + ٥٠ = ١٠٠</Eq>, hl: ['p6', 'p2'] },
            { text: 'التفاح ١١٠، و١١٠ أكبر من ١٠٠.', hl: ['p0'] },
            { text: 'التفاح مفضّل أكثر.', kind: 'ans' },
          ]}
          chart={<Fruit />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'المجموع حسبناه في السؤال ٧.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={11} time={60}
          question="كَمْ عَددُ طُلَّابِ المَدرسَةِ؟"
          hint="الدائرة كلها = كل الطلاب. اجمع الأعداد كلها."
          steps={[
            { text: <Eq>١١٠ + ١٢٥ + ٥٠ + ٧٥ + ٣٠ + ٦٠ + ٥٠</Eq>, hl: ['p0', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6'] },
            { text: '٥٠٠ طالبٍ', kind: 'ans' },
          ]}
          chart={<Fruit />}
        />
      ),
    },

    /* ================= اكتشف الخطأ ١٢ ================= */
    {
      sec: 'hot', min: 3,
      notes: 'الطلاب ٦، والدائرة مقسّمة إلى ٦ أجزاء متساوية، فالمقام ٦ لا ٨.',
      content: (
        <QuestionSlide
          source={HOT} n={12} tps
          question={
            <>
              <b style={{ color: 'var(--ex)' }}>اكتشف الخَطأ:</b> مَثَّلَ كُلٌّ مِنْ أَحمدَ وسَعدٍ نَتائجَ اِستطلَاعِ رَأيِ ٦ طُلابٍ حَولَ اللَّونِ المُفضَّلِ لَديْهِم. أَيُّهمَا كَانَ تَمْثيلُهُ صَحيْحًا؟ أُذكرِ السَّببَ.
            </>
          }
          hint="كم جزءًا متساويًا في كل دائرة؟ وكم عدد الطلاب؟"
          steps={[
            { text: 'كل دائرة مقسّمة إلى ٦ أجزاء متساوية، لأن الطلاب ٦.' },
            { text: <>أحمد كتب الكسور من ٨ (<Frac n={2} d={8} />، <Frac n={3} d={8} />، <Frac n={1} d={8} />)، ومجموعها لا يساوي الدائرة كلها.</> },
            { text: <>سعدٌ؛ لأن كل طالب جزء من ٦، و<Frac n={2} d={6} /> + <Frac n={1} d={6} /> + <Frac n={3} d={6} /> = الدائرة كلها.</>, kind: 'ans' },
          ]}
          chart={
            <div className="chart pic">
              <Cols even>
                <Pie title="أحمدُ" slices={colors6((n) => `${num(n)}/${num(8)}`)} size={320} fs={24} />
                <Pie title="سَعدُ" slices={colors6((n) => `${num(n)}/${num(6)}`)} size={320} fs={24} />
              </Cols>
            </div>
          }
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
            center={<>التمثيل بالقطاعات<br />الدائرية</>}
            items={[
              { kind: 'rule', cap: 'متى أستعمله؟', text: 'للمقارنة بين أجزاء من الكل.' },
              { kind: 'ex', cap: 'الدائرة', text: 'الدائرة كلها = كل البيانات.' },
              { kind: 'qs', cap: 'أقارن', text: 'أكبر قطاع = الأكثر، وأصغر قطاع = الأقل.' },
              { kind: 'warn', cap: 'أصف بكسر', text: 'نصف، ربع، ثلاثة أرباع.' },
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
          <SlideHead tag="تذكرة الخروج" kind="qs">الرحلات المفضّلة</SlideHead>
          <Cols style={{ gridTemplateColumns: '1fr 1.25fr' }}>
            <Trips />
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="ما الرحلة الأقل تفضيلًا مع الخبر؟" options={['حائل', 'الرياض', 'جدة']} answer="حائل" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="الرياض وجدة معًا تمثلان:" options={['نصفًا', 'ثلاثة أرباع', 'ربعًا']} answer="ثلاثة أرباع" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="إذا كان طلاب الصف ٢٤، فكم طالبًا يفضّل جدة؟" options={['٦', '١٢', '١٨']} answer="١٢" /></Card>
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
