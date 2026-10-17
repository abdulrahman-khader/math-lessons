import { readdirSync, statSync, existsSync } from 'node:fs';
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
  return out.sort();
}

/** اسم ملف الإخراج: g4/ch3/3-4-line-graphs → g4-3-4-line-graphs.html */
export const outName = (lesson) => {
  const parts = lesson.split('/');
  return `${parts[0]}-${parts[parts.length - 1]}.html`;
};

/** يختار الدرس من سطر الأوامر: جزء من المسار يكفي، مثل 3-4 */
export function pickLessons(arg) {
  const all = findLessons();
  if (!arg) return all;
  const hit = all.filter((l) => l.includes(arg));
  if (!hit.length) throw new Error(`لا يوجد درس يطابق "${arg}". الدروس: ${all.join(', ')}`);
  return hit;
}
