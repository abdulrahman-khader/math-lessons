import { useState } from 'react';
import {
  Bag, Card, Cols, Ctrls, DataGrid, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, QCard, QCol, QuestionSlide, SlideHead, Solution,
  Stack, Step, Tag, Tally, TimerButton, Winner, defineLesson, num, type BagItem,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ · ص ١٠٢';
const PRACTICE = 'أتدرَّبُ · ص ١٠٣';
const SOLVE = 'أحُلُّ المسألةَ · ص ١٠٣';
const CIRCLE = 'أُحَوِّطُ الإِجَابَةَ الصَّحِيحَةَ: (أَكْثَرُ إِمْكَانِيَّةً، أَقَلُّ إِمْكَانِيَّةً)، مُتَّبِعًا الْخُطُوَاتِ، ثُمَّ أُكَرِّرُهَا ١٠ مَرَّاتٍ؛ لِأُكْمِلَ جَدْوَلَ الإِشَارَاتِ:';

const C = { green: '#4fae3a', red: '#d7302a', yellow: '#f6c21c', purple: '#8e44ad' };

const Cube = ({ c }: { c: string }) => (
  <span aria-hidden style={{ display: 'inline-block', width: '.9em', height: '.9em', background: c, border: '2px solid #13213b', borderRadius: '.15em', verticalAlign: 'middle', marginInline: '.15em' }} />
);

/** الخطوات كما في الكتاب */
const Steps = () => (
  <Card kind="ex" cap="الْخُطُوَاتُ">
    <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, lineHeight: 1.7 }}>
      <li>أَسْحَبُ مُكَعَّبًا.</li>
      <li>أُسَجِّلُ اللَّوْنَ فِي جَدْوَلِ الإِشَارَاتِ.</li>
      <li>أُعِيدُ الْمُكَعَّبَ إِلَى الْكِيسِ.</li>
    </ol>
  </Card>
);

/** تجربة السحب: كيس، وزر يسحب ويسجّل إشارة، وزر يسحب ١٠ مرات. السحب مع الإعادة كما في الكتاب. */
function DrawTally({ items }: { items: BagItem[] }) {
  const [n, setN] = useState(items.map(() => 0));
  const [last, setLast] = useState(-1);
  const total = n.reduce((a, b) => a + b, 0);
  const all = items.reduce((a, b) => a + b.n, 0);
  const pick = () => {
    let r = Math.random() * all;
    return items.findIndex((it) => (r -= it.n) < 0);
  };
  const draw = (k: number) => {
    const next = [...n];
    let l = -1;
    for (let i = 0; i < k && next.reduce((a, b) => a + b, 0) < 10; i++) next[(l = pick())]++;
    setN(next);
    setLast(l);
  };
  return (
    <div className="dtally">
      <Bag items={items} shape="cube" size={260} />
      <Stack>
        <DataGrid
          tone="green"
          head={['اللَّوْنُ', 'الإِشَارَاتُ']}
          rows={items.map((it, i) => [{ node: <><Cube c={it.color} /> {it.name}</> }, { node: n[i] ? <Tally n={n[i]} /> : '' }])}
        />
        <b>سحبنا {num(total)} من ١٠ {last >= 0 && <>· آخر سحبة: <Cube c={items[last].color} /></>}</b>
        <div className="row" style={{ gap: '.4em' }}>
          <button className="btn primary" disabled={total >= 10} onClick={() => draw(1)}>اسحب مكعبًا</button>
          <button className="btn" disabled={total >= 10} onClick={() => draw(10)}>اسحب حتى ١٠</button>
          <button className="btn hide" onClick={() => (setN(items.map(() => 0)), setLast(-1))}>من جديد</button>
        </div>
      </Stack>
    </div>
  );
}

/** «سحب … من سحب …»: العبارة الصحيحة تُحوَّط عند الخطوة */
function CompareQ({ n, a, b, items, ans }: { n: number; a: string; b: string; items: BagItem[]; ans: 'أَكْثَرُ إِمْكَانِيَّةً' | 'أَقَلُّ إِمْكَانِيَّةً' }) {
  return (
    <QCard n={n} className="ccard">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.3em', paddingInlineStart: '1.6em' }}>
        <b>يُوجَدُ {num(items[0].n)} <Cube c={items[0].color} /> وَ {num(items[1].n)} <Cube c={items[1].color} /> فِي كِيسٍ.</b>
        <Bag items={items} shape="cube" size={200} />
        <b>سَحْبُ <Cube c={a} /> …… مِنْ سَحْبِ <Cube c={b} /></b>
        <div className="row" style={{ gap: '1em', flexWrap: 'nowrap' }}>
          {(['أَكْثَرُ إِمْكَانِيَّةً', 'أَقَلُّ إِمْكَانِيَّةً'] as const).map((w) => (
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

export default defineLesson({
  meta: {
    id: 'g2-4-8-more-less-likely',
    code: '٤-٨',
    title: 'أَكْثَرُ إِمْكَانِيَّةً - أَقَلُّ إِمْكَانِيَّةً',
    shortTitle: 'أكثر إمكانية وأقل إمكانية',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الرابع: تمثيل البيانات وقراءتها',
    source: 'الجزء الأول · ص ١٠٢–١٠٣',
    minutes: 45,
    idea: 'أَصِفُ الْحَوَادِثَ وَفْقَ إِمْكَانِيَّةِ وُقُوعِهَا.',
    bookQuestions: 8,
  },
  sectionDesc: {
    engage: 'تذكّر أكيد ومستحيل',
    explore: 'أستعد: أقلام جمال',
    explain: 'أكثر إمكانية · أقل إمكانية',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٣',
    practice: 'الأسئلة ٤–٨',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس والمفردتين.',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَصِفُ الْحَوَادِثَ وَفْقَ إِمْكَانِيَّةِ وُقُوعِهَا.</Card>
              <Card kind="rule" cap="المفردات"><Mark>أَكْثَرُ إِمْكَانِيَّةً</Mark> · <Mark>أَقَلُّ إِمْكَانِيَّةً</Mark></Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, lineHeight: 1.7 }}>
                <li>أقارن عدد كل لون في الكيس.</li>
                <li>أصف السحب بأكثر إمكانية أو أقل إمكانية.</li>
                <li>أجري تجربة وأسجّل نتائجها بالإشارات.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الدرس ٤-٧. السؤال الثالث يمهّد للدرس.',
      content: (
        <>
          <SlideHead tag="تذكّر · الدرس ٤-٧" kind="ink">أكيد أم مستحيل؟</SlideHead>
          <Cols>
            <QCol>
              <MCQ q={<>كل المكعبات <Cube c={C.green} />. سحب <Cube c={C.green} />:</>} options={['أكيد', 'مستحيل']} answer="أكيد" award />
              <MCQ q={<>كل المكعبات <Cube c={C.green} />. سحب <Cube c={C.red} />:</>} options={['أكيد', 'مستحيل']} answer="مستحيل" award />
              <Card kind="qs" cap="سؤال للتفكير">في كيس ٥ مكعبات حمراء ومكعب أخضر. سحب الأحمر: هل هو أكيد؟ هل هو مستحيل؟</Card>
            </QCol>
            <Bag items={[{ name: 'أحمر', n: 5, color: C.red }, { name: 'أخضر', n: 1, color: C.green }]} shape="cube" size={260} />
          </Cols>
        </>
      ),
    },

    /* ================= أستعد ================= */
    {
      sec: 'explore', min: 4,
      notes: 'اقرأ من الكتاب، ثم أجروا التجربة: ادعُ طالبًا يسحب ١٠ مرات. هل كانت الإشارات الحمراء أكثر؟',
      content: (
        <>
          <SlideHead tag="أستعدُّ · ص ١٠٢" kind="qs">أقلام جمال</SlideHead>
          <Cols>
            <QCol>
              <p className="qtext">يَسْحَبُ جَمَالٌ قَلَمَ تَلْوِينٍ مِنَ الْكِيسِ مِنْ غَيْرِ أَنْ يَنْظُرَ إِلَيْهِ. فَأَيُّهُمَا أَكْثَرُ إِمْكَانِيَّةً: أَنْ يَسْحَبَ الأَحْمَرَ أَمِ الأَخْضَرَ؟</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step>عَدَدُ الأَحْمَرِ (٤) يَزِيدُ عَلَى عَدَدِ الأَخْضَرِ (١).</Step>
                <Step kind="ans">إِذَنْ إِمْكَانِيَّةُ سَحْبِ الأَحْمَرِ هِيَ <Mark>أَكْثَرُ إِمْكَانِيَّةً</Mark>.</Step>
              </Solution>
            </QCol>
            <DrawTally items={[{ name: 'أَحْمَرُ', n: 4, color: '#e8436a' }, { name: 'أَخْضَرُ', n: 1, color: '#7cc14a' }]} />
          </Cols>
        </>
      ),
    },

    /* ================= القاعدة ================= */
    {
      sec: 'explain', min: 3,
      notes: 'اقرأ القاعدة. المقارنة: اللون الأكثر عددًا أكثر إمكانية.',
      content: (
        <>
          <SlideHead tag="القاعدة · ص ١٠٢" kind="rule">أكثر إمكانية وأقل إمكانية</SlideHead>
          <Card kind="rule" style={{ fontSize: '1.05em', fontWeight: 700, lineHeight: 1.9 }}>
            أَصِفُ إِمْكَانِيَّةَ وُقُوعِ حَدَثٍ مَا بِـ<Mark>أَكْثَرِ إِمْكَانِيَّةٍ</Mark>، أَوْ <Mark>أَقَلِّ إِمْكَانِيَّةٍ</Mark>، وَذَلِكَ بِحَسَبِ فُرْصَةِ حُدُوثِهِ.
          </Card>
          <Cols even>
            <Card kind="ex" cap="أكثر إمكانية">
              <Bag items={[{ name: 'أحمر', n: 6, color: C.red }, { name: 'أصفر', n: 2, color: C.yellow }]} shape="cube" size={200} />
              <b style={{ textAlign: 'center' }}>سحب <Cube c={C.red} /> أكثر إمكانية؛ لأنّ عدده أكبر.</b>
            </Card>
            <Card kind="qs" cap="أقل إمكانية">
              <Bag items={[{ name: 'أحمر', n: 6, color: C.red }, { name: 'أصفر', n: 2, color: C.yellow }]} shape="cube" size={200} />
              <b style={{ textAlign: 'center' }}>سحب <Cube c={C.yellow} /> أقل إمكانية؛ لأنّ عدده أقل.</b>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: البالونات (مثال غير مثال الكتاب). أوقفه قبل كل نتيجة.',
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
      notes: 'نعمل معًا: اختر طالبًا بالعجلة.',
      content: (
        <>
          <SlideHead tag="نعمل معًا" kind="ex">أيّهما أكثر إمكانية؟</SlideHead>
          <Cols>
            <QCol>
              <MCQ q={<>سحب <Cube c={C.yellow} /> من هذا الكيس:</>} options={['أكثر إمكانية', 'أقل إمكانية']} answer="أكثر إمكانية" award />
              <MCQ q={<>سحب <Cube c={C.green} /> من هذا الكيس:</>} options={['أكثر إمكانية', 'أقل إمكانية']} answer="أقل إمكانية" award />
            </QCol>
            <Bag items={[{ name: 'أصفر', n: 7, color: C.yellow }, { name: 'أخضر', n: 2, color: C.green }]} shape="cube" size={260} />
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٢ ================= */
    {
      sec: 'check', min: 3,
      notes: 'السؤال ١: المسافة تُحوِّط. السؤال ٢: تجربة؛ ادعُ طالبًا يسحب ١٠ مرات. النتائج تختلف كل مرة، والمتوقع أن يكون الأخضر أكثر.',
      content: (
        <>
          <div className="row bookrow"><Tag kind="qs">{CHECK}</Tag></div>
          <p className="qtext" style={{ margin: 0, fontSize: '.8em' }}>{CIRCLE}</p>
          <Cols>
            <CompareQ n={1} a={C.green} b={C.red} items={[{ name: 'أخضر', n: 4, color: C.green }, { name: 'أحمر', n: 2, color: C.red }]} ans="أَكْثَرُ إِمْكَانِيَّةً" />
            <QCard n={2}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.3em', paddingInlineStart: '1.6em' }}>
                <b>أَضَعُ ٤ <Cube c={C.green} /> وَ ٢ <Cube c={C.red} /> فِي كِيسٍ.</b>
                <DrawTally items={[{ name: 'أَخْضَرُ', n: 4, color: C.green }, { name: 'أَحْمَرُ', n: 2, color: C.red }]} />
              </div>
            </QCard>
          </Cols>
          <Ctrls><NextButton /><TimerButton sec={120} /></Ctrls>
        </>
      ),
    },

    /* ================= أتأكد ٣ ================= */
    {
      sec: 'check', min: 1,
      notes: 'أتحدث: قارن النتائج التي حصلتم عليها بإجابة السؤال ١.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} tps tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="هَلْ تَتَّفِقُ النَّتَائِجُ الَّتِي حَصَلْتُ عَلَيْهَا فِي جَدْوَلِ الإِشَارَاتِ مَعَ إِجَابَتِي عَنِ السُّؤَالِ (١)؟ أَشْرَحُ."
          hint="أيّ لون له إشارات أكثر في جدولك؟"
          steps={[{ text: 'نعم؛ إشاراتُ الأخضرِ أكثرُ من إشاراتِ الأحمرِ، وهذا يوافقُ أنَّ سحبَ الأخضرِ أكثرُ إمكانيةً.', kind: 'ans' }]}
          chart={<Steps />}
        />
      ),
    },

    /* ================= أتدرب ٤–٥ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'المسافة تُحوِّط الإجابة في كل سؤال.',
      content: (
        <>
          <div className="row bookrow"><Tag kind="qs">{PRACTICE}</Tag></div>
          <p className="qtext" style={{ margin: 0, fontSize: '.8em' }}>{CIRCLE}</p>
          <div className="qgrid two">
            <CompareQ n={4} a={C.red} b={C.yellow} items={[{ name: 'أحمر', n: 2, color: C.red }, { name: 'أصفر', n: 6, color: C.yellow }]} ans="أَقَلُّ إِمْكَانِيَّةً" />
            <CompareQ n={5} a={C.red} b={C.yellow} items={[{ name: 'أحمر', n: 5, color: C.red }, { name: 'أصفر', n: 4, color: C.yellow }]} ans="أَكْثَرُ إِمْكَانِيَّةً" />
          </div>
          <Ctrls><NextButton /><TimerButton sec={90} /></Ctrls>
        </>
      ),
    },

    /* ================= أتدرب ٦–٧ ================= */
    {
      sec: 'practice', min: 3,
      notes: 'تجربتان: ادعُ طالبين. النتائج تختلف، والمتوقع في ٦ أن يكون الأصفر أكثر، وفي ٧ أن يكون الأحمر أكثر قليلًا.',
      content: (
        <>
          <div className="row bookrow"><Tag kind="qs">{PRACTICE}</Tag></div>
          <div className="qgrid two">
            <QCard n={6}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.3em', paddingInlineStart: '1.6em', fontSize: '.85em' }}>
                <b>أَضَعُ ٢ <Cube c={C.red} /> وَ ٦ <Cube c={C.yellow} /> فِي كِيسٍ.</b>
                <DrawTally items={[{ name: 'أَحْمَرُ', n: 2, color: C.red }, { name: 'أَصْفَرُ', n: 6, color: C.yellow }]} />
              </div>
            </QCard>
            <QCard n={7}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.3em', paddingInlineStart: '1.6em', fontSize: '.85em' }}>
                <b>أَضَعُ ٥ <Cube c={C.red} /> وَ ٤ <Cube c={C.yellow} /> فِي كِيسٍ.</b>
                <DrawTally items={[{ name: 'أَحْمَرُ', n: 5, color: C.red }, { name: 'أَصْفَرُ', n: 4, color: C.yellow }]} />
              </div>
            </QCard>
          </div>
        </>
      ),
    },

    /* ================= أحل المسألة ٨ ================= */
    {
      sec: 'practice', min: 2,
      notes: 'التفكير المنطقي: العددان متساويان، فلا أحد أكثر إمكانية.',
      content: (
        <QuestionSlide
          source={SOLVE} n={8} tps tags={[{ kind: 'warn', text: 'التَّفْكِيرُ الْمَنْطِقِيُّ' }]}
          question={<>وَضَعَتْ لَيْلَى ٥ <Cube c={C.purple} /> وَ ٥ <Cube c={C.green} /> فِي كِيسٍ. أَيُّهُمَا إِمْكَانِيَّةُ حُدُوثِهِ أَكْثَرُ مِنَ الآخَرِ: سَحْبُ <Cube c={C.purple} /> أَمْ <Cube c={C.green} />؟ أُوَضِّحُ إِجَابَتِي.</>}
          hint="قارن العددين."
          steps={[
            { text: 'البنفسجي ٥، والأخضر ٥: العددان متساويان.' },
            { text: 'لا فرق؛ إمكانيةُ سحبِ البنفسجيِّ تساوي إمكانيةَ سحبِ الأخضرِ.', kind: 'ans' },
          ]}
          chart={<Bag items={[{ name: 'بنفسجي', n: 5, color: C.purple }, { name: 'أخضر', n: 5, color: C.green }]} shape="cube" size={260} />}
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
            center={<>إمكانية<br />الحدوث</>}
            items={[
              { kind: 'rule', cap: 'أكثر إمكانية', text: 'اللون الأكثر عددًا في الكيس.' },
              { kind: 'ex', cap: 'أقل إمكانية', text: 'اللون الأقل عددًا في الكيس.' },
              { kind: 'qs', cap: 'متساوي', text: 'إذا تساوى العددان.' },
              { kind: 'warn', cap: 'التجربة', text: 'أسحب وأسجّل وأعيد، ١٠ مرات.' },
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
            <Bag items={[{ name: 'أخضر', n: 3, color: C.green }, { name: 'أحمر', n: 7, color: C.red }]} shape="cube" size={260} />
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q={<>سحب <Cube c={C.red} />:</>} options={['أكثر إمكانية', 'أقل إمكانية']} answer="أكثر إمكانية" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q={<>سحب <Cube c={C.green} />:</>} options={['أكثر إمكانية', 'أقل إمكانية']} answer="أقل إمكانية" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q={<>كم مكعبًا <Cube c={C.green} /> نضيف ليتساوى السحب؟</>} options={['٢', '٤', '٧']} answer="٤" /></Card>
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
