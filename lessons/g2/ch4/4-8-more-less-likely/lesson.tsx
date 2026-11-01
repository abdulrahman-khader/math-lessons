import {
  Bag, BookSource, Card, Cols, CompareQ, CubeChip, CUBE_COLORS as C, DataGrid, Definition, DrawCard, DrawTally, ExitTicket, Goals, GoHomeButton,
  Grid, IfTeams, Lines, Mark, MCQ, MindMap, QCol, QText, QuestionGroup, QuestionSlide, SlideHead, Solution, Stack, Step, TableBox, TallyAnswer,
  Winner, defineLesson, num,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ، ص ١٠٢';
const PRACTICE = 'أتدرَّبُ، ص ١٠٣';
const SOLVE = 'أحُلُّ المسألةَ، ص ١٠٣';
const CIRCLE = 'أُحَوِّطُ الإِجَابَةَ الصَّحِيحَةَ: (أَكْثَرُ إِمْكَانِيَّةً، أَقَلُّ إِمْكَانِيَّةً)، مُتَّبِعًا الْخُطُوَاتِ، ثُمَّ أُكَرِّرُهَا ١٠ مَرَّاتٍ؛ لِأُكْمِلَ جَدْوَلَ الإِشَارَاتِ:';
const SUGGESTED = 'إِجَابَةٌ مُقْتَرَحَةٌ';
const SURE = 'أَكِيدٌ';
const NEVER = 'مُسْتَحِيلٌ';
const MORE = 'أَكْثَرُ إِمْكَانِيَّةً';
const LESS = 'أَقَلُّ إِمْكَانِيَّةً';

export default defineLesson({
  meta: {
    id: 'g2-4-8-more-less-likely',
    design: 'v2',
    code: '٤-٨',
    title: 'أَكْثَرُ إِمْكَانِيَّةً - أَقَلُّ إِمْكَانِيَّةً',
    shortTitle: 'أكثر إمكانية وأقل إمكانية',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الرابع: تمثيل البيانات وقراءتها',
    source: 'الجزء الأول، ص ١٠٢–١٠٣',
    minutes: 45,
    idea: 'أَصِفُ الْحَوَادِثَ وَفْقَ إِمْكَانِيَّةِ وُقُوعِهَا.',
    bookQuestions: 8,
  },
  sectionDesc: {
    engage: 'تذكّر أكيد ومستحيل',
    explore: 'أستعد: أقلام جمال',
    explain: 'أكثر إمكانية، أقل إمكانية',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٣',
    practice: 'الأسئلة ٤–٨',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردتين.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَصِفُ الْحَوَادِثَ وَفْقَ إِمْكَانِيَّةِ وُقُوعِهَا.</Card>
              <Card kind="rule" cap="المفردات"><Mark>أَكْثَرُ إِمْكَانِيَّةً</Mark>، <Mark>أَقَلُّ إِمْكَانِيَّةً</Mark></Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals
                items={[
                  'أُقَارِنُ عَدَدَ كُلِّ لَوْنٍ فِي الْكِيسِ.',
                  'أَصِفُ السَّحْبَ بِأَكْثَرِ إِمْكَانِيَّةٍ أَوْ أَقَلِّ إِمْكَانِيَّةٍ.',
                  'أُجْرِي تَجْرِبَةً، وَأُسَجِّلُ نَتَائِجَهَا بِالْإِشَارَاتِ.',
                ]}
              />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الدرس ٤-٧. سؤال التفكير يمهّد للدرس.',
      content: (
        <>
          <SlideHead tag="تذكّر، الدرس ٤-٧" kind="ink">أكيد أم مستحيل؟</SlideHead>
          <Cols>
            <QCol>
              <MCQ q={<>كُلُّ الْمُكَعَّبَاتِ <CubeChip c={C.green} />. سَحْبُ <CubeChip c={C.green} />:</>} options={[SURE, NEVER]} answer={SURE} award />
              <MCQ q={<>كُلُّ الْمُكَعَّبَاتِ <CubeChip c={C.green} />. سَحْبُ <CubeChip c={C.red} />:</>} options={[SURE, NEVER]} answer={NEVER} award />
              <Card kind="qs" cap="سؤال للتفكير">٥ مُكَعَّبَاتٍ حَمْرَاءَ وَمُكَعَّبٌ أَخْضَرُ: هَلْ سَحْبُ الْأَحْمَرِ أَكِيدٌ؟</Card>
            </QCol>
            <Bag items={[{ name: 'أحمر', n: 5, color: C.red }, { name: 'أخضر', n: 1, color: C.green }]} shape="cube" size={260} />
          </Cols>
        </>
      ),
    },

    /* ================= أستعد ================= */
    {
      sec: 'explore', min: 4,
      notes: 'اقرأ من الكتاب، ثم أجروا التجربة: ادعُ طالبًا يسحب ١٠ مرات. هل كانت الإشارات الحمراء أكثر؟',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٠٢" kind="qs">أقلام جمال</SlideHead>
          <Cols>
            <QCol>
              <QText>يَسْحَبُ جَمَالٌ قَلَمَ تَلْوِينٍ مِنَ الْكِيسِ مِنْ غَيْرِ أَنْ يَنْظُرَ إِلَيْهِ. فَأَيُّهُمَا أَكْثَرُ إِمْكَانِيَّةً: أَنْ يَسْحَبَ الأَحْمَرَ أَمِ الأَخْضَرَ؟</QText>
              <Solution>
                <Step>الْأَحْمَرُ ٤، وَالْأَخْضَرُ ١</Step>
                <Step kind="ans" label={MORE}>الْأَحْمَرُ</Step>
              </Solution>
            </QCol>
            {/* أقلام الكتاب وجدول إشاراته كما في ص ١٠٢ */}
            <TableBox>
              <Bag items={[{ name: 'أَحْمَرُ', n: 4, color: '#e8436a' }, { name: 'أَخْضَرُ', n: 1, color: '#7cc14a' }]} shape="cube" size={240} />
              <DataGrid tone="green" head={['اللَّوْنُ', 'الإِشَارَاتُ']} rows={[['أَحْمَرُ', { tally: 7 }], ['أَخْضَرُ', { tally: 3 }]]} />
            </TableBox>
          </Cols>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 3,
      notes: 'اقرأ القاعدة. المقارنة: اللون الأكثر عددًا أكثر إمكانية.',
      content: (
        <>
          <SlideHead tag="القاعدة، ص ١٠٢" kind="rule">أكثر إمكانية وأقل إمكانية</SlideHead>
          <Definition kind="rule">
            أَصِفُ إِمْكَانِيَّةَ وُقُوعِ حَدَثٍ مَا بِـ<Mark>أَكْثَرِ إِمْكَانِيَّةٍ</Mark>، أَوْ <Mark>أَقَلِّ إِمْكَانِيَّةٍ</Mark>، وَذَلِكَ بِحَسَبِ فُرْصَةِ حُدُوثِهِ.
          </Definition>
          <Cols even>
            <Card kind="ex" cap={MORE}>
              <Bag items={[{ name: 'أحمر', n: 6, color: C.red }, { name: 'أصفر', n: 2, color: C.yellow }]} shape="cube" size={200} />
              <Lines>
                <b>سَحْبُ <CubeChip c={C.red} />: عَدَدُهُ أَكْبَرُ</b>
              </Lines>
            </Card>
            <Card kind="qs" cap={LESS}>
              <Bag items={[{ name: 'أحمر', n: 6, color: C.red }, { name: 'أصفر', n: 2, color: C.yellow }]} shape="cube" size={200} />
              <Lines>
                <b>سَحْبُ <CubeChip c={C.yellow} />: عَدَدُهُ أَقَلُّ</b>
              </Lines>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: البالونات (مثال غير مثال الكتاب). أوقفه قبل كل نتيجة.',
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
      notes: 'نعمل معًا: اختر طالبًا بالعجلة.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أيّهما أكثر إمكانية؟</SlideHead>
          <Cols>
            <QCol>
              <MCQ q={<>سَحْبُ <CubeChip c={C.yellow} /> مِنْ هَذَا الْكِيسِ:</>} options={[MORE, LESS]} answer={MORE} award />
              <MCQ q={<>سَحْبُ <CubeChip c={C.green} /> مِنْ هَذَا الْكِيسِ:</>} options={[MORE, LESS]} answer={LESS} award />
            </QCol>
            <Bag items={[{ name: 'أصفر', n: 7, color: C.yellow }, { name: 'أخضر', n: 2, color: C.green }]} shape="cube" size={260} />
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٢ ================= */
    {
      sec: 'check', min: 3,
      notes: 'السؤال ١: الخطوة تُحوِّط. السؤال ٢: تجربة بكيس حقيقي فيه ٤ أخضر و٢ أحمر؛ ادعُ طالبًا يسحب ويعيد المكعب ١٠ مرات، والمس صف اللون الذي يخرج.',
      content: (
        <QuestionGroup source={CHECK} instruction={CIRCLE} cols={2} time={120}>
          <CompareQ n={1} a={C.green} b={C.red} items={[{ name: 'أخضر', n: 4, color: C.green }, { name: 'أحمر', n: 2, color: C.red }]} ans={MORE} />
          <DrawCard n={2} id="g2-4-8-q2" items={[{ name: 'أَخْضَرُ', n: 4, color: C.green }, { name: 'أَحْمَرُ', n: 2, color: C.red }]} />
        </QuestionGroup>
      ),
    },

    /* ================= أتأكد ٣ ================= */
    {
      sec: 'check', min: 1,
      notes: 'أتحدث: قارن نتائج الصف في جدول السؤال ٢ بإجابة السؤال ١. التجربة قد تختلف عن المتوقع، وهذا مقبول.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="هَلْ تَتَّفِقُ النَّتَائِجُ الَّتِي حَصَلْتُ عَلَيْهَا فِي جَدْوَلِ الإِشَارَاتِ مَعَ إِجَابَتِي عَنِ السُّؤَالِ (١)؟ أَشْرَحُ."
          hint="أَيُّ لَوْنٍ لَهُ إِشَارَاتٌ أَكْثَرُ فِي جَدْوَلِنَا؟"
          steps={[
            // من نتائج تجربة الصف في السؤال ٢: الأخضر أولًا ثم الأحمر
            { text: <TallyAnswer id="g2-4-8-q2" rows={2} f={([g, r]) => `الْأَخْضَرُ ${num(g)}، وَالْأَحْمَرُ ${num(r)}`} /> },
            {
              kind: 'ans', label: SUGGESTED,
              text: <TallyAnswer id="g2-4-8-q2" rows={2} f={([g, r]) => (g > r ? 'نَعَمْ، خَرَجَ الْأَخْضَرُ أَكْثَرَ.' : 'لَا، وَالتَّجْرِبَةُ قَدْ تَخْتَلِفُ.')} />,
            },
          ]}
          chart={<DrawTally id="g2-4-8-q2" items={[{ name: 'أَخْضَرُ', n: 4, color: C.green }, { name: 'أَحْمَرُ', n: 2, color: C.red }]} />}
        />
      ),
    },

    /* ================= أتدرب ٤–٥ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'كل خطوة تُحوِّط الإجابة في سؤال.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={CIRCLE} cols={2} time={90}>
          <CompareQ n={4} a={C.red} b={C.yellow} items={[{ name: 'أحمر', n: 2, color: C.red }, { name: 'أصفر', n: 6, color: C.yellow }]} ans={LESS} />
          <CompareQ n={5} a={C.red} b={C.yellow} items={[{ name: 'أحمر', n: 5, color: C.red }, { name: 'أصفر', n: 4, color: C.yellow }]} ans={MORE} />
        </QuestionGroup>
      ),
    },

    /* ================= أتدرب ٦–٧ ================= */
    ...[
      { n: 6, id: 'g2-4-8-q6', a: 2, b: 6, note: 'تجربة: ادعُ طالبًا يسحب من كيس فيه ٢ أحمر و٦ أصفر، ويعيد المكعب كل مرة، والمس صف اللون الذي يخرج حتى ١٠ سحبات.' },
      { n: 7, id: 'g2-4-8-q7', a: 5, b: 4, note: 'تجربة: ادعُ طالبًا يسحب من كيس فيه ٥ أحمر و٤ أصفر، ويعيد المكعب كل مرة، والمس صف اللون الذي يخرج حتى ١٠ سحبات.' },
    ].map(({ n, id, a, b, note }) => ({
      sec: 'practice' as const, min: 2,
      notes: note,
      content: (
        <>
          <BookSource>{PRACTICE}</BookSource>
          <QText>{CIRCLE}</QText>
          <Grid cols={1}>
            <DrawCard n={n} id={id} items={[{ name: 'أَحْمَرُ', n: a, color: C.red }, { name: 'أَصْفَرُ', n: b, color: C.yellow }]} />
          </Grid>
        </>
      ),
    })),

    /* ================= أحل المسألة ٨ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'التفكير المنطقي: العددان متساويان، فلا أحد أكثر إمكانية.',
      content: (
        <QuestionSlide
          source={SOLVE} n={8} tags={[{ kind: 'warn', text: 'التَّفْكِيرُ الْمَنْطِقِيُّ' }]}
          question={<>وَضَعَتْ لَيْلَى ٥ <CubeChip c={C.purple} /> وَ ٥ <CubeChip c={C.green} /> فِي كِيسٍ. أَيُّهُمَا إِمْكَانِيَّةُ حُدُوثِهِ أَكْثَرُ مِنَ الآخَرِ: سَحْبُ <CubeChip c={C.purple} /> أَمْ <CubeChip c={C.green} />؟ أُوَضِّحُ إِجَابَتِي.</>}
          hint="مَاذَا نُلَاحِظُ عَلَى الْعَدَدَيْنِ؟"
          steps={[
            { text: 'الْبَنَفْسَجِيُّ ٥، وَالْأَخْضَرُ ٥' },
            { text: 'الْعَدَدَانِ مُتَسَاوِيَانِ.' },
            { text: 'لَا فَرْقَ بَيْنَهُمَا', kind: 'ans', label: 'الْإِجَابَةُ' },
          ]}
          chart={<Bag items={[{ name: 'بنفسجي', n: 5, color: C.purple }, { name: 'أخضر', n: 5, color: C.green }]} shape="cube" size={260} />}
        />
      ),
    },

    /* ================= الختام ================= */
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب إكمال كل فرع شفهيًا.',
      content: (
        <>
          <SlideHead tag="أهمّ الأفكار" kind="rule">ملخص الدرس</SlideHead>
          <MindMap
            center={<>إِمْكَانِيَّةُ<br />الْحُدُوثِ</>}
            items={[
              { kind: 'rule', cap: MORE, text: 'اللَّوْنُ الْأَكْثَرُ عَدَدًا فِي الْكِيسِ.' },
              { kind: 'ex', cap: LESS, text: 'اللَّوْنُ الْأَقَلُّ عَدَدًا فِي الْكِيسِ.' },
              { kind: 'qs', cap: 'مُتَسَاوِيَانِ', text: 'إِذَا تَسَاوَى الْعَدَدَانِ.' },
              { kind: 'warn', cap: 'التَّجْرِبَةُ', text: 'أَسْحَبُ، وَأُسَجِّلُ، وَأُعِيدُ، ١٠ مَرَّاتٍ.' },
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
            <Bag items={[{ name: 'أخضر', n: 3, color: C.green }, { name: 'أحمر', n: 7, color: C.red }]} shape="cube" size={260} />
            <ExitTicket>
              <MCQ q={<>سَحْبُ <CubeChip c={C.red} />:</>} options={[MORE, LESS]} answer={MORE} />
              <MCQ q={<>سَحْبُ <CubeChip c={C.green} />:</>} options={[MORE, LESS]} answer={LESS} />
              <MCQ q={<>كَمْ مُكَعَّبًا <CubeChip c={C.green} /> نُضِيفُ لِيَتَسَاوَى السَّحْبُ؟</>} options={['٢', '٤', '٧']} answer="٤" />
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
