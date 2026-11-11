import { test, expect, devices, type Browser, type Page } from '@playwright/test';
import { existsSync, readdirSync } from 'node:fs';
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
 * على Windows تعمل فحوص هذا الملف واحدًا بعد الآخر: تشغيل WebRTC في عدة متصفحات معًا يبطئه هناك
 * حتى يتجاوز مهلة الاتصال أحيانًا. على الماك وخوادم GitHub تعمل معًا (لكل عامل خادماه على منفذين مختلفين).
 */
test.describe.configure({ mode: process.platform === 'win32' ? 'default' : 'parallel' });

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

/** أداة من شريط الأدوات، أو من قائمة ⋯ في التصميم الجديد */
async function openTool(page: Page, name: string) {
  if (await page.locator('.v2dots').count()) {
    await page.locator('.v2dots').click();
    await page.getByRole('menuitem', { name, exact: true }).click();
  } else await page.locator(`button[aria-label="${name}"]`).click();
}

async function pair(browser: Browser, url = href) {
  const ipad = await device(browser, 'iPad Pro 11', url);
  await openTool(ipad.page, 'التحكم من الجوال');
  await ipad.page.locator('.rpanel button', { hasText: 'تشغيل' }).click();
  await expect(ipad.page.locator('.rstat')).toContainText('جاهز', { timeout: READY });
  const ch = await ipad.page.evaluate(() => localStorage.getItem('remote:channel'));
  const phone = await device(browser, 'iPhone 13', `${url}#remote=${ch}`);
  // على بعض الأجهزة يتأخر أول عنوان اتصال ثانيتين أو أكثر، ومع تشغيل الفحوص معًا يطول التعارف
  await expect(phone.page.locator('.dot.ok')).toContainText('مباشرة', { timeout: 45000 });
  await expect(ipad.page.locator('.rstat')).toContainText('مباشرة', { timeout: 15000 });
  await ipad.page.locator('.rpanel button', { hasText: 'إغلاق' }).click();
  // الجوال يبدأ بصفحة إعداد الحصة
  await phone.page.getByRole('button', { name: 'ابدأ الدرس' }).click();
  return { ipad: ipad.page, phone: phone.page, errors: [...ipad.errors, ...phone.errors] };
}

/** لوحة أداة في الجوال (الفرق، العجلة، النجوم، المؤقت، الشرائح) */
async function sheet(phone: Page, name: string) {
  await phone.locator('.r2tools button', { hasText: name }).click();
  await expect(phone.locator('.r2panel')).toBeVisible();
}
async function closeSheet(phone: Page) {
  await phone.locator('.r2panel .r2x').click();
  await expect(phone.locator('.r2panel')).toHaveCount(0);
}
/** عدد الأقسام، والانتقال إلى أول شريحة في القسم k من لوحة الشرائح */
async function sectionCount(phone: Page) {
  await sheet(phone, 'الشرائح');
  const n = await phone.locator('.r2secgrp').count();
  await closeSheet(phone);
  return n;
}
async function gotoSection(phone: Page, k: number | string) {
  await sheet(phone, 'الشرائح');
  const grp = typeof k === 'number' ? phone.locator('.r2secgrp').nth(k) : phone.locator('.r2secgrp', { has: phone.locator('h3', { hasText: k }) });
  await grp.locator('button').first().click();
  await expect(phone.locator('.r2panel')).toHaveCount(0);
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
  await sheet(phone, 'المؤقت');
  await phone.locator('.rpresets .r2btn').first().click();
  // المؤقت في وسط الشاشة، أو في رأسها في التصميم الجديد
  await expect(ipad.locator('#timerw.show, #v2timer')).toBeVisible();
  await phone.locator('.rtimer .r2btn', { hasText: 'إغلاق المؤقت' }).click();
  await expect(ipad.locator('#timerw, #v2timer')).toHaveCount(0);

  expect(relay.posts.length, 'كل الأوامر والحالات عبر القناة المباشرة').toBe(afterHandshake);
  expect(errors).toEqual([]);
});

test('أسئلة الاختيار تظهر على الجوال وتُجاب منه', async ({ browser }) => {
  const { ipad, phone, errors } = await pair(browser);
  // أول قسم فيه سؤال اختيار: ننتقل بالأقسام حتى يظهر سؤال على الآيباد
  const secs = await sectionCount(phone);
  let found = false;
  for (let k = 0; k < secs && !found; k++) {
    await gotoSection(phone, k);
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
  await openTool(ipad.page, 'التحكم من الجوال');
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
  await phone.getByRole('button', { name: 'ابدأ الدرس' }).click();
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
  // في التصميم القديم فقط: المؤقت في التصميم الجديد ثابت في رأس الشاشة. كل الدروس الآن بالتصميم الجديد
  test.skip(true, 'لا درس بالتصميم القديم');
  const old = readdirSync(dist).find((f) => f.startsWith('g2-') && f.endsWith('.html'))!;
  const { ipad, phone, errors } = await pair(browser, pathToFileURL(path.join(dist, old)).href);
  await sheet(phone, 'المؤقت');
  await phone.locator('.rpresets .r2btn').nth(1).click();
  const timer = ipad.locator('#timerw');
  await expect(timer).toBeVisible();
  const w0 = (await timer.boundingBox())!.width;
  await phone.locator('.r2fold', { hasText: 'مكان المؤقت وحجمه' }).click();
  await phone.locator('.rtview .r2btn', { hasText: 'تكبير' }).click();
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
  const secs = await sectionCount(phone);
  let found = false;
  for (let k = 0; k < secs && !found; k++) {
    await gotoSection(phone, k);
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
  await gotoSection(phone, 'الشرح');
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

test('الجوال: بطاقة الوقت تبيّن وقت الشريحة من خطة ٤٥ دقيقة', async ({ browser }) => {
  const { phone, errors } = await pair(browser);
  await phone.locator('.rnav .next').click();
  await expect(phone.locator('.r2clock')).toContainText('هذه الشريحة');
  await expect(phone.locator('.r2clock')).toContainText('من ٤٥ د');
  // بلا وقت انتهاء للحصة: إرشاد إلى تحديده بدل حساب التأخر
  await expect(phone.locator('.r2clock .r2thint')).toBeVisible();
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
  await expect(phone.locator('.r2steps small')).toContainText('١ من');
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

// إعادة الاتصال بعد إعادة التحميل تتأخر أحيانًا حين تعمل فحوص الجوال كلها معًا: يُعاد هذا الفحص حتى مرتين
test.describe('إعادة الاتصال', () => {
  test.describe.configure({ retries: 2 });
  test('بعد إعادة فتح الدرس على الآيباد يعود الجوال وحده', async ({ browser }) => {
    const { ipad, phone, errors } = await pair(browser);
    await ipad.reload();
    // الآيباد يتذكر أن التحكم مفعّل، والجوال يعيد الاتصال دون مسح الرمز
    await expect(phone.locator('.rhead .dot')).toContainText('مباشرة', { timeout: 60000 });
    await phone.locator('.rnav .next').click();
    await expect.poll(() => activeIndex(ipad), { timeout: 15000 }).toBe('1');
    expect(errors).toEqual([]);
  });
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
  await phone.locator('.rnav button[aria-label="الشريحة التالية"]').click();
  await expect.poll(() => activeIndex(ipad)).toBe(String(at + 1));
  await phone.locator('.rnav button[aria-label="الشريحة السابقة"]').click();
  await phone.locator('.rnav button[aria-label="الشريحة السابقة"]').click();
  await expect.poll(() => activeIndex(ipad)).toBe(String(at - 1));
  expect(errors).toEqual([]);
});

test('الغياب من صفحة إعداد الحصة في الجوال: لمس الاسم يسجّله غائبًا اليوم، والغائب لا يدخل العجلة', async ({ browser }) => {
  const { ipad, phone, errors } = await pair(browser);
  await ipad.evaluate(() => {
    localStorage.setItem('classes', JSON.stringify({ grades: { g4: { classes: [{ id: 'k1', name: 'الفصل الأول', students: ['محمد', 'خالد', 'سعد'], team: {} }] } } }));
    window.dispatchEvent(new Event('classes-changed'));
  });
  await sheet(phone, 'العجلة');
  await phone.locator('.r2seg', { hasText: 'الفصل الأول' }).click();
  await closeSheet(phone);
  // الغياب في صفحة إعداد الحصة
  await phone.getByRole('button', { name: 'إعداد الحصة' }).click();
  await phone.getByRole('button', { name: /تسجيل الغياب/ }).click();
  const khalid = phone.getByRole('button', { name: 'غائب اليوم: خالد' });
  await khalid.click();
  await expect(khalid).toHaveAttribute('aria-pressed', 'true');
  await expect(phone.locator('.r2note', { hasText: 'الغائبون' })).toContainText('الغائبون: ١ من ٣');
  // لمسه ثانيةً يلغي الغياب، ثم يُسجَّل من جديد
  await khalid.click();
  await expect(khalid).toHaveAttribute('aria-pressed', 'false');
  await khalid.click();
  await expect(khalid).toHaveAttribute('aria-pressed', 'true');
  await closeSheet(phone);
  await expect(phone.getByRole('button', { name: /تسجيل الغياب/ })).toContainText('الغائبون اليوم: ١');
  await phone.getByRole('button', { name: 'ابدأ الدرس' }).click();
  // العجلة على الآيباد: الحاضران فقط
  await sheet(phone, 'العجلة');
  await phone.locator('.r2btn', { hasText: 'أدِر العجلة' }).click();
  await expect(ipad.locator('.wheel2')).toHaveAttribute('data-pool', '2');
  await expect(phone.locator('.rpicked .wres')).not.toHaveText('خالد', { timeout: 15000 });
  // لا زر غياب على السبورة؛ العدد يظهر في البطاقة بعد «إظهار النجوم»
  await phone.locator('.r2btn', { hasText: 'إغلاق العجلة' }).click();
  await closeSheet(phone);
  await sheet(phone, 'النجوم');
  await phone.locator('.r2line .r2btn', { hasText: 'إظهار' }).click();
  await ipad.locator('.sbox').getByRole('button', { name: 'هذا الأسبوع' }).click();
  await expect(ipad.locator('.sbox [aria-label^="غائب اليوم"]')).toHaveCount(0);
  await ipad.locator('.sbox').getByRole('button', { name: 'إظهار النجوم' }).click();
  await expect(ipad.locator('.scard', { hasText: 'خالد' }).locator('.scount')).toContainText('غ ١');
  expect(errors).toEqual([]);
});

test('الجوال يعطي نجمة وغلطة لطالب ويعرض لوحة النجوم على الآيباد', async ({ browser }) => {
  const { ipad, phone, errors } = await pair(browser);
  // فصل يُضاف بعد فتح الدرس، كما لو كتبه المعلم من «تعديل الفصول»
  await ipad.evaluate(() => {
    localStorage.setItem('classes', JSON.stringify({ grades: { g4: { classes: [{ id: 'k1', name: 'الفصل الأول', students: ['محمد', 'خالد'], team: { محمد: 0, خالد: 1 } }] } } }));
    window.dispatchEvent(new Event('classes-changed'));
  });
  await sheet(phone, 'العجلة');
  await phone.locator('.r2seg', { hasText: 'الفصل الأول' }).click();
  // من يدخل العجلة: فريق واحد فقط
  await phone.locator('.r2seg', { hasText: 'الكل' }).click();
  await closeSheet(phone);
  await sheet(phone, 'النجوم');
  await expect(phone.locator('.rstar')).toHaveCount(2);
  await phone.locator('[aria-label="نجمة لـمحمد"]').click();
  await phone.locator('[aria-label="نجمة لـمحمد"]').click();
  await phone.locator('[aria-label="غلطة على محمد"]').click();
  // الأسماء أبجدية: خالد قبل محمد
  await expect(phone.locator('.rstar b')).toHaveText(['خالد', 'محمد']);
  await expect(phone.locator('.rstar', { hasText: 'محمد' }).locator('.r2cnt.star')).toHaveText('★٢');
  await expect(phone.locator('.rstar', { hasText: 'محمد' }).locator('.r2cnt.bad')).toHaveText('✕١');
  await closeSheet(phone);
  // بعد الدوران من الجوال: نجمة لمن خرج اسمه من تحت زر العجلة مباشرة
  await sheet(phone, 'العجلة');
  const team0 = (await phone.locator('.r2seg').filter({ hasNotText: /الكل|الفصل/ }).first().textContent())!;
  await phone.locator('.r2seg', { hasText: team0 }).click();
  await phone.locator('.r2btn', { hasText: 'أدِر العجلة' }).click();
  // الشاشة: العجلة والاسم فقط، على طلاب الفريق المختار
  await expect(ipad.locator('.wheel2')).toHaveAttribute('data-pool', '1');
  await expect(ipad.locator('.wheel2 button')).toHaveCount(0);
  const who = phone.locator('.rpicked .wres');
  await expect(who).toHaveText('محمد', { timeout: 15000 });
  const name = (await who.textContent())!;
  const before = name === 'محمد' ? 2 : 0;
  // مع الفرق: من خرج اسمه يكسب نقطة لفريقه بدل نجمة
  await expect(phone.locator('.r2btn', { hasText: '★ نجمة' })).toHaveCount(0);
  await phone.locator(`[aria-label="نقطة لفريق ${team0}"]`).click();
  // إعلان على الشاشة كالنجمة، باسم الفريق، ورمزه نقطة
  await expect(ipad.locator('.cheer .cheer-msg')).toHaveText('نقطة');
  await expect(ipad.locator('.cheer .cheer-pt')).toHaveText('+١');
  await expect(ipad.locator('.cheer-name')).toHaveText(team0);
  await closeSheet(phone);
  await sheet(phone, 'الفرق');
  await expect(phone.locator('.rteam', { hasText: team0 }).locator('b')).toHaveText('١');
  await closeSheet(phone);
  await sheet(phone, 'النجوم');
  await phone.locator(`[aria-label="نجمة لـ${name}"]`).click();
  await expect(ipad.locator('.cheer-name')).toHaveText(name);
  await closeSheet(phone);
  // حذف النجمة التي أُعطيت للتو: من صف الطالب في لوحة النجوم
  await sheet(phone, 'النجوم');
  await phone.locator('.rstar', { hasText: name }).locator('.r2name').click();
  await phone.locator(`[aria-label="احذف نجمة من ${name}"]`).click();
  await expect(phone.locator('.rstar', { hasText: name }).locator('.r2cnt.star')).toHaveText(`★${'٠١٢٣'[before]}`);
  await phone.locator('.r2line .r2btn', { hasText: 'إظهار' }).click();
  await expect(ipad.locator('.sbox')).toBeVisible();
  await ipad.locator('.sbox').getByRole('button', { name: 'هذا الأسبوع' }).click();
  await ipad.locator('.sbox').getByRole('button', { name: 'إظهار النجوم' }).click();
  await expect(ipad.locator('.scard', { hasText: 'محمد' }).locator('.stot')).toHaveText('١');
  // حذف غلطة محمد يرفع مجموعه
  if (name !== 'محمد') await phone.locator('.rstar', { hasText: 'محمد' }).locator('.r2name').click();
  await phone.locator('[aria-label="احذف غلطة من محمد"]').click();
  await expect(ipad.locator('.scard', { hasText: 'محمد' }).locator('.stot')).toHaveText('٢');
  // منصة الأسبوع الماضي تُفتح من الجوال (فارغة هنا: النجوم كلها من هذا الأسبوع)
  await phone.locator('.r2fold', { hasText: 'منصة الأسبوع الماضي' }).click();
  await phone.locator('.r2btn', { hasText: 'افتح المنصة' }).click();
  await expect(ipad.locator('.sbox .sempty')).toContainText('لا نجوم');
  expect(errors).toEqual([]);
});

test('جدول الإشارات الفارغ: الجوال يضيف الإشارات، وتبقى بعد الانتقال بين الشرائح', async ({ browser }) => {
  const tally = path.join(dist, 'g2-4-1-tally-chart.html');
  test.skip(!existsSync(tally), 'درس جدول الإشارات غير مبني');
  const { ipad, phone, errors } = await pair(browser, pathToFileURL(tally).href);
  // إلى السؤال ١
  const idx = await ipad.locator('section.slide').evaluateAll((els) => els.findIndex((e) => e.querySelector('[data-qnum="1"]')));
  for (let i = 0; i < idx; i++) await phone.locator('.rnav button[aria-label="الشريحة التالية"]').click();
  await expect(ipad.locator('section.slide.active [data-qnum="1"]')).toBeVisible();
  const board = ipad.locator('section.slide.active .ltally');
  await expect(board.locator('svg.tally')).toHaveCount(0);
  const card = phone.locator('.rwidget', { hasText: 'الفصل المفضل' });
  await card.locator('button[aria-label="زيادة الصَّيْفُ"]').click();
  await card.locator('button[aria-label="زيادة الصَّيْفُ"]').click();
  // على السبورة: لمس الصف يضيف إشارة (لا أزرار على الشاشة)
  const winter = board.locator('tr[aria-label="أضف إشارة إلى الشِّتاءُ"]');
  await winter.click();
  await expect(board.locator('tbody tr').nth(2).locator('td').last()).toHaveText('٢');
  await expect(card).toContainText('عدد الإشارات كلها: ٣');
  // الإجابات تُحسب من جدول الصف، وتتغير معه
  for (let k = 0; k < 2; k++) await phone.locator('button[aria-label="الخطوة التالية"]').first().click();
  const ans = ipad.locator('section.slide.active .bkq.now .aslot.shown');
  await expect(ans).toHaveText(['الصَّيْفُ']);
  await winter.click();
  await winter.click();
  await expect(ans).toHaveText(['الشِّتَاءُ']);
  // الحذف من الجوال بعد أن يصله ما سُجّل على السبورة
  await expect(card).toContainText('عدد الإشارات كلها: ٥');
  await card.locator('button[aria-label="إنقاص الشِّتاءُ"]').click();
  await expect(card).toContainText('عدد الإشارات كلها: ٤');
  await card.locator('button[aria-label="إنقاص الشِّتاءُ"]').click();
  // السؤالان ١ و٢ تحت الجدول نفسه كما في الكتاب، والإشارات تبقى بعد الانتقال والعودة
  await expect(ipad.locator('section.slide.active [data-qnum="2"]')).toHaveCount(1);
  await phone.locator('.rnav button[aria-label="الشريحة التالية"]').click();
  await phone.locator('.rnav button[aria-label="الشريحة السابقة"]').click();
  await expect(ipad.locator('section.slide.active [data-qnum="1"]')).toBeVisible();
  await expect(ipad.locator('section.slide.active .ltally')).toContainText('عَدَدُ الْإِشَارَاتِ كُلِّهَا: ٣');
  await phone.locator('.rwidget .rbtn', { hasText: 'امسح الإشارات' }).click();
  await expect(ipad.locator('section.slide.active .ltally svg.tally')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('نهاية الحصة: الجوال يوزّع نجوم الفرق حسب الترتيب، والغائب لا يأخذ', async ({ browser }) => {
  const { ipad, phone, errors } = await pair(browser);
  await ipad.evaluate(() => {
    localStorage.setItem('classes', JSON.stringify({ grades: { g4: { classes: [{ id: 'k1', name: 'الفصل الأول', students: ['محمد', 'خالد', 'سعد'], team: { محمد: 0, خالد: 1, سعد: 1 } }] } } }));
    localStorage.setItem('stars', JSON.stringify({ events: [{ t: Date.now(), k: 'k1', s: 'سعد', d: 0 }] }));
    window.dispatchEvent(new Event('classes-changed'));
    window.dispatchEvent(new Event('stars-changed'));
  });
  await sheet(phone, 'العجلة');
  await phone.locator('.r2seg', { hasText: 'الفصل الأول' }).click();
  await closeSheet(phone);
  await sheet(phone, 'الفرق');
  await phone.locator('.rteam').nth(1).locator('.r2plus').click();
  await expect(phone.locator('.rteam').nth(1).locator('b')).toHaveText('١');
  await phone.locator('.r2btn', { hasText: 'توزيع نجوم الفرق' }).click();
  // المعاينة: الفريق الثاني أولًا بنجمتين، والأول نجمة؛ خالد وحده حاضر في الثاني
  await expect(phone.locator('.rtstars .rteam b')).toHaveText(['★ ٢', '★ ١']);
  await expect(phone.locator('.rtstars .rteam small').first()).toHaveText('الحاضرون ١');
  await phone.locator('.r2btn', { hasText: 'تأكيد التوزيع' }).click();
  await expect(phone.locator('.r2note', { hasText: 'وُزِّعت' })).toBeVisible();
  // ترتيب الفرق على الشاشة: كلها معًا، والأول في الوسط
  const pod = ipad.getByRole('dialog', { name: 'ترتيب الفرق' });
  // يظهر بعد انتهاء إعلان النقطة
  await expect(pod.locator('.pstep.on')).toHaveCount(2, { timeout: 10000 });
  await expect(pod.locator('.p1 .pwho b')).toHaveText(await phone.locator('.rteam').nth(1).locator('span').textContent() ?? '');
  await expect(pod.locator('.p1 .pwho small')).toContainText('٢ لكل طالب');
  await phone.locator('.r2btn', { hasText: 'إغلاق ترتيب الفرق' }).click();
  await expect(pod).toHaveCount(0);
  await phone.locator('.r2btn', { hasText: 'إظهار ترتيب الفرق' }).click();
  await expect(pod).toBeVisible();
  await closeSheet(phone);
  await sheet(phone, 'النجوم');
  await expect(phone.locator('.rstar', { hasText: 'خالد' }).locator('.r2cnt.star')).toHaveText('★٢');
  await expect(phone.locator('.rstar', { hasText: 'محمد' }).locator('.r2cnt.star')).toHaveText('★١');
  await expect(phone.locator('.rstar', { hasText: 'سعد' }).locator('.r2cnt.star')).toHaveText('★٠');
  expect(errors).toEqual([]);
});
