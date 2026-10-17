// يبني كل درس (أو الدروس المطابقة لوسيط سطر الأوامر) إلى ملف HTML واحد يعمل دون اتصال في dist/
// الاستعمال: npm run build            ← كل الدروس
//            npm run build -- 3-4     ← الدروس التي يحتوي مسارها على 3-4
import { build } from 'vite';
import { mkdirSync, renameSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';
import { root, pickLessons, outName } from './lessons.mjs';
import { lessonConfig } from '../vite.config.mjs';

const dist = path.join(root, 'dist');
mkdirSync(dist, { recursive: true });

for (const lesson of pickLessons(process.argv[2])) {
  const tmp = path.join(root, '.lesson-build', lesson.replace(/\//g, '_'));
  await build(lessonConfig(lesson, tmp));
  const out = path.join(dist, outName(lesson));
  rmSync(out, { force: true });
  renameSync(path.join(tmp, 'index.html'), out);
  console.log(`✓ ${lesson} → dist/${outName(lesson)} (${(statSync(out).size / 1024).toFixed(0)} KB)`);
}
rmSync(path.join(root, '.lesson-build'), { recursive: true, force: true });
