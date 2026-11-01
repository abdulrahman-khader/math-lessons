import {
  BookLabel, BookSource, Card, Cols, CubeBox, Definition, Domino, DominoCard, DominoLinesCard, ExitTicket, Goals, GoHomeButton, Grid, IfTeams,
  Intro, Mark, MCQ, MindMap, MissingExplorer, QCol, QText, QuestionSlide, Sentence, SentenceCard, SlideHead, Solution, Stack, Step, SumCard,
  Winner, defineLesson, type Token,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ، ص ٧٤';
const PRACTICE = 'أتدرَّبُ، ص ٧٤–٧٥';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ٧٥';
const FIND_DOTS = 'أَجِدُ الْعَدَدَ الْمَفْقُودَ فِي جُمْلَةِ الْجَمْعِ مُسْتَعِينًا بِرَسْمِ النِّقَاطِ:';
const FIND = 'أَجِدُ الْعَدَدَ الْمَفْقُودَ فِي جُمْلَةِ الْجَمْعِ:';

/** سؤال من أتدرب بجملتين */
const Two = (n: number, a: Token[], b: Token[]) => <SentenceCard key={n} n={n} lines={[a, b]} />;
const SUGGESTED = 'إِجَابَةٌ مُقْتَرَحَةٌ';

export default defineLesson({
  meta: {
    id: 'g2-3-6-missing-numbers',
    design: 'v2',
    code: '٣-٦',
    title: 'الأَعْدَادُ الْمَفْقُودَةُ',
    shortTitle: 'الأعداد المفقودة',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثالث: طرائق الطرح',
    source: 'الجزء الأول، ص ٧٤–٧٥',
    minutes: 45,
    idea: 'أَجِدُ عَدَدًا مَفْقُودًا فِي جُمْلَةِ جَمْعٍ مُسْتَعْمِلًا حَقَائِقَ الطَّرْحِ الْمُرْتَبِطَةَ بِهَا.',
    bookQuestions: 15,
  },
  sectionDesc: {
    engage: 'مراجعة الحقائق المترابطة',
    explore: 'الدومينو المخفي',
    explain: 'القاعدة، أستعد',
    elab: 'نعمل معًا، من واقع الحياة',
    check: 'الأسئلة ١–٥',
    practice: 'الأسئلة ٦–١٤',
    hot: 'السؤال ١٥',
    close: 'ملخص، تذكرة الخروج',
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
              <Goals
                items={[
                  'أَجِدُ الْعَدَدَ الْمَفْقُودَ فِي جُمْلَةِ جَمْعٍ.',
                  'أَسْتَعْمِلُ حَقِيقَةَ الطَّرْحِ الْمُرْتَبِطَةَ.',
                  'أَتَحَقَّقُ مِنْ إِجَابَتِي بِالْجَمْعِ.',
                ]}
              />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 3,
      notes: 'ربط بالدرس ٣-٥ (العلاقة بين الجمع والطرح). اختر طالبًا بالعجلة لكل سؤال.',
      content: (
        <>
          <SlideHead tag="تذكّر، الدرس ٣-٥" kind="ink">الجمع عكس الطرح</SlideHead>
          <Cols even>
            <Card kind="qs">
              <MCQ q="٦ + ٧ = ١٣، إِذَنْ ١٣ − ٦ = ؟" options={['٦', '٧', '١٩']} answer="٧" award />
            </Card>
            <Card kind="qs">
              <MCQ q="أَيُّ جُمْلَةِ طَرْحٍ مُرْتَبِطَةٌ بِـ ٨ + ٤ = ١٢؟" options={['١٢ − ٤ = ٨', '٨ − ٤ = ٤', '١٢ + ٤ = ١٦']} answer="١٢ − ٤ = ٨" award />
            </Card>
          </Cols>
          <Card kind="rule" cap="لُغْزٌ">فِي قِطْعَةِ الدُّومِينُو ٩ نِقَاطٍ ظَاهِرَةٍ، وَالنِّصْفُ الْآخَرُ مَخْفِيٌّ. مَجْمُوعُ النِّقَاطِ ١٥. كَمْ نُقْطَةً مَخْفِيَّةً؟</Card>
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
          <Intro>نَخْتَارُ الْمَجْمُوعَ وَعَدَدَ النِّقَاطِ الظَّاهِرَةِ، وَنُخَمِّنُ كَمْ نُقْطَةً فِي النِّصْفِ الْمَخْفِيِّ، ثُمَّ نُظْهِرُهُ.</Intro>
          <MissingExplorer />
          <Card kind="rule" cap="نُلَاحِظُ">الْعَدَدُ الْمَفْقُودُ = الْمَجْمُوعُ − الْعَدَدُ الْمَعْرُوفُ.</Card>
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
          <Definition kind="rule">
            أَجِدُ <Mark>الْعَدَدَ الْمَفْقُودَ</Mark> فِي جُمْلَةِ الْجَمْعِ مُسْتَعْمِلًا حَقِيقَةَ الطَّرْحِ الْمُرْتَبِطَةَ بِهَا.
          </Definition>
          <Cols even>
            <Card kind="ex" cap="جُمْلَةُ الْجَمْعِ">
              <Sentence t={[9, '+', { box: true, b: 6 }, '=', 15]} big />
            </Card>
            <Card kind="ex" cap="حَقِيقَةُ الطَّرْحِ الْمُرْتَبِطَةُ">
              <Sentence t={[15, '−', 9, '=', 6]} big />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= أستعد، مثال الكتاب ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: «العدد ٩ هو أحد العددين المضافين، لكن العدد الآخر مفقود. أفكّر: ١٥ − ٩ = ٦».',
      content: (
        <>
          <SlideHead tag="أستعد، ص ٧٤" kind="ex">العدد المفقود</SlideHead>
          <Cols>
            <QCol>
              <QText>أَجِدُ الْعَدَدَ الْمَفْقُودَ فِي جُمْلَةِ الْجَمْعِ مُسْتَعْمِلًا حَقِيقَةَ الطَّرْحِ الْمُرْتَبِطَةَ بِهَا.</QText>
              <Sentence t={[9, '+', { box: true, b: 6, hl: ['p0'] }, '=', 15]} big />
              <Solution>
                <Step>نَعْرِفُ ٩، وَالْعَدَدُ الْآخَرُ مَفْقُودٌ.</Step>
                <Step>
                  نُفَكِّرُ: <Sentence t={[15, '−', 9, '=', 6]} />
                </Step>
                <Step kind="ans" label="الْعَدَدُ الْمَفْقُودُ">٦</Step>
              </Solution>
            </QCol>
            <CubeBox>
              <Domino known={9} missing={6} />
            </CubeBox>
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
      notes: 'نعمل معًا: اختر طالبًا بالعجلة، واطلب منه قول حقيقة الطرح قبل الاختيار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">ما العدد المفقود؟</SlideHead>
          <QCol>
            <MCQ q="أ) ٧ + □ = ١٢. أَيُّ حَقِيقَةٍ تُسَاعِدُنِي؟" options={['١٢ − ٧ = ٥', '١٢ + ٧ = ١٩', '٧ − ٥ = ٢']} answer="١٢ − ٧ = ٥" award />
            <MCQ q="ب) □ + ٨ = ١٧. مَا الْعَدَدُ الْمَفْقُودُ؟" options={['٧', '٩', '٢٥']} answer="٩" award />
            <MCQ q="ج) ٦ + □ = ٦. مَا الْعَدَدُ الْمَفْقُودُ؟" options={['٠', '١', '٦']} answer="٠" award />
          </QCol>
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
              <QText>فِي سَلَّةِ الْمَلْعَبِ ١٤ كُرَةً، مِنْهَا ٨ كُرَاتٍ حَمْرَاءُ وَالْبَاقِي زَرْقَاءُ. كَمْ كُرَةً زَرْقَاءَ؟</QText>
              <MCQ options={['٥', '٦', '٢٢']} answer="٦" award />
              <Solution>
                <Step hl={['p0']}>
                  <Sentence t={[14, '−', 8, '=', 6]} />
                </Step>
                <Step kind="ans" label="الْكُرَاتُ الزَّرْقَاءُ">٦ كُرَاتٍ</Step>
              </Solution>
            </QCol>
            <CubeBox>
              <Domino known={8} missing={6} />
            </CubeBox>
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
          <BookSource>{CHECK}</BookSource>
          <QText>{FIND_DOTS}</QText>
          <Grid cols={2}>
            <DominoCard n={1} known={8} total={14} />
            <DominoCard n={2} known={5} total={11} />
            <DominoCard n={3} known={4} total={8} />
            <DominoCard n={4} known={7} total={15} />
          </Grid>
        </>
      ),
    },

    /* ================= أتأكد ٥، أتحدث ================= */
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: اطلب من طالبين أن يشرحا، ثم اعرض الخطوات.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="كَيْفَ أَجِدُ الْعَدَدَ الْمَفْقُودَ فِي جُمْلَةِ الْجَمْعِ ٥ + □ = ١٣؟"
          hint="أَيُّ حَقِيقَةِ طَرْحٍ مُرْتَبِطَةٌ بِهَذِهِ الْجُمْلَةِ؟"
          steps={[
            { text: 'نَعْرِفُ الْمَجْمُوعَ ١٣، وَأَحَدَ الْعَدَدَيْنِ ٥.' },
            { text: <Sentence t={[13, '−', 5, '=', 8]} />, hl: ['p0'] },
            { text: 'نَطْرَحُ الْمَعْرُوفَ مِنَ الْمَجْمُوعِ، فَنَجِدُ ٨.', kind: 'ans', label: SUGGESTED },
          ]}
          chart={
            <CubeBox>
              <Domino known={5} missing={8} />
            </CubeBox>
          }
        />
      ),
    },

    /* ================= أتدرب ٦–١٠، كما في ص ٧٤–٧٥ ================= */
    {
      sec: 'practice', min: 5,
      notes: 'كما في الكتاب: في كل سؤال جملة طرح ثم جملة جمع مرتبطة. ناتج الطرح هو العدد المفقود في الجمع.',
      content: (
        <>
          <BookSource>{PRACTICE}</BookSource>
          <Cols>
            <QText>{FIND}</QText>
            <Card kind="rule" cap="أَتَذَكَّرُ">
              ١٤ − ٩ = ٥ وَ ٩ + ٥ = ١٤ حَقِيقَتَانِ مُتَرَابِطَتَانِ.
            </Card>
          </Cols>
          <Grid cols={3}>
            <DominoLinesCard n={6} known={9} missing={5} lines={[[14, '−', 9, '=', { box: true, b: 5, hl: ['p6'] }], [9, '+', { box: true, b: 5 }, '=', 14]]} />
            {Two(7, [12, '−', 6, '=', { box: true, b: 6 }], [{ box: true, b: 6 }, '+', 6, '=', 12])}
            {Two(8, [8, '−', 7, '=', { box: true, b: 1 }], [7, '+', { box: true, b: 1 }, '=', 8])}
            {Two(9, [12, '−', 9, '=', { box: true, b: 3 }], [9, '+', { box: true, b: 3 }, '=', 12])}
            {Two(10, [7, '−', 2, '=', { box: true, b: 5 }], [2, '+', { box: true, b: 5 }, '=', 7])}
          </Grid>
        </>
      ),
    },

    /* ================= أتدرب ١١–١٤، كما في ص ٧٥ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'انتبه في ١٢: المربعان مختلفان (٧ ثم ١٤). وفي ١٣ و١٤ المربع في وسط الجمع والطرح الرأسي.',
      content: (
        <>
          <BookSource>{PRACTICE}</BookSource>
          <QText>{FIND}</QText>
          <Grid cols={2}>
            {Two(11, [15, '−', { box: true, b: 8 }, '=', 7], [7, '+', { box: true, b: 8 }, '=', 15])}
            {Two(12, [7, '+', { box: true, b: 7 }, '=', 14], [{ box: true, b: 14 }, '−', 7, '=', 7])}
            <SumCard n={13} sums={[{ a: 9, op: '+', b: 9, v: 18, missing: 'b' }, { a: 18, op: '−', b: 9, v: 9, missing: 'b' }]} />
            <SumCard n={14} sums={[{ a: 6, op: '+', b: 7, v: 13, missing: 'b' }, { a: 13, op: '−', b: 7, v: 6, missing: 'b' }]} />
          </Grid>
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
              <BookLabel>الجَبْرُ:</BookLabel> فِي الْحَدِيقَةِ ١١ طِفْلًا. إِذَا كَانَ ٥ مِنْهُمْ يَرْتَدُونَ قُمْصَانًا زَرْقَاءَ، وَ ٤ مِنْهُمْ يَرْتَدُونَ قُمْصَانًا بَيْضَاءَ، وَالْبَاقُونَ يَرْتَدُونَ قُمْصَانًا خَضْرَاءَ، فَكَمْ طِفْلًا يَرْتَدِي قَمِيصًا أَخْضَرَ؟
            </>
          }
          long
          hint="كَمْ طِفْلًا نَعْرِفُ لَوْنَ قَمِيصِهِ؟"
          steps={[
            { text: <>نَجْمَعُ الْمَعْرُوفِينَ: <Sentence t={[5, '+', 4, '=', 9]} /></> },
            { text: <Sentence t={[11, '−', 9, '=', 2]} /> },
            { text: 'طِفْلَانِ', kind: 'ans', label: 'يَرْتَدِيَانِ قَمِيصًا أَخْضَرَ' },
          ]}
          chart={
            <CubeBox>
              <Sentence t={[5, '+', 4, '+', { box: true, b: 2 }, '=', 11]} big />
            </CubeBox>
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
          <SlideHead tag="أهمّ الأفكار" kind="rule">ملخص الدرس</SlideHead>
          <MindMap
            center={<>الْأَعْدَادُ<br />الْمَفْقُودَةُ</>}
            items={[
              { kind: 'rule', cap: 'أَعْرِفُ', text: 'الْمَجْمُوعَ وَأَحَدَ الْعَدَدَيْنِ.' },
              { kind: 'ex', cap: 'أَطْرَحُ', text: 'الْمَجْمُوعُ − الْمَعْرُوفُ = الْمَفْقُودُ.' },
              { kind: 'qs', cap: 'مِثَالٌ', text: '٩ + □ = ١٥، إِذَنْ ١٥ − ٩ = ٦' },
              { kind: 'warn', cap: 'أَتَحَقَّقُ', text: 'أَجْمَعُ: ٩ + ٦ = ١٥' },
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
          <ExitTicket>
            <MCQ q="٤ + □ = ٩" options={['٤', '٥', '١٣']} answer="٥" />
            <MCQ q="□ + ٧ = ١٦" options={['٧', '٩', '٢٣']} answer="٩" />
            <MCQ q="٣ + ٥ + □ = ١٢" options={['٤', '٥', '٨']} answer="٤" />
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
