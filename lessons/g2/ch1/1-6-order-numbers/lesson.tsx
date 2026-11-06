import {
  Blank, Cols, LineBox, Lines, Mark, NumberLine, QText, QuestionGroup, QuestionSlide, SeqCard, SlideHead, Step, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ٢٣';
const PRACTICE = 'أتدرَّبُ، ص ٢٤';
const FIND = 'أَسْتَعْمِلُ خَطَّ الأَعْدَادِ، وَأَكْتُبُ الأَعْدَادَ الْمُنَاسِبَةَ:';
const FILL = 'أَسْتَعْمِلُ خَطَّ الأَعْدَادِ لِأَمْلَأَ الْفَرَاغَ:';
const FILE = 'مَلَفُّ الْبَيَانَاتِ، ص ٢٤';

export default defineLesson({
  meta: {
    id: 'g2-1-6-order-numbers',
    design: 'v2',
    code: '١-٦',
    title: 'تَرْتِيبُ الأَعْدَادِ',
    shortTitle: 'ترتيب الأعداد',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الأول: القيمة المنزلية حتى ١٠٠ والأنماط',
    source: 'الجزء الأول، ص ٢٣–٢٤',
    minutes: 45,
    idea: 'أَكْتُبُ الأَعْدَادَ حَتَّى ١٠٠ بِالتَّرْتِيبِ مُسْتَعْمِلًا خَطَّ الأَعْدَادِ.',
    bookQuestions: 23,
  },
  sectionDesc: {"engage": "نتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٧", "practice": "الأسئلة ٨–٢٢", "hot": "السؤال ٢٣", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَكْتُبُ الأَعْدَادَ حَتَّى ١٠٠ بِالتَّرْتِيبِ مُسْتَعْمِلًا خَطَّ الأَعْدَادِ.', ["أَعْرِفُ الْعَدَدَ الَّذِي يَسْبِقُ.", "أَعْرِفُ الْعَدَدَ الَّذِي يَلِي.", "أَعْرِفُ الْعَدَدَ الَّذِي بَيْنَ عَدَدَيْنِ."], <Mark>خَطُّ الأَعْدَادِ، يَسْبِقُ، يَلِي، بَيْنَ</Mark>),
    askSlide('engage', 'نتذكر', [["بَعْدَ ٧:", ["٦", "٨", "٩"], "٨"], ["قَبْلَ ٤:", ["٣", "٥", "٢"], "٣"], ["مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ:", ["٢، ٣، ٤", "٤، ٣، ٢", "٣، ٢، ٤"], "٢، ٣، ٤"]], 'مراجعة من التهيئة ص ٩.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: أنظر إلى العدد ٥: ما الذي يسبقه؟ وما الذي يليه؟',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ٢٣" kind="rule">خط الأعداد</SlideHead>
          <QText>أَسْتَعْمِلُ خَطَّ الأَعْدَادِ لِأَكْتُبَ الأَعْدَادَ بِالتَّرْتِيبِ.</QText>
          <LineBox small><NumberLine min={0} max={15} /></LineBox>
          <Cols even>
            <Step>يَأْتِي الْعَدَدُ ٤ قَبْلَ الْعَدَدِ ٥</Step>
            <Step>يَأْتِي الْعَدَدُ ٦ بَعْدَ الْعَدَدِ ٥</Step>
          </Cols>
          <Lines><div className="tenline">يَقَعُ الْعَدَدُ ٥ بَيْنَ الْعَدَدَيْنِ ٤، ٦. <Blank v={5} /></div></Lines>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٤٧ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'يسبق ويلي', [["يَسْبِقُ ٢٠:", ["١٩", "٢١", "٣٠"], "١٩"], ["يَلِي ٢٩:", ["٣٠", "٢٨", "٣٩"], "٣٠"], ["بَيْنَ ١٤ وَ١٦:", ["١٥", "١٣", "١٧"], "١٥"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 4,
      notes: 'ننظر إلى خط الأعداد.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={120} above={<LineBox small><NumberLine min={0} max={15} /></LineBox>}>
          <SeqCard n={1} items={[10, null, 12]} ans={[11]} />
          <SeqCard n={2} items={[13, null, 15]} ans={[14]} />
          <SeqCard n={3} items={[7, null, 9]} ans={[8]} />
          <SeqCard n={4} items={[null, 4, 5]} ans={[3]} />
          <SeqCard n={5} items={[7, null, 5]} ans={[6]} />
          <SeqCard n={6} items={[15, null, 13]} ans={[14]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="أَخْتَارُ ٤ أَعْدَادٍ مُخْتَلِفَةٍ كُلٌّ مِنْهَا مُكَوَّنٌ مِنْ رَقْمَيْنِ وَأُرَتِّبُهَا، ثُمَّ أَشْرَحُ كَيْفَ عَمِلْتُ ذَلِكَ."
          hint="مَاذَا نُقَارِنُ أَوَّلًا؟"
          steps={[
            { text: 'نَخْتَارُ: ٥٢، ١٧، ٤٦، ٣٤' },
            { text: 'نُرَتِّبُهَا: ١٧، ٣٤، ٤٦، ٥٢' },
            { text: 'أُقَارِنُ الْعَشَرَاتِ أَوَّلًا، ثُمَّ الآحَادَ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FILL} cols={4} time={150} above={<LineBox small><NumberLine min={10} max={30} /></LineBox>}>
          <SeqCard n={8} items={[21, null, 23]} ans={[22]} />
          <SeqCard n={9} items={[null, 12, 13]} ans={[11]} />
          <SeqCard n={10} items={[null, 28, 29]} ans={[27]} />
          <SeqCard n={11} items={[11, 12, null]} ans={[13]} />
          <SeqCard n={12} items={[null, 19, 20]} ans={[18]} />
          <SeqCard n={13} items={[null, 20, 21, null]} ans={[19, 22]} />
          <SeqCard n={14} items={[null, 13, 14]} ans={[12]} />
          <SeqCard n={15} items={[25, null, 27]} ans={[26]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FILL} cols={4} time={150} above={<LineBox small><NumberLine min={10} max={30} /></LineBox>}>
          <SeqCard n={16} items={[17, 18, null, null]} ans={[19, 20]} />
          <SeqCard n={17} items={[29, null, 27]} ans={[28]} />
          <SeqCard n={18} items={[28, 29, null]} ans={[30]} />
          <SeqCard n={19} items={[15, null, 17]} ans={[16]} />
          <SeqCard n={20} items={[13, 14, null]} ans={[15]} />
          <SeqCard n={21} items={[19, null, 17]} ans={[18]} />
          <SeqCard n={22} items={[10, null, null, 13]} ans={[11, 12]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={FILE} n={23} chart={null} time={120} intro="يَقُومُ الْحَاسِبُ بِمُعَالَجَةِ وَتَرْتِيبِ الْبَيَانَاتِ وَالأَعْدَادِ بِسُرْعَةٍ كَبِيرَةٍ، وَدِقَّةٍ فَائِقَةٍ."
          question={"أُرَتِّبُ الأَعْدَادَ الآتِيَةَ مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ: ١١، ٨٥، ٦٩، ٧٤"}
          hint="مَا أَصْغَرُ رَقْمِ عَشَرَاتٍ؟"
          steps={[
            { text: 'أَصْغَرُ عَدَدٍ ١١' },
            { text: 'أَكْبَرُ عَدَدٍ ٨٥' },
            { text: '١١، ٦٩، ٧٤، ٨٥', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>تَرْتِيبُ<br />الأَعْدَادِ</>, [{"cap": "يَسْبِقُ", "text": "٤ قَبْلَ ٥"}, {"cap": "يَلِي", "text": "٦ بَعْدَ ٥"}, {"cap": "بَيْنَ", "text": "٥ بَيْنَ ٤ وَ٦"}, {"cap": "أَسْتَعْمِلُ", "text": "خَطَّ الأَعْدَادِ"}]),
    exitSlide('ترتيب الأعداد', [["بَعْدَ ٣٩:", ["٤٠", "٣٨", "٤٩"], "٤٠"], ["بَيْنَ ٦٧ وَ٦٩:", ["٦٨", "٦٦", "٧٠"], "٦٨"], ["الأَصْغَرُ إِلَى الأَكْبَرِ:", ["١٤، ٤١، ٥٠", "٤١، ١٤، ٥٠", "٥٠، ٤١، ١٤"], "١٤، ٤١، ٥٠"]]),
    endSlide,
  ],
});
