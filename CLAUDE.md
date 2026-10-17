# Math lessons — Claude guide

Interactive smartboard presentations for Saudi elementary math lessons (Arabic, RTL). One shared engine in `src/engine/`, one content file per lesson in `lessons/`. Each lesson builds into **one offline HTML file** in `dist/`, which the teacher opens on the classroom smartboard or carries on a USB stick.

## Commands

- `npm run dev -- 3-4`: dev server for the lesson whose path contains `3-4`
- `npm run build`: build every lesson to `dist/<grade>-<lesson>.html` (`npm run build -- 3-4` builds one)
- `npm test`: typecheck, RTL CSS check, build, then the Playwright checks against the built files
- `npm run shots -- 3-4 [slide numbers]`: screenshot slides into `shots/` with every step revealed. Look at these before calling a lesson done.

Playwright drives the **installed Chrome** (`channel: 'chrome'`). Windows blocks the Chromium build Playwright downloads. Running it may need the command sandbox disabled.

## Layout

```
src/engine/            shared engine, imported as '@engine'
  LessonApp.tsx        stage, header, footer, navigation, keyboard, teams, saved state
  context.tsx          slide scope: step reveal order, highlight keys, hint state
  components/          Chart, DragChart, TrendExplorer, QuestionSlide, MCQ, Steps, Layout, Wheel, Timer, Pen, Home
  styles/core.css      all styles (logical properties only)
  digits.ts            num(), digits(): the only way numbers reach the screen
lessons/g4/ch3/3-4-line-graphs/
  lesson.tsx           defineLesson({ meta, sectionDesc, slides })
  charts.ts            defineChart(...) data, validated when the lesson loads
tests/lesson.spec.ts   runs against every dist/*.html
```

## Writing a lesson

- Copy the closest existing lesson folder. Import everything from `'@engine'`.
- Book questions use `<QuestionSlide source="تأكَّدْ · ص ٨٨" n={1} ... />`. Copy the question text **exactly** from the book, diacritics included. `meta.bookQuestions` must equal the number of questions in the book; a test checks that 1..N are all present, in order.
- Solutions are `steps`. Each step can highlight parts of the chart with `hl` keys: `title`, `xaxis`, `yaxis`, `line`, `pts`, and per position `p{i}` (point/bar), `v{i}` (value badge), `x{i}` (x label), `g{i}` (vertical guide), `h{i}` (horizontal guide). Mark the answer `kind: 'ans'` and add one `kind: 'warn'` step for the most common mistake.
- `MCQ`: `answer` must be one of `options` verbatim. TypeScript rejects anything else.
- Chart values come from the book or the teacher's guide. `defineChart` throws if a value is off the axis or label/value counts differ.
- Verify every calculation by hand before writing it into a step.
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

## Done means

`npm test` passes (no errors, no overflow at 1600×900 with hint open and with all steps shown, Arabic digits only, all book questions present, no horizontal scroll at 375 px). After that, `npm run shots` reviewed by eye.
