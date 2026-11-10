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

/* ---------- نصنع عشرة (جمع ثلاثة أعداد) ---------- */

/**
 * ثلاثة أعداد؛ الصف يضغط رقمَي آحاد مجموعهما ١٠، فيرتبطان، ثم نجمع الباقي.
 */
export function MakeTen({ nums }: { nums: number[] }) {
  const [sel, setSel] = useState<number[]>([]);
  const [pair, setPair] = useState<number[] | null>(null);
  const [msg, setMsg] = useState('');
  const [sum, setSum] = useState(false);
  const ones = nums.map((v) => v % 10);
  const pick = (i: number) => {
    if (pair) return;
    const s = sel.includes(i) ? sel.filter((x) => x !== i) : [...sel, i];
    if (s.length < 2) return setSel(s), setMsg('');
    if (ones[s[0]] + ones[s[1]] === 10) {
      setPair(s);
      setSel([]);
      setMsg(`${num(ones[s[0]])} + ${num(ones[s[1]])} = ١٠`);
      sAns();
    } else {
      setSel([]);
      setMsg(`${num(ones[s[0]])} + ${num(ones[s[1]])} = ${num(ones[s[0]] + ones[s[1]])}: لَيْسَتْ عَشَرَةً`);
    }
  };
  const reset = () => (setSel([]), setPair(null), setMsg(''), setSum(false));
  const rest = pair ? ones.filter((_, i) => !pair.includes(i)).reduce((a, b) => a + b, 0) : 0;
  const onesTotal = ones.reduce((a, b) => a + b, 0);
  const total = nums.reduce((a, b) => a + b, 0);
  useRemoteWidget(
    () => ({
      title: 'نصنع عشرة',
      info: msg || 'نختار رقمين مجموعهما ١٠',
      steppers: [],
      buttons: [
        ...nums.map((v, i) => ({ key: `p${i}`, label: `آحاد ${num(v)}`, on: sel.includes(i) || !!pair?.includes(i), disabled: !!pair })),
        { key: 's', label: 'نجمع', disabled: !pair || sum },
        { key: 'r', label: 'من جديد' },
      ],
    }),
    (k) => (k.startsWith('p') ? pick(Number(k.slice(1))) : k === 's' ? pair && setSum(true) : k === 'r' && reset()),
    [sel.join(), pair?.join(), sum, msg],
  );
  return (
    <div className="x5">
      <div className="x5cards">
        {nums.map((v, i) => (
          <div key={i} className={'x5num' + (pair?.includes(i) ? ' paired' : '')}>
            <span className="tens">{num(Math.floor(v / 10))}</span>
            <button type="button" className={'one' + (sel.includes(i) ? ' sel' : '')} onClick={() => pick(i)} aria-label={`آحاد ${num(v)}`}>
              {num(v % 10)}
            </button>
          </div>
        ))}
      </div>
      <div className={'fcap' + (pair ? '' : ' muted')} aria-live="polite">
        <span className="eq">{msg || 'نَضْغَطُ رَقْمَيْنِ فِي الْآحَادِ مَجْمُوعُهُمَا ١٠'}</span>
      </div>
      <div className="hopx-ctrl">
        <Btn primary on={() => setSum(true)} off={!pair || sum}>
          نَجْمَعُ
        </Btn>
        <Btn on={reset}>مِنْ جَدِيدٍ</Btn>
      </div>
      {sum && (
        <div className="x5steps">
          <span className="eq">الْآحَادُ: ١٠ + {num(rest)} = {num(onesTotal)}</span>
          <div className="pans">
            <Eq>
              {nums.map((v) => num(v)).join(' + ')} = {num(total)}
            </Eq>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- نرجع إلى الخلف (الحل العكسي) ---------- */

/**
 * البداية مجهولة، ثم خطوات (أعطى/أخذ)، ثم النهاية. «نرجع خطوة» يعكس آخر خطوة لم تُعكس ويكتب الجملة.
 * ops: [{ d: −٧, label: 'اشْتَرَى بِـ٧' }, …] بالترتيب من البداية.
 */
export function Rewind({ start, ops }: { start: number; ops: { d: number; label: string }[] }) {
  const [back, setBack] = useState(0);
  // القيم بعد كل خطوة: v[0] البداية … v[n] النهاية
  const vals = ops.reduce((a, o) => [...a, a[a.length - 1] + o.d], [start]);
  const n = ops.length;
  const known = (k: number) => k >= n - back;
  const step = () => {
    if (back >= n) return;
    setBack(back + 1);
    if (back + 1 === n) sAns();
  };
  useRemoteWidget(
    () => ({ title: 'نرجع إلى الخلف', info: back >= n ? `البداية ${num(start)}` : `رجعنا ${num(back)} من ${num(n)}`, steppers: [], buttons: [{ key: 'b', label: 'نرجع خطوة', disabled: back >= n }, { key: 'r', label: 'من البداية' }] }),
    (k) => (k === 'b' ? step() : k === 'r' && setBack(0)),
    [back],
  );
  return (
    <div className="x5">
      <div className="x5chain">
        {vals.map((v, k) => (
          <div key={k} className="x5link">
            <div className={'x5box' + (k === 0 ? ' start' : k === n ? ' end' : '') + (known(k) ? ' known' : '')}>
              <small>{k === 0 ? 'الْبِدَايَةُ' : k === n ? 'النِّهَايَةُ' : 'بَعْدَهَا'}</small>
              <b>{known(k) ? num(v) : '؟'}</b>
            </div>
            {k < n && (
              <div className={'x5op' + (n - 1 - k < back ? ' undone' : '')}>
                <span>{ops[k].label}</span>
                <i>←</i>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="x5steps" aria-live="polite">
        {Array.from({ length: back }, (_, j) => {
          const k = n - 1 - j;
          const o = ops[k];
          return (
            <span key={j} className="eq">
              {num(vals[k + 1])} {o.d > 0 ? '−' : '+'} {num(Math.abs(o.d))} = {num(vals[k])}
            </span>
          );
        })}
      </div>
      <div className="hopx-ctrl">
        <Btn primary on={step} off={back >= n}>
          نَرْجِعُ خُطْوَةً
        </Btn>
        <Btn on={() => setBack(0)}>مِنَ الْبِدَايَةِ</Btn>
      </div>
    </div>
  );
}

/* ---------- أخمّن وأتحقق ---------- */

/**
 * عددان: إما مجموعهما sum وفرقهما diff، أو مجموعهما sum وناتج ضربهما prod.
 * المعلم يختار التخمين (العدد الأصغر)، ويضغط «نتحقق»، فيُضاف سطر إلى الجدول بنتيجته.
 */
export function GuessTable({ sum, diff, prod }: { sum: number; diff?: number; prod?: number }) {
  const [g, setG] = useState(1);
  const [rows, setRows] = useState<{ a: number; b: number; ok: boolean; note: string }[]>([]);
  const pairOf = (a: number) => (prod !== undefined ? [a, sum - a] : [a, a + (diff ?? 0)]);
  const check = () => {
    const [a, b] = pairOf(g);
    let ok: boolean;
    let note: string;
    if (prod !== undefined) {
      ok = a * b === prod;
      note = ok ? 'صَحِيحٌ!' : a * b > prod ? 'النَّاتِجُ أَكْبَرُ' : 'النَّاتِجُ أَصْغَرُ';
    } else {
      ok = a + b === sum;
      note = ok ? 'صَحِيحٌ!' : a + b > sum ? 'الْمَجْمُوعُ أَكْبَرُ' : 'الْمَجْمُوعُ أَصْغَرُ';
    }
    setRows((r) => [...r.filter((x) => x.a !== a), { a, b, ok, note }].slice(-6));
    if (ok) sAns();
  };
  const max = prod !== undefined ? sum - 1 : sum;
  useRemoteWidget(
    () => ({ title: 'أخمّن وأتحقق', info: rows.length ? rows[rows.length - 1].note : 'نختار التخمين', steppers: [{ key: 'g', label: 'التخمين', value: g, min: 1, max }], buttons: [{ key: 'c', label: 'نتحقق' }, { key: 'r', label: 'من جديد' }] }),
    (k, v) => (k === 'g' && v !== undefined ? setG(v) : k === 'c' ? check() : k === 'r' && setRows([])),
    [g, rows.length],
  );
  const [a, b] = pairOf(g);
  return (
    <div className="x5">
      <div className="ptask">
        {prod !== undefined ? (
          <>
            عَدَدَانِ مَجْمُوعُهُمَا <b>{num(sum)}</b>، وَنَاتِجُ ضَرْبِهِمَا <b>{num(prod)}</b>. مَا هُمَا؟
          </>
        ) : (
          <>
            عَدَدَانِ مَجْمُوعُهُمَا <b>{num(sum)}</b>، وَالْفَرْقُ بَيْنَهُمَا <b>{num(diff ?? 0)}</b>. مَا هُمَا؟
          </>
        )}
      </div>
      <div className="hopx-ctrl">
        <Stepper label="نُخَمِّنُ" value={g} min={1} max={max} set={(v) => setG(Math.max(1, Math.min(max, v)))} color={BLUE} />
        <span className="x5pair eq">
          {num(a)} وَ{num(b)}
        </span>
        <Btn primary on={check}>
          نَتَحَقَّقُ
        </Btn>
        <Btn on={() => setRows([])}>مِنْ جَدِيدٍ</Btn>
      </div>
      <table className="x5tab">
        <thead>
          <tr>
            <th>التَّخْمِينُ</th>
            <th>{prod !== undefined ? 'نَاتِجُ الضَّرْبِ' : 'الْمَجْمُوعُ'}</th>
            <th>النَّتِيجَةُ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.a} className={r.ok ? 'ok' : 'no'}>
              <td>
                {num(r.a)} وَ{num(r.b)}
              </td>
              <td>
                <span className="eq">{prod !== undefined ? `${num(r.a)} × ${num(r.b)} = ${num(r.a * r.b)}` : `${num(r.a)} + ${num(r.b)} = ${num(r.a + r.b)}`}</span>
              </td>
              <td>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- معقول أم لا؟ ---------- */

/** مسألة ضرب وإجابات مقترحة؛ نقدّر أولًا، ثم نحكم على كل إجابة بقربها من التقدير */
export function ReasonCheck({ a, b, options }: { a: number; b: number; options: number[] }) {
  const p = 10 ** (String(a).length - 1);
  const ra = Math.round(a / p) * p;
  const est = ra * b;
  const [shown, setShown] = useState(false);
  const [pick, setPick] = useState<number | null>(null);
  const ok = (v: number) => v >= est / 2 && v <= est * 2;
  useRemoteWidget(
    () => ({
      title: 'معقول أم لا؟',
      info: pick === null ? (shown ? `التقدير ${num(est)}` : `${num(a)} × ${num(b)}`) : ok(pick) ? 'معقول' : 'غير معقول',
      steppers: [],
      buttons: [{ key: 'e', label: 'نقدّر', on: shown }, ...options.map((v) => ({ key: `o${v}`, label: num(v), on: pick === v, disabled: !shown }))],
    }),
    (k) => (k === 'e' ? setShown(true) : k.startsWith('o') && shown && setPick(Number(k.slice(1)))),
    [shown, pick],
  );
  return (
    <div className="x5">
      <div className="x5zero eq">
        {num(a)} × {num(b)} = ؟
      </div>
      <div className="hopx-ctrl">
        <Btn primary on={() => setShown(true)} off={shown}>
          نُقَدِّرُ أَوَّلًا
        </Btn>
        {shown && (
          <span className="x5pair eq">
            {num(ra)} × {num(b)} = {num(est)}
          </span>
        )}
      </div>
      <div className="hopx-ctrl">
        {options.map((v) => (
          <button key={v} type="button" disabled={!shown} className={'btn x5opt' + (pick === v ? (ok(v) ? ' good' : ' bad') : '')} onClick={() => setPick(v)}>
            {num(v)}
          </button>
        ))}
      </div>
      <div className="fcap" aria-live="polite">
        {pick !== null && (
          <span>
            {num(pick)} {ok(pick) ? 'قَرِيبٌ مِنَ التَّقْدِيرِ: ' : pick > est ? 'أَكْبَرُ بِكَثِيرٍ مِنَ التَّقْدِيرِ: ' : 'أَصْغَرُ بِكَثِيرٍ مِنَ التَّقْدِيرِ: '}
            <b style={{ color: ok(pick) ? GREEN : RED }}>{ok(pick) ? 'مَعْقُولٌ' : 'غَيْرُ مَعْقُولٍ'}</b>
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------- نموذج المساحة لضرب عدد من ثلاثة أرقام ---------- */

/** مستطيل مقسوم إلى آحاد وعشرات ومئات (كما في نموذج الكتاب)؛ «نجزّئ» يكتب كل ناتج جزئي ثم المجموع */
export function AreaExplorer({ a: a0, b: b0 }: { a: number; b: number }) {
  const [a, setA] = useState(a0);
  const [b, setB] = useState(b0);
  const [split, setSplit] = useState(false);
  const parts = [a % 10, Math.floor(a / 10) % 10 * 10, Math.floor(a / 100) * 100].filter((v, i) => v > 0 || i === 2);
  const setAa = (v: number) => (setA(Math.max(101, Math.min(999, v))), setSplit(false));
  const setBb = (v: number) => (setB(Math.max(2, Math.min(9, v))), setSplit(false));
  useRemoteWidget(
    () => ({
      title: 'نموذج المساحة',
      info: `${num(b)} × ${num(a)}`,
      steppers: [
        { key: 'a', label: 'العدد', value: a, min: 101, max: 999, color: ORANGE },
        { key: 'b', label: 'في', value: b, min: 2, max: 9, color: BLUE },
      ],
      buttons: [{ key: 's', label: 'نجزّئ', on: split }],
    }),
    (k, v) => (k === 'a' && v !== undefined ? setAa(v) : k === 'b' && v !== undefined ? setBb(v) : k === 's' && (setSplit(true), sAns())),
    [a, b, split],
  );
  // العرض: جذرٌ للقيمة، فيظهر الجزء الصغير ولا يطغى الكبير
  const grow = (v: number) => Math.max(4.5, Math.sqrt(v));
  return (
    <div className="x5">
      <div className="areaw x5area">
        <div className="atop">
          {parts.map((p, i) => (
            <span key={i} style={{ flexGrow: grow(p) }}>
              {num(p)}
            </span>
          ))}
        </div>
        <div className="arow">
          <b>{num(b)}</b>
          <div className="area" style={{ '--h': 3 } as React.CSSProperties}>
            {parts.map((p, i) => (
              <div key={i} className={`apart a${i}`} style={{ flexGrow: grow(p) }}>
                {split && (
                  <span className="eq">
                    {num(b)} × {num(p)} = {num(b * p)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hopx-ctrl">
        <Stepper label="الْعَدَدُ" value={a} min={101} max={999} set={setAa} color={ORANGE} />
        <Stepper label="فِي" value={b} min={2} max={9} set={setBb} color={BLUE} />
        <Btn primary on={() => (setSplit(true), sAns())} off={split}>
          نُجَزِّئُ
        </Btn>
      </div>
      <div className="fcap" aria-live="polite">
        {split ? (
          <span className="eq">
            {num(b)} × {num(a)} = {[...parts].reverse().map((p) => num(b * p)).join(' + ')} = <b>{num(a * b)}</b>
          </span>
        ) : (
          <span className="eq">
            {num(b)} × {num(a)} = ؟
          </span>
        )}
      </div>
    </div>
  );
}
