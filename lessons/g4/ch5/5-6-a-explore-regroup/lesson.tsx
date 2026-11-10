import {
  BlockGroups, Card, Cols, Ctrls, Eq, ExitTicket, GoHomeButton, Goals, Grid, IfTeams, Lines, MCQ, MindMap, NextButton, PlaceRows, QCard, QText,
  QuestionGroup, QuestionSlide, Sentence, SlideHead, Solution, Stack, Step, Winner, defineLesson, storySlide, SplitArray,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

const THINK = 'فَكِّرْ، ص ١٥٦';
const CHECK = 'تأكَّدْ، ص ١٥٦';
const MODEL = 'أُكْتُبْ جملةَ الضَّربِ لكلِّ نموذجٍ، ثمَّ أَوْجِدْ ناتجَ الضَّربِ:';
const CUBES = 'أَوْجِدْ ناتجَ الضَّربِ، مُستعملًا المكعَّباتِ:';

/** بطاقة نموذج: المكعبات كما في الكتاب، ثم جملة الضرب */
const Model = ({ n, groups, tens, ones, eq }: { n: number; groups: number; tens: number; ones: number; eq: string }) => (
  <QCard n={n}>
    <Stack>
      <BlockGroups groups={groups} tens={tens} ones={ones} />
      <Stack><Step kind="ans" label="جُمْلَةُ الضَّرْبِ"><Eq>{eq}</Eq></Step></Stack>
    </Stack>
  </QCard>
);

const One = ({ n, a, b }: { n: number; a: number; b: number }) => (
  <QCard n={n}>
    <Lines><Sentence t={[a, '×', b, '=', { b: a * b, box: true }]} /></Lines>
  </QCard>
);

export default defineLesson({
  meta: {
    id: 'g4-5-6-a-explore-regroup',
    design: 'v2',
    code: '٥-٦',
    title: 'استكشافٌ: ضَربُ عددٍ مِن رقمينِ في عددٍ مِن رقمٍ واحدٍ معَ إعادةِ التَّجميعِ',
    shortTitle: 'استكشاف: الضرب مع إعادة التجميع',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الخامس: الضرب في عدد من رقم واحد',
    source: 'الجزء الأول، ص ١٥٥–١٥٦',
    minutes: 45,
    idea: 'أستعملُ النَّماذجَ لأستكشفَ حاصلَ ضربِ عددٍ مِن رقمينِ في عددٍ مِن رقمٍ واحدٍ معَ إعادةِ التَّجميعِ.',
    bookQuestions: 14,
  },
  sectionDesc: {
    engage: 'تذكّر الضرب',
    explore: 'نشاط: ٢ × ١٦',
    explain: 'إعادة التجميع',
    check: 'الأسئلة ١–٥',
    practice: 'الأسئلة ٦–١٤',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    {
      sec: 'start', min: 1,
      notes: 'جهّز مكعبات الآحاد والعشرات إن توفرت؛ النشاط يدوي.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Card kind="rule" cap="فكرة الدرس">أستعملُ النَّماذجَ لأستكشفَ حاصلَ ضربِ عددٍ مِن رقمينِ في عددٍ مِن رقمٍ واحدٍ معَ إعادةِ التَّجميعِ.</Card>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals items={['أمثّل الضرب بالمكعبات.', 'أعيد تجميع كل ١٠ آحاد في عشرة.', 'أكتب جملة الضرب للنموذج.']} />
            </Card>
          </Cols>
        </>
      ),
    },
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الدرس ٥-٥، وتذكير بإعادة التجميع في الجمع.',
      content: (
        <>
          <SlideHead tag="تذكّر، الدرس ٥-٥" kind="ink">الضرب وإعادة التجميع</SlideHead>
          <Grid cols={3}>
            <MCQ q="٢ × ٣٤ = ؟" options={['٣٦', '٦٨', '٦٤']} answer="٦٨" award />
            <MCQ q="١٢ آحادًا = ؟" options={['عشرة و٢ آحاد', '٢ عشرات', '١٢ عشرة']} answer="عشرة و٢ آحاد" award />
            <MCQ q="٣ عشرات و٤ آحاد = ؟" options={['٧', '٣٤', '٤٣']} answer="٣٤" award />
          </Grid>
        </>
      ),
    },
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند السؤال واسأل: ماذا نفعل بالـ٢١ آحادًا؟'),
    {
      sec: 'explore', min: 4,
      notes: 'مثال جديد غير القصة: ٤ صفوف في كل صف ١٣. بعد «نجزّئ» اسأل: ٤ × ٣ = ١٢، كم عشرة فيها؟ ثم نجمع ٤٠ + ١٢.',
      content: (
        <>
          <SlideHead tag="نُجَرِّبُ مِثَالًا آخَرَ" kind="ex">نُجَزِّئُ وَنُعِيدُ التَّجْمِيعَ</SlideHead>
          <SplitArray rows={4} n={13} />
        </>
      ),
    },
    {
      sec: 'explore', min: 4,
      notes: 'الخطوتان ١ و٢: يمثل الطلاب مجموعتين من ١٦ ثم يدمجون الآحاد معًا والعشرات معًا.',
      content: (
        <>
          <SlideHead tag="نَشَاطٌ، ص ١٥٥" kind="qs">أَوْجِدِ النَّاتِجَ: ٢ × ١٦</SlideHead>
          <QText>كما تعلمُ فإننا نحتاجُ أحيانًا إلى إعادةِ التجميعِ عندما نجمعُ، وهكذا نحتاجُ أحيانًا إلى إعادةِ التجميعِ عندَ الضَّربِ.</QText>
          <Stack>
            <BlockGroups big groups={2} tens={1} ones={6} />
            <PlaceRows
              items={[
                { kind: 'one', count: 12, label: 'الآحادُ', eq: 'مجموعتانِ مِن ٦' },
                { kind: 'ten', count: 2, label: 'العشراتُ', eq: 'مجموعتانِ مِن ١٠' },
              ]}
            />
            <Ctrls><NextButton /></Ctrls>
            <Solution>
              <Step hl={['n0']}>ندمجُ الآحادَ معًا</Step>
              <Step hl={['n1']}>ندمجُ العشراتِ معًا</Step>
            </Solution>
          </Stack>
        </>
      ),
    },
    {
      sec: 'explain', min: 4,
      notes: 'الخطوتان ٣ و٤: كل ١٠ آحاد نبدلها بعشرة واحدة، ثم نجمع نواتج الضرب الجزئية.',
      content: (
        <>
          <SlideHead tag="نَشَاطٌ، ص ١٥٥" kind="ex">أَعِدِ التَّجْمِيعَ</SlideHead>
          <Stack>
            <PlaceRows
              items={[
                { kind: 'ten', count: 2, plus: { kind: 'one', count: 12 }, label: 'قبلَ التجميعِ', eq: '٢ عشرات و١٢ آحادًا' },
                { kind: 'ten', count: 3, plus: { kind: 'one', count: 2 }, label: 'بعدَ التجميعِ', eq: '٣ عشرات و٢ آحاد' },
              ]}
            />
            <Ctrls><NextButton /></Ctrls>
            <Solution>
              <Step hl={['n0']}>نبدِّلُ ١٠ آحادٍ بعشرةٍ</Step>
              <Step hl={['n1']}>نجمعُ: <Eq>٣٠ + ٢ = ٣٢</Eq></Step>
              <Step kind="ans" label="النَّاتِجُ"><Eq>٢ × ١٦ = ٣٢</Eq></Step>
            </Solution>
          </Stack>
        </>
      ),
    },
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: ٣ × ١٨ (مثال غير أمثلة الكتاب).',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'يشرح الطالب بنفسه قبل عرض الإجابة المقترحة.',
      content: (
        <QuestionSlide
          source={THINK} n={1} tags={[{ kind: 'warn', text: 'فَكِّرْ' }]}
          question="اِشْرَحْ كيفَ عملْتَ نموذجًا لـ ٢ × ١٦."
          hint="كمْ مجموعةً مثَّلْنا؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'مَثَّلْنَا ١٦ بِعَشَرَةٍ وَ٦ آحَادٍ، ثُمَّ كَرَّرْنَاهَا مَرَّتَيْنِ', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'الآحاد أكثر من ٩.',
      content: (
        <QuestionSlide
          source={THINK} n={2} tags={[{ kind: 'warn', text: 'فَكِّرْ' }]}
          question="لماذا أَعَدْتَ التَّجميعَ؟"
          hint="كمْ صارَ عددُ الآحادِ؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'لِأَنَّ الْآحَادَ صَارَتْ ١٢، وَهِيَ أَكْبَرُ مِنْ ٩', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقصت الآحاد وزادت العشرات، والعدد لم يتغير.',
      content: (
        <QuestionSlide
          source={THINK} n={3} tags={[{ kind: 'warn', text: 'فَكِّرْ' }]}
          question="كيفَ تَغَيَّرَ عددُ كلٍّ منَ الآحادِ والعشراتِ بعدَ إعادةِ التَّجميعِ؟"
          hint="قارِنْ قبلَ التجميعِ وبعدَهُ."
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'نَقَصَتِ الْآحَادُ مِنْ ١٢ إِلَى ٢، وَزَادَتِ الْعَشَرَاتُ مِنْ ٢ إِلَى ٣', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'مثال بلا إعادة تجميع: ٢ × ١٣ = ٢٦.',
      content: (
        <QuestionSlide
          source={THINK} n={4} tags={[{ kind: 'warn', text: 'فَكِّرْ' }]}
          question="هلْ تحتاجُ دائمًا إلى إعادةِ التَّجميعِ عندَ الضَّربِ؟ اِشْرَحْ ذلكَ."
          hint="جرِّبْ ٢ × ١٣"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'لَا؛ نَحْتَاجُ إِلَيْهَا إِذَا زَادَ نَاتِجُ ضَرْبِ الْآحَادِ عَلَى ٩', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'يمكن الجمع: ٣٢ + ٣٢ = ٦٤.',
      content: (
        <QuestionSlide
          source={THINK} n={5} time={45}
          question="إذا كانَ لديكَ ٤ مجموعاتٍ، وكلُّ مجموعةٍ تتكوَّنُ مِن ١٦، فمَا ناتجُ الضَّربِ؟"
          hint="كمْ آحادًا في المجموعاتِ كلِّها؟"
          steps={[
            { text: <Eq>٤ × ٦ = ٢٤</Eq> },
            { text: <Eq>٤ × ١٠ = ٤٠</Eq> },
            { text: <Eq>٢٤ + ٤٠ = ٦٤</Eq> },
            { label: 'النَّاتِجُ', text: '٦٤', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'نعدّ المجموعات أولًا، ثم ما في كل مجموعة.',
      content: (
        <QuestionGroup source={CHECK} instruction={MODEL} time={150}>
          <Model n={6} groups={3} tens={2} ones={6} eq="٣ × ٢٦ = ٧٨" />
          <Model n={7} groups={5} tens={1} ones={4} eq="٥ × ١٤ = ٧٠" />
          <Model n={8} groups={2} tens={4} ones={1} eq="٢ × ٤١ = ٨٢" />
          <Model n={9} groups={4} tens={1} ones={9} eq="٤ × ١٩ = ٧٦" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'يمثل الطلاب بالمكعبات ثم نملأ الناتج.',
      content: (
        <QuestionGroup source={CHECK} instruction={CUBES} time={150}>
          <One n={10} a={5} b={8} />
          <One n={11} a={12} b={6} />
          <One n={12} a={4} b={24} />
          <One n={13} a={17} b={3} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'أكتب: يكتب الطالب إجابته ثم نقارن.',
      content: (
        <QuestionSlide
          source={CHECK} n={14} tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="متَى تَحتاجُ إلى إعادةِ التَّجميعِ عندمَا تضْرِبُ."
          hint="ماذا يحدثُ إذا زادَتِ الآحادُ على ٩؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'عِنْدَمَا يَكُونُ نَاتِجُ ضَرْبِ الْآحَادِ ١٠ أَوْ أَكْثَرَ', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب إكمال كل فرع شفهيًا قبل أن تشير إليه.',
      content: (
        <>
          <SlideHead tag="أهمّ الأفكار" kind="rule">ملخص الدرس</SlideHead>
          <MindMap
            center={<>الضرب مع<br />إعادة التجميع</>}
            items={[
              { kind: 'rule', cap: 'أمثّل', text: 'مجموعات متساوية' },
              { kind: 'ex', cap: 'أدمج', text: 'الآحاد معًا والعشرات معًا' },
              { kind: 'qs', cap: 'أعيد التجميع', text: 'كل ١٠ آحاد عشرة' },
              { kind: 'warn', cap: 'أجمع', text: 'نواتج الضرب الجزئية' },
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
          <ExitTicket>
            <MCQ q="١٥ آحادًا = ؟" options={['عشرة و٥ آحاد', '٥ عشرات', '١٥ عشرة']} answer="عشرة و٥ آحاد" />
            <MCQ q="٢ × ١٧ = ؟" options={['٣٤', '٢٤', '١٩']} answer="٣٤" />
            <MCQ q="أيُّها يحتاجُ إلى إعادةِ التجميعِ؟" options={['٢ × ١٤', '٣ × ١٦', '٢ × ٣٣']} answer="٣ × ١٦" />
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
