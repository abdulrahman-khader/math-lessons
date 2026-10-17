/*
 * التحكم بالدرس من الجوال.
 * الجوال والآيباد يتصلان مباشرة (WebRTC DataChannel)، فلا حدّ لعدد الرسائل.
 * خدمة ntfy.sh العامة لا تُستعمل إلا للتعارف (رسالتان لكل اتصال)، وبديلًا إن تعذّر الاتصال المباشر:
 * ntfy.sh المجانية تسمح بـ٢٥٠ رسالة يوميًا لكل شبكة، فلا تكفي وحدها لحصة كاملة.
 * لكل آيباد «قناة» عشوائية سرية محفوظة في المتصفح: ما يصل الآيباد على <قناة>-c، وما يصل الجوال على <قناة>-s.
 * رسائل الخادم لا تُخزَّن عليه (cache=no)، ولا تحمل إلا رقم الشريحة وعنوانها والملاحظات والنقاط.
 */

/** خادم الرسائل؛ تغيّره الاختبارات إلى خادم محلي عبر localStorage لئلا تستهلك حصة ntfy.sh */
const RELAY = (() => {
  try {
    return localStorage.getItem('remote:relay') || 'https://ntfy.sh/';
  } catch {
    return 'https://ntfy.sh/';
  }
})();
const ICE: RTCConfiguration = { iceServers: [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun.cloudflare.com:3478'] }] };
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
  /** مستكشف الحقائق المترابطة: عدد كل لون، أو الجملة المختارة (٠–٣) */
  | { c: 'family'; a?: number; b?: number; pick?: number }
  | { c: 'mcq'; k: number; o: string }
  | { c: 'mcqAward'; k: number; team: number }
  | { c: 'timer'; a: 'start'; sec: number }
  | { c: 'timer'; a: 'toggle' | 'close' }
  /** مكان المؤقت وحجمه: s الحجم، وax وay من −١ إلى ١ (٠ = الوسط) */
  | { c: 'timerView'; v: { s?: number; ax?: number; ay?: number } };

/** مستكشف الحقائق المترابطة في الشريحة الحالية */
export interface RemoteFamily {
  a: number;
  b: number;
  max: number;
  /** الجملة المختارة: ٠ و١ جمع، ٢ و٣ طرح */
  pick: number;
  colors: [string, string];
  names: [string, string];
}

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
  family?: RemoteFamily | null;
  mcqs: RemoteMcq[];
  /** المؤقت. لا تُرسل الحالة كل ثانية: الجوال يعدّ تنازليًا وحده من آخر حالة وصلته */
  timer: { show: boolean; run: boolean; left: number; view?: { s: number; ax: number; ay: number } };
}

/** وصف اتصال WebRTC يُتبادل عبر الخادم */
interface Sig {
  kind: 'offer' | 'answer';
  sdp: string;
  /** رقم المحاولة، ليتجاهل الجوال ردًّا على محاولة قديمة */
  id: string;
}
type Envelope = { cmd: RemoteCmd } | { state: RemoteState } | { sig: Sig };

/** حالة الاتصال: direct = قناة مباشرة مفتوحة، relay = الخادم متصل (للتعارف أو بديلًا) */
export interface LinkStatus {
  direct: boolean;
  relay: boolean;
  /** خادم الرسائل رفض النشر: انتهت الحصة اليومية لهذه الشبكة */
  limited: boolean;
}

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

/** ينشر رسالة ويعيد رمز HTTP (٠ إن تعذّر الاتصال) */
function publish(topic: string, body: Envelope) {
  // text/plain: طلب بسيط بلا preflight
  return fetch(`${RELAY}${topic}?cache=no&firebase=no`, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'text/plain' } }).then(
    (r) => r.status,
    () => 0,
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

/** ينتظر جمع عناوين الاتصال كلها (أو مهلة قصيرة) لنرسل الوصف في رسالة واحدة */
function gathered(pc: RTCPeerConnection, ms = 2500) {
  return new Promise<void>((done) => {
    if (pc.iceGatheringState === 'complete') return done();
    const t = setTimeout(done, ms);
    pc.addEventListener('icegatheringstatechange', () => {
      if (pc.iceGatheringState === 'complete') {
        clearTimeout(t);
        done();
      }
    });
  });
}

/**
 * طرف اتصال: الجوال يبدأ (offer)، والآيباد يجيب (answer).
 * send يرسل عبر القناة المباشرة إن كانت مفتوحة، وإلا عبر الخادم.
 */
function makeLink(role: 'host' | 'phone', channel: string, onData: (e: Envelope) => void, onStatus: (s: LinkStatus) => void) {
  const inbox = `${channel}-${role === 'host' ? 'c' : 's'}`;
  const outbox = `${channel}-${role === 'host' ? 's' : 'c'}`;
  const status: LinkStatus = { direct: false, relay: false, limited: false };
  const report = () => onStatus({ ...status });
  const post = (e: Envelope) =>
    publish(outbox, e).then((code) => {
      const limited = code === 429;
      if (limited !== status.limited) {
        status.limited = limited;
        report();
      }
      return code >= 200 && code < 300;
    });
  let pc: RTCPeerConnection | null = null;
  let dc: RTCDataChannel | null = null;
  let attempt = '';
  let retry: ReturnType<typeof setTimeout> | undefined;
  let backoff = 15000;
  let stopped = false;

  const closePc = () => {
    const old = pc;
    pc = null;
    dc = null;
    try {
      old?.close();
    } catch {
      /* تجاهل */
    }
  };
  const useChannel = (ch: RTCDataChannel) => {
    dc = ch;
    ch.onopen = () => {
      status.direct = true;
      backoff = 15000;
      report();
    };
    ch.onclose = () => {
      if (dc !== ch) return;
      status.direct = false;
      report();
      if (role === 'phone') schedule(3000);
    };
    ch.onmessage = (ev) => {
      try {
        onData(JSON.parse(ev.data));
      } catch {
        /* تجاهل */
      }
    };
  };

  /* الجوال: محاولة اتصال مباشر. إن لم تُفتح القناة خلال ١٠ ثوانٍ يُعاد بمهلة متزايدة؛ كل محاولة رسالة واحدة على الخادم */
  const schedule = (ms: number) => {
    clearTimeout(retry);
    retry = setTimeout(() => void offer().catch(() => {}), ms);
  };
  const offer = async () => {
    if (stopped || !status.relay || typeof RTCPeerConnection === 'undefined') return;
    closePc();
    const id = Math.random().toString(36).slice(2);
    attempt = id;
    const c = new RTCPeerConnection(ICE);
    pc = c;
    useChannel(c.createDataChannel('remote', { ordered: true }));
    await c.setLocalDescription(await c.createOffer());
    await gathered(c);
    if (pc !== c || stopped) return;
    post({ sig: { kind: 'offer', sdp: c.localDescription!.sdp, id } });
    retry = setTimeout(() => {
      if (!status.direct && pc === c) {
        backoff = Math.min(backoff * 2, 300000);
        schedule(backoff);
      }
    }, 10000);
  };

  /* الآيباد: يجيب كل عرض جديد، ويستبدل أي اتصال سابق */
  const answer = async (sig: Sig) => {
    closePc();
    const c = new RTCPeerConnection(ICE);
    pc = c;
    c.ondatachannel = (e) => {
      if (pc === c) useChannel(e.channel);
    };
    await c.setRemoteDescription({ type: 'offer', sdp: sig.sdp });
    await c.setLocalDescription(await c.createAnswer());
    await gathered(c);
    if (pc !== c || stopped) return;
    post({ sig: { kind: 'answer', sdp: c.localDescription!.sdp, id: sig.id } });
  };

  const stopRelay = subscribe(
    inbox,
    (e) => {
      if (!('sig' in e)) return onData(e);
      if (role === 'host' && e.sig.kind === 'offer') answer(e.sig).catch(() => {});
      else if (role === 'phone' && e.sig.kind === 'answer' && e.sig.id === attempt && pc) pc.setRemoteDescription({ type: 'answer', sdp: e.sig.sdp }).catch(() => {});
    },
    (open) => {
      const first = open && !status.relay;
      status.relay = open;
      report();
      if (first && role === 'phone' && !status.direct) schedule(0);
    },
  );

  return {
    send: (e: Envelope) => {
      if (dc?.readyState === 'open') {
        dc.send(JSON.stringify(e));
        return Promise.resolve(true);
      }
      return post(e);
    },
    direct: () => status.direct,
    stop: () => {
      stopped = true;
      clearTimeout(retry);
      stopRelay();
      closePc();
    },
  };
}

/** جانب الآيباد: يستقبل الأوامر ويرسل الحالة */
export function hostLink(channel: string, onCmd: (c: RemoteCmd) => void, onStatus: (s: LinkStatus) => void) {
  const l = makeLink('host', channel, (e) => 'cmd' in e && onCmd(e.cmd), onStatus);
  return { stop: l.stop, direct: l.direct, send: (state: RemoteState) => l.send({ state }) };
}

/** جانب الجوال: يرسل الأوامر ويستقبل الحالة */
export function remoteLink(channel: string, onState: (s: RemoteState) => void, onStatus: (s: LinkStatus) => void) {
  const l = makeLink('phone', channel, (e) => 'state' in e && onState(e.state), onStatus);
  return { stop: l.stop, direct: l.direct, send: (cmd: RemoteCmd) => l.send({ cmd }) };
}
