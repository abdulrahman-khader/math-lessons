import { useState } from 'react';
import { Card } from './Layout';
import { Step } from './Steps';

/*
 * الاستدلال المنطقي: جدول الترتيب كما في الكتاب، وأعمدة الأطوال، ولعبة الترتيب، ووجه المكعب.
 * الدرس يعطيها الأسماء والمعطيات فقط.
 */

/** جدول الترتيب كما في الكتاب: كل معلومة سطر مع خطوة، الأطول يمينًا والأقصر يسارًا */
export function OrderRows({ rows, head = ['الأطولُ', 'الأقصرُ'] }: { rows: { clue: string; order: string[] }[]; head?: [string, string] }) {
  return (
    <div className="orows">
      <div className="orow ohead">
        <span />
        <span className="oends">
          <b>{head[0]}</b>
          <b>{head[1]}</b>
        </span>
      </div>
      {rows.map((r, i) => (
        <Step key={i}>
          <div className="orow">
            <span className="oclue">{r.clue}</span>
            <span className="oletters">
              {r.order.map((x) => (
                <b key={x}>{x}</b>
              ))}
            </span>
          </div>
        </Step>
      ))}
    </div>
  );
}

/** أعمدة بأطوال مختلفة تحت كل منها اسم، الأطول يمينًا */
export function Heights({ names, colors }: { names: string[]; colors?: string[] }) {
  const n = names.length;
  return (
    <svg viewBox={`0 0 ${n * 110} 300`} className="heights" role="img" aria-label={names.join('، ')}>
      {names.map((name, i) => {
        const h = 240 - i * (160 / Math.max(1, n - 1));
        const x = (n - 1 - i) * 110 + 20;
        return (
          <g key={name}>
            <rect x={x} y={260 - h} width={70} height={h} rx={10} fill={colors?.[i] ?? '#4f9be0'} stroke="#13213b" strokeWidth={3} />
            <text x={x + 35} y={292} textAnchor="middle" fontSize={26} fontWeight={800} fill="#13213b">
              {name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** لعبة ترتيب: يضغط الطالب الأسماء بالترتيب من الأطول، ثم «تحقق» */
export function OrderPuzzle({ names, answer, clues }: { names: string[]; answer: string[]; clues: string[] }) {
  const [pick, setPick] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const ok = checked && pick.join('،') === answer.join('،');
  return (
    <div className="opuzzle">
      <Card kind="qs" cap="المعطيات">
        <ul className="oclues">
          {clues.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Card>
      <p className="otip">نَضْغَطُ الْأَسْمَاءَ بِالتَّرْتِيبِ مِنَ الْأَطْوَلِ إِلَى الْأَقْصَرِ:</p>
      <div className="row obtns">
        {names.map((x) => (
          <button key={x} className="btn" disabled={pick.includes(x)} onClick={() => (setPick((p) => [...p, x]), setChecked(false))}>
            {x}
          </button>
        ))}
      </div>
      <div className="oslots">
        {answer.map((_, i) => (
          <span key={i} className={'oslot' + (checked ? (pick[i] === answer[i] ? ' good' : ' bad') : '')}>
            {pick[i] ?? '…'}
          </span>
        ))}
      </div>
      <div className="row obtns">
        <button className="btn primary" disabled={pick.length < answer.length} onClick={() => setChecked(true)}>
          تحقّق
        </button>
        <button className="btn hide" onClick={() => (setPick([]), setChecked(false))}>
          من جديد
        </button>
        {checked && <b className={'verdict ' + (ok ? 'ok' : 'no')}>{ok ? 'أحسنت! الترتيب صحيح' : 'راجع المعطيات وحاول مرة أخرى'}</b>}
      </div>
    </div>
  );
}

/** وجه المكعب في السؤال ٨: ٣ × ٣ والمربع الأوسط أحمر */
export const CubeFace = () => (
  <svg viewBox="0 0 300 300" className="cubeface" role="img" aria-label="وجه مكعب: ٨ مربعات زرقاء ومربع أحمر في الوسط">
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={(i % 3) * 100} y={Math.floor(i / 3) * 100} width={100} height={100} fill={i === 4 ? '#e8372b' : '#6aaee6'} stroke="#13213b" strokeWidth={6} />
    ))}
  </svg>
);

