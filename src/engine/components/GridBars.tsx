import type { ReactNode } from 'react';
import { useSlide, useV2 } from '../context';
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
  const { activeHl: allHl, nowHl } = useSlide();
  const v2 = useV2();
  // التصميم الجديد: أعمدة محايدة اللون، ولا يُبرز إلا ما تتحدث عنه الخطوة الحالية؛ الكشف التدريجي يبقى على كل الخطوات الظاهرة
  const activeHl = v2 ? nowHl : allHl;
  const fill = (b: GridBar) => (v2 ? { background: '#5b6b84' } : { background: b.color });
  const box = v2 ? undefined : { background: tone };
  const filled = (i: number) => (!reveal || allHl.has(`v${i}`) ? bars[i].n : 0);
  const ticks = Array.from({ length: max + 1 }, (_, k) => k);
  if (!vertical)
    return (
      <div className="gbars" style={box}>
        <b className="gb-title">{title}</b>
        <div className="gb-h">
          {catTitle && <span className="gb-cat">{catTitle}</span>}
          <div className="gb-grid" style={{ gridTemplateColumns: `auto repeat(${max}, 1.7em)` }}>
            {bars.map((b, i) => (
              <div key={i} className={'gb-row' + (activeHl.has(`p${i}`) ? ' on' : '')} style={{ display: 'contents' }}>
                <span className="gb-label">{b.label}</span>
                {Array.from({ length: max }, (_, j) => (
                  <span key={j} className="gb-cell" style={j < filled(i) ? fill(b) : undefined} />
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
    <div className="gbars" style={box}>
      <b className="gb-title">{title}</b>
      <div className="gb-v">
        <div className="gb-vgrid" style={{ gridTemplateColumns: `auto repeat(${bars.length}, 3.2em)` }}>
          {ticks.slice(1).reverse().map((k) => (
            <div key={k} style={{ display: 'contents' }}>
              <span className="gb-vtick">{num(k)}</span>
              {bars.map((b, i) => (
                <span key={i} className={'gb-cell' + (activeHl.has(`p${i}`) ? ' on' : '')} style={k <= filled(i) ? fill(b) : undefined} />
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
