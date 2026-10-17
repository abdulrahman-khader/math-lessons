import { useContext, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { GroupCtx, useEngine, useSlide } from '../context';
import { duration, num } from '../digits';
import { IconNextRtl, IconPrevRtl } from './icons';
import type { HlKey } from '../types';

/**
 * عنصر يظهر عند الضغط على «إظهار الخطوة التالية» أو المسافة.
 * الخطوات تظهر بترتيبها في الصفحة، وكل خطوة تُبرز مفاتيح `hl` في رسوم الشريحة.
 */
export function Step({ hl, kind, className, style, children }: { hl?: readonly HlKey[]; kind?: 'ans' | 'warn'; className?: string; style?: CSSProperties; children: ReactNode }) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const slide = useSlide();
  const group = useContext(GroupCtx);
  const hlKey = (hl ?? []).join(' ');
  const { register } = slide;
  useLayoutEffect(() => register(id, { el: () => ref.current, hl: hlKey ? (hlKey.split(' ') as HlKey[]) : [], group }), [register, id, hlKey, group]);
  const shown = slide.isShown(id);
  const first = useRef(true);
  useEffect(() => {
    if (shown && !first.current) ref.current?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
    first.current = false;
  }, [shown]);
  const cls = ['step', group ? 'sstep' : '', kind ?? '', shown ? 'shown' : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <div ref={ref} className={cls} style={style}>
      {children}
    </div>
  );
}

/** حاوية حل: لا تظهر حتى تظهر أول خطوة فيها */
export function Solution({ children }: { children: ReactNode }) {
  const gid = useId();
  const slide = useSlide();
  return (
    <GroupCtx.Provider value={gid}>
      <div className={'sol' + (slide.isGroupOpen(gid) ? ' open' : '')}>{children}</div>
    </GroupCtx.Provider>
  );
}

/**
 * سهما الخطوات: السابق يُخفي آخر خطوة، والتالي يُظهر الخطوة التالية، وبينهما العدّاد.
 * يتعطل السابق قبل أول خطوة، والتالي بعد آخر خطوة. label وصفٌ للتالي (لقارئ الشاشة).
 */
export function NextButton({ label = 'الخطوة التالية' }: { label?: string }) {
  const slide = useSlide();
  const { shownCount: n, stepTotal: total } = slide;
  if (!total) return null;
  return (
    <div className="stepnav" role="group" aria-label="خطوات الحل">
      <button className="btn step-btn" aria-label="الخطوة السابقة" title="الخطوة السابقة" disabled={n === 0} onClick={() => slide.unreveal()}>
        <IconPrevRtl />
      </button>
      <span className="stepcount" aria-live="polite">
        {num(n)} / {num(total)}
      </span>
      <button className="btn step-btn" data-next aria-label={label} title={label} disabled={n >= total} onClick={() => slide.reveal()}>
        <IconNextRtl />
      </button>
    </div>
  );
}

export function HintButton() {
  const slide = useSlide();
  return (
    <button className="btn hint" onClick={slide.toggleHint} aria-expanded={slide.hintOpen}>
      تلميح
    </button>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  const slide = useSlide();
  return (
    <div className="hintbox" hidden={!slide.hintOpen}>
      {children}
    </div>
  );
}

export function TimerButton({ sec }: { sec: number }) {
  const { startTimer } = useEngine();
  return (
    <button className="btn timer" onClick={() => startTimer(sec)}>
      مؤقت {duration(sec)}
    </button>
  );
}

/** فكّر – زاوج – شارك: كل زر يشغّل مؤقته */
export function ThinkPairShare({ think = 60, pair = 60 }: { think?: number; pair?: number }) {
  const { startTimer } = useEngine();
  const [on, setOn] = useState(-1);
  const items = [
    { label: `فكّر · ${duration(think)}`, sec: think },
    { label: `زاوج · ${duration(pair)}`, sec: pair },
    { label: 'شارك', sec: 0 },
  ];
  return (
    <div className="tps">
      {items.map((it, i) => (
        <button
          key={i}
          className={on === i ? 'on' : ''}
          onClick={() => {
            setOn(i);
            if (it.sec) startTimer(it.sec);
          }}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

export function Ctrls({ children }: { children: ReactNode }) {
  return <div className="ctrls">{children}</div>;
}
