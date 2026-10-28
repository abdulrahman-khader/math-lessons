// يبني كل درس (أو الدروس المطابقة لوسيط سطر الأوامر) إلى ملف HTML واحد يعمل دون اتصال في dist/،
// ثم يكتب dist/index.html: فهرس الدروس الذي تنشره GitHub Pages.
// الاستعمال: npm run build            ← كل الدروس
//            npm run build -- 3-4     ← الدروس التي يحتوي مسارها على 3-4
import { build } from 'vite';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { root, findLessons, pickLessons, outName, readMeta } from './lessons.mjs';
import { lessonConfig, starsConfig } from '../vite.config.mjs';

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
// صفحة نجم الأسبوع: تُفتح من قائمة الدروس دون درس
{
  const tmp = path.join(root, '.lesson-build', '_stars');
  await build(starsConfig(tmp));
  copyFileSync(path.join(tmp, 'stars.html'), path.join(dist, 'stars.html'));
  console.log('✓ dist/stars.html (نجم الأسبوع)');
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
/** مجلد الصف (g2، g4) ← اسمه، وفصوله بالترتيب، ودروس كل فصل */
const grades = new Map();
for (const l of built) {
  const m = readMeta(l);
  const id = l.split('/')[0];
  if (!grades.has(id)) grades.set(id, { name: m.grade, count: 0, chapters: new Map() });
  const g = grades.get(id);
  g.count++;
  if (!g.chapters.has(m.chapter)) g.chapters.set(m.chapter, []);
  g.chapters.get(m.chapter).push(
    `<a class="lesson" href="${outName(l)}"><span class="num">${esc(m.code)}</span><span class="t"><b>${esc(m.shortTitle)}</b><small>${esc(m.source)}</small></span></a>`,
  );
}

const arDigits = (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
/** ١ درس، ٢ درسان، ٣–١٠ دروس، ١١ فأكثر درسًا */
const lessonsCount = (n) => (n === 1 ? 'درس واحد' : n === 2 ? 'درسان' : n <= 10 ? `${arDigits(n)} دروس` : `${arDigits(n)} درسًا`);

// الصفحة الأولى: بطاقة لكل صف. الضغط عليها يفتح #g4 مثلًا فتظهر فصول ذلك الصف ودروسه
const picker = [...grades]
  .map(([id, g]) => `<a class="grade" href="#${id}"><b>${esc(g.name)}</b><small>${lessonsCount(g.count)}</small></a>`)
  .join('\n');
const sections = [...grades].map(
  ([id, g]) =>
    `<section id="${id}" class="lessons" hidden>\n<a class="back" href="#">رجوع إلى الصفوف</a>\n<h2>${esc(g.name)}</h2>\n` +
    [...g.chapters].map(([ch, links]) => `<h3>${esc(ch)}</h3>\n<div class="grid">\n${links.join('\n')}\n</div>`).join('\n') +
    `\n</section>`,
);

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
[hidden] { display: none !important; }
#picker { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; }
.ask { font-family: var(--display); font-weight: 800; font-size: 1.6rem; margin: 0 0 14px; line-height: 1.3; }
.grades { width: min(100%, 680px); display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 16px; }
.grade { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 28px 22px; background: var(--paper); border: 3px solid var(--line); border-block-start: 10px solid var(--rule); border-radius: 14px; color: inherit; text-decoration: none; }
.grade:hover { border-color: var(--ink); }
.grade:focus-visible, .back:focus-visible { outline: 4px solid #e0590b; outline-offset: 3px; }
.grade b { font-family: var(--display); font-weight: 800; font-size: 2rem; line-height: 1.3; }
.grade small { color: var(--muted); font-weight: 700; font-size: 1.05rem; }
.back { display: inline-block; margin-block-end: 14px; padding: 6px 16px; background: var(--paper); border: 3px solid var(--line); border-radius: 999px; color: var(--ink); font-weight: 700; text-decoration: none; }
.back:hover { border-color: var(--ink); }
h2 { font-family: var(--display); font-weight: 800; font-size: 1.9rem; margin: 0 0 6px; line-height: 1.3; }
h3 { font-weight: 700; font-size: 1.15rem; color: var(--muted); margin: 18px 0 10px; line-height: 1.5; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 12px; }
.lesson { display: flex; align-items: center; gap: 14px; padding: 12px 14px; background: var(--paper); border: 3px solid var(--line); border-radius: 12px; color: inherit; text-decoration: none; }
.lesson:hover { border-color: var(--ink); }
.lesson:focus-visible { outline: 4px solid #e0590b; outline-offset: 3px; }
.num { flex: none; min-width: 2.6em; text-align: center; background: var(--rule); color: #fff; border-radius: 10px; padding: 2px 10px; font-family: var(--display); font-weight: 800; font-size: 1.5rem; }
.t { display: flex; flex-direction: column; min-width: 0; }
.t b { font-family: var(--display); font-weight: 800; font-size: 1.3rem; line-height: 1.3; }
.t small { color: var(--muted); font-weight: 700; font-size: .85rem; }
.stars { display: grid; grid-template-columns: auto 1fr; align-items: center; column-gap: 14px; margin: 0 0 18px; padding: 14px 18px; background: #fff6d6; border: 3px solid #e8a400; border-radius: 14px; color: inherit; text-decoration: none; }
.stars span { grid-row: span 2; font-size: 2.4rem; line-height: 1; color: #e8a400; }
.stars b { font-family: var(--display); font-weight: 800; font-size: 1.5rem; line-height: 1.3; }
.stars small { color: var(--muted); font-weight: 700; }
.stars:hover { border-color: var(--ink); }
.stars:focus-visible { outline: 4px solid #e0590b; outline-offset: 3px; }
</style>
</head>
<body>
<header><div class="in"><b>دروس الرياضيات التفاعلية</b><span>عروض تفاعلية للسبورة الذكية</span></div></header>
<main>
<a class="stars" href="stars.html"><span>★</span><b>نجم الأسبوع</b><small>النجوم والترتيب والعجلة لكل فصولك</small></a>
<p class="tip">افتح الدرس ثم اضغط F لملء الشاشة. للعمل دون إنترنت احفظ صفحة الدرس (Ctrl+S): كل درس ملف واحد.</p>
<div id="picker">
<h2 class="ask">اختر الصف</h2>
<div class="grades">
${picker}
</div>
</div>
${sections.join('\n')}
</main>
<script>
// يعرض دروس الصف الذي في الرابط (#g4)، أو بطاقات الصفوف إن لم يكن فيه صف. زر الرجوع في المتصفح يعمل لأن الصف في الرابط
function show() {
  const id = decodeURIComponent(location.hash.slice(1));
  let found = false;
  for (const s of document.querySelectorAll('section.lessons')) {
    s.hidden = s.id !== id;
    if (s.id === id) found = true;
  }
  document.getElementById('picker').hidden = found;
  window.scrollTo(0, 0);
}
addEventListener('hashchange', show);
show();
</script>
</body>
</html>
`,
);
console.log(`✓ dist/index.html (${built.length} درس في ${grades.size} صف)`);
