import {
  BookGroup, Card, Cols, DataGrid, Definition, Eq, ExitTicket, Goals, GoHomeButton, Grid, IfTeams, Mark, MCQ, MindMap, PicGraph,
  QCol, QText, TableBox, QuestionSlide, SlideHead, Solution, Stack, Step, Winner, defineLesson, type HlKey, type PicRow,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ، ص ٨٦';
const PRACTICE = 'أتدرَّبُ، ص ٨٧';
const SOLVE = 'أحُلُّ المسألةَ، ص ٨٧';
const SUGGESTED = 'إِجَابَةٌ مُقْتَرَحَةٌ';
const USE = 'أَسْتَعْمِلُ جَدْوَلَ الإِشَارَاتِ لِأُمَثِّلَ الْبَيَانَاتِ بِالصُّوَرِ:';

type Row = [label: string, icon: string, tally: number, color: string];

/** جدول إشارات كما في الكتاب */
const Tallies = ({ head, rows, tone = 'blue', count }: { head: string; rows: Row[]; tone?: 'blue' | 'green'; count?: boolean }) => (
  <DataGrid
    tone={tone}
    head={count ? [head, 'الإشاراتُ', 'العددُ'] : [head, 'الإشاراتُ']}
    rows={rows.map(([l, ic, n]) => (count ? [`${ic} ${l}`, { tally: n }, n] : [`${ic} ${l}`, { tally: n }]))}
  />
);

/** التمثيل بالصور من جدول الإشارات: صور الصف i تظهر مع خطوة فيها v{i} */
const Pics = ({ title, rows, per, cells, keyText, reveal = true }: { title: string; rows: Row[]; per: number; cells?: number; keyText: string; reveal?: boolean }) => (
  <PicGraph
    title={title}
    cells={cells}
    keyText={keyText}
    reveal={reveal}
    rows={rows.map(([l, ic, n, c]): PicRow => ({ label: l, icon: ic, n: n / per, color: c }))}
  />
);

const BIRDS: Row[] = [['حَمَامَةٌ', '🕊️', 2, '#f9cba7'], ['عُصْفُورٌ', '🐤', 4, '#c8e6c9']];
const PETS: Row[] = [['السَّمَكَةُ', '🐟', 10, '#f9cba7'], ['الطَّائِرُ', '🐤', 6, '#c8e6c9'], ['القِطَّةُ', '🐱', 12, '#fff3b0'], ['الأَرْنَبُ', '🐰', 2, '#cfe0f5']];
const FRUIT: Row[] = [['بُرتقالٌ', '🍊', 6, '#fcd9b8'], ['عِنَبٌ', '🍇', 1, '#e1d0f0'], ['مَوزٌ', '🍌', 5, '#fff3b0'], ['فَراولةٌ', '🍓', 2, '#f8c4c4'], ['تُفَّاحٌ', '🍎', 7, '#f8c4c4']];
const SCHOOL: Row[] = [['الحافلةُ', '🚌', 4, '#fff3b0'], ['المَشيُ عَلَى الأَقْدَامِ', '🚶', 10, '#fcd9b8'], ['السَّيَّارةُ', '🚗', 4, '#c8e6c9']];
const SUBJECTS: Row[] = [['الرِّياضيّاتُ', '✏️', 9, '#c8e6c9'], ['القِراءةُ', '📗', 3, '#fcd9b8'], ['التَّرْبِيَةُ الْبَدَنِيَّةُ', '👟', 12, '#fff3b0']];

export default defineLesson({
  meta: {
    id: 'g2-4-2-picture-graph',
    design: 'v2',
    code: '٤-٢',
    title: 'التَّمْثِيلُ بِالصُّوَرِ',
    shortTitle: 'التمثيل بالصور',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الرابع: تمثيل البيانات وقراءتها',
    source: 'الجزء الأول، ص ٨٦–٨٧',
    minutes: 45,
    idea: 'أُمَثِّلُ الْبَيَانَاتِ بِالصُّوَرِ مِنْ جَدْوَلِ الإِشَارَاتِ.',
    bookQuestions: 7,
  },
  sectionDesc: {
    engage: 'تذكّر جدول الإشارات',
    explore: 'أستعد: الطائر المفضل',
    explain: 'المفتاح',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٢',
    practice: 'الأسئلة ٣–٧',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردتين. اسأل: ما معنى «مفتاح» في الخريطة؟ (يشرح الرموز).',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أُمَثِّلُ الْبَيَانَاتِ بِالصُّوَرِ مِنْ جَدْوَلِ الإِشَارَاتِ.</Card>
              <Card kind="rule" cap="المفردات"><Mark>التَّمْثِيلُ بِالصُّوَرِ</Mark>، <Mark>الْمِفْتَاحُ</Mark></Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals
                items={[
                  'أَرْسُمُ صُورَةً لِكُلِّ اسْتِجَابَةٍ أَوْ أَكْثَرَ.',
                  'أَسْتَعْمِلُ الْمِفْتَاحَ لِأَعْرِفَ مَا تُمَثِّلُهُ كُلُّ صُورَةٍ.',
                  'أَنْقُلُ الْبَيَانَاتِ مِنْ جَدْوَلِ الْإِشَارَاتِ إِلَى الصُّوَرِ.',
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
      notes: 'مراجعة الدرس ٤-١. اختر طالبًا بالعجلة.',
      content: (
        <>
          <SlideHead tag="تذكّر، الدرس ٤-١" kind="ink">جدول الإشارات</SlideHead>
          <Cols>
            <Stack>
              <MCQ q="كَمْ طَالِبًا يُفَضِّلُ الْعُصْفُورَ؟" options={['٢', '٤', '٥']} answer="٤" award />
              <Card kind="qs" cap="سؤال للتفكير">هَلْ نَسْتَطِيعُ أَنْ نَعْرِضَ هَذِهِ الْبَيَانَاتِ بِطَرِيقَةٍ أَجْمَلَ مِنَ الْخُطُوطِ؟</Card>
            </Stack>
            <TableBox>
              <Tallies head="الطَّائِرُ المُفَضَّلُ" rows={BIRDS} />
            </TableBox>
          </Cols>
        </>
      ),
    },

    /* ================= أستعد ================= */
    {
      sec: 'explore', min: 4,
      notes: 'كل ضغطة تُظهر صور صف واحد. اسأل: كم صورة نرسم للحمامة؟ لماذا؟',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ٨٦" kind="qs">الطائر المفضل</SlideHead>
          <Cols>
            <QCol>
              <QText>جَمَعَتْ سَلْمَى بَيَانَاتٍ حَوْلَ الطَّائِرِ الْمُفَضَّلِ، وَوَضَعَتِ النَّتَائِجَ فِي جَدْوَلِ الإِشَارَاتِ الْمُجَاوِرِ. بَعْدَ ذَلِكَ مَثَّلَتْ سَلْمَى تِلْكَ الْبَيَانَاتِ بِالصُّوَرِ لِعَرْضِهَا بِطَرِيقَةٍ مُخْتَلِفَةٍ.</QText>
              <Solution>
                <Step hl={['v0', 'p0']}>حَمَامَةٌ: إِشَارَتَانِ، فَصُورَتَانِ</Step>
                <Step hl={['v0', 'v1', 'p1']}>عُصْفُورٌ: ٤ إِشَارَاتٍ، فَـ٤ صُوَرٍ</Step>
              </Solution>
            </QCol>
            <TableBox>
              <Stack>
                <Tallies head="الطَّائِرُ المُفَضَّلُ" rows={BIRDS} />
                <Pics title="الطَّائِرُ المُفَضَّلُ" rows={BIRDS} per={1} cells={4} keyText="المِفْتَاحُ: كُلُّ طَائِرٍ يُمَثِّلُ اسْتِجَابَةً وَاحِدَةً." />
              </Stack>
            </TableBox>
          </Cols>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 3,
      notes: 'اقرأ القاعدة. ثم قارن مفتاحين: صورة = ١، وصورة = ٢. كم صورة نرسم لـ ٤ عصافير في كل مرة؟',
      content: (
        <>
          <SlideHead tag="القاعدة، ص ٨٦" kind="rule">المفتاح</SlideHead>
          <Definition kind="rule">
            يُمْكِنُنِي أَنْ أَعْرِضَ الْبَيَانَاتِ <Mark>مُمَثَّلَةً بِالصُّوَرِ</Mark>. وَأَسْتَعْمِلُ <Mark>الْمِفْتَاحَ</Mark> لِأُبَيِّنَ عَدَدَ الاسْتِجَابَاتِ الَّتِي تُمَثِّلُهَا كُلُّ صُورَةٍ.
          </Definition>
          <Cols even>
            <Card kind="ex" cap="كُلُّ صُورَةٍ = اسْتِجَابَةٌ وَاحِدَةٌ">
              <Pics title="٤ عَصَافِيرَ" rows={[['عُصْفُورٌ', '🐤', 4, '#c8e6c9']]} per={1} keyText="🐤 = ١" reveal={false} />
            </Card>
            <Card kind="qs" cap="كُلُّ صُورَةٍ = اسْتِجَابَتَانِ">
              <Pics title="٤ عَصَافِيرَ" rows={[['عُصْفُورٌ', '🐤', 4, '#c8e6c9']]} per={2} cells={4} keyText="🐤 = ٢" reveal={false} />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: الألعاب المفضلة (مثال غير مثال الكتاب). أوقفه قبل تغيير المفتاح واسأل: كم صورة نحتاج الآن؟',
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
          <SlideHead tag="نعمل معًا" kind="ex">كم صورة؟</SlideHead>
          <Grid cols={3}>
            <MCQ q="الْمِفْتَاحُ: كُلُّ صُورَةٍ = ١. كَمْ صُورَةً نَرْسُمُ لِـ ٥ طُلَّابٍ؟" options={['١', '٥', '١٠']} answer="٥" award />
            <MCQ q="الْمِفْتَاحُ: كُلُّ صُورَةٍ = ٢. كَمْ صُورَةً نَرْسُمُ لِـ ٦ طُلَّابٍ؟" options={['٦', '٣', '١٢']} answer="٣" award />
            <MCQ q="الْمِفْتَاحُ: كُلُّ صُورَةٍ = ٢. رَسَمْنَا ٤ صُوَرٍ. كَمْ طَالِبًا؟" options={['٤', '٢', '٨']} answer="٨" award />
          </Grid>
        </>
      ),
    },

    /* ================= أتأكد ١–٢ ================= */
    {
      sec: 'check', min: 3,
      notes: 'المفتاح هنا: كل صورة = استجابتان. نقسم كل عدد على ٢. اطلب من الطلاب عدّ الإشارات أولًا.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={120}
          question={USE}
          hint="كُلُّ صُورَةٍ = ٢. كَمْ صُورَةً لِكُلِّ عَدَدٍ؟"
          steps={[
            { text: 'السَّمَكَةُ ١٠: ٥ صُوَرٍ', hl: ['v0'] },
            { text: 'الطَّائِرُ ٦: ٣ صُوَرٍ', hl: ['v0', 'v1'] },
            { text: 'الْقِطَّةُ ١٢: ٦ صُوَرٍ', hl: ['v0', 'v1', 'v2'] },
            { text: 'الْأَرْنَبُ ٢: صُورَةٌ وَاحِدَةٌ', hl: ['v0', 'v1', 'v2', 'v3'] },
          ]}
          chart={
            <TableBox>
              <Stack>
                <Tallies head="الحَيَوَانُ المُفَضَّلُ" rows={PETS} />
                <Pics title="الحَيَوَانُ المُفَضَّلُ" rows={PETS} per={2} cells={7} keyText="المِفْتَاحُ: كُلُّ حَيَوَانٍ يُمَثِّلُ اسْتِجَابَتَيْنِ" />
              </Stack>
            </TableBox>
          }
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'أتحدث: اطلب من طالبين أن يشرحا.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="كَيْفَ أُفَرِّقُ بَيْنَ التَّمْثِيلِ بِالصُّوَرِ وَجَدْوَلِ الإِشَارَاتِ؟"
          hint="مَاذَا تُمَثِّلُ الْإِشَارَةُ؟ وَمَاذَا تُمَثِّلُ الصُّورَةُ؟"
          steps={[{ text: 'الْإِشَارَةُ اسْتِجَابَةٌ وَاحِدَةٌ، وَالصُّورَةُ حَسَبَ الْمِفْتَاحِ.', kind: 'ans', label: SUGGESTED }]}
          chart={
            <TableBox>
              <Stack>
                <Tallies head="الطَّائِرُ المُفَضَّلُ" rows={BIRDS} />
                <Pics title="الطَّائِرُ المُفَضَّلُ" rows={BIRDS} per={2} cells={2} keyText="🕊️ = ٢" reveal={false} />
              </Stack>
            </TableBox>
          }
        />
      ),
    },

    /* ================= أتدرب ٣–٤ ================= */
    {
      sec: 'practice', min: 3,
      notes: 'المفتاح هنا: كل صورة = استجابة واحدة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={3} time={120}
          question={USE}
          hint="كَمْ صُورَةً لِكُلِّ إِشَارَةٍ؟"
          steps={[
            { text: 'بُرْتُقَالٌ ٦، وَعِنَبٌ ١', hl: ['v0', 'v1'] },
            { text: 'مَوْزٌ ٥، وَفَرَاوِلَةٌ ٢', hl: ['v0', 'v1', 'v2', 'v3'] },
            { text: 'تُفَّاحٌ ٧', hl: ['v0', 'v1', 'v2', 'v3', 'v4'] },
          ]}
          chart={
            <TableBox>
              <Stack>
                <Tallies head="الفَاكِهَةُ المُفَضَّلَةُ" rows={FRUIT} tone="green" />
                <Pics title="الفَاكِهَةُ المُفَضَّلَةُ" rows={FRUIT} per={1} cells={7} keyText="المِفْتَاحُ: كُلُّ صُورَةٍ = اسْتِجَابَةٌ وَاحِدَةٌ" />
              </Stack>
            </TableBox>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'أكمل عمود العدد أولًا، ثم اقسم على ٢.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={4} time={120}
          question={USE}
          hint="كَمْ إِشَارَةً فِي كُلِّ صَفٍّ؟"
          steps={[
            { text: 'الْعَدَدُ: ٤، وَ١٠، وَ٤' },
            { text: 'الْحَافِلَةُ صُورَتَانِ، وَالْمَشْيُ ٥ صُوَرٍ', hl: ['v0', 'v1'] },
            { text: 'السَّيَّارَةُ صُورَتَانِ', hl: ['v0', 'v1', 'v2'] },
          ]}
          chart={
            <TableBox>
              <Stack>
                <Tallies head="طَرِيقَةُ الذَّهَابِ إِلَى الْمَدْرَسَةِ" rows={SCHOOL} count />
                <Pics title="طَرِيقَةُ الذَّهَابِ إِلَى الْمَدْرَسَةِ" rows={SCHOOL} per={2} cells={5} keyText="المِفْتَاحُ: كُلُّ صُورَةٍ = اسْتِجَابَتَيْنِ" />
              </Stack>
            </TableBox>
          }
        />
      ),
    },

    /* ================= أحل المسألة ٥–٧ ================= */
    {
      sec: 'practice', min: 5,
      notes: 'س٥: ٩ طلاب في ٣ صور: كل صورة = ٣. س٦: كل صورة = ٣ إشارات. س٧: ٤ صور × ٣.',
      content: (
        <BookGroup
          source={SOLVE}
          qs={[
            { n: 5, question: "اسْتِعْمَالُ الْبَيَانَاتِ: صَوَّتَ ٩ طُلَّابٍ لِمَادَّةِ الرِّيَاضِيَّاتِ. مَا الْمِفْتَاحُ الْمُنَاسِبُ لِتَمْثِيلِ ذَلِكَ الْعَدَدِ؟",
              steps: [
            { text: 'لِلرِّيَاضِيَّاتِ ٣ صُوَرٍ', hl: ['p0'] },
            { text: <Eq>٣ + ٣ + ٣ = ٩</Eq> },
            { text: 'كُلُّ صُورَةٍ = ٣ اسْتِجَابَاتٍ', kind: 'ans', label: 'الْمِفْتَاحُ' },
          ] },
            { n: 6, question: 'أُكْمِلُ جَدْوَلَ الإِشَارَاتِ.',
              steps: [
            { text: 'الرِّيَاضِيَّاتُ ٩، وَالْقِرَاءَةُ ٣', hl: ['v0', 'v1'] },
            { text: 'التَّرْبِيَةُ الْبَدَنِيَّةُ ١٢', hl: ['v0', 'v1', 'v2'] },
          ] },
            { n: 7, question: 'كَمْ طَالِبًا اخْتَارَ التَّرْبِيَةَ الْبَدَنِيَّةَ؟',
              steps: [
            { text: 'التَّرْبِيَةُ الْبَدَنِيَّةُ ٤ صُوَرٍ', hl: ['p2'] },
            { text: <Eq>٣ + ٣ + ٣ + ٣ = ١٢</Eq> },
            { text: '١٢ طَالِبًا', kind: 'ans', label: 'التَّرْبِيَةُ الْبَدَنِيَّةُ' },
          ] },
          ]}
          chart={
            <TableBox>
            <Stack>
              <Pics title="المَادَّةُ المُفَضَّلَةُ" rows={SUBJECTS} per={3} cells={4} keyText="المِفْتَاحُ: كُلُّ صُورَةٍ = …… اسْتِجَابَاتٍ" reveal={false} />
              {/* جدول الكتاب الفارغ: إشاراته تظهر مع إجابة السؤال ٦ */}
              <DataGrid tone="blue" head={['المَادَّةُ المُفَضَّلَةُ', 'الإشاراتُ']}
                rows={SUBJECTS.map(([l, ic, n], i) => [`${ic} ${l}`, { tally: n, k: `v${i}` as HlKey }])} />
            </Stack>
            </TableBox>
          }
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
            center={<>التَّمْثِيلُ<br />بِالصُّوَرِ</>}
            items={[
              { kind: 'rule', cap: 'مِنْ أَيْنَ؟', text: 'مِنْ جَدْوَلِ الْإِشَارَاتِ.' },
              { kind: 'ex', cap: 'الصُّورَةُ', text: 'تُمَثِّلُ اسْتِجَابَةً أَوْ أَكْثَرَ.' },
              { kind: 'qs', cap: 'الْمِفْتَاحُ', text: 'يُبَيِّنُ كَمْ تُمَثِّلُ كُلُّ صُورَةٍ.' },
              { kind: 'warn', cap: 'أَنْتَبِهُ', text: 'إِذَا كَانَتِ الصُّورَةُ = ٢، نَرْسُمُ صُورَةً لِكُلِّ اثْنَيْنِ.' },
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
          <ExitTicket>
            <MCQ q="الْمِفْتَاحُ: كُلُّ صُورَةٍ = ١. كَمْ صُورَةً لِـ ٣ طُلَّابٍ؟" options={['١', '٣', '٦']} answer="٣" />
            <MCQ q="الْمِفْتَاحُ: كُلُّ صُورَةٍ = ٢. كَمْ صُورَةً لِـ ٨ طُلَّابٍ؟" options={['٤', '٨', '٢']} answer="٤" />
            <MCQ q="الْمِفْتَاحُ: كُلُّ صُورَةٍ = ٥. فِي الصَّفِّ ٣ صُوَرٍ. كَمْ طَالِبًا؟" options={['٨', '١٥', '٣']} answer="١٥" />
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
