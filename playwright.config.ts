import { defineConfig } from '@playwright/test';

// الاختبارات تفتح ملفات dist/*.html نفسها (file://) كما تُفتح على السبورة، دون خادم.
// تستعمل Chrome المثبّت على الجهاز (Windows يمنع نسخة Chromium التي ينزّلها Playwright).
// لتغييره: PW_CHANNEL=msedge npx playwright test
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  reporter: [['list']],
  use: { browserName: 'chromium', channel: process.env.PW_CHANNEL ?? 'chrome', locale: 'ar-SA' },
});
