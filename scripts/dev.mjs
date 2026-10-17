// خادم تطوير لدرس واحد مع إعادة التحميل الفوري.
// الاستعمال: npm run dev -- 3-4
import { createServer } from 'vite';
import { pickLessons } from './lessons.mjs';
import { lessonConfig } from '../vite.config.mjs';

const [lesson] = pickLessons(process.argv[2]);
const server = await createServer({ ...lessonConfig(lesson), logLevel: 'info', server: { port: 5173 } });
await server.listen();
console.log(`الدرس: ${lesson}`);
server.printUrls();
