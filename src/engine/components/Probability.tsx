import { useState } from 'react';
import { useSlide } from '../context';
import { num } from '../digits';
import { Bag, chanceWord } from './DataViz';
import { PicBox, TableBox } from './DataBlocks';
import { Card, Cols, Stack } from './Layout';
import { useRemoteWidget } from './Primary';

/*
 * رسوم الاحتمال: الكوب، وبطاقات الحروف والأعداد، وسلّم الكلمات، ومستكشف الكيس.
 * الدرس يعطيها البيانات فقط.
 */

const RED = '#e8463c';
const BLUE = '#3fa9d6';

/** كوب بلاستيكي: مقلوب أو على جنبه أو قائم */
export function Cup({ pose }: { pose: 'down' | 'side' | 'up' }) {
  const rot = pose === 'down' ? 180 : pose === 'side' ? 90 : 0;
  return (
    <svg viewBox="0 0 60 60" className="cup" role="img" aria-label={pose === 'down' ? 'مقلوب' : pose === 'side' ? 'على جنبه' : 'قائم'}>
      <g transform={`rotate(${rot} 30 30)`}>
        <path d="M13 10 L47 10 L41 52 L19 52 Z" fill="#bfe6f8" stroke="#3a8fc4" strokeWidth={3} strokeLinejoin="round" />
        <ellipse cx={30} cy={10} rx={17} ry={4.5} fill="#e6f6fd" stroke="#3a8fc4" strokeWidth={3} />
      </g>
    </svg>
  );
}

/** بطاقات حروف ملوّنة؛ مع مفتاح p0 تبرز بطاقات الحرف lit وتبهت البقية */
export function LetterCards({ letters, colors, lit }: { letters: string[]; colors: string[]; lit: string }) {
  const { activeHl } = useSlide();
  const on = activeHl.has('p0');
  return (
    <div className="lcards">
      {letters.map((l, i) => (
        <span key={i} className={'lcard' + (on ? (l === lit ? ' on' : ' dim') : '')} style={{ background: colors[i % colors.length] }}>
          {l}
        </span>
      ))}
    </div>
  );
}

/** بطاقات مرقّمة من ١ إلى n في لوحة الصورة */
export function NumberCards({ n }: { n: number }) {
  return (
    <TableBox>
      <div className="ncards">
        {Array.from({ length: n }, (_, i) => (
          <span key={i}>{num(i + 1)}</span>
        ))}
      </div>
    </TableBox>
  );
}

/** سلّم كلمات الاحتمال: كيس لكل كلمة، من المؤكَّد إلى المستحيل */
export function ChanceScale({ steps }: { steps: readonly (readonly [red: number, blue: number, word: string])[] }) {
  return (
    <div className="qgrid five">
      {steps.map(([r, b, w]) => (
        <Card key={w} kind="ex" className="chance">
          <Bag items={[{ name: 'حمراء', n: r, color: RED }, { name: 'زرقاء', n: b, color: BLUE }]} size={150} />
          <p>
            اختيارُ كرةٍ حمراءَ
            <br />
            <span>{w}</span>
          </p>
        </Card>
      ))}
    </div>
  );
}

/** مستكشف: عدد الكرات الحمراء والزرقاء، ووصف احتمال سحب حمراء، وسحب عشوائي */
export function BagExplorer() {
  const [r, setR] = useState(3);
  const [b, setB] = useState(5);
  /** آخر كرة مسحوبة: رقمها في الكيس (الحمراء أولًا) ورقم السحبة */
  const [out, setOut] = useState<{ k: number; id: number } | null>(null);
  const last = out ? (out.k < r ? 'حمراء' : 'زرقاء') : null;
  const [draws, setDraws] = useState({ red: 0, blue: 0 });
  const n = r + b;
  const word = n ? chanceWord(r, n) : '—';
  const set = (which: 'r' | 'b', v: number) => {
    const x = Math.max(0, Math.min(10, v));
    if (which === 'r') setR(x);
    else setB(x);
    setOut(null);
    setDraws({ red: 0, blue: 0 });
  };
  const draw = () => {
    if (!n) return;
    const k = Math.floor(Math.random() * n);
    const red = k < r;
    setOut((o) => ({ k, id: (o?.id ?? 0) + 1 }));
    setDraws((d) => (red ? { ...d, red: d.red + 1 } : { ...d, blue: d.blue + 1 }));
  };
  useRemoteWidget(
    () => ({
      title: 'الكيس',
      info: `سحب كرة حمراء: ${word} (${num(r)} من ${num(n)})` + (last ? `، سُحبت: ${last}` : ''),
      steppers: [
        { key: 'r', label: 'الحمراء', value: r, min: 0, max: 10, color: RED },
        { key: 'b', label: 'الزرقاء', value: b, min: 0, max: 10, color: BLUE },
      ],
      buttons: [{ key: 'draw', label: 'اسحب كرة', on: true, disabled: !n }],
    }),
    (k, v) => {
      if (k === 'r' && v !== undefined) set('r', v);
      else if (k === 'b' && v !== undefined) set('b', v);
      else if (k === 'draw') draw();
    },
    [r, b, out, draws],
  );
  const stepper = (label: string, v: number, which: 'r' | 'b', color: string) => (
    <div className="ffstep" style={{ borderColor: color }}>
      <span style={{ color }}>{label}</span>
      <button aria-label={`إنقاص ${label}`} disabled={v <= 0} onClick={() => set(which, v - 1)}>
        −
      </button>
      <b>{num(v)}</b>
      <button aria-label={`زيادة ${label}`} disabled={v >= 10} onClick={() => set(which, v + 1)}>
        +
      </button>
    </div>
  );
  return (
    <Cols>
      <Stack>
        {stepper('الحمراء', r, 'r', RED)}
        {stepper('الزرقاء', b, 'b', BLUE)}
        <Card kind="ex" cap="احتمال سحب كرة حمراء">
          <b className="chanceword">{word}</b>، {num(r)} من {num(n)}
        </Card>
        <div className="hopx-ctrl">
          <button className="btn step-btn" onClick={draw} disabled={!n}>
            اسحب كرة
          </button>
          <span className="hopx-eq done">
            <span className="eq">
              {last ? (
                <>
                  <span className="ball-dot" style={{ background: last === 'حمراء' ? RED : BLUE }} />
                  سُحبت: {last}
                </>
              ) : (
                'لم نسحب بعد'
              )}
            </span>
          </span>
        </div>
        <p className="draws">
          السحبات: حمراء {num(draws.red)}، زرقاء {num(draws.blue)}
        </p>
      </Stack>
      <PicBox>
        <Bag items={[{ name: 'حمراء', n: r, color: RED }, { name: 'زرقاء', n: b, color: BLUE }]} out={out} />
      </PicBox>
    </Cols>
  );
}
