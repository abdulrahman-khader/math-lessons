import type { ReactNode } from 'react';
import {
  Card, Cols, Counters, Ctrls, Eq, GoHomeButton, HBars, IfTeams, MCQ, Mark, MindMap, NextButton, QCard, QCol, QuestionSlide,
  Sentence, SlideHead, Solution, Stack, Step, Tag, ThinkPairShare, TimerButton, Winner, defineLesson, type HlKey, type Token,
} from '@engine';
import { IntroClip } from './clip';

/** خانة العملية المفقودة (الدائرة الرمادية في الكتاب) */
const op = (b: '+' | '−'): Token => ({ b, box: true });

/** سؤال «أكتب العملية»: الجملة، ثم العملية في الخانة، ثم التحقق */
function OpQ({ n, t, check }: { n: number; t: Token[]; check: ReactNode }) {
  return (
    <QCard n={n}>
      <div className="flines">
        <Sentence t={t} />
        <Step>
          <span style={{ fontSize: '.72em', fontWeight: 700, color: 'var(--ex)' }}>{check}</span>
        </Step>
      </div>
    </QCard>
  );
}

/** المذاقات من الأعلى إلى الأسفل كما في الكتاب */
const ICE = {
  title: 'مذاقاتُ المثلجاتِ المفضلة',
  labels: ['فراولةٌ', 'فستقٌ', 'توتٌ', 'فانيليا', 'شوكولاتةٌ'],
  values: [51, 65, 133, 88, 97],
  max: 140,
  grid: 20,
  lab: 20,
  xTitle: 'عددُ المشاركينَ في التصويتِ',
  yTitle: 'المذاقاتُ',
};

/** سؤال من أسئلة المثلجات: نص السؤال، ثم الحل خطوة بخطوة مع إبراز الأعمدة */
function IceQ({ n, q, steps }: { n: number; q: string; steps: { text: ReactNode; hl: HlKey[]; ans?: boolean }[] }) {
  return (
    <QCard n={n} className="iceq">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.2em', paddingInlineStart: '1.6em' }}>
        <p className="qtext" style={{ margin: 0, fontSize: '.8em' }}>{q}</p>
        <Solution>
          {steps.map((s, i) => (
            <Step key={i} hl={s.hl} kind={s.ans ? 'ans' : undefined}>
              {s.text}
            </Step>
          ))}
        </Solution>
      </div>
    </QCard>
  );
}

const READY = 'اسْتَعِدَّ · ص ١٠٧';
const CHECK = 'تأكَّدْ · ص ١٠٨';
const PRACTICE_108 = 'تدرَّبْ وحُلَّ المسائلَ · ص ١٠٨';
const PRACTICE_109 = 'تدرَّبْ وحُلَّ المسائلَ · ص ١٠٩';
const LIFE = 'مسألةٌ منْ واقعِ الحياةِ · ص ١٠٩';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ١٠٩';

const WRITE_TWO = 'أُكْتُبْ عِبارةً وجملةً عدديَّةً تُمثِّلُ كلًّا منَ المَسألَتيْنِ الآتِيتَيْنِ، واستعمِلِ النماذجَ إذَا لَزِمَ الأمرُ:';
const WRITE_MANY = 'أُكْتُبْ عِبارةً وجملةً عدديةً تُمثِّلُ كلًّا مِنَ المسائلِ الآتيةِ، واستعملِ النماذجَ إذا لَزِمَ الأمرُ:';
const WHICH_OP = 'أُكْتُبِ العمليَّةَ (+ أوْ -) الَّتِي تجعلُ الجُملَ العددِيَّةَ الآتيةَ صحيحةً؟ استعمِلِ النماذجَ إذَا لَزِمَ الأمرُ:';
const ICE_INTRO = 'مثلجات: استعملِ التمثيلَ المُجاوِرَ لتُجيبَ عنِ الأسئلةِ ١٩ - ٢٢';

export default defineLesson({
  meta: {
    id: 'g4-4-1-expressions-sentences',
    code: '٤-١',
    title: 'العِباراتُ والجُملُ العددِيَّةُ',
    shortTitle: 'العبارات والجمل العددية',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الرابع: الأنماط والجبر',
    source: 'الجزء الأول · ص ١٠٧–١٠٩',
    minutes: 45,
    idea: 'أكتبُ عباراتٍ وجملًا عدديَّةً وأمثِّلُهَا.',
    bookQuestions: 25,
  },
  sectionDesc: {
    engage: 'تذكّر الجمع والطرح والمقارنة',
    explore: 'استعد · ما الفرق؟',
    explain: 'القاعدة · مثال ١ · مثال ٢',
    elab: 'نعمل معًا · الحياة',
    check: 'الأسئلة ١–٩',
    practice: 'الأسئلة ١٠–٢٢',
    hot: 'الأسئلة ٢٣–٢٥',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردتين. اسأل: ما الفرق بين «عبارة» و«جملة» في اللغة العربية؟ الجملة تامة المعنى؛ وهكذا في الرياضيات.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أكتبُ عباراتٍ وجملًا عدديَّةً وأمثِّلُهَا.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>العِبارةُ العدديَّةُ</Mark> · <Mark>الجملةُ العدديَّةُ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أميّز العبارة العددية من الجملة العددية.</li>
                <li>أكتب عبارة وجملة عددية تمثّلان مسألة.</li>
                <li>أختار العملية (+ أو −) التي تجعل الجملة صحيحة.</li>
                <li>أكتب جملة عددية من بيانات تمثيل بالأعمدة.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة: تذكّر ================= */
    {
      sec: 'engage', min: 1,
      notes: 'مراجعة سريعة للجمع والطرح والمقارنة؛ نحتاجها كلها اليوم. أدر العجلة لاختيار طالب، وامنح نجمة عند الإجابة الصحيحة.',
      content: (
        <>
          <SlideHead tag="تذكّر" kind="ink">الجمع والطرح والمقارنة</SlideHead>
          <Cols even>
            <MCQ q={<>ما ناتج <Eq>٣٠ − ١٢</Eq>؟</>} options={['٤٢', '١٨', '٢٢']} answer="١٨" award />
            <MCQ q={<>أيّهما أكبر: <Eq>٢٥ + ١٠</Eq> أم <Eq>٤٠</Eq>؟</>} options={['٢٥ + ١٠', '٤٠', 'متساويان']} answer="٤٠" award />
          </Cols>
          <Card kind="qs" cap="سؤال للتفكير">
            نكتب في الرياضيات <Eq>٢٥ + ١٠</Eq> أحيانًا، و<Eq>٢٥ + ١٠ = ٣٥</Eq> أحيانًا أخرى. هل هما الشيء نفسه؟
          </Card>
        </>
      ),
    },

    /* ================= استعد ================= */
    {
      sec: 'explore', min: 3,
      notes: 'فكّر – زاوج – شارك: ماذا تمثّل ١٦ − ٣؟ بعد المشاركة اضغط المسافة. ركّز على أن ١٦ − ٣ «تمثّل» عددًا (الباقي) دون أن نكتب الناتج.',
      content: (
        <>
          <SlideHead tag={READY} kind="qs">تفاحات هند</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">في السَّلَّةِ ١٦ تُفَّاحةً. أكلتْ منهَا هندُ ٣ تُفاحاتٍ. العِبارةُ <Eq>١٦ - ٣</Eq> تُمثِّلُ عددَ التُّفَّاحاتِ المُتبقِّيةِ.</p>
              <ThinkPairShare />
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step><Eq>١٦</Eq> عددُ التفاحاتِ كلِّها.</Step>
                <Step><Eq>٣</Eq> التفاحاتُ المأكولةُ.</Step>
                <Step kind="ans"><Eq>١٦ − ٣</Eq> أعدادٌ وعمليةٌ تمثّلُ عددَ التفاحاتِ المتبقيةِ.</Step>
              </Solution>
            </QCol>
            <Counters groups={[{ n: 16, label: 'عددُ التفاحاتِ كلِّها ١٦' }]} crossed={3} size={60} />
          </Cols>
        </>
      ),
    },

    /* ================= استكشاف: ما الفرق؟ ================= */
    {
      sec: 'explore', min: 2,
      notes: 'لا تذكر المصطلحين بعد. اطلب من الأزواج أن يجدوا الفرق بين المجموعتين. الإجابة المتوقعة: الثانية فيها = أو < أو >، والأولى لا.',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">ما الفرق بين المجموعتين؟</SlideHead>
          <Cols even>
            <Card kind="rule" cap="المجموعة الأولى">
              <div className="flines" style={{ alignItems: 'center' }}>
                <Sentence t={[8, '+', 6]} />
                <Sentence t={[20, '−', 5]} />
                <Sentence t={[3, '+', 4, '+', 1]} />
              </div>
            </Card>
            <Card kind="qs" cap="المجموعة الثانية">
              <div className="flines" style={{ alignItems: 'center' }}>
                <Sentence t={[8, '+', 6, '=', 14]} />
                <Sentence t={[20, '−', 5, '>', 10]} />
                <Sentence t={[3, '+', 4, '+', 1, '<', 9]} />
              </div>
            </Card>
          </Cols>
          <ThinkPairShare />
          <Ctrls><NextButton /></Ctrls>
          <Step><Card kind="ex" cap="لاحظ">في المجموعتين أعدادٌ وعملياتٌ، لكنّ الثانية فيها <b>إشارة</b>: = أو &gt; أو &lt;.</Card></Step>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ التعريفين من الكتاب، واطلب من الطلاب قراءة الأمثلة. اسأل: ما الذي أُضيف إلى ٥ + ٧ حتى صارت جملة؟',
      content: (
        <>
          <SlideHead tag="القاعدة · ص ١٠٧" kind="rule">العبارة العددية والجملة العددية</SlideHead>
          <Card kind="rule" style={{ fontSize: '.95em', fontWeight: 700, lineHeight: 1.85 }}>
            تَتَضمَّنُ <Mark>العِبارةُ العدديَّةُ</Mark> أعدادًا وعمليَّاتٍ، وتمثِّلُ كمِّيَّةً رياضيَّةً، ومنْ أمثلتِها:
            <div className="row" style={{ justifyContent: 'space-around', margin: '.2em 0' }}>
              <Sentence t={[5, '+', 7]} />
              <Sentence t={[3, '+', 2, '+', 5]} />
              <Sentence t={[12, '−', 8]} />
            </div>
          </Card>
          <Card kind="qs" style={{ fontSize: '.95em', fontWeight: 700, lineHeight: 1.85 }}>
            أمَّا <Mark>الجملةُ العدديَّةُ</Mark> فهيَ عِبارةٌ تتضمَّنُ أعدادًا وإحدَى الإشارَاتِ (= أوْ &gt; أوْ &lt;)، ومِن أمثلتِهَا:
            <div className="row" style={{ justifyContent: 'space-around', margin: '.2em 0' }}>
              <Sentence t={[5, '+', 7, '=', 12]} />
              <Sentence t={[2, '+', 5, '<', 10]} />
              <Sentence t={[12, '−', 8, '=', 4]} />
            </div>
          </Card>
        </>
      ),
    },

    /* ================= مثال ١ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: الأحمر والأخضر فقط (لا الأصفر). اكتب العبارة أولًا ثم أكمل إلى جملة بإضافة = والناتج.',
      content: (
        <>
          <SlideHead tag="مثال ١ · أنا أعمل · ص ١٠٧" kind="ex">كتابة جملة عددية</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext"><b style={{ color: 'var(--ex)' }}>تفاحٌ:</b> اِستعمِلِ المعلُوماتِ المُوضَّحةَ علَى الرَّسمِ، وَاكْتُبْ عبارةً عددِيَّةً عَنِ التُّفَّاحِ الأحمرِ و التُّفَّاحِ الأخضرِ، ثُمَّ أُكتُبْ جملةً عددِيَّةً تُمثِّلُ عددَ التُّفَّاحِ في السَّلَّةِ.</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>أستعملُ قطعَ العدِّ: ٥ للأحمرِ و٤ للأخضرِ.</Step>
                <Step kind="ans">العبارةُ العدديةُ: <Eq>٥ + ٤</Eq></Step>
                <Step kind="ans">الجملةُ العدديةُ: <Eq>٥ + ٤ = ٩</Eq></Step>
              </Solution>
            </QCol>
            <Stack>
              <Card kind="ex" cap="تفاح">
                <span style={{ fontWeight: 700 }}>أحمرُ ٥ · أخضرُ ٤ · أصفرُ ٦</span>
              </Card>
              <Counters groups={[{ n: 5, label: 'تُفَّاحٌ أحمرُ' }, { n: 4, label: 'تُفَّاحٌ أخضرُ' }]} />
            </Stack>
          </Cols>
        </>
      ),
    },

    /* ================= مثال ٢ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: جرّب الطرح أولًا بقطع العد (نشطب ٣)، ثم الجمع. القاعدة: نجرّب العمليتين ونتحقق.',
      content: (
        <>
          <SlideHead tag="مثال ٢ · ص ١٠٨" kind="ex">كتابة جملة عددية</SlideHead>
          <div className="qtext row" style={{ margin: 0, gap: '.4em' }}>
            أيٌّ مِنَ العمليَّتَيْنِ (+ أمْ -) تجعلُ الجملةَ العدديَّةَ <Sentence t={[4, op('+'), 3, '=', 7]} /> صحيحةً؟
          </div>
          <Ctrls><NextButton /></Ctrls>
          <Cols even>
            <Step>
              <Card kind="warn" cap="أجرّب الطرح">
                <Counters groups={[{ n: 4 }]} crossed={3} />
                <div className="flines" style={{ alignItems: 'center' }}>
                  <Sentence t={[4, '−', 3, '=', 7]} />
                  <Sentence t={[7, '=', 1]} />
                  <b style={{ color: 'var(--bad)' }}>خطأٌ</b>
                </div>
              </Card>
            </Step>
            <Step>
              <Card kind="ex" cap="أجرّب الجمع">
                <Counters groups={[{ n: 4 }, { n: 3 }]} />
                <div className="flines" style={{ alignItems: 'center' }}>
                  <Sentence t={[4, '+', 3, '=', 7]} />
                  <Sentence t={[7, '=', 7]} />
                  <b style={{ color: 'var(--good)' }}>صحيحٌ</b>
                </div>
              </Card>
            </Step>
          </Cols>
          <Step kind="ans">إِذَنْ إشارةُ + تجعلُ الجملةَ العدديَّةَ صحيحةً.</Step>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'بعد القاعدة والمثالين: المقطع يؤكد الفكرة بمثال غير مثال الكتاب. لا يبدأ إلا عندما تضغط تشغيل (أو من الجوال). أوقفه قبل كل نتيجة واسأل: عبارة أم جملة؟',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 3,
      notes: 'نعمل معًا: اختر طالبًا بالعجلة لكل سؤال، واطلب منه أن يعلّل قبل أن يضغط. امنح النجمة لفريقه.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">عبارة أم جملة؟ وأيّ عملية؟</SlideHead>
          <div className="qgrid two">
            <MCQ q={<>ما نوع <Eq>١٥ + ٩</Eq>؟</>} options={['عبارة عددية', 'جملة عددية']} answer="عبارة عددية" award />
            <MCQ q={<>ما نوع <Eq>٣٠ − ١٠ = ٢٠</Eq>؟</>} options={['عبارة عددية', 'جملة عددية']} answer="جملة عددية" award />
            <MCQ q={<>أيّ عملية تجعل <Eq>١٢ ○ ٥ = ٧</Eq> صحيحة؟</>} options={['+', '−']} answer="−" award />
            <MCQ q={<>أيّ عملية تجعل <Eq>٦ ○ ٨ &gt; ١٣</Eq> صحيحة؟</>} options={['+', '−']} answer="+" award />
          </div>
        </>
      ),
    },

    /* ================= من واقع الحياة ================= */
    {
      sec: 'elab', min: 1,
      notes: 'اسأل: أين نكتب جملًا عددية في حياتنا؟ (فاتورة المقصف، النتيجة في المباراة). ثم السؤال.',
      content: (
        <>
          <SlideHead tag="من واقع الحياة" kind="ex">في المقصف</SlideHead>
          <Card kind="qs">
            اشترى ماجد عصيرًا بـ ٣ ريالات وفطيرة بـ ٤ ريالات، ودفع ثمنهما.
          </Card>
          <MCQ
            q="أيّ جملة عددية تمثّل ما دفعه ماجد؟"
            options={['٣ + ٤', '٣ + ٤ = ٧', '٤ − ٣ = ١']}
            answer="٣ + ٤ = ٧"
            award
          />
        </>
      ),
    },

    /* ================= تأكد ١–٢ ================= */
    {
      sec: 'check', min: 2,
      notes: '«أنت تعمل»: يكتب كل طالب العبارة ثم الجملة على السبورة الصغيرة. انتبه لمن يكتب الجملة دون الناتج.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={60}
          intro={WRITE_TWO}
          question="كتبتْ جُمانةُ اليومَ ٣ رسائلَ، ورسالتينِ يومَ أمسِ. فكمْ رسالةً كتبتْهَا جُمانةُ في اليومينِ؟"
          hint="«في اليومين» تعني أننا نضمّ رسائل اليوم إلى رسائل أمس."
          steps={[
            { text: 'نضمّ الرسائل: نجمع.' },
            { text: <>العبارةُ العدديةُ: <Eq>٣ + ٢</Eq></>, kind: 'ans' },
            { text: <>الجملةُ العدديةُ: <Eq>٣ + ٢ = ٥</Eq> رسائل</>, kind: 'ans' },
          ]}
          chart={<Counters groups={[{ n: 3, label: 'اليوم' }, { n: 2, label: 'أمس' }]} size={60} />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'كلمة «باع» و«تتبقى» تعنيان الطرح. اطلب من طالب أن يشطب ٣ على السبورة بالقلم.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} time={60}
          question="لَدَى مُزارِعٍ ٦ بَقَراتٍ. إذا باعَ منهَا ٣، فكمْ بقرةً تتبقَّى لديهِ؟"
          hint="باع = أخذ من العدد. ماذا يتبقى؟"
          steps={[
            { text: 'باع منها: نطرح.' },
            { text: <>العبارةُ العدديةُ: <Eq>٦ − ٣</Eq></>, kind: 'ans' },
            { text: <>الجملةُ العدديةُ: <Eq>٦ − ٣ = ٣</Eq> بقرات</>, kind: 'ans' },
          ]}
          chart={<Counters groups={[{ n: 6, label: 'البقرات' }]} crossed={3} size={60} />}
        />
      ),
    },

    /* ================= تأكد ٣–٨ ================= */
    {
      sec: 'check', min: 4,
      notes: 'كل طالب يجرّب العمليتين على السبورة الصغيرة. كل ضغطة تُظهر العملية ثم التحقق. في ٣ و٥: الجمع يعطي عددًا يساوي الطرف الآخر، والمطلوب «أصغر من»، فالجمع لا يصلح.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{CHECK}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{WHICH_OP}</p>
          <div className="qgrid three" style={{ fontSize: '1.3em' }}>
            <OpQ n={3} t={[9, op('−'), 2, '<', 11]} check={<><Eq>٩ − ٢ = ٧</Eq> و <Eq>٧ &lt; ١١</Eq></>} />
            <OpQ n={4} t={[18, '=', 28, op('−'), 10]} check={<><Eq>٢٨ − ١٠ = ١٨</Eq></>} />
            <OpQ n={5} t={[14, op('−'), 7, '<', 10, '+', 11]} check={<><Eq>١٤ − ٧ = ٧</Eq> و <Eq>٧ &lt; ٢١</Eq></>} />
            <OpQ n={6} t={[18, op('−'), 9, '=', 9]} check={<><Eq>١٨ − ٩ = ٩</Eq></>} />
            <OpQ n={7} t={[19, op('+'), 20, '>', 38]} check={<><Eq>١٩ + ٢٠ = ٣٩</Eq> و <Eq>٣٩ &gt; ٣٨</Eq></>} />
            <OpQ n={8} t={[45, op('−'), 40, '=', 5]} check={<><Eq>٤٥ − ٤٠ = ٥</Eq></>} />
          </div>
          <Ctrls>
            <NextButton label="الخطوة التالية" />
            <TimerButton sec={180} />
          </Ctrls>
        </>
      ),
    },

    /* ================= تأكد ٩ · تحدّث ================= */
    {
      sec: 'check', min: 1,
      notes: 'تحدّث: اطلب من طالبين أن يشرحا بلغتهما، ثم اعرض الإجابة.',
      content: (
        <QuestionSlide
          source={CHECK} n={9} tps tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]}
          question="مَا الفرقُ بينَ العِبارةِ العددِيَّةِ والجُملةِ العدديَّةِ؟"
          hint="تذكّر المجموعتين: ماذا كان في الثانية ولم يكن في الأولى؟"
          steps={[
            { text: 'العبارةُ العدديةُ تتضمّنُ أعدادًا وعملياتٍ فقط، مثل ٥ + ٧.' },
            { text: 'الجملةُ العدديةُ تتضمّنُ أعدادًا وإحدى الإشاراتِ (= أو > أو <)، مثل ٥ + ٧ = ١٢.', kind: 'ans' },
          ]}
          chart={
            <Stack>
              <Card kind="rule" cap="عبارة عددية"><Sentence t={[5, '+', 7]} /></Card>
              <Card kind="qs" cap="جملة عددية"><Sentence t={[5, '+', 7, '=', 12]} /></Card>
            </Stack>
          }
        />
      ),
    },

    /* ================= تدرب ١٠–١٢ ================= */
    {
      sec: 'practice', min: 1,
      notes: 'كلمة «فرق المدرسة» تعني الفريقين معًا: نجمع.',
      content: (
        <QuestionSlide
          source={PRACTICE_108} n={10} time={60}
          intro={WRITE_MANY}
          question="فازَ فريقُ كُرةِ القدمِ في المدرسةِ بـ ١١ مباراةً، بينَمَا فازَ فريقُ كُرةِ الطَّائرةِ بـ ١٤ مباراةً. فكمْ مباراةً فازتْ بِهَا فِرقُ المدرسةِ؟"
          hint="نريد مباريات الفريقين معًا."
          steps={[
            { text: <>العبارةُ العدديةُ: <Eq>١١ + ١٤</Eq></>, kind: 'ans' },
            { text: <>الجملةُ العدديةُ: <Eq>١١ + ١٤ = ٢٥</Eq> مباراةً</>, kind: 'ans' },
          ]}
          chart={<Counters groups={[{ n: 11, label: 'كرة القدم' }, { n: 14, label: 'كرة الطائرة' }]} size={40} />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'أربعة ألوان: نجمع الأعداد الأربعة. شجّع جمع ٤ + ١٦ أولًا لأنهما يكوّنان ٢٠.',
      content: (
        <QuestionSlide
          source={PRACTICE_108} n={11} time={90}
          question="لَدَى هيفاءَ ٤ رابطاتِ شَعرٍ صفراءَ، و١٦ رابطةً حمراءَ، و٢ بيضاوَانِ، و١٤ خضراءَ. فكمْ رابطةَ شَعرٍ لديهَا؟"
          hint="كم لونًا في المسألة؟ نجمعها كلها."
          steps={[
            { text: <>العبارةُ العدديةُ: <Eq>٤ + ١٦ + ٢ + ١٤</Eq></>, kind: 'ans' },
            { text: <><Eq>٤ + ١٦ = ٢٠</Eq> ، <Eq>٢٠ + ٢ = ٢٢</Eq> ، <Eq>٢٢ + ١٤ = ٣٦</Eq></> },
            { text: <>الجملةُ العدديةُ: <Eq>٤ + ١٦ + ٢ + ١٤ = ٣٦</Eq> رابطةً</>, kind: 'ans' },
          ]}
          chart={
            <Stack>
              <Card kind="ex" cap="رابطات الشعر">
                <span style={{ fontWeight: 700, lineHeight: 1.9 }}>صفراء ٤ · حمراء ١٦ · بيضاء ٢ · خضراء ١٤</span>
              </Card>
            </Stack>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: '«أعطى» و«تتبقى»: طرح. انتبه لمن يجمع ٣٧ + ٩.',
      content: (
        <QuestionSlide
          source={PRACTICE_108} n={12} time={60}
          question="اِصْطَادَ صيَّادٌ ٣٧ سمكةً فِي يومٍ مَا. إذا أعطى فقيرًا ٩ منهَا. فكمْ سمكةً تتبقَّى معَهُ؟"
          hint="أعطى من السمك: هل يزيد ما معه أم ينقص؟"
          steps={[
            { text: <>العبارةُ العدديةُ: <Eq>٣٧ − ٩</Eq></>, kind: 'ans' },
            { text: <>الجملةُ العدديةُ: <Eq>٣٧ − ٩ = ٢٨</Eq> سمكةً</>, kind: 'ans' },
          ]}
          chart={<Counters groups={[{ n: 37, label: 'السمك' }]} crossed={9} size={34} />}
        />
      ),
    },

    /* ================= تدرب ١٣–١٨ ================= */
    {
      sec: 'practice', min: 3,
      notes: 'احسب الطرف المعلوم أولًا، ثم جرّب العمليتين. في ١٦ و١٧ و١٨ انتبه لاتجاه إشارة المقارنة.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{PRACTICE_109}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{WHICH_OP}</p>
          <div className="qgrid two" style={{ fontSize: '1.05em' }}>
            <OpQ n={13} t={[444, op('+'), 6, '=', 460, '−', 10]} check={<><Eq>٤٤٤ + ٦ = ٤٥٠</Eq> و <Eq>٤٦٠ − ١٠ = ٤٥٠</Eq></>} />
            <OpQ n={14} t={[74, op('−'), 47, '=', 17, '+', 10]} check={<><Eq>٧٤ − ٤٧ = ٢٧</Eq> و <Eq>١٧ + ١٠ = ٢٧</Eq></>} />
            <OpQ n={15} t={[125, '−', 27, '=', 23, op('+'), 75]} check={<><Eq>١٢٥ − ٢٧ = ٩٨</Eq> و <Eq>٢٣ + ٧٥ = ٩٨</Eq></>} />
            <OpQ n={16} t={[345, '−', 126, '>', 217, op('−'), 4]} check={<><Eq>٣٤٥ − ١٢٦ = ٢١٩</Eq> و <Eq>٢١٧ − ٤ = ٢١٣</Eq></>} />
            <OpQ n={17} t={[520, op('−'), 317, '<', 400, '+', 150]} check={<><Eq>٥٢٠ − ٣١٧ = ٢٠٣</Eq> و <Eq>٤٠٠ + ١٥٠ = ٥٥٠</Eq></>} />
            <OpQ n={18} t={[715, '−', 617, '<', 25, op('+'), 75]} check={<><Eq>٧١٥ − ٦١٧ = ٩٨</Eq> و <Eq>٢٥ + ٧٥ = ١٠٠</Eq></>} />
          </div>
          <Ctrls>
            <NextButton label="الخطوة التالية" />
            <TimerButton sec={240} />
          </Ctrls>
        </>
      ),
    },

    /* ================= تدرب ١٩–٢٠: مثلجات ================= */
    {
      sec: 'practice', min: 2,
      notes: 'اقرأ الأعداد عند أطراف الأعمدة. الأكثر تفضيلًا: أطول عمودين.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{LIFE}</Tag>
          </div>
          <Cols>
            <QCol>
              <p className="intro">{ICE_INTRO}</p>
              <IceQ
                n={19}
                q="مَا المذاقانِ الأكثرُ تَفْضيلًا ؟ أُكتُبْ جملةً عددِيَّةً تُعبِّرُ عنِ الفرقِ بينَ عَدَدَي الَّذِينَ يُفضِّلونَهُمَا."
                steps={[
                  { text: 'أطولُ عمودينِ: التوتُ ١٣٣ والشوكولاتةُ ٩٧.', hl: ['p2', 'p4', 'v2', 'v4'] },
                  { text: <><Eq>١٣٣ − ٩٧ = ٣٦</Eq></>, hl: [], ans: true },
                ]}
              />
              <IceQ
                n={20}
                q="أُكتُبْ جملةً عددِيَّةً تُعبِّرُ عنْ مجموعِ الَّذِينَ يُفضِّلونَ مذاقَ الفَانِيليا والَّذِينَ يُفَضِّلونَ مذاقَ التُّوتِ."
                steps={[
                  { text: 'الفانيليا ٨٨ والتوتُ ١٣٣.', hl: ['p3', 'p2', 'v3', 'v2'] },
                  { text: <><Eq>٨٨ + ١٣٣ = ٢٢١</Eq></>, hl: [], ans: true },
                ]}
              />
              <Ctrls><NextButton /><TimerButton sec={120} /></Ctrls>
            </QCol>
            <HBars {...ICE} color="#f4a261" ends />
          </Cols>
        </>
      ),
    },

    /* ================= تدرب ٢١–٢٢ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'في ٢٢ يجمع الطلاب خمسة أعداد: شجّع الجمع على مراحل وكتابة المجاميع الجزئية.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{LIFE}</Tag>
          </div>
          <Cols>
            <QCol>
              <IceQ
                n={21}
                q="أُكتُبْ جملةً عددِيَّةً تُعبِّرُ عنِ الفرقِ بينَ عددِ الَّذِينَ يُفضِّلُونَ الفَانِيليا وعددِ الَّذِينَ يُفضِّلُونَ الفراوِلةَ."
                steps={[
                  { text: 'الفانيليا ٨٨ والفراولةُ ٥١.', hl: ['p3', 'p0', 'v3', 'v0'] },
                  { text: <><Eq>٨٨ − ٥١ = ٣٧</Eq></>, hl: [], ans: true },
                ]}
              />
              <IceQ
                n={22}
                q="أُكتُبْ جملةً عددِيَّةً تُعبِّرُ عنْ مجموعِ كلِّ المشاركِينَ في التَّصويتِ."
                steps={[
                  { text: 'أجمعُ الأعمدةَ الخمسةَ.', hl: ['p0', 'p1', 'p2', 'p3', 'p4', 'v0', 'v1', 'v2', 'v3', 'v4'] },
                  { text: <><Eq>٥١ + ٦٥ = ١١٦</Eq> ، <Eq>١١٦ + ١٣٣ = ٢٤٩</Eq> ، <Eq>٢٤٩ + ٨٨ = ٣٣٧</Eq> ، <Eq>٣٣٧ + ٩٧ = ٤٣٤</Eq></>, hl: [] },
                  { text: <><Eq>٥١ + ٦٥ + ١٣٣ + ٨٨ + ٩٧ = ٤٣٤</Eq></>, hl: [], ans: true },
                ]}
              />
              <Ctrls><NextButton /><TimerButton sec={150} /></Ctrls>
            </QCol>
            <HBars {...ICE} color="#f4a261" ends />
          </Cols>
        </>
      ),
    },

    /* ================= مهارات التفكير العليا ================= */
    {
      sec: 'hot', min: 1,
      notes: 'تحدٍّ: قد يكتب الطلاب عبارات مختلفة (٢٩ − ١٦ و١٣ مثلًا). اقبل كل مقارنة صحيحة.',
      content: (
        <QuestionSlide
          source={HOT} n={23} tps tags={[{ kind: 'warn', text: 'تَحَدٍّ' }]}
          question="اِستعمِلِ الأعدادَ ١٣ وَ ١٦ وَ ٢٩ في كتابةِ عبارتينِ عدديتينِ، ثُمَّ قارِنْ بينَ العِبارتينِ مستعملًا (>، <، =)."
          hint="لاحظ: ١٣ + ١٦ تساوي أحد الأعداد الثلاثة."
          steps={[
            { text: <>العبارتانِ: <Eq>١٣ + ١٦</Eq> و <Eq>٢٩</Eq></> },
            { text: <>المقارنةُ: <Eq>١٣ + ١٦ = ٢٩</Eq></>, kind: 'ans' },
          ]}
          chart={
            <Card kind="qs" cap="الأعداد">
              <div className="row" style={{ justifyContent: 'space-around', fontSize: '1.6em', fontWeight: 800 }}>
                <span>١٣</span><span>١٦</span><span>٢٩</span>
              </div>
            </Card>
          }
        />
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'اكتشف المختلف: اطلب من الطالب أن يعلّل: ما الذي في البطاقة وليس في غيرها؟',
      content: (
        <QuestionSlide
          source={HOT} n={24} tags={[{ kind: 'warn', text: 'اكتشِفِ المختلفَ' }]}
          question="أيٌّ ممَّا يأتِي ليستْ عبارةً عدديةً؟ اِشْرحْ إجابَتَكَ."
          hint="العبارة العددية فيها أعداد وعمليات فقط."
          steps={[
            { text: 'ثلاثُ بطاقاتٍ فيها أعدادٌ وعملياتٌ فقط.' },
            { text: <><Eq>٢٨ − ٩ = ١٩</Eq> ليستْ عبارةً؛ لأنّها تحوي إشارةَ = فهي جملةٌ عدديةٌ.</>, kind: 'ans' },
          ]}
          chart={<MCQ options={['٤١ + ٦٦', '١٧ + ٣', '٢٨ − ٩ = ١٩', '١٢ + ٢ + ٦']} answer="٢٨ − ٩ = ١٩" award />}
        />
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'أكتب: كل طالب يكتب مسألة في دفتره، ثم اقرأ اثنتين أو ثلاثًا. تأكد أن المسألة فيها طرح وأن الجملة فيها =.',
      content: (
        <QuestionSlide
          source={HOT} n={25} tps tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="مَسألةً مِنْ واقعِ الحَياةِ تمثلُ جملةً عدديةً مستعملًا الطرحَ."
          hint="فكّر في شيء معك، ثم أعطيت أو أنفقت أو أكلت جزءًا منه."
          steps={[
            { text: 'مثالٌ: معَ خالدٍ ٤٥ ريالًا، أنفقَ منها ٢٠ ريالًا، فكمْ بقيَ معَهُ؟' },
            { text: <>الجملةُ العدديةُ: <Eq>٤٥ − ٢٠ = ٢٥</Eq></>, kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="كلمات تدل على الطرح">
              <span style={{ fontWeight: 700, lineHeight: 1.9 }}>أنفق · أعطى · أكل · باع · بقي · تتبقّى · الفرق</span>
            </Card>
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
            center={<>العبارات<br />والجمل العددية</>}
            items={[
              { kind: 'rule', cap: 'العبارة العددية', text: 'أعداد وعمليات فقط، مثل ٥ + ٧' },
              { kind: 'qs', cap: 'الجملة العددية', text: 'أعداد وإحدى الإشارات (= أو > أو <)، مثل ٥ + ٧ = ١٢' },
              { kind: 'ex', cap: 'من المسألة', text: 'نضمّ أو نزيد ← جمع · نأخذ أو يتبقى ← طرح' },
              { kind: 'warn', cap: 'العملية المفقودة', text: 'أجرّب + و − ثم أتحقق أيّهما تجعل الجملة صحيحة.' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 2,
      notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة ثم نعرض الإجابات. من يخطئ في الأول يحتاج مراجعة الفرق بين العبارة والجملة.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">ثلاثة أسئلة</SlideHead>
          <div className="ticket">
            <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="أيّها جملة عددية؟" options={['٧ + ٨', '٧ + ٨ = ١٥', '١٥ − ٨']} answer="٧ + ٨ = ١٥" /></Card>
            <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q={<>أيّ عملية تجعل <Eq>٢٤ ○ ٦ = ١٨</Eq> صحيحة؟</>} options={['+', '−']} answer="−" /></Card>
            <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="مع سعد ٥٠ ريالًا، اشترى كتابًا بـ ٣٥ ريالًا. أيّ جملة عددية تمثّل ما تبقّى معه؟" options={['٥٠ + ٣٥ = ٨٥', '٥٠ − ٣٥ = ١٥', '٣٥ − ١٥ = ٢٠']} answer="٥٠ − ٣٥ = ١٥" /></Card>
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
