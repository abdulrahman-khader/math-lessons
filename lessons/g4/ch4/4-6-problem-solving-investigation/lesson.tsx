import {
  Card, Cols, Ctrls, Eq, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, QCol, QuestionSlide, SlideHead, Solution, Stack, Step,
  Winner, defineLesson,
} from '@engine';
import { IntroClip } from './clip';

/** إشارات العدّ في مجموعات من ٥، والملوّن منها يمثل البذور التي أنبتت */
function Tallies({ groups = 6, green = 3, showGreen = false }: { groups?: number; green?: number; showGreen?: boolean }) {
  return (
    <svg viewBox={`0 0 ${groups * 110} 120`} style={{ width: '100%' }} role="img" aria-label={`${groups} مجموعات من ٥ إشارات`}>
      {Array.from({ length: groups }, (_, g) =>
        Array.from({ length: 5 }, (_, i) => {
          // المجموعة الأولى يمينًا، والإشارات الخضراء أولًا من اليمين
          const x = groups * 110 - 20 - g * 110 - i * 16;
          const on = showGreen && i < green;
          return <line key={`${g}-${i}`} x1={x} x2={x - 4} y1={20} y2={100} stroke={on ? '#1b9e4b' : '#8a8f99'} strokeWidth={8} strokeLinecap="round" />;
        }),
      )}
    </svg>
  );
}

/** ميزان السؤال ٣: الأوزان ٨ كجم في الكفة اليسرى، والجبن ٢ كجم في اليمنى */
const Scale = () => (
  <svg viewBox="0 0 460 300" style={{ width: '100%', maxWidth: '22em', alignSelf: 'center' }} role="img" aria-label="ميزان: ٨ كجم في الكفة اليسرى، و٢ كجم جبن في الكفة اليمنى">
    <rect x={220} y={60} width={20} height={200} fill="#e0b31a" />
    <rect x={160} y={255} width={140} height={22} rx={8} fill="#e0b31a" />
    <line x1={60} y1={110} x2={400} y2={50} stroke="#e0b31a" strokeWidth={12} strokeLinecap="round" />
    <path d="M10,200 L110,200 Q60,235 10,200 Z" fill="#e0b31a" />
    <line x1={60} y1={110} x2={20} y2={200} stroke="#a07d10" strokeWidth={2} /><line x1={60} y1={110} x2={100} y2={200} stroke="#a07d10" strokeWidth={2} />
    <rect x={25} y={150} width={30} height={50} rx={4} fill="#9aa3ad" stroke="#13213b" strokeWidth={2} />
    <rect x={60} y={165} width={25} height={35} rx={4} fill="#9aa3ad" stroke="#13213b" strokeWidth={2} />
    <text x={60} y={235} fontSize={22} fontWeight={800} textAnchor="middle" fill="#13213b">٨ كجم</text>
    <path d="M350,140 L450,140 Q400,175 350,140 Z" fill="#e0b31a" />
    <line x1={400} y1={50} x2={360} y2={140} stroke="#a07d10" strokeWidth={2} /><line x1={400} y1={50} x2={440} y2={140} stroke="#a07d10" strokeWidth={2} />
    <rect x={370} y={110} width={60} height={30} rx={4} fill="#f6d84a" stroke="#13213b" strokeWidth={2} />
    <text x={400} y={130} fontSize={16} fontWeight={800} textAnchor="middle" fill="#13213b">جبن</text>
    <text x={400} y={175} fontSize={22} fontWeight={800} textAnchor="middle" fill="#13213b">٢ كجم</text>
  </svg>
);

/** السياج: مستطيل ٨ أمتار في ٣ أمتار */
const Fence = () => (
  <svg viewBox="0 0 480 220" style={{ width: '100%', maxWidth: '20em', alignSelf: 'center' }} role="img" aria-label="حديقة مستطيلة طولها ٨ أمتار وعرضها ٣ أمتار">
    <rect x={20} y={20} width={320} height={120} fill="#66c28b" stroke="#13213b" strokeWidth={5} />
    <line x1={20} y1={175} x2={340} y2={175} stroke="#13213b" strokeWidth={3} />
    <text x={180} y={205} fontSize={24} fontWeight={800} textAnchor="middle" fill="#13213b">٨ أمتار</text>
    <line x1={370} y1={20} x2={370} y2={140} stroke="#13213b" strokeWidth={3} />
    <text x={420} y={88} fontSize={22} fontWeight={800} textAnchor="middle" fill="#13213b">٣ أمتار</text>
  </svg>
);

const PLANS = ['التخمينُ والتحققُ', 'حلُّ مسألةٍ أبسطَ', 'إنشاءُ قائمةٍ منظمةٍ', 'رسمُ صورةٍ', 'تمثيلُ المسألةِ'];
const SOLVE = 'حُلَّ مسائلَ متنوِّعةً · ص ١٢٦';
const SOLVE_INTRO = 'اِستعمِلِ الخطَّةَ المناسبةَ ممَّا يلي لحلِّ كلٍّ منَ المسائلِ التَّاليةِ:';
const PROBLEM = 'زرعَ فَلَّاحٌ ٣٠ بَذرةَ طماطمَ في البُستانِ. وبعدَ فترةٍ وَجدَ أنَّه من بينِ كلِّ ٥ بُذورٍ ٣ فقطْ أَنْبتَتْ شَتَلَاتٍ. ما عددُ البُذورِ الَّتي أَنبتَتْ شَتلاتٍ؟';

const Plans = () => (
  <Card kind="ex" cap="الخطط">
    <ul style={{ margin: 0, paddingInlineStart: '1.2em', lineHeight: 1.75, fontWeight: 700 }}>
      {PLANS.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  </Card>
);

export default defineLesson({
  meta: {
    id: 'g4-4-6-problem-solving-investigation',
    code: '٤-٦',
    title: 'اسْتِقْصَاءُ حَلِّ الْمَسْأَلَةِ',
    shortTitle: 'استقصاء حل المسألة',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الرابع: الأنماط والجبر',
    source: 'الجزء الأول · ص ١٢٥–١٢٦',
    minutes: 45,
    idea: 'أختارُ خُطَّةً مُناسِبةً لأَحُلَّ المسألةَ.',
    bookQuestions: 9,
  },
  sectionDesc: {
    engage: 'أيّ خطة تعرف؟',
    explore: 'خطة لكل مسألة',
    explain: 'ماهر: افهم · خطط · حل · تحقق',
    elab: 'نعمل معًا',
    practice: 'الأسئلة ١–٩',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. اليوم لا نتعلم خطة جديدة؛ نختار من الخطط التي نعرفها.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أختارُ خُطَّةً مُناسِبةً لأَحُلَّ المسألةَ.</Card>
              <Card kind="rule" cap="خطوات حل المسألة"><Mark>افْهَمْ · خَطِّطْ · حُلَّ · تَحَقَّقْ</Mark></Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أقرأ المسألة وأحدد المعطيات والمطلوب.</li>
                <li>أختار خطة مناسبة من الخطط التي أعرفها.</li>
                <li>أحل المسألة وأتحقق من الحل.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 2,
      notes: 'اطلب من الطلاب تسمية خطط حل المسألة التي تعلموها. اكتبها على السبورة قبل أن تضغط المسافة.',
      content: (
        <>
          <SlideHead tag="تذكّر" kind="ink">ما خطط حل المسألة التي تعرفها؟</SlideHead>
          <Cols>
            <QCol>
              <Card kind="qs" cap="سؤال للتفكير">في الدرس ٣-٢ أنشأنا جدولًا، وفي الدرس ٤-٣ استعملنا الاستدلال المنطقي. ما خطط أخرى تعرفها؟</Card>
              <Ctrls><NextButton /></Ctrls>
              <Step><Plans /></Step>
            </QCol>
            <Card kind="rule" cap="خطوات كل خطة">
              <div className="flines" style={{ fontSize: '1.2em', fontWeight: 800, lineHeight: 1.9 }}>
                <span>١ افهمْ</span><span>٢ خطِّطْ</span><span>٣ حُلَّ</span><span>٤ تحقَّقْ</span>
              </div>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= استكشاف: خطة لكل مسألة ================= */
    {
      sec: 'explore', min: 4,
      notes: 'لا نحل هنا؛ نختار الخطة فقط. اطلب من الطالب أن يعلّل اختياره.',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">أيّ خطة تناسب؟</SlideHead>
          <div className="qgrid two">
            <MCQ q="بكم طريقة يمكن أن يجلس ٣ إخوة في ٣ مقاعد؟" options={['رسم صورة', 'إنشاء قائمة منظمة', 'التخمين والتحقق']} answer="إنشاء قائمة منظمة" award />
            <MCQ q="عددان مجموعهما ١٢ والفرق بينهما ٤. ما العددان؟" options={['التخمين والتحقق', 'رسم صورة', 'تمثيل المسألة']} answer="التخمين والتحقق" award />
            <MCQ q="حديقة طولها ٦ أمتار وعرضها ٤ أمتار. كم مترًا طول السياج حولها؟" options={['إنشاء قائمة منظمة', 'رسم صورة', 'التخمين والتحقق']} answer="رسم صورة" award />
            <MCQ q="كم مصافحة تحدث بين ١٠ أشخاص إذا صافح كل منهم الآخرين؟" options={['حل مسألة أبسط', 'رسم صورة فقط', 'التخمين والتحقق']} answer="حل مسألة أبسط" award />
          </div>
        </>
      ),
    },

    /* ================= ماهر ================= */
    {
      sec: 'explain', min: 6,
      notes: 'أنا أعمل: نفّذ الخطوات الأربع كما في الكتاب. مع «حُلَّ» تظهر الإشارات ثم يُلوَّن ثلاث من كل خمس.',
      content: (
        <>
          <SlideHead tag="استقصاء حل المسألة · ص ١٢٥" kind="ex">ماهر</SlideHead>
          <p className="qtext" style={{ margin: 0, fontSize: '.85em' }}><b style={{ color: 'var(--ex)' }}>ماهرٌ:</b> {PROBLEM}</p>
          <Cols style={{ gridTemplateColumns: '1fr 1.1fr' }}>
            <QCol>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step><b>افْهَمْ:</b> زرعَ فلاحٌ ٣٠ بذرةَ طماطم، ونبتَتْ منْ كلِّ ٥ بذورٍ ٣ فقطْ. المطلوب: عددُ البذورِ التي أنبتتْ شتلاتٍ.</Step>
                <Step><b>خَطِّطْ:</b> استعملْ خُطَّةَ « الرَّسمُ » لِتَحُلَّ المسألةَ، وَاسْتعمِلْ إشاراتٍ لِتَمْثيلِ البُذورِ.</Step>
                <Step hl={['x1']}><b>حُلَّ:</b> ثلاثٌ فقطْ منْ كلِّ مجموعةٍ أَنْبَتَتْ شَتلاتٍ: <Eq>٣ + ٣ + ٣ + ٣ + ٣ + ٣</Eq></Step>
                <Step kind="ans">لذلكَ فإنَّ عددَ البُذورِ الَّتي أَنْبَتَتْ شَتلاتٍ هوَ <Eq>٦ × ٣ = ١٨</Eq></Step>
                <Step><b>تَحَقَّقْ:</b> رَاجِعِ الحلَّ وَاسْتعمِلِ الجمعَ المُتكرِّرَ: <Eq>٣ + ٣ + ٣ + ٣ + ٣ + ٣ = ١٨</Eq> إِذَنِ الحلُّ صحيحٌ ✓</Step>
              </Solution>
            </QCol>
            <Stack>
              <Card kind="qs" cap="ضعِ الإشاراتِ في مجموعاتٍ منْ ٥ لتَحْصُلَ على ٣٠ منها">
                <Tallies />
              </Card>
              <Step hl={['x1']}>
                <Card kind="ex" cap="ثلاثٌ فقطْ منْ كلِّ مجموعةٍ أَنْبَتَتْ">
                  <Tallies showGreen />
                </Card>
              </Step>
            </Stack>
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع يعرض مسألة واحدة (مثال غير مثال الكتاب) بخطتين مختلفتين توصلان إلى الإجابة نفسها. أوقفه بعد كل خطة واسأل: أيهما أسرع؟',
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
      notes: 'نعمل معًا: اختر الخطة أولًا مع الطلاب، ثم حلّوا معًا. اختر طالبًا بالعجلة للإجابة.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">الدراجات الهوائية</SlideHead>
          <Cols>
            <QCol>
              <Card kind="qs">في موقف المدرسة ٧ دراجات، بعضها بعجلتين وبعضها بثلاث عجلات. عدد العجلات كلها ١٦ عجلة. كم دراجة بثلاث عجلات؟</Card>
              <MCQ q="أيّ خطة نستعمل؟" options={['التخمين والتحقق', 'إنشاء جدول', 'الاستدلال المنطقي']} answer="التخمين والتحقق" award />
              <MCQ q="كم دراجة بثلاث عجلات؟" options={['٢', '٣', '٤']} answer="٢" award />
            </QCol>
            <Card kind="ex" cap="نخمّن ونتحقق">
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>٣ بثلاث، ٤ بعجلتين: <Eq>٩ + ٨ = ١٧</Eq> كثير ✗</Step>
                <Step>٢ بثلاث، ٥ بعجلتين: <Eq>٦ + ١٠ = ١٦</Eq> ✓</Step>
              </Solution>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= حل مسائل متنوعة ١–٩ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'سارة وصديقاتها ٤، لا ٣. هذا أكثر خطأ شائع هنا.',
      content: (
        <QuestionSlide
          source={SOLVE} n={1} time={90}
          intro={SOLVE_INTRO}
          question="لدَى سارةَ سلةٌ فيهَا ١٧ تُفَّاحةً، وتريدُ أنْ تشاركَ فيهَا ٣ مِن صَديقاتِها بالتَّساوِي. فما عددُ التُّفَّاحاتِ الَّتي ستأخذُها كلٌّ منهُنَّ؟ وكمْ تُفَّاحةً سَتبقَى دونَ توزيعٍ؟"
          hint="كم بنتًا ستأخذ؟ لا تنسَ سارة نفسها."
          steps={[
            { text: 'الخطة: رسم صورة. سارة و٣ صديقات = ٤ بنات.' },
            { text: <>نوزّع ١٧ على ٤: <Eq>٤ × ٤ = ١٦</Eq> ، ويبقى <Eq>١٧ − ١٦ = ١</Eq></> },
            { text: 'تأخذ كل واحدة ٤ تفاحات، وتبقى تفاحة واحدة.', kind: 'ans' },
          ]}
          chart={<Plans />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'للذكر مثل حظ الأنثيين: نصيب الأخ = سهمان، وكل بنت سهم. المجموع ٤ أسهم.',
      content: (
        <QuestionSlide
          source={SOLVE} n={2} time={120}
          question="اشتركَتْ بنتانِ وأخوهُمَا في تَرِكَةٍ وَالدِهم ومقدارُها ٨ آلافِ ريالٍ. إذا عَلِمْتَ أنَّ للذَّكَرِ مثلُ نَصيبِ اثنَتيْنِ منَ الإناثِ. فما نصيبُ كُلِّ واحدٍ منهُم منَ التَّرِكَةِ؟"
          hint="ارسم أسهمًا: كل بنت سهم، والأخ سهمان."
          steps={[
            { text: 'الخطة: رسم صورة. البنتان سهمان، والأخ سهمان: ٤ أسهم.' },
            { text: <>السهم: <Eq>٨٠٠٠ ÷ ٤ = ٢٠٠٠</Eq></> },
            { text: 'نصيب كل بنت ٢٠٠٠ ريال، ونصيب الأخ ٤٠٠٠ ريال.', kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="الأسهم">
              <div className="row" style={{ justifyContent: 'space-around', fontSize: '1.2em', fontWeight: 800 }}>
                <span>بنت: ■</span><span>بنت: ■</span><span>الأخ: ■ ■</span>
              </div>
            </Card>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'في الكفة اليمنى ٢ كجم، والمطلوب ٨. كم قالبًا نضيف وكل قالب ٢ كجم؟',
      content: (
        <QuestionSlide
          source={SOLVE} n={3} time={90}
          question="ماعددُ قَوَالِبِ الجُبْنِ الَّتي يَنبغِي أنْ تُضافَ إلى كِفَّةِ المِيزانِ اليُمنَى للحُصولِ على وَزْنَينِ مُتَساوِيَيْنِ؟"
          hint="الكفة اليسرى ٨ كجم. كم ينقص اليمنى؟"
          steps={[
            { text: <>ينقص الكفة اليمنى: <Eq>٨ − ٢ = ٦</Eq> كجم</> },
            { text: <>كل قالب ٢ كجم: <Eq>٣ × ٢ = ٦</Eq></> },
            { text: <>٣ قوالب؛ إذ يصير في الكفة اليمنى <Eq>٢ + ٣ × ٢ = ٨</Eq> كجم</>, kind: 'ans' },
          ]}
          chart={<Scale />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'إنشاء قائمة منظمة: ابدأ بالأحمر أولًا (طريقتان)، ثم الأخضر، ثم الأزرق.',
      content: (
        <QuestionSlide
          source={SOLVE} n={4} time={90}
          question="لَدَى مُنى٣ مِلَفَّاتٍ: أحمرَ، وأخضرَ، وأزرقَ. بكمْ طريقةٍ يمكنُها ترتيبُ هذهِ المِلَفَّاتِ؟"
          hint="اختر الملف الأول، ثم كم خيارًا يبقى للثاني؟"
          steps={[
            { text: 'الخطة: إنشاء قائمة منظمة.' },
            { text: 'أحمر أولًا: أحمر، أخضر، أزرق · أحمر، أزرق، أخضر' },
            { text: 'أخضر أولًا: طريقتان · أزرق أولًا: طريقتان' },
            { text: <><Eq>٢ + ٢ + ٢ = ٦</Eq> طرائق</>, kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="الملفات">
              <div className="row" style={{ justifyContent: 'space-around' }}>
                {['#e8635a', '#4fae3a', '#4f9be0'].map((c) => (
                  <span key={c} style={{ width: '2.4em', height: '3em', background: c, border: '3px solid #13213b', borderRadius: '.3em' }} />
                ))}
              </div>
            </Card>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'اجمع ما أعطاه أولًا، ثم اطرح من ٢٥.',
      content: (
        <QuestionSlide
          source={SOLVE} n={5} time={90}
          question="لَدَى بلالٍ ٢٥ كُرةً. إذا أعطَى أصدقاءَهُ راشدًا وأحمدَ وفارسًا وسعدًا: ٣، ٦، ١، ٤ كُراتٍ. فكمْ كُرةً ستبقَى معهُ؟"
          hint="كم كرة أعطى أصدقاءه كلهم؟"
          steps={[
            { text: <>ما أعطاه: <Eq>٣ + ٦ + ١ + ٤ = ١٤</Eq></> },
            { text: <><Eq>٢٥ − ١٤ = ١١</Eq></> },
            { text: 'تبقى معه ١١ كرة.', kind: 'ans' },
          ]}
          chart={<Plans />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نجمع ما معه في المحفظة والجيب أولًا.',
      content: (
        <QuestionSlide
          source={SOLVE} n={6} time={90}
          question="عندمَا ذهبَ حامدٌ إلى السُّوقِ كانَ في محفظَتِهِ ٥٢ ريالًا، وفي جَيْبِهِ ٨ ريالاتٍ. إذا اشترَى كتابًا بـ ٢٣ ريالًا. فكمْ ريالًا يبقَى معهُ؟"
          hint="كم كان معه كله؟"
          steps={[
            { text: <><Eq>٥٢ + ٨ = ٦٠</Eq> ريالًا معه كله</> },
            { text: <><Eq>٦٠ − ٢٣ = ٣٧</Eq></> },
            { text: 'يبقى معه ٣٧ ريالًا.', kind: 'ans' },
          ]}
          chart={<Plans />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'رسم صورة: السياج حول الحديقة كلها، أي أضلاعها الأربعة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={7} time={60}
          question="القِيَاسُ: يريدُ سعيدٌ أنْ يعمَلَ سِيَاجًا حولَ حديقةِ بَيتِهِ. فكمْ مترًا يكونُ طولُ هذَا السِّياجِ؟"
          hint="للمستطيل ٤ أضلاع: ضلعان طول كل منهما ٨، وضلعان طول كل منهما ٣."
          steps={[
            { text: <><Eq>٨ + ٣ + ٨ + ٣ = ٢٢</Eq></> },
            { text: 'طول السياج ٢٢ مترًا.', kind: 'ans' },
          ]}
          chart={<Fence />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'رسم صورة: البيت ← المتجر ← بيت الجار، ثم الرجوع بالطريق نفسه.',
      content: (
        <QuestionSlide
          source={SOLVE} n={8} time={90}
          question="القِيَاسُ: يقطعُ ماجدٌ مسافةَ ٢٠٠ م مِن بيتِهِ إلى مَتْجَرٍ مُجاورٍ. ثمَّ يقطعُ مسافةَ ٣٠ م إلى بيتِ جارِهِ. إذَا رَجعَ إلى بيتِهِ مستعملًا الطريقَ نفسَهُ، فكمْ مترًا يقطعُ؟"
          hint="الطريق نفسه يعني أنه يقطع المسافة مرتين: ذهابًا وإيابًا."
          steps={[
            { text: <>ذهابًا: <Eq>٢٠٠ + ٣٠ = ٢٣٠</Eq> م</> },
            { text: <>ذهابًا وإيابًا: <Eq>٢٣٠ + ٢٣٠ = ٤٦٠</Eq></> },
            { text: 'يقطع ٤٦٠ مترًا.', kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="الطريق">
              <div className="row" style={{ justifyContent: 'space-around', fontSize: '1.1em', fontWeight: 800 }}>
                <span>🏠 البيت</span><span>← ٢٠٠ م ←</span><span>🏪 المتجر</span><span>← ٣٠ م ←</span><span>🏡 الجار</span>
              </div>
            </Card>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'أكتب: الحل العكسي. ابدأ من ٤٤ واعكس كل عملية.',
      content: (
        <QuestionSlide
          source={SOLVE} n={9} tps tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="العددَ الذِي إذَا أضفتَ إليهِ ٨، وطرحْتَ ١٠ منَ المجموعِ، ثمَّ ضاعفتَ الفرقَ فَحصلْتَ علَى ٤٤، وَضِّحْ إجابَتكَ."
          hint="ابدأ من ٤٤ وارجع: المضاعفة عكسها القسمة على ٢."
          steps={[
            { text: <><Eq>٤٤ ÷ ٢ = ٢٢</Eq> ، ثم <Eq>٢٢ + ١٠ = ٣٢</Eq> ، ثم <Eq>٣٢ − ٨ = ٢٤</Eq></> },
            { text: <>العدد ٢٤. تحقّق: <Eq>٢٤ + ٨ = ٣٢</Eq> ، <Eq>٣٢ − ١٠ = ٢٢</Eq> ، <Eq>٢٢ × ٢ = ٤٤</Eq> ✓</>, kind: 'ans' },
          ]}
          chart={
            <Card kind="ex" cap="العمل العكسي">
              <div className="flines" style={{ alignItems: 'center', fontSize: '1.1em', fontWeight: 800 }}>
                <span>؟ ← +٨ ← −١٠ ← ×٢ ← ٤٤</span>
                <span>٢٤ → −٨ → +١٠ → ÷٢ → ٤٤</span>
              </div>
            </Card>
          }
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
            center={<>اختيار<br />الخطة</>}
            items={[
              { kind: 'rule', cap: 'افهم أولًا', text: 'المعطيات والمطلوب تساعدني على اختيار الخطة.' },
              { kind: 'ex', cap: 'رسم صورة', text: 'للمسافات والأشكال والتوزيع.' },
              { kind: 'qs', cap: 'قائمة منظمة', text: 'لعدّ الطرائق والترتيبات.' },
              { kind: 'warn', cap: 'العمل العكسي', text: 'عندما أعرف النهاية وأبحث عن البداية.' },
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
            <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="مع علي ٤٠ ريالًا، أنفق ١٢ ثم ٨. كم بقي معه؟" options={['٢٠', '٢٨', '٦٠']} answer="٢٠" /></Card>
            <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="بكم طريقة نرتّب الحروف أ، ب، جـ؟" options={['٣', '٦', '٩']} answer="٦" /></Card>
            <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="عدد إذا ضاعفته ثم أضفت ٥ صار ٢٥. ما العدد؟" options={['١٠', '١٥', '٢٠']} answer="١٠" /></Card>
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
