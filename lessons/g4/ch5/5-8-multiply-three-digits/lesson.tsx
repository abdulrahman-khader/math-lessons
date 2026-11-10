import {
  AreaModel, BookLabel, Card, Cols, Ctrls, Eq, ExitTicket, GoHomeButton, Goals, Grid, IfTeams, Lines, MCQ, MindMap, NextButton, QCard, QCol, QText,
  QuestionGroup, QuestionSlide, RuleTable, Sentence, SlideHead, Solution, Stack, Step, VMul, Winner, defineLesson, storySlide,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

const CHECK = 'تأكَّدْ، ص ١٦٥';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ١٦٦';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٦٧';
const TEST = 'تدريبٌ على اختبارٍ، ص ١٦٧';
const REVIEW = 'مراجعةٌ تراكميةٌ، ص ١٦٧';
const FIND = 'أَوْجِدْ ناتجَ الضَّربِ في كلٍّ ممَّا يلي:';
const TABLES = 'الجبرُ: أكملِ الجدولَيْنِ التَّاليَيْنِ:';
const BLUE = '#a9c8ec';

/** بطاقة ضرب رأسي: كل ضغطة تملأ خانة */
const Mul = ({ n, a, b }: { n: number; a: number; b: number }) => (
  <QCard n={n}>
    <VMul a={a} b={b} regroup />
  </QCard>
);

/** بطاقة مراجعة: الضرب ثم التقدير */
const Est = ({ n, a, b, e, r }: { n: number; a: number; b: number; e: string; r?: string }) => (
  <QCard n={n}>
    <Stack>
      <Lines><Sentence t={r ? [a, '×', b, '=', { b: a * b, box: true }] : [a, '×', b]} /></Lines>
      <Stack><Step kind="ans" label={r ?? 'التَّقْدِيرُ'}>{e}</Step></Stack>
    </Stack>
  </QCard>
);

export default defineLesson({
  meta: {
    id: 'g4-5-8-multiply-three-digits',
    design: 'v2',
    code: '٥-٨',
    title: 'ضَربُ عددٍ مِن ثلاثةِ أرقامٍ في عددٍ مِن رقمٍ واحدٍ',
    shortTitle: 'ضرب عدد من ثلاثة أرقام',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الخامس: الضرب في عدد من رقم واحد',
    source: 'الجزء الأول، ص ١٦٣–١٦٧',
    minutes: 45,
    idea: 'أضربُ عددًا مِن ٣ أرقامٍ في عددٍ مِن رقمٍ واحدٍ.',
    bookQuestions: 42,
  },
  sectionDesc: {
    engage: 'تذكّر الضرب',
    explore: 'استعد: آلة الأقلام',
    explain: 'الأمثلة ١–٣',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–١٠',
    practice: 'الأسئلة ١١–٣٠',
    hot: 'الأسئلة ٣١–٤٢',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Card kind="rule" cap="فكرة الدرس">أضربُ عددًا مِن ٣ أرقامٍ في عددٍ مِن رقمٍ واحدٍ.</Card>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <Goals items={['أضرب الآحاد ثم العشرات ثم المئات.', 'أعيد التجميع في كل منزلة.', 'أتعامل مع الأصفار في العدد.']} />
            </Card>
          </Cols>
        </>
      ),
    },
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الدرس ٥-٦.',
      content: (
        <>
          <SlideHead tag="تذكّر، الدرس ٥-٦" kind="ink">الضرب مع إعادة التجميع</SlideHead>
          <Grid cols={3}>
            <MCQ q="٤ × ٢٦ = ؟" options={['٨٤', '١٠٤', '٣٠']} answer="١٠٤" award />
            <MCQ q="٥ × ١٠٠ = ؟" options={['٥٠٠', '٥٠', '١٠٥']} answer="٥٠٠" award />
            <MCQ q="قدِّرْ ٣ × ٢٩٠" options={['٦٠٠', '٩٠٠', '٢٩٣']} answer="٩٠٠" award />
          </Grid>
        </>
      ),
    },
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند السؤال واسأل: ماذا نعرف عن ضرب عدد من رقمين؟ وكيف نضيف المئات؟'),
    {
      sec: 'explore', min: 2,
      notes: 'نسأل: كيف نجد الناتج؟ ونترك الحل للمثال ١.',
      content: (
        <>
          <SlideHead tag="اسْتَعِدَّ، ص ١٦٣" kind="qs">آلةُ الأقلامِ</SlideHead>
          <QText>قرأَ صالحٌ كتابًا عن آلةِ صُنعِ أقلامِ الرَّصاصِ. إذَا علِمَ صالحٌ أنَّ هذِهِ الآلةَ تنتجُ ١٣٢ قلمًا في الدَّقيقةِ الواحدةِ، فكمْ قلمًا تنتجُ في ٥ دقائقَ؟</QText>
        </>
      ),
    },
    {
      sec: 'explain', min: 4,
      notes: 'نقدّر أولًا، ثم كل ضغطة تملأ خانة: الآحاد، ثم العشرات، ثم المئات.',
      content: (
        <>
          <SlideHead tag="مثال ١، من واقع الحياة، ص ١٦٣" kind="ex">استعمالُ نواتجِ الضربِ الجزئيةِ</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>أقلامٌ:</BookLabel> كمْ قلمَ رَصاصٍ تُنتجُهُ الآلةُ في ٥ دقائقَ؟</QText>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>نقدِّرُ: <Eq>٥ × ١٠٠ = ٥٠٠</Eq></Step>
              </Solution>
            </QCol>
            <Stack>
              <VMul a={132} b={5} regroup />
              <Solution>
                <Step kind="ans" label="عَدَدُ الْأَقْلَامِ">٦٦٠ قَلَمًا</Step>
                <Step>٦٦٠ قريبٌ مِن ٥٠٠؛ الإجابةُ معقولةٌ</Step>
              </Solution>
            </Stack>
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 4,
      notes: '٦ × ٠ = ٠، لذلك لا مكان لهذا الناتج في المستطيل.',
      content: (
        <>
          <SlideHead tag="مثال ٢، من واقع الحياة، ص ١٦٤" kind="ex">الضربُ في أعدادٍ بعضُ أرقامِها أصفارٌ</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>نقودٌ:</BookLabel> أهدَتْ أرْوَى ٦ خواتمَ إلى قريباتِهَا. إذَا كانَ ثمنُ الخاتمِ ١٠٨ ريالاتٍ، فكمْ ريالًا دفعَتْ لشراءِ الخواتمِ السِّتَّةِ؟</QText>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>نقدِّرُ: <Eq>٦ × ١٠٠ = ٦٠٠</Eq></Step>
                <Step hl={['n0']}><Eq>٦ × ٨ = ٤٨</Eq></Step>
                <Step hl={['n1']}><Eq>٦ × ١٠٠ = ٦٠٠</Eq></Step>
                <Step><Eq>٤٨ + ٦٠٠ = ٦٤٨</Eq></Step>
                <Step kind="ans" label="الْمَبْلَغُ">٦٤٨ رِيَالًا</Step>
              </Solution>
            </QCol>
            <AreaModel h={6} parts={[8, 100]} />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 4,
      notes: '٤ × ٠ عشرات = صفر، ثم نجمع العشرتين من إعادة التجميع.',
      content: (
        <>
          <SlideHead tag="مثال ٣، من واقع الحياة، ص ١٦٤" kind="ex">الضربُ في أعدادٍ بعضُ أرقامِها أصفارٌ</SlideHead>
          <Cols>
            <QCol>
              <QText long><BookLabel>سفرٌ:</BookLabel> يسافرُ أحمدُ مِن نجرانَ إلى جدَّةَ الَّتي تبعُدُ ٩٠٥ كلم مرَّتينِ في الشَّهرِ، إذَا كانَ يسلكُ الطريقَ نفسَهُ ذهابًا وإيابًا. فما المسافةُ الَّتي يقطعُهَا أحمدُ في سفرِهِ شهريًّا؟</QText>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>نقدِّرُ: <Eq>٤ × ٩٠٠ = ٣٦٠٠</Eq></Step>
              </Solution>
            </QCol>
            <Stack>
              <VMul a={905} b={4} regroup />
              <Solution>
                <Step kind="ans" label="الْمَسَافَةُ">٣٦٢٠ كِيلُومِتْرًا</Step>
              </Solution>
            </Stack>
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: ٣ × ٢٤٦ (مثال غير أمثلة الكتاب).',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },
    {
      sec: 'elab', min: 3,
      notes: 'نعمل معًا: منزلة بعد منزلة.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">اضربْ</SlideHead>
          <Grid cols={3}>
            <MCQ q="٢ × ٣١٤ = ؟" options={['٣١٦', '٦٢٨', '٦٢٤']} answer="٦٢٨" award />
            <MCQ q="٣ × ٢٠٥ = ؟" options={['٦١٥', '٦٠٥', '٢٠٨']} answer="٦١٥" award />
            <MCQ q="٤ × ١٢٦ = ؟" options={['٤٨٤', '٥٠٤', '١٣٠']} answer="٥٠٤" award />
          </Grid>
        </>
      ),
    },
    {
      sec: 'check', min: 5,
      notes: 'كل ضغطة تملأ خانة أو رقمًا محمولًا.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={4} time={180}>
          <Mul n={1} a={248} b={3} />
          <Mul n={2} a={125} b={5} />
          <Mul n={3} a={303} b={2} />
          <Mul n={4} a={507} b={6} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 5,
      notes: 'كل ضغطة تملأ خانة أو رقمًا محمولًا.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={4} time={180}>
          <Mul n={5} a={276} b={4} />
          <Mul n={6} a={832} b={7} />
          <Mul n={7} a={908} b={8} />
          <Mul n={8} a={640} b={9} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نضرب تكلفة الشخص في عدد الأشخاص.',
      content: (
        <QuestionSlide
          source={CHECK} n={9} time={60}
          question="تُكلِّفُ الرِّحلةُ مِنَ الرياضِ إلى الدمامِ ٣٨٩ ريالًا للشَّخصِ الواحدِ. فما تَكْلِفَةُ هذِهِ الرِّحلةِ لـ ٤ أشخاصٍ؟"
          hint="كمْ شخصًا؟"
          steps={[
            { text: <Eq>٤ × ٣٨٩ = ١٥٥٦</Eq> },
            { label: 'التَّكْلِفَةُ', text: '١٥٥٦ رِيَالًا', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'تحدث: التقدير يكشف الخطأ قبل تسليم الإجابة.',
      content: (
        <QuestionSlide
          source={CHECK} n={10} tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]}
          question="اِشْرَحْ لماذا يكونُ مِنَ الأفضلِ تقديرُ الإجابةِ لمسائلِ الضَّربِ."
          hint="ماذا نفعلُ بالتقديرِ بعدَ الحلِّ؟"
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'لِأَنَّ التَّقْدِيرَ سَرِيعٌ، وَنَتَحَقَّقُ بِهِ مِنْ مَعْقُولِيَّةِ الْإِجَابَةِ', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة تملأ خانة أو رقمًا محمولًا.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={180}>
          <Mul n={11} a={168} b={2} />
          <Mul n={12} a={252} b={2} />
          <Mul n={13} a={383} b={3} />
          <Mul n={14} a={238} b={4} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة تملأ خانة أو رقمًا محمولًا.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={180}>
          <Mul n={15} a={819} b={5} />
          <Mul n={16} a={340} b={6} />
          <Mul n={17} a={201} b={2} />
          <Mul n={18} a={407} b={4} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة تملأ خانة أو رقمًا محمولًا.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={180}>
          <Mul n={19} a={709} b={5} />
          <Mul n={20} a={160} b={7} />
          <Mul n={21} a={611} b={7} />
          <Mul n={22} a={979} b={9} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة تملأ خانة أو رقمًا محمولًا.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={180}>
          <Mul n={23} a={338} b={8} />
          <Mul n={24} a={927} b={9} />
          <Mul n={25} a={907} b={7} />
          <Mul n={26} a={902} b={9} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'السؤال ٢٨: نجد القاعدة من ٦٠ و١٢٠ أولًا.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={TABLES} time={120}>
          <QCard n={27}>
            <RuleTable ruleStep={false} rule="٤ × △" color={BLUE} rows={[['المُدخلةُ △', [38, 29, 417]], ['المُخرجةُ □', [{ b: 152 }, { b: 116 }, { b: 1668 }]]]} />
          </QCard>
          <QCard n={28}>
            <RuleTable rule="٢ × △" color={BLUE} rows={[['المُدخلةُ △', [60, 17, 75]], ['المُخرجةُ □', [120, { b: 34 }, { b: 150 }]]]} />
          </QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: '١٢٥ صفحة في كل منها ٦ صور.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={29} time={60}
          question="إذَا كانَتْ كلُّ صَفْحةٍ مِن صفحاتِ أَلْبومِ الصُّورِ تتَّسعُ إلى ٦ صورٍ. فما عددُ الصُّورِ الَّتي يمكنُ وَضْعُهَا في أَلبومٍ عددُ صفحاتِهِ ١٢٥ صفحةً؟"
          hint="كمْ صورةً في الصفحةِ الواحدةِ؟"
          steps={[
            { text: <Eq>٦ × ١٢٥ = ٧٥٠</Eq> },
            { label: 'عَدَدُ الصُّوَرِ', text: '٧٥٠ صُورَةً', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: '٧ سيارات طول كل منها ٣٤٢ سم.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={30} time={60}
          question="القِيَاسُ: طُولُ سيَّارةٍ ٣٤٢ سم. ما طُولُ ٧ سيَّاراتٍ مِنَ النَّوعِ نفسِهِ؟"
          hint="ما العمليةُ؟"
          steps={[
            { text: <Eq>٧ × ٣٤٢ = ٢٣٩٤</Eq> },
            { label: 'الطُّولُ', text: '٢٣٩٤ سَنْتِمِتْرًا', kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مسألة مفتوحة: تقبل كل إجابة صحيحة، مثل ٥ × ٨٢٠ = ٤١٠٠.',
      content: (
        <QuestionSlide
          source={HOT} n={31} tags={[{ kind: 'warn', text: 'مسألةٌ مفتوحةٌ' }]}
          question="أُكْتُبْ عددًا مِن ٣ أرقامٍ، وآخرَ مِن رقمٍ واحدٍ، بحيثُ يكونُ ناتجُ ضربِهِمَا أكبرَ مِن ٤٠٠٠ وأقلَّ مِن ٤٢٠٠"
          hint="قسِّمْ ٤٠٠٠ على ٥ تقريبًا."
          steps={[
            { text: <Eq>٥ × ٨٠٠ = ٤٠٠٠</Eq> },
            { label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: <Eq>٥ × ٨٠٢ = ٤٠١٠</Eq>, kind: 'ans' },
          ]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'خطأ فهد: لم يضف المئة الناتجة من إعادة تجميع العشرات.',
      content: (
        <QuestionSlide
          source={HOT} n={32} tags={[{ kind: 'warn', text: 'اكتشفِ الخطأَ' }]}
          question="حلَّ خالدٌ وفهدٌ المسألةَ: ٢ × ٣٦٢ كمَا هوَ موضَّحٌ. فأيُّهما إجابتُهُ صحيحةٌ؟"
          hint="ماذا نفعلُ بالمئةِ بعدَ ضربِ العشراتِ؟"
          steps={[
            { text: <Eq>٢ × ٦٠ = ١٢٠</Eq> },
            { text: <Eq>٦٠٠ + ١٠٠ = ٧٠٠</Eq> },
            { label: 'الْإِجَابَةُ الصَّحِيحَةُ', text: 'خَالِدٌ', kind: 'ans' },
          ]}
          chart={
            <Grid cols={2}>
              <Card kind="ex" cap="خالدٌ"><Eq>٢ × ٣٦٢ = ٧٢٤</Eq></Card>
              <Card kind="qs" cap="فهدٌ"><Eq>٢ × ٣٦٢ = ٦٢٤</Eq></Card>
            </Grid>
          }
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'أكتب: كل طالب يكتب مسألته ثم يبادلها مع زميله.',
      content: (
        <QuestionSlide
          source={HOT} n={33} tags={[{ kind: 'warn', text: 'أُكْتُبْ' }]}
          question="أُكْتُبْ مَسألةً مِن واقعِ الحياةِ تتضمَّنُ ضربَ عددٍ مِن ثلاثةِ أرقامٍ في عددٍ مِن رقمٍ واحدٍ مع إعادةِ التَّجميعِ."
          hint="فكِّرْ في رفوفِ المكتبةِ."
          steps={[{ label: 'إِجَابَةٌ مُقْتَرَحَةٌ', text: 'فِي مَكْتَبَةٍ ٤ رُفُوفٍ، عَلَى كُلِّ رَفٍّ ٢٣٥ كِتَابًا. كَمْ كِتَابًا فِيهَا؟', kind: 'ans' }]}
          chart={null}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'تدريب على اختبار.',
      content: (
        <QuestionGroup source={TEST} cols={2} time={75}>
          <QCard n={34}>
            <MCQ q="عددُ السَّاعاتِ في الشَّهرِ الواحدِ يُساوي ٧٢٠ ساعةً. كمْ ساعةً في ٩ أشهرٍ؟ (الدرس ٥-٨)" options={['أ) ٨٠ ساعةً', 'ب) ٧٢٩ ساعةً', 'جـ) ٦٣٨٠ ساعةً', 'د) ٦٤٨٠ ساعةً']} answer="د) ٦٤٨٠ ساعةً" />
          </QCard>
          <QCard n={35}>
            <MCQ q="إذَا استمرَّ نمطُ الأعدادِ التَّالي: ٧، ١٢، ١٧، ٢٢، ٢٧، … حتَّى ١٢ عددًا، أوجدْ مجموعَ آخرِ عددينِ. (الدرس ٥-٧)" options={['أ) ٦٢', 'ب) ٦٩', 'جـ) ٤٩', 'د) ١١٩']} answer="د) ١١٩" />
          </QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'مراجعة الدرسين ٥-٥ و٥-٦.',
      content: (
        <QuestionGroup source={REVIEW} instruction="أوجدْ ناتجَ الضربِ. وتحقَّقْ مِن معقوليَّةِ إجابتِكَ: (الدرسان ٥-٥، ٥-٦)" cols={3} time={90}>
          <Est n={36} a={3} b={21} e="٦٠" r="التَّقْدِيرُ" />
          <Est n={37} a={5} b={34} e="١٥٠" r="التَّقْدِيرُ" />
          <Est n={38} a={8} b={72} e="٥٦٠" r="التَّقْدِيرُ" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٥-٤.',
      content: (
        <QuestionGroup source={REVIEW} instruction="قدِّرْ ناتجَ الضربِ: (الدرس ٥-٤)" cols={3} time={75}>
          <Est n={39} a={3} b={465} e="١٥٠٠" />
          <Est n={40} a={7} b={639} e="٤٢٠٠" />
          <Est n={41} a={9} b={6532} e="٦٣٠٠٠" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٥-٣: لا ننسى المعلم في العدد.',
      content: (
        <QuestionSlide
          source={REVIEW} n={42} time={75}
          question="قرَّرَ معلِّمٌ وَ٢٣ طالبًا وَ٧ أولياءِ أمورِ الخروجَ في رحلةٍ ميدانيةٍ. إذَا كانَتِ السيارةُ الواحدةُ تتسعُ لـ ٤ أشخاصٍ. فهلْ مِنَ المعقولِ القولُ بأنَّ ٧ سياراتٍ تكفيهِمْ جميعًا للذهابِ في الرحلةِ؟ وضِّحْ إجابتَكَ. (الدرس ٥-٣)"
          hint="كمْ شخصًا في الرحلةِ؟"
          steps={[
            { text: <Eq>١ + ٢٣ + ٧ = ٣١</Eq> },
            { text: <Eq>٧ × ٤ = ٢٨</Eq> },
            { text: '٢٨ أَقَلُّ مِنْ ٣١' },
            { label: 'الْقَرَارُ', text: 'غَيْرُ مَعْقُولٍ', kind: 'ans' },
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
            center={<>ضرب عدد من<br />ثلاثة أرقام</>}
            items={[
              { kind: 'rule', cap: 'أقدّر', text: 'قبل الضرب' },
              { kind: 'ex', cap: 'الآحاد', text: 'أضرب وأعيد التجميع' },
              { kind: 'qs', cap: 'العشرات والمئات', text: 'أضرب ثم أجمع ما حملته' },
              { kind: 'warn', cap: 'الصفر', text: 'ناتج ضربه صفر، وأجمع ما حملته' },
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
            <MCQ q="٢ × ٣٢١ = ؟" options={['٦٤٢', '٣٢٣', '٦٢٢']} answer="٦٤٢" />
            <MCQ q="٣ × ٢٤٥ = ؟" options={['٦٣٥', '٧٣٥', '٢٤٨']} answer="٧٣٥" />
            <MCQ q="٥ × ٤٠٦ = ؟" options={['٢٠٣٠', '٢٠٠٦', '٤١١']} answer="٢٠٣٠" />
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
