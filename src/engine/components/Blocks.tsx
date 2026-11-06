import { Children, type ReactNode } from 'react';
import { useSlide } from '../context';
import { num } from '../digits';
import type { HlKey } from '../types';
import type { Token } from './Primary';
import { Sentence } from './Primary';
import { Card, QCard, Tag, type Kind } from './Layout';
import { Counters, type CounterGroup } from './Counters';
import { Blank } from './Cubes';
import { Ctrls, NextButton, Solution, Step, TimerButton } from './Steps';

/*
 * قطع جاهزة للشرائح: الشكل كله هنا وفي ملفات التنسيق، فلا يكتب الدرس تنسيقًا ولا أسماء تنسيقات.
 * كل درس يستعملها بالشكل نفسه، وتعديلها هنا يغيّر الدروس كلها.
 */

/** خانة العملية المفقودة: الدائرة الرمادية كما في الكتاب، تمتلئ بالعملية حين تُكشف */
export const missingOp = (b: '+' | '−'): Token => ({ b, box: true });

/** نص السؤال أو التعليمات من الكتاب. inline: سطر فيه جملة عددية بين الكلمات */
export function QText({ inline, long, children }: { inline?: boolean; long?: boolean; children: ReactNode }) {
  return inline ? <div className="qtext row qinline">{children}</div> : <p className={'qtext' + (long ? ' long' : '')}>{children}</p>;
}

/** سطر تمهيد قبل مجموعة أسئلة («استعمل التمثيل المجاور…») */
export const Intro = ({ children }: { children: ReactNode }) => <p className="intro">{children}</p>;

/** كلمة من الكتاب في أول السؤال تسمّي موضوعه («تفاحٌ:») */
export const BookLabel = ({ children }: { children: ReactNode }) => <b className="blabel">{children}</b>;

/** مصدر الكتاب وحده في الصف الأول، حين لا يكون للشريحة عنوان */
export function BookSource({ children }: { children: ReactNode }) {
  return (
    <div className="row bookrow">
      <Tag kind="qs">{children}</Tag>
    </div>
  );
}

/** شبكة بطاقات متطابقة تملأ الشريحة، في عمودين أو ثلاثة */
export function Grid({ cols = 2, children }: { cols?: 1 | 2 | 3 | 4; children: ReactNode }) {
  return <div className={'qgrid ' + (['', 'one', 'two', 'three', 'four'][cols])}>{children}</div>;
}

/** مجموعة أسئلة من الكتاب تحت تعليمات واحدة: المصدر، ثم التعليمات، ثم البطاقات */
export function QuestionGroup({ source, instruction, above, cols = 2, time, children }: { source: ReactNode; instruction?: ReactNode; above?: ReactNode; cols?: 1 | 2 | 3 | 4; time?: number; children: ReactNode }) {
  return (
    <>
      <BookSource>{source}</BookSource>
      {instruction && <QText>{instruction}</QText>}
      {above}
      <Grid cols={cols}>{children}</Grid>
      <Ctrls>
        <NextButton />
        {time && <TimerButton sec={time} />}
      </Ctrls>
    </>
  );
}

/** سؤال «أكتب العملية»: الجملة على شريط أبيض، والعملية في دائرة الكتاب، ثم التحقق تحتها */
export function OpQuestion({ n, t, check }: { n: number; t: Token[]; check?: ReactNode }) {
  return (
    <QCard n={n} className="opq">
      <div className="flines">
        <div className="strip">
          <Sentence t={t} />
        </div>
        {check && (
          <Step>
            <span className="opcheck">{check}</span>
          </Step>
        )}
      </div>
    </QCard>
  );
}

export interface ChartStep {
  text: ReactNode;
  hl: HlKey[];
  ans?: boolean;
}

/**
 * سؤال في بطاقة ضمن مجموعة (غالبًا على تمثيل بجانبها): نص السؤال، ثم الحل خطوة بخطوة مع إبراز ما في التمثيل،
 * أو خيارات (children) بدل الخطوات
 */
export function ChartQuestion({ n, q, steps = [], children }: { n: number; q: ReactNode; steps?: ChartStep[]; children?: ReactNode }) {
  return (
    <QCard n={n} className="iceq">
      <div className="chartq">
        <p className="qtext">{q}</p>
        {steps.length > 0 && (
          <Solution>
            {steps.map((s, i) => (
              <Step key={i} hl={s.hl} kind={s.ans ? 'ans' : undefined}>
                {s.text}
              </Step>
            ))}
          </Solution>
        )}
        {children}
      </div>
    </QCard>
  );
}

/** سؤال «مثّل الجملة بالرسم وبالكلمات»: الجملة، ثم الرسم، ثم الكلمات، كل منها مع خطوة */
export function RepQuestion({ n, t, groups, crossed, words, size = 30 }: { n: number; t: Token[]; groups: CounterGroup[]; crossed?: number; words: string; size?: number }) {
  return (
    <QCard n={n}>
      <div className="repq">
        <Sentence t={t} />
        <Step>
          <Counters groups={groups} crossed={crossed} size={size} />
        </Step>
        <Step>
          <span className="repwords">{words}</span>
        </Step>
      </div>
    </QCard>
  );
}

/** سؤال قصير: عدد ثم سهم ثم الناتج في خانة (التقريب مثلًا) */
export function ArrowQuestion({ n, from, ans }: { n: number; from: string; ans: number }) {
  return (
    <QCard n={n}>
      <div className="row arrowq">
        <span>{from}</span>
        <span>←</span>
        <Blank v={ans} box />
      </div>
    </QCard>
  );
}

/** أمثلة القاعدة: كل مثال في بطاقة بيضاء مستقلة */
export function Examples({ children }: { children: ReactNode }) {
  return <div className="row examples">{children}</div>;
}

/** جمل عددية بعضها تحت بعض في وسط البطاقة */
export const Lines = ({ children }: { children: ReactNode }) => <div className="flines center">{children}</div>;

/** حكم بعد التجربة: «صحيحٌ» بالأخضر أو «خطأٌ» بالأحمر */
export const Verdict = ({ ok, children }: { ok: boolean; children: ReactNode }) => <b className={'verdict ' + (ok ? 'ok' : 'no')}>{children}</b>;

/** خطوتان قصيرتان في سطر واحد (عددان يُقرآن من الصورة) */
export const StepRow = ({ children }: { children: ReactNode }) => <div className="row steprow">{children}</div>;

/** تعريف القاعدة من الكتاب في بطاقة: نص أكبر قليلًا وأثقل، وفيه أمثلته */
export function Definition({ kind, children }: { kind: Exclude<Kind, 'ink'>; children: ReactNode }) {
  return (
    <Card kind={kind} className="def">
      {children}
    </Card>
  );
}

/** قائمة مرقمة لأهداف الدرس */
export function Goals({ items }: { items: ReactNode[] }) {
  return (
    <ol className="goals">
      {items.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ol>
  );
}

/** كلمات مفصولة بفواصل، بسطر واسع (كلمات تدل على العملية) */
export const WordList = ({ words }: { words: string[] }) => <b className="words">{words.join('، ')}</b>;

/** أعداد كبيرة متباعدة في سطر واحد (الأعداد التي يستعملها السؤال) */
export function NumberRow({ nums }: { nums: number[] }) {
  return (
    <div className="row numrow">
      {nums.map((n, i) => (
        <span key={i}>{num(n)}</span>
      ))}
    </div>
  );
}

/** تذكرة الخروج: كل سؤال في بطاقة بيضاء، ومستواه فوقه («١، سهل») */
export function ExitTicket({ levels = ['سهل', 'متوسط', 'صعب'], children }: { levels?: string[]; children: ReactNode }) {
  return (
    <div className="ticket">
      {Children.toArray(children).map((q, i) => (
        <Card key={i} kind="qs">
          <span className="lvl">{`${num(i + 1)}، ${levels[i]}`}</span>
          {q}
        </Card>
      ))}
    </div>
  );
}

/** خانة يكتب فيها الطالب على السبورة (عنوان، جملة) */
export const WriteBox = ({ placeholder, label }: { placeholder: string; label: string }) => <input className="inp" placeholder={placeholder} aria-label={label} />;

/** صورة كبيرة من رموز تعبيرية في وسط بطاقتها (أرغفة، أشياء تُعدّ) */
export const BigPic = ({ children }: { children: ReactNode }) => <div className="bigpic">{children}</div>;

/**
 * صورة أو بطاقة تساعد على الحل: مخفية (ومكانها محجوز) حتى يفكّر الطلاب، وتظهر مع أول خطوة في الشريحة.
 * own: الشريحة بلا خطوات أخرى، فتكون هي نفسها خطوة تظهر مع «التالي».
 */
export function ShowLater({ own, children }: { own?: boolean; children: ReactNode }) {
  const { shownCount } = useSlide();
  if (own) return <Step className="later">{children}</Step>;
  return <div className={'later' + (shownCount > 0 ? ' shown' : '')}>{children}</div>;
}
