import {
  BookLabel, Card, Cols, Ctrls, Definition, Eq, ExitTicket, GoHomeButton, Goals, Grid, IfTeams, Lines, MCQ, MindMap, NextButton, PlaceRows, QCard, QCol, QText,
  QuestionGroup, QuestionSlide, Sentence, SlideHead, Solution, Stack, Step, Winner, defineLesson, type Token,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'تأكَّدْ، ص ١٤٤';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ١٤٤';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٤٤';
const ANS = 'النَّاتِجُ';

/** جملة ضرب تمتلئ خانة ناتجها */
const m = (a: number, b: number): Token[] => [a, '×', b, '=', { b: a * b, box: true }];
/** بطاقة أربع جمل: العدد في ١ و١٠ و١٠٠ و١٠٠٠ أو ما يشبهها */
const Four = ({ n, a, b }: { n: number; a: number; b: number[] }) => (
  <QCard n={n}>
    <Lines>{b.map((x) => <Sentence key={x} t={m(a, x)} />)}</Lines>
  </QCard>
);
const One = ({ n, a, b }: { n: number; a: number; b: number }) => (
  <QCard n={n}>
    <Lines><Sentence t={m(a, b)} /></Lines>
  </QCard>
);

export default defineLesson({
  meta: {
    id: 'g4-5-2-multiples-10-100-1000',
    design: 'v2',
    code: '٥-٢',
    title: 'الضربُ في مُضاعفاتِ ١٠ ، ١٠٠ ، ١٠٠٠',
    shortTitle: 'الضرب في مضاعفات ١٠ و١٠٠ و١٠٠٠',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الخامس: الضرب في عدد من رقم واحد',
    source: 'الجزء الأول، ص ١٤٢–١٤٤',
    minutes: 45,
    idea: 'أضربُ في مُضاعفاتِ ١٠، ١٠٠، ١٠٠٠ مُستعملًا الحقائقَ الأساسيَّةَ والأنماطَ.',
    bookQuestions: 20,
  },
  sectionDesc: {
    engage: 'تذكّر المضاعفات',
    explore: 'استعد: نمط الأصفار',
    explain: 'الأمثلة ١–٣',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٨',
    practice: 'الأسئلة ٩–١٨',
    hot: 'السؤالان ١٩ و٢٠',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. اربط بالدرس السابق: المضاعف ناتج ضرب.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أضربُ في مُضاعفاتِ ١٠، ١٠٠، ١٠٠٠ مُستعملًا الحقائقَ الأساسيَّةَ والأنماطَ.</Card>
              <Card kind="rule" cap="المفردات">المُضاعفُ</Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals items={['ألاحظ نمط الأصفار.', 'أضرب في ١٠ و١٠٠ و١٠٠٠.', 'أضرب في مضاعفاتها ذهنيًّا.']} />
            </Card>
          </Cols>
        </>
      ),
    },
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الدرس ٥-١. اختر طالبًا بالعجلة لكل سؤال.',
      content: (
        <>
          <SlideHead tag="تذكّر، الدرس ٥-١" kind="ink">المضاعفات</SlideHead>
          <Grid cols={3}>
            <MCQ q="أيُّ عددٍ مضاعفٌ للعددِ ١٠؟" options={['١٥', '٣٠', '٢٥']} answer="٣٠" award />
            <MCQ q="٤ × ٦ = ؟" options={['٢٤', '١٠', '٤٦']} answer="٢٤" award />
            <MCQ q="٧ × ٥ = ؟" options={['١٢', '٣٠', '٣٥']} answer="٣٥" award />
          </Grid>
        </>
      ),
    },
    {
      sec: 'explore', min: 3,
      notes: 'ماذا يحدث للأصفار؟ اطلب من الطلاب أن يتوقعوا الجملة التالية قبل كشفها.',
      content: (
        <>
          <SlideHead tag="اسْتَعِدَّ، ص ١٤٢" kind="qs">نمطُ الأصفارِ</SlideHead>
          <Cols>
            <QCol>
              <QText>فِيما يأتِي تمثيلٌ لأربعِ جُملِ ضَرْبٍ. لاحظْ نَمَطَ الأصفارِ:</QText>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step hl={['n0']}>٤ آحادٍ</Step>
                <Step hl={['n1']}>٤ عشراتٍ</Step>
                <Step hl={['n2']}>٤ مئاتٍ</Step>
                <Step hl={['n3']}>٤ ألوفٍ</Step>
                <Step kind="ans" label="النَّمَطُ">نُضِيفُ صِفْرًا كُلَّ مَرَّةٍ</Step>
              </Solution>
            </QCol>
            <PlaceRows
              items={[
                { kind: 'one', count: 4, label: '٤ آحاد', eq: '٤ × ١ = ٤' },
                { kind: 'ten', count: 4, label: '٤ عشرات', eq: '٤ × ١٠ = ٤٠' },
                { kind: 'hundred', count: 4, label: '٤ مئات', eq: '٤ × ١٠٠ = ٤٠٠' },
                { kind: 'thousand', count: 4, label: '٤ ألوف', eq: '٤ × ١٠٠٠ = ٤٠٠٠' },
              ]}
            />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 1,
      notes: 'نستعمل الحقيقة الأساسية ثم نمط الأصفار.',
      content: (
        <>
          <SlideHead tag="ص ١٤٢" kind="rule">الضربُ ذهنيًّا</SlideHead>
          <Definition kind="rule">يُمكنكَ استعمالُ حقائقِ الضَّربِ الأساسيَّةِ والأنماطِ؛ لتُساعدَكَ على ضَربِ أيِّ عددٍ في الأعدادِ: (١٠ ، ١٠٠ ، ١٠٠٠) ذِهنيًّا.</Definition>
        </>
      ),
    },
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: نقرأ كل جملة بعدد الأصفار.',
      content: (
        <>
          <SlideHead tag="مثال ١، من واقع الحياة، ص ١٤٢" kind="ex">الضربُ في مُضاعفاتِ العددِ ١٠٠</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>خَرزٌ:</BookLabel> اشترتْ سلمَى ٧ عُلَبٍ منَ الخَرزِ، في كلِّ عُلبةٍ ١٠٠ خَرزةٍ. كمْ خرزةً اشترتْ سلمَى؟</QText>
              <Ctrls><NextButton /></Ctrls>
              <Lines>
                <Sentence t={m(7, 1)} />
                <Sentence t={m(7, 10)} />
                <Sentence t={m(7, 100)} />
              </Lines>
              <Solution>
                <Step kind="ans" label="عَدَدُ الْخَرَزَاتِ">٧٠٠ خَرَزَةٍ</Step>
              </Solution>
            </QCol>
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 1,
      notes: 'المضاعف ناتج ضرب عدد في عدد آخر.',
      content: (
        <>
          <SlideHead tag="ص ١٤٣" kind="rule">المُضاعفُ</SlideHead>
          <Definition kind="rule">يُمكنُكَ أيضًا أنْ تَضربَ عددًا في مضاعفاتِ ١٠ ، ١٠٠ ، ١٠٠٠ ذِهْنيًّا. والمُضاعَفُ هوَ ناتجُ ضَرْبِ عددٍ ما في أيِّ عددٍ آخرَ.</Definition>
        </>
      ),
    },
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: ٣ × ٧ = ٢١ ثم ثلاثة أصفار.',
      content: (
        <>
          <SlideHead tag="مثال ٢، ص ١٤٣" kind="ex">الضربُ في مُضاعفاتِ العددِ ١٠٠٠</SlideHead>
          <Cols>
            <QCol>
              <QText>أَوْجِدْ ٣ × ٧٠٠٠</QText>
              <Ctrls><NextButton /></Ctrls>
              <Lines>
                <Sentence t={m(3, 7)} />
                <Sentence t={m(3, 70)} />
                <Sentence t={m(3, 700)} />
                <Sentence t={m(3, 7000)} />
              </Lines>
              <Solution>
                <Step kind="ans" label={ANS}>٢١٠٠٠</Step>
              </Solution>
            </QCol>
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 3,
      notes: 'الضرب الذهني: الحقيقة الأساسية ٨ × ٢ ثم عدد الأصفار.',
      content: (
        <>
          <SlideHead tag="مثال ٣، من واقع الحياة، ص ١٤٣" kind="ex">الضَّربُ الذِّهنيُّ</SlideHead>
          <Card kind="rule" cap="تذكَّرْ">لضَربِ عددٍ في مُضاعفاتِ العددِ ١٠، أوجدْ ناتجَ ضَربِ الحقيقةِ الأساسيَّةِ، ثمَّ أضِفِ الأصفارَ إلى اليمينِ.</Card>
          <QCol>
            <QText><BookLabel>القياسُ:</BookLabel> إذا كانَ وزنُ سيَّارةِ الإطفاءِ ٨ × ٢٠٠٠ كيلُوجرامٍ، فما وزنُها بالكيلُوجراماتِ؟</QText>
            <Ctrls><NextButton /></Ctrls>
            <Solution>
              <Step>الحقيقةُ الأساسيَّةُ: <Eq>٨ × ٢ = ١٦</Eq></Step>
              <Step>في ٢٠٠٠ ثلاثةُ أصفارٍ.</Step>
              <Step kind="ans" label="الْوَزْنُ">١٦٠٠٠ كِيلُوجْرَامٍ</Step>
            </Solution>
          </QCol>
        </>
      ),
    },
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: ٣ × ٨ ومضاعفاته (مثال غير أمثلة الكتاب).',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },
    {
      sec: 'elab', min: 3,
      notes: 'نعمل معًا: اطلب من الطالب أن يذكر الحقيقة الأساسية أولًا.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">كمْ صفرًا؟</SlideHead>
          <Grid cols={3}>
            <MCQ q="٦ × ٥٠ = ؟" options={['٣٠', '٣٠٠', '٣٠٠٠']} answer="٣٠٠" award />
            <MCQ q="٢ × ٤٠٠ = ؟" options={['٨٠', '٨٠٠', '٨٠٠٠']} answer="٨٠٠" award />
            <MCQ q="٥ × ٤٠٠٠ = ؟" options={['٢٠٠٠', '٢٠٠٠٠', '٢٠٠٠٠٠']} answer="٢٠٠٠٠" award />
          </Grid>
        </>
      ),
    },
    {
      sec: 'check', min: 4,
      notes: 'كل ضغطة تملأ ناتجًا واحدًا. اسأل عن عدد الأصفار قبل الكشف.',
      content: (
        <QuestionGroup source={CHECK} instruction="أَوْجِدْ ناتجَ الضَّربِ، مستعملًا الحقائقَ الأساسيَّةَ والأنماطَ:" cols={3} time={180}>
          <Four n={1} a={3} b={[1, 10, 100, 1000]} />
          <Four n={2} a={7} b={[4, 40, 400, 4000]} />
          <Four n={3} a={5} b={[6, 60, 600, 6000]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'الضرب الذهني: الحقيقة الأساسية ثم الأصفار.',
      content: (
        <QuestionGroup source={CHECK} instruction="أَوْجِدْ ناتجَ الضَّربِ، مستعملًا الحسابَ الذِّهنيَّ:" cols={3} time={60}>
          <One n={4} a={3} b={20} />
          <One n={5} a={8} b={600} />
          <One n={6} a={9} b={9000} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'الحقيقة الأساسية ٦ × ٣ = ١٨ ثم صفران.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} time={60}
          question="يبيعُ مطعمٌ ٣٠٠ فطيرةٍ كلَّ يومٍ، فكمْ يبيعُ في ٦ أيامٍ؟"
          hint="ما الحقيقة الأساسية هنا؟"
          steps={[
            { text: <Eq>٦ × ٣٠٠ = ١٨٠٠</Eq> },
            { label: 'عَدَدُ الْفَطَائِرِ', text: '١٨٠٠ فَطِيرَةٍ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'تحدّث: الصفر الرابع جاء من ٤ × ٥ = ٢٠.',
      content: (
        <QuestionSlide
          source={CHECK} n={8} tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]}
          question="ما ناتجُ ٤×٥٠٠٠؟ اِشْرَحْ لماذا احتوَى الناتجُ على أكثرَ مِن ثلاثةِ أصفارٍ."
          hint="ما ناتج ٤ × ٥؟"
          steps={[
            { label: ANS, text: '٢٠٠٠٠', kind: 'ans' },
            { label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'نَاتِجُ ٤ × ٥ هُوَ ٢٠ وَفِيهِ صِفْرٌ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'كل ضغطة تملأ ناتجًا واحدًا.',
      content: (
        <QuestionGroup source={PRACTICE} instruction="أَوْجِدْ ناتجَ الضَّربِ، مُستعمِلًا الحقائقَ الأساسيَّةَ والأنماطَ:" cols={3} time={180}>
          <Four n={9} a={2} b={[1, 10, 100, 1000]} />
          <Four n={10} a={6} b={[4, 40, 400, 4000]} />
          <Four n={11} a={7} b={[8, 80, 800, 8000]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'الضرب الذهني.',
      content: (
        <QuestionGroup source={PRACTICE} instruction="أوجدْ ناتجَ الضربِ، مُستعمِلًا الحِسَابَ الذِّهْنيَّ:" cols={3} time={60}>
          <One n={12} a={4} b={30} />
          <One n={13} a={3} b={900} />
          <One n={14} a={7} b={6000} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'الجبر: الحقيقة الأساسية أولًا، ثم عدد الأصفار.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={<><BookLabel>الجَبْرُ:</BookLabel> أُكتُبِ العددَ المناسبَ في ■ :</>} time={90}>
          <QCard n={15}>
            <Lines>
              <Sentence t={[6, '×', { b: 7, box: true }, '=', 42]} />
              <Sentence t={[60, '×', { b: 70, box: true }, '=', 4200]} />
            </Lines>
          </QCard>
          <QCard n={16}>
            <Lines>
              <Sentence t={[5, '×', 7, '=', { b: 35, box: true }]} />
              <Sentence t={[50, '×', { b: 70, box: true }, '=', 3500]} />
            </Lines>
          </QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نضرب عدد البيوت في عدد النوافذ.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={17} time={60}
          question="يوجدُ في أحدِ الأحياءِ ١٠٠ بيتٍ، ولكلِّ بيتٍ ١٠ نَوافذَ. ما العددُ الكُلِّيُّ للنوافذِ؟"
          hint="ما العملية؟"
          steps={[
            { text: <Eq>١٠٠ × ١٠ = ١٠٠٠</Eq> },
            { label: 'عَدَدُ النَّوَافِذِ', text: '١٠٠٠ نَافِذَةٍ', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'خطوتان: الوزن كله ثم الثمن.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={18} time={90}
          question="لدَى بقَّالٍ ٣ صناديقَ برتقالٍ، في كلِّ صندوقٍ ٢٠ كيلوجرامًا. إذا كانَ ثمنُ الكيلوجرامِ الواحدِ ٤ ريالاتٍ، فمَا ثمنُ البرتقالِ كُلِّهِ؟"
          hint="ما وزن البرتقال كله؟"
          steps={[
            { text: <>الوزنُ: <Eq>٣ × ٢٠ = ٦٠</Eq> كيلوجرامًا</> },
            { text: <>الثمنُ: <Eq>٦٠ × ٤ = ٢٤٠</Eq></> },
            { label: 'الثَّمَنُ', text: '٢٤٠ رِيَالًا', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مسألة مفتوحة: أي جملتين صحيحتين.',
      content: (
        <QuestionSlide
          source={HOT} n={19} tags={[{ kind: 'warn', text: 'مسألةٌ مفتوحةٌ' }]}
          question="أُكْتُبْ جُمْلَتَيْ ضَرْبٍ الناتجُ فيهِمَا يُساوِي ١٨٠٠٠"
          hint="ما الأعداد التي ناتج ضربها ١٨؟"
          steps={[
            { label: 'الْجُمْلَةُ الْأُولَى', text: <Eq>٢ × ٩٠٠٠ = ١٨٠٠٠</Eq>, kind: 'ans' },
            { label: 'الْجُمْلَةُ الثَّانِيَةُ', text: <Eq>٣ × ٦٠٠٠ = ١٨٠٠٠</Eq>, kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'أكتب: اقرأ إجابتين من الطلاب.',
      content: (
        <QuestionSlide
          source={HOT} n={20} tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="ناتجَ ١ × ١٠٠٠٠؟ وضحْ كيفَ أوجدْتَ الناتجَ؟"
          hint="ما ناتج ١ × ١؟"
          steps={[
            { label: ANS, text: '١٠٠٠٠', kind: 'ans' },
            { label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: '١ × ١ = ١ ثُمَّ نُضِيفُ أَرْبَعَةَ أَصْفَارٍ', kind: 'ans' },
          ]}
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
            center={<>الضرب في<br />المضاعفات</>}
            items={[
              { kind: 'rule', cap: 'أولًا', text: 'أجد ناتج الحقيقة الأساسية' },
              { kind: 'ex', cap: 'ثانيًا', text: 'أضيف الأصفار' },
              { kind: 'qs', cap: 'مثال', text: '٤ × ٣٠٠ = ١٢٠٠' },
              { kind: 'warn', cap: 'انتبه', text: '٥ × ٦٠ = ٣٠٠ ففي ٣٠ صفر أيضًا' },
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
            <MCQ q="٢ × ٧٠ = ؟" options={['١٤', '١٤٠', '١٤٠٠']} answer="١٤٠" />
            <MCQ q="٩ × ٣٠٠ = ؟" options={['٢٧٠', '٢٧٠٠', '٢٧٠٠٠']} answer="٢٧٠٠" />
            <MCQ q="٦ × ٥٠٠٠ = ؟" options={['٣٠٠٠', '٣٠٠٠٠', '٣٠٠٠٠٠']} answer="٣٠٠٠٠" />
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
