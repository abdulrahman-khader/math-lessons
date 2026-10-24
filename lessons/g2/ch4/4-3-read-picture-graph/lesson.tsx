import {
  Card, Cols, Ctrls, GoHomeButton, IfTeams, MCQ, Mark, MindMap, NextButton, PicGraph, QCol, QuestionSlide, SlideHead, Solution, Stack, Step,
  Winner, defineLesson,
} from '@engine';
import { IntroClip } from './clip';

/* ---------- خاص بهذا الدرس ---------- */

const CHECK = 'أتأكَّدُ · ص ٨٨';
const PRACTICE = 'أتدرَّبُ · ص ٨٩';
const HOT = 'مسائلُ مهاراتِ التفكيرِ العُليا · ص ٨٩';
const USE_ABOVE = 'أَسْتَعْمِلُ التَّمْثِيلَ بِالصُّوَرِ أَعْلَاهُ لِلإِجَابَةِ عَمَّا يَأْتِي:';
const USE = 'أَسْتَعْمِلُ التَّمْثِيلَ بِالصُّوَرِ لِلإِجَابَةِ عَنِ الأَسْئِلَةِ:';

/** الخضراوات المفضلة: كل حبة خضار = استجابة واحدة */
const Veg = () => (
  <PicGraph
    title="الْخَضْرَوَاتُ الْمُفَضَّلَةُ"
    cells={7}
    tone="#f3d6ec"
    keyText="الْمِفْتَاحُ: كُلُّ حَبَّةِ خُضَارٍ = اسْتِجَابَةٌ وَاحِدَةٌ"
    rows={[
      { label: 'الْبَازِلاءُ', icon: '🫛', n: 6, color: '#cfe0f5' },
      { label: 'الذُّرَةُ', icon: '🌽', n: 5, color: '#fff3b0' },
      { label: 'الْفَاصُولْيَاءُ', icon: '🫘', n: 3, color: '#c8e6c9' },
      { label: 'الْبَطَاطَا', icon: '🥔', n: 7, color: '#fcd9b8' },
    ]}
  />
);

/** الرياضات التي نلعبها: كل صورة = استجابتان */
const Sports = () => (
  <PicGraph
    title="الرِّيَاضَاتُ الَّتِي نَلْعَبُهَا"
    cells={8}
    keyText="الْمِفْتَاحُ: كُلُّ صُورَةٍ تُمَثِّلُ اسْتِجَابَتَيْنِ"
    rows={[
      { label: 'كُرَةُ الْقَدَمِ', icon: '⚽', n: 3, color: '#fff3b0' },
      { label: 'كُرَةُ السَّلَّةِ', icon: '🏀', n: 4, color: '#fcd9b8' },
      { label: 'كُرَةُ الطَّائِرَةِ', icon: '🏐', n: 5, color: '#c8e6c9' },
      { label: 'تِنِسُ الطَّاوِلَةِ', icon: '🏓', n: 2, color: '#e1d0f0' },
    ]}
  />
);

export default defineLesson({
  meta: {
    id: 'g2-4-3-read-picture-graph',
    code: '٤-٣',
    title: 'قِرَاءَةُ الْبَيَانَاتِ الْمُمَثَّلَةِ بِالصُّوَرِ',
    shortTitle: 'قراءة البيانات الممثلة بالصور',
    subject: 'الرياضيات',
    grade: 'الصف الثاني الابتدائي',
    chapter: 'الفصل الرابع: تمثيل البيانات وقراءتها',
    source: 'الجزء الأول · ص ٨٨–٨٩',
    minutes: 45,
    idea: 'أَتَوَصَّلُ إِلَى نَتَائِجَ، وَأُجِيبُ عَنْ أَسْئِلَةٍ اعْتِمَادًا عَلَى التَّمْثِيلِ بِالصُّوَرِ.',
    bookQuestions: 12,
  },
  sectionDesc: {
    engage: 'تذكّر المفتاح',
    explore: 'أستعد: الخضراوات المفضلة',
    explain: 'كيف أقرأ التمثيل؟',
    elab: 'نعمل معًا',
    check: 'الأسئلة ١–٧',
    practice: 'الأسئلة ٨–١١',
    hot: 'السؤال ١٢',
    close: 'ملخص · تذكرة الخروج',
  },
  slides: [
    /* ================= الأهداف ================= */
    {
      sec: 'start', min: 1,
      notes: 'اقرأ فكرة الدرس. اسأل: ماذا يمكن أن نتعلم من تمثيل بالصور؟',
      content: (
        <>
          <h2>ماذا سنتعلم اليوم؟</h2>
          <Cols even>
            <Stack>
              <Card kind="rule" cap="فكرة الدرس">أَتَوَصَّلُ إِلَى نَتَائِجَ، وَأُجِيبُ عَنْ أَسْئِلَةٍ اعْتِمَادًا عَلَى التَّمْثِيلِ بِالصُّوَرِ.</Card>
              <Card kind="rule" cap="أتذكّر">الْمِفْتَاحُ هُوَ عَدَدُ الاسْتِجَابَاتِ الَّذِي تُمَثِّلُهُ كُلُّ صُورَةٍ.</Card>
            </Stack>
            <Card kind="ex" cap="في نهاية الدرس أستطيع أن…">
              <ol style={{ margin: 0, paddingInlineStart: '1.2em', fontWeight: 700, lineHeight: 1.6 }}>
                <li>أقرأ عدد كل فئة من الصور والمفتاح.</li>
                <li>أجد الأكثر والأقل.</li>
                <li>أجمع وأطرح لأجيب عن أسئلة.</li>
              </ol>
            </Card>
          </Cols>
        </>
      ),
    },

    /* ================= تهيئة ================= */
    {
      sec: 'engage', min: 2,
      notes: 'مراجعة الدرس ٤-٢ بالعجلة.',
      content: (
        <>
          <SlideHead tag="تذكّر · الدرس ٤-٢" kind="ink">ماذا يقول المفتاح؟</SlideHead>
          <div className="qgrid two">
            <MCQ q="المفتاح: كل صورة = ١. في الصف ٤ صور. كم استجابة؟" options={['٢', '٤', '٨']} answer="٤" award />
            <MCQ q="المفتاح: كل صورة = ٢. في الصف ٤ صور. كم استجابة؟" options={['٤', '٦', '٨']} answer="٨" award />
          </div>
        </>
      ),
    },

    /* ================= أستعد ================= */
    {
      sec: 'explore', min: 3,
      notes: 'أفكّر: ماذا يمكن أن أتعلم من هذا التمثيل؟ اجمع الملاحظات من الطلاب ثم اضغط المسافة.',
      content: (
        <>
          <SlideHead tag="أستعدُّ · ص ٨٨" kind="qs">الخضراوات المفضلة</SlideHead>
          <Cols>
            <QCol>
              <Card kind="qs" cap="أُفَكِّرُ">مَاذَا يُمْكِنُ أَنْ أَتَعَلَّمَ مِنْ هَذَا التَّمْثِيلِ؟</Card>
              <p className="qtext">أَحْصُلُ عَلَى الْكَثِيرِ مِنَ الْمَعْلُومَاتِ مِنْ خِلَالِ قِرَاءَتِي لِلتَّمْثِيلِ بِالصُّوَرِ.</p>
              <Ctrls><NextButton /></Ctrls>
              <Solution>
                <Step hl={['p3']}>البطاطا الأكثر تفضيلًا: ٧</Step>
                <Step hl={['p2']}>الفاصولياء الأقل: ٣</Step>
                <Step kind="ans">نعرف عدد كل نوع، والأكثر، والأقل، والفرق بينها.</Step>
              </Solution>
            </QCol>
            <Veg />
          </Cols>
        </>
      ),
    },

    /* ================= كيف أقرأ ================= */
    {
      sec: 'explain', min: 3,
      notes: 'أنا أعمل: أقرأ العنوان، ثم المفتاح، ثم أعدّ الصور.',
      content: (
        <>
          <SlideHead tag="القاعدة" kind="rule">كيف أقرأ التمثيل بالصور؟</SlideHead>
          <Cols>
            <QCol>
              <Ctrls><NextButton label="الخطوة التالية" /></Ctrls>
              <Step><Card kind="rule"><b>١ العنوان:</b> عمَّ يتحدث التمثيل؟ الرياضات التي نلعبها.</Card></Step>
              <Step><Card kind="rule"><b>٢ المفتاح:</b> كل صورة = <Mark>استجابتان</Mark>.</Card></Step>
              <Step hl={['p0']}><Card kind="ex"><b>٣ أعدّ الصور:</b> كرة القدم ٣ صور.</Card></Step>
              <Step hl={['p0']}><Card kind="ex"><b>٤ أستعمل المفتاح:</b> ٢ + ٢ + ٢ = ٦ طلاب.</Card></Step>
            </QCol>
            <Sports />
          </Cols>
        </>
      ),
    },

    /* ================= مقطع فكرة الدرس ================= */
    {
      sec: 'explain', min: 1,
      notes: 'المقطع: العصائر المفضلة (مثال غير مثال الكتاب). أوقفه قبل كل سؤال.',
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
          <SlideHead tag="نعمل معًا" kind="ex">الرياضات التي نلعبها</SlideHead>
          <Cols>
            <QCol>
              <MCQ q="كم طالبًا يلعب كرة السلة؟" options={['٤', '٨', '٦']} answer="٨" award />
              <MCQ q="ما الرياضة الأقل؟" options={['كرة القدم', 'تنس الطاولة', 'كرة الطائرة']} answer="تنس الطاولة" award />
            </QCol>
            <Sports />
          </Cols>
        </>
      ),
    },

    /* ================= أتأكد ١–٧ ================= */
    {
      sec: 'check', min: 1,
      notes: 'عدّ الصفوف.',
      content: (
        <QuestionSlide
          source={CHECK} n={1} time={30}
          intro={USE_ABOVE}
          question="مَا عَدَدُ أَنْوَاعِ الْخَضْرَوَاتِ الْمَعْرُوضَةِ؟"
          hint="أعدّ الصفوف."
          steps={[{ text: '٤ أنواع', hl: ['p0', 'p1', 'p2', 'p3'], kind: 'ans' }]}
          chart={<Veg />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'نجمع.',
      content: (
        <QuestionSlide
          source={CHECK} n={2} time={45}
          question="مَا مَجْمُوعُ الأَشْخَاصِ الَّذِينَ يُفَضِّلُونَ الْبَازِلاءَ وَالْبَطَاطَا؟"
          hint="أعدّ صور البازلاء وصور البطاطا، ثم أجمع."
          steps={[
            { text: 'البازلاء ٦، والبطاطا ٧', hl: ['p0', 'p3'] },
            { text: '٦ + ٧ = ١٣ شخصًا', kind: 'ans' },
          ]}
          chart={<Veg />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: '«كم يزيد» = نطرح.',
      content: (
        <QuestionSlide
          source={CHECK} n={3} time={45}
          question="كَمْ يَزِيدُ عَدَدُ الأَشْخَاصِ الَّذِينَ يُفَضِّلُونَ الذُّرَةَ عَلَى عَدَدِ الَّذِينَ اخْتَارُوا الْفَاصُولْيَاءَ؟"
          hint="«كم يزيد» تعني أطرح."
          steps={[
            { text: 'الذرة ٥، والفاصولياء ٣', hl: ['p1', 'p2'] },
            { text: '٥ − ٣ = ٢ شخصان', kind: 'ans' },
          ]}
          chart={<Veg />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'أقصر صف.',
      content: (
        <QuestionSlide
          source={CHECK} n={4} time={30}
          question="أَيُّ أَنْوَاعِ الْخَضْرَوَاتِ حَصَلَ عَلَى أَقَلِّ عَدَدٍ مِنَ الاسْتِجَابَاتِ؟"
          hint="أبحث عن أقصر صف."
          steps={[{ text: 'الفاصولياء (٣ استجابات)', hl: ['p2'], kind: 'ans' }]}
          chart={<Veg />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'نجمع الأربعة.',
      content: (
        <QuestionSlide
          source={CHECK} n={5} time={60}
          question="مَا عَدَدُ الأَشْخَاصِ الَّذِينَ اسْتَجَابُوا لِسُؤَالِ جَمْعِ الْبَيَانَاتِ؟"
          hint="أجمع صور الصفوف كلها."
          steps={[
            { text: '٦ + ٥ + ٣ + ٧', hl: ['p0', 'p1', 'p2', 'p3'] },
            { text: '٢١ شخصًا', kind: 'ans' },
          ]}
          chart={<Veg />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'اسأل: لو أضفنا الجزر، ماذا نرسم؟',
      content: (
        <QuestionSlide
          source={CHECK} n={6} tps
          question="كَيْفَ سَيُصْبِحُ هَذَا التَّمْثِيلُ إِذَا أَضَفْتُ إِلَيْهِ خِيَارًا آخَرَ؟"
          hint="أين أكتب الخيار الجديد؟"
          steps={[{ text: 'يُزادُ صفٌّ جديدٌ للخيارِ المضافِ، تُرسمُ فيه صورٌ بعددِ استجاباتِه.', kind: 'ans' }]}
          chart={<Veg />}
        />
      ),
    },
    {
      sec: 'check', min: 1,
      notes: 'أتحدث: اقبل كل إجابة معقولة.',
      content: (
        <QuestionSlide
          source={CHECK} n={7} tps tags={[{ kind: 'warn', text: 'أتحدَّثُ' }]}
          question="مَنْ يُمْكِنُهُ أَنْ يَسْتَفِيدَ مِنْ تِلْكَ الْمَعْلُومَاتِ؟"
          hint="من يبيع الخضراوات أو يطبخها؟"
          steps={[{ text: 'بائعُ الخضارِ وصاحبُ المطعمِ؛ ليعرفا الأصنافَ الأكثرَ تفضيلًا فيوفّراها.', kind: 'ans' }]}
          chart={<Veg />}
        />
      ),
    },

    /* ================= أتدرب ٨–١١ ================= */
    {
      sec: 'practice', min: 1,
      notes: 'كل صورة = ٢.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={8} time={30}
          intro={USE}
          question="كَمْ طَالِبًا يَلْعَبُ كُرَةَ الْقَدَمِ؟"
          hint="٣ صور، وكل صورة = ٢."
          steps={[
            { text: '٢ + ٢ + ٢', hl: ['p0'] },
            { text: '٦ طلاب', kind: 'ans' },
          ]}
          chart={<Sports />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: '١٠ طلاب = ٥ صور.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={9} time={30}
          question="مَا الرِّيَاضَةُ الَّتِي يَلْعَبُهَا ١٠ طُلَّابٍ؟"
          hint="كم صورة تمثّل ١٠ طلاب؟"
          steps={[
            { text: '١٠ طلاب = ٥ صور' },
            { text: 'كرة الطائرة', hl: ['p2'], kind: 'ans' },
          ]}
          chart={<Sports />}
        />
      ),
    },
    {
      sec: 'practice', min: 2,
      notes: 'تنس الطاولة ٤، ثم نطرح من ٢٨.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={10} time={60}
          question="إِذَا كَانَ عَدَدُ الطُّلَّابِ الَّذِينَ اسْتَجَابُوا لِسُؤَالِ جَمْعِ الْبَيَانَاتِ هُوَ ٢٨ طَالِبًا، فَكَمْ طَالِبًا لَا يَلْعَبُ تِنِسَ الطَّاوِلَةِ؟"
          hint="كم طالبًا يلعب تنس الطاولة؟ ثم أطرحه من ٢٨."
          steps={[
            { text: 'تنس الطاولة: صورتان = ٤ طلاب', hl: ['p3'] },
            { text: '٢٨ − ٤ = ٢٤ طالبًا', kind: 'ans' },
          ]}
          chart={<Sports />}
        />
      ),
    },
    {
      sec: 'practice', min: 1,
      notes: 'كل صورة = ٢، فالمجموع دائمًا زوجي.',
      content: (
        <QuestionSlide
          source={PRACTICE} n={11} tps
          question="هَلْ مِنَ الْمُمْكِنِ أَنْ يَكُونَ عَدَدُ الطُّلَّابِ الَّذِينَ اسْتَجَابُوا لِسُؤَالِ جَمْعِ الْبَيَانَاتِ هُوَ ٥ فَقَطْ؟ أُوَضِّحُ إِجَابَتِي."
          hint="كل صورة = ٢. هل نصل إلى ٥ بجمع ٢ مرات؟"
          steps={[
            { text: '٢، ٤، ٦، ٨… أعداد زوجية' },
            { text: 'لا؛ لأنَّ كلَّ صورةٍ تمثّلُ استجابتين، فمجموعُ الاستجاباتِ عددٌ زوجيٌّ، و٥ عددٌ فرديٌّ.', kind: 'ans' },
          ]}
          chart={<Sports />}
        />
      ),
    },

    /* ================= مهارات التفكير العليا ١٢ ================= */
    {
      sec: 'hot', min: 2,
      notes: 'أصحح الخطأ: ٧؟ ربما عدّ الصور مع صورة التسمية، أو لم يستعمل المفتاح.',
      content: (
        <QuestionSlide
          source={HOT} n={12} tps tags={[{ kind: 'warn', text: 'أُصَحِّحُ الْخَطَأَ' }]}
          question="أَجَابَ جَمَالٌ عَنِ السُّؤَالِ الثَّامِنِ بِالْعَدَدِ ٧. لِمَاذَا كَانَتْ إِجَابَةُ جَمَالٍ غَيْرَ صَحِيحَةٍ؟ أُصَحِّحُ الإِجَابَةَ."
          hint="هل استعمل جمال المفتاح؟"
          steps={[
            { text: 'لم يستعمل المفتاح؛ فكلُّ صورةٍ تمثّلُ استجابتين.', hl: ['p0'] },
            { text: 'الصواب: ٣ × ٢ = ٦ طلاب', kind: 'ans' },
          ]}
          chart={<Sports />}
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
            center={<>قراءة التمثيل<br />بالصور</>}
            items={[
              { kind: 'rule', cap: 'أقرأ المفتاح', text: 'كم تمثّل كل صورة؟' },
              { kind: 'ex', cap: 'أعدّ', text: 'عدد الصور × ما يمثّله المفتاح.' },
              { kind: 'qs', cap: 'أقارن', text: 'أطول صف = الأكثر، أقصر صف = الأقل.' },
              { kind: 'warn', cap: 'أحسب', text: 'المجموع بالجمع، و«كم يزيد» بالطرح.' },
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
            <PicGraph
              title="الحيوان المفضل"
              cells={5}
              keyText="المفتاح: كل صورة = استجابتان"
              rows={[
                { label: 'القطة', icon: '🐱', n: 4, color: '#fff3b0' },
                { label: 'الحصان', icon: '🐴', n: 2, color: '#fcd9b8' },
                { label: 'الجمل', icon: '🐪', n: 5, color: '#c8e6c9' },
              ]}
            />
            <div className="ticket">
              <Card kind="qs"><span className="lvl">١ · سهل</span><MCQ q="ما الحيوان الأكثر تفضيلًا؟" options={['القطة', 'الحصان', 'الجمل']} answer="الجمل" /></Card>
              <Card kind="qs"><span className="lvl">٢ · متوسط</span><MCQ q="كم طالبًا يفضّل القطة؟" options={['٤', '٨', '٦']} answer="٨" /></Card>
              <Card kind="qs"><span className="lvl">٣ · صعب</span><MCQ q="كم يزيد الجمل على الحصان؟" options={['٣', '٦', '٤']} answer="٦" /></Card>
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
