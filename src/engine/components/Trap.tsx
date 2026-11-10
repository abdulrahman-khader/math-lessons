import type { SlideDef } from '../types';
import { Eq, SlideHead } from './Layout';
import { Step } from './Steps';

/*
 * سلسلة «ماذا تغيّر؟»: أمثلة قصيرة يتغيّر فيها شيء واحد كل مرة، وآخرها فخٌّ يكشف الغلطة المشهورة.
 * كل ضغطة: يظهر السؤال، ثم ضغطة أخرى تملأ جوابه، فيقول الصف الجواب قبل أن يظهر.
 */

export interface TrapItem {
  /** السؤال كما يُقرأ من اليمين: «٣٠ + ٤» أو جملة قصيرة */
  q: string;
  /** الجواب */
  a: string;
  /** المثال الأخير: الفخ */
  trap?: boolean;
}

/** sep: بين السؤال والجواب: «=» أو «≈» (جملة رياضية)، أو «←» (السؤال كلمات) */
export function TrapChain({ items, sep = '=' }: { items: TrapItem[]; sep?: '=' | '≈' | '←' }) {
  const math = sep !== '←';
  return (
    <div className="trapc">
      {items.map((it, i) => (
        <Step key={i}>
          <div className={'trow' + (it.trap ? ' trap' : '')}>
            {it.trap && <span className="ttag">انْتَبِهْ!</span>}
            <span className="tq">{math ? <Eq>{it.q}</Eq> : it.q}</span>
            <span className="tsep">{sep}</span>
            <span className="ta">
              <Step kind="ans">{it.a}</Step>
            </span>
          </div>
        </Step>
      ))}
    </div>
  );
}

/** شريحة «نعمل معًا» بالسلسلة */
export const trapSlide = (items: TrapItem[], notes: string, sep?: '=' | '≈' | '←', title = 'مَاذَا تَغَيَّرَ؟'): SlideDef => ({
  sec: 'elab',
  min: 3,
  notes,
  content: (
    <>
      <SlideHead tag="نعمل معًا" kind="ex">
        {title}
      </SlideHead>
      <TrapChain items={items} sep={sep} />
    </>
  ),
});
