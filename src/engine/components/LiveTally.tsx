import { useEffect, useState, type ReactNode } from 'react';
import { num } from '../digits';
import { Tally } from './DataViz';
import { useRemoteWidget } from './Primary';

/*
 * جدول إشارات فارغ كما في الكتاب يملؤه الصف بنفسه: كل ضغطة على + تضيف إشارة.
 * لا بيانات من عندنا: الطلاب يجمعون الإجابات (أو يجرّبون السحب) والمعلم يسجّلها هنا أو من الجوال.
 * الجداول بالمعرّف نفسه (id) تتشارك الإشارات بين الشرائح، وتبقى بعد إغلاق الدرس حتى «امسح الإشارات».
 */

const EVENT = 'live-tally';
const storeKey = (id: string) => `tally:${id}`;

function read(id: string, len: number): number[] {
  try {
    const v = JSON.parse(localStorage.getItem(storeKey(id)) ?? '[]');
    if (Array.isArray(v)) return Array.from({ length: len }, (_, i) => Math.max(0, Number(v[i]) || 0));
  } catch {
    /* تخزين غير متاح */
  }
  return Array(len).fill(0);
}

function write(id: string, v: number[]) {
  try {
    localStorage.setItem(storeKey(id), JSON.stringify(v));
  } catch {
    /* تخزين غير متاح: تبقى الإشارات في هذه الشريحة فقط */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { id, v } }));
}

/** إشارات جدول مشترك بين كل الشرائح التي تعرضه */
function useTallies(id: string, len: number) {
  const [v, setV] = useState(() => read(id, len));
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ id: string; v: number[] }>).detail;
      if (d.id === id) setV(d.v);
    };
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, [id]);
  const set = (next: number[]) => {
    setV(next);
    write(id, next);
  };
  return [v, set] as const;
}

/**
 * إجابة تُحسب من جدول يملؤه الصف: تتغير كلما تغيّرت الإشارات.
 * f تأخذ الإشارات بترتيب الصفوف؛ قبل أي إشارة تظهر «أجمع البيانات أولًا».
 */
export function TallyAnswer({ id, rows, f }: { id: string; rows: number; f: (v: number[]) => ReactNode }) {
  const [v] = useTallies(id, rows);
  if (!v.some((x) => x > 0)) return <>نجمعُ البياناتِ أولًا.</>;
  return <>{f(v)}</>;
}

/** أسماء الصفوف التي فيها أكثر (أو أقل) الإشارات: «الصيف» أو «الصيف والشتاء» عند التساوي */
export function pickRows(v: number[], names: string[], most = true) {
  const best = most ? Math.max(...v) : Math.min(...v);
  const ns = names.filter((_, i) => v[i] === best);
  return { names: ns.length > 1 ? ns.slice(0, -1).join('، ') + ' و' + ns[ns.length - 1] : ns[0], n: best, tie: ns.length > 1, count: ns.length };
}

export interface LiveRow {
  /** اسم الصف كما في الكتاب (يظهر في الجوال أيضًا) */
  name: string;
  /** ما يظهر في خلية الاسم إن اختلف عن الاسم (صورة أو مكعب ملوّن) */
  label?: ReactNode;
}

interface Props {
  /** معرّف فريد في الدرس، مثل ‹g2-4-1-seasons›؛ الجداول بالمعرّف نفسه تتشارك الإشارات */
  id: string;
  /** عنوان العمود الأول كما في الكتاب */
  head: string;
  rows: LiveRow[];
  /** عمود «العدد» كما في الكتاب */
  count?: boolean;
  tone?: 'green' | 'blue' | 'orange' | 'salmon';
  /** اسم الأداة في الجوال */
  title?: string;
}

export function LiveTally({ id, head, rows, count = true, tone = 'green', title = 'جدول الإشارات' }: Props) {
  const [v, set] = useTallies(id, rows.length);
  const add = (i: number, d: number) => set(v.map((x, j) => (j === i ? Math.max(0, x + d) : x)));
  const total = v.reduce((a, b) => a + b, 0);
  useRemoteWidget(
    () => ({
      title,
      info: `عدد الإشارات كلها: ${num(total)}`,
      steppers: rows.map((r, i) => ({ key: `r${i}`, label: r.name, value: v[i], min: 0, max: 99 })),
      buttons: [{ key: 'clear', label: 'امسح الإشارات', disabled: total === 0 }],
    }),
    (k, n) => {
      if (k === 'clear') set(v.map(() => 0));
      else if (k.startsWith('r') && n !== undefined) set(v.map((x, j) => (j === Number(k.slice(1)) ? Math.max(0, n) : x)));
    },
    [v.join(), total],
  );
  return (
    <div className="ltally">
      <table className={`dgrid ${tone}`}>
        <thead>
          <tr>
            <th>{head}</th>
            <th>الإِشَارَاتُ</th>
            {count && <th>الْعَدَدُ</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.name}>
              <td>
                <span className="ltname">
                  <button className="ltbtn" aria-label={`أضف إشارة إلى ${r.name}`} onClick={() => add(i, 1)}>
                    +
                  </button>
                  <span>{r.label ?? r.name}</span>
                  <button className="ltbtn minus" aria-label={`احذف إشارة من ${r.name}`} disabled={!v[i]} onClick={() => add(i, -1)}>
                    −
                  </button>
                </span>
              </td>
              <td className="ltmarks">{v[i] > 0 && <Tally n={v[i]} />}</td>
              {count && <td>{v[i] > 0 ? num(v[i]) : ''}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="ltfoot">
        <b>عدد الإشارات كلها: {num(total)}</b>
        <button className="btn hide" disabled={!total} onClick={() => set(v.map(() => 0))}>
          امسح الإشارات
        </button>
      </div>
    </div>
  );
}
