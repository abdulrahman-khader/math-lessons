import { Card } from './Layout';

/*
 * رسوم لاستقصاء حل المسألة: إشارات في مجموعات، والميزان، والسياج، وبطاقة قائمة نقطية، وبطاقات ألوان.
 */

/** إشارات العدّ في مجموعات من ٥، والملوّن منها يمثل البذور التي أنبتت */
export function TallyGroups({ groups = 6, green = 3, showGreen = false }: { groups?: number; green?: number; showGreen?: boolean }) {
  return (
    <svg viewBox={`0 0 ${groups * 110} 120`} className="tallygroups" role="img" aria-label={`${groups} مجموعات من ٥ إشارات`}>
      {Array.from({ length: groups }, (_, g) =>
        Array.from({ length: 5 }, (_, i) => {
          // المجموعة الأولى يمينًا، والإشارات الخضراء أولًا من اليمين
          const x = groups * 110 - 20 - g * 110 - i * 16;
          const on = showGreen && i < green;
          return <line key={`${g}-${i}`} x1={x} x2={x - 4} y1={20} y2={100} stroke={on ? '#1b9e4b' : '#8a8f99'} strokeWidth={8} strokeLinecap="round" />;
        }),
      )}
    </svg>
  );
}

/** ميزان السؤال ٣: الأوزان ٨ كجم في الكفة اليسرى، والجبن ٢ كجم في اليمنى */
export const BalanceScale = () => (
  <svg viewBox="0 0 460 300" className="pic22" role="img" aria-label="ميزان: ٨ كجم في الكفة اليسرى، و٢ كجم جبن في الكفة اليمنى">
    <rect x={220} y={60} width={20} height={200} fill="#e0b31a" />
    <rect x={160} y={255} width={140} height={22} rx={8} fill="#e0b31a" />
    <line x1={60} y1={110} x2={400} y2={50} stroke="#e0b31a" strokeWidth={12} strokeLinecap="round" />
    <path d="M10,200 L110,200 Q60,235 10,200 Z" fill="#e0b31a" />
    <line x1={60} y1={110} x2={20} y2={200} stroke="#a07d10" strokeWidth={2} /><line x1={60} y1={110} x2={100} y2={200} stroke="#a07d10" strokeWidth={2} />
    <rect x={25} y={150} width={30} height={50} rx={4} fill="#9aa3ad" stroke="#13213b" strokeWidth={2} />
    <rect x={60} y={165} width={25} height={35} rx={4} fill="#9aa3ad" stroke="#13213b" strokeWidth={2} />
    <text x={60} y={235} fontSize={22} fontWeight={800} textAnchor="middle" fill="#13213b">٨ كجم</text>
    <path d="M350,140 L450,140 Q400,175 350,140 Z" fill="#e0b31a" />
    <line x1={400} y1={50} x2={360} y2={140} stroke="#a07d10" strokeWidth={2} /><line x1={400} y1={50} x2={440} y2={140} stroke="#a07d10" strokeWidth={2} />
    <rect x={370} y={110} width={60} height={30} rx={4} fill="#f6d84a" stroke="#13213b" strokeWidth={2} />
    <text x={400} y={130} fontSize={16} fontWeight={800} textAnchor="middle" fill="#13213b">جبن</text>
    <text x={400} y={175} fontSize={22} fontWeight={800} textAnchor="middle" fill="#13213b">٢ كجم</text>
  </svg>
);

/** السياج: مستطيل ٨ أمتار في ٣ أمتار */
export const FenceRect = () => (
  <svg viewBox="0 0 480 220" className="pic20" role="img" aria-label="حديقة مستطيلة طولها ٨ أمتار وعرضها ٣ أمتار">
    <rect x={20} y={20} width={320} height={120} fill="#66c28b" stroke="#13213b" strokeWidth={5} />
    <line x1={20} y1={175} x2={340} y2={175} stroke="#13213b" strokeWidth={3} />
    <text x={180} y={205} fontSize={24} fontWeight={800} textAnchor="middle" fill="#13213b">٨ أمتار</text>
    <line x1={370} y1={20} x2={370} y2={140} stroke="#13213b" strokeWidth={3} />
    <text x={420} y={88} fontSize={22} fontWeight={800} textAnchor="middle" fill="#13213b">٣ أمتار</text>
  </svg>
);


/** بطاقة فيها قائمة نقطية */
export function BulletCard({ cap, items, kind = 'ex' }: { cap: string; items: string[]; kind?: 'ex' | 'rule' | 'qs' | 'warn' }) {
  return (
    <Card kind={kind} cap={cap}>
      <ul className="bullets">
        {items.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </Card>
  );
}

/** مستطيلات ملوّنة (ملفات، بطاقات) في صف */
export function ColorChips({ colors }: { colors: string[] }) {
  return (
    <div className="row chips">
      {colors.map((c) => (
        <span key={c} style={{ background: c }} />
      ))}
    </div>
  );
}
