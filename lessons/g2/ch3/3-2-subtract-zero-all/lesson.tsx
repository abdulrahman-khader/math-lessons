import {
  Blank, BookLabel, BookSource, Card, Cols, CubeBox, CubeTrain, ExitTicket, FrogExplorer, Frogs, Goals, GoHomeButton, Grid, IfTeams, Intro, LineBox,
  Lines, Mark, MCQ, MindMap, NumberLine, QCard, QCol, QText, QuestionSlide, Sentence, SentenceCard, SlideHead, Solution, Stack, Step, SumCard,
  Winner, defineLesson, type Token,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ، ص ٦٤';
const PRACTICE = 'أتدرَّبُ، ص ٦٥';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ٦٥';
const FIND = 'أَجِدُ ناتِجَ الطَّرْحِ:';
const FIND_CIRCLE = 'أَجِدُ ناتِجَ الطَّرْحِ، ثُمَّ أُحَوِّطُ المَسْأَلَةَ الَّتِي نَاتِجُ الطَّرْحِ فِيهَا يُسَاوِي صِفْرًا:';

/** سطر جملة طرح أفقية بخانة الناتج */
const S = (a: number, b: number): Token[] => [a, '−', b, '=', { b: a - b }];
/** سؤال أفقي من أتدرب؛ إن كان ناتجه صفرًا تُحوَّط بطاقته بعد ظهور الناتج */
const HQ = ({ n, a, b }: { n: number; a: number; b: number }) => <SentenceCard n={n} lines={[S(a, b)]} ring={a === b ? 'صفر' : undefined} />;
/** سؤال رأسي من أتدرب */
const VQ = ({ n, a, b }: { n: number; a: number; b: number }) => <SumCard n={n} sums={[{ a, op: '−', b, v: a - b }]} ring={a === b ? 'صفر' : undefined} />;
const SUGGESTED = 'إِجَابَةٌ مُقْتَرَحَةٌ';

export default defineLesson({
  meta: {
    id: 'g2-3-2-subtract-zero-all',
    design: 'v2',
    code: '٣-٢',
    title: 'طَرْحُ الصِّفْرِ وَطَرْحُ الْكُلِّ',
    shortTitle: 'طرح الصفر وطرح الكل',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثالث: طرائق الطرح',
    source: 'الجزء الأول، ص ٦٤–٦٥',
    minutes: 45,
    idea: 'أَطْرَحُ الصِّفْرَ مِنْ عَدَدٍ، وَأَطْرَحُ عَدَدًا مِنْ نَفْسِهِ.',
    bookQuestions: 23,
  },
  sectionDesc: {
    engage: 'مراجعة العدّ التنازلي',
    explore: 'الضفادع على ورقة اللوتس',
    explain: 'القاعدة، أستعد',
    elab: 'نعمل معًا، من واقع الحياة',
    check: 'الأسئلة ١–٧',
    practice: 'الأسئلة ٨–٢١',
    hot: 'الأسئلة ٢٢–٢٣',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. اسأل: إذا كان معك ٥ حلوى ولم تعطِ أحدًا شيئًا، كم يبقى معك؟',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَطْرَحُ الصِّفْرَ مِنْ عَدَدٍ، وَأَطْرَحُ عَدَدًا مِنْ نَفْسِهِ.</Card>
              <Card kind="rule" cap="نتذكّر">
                <Mark>الصِّفْرُ</Mark> يَعْنِي: لَا شَيْءَ.
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals
                items={[
                  'أَطْرَحُ الصِّفْرَ مِنْ عَدَدٍ.',
                  'أَطْرَحُ عَدَدًا مِنْ نَفْسِهِ.',
                  'أَعْرِفُ مَتَى يَكُونُ النَّاتِجُ صِفْرًا.',
                ]}
              />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 3,
      notes: 'ربط بالدرس ٣-١: يقفز الطالب بإصبعه على خط الأعداد. ثم سؤال التفكير يمهّد للدرس.',
      content: (
        <>
          <SlideHead tag="تذكّر، الدرس ٣-١" kind="ink">الطرح بالعدّ التنازلي</SlideHead>
          <LineBox small>
            <NumberLine max={10} />
          </LineBox>
          <Cols even>
            <Card kind="qs">
              <MCQ q="٧ − ٢ = ؟" options={['٤', '٥', '٩']} answer="٥" award />
            </Card>
            <Card kind="qs">
              <MCQ q="٦ − ١ = ؟" options={['٥', '٦', '٧']} answer="٥" award />
            </Card>
          </Cols>
          <Card kind="rule" cap="سؤال للتفكير">
            كَمْ قَفْزَةً نَقْفِزُ فِي <Mark>٤ − ٠</Mark>؟ وَكَمْ قَفْزَةً فِي <Mark>٤ − ٤</Mark>؟
          </Card>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا يغيّر عدد الضفادع، ثم يضغط «تقفز كلها» مرة و«لا يقفز أيّ ضفدع» مرة. اسأل: كم بقي في كل مرة؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">الضفادع على ورقة اللوتس</SlideHead>
          <Intro>نَخْتَارُ عَدَدَ الضَّفَادِعِ، ثُمَّ: هَلْ تَقْفِزُ كُلُّهَا؟ أَمْ لَا يَقْفِزُ أَيُّ ضِفْدَعٍ؟</Intro>
          <FrogExplorer />
          <Card kind="rule" cap="نُلَاحِظُ">إِذَا قَفَزَتْ كُلُّهَا لَمْ يَبْقَ شَيْءٌ (صِفْرٌ)، وَإِذَا لَمْ يَقْفِزْ أَيُّ ضِفْدَعٍ بَقِيَ الْعَدَدُ كَمَا هُوَ.</Card>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 2,
      notes: 'اقرأ القاعدتين، واطلب من الطلاب أن يكملوا: «العدد ناقص صفر يساوي…» «العدد ناقص نفسه يساوي…».',
      content: (
        <>
          <SlideHead tag="القاعدة" kind="rule">طرح الصفر وطرح الكل</SlideHead>
          <Cols even>
            <Card kind="rule" cap="أَطْرَحُ صِفْرًا">
              عِنْدَمَا أَطْرَحُ <Mark>الصِّفْرَ</Mark> مِنْ أَيِّ عَدَدٍ فَإِنَّ نَاتِجَ الطَّرْحِ هُوَ العَدَدُ نَفْسُهُ.
              <Sentence t={[8, '−', 0, '=', 8]} big />
            </Card>
            <Card kind="rule" cap="أَطْرَحُ الْكُلَّ">
              عِنْدَمَا أَطْرَحُ عَدَدًا مِنْ <Mark>نَفْسِهِ</Mark> فَإِنَّ نَاتِجَ الطَّرْحِ صِفْرٌ.
              <Sentence t={[8, '−', 8, '=', 0]} big />
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= أستعد، مثال الكتاب ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: «قفزت الضفادع الخمسة كلها، فلم يبقَ أيّ ضفدع. وفي الصورة الثانية لم يقفز أيّ ضفدع، فبقيت ٥».',
      content: (
        <>
          <SlideHead tag="أستعد، ص ٦٤" kind="ex">كم ضفدعًا بقي؟</SlideHead>
          <QText>يُمْكِنُ أَنْ أَجِدَ الْفَرْقَ بَيْنَ عَدَدَيْنِ بِالطَّرْحِ. أَجِدُ عَدَدَ الضَّفَادِعِ الَّتِي بَقِيَتْ:</QText>
          <Cols even>
            <Card kind="ex" cap="أَطْرَحُ الْكُلَّ">
              <Frogs n={5} k={1} all />
              <Lines>
                <Sentence t={[5, '−', 5, '=', { b: 0, hl: ['v1'] }]} big />
              </Lines>
              <Step>لَمْ يَبْقَ أَيُّ ضِفْدَعٍ (٠ ضِفْدَعٍ)</Step>
            </Card>
            <Card kind="ex" cap="أَطْرَحُ صِفْرًا">
              <Frogs n={5} k={2} />
              <Lines>
                <Sentence t={[5, '−', 0, '=', { b: 5, hl: ['p2'] }]} big />
              </Lines>
              <Step>بَقِيَتْ ٥ ضَفادِعَ</Step>
            </Card>
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
      notes: 'نعمل معًا: اختر طالبًا بالعجلة. اطلب منه أن يقول القاعدة التي استعملها قبل أن يختار.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">صفر أم العدد نفسه؟</SlideHead>
          <QCol>
            <MCQ q="أ) ٩ − ٩ = ؟" options={['٠', '٩', '١٨']} answer="٠" award />
            <MCQ q="ب) ٧ − ٠ = ؟" options={['٠', '١', '٧']} answer="٧" award />
            <MCQ q="ج) أَيُّ مَسْأَلَةٍ نَاتِجُ الطَّرْحِ فِيهَا صِفْرٌ؟" options={['٦ − ٠', '٦ − ٦', '٦ − ١']} answer="٦ − ٦" award />
          </QCol>
        </>
      ),
    },

    /* ================= من واقع الحياة ================= */
    {
      sec: 'elab', min: 2,
      notes: 'اسأل: متى نأكل كل شيء في الصحن؟ ومتى لا نأكل شيئًا؟ اربط القصة بالقاعدتين.',
      content: (
        <>
          <SlideHead tag="من واقع الحياة" kind="ex">صحن التمر</SlideHead>
          <Cols>
            <QCol>
              <QText>فِي الصَّحْنِ ٨ تَمَرَاتٍ، أَكَلَهَا الضُّيُوفُ كُلَّهَا. كَمْ تَمْرَةً بَقِيَتْ فِي الصَّحْنِ؟</QText>
              <MCQ options={['٠', '١', '٨']} answer="٠" award />
              <Solution>
                <Step hl={['v0']}>أَكَلُوهَا كُلَّهَا، فَنَطْرَحُ الْعَدَدَ مِنْ نَفْسِهِ.</Step>
                <Step>
                  <Sentence t={[8, '−', 8, '=', 0]} />
                </Step>
                <Step kind="ans" label="بَقِيَ فِي الصَّحْنِ">لَا شَيْءَ</Step>
              </Solution>
            </QCol>
            <CubeBox>
              <CubeTrain parts={[{ n: 8, color: '#8a5a2b' }]} take={[0]} size={46} hide={[0]} />
            </CubeBox>
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٦، كما في ص ٦٤ ================= */
    {
      sec: 'check', min: 5,
      notes: 'كما في الكتاب ص ٦٤: كل سؤال فيه طرح الكل وطرح الصفر. اطلب من الطلاب قول القاعدة مع كل ناتج.',
      content: (
        <>
          <BookSource>{CHECK}</BookSource>
          <QText>{FIND}</QText>
          <Grid cols={3}>
            <SentenceCard n={1} lines={[S(3, 3), S(3, 0)]} />
            <SentenceCard n={2} lines={[S(2, 0), S(2, 2)]} />
            <SentenceCard n={3} lines={[S(6, 6), S(6, 0)]} />
            <SumCard n={4} sums={[{ a: 9, op: '−', b: 0, v: 9 }, { a: 9, op: '−', b: 9, v: 0 }]} />
            <SumCard n={5} sums={[{ a: 4, op: '−', b: 4, v: 0 }, { a: 4, op: '−', b: 0, v: 4 }]} />
            <SumCard n={6} sums={[{ a: 7, op: '−', b: 7, v: 0 }, { a: 7, op: '−', b: 0, v: 7 }]} />
          </Grid>
        </>
      ),
    },

    /* ================= أتأكد ٧، أتحدث ================= */
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: اطلب من طالبين أن يشرحا بالضفادع أو بالأصابع.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="كَيْفَ أَعْرِفُ أَنَّ ٨ − ٨ = ٠ وَأَنَّ ٨ − ٠ = ٨؟"
          hint="إِذَا قَفَزَتِ الضَّفَادِعُ الثَّمَانِيَةُ كُلُّهَا، فَكَمْ يَبْقَى؟"
          steps={[
            { text: '٨ − ٨: لَا يَبْقَى شَيْءٌ.', hl: ['v1'] },
            { text: '٨ − ٠: لَا نَطْرَحُ شَيْئًا، فَيَبْقَى ٨.' },
            { text: 'طَرْحُ الْكُلِّ صِفْرٌ، وَطَرْحُ الصِّفْرِ الْعَدَدُ نَفْسُهُ.', kind: 'ans', label: SUGGESTED },
          ]}
          chart={
            <CubeBox>
              <Frogs n={8} k={1} all />
            </CubeBox>
          }
        />
      ),
    },

    /* ================= أتدرب ٨–١٣ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'بعد كل ناتج صفر تظهر دائرة حول المسألة. اسأل: لماذا كان الناتج صفرًا؟',
      content: (
        <>
          <BookSource>{PRACTICE}</BookSource>
          <Cols>
            <QText>{FIND_CIRCLE}</QText>
            <Card kind="rule" cap="أَتَذَكَّرُ">
              عِنْدَمَا أَطْرَحُ الصِّفْرَ مِنْ أَيِّ عَدَدٍ فَإِنَّ نَاتِجَ الطَّرْحِ هُوَ العَدَدُ نَفْسُهُ.
            </Card>
          </Cols>
          <Grid cols={3}>
            <HQ n={8} a={9} b={3} />
            <HQ n={9} a={8} b={1} />
            <HQ n={10} a={8} b={3} />
            <HQ n={11} a={4} b={4} />
            <HQ n={12} a={7} b={3} />
            <HQ n={13} a={3} b={1} />
          </Grid>
        </>
      ),
    },

    /* ================= أتدرب ١٤–٢١ ================= */
    {
      sec: 'practice', min: 4,
      notes: 'الطرح الرأسي. اطلب من الطلاب أن يحوّطوا المسائل التي ناتجها صفر في كتبهم.',
      content: (
        <>
          <BookSource>{PRACTICE}</BookSource>
          <QText>{FIND_CIRCLE}</QText>
          <Grid cols={4}>
            <VQ n={14} a={8} b={8} />
            <VQ n={15} a={6} b={0} />
            <VQ n={16} a={5} b={5} />
            <VQ n={17} a={9} b={1} />
            <VQ n={18} a={3} b={2} />
            <VQ n={19} a={1} b={1} />
            <VQ n={20} a={8} b={0} />
            <VQ n={21} a={5} b={0} />
          </Grid>
        </>
      ),
    },

    /* ================= مهارات التفكير العليا ٢٢–٢٣ ================= */
    {
      sec: 'hot', min: 3,
      notes: 'الجبر: المطلوب عدد الخرزات التي أضاعها، فهو العدد المطروح المجهول. الجملتان تعطيان العدد نفسه، لكن الجملة التي «تبيّن» القصة هي ١٢ − □ = ٧ (من ١٢ ضاع عدد فبقي ٧).',
      content: (
        <>
          <BookSource>{HOT}</BookSource>
          <Stack>
            <QCard n={22}>
                <QText>
                  <BookLabel>الجَبْرُ:</BookLabel> مَعَ سَعِيدٍ ١٢ خَرَزَةً. أَضَاعَ بَعْضًا مِنْهَا وَبَقِيَ مَعَهُ ٧ خَرَزَاتٍ. أُحَوِّطُ جُمْلَةَ الطَّرْحِ الَّتِي تُبَيِّنُ عَدَدَ الْخَرَزَاتِ الَّتِي أَضَاعَهَا سَعِيدٌ.
                </QText>
                <MCQ options={['١٢ − ٧ = □', '١٢ − □ = ٧']} answer="١٢ − □ = ٧" award />
            </QCard>
            <QCard n={23}>
              <QText inline>
                كَمْ خَرَزَةً أَضَاعَ سَعِيدٌ؟ <Blank v={5} /> خَرَزَاتٍ
              </QText>
            </QCard>
          </Stack>
        </>
      ),
    },

    /* ================= الختام ================= */
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب إكمال كل فرع شفهيًا قبل أن تشير إليه.',
      content: (
        <>
          <SlideHead tag="أهمّ الأفكار" kind="rule">ملخص الدرس</SlideHead>
          <MindMap
            center={<>طَرْحُ الصِّفْرِ<br />وَطَرْحُ الْكُلِّ</>}
            items={[
              { kind: 'rule', cap: 'طَرْحُ الصِّفْرِ', text: 'النَّاتِجُ هُوَ الْعَدَدُ نَفْسُهُ: ٩ − ٠ = ٩' },
              { kind: 'ex', cap: 'طَرْحُ الْكُلِّ', text: 'النَّاتِجُ صِفْرٌ: ٩ − ٩ = ٠' },
              { kind: 'qs', cap: 'الصِّفْرُ', text: 'يَعْنِي لَا شَيْءَ.' },
              { kind: 'warn', cap: 'أَنْتَبِهُ', text: '٩ − ٠ يَخْتَلِفُ عَنْ ٩ − ٩' },
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
          <SlideHead tag="تذكرة الخروج" kind="qs">صفر أم العدد نفسه؟</SlideHead>
          <ExitTicket>
            <MCQ q="٥ − ٠ = ؟" options={['٠', '٥', '١٠']} answer="٥" />
            <MCQ q="١١ − ١١ = ؟" options={['٠', '١', '١١']} answer="٠" />
            <MCQ q="٧ − □ = ٧. مَا الْعَدَدُ فِي □؟" options={['٠', '١', '٧']} answer="٠" />
          </ExitTicket>
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
