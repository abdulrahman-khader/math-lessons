import { useState } from 'react';
import {
  Card, Cols, Ctrls, DataGrid, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, QCol, QuestionSlide, SlideHead, Solution, Stack,
  Step, Tally, Winner, defineLesson, num, type Cell, type HlKey,
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

/** لوحة إشارات تفاعلية: كل ضغطة على صف تضيف إشارة، والعدد يظهر بجانبها */
function TallyMaker({ labels }: { labels: string[] }) {
  const [n, setN] = useState(labels.map(() => 0));
  const add = (i: number, d: number) => setN((v) => v.map((x, j) => (j === i ? Math.max(0, x + d) : x)));
  const total = n.reduce((a, b) => a + b, 0);
  return (
    <div className="tmaker">
      <table className="dgrid green">
        <thead>
          <tr><th>الإجابةُ</th><th>أضِفْ</th><th>إشاراتُ العدِّ</th><th>العددُ</th></tr>
        </thead>
        <tbody>
          {labels.map((l, i) => (
            <tr key={l}>
              <td>{l}</td>
              <td>
                <span className="row" style={{ gap: '.3em', justifyContent: 'center' }}>
                  <button className="btn" aria-label={`أضف إشارة إلى ${l}`} onClick={() => add(i, 1)}>+</button>
                  <button className="btn hide" aria-label={`احذف إشارة من ${l}`} onClick={() => add(i, -1)}>−</button>
                </span>
              </td>
              <td style={{ minWidth: '6em' }}>{n[i] > 0 && <Tally n={n[i]} />}</td>
              <td>{num(n[i])}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <b>عدد الإجابات كلها: {num(total)}</b>
      <button className="btn hide" onClick={() => setN(labels.map(() => 0))}>من جديد</button>
    </div>
  );
}

/** بيانات الكتاب لسؤال الفصل المفضّل وسؤال الإفطار (مثال من كتاب الحلول؛ في الصف يجمعها الطلاب بأنفسهم) */
const SEASONS: Row[] = [['الشِّتاءُ', 3], ['الرَّبيعُ', 2], ['الصَّيْفُ', 4], ['الْخَريفُ', 1]];
const BREAKFAST: Row[] = [['حليبٌ وبيضٌ', 4], ['حليبٌ وجبنٌ', 3], ['حليبٌ وعسلٌ', 3]];
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
          <TallyMaker labels={['🐪 الجمل', '🐎 الحصان', '🐱 القطة', '🐦 العصفور']} />
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
      notes: 'اسأل عشرة طلاب فعلًا وسجّل الإجابات في جدول على السبورة. الأعداد هنا مثال من كتاب الحلول؛ استعمل بيانات صفك إن جمعتها.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={60}
          intro="أَسْأَلُ عَشَرَةَ طُلَّابٍ عَنْ أَيِّ فُصُولِ السَّنَةِ الأَرْبَعَةِ هُوَ الْمُفَضَّلُ لَدَيْهِمْ، ثُمَّ أُسَجِّلُ الْبَيانَاتِ بِالإِشَارَاتِ؛ لأَسْتَعْمِلَهَا فِي الإِجَابَةِ عَنِ الأَسْئِلَةِ الآتِيَةِ:"
          question="مَا الْفَصْلُ الَّذِي يُفَضِّلُهُ أَكْثَرُ الطُّلَّابِ؟"
          hint="أبحث عن الصف الذي فيه أكثر الإشارات."
          steps={[
            { text: 'أكثر الإشارات في صف الصيف: ٤', hl: ['p2'] },
            { text: 'الصَّيْفُ', kind: 'ans' },
          ]}
          chart={<TallyTable head="الْفَصْلُ الْمُفَضَّلُ" rows={SEASONS} />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نجمع: الشتاء ٣ والخريف ١.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} time={60}
          question="مَا عَدَدُ الطُّلَّابِ الَّذِينَ يُفَضِّلُونَ فَصْلَيِ الشِّتَاءِ وَالْخَرِيفِ؟ أَكْتُبُ جُمْلَةً عَدَدِيَّةً لِحَلِّ هَذَا السُّؤَالِ."
          hint="أجمع عدد طلاب الشتاء وعدد طلاب الخريف."
          steps={[
            { text: 'الشتاء ٣، والخريف ١', hl: ['p0', 'p3'] },
            { text: '٣ + ١ = ٤', kind: 'ans' },
          ]}
          chart={<TallyTable head="الْفَصْلُ الْمُفَضَّلُ" rows={SEASONS} />}
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
          chart={<Card kind="ex" cap="خمس إشارات معًا"><div style={{ fontSize: '2.4em', textAlign: 'center' }}><Tally n={10} /></div></Card>}
        />
      ),
    },

    /* ================= أتدرب ٤–٧ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'الأعداد مثال من كتاب الحلول؛ يمكنك جمع بيانات صفك أولًا بلوحة «نعمل معًا».',
      content: (
        <QuestionSlide
          source={PRACTICE} n={4} time={30}
          intro="أَسْأَلُ عَشَرَةَ طُلَّابٍ مَا وَجْبَةُ الإِفْطَارِ الْمُفَضَّلَةُ لَدَيْهِمْ؟ أَجْمَعُ الْبَيَانَاتِ حَوْلَ ذَلِكَ، ثُمَّ أَسْتَعْمِلُ الإِشَارَاتِ؛ لِأُسَجِّلَ تِلْكَ الْبَيَانَاتِ. أَسْتَعْمِلُ الْبَيَانَاتِ فِي الْجَدْوَلِ أَعْلَاهُ لِلإِجَابَةِ عَنِ الأَسْئِلَةِ الآتِيَةِ:"
          question="كَمْ طَالِبًا يُفَضِّلُ الحَلِيبَ وَ البَيْضَ؟"
          hint="أعدّ إشارات الصف الأول."
          steps={[{ text: '٤ طلاب', hl: ['p0'], kind: 'ans' }]}
          chart={<TallyTable head="نَوْعُ الإِفْطَارِ" rows={BREAKFAST} />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'الصف الثاني.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={5} time={30}
          question="كَمْ طَالِبًا يُفَضِّلُ الحَلِيبَ وَ الجُبْنَ؟"
          hint="أعدّ إشارات الصف الثاني."
          steps={[{ text: '٣ طلاب', hl: ['p1'], kind: 'ans' }]}
          chart={<TallyTable head="نَوْعُ الإِفْطَارِ" rows={BREAKFAST} />}
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
          steps={[{ text: 'الحليبُ والبيضُ (٤ طلاب)', hl: ['p0'], kind: 'ans' }]}
          chart={<TallyTable head="نَوْعُ الإِفْطَارِ" rows={BREAKFAST} />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'اسأل الطلاب عن إفطارهم، وأضف إشارة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={7} tps
          question="كَيْفَ يَتَغَيَّرُ الجَدْوَلُ إِذَا أُضِيفَ إِلَيْهِ إِفْطَارِي المُفَضَّلُ؟"
          hint="ماذا أفعل بإجابة جديدة؟"
          steps={[
            { text: 'تُزادُ إشارةٌ واحدةٌ في صفِّ إفطاري المفضَّلِ.' },
            { text: 'فيصيرُ عددُ الإجاباتِ كلِّها ١١ بدلَ ١٠.', kind: 'ans' },
          ]}
          chart={<TallyTable head="نَوْعُ الإِفْطَارِ" rows={BREAKFAST} />}
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
