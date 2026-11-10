import {
  BookLabel, Card, Cols, Ctrls, Definition, DotArray, DotArrays, Eq, ExitTicket, GoHomeButton, Goals, Grid, IfTeams, MCQ, MindMap, NextButton, NumberRow, QCard, QCol, QText,
  QuestionGroup, QuestionSlide, ShowLater, SlideHead, Solution, Stack, Step, StepRow, TimesTable, Winner, defineLesson, storySlide, ArrayExplorer,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

const READY = 'اسْتَعِدَّ، ص ١٣٩';
const CHECK = 'تأكَّدْ، ص ١٤٠';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ١٤١';
const REAL = 'مسألةٌ منْ واقعِ الحياةِ، ص ١٤١';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٤١';
const COMET = 'فلك: يُمكنُ مشاهدةُ مذنَّبِ كُوهتِك كُلَّ ٦ سَنواتٍ.';

/** بطاقة عدد واحد: العدد كبيرًا وجوابه */
const NumQ = ({ n, v, label, a }: { n: number; v: number; label: string; a: string }) => (
  <QCard n={n}>
    <NumberRow nums={[v]} />
    <Step kind="ans" label={label}>{a}</Step>
  </QCard>
);
const FACT = 'الْقَوَاسِمُ';
const MULT = 'الْمُضَاعَفَاتُ';

export default defineLesson({
  meta: {
    id: 'g4-5-1-factors-multiples',
    design: 'v2',
    code: '٥-١',
    title: 'القواسمُ والمُضاعفاتُ',
    shortTitle: 'القواسم والمضاعفات',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الخامس: الضرب في عدد من رقم واحد',
    source: 'الجزء الأول، ص ١٣٩–١٤١',
    minutes: 45,
    idea: 'أجدُ قواسمَ عددٍ ومضاعفاتِهِ.',
    bookQuestions: 28,
  },
  sectionDesc: {
    engage: 'تذكّر حقائق الضرب',
    explore: 'استعد: ترتيب الطاولات',
    explain: 'المثالان ١ و٢',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–١٠',
    practice: 'الأسئلة ١١–٢٥',
    hot: 'الأسئلة ٢٦–٢٨',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردتين: القواسم ومضاعف العدد.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أجدُ قواسمَ عددٍ ومضاعفاتِهِ.</Card>
              <Card kind="rule" cap="المفردات">القواسمُ، مضاعفُ العددِ</Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals items={['أجد قواسم عدد.', 'أجد المضاعفات الخمسة الأولى لعدد.', 'أحل مسائل بالقواسم والمضاعفات.']} />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة سريعة لحقائق الضرب. اختر طالبًا بالعجلة لكل سؤال.',
      content: (
        <>
          <SlideHead tag="تذكّر" kind="ink">حقائق الضرب</SlideHead>
          <Grid cols={3}>
            <MCQ q="٣ × ٤ = ؟" options={['٧', '١٢', '١٠']} answer="١٢" award />
            <MCQ q="٥ × ٢ = ؟" options={['١٠', '٧', '٢٥']} answer="١٠" award />
            <MCQ q="٦ × ٦ = ؟" options={['١٢', '٣٠', '٣٦']} answer="٣٦" award />
          </Grid>
        </>
      ),
    },

    /* ================= استعد ================= */
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند السؤال واسأل: كم فريقًا نجرب؟ دع الطلاب يقترحون، ثم جرّبوا أداة الصفوف بمثال جديد.'),
    {
      sec: 'explore', min: 4,
      notes: 'مثال جديد غير القصة: ٤٠ نقطة. غيّر عدد الصفوف من ١ إلى ١٢؛ كل ترتيب تتساوى فيه الصفوف يعطينا قاسمين لـ٤٠ يُسجَّلان تحت.',
      content: (
        <>
          <SlideHead tag="نُجَرِّبُ مِثَالًا آخَرَ" kind="ex">نُرَتِّبُ فِي صُفُوفٍ</SlideHead>
          <ArrayExplorer n={40} />
        </>
      ),
    },
    {
      sec: 'explore', min: 3,
      notes: 'دع الطلاب يقترحون ترتيبات: كم صفًّا؟ وكم طاولة في كل صف؟ لا تعطِ العدد قبل المثال.',
      content: (
        <>
          <SlideHead tag={READY} kind="qs">ترتيبُ الطاولاتِ</SlideHead>
          <Cols>
            <QCol>
              <QText>فِي غُرفةِ الصَّفِّ ٢٤ طاولةً. بكمْ طريقةٍ يستطيعُ المعلِّمُ ترتيبَ هذه الطاولاتِ عَلى شَكلِ صُفوفٍ متساويةٍ؟</QText>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>نُجرِّبُ: ٤ صفوفٍ، في كلِّ صفٍّ ٦ طاولاتٍ.</Step>
                <Step>ونبحثُ عنْ كلِّ عددينِ ناتجُ ضربِهما ٢٤</Step>
              </Solution>
            </QCol>
            <ShowLater><DotArray big rows={4} cols={6} /></ShowLater>
          </Cols>
        </>
      ),
    },

    /* ================= القواسم ================= */
    {
      sec: 'explain', min: 2,
      notes: 'القواسم هي الأعداد التي نضرب بعضها في بعض لنجد الناتج.',
      content: (
        <>
          <SlideHead tag="القواسمُ، ص ١٣٩" kind="rule">ما القواسمُ؟</SlideHead>
          <Definition kind="rule">الأعدادُ الَّتي نضربُ بعضَهَا في بعضٍ لنجدَ ناتجَ الضربِ تُسمى قواسمَ (عواملَ). ولكي نحصلَ عَلى جميعِ الطرائقِ لترتيبِ الطاولاتِ، فإنَّه يجبُ أنْ نجدَ قواسمَ العددِ ٢٤</Definition>
        </>
      ),
    },

    /* ================= مثال ١ ================= */
    {
      sec: 'explain', min: 4,
      notes: 'أنا أعمل: اكتب كل زوج، ولاحظ أن كل زوج يعطي عددين من القواسم. ٤ أزواج تعطي ٨ قواسم.',
      content: (
        <>
          <SlideHead tag="مثال ١، من واقع الحياة، ص ١٣٩" kind="ex">إيجادُ القواسمِ</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>مدرسة:</BookLabel> بكمْ طريقةٍ يستطيعُ المعلِّمُ ترتيبَ الطاولاتِ في غُرفةِ الصَّفِّ؟</QText>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>نكتبُ كلَّ عددينِ حاصلُ ضربِهما ٢٤</Step>
                <StepRow>
                  <Step hl={['n0']}><Eq>١ × ٢٤</Eq></Step>
                  <Step hl={['n1']}><Eq>٢ × ١٢</Eq></Step>
                  <Step hl={['n2']}><Eq>٣ × ٨</Eq></Step>
                  <Step hl={['n3']}><Eq>٤ × ٦</Eq></Step>
                </StepRow>
                <Step>قواسمُ ٢٤ هيَ: ١، ٢، ٣، ٤، ٦، ٨، ١٢، ٢٤</Step>
                <Step kind="ans" label="عَدَدُ الطَّرَائِقِ">٨ طَرَائِقَ</Step>
              </Solution>
            </QCol>
            <DotArrays items={[[1, 24], [2, 12], [3, 8], [4, 6]]} />
          </Cols>
        </>
      ),
    },

    /* ================= المضاعف ================= */
    {
      sec: 'explain', min: 2,
      notes: 'ناتج الضرب مضاعف لكل من العددين.',
      content: (
        <>
          <SlideHead tag="مضاعفُ العددِ، ص ١٤٠" kind="rule">ما مضاعفُ العددِ؟</SlideHead>
          <Definition kind="rule">يُسمَّى حاصلُ ضربِ عددٍ في عددٍ آخرَ مُضاعفَ العددِ، فمثلًا ١٥ هو مُضاعفٌ للعددِ ٥؛ لأنَّه يُساوي حاصلَ ضربِ ٥ في ٣</Definition>
        </>
      ),
    },

    /* ================= مثال ٢ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: أشر إلى صف ٧ ثم عمود ٧: الأعداد نفسها.',
      content: (
        <>
          <SlideHead tag="مثال ٢، ص ١٤٠" kind="ex">إيجادُ مضاعفاتِ عددٍ</SlideHead>
          <Cols>
            <QCol>
              <QText>أوجدِ المُضاعفاتِ الخمسةَ الأولى للعددِ ٧</QText>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step hl={['h0']}>نقرأُ الأعدادَ في صفِّ العددِ ٧</Step>
                <Step hl={['h0', 'g0']}>وهيَ نفسُها في عمودِ العددِ ٧</Step>
                <Step kind="ans" label={MULT}>٧، ١٤، ٢١، ٢٨، ٣٥</Step>
              </Solution>
            </QCol>
            <TimesTable n={7} />
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: قواسم ١٦ بالصفوف، ثم مضاعفات ٨ على خط الأعداد، ثم الصلة: ٨ قاسم لـ١٦ و١٦ مضاعف لـ٨ (مثال غير أمثلة الكتاب). أوقفه قبل الصلة واسأل: ما العلاقة بين ٨ و١٦؟',
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
      notes: 'نعمل معًا: اطلب من الطالب أن يقول السبب بالضرب.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">قاسمٌ أمْ مضاعفٌ؟</SlideHead>
          <Grid cols={3}>
            <MCQ q="أيُّ عددٍ قاسمٌ للعددِ ٢٠؟" options={['٣', '٤', '٦']} answer="٤" award />
            <MCQ q="أيُّ عددٍ مضاعفٌ للعددِ ٦؟" options={['٢٠', '٢٤', '٢٦']} answer="٢٤" award />
            <MCQ q="كمْ قاسمًا للعددِ ١٥؟" options={['٢', '٣', '٤']} answer="٤" award />
          </Grid>
        </>
      ),
    },

    /* ================= تأكد ١–٤ ================= */
    {
      sec: 'check', min: 3,
      notes: 'نبحث عن أزواج ناتج ضربها العدد. انتبه: ٣٦ فيها ٦ × ٦ زوج عدده واحد.',
      content: (
        <QuestionGroup source={CHECK} instruction="أوجدْ قواسمَ كلِّ عددٍ فِيما يأتِي:" time={180}>
          <NumQ n={1} v={6} label={FACT} a="١، ٢، ٣، ٦" />
          <NumQ n={2} v={10} label={FACT} a="١، ٢، ٥، ١٠" />
          <NumQ n={3} v={12} label={FACT} a="١، ٢، ٣، ٤، ٦، ١٢" />
          <NumQ n={4} v={36} label={FACT} a="١، ٢، ٣، ٤، ٦، ٩، ١٢، ١٨، ٣٦" />
        </QuestionGroup>
      ),
    },

    /* ================= تأكد ٥–٨ ================= */
    {
      sec: 'check', min: 3,
      notes: 'نضرب العدد في ١ و٢ و٣ و٤ و٥.',
      content: (
        <QuestionGroup source={CHECK} instruction="أوجدِ المُضاعفاتِ الخمسةَ الأولَى لكلِّ عددٍ فِيما يأتِي:" time={120}>
          <NumQ n={5} v={2} label={MULT} a="٢، ٤، ٦، ٨، ١٠" />
          <NumQ n={6} v={4} label={MULT} a="٤، ٨، ١٢، ١٦، ٢٠" />
          <NumQ n={7} v={9} label={MULT} a="٩، ١٨، ٢٧، ٣٦، ٤٥" />
          <NumQ n={8} v={3} label={MULT} a="٣، ٦، ٩، ١٢، ١٥" />
        </QuestionGroup>
      ),
    },

    /* ================= تأكد ٩–١٠ ================= */
    {
      sec: 'check', min: 2,
      notes: 'في الصينية ٦ كعكات كما في صورة الكتاب: مضاعفات ٦.',
      content: (
        <QuestionSlide
          source={CHECK} n={9} time={60}
          question="تُعدُّ هيفاءُ كعكاتٍ باستعمالِ الصينيةِ المجاورةِ. كم كعكةً تستطيعُ هيفاءُ إعدادَها إذا استعملتْ ١ أو ٢ أو ٣ أو ٤ مِن هذهِ الصَّواني؟"
          hint="كم كعكة في الصينية الواحدة؟"
          steps={[
            { text: 'في الصينيةِ ٦ كعكاتٍ.' },
            { text: 'نجدُ مضاعفاتِ العددِ ٦' },
            { label: 'عَدَدُ الْكَعَكَاتِ', text: '٦ أَوْ ١٢ أَوْ ١٨ أَوْ ٢٤ كَعْكَةً', kind: 'ans' },
          ]}
          chart={<DotArray big rows={2} cols={3} />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'تحدّث: اقبل أي مثال صحيح.',
      content: (
        <QuestionSlide
          source={CHECK} n={10} tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]}
          question="اشرحِ العلاقةَ بينَ القواسمِ والمضاعفاتِ."
          hint="ماذا نعرف عن ٣ و١٢؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'إِذَا كَانَ ٣ قَاسِمًا لِلْعَدَدِ ١٢ فَإِنَّ ١٢ مُضَاعَفٌ لِلْعَدَدِ ٣', kind: 'ans' }]}
          chart={null}
        />
      ),
    },

    /* ================= تدرب ١١–١٤ ================= */
    {
      sec: 'practice', min: 3,
      notes: 'نبدأ بالعدد ١ ثم نصعد حتى يتكرر الزوج.',
      content: (
        <QuestionGroup source={PRACTICE} instruction="أوجدْ قواسمَ كلِّ عددٍ ممَّا يأتي:" time={180}>
          <NumQ n={11} v={4} label={FACT} a="١، ٢، ٤" />
          <NumQ n={12} v={28} label={FACT} a="١، ٢، ٤، ٧، ١٤، ٢٨" />
          <NumQ n={13} v={35} label={FACT} a="١، ٥، ٧، ٣٥" />
          <NumQ n={14} v={42} label={FACT} a="١، ٢، ٣، ٦، ٧، ١٤، ٢١، ٤٢" />
        </QuestionGroup>
      ),
    },

    /* ================= تدرب ١٥–١٨ ================= */
    {
      sec: 'practice', min: 3,
      notes: 'يمكن استعمال جدول الضرب.',
      content: (
        <QuestionGroup source={PRACTICE} instruction="أوجدِ المُضاعفاتِ الخمسةَ الأولَى لكلِّ عددٍ ممَّا يأتي:" time={120}>
          <NumQ n={15} v={1} label={MULT} a="١، ٢، ٣، ٤، ٥" />
          <NumQ n={16} v={5} label={MULT} a="٥، ١٠، ١٥، ٢٠، ٢٥" />
          <NumQ n={17} v={6} label={MULT} a="٦، ١٢، ١٨، ٢٤، ٣٠" />
          <NumQ n={18} v={8} label={MULT} a="٨، ١٦، ٢٤، ٣٢، ٤٠" />
        </QuestionGroup>
      ),
    },

    /* ================= تدرب ١٩–٢٠ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'عدد الصفوف وعدد القطع في الصف هما القاسمان.',
      content: (
        <QuestionGroup source={PRACTICE} instruction="حَدِّدِ القواسمَ الَّتي تمثِّلُها القِطعُ الآتيةُ:" time={60}>
          <QCard n={19}>
            <DotArray big rows={2} cols={4} />
            <Step kind="ans" label={FACT}>٢ وَ٤</Step>
          </QCard>
          <QCard n={20}>
            <DotArray big rows={3} cols={5} />
            <Step kind="ans" label={FACT}>٣ وَ٥</Step>
          </QCard>
        </QuestionGroup>
      ),
    },

    /* ================= تدرب ٢١–٢٢ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'نضرب ٥ في عدد الأيام.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={21} time={90}
          question="نصلِّي فِي اليومِ والليلةِ ٥صَلواتٍ مَفروضةٍ. كم صَلاةً فِي أُسبوعٍ، وفِي ١٠أيامٍ، وفِي ١١يومًا، وفِي ١٢يومًا؟"
          hint="كم يومًا في الأسبوع؟"
          steps={[
            { text: 'نضربُ ٥ في عددِ الأيامِ.' },
            { label: 'فِي أُسْبُوعٍ', text: '٣٥ صَلَاةً', kind: 'ans' },
            { label: 'فِي ١٠ أَيَّامٍ', text: '٥٠ صَلَاةً', kind: 'ans' },
            { label: 'فِي ١١ يَوْمًا', text: '٥٥ صَلَاةً', kind: 'ans' },
            { label: 'فِي ١٢ يَوْمًا', text: '٦٠ صَلَاةً', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'كل زوج ناتج ضربه ٣٠ ترتيب ممكن.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={22} time={60}
          question="٣٠ بيضةً، يمكنُ ترتيبُها على شكلِ ١٥×٢، اكتبْ طريقتَينِ أُخرَيَيْنِ يمكنُ بهما ترتيبُ البيضِ."
          hint="ما الأعداد التي ناتج ضربها ٣٠؟"
          steps={[
            { text: 'نبحثُ عنْ عددينِ ناتجُ ضربِهما ٣٠' },
            { label: 'الطَّرِيقَةُ الْأُولَى', text: <Eq>٣ × ١٠</Eq>, kind: 'ans' },
            { label: 'الطَّرِيقَةُ الثَّانِيَةُ', text: <Eq>٥ × ٦</Eq>, kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },

    /* ================= واقع الحياة ٢٣–٢٥ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'المشاهدات عند ٦، ١٢، ١٨…: مضاعفات ٦.',
      content: (
        <QuestionSlide
          source={REAL} n={23} time={60} intro={COMET}
          question="كمْ يبلغُ عُمرُ شخصٍ شاهدَ المذنَّبَ ٤ أو ٥ أو ٦ أو ٧ مرَّاتٍ، إذا كانَ عُمرُهُ عِندَ أوَّلِ مشاهدةٍ ٦ سَنواتٍ؟"
          hint="متى تكون المشاهدة الثانية؟"
          steps={[
            { text: 'نجدُ مضاعفاتِ العددِ ٦' },
            { label: '٤ مَرَّاتٍ', text: '٢٤ سَنَةً', kind: 'ans' },
            { label: '٥ مَرَّاتٍ', text: '٣٠ سَنَةً', kind: 'ans' },
            { label: '٦ مَرَّاتٍ', text: '٣٦ سَنَةً', kind: 'ans' },
            { label: '٧ مَرَّاتٍ', text: '٤٢ سَنَةً', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نعدّ مضاعفات ٦ التي لا تزيد على العمر.',
      content: (
        <QuestionSlide
          source={REAL} n={24} time={60} intro={COMET}
          question="عُمرُ وليدٍ ١١ سنةً، وعُمرُ والدِهِ ٣٨ سنةً، وعُمرُ أُمِّهِ ٣٦ سنةً. كمْ مرَّةً شاهَدَ كلٌّ مِنهم هَذا المذنَّبَ؟"
          hint="كم مضاعفًا للعدد ٦ لا يزيد على العمر؟"
          steps={[
            { text: 'نعدُّ مضاعفاتِ ٦ حتى العمرِ.' },
            { label: 'وَلِيدٌ', text: 'مَرَّةً وَاحِدَةً', kind: 'ans' },
            { label: 'وَالِدُهُ', text: '٦ مَرَّاتٍ', kind: 'ans' },
            { label: 'أُمُّهُ', text: '٦ مَرَّاتٍ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'الطريقة نفسها بمضاعفات ٤.',
      content: (
        <QuestionSlide
          source={REAL} n={25} time={60}
          question="إذا كانَ يُمكنُ مُشاهدةُ المذنَّبِ كلَّ ٤ سنواتٍ، فكيفَ تَحلُّ التمرينَ ٢٤؟ اشرحْ إجابتَك."
          hint="أي مضاعفات نعدّ الآن؟"
          steps={[
            { text: 'نعدُّ مضاعفاتِ ٤ حتى العمرِ.' },
            { label: 'وَلِيدٌ', text: 'مَرَّتَيْنِ', kind: 'ans' },
            { label: 'وَالِدُهُ', text: '٩ مَرَّاتٍ', kind: 'ans' },
            { label: 'أُمُّهُ', text: '٩ مَرَّاتٍ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },

    /* ================= مهارات التفكير العليا ================= */
    {
      sec: 'hot', min: 2,
      notes: 'مسألة مفتوحة: أي مضاعف للعدد ٦ يصلح.',
      content: (
        <QuestionSlide
          source={HOT} n={26} tags={[{ kind: 'warn', text: 'مسألةٌ مفتوحةٌ' }]}
          question="اذكرْ ثلاثةَ أعدادٍ يكونُ العددانِ ٢ ، ٣ قاسِميْنِ لكلٍّ مِنها."
          hint="ما ناتج ٢ × ٣؟"
          steps={[
            { text: <>نضربُ: <Eq>٢ × ٣ = ٦</Eq></> },
            { text: 'ومضاعفاتُ ٦ تصلحُ كلُّها.' },
            { label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: '٦، ١٢، ١٨', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'الحس العددي: ٦٠ و٧٢ و٨٤ و٩٠ و٩٦ لكل منها ١٢ قاسمًا.',
      content: (
        <QuestionSlide
          source={HOT} n={27} tags={[{ kind: 'warn', text: 'الحسُّ العدديُّ' }]}
          question="اذكرْ عددًا أصغرَ مِن ١٠٠ لَهُ أكبرُ عددٍ مِن القَواسمِ."
          hint="جرّب أعدادًا تقبل القسمة على ٢ و٣ و٥."
          steps={[
            { text: 'قواسمُ ٦٠ عددُها ١٢' },
            { label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: '٦٠', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'أكتب: اقرأ إجابتين من الطلاب.',
      content: (
        <QuestionSlide
          source={HOT} n={28} tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="لماذا لا يكونُ وقوفُ ٢٤ طالبًا في صفٍّ واحدٍ خيارًا جيدًا للتصويرِ معًا؟"
          hint="كيف سيبدو الصف في الصورة؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'الصَّفُّ طَوِيلٌ جِدًّا، وَتَرْتِيبُ ٤ × ٦ أَفْضَلُ', kind: 'ans' }]}
          chart={null}
        />
      ),
    },

    /* ================= الختام ================= */
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب إكمال كل فرع شفهيًا قبل أن تشير إليه.',
      content: (
        <>
          <SlideHead tag="أهمّ الأفكار" kind="rule">ملخص الدرس</SlideHead>
          <MindMap
            center={<>القواسم<br />والمضاعفات</>}
            items={[
              { kind: 'rule', cap: 'القواسم', text: 'الأعداد التي نضربها لنجد الناتج' },
              { kind: 'ex', cap: 'مثال', text: 'قواسم ١٠ هي ١، ٢، ٥، ١٠' },
              { kind: 'qs', cap: 'المضاعف', text: 'حاصل ضرب العدد في عدد آخر' },
              { kind: 'warn', cap: 'مثال', text: 'مضاعفات ٣ هي ٣، ٦، ٩، ١٢، ١٥' },
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
          <ExitTicket>
            <MCQ q="أيُّ عددٍ قاسمٌ للعددِ ١٤؟" options={['٣', '٧', '٥']} answer="٧" />
            <MCQ q="ما المضاعفُ الرابعُ للعددِ ٥؟" options={['١٥', '٢٠', '٢٥']} answer="٢٠" />
            <MCQ q="كمْ طريقةً لترتيبِ ١٦ كرسيًّا في صفوفٍ متساويةٍ؟" options={['٣', '٤', '٥']} answer="٥" />
          </ExitTicket>
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
