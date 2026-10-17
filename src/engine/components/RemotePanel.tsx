import qrcode from 'qrcode-generator';
import { useMemo } from 'react';

/** رمز QR مرسوم SVG من مصفوفة الوحدات؛ لا نص فيه فلا شأن له بالاتجاه */
function Qr({ text }: { text: string }) {
  const { n, d } = useMemo(() => {
    const q = qrcode(0, 'M');
    q.addData(text);
    q.make();
    const n = q.getModuleCount();
    let d = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
    return { n, d };
  }, [text]);
  return (
    <svg className="qr" viewBox={`-2 -2 ${n + 4} ${n + 4}`} role="img" aria-label="رمز QR لربط الجوال" shapeRendering="crispEdges">
      <rect x={-2} y={-2} width={n + 4} height={n + 4} fill="#fff" />
      <path d={d} fill="#13213b" />
    </svg>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
  enabled: boolean;
  /** الاتصال بخادم الرسائل قائم */
  online: boolean;
  /** وصلت رسالة من الجوال مؤخرًا */
  phoneSeen: boolean;
  url: string;
  onEnable: (on: boolean) => void;
  onNewCode: () => void;
}

/** نافذة ربط الجوال بالآيباد */
export function RemotePanel({ open, onClose, enabled, online, phoneSeen, url, onEnable, onNewCode }: Props) {
  if (!open) return null;
  const status = !enabled ? 'التحكم من الجوال متوقف' : !online ? 'جارٍ الاتصال… تأكد من الإنترنت' : phoneSeen ? 'الجوال متصل ✓' : 'جاهز: امسح الرمز بكاميرا الجوال';
  return (
    <div className="modal show" role="dialog" aria-label="التحكم من الجوال" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mbox rpanel">
        {enabled ? <Qr text={url} /> : <div className="qr off" />}
        <div className="wside">
          <h3>التحكم من الجوال</h3>
          <p className={'rstat' + (enabled && online ? (phoneSeen ? ' ok' : ' wait') : '')}>{status}</p>
          <ol>
            <li>افتح كاميرا الجوال وامسح الرمز.</li>
            <li>افتح الرابط: يظهر على الجوال أزرار التالي والسابق والعجلة والنقاط، وملاحظات المعلم.</li>
            <li>يحتاج الآيباد والجوال إلى الإنترنت.</li>
          </ol>
          {enabled ? (
            <>
              <button className="btn hide" onClick={onNewCode}>
                رمز جديد (يفصل الجوال الحالي)
              </button>
              <button className="btn hide" onClick={() => onEnable(false)}>
                إيقاف التحكم من الجوال
              </button>
            </>
          ) : (
            <button className="btn primary" onClick={() => onEnable(true)}>
              تشغيل التحكم من الجوال
            </button>
          )}
          <button className="btn primary" onClick={onClose}>
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
