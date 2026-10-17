/*
 * التحكم بالدرس من الجوال.
 * الجوال والآيباد يتصلان مباشرة (WebRTC) عبر PeerJS: خادمه العام المجاني يعرّف الجهازين ببعضهما بلا حدّ يومي،
 * ثم تمر الأوامر من جهاز إلى جهاز. وإن تعذّر الاتصال المباشر في شبكة ما، يستعمل PeerJS خوادم تمرير (TURN).
 * خدمة ntfy.sh احتياط أخير فقط: لا تُستعمل إلا إن لم يتصل PeerJS، ولها حدّ ٢٥٠ رسالة يوميًا لكل شبكة.
 * لكل آيباد «قناة» عشوائية سرية محفوظة في المتصفح: معرّف الآيباد في PeerJS هو <قناة>h،
 * وفي ntfy يصل الآيباد على <قناة>-c والجوال على <قناة>-s.
 * الرسائل لا تحمل إلا رقم الشريحة وعنوانها والملاحظات والنقاط.
 */
import type { DataConnection, Peer, PeerOptions } from 'peerjs';

/**
 * PeerJS ملف مستقل بجانب الدروس (dist/peerjs.min.js) يُحمَّل عند تشغيل التحكم من الجوال فقط:
 * تشغيل شيفرته يبدأ WebRTC، وهذا يؤخر فتح الدرس ثوانيَ على بعض الأجهزة لو كان داخل ملف الدرس.
 * التحكم يحتاج الإنترنت أصلًا، فإن لم يوجد الملف بجانب درس محفوظ يُحمَّل من الموقع.
 */
type PeerLib = { Peer: typeof Peer };
let peerLib: Promise<PeerLib> | null = null;
function loadPeer(): Promise<PeerLib> {
  const w = window as unknown as { peerjs?: PeerLib };
  if (w.peerjs) return Promise.resolve(w.peerjs);
  if (peerLib) return peerLib;
  const urls = [new URL('peerjs.min.js', location.href).href, `${PUBLIC_BASE}peerjs.min.js`];
  const tryAt = (i: number): Promise<PeerLib> =>
    new Promise<PeerLib>((res, rej) => {
      const s = document.createElement('script');
      s.src = urls[i];
      s.onload = () => (w.peerjs ? res(w.peerjs) : rej(new Error('peerjs')));
      s.onerror = () => rej(new Error('peerjs'));
      document.head.appendChild(s);
    }).catch((e) => (i + 1 < urls.length ? tryAt(i + 1) : Promise.reject(e)));
  peerLib = tryAt(0).catch((e) => {
    peerLib = null;
    throw e;
  });
  return peerLib;
}

const local = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
/** خادم ntfy الاحتياطي؛ تغيّره الاختبارات إلى خادم محلي */
const RELAY = local('remote:relay') || 'https://ntfy.sh/';
/** خادم PeerJS: العام افتراضيًا، والاختبارات تشغّل خادمًا محليًا (JSON بخيارات PeerJS) */
const PEER_OPTS: PeerOptions = (() => {
  try {
    return JSON.parse(local('remote:peer') ?? '{}');
  } catch {
    return {};
  }
})();
/** سجل التشخيص: localStorage['remote:debug'] = '1' */
const DEBUG = local('remote:debug') === '1';
const log = (...a: unknown[]) => DEBUG && console.info('[remote]', ...a);
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
  /** يُخفي آخر خطوة ظاهرة، وإن لم تكن خطوة ظاهرة يعود إلى الشريحة السابقة */
  | { c: 'back' }
  | { c: 'goto'; i: number }
  | { c: 'hint' }
  | { c: 'resetSlide' }
  | { c: 'score'; team: number; d: number }
  | { c: 'wheel'; open: boolean }
  | { c: 'spin' }
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
  chart: RemoteChart | null;
  family?: RemoteFamily | null;
  mcqs: RemoteMcq[];
  /** المؤقت. لا تُرسل الحالة كل ثانية: الجوال يعدّ تنازليًا وحده من آخر حالة وصلته */
  timer: { show: boolean; run: boolean; left: number; view?: { s: number; ax: number; ay: number } };
}

type Envelope = { cmd: RemoteCmd } | { state: RemoteState };

/** حالة الاتصال: direct = قناة PeerJS مفتوحة، relay = خادم ntfy الاحتياطي متصل */
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
  es.onopen = () => {
    log('relay open', topic);
    onOpen(true);
  };
  es.onerror = () => {
    log('relay error', topic, es.readyState);
    onOpen(false);
  };
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

/**
 * طرف اتصال. الآيباد يسجّل في PeerJS بمعرّف ثابت من القناة، والجوال يتصل به.
 * send يرسل عبر القناة المباشرة إن كانت مفتوحة، وإلا عبر ntfy الاحتياطي.
 */
function makeLink(role: 'host' | 'phone', channel: string, onData: (e: Envelope) => void, onStatus: (s: LinkStatus) => void) {
  const inbox = `${channel}-${role === 'host' ? 'c' : 's'}`;
  const outbox = `${channel}-${role === 'host' ? 's' : 'c'}`;
  const hostId = `${channel}h`;
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

  let stopped = false;
  let peer: Peer | null = null;
  let conn: DataConnection | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;
  /* إعادة المحاولة: ٢ ثم ٤ ثم ٨ ثوانٍ… حتى ٣٠ ثانية. لا رسائل على ntfy في هذا كله */
  let backoff = 2000;
  const later = (fn: () => void) => {
    clearTimeout(timer);
    timer = setTimeout(() => !stopped && fn(), backoff);
    backoff = Math.min(backoff * 2, 30000);
  };
  const setDirect = (v: boolean) => {
    if (status.direct === v) return;
    status.direct = v;
    if (v) backoff = 2000;
    report();
  };

  /** قناة مفتوحة: تصبح هي قناة الإرسال، وتحل محل أي قناة سابقة */
  const adopt = (c: DataConnection) => {
    c.on('open', () => {
      log(role, 'channel open');
      if (conn && conn !== c) conn.close();
      conn = c;
      setDirect(true);
    });
    c.on('data', (d) => onData(d as Envelope));
    const lost = () => {
      if (conn !== c) return;
      log(role, 'channel closed');
      conn = null;
      setDirect(false);
      if (role === 'phone') later(dial);
    };
    c.on('close', lost);
    c.on('error', lost);
  };

  /** الجوال: يتصل بالآيباد؛ إن لم تُفتح القناة خلال ١٠ ثوانٍ يعيد المحاولة */
  const dial = () => {
    if (!peer || peer.destroyed || peer.disconnected) return;
    log('phone', 'dial', hostId);
    const c = peer.connect(hostId, { reliable: true, serialization: 'json' });
    adopt(c);
    setTimeout(() => {
      if (!c.open && !stopped && conn !== c) {
        c.close();
        later(dial);
      }
    }, 10000);
  };

  const start = async () => {
    peer?.destroy();
    const { Peer } = await loadPeer();
    if (stopped) return;
    const p = role === 'host' ? new Peer(hostId, { ...PEER_OPTS, debug: 0 }) : new Peer({ ...PEER_OPTS, debug: 0 });
    peer = p;
    p.on('open', () => {
      log(role, 'peer open');
      if (role === 'phone') dial();
    });
    if (role === 'host') p.on('connection', adopt);
    p.on('disconnected', () => {
      // انقطع الاتصال بخادم التعارف فقط؛ القنوات المفتوحة تبقى
      if (!stopped && !p.destroyed) later(() => p.reconnect());
    });
    p.on('error', (e) => {
      log(role, 'peer error', e.type);
      if (stopped) return;
      // الآيباد لم يفتح بعد: يعيد الجوال الاتصال لاحقًا
      if (e.type === 'peer-unavailable') return later(dial);
      // المعرّف ما زال محجوزًا من صفحة سابقة لحظات، أو خطأ شبكة: بداية جديدة بعد قليل
      later(() => void start());
    });
  };
  if (typeof RTCPeerConnection !== 'undefined') void start().catch((e) => log(role, 'peer load failed', e));

  const stopRelay = subscribe(
    inbox,
    (e) => onData(e),
    (open) => {
      status.relay = open;
      report();
    },
  );

  return {
    send: (e: Envelope) => {
      if (conn?.open) {
        conn.send(e);
        return Promise.resolve(true);
      }
      return post(e);
    },
    direct: () => status.direct,
    stop: () => {
      stopped = true;
      clearTimeout(timer);
      stopRelay();
      conn?.close();
      peer?.destroy();
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
