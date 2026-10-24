import {
  Card, Cols, Ctrls, DataGrid, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, PicGraph, QCol, QuestionSlide, SlideHead, Solution,
  Stack, Step, Winner, defineLesson, type PicRow,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ · ص ٨٦';
const PRACTICE = 'أتدرَّبُ · ص ٨٧';
const SOLVE = 'أحُلُّ المسألةَ · ص ٨٧';
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
    code: '٤-٢',
    title: 'التَّمْثِيلُ بِالصُّوَرِ',
    shortTitle: 'التمثيل بالصور',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الرابع: تمثيل البيانات وقراءتها',
    source: 'الجزء الأول · ص ٨٦–٨٧',
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
    close: 'ملخص · تذكرة الخروج',
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
              <Card kind="rule" cap="المفردات"><Mark>التَّمْثِيلُ بِالصُّوَرِ</Mark> · <Mark>الْمِفْتَاحُ</Mark></Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, lineHeight: 1.8 }}>
                <li>أرسم صورة لكل استجابة أو أكثر.</li>
                <li>أستعمل المفتاح لأعرف ما تمثّله كل صورة.</li>
                <li>أنقل البيانات من جدول الإشارات إلى الصور.</li>
              </ol>
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
          <SlideHead tag="تذكّر · الدرس ٤-١" kind="ink">جدول الإشارات</SlideHead>
          <Cols>
            <Tallies head="الطَّائِرُ المُفَضَّلُ" rows={BIRDS} />
            <Stack>
              <MCQ q="كم طالبًا يفضّل العصفور؟" options={['٢', '٤', '٥']} answer="٤" award />
              <Card kind="qs" cap="سؤال للتفكير">هل نستطيع أن نعرض هذه البيانات بطريقة أجمل من الخطوط؟</Card>
            </Stack>
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
          <SlideHead tag="أستعدُّ · ص ٨٦" kind="qs">الطائر المفضل</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">جَمَعَتْ سَلْمَى بَيَانَاتٍ حَوْلَ الطَّائِرِ الْمُفَضَّلِ، وَوَضَعَتِ النَّتَائِجَ فِي جَدْوَلِ الإِشَارَاتِ الْمُجَاوِرِ. بَعْدَ ذَلِكَ مَثَّلَتْ سَلْمَى تِلْكَ الْبَيَانَاتِ بِالصُّوَرِ لِعَرْضِهَا بِطَرِيقَةٍ مُخْتَلِفَةٍ.</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step hl={['v0', 'p0']}>حمامة: إشارتان ← صورتان</Step>
                <Step hl={['v0', 'v1', 'p1']} kind="ans">عصفور: ٤ إشارات ← ٤ صور</Step>
              </Solution>
            </QCol>
            <Stack>
              <Tallies head="الطَّائِرُ المُفَضَّلُ" rows={BIRDS} />
              <Pics title="الطَّائِرُ المُفَضَّلُ" rows={BIRDS} per={1} cells={4} keyText="المِفْتَاحُ: كُلُّ طَائِرٍ يُمَثِّلُ اسْتِجَابَةً وَاحِدَةً." />
            </Stack>
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
          <SlideHead tag="القاعدة · ص ٨٦" kind="rule">المفتاح</SlideHead>
          <Card kind="rule" style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.9 }}>
            يُمْكِنُنِي أَنْ أَعْرِضَ الْبَيَانَاتِ <Mark>مُمَثَّلَةً بِالصُّوَرِ</Mark>. وَأَسْتَعْمِلُ <Mark>الْمِفْتَاحَ</Mark> لِأُبَيِّنَ عَدَدَ الاسْتِجَابَاتِ الَّتِي تُمَثِّلُهَا كُلُّ صُورَةٍ.
          </Card>
          <Cols even>
            <Card kind="ex" cap="كل صورة = استجابة واحدة">
              <Pics title="٤ عصافير" rows={[['عُصْفُورٌ', '🐤', 4, '#c8e6c9']]} per={1} keyText="🐤 = ١" reveal={false} />
            </Card>
            <Card kind="qs" cap="كل صورة = استجابتان">
              <Pics title="٤ عصافير" rows={[['عُصْفُورٌ', '🐤', 4, '#c8e6c9']]} per={2} cells={4} keyText="🐤 = ٢" reveal={false} />
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
          <div className="qgrid three">
            <MCQ q="المفتاح: كل صورة = ١. كم صورة نرسم لـ ٥ طلاب؟" options={['١', '٥', '١٠']} answer="٥" award />
            <MCQ q="المفتاح: كل صورة = ٢. كم صورة نرسم لـ ٦ طلاب؟" options={['٦', '٣', '١٢']} answer="٣" award />
            <MCQ q="المفتاح: كل صورة = ٢. رسمنا ٤ صور. كم طالبًا؟" options={['٤', '٢', '٨']} answer="٨" award />
          </div>
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
          intro={USE}
          question="أُمَثِّلُ بِالصُّوَرِ بَيَانَاتِ الْحَيَوَانِ الْمُفَضَّلِ (الْمِفْتَاحُ: كُلُّ حَيَوَانٍ يُمَثِّلُ اسْتِجَابَتَيْنِ)."
          hint="كل صورة = ٢. كم مرة يدخل ٢ في كل عدد؟"
          steps={[
            { text: 'السمكة ١٠ ← ٥ صور', hl: ['v0'] },
            { text: 'الطائر ٦ ← ٣ صور', hl: ['v0', 'v1'] },
            { text: 'القطة ١٢ ← ٦ صور', hl: ['v0', 'v1', 'v2'] },
            { text: 'الأرنب ٢ ← صورة واحدة', hl: ['v0', 'v1', 'v2', 'v3'], kind: 'ans' },
          ]}
          chart={
            <div className="pgpair">
              <Tallies head="الحَيَوَانُ المُفَضَّلُ" rows={PETS} />
              <Pics title="الحَيَوَانُ المُفَضَّلُ" rows={PETS} per={2} cells={7} keyText="المِفْتَاحُ: كُلُّ حَيَوَانٍ يُمَثِّلُ اسْتِجَابَتَيْنِ" />
            </div>
          }
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'أتحدث: اطلب من طالبين أن يشرحا.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} tps tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="كَيْفَ أُفَرِّقُ بَيْنَ التَّمْثِيلِ بِالصُّوَرِ وَجَدْوَلِ الإِشَارَاتِ؟"
          hint="ماذا تمثّل الإشارة؟ وماذا تمثّل الصورة؟"
          steps={[
            { text: 'الإشارةُ تمثّلُ استجابةً واحدةً دائمًا.' },
            { text: 'أمّا الصورةُ فقد تمثّلُ عدّةَ استجاباتٍ حسبَ المفتاحِ.', kind: 'ans' },
          ]}
          chart={
            <div className="pgpair">
              <Tallies head="الطَّائِرُ المُفَضَّلُ" rows={BIRDS} />
              <Pics title="الطَّائِرُ المُفَضَّلُ" rows={BIRDS} per={2} cells={2} keyText="🕊️ = ٢" reveal={false} />
            </div>
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
          intro={USE}
          question="أُمَثِّلُ بِالصُّوَرِ بَيَانَاتِ الْفَاكِهَةِ الْمُفَضَّلَةِ (الْمِفْتَاحُ: كُلُّ صُورَةٍ = اسْتِجَابَةٌ وَاحِدَةٌ)."
          hint="كل إشارة = صورة واحدة."
          steps={[
            { text: 'برتقال ٦ صور، عنب صورة واحدة', hl: ['v0', 'v1'] },
            { text: 'موز ٥ صور، فراولة صورتان', hl: ['v0', 'v1', 'v2', 'v3'] },
            { text: 'تفاح ٧ صور', hl: ['v0', 'v1', 'v2', 'v3', 'v4'], kind: 'ans' },
          ]}
          chart={
            <div className="pgpair">
              <Tallies head="الفَاكِهَةُ المُفَضَّلَةُ" rows={FRUIT} tone="green" />
              <Pics title="الفَاكِهَةُ المُفَضَّلَةُ" rows={FRUIT} per={1} cells={7} keyText="المِفْتَاحُ: كُلُّ صُورَةٍ = اسْتِجَابَةٌ وَاحِدَةٌ" />
            </div>
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
          question="أُمَثِّلُ بِالصُّوَرِ بَيَانَاتِ طَرِيقَةِ الذَّهَابِ إِلَى الْمَدْرَسَةِ (الْمِفْتَاحُ: كُلُّ صُورَةٍ = اسْتِجَابَتَيْنِ)."
          hint="أعدّ الإشارات أولًا، ثم أقسم على ٢."
          steps={[
            { text: 'العدد: الحافلة ٤، المشي ١٠، السيارة ٤' },
            { text: 'الصور: الحافلة ٢، المشي ٥', hl: ['v0', 'v1'] },
            { text: 'السيارة صورتان', hl: ['v0', 'v1', 'v2'], kind: 'ans' },
          ]}
          chart={
            <div className="pgpair">
              <Tallies head="طَرِيقَةُ الذَّهَابِ إِلَى الْمَدْرَسَةِ" rows={SCHOOL} count />
              <Pics title="طَرِيقَةُ الذَّهَابِ إِلَى الْمَدْرَسَةِ" rows={SCHOOL} per={2} cells={5} keyText="المِفْتَاحُ: كُلُّ صُورَةٍ = اسْتِجَابَتَيْنِ" />
            </div>
          }
        />
      ),
    },

    /* ================= أحل المسألة ٥–٧ ================= */
    {
      sec: 'practice', min: 2,
      notes: '٩ طلاب في ٣ صور: كل صورة = ٣.',
      content: (
        <QuestionSlide
          source={SOLVE} n={5} time={60}
          question="اسْتِعْمَالُ الْبَيَانَاتِ: صَوَّتَ ٩ طُلَّابٍ لِمَادَّةِ الرِّيَاضِيَّاتِ. مَا الْمِفْتَاحُ الْمُنَاسِبُ لِتَمْثِيلِ ذَلِكَ الْعَدَدِ؟"
          hint="كم صورة للرياضيات؟ ٩ موزّعة على هذه الصور."
          steps={[
            { text: 'للرياضيات ٣ صور تمثّل ٩ طلاب.', hl: ['p0'] },
            { text: 'الْمِفْتَاحُ: كُلُّ صُورَةٍ = ٣ اسْتِجَابَاتٍ؛ لأنَّ ٣ + ٣ + ٣ = ٩', kind: 'ans' },
          ]}
          chart={<Pics title="المَادَّةُ المُفَضَّلَةُ" rows={SUBJECTS} per={3} cells={4} keyText="المِفْتَاحُ: كُلُّ صُورَةٍ = …… اسْتِجَابَاتٍ" reveal={false} />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'كل صورة = ٣ إشارات.',
      content: (
        <QuestionSlide
          source={SOLVE} n={6} time={90}
          question="أُكْمِلُ جَدْوَلَ الإِشَارَاتِ."
          hint="كل صورة = ٣. أعدّ الصور في كل صف."
          steps={[
            { text: 'الرياضيات ٣ صور ← ٩ إشارات', hl: ['p0'] },
            { text: 'القراءة صورة واحدة ← ٣ إشارات', hl: ['p1'] },
            { text: 'التربية البدنية ٤ صور ← ١٢ إشارة', hl: ['p2'], kind: 'ans' },
          ]}
          chart={
            <Stack>
              <Pics title="المَادَّةُ المُفَضَّلَةُ" rows={SUBJECTS} per={3} cells={4} keyText="المِفْتَاحُ: كُلُّ صُورَةٍ = ٣ اسْتِجَابَاتٍ" reveal={false} />
              <Step><Tallies head="المَادَّةُ المُفَضَّلَةُ" rows={SUBJECTS} /></Step>
            </Stack>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: '٤ صور × ٣.',
      content: (
        <QuestionSlide
          source={SOLVE} n={7} time={30}
          question="كَمْ طَالِبًا اخْتَارَ التَّرْبِيَةَ الْبَدَنِيَّةَ؟"
          hint="٤ صور، وكل صورة = ٣."
          steps={[
            { text: '٣ + ٣ + ٣ + ٣', hl: ['p2'] },
            { text: '١٢ طالبًا', kind: 'ans' },
          ]}
          chart={<Pics title="المَادَّةُ المُفَضَّلَةُ" rows={SUBJECTS} per={3} cells={4} keyText="المِفْتَاحُ: كُلُّ صُورَةٍ = ٣ اسْتِجَابَاتٍ" reveal={false} />}
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
            center={<>التمثيل<br />بالصور</>}
            items={[
              { kind: 'rule', cap: 'من أين؟', text: 'من جدول الإشارات.' },
              { kind: 'ex', cap: 'الصورة', text: 'تمثّل استجابة أو أكثر.' },
              { kind: 'qs', cap: 'المفتاح', text: 'يبيّن كم تمثّل كل صورة.' },
              { kind: 'warn', cap: 'أنتبه', text: 'إذا كانت الصورة = ٢ أقسم العدد على ٢.' },
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
          <div className="ticket">
            <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="المفتاح: كل صورة = ١. كم صورة لـ ٣ طلاب؟" options={['١', '٣', '٦']} answer="٣" /></Card>
            <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="المفتاح: كل صورة = ٢. كم صورة لـ ٨ طلاب؟" options={['٤', '٨', '٢']} answer="٤" /></Card>
            <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="المفتاح: كل صورة = ٥. في الصف ٣ صور. كم طالبًا؟" options={['٨', '١٥', '٣']} answer="١٥" /></Card>
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
