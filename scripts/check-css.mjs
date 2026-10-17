// يرفض الخصائص الفيزيائية الأفقية في CSS والأنماط المضمنة، وletter-spacing.
// الصفحات RTL؛ استعمل margin-inline-start بدل margin-left، وinset-inline-end بدل right، وهكذا.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { root } from './lessons.mjs';

const RULES = [
  [/(?<![-\w])(margin|padding|border)-(left|right)\b/, 'استعمل -inline-start / -inline-end'],
  [/(?<![-\w])(left|right)\s*:/, 'استعمل inset-inline-start / inset-inline-end'],
  [/(?<![-\w])(marginLeft|marginRight|paddingLeft|paddingRight|borderLeft|borderRight)\b/, 'استعمل marginInlineStart وما يشبهها'],
  [/(?<![-\w])(left|right)\s*:\s*['"\d]/, 'استعمل insetInlineStart / insetInlineEnd'],
  [/text-align\s*:\s*(left|right)|textAlign\s*:\s*['"](left|right)/, 'استعمل start / end'],
  [/float\s*:\s*(left|right)/, 'استعمل inline-start / inline-end'],
  [/letter-spacing|letterSpacing/, 'التباعد بين الحروف يقطع اتصال الحروف العربية'],
];

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = path.join(d, f);
  return statSync(p).isDirectory() ? walk(p) : /\.(css|tsx)$/.test(f) ? [p] : [];
});

const problems = [];
for (const file of [...walk(path.join(root, 'src')), ...walk(path.join(root, 'lessons'))]) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    // أسطر الرسم داخل SVG تستعمل إحداثيات x/y لا خصائص CSS، فلا تتأثر
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
    // في ملفات TSX تُفحص الأنماط المضمنة فقط، لا أسماء المتغيرات العادية
    if (file.endsWith('.tsx') && !/style=\{|CSSProperties/.test(line)) return;
    for (const [re, fix] of RULES) {
      if (re.test(line)) problems.push(`${path.relative(root, file)}:${i + 1}: ${line.trim().slice(0, 90)}\n    ← ${fix}`);
    }
  });
}
if (problems.length) {
  console.error(`خصائص اتجاهية ممنوعة (${problems.length}):\n` + problems.join('\n'));
  process.exit(1);
}
console.log('✓ CSS: خصائص منطقية فقط، ولا letter-spacing');
