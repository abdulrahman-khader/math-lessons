import {
  Card, Cols, Ctrls, Eq, FnTable, GoHomeButton, IfTeams, MCQ, MindMap, NextButton, QCard, QCol, QuestionSlide, RuleTable, Sentence, SlideHead,
  Solution, Stack, Step, Tag, ThinkPairShare, TimerButton, Winner, defineLesson, type Token,
} from '@engine';
import { IntroClip } from './clip';

/** خانة العملية المفقودة (الدائرة الرمادية في الكتاب) */
const op = (b: '+' | '−'): Token => ({ b, box: true });

const READY = 'اسْتَعِدَّ · ص ١٢٧';
const CHECK = 'تأكَّدْ · ص ١٢٩';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ · ص ١٢٩';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ١٣٠';
const TEST = 'تدريبٌ على اختبارٍ · ص ١٣٠';
const REVIEW = 'مراجعةٌ تراكميةٌ · ص ١٣٠';
const BUILD = 'أَنْشِئْ جدولَ دالَّةٍ لكلِّ سؤالٍ ممَّا يلي، ثمَّ اكْتُبْ قاعدةَ الدالَّةِ:';
const DESCRIBE = 'صِفِ النَّمطَ لكلِّ جدولِ دالَّةٍ ممَّا يلي:';
const ORANGE = '#f6b26b';
const PURPLE = '#c9b3e6';

/** جداول السؤال ١٤: أيّها يوضح أن عمر سلمى يزيد على عمر هدى بـ ٤ */
const AGES: [string, string, string, number[]][] = [
  ['أ)', 'عمرُ هدى', 'عمرُ سلمى', [8, 12, 16, 20]],
  ['ب)', 'عمرُ سلمى', 'عمرُ هدى', [8, 12, 16, 20]],
  ['جـ)', 'عمرُ هدى', 'عمرُ سلمى', [6, 7, 8, 9]],
  ['د)', 'عمرُ سلمى', 'عمرُ هدى', [6, 7, 8, 9]],
];

export default defineLesson({
  meta: {
    id: 'g4-4-7-multiply-divide-tables',
    code: '٤-٧',
    title: 'جداولُ الدَّوالِّ: جداولُ الضَّربِ والقِسمةِ',
    shortTitle: 'جداول الدوال: الضرب والقسمة',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الرابع: الأنماط والجبر',
    source: 'الجزء الأول · ص ١٢٧–١٣٠',
    minutes: 45,
    idea: 'أستعملُ عمليَّتَي الضَّربِ والقسمةِ لأُنْشِئَ جدولًا أوْ أُكمِلَهُ.',
    bookQuestions: 20,
  },
  sectionDesc: {
    engage: 'تذكّر الدرس ٤-٥',
    explore: 'استعد: طول القارب',
    explain: 'الأمثلة ١–٣',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٣',
    practice: 'الأسئلة ٤–٩',
    hot: 'الأسئلة ١٠–٢٠',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. اربط: في الدرس السابق كانت القاعدة جمعًا أو طرحًا؛ اليوم ضربًا أو قسمة.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أستعملُ عمليَّتَي الضَّربِ والقسمةِ لأُنْشِئَ جدولًا أوْ أُكمِلَهُ.</Card>
              <Card kind="rule" cap="تذكّر">قاعدةُ الدالَّةِ تحوّل المدخلة △ إلى المخرجة □.</Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أُنشئ جدول دالة قاعدته ضرب.</li>
                <li>أُكمل جدول دالة قاعدته قسمة.</li>
                <li>أحدد قاعدة الدالة من جدول وأصف النمط.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الدرس ٤-٥ وحقائق الضرب. اختر طالبًا بالعجلة لكل سؤال.',
      content: (
        <>
          <SlideHead tag="تذكّر · الدرس ٤-٥" kind="ink">جمع أم ضرب؟</SlideHead>
          <div className="qgrid two">
            <Stack>
              <RuleTable ruleStep={false} rows={[['المدخلة △', [1, 2, 3, 4]], ['المخرجة □', [6, 7, 8, 9]]]} color={ORANGE} />
              <MCQ q="ما القاعدة؟" options={['△ × ٦', '△ + ٥', '△ + ٦']} answer="△ + ٥" award />
            </Stack>
            <Stack>
              <RuleTable ruleStep={false} rows={[['المدخلة △', [1, 2, 3, 4]], ['المخرجة □', [5, 10, 15, 20]]]} color={ORANGE} />
              <MCQ q="هل القاعدة △ + ٤؟" options={['نعم', 'لا، القاعدة △ × ٥']} answer="لا، القاعدة △ × ٥" award />
            </Stack>
          </div>
          <Card kind="qs" cap="سؤال للتفكير">في الجدول الثاني لم يكن الفرق ثابتًا بين المدخلة والمخرجة. ماذا يكون إذن؟</Card>
        </>
      ),
    },

    /* ================= استعد ================= */
    {
      sec: 'explore', min: 3,
      notes: 'فكّر – زاوج – شارك: ما النمط؟ كلما زاد متر زادت المخرجة ١٠٠.',
      content: (
        <>
          <SlideHead tag={READY} kind="qs">قارب الصيد</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">اشترَى سعيدٌ قاربَ صيدٍ جديدًا طولُهُ ٥ أمتارٍ، وأرادَ أن يعرفَ طولَهُ بالسنتمتراتِ فأنْشأَ الجدولَ المجاورَ. مَا النمطُ الذِي تلاحظُهُ فِي المُدخلاتِ والمُخرجاتِ؟</p>
              <ThinkPairShare />
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>كلّما زادت المدخلة مترًا زادت المخرجة ١٠٠ سم.</Step>
                <Step kind="ans">المخرجة = المدخلة × ١٠٠ ، والخانة الفارغة ٥٠٠ سم</Step>
              </Solution>
            </QCol>
            <FnTable
              title="التحويلُ منْ أمتارٍ إلى سنتمتراتٍ"
              color={ORANGE}
              heads={['المُدخلةُ △ بالأمتارِ', 'المُخرجةُ □ بالسَّنتمتراتِ']}
              rows={[[1, 100], [2, 200], [3, 300], [4, 400], [5, { b: 500 }]]}
            />
          </Cols>
        </>
      ),
    },

    /* ================= مثال ١ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: تعلمتُ سابقًا أن القاعدة قد تكون جمعًا أو طرحًا، ويمكن أن تكون ضربًا أو قسمة.',
      content: (
        <>
          <SlideHead tag="مثال ١ · من واقع الحياة · ص ١٢٧" kind="ex">إنشاءُ جدولِ دالَّةٍ</SlideHead>
          <Card kind="rule">تعلمتُ سابقًا أنَّ قاعدةَ الدَّالَّةِ قدْ تتضمنُ عمليةَ جمعٍ أوْ طرحٍ، كذلكَ يمكنُ أنْ تَتضمَّنَ عمليةَ ضَربٍ أو قِسمةٍ.</Card>
          <Cols>
            <QCol>
              <p className="qtext"><b style={{ color: 'var(--ex)' }}>القِيَاسُ:</b> أَنْشِئْ جدولَ دالَّةٍ لِتجدَ طُولَ القاربِ بالسَّنتِمتراتِ.</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>يوجدُ ١٠٠ سم في كلِّ مترٍ. وعندَ التَّحويلِ مِنْ أمتارٍ إلى سنتمتراتٍ، اضْرِبْ في ١٠٠</Step>
                <Step>يوجدُ ٥٠٠ سم في ٥ أمتارٍ.</Step>
                <Step kind="ans">إِذَنْ طولُ القاربِ بالسَّنتمتراتِ يُساوِي ٥٠٠ سم.</Step>
              </Solution>
            </QCol>
            <FnTable
              title="التَّحويلُ منْ أمتارٍ إلى سنتمتراتٍ"
              color={ORANGE}
              heads={['المُدخلةُ △', 'القاعدةُ: △ × ١٠٠', 'المُخرجةُ □']}
              rows={[
                [1, '١ × ١٠٠', 100],
                [2, '٢ × ١٠٠', 200],
                [3, '٣ × ١٠٠', 300],
                [4, '٤ × ١٠٠', 400],
                [5, '٥ × ١٠٠', { b: 500 }],
              ]}
            />
          </Cols>
        </>
      ),
    },

    /* ================= مثال ٢ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'كل ريال فيه ٤ أرباع (٢٥ هللة). نحدد القاعدة ثم نختبرها على كل صف.',
      content: (
        <>
          <SlideHead tag="مثال ٢ · ص ١٢٨" kind="ex">إيجادُ القاعدةِ باستعمالِ جدولِ دالَّةٍ (×)</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext"><b style={{ color: 'var(--ex)' }}>نُقودٌ:</b> يُوَضِّحُ الجدولُ عددَ الأرباعِ □ الموجودةِ في أعدادٍ مختلفةٍ من الرِّيالاتِ. اِستعمِلْ جدولَ الدَّالَّةِ لتُحدِّدَ القاعدةَ.</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>اِبدأْ بكلِّ عددٍ في المُدخَلةِ △، وحَدِّدِ القاعدةَ الَّتي تُعطِي العددَ في المُخرَجةِ □.</Step>
                <Step><Eq>١ × ٤ = ٤</Eq> ، <Eq>٢ × ٤ = ٨</Eq> ، <Eq>٣ × ٤ = ١٢</Eq> ، <Eq>٤ × ٤ = ١٦</Eq></Step>
                <Step kind="ans">القاعدة: △ × ٤</Step>
              </Solution>
            </QCol>
            <FnTable
              rule="△ × ٤"
              ruleStep
              color={ORANGE}
              heads={['المُدخلةُ △', '△ × ٤', 'المُخرجةُ □']}
              rows={[[1, '١ × ٤', 4], [2, '٢ × ٤', 8], [3, '٣ × ٤', 12], [4, '٤ × ٤', 16]]}
            />
          </Cols>
        </>
      ),
    },

    /* ================= مثال ٣ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'كل دراجة ثلاثية تحتاج ٣ عجلات: نقسم عدد العجلات على ٣.',
      content: (
        <>
          <SlideHead tag="مثال ٣ · ص ١٢٨" kind="ex">وصفُ القاعدةِ باستعمالِ جدولِ دالةٍ (÷)</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext"><b style={{ color: 'var(--ex)' }}>درَّاجاتٌ:</b> يُوضِّحُ الجدولُ عَددَ الدَّرَّاجاتِ الثلاثيةِ العجلاتِ □ الَّتي يمكنُ صنعُها باستعمالِ أعدادٍ مختلفةٍ من العجلاتِ △. استعملْ جدولَ الدالةِ لتصفَ القاعدةَ.</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>اِبدأْ بكلِّ عددٍ في المُدخَلةِ △، واستعملِ القاعدةَ لتجدَ العددَ في المُخرَجةِ □.</Step>
                <Step><Eq>٢٧ ÷ ٣ = ٩</Eq> ، <Eq>٢٤ ÷ ٣ = ٨</Eq> ، <Eq>٢١ ÷ ٣ = ٧</Eq> ، <Eq>١٨ ÷ ٣ = ٦</Eq></Step>
                <Step kind="ans">يوضِّحُ النَّمطُ أنَّهُ كلَّما نقُصَتِ المُدخَلةُ △ بمقدارِ ٣، تنقصُ المُخرَجةُ □ بمقدارِ ١</Step>
              </Solution>
            </QCol>
            <FnTable
              rule="△ ÷ ٣"
              color={ORANGE}
              heads={['المُدخلةُ △', '△ ÷ ٣', 'المُخرجةُ □']}
              rows={[[27, '٢٧ ÷ ٣', { b: 9 }], [24, '٢٤ ÷ ٣', { b: 8 }], [21, '٢١ ÷ ٣', { b: 7 }], [18, '١٨ ÷ ٣', { b: 6 }]]}
            />
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: علب البيض (مثال غير أمثلة الكتاب): ضرب ثم قسمة. أوقفه قبل كل مخرجة.',
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
      notes: 'نعمل معًا: لكل جدول اطلب تجربة القاعدة على صفين قبل الاختيار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">ضرب أم قسمة؟</SlideHead>
          <div className="qgrid two">
            <Stack>
              <RuleTable ruleStep={false} rows={[['المدخلة △', [2, 3, 4, 5]], ['المخرجة □', [14, 21, 28, 35]]]} color={ORANGE} />
              <MCQ q="ما القاعدة؟" options={['△ + ١٢', '△ × ٧', '△ ÷ ٧']} answer="△ × ٧" award />
            </Stack>
            <Stack>
              <RuleTable ruleStep={false} rows={[['المدخلة △', [40, 30, 20, 10]], ['المخرجة □', [8, 6, 4, '؟']]]} color={ORANGE} />
              <MCQ q="ما المخرجة الناقصة؟" options={['٢', '٥', '١']} answer="٢" award />
            </Stack>
          </div>
        </>
      ),
    },

    /* ================= تأكد ١–٣ ================= */
    {
      sec: 'check', min: 2,
      notes: 'كل زوج = جوربان: نقسم على ٢.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={60}
          question="يُوضِّحُ الجدولُ المجاورُ عددَ أزواجِ الجَوارِبِ □ الَّتي يمكنُ إيجادُها عندَ أَخْذِ أعدادٍ مُختلفةٍ مِنَ الجَوارِبِ △ مِن مغسلةِ المَلابسِ. أكمِلِ الجدولَ."
          hint="كل زوج فيه جوربان."
          steps={[
            { text: <><Eq>٨ ÷ ٢ = ٤</Eq> ، <Eq>١٠ ÷ ٢ = ٥</Eq> ، <Eq>١٢ ÷ ٢ = ٦</Eq> ، <Eq>١٤ ÷ ٢ = ٧</Eq></> },
            { text: 'المخرجات: ٤، ٥، ٦، ٧', kind: 'ans' },
          ]}
          chart={<FnTable rule="△ ÷ ٢" color="#a9c8ec" rows={[[8, { b: 4 }], [10, { b: 5 }], [12, { b: 6 }], [14, { b: 7 }]]} />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'كل فراشة جناحان: نضرب في ٢.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} time={90}
          question="لكلِّ فراشةٍ جَناحانِ. أَنْشِئْ جدولَ دالَّةٍ لتَوْضِيحِ العددِ الكُلِّيِّ لأجنحةِ: ٤، ٥، ٦، ٧ فراشاتٍ، ثمَّ اكْتُبِ القاعدةَ، وصِفِ النَّمطَ."
          hint="كم جناحًا لفراشة واحدة؟"
          steps={[
            { text: 'القاعدة: △ × ٢' },
            { text: 'الأجنحة: ٨، ١٠، ١٢، ١٤' },
            { text: 'النمط: كلّما زادت فراشةٌ زاد جناحان.', kind: 'ans' },
          ]}
          chart={<FnTable rule="△ × ٢" ruleStep heads={['الفراشات △', 'الأجنحة □']} color="#a9c8ec" rows={[[4, { b: 8 }], [5, { b: 10 }], [6, { b: 12 }], [7, { b: 14 }]]} />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'تحدّث: اعرض مدخلة واحدة ٤ مع مخرجتين مختلفتين لتبيّن أننا نحتاج المخرجات.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} tps tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]}
          question="هلْ تستطيعُ أنْ تُحدِّدَ قاعدةَ الدَّالَّةِ بِمُجرَّدِ النَّظرِ إلى المُدخلاتِ فقطْ؟ بيِّنِ السَّببَ."
          hint="المدخلات نفسها ١، ٢، ٣ قد تكون لأي قاعدة."
          steps={[
            { text: 'لا؛ لأنَّ القاعدةَ تربطُ المدخلةَ بمخرجتِها.' },
            { text: 'فلا بُدَّ من النظرِ إلى المخرجاتِ معها لمعرفةِ العمليةِ.', kind: 'ans' },
          ]}
          chart={
            <Stack>
              <RuleTable ruleStep={false} rule="△ × ٣" rows={[['△', [1, 2, 3]], ['□', [3, 6, 9]]]} color="#a8d5ba" />
              <RuleTable ruleStep={false} rule="△ + ٥" rows={[['△', [1, 2, 3]], ['□', [6, 7, 8]]]} color="#a8d5ba" />
            </Stack>
          }
        />
      ),
    },

    /* ================= تدرب ٤–٥ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'في كل كيس ٦ كرات: نضرب.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={4} time={60}
          question="إذا عَلِمْتَ أنَّ فِي كلِّ كِيسٍ ٦ كُراتٍ فاستعمِلِ الجدولَ المُجاورَ لِتجدَ العددَ الكُلِّيَّ لِلكراتِ في أعدادٍ مُختلِفةٍ من الأكياسِ."
          hint="عدد الأكياس × ٦."
          steps={[
            { text: <><Eq>٥ × ٦ = ٣٠</Eq> ، <Eq>٦ × ٦ = ٣٦</Eq> ، <Eq>٧ × ٦ = ٤٢</Eq> ، <Eq>٨ × ٦ = ٤٨</Eq></> },
            { text: 'المخرجات: ٣٠، ٣٦، ٤٢، ٤٨', kind: 'ans' },
          ]}
          chart={<RuleTable ruleStep={false} rule="△ × ٦" color={ORANGE} rows={[['المدخلة △', [5, 6, 7, 8]], ['المخرجة □', [{ b: 30 }, { b: 36 }, { b: 42 }, { b: 48 }]]]} />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'التوزيع بالتساوي على ٩: نقسم.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={5} time={60}
          question="يتمُّ توزيعُ العددِ الكُلِّيِّ لِلوَجباتِ الخَفيفةِ كلَّ أُسبوعٍ بالتَّساوِي بينَ ٩ من الكَشَّافةِ المُشتركِينَ في مُخَيَّمٍ كَشْفِيٍّ. إستعمِلِ الجدولَ المُجاورَ لِتجدَ عددَ الوَجباتِ الخَفيفةِ الَّتي يحصُلُ عليهَا كلُّ عُضْوِ كشَّافةٍ عندَ تقديمِ أعدادٍ مختلِفةٍ من هذهِ الوَجباتِ."
          hint="الوجبات ÷ ٩."
          steps={[
            { text: <><Eq>١٨ ÷ ٩ = ٢</Eq> ، <Eq>٢٧ ÷ ٩ = ٣</Eq> ، <Eq>٣٦ ÷ ٩ = ٤</Eq> ، <Eq>٤٥ ÷ ٩ = ٥</Eq></> },
            { text: 'المخرجات: ٢، ٣، ٤، ٥', kind: 'ans' },
          ]}
          chart={<RuleTable ruleStep={false} rule="△ ÷ ٩" color={ORANGE} rows={[['المدخلة △', [18, 27, 36, 45]], ['المخرجة □', [{ b: 2 }, { b: 3 }, { b: 4 }, { b: 5 }]]]} />}
        />
      ),
    },

    /* ================= تدرب ٦–٧ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'ثمن العلبة أولًا: ١٢ ÷ ٦ = ٢.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={6} time={90}
          intro={BUILD}
          question="اشترتْ خديجةُ ٦ عُلبٍ صغيرةٍ من الحَلوَى بِـ١٢ ريالًا. فكمْ عُلبةً صغيرةً مِن الحَلوى يمكنُها شراؤُها إذا كانَ لَديْها ١٤، ١٦، ١٨، ٢٠ ريالًا؟"
          hint="ابدأ بثمن العلبة الواحدة."
          steps={[
            { text: <>ثمن العلبة: <Eq>١٢ ÷ ٦ = ٢</Eq> ريالان</> },
            { text: 'القاعدة: △ ÷ ٢' },
            { text: 'العلب: ٧، ٨، ٩، ١٠', kind: 'ans' },
          ]}
          chart={<FnTable rule="△ ÷ ٢" ruleStep heads={['الريالات △', 'العلب □']} color="#a9c8ec" rows={[[14, { b: 7 }], [16, { b: 8 }], [18, { b: 9 }], [20, { b: 10 }]]} />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'التذكرة ٥ ريالات للفرد: نضرب.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={7} time={90}
          question="ذهبَ عامرٌ مع أصدقائِهِ إلى أحدِ المُتنَزَّهاتِ، إذا كانَ ثمنُ تَذكرةِ الدُّخولِ للفردِ ٥ ريالاتٍ. فمَا الثَّمنُ الكُلِّيُّ لِلتَّذاكرِ إذا كانَ عددُ الأصدقاءِ: ٢، ٣، ٤، ٥؟"
          hint="عدد الأصدقاء × ٥."
          steps={[
            { text: 'القاعدة: △ × ٥' },
            { text: 'الثمن: ١٠، ١٥، ٢٠، ٢٥ ريالًا', kind: 'ans' },
          ]}
          chart={<FnTable rule="△ × ٥" ruleStep heads={['الأصدقاء △', 'الثمن □']} color="#a9c8ec" rows={[[2, { b: 10 }], [3, { b: 15 }], [4, { b: 20 }], [5, { b: 25 }]]} />}
        />
      ),
    },

    /* ================= تدرب ٨–٩ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'صف النمط بالكلمات: كيف تتغير المخرجة عندما تتغير المدخلة؟',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{DESCRIBE}</p>
          <div className="qgrid two">
            <QCard n={8}>
              <Stack>
                <RuleTable ruleStep={false} rule="△ ÷ ٣" color={PURPLE} rows={[['المدخلة △', [27, 21, 15, 9]], ['المخرجة □', [9, 7, 5, 3]]]} />
                <Step kind="ans">كلّما نقصت المدخلة ٦ نقصت المخرجة ٢؛ فالمخرجة ثُلث المدخلة دائمًا.</Step>
              </Stack>
            </QCard>
            <QCard n={9}>
              <Stack>
                <RuleTable ruleStep={false} rule="△ × ٤" color={PURPLE} rows={[['المدخلة △', [6, 7, 8, 9]], ['المخرجة □', [24, 28, 32, 36]]]} />
                <Step kind="ans">كلّما زادت المدخلة ١ زادت المخرجة ٤؛ فالمخرجة أربعة أمثال المدخلة.</Step>
              </Stack>
            </QCard>
          </div>
          <Ctrls><NextButton /><TimerButton sec={120} /></Ctrls>
        </>
      ),
    },

    /* ================= مهارات التفكير العليا ١٠–١٣ ================= */
    {
      sec: 'hot', min: 1,
      notes: 'مسألة مفتوحة: كل طالب يختار زوجين.',
      content: (
        <QuestionSlide
          source={HOT} n={10} tps tags={[{ kind: 'warn', text: 'مسألةٌ مفتوحةٌ' }]}
          question="أُذْكُرْ زَوْجَيْنِ من المُدخَلاتِ والمُخرَجاتِ لقاعدةِ الدَّالَّةِ ٢ × △ = ○ ."
          hint="اختر أي عدد، واضربه في ٢."
          steps={[{ text: 'مثال: ٣ ← ٦ و ٧ ← ١٤ (المخرجة ضعف المدخلة)', kind: 'ans' }]}
          chart={<RuleTable ruleStep={false} rule="٢ × △" color="#a8d5ba" rows={[['△', [3, 7]], ['○', [{ b: 6 }, { b: 14 }]]]} />}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'تحدٍّ: القاعدة من عمليتين. جرّب ÷٥ أولًا: ١٥ ÷ ٥ = ٣، ينقص ١.',
      content: (
        <QuestionSlide
          source={HOT} n={11} tps tags={[{ kind: 'warn', text: 'تَحَدٍّ' }]}
          question="أَوْجِدْ قاعدةَ الدَّالَّةِ في الجدولِ المجاورِ."
          hint="لا تكفي عملية واحدة. جرّب القسمة على ٥ ثم انظر ماذا ينقص."
          steps={[
            { text: <><Eq>١٥ ÷ ٥ = ٣</Eq> والمخرجة ٤: نضيف ١</> },
            { text: <><Eq>٢٥ ÷ ٥ + ١ = ٦</Eq> ، <Eq>٤٠ ÷ ٥ + ١ = ٩</Eq> ، <Eq>٥٠ ÷ ٥ + ١ = ١١</Eq></> },
            { text: 'القاعدة: (△ ÷ ٥) + ١', kind: 'ans' },
          ]}
          chart={<RuleTable ruleStep={false} rule="…" color="#a8d5ba" rows={[['المدخلة △', [15, 25, 40, 50]], ['المخرجة □', [4, 6, 9, 11]]]} />}
        />
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'العملية العكسية للجمع هي الطرح.',
      content: (
        <QuestionSlide
          source={HOT} n={12} tps tags={[{ kind: 'warn', text: 'الحسُّ العدديُّ' }]}
          question="إذا كانتْ قِيمةُ المُخرَجةِ في قاعدةِ الدَّالَّةِ △ + ٣ هيَ ٨ فكيفَ تجدُ قيمةَ △ ؟"
          hint="ما العملية العكسية للجمع؟"
          steps={[
            { text: <>أطرحُ ٣ من ٨: <Eq>٨ − ٣ = ٥</Eq></> },
            { text: <>قيمة △ هي ٥. تحقّق: <Eq>٥ + ٣ = ٨</Eq></>, kind: 'ans' },
          ]}
          chart={<Card kind="qs" cap="الدالة"><Sentence t={[{ b: 5, box: true }, '+', 3, '=', 8]} big /></Card>}
        />
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'أكتب: اقرأ مسألتين من الطلاب.',
      content: (
        <QuestionSlide
          source={HOT} n={13} tps tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="مَسألةً من واقعِ الحَياةِ يُمكنُكَ حلُّهَا باستعمالِ جدولِ الدَّوالِّ (جداولِ الضَّربِ أو القِسمةِ)."
          hint="فكّر في أشياء متساوية في علب أو أكياس."
          steps={[
            { text: 'مثال: في كل عُلبة ٨ أقلام، فكم قلمًا في ٣ و٤ و٥ عُلب؟' },
            { text: 'القاعدة: △ × ٨ ، فالمخرجات ٢٤، ٣٢، ٤٠', kind: 'ans' },
          ]}
          chart={<FnTable rule="△ × ٨" heads={['العلب △', 'الأقلام □']} color="#a8d5ba" rows={[[3, { b: 24 }], [4, { b: 32 }], [5, { b: 40 }]]} />}
        />
      ),
    },

    /* ================= تدريب على اختبار ١٤ ================= */
    {
      sec: 'hot', min: 2,
      notes: 'المدخلة عمر هدى، والمخرجة عمر سلمى (الأكبر بـ ٤). ابحث عن الجدول الذي فيه الفرق ٤.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{TEST}</Tag>
            <TimerButton sec={60} />
          </div>
          <QCard n={14}>
            <div style={{ paddingInlineStart: '1.6em', display: 'flex', flexDirection: 'column', gap: '.3em' }}>
              <p className="qtext" style={{ margin: 0, fontSize: '.8em' }}>إذا كانَ عُمْرُ سلْمَى يزيدُ على عُمرِ هُدَى بـ ٤ سنواتٍ. فأيُّ الجداولِ التالية يوضحُ العلاقةَ بينَ عمرَيهِمَا؟ (الدرس ٤-٥)</p>
              <div className="qgrid four">
                {AGES.map(([label, a, b, outs]) => (
                  <Stack key={label}>
                    <b>{label}</b>
                    <FnTable title={`${a} ← ${b}`} heads={[`المدخلة (${a})`, `المخرجة (${b})`]} color="#a9c8ec" rows={[2, 3, 4, 5].map((x, i) => [x, outs[i]])} />
                  </Stack>
                ))}
              </div>
              <MCQ options={['أ', 'ب', 'جـ', 'د']} answer="جـ" />
            </div>
          </QCard>
        </>
      ),
    },

    /* ================= تدريب على اختبار ١٥ ================= */
    {
      sec: 'hot', min: 1,
      notes: 'جرّب كل خيار على الصف الأول: ٩ ← ٣.',
      content: (
        <QuestionSlide
          source={TEST} n={15} time={30}
          question="أوجدْ قاعدةَ الدالةِ فِي الجدولِ التالي: (الدرس ٤-٧)"
          hint="جرّب كل خيار على ٩ ← ٣، ثم على ١٥ ← ٥."
          steps={[
            { text: <><Eq>٩ ÷ ٣ = ٣</Eq> ، <Eq>١٥ ÷ ٣ = ٥</Eq> ، <Eq>١٨ ÷ ٣ = ٦</Eq> ، <Eq>٢١ ÷ ٣ = ٧</Eq></> },
            { text: 'د) △ ÷ ٣', kind: 'ans' },
          ]}
          chart={<FnTable title="الجدول" color="#a9c8ec" rows={[[9, 3], [15, 5], [18, 6], [21, 7]]} />}
        >
          <MCQ options={['أ) △ + ٦', 'ب) △ × ٦', 'جـ) △ × ٣', 'د) △ ÷ ٣']} answer="د) △ ÷ ٣" />
        </QuestionSlide>
      ),
    },

    /* ================= مراجعة تراكمية ١٦–١٨ ================= */
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٤-٢: احسب الطرف المعلوم أولًا، وانتبه لإشارة المقارنة.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{REVIEW}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>اكتبِ العمليةَ ( + ، − ) التي تجعلُ الجُملَ العدديةَ الآتيةَ صحيحةً؟ (الدرس ٤ - ٢)</p>
          <div className="qgrid one" style={{ fontSize: '1.1em' }}>
            <QCard n={16}>
              <div className="flines">
                <Sentence t={[573, op('+'), 8, '=', 592, '−', 11]} />
                <Step><span style={{ fontSize: '.6em', fontWeight: 700, color: 'var(--ex)' }}><Eq>٥٧٣ + ٨ = ٥٨١</Eq> و <Eq>٥٩٢ − ١١ = ٥٨١</Eq></span></Step>
              </div>
            </QCard>
            <QCard n={17}>
              <div className="flines">
                <Sentence t={[369, '+', 123, '>', 495, op('−'), 12]} />
                <Step><span style={{ fontSize: '.6em', fontWeight: 700, color: 'var(--ex)' }}><Eq>٣٦٩ + ١٢٣ = ٤٩٢</Eq> و <Eq>٤٩٥ − ١٢ = ٤٨٣</Eq></span></Step>
              </div>
            </QCard>
            <QCard n={18}>
              <div className="flines">
                <Sentence t={[130, op('−'), 19, '<', 512, '−', 396]} />
                <Step><span style={{ fontSize: '.6em', fontWeight: 700, color: 'var(--ex)' }}><Eq>١٣٠ − ١٩ = ١١١</Eq> و <Eq>٥١٢ − ٣٩٦ = ١١٦</Eq></span></Step>
              </div>
            </QCard>
          </div>
          <Ctrls><NextButton /><TimerButton sec={150} /></Ctrls>
        </>
      ),
    },

    /* ================= مراجعة تراكمية ١٩–٢٠ ================= */
    {
      sec: 'hot', min: 1,
      notes: 'مراجعة الدرس ٤-٤.',
      content: (
        <QuestionSlide
          source={REVIEW} n={19} time={30}
          question="ما القاعدةُ التي تصفُ النمطَ الموضَّحَ في الجدولِ المجاورِ؟ (الدرس ٤-٤)"
          hint="الفرق بين كل مدخلة ومخرجتها."
          steps={[
            { text: <><Eq>١١ − ٣ = ٨</Eq> ، <Eq>١٣ − ٣ = ١٠</Eq> ، <Eq>١٥ − ٣ = ١٢</Eq> ، <Eq>١٧ − ٣ = ١٤</Eq></> },
            { text: 'القاعدة: △ − ٣', kind: 'ans' },
          ]}
          chart={<FnTable rule="△ − ٣" ruleStep color="#a9c8ec" rows={[[11, 8], [13, 10], [15, 12], [17, 14]]} />}
        />
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'مراجعة الدرس ٣-٦: هل يوجد قلم رصاص في المقلمة؟',
      content: (
        <QuestionSlide
          source={REVIEW} n={20} time={30}
          question="في مقلمةِ العنودِ ثلاثةُ أقلامِ حبرٍ، ومسطرةٌ، ومبراةٌ، وأرادتِ اختيارَ شيءٍ واحدٍ منْهَا. صِفْ بالكلماتِ احتمالَ أنْ يكونَ ما اختارَتْهُ قلمَ رصاصٍ. (الدرس ٣-٦)"
          hint="هل في المقلمة قلم رصاص أصلًا؟"
          steps={[{ text: 'مستحيلٌ؛ لأنه لا يوجد قلمُ رصاصٍ في المقلمة.', kind: 'ans' }]}
          chart={<Card kind="ex" cap="المقلمة">✒️ ✒️ ✒️ · 📏 · ✂️ مبراة</Card>}
        >
          <MCQ options={['مؤكَّد', 'أقل احتمالًا', 'مستحيل']} answer="مستحيل" />
        </QuestionSlide>
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
            center={<>جداول الضرب<br />والقسمة</>}
            items={[
              { kind: 'rule', cap: 'ضرب', text: '«في كل … » ← △ × العدد' },
              { kind: 'ex', cap: 'قسمة', text: '«بالتساوي» أو «كل … لـ واحد» ← △ ÷ العدد' },
              { kind: 'qs', cap: 'أحدد القاعدة', text: 'أجرّب العملية على كل الصفوف، لا على صف واحد.' },
              { kind: 'warn', cap: 'أصف النمط', text: 'كلما زادت المدخلة … زادت المخرجة …' },
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
          <div className="ticket">
            <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="القاعدة △ × ٣. ما المخرجة عندما تكون المدخلة ٧؟" options={['١٠', '٢١', '٢٤']} answer="٢١" /></Card>
            <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="المدخلات ١٠، ٢٠، ٣٠ والمخرجات ٢، ٤، ٦. ما القاعدة؟" options={['△ − ٨', '△ ÷ ٥', '△ × ٢']} answer="△ ÷ ٥" /></Card>
            <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="في كل صندوق ٦ عصائر. كم صندوقًا يحوي ٤٢ عصيرًا؟" options={['٦', '٧', '٨']} answer="٧" /></Card>
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
