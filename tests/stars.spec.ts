import { test, expect, type Page } from '@playwright/test';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { tally, teamStarCounts, topRows, weekStart, type StarEvent } from '../src/engine/stars';

// نجم الأسبوع: حساب الأسبوع والرتب، ثم اللوحة والعجلة في درس واحد من الصف الثاني
const dist = path.resolve(process.cwd(), 'dist');
const file = readdirSync(dist).find((f) => f.startsWith('g2-') && f.endsWith('.html'))!;

const at = (y: number, m: number, d: number, h = 10) => new Date(y, m - 1, d, h).getTime();

test('الأسبوع يبدأ يوم الخميس منتصف الليل', () => {
  // ٢٢ أكتوبر ٢٠٢٦ خميس
  const thu = at(2026, 10, 22, 0);
  expect(weekStart(at(2026, 10, 22, 0))).toBe(thu);
  expect(weekStart(at(2026, 10, 24))).toBe(thu); // السبت
  expect(weekStart(at(2026, 10, 28, 23))).toBe(thu); // الأربعاء آخر الليل
  expect(weekStart(at(2026, 10, 29, 0))).toBe(at(2026, 10, 29, 0)); // الخميس التالي أسبوع جديد
  expect(weekStart(at(2026, 10, 21, 23))).toBe(at(2026, 10, 15, 0)); // الأربعاء قبله من الأسبوع الماضي
});

test('المجموع = النجوم − الأغلاط، والتعادل يتقدّم فيه الأقل أغلاطًا، ونجوم الأسبوع حتى الخامس', () => {
  const from = at(2026, 10, 22, 0);
  const ev: StarEvent[] = [];
  const give = (s: string, stars: number, mistakes: number) => {
    for (let i = 0; i < stars; i++) ev.push({ t: from + 1000 + i, k: 'a', s, d: 1 });
    for (let i = 0; i < mistakes; i++) ev.push({ t: from + 2000 + i, k: 'a', s, d: -1 });
  };
  give('سعد', 9, 1); // ٨
  give('علي', 8, 1); // ٧
  give('فهد', 8, 2); // ٦، أغلاط ٢
  give('خالد', 6, 0); // ٦، أغلاط ٠: يسبق فهد
  give('عمر', 5, 0); // ٥
  give('زياد', 5, 0); // ٥: متعادل مع عمر في الخامس
  give('بدر', 4, 0); // ٤: خارج النجوم
  give('ريان', 7, 0); // ٧ بلا أغلاط: يسبق علي، والمتعادلان بعده لا يتركان فجوة
  give('ماجد', 1, 3); // لا ينزل تحت الصفر
  ev.push({ t: from - 1, k: 'a', s: 'بدر', d: 1 }); // الأسبوع الماضي لا يُحسب
  ev.push({ t: from + 5000, k: 'b', s: 'بدر', d: 1 }); // فصل آخر لا يُحسب
  const rows = tally(ev, 'a', ['سعد', 'علي', 'فهد', 'خالد', 'عمر', 'زياد', 'بدر', 'ماجد', 'ريان', 'سلطان'], from);
  const by = Object.fromEntries(rows.map((r) => [r.name, r]));
  expect(by['ماجد'].total).toBe(0);
  expect(by['بدر'].stars).toBe(4);
  expect(topRows(rows).map((r) => [r.name, r.rank])).toEqual([
    ['سعد', 1],
    ['ريان', 2],
    ['علي', 3],
    ['خالد', 4],
    ['فهد', 5],
  ]);
  // تعادل في الثاني: يكتمل الخمسة عند الرابع، فلا يدخل فهد الخامس
  give('سلطان', 7, 0);
  const names = ['سعد', 'علي', 'فهد', 'خالد', 'عمر', 'زياد', 'بدر', 'ماجد', 'ريان', 'سلطان'];
  const tied = topRows(tally(ev, 'a', names, from));
  expect(tied.map((r) => [r.name, r.rank])).toEqual([
    ['سعد', 1],
    ['ريان', 2],
    ['سلطان', 2],
    ['علي', 3],
    ['خالد', 4],
  ]);
  // طالبان في الأول وستة في الثاني: ثمانية نجوم فقط، ولا أحد في الثالث
  const ev2: StarEvent[] = [];
  const add = (s: string, n: number) => {
    for (let i = 0; i < n; i++) ev2.push({ t: from + 1000 + i, k: 'a', s, d: 1 });
  };
  ['سعد', 'علي'].forEach((s) => add(s, 9));
  ['فهد', 'خالد', 'عمر', 'زياد', 'بدر', 'ماجد'].forEach((s) => add(s, 5));
  add('ريان', 3);
  const eight = topRows(tally(ev2, 'a', names, from));
  expect(eight).toHaveLength(8);
  expect(eight.filter((r) => r.rank === 1)).toHaveLength(2);
  expect(eight.filter((r) => r.rank === 2)).toHaveLength(6);
});

async function openWithClass(page: Page, errors: string[]) {
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  await page.goto(pathToFileURL(path.join(dist, file)).href);
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('classes', JSON.stringify({ grades: { g2: { last: 'k1', classes: [{ id: 'k1', name: 'الفصل الأول', students: ['محمد', 'أحمد', 'خالد'], team: {} }] } } }));
  });
  await page.reload();
  await expect(page.locator('#stage')).toBeVisible();
}

/** أداة من رأس الدرس: في التصميم الجديد داخل قائمة ⋯ */
async function openTool(page: Page, name: string) {
  if (await page.locator('.v2dots').count()) {
    await page.locator('.v2dots').click();
    await page.getByRole('menuitem', { name, exact: true }).click();
  } else await page.getByRole('button', { name }).click();
}

const card = (page: Page, name: string) => page.locator('.scard', { has: page.locator('.sname', { hasText: new RegExp(`^${name}$`) }) });

test('لوحة النجوم: نجمة وغلطة ومجموع وتراجع، وتبقى بعد إعادة الفتح', async ({ page }) => {
  const errors: string[] = [];
  await openWithClass(page, errors);
  await openTool(page, 'نجم الأسبوع');
  const box = page.locator('.sbox');
  await box.getByRole('button', { name: 'هذا الأسبوع' }).click();
  // الأعداد مخفية حتى يُظهرها المعلم
  await expect(card(page, 'محمد').locator('.stot')).toHaveText('؟');
  await expect(card(page, 'محمد').locator('.scount')).toHaveCount(0);
  await box.getByRole('button', { name: 'إظهار النجوم' }).click();
  const star = (n: string) => box.locator(`[aria-label="نجمة لـ${n}"]`);
  const miss = (n: string) => box.locator(`[aria-label="غلطة على ${n}"]`);
  for (let i = 0; i < 3; i++) await star('محمد').click();
  await miss('محمد').click();
  await expect(card(page, 'محمد').locator('.stot')).toHaveText('٢');
  await expect(card(page, 'محمد').locator('.scount')).toContainText('٣');
  await miss('أحمد').click();
  await expect(card(page, 'أحمد').locator('.stot')).toHaveText('٠');
  await box.getByRole('button', { name: /تراجع عن آخر ضغطة: غلطة على أحمد/ }).click();
  await expect(card(page, 'أحمد').locator('.scount')).toContainText('✖ ٠');
  await page.reload();
  await openTool(page, 'نجم الأسبوع');
  await box.getByRole('button', { name: 'هذا الأسبوع' }).click();
  await expect(card(page, 'محمد').locator('.stot')).toHaveText('؟'); // تعود مخفية عند كل فتح
  await box.getByRole('button', { name: 'إظهار النجوم' }).click();
  await expect(card(page, 'محمد').locator('.stot')).toHaveText('٢');
  // الترتيب حتى الآن: منصة هذا الأسبوع في أي يوم
  await box.getByRole('button', { name: 'الترتيب حتى الآن' }).click();
  await box.getByRole('button', { name: 'أظهر الكل' }).click();
  await expect(page.locator('.p1 .pwho b')).toHaveText('محمد');
  await expect(page.locator('.pwho')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('النجمة والغلطة تُعلنان على الشاشة باسم الطالب', async ({ page }) => {
  const errors: string[] = [];
  await openWithClass(page, errors);
  await openTool(page, 'نجم الأسبوع');
  const box = page.locator('.sbox');
  await box.getByRole('button', { name: 'هذا الأسبوع' }).click();
  await box.locator('[aria-label="غلطة على أحمد"]').click();
  await expect(page.locator('.cheer.bad .cheer-name')).toHaveText('أحمد');
  await expect(page.locator('.cheer.bad .cheer-msg')).toHaveCount(0); // الاسم وحده، بلا كلمة «غلطة»
  await box.locator('[aria-label="نجمة لـخالد"]').click();
  await expect(page.locator('.cheer.bad')).toHaveCount(0);
  await box.locator('[aria-label="نجمة لـخالد"]').click();
  await expect(page.locator('.cheer-name')).toHaveText('خالد');
  await expect(page.locator('.cheer-week')).toHaveCount(0); // بلا عدد النجوم
  await expect(page.locator('.cheer')).toHaveCount(0, { timeout: 5000 });
  expect(errors).toEqual([]);
});

test('منصة نجوم الأسبوع الماضي مرتّبة، وتُكشف من المركز الأخير إلى الأول', async ({ page }) => {
  const errors: string[] = [];
  await openWithClass(page, errors);
  await page.evaluate(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() - 4 + 7) % 7) - 3); // الاثنين الماضي
    const t = d.getTime() + 10 * 3600e3;
    const ev = [
      ...Array.from({ length: 3 }, (_, i) => ({ t: t + i, k: 'k1', s: 'خالد', d: 1 })),
      ...Array.from({ length: 5 }, (_, i) => ({ t: t + 10 + i, k: 'k1', s: 'أحمد', d: 1 })),
      { t: t + 20, k: 'k1', s: 'أحمد', d: -1 },
    ];
    localStorage.setItem('stars', JSON.stringify({ events: ev }));
  });
  await page.reload();
  await openTool(page, 'نجم الأسبوع');
  await page.locator('.sbox').getByRole('button', { name: 'نجوم الأسبوع الماضي' }).click();
  // مخفية في البداية
  await expect(page.locator('.pstep.on')).toHaveCount(0);
  await expect(page.locator('.p1 .pwho b')).toHaveText('؟');
  await page.getByRole('button', { name: 'ابدأ من المركز الأخير' }).click();
  await expect(page.locator('.p2 .pwho b')).toHaveText('خالد');
  await expect(page.locator('.p1 .pwho b')).toHaveText('؟');
  await page.keyboard.press('Space');
  await expect(page.locator('.p1 .pwho b')).toHaveText('أحمد');
  await expect(page.getByRole('button', { name: 'أظهر التالي' })).toBeDisabled();
  await expect(page.locator('.p3 .pwho')).toHaveCount(0); // محمد بلا نجوم لا يدخل
  expect(errors).toEqual([]);
});

test('العجلة على شاشة الفصل: الاسم الفائز كبير، وتُغلق بلمسة خارجها', async ({ page }) => {
  const errors: string[] = [];
  await openWithClass(page, errors);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openTool(page, 'عجلة الأسماء');
  const wheel = page.getByRole('dialog', { name: 'عجلة الأسماء' });
  await expect(wheel.locator('.wname')).toHaveText('؟');
  await wheel.getByRole('button', { name: 'أدِر العجلة' }).click();
  await expect(wheel.locator('.wname.done')).toBeVisible();
  expect(['محمد', 'أحمد', 'خالد']).toContain(await wheel.locator('.wname').textContent());
  await wheel.click({ position: { x: 5, y: 5 } });
  await expect(wheel).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('المنصة: عمود لكل طالب، والمتعادلون بالمركز نفسه، وأول خمسة مع من تعادل معهم', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(pathToFileURL(path.join(dist, file)).href);
  const names = ['سعد', 'علي', 'فهد', 'خالد', 'عمر', 'زياد', 'بدر', 'ماجد', 'ريان'];
  await page.evaluate((names) => {
    localStorage.clear();
    localStorage.setItem('classes', JSON.stringify({ grades: { g2: { last: 'k1', classes: [{ id: 'k1', name: 'الفصل الأول', students: names, team: {} }] } } }));
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() - 4 + 7) % 7) - 3); // من الأسبوع الماضي
    const t = d.getTime() + 10 * 3600e3;
    const ev: { t: number; k: string; s: string; d: number }[] = [];
    const add = (s: string, n: number) => {
      for (let i = 0; i < n; i++) ev.push({ t: t + ev.length, k: 'k1', s, d: 1 });
    };
    names.slice(0, 2).forEach((s) => add(s, 9)); // طالبان في الأول
    names.slice(2, 8).forEach((s) => add(s, 5)); // ستة في الثاني
    add(names[8], 3); // الثالث: لا يظهر
    localStorage.setItem('stars', JSON.stringify({ events: ev }));
  }, names);
  await page.reload();
  await openTool(page, 'نجم الأسبوع');
  await page.locator('.sbox').getByRole('button', { name: 'نجوم الأسبوع الماضي' }).click();
  await expect(page.locator('.pstep')).toHaveCount(8);
  await page.getByRole('button', { name: 'ابدأ من المركز الأخير' }).click();
  await expect(page.locator('.pstep.on')).toHaveCount(1);
  await page.getByRole('button', { name: 'أظهر الكل' }).click();
  await expect(page.locator('.pstep.p1.on')).toHaveCount(2);
  await expect(page.locator('.pstep.p2.on')).toHaveCount(6);
  await expect(page.locator('.pstep.p3')).toHaveCount(0);
  await expect(page.locator('.pwho b', { hasText: 'ريان' })).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('صفحة نجم الأسبوع من قائمة الدروس: الصف والفصل والنجوم دون فتح درس', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(pathToFileURL(path.join(dist, 'index.html')).href);
  await expect(page.locator('a.stars')).toHaveAttribute('href', 'stars.html');
  await page.goto(pathToFileURL(path.join(dist, 'stars.html')).href);
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('classes', JSON.stringify({ grades: { g2: { last: 'k1', classes: [{ id: 'k1', name: 'الفصل الأول', students: ['محمد', 'أحمد'], team: {} }] }, g4: { classes: [{ id: 'k4', name: 'رابع أ', students: ['سعد'], team: {} }] } } }));
  });
  await page.reload();
  await page.getByRole('button', { name: 'الصف الثاني' }).click();
  const box = page.locator('.sbox');
  await box.getByRole('button', { name: 'هذا الأسبوع' }).click();
  await expect(card(page, 'محمد').locator('.stot')).toHaveText('؟');
  await box.locator('[aria-label="نجمة لـمحمد"]').click();
  await expect(page.locator('.cheer-name')).toHaveText('محمد');
  await box.getByRole('button', { name: 'إظهار النجوم' }).click();
  await expect(card(page, 'محمد').locator('.stot')).toHaveText('١');
  // الصف الرابع: فصله الوحيد يُختار تلقائيًا
  await page.getByRole('button', { name: 'الصف الرابع' }).click();
  await expect(card(page, 'سعد')).toBeVisible();
  // النجمة نفسها تظهر في درس من الصف الثاني
  await page.goto(pathToFileURL(path.join(dist, file)).href);
  await openTool(page, 'نجم الأسبوع');
  await box.getByRole('button', { name: 'هذا الأسبوع' }).click();
  await box.getByRole('button', { name: 'إظهار النجوم' }).click();
  await expect(card(page, 'محمد').locator('.stot')).toHaveText('١');
  expect(errors).toEqual([]);
});

test('سجل الأسابيع: كل الأسابيع محفوظة ولا يُحذف منها شيء، ونسخة احتياطية تُسترجع', async ({ page }) => {
  const errors: string[] = [];
  await openWithClass(page, errors);
  // نجوم قبل ٣٠ أسبوعًا وقبل أسبوعين، لطالب حُذف اسمه من الفصل بعد ذلك
  await page.evaluate(() => {
    const w = 7 * 86400000;
    const now = Date.now();
    const ev = [
      ...Array.from({ length: 3 }, (_, i) => ({ t: now - 30 * w + i, k: 'k1', s: 'محمد', d: 1 })),
      ...Array.from({ length: 2 }, (_, i) => ({ t: now - 2 * w + i, k: 'k1', s: 'سالم', d: 1 })),
    ];
    localStorage.setItem('stars', JSON.stringify({ events: ev }));
  });
  await page.reload();
  await openTool(page, 'نجم الأسبوع');
  const box = page.locator('.sbox');
  // نجمة جديدة هذا الأسبوع لا تحذف الأسابيع القديمة
  await box.getByRole('button', { name: 'هذا الأسبوع' }).click();
  await box.locator('[aria-label="نجمة لـأحمد"]').click();
  await expect(page.locator('.cheer')).toHaveCount(0, { timeout: 6000 });
  await box.getByRole('button', { name: 'سجل الأسابيع' }).click();
  await expect(box.locator('.sweeks li')).toHaveCount(2);
  await expect(box.locator('.sweeks li').last()).toContainText('محمد');
  await expect(box.locator('.sweeks li').first()).toContainText('سالم');
  await expect(box.locator('.scounts')).toContainText('محمد');
  // كل طلاب الفصل في الأسبوع، لا الفائزون فقط
  await expect(box.locator('.sweeks li').first().locator('.srest')).toContainText('أحمد');
  await expect(box.locator('.scounts tr')).toHaveCount(4);
  const kept = await page.evaluate(() => JSON.parse(localStorage.getItem('stars')!).events.length);
  expect(kept).toBe(6);
  // أسبوع من السجل يُفتح على منصته
  await box.locator('.sweeks li').last().locator('button').click();
  await box.getByRole('button', { name: 'أظهر الكل' }).click();
  await expect(page.locator('.p1 .pwho b')).toHaveText('محمد');
  // النسخة الاحتياطية تُنزَّل، وتُسترجع على جهاز فارغ
  await box.getByRole('button', { name: 'كل الأسابيع' }).click();
  const dl = page.waitForEvent('download');
  await box.getByRole('button', { name: 'تنزيل نسخة احتياطية' }).click();
  const file = await (await dl).path();
  await page.evaluate(() => localStorage.removeItem('stars'));
  await page.reload();
  await openTool(page, 'نجم الأسبوع');
  await box.getByRole('button', { name: 'سجل الأسابيع' }).click();
  await box.locator('input[type=file]').setInputFiles(file!);
  await expect(box).toContainText('استُرجع ٦ ضغطات');
  await page.waitForLoadState('load');
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('stars') ?? '{"events":[]}').events.length)).toBe(6);
  expect(errors).toEqual([]);
});

test('من أخذ ٣ أغلاط لا يدخل نجوم الأسبوع، والغياب يفصل بين المتعادلين فقط', () => {
  const from = at(2026, 10, 22, 0);
  const ev: StarEvent[] = [];
  const give = (s: string, stars: number, mistakes = 0, absences = 0) => {
    for (let i = 0; i < stars; i++) ev.push({ t: from + 1000 + i, k: 'a', s, d: 1 });
    for (let i = 0; i < mistakes; i++) ev.push({ t: from + 2000 + i, k: 'a', s, d: -1 });
    for (let i = 0; i < absences; i++) ev.push({ t: from + 3000 + i, k: 'a', s, d: 0 });
  };
  give('سعد', 12, 3); // ٩، لكن ٣ أغلاط: محروم
  give('علي', 6, 0, 2); // ٦ وغاب يومين
  give('فهد', 6); // ٦ ولم يغب: يسبق عليًّا
  give('خالد', 9, 0, 3); // ٩: الغياب لا ينقص مجموعه
  const rows = tally(ev, 'a', ['سعد', 'علي', 'فهد', 'خالد'], from);
  const by = Object.fromEntries(rows.map((r) => [r.name, r]));
  expect(by['سعد'].barred).toBe(true);
  expect(by['خالد'].total).toBe(9);
  expect(topRows(rows).map((r) => [r.name, r.rank])).toEqual([
    ['خالد', 1],
    ['فهد', 2],
    ['علي', 3],
  ]);
});

test('من أخذ ٣ أغلاط تظهر بطاقته بعلامة الحرمان بعد «إظهار النجوم»', async ({ page }) => {
  const errors: string[] = [];
  await openWithClass(page, errors);
  await openTool(page, 'نجم الأسبوع');
  const box = page.locator('.sbox');
  await box.getByRole('button', { name: 'هذا الأسبوع' }).click();
  for (let i = 0; i < 3; i++) await box.locator('[aria-label="غلطة على أحمد"]').click();
  await expect(card(page, 'أحمد')).not.toHaveClass(/barred/); // مخفية حتى يُظهرها المعلم
  await box.getByRole('button', { name: 'إظهار النجوم' }).click();
  await expect(card(page, 'أحمد')).toHaveClass(/barred/);
  await expect(card(page, 'أحمد')).toContainText('لا يدخل نجم الأسبوع');
  expect(errors).toEqual([]);
});

test('نجوم الفرق: الأول بعدد الفرق، ثم أقل بنجمة، والمتعادلون سواء', () => {
  expect(teamStarCounts([5, 9, 9, 2])).toEqual([3, 4, 4, 2]);
  expect(teamStarCounts([1, 7, 4])).toEqual([1, 3, 2]);
  expect(teamStarCounts([0, 0])).toEqual([2, 2]);
});

test('العجلة مع الفرق: يغيب فريق من خرج اسمه حتى تأخذ كل الفرق دورها، والفريق الأصغر يعيد طالبًا', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  await page.goto(pathToFileURL(path.join(dist, file)).href);
  const team: Record<string, number> = { أ1: 0, أ2: 0, أ3: 0, ب1: 1, ب2: 1 };
  await page.evaluate((team) => {
    localStorage.clear();
    localStorage.setItem('classes', JSON.stringify({ grades: { g2: { last: 'k1', classes: [{ id: 'k1', name: 'ف', students: Object.keys(team), team } ] } } }));
  }, team);
  await page.reload();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openTool(page, 'عجلة الأسماء');
  const wheel = page.getByRole('dialog', { name: 'عجلة الأسماء' });
  const picks: string[] = [];
  for (let i = 0; i < 6; i++) {
    // بعد اسم من فريق: العجلة على الفريق الآخر وحده
    if (i % 2) expect(await wheel.getAttribute('data-left')).toBe(String(i === 1 ? (team[picks[0]] ? 3 : 2) : i === 3 ? (team[picks[2]] ? 2 : 1) : team[picks[4]] ? 1 : 2));
    await page.keyboard.press('Space');
    await page.waitForTimeout(300);
    await expect(wheel.locator('.wname.done')).toBeVisible();
    picks.push((await wheel.locator('.wname').textContent())!);
  }
  // كل جولة فيها اسم من كل فريق
  for (let r = 0; r < 3; r++) expect(new Set(picks.slice(r * 2, r * 2 + 2).map((n) => team[n])).size).toBe(2);
  // أسماء الفريق الأول لا تتكرر؛ الفريق الثاني (اثنان) يعيد واحدًا في الجولة الثالثة
  expect(new Set(picks.filter((n) => team[n] === 0)).size).toBe(3);
  expect(picks.filter((n) => team[n] === 1)).toHaveLength(3);
  // خرجت كل الأسماء ثم تُغلق العجلة وحدها وتعود إلى الدرس
  await expect(wheel).toHaveAttribute('data-left', '0');
  await expect(wheel).toHaveCount(0, { timeout: 5000 });
  expect(errors).toEqual([]);
});
