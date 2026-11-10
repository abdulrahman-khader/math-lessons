import {
  AreaModel, BookLabel, Card, Cols, Ctrls, Definition, Eq, ExitTicket, FnTable, GoHomeButton, Goals, Grid, IfTeams, MCQ, MindMap, NextButton, QCard, QCol, QText,
  QuestionGroup, QuestionSlide, SlideHead, Solution, Stack, Step, VMul, Winner, defineLesson, storySlide, SplitArray,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

const CHECK = 'تأكَّدْ، ص ١٥٣';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ١٥٣';
const REAL = 'مسألةٌ منْ واقعِ الحياةِ، ص ١٥٣';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٥٣';
const FIND = 'أَوْجِدْ ناتجَ الضَّربِ، ثمَّ استعمِلِ التَّقريبَ لتتأكَّدَ مِن معقوليَّةِ الإجابةِ:';
const SCHOOL = 'مَدرسةٌ: الجدولُ المُجاورُ يُبيِّنُ أعدادَ الطُّلَّابِ في الصُّفوفِ (الثَّالثِ والرَّابعِ والخامسِ في مدرسةِ البيانِ).';
const TABLE = <FnTable title="أعدادُ طلَّابِ مدرسةِ البيانِ" heads={['الصفُّ', 'عددُ الفصولِ', 'عددُ طلَّابِ كلِّ فصلٍ']} rows={[[3, 3, 23], [4, 4, 22], [5, 2, 31]]} />;

/** بطاقة ضرب رأسي مع تقديرها */
const Mul = ({ n, a, b, e }: { n: number; a: number; b: number; e: string }) => (
  <QCard n={n}>
    <Stack>
      <VMul a={a} b={b} />
      <Step kind="ans" label="التَّقْدِيرُ">{e}</Step>
    </Stack>
  </QCard>
);

export default defineLesson({
  meta: {
    id: 'g4-5-5-multiply-two-digits',
    design: 'v2',
    code: '٥-٥',
    title: 'ضَربُ عددٍ مِن رقمينِ في عددٍ مِن رقمٍ واحدٍ دونَ إعادةِ التجميعِ',
    shortTitle: 'الضرب دون إعادة التجميع',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الخامس: الضرب في عدد من رقم واحد',
    source: 'الجزء الأول، ص ١٥١–١٥٣',
    minutes: 45,
    idea: 'أضربُ عددًا مِن رقمينِ في عددٍ مِن رقمٍ واحدٍ دونَ إعادةِ التجميعِ.',
    bookQuestions: 21,
  },
  sectionDesc: {
    engage: 'تذكّر التقدير',
    explore: 'استعد: كرات عمر',
    explain: 'الأمثلة ١–٣',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٦',
    practice: 'الأسئلة ٧–١٩',
    hot: 'السؤالان ٢٠ و٢١',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردة: نواتج الضرب الجزئية.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أضربُ عددًا مِن رقمينِ في عددٍ مِن رقمٍ واحدٍ دونَ إعادةِ التجميعِ.</Card>
              <Card kind="rule" cap="المفردات">نواتجُ الضربِ الجزئيَّةُ</Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals items={['أجزّئ العدد إلى عشرات وآحاد.', 'أضرب الآحاد ثم العشرات.', 'أتأكد من معقولية الإجابة بالتقريب.']} />
            </Card>
          </Cols>
        </>
      ),
    },
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الدرس ٥-٤.',
      content: (
        <>
          <SlideHead tag="تذكّر، الدرس ٥-٤" kind="ink">التقدير</SlideHead>
          <Grid cols={3}>
            <MCQ q="قدِّرْ ٣ × ٢٣" options={['٦٠', '٩٠', '٦٩']} answer="٦٠" award />
            <MCQ q="٤ × ٢٠ = ؟" options={['٢٤', '٨٠', '٨٠٠']} answer="٨٠" award />
            <MCQ q="٢٣ = ٢٠ + ؟" options={['٢', '٣', '٤']} answer="٣" award />
          </Grid>
        </>
      ),
    },
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند السؤال واسأل: كيف يساعدنا تجزيء ٤٣ إلى ٤٠ و٣؟'),
    {
      sec: 'explore', min: 4,
      notes: 'مثال جديد غير القصة: صفان في كل صف ٤١. اضغط «نجزّئ» فيظهر ٢ × ٤٠ و٢ × ١ ثم المجموع. غيّر العددين وجرّب أمثلة أخرى.',
      content: (
        <>
          <SlideHead tag="نُجَرِّبُ مِثَالًا آخَرَ" kind="ex">نُجَزِّئُ الْعَدَدَ</SlideHead>
          <SplitArray rows={2} n={41} />
        </>
      ),
    },
    {
      sec: 'explore', min: 2,
      notes: 'نواتج الضرب الجزئية: نضرب كل مكوّن منفصلًا.',
      content: (
        <>
          <SlideHead tag="اسْتَعِدَّ، ص ١٥١" kind="qs">كراتُ عُمَرَ</SlideHead>
          <QText>مَعَ كلٍّ من عُمَرَ وأخوَيهِ ١٣ كرةً. ما عددُ الكُراتِ لديهمُ جميعًا؟</QText>
          <Definition kind="rule">يمكنُكَ استعمالُ ما تعرفُهُ عن حقائقِ الضَّربِ لإيجادِ ناتجِ ضَربِ ٣ × ١٣ منْ خلالِ إيجادِ نواتجِ الضَّربِ الجزئيَّةِ؛ أيْ ضربُ كلِّ مكوّنٍ منْ أحدِ العددينِ في مكوناتِ العددِ الآخرِ بشكلٍ منفصلٍ، وجمعُ نواتجِ الضربِ الجزئيَّةِ للحصولِ علَى ناتجِ الضربِ النهائيِّ.</Definition>
        </>
      ),
    },
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: نجزّئ الشبكة جزأين.',
      content: (
        <>
          <SlideHead tag="مثال ١، من واقع الحياة، ص ١٥١" kind="ex">استعمالُ النماذجِ</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>كراتٌ:</BookLabel> ما عددُ الكراتِ الَّتي لدَى عُمَرَ وأخوَيهِ؟</QText>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step hl={['n0']}><Eq>٣ × ٣ = ٩</Eq></Step>
                <Step hl={['n1']}><Eq>٣ × ١٠ = ٣٠</Eq></Step>
                <Step><Eq>٩ + ٣٠ = ٣٩</Eq></Step>
                <Step kind="ans" label="عَدَدُ الْكُرَاتِ">٣٩ كُرَةً</Step>
              </Solution>
            </QCol>
            <AreaModel grid h={3} parts={[3, 10]} />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 3,
      notes: 'نقدّر أولًا: ٢ × ٢٠ = ٤٠، ثم نستعمل نموذج المستطيل.',
      content: (
        <>
          <SlideHead tag="مثال ٢، من واقع الحياة، ص ١٥٢" kind="ex">نماذجُ المستطيلاتِ</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>كُتبٌ:</BookLabel> في مكتبةٍ رفَّانِ منَ الكُتبِ، يَتَّسعُ كلٌّ منهُمَا لـ٢٣ كتابًا. ما عددُ الكتبِ الَّتي يمكنُ وَضْعُهَا على الرَّفَّينِ؟</QText>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>نقدِّرُ: <Eq>٢ × ٢٠ = ٤٠</Eq></Step>
                <Step hl={['n0']}><Eq>٢ × ٣ = ٦</Eq></Step>
                <Step hl={['n1']}><Eq>٢ × ٢٠ = ٤٠</Eq></Step>
                <Step kind="ans" label="عَدَدُ الْكُتُبِ">٤٦ كِتَابًا</Step>
              </Solution>
            </QCol>
            <AreaModel h={2} parts={[3, 20]} />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 3,
      notes: 'الخطوة ١ الآحاد، والخطوة ٢ العشرات.',
      content: (
        <>
          <SlideHead tag="مثال ٣، ص ١٥٢" kind="ex">استعمالُ القلمِ والورقةِ</SlideHead>
          <Cols>
            <QCol>
              <QText>أَوْجِدْ ناتجَ: ٤ × ٢١</QText>
              <Ctrls><NextButton /></Ctrls>
              <VMul a={21} b={4} />
              <Solution>
                <Step hl={['n0', 'n1']}>نتحقَّقُ: <Eq>٤ + ٨٠ = ٨٤</Eq></Step>
              </Solution>
            </QCol>
            <AreaModel h={4} parts={[1, 20]} />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: ٣ × ٣٢ (مثال غير أمثلة الكتاب).',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },
    {
      sec: 'elab', min: 3,
      notes: 'نعمل معًا: الآحاد أولًا.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">اضربْ</SlideHead>
          <Grid cols={3}>
            <MCQ q="٢ × ٣٤ = ؟" options={['٦٨', '٣٦', '٦٤']} answer="٦٨" award />
            <MCQ q="٣ × ١٢ = ؟" options={['١٥', '٣٦', '٣٣']} answer="٣٦" award />
            <MCQ q="٤ × ١١ = ؟" options={['٤٤', '١٥', '٤١']} answer="٤٤" award />
          </Grid>
        </>
      ),
    },
    {
      sec: 'check', min: 4,
      notes: 'كل ضغطة تملأ خانة: الآحاد ثم العشرات، ثم التقدير.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={4} time={150}>
          <Mul n={1} a={22} b={4} e="٨٠" />
          <Mul n={2} a={11} b={5} e="٥٠" />
          <Mul n={3} a={12} b={4} e="٤٠" />
          <Mul n={4} a={42} b={2} e="٨٠" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'كتابان لكل طاولة.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} time={60}
          question="في غُرفةِ الصَّفِّ ٢٤ طاولةً. إذا كانَ على كلِّ طاولةٍ كتابانِ. فما عددُ الكتبِ على الطاولاتِ جميعِها؟"
          hint="كم كتابًا لكل طاولة؟"
          steps={[
            { text: <Eq>٢ × ٢٤ = ٤٨</Eq> },
            { label: 'عَدَدُ الْكُتُبِ', text: '٤٨ كِتَابًا', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'تحدّث: اطلب رسم النموذج على السبورة.',
      content: (
        <QuestionSlide
          source={CHECK} n={6} tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]}
          question="كيفَ يُساعدُكَ نموذجُ مساحةِ المستطيلِ على حسابِ ناتجِ ضَرْبِ عددينِ؟"
          hint="ماذا يحدث للعدد عند تجزئته؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'أُجَزِّئُ الْعَدَدَ، فَمَسَاحَةُ كُلِّ جُزْءٍ نَاتِجٌ جُزْئِيٌّ، وَمَجْمُوعُهَا هُوَ النَّاتِجُ', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'نضرب الآحاد ثم العشرات، ثم نقدّر.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <Mul n={7} a={20} b={4} e="٨٠" />
          <Mul n={8} a={12} b={3} e="٣٠" />
          <Mul n={9} a={44} b={2} e="٨٠" />
          <Mul n={10} a={30} b={3} e="٩٠" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'نضرب الآحاد ثم العشرات، ثم نقدّر.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <Mul n={11} a={24} b={2} e="٤٠" />
          <Mul n={12} a={97} b={1} e="١٠٠" />
          <Mul n={13} a={22} b={3} e="٦٠" />
          <Mul n={14} a={14} b={2} e="٢٠" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'خطوتان: الضرب ثم الطرح.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={15} time={75}
          question="لدَى فريقِ الكشَّافةِ ٢١ كيسًا من الفطائرِ، في كلِّ كيسٍ منها ٤ فطائرَ. إذا أكلَ الفريقُ كلَّ الفطائرِ ما عدَا ٩ منها، فما عددُ الفطائرِ الَّتي أكلَها الفريقُ؟"
          hint="كم فطيرة في الأكياس كلها؟"
          steps={[
            { text: <Eq>٤ × ٢١ = ٨٤</Eq> },
            { text: <Eq>٨٤ − ٩ = ٧٥</Eq> },
            { label: 'عَدَدُ الْفَطَائِرِ', text: '٧٥ فَطِيرَةً', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نضرب طول القطعة في عددها.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={16} time={45}
          question="القِيَاسُ: قطَّعتْ منالُ ٤ قطعٍ من الصُّوفِ، طُولُ كلٍّ منهَا ١١ سنتمترًا. ما مجموعُ أطوالِ قِطعِ الصُّوفِ؟"
          hint="ما العملية؟"
          steps={[
            { text: <Eq>٤ × ١١ = ٤٤</Eq> },
            { label: 'مَجْمُوعُ الْأَطْوَالِ', text: '٤٤ سَنْتِمِتْرًا', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: '٤ فصول في كل منها ٢٢ طالبًا.',
      content: (
        <QuestionSlide
          source={REAL} n={17} time={45} intro={SCHOOL}
          question="ما عددُ الطُّلَّابِ في الصَّفِّ الرَّابعِ؟"
          hint="كم فصلًا؟ وكم طالبًا في كل فصل؟"
          steps={[
            { text: <Eq>٤ × ٢٢ = ٨٨</Eq> },
            { label: 'عَدَدُ الطُّلَّابِ', text: '٨٨ طَالِبًا', kind: 'ans' },
          ]}
          chart={TABLE}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'الصف الثالث ٣ × ٢٣ = ٦٩.',
      content: (
        <QuestionSlide
          source={REAL} n={18} time={60}
          question="كمْ يزيدُ عددُ طلَّابِ الصَّفِّ الرَّابعِ على عددِ طلَّابِ الصَّفِّ الثَّالثِ؟"
          hint="ابدأ بعدد طلاب الصف الثالث."
          steps={[
            { text: <Eq>٣ × ٢٣ = ٦٩</Eq> },
            { text: <Eq>٨٨ − ٦٩ = ١٩</Eq> },
            { label: 'الزِّيَادَةُ', text: '١٩ طَالِبًا', kind: 'ans' },
          ]}
          chart={TABLE}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'الصف الخامس ٢ × ٣١ = ٦٢.',
      content: (
        <QuestionSlide
          source={REAL} n={19} time={60}
          question="ما عددُ الطُّلَّابِ في الصُّفوفِ جميعِهَا؟"
          hint="كم طالبًا في الصف الخامس؟"
          steps={[
            { text: <Eq>٢ × ٣١ = ٦٢</Eq> },
            { text: <Eq>٦٩ + ٨٨ + ٦٢ = ٢١٩</Eq> },
            { label: 'عَدَدُ الطُّلَّابِ', text: '٢١٩ طَالِبًا', kind: 'ans' },
          ]}
          chart={TABLE}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مسألة مفتوحة: الناتج ٩٩، والعدد ٣٣.',
      content: (
        <QuestionSlide
          source={HOT} n={20} tags={[{ kind: 'warn', text: 'مسألةٌ مفتوحةٌ' }]}
          question="أُكْتُبْ عددًا يكونُ ناتجُ ضربِه في ٣ أقلَّ مِن ١٠٠ بواحدٍ."
          hint="ما العدد الأقل من ١٠٠ بواحد؟"
          steps={[
            { text: <Eq>٣ × ٣٣ = ٩٩</Eq> },
            { label: 'الْعَدَدُ', text: '٣٣', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'أكتب: ترتيب العددين لا يغير الناتج.',
      content: (
        <QuestionSlide
          source={HOT} n={21} tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="هلْ ناتجُ ضَرْبِ ٣ في ٣٢ هوَ نفسُه ناتجُ ضَرْبِ ٣٢ في ٣؟ اِشْرَحْ ذلكَ."
          hint="جرّب الضرب بالترتيبين."
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'نَعَمْ؛ تَرْتِيبُ الْعَدَدَيْنِ لَا يُغَيِّرُ النَّاتِجَ ٩٦', kind: 'ans' }]}
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
            center={<>الضرب دون<br />إعادة التجميع</>}
            items={[
              { kind: 'rule', cap: 'أجزّئ', text: '٢٣ = ٢٠ + ٣' },
              { kind: 'ex', cap: 'الآحاد', text: 'أضرب الآحاد أولًا' },
              { kind: 'qs', cap: 'العشرات', text: 'ثم أضرب العشرات' },
              { kind: 'warn', cap: 'أتأكد', text: 'بالتقريب' },
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
            <MCQ q="٢ × ٤٣ = ؟" options={['٤٥', '٨٦', '٨٣']} answer="٨٦" />
            <MCQ q="٣ × ٣١ = ؟" options={['٩٣', '٣٤', '٩١']} answer="٩٣" />
            <MCQ q="في ٤ علبٍ، في كلٍّ منها ١٢ قلمًا. كمْ قلمًا؟" options={['١٦', '٤٨', '٤٢']} answer="٤٨" />
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
