import {
  Bag, BookSource, Card, CircleRow, ColorPair, Cols, CubeChip, CUBE_COLORS as C, DrawExplorer, ExitTicket, Goals, GoHomeButton, Grid, IfTeams, Mark,
  MCQ, MindMap, QCol, QText, QuestionGroup, QuestionSlide, SlideHead, Solution, Stack, Step, Winner, defineLesson,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ، ص ١٠٠';
const PRACTICE = 'أتدرَّبُ، ص ١٠١';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٠١';
const CIRCLE = 'أُحَوِّطُ الْكَلِمَةَ الْمُنَاسِبَةَ (أَكِيدٌ، مُسْتَحِيلٌ):';
const COLOR = 'أُلَوِّنُ الْمُكَعَّبَاتِ لِكَيْ تَكُونَ الْجُمْلَتَانِ صَحِيحَتَيْنِ:';
const SURE = 'أَكِيدٌ';
const NEVER = 'مُسْتَحِيلٌ';

/** كيسا الاستكشاف: كل مكعباته خضراء، أو أحمر وأصفر */
const BAGS = [
  { name: 'كِيسٌ أَخْضَرُ', items: [{ name: 'أخضر', n: 8, color: C.green }] },
  { name: 'كِيسٌ أَحْمَرُ وَأَصْفَرُ', items: [{ name: 'أحمر', n: 4, color: C.red }, { name: 'أصفر', n: 4, color: C.yellow }] },
];

export default defineLesson({
  meta: {
    id: 'g2-4-7-certain-impossible',
    design: 'v2',
    code: '٤-٧',
    title: 'الْحَدَثُ الأَكِيدُ وَالْحَدَثُ الْمُسْتَحِيلُ',
    shortTitle: 'الحدث الأكيد والحدث المستحيل',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الرابع: تمثيل البيانات وقراءتها',
    source: 'الجزء الأول، ص ١٠٠–١٠١',
    minutes: 45,
    idea: 'أُحَدِّدُ الْحَدَثَ الأَكِيدَ وَالْحَدَثَ الْمُسْتَحِيلَ.',
    bookQuestions: 11,
  },
  sectionDesc: {
    engage: 'هل يحدث؟',
    explore: 'أسحب مكعبًا',
    explain: 'أكيد، مستحيل',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٥',
    practice: 'الأسئلة ٦–١٠',
    hot: 'السؤال ١١',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردتين. اسأل: ما معنى «أكيد» في كلامنا اليومي؟',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أُحَدِّدُ الْحَدَثَ الأَكِيدَ وَالْحَدَثَ الْمُسْتَحِيلَ.</Card>
              <Card kind="rule" cap="المفردات"><Mark>أَكِيدٌ</Mark>، <Mark>مُسْتَحِيلٌ</Mark></Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals
                items={[
                  'أَعْرِفُ مَتَى يَكُونُ السَّحْبُ أَكِيدًا.',
                  'أَعْرِفُ مَتَى يَكُونُ السَّحْبُ مُسْتَحِيلًا.',
                  'أُلَوِّنُ كِيسًا لِيَصِيرَ السَّحْبُ أَكِيدًا أَوْ مُسْتَحِيلًا.',
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
      notes: 'أسئلة من الحياة: هل يحدث هذا؟ دع الطلاب يجيبون بنعم أو لا.',
      content: (
        <>
          <SlideHead tag="سؤال للصف" kind="qs">هل يحدث هذا؟</SlideHead>
          <Grid cols={3}>
            <MCQ q="تُشْرِقُ الشَّمْسُ غَدًا." options={[SURE, NEVER]} answer={SURE} award />
            <MCQ q="يَطِيرُ الْفِيلُ فِي السَّمَاءِ." options={[SURE, NEVER]} answer={NEVER} award />
            <MCQ q="يَأْتِي يَوْمُ الْجُمُعَةِ بَعْدَ الْخَمِيسِ." options={[SURE, NEVER]} answer={SURE} award />
          </Grid>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 4,
      notes: 'ادعُ طالبًا يسحب عدة مرات من كل كيس. اسأل: من الكيس الأخضر، ماذا نسحب دائمًا؟ هل يمكن أن نسحب أزرق؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">أسحب مكعبًا</SlideHead>
          <DrawExplorer bags={BAGS} question="هَلْ يُمْكِنُ أَنْ نَسْحَبَ مُكَعَّبًا أَزْرَقَ مِنْ هَذَا الْكِيسِ؟" />
        </>
      ),
    },

    /* ================= أستعد ================= */
    {
      sec: 'explain', min: 3,
      notes: 'اقرأ من الكتاب. كل المكعبات خضراء: سحب الأخضر أكيد، والأصفر مستحيل.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٠٠" kind="rule">أكيد ومستحيل</SlideHead>
          <Cols>
            <QCol>
              <QText>أَنْظُرُ إِلَى وِعَاءِ الْمُكَعَّبَاتِ</QText>
              <Solution>
                <Step>كُلُّ الْمُكَعَّبَاتِ خَضْرَاءُ.</Step>
                <Step kind="ans" label={<>اِخْتِيَارُ <CubeChip c={C.green} /></>}>{SURE}</Step>
                <Step>لَا يُوجَدُ مُكَعَّبٌ أَصْفَرُ.</Step>
                <Step kind="ans" label={<>اِخْتِيَارُ <CubeChip c={C.yellow} /></>}>{NEVER}</Step>
              </Solution>
            </QCol>
            <Bag items={[{ name: 'أخضر', n: 9, color: C.green }]} shape="cube" size={300} />
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: صندوق الكرات (مثال غير مثال الكتاب). أوقفه قبل كل سحب واسأل: أكيد أم مستحيل؟',
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
      notes: 'نعمل معًا: اختر طالبًا بالعجلة لكل سؤال.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أكيد أم مستحيل؟</SlideHead>
          <Cols>
            <QCol>
              <MCQ q={<>سَحْبُ <CubeChip c={C.blue} /> مِنْ هَذَا الْكِيسِ:</>} options={[SURE, NEVER]} answer={SURE} award />
              <MCQ q={<>سَحْبُ <CubeChip c={C.red} /> مِنْ هَذَا الْكِيسِ:</>} options={[SURE, NEVER]} answer={NEVER} award />
            </QCol>
            <Bag items={[{ name: 'أزرق', n: 6, color: C.blue }]} shape="cube" size={260} />
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٢ ================= */
    {
      sec: 'check', min: 2,
      notes: 'كل خطوة تُحوِّط الإجابة في سؤال.',
      content: (
        <QuestionGroup source={CHECK} instruction={CIRCLE} cols={2} time={60}>
          <CircleRow n={1} pick={C.green} items={[{ name: 'أصفر', n: 4, color: C.yellow }, { name: 'أحمر', n: 5, color: C.red }]} ans={NEVER} />
          <CircleRow n={2} pick={C.orange} items={[{ name: 'برتقالي', n: 9, color: C.orange }]} ans={SURE} />
        </QuestionGroup>
      ),
    },

    /* ================= أتأكد ٣–٤ ================= */
    {
      sec: 'check', min: 2,
      notes: 'يلوّن الطلاب: لمس المكعب يغيّر لونه (أو عدد كل لون من الجوال). في ٤ إجابات كثيرة صحيحة: أي لون غير الأصفر. «التالي» يُظهر حل دليل المعلم.',
      content: (
        <>
          <BookSource>{CHECK}</BookSource>
          <QText>{COLOR}</QText>
          <ColorPair
            qs={[
              { n: 3, pick: C.red, word: 'أَكِيدٌ.', fill: C.red, total: 7 },
              { n: 4, pick: C.yellow, word: 'مُسْتَحِيلٌ.', fill: C.red, total: 7 },
            ]}
          />
        </>
      ),
    },

    /* ================= أتأكد ٥ ================= */
    {
      sec: 'check', min: 1,
      notes: 'أتحدث: اطلب من طالبين أن يشرحا.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question={<>يَحْوِي كِيسٌ مُكَعَّبَاتٍ <CubeChip c={C.red} /> وَمُكَعَّبَاتٍ <CubeChip c={C.green} />. فَهَلِ اخْتِيَارُ مُكَعَّبٍ <CubeChip c={C.yellow} /> يَكُونُ أَكِيدًا أَوْ مُسْتَحِيلًا؟ أَشْرَحُ.</>}
          hint="هَلْ فِي الْكِيسِ مُكَعَّبٌ أَصْفَرُ؟"
          steps={[
            { text: 'لَا يُوجَدُ فِي الْكِيسِ مُكَعَّبٌ أَصْفَرُ.' },
            { text: NEVER, kind: 'ans', label: 'الِاخْتِيَارُ' },
          ]}
          chart={<Bag items={[{ name: 'أحمر', n: 4, color: C.red }, { name: 'أخضر', n: 4, color: C.green }]} shape="cube" size={260} />}
        />
      ),
    },

    /* ================= أتدرب ٦–٨ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'كل خطوة تُحوِّط الإجابة في سؤال.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={CIRCLE} cols={3} time={90}>
          <CircleRow n={6} pick={C.yellow} items={[{ name: 'أصفر', n: 9, color: C.yellow }]} ans={SURE} />
          <CircleRow n={7} pick={C.blue} items={[{ name: 'أحمر', n: 5, color: C.red }, { name: 'أصفر', n: 4, color: C.yellow }]} ans={NEVER} />
          <CircleRow n={8} pick={C.green} items={[{ name: 'أخضر', n: 9, color: C.green }]} ans={SURE} />
        </QuestionGroup>
      ),
    },

    /* ================= أتدرب ٩–١٠ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'يلوّن الطلاب: لمس المكعب يغيّر لونه (أو عدد كل لون من الجوال). في ١٠ أي لون غير الأزرق صحيح. «التالي» يُظهر حل دليل المعلم.',
      content: (
        <>
          <BookSource>{PRACTICE}</BookSource>
          <QText>{COLOR}</QText>
          <ColorPair
            qs={[
              { n: 9, pick: C.green, word: 'أَكِيدٌ.', fill: C.green, total: 8 },
              { n: 10, pick: C.blue, word: 'مُسْتَحِيلٌ.', fill: C.red, total: 8 },
            ]}
          />
        </>
      ),
    },

    /* ================= مهارات التفكير العليا ١١ ================= */
    {
      sec: 'hot', min: 2,
      notes: 'التفكير الرياضي: ليس أكيدًا ولا مستحيلًا. نتعلم ذلك في الدرس القادم.',
      content: (
        <QuestionSlide
          source={HOT} n={11} tags={[{ kind: 'warn', text: 'التَّفْكِيرُ الرِّيَاضِيُّ' }]}
          question={<>وَضَعَ سُعُودٌ ٤ <CubeChip c={C.yellow} /> وَ ٤ <CubeChip c={C.green} /> فِي كِيسٍ. هَلِ اخْتِيَارُ <CubeChip c={C.yellow} /> أَكِيدٌ؟ أَشْرَحُ.</>}
          hint="هَلْ كُلُّ الْمُكَعَّبَاتِ صَفْرَاءُ؟"
          steps={[
            { text: 'فِي الْكِيسِ ٤ مُكَعَّبَاتٍ خَضْرَاءَ أَيْضًا.' },
            { text: 'قَدْ نَسْحَبُ مُكَعَّبًا أَخْضَرَ.' },
            { text: 'لَيْسَ أَكِيدًا', kind: 'ans', label: 'اخْتِيَارُ الْأَصْفَرِ' },
          ]}
          chart={<Bag items={[{ name: 'أصفر', n: 4, color: C.yellow }, { name: 'أخضر', n: 4, color: C.green }]} shape="cube" size={260} />}
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
            center={<>أَكِيدٌ<br />وَمُسْتَحِيلٌ</>}
            items={[
              { kind: 'rule', cap: 'أَكِيدٌ', text: 'كُلُّ مَا فِي الْكِيسِ مِنَ اللَّوْنِ نَفْسِهِ.' },
              { kind: 'ex', cap: 'مُسْتَحِيلٌ', text: 'اللَّوْنُ غَيْرُ مَوْجُودٍ فِي الْكِيسِ.' },
              { kind: 'qs', cap: 'مُمْكِنٌ', text: 'فِي الْكِيسِ اللَّوْنُ وَأَلْوَانٌ أُخْرَى.' },
              { kind: 'warn', cap: 'أَنْتَبِهُ', text: 'أَنْظُرُ إِلَى كُلِّ الْمُكَعَّبَاتِ قَبْلَ أَنْ أُقَرِّرَ.' },
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
            <Bag items={[{ name: 'أحمر', n: 6, color: C.red }]} shape="cube" size={260} />
            <ExitTicket>
              <MCQ q={<>سَحْبُ <CubeChip c={C.red} />:</>} options={[SURE, NEVER]} answer={SURE} />
              <MCQ q={<>سَحْبُ <CubeChip c={C.green} />:</>} options={[SURE, NEVER]} answer={NEVER} />
              <MCQ q={<>أَضَفْنَا مُكَعَّبًا <CubeChip c={C.green} />. سَحْبُ <CubeChip c={C.red} /> الْآنَ:</>} options={[SURE, NEVER, 'لَيْسَ أَكِيدًا وَلَا مُسْتَحِيلًا']} answer="لَيْسَ أَكِيدًا وَلَا مُسْتَحِيلًا" />
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
