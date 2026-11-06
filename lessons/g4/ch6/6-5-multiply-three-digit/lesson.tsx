import {
  BookGroup, BookLabel, BookSource, Cols, DataTable, Eq, FnTable, Grid, Lines, MCQ, QCard, QCol, QText, QuestionGroup, QuestionSlide, Sentence, ShapeRow, SlideHead, Solution, Step, VMul2, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'تأكَّدْ، ص ١٩٢';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ١٩٣';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٩٤';
const FIND = 'أَوْجِدْ ناتجَ الضَّربِ:';
const CHECK2 = 'تأكَّدْ، ص ١٩٣';
const REAL = 'مسألةٌ منْ واقعِ الحياةِ، ص ١٩٣';
const TEST = 'تدريبٌ على اختبارٍ، ص ١٩٤';
const REVIEW = 'مراجعةٌ تراكميةٌ، ص ١٩٤';

export default defineLesson({
  meta: {
    id: 'g4-6-5-multiply-three-digit',
    design: 'v2',
    code: '٦-٥',
    title: 'ضربُ عددٍ منْ ثلاثةِ أرقامٍ في عددٍ منْ رقمينِ',
    shortTitle: 'ضرب عدد من ثلاثة أرقام في عدد من رقمين',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل السادس: الضرب في عدد من رقمين',
    source: 'الجزء الأول، ص ١٩١–١٩٤',
    minutes: 45,
    idea: 'أضربُ عددًا منْ ثلاثةِ أرقامٍ في عددٍ منْ رقمينِ.',
    bookQuestions: 29,
  },
  sectionDesc: {"engage": "تذكّر", "explain": "أمثلة الكتاب", "elab": "نعمل معًا", "check": "الأسئلة ١–٦", "practice": "الأسئلة ٧–٢٠", "hot": "الأسئلة ٢١–٢٩", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أضربُ عددًا منْ ثلاثةِ أرقامٍ في عددٍ منْ رقمينِ.', ["أُقدِّرُ الناتجَ أوَّلًا.", "أضربُ في الآحادِ ثمَّ العشراتِ.", "أجمعُ وأتحقَّقُ."]),
    askSlide('engage', 'تذكّر', [["١٢ × ٣٤ = ؟", ["٤٠٨", "٤٦", "٣٠٨"], "٤٠٨"], ["٢٧٥ × ٢ = ؟", ["٥٥٠", "٢٧٧", "٤٥٠"], "٥٥٠"], ["٥٥٠ + ٢٧٥٠ = ؟", ["٣٣٠٠", "٣٢٠٠", "٣٣٥٠"], "٣٣٠٠"]], 'ربط بالدرس ٦-٤.'),
    {
      sec: 'explain', min: 5,
      notes: 'تحقق: ٣٣٠٠ قريب من التقدير ٣٠٠٠.',
      content: (
        <>
          <SlideHead tag="استعدَّ، ص ١٩١" kind="rule">الهاتف</SlideHead>
          <Cols>
            <QCol>
              <QText>يستعملُ والدُ راشدٍ هاتفَهُ المحمولَ ٢٧٥ دقيقةً شهريًّا. كمْ دقيقةً يستعملُ والدُ راشدٍ هاتفَهُ المحمولَ في سنةٍ؟</QText>
              <Solution>
                <Step><BookLabel>قدِّرْ:</BookLabel> <Eq>٣٠٠ × ١٠ = ٣٠٠٠</Eq></Step>
                <Step hl={['n0']}><BookLabel>الخطوةُ ١:</BookLabel> <Eq>٢ × ٢٧٥ = ٥٥٠</Eq></Step>
                <Step hl={['n1']}><BookLabel>الخطوةُ ٢:</BookLabel> <Eq>١٠ × ٢٧٥ = ٢٧٥٠</Eq></Step>
                <Step hl={['n2']}><BookLabel>الخطوةُ ٣:</BookLabel> نجمعُ النواتجَ الجزئيَّةَ.</Step>
                <Step kind="ans" label="يستعملُ">٣٣٠٠ دقيقةٍ</Step>
              </Solution>
            </QCol>
            <VMul2 a={275} b={12} byHl />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'تذكر من الكتاب: قد نحتاج إلى إعادة التجميع عند الضرب في الآحاد والعشرات والمئات.',
      content: (
        <>
          <SlideHead tag="مثالٌ منْ واقعِ الحياةِ، ص ١٩٢" kind="rule">نقود</SlideHead>
          <Cols>
            <QCol>
              <QText>عندَ بائعٍ ٢٥ ساعةً، ثمنُ كلِّ واحدةٍ منها ٨٠٩ ريالاتٍ. ما ثمنُ السَّاعاتِ جميعِها؟</QText>
              <Solution>
                <Step><BookLabel>قدِّرْ:</BookLabel> <Eq>٨٠٠ × ٣٠ = ٢٤٠٠٠</Eq></Step>
                <Step hl={['n0']}><BookLabel>الخطوةُ ١:</BookLabel> <Eq>٥ × ٨٠٩ = ٤٠٤٥</Eq></Step>
                <Step hl={['n1']}><BookLabel>الخطوةُ ٢:</BookLabel> <Eq>٢٠ × ٨٠٩ = ١٦١٨٠</Eq></Step>
                <Step hl={['n2']}><BookLabel>الخطوةُ ٣:</BookLabel> نجمعُ النواتجَ الجزئيَّةَ.</Step>
                <Step kind="ans" label="الثمنُ">٢٠٢٢٥ ريالًا</Step>
              </Solution>
            </QCol>
            <VMul2 a={809} b={25} byHl />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٢١٤ × ١٣ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أضرب وأجمع', [["١٢٣ × ١٢: ناتجُ ضربِ الآحادِ؟", ["٢٤٦", "١٢٣", "١٢٣٠"], "٢٤٦"], ["١٢٣ × ١٢: ناتجُ ضربِ العشراتِ؟", ["١٢٣٠", "١٢٣", "٢٤٦"], "١٢٣٠"], ["١٢٣ × ١٢ = ؟", ["١٤٧٦", "١٣٧٦", "١٣٥"], "١٤٧٦"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 6,
      notes: 'كل ضغطة سطر.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={4} time={240}>
          <QCard n={1}><VMul2 a={135} b={18} /></QCard>
          <QCard n={2}><VMul2 a={340} b={32} /></QCard>
          <QCard n={3}><VMul2 a={703} b={89} /></QCard>
          <QCard n={4}><VMul2 a={906} b={53} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK2} n={5} chart={null} time={120}
          question={"تقطعُ مجموعةٌ منَ الفيلةِ ٨٠ كيلومترًا يوميًّا. كمْ كيلومترًا تقطعُ في سنةٍ؟ علمًا بأنَّ السنةَ الهجريةَ = ٣٥٤ يومًا تقريبًا."}
          hint="أيُّ عمليَّةٍ تناسبُ «يوميًّا»؟"
          steps={[
            { text: <Eq>٣٥٤ × ٨٠ = ٢٨٣٢٠</Eq> },
            { text: '٢٨٣٢٠ كيلومترًا', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK2} n={6} tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]} chart={null}
          question="كيفَ تجدُ ناتجَ الضَّربِ ٩٤٥ × ٥٦؟ اشرَحْ ذلكَ."
          hint="بماذا نبدأُ؟"
          steps={[
            { text: <Eq>٦ × ٩٤٥ = ٥٦٧٠</Eq> },
            { text: <Eq>٥٠ × ٩٤٥ = ٤٧٢٥٠</Eq> },
            { text: <Eq>٥٦٧٠ + ٤٧٢٥٠ = ٥٢٩٢٠</Eq>, kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={180}>
          <QCard n={7}><VMul2 a={106} b={12} /></QCard>
          <QCard n={8}><VMul2 a={508} b={59} /></QCard>
          <QCard n={9}><VMul2 a={632} b={66} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={180}>
          <QCard n={10}><VMul2 a={362} b={35} /></QCard>
          <QCard n={11}><VMul2 a={489} b={53} /></QCard>
          <QCard n={12}><VMul2 a={770} b={71} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={180}>
          <QCard n={13}><VMul2 a={901} b={96} /></QCard>
          <QCard n={14}><VMul2 a={862} b={87} /></QCard>
          <QCard n={15}><VMul2 a={934} b={97} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={16} chart={null} time={120}
          question={"يُعادُ تصنيعُ ٦٣٠ علبةً كلَّ ثانيةٍ. كمْ علبةً يُعادُ تصنيعُها في دقيقةٍ واحدةٍ؟"}
          hint="كمْ ثانيةً في الدقيقةِ؟"
          steps={[
            { text: 'الدقيقةُ ٦٠ ثانيةً.' },
            { text: <Eq>٦٣٠ × ٦٠ = ٣٧٨٠٠</Eq> },
            { text: '٣٧٨٠٠ علبةٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={17} chart={null} time={120}
          question={"مُعدَّلُ الأيَّامِ الشديدةِ الحرارةِ في مدينةٍ ٢٠٦ أيامٍ في السَّنةِ. فما عددُ الأيَّامِ الشديدةِ الحرارةِ في هذهِ المدينةِ في ١٢ سنةً؟"}
          hint="أيُّ عمليَّةٍ تناسبُ؟"
          steps={[
            { text: <Eq>٢٠٦ × ١٢ = ٢٤٧٢</Eq> },
            { text: '٢٤٧٢ يومًا', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'نقرأ المسألة معًا، ثم نحل كل سؤال.',
      content: (
        <BookGroup source={REAL} intro="رياضةٌ: يُبيِّنُ الجدولُ المجاورُ معلوماتٍ عنِ الكراتِ المستعملَةِ في بعضِ الألعابِ الرياضيَّةِ:" chart={<FnTable heads={['الكرةُ', 'المعلومةُ']} rows={[['الجولفِ', '٤٥٠ نقطةً'], ['البيسبولِ', '١٠٨ غرزاتٍ'], ['القدمِ', '٣٢ دائرةً']]} />} qs={[
            { n: 18, question: "كمْ نقطةً توجدُ على ١٢ كرةَ جولفٍ؟", steps: [{ text: <Eq>٤٥٠ × ١٢ = ٥٤٠٠</Eq> }, { text: '٥٤٠٠ نقطةٍ', kind: 'ans' }] },
            { n: 19, question: "كمْ غرزةً توجدُ على ٧٥ كرةَ بيسبولٍ؟", steps: [{ text: <Eq>١٠٨ × ٧٥ = ٨١٠٠</Eq> }, { text: '٨١٠٠ غرزةٍ', kind: 'ans' }] },
            { n: 20, question: "أوجدِ الفرقَ بينَ عددِ النُّقطِ على ٢٥ كرةَ جولفٍ وعددِ الغرزِ على ٢٥ كرةَ بيسبولٍ.", steps: [{ text: <Eq>٤٥٠ × ٢٥ = ١١٢٥٠</Eq> }, { text: <Eq>١٠٨ × ٢٥ = ٢٧٠٠</Eq> }, { text: <Eq>١١٢٥٠ − ٢٧٠٠ = ٨٥٥٠</Eq> }, { text: '٨٥٥٠', kind: 'ans' }] },
        ]} />
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={21} chart={null} time={120}
          question={<><BookLabel>اكتشفِ الخطأَ:</BookLabel> حسَبَ كلٌّ منْ حمدٍ وعبدِ الكريمِ ناتجَ ضربِ ٣٥١ × ٢٦، فأيُّهما إجابتُهُ صحيحةٌ؟ فسِّرْ إجابتَكَ.</>}
          hint="هلْ ضربَ كلٌّ منهُما في العشراتِ؟"
          steps={[
            { text: 'حمدٌ: ٩١٢٦، وعبدُ الكريمِ: ٢٨٠٨' },
            { text: <Eq>٣٥١ × ٢٦ = ٩١٢٦</Eq> },
            { text: 'عبدُ الكريمِ لمْ يُزِحْ ناتجَ الضَّربِ في العشراتِ.' },
            { text: 'حمدٌ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={HOT} n={22} tags={[{ kind: 'warn', text: 'اُكْتُبْ' }]} chart={null}
          question="مسألةٌ منْ واقعِ الحياةِ تستعملُ فيها ضربَ عددٍ منْ ثلاثةِ أرقامٍ في عددٍ منْ رقمينِ."
          hint="ماذا نعدُّ في المدرسةِ؟"
          steps={[
            { text: 'في مدرسةٍ ٢٤ فصلًا، في كلِّ فصلٍ ١٢٥ كتابًا.' },
            { text: 'فكمْ كتابًا فيها؟' },
            { text: <Eq>١٢٥ × ٢٤ = ٣٠٠٠</Eq>, kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'تدريب على اختبار.',
      content: (
        <>
          <BookSource>{TEST}</BookSource>
          <Grid cols={2}>
            <QCard n={23}><MCQ q="أحصتْ رزانُ أثناءَ ركوبِها السيارةَ معَ والدِها على الخطِّ السريعِ ١٧ سيارةً زرقاءَ في دقيقةٍ واحدةٍ. إذا استمرَّ هذا النمطُ، فما عددُ السياراتِ الزرقاءِ الَّتي يمكنُ إحصاؤُها خلالَ ٤٥ دقيقةً؟ (الدرس ٦-٤)" options={["أ) ٣٦٠", "ب) ٤٠٠", "جـ) ٧٦٥", "د) ٧٧٥"]} answer="جـ) ٧٦٥" /></QCard>
            <QCard n={24}><MCQ q="إذا علمتَ أنَّ عددَ عظامِ الهيكلِ العظميِّ للإنسانِ البالغِ يُساوي ٢٠٦ عظماتٍ، فما عددُ العظامِ في أجسامِ ٣٧ شخصًا بالغًا؟ (الدرس ٦-٥)" options={["أ) ٦٠٠٠", "ب) ٦١٨٠", "جـ) ٧٦٢٢", "د) ٨٠٠٠"]} answer="جـ) ٧٦٢٢" /></QCard>
          </Grid>
        </>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'مراجعة الدرس ٦-٤.',
      content: (
        <QuestionGroup source={REVIEW} instruction={'أوجدْ ناتجَ الضَّربِ:'} cols={3} time={90}>
          <QCard n={25}><Lines><Sentence t={[34, '×', 10, '=', { b: 340, box: true }]} /></Lines></QCard>
          <QCard n={26}><Lines><Sentence t={[55, '×', 49, '=', { b: 2695, box: true }]} /></Lines></QCard>
          <QCard n={27}><Lines><Sentence t={[72, '×', 66, '=', { b: 4752, box: true }]} /></Lines></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={REVIEW} n={28} chart={<ShapeRow items={['square', 'square', 'square', 'square', 'square', 'square']} />} time={120}
          question={"أعِدْ ترتيبَ الطَّاولاتِ المجاورةِ، بحيثُ يجلسُ ٢٠ طالبًا في اجتماعِ مجلسِ الطُّلابِ؛ كلُّ طالبينِ معًا."}
          hint="كمْ ضلعًا خارجيًّا نحتاجُ؟"
          steps={[
            { text: 'كلُّ ضلعٍ طالبانِ، فنحتاجُ ١٠ أضلاعٍ.' },
            { text: <Eq>٣ + ٣ + ٢ + ٢ = ١٠</Eq> },
            { text: 'صفَّانِ، في كلِّ صفٍّ ٣ طاولاتٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={REVIEW} n={29} chart={<DataTable rows={[['عددُ المجلاتِ المبيعةِ', 4, 8, 12, 16, 20], ['المبالغُ المعادةُ للمشتري (ريال)', 2, 4, 6, '؟', '؟']]} />} time={120}
          question={"لكلِّ ٤ مجلاتٍ يتمُّ بيعُها يُعادُ ريالانِ منْ ثمنِها للمشتري. استعملِ الجدولَ المجاورَ لإيجادِ كمْ ريالًا سيتمُّ إرجاعُها للمشتري إذا اشترى ٢٠ مجلةً؟"}
          hint="ما النمطُ في الجدولِ؟"
          steps={[
            { text: 'كلُّ ٤ مجلاتٍ: ريالانِ.' },
            { text: <Eq>٢٠ ÷ ٤ = ٥</Eq> },
            { text: <Eq>٥ × ٢ = ١٠</Eq> },
            { text: '١٠ ريالاتٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>ضربُ ٣ أرقامٍ<br />في رقمينِ</>, [{"cap": "قدِّرْ", "text": "الناتجَ أوَّلًا"}, {"cap": "اضرِبْ", "text": "في الآحادِ ثمَّ العشراتِ"}, {"cap": "اجمعْ", "text": "النواتجَ الجزئيَّةَ"}, {"cap": "تحقَّقْ", "text": "أُقارنُ بالتقديرِ"}]),
    exitSlide('أضرب ٣ أرقام في رقمين', [["١٢١ × ١١ = ؟", ["١٣٣١", "١٣٢", "١٢٣١"], "١٣٣١"], ["٢٠٣ × ٢٢ = ؟", ["٤٤٦٦", "٤٠٦", "٤٤٠٦"], "٤٤٦٦"], ["٣١٥ × ٢٤ = ؟", ["٧٥٦٠", "٧٤٦٠", "٣٣٩"], "٧٥٦٠"]]),
    endSlide,
  ],
});
