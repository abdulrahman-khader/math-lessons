import type { CSSProperties, ReactNode } from 'react';
import { useEngine } from '../context';
import { num } from '../digits';

/** لون ثابت لكل نوع محتوى: القاعدة أزرق، المثال أخضر، التنبيه برتقالي، السؤال بنفسجي */
export type Kind = 'rule' | 'ex' | 'warn' | 'qs' | 'ink';

export const Tag = ({ kind, children }: { kind: Kind; children: ReactNode }) => <span className={`tag ${kind}`}>{children}</span>;

/** رأس الشريحة: وسم ثم عنوان */
export function SlideHead({ tag, kind, children }: { tag?: ReactNode; kind?: Kind; children: ReactNode }) {
  return (
    <div className="row">
      {tag && <Tag kind={kind ?? 'ink'}>{tag}</Tag>}
      <h2>{children}</h2>
    </div>
  );
}

export function Cols({ even, style, className, children }: { even?: boolean; style?: CSSProperties; className?: string; children: ReactNode }) {
  return (
    <div className={['cols', even ? 'even' : '', className ?? ''].filter(Boolean).join(' ')} style={style}>
      {children}
    </div>
  );
}

export const Stack = ({ gap = '.5em', children }: { gap?: string; children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>
);

export const QCol = ({ style, children }: { style?: CSSProperties; children: ReactNode }) => (
  <div className="qcol" style={style}>
    {children}
  </div>
);

export function Card({ kind, cap, style, className, children }: { kind: Exclude<Kind, 'ink'>; cap?: ReactNode; style?: CSSProperties; className?: string; children: ReactNode }) {
  return (
    <div className={`card ${kind} ${className ?? ''}`} style={style}>
      {cap && <span className="cap">{cap}</span>}
      {children}
    </div>
  );
}

export const Mark = ({ children }: { children: ReactNode }) => <mark>{children}</mark>;

/** معادلة: تُعزل اتجاهيًا فتُقرأ من اليمين كما في الكتاب: ١٥٠ − ١٢٥ = ٢٥ */
export const Eq = ({ children }: { children: ReactNode }) => <span className="eq">{children}</span>;

/** جدول بيانات بصفوف أفقية؛ الخلية الأولى في كل صف عنوان */
export function DataTable({ rows }: { rows: (string | number)[][] }) {
  return (
    <table className="data">
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => {
              const t = typeof c === 'number' ? num(c) : c;
              return j === 0 ? <th key={j}>{t}</th> : <td key={j}>{t}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** خريطة ذهنية: مركز وأربعة فروع */
export function MindMap({ center, items }: { center: ReactNode; items: [MindItem, MindItem, MindItem, MindItem] }) {
  const pos = [
    { gridColumn: 1, gridRow: 1 },
    { gridColumn: 3, gridRow: 1 },
    { gridColumn: 1, gridRow: 3 },
    { gridColumn: 3, gridRow: 3 },
  ];
  return (
    <div className="mind">
      <svg className="links" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M150 50 L50 14 M150 50 L250 14 M150 50 L50 86 M150 50 L250 86" stroke="#9fb0c8" strokeWidth=".8" fill="none" />
      </svg>
      {items.slice(0, 2).map((it, i) => (
        <Card key={i} kind={it.kind} cap={it.cap} style={pos[i]}>
          {it.text}
        </Card>
      ))}
      <div className="ctr">{center}</div>
      {items.slice(2).map((it, i) => (
        <Card key={i + 2} kind={it.kind} cap={it.cap} style={pos[i + 2]}>
          {it.text}
        </Card>
      ))}
    </div>
  );
}
interface MindItem {
  kind: Exclude<Kind, 'ink'>;
  cap: string;
  text: ReactNode;
}

/** بطاقة نتيجة الفرق: الفائز أو التعادل. لا تظهر إذا اختار المعلم «بدون» فرق. */
export function Winner({ cap = 'نتيجة الفرق اليوم' }: { cap?: string }) {
  const { scores, teamNames, nTeams } = useEngine();
  if (nTeams === 0) return null;
  const sc = scores.slice(0, nTeams);
  const mx = Math.max(...sc);
  let text = 'لم تُسجَّل نقاط بعد';
  if (mx > 0) {
    const ws = teamNames.filter((_, i) => i < nTeams && sc[i] === mx);
    text = (ws.length > 1 ? 'تعادل: ' : 'الفائز: ') + ws.join(' و') + ` (${num(mx)} ★)`;
  }
  return (
    <Card kind="rule" cap={cap}>
      <div id="winner" style={{ fontFamily: 'var(--display)', fontSize: '1.4em', fontWeight: 800 }}>
        {text}
      </div>
    </Card>
  );
}

/** يعرض محتواه فقط إن كانت في الحصة فرق (أو فقط إن لم تكن، مع none) */
export function IfTeams({ none = false, children }: { none?: boolean; children: ReactNode }) {
  const { nTeams } = useEngine();
  return (nTeams > 0) !== none ? <>{children}</> : null;
}

export function GoHomeButton() {
  const { goto } = useEngine();
  return (
    <button className="btn primary" onClick={() => goto(0)}>
      العودة إلى الصفحة الرئيسية
    </button>
  );
}
