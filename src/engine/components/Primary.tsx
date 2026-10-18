import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useSlide } from '../context';
import { num } from '../digits';
import type { RemoteWidget } from '../remote';
import type { HlKey } from '../types';
import { Blank } from './Cubes';

/* أدوات الصفوف الأولى: خط الأعداد، قطعة الدومينو، الجمل العددية، مثلث الحقائق، جدول التخمين والتحقق. */

/* ---------- التحكم من الجوال لأي أداة ---------- */

/**
 * يسجّل أداة تفاعلية في شريحتها فيعرضها الجوال (عدّادات وأزرار) ويتحكم بها.
 * get يُستدعى عند كل إرسال للحالة، وdeps تُبلغ الجوال حين تتغير الأداة.
 */
export function useRemoteWidget(get: () => RemoteWidget, act: (key: string, v?: number) => void, deps: unknown[]) {
  const slide = useSlide();
  const latest = useRef({ get, act });
  latest.current = { get, act };
  useEffect(() => {
    slide.setWidget({ get: () => latest.current.get(), act: (k, v) => latest.current.act(k, v) });
    return () => slide.setWidget(null);
  }, [slide.setWidget]);
  useEffect(() => slide.touch(), deps);
}

/** أعلى مفتاح ظاهر من نوع ‹prefix{k}› بين ks (الخطوات تتراكم، فالأحدث هو الأعلى ترتيبًا) */
function latestKey(active: ReadonlySet<string>, prefix: string, ks: number[]) {
  let best: number | null = null;
  ks.forEach((k, i) => {
    if (active.has(`${prefix}${k}`)) best = i;
  });
  return best;
}

/* ---------- خط الأعداد والعدّ التنازلي ---------- */

export interface Jump {
  from: number;
  /** عدد القفزات إلى الخلف (العدّ التنازلي) */
  back: number;
  /** كم قفزة تظهر الآن (للمستكشف)؛ الافتراضي كلها */
  shown?: number;
}

interface LineProps {
  max: number;
  min?: number;
  /** قفزات ثابتة */
  jump?: Jump | null;
  /**
   * مسائل الشريحة: تظهر قفزات المسألة k عند ظهور خطوة فيها hl ‹p{k}›،
   * وتُعرض آخر مسألة ظهرت.
   */
  problems?: (Jump & { k: number })[];
  label?: string;
}

/**
 * خط أعداد كما في الكتاب: من اليسار إلى اليمين، بسهمين، والقفزات أقواس متقطعة إلى الخلف
 * مرقّمة ١، ٢، ٣ فوقها، ودائرة حول عدد البداية، ونقطة عند الناتج.
 */
export function NumberLine({ max, min = 0, jump, problems, label }: LineProps) {
  const { activeHl } = useSlide();
  const pi = problems ? latestKey(activeHl, 'p', problems.map((p) => p.k)) : null;
  const j = jump ?? (pi !== null && problems ? problems[pi] : null);
  // مساحة القفزات فوق المحور قدر ما تحتاجه فقط، فيبقى الخط قصيرًا على الشريحة
  const W = 1000;
  const H = 168;
  const pad = 46;
  const base = 108;
  const X = (v: number) => pad + ((v - min) * (W - pad * 2)) / (max - min);
  const step = X(min + 1) - X(min);
  const shown = j ? Math.min(j.back, j.shown ?? j.back) : 0;
  const end = j ? j.from - shown : null;
  return (
    <svg className="nline" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label ?? `خط الأعداد من ${num(min)} إلى ${num(max)}`}>
      <line x1={12} x2={W - 12} y1={base} y2={base} className="nl-axis" />
      <path d={`M12 ${base} l18 -11 v22 z M${W - 12} ${base} l-18 -11 v22 z`} className="nl-arrow" />
      {Array.from({ length: max - min + 1 }, (_, i) => {
        const v = min + i;
        return (
          <g key={v}>
            <line x1={X(v)} x2={X(v)} y1={base - 14} y2={base + 14} className="nl-tick" />
            <text x={X(v)} y={base + 48} textAnchor="middle" className="nl-num">
              {num(v)}
            </text>
          </g>
        );
      })}
      {j && (
        <g key={`${j.from}-${j.back}`}>
          <circle cx={X(j.from)} cy={base + 38} r={24} className="nl-start" />
          <circle cx={X(j.from)} cy={base} r={9} className="nl-dot" />
          {Array.from({ length: shown }, (_, h) => {
            const a = X(j.from - h);
            const b = X(j.from - h - 1);
            const mid = (a + b) / 2;
            return (
              <g key={h} className="nl-hop" style={{ animationDelay: `${(j.shown === undefined ? h : 0) * 0.35}s` }}>
                <path d={`M${a} ${base - 6} C${a} ${base - step * 0.75}, ${b} ${base - step * 0.75}, ${b} ${base - 8}`} className="nl-arc" />
                <path d={`M${b - 8} ${base - 22} L${b} ${base - 8} L${b + 9} ${base - 21}`} className="nl-head" />
                <text x={mid} y={base - step * 0.62 - 10} textAnchor="middle" className="nl-count">
                  {num(h + 1)}
                </text>
              </g>
            );
          })}
          {end !== null && shown > 0 && <circle cx={X(end)} cy={base} r={11} className="nl-end" />}
        </g>
      )}
    </svg>
  );
}

/** مستكشف العدّ التنازلي: يختار المعلم البداية وعدد القفزات، ويقفز قفزة قفزة */
export function HopExplorer({ max = 12, start = [10, 3] as [number, number] }: { max?: number; start?: [number, number] }) {
  const [from, setFrom] = useState(start[0]);
  const [back, setBack] = useState(start[1]);
  const [shown, setShown] = useState(0);
  const fit = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
  const setF = (v: number) => {
    const f = fit(v, 1, max);
    setFrom(f);
    setBack((b) => Math.min(b, f));
    setShown(0);
  };
  const setB = (v: number) => {
    setBack(fit(v, 0, from));
    setShown(0);
  };
  const hop = () => setShown((s) => Math.min(back, s + 1));
  const done = shown >= back;
  useRemoteWidget(
    () => ({
      title: 'خط الأعداد',
      info: `${num(from)} − ${num(back)}` + (done ? ` = ${num(from - back)}` : ` · قفزة ${num(shown)} من ${num(back)}`),
      steppers: [
        { key: 'from', label: 'أبدأ من', value: from, min: 1, max },
        { key: 'back', label: 'أطرح', value: back, min: 0, max: from },
      ],
      buttons: [
        { key: 'hop', label: 'قفزة إلى الخلف', on: true, disabled: done },
        { key: 'all', label: 'كل القفزات', disabled: done },
        { key: 'reset', label: 'من جديد' },
      ],
    }),
    (k, v) => {
      if (k === 'from' && v !== undefined) setF(v);
      else if (k === 'back' && v !== undefined) setB(v);
      else if (k === 'hop') hop();
      else if (k === 'all') setShown(back);
      else if (k === 'reset') setShown(0);
    },
    [from, back, shown],
  );
  const stepper = (label: string, v: number, set: (v: number) => void, lo: number, hi: number) => (
    <div className="ffstep">
      <span>{label}</span>
      <button aria-label={`إنقاص ${label}`} disabled={v <= lo} onClick={() => set(v - 1)}>
        −
      </button>
      <b>{num(v)}</b>
      <button aria-label={`زيادة ${label}`} disabled={v >= hi} onClick={() => set(v + 1)}>
        +
      </button>
    </div>
  );
  return (
    <div className="hopx">
      <div className="chart">
        <NumberLine max={max} jump={{ from, back, shown }} />
      </div>
      <div className="hopx-ctrl">
        {stepper('أبدأ من', from, setF, 1, max)}
        {stepper('أطرح', back, setB, 0, from)}
        <button className="btn step-btn" onClick={hop} disabled={done}>
          قفزة إلى الخلف
        </button>
        <button className="btn" onClick={() => setShown(0)}>
          من جديد
        </button>
        <span className={'hopx-eq' + (done ? ' done' : '')}>
          <span className="eq">
            {num(from)} − {num(back)} = {done ? num(from - back) : '؟'}
          </span>
        </span>
      </div>
    </div>
  );
}

/* ---------- قطعة الدومينو ---------- */

/** مواضع النقاط في شبكة ٣×٣ لكل عدد من ٠ إلى ٩ */
const PIPS: number[][] = [[], [4], [0, 8], [0, 4, 8], [0, 2, 6, 8], [0, 2, 4, 6, 8], [0, 2, 3, 5, 6, 8], [0, 2, 3, 4, 5, 6, 8], [0, 1, 2, 3, 5, 6, 7, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8]];

function Pips({ n, x, s, cls }: { n: number; x: number; s: number; cls: string }) {
  return (
    <>
      {PIPS[n].map((p) => (
        <circle key={p} cx={x + s * (0.22 + 0.28 * (p % 3))} cy={s * (0.22 + 0.28 * Math.floor(p / 3)) + 10} r={s * 0.09} className={cls} />
      ))}
    </>
  );
}

/**
 * دومينو حمراء كما في الكتاب: النقاط المعروفة في النصف الأيمن، والنصف الأيسر «؟»
 * حتى تظهر خطوة فيها hl ‹p{k}› فتظهر نقاطه.
 */
export function Domino({ known, missing, k = 0, show }: { known: number; missing: number; k?: number; show?: boolean }) {
  const { activeHl } = useSlide();
  const open = show ?? activeHl.has(`p${k}`);
  const s = 150;
  return (
    <svg className="domino" viewBox={`0 0 ${s * 2 + 30} ${s + 20}`} role="img" aria-label={`دومينو: ${num(known)} نقاط و${open ? num(missing) : 'عدد مفقود'}`}>
      <rect x={4} y={4} width={s * 2 + 22} height={s + 12} rx={14} className="dm-body" />
      <rect x={16} y={10} width={s - 8} height={s} rx={8} className="dm-blank" />
      <line x1={s + 15} x2={s + 15} y1={12} y2={s + 8} className="dm-split" />
      <g transform={`translate(${s + 12} 0)`}>
        <Pips n={known} x={0} s={s} cls="dm-pip" />
      </g>
      {open ? (
        <g className="dm-open" transform="translate(16 0)">
          <Pips n={missing} x={-4} s={s - 8} cls="dm-pip2" />
        </g>
      ) : (
        <text x={16 + (s - 8) / 2} y={s / 2 + 30} textAnchor="middle" className="dm-q">
          ؟
        </text>
      )}
    </svg>
  );
}

/* ---------- الجملة العددية: الخانة الفارغة في أي موضع ---------- */

export type Token = number | '+' | '−' | '=' | { b: number; hl?: readonly HlKey[]; box?: boolean };

/**
 * جملة عددية تُقرأ من اليمين كما في الكتاب: [٩، '+'، {b: ٦}، '='، ١٥] تُعرض «٩ + □ = ١٥»،
 * وتمتلئ الخانة في مكانها عند «الخطوة التالية».
 */
export function Sentence({ t, big }: { t: Token[]; big?: boolean }) {
  return (
    <div className={'fline sent' + (big ? ' big' : '')}>
      {t.map((x, i) =>
        typeof x === 'number' ? (
          <span key={i} className="snum">
            {num(x)}
          </span>
        ) : typeof x === 'string' ? (
          <span key={i} className="sop">
            {x}
          </span>
        ) : (
          <Blank key={i} v={x.b} hl={x.hl} box={x.box} />
        ),
      )}
    </div>
  );
}

/* ---------- مثلث الحقائق ---------- */

/** مثلث الحقائق المترابطة: المجموع في الأعلى، والجزآن في الزاويتين السفليين كما في الكتاب */
export function FactTriangle({ top, left, right, color = '#7cc68d', edge = '#1f9a45' }: { top: number; left: number; right: number; color?: string; edge?: string }) {
  return (
    <svg className="ftri" viewBox="0 0 240 200" role="img" aria-label={`مثلث الحقائق: ${num(top)} و${num(left)} و${num(right)}`}>
      <path d="M120 10 L230 190 L10 190 Z" fill={color} stroke={edge} strokeWidth={9} strokeLinejoin="round" />
      <text x={120} y={82} textAnchor="middle" className="ft-num">
        {num(top)}
      </text>
      <text x={52} y={174} textAnchor="middle" className="ft-num">
        {num(left)}
      </text>
      <text x={188} y={174} textAnchor="middle" className="ft-num">
        {num(right)}
      </text>
    </svg>
  );
}

/* ---------- أخمّن وأتحقق ---------- */

interface GuessProps {
  /** اسما الكميتين: الأولى تُخمَّن، والثانية = الأولى + diff */
  names: [string, string];
  total: number;
  diff: number;
  /** التخمين الأول المعروض */
  first?: number;
}

/**
 * جدول التخمين والتحقق: يختار المعلم أو الطالب تخمينًا للكمية الأولى، فتُحسب الثانية والمجموع،
 * ويُضاف سطر إلى الجدول مع ✓ أو ✗، حتى يطابق المجموع المطلوب.
 */
export function GuessCheck({ names, total, diff, first = 1 }: GuessProps) {
  const [g, setG] = useState(first);
  const [rows, setRows] = useState<number[]>([]);
  const max = total;
  const ok = (a: number) => a + a + diff === total;
  const check = () => setRows((r) => (r.includes(g) ? r : [...r, g]));
  const solved = rows.some(ok);
  useRemoteWidget(
    () => ({
      title: 'أخمّن وأتحقق',
      info: solved ? 'وجدنا الإجابة ✓' : rows.length ? `${num(rows.length)} محاولة` : 'اختر تخمينًا ثم اضغط «أتحقق»',
      steppers: [{ key: 'g', label: names[0], value: g, min: 0, max }],
      buttons: [
        { key: 'check', label: 'أتحقق', on: true },
        { key: 'clear', label: 'مسح الجدول' },
      ],
    }),
    (k, v) => {
      if (k === 'g' && v !== undefined) setG(Math.max(0, Math.min(max, v)));
      else if (k === 'check') check();
      else if (k === 'clear') setRows([]);
    },
    [g, rows],
  );
  return (
    <div className="gcheck">
      <div className="gc-ctrl">
        <div className="ffstep">
          <span>{names[0]}</span>
          <button aria-label="إنقاص التخمين" disabled={g <= 0} onClick={() => setG(g - 1)}>
            −
          </button>
          <b>{num(g)}</b>
          <button aria-label="زيادة التخمين" disabled={g >= max} onClick={() => setG(g + 1)}>
            +
          </button>
        </div>
        <button className="btn step-btn" onClick={check}>
          أتحقق
        </button>
        <button className="btn" onClick={() => setRows([])}>
          مسح
        </button>
      </div>
      <table className="data gc-table">
        <thead>
          <tr>
            <th>{names[0]}</th>
            <th>{names[1]}</th>
            <th>المجموع</th>
            <th>المجموع {num(total)}؟</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => (
            <tr key={a} className={ok(a) ? 'ok' : 'no'}>
              <td>{num(a)}</td>
              <td>
                {num(a)} + {num(diff)} = {num(a + diff)}
              </td>
              <td>{num(a + a + diff)}</td>
              <td>{ok(a) ? '✓' : a + a + diff < total ? '✗ أقل' : '✗ أكثر'}</td>
            </tr>
          ))}
          {!rows.length && (
            <tr>
              <td colSpan={4} className="gc-empty">
                لا محاولات بعد
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/** اختيار عددين من مجموعة ليكون مجموعهما مطلوبًا (أكياس البرتقال، باقات الزهور) */
export function PairPick({ options, total, unit }: { options: number[]; total: number; unit: string }) {
  const [sel, setSel] = useState<number[]>([]);
  const toggle = (i: number) => setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : s.length >= 2 ? [s[1], i] : [...s, i]));
  const sum = sel.reduce((a, i) => a + options[i], 0);
  const full = sel.length === 2;
  useRemoteWidget(
    () => ({
      title: 'أختار اثنين',
      info: full ? `${num(options[sel[0]])} + ${num(options[sel[1]])} = ${num(sum)} ${sum === total ? '✓' : '✗'}` : 'اختر اثنين',
      steppers: [],
      buttons: options.map((o, i) => ({ key: String(i), label: `${num(o)} ${unit}`, on: sel.includes(i) })),
    }),
    (k) => toggle(Number(k)),
    [sel],
  );
  let msg: ReactNode = 'اختر اثنين';
  if (full) msg = sum === total ? `${num(sum)} ✓ هذا هو المطلوب` : `${num(sum)} ✗ ليس ${num(total)}، جرّب غيرهما`;
  return (
    <div className="ppick">
      <div className="pp-opts">
        {options.map((o, i) => (
          <button key={i} className={'pp-opt' + (sel.includes(i) ? ' on' : '')} onClick={() => toggle(i)}>
            {num(o)} <small>{unit}</small>
          </button>
        ))}
      </div>
      <p className={'pp-msg' + (full ? (sum === total ? ' ok' : ' no') : '')}>{msg}</p>
    </div>
  );
}

/* ---------- برجا المكعبات (حقائق جمع العدد ونفسه) ---------- */

/**
 * برجان رأسيان متجاوران كما في الكتاب. الثاني يُشطب (يُطرح) عند ظهور خطوة فيها hl ‹v{k}›،
 * ويظهر مجموع البرجين فوقهما عند ‹p{k}›.
 */
export function Towers({ a, b, colors = ['#d7302a', '#f6c21c'], k = 0, size = 34, state }: { a: number; b: number; colors?: [string, string]; k?: number; size?: number; state?: 'add' | 'sub' | null }) {
  const { activeHl } = useSlide();
  // state يتقدّم على الخطوات (للمستكشف)
  const crossed = state !== undefined ? state === 'sub' : activeHl.has(`v${k}`);
  const total = state !== undefined ? state === 'add' : activeHl.has(`p${k}`) && !crossed;
  const tall = Math.max(a, b);
  const W = size * 4;
  const H = tall * size + size * 1.9;
  const col = (n: number, x: number, color: string, off: boolean) => (
    <g className={'tw' + (off ? ' off' : '')}>
      {Array.from({ length: n }, (_, i) => {
        const y = H - size * 0.9 - (i + 1) * size;
        return (
          <g key={i}>
            <rect x={x} y={y} width={size - 2} height={size - 2} rx={4} fill={color} stroke="#0005" strokeWidth={2} />
            <circle cx={x + size / 2 - 1} cy={y + size / 2 - 1} r={size * 0.16} fill="none" stroke="#0004" strokeWidth={2} />
            {off && <path d={`M${x + 4} ${y + 4} L${x + size - 6} ${y + size - 6} M${x + size - 6} ${y + 4} L${x + 4} ${y + size - 6}`} className="tw-x" />}
          </g>
        );
      })}
      <text x={x + size / 2} y={H - size * 0.15} textAnchor="middle" className="tw-num">
        {num(n)}
      </text>
    </g>
  );
  // الأول يمينًا كما يُقرأ: ٩ + ٩
  return (
    <svg className="towers" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`برجان: ${num(a)} و${num(b)}`}>
      {col(b, size * 0.6, colors[1], crossed)}
      {col(a, size * 2.4, colors[0], false)}
      <text x={W / 2} y={size * 0.75} textAnchor="middle" className={'tw-total' + (total ? ' on' : '')}>
        {num(a + b)}
      </text>
    </svg>
  );
}
