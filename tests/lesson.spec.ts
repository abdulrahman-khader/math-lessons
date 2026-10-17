import { test, expect, type Page } from '@playwright/test';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// يفحص كل درس مبني في dist/. شغّل `npm run build` أولًا (npm test يفعل ذلك).
const dist = path.resolve(process.cwd(), 'dist');
const files = readdirSync(dist).filter((f) => f.endsWith('.html') && f !== 'index.html');

async function open(page: Page, file: string, errors: string[]) {
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));
  await page.goto(pathToFileURL(path.join(dist, file)).href);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator('#stage')).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

const slideCount = (page: Page) => page.locator('section.slide').count();

async function goTo(page: Page, i: number) {
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.keyboard.press('Home');
  for (let k = 0; k < i; k++) await page.keyboard.press('ArrowLeft');
  const slide = page.locator('section.slide.active');
  await expect(slide).toHaveAttribute('data-index', String(i));
  return slide;
}

/** يفتح التلميح (قبل الحل)، ثم يُظهر كل الخطوات (يُغلق التلميح تلقائيًا). يعيد الحالتين للفحص. */
async function eachState(page: Page, i: number, check: (state: string) => Promise<void>) {
  const slide = await goTo(page, i);
  const hint = slide.locator('.btn.hint');
  if (await hint.count()) {
    await hint.first().click();
    await page.waitForTimeout(350);
    await check('التلميح مفتوح');
  }
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  for (let k = 0; k < 15; k++) await page.keyboard.press('Space');
  await page.waitForTimeout(350); // انتهاء حركة الظهور
  await check('كل الخطوات ظاهرة');
  return slide;
}

const showAll = (page: Page, i: number) => eachState(page, i, async () => {});

for (const file of files) {
  test.describe(file, () => {
    test('يفتح دون أخطاء', async ({ page }) => {
      const errors: string[] = [];
      await open(page, file, errors);
      const n = await slideCount(page);
      for (let i = 0; i < n; i++) await showAll(page, i);
      expect(errors).toEqual([]);
    });

    test('لا تفيض أي شريحة على مسرح ١٦٠٠×٩٠٠ (مع التلميح، ومع كل الخطوات)', async ({ page }) => {
      await page.setViewportSize({ width: 1600, height: 900 });
      await open(page, file, []);
      const n = await slideCount(page);
      const overflow: string[] = [];
      for (let i = 0; i < n; i++) {
        await eachState(page, i, async (state) => {
          const { sh, ch } = await page.locator('section.slide.active').evaluate((el) => ({ sh: el.scrollHeight, ch: el.clientHeight }));
          if (sh > ch + 1) overflow.push(`الشريحة ${i + 1} (${state}): ${sh - ch}px زائدة`);
        });
      }
      expect(overflow).toEqual([]);
    });

    test('كل الأرقام الظاهرة هندية-عربية (٠–٩)', async ({ page }) => {
      await open(page, file, []);
      const n = await slideCount(page);
      const bad: string[] = [];
      for (let i = 0; i < n; i++) {
        const slide = await showAll(page, i);
        const text = await page.locator('#stage').innerText();
        const svgText = await slide.evaluate((el) => [...el.querySelectorAll('svg text')].map((t) => t.textContent).join(' '));
        for (const m of (text + ' ' + svgText).matchAll(/.{0,15}[0-9].{0,15}/g)) bad.push(`الشريحة ${i + 1}: «${m[0]}»`);
      }
      expect([...new Set(bad)]).toEqual([]);
    });

    test('كل أسئلة الكتاب موجودة بالترتيب', async ({ page }) => {
      await open(page, file, []);
      const expected = Number(await page.locator('#app').getAttribute('data-book-questions'));
      const nums = await page.locator('[data-qnum]').evaluateAll((els) => els.map((e) => Number(e.getAttribute('data-qnum'))));
      expect(nums).toEqual(Array.from({ length: expected }, (_, i) => i + 1));
    });

    test('على الجوال: لا تمرير أفقي في أي شريحة', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await open(page, file, []);
      const n = await slideCount(page);
      const wide: string[] = [];
      for (let i = 0; i < n; i++) {
        await showAll(page, i);
        const w = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        if (w > 1) wide.push(`الشريحة ${i + 1}: ${w}px`);
      }
      expect(wide).toEqual([]);
    });
  });
}
