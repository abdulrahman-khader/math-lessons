import { useContext, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { GroupCtx, useEngine, useSlide } from '../context';
import { duration } from '../digits';
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

export function NextButton({ label = 'إظهار الخطوة التالية' }: { label?: string }) {
  const slide = useSlide();
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      className="btn step-btn"
      data-next
      onClick={() => {
        if (!slide.reveal()) ref.current?.animate?.([{ transform: 'scale(1)' }, { transform: 'scale(.95)' }, { transform: 'scale(1)' }], { duration: 180 });
      }}
    >
      {label}
    </button>
  );
}

export function HideButton({ label = 'إخفاء الحل' }: { label?: string }) {
  const slide = useSlide();
  return (
    <button className="btn hide" onClick={slide.hideAll}>
      {label}
    </button>
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
