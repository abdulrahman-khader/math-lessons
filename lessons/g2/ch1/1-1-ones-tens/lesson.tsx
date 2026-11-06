import {
  Blank, BookLabel, Card, Cols, Eq, Lines, Mark, OnesTensCard, QuestionGroup, QuestionSlide, Sentence, SlideHead, TenOnes, WriteBlocksCard, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ١١';
const PRACTICE = 'أتدرَّبُ، ص ١٢';
const FIND = 'أَكْتُبُ الْعَدَدَ:';
const FIND2 = 'أَكْتُبُ عَدَدَ الآحَادِ وَالْعَشَرَاتِ فِيمَا يَأْتِي، ثُمَّ أَكْتُبُ الْعَدَدَ:';
const SOLVE = 'أَحُلُّ الْمَسْأَلَةَ، ص ١٢';

export default defineLesson({
  meta: {
    id: 'g2-1-1-ones-tens',
    design: 'v2',
    code: '١-١',
    title: 'الآحَادُ وَالْعَشَرَاتُ',
    shortTitle: 'الآحاد والعشرات',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الأول: القيمة المنزلية حتى ١٠٠ والأنماط',
    source: 'الجزء الأول، ص ١٠–١٢',
    minutes: 45,
    idea: 'أَجْمَعُ الآحَادَ لِأُكَوِّنَ الْعَشَرَاتِ.',
    bookQuestions: 14,
  },
  sectionDesc: {"engage": "العد", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٧", "practice": "الأسئلة ٨–١٣", "hot": "السؤال ١٤", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَجْمَعُ الآحَادَ لِأُكَوِّنَ الْعَشَرَاتِ.', ["أُكَوِّنُ عَشَرَةً مِنْ ١٠ آحَادٍ.", "أَعُدُّ الآحَادَ وَالْعَشَرَاتِ.", "أَكْتُبُ الْعَدَدَ."], <Mark>الآحَادُ، الْعَشَرَاتُ</Mark>),
    askSlide('engage', 'العد', [["مَا الْعَدَدُ بَعْدَ ٩؟", ["٨", "١٠", "١١"], "١٠"], ["٣ + ٥ = ؟", ["٧", "٨", "٩"], "٨"], ["أَيُّ عَدَدٍ أَكْبَرُ؟", ["٦", "٤", "٢"], "٦"]], 'مراجعة من التهيئة ص ٩.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: ٢٤ تعني ٤ آحاد و٢ عشرات.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٠" kind="rule">أجمّع الآحاد</SlideHead>
          <Cols even>
            <Card kind="ex" cap="أُجَمِّعُ ١٠ آحَادٍ لِأُكَوِّنَ عَشَرَةً وَاحِدَةً">
              <TenOnes values={[10]} />
              <Lines>
                <div className="tenline"><b>١٠</b> آحَادٍ = <Blank v={1} /> عَشَرَةً</div>
                <div className="tenline"><b>٧٠</b> آحَادًا = <Blank v={7} /> عَشَرَاتٍ</div>
                <div className="tenline"><b>٩٠</b> آحَادًا = <Blank v={9} /> عَشَرَاتٍ</div>
              </Lines>
            </Card>
            <Card kind="ex" cap="أُجَمِّعُ آحَادًا وَعَشَرَاتٍ أَيْضًا">
              <TenOnes values={[24]} />
              <Lines>
                <div className="tenline"><b>٢٤</b> آحَادًا = <Blank v={4} /> آحَادٍ وَ<Blank v={2} /> عَشَرَاتٍ</div>
                <Sentence t={[4, '+', 20, '=', { b: 24 }]} />
              </Lines>
            </Card>
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٣٦ ريالًا (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'أعدّ القطع', [["٣٠ آحَادًا =", ["٣ عَشَرَاتٍ", "٣٠ عَشَرَةً", "٣ آحَادٍ"], "٣ عَشَرَاتٍ"], ["٤ عَشَرَاتٍ وَ٢ آحَادٍ =", ["٢٤", "٤٢", "٦"], "٤٢"], ["١٦ =", ["١٠ + ٦", "١٠ + ١", "٦ + ٦"], "١٠ + ٦"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 3,
      notes: 'نبدّل كل ١٠ آحاد بعشرة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={2} time={60}>
          <OnesTensCard n={1} tens={2} />
          <OnesTensCard n={2} tens={5} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 6,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND2} cols={2} time={180}>
          <WriteBlocksCard n={3} v={32} />
          <WriteBlocksCard n={4} v={54} />
          <WriteBlocksCard n={5} v={48} />
          <WriteBlocksCard n={6} v={65} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="أُبَيِّنُ كَيْفَ يَخْتَلِفُ الْعَدَدُ ٢٦ عَنِ الْعَدَدِ ٦٢."
          hint="مَا رَقْمُ الْعَشَرَاتِ فِي كُلِّ عَدَدٍ؟"
          steps={[
            { text: '٢٦: ٢ عَشَرَاتٍ وَ٦ آحَادٍ.' },
            { text: '٦٢: ٦ عَشَرَاتٍ وَ٢ آحَادٍ.' },
            { text: 'تَتَغَيَّرُ قِيمَةُ الرَّقْمِ بِتَغَيُّرِ مَنْزِلَتِهِ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={2} time={60}>
          <OnesTensCard n={8} tens={3} fromTens />
          <OnesTensCard n={9} tens={8} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 6,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND2} cols={2} time={180}>
          <WriteBlocksCard n={10} v={28} />
          <WriteBlocksCard n={11} v={49} />
          <WriteBlocksCard n={12} v={76} />
          <WriteBlocksCard n={13} v={69} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'نقرأ المسألة معًا، ثم نحلها خطوة خطوة.',
      content: (
        <QuestionSlide
          source={SOLVE} n={14} chart={null} time={120}
          question={<><BookLabel>الْحِسُّ الْعَدَدِيُّ:</BookLabel> مَعَ جَمِيلَةَ ٤ أَكْيَاسٍ مِنَ الْبَسْكَوِيتِ، فِي كُلِّ كِيسٍ ١٠ قِطَعٍ. إِذَا كَانَ فِي طَبَقِهَا ٣ قِطَعٍ أُخْرَى، فَكَمْ قِطْعَةَ بَسْكَوِيتٍ مَعَهَا؟</>}
          hint="كَمْ عَشَرَةً فِي الأَكْيَاسِ؟"
          steps={[
            { text: '٤ أَكْيَاسٍ: ٤ عَشَرَاتٍ.' },
            { text: <Eq>٤٠ + ٣ = ٤٣</Eq> },
            { text: '٤٣ قِطْعَةَ بَسْكَوِيتٍ', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>الآحَادُ<br />وَالْعَشَرَاتُ</>, [{"cap": "أُجَمِّعُ", "text": "١٠ آحَادٍ = عَشَرَةٌ وَاحِدَةٌ"}, {"cap": "مِثَالٌ", "text": "٢٤ = ٤ آحَادٍ وَ٢ عَشَرَاتٍ"}, {"cap": "أَكْتُبُ", "text": "٤ + ٢٠ = ٢٤"}, {"cap": "أَنْتَبِهُ", "text": "٢٦ يَخْتَلِفُ عَنْ ٦٢"}]),
    exitSlide('آحاد وعشرات', [["٦٠ آحَادًا =", ["٦ عَشَرَاتٍ", "٦٠ عَشَرَةً", "٦ آحَادٍ"], "٦ عَشَرَاتٍ"], ["٣ عَشَرَاتٍ وَ٥ آحَادٍ =", ["٣٥", "٥٣", "٨"], "٣٥"], ["٧٢ فِيهِ:", ["٧ عَشَرَاتٍ وَ٢ آحَادٍ", "٢ عَشَرَاتٍ وَ٧ آحَادٍ", "٧٢ عَشَرَةً"], "٧ عَشَرَاتٍ وَ٢ آحَادٍ"]]),
    endSlide,
  ],
});
