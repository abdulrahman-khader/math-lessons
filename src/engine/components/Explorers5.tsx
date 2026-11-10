import { useState, type ReactNode } from 'react';
import { num } from '../digits';
import { sAns } from '../sound';
import { BoardRow } from './Cartoon';
import { Eq } from './Layout';
import { useRemoteWidget } from './Primary';

/*
 * أدوات تفاعلية للفصل الخامس (الصفان الثاني والرابع)، يتحكم بها المعلم من السبورة أو الجوال:
 * CountOnChart (العدّ التصاعدي على لوحة المئة)، RoundExplorer (أقرب عشرة على خط الأعداد)،
 * ArrayExplorer (ترتيب عدد في صفوف متساوية: القواسم)، ZerosExplorer (نمط الأصفار)، SplitArray (تجزئة الضرب: عشرات وآحاد).
 */

const ORANGE = '#E07A1F';
const BLUE = '#1F6FD1';
const GREEN = '#0E8A4F';
const RED = '#C62A1C';

/** عدّاد صغير: − العدد + */
function Stepper({ label, value, min, max, set, color }: { label: ReactNode; value: number; min: number; max: number; set: (v: number) => void; color?: string }) {
  return (
    <div className="ffstep" style={color ? { color } : undefined}>
      <span>{label}</span>
      <button aria-label="إنقاص" disabled={value <= min} onClick={() => set(value - 1)}>
        −
      </button>
      <b>{num(value)}</b>
      <button aria-label="زيادة" disabled={value >= max} onClick={() => set(value + 1)}>
        +
      </button>
    </div>
  );
}

const Btn = ({ children, on, off, primary }: { children: ReactNode; on: () => void; off?: boolean; primary?: boolean }) => (
  <button type="button" className={'btn' + (primary ? ' primary' : '')} disabled={off} onClick={(e) => (e.currentTarget.blur(), on())}>
    {children}
  </button>
);

/* ---------- العدّ التصاعدي على لوحة المئة ---------- */

/**
 * نبدأ من start ونعدّ tens عشرات (قفزة إلى الصف التالي) ثم ones آحاد (خانة واحدة).
 * كل خانة مررنا بها تُلوَّن، والجملة تظهر عند الوصول.
 */
export function CountOnChart({ start, tens, ones }: { start: number; tens: number; ones: number }) {
  const [path, setPath] = useState<number[]>([start]);
  const cur = path[path.length - 1];
  const tensDone = path.filter((v, i) => i > 0 && v - path[i - 1] === 10).length;
  const onesDone = path.filter((v, i) => i > 0 && v - path[i - 1] === 1).length;
  const done = tensDone >= tens && onesDone >= ones;
  const go = (d: number) => {
    const next = [...path, cur + d];
    setPath(next);
    if (next.length === tens + ones + 1) sAns();
  };
  const reset = () => setPath([start]);
  useRemoteWidget(
    () => ({
      title: 'لوحة المئة',
      info: num(cur),
      steppers: [],
      buttons: [
        { key: 't', label: 'نَعُدُّ عَشَرَةً', disabled: tensDone >= tens },
        { key: 'o', label: 'نَعُدُّ وَاحِدًا', disabled: tensDone < tens || onesDone >= ones },
        { key: 'r', label: 'من البداية' },
      ],
    }),
    (k) => (k === 't' ? tensDone < tens && go(10) : k === 'o' ? tensDone >= tens && onesDone < ones && go(1) : k === 'r' && reset()),
    [cur, tensDone, onesDone],
  );
  return (
    <div className="x5">
      <div className="ptask">
        نَبْدَأُ مِنْ <b>{num(start)}</b>، وَنَعُدُّ <b>{num(tens * 10)}</b> بِالْعَشَرَاتِ، ثُمَّ <b>{num(ones)}</b> بِالْآحَادِ.
      </div>
      <div className="x5row">
        <table className="hundred x5h">
          <tbody>
            {Array.from({ length: 10 }, (_, r) => (
              <tr key={r}>
                {Array.from({ length: 10 }, (_, c) => {
                  const v = r * 10 + c + 1;
                  const at = path.indexOf(v);
                  const cls = v === start ? 'st' : v === cur ? 'cur' : at > 0 ? (v - path[at - 1] === 10 ? 'tj' : 'oj') : '';
                  return (
                    <td key={c} className={cls}>
                      {num(v)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="x5side">
          <div className="x5big">{num(cur)}</div>
          <Btn primary on={() => go(10)} off={tensDone >= tens}>
            نَعُدُّ عَشَرَةً (+١٠)
          </Btn>
          <Btn primary on={() => go(1)} off={tensDone < tens || onesDone >= ones}>
            نَعُدُّ وَاحِدًا (+١)
          </Btn>
          <Btn on={reset}>مِنَ الْبِدَايَةِ</Btn>
          {done && (
            <div className="pans">
              <Eq>
                {num(start)} + {num(tens * 10 + ones)} = {num(cur)}
              </Eq>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- أقرب عشرة ---------- */

/**
 * خط أعداد بين عشرتين، والعدد عليه؛ المعلم يغيّر العدد، والسهم يتجه إلى أقرب عشرة.
 * times: يضرب العدد المقرَّب فيه لتقدير ناتج الضرب (الصف الرابع).
 */
export function RoundExplorer({ start = 37, min = 11, max = 98, times }: { start?: number; min?: number; max?: number; times?: number }) {
  const [n, setN] = useState(start);
  const [shown, setShown] = useState(false);
  const lo = Math.floor(n / 10) * 10;
  const hi = lo + 10;
  const near = n - lo >= 5 ? hi : lo;
  const set = (v: number) => {
    setN(Math.max(min, Math.min(max, v)));
    setShown(false);
  };
  useRemoteWidget(
    () => ({
      title: 'أقرب عشرة',
      info: shown ? `${num(n)} ← ${num(near)}` : num(n),
      steppers: [{ key: 'n', label: 'العدد', value: n, min, max }],
      buttons: [{ key: 's', label: 'أقرب عشرة', on: shown }],
    }),
    (k, v) => (k === 'n' && v !== undefined ? set(v) : k === 's' && setShown(true)),
    [n, shown],
  );
  const W = 900;
  const X = (v: number) => 60 + ((v - lo) / 10) * (W - 120);
  return (
    <div className="x5">
      <svg viewBox={`0 0 ${W} 210`} className="x5line" role="img" aria-label={`${num(n)} بين ${num(lo)} و${num(hi)}`}>
        <line x1={30} y1={130} x2={W - 30} y2={130} stroke="var(--ink)" strokeWidth={4} />
        {Array.from({ length: 11 }, (_, i) => {
          const v = lo + i;
          const big = i === 0 || i === 10;
          return (
            <g key={i}>
              <line x1={X(v)} y1={130 - (big ? 22 : 12)} x2={X(v)} y2={130 + (big ? 22 : 12)} stroke="var(--ink)" strokeWidth={big ? 4 : 2.5} />
              <text x={X(v)} y={big ? 192 : 180} textAnchor="middle" fontSize={big ? 40 : 26} fontWeight={big ? 800 : 600} fill={big && shown && v === near ? GREEN : 'var(--ink)'}>
                {num(v)}
              </text>
            </g>
          );
        })}
        {/* المنتصف */}
        <line x1={X(lo + 5)} y1={84} x2={X(lo + 5)} y2={176} stroke={ORANGE} strokeWidth={2} strokeDasharray="6 5" />
        <circle cx={X(n)} cy={130} r={16} fill={BLUE} />
        <text x={X(n)} y={92} textAnchor="middle" fontSize={40} fontWeight={800} fill={BLUE}>
          {num(n)}
        </text>
        {shown && (
          <path d={`M${X(n)} 54 Q${(X(n) + X(near)) / 2} 14 ${X(near)} 54`} fill="none" stroke={GREEN} strokeWidth={5} markerEnd="url(#x5arrow)" />
        )}
        <defs>
          <marker id="x5arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10z" fill={GREEN} />
          </marker>
        </defs>
      </svg>
      <div className="hopx-ctrl">
        <Stepper label="الْعَدَدُ" value={n} min={min} max={max} set={set} color={BLUE} />
        <Btn primary on={() => setShown(true)} off={shown}>
          أَقْرَبُ عَشَرَةٍ
        </Btn>
      </div>
      <div className="fcap" aria-live="polite">
        {shown ? (
          times ? (
            <span className="eq">
              {num(n)} × {num(times)} ≈ {num(near)} × {num(times)} = <b>{num(near * times)}</b>
            </span>
          ) : (
            <span>
              أَقْرَبُ عَشَرَةٍ إِلَى {num(n)} هِيَ <b>{num(near)}</b>
            </span>
          )
        ) : (
          <span>{num(n)} بَيْنَ {num(lo)} وَ{num(hi)}: أَيُّهُمَا أَقْرَبُ؟</span>
        )}
      </div>
    </div>
  );
}

/* ---------- ترتيب عدد في صفوف متساوية (القواسم) ---------- */

/** n شيئًا نرتبها في صفوف؛ إن تساوت الصفوف فعدد الصفوف وعدد الأعمدة قاسمان، ويُسجَّلان */
export function ArrayExplorer({ n = 24, maxRows = 12 }: { n?: number; maxRows?: number }) {
  const [rows, setRows] = useState(2);
  const [found, setFound] = useState<number[]>([]);
  const cols = Math.floor(n / rows);
  const left = n % rows === 0 ? 0 : n - rows * cols;
  const even = left === 0;
  const set = (v: number) => {
    const r = Math.max(1, Math.min(maxRows, v));
    setRows(r);
    if (n % r === 0 && !found.includes(r)) {
      setFound((f) => [...f, r].sort((a, b) => a - b));
      sAns();
    }
  };
  useRemoteWidget(
    () => ({
      title: 'الصفوف',
      info: even ? `${num(rows)} × ${num(cols)} = ${num(n)}` : `يبقى ${num(left)}`,
      steppers: [{ key: 'r', label: 'عدد الصفوف', value: rows, min: 1, max: maxRows }],
      buttons: [{ key: 'z', label: 'من جديد' }],
    }),
    (k, v) => (k === 'r' && v !== undefined ? set(v) : k === 'z' && (setFound([]), setRows(2))),
    [rows, found.length],
  );
  return (
    <div className="x5">
      <div className="x5row">
        <div className="x5arr" style={{ '--c': Math.max(cols, 1) } as React.CSSProperties} role="img" aria-label={`${num(rows)} صفوف`}>
          {Array.from({ length: rows * cols }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        {left > 0 && (
          <div className="x5left">
            {Array.from({ length: left }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        )}
      </div>
      <div className="hopx-ctrl">
        <Stepper label="عَدَدُ الصُّفُوفِ" value={rows} min={1} max={maxRows} set={set} color={BLUE} />
      </div>
      <div className="fcap" aria-live="polite">
        {even ? (
          <span className="eq">
            {num(rows)} × {num(cols)} = <b>{num(n)}</b>
          </span>
        ) : (
          <span style={{ color: RED }}>الصُّفُوفُ غَيْرُ مُتَسَاوِيَةٍ: يَبْقَى {num(left)}</span>
        )}
      </div>
      {found.length > 0 && (
        <div className="x5found">
          قَوَاسِمُ {num(n)} الَّتِي وَجَدْنَاهَا:{' '}
          {[...new Set(found.flatMap((r) => [r, n / r]))]
            .sort((a, b) => a - b)
            .map((v) => (
              <b key={v}>{num(v)}</b>
            ))}
        </div>
      )}
    </div>
  );
}

/* ---------- نمط الأصفار ---------- */

/** حقيقة ضرب a × b، ثم a × b٠ ، a × b٠٠ ، a × b٠٠٠: الأصفار نفسها تنتقل إلى الناتج */
export function ZerosExplorer({ a = 3, b = 4 }: { a?: number; b?: number }) {
  const [k, setK] = useState(0);
  const zeros = '٠'.repeat(k);
  const fact = a * b;
  const names = ['١', '١٠', '١٠٠', '١٠٠٠'];
  useRemoteWidget(
    () => ({
      title: 'نمط الأصفار',
      info: `${num(a)} × ${num(b)}${zeros} = ${num(fact)}${zeros}`,
      steppers: [{ key: 'k', label: 'عدد الأصفار', value: k, min: 0, max: 3 }],
      buttons: [],
    }),
    (key, v) => key === 'k' && v !== undefined && setK(v),
    [k],
  );
  return (
    <div className="x5">
      <div className="x5zero eq" aria-live="polite">
        {num(a)} × {num(b)}
        <b>{zeros}</b> = {num(fact)}
        <b>{zeros}</b>
      </div>
      <div className="fcap">
        <span>
          {k === 0 ? 'الْحَقِيقَةُ الْأَسَاسِيَّةُ' : `نَضْرِبُ فِي مُضَاعَفِ ${names[k]}: نَضَعُ ${num(k)} ${k === 1 ? 'صِفْرًا' : k === 2 ? 'صِفْرَيْنِ' : 'أَصْفَارٍ'} فِي النَّاتِجِ`}
        </span>
      </div>
      <div className="hopx-ctrl">
        {[0, 1, 2, 3].map((i) => (
          <Btn key={i} primary={k === i} on={() => setK(i)}>
            {i === 0 ? `${num(a)} × ${num(b)}` : `× ${num(b)}${'٠'.repeat(i)}`}
          </Btn>
        ))}
      </div>
    </div>
  );
}

/* ---------- تجزئة الضرب: عشرات وآحاد ---------- */

/**
 * rows × n نقاطًا، مقسومة عند العشرات: جزء العشرات وجزء الآحاد بلونين، وتحت كل جزء ناتجه الجزئي ثم المجموع.
 * المعلم يغيّر عدد الصفوف والعدد (حتى ٤٩).
 */
export function SplitArray({ rows: r0 = 3, n: n0 = 14 }: { rows?: number; n?: number }) {
  const [rows, setRows] = useState(r0);
  const [n, setN] = useState(n0);
  const [split, setSplit] = useState(false);
  const t = Math.floor(n / 10) * 10;
  const o = n % 10;
  const setR = (v: number) => (setRows(Math.max(1, Math.min(9, v))), setSplit(false));
  const setNn = (v: number) => (setN(Math.max(11, Math.min(49, v))), setSplit(false));
  useRemoteWidget(
    () => ({
      title: 'تجزئة الضرب',
      info: `${num(rows)} × ${num(n)}`,
      steppers: [
        { key: 'r', label: 'الصفوف', value: rows, min: 1, max: 9, color: BLUE },
        { key: 'n', label: 'في كل صف', value: n, min: 11, max: 49, color: ORANGE },
      ],
      buttons: [{ key: 's', label: 'نجزّئ', on: split }],
    }),
    (k, v) => (k === 'r' && v !== undefined ? setR(v) : k === 'n' && v !== undefined ? setNn(v) : k === 's' && (setSplit(true), sAns())),
    [rows, n, split],
  );
  const dot = 22;
  const gap = 6;
  const sep = split ? 26 : 0;
  const W = n * (dot + gap) + sep + 20;
  const H = rows * (dot + gap) + 10;
  // العشرات عن اليمين ثم الآحاد عن اليسار، كما نقرأ العدد في سطر من اليمين
  const cx = (c: number) => W - 10 - (c + 0.5) * (dot + gap) - (c >= t ? sep : 0);
  // حجم الكتابة على قدر الرسم، ومركزها لا يقترب من الحافتين
  const fs = Math.max(30, W / 32);
  const half = fs * 3.4;
  const inside = (x: number) => Math.max(half, Math.min(W - half, x));
  return (
    <div className="x5">
      <svg className="x5split" viewBox={`0 0 ${W} ${H + (split ? 70 : 0)}`} role="img" aria-label={`${num(rows)} × ${num(n)}`}>
        {Array.from({ length: rows }, (_, ri) =>
          Array.from({ length: n }, (_, c) => <circle key={`${ri}-${c}`} cx={cx(c)} cy={10 + (ri + 0.5) * (dot + gap)} r={dot / 2} fill={split ? (c < t ? BLUE : ORANGE) : '#6b7280'} />),
        )}
        {split && (
          <g>
            {/* الناتجان الجزئيان: كل جزء نص وحده (BoardRow)، ولا يخرج عن حافة الرسم */}
            <BoardRow parts={[num(rows), '×', num(t), '=', num(rows * t)]} x={inside((cx(0) + cx(t - 1)) / 2)} y={H + 52} size={fs} color={BLUE} />
            {o > 0 && <BoardRow parts={[num(rows), '×', num(o), '=', num(rows * o)]} x={inside((cx(t) + cx(n - 1)) / 2)} y={H + 52} size={fs} color={ORANGE} />}
          </g>
        )}
      </svg>
      <div className="hopx-ctrl">
        <Stepper label="الصُّفُوفُ" value={rows} min={1} max={9} set={setR} color={BLUE} />
        <Stepper label="فِي كُلِّ صَفٍّ" value={n} min={11} max={49} set={setNn} color={ORANGE} />
        <Btn primary on={() => (setSplit(true), sAns())} off={split}>
          نُجَزِّئُ: عَشَرَاتٌ وَآحَادٌ
        </Btn>
      </div>
      <div className="fcap" aria-live="polite">
        {split ? (
          <span className="eq">
            {num(rows)} × {num(n)} = {num(rows * t)} + {num(rows * o)} = <b>{num(rows * n)}</b>
          </span>
        ) : (
          <span className="eq">{num(rows)} × {num(n)} = ؟</span>
        )}
      </div>
    </div>
  );
}
