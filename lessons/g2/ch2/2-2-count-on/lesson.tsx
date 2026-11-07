import {
  LineBox, Lines, Mark, NumberLine, QText, QuestionGroup, QuestionSlide, Sentence, SentenceCard, SlideHead, Step, SumCard, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ٤٠';
const PRACTICE = 'أتدرَّبُ، ص ٤١';
const FIND = 'أَعُدُّ تَصَاعُدِيًّا لِأَجِدَ نَاتِجَ الْجَمْعِ مُسْتَعِينًا بِخَطِّ الأَعْدَادِ:';
const FACTS = 'أَتَذَكَّرُ حَقَائِقَ الْجَمْعِ، وَأَجِدُ نَاتِجَ الْجَمْعِ بِسُرْعَةٍ:';

export default defineLesson({
  meta: {
    id: 'g2-2-2-count-on',
    design: 'v2',
    code: '٢-٢',
    title: 'الْجَمْعُ بِالْعَدِّ التَّصَاعُدِيِّ',
    shortTitle: 'الجمع بالعد التصاعدي',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثاني: طرائق الجمع',
    source: 'الجزء الأول، ص ٤٠–٤١',
    minutes: 45,
    idea: 'أَجْمَعُ بِالْعَدِّ التَّصَاعُدِيِّ عَلَى خَطِّ الأَعْدَادِ.',
    bookQuestions: 25,
  },
  sectionDesc: {"engage": "نتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–١٠", "practice": "الأسئلة ١١–٢٥", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَجْمَعُ بِالْعَدِّ التَّصَاعُدِيِّ عَلَى خَطِّ الأَعْدَادِ.', ["أَبْدَأُ بِالْعَدَدِ الأَكْبَرِ.", "أَعُدُّ تَصَاعُدِيًّا.", "أَكْتُبُ نَاتِجَ الْجَمْعِ."], <Mark>الْعَدُّ التَّصَاعُدِيُّ</Mark>),
    askSlide('engage', 'نتذكر', [["مَا الْعَدَدُ الأَكْبَرُ؟", ["٣", "٧", "٥"], "٧"], ["بَعْدَ ٩:", ["٨", "١٠", "١١"], "١٠"], ["٥ + ٠ = ؟", ["٠", "٥", "٦"], "٥"]], 'ربط بالدرس ٢-١.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: أقفز بإصبعي من ٧: ٨، ٩، ١٠.',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ٤٠" kind="rule">أعدّ تصاعديًّا</SlideHead>
          <QText>أَسْتَعْمِلُ خَطَّ الأَعْدَادِ، وَأَعُدُّ تَصَاعُدِيًّا لِأَجِدَ نَاتِجَ الْجَمْعِ.</QText>
          <LineBox small><NumberLine max={12} /></LineBox>
          <Step>أَجِدُ النَّاتِجَ ٣ + ٧، أَبْدَأُ بِالْعَدَدِ الأَكْبَرِ ٧ ثُمَّ أَعُدُّ ٣ تَصَاعُدِيًّا.</Step>
          <Lines><Sentence t={[3, '+', 7, '=', { b: 10 }]} /><Sentence t={[{ b: 10 }, '=', 7, '+', 3]} /></Lines>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٢ + ٨ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'من أين أبدأ؟', [["٢ + ٩: نَبْدَأُ بِالْعَدَدِ", ["٩", "٢", "٠"], "٩"], ["١ + ٦ = ؟", ["٦", "٧", "٨"], "٧"], ["٣ + ٨ = ؟", ["١٠", "١١", "١٢"], "١١"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 6,
      notes: 'أفكر من الكتاب: أبدأ بالعدد الأكبر.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND} cols={3} time={180} above={<LineBox small><NumberLine max={12} /></LineBox>}>
          <SentenceCard n={1} lines={[[6, '+', 3, '=', { b: 9 }]]} />
          <SentenceCard n={2} lines={[[4, '+', 2, '=', { b: 6 }]]} />
          <SentenceCard n={3} lines={[[5, '+', 3, '=', { b: 8 }]]} />
          <SentenceCard n={4} lines={[[2, '+', 9, '=', { b: 11 }]]} />
          <SentenceCard n={5} lines={[[1, '+', 3, '=', { b: 4 }]]} />
          <SentenceCard n={6} lines={[[2, '+', 6, '=', { b: 8 }]]} />
          <SentenceCard n={7} lines={[[{ b: 9 }, '=', 2, '+', 7]]} />
          <SentenceCard n={8} lines={[[{ b: 7 }, '=', 4, '+', 3]]} />
          <SentenceCard n={9} lines={[[{ b: 10 }, '=', 9, '+', 1]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={10} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="كَيْفَ أَسْتَفِيدُ مِنَ الْعَدِّ التَّصَاعُدِيِّ لِأَجْمَعَ؟"
          hint="بِأَيِّ عَدَدٍ نَبْدَأُ؟"
          steps={[
            { text: 'أَبْدَأُ بِالْعَدَدِ الأَكْبَرِ.' },
            { text: 'أَعُدُّ تَصَاعُدِيًّا بِمِقْدَارِ الْعَدَدِ الأَصْغَرِ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'أتذكر من الكتاب: أبدأ بالعدد الأكبر، وأعدّ تصاعديًّا لأجمع.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={150} above={<LineBox small><NumberLine max={12} /></LineBox>}>
          <SentenceCard n={11} lines={[[{ b: 7 }, '=', 5, '+', 2]]} />
          <SentenceCard n={12} lines={[[7, '+', 1, '=', { b: 8 }]]} />
          <SentenceCard n={13} lines={[[3, '+', 8, '=', { b: 11 }]]} />
          <SentenceCard n={14} lines={[[6, '+', 1, '=', { b: 7 }]]} />
          <SentenceCard n={15} lines={[[{ b: 7 }, '=', 3, '+', 4]]} />
          <SentenceCard n={16} lines={[[2, '+', 8, '=', { b: 10 }]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 4,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FACTS} cols={4} time={120}>
          <SumCard n={17} sums={[{ a: 2, op: '+', b: 7, v: 9 }]} />
          <SumCard n={18} sums={[{ a: 3, op: '+', b: 2, v: 5 }]} />
          <SumCard n={19} sums={[{ a: 5, op: '+', b: 1, v: 6 }]} />
          <SumCard n={20} sums={[{ a: 3, op: '+', b: 6, v: 9 }]} />
          <SumCard n={21} sums={[{ a: 1, op: '+', b: 4, v: 5 }]} />
          <SumCard n={22} sums={[{ a: 3, op: '+', b: 1, v: 4 }]} />
          <SumCard n={23} sums={[{ a: 2, op: '+', b: 6, v: 8 }]} />
          <SumCard n={24} sums={[{ a: 9, op: '+', b: 2, v: 11 }]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={25} tags={[{ kind: 'warn', text: 'أَكْتُبُ' }]} chart={null}
          question="أُبَيِّنُ لِمَاذَا أَبْدَأُ بِالْعَدَدِ الأَكْبَرِ عِنْدَمَا أَجْمَعُ بِالْعَدِّ التَّصَاعُدِيِّ."
          hint="كَمْ قَفْزَةً نَقْفِزُ فِي كُلِّ حَالَةٍ؟"
          steps={[
            { text: 'مِنَ الأَكْبَرِ نَقْفِزُ قَفَزَاتٍ أَقَلَّ.' },
            { text: 'لِأَعُدَّ خُطُوَاتٍ أَقَلَّ، فَأَصِلَ إِلَى النَّاتِجِ أَسْرَعَ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    mindSlide(<>الْعَدُّ<br />التَّصَاعُدِيُّ</>, [{"cap": "أَبْدَأُ", "text": "بِالْعَدَدِ الأَكْبَرِ"}, {"cap": "أَعُدُّ", "text": "بِمِقْدَارِ الْعَدَدِ الأَصْغَرِ"}, {"cap": "مِثَالٌ", "text": "٣ + ٧ = ١٠"}, {"cap": "أَسْتَعْمِلُ", "text": "خَطَّ الأَعْدَادِ"}]),
    exitSlide('أعدّ تصاعديًّا', [["٢ + ٦ = ؟", ["٨", "٧", "٩"], "٨"], ["٩ + ٣ = ؟", ["١٢", "١١", "١٠"], "١٢"], ["٤ + ٨: نَبْدَأُ بِالْعَدَدِ", ["٨", "٤", "١٢"], "٨"]]),
    endSlide,
  ],
});
