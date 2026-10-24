import {
  Blank, Card, Cols, Counters, Ctrls, Eq, GoHomeButton, HBars, IfTeams, MCQ, Mark, MindMap, NextButton, QCard, QCol, QuestionSlide,
  Sentence, SlideHead, Solution, Stack, Step, Tag, TenTowers, ThinkPairShare, TimerButton, Winner, defineLesson,
  type CounterGroup, type Token,
} from '@engine';
import { IntroClip } from './clip';

/** خانة العدد المجهول (المربع الرمادي في الكتاب) */
const bx = (b: number): Token => ({ b, box: true });

/** سؤال «مثّل الجملة بالرسم وبالكلمات»: الجملة، ثم العدد في الخانة، ثم الرسم، ثم الكلمات */
function RepQ({ n, t, groups, crossed, words, size = 30 }: { n: number; t: Token[]; groups: CounterGroup[]; crossed?: number; words: string; size?: number }) {
  return (
    <QCard n={n}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.25em', paddingInlineStart: '1.6em' }}>
        <Sentence t={t} />
        <Step>
          <Counters groups={groups} crossed={crossed} size={size} />
        </Step>
        <Step>
          <span style={{ fontSize: '.68em', fontWeight: 700, color: 'var(--ex)' }}>{words}</span>
        </Step>
      </div>
    </QCard>
  );
}

/** المسافات بين بعض مدن المملكة كما في جدول الكتاب */
function Distances() {
  const rows: [string, string, string][] = [
    ['الرِّياضُ', 'مكةُ', '٨٧٠'],
    ['الدَّمَّامُ', 'الجبيلُ', '٨٣'],
    ['المدينةُ', 'تبوكُ', '٦٧٩'],
    ['أبْهَا', 'جازانُ', '٢٠٢'],
  ];
  return (
    <table className="data" style={{ fontSize: '.85em', alignSelf: 'center' }}>
      <thead>
        <tr><th colSpan={3}>المسافاتُ بينَ بعضِ مُدنِ المملكةِ</th></tr>
        <tr><th>مِنْ</th><th>إلَى</th><th>المسافةُ (كلم)</th></tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

const MEDALS = {
  title: 'الميدالياتُ الذهبيةُ التي حصلَ عليها عددٌ منَ اللاعبين',
  labels: ['محمدٌ', 'خالدٌ', 'وليدٌ', 'أحمدُ'],
  values: [1, 6, 3, 4],
  max: 7,
  grid: 1,
  lab: 1,
  xTitle: 'عددُ الميدالياتِ الذهبيةِ',
  yTitle: 'اللاعبُ',
};

/** قرّب إلى أقرب مئة: العدد ثم الناتج في خانة */
const RoundQ = ({ n, v, ans }: { n: number; v: string; ans: number }) => (
  <QCard n={n}>
    <div className="row" style={{ gap: '.5em', fontSize: '1.3em', fontWeight: 800 }}>
      <span>{v}</span>
      <span>←</span>
      <Blank v={ans} box />
    </div>
  </QCard>
);

const READY = 'اسْتَعِدَّ · ص ١١٠';
const CHECK = 'تأكَّدْ · ص ١١١';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ · ص ١١٢';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ١١٣';
const TEST = 'تدريبٌ على اختبارٍ · ص ١١٣';
const REVIEW = 'مراجعةٌ تراكميةٌ · ص ١١٣';

const MODEL_TWO = 'مَثِّلْ كلًّا منَ المسألتيْنِ الآتيتيْنِ، ثُمَّ اكتُبْ جُملةً عددِيَّةً:';
const MODEL_SENT = 'مَثِّلِ الجُملَ العددِيَّةَ بالرَّسمِ و بالكلماتِ:';
const TABLE_INTRO = 'اِستعمِلِ الجدولَ أدناه لحلِّ الأسئلةِ ١٦ - ١٨:';

export default defineLesson({
  meta: {
    id: 'g4-4-2-number-sentences',
    code: '٤-٢',
    title: 'تَمثيلُ الجُملِ العَددِيَّةِ وكتابتُها',
    shortTitle: 'تمثيل الجمل العددية وكتابتها',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الرابع: الأنماط والجبر',
    source: 'الجزء الأول · ص ١١٠–١١٣',
    minutes: 45,
    idea: 'أُمثِّلُ جُملَ الجمعِ والطَّرحِ العدديَّةَ، وأكتُبُهَا.',
    bookQuestions: 31,
  },
  sectionDesc: {
    engage: 'تذكّر الدرس ٤-١',
    explore: 'استعد: الخروف وأمّه',
    explain: 'القاعدة · الأمثلة ١–٣',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٧',
    practice: 'الأسئلة ٨–١٨',
    hot: 'الأسئلة ١٩–٣١',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. اسأل: بكم طريقة نستطيع أن نعرض مسألة؟ (رسم، كلمات، أرقام).',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أُمثِّلُ جُملَ الجمعِ والطَّرحِ العدديَّةَ، وأكتُبُهَا.</Card>
              <Card kind="rule" cap="المفردات"><Mark>الجُملةُ العددِيَّةُ</Mark></Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أمثّل جملة عددية بالرسم.</li>
                <li>أقرأ جملة عددية بالكلمات.</li>
                <li>أكتب جملة عددية لمسألة جمع أو طرح.</li>
                <li>أجد العدد المجهول في الجملة.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة: تذكّر ================= */
    {
      sec: 'engage', min: 1,
      notes: 'ربط بالدرس ٤-١. أدر العجلة لاختيار طالب، وامنح نجمة عند الإجابة الصحيحة.',
      content: (
        <>
          <SlideHead tag="تذكّر · الدرس ٤-١" kind="ink">عبارة أم جملة؟</SlideHead>
          <Cols even>
            <MCQ q={<>ما نوع <Eq>٤٠ − ١٥ = ٢٥</Eq>؟</>} options={['عبارة عددية', 'جملة عددية']} answer="جملة عددية" award />
            <MCQ q={<>أيّ عملية تجعل <Eq>١٨ ○ ٧ = ٢٥</Eq> صحيحة؟</>} options={['+', '−']} answer="+" award />
          </Cols>
          <Card kind="qs" cap="سؤال للتفكير">
            نكتب الجملة العددية بالأرقام. فهل نستطيع أن نعرضها <b>برسم</b>؟ أو نقولها <b>بالكلمات</b>؟
          </Card>
        </>
      ),
    },

    /* ================= استعد ================= */
    {
      sec: 'explore', min: 2,
      notes: 'فكّر – زاوج – شارك: اكتب كل زوج جملة عددية. لا تعرض الحل؛ سنعود إليه في مثال ١ بالرسم والكلمات.',
      content: (
        <>
          <SlideHead tag={READY} kind="qs">الخروف وأمّه</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">يزنُ خروفٌ صغيرٌ ١٢ كيلُوجرامًا، بينَما يصلُ وزنُ أُمِّهِ حواليْ ٥٠ كيلُوجرامًا. اُكْتُبْ جُملةً عددِيَّةً تُبيِّنُ الفرقَ بينَ الوزنينِ.</p>
              <ThinkPairShare />
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>«الفرق» يعني أن نطرح الوزن الأصغر من الأكبر.</Step>
                <Step kind="ans"><Eq>٥٠ − ١٢ = ٣٨</Eq> كيلوجرامًا</Step>
              </Solution>
            </QCol>
            <Card kind="ex" cap="الوزنان">
              <div className="row" style={{ justifyContent: 'space-around', fontSize: '1.3em', fontWeight: 800 }}>
                <span>الأمّ ٥٠ كجم</span>
                <span>الصغير ١٢ كجم</span>
              </div>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ القاعدة. ثم اعرض الطرق الثلاث للجملة نفسها: رسم، كلمات، أرقام.',
      content: (
        <>
          <SlideHead tag="القاعدة · ص ١١٠" kind="rule">تمثيل الجملة العددية</SlideHead>
          <Card kind="rule" style={{ fontSize: '1em', fontWeight: 700, lineHeight: 1.85 }}>
            <Mark>الجُملةُ العددِيَّةُ</Mark> هي عِبارةٌ تتضمَّنُ أعدادًا وإحدَى الإشاراتِ التاليةِ (&gt; أو &lt; أو =). ويمكنُ تمثيلُها بالرَّسمِ أوْ بالكلماتِ.
          </Card>
          <div className="qgrid three">
            <Card kind="ex" cap="بالرسم">
              <Counters groups={[{ n: 3 }, { n: 2, color: '#4f9be0' }]} size={64} />
            </Card>
            <Card kind="qs" cap="بالكلمات">
              <b style={{ lineHeight: 1.7 }}>ثلاثةٌ زائدُ اثنينِ يُساوِي خمسةً.</b>
            </Card>
            <Card kind="rule" cap="الجملة العددية">
              <Sentence t={[3, '+', 2, '=', 5]} big />
            </Card>
          </div>
        </>
      ),
    },

    /* ================= مثال ١ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: ٥ أبراج في كل منها ١٠ مكعبات = ٥٠. اشطب ١٢ (برج كامل ومكعبان). عدّ الباقي بالعشرات: ٣٠ ثم ٨.',
      content: (
        <>
          <SlideHead tag="مثال ١ · أنا أعمل · ص ١١٠" kind="ex">تمثيل الجمل العددية وكتابتها</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext"><b style={{ color: 'var(--ex)' }}>الحَيوانَاتُ:</b> مثِّلْ واكْتُبْ جُملةً عدديَّةً تُبيِّنُ الفرقَ بينَ وَزْنِ الخروفِ الصَّغيرِ ووزنِ أُمِّه.</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step hl={['x1']}><b>الرسم:</b> مثَّلْنَا ٥٠ مكعبًا، ثُمَّ طرحْنَا منها ١٢ مكعبًا.</Step>
                <Step hl={['x1']}><b>الكلمات:</b> بعدَ طَرْحِ ١٢ مكعبًا مِن ٥٠، سيبقَى ٣٨ أيْ: ٥٠ ناقِصُ ١٢ يساوِي ٣٨</Step>
                <Step hl={['x1']} kind="ans"><b>الجُملةُ العددِيَّةُ:</b> <Eq>٥٠ − ١٢ = ٣٨</Eq></Step>
              </Solution>
            </QCol>
            <TenTowers n={50} crossed={12} k={1} size={56} />
          </Cols>
        </>
      ),
    },

    /* ================= مثال ٢ ================= */
    {
      sec: 'explain', min: 2,
      notes: 'نبدأ هنا من الجملة إلى الرسم والكلمات (عكس المثال الأول).',
      content: (
        <>
          <SlideHead tag="مثال ٢ · ص ١١١" kind="ex">من الجملة إلى الرسم والكلمات</SlideHead>
          <p className="qtext" style={{ margin: 0 }}>مَثِّلِ الجُملةَ العدديةَ <Eq>٨ + ١٣ = ٢١</Eq> بِالرَّسمِ ثُمَّ بالكلماتِ:</p>
          <Ctrls><NextButton /></Ctrls>
          <Step>
            <Card kind="ex" cap="الرَّسْمُ">
              <Counters groups={[{ n: 8, color: '#e8372b', face: true, label: '٨' }, { n: 13, face: true, label: '١٣' }]} cols={13} size={64} />
              <b style={{ textAlign: 'center', color: 'var(--rule)' }}>المجموع ٢١</b>
            </Card>
          </Step>
          <Step><Card kind="qs" cap="الكلماتُ">ثمانيةٌ زائدُ ثلاثةَ عشرَ يُساوِي واحدًا وعشرين.</Card></Step>
          <Step kind="ans"><b>الجُملةُ العدديَّةُ:</b> <Eq>٨ + ١٣ = ٢١</Eq></Step>
        </>
      ),
    },

    /* ================= مثال ٣ ================= */
    {
      sec: 'explain', min: 2,
      notes: 'ثلاث مجموعات من الأطفال: نجمع ثلاثة أعداد. لاحظ «طفلين» في الكلمات بدل «اثنين».',
      content: (
        <>
          <SlideHead tag="مثال ٣ · من واقع الحياة · ص ١١١" kind="ex">أطفال في الحديقة</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">يوجدُ عددٌ مِنَ الأطفالِ في الحديقةِ؛ ٣ منهمْ يلعبُونَ بالأراجيحِ، ويلعبُ ٤ مِنهُمْ بالكرةِ، بينمَا يجري ٢ حولَ الملعبِ. مَثِّلْ واكتُبْ جملةً عددِيَّةً تُمثِّلُ مجموعَ الأطفالِ في الحَديقةِ.</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step><b>الكلماتُ:</b> ثلاثةُ أطفالٍ زائدُ أربعةِ أطفالٍ زائدُ طفلَينِ يُساوِي تسعةَ أطفالٍ.</Step>
                <Step kind="ans"><b>الجُملةُ العدديَّةُ:</b> <Eq>٣ + ٤ + ٢ = ٩</Eq></Step>
              </Solution>
            </QCol>
            <Card kind="ex" cap="الرَّسْمُ">
              <Counters
                groups={[
                  { n: 3, face: true, label: 'الأراجيح' },
                  { n: 4, face: true, color: '#4f9be0', label: 'الكرة' },
                  { n: 2, face: true, color: '#4fae3a', label: 'الجري' },
                ]}
                size={84}
              />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'بعد القاعدة والأمثلة: المقطع يعرض جملة واحدة بثلاث طرق بمثال غير أمثلة الكتاب. أوقفه قبل الكلمات واسأل: كيف نقولها؟',
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
      notes: 'نعمل معًا: اختر طالبًا بالعجلة لكل سؤال، واطلب منه أن يقرأ الجملة بالكلمات قبل أن يختار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">رسم وكلمات وجملة</SlideHead>
          <div className="qgrid two">
            <MCQ q="«خمسةٌ وعشرون ناقصُ عشرةٍ يساوي خمسةَ عشرَ». ما الجملة العددية؟" options={['٢٥ + ١٠ = ٣٥', '٢٥ − ١٠ = ١٥', '١٥ − ١٠ = ٥']} answer="٢٥ − ١٠ = ١٥" award />
            <div>
              <Counters groups={[{ n: 6 }, { n: 5, color: '#4f9be0' }]} size={56} />
              <MCQ q="أيّ جملة يمثّلها الرسم؟" options={['٦ + ٥ = ١١', '٦ − ٥ = ١', '٥ + ٥ = ١٠']} answer="٦ + ٥ = ١١" award />
            </div>
            <MCQ q={<>ما العدد المجهول في <Eq>٢٠ − □ = ١٤</Eq>؟</>} options={['٤', '٦', '٣٤']} answer="٦" award />
            <MCQ q="اشترى فهد ٣ أقلام و٤ دفاتر وممحاتين. ما عدد الأدوات؟" options={['٣ + ٤ = ٧', '٣ + ٤ + ٢ = ٩', '٤ − ٣ = ١']} answer="٣ + ٤ + ٢ = ٩" award />
          </div>
        </>
      ),
    },

    /* ================= تأكد ١–٢ ================= */
    {
      sec: 'check', min: 1,
      notes: '«أنت تعمل»: يرسم كل طالب نموذجًا صغيرًا ثم يكتب الجملة.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={60}
          intro={MODEL_TWO}
          question="باعَ متجرٌ ١٢ علبةَ حليبٍ يومَ السبتِ، وَ٩ علبٍ يومَ الأحدِ. فكمْ علبةً بِيعتْ في اليومينِ؟"
          hint="«في اليومين»: نضمّ اليومين معًا."
          steps={[
            { text: <>الرسم: ١٢ قطعة و٩ قطع.</> },
            { text: <>الجملةُ العدديةُ: <Eq>١٢ + ٩ = ٢١</Eq></> },
            { text: 'بِيعتْ ٢١ علبةً في اليومين.', kind: 'ans' },
          ]}
          chart={<Counters groups={[{ n: 12, label: 'السبت' }, { n: 9, color: '#4f9be0', label: 'الأحد' }]} size={76} />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'ثلاثة أشياء تُطرح من ٢٠. اطرح بالترتيب واكتب الناتج بعد كل خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} time={90}
          question="لَدَى ساميةَ ٢٠ ريالًا، اشترتْ عصيرًا بِـ ٩ ريالاتٍ، وفطيرةً بِـ٥ ريالاتٍ، وأعطتْ فقيرًا ٣ ريالاتٍ. كمْ ريالًا بقِيَ معَهَا؟"
          hint="كل ما دفعته أو أعطته يُطرح من ٢٠."
          steps={[
            { text: <><Eq>٢٠ − ٩ = ١١</Eq> ، <Eq>١١ − ٥ = ٦</Eq> ، <Eq>٦ − ٣ = ٣</Eq></> },
            { text: <>الجملةُ العدديةُ: <Eq>٢٠ − ٩ − ٥ − ٣ = ٣</Eq></> },
            { text: 'بقِيَ معها ٣ ريالات.', kind: 'ans' },
          ]}
          chart={<Counters groups={[{ n: 20, label: 'ريالات سامية' }]} crossed={17} size={76} />}
        />
      ),
    },

    /* ================= تأكد ٣–٥ ================= */
    {
      sec: 'check', min: 3,
      notes: 'كل ضغطة: العدد المجهول، ثم الرسم، ثم الكلمات. اطلب من طالب قراءة كل جملة بصوت مسموع.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{CHECK}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{MODEL_SENT}</p>
          <div className="qgrid three" style={{ fontSize: '1.1em' }}>
            <RepQ n={3} t={[14, '+', 7, '=', bx(21)]} groups={[{ n: 14 }, { n: 7, color: '#4f9be0' }]} words="أربعةَ عشرَ زائدُ سبعةٍ يساوي واحدًا وعشرين." />
            <RepQ n={4} t={[30, '−', bx(12), '=', 18]} groups={[{ n: 30 }]} crossed={12} words="ثلاثون ناقصُ اثني عشرَ يساوي ثمانيةَ عشرَ." />
            <RepQ n={5} t={[12, '+', 3, '+', 4, '=', bx(19)]} groups={[{ n: 12 }, { n: 3, color: '#4f9be0' }, { n: 4, color: '#4fae3a' }]} words="اثنا عشرَ زائدُ ثلاثةٍ زائدُ أربعةٍ يساوي تسعةَ عشرَ." />
          </div>
          <Ctrls>
            <NextButton />
            <TimerButton sec={180} />
          </Ctrls>
        </>
      ),
    },

    /* ================= تأكد ٦–٧ ================= */
    {
      sec: 'check', min: 1,
      notes: '«أبقى لديه ٤» يعني أن ٤ لا تُوزَّع: نطرحها من ٢٥.',
      content: (
        <QuestionSlide
          source={CHECK} n={6} time={60}
          question="لَدَى خالدٍ ٢٥ لُعبةً. مَثِّلْ بالرَّسمِ، ثُمَّ اكْتُبْ جُملةً عددِيَّةً تُبيِّنُ عددَ الألعابِ الَّتِي سيُوَزِّعُها خالدٌ علَى أصدقائِهِ إذَا أبْقَى لديْهِ ٤ لُعَبٍ."
          hint="الألعاب التي سيوزّعها = كل الألعاب ما عدا التي أبقاها."
          steps={[
            { text: 'الرسم: ٢٥ لعبة، نشطب ٤ أبقاها لنفسه.' },
            { text: <>الجملةُ العدديةُ: <Eq>٢٥ − ٤ = ٢١</Eq></> },
            { text: 'سيوزّع ٢١ لعبةً على أصدقائه.', kind: 'ans' },
          ]}
          chart={<Counters groups={[{ n: 25, label: 'ألعاب خالد' }]} crossed={4} size={76} />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'تحدّث: اقبل كل مسألة فيها ثلاثة أعداد أو أكثر، واطلب من صاحبها كتابة الجملة على السبورة.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tps tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]}
          question="صِفْ مسألةً مِنْ واقِعِ الحياةِ تتضمَّنُ جُملةً عددِيَّةً مِنْ عِدَّةِ أعدادٍ."
          hint="فكّر في أشياء من عدة أنواع تجمعها، مثل أدواتك المدرسية."
          steps={[
            { text: 'مثالٌ: اشترى سعدٌ ٣ أقلامٍ و٤ دفاترَ وممحاتينِ، فكم أداةً اشترى؟' },
            { text: <>الجملةُ العدديةُ: <Eq>٣ + ٤ + ٢ = ٩</Eq> أدوات</>, kind: 'ans' },
          ]}
          chart={<Counters groups={[{ n: 3, label: 'أقلام' }, { n: 4, color: '#4f9be0', label: 'دفاتر' }, { n: 2, color: '#4fae3a', label: 'ممحاتان' }]} size={84} />}
        />
      ),
    },

    /* ================= تدرب ٨–٩ ================= */
    {
      sec: 'practice', min: 1,
      notes: '«تزيد … على» تعني الفرق: نطرح. ذكّر بإعادة التجميع في الطرح.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={8} time={90}
          intro={MODEL_TWO}
          question="قادَ سائقٌ شاحِنَتَهُ مسافةَ ٥٤٨ كلم ذاتَ يومٍ، ثُمَّ قادَها مسافةَ ١٦٣ كلم في اليومِ التَّالِي. فكمْ تزيدُ المسافةُ الَّتِي قطعَها السائقُ في اليومِ الأوَّلِ علَى مَا قطعَهُ في اليومِ الثَّانِي؟"
          hint="كم تزيد؟ = الفرق بين المسافتين."
          steps={[
            { text: <><Eq>٥٤٨ − ١٠٠ = ٤٤٨</Eq> ، <Eq>٤٤٨ − ٦٣ = ٣٨٥</Eq></> },
            { text: <>الجملةُ العدديةُ: <Eq>٥٤٨ − ١٦٣ = ٣٨٥</Eq></> },
            { text: 'تزيد المسافة ٣٨٥ كلم.', kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="المسافتان">
              <div className="flines" style={{ alignItems: 'center', fontSize: '1.2em' }}>
                <b>اليوم الأول: ٥٤٨ كلم</b>
                <b>اليوم الثاني: ١٦٣ كلم</b>
              </div>
            </Card>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'الأعداد مكتوبة بالكلمات: اطلب تحويلها إلى أرقام أولًا.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={9} time={60}
          question="في أحدِ المطاعمِ طلبَ عشرونَ شخصًا فطائرَ الدَّجاجِ، وَطلبَ ثلاثةُ أشخاصٍ آخرينَ فطائرَ الجُبنِ، بينَمَا طلبَ ثلاثةَ عشرَ شخصًا فطائرَ اللَّبنةِ. ما عددُ الأشخاصِ الَّذِينَ طلبُوا الفطائرَ؟"
          hint="عشرون = ٢٠، ثلاثة = ٣، ثلاثة عشر = ١٣."
          steps={[
            { text: 'الأعداد: ٢٠ و٣ و١٣.' },
            { text: <>الجملةُ العدديةُ: <Eq>٢٠ + ٣ + ١٣ = ٣٦</Eq></> },
            { text: 'عدد الأشخاص ٣٦ شخصًا.', kind: 'ans' },
          ]}
          chart={<Counters groups={[{ n: 20, label: 'الدجاج' }, { n: 3, color: '#4f9be0', label: 'الجبن' }, { n: 13, color: '#4fae3a', label: 'اللبنة' }]} size={48} />}
        />
      ),
    },

    /* ================= تدرب ١٠–١٢ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'في ١٢ العدد المجهول في الوسط: كم نضيف إلى ٣٢ لنصل إلى ٣٦؟',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{MODEL_SENT}</p>
          <div className="qgrid three" style={{ fontSize: '1.1em' }}>
            <RepQ n={10} t={[14, '−', 8, '=', bx(6)]} groups={[{ n: 14 }]} crossed={8} words="أربعةَ عشرَ ناقصُ ثمانيةٍ يساوي ستةً." />
            <RepQ n={11} t={[24, '+', 9, '=', bx(33)]} groups={[{ n: 24 }, { n: 9, color: '#4f9be0' }]} words="أربعةٌ وعشرون زائدُ تسعةٍ يساوي ثلاثةً وثلاثين." size={24} />
            <RepQ n={12} t={[32, '+', bx(4), '=', 36]} groups={[{ n: 32 }, { n: 4, color: '#4f9be0' }]} words="اثنان وثلاثون زائدُ أربعةٍ يساوي ستةً وثلاثين." size={24} />
          </div>
          <Ctrls>
            <NextButton />
            <TimerButton sec={180} />
          </Ctrls>
        </>
      ),
    },

    /* ================= تدرب ١٣–١٥ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'في ١٥ العدد المجهول أول الجملة: نجمع ٢٢ + ٦ + ٧ لنعرف من أين بدأنا.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{MODEL_SENT}</p>
          <div className="qgrid three" style={{ fontSize: '1.1em' }}>
            <RepQ n={13} t={[6, '+', 4, '+', 11, '=', bx(21)]} groups={[{ n: 6 }, { n: 4, color: '#4f9be0' }, { n: 11, color: '#4fae3a' }]} words="ستةٌ زائدُ أربعةٍ زائدُ أحدَ عشرَ يساوي واحدًا وعشرين." />
            <RepQ n={14} t={[12, '+', 3, '+', bx(2), '=', 17]} groups={[{ n: 12 }, { n: 3, color: '#4f9be0' }, { n: 2, color: '#4fae3a' }]} words="اثنا عشرَ زائدُ ثلاثةٍ زائدُ اثنينِ يساوي سبعةَ عشرَ." />
            <RepQ n={15} t={[bx(35), '−', 7, '−', 6, '=', 22]} groups={[{ n: 35 }]} crossed={13} words="خمسةٌ وثلاثون ناقصُ سبعةٍ ناقصُ ستةٍ يساوي اثنين وعشرين." size={24} />
          </div>
          <Ctrls>
            <NextButton />
            <TimerButton sec={180} />
          </Ctrls>
        </>
      ),
    },

    /* ================= تدرب ١٦–١٨: المسافات ================= */
    {
      sec: 'practice', min: 2,
      notes: 'تقبل إجابات مختلفة في ١٦ و١٧؛ المهم أن تكون الجملة صحيحة ومن الجدول.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <Cols>
            <QCol>
              <p className="intro">{TABLE_INTRO}</p>
              <QCard n={16}>
                <div style={{ paddingInlineStart: '1.6em' }}>
                  <p className="qtext" style={{ margin: 0, fontSize: '.85em' }}>أُكتُبْ جملةً عددِيَّةً مُستعملًا الطَّرحَ.</p>
                  <Step kind="ans">مثال: الفرق بين الرياض–مكة والمدينة–تبوك: <Eq>٨٧٠ − ٦٧٩ = ١٩١</Eq> كلم</Step>
                </div>
              </QCard>
              <QCard n={17}>
                <div style={{ paddingInlineStart: '1.6em' }}>
                  <p className="qtext" style={{ margin: 0, fontSize: '.85em' }}>أُكتُبْ جملةً عددِيَّةً مُستعملًا الجمعَ.</p>
                  <Step kind="ans">مثال: الدمام–الجبيل وأبها–جازان معًا: <Eq>٨٣ + ٢٠٢ = ٢٨٥</Eq> كلم</Step>
                </div>
              </QCard>
              <QCard n={18}>
                <div style={{ paddingInlineStart: '1.6em' }}>
                  <p className="qtext" style={{ margin: 0, fontSize: '.85em' }}>أُكتُبْ مسألةً مُستعملًا الجُملةَ العددِيَّةَ: <Eq>٢٠٢ − ٨٣ = ١١٩</Eq></p>
                  <Step kind="ans">مثال: من أبها إلى جازان ٢٠٢ كلم، ومن الدمام إلى الجبيل ٨٣ كلم. كم تزيد الأولى؟ ١١٩ كلم.</Step>
                </div>
              </QCard>
              <Ctrls><NextButton /><TimerButton sec={150} /></Ctrls>
            </QCol>
            <Distances />
          </Cols>
        </>
      ),
    },

    /* ================= مهارات التفكير العليا ================= */
    {
      sec: 'hot', min: 1,
      notes: 'مسألة مفتوحة: إجابات كثيرة صحيحة. المهم أن يكون الطرفان متساويين. اطلب من ٣ طلاب إجابات مختلفة.',
      content: (
        <QuestionSlide
          source={HOT} n={19} tps tags={[{ kind: 'warn', text: 'مسألةٌ مفتوحةٌ' }]}
          question={<>أَكْمِلِ الجملةَ العدديَّةَ بعددَيْنِ مُختلِفَيْنِ لِتُكوِّنَ جُملةً صحيحةً:</>}
          hint="اختر ناتجًا واحدًا للطرفين، مثل ٣٤٤، ثم احسب العددين."
          steps={[
            { text: 'نختار ناتجًا للطرفين: ٣٤٤.' },
            { text: <><Eq>٨٧٤ − ٥٣٠ = ٣٤٤</Eq> و <Eq>٤٤٤ − ١٠٠ = ٣٤٤</Eq></> },
            { text: <><Eq>٨٧٤ − ٥٣٠ = ٤٤٤ − ١٠٠</Eq></>, kind: 'ans' },
          ]}
          chart={
            <Card kind="qs" cap="الجملة">
              <Sentence t={[874, '−', bx(530), '=', 444, '−', bx(100)]} big />
            </Card>
          }
        />
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'اكتشف الخطأ: كثير من الطلاب يظنون أن واحدة فقط صحيحة. احسب كل جملة على السبورة.',
      content: (
        <QuestionSlide
          source={HOT} n={20} tags={[{ kind: 'warn', text: 'اكتشفِ الخطأَ' }]}
          question="كتبَ كلٌّ مِن عبدِ اللهِ وعبدِ الرَّحمنِ جُملةً عددِيَّةً. أيُّهما جملتُهُ صحِيحةٌ؟ فسِّرِ السَّببَ."
          hint="احسب كل جملة من اليمين."
          steps={[
            { text: <>عبدُ اللهِ: <Eq>٥٦ − ٤٠ = ١٦</Eq> ، <Eq>١٦ − ٨ = ٨</Eq></> },
            { text: <>عبدُ الرحمنِ: <Eq>٥٦ − ٤٨ = ٨</Eq></> },
            { text: 'كلتا الجملتين صحيحة؛ لأنّ طرح ٤٠ ثم ٨ يساوي طرح ٤٨ (٤٠ + ٨ = ٤٨).', kind: 'ans' },
          ]}
          chart={
            <Stack>
              <Card kind="rule" cap="عبدُ اللهِ"><Sentence t={[56, '−', 40, '−', 8, '=', 8]} /></Card>
              <Card kind="qs" cap="عبدُ الرحمنِ"><Sentence t={[56, '−', 48, '=', 8]} /></Card>
            </Stack>
          }
        />
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'أكتب: كل طالب يكتب مسألة في دفتره، ثم يحلّها. اقرأ اثنتين.',
      content: (
        <QuestionSlide
          source={HOT} n={21} tps tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="مسألةً تتضمَّنُ الجُملةَ العددِيَّةَ: ٤٨ + □ = ٥٥. ثُمَّ حُلَّهَا."
          hint="ابدأ بـ «مع … ٤٨ ريالًا …»: كم يلزمه ليصبح معه ٥٥؟"
          steps={[
            { text: 'مثالٌ: مع سعدٍ ٤٨ ريالًا، كم ريالًا يلزمه ليصير معه ٥٥ ريالًا؟' },
            { text: <><Eq>٥٥ − ٤٨ = ٧</Eq></> },
            { text: <><Eq>٤٨ + ٧ = ٥٥</Eq> ، يلزمه ٧ ريالات.</>, kind: 'ans' },
          ]}
          chart={<Card kind="qs" cap="الجملة"><Sentence t={[48, '+', bx(7), '=', 55]} big /></Card>}
        />
      ),
    },

    /* ================= تدريب على اختبار ٢٢–٢٣ ================= */
    {
      sec: 'hot', min: 1,
      notes: 'سؤالا اختيار من متعدد كما في الاختبارات. أعطِ ٣٠ ثانية لكل سؤال.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{TEST}</Tag>
            <TimerButton sec={60} />
          </div>
          <div className="qgrid two">
            <QCard n={22}>
              <div style={{ paddingInlineStart: '1.6em' }}>
                <p className="qtext" style={{ margin: 0, fontSize: '.85em' }}>أيٌّ ممَّا يأتِي يمثلُ حلًّا للجملةِ العدديةِ: <Eq>٣٥٢ − ١٩٩ = □</Eq> ؟ (الدرس ٤-١)</p>
                <MCQ options={['أ) ١٤٧', 'ب) ١٥٣', 'جـ) ١٥٧', 'د) ١١٥٣']} answer="ب) ١٥٣" />
              </div>
            </QCard>
            <QCard n={23}>
              <div style={{ paddingInlineStart: '1.6em' }}>
                <p className="qtext" style={{ margin: 0, fontSize: '.85em' }}>أيُّ العملياتِ التاليةِ تجعلُ الجملةَ العدديةَ: <Eq>٧٩ □ ٢٦ = ١٠٥</Eq> صحيحةً؟ (الدرس ٤-٢)</p>
                <MCQ options={['أ) +', 'ب) ×', 'جـ) −', 'د) ÷']} answer="أ) +" />
              </div>
            </QCard>
          </div>
        </>
      ),
    },

    /* ================= مراجعة تراكمية ٢٤ ================= */
    {
      sec: 'hot', min: 1,
      notes: 'مراجعة الدرس ٢-٥ (الطرح): «زيادة على» = الفرق.',
      content: (
        <QuestionSlide
          source={REVIEW} n={24} time={60}
          question="اشترتْ ليلَى جهازَ حاسوبٍ محمولًا بـ ٢٧٣٥ ريالًا، واشترتْ سميرةُ جهازَ حاسوبٍ آخرَ بِـ ٢٦٩٠ ريالًا. كمْ دفعتْ ليلَى زيادةً علَى ما دفعتْهُ سميرةُ؟ (الدرس ٢-٥)"
          hint="الزيادة = الفرق بين السعرين."
          steps={[
            { text: <><Eq>٢٧٣٥ − ٢٦٩٠ = ٤٥</Eq></> },
            { text: '٤٥ ريالًا', kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="السعران">
              <div className="flines" style={{ alignItems: 'center', fontSize: '1.2em' }}>
                <b>ليلى: ٢٧٣٥ ريالًا</b>
                <b>سميرة: ٢٦٩٠ ريالًا</b>
              </div>
            </Card>
          }
        />
      ),
    },

    /* ================= مراجعة تراكمية ٢٥–٢٧ ================= */
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٣-٣: اقرأ طرف كل عمود على المحور الأفقي.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{REVIEW}</Tag>
          </div>
          <Cols>
            <QCol>
              <p className="intro">استعملِ التمثيلَ المجاورَ لتجيبَ عنِ الأسئلةِ ٢٥ - ٢٧ (الدرس ٣ - ٣)</p>
              <QCard n={25}>
                <div style={{ paddingInlineStart: '1.6em' }}>
                  <p className="qtext" style={{ margin: 0, fontSize: '.85em' }}>ما عددُ الميدالياتِ الَّتِي حصلَ عليهَا وليدٌ؟</p>
                  <Solution><Step hl={['p2', 'g2']} kind="ans">٣ ميداليات ذهبية.</Step></Solution>
                </div>
              </QCard>
              <QCard n={26}>
                <div style={{ paddingInlineStart: '1.6em' }}>
                  <p className="qtext" style={{ margin: 0, fontSize: '.85em' }}>أيُّهمَا حصلَ علَى عددِ ميدالياتٍ أقلَّ؛ أحمدُ أمْ خالدٌ؟</p>
                  <Solution><Step hl={['p1', 'p3', 'g1', 'g3']} kind="ans">أحمدُ: له ٤ ميداليات، وخالد له ٦.</Step></Solution>
                </div>
              </QCard>
              <QCard n={27}>
                <div style={{ paddingInlineStart: '1.6em' }}>
                  <p className="qtext" style={{ margin: 0, fontSize: '.85em' }}>ما مجموعُ المداليات الَّتِي حصلَ عليهَا اللَّاعبُونَ الأَربعةُ؟</p>
                  <Solution><Step hl={['p0', 'p1', 'p2', 'p3']} kind="ans"><Eq>١ + ٦ + ٣ + ٤ = ١٤</Eq> ميدالية.</Step></Solution>
                </div>
              </QCard>
              <Ctrls><NextButton /><TimerButton sec={90} /></Ctrls>
            </QCol>
            <HBars {...MEDALS} color="#6a9bd1" />
          </Cols>
        </>
      ),
    },

    /* ================= مراجعة تراكمية ٢٨–٣١ ================= */
    {
      sec: 'hot', min: 1,
      notes: 'مراجعة الدرس ١-٦: انظر إلى رقم العشرات: ٥ فأكثر نقرّب إلى المئة الأعلى.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{REVIEW}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>قرِّبْ كلًّا مِنَ الأعدادِ التاليةِ إلَى أقربِ مئةٍ. (الدرس ١-٦)</p>
          <div className="qgrid four">
            <RoundQ n={28} v="٧٢٩" ans={700} />
            <RoundQ n={29} v="٧٥٠" ans={800} />
            <RoundQ n={30} v="٥٤٢" ans={500} />
            <RoundQ n={31} v="٩٠٣" ans={900} />
          </div>
          <Ctrls><NextButton /><TimerButton sec={60} /></Ctrls>
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
            center={<>تمثيل الجمل<br />العددية</>}
            items={[
              { kind: 'ex', cap: 'بالرسم', text: 'قطع عدّ أو مكعبات: نضمّ للجمع، ونشطب للطرح.' },
              { kind: 'qs', cap: 'بالكلمات', text: 'زائد · ناقص · يساوي: ثمانية زائد ثلاثة عشر يساوي واحدًا وعشرين.' },
              { kind: 'rule', cap: 'بالأرقام', text: 'جملة عددية فيها = مثل ٨ + ١٣ = ٢١' },
              { kind: 'warn', cap: 'العدد المجهول', text: 'أستعمل الرسم أو العملية العكسية لأجده.' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 2,
      notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة ثم نعرض الإجابات.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">ثلاثة أسئلة</SlideHead>
          <div className="ticket">
            <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="«عشرة زائد خمسة يساوي خمسة عشر» بالأرقام:" options={['١٠ − ٥ = ٥', '١٠ + ٥ = ١٥', '١٥ + ٥ = ٢٠']} answer="١٠ + ٥ = ١٥" /></Card>
            <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q={<>ما العدد المجهول في <Eq>٤٠ − □ = ٢٦</Eq>؟</>} options={['١٤', '٦٦', '١٦']} answer="١٤" /></Card>
            <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="مع ريم ٣٠ ريالًا، اشترت قلمًا بـ ٨ ريالات ودفترًا بـ ٧ ريالات. ما الجملة التي تبيّن ما بقي معها؟" options={['٣٠ − ٨ − ٧ = ١٥', '٣٠ + ٨ + ٧ = ٤٥', '٣٠ − ٨ = ٢٢']} answer="٣٠ − ٨ − ٧ = ١٥" /></Card>
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

