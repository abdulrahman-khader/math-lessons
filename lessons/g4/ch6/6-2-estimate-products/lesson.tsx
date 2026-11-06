import {
  BookLabel, BookSource, Cols, DataTable, Eq, Grid, Lines, MCQ, QCard, QCol, QText, QuestionGroup, QuestionSlide, Sentence, SlideHead, Solution, Stack, Step, VMul2, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'تأكَّدْ، ص ١٨٠';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ١٨١';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٨٢';
const TEST = 'تدريبٌ على اختبارٍ، ص ١٨٢';
const REVIEW = 'مراجعةٌ تراكميةٌ، ص ١٨٢';
const EST = 'قدِّرِ الناتجَ، ثمَّ بيِّنْ إذا كانَ التَّقديرُ أكبرَ منْ أمْ أقلَّ منَ الإجابةِ الدقيقةِ:';
const ROUND = 'أوجدْ ناتجَ الضَّربِ، وتحقَّقْ منْ معقوليةِ الإجابةِ.';
const PLACE = 'اكتُبِ القيمةَ المنزليةَ للرقمِ الَّذي تحتَهُ خطٌّ فيما يلي:';

export default defineLesson({
  meta: {
    id: 'g4-6-2-estimate-products',
    design: 'v2',
    code: '٦-٢',
    title: 'تقديرُ نواتجِ الضَّربِ',
    shortTitle: 'تقدير نواتج الضرب',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل السادس: الضرب في عدد من رقمين',
    source: 'الجزء الأول، ص ١٧٩–١٨٢',
    minutes: 45,
    idea: 'أُقدِّرُ ناتجَ الضَّربِ باستعمالِ التَّقريبِ.',
    bookQuestions: 34,
  },
  sectionDesc: {"engage": "التقريب", "explain": "أمثلة الكتاب", "elab": "نعمل معًا", "check": "الأسئلة ١–٦", "practice": "الأسئلة ٧–١٨", "hot": "الأسئلة ١٩–٣٤", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أُقدِّرُ ناتجَ الضَّربِ باستعمالِ التَّقريبِ.', ["أُقرِّبُ كلَّ عددٍ.", "أضربُ العشراتِ.", "أعرفُ هلِ التقديرُ أكبرُ أمْ أقلُّ."]),
    askSlide('engage', 'التقريب', [["٢١ أقربُ إلى:", ["٢٠", "٣٠", "١٠"], "٢٠"], ["٣٥٤ أقربُ إلى:", ["٣٠٠", "٤٠٠", "٥٠٠"], "٤٠٠"], ["٢٠ × ١٠ = ؟", ["٢٠٠", "٣٠", "٢٠٠٠"], "٢٠٠"]], 'مراجعة التقريب.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: تقريب العددين إلى أعداد أقل يعطي تقديرًا أقل من الإجابة الدقيقة.',
      content: (
        <>
          <SlideHead tag="استعدَّ، ص ١٧٩" kind="rule">القطط</SlideHead>
          <Cols>
            <QCol>
              <QText>إذا كانَ القطُّ ينامُ ١٢ ساعةً يوميًّا، فكمْ ساعةً تقريبًا ينامُ في ٣ أسابيعَ؟</QText>
              <Solution>
                <Step>في ٣ أسابيعَ ٢١ يومًا: نُقدِّرُ ٢١ × ١٢</Step>
                <Step><BookLabel>الخطوةُ ١:</BookLabel> ٢١ تقربُ إلى ٢٠، و١٢ تقربُ إلى ١٠.</Step>
                <Step><BookLabel>الخطوةُ ٢:</BookLabel> <Eq>٢٠ × ١٠ = ٢٠٠</Eq></Step>
                <Step kind="ans" label="ينامُ تقريبًا">٢٠٠ ساعةٍ</Step>
                <Step>قرَّبْنا العددينِ إلى أقلَّ، فالتقديرُ أقلُّ.</Step>
              </Solution>
            </QCol>
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'تذكر من الكتاب: إذا قرّبنا أحد العاملين إلى أكبر والآخر إلى أصغر فلا نعلم مسبقًا.',
      content: (
        <>
          <SlideHead tag="مثالٌ منْ واقعِ الحياةِ، ص ١٨٠" kind="rule">القياس</SlideHead>
          <QText><BookLabel>القياسُ:</BookLabel> يجري عاصمٌ ٣٥ دقيقةً يوميًّا. فكمْ دقيقةً يجري في سنةٍ كاملةٍ، علمًا بأنَّ عددَ أيامِ السنةِ الهجريةِ يُساوي ٣٥٤ يومًا تقريبًا؟</QText>
          <Solution>
            <Step><BookLabel>الخطوةُ ١:</BookLabel> ٣٥٤ تقربُ إلى ٤٠٠، و٣٥ تقربُ إلى ٤٠.</Step>
            <Step><BookLabel>الخطوةُ ٢:</BookLabel> <Eq>٤٠٠ × ٤٠ = ١٦٠٠٠</Eq></Step>
            <Step kind="ans" label="يجري تقريبًا">١٦٠٠٠ دقيقةٍ</Step>
            <Step>قرَّبْنا العددينِ إلى أعلى، فالتقديرُ أكبرُ.</Step>
          </Solution>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٣٨ × ٢٢ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أقرّب وأقدّر', [["٦٢ × ١٩ تقريبًا:", ["١٢٠٠", "٨١", "٦٠٠"], "١٢٠٠"], ["٢٨ × ٣٣ تقريبًا:", ["٩٠٠", "٦٠", "٦٠٠"], "٩٠٠"], ["قرَّبْنا العددينِ إلى أعلى. التقديرُ:", ["أكبرُ", "أقلُّ", "يساوي"], "أكبرُ"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 6,
      notes: 'ضغطة للتقدير وضغطة للمقارنة.',
      content: (
        <QuestionGroup source={CHECK} instruction={EST} cols={1} time={180}>
          <QCard n={1}><Lines><Sentence t={[34, '×', 12]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٣٠ × ١٠ = ٣٠٠</Eq></Step></Stack><Stack><Step kind="ans" label="الْمُقَارَنَةُ">أَقَلُّ</Step></Stack></QCard>
          <QCard n={2}><Lines><Sentence t={[57, '×', 25]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٦٠ × ٣٠ = ١٨٠٠</Eq></Step></Stack><Stack><Step kind="ans" label="الْمُقَارَنَةُ">أَكْبَرُ</Step></Stack></QCard>
          <QCard n={3}><Lines><Sentence t={[376, '×', 17]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٤٠٠ × ٢٠ = ٨٠٠٠</Eq></Step></Stack><Stack><Step kind="ans" label="الْمُقَارَنَةُ">أَكْبَرُ</Step></Stack></QCard>
          <QCard n={4}><Lines><Sentence t={[525, '×', 43]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٥٠٠ × ٤٠ = ٢٠٠٠٠</Eq></Step></Stack><Stack><Step kind="ans" label="الْمُقَارَنَةُ">أَقَلُّ</Step></Stack></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} chart={null} time={120}
          question={"يُجري خالدٌ ٢٥ مكالمةً هاتفيَّةً كلَّ أسبوعٍ، فكمْ مكالمةً تقريبًا يُجري في ٥٢ أسبوعًا؟"}
          hint="إلى أيِّ عددٍ يقربُ كلٌّ منَ العددينِ؟"
          steps={[
            { text: '٢٥ تقربُ إلى ٣٠، و٥٢ تقربُ إلى ٥٠.' },
            { text: <Eq>٥٠ × ٣٠ = ١٥٠٠</Eq> },
            { text: '١٥٠٠ مكالمةٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={6} tags={[{ kind: 'warn', text: 'تَحَدَّثْ' }]} chart={null}
          question="فسِّرْ كيفَ تعرفُ إذا كانَ تقديرُ ناتجِ الضَّربِ أكبرَ أمْ أقلَّ منَ الإجابةِ الدقيقةِ."
          hint="إلى أينَ قرَّبْنا كلَّ عددٍ؟"
          steps={[
            { text: 'إذا قُرِّبَ العددانِ إلى أعلى فالتقديرُ أكبرُ.' },
            { text: 'وإذا قُرِّبا إلى أسفلَ فالتقديرُ أقلُّ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={EST} cols={1} time={180}>
          <QCard n={7}><Lines><Sentence t={[28, '×', 25]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٣٠ × ٣٠ = ٩٠٠</Eq></Step></Stack><Stack><Step kind="ans" label="الْمُقَارَنَةُ">أَكْبَرُ</Step></Stack></QCard>
          <QCard n={8}><Lines><Sentence t={[43, '×', 14]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٤٠ × ١٠ = ٤٠٠</Eq></Step></Stack><Stack><Step kind="ans" label="الْمُقَارَنَةُ">أَقَلُّ</Step></Stack></QCard>
          <QCard n={9}><Lines><Sentence t={[56, '×', 37]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٦٠ × ٤٠ = ٢٤٠٠</Eq></Step></Stack><Stack><Step kind="ans" label="الْمُقَارَنَةُ">أَكْبَرُ</Step></Stack></QCard>
          <QCard n={10}><Lines><Sentence t={[79, '×', 55]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٨٠ × ٦٠ = ٤٨٠٠</Eq></Step></Stack><Stack><Step kind="ans" label="الْمُقَارَنَةُ">أَكْبَرُ</Step></Stack></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={EST} cols={1} time={180}>
          <QCard n={11}><Lines><Sentence t={[234, '×', 11]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٢٠٠ × ١٠ = ٢٠٠٠</Eq></Step></Stack><Stack><Step kind="ans" label="الْمُقَارَنَةُ">أَقَلُّ</Step></Stack></QCard>
          <QCard n={12}><Lines><Sentence t={[352, '×', 37]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٤٠٠ × ٤٠ = ١٦٠٠٠</Eq></Step></Stack><Stack><Step kind="ans" label="الْمُقَارَنَةُ">أَكْبَرُ</Step></Stack></QCard>
          <QCard n={13}><Lines><Sentence t={[489, '×', 86]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٥٠٠ × ٩٠ = ٤٥٠٠٠</Eq></Step></Stack><Stack><Step kind="ans" label="الْمُقَارَنَةُ">أَكْبَرُ</Step></Stack></QCard>
          <QCard n={14}><Lines><Sentence t={[535, '×', 42]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٥٠٠ × ٤٠ = ٢٠٠٠٠</Eq></Step></Stack><Stack><Step kind="ans" label="الْمُقَارَنَةُ">أَقَلُّ</Step></Stack></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={15} chart={null} time={60}
          question={"يستطيعُ الظَّبيُ أنْ يركضَ ٨٨ كيلومترًا في السَّاعةِ. كمْ كيلومترًا تقريبًا يستطيعُ الظَّبيُ أنْ يقطعَ إذا ركضَ مدَّةَ ١٢ ساعةً؟"}
          hint="إلى أيِّ عشرةٍ يقربُ كلٌّ منَ العددينِ؟"
          steps={[
            { text: '٨٨ تقربُ إلى ٩٠، و١٢ تقربُ إلى ١٠.' },
            { text: <Eq>٩٠ × ١٠ = ٩٠٠</Eq> },
            { text: '٩٠٠ كيلومترٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={16} chart={null} time={60}
          question={"يبلغُ معدَّلُ ما يُسجِّلُهُ إبراهيمُ في مباراةِ كرةِ السَّلَّةِ ١٦ نقطةً. كمْ نقطةً تقريبًا يُسجِّلُ في ١٤ مباراةً؟"}
          hint="إلى أيِّ عشرةٍ يقربُ كلٌّ منَ العددينِ؟"
          steps={[
            { text: '١٦ تقربُ إلى ٢٠، و١٤ تقربُ إلى ١٠.' },
            { text: <Eq>٢٠ × ١٠ = ٢٠٠</Eq> },
            { text: '٢٠٠ نقطةٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={17} chart={null} time={60}
          question={"نوعٌ منَ الدِّيدانِ لهُ ٧٥٠ رجلًا، كمْ رجلًا تقريبًا لدى ١٢ دودةً منْ ذلكَ النَّوعِ؟"}
          hint="إلى أيِّ مئةٍ تقربُ ٧٥٠؟"
          steps={[
            { text: '٧٥٠ تقربُ إلى ٨٠٠، و١٢ تقربُ إلى ١٠.' },
            { text: <Eq>٨٠٠ × ١٠ = ٨٠٠٠</Eq> },
            { text: '٨٠٠٠ رجلٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={18} chart={<DataTable rows={[['الفواكهُ الطَّازجةُ', 113], ['الخضرواتُ الطَّازجةُ', 72], ['الحليبُ', 47]]} />} time={60}
          question={<><BookLabel>القياسُ:</BookLabel> كمْ كيلوجرامًا تقريبًا منَ الفواكهِ الطَّازجةِ يستهلكُ الفردُ السُّعوديُّ خلالَ ١٢ سنةً؟</>}
          hint="ما الكميةُ في الجدولِ؟"
          steps={[
            { text: '١١٣ تقربُ إلى ١٠٠، و١٢ تقربُ إلى ١٠.' },
            { text: <Eq>١٠٠ × ١٠ = ١٠٠٠</Eq> },
            { text: '١٠٠٠ كجم', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={19} chart={null} time={120}
          question={<><BookLabel>مسألةٌ مفتوحةٌ:</BookLabel> اكتُبْ عددينِ يكونُ تقديرُ ناتجِ ضربِهِما ٢٠٠٠</>}
          hint="ما عددانِ منْ مضاعفاتِ العشرةِ ناتجُ ضربِهِما ٢٠٠٠؟"
          steps={[
            { text: <Eq>٥٠ × ٤٠ = ٢٠٠٠</Eq> },
            { text: '٤٨ و٣٩', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={20} chart={null} time={120}
          question={<><BookLabel>الحسُّ العدديُّ:</BookLabel> قدِّرْ ٣٩ × ٥١ و ٤٥ × ٨٤، أيُّهما أقربُ إلى الإجابةِ الدقيقةِ؟</>}
          hint="احسُبِ الفرقَ بينَ التقديرِ والإجابةِ الدقيقةِ."
          steps={[
            { text: <>التقديرُ <Eq>٤٠ × ٥٠ = ٢٠٠٠</Eq>، والدقيقُ ١٩٨٩: الفرقُ ١١</> },
            { text: <>التقديرُ <Eq>٥٠ × ٨٠ = ٤٠٠٠</Eq>، والدقيقُ ٣٧٨٠: الفرقُ ٢٢٠</> },
            { text: <Eq>٣٩ × ٥١</Eq>, kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={HOT} n={21} tags={[{ kind: 'warn', text: 'اُكْتُبْ' }]} chart={null}
          question="مسألةٌ منْ واقعِ الحياةِ تَستعمِلُ فيها تقديرَ ناتجِ ضربِ عددينِ، كلٌّ منهُما يتكوَّنُ منْ رقمينِ."
          hint="منْ أينَ نأتي بعددينِ؟"
          steps={[
            { text: 'في مدرسةٍ ٢٨ فصلًا، في كلِّ فصلٍ ٣٢ طالبًا.' },
            { text: 'قدِّرْ عددَ الطلابِ.' },
            { text: <Eq>٣٠ × ٣٠ = ٩٠٠</Eq>, kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
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
            <QCard n={22}><MCQ q="كمْ يبلغُ طولُ ٣٥ أفعى منْ نوعِ الأناكوندا؟ طولُ الواحدةِ ٦٠٠ سم (الدرس ٦-١)" options={["أ) ١٨٠٠٠ سم", "ب) ٢١٠٠٠ سم", "جـ) ٢٤٠٠٠ سم", "د) ٣٠٠٠٠ سم"]} answer="ب) ٢١٠٠٠ سم" /></QCard>
            <QCard n={23}><MCQ q="عددُ أيامِ السنةِ الهجريةِ يُساوي ٣٥٤ يومًا تقريبًا، ما أفضلُ تقديرٍ لعددِ أيامِ ١٢ سنةً؟ (الدرس ٦-٢)" options={["أ) ٤٠٠٠", "ب) ٥٠٠٠", "جـ) ٦٠٠٠", "د) ٧٠٠٠"]} answer="أ) ٤٠٠٠" /></QCard>
          </Grid>
        </>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'مراجعة الدرس ٦-١.',
      content: (
        <QuestionGroup source={REVIEW} instruction={'أوجدْ ناتجَ الضَّربِ في كلٍّ ممَّا يلي:'} cols={3} time={90}>
          <QCard n={24}><VMul2 a={27} b={10} /></QCard>
          <QCard n={25}><VMul2 a={43} b={50} /></QCard>
          <QCard n={26}><VMul2 a={96} b={70} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'مراجعة الدرس ٥-٨.',
      content: (
        <QuestionGroup source={REVIEW} instruction={ROUND} cols={3} time={90}>
          <QCard n={27}><Stack><Lines><Sentence t={[1006, '×', 3, '=', { b: 3018, box: true }]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>١٠٠٠ × ٣ = ٣٠٠٠</Eq></Step></Stack></Stack></QCard>
          <QCard n={28}><Stack><Lines><Sentence t={[4065, '×', 6, '=', { b: 24390, box: true }]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٤٠٠٠ × ٦ = ٢٤٠٠٠</Eq></Step></Stack></Stack></QCard>
          <QCard n={29}><Stack><Lines><Sentence t={[7040, '×', 9, '=', { b: 63360, box: true }]} /></Lines><Stack><Step kind="ans" label="التَّقْدِيرُ"><Eq>٧٠٠٠ × ٩ = ٦٣٠٠٠</Eq></Step></Stack></Stack></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={REVIEW} n={30} chart={<DataTable rows={[['المدخلة', 1, 3, 5, 7, 9, 11], ['المخرجة', 4, 12, 20, '؟', '؟', '؟']]} />} time={120}
          question={"اكتشفِ القاعدةَ ثمَّ طبِّقْها لتكملَ الجدولَ:"}
          hint="ماذا فعلْنا بالعددِ ١ ليصيرَ ٤؟"
          steps={[
            { text: <>القاعدةُ: <Eq>المخرجةُ = ٤ × المدخلةِ</Eq></> },
            { text: '٢٨، ٣٦، ٤٤', kind: 'ans', label: 'المخرجاتُ الناقصةُ' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={REVIEW} n={31} chart={null} time={120}
          question={"يبلغُ الراتبُ الشهريُّ لموظفٍ ١٠٤٠٢ ريال، يدفعُ منه مبلغَ ٢٤٤٩ ريالًا إيجارًا لشقتِهِ، كمْ ريالًا يتبقَّى لديهِ؟ تحقَّقْ منْ صحةِ الحلِّ."}
          hint="أيُّ عمليَّةٍ تعطينا الباقيَ؟"
          steps={[
            { text: <Eq>١٠٤٠٢ − ٢٤٤٩ = ٧٩٥٣</Eq> },
            { text: <>نتحقَّقُ: <Eq>٧٩٥٣ + ٢٤٤٩ = ١٠٤٠٢</Eq></> },
            { text: '٧٩٥٣ ريالًا', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة المنازل.',
      content: (
        <QuestionGroup source={REVIEW} instruction={PLACE} cols={3} time={60}>
          <QCard n={32}><Stack><Lines><span>١٨٩٣<u>٩</u>٧</span></Lines><Stack><Step kind="ans" label="القيمةُ">٩٠</Step></Stack></Stack></QCard>
          <QCard n={33}><Stack><Lines><span><u>٢</u>٦٧٠٨٣٠</span></Lines><Stack><Step kind="ans" label="القيمةُ">٢٠٠٠٠٠٠</Step></Stack></Stack></QCard>
          <QCard n={34}><Stack><Lines><span>٣٤٧<u>٩</u>١٠٢٨</span></Lines><Stack><Step kind="ans" label="القيمةُ">٩٠٠٠٠</Step></Stack></Stack></QCard>
        </QuestionGroup>
      ),
    },
    mindSlide(<>تقديرُ<br />نواتجِ الضَّربِ</>, [{"cap": "أُقرِّبُ", "text": "كلَّ عددٍ"}, {"cap": "أضربُ", "text": "العشراتِ أوِ المئاتِ"}, {"cap": "إلى أعلى", "text": "التقديرُ أكبرُ"}, {"cap": "إلى أسفلَ", "text": "التقديرُ أقلُّ"}]),
    exitSlide('أقدّر الناتج', [["٣١ × ١٨ تقريبًا:", ["٦٠٠", "٥٠٠", "٤٩"], "٦٠٠"], ["٤٢ × ٢١ تقريبًا:", ["٨٠٠", "٦٠", "٦٠٠"], "٨٠٠"], ["٢٩ × ٤٩ تقريبًا، والتقديرُ:", ["١٥٠٠ أكبرُ", "١٥٠٠ أقلُّ", "٨٠٠ أقلُّ"], "١٥٠٠ أكبرُ"]]),
    endSlide,
  ],
});
