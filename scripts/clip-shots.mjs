// يلتقط صورًا لمقاطع الدرس (القصة story-… ومقطع الفكرة clip-…) عند ثوانٍ محددة في shots/<الدرس>/clip-<ث>.png للمراجعة البصرية.
// الاستعمال: npm run clip-shots -- 3-5            ← كل ٥ ثوانٍ
//            npm run clip-shots -- 3-5 6 24 34    ← ثوانٍ محددة
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { root, pickLessons, outName } from './lessons.mjs';

const [filter, ...secs] = process.argv.slice(2);
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? 'chrome' });
for (const lesson of pickLessons(filter)) {
  const out = path.join(root, 'shots', outName(lesson).replace('.html', ''));
  mkdirSync(out, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.goto(pathToFileURL(path.join(root, 'dist', outName(lesson))).href);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  // كل مقاطع الدرس: القصة التي تفتحه (story-<ث>) ومقطع الفكرة (clip-<ث>)
  const clips = await page.locator('section.slide').evaluateAll((els) =>
    els.map((e, i) => (e.querySelector('.clip') ? { i, story: (e.textContent ?? '').includes('قصة قصيرة') } : null)).filter(Boolean),
  );
  if (!clips.length) {
    console.log(`– ${lesson}: لا مقطع`);
    await page.close();
    continue;
  }
  let at = 0;
  let count = 0;
  for (const { i: idx, story } of clips) {
    for (; at < idx; at++) await page.keyboard.press('PageDown');
    const clip = page.locator('section.slide.active .clip');
    const dur = Number(await clip.locator('.clip-track').getAttribute('aria-valuemax'));
    const list = secs.length ? secs.map(Number) : Array.from({ length: Math.floor(dur / 5) + 1 }, (_, k) => k * 5);
    const box = await clip.locator('.clip-track').boundingBox();
    for (const s of list) {
      // الشريط يمتلئ من اليمين
      await page.mouse.click(box.x + box.width * (1 - Math.min(s, dur) / dur), box.y + box.height / 2);
      await page.waitForTimeout(450);
      await page.screenshot({ path: path.join(out, `${story ? 'story' : 'clip'}-${String(s).padStart(2, '0')}.png`) });
      count++;
    }
  }
  await page.close();
  console.log(`✓ ${lesson}: ${count} صور في shots/${path.basename(out)}/`);
}
await browser.close();
