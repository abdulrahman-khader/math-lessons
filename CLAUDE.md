# Math lessons — Claude guide

Interactive smartboard presentations for Saudi elementary math lessons (Arabic, RTL). One shared engine in `src/engine/`, one content file per lesson in `lessons/`. Each lesson builds into one HTML file in `dist/`, published on GitHub Pages. The teacher runs it in a current browser on their Mac, projected over HDMI with a fast connection: offline use and old smartboard browsers are not requirements.

**New design (v2):** lessons are moving to the new design (`meta.design: 'v2'`). Before converting or building any lesson, read `DESIGN.md` and follow it: layout, sizes, colours, answers, pictures, full-screen moments, the phone remote, and the conversion checklist.

## Commands

- `npm run dev -- 3-4`: dev server for the lesson whose path contains `3-4`
- `npm run build`: build every lesson to `dist/<grade>-<lesson>.html` (`npm run build -- 3-4` builds one)
- `npm test`: typecheck, RTL CSS check, build, then the Playwright checks, **only for what changed** since `origin/main` (lessons whose folder changed; when the engine, tests or scripts changed, also a sample of varied lessons and the stars/remote/classes checks). `npm test -- 3-4 6-2` tests chosen lessons. A few minutes.
- `npm run test:all`: every lesson and every check. Run it before pushing an engine change.
- GitHub builds every lesson and runs the same `scripts/test.mjs` for what changed since the last deploy, so publishing takes minutes.
- `npm run build -- 3-4 6-2` builds lessons matching any filter (`=g4/ch3/3-4-line-graphs` for an exact path; quote it in zsh). Builds run in parallel processes.
- Shift+Space reveals every step of the current slide at once (teacher shortcut; the tests use it). Tests run with reduced motion, so every reveal animation must respect `prefers-reduced-motion`.
- `npm run shots -- 3-4 [slide numbers]`: screenshot slides into `shots/` with every step revealed. Look at these before calling a lesson done.
- `npm run clip-shots -- 3-4 [seconds]`: screenshot the lesson idea clip at given seconds (default every 5 s) into `shots/<lesson>/clip-<s>.png`.

Playwright drives the **installed Chrome** (`channel: 'chrome'`). Windows blocks the Chromium build Playwright downloads. Running it may need the command sandbox disabled.

## Layout

```
src/engine/            shared engine, imported as '@engine'
  LessonApp.tsx        stage, header, footer, navigation, keyboard, teams, saved state
  stars.ts             star of the week: star/mistake log shared by all lessons, week Thursday–Wednesday, ranks
  StarsApp.tsx         dist/stars.html (entry stars.html → stars-main.tsx): star of the week from the lesson index, no lesson needed
  context.tsx          slide scope: step reveal order, highlight keys, hint state
  components/          Chart, DragChart, TrendExplorer, QuestionSlide, MCQ, Steps, Layout, Wheel, Timer, Pen, Home, Clip
  styles/core.css      all styles (logical properties only)
  digits.ts            num(), digits(): the only way numbers reach the screen
lessons/g4/ch3/3-4-line-graphs/
  lesson.tsx           defineLesson({ meta, sectionDesc, slides })
  charts.ts            defineChart(...) data, validated when the lesson loads
  clip.tsx             IntroClip: the short animated clip explaining the lesson idea
tests/lesson.spec.ts   runs against every dist/*.html
tests/remote.spec.ts   phone remote end to end (iPad + phone contexts) over tests/relay.ts
tests/stars.spec.ts    star of the week: week boundary, ranking, board, wheel
```

## Writing a lesson

- Copy the closest existing lesson folder. Import everything from `'@engine'`.
- Book questions use `<QuestionSlide source="تأكَّدْ · ص ٨٨" n={1} ... />`. Copy the question text **exactly** from the book, diacritics included. `meta.bookQuestions` must equal the number of questions in the book; a test checks that 1..N are all present, in order.
- Solutions are `steps`. Each step can highlight parts of the chart with `hl` keys: `title`, `xaxis`, `yaxis`, `line`, `pts`, and per position `p{i}` (point/bar), `v{i}` (value badge), `x{i}` (x label), `g{i}` (vertical guide), `h{i}` (horizontal guide). Mark the answer `kind: 'ans'`. Do not add `kind: 'warn'` (common-mistake) steps; the teacher removed them.
- When the book asks the class to collect data (a survey, or drawing cubes from a bag) and leaves the table empty, show it empty with `<LiveTally id=… head=… rows=… />`: the class fills it on the board or from the phone, tables with the same `id` share their marks across slides. Never fill in data from the solutions book, and give such questions `steps={[]}`. Question text is only what the book prints: no added instructions in brackets.
- Grade 2 (`g2-` ids): questions the book stacks under one chart or instruction go on one slide with `<BookGroup source intro qs={[{ n, question, steps, tag? }]} chart />`, in book order. In the new design it shows one question large at a time with a strip of all the question numbers underneath, each filling with its answer (design D, chosen by the teacher). «أتحدث» questions that the book sets apart after a line stay on their own slide. Book pages of many small exercises use the drill blocks (`SentenceCard`, `SumCard`, `DominoCard`, `TriangleCard`… in `BookDrill.tsx`) inside `Grid`.
- `MCQ`: `answer` must be one of `options` verbatim. TypeScript rejects anything else.
- Chart values come from the book or the teacher's guide. `defineChart` throws if a value is off the axis or label/value counts differ.
- Verify every calculation by hand before writing it into a step.
- Every lesson has a **lesson idea clip** (`clip.tsx` → `IntroClip`) as the last slide of the explain section (after the rule and the book's worked example, before «نعمل معًا»), under `<SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>`, with `sec: 'explain'`. It confirms the explanation with its **own** example: never the book's numbers, and never data from the lesson's engage, explore or book questions, so it repeats or gives away nothing. It runs 35–55 s, and is a pure function of time: `<Clip duration captions scene={(t) => …} />`, drawn in a 1400×520 SVG with the helpers `tw`, `fade`, `lerp`, `ClipTitle`, `SvgEq` (equations laid out right to left), `Cube`, `Person`, `ClipCard`, `SvgFrac`, `sector`. Captions mark emphasis with `**…**`. It starts only when the teacher presses play (big button on the scene, the bar, or the phone), pauses when the teacher leaves the slide, and the phone remote gets play/pause/restart automatically. Review it with `npm run clip-shots`.
- **Opening story** (`story.tsx` → `StoryClip`, `storySlide(...)` right after the engage slide): a short cartoon with two boys only (سالم and خالد, `StoryStage`/`Story` from `Cartoon.tsx`) that poses the lesson's problem and stops on the question without the answer. Its situation and numbers differ from the book's «استعد» and from the idea clip. Voices: `story-narration.json` (one diacritized line per entry; the speaker comes from `lines`: `n` narrator, `boy` سالم, `boy2` خالد). Equations drawn in SVG use `BoardRow`/`SvgEq` (one piece per part), never one mixed text, because Safari reorders it.
- **Hands-on tool slide** after the story («نُجَرِّبُ مِثَالًا آخَرَ»): an engine explorer (`Fingers`, `CountOnChart`, `RegroupExplorer add/addOnes`, `RoundExplorer`, `ArrayExplorer`, `ZerosExplorer`, `SplitArray`, `MakeTen`, `Rewind`, `GuessTable`, `ReasonCheck`, `AreaExplorer`) with its **own** example, different from the story and the book, so the first slides never repeat one example.
- **Trap series** (`trapSlide(items, notes, sep?)`, before the check questions): 4–5 quick items changing one thing each, the last `trap: true` exposing the common mistake. Check every item by hand and that none is a book question.
- **Time and homework**: each slide keeps its suggested `min`; the engine scales them so the lesson totals `meta.minutes` (45) and the phone shows each slide's share. The teacher marks homework from the phone («اجعلها واجبًا»); nothing is written on the slide, the list appears on the closing slide (inside `Winner`), and homework slides get no class time.
- Narrated clips: `narration.json` next to `clip.tsx` holds the spoken text for each caption (fully diacritized, numbers and symbols as words). `npm run voice -- --voiced` generates the mp3s into `voice/` with ElevenLabs (key and voice in `.env.local`, never committed) and wires `voice={voice}` into the clip; only changed sentences are regenerated. Each mp3 is made louder with ffmpeg (`brew install ffmpeg`) for laptop speakers, marked `loud` in `manifest.json`. The clip waits for a sentence to finish before moving to the next caption. Voiced lessons are listed in `VOICED` in `scripts/voice.mjs`.
- Each slide's `notes` are teacher notes, shown in teacher mode. `min` is suggested minutes; the slides should add up to roughly the lesson length.

## Writing the content

The book's own text (questions, intro lines, «أتحدث» prompts) is copied exactly and never edited. Everything we write ourselves (steps, hints, answers, labels, feedback, teacher notes) follows these rules.

- **Diacritics.** Grade 2: everything students read is fully diacritized, like the book. Grade 4: diacritize every word a child could misread (case endings on nouns in answers, shadda, tanwin). Teacher notes need none.
- **Voice.** Steps and hints speak as the class solving together: first person plural («نقرأُ، نجمعُ، نطرحُ»). Never commands to one child («ابدأ، اقرأ، ابحث»). A hint is best a question that points at the idea: «ماذا تعني كلمةُ «المجموع»؟», not the method spelled out.
- **One idea per step**, short enough to read at a glance (about 6 words, one line). Order: read from the picture or chart → choose the operation and say why → the equation in `<Eq>` → the answer.
- **The answer is only the answer.** It answers exactly what the question asks, in the question's words: «الفراولةُ», «٢١ طالبًا». No reasons, no brackets; the reason goes in the step before it. A number answer always carries its unit, with correct Arabic counting (١ طالبٌ، ٢ طالبانِ، ٣–١٠ طلابٍ، ١١+ طالبًا).
- **Every part the question asks for is an answer.** If it asks for an expression and a sentence, both steps are `kind: 'ans'`, so both fill an answer box.
- **Explain/talk questions** («أتحدث», «كيف…», «لماذا…») have no single answer: give a short model answer, at most two lines, as a sample the class can compare with, not as the only correct wording.
- **Feedback says why.** Right: name the reason («صحيحٌ! لا توجدُ إشارةُ =»). Wrong: kind and specific about what to look at («ليست جملةً: ابحثْ عن إشارةِ =»), never just «خطأ».
- **Labels and captions** are nouns, not sentences («العبارةُ العدديَّةُ», «البقراتُ»); no punctuation at the end.
- **Words a child knows.** Use the book's own terms for math ideas (عبارة عددية، تمثيل بالأعمدة، إشارات العدّ) and everyday words for the rest. No new terms the book has not taught yet.
- **Arabic punctuation**: «،» «؛» «؟» and «…» quotes; no English commas or question marks.
- **Teacher notes** (`notes`) are for the teacher only: what to ask, what mistake to watch for, how to use the board. One or two sentences.

## Motion and sound

- **Motion** (the `motion` package) is used where it beats CSS: the answer filling its box (spring pop), cards that need an exit animation (star/mistake card), layout changes (star ranking, podium) and slide changes. Simple fades, the progress fill and hover states stay in CSS. Motion's `x` is physical: go through the shared RTL helper so "forward" moves toward the left. Everything respects `prefers-reduced-motion`.
- **One motion style everywhere**: a short springy pop for answers, a quick fade-up for steps, nothing decorative.
- **Sound** (`sound.ts`, generated tones, mutable) only for moments the class should look up: an answer revealed, a multiple-choice right/wrong, a star or mistake, the timer's last seconds and its end. No sound on ordinary steps or slide changes; the same moment always makes the same sound.

## Arabic / RTL rules (enforced)

- **Digits**: all visible numbers are Arabic-Indic (٠–٩) with no thousands separator (٣٥٠٠). Write them that way in content. For computed numbers use `num()`/`digits()`; never `toLocaleString`. A test fails on any Western digit in visible text or SVG.
- **Logical CSS only**: `margin-inline-start`, `inset-inline-end`, `text-align: start`, never `left`/`right`/`margin-left`/etc. `npm run lint:css` checks CSS files and inline `style={{}}`.
- **No `letter-spacing`** on Arabic text; it breaks letter joining.
- **Tashkeel needs room**: keep generous `line-height` on quoted book text. Only use font weights that are bundled (Tajawal 500/700/800, Baloo Bhaijaan 2 700/800); synthetic bold looks wrong.
- **Charts**: the x-axis runs left to right like the book, so `.cs` sets `direction: ltr` inside SVG.
- **Equations**: wrap in `<Eq>`. It is bidi-isolated and reads right to left like the book: ١٥٠ − ١٢٥ = ٢٥.
- **Canvas text** sets `ctx.direction = 'rtl'` explicitly (see Wheel).
- **Keyboard**: ← next, → previous. Directional icons (`IconPrevRtl`/`IconNextRtl`) are drawn for RTL.
- **New libraries**: before adding one, check whether it renders text, assumes LTR for layout, keyboard or animation, or formats numbers. If it does any of these and can't be configured, wrap it or build the piece ourselves.

## Star of the week

Ranking: total (stars − mistakes), then fewer mistakes, then fewer absences. A student with 3 mistakes in a week can't be a star of that week. Absence is marked on the phone's lesson setup page («إعداد الحصة», section «الغياب») (tap a name; once a day, tap again to undo; no button on the board). An absent student is left out of the wheel that day; with teams and the whole class on the wheel, a picked student's whole team leaves the wheel until every team has had a turn, and a team whose students have all been picked sends a random one again so every team gets the same number of turns. In a lesson the wheel closes by itself 2.5 s after the name shows. At the end of the lesson the phone's «الفرق» sheet has «توزيع نجوم الفرق»: after a preview and a confirm, every present student of the first team gets as many stars as there are teams, the next team one fewer, ties equal; absence never lowers a total and only breaks ties. The log keeps every week forever (no pruning); «سجل الأسابيع» shows them, with a backup file to download and restore. Every star or mistake is announced on screen (`StarCheer`, red for a mistake). The board opens with the counts hidden (`؟`) every time; the teacher shows them with «إظهار النجوم». `npm run build` also builds `dist/stars.html`, linked from the top of `dist/index.html`: grade, class, board, wheel and class editing without opening a lesson. Classes and stars live in one localStorage for the whole site, so the page and the lessons share them.

## Phone remote

`src/engine/remote.ts`: the phone connects to the iPad through PeerJS (public signaling server 0.peerjs.com, no daily quota; its default config includes TURN). The iPad's PeerJS id is `<channel>h`. ntfy.sh is only a fallback when PeerJS can't connect; anonymous ntfy.sh allows **250 messages per day per IP**, and the teacher's devices may share this machine's IP, so never test against ntfy.sh in loops.

PeerJS is **not** bundled into lessons: `npm run build` copies `peerjs.min.js` into `dist/` and it's loaded on demand when the remote starts. Evaluating it starts WebRTC, which froze this Windows machine's browser for ~7 s and would delay every lesson load.

Tests run hermetically: `tests/relay.ts` starts a local ntfy-compatible relay and a local PeerJS server, and pages get `localStorage['remote:relay']` / `['remote:peer']`. Debug log: `localStorage['remote:debug'] = '1'`.

## Done means

`npm test` passes (and `npm run test:all` after engine changes) (no errors, no overflow at 1600×900 with hint open and with all steps shown, Arabic digits only, all book questions present, no horizontal scroll at 375 px). After that, `npm run shots` reviewed by eye.
