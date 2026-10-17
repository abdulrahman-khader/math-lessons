/**
 * الأرقام في الكتاب هندية-عربية (٠–٩) بلا فاصل آلاف (٣٥٠٠).
 * التحويل يدوي ومحدد عمدًا: إعدادات اللغة في المتصفحات تختلف، أما هذا فلا يختلف.
 */
const AR = '٠١٢٣٤٥٦٧٨٩';

/** يحوّل كل رقم غربي في نص إلى رقم هندي-عربي، ويترك ما سواه. */
export const digits = (s: string | number): string => String(s).replace(/[0-9]/g, (d) => AR[+d]);

/** يكتب عددًا كما يكتبه الكتاب: ٣٥٠٠ ، ١٫٥ */
export const num = (n: number): string => digits(String(n)).replace('.', '٫');

/** ثوانٍ → ٠١:٣٠ */
export const clock = (sec: number): string =>
  digits(String(Math.floor(sec / 60)).padStart(2, '0')) + ':' + digits(String(sec % 60).padStart(2, '0'));

/** ثوانٍ → «٣٠ ث» أو «١ د» أو «١٫٥ د» */
export const duration = (sec: number): string => (sec < 60 ? `${num(sec)} ث` : `${num(sec / 60)} د`);

export const hasWesternDigits = (s: string): boolean => /[0-9]/.test(s);
