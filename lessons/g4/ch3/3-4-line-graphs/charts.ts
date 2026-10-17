import { defineChart } from '@engine';

// بيانات الرسوم. قيم أسئلة الكتاب من الكتاب ودليل المعلم؛ لا تُغيَّر.

/** الدرس السابق ٣-٣ */
export const heights = defineChart({
  mode: 'bars',
  title: 'أطوال طلاب الصف الرابع',
  labels: ['١٣٠', '١٣٥', '١٤٠', '١٤٥', '١٥٠', '١٥٥', '١٦٠'],
  values: [2, 0, 3, 7, 5, 0, 3],
  min: 0, max: 10, grid: 1, lab: 1,
  yTitle: 'عدد الطلاب', xTitle: 'الطول بالسنتمترات',
});

export const bean = defineChart({
  title: 'طول نبتة الفول',
  labels: ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس'],
  values: [2, 4, 9, 11, 13],
  min: 0, max: 14, grid: 1, lab: 2,
  yTitle: 'الطول (سم)', xTitle: 'الأسبوع',
});

/** استعد ومثال ١ · ص ٨٧ */
export const temp = defineChart({
  title: 'درجاتُ الحرارةِ في مدينةِ الرياض',
  labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
  values: [42, 43, 44, 44, 42, 40, 41],
  min: 39, max: 44.6, grid: 1, gridFrom: 40, lab: 1, labFrom: 40, brk: true,
  yTitle: 'درجة الحرارة', xTitle: 'اليوم', xfs: 19,
});

/** تأكد ١–٦ · ص ٨٨ */
export const bus = defineChart({
  title: 'عددُ الطلابِ الذين استقلّوا الحافلةَ المدرسية',
  labels: ['١٤٣٧', '١٤٣٨', '١٤٣٩', '١٤٤٠'],
  values: [250, 150, 125, 225],
  min: 0, max: 250, grid: 25, lab: 50, vgrid: true,
  yTitle: 'عدد الطلاب', xTitle: 'الأعوام', line: '#13213b',
});

/** تدرب ٧–١٠ · ص ٨٨–٨٩. الأسبوع الثاني ١٦٥٠ حسب دليل المعلم (بين خطّي الشبكة) */
export const visit = defineChart({
  title: 'عددُ زوّارِ معرضِ مركزِ الملكِ عبدالعزيزِ الثقافي',
  labels: ['الأول', 'الثاني', 'الثالث', 'الرابع'],
  values: [3500, 1650, 500, 2750],
  min: 0, max: 4000, grid: 250, lab: 500,
  yTitle: 'عدد الزوّار', xTitle: 'الأسبوع', line: '#13213b', ml: 118,
});

/** مهارات التفكير العليا ١١–١٢ · ص ٨٩: النقطة «ل» ناقصة */
export const open = defineChart({
  labels: ['أ', 'ب', 'ج', 'د', 'ل'],
  values: [3, 3, 5, 7, null],
  min: 0, max: 10, grid: 1, lab: 1, line: '#13213b',
});

export const club = defineChart({
  title: 'عدد الحاضرين في النادي الرياضي',
  labels: ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس'],
  values: [15, 20, 20, 10, 25],
  min: 0, max: 30, grid: 5, lab: 5,
  yTitle: 'عدد الطلاب', xTitle: 'الأسبوع',
});

export const lib = defineChart({
  title: 'الكتب المستعارة من مكتبة المدرسة',
  labels: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
  values: [12, 18, 18, 9, 15],
  min: 0, max: 21, grid: 3, lab: 3,
  yTitle: 'عدد الكتب', xTitle: 'اليوم',
});

export const explore = defineChart({
  title: 'قوارير الماء المبيعة في المقصف',
  labels: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
  values: [20, 35, 30, 30, 45],
  min: 0, max: 50, grid: 5, lab: 10, cube: 5,
  yTitle: 'عدد القوارير', xTitle: 'اليوم',
});
