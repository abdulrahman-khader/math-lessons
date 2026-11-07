import { useLayoutEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from 'react';
import { num } from '../digits';
import { useSlide } from '../context';
import { Step } from './Steps';

/* ---------- الجمع العمودي منزلةً منزلة، مع إعادة التجميع ----------
 * فكرة إعادة التجميع كما يشرحها المعلم: يُكتب ناتج جمع المنزلة كاملًا (١٣) في المنزلة نفسها،
 * ولأن المنزلة لا تتّسع لرقمين يصعد رقم العشرات إلى أعلى المنزلة التالية بحركة واضحة.
 */

/**
 * يقيس لكل منزلة فيها حمل المسافةَ من رقم العشرات داخل الناتج الكامل إلى خانة الحمل،
 * ويضعها في متغيّري --fly-x و--fly على مجموعة المنزلة (بلا تكبير المسرح). تستعمله الجداول التي فيها حمل.
 */
export function useCarryFly(box: RefObject<HTMLElement | null>, group: string, from: string, to: string) {
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const k = el.getBoundingClientRect().width / (el.offsetWidth || 1) || 1;
      el.querySelectorAll<HTMLElement>(group).forEach((g) => {
        const a = g.querySelector(from)?.getBoundingClientRect();
        const b = g.querySelector(to)?.getBoundingClientRect();
        if (!a || !b) return;
        g.style.setProperty('--fly-x', `${(a.left + a.width / 2 - (b.left + b.width / 2)) / k}px`);
        g.style.setProperty('--fly', `${(a.top + a.height / 2 - (b.top + b.height / 2)) / k}px`);
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  });
}

const digit = (x: number, j: number) => Math.floor(x / 10 ** j) % 10;
const digits = (v: number) => String(v).split('').map((c, i) => <span key={i}>{num(Number(c))}</span>);

/**
 * الجمع العمودي: الأعداد بعضها تحت بعض، والناتج يُكتب منزلةً منزلة من اليمين.
 * كل ضغطة: ناتج المنزلة كاملًا، ثم صعود رقم العشرات إلى أعلى المنزلة التالية، ثم المنزلة التالية…
 * sync: تمتلئ مع خطوات الحل بدل الضغطات: المنزلة j (من اليمين، من ٠) ناتجها hl n{2j} وصعود حملها n{2j+1}.
 */
export function ColAdd({ nums, sync }: { nums: number[]; sync?: boolean }) {
  const { activeHl } = useSlide();
  const box = useRef<HTMLDivElement>(null);
  useCarryFly(box, '.ccol', '.cghost .cg1', '.ccar');
  const total = nums.reduce((s, x) => s + x, 0);
  const W = String(total).length;
  const L = Math.max(...nums.map((x) => String(x).length));
  const k = nums.length;
  const res = k + 3;
  const col = (j: number) => W - j;
  const piece = (key: string, cls: string, style: CSSProperties, body: ReactNode) =>
    sync ? (
      <div className={`cpiece ${cls}` + (activeHl.has(key) ? ' shown' : '')} style={style}>{body}</div>
    ) : (
      <Step className={`cpiece ${cls}`} style={style}>{body}</Step>
    );
  let carry = 0;
  const cols: ReactNode[] = [];
  for (let j = 0; j < L; j++) {
    const s = nums.reduce((a, x) => a + digit(x, j), 0) + carry;
    const last = j === L - 1;
    const up = !last && s >= 10;
    cols.push(
      <span key={j} className="ccol">
        {last && s >= 10
          ? piece(`n${2 * j}`, 'cres', { gridRow: res, gridColumn: `${col(j + 1)} / ${col(j) + 1}` }, digits(s))
          : piece(`n${2 * j}`, 'cres', { gridRow: res, gridColumn: col(j) }, digits(s % 10))}
        {up && (
          <>
            <span className="cghost" style={{ gridRow: res, gridColumn: col(j) }} aria-hidden="true">
              <b className="cg1">{num(Math.floor(s / 10))}</b>
              <b>{num(s % 10)}</b>
            </span>
            {piece(`n${2 * j + 1}`, 'ccar', { gridRow: 1, gridColumn: col(j + 1) }, num(Math.floor(s / 10)))}
          </>
        )}
      </span>,
    );
    carry = Math.floor(s / 10);
  }
  return (
    <div ref={box} className="cadd" style={{ '--w': W } as CSSProperties} role="img" aria-label={nums.map((x) => num(x)).join(' + ')}>
      <span className="crow" style={{ gridRow: 1, gridColumn: 1 }} />
      {nums.map((x, m) =>
        String(x)
          .split('')
          .reverse()
          .map((c, j) => (
            <span key={`${m}-${j}`} className="cd" style={{ gridRow: m + 2, gridColumn: col(j) }}>
              {num(Number(c))}
            </span>
          )),
      )}
      <span className="cop" style={{ gridRow: k + 1, gridColumn: W + 1 }}>+</span>
      <i className="cline" style={{ gridRow: k + 2 }} />
      {cols}
    </div>
  );
}
