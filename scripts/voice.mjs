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
// كل ملف يُرفع صوته بـ ffmpeg (brew install ffmpeg) لسماعة اللابتوب في الفصل، ويُسجَّل loud في manifest.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { root, pickLessons } from './lessons.mjs';

const env = { ...readEnv(path.join(root, '.env.local')), ...process.env };
const KEY = env.ELEVENLABS_API_KEY;
const VOICE = env.ELEVENLABS_VOICE_ID ?? env.VOICE_ID;
const MODEL = env.ELEVENLABS_MODEL ?? 'eleven_multilingual_v2';
// أصوات شخصيات المقطع الكرتوني (story.tsx): ولدان (سالم وخالد)؛ الراوي هو الصوت الأساسي
const VOICES = {
  narrator: VOICE,
  boy: env.ELEVENLABS_VOICE_BOY ?? 'R6nda3uM038xEEKi7GFl',
  boy2: env.ELEVENLABS_VOICE_BOY2 ?? 'G1HOkzin3NMwRHSq60UI',
};
const API = 'https://api.elevenlabs.io/v1';

// يرفع الصوت إلى نحو −١١ LUFS: ضاغط يقرّب الهمس من الجهر، ثم تكبير ومحدِّد يمنع القصّ فلا يتشوّه
function loud(file) {
  const tmp = file.replace(/\.mp3$/, '.tmp.mp3');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', file, '-af', 'acompressor=threshold=-30dB:ratio=4:attack=5:release=120,volume=26dB,alimiter=limit=0.8:attack=1:release=60:level=false', '-ar', '44100', '-ac', '1', '-b:a', '64k', tmp]);
  rmSync(file);
  writeFileSync(file, readFileSync(tmp));
  rmSync(tmp);
}

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
  // القصة (story.tsx): lines={[[زمن، 'متكلم'، 'نص'], …]}
  if (src.includes('lines={[')) {
    const block = src.slice(src.indexOf('lines={['));
    return [...block.matchAll(/\[\s*([\d.]+)\s*,\s*'(n|boy|boy2)'\s*,\s*'((?:[^'\\]|\\.)*)'\s*\]/g)].map((m) => [Number(m[1]), m[3], m[2] === 'n' ? 'narrator' : m[2]]);
  }
  const block = src.slice(src.indexOf('captions={['));
  return [...block.matchAll(/\[\s*([\d.]+)\s*,\s*'((?:[^'\\]|\\.)*)'\s*\]/g)].map((m) => [Number(m[1]), m[2]]);
}

/** الدروس التي فيها صوت: آخر درسين في الفصل الثالث، والفصل الرابع كاملًا، للصفين */
const VOICED = ['g2/ch1/', 'g4/ch1/', 'g2/ch2/', 'g4/ch2/', 'g2/ch3/', 'g4/ch3/', 'g2/ch4/', 'g4/ch4/', 'g2/ch5/', 'g4/ch5/', 'g2/ch6/', 'g4/ch6/', 'g5/ch4/', 'g9/ch4/'];
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const wanted = process.argv.includes('--voiced') ? VOICED : args;
const lessons = wanted.length ? [...new Set(wanted.flatMap((a) => pickLessons(a)))] : pickLessons();

let made = 0;
let reused = 0;

/**
 * يولّد ملف صوت لكل جملة في out، ويكتب out/index.ts.
 * items: [{ say, who? }]؛ who يختار صوت الشخصية (الراوي إن لم يُذكر).
 */
async function generate(items, out, label) {
  mkdirSync(out, { recursive: true });
  const manPath = path.join(out, 'manifest.json');
  const manifest = existsSync(manPath) ? JSON.parse(readFileSync(manPath, 'utf8')) : {};
  const lines = [];
  for (const [i, { say, who = 'narrator' }] of items.entries()) {
    const voice = VOICES[who];
    if (!voice) throw new Error(`${label}: صوت غير معروف «${who}»`);
    const hash = createHash('sha1').update(`${voice}|${MODEL}|${say}`).digest('hex').slice(0, 12);
    const file = `${String(i).padStart(2, '0')}-${hash}.mp3`;
    if (manifest[file] && existsSync(path.join(out, file))) {
      if (!manifest[file].loud) {
        loud(path.join(out, file));
        manifest[file].loud = true;
      }
      lines.push({ file, d: manifest[file].d });
      reused++;
      continue;
    }
    const res = await api(`/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_64`, {
      method: 'POST',
      body: JSON.stringify({ text: say, model_id: MODEL, voice_settings: { stability: 0.55, similarity_boost: 0.8, speed: 0.92 } }),
    });
    const ends = res.alignment?.character_end_times_seconds ?? [];
    const d = Math.round((ends.at(-1) ?? 0) * 100) / 100 + 0.15;
    writeFileSync(path.join(out, file), Buffer.from(res.audio_base64, 'base64'));
    loud(path.join(out, file));
    manifest[file] = { text: say, who, d, loud: true };
    lines.push({ file, d });
    made++;
    console.log(`  ${label} [${i}] ${who} ${d.toFixed(1)}ث  ${say}`);
  }
  // احذف ملفات جمل لم تعد موجودة
  const keep = new Set(lines.map((l) => l.file));
  for (const f of readdirSync(out)) if (f.endsWith('.mp3') && !keep.has(f)) rmSync(path.join(out, f));
  for (const f of Object.keys(manifest)) if (!keep.has(f)) delete manifest[f];
  writeFileSync(manPath, JSON.stringify(manifest, null, 1) + '\n');
  writeFileSync(
    path.join(out, 'index.ts'),
    `// يولّده scripts/voice.mjs؛ لا تعدّله يدويًا.\nimport type { VoiceLine } from '${out.includes('/src/engine/') ? '../../components/Clip' : '@engine'}';\n` +
      lines.map((l, i) => `import a${i} from './${l.file}';`).join('\n') +
      `\n\nconst voice: VoiceLine[] = [\n` +
      lines.map((l, i) => `  { src: a${i}, d: ${l.d} },`).join('\n') +
      `\n];\nexport default voice;\n`,
  );
  return lines;
}

// كلمات العدّ بالعشرات لأداة الأصابع (Fingers): مرة واحدة للمحرك كله
if (process.argv.includes('--words')) {
  const TENS = ['كُلُّ إِصْبَعٍ يُسَاوِي عَشَرَةً', 'عَشَرَةٌ', 'عِشْرُونَ', 'ثَلَاثُونَ', 'أَرْبَعُونَ', 'خَمْسُونَ', 'سِتُّونَ', 'سَبْعُونَ', 'ثَمَانُونَ', 'تِسْعُونَ', 'مِئَةٌ'];
  await generate(TENS.map((say) => ({ say })), path.join(root, 'src/engine/voice/tens'), 'العشرات');
  console.log(`✓ كلمات العدّ · جديدة: ${made} · محفوظة: ${reused}`);
  process.exit(0);
}

/** مقاطع الدرس: فكرة الدرس (clip.tsx) والقصة التي تفتحه (story.tsx) ومقطع موقف من واقع الحياة إن وُجد (money.tsx) */
const CLIPS = [
  { file: 'clip.tsx', narr: 'narration.json', out: 'voice' },
  { file: 'story.tsx', narr: 'story-narration.json', out: 'story-voice' },
  { file: 'money.tsx', narr: 'money-narration.json', out: 'money-voice' },
];

for (const lesson of lessons) {
  const dir = path.join(root, 'lessons', lesson);
  for (const c of CLIPS) {
    const clip = path.join(dir, c.file);
    if (!existsSync(clip)) continue;
    const caps = readCaptions(clip);
    // نص القراءة المشكول إن وُجد (جملة لكل سطر، أو { who, say } في القصة)، وإلا يُقرأ النص الظاهر نفسه
    const narrFile = path.join(dir, c.narr);
    const narr = existsSync(narrFile) ? JSON.parse(readFileSync(narrFile, 'utf8')) : null;
    if (narr && narr.length !== caps.length) throw new Error(`${lesson}: ${c.narr} فيه ${narr.length} جمل و${c.file} فيه ${caps.length}`);
    // المتكلم من lines في القصة (أو من { who, say } في narration)، وإلا الراوي
    const items = caps.map(([, text, who], i) => {
      const n = narr?.[i];
      return typeof n === 'string' ? { say: n, who } : n ? { say: n.say, who: n.who ?? who } : { say: speakable(text), who };
    });
    const lines = await generate(items, path.join(dir, c.out), `${lesson}/${c.file}`);
    // اربط الصوت بالمقطع أول مرة: import voice + voice={voice}
    let cs = readFileSync(clip, 'utf8');
    if (!cs.includes(`from './${c.out}'`)) {
      cs = cs.replace(/(import [^\n]+ from '@engine';\n)/, `$1import voice from './${c.out}';\n`).replace('<Clip\n', '<Clip\n    voice={voice}\n').replace('<Story\n', '<Story\n    voice={voice}\n');
      writeFileSync(clip, cs);
    }
    // كم ستطول الجمل عن مكانها في المقطع (المقطع ينتظر انتهاء الجملة)
    const over = caps.map(([st], i) => lines[i].d - ((caps[i + 1]?.[0] ?? Infinity) - st)).filter((x) => x > 0);
    console.log(`✓ ${lesson}/${c.file}: ${lines.length} جمل${over.length ? ` · يطول المقطع نحو ${over.reduce((a, b) => a + b, 0).toFixed(0)} ث لينتهي الكلام` : ''}`);
  }
}
console.log(`جُمل جديدة: ${made} · محفوظة من قبل: ${reused}`);
