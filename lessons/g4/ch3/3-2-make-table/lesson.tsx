import { useState } from 'react';
import {
  Card, Cols, Ctrls, DataGrid, Eq, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, QCol, QuestionSlide, SlideHead, Solution, Stack,
  Step, Winner, defineLesson, num, useRemoteWidget, type Cell, type HlKey,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const ANALYZE = 'حلِّلِ الخُطَّةَ · ص ٨٣';
const PRACTICE = 'تدرَّبْ علَى الخُطَّةِ · ص ٨٣';

/**
 * جدول نمط أفقي كما في الكتاب: الصف الأول عناوين، والعمود j (بعد العناوين) يظهر مع خطوة فيها hl ‹v{j}›
 * إن كان رقمه في hide، ويُبرز بمفتاح p{j}.
 */
function Pattern({ heads, rows, hide = [], tone = 'green', small }: { heads: string[]; rows: (number | string)[][]; hide?: number[]; tone?: 'green' | 'blue'; small?: boolean }) {
  const grid: Cell[][] = heads.map((h, r) => [h, ...rows[r].map((v, j): Cell => (hide.includes(j) ? { v, k: `v${j}` as HlKey } : v))]);
  return <DataGrid orient="cols" tone={tone} rows={grid} small={small} />;
}

const Box = ({ children }: { children: React.ReactNode }) => <div className="chart tbl">{children}</div>;
const seq = (a: number, n: number) => Array.from({ length: n }, (_, i) => a * (i + 1));
const all = (n: number) => Array.from({ length: n }, (_, i) => i);

/** جدول الرحلة: معلِّمان لكل ٩ طلاب */
const TRIP = (hide: number[] = []) => <Pattern heads={['عددُ المعلِّمينَ', 'عددُ الطُّلّابِ']} rows={[seq(2, 8), seq(9, 8)]} hide={hide} />;

/** مستكشف: ما يزيده كل صف، وعدد الأعمدة الظاهرة */
function PatternExplorer() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(9);
  const [cols, setCols] = useState(3);
  const fit = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
  useRemoteWidget(
    () => ({
      title: 'جدول النمط',
      info: `${num(a * cols)} ← ${num(b * cols)}`,
      steppers: [
        { key: 'a', label: 'يزيد الصف الأول', value: a, min: 1, max: 9 },
        { key: 'b', label: 'يزيد الصف الثاني', value: b, min: 1, max: 12 },
      ],
      buttons: [
        { key: 'next', label: 'العمود التالي', on: true, disabled: cols >= 8 },
        { key: 'reset', label: 'من جديد' },
      ],
    }),
    (k, v) => {
      if (k === 'a' && v !== undefined) setA(fit(v, 1, 9));
      else if (k === 'b' && v !== undefined) setB(fit(v, 1, 12));
      else if (k === 'next') setCols((c) => Math.min(8, c + 1));
      else if (k === 'reset') setCols(1);
    },
    [a, b, cols],
  );
  const stepper = (label: string, v: number, set: (v: number) => void, hi: number) => (
    <div className="ffstep">
      <span>{label}</span>
      <button aria-label={`إنقاص ${label}`} disabled={v <= 1} onClick={() => set(fit(v - 1, 1, hi))}>
        −
      </button>
      <b>{num(v)}</b>
      <button aria-label={`زيادة ${label}`} disabled={v >= hi} onClick={() => set(fit(v + 1, 1, hi))}>
        +
      </button>
    </div>
  );
  return (
    <Stack>
      <div className="hopx-ctrl">
        {stepper('يزيد الصف الأول', a, setA, 9)}
        {stepper('يزيد الصف الثاني', b, setB, 12)}
        <button className="btn step-btn" disabled={cols >= 8} onClick={() => setCols((c) => c + 1)}>
          العمود التالي
        </button>
        <button className="btn" onClick={() => setCols(1)}>
          من جديد
        </button>
      </div>
      <Box>
        <Pattern heads={['الصفُّ الأوَّلُ', 'الصفُّ الثاني']} rows={[seq(a, cols), seq(b, cols)]} />
      </Box>
    </Stack>
  );
}

export default defineLesson({
  meta: {
    id: 'g4-3-2-make-table',
    code: '٣-٢',
    title: 'خُطَّةُ حَلِّ الْمَسْأَلَةِ: إنشاءُ جدولٍ',
    shortTitle: 'خطة حل المسألة: إنشاء جدول',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الثالث: تنظيم البيانات وعرضها وتفسيرها',
    source: 'الجزء الأول · ص ٨٢–٨٣',
    minutes: 45,
    idea: 'أستعملُ خطَّةَ إنشاءِ جدولٍ لأحلَّ المسألةَ.',
    bookQuestions: 13,
  },
  sectionDesc: {
    engage: 'الرحلة العلمية',
    explore: 'جدول النمط',
    explain: 'أفهم · أخطّط · أحلّ · أتحقّق',
    elab: 'نعمل معًا',
    check: 'حلّل الخطة: ١–٤',
    practice: 'تدرّب على الخطة: ٥–١٣',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. ذكّر بخطوات حل المسألة الأربع: أفهم، أخطّط، أحلّ، أتحقّق.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أستعملُ خطَّةَ إنشاءِ جدولٍ لأحلَّ المسألةَ.</Card>
              <Card kind="rule" cap="خطوات حل المسألة">
                <Mark>أفهمْ</Mark> · <Mark>خطّطْ</Mark> · <Mark>حُلَّ</Mark> · <Mark>تحقّقْ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أنشئ جدولًا يُظهر النمط في المسألة.</li>
                <li>أكمل الجدول حتى أصل إلى الإجابة.</li>
                <li>أتحقق من إجابتي بعملية أخرى.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },


    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'start', min: 1,
      notes: 'مقطع قصير (أقل من دقيقة) لا يبدأ إلا عندما تضغط تشغيل. أوقفه بعد ظهور ثلاثة أعمدة واسأل: ما العمود التالي؟ كيف عرفت؟ يمكن تشغيله وإيقافه من الجوال.',
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
      notes: 'اقرأ المسألة من الكتاب ص ٨٢، ودع الطلاب يخمّنون. لا تصحح الآن؛ سنحلها بالجدول.',
      content: (
        <>
          <SlideHead tag="ص ٨٢" kind="qs">الرحلة العلمية</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">ذهبَ طُلّابُ الصَّفِّ الرّابعِ في رحلةٍ عِلْميَّةٍ برُفْقَةِ مُعلِّميهِم، فَاصْطَحَبَ كُلُّ مُعلِّمَيْنِ مجموعةً منْ ٩ طُلّابٍ. فإذَا كانَ عددُ المعلِّمينَ المُرافِقينَ ١٦ مُعلِّمًا، فمَا عددُ الطُّلّابِ في تِلْكَ الرِّحلةِ؟</p>
              <Card kind="qs" cap="خمّن">أكثر من ٥٠ طالبًا أم أقل؟</Card>
            </QCol>
            <Card kind="ex" cap="ما الذي يتكرر؟">
              <p style={{ margin: 0, fontWeight: 700, lineHeight: 1.9 }}>
                كل مجموعة: <b>٢</b> معلِّمان و<b>٩</b> طلاب.
                <br />
                مجموعتان: ٤ معلِّمين و١٨ طالبًا.
                <br />
                ثلاث مجموعات: …؟
              </p>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا يختار ما يزيده كل صف، ثم يضغط «العمود التالي». اسأل قبل كل ضغطة: ما العددان في العمود التالي؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">جدول ينمو بنمط</SlideHead>
          <p style={{ fontSize: '.82em', fontWeight: 700, margin: 0 }}>اختر ما يزيده كل صف، ثم أضف عمودًا عمودًا. هل تتوقع العمود التالي قبل أن يظهر؟</p>
          <PatternExplorer />
          <Card kind="rule" cap="لاحظ">في كل عمود جديد يزيد كل صف بالمقدار نفسه. هذا هو النمط.</Card>
        </>
      ),
    },

    /* ================= أفهم · أخطط · أحل · أتحقق ================= */
    {
      sec: 'explain', min: 6,
      notes: 'أنا أعمل: نفّذ الخطوات الأربع كما في الكتاب ص ٨٢. مع خطوة «حلّ» تظهر أعمدة الجدول عمودًا عمودًا.',
      content: (
        <>
          <SlideHead tag="خُطَّةُ حَلِّ المسألةِ · ص ٨٢" kind="ex">أفهم · أخطّط · أحلّ · أتحقّق</SlideHead>
          <Cols style={{ gridTemplateColumns: '1fr 1.1fr' }}>
            <QCol>
              <Ctrls>
                <NextButton />
              </Ctrls>
              <Solution>
                <Step>
                  <b>افْهَمْ:</b> هناكَ معلِّمَانِ مُرافِقانِ لكلِّ مجموعةٍ منْ ٩ طُلّابٍ، والعددُ الكُلِّيُّ للمعلِّمينَ ١٦ مُعلِّمًا. المطلوبُ: عددُ الطُّلّابِ في تلكَ الرِّحلةِ.
                </Step>
                <Step>
                  <b>خَطِّطْ:</b> يُمكنُكَ إنشاءُ جدولٍ لحلِّ المسألةِ.
                </Step>
                <Step hl={['v0', 'v1', 'v2', 'v3']}>
                  <b>حُلَّ:</b> أَنْشِئْ جدولًا يُظْهِرُ أنَّ هناكَ مُعَلِّمَيْنِ لكلِّ ٩ طُلّابٍ: +٢ و+٩ في كل عمود.
                </Step>
                <Step hl={['v4', 'v5', 'v6', 'v7', 'p7']} kind="ans">
                  إذَنْ عددُ الطُّلّابِ في تلكَ الرِّحلةِ هو ٧٢ طالبًا.
                </Step>
                <Step>
                  <b>تَحَقَّقْ:</b> <Eq>١٦ ÷ ٢ = ٨</Eq> مجموعات، و<Eq>٨ × ٩ = ٧٢</Eq> طالبًا. الإجابةُ صحيحةٌ ✓
                </Step>
              </Solution>
            </QCol>
            <Box>{TRIP(all(8))}</Box>
          </Cols>
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 4,
      notes: 'نعمل معًا: اختر طالبًا بالعجلة، واطلب منه أن يكمل الجدول بصوت عالٍ قبل أن يختار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أكمل النمط</SlideHead>
          <Cols style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
            <Box>
              <Pattern heads={['عددُ الصناديقِ', 'عددُ الأقلامِ']} rows={[[1, 2, 3, 4], [6, 12, 18, '؟']]} />
            </Box>
            <Stack>
              <MCQ q="أ) ما العدد المكان «؟»" options={['٢٠', '٢٤', '٣٠']} answer="٢٤" award />
              <MCQ q="ب) كم قلمًا في ٦ صناديق؟" options={['٣٠', '٣٦', '٤٢']} answer="٣٦" award />
              <MCQ q="ج) ما النمط في صف الأقلام؟" options={['يزيد ٦ كل مرة', 'يزيد ٢ كل مرة', 'يتضاعف كل مرة']} answer="يزيد ٦ كل مرة" award />
            </Stack>
          </Cols>
        </>
      ),
    },

    /* ================= حلّل الخطة ١–٤ ================= */
    {
      sec: 'check', min: 2,
      notes: 'اطلب من الطلاب وصف طريقة إكمال الجدول بكلماتهم.',
      content: (
        <QuestionSlide
          source={ANALYZE} n={1} tps
          intro="ارْجِعْ إلى المسألةِ السَّابقةِ ثمَّ أَجِبْ عنِ الأسئلةِ ١-٤:"
          question="وضِّحْ كيفَ اسْتُعْمِلَ الجدولُ لإيجادِ عددِ الطُّلّابِ في الرِّحلةِ."
          hint="ماذا أضفنا في كل عمود؟ ومتى توقفنا؟"
          steps={[
            { text: 'بدأنا بمعلِّمَين و٩ طلاب.', hl: ['p0'] },
            { text: 'في كل عمود أضفنا ٢ إلى المعلِّمين و٩ إلى الطلاب.' },
            { text: 'توقفنا عندما وصل عدد المعلِّمين إلى ١٦، فكان عدد الطلاب ٧٢.', hl: ['p7'], kind: 'ans' },
          ]}
          chart={<Box>{TRIP()}</Box>}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'النمط في كل صف على حدة.',
      content: (
        <QuestionSlide
          source={ANALYZE} n={2} time={30}
          question="مَا النَّمطُ الَّذِي يُظْهِرُهُ الجدولُ؟"
          hint="بكم يزيد كل صف من عمود إلى العمود الذي يليه؟"
          steps={[
            { text: 'عدد المعلِّمين يزيد ٢ كل مرة: ٢، ٤، ٦، …', hl: ['p1', 'p2'] },
            { text: 'عدد الطلاب يزيد ٩ كل مرة: ٩، ١٨، ٢٧، …', kind: 'ans' },
          ]}
          chart={<Box>{TRIP()}</Box>}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'عدد الطلاب ٧٢ لا يتغير، والذي تغيّر هو عدد الطلاب لكل معلِّم. الجدول طويل، فاختصره أو قسّم.',
      content: (
        <QuestionSlide
          source={ANALYZE} n={3} time={90}
          question="إذا افترضْنَا أنَّ معلِّمًا واحدًا يصطحبُ كلَّ ٣ طُلّابٍ، فمَا عددُ المعلِّمينَ المُرافِقِينَ في تلكَ الرِّحلةِ؟"
          hint="عدد الطلاب ما زال ٧٢. كم مجموعة من ٣ طلاب في ٧٢؟"
          steps={[
            { text: 'معلِّم لكل ٣ طلاب: ١ ← ٣، ٢ ← ٦، ٣ ← ٩، …', hl: ['p0', 'p1', 'p2'] },
            { text: <Eq>٧٢ ÷ ٣ = ٢٤</Eq>, hl: ['v4'] },
            { text: '٢٤ معلِّمًا', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Pattern heads={['عددُ المعلِّمينَ', 'عددُ الطُّلّابِ']} rows={[[1, 2, 3, '…', 24], [3, 6, 9, '…', 72]]} hide={[4]} />
            </Box>
          }
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'التحقق بعملية عكسية: الضرب يتحقق من القسمة.',
      content: (
        <QuestionSlide
          source={ANALYZE} n={4} time={45}
          question="اِرجِعْ إلى المَسْألَةِ ٣، كيفَ تعرفُ أنَّ إجابتَكَ صحيحةٌ؟"
          hint="اضرب عدد المعلِّمين في عدد الطلاب مع كل معلِّم."
          steps={[
            { text: <Eq>٢٤ × ٣ = ٧٢</Eq> },
            { text: 'الناتج ٧٢ يساوي عدد الطلاب في الرحلة، فالإجابة صحيحة.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Pattern heads={['عددُ المعلِّمينَ', 'عددُ الطُّلّابِ']} rows={[[1, 2, 3, '…', 24], [3, 6, 9, '…', 72]]} />
            </Box>
          }
        />
      ),
    },

    /* ================= تدرّب على الخطة ٥–١٣ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'الساعة = ٦٠ دقيقة. كل خطوة تملأ مربعًا من الجدول.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={5} time={90}
          intro="حُلَّ كُلًّا من المسائلِ الآتيةِ باستعمالِ خُطَّةِ إنشاءِ جدولٍ:"
          question={
            <>
              <b style={{ color: 'var(--ex)' }}>الجبرُ:</b> طُولُ اليومِ الدِّراسيِّ في مدرسةِ آمِنَةَ ٦ساعاتٍ. أَكْمِلِ الجدولَ الآتيَ لتعرفَ هلِ اليومُ الدِّراسيُّ في مدرسةِ آمنةَ أطولُ أمْ أقصرُ منْ ٣٠٠ دقيقةٍ.
            </>
          }
          long
          hint="كل ساعة تضيف ٦٠ دقيقة."
          steps={[
            { text: '٣ ساعات = ١٨٠ دقيقة', hl: ['v2', 'p2'] },
            { text: '٤ ساعات = ٢٤٠ دقيقة', hl: ['v3', 'p3'] },
            { text: '٥ ساعات = ٣٠٠ دقيقة', hl: ['v4', 'p4'] },
            { text: '٦ ساعات = ٣٦٠ دقيقة', hl: ['v5', 'p5'] },
            { text: '٣٦٠ أكبر من ٣٠٠؛ إذن اليوم الدراسي أطولُ من ٣٠٠ دقيقة.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Pattern heads={['عددُ السَّاعاتِ', 'عددُ الدَّقائقِ']} rows={[[1, 2, 3, 4, 5, 6], seq(60, 6)]} hide={[2, 3, 4, 5]} />
            </Box>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'المال لا يكفي لشطيرة تاسعة (١٨ ريالًا)، ويتبقى ريال.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={6} time={90}
          question="إذا كانَ معَ رزانَ ١٧ ريالًا، وأرادَتْ أنْ تشتريَ شَطَائِرَ، ثمنُ الشَّطيرةِ الواحدةِ ريالانِ، فكمْ شَطيرةً يمكنُهَا أنْ تشتريَ؟"
          hint="أكمل الجدول حتى لا يكفي المال لشطيرة أخرى."
          steps={[
            { text: 'كل شطيرة تزيد الثمن ريالين.', hl: ['v0', 'v1', 'v2', 'v3'] },
            { text: '٨ شطائر بـ ١٦ ريالًا، و٩ شطائر بـ ١٨ ريالًا (أكثر من ١٧).', hl: ['v4', 'v5', 'v6', 'v7', 'p7'] },
            { text: '٨ شطائر، ويتبقى معها ريال واحد.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Pattern heads={['عددُ الشَّطائرِ', 'الثَّمنُ (ريال)']} rows={[[1, 2, 3, 4, 5, 6, 7, 8], seq(2, 8)]} hide={all(8)} />
            </Box>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'يمكن الحل بالقسمة أيضًا: ٣٢ ÷ ٤ = ٨.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={7} time={60}
          question="إذا كانتْ تكلفةُ شحنِ الكتابِ الواحدِ ٤ ريالاتٍ، فكمْ كتابًا يمكنُ شحنُه بـ ٣٢ ريالًا؟"
          hint="كل كتاب يضيف ٤ ريالات."
          steps={[
            { text: '٤، ٨، ١٢، ١٦، ٢٠، ٢٤، ٢٨، ٣٢', hl: all(8).map((j) => `v${j}` as HlKey) },
            { text: '٨ كتبٍ', hl: ['p7'], kind: 'ans' },
          ]}
          chart={
            <Box>
              <Pattern heads={['عددُ الكتبِ', 'التكلفةُ (ريال)']} rows={[[1, 2, 3, 4, 5, 6, 7, 8], seq(4, 8)]} hide={all(8)} />
            </Box>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'ثلاثة صفوف: المحاولات تزيد ٥، الناجحة تزيد ٢، النقاط تزيد ٤.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={8} time={120}
          question="سجَّلَ وليدٌ ٢٤ نقطةً في مباراةِ كرةِ سَلَّةٍ، وكانَ قدْ نجحَ في محاولتَيْنِ منْ كلِّ ٥ محاولاتٍ في أثناءِ المباراةِ. إذا كانتْ كلُّ محاولةٍ ناجحةٍ تُكسبُهُ نقطتَيْنِ، فكمْ مرَّةً حاولَ أنْ يسدِّدَ خلالَ المُباراةِ؟"
          long
          hint="كل ٥ محاولات = محاولتان ناجحتان = ٤ نقاط."
          steps={[
            { text: 'كل ٥ محاولات تعطي ٤ نقاط.', hl: ['v0', 'p0'] },
            { text: 'أكمل حتى تصل النقاط إلى ٢٤.', hl: ['v1', 'v2', 'v3', 'v4', 'v5', 'p5'] },
            { text: '٣٠ مرَّةً', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Pattern heads={['المحاولاتُ', 'الناجحةُ', 'النقاطُ']} rows={[seq(5, 6), seq(2, 6), seq(4, 6)]} hide={all(6)} />
            </Box>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'انتبه: «أكثر من ١٠٠٠»، فـ ١٢ أسبوعًا (٩٠٠) لا تكفي.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={9} time={90}
          question="يتقاضَى عاملٌ ١٥٠ ريالًا كلَّ أُسبوعيْنِ مقابلَ عملٍ إضافيٍّ. فكمْ أُسبوعًا يجبُ عليهِ أنْ يعملَ إضافيًّا ليكسبَ أكثرَ منْ ١٠٠٠ ريالٍ؟"
          hint="كل أسبوعين يضيفان ١٥٠ ريالًا. توقف عندما يتجاوز المبلغ ١٠٠٠."
          steps={[
            { text: '١٢ أسبوعًا = ٩٠٠ ريال، وهذا أقل من ١٠٠٠.', hl: ['v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'p5'] },
            { text: '١٤ أسبوعًا = ١٠٥٠ ريالًا، وهذا أكثر من ١٠٠٠.', hl: ['v6', 'p6'] },
            { text: '١٤ أسبوعًا', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Pattern heads={['الأسابيعُ', 'الأجرُ (ريال)']} rows={[seq(2, 7), seq(150, 7)]} hide={all(7)} small />
            </Box>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: '٣٠ ريالًا = ٦ مرات × ٥ ريالات، فالمال ٦ × ٢٠٠.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={10} time={90}
          question="تتصدقُ فاطمةُ بـ ٥ ريالاتٍ عنْ كلِّ ٢٠٠ ريالٍ ممَّا عندَهَا، فإذَا تصدقت بـ ٣٠ ريالًا، فكمْ ريالًا كانَ معهَا؟"
          hint="كل ٥ ريالات صدقة تقابل ٢٠٠ ريال."
          steps={[
            { text: 'الصدقة تزيد ٥، والمال يزيد ٢٠٠.', hl: ['v0', 'v1', 'v2'] },
            { text: 'صدقة ٣٠ ريالًا تقابل ١٢٠٠ ريال.', hl: ['v3', 'v4', 'v5', 'p5'] },
            { text: '١٢٠٠ ريالٍ', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Pattern heads={['الصدقةُ (ريال)', 'المالُ (ريال)']} rows={[seq(5, 6), seq(200, 6)]} hide={all(6)} />
            </Box>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'الجدول رأسي كما في الكتاب: كل يوم يضيف ٤٠ دقيقة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={11} time={60}
          question={
            <>
              <b style={{ color: 'var(--ex)' }}>الجبرُ:</b> يقضِي محمدٌ ٤٠ دقيقةً يوميًّا في ممارسةِ المشيِ. أكملِ الجدولَ التاليَ لتجدَ عددَ الدقائقِ الَّتي يمشِيهَا في ٥ أيامٍ؟
            </>
          }
          hint="أضف ٤٠ في كل يوم."
          steps={[
            { text: 'الرابعُ: ١٢٠ + ٤٠ = ١٦٠', hl: ['v3', 'p3'] },
            { text: 'الخامسُ: ١٦٠ + ٤٠ = ٢٠٠', hl: ['v4', 'p4'] },
            { text: '٢٠٠ دقيقةٍ', kind: 'ans' },
          ]}
          chart={
            <Box>
              <DataGrid
                tone="green"
                head={['اليومُ', 'الوقتُ (دقيقة)']}
                rows={[
                  ['الأولُ', 40],
                  ['الثاني', 80],
                  ['الثالثُ', 120],
                  ['الرابعُ', { v: 160, k: 'v3' }],
                  ['الخامسُ', { v: 200, k: 'v4' }],
                ]}
              />
            </Box>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'المطلوب تقدير: نستعمل ٥٠٠٠ في السنة. ناقش مع الطلاب أضرار التدخين.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={12} time={90}
          question={
            <>
              <b style={{ color: 'var(--bad)' }}>أضرارُ التدخينِ:</b> يُعـدُّ التَّدخينُ مـنْ أكثرِ مسبباتِ الموتِ الَّتي يمكنُ الوقايةُ منهَا؛ على مُستوى العالمِ، حيثُ يودي التَّدخينُ بحياةِ ٩٢ شخصًا كلَّ أسبوعٍ، أيْ ما يعادلُ ٥٠٠٠ شخصٍ كلَّ عامٍ. قدّرْ عددَ الوفيَّاتِ النَّاجمةِ عنِ التَّدخينِ خلالَ ستَّةِ أعوامٍ. اشرحْ إجابتَكَ.
            </>
          }
          long
          hint="كل عام يضيف ٥٠٠٠ تقريبًا."
          steps={[
            { text: 'أنشئ جدولًا: كل عام يزيد ٥٠٠٠.', hl: ['v0', 'v1', 'v2'] },
            { text: 'بعد ستة أعوام:', hl: ['v3', 'v4', 'v5', 'p5'] },
            { text: 'حوالي ٣٠٠٠٠ شخصٍ', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Pattern heads={['الأعوامُ', 'الوفيَّاتُ (تقريبًا)']} rows={[[1, 2, 3, 4, 5, 6], seq(5000, 6)]} hide={all(6)} small />
            </Box>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'أكتب: يكتب كل طالب سببًا، ثم يقرأ اثنان.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={13} tags={[{ kind: 'warn', text: 'أكتُبُ' }]}
          question="لماذَا تُعَدُّ خُطَّةُ إنشاءِ جدولٍ هيَ الأنسبَ لحلِّ المسألةِ ١٠؟"
          hint="ما الذي يتكرر في المسألة ١٠؟"
          steps={[
            { text: 'في المسألة كمّيتان تزيدان معًا بنمط ثابت: ٥ ريالات صدقة لكل ٢٠٠ ريال.' },
            { text: 'الجدول ينظّم الأعداد ويُظهر النمط، فنكمله حتى نصل إلى ٣٠ ريالًا.', kind: 'ans' },
          ]}
          chart={
            <Box>
              <Pattern heads={['الصدقةُ (ريال)', 'المالُ (ريال)']} rows={[seq(5, 6), seq(200, 6)]} />
            </Box>
          }
        />
      ),
    },

    /* ================= الختام ================= */
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب ترتيب الخطوات الأربع شفهيًا.',
      content: (
        <>
          <SlideHead tag="ملخص الدرس" kind="rule">خريطة ذهنية</SlideHead>
          <MindMap
            center={<>خطة إنشاء<br />جدول</>}
            items={[
              { kind: 'rule', cap: 'أفهم', text: 'ما المعطيات؟ وما المطلوب؟' },
              { kind: 'ex', cap: 'أخطّط', text: 'كمّيتان تزيدان بنمط ← أنشئ جدولًا.' },
              { kind: 'qs', cap: 'أحلّ', text: 'أكمل الجدول عمودًا عمودًا حتى الإجابة.' },
              { kind: 'warn', cap: 'أتحقّق', text: 'بعملية أخرى: الضرب أو القسمة.' },
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
          <SlideHead tag="تذكرة الخروج" kind="qs">علب العصير</SlideHead>
          <Cols style={{ gridTemplateColumns: '1fr 1.25fr' }}>
            <Box>
              <Pattern heads={['عددُ الكراتينِ', 'عددُ العلبِ']} rows={[[1, 2, 3, '؟'], [6, 12, 18, 24]]} />
            </Box>
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="بكم يزيد عدد العلب كل مرة؟" options={['٣', '٦', '١٢']} answer="٦" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="ما العدد المكان «؟»" options={['٤', '٥', '٢٤']} answer="٤" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="كم كرتونًا يلزم لـ ٤٨ علبة؟" options={['٦', '٨', '١٢']} answer="٨" /></Card>
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
