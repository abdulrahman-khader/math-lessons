import { useState, type ReactNode } from 'react';
import { useEngine } from '../context';
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

  return (
    <div className={'mcq' + (right ? ' done' : '')}>
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
      {award && right && !awarded && (
        <div className="award">
          امنح نجمة:
          {eng.teamNames.slice(0, eng.nTeams).map((n, i) => (
            <button
              key={i}
              style={{ borderColor: TEAM_COLORS[i], color: TEAM_COLORS[i] }}
              onClick={() => {
                eng.addScore(i, 1);
                setAwarded(true);
              }}
            >
              +★ {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
