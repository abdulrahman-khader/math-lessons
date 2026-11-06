import {
  BookLabel, Cols, DataTable, QText, QuestionGroup, QuestionSlide, SlideHead, TenOnes, WordNumCard, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ١٧';
const PRACTICE = 'أتدرَّبُ، ص ١٨';
const FIND = 'أَكْتُبُ الأَعْدَادَ الآتِيَةَ بِالأَرْقَامِ أَوِ الْكَلِمَاتِ:';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ١٨';

export default defineLesson({
  meta: {
    id: 'g2-1-4-read-write-numbers',
    design: 'v2',
    code: '١-٤',
    title: 'قِرَاءَةُ الأَعْدَادِ وَكِتَابَتُهَا',
    shortTitle: 'قراءة الأعداد وكتابتها',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الأول: القيمة المنزلية حتى ١٠٠ والأنماط',
    source: 'الجزء الأول، ص ١٧–١٨',
    minutes: 45,
    idea: 'أَقْرَأُ الأَعْدَادَ حَتَّى ١٠٠ وَأَكْتُبُهَا.',
    bookQuestions: 23,
  },
  sectionDesc: {"engage": "نتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٧", "practice": "الأسئلة ٨–٢٢", "hot": "السؤال ٢٣", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَقْرَأُ الأَعْدَادَ حَتَّى ١٠٠ وَأَكْتُبُهَا.', ["أَكْتُبُ الْعَدَدَ بِالْكَلِمَاتِ.", "أَكْتُبُ الْعَدَدَ بِالأَرْقَامِ.", "أَعْرِفُ الْعَشَرَاتِ حَتَّى مِئَةٍ."]),
    askSlide('engage', 'نتذكر', [["٤ عَشَرَاتٍ =", ["٤٠", "١٤", "٤"], "٤٠"], ["خَمْسَةٌ =", ["٥", "٥٠", "١٥"], "٥"], ["٣٠ + ٦ = ؟", ["٣٦", "٦٣", "٩"], "٣٦"]], 'نراجع الآحاد والعشرات.'),
    {
      sec: 'explain', min: 5,
      notes: 'اقرأ الجدول مع الطلاب بصوت واحد.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٧" kind="rule">أكتب الأعداد بالكلمات</SlideHead>
          <QText>أَكْتُبُ الْعَدَدَ ١٦ بِالْكَلِمَاتِ هَكَذَا: سِتَّةَ عَشَرَ.</QText>
          <Cols even>
            <DataTable rows={[['١١', 'أَحَدَ عَشَرَ'], ['١٢', 'اثْنَا عَشَرَ'], ['١٣', 'ثَلَاثَةَ عَشَرَ'], ['١٤', 'أَرْبَعَةَ عَشَرَ'], ['١٥', 'خَمْسَةَ عَشَرَ'], ['١٦', 'سِتَّةَ عَشَرَ']]} />
            <DataTable rows={[['٢٠', 'عِشْرُونَ'], ['٣٠', 'ثَلَاثُونَ'], ['٤٠', 'أَرْبَعُونَ'], ['٥٠', 'خَمْسُونَ'], ['٦٠', 'سِتُّونَ'], ['١٠٠', 'مِئَةٌ']]} />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: سبعة وعشرون (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أقرأ العدد', [["ثَمَانِيَةٌ وَخَمْسُونَ =", ["٥٨", "٨٥", "١٣"], "٥٨"], ["٤٦ =", ["سِتَّةٌ وَأَرْبَعُونَ", "أَرْبَعَةٌ وَسِتُّونَ", "عَشَرَةٌ"], "سِتَّةٌ وَأَرْبَعُونَ"], ["تِسْعُونَ =", ["٩", "٩٠", "١٩"], "٩٠"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={120}>
          <WordNumCard n={1} show="خَمْسَةٌ وَثَلَاثُونَ" ans={35} />
          <WordNumCard n={2} show="سَبْعُونَ" ans={70} />
          <WordNumCard n={3} show="ثَلَاثَةٌ وَسِتُّونَ" ans={63} />
          <WordNumCard n={4} show="وَاحِدٌ وَأَرْبَعُونَ" ans={41} />
          <WordNumCard n={5} show="١٤" ans={'أَرْبَعَةَ عَشَرَ'} />
          <WordNumCard n={6} show="٨٠" ans={'ثَمَانُونَ'} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ أُحَدِّدُ الأَرْقَامَ الَّتِي أَسْتَعْمِلُهَا عِنْدَ كِتَابَةِ الْعَدَدِ ثَلَاثَةٌ وَعِشْرُونَ؟"
          hint="أَيُّ الْكَلِمَتَيْنِ تَدُلُّ عَلَى الْعَشَرَاتِ؟"
          steps={[
            { text: 'عِشْرُونَ: ٢ عَشَرَاتٍ.' },
            { text: 'ثَلَاثَةٌ: ٣ آحَادٍ.' },
            { text: 'أَكْتُبُ ٢ ثُمَّ ٣، فَيَكُونُ الْعَدَدُ ٢٣.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <WordNumCard n={8} show="أَحَدَ عَشَرَ" ans={11} />
          <WordNumCard n={9} show="اثْنَانِ وَسَبْعُونَ" ans={72} />
          <WordNumCard n={10} show="ثَمَانُونَ" ans={80} />
          <WordNumCard n={11} show="مِئَةٌ" ans={100} />
          <WordNumCard n={12} show="سَبْعَةٌ" ans={7} />
          <WordNumCard n={13} show="ثَمَانِيَةٌ وَسِتُّونَ" ans={68} />
          <WordNumCard n={14} show="أَرْبَعَةَ عَشَرَ" ans={14} />
          <WordNumCard n={15} show="سِتَّةٌ وَثَمَانُونَ" ans={86} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={4} time={150}>
          <WordNumCard n={16} show="اثْنَانِ وَعِشْرُونَ" ans={22} />
          <WordNumCard n={17} show="سَبْعَةٌ وَسَبْعُونَ" ans={77} />
          <WordNumCard n={18} show="أَرْبَعَةٌ وَتِسْعُونَ" ans={94} />
          <WordNumCard n={19} show="وَاحِدٌ وَسِتُّونَ" ans={61} />
          <WordNumCard n={20} show="١٥" ans={'خَمْسَةَ عَشَرَ'} />
          <WordNumCard n={21} show="٧٠" ans={'سَبْعُونَ'} />
          <WordNumCard n={22} show="٤٠" ans={'أَرْبَعُونَ'} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={HOT} n={23} chart={<TenOnes values={[92]} />} time={120}
          question={<><BookLabel>التَّفْكِيرُ الرِّيَاضِيُّ:</BookLabel> النَّمُوذَجُ الآتِي يُمَثِّلُ عَدَدًا، أَكْتُبُهُ بِطَرِيقَتَيْنِ.</>}
          hint="كَمْ عَشَرَةً؟ وَكَمْ آحَادًا؟"
          steps={[
            { text: '٩ عَشَرَاتٍ وَ٢ آحَادٍ.' },
            { text: '٩٢', kind: 'ans', label: 'بِالأَرْقَامِ' },
            { text: 'اثْنَانِ وَتِسْعُونَ', kind: 'ans', label: 'بِالْكَلِمَاتِ' },
          ]}
        />
      ),
    },
    mindSlide(<>قِرَاءَةُ الأَعْدَادِ<br />وَكِتَابَتُهَا</>, [{"cap": "بِالأَرْقَامِ", "text": "٣٥"}, {"cap": "بِالْكَلِمَاتِ", "text": "خَمْسَةٌ وَثَلَاثُونَ"}, {"cap": "الْعَشَرَاتُ", "text": "عِشْرُونَ، ثَلَاثُونَ، أَرْبَعُونَ…"}, {"cap": "أَنْتَبِهُ", "text": "نَقْرَأُ الآحَادَ أَوَّلًا"}]),
    exitSlide('أكتب العدد', [["سِتُّونَ =", ["٦٠", "٦", "١٦"], "٦٠"], ["ثَلَاثَةٌ وَتِسْعُونَ =", ["٩٣", "٣٩", "١٢"], "٩٣"], ["٢٧ =", ["سَبْعَةٌ وَعِشْرُونَ", "اثْنَانِ وَسَبْعُونَ", "تِسْعَةٌ"], "سَبْعَةٌ وَعِشْرُونَ"]]),
    endSlide,
  ],
});
