import { useState } from 'react';
import {
  CUBE, Card, Cols, Ctrls, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, QCard, QCol, QuestionSlide, Sentence, SlideHead,
  Solution, Stack, Step, Tag, TimerButton, Towers, VSum, Winner, defineLesson, num, useRemoteWidget, type Token,
} from '@engine';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ · ص ٦٦';
const PRACTICE = 'أتدرَّبُ · ص ٦٧';
const DATA = 'ملفُّ البياناتِ · ص ٦٧';
const FIND_CUBES = 'أَجِدُ نَاتِجَ الطَّرْحِ مُسْتَعِينًا بِحقائقِ جَمْعِ الْعَدَدِ وَنَفْسِهِ، وَمُسْتَعْمِلاً الْمُكَعَّبَاتِ:';
const FIND_CIRCLE = 'أَجِدُ النَّاتِجَ مُسْتَعْمِلاً الْمُكَعَّبَاتِ، ثُمَّ أُحَوِّطُ المَسْأَلَةَ الَّتِي أَسْتَعْمِلُ فِيهَا حقائِقَ جَمْعِ العَدَدِ وَنَفْسِهِ:';

/** مستكشف: عدد مكعبات كل برج، ثم «أجمع» أو «أطرح» */
function DoublesExplorer() {
  const [n, setN] = useState(6);
  const [mode, setMode] = useState<'add' | 'sub' | null>(null);
  const set = (v: number) => {
    setN(Math.max(1, Math.min(9, v)));
    setMode(null);
  };
  const info = mode === 'add' ? `${num(n)} + ${num(n)} = ${num(n * 2)}` : mode === 'sub' ? `${num(n * 2)} − ${num(n)} = ${num(n)}` : `${num(n)} و${num(n)}`;
  useRemoteWidget(
    () => ({
      title: 'برجان متساويان',
      info,
      steppers: [{ key: 'n', label: 'مكعبات كل برج', value: n, min: 1, max: 9 }],
      buttons: [
        { key: 'add', label: 'أجمع البرجين', on: mode === 'add' },
        { key: 'sub', label: 'أطرح برجًا', on: mode === 'sub' },
      ],
    }),
    (k, v) => {
      if (k === 'n' && v !== undefined) set(v);
      else if (k === 'add' || k === 'sub') setMode(k);
    },
    [n, mode],
  );
  return (
    <Cols style={{ gridTemplateColumns: '1fr 1.2fr', alignItems: 'center' }}>
      <div className="chart cubebox dbl">
        <Towers a={n} b={n} state={mode} colors={[CUBE.green, CUBE.orange]} />
      </div>
      <Stack>
        <div className="ffstep">
          <span>مكعبات كل برج</span>
          <button aria-label="إنقاص المكعبات" disabled={n <= 1} onClick={() => set(n - 1)}>
            −
          </button>
          <b>{num(n)}</b>
          <button aria-label="زيادة المكعبات" disabled={n >= 9} onClick={() => set(n + 1)}>
            +
          </button>
        </div>
        <div className="hopx-ctrl">
          <button className={'btn' + (mode === 'add' ? ' sel' : '')} onClick={() => setMode('add')}>
            أجمع البرجين
          </button>
          <button className={'btn' + (mode === 'sub' ? ' sel' : '')} onClick={() => setMode('sub')}>
            أطرح برجًا
          </button>
        </div>
        <span className={'hopx-eq' + (mode ? ' done' : '')}>
          <span className="eq">{info}</span>
        </span>
      </Stack>
    </Cols>
  );
}

/** جملة أفقية بخانة في الموضع المطلوب */
const Q = (n: number, t: Token[], circle?: boolean) => (
  <QCard key={n} n={n}>
    <div className="flines">
      <Sentence t={t} />
    </div>
    {circle && <Step className="ring">حقيقة جمع العدد ونفسه</Step>}
  </QCard>
);

/** جملة رأسية؛ missing='b' للعدد المطروح المفقود */
const V = (n: number, a: number, b: number, missing?: 'b', circle?: boolean) => (
  <QCard key={n} n={n} className="vcard">
    <div className="vrow">
      <VSum a={a} op="−" b={b} v={a - b} missing={missing} />
    </div>
    {circle && <Step className="ring">حقيقة جمع العدد ونفسه</Step>}
  </QCard>
);

export default defineLesson({
  meta: {
    id: 'g2-3-3-doubles',
    code: '٣-٣',
    title: 'الطَّرْحُ باسْتِعْمَالِ حَقَائِقِ جَمْعِ الْعَدَدِ وَنَفْسِهِ',
    shortTitle: 'الطرح بحقائق جمع العدد ونفسه',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثالث: طرائق الطرح',
    source: 'الجزء الأول · ص ٦٦–٦٧',
    minutes: 45,
    idea: 'أَطْرَحُ باسْتِعْمَالِ حَقائِقِ جَمْعِ الْعَدَدِ وَنَفْسِهِ.',
    bookQuestions: 22,
  },
  sectionDesc: {
    engage: 'مراجعة جمع العدد ونفسه',
    explore: 'برجان متساويان',
    explain: 'القاعدة · أستعد',
    elab: 'نعمل معًا · من واقع الحياة',
    check: 'الأسئلة ١–٧',
    practice: 'الأسئلة ٨–٢٢',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. اسأل: ما معنى «جمع العدد ونفسه»؟ (مثل ٤ + ٤).',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَطْرَحُ باسْتِعْمَالِ حَقائِقِ جَمْعِ الْعَدَدِ وَنَفْسِهِ.</Card>
              <Card kind="rule" cap="نتذكّر">
                <Mark>جَمْعُ الْعَدَدِ وَنَفْسِهِ</Mark>: ٣ + ٣، ٤ + ٤، ٥ + ٥ …
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أتذكّر حقائق جمع العدد ونفسه.</li>
                <li>أستعملها لأجد ناتج الطرح.</li>
                <li>أعرف متى تساعدني هذه الحقائق.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 3,
      notes: 'مراجعة سريعة لحقائق جمع العدد ونفسه من الفصل الثاني. يرفع الطلاب أصابعهم بالإجابة.',
      content: (
        <>
          <SlideHead tag="تذكّر · الفصل ٢" kind="ink">جمع العدد ونفسه</SlideHead>
          <Cols even>
            <Card kind="qs">
              <MCQ q="٥ + ٥ = ؟" options={['٩', '١٠', '١١']} answer="١٠" award />
            </Card>
            <Card kind="qs">
              <MCQ q="٧ + ٧ = ؟" options={['١٤', '١٥', '١٦']} answer="١٤" award />
            </Card>
          </Cols>
          <Card kind="rule" cap="سؤال للتفكير">
            إذا كان <b>٧ + ٧ = ١٤</b>، فكم <b>١٤ − ٧</b>؟ هل نحتاج أن نعدّ؟
          </Card>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا يختار عدد مكعبات كل برج، ثم يضغط «أجمع البرجين» ثم «أطرح برجًا». اسأل: ماذا تلاحظ على ناتج الطرح؟ (هو عدد مكعبات البرج الواحد).',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">برجان متساويان</SlideHead>
          <p style={{ fontSize: '.82em', fontWeight: 700, margin: 0 }}>اختر عدد مكعبات كل برج، ثم اجمع البرجين، ثم اطرح برجًا. ماذا يبقى؟</p>
          <DoublesExplorer />
          <Card kind="rule" cap="لاحظ">إذا طرحت برجًا من البرجين بقي برج واحد: ناتج الطرح هو العدد نفسه.</Card>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ القاعدة. اطلب من الطلاب أن يكملوا: «٩ + ٩ = ١٨، إذن ١٨ − ٩ = …».',
      content: (
        <>
          <SlideHead tag="القاعدة" kind="rule">أطرح بحقائق جمع العدد ونفسه</SlideHead>
          <Card kind="rule" style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.8 }}>
            إذا عَرَفْتُ أَنَّ <Mark>العَدَدَ + نَفْسَهُ = المَجْمُوعَ</Mark>، فَإِنَّ <Mark>المَجْمُوعَ − العَدَدَ = العَدَدَ</Mark>.
          </Card>
          <div className="qgrid three">
            {[
              [4, 8],
              [6, 12],
              [9, 18],
            ].map(([a, c]) => (
              <Card key={a} kind="ex">
                <div className="flines">
                  <Sentence t={[a, '+', a, '=', c]} big />
                  <Sentence t={[c, '−', a, '=', a]} big />
                </div>
              </Card>
            ))}
          </div>
        </>
      ),
    },

    /* ================= أستعد · مثال الكتاب ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: «أعرف أن ٨ + ٨ = ١٦. إذا شطبت البرج البرتقالي (٨) يبقى البرج الأخضر (٨)».',
      content: (
        <>
          <SlideHead tag="أستعد · ص ٦٦" kind="ex">أجد الناتج ١٦ − ٨</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">أَسْتَعْمِلُ حَقَائِقَ جَمْعِ العَدَدِ وَنَفْسِهِ لِأَجِدَ نَاتِجَ الطَّرْحِ. أَجِدُ النَّاتِجَ ١٦ − ٨</p>
              <div className="flines">
                <Step hl={['p0']}>
                  أَعْرِفُ أَنَّ <Sentence t={[8, '+', 8, '=', 16]} />
                </Step>
                <Step hl={['v0']}>
                  إِذَنْ: <Sentence t={[16, '−', 8, '=', 8]} />
                </Step>
              </div>
              <Ctrls>
                <NextButton />
              </Ctrls>
            </QCol>
            <div className="chart cubebox dbl">
              <Towers a={8} b={8} colors={[CUBE.green, CUBE.orange]} />
            </div>
          </Cols>
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 4,
      notes: 'نعمل معًا: اختر طالبًا بالعجلة، واطلب منه قول حقيقة الجمع قبل الاختيار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أي حقيقة تساعدني؟</SlideHead>
          <Stack>
            <MCQ q="أ) أَيُّ حَقِيقَةٍ تُسَاعِدُنِي عَلَى إِيجَادِ ١٠ − ٥؟" options={['٥ + ٥ = ١٠', '٥ + ٤ = ٩', '٦ + ٤ = ١٠']} answer="٥ + ٥ = ١٠" award />
            <MCQ q="ب) ٦ + ٦ = ١٢، إِذَنْ ١٢ − ٦ = ؟" options={['٥', '٦', '١٢']} answer="٦" award />
            <MCQ q="ج) أَيُّ مَسْأَلَةٍ أَسْتَعْمِلُ فِيهَا حَقِيقَةَ جَمْعِ الْعَدَدِ وَنَفْسِهِ؟" options={['٩ − ٤', '١٨ − ٩', '١٢ − ٥']} answer="١٨ − ٩" award />
          </Stack>
        </>
      ),
    },

    /* ================= من واقع الحياة ================= */
    {
      sec: 'elab', min: 2,
      notes: 'اسأل: كم صندوقًا فيه البيض؟ كم في كل صندوق؟ اربط بحقيقة ٦ + ٦.',
      content: (
        <>
          <SlideHead tag="من واقع الحياة" kind="ex">طبق البيض</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">فِي طَبَقِ الْبَيْضِ صَفَّانِ، فِي كُلِّ صَفٍّ ٦ بَيْضَاتٍ. اسْتَعْمَلَتْ أُمِّي صَفًّا كَامِلًا. كَمْ بَيْضَةً بَقِيَتْ؟</p>
              <MCQ options={['٦', '١٢', '١٨']} answer="٦" award />
              <Ctrls>
                <NextButton label="كيف أفكّر؟" />
              </Ctrls>
              <Solution>
                <Step hl={['p0']}>في الطبق ٦ + ٦ = ١٢ بيضة.</Step>
                <Step hl={['v0']} kind="ans">
                  <Sentence t={[12, '−', 6, '=', 6]} />
                </Step>
              </Solution>
            </QCol>
            <div className="chart cubebox dbl">
              <Towers a={6} b={6} colors={['#f2e3c6', '#f2e3c6']} />
            </div>
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٢ ================= */
    {
      sec: 'check', min: 3,
      notes: 'الخطوة الأولى تكمل جملة الجمع وتُظهر المجموع فوق البرجين، والثانية تشطب البرج الثاني.',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{CHECK}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{FIND_CUBES}</p>
          <div className="qgrid two">
            <QCard n={1} className="tcard">
              <div className="chart cubebox dbl sm">
                <Towers a={9} b={9} k={1} colors={['#d7302a', '#f6c21c']} size={28} />
              </div>
              <div className="flines">
                <Sentence t={[9, '+', { b: 9, hl: ['p1'] }, '=', 18]} />
                <Sentence t={[18, '−', 9, '=', { b: 9, hl: ['v1'] }]} />
              </div>
            </QCard>
            <QCard n={2} className="tcard">
              <div className="chart cubebox dbl sm">
                <Towers a={5} b={5} k={2} colors={['#d7302a', '#4fae3a']} size={28} />
              </div>
              <div className="flines">
                <Sentence t={[5, '+', { b: 5, hl: ['p2'] }, '=', 10]} />
                <Sentence t={[10, '−', 5, '=', { b: 5, hl: ['v2'] }]} />
              </div>
            </QCard>
          </div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={60} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أتأكد ٣–٦ ================= */
    {
      sec: 'check', min: 3,
      notes: 'في ٥ و٦ لا توجد حقيقة جمع مكتوبة: اسأل الطلاب أي حقيقة جمع العدد ونفسه تساعدهم.',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{CHECK}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{FIND_CUBES}</p>
          <div className="qgrid two">
            <QCard n={3}>
              <div className="flines">
                <Sentence t={[6, '+', { b: 6 }, '=', 12]} />
                <Sentence t={[12, '−', 6, '=', { b: 6 }]} />
              </div>
            </QCard>
            <QCard n={4}>
              <div className="flines">
                <Sentence t={[4, '+', { b: 4 }, '=', 8]} />
                <Sentence t={[8, '−', 4, '=', { b: 4 }]} />
              </div>
            </QCard>
            {Q(5, [14, '−', 7, '=', { b: 7 }])}
            {Q(6, [4, '−', 2, '=', { b: 2 }])}
          </div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={90} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أتأكد ٧ · أتحدث ================= */
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: اطلب من طالبين أن يشرحا بمثال من اختيارهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="كَيْفَ أَسْتَفِيدُ مِنْ حَقَائِقِ جَمْعِ الْعَدَدِ وَنَفْسِهِ فِي عَمَلِيَّةِ الطَّرْحِ؟"
          hint="فكّر في مثال: ٧ + ٧ = ١٤."
          steps={[
            { text: 'إذا عرفت أن العدد + نفسه = المجموع، مثل ٧ + ٧ = ١٤،', hl: ['p0'] },
            { text: 'فإن المجموع − العدد = العدد نفسه: ١٤ − ٧ = ٧', hl: ['v0'] },
            { text: 'أجد ناتج الطرح بسرعة دون أن أعدّ.', kind: 'ans' },
          ]}
          chart={
            <div className="chart cubebox dbl">
              <Towers a={7} b={7} colors={[CUBE.blue, CUBE.yellow]} />
            </div>
          }
        />
      ),
    },

    /* ================= أتدرب ٨–١٣ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'بعد كل ناتج تظهر دائرة حول المسائل التي نستعمل فيها حقيقة جمع العدد ونفسه (٨ و٩ وغيرها لا).',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{FIND_CIRCLE}</p>
          <div className="qgrid three">
            {Q(8, [9, '−', 3, '=', { b: 6 }])}
            {Q(9, [11, '−', 9, '=', { b: 2 }])}
            {Q(10, [5, '−', 5, '=', { b: 0 }])}
            {Q(11, [6, '−', { b: 3 }, '=', 3], true)}
            {Q(12, [7, '−', 3, '=', { b: 4 }])}
            {Q(13, [12, '−', { b: 6 }, '=', 6], true)}
          </div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={120} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أتدرب ١٤–٢١ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'في ١٤ و١٦ و٢٠ العدد المطروح هو المفقود (في المربع). ذكّر: ١٦ − □ = ٨، أي حقيقة؟ ٨ + ٨ = ١٦.',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{FIND_CIRCLE}</p>
          <div className="qgrid four">
            {V(14, 16, 8, 'b', true)}
            {V(15, 7, 0)}
            {V(16, 10, 5, 'b', true)}
            {V(17, 9, 2)}
            {V(18, 6, 2)}
            {V(19, 8, 3)}
            {V(20, 14, 7, 'b', true)}
            {V(21, 7, 2)}
          </div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={120} />
          </Ctrls>
        </>
      ),
    },

    /* ================= ملف البيانات ٢٢ ================= */
    {
      sec: 'practice', min: 3,
      notes: 'اقرأ النص عن المتحف الوطني. اسأل: هل ١٨ و٩ من حقائق جمع العدد ونفسه؟ (٩ + ٩ = ١٨).',
      content: (
        <QuestionSlide
          source={DATA} n={22} time={60}
          intro="يُعَدُّ الْمُتْحَفُ الْوَطَنِيُّ بِمَدِينَةِ الرِّيَاضِ مَعْلَمًا بَارِزًا تَتَنَوَّعُ فِيهِ الْمَعْرُوضَاتُ مِنْ قِطَعٍ أَثَرِيَّةٍ، وَوَثَائِقَ تَعْكِسُ تَارِيخَ الْجَزِيرَةِ الْعَرَبِيَّةِ."
          question="اِصْطَفَّ ١٨ شَخْصًا لِلدُّخُولِ إِلَى الْمُتْحَفِ. إِذَا دَخَلَ ٩ أَشْخَاصٍ مِنْهُمْ، فَمَا عَدَدُ الأَشْخَاصِ الَّذِينَ مَا زَالُوا يَنْتَظِرُونَ؟ أَكْتُبُ جُمْلَةً عَدَدِيَّةً لِأَحُلَّ المَسْأَلَةَ."
          long
          hint="أي حقيقة من حقائق جمع العدد ونفسه مجموعها ١٨؟"
          steps={[
            { text: 'أعرف أن ٩ + ٩ = ١٨', hl: ['p0'] },
            { text: <Sentence t={[18, '−', 9, '=', 9]} />, hl: ['v0'] },
            { text: '٩ أشخاص ما زالوا ينتظرون.', kind: 'ans' },
          ]}
          chart={
            <div className="chart cubebox dbl">
              <Towers a={9} b={9} colors={['#0a58b0', '#8aa4c8']} size={26} />
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
            center={<>الطرح بحقائق<br />جمع العدد ونفسه</>}
            items={[
              { kind: 'rule', cap: 'أتذكّر', text: 'العدد + نفسه: ٨ + ٨ = ١٦' },
              { kind: 'ex', cap: 'أطرح', text: 'المجموع − العدد = العدد: ١٦ − ٨ = ٨' },
              { kind: 'qs', cap: 'بالمكعبات', text: 'برجان متساويان، أطرح واحدًا فيبقى الآخر.' },
              { kind: 'warn', cap: 'متى أستعملها؟', text: 'عندما يكون الناتج مساويًا للعدد المطروح.' },
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
          <SlideHead tag="تذكرة الخروج" kind="qs">العدد ونفسه</SlideHead>
          <div className="ticket">
            <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="٣ + ٣ = ٦، إذن ٦ − ٣ = ؟" options={['٢', '٣', '٦']} answer="٣" /></Card>
            <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="١٦ − ٨ = ؟" options={['٦', '٨', '٩']} answer="٨" /></Card>
            <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="١٤ − □ = ٧. ما العدد في □؟" options={['٧', '٦', '٢١']} answer="٧" /></Card>
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
