import { useState } from 'react';
import {
  Bag, Card, Cols, Ctrls, DataGrid, Eq, GoHomeButton, HBars, IfTeams, MCQ, Mark, MindMap, NextButton, Pie, QCol, QuestionSlide, SlideHead,
  Solution, Stack, Step, Winner, chanceWord, defineLesson, num, useRemoteWidget, useSlide, type BagItem, type HlKey, type Slice,
} from '@engine';

/* ---------- البيانات (مقروءة من رسوم الكتاب) ---------- */

const RED = '#e8463c';
const BLUE = '#3fa9d6';
const YELLOW = '#f2cf3a';
const GREEN = '#2fa65a';

/** استعد ومثال ١ (ص ٩٣): ٨ كرات، اثنتان صفراوان */
const BAG8: BagItem[] = [
  { name: 'زرقاء', n: 3, color: BLUE },
  { name: 'حمراء', n: 3, color: RED },
  { name: 'صفراء', n: 2, color: YELLOW },
];
/** تأكّد ٥–٦ (ص ٩٤): مكعبات */
const CUBES: BagItem[] = [
  { name: 'زرقاء', n: 6, color: BLUE },
  { name: 'صفراء', n: 2, color: YELLOW },
  { name: 'حمراء', n: 1, color: RED },
  { name: 'خضراء', n: 1, color: GREEN },
];
/** تدرّب ٧–١٢ (ص ٩٥): كرات */
const MARBLES: BagItem[] = [
  { name: 'خضراء', n: 1, color: GREEN },
  { name: 'صفراء', n: 6, color: YELLOW },
  { name: 'حمراء', n: 3, color: RED },
];

/** قرص الأعداد (ص ٩٤): ستة أجزاء متساوية باتجاه عقارب الساعة من الأعلى */
const NUMS: Slice[] = [
  { label: '١١', value: 1, color: '#f6c94a' },
  { label: '٩', value: 1, color: '#5aa7d8' },
  { label: '٣', value: 1, color: '#ef4b3c' },
  { label: '١٣', value: 1, color: '#6e4aa8' },
  { label: '٥', value: 1, color: '#f4913a' },
  { label: '٧', value: 1, color: '#55c2b8' },
];
/** قرص الحروف (ص ٩٥): خمسة أجزاء متساوية */
const LETTERS: Slice[] = [
  { label: 'د', value: 1, color: '#5aa2d8' },
  { label: 'ي', value: 1, color: '#f2402a' },
  { label: 'س', value: 1, color: '#fbb92f' },
  { label: 'ع', value: 1, color: '#33b56b' },
  { label: 'و', value: 1, color: '#fdf09a' },
];

const CHECK = 'تأكَّدْ · ص ٩٤';
const PRACTICE = 'تدرَّبْ وحُلَّ المسائلَ · ص ٩٥';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ٩٦';
const TEST = 'تدريبٌ على اختبارٍ · ص ٩٦';
const REVIEW = 'مراجعةٌ تراكميةٌ · ص ٩٦';

const Pic = ({ children }: { children: React.ReactNode }) => <div className="chart pic">{children}</div>;
const NumSpinner = () => (
  <Pic>
    <Pie slices={NUMS} start={-30} pointer={270} size={400} fs={34} />
  </Pic>
);
const LetterSpinner = () => (
  <Pic>
    <Pie slices={LETTERS} start={-54} pointer={300} size={400} fs={40} />
  </Pic>
);
const Marbles = () => (
  <Pic>
    <Bag items={MARBLES} />
  </Pic>
);
const Cubes = () => (
  <Pic>
    <Bag items={CUBES} shape="cube" />
  </Pic>
);

/** كوب بلاستيكي: مقلوب أو على جنبه أو قائم */
function Cup({ pose }: { pose: 'down' | 'side' | 'up' }) {
  const rot = pose === 'down' ? 180 : pose === 'side' ? 90 : 0;
  return (
    <svg viewBox="0 0 60 60" className="cup" role="img" aria-label={pose === 'down' ? 'مقلوب' : pose === 'side' ? 'على جنبه' : 'قائم'}>
      <g transform={`rotate(${rot} 30 30)`}>
        <path d="M13 10 L47 10 L41 52 L19 52 Z" fill="#bfe6f8" stroke="#3a8fc4" strokeWidth={3} strokeLinejoin="round" />
        <ellipse cx={30} cy={10} rx={17} ry={4.5} fill="#e6f6fd" stroke="#3a8fc4" strokeWidth={3} />
      </g>
    </svg>
  );
}

/** بطاقات حروف كلمة «الرياضيات» (ص ٩٤)، بطاقات (ي) تبرز بمفتاح p0 */
const WORD = ['ا', 'ل', 'ر', 'ي', 'ا', 'ض', 'ي', 'ا', 'ت'];
const CARD_COLORS = ['#2f86d6', '#f08a1d', '#e43d3d', '#2fa65a', '#f6d23a', '#2f86d6', '#f08a1d', '#e43d3d', '#2fa65a'];
function LetterCards() {
  const { activeHl } = useSlide();
  const lit = activeHl.has('p0');
  return (
    <div className="lcards">
      {WORD.map((l, i) => (
        <span key={i} className={'lcard' + (lit ? (l === 'ي' ? ' on' : ' dim') : '')} style={{ background: CARD_COLORS[i] }}>
          {l}
        </span>
      ))}
    </div>
  );
}

/** مستكشف: عدد الكرات الحمراء والزرقاء، ووصف احتمال سحب حمراء، وسحب عشوائي */
function BagExplorer() {
  const [r, setR] = useState(3);
  const [b, setB] = useState(5);
  const [last, setLast] = useState<string | null>(null);
  const [draws, setDraws] = useState({ red: 0, blue: 0 });
  const n = r + b;
  const word = n ? chanceWord(r, n) : '—';
  const set = (which: 'r' | 'b', v: number) => {
    const x = Math.max(0, Math.min(10, v));
    if (which === 'r') setR(x);
    else setB(x);
    setLast(null);
    setDraws({ red: 0, blue: 0 });
  };
  const draw = () => {
    if (!n) return;
    const red = Math.random() * n < r;
    setLast(red ? 'حمراء' : 'زرقاء');
    setDraws((d) => (red ? { ...d, red: d.red + 1 } : { ...d, blue: d.blue + 1 }));
  };
  useRemoteWidget(
    () => ({
      title: 'الكيس',
      info: `سحب كرة حمراء: ${word} (${num(r)} من ${num(n)})` + (last ? ` · سُحبت: ${last}` : ''),
      steppers: [
        { key: 'r', label: 'الحمراء', value: r, min: 0, max: 10, color: RED },
        { key: 'b', label: 'الزرقاء', value: b, min: 0, max: 10, color: BLUE },
      ],
      buttons: [{ key: 'draw', label: 'اسحب كرة', on: true, disabled: !n }],
    }),
    (k, v) => {
      if (k === 'r' && v !== undefined) set('r', v);
      else if (k === 'b' && v !== undefined) set('b', v);
      else if (k === 'draw') draw();
    },
    [r, b, last, draws],
  );
  const stepper = (label: string, v: number, which: 'r' | 'b', color: string) => (
    <div className="ffstep" style={{ borderColor: color }}>
      <span style={{ color }}>{label}</span>
      <button aria-label={`إنقاص ${label}`} disabled={v <= 0} onClick={() => set(which, v - 1)}>
        −
      </button>
      <b>{num(v)}</b>
      <button aria-label={`زيادة ${label}`} disabled={v >= 10} onClick={() => set(which, v + 1)}>
        +
      </button>
    </div>
  );
  return (
    <Cols style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
      <Stack>
        {stepper('الحمراء', r, 'r', RED)}
        {stepper('الزرقاء', b, 'b', BLUE)}
        <Card kind="ex" cap="احتمال سحب كرة حمراء">
          <b style={{ fontSize: '1.2em' }}>{word}</b> · {num(r)} من {num(n)}
        </Card>
        <div className="hopx-ctrl">
          <button className="btn step-btn" onClick={draw} disabled={!n}>
            اسحب كرة
          </button>
          <span className="hopx-eq done">
            <span className="eq">{last ? `سُحبت: ${last}` : 'لم نسحب بعد'}</span>
          </span>
        </div>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '.8em' }}>
          السحبات: حمراء {num(draws.red)} · زرقاء {num(draws.blue)}
        </p>
      </Stack>
      <Pic>
        <Bag items={[{ name: 'حمراء', n: r, color: RED }, { name: 'زرقاء', n: b, color: BLUE }]} />
      </Pic>
    </Cols>
  );
}

/** سؤال وصف بالكلمات على كيس الكرات (تدرّب ٧–١٢) */
const marbleQ = (n: number, q: string, lit: number[], why: string, ans: string, intro?: string) => ({
  sec: 'practice' as const,
  min: 1,
  notes: 'أشر إلى الكرات المقصودة، وقارن عددها بنصف الكرات (٥ من ١٠).',
  content: (
    <QuestionSlide
      source={PRACTICE} n={n} time={30}
      intro={intro}
      question={q}
      hint="كم كرة في الكيس؟ وكم منها يحقق الناتج؟"
      steps={[
        { text: why, hl: lit.map((i) => `p${i}` as HlKey) },
        { text: ans, kind: 'ans' },
      ]}
      chart={<Marbles />}
    />
  ),
});

/** سؤال وصف بالأعداد على قرص الحروف (تدرّب ١٣–١٨) */
const letterQ = (n: number, q: string, lit: number[], why: string, ans: string, intro?: string) => ({
  sec: 'practice' as const,
  min: 1,
  notes: 'القرص فيه ٥ أجزاء متساوية. عدّ الأجزاء التي تحقق الناتج.',
  content: (
    <QuestionSlide
      source={PRACTICE} n={n} time={30}
      intro={intro}
      question={q}
      hint="كم جزءًا في القرص؟ وكم جزءًا يحقق الناتج؟"
      steps={[
        { text: why, hl: lit.map((i) => `p${i}` as HlKey) },
        { text: ans, kind: 'ans' },
      ]}
      chart={<LetterSpinner />}
    />
  ),
});

/** سؤال على قرص الأعداد (تأكّد ١–٤) */
const numQ = (n: number, q: string, lit: number[], why: string, ans: string, intro?: string) => ({
  sec: 'check' as const,
  min: 1,
  notes: 'القرص فيه ٦ أجزاء متساوية، وكل أعداده فردية.',
  content: (
    <QuestionSlide
      source={CHECK} n={n} time={30}
      intro={intro}
      question={q}
      hint="انظر إلى الأعداد الستة على القرص."
      steps={[
        { text: why, hl: lit.map((i) => `p${i}` as HlKey) },
        { text: ans, kind: 'ans' },
      ]}
      chart={<NumSpinner />}
    />
  ),
});

const SPIN_INTRO = 'إذا تمَّ تدويرُ المؤشِّرِ، فَصِفِ احتمالَ النَّواتجِ؛ اِستعمِلْ( مُؤَكَّدٌ، أكثرُ احتمالًا، مُتساوِي الإمكانيَّة، أقلُّ احتمالًا، مستحيلٌ).';
const MARBLE_INTRO = 'اِخْتَرْ كُرةً زُجاجيّةً مِنَ الكيسِ دُونَ النَّظرِ إلَيْهَا. صِفِ احتمالَ كلٍّ مِنَ النَّواتجِ الآتيةِ، مُستعملًا الكلماتِ التالية: مؤكَّدٌ، أو أكثرُ احتمالًا ، أو مُتساوِي الإمكانيَّةِ، أو أقلُّ احتمالًا ، أو مستحيلٌ.';
const LETTER_INTRO = 'إذا تمَّ تدويرُ المؤشِّرِ، اِستعمِلِ الأعدادَ لوصْفِ احتمالِ كلٍّ منَ النَّواتجِ الآتيةِ:';
const CARDS_INTRO = 'صندوقٌ يحتوي علَى عشرِ بطاقاتٍ مرقمةٍ منْ ١ - ١٠ ، سُحِبتْ بطاقةٌ مِنَ الصندوقِ دونَ النظرِ إليهَا. صِفِ احتمالَ كلٍّ مِنَ النواتجِ الآتيةِ.';

const BOOKS = { title: 'الكتبُ المستعارةُ', labels: ['الرياضيةُ', 'الألغازُ', 'الحيواناتُ', 'المغامراتُ'], values: [60, 50, 20, 40], max: 70, grid: 10, lab: 10, xTitle: 'عددُ الكتبِ المستعارةِ', yTitle: 'موضوعُ الكتبِ' };
const Books = () => (
  <div className="chart">
    <HBars {...BOOKS} color="#f4813f" />
  </div>
);

export default defineLesson({
  meta: {
    id: 'g4-3-6-probability',
    code: '٣-٦',
    title: 'الاحتمالُ',
    shortTitle: 'الاحتمال',
    subject: 'الرياضيات',
    grade: 'الصف الرابع الابتدائي',
    chapter: 'الفصل الثالث: تنظيم البيانات وعرضها وتفسيرها',
    source: 'الجزء الأول · ص ٩٣–٩٦',
    minutes: 45,
    idea: 'أَصِفُ الاحتمَالَ بالكلماتِ والأعدادِ.',
    bookQuestions: 27,
  },
  sectionDesc: {
    engage: 'كيس الكرات',
    explore: 'اسحب كرة',
    explain: 'القاعدة · الأمثلة ١–٣',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٦',
    practice: 'الأسئلة ٧–٢٠',
    hot: 'الأسئلة ٢١–٢٧',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردة. اسأل: هل ستمطر غدًا؟ هل ستشرق الشمس غدًا؟ كيف نصف الفرق بين السؤالين؟',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَصِفُ الاحتمَالَ بالكلماتِ والأعدادِ.</Card>
              <Card kind="rule" cap="المفردات">
                <Mark>الاحتِمَالُ</Mark>
              </Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, fontSize: '.9em', lineHeight: 1.7 }}>
                <li>أصف الاحتمال بالكلمات: مؤكَّد، أكثر احتمالًا، متساوي الإمكانية، أقل احتمالًا، مستحيل.</li>
                <li>أصف الاحتمال بالأعداد: ٢ من ٩.</li>
                <li>أستعمل الكيس والقرص الدوّار والجداول.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 3,
      notes: 'اقرأ «استعد» من الكتاب. اطلب من كل طالب أن يخمّن اللون ويبرّر: «لأن…».',
      content: (
        <>
          <SlideHead tag="اسْتَعِدَّ · ص ٩٣" kind="qs">كيس الكرات</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">يَحتَوِي كِيسٌ على عددٍ مِنَ الكُراتِ الزُّجاجيَّةِ الملوَّنةِ. إذَا سَحَبَتْ عائشةُ كُرةً مِن داخلِ الكِيسِ دُونَ أنْ تنظرَ إلَى لونِها. فمَا لونُ الكُرةِ الَّتِي تعتقدُ أنَّ عائشةَ قدْ سَحَبَتْهَا؟</p>
              <Card kind="qs" cap="سؤال للتفكير">هل يمكن أن نكون متأكدين من اللون؟ لماذا؟</Card>
            </QCol>
            <Pic>
              <Bag items={BAG8} />
            </Pic>
          </Cols>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 5,
      notes: 'ادعُ طالبًا يغيّر عدد الكرات، ويقرأ وصف الاحتمال. ثم اسحبوا ١٠ مرات: هل ظهرت الحمراء أكثر عندما كانت أكثر؟ جرّبوا: صفر حمراء (مستحيل)، وكلها حمراء (مؤكَّد).',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">اسحب كرة</SlideHead>
          <p style={{ fontSize: '.82em', fontWeight: 700, margin: 0 }}>غيّر عدد الكرات الحمراء والزرقاء، وراقب وصف الاحتمال، ثم اسحب كرة.</p>
          <BagExplorer />
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 3,
      notes: 'اقرأ القاعدة، ثم الأكياس الخمسة من اليمين: مؤكَّد ← مستحيل.',
      content: (
        <>
          <SlideHead tag="القاعدة · ص ٩٣" kind="rule">الاحتمال بالكلمات</SlideHead>
          <Card kind="rule" style={{ fontSize: '1em', fontWeight: 700, lineHeight: 1.8 }}>
            تُسمَّى فُرْصَةُ الحُصولِ على ناتجٍ <Mark>الاحتمالَ</Mark>. ويُوصَفُ الاحتمالُ بالكلماتِ الآتيةِ: مؤكَّدٌ، وأكثرُ احتمالًا، ومتساوِي الإمكانيةِ، وأقلُّ احتمالًا، ومُستحِيلٌ.
          </Card>
          <div className="qgrid five">
            {(
              [
                [6, 0, 'مؤكَّدٌ'],
                [5, 1, 'أكثرُ احتمالًا'],
                [3, 3, 'متساوِي الإمكانيَّةِ'],
                [1, 5, 'أقلُّ احتمالًا'],
                [0, 6, 'مستحيلٌ'],
              ] as const
            ).map(([r, b, w]) => (
              <Card key={w} kind="ex">
                <Bag items={[{ name: 'حمراء', n: r, color: RED }, { name: 'زرقاء', n: b, color: BLUE }]} size={150} />
                <p style={{ margin: 0, textAlign: 'center', fontSize: '.72em', fontWeight: 800, lineHeight: 1.5 }}>
                  اختيارُ كرةٍ حمراءَ
                  <br />
                  <span style={{ color: 'var(--rule)' }}>{w}</span>
                </p>
              </Card>
            ))}
          </div>
        </>
      ),
    },

    /* ================= مثال ١ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: عدّ الكرات الصفراء وقارن بنصف الكرات (٤).',
      content: (
        <>
          <SlideHead tag="مثال ١ · ص ٩٣" kind="ex">وصف الاحتمال بالكلمات</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">صِفْ إمكانيَّةَ أنْ تسحبَ عائشةُ كرةً صفراءَ.</p>
              <Ctrls>
                <NextButton />
              </Ctrls>
              <Solution>
                <Step hl={['p2']}>يحتوِي كيسٌ علَى ٨ كُراتٍ زجاجيةٍ ملونةٍ، اثنتانِ منهَا صفراوانِ.</Step>
                <Step>عددُ الكُراتِ الصَّفراءِ أقلُّ منْ نِصفِ عددِ الكُراتِ الموجودةِ في الكيسِ.</Step>
                <Step kind="ans">إذَنْ سحبُ كُرَةٍ صفراءَ هوَ الأقلُّ احتمالًا.</Step>
              </Solution>
            </QCol>
            <Pic>
              <Bag items={BAG8} />
            </Pic>
          </Cols>
        </>
      ),
    },

    /* ================= مثال ٢ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'الريال الواحد عملة معدنية، فالأوراق النقدية ٦ فقط.',
      content: (
        <>
          <SlideHead tag="مثالٌ من واقعِ الحياةِ ٢ · ص ٩٤" kind="ex">النقود</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">
                <b style={{ color: 'var(--ex)' }}>نقودٌ:</b> يُظهِرُ الجدولُ المُجاورُ فئاتِ النُّقودِ الموجودةِ في محفظةِ راشدٍ. إذَا افترضْنَا أنَّهُ فقدَ ورقةً نقديَّةً، فمَا احتمالُ أنْ تكونَ من فئةِ ١٠ ريالاتٍ.
              </p>
              <Ctrls>
                <NextButton />
              </Ctrls>
              <Solution>
                <Step hl={['p0', 'p1']}>الأوراق النقدية: ١ + ٥ = ٦ (الريال الواحد عملة معدنية).</Step>
                <Step hl={['p1']}>هُنالكَ ٥ أوراقٍ منْ فئةِ ١٠ ريالاتٍ منْ بينِ ٦ أوراقٍ نقديَّةٍ.</Step>
                <Step kind="ans">إذنْ كونُ الورقةِ المفقُودةِ منْ فئةِ ١٠ ريالاتٍ هوَ الأكثرُ احتمالًا.</Step>
              </Solution>
            </QCol>
            <div className="chart tbl">
              <DataGrid
                head={['الفئةُ', 'العددُ']}
                rows={[
                  ['٥٠ ريالًا', 1],
                  ['١٠ ريالاتٍ', 5],
                  ['ريالٌ واحدٌ', 2],
                  ['المجموعُ', 8],
                ]}
              />
            </div>
          </Cols>
        </>
      ),
    },

    /* ================= مثال ٣ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'وصف الاحتمال بالأعداد: «عدد الحالات المطلوبة من العدد الكلي».',
      content: (
        <>
          <SlideHead tag="مثال ٣ · ص ٩٤" kind="ex">وصف الاحتمال بالأعداد</SlideHead>
          <p className="qtext">كُتِبَ كُلُّ حرفٍ منْ حروفِ كلمةِ «الرياضيات» على بطاقةٍ. استعمِلِ الأعدادَ لوصفِ احتمالِ اختيارِ بطاقةٍ كُتِبَ عليهَا الحرفُ (ي) دُونَ النَّظرِ إلى البطاقاتِ.</p>
          <LetterCards />
          <Ctrls>
            <NextButton />
          </Ctrls>
          <Solution>
            <Step hl={['p0']}>هنالكَ بطاقتانِ كُتِبَ عليهِمَا الحرفُ (ي) مِنْ أصْلِ ٩ بطاقاتٍ.</Step>
            <Step kind="ans">إذَنِ احتمالُ اختيارِ بطاقةٍ كُتِبَ عليهَا الحرفُ (ي) هُوَ: ٢ منْ ٩</Step>
          </Solution>
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 4,
      notes: 'نعمل معًا: اختر طالبًا بالعجلة لكل سؤال. اطلب التبرير: «لأن عدد…».',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أصف الاحتمال</SlideHead>
          <Cols>
            <QCol style={{ gap: '.3em' }}>
              <MCQ q="أ) سحب كرة حمراء من هذا الكيس:" options={['مؤكَّد', 'أقل احتمالًا', 'مستحيل']} answer="أقل احتمالًا" award />
              <MCQ q="ب) سحب كرة خضراء:" options={['مستحيل', 'متساوي الإمكانية', 'أكثر احتمالًا']} answer="مستحيل" award />
              <MCQ q="ج) احتمال سحب كرة زرقاء بالأعداد:" options={['٣ من ٨', '٥ من ٨', '٣ من ٥']} answer="٣ من ٨" award />
            </QCol>
            <Pic>
              <Bag items={BAG8} />
            </Pic>
          </Cols>
        </>
      ),
    },

    /* ================= تأكد ١–٦ ================= */
    numQ(1, 'عددٌ فرديٌّ', [0, 1, 2, 3, 4, 5], 'كل الأعداد على القرص فردية: ١١، ٩، ٣، ١٣، ٥، ٧', 'مؤكَّدٌ', SPIN_INTRO),
    numQ(2, 'عددٌ زوجيٌّ', [], 'لا يوجد على القرص أي عدد زوجي.', 'مستحيلٌ'),
    numQ(3, 'عددٌ أقلُّ من ٣', [], 'أصغر عدد على القرص هو ٣، ولا يوجد عدد أقل منه.', 'مستحيلٌ'),
    numQ(4, 'الأعدادُ ٥ أوْ ١١ أوْ ١٣', [0, 3, 4], '٣ أجزاء من ٦: نصف القرص.', 'متساوِي الإمكانيَّةِ'),
    {
      sec: 'check', min: 2,
      notes: 'عدّ المكعبات كلها أولًا (١٠)، ثم غير الصفراء.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} time={60}
          intro="في المسألتينِ ٥، ٦ استعملِ الشَّكلَ المُجاورَ:"
          question="إِستعمِلِ الأعدادَ لوَصْفِ احتمالِ اختيارِ مكعَّبٍ غيرِ الأصفرِ دُونَ النَّظرِ إلى المُكعَّبِ."
          hint="كم مكعبًا في الكيس؟ وكم منها ليس أصفر؟"
          steps={[
            { text: 'في الكيس ١٠ مكعبات، منها ٢ صفراوان.', hl: ['p1'] },
            { text: 'غير الأصفر: ٦ + ١ + ١ = ٨', hl: ['p0', 'p2', 'p3'] },
            { text: '٨ من ١٠', kind: 'ans' },
          ]}
          chart={<Cubes />}
        />
      ),
    },
    {
      sec: 'check', min: 2,
      notes: 'تحدث: اطلب التبرير بالعدد: «لأن الزرقاء أكثر عددًا».',
      content: (
        <QuestionSlide
          source={CHECK} n={6} tags={[{ kind: 'warn', text: 'تحدَّثْ' }]}
          question="إذا اختارَ عمرُ مكعبًا مِنَ الكيسِ دُونَ أنْ ينظرَ إليهِ، فمَا لونُ هذَا المكعَّبِ الَّذي احتمالُ اختيارِهِ أكثرُ مِنْ غيرِهِ؟ فسِّرْ إجابتَكَ."
          long
          hint="أيّ لون عدد مكعباته أكبر؟"
          steps={[
            { text: 'الأزرق ٦ مكعبات من ١٠، وهو أكثر من نصف المكعبات.', hl: ['p0'] },
            { text: 'الأزرقُ؛ لأن عدد المكعبات الزرقاء أكبر من عدد مكعبات أي لون آخر.', kind: 'ans' },
          ]}
          chart={<Cubes />}
        />
      ),
    },

    /* ================= تدرب ٧–١٢ ================= */
    marbleQ(7, 'خضراءُ', [0], 'كرة خضراء واحدة من ١٠ كرات.', 'أقلُّ احتمالًا', MARBLE_INTRO),
    marbleQ(8, 'صفراءُ', [1], '٦ كرات صفراء من ١٠، أكثر من النصف.', 'أكثرُ احتمالًا'),
    marbleQ(9, 'حمراءُ أو صفراءُ أو خضراءُ', [0, 1, 2], 'كل الكرات في الكيس حمراء أو صفراء أو خضراء.', 'مؤكَّدٌ'),
    marbleQ(10, 'زرقاءُ', [], 'لا توجد أي كرة زرقاء في الكيس.', 'مستحيلٌ'),
    marbleQ(11, 'غيرُ خضراءَ', [1, 2], '٩ كرات من ١٠ ليست خضراء.', 'أكثرُ احتمالًا'),
    marbleQ(12, 'حمراءُ أو خضراءُ', [0, 2], '٣ + ١ = ٤ كرات من ١٠، أقل من النصف.', 'أقلُّ احتمالًا'),

    /* ================= تدرب ١٣–١٨ ================= */
    letterQ(13, 'س', [2], 'جزء واحد من ٥ أجزاء.', '١ من ٥', LETTER_INTRO),
    letterQ(14, 'غيرُ د', [1, 2, 3, 4], 'كل الأجزاء ما عدا (د): ٤ أجزاء.', '٤ من ٥'),
    letterQ(15, 'حرفُ مدٍّ (و، ا، ي)', [1, 4], 'على القرص (و) و(ي)، ولا يوجد (ا).', '٢ من ٥'),
    letterQ(16, 'ب أو ت', [], 'لا يوجد (ب) ولا (ت) على القرص.', '٠ من ٥'),
    letterQ(17, 'غيرُ س أو د', [1, 3, 4], 'ي، ع، و: ٣ أجزاء.', '٣ من ٥'),
    letterQ(18, 'أحدُ أحرفِ كلمةِ (زهرةٍ)', [], 'حروف «زهرة»: ز، ه، ر، ة. لا يوجد أي منها على القرص.', '٠ من ٥'),

    /* ================= تدرب ١٩–٢٠ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'الاحتمال هنا من نتائج التجربة: البرتقالي ظهر مرة واحدة من ٢١ مرة.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={19} time={60}
          question="تَمَّ تدويرُ مؤشِّرِ قرصٍ ٢١مرَّةً، وكانتِ النَّتائجُ كمَا يأتِي: إذا أدرْنَا مؤشِّرَ القرصِ مرَّةً إضافيَّةً. صِفْ بالكلِمَاتِ والأعْـدَادِ احتمالَ استقرارِه على اللّونِ البُرتُقاليِّ."
          long
          hint="كم مرة استقر على البرتقالي من ٢١ مرة؟"
          steps={[
            { text: 'أزرق ٨، أخضر ١٢، برتقالي ١: المجموع ٢١.', hl: ['p0', 'p1', 'p2'] },
            { text: 'البرتقالي مرة واحدة فقط.', hl: ['p2'] },
            { text: 'أقلُّ احتمالًا، ١ من ٢١', kind: 'ans' },
          ]}
          chart={
            <div className="chart tbl">
              <DataGrid
                head={['اللونُ', 'عددُ المرّاتِ']}
                rows={[
                  ['أزرقُ', { tally: 8, color: '#2f86d6' }],
                  ['أخضرُ', { tally: 12, color: '#2fa65a' }],
                  ['بُرتقاليٌّ', { tally: 1, color: '#f08a1d' }],
                ]}
              />
            </div>
          }
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: '٣٢ كوبًا: ١٠ + ١٨ + ٤. الوضع «على جنبه» حدث ١٨ مرة، أكثر من النصف (١٦).',
      content: (
        <QuestionSlide
          source={PRACTICE} n={20} time={60}
          question={
            <>
              أوقعتْ علياءُ ٣٢ كوبًا بلاستيكيًّا. والجدولُ الآتِي يُبيِّنُ كيفَ استقرَّتِ الأكوابُ علَى الأرضِ: افْتَرِضْ أنَّ علياءَ أوقعتْ كوبًا آخرَ، فَصِفِ بالكلَمَاتِ والأعْدَادِ احتمالَ أنْ يأخذَ الوضعَ <Cup pose="side" />.
            </>
          }
          long
          hint="كم كوبًا استقر على جنبه من ٣٢؟ وهل هو أكثر من النصف؟"
          steps={[
            { text: 'على جنبه: ١٨ كوبًا من ٣٢.', hl: ['p1'] },
            { text: 'نصف ٣٢ هو ١٦، و١٨ أكبر من ١٦.' },
            { text: 'أكثرُ احتمالًا، ١٨ من ٣٢', kind: 'ans' },
          ]}
          chart={
            <div className="chart tbl">
              <DataGrid
                head={['كيفَ استقرَّ الكوبُ؟', 'العددُ']}
                rows={[
                  [{ node: <Cup pose="down" /> }, 10],
                  [{ node: <Cup pose="side" /> }, 18],
                  [{ node: <Cup pose="up" /> }, 4],
                ]}
              />
            </div>
          }
        />
      ),
    },

    /* ================= مهارات التفكير العليا ٢١–٢٢ ================= */
    {
      sec: 'hot', min: 2,
      notes: 'مسألة مفتوحة: كل تصميم صحيح إذا كان الأخضر أكثر من ٤ أجزاء، والأحمر والأزرق كل منهما أقل من ٤.',
      content: (
        <QuestionSlide
          source={HOT} n={21} tps
          question={
            <>
              <b style={{ color: 'var(--ex)' }}>مَسْأَلَةٌ مفتوحةٌ:</b> صمِّمْ قُرْصًا دوَّارًا مُقسَّمًا إلى ٨ أجزاءٍ متساويةٍ، ثمَّ لوِّنْ أجزاءَ القُرصِ بألوانٍ مختلفةٍ، بحيثُ يكونُ تَوَقُّفُ المؤشِّرِ على اللَّونِ الأخضرِ أكثرَ احتمالًا ، وتوقُّفُهُ عَلَى اللَّوْنِ الأحمرِ أوِ اللَّوْنِ الأزرقِ أقلَّ احتمالًا.
            </>
          }
          long
          hint="أكثر احتمالًا: أكثر من نصف الأجزاء (أكثر من ٤)."
          steps={[
            { text: 'الأخضر أكثر من نصف الأجزاء: ٥ أجزاء.', hl: ['p0', 'p1', 'p2', 'p3', 'p4'] },
            { text: 'الأحمر جزءان، والأزرق جزء واحد: كل منهما أقل من النصف.', hl: ['p5', 'p6', 'p7'] },
            { text: 'مثال: ٥ أخضر، ٢ أحمر، ١ أزرق.', kind: 'ans' },
          ]}
          chart={
            <Pic>
              <Pie slices={[GREEN, GREEN, GREEN, GREEN, GREEN, RED, RED, BLUE].map((c) => ({ label: '', value: 1, color: c }))} pointer={20} size={360} />
            </Pic>
          }
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'أكتب: اقبل كل تجربة يكون فيها ناتج يحدث في كل مرة.',
      content: (
        <QuestionSlide
          source={HOT} n={22} tags={[{ kind: 'warn', text: 'أكتُبُ' }]}
          question="وصفًا لتجربةٍ يكونُ أحدُ نواتجِهَا مؤكَّدَ الحُدُوثِ."
          hint="ماذا يحدث إذا كانت كل الكرات من لون واحد؟"
          steps={[
            { text: 'كيس فيه ٦ كرات كلها حمراء.', hl: ['p0'] },
            { text: 'سحب كرة حمراء منه مؤكَّد الحدوث؛ لأن كل الكرات حمراء.', kind: 'ans' },
          ]}
          chart={
            <Pic>
              <Bag items={[{ name: 'حمراء', n: 6, color: RED }]} />
            </Pic>
          }
        />
      ),
    },

    /* ================= تدريب على اختبار ٢٣–٢٤ ================= */
    {
      sec: 'hot', min: 1,
      notes: 'كل عدد إما فردي أو زوجي.',
      content: (
        <QuestionSlide
          source={TEST} n={23} time={30}
          intro={CARDS_INTRO}
          question="سحبُ بطاقةٍ عليهَا عددٌ فرديٌّ أوْ عددٌ زوجيٌّ"
          hint="هل يوجد عدد من ١ إلى ١٠ ليس فرديًّا ولا زوجيًّا؟"
          steps={[
            { text: 'كل البطاقات من ١ إلى ١٠ عليها عدد فردي أو زوجي.' },
            { text: 'أ) مؤكدٌ', kind: 'ans' },
          ]}
          chart={
            <div className="chart tbl">
              <div className="ncards">
                {['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'].map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            </div>
          }
        >
          <MCQ options={['أ) مؤكدٌ', 'ب) أكثرُ احتمالًا', 'جـ) متساوِي الإمكانيةِ', 'د) مستحيلٌ']} answer="أ) مؤكدٌ" />
        </QuestionSlide>
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'أكبر عدد على البطاقات ١٠.',
      content: (
        <QuestionSlide
          source={TEST} n={24} time={30}
          question="سحبُ بطاقةٍ عليهَا عددٌ أكبرُ من ١٠"
          hint="ما أكبر عدد على البطاقات؟"
          steps={[
            { text: 'أكبر عدد على البطاقات ١٠، ولا يوجد عدد أكبر منه.' },
            { text: 'د) مستحيلٌ', kind: 'ans' },
          ]}
          chart={
            <div className="chart tbl">
              <div className="ncards">
                {['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'].map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            </div>
          }
        >
          <MCQ options={['أ) مؤكدٌ', 'ب) أكثرُ احتمالًا', 'جـ) أقلُّ احتمالًا', 'د) مستحيلٌ']} answer="د) مستحيلٌ" />
        </QuestionSlide>
      ),
    },

    /* ================= مراجعة تراكمية ٢٥–٢٧ ================= */
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٣-٣: اقرأ كل عمود ثم اجمع.',
      content: (
        <QuestionSlide
          source={REVIEW} n={25} time={60}
          question="ما عدد الكتب التي تم استعارتها؟ وماهي موضوعاتها؟ (الدرس ٣ - ٣)"
          hint="اقرأ قيمة كل عمود، ثم اجمع."
          steps={[
            { text: 'الرياضية ٦٠، الألغاز ٥٠، الحيوانات ٢٠، المغامرات ٤٠', hl: ['v0', 'v1', 'v2', 'v3'] },
            { text: <Eq>٦٠ + ٥٠ + ٢٠ + ٤٠ = ١٧٠</Eq> },
            { text: '١٧٠ كتابًا، موضوعاتها: الرياضية والألغاز والحيوانات والمغامرات.', kind: 'ans' },
          ]}
          chart={<Books />}
        />
      ),
    },
    {
      sec: 'hot', min: 1,
      notes: 'أطول عمود.',
      content: (
        <QuestionSlide
          source={REVIEW} n={26} time={30}
          question="ما أكثر موضوع لكتاب تمت استعارته؟ وما عدد الكتب التي تم استعارتها لهذا الموضوع؟ (الدرس ٣ - ٣)"
          hint="ابحث عن أطول عمود."
          steps={[
            { text: 'أطول عمود: الرياضية.', hl: ['p0'] },
            { text: 'الكتب الرياضية، ٦٠ كتابًا.', hl: ['g0', 'v0'], kind: 'ans' },
          ]}
          chart={<Books />}
        />
      ),
    },
    {
      sec: 'hot', min: 2,
      notes: 'مراجعة الدرس ٢-٤: أوجد الثلاثاء أولًا، ثم اجمع الأيام الثلاثة.',
      content: (
        <QuestionSlide
          source={REVIEW} n={27} time={120}
          question="قدَّمَ مطعمُ إحدَى الجامعاتِ ٢٣٦٧ وجبةَ غداءٍ يومَ الإثنينِ، وَ ٢٧٤٥ وجبةً يومَ الأربعاءِ، إذَا كانَ عددُ الوجباتِ الَّتِي قدَّمَهَا المطعمُ يومَ الثلاثاءِ يزيدُ ٤٥ وجبةً عنْ تلكَ الَّتِي قدَّمَهَا يومَ الإثنينِ. فَمَا عددُ وجباتِ الغداءِ الَّتِي قدَّمَهَا المطعمُ خلالَ الأيامِ الثلاثةِ؟ (الدرس ٢ - ٤)"
          long
          hint="الثلاثاء = الإثنين + ٤٥."
          steps={[
            { text: <>الثلاثاء: <Eq>٢٣٦٧ + ٤٥ = ٢٤١٢</Eq></>, hl: ['v1'] },
            { text: <Eq>٢٣٦٧ + ٢٤١٢ + ٢٧٤٥ = ٧٥٢٤</Eq>, hl: ['v0', 'v2'] },
            { text: '٧٥٢٤ وجبةً', kind: 'ans' },
          ]}
          chart={
            <div className="chart tbl">
              <DataGrid
                head={['اليومُ', 'عددُ الوجباتِ']}
                rows={[
                  ['الإثنينُ', 2367],
                  ['الثلاثاءُ', { v: 2412, k: 'v1' }],
                  ['الأربعاءُ', 2745],
                  ['المجموعُ', { v: 7524, k: 'v2' }],
                ]}
              />
            </div>
          }
        />
      ),
    },

    /* ================= الختام ================= */
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب ترتيب الكلمات الخمس من المؤكَّد إلى المستحيل.',
      content: (
        <>
          <SlideHead tag="ملخص الدرس" kind="rule">خريطة ذهنية</SlideHead>
          <MindMap
            center={<>الاحتمال</>}
            items={[
              { kind: 'rule', cap: 'ما الاحتمال؟', text: 'فرصة الحصول على ناتج.' },
              { kind: 'ex', cap: 'بالكلمات', text: 'مؤكَّد، أكثر احتمالًا، متساوي الإمكانية، أقل احتمالًا، مستحيل.' },
              { kind: 'qs', cap: 'بالأعداد', text: 'عدد الحالات المطلوبة «من» العدد الكلي: ٢ من ٩.' },
              { kind: 'warn', cap: 'أقارن بالنصف', text: 'أكثر من النصف ← أكثر احتمالًا، وأقل ← أقل احتمالًا.' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 3,
      notes: 'تذكرة الخروج: يجيب كل طالب في ورقة صغيرة.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">قرص الحروف</SlideHead>
          <Cols style={{ gridTemplateColumns: '1fr 1.25fr' }}>
            <LetterSpinner />
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="توقّف المؤشر على (م):" options={['مؤكَّد', 'مستحيل', 'أقل احتمالًا']} answer="مستحيل" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="احتمال التوقف على (ع) بالأعداد:" options={['١ من ٥', '١ من ٤', '٥ من ١']} answer="١ من ٥" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="التوقف على حرف غير (ع):" options={['أقل احتمالًا', 'أكثر احتمالًا', 'مستحيل']} answer="أكثر احتمالًا" /></Card>
            </div>
          </Cols>
        </>
      ),
    },
    {
      sec: 'close', min: 1,
      notes: 'أعلن الفريق الفائز إن كانت في الحصة فرق، واشكر الطلاب.',
      content: (
        <>
          <SlideHead tag="الختام" kind="ink">
            <IfTeams>الفريق الفائز</IfTeams>
            <IfTeams none>انتهى الدرس، شكرًا لكم</IfTeams>
          </SlideHead>
          <Stack>
            <Winner />
            <GoHomeButton />
          </Stack>
        </>
      ),
    },
  ],
});
