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

    test('إعادة الشريحة تمحو الخطوات والإجابات', async ({ page }) => {
      await open(page, file, []);
      const n = await slideCount(page);
      for (let i = 1; i < n; i++) {
        const slide = await goTo(page, i);
        const hasStep = (await slide.locator('.step').count()) > 0;
        const hasMcq = (await slide.locator('.mcq').count()) > 0;
        if (!hasStep && !hasMcq) continue;
        await page.keyboard.press('Space');
        if (hasMcq) await slide.locator('.mcq .opts button').first().click();
        const before = await slide.locator('.step.shown, .mcq .fb.ok, .mcq .fb.no').count();
        expect(before, `الشريحة ${i + 1}: لم يتغير شيء قبل الإعادة`).toBeGreaterThan(0);
        await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
        await page.keyboard.press('r');
        const after = page.locator('section.slide.active');
        await expect(after.locator('.step.shown, .mcq .fb.ok, .mcq .fb.no, .opts button.right, .opts button.wrong')).toHaveCount(0);
        // الخطوات تعمل بعد الإعادة
        if (hasStep) {
          await page.keyboard.press('Space');
          await expect(after.locator('.step.shown')).not.toHaveCount(0);
        }
      }
    });

    test('«بدون» فرق يخفي النقاط وأزرار النجوم', async ({ page }) => {
      await open(page, file, []);
      await page.locator('.teamset .btn', { hasText: 'بدون' }).click();
      await expect(page.locator('#teams .team')).toHaveCount(0);
      await expect(page.locator('.teamset input')).toHaveCount(0);
      const n = await slideCount(page);
      for (let i = 1; i < n; i++) {
        const slide = await goTo(page, i);
        const q = slide.locator('.mcq:has(.award), .mcq').first();
        if (!(await q.count())) continue;
        for (const b of await q.locator('.opts button').all()) await b.click();
        await expect(slide.locator('.award')).toHaveCount(0);
      }
      await expect(page.locator('#winner')).toHaveCount(0);
    });

    // iPad أفقي وعمودي، iPad Pro، شاشات الحاسب الصغيرة، والسبورة
    for (const [w, h] of [[1180, 820], [820, 1180], [1024, 768], [1366, 1024], [1280, 720], [1920, 1080]]) {
      test(`المسرح كله داخل الشاشة ومتوسط عند ${w}×${h}`, async ({ page }) => {
        await page.setViewportSize({ width: w, height: h });
        await open(page, file, []);
        const box = (await page.locator('#stage').boundingBox())!;
        expect(box.x).toBeGreaterThanOrEqual(-1);
        expect(box.y).toBeGreaterThanOrEqual(-1);
        expect(box.x + box.width).toBeLessThanOrEqual(w + 1);
        expect(box.y + box.height).toBeLessThanOrEqual(h + 1);
        // متوسط: الهامشان متساويان
        expect(Math.abs(box.x - (w - box.x - box.width))).toBeLessThanOrEqual(2);
        expect(Math.abs(box.y - (h - box.y - box.height))).toBeLessThanOrEqual(2);
      });
    }

    test('زر الرئيسية يعمل دون اتصال (يعود إلى أول شريحة)', async ({ page }) => {
      await open(page, file, []);
      await goTo(page, 3);
      await page.locator('#hdr .ib').first().click();
      await expect(page.locator('section.slide.active')).toHaveAttribute('data-index', '0');
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
