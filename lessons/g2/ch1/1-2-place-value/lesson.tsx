import {
  Blank, Cols, Lines, Mark, QText, QuestionGroup, QuestionSlide, SlideHead, Step, TenOnes, ValueCard, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ١٣';
const PRACTICE = 'أتدرَّبُ، ص ١٤';
const FIND = 'أُحَوِّطُ الْقِيمَةَ الْمَنْزِلِيَّةَ لِلرَّقْمِ الْمُلَوَّنِ بِالأَحْمَرِ:';


export default defineLesson({
  meta: {
    id: 'g2-1-2-place-value',
    design: 'v2',
    code: '١-٢',
    title: 'الْقِيمَةُ الْمَنْزِلِيَّةُ لِلأَعْدَادِ حَتَّى ١٠٠',
    shortTitle: 'القيمة المنزلية للأعداد حتى ١٠٠',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الأول: القيمة المنزلية حتى ١٠٠ والأنماط',
    source: 'الجزء الأول، ص ١٣–١٤',
    minutes: 45,
    idea: 'أَجِدُ الْقِيمَةَ الْمَنْزِلِيَّةَ لِلأَعْدَادِ حَتَّى ١٠٠.',
    bookQuestions: 20,
  },
  sectionDesc: {"engage": "نتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٥", "practice": "الأسئلة ٦–١٩", "hot": "السؤال ٢٠", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَجِدُ الْقِيمَةَ الْمَنْزِلِيَّةَ لِلأَعْدَادِ حَتَّى ١٠٠.', ["أَعْرِفُ رَقْمَ الآحَادِ.", "أَعْرِفُ رَقْمَ الْعَشَرَاتِ.", "أَجِدُ قِيمَةَ كُلِّ رَقْمٍ."], <Mark>الرَّقْمُ، الْقِيمَةُ الْمَنْزِلِيَّةُ</Mark>),
    askSlide('engage', 'نتذكر', [["٣ عَشَرَاتٍ =", ["٣", "٣٠", "٣٠٠"], "٣٠"], ["٥ آحَادٍ =", ["٥", "٥٠", "١٥"], "٥"], ["٤٠ + ٢ = ؟", ["٤٢", "٢٤", "٦"], "٤٢"]], 'ربط بالدرس ١-١.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: الرقم ٢ قيمته ٢٠ لأنه في منزلة العشرات.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٣" kind="rule">موقع الرقم يحدد قيمته</SlideHead>
          <QText>إِنَّ مَوْقِعَ الرَّقْمِ ضِمْنَ الْعَدَدِ يُحَدِّدُ قِيمَتَهُ. فَالْعَدَدُ ٢٩ مُكَوَّنٌ مِنْ رَقْمَيْنِ، هُمَا ٩، ٢. مَا الْقِيمَةُ الْمَنْزِلِيَّةُ لِكُلٍّ مِنْهُمَا؟</QText>
          <TenOnes values={[29]} big />
          <Lines>
            <div className="tenline"><Blank v={9} /> آحَادٍ <Blank v={2} /> عَشَرَاتٍ</div>
          </Lines>
          <Cols even>
            <Step>٩ آحَادٍ = ٩</Step>
            <Step>٢ عَشَرَاتٍ = ٢٠</Step>
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٥٥ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'ما قيمة الرقم؟', [["قِيمَةُ ٤ فِي ٤٦:", ["٤", "٤٠", "٤٠٠"], "٤٠"], ["قِيمَةُ ٦ فِي ٤٦:", ["٦", "٦٠", "٤٦"], "٦"], ["فِي أَيِّ عَدَدٍ قِيمَةُ ٣ هِيَ ٣٠؟", ["٣٨", "٨٣", "١٣"], "٣٨"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 5,
      notes: 'كل ضغطة تحوّط إجابة سؤال.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={120}>
          <ValueCard n={1} v={25} blocks />
          <ValueCard n={2} v={34} tens blocks />
          <ValueCard n={3} v={18} blocks />
          <ValueCard n={4} v={42} blocks />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="هَلْ ٣ عَشَرَاتٍ وَ٩ آحَادٍ أَكْبَرُ مِنْ ٩ عَشَرَاتٍ وَ٣ آحَادٍ؟ أُفَسِّرُ ذَلِكَ."
          hint="مَا الْعَدَدَانِ؟"
          steps={[
            { text: '٣ عَشَرَاتٍ وَ٩ آحَادٍ = ٣٩' },
            { text: '٩ عَشَرَاتٍ وَ٣ آحَادٍ = ٩٣' },
            { text: 'لَا: ٣٩ أَصْغَرُ مِنْ ٩٣.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'أتذكر من الكتاب: موقع الرقم يحدد قيمته.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={90}>
          <ValueCard n={6} v={36} blocks />
          <ValueCard n={7} v={29} tens blocks />
          <ValueCard n={8} v={41} blocks />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={90}>
          <ValueCard n={9} v={28} blocks />
          <ValueCard n={10} v={12} tens blocks />
          <ValueCard n={11} v={39} tens blocks />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <ValueCard n={12} v={65} tens />
          <ValueCard n={13} v={90} tens />
          <ValueCard n={14} v={21} />
          <ValueCard n={15} v={47} />
          <ValueCard n={16} v={81} tens />
          <ValueCard n={17} v={26} />
          <ValueCard n={18} v={39} />
          <ValueCard n={19} v={73} tens />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={20} chart={null} time={120}
          question={"مَعَ سَارَةَ ٨٧ رِيَالًا، وَتُرِيدُ شِرَاءَ هَدِيَّةٍ لِوَالِدَتِهَا، ثَمَنُهَا ٧٨ رِيَالًا. هَلْ يُمْكِنُهَا شِرَاءُ الْهَدِيَّةِ؟ أُفَسِّرُ إِجَابَتِي."}
          hint="أَيُّ الْعَدَدَيْنِ أَكْبَرُ؟"
          steps={[
            { text: '٨٧ فِيهِ ٨ عَشَرَاتٍ.' },
            { text: '٧٨ فِيهِ ٧ عَشَرَاتٍ.' },
            { text: '٨٧ أَكْبَرُ مِنْ ٧٨.' },
            { text: 'نَعَمْ', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>الْقِيمَةُ<br />الْمَنْزِلِيَّةُ</>, [{"cap": "الآحَادُ", "text": "٩ فِي ٢٩ قِيمَتُهُ ٩"}, {"cap": "الْعَشَرَاتُ", "text": "٢ فِي ٢٩ قِيمَتُهُ ٢٠"}, {"cap": "الْمَوْقِعُ", "text": "يُحَدِّدُ قِيمَةَ الرَّقْمِ"}, {"cap": "أَنْتَبِهُ", "text": "٣٩ أَصْغَرُ مِنْ ٩٣"}]),
    exitSlide('القيمة المنزلية', [["قِيمَةُ ٧ فِي ٧٢:", ["٧", "٧٠", "٢"], "٧٠"], ["قِيمَةُ ٥ فِي ٦٥:", ["٥", "٥٠", "٦٠"], "٥"], ["قِيمَتُهُ ٨٠:", ["الرَّقْمُ ٨ فِي ٨٣", "الرَّقْمُ ٨ فِي ٣٨", "الرَّقْمُ ٣ فِي ٨٣"], "الرَّقْمُ ٨ فِي ٨٣"]]),
    endSlide,
  ],
});
