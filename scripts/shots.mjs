// يلتقط صورة لكل شريحة (بعد إظهار كل خطواتها) في shots/<الدرس>/ للمراجعة البصرية.
// الاستعمال: npm run shots -- 3-4          ← كل الشرائح
//            npm run shots -- 3-4 9 13     ← شرائح محددة (أرقام تبدأ من ١)
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { root, pickLessons, outName } from './lessons.mjs';

const [filter, ...only] = process.argv.slice(2);
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? 'chrome' });
for (const lesson of pickLessons(filter)) {
  const out = path.join(root, 'shots', outName(lesson).replace('.html', ''));
  mkdirSync(out, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.goto(pathToFileURL(path.join(root, 'dist', outName(lesson))).href);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  const n = await page.locator('section.slide').count();
  for (let i = 0; i < n; i++) {
    if (i > 0) await page.keyboard.press('ArrowLeft');
    if (only.length && !only.includes(String(i + 1))) continue;
    for (let k = 0; k < 15; k++) await page.keyboard.press('Space');
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(out, `${String(i + 1).padStart(2, '0')}.png`) });
  }
  await page.close();
  console.log(`✓ ${lesson}: shots/${path.basename(out)}/`);
}
await browser.close();
