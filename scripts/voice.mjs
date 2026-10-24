// يولّد صوت مقطع «الفكرة في دقيقة» لكل درس من نصّه المرافق (captions) عبر ElevenLabs.
// لكل جملة ملف mp3 في مجلد voice/ بجانب clip.tsx، وملف voice/index.ts يربطها بالمقطع.
// الملفات تُحفظ في المستودع، فالبناء والاختبارات لا تحتاج المفتاح ولا الإنترنت.
//
// الاستعمال: npm run voice                ← كل الدروس
//            npm run voice -- g2/ch4      ← الدروس التي يحتوي مسارها على g2/ch4
//            npm run voice -- ch4 3-6 3-7 ← عدة أجزاء معًا
//            npm run voice -- --voiced    ← الدروس المختارة للصوت (VOICED أدناه)
//            npm run voice -- --voices    ← أصوات الحساب العربية المتاحة
// المفتاح من ELEVENLABS_API_KEY أو من ملف .env.local (لا يُرفع إلى GitHub).
// الصوت من ELEVENLABS_VOICE_ID (أو VOICE_ID في .env.local).
// نص القراءة: narration.json بجانب clip.tsx (جملة لكل سطر من captions، مشكولة) إن وُجد.
// لا يُعاد توليد جملة لم يتغير نصها: الجمل المولَّدة مسجلة في voice/manifest.json.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { root, pickLessons } from './lessons.mjs';

const env = { ...readEnv(path.join(root, '.env.local')), ...process.env };
const KEY = env.ELEVENLABS_API_KEY;
const VOICE = env.ELEVENLABS_VOICE_ID ?? env.VOICE_ID;
const MODEL = env.ELEVENLABS_MODEL ?? 'eleven_multilingual_v2';
const API = 'https://api.elevenlabs.io/v1';

function readEnv(file) {
  if (!existsSync(file)) return {};
  return Object.fromEntries(
    readFileSync(file, 'utf8')
      .split('\n')
      .map((l) => l.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/))
      .filter(Boolean)
      .map((m) => [m[1], m[2].replace(/^['"]|['"]$/g, '')]),
  );
}

if (!KEY) {
  console.error('لا يوجد مفتاح ElevenLabs. ضع ELEVENLABS_API_KEY=… في ملف .env.local في مجلد المشروع.');
  process.exit(1);
}

async function api(p, init = {}) {
  const r = await fetch(API + p, { ...init, headers: { 'xi-api-key': KEY, 'content-type': 'application/json', ...init.headers } });
  if (!r.ok) throw new Error(`ElevenLabs ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return r.json();
}

if (process.argv.includes('--voices')) {
  const { voices } = await api('/voices');
  for (const v of voices) console.log(`${v.voice_id}  ${v.name}  ${v.labels?.gender ?? ''} ${v.labels?.accent ?? ''} ${v.labels?.language ?? ''}`);
  process.exit(0);
}
if (!VOICE) {
  console.error('اختر صوتًا: ضع ELEVENLABS_VOICE_ID=… في .env.local (npm run voice -- --voices يعرض الأصوات).');
  process.exit(1);
}

/** نص يُقرأ جيدًا: بلا علامات الإبراز، والرموز الرياضية كلمات، والأرقام لاتينية يقرؤها المحرك بالعربية */
const speakable = (s) =>
  s
    .replace(/\*\*/g, '')
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/\s*\+\s*/g, ' زائد ')
    .replace(/\s*[−-]\s*(?=\d)/g, ' ناقص ')
    .replace(/\s*×\s*/g, ' ضرب ')
    .replace(/\s*÷\s*/g, ' قسمة ')
    .replace(/\s*=\s*/g, ' يساوي ')
    .replace(/\s*>\s*/g, ' أكبر من ')
    .replace(/\s*<\s*/g, ' أصغر من ')
    .replace(/[←→✓✗○□△]/g, ' ')
    .replace(/\s*·\s*/g, '، ')
    .replace(/\s+/g, ' ')
    .trim();

/** جمل captions من clip.tsx دون تشغيله: [[زمن، 'نص'], …] */
function readCaptions(file) {
  const src = readFileSync(file, 'utf8');
  const block = src.slice(src.indexOf('captions={['));
  return [...block.matchAll(/\[\s*([\d.]+)\s*,\s*'((?:[^'\\]|\\.)*)'\s*\]/g)].map((m) => [Number(m[1]), m[2]]);
}

/** الدروس التي فيها صوت: آخر درسين في الفصل الثالث، والفصل الرابع كاملًا، للصفين */
const VOICED = ['g2/ch3/3-6', 'g2/ch3/3-7', 'g4/ch3/3-5', 'g4/ch3/3-6', 'g2/ch4/', 'g4/ch4/'];
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const wanted = process.argv.includes('--voiced') ? VOICED : args;
const lessons = wanted.length ? [...new Set(wanted.flatMap((a) => pickLessons(a)))] : pickLessons();

let made = 0;
let reused = 0;
for (const lesson of lessons) {
  const dir = path.join(root, 'lessons', lesson);
  const clip = path.join(dir, 'clip.tsx');
  if (!existsSync(clip)) continue;
  const caps = readCaptions(clip);
  // نص القراءة المشكول (narration.json) إن وُجد، وإلا يُقرأ النص الظاهر نفسه
  const narrFile = path.join(dir, 'narration.json');
  const narr = existsSync(narrFile) ? JSON.parse(readFileSync(narrFile, 'utf8')) : null;
  if (narr && narr.length !== caps.length) throw new Error(`${lesson}: narration.json فيه ${narr.length} جمل والمقطع فيه ${caps.length}`);
  const out = path.join(dir, 'voice');
  mkdirSync(out, { recursive: true });
  const manPath = path.join(out, 'manifest.json');
  const manifest = existsSync(manPath) ? JSON.parse(readFileSync(manPath, 'utf8')) : {};
  const lines = [];
  for (const [i, [, text]] of caps.entries()) {
    const say = narr ? narr[i] : speakable(text);
    const hash = createHash('sha1').update(`${VOICE}|${MODEL}|${say}`).digest('hex').slice(0, 12);
    const file = `${String(i).padStart(2, '0')}-${hash}.mp3`;
    if (manifest[file] && existsSync(path.join(out, file))) {
      lines.push({ file, d: manifest[file].d });
      reused++;
      continue;
    }
    const res = await api(`/text-to-speech/${VOICE}/with-timestamps?output_format=mp3_44100_64`, {
      method: 'POST',
      body: JSON.stringify({ text: say, model_id: MODEL, voice_settings: { stability: 0.55, similarity_boost: 0.8, speed: 0.92 } }),
    });
    const ends = res.alignment?.character_end_times_seconds ?? [];
    const d = Math.round((ends.at(-1) ?? 0) * 100) / 100 + 0.15;
    writeFileSync(path.join(out, file), Buffer.from(res.audio_base64, 'base64'));
    manifest[file] = { text: say, d };
    lines.push({ file, d });
    made++;
    console.log(`  ${lesson} [${i}] ${d.toFixed(1)}ث  ${say}`);
  }
  // احذف ملفات جمل لم تعد في المقطع
  const keep = new Set(lines.map((l) => l.file));
  for (const f of readdirSync(out)) if (f.endsWith('.mp3') && !keep.has(f)) rmSync(path.join(out, f));
  for (const f of Object.keys(manifest)) if (!keep.has(f)) delete manifest[f];
  writeFileSync(manPath, JSON.stringify(manifest, null, 1) + '\n');
  writeFileSync(
    path.join(out, 'index.ts'),
    `// يولّده scripts/voice.mjs؛ لا تعدّله يدويًا.\nimport type { VoiceLine } from '@engine';\n` +
      lines.map((l, i) => `import a${i} from './${l.file}';`).join('\n') +
      `\n\nconst voice: VoiceLine[] = [\n` +
      lines.map((l, i) => `  { src: a${i}, d: ${l.d} },`).join('\n') +
      `\n];\nexport default voice;\n`,
  );
  // اربط الصوت بالمقطع أول مرة: import voice + voice={voice}
  let cs = readFileSync(clip, 'utf8');
  if (!cs.includes("from './voice'")) {
    cs = cs.replace(/(import [^\n]+ from '@engine';\n)/, `$1import voice from './voice';\n`).replace('<Clip\n', '<Clip\n    voice={voice}\n');
    writeFileSync(clip, cs);
  }
  // كم ستطول الجمل عن مكانها في المقطع (المقطع ينتظر انتهاء الجملة)
  const over = caps.map(([s], i) => lines[i].d - ((caps[i + 1]?.[0] ?? Infinity) - s)).filter((x) => x > 0);
  console.log(`✓ ${lesson}: ${lines.length} جمل${over.length ? ` · يطول المقطع نحو ${over.reduce((a, b) => a + b, 0).toFixed(0)} ث لينتهي الكلام` : ''}`);
}
console.log(`جُمل جديدة: ${made} · محفوظة من قبل: ${reused}`);
