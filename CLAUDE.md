# Math lessons — Claude guide

Interactive smartboard presentations for Saudi elementary math lessons (Arabic, RTL). One shared engine in `src/engine/`, one content file per lesson in `lessons/`. Each lesson builds into **one offline HTML file** in `dist/`, which the teacher opens on the classroom smartboard or carries on a USB stick.

## Commands

- `npm run dev -- 3-4`: dev server for the lesson whose path contains `3-4`
- `npm run build`: build every lesson to `dist/<grade>-<lesson>.html` (`npm run build -- 3-4` builds one)
- `npm test`: typecheck, RTL CSS check, build, then the Playwright checks against the built files
- `npm run shots -- 3-4 [slide numbers]`: screenshot slides into `shots/` with every step revealed. Look at these before calling a lesson done.
- `npm run clip-shots -- 3-4 [seconds]`: screenshot the lesson idea clip at given seconds (default every 5 s) into `shots/<lesson>/clip-<s>.png`.

Playwright drives the **installed Chrome** (`channel: 'chrome'`). Windows blocks the Chromium build Playwright downloads. Running it may need the command sandbox disabled.

## Layout

```
src/engine/            shared engine, imported as '@engine'
  LessonApp.tsx        stage, header, footer, navigation, keyboard, teams, saved state
  stars.ts             star of the week: star/mistake log shared by all lessons, week Thursday–Wednesday, ranks
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
- `MCQ`: `answer` must be one of `options` verbatim. TypeScript rejects anything else.
- Chart values come from the book or the teacher's guide. `defineChart` throws if a value is off the axis or label/value counts differ.
- Verify every calculation by hand before writing it into a step.
- Every lesson has a **lesson idea clip** (`clip.tsx` → `IntroClip`) as the last slide of the explain section (after the rule and the book's worked example, before «نعمل معًا»), under `<SlideHead tag="مقطع قصير" kind="rule">الفكرة في دقيقة</SlideHead>`, with `sec: 'explain'`. It confirms the explanation with its **own** example: never the book's numbers, and never data from the lesson's engage, explore or book questions, so it repeats or gives away nothing. It runs 35–55 s, and is a pure function of time: `<Clip duration captions scene={(t) => …} />`, drawn in a 1400×520 SVG with the helpers `tw`, `fade`, `lerp`, `ClipTitle`, `SvgEq` (equations laid out right to left), `Cube`, `Person`, `ClipCard`, `SvgFrac`, `sector`. Captions mark emphasis with `**…**`. It starts only when the teacher presses play (big button on the scene, the bar, or the phone), pauses when the teacher leaves the slide, and the phone remote gets play/pause/restart automatically. Review it with `npm run clip-shots`.
- Narrated clips: `narration.json` next to `clip.tsx` holds the spoken text for each caption (fully diacritized, numbers and symbols as words). `npm run voice -- --voiced` generates the mp3s into `voice/` with ElevenLabs (key and voice in `.env.local`, never committed) and wires `voice={voice}` into the clip; only changed sentences are regenerated. Each mp3 is made louder with ffmpeg (`brew install ffmpeg`) for laptop speakers, marked `loud` in `manifest.json`. The clip waits for a sentence to finish before moving to the next caption. Voiced lessons are listed in `VOICED` in `scripts/voice.mjs`.
- Each slide's `notes` are teacher notes, shown in teacher mode. `min` is suggested minutes; the slides should add up to roughly the lesson length.

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

## Phone remote

`src/engine/remote.ts`: the phone connects to the iPad through PeerJS (public signaling server 0.peerjs.com, no daily quota; its default config includes TURN). The iPad's PeerJS id is `<channel>h`. ntfy.sh is only a fallback when PeerJS can't connect; anonymous ntfy.sh allows **250 messages per day per IP**, and the teacher's devices may share this machine's IP, so never test against ntfy.sh in loops.

PeerJS is **not** bundled into lessons: `npm run build` copies `peerjs.min.js` into `dist/` and it's loaded on demand when the remote starts. Evaluating it starts WebRTC, which froze this Windows machine's browser for ~7 s and would delay every lesson load.

Tests run hermetically: `tests/relay.ts` starts a local ntfy-compatible relay and a local PeerJS server, and pages get `localStorage['remote:relay']` / `['remote:peer']`. Debug log: `localStorage['remote:debug'] = '1'`.

## Done means

`npm test` passes (no errors, no overflow at 1600×900 with hint open and with all steps shown, Arabic digits only, all book questions present, no horizontal scroll at 375 px). After that, `npm run shots` reviewed by eye.
