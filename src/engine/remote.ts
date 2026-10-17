/*
 * التحكم بالدرس من الجوال.
 * الآيباد والجوال لا يتصلان مباشرة: يتبادلان رسائل صغيرة عبر خدمة ntfy.sh العامة (HTTPS فقط، فتمر من شبكات المدارس).
 * لكل آيباد «قناة» عشوائية سرية محفوظة في المتصفح: الجوال يرسل الأوامر إلى <قناة>-c، والآيباد يرسل حالته إلى <قناة>-s.
 * الرسائل لا تُخزَّن على الخادم (cache=no)، ولا تحمل إلا رقم الشريحة وعنوانها والملاحظات والنقاط.
 */

const RELAY = 'https://ntfy.sh/';
const KEY = 'remote:channel';
const ON_KEY = 'remote:on';
/** رابط الدروس المنشور: يُستعمل في رمز QR حين يُفتح الدرس من ملف محفوظ لا من الموقع */
export const PUBLIC_BASE = 'https://abdulrahman-khader.github.io/math-lessons/';
/** نسخة هذا الملف. GitHub Pages يسمح للمتصفح بإبقاء نسخة قديمة ١٠ دقائق، فيتحقق الجهازان من تطابق نسختيهما */
export const BUILD = __BUILD__;

/** أمر من الجوال إلى الآيباد */
export type RemoteCmd =
  | { c: 'hello'; v?: string }
  | { c: 'next' } // يُظهر الخطوة التالية، وإن لم تبقَ خطوات ينتقل إلى الشريحة التالية
  | { c: 'prev' }
  | { c: 'goto'; i: number }
  | { c: 'hint' }
  | { c: 'resetSlide' }
  | { c: 'score'; team: number; d: number }
  | { c: 'wheel'; open: boolean }
  | { c: 'spin' }
  | { c: 'teacher'; on: boolean }
  | { c: 'chart'; i: number; v: number }
  | { c: 'chartMode'; m: string }
  | { c: 'mcq'; k: number; o: string }
  | { c: 'mcqAward'; k: number; team: number }
  | { c: 'timer'; a: 'start'; sec: number }
  | { c: 'timer'; a: 'toggle' | 'close' };

/** سؤال اختيار من متعدد في الشريحة الحالية */
export interface RemoteMcq {
  q: string;
  options: string[];
  answer: string;
  right: boolean;
  wrong: string | null;
  /** أزرار منح النجمة ظاهرة على الآيباد */
  canAward: boolean;
}

/** رسم تفاعلي في الشريحة الحالية (يُسحب)، كما يعرضه الجوال ويعدّله */
export interface RemoteChart {
  title?: string;
  labels: string[];
  values: (number | null)[];
  editable: number[];
  min: number;
  max: number;
  step: number;
  mode: string;
  modes?: { k: string; label: string }[];
  challenges?: { text: string; done: boolean }[];
}

/** حالة الآيباد كما يعرضها الجوال */
export interface RemoteState {
  /** نسخة الآيباد */
  v?: string;
  lesson: string;
  cur: number;
  total: number;
  sec: string;
  title: string;
  notes: string;
  min: number;
  steps: [shown: number, total: number];
  hasHint: boolean;
  teams: { name: string; score: number; color: string }[];
  sections: { name: string; first: number }[];
  wheel: boolean;
  wheelResult: string;
  teacher: boolean;
  chart: RemoteChart | null;
  mcqs: RemoteMcq[];
  /** المؤقت. لا تُرسل الحالة كل ثانية: الجوال يعدّ تنازليًا وحده من آخر حالة وصلته */
  timer: { show: boolean; run: boolean; left: number };
}

type Envelope = { cmd: RemoteCmd } | { state: RemoteState };

function storage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/** حروف فقط: لا أرقام لاتينية تظهر في أي مكان، ويسهل نطقها إن احتيج */
function randomChannel() {
  const abc = 'abcdefghijkmnpqrstuvwxyz';
  const b = new Uint8Array(18);
  crypto.getRandomValues(b);
  return 'mlr' + Array.from(b, (x) => abc[x % abc.length]).join('');
}

/** قناة هذا الآيباد؛ ثابتة بين الحصص والدروس فيُقرن الجوال مرة واحدة */
export function deviceChannel(fresh = false): string {
  const s = storage();
  let ch = fresh ? null : s?.getItem(KEY);
  if (!ch || !/^mlr[a-z]{18}$/.test(ch)) {
    ch = randomChannel();
    s?.setItem(KEY, ch);
  }
  return ch;
}

export const remoteEnabled = () => storage()?.getItem(ON_KEY) === '1';
export const setRemoteEnabled = (on: boolean) => {
  try {
    if (on) storage()?.setItem(ON_KEY, '1');
    else storage()?.removeItem(ON_KEY);
  } catch {
    /* تجاهل */
  }
};

/** الرابط الذي يفتحه الجوال بعد مسح الرمز */
export function remoteUrl(channel: string, lessonId: string) {
  // ?v= يجبر الجوال على تحميل النسخة الحالية لا نسخة محفوظة
  const here = /^https?:$/.test(location.protocol) ? location.origin + location.pathname : `${PUBLIC_BASE}${lessonId}.html`;
  return `${here}?v=${BUILD}#remote=${channel}`;
}

/** قناة الجوال من الرابط، إن كان هذا جهاز التحكم */
export function channelFromHash(): string | null {
  const m = /^#remote=(mlr[a-z]{18})$/.exec(location.hash);
  return m ? m[1] : null;
}

function publish(topic: string, body: Envelope) {
  // text/plain: طلب بسيط بلا preflight
  return fetch(`${RELAY}${topic}?cache=no&firebase=no`, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'text/plain' } }).then(
    (r) => r.ok,
    () => false,
  );
}

/** يستمع إلى قناة ويعيد دالة الإيقاف. EventSource يعيد الاتصال وحده إذا انقطعت الشبكة. */
function subscribe(topic: string, onMsg: (e: Envelope) => void, onOpen: (open: boolean) => void) {
  const es = new EventSource(`${RELAY}${topic}/sse`);
  es.onopen = () => onOpen(true);
  es.onerror = () => onOpen(false);
  es.onmessage = (ev) => {
    try {
      const m = JSON.parse(ev.data);
      if (m.event === 'message' && typeof m.message === 'string') onMsg(JSON.parse(m.message));
    } catch {
      /* رسالة غريبة على القناة: تجاهل */
    }
  };
  return () => es.close();
}

/** جانب الآيباد: يستقبل الأوامر ويرسل الحالة */
export function hostLink(channel: string, onCmd: (c: RemoteCmd) => void, onOpen: (open: boolean) => void) {
  const stop = subscribe(`${channel}-c`, (e) => 'cmd' in e && onCmd(e.cmd), onOpen);
  return { stop, send: (state: RemoteState) => publish(`${channel}-s`, { state }) };
}

/** جانب الجوال: يرسل الأوامر ويستقبل الحالة */
export function remoteLink(channel: string, onState: (s: RemoteState) => void, onOpen: (open: boolean) => void) {
  const stop = subscribe(`${channel}-s`, (e) => 'state' in e && onState(e.state), onOpen);
  return { stop, send: (cmd: RemoteCmd) => publish(`${channel}-c`, { cmd }) };
}
