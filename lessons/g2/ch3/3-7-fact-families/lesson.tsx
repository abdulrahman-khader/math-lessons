import {
  BookLabel, BookSource, Card, Cols, CUBE, CubeBox, CubeTrain, Definition, ExitTicket, FactFamily, FactGrid, FactTriangle, Goals, GoHomeButton,
  Grid, IfTeams, Intro, Mark, MCQ, MindMap, QCol, QText, QuestionSlide, Sentence, SlideHead, Solution, Stack, Step, TriangleCard, TriFamilyCard,
  Winner, defineLesson,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ، ص ٧٦';
const PRACTICE = 'أتدرَّبُ، ص ٧٧';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ٧٧';
const COMPLETE = 'أَسْتَعْمِلُ الْمُكَعَّبَاتِ، وأُكْمِلُ الْحَقَائِقَ الْمُتَرَابِطَةَ:';

/** ألوان المثلثات كما في الكتاب */
const TRI = {
  green: ['#86d39a', '#1f9a45'],
  red: ['#f7a9a0', '#d7302a'],
  violet: ['#e6b8dd', '#8e44ad'],
  blue: ['#a9cbee', '#1d6fc4'],
  orange: ['#ffc77d', '#f28a1d'],
} as const;

const FullFamily = TriFamilyCard;
const SUGGESTED = 'إِجَابَةٌ مُقْتَرَحَةٌ';

export default defineLesson({
  meta: {
    id: 'g2-3-7-fact-families',
    design: 'v2',
    code: '٣-٧',
    title: 'الْحَقَائِقُ الْمُتَرَابِطَةُ',
    shortTitle: 'الحقائق المترابطة',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثالث: طرائق الطرح',
    source: 'الجزء الأول، ص ٧٦–٧٧',
    minutes: 45,
    idea: 'أُكَوِّنُ مَجْمُوعَةَ الْحَقَائِقِ الْمُتَرَابِطَةِ.',
    bookQuestions: 9,
  },
  sectionDesc: {
    engage: 'مراجعة الجمع والطرح',
    explore: 'مستكشف الحقائق المترابطة',
    explain: 'القاعدة، أستعد',
    elab: 'نعمل معًا، من واقع الحياة',
    check: 'الأسئلة ١–٤',
    practice: 'الأسئلة ٥–٨',
    hot: 'السؤال ٩',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردة. اسأل: ماذا تعني «مجموعة»؟ وما «الحقائق المترابطة» التي تعلمناها؟',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أُكَوِّنُ مَجْمُوعَةَ الْحَقَائِقِ الْمُتَرَابِطَةِ.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>مَجْمُوعَةُ الْحَقَائِقِ الْمُتَرَابِطَةِ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals
                items={[
                  'أَقْرَأُ مُثَلَّثَ الْحَقَائِقِ.',
                  'أَكْتُبُ الْحَقَائِقَ الْأَرْبَعَ مِنْ ثَلَاثَةِ أَعْدَادٍ.',
                  'أَعْرِفُ مَتَى تَكُونُ الْحَقَائِقُ اثْنَتَيْنِ فَقَطْ.',
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
      notes: 'ربط بالدرس ٣-٥. اختر طالبًا بالعجلة لكل سؤال.',
      content: (
        <>
          <SlideHead tag="تذكّر، الدرس ٣-٥" kind="ink">الجمع والطرح متعاكسان</SlideHead>
          <Cols even>
            <Card kind="qs">
              <MCQ q="٧ + ٣ = ١٠، إِذَنْ ١٠ − ٣ = ؟" options={['٣', '٧', '١٣']} answer="٧" award />
            </Card>
            <Card kind="qs">
              <MCQ q="أَيُّ جُمْلَةٍ تَسْتَعْمِلُ الْأَعْدَادَ ٤ وَ٥ وَ٩؟" options={['٩ − ٤ = ٥', '٩ − ٣ = ٦', '٥ − ٤ = ١']} answer="٩ − ٤ = ٥" award />
            </Card>
          </Cols>
          <Card kind="rule" cap="سؤال للتفكير">
            مِنَ الْأَعْدَادِ <Mark>٣ وَ٧ وَ١٠</Mark> كَمْ جُمْلَةَ جَمْعٍ وَطَرْحٍ نَسْتَطِيعُ أَنْ نَكْتُبَ؟
          </Card>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا يغيّر عدد المكعبات ثم يضغط كل حقيقة. اسأل: كم حقيقة كتبنا؟ ماذا يحدث إذا تساوى العددان؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">مجموعة من أربع حقائق</SlideHead>
          <Intro>نُغَيِّرُ عَدَدَ الْمُكَعَّبَاتِ، ثُمَّ نَضْغَطُ كُلَّ جُمْلَةٍ. مَاذَا يَحْدُثُ إِذَا تَسَاوَى الْعَدَدَانِ؟</Intro>
          <FactFamily start={[7, 3]} />
          <Card kind="rule" cap="نُلَاحِظُ">ثَلَاثَةُ أَعْدَادٍ تُعْطِي أَرْبَعَ حَقَائِقَ، وَإِذَا تَسَاوَى الْجُزْآنِ تَصِيرُ حَقِيقَتَيْنِ.</Card>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ التعريف. أشر إلى المثلث: المجموع في الأعلى، والجزآن في الأسفل.',
      content: (
        <>
          <SlideHead tag="القاعدة" kind="rule">مجموعة الحقائق المترابطة</SlideHead>
          <Cols>
            <Stack>
              <Definition kind="rule">
                <Mark>مَجْمُوعَةُ الْحَقَائِقِ الْمُتَرَابِطَةِ</Mark> هِيَ مَجْمُوعَةُ الْحَقَائِقِ الَّتِي تَرْبِطُ بَيْنَ ثَلاثَةِ أَعْدَادٍ.
              </Definition>
              <Card kind="ex" cap="أَتَذَكَّرُ">تَشْتَرِكُ الْحَقَائِقُ الْمُتَرَابِطَةُ بِالأَعْدَادِ الثَّلاثَةِ نَفْسِهَا.</Card>
            </Stack>
            <Card kind="ex" cap="مُثَلَّثُ الْحَقَائِقِ">
              <FactTriangle top={10} left={3} right={7} color={TRI.blue[0]} edge={TRI.blue[1]} />
              الْمَجْمُوعُ فِي الْأَعْلَى، وَالْجُزْآنِ فِي الْأَسْفَلِ.
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= أستعد، مثال الكتاب ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: «أستفيد من حقائق الجمع والطرح لأكوّن الحقائق المترابطة». أشر إلى كل جملة وهي تظهر.',
      content: (
        <>
          <SlideHead tag="أستعد، ص ٧٦" kind="ex">الأعداد ٣ و٧ و١٠</SlideHead>
          <Cols>
            <QCol>
              <QText>أَسْتَفِيدُ مِنْ حَقَائِقِ الْجَمْعِ وَالطَّرْحِ لِأُكَوِّنَ الْحَقَائِقَ الْمُتَرَابِطَةَ.</QText>
              <FactGrid
                lines={[
                  [7, '+', 3, '=', { b: 10 }],
                  [10, '−', 3, '=', { b: 7 }],
                  [3, '+', 7, '=', { b: 10 }],
                  [10, '−', 7, '=', { b: 3 }],
                ]}
              />
              <Solution>
                <Step kind="ans" label="عَدَدُ الْحَقَائِقِ">٤ حَقَائِقَ</Step>
              </Solution>
            </QCol>
            <Stack>
              <CubeBox>
                <CubeTrain parts={[{ n: 7, color: CUBE.green }, { n: 3, color: CUBE.orange }]} joined size={40} />
              </CubeBox>
              <FactTriangle top={10} left={3} right={7} color={TRI.blue[0]} edge={TRI.blue[1]} />
            </Stack>
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
      notes: 'نعمل معًا: اختر طالبًا بالعجلة. في السؤال ج ذكّر: الحقائق المترابطة لها الأعداد الثلاثة نفسها.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">من المجموعة؟</SlideHead>
          <Cols>
            <QCol>
              <MCQ q="أ) أَيُّ حَقِيقَةٍ مِنْ مَجْمُوعَةِ الْمُثَلَّثِ؟" options={['١٢ − ٥ = ٧', '١٢ − ٤ = ٨', '٧ − ٥ = ٢']} answer="١٢ − ٥ = ٧" award />
              <MCQ q="ب) ٥ + ٧ = ١٢. مَا الْحَقِيقَةُ الْأُخْرَى لِلْجَمْعِ؟" options={['٧ + ٥ = ١٢', '١٢ + ٥ = ١٧', '٥ + ٥ = ١٠']} answer="٧ + ٥ = ١٢" award />
              <MCQ q="ج) كَمْ حَقِيقَةً فِي مَجْمُوعَةِ الأَعْدَادِ ٥ وَ ٧ وَ ١٢؟" options={['٢', '٣', '٤']} answer="٤" award />
            </QCol>
            <FactTriangle top={12} left={5} right={7} color={TRI.green[0]} edge={TRI.green[1]} />
          </Cols>
        </>
      ),
    },

    /* ================= من واقع الحياة ================= */
    {
      sec: 'elab', min: 2,
      notes: 'اقرأ القصة. اطلب من الطلاب كتابة أربع جمل بالأعداد ٦ و٨ و١٤.',
      content: (
        <>
          <SlideHead tag="من واقع الحياة" kind="ex">أقلام الحقيبة</SlideHead>
          <Cols>
            <QCol>
              <QText>فِي حَقِيبَةِ يُوسُفَ ٦ أَقْلَامٍ زَرْقَاءَ وَ ٨ أَقْلَامٍ حَمْرَاءَ، فَيَكُونُ عِنْدَهُ ١٤ قَلَمًا. أَكْتُبُ الْحَقَائِقَ الْمُتَرَابِطَةَ.</QText>
              <Solution>
                <Step>
                  <Sentence t={[6, '+', 8, '=', 14]} />
                </Step>
                <Step>
                  <Sentence t={[8, '+', 6, '=', 14]} />
                </Step>
                <Step>
                  <Sentence t={[14, '−', 6, '=', 8]} />
                </Step>
                <Step>
                  <Sentence t={[14, '−', 8, '=', 6]} />
                </Step>
              </Solution>
            </QCol>
            <FactTriangle top={14} left={6} right={8} color={TRI.orange[0]} edge={TRI.orange[1]} />
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٣ ================= */
    {
      sec: 'check', min: 5,
      notes: 'في ٢ السطران الأخيران فارغان: يكتب الطلاب الحقيقتين الناقصتين. في ٣ حقيقتان فقط (لماذا؟ يُسأل في ٤).',
      content: (
        <>
          <BookSource>{CHECK}</BookSource>
          <QText>{COMPLETE}</QText>
          <Grid cols={1}>
            <TriangleCard n={1} top={16} left={7} right={9} color={TRI.green}
              lines={[[7, '+', 9, '=', { b: 16 }], [16, '−', 9, '=', { b: 7 }], [9, '+', 7, '=', { b: 16 }], [16, '−', 7, '=', { b: 9 }]]} />
            <TriangleCard n={2} top={17} left={8} right={9} color={TRI.red}
              lines={[[9, '+', 8, '=', { b: 17 }], [17, '−', 9, '=', { b: 8 }], [{ b: 8 }, '+', { b: 9 }, '=', { b: 17 }], [{ b: 17 }, '−', { b: 8 }, '=', { b: 9 }]]} />
            <TriangleCard n={3} top={18} left={9} right={9} color={TRI.violet} lines={[[9, '+', 9, '=', { b: 18 }], [18, '−', 9, '=', { b: 9 }]]} />
          </Grid>
        </>
      ),
    },

    /* ================= أتأكد ٤، أتحدث ================= */
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: اطلب من الطلاب أن يحاولوا كتابة حقيقة ثالثة للأعداد ٩ و٩ و١٨. ماذا يلاحظون؟',
      content: (
        <QuestionSlide
          source={CHECK} n={4} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="لِمَاذَا اقْتَصَرَتِ الإِجَابَةُ فِي السُّؤَالِ ٣ عَلَى حَقِيقَتَيْنِ فَقَطْ؟"
          hint="هَلِ الْعَدَدَانِ فِي أَسْفَلِ الْمُثَلَّثِ مُخْتَلِفَانِ؟"
          steps={[
            { text: 'الْعَدَدَانِ فِي الْأَسْفَلِ مُتَسَاوِيَانِ: ٩ وَ٩' },
            { text: 'إِذَا بَدَّلْنَا تَرْتِيبَهُمَا نَحْصُلُ عَلَى الْجُمْلَةِ نَفْسِهَا.' },
            { text: 'لِأَنَّ الْجُزْأَيْنِ مُتَسَاوِيَانِ.', kind: 'ans', label: SUGGESTED },
          ]}
          chart={<FactTriangle top={18} left={9} right={9} color={TRI.violet[0]} edge={TRI.violet[1]} />}
        />
      ),
    },

    /* ================= أتدرب ٥–٦ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'السطور فارغة كلها: يكتب الطلاب الحقائق الأربع. اكشف الأعداد واحدًا واحدًا.',
      content: (
        <>
          <BookSource>{PRACTICE}</BookSource>
          <Cols>
            <QText>{COMPLETE}</QText>
            <Card kind="rule" cap="أَتَذَكَّرُ">
              تَشْتَرِكُ الْحَقَائِقُ الْمُتَرَابِطَةُ بِالأَعْدَادِ الثَّلاثَةِ نَفْسِهَا.
            </Card>
          </Cols>
          <Grid cols={1}>
            <FullFamily n={5} top={14} left={6} right={8} color={TRI.blue} />
            <FullFamily n={6} top={13} left={5} right={8} color={TRI.violet} />
          </Grid>
        </>
      ),
    },

    /* ================= أتدرب ٧–٨ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'في ٨ الجزآن متساويان (٨ و٨): كم حقيقة؟ (اثنتان).',
      content: (
        <>
          <BookSource>{PRACTICE}</BookSource>
          <QText>{COMPLETE}</QText>
          <Grid cols={1}>
            <FullFamily n={7} top={15} left={6} right={9} color={TRI.orange} />
            <FullFamily n={8} top={16} left={8} right={8} color={TRI.red} />
          </Grid>
        </>
      ),
    },

    /* ================= مهارات التفكير العليا ٩ ================= */
    {
      sec: 'hot', min: 3,
      notes: 'الجبر: الأعداد كلها من مجموعة ٣ و١٠ و١٣. اسأل قبل كل خانة: هل هو المجموع أم أحد الجزأين؟',
      content: (
        <QuestionSlide
          source={HOT} n={9} time={90}
          question={
            <>
              <BookLabel>الجَبْرُ:</BookLabel> أَكْتُبُ الأَعْدَادَ الْمَفْقُودَةَ فِي □:
            </>
          }
          hint="مَا الْأَعْدَادُ الثَّلَاثَةُ فِي هَذِهِ الْمَجْمُوعَةِ؟"
          steps={[{ text: 'الْأَعْدَادُ: ٣ وَ١٠ وَ١٣' }]}
          chart={<FactTriangle top={13} left={3} right={10} color={TRI.green[0]} edge={TRI.green[1]} />}
        >
          <FactGrid
            big
            lines={[
              [3, '+', { box: true, b: 10 }, '=', 13],
              [{ box: true, b: 13 }, '−', 3, '=', 10],
              [10, '+', { box: true, b: 3 }, '=', 13],
              [13, '−', { box: true, b: 10 }, '=', 3],
            ]}
          />
        </QuestionSlide>
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
            center={<>الْحَقَائِقُ<br />الْمُتَرَابِطَةُ</>}
            items={[
              { kind: 'rule', cap: 'ثَلَاثَةُ أَعْدَادٍ', text: 'الْمَجْمُوعُ وَجُزْآنِ، مِثْلُ ٣ وَ٧ وَ١٠.' },
              { kind: 'ex', cap: 'أَرْبَعُ حَقَائِقَ', text: '٧ + ٣، ٣ + ٧، ١٠ − ٣، ١٠ − ٧' },
              { kind: 'qs', cap: 'مُثَلَّثُ الْحَقَائِقِ', text: 'الْمَجْمُوعُ فِي الْأَعْلَى، وَالْجُزْآنِ فِي الْأَسْفَلِ.' },
              { kind: 'warn', cap: 'جُزْآنِ مُتَسَاوِيَانِ', text: 'حَقِيقَتَانِ فَقَطْ: ٩ + ٩ = ١٨، ١٨ − ٩ = ٩' },
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
          <SlideHead tag="تذكرة الخروج" kind="qs">أكمل المجموعة</SlideHead>
          <Cols>
            <FactTriangle top={11} left={4} right={7} color={TRI.blue[0]} edge={TRI.blue[1]} />
            <ExitTicket>
              <MCQ q="٤ + ٧ = ؟" options={['٣', '١١', '١٢']} answer="١١" />
              <MCQ q="١١ − ٤ = ؟" options={['٧', '٤', '١٥']} answer="٧" />
              <MCQ q="أَيُّ جُمْلَةٍ لَيْسَتْ مِنَ الْمَجْمُوعَةِ؟" options={['٧ + ٤ = ١١', '١١ − ٧ = ٤', '٧ − ٤ = ٣']} answer="٧ − ٤ = ٣" />
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
