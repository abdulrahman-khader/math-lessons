import {
  BookLabel, CheckCard, Cols, Eq, QCol, QText, QuestionGroup, QuestionSlide, SlideHead, Solution, Stack, Step, VSum, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'تأكَّدْ، ص ٦٤';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ، ص ٦٥';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ٦٥';


export default defineLesson({
  meta: {
    id: 'g4-2-5-subtraction',
    design: 'v2',
    code: '٢-٥',
    title: 'الطَّرحُ',
    shortTitle: 'الطرح',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الثاني: الجمع والطرح',
    source: 'الجزء الأول، ص ٦٣–٦٥',
    minutes: 45,
    idea: 'أطرحُ أعدادًا كلٌّ منها يتكوَّنُ منْ عدَّةِ أرقامٍ.',
    bookQuestions: 20,
  },
  sectionDesc: {"engage": "تذكّر", "explain": "أمثلة الكتاب", "elab": "نعمل معًا", "check": "الأسئلة ١–٦", "practice": "الأسئلة ٧–١٨", "hot": "السؤالان ١٩–٢٠", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أطرحُ أعدادًا كلٌّ منها يتكوَّنُ منْ عدَّةِ أرقامٍ.', ["أُقدِّرُ أوَّلًا.", "أطرحُ منزلةً منزلةً معَ إعادةِ التجميعِ.", "أتحقَّقُ بالجمعِ."]),
    askSlide('engage', 'تذكّر', [["٥٣ − ٢٧ =", ["٢٦", "٣٦", "٣٤"], "٢٦"], ["ألفٌ واحدٌ =", ["١٠ مئاتٍ", "١٠ عشراتٍ", "١٠٠ مئةٍ"], "١٠ مئاتٍ"], ["٧٢٠ − ٣٠٠ =", ["٤٢٠", "٤٠٠", "١٠٢٠"], "٤٢٠"]], 'مراجعة الطرح.'),
    {
      sec: 'explain', min: 5,
      notes: 'عند عدم إمكان الطرح نفك التجميع للمنزلة التالية.',
      content: (
        <>
          <SlideHead tag="مثالٌ منْ واقعِ الحياةِ، ص ٦٣" kind="rule">مطار الملك خالد</SlideHead>
          <Cols>
            <QCol>
              <QText>أقلعتْ طائرةٌ منْ مطارِ الملكِ خالدٍ الدوليِّ بالرياضِ متوجهةً إلى مدينةِ تونسَ. فإذا قطعتْ مسافةَ ٩٥٧ كلم، فكمْ كيلومترًا بقيَ لتصلَ إلى تونسَ علمًا بأنَّ المسافةَ بينَ المدينتينِ تقدَّرُ بـ ٣٧١٩ كلم؟</QText>
              <Solution>
                <Step><BookLabel>قدِّرْ:</BookLabel> <Eq>٣٧٠٠ − ١٠٠٠ = ٢٧٠٠</Eq></Step>
                <Step><BookLabel>تحقَّقْ:</BookLabel> <Eq>٢٧٦٢ + ٩٥٧ = ٣٧١٩</Eq></Step>
                <Step kind="ans" label="المسافةُ المتبقِّيةُ">٢٧٦٢ كلم</Step>
              </Solution>
            </QCol>
            <VSum a={3719} op="−" b={957} v={2762} />
          </Cols>
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'الإجابة صحيحة، والتقدير قريب منها.',
      content: (
        <>
          <SlideHead tag="مثالٌ منْ واقعِ الحياةِ، ص ٦٤" kind="rule">مختبر المدرسة</SlideHead>
          <Cols>
            <QCol>
              <QText><BookLabel>نقودٌ:</BookLabel> تبلغُ التكلفةُ الإجماليَّةُ لتطويرِ مختبرِ المدرسةِ ٤٢٧٥ ريالًا. إذا دفعتْ إدارةُ المدرسةِ ١٣٤٥ ريالًا منها، فكمْ ريالًا يتبقَّى لاستكمالِ التطويرِ؟</QText>
              <Solution>
                <Step><BookLabel>قدِّرْ:</BookLabel> <Eq>٤٣٠٠ − ١٣٠٠ = ٣٠٠٠</Eq></Step>
                <Step kind="ans" label="يتبقَّى">٢٩٣٠ ريالًا</Step>
              </Solution>
            </QCol>
            <VSum a={4275} op="−" b={1345} v={2930} />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٦٤٢٥ − ٢٧٣٨ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أطرح', [["٥٢٣ − ٢٤١ =", ["٢٨٢", "٣٨٢", "٢٧٢"], "٢٨٢"], ["٧٠٨ − ٣٥٠ =", ["٣٥٨", "٤٥٨", "٣٤٨"], "٣٥٨"], ["٤٢٦٠ − ١٣٠٠ =", ["٢٩٦٠", "٣٩٦٠", "٢٨٦٠"], "٢٩٦٠"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 6,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={'اطرحْ ثمَّ تحقَّقْ منْ صحَّةِ الطرحِ مستعملًا الجمعَ والتقديرَ:'} cols={2} time={240}>
          <CheckCard n={1} a={526} b={403} est={<Eq>٥٠٠ − ٤٠٠ = ١٠٠</Eq>} />
          <CheckCard n={2} a={937} b={729} est={<Eq>٩٠٠ − ٧٠٠ = ٢٠٠</Eq>} />
          <CheckCard n={3} a={2962} b={845} est={<Eq>٣٠٠٠ − ٨٠٠ = ٢٢٠٠</Eq>} />
          <CheckCard n={4} a={4785} b={2293} est={<Eq>٤٨٠٠ − ٢٣٠٠ = ٢٥٠٠</Eq>} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} chart={null} time={120}
          question={"معَ عائشةَ ٩٥ ريالًا. إذا اشترتْ هديَّةً لأمِّها بـ ٢٥ ريالًا، فكمْ ريالًا يتبقَّى معها؟"}
          hint="أيُّ عمليَّةٍ تناسبُ؟"
          steps={[
            { text: <Eq>٩٥ − ٢٥ = ٧٠</Eq> },
            { text: '٧٠ ريالًا', kind: 'ans' },
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
          question="اشرحْ كيفَ تتحقَّقُ منْ صحَّةِ الطَّرحِ مستعملًا الجمعَ."
          hint="ماذا نجمعُ؟"
          steps={[
            { text: 'أجمعُ الفرقَ معَ المطروحِ.' },
            { text: 'إذا كانَ الناتجُ يُساوي المطروحَ منهُ فالطَّرحُ صحيحٌ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 6,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={'اطرحْ ثمَّ تحقَّقْ منْ صحَّةِ الطرحِ مستعملًا الجمعَ والتقديرَ:'} cols={2} time={240}>
          <CheckCard n={7} a={479} b={292} est={<Eq>٥٠٠ − ٣٠٠ = ٢٠٠</Eq>} />
          <CheckCard n={8} a={924} b={837} est={<Eq>٩٠٠ − ٨٠٠ = ١٠٠</Eq>} />
          <CheckCard n={9} a={524} b={246} est={<Eq>٥٠٠ − ٢٠٠ = ٣٠٠</Eq>} />
          <CheckCard n={10} a={986} b={339} est={<Eq>١٠٠٠ − ٣٠٠ = ٧٠٠</Eq>} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 6,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={'اطرحْ ثمَّ تحقَّقْ منْ صحَّةِ الطرحِ مستعملًا الجمعَ والتقديرَ:'} cols={2} time={240}>
          <CheckCard n={11} a={4273} b={365} est={<Eq>٤٣٠٠ − ٤٠٠ = ٣٩٠٠</Eq>} />
          <CheckCard n={12} a={8845} b={627} est={<Eq>٨٨٠٠ − ٦٠٠ = ٨٢٠٠</Eq>} />
          <CheckCard n={13} a={5751} b={4824} est={<Eq>٥٨٠٠ − ٤٨٠٠ = ١٠٠٠</Eq>} />
          <CheckCard n={14} a={8327} b={5709} est={<Eq>٨٣٠٠ − ٥٧٠٠ = ٢٦٠٠</Eq>} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={'اطرحْ ثمَّ تحقَّقْ منْ صحَّةِ الطرحِ مستعملًا الجمعَ والتقديرَ:'} cols={1} time={120}>
          <CheckCard n={15} a={39536} b={18698} est={<Eq>٤٠٠٠٠ − ١٩٠٠٠ = ٢١٠٠٠</Eq>} />
          <CheckCard n={16} a={64779} b={42788} est={<Eq>٦٥٠٠٠ − ٤٣٠٠٠ = ٢٢٠٠٠</Eq>} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={17} chart={null} time={120}
          question={"بلغَ عددُ المراجعينَ لإحدى عياداتِ الأسنانِ خلالَ يومٍ واحدٍ ٣٦ مراجعًا؛ منهُمْ ١٧ رجلًا، و١٢ امرأةً، والباقي منَ الأطفالِ. كمْ طفلًا راجعَ العيادةَ في ذلكَ اليومِ؟"}
          hint="كمْ رجلًا وامرأةً معًا؟"
          steps={[
            { text: <Eq>١٧ + ١٢ = ٢٩</Eq> },
            { text: <Eq>٣٦ − ٢٩ = ٧</Eq> },
            { text: '٧ أطفالٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={18} chart={null} time={120}
          question={"بدأَ مُتسلِّقٌ تسلُّقَهُ قمَّةَ إفرستَ منْ منطقةٍ ارتفاعُها ٥٣٦٤ مترًا، وتسلَّقَ مسافةَ ٧٠١ مترًا. إذا علمتَ أنَّ ارتفاعَ قمَّةِ إفرستَ ٨٨٥٠ مترًا، فكمْ مترًا بقيَ ليصلَ إلى القمَّةِ؟"}
          hint="كمْ وصلَ حتَّى الآنَ؟"
          steps={[
            { text: <Eq>٥٣٦٤ + ٧٠١ = ٦٠٦٥</Eq> },
            { text: <Eq>٨٨٥٠ − ٦٠٦٥ = ٢٧٨٥</Eq> },
            { text: '٢٧٨٥ مترًا', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={19} chart={<Stack><Eq>٤٧٤٥٧ − ٤٠٧٢٤</Eq><Eq>٧٠٦٣٩ − ٣٩٦٠٧</Eq><Eq>٨٩٥٨٤ − ٥٧٣٧٢</Eq><Eq>٩٥٩٤٧ − ٢٦٣٧٧</Eq></Stack>} time={120}
          question={<><BookLabel>اكتشفِ المختلفَ:</BookLabel> أيُّ مسائلِ الطَّرحِ الآتيةِ لا يتطلَّبُ حلُّها إعادةَ تجميعٍ؟ فسِّرْ إجابتَكَ.</>}
          hint="قارنْ كلَّ منزلةٍ."
          steps={[
            { text: 'كلُّ رقمٍ في ٨٩٥٨٤ أكبرُ منْ نظيرِهِ أوْ يُساويهِ.' },
            { text: <Eq>٨٩٥٨٤ − ٥٧٣٧٢</Eq>, kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={HOT} n={20} tags={[{ kind: 'warn', text: 'اُكْتُبْ' }]} chart={null}
          question="مسألةٌ منْ واقعِ الحياةِ حولَ الطَّرحِ يتطلَّبُ حلُّها إعادةَ تجميعٍ، بحيثُ تتكوَّنُ الأعدادُ الواردةُ فيها منْ ثلاثةِ أرقامٍ على الأقلِّ."
          hint="ماذا يوجدُ في المكتبةِ؟"
          steps={[
            { text: 'في مكتبةٍ ٥٢٤ كتابًا، أُعيرَ منها ١٤٧ كتابًا.' },
            { text: 'كمْ كتابًا بقيَ؟' },
            { text: <Eq>٥٢٤ − ١٤٧ = ٣٧٧</Eq>, kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    mindSlide(<>الطَّرحُ</>, [{"cap": "أُقدِّرُ", "text": "قبلَ الطَّرحِ"}, {"cap": "أطرحُ", "text": "منَ الآحادِ إلى أكبرِ منزلةٍ"}, {"cap": "أفكُّ", "text": "عندما لا تكفي المنزلةُ"}, {"cap": "أتحقَّقُ", "text": "بالجمعِ"}]),
    exitSlide('أطرح', [["٦٨٤ − ٢٥٣ =", ["٤٣١", "٤٢١", "٤٤١"], "٤٣١"], ["٧٣٢ − ٤٥٦ =", ["٢٧٦", "٣٧٦", "٢٨٦"], "٢٧٦"], ["٥٢١٤ − ١٦٠٩ =", ["٣٦٠٥", "٣٧٠٥", "٤٦٠٥"], "٣٦٠٥"]]),
    endSlide,
  ],
});
