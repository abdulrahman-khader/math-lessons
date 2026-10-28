import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
/** رقم البناء: يقارن به الجوال والآيباد نسختيهما في التحكم من الجوال */
const BUILD = String(Date.now());

/** خطوط Fontsource تضم woff2 وwoff احتياطيًا؛ كل المتصفحات المستهدفة تقرأ woff2، فنحذف woff ليصغر الملف المضمَّن */
const woff2Only = {
  name: 'woff2-only',
  enforce: 'pre',
  transform(code, id) {
    if (id.includes('@fontsource') && id.endsWith('.css')) return code.replace(/,\s*url\([^)]*\.woff\)\s*format\(['"]woff['"]\)/g, '');
  },
};

/**
 * إعداد بناء درس واحد.
 * @param {string} lessonDir مسار الدرس داخل lessons/، مثل g4/ch3/3-4-line-graphs
 * @param {string} [outDir]
 * @returns {import('vite').InlineConfig}
 */
export function lessonConfig(lessonDir, outDir) {
  return {
    root,
    configFile: false,
    plugins: [woff2Only, react(), viteSingleFile()],
    define: { __BUILD__: JSON.stringify(BUILD) },
    resolve: {
      alias: {
        '@engine': path.join(root, 'src/engine'),
        '@lesson': path.join(root, 'lessons', lessonDir, 'lesson.tsx'),
      },
    },
    build: {
      // السبورات الذكية في المدارس كثيرًا ما تعمل بنسخ قديمة من Chrome
      target: ['chrome87', 'safari14', 'firefox78', 'edge88'],
      cssTarget: ['chrome87', 'safari14'],
      outDir: outDir ?? path.join(root, '.lesson-build'),
      emptyOutDir: true,
      reportCompressedSize: false,
    },
    logLevel: 'warn',
  };
}

/**
 * صفحة نجم الأسبوع (stars.html): المحرك نفسه دون درس.
 * @param {string} outDir
 * @returns {import('vite').InlineConfig}
 */
export function starsConfig(outDir) {
  const c = lessonConfig('g4/ch3/3-4-line-graphs', outDir);
  return { ...c, build: { ...c.build, rollupOptions: { input: path.join(root, 'stars.html') } } };
}

export default defineConfig(lessonConfig(process.env.LESSON ?? 'g4/ch3/3-4-line-graphs'));
