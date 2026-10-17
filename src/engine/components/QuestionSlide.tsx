import type { ReactNode } from 'react';
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
  steps: StepDef[];
  /** الرسم في العمود المقابل */
  chart: ReactNode;
  /** عناصر إضافية بعد السؤال (حقل كتابة مثلًا) */
  children?: ReactNode;
}

/** شريحة سؤال من الكتاب: السؤال، تلميح، حل بالخطوات يبرز أجزاء الرسم، وتنبيه الخطأ الشائع. */
export function QuestionSlide({ source, n, tags, intro, question, long, hint, time, tps, steps, chart, children }: Props) {
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
            <NextButton />
            {time && <TimerButton sec={time} />}
          </Ctrls>
          {hint && <Hint>{hint}</Hint>}
          <Solution>
            {steps.map((s, i) => (
              <Step key={i} hl={s.hl} kind={s.kind}>
                {s.text}
              </Step>
            ))}
          </Solution>
        </QCol>
        {chart}
      </Cols>
    </>
  );
}
