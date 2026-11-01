# New lesson design (v2): rules

These are the rules for moving every lesson to the new design. They come from how lesson 4-1 v2 (`lessons/g4/ch4/4-1-expressions-sentences-v2/`) was built and from the teacher's feedback while it was built. `CLAUDE.md` still applies in full: content style, Arabic and RTL rules, digits, tests. Where the two disagree on visual design, this file wins.

The reference implementation is `src/engine/styles/v2.css`, `src/engine/components/V2Chrome.tsx`, and the components that check `useV2()` (QuestionSlide, Steps, Counters, DataViz, MCQ, Cubes, Home). When this file and the code disagree, fix one of them so they agree again.

## Where the lesson is used

- A projector in a classroom, sometimes with weak light. Students at the back must read everything.
- The teacher runs the lesson from the phone remote (or the keyboard), not from buttons on the board.
- So: high contrast, large text, and nothing on the board that only the teacher needs.

## 1. Principles

1. **The board belongs to the students.** No teacher controls or teacher information on the board. That means no buttons, step counters, "21 left out of 22", star or award buttons, keyboard hints, or connection messages. All of these live on the phone, in the ⋯ menu, or on the keyboard. The phone connection shows as a small icon only, with no text.
2. **One system, every slide.** Every slide has the same header, progress bar and top row at the same height. Slides with a picture put it in the same picture panel. There is one card style and one answer style. Never invent a one-off layout for a single slide. If a slide doesn't fit a template, change the template for all slides.
3. **No layout shift.** Content that a step will reveal takes its space from the start, as a grey skeleton exactly the size of the real content. Revealing a step never moves anything else.
4. **Top to bottom.** Content starts at the top and flows down. Do not centre slide content vertically. Inside small shapes (pills, number circles, answer boxes) do centre the text optically: Naskh leaves room below the line, so nudge the text down with `padding-top`.
5. **Every colour has one job.** Ink is for text. The section colour is for the section pill, question number and progress bar. Green is for answers only. Grey is neutral: options, counters, empty boxes. The highlighter (`--sec-t`) means "what we are talking about now". Don't use a colour for decoration.
6. **Contrast for a weak projector.** White background, near-black ink, saturated full fills, thick lines. No light-grey text and no thin borders on things students must read.
7. **Name things before showing them.** Every number the class reads from a picture gets a label. Every answer box has a label tab. Counters say what they are and how many.
8. **Show only what the book asks.** Never show the answer before the steps that lead to it. Never fill in data the class should produce.
9. **Ask before inventing.** For a new kind of element (a new chart type, a new manipulative, a new overlay), make a mockup with several variants and let the teacher choose before building it.

## 2. Tokens

All tokens are scoped to `#app[data-design="v2"]` in `v2.css`.

- **Font:** Noto Naskh Arabic everywhere (`--display` and `--body`), the phone included. No second font.
- **Five text sizes only:** title or question 46 (`--t-title`), body 35 (`--t-body`), label 28 (`--t-label`), small 24 (`--t-small`). The answer is 72 and steps down with its length (`mid` 58, `mid2` 46, `long` 36). Number sentences are 40, or 52 in group cards. Don't add sizes.
- **Weights:** 700 for titles, questions and labels that must stand out. 600 for body and steps. Answers are large but not heavy (600).
- **Ink:** `--ink #0b1226` for text, `--muted #1f2a3d` for secondary text. Both stay dark.
- **Section colours (`--sec` / `--sec-t`):**

  | Section | `--sec` |
  |---|---|
  | start | grey `#3d4652` |
  | engage | red `#c62a1c` |
  | explore | orange `#d97300` |
  | explain | blue `#1554b8` |
  | elab | teal `#0f7c85` |
  | check | purple `#5a1f9e` |
  | practice | pink `#b8226a` |
  | hot | brown `#7e4a26` |
  | close | gold `#a87000` |

  `--sec-t` is the light tint of each, used for the progress bar and the highlighter.
- **Answer green:** `--ans #067a3a`, with white text on it. **Wrong:** `--bad #b3341a`.
- **Card tints:** neutral `#f5f6f8`, rule `#e9f0fb`, example `#e5f3f4`, question `#f1ebf9`, talk `#fdf1e3`. No coloured borders on cards.
- **Team colours:** `V2_TEAM_COLORS`.

## 3. Chrome (shared by every slide)

- **Header:** a light band (`--band`) with a 3px line under it (`--band-line`). From the start side it holds:
  - the section pill, solid section colour with white text;
  - the lesson title, small and muted;
  - the team score pills, white with the same border colour as the header and a smaller height;
  - the phone icon, after the team scores;
  - the ⋯ menu.
- **Timer:** a dark pill centred in the header, so it never takes space from the content. It flashes red at the end.
- **⋯ menu:** built with Base UI `Menu`, in one list grouped by separators. «إعادة» is a submenu: reset this slide, or reset the whole lesson. The whole-lesson reset asks first in a Base UI `AlertDialog`. The menu is a portal into the stage.
- **Progress bar:** at the very bottom.
  - One segment per slide in the section's light colour, darker when done.
  - Sections touch with no gaps, since the colours already separate them. Only the first and last ends are rounded.
  - The current slide is wider, outlined in ink, and shows one cell per step.
- **Keys:** ← and → move through steps, then on to the next or previous slide. ⌘ or Ctrl with an arrow (or Page Up/Down) jumps a whole slide.
- **Hint:** opens over the content at the bottom of the text column, and pushes nothing down.

## 4. Slide templates

- **Top row:** always the same height (56px). It holds either the section tag and slide title, or the question number circle and the book page.
- **Text with a picture:** two columns. Text on the start (right) side, and the picture panel on the end (left) side at a fixed 600px.
- **Comparison:** two equal columns (`cols even`).
- **Group of questions:** identical cards that fill the slide (`qgrid`, `qcard`). Two or three columns, up to three rows.
- **Cards:** one style. Light tint, small coloured caption on top, body text 35, no border.
- **Rule examples:** each example in its own white chip (`row examples`), so the numbers of neighbouring examples never mix.
- **Summary slide:** `<SlideHead tag="أهمّ الأفكار" kind="rule">ملخص الدرس</SlideHead>` with four cards. Don't call it a mind map unless it is drawn as one.
- **Exit ticket:** three white cards with a thin grey border, levels labelled.
- **Cover:**
  - title and idea on the start side;
  - the lesson sections on the end side as tiles filling the height, each tile with a thick section-coloured bar on its start edge (not a dot);
  - class and team setup small at the bottom.

## 4a. Building blocks: no styling in lesson files

A lesson file holds content only. **No `style={{…}}` and no `className` in `lessons/`.** All the look lives in the engine components and the CSS. If a slide needs something the blocks can't express, add or extend a block in `src/engine/components/Blocks.tsx` (with its CSS in `core.css`, plus `v2.css` where a v2 rule must win). Then use it from the lesson. Fixing a block fixes every lesson at once.

| Block | Use it for |
|---|---|
| `QuestionSlide` | one book question with steps and a picture (`chart`) |
| `QuestionGroup source instruction cols time` | several book questions under one instruction, as identical cards |
| `OpQuestion n t check` + `missingOp('+')` | «اكتب العملية» cards: sentence on a strip, book circle, check under it |
| `ChartQuestion n q steps` | a question about the chart next to it, with `hl` per step |
| `Grid cols` | a grid of identical cards (MCQs, questions) |
| `BookSource` | the book source alone in the top row |
| `QText` (`inline` when a `Sentence` sits inside the words) / `Intro` / `BookLabel` | book question text, the intro line, the topic word in bold |
| `Definition kind` + `Examples` | the book's rule text with its examples, each in its own chip |
| `Lines` | number sentences stacked and centred in a card |
| `Verdict ok` | «صحيحٌ» / «خطأٌ» after trying an operation |
| `StepRow` | two short steps on one line |
| `Goals items` | the numbered lesson objectives |
| `NumberRow nums` | big numbers spaced across a card |
| `WordList words` | comma-separated key words in a card |
| `ExitTicket` (three `MCQ` children) | the exit ticket, levels added automatically |
| `RepQuestion` / `ArrowQuestion` | a sentence shown by drawing and words; a short «عدد ← خانة» card (rounding) |
| `TableBox` / `PicBox` | the picture panel for tables / drawings (no frame in v2) |
| `TallyTable`, `FreqTable`, `RawData`, `PatternTable`, `FnTable`, `RuleTable` | data tables, all drawn in table design C; `reveal` / `hide` fill cells step by step |
| `PieBox`, `FractionPies`, `ChanceScale`, `NumberCards`, `LetterCards`, `Cup` | circle graphs and probability pictures |
| `TrendCard`, `TrendMini`, `TrendQuiz`, `TrendRow`, `MiniRow` | line-graph trends (up, down, flat) |
| `OrderRows`, `Heights`, `CubeFace`, `TallyGroups`, `BalanceScale`, `FenceRect`, `ColorChips`, `PencilTriangles`, `Flow`, `BulletCard` | logic and problem-solving pictures |
| `VoteExplorer`, `PatternExplorer`, `PieExplorer`, `BagExplorer`, `RuleMachine`, `OrderPuzzle`, `FnMachine` | hands-on explorers (also driven from the phone) |
| `WriteBox` | a box students type into on the board |
| `Card`, `Stack`, `Cols`, `QCol`, `SlideHead`, `Counters`, `HBars`, `Chart`, `MCQ`, `Sentence`, `Eq`, `NumMark`, `Mark` | as before |

**Layout rules the engine applies by itself (don't fight them):**
- A wide table (`orient="cols"`, a pattern table) moves under the text at full width.
- An exit ticket beside a picture: the picture goes on top, the three questions in a row under it.
- Two answers in a row (`kind: 'ans'` one after the other) sit side by side when they fit.
- Three multiple-choice questions in one column next to a picture get slightly smaller.
- If a slide still overflows, first shorten steps (one idea per line) or mark the question `long`; split the slide only when the book's text itself is too long.

## 5. Questions, steps and answers

- **Question number:** a small solid circle in the section colour. Book text keeps its exact wording and diacritics.
- **Two kinds of step, two looks:**
  - A **working step** is a quiet text line (35, muted, no box).
  - An **answer** is always a box: never an underline, never a check mark inside.
- **The answer box:**
  - Before it is revealed, it shows a dashed border with a large «؟», at exactly the size of the answer that will fill it.
  - When revealed, it fills green with white text and makes a short spring pop.
- **Label tab:** every answer has a `label` («الْعِبَارَةُ الْعَدَدِيَّةُ»، «الْجُمْلَةُ الْعَدَدِيَّةُ»), drawn as a tab stuck to the top of the box. The box is never narrower than its tab.
- **Every part the question asks for is its own answer box.** For example, an expression and a sentence are two boxes.
- **Numbers read from the picture:** write them with `<NumMark>` (a highlighter block in `--sec-t`, all the same width), followed by what they count. Give the step the `hl` key of the thing it names. Example: `<Step hl={['n0']}><NumMark>١٦</NumMark> كُلُّ التُّفَّاحَاتِ.</Step>`.
- **Order:** read from the picture, then choose the operation and say why, then the equation, then the answer. One idea per step, on one line.
- **Missing operation (book circle):**
  - Draw the blank as the book's grey circle, which fills green when revealed. The `+` and `−` are SVG (`OpSign`), centred in the circle, because Naskh draws them too high.
  - In «اكتب العملية» cards, the sentence sits on a white strip on its own row (like «تأكَّدْ»), and the check goes centred under it.
- **«تحدث» questions:** a short model answer labelled «إِجَابَةٌ مُقْتَرَحَةٌ».
- **Don't add:** `kind: 'warn'` steps, Think-Pair-Share («فكّر، زاوج، شارك»), or award buttons on the board.

## 6. Picture panel

- **Counters** (`Counters`, drawn by `CountersV2` in v2):
  - they fill the panel width, centred inside their card;
  - each group has a counted label («الْبَقَرَاتُ ٦»), in ink, size 28;
  - use neutral grey `#cfd8e6` unless the real colour matters (red and green apples). If the book draws a specific object (hair ties), draw that object;
  - **highlight:** the group the current step names (`n{i}`) or the crossed pieces (`nx`) get the highlighter background. The rest fade slightly (.45), but labels stay readable.
- **Charts:**
  - **Never fade a chart.** It confuses the students. Instead, highlight only the bar the current step talks about, on the highlighter background (`p{i}` in the step's `hl`).
  - **Horizontal bars** (the chosen variant B):
    - neutral bars of equal thickness, rounded on the value end only;
    - a visible x-axis line and a light grid;
    - the value large at the end of each bar, with no badges.
- **Keep the picture still between steps.** The highlight moves; the drawing doesn't change size or position.

## 7. Multiple choice

- **Options:** grey cards with a bar along the bottom (the chosen variant E). They are not section-coloured.
- **Right:** green fill with a small mark in the corner. **Wrong:** red fill, struck through, with a mark.
- **Feedback:** says why, in green or red text under the options (see the content rules in `CLAUDE.md`).

## 8. Full-screen moments on the board

Each of these covers the whole stage in solid white, uses the Naskh font, and shows only what the students need.

- **Name wheel** (`Wheel.tsx`, `.wheel2`):
  - **Screen:** the wheel and the picked name only. No buttons, counts or options. Slices alternate in two calm tones (a third tone joins the first and last when the count is odd).
  - **Spinning:** the pointer sits on the side facing the name. The large name changes as each slice passes the pointer, with a soft click (`sClick`).
  - **Stop:** the winning slice turns orange and the others dim.
  - **Controls:** it spins from the phone, by touching the wheel, or with Space or Enter. It closes with a touch outside it or Esc.
  - **Phone only:** the team filter, "remove after picking", returning names, and stars.
- **Star** (`StarCheer`):
  - a celebration lasting about 4 seconds;
  - a gold star spins and grows in, sending out a ring;
  - gold rays turn slowly behind it;
  - confetti bursts from both bottom corners and then rains from the top;
  - «نجمة جديدة», then the student's name, large;
  - the fanfare `sStar` plays;
  - the student's star count is never shown.
- **Mistake:** calm, about 2.4 seconds. A light-red circle with a ✕ shakes twice, and the student's name appears under it. No word, no confetti, and the `sBad` sound.
- **Teams board:** the team names and their students, opened from the phone after teams are shuffled.

## 9. Phone remote (`RemoteApp.tsx`, `remote2.css`)

- **Same look as the lessons:** same tokens and Naskh font. Base UI for Drawer sheets, ToggleGroup, Checkbox and Collapsible, all inside `DirectionProvider`.
- **Setup page («قبل الحصة»):** opens before the lesson. It sets:
  - the class (أ or ب when there is more than one);
  - the class **end time**, typed by the teacher. Don't assume 45 minutes; pacing is worked out from that time;
  - the number of teams, their names, shuffling, and showing the teams on the board.
- **Lesson view:**
  - section and slide position, the slide title, the steps, and «التالي على الشاشة»;
  - teacher notes, the MCQ, chart and widget controls;
  - pacing against the end time.
- **Bottom navigation:** one row within thumb reach. From the start side: previous slide, previous step, **next step** (the largest button), next slide. Next step on the last step moves to the next slide. Buttons never change their label or look.
- **Tools row above it:** five buttons (teams, wheel, stars, timer, slides). Each opens its own sheet.
- **Wheel sheet:**
  - class, team filter, and the "take the name out after picking" checkbox;
  - the names outside the wheel, folded, each one returnable, with "return all";
  - the picked name with a star button right under it.
- **Stars sheet:**
  - students in alphabetical order, with the names folded;
  - a star or mistake for each student, and removing the last star or mistake;
  - a button to show the board.
- **Reset slide:** a reset for the current slide, behind a short confirmation.
- **Times:** shown once, in Arabic digits. Native inputs that print Western digits are hidden behind an Arabic label.

## 10. Motion and sound

- **Motion:** the rules in `CLAUDE.md` apply.
  - A spring pop for answers, and a quick fade-up for steps.
  - The star celebration is the one place for big motion.
  - Everything respects `prefers-reduced-motion`.
- **Sound:** sounds are generated in `sound.ts`. Each moment always makes the same sound:
  - answer revealed: `sAns`;
  - MCQ right or wrong: `sGood` or `sBad`;
  - star: the `sStar` fanfare;
  - mistake: `sBad`;
  - wheel tick: `sClick`;
  - timer: `sTick`, then `sEnd`.
  - No sound on ordinary steps or slide changes.

## 11. Converting a lesson to v2

1. Add `design: 'v2'` to `meta`. **Never change `meta.id`**: saved progress is keyed on it.
2. Go slide by slide and put each one into a template from section 4, built from the blocks in section 4a. Remove every `style` and `className` from the lesson file.
3. **Steps:**
   - numbers read from the picture become `<NumMark>` steps with `hl` keys;
   - every answer gets a `label`;
   - every asked part gets its own `kind: 'ans'`;
   - remove any `warn` step or Think-Pair-Share left over.
4. **Pictures:**
   - counters get counted labels and real colours only where they matter;
   - charts use the v2 chart styles and `hl` keys for the current bar;
   - missing operations use the book circle.
5. Rule examples go in `row examples`. The summary becomes «ملخص الدرس». Exit ticket cards are white.
6. **Grade 2** (`BookGroup`, the book-line `QuestionSlide`, `LiveTally`, and similar): these have no v2 styling yet. Mock them up with variants and get the teacher's choice before converting grade 2 lessons. The book's own layout still wins for grade 2: students must recognise the book page.
7. Check that nothing moves when a step is revealed. Every hidden step must leave a skeleton exactly its size.
8. Run `npm test`, then `npm run shots -- <lesson>`. Review every slide at 1600×900 with all steps shown and with the hint open:
   - the text and chart sizes match the system;
   - nothing is clipped;
   - nothing on the board is teacher-only;
   - the answer never shows before its steps.

## 12. Things the teacher rejected (don't bring back)

- **On the board:** controls or teacher info; a steering-wheel-shaped wheel icon; side panels next to the wheel; the word «غلطة» on the mistake screen.
- **Colour:** options coloured by the section; pink or tinted backgrounds on exit-ticket cards; shadows that don't fit the flat look.
- **Charts:** fading the whole chart to focus on one bar; small value badges on bars.
- **Answers:** two answer styles (underline and box); a check mark inside the answer box; the answer shown before the steps.
- **Layout:** dots for section tiles; vertically centred slide content; layout shifting after a step.
- **Phone:** a fixed 45-minute lesson length; long connection-lost messages (the icon is enough).
- **Content:** Think-Pair-Share.
