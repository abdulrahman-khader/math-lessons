import { test, expect, type Page } from '@playwright/test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// فصول الطلاب: تُكتب مرة واحدة وتظهر في كل دروس الصف، والعجلة تدور على الفصل المختار دون تكرار.
const dist = path.resolve(process.cwd(), 'dist');
const url = (f: string) => pathToFileURL(path.join(dist, f)).href;
const G4A = 'g4-3-4-line-graphs.html';
const G4B = 'g4-3-6-probability.html';
const G2 = 'g2-3-7-fact-families.html';
const NAMES = ['أحمد', 'خالد', 'سعد', 'فهد', 'ماجد', 'نايف'];

test.describe.configure({ mode: 'default' });

async function fresh(page: Page, file: string) {
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto(url(file));
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator('#stage')).toBeVisible();
}

const home = (page: Page) => page.locator('section.slide.active .teamset');

test('فصول الصف تُكتب مرة واحدة وتظهر في دروسه الأخرى لا في الصف الآخر', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await fresh(page, G4A);

  await home(page).getByRole('button', { name: 'أضف فصولك وأسماء الطلاب' }).click();
  const box = page.getByRole('dialog', { name: 'فصول الطلاب' });
  await box.getByRole('button', { name: 'إضافة فصل' }).click();
  await box.getByRole('button', { name: 'إضافة فصل' }).click();
  await expect(box.locator('.ccount')).toHaveText('٢');
  await box.locator('.cname').fill('رابع أ');
  await box.locator('#cnames').fill(NAMES.join('\n') + '\n\n' + NAMES[0]); // سطر فارغ واسم مكرر يُتجاهلان
  await expect(box.getByText('٦ طالبًا')).toBeVisible();
  await box.getByRole('button', { name: 'تم' }).click();

  await home(page).getByRole('button', { name: 'رابع أ' }).click();
  await expect(home(page).getByRole('button', { name: 'رابع أ' })).toHaveClass(/sel/);

  // درس آخر من الصف نفسه: الفصل موجود ومختار مسبقًا
  await page.goto(url(G4B));
  await expect(home(page).getByRole('button', { name: 'رابع أ' })).toHaveClass(/sel/);
  await expect(home(page).getByRole('button', { name: 'فصل ٢' })).toBeVisible();

  // الصف الثاني: لا فصول له بعد
  await page.goto(url(G2));
  await expect(home(page).getByRole('button', { name: 'أضف فصولك وأسماء الطلاب' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('التوزيع على الفرق والعجلة على الفصل دون تكرار', async ({ page }) => {
  await fresh(page, G4A);
  await page.evaluate((names) => {
    localStorage.setItem('classes', JSON.stringify({ grades: { g4: { classes: [{ id: 'a', name: 'رابع أ', students: names, team: {} }], last: 'a' } } }));
  }, NAMES);
  await page.reload();

  await home(page).getByRole('button', { name: /توزيع الطلاب/ }).click();
  const groups = page.getByRole('dialog', { name: 'توزيع الطلاب على الفرق' });
  await groups.getByRole('button', { name: 'وزّع عشوائيًا' }).click();
  await expect(groups.getByText('بلا فريق (٠)')).toBeVisible();
  // ضغط اسم ينقله إلى الفريق التالي
  await groups.getByRole('button', { name: 'مسح التوزيع' }).click();
  await groups.getByRole('button', { name: 'أحمد' }).click();
  await expect(groups.locator('.gcol').nth(1).getByRole('button', { name: 'أحمد' })).toBeVisible();
  await groups.getByRole('button', { name: 'تم' }).click();
  await expect(home(page).getByRole('button', { name: 'توزيع الطلاب (١/٦)' })).toBeVisible();

  // العجلة: باقٍ ٦ من ٦، وبعد كل دورة ينقص اسم ولا يتكرر
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'عجلة الأسماء' }).click();
  const wheel = page.getByRole('dialog', { name: 'عجلة الأسماء' });
  await expect(wheel.locator('.wklass')).toContainText('باقٍ ٦ من ٦');
  const seen = new Set<string>();
  for (let i = 0; i < 6; i++) {
    await wheel.getByRole('button', { name: 'أدِر العجلة' }).click();
    await expect(wheel.locator('#wres')).not.toHaveText('…');
    const name = (await wheel.locator('#wres').textContent())!;
    expect(NAMES).toContain(name);
    expect(seen.has(name)).toBe(false);
    seen.add(name);
    await expect(wheel.locator('.wklass')).toContainText(`باقٍ ${'٥٤٣٢١٠'[i]} من ٦`);
  }
  await wheel.getByRole('button', { name: 'أرجع كل الأسماء (٦)' }).click();
  await expect(wheel.locator('.wklass')).toContainText('باقٍ ٦ من ٦');

  // فلتر الفريق: الفريق الأول فيه أحمد فقط
  await wheel.locator('.wteams').getByRole('button').nth(1).click();
  await expect(wheel.locator('.wklass')).toContainText('باقٍ ١ من ١');
  await wheel.getByRole('button', { name: 'أدِر العجلة' }).click();
  await expect(wheel.locator('#wres')).toHaveText('أحمد');
});
