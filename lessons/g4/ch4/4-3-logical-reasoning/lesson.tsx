import { useState } from 'react';
import {
  Card, Cols, Ctrls, Eq, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, QCol, QuestionSlide, SlideHead, Solution, Stack, Step,
  Winner, defineLesson,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- جدول الترتيب كما في الكتاب: كل معلومة سطر، الأطول يمينًا والأقصر يسارًا ---------- */

function OrderRows({ rows, head = ['الأطولُ', 'الأقصرُ'] }: { rows: { clue: string; order: string[] }[]; head?: [string, string] }) {
  return (
    <div className="orows">
      <div className="orow ohead">
        <span />
        <span className="oends">
          <b>{head[0]}</b>
          <b>{head[1]}</b>
        </span>
      </div>
      {rows.map((r, i) => (
        <Step key={i}>
          <div className="orow">
            <span className="oclue">{r.clue}</span>
            <span className="oletters">
              {r.order.map((x) => (
                <b key={x}>{x}</b>
              ))}
            </span>
          </div>
        </Step>
      ))}
    </div>
  );
}

/** أعمدة بأطوال مختلفة تحت كل منها اسم، الأطول يمينًا */
function Heights({ names, colors }: { names: string[]; colors?: string[] }) {
  const n = names.length;
  return (
    <svg viewBox={`0 0 ${n * 110} 300`} className="heights" role="img" aria-label={names.join('، ')}>
      {names.map((name, i) => {
        const h = 240 - i * (160 / Math.max(1, n - 1));
        const x = (n - 1 - i) * 110 + 20;
        return (
          <g key={name}>
            <rect x={x} y={260 - h} width={70} height={h} rx={10} fill={colors?.[i] ?? '#4f9be0'} stroke="#13213b" strokeWidth={3} />
            <text x={x + 35} y={292} textAnchor="middle" fontSize={26} fontWeight={800} fill="#13213b">
              {name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** لعبة ترتيب: يضغط الطالب الأسماء بالترتيب من الأطول، ثم «تحقق» */
function OrderPuzzle({ names, answer, clues }: { names: string[]; answer: string[]; clues: string[] }) {
  const [pick, setPick] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const ok = checked && pick.join('،') === answer.join('،');
  return (
    <div className="opuzzle">
      <Card kind="qs" cap="المعطيات">
        <ul style={{ margin: 0, paddingInlineStart: '1.2em', lineHeight: 1.8, fontWeight: 700 }}>
          {clues.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Card>
      <p style={{ margin: 0, fontWeight: 700 }}>اضغط الأسماء بالترتيب من الأطول إلى الأقصر:</p>
      <div className="row" style={{ gap: '.5em' }}>
        {names.map((x) => (
          <button key={x} className="btn" disabled={pick.includes(x)} onClick={() => (setPick((p) => [...p, x]), setChecked(false))}>
            {x}
          </button>
        ))}
      </div>
      <div className="oslots">
        {answer.map((_, i) => (
          <span key={i} className={'oslot' + (checked ? (pick[i] === answer[i] ? ' good' : ' bad') : '')}>
            {pick[i] ?? '…'}
          </span>
        ))}
      </div>
      <div className="row" style={{ gap: '.5em' }}>
        <button className="btn primary" disabled={pick.length < answer.length} onClick={() => setChecked(true)}>
          تحقّق
        </button>
        <button className="btn hide" onClick={() => (setPick([]), setChecked(false))}>
          من جديد
        </button>
        {checked && <b style={{ color: ok ? 'var(--good)' : 'var(--bad)' }}>{ok ? 'أحسنت! الترتيب صحيح' : 'راجع المعطيات وحاول مرة أخرى'}</b>}
      </div>
    </div>
  );
}

/** وجه المكعب في السؤال ٨: ٣ × ٣ والمربع الأوسط أحمر */
const CubeFace = () => (
  <svg viewBox="0 0 300 300" style={{ width: '9em', alignSelf: 'center' }} role="img" aria-label="وجه مكعب: ٨ مربعات زرقاء ومربع أحمر في الوسط">
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={(i % 3) * 100} y={Math.floor(i / 3) * 100} width={100} height={100} fill={i === 4 ? '#e8372b' : '#6aaee6'} stroke="#13213b" strokeWidth={6} />
    ))}
  </svg>
);

const PROBLEM = 'يضعُ خمسةٌ منْ طُلَّابِ الفصلِ قُصاصاتِ الورقِ في سلَّةِ المُهمَلاتِ، وقدْ اصْطَفُّوا بعضُهُمْ خلفَ بعضٍ مبتدئِينَ بالأطولِ. فإذَا كان عبدُاللهِ أطولَ مِن بدرٍ، وأقصرَ مِن فهدٍ. وكانَ محمدٌ أقصرَ مِن سُعودٍ، وأطولَ مِن فهدٍ. فمَا التَّرتيبُ الَّذِي اصطفُّوا بهِ؟';
const ANALYZE = 'حَلِّلِ الخُطَّةَ · ص ١١٥';
const PRACTICE = 'تَدَرَّبْ عَلَى الخُطَّةِ · ص ١١٥';
const ANALYZE_INTRO = 'ارجعْ إلى المسألةِ السابقةِ، ثُمَّ أَجِبْ عنِ الأسئلةِ ١ - ٤ :';
const PRACTICE_INTRO = 'اِستعمِلْ خُطَّةَ الاستدلالِ المنطقيِّ لحلِّ المسائلِ التَّاليَةِ:';

export default defineLesson({
  meta: {
    id: 'g4-4-3-logical-reasoning',
    code: '٤-٣',
    title: 'خُطَّةُ حَلِّ الْمَسْأَلَةِ: الاستدلالُ المنطقيُّ',
    shortTitle: 'خطة حل المسألة: الاستدلال المنطقي',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الرابع: الأنماط والجبر',
    source: 'الجزء الأول · ص ١١٤–١١٥',
    minutes: 45,
    idea: 'أَستعملُ خطَّةَ الاستدلالِ المنطقيِّ لأحلَّ المسألةَ.',
    bookQuestions: 11,
  },
  sectionDesc: {
    engage: 'من الأطول؟',
    explore: 'لعبة الترتيب',
    explain: 'افهم · خطط · حل · تحقق',
    elab: 'نعمل معًا',
    check: 'حلل الخطة ١–٤',
    practice: 'تدرب على الخطة ٥–١١',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. اسأل: ما معنى «منطقي»؟ (يُبنى على معلومات صحيحة خطوة بعد خطوة).',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَستعملُ خطَّةَ الاستدلالِ المنطقيِّ لأحلَّ المسألةَ.</Card>
              <Card kind="rule" cap="خطوات حل المسألة"><Mark>افْهَمْ · خَطِّطْ · حُلَّ · تَحَقَّقْ</Mark></Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أستخرج المعطيات والمطلوب من المسألة.</li>
                <li>أرتّب أشياء من معلومات مثل «أطول من» و«أقصر من».</li>
                <li>أبدأ من النهاية عندما أعرف النتيجة.</li>
                <li>أتحقق أن الحل يتفق مع كل المعطيات.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 2,
      notes: 'لغز سريع قبل الدرس. لا تشرح الطريقة؛ اجمع إجابات وتعليلات الطلاب فقط.',
      content: (
        <>
          <SlideHead tag="لغز" kind="qs">من الأطول؟</SlideHead>
          <Cols>
            <QCol>
              <Card kind="qs">ريان أطول من زياد، وزياد أطول من مازن.</Card>
              <MCQ q="من الأطول بين الثلاثة؟" options={['زياد', 'مازن', 'ريان']} answer="ريان" award />
              <MCQ q="ومن الأقصر؟" options={['مازن', 'ريان', 'زياد']} answer="مازن" award />
              <Card kind="ex" cap="سؤال للتفكير">لم يقل أحد إن ريان أطول من مازن. كيف عرفنا؟</Card>
            </QCol>
            <Heights names={['ريان', 'زياد', 'مازن']} colors={['#e8635a', '#4f9be0', '#4fae3a']} />
          </Cols>
        </>
      ),
    },

    /* ================= استكشاف: لعبة الترتيب ================= */
    {
      sec: 'explore', min: 4,
      notes: 'ادعُ طالبًا إلى السبورة ليضغط الأسماء بالترتيب. إن أخطأ، اطلب منه قراءة المعطيات معلومة معلومة. ثم جرّب «من جديد» مع طالب آخر.',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">رتّب الأقلام</SlideHead>
          <OrderPuzzle
            names={['الأزرق', 'الأخضر', 'الأحمر', 'الأصفر']}
            clues={['القلم الأحمر أطول من الأزرق.', 'القلم الأخضر أقصر من الأزرق.', 'القلم الأصفر أقصر من الأخضر.']}
            answer={['الأحمر', 'الأزرق', 'الأخضر', 'الأصفر']}
          />
        </>
      ),
    },

    /* ================= خطة حل المسألة ================= */
    {
      sec: 'explain', min: 6,
      notes: 'أنا أعمل: نفّذ الخطوات الأربع كما في الكتاب. في «حُلَّ» يظهر سطر لكل معلومة: نضع الحرف الجديد في مكانه دون أن نغيّر ما قبله.',
      content: (
        <>
          <SlideHead tag="خُطَّةُ حَلِّ المسألةِ · ص ١١٤" kind="ex">افهم · خطّط · حلّ · تحقّق</SlideHead>
          <p className="qtext" style={{ margin: 0, fontSize: '.82em' }}>{PROBLEM}</p>
          <Cols style={{ gridTemplateColumns: '1fr 1.1fr' }}>
            <QCol>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step><b>افْهَمْ:</b> المعطيات: عبدُالله أطولُ مِن بدرٍ، وأقصرُ مِن فهدٍ. محمدٌ أقصرُ مِن سُعودٍ، وأطولُ مِن فهدٍ. المطلوب: تحديدُ التَّرتيبِ الَّذِي اصطفَّ بِهِ الأصدقاءُ الخمسةُ.</Step>
                <Step><b>خَطِّطْ:</b> ابدأْ باستعمالِ المعلوماتِ المنطقيةِ المعطاةِ لتتوصّلَ إلى الترتيبِ المطلوبِ.</Step>
                <Step><b>حُلَّ:</b> اِستعمِلْ مُعطياتِ المسألةِ لتُرَتِّبَ الأصدقاءَ، حيثُ تبدأُ باستعمالِ المعلوماتِ المَنطِقيَّةِ.</Step>
              </Solution>
            </QCol>
            <Stack>
              <OrderRows
                rows={[
                  { clue: 'عبدُاللهِ أطولُ من بدرٍ', order: ['ع', 'ب'] },
                  { clue: 'عبدُاللهِ أقصرُ من فهدٍ', order: ['ف', 'ع', 'ب'] },
                  { clue: 'محمدٌ أطولُ من فهدٍ', order: ['م', 'ف', 'ع', 'ب'] },
                  { clue: 'محمدٌ أقصرُ من سُعودٍ', order: ['س', 'م', 'ف', 'ع', 'ب'] },
                ]}
              />
              <Step kind="ans">إِذَنِ التَّرتيبُ هوَ: سُعودٌ، محمدٌ، فهدٌ، عبدُاللهِ، بدرٌ.</Step>
              <Step><b>تَحَقَّقْ:</b> راجعِ الحلَّ، سَتجِدُهُ يتَّفِقُ منطقِيًّا مع معطياتِ المسألةِ.</Step>
            </Stack>
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع يرتّب أبراجًا بمعلومات «أعلى من / أقصر من» (مثال غير مثال الكتاب). أوقفه بعد كل معلومة واسأل: أين نضع البرج الجديد؟',
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
      notes: 'نعمل معًا: اقرأ المعطيات، وارسم على السبورة سطرًا لكل معلومة كما في المثال. اختر طالبًا بالعجلة لكل سؤال.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">سباق الجري</SlideHead>
          <Cols>
            <QCol>
              <Card kind="qs">
                في سباق للجري: وصل خالد قبل سلمان، ووصل نواف بعد سلمان، ووصل تركي قبل خالد.
              </Card>
              <MCQ q="من وصل أولًا؟" options={['خالد', 'تركي', 'سلمان', 'نواف']} answer="تركي" award />
              <MCQ q="من وصل ثالثًا؟" options={['سلمان', 'خالد', 'نواف']} answer="سلمان" award />
            </QCol>
            <Card kind="ex" cap="ترتيب الوصول">
              <Ctrls><NextButton /></Ctrls>
              <OrderRows
                head={['الأول', 'الأخير']}
                rows={[
                  { clue: 'خالد قبل سلمان', order: ['خ', 'س'] },
                  { clue: 'نواف بعد سلمان', order: ['خ', 'س', 'ن'] },
                  { clue: 'تركي قبل خالد', order: ['ت', 'خ', 'س', 'ن'] },
                ]}
              />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= حلل الخطة ١–٤ ================= */
    {
      sec: 'check', min: 2,
      notes: 'فكّر – زاوج – شارك. جرّب مع الطلاب: احذف «محمد أقصر من سعود»؛ هل نعرف أين يقف سعود؟',
      content: (
        <QuestionSlide
          source={ANALYZE} n={1} tps
          intro={ANALYZE_INTRO}
          question="هلْ ستتغيَّرُ النتيجةُ لو نقصتْ إحدَى مُعطياتِ المسألةِ؟ اِشرحْ إجابَتكَ."
          hint="احذف معلومة واحدة، وحاول أن ترتّب الخمسة."
          steps={[
            { text: 'لو حذفنا «محمدٌ أقصرُ من سعودٍ» لما عرفنا مكان سعود: قد يكون أولًا أو في أي مكان آخر.' },
            { text: 'نعم؛ فبنقصِ أيِّ معطًى لا نستطيعُ تحديدَ ترتيبٍ واحدٍ، ويصبحُ أكثرُ من ترتيبٍ ممكنًا.', kind: 'ans' },
          ]}
          chart={<Card kind="qs" cap="المسألة"><p style={{ margin: 0, fontSize: '.8em', lineHeight: 1.8 }}>{PROBLEM}</p></Card>}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اسأل: هل في المسألة أعداد نجمعها أو نطرحها؟ (لا، فيها مقارنات).',
      content: (
        <QuestionSlide
          source={ANALYZE} n={2} tps
          question="وَضِّحْ لماذا كانتْ هذهِ الخُطَّةُ مناسبةً لحلِّ هذهِ المسألةِ."
          hint="ما نوع المعلومات في المسألة: أعداد أم مقارنات؟"
          steps={[
            { text: 'المعطياتُ مقارناتٌ منطقيةٌ (أطولُ / أقصرُ) وليست أعدادًا.' },
            { text: 'فالاستدلالُ المنطقيُّ يرتّبهم خطوةً خطوةً، كلُّ معلومةٍ تضعُ شخصًا في مكانه.', kind: 'ans' },
          ]}
          chart={
            <OrderRows
              rows={[
                { clue: 'عبدُاللهِ أطولُ من بدرٍ', order: ['ع', 'ب'] },
                { clue: 'محمدٌ أقصرُ من سُعودٍ', order: ['س', 'م', 'ف', 'ع', 'ب'] },
              ]}
            />
          }
        />
      ),
    },
    {
      sec: 'check', min: 3,
      notes: '«اصطف خلف سعود» يعني أنه بعده مباشرة، أي أقصر منه (لأنهم يبدؤون بالأطول).',
      content: (
        <QuestionSlide
          source={ANALYZE} n={3} time={120}
          question="إذَا كانَ فهدٌ أطولَ منْ سُعودٍ وأقصرَ منْ عبدِاللَّهِ، وكانَ بدرٌ أطولَهُمْ، واصطفَّ محمدٌ خلفَ سعودٍ، فمَا الترتيبُ الذِي اصطفُّوا بِهِ؟"
          hint="ابدأ ببدر: هو الأطول، فهو أولًا."
          steps={[
            { text: 'بدرٌ أطولُهم فهو الأول، ثم نرتّب الباقين سطرًا بعد سطر.' },
            { text: 'من الأطول إلى الأقصر: بدرٌ، عبدُاللهِ، فهدٌ، سعودٌ، محمدٌ.', kind: 'ans' },
          ]}
          chart={
            <Stack>
              <OrderRows
                rows={[
                  { clue: 'فهدٌ أطولُ من سعودٍ', order: ['ف', 'س'] },
                  { clue: 'فهدٌ أقصرُ من عبدِاللهِ', order: ['ع', 'ف', 'س'] },
                  { clue: 'بدرٌ أطولُهم', order: ['ب', 'ع', 'ف', 'س'] },
                  { clue: 'محمدٌ خلفَ سعودٍ', order: ['ب', 'ع', 'ف', 'س', 'م'] },
                ]}
              />
            </Stack>
          }
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اقبل: رسم أعمدة أطوال، أو التخمين والتحقق. ناقش: أيها أسرع؟',
      content: (
        <QuestionSlide
          source={ANALYZE} n={4} tps
          question="هلْ يُمكِنُ أنْ تَستعمِلَ خُطَّةً أُخرَى لحلِّ هذهِ المسألةِ؟ اِشْرَحْ إجابَتكَ."
          hint="هل يمكن أن نرسم؟ هل يمكن أن نخمّن ثم نتحقق؟"
          steps={[
            { text: 'نعم، مثلًا: التمثيلُ بالرسمِ بأعمدةٍ متدرجةِ الطولِ، أو التخمينُ والتحققُ.' },
            { text: 'لكنَّ الاستدلالَ المنطقيَّ أسرعُ؛ لأنه يضعُ كلَّ شخصٍ في مكانه مباشرةً.', kind: 'ans' },
          ]}
          chart={<Heights names={['سعود', 'محمد', 'فهد', 'عبدالله', 'بدر']} colors={['#e8635a', '#f28a1d', '#f6c21c', '#4fae3a', '#4f9be0']} />}
        />
      ),
    },

    /* ================= تدرب على الخطة ٥–١١ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'نعرف النهاية (٨) ونرجع إلى البداية: نعكس كل عملية.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={5} time={90}
          intro={PRACTICE_INTRO}
          question="معَ سُعادَ الآنَ ٨ ريالاتٍ. أعطاهَا والدُها أمسِ ٤ ريالاتٍ، وأعطتْ أخاهَا ريالينِ. فكمْ ريالًا كانَ معهَا في البدايةِ؟"
          hint="ابدأ من الآن (٨) وارجع: ما أخذته نطرحه، وما أعطته نضيفه."
          steps={[
            { text: <>نرجع عن هدية الوالد: <Eq>٨ − ٤ = ٤</Eq></> },
            { text: <>نرجع عن ما أعطته أخاها: <Eq>٤ + ٢ = ٦</Eq></> },
            { text: <>كان معها ٦ ريالات. تحقّق: <Eq>٦ + ٤ − ٢ = ٨</Eq></>, kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="من النهاية إلى البداية">
              <div className="flines" style={{ alignItems: 'center', fontSize: '1.1em', fontWeight: 800 }}>
                <span>الآن: ٨</span>
                <span>↑ ونعكس كل خطوة</span>
                <span>البداية: ؟</span>
              </div>
            </Card>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'ارسم المضمار خطًا: ٦ م قبل البداية الفعلية، ثم ٨٠، ثم ٦٠. ما بقي حتى ٤٠٠؟',
      content: (
        <QuestionSlide
          source={PRACTICE} n={6} time={120}
          question="القِيَاسُ: يبلغُ طولُ مِضمارِ الجَرْيِ ٤٠٠ مترٍ. ركضَ أسامةُ مسافةَ ٨٠ مترًا فِي المرَّةِ الأُولى، ثُمَّ ركضَ ٦٠ مترًا في المرَّةِ الثَّانيةِ. فإذا كانَ قدْ بدأَ مِن مسافةِ ٦ أمتارٍ بعدَ خطِّ البِدايةِ، فكمْ مترًا بقِيَ ليصلَ إلى خطِّ النِّهايةِ؟"
          hint="كل ما قطعه (بما فيه ٦ أمتار البداية) نطرحه من ٤٠٠."
          steps={[
            { text: <><Eq>٤٠٠ − ٦ = ٣٩٤</Eq></> },
            { text: <><Eq>٣٩٤ − ٨٠ = ٣١٤</Eq> ، <Eq>٣١٤ − ٦٠ = ٢٥٤</Eq></> },
            { text: <>بقِيَ <Eq>٢٥٤</Eq> مترًا.</>, kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="المضمار ٤٠٠ متر">
              <div className="flines" style={{ alignItems: 'center', fontSize: '1.1em', fontWeight: 800 }}>
                <span>٦ م + ٨٠ م + ٦٠ م قطعها</span>
                <span>والباقي = ؟</span>
              </div>
            </Card>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'تابِعوا عدد الركاب محطة بمحطة على السبورة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={7} time={90}
          question="رِكبَ ٥ أشخاصٍ الحافلة في المحطَّةِ الأُولى. وفِي المحطَّةِ الثَّانيةِ ركِبَ ٤ أشخاصٍ ونزلَ شخصانِ. وفي المحطَّةِ الثَّالثةِ رَكِبَ ٥ أشخاصٍ. وفي المحطَّةِ قبل الأخيرةِ رَكِبَ شخصٌ واحدٌ ونزلَ ٤ أشخاصٍ، فكم شخصًا أصبحَ في الحافلةِ؟"
          hint="ركب = نضيف، نزل = نطرح. تابع محطة بمحطة."
          steps={[
            { text: <>الأولى: ٥ · الثانية: <Eq>٥ + ٤ − ٢ = ٧</Eq></> },
            { text: <>الثالثة: <Eq>٧ + ٥ = ١٢</Eq> · قبل الأخيرة: <Eq>١٢ + ١ − ٤ = ٩</Eq></> },
            { text: 'أصبحَ في الحافلةِ ٩ أشخاصٍ.', kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="الركاب">
              <div className="flines" style={{ fontWeight: 700, lineHeight: 1.8 }}>
                <span>المحطة ١: ركب ٥</span>
                <span>المحطة ٢: ركب ٤، نزل ٢</span>
                <span>المحطة ٣: ركب ٥</span>
                <span>قبل الأخيرة: ركب ١، نزل ٤</span>
              </div>
            </Card>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'عدّ المربعات الزرقاء في وجه واحد أولًا (٨)، ثم كم وجهًا للمكعب؟',
      content: (
        <QuestionSlide
          source={PRACTICE} n={8} time={90}
          question="الهَنْدَسةُ: يُوَضِّحُ الشَّكلُ أدناهُ أحدَ أَوْجُهِ مُكَعَّبٍ. إذَا كانتِ الأوجُهُ السِّتَّةُ متشابهةً، فما عددُ المُربَّعاتِ الزَّرقاءِ في جميعِ الأوجُهِ؟"
          hint="كم مربعًا أزرق في وجه واحد؟ وكم وجهًا للمكعب؟"
          steps={[
            { text: 'في كل وجه ٩ مربعات، منها مربع أحمر واحد: ٨ مربعات زرقاء.' },
            { text: <>للمكعب ٦ أوجه: <Eq>٨ + ٨ + ٨ + ٨ + ٨ + ٨ = ٤٨</Eq></> },
            { text: '٤٨ مربعًا أزرق.', kind: 'ans' },
          ]}
          chart={<CubeFace />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'اكتبوا كل الترتيبات بنظام: ابدأ بكرة القدم أولًا (ترتيبان)، ثم التنس أولًا، ثم السباحة أولًا.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={9} time={120}
          question="يَهْوَى كُلٌّ مِن عليٍّ وعمرَ لعبَ كُرةِ القدمِ، وكُرةِ تنسِ الطَّاوِلةِ، والسِّباحةِ. فكمْ ترتِيبًا لِتلْكَ الألعابِ يمكنُهما القيامُ بِهِ؟"
          hint="اختر اللعبة الأولى، ثم كم خيارًا يبقى للثانية؟"
          steps={[
            { text: 'القدمُ أولًا: قدم، تنس، سباحة · قدم، سباحة، تنس' },
            { text: 'التنسُ أولًا: تنس، قدم، سباحة · تنس، سباحة، قدم' },
            { text: 'السباحةُ أولًا: سباحة، قدم، تنس · سباحة، تنس، قدم' },
            { text: '٦ ترتيبات.', kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="الألعاب">
              <div className="flines" style={{ alignItems: 'center', fontSize: '1.2em', fontWeight: 800 }}>
                <span>⚽ كرة القدم</span>
                <span>🏓 تنس الطاولة</span>
                <span>🏊 السباحة</span>
              </div>
            </Card>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'كم بقي؟ ثم: كيف نوزّع ٦ على ٣ أحواض بأعداد مختلفة كلها أكبر من صفر؟',
      content: (
        <QuestionSlide
          source={PRACTICE} n={10} time={90}
          question="لدى محلٍّ لبيعِ أسماكِ الزينةِ ١٠ سمكاتٍ موزعةً على ٣ أحواضٍ. إذا باعَ منها ٤ سمكاتٍ، وبقيَ في كلِّ حوضٍ عددٌ مختلفٌ منَ السمكِ، فكمْ سمكةً بقيتْ في كلِّ حوضٍ؟"
          hint="أوجد الباقي أولًا، ثم ابحث عن ثلاثة أعداد مختلفة مجموعها هذا الباقي."
          steps={[
            { text: <>الباقي: <Eq>١٠ − ٤ = ٦</Eq> سمكات.</> },
            { text: <>ثلاثة أعداد مختلفة مجموعها ٦: <Eq>١ + ٢ + ٣ = ٦</Eq></> },
            { text: 'بقيت سمكة في حوض، وسمكتان في الثاني، و٣ في الثالث.', kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="الأحواض الثلاثة">
              <div className="row" style={{ justifyContent: 'space-around', fontSize: '1.5em' }}>
                <span>🐟</span><span>🐟🐟</span><span>🐟🐟🐟</span>
              </div>
            </Card>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'أكتب: يكتب الطالب خطوتين على الأقل: الطرح أولًا، ثم البحث المنطقي عن الأعداد المختلفة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={11} tps tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="كيفَ يمكنُكَ حلُّ المسألةِ رَقْمِ ١٠ باستعمالِ خُطَّةِ الاستدلالِ المنطقيِّ؟"
          hint="ما أول شيء نعرفه؟ وما الشرط الذي يحدد الأعداد؟"
          steps={[
            { text: <>أطرحُ المباعَ: <Eq>١٠ − ٤ = ٦</Eq></> },
            { text: 'ثم أبحثُ عن ثلاثةِ أعدادٍ مختلفةٍ (ليس فيها صفر) مجموعُها ٦، فلا يصحُّ إلا ١ و٢ و٣.', kind: 'ans' },
          ]}
          chart={<Card kind="rule" cap="الشرط">أعداد <b>مختلفة</b> في كل حوض، ومجموعها ٦.</Card>}
        />
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
            center={<>الاستدلال<br />المنطقي</>}
            items={[
              { kind: 'rule', cap: 'افهم', text: 'أكتب المعطيات والمطلوب.' },
              { kind: 'ex', cap: 'خطّط وحلّ', text: 'أستعمل المعلومات واحدة بعد الأخرى، وأرتّب سطرًا بعد سطر.' },
              { kind: 'qs', cap: 'من النهاية', text: 'إذا عرفت النتيجة أرجع إلى البداية بعكس كل خطوة.' },
              { kind: 'warn', cap: 'تحقّق', text: 'هل يتفق الحل مع كل المعطيات؟' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 2,
      notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة ثم نعرض الإجابات.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">ثلاثة أسئلة</SlideHead>
          <div className="ticket">
            <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="سلطان أطول من ماجد، وماجد أطول من ناصر. من الأقصر؟" options={['سلطان', 'ماجد', 'ناصر']} answer="ناصر" /></Card>
            <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="مع هند الآن ١٠ ريالات بعد أن أعطتها أمها ٣ ريالات. كم كان معها قبل ذلك؟" options={['١٣', '٧', '١٠']} answer="٧" /></Card>
            <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="وصل فهد قبل بدر، ووصل علي بعد بدر، ووصل سعد قبل فهد. من وصل ثانيًا؟" options={['سعد', 'فهد', 'بدر', 'علي']} answer="فهد" /></Card>
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
