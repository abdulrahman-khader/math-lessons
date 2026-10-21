import { useState } from 'react';
import {
  Card, Cols, Ctrls, Domino, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, QCard, QCol, QuestionSlide, Sentence, SlideHead,
  Solution, Stack, Step, Tag, TimerButton, VSum, Winner, defineLesson, num, useRemoteWidget, type Token,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ · ص ٧٤';
const PRACTICE = 'أتدرَّبُ · ص ٧٤–٧٥';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ٧٥';
const FIND_DOTS = 'أَجِدُ الْعَدَدَ الْمَفْقُودَ فِي جُمْلَةِ الْجَمْعِ مُسْتَعِينًا بِرَسْمِ النِّقَاطِ:';
const FIND = 'أَجِدُ الْعَدَدَ الْمَفْقُودَ فِي جُمْلَةِ الْجَمْعِ:';

/** مستكشف: المجموع والعدد المعروف، ثم يظهر النصف المخفي من الدومينو */
function MissingExplorer() {
  const [total, setTotal] = useState(13);
  const [known, setKnown] = useState(8);
  const [open, setOpen] = useState(false);
  const missing = total - known;
  const setT = (v: number) => {
    const t = Math.max(1, Math.min(18, v));
    setTotal(t);
    // نصف الدومينو يتسع لـ ٩ نقاط على الأكثر
    setKnown((k) => Math.max(t - 9, Math.min(k, t, 9)));
    setOpen(false);
  };
  const setK = (v: number) => {
    setKnown(Math.max(Math.max(0, total - 9), Math.min(9, total, v)));
    setOpen(false);
  };
  useRemoteWidget(
    () => ({
      title: 'الدومينو',
      info: `${num(known)} + ${open ? num(missing) : '□'} = ${num(total)}`,
      steppers: [
        { key: 't', label: 'المجموع', value: total, min: 1, max: 18 },
        { key: 'k', label: 'النقاط الظاهرة', value: known, min: Math.max(0, total - 9), max: Math.min(9, total) },
      ],
      buttons: [{ key: 'open', label: open ? 'أخفِ النصف' : 'أظهر النصف المخفي', on: open }],
    }),
    (k, v) => {
      if (k === 't' && v !== undefined) setT(v);
      else if (k === 'k' && v !== undefined) setK(v);
      else if (k === 'open') setOpen((o) => !o);
    },
    [total, known, open],
  );
  const stepper = (label: string, v: number, set: (v: number) => void, lo: number, hi: number) => (
    <div className="ffstep">
      <span>{label}</span>
      <button aria-label={`إنقاص ${label}`} disabled={v <= lo} onClick={() => set(v - 1)}>
        −
      </button>
      <b>{num(v)}</b>
      <button aria-label={`زيادة ${label}`} disabled={v >= hi} onClick={() => set(v + 1)}>
        +
      </button>
    </div>
  );
  return (
    <Cols style={{ gridTemplateColumns: '1fr 1.2fr', alignItems: 'center' }}>
      <div className="chart cubebox">
        <Domino known={known} missing={missing} show={open} />
      </div>
      <Stack>
        {stepper('المجموع', total, setT, 1, 18)}
        {stepper('النقاط الظاهرة', known, setK, Math.max(0, total - 9), Math.min(9, total))}
        <button className="btn step-btn" onClick={() => setOpen((o) => !o)}>
          {open ? 'أخفِ النصف' : 'أظهر النصف المخفي'}
        </button>
        <div className="flines">
          {open && <Sentence t={[total, '−', known, '=', missing]} big />}
          <span className="hopx-eq done">
            <span className="eq">
              {num(known)} + {open ? num(missing) : '□'} = {num(total)}
            </span>
          </span>
        </div>
      </Stack>
    </Cols>
  );
}

/** سؤال دومينو من أتأكد: يظهر النصف المخفي مع أول ناتج */
function DominoQ({ n, known, total }: { n: number; known: number; total: number }) {
  const m = total - known;
  return (
    <QCard n={n} className="dcard">
      <Domino known={known} missing={m} k={n} />
      <div className="flines two72">
        <Sentence t={[known, '+', { box: true, b: m, hl: [`p${n}`] }, '=', total]} />
        <Sentence t={[total, '−', known, '=', { box: true, b: m }]} />
      </div>
    </QCard>
  );
}

/** سؤال من أتدرب بجملتين */
const Two = (n: number, a: Token[], b: Token[]) => (
  <QCard key={n} n={n}>
    <div className="flines">
      <Sentence t={a} />
      <Sentence t={b} />
    </div>
  </QCard>
);

export default defineLesson({
  meta: {
    id: 'g2-3-6-missing-numbers',
    code: '٣-٦',
    title: 'الأَعْدَادُ الْمَفْقُودَةُ',
    shortTitle: 'الأعداد المفقودة',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثالث: طرائق الطرح',
    source: 'الجزء الأول · ص ٧٤–٧٥',
    minutes: 45,
    idea: 'أَجِدُ عَدَدًا مَفْقُودًا فِي جُمْلَةِ جَمْعٍ مُسْتَعْمِلًا حَقَائِقَ الطَّرْحِ الْمُرْتَبِطَةَ بِهَا.',
    bookQuestions: 15,
  },
  sectionDesc: {
    engage: 'مراجعة الحقائق المترابطة',
    explore: 'الدومينو المخفي',
    explain: 'القاعدة · أستعد',
    elab: 'نعمل معًا · من واقع الحياة',
    check: 'الأسئلة ١–٥',
    practice: 'الأسئلة ٦–١٤',
    hot: 'السؤال ١٥',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردة. اسأل: ما معنى «مفقود»؟ (شيء لا نراه ونبحث عنه).',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَجِدُ عَدَدًا مَفْقُودًا فِي جُمْلَةِ جَمْعٍ مُسْتَعْمِلًا حَقَائِقَ الطَّرْحِ الْمُرْتَبِطَةَ بِهَا.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>الْعَدَدُ الْمَفْقُودُ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أجد العدد المفقود في جملة جمع.</li>
                <li>أستعمل حقيقة الطرح المرتبطة.</li>
                <li>أتحقق من إجابتي بالجمع.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },


    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'start', min: 1,
      notes: 'مقطع قصير (أقل من دقيقة) لا يبدأ إلا عندما تضغط تشغيل. أوقفه قبل كشف الغطاء واسأل: كم نقطة تحت الغطاء؟ كيف عرفت؟ يمكن تشغيله وإيقافه من الجوال.',
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
      notes: 'ربط بالدرس ٣-٥ (العلاقة بين الجمع والطرح). اختر طالبًا بالعجلة لكل سؤال.',
      content: (
        <>
          <SlideHead tag="تذكّر · الدرس ٣-٥" kind="ink">الجمع عكس الطرح</SlideHead>
          <Cols even>
            <Card kind="qs">
              <MCQ q="٦ + ٧ = ١٣، إذن ١٣ − ٦ = ؟" options={['٦', '٧', '١٩']} answer="٧" award />
            </Card>
            <Card kind="qs">
              <MCQ q="أيّ جملة طرح مرتبطة بـ ٨ + ٤ = ١٢؟" options={['١٢ − ٤ = ٨', '٨ − ٤ = ٤', '١٢ + ٤ = ١٦']} answer="١٢ − ٤ = ٨" award />
            </Card>
          </Cols>
          <Card kind="rule" cap="لغز">في قطعة الدومينو ٩ نقاط ظاهرة، والنصف الآخر مخفي. مجموع النقاط ١٥. كم نقطة مخفية؟</Card>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا يختار المجموع وعدد النقاط الظاهرة، ويخمّن المخفي قبل أن يضغط «أظهر». اسأل: أي جملة طرح تساعدك؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">الدومينو المخفي</SlideHead>
          <p style={{ fontSize: '.82em', fontWeight: 700, margin: 0 }}>اختر المجموع وعدد النقاط الظاهرة. خمّن كم نقطة في النصف المخفي، ثم أظهره.</p>
          <MissingExplorer />
          <Card kind="rule" cap="لاحظ">العدد المفقود = المجموع − العدد المعروف.</Card>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ القاعدة، واطلب من الطلاب أن يرددوا: «أطرح المعروف من المجموع».',
      content: (
        <>
          <SlideHead tag="القاعدة" kind="rule">أجد العدد المفقود</SlideHead>
          <Card kind="rule" style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.8 }}>
            أَجِدُ <Mark>الْعَدَدَ الْمَفْقُودَ</Mark> فِي جُمْلَةِ الْجَمْعِ مُسْتَعْمِلًا حَقِيقَةَ الطَّرْحِ الْمُرْتَبِطَةَ بِهَا.
          </Card>
          <Cols even>
            <Card kind="ex" cap="جملة الجمع">
              <Sentence t={[9, '+', { box: true, b: 6 }, '=', 15]} big />
            </Card>
            <Card kind="ex" cap="حقيقة الطرح المرتبطة">
              <Sentence t={[15, '−', 9, '=', 6]} big />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= أستعد · مثال الكتاب ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: «العدد ٩ هو أحد العددين المضافين، لكن العدد الآخر مفقود. أفكّر: ١٥ − ٩ = ٦».',
      content: (
        <>
          <SlideHead tag="أستعد · ص ٧٤" kind="ex">العدد المفقود</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">أَجِدُ الْعَدَدَ الْمَفْقُودَ فِي جُمْلَةِ الْجَمْعِ مُسْتَعْمِلًا حَقِيقَةَ الطَّرْحِ الْمُرْتَبِطَةَ بِهَا.</p>
              <Sentence t={[9, '+', { box: true, b: 6, hl: ['p0'] }, '=', 15]} big />
              <Ctrls>
                <NextButton />
              </Ctrls>
              <Solution>
                <Step>الْعَدَدُ ٩ هُوَ أَحَدُ الْعَدَدَيْنِ الْمُضَافَيْنِ فِي جُمْلَةِ الْجَمْعِ، لَكِنَّ الْعَدَدَ الآخَرَ مَفْقُودٌ.</Step>
                <Step>
                  أُفَكِّرُ: <Sentence t={[15, '−', 9, '=', 6]} />
                </Step>
                <Step kind="ans">٦ هُوَ الْعَدَدُ الْمَفْقُودُ فِي جُمْلَةِ الْجَمْعِ.</Step>
              </Solution>
            </QCol>
            <div className="chart cubebox">
              <Domino known={9} missing={6} />
            </div>
          </Cols>
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 4,
      notes: 'نعمل معًا: اختر طالبًا بالعجلة، واطلب منه قول حقيقة الطرح قبل الاختيار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">ما العدد المفقود؟</SlideHead>
          <Stack>
            <MCQ q="أ) ٧ + □ = ١٢. أَيُّ حَقِيقَةٍ تُسَاعِدُنِي؟" options={['١٢ − ٧ = ٥', '١٢ + ٧ = ١٩', '٧ − ٥ = ٢']} answer="١٢ − ٧ = ٥" award />
            <MCQ q="ب) □ + ٨ = ١٧. مَا الْعَدَدُ الْمَفْقُودُ؟" options={['٧', '٩', '٢٥']} answer="٩" award />
            <MCQ q="ج) ٦ + □ = ٦. مَا الْعَدَدُ الْمَفْقُودُ؟" options={['٠', '١', '٦']} answer="٠" award />
          </Stack>
        </>
      ),
    },

    /* ================= من واقع الحياة ================= */
    {
      sec: 'elab', min: 2,
      notes: 'اسأل: ماذا نعرف؟ (المجموع ١٤ وعدد الكرات الحمراء ٨). ماذا نريد؟',
      content: (
        <>
          <SlideHead tag="من واقع الحياة" kind="ex">كرات الملعب</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">فِي سَلَّةِ الْمَلْعَبِ ١٤ كُرَةً، مِنْهَا ٨ كُرَاتٍ حَمْرَاءُ وَالْبَاقِي زَرْقَاءُ. كَمْ كُرَةً زَرْقَاءَ؟</p>
              <Sentence t={[8, '+', { box: true, b: 6, hl: ['p0'] }, '=', 14]} big />
              <MCQ options={['٥', '٦', '٢٢']} answer="٦" award />
              <Ctrls>
                <NextButton label="كيف أفكّر؟" />
              </Ctrls>
              <Solution>
                <Step kind="ans">
                  <Sentence t={[14, '−', 8, '=', 6]} />
                </Step>
              </Solution>
            </QCol>
            <div className="chart cubebox">
              <Domino known={8} missing={6} />
            </div>
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٤ ================= */
    {
      sec: 'check', min: 4,
      notes: 'مع أول ناتج في كل سؤال يظهر النصف المخفي من الدومينو. اطلب من الطلاب عدّ النقاط للتحقق.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{CHECK}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{FIND_DOTS}</p>
          <div className="qgrid two book">
            <DominoQ n={1} known={8} total={14} />
            <DominoQ n={2} known={5} total={11} />
            <DominoQ n={3} known={4} total={8} />
            <DominoQ n={4} known={7} total={15} />
          </div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={120} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أتأكد ٥ · أتحدث ================= */
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: اطلب من طالبين أن يشرحا، ثم اعرض الخطوات.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="كَيْفَ أَجِدُ الْعَدَدَ الْمَفْقُودَ فِي جُمْلَةِ الْجَمْعِ ٥ + □ = ١٣؟"
          hint="أي حقيقة طرح مرتبطة بهذه الجملة؟"
          steps={[
            { text: 'أعرف المجموع ١٣ وأحد العددين ٥.' },
            { text: <>أستعمل حقيقة الطرح المرتبطة: <Sentence t={[13, '−', 5, '=', 8]} /></>, hl: ['p0'] },
            { text: 'العدد المفقود ٨، لأن ٥ + ٨ = ١٣', kind: 'ans' },
          ]}
          chart={
            <div className="chart cubebox">
              <Domino known={5} missing={8} />
            </div>
          }
        />
      ),
    },

    /* ================= أتدرب ٦–١٠ · كما في ص ٧٤–٧٥ ================= */
    {
      sec: 'practice', min: 5,
      notes: 'كما في الكتاب: في كل سؤال جملة طرح ثم جملة جمع مرتبطة. ناتج الطرح هو العدد المفقود في الجمع.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <Cols style={{ gridTemplateColumns: '1fr auto', alignItems: 'start' }}>
            <p className="qtext" style={{ margin: 0 }}>{FIND}</p>
            <Card kind="rule" cap="أَتَذَكَّرُ" style={{ fontSize: '.72em' }}>
              ١٤ − ٩ = ٥ وَ ٩ + ٥ = ١٤ حَقِيقَتَانِ مُتَرَابِطَتَانِ.
            </Card>
          </Cols>
          <div className="qgrid two book">
            <QCard n={6} className="dcard span2 side">
              <Domino known={9} missing={5} k={6} />
              <div className="flines">
                <Sentence t={[14, '−', 9, '=', { box: true, b: 5, hl: ['p6'] }]} />
                <Sentence t={[9, '+', { box: true, b: 5 }, '=', 14]} />
              </div>
            </QCard>
            {Two(7, [12, '−', 6, '=', { box: true, b: 6 }], [{ box: true, b: 6 }, '+', 6, '=', 12])}
            {Two(8, [8, '−', 7, '=', { box: true, b: 1 }], [7, '+', { box: true, b: 1 }, '=', 8])}
            {Two(9, [12, '−', 9, '=', { box: true, b: 3 }], [9, '+', { box: true, b: 3 }, '=', 12])}
            {Two(10, [7, '−', 2, '=', { box: true, b: 5 }], [2, '+', { box: true, b: 5 }, '=', 7])}
          </div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={150} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أتدرب ١١–١٤ · كما في ص ٧٥ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'انتبه في ١٢: المربعان مختلفان (٧ ثم ١٤). وفي ١٣ و١٤ المربع في وسط الجمع والطرح الرأسي.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{FIND}</p>
          <div className="qgrid two book">
            {Two(11, [15, '−', { box: true, b: 8 }, '=', 7], [7, '+', { box: true, b: 8 }, '=', 15])}
            {Two(12, [7, '+', { box: true, b: 7 }, '=', 14], [{ box: true, b: 14 }, '−', 7, '=', 7])}
            <QCard n={13} className="vcard">
              <div className="vrow">
                <VSum a={9} op="+" b={9} v={18} missing="b" />
                <VSum a={18} op="−" b={9} v={9} missing="b" />
              </div>
            </QCard>
            <QCard n={14} className="vcard">
              <div className="vrow">
                <VSum a={6} op="+" b={7} v={13} missing="b" />
                <VSum a={13} op="−" b={7} v={6} missing="b" />
              </div>
            </QCard>
          </div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={120} />
          </Ctrls>
        </>
      ),
    },

    /* ================= مهارات التفكير العليا ١٥ ================= */
    {
      sec: 'hot', min: 3,
      notes: 'الجبر: نجمع الأعداد المعروفة أولًا (٥ + ٤ = ٩)، ثم نجد المفقود: ١١ − ٩ = ٢.',
      content: (
        <QuestionSlide
          source={HOT} n={15} time={90}
          question={
            <>
              <b style={{ color: 'var(--ex)' }}>الجَبْرُ:</b> فِي الْحَدِيقَةِ ١١ طِفْلًا. إِذَا كَانَ ٥ مِنْهُمْ يَرْتَدُونَ قُمْصَانًا زَرْقَاءَ، وَ ٤ مِنْهُمْ يَرْتَدُونَ قُمْصَانًا بَيْضَاءَ، وَالْبَاقُونَ يَرْتَدُونَ قُمْصَانًا خَضْرَاءَ، فَكَمْ طِفْلًا يَرْتَدِي قَمِيصًا أَخْضَرَ؟
            </>
          }
          long
          hint="اجمع الأطفال المعروفين أولًا: ٥ + ٤ = ؟"
          steps={[
            { text: <Sentence t={[5, '+', 4, '=', 9]} /> },
            { text: <Sentence t={[11, '−', 9, '=', 2]} /> },
            { text: <Sentence t={[5, '+', 4, '+', 2, '=', 11]} /> },
            { text: 'طِفْلَانِ يَرْتَدِيَانِ قَمِيصًا أَخْضَرَ', kind: 'ans' },
          ]}
          chart={
            <div className="chart cubebox">
              <Sentence t={[5, '+', 4, '+', { box: true, b: 2 }, '=', 11]} big />
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
            center={<>الأعداد<br />المفقودة</>}
            items={[
              { kind: 'rule', cap: 'أعرف', text: 'المجموع وأحد العددين.' },
              { kind: 'ex', cap: 'أطرح', text: 'المجموع − المعروف = المفقود.' },
              { kind: 'qs', cap: 'مثال', text: '٩ + □ = ١٥ ← ١٥ − ٩ = ٦' },
              { kind: 'warn', cap: 'أتحقق', text: 'أجمع: ٩ + ٦ = ١٥ ✓' },
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
          <SlideHead tag="تذكرة الخروج" kind="qs">أجد المفقود</SlideHead>
          <div className="ticket">
            <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="٤ + □ = ٩" options={['٤', '٥', '١٣']} answer="٥" /></Card>
            <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="□ + ٧ = ١٦" options={['٧', '٩', '٢٣']} answer="٩" /></Card>
            <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="٣ + ٥ + □ = ١٢" options={['٤', '٥', '٨']} answer="٤" /></Card>
          </div>
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
