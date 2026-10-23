import {
  CUBE, Card, Cols, Ctrls, CubeTrain, FactFamily, FactTriangle, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, QCard, QCol,
  QuestionSlide, Sentence, SlideHead, Solution, Stack, Step, Tag, TimerButton, Winner, defineLesson,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ · ص ٧٦';
const PRACTICE = 'أتدرَّبُ · ص ٧٧';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ٧٧';
const COMPLETE = 'أَسْتَعْمِلُ الْمُكَعَّبَاتِ، وأُكْمِلُ الْحَقَائِقَ الْمُتَرَابِطَةَ:';

/** ألوان المثلثات كما في الكتاب */
const TRI = {
  green: ['#86d39a', '#1f9a45'],
  red: ['#f7a9a0', '#d7302a'],
  violet: ['#e6b8dd', '#8e44ad'],
  blue: ['#a9cbee', '#1d6fc4'],
  orange: ['#ffc77d', '#f28a1d'],
} as const;

/**
 * مجموعة حقائق مترابطة كاملة للمثلث: جمعان ثم طرحان، كل الأعداد في خانات تمتلئ بالترتيب
 * (كما في أتدرب حيث السطور فارغة). إن تساوى الجزآن فحقيقتان فقط.
 */
function FullFamily({ n, top, left, right, color }: { n: number; top: number; left: number; right: number; color: readonly [string, string] }) {
  const same = left === right;
  return (
    <QCard n={n} className="tricard">
      <FactTriangle top={top} left={left} right={right} color={color[0]} edge={color[1]} />
      <div className="flines tri2">
        <Sentence t={[{ b: right }, '+', { b: left }, '=', { b: top }]} />
        <Sentence t={[{ b: top }, '−', { b: right }, '=', { b: left }]} />
        {!same && <Sentence t={[{ b: left }, '+', { b: right }, '=', { b: top }]} />}
        {!same && <Sentence t={[{ b: top }, '−', { b: left }, '=', { b: right }]} />}
      </div>
    </QCard>
  );
}

export default defineLesson({
  meta: {
    id: 'g2-3-7-fact-families',
    code: '٣-٧',
    title: 'الْحَقَائِقُ الْمُتَرَابِطَةُ',
    shortTitle: 'الحقائق المترابطة',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثالث: طرائق الطرح',
    source: 'الجزء الأول · ص ٧٦–٧٧',
    minutes: 45,
    idea: 'أُكَوِّنُ مَجْمُوعَةَ الْحَقَائِقِ الْمُتَرَابِطَةِ.',
    bookQuestions: 9,
  },
  sectionDesc: {
    engage: 'مراجعة الجمع والطرح',
    explore: 'مستكشف الحقائق المترابطة',
    explain: 'القاعدة · أستعد',
    elab: 'نعمل معًا · من واقع الحياة',
    check: 'الأسئلة ١–٤',
    practice: 'الأسئلة ٥–٨',
    hot: 'السؤال ٩',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردة. اسأل: ماذا تعني «مجموعة»؟ وما «الحقائق المترابطة» التي تعلمناها؟',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أُكَوِّنُ مَجْمُوعَةَ الْحَقَائِقِ الْمُتَرَابِطَةِ.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>مَجْمُوعَةُ الْحَقَائِقِ الْمُتَرَابِطَةِ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أقرأ مثلث الحقائق.</li>
                <li>أكتب الحقائق الأربع من ثلاثة أعداد.</li>
                <li>أعرف متى تكون الحقائق اثنتين فقط.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 3,
      notes: 'ربط بالدرس ٣-٥. اختر طالبًا بالعجلة لكل سؤال.',
      content: (
        <>
          <SlideHead tag="تذكّر · الدرس ٣-٥" kind="ink">الجمع والطرح متعاكسان</SlideHead>
          <Cols even>
            <Card kind="qs">
              <MCQ q="٧ + ٣ = ١٠، إذن ١٠ − ٣ = ؟" options={['٣', '٧', '١٣']} answer="٧" award />
            </Card>
            <Card kind="qs">
              <MCQ q="أيّ جملة تستعمل الأعداد ٤ و٥ و٩؟" options={['٩ − ٤ = ٥', '٩ − ٣ = ٦', '٥ − ٤ = ١']} answer="٩ − ٤ = ٥" award />
            </Card>
          </Cols>
          <Card kind="rule" cap="سؤال للتفكير">
            من الأعداد <b>٣ و٧ و١٠</b> كم جملة جمع وطرح أستطيع أن أكتب؟
          </Card>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا يغيّر عدد المكعبات ثم يضغط كل حقيقة. اسأل: كم حقيقة كتبنا؟ ماذا يحدث إذا تساوى العددان؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">مجموعة من أربع حقائق</SlideHead>
          <p style={{ fontSize: '.82em', fontWeight: 700, margin: 0 }}>غيّر عدد المكعبات، ثم اضغط كل جملة. ماذا يحدث إذا جعلت العددين متساويين؟</p>
          <FactFamily start={[7, 3]} />
          <Card kind="rule" cap="لاحظ">ثلاثة أعداد تعطي أربع حقائق: جمعان وطرحان. وإذا تساوى الجزآن تصير حقيقتين فقط.</Card>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ التعريف. أشر إلى المثلث: المجموع في الأعلى، والجزآن في الأسفل.',
      content: (
        <>
          <SlideHead tag="القاعدة" kind="rule">مجموعة الحقائق المترابطة</SlideHead>
          <Cols style={{ gridTemplateColumns: '1.4fr 1fr', alignItems: 'center' }}>
            <Stack>
              <Card kind="rule" style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.8 }}>
                <Mark>مَجْمُوعَةُ الْحَقَائِقِ الْمُتَرَابِطَةِ</Mark> هِيَ مَجْمُوعَةُ الْحَقَائِقِ الَّتِي تَرْبِطُ بَيْنَ ثَلاثَةِ أَعْدَادٍ.
              </Card>
              <Card kind="ex" cap="أتذكّر">تَشْتَرِكُ الْحَقَائِقُ الْمُتَرَابِطَةُ بِالأَعْدَادِ الثَّلاثَةِ نَفْسِهَا.</Card>
            </Stack>
            <Card kind="ex" cap="مثلث الحقائق">
              <FactTriangle top={10} left={3} right={7} color={TRI.blue[0]} edge={TRI.blue[1]} />
              <p style={{ margin: 0, fontSize: '.75em', fontWeight: 700 }}>المجموع في الأعلى، والجزآن في الأسفل.</p>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= أستعد · مثال الكتاب ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: «أستفيد من حقائق الجمع والطرح لأكوّن الحقائق المترابطة». أشر إلى كل جملة وهي تظهر.',
      content: (
        <>
          <SlideHead tag="أستعد · ص ٧٦" kind="ex">الأعداد ٣ و٧ و١٠</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">أَسْتَفِيدُ مِنْ حَقَائِقِ الْجَمْعِ وَالطَّرْحِ لِأُكَوِّنَ الْحَقَائِقَ الْمُتَرَابِطَةَ.</p>
              <div className="flines tri2">
                <Sentence t={[7, '+', 3, '=', { b: 10 }]} />
                <Sentence t={[10, '−', 3, '=', { b: 7 }]} />
                <Sentence t={[3, '+', 7, '=', { b: 10 }]} />
                <Sentence t={[10, '−', 7, '=', { b: 3 }]} />
              </div>
              <Ctrls>
                <NextButton />
              </Ctrls>
              <Solution>
                <Step kind="ans">أربع حقائق مترابطة من الأعداد ٣ و٧ و١٠.</Step>
              </Solution>
            </QCol>
            <Stack>
              <div className="chart cubebox">
                <CubeTrain parts={[{ n: 7, color: CUBE.green }, { n: 3, color: CUBE.orange }]} joined size={40} />
              </div>
              <FactTriangle top={10} left={3} right={7} color={TRI.blue[0]} edge={TRI.blue[1]} />
            </Stack>
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'بعد القاعدة والمثال: المقطع يؤكد الشرح بمثال غير مثال الكتاب. لا يبدأ إلا عندما تضغط تشغيل (أو من الجوال). أوقفه قبل كل نتيجة واسأل الطلاب عنها.',
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
      notes: 'نعمل معًا: اختر طالبًا بالعجلة. في السؤال ج ذكّر: الحقائق المترابطة لها الأعداد الثلاثة نفسها.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">من المجموعة؟</SlideHead>
          <Cols style={{ gridTemplateColumns: '1fr 8em', alignItems: 'center' }}>
            <Stack>
              <MCQ q="أ) أَيُّ حَقِيقَةٍ مِنْ مَجْمُوعَةِ الْمُثَلَّثِ؟" options={['١٢ − ٥ = ٧', '١٢ − ٤ = ٨', '٧ − ٥ = ٢']} answer="١٢ − ٥ = ٧" award />
              <MCQ q="ب) ٥ + ٧ = ١٢. مَا الْحَقِيقَةُ الْأُخْرَى لِلْجَمْعِ؟" options={['٧ + ٥ = ١٢', '١٢ + ٥ = ١٧', '٥ + ٥ = ١٠']} answer="٧ + ٥ = ١٢" award />
              <MCQ q="ج) كَمْ حَقِيقَةً فِي مَجْمُوعَةِ الأَعْدَادِ ٥ وَ ٧ وَ ١٢؟" options={['٢', '٣', '٤']} answer="٤" award />
            </Stack>
            <FactTriangle top={12} left={5} right={7} color={TRI.green[0]} edge={TRI.green[1]} />
          </Cols>
        </>
      ),
    },

    /* ================= من واقع الحياة ================= */
    {
      sec: 'elab', min: 2,
      notes: 'اقرأ القصة. اطلب من الطلاب كتابة أربع جمل بالأعداد ٦ و٨ و١٤.',
      content: (
        <>
          <SlideHead tag="من واقع الحياة" kind="ex">أقلام الحقيبة</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">فِي حَقِيبَةِ يُوسُفَ ٦ أَقْلَامٍ زَرْقَاءَ وَ ٨ أَقْلَامٍ حَمْرَاءَ، فَيَكُونُ عِنْدَهُ ١٤ قَلَمًا. أَكْتُبُ الْحَقَائِقَ الْمُتَرَابِطَةَ.</p>
              <Ctrls>
                <NextButton />
              </Ctrls>
              <Solution>
                <Step>
                  <Sentence t={[6, '+', 8, '=', 14]} />
                </Step>
                <Step>
                  <Sentence t={[8, '+', 6, '=', 14]} />
                </Step>
                <Step>
                  <Sentence t={[14, '−', 6, '=', 8]} />
                </Step>
                <Step kind="ans">
                  <Sentence t={[14, '−', 8, '=', 6]} />
                </Step>
              </Solution>
            </QCol>
            <FactTriangle top={14} left={6} right={8} color={TRI.orange[0]} edge={TRI.orange[1]} />
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٣ ================= */
    {
      sec: 'check', min: 5,
      notes: 'في ٢ السطران الأخيران فارغان: يكتب الطلاب الحقيقتين الناقصتين. في ٣ حقيقتان فقط (لماذا؟ يُسأل في ٤).',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{CHECK}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{COMPLETE}</p>
          <div className="qgrid one tri-rows book">
            <QCard n={1} className="tricard">
              <FactTriangle top={16} left={7} right={9} color={TRI.green[0]} edge={TRI.green[1]} />
              <div className="flines tri2">
                <Sentence t={[7, '+', 9, '=', { b: 16 }]} />
                <Sentence t={[16, '−', 9, '=', { b: 7 }]} />
                <Sentence t={[9, '+', 7, '=', { b: 16 }]} />
                <Sentence t={[16, '−', 7, '=', { b: 9 }]} />
              </div>
            </QCard>
            <QCard n={2} className="tricard">
              <FactTriangle top={17} left={8} right={9} color={TRI.red[0]} edge={TRI.red[1]} />
              <div className="flines tri2">
                <Sentence t={[9, '+', 8, '=', { b: 17 }]} />
                <Sentence t={[17, '−', 9, '=', { b: 8 }]} />
                <Sentence t={[{ b: 8 }, '+', { b: 9 }, '=', { b: 17 }]} />
                <Sentence t={[{ b: 17 }, '−', { b: 8 }, '=', { b: 9 }]} />
              </div>
            </QCard>
            <QCard n={3} className="tricard">
              <FactTriangle top={18} left={9} right={9} color={TRI.violet[0]} edge={TRI.violet[1]} />
              <div className="flines tri2">
                <Sentence t={[9, '+', 9, '=', { b: 18 }]} />
                <Sentence t={[18, '−', 9, '=', { b: 9 }]} />
              </div>
            </QCard>
          </div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={150} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أتأكد ٤ · أتحدث ================= */
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: اطلب من الطلاب أن يحاولوا كتابة حقيقة ثالثة للأعداد ٩ و٩ و١٨. ماذا يلاحظون؟',
      content: (
        <QuestionSlide
          source={CHECK} n={4} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="لِمَاذَا اقْتَصَرَتِ الإِجَابَةُ فِي السُّؤَالِ ٣ عَلَى حَقِيقَتَيْنِ فَقَطْ؟"
          hint="انظر إلى العددين في أسفل المثلث: هل هما مختلفان؟"
          steps={[
            { text: 'العددان في أسفل المثلث متساويان: ٩ و٩.' },
            { text: 'إذا بدّلت ترتيبهما في الجمع أحصل على الجملة نفسها: ٩ + ٩ = ١٨' },
            { text: 'ولأن العددين متساويان فلا توجد إلا حقيقة جمع واحدة وحقيقة طرح واحدة.', kind: 'ans' },
          ]}
          chart={<FactTriangle top={18} left={9} right={9} color={TRI.violet[0]} edge={TRI.violet[1]} />}
        />
      ),
    },

    /* ================= أتدرب ٥–٦ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'السطور فارغة كلها: يكتب الطلاب الحقائق الأربع. اكشف الأعداد واحدًا واحدًا.',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <Cols style={{ gridTemplateColumns: '1fr auto', alignItems: 'start' }}>
            <p className="qtext" style={{ margin: 0 }}>{COMPLETE}</p>
            <Card kind="rule" cap="أتذكّر" style={{ fontSize: '.72em' }}>
              تَشْتَرِكُ الْحَقَائِقُ الْمُتَرَابِطَةُ بِالأَعْدَادِ الثَّلاثَةِ نَفْسِهَا.
            </Card>
          </Cols>
          <div className="qgrid one tri-rows book">
            <FullFamily n={5} top={14} left={6} right={8} color={TRI.blue} />
            <FullFamily n={6} top={13} left={5} right={8} color={TRI.violet} />
          </div>
          <Ctrls>
            <NextButton label="العدد التالي" />
            <TimerButton sec={120} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أتدرب ٧–٨ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'في ٨ الجزآن متساويان (٨ و٨): كم حقيقة؟ (اثنتان).',
      content: (
        <>
          <div className="row bookrow">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{COMPLETE}</p>
          <div className="qgrid one tri-rows book">
            <FullFamily n={7} top={15} left={6} right={9} color={TRI.orange} />
            <FullFamily n={8} top={16} left={8} right={8} color={TRI.red} />
          </div>
          <Ctrls>
            <NextButton label="العدد التالي" />
            <TimerButton sec={120} />
          </Ctrls>
        </>
      ),
    },

    /* ================= مهارات التفكير العليا ٩ ================= */
    {
      sec: 'hot', min: 3,
      notes: 'الجبر: الأعداد كلها من مجموعة ٣ و١٠ و١٣. اسأل قبل كل خانة: هل هو المجموع أم أحد الجزأين؟',
      content: (
        <QuestionSlide
          source={HOT} n={9} time={90}
          question={
            <>
              <b style={{ color: 'var(--ex)' }}>الجَبْرُ:</b> أَكْتُبُ الأَعْدَادَ الْمَفْقُودَةَ فِي □:
            </>
          }
          hint="كل الجمل من مجموعة واحدة: ٣ و١٠ و١٣."
          steps={[{ text: 'كلها من مجموعة الحقائق المترابطة للأعداد ٣ و١٠ و١٣', kind: 'ans' }]}
          chart={<FactTriangle top={13} left={3} right={10} color={TRI.green[0]} edge={TRI.green[1]} />}
        >
          <div className="flines tri2">
            <Sentence t={[3, '+', { box: true, b: 10 }, '=', 13]} big />
            <Sentence t={[{ box: true, b: 13 }, '−', 3, '=', 10]} big />
            <Sentence t={[10, '+', { box: true, b: 3 }, '=', 13]} big />
            <Sentence t={[13, '−', { box: true, b: 10 }, '=', 3]} big />
          </div>
        </QuestionSlide>
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
            center={<>الحقائق<br />المترابطة</>}
            items={[
              { kind: 'rule', cap: 'ثلاثة أعداد', text: 'المجموع وجزآن، مثل ٣ و٧ و١٠.' },
              { kind: 'ex', cap: 'أربع حقائق', text: '٧ + ٣، ٣ + ٧، ١٠ − ٣، ١٠ − ٧' },
              { kind: 'qs', cap: 'مثلث الحقائق', text: 'المجموع في الأعلى، والجزآن في الأسفل.' },
              { kind: 'warn', cap: 'جزآن متساويان', text: 'حقيقتان فقط: ٩ + ٩ = ١٨، ١٨ − ٩ = ٩' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 3,
      notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">أكمل المجموعة</SlideHead>
          <Cols style={{ gridTemplateColumns: '8em 1fr', alignItems: 'center' }}>
            <FactTriangle top={11} left={4} right={7} color={TRI.blue[0]} edge={TRI.blue[1]} />
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="٤ + ٧ = ؟" options={['٣', '١١', '١٢']} answer="١١" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="١١ − ٤ = ؟" options={['٧', '٤', '١٥']} answer="٧" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="أيّ جملة ليست من المجموعة؟" options={['٧ + ٤ = ١١', '١١ − ٧ = ٤', '٧ − ٤ = ٣']} answer="٧ − ٤ = ٣" /></Card>
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
