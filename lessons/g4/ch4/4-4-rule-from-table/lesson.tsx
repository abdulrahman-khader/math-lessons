import { useState } from 'react';
import {
  Blank, Card, Cols, RuleTable, Ctrls, Eq, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, QCard, QCol, QuestionSlide, Sentence, SlideHead,
  Solution, Stack, Step, Tag, ThinkPairShare, TimerButton, Winner, defineLesson, num, type Token,
} from '@engine';
import { IntroClip } from './clip';

/** آلة القاعدة: يختار الطالب مدخلة، فتخرج المخرجة. القاعدة مخفية حتى يخمّنها الصف. */
function RuleMachine() {
  const [shown, setShown] = useState<number[]>([]);
  const rule = (x: number) => x * 4;
  return (
    <div className="machine">
      <div className="row" style={{ gap: '.5em' }}>
        <b>اختر مدخلة:</b>
        {[1, 2, 3, 5, 10].map((x) => (
          <button key={x} className="btn" disabled={shown.includes(x)} onClick={() => setShown((s) => [...s, x])}>
            {num(x)}
          </button>
        ))}
        {shown.length > 0 && (
          <button className="btn hide" onClick={() => setShown([])}>
            من جديد
          </button>
        )}
      </div>
      <div className="mbody">
        <span className="mlabel">المدخلة</span>
        <span className="mbox">؟ القاعدة</span>
        <span className="mlabel">المخرجة</span>
      </div>
      <table className="data">
        <tbody>
          <tr>
            <th>المدخلة △</th>
            {shown.map((x) => <td key={x}>{num(x)}</td>)}
          </tr>
          <tr>
            <th>المخرجة □</th>
            {shown.map((x) => <td key={x}>{num(rule(x))}</td>)}
          </tr>
        </tbody>
      </table>
      {shown.length >= 3 && <MCQ q="ما القاعدة؟" options={['△ + ٣', '△ × ٤', '△ + ٤']} answer="△ × ٤" award />}
    </div>
  );
}

/** خانة العملية المفقودة (الدائرة الرمادية في الكتاب) */
const op = (b: '+' | '−'): Token => ({ b, box: true });

const READY = 'اسْتَعِدَّ · ص ١١٦';
const CHECK = 'تأكَّدْ · ص ١١٨';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ · ص ١١٨';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ١١٩';
const TEST = 'تدريبٌ على اختبارٍ · ص ١١٩';
const REVIEW = 'مراجعةٌ تراكميةٌ · ص ١١٩';
const FIND_RULE = 'اِكْتَشِفِ القاعدةَ ثُمَّ طبِّقْهَا لِتُكمِلَ الجدولَ:';
const BUILD = 'في السُّؤاليْنِ ٦ ، ٧ كَوِّنْ جدولًا لتكتشفَ القاعدةَ، ثُمَّ طبِّقْهَا لِتَحُلَّ المسألةَ:';

export default defineLesson({
  meta: {
    id: 'g4-4-4-rule-from-table',
    code: '٤-٤',
    title: 'اكْتِشافُ قاعِدةٍ مِن جدولٍ',
    shortTitle: 'اكتشاف قاعدة من جدول',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الرابع: الأنماط والجبر',
    source: 'الجزء الأول · ص ١١٦–١١٩',
    minutes: 45,
    idea: 'أبحثُ عنْ قاعدةٍ مِنْ جدولٍ ثُمَّ أُطبِّقُها لأَحُلَّ مسألةً.',
    bookQuestions: 17,
  },
  sectionDesc: {
    engage: 'تذكّر الأنماط',
    explore: 'استعد · آلة القاعدة',
    explain: 'المفردات · مثال ١ · مثال ٢',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٣',
    practice: 'الأسئلة ٤–٧',
    hot: 'الأسئلة ٨–١٧',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردات الأربع. اسأل: أين رأيتم نمطًا؟ (بلاط، أيام الأسبوع، أرقام المنازل).',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أبحثُ عنْ قاعدةٍ مِنْ جدولٍ ثُمَّ أُطبِّقُها لأَحُلَّ مسألةً.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>النمطُ</Mark> · <Mark>القاعدةُ</Mark> · <Mark>المدخلةُ</Mark> · <Mark>المخرجةُ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أكتشف القاعدة من جدول مدخلات ومخرجات.</li>
                <li>أطبّق القاعدة لأكمل الجدول.</li>
                <li>أكوّن جدولًا لحل مسألة.</li>
                <li>أميّز الأزواج التي تتبع قاعدة معطاة.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الأنماط. اختر طالبًا بالعجلة لكل سؤال، واطلب منه أن يقول: «يزيد كل عدد بمقدار …».',
      content: (
        <>
          <SlideHead tag="تذكّر" kind="ink">ما العدد التالي؟</SlideHead>
          <div className="qgrid two">
            <MCQ q={<>٥ ، ١٠ ، ١٥ ، ٢٠ ، …</>} options={['٢١', '٢٥', '٣٠']} answer="٢٥" award />
            <MCQ q={<>٣ ، ٦ ، ٩ ، ١٢ ، …</>} options={['١٥', '١٣', '١٨']} answer="١٥" award />
          </div>
          <Card kind="qs" cap="سؤال للتفكير">
            في كل نمط هناك <b>شيء ثابت</b> نفعله لنحصل على العدد التالي. ماذا نسمّي هذا الشيء الثابت؟
          </Card>
        </>
      ),
    },

    /* ================= استعد ================= */
    {
      sec: 'explore', min: 3,
      notes: 'فكّر – زاوج – شارك. إن توفرت أقلام فليكوّن الطلاب مثلثين أمامهم. ثم اضغط المسافة.',
      content: (
        <>
          <SlideHead tag={READY} kind="qs">مثلثات يزيد</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">يكوِّنُ يَزيدُ ٥ مثلَّثاتٍ منفصلةٍ باستعمالِ الأقلامِ. إذَا استعملَ ٣ أقلامٍ للمثلثِ الأوَّلِ وَ ٣ أقلامٍ أُخرى للمُثلَّثِ الثَّانِي، فكمْ قلمًا يحتاجُ لِتكْوينِ ٥ مُثلَّثاتٍ؟</p>
              <ThinkPairShare />
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>كل مثلث يحتاج ٣ أقلام.</Step>
                <Step kind="ans"><Eq>٥ × ٣ = ١٥</Eq> قلمًا</Step>
              </Solution>
            </QCol>
            <svg viewBox="0 0 520 140" style={{ width: '100%' }} role="img" aria-label="خمسة مثلثات من الأقلام">
              {Array.from({ length: 5 }, (_, i) => {
                const x = 500 - i * 100;
                return <polygon key={i} points={`${x},120 ${x - 80},120 ${x - 40},40`} fill="none" stroke="#2f3f9e" strokeWidth={9} strokeLinejoin="round" />;
              })}
            </svg>
          </Cols>
        </>
      ),
    },
    {
      sec: 'explore', min: 3,
      notes: 'ادعُ طالبًا يختار مدخلات، والصف يخمّن القاعدة المخفية بعد ثلاث مدخلات على الأقل.',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">آلة القاعدة</SlideHead>
          <RuleMachine />
        </>
      ),
    },

    /* ================= المفردات ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ النص من الكتاب، وأشر إلى كل كلمة في الجدول: المدخلة (عدد المثلثات)، القاعدة، المخرجة (عدد الأقلام).',
      content: (
        <>
          <SlideHead tag="القاعدة · ص ١١٦" kind="rule">النمط والقاعدة</SlideHead>
          <Card kind="rule" style={{ fontSize: '1em', fontWeight: 700, lineHeight: 1.9 }}>
            عددُ الأقلامِ الَّتِي استعمَلَهَا يزيدُ يتبعُ <Mark>نمطًا</Mark> يمكن اكتشافُ <Mark>قاعدتِهِ</Mark> وتوسعتُهُ، حيثُ تخبرُكَ قاعدةُ النمطِ ماذا تفعلُ في العددِ الأولِ المُسمَّى <Mark>مدخلةً</Mark>؛ للحصولِ علَى العددِ الجديدِ والمُسمَّى <Mark>مخرجةً</Mark>.
          </Card>
          <div className="row" style={{ justifyContent: 'center', gap: '1em', fontSize: '1.2em', fontWeight: 800 }}>
            <Card kind="ex" cap="المدخلة">عدد المثلثات</Card>
            <span>←</span>
            <Card kind="qs" cap="القاعدة">△ × ٣</Card>
            <span>←</span>
            <Card kind="rule" cap="المخرجة">عدد الأقلام</Card>
          </div>
        </>
      ),
    },

    /* ================= مثال ١ ================= */
    {
      sec: 'explain', min: 4,
      notes: 'أنا أعمل: الخطوة ١ اكتشف القاعدة من الصفوف الثلاثة الأولى، الخطوة ٢ طبّقها على ٤ و٥.',
      content: (
        <>
          <SlideHead tag="مثال ١ · من واقع الحياة · ص ١١٦" kind="ex">اكتشاف قاعدة وتطبيقها</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext"><b style={{ color: 'var(--ex)' }}>الهَنْدَسةُ:</b> أَوْجِدْ عددَ الأقلامِ الَّتِي يحتاجُ إليهَا يزيدُ لِيكوِّنَ ٥ مُثلَّثاتٍ. أَنْشِئْ جدولًا لتكتشفَ القَاعدةَ، ثُمَّ طبِّقْهَا.</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step><b>الخطوة ١ اكتشف القاعدة:</b> <Eq>١ × ٣ = ٣</Eq> ، <Eq>٢ × ٣ = ٦</Eq> ، <Eq>٣ × ٣ = ٩</Eq></Step>
                <Step>يزداد كل عدد عن سابقه بمقدار ٣، والضرب جمع مكرر، فالقاعدة: اضربْ عددَ المُثلَّثاتِ في ٣ أو «△ × ٣».</Step>
                <Step><b>الخطوة ٢ طبّق القاعدة:</b> <Eq>٤ × ٣ = ١٢</Eq> ، <Eq>٥ × ٣ = ١٥</Eq></Step>
                <Step kind="ans">إِذَنْ يحتاجُ يزيدُ إلى ١٥ قلمًا لِيُكوِّنَ ٥ مُثلَّثاتٍ.</Step>
              </Solution>
            </QCol>
            <table className="data ruletbl col">
              <thead>
                <tr><th colSpan={2} style={{ background: '#a8d5ba' }}>القاعدةُ: △ × ٣</th></tr>
                <tr><th>عددُ المُثلَّثاتِ</th><th>عددُ الأقلامِ</th></tr>
              </thead>
              <tbody>
                <tr><td>١</td><td>٣</td></tr>
                <tr><td>٢</td><td>٦</td></tr>
                <tr><td>٣</td><td>٩</td></tr>
                <tr><td>٤</td><td><Blank v={12} box /></td></tr>
                <tr><td>٥</td><td><Blank v={15} box /></td></tr>
              </tbody>
            </table>
          </Cols>
        </>
      ),
    },

    /* ================= مثال ٢ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'هنا القاعدة جمع لا ضرب: الفرق بين المدخلة والمخرجة ثابت (٥).',
      content: (
        <>
          <SlideHead tag="مثال ٢ · من واقع الحياة · ص ١١٧" kind="ex">قاعدة بالجمع</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext"><b style={{ color: 'var(--ex)' }}>نقودٌ:</b> يزيدُ ما معَ جمانةَ منْ نقودٍ علَى مَا معَ ميسونَ بـ ٥ ريالاتٍ. أوجدْ مقدارَ مَا معَ جمانةَ منْ نقودٍ، عندَمَا يكونُ مَا معَ ميسونَ ٦، ٧، ٨، ٩ ريالاتٍ.</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step><b>الخطوة ١ اكتشف القاعدة:</b> أضفْ ٥ ريالاتٍ لِمَا معَ ميسونَ، أو «△ + ٥».</Step>
                <Step><b>الخطوة ٢ طبّق القاعدة:</b> <Eq>٨ + ٥ = ١٣</Eq> ، <Eq>٩ + ٥ = ١٤</Eq></Step>
                <Step kind="ans">إِذَنْ مَا معَ جمانةَ يصبحُ ١١، ١٢، ١٣، ١٤ ريالًا.</Step>
              </Solution>
              <Card kind="warn" cap="تذكّر">يساعدُكَ إنشاءُ جدولٍ على اكتشافِ قاعدةِ النمطِ.</Card>
            </QCol>
            <table className="data ruletbl col">
              <thead>
                <tr><th colSpan={2} style={{ background: '#a8d5ba' }}>القاعدةُ: △ + ٥</th></tr>
                <tr><th>مَا معَ ميسونَ (بالريال) المدخلة (△)</th><th>مَا معَ جمانةَ (بالريال) المخرجة (□)</th></tr>
              </thead>
              <tbody>
                <tr><td>٦</td><td>١١</td></tr>
                <tr><td>٧</td><td>١٢</td></tr>
                <tr><td>٨</td><td><Blank v={13} box /></td></tr>
                <tr><td>٩</td><td><Blank v={14} box /></td></tr>
              </tbody>
            </table>
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: عجلات السيارات (مثال غير أمثلة الكتاب). أوقفه عند السيارة الرابعة واسأل: كم عجلة؟',
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
      notes: 'نعمل معًا: لكل جدول اطلب من طالب أن يجرّب القاعدة على صفين قبل أن يختار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">ما القاعدة؟</SlideHead>
          <div className="qgrid two">
            <Stack>
              <RuleTable rows={[['المدخلة △', [2, 4, 6, 8]], ['المخرجة □', [12, 14, 16, 18]]]} color="#cfe0f5" />
              <MCQ q="ما القاعدة؟" options={['△ × ٦', '△ + ١٠', '△ + ٢']} answer="△ + ١٠" award />
            </Stack>
            <Stack>
              <RuleTable rows={[['المدخلة △', [1, 2, 3, 4]], ['المخرجة □', [7, 14, 21, 28]]]} color="#cfe0f5" />
              <MCQ q="ما المخرجة عندما تكون المدخلة ٦؟" options={['٣٥', '٤٢', '١٣']} answer="٤٢" award />
            </Stack>
          </div>
        </>
      ),
    },

    /* ================= تأكد ١–٣ ================= */
    {
      sec: 'check', min: 2,
      notes: 'جرّب الضرب والجمع: ١ → ٣ قد تكون ×٣ أو +٢. افحص ٢ → ٤: ×٣ تعطي ٦، إذن القاعدة +٢.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={60}
          question="اِكْتَشِفِ القاعدةَ ثُمَّ طبِّقْهَا لِتُكمِلَ الجدولَ:"
          hint="جرّب قاعدة على كل الأعمدة، لا على عمود واحد."
          steps={[
            { text: <><Eq>١ + ٢ = ٣</Eq> ، <Eq>٢ + ٢ = ٤</Eq> ، <Eq>٣ + ٢ = ٥</Eq></> },
            { text: 'القاعدة: المخرجة = المدخلة + ٢' },
            { text: <><Eq>٤ + ٢ = ٦</Eq> ، والعدد الناقص ٦</>, kind: 'ans' },
          ]}
          chart={<RuleTable rule="△ + ٢" rows={[['المدخلة △', [1, 2, 3, 4]], ['المخرجة □', [3, 4, 5, { b: 6 }]]]} />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'كوّن الجدول على السبورة: الرف ١، ٢، ٣ ثم ٤، ٥.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} time={90}
          question="وَضعَ أحمدُ كتابينِ علَى الرَّفِّ الأوَّلِ، وأربعةَ كُتبٍ علَى الرَّفِّ الثَّانِي، وسِتَّةَ كُتبٍ علَى الرَّفِّ الثَّالثِ. إذَا اتَّبعَ النَّمطَ نفسَهُ، فكمْ كتابًا سيضعُهُ أحمدُ علَى الـرَّفِّ الخامسِ؟ أَنْشِئْ جدولًا لتكتشفَ القاعدةَ وتَحُلَّ المسألةَ."
          hint="كم كتابًا يزيد كل رف على الرف الذي قبله؟"
          steps={[
            { text: 'القاعدة: رقم الرف × ٢' },
            { text: <><Eq>٤ × ٢ = ٨</Eq> ، <Eq>٥ × ٢ = ١٠</Eq></> },
            { text: 'يضع على الرف الخامس ١٠ كتب.', kind: 'ans' },
          ]}
          chart={<RuleTable rule="△ × ٢" rows={[['رقم الرف △', [1, 2, 3, 4, 5]], ['عدد الكتب □', [2, 4, 6, { b: 8 }, { b: 10 }]]]} />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'تحدّث: اسأل: كيف نعرف الحد العاشر في ٣، ٦، ٩ دون أن نكتب كل الحدود؟',
      content: (
        <QuestionSlide
          source={CHECK} n={3} tps tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]}
          question="اِشْرَحْ كيفَ يمكنُ لعمليةِ الضَّربِ أنْ تُساعدَكَ على توْسِعَةِ نمطٍ مَا."
          hint="ماذا يحدث عندما يزيد النمط بالمقدار نفسه كل مرة؟"
          steps={[
            { text: 'إذا زاد النمط بمقدار ثابت، فضرب رتبة الحد في هذا المقدار يعطي الحد مباشرة.' },
            { text: <>مثل النمط ٣، ٦، ٩: الحدّ العاشر <Eq>١٠ × ٣ = ٣٠</Eq></>, kind: 'ans' },
          ]}
          chart={<RuleTable rule="△ × ٣" rows={[['الرتبة △', [1, 2, 3, 10]], ['الحد □', [3, 6, 9, { b: 30 }]]]} />}
        />
      ),
    },

    /* ================= تدرب ٤–٥ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'القاعدة ضرب لا جمع: ٧ → ٦٣. في العمود الأخير نعكس: ١٨ ÷ ٩.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={4} time={90}
          intro={FIND_RULE}
          question="يُبيِّنُ الجدولُ المُجاوِرُ عددَ الأشْرِعةِ لعددٍ منَ القَوارِبِ. باعتبارِ أنَّ كلَّ قاربٍ لهُ العددُ نفسُهُ منَ الأشرِعةِ."
          hint="٧ قوارب لها ٦٣ شراعًا. كم شراعًا للقارب الواحد؟"
          steps={[
            { text: <><Eq>٧ × ٩ = ٦٣</Eq> ، <Eq>٤ × ٩ = ٣٦</Eq> ، القاعدة: عدد القوارب × ٩</> },
            { text: <><Eq>٣ × ٩ = ٢٧</Eq></> },
            { text: <>القوارب لـ ١٨ شراعًا: <Eq>٢ × ٩ = ١٨</Eq> ، فالناقصان ٢٧ و٢</>, kind: 'ans' },
          ]}
          chart={<RuleTable rule="△ × ٩" color="#a9c8ec" rows={[['عدد القوارب', [7, 4, 3, { b: 2 }]], ['عدد الأشرعة', [63, 36, { b: 27 }, 18]]]} />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'الفرق ثابت: ٧ − ٢ = ٥، و١٤ − ٩ = ٥.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={5} time={90}
          question="يزيدُ عددُ الصفحاتِ التي قرأتْهَا ليلَى ٥ صفحاتٍ علَى عددِ الصفحاتِ التي قرأتْهَا سمرُ. أوجدْ عددَ الصفحاتِ التي قرأتْهَا ليلَى، عندمَا قرأتْ سمرُ ٢ ، ٥ ، ٩ ، ١٣ صفحةً؟"
          hint="«يزيد … ٥» تعني أن القاعدة جمع."
          steps={[
            { text: 'القاعدة: المخرجة = المدخلة + ٥' },
            { text: <><Eq>٥ + ٥ = ١٠</Eq> ، <Eq>١٣ + ٥ = ١٨</Eq></> },
            { text: 'الناقصان ١٠ و١٨ صفحة.', kind: 'ans' },
          ]}
          chart={<RuleTable rule="△ + ٥" color="#a9c8ec" rows={[['سمر △', [2, 5, 9, 13]], ['ليلى □', [7, { b: 10 }, 14, { b: 18 }]]]} />}
        />
      ),
    },

    /* ================= تدرب ٦–٧ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'كوّن الجدول: ٢٠ بطاقة بـ ١٠٠ ريال، إذن البطاقة بـ ٥ ريالات.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={6} time={90}
          intro={BUILD}
          question="تَبِيعُ مدينةُ الألعابِ البطاقاتِ في مجموعاتٍ (٧ ، ٥ ، ١٠ ، ١٥ ، ٢٠) بطاقةً. إذا كانَ ثمنُ ٢٠ بطاقةً ١٠٠ ريالٍ، فما ثمنُ ٥ بطاقاتٍ؟"
          hint="ابدأ بثمن البطاقة الواحدة."
          steps={[
            { text: <>ثمن البطاقة: <Eq>١٠٠ ÷ ٢٠ = ٥</Eq> ريالات، القاعدة: عدد البطاقات × ٥</> },
            { text: <><Eq>٥ × ٥ = ٢٥</Eq></> },
            { text: 'ثمن ٥ بطاقات ٢٥ ريالًا.', kind: 'ans' },
          ]}
          chart={<RuleTable rule="△ × ٥" color="#a9c8ec" rows={[['عدد البطاقات △', [5, 10, 15, 20]], ['الثمن □', [{ b: 25 }, { b: 50 }, { b: 75 }, 100]]]} />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'رقم الصف × ٥. أكمل الجدول حتى الصف السابع أو طبّق القاعدة مباشرة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={7} time={90}
          question="زرعتْ سعادُ ٥ زهراتٍ في الصَّفِّ الأماميِّ من حديقتِهَا، وزرعتْ ١٠ زهراتٍ في الصَّفِّ الثَّاني، و ١٥ زهرةً في الصَّفِّ الثَّالثِ وهكذا. فما عددُ الأزهارِ في الصَّفِّ السَّابعِ؟"
          hint="كم زهرة يزيد كل صف؟"
          steps={[
            { text: 'القاعدة: رقم الصف × ٥' },
            { text: <><Eq>٧ × ٥ = ٣٥</Eq></> },
            { text: 'في الصف السابع ٣٥ زهرة.', kind: 'ans' },
          ]}
          chart={<RuleTable rule="△ × ٥" color="#a9c8ec" rows={[['رقم الصف △', [1, 2, 3, 7]], ['عدد الأزهار □', [5, 10, 15, { b: 35 }]]]} />}
        />
      ),
    },

    /* ================= مهارات التفكير العليا ٨–١٠ ================= */
    {
      sec: 'hot', min: 1,
      notes: 'تحدٍّ: إجابات كثيرة صحيحة. اطلب من كل زوج قاعدة ضرب مختلفة.',
      content: (
        <QuestionSlide
          source={HOT} n={8} tps tags={[{ kind: 'warn', text: 'تَحَدٍّ' }]}
          question="كَوِّنْ جدولًا يستعملُ قاعدةَ ضَرْبٍ، ثمَّ اكْتُبْ أزواجَ المُدخَلاتِ والمُخرَجاتِ."
          hint="اختر عددًا تضرب فيه، ثم جرّب مدخلات."
          steps={[
            { text: 'مثال: القاعدة: اضربْ في ٣' },
            { text: 'الأزواج: (١، ٣)، (٢، ٦)، (٣، ٩)، (٤، ١٢)', kind: 'ans' },
          ]}
          chart={<RuleTable rule="△ × ٣" rows={[['المدخلة △', [1, 2, 3, 4]], ['المخرجة □', [{ b: 3 }, { b: 6 }, { b: 9 }, { b: 12 }]]]} />}
        />
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'اكتشف المختلف: اضرب العدد الأول في ٦ لكل بطاقة.',
      content: (
        <QuestionSlide
          source={HOT} n={9} tags={[{ kind: 'warn', text: 'اكتشفِ المختلفَ' }]}
          question="عَيِّنْ زوجَ الأعدادِ الَّذِي لا يُمكنُ أن تراهُ في جدولٍ قاعدتُه «اضْرِبْ في ٦ »، ثمَّ اذكرِ السَّببَ."
          hint="اضرب العدد الأول في كل بطاقة في ٦."
          steps={[
            { text: <><Eq>٥ × ٦ = ٣٠</Eq> ، <Eq>١٠ × ٦ = ٦٠</Eq> ، <Eq>٧ × ٦ = ٤٢</Eq></> },
            { text: <>البطاقة ٨ وَ ٢٤ مختلفة؛ لأنَّ <Eq>٨ × ٦ = ٤٨</Eq> وليس ٢٤</>, kind: 'ans' },
          ]}
          chart={<MCQ options={['٥ وَ ٣٠', '٨ وَ ٢٤', '١٠ وَ ٦٠', '٧ وَ ٤٢']} answer="٨ وَ ٢٤" award />}
        />
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'أكتب: كل طالب يكتب خطوات في دفتره، ثم اقرأ إجابتين.',
      content: (
        <QuestionSlide
          source={HOT} n={10} tps tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="كيفَ تكتشفُ القاعدةَ مِن جدولٍ."
          hint="ماذا أفعل بكل مدخلة ومخرجتها؟"
          steps={[
            { text: 'أُقارنُ كلَّ مُدخَلةٍ بمُخرَجَتِها، وأبحثُ عن عمليةٍ واحدةٍ (جمع أو ضرب) تصحُّ في جميعِ الأعمدةِ.' },
            { text: 'ثمَّ أتحقّقُ منها على كل الأزواج قبل أن أطبّقها.', kind: 'ans' },
          ]}
          chart={<Card kind="ex" cap="خطوات">١) أقارن · ٢) أجرّب عملية · ٣) أتحقق في كل عمود · ٤) أطبّق</Card>}
        />
      ),
    },

    /* ================= تدريب على اختبار ١١–١٣ ================= */
    {
      sec: 'hot', min: 2,
      notes: 'اختيار من متعدد كما في الاختبار. ٣٠ ثانية لكل سؤال.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{TEST}</Tag>
            <TimerButton sec={90} />
          </div>
          <div className="qgrid three">
            <QCard n={11}>
              <div style={{ paddingInlineStart: '1.6em', display: 'flex', flexDirection: 'column', gap: '.3em' }}>
                <p className="qtext" style={{ margin: 0, fontSize: '.72em' }}>يبينُ الجدولُ أدناهُ عددَ الأقلامِ الملونةِ الَّتِي وزَّعهَا مدرسُ التربيةِ الفنيةِ على الطلَّابِ. إذا كانَ كلُّ طالبٍ يحصُلُ علَى العددِ نفسِهِ منَ الأقلامِ. فكمْ قلمًا يحتاجُ المدرسُ لتوزيعِهَا علَى ٨ طلابٍ؟ (الدرس ٤-٤)</p>
                <RuleTable rows={[['عددُ الطلابِ', [3, 4, 6]], ['عددُ الأقلامِ', [15, 20, 30]]]} color="#a9c8ec" />
                <MCQ options={['أ) ٢٠', 'ب) ٣٠', 'جـ) ٣٥', 'د) ٤٠']} answer="د) ٤٠" />
              </div>
            </QCard>
            <QCard n={12}>
              <div style={{ paddingInlineStart: '1.6em' }}>
                <p className="qtext" style={{ margin: 0, fontSize: '.72em' }}>إذَا كانَ ثمنُ قلمِ الحبرِ الواحدِ ٤ ريالاتٍ، وثمنُ قلمينِ ٨ ريالاتٍ، وثمنُ ثلاثةِ أقلامٍ ١٢ ريالًا، فما ثمنُ أربعةِ أقلامٍ؟ (الدرس ٤-٤)</p>
                <MCQ options={['أ) ١٢ ريالًا', 'ب) ١٤ ريالًا', 'جـ) ١٦ ريالًا', 'د) ٢٠ ريالًا']} answer="جـ) ١٦ ريالًا" />
              </div>
            </QCard>
            <QCard n={13}>
              <div style={{ paddingInlineStart: '1.6em' }}>
                <p className="qtext" style={{ margin: 0, fontSize: '.72em' }}>كانَ طولُ فاطمةَ العامَ الماضِي ١٢٨ سم، وأصبحَ طولُهَا هذَا العامَ ١٣٥ سم. اكتُبْ جملةً عدديةً تعبِّرُ عنْ مقدارِ زيادةِ طولِ فاطمةَ عنِ العامِ الماضِي؟ (الدرس ٤-٢)</p>
                <MCQ options={['أ) ١٢٨ + ١٣٥ = ٢٦٣', 'ب) ١٣٥ − ١٢٨ = ٧', 'جـ) ١٣٥ − ١٢٨ = ١٧', 'د) ١٣٥ + ١٢٨ = ٧']} answer="ب) ١٣٥ − ١٢٨ = ٧" />
              </div>
            </QCard>
          </div>
        </>
      ),
    },

    /* ================= مراجعة تراكمية ١٤ ================= */
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٤-٣: ابدأ بفيصل وسمير (متتاليان)، ثم سالم بعد ٢:٣٠.',
      content: (
        <QuestionSlide
          source={REVIEW} n={14} time={120}
          intro="استعمل خطة الاستدلالِ المنطقيِّ لحلِّ المسألةِ التاليةِ: (الدرس ٤-٣)"
          question="كانتْ مواعيدُ دخولِ أربعةِ أشخاصٍ إحدى عياداتِ الأسنانِ هيَ الساعةَ : ١:٠٠ ، ٢:٠٠ ، ٣:٠٠ ، ٤:٠٠ إذَا تأخَّرَ سالمٌ فِي الوصولِ إلَى ما بعدَ الساعةِ ٢:٣٠، ووصلَ فيصلٌ في موعدِهِ بعدَ سميرٍ، أمَّا عليٌّ فلمْ يكُنِ الأولَ ولا الأخيرَ. رتِّبْ هؤلاءِ الأشخاصَ بحسَبِ وقتِ دخولِ كلٍّ منهُمْ إلى عيادةِ الأسنانِ؟"
          hint="سالم: ٣:٠٠ أو ٤:٠٠. علي: ٢:٠٠ أو ٣:٠٠. فيصل بعد سمير مباشرة."
          steps={[
            { text: 'فيصل بعد سمير، وعلي ليس الأول: فسمير ١:٠٠ وفيصل ٢:٠٠.' },
            { text: 'علي ليس الأخير: علي ٣:٠٠، وسالم ٤:٠٠ (بعد ٢:٣٠ ✓).' },
            { text: 'سمير ١:٠٠، فيصل ٢:٠٠، علي ٣:٠٠، سالم ٤:٠٠', kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="المواعيد">
              <div className="row" style={{ justifyContent: 'space-around', fontSize: '1.3em', fontWeight: 800 }}>
                <span>١:٠٠</span><span>٢:٠٠</span><span>٣:٠٠</span><span>٤:٠٠</span>
              </div>
            </Card>
          }
        />
      ),
    },

    /* ================= مراجعة تراكمية ١٥–١٧ ================= */
    {
      sec: 'hot', min: 1,
      notes: 'مراجعة الدرس ٤-٢: هل الناتج أكبر من العدد الأول (جمع) أم أصغر (طرح)؟',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{REVIEW}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>أيُّ منَ العمليَّتينِ ( + ، − ) تجعلُ كلًّا منَ الجُملِ العدديةِ التاليةِ صحيحةً؟ (الدرس ٤-٢)</p>
          <div className="qgrid three" style={{ fontSize: '1.3em' }}>
            <QCard n={15}><div className="flines"><Sentence t={[14, op('+'), 8, '=', 22]} /></div></QCard>
            <QCard n={16}><div className="flines"><Sentence t={[36, op('−'), 6, '=', 30]} /></div></QCard>
            <QCard n={17}><div className="flines"><Sentence t={[28, op('−'), 5, '=', 23]} /></div></QCard>
          </div>
          <Ctrls><NextButton /><TimerButton sec={60} /></Ctrls>
        </>
      ),
    },

    /* ================= الختام ================= */
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب إكمال كل فرع شفهيًا قبل أن تشير إليه.',
      content: (
        <>
          <SlideHead tag="ملخص الدرس" kind="rule">خريطة ذهنية</SlideHead>
          <MindMap
            center={<>اكتشاف قاعدة<br />من جدول</>}
            items={[
              { kind: 'rule', cap: 'المفردات', text: 'المدخلة ← القاعدة ← المخرجة' },
              { kind: 'ex', cap: 'أكتشف', text: 'أقارن كل مدخلة بمخرجتها: جمع أم ضرب؟' },
              { kind: 'qs', cap: 'أتحقّق', text: 'القاعدة تصح في كل الأعمدة لا في عمود واحد.' },
              { kind: 'warn', cap: 'أطبّق', text: 'أستعمل القاعدة لأجد الأعداد الناقصة.' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 2,
      notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">ثلاثة أسئلة</SlideHead>
          <div className="ticket">
            <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="المدخلات ١، ٢، ٣ والمخرجات ٥، ٦، ٧. ما القاعدة؟" options={['△ × ٥', '△ + ٤', '△ + ٥']} answer="△ + ٤" /></Card>
            <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="القاعدة △ × ٤. ما المخرجة عندما تكون المدخلة ٦؟" options={['١٠', '٢٤', '٢٠']} answer="٢٤" /></Card>
            <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="في كل علبة ٨ أقلام. كم علبة تحوي ٥٦ قلمًا؟" options={['٦', '٧', '٨']} answer="٧" /></Card>
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
