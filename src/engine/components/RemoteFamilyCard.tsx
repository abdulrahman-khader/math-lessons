import { num } from '../digits';
import type { RemoteFamily } from '../remote';

/**
 * مستكشف الحقائق المترابطة على الجوال: عدد كل لون، والجمل الأربع.
 * الضغط على جملة طرح يأخذ الجزء المطروح على الآيباد، كما لو ضُغطت هناك.
 */
export function RemoteFamilyCard({ f, send }: { f: RemoteFamily; send: (v: { a?: number; b?: number; pick?: number }) => void }) {
  const c = f.a + f.b;
  const [A, B] = f.colors;
  const n = (v: number, color: string) => <b style={{ color }}>{num(v)}</b>;
  const facts = [
    <>{n(f.a, A)} + {n(f.b, B)} = {num(c)}</>,
    <>{n(f.b, B)} + {n(f.a, A)} = {num(c)}</>,
    <>{num(c)} − {n(f.b, B)} = {n(f.a, A)}</>,
    <>{num(c)} − {n(f.a, A)} = {n(f.b, B)}</>,
  ];
  // الجزء المأخوذ: الجملة ٢ تطرح الصفراء، والجملة ٣ تطرح الخضراء
  const gone = f.pick === 2 ? 1 : f.pick === 3 ? 0 : -1;
  const row = (count: number, color: string, part: number) =>
    Array.from({ length: count }, (_, k) => <i key={`${part}-${k}`} className={gone === part ? 'off' : ''} style={{ background: color }} />);
  const stepper = (label: string, color: string, v: number, key: 'a' | 'b') => (
    <div className="rval" style={{ borderColor: color }}>
      <span style={{ color }}>{label}</span>
      <button aria-label={`إنقاص ${label}`} disabled={v <= 1} onClick={() => send({ [key]: v - 1 })}>
        −
      </button>
      <b>{num(v)}</b>
      <button aria-label={`زيادة ${label}`} disabled={v >= f.max} onClick={() => send({ [key]: v + 1 })}>
        +
      </button>
    </div>
  );
  return (
    <section className="rcard rfamily">
      <h2>عائلة الحقائق</h2>
      {/* الصف من اليمين: الخضراء أولًا كما على الآيباد */}
      <div className="rcubes" aria-label={`مكعبات: ${num(f.a)} و${num(f.b)}`}>
        {row(f.a, A, 0)}
        <span className="rgap" />
        {row(f.b, B, 1)}
      </div>
      <div className="rvals">
        {stepper(f.names[0], A, f.a, 'a')}
        {stepper(f.names[1], B, f.b, 'b')}
      </div>
      <div className="rfacts">
        {facts.map((eq, i) => (
          <button key={i} className={'rfact' + (f.pick === i ? ' on' : '') + (i < 2 ? ' add' : ' sub')} onClick={() => send({ pick: i })}>
            <span className="eq">{eq}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
