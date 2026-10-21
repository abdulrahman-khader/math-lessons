import { useState } from 'react';
import {
  Card, Cols, Ctrls, DataGrid, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, QCol, QuestionSlide, SlideHead, Solution, Stack,
  Step, Tally, Winner, defineLesson, num, useRemoteWidget, type Cell, type HlKey,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'تأكَّدْ · ص ٨٠';
const PRACTICE_80 = 'تدرَّبْ وحُلَّ المسائلَ · ص ٨٠';
const PRACTICE_81 = 'تدرَّبْ وحُلَّ المسائلَ · ص ٨١';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ٨١';

type Row = [label: string, n: number];

/** خلية تظهر مع الخطوة التي فيها hl ‹v{i}› */
const at = (i: number, c: { v?: string | number; tally?: number }): Cell => ({ ...c, k: `v${i}` as HlKey });

/** لوحة إشارات؛ reveal: الإشارات تظهر مع الخطوات */
const TallyBoard = ({ title, head, rows, reveal, tone = 'salmon' }: { title: string; head: string; rows: Row[]; reveal?: boolean; tone?: 'salmon' | 'orange' }) => (
  <DataGrid title={title} head={[head, 'الإشاراتُ']} tone={tone} rows={rows.map(([l, n], i) => [l, reveal ? at(i, { tally: n }) : { tally: n }])} />
);

/** جدول تكراري؛ reveal: الأعداد تظهر مع الخطوات */
const FreqTable = ({ title, head, rows, reveal, count = 'التَّكرارُ' }: { title: string; head: string; rows: Row[]; reveal?: boolean; count?: string }) => (
  <DataGrid title={title} head={[head, count]} rows={rows.map(([l, n], i) => [l, reveal ? at(i, { v: n }) : n])} />
);

/** بيانات خام كما جُمعت (أعمدة من اليمين) */
const Raw = ({ title, cols }: { title: string; cols: string[][] }) => {
  const h = Math.max(...cols.map((c) => c.length));
  return <DataGrid title={title} small rows={Array.from({ length: h }, (_, r) => cols.map((c) => c[r] ?? ''))} />;
};

const Box = ({ children }: { children: React.ReactNode }) => <div className="chart tbl">{children}</div>;

/** مستكشف: تصويت الصف، كل ضغطة إشارة، ثم الجدول التكراري */
const FRUITS = ['التُّفّاحُ', 'الموزُ', 'البرتقالُ', 'العنبُ'];
function VoteExplorer() {
  const [n, setN] = useState([0, 0, 0, 0]);
  const add = (i: number, d: number) => setN((x) => x.map((v, j) => (j === i ? Math.max(0, Math.min(30, v + d)) : v)));
  const total = n.reduce((a, b) => a + b, 0);
  useRemoteWidget(
    () => ({
      title: 'تصويت الصف',
      info: `عدد الأصوات: ${num(total)}`,
      steppers: FRUITS.map((f, i) => ({ key: String(i), label: f, value: n[i], min: 0, max: 30 })),
      buttons: [{ key: 'clear', label: 'تصويت جديد' }],
    }),
    (k, v) => {
      if (k === 'clear') setN([0, 0, 0, 0]);
      else if (v !== undefined) add(+k, v - n[+k]);
    },
    [n],
  );
  return (
    <Cols style={{ gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'start' }}>
      <Stack>
        {FRUITS.map((f, i) => (
          <div key={f} className="ffstep">
            <span>{f}</span>
            <button aria-label={`إنقاص ${f}`} disabled={!n[i]} onClick={() => add(i, -1)}>
              −
            </button>
            <b>{num(n[i])}</b>
            <button aria-label={`صوت ل${f}`} onClick={() => add(i, 1)}>
              +
            </button>
          </div>
        ))}
        <button className="btn" onClick={() => setN([0, 0, 0, 0])}>
          تصويت جديد
        </button>
      </Stack>
      <DataGrid title="الفاكهةُ المفضَّلةُ" head={['الفاكهةُ', 'الإشاراتُ']} tone="salmon" rows={FRUITS.map((f, i) => [f, { tally: n[i] }])} />
      <DataGrid title="الفاكهةُ المفضَّلةُ" head={['الفاكهةُ', 'التَّكرارُ']} rows={[...FRUITS.map((f, i): Cell[] => [f, n[i]]), ['المجموعُ', total]]} />
    </Cols>
  );
}

/* البيانات */
const HOBBIES: Row[] = [['القراءةُ', 5], ['الخياطةُ', 4], ['الرَّسمُ', 3]];
const SCHOOL: Row[] = [['الحافلةُ', 8], ['السيارةُ', 12], ['المشيُ', 6]];
const FISH: Row[] = [['حمراءُ', 3], ['زرقاءُ', 3], ['صفراءُ', 2], ['بيضاءُ', 2]];
const PIES: Row[] = [['الجبنُ', 5], ['الزعترُ', 3], ['اللحمُ', 2]];
const SUBJECTS: Row[] = [['علومٌ', 3], ['رياضياتٌ', 2], ['لُغتي', 4]];
const TEMPS: Row[] = [['٢٠ – ٢٤', 2], ['٢٥ – ٢٩', 3], ['٣٠ – ٣٤', 1], ['٣٥ – ٣٩', 1]];
const ACTIVITIES: Row[] = [['كرةُ القدمِ', 4], ['الرَّسمُ', 3], ['السِّباحةُ', 5], ['القراءةُ', 3]];
const TOOLS: Row[] = [['المِحاةُ', 5], ['الصمغُ', 2], ['القلمُ الرصاصُ', 8], ['المقصُّ', 1]];
const REACTIONS: Row[] = [
  ['لا أتَّخذُ أيَّ قرارٍ، ولا أعملُ شيئًا.', 3],
  ['أُبلِّغُ أُسرتِي عنِ الإعلانِ، وأستعينُ برأيِهِم.', 5],
  ['أُبادرُ بشراءِ المنتجِ الموجودِ في الإعلانِ.', 4],
  ['أَستشيرُ أصدقائِي في الصّفِّ.', 2],
];

const tools = <TallyBoard title="الأدواتُ المدرسيَّةُ المبيعةُ خلالَ ساعةٍ" head="الأدواتُ" rows={TOOLS} tone="orange" />;
const toolsIntro = 'في الأسئلةِ (٩ – ١٢)، إستعملْ لوحةَ الإشاراتِ أدناهُ الَّتي تُظْهِرُ عددَ ما بِيعَ مِنْ أدواتٍ مدرسيَّةٍ خلالَ ساعةٍ في مكتبةٍ للقرطاسيَّةِ:';

export default defineLesson({
  meta: {
    id: 'g4-3-1-collect-data',
    code: '٣-١',
    title: 'جَمْعُ البَياناتِ وتنظِيمُها',
    shortTitle: 'جمع البيانات وتنظيمها',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الثالث: تنظيم البيانات وعرضها وتفسيرها',
    source: 'الجزء الأول · ص ٧٩–٨١',
    minutes: 45,
    idea: 'أَجْمَعُ البَياناتِ وأُنظِّمُها.',
    bookQuestions: 14,
  },
  sectionDesc: {
    engage: 'هوايات الطالبات',
    explore: 'تصويت الصف',
    explain: 'المفردات · مثال ١',
    elab: 'نعمل معًا · مثال ٢',
    check: 'الأسئلة ١–٤',
    practice: 'الأسئلة ٥–١٢',
    hot: 'الأسئلة ١٣–١٤',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردات الأربع. اسأل: كيف نعرف ما يحبه زملاؤنا؟ (نسألهم).',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَجْمَعُ البَياناتِ وأُنظِّمُها.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>المَسْحُ</Mark> · <Mark>البَياناتُ</Mark> · <Mark>لَوْحةُ الإشاراتِ</Mark> · <Mark>الجدْولُ التّكراريُّ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أجمع البيانات بإجراء مسح.</li>
                <li>أنظّم البيانات في لوحة إشارات.</li>
                <li>أنظّم البيانات في جدول تكراري.</li>
                <li>أقرأ لوحة الإشارات والجدول التكراري.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },


    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'start', min: 1,
      notes: 'مقطع قصير (أقل من دقيقة) لا يبدأ إلا عندما تضغط تشغيل. أوقفه قبل الجدول التكراري واسأل: كم طالبة هوايتها القراءة؟ كيف عرفت؟ يمكن تشغيله وإيقافه من الجوال.',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },

    /* ================= تهيئة · استعد ================= */
    {
      sec: 'engage', min: 3,
      notes: 'اقرأ «استعد» من الكتاب. اسأل: هل يسهل أن نعرف أيّ هواية أكثر من هذه السبورة؟ نحتاج طريقة أسرع للتنظيم.',
      content: (
        <>
          <SlideHead tag="اسْتَعِدَّ · ص ٧٩" kind="qs">هوايات الطالبات</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">سألتِ المعلِّمةُ بعضَ الطّالباتِ عَنْ هِوَايَاتِهِنَّ، فكانتِ النّتيجةُ كَمَا هوَ موضَّحٌ في الشّكلِ المجاورِ.</p>
              <MCQ q="كم طالبةً هوايتُها القراءةُ؟" options={['٣', '٤', '٥']} answer="٥" award />
              <Card kind="qs" cap="سؤال للتفكير">كيف ننظّم هذه الأسماء لنعرف بسرعة أيّ هواية هي الأكثر؟</Card>
            </QCol>
            <div className="chart tbl board">
              <DataGrid
                head={['القراءةُ', 'الخياطةُ', 'الرَّسمُ']}
                tone="green"
                rows={[
                  ['فاطمةُ', 'سعادُ', 'نجودُ'],
                  ['مها', 'أملُ', 'سَلمى'],
                  ['زينبُ', 'عائشةُ', 'مَريمُ'],
                  ['العنودُ', 'لَيلَى', ''],
                  ['لُبنَى', '', ''],
                ]}
              />
            </div>
          </Cols>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'مسح حقيقي في الصف: اسأل كل طالب عن فاكهته المفضلة، وادعُ طالبًا يضغط + عند كل صوت (أو من الجوال). اسأل: أيّ الجدولين أسهل في القراءة؟ لماذا تُجمع الإشارات في حزم من خمس؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">مسح: ما الفاكهة المفضّلة في صفّنا؟</SlideHead>
          <p style={{ fontSize: '.82em', fontWeight: 700, margin: 0 }}>اضغط + لكل صوت، وراقب لوحة الإشارات والجدول التكراري.</p>
          <VoteExplorer />
          <Card kind="rule" cap="لاحظ">في لوحة الإشارات كل إشارة صوت واحد، وكل خمس إشارات حزمة. وفي الجدول التكراري نكتب العدد.</Card>
        </>
      ),
    },

    /* ================= المفردات ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ النص من الكتاب، وأشر إلى كل مفردة. ثم بطاقة «تذكّر» عن كتابة العدد ٥ بالإشارات.',
      content: (
        <>
          <SlideHead tag="القاعدة · ص ٧٩" kind="rule">المسح والبيانات</SlideHead>
          <Card kind="rule" style={{ fontSize: '1.02em', fontWeight: 700, lineHeight: 1.85 }}>
            مَا قامتْ به المعلِّمةُ هوَ إجراءُ <Mark>مَسْحٍ</Mark>. وهوَ إحدَى طُرقِ جَمْعِ <Mark>البَياناتِ</Mark>. ويُمكنُ تنظيمُ البَياناتِ فِي <Mark>لَوْحَةِ إشاراتٍ</Mark> أوْ فِي <Mark>جدولٍ تكراريٍّ</Mark>.
          </Card>
          <Cols even>
            <Card kind="ex" cap="لوحة الإشارات">تُمثِّلُ كلُّ إشارةٍ طالبةً واحدةً.</Card>
            <Card kind="ex" cap="الجدول التكراري">تُستعملُ الأعدادُ لتسجيلِ النتائجِ.</Card>
            <Card kind="warn" cap="تذكَّرْ">
              يُمثِّلُ العددُ ٥ بالإشاراتِ <Tally n={5} /> وليسَ <span className="tally5">|||||</span>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= مثال ١ ================= */
    {
      sec: 'explain', min: 4,
      notes: 'أنا أعمل: نفّذ الخطوات الثلاث بصوت مسموع. مع كل خطوة تظهر إشارات هواية وعددها في الجدولين.',
      content: (
        <>
          <SlideHead tag="مثالٌ من واقعِ الحياةِ ١ · ص ٧٩" kind="ex">تنظيم البيانات</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">
                <b style={{ color: 'var(--ex)' }}>هِوايَاتٌ:</b> أُنظرْ إلى البَياناتِ الَّتِي جمعَتْها المعلِّمةُ، ثمَّ نَظِّمْهَا في لَوْحَةِ إشاراتٍ وفي جدولٍ تَكراريٍّ.
              </p>
              <Ctrls>
                <NextButton />
              </Ctrls>
              <Solution>
                <Step>الخطوةُ ١: أَنْشِئْ جدولًا يتكوَّنُ منْ عمودَيْنِ، ثمَّ اكتبْ عُنوانًا لهُ.</Step>
                <Step>الخطوةُ ٢: أُكتبْ كلَّ هِوايةٍ في العُمودِ الأوَّلِ.</Step>
                <Step hl={['p0', 'v0']}>الخطوةُ ٣: إستعملْ إشاراتٍ أوْ أعدادًا لتسجيلِ النتائجِ: القراءةُ ٥،</Step>
                <Step hl={['p1', 'v1']}>الخياطةُ ٤،</Step>
                <Step hl={['p2', 'v2']} kind="ans">
                  الرسمُ ٣.
                </Step>
              </Solution>
            </QCol>
            <Box>
              <Stack>
                <TallyBoard title="هِواياتُ الطّالباتِ" head="الهِوايةُ" rows={HOBBIES} reveal />
                <FreqTable title="هِواياتُ الطّالباتِ" head="الهِوايةُ" rows={HOBBIES} reveal />
              </Stack>
            </Box>
          </Cols>
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 4,
      notes: 'نعمل معًا: اختر طالبًا بالعجلة لكل سؤال، واطلب منه أن يعدّ الإشارات بصوت عالٍ: خمسة، ستة، سبعة…',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أقرأ الإشارات</SlideHead>
          <Stack>
            <MCQ q={<>أ) كم تمثّل هذه الإشارات؟ <Tally n={7} /></>} options={['٥', '٦', '٧']} answer="٧" award />
            <MCQ q={<>ب) كيف أمثّل العدد ١٢ بالإشارات؟</>} options={['حزمتان وإشارتان', 'حزمة وسبع إشارات', '١٢ إشارة متتالية']} answer="حزمتان وإشارتان" award />
            <MCQ q="ج) في أيّ الجدولين نكتب الأعداد؟" options={['الجدول التكراري', 'لوحة الإشارات']} answer="الجدول التكراري" award />
          </Stack>
        </>
      ),
    },

    /* ================= مثال ٢ ================= */
    {
      sec: 'elab', min: 3,
      notes: 'مثال ٢ من الكتاب ص ٨٠. ناقش ردود الأفعال: أيّها الأفضل عند رؤية إعلان؟ (أستعين برأي أسرتي).',
      content: (
        <>
          <SlideHead tag="مثالٌ من واقعِ الحياةِ ٢ · ص ٨٠" kind="ex">وسائل التواصل الاجتماعي</SlideHead>
          <Cols style={{ gridTemplateColumns: '1fr 1.15fr' }}>
            <QCol>
              <p className="qtext long">
                <b style={{ color: 'var(--ex)' }}>وسائلُ التَّواصلِ الاجتماعيِّ:</b> سألَ المعلمُ طلابَ الصفِّ الرابعِ الابتدائيِّ عن ردةِ فعلِهِمْ عندَ ظهورِ إعلانٍ حولَ منتجٍ لأحدِ مشروباتِ الطّاقةِ؛ أثناءَ تصفحِهِمْ وسائلَ التَّواصلِ الاجتماعيِّ. ثمَّ نظَّمَ المعلمُ البياناتِ الَّتي جمعَهَا في لوحةِ الإشاراتِ و الجدولِ التِّكراريِّ.
              </p>
              <MCQ q="ما ردّة الفعل التي اختارها أكبر عدد من الطلاب؟" options={['أُبلِّغُ أُسرتِي', 'أُبادرُ بالشراء', 'أَستشيرُ أصدقائِي']} answer="أُبلِّغُ أُسرتِي" award />
            </QCol>
            <Box>
              <Stack>
                <div className="tight">
                  <TallyBoard title="ردودُ أفعالِ الطلابِ" head="ردةُ الفعلِ" rows={REACTIONS} />
                </div>
                <div className="tight">
                  <FreqTable title="ردودُ أفعالِ الطلابِ" head="ردةُ الفعلِ" rows={REACTIONS} />
                </div>
              </Stack>
            </Box>
          </Cols>
        </>
      ),
    },

    /* ================= تأكد ١–٤ ================= */
    {
      sec: 'check', min: 2,
      notes: 'كل خطوة تحوّل عددًا من الجدول إلى إشارات. ذكّر: حزمة لكل خمس.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={90}
          question="يُبيِّنُ الجدولُ الآتِي الوَسائلَ المُختلِفَةَ الَّتي تستعملُها مجموعةٌ مِنَ الطُّلّابِ للوصولِ إلى المدرسةِ. نَظِّمِ البَياناتِ في لَوْحةِ إشاراتٍ."
          hint="١٢ = ٥ + ٥ + ٢: حزمتان وإشارتان."
          steps={[
            { text: 'الحافلةُ ٨ = حزمة وثلاث إشارات.', hl: ['p0', 'v0'] },
            { text: 'السيارةُ ١٢ = حزمتان وإشارتان.', hl: ['p1', 'v1'] },
            { text: 'المشيُ ٦ = حزمة وإشارة.', hl: ['p2', 'v2'] },
            { text: 'لوحة الإشارات مكتملة.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Stack>
                <FreqTable title="كيفَ تصلُ إلَى المدرسةِ؟" head="الوسيلةُ" rows={SCHOOL} />
                <TallyBoard title="كيفَ تصلُ إلَى المدرسةِ؟" head="الوسيلةُ" rows={SCHOOL} reveal />
              </Stack>
            </Box>
          }
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'الأكبر = أكبر عدد في الجدول، والأقل = أصغر عدد.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} time={45}
          question="في المسألةِ ١: ما الوسيلةُ الّتي يستعملُها أكبرُ عددٍ مِنَ الطُّلَّابِ؟ وما الوسيلةُ الّتي يستعملُها أقلُّ عددٍ مِنَ الطُّلّابِ؟"
          hint="قارن الأعداد: ٨ و١٢ و٦."
          steps={[
            { text: 'أكبر عدد ١٢: السيارةُ.', hl: ['p1'] },
            { text: 'أقل عدد ٦: المشيُ.', hl: ['p2'] },
            { text: 'الأكبر: السيارة، والأقل: المشي.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <FreqTable title="كيفَ تصلُ إلَى المدرسةِ؟" head="الوسيلةُ" rows={SCHOOL} />
            </Box>
          }
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من الطلاب عدّ كل لون في البيانات الخام، ثم كتابة العدد في الجدول. تحقق: المجموع ١٠.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} time={90}
          question="سجَّلتْ مريمُ ألـوانَ سمكِ الزّينةِ في حوضِ السَّمكِ، فكانتْ علَى النَّحوِ التَّالي: نَظِّمِ البَياناتِ السابقةَ في جدولٍ تكْرَاريٍّ."
          hint="عدّ كل لون مرة واحدة، وتحقق أن المجموع يساوي عدد الأسماك كلها."
          steps={[
            { text: 'حمراءُ ٣', hl: ['p0', 'v0'] },
            { text: 'زرقاءُ ٣', hl: ['p1', 'v1'] },
            { text: 'صفراءُ ٢', hl: ['p2', 'v2'] },
            { text: 'بيضاءُ ٢', hl: ['p3', 'v3'] },
            { text: 'المجموع ٣ + ٣ + ٢ + ٢ = ١٠ سمكات.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Cols even style={{ alignItems: 'center' }}>
                <Raw title="ألوانُ سمكِ الزِّينةِ" cols={[['حمراءُ', 'حمراءُ', 'حمراءُ', 'صفراءُ', 'صفراءُ'], ['زرقاءُ', 'زرقاءُ', 'زرقاءُ', 'بيضاءُ', 'بيضاءُ']]} />
                <FreqTable title="ألوانُ سمكِ الزِّينةِ" head="اللونُ" rows={FISH} reveal />
              </Cols>
            </Box>
          }
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'تحدث: اطلب من ثلاثة طلاب أن يقول كل منهم سؤال مسح. اقبل كل سؤال يمكن جمع إجاباته وعدّها.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} tags={[{ kind: 'warn', text: 'تحدَّثْ' }]}
          question="إذا أردتَ إجراءَ مسحٍ، فاكتُبْ ثلاثةَ أسئلةٍ يمكنُكَ استعمالُهَا لإجرائِهِ."
          hint="سؤال المسح له إجابات قليلة يمكن عدّها: ما…المفضّل لديك؟"
          steps={[
            { text: 'ما لونُك المفضّل؟' },
            { text: 'كيف تصل إلى المدرسة؟' },
            { text: 'ما رياضتُك المفضّلة؟' },
            { text: 'أسئلة إجاباتها محدّدة، فيمكن تنظيمها في لوحة إشارات أو جدول تكراري.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <TallyBoard title="ما رياضتُك المفضّلة؟" head="الرياضةُ" rows={[['كرةُ القدمِ', 7], ['السباحةُ', 4], ['الجريُ', 3]]} />
            </Box>
          }
        />
      ),
    },

    /* ================= تدرب ٥–٨ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'نظّم في لوحة إشارات. عدّ كل نوع من الفطائر في البيانات الخام أولًا.',
      content: (
        <QuestionSlide
          source={PRACTICE_80} n={5} time={90}
          intro="نَظِّمِ البَياناتِ فِي السُّؤَالَيْنِ الآتِيَيْنِ في لوحةِ إشاراتٍ:"
          question="سَجَّلَ أحمدُ أنواعَ الفَطائرِ الَّتي يفضِّلُها أصدقاؤُه، فكانتْ على النحوِ التالي:"
          hint="عدّ: كم مرة كُتب «الجبن»؟ و«الزعتر»؟ و«اللحم»؟"
          steps={[
            { text: 'الجبنُ ٥: حزمة واحدة.', hl: ['p0', 'v0'] },
            { text: 'الزعترُ ٣: ثلاث إشارات.', hl: ['p1', 'v1'] },
            { text: 'اللحمُ ٢: إشارتان.', hl: ['p2', 'v2'] },
            { text: 'لوحة الإشارات مكتملة، والمجموع ١٠.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Cols even style={{ alignItems: 'center' }}>
                <Raw title="الفطائرُ المُفضَّلةُ" cols={[['الجبنُ', 'الجبنُ', 'الجبنُ', 'الجبنُ'], ['الجبنُ', 'الزعترُ', 'الزعترُ', 'الزعترُ'], ['اللحمُ', 'اللحمُ']]} />
                <TallyBoard title="الفطائرُ المُفضَّلةُ" head="النوعُ" rows={PIES} reveal />
              </Cols>
            </Box>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نظّم في لوحة إشارات. لغتي ٤ إشارات (لا حزمة لأنها أقل من ٥).',
      content: (
        <QuestionSlide
          source={PRACTICE_81} n={6} time={90}
          question="أجرتْ سلمَى مسحًا لمعرفةِ المادَّةِ الدِّراسيَّةِ المفضَّلةِ لدَى صديقاتِها فكانتْ على النحوِ التالي:"
          hint="عدّ كل مادة، ثم ارسم إشارة لكل صديقة."
          steps={[
            { text: 'علومٌ ٣', hl: ['p0', 'v0'] },
            { text: 'رياضياتٌ ٢', hl: ['p1', 'v1'] },
            { text: 'لُغتي ٤', hl: ['p2', 'v2'] },
            { text: 'لوحة الإشارات مكتملة، والمجموع ٩.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Cols even style={{ alignItems: 'center' }}>
                <Raw title="المادَّةُ الدِّراسيَّةُ المفضَّلةُ" cols={[['علومٌ', 'علومٌ', 'علومٌ', 'رياضياتٌ', 'رياضياتٌ'], ['لُغتي', 'لُغتي', 'لُغتي', 'لُغتي']]} />
                <TallyBoard title="المادَّةُ الدِّراسيَّةُ المفضَّلةُ" head="المادةُ" rows={SUBJECTS} reveal />
              </Cols>
            </Box>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نظّم في جدول تكراري: حوّل كل مجموعة إشارات إلى عدد.',
      content: (
        <QuestionSlide
          source={PRACTICE_81} n={7} time={60}
          intro="نَظِّمِ البَياناتِ في السُّؤَالَيْنِ الآتِيَيْنِ في جدولٍ تَكْرَاريٍّ:"
          question={
            <>
              <b style={{ color: 'var(--ex)' }}>القياسُ:</b> سجَّلَ عادلٌ درجاتِ الحرارةِ خلالَ أُسبوعٍ عَلَى النَّحْوِ التَّالِي:
            </>
          }
          hint="عدّ الإشارات في كل صف واكتب العدد."
          steps={[
            { text: '٢٠ – ٢٤: يومان', hl: ['p0', 'v0'] },
            { text: '٢٥ – ٢٩: ٣ أيام', hl: ['p1', 'v1'] },
            { text: '٣٠ – ٣٤: يوم واحد', hl: ['p2', 'v2'] },
            { text: '٣٥ – ٣٩: يوم واحد', hl: ['p3', 'v3'] },
            { text: 'المجموع ٧ أيام: أسبوع كامل.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Stack className="tight">
                <TallyBoard title="درجاتُ الحرارةِ في أسبوعٍ" head="درجةُ الحرارةِ (س°)" rows={TEMPS} tone="orange" />
                <FreqTable title="درجاتُ الحرارةِ في أسبوعٍ" head="درجةُ الحرارةِ (س°)" rows={TEMPS} count="عددُ الأيامِ" reveal />
              </Stack>
            </Box>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نظّم في جدول تكراري. البيانات في ثلاثة أعمدة: عدّ كل نشاط في الأعمدة كلها. تحقق: المجموع ١٥.',
      content: (
        <QuestionSlide
          source={PRACTICE_81} n={8} time={90}
          question="أُجْرِيَ مَسْحٌ حولَ نشاطاتِ الطُّلَّابِ في أوقاتِ فراغِهِمْ، فكانتْ على النحوِ التالي:"
          hint="ضع علامة على كل كلمة تعدّها حتى لا تعدّها مرتين."
          steps={[
            { text: 'كرةُ القدمِ ٤', hl: ['p0', 'v0'] },
            { text: 'الرَّسمُ ٣', hl: ['p1', 'v1'] },
            { text: 'السِّباحةُ ٥', hl: ['p2', 'v2'] },
            { text: 'القراءةُ ٣', hl: ['p3', 'v3'] },
            { text: 'المجموع ٤ + ٣ + ٥ + ٣ = ١٥ طالبًا.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Stack>
                <Raw
                  title="نشاطاتُ الطُّلّابِ في أوقاتِ الفراغِ"
                  cols={[
                    ['كرةُ القدمِ', 'كرةُ القدمِ', 'كرةُ القدمِ', 'كرةُ القدمِ', 'الرَّسمُ'],
                    ['الرَّسمُ', 'الرَّسمُ', 'السِّباحةُ', 'السِّباحةُ', 'السِّباحةُ'],
                    ['السِّباحةُ', 'السِّباحةُ', 'القراءةُ', 'القراءةُ', 'القراءةُ'],
                  ]}
                />
                <FreqTable title="نشاطاتُ الطُّلّابِ" head="النشاطُ" rows={ACTIVITIES} reveal />
              </Stack>
            </Box>
          }
        />
      ),
    },

    /* ================= تدرب ٩–١٢ ================= */
    {
      sec: 'practice', min: 1,
      notes: 'اقرأ لوحة الإشارات: حزمة = ٥.',
      content: (
        <QuestionSlide
          source={PRACTICE_81} n={9} time={45}
          intro={toolsIntro}
          question="أيُّ الأدواتِ بِيعَ منهُا أكثرُ ؟ ومَا عددُ ما بِيعَ منْهَا؟"
          hint="ابحث عن الصف الذي فيه أكثر إشارات."
          steps={[
            { text: 'القلمُ الرصاصُ: حزمة (٥) وثلاث إشارات.', hl: ['p2'] },
            { text: 'القلمُ الرصاصُ، بِيعَ منه ٨ أقلام.', kind: 'ans' },
          ]}
          chart={<Box>{tools}</Box>}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'إشارة واحدة = قطعة واحدة.',
      content: (
        <QuestionSlide
          source={PRACTICE_81} n={10} time={30}
          question="ما الأداةُ التي بِيعَ منهُا قِطعةٌ واحدةٌ فقطْ ؟"
          hint="ابحث عن الصف الذي فيه إشارة واحدة."
          steps={[{ text: 'المقصُّ', hl: ['p3'], kind: 'ans' }]}
          chart={<Box>{tools}</Box>}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'اجمع أعداد الصفوف الأربعة.',
      content: (
        <QuestionSlide
          source={PRACTICE_81} n={11} time={60}
          question="ما مجموعُ ما بِيعَ مِنَ الأدواتِ كافَّةً ؟"
          hint="حوّل كل صف إلى عدد، ثم اجمع."
          steps={[
            { text: '٥ + ٢ + ٨ + ١', hl: ['p0', 'p1', 'p2', 'p3'] },
            { text: '١٦ أداةً', kind: 'ans' },
          ]}
          chart={<Box>{tools}</Box>}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'يكتب الطلاب الجدول التكراري في دفاترهم، ثم تُكشف الأعداد.',
      content: (
        <QuestionSlide
          source={PRACTICE_81} n={12} time={60}
          question="نَظِّمِ البياناتِ في جدولٍ تكراريٍّ."
          hint="عنوان الجدول، ثم الأدوات في العمود الأول، والأعداد في الثاني."
          steps={[
            { text: 'المِحاةُ ٥', hl: ['p0', 'v0'] },
            { text: 'الصمغُ ٢', hl: ['p1', 'v1'] },
            { text: 'القلمُ الرصاصُ ٨', hl: ['p2', 'v2'] },
            { text: 'المقصُّ ١', hl: ['p3', 'v3'] },
            { text: 'الجدول التكراري مكتمل.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Stack className="tight">
                {tools}
                <FreqTable title="الأدواتُ المدرسيَّةُ المبيعةُ خلالَ ساعةٍ" head="الأدواتُ" rows={TOOLS} reveal />
              </Stack>
            </Box>
          }
        />
      ),
    },

    /* ================= مهارات التفكير العليا ١٣–١٤ ================= */
    {
      sec: 'hot', min: 2,
      notes: 'مسألة مفتوحة: اقبل كل إجابة معقولة. اعرض الجدولين جنبًا إلى جنب للمقارنة.',
      content: (
        <QuestionSlide
          source={HOT} n={13} tps
          question={
            <>
              <b style={{ color: 'var(--ex)' }}>مسألةٌ مفتوحةٌ:</b> مَا أوجُهُ التشابُهِ والاختلافِ بينَ الجدولِ التِّكراريِّ ولوحةِ الإشاراتِ؟
            </>
          }
          hint="ماذا يعرض كل منهما؟ وكيف يسجّل النتائج؟"
          steps={[
            { text: 'التشابه: كلاهما ينظّم البيانات في جدول له عنوان وعمودان.' },
            { text: 'الاختلاف: لوحة الإشارات تستعمل الإشارات، والجدول التكراري يستعمل الأعداد.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Stack>
                <TallyBoard title="هِواياتُ الطّالباتِ" head="الهِوايةُ" rows={HOBBIES} />
                <FreqTable title="هِواياتُ الطّالباتِ" head="الهِوايةُ" rows={HOBBIES} />
              </Stack>
            </Box>
          }
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'أكتب: يكتب كل طالب إجابته في دفتره، ثم يقرأ اثنان. سكان المدينة أعداد كبيرة جدًا.',
      content: (
        <QuestionSlide
          source={HOT} n={14} tags={[{ kind: 'warn', text: 'أكتُبُ' }]}
          question="أيُّها أفضلُ؛ تنظيمُ بياناتٍ جَمَعْتَهَا عنْ سُكَّانِ مدينتِكَ، في جدولٍ تكراريٍّ أَمْ في لوحةِ إشاراتٍ؟ فسِّرْ إجابتَكَ."
          hint="كم عدد سكان مدينتك تقريبًا؟ هل يمكن رسم إشارة لكل واحد منهم؟"
          steps={[
            { text: 'عدد السكان كبير جدًا، فرسم إشارة لكل شخص صعب ويأخذ وقتًا طويلًا.' },
            { text: 'الجدول التكراري أفضل؛ لأنه يستعمل الأعداد.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <FreqTable title="سكانُ حيٍّ" head="الفئةُ" rows={[['الأطفالُ', 1250], ['الشبابُ', 2340], ['الكبارُ', 1810]]} />
            </Box>
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
            center={<>جمع البيانات<br />وتنظيمها</>}
            items={[
              { kind: 'rule', cap: 'المسح', text: 'طريقة لجمع البيانات: نسأل ونسجّل الإجابات.' },
              { kind: 'ex', cap: 'لوحة الإشارات', text: 'إشارة لكل إجابة، وكل خمس حزمة.' },
              { kind: 'qs', cap: 'الجدول التكراري', text: 'نكتب عدد كل إجابة.' },
              { kind: 'warn', cap: 'أقرأ', text: 'الأكثر والأقل والمجموع.' },
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
          <SlideHead tag="تذكرة الخروج" kind="qs">ألعاب الفسحة</SlideHead>
          <Cols style={{ gridTemplateColumns: '1fr 1.25fr' }}>
            <Box>
              <TallyBoard title="ألعابُ الفسحةِ" head="اللعبةُ" rows={[['كرةُ القدمِ', 9], ['الحبلُ', 6], ['الكرةُ الطائرةُ', 4]]} />
            </Box>
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="كم طالبًا يلعب بالحبل؟" options={['٥', '٦', '٧']} answer="٦" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="ما اللعبة الأقل؟" options={['كرةُ القدمِ', 'الحبلُ', 'الكرةُ الطائرةُ']} answer="الكرةُ الطائرةُ" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="كم يزيد لاعبو كرة القدم على لاعبي الكرة الطائرة؟" options={['٣', '٥', '١٣']} answer="٥" /></Card>
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
