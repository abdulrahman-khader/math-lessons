import {
  Card, Cols, Ctrls, DataGrid, GoHomeButton, IfTeams, LiveTally, MCQ, Mark, MindMap, NextButton, QCol, QuestionSlide, SlideHead, Solution, Stack,
  Step, Tally, Winner, defineLesson, type Cell, type HlKey,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ · ص ٨٤';
const PRACTICE = 'أتدرَّبُ · ص ٨٥';
const SOLVE = 'أحُلُّ المسألةَ · ص ٨٥';

type Row = [label: string, n: number];

/** خلية تظهر مع الخطوة التي فيها hl ‹v{i}› */
const at = (i: number, c: { v?: string | number; tally?: number }): Cell => ({ ...c, k: `v${i}` as HlKey });

/** جدول إشارات بثلاثة أعمدة كما في الكتاب: النوع، إشارات العد، العدد. reveal: الإشارات والأعداد تظهر مع الخطوات */
const TallyTable = ({ head, rows, reveal, tone = 'green', count = true }: { head: string; rows: Row[]; reveal?: boolean; tone?: 'green' | 'blue'; count?: boolean }) => (
  <DataGrid
    tone={tone}
    head={count ? [head, 'إشاراتُ العدِّ', 'العددُ'] : [head, 'الإشاراتُ']}
    rows={rows.map(([l, n], i) => (count ? [l, reveal ? at(i, { tally: n }) : { tally: n }, reveal ? at(i, { v: n }) : n] : [l, { tally: n }]))}
  />
);

/** جدولا الكتاب الفارغان: يملؤهما الصف من إجابات زملائه (لا أعداد من عندنا) */
const Seasons = () => (
  <LiveTally id="g2-4-1-seasons" head="الْفَصْلُ الْمُفَضَّلُ" title="الفصل المفضل"
    rows={[{ name: 'الشِّتاءُ' }, { name: 'الرَّبيعُ' }, { name: 'الصَّيْفُ' }, { name: 'الْخَريفُ' }]} />
);
const Breakfast = () => (
  <LiveTally id="g2-4-1-breakfast" head="نَوْعُ الإِفْطَارِ" title="الإفطار المفضل"
    rows={[{ name: 'حليبٌ وبيضٌ' }, { name: 'حليبٌ وجبنٌ' }, { name: 'حليبٌ وعسلٌ' }]} />
);
const TRIP_LEFT: Row[] = [['نُزْهَةٌ بَرِّيَّةٌ', 7], ['زِيارةُ حديقةِ الحيواناتِ', 5], ['زِيارةُ المُتْحَفِ', 8]];
const TRIP_RIGHT: Row[] = [['نُزْهَةٌ بَرِّيَّةٌ', 6], ['زِيارةُ حديقةِ الحيواناتِ', 5], ['زِيارةُ المُتْحَفِ', 3]];

export default defineLesson({
  meta: {
    id: 'g2-4-1-tally-chart',
    code: '٤-١',
    title: 'جَدْوَلُ الإِشَارَاتِ',
    shortTitle: 'جدول الإشارات',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الرابع: تمثيل البيانات وقراءتها',
    source: 'الجزء الأول · ص ٨٤–٨٥',
    minutes: 45,
    idea: 'أَجْمَعُ الْبَيانَاتِ، ثُمَّ أُنَظِّمُهَا مُسْتَعْمِلًا إِشَارَاتِ الْعَدِّ.',
    bookQuestions: 9,
  },
  sectionDesc: {
    engage: 'سؤال للصف',
    explore: 'أستعد: الكتاب المفضل',
    explain: 'خطوات جمع البيانات',
    elab: 'نجمع بيانات الصف',
    check: 'الأسئلة ١–٣',
    practice: 'الأسئلة ٤–٩',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردات. اسأل: هل سمعتم كلمة «بيانات» من قبل؟',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَجْمَعُ الْبَيانَاتِ، ثُمَّ أُنَظِّمُهَا مُسْتَعْمِلًا إِشَارَاتِ الْعَدِّ.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>جَدْوَلُ الإِشَارَاتِ</Mark> · <Mark>الْبَيانَاتُ</Mark> · <Mark>إِشَارَاتُ الْعَدِّ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, lineHeight: 1.8 }}>
                <li>أسأل سؤالًا وأجمع الإجابات.</li>
                <li>أسجّل كل إجابة بإشارة.</li>
                <li>أعدّ الإشارات وأقرأ الجدول.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 2,
      notes: 'اسأل الصف سؤالًا سريعًا (ما لعبتك المفضلة؟) واطلب رفع الأيدي. ثم اسأل: كيف نتذكر كل الإجابات؟ لا تعطِ الإجابة بعد.',
      content: (
        <>
          <SlideHead tag="سؤال للصف" kind="qs">كيف نتذكر الإجابات؟</SlideHead>
          <Cols>
            <Card kind="qs" cap="سؤال">سألت المعلمة: ما لعبتك المفضلة؟ فرفع كثير من الطلاب أيديهم. كيف نتذكر كم طالبًا اختار كل لعبة؟</Card>
            <Stack>
              <Ctrls><NextButton /></Ctrls>
              <Step><Card kind="ex" cap="فكرة">نرسم خطًا صغيرًا لكل إجابة، ثم نعدّ الخطوط!</Card></Step>
              <Step><Card kind="rule" cap="هذا هو درسنا">الخط الصغير اسمه <Mark>إِشَارَةُ عَدٍّ</Mark>، والجدول اسمه <Mark>جَدْوَلُ الإِشَارَاتِ</Mark>.</Card></Step>
            </Stack>
          </Cols>
        </>
      ),
    },

    /* ================= أستعد ================= */
    {
      sec: 'explore', min: 3,
      notes: 'اقرأ الجدول مع الطلاب. اسأل: كم طالبًا يفضّل القصص؟ كيف عرفت بسرعة؟ (حزمة خمس ثم ثلاث).',
      content: (
        <>
          <SlideHead tag="أستعدُّ · ص ٨٤" kind="qs">ما نوعُ الكتابِ المُفضَّلِ لديكَ؟</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">أَطْرَحُ سُؤَالًا، ثُمَّ أَسْتَعْمِلُ جَدْوَلَ الإِشَارَاتِ لأُسَجِّلَ الْبَيانَاتِ الَّتي حَصَلْتُ عَلَيْهَا.</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step hl={['p0']}>موسوعات: إشارتان ← ٢</Step>
                <Step hl={['p1']}>قصص: خمس ثم ثلاث ← ٨</Step>
                <Step hl={['p2']} kind="ans">مغامرات: خمس ← ٥</Step>
              </Solution>
            </QCol>
            <TallyTable head="نَوْعُ الْكِتَابِ" rows={[['مَوْسُوعَاتٌ', 2], ['قِصَصٌ', 8], ['مُغَامَرَاتٌ', 5]]} reveal />
          </Cols>
        </>
      ),
    },

    /* ================= خطوات جمع البيانات ================= */
    {
      sec: 'explain', min: 3,
      notes: 'اقرأ الخطوات الأربع. اعرض: |||| مع خط مائل = ٥. اطلب من الطلاب رسم ٧ بالإشارات على السبورة الصغيرة.',
      content: (
        <>
          <SlideHead tag="القاعدة · ص ٨٤" kind="rule">خطوات جمع البيانات</SlideHead>
          <Cols>
            <Card kind="rule" cap="خُطُواتُ جَمْعِ الْبَيانَاتِ">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, lineHeight: 2, fontSize: '1.1em' }}>
                <li>أَكْتُبُ سُؤَالًا.</li>
                <li>أَطْرَحُ السُّؤَالَ.</li>
                <li>أُسَجِّلُ كُلَّ إِجَابَةٍ بِإِشَارَةِ عَدٍّ.</li>
                <li>أَعُدُّ الإِشَارَاتِ.</li>
              </ol>
            </Card>
            <Card kind="ex" cap="أتذكّر">
              <div className="flines" style={{ fontSize: '1.4em', fontWeight: 800, alignItems: 'center' }}>
                <span><Tally n={1} /> تَعْنِي ١</span>
                <span><Tally n={5} /> تَعْنِي ٥</span>
                <span><Tally n={7} /> تَعْنِي ٧</span>
              </div>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: الفاكهة المفضلة (مثال غير مثال الكتاب). أوقفه بعد الإشارة الخامسة واسأل: لماذا رسمنا خطًا مائلًا؟',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },

    /* ================= نجمع بيانات الصف ================= */
    {
      sec: 'elab', min: 5,
      notes: 'نشاط: اسأل كل طالب عن حيوانه المفضل، وادعُ طالبًا يضغط + في الصف المناسب لكل إجابة. ثم اسأل: أيّ حيوان أكثر؟ كم طالبًا أجاب؟',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">ما حيوانك المفضل؟</SlideHead>
          <LiveTally id="g2-4-1-animals" head="الْحَيَوَانُ الْمُفَضَّلُ" title="الحيوان المفضل"
            rows={[{ name: 'الجمل', label: '🐪 الجمل' }, { name: 'الحصان', label: '🐎 الحصان' }, { name: 'القطة', label: '🐱 القطة' }, { name: 'العصفور', label: '🐦 العصفور' }]} />
        </>
      ),
    },
    {
      sec: 'elab', min: 2,
      notes: 'تحقق سريع: اختر طالبًا بالعجلة لكل سؤال.',
      content: (
        <>
          <SlideHead tag="تحقق سريع" kind="qs">كم تعني الإشارات؟</SlideHead>
          <div className="qgrid three">
            <Card kind="qs"><div style={{ fontSize: '2em', textAlign: 'center' }}><Tally n={6} /></div><MCQ options={['٥', '٦', '٧']} answer="٦" award /></Card>
            <Card kind="qs"><div style={{ fontSize: '2em', textAlign: 'center' }}><Tally n={10} /></div><MCQ options={['٨', '١٠', '٢']} answer="١٠" award /></Card>
            <Card kind="qs"><div style={{ fontSize: '2em', textAlign: 'center' }}><Tally n={4} /></div><MCQ options={['٤', '٥', '٣']} answer="٤" award /></Card>
          </div>
        </>
      ),
    },

    /* ================= أتأكد ١–٣ ================= */
    {
      sec: 'check', min: 2,
      notes: 'اسأل عشرة طلاب فعلًا، واضغط + في صف الفصل الذي يختاره كل طالب (من الشاشة أو الجوال). ثم يجيب الصف من جدوله. الجدول نفسه في السؤال ٢.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={60}
          intro="أَسْأَلُ عَشَرَةَ طُلَّابٍ عَنْ أَيِّ فُصُولِ السَّنَةِ الأَرْبَعَةِ هُوَ الْمُفَضَّلُ لَدَيْهِمْ، ثُمَّ أُسَجِّلُ الْبَيانَاتِ بِالإِشَارَاتِ؛ لأَسْتَعْمِلَهَا فِي الإِجَابَةِ عَنِ الأَسْئِلَةِ الآتِيَةِ:"
          question="مَا الْفَصْلُ الَّذِي يُفَضِّلُهُ أَكْثَرُ الطُّلَّابِ؟"
          hint="أبحث عن الصف الذي فيه أكثر الإشارات."
          steps={[]}
          chart={<Seasons />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'من جدول الصف: نجمع عدد الشتاء وعدد الخريف ونكتب الجملة العددية.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} time={60}
          question="مَا عَدَدُ الطُّلَّابِ الَّذِينَ يُفَضِّلُونَ فَصْلَيِ الشِّتَاءِ وَالْخَرِيفِ؟ أَكْتُبُ جُمْلَةً عَدَدِيَّةً لِحَلِّ هَذَا السُّؤَالِ."
          hint="أجمع عدد طلاب الشتاء وعدد طلاب الخريف."
          steps={[]}
          chart={<Seasons />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'أتحدث: اطلب من طالبين أن يشرحا.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} tps tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="كَيْفَ تُسَاعِدُنِي إِشَارَاتُ الْعَدِّ عَلَى تَنْظِيمِ الْبَيَانَاتِ؟"
          hint="فكّر: كيف تعدّ ١٠ إشارات بسرعة؟"
          steps={[
            { text: 'أُسجّلُ كلَّ إجابةٍ بإشارةٍ واحدةٍ، وأجمعُ كلَّ خمسِ إشاراتٍ معًا.' },
            { text: 'فيسهلُ عدُّ البياناتِ وترتيبُها ومقارنتُها بسرعةٍ.', kind: 'ans' },
          ]}
          chart={<Seasons />}
        />
      ),
    },

    /* ================= أتدرب ٤–٧ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'اسأل عشرة طلاب عن إفطارهم المفضل، واضغط + في الصف المناسب لكل إجابة. الجدول نفسه في الأسئلة ٤–٧.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={4} time={30}
          intro="أَسْأَلُ عَشَرَةَ طُلَّابٍ مَا وَجْبَةُ الإِفْطَارِ الْمُفَضَّلَةُ لَدَيْهِمْ؟ أَجْمَعُ الْبَيَانَاتِ حَوْلَ ذَلِكَ، ثُمَّ أَسْتَعْمِلُ الإِشَارَاتِ؛ لِأُسَجِّلَ تِلْكَ الْبَيَانَاتِ. أَسْتَعْمِلُ الْبَيَانَاتِ فِي الْجَدْوَلِ أَعْلَاهُ لِلإِجَابَةِ عَنِ الأَسْئِلَةِ الآتِيَةِ:"
          question="كَمْ طَالِبًا يُفَضِّلُ الحَلِيبَ وَ البَيْضَ؟"
          hint="أعدّ إشارات الصف الأول."
          steps={[]}
          chart={<Breakfast />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'من جدول الصف: إشارات الصف الثاني.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={5} time={30}
          question="كَمْ طَالِبًا يُفَضِّلُ الحَلِيبَ وَ الجُبْنَ؟"
          hint="أعدّ إشارات الصف الثاني."
          steps={[]}
          chart={<Breakfast />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'الأكثر = أكثر إشارات.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={6} time={30}
          question="مَا الإِفْطَارُ الأَكْثَرُ تَفْضِيلًا لَدَى الطُّلَّابِ؟"
          hint="أيّ صف فيه أكثر الإشارات؟"
          steps={[]}
          chart={<Breakfast />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'اسأل طالبًا عن إفطاره المفضل، واضغط + في صفه: الجدول يتغير أمام الطلاب.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={7} tps
          question="كَيْفَ يَتَغَيَّرُ الجَدْوَلُ إِذَا أُضِيفَ إِلَيْهِ إِفْطَارِي المُفَضَّلُ؟"
          hint="ماذا أفعل بإجابة جديدة؟"
          steps={[{ text: 'تُزادُ إشارةٌ واحدةٌ في صفِّ إفطاري المفضَّلِ.', kind: 'ans' }]}
          chart={<Breakfast />}
        />
      ),
    },

    /* ================= أحل المسألة ٨–٩ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'اعدد الإشارات في كل جدول وقارنها بالأعداد في المسألة: ٧ و٥ و٨.',
      content: (
        <QuestionSlide
          source={SOLVE} n={8} time={90} long
          question="اسْتِعْمَالُ الْبَيَانَاتِ: جُمِعَتْ بَيَانَاتُ طُلَّابِ الصَّفِّ الثَّانِي حَوْلَ النَّشَاطَاتِ التَّرْفِيهِيَّةِ الَّتِي يُفَضِّلُونَهَا وَسَتَقُومُ بِهَا المَدْرَسَةُ فِي يَوْمِ الخَمِيسِ، فَاخْتَارَ سَبْعَةُ طُلَّابٍ الذَّهَابَ فِي نُزْهَةٍ بَرِّيَّةٍ، وَاخْتَارَ خَمْسَةٌ مِنْهُمُ الذَّهَابَ إِلَى حَدِيقَةِ الحَيَوَانَاتِ، وَاخْتَارَ ثَمَانِيَةٌ الذَّهَابَ إِلَى المُتْحَفِ. أَيُّ الجَدْوَلَيْنِ يُبَيِّنُ ذَلِكَ؟ أُحَوِّطُ الْجَدْوَلَ الصَّحِيحَ."
          hint="أعدّ إشارات كل صف في الجدولين، وأقارن بـ ٧ و٥ و٨."
          steps={[
            { text: 'الجدول الأيمن: ٦ و٥ و٣ ✗' },
            { text: 'الجدول الأيسر: ٧ و٥ و٨ ✓', kind: 'ans' },
          ]}
          chart={
            <div className="row" style={{ gap: '.6em', alignItems: 'flex-start' }}>
              <TallyTable head="النَّشَاطُ" rows={TRIP_RIGHT} count={false} tone="blue" />
              <TallyTable head="النَّشَاطُ" rows={TRIP_LEFT} count={false} tone="blue" />
            </div>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'نجمع الأعداد الثلاثة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={9} time={60}
          question="مَا عَدَدُ الطُّلَّابِ الَّذِينَ اسْتَجَابُوا لِسُؤَالِ جَمْعِ البَيَانَاتِ؟"
          hint="أجمع الأعداد في الجدول الصحيح."
          steps={[
            { text: '٧ + ٥ + ٨' },
            { text: '٢٠ طالبًا', kind: 'ans' },
          ]}
          chart={<TallyTable head="النَّشَاطُ" rows={TRIP_LEFT} />}
        />
      ),
    },

    /* ================= الختام ================= */
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب إكمال كل فرع شفهيًا.',
      content: (
        <>
          <SlideHead tag="ملخص الدرس" kind="rule">خريطة ذهنية</SlideHead>
          <MindMap
            center={<>جدول<br />الإشارات</>}
            items={[
              { kind: 'rule', cap: 'أسأل', text: 'أكتب سؤالًا وأطرحه.' },
              { kind: 'ex', cap: 'أسجّل', text: 'إشارة لكل إجابة، والخامسة خط مائل.' },
              { kind: 'qs', cap: 'أعدّ', text: 'أعدّ الخمسات ثم الباقي.' },
              { kind: 'warn', cap: 'أقرأ', text: 'أكثر إشارات = الأكثر تفضيلًا.' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 2,
      notes: 'تذكرة الخروج.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">ثلاثة أسئلة</SlideHead>
          <Cols>
            <TallyTable head="اللَّوْنُ الْمُفَضَّلُ" rows={[['🔴 أحمر', 6], ['🔵 أزرق', 3], ['🟢 أخضر', 5]]} count={false} />
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="كم طالبًا يفضّل الأزرق؟" options={['٣', '٥', '٦']} answer="٣" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="ما اللون الأكثر تفضيلًا؟" options={['الأحمر', 'الأزرق', 'الأخضر']} answer="الأحمر" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="كم طالبًا أجاب عن السؤال؟" options={['١١', '١٤', '١٦']} answer="١٤" /></Card>
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
