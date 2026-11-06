import {
  BookLabel, Cols, DataTable, Eq, LineBox, Mark, NumberLine, QText, QuestionGroup, QuestionSlide, RoundCard, RoundSum, SlideHead, Solution, Step, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ١٥٦';
const PRACTICE = 'أتدرَّبُ، ص ١٥٧';
const FIND = 'أُقَرِّبُ إِلَى أَقْرَبِ عَشَرَةٍ، ثُمَّ أُقَدِّرُ نَاتِجَ الطَّرْحِ:';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٥٧';

export default defineLesson({
  meta: {
    id: 'g2-6-9-estimate-differences',
    design: 'v2',
    code: '٦-٩',
    title: 'تَقْدِيرُ نَاتِجِ الطَّرْحِ',
    shortTitle: 'تقدير ناتج الطرح',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل السادس: طرح الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١٥٦–١٥٧',
    minutes: 45,
    idea: 'أُقَدِّرُ نَاتِجَ الطَّرْحِ.',
    bookQuestions: 14,
  },
  sectionDesc: {"engage": "أقرب عشرة", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٤", "practice": "الأسئلة ٥–١٣", "hot": "السؤال ١٤", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أُقَدِّرُ نَاتِجَ الطَّرْحِ.', ["أُقَرِّبُ الْعَدَدَ إِلَى أَقْرَبِ عَشَرَةٍ.", "أَطْرَحُ الْعَشَرَاتِ.", "أُقَدِّرُ نَاتِجَ الطَّرْحِ."], <Mark>التَّقْرِيبُ</Mark>),
    askSlide('engage', 'أقرب عشرة', [["٤٧ أَقْرَبُ إِلَى:", ["٤٠", "٥٠", "٦٠"], "٥٠"], ["٢٢ أَقْرَبُ إِلَى:", ["٢٠", "٣٠", "١٠"], "٢٠"], ["٥٠ − ٢٠ = ؟", ["٣٠", "٧٠", "٣"], "٣٠"]], 'ربط بالدرس ٥-٨.'),
    {
      sec: 'explain', min: 6,
      notes: 'أنا أعمل: نقرب كل عدد، ثم نطرح العشرات.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٥٦" kind="rule">أقدّر ناتج الطرح ٣٩ − ٣١</SlideHead>
          <QText>إِذَا لَمْ أَكُنْ بِحَاجَةٍ إِلَى إِجَابَةٍ دَقِيقَةٍ فَإِنَّنِي أُقَدِّرُ الإِجَابَةَ.</QText>
          <LineBox small><NumberLine min={30} max={40} /></LineBox>
          <Cols even>
            <Solution>
              <Step><BookLabel>الْخُطْوَةُ ١:</BookLabel> ٣٩ أَقْرَبُ إِلَى ٤٠، وَ٣١ أَقْرَبُ إِلَى ٣٠.</Step>
              <Step><BookLabel>الْخُطْوَةُ ٢:</BookLabel> نَطْرَحُ الْعَشَرَاتِ.</Step>
            </Solution>
            <RoundSum a={39} b={31} op="−" />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٦٨ − ٢٢ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أقرّب وأقدّر', [["٤٦ أَقْرَبُ إِلَى:", ["٤٠", "٥٠", "٦٠"], "٥٠"], ["١٣ أَقْرَبُ إِلَى:", ["١٠", "٢٠", "٣٠"], "١٠"], ["٤٦ − ١٣ يُسَاوِي تَقْرِيبًا:", ["٣٠", "٤٠", "٥٠"], "٤٠"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 5,
      notes: 'اطلب من طالب أن يشير إلى العدد على خط الأعداد.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={120} above={<LineBox small><NumberLine min={10} max={30} /></LineBox>}>
          <RoundCard n={1} a={31} b={18} op="−" />
          <RoundCard n={2} a={22} b={14} op="−" />
          <RoundCard n={3} a={25} b={11} op="−" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ أُقَدِّرُ نَاتِجَ طَرْحِ ٢١ مِنْ ٣٩؟"
          hint="إِلَى أَيِّ عَشَرَةٍ يَقْرُبُ كُلُّ عَدَدٍ؟"
          steps={[
            { text: '٣٩ أَقْرَبُ إِلَى ٤٠، وَ٢١ أَقْرَبُ إِلَى ٢٠.' },
            { text: <Eq>٤٠ − ٢٠ = ٢٠</Eq>, kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 6,
      notes: 'أتذكر من الكتاب: ١، ٢، ٣، ٤ تقرّب إلى أدنى، و٥ وما بعدها إلى أعلى.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={180}>
          <RoundCard n={5} a={38} b={27} op="−" />
          <RoundCard n={6} a={29} b={23} op="−" />
          <RoundCard n={7} a={36} b={28} op="−" />
          <RoundCard n={8} a={43} b={22} op="−" />
          <RoundCard n={9} a={58} b={37} op="−" />
          <RoundCard n={10} a={45} b={37} op="−" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={90}>
          <RoundCard n={11} a={51} b={39} op="−" />
          <RoundCard n={12} a={55} b={26} op="−" />
          <RoundCard n={13} a={42} b={23} op="−" />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={14} chart={<DataTable rows={[['صَالِحٌ', 13], ['ثَامِرٌ', 15], ['مَازِنٌ', 10], ['بَدْرٌ', 11]]} />} time={120}
          question={<><BookLabel>التَّفْسِيرُ الرِّيَاضِيُّ:</BookLabel> أَنْظُرُ إِلَى الْجَدْوَلِ؛ لِأَتَعَرَّفَ إِلَى أَكْبَرِ هَؤُلَاءِ الإِخْوَةِ عُمْرًا، وَأَصْغَرِهِمْ عُمْرًا، وَالْفَرْقِ بَيْنَ عُمْرِ أَكْبَرِهِمْ وَأَصْغَرِهِمْ.</>}
          hint="أَيُّ عَدَدٍ هُوَ الأَكْبَرُ؟ وَأَيُّهَا الأَصْغَرُ؟"
          steps={[
            { text: 'ثَامِرٌ', kind: 'ans', label: 'الأَكْبَرُ' },
            { text: 'مَازِنٌ', kind: 'ans', label: 'الأَصْغَرُ' },
            { text: <Eq>١٥ − ١٠ = ٥</Eq> },
            { text: '٥ سَنَوَاتٍ', kind: 'ans', label: 'الْفَرْقُ' },
          ]}
        />
      ),
    },
    mindSlide(<>تَقْدِيرُ<br />نَاتِجِ الطَّرْحِ</>, [{"cap": "أُقَرِّبُ", "text": "كُلَّ عَدَدٍ إِلَى أَقْرَبِ عَشَرَةٍ"}, {"cap": "أَطْرَحُ", "text": "الْعَشَرَاتِ"}, {"cap": "مِثَالٌ", "text": "٣٩ − ٣١ يُسَاوِي ١٠ تَقْرِيبًا"}, {"cap": "أَتَذَكَّرُ", "text": "٥ وَمَا بَعْدَهَا إِلَى الْعَشَرَةِ الأَعْلَى"}]),
    exitSlide('أقدّر ناتج الطرح', [["٣٢ أَقْرَبُ إِلَى:", ["٣٠", "٤٠", "٢٠"], "٣٠"], ["٤٨ − ١٩ يُسَاوِي تَقْرِيبًا:", ["٢٠", "٣٠", "٤٠"], "٣٠"], ["٧٤ − ٢٦ يُسَاوِي تَقْرِيبًا:", ["٤٠", "٥٠", "٦٠"], "٤٠"]]),
    endSlide,
  ],
});
