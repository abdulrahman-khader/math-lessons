import { test, expect, type Page } from '@playwright/test';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// يفحص كل درس مبني في dist/. شغّل `npm run build` أولًا (npm test يفعل ذلك).
const dist = path.resolve(process.cwd(), 'dist');
// LESSONS (يضبطه scripts/test.mjs): أسماء ملفات الدروس المطلوبة فقط، مفصولة بفواصل. بدونه: كل الدروس المبنية
const only = process.env.LESSONS ? new Set(process.env.LESSONS.split(',')) : null;
const files = readdirSync(dist).filter((f) => f.endsWith('.html') && f !== 'index.html' && f !== 'stars.html' && (!only || only.has(f)));

// الحركة متوقفة في الاختبارات (الدروس تحترم prefers-reduced-motion)، فلا ننتظر انتهاء الحركات
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});
/** انتظار قصير حتى يرسم React ما تغيّر */
const settle = (page: Page, ms = 60) => page.waitForTimeout(ms);

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

/** التصميم الجديد (v2): لا أزرار على السبورة، والأدوات داخل قائمة ⋯ في الرأس */
const isV2 = async (page: Page) => (await page.locator('#app[data-design="v2"]').count()) > 0;
/** أداة من الشريط (التصميم القديم) أو من قائمة ⋯ (التصميم الجديد) */
async function tool(page: Page, name: string, v2Name = name) {
  if (await isV2(page)) {
    await page.locator('.v2dots').click();
    return page.getByRole('menuitem', { name: v2Name, exact: true });
  }
  return page.locator(`button[aria-label="${name}"]`);
}

async function goTo(page: Page, i: number) {
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.keyboard.press('Home');
  for (let k = 0; k < i; k++) await page.keyboard.press('PageDown');
  const slide = page.locator('section.slide.active');
  await expect(slide).toHaveAttribute('data-index', String(i));
  return slide;
}

/** يُظهر كل خطوات الشريحة الحالية دفعة واحدة (Shift مع المسافة؛ يُغلق التلميح إن كان مفتوحًا) */
async function revealAll(page: Page) {
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.keyboard.press('Shift+Space');
  await settle(page, 100);
}

/** ينتقل إلى الشريحة التالية (في الجولات التي تمر على الشرائح بالترتيب) */
async function next(page: Page, i: number) {
  if (i > 0) await page.keyboard.press('PageDown');
  const slide = page.locator('section.slide.active');
  await expect(slide).toHaveAttribute('data-index', String(i));
  return slide;
}

for (const file of files) {
  test.describe(file, () => {
    // جولة واحدة على كل الشرائح عند ١٦٠٠×٩٠٠ تجمع الفحوص التي تمر على كل الشرائح:
    // لا أخطاء، لا فيض (مع التلميح ومع كل الخطوات)، أرقام هندية-عربية فقط، ولا شيء يتحرك عند إظهار الخطوات (التصميم الجديد)
    test('جولة على كل الشرائح: لا أخطاء، لا فيض، أرقام عربية، لا حركة', async ({ page }) => {
      await page.setViewportSize({ width: 1600, height: 900 });
      const errors: string[] = [];
      await open(page, file, errors);
      const v2 = await isV2(page);
      const n = await slideCount(page);
      const overflow: string[] = [];
      const bad: string[] = [];
      const moved: string[] = [];
      const rects = () =>
        page.evaluate(() =>
          [...document.querySelectorAll('section.slide.active .step, section.slide.active .blank.box, section.slide.active .mcq .fb')].map((e) => {
            const r = e.getBoundingClientRect();
            return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)];
          }),
        );
      await goTo(page, 0);
      for (let i = 0; i < n; i++) {
        await next(page, i);
        await settle(page);
        const before = v2 && i > 0 ? await rects() : [];
        const slide = page.locator('section.slide.active');
        const check = async (state: string) => {
          const { sh, ch, wide } = await slide.evaluate((el) => {
            // البطاقات التي يخرج محتواها عن عرضها (يُقصّ جانبيًا ولا يزيد الارتفاع)
            const wide = [...el.querySelectorAll<HTMLElement>('.card, .chart')].filter((c) => c.scrollWidth > c.clientWidth + 2).length;
            return { sh: el.scrollHeight, ch: el.clientHeight, wide: wide + (el.scrollWidth > el.clientWidth + 1 ? 1 : 0) };
          });
          if (sh > ch + 1) overflow.push(`الشريحة ${i + 1} (${state}): ${sh - ch}px زائدة`);
          if (wide) overflow.push(`الشريحة ${i + 1} (${state}): ${wide} بطاقة يفيض محتواها عن عرضها`);
        };
        await revealAll(page);
        await check('كل الخطوات ظاهرة');
        if (before.length) {
          const after = await rects();
          before.forEach((x, j) => {
            if (after[j] && x.some((v, q) => Math.abs(v - after[j][q]) > 1)) moved.push(`الشريحة ${i + 1}، العنصر ${j + 1}: ${x.join(',')} ← ${after[j].join(',')}`);
          });
        }
        const text = await page.locator('#stage').innerText();
        const svgText = await slide.evaluate((el) => [...el.querySelectorAll('svg text')].map((t) => t.textContent).join(' '));
        for (const m of (text + ' ' + svgText).matchAll(/.{0,15}[0-9].{0,15}/g)) bad.push(`الشريحة ${i + 1}: «${m[0]}»`);
        // التلميح مفتوح قبل الحل: نعيد الشريحة ثم نفتحه
        const hint = slide.locator('.btn.hint');
        const hasHint = v2 ? (await slide.locator('.hintbox').count()) > 0 : (await hint.count()) > 0;
        if (hasHint) {
          await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
          await page.keyboard.press('r');
          if (v2) await page.keyboard.press('h');
          else await hint.first().click();
          await settle(page);
          await check('التلميح مفتوح');
          // نُغلقه قبل الانتقال حتى تبدأ الشريحة التالية كما يراها المعلم
          if (v2) await page.keyboard.press('h');
          else await hint.first().click();
        }
      }
      expect(errors, 'أخطاء أثناء الجولة').toEqual([]);
      expect(overflow, 'فيض على مسرح ١٦٠٠×٩٠٠').toEqual([]);
      expect([...new Set(bad)], 'أرقام غير هندية-عربية').toEqual([]);
      expect(moved, 'عناصر تحركت عند إظهار الخطوات').toEqual([]);
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
      await goTo(page, 0);
      for (let i = 1; i < n; i++) {
        const slide = await next(page, i);
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

    test('إعادة الدرس كاملًا تمحو كل الشرائح والنقاط وتعود إلى البداية', async ({ page }) => {
      await open(page, file, []);
      const n = await slideCount(page);
      let touched = 0;
      for (let i = 1; i < n && touched < 3; i++) {
        const slide = await goTo(page, i);
        if ((await slide.locator('.step').count()) === 0) continue;
        await page.keyboard.press('Space');
        touched++;
      }
      expect(touched).toBeGreaterThan(0);
      await page.locator('.team button[aria-label="إضافة نقطة"]').first().click();
      await expect(page.locator('.team .tn').first()).toContainText('١');
      if (await isV2(page)) {
        await (await tool(page, 'إعادة')).click();
        await page.getByRole('menuitem', { name: 'إعادة الدرس كاملًا…' }).click();
        await page.getByRole('button', { name: 'نعم، أعد الدرس' }).click();
        await expect(page.getByRole('alertdialog')).toHaveCount(0);
      } else {
        await page.locator('.rmenu > button').click();
        await page.locator('.rpop button', { hasText: 'إعادة الدرس كاملًا' }).click();
        await page.locator('.rpop button', { hasText: 'نعم، أعد الدرس' }).click();
        await expect(page.locator('.rpop')).toHaveCount(0);
      }
      await expect(page.locator('section.slide.active')).toHaveAttribute('data-index', '0');
      await expect(page.locator('.step.shown')).toHaveCount(0);
      await expect(page.locator('.team .tn').first()).toContainText('٠');
    });

    // خادم الرسائل محجوب في هذين الفحصين: لا يعتمدان على الشبكة
    test('نافذة ربط الجوال تعرض رمز QR بلا أرقام لاتينية', async ({ page }) => {
      await page.route('https://ntfy.sh/**', (r) => r.abort());
      await open(page, file, []);
      await (await tool(page, 'التحكم من الجوال')).click();
      await page.locator('.rpanel button', { hasText: 'تشغيل' }).click();
      await expect(page.locator('.rpanel svg.qr path')).toHaveCount(1);
      const ch = await page.evaluate(() => localStorage.getItem('remote:channel'));
      expect(ch).toMatch(/^mlr[a-z]{18}$/);
      expect(await page.locator('.rpanel').innerText()).not.toMatch(/[0-9]/);
      await page.keyboard.press('Escape');
      await expect(page.locator('.rpanel')).toHaveCount(0);
    });

    test('شاشة الجوال تفتح من الرابط وتنتظر الآيباد', async ({ page }) => {
      await page.route('https://ntfy.sh/**', (r) => r.abort());
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(pathToFileURL(path.join(dist, file)).href + '#remote=mlrabcdefghijkmnpqrst');
      await expect(page.locator('.remote .rhead')).toBeVisible();
      await expect(page.locator('#stage')).toHaveCount(0);
      expect(await page.locator('.remote').innerText()).not.toMatch(/[0-9]/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
      expect(errors).toEqual([]);
    });

    test('«بدون» فرق يخفي النقاط وأزرار النجوم', async ({ page }) => {
      await open(page, file, []);
      await page.locator('.teamset .btn', { hasText: 'بدون' }).click();
      await expect(page.locator('#teams .team')).toHaveCount(0);
      await expect(page.locator('.teamset input')).toHaveCount(0);
      const n = await slideCount(page);
      await goTo(page, 0);
      for (let i = 1; i < n; i++) {
        const slide = await next(page, i);
        const q = slide.locator('.mcq:has(.award), .mcq').first();
        if (!(await q.count())) continue;
        for (const b of await q.locator('.opts button').all()) await b.click();
        await expect(slide.locator('.award')).toHaveCount(0);
      }
      await expect(page.locator('#winner')).toHaveCount(0);
      await expect(page.locator('section.slide h2', { hasText: 'الفريق الفائز' })).toHaveCount(0);
    });

    test('المؤقت يُسحب ويُكبَّر ويبقى مكانه بعد إعادة الفتح', async ({ page }) => {
      await page.setViewportSize({ width: 1600, height: 900 });
      await open(page, file, []);
      test.skip(await isV2(page), 'التصميم الجديد: المؤقت شارة في الرأس لا تُسحب');
      await page.locator('button[aria-label="المؤقت"]').click();
      const timer = page.locator('#timerw');
      await expect(timer).toBeVisible();
      const main = (await page.locator('#main').boundingBox())!;
      const center = async () => {
        const b = (await timer.boundingBox())!;
        return { x: b.x + b.width / 2 - main.x, y: b.y + b.height / 2 - main.y, w: b.width };
      };
      const c0 = await center();
      expect(Math.abs(c0.x - main.width / 2)).toBeLessThan(3);

      await page.locator('button[aria-label="تكبير المؤقت"]').click();
      const c1 = await center();
      expect(c1.w).toBeGreaterThan(c0.w * 1.1);

      // سحب الرقم إلى أعلى اليسار: يبقى داخل منطقة الشرائح
      const tv = (await page.locator('#tval').boundingBox())!;
      await page.mouse.move(tv.x + tv.width / 2, tv.y + tv.height / 2);
      await page.mouse.down();
      await page.mouse.move(tv.x - 2000, tv.y - 2000, { steps: 8 });
      await page.mouse.up();
      const b = (await timer.boundingBox())!;
      expect(b.x).toBeGreaterThanOrEqual(main.x - 1);
      expect(b.y).toBeGreaterThanOrEqual(main.y - 1);
      expect(b.x - main.x).toBeLessThan(5);

      await page.reload();
      await page.locator('button[aria-label="المؤقت"]').click();
      const after = (await timer.boundingBox())!;
      expect(Math.abs(after.x - b.x)).toBeLessThan(3);
      expect(Math.abs(after.width - b.width)).toBeLessThan(3);
      await page.locator('button[aria-label="المؤقت في الوسط"]').click();
      expect(Math.abs((await center()).x - main.width / 2)).toBeLessThan(3);
    });

    // iPad أفقي وعمودي، iPad Pro، شاشات الحاسب الصغيرة، والسبورة
    test('المسرح كله داخل الشاشة ومتوسط في كل المقاسات', async ({ page }) => {
      await open(page, file, []);
      for (const [w, h] of [[1180, 820], [820, 1180], [1024, 768], [1366, 1024], [1280, 720], [1920, 1080]]) {
        await page.setViewportSize({ width: w, height: h });
        await settle(page, 100);
        const box = (await page.locator('#stage').boundingBox())!;
        const at = `عند ${w}×${h}`;
        expect(box.x, at).toBeGreaterThanOrEqual(-1);
        expect(box.y, at).toBeGreaterThanOrEqual(-1);
        expect(box.x + box.width, at).toBeLessThanOrEqual(w + 1);
        expect(box.y + box.height, at).toBeLessThanOrEqual(h + 1);
        // متوسط: الهامشان متساويان
        expect(Math.abs(box.x - (w - box.x - box.width)), at).toBeLessThanOrEqual(2);
        expect(Math.abs(box.y - (h - box.y - box.height)), at).toBeLessThanOrEqual(2);
      }
    });

    test('التصميم الجديد: السهمان يمشيان في الخطوات، و⌘/Ctrl مع السهم ينقل شريحة كاملة', async ({ page }) => {
      await open(page, file, []);
      test.skip(!(await isV2(page)), 'للتصميم الجديد فقط');
      const n = await slideCount(page);
      let i = 1;
      while (i < n && (await page.locator(`section.slide[data-index="${i}"] .step`).count()) < 2) i++;
      const slide = await goTo(page, i);
      await page.keyboard.press('ArrowLeft');
      await expect(slide).toHaveClass(/active/);
      await expect(slide.locator('.step.shown')).toHaveCount(1);
      await page.keyboard.press('ArrowRight');
      await expect(slide.locator('.step.shown')).toHaveCount(0);
      await expect(slide).toHaveClass(/active/);
      await page.keyboard.press('ArrowRight');
      await expect(page.locator('section.slide.active')).toHaveAttribute('data-index', String(i - 1));
      await page.keyboard.press('Control+ArrowLeft');
      await expect(page.locator('section.slide.active')).toHaveAttribute('data-index', String(i));
      await page.keyboard.press('Meta+ArrowLeft');
      await expect(page.locator('section.slide.active')).toHaveAttribute('data-index', String(i + 1));
    });

    test('زر الرئيسية يعمل دون اتصال (يعود إلى أول شريحة)', async ({ page }) => {
      await open(page, file, []);
      await goTo(page, 3);
      if (await isV2(page)) await (await tool(page, 'الرئيسية')).click();
      else await page.locator('#hdr .ib').first().click();
      await expect(page.locator('section.slide.active')).toHaveAttribute('data-index', '0');
    });

    test('على الجوال: لا تمرير أفقي في أي شريحة', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await open(page, file, []);
      const n = await slideCount(page);
      const wide: string[] = [];
      await goTo(page, 0);
      for (let i = 0; i < n; i++) {
        await next(page, i);
        await revealAll(page);
        const w = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        if (w > 1) wide.push(`الشريحة ${i + 1}: ${w}px`);
      }
      expect(wide).toEqual([]);
    });
  });
}
