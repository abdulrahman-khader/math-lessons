import { useState, type ReactNode } from 'react';
import { num } from '../digits';
import { Blank } from './Cubes';
import { Step } from './Steps';
import { Card, type Kind } from './Layout';
import { MCQ } from './MCQ';

/* ---------- جداول القاعدة والدالة كما في الكتاب: الخانات الناقصة تمتلئ مع «الخطوة التالية» ---------- */

/** عدد ظاهر، أو خانة ناقصة تمتلئ بالعدد b */
export type RuleCell = number | string | { b: number };

const cell = (c: RuleCell) => (typeof c === 'object' ? <Blank v={c.b} box /> : typeof c === 'number' ? num(c) : c);

/** رأس القاعدة: نص ثابت، أو تظهر القاعدة نفسها خطوةً (ruleStep) */
function RuleHead({ rule, ruleStep }: { rule?: ReactNode; ruleStep?: boolean }) {
  return (
    <>
      القاعدةُ:{' '}
      {rule == null ? '…' : ruleStep ? <Step className="rulev">{rule}</Step> : rule}
    </>
  );
}

/** جدول أفقي: صف لكل تسمية (المدخلة، المخرجة) والأعمدة عن يسارها */
export function RuleTable({ rule, ruleStep = true, rows, color = '#f4a582' }: { rule?: ReactNode; ruleStep?: boolean; rows: [ReactNode, RuleCell[]][]; color?: string }) {
  return (
    <table className="data ruletbl">
      <thead>
        <tr>
          <th colSpan={rows[0][1].length + 1} style={{ background: color }}>
            <RuleHead rule={rule} ruleStep={ruleStep} />
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, cells], r) => (
          <tr key={r}>
            <th>{label}</th>
            {cells.map((c, i) => (
              <td key={i}>{cell(c)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** جدول دالة رأسي: عمود للمدخلة △ وعمود للمخرجة □، وعمود أوسط اختياري يكتب القاعدة على كل مدخلة */
export function FnTable({
  rule, ruleStep = false, title, heads = ['المُدخلةُ △', 'المُخرجةُ □'], rows, color = '#f4a582',
}: { rule?: ReactNode; ruleStep?: boolean; /** عنوان الجدول بدل سطر القاعدة */ title?: ReactNode; heads?: ReactNode[]; rows: RuleCell[][]; color?: string }) {
  return (
    <table className="data ruletbl col">
      <thead>
        <tr>
          <th colSpan={heads.length} style={{ background: color }}>
            {title ?? <RuleHead rule={rule} ruleStep={ruleStep} />}
          </th>
        </tr>
        <tr>
          {heads.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j}>{cell(c)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** آلة القاعدة: يختار الطالب مدخلة فتخرج المخرجة، والقاعدة مخفية حتى يخمّنها الصف (بعد ثلاث مدخلات) */
export function RuleMachine({ inputs, times, options, answer }: { inputs: number[]; times: number; options: string[]; answer: string }) {
  const [shown, setShown] = useState<number[]>([]);
  return (
    <div className="machine">
      <div className="row mpick">
        <b>اختر مدخلة:</b>
        {inputs.map((x) => (
          <button key={x} className="btn" disabled={shown.includes(x)} onClick={() => setShown((s) => [...s, x])}>
            {num(x)}
          </button>
        ))}
        {shown.length > 0 && (
          <button className="btn hide" onClick={() => setShown([])}>
            من جديد
          </button>
        )}
      </div>
      <div className="mbody">
        <span className="mlabel">المدخلة</span>
        <span className="mbox">؟ القاعدة</span>
        <span className="mlabel">المخرجة</span>
      </div>
      <table className="data">
        <tbody>
          <tr>
            <th>المدخلة △</th>
            {shown.map((x) => (
              <td key={x}>{num(x)}</td>
            ))}
          </tr>
          <tr>
            <th>المخرجة □</th>
            {shown.map((x) => (
              <td key={x}>{num(x * times)}</td>
            ))}
          </tr>
        </tbody>
      </table>
      {shown.length >= 3 && <MCQ q="ما القاعدة؟" options={options} answer={answer} award />}
    </div>
  );
}

/** بطاقات متتالية بينها أسهم: المدخلة ← القاعدة ← المخرجة */
export function Flow({ items }: { items: { kind: Exclude<Kind, 'ink'>; cap: string; text: ReactNode }[] }) {
  return (
    <div className="row flow">
      {items.map((it, i) => (
        <span key={i} className="flowitem">
          {i > 0 && <span className="flowarrow">←</span>}
          <Card kind={it.kind} cap={it.cap}>
            {it.text}
          </Card>
        </span>
      ))}
    </div>
  );
}

/** مثلثات من الأقلام في صف واحد */
export function PencilTriangles({ n }: { n: number }) {
  return (
    <svg viewBox={`0 0 ${n * 100 + 20} 140`} className="pentri" role="img" aria-label={`${num(n)} مثلثات من الأقلام`}>
      {Array.from({ length: n }, (_, i) => {
        const x = n * 100 - i * 100;
        return <polygon key={i} points={`${x},120 ${x - 80},120 ${x - 40},40`} fill="none" stroke="#2f3f9e" strokeWidth={9} strokeLinejoin="round" />;
      })}
    </svg>
  );
}

/** آلة الدالة كما في الكتاب: مدخلة ← قاعدة الدالة ← مخرجة */
export function FnMachine({ rule = 'قاعدةُ الدالَّةِ' }: { rule?: string }) {
  return (
    <div className="fnmach">
      <div className="fncol">
        <b className="fin">مُدخَلةٌ ▲</b>
        <span>ابدأْ بعددٍ يُسمَّى المُدخَلةَ</span>
      </div>
      <span className="farrow">←</span>
      <div className="fncol">
        <b className="fbox">{rule}</b>
        <span>أجْرِ عمليةً أوْ أكثرَ على المُدخَلةِ</span>
      </div>
      <span className="farrow">←</span>
      <div className="fncol">
        <b className="fout">مُخرَجةٌ ■</b>
        <span>العددُ الجديدُ الَّذي ينتجُ يُسمَّى المُخرَجةَ</span>
      </div>
    </div>
  );
}
