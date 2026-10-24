import type { ReactNode } from 'react';
import { useSlide } from '../context';
import { num } from '../digits';

/* ---------- التمثيل بالأعمدة للصف الثاني: مربع ملوّن لكل استجابة كما في الكتاب ---------- */

export interface GridBar {
  label: ReactNode;
  n: number;
  color: string;
}

/**
 * أعمدة من مربعات. أفقي: التسمية يمينًا والمربعات تمتد يسارًا والأعداد تحتها.
 * رأسي: الأعمدة تصعد والأعداد على الجانب. reveal: مربعات العمود i تُلوَّن مع خطوة فيها hl ‹v{i}›،
 * والعمود i يُبرز بمفتاح p{i}.
 */
export function GridBars({ title, bars, max, vertical, catTitle, valTitle, reveal, tone = '#cfe0f5' }: {
  title: ReactNode; bars: GridBar[]; max: number; vertical?: boolean; catTitle?: ReactNode; valTitle?: ReactNode; reveal?: boolean; tone?: string;
}) {
  const { activeHl } = useSlide();
  const filled = (i: number) => (!reveal || activeHl.has(`v${i}`) ? bars[i].n : 0);
  const ticks = Array.from({ length: max + 1 }, (_, k) => k);
  if (!vertical)
    return (
      <div className="gbars" style={{ background: tone }}>
        <b className="gb-title">{title}</b>
        <div className="gb-h">
          {catTitle && <span className="gb-cat">{catTitle}</span>}
          <div className="gb-grid" style={{ gridTemplateColumns: `auto repeat(${max}, 1.7em)` }}>
            {bars.map((b, i) => (
              <div key={i} className={'gb-row' + (activeHl.has(`p${i}`) ? ' on' : '')} style={{ display: 'contents' }}>
                <span className="gb-label">{b.label}</span>
                {Array.from({ length: max }, (_, j) => (
                  <span key={j} className="gb-cell" style={j < filled(i) ? { background: b.color } : undefined} />
                ))}
              </div>
            ))}
            <span />
            {Array.from({ length: max }, (_, j) => (
              <span key={j} className="gb-tick">
                {j === 0 && <i className="gb-t0">{num(0)}</i>}
                <i>{num(j + 1)}</i>
              </span>
            ))}
          </div>
        </div>
        {valTitle && <span className="gb-val">{valTitle}</span>}
      </div>
    );
  return (
    <div className="gbars" style={{ background: tone }}>
      <b className="gb-title">{title}</b>
      <div className="gb-v">
        <div className="gb-vgrid" style={{ gridTemplateColumns: `auto repeat(${bars.length}, 3.2em)` }}>
          {ticks.slice(1).reverse().map((k) => (
            <div key={k} style={{ display: 'contents' }}>
              <span className="gb-vtick">{num(k)}</span>
              {bars.map((b, i) => (
                <span key={i} className={'gb-cell' + (activeHl.has(`p${i}`) ? ' on' : '')} style={k <= filled(i) ? { background: b.color } : undefined} />
              ))}
            </div>
          ))}
          <span className="gb-vtick">{num(0)}</span>
          {bars.map((b, i) => (
            <span key={i} className="gb-vlabel">{b.label}</span>
          ))}
        </div>
        {valTitle && <span className="gb-vval">{valTitle}</span>}
      </div>
      {catTitle && <span className="gb-val">{catTitle}</span>}
    </div>
  );
}
