import {
  BookLabel, Cols, Eq, Mark, PlaceMat, QCol, QText, QuestionSlide, RegroupExplorer, RegroupTable, BookSource, SlideHead, Solution, Step, Ctrls, NextButton, TimerButton,
  askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide, storySlide,
} from '@engine';
import { IntroClip } from './clip';
import { StoryClip } from './story';

const CHECK = 'أتأكَّدُ، ص ١١٨';
const PRACTICE = 'أتدرَّبُ، ص ١١٩';
const FIND = 'أَجِدُ نَاتِجَ الْجَمْعِ مُسْتَعْمِلًا الْقِطَعَ:';

const Rows = ({ source, rows, time }: { source: string; rows: { n: number; a: number; b: number }[]; time: number }) => (
  <>
    <BookSource>{source}</BookSource>
    <QText>{FIND}</QText>
    <RegroupTable rows={rows} />
    <Ctrls><NextButton /><TimerButton sec={time} /></Ctrls>
  </>
);

export default defineLesson({
  meta: {
    id: 'g2-5-5-regroup',
    design: 'v2',
    code: '٥-٥',
    title: 'الْجَمْعُ بِإِعَادَةِ التَّجْمِيعِ',
    shortTitle: 'الجمع بإعادة التجميع',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الخامس: جمع الأعداد المكونة من رقمين',
    source: 'الجزء الأول، ص ١١٨–١١٩',
    minutes: 45,
    idea: 'أَجِدُ نَاتِجَ الْجَمْعِ بِإِعَادَةِ التَّجْمِيعِ.',
    bookQuestions: 10,
  },
  sectionDesc: {
    engage: 'عشرة آحاد',
    explore: 'أعيد التجميع',
    explain: 'أستعد',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٣',
    practice: 'الأسئلة ٤–١٠',
    close: 'ملخص، تذكرة الخروج',
  },
  slides: [
    goalsSlide('أَجِدُ نَاتِجَ الْجَمْعِ بِإِعَادَةِ التَّجْمِيعِ.', ['أَعْرِفُ أَنَّ ١٠ آحَادٍ تُسَاوِي عَشَرَةً وَاحِدَةً.', 'أَعْرِفُ مَتَى أَحْتَاجُ إِلَى إِعَادَةِ التَّجْمِيعِ.', 'أَكْتُبُ نَاتِجَ الْجَمْعِ.'], <Mark>إِعَادَةُ التَّجْمِيعِ</Mark>),
    askSlide('engage', 'عشرة آحاد', [
      ['٧ + ٥ = ؟', ['١١', '١٢', '١٣'], '١٢'],
      ['٨ + ٤ = ؟', ['١٢', '١٣', '١٤'], '١٢'],
      ['كَمْ آحَادًا فِي الْعَشَرَةِ؟', ['١', '٥', '١٠'], '١٠'],
    ], 'نراجع حقائق الجمع التي ناتجها أكبر من ١٠.'),
    storySlide(<StoryClip />, 'شغّل القصة. توقف عند السؤال واسأل: ماذا نفعل بالأقلام السائبة الكثيرة؟'),
    {
      sec: 'explore', min: 4,
      notes: 'مثال جديد غير القصة: معنا ٢٦ ونضيف ٦. بعد كل ضغطة على «نضيف واحدًا» اسأل: هل صارت الآحاد ١٠؟ ثم «نعيد التجميع».',
      content: (
        <>
          <SlideHead tag="نُجَرِّبُ مِثَالًا آخَرَ" kind="ex">نَرْبِطُ عَشَرَةً</SlideHead>
          <RegroupExplorer start={26} addOnes={6} />
        </>
      ),
    },
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا يضيف آحادًا. عندما تبلغ الآحاد ١٠ يضغط «أعيد التجميع». اسأل: هل تغيّر العدد؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">أعيد التجميع</SlideHead>
          <RegroupExplorer start={17} />
        </>
      ),
    },
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: ٧ + ٥ = ١٢ آحادًا، فنستبدل بعشرة آحاد عشرة واحدة.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ١١٨" kind="rule">أجد ناتج الجمع ٢٧ + ٥</SlideHead>
          <Cols>
            <QCol>
              <Solution>
                <Step><BookLabel>الْخُطْوَةُ ١:</BookLabel> نُمَثِّلُ الْعَدَدَ ٢٧ وَالْعَدَدَ ٥.</Step>
                <Step hl={['n0']}><BookLabel>الْخُطْوَةُ ٢:</BookLabel> ١٢ آحَادًا: أَكْثَرُ مِنْ عَشَرَةٍ.</Step>
                <Step hl={['n1']}>نُعِيدُ تَجْمِيعَ ١٠ آحَادٍ إِلَى عَشَرَةٍ وَاحِدَةٍ.</Step>
                <Step><BookLabel>الْخُطْوَةُ ٣:</BookLabel> ٢ آحَادٍ وَ٣ عَشَرَاتٍ.</Step>
                <Step kind="ans" label="نَاتِجُ الْجَمْعِ"><Eq>٢٧ + ٥ = ٣٢</Eq></Step>
              </Solution>
            </QCol>
            <PlaceMat a={27} b={5} big />
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٤٦ + ٧ (مثال غير أمثلة الكتاب). أوقفه قبل إعادة التجميع واسأل: كم آحادًا صارت؟'),
    askSlide('elab', 'هل أعيد التجميع؟', [
      ['٢٤ + ٨: هَلْ نُعِيدُ التَّجْمِيعَ؟', ['نَعَمْ', 'لَا', 'لَا نَعْرِفُ'], 'نَعَمْ'],
      ['٣١ + ٥: هَلْ نُعِيدُ التَّجْمِيعَ؟', ['نَعَمْ', 'لَا', 'لَا نَعْرِفُ'], 'لَا'],
      ['١٠ آحَادٍ تُسَاوِي:', ['١٠ عَشَرَاتٍ', 'عَشَرَةً وَاحِدَةً', '١ آحَادٍ'], 'عَشَرَةً وَاحِدَةً'],
    ], 'نعمل معًا: اختر طالبًا بالعجلة، واطلب منه السبب.'),
    {
      sec: 'check', min: 4,
      notes: 'كل ضغطة خانة: الآحاد، العشرات، نعم أو لا، الناتج.',
      content: <Rows source={CHECK} time={120} rows={[{ n: 1, a: 15, b: 8 }, { n: 2, a: 23, b: 6 }]} />,
    },
    {
      sec: 'check', min: 2,
      notes: 'أتحدث: عندما تبلغ الآحاد ١٠ أو أكثر.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="مَتَى أَحْتَاجُ إِلَى إِعَادَةِ التَّجْمِيعِ؟"
          hint="مَاذَا نَفْعَلُ عِنْدَمَا تَصِيرُ الآحَادُ كَثِيرَةً؟"
          steps={[
            { text: 'نَجْمَعُ الآحَادَ أَوَّلًا.' },
            { text: 'عِنْدَمَا يَكُونُ نَاتِجُ جَمْعِ الآحَادِ ١٠ أَوْ أَكْثَرَ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'أتذكر من الكتاب: ١٠ آحاد تساوي عشرة واحدة.',
      content: <Rows source={PRACTICE} time={150} rows={[{ n: 4, a: 76, b: 4 }, { n: 5, a: 32, b: 6 }, { n: 6, a: 59, b: 5 }]} />,
    },
    {
      sec: 'practice', min: 5,
      notes: 'اسأل قبل «نعم أو لا»: كم آحادًا عندنا؟',
      content: <Rows source={PRACTICE} time={150} rows={[{ n: 7, a: 13, b: 9 }, { n: 8, a: 31, b: 8 }, { n: 9, a: 25, b: 6 }]} />,
    },
    {
      sec: 'practice', min: 3,
      notes: 'أكتب: ٣٨ + ٨ = ٤٦، وهو أكبر من ٤٠.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={10} tags={[{ kind: 'warn', text: 'أَكْتُبُ' }]} chart={null}
          question="إِذَا أَضَفْتُ ٨ إِلَى ٣٨، فَهَلْ يَكُونُ نَاتِجُ الْجَمْعِ أَصْغَرَ مِنْ ٤٠ أَمْ أَكْبَرَ؟ أُوَضِّحُ إِجَابَتِي."
          hint="كَمْ يَنْقُصُ ٣٨ لِيَصِلَ إِلَى ٤٠؟"
          steps={[
            { text: <Eq>٣٨ + ٨ = ٤٦</Eq> },
            { text: '٤٦ أَكْبَرُ مِنْ ٤٠.' },
            { text: 'أَكْبَرَ', kind: 'ans' },
          ]}
        />
      ),
    },
    mindSlide(<>إِعَادَةُ<br />التَّجْمِيعِ</>, [
      { cap: 'مَتَى؟', text: 'الآحَادُ ١٠ أَوْ أَكْثَرُ' },
      { cap: 'كَيْفَ؟', text: '١٠ آحَادٍ تُسَاوِي عَشَرَةً وَاحِدَةً' },
      { cap: 'مِثَالٌ', text: '٢٧ + ٥ = ٣٢' },
      { cap: 'أَنْتَبِهُ', text: 'الْعَدَدُ لَا يَتَغَيَّرُ' },
    ]),
    exitSlide('أعيد التجميع', [
      ['١٠ آحَادٍ =', ['عَشَرَةٌ وَاحِدَةٌ', '١٠ عَشَرَاتٍ', '٠'], 'عَشَرَةٌ وَاحِدَةٌ'],
      ['٣٦ + ٧ = ؟', ['٤٣', '٣٣', '٤٦'], '٤٣'],
      ['أَيُّهَا يَحْتَاجُ إِلَى إِعَادَةِ التَّجْمِيعِ؟', ['٤٢ + ٥', '٤٨ + ٥', '٤٠ + ٥'], '٤٨ + ٥'],
    ]),
    endSlide,
  ],
});
