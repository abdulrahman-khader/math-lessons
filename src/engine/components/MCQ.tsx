import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { useEngine, useSlide } from '../context';
import { TEAM_COLORS } from '../sections';
import { sBad, sGood } from '../sound';

interface Props<O extends readonly string[]> {
  q?: ReactNode;
  options: O;
  /** يجب أن يكون أحد الخيارات حرفيًا؛ TypeScript يرفض غير ذلك */
  answer: O[number];
  /** يعرض أزرار منح نجمة للفرق بعد الإجابة الصحيحة */
  award?: boolean;
}

/** اختيار من متعدد: الخطأ يهتز ويسمح بالمحاولة، والصواب يقفل السؤال. */
export function MCQ<const O extends readonly string[]>({ q, options, answer, award = false }: Props<O>) {
  if (!options.includes(answer)) throw new Error(`الإجابة «${answer}» ليست من الخيارات`);
  const eng = useEngine();
  const [right, setRight] = useState(false);
  const [wrong, setWrong] = useState<{ o: string; n: number } | null>(null);
  const [awarded, setAwarded] = useState(false);
  const slide = useSlide();
  const id = useId();
  const box = useRef<HTMLDivElement>(null);

  const choose = (o: string) => {
    if (right) return;
    if (o === answer) {
      setRight(true);
      sGood();
    } else {
      setWrong((w) => ({ o, n: (w?.n ?? 0) + 1 }));
      sBad();
    }
  };

  const giveStar = (i: number) => {
    eng.addScore(i, 1);
    setAwarded(true);
  };
  const canAward = award && right && !awarded && eng.nTeams > 0;

  /* الإجابة من الجوال: نفس ما يحدث عند الضغط على الآيباد */
  const latest = useRef({ choose, giveStar, right, wrong, canAward });
  latest.current = { choose, giveStar, right, wrong, canAward };
  useEffect(
    () =>
      slide.registerMcq(id, {
        el: () => box.current,
        get: () => ({
          q: box.current?.querySelector('.mq')?.textContent?.trim() ?? '',
          options: [...options],
          answer,
          right: latest.current.right,
          wrong: latest.current.wrong?.o ?? null,
          canAward: latest.current.canAward,
        }),
        choose: (o) => options.includes(o) && latest.current.choose(o),
        award: (i) => latest.current.canAward && i >= 0 && i < eng.nTeams && latest.current.giveStar(i),
      }),
    [slide.registerMcq, id, options, answer, eng.nTeams],
  );
  useEffect(() => slide.touch(), [right, wrong, awarded, slide.touch]);

  return (
    <div ref={box} className={'mcq' + (right ? ' done' : '')}>
      {q && <div className="mq">{q}</div>}
      <div className="opts">
        {options.map((o) => (
          <button
            // تغيير المفتاح يعيد تشغيل حركة الاهتزاز عند كل خطأ
            key={o + (wrong?.o === o ? wrong.n : '')}
            className={right && o === answer ? 'right' : wrong?.o === o && !right ? 'wrong' : ''}
            onClick={() => choose(o)}
          >
            {o}
          </button>
        ))}
      </div>
      <div className={'fb' + (right ? ' ok' : wrong ? ' no' : '')}>{right ? 'صح ✓ أحسنت!' : wrong ? 'حاول مرة ثانية' : ''}</div>
      {canAward && (
        <div className="award">
          امنح نجمة:
          {eng.teamNames.slice(0, eng.nTeams).map((n, i) => (
            <button
              key={i}
              style={{ borderColor: TEAM_COLORS[i], color: TEAM_COLORS[i] }}
              onClick={() => giveStar(i)}
            >
              +★ {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
