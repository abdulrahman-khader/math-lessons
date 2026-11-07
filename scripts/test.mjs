// يختبر ما تغيّر فقط، فينتهي في دقائق بدل ساعة:
//   npm test                 ← الدروس التي تغيّرت منذ آخر رفع (origin/main)، ومعها عيّنة الدروس إن تغيّر المحرك
//   npm test -- 3-4 6-2      ← الدروس التي يحتوي مسارها على أحد هذه
//   npm run test:all         ← كل الدروس وكل الفحوص
// TEST_BASE=<commit>: قارن بهذا بدل origin/main (يضبطه GitHub بآخر ما نُشر).
// --no-build: لا تبنِ (البناء جاهز، كما في GitHub حيث تُبنى الدروس كلها للنشر).
import { execSync, spawnSync } from 'node:child_process';
import { findLessons, outName, pickLessons, root } from './lessons.mjs';

const args = process.argv.slice(2);
const noBuild = args.includes('--no-build');
const all = args.includes('--all');
const filters = args.filter((a) => !a.startsWith('--'));

/** دروس متنوعة تمر على أكثر قطع المحرك، تُختبر كلما تغيّر المحرك أو الاختبارات */
const SAMPLE = [
  'g2/ch1/1-1-ones-tens',
  'g2/ch1/1-9-hundred-chart',
  'g2/ch3/3-7-fact-families',
  'g2/ch4/4-1-tally-chart',
  'g2/ch5/5-7-add-two-digit-regroup',
  'g4/ch1/1-2-place-value-millions',
  'g4/ch3/3-4-line-graphs',
  'g4/ch3/3-6-probability',
  'g4/ch4/4-7-multiply-divide-tables',
  'g4/ch6/6-4-multiply-two-digit',
  'g5/ch4/4-4-divide-two-digits',
];
/**
 * على GitHub عيّنة أصغر ليبقى النشر بضع دقائق: الاختبار الكامل يُشغَّل على الجهاز قبل رفع تغيير في المحرك.
 * (فحوص النجوم والفصول والجوال تفتح دروسها بنفسها، وكل الدروس مبنية هناك.)
 */
const CI_SAMPLE = ['g2/ch3/3-7-fact-families', 'g4/ch3/3-6-probability', 'g4/ch6/6-4-multiply-two-digit', 'g5/ch4/4-4-divide-two-digits'];

const sh = (cmd) => execSync(cmd, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
const run = (cmd, cmdArgs, env = {}) => {
  console.log(`\n▶ ${cmd} ${cmdArgs.join(' ')}`);
  const r = spawnSync(cmd, cmdArgs, { cwd: root, stdio: 'inherit', env: { ...process.env, ...env } });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

/** الملفات التي تغيّرت عن الأساس، ومعها ما لم يُحفظ بعد */
function changedFiles() {
  const base = process.env.TEST_BASE || 'origin/main';
  let files = [];
  try {
    files = sh(`git diff --name-only ${base}...HEAD`).split('\n');
  } catch {
    try {
      files = sh(`git diff --name-only ${base} HEAD`).split('\n');
    } catch {
      console.log(`⚠ لم أجد ${base}: أختبر كل شيء`);
      return null;
    }
  }
  files.push(...sh('git status --porcelain').split('\n').map((l) => l.slice(3)));
  return files.filter(Boolean);
}

let lessons;
let engine = true;
if (all) lessons = findLessons();
else if (filters.length) lessons = [...new Set(filters.flatMap((f) => pickLessons(f)))];
else {
  const files = changedFiles();
  if (!files) lessons = findLessons();
  else {
    const every = findLessons();
    lessons = every.filter((l) => files.some((f) => f.startsWith(`lessons/${l}/`)));
    // المحرك: كل ما يؤثر في الدروس خارج مجلداتها (لا ملفات الشرح ولا الصور)
    engine = files.some((f) => !f.startsWith('lessons/') && !/\.md$/.test(f) && !/^(shots|\.impeccable|\.claude|dist)\//.test(f));
    if (engine) lessons = [...new Set([...lessons, ...(process.env.CI ? CI_SAMPLE : SAMPLE).filter((l) => every.includes(l))])];
    console.log(`تغيّر ${files.length} ملفًا${engine ? '، منها ملفات المحرك أو الاختبارات' : ''}.`);
  }
}

if (!lessons.length) {
  console.log('✓ لا دروس تغيّرت ولا محرك: لا شيء لأختبره.');
  run('npm', ['run', 'typecheck']);
  process.exit(0);
}
console.log(`الدروس المختبرة (${lessons.length}): ${lessons.join('، ')}`);

run('npm', ['run', 'typecheck']);
run('npm', ['run', 'lint:css']);
if (!noBuild) run('node', ['scripts/build.mjs', ...(all ? [] : lessons.map((l) => `=${l}`))]);

// فحوص الدروس للدروس المختارة؛ وفحوص نجم الأسبوع والفصول والجوال والصوت حين يتغيّر المحرك
const specs = engine ? [] : ['tests/lesson.spec.ts'];
run('npx', ['playwright', 'test', ...specs], all ? {} : { LESSONS: lessons.map(outName).join(',') });
