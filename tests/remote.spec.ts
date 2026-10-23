import { test, expect, devices, type Browser, type Page } from '@playwright/test';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { startPeerServer, startRelay } from './relay';

// التحكم من الجوال من طرف إلى طرف: آيباد وجوال في سياقين منفصلين، وخادم رسائل محلي بدل ntfy.sh.
const dist = path.resolve(process.cwd(), 'dist');
// الفحوص مكتوبة على ترتيب شرائح درس التمثيل بالخطوط (أول شرائحه بلا خطوات)
const file = readdirSync(dist).find((f) => f === 'g4-3-4-line-graphs.html') ?? readdirSync(dist).find((f) => f.endsWith('.html') && f !== 'index.html')!;
const href = pathToFileURL(path.join(dist, file)).href;

/**
 * أول تشغيل لـ WebRTC يجمّد المتصفح ثوانيَ على بعض الحواسيب (Windows بمحولات شبكة افتراضية كثيرة)،
 * فتُمهَل الفحوص أكثر من المعتاد. على الآيباد والجوال لا يحدث هذا عادة.
 */
const READY = 25000;
test.setTimeout(120000);

/*
 * فحوص هذا الملف تعمل واحدًا بعد الآخر: تشغيل WebRTC في عدة متصفحات معًا يبطئه على Windows
 * حتى يتجاوز مهلة الاتصال أحيانًا. فحوص الدروس الأخرى تبقى متوازية.
 */
test.describe.configure({ mode: 'default' });

let relay: Awaited<ReturnType<typeof startRelay>>;
let peers: Awaited<ReturnType<typeof startPeerServer>>;
test.beforeAll(async () => {
  relay = await startRelay();
  peers = await startPeerServer();
});
test.afterAll(async () => {
  await relay.close();
  await peers.close();
});

/* كل فحص يغلق أجهزته: جوال متروك من فحص سابق يظل يرسل فيُفسد عدّ الرسائل في الفحص التالي */
const open: import('@playwright/test').BrowserContext[] = [];
test.afterEach(async () => {
  await Promise.all(open.splice(0).map((c) => c.close().catch(() => {})));
});

async function device(browser: Browser, dev: string, url: string) {
  const ctx = await browser.newContext({ ...devices[dev] });
  open.push(ctx);
  await ctx.addInitScript(
    ([r, p]) => {
      localStorage.setItem('remote:relay', r);
      localStorage.setItem('remote:peer', p);
    },
    [relay.url, peers.opts],
  );
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
  await expect(ipad.page.locator('.rstat')).toContainText('جاهز', { timeout: READY });
  const ch = await ipad.page.evaluate(() => localStorage.getItem('remote:channel'));
  const phone = await device(browser, 'iPhone 13', `${href}#remote=${ch}`);
  // على بعض الأجهزة يتأخر أول عنوان اتصال ثانيتين أو أكثر، ومع تشغيل الفحوص معًا يطول التعارف
  await expect(phone.page.locator('.dot.ok')).toContainText('مباشرة', { timeout: 45000 });
  await expect(ipad.page.locator('.rstat')).toContainText('مباشرة', { timeout: 15000 });
  await ipad.page.locator('.rpanel button', { hasText: 'إغلاق' }).click();
  return { ipad: ipad.page, phone: phone.page, errors: [...ipad.errors, ...phone.errors] };
}

const activeIndex = (p: Page) => p.locator('section.slide.active').getAttribute('data-index');

test('الجوال يتصل مباشرة عبر PeerJS ولا يستهلك ntfy', async ({ browser }) => {
  const before = relay.posts.length;
  const { ipad, phone, errors } = await pair(browser);
  const afterHandshake = relay.posts.length;
  // التعارف عبر PeerJS. إن تأخر الاتصال المباشر أكثر من ١٢ ثانية (بطء WebRTC عند تشغيل الفحوص معًا)
  // يرسل الجوال «مرحبًا» احتياطية واحدة ويرد الآيباد بحالته مرة واحدة: رسالتان على الأكثر
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
  await expect(ipad.page.locator('.rstat')).toContainText('جاهز', { timeout: READY });
  const ch = await ipad.page.evaluate(() => localStorage.getItem('remote:channel'));
  // جوال على شبكة تحجب WebRTC
  const ctx = await browser.newContext({ ...devices['iPhone 13'] });
  open.push(ctx);
  await ctx.addInitScript(
    ([r, p]) => {
      localStorage.setItem('remote:relay', r);
      localStorage.setItem('remote:peer', p);
      delete (window as { RTCPeerConnection?: unknown }).RTCPeerConnection;
    },
    [relay.url, peers.opts],
  );
  const phone = await ctx.newPage();
  await phone.goto(`${href}#remote=${ch}`);
  await expect(phone.locator('.dot.ok')).toContainText('الخادم', { timeout: 45000 });
  await phone.locator('.rnav .next').click();
  await expect.poll(() => activeIndex(ipad.page)).toBe('1');
});

test('حين يصل خادم الربط حدّه اليومي يظهر تنبيه واضح على الجوال', async ({ browser }) => {
  const full = await startRelay({ quotaUsed: true });
  const ctx = await browser.newContext({ ...devices['iPhone 13'] });
  open.push(ctx);
  await ctx.addInitScript(
    ([r, p]) => {
      localStorage.setItem('remote:relay', r);
      localStorage.setItem('remote:peer', p);
    },
    [full.url, peers.opts],
  );
  const phone = await ctx.newPage();
  await phone.goto(`${href}#remote=mlrabcdefghijkmnpqrst`);
  await expect(phone.locator('.rwarn')).toContainText('حدّه اليومي', { timeout: 45000 });
  await ctx.close();
  await full.close();
});

test('الجوال يغيّر مكان المؤقت وحجمه على الآيباد', async ({ browser }) => {
  const { ipad, phone, errors } = await pair(browser);
  await phone.locator('.rpresets .rbtn').nth(1).click();
  const timer = ipad.locator('#timerw');
  await expect(timer).toBeVisible();
  const w0 = (await timer.boundingBox())!.width;
  await phone.locator('.rtview .rbtn', { hasText: 'تكبير' }).click();
  await expect.poll(async () => (await timer.boundingBox())!.width).toBeGreaterThan(w0 * 1.1);
  // الخانة الأولى في الشبكة = أعلى يسار الشاشة
  await phone.locator('.rspots button').first().click();
  const main = (await ipad.locator('#main').boundingBox())!;
  await expect.poll(async () => (await timer.boundingBox())!.x - main.x).toBeLessThan(5);
  await expect.poll(async () => (await timer.boundingBox())!.y - main.y).toBeLessThan(5);
  await expect(phone.locator('.rspots button').first()).toHaveClass(/on/);
  expect(errors).toEqual([]);
});

test('الجوال يتحكم بمستكشف الحقائق المترابطة', async ({ browser }) => {
  const { ipad, phone, errors } = await pair(browser);
  // ننتقل بالأقسام حتى يظهر المستكشف (إن كان في الدرس)
  const secs = await phone.locator('.rsecs .rbtn').count();
  let found = false;
  for (let k = 0; k < secs && !found; k++) {
    await phone.locator('.rsecs .rbtn').nth(k).click();
    await ipad.waitForTimeout(400);
    found = (await ipad.locator('section.slide.active .ffam').count()) > 0;
  }
  test.skip(!found, 'لا مستكشف حقائق في هذا الدرس');
  await expect(phone.locator('.rfamily')).toBeVisible();
  const a0 = await ipad.locator('section.slide.active .ffstep b').first().textContent();
  await phone.locator('.rfamily .rval button[aria-label^="زيادة"]').first().click();
  await expect(ipad.locator('section.slide.active .ffstep b').first()).not.toHaveText(a0!);
  // جملة طرح: يُؤخذ جزء من المكعبات على الآيباد
  await phone.locator('.rfact.sub').first().click();
  await expect(ipad.locator('section.slide.active .fffact.sub.on')).toHaveCount(1);
  await expect(ipad.locator('section.slide.active .cpart.off')).toHaveCount(1);
  await expect(phone.locator('.rfact.sub.on')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('الجوال يوقف مقطع فكرة الدرس ويشغّله', async ({ browser }) => {
  const { ipad, phone, errors } = await pair(browser);
  let found = false;
  // المقطع آخر شرائح الشرح: نذهب إلى قسم الشرح ثم نتقدّم حتى نصل إليه
  await phone.locator('.rsecs .rbtn', { hasText: 'الشرح' }).click();
  await ipad.waitForTimeout(400);
  for (let k = 0; k < 30 && !found; k++) {
    await phone.locator('.rnav .next').click();
    await ipad.waitForTimeout(350);
    found = (await ipad.locator('section.slide.active .clip').count()) > 0;
  }
  expect(found).toBe(true);
  const play = ipad.locator('section.slide.active .clip-bar .btn.primary');
  const pos = () => ipad.locator('section.slide.active .clip-track').getAttribute('aria-valuenow').then(Number);
  const card = phone.locator('.rwidget', { hasText: 'مقطع فكرة الدرس' });
  await expect(card).toBeVisible();
  // لا يبدأ وحده: ينتظر المعلم
  await expect(play).toHaveText('تشغيل');
  await ipad.waitForTimeout(1000);
  expect(await pos()).toBe(0);
  await card.locator('.rbtn', { hasText: 'تشغيل المقطع' }).click();
  await expect(play).toHaveText('إيقاف');
  await expect.poll(pos).toBeGreaterThan(0);

  await card.locator('.rbtn', { hasText: 'إيقاف المقطع' }).click();
  await expect(play).toHaveText('تشغيل');
  const stopped = await pos();
  await ipad.waitForTimeout(1500);
  expect(await pos()).toBe(stopped);

  await card.locator('.rbtn', { hasText: 'تشغيل المقطع' }).click();
  await expect(play).toHaveText('إيقاف');
  await expect.poll(pos).toBeGreaterThan(stopped);

  await card.locator('.rbtn', { hasText: 'من البداية' }).click();
  await expect.poll(pos).toBeLessThan(2);
  expect(errors).toEqual([]);
});

test('سهما الجوال: الخطوات أولًا ثم الشريحة المجاورة', async ({ browser }) => {
  const { ipad, phone, errors } = await pair(browser);
  // أول شريحة فيها خطوات
  let found = false;
  for (let k = 0; k < 12 && !found; k++) {
    await phone.locator('.rnav .next').click();
    await ipad.waitForTimeout(350);
    found = (await ipad.locator('section.slide.active .step.shown').count()) > 0;
  }
  expect(found).toBe(true);
  const slide = await activeIndex(ipad);
  await expect(phone.locator('.rnav .rcount b')).toContainText('١ /');
  // السهم الأيمن يُخفي الخطوة أولًا ويبقى في الشريحة
  await phone.locator('.rnav .prev').click();
  await expect(ipad.locator('section.slide.active .step.shown')).toHaveCount(0);
  expect(await activeIndex(ipad)).toBe(slide);
  // ثم يعود إلى الشريحة السابقة
  await phone.locator('.rnav .prev').click();
  await expect.poll(() => activeIndex(ipad)).toBe(String(Number(slide) - 1));
  expect(errors).toEqual([]);
});

test('الضغطات السريعة تصل كلها مرة واحدة', async ({ browser }) => {
  const { ipad, phone, errors } = await pair(browser);
  // ثلاث ضغطات «التالي» متتالية دون انتظار: أول شرائح الدرس بلا خطوات، فكل ضغطة شريحة واحدة بالضبط
  await expect.poll(() => activeIndex(ipad)).toBe('0');
  for (let k = 0; k < 3; k++) await phone.locator('.rnav .next').click({ noWaitAfter: true });
  await expect.poll(() => activeIndex(ipad)).toBe('3');
  await phone.waitForTimeout(2000);
  expect(await activeIndex(ipad), 'لا ضغطة مكررة').toBe('3');
  await expect(phone.locator('.rhead .dot')).not.toContainText('يرسل');
  expect(errors).toEqual([]);
});

test('بعد إعادة فتح الدرس على الآيباد يعود الجوال وحده', async ({ browser }) => {
  const { ipad, phone, errors } = await pair(browser);
  await ipad.reload();
  // الآيباد يتذكر أن التحكم مفعّل، والجوال يعيد الاتصال دون مسح الرمز
  await expect(phone.locator('.rhead .dot')).toContainText('مباشرة', { timeout: 60000 });
  await phone.locator('.rnav .next').click();
  await expect.poll(() => activeIndex(ipad), { timeout: 15000 }).toBe('1');
  expect(errors).toEqual([]);
});

test('زرّا الشرائح في الجوال يتجاوزان الخطوات', async ({ browser }) => {
  const { ipad, phone, errors } = await pair(browser);
  // أول شريحة فيها خطوات، ثم خطوة واحدة فقط منها
  let found = false;
  for (let k = 0; k < 12 && !found; k++) {
    await phone.locator('.rnav .next').click();
    await ipad.waitForTimeout(350);
    found = (await ipad.locator('section.slide.active .step.shown').count()) > 0;
  }
  expect(found).toBe(true);
  const at = Number(await activeIndex(ipad));
  await phone.locator('.rslides button[aria-label="الشريحة التالية"]').click();
  await expect.poll(() => activeIndex(ipad)).toBe(String(at + 1));
  await phone.locator('.rslides button[aria-label="الشريحة السابقة"]').click();
  await phone.locator('.rslides button[aria-label="الشريحة السابقة"]').click();
  await expect.poll(() => activeIndex(ipad)).toBe(String(at - 1));
  expect(errors).toEqual([]);
});
