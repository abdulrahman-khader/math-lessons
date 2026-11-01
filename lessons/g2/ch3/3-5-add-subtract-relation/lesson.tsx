import {
  BookLabel, BookSource, Card, Cols, CUBE, CubeBox, CubeTrain, Definition, Eq, ExitTicket, FactFamily, FactLine, FamilyCard, Goals, GoHomeButton,
  Grid, IfTeams, Intro, Lines, Mark, MCQ, MindMap, QCard, QCol, QText, QuestionSlide, SlideHead, Solution, Stack, Step, SumCard, TrainFactCard,
  Winner, defineLesson, type CubePart, type ItemShape,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- رسوم صغيرة خاصة بهذا الدرس ---------- */

interface Pic {
  parts: CubePart[];
  shape?: ItemShape;
  /** الجزء المأخوذ في الطرح الأول ثم الثاني (انظر CubeTrain) */
  take?: [number, number?];
  /** رقم الصف عندما تكون في الشريحة عدة صفوف */
  k?: number;
  joined?: boolean;
  size?: number;
  hide?: number[];
}

/** الصف في إطار، في عمود الرسم */
const Cubes = (p: Pic) => (
  <CubeBox>
    <CubeTrain {...p} />
  </CubeBox>
);

/** جزآن بالأخضر والأصفر */
const g = (a: number, b: number): CubePart[] => [
  { n: a, color: CUBE.green },
  { n: b, color: CUBE.yellow },
];

const CHECK = 'أتأكَّدُ، ص ٧٢';
const PRACTICE = 'أتدرَّبُ، ص ٧٣';
const SOLVE = 'أحُلُّ المسألةَ، ص ٧٣';
const FIND = 'أَجِدُ نَاتِجَ الطَّرْحِ مُسْتَعْمِلًا حَقَائِقَ الْجَمْعِ:';

/** سؤال رأسي من أتدرب ٦–١١: الجمع، ثم الطرح */
const VPair = ({ n, a, b, sub }: { n: number; a: number; b: number; sub: number }) => (
  <SumCard n={n} sums={[{ a, op: '+', b, v: a + b }, { a: a + b, op: '−', b: sub, v: a + b - sub }]} />
);
const SUGGESTED = 'إِجَابَةٌ مُقْتَرَحَةٌ';

export default defineLesson({
  meta: {
    id: 'g2-3-5-add-subtract-relation',
    design: 'v2',
    code: '٣-٥',
    title: 'الْعَلاقَةُ بَيْنَ الْجَمْعِ وَالطَّرْحِ',
    shortTitle: 'العلاقة بين الجمع والطرح',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثالث: طرائق الطرح',
    source: 'الجزء الأول، ص ٧٢–٧٣',
    minutes: 45,
    idea: 'أَطْرَحُ مُسْتَعْمِلًا حَقَائِقَ الْجَمْعِ.',
    bookQuestions: 17,
  },
  sectionDesc: {
    engage: 'مراجعة حقائق الجمع، لغز الملاعق',
    explore: 'مستكشف الحقائق المترابطة',
    explain: 'القاعدة، أستعد',
    elab: 'نعمل معًا، من واقع الحياة',
    check: 'الأسئلة ١–٥',
    practice: 'الأسئلة ٦–١٧',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردتين. اسأل: ماذا تعني كلمة «عكس»؟ (مثل: أفتح الباب وأغلقه، أصعد وأنزل).',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَطْرَحُ مُسْتَعْمِلًا حَقَائِقَ الْجَمْعِ.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>الْحَقَائِقُ الْمُتَرَابِطَةُ</Mark>، <Mark>الْعَكْسُ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals
                items={[
                  'أَكْتُبُ حَقَائِقَ الْجَمْعِ وَالطَّرْحِ الْمُتَرَابِطَةَ.',
                  'أَسْتَعْمِلُ حَقِيقَةَ جَمْعٍ لِأَجِدَ نَاتِجَ الطَّرْحِ.',
                  'أَتَحَقَّقُ مِنَ الْجَمْعِ بِالطَّرْحِ.',
                ]}
              />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة: مراجعة حقائق الجمع ================= */
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة سريعة من الفصل الثاني (طرائق الجمع). أدر العجلة لاختيار طالب، وامنح نجمة لفريقه عند الإجابة الصحيحة.',
      content: (
        <>
          <SlideHead tag="تذكّر، الفصل ٢" kind="ink">حقائق الجمع</SlideHead>
          <Cols even>
            <Card kind="qs">
              <CubeTrain parts={g(8, 5)} k={1} size={36} />
              <MCQ q="٨ + ٥ = ؟" options={['١٢', '١٣', '١٤']} answer="١٣" award />
            </Card>
            <Card kind="qs">
              <CubeTrain parts={g(9, 6)} k={2} size={36} />
              <MCQ q="٩ + ٦ = ؟" options={['١٤', '١٥', '١٦']} answer="١٥" award />
            </Card>
          </Cols>
          <Card kind="rule" cap="سؤال للتفكير">إِذَا كُنَّا نَحْفَظُ حَقَائِقَ الْجَمْعِ جَيِّدًا، هَلْ تُسَاعِدُنَا فِي <Mark>الطَّرْحِ</Mark>؟</Card>
        </>
      ),
    },

    /* ================= تهيئة: لغز الملاعق ================= */
    {
      sec: 'engage', min: 3,
      notes: 'اقرأ القصة. اسأل: كم ملعقة بقيت؟ دع الطلاب يجيبون دون عدّ إن استطاعوا. اضغط المسافة لإظهار الخطوات: الملاعق الصفراء تُؤخذ من الطاولة.',
      content: (
        <>
          <SlideHead tag="لغز" kind="qs">ملاعق المطبخ</SlideHead>
          <Cols>
            <QCol>
              <QText>رَتَّبَتْ هِنْدٌ عَلَى الطَّاوِلَةِ ٥ مَلَاعِقَ خَضْرَاءَ وَ٤ مَلَاعِقَ صَفْرَاءَ، فَصَارَ عَدَدُهَا ٩. ثُمَّ أَخَذَتْ أُمُّهَا الْمَلَاعِقَ الصَّفْرَاءَ. كَمْ مِلْعَقَةً بَقِيَتْ؟</QText>
              <Solution>
                <Step hl={['p0']}>نَتَذَكَّرُ: <Eq>٥ + ٤ = ٩</Eq></Step>
                <Step hl={['v0']}>أَخَذَتْ ٤، فَنَطْرَحُ: <Eq>٩ − ٤ = ٥</Eq></Step>
                <Step kind="ans" label="بَقِيَتْ">٥ مَلَاعِقَ</Step>
              </Solution>
            </QCol>
            <Cubes parts={g(5, 4)} shape="spoon" take={[1]} size={52} />
          </Cols>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا إلى السبورة يغيّر عدد المكعبات الخضراء والصفراء، ثم يضغط كل حقيقة. اسأل: ماذا تلاحظ على الأعداد في الحقائق الأربع؟ (الأعداد نفسها). ماذا يحدث للمكعبات عند الجمع؟ وعند الطرح؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">عائلة من الحقائق</SlideHead>
          <Intro>نُغَيِّرُ عَدَدَ الْمُكَعَّبَاتِ، ثُمَّ نَضْغَطُ كُلَّ جُمْلَةٍ وَنُرَاقِبُ الْمُكَعَّبَاتِ. مَاذَا نُلَاحِظُ عَلَى الْأَعْدَادِ؟</Intro>
          <FactFamily start={[5, 4]} />
          <Card kind="rule" cap="نُلَاحِظُ">الْجُمَلُ الْأَرْبَعُ تَسْتَعْمِلُ <Mark>الْأَعْدَادَ الثَّلَاثَةَ نَفْسَهَا</Mark>.</Card>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ القاعدتين من الكتاب. اطلب من الطلاب أن يكرروا معك: «الجمع عكس الطرح». أشر إلى الجزأين المضمومين.',
      content: (
        <>
          <SlideHead tag="القاعدة" kind="rule">الجمع والطرح متعاكسان</SlideHead>
          <Cols even>
            <Stack>
              <Definition kind="rule">
                عَمَلِيَّةُ الْجَمْعِ <Mark>عَكْسُ</Mark> عَمَلِيَّةِ الطَّرْحِ.
              </Definition>
              <Definition kind="rule">
                تَشْتَرِكُ <Mark>الْحَقَائِقُ الْمُتَرَابِطَةُ</Mark> فِي الْأَعْدَادِ نَفْسِهَا.
              </Definition>
            </Stack>
            <Card kind="ex" cap="حَقَائِقُ مُتَرَابِطَةٌ لِلْأَعْدَادِ ٥ وَ٤ وَ٩">
              <CubeTrain parts={g(5, 4)} joined size={40} />
              <Lines>
                <Eq>٥ + ٤ = ٩</Eq>
                <Eq>٤ + ٥ = ٩</Eq>
                <Eq>٩ − ٤ = ٥</Eq>
                <Eq>٩ − ٥ = ٤</Eq>
              </Lines>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= أستعد، مثال الكتاب ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: اقرأ كل جملة بصوت مسموع وأشر إلى المكعبات. «أضمّ ٥ و٤ فيصيران ٩. إذا أخذتُ ٤ يبقى ٥، وإذا أخذتُ ٥ يبقى ٤».',
      content: (
        <>
          <SlideHead tag="أستعد، ص ٧٢" kind="ex">أستعمل الجمع لأطرح</SlideHead>
          <Cols>
            <QCol>
              <QText>أَسْتَعْمِلُ حَقَائِقَ الْجَمْعِ لِأَجِدَ نَاتِجَ الطَّرْحِ. تَشْتَرِكُ الْحَقَائِقُ الْمُتَرَابِطَةُ فِي الْأَعْدَادِ نَفْسِهَا.</QText>
              <Lines>
                <FactLine a={5} op="+" b={4} v={9} hl={['p0']} />
                <FactLine a={9} op="−" b={4} v={5} hl={['v0']} />
                <FactLine a={9} op="−" b={5} v={4} hl={['x0']} />
              </Lines>
              <Solution>
                <Step kind="ans" label="نَتَعَلَّمُ">عَمَلِيَّةُ الْجَمْعِ عَكْسُ عَمَلِيَّةِ الطَّرْحِ.</Step>
              </Solution>
            </QCol>
            <Cubes parts={g(5, 4)} take={[1, 0]} />
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'بعد القاعدة والمثال: المقطع يؤكد الشرح بمثال غير مثال الكتاب. لا يبدأ إلا عندما تضغط تشغيل (أو من الجوال). أوقفه قبل كل نتيجة واسأل الطلاب عنها.',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 4,
      notes: 'نعمل معًا: اقرأ كل سؤال، واختر طالبًا بالعجلة. اطلب منه أن يقول حقيقة الجمع التي ساعدته قبل أن يختار. امنح النجمة لفريقه.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أي حقيقة تساعدني؟</SlideHead>
          <QCol>
            <MCQ q="أ) أَيُّ حَقِيقَةِ جَمْعٍ تُسَاعِدُنِي عَلَى إِيجَادِ ١٢ − ٥؟" options={['٥ + ٧ = ١٢', '٥ + ٥ = ١٠', '٦ + ٦ = ١٢']} answer="٥ + ٧ = ١٢" award />
            <MCQ q="ب) إِذَا كَانَ ٨ + ٦ = ١٤، فَمَا نَاتِجُ ١٤ − ٦؟" options={['٦', '٨', '٢٠']} answer="٨" award />
            <MCQ q="ج) أَيُّ جُمْلَةٍ لَا تَسْتَعْمِلُ الْأَعْدَادَ ٣ وَ٧ وَ١٠ نَفْسَهَا؟" options={['٣ + ٧ = ١٠', '١٠ − ٣ = ٧', '١٠ − ٤ = ٦']} answer="١٠ − ٤ = ٦" award />
          </QCol>
        </>
      ),
    },

    /* ================= من واقع الحياة ================= */
    {
      sec: 'elab', min: 2,
      notes: 'اسأل: أين نحتاج الطرح في حياتنا؟ (المقصف، المصروف، الألعاب). شجّع الطلاب على قول حقيقة الجمع بصوت عالٍ.',
      content: (
        <>
          <SlideHead tag="من واقع الحياة" kind="ex">عصير المقصف</SlideHead>
          <Cols>
            <QCol>
              <QText>فِي ثَلَّاجَةِ الْمَقْصَفِ ١٥ عُلْبَةَ عَصِيرٍ، بِيعَ مِنْهَا ٩ عُلَبٍ. كَمْ عُلْبَةً بَقِيَتْ؟</QText>
              <MCQ options={['٥', '٦', '٧']} answer="٦" award />
              <Solution>
                <Step>حَقِيقَةُ جَمْعٍ فِيهَا ٩ وَ١٥: <Eq>٩ + ٦ = ١٥</Eq></Step>
                <Step hl={['v0']}><Eq>١٥ − ٩ = ٦</Eq></Step>
                <Step kind="ans" label="بَقِيَتْ">٦ عُلَبٍ</Step>
              </Solution>
            </QCol>
            <Cubes parts={[{ n: 9, color: CUBE.orange }, { n: 6, color: CUBE.blue }]} shape="juice" joined take={[0]} hide={[1]} size={40} />
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٤، كما في ص ٧٢ ================= */
    {
      sec: 'check', min: 6,
      notes: 'كما في الكتاب ص ٧٢. «أنت تعمل»: أعطِ دقيقتين للحل على السبورات الصغيرة. مع ناتج الجمع تنضمّ المكعبات، ومع كل طرح يُؤخذ جزء منها. ذكّر الطلاب: ابدأ بجملة الجمع، ثم استعمل الأعداد نفسها.',
      content: (
        <>
          <BookSource>{CHECK}</BookSource>
          <QText>{FIND}</QText>
          <Grid cols={2}>
            <TrainFactCard n={1} k={1} take={[0, 1]} parts={[{ n: 6, color: CUBE.green }, { n: 7, color: CUBE.orange }]} />
            <TrainFactCard n={2} k={2} take={[1, 0]} parts={[{ n: 5, color: CUBE.yellow }, { n: 7, color: CUBE.blue }]} />
            <TrainFactCard n={3} k={3} take={[1, 0]} parts={[{ n: 9, color: CUBE.green }, { n: 6, color: CUBE.red }]} />
            <TrainFactCard n={4} k={4} take={[1, 0]} parts={[{ n: 7, color: CUBE.green }, { n: 4, color: CUBE.yellow }]} />
          </Grid>
        </>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: اطلب من طالبين أن يشرحا بكلماتهما، ثم اعرض الخطوات. ركّز على كلمتي «عكس» و«الأعداد نفسها».',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="ما الْعَلاقَةُ بَيْنَ عَمَلِيَّتَيِ الْجَمْعِ وَالطَّرْحِ؟"
          hint="مَاذَا يَفْعَلُ الْجَمْعُ بِالْجُزْأَيْنِ؟ وَمَاذَا يَفْعَلُ الطَّرْحُ؟"
          steps={[
            { text: <>الْجَمْعُ يَضُمُّ الْجُزْأَيْنِ: <Eq>٥ + ٤ = ٩</Eq></>, hl: ['p0'] },
            { text: <>وَالطَّرْحُ يَأْخُذُ جُزْءًا: <Eq>٩ − ٤ = ٥</Eq></>, hl: ['v0'] },
            { text: 'الْجَمْعُ عَكْسُ الطَّرْحِ، وَيَسْتَعْمِلَانِ الْأَعْدَادَ نَفْسَهَا.', kind: 'ans', label: SUGGESTED },
          ]}
          chart={<Cubes parts={g(5, 4)} take={[1, 0]} />}
        />
      ),
    },

    /* ================= أتدرب ٦–١١ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'الأسئلة الرأسية: اطلب من الطلاب حل الجمع أولًا ثم الطرح على السبورات الصغيرة. كل ضغطة على السهم تكشف ناتجًا واحدًا. تلميح للطلاب: ناتج الطرح هو العدد الآخر في جملة الجمع.',
      content: (
        <>
          <BookSource>{PRACTICE}</BookSource>
          <QText>{FIND}</QText>
          <Grid cols={3}>
            <VPair n={6} a={8} b={9} sub={8} />
            <VPair n={7} a={9} b={6} sub={9} />
            <VPair n={8} a={9} b={5} sub={5} />
            <VPair n={9} a={7} b={6} sub={6} />
            <VPair n={10} a={8} b={4} sub={8} />
            <VPair n={11} a={8} b={7} sub={7} />
          </Grid>
        </>
      ),
    },

    /* ================= أتدرب ١٢–١٥ ================= */
    {
      sec: 'practice', min: 3,
      notes: 'كل سؤال ثلاث جمل مترابطة. اسأل قبل الكشف: أي جملة أبدأ بها؟ (الجمع).',
      content: (
        <>
          <BookSource>{PRACTICE}</BookSource>
          <Cols>
            <QText>{FIND}</QText>
            <Card kind="rule" cap="أَتَذَكَّرُ">أَسْتَعْمِلُ الْأَعْدَادَ نَفْسَهَا فِي الْحَقَائِقِ الْمُتَرَابِطَةِ.</Card>
          </Cols>
          <Grid cols={2}>
            <FamilyCard n={12} a={7} b={9} />
            <FamilyCard n={13} a={5} b={6} />
            <FamilyCard n={14} a={6} b={8} />
            <FamilyCard n={15} a={8} b={5} />
          </Grid>
        </>
      ),
    },

    /* ================= أحل المسألة ١٦–١٧ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'الحس العددي: كل الجمل صحيحة حسابيًا، لكن واحدة فقط تستعمل الأعداد نفسها. اسأل: لماذا لا تصلح ١٠ − ٤ = ٦؟',
      content: (
        <>
          <BookSource>{SOLVE}</BookSource>
          <QText>
            <BookLabel>الْحِسُّ الْعَدَدِيُّ:</BookLabel> أُحَوِّطُ جُمْلَةَ الطَّرْحِ الَّتِي أَسْتَعْمِلُهَا لِلتَّحَقُّقِ مِنْ عَمَلِيَّةِ الْجَمْعِ:
          </QText>
          <Grid cols={2}>
            <QCard n={16}>
              <MCQ q="٩ + ٤ = ١٣" options={['١٣ − ١ = ١٢', '١٣ − ٤ = ٩', '١٠ − ٤ = ٦']} answer="١٣ − ٤ = ٩" award />
            </QCard>
            <QCard n={17}>
              <MCQ q="٧ + ٥ = ١٢" options={['١٢ − ٤ = ٨', '١٢ − ١ = ١١', '١٢ − ٥ = ٧']} answer="١٢ − ٥ = ٧" award />
            </QCard>
          </Grid>
        </>
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
            center={<>الْعَلَاقَةُ بَيْنَ<br />الْجَمْعِ وَالطَّرْحِ</>}
            items={[
              { kind: 'rule', cap: 'الْقَاعِدَةُ', text: 'عَمَلِيَّةُ الْجَمْعِ عَكْسُ عَمَلِيَّةِ الطَّرْحِ.' },
              { kind: 'ex', cap: 'الْحَقَائِقُ الْمُتَرَابِطَةُ', text: 'تَسْتَعْمِلُ الْأَعْدَادَ نَفْسَهَا: ٥ + ٤ = ٩، ٩ − ٤ = ٥' },
              { kind: 'qs', cap: 'كَيْفَ أَطْرَحُ؟', text: 'أَبْحَثُ عَنْ حَقِيقَةِ جَمْعٍ فِيهَا الْعَدَدَانِ.' },
              { kind: 'warn', cap: 'كَيْفَ أَتَحَقَّقُ؟', text: 'أَتَحَقَّقُ مِنَ الْجَمْعِ بِالطَّرْحِ.' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 3,
      notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة. من يخطئ في السؤال الأول يحتاج دعمًا بالمكعبات.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">أطرح بالجمع</SlideHead>
          <Cols>
            <Cubes parts={g(4, 5)} joined />
            <ExitTicket>
              <MCQ q="٤ + ٥ = ٩، إِذَنْ ٩ − ٥ = ؟" options={['٤', '٥', '٩']} answer="٤" />
              <MCQ q="أَيُّ حَقِيقَةِ جَمْعٍ تُسَاعِدُنِي عَلَى إِيجَادِ ١٥ − ٨؟" options={['٨ + ٧ = ١٥', '٨ + ٨ = ١٦', '٧ + ٧ = ١٤']} answer="٨ + ٧ = ١٥" />
              <MCQ q="١١ − ؟ = ٣" options={['٧', '٨', '١٤']} answer="٨" />
            </ExitTicket>
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
