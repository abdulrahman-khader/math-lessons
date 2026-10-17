// يبني كل درس (أو الدروس المطابقة لوسيط سطر الأوامر) إلى ملف HTML واحد يعمل دون اتصال في dist/،
// ثم يكتب dist/index.html: فهرس الدروس الذي تنشره GitHub Pages.
// الاستعمال: npm run build            ← كل الدروس
//            npm run build -- 3-4     ← الدروس التي يحتوي مسارها على 3-4
import { build } from 'vite';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { root, findLessons, pickLessons, outName, readMeta } from './lessons.mjs';
import { lessonConfig } from '../vite.config.mjs';

const dist = path.join(root, 'dist');
mkdirSync(dist, { recursive: true });

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

for (const lesson of pickLessons(process.argv[2])) {
  const tmp = path.join(root, '.lesson-build', lesson.replace(/\//g, '_'));
  await build(lessonConfig(lesson, tmp));
  const m = readMeta(lesson);
  // العنوان الحقيقي من البداية، لا بعد تشغيل السكربت: للمفضلة ونتائج البحث ومعاينات الروابط
  const html = readFileSync(path.join(tmp, 'index.html'), 'utf8').replace('<title>درس</title>', `<title>${esc(`${m.shortTitle} ${m.code}`)}</title>`);
  const out = path.join(dist, outName(lesson));
  writeFileSync(out, html);
  console.log(`✓ ${lesson} → dist/${outName(lesson)} (${(statSync(out).size / 1024).toFixed(0)} KB)`);
}
rmSync(path.join(root, '.lesson-build'), { recursive: true, force: true });

/* ---------- فهرس الدروس: مجموعة لكل صف، بترتيب مجلدات lessons/ (g1، g2، …) ---------- */
const built = findLessons().filter((l) => existsSync(path.join(dist, outName(l))));
const grades = new Map();
for (const l of built) {
  const m = readMeta(l);
  if (!grades.has(m.grade)) grades.set(m.grade, []);
  grades.get(m.grade).push(
    `<a class="lesson" href="${outName(l)}"><span class="code">${esc(m.code)}</span><span class="t"><b>${esc(m.shortTitle)}</b><small>${esc(m.chapter)} · ${esc(m.source)}</small></span></a>`,
  );
}
const items = [...grades].map(([grade, links]) => `<section>\n<h2>${esc(grade)}</h2>\n${links.join('\n')}\n</section>`);

writeFileSync(
  path.join(dist, 'index.html'),
  `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دروس الرياضيات التفاعلية</title>
<style>
:root { --bg: #f3f6fb; --ink: #13213b; --muted: #4a5875; --line: #c9d4e3; --rule: #0a58b0; color-scheme: light; }
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: "Segoe UI", Tahoma, Arial, sans-serif; line-height: 1.6; }
main { max-width: 760px; margin-inline: auto; padding: 32px 16px; }
h1 { margin: 0 0 4px; font-size: 1.8rem; }
p { margin: 0 0 24px; color: var(--muted); }
section { margin-block-end: 28px; }
h2 { font-size: 1.25rem; margin: 0 0 10px; padding-block-end: 6px; border-block-end: 2px solid var(--line); }
.lesson { display: flex; align-items: center; gap: 16px; padding: 14px 16px; margin-block-end: 10px; background: #fff; border: 2px solid var(--line); border-radius: 10px; color: inherit; text-decoration: none; }
.lesson:hover, .lesson:focus-visible { border-color: var(--rule); outline: none; }
.code { flex: none; min-width: 3.2em; text-align: center; background: var(--rule); color: #fff; border-radius: 8px; padding: 4px 8px; font-weight: 700; font-size: 1.2rem; }
.t { display: flex; flex-direction: column; min-width: 0; }
.t b { font-size: 1.15rem; }
.t small { color: var(--muted); }
</style>
</head>
<body>
<main>
<h1>دروس الرياضيات التفاعلية</h1>
<p>عروض للسبورة الذكية. افتح الدرس ثم اضغط F لملء الشاشة. للعمل دون إنترنت: احفظ الصفحة من المتصفح (Ctrl+S)، فكل درس ملف واحد.</p>
${items.join('\n')}
</main>
</body>
</html>
`,
);
console.log(`✓ dist/index.html (${built.length} درس في ${grades.size} صف)`);
