import { useState } from 'react';
import {
  Bag, Card, Cols, Ctrls, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, QCard, QCol, QuestionSlide, SlideHead, Solution, Stack,
  Step, Tag, TimerButton, Winner, defineLesson, num, useRemoteWidget, type BagItem,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ · ص ١٠٠';
const PRACTICE = 'أتدرَّبُ · ص ١٠١';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ١٠١';
const CIRCLE = 'أُحَوِّطُ الْكَلِمَةَ الْمُنَاسِبَةَ (أَكِيدٌ، مُسْتَحِيلٌ):';
const COLOR = 'أُلَوِّنُ الْمُكَعَّبَاتِ لِكَيْ تَكُونَ الْجُمْلَتَانِ صَحِيحَتَيْنِ:';

const C = { green: '#4fae3a', yellow: '#f6c21c', red: '#d7302a', orange: '#f28a1d', blue: '#2f3f9e', gray: '#e3e7ed' };

/** مكعب صغير بلون داخل النص */
const Cube = ({ c }: { c: string }) => (
  <span aria-hidden style={{ display: 'inline-block', width: '.9em', height: '.9em', background: c, border: '2px solid #13213b', borderRadius: '.15em', verticalAlign: 'middle', marginInline: '.15em' }} />
);

/** صفّ «أحوّط»: المكعب المختار، والكيس، والكلمتان، والصحيحة تُحوَّط عند الخطوة */
function CircleRow({ n, pick, items, ans }: { n: number; pick: string; items: BagItem[]; ans: 'أَكِيدٌ' | 'مُسْتَحِيلٌ' }) {
  return (
    <QCard n={n} className="ccard">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.3em', paddingInlineStart: '1.6em' }}>
        <div className="row" style={{ gap: '.8em', alignItems: 'center', flexWrap: 'nowrap' }}>
          <span style={{ fontSize: '2em' }}><Cube c={pick} /></span>
          <Bag items={items} shape="cube" size={230} />
        </div>
        <div className="row" style={{ gap: '1em', flexWrap: 'nowrap' }}>
          {(['أَكِيدٌ', 'مُسْتَحِيلٌ'] as const).map((w) => (
            <span key={w} className="cword">
              {w}
              {w === ans && <Step className="cring">{w}</Step>}
            </span>
          ))}
        </div>
      </div>
    </QCard>
  );
}

/** ألوان التلوين؛ ضغطة على المكعب تنقله إلى اللون التالي ثم تعيده رماديًا */
const PAINT = [
  { name: 'أحمر', all: 'حمراء', c: C.red },
  { name: 'أصفر', all: 'صفراء', c: C.yellow },
  { name: 'أخضر', all: 'خضراء', c: C.green },
  { name: 'أزرق', all: 'زرقاء', c: C.blue },
];

interface ColorDef { n: number; pick: string; word: string; fill: string; total: number }

/**
 * الحكم على تلوين الطلاب: «أكيد» صحيح إن كانت المكعبات كلها بلون الاختيار،
 * و«مستحيل» صحيح إن لُوِّنت كلها ولا مكعب منها بلون الاختيار.
 */
function verdict(cs: number[], pick: string, word: string) {
  const p = PAINT.findIndex((x) => x.c === pick);
  const { name, all } = PAINT[p];
  if (cs.every((x) => x < 0)) return null;
  if (word.startsWith('أَكِيد'))
    return cs.every((x) => x === p)
      ? { ok: true, text: `✓ صحيح: كل المكعبات ${all}، فاختيار ${name} أكيد.` }
      : { ok: false, text: `✗ ليس بعد: ليكون الاختيار أكيدًا تكون كل المكعبات ${all}.` };
  if (cs.some((x) => x === p)) return { ok: false, text: `✗ في الكيس مكعب ${name}، فاختياره ممكن لا مستحيل.` };
  if (cs.some((x) => x < 0)) return { ok: false, text: `✗ ليس بعد: نلوّن كل المكعبات بألوان غير ${name}.` };
  return { ok: true, text: `✓ صحيح: لا مكعب ${name} في الكيس، فاختياره مستحيل.` };
}

/** الحكم على تلوين الصف: يظهر وحده بمجرد أن يبدأ الطلاب التلوين، ويتغير مع كل تغيير */
const ColorVerdict = ({ v }: { v: ReturnType<typeof verdict> }) =>
  v && <b className={'cverdict' + (v.ok ? ' ok' : '')}>{v.text}</b>;

/** عدد مكعبات كل لون ← مكعبات الكيس مرتّبة (-١ رمادي) */
const fromCounts = (counts: number[], total: number) => {
  const out: number[] = [];
  counts.forEach((k, c) => out.push(...Array(k).fill(c)));
  return [...out, ...Array(total - out.length).fill(-1)];
};

/**
 * سؤالا «أُلَوِّنُ» في الشريحة: يلوّن الطلاب المكعبات بأنفسهم (ضغطة على المكعب، أو عدد كل لون من الجوال).
 * حل دليل المعلم يبقى مخفيًا خلف «التالي».
 */
function ColorPair({ qs }: { qs: ColorDef[] }) {
  const [cubes, setCubes] = useState(() => qs.map((q) => Array<number>(q.total).fill(-1)));
  const counts = cubes.map((cs) => PAINT.map((_, c) => cs.filter((x) => x === c).length));
  const tap = (q: number, i: number) =>
    setCubes((all) => all.map((cs, j) => (j !== q ? cs : cs.map((x, k) => (k !== i ? x : x + 1 >= PAINT.length ? -1 : x + 1)))));
  useRemoteWidget(
    () => ({
      title: 'تلوين المكعبات',
      steppers: qs.flatMap((q, j) =>
        PAINT.map((p, c) => ({
          key: `${j}:${c}`,
          label: `${num(q.n)} · ${p.name}`,
          value: counts[j][c],
          min: 0,
          max: counts[j][c] + q.total - counts[j].reduce((a, b) => a + b, 0),
          color: p.c,
        })),
      ),
      buttons: [{ key: 'clear', label: 'امسح التلوين' }],
    }),
    (k, v) => {
      if (k === 'clear') return setCubes(qs.map((q) => Array<number>(q.total).fill(-1)));
      const [j, c] = k.split(':').map(Number);
      if (v === undefined) return;
      setCubes((all) => all.map((cs, x) => (x !== j ? cs : fromCounts(counts[j].map((n, y) => (y === c ? v : n)), qs[j].total))));
    },
    [cubes.map((cs) => cs.join()).join('|')],
  );
  return (
    <div className="qgrid two">
      {qs.map(({ n, pick, word, fill, total }, q) => (
        <QCard key={n} n={n} className="ccard">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.2em', paddingInlineStart: '1.6em' }}>
            <b>اخْتِيَارُ <Cube c={pick} /> {word}</b>
            <div className="cbags">
              <div className="paintbag">
                {cubes[q].map((x, i) => (
                  <button key={i} aria-label={`لوّن المكعب ${num(i + 1)}`} style={{ background: x < 0 ? C.gray : PAINT[x].c }} onClick={() => tap(q, i)} />
                ))}
              </div>
              {/* قبل أن يلوّن الصف: «التالي» يُظهر حل دليل المعلم فوق الكيس */}
              {!verdict(cubes[q], pick, word) && <Step className="cover"><Bag items={[{ name: 'ملوّن', n: total, color: fill }]} shape="cube" size={170} /></Step>}
            </div>
            <ColorVerdict v={verdict(cubes[q], pick, word)} />
          </div>
        </QCard>
      ))}
    </div>
  );
}

/** استكشاف: يختار الطالب لون الكيس، ثم يسحب مكعبًا */
function DrawExplorer() {
  const bags: { name: string; items: BagItem[] }[] = [
    { name: 'كيس أخضر', items: [{ name: 'أخضر', n: 8, color: C.green }] },
    { name: 'كيس أحمر وأصفر', items: [{ name: 'أحمر', n: 4, color: C.red }, { name: 'أصفر', n: 4, color: C.yellow }] },
  ];
  const [b, setB] = useState(0);
  const [got, setGot] = useState<string[]>([]);
  const draw = () => {
    const flat = bags[b].items.flatMap((it) => Array.from({ length: it.n }, () => it.name));
    setGot((g) => [...g, flat[Math.floor(Math.random() * flat.length)]].slice(-8));
  };
  return (
    <Cols>
      <QCol>
        <div className="row" style={{ gap: '.4em' }}>
          {bags.map((x, i) => (
            <button key={x.name} className={'btn' + (i === b ? ' sel' : '')} onClick={() => (setB(i), setGot([]))}>{x.name}</button>
          ))}
        </div>
        <button className="btn primary" onClick={draw}>اسحب مكعبًا</button>
        <p style={{ margin: 0, fontWeight: 800 }}>سحبنا: {got.join('، ') || '…'}</p>
        <Card kind="qs" cap="سؤال">هل يمكن أن نسحب مكعبًا أزرق من هذا الكيس؟</Card>
      </QCol>
      <Bag items={bags[b].items} shape="cube" size={300} />
    </Cols>
  );
}

export default defineLesson({
  meta: {
    id: 'g2-4-7-certain-impossible',
    code: '٤-٧',
    title: 'الْحَدَثُ الأَكِيدُ وَالْحَدَثُ الْمُسْتَحِيلُ',
    shortTitle: 'الحدث الأكيد والحدث المستحيل',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الرابع: تمثيل البيانات وقراءتها',
    source: 'الجزء الأول · ص ١٠٠–١٠١',
    minutes: 45,
    idea: 'أُحَدِّدُ الْحَدَثَ الأَكِيدَ وَالْحَدَثَ الْمُسْتَحِيلَ.',
    bookQuestions: 11,
  },
  sectionDesc: {
    engage: 'هل يحدث؟',
    explore: 'أسحب مكعبًا',
    explain: 'أكيد · مستحيل',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٥',
    practice: 'الأسئلة ٦–١٠',
    hot: 'السؤال ١١',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردتين. اسأل: ما معنى «أكيد» في كلامنا اليومي؟',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أُحَدِّدُ الْحَدَثَ الأَكِيدَ وَالْحَدَثَ الْمُسْتَحِيلَ.</Card>
              <Card kind="rule" cap="المفردات"><Mark>أَكِيدٌ</Mark> · <Mark>مُسْتَحِيلٌ</Mark></Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, lineHeight: 1.7 }}>
                <li>أعرف متى يكون السحب أكيدًا.</li>
                <li>أعرف متى يكون السحب مستحيلًا.</li>
                <li>ألوّن كيسًا ليصير السحب أكيدًا أو مستحيلًا.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 2,
      notes: 'أسئلة من الحياة: هل يحدث هذا؟ دع الطلاب يجيبون بنعم أو لا.',
      content: (
        <>
          <SlideHead tag="سؤال للصف" kind="qs">هل يحدث هذا؟</SlideHead>
          <div className="qgrid three">
            <MCQ q="تشرق الشمس غدًا." options={['أكيد', 'مستحيل']} answer="أكيد" award />
            <MCQ q="يطير الفيل في السماء." options={['أكيد', 'مستحيل']} answer="مستحيل" award />
            <MCQ q="يأتي يوم الجمعة بعد الخميس." options={['أكيد', 'مستحيل']} answer="أكيد" award />
          </div>
        </>
      ),
    },

    /* ================= استكشاف ================= */
    {
      sec: 'explore', min: 4,
      notes: 'ادعُ طالبًا يسحب عدة مرات من كل كيس. اسأل: من الكيس الأخضر، ماذا نسحب دائمًا؟ هل يمكن أن نسحب أزرق؟',
      content: (
        <>
          <SlideHead tag="اكتشف بنفسك" kind="ex">أسحب مكعبًا</SlideHead>
          <DrawExplorer />
        </>
      ),
    },

    /* ================= أستعد ================= */
    {
      sec: 'explain', min: 3,
      notes: 'اقرأ من الكتاب. كل المكعبات خضراء: سحب الأخضر أكيد، والأصفر مستحيل.',
      content: (
        <>
          <SlideHead tag="أستعدُّ · ص ١٠٠" kind="rule">أكيد ومستحيل</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">أَنْظُرُ إِلَى وِعَاءِ الْمُكَعَّبَاتِ</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>اِخْتِيَارُ <Cube c={C.green} /> <Mark>أَكِيدٌ</Mark>؛ لأنَّ كلَّ المكعباتِ خضراءُ.</Step>
                <Step kind="ans">اِخْتِيَارُ <Cube c={C.yellow} /> <Mark>مُسْتَحِيلٌ</Mark>؛ لأنه لا يوجد مكعبٌ أصفرُ.</Step>
              </Solution>
            </QCol>
            <Bag items={[{ name: 'أخضر', n: 9, color: C.green }]} shape="cube" size={300} />
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: صندوق الكرات (مثال غير مثال الكتاب). أوقفه قبل كل سحب واسأل: أكيد أم مستحيل؟',
      content: (
        <>
          <SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>
          <IntroClip />
        </>
      ),
    },

    /* ================= نعمل معًا ================= */
    {
      sec: 'elab', min: 3,
      notes: 'نعمل معًا: اختر طالبًا بالعجلة لكل سؤال.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أكيد أم مستحيل؟</SlideHead>
          <Cols>
            <QCol>
              <MCQ q={<>سحب <Cube c={C.blue} /> من هذا الكيس:</>} options={['أكيد', 'مستحيل']} answer="أكيد" award />
              <MCQ q={<>سحب <Cube c={C.red} /> من هذا الكيس:</>} options={['أكيد', 'مستحيل']} answer="مستحيل" award />
            </QCol>
            <Bag items={[{ name: 'أزرق', n: 6, color: C.blue }]} shape="cube" size={260} />
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٢ ================= */
    {
      sec: 'check', min: 2,
      notes: 'المسافة تُحوِّط الإجابة في كل سؤال.',
      content: (
        <>
          <div className="row bookrow"><Tag kind="qs">{CHECK}</Tag></div>
          <p className="qtext" style={{ margin: 0 }}>{CIRCLE}</p>
          <div className="qgrid two">
            <CircleRow n={1} pick={C.green} items={[{ name: 'أصفر', n: 4, color: C.yellow }, { name: 'أحمر', n: 5, color: C.red }]} ans="مُسْتَحِيلٌ" />
            <CircleRow n={2} pick={C.orange} items={[{ name: 'برتقالي', n: 9, color: C.orange }]} ans="أَكِيدٌ" />
          </div>
          <Ctrls><NextButton /><TimerButton sec={60} /></Ctrls>
        </>
      ),
    },

    /* ================= أتأكد ٣–٤ ================= */
    {
      sec: 'check', min: 2,
      notes: 'يلوّن الطلاب: ضغطة على المكعب تغيّر لونه (أو عدد كل لون من الجوال). في ٤ إجابات كثيرة صحيحة: أي لون غير الأصفر. «التالي» يُظهر حل دليل المعلم.',
      content: (
        <>
          <div className="row bookrow"><Tag kind="qs">{CHECK}</Tag></div>
          <p className="qtext" style={{ margin: 0 }}>{COLOR}</p>
          <ColorPair qs={[
            { n: 3, pick: C.red, word: 'أَكِيدٌ.', fill: C.red, total: 7 },
            { n: 4, pick: C.yellow, word: 'مُسْتَحِيلٌ.', fill: C.red, total: 7 },
          ]} />
          <Ctrls><NextButton /><TimerButton sec={90} /></Ctrls>
        </>
      ),
    },

    /* ================= أتأكد ٥ ================= */
    {
      sec: 'check', min: 1,
      notes: 'أتحدث.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} tps tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question={<>يَحْوِي كِيسٌ مُكَعَّبَاتٍ <Cube c={C.red} /> وَمُكَعَّبَاتٍ <Cube c={C.green} />. فَهَلِ اخْتِيَارُ مُكَعَّبٍ <Cube c={C.yellow} /> يَكُونُ أَكِيدًا أَوْ مُسْتَحِيلًا؟ أَشْرَحُ.</>}
          hint="هل في الكيس مكعب أصفر؟"
          steps={[{ text: 'مُسْتَحِيلٌ؛ لِأَنَّ الْكِيسَ لَا يَحْوِي أَيَّ مُكَعَّبٍ أَصْفَرَ.', kind: 'ans' }]}
          chart={<Bag items={[{ name: 'أحمر', n: 4, color: C.red }, { name: 'أخضر', n: 4, color: C.green }]} shape="cube" size={260} />}
        />
      ),
    },

    /* ================= أتدرب ٦–٨ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'المسافة تُحوِّط الإجابة في كل سؤال.',
      content: (
        <>
          <div className="row bookrow"><Tag kind="qs">{PRACTICE}</Tag></div>
          <p className="qtext" style={{ margin: 0 }}>{CIRCLE}</p>
          <div className="qgrid three">
            <CircleRow n={6} pick={C.yellow} items={[{ name: 'أصفر', n: 9, color: C.yellow }]} ans="أَكِيدٌ" />
            <CircleRow n={7} pick={C.blue} items={[{ name: 'أحمر', n: 5, color: C.red }, { name: 'أصفر', n: 4, color: C.yellow }]} ans="مُسْتَحِيلٌ" />
            <CircleRow n={8} pick={C.green} items={[{ name: 'أخضر', n: 9, color: C.green }]} ans="أَكِيدٌ" />
          </div>
          <Ctrls><NextButton /><TimerButton sec={90} /></Ctrls>
        </>
      ),
    },

    /* ================= أتدرب ٩–١٠ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'يلوّن الطلاب: ضغطة على المكعب تغيّر لونه (أو عدد كل لون من الجوال). في ١٠ أي لون غير الأزرق صحيح. «التالي» يُظهر حل دليل المعلم.',
      content: (
        <>
          <div className="row bookrow"><Tag kind="qs">{PRACTICE}</Tag></div>
          <p className="qtext" style={{ margin: 0 }}>{COLOR}</p>
          <ColorPair qs={[
            { n: 9, pick: C.green, word: 'أَكِيدٌ.', fill: C.green, total: 8 },
            { n: 10, pick: C.blue, word: 'مُسْتَحِيلٌ.', fill: C.red, total: 8 },
          ]} />
          <Ctrls><NextButton /><TimerButton sec={90} /></Ctrls>
        </>
      ),
    },

    /* ================= مهارات التفكير العليا ١١ ================= */
    {
      sec: 'hot', min: 2,
      notes: 'التفكير الرياضي: ليس أكيدًا ولا مستحيلًا. نتعلم ذلك في الدرس القادم.',
      content: (
        <QuestionSlide
          source={HOT} n={11} tps tags={[{ kind: 'warn', text: 'التَّفْكِيرُ الرِّيَاضِيُّ' }]}
          question={<>وَضَعَ سُعُودٌ ٤ <Cube c={C.yellow} /> وَ ٤ <Cube c={C.green} /> فِي كِيسٍ. هَلِ اخْتِيَارُ <Cube c={C.yellow} /> أَكِيدٌ؟ أَشْرَحُ.</>}
          hint="هل كل المكعبات صفراء؟"
          steps={[
            { text: 'لا؛ لأنَّ في الكيسِ ٤ مكعباتٍ خضراءَ أيضًا، فقد نسحبُ أخضرَ.' },
            { text: 'فاختيارُ الأصفرِ ممكنٌ لكنه ليس أكيدًا، وليس مستحيلًا.', kind: 'ans' },
          ]}
          chart={<Bag items={[{ name: 'أصفر', n: 4, color: C.yellow }, { name: 'أخضر', n: 4, color: C.green }]} shape="cube" size={260} />}
        />
      ),
    },

    /* ================= الختام ================= */
    {
      sec: 'close', min: 1,
      notes: 'اطلب من الطلاب إكمال كل فرع شفهيًا.',
      content: (
        <>
          <SlideHead tag="ملخص الدرس" kind="rule">خريطة ذهنية</SlideHead>
          <MindMap
            center={<>أكيد<br />ومستحيل</>}
            items={[
              { kind: 'rule', cap: 'أكيد', text: 'كل ما في الكيس من اللون نفسه.' },
              { kind: 'ex', cap: 'مستحيل', text: 'اللون غير موجود في الكيس.' },
              { kind: 'qs', cap: 'ممكن', text: 'في الكيس اللون وألوان أخرى.' },
              { kind: 'warn', cap: 'أنتبه', text: 'أنظر إلى كل المكعبات قبل أن أقرر.' },
            ]}
          />
        </>
      ),
    },
    {
      sec: 'close', min: 2,
      notes: 'تذكرة الخروج.',
      content: (
        <>
          <SlideHead tag="تذكرة الخروج" kind="qs">ثلاثة أسئلة</SlideHead>
          <Cols>
            <Bag items={[{ name: 'أحمر', n: 6, color: C.red }]} shape="cube" size={260} />
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q={<>سحب <Cube c={C.red} />:</>} options={['أكيد', 'مستحيل']} answer="أكيد" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q={<>سحب <Cube c={C.green} />:</>} options={['أكيد', 'مستحيل']} answer="مستحيل" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q={<>أضفنا مكعبًا <Cube c={C.green} />. سحب <Cube c={C.red} /> الآن:</>} options={['أكيد', 'مستحيل', 'ليس أكيدًا ولا مستحيلًا']} answer="ليس أكيدًا ولا مستحيلًا" /></Card>
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
