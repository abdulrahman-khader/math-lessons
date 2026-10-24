import type { ReactNode } from 'react';
import { useSlide } from '../context';

/* ---------- التمثيل بالصور كما في الكتاب: صف لكل فئة، وصورة في كل خانة، والمفتاح تحته ---------- */

export interface PicRow {
  label: ReactNode;
  /** الصورة: رمز تعبيري أو أي عنصر */
  icon: ReactNode;
  /** عدد الصور في الصف */
  n: number;
  /** لون خانة التسمية */
  color?: string;
}

/**
 * تمثيل بالصور. reveal: صور الصف i تظهر مع خطوة فيها hl ‹v{i}› (لتمثيل البيانات خطوة خطوة)،
 * وإلا تظهر كلها. الصف i يُبرز بمفتاح p{i}.
 */
export function PicGraph({ title, rows, cells, keyText, reveal, tone = '#cfe0f5' }: { title: ReactNode; rows: PicRow[]; cells?: number; keyText?: ReactNode; reveal?: boolean; tone?: string }) {
  const { activeHl } = useSlide();
  const w = cells ?? Math.max(...rows.map((r) => r.n));
  return (
    <div className="picgraph" style={{ background: tone }}>
      <b className="pg-title">{title}</b>
      <table>
        <tbody>
          {rows.map((r, i) => {
            const show = !reveal || activeHl.has(`v${i}`);
            return (
              <tr key={i} className={activeHl.has(`p${i}`) ? 'on' : undefined}>
                <th style={{ background: r.color }}>
                  <span className="pg-icon">{r.icon}</span> {r.label}
                </th>
                {Array.from({ length: w }, (_, j) => (
                  <td key={j}>{show && j < r.n && <span className="pg-icon pg-pop">{r.icon}</span>}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {keyText && <div className="pg-key">{keyText}</div>}
    </div>
  );
}
