import type { ReactNode } from 'react';
import { num } from '../digits';
import { Blank } from './Cubes';
import { Step } from './Steps';

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
