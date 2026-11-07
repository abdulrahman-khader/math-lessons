import {
  Blocks3, BookLabel, CheckCard, CheckRow, Cols, Eq, Mark, QCard, QuestionGroup, QuestionSlide, SlideHead, Solution, Stack, Step, VSum, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const THINK = 'فكِّرْ، ص ٦٢';
const CHECK = 'تأكَّدْ، ص ٦٢';

export default defineLesson({
  meta: {
    id: 'g4-2-5-a-explore-subtract',
    design: 'v2',
    code: '٢-٥',
    title: 'استكشافٌ: الطَّرحُ',
    shortTitle: 'استكشاف: الطرح',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الثاني: الجمع والطرح',
    source: 'الجزء الأول، ص ٦١–٦٢',
    minutes: 45,
    idea: 'أستكشفُ طرحَ الأعدادِ.',
    bookQuestions: 11,
  },
  sectionDesc: {"engage": "تذكّر", "explain": "نشاط", "check": "الأسئلة ١–١١", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أستكشفُ طرحَ الأعدادِ.', ["أُمثِّلُ العددَ بالنماذجِ.", "أُعيدُ التجميعَ عندَ الطرحِ.", "أتحقَّقُ بالجمعِ."], <Mark>المطروحُ منهُ، المطروحُ، الفرقُ</Mark>),
    askSlide('engage', 'تذكّر', [["مئةٌ واحدةٌ =", ["١٠ عشراتٍ", "١٠ آحادٍ", "١ عشرةٍ"], "١٠ عشراتٍ"], ["١٢ − ٤ =", ["٨", "٧", "٩"], "٨"], ["٣ − ٢ =", ["١", "٥", "٠"], "١"]], 'نراجع فك المئة.'),
    {
      sec: 'explain', min: 7,
      notes: 'النشاط من الكتاب. نتحقق بالجمع: ١٨٠ + ٢٤١ = ٤٢١.',
      content: (
        <>
          <SlideHead tag="نشاطٌ، ص ٦١" kind="rule">٤٢١ − ٢٤١</SlideHead>
          <Cols>
            <Solution>
              <Step><BookLabel>الخطوةُ ١:</BookLabel> نُمثِّلُ العددَ ٤٢١</Step>
              <Step><BookLabel>الخطوةُ ٢:</BookLabel> نطرحُ الآحادَ: <Eq>١ − ١ = ٠</Eq></Step>
              <Step><BookLabel>الخطوةُ ٣:</BookLabel> لا نستطيعُ طرحَ ٤ عشراتٍ منْ عشرتينِ.</Step>
              <Step>نفكُّ مئةً إلى ١٠ عشراتٍ: ١٢ عشرةً.</Step>
              <Step><BookLabel>الخطوةُ ٤:</BookLabel> نطرحُ المئاتِ: <Eq>٣ − ٢ = ١</Eq></Step>
              <Step kind="ans" label="الفرقُ">١٨٠</Step>
            </Solution>
            <Stack><Blocks3 v={421} /><VSum a={421} op="−" b={241} v={180} /></Stack>
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٥٣٠ − ٢٨٠ (مثال غير أمثلة الكتاب).'),
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={THINK} n={1} tags={[{ kind: 'warn', text: 'فَكِّرْ' }]} chart={null}
          question="كيفَ استعملتَ النماذجَ لطرحِ ٢٤١ منْ ٤٢١؟"
          hint="بماذا بدأْنا؟"
          steps={[
            { text: 'مثَّلتُ ٤٢١ بالنماذجِ.' },
            { text: 'فككتُ مئةً إلى ١٠ عشراتٍ.' },
            { text: 'أزلتُ ٢٤١ منها، فبقيَ ١٨٠', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={THINK} n={2} tags={[{ kind: 'warn', text: 'فَكِّرْ' }]} chart={null}
          question="صِفْ كيفَ قمتَ بإعادةِ التجميعِ في منزلةِ العشراتِ."
          hint="كمْ عشرةً صارتْ؟"
          steps={[
            { text: 'فككتُ مئةً واحدةً إلى ١٠ عشراتٍ.' },
            { text: 'ضممتُها إلى العشرتينِ فصارتْ ١٢ عشرةً، ثمَّ طرحتُ ٤ عشراتٍ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 4,
      notes: 'النماذج من الكتاب.',
      content: (
        <QuestionGroup source={CHECK} instruction="اطرحْ ثمَّ تحقَّقْ منْ صحَّةِ الطَّرحِ مستعملًا الجمعَ:" cols={2} time={120}>
          <QCard n={3} className="tenscard"><Blocks3 v={357} /><CheckRow a={357} b={98} /></QCard>
          <QCard n={4} className="tenscard"><Blocks3 v={679} /><CheckRow a={679} b={345} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={'اطرحْ ثمَّ تحقَّقْ منْ صحَّةِ الطرحِ مستعملًا الجمعَ:'} cols={3} time={150}>
          <CheckCard n={5} a={287} b={195} />
          <CheckCard n={6} a={525} b={385} />
          <CheckCard n={7} a={632} b={248} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={'اطرحْ ثمَّ تحقَّقْ منْ صحَّةِ الطرحِ مستعملًا الجمعَ:'} cols={3} time={150}>
          <CheckCard n={8} a={727} b={469} />
          <CheckCard n={9} a={861} b={593} />
          <CheckCard n={10} a={948} b={729} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={11} tags={[{ kind: 'warn', text: 'اُكْتُبْ' }]} chart={null}
          question="أهمِّيَّةُ ترتيبِ أرقامِ الأعدادِ بعضِها فوقَ بعضٍ عندَ إجراءِ عمليَّةِ الطَّرحِ؟"
          hint="ماذا نطرحُ منَ الآحادِ؟"
          steps={[
            { text: 'نطرحُ الآحادَ منَ الآحادِ، والعشراتِ منَ العشراتِ.' },
            { text: 'يضمنُ طرحَ كلِّ منزلةٍ منْ نظيرتِها، فيصحُّ الناتجُ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    mindSlide(<>استكشافُ<br />الطَّرحِ</>, [{"cap": "المطروحُ منهُ", "text": "٤٢١"}, {"cap": "المطروحُ", "text": "٢٤١"}, {"cap": "الفرقُ", "text": "١٨٠"}, {"cap": "أتحقَّقُ", "text": "١٨٠ + ٢٤١ = ٤٢١"}]),
    exitSlide('أطرح', [["٣٥٠ − ١٢٠ =", ["٢٣٠", "٢٢٠", "٤٧٠"], "٢٣٠"], ["٤١٠ − ٢٣٠ =", ["١٨٠", "٢٨٠", "١٩٠"], "١٨٠"], ["نتحقَّقُ منَ الطَّرحِ بـ", ["الجمعِ", "الضربِ", "القسمةِ"], "الجمعِ"]]),
    endSlide,
  ],
});
