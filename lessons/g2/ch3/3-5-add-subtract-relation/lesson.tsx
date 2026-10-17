import {
  CUBE, Card, Cols, CubeTrain, Ctrls, FactFamily, FactLine, GoHomeButton, IfTeams, MCQ, Mark, MindMap,
  NextButton, QCol, QuestionSlide, SlideHead, Solution, Stack, Step, Tag, TimerButton, VSum, Winner, defineLesson, num,
  type CubePart, type ItemShape,
} from '@engine';

/* ---------- رسوم صغيرة خاصة بهذا الدرس ---------- */

interface Pic {
  parts: CubePart[];
  shape?: ItemShape;
  /** الجزء المأخوذ في الطرح الأول ثم الثاني (انظر CubeTrain) */
  take?: [number, number?];
  /** رقم الصف عندما تكون في الشريحة عدة صفوف */
  k?: number;
  joined?: boolean;
  size?: number;
}

/** الصف في إطار، في عمود الرسم */
const Cubes = (p: Pic) => (
  <div className="chart cubebox">
    <CubeTrain {...p} />
  </div>
);

/** بطاقة سؤال صغيرة بين عدة أسئلة على شريحة واحدة؛ data-qnum تعدّها الاختبارات */
function QCard({ n, className, children }: { n: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={'card qcard ' + (className ?? '')} data-qnum={n}>
      <span className="qnum">{num(n)}</span>
      {children}
    </div>
  );
}

/** جزآن بالأخضر والأصفر */
const g = (a: number, b: number): CubePart[] => [
  { n: a, color: CUBE.green },
  { n: b, color: CUBE.yellow },
];

const CHECK = 'أتأكَّدُ · ص ٧٢';
const PRACTICE = 'أتدرَّبُ · ص ٧٣';
const SOLVE = 'أحُلُّ المسألةَ · ص ٧٣';
const FIND = 'أَجِدُ نَاتِجَ الطَّرْحِ مُسْتَعْمِلًا حَقَائِقَ الْجَمْعِ:';

/**
 * سؤال رأسي من أتدرب ٦–١١: الصف فوق، ثم الجمع والطرح.
 * ناتج الجمع يضمّ الجزأين، وناتج الطرح يأخذ الجزء المطروح.
 */
function VPair({ n, a, b, sub }: { n: number; a: number; b: number; sub: number }) {
  const c = a + b;
  return (
    <QCard n={n} className="vcard">
      <div className="vrow">
        <VSum a={a} op="+" b={b} v={c} hl={[`p${n}`]} />
        <VSum a={c} op="−" b={sub} v={c - sub} hl={[`v${n}`]} />
      </div>
      <CubeTrain parts={g(a, b)} k={n} take={[sub === a ? 0 : 1]} size={40} counts={false} />
    </QCard>
  );
}

/** مجموعة حقائق من أتدرب ١٢–١٥: الجمع، ثم طرح الجزء الثاني، ثم الأول */
function Family({ n, a, b }: { n: number; a: number; b: number }) {
  const c = a + b;
  return (
    <QCard n={n} className="fcard">
      <div className="flines">
        <FactLine a={a} op="+" b={b} v={c} hl={[`p${n}`]} />
        <FactLine a={c} op="−" b={b} v={a} hl={[`v${n}`]} />
        <FactLine a={c} op="−" b={a} v={b} hl={[`x${n}`]} />
      </div>
      <CubeTrain parts={g(a, b)} k={n} take={[1, 0]} size={40} counts={false} />
    </QCard>
  );
}

export default defineLesson({
  meta: {
    id: 'g2-3-5-add-subtract-relation',
    code: '٣-٥',
    title: 'الْعَلاقَةُ بَيْنَ الْجَمْعِ وَالطَّرْحِ',
    shortTitle: 'العلاقة بين الجمع والطرح',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثالث: طرائق الطرح',
    source: 'الجزء الأول · ص ٧٢–٧٣',
    minutes: 45,
    idea: 'أَطْرَحُ مُسْتَعْمِلًا حَقَائِقَ الْجَمْعِ.',
    bookQuestions: 17,
  },
  sectionDesc: {
    engage: 'مراجعة حقائق الجمع · لغز الملاعق',
    explore: 'مستكشف الحقائق المترابطة',
    explain: 'القاعدة · أستعد',
    elab: 'نعمل معًا · من واقع الحياة',
    check: 'الأسئلة ١–٥',
    practice: 'الأسئلة ٦–١٧',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردتين. اسأل: ماذا تعني كلمة «عكس»؟ (مثل: أفتح الباب وأغلقه، أصعد وأنزل).',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَطْرَحُ مُسْتَعْمِلًا حَقَائِقَ الْجَمْعِ.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>الْحَقَائِقُ الْمُتَرَابِطَةُ</Mark> · <Mark>الْعَكْسُ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أكتب حقائق الجمع والطرح المترابطة.</li>
                <li>أستعمل حقيقة جمع لأجد ناتج الطرح.</li>
                <li>أتحقق من الجمع بالطرح.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة: مراجعة حقائق الجمع ================= */
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة سريعة من الفصل الثاني (طرائق الجمع). أدر العجلة لاختيار طالب، وامنح نجمة لفريقه عند الإجابة الصحيحة.',
      content: (
        <>
          <SlideHead tag="تذكّر · الفصل ٢" kind="ink">حقائق الجمع</SlideHead>
          <Cols even>
            <Card kind="qs">
              <CubeTrain parts={g(8, 5)} k={1} size={36} />
              <MCQ q="٨ + ٥ = ؟" options={['١٢', '١٣', '١٤']} answer="١٣" award />
            </Card>
            <Card kind="qs">
              <CubeTrain parts={g(9, 6)} k={2} size={36} />
              <MCQ q="٩ + ٦ = ؟" options={['١٤', '١٥', '١٦']} answer="١٥" award />
            </Card>
          </Cols>
          <Card kind="rule" cap="سؤال للتفكير">إذا كنا نحفظ حقائق الجمع جيدًا، هل تساعدنا في <b>الطرح</b>؟ لنكتشف ذلك!</Card>
        </>
      ),
    },

    /* ================= تهيئة: لغز الملاعق ================= */
    {
      sec: 'engage', min: 3,
      notes: 'اقرأ القصة. اسأل: كم ملعقة بقيت؟ دع الطلاب يجيبون دون عدّ إن استطاعوا. اضغط المسافة لإظهار الخطوات: الملاعق الصفراء تُؤخذ من الطاولة.',
      content: (
        <>
          <SlideHead tag="لغز" kind="qs">ملاعق المطبخ</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">رتّبت هند على الطاولة <b style={{ color: CUBE.green }}>٥ ملاعق خضراء</b> و<b style={{ color: '#a57a00' }}>٤ ملاعق صفراء</b>، فصار عددها ٩. ثم أخذت أمها الملاعق الصفراء. كم ملعقة بقيت؟</p>
              <Ctrls>
                <NextButton />
              </Ctrls>
              <Solution>
                <Step hl={['p0']}>أتذكّر حقيقة الجمع: ٥ + ٤ = ٩</Step>
                <Step hl={['v0']}>أخذت الأم ٤ ملاعق صفراء: ٩ − ٤ = ؟</Step>
                <Step kind="ans">بقيت ٥ ملاعق. عرفتُ الجواب من حقيقة الجمع دون أن أعدّ!</Step>
              </Solution>
            </QCol>
            <Cubes parts={g(5, 4)} shape="spoon" take={[1]} size={52} />
          </Cols>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا إلى السبورة يغيّر عدد المكعبات الخضراء والصفراء، ثم يضغط كل حقيقة. اسأل: ماذا تلاحظ على الأعداد في الحقائق الأربع؟ (الأعداد نفسها). ماذا يحدث للمكعبات عند الجمع؟ وعند الطرح؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">عائلة من الحقائق</SlideHead>
          <p style={{ fontSize: '.82em', fontWeight: 700, margin: 0 }}>غيّر عدد المكعبات، ثم اضغط كل جملة وراقب المكعبات. ماذا تلاحظ على الأعداد؟</p>
          <FactFamily start={[5, 4]} />
          <Card kind="rule" cap="لاحظ">الجمل الأربع تستعمل <b>الأعداد الثلاثة نفسها</b>: الجمع يضمّ الجزأين، والطرح يأخذ جزءًا فيبقى الآخر.</Card>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ القاعدتين من الكتاب. اطلب من الطلاب أن يكرروا معك: «الجمع عكس الطرح». أشر إلى الجزأين المضمومين.',
      content: (
        <>
          <SlideHead tag="القاعدة" kind="rule">الجمع والطرح متعاكسان</SlideHead>
          <Cols even>
            <Stack>
              <Card kind="rule" style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.8 }}>
                عَمَلِيَّةُ الْجَمْعِ <Mark>عَكْسُ</Mark> عَمَلِيَّةِ الطَّرْحِ.
              </Card>
              <Card kind="rule" style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.8 }}>
                تَشْتَرِكُ <Mark>الْحَقَائِقُ الْمُتَرَابِطَةُ</Mark> فِي الْأَعْدَادِ نَفْسِهَا.
              </Card>
            </Stack>
            <Card kind="ex" cap="حقائق مترابطة للأعداد ٥ و٤ و٩">
              <CubeTrain parts={g(5, 4)} joined size={40} />
              <div className="flines facts4">
                <span className="eq">٥ + ٤ = ٩</span>
                <span className="eq">٤ + ٥ = ٩</span>
                <span className="eq">٩ − ٤ = ٥</span>
                <span className="eq">٩ − ٥ = ٤</span>
              </div>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= أستعد · مثال الكتاب ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: اقرأ كل جملة بصوت مسموع وأشر إلى المكعبات. «أضمّ ٥ و٤ فيصيران ٩. إذا أخذتُ ٤ يبقى ٥، وإذا أخذتُ ٥ يبقى ٤».',
      content: (
        <>
          <SlideHead tag="أستعد · ص ٧٢" kind="ex">أستعمل الجمع لأطرح</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">أَسْتَعْمِلُ حَقَائِقَ الْجَمْعِ لِأَجِدَ نَاتِجَ الطَّرْحِ. تَشْتَرِكُ الْحَقَائِقُ الْمُتَرَابِطَةُ فِي الْأَعْدَادِ نَفْسِهَا.</p>
              <div className="flines">
                <FactLine a={5} op="+" b={4} v={9} hl={['p0']} />
                <FactLine a={9} op="−" b={4} v={5} hl={['v0']} />
                <FactLine a={9} op="−" b={5} v={4} hl={['x0']} />
              </div>
              <Ctrls>
                <NextButton />
              </Ctrls>
              <Solution>
                <Step kind="ans">عَمَلِيَّةُ الْجَمْعِ عَكْسُ عَمَلِيَّةِ الطَّرْحِ.</Step>
              </Solution>
            </QCol>
            <Cubes parts={g(5, 4)} take={[1, 0]} />
          </Cols>
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 4,
      notes: 'نعمل معًا: اقرأ كل سؤال، واختر طالبًا بالعجلة. اطلب منه أن يقول حقيقة الجمع التي ساعدته قبل أن يختار. امنح النجمة لفريقه.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أي حقيقة تساعدني؟</SlideHead>
          <div className="mcqpics">
            <MCQ q="أ) أيّ حقيقة جمع تساعدني على إيجاد ١٢ − ٥ ؟" options={['٥ + ٧ = ١٢', '٥ + ٥ = ١٠', '٦ + ٦ = ١٢']} answer="٥ + ٧ = ١٢" award />
            <CubeTrain parts={g(5, 7)} joined size={34} />
            <MCQ q="ب) إذا كان ٨ + ٦ = ١٤، فما ناتج ١٤ − ٦ ؟" options={['٦', '٨', '٢٠']} answer="٨" award />
            <CubeTrain parts={g(8, 6)} joined size={34} />
            <MCQ q="ج) أيّ جملة لا تستعمل الأعداد ٣ و٧ و١٠ نفسها؟" options={['٣ + ٧ = ١٠', '١٠ − ٣ = ٧', '١٠ − ٤ = ٦']} answer="١٠ − ٤ = ٦" award />
            <CubeTrain parts={g(3, 7)} joined size={34} />
          </div>
        </>
      ),
    },

    /* ================= من واقع الحياة ================= */
    {
      sec: 'elab', min: 2,
      notes: 'اسأل: أين نحتاج الطرح في حياتنا؟ (المقصف، المصروف، الألعاب). شجّع الطلاب على قول حقيقة الجمع بصوت عالٍ.',
      content: (
        <>
          <SlideHead tag="من واقع الحياة" kind="ex">عصير المقصف</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">في ثلاجة المقصف ١٥ علبة عصير، بِيع منها ٩ علب. كم علبة بقيت؟</p>
              <MCQ options={['٥', '٦', '٧']} answer="٦" award />
              <Ctrls>
                <NextButton label="كيف أفكّر؟" />
              </Ctrls>
              <Solution>
                <Step>أبحث عن حقيقة جمع فيها ٩ و١٥: ٩ + ٦ = ١٥</Step>
                <Step kind="ans" hl={['v0']}>إذن ١٥ − ٩ = ٦، بقيت ٦ علب.</Step>
              </Solution>
            </QCol>
            <Cubes parts={[{ n: 9, color: CUBE.orange }, { n: 6, color: CUBE.blue }]} shape="juice" joined take={[0]} size={40} />
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٥ ================= */
    {
      sec: 'check', min: 2,
      notes: '«أنت تعمل»: أعطِ ٤٥ ثانية للحل على السبورات الصغيرة. ذكّر الطلاب: ابدأ بجملة الجمع، ثم استعمل الأعداد نفسها.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={45}
          question={FIND}
          hint="اجمع المكعبات أولًا، ثم خذ جزءًا وانظر كم يبقى."
          steps={[{ text: 'الأعداد نفسها: ٦ و٧ و١٣', kind: 'ans' }]}
          chart={<Cubes parts={[{ n: 6, color: CUBE.green }, { n: 7, color: CUBE.orange }]} take={[0, 1]} />}
        >
          <div className="flines">
            <FactLine a={6} op="+" b={7} v={13} hl={['p0']} />
            <FactLine a={13} op="−" b={6} v={7} hl={['v0']} />
            <FactLine a={13} op="−" b={7} v={6} hl={['x0']} />
          </div>
        </QuestionSlide>
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'اطلب من طالب أن يقرأ جملة الجمع، ثم يأخذ المكعبات الزرقاء بإصبعه على السبورة.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} time={45}
          question={FIND}
          hint="٥ + ٧ = ؟ ثم استعمل الأعداد نفسها."
          steps={[{ text: 'الأعداد نفسها: ٥ و٧ و١٢', kind: 'ans' }]}
          chart={<Cubes parts={[{ n: 5, color: CUBE.yellow }, { n: 7, color: CUBE.blue }]} take={[1, 0]} />}
        >
          <div className="flines">
            <FactLine a={5} op="+" b={7} v={12} hl={['p0']} />
            <FactLine a={12} op="−" b={7} v={5} hl={['v0']} />
            <FactLine a={12} op="−" b={5} v={7} hl={['x0']} />
          </div>
        </QuestionSlide>
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'هذا السؤال فيه ٩ مكعبات خضراء: ذكّر الطلاب بإستراتيجية «أكوّن العشرة» إن احتاجوا: ٩ + ٦ = ٩ + ١ + ٥.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} time={45}
          question={FIND}
          hint="٩ + ٦ = ؟ (أكمل ٩ إلى ١٠ أولًا)."
          steps={[{ text: 'الأعداد نفسها: ٩ و٦ و١٥', kind: 'ans' }]}
          chart={<Cubes parts={[{ n: 9, color: CUBE.green }, { n: 6, color: CUBE.red }]} take={[1, 0]} />}
        >
          <div className="flines">
            <FactLine a={9} op="+" b={6} v={15} hl={['p0']} />
            <FactLine a={15} op="−" b={6} v={9} hl={['v0']} />
            <FactLine a={15} op="−" b={9} v={6} hl={['x0']} />
          </div>
        </QuestionSlide>
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'اطلب من الطلاب كتابة الجمل الثلاث على السبورات الصغيرة ورفعها معًا.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} time={45}
          question={FIND}
          hint="٧ + ٤ = ؟ ثم خذ الأصفر مرة، والأخضر مرة."
          steps={[{ text: 'الأعداد نفسها: ٧ و٤ و١١', kind: 'ans' }]}
          chart={<Cubes parts={[{ n: 7, color: CUBE.green }, { n: 4, color: CUBE.yellow }]} take={[1, 0]} />}
        >
          <div className="flines">
            <FactLine a={7} op="+" b={4} v={11} hl={['p0']} />
            <FactLine a={11} op="−" b={4} v={7} hl={['v0']} />
            <FactLine a={11} op="−" b={7} v={4} hl={['x0']} />
          </div>
        </QuestionSlide>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: اطلب من طالبين أن يشرحا بكلماتهما، ثم اعرض الخطوات. ركّز على كلمتي «عكس» و«الأعداد نفسها».',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="ما الْعَلاقَةُ بَيْنَ عَمَلِيَّتَيِ الْجَمْعِ وَالطَّرْحِ؟"
          hint="ابدأ جوابك بـ: «الجمع … الطرح»، واستعمل مثال المكعبات."
          steps={[
            { text: 'الجمع يضمّ الجزأين: ٥ + ٤ = ٩', hl: ['p0'] },
            { text: 'والطرح يأخذ جزءًا: ٩ − ٤ = ٥', hl: ['v0'] },
            { text: 'وأيضًا: ٩ − ٥ = ٤', hl: ['x0'] },
            { text: 'الجمع عكس الطرح، والحقائق المترابطة تستعمل الأعداد نفسها.', kind: 'ans' },
          ]}
          chart={<Cubes parts={g(5, 4)} take={[1, 0]} />}
        />
      ),
    },

    /* ================= أتدرب ٦–١١ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'الأسئلة الرأسية: اطلب من الطلاب حل الجمع أولًا ثم الطرح على السبورات الصغيرة. كل ضغطة على السهم تكشف ناتجًا واحدًا: الجمع يضمّ المكعبات، والطرح يأخذ جزءًا منها. تلميح للطلاب: ناتج الطرح هو العدد الآخر في جملة الجمع.',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{FIND}</p>
          <div className="qgrid three">
            <VPair n={6} a={8} b={9} sub={8} />
            <VPair n={7} a={9} b={6} sub={9} />
            <VPair n={8} a={9} b={5} sub={5} />
            <VPair n={9} a={7} b={6} sub={6} />
            <VPair n={10} a={8} b={4} sub={8} />
            <VPair n={11} a={8} b={7} sub={7} />
          </div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={120} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أتدرب ١٢–١٥ ================= */
    {
      sec: 'practice', min: 3,
      notes: 'كل سؤال ثلاث جمل مترابطة. اسأل قبل الكشف: أي جملة أبدأ بها؟ (الجمع).',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <Cols style={{ gridTemplateColumns: '1fr auto', alignItems: 'start' }}>
            <p className="qtext" style={{ margin: 0 }}>{FIND}</p>
            <Card kind="rule" cap="أَتَذَكَّرُ" style={{ fontSize: '.75em' }}>أَسْتَعْمِلُ الْأَعْدَادَ نَفْسَهَا فِي الْحَقَائِقِ الْمُتَرَابِطَةِ.</Card>
          </Cols>
          <div className="qgrid two">
            <Family n={12} a={7} b={9} />
            <Family n={13} a={5} b={6} />
            <Family n={14} a={6} b={8} />
            <Family n={15} a={8} b={5} />
          </div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={120} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أحل المسألة ١٦–١٧ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'الحس العددي: كل الجمل صحيحة حسابيًا، لكن واحدة فقط تستعمل الأعداد نفسها. اسأل: لماذا لا تصلح ١٠ − ٤ = ٦؟',
      content: (
        <>
          <div className="row">
            <Tag kind="ex">{SOLVE}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>
            <b style={{ color: 'var(--ex)' }}>الْحِسُّ الْعَدَدِيُّ:</b> أُحَوِّطُ جُمْلَةَ الطَّرْحِ الَّتِي أَسْتَعْمِلُهَا لِلتَّحَقُّقِ مِنْ عَمَلِيَّةِ الْجَمْعِ:
          </p>
          <div className="qgrid one">
            <QCard n={16} className="mcard">
              <MCQ q="٩ + ٤ = ١٣" options={['١٣ − ١ = ١٢', '١٣ − ٤ = ٩', '١٠ − ٤ = ٦']} answer="١٣ − ٤ = ٩" award />
              <CubeTrain parts={g(9, 4)} joined size={34} />
            </QCard>
            <QCard n={17} className="mcard">
              <MCQ q="٧ + ٥ = ١٢" options={['١٢ − ٤ = ٨', '١٢ − ١ = ١١', '١٢ − ٥ = ٧']} answer="١٢ − ٥ = ٧" award />
              <CubeTrain parts={g(7, 5)} joined size={34} />
            </QCard>
          </div>
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
            center={<>العلاقة بين<br />الجمع والطرح</>}
            items={[
              { kind: 'rule', cap: 'القاعدة', text: 'عملية الجمع عكس عملية الطرح.' },
              { kind: 'ex', cap: 'الحقائق المترابطة', text: 'تستعمل الأعداد نفسها: ٥ + ٤ = ٩، ٩ − ٤ = ٥، ٩ − ٥ = ٤' },
              { kind: 'qs', cap: 'كيف أطرح؟', text: 'أبحث عن حقيقة جمع فيها العددان، فأجد العدد الآخر.' },
              { kind: 'warn', cap: 'كيف أتحقق؟', text: 'أتحقق من الجمع بالطرح، ومن الطرح بالجمع.' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 3,
      notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة. من يخطئ في السؤال الأول يحتاج دعمًا بالمكعبات.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">أطرح بالجمع</SlideHead>
          <Cols style={{ gridTemplateColumns: '1fr 1.4fr' }}>
            <Cubes parts={g(4, 5)} joined />
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="٤ + ٥ = ٩، إذن ٩ − ٥ = ؟" options={['٤', '٥', '٩']} answer="٤" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="أيّ حقيقة جمع تساعدني على إيجاد ١٥ − ٨ ؟" options={['٨ + ٧ = ١٥', '٨ + ٨ = ١٦', '٧ + ٧ = ١٤']} answer="٨ + ٧ = ١٥" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="١١ − ؟ = ٣" options={['٧', '٨', '١٤']} answer="٨" /></Card>
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
