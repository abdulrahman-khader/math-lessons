import { test, expect, devices, type Browser, type Page } from '@playwright/test';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { startRelay } from './relay';

// التحكم من الجوال من طرف إلى طرف: آيباد وجوال في سياقين منفصلين، وخادم رسائل محلي بدل ntfy.sh.
const dist = path.resolve(process.cwd(), 'dist');
const file = readdirSync(dist).find((f) => f.endsWith('.html') && f !== 'index.html')!;
const href = pathToFileURL(path.join(dist, file)).href;

let relay: Awaited<ReturnType<typeof startRelay>>;
test.beforeAll(async () => {
  relay = await startRelay();
});
test.afterAll(() => relay.close());

async function device(browser: Browser, dev: string, url: string) {
  const ctx = await browser.newContext({ ...devices[dev] });
  await ctx.addInitScript((r) => localStorage.setItem('remote:relay', r), relay.url);
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(url);
  return { page, errors };
}

async function pair(browser: Browser) {
  const ipad = await device(browser, 'iPad Pro 11', href);
  await ipad.page.locator('button[aria-label="التحكم من الجوال"]').click();
  await ipad.page.locator('.rpanel button', { hasText: 'تشغيل' }).click();
  await expect(ipad.page.locator('.rstat')).toContainText('جاهز');
  const ch = await ipad.page.evaluate(() => localStorage.getItem('remote:channel'));
  const phone = await device(browser, 'iPhone 13', `${href}#remote=${ch}`);
  await expect(phone.page.locator('.dot.ok')).toContainText('مباشرة', { timeout: 15000 });
  await expect(ipad.page.locator('.rstat')).toContainText('مباشرة');
  await ipad.page.locator('.rpanel button', { hasText: 'إغلاق' }).click();
  return { ipad: ipad.page, phone: phone.page, errors: [...ipad.errors, ...phone.errors] };
}

const activeIndex = (p: Page) => p.locator('section.slide.active').getAttribute('data-index');

test('الجوال يتصل مباشرة ولا يستهلك خادم الرسائل بعد التعارف', async ({ browser }) => {
  const before = relay.posts.length;
  const { ipad, phone, errors } = await pair(browser);
  const afterHandshake = relay.posts.length;
  // التعارف: عرض من الجوال ورد من الآيباد فقط
  expect(afterHandshake - before).toBeLessThanOrEqual(2);

  for (let k = 0; k < 6; k++) await phone.locator('.rnav .next').click();
  await expect.poll(() => activeIndex(ipad)).not.toBe('0');
  await phone.locator('.rpresets .rbtn').first().click();
  await expect(ipad.locator('#timerw.show')).toBeVisible();
  await phone.locator('.rtimer .rbtn', { hasText: 'إغلاق المؤقت' }).click();
  await expect(ipad.locator('#timerw')).toHaveCount(0);

  expect(relay.posts.length, 'كل الأوامر والحالات عبر القناة المباشرة').toBe(afterHandshake);
  expect(errors).toEqual([]);
});

test('أسئلة الاختيار تظهر على الجوال وتُجاب منه', async ({ browser }) => {
  const { ipad, phone, errors } = await pair(browser);
  // أول قسم فيه سؤال اختيار: ننتقل بالأقسام حتى يظهر سؤال على الآيباد
  const secs = await phone.locator('.rsecs .rbtn').count();
  let found = false;
  for (let k = 0; k < secs && !found; k++) {
    await phone.locator('.rsecs .rbtn').nth(k).click();
    await ipad.waitForTimeout(400);
    found = (await ipad.locator('section.slide.active .mcq').count()) > 0;
  }
  expect(found).toBe(true);
  const n = await ipad.locator('section.slide.active .mcq').count();
  await expect(phone.locator('.rmcq')).toHaveCount(n);

  // نختار الخيار الصحيح المعلَّم على الجوال
  const q = phone.locator('.rmcq').first();
  await q.locator('.ropt', { has: phone.locator('.rkey') }).click();
  await expect(ipad.locator('section.slide.active .mcq').first().locator('.opts button.right')).toHaveCount(1);
  await expect(q.locator('.ropt.right')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('إن تعذّر الاتصال المباشر يعمل التحكم عبر خادم الرسائل', async ({ browser }) => {
  const ipad = await device(browser, 'iPad Pro 11', href);
  await ipad.page.locator('button[aria-label="التحكم من الجوال"]').click();
  await ipad.page.locator('.rpanel button', { hasText: 'تشغيل' }).click();
  await expect(ipad.page.locator('.rstat')).toContainText('جاهز');
  const ch = await ipad.page.evaluate(() => localStorage.getItem('remote:channel'));
  // جوال على شبكة تحجب WebRTC
  const ctx = await browser.newContext({ ...devices['iPhone 13'] });
  await ctx.addInitScript((r) => {
    localStorage.setItem('remote:relay', r);
    delete (window as { RTCPeerConnection?: unknown }).RTCPeerConnection;
  }, relay.url);
  const phone = await ctx.newPage();
  await phone.goto(`${href}#remote=${ch}`);
  await expect(phone.locator('.dot.ok')).toContainText('الخادم', { timeout: 25000 });
  await phone.locator('.rnav .next').click();
  await expect.poll(() => activeIndex(ipad.page)).toBe('1');
});

test('حين يصل خادم الربط حدّه اليومي يظهر تنبيه واضح على الجوال', async ({ browser }) => {
  const full = await startRelay({ quotaUsed: true });
  const ctx = await browser.newContext({ ...devices['iPhone 13'] });
  await ctx.addInitScript((r) => localStorage.setItem('remote:relay', r), full.url);
  const phone = await ctx.newPage();
  await phone.goto(`${href}#remote=mlrabcdefghijkmnpqrst`);
  await expect(phone.locator('.rwarn')).toContainText('حدّه اليومي', { timeout: 15000 });
  await ctx.close();
  await full.close();
});
