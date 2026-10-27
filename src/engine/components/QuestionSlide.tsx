import { Fragment, createContext, useContext, type ReactNode } from 'react';
import { num } from '../digits';
import type { HlKey } from '../types';
import { Cols, QCol, Tag, type Kind } from './Layout';
import { Ctrls, Hint, HintButton, NextButton, Solution, Step, ThinkPairShare, TimerButton } from './Steps';

export interface StepDef {
  text: ReactNode;
  hl?: readonly HlKey[];
  /** ans = الإجابة (خلفية خضراء) · warn = خطأ شائع */
  kind?: 'ans' | 'warn';
}

interface Props {
  /** مصدر السؤال كما في الكتاب: «تأكَّدْ · ص ٨٨» */
  source: string;
  /** رقم السؤال في الكتاب؛ الاختبارات تعدّ هذه الأرقام */
  n: number;
  /** وسوم إضافية مثل «تحدَّثْ» أو «أكتُبُ» */
  tags?: { kind: Kind; text: string }[];
  /** نص يسبق مجموعة أسئلة على الرسم نفسه */
  intro?: ReactNode;
  /** نص السؤال منقولًا حرفيًا من الكتاب بتشكيله */
  question: ReactNode;
  long?: boolean;
  hint?: ReactNode;
  /** ثواني مؤقت الحل الفردي */
  time?: number;
  /** يضيف أزرار فكّر – زاوج – شارك */
  tps?: boolean;
  /** خطوات الحل؛ فارغة حين يجيب الصف من بياناته هو (جدول يملؤه الطلاب) */
  steps: StepDef[];
  /** الرسم في العمود المقابل */
  chart: ReactNode;
  /** عناصر إضافية بعد السؤال (حقل كتابة مثلًا) */
  children?: ReactNode;
}

/** شكل الكتاب (الصف الثاني): السؤال برقمه كما في الصفحة، والإجابة تُكتب في فراغه */
export const BookCtx = createContext(false);

export interface BookQ {
  n: number;
  question: ReactNode;
  steps: StepDef[];
  long?: boolean;
  /** وسم بجانب السؤال كما في الكتاب، مثل «أتحدَّثُ» */
  tag?: { kind: Kind; text: string };
}

/**
 * سؤال بشكل الكتاب: مربع الرقم، ونص السؤال، وفراغ منقّط في آخره تظهر فيه الإجابة بخط كبير.
 * خطوات الطريقة (غير الإجابة) تظهر تحت السؤال قبل الإجابة.
 */
export function BookItem({ n, question, steps, long, tag, compact }: BookQ & { compact?: boolean }) {
  let ans = steps.filter((s) => s.kind === 'ans');
  let work = steps.filter((s) => s.kind !== 'ans');
  /** إجابة جملة كاملة (شرح) لا عدد: بخط أصغر من إجابات الأعداد */
  let wordy = false;
  if (compact && steps.length) {
    // في صفحة فيها عدة أسئلة: الإجابة وحدها في الفراغ كما في الكتاب، وتُبرز ما أبرزته خطوات الطريقة
    const hl = [...new Set(steps.flatMap((s) => s.hl ?? []))];
    const last = ans.length ? ans : [steps[steps.length - 1]];
    // خطوات شرح بلا إبراز (أسئلة «أتحدث») تبقى جزءًا من الإجابة
    const said = work.filter((s) => !s.hl?.length && s !== last[0]);
    ans = last.map((s, i) => ({
      ...s,
      kind: 'ans' as const,
      hl: i === 0 ? hl : s.hl,
      text: i === 0 && said.length ? <>{said.map((w, k) => <Fragment key={k}>{w.text} </Fragment>)}{s.text}</> : s.text,
    }));
    if (said.length) wordy = true;
    work = [];
  }
  return (
    <div className="bq" data-qnum={n}>
      <span className="qnum">{num(n)}</span>
      {tag && <Tag kind={tag.kind}>{tag.text}</Tag>}
      {/* الطريقة قبل الإجابة في ترتيب الصفحة (فتظهر قبلها)، وتُعرض تحت السؤال */}
      <div className="bqbody">
        {work.length > 0 && (
          <div className="bwork">
            {work.map((s, i) => (
              <Step key={i} hl={s.hl}>
                {s.text}
              </Step>
            ))}
          </div>
        )}
        <p className={'qtext' + (long ? ' long' : '')}>
          {question}
          {ans.length > 0 && (
            <>
              {' '}
              <span className={'bans' + (wordy || ans.some((a) => typeof a.text === 'string' && a.text.length > 28) ? ' wordy' : '')}>
                {ans.map((s, i) => (
                  <Step key={i} hl={s.hl} kind="ans">
                    {s.text}
                  </Step>
                ))}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

interface GroupProps {
  source: string;
  tags?: { kind: Kind; text: string }[];
  intro?: ReactNode;
  qs: BookQ[];
  hint?: ReactNode;
  time?: number;
  tps?: boolean;
  chart?: ReactNode;
  children?: ReactNode;
}

/** أسئلة متتالية من الكتاب على رسم واحد، مرتّبة كما في الصفحة؛ «التالي» يكتب الإجابات واحدة واحدة */
export function BookGroup({ source, tags, intro, qs, hint, time, tps, chart, children }: GroupProps) {
  const body = (
    <QCol>
      {intro && <p className="bintro">{intro}</p>}
      <div className={'blist' + (qs.length > 1 ? ' many' : '')} style={qs.length > 3 ? { fontSize: qs.length > 5 ? '.8em' : '.88em' } : undefined}>
        {qs.map((q) => (
          <BookItem key={q.n} {...q} compact={qs.length > 1} />
        ))}
      </div>
      {children}
      <div className="bctrl">
        <Ctrls>
          {hint && <HintButton />}
          <NextButton />
          {time && <TimerButton sec={time} />}
        </Ctrls>
        {tps && <ThinkPairShare />}
      </div>
      {hint && <Hint>{hint}</Hint>}
    </QCol>
  );
  return (
    <>
      <div className="qhead bookhead">
        <Tag kind="qs">{source}</Tag>
        {tags?.map((t, i) => (
          <Tag key={i} kind={t.kind}>
            {t.text}
          </Tag>
        ))}
      </div>
      {chart ? (
        <Cols>
          {body}
          {chart}
        </Cols>
      ) : (
        body
      )}
    </>
  );
}

/** شريحة سؤال من الكتاب: السؤال، تلميح، حل بالخطوات يبرز أجزاء الرسم، وتنبيه الخطأ الشائع. */
export function QuestionSlide({ source, n, tags, intro, question, long, hint, time, tps, steps, chart, children }: Props) {
  if (useContext(BookCtx))
    return (
      <BookGroup source={source} tags={tags} intro={intro} qs={[{ n, question, steps, long }]} hint={hint} time={time} tps={tps} chart={chart}>
        {children}
      </BookGroup>
    );
  return (
    <>
      <div className="qhead" data-qnum={n}>
        <Tag kind="qs">{source}</Tag>
        <span className="qnum">{num(n)}</span>
        {tags?.map((t, i) => (
          <Tag key={i} kind={t.kind}>
            {t.text}
          </Tag>
        ))}
      </div>
      <Cols>
        <QCol>
          {intro && <p className="intro">{intro}</p>}
          <p className={'qtext' + (long ? ' long' : '')}>{question}</p>
          {children}
          {tps && <ThinkPairShare />}
          <Ctrls>
            {hint && <HintButton />}
            {steps.length > 0 && <NextButton />}
            {time && <TimerButton sec={time} />}
          </Ctrls>
          {hint && <Hint>{hint}</Hint>}
          {steps.length > 0 && (
            <Solution>
              {steps.map((s, i) => (
                <Step key={i} hl={s.hl} kind={s.kind}>
                  {s.text}
                </Step>
              ))}
            </Solution>
          )}
        </QCol>
        {chart}
      </Cols>
    </>
  );
}
