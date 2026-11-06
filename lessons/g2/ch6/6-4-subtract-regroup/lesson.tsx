import {
  BookLabel, BookSource, Cols, Ctrls, Eq, Mark, NextButton, QCol, QText, QuestionSlide, RegroupExplorer, SlideHead, Solution, Step, SubMat, SubRegroupTable, TimerButton, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ١٤٤';
const PRACTICE = 'أتدرَّبُ، ص ١٤٥';
const FIND = 'أَجِدُ نَاتِجَ الطَّرْحِ مُسْتَعْمِلًا الْقِطَعَ:';

const Rows = ({ source, rows, time }: { source: string; rows: { n: number; a: number; b: number }[]; time: number }) => (
  <>
    <BookSource>{source}</BookSource>
    <QText>{FIND}</QText>
    <SubRegroupTable rows={rows} />
    <Ctrls><NextButton /><TimerButton sec={time} /></Ctrls>
  </>
);

export default defineLesson({
  meta: {
    id: 'g2-6-4-subtract-regroup',
    design: 'v2',
    code: '٦-٤',
    title: 'الطَّرْحُ بِإِعَادَةِ التَّجْمِيعِ',
    shortTitle: 'الطرح بإعادة التجميع',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل السادس: طرح الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١٤٤–١٤٥',
    minutes: 45,
    idea: 'أَجِدُ نَاتِجَ الطَّرْحِ بِإِعَادَةِ التَّجْمِيعِ.',
    bookQuestions: 10,
  },
  sectionDesc: {"engage": "عشرة آحاد", "explore": "أفك عشرة", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٣", "practice": "الأسئلة ٤–١٠", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَجِدُ نَاتِجَ الطَّرْحِ بِإِعَادَةِ التَّجْمِيعِ.', ["أَعْرِفُ مَتَى لَا تَكْفِي الآحَادُ.", "أُعِيدُ تَجْمِيعَ عَشَرَةٍ إِلَى ١٠ آحَادٍ.", "أَكْتُبُ نَاتِجَ الطَّرْحِ."], <Mark>إِعَادَةُ التَّجْمِيعِ</Mark>),
    askSlide('engage', 'عشرة آحاد', [["عَشَرَةٌ وَاحِدَةٌ تُسَاوِي:", ["١٠ آحَادٍ", "٥ آحَادٍ", "١ آحَادٍ"], "١٠ آحَادٍ"], ["١٤ − ٨ = ؟", ["٥", "٦", "٧"], "٦"], ["١٢ − ٥ = ؟", ["٧", "٨", "٦"], "٧"]], 'مراجعة حقائق الطرح من ١٠ وما فوقها.'),
    {
      sec: 'explore', min: 4,
      notes: 'ادعُ طالبًا يطرح آحادًا. اسأل: هل تكفي؟ عندما لا تكفي، نفك عشرة.',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">أفك عشرة</SlideHead>
          <RegroupExplorer start={24} open />
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: ٤ آحاد لا تكفي لطرح ٨، فنفك عشرة إلى ١٠ آحاد.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١٤٤" kind="rule">أجد ناتج الطرح ٢٤ − ٨</SlideHead>
          <Cols>
            <QCol>
              <Solution>
                <Step><BookLabel>الْخُطْوَةُ ١:</BookLabel> ٤ آحَادٍ وَ٢ عَشَرَاتٍ.</Step>
                <Step hl={['n0']}><BookLabel>الْخُطْوَةُ ٢:</BookLabel> الآحَادُ لَا تَكْفِي، فَنُعِيدُ التَّجْمِيعَ: ١٤ آحَادًا وَ١ عَشَرَاتٍ.</Step>
                <Step hl={['n1']}><BookLabel>الْخُطْوَةُ ٣:</BookLabel> نَطْرَحُ ٨ آحَادٍ: ٦ آحَادٍ وَ١ عَشَرَاتٍ.</Step>
                <Step kind="ans" label="نَاتِجُ الطَّرْحِ"><Eq>٢٤ − ٨ = ١٦</Eq></Step>
              </Solution>
            </QCol>
            <SubMat a={24} b={8} big />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٥٣ − ٧ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'هل أعيد التجميع؟', [["٣٢ − ٧: هَلْ نُعِيدُ التَّجْمِيعَ؟", ["نَعَمْ", "لَا", "لَا نَعْرِفُ"], "نَعَمْ"], ["٣٨ − ٧: هَلْ نُعِيدُ التَّجْمِيعَ؟", ["نَعَمْ", "لَا", "لَا نَعْرِفُ"], "لَا"], ["٣٢ − ٧ = ؟", ["٢٥", "٣٥", "٢٤"], "٢٥"]], 'نعمل معًا: اختر طالبًا بالعجلة، واطلب السبب.'),
    {
      sec: 'check', min: 3,
      notes: 'كل ضغطة: نعم أو لا، ثم الناتج.',
      content: <Rows source={CHECK} time={90} rows={[{ n: 1, a: 31, b: 4 }, { n: 2, a: 27, b: 5 }]} />,
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="مَتَى أَحْتَاجُ إِلَى إِعَادَةِ التَّجْمِيعِ؟"
          hint="مَاذَا نَفْعَلُ عِنْدَمَا لَا تَكْفِي الآحَادُ؟"
          steps={[
            { text: 'نَنْظُرُ إِلَى الآحَادِ أَوَّلًا.' },
            { text: 'عِنْدَمَا يَكُونُ عَدَدُ الآحَادِ غَيْرَ كَافٍ لِلطَّرْحِ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'أتذكر من الكتاب: إذا لم تكن الآحاد كافية، أعيد تجميع عشرة إلى ١٠ آحاد.',
      content: <Rows source={PRACTICE} time={120} rows={[{ n: 4, a: 42, b: 6 }, { n: 5, a: 35, b: 9 }, { n: 6, a: 40, b: 8 }]} />,
    },
    {
      sec: 'practice', min: 4,
      notes: 'اسأل قبل «نعم أو لا»: هل تكفي الآحاد؟',
      content: <Rows source={PRACTICE} time={120} rows={[{ n: 7, a: 56, b: 5 }, { n: 8, a: 22, b: 6 }, { n: 9, a: 43, b: 3 }]} />,
    },
    {
      sec: 'practice', min: 2,
      notes: 'أكتب: ٢٣ − ٥ = ١٨.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={10} tags={[{ kind: 'warn', text: 'أَكْتُبُ' }]} chart={null}
          question="إِذَا طَرَحْتُ ٥ مِنْ ٢٣، فَهَلْ يَكُونُ نَاتِجُ الطَّرْحِ أَصْغَرَ مِنْ ٢٠ أَمْ أَكْبَرَ؟ أُوَضِّحُ ذَلِكَ."
          hint="كَمْ يَبْقَى لَوْ طَرَحْنَا ٣ فَقَطْ؟"
          steps={[
            { text: <Eq>٢٣ − ٥ = ١٨</Eq> },
            { text: '١٨ أَصْغَرُ مِنْ ٢٠.' },
            { text: 'أَصْغَرَ', kind: 'ans', label: 'النَّاتِجُ' },
          ]}
        />
      ),
    },
    mindSlide(<>الطَّرْحُ بِإِعَادَةِ<br />التَّجْمِيعِ</>, [{"cap": "مَتَى؟", "text": "الآحَادُ لَا تَكْفِي"}, {"cap": "كَيْفَ؟", "text": "عَشَرَةٌ وَاحِدَةٌ تَصِيرُ ١٠ آحَادٍ"}, {"cap": "مِثَالٌ", "text": "٢٤ − ٨ = ١٦"}, {"cap": "أَنْتَبِهُ", "text": "تَنْقُصُ الْعَشَرَاتُ وَاحِدَةً"}]),
    exitSlide('أطرح وأعيد التجميع', [["عَشَرَةٌ وَاحِدَةٌ =", ["١٠ آحَادٍ", "١ آحَادٍ", "٠"], "١٠ آحَادٍ"], ["٣٤ − ٦ = ؟", ["٢٨", "٣٢", "٣٨"], "٢٨"], ["أَيُّهَا يَحْتَاجُ إِلَى إِعَادَةِ التَّجْمِيعِ؟", ["٤٥ − ٢", "٤٢ − ٥", "٤٧ − ٧"], "٤٢ − ٥"]]),
    endSlide,
  ],
});
