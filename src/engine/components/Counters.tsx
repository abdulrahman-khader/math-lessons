import { useSlide } from '../context';

/* ---------- قطع العدّ وأبراج العشرات: نماذج الجمع والطرح في دروس الجمل العددية ---------- */

export interface CounterGroup {
  n: number;
  label?: string;
  color?: string;
  /** وجه مبتسم بدل الدائرة الصمّاء، كما في بعض رسوم الكتاب */
  face?: boolean;
}

const DARK: Record<string, string> = { '#ffd43b': '#e0a800', '#e8372b': '#a3160d', '#4f9be0': '#1d5fa3', '#4fae3a': '#2c7a1c' };

/**
 * مجموعات من قطع العدّ؛ الأولى يمينًا كما تُقرأ الجملة. آخر crossed قطعة في آخر مجموعة عليها ×،
 * أو تُشطب عند خطوة فيها hl ‹x{k}› إن أُعطي k.
 */
export function Counters({ groups, crossed = 0, size = 46, cols, k }: { groups: CounterGroup[]; crossed?: number; size?: number; cols?: number; k?: number }) {
  const { activeHl } = useSlide();
  const cross = k === undefined || activeHl.has(`x${k}`) ? crossed : 0;
  return (
    <div className="counters">
      {groups.map((g, gi) => {
        const c = Math.min(g.n, cols ?? (g.n > 16 ? 10 : g.n > 8 ? 5 : 4));
        const rows = Math.ceil(g.n / c);
        const s = size;
        const fill = g.color ?? '#ffd43b';
        const stroke = DARK[fill] ?? '#13213b';
        return (
          <div key={gi} className="cgroup">
            <svg viewBox={`0 0 ${c * s} ${rows * s}`} style={{ width: `${(c * s) / 40}em` }} aria-hidden>
              {Array.from({ length: g.n }, (_, i) => {
                const cx = (i % c) * s + s / 2;
                const cy = Math.floor(i / c) * s + s / 2;
                const r = s * 0.42;
                const x = gi === groups.length - 1 && i >= g.n - cross;
                return (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={3} />
                    {g.face && (
                      <>
                        <circle cx={cx - r * 0.35} cy={cy - r * 0.2} r={r * 0.09} fill="#13213b" />
                        <circle cx={cx + r * 0.35} cy={cy - r * 0.2} r={r * 0.09} fill="#13213b" />
                        <path d={`M${cx - r * 0.45},${cy + r * 0.15} Q${cx},${cy + r * 0.6} ${cx + r * 0.45},${cy + r * 0.15}`} fill="none" stroke="#13213b" strokeWidth={2.5} strokeLinecap="round" />
                      </>
                    )}
                    {x && <path d={`M${cx - s * 0.3},${cy - s * 0.3} L${cx + s * 0.3},${cy + s * 0.3} M${cx + s * 0.3},${cy - s * 0.3} L${cx - s * 0.3},${cy + s * 0.3}`} stroke="#13213b" strokeWidth={5} strokeLinecap="round" />}
                  </g>
                );
              })}
            </svg>
            {g.label && <b>{g.label}</b>}
          </div>
        );
      })}
    </div>
  );
}

/**
 * مكعبات متصلة في أبراج من عشرة كما في الكتاب: n مكعبًا، يُشطب آخر crossed منها
 * (من البرج الأخير إلى الأول) عند خطوة فيها hl ‹x{k}›، أو دائمًا إن لم يُعطَ k.
 */
export function TenTowers({ n, crossed = 0, size = 30, k, color = '#f6c21c' }: { n: number; crossed?: number; size?: number; k?: number; color?: string }) {
  const { activeHl } = useSlide();
  const cross = k === undefined || activeHl.has(`x${k}`) ? crossed : 0;
  const towers = Math.ceil(n / 10);
  const gap = size * 0.6;
  const W = towers * (size + gap);
  const H = 10 * size + size * 0.4;
  return (
    <svg className="tentowers" viewBox={`0 0 ${W} ${H}`} style={{ width: `${W / 40}em` }} role="img" aria-label={`${n} مكعبًا`}>
      {Array.from({ length: n }, (_, i) => {
        // البرج الأول يمينًا، والمكعبات من الأسفل إلى الأعلى
        const t = Math.floor(i / 10);
        const j = i % 10;
        const x = W - (t + 1) * (size + gap) + gap / 2;
        const y = H - (j + 1) * size;
        const off = i >= n - cross;
        return (
          <g key={i}>
            <rect x={x} y={y} width={size - 2} height={size - 2} rx={3} fill={color} stroke="#0006" strokeWidth={2} />
            <circle cx={x + size / 2 - 1} cy={y + size / 2 - 1} r={size * 0.17} fill="none" stroke="#0004" strokeWidth={2} />
            {off && <path d={`M${x + 3} ${y + 3} L${x + size - 5} ${y + size - 5} M${x + size - 5} ${y + 3} L${x + 3} ${y + size - 5}`} stroke="#13213b" strokeWidth={3} strokeLinecap="round" />}
          </g>
        );
      })}
    </svg>
  );
}
