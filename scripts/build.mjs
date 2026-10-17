// يبني كل درس (أو الدروس المطابقة لوسيط سطر الأوامر) إلى ملف HTML واحد يعمل دون اتصال في dist/،
// ثم يكتب dist/index.html: فهرس الدروس الذي تنشره GitHub Pages.
// الاستعمال: npm run build            ← كل الدروس
//            npm run build -- 3-4     ← الدروس التي يحتوي مسارها على 3-4
import { build } from 'vite';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
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

// PeerJS للتحكم من الجوال: ملف مستقل يُحمَّل عند الحاجة فقط (انظر src/engine/remote.ts)
copyFileSync(path.join(root, 'node_modules', 'peerjs', 'dist', 'peerjs.min.js'), path.join(dist, 'peerjs.min.js'));


/* ---------- فهرس الدروس: مجموعة لكل صف، بترتيب مجلدات lessons/ (g1، g2، …) ---------- */

/** خط من Fontsource مضمَّن (woff2 فقط) ليطابق خط الدروس ويعمل دون اتصال */
function fontCss(pkg, file) {
  const dir = path.join(root, 'node_modules', '@fontsource', pkg);
  return readFileSync(path.join(dir, file), 'utf8')
    .replace(/,\s*url\([^)]*\.woff\)\s*format\(['"]woff['"]\)/g, '')
    .replace(/url\(\.\/files\/([^)]+\.woff2)\)/g, (_, f) => `url(data:font/woff2;base64,${readFileSync(path.join(dir, 'files', f)).toString('base64')})`);
}
const fonts = [
  ['tajawal', 'arabic-500.css'],
  ['tajawal', 'arabic-700.css'],
  ['tajawal', 'latin-500.css'],
  ['tajawal', 'latin-700.css'],
  ['baloo-bhaijaan-2', 'arabic-800.css'],
]
  .map(([p, f]) => fontCss(p, f))
  .join('\n');

const built = findLessons().filter((l) => existsSync(path.join(dist, outName(l))));
const grades = new Map();
for (const l of built) {
  const m = readMeta(l);
  if (!grades.has(m.grade)) grades.set(m.grade, []);
  grades.get(m.grade).push(
    `<a class="lesson" href="${outName(l)}"><span class="num">${esc(m.code)}</span><span class="t"><b>${esc(m.shortTitle)}</b><small>${esc(m.chapter)} · ${esc(m.source)}</small></span></a>`,
  );
}
const sections = [...grades].map(([grade, links]) => `<section>\n<h2>${esc(grade)}</h2>\n<div class="grid">\n${links.join('\n')}\n</div>\n</section>`);

// الأنماط من core.css نفسها: الألوان، ورق الرسم البياني، رأس داكن، بطاقات بإطار، والخطّان
writeFileSync(
  path.join(dist, 'index.html'),
  `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>دروس الرياضيات التفاعلية</title>
<style>
${fonts}
:root { --bg: #f3f6fb; --paper: #fff; --gridline: #dbe5f1; --ink: #13213b; --muted: #4a5875; --line: #c9d4e3; --rule: #0a58b0; --rule-t: #e2edfb;
  --display: "Baloo Bhaijaan 2", "Tajawal", "Segoe UI", Tahoma, Arial, sans-serif; --body: "Tajawal", "Segoe UI", Tahoma, Arial, sans-serif; color-scheme: light; }
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; color: var(--ink); font-family: var(--body); font-size: 18px; line-height: 1.55;
  background-color: var(--bg); background-image: linear-gradient(var(--gridline) 1px, transparent 1px), linear-gradient(90deg, var(--gridline) 1px, transparent 1px); background-size: 32px 32px; }
header { background: var(--ink); color: #fff; padding: 14px max(16px, env(safe-area-inset-right, 0px)); }
header .in, main { max-width: 1040px; margin-inline: auto; }
header b { display: block; font-family: var(--display); font-weight: 800; font-size: 1.6rem; line-height: 1.2; }
header span { font-size: .9rem; opacity: .85; font-weight: 500; }
main { padding: 24px 16px 40px; }
.tip { margin: 0 0 24px; background: var(--rule-t); border: 3px solid var(--rule); border-radius: 12px; padding: 10px 14px; font-weight: 700; }
section { margin-block-end: 28px; }
h2 { font-family: var(--display); font-weight: 800; font-size: 1.6rem; margin: 0 0 10px; line-height: 1.3; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 12px; }
.lesson { display: flex; align-items: center; gap: 14px; padding: 12px 14px; background: var(--paper); border: 3px solid var(--line); border-radius: 12px; color: inherit; text-decoration: none; }
.lesson:hover { border-color: var(--ink); }
.lesson:focus-visible { outline: 4px solid #e0590b; outline-offset: 3px; }
.num { flex: none; min-width: 2.6em; text-align: center; background: var(--rule); color: #fff; border-radius: 10px; padding: 2px 10px; font-family: var(--display); font-weight: 800; font-size: 1.5rem; }
.t { display: flex; flex-direction: column; min-width: 0; }
.t b { font-family: var(--display); font-weight: 800; font-size: 1.3rem; line-height: 1.3; }
.t small { color: var(--muted); font-weight: 700; font-size: .85rem; }
</style>
</head>
<body>
<header><div class="in"><b>دروس الرياضيات التفاعلية</b><span>عروض تفاعلية للسبورة الذكية</span></div></header>
<main>
<p class="tip">افتح الدرس ثم اضغط F لملء الشاشة. للعمل دون إنترنت احفظ صفحة الدرس (Ctrl+S): كل درس ملف واحد.</p>
${sections.join('\n')}
</main>
</body>
</html>
`,
);
console.log(`✓ dist/index.html (${built.length} درس في ${grades.size} صف)`);
