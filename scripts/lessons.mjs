import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** كل مجلد داخل lessons/ فيه lesson.tsx هو درس. يعيد مسارات مثل g4/ch3/3-4-line-graphs */
export function findLessons(dir = path.join(root, 'lessons'), rel = '') {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    const r = rel ? `${rel}/${name}` : name;
    if (existsSync(path.join(full, 'lesson.tsx'))) out.push(r);
    else out.push(...findLessons(full, r));
  }
  return out.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

/** اسم ملف الإخراج: g4/ch3/3-4-line-graphs → g4-3-4-line-graphs.html */
export const outName = (lesson) => {
  const parts = lesson.split('/');
  return `${parts[0]}-${parts[parts.length - 1]}.html`;
};

/** يقرأ بيانات الدرس النصية من lesson.tsx دون تشغيله (للفهرس وعنوان الصفحة) */
export function readMeta(lesson) {
  const src = readFileSync(path.join(root, 'lessons', lesson, 'lesson.tsx'), 'utf8');
  const field = (k) => src.match(new RegExp(`\\b${k}:\\s*'([^']*)'`))?.[1] ?? '';
  return { code: field('code'), shortTitle: field('shortTitle'), grade: field('grade'), chapter: field('chapter'), source: field('source') };
}

/** يختار الدرس من سطر الأوامر: جزء من المسار يكفي، مثل 3-4 */
export function pickLessons(arg) {
  const all = findLessons();
  if (!arg) return all;
  const hit = all.filter((l) => l.includes(arg));
  if (!hit.length) throw new Error(`لا يوجد درس يطابق "${arg}". الدروس: ${all.join(', ')}`);
  return hit;
}
