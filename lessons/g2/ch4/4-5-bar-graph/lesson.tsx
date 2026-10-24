import {
  Card, Cols, Ctrls, DataGrid, GoHomeButton, GridBars, IfTeams, MCQ, Mark, MindMap, NextButton, QCol, QuestionSlide, SlideHead, Solution,
  Stack, Step, Winner, defineLesson, type Cell, type GridBar, type HlKey,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ · ص ٩٤';
const PRACTICE = 'أتدرَّبُ · ص ٩٥';

type Row = [label: string, n: number, color: string];

const bars = (rows: Row[]): GridBar[] => rows.map(([label, n, color]) => ({ label, n, color }));
const upTo = (k: number) => Array.from({ length: k + 1 }, (_, i) => `v${i}` as HlKey);

/** جدول الإشارات؛ count: عمود العدد يمتلئ مع الخطوات (hl ‹c{i}›) */
const Tallies = ({ head, rows, count }: { head: string; rows: Row[]; count?: boolean }) => (
  <DataGrid
    tone={count ? 'green' : 'blue'}
    head={count ? [head, 'الإشاراتُ', 'العددُ'] : [head, 'الإشاراتُ']}
    rows={rows.map(([l, n]) => (count ? [l, { tally: n }, { v: n, k: `v${rows.findIndex((r) => r[0] === l)}` as HlKey } as Cell] : [l, { tally: n }]))}
  />
);

const PASTRY: Row[] = [['فَطِيرَةُ الْجُبْنِ', 4, '#6aaee6'], ['فَطِيرَةُ الْبَيْضِ', 5, '#f6a54a'], ['فَطِيرَةُ الْمُرَبَّى', 2, '#5fbf87']];
const FOOD: Row[] = [['الْفُولُ', 3, '#f6a54a'], ['الْجُبْنُ', 4, '#6aaee6'], ['الْفَلَافِلُ', 2, '#5fbf87'], ['الزَّعْتَرُ', 1, '#b48ad8'], ['الْبَيْضُ', 5, '#f6d84a']];
const SHIRTS: Row[] = [['أَحْمَرُ', 4, '#e8635a'], ['أَزْرَقُ', 6, '#4f9be0'], ['أَسْوَدُ', 2, '#444b55'], ['أَخْضَرُ', 5, '#4fae3a'], ['أَبْيَضُ', 3, '#e9edf2']];
const HANDS: Row[] = [['الْيُسْرَى', 4, '#f6a54a'], ['الْيُمْنَى', 6, '#4f9be0']];

export default defineLesson({
  meta: {
    id: 'g2-4-5-bar-graph',
    code: '٤-٥',
    title: 'التَّمْثِيلُ بِالأَعْمِدَةِ',
    shortTitle: 'التمثيل بالأعمدة',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الرابع: تمثيل البيانات وقراءتها',
    source: 'الجزء الأول · ص ٩٤–٩٥',
    minutes: 45,
    idea: 'أُمَثِّلُ الْبَيَانَاتِ بِالأَعْمِدَةِ مِنْ جَدْوَلِ الإِشَارَاتِ.',
    bookQuestions: 5,
  },
  sectionDesc: {
    engage: 'تذكّر التمثيل بالصور',
    explore: 'من الإشارات إلى المربعات',
    explain: 'الشكلان',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٢',
    practice: 'الأسئلة ٣–٥',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردة. اسأل: أين رأيتم أعمدة؟ (مباني، أعمدة الإنارة).',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أُمَثِّلُ الْبَيَانَاتِ بِالأَعْمِدَةِ مِنْ جَدْوَلِ الإِشَارَاتِ.</Card>
              <Card kind="rule" cap="المفردات"><Mark>التَّمْثِيلُ بِالأَعْمِدَةِ</Mark></Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, lineHeight: 1.7 }}>
                <li>ألوّن مربعًا واحدًا لكل استجابة.</li>
                <li>أمثّل البيانات بأعمدة أفقية أو رأسية.</li>
                <li>أقارن الأعمدة بالنظر إلى طولها.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الدرس ٤-٢.',
      content: (
        <>
          <SlideHead tag="تذكّر · الدرس ٤-٢" kind="ink">التمثيل بالصور</SlideHead>
          <div className="qgrid two">
            <MCQ q="المفتاح: كل صورة = ٢. كم صورة لـ ٦ طلاب؟" options={['٣', '٦', '٢']} answer="٣" award />
            <MCQ q="في جدول الإشارات: |||| كم تعني؟" options={['٣', '٤', '٥']} answer="٤" award />
          </div>
          <Card kind="qs" cap="سؤال للتفكير">هل نستطيع أن نعرض البيانات بمربعات ملوّنة بدل الصور؟</Card>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 4,
      notes: 'كل ضغطة تلوّن عمودًا. اطلب من طالب أن يعدّ المربعات بصوت مرتفع.',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">من الإشارات إلى المربعات</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">أُلَوِّنُ مُرَبَّعًا وَاحِدًا لِكُلِّ اسْتِجَابَةٍ.</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step hl={upTo(0)}>فطيرة الجبن: ٤ مربعات</Step>
                <Step hl={upTo(1)}>فطيرة البيض: ٥ مربعات</Step>
                <Step hl={upTo(2)} kind="ans">فطيرة المربى: مربعان</Step>
              </Solution>
            </QCol>
            <Stack>
              <Tallies head="الإِفْطَارُ الْمُفَضَّلُ" rows={PASTRY} />
              <GridBars title="الإِفْطَارُ الْمُفَضَّلُ" bars={bars(PASTRY)} max={5} catTitle="نَوْعُ الطَّعَامِ" reveal />
            </Stack>
          </Cols>
        </>
      ),
    },

    /* ================= الشكلان ================= */
    {
      sec: 'explain', min: 3,
      notes: 'اقرأ القاعدة. قارن الشكلين: الأفقي والرأسي، والبيانات نفسها.',
      content: (
        <>
          <SlideHead tag="أستعدُّ · ص ٩٤" kind="rule">التمثيل بالأعمدة</SlideHead>
          <Card kind="rule" style={{ fontSize: '.95em', fontWeight: 700, lineHeight: 1.8 }}>
            أَسْتَعْمِلُ <Mark>التَّمْثِيلَ بِالأَعْمِدَةِ</Mark> لِعَرْضِ الْبَيَانَاتِ. وَلِكَيْ أُنَفِّذَ تَمْثِيلًا بِالأَعْمِدَةِ فَإِنَّنِي أُلَوِّنُ مُرَبَّعًا وَاحِدًا لِكُلِّ اسْتِجَابَةٍ. وَيَظْهَرُ التَّمْثِيلُ بِالأَعْمِدَةِ فِي شَكْلَيْنِ مُخْتَلِفَيْنِ.
          </Card>
          <Cols even>
            <Card kind="ex" cap="الشَّكْلُ الأَوَّلُ">
              <GridBars title="الإِفْطَارُ الْمُفَضَّلُ" bars={bars(PASTRY)} max={5} catTitle="نَوْعُ الطَّعَامِ" />
            </Card>
            <Card kind="qs" cap="الشَّكْلُ الثَّانِي">
              <GridBars title="الإِفْطَارُ الْمُفَضَّلُ" bars={bars(PASTRY)} max={5} vertical catTitle="نَوْعُ الطَّعَامِ" />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: وسيلة الذهاب إلى الحديقة (مثال غير مثال الكتاب). أوقفه قبل كل عمود.',
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
          <SlideHead tag="نعمل معًا" kind="ex">الإفطار المفضل</SlideHead>
          <Cols>
            <QCol>
              <MCQ q="كم مربعًا نلوّن لفطيرة البيض؟" options={['٤', '٥', '٢']} answer="٥" award />
              <MCQ q="أيّ عمود أقصر؟" options={['فطيرة الجبن', 'فطيرة البيض', 'فطيرة المربى']} answer="فطيرة المربى" award />
            </QCol>
            <GridBars title="الإِفْطَارُ الْمُفَضَّلُ" bars={bars(PASTRY)} max={5} vertical />
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٢ ================= */
    {
      sec: 'check', min: 3,
      notes: 'كل ضغطة تلوّن صفًا. اطلب من الطلاب التلوين في كتبهم معًا.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={120}
          question="أَسْتَعْمِلُ جَدْوَلَ الإِشَارَاتِ لِتَمْثِيلِ الْبَيَانَاتِ بِالأَعْمِدَةِ:"
          hint="أعدّ إشارات كل صف، وألوّن العدد نفسه من المربعات."
          steps={[
            { text: 'الفول ٣ مربعات، الجبن ٤', hl: upTo(1) },
            { text: 'الفلافل ٢، الزعتر ١', hl: upTo(3) },
            { text: 'البيض ٥ مربعات', hl: upTo(4), kind: 'ans' },
          ]}
          chart={
            <div className="pgpair">
              <Tallies head="الإِفْطَارُ الْمُفَضَّلُ" rows={FOOD} />
              <GridBars title="الإِفْطَارُ الْمُفَضَّلُ" bars={bars(FOOD)} max={5} catTitle="نَوْعُ الطَّعَامِ" reveal />
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
          question="مَا وَجْهُ الاخْتِلَافِ بَيْنَ التَّمْثِيلِ بِالأَعْمِدَةِ وَالتَّمْثِيلِ بِالصُّوَرِ؟"
          hint="ماذا يمثّل المربع؟ وماذا تمثّل الصورة؟"
          steps={[
            { text: 'في التمثيلِ بالأعمدةِ ألوّنُ مربعًا لكلِّ استجابةٍ.' },
            { text: 'وفي التمثيلِ بالصورِ تدلُّ الصورةُ على استجابةٍ أو أكثرَ حسبَ المفتاحِ.', kind: 'ans' },
          ]}
          chart={<GridBars title="الإِفْطَارُ الْمُفَضَّلُ" bars={bars(FOOD)} max={5} />}
        />
      ),
    },

    /* ================= أتدرب ٣–٤ ================= */
    {
      sec: 'practice', min: 3,
      notes: 'أكملوا عمود العدد أولًا، ثم لوّنوا.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={3} time={150}
          question="أُكْمِلُ جَدْوَلَ الإِشَارَاتِ، ثُمَّ أَسْتَعْمِلُهُ لِتَمْثِيلِ الْبَيَانَاتِ بِالأَعْمِدَةِ:"
          hint="العدد = عدد الإشارات = عدد المربعات."
          steps={[
            { text: 'أحمر ٤، أزرق ٦', hl: upTo(1) },
            { text: 'أسود ٢، أخضر ٥', hl: upTo(3) },
            { text: 'أبيض ٣ (طول كل عمود بعدد المربعات نفسه)', hl: upTo(4), kind: 'ans' },
          ]}
          chart={
            <div className="pgpair">
              <Tallies head="لَوْنُ الْقَمِيصِ" rows={SHIRTS} count />
              <GridBars title="لَوْنُ الْقَمِيصِ" bars={bars(SHIRTS)} max={6} catTitle="الأَلْوَانُ" valTitle="عَدَدُ الطُّلَّابِ" reveal tone="#c8e6c9" />
            </div>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'التمثيل هنا رأسي: نلوّن من الأسفل إلى الأعلى.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={4} time={90}
          question="أُكْمِلُ جَدْوَلَ الإِشَارَاتِ، ثُمَّ أَسْتَعْمِلُهُ لِتَمْثِيلِ الْبَيَانَاتِ بِالأَعْمِدَةِ: (يَكْتُبُ بِيَدِهِ الْيُمْنَى أَوِ الْيُسْرَى)"
          hint="ألوّن من الأسفل إلى الأعلى."
          steps={[
            { text: 'اليسرى ٤ مربعات', hl: upTo(0) },
            { text: 'اليمنى ٦ مربعات', hl: upTo(1), kind: 'ans' },
          ]}
          chart={
            <div className="row" style={{ gap: '.6em', alignItems: 'center', fontSize: '.85em' }}>
              <Tallies head="يَكْتُبُ بِالْيَدِ" rows={HANDS} count />
              <GridBars title="يَكْتُبُ بِيَدِهِ الْيُمْنَى أَوِ الْيُسْرَى" bars={bars(HANDS)} max={7} vertical valTitle="عَدَدُ الطُّلَّابِ" reveal />
            </div>
          }
        />
      ),
    },

    /* ================= أتدرب ٥ ================= */
    {
      sec: 'practice', min: 1,
      notes: 'أكتب: كل طالب يكتب جملتين.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={5} tps tags={[{ kind: 'warn', text: 'أكتُبُ' }]}
          question="لِمَاذَا أَحْتَاجُ إِلَى تَمْثِيلِ الْبَيَانَاتِ فِي أَعْمِدَةٍ بَدَلًا مِنْ جَدْوَلِ الإِشَارَاتِ؟"
          hint="انظر إلى التمثيل: كيف تعرف الأكثر بسرعة؟"
          steps={[
            { text: 'لأنَّ الأعمدةَ تُظهرُ المقارنةَ بين الفئاتِ بوضوحٍ وسرعةٍ.' },
            { text: 'فأعرفُ الأكثرَ والأقلَّ بمجرّدِ النظرِ إلى طولِ العمودِ دون عدِّ الإشاراتِ.', kind: 'ans' },
          ]}
          chart={<GridBars title="لَوْنُ الْقَمِيصِ" bars={bars(SHIRTS)} max={6} tone="#c8e6c9" />}
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
            center={<>التمثيل<br />بالأعمدة</>}
            items={[
              { kind: 'rule', cap: 'من أين؟', text: 'من جدول الإشارات.' },
              { kind: 'ex', cap: 'المربع', text: 'مربع ملوّن لكل استجابة.' },
              { kind: 'qs', cap: 'شكلان', text: 'أعمدة أفقية أو رأسية.' },
              { kind: 'warn', cap: 'أقارن', text: 'العمود الأطول = الأكثر.' },
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
            <GridBars title="الفاكهة المفضلة" bars={[{ label: 'تفاح', n: 5, color: '#e8635a' }, { label: 'موز', n: 3, color: '#f6d84a' }, { label: 'عنب', n: 4, color: '#b48ad8' }]} max={6} />
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="كم مربعًا لوّنّا للموز؟" options={['٣', '٤', '٥']} answer="٣" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="ما الفاكهة الأكثر تفضيلًا؟" options={['تفاح', 'موز', 'عنب']} answer="تفاح" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="لو اختار ٢ آخران العنب، كم يصير عموده؟" options={['٤', '٥', '٦']} answer="٦" /></Card>
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
