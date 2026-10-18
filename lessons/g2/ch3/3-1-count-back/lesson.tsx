import {
  Card, Cols, CubeTrain, Ctrls, GoHomeButton, HopExplorer, IfTeams, MCQ, Mark, MindMap, NextButton, NumberLine, QCard, QCol,
  QuestionSlide, Sentence, SlideHead, Solution, Stack, Step, Tag, TimerButton, VSum, Winner, defineLesson, type Jump,
} from '@engine';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ · ص ٦٢';
const PRACTICE = 'أتدرَّبُ · ص ٦٣';
const COUNT = 'أَطْرَحُ بِالْعَدِّ التَّنَازُلِيِّ مُسْتَعْمِلاً خَطَّ الأَعْدَادِ:';

/** مسائل الشريحة: [رقم السؤال، المطروح منه، المطروح] */
type P = [n: number, a: number, b: number];
const jumps = (ps: P[]): (Jump & { k: number })[] => ps.map(([k, from, back]) => ({ k, from, back }));

/** خط الأعداد في إطار */
const Line = ({ max, ps, jump, small }: { max: number; ps?: P[]; jump?: Jump; small?: boolean }) => (
  <div className={'chart nlbox' + (small ? ' sm' : '')}>
    <NumberLine max={max} problems={ps ? jumps(ps) : undefined} jump={jump} />
  </div>
);

/** طرح رأسي؛ ظهور الناتج يرسم قفزاته على خط الأعداد */
const VQ = ([n, a, b]: P) => (
  <QCard key={n} n={n} className="vcard">
    <div className="vrow">
      <VSum a={a} op="−" b={b} v={a - b} hl={[`p${n}`]} />
    </div>
  </QCard>
);

/** طرح أفقي */
const HQ = ([n, a, b]: P) => (
  <QCard key={n} n={n}>
    <div className="flines">
      <Sentence t={[a, '−', b, '=', { b: a - b, hl: [`p${n}`] }]} />
    </div>
  </QCard>
);

const Q1_4: P[] = [[1, 7, 3], [2, 8, 1], [3, 9, 2], [4, 6, 3]];
const Q5_7: P[] = [[5, 8, 2], [6, 4, 1], [7, 7, 1]];
const Q9_17: P[] = [[9, 3, 2], [10, 12, 3], [11, 5, 2], [12, 8, 3], [13, 11, 3], [14, 10, 3], [15, 9, 3], [16, 11, 2], [17, 3, 1]];
const Q18_25: P[] = [[18, 9, 1], [19, 5, 3], [20, 10, 1], [21, 4, 2], [22, 3, 2], [23, 4, 3], [24, 7, 2], [25, 6, 1]];

export default defineLesson({
  meta: {
    id: 'g2-3-1-count-back',
    code: '٣-١',
    title: 'الطَّرْحُ بِالْعَدِّ التَّنَازُلِيِّ',
    shortTitle: 'الطرح بالعد التنازلي',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثالث: طرائق الطرح',
    source: 'الجزء الأول · ص ٦٢–٦٣',
    minutes: 45,
    idea: 'أَطْرَحُ بِالْعَدِّ التَّنَازُلِيِّ عَلَى خَطِّ الأَعْدَادِ.',
    bookQuestions: 26,
  },
  sectionDesc: {
    engage: 'التهيئة · العدّ التنازلي',
    explore: 'القفز إلى الخلف على خط الأعداد',
    explain: 'القاعدة · أستعد',
    elab: 'نعمل معًا · من واقع الحياة',
    check: 'الأسئلة ١–٨',
    practice: 'الأسئلة ٩–٢٦',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردات. اسأل: ماذا يحدث للعدد عندما نعدّ إلى الخلف؟ (يصغر).',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَطْرَحُ بِالْعَدِّ التَّنَازُلِيِّ عَلَى خَطِّ الأَعْدَادِ.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>الْعَدُّ التَّنَازُلِيُّ</Mark> · <Mark>الطَّرْحُ</Mark> · <Mark>نَاتِجُ الطَّرْحِ (الْفَرْقُ)</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أعدّ تنازليًا على خط الأعداد.</li>
                <li>أطرح ١ أو ٢ أو ٣ بالعدّ التنازلي.</li>
                <li>أكتب جملة الطرح وناتجها.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 3,
      notes: 'من التهيئة ص ٦١: المكعبات المشطوبة تُطرح. ثم العدّ التنازلي مثل إطلاق الصاروخ: يعدّ الطلاب معًا من ١٠ إلى ٠ وأنت تضغط المسافة.',
      content: (
        <>
          <SlideHead tag="التهيئة · ص ٦١" kind="ink">أطرح بالشطب</SlideHead>
          <Cols even>
            <Card kind="qs">
              <CubeTrain parts={[{ n: 1, color: '#8e6cc9' }, { n: 3, color: '#8e6cc9' }]} joined removed={1} size={40} counts={false} />
              <MCQ q="٤ − ٣ = ؟" options={['١', '٢', '٣']} answer="١" award />
            </Card>
            <Card kind="qs">
              <CubeTrain parts={[{ n: 3, color: '#8e6cc9' }, { n: 3, color: '#8e6cc9' }]} joined removed={1} size={40} counts={false} />
              <MCQ q="٦ − ٣ = ؟" options={['٢', '٣', '٩']} answer="٣" award />
            </Card>
          </Cols>
          <Card kind="rule" cap="نعدّ إلى الخلف">
            <Ctrls>
              <NextButton label="العدد التالي" />
            </Ctrls>
            <div className="countdown">
              {['١٠', '٩', '٨', '٧', '٦', '٥', '٤', '٣', '٢', '١', '٠ 🚀'].map((x) => (
                <Step key={x} className="cd">
                  {x}
                </Step>
              ))}
            </div>
          </Card>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا: يختار عدد البداية وكم يطرح، ثم يضغط «قفزة إلى الخلف» ويعدّ بصوت عالٍ مع كل قفزة. اسأل: أين وقفنا؟ هل العدد أكبر أم أصغر؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">النحلة تقفز إلى الخلف</SlideHead>
          <p style={{ fontSize: '.82em', fontWeight: 700, margin: 0 }}>اختر من أين تبدأ وكم تطرح، ثم اقفز إلى الخلف قفزة قفزة وعدّ معها.</p>
          <HopExplorer max={12} start={[10, 3]} />
          <Card kind="rule" cap="لاحظ">كلما قفزنا إلى الخلف يصغر العدد. العدد الذي نقف عنده هو <b>ناتج الطرح</b>.</Card>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ القاعدة. ذكّر: العدّ التنازلي = نعدّ إلى الخلف (نحو اليسار على خط الأعداد).',
      content: (
        <>
          <SlideHead tag="القاعدة" kind="rule">الطرح بالعدّ التنازلي</SlideHead>
          <Card kind="rule" style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.8 }}>
            أَسْتَعْمِلُ خَطَّ الأَعْدَادِ، وَ<Mark>أَعُدُّ تَنَازُلِيًّا</Mark> لِأَطْرَحَ.
          </Card>
          <Cols even>
            <Card kind="ex" cap="الْعَدُّ التَّنَازُلِيُّ">أبدأ من العدد الأكبر، وأعدّ إلى الخلف بمقدار العدد المطروح.</Card>
            <Card kind="ex" cap="نَاتِجُ الطَّرْحِ (الْفَرْقُ)">العدد الذي أقف عنده بعد العدّ.</Card>
          </Cols>
        </>
      ),
    },

    /* ================= أستعد · مثال الكتاب ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: ضع إصبعك على ١٠ في السبورة، ثم اقفز ٣ قفزات وعدّ: ١، ٢، ٣. «وقفتُ عند ٧».',
      content: (
        <>
          <SlideHead tag="أستعد · ص ٦٢" kind="ex">النحلة والخلية</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">أَجِدُ نَاتِجَ الطَّرْحِ (الفَرْقَ): ١٠ − ٣</p>
              <Ctrls>
                <NextButton />
              </Ctrls>
              <Solution>
                <Step hl={['p0']}>أَبْدَأُ بِالْعَدَدِ ١٠، ثُمَّ أَعُدُّ تَنَازُلِيًّا بِمِقْدَارِ ٣.</Step>
                <Step kind="ans">
                  <Sentence t={[10, '−', 3, '=', 7]} />
                </Step>
              </Solution>
            </QCol>
            <Line max={10} ps={[[0, 10, 3]]} />
          </Cols>
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 4,
      notes: 'نعمل معًا: اختر طالبًا بالعجلة يأتي إلى السبورة ويقفز بإصبعه على خط الأعداد قبل أن يختار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أين أقف؟</SlideHead>
          <Line max={12} small />
          <Stack>
            <MCQ q="أ) أَبْدَأُ مِنْ ٩ وَأَعُدُّ تَنَازُلِيًّا ٢. عِنْدَ أَيِّ عَدَدٍ أَقِفُ؟" options={['٦', '٧', '١١']} answer="٧" award />
            <MCQ q="ب) عَدَدْتُ: ٦، ٥، ٤. أَيُّ جُمْلَةِ طَرْحٍ تُمَثِّلُ هَذَا الْعَدَّ؟" options={['٦ − ٢ = ٤', '٦ + ٢ = ٨', '٤ − ٢ = ٢']} answer="٦ − ٢ = ٤" award />
            <MCQ q="ج) عِنْدَمَا أَعُدُّ تَنَازُلِيًّا يَكُونُ الْعَدَدُ الَّذِي أَقِفُ عِنْدَهُ:" options={['أَصْغَرَ', 'أَكْبَرَ']} answer="أَصْغَرَ" award />
          </Stack>
        </>
      ),
    },

    /* ================= من واقع الحياة ================= */
    {
      sec: 'elab', min: 2,
      notes: 'اقرأ القصة، واطلب من الطلاب أن يقفزوا بأصابعهم في الهواء ٣ قفزات وهم يعدّون.',
      content: (
        <>
          <SlideHead tag="من واقع الحياة" kind="ex">نحل الخلية</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">عِنْدَ الْخَلِيَّةِ ١١ نَحْلَةً، طَارَ مِنْهَا ٣ نَحَلَاتٍ. كَمْ نَحْلَةً بَقِيَتْ؟</p>
              <MCQ options={['٧', '٨', '١٤']} answer="٨" award />
              <Ctrls>
                <NextButton label="كيف أفكّر؟" />
              </Ctrls>
              <Solution>
                <Step hl={['p0']}>أبدأ من ١١ وأعدّ تنازليًا ٣: ١٠، ٩، ٨</Step>
                <Step kind="ans">
                  <Sentence t={[11, '−', 3, '=', 8]} />
                </Step>
              </Solution>
            </QCol>
            <Line max={12} ps={[[0, 11, 3]]} />
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٤ ================= */
    {
      sec: 'check', min: 4,
      notes: 'كل ضغطة على السهم تكشف ناتجًا وترسم قفزاته على خط الأعداد. اطلب من الطلاب أن يعدّوا القفزات بصوت عالٍ.',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{CHECK}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{COUNT}</p>
          <Line max={10} ps={Q1_4} />
          <div className="qgrid four">{Q1_4.map(VQ)}</div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={90} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أتأكد ٥–٧ ================= */
    {
      sec: 'check', min: 3,
      notes: 'الطرح هنا أفقي. ذكّر: أبدأ بالعدد الأول ثم أعدّ تنازليًا.',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{CHECK}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{COUNT}</p>
          <Line max={10} ps={Q5_7} />
          <div className="qgrid three">{Q5_7.map(HQ)}</div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={60} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أتأكد ٨ · أتحدث ================= */
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: اطلب من طالبين أن يشرحا بكلماتهما، ثم اعرض الخطوات.',
      content: (
        <QuestionSlide
          source={CHECK} n={8} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="كَيْفَ أَجِدُ نَاتِجَ الطَّرْحِ باسْتِعْمَالِ الْعَدِّ التَّنَازُلِيِّ عَلَى خَطِّ الأَعْدَادِ؟"
          hint="ابدأ جوابك بـ: «أضع إصبعي على…»."
          steps={[
            { text: 'أضع إصبعي على العدد الأول (الأكبر) على خط الأعداد.', hl: ['p0'] },
            { text: 'أعدّ إلى الخلف بمقدار العدد المطروح، قفزة لكل واحد.' },
            { text: 'العدد الذي أقف عنده هو ناتج الطرح. مثال: ٨ − ٢ = ٦', kind: 'ans' },
          ]}
          chart={<Line max={10} ps={[[0, 8, 2]]} />}
        />
      ),
    },

    /* ================= أتدرب ٩–١٧ ================= */
    {
      sec: 'practice', min: 5,
      notes: 'خط الأعداد هنا حتى ١٢. أعطِ دقيقتين للحل على السبورات الصغيرة، ثم اكشف الناتج واحدًا واحدًا.',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <p className="qtext" style={{ margin: 0 }}>{COUNT}</p>
          <Line max={12} ps={Q9_17} />
          <div className="qgrid three">{Q9_17.map(HQ)}</div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={120} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أتدرب ١٨–٢٥ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'الطرح الرأسي: العدد العلوي هو البداية، والسفلي كم نعدّ إلى الخلف.',
      content: (
        <>
          <div className="row">
            <Tag kind="qs">{PRACTICE}</Tag>
          </div>
          <Line max={12} ps={Q18_25} />
          <div className="qgrid four">{Q18_25.map(VQ)}</div>
          <Ctrls>
            <NextButton label="الناتج التالي" />
            <TimerButton sec={120} />
          </Ctrls>
        </>
      ),
    },

    /* ================= أتدرب ٢٦ · أكتب ================= */
    {
      sec: 'practice', min: 2,
      notes: 'أكتب: يكتب كل طالب جملة في دفتره، ثم يقرأ اثنان ما كتبا.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={26} tags={[{ kind: 'warn', text: 'أكتُبُ' }]}
          question="مَا الْعَدَدُ الَّذِي أَحْصُلُ عَلَيْهِ، عِنْدَمَا أَعُدُّ تَنَازُلِيًّا عَلَى خَطِّ الأَعْدَادِ؟"
          hint="هل يكون العدد الذي أقف عنده أكبر أم أصغر من عدد البداية؟"
          steps={[
            { text: 'عندما أعدّ تنازليًا أتحرك إلى الخلف، فيصغر العدد.', hl: ['p0'] },
            { text: 'أحصل على عدد أصغر من العدد الذي بدأت منه، وهو ناتج الطرح (الفرق).', kind: 'ans' },
          ]}
          chart={<Line max={12} ps={[[0, 12, 3]]} />}
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
            center={<>الطرح بالعدّ<br />التنازلي</>}
            items={[
              { kind: 'rule', cap: 'أبدأ', text: 'من العدد الأكبر على خط الأعداد.' },
              { kind: 'ex', cap: 'أعدّ إلى الخلف', text: 'قفزة لكل واحد من العدد المطروح.' },
              { kind: 'qs', cap: 'الناتج', text: 'العدد الذي أقف عنده هو الفرق.' },
              { kind: 'warn', cap: 'مثال', text: '١٠ − ٣: ٩، ٨، ٧، إذن ١٠ − ٣ = ٧' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 3,
      notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة. من يخطئ في السؤال الأول يحتاج دعمًا بالعدّ على الأصابع.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">أعدّ إلى الخلف</SlideHead>
          <Cols style={{ gridTemplateColumns: '1fr 1.3fr' }}>
            <Line max={12} />
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="٥ − ١ = ؟" options={['٣', '٤', '٦']} answer="٤" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="أبدأ من ١٢ وأعدّ تنازليًا ٣. أين أقف؟" options={['٨', '٩', '١٥']} answer="٩" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="عددتُ تنازليًا ٣ قفزات فوقفت عند ٥. من أين بدأت؟" options={['٢', '٧', '٨']} answer="٨" /></Card>
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



