import {
  BookLabel, Cols, Eq, Mark, QuestionSlide, SlideHead, Solution, Step, Thousands, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const THINK = 'فكِّرْ، ص ١٧';
const CHECK = 'تأكَّدْ، ص ١٧';

export default defineLesson({
  meta: {
    id: 'g4-1-2-a-explore-million',
    design: 'v2',
    code: '١-٢',
    title: 'استكشافٌ: إلى أيِّ مدًى يكونُ المليونُ كبيرًا؟',
    shortTitle: 'استكشاف: إلى أي مدى يكون المليون كبيرًا؟',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الأول: القيمة المنزلية',
    source: 'الجزء الأول، ص ١٦–١٧',
    minutes: 45,
    idea: 'أستكشفُ العددَ (المليونَ).',
    bookQuestions: 10,
  },
  sectionDesc: {"engage": "تذكّر", "explain": "نشاط", "check": "الأسئلة ١–١٠", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أستكشفُ العددَ (المليونَ).', ["أعملُ نموذجًا للعددِ ١٠٠٠", "أُكوِّنُ منهُ ١٠٠٠٠ و١٠٠٠٠٠", "أعرفُ كمْ يساوي المليونُ."], <Mark>المليونُ</Mark>),
    askSlide('engage', 'تذكّر', [["١٠ × ١٠٠ =", ["١٠٠٠", "١٠٠", "١٠٠٠٠"], "١٠٠٠"], ["١٠ × ١٠٠٠ =", ["١٠٠٠٠", "١٠٠٠", "١٠٠٠٠٠"], "١٠٠٠٠"], ["كمْ صفرًا في ١٠٠٠٠٠؟", ["٥", "٤", "٦"], "٥"]], 'الضرب في عشرة يزيد صفرًا.'),
    {
      sec: 'explain', min: 7,
      notes: 'النشاط من الكتاب: يمكن صنع مكعب من ورق مقوى، وطول حرفه ١٠ سم.',
      content: (
        <>
          <SlideHead tag="نشاطٌ، ص ١٦" kind="rule">اعملْ نموذجًا للعددِ ١٠٠٠٠٠٠</SlideHead>
          <Cols>
            <Solution>
              <Step><BookLabel>الخطوةُ ١:</BookLabel> مكعَّبٌ واحدٌ يمثِّلُ ١٠٠٠</Step>
              <Step><BookLabel>الخطوةُ ٢:</BookLabel> ١٠ مكعَّباتٍ تمثِّلُ ١٠٠٠٠</Step>
              <Step><BookLabel>الخطوةُ ٣:</BookLabel> ١٠ نماذجَ تمثِّلُ ١٠٠٠٠٠</Step>
              <Step><BookLabel>الخطوةُ ٤:</BookLabel> <Eq>١٠ × ١٠٠٠٠٠ = ١٠٠٠٠٠٠</Eq></Step>
              <Step kind="ans" label="نحتاجُ إلى">١٠ نماذجَ</Step>
            </Solution>
            <Thousands count={10} />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: كم ورقة في مليون؟ (مثال غير أمثلة الكتاب).'),
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={THINK} n={1} tags={[{ kind: 'warn', text: 'فَكِّرْ' }]} chart={null}
          question="كيفَ صنعتَ نموذجًا للعددِ ١٠٠٠٠؟"
          hint="كمْ مكعَّبًا ألصقْنا؟"
          steps={[
            { text: 'ألصقْنا ١٠ مكعَّباتٍ.' },
            { text: <Eq>١٠ × ١٠٠٠ = ١٠٠٠٠</Eq> },
            { text: 'بعشرةِ مكعَّباتٍ، كلٌّ منها ١٠٠٠', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
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
          question="صِفْ كيفَ يبدو نموذجُ العددِ ١٠٠٠٠٠٠؟"
          hint="كمْ نموذجًا منْ ١٠٠٠٠٠ فيهِ؟"
          steps={[
            { text: 'فيهِ ١٠ نماذجَ للعددِ ١٠٠٠٠٠' },
            { text: 'مجسَّمٌ ضخمٌ يعادلُ ١٠٠٠ مكعَّبٍ منْ مكعَّباتِ الألفِ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={THINK} n={3} tags={[{ kind: 'warn', text: 'فَكِّرْ' }]} chart={null}
          question="ما علاقةُ النماذجِ الَّتي صنعتَها بتمثيلِ الآحادِ والعشراتِ والمئاتِ؟"
          hint="كمْ مرَّةً تكبرُ كلُّ منزلةٍ؟"
          steps={[
            { text: 'الآحادُ مكعَّبٌ صغيرٌ، والعشراتُ عمودٌ، والمئاتُ لوحٌ.' },
            { text: 'كلُّ منزلةٍ عشرةُ أمثالِ الَّتي قبلَها.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={THINK} n={4} tags={[{ kind: 'warn', text: 'فَكِّرْ' }]} chart={null}
          question="هلْ لاحظتَ أنماطًا عدديَّةً خلالَ صُنعِكَ تلكَ النماذجَ؟ اُذكرْها."
          hint="ماذا يزيدُ في كلِّ مرَّةٍ؟"
          steps={[
            { text: '١٠٠٠، ١٠٠٠٠، ١٠٠٠٠٠، ١٠٠٠٠٠٠' },
            { text: 'كلُّ نموذجٍ عشرةُ أمثالِ سابقِهِ، ويزيدُ صفرًا واحدًا.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} chart={<Thousands count={7} />} time={60}
          question={"اكتُبِ العددَ الَّذي يمثِّلُهُ هذا النموذجُ:"}
          hint="كمْ مكعَّبًا في النموذجِ؟"
          steps={[
            { text: '٧ مكعَّباتٍ، كلٌّ منها ١٠٠٠' },
            { text: '٧٠٠٠', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={6} chart={<Thousands count={10} />} time={60}
          question={"اكتُبِ العددَ الَّذي يمثِّلُهُ هذا النموذجُ:"}
          hint="كمْ مكعَّبًا في النموذجِ؟"
          steps={[
            { text: '١٠ مكعَّباتٍ، كلٌّ منها ١٠٠٠' },
            { text: '١٠٠٠٠', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} chart={<Thousands count={1} />} time={60}
          question={"يُمثِّلُ النموذجُ المجاورُ العددَ ١٠٠٠، كمْ عشرةً توجدُ في العددِ ١٠٠٠؟"}
          hint="ما ناتجُ ١٠٠ × ١٠؟"
          steps={[
            { text: <Eq>١٠٠ × ١٠ = ١٠٠٠</Eq> },
            { text: '١٠٠ عشرةٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={8} chart={null} time={60}
          question={"كمْ ألفًا يوجدُ في العددِ ١٠٠٠٠٠٠؟"}
          hint="ما ناتجُ ١٠٠٠ × ١٠٠٠؟"
          steps={[
            { text: <Eq>١٠٠٠ × ١٠٠٠ = ١٠٠٠٠٠٠</Eq> },
            { text: '١٠٠٠ ألفٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={9} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كيفَ تعرفُ مقدارَ الوقتِ الَّذي تحتاجُ إليهِ لتعدَّ منْ ١ إلى مليونٍ؟ فسِّرْ إجابتَكَ."
          hint="كمْ ثانيةً لكلِّ عددٍ؟"
          steps={[
            { text: 'أقيسُ زمنَ عدِّي منْ ١ إلى ١٠٠' },
            { text: 'أضربُهُ في ١٠٠٠٠، فبمعدَّلِ عددٍ كلَّ ثانيةٍ أحتاجُ نحوَ ١٢ يومًا.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={CHECK} n={10} chart={null} time={120}
          question={<><BookLabel>اكتُبْ:</BookLabel> كمْ مئةً توجدُ في العددِ ١٠٠٠٠٠٠؟ فسِّرْ إجابتَكَ.</>}
          hint="ما ناتجُ ١٠٠٠٠ × ١٠٠؟"
          steps={[
            { text: <Eq>١٠٠٠٠ × ١٠٠ = ١٠٠٠٠٠٠</Eq> },
            { text: '١٠٠٠٠ مئةٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>المليونُ</>, [{"cap": "١٠٠٠", "text": "مكعَّبٌ"}, {"cap": "١٠٠٠٠", "text": "١٠ مكعَّباتٍ"}, {"cap": "١٠٠٠٠٠", "text": "١٠٠ مكعَّبٍ"}, {"cap": "١٠٠٠٠٠٠", "text": "١٠٠٠ مكعَّبٍ"}]),
    exitSlide('المليون', [["١٠ × ١٠٠٠٠٠ =", ["١٠٠٠٠٠٠", "١٠٠٠٠٠", "١٠٠٠٠"], "١٠٠٠٠٠٠"], ["كمْ صفرًا في المليونِ؟", ["٦", "٥", "٧"], "٦"], ["كمْ ألفًا في المليونِ؟", ["١٠٠٠", "١٠٠", "١٠"], "١٠٠٠"]]),
    endSlide,
  ],
});
