import { test, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// صوت مقطع الفكرة: أول ضغطة على زر التشغيل تُسمع الجملة الأولى كاملة (لا يوقفها فتح الصوت للآيباد)
const file = path.resolve(process.cwd(), 'dist', 'g2-4-1-tally-chart.html');

test('أول تشغيل للمقطع يقرأ الجملة الأولى حتى نهايتها', async ({ page }) => {
  test.skip(!existsSync(file), 'الدرس غير مبني');
  await page.addInitScript(() => {
    const w = window as unknown as { __voice: string[] };
    w.__voice = [];
    const orig = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      const el = this as HTMLMediaElement & { __hooked?: boolean };
      if (!el.__hooked) {
        el.__hooked = true;
        for (const e of ['playing', 'pause', 'ended']) el.addEventListener(e, () => String(el.src).startsWith('data:audio/mpeg') && w.__voice.push(e));
      }
      return orig.call(this);
    };
  });
  await page.goto(pathToFileURL(file).href);
  const idx = await page.locator('section.slide').evaluateAll((els) => els.findIndex((e) => e.querySelector('.clip')));
  for (let i = 0; i < idx; i++) await page.keyboard.press('ArrowLeft');
  await page.locator('section.slide.active .clip-big').click();
  // الجملة الأولى نحو ثلاث ثوانٍ: تنتهي بـ ended لا بإيقاف مبكر
  await expect.poll(() => page.evaluate(() => (window as unknown as { __voice: string[] }).__voice.slice(0, 3)), { timeout: 8000 }).toEqual(['playing', 'pause', 'ended']);
});
