import {
  Card, Cols, Domino, Lines, Mark, QCard, QuestionGroup, QuestionSlide, Sentence, SentenceCard, SlideHead, Step, SumCard, VSum, askSlide, clipSlide, defineLesson, endSlide, exitSlide, goalsSlide, mindSlide,
} from '@engine';
import { IntroClip } from './clip';

const CHECK = 'أتأكَّدُ، ص ٣٨';
const PRACTICE = 'أتدرَّبُ، ص ٣٩';
const FIND = 'أَسْتَعْمِلُ قِطَعَ الْعَدِّ لِأَجِدَ نَاتِجَ الْجَمْعِ:';
const FIND1 = 'أَجِدُ نَاتِجَ الْجَمْعِ:';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا، ص ٣٩';
const ALG = 'الْجَبْرُ: أَكْتُبُ الْعَدَدَ الْمَفْقُودَ:';

export default defineLesson({
  meta: {
    id: 'g2-2-1-addition-properties',
    design: 'v2',
    code: '٢-١',
    title: 'خَصَائِصُ الْجَمْعِ',
    shortTitle: 'خصائص الجمع',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الثاني: طرائق الجمع',
    source: 'الجزء الأول، ص ٣٨–٣٩',
    minutes: 45,
    idea: 'أَجْمَعُ الأَعْدَادَ بِأَيِّ تَرْتِيبٍ، وَأَجْمَعُ الصِّفْرَ إِلَى أَيِّ عَدَدٍ آخَرَ.',
    bookQuestions: 17,
  },
  sectionDesc: {"engage": "نتذكر", "explain": "أستعد", "elab": "نعمل معًا", "check": "الأسئلة ١–٥", "practice": "الأسئلة ٦–١٣", "hot": "الأسئلة ١٤–١٧", "close": "ملخص، تذكرة الخروج"},
  slides: [
    goalsSlide('أَجْمَعُ الأَعْدَادَ بِأَيِّ تَرْتِيبٍ، وَأَجْمَعُ الصِّفْرَ إِلَى أَيِّ عَدَدٍ آخَرَ.', ["أَعْرِفُ الْعَدَدَيْنِ الْمُضَافَيْنِ وَنَاتِجَ الْجَمْعِ.", "أُغَيِّرُ تَرْتِيبَ الْعَدَدَيْنِ.", "أَجْمَعُ الصِّفْرَ."], <Mark>أَجْمَعُ، نَاتِجُ الْجَمْعِ، الأَعْدَادُ الْمُضَافَةُ</Mark>),
    askSlide('engage', 'نتذكر', [["٢ + ٣ = ؟", ["٤", "٥", "٦"], "٥"], ["٤ + ١ = ؟", ["٣", "٥", "٦"], "٥"], ["٦ + ٢ = ؟", ["٧", "٨", "٩"], "٨"]], 'مراجعة حقائق الجمع.'),
    {
      sec: 'explain', min: 5,
      notes: 'أنا أعمل: أقارن بين الإجابتين. ماذا ألاحظ؟',
      content: (
        <>
          <SlideHead tag="أستعدُّ، ص ٣٨" kind="rule">تغيير الترتيب</SlideHead>
          <Cols even>
            <Card kind="ex" cap="خَاصِّيَّةُ الإِبْدَالِ">
              <Domino known={3} missing={5} show />
              <Lines><Sentence t={[3, '+', 5, '=', { b: 8 }]} /><Sentence t={[5, '+', 3, '=', { b: 8 }]} /></Lines>
              <Step>لَا يَتَأَثَّرُ نَاتِجُ جَمْعِ عَدَدَيْنِ بِتَغَيُّرِ تَرْتِيبِهِمَا.</Step>
            </Card>
            <Card kind="ex" cap="جَمْعُ الصِّفْرِ">
              <Domino known={5} missing={0} show />
              <Lines><Sentence t={[5, '+', 0, '=', { b: 5 }]} /></Lines>
              <Step>نَاتِجُ جَمْعِ صِفْرٍ إِلَى أَيِّ عَدَدٍ يُسَاوِي ذَلِكَ الْعَدَدَ دَائِمًا.</Step>
            </Card>
          </Cols>
        </>
      ),
    },
    clipSlide(<IntroClip />, 'المقطع: ٦ تفاحات و٢ (مثال غير أمثلة الكتاب).'),
    askSlide('elab', 'هل يتغير الناتج؟', [["٢ + ٧ = ٩، إِذَنْ ٧ + ٢ =", ["٩", "٥", "٧"], "٩"], ["٨ + ٠ = ؟", ["٠", "٨", "٩"], "٨"], ["٠ + ٣ = ؟", ["٠", "٣", "٤"], "٣"]], 'نعمل معًا: اختر طالبًا بالعجلة.'),
    {
      sec: 'check', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND1} cols={2} time={60}>
          <QCard n={1} className="tenscard"><Domino known={3} missing={4} show /><Sentence t={[4, '+', 3, '=', { b: 7 }]} /><Sentence t={[3, '+', 4, '=', { b: 7 }]} /></QCard>
          <QCard n={2} className="tenscard"><Domino known={0} missing={6} show /><Sentence t={[6, '+', 0, '=', { b: 6 }]} /><Sentence t={[0, '+', 6, '=', { b: 6 }]} /></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={CHECK} instruction={FIND1} cols={2} time={60}>
          <QCard n={3} className="tenscard"><Domino known={2} missing={4} show /><div className="vrow"><VSum a={2} op="+" b={4} v={6} /><VSum a={4} op="+" b={2} v={6} /></div></QCard>
          <QCard n={4} className="tenscard"><Domino known={5} missing={2} show /><div className="vrow"><VSum a={2} op="+" b={5} v={7} /><VSum a={5} op="+" b={2} v={7} /></div></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'اطلب من طالبين أن يشرحا بكلماتهما.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]} chart={null}
          question="لِمَاذَا يَكُونُ نَاتِجُ جَمْعِ (٢ + ٣) يُسَاوِي نَاتِجَ جَمْعِ (٣ + ٢)؟"
          hint="مَاذَا تَغَيَّرَ فِي الْجُمْلَتَيْنِ؟"
          steps={[
            { text: 'الْعَدَدَانِ نَفْسُهُمَا، وَالتَّرْتِيبُ مُخْتَلِفٌ.' },
            { text: 'تَغْيِيرُ تَرْتِيبِ الْعَدَدَيْنِ لَا يُغَيِّرُ نَاتِجَ الْجَمْعِ.', kind: 'ans', label: 'إِجَابَةٌ مُقْتَرَحَةٌ' },
          ]}
        />
      ),
    },
    {
      sec: 'practice', min: 3,
      notes: 'أتذكر من الكتاب: عندما أغير ترتيب الأعداد فإن ناتج الجمع لا يتغير.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={2} time={60}>
          <QCard n={6} className="tenscard"><Domino known={1} missing={5} show /><Sentence t={[5, '+', 1, '=', { b: 6 }]} /><Sentence t={[1, '+', 5, '=', { b: 6 }]} /></QCard>
          <QCard n={7} className="tenscard"><Domino known={5} missing={4} show /><div className="vrow"><VSum a={5} op="+" b={4} v={9} /><VSum a={4} op="+" b={5} v={9} /></div></QCard>
        </QuestionGroup>
      ),
    },
    {
      sec: 'practice', min: 5,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={PRACTICE} instruction={FIND} cols={3} time={150}>
          <SumCard n={8} sums={[{ a: 6, op: '+', b: 3, v: 9 }, { a: 3, op: '+', b: 6, v: 9 }]} />
          <SumCard n={9} sums={[{ a: 0, op: '+', b: 3, v: 3 }, { a: 3, op: '+', b: 0, v: 3 }]} />
          <SumCard n={10} sums={[{ a: 7, op: '+', b: 1, v: 8 }, { a: 1, op: '+', b: 7, v: 8 }]} />
          <SentenceCard n={11} lines={[[6, '+', 2, '=', { b: 8 }], [2, '+', 6, '=', { b: 8 }]]} />
          <SentenceCard n={12} lines={[[0, '+', 9, '=', { b: 9 }], [9, '+', 0, '=', { b: 9 }]]} />
          <SentenceCard n={13} lines={[[8, '+', 1, '=', { b: 9 }], [1, '+', 8, '=', { b: 9 }]]} />
        </QuestionGroup>
      ),
    },
    {
      sec: 'hot', min: 3,
      notes: 'كل ضغطة خانة.',
      content: (
        <QuestionGroup source={HOT} instruction={ALG} cols={2} time={90}>
          <SentenceCard n={14} lines={[[4, '+', { b: 3, box: true }, '=', 3, '+', 4]]} />
          <SentenceCard n={15} lines={[[1, '+', 6, '=', 6, '+', { b: 1, box: true }]]} />
          <SentenceCard n={16} lines={[[7, '+', 2, '=', { b: 2, box: true }, '+', 7]]} />
          <SentenceCard n={17} lines={[[{ b: 0, box: true }, '+', 5, '=', 5, '+', 0]]} />
        </QuestionGroup>
      ),
    },
    mindSlide(<>خَصَائِصُ<br />الْجَمْعِ</>, [{"cap": "الإِبْدَالُ", "text": "٣ + ٥ = ٥ + ٣"}, {"cap": "الصِّفْرُ", "text": "٥ + ٠ = ٥"}, {"cap": "الْمُضَافَانِ", "text": "الْعَدَدَانِ اللَّذَانِ أَجْمَعُهُمَا"}, {"cap": "النَّاتِجُ", "text": "لَا يَتَغَيَّرُ بِتَغَيُّرِ التَّرْتِيبِ"}]),
    exitSlide('خصائص الجمع', [["٤ + ٠ = ؟", ["٤", "٠", "٥"], "٤"], ["٦ + ٣ = ٩، إِذَنْ ٣ + ٦ =", ["٩", "٣", "٦"], "٩"], ["٥ + ؟ = ٢ + ٥", ["٢", "٥", "٧"], "٢"]]),
    endSlide,
  ],
});
