import { test, expect, type Page } from '@playwright/test';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { tally, topRows, weekStart, type StarEvent } from '../src/engine/stars';

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
  // تعادل في الثاني: الذي بعدهما ثالث، فيصير النجوم ستة
  give('سلطان', 7, 0);
  const tied = topRows(tally(ev, 'a', ['سعد', 'علي', 'فهد', 'خالد', 'عمر', 'زياد', 'بدر', 'ماجد', 'ريان', 'سلطان'], from));
  expect(tied.map((r) => [r.name, r.rank])).toEqual([
    ['سعد', 1],
    ['ريان', 2],
    ['سلطان', 2],
    ['علي', 3],
    ['خالد', 4],
    ['فهد', 5],
  ]);
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

const card = (page: Page, name: string) => page.locator('.scard', { has: page.locator('.sname', { hasText: new RegExp(`^${name}$`) }) });

test('لوحة النجوم: نجمة وغلطة ومجموع وتراجع، وتبقى بعد إعادة الفتح', async ({ page }) => {
  const errors: string[] = [];
  await openWithClass(page, errors);
  await page.getByRole('button', { name: 'نجم الأسبوع' }).click();
  const box = page.locator('.sbox');
  await box.getByRole('button', { name: 'هذا الأسبوع' }).click();
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
  await page.getByRole('button', { name: 'نجم الأسبوع' }).click();
  await box.getByRole('button', { name: 'هذا الأسبوع' }).click();
  await expect(card(page, 'محمد').locator('.stot')).toHaveText('٢');
  // الترتيب حتى الآن: منصة هذا الأسبوع في أي يوم
  await box.getByRole('button', { name: 'الترتيب حتى الآن' }).click();
  await box.getByRole('button', { name: 'أظهر الكل' }).click();
  await expect(page.locator('.p1 .pwho b')).toHaveText('محمد');
  await expect(page.locator('.pwho')).toHaveCount(1);
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
  await page.getByRole('button', { name: 'نجم الأسبوع' }).click();
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

test('العجلة: نجمة لمن خرج اسمه تظهر في لوحة النجوم', async ({ page }) => {
  const errors: string[] = [];
  await openWithClass(page, errors);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'عجلة الأسماء' }).click();
  await page.getByRole('button', { name: 'أدِر العجلة' }).click();
  await expect(page.locator('.wstar .sb.up')).toBeVisible();
  const name = (await page.locator('#wres').textContent())!;
  await page.locator('.wstar .sb.up').click();
  await expect(page.locator('.wgiven')).toHaveText('+١');
  await page.getByRole('button', { name: 'إغلاق' }).click();
  await page.getByRole('button', { name: 'نجم الأسبوع' }).click();
  await page.locator('.sbox').getByRole('button', { name: 'هذا الأسبوع' }).click();
  await expect(card(page, name).locator('.stot')).toHaveText('١');
  expect(errors).toEqual([]);
});
