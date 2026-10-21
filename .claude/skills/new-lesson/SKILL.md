---
name: new-lesson
description: Build a new interactive smartboard lesson from textbook pages, e.g. "lesson ٣-٥, pages ٩٠–٩٢". Use when the user asks for a new lesson, a lesson presentation, or names a lesson number and book pages.
---

# New lesson

The user gives a lesson number and book pages, usually with photos or a PDF of the pages and sometimes the teacher's guide. Follow `CLAUDE.md` for every rule. This skill covers the order of work.

## 1. Read the source

- Read every page provided. List each book question with its number, its section (استعد، مثال، تأكد، تدرب وحل المسائل، مسائل مهارات التفكير العليا…) and the page it is on.
- Copy the question text **exactly**, diacritics included. Don't paraphrase book text.
- Record every chart or table with its exact values. If a value sits between grid lines, take it from the teacher's guide and say so in a `warn` step and in the chart comment.
- If a page is unclear or missing, ask before guessing.

## 2. Plan the slides

Follow the shape of the closest existing lesson (start with `lessons/g4/ch3/3-4-line-graphs/lesson.tsx`):

objectives → lesson idea clip → engage (link to the previous lesson, a hook) → explore (something hands-on) → explain (the book's rule, worked example as "I do") → elaborate ("we do" with MCQ, real life, quick check) → every تأكد question → every تدرب question → HOT questions → mind map, exit ticket (easy, medium, hard), homework.

If the lesson needs a manipulative the engine doesn't have yet (number line, fraction bars, place-value blocks, clock, shapes, arrays), build it as a new engine component in `src/engine/components/` and export it from `src/engine/index.ts`, so later lessons can reuse it. Keep it RTL-safe per `CLAUDE.md`.

## 3. Write the lesson

- Folder: `lessons/g<grade>/ch<chapter>/<code>-<slug>/` with `lesson.tsx`, `charts.ts` and `clip.tsx`.
- `clip.tsx`: the lesson idea clip (see `CLAUDE.md`). Tell the book's own example as a short visual story that builds to the rule; copy the shape of the closest existing clip.
- `meta.id` = `g<grade>-<code>-<slug>`. Never change it after the lesson has been used in class; saved progress is keyed on it.
- `meta.bookQuestions` = the number of book questions.
- Each question: hint, step-by-step solution with chart highlights, `ans` step, one `warn` step for the most likely mistake, and a timer that fits the question.
- Work out every answer yourself and check it against the teacher's guide when one is provided.

## 4. Verify

1. `npm test`. Fix every failure; don't loosen a test to make it pass.
2. `npm run shots -- <code>`. Open each screenshot and look for clipped text, overlapping chart labels, wrong highlights, and anything that reads left-to-right by mistake.
3. `npm run clip-shots -- <code>`. Check each frame of the clip the same way, and that the numbers in it match the book.
4. Report to the user: the output file in `dist/`, the slide count, any values taken from the teacher's guide, and anything you were unsure of.
