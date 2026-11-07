import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { digits, num } from '../digits';
import { useSlide } from '../context';
import { Step } from './Steps';

/* ---------- القسمة المطوّلة كما في كتاب الصف الخامس ----------
 * الكرسي كما في الكتاب: المقسوم عليه عن يسار الخط وتحته خط، والمقسوم عن يمينه وفوقه خط،
 * وإشارة الطرح عن يمين كل ناتج ضرب. الأرقام نفسها تُقرأ من اليسار كما في الكتاب.
 * أعمدة الشبكة: ١ المقسوم عليه، ثم عمود لكل رقم في المقسوم، ثم عمود الإشارة، ثم عمود الملاحظة (في أمثلة الشرح).
 */

type Piece =
  | { t: 'q'; col: number; qi: number; v: number; cur: number; first: boolean }
  | { t: 'prod'; end: number; row: number; v: number; q: number }
  | { t: 'diff'; end: number; row: number; v: number; cur: number; prod: number }
  | { t: 'down'; col: number; row: number; v: number };

/**
 * خطوات القسمة المطوّلة بالترتيب: رقم الناتج، ثم ناتج الضرب، ثم الفرق، ثم إنزال الرقم التالي.
 * col: ترتيب الرقم في المقسوم من اليسار (من ١)، والصفوف: ١ الناتج، ٢ المقسوم، ثم صفان لكل رقم في الناتج.
 */
export function divPieces(a: number, d: number): Piece[] {
  const ds = String(a).split('').map(Number);
  const n = ds.length;
  let k = 0;
  let cur = ds[0];
  while (cur < d && k < n - 1) cur = cur * 10 + ds[++k];
  const out: Piece[] = [];
  let row = 3;
  for (let i = k; i < n; i++) {
    const col = i + 1;
    const q = Math.floor(cur / d);
    const diff = cur - q * d;
    out.push(
      { t: 'q', col, qi: i - k + 1, v: q, cur, first: i === k },
      { t: 'prod', end: col, row, v: q * d, q },
      { t: 'diff', end: col, row: row + 1, v: diff, cur, prod: q * d },
    );
    if (i < n - 1) {
      out.push({ t: 'down', col: col + 1, row: row + 1, v: ds[i + 1] });
      cur = diff * 10 + ds[i + 1];
    }
    row += 2;
  }
  return out;
}

const cells = (v: number) => String(v).split('').map((c, i) => <span key={i}>{num(Number(c))}</span>);
/** عمود الشبكة لرقم المقسوم ذي الترتيب c (المقسوم عليه في العمود ١) */
const G = (c: number) => c + 1;

/**
 * القسمة المطوّلة. الناتج فوق خط المقسوم، يبدأ من فوق أكبر منزلة فيه (أول رقم من اليسار) كما تكتبه المعلمة.
 * كل ضغطة تُظهر قطعة واحدة: رقم الناتج، ثم ناتج الضرب، ثم الفرق، ثم الرقم النازل بسهمه،
 * وفي النهاية الناتج والباقي.
 * byHl: تظهر القطع مع خطوات الحل (hl: n0، n1، …) في أمثلة الشرح، ومعها ملاحظة بجانب الخطوة الحالية
 * («كمْ ٣٦ في ٣٩؟ ١»، «نضربُ ١ × ٣٦»…) كما في هوامش الكتاب، ويُبرز الجزء الذي نقسمه الآن.
 */
export function LongDiv({ a, d, byHl, noAns }: { a: number; d: number; byHl?: boolean; noAns?: boolean }) {
  const { activeHl, nowHl } = useSlide();
  const n = String(a).length;
  const pieces = divPieces(a, d);
  const q = Math.floor(a / d);
  const r = a % d;
  // أمثلة الشرح: عمود الملاحظة عن يسار المقسوم عليه، بجانب الأسهم
  const off = byHl ? 1 : 0;
  const g = (c: number) => G(c) + off;
  const sign = g(n) + 1;
  const isNow = (j: number) => byHl === true && nowHl.has(`n${j}`);
  // الجزء الذي نقسمه الآن: أول أرقام المقسوم، أو الفرق السابق والرقم النازل
  const nowQ = pieces.findIndex((p, j) => p.t === 'q' && isNow(j));
  const src = new Set<number>();
  let srcDigits = 0;
  if (nowQ >= 0) {
    const p = pieces[nowQ] as Extract<Piece, { t: 'q' }>;
    if (p.first) srcDigits = p.col;
    else {
      src.add(nowQ - 1);
      if (pieces[nowQ - 1]?.t === 'down') src.add(nowQ - 2);
    }
  }
  const part = (j: number, cls: string, style: CSSProperties, body: ReactNode) => {
    if (!byHl) return <Step key={j} className={'dv ' + cls} style={style}>{body}</Step>;
    const on = activeHl.has(`n${j}`);
    return (
      <div key={j} data-p={j} className={`dv vfix ${cls}` + (isNow(j) ? ' now' : '') + (src.has(j) ? ' src' : '')} style={{ ...style, visibility: on ? 'visible' : 'hidden' }}>
        {body}
      </div>
    );
  };
  const items = pieces.map((p, j) => {
    if (p.t === 'q') return part(j, 'dq', { gridRow: 1, gridColumn: g(p.qi) }, cells(p.v));
    if (p.t === 'down')
      return part(
        j,
        'ddown',
        { gridRow: `3 / ${p.row + 1}`, gridColumn: g(p.col) },
        <>
          <i className="darrow" />
          {cells(p.v)}
        </>,
      );
    const len = String(p.v).length;
    const start = p.end - len + 1;
    if (p.t === 'diff') return part(j, 'ddiff', { gridRow: p.row, gridColumn: `${g(start)} / ${g(p.end) + 1}` }, cells(p.v));
    return part(
      j,
      'dprod',
      { gridRow: p.row, gridColumn: `${g(start)} / ${sign + 1}` },
      <>
        <b className="dline">{cells(p.v)}</b>
        {Array.from({ length: n - p.end }, (_, i) => <span key={`s${i}`} />)}
        <span className="dminus">−</span>
      </>,
    );
  });
  // ملاحظة الخطوة الحالية بجانبها (أمثلة الشرح فقط)
  const notes = byHl
    ? pieces.map((p, j) => {
        const text =
          p.t === 'q' ? `كمْ ${num(d)} في ${num(p.cur)}؟ ${num(p.v)}` : p.t === 'prod' ? `نضربُ ${num(p.q)} × ${num(d)}` : p.t === 'diff' ? `نطرحُ ${num(p.cur)} − ${num(p.prod)}` : `نُنزِلُ ${num(p.v)}`;
        const row = p.t === 'q' ? 1 : p.row;
        return (
          <span key={`note${j}`} className={'dnote d' + p.t} style={{ gridRow: row, gridColumn: 1, visibility: isNow(j) ? 'visible' : 'hidden' }}>
            {text}
          </span>
        );
      })
    : null;
  const box = useRef<HTMLDivElement>(null);
  const arrows = useArrows(box, byHl === true, pieces, isNow);
  return (
    <div className="ldiv-wrap">
      <div ref={box} className={'ldiv' + (byHl ? ' noted' : '')} style={{ '--n': n } as CSSProperties} role="img" aria-label={`${num(a)} ÷ ${num(d)}`}>
        <div className="ddivisor" style={{ gridRow: 2, gridColumn: 1 + off }}>{num(d)}</div>
        <div className="ddividend" style={{ gridRow: 2, gridColumn: `${g(1)} / ${sign + 1}` }}>
          {String(a).split('').map((c, i) => <span key={i} className={i < srcDigits ? 'src' : undefined}>{num(Number(c))}</span>)}
          <span />
        </div>
        {items}
        {notes}
        {byHl && (
          <svg className="darrows" aria-hidden="true">
            <defs>
              {(['mul', 'put', 'div'] as const).map((k) => (
                <marker key={k} id={`dah-${k}-${a}-${d}`} className={k} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 z" />
                </marker>
              ))}
            </defs>
            {arrows.map((ar, i) => (
              <g key={i} className={'dar ' + ar.kind}>
                <path d={ar.d} markerEnd={`url(#dah-${ar.kind}-${a}-${d})`} />
                {ar.label && (
                  <>
                    <circle cx={ar.lx} cy={ar.ly} r={21} />
                    <text x={ar.lx} y={(ar.ly ?? 0) + 11} textAnchor="middle">{ar.label}</text>
                  </>
                )}
              </g>
            ))}
          </svg>
        )}
      </div>
      {!noAns && !byHl && <Step className="dans">{r ? `${num(q)} والباقي ${num(r)}` : num(q)}</Step>}
    </div>
  );
}

type Arrow = { d: string; kind: 'mul' | 'put' | 'div'; label?: string; lx?: number; ly?: number };

/**
 * أسهم الشرح في أمثلة الشرح (تُرسم فوق القسمة بحسب أماكن الأرقام فعلًا):
 * الضرب: سهم مقوّس من رقم الناتج إلى المقسوم عليه وفوقه «×»، ثم سهم من المقسوم عليه إلى مكان كتابة ناتج الضرب.
 * القسمة بعد الإنزال: سهم من المقسوم عليه إلى العدد الذي نقسمه وعليه «÷».
 */
function useArrows(box: React.RefObject<HTMLDivElement | null>, on: boolean, pieces: Piece[], isNow: (j: number) => boolean) {
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const nowKey = on ? pieces.map((_, j) => (isNow(j) ? 1 : 0)).join('') : '';
  useLayoutEffect(() => {
    const el = box.current;
    if (!on || !el) return;
    const draw = () => {
      const b = el.getBoundingClientRect();
      const s = b.width / (el.offsetWidth || 1) || 1;
      const R = (e: Element | null) => {
        if (!e) return null;
        const r = e.getBoundingClientRect();
        return { x: (r.left - b.left) / s, y: (r.top - b.top) / s, w: r.width / s, h: r.height / s };
      };
      const dv = R(el.querySelector('.ddivisor'));
      const out: Arrow[] = [];
      if (dv) {
        const dx = dv.x + dv.w / 2;
        pieces.forEach((p, j) => {
          if (!isNow(j)) return;
          if (p.t === 'prod') {
            const qd = R(el.querySelector(`[data-p="${j - 1}"]`));
            const pr = R(el.querySelector(`[data-p="${j}"] .dline`));
            if (qd) {
              const qx = qd.x + qd.w / 2;
              const top = qd.y - 54;
              out.push({ kind: 'mul', d: `M${qx} ${qd.y + 2} C${qx} ${top} ${dx} ${top} ${dx} ${dv.y + 6}`, label: '×', lx: (qx + dx) / 2, ly: top + 10 });
            }
            if (pr) {
              const y = pr.y + pr.h / 2;
              out.push({ kind: 'put', d: `M${dx} ${dv.y + dv.h + 6} Q${dx} ${y} ${pr.x - 8} ${y}` });
            }
          }
          if (p.t === 'q' && !p.first) {
            const di = pieces[j - 1]?.t === 'down' ? j - 2 : j - 1;
            const df = R(el.querySelector(`[data-p="${di}"]`));
            if (df) {
              const y = df.y + df.h / 2;
              out.push({ kind: 'div', d: `M${dx} ${dv.y + dv.h + 6} Q${dx} ${y} ${df.x - 8} ${y}`, label: '÷', lx: dx + (df.x - dx) * 0.35, ly: dv.y + dv.h + (y - dv.y - dv.h) * 0.62 });
            }
          }
        });
      }
      setArrows(out);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowKey, on]);
  return on ? arrows : [];
}

/** عدد القطع في القسمة المطوّلة (لكتابة مفاتيح الإبراز في أمثلة الشرح) */
export const divCount = (a: number, d: number) => divPieces(a, d).length;

/**
 * قسمة مطوّلة مكتوبة كاملةً كما حلّها طالب في الكتاب (لأسئلة «اكتشف الخطأ»): تُعرض كما هي بلا ضغطات.
 * rows: [النص، ترتيب آخر رقم في المقسوم، هل هو سطر طرح]. q يُكتب من فوق أول رقم في المقسوم.
 */
export function DivWork({ a, d, q, rows, name }: { a: number; d: number; q: string; rows: [string, number, boolean?][]; name?: ReactNode }) {
  const n = String(a).length;
  const sign = G(n) + 1;
  const txt = (s: string) => s.split('').map((c, i) => <span key={i}>{digits(c)}</span>);
  return (
    <div className="ldiv-wrap">
      {name && <b className="dname">{name}</b>}
      <div className="ldiv dwork" style={{ '--n': n } as CSSProperties} role="img" aria-label={`${num(a)} ÷ ${num(d)}`}>
        <div className="dv dq" style={{ gridRow: 1, gridColumn: `${G(1)} / ${G(q.length) + 1}` }}>{txt(q)}</div>
        <div className="ddivisor" style={{ gridRow: 2, gridColumn: 1 }}>{num(d)}</div>
        <div className="ddividend" style={{ gridRow: 2, gridColumn: `${G(1)} / ${sign + 1}` }}>{cells(a)}<span /></div>
        {rows.map(([s, end, prod], i) => {
          const start = end - s.length + 1;
          return prod ? (
            <div key={i} className="dv dprod" style={{ gridRow: i + 3, gridColumn: `${G(start)} / ${sign + 1}` }}>
              <b className="dline">{txt(s)}</b>
              {Array.from({ length: n - end }, (_, k) => <span key={`s${k}`} />)}
              <span className="dminus">−</span>
            </div>
          ) : (
            <div key={i} className="dv ddiff" style={{ gridRow: i + 3, gridColumn: `${G(start)} / ${G(end) + 1}` }}>{txt(s)}</div>
          );
        })}
      </div>
    </div>
  );
}
