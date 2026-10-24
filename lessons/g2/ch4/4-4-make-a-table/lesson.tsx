import {
  Card, Cols, Ctrls, DataGrid, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, QCol, QuestionSlide, SlideHead, Solution, Stack, Step,
  Winner, defineLesson, type Cell, type HlKey,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const TRY = 'أُحاوِلُ · ص ٩١';
const PRACTICE = 'أتدرَّبُ · ص ٩١';
const MAKE = 'أُنْشِئُ جَدْوَلًا لِأَحُلَّ الْمَسْأَلَةَ:';

/** جدول أفقي يعدّ بالقفز: العمود j يظهر مع خطوة فيها hl ‹v{j}›، ويُبرز بمفتاح p{j} */
function SkipTable({ top, bottom, a, b, n, step = true }: { top: string; bottom: string; a: number; b: number; n: number; step?: boolean }) {
  const cell = (v: number, j: number): Cell => (step && j > 0 ? { v, k: `v${j}` as HlKey } : v);
  return (
    <DataGrid
      orient="cols"
      tone="green"
      rows={[
        [top, ...Array.from({ length: n }, (_, j) => cell(a * (j + 1), j))],
        [bottom, ...Array.from({ length: n }, (_, j) => cell(b * (j + 1), j))],
      ]}
    />
  );
}

/** خطوات العرض: عمود بعد عمود */
const cols = (n: number) => Array.from({ length: n - 1 }, (_, j) => `v${j + 1}` as HlKey);

export default defineLesson({
  meta: {
    id: 'g2-4-4-make-a-table',
    code: '٤-٤',
    title: 'أَحُلُّ الْمَسْأَلَةَ: أُنْشِئُ جَدْوَلًا',
    shortTitle: 'أحل المسألة: أنشئ جدولًا',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الرابع: تمثيل البيانات وقراءتها',
    source: 'الجزء الأول · ص ٩٠–٩١',
    minutes: 45,
    idea: 'أُنْشِئُ جَدْوَلًا لِأَحُلَّ الْمَسْأَلَةَ.',
    bookQuestions: 4,
  },
  sectionDesc: {
    engage: 'العدّ بالقفز',
    explore: 'كم رغيفًا؟',
    explain: 'أفهم · أخطط · أحل · أتحقق',
    elab: 'نعمل معًا',
    check: 'أحاول ١–٢',
    practice: 'أتدرب ٣–٤',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. ذكّر بالخطوات الأربع.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أُنْشِئُ جَدْوَلًا لِأَحُلَّ الْمَسْأَلَةَ.</Card>
              <Card kind="rule" cap="أتذكّر"><Mark>أَفْهَمُ · أُخَطِّطُ · أَحُلُّ · أَتَحَقَّقُ</Mark></Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, lineHeight: 1.7 }}>
                <li>أكتب المعطيات والمطلوب.</li>
                <li>أُنشئ جدولًا يعدّ بالقفز.</li>
                <li>أقرأ الإجابة من الجدول وأتحقق منها.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة: العدّ بالقفز ================= */
    {
      sec: 'engage', min: 2,
      notes: 'العد بالقفز يساعدنا اليوم. اطلب من الصف العدّ معًا بصوت مرتفع.',
      content: (
        <>
          <SlideHead tag="تذكّر" kind="ink">العدّ بالقفز</SlideHead>
          <div className="qgrid three">
            <MCQ q="٣، ٦، ٩، …" options={['١٠', '١٢', '١١']} answer="١٢" award />
            <MCQ q="٥، ١٠، ١٥، …" options={['٢٠', '١٦', '٢٥']} answer="٢٠" award />
            <MCQ q="٢، ٤، ٦، …" options={['٧', '٨', '١٠']} answer="٨" award />
          </div>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 3,
      notes: 'اقرأ المسألة. اسأل: كم رغيفًا لشخص واحد؟ لشخصين؟ دع الطلاب يخمّنون قبل الجدول.',
      content: (
        <>
          <SlideHead tag="أحُلُّ المسألةَ · ص ٩٠" kind="qs">الخبز مع الإفطار</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">يُقَدِّمُ أَحَدُ الْمَطَاعِمِ ٣ أَرْغِفَةِ خُبْزٍ مَعَ كُلِّ وَجْبَةِ إِفْطَارٍ. إِذَا طَلَبَ ٥ أَشْخَاصٍ وَجْبَةً وَاحِدَةً لِكُلٍّ مِنْهُمْ، فَكَمْ رَغِيفًا يُقَدَّمُ لَهُمْ جَمِيعًا؟</p>
              <Card kind="qs" cap="خمّن">أكثر من ١٠ أرغفة أم أقل؟</Card>
            </QCol>
            <Card kind="ex" cap="وجبة واحدة">
              <div style={{ fontSize: '3em', textAlign: 'center' }}>🫓🫓🫓</div>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= أفهم · أخطط · أحل · أتحقق ================= */
    {
      sec: 'explain', min: 6,
      notes: 'أنا أعمل: الخطوات الأربع كما في الكتاب. مع «أحل» تظهر أعمدة الجدول واحدًا بعد الآخر.',
      content: (
        <>
          <SlideHead tag="أفهم · أخطط · أحل · أتحقق · ص ٩٠" kind="ex">أُنشئ جدولًا</SlideHead>
          <Cols style={{ gridTemplateColumns: '1fr 1.1fr' }}>
            <QCol>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step><b>أَفْهَمُ:</b> المعطيات: ٣ أرغفة مع كل وجبة، و٥ أشخاص طلب كلٌّ منهم وجبة واحدة. المطلوب: عدد الأرغفة جميعها.</Step>
                <Step><b>أُخَطِّطُ:</b> أُنشئُ جدولًا يقابلُ عددَ الوجباتِ بعددِ الأرغفةِ، وأعدُّ بالثلاثاتِ حتى ٥ وجباتٍ.</Step>
                <Step hl={cols(5)}><b>أَحُلُّ:</b> عدد الوجبات ١، ٢، ٣، ٤، ٥ ويقابلها عدد الأرغفة ٣، ٦، ٩، ١٢، ١٥</Step>
                <Step hl={cols(5)} kind="ans">الإجابة: ١٥ رغيفًا</Step>
                <Step hl={cols(5)}><b>أَتَحَقَّقُ:</b> نعم؛ بالجمع المتكرر ٣ + ٣ + ٣ + ٣ + ٣ = ١٥ ✓</Step>
              </Solution>
            </QCol>
            <SkipTable top="عدد الوجبات" bottom="عدد الأرغفة" a={1} b={3} n={5} />
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: عجلات الدراجات (مثال غير مثال الكتاب). أوقفه قبل كل عمود واسأل: كم عجلة؟',
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
      notes: 'نعمل معًا: أكملوا الجدول عمودًا عمودًا بالعد معًا، ثم أجب.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أرجل القطط</SlideHead>
          <Cols>
            <QCol>
              <Card kind="qs">لكل قطة ٤ أرجل. كم رجلًا لـ ٤ قطط؟</Card>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step hl={cols(4)}>نعدّ بالأربعات: ٤، ٨، ١٢، ١٦</Step>
              </Solution>
              <MCQ q="كم رجلًا لـ ٤ قطط؟" options={['١٢', '١٦', '٨']} answer="١٦" award />
            </QCol>
            <SkipTable top="عدد القطط" bottom="عدد الأرجل" a={1} b={4} n={4} />
          </Cols>
        </>
      ),
    },

    /* ================= أحاول ١–٢ ================= */
    {
      sec: 'check', min: 3,
      notes: 'نعدّ بالعشرينات حتى نصل إلى ١٠٠.',
      content: (
        <QuestionSlide
          source={TRY} n={1} time={90}
          intro={MAKE}
          question="يُحِبُّ عَلَاءٌ أَنْ يَلْعَبَ كُرَةَ السَّلَّةِ فِي سَاحَةِ مَنْزِلِهِ؛ لِذَا فَهُوَ يَرْمِي الْكُرَةَ نَحْوَ السَّلَّةِ ٢٠ مَرَّةً فِي الْيَوْمِ. كَمْ يَوْمًا يَحْتَاجُ حَتَّى يَرْمِيَ الْكُرَةَ ١٠٠ مَرَّةٍ؟"
          hint="أعدّ بالعشرينات: ٢٠، ٤٠، … حتى ١٠٠."
          steps={[
            { text: 'نعدّ بالعشرينات: ٢٠، ٤٠، ٦٠، ٨٠، ١٠٠', hl: cols(5) },
            { text: '٥ أيام', kind: 'ans' },
          ]}
          chart={<SkipTable top="عدد الأيام" bottom="عدد الرميات" a={1} b={20} n={5} />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'في كل زوج جوربان.',
      content: (
        <QuestionSlide
          source={TRY} n={2} time={60}
          question="لَدَى ذِكْرَى ٤ أَزْوَاجٍ مِنَ الْجَوَارِبِ فِي دُرْجِ خِزَانَتِهَا. كَمْ جَوْرَبًا فِي الدُّرْجِ؟"
          hint="في كل زوج جوربان. أعدّ بالاثنينات."
          steps={[
            { text: 'نعدّ بالاثنينات: ٢، ٤، ٦، ٨', hl: cols(4) },
            { text: '٨ جوارب', kind: 'ans' },
          ]}
          chart={<SkipTable top="عدد الأزواج" bottom="عدد الجوارب" a={1} b={2} n={4} />}
        />
      ),
    },

    /* ================= أتدرب ٣–٤ ================= */
    {
      sec: 'practice', min: 3,
      notes: 'نعدّ بالعشرات حتى ٦٠.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={3} time={90}
          intro={MAKE}
          question="يُرِيدُ حُسَيْنٌ أَنْ يُوَصِّلَ ٦٠ صُنْدُوقًا إِلَى أَصْحَابِهَا، لَكِنَّ سَيَّارَتَهُ تَسَعُ ١٠ صَنَادِيقَ فَقَطْ. كَمْ مَرَّةً سَيَسْتَعْمِلُ سَيَّارَتَهُ لِيُوَصِّلَ الصَّنَادِيقَ جَمِيعَهَا؟"
          hint="أعدّ بالعشرات حتى ٦٠."
          steps={[
            { text: 'نعدّ بالعشرات: ١٠، ٢٠، ٣٠، ٤٠، ٥٠، ٦٠', hl: cols(6) },
            { text: '٦ مرات', kind: 'ans' },
          ]}
          chart={<SkipTable top="عدد المرات" bottom="عدد الصناديق" a={1} b={10} n={6} />}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'نعدّ بالأربعات حتى ٢٠.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={4} time={90}
          question="يَتَسَلَّمُ مَتْجَرُ بَسَّامٍ عُلَبَ الْعَصِيرِ فِي صَنَادِيقَ يَسَعُ كُلٌّ مِنْهَا ٤ عُلَبٍ. إِذَا كَانَ أَحْمَدُ بِحَاجَةٍ إِلَى ٢٠ عُلْبَةً مِنَ الْعَصِيرِ، فَكَمْ صُنْدُوقًا يَجِبُ أَنْ يَشْتَرِيَ؟"
          hint="أعدّ بالأربعات حتى ٢٠."
          steps={[
            { text: 'نعدّ بالأربعات: ٤، ٨، ١٢، ١٦، ٢٠', hl: cols(5) },
            { text: '٥ صناديق', kind: 'ans' },
          ]}
          chart={<SkipTable top="عدد الصناديق" bottom="عدد العلب" a={1} b={4} n={5} />}
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
            center={<>أُنشئ<br />جدولًا</>}
            items={[
              { kind: 'rule', cap: 'أفهم', text: 'أكتب المعطيات والمطلوب.' },
              { kind: 'ex', cap: 'أخطط', text: 'جدول بصفين: الشيء وعدده.' },
              { kind: 'qs', cap: 'أحل', text: 'أعدّ بالقفز حتى أصل إلى المطلوب.' },
              { kind: 'warn', cap: 'أتحقق', text: 'بالجمع المتكرر.' },
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
            <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="لكل دراجة عجلتان. كم عجلة لـ ٣ دراجات؟" options={['٥', '٦', '٤']} answer="٦" /></Card>
            <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="في كل علبة ٥ أقلام. كم قلمًا في ٤ علب؟" options={['٩', '٢٠', '١٥']} answer="٢٠" /></Card>
            <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="يقرأ سعد ١٠ صفحات كل يوم. كم يومًا ليقرأ ٥٠ صفحة؟" options={['٥', '١٠', '٤']} answer="٥" /></Card>
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
