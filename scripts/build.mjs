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
  ['noto-naskh-arabic', 'arabic-500.css'],
  ['noto-naskh-arabic', 'arabic-600.css'],
  ['noto-naskh-arabic', 'arabic-700.css'],
]
  .map(([p, f]) => fontCss(p, f))
  .join('\n');

/** لون لكل صف بترتيبه، من ألوان أقسام التصميم الجديد */
const GRADE_COLORS = ['#0f7c85', '#1554b8', '#5a1f9e', '#b8226a'];
const built = findLessons().filter((l) => existsSync(path.join(dist, outName(l))));
/** مجلد الصف (g2، g4) ← اسمه، وفصوله بالترتيب، ودروس كل فصل */
const grades = new Map();
for (const l of built) {
  const m = readMeta(l);
  const id = l.split('/')[0];
  if (!grades.has(id)) grades.set(id, { name: m.grade, count: 0, chapters: new Map(), color: GRADE_COLORS[grades.size % GRADE_COLORS.length] });
  const g = grades.get(id);
  g.count++;
  if (!g.chapters.has(m.chapter)) g.chapters.set(m.chapter, []);
  g.chapters.get(m.chapter).push(
    `<a class="lesson" href="${outName(l)}"><span class="num">${esc(m.code)}</span><span class="t"><b>${esc(m.shortTitle)}</b><small>${esc(m.source.replace(/\s*·\s*/g, '، '))}</small></span></a>`,
  );
}

const arDigits = (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
/** ١ درس، ٢ درسان، ٣–١٠ دروس، ١١ فأكثر درسًا */
const lessonsCount = (n) => (n === 1 ? 'درس واحد' : n === 2 ? 'درسان' : n <= 10 ? `${arDigits(n)} دروس` : `${arDigits(n)} درسًا`);

// الصفحة الأولى: بطاقة لكل صف. الضغط عليها يفتح #g4 مثلًا فتظهر فصول ذلك الصف ودروسه
const picker = [...grades]
  .map(([id, g]) => `<a class="tile grade" href="#${id}" style="--c:${g.color}"><b>${esc(g.name)}</b><small>${lessonsCount(g.count)}</small></a>`)
  .join('\n');
const sections = [...grades].map(
  ([id, g]) =>
    `<section id="${id}" class="lessons" hidden style="--c:${g.color}">\n<a class="back" href="#">الصفوف</a>\n<h2>${esc(g.name)}</h2>\n` +
    [...g.chapters].map(([ch, links]) => `<h3>${esc(ch)}</h3>\n<div class="grid">\n${links.join('\n')}\n</div>`).join('\n') +
    `\n</section>`,
);

// شكل التصميم الجديد: أبيض، حبر داكن، خط النسخ، شريط رأس فاتح بخط تحته، وبطاقات رمادية بشريط ملوّن على حافتها
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
:root { --ink: #0b1226; --muted: #4a5568; --band: #eceff4; --band-line: #c3c8d1; --tile: #f5f6f8; --gold: #a87000;
  --body: "Noto Naskh Arabic", "Geeza Pro", serif; color-scheme: light; }
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; background: #fff; color: var(--ink); font-family: var(--body); font-size: 18px; line-height: 1.7; }
header { background: var(--band); border-block-end: 3px solid var(--band-line); padding: 14px max(16px, env(safe-area-inset-right, 0px)); }
header .in, main { max-width: 1040px; margin-inline: auto; }
header b { display: block; font-size: 1.7rem; font-weight: 700; line-height: 1.5; }
header span { color: var(--muted); font-size: 1rem; font-weight: 500; }
main { padding: 28px 16px 48px; }
[hidden] { display: none !important; }
a { color: inherit; text-decoration: none; }
a:focus-visible { outline: 4px solid var(--ink); outline-offset: 3px; }
/* البطاقة الواحدة: رمادية فاتحة، وشريط سميك بلونها على حافتها، كأقسام غلاف الدرس */
.tile { position: relative; display: flex; flex-direction: column; justify-content: center; gap: 2px; padding-block: 18px; padding-inline: 34px 20px; border-radius: 16px; background: var(--tile); }
.tile::before { content: ""; position: absolute; inset-block: 0; inset-inline-start: 0; width: 12px; border-start-start-radius: 16px; border-end-start-radius: 16px; background: var(--c, var(--ink)); }
.tile:hover { background: #eceef2; }
.tile b { font-weight: 700; line-height: 1.5; }
.tile small { color: var(--muted); font-weight: 600; font-size: 1rem; }
.stars { --c: var(--gold); margin-block-end: 36px; flex-direction: row; align-items: center; justify-content: flex-start; gap: 16px; }
.stars svg { flex: none; width: 44px; height: 44px; fill: #f5b400; stroke: #e8a400; stroke-width: .8; stroke-linejoin: round; }
.stars b { font-size: 1.5rem; }
.stars span { display: flex; flex-direction: column; }
#picker h2 { margin: 0 0 14px; font-size: 1.6rem; }
.grades { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 16px; }
.grade { min-height: 140px; }
.grade b { font-size: 2rem; }
.back { display: inline-flex; align-items: center; gap: 8px; height: 44px; margin-block-end: 12px; padding: 0 18px; border-radius: 999px; background: var(--band); font-weight: 700; }
.back::before { content: "→"; }
.back:hover { background: #e1e5ec; }
.lessons h2 { margin: 0; font-size: 2rem; line-height: 1.5; }
h3 { margin: 26px 0 10px; color: var(--muted); font-size: 1.15rem; font-weight: 700; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 12px; }
.lesson { display: flex; align-items: center; gap: 16px; padding: 12px 16px; border-radius: 16px; background: var(--tile); }
.lesson:hover { background: #eceef2; }
.num { flex: none; display: grid; place-items: center; min-width: 64px; height: 48px; padding: 6px 12px 0; border-radius: 999px; background: var(--c); color: #fff; font-size: 1.35rem; font-weight: 700; line-height: 1; }
.t { display: flex; flex-direction: column; min-width: 0; }
.t b { font-size: 1.3rem; font-weight: 700; line-height: 1.5; }
.t small { color: var(--muted); font-weight: 600; font-size: .95rem; }
</style>
</head>
<body>
<header><div class="in"><b>دروس الرياضيات التفاعلية</b><span>عروض للسبورة الذكية</span></div></header>
<main>
<a class="tile stars" href="stars.html"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2l2.95 6.2 6.8.86-5 4.7 1.28 6.74L12 17.4l-6.03 3.3 1.28-6.74-5-4.7 6.8-.86z"/></svg><span><b>نجم الأسبوع</b><small>النجوم والترتيب والعجلة لكل فصولك</small></span></a>
<div id="picker">
<h2>اختر الصف</h2>
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
  // نجم الأسبوع في الصفحة الأولى فقط، فتبدأ دروس الصف من أعلى الصفحة
  document.querySelector('.stars').hidden = found;
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
