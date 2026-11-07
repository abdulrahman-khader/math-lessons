import { defineConfig } from '@playwright/test';
import { availableParallelism } from 'node:os';

// الاختبارات تفتح ملفات dist/*.html نفسها (file://) كما تُفتح على السبورة، دون خادم.
// تستعمل Chrome المثبّت على الجهاز (Windows يمنع نسخة Chromium التي ينزّلها Playwright).
// لتغييره: PW_CHANNEL=msedge npx playwright test
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  // كل الأنوية إلا واحدة (خوادم GitHub فيها ٤)
  workers: Math.max(2, availableParallelism() - 1),
  reporter: [['list']],
  // الفحوص التي تمر على كل الشرائح تقارب ٣٠ ثانية محليًا، وأبطأ على خوادم GitHub
  timeout: 90_000,
  use: { browserName: 'chromium', channel: process.env.PW_CHANNEL ?? 'chrome', locale: 'ar-SA' },
});
