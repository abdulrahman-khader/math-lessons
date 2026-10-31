import { useContext, useEffect, useId, useLayoutEffect, useRef, type CSSProperties, type ReactNode, type Ref } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { GroupCtx, useEngine, useSlide, useV2 } from '../context';
import { sAns } from '../sound';
import { duration, num } from '../digits';
import { IconNextRtl, IconPrevRtl } from './icons';
import type { HlKey } from '../types';

/**
 * عنصر يظهر عند الضغط على «إظهار الخطوة التالية» أو المسافة.
 * الخطوات تظهر بترتيبها في الصفحة، وكل خطوة تُبرز مفاتيح `hl` في رسوم الشريحة.
 */
export function Step({ hl, kind, label, className, style, children }: { hl?: readonly HlKey[]; kind?: 'ans' | 'warn'; label?: ReactNode; className?: string; style?: CSSProperties; children: ReactNode }) {
  const v2 = useV2();
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
  // إجابة جملة طويلة: بخط أصغر من إجابة العدد القصيرة (التي تُكبَّر ليقرأها آخر الصف)
  const wordy = kind === 'ans' && typeof children === 'string' && children.length > 28;
  const cls = ['step', group ? 'sstep' : '', kind ?? '', wordy ? 'wordy' : '', shown ? 'shown' : '', className ?? ''].filter(Boolean).join(' ');
  if (v2 && kind === 'ans')
    return (
      <AnswerSlot boxRef={ref} shown={shown} label={label} className={className} style={style}>
        {children}
      </AnswerSlot>
    );
  return (
    <div ref={ref} className={cls} style={style}>
      {children}
    </div>
  );
}

/**
 * التصميم الجديد: الإجابة صندوق ظاهر من البداية («؟» بإطار متقطع)، تمتلئ بالأخضر عند كشفها بحركة نابضة وصوت قصير.
 * التسمية (مثل «الجملة العددية») لسانٌ ملتصق بأعلى الصندوق، رمادي وهو فارغ وأخضر فاتح حين يمتلئ.
 */
function AnswerSlot({ boxRef, shown, label, className, style, children }: { boxRef: Ref<HTMLDivElement>; shown: boolean; label?: ReactNode; className?: string; style?: CSSProperties; children: ReactNode }) {
  const reduce = useReducedMotion();
  const was = useRef(shown);
  useEffect(() => {
    if (shown && !was.current) sAns();
    was.current = shown;
  }, [shown]);
  // الإجابة القصيرة كبيرة جدًا، والطويلة (معادلة طويلة أو جملة) أصغر حتى تتسع
  const n = textLen(children);
  const size = n > 40 ? 'long' : n > 22 ? 'mid2' : n > 13 ? 'mid' : '';
  const box = (
    <div ref={boxRef} className={['step', 'ans', 'aslot', shown ? 'shown on' : 'off', size, className ?? ''].filter(Boolean).join(' ')} style={style}>
      {shown ? (
        <motion.span
          className="aval"
          initial={reduce ? false : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 22 }}
        >
          {children}
        </motion.span>
      ) : (
        <>
          {/* الإجابة مرسومة مخفية، فالصندوق الفارغ بحجمها تمامًا ولا يتغير شيء حين تظهر */}
          <span className="aval" aria-hidden="true">
            {children}
          </span>
          <span className="aq" aria-label="الإجابة مخفية">
            ؟
          </span>
        </>
      )}
    </div>
  );
  if (!label) return box;
  return (
    <div className="aslotrow">
      <span className="alabel">{label}</span>
      {box}
    </div>
  );
}

/** حاوية حل: لا تظهر حتى تظهر أول خطوة فيها */
export function Solution({ children }: { children: ReactNode }) {
  const gid = useId();
  const slide = useSlide();
  // التصميم الجديد: صناديق الإجابة ظاهرة من البداية، فالحل مفتوح دائمًا
  const open = useV2() || slide.isGroupOpen(gid);
  return (
    <GroupCtx.Provider value={gid}>
      <div className={'sol' + (open ? ' open' : '')}>{children}</div>
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

export function Ctrls({ children }: { children: ReactNode }) {
  return <div className="ctrls">{children}</div>;
}

/** عدد أحرف النص الظاهر في عقدة React (للإجابات المكتوبة بـ <Eq> وغيرها) */
function textLen(node: ReactNode): number {
  if (node == null || typeof node === 'boolean') return 0;
  if (typeof node === 'string' || typeof node === 'number') return String(node).length;
  if (Array.isArray(node)) return node.reduce((a: number, c) => a + textLen(c), 0);
  if (typeof node === 'object' && 'props' in node) return textLen((node.props as { children?: ReactNode }).children);
  return 0;
}
