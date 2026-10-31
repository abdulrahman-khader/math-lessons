# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **The teacher** (one Saudi elementary math teacher, beginner programmer) runs each lesson live on the classroom screen and drives it from the board, the keyboard, or a phone remote while walking the room.
- **The students** (grade 2, about 7 years old; grade 4, about 9) watch from their desks, some at the back of the room, some with weak eyesight. They read the questions, come to the board, and answer aloud.

## Product Purpose
Interactive smartboard presentations for the Saudi elementary math book (grades 2 and 4), one per lesson. Each lesson walks the class from a hook to the book's rule, a short narrated idea clip, every book question with step-by-step solutions, and an exit ticket. Success: the class follows the book without getting lost, every student can read the board from the back, and the teacher keeps the class engaged (teams, stars, wheel) without fighting the tool.

## Positioning
Built by the teacher for their own class and the book's exact pages: questions copied verbatim from the book, answers computed live from data the class collects itself, and a phone remote, so the board mirrors the book the students hold rather than a generic slide deck.

## Operating Context
- Shown from the teacher's **Mac over HDMI to a projector** with weak brightness, in a dimmed classroom, online over a fast 5G connection (confirmed 2026-10-29). Offline use and old smartboard browsers are no longer requirements.
- Fixed 16:9 stage (1600×900) scaled to the screen.
- The book itself is open on the students' desks; grade 2 students get confused when the board looks different from the book.
- Classroom rituals inside the product: team scores, star of the week (Thursday–Wednesday), a name wheel, a timer, a pen for drawing on slides, a short idea clip.

## Capabilities and Constraints
- Arabic, right to left. Arabic-Indic digits only. Logical CSS properties only. No letter-spacing on Arabic. Only bundled font weights (Tajawal 500/700/800, Baloo Bhaijaan 2 700/800).
- Surfaces: the lesson stage (header, slide area, footer with teams and navigation), the lesson index/home page, the phone remote, the star-of-the-week board and the wheel.
- Charts read left to right like the book.
- `npm test` must pass: no overflow at 1600×900, no horizontal scroll at 375 px.

## Brand Commitments
- Book questions look like the book's own questions (grade 2 especially: numbered book lines with dotted answer blanks).
- Grade 2 should feel playful and child-friendly; grade 4 calm and orderly (confirmed by the teacher).
- Answers are drawn large for the back of the room.

## Evidence on Hand
- The book PDFs: `~/Downloads/ثاني حلول.pdf`, `~/Downloads/رابع حلول.pdf` (PDF page = book page).
- 28 built lessons in `lessons/`.

## Product Principles
1. The board serves the student at the back of the room first.
2. Look like the book where the book has a look; never make students translate between two layouts.
3. Never invent the class's data: the class collects it and the answers follow.
4. The teacher's controls stay out of the students' way.

## Accessibility & Inclusion
Some students see poorly or sit far away: large type, strong contrast under a projector, never meaning by colour alone.
