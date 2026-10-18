import { useState } from 'react';
import {
  CUBE, Card, Cols, CubeTrain, Ctrls, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, NumberLine, QCard, QCol, QuestionSlide,
  Sentence, SlideHead, Solution, Stack, Step, Tag, TimerButton, VSum, Winner, defineLesson, num, useRemoteWidget, type Token,
} from '@engine';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ · ص ٦٤';
const PRACTICE = 'أتدرَّبُ · ص ٦٥';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ٦٥';
const FIND = 'أَجِدُ ناتِجَ الطَّرْحِ:';
const FIND_CIRCLE = 'أَجِدُ ناتِجَ الطَّرْحِ، ثُمَّ أُحَوِّطُ المَسْأَلَةَ الَّتِي نَاتِجُ الطَّرْحِ فِيهَا يُسَاوِي صِفْرًا:';

/** ضفادع على ورقة اللوتس؛ «الكل» يقفز منها كلها، و«صفر» لا يقفز منها شيء */
const Frogs = ({ n, k, all }: { n: number; k: number; all?: boolean }) => (
  <CubeTrain parts={[{ n, color: CUBE.green }]} shape="frog" k={k} take={all ? [0] : [1]} size={44} counts={false} />
);

/** مستكشف: عدد الضفادع، ثم «اطرح الكل» أو «اطرح صفرًا» */
function FrogExplorer() {
  const [n, setN] = useState(5);
  const [mode, setMode] = useState<'none' | 'all' | 'zero'>('none');
  const setCount = (v: number) => {
    setN(Math.max(1, Math.min(9, v)));
    setMode('none');
  };
  const sentence = mode === 'all' ? `${num(n)} − ${num(n)} = ٠` : mode === 'zero' ? `${num(n)} − ٠ = ${num(n)}` : `${num(n)} − ؟`;
  useRemoteWidget(
    () => ({
      title: 'الضفادع',
      info: sentence,
      steppers: [{ key: 'n', label: 'عدد الضفادع', value: n, min: 1, max: 9, color: CUBE.green }],
      buttons: [
        { key: 'all', label: 'تقفز كلها', on: mode === 'all' },
        { key: 'zero', label: 'لا يقفز أيّ ضفدع', on: mode === 'zero' },
        { key: 'reset', label: 'من جديد' },
      ],
    }),
    (k, v) => {
      if (k === 'n' && v !== undefined) setCount(v);
      else if (k === 'all' || k === 'zero') setMode(k);
      else if (k === 'reset') setMode('none');
    },
    [n, mode],
  );
  return (
    <div className="frogx">
      <div className="chart cubebox">
        <CubeTrain parts={[{ n, color: CUBE.green }]} shape="frog" removed={mode === 'all' ? 0 : null} size={52} counts={false} />
      </div>
      <div className="hopx-ctrl">
        <div className="ffstep">
          <span>عدد الضفادع</span>
          <button aria-label="إنقاص الضفادع" disabled={n <= 1} onClick={() => setCount(n - 1)}>
            −
          </button>
          <b>{num(n)}</b>
          <button aria-label="زيادة الضفادع" disabled={n >= 9} onClick={() => setCount(n + 1)}>
            +
          </button>
        </div>
        <button className={'btn' + (mode === 'all' ? ' sel' : '')} onClick={() => setMode('all')}>
          تقفز كلها
        </button>
        <button className={'btn' + (mode === 'zero' ? ' sel' : '')} onClick={() => setMode('zero')}>
          لا يقفز أيّ ضفدع
        </button>
        <span className={'hopx-eq' + (mode !== 'none' ? ' done' : '')}>
          <span className="eq">{sentence}</span>
        </span>
      </div>
    </div>
  );
}

/** سؤال أفقي من أتدرب؛ إن كان ناتجه صفرًا تُحوَّط بطاقته بعد ظهور الناتج */
function HQ({ n, a, b }: { n: number; a: number; b: number }) {
  return (
    <QCard n={n}>
      <div className="flines">
        <Sentence t={[a, '−', b, '=', { b: a - b }]} />
      </div>
      {a - b === 0 && <Step className="ring">صفر</Step>}
    </QCard>
  );
}

/** سؤال رأسي من أتدرب */
function VQ({ n, a, b }: { n: number; a: number; b: number }) {
  return (
    <QCard n={n} className="vcard">
      <div className="vrow">
        <VSum a={a} op="−" b={b} v={a - b} />
      </div>
      {a - b === 0 && <Step className="ring">صفر</Step>}
    </QCard>
  );
}

/** سطر جملة طرح أفقية بخانة الناتج */
const S = (a: number, b: number): Token[] => [a, '−', b, '=', { b: a - b }];

export default defineLesson({
  meta: {
    id: 'g2-3-2-subtract-zero-all',
    code: '٣-٢',
    title: 'طَرْحُ الصِّفْرِ وَطَرْحُ الْكُلِّ',
    shortTitle: 'طرح الصفر وطرح الكل',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثالث: طرائق الطرح',
    source: 'الجزء الأول · ص ٦٤–٦٥',
    minutes: 45,
    idea: 'أَطْرَحُ الصِّفْرَ مِنْ عَدَدٍ، وَأَطْرَحُ عَدَدًا مِنْ نَفْسِهِ.',
    bookQuestions: 23,
  },
  sectionDesc: {
    engage: 'مراجعة العدّ التنازلي',
    explore: 'الضفادع على ورقة اللوتس',
    explain: 'القاعدة · أستعد',
    elab: 'نعمل معًا · من واقع الحياة',
    check: 'الأسئلة ١–٧',
    practice: 'الأسئلة ٨–٢١',
    hot: 'الأسئلة ٢٢–٢٣',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. اسأل: إذا كان معك ٥ حلوى ولم تعطِ أحدًا شيئًا، كم يبقى معك؟',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَطْرَحُ الصِّفْرَ مِنْ عَدَدٍ، وَأَطْرَحُ عَدَدًا مِنْ نَفْسِهِ.</Card>
              <Card kind="rule" cap="نتذكّر">
                <Mark>الصِّفْرُ</Mark> يعني: لا شيء.
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أطرح الصفر من عدد.</li>
                <li>أطرح عددًا من نفسه.</li>
                <li>أعرف متى يكون الناتج صفرًا.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 3,
      notes: 'ربط بالدرس ٣-١: يقفز الطالب بإصبعه على خط الأعداد. ثم سؤال التفكير يمهّد للدرس.',
      content: (
        <>
          <SlideHead tag="تذكّر · الدرس ٣-١" kind="ink">الطرح بالعدّ التنازلي</SlideHead>
          <div className="chart nlbox sm">
            <NumberLine max={10} />
          </div>
          <Cols even>
            <Card kind="qs">
              <MCQ q="٧ − ٢ = ؟" options={['٤', '٥', '٩']} answer="٥" award />
            </Card>
            <Card kind="qs">
              <MCQ q="٦ − ١ = ؟" options={['٥', '٦', '٧']} answer="٥" award />
            </Card>
          </Cols>
          <Card kind="rule" cap="سؤال للتفكير">
            كم قفزة أقفز في <b>٤ − ٠</b>؟ وكم قفزة في <b>٤ − ٤</b>؟ لنكتشف!
          </Card>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا يغيّر عدد الضفادع، ثم يضغط «تقفز كلها» مرة و«لا يقفز أيّ ضفدع» مرة. اسأل: كم بقي في كل مرة؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">الضفادع على ورقة اللوتس</SlideHead>
          <p style={{ fontSize: '.82em', fontWeight: 700, margin: 0 }}>اختر عدد الضفادع، ثم: هل تقفز كلها؟ أم لا يقفز أيّ ضفدع؟</p>
          <FrogExplorer />
          <Card kind="rule" cap="لاحظ">إذا قفزت كلها لم يبقَ شيء (صفر). وإذا لم يقفز أيّ ضفدع بقي العدد كما هو.</Card>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ القاعدتين، واطلب من الطلاب أن يكملوا: «العدد ناقص صفر يساوي…» «العدد ناقص نفسه يساوي…».',
      content: (
        <>
          <SlideHead tag="القاعدة" kind="rule">طرح الصفر وطرح الكل</SlideHead>
          <Cols even>
            <Card kind="rule" cap="أطرح صفرًا" style={{ fontSize: '1em', fontWeight: 700, lineHeight: 1.8 }}>
              عِنْدَمَا أَطْرَحُ <Mark>الصِّفْرَ</Mark> مِنْ أَيِّ عَدَدٍ فَإِنَّ نَاتِجَ الطَّرْحِ هُوَ العَدَدُ نَفْسُهُ.
              <Sentence t={[8, '−', 0, '=', 8]} big />
            </Card>
            <Card kind="rule" cap="أطرح الكل" style={{ fontSize: '1em', fontWeight: 700, lineHeight: 1.8 }}>
              عِنْدَمَا أَطْرَحُ عَدَدًا مِنْ <Mark>نَفْسِهِ</Mark> فَإِنَّ نَاتِجَ الطَّرْحِ صِفْرٌ.
              <Sentence t={[8, '−', 8, '=', 0]} big />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= أستعد · مثال الكتاب ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: «قفزت الضفادع الخمسة كلها، فلم يبقَ أيّ ضفدع. وفي الصورة الثانية لم يقفز أيّ ضفدع، فبقيت ٥».',
      content: (
        <>
          <SlideHead tag="أستعد · ص ٦٤" kind="ex">كم ضفدعًا بقي؟</SlideHead>
          <p className="qtext" style={{ margin: 0 }}>يُمْكِنُ أَنْ أَجِدَ الْفَرْقَ بَيْنَ عَدَدَيْنِ بِالطَّرْحِ. أَجِدُ عَدَدَ الضَّفَادِعِ الَّتِي بَقِيَتْ:</p>
          <Cols even>
            <Card kind="ex" cap="أَطْرَحُ الْكُلَّ">
              <Frogs n={5} k={1} all />
              <div className="flines">
                <Sentence t={[5, '−', 5, '=', { b: 0, hl: ['v1'] }]} big />
              </div>
              <Step>لَمْ يَبْقَ أَيُّ ضِفْدَعٍ (٠ ضِفْدَعٍ)</Step>
            </Card>
            <Card kind="ex" cap="أَطْرَحُ صِفْرًا">
              <Frogs n={5} k={2} />
              <div className="flines">
                <Sentence t={[5, '−', 0, '=', { b: 5, hl: ['p2'] }]} big />
              </div>
              <Step>بَقِيَتْ ٥ ضَفادِعَ</Step>
            </Card>
          </Cols>
          <Ctrls>
            <NextButton />
          </Ctrls>
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 4,
      notes: 'نعمل معًا: اختر طالبًا بالعجلة. اطلب منه أن يقول القاعدة التي استعملها قبل أن يختار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">صفر أم العدد نفسه؟</SlideHead>
          <Stack>
            <MCQ q="أ) ٩ − ٩ = ؟" options={['٠', '٩', '١٨']} answer="٠" award />
            <MCQ q="ب) ٧ − ٠ = ؟" options={['٠', '١', '٧']} answer="٧" award />
            <MCQ q="ج) أَيُّ مَسْأَلَةٍ نَاتِجُ الطَّرْحِ فِيهَا صِفْرٌ؟" options={['٦ − ٠', '٦ − ٦', '٦ − ١']} answer="٦ − ٦" award />
          </Stack>
        </>
      ),
    },

    /* ================= من واقع الحياة ================= */
    {
      sec: 'elab', min: 2,
      notes: 'اسأل: متى نأكل كل شيء في الصحن؟ ومتى لا نأكل شيئًا؟ اربط القصة بالقاعدتين.',
      content: (
        <>
          <SlideHead tag="من واقع الحياة" kind="ex">صحن التمر</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">فِي الصَّحْنِ ٨ تَمَرَاتٍ، أَكَلَهَا الضُّيُوفُ كُلَّهَا. كَمْ تَمْرَةً بَقِيَتْ فِي الصَّحْنِ؟</p>
              <MCQ options={['٠', '١', '٨']} answer="٠" award />
              <Ctrls>
                <NextButton label="كيف أفكّر؟" />
              </Ctrls>
              <Solution>
                <Step hl={['v0']}>أكلوا العدد كله، فأطرح العدد من نفسه.</Step>
                <Step kind="ans">
                  <Sentence t={[8, '−', 8, '=', 0]} />
                </Step>
              </Solution>
            </QCol>
            <div className="chart cubebox">
              <CubeTrain parts={[{ n: 8, color: '#8a5a2b' }]} take={[0]} size={46} hide={[0]} />
            </div>
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٣ ================= */
    {
      sec: 'check', min: 3,
      notes: 'كل سؤال فيه طرح الكل وطرح الصفر. اطلب من الطلاب قول القاعدة مع كل ناتج.',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{CHECK}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{FIND}</p>
          <div className="qgrid three">
            <QCard n={1}>
              <div className="flines">
                <Sentence t={S(3, 3)} />
                <Sentence t={S(3, 0)} />
              </div>
            </QCard>
            <QCard n={2}>
              <div className="flines">
                <Sentence t={S(2, 0)} />
                <Sentence t={S(2, 2)} />
              </div>
            </QCard>
            <QCard n={3}>
              <div className="flines">
                <Sentence t={S(6, 6)} />
                <Sentence t={S(6, 0)} />
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

    /* ================= أتأكد ٤–٦ ================= */
    {
      sec: 'check', min: 2,
      notes: 'الطرح الرأسي: العدد العلوي ناقص العدد السفلي.',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{CHECK}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{FIND}</p>
          <div className="qgrid three">
            <QCard n={4} className="vcard">
              <div className="vrow">
                <VSum a={9} op="−" b={0} v={9} />
                <VSum a={9} op="−" b={9} v={0} />
              </div>
            </QCard>
            <QCard n={5} className="vcard">
              <div className="vrow">
                <VSum a={4} op="−" b={4} v={0} />
                <VSum a={4} op="−" b={0} v={4} />
              </div>
            </QCard>
            <QCard n={6} className="vcard">
              <div className="vrow">
                <VSum a={7} op="−" b={7} v={0} />
                <VSum a={7} op="−" b={0} v={7} />
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

    /* ================= أتأكد ٧ · أتحدث ================= */
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: اطلب من طالبين أن يشرحا بالضفادع أو بالأصابع.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="كَيْفَ أَعْرِفُ أَنَّ ٨ − ٨ = ٠ وَأَنَّ ٨ − ٠ = ٨؟"
          hint="فكّر في ٨ ضفادع: كم يبقى إن قفزت كلها؟ وإن لم يقفز أيّ منها؟"
          steps={[
            { text: '٨ − ٨: أطرح العدد كله، فلا يبقى شيء: الناتج ٠', hl: ['v1'] },
            { text: '٨ − ٠: لا أطرح شيئًا، فيبقى العدد نفسه: الناتج ٨' },
            { text: 'طرح العدد من نفسه = صفر، وطرح الصفر = العدد نفسه.', kind: 'ans' },
          ]}
          chart={
            <div className="chart cubebox">
              <Frogs n={8} k={1} all />
            </div>
          }
        />
      ),
    },

    /* ================= أتدرب ٨–١٣ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'بعد كل ناتج صفر تظهر دائرة حول المسألة. اسأل: لماذا كان الناتج صفرًا؟',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <Cols style={{ gridTemplateColumns: '1fr auto', alignItems: 'start' }}>
            <p className="qtext" style={{ margin: 0 }}>{FIND_CIRCLE}</p>
            <Card kind="rule" cap="أَتَذَكَّرُ" style={{ fontSize: '.72em', maxWidth: '16em' }}>
              عِنْدَمَا أَطْرَحُ الصِّفْرَ مِنْ أَيِّ عَدَدٍ فَإِنَّ نَاتِجَ الطَّرْحِ هُوَ العَدَدُ نَفْسُهُ.
            </Card>
          </Cols>
          <div className="qgrid three">
            <HQ n={8} a={9} b={3} />
            <HQ n={9} a={8} b={1} />
            <HQ n={10} a={8} b={3} />
            <HQ n={11} a={4} b={4} />
            <HQ n={12} a={7} b={3} />
            <HQ n={13} a={3} b={1} />
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
      notes: 'الطرح الرأسي. اطلب من الطلاب أن يحوّطوا المسائل التي ناتجها صفر في كتبهم.',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{FIND_CIRCLE}</p>
          <div className="qgrid four">
            <VQ n={14} a={8} b={8} />
            <VQ n={15} a={6} b={0} />
            <VQ n={16} a={5} b={5} />
            <VQ n={17} a={9} b={1} />
            <VQ n={18} a={3} b={2} />
            <VQ n={19} a={1} b={1} />
            <VQ n={20} a={8} b={0} />
            <VQ n={21} a={5} b={0} />
          </div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={120} />
          </Ctrls>
        </>
      ),
    },

    /* ================= مهارات التفكير العليا ٢٢–٢٣ ================= */
    {
      sec: 'hot', min: 3,
      notes: 'الجبر: المطلوب عدد الخرزات التي أضاعها، فهو العدد المطروح المجهول. الجملتان تعطيان العدد نفسه، لكن الجملة التي «تبيّن» القصة هي ١٢ − □ = ٧ (من ١٢ ضاع عدد فبقي ٧).',
      content: (
        <>
          <div className="row">
            <Tag kind="ex">{HOT}</Tag>
          </div>
          <div className="qgrid one">
            <QCard n={22}>
              <div className="mcq-wrap">
                <p className="qtext" style={{ margin: 0 }}>
                  <b style={{ color: 'var(--ex)' }}>الجَبْرُ:</b> مَعَ سَعِيدٍ ١٢ خَرَزَةً. أَضَاعَ بَعْضًا مِنْهَا وَبَقِيَ مَعَهُ ٧ خَرَزَاتٍ. أُحَوِّطُ جُمْلَةَ الطَّرْحِ الَّتِي تُبَيِّنُ عَدَدَ الْخَرَزَاتِ الَّتِي أَضَاعَهَا سَعِيدٌ.
                </p>
                <MCQ options={['١٢ − ٧ = □', '١٢ − □ = ٧']} answer="١٢ − □ = ٧" award />
              </div>
            </QCard>
            <QCard n={23}>
              <p className="qtext" style={{ margin: 0 }}>
                كَمْ خَرَزَةً أَضَاعَ سَعِيدٌ؟
              </p>
              <div className="flines">
                <Sentence t={[12, '−', { b: 5 }, '=', 7]} big />
              </div>
              <Step kind="ans" className="inl">أضاع ٥ خرزات</Step>
            </QCard>
          </div>
          <Ctrls>
            <NextButton />
          </Ctrls>
        </>
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
            center={<>طرح الصفر<br />وطرح الكل</>}
            items={[
              { kind: 'rule', cap: 'طرح الصفر', text: 'الناتج هو العدد نفسه: ٩ − ٠ = ٩' },
              { kind: 'ex', cap: 'طرح الكل', text: 'الناتج صفر: ٩ − ٩ = ٠' },
              { kind: 'qs', cap: 'الصفر', text: 'يعني لا شيء.' },
              { kind: 'warn', cap: 'أنتبه', text: '٩ − ٠ يختلف عن ٩ − ٩' },
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
          <SlideHead tag="تذكرة الخروج" kind="qs">صفر أم العدد نفسه؟</SlideHead>
          <div className="ticket">
            <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="٥ − ٠ = ؟" options={['٠', '٥', '١٠']} answer="٥" /></Card>
            <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="١١ − ١١ = ؟" options={['٠', '١', '١١']} answer="٠" /></Card>
            <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="٧ − □ = ٧. ما العدد في □؟" options={['٠', '١', '٧']} answer="٠" /></Card>
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
