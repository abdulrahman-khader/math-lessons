// أصوات قصيرة تُولَّد بـ WebAudio، فلا ملفات صوتية تُضاف إلى الدرس.
let actx: AudioContext | null = null;
let muted = false;

export const setMuted = (m: boolean) => {
  muted = m;
};
export const isMuted = () => muted;

/** السياق الوحيد للصوت. المتصفح يوقفه إن أُنشئ بلا لمسة، أو بعد ترك الصفحة، فيُستأنف كل مرة */
function ctx() {
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  actx = actx ?? new Ctx();
  if (actx.state !== 'running') void actx.resume().catch(() => {});
  return actx;
}

/** يعزف الآن، أو فور استئناف السياق. وما تأخر كثيرًا يُترك، فلا تتراكم الأصوات حتى أول لمسة */
function play(fn: (ac: AudioContext) => void) {
  if (muted) return;
  try {
    const ac = ctx();
    if (ac.state === 'running') return fn(ac);
    const at = performance.now();
    void ac
      .resume()
      .then(() => {
        if (performance.now() - at < 400) fn(ac);
      })
      .catch(() => {});
  } catch {
    /* الصوت تحسين اختياري */
  }
}

/**
 * يُفتح الصوت مع كل لمسة أو ضغطة على الصفحة: ما يبدأ بعدها من الجوال أو من دوران العجلة لا لمسة معه،
 * وSafari لا يفتحه إلا داخل لمسة. والصوت الصامت القصير يفتحه على الآيباد.
 */
function unlock() {
  try {
    if (actx?.state === 'running') return;
    const ac = ctx();
    const src = ac.createBufferSource();
    src.buffer = ac.createBuffer(1, 1, 22050);
    src.connect(ac.destination);
    src.start();
  } catch {
    /* الصوت تحسين اختياري */
  }
}
if (typeof document !== 'undefined') {
  for (const e of ['pointerdown', 'pointerup', 'touchend', 'keydown']) document.addEventListener(e, unlock, { capture: true, passive: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && actx && actx.state !== 'running') void actx.resume().catch(() => {});
  });
}

function tone(freqs: number[], dur = 0.12, type: OscillatorType = 'sine', peak = 0.18) {
  play((ac) => {
    let t = ac.currentTime;
    for (const f of freqs) {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = type;
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + Math.min(0.02, dur / 3));
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(ac.destination);
      o.start(t);
      o.stop(t + dur + 0.02);
      t += dur * 0.9;
    }
  });
}

export const sGood = () => tone([660, 880], 0.13);
export const sBad = () => tone([300], 0.18);
export const sEnd = () => tone([523, 659, 784, 1046], 0.18);
/** كشف إجابة: رنّة قصيرة ناعمة، هي نفسها في كل مرة */
export const sAns = () => tone([784, 1175], 0.11);
/** نجمة لطالب: صعود سريع، ثم وتر يرنّ، ثم لمعات عالية (هو نفسه في كل نجمة) */
export function sStar() {
  play((ac) => {
    const t0 = ac.currentTime + 0.01;
    const out = ac.createGain();
    out.gain.value = 0.9;
    out.connect(ac.destination);
    const note = (f: number, at: number, dur: number, peak: number, type: OscillatorType = 'triangle') => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = type;
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(peak, at + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
      o.connect(g).connect(out);
      o.start(at);
      o.stop(at + dur + 0.05);
    };
    // صعود: دو مي صول دو
    [523, 659, 784, 1047].forEach((f, i) => note(f, t0 + i * 0.07, 0.22, 0.16));
    // الوتر يرنّ
    [523, 659, 784, 1047, 1319].forEach((f) => note(f, t0 + 0.3, 1.3, 0.07, 'sine'));
    note(262, t0 + 0.3, 1.1, 0.1, 'triangle');
    // لمعات
    [2093, 2637, 3136, 2349, 2794, 3520].forEach((f, i) => note(f, t0 + 0.42 + i * 0.09, 0.18, 0.05, 'sine'));
  });
}
/** آخر ثوانٍ في المؤقت: طقة هادئة */
export const sTick = () => tone([1200], 0.04);
/** العجلة تدور: نقرة خفيفة كلما مرّ اسم تحت السهم */
export const sClick = () => tone([1700], 0.03, 'triangle', 0.12);

/**
 * منصة نجوم الأسبوع: صوت لكل مركز يكبر كلما اقترب من الأول. الخامس والرابع رنّتان، والثالث ثلاث،
 * والثاني صعود من أربع نغمات، والأول قرع طبل سريع ثم فانفار النجمة.
 */
export function sPlace(rank: number) {
  if (rank <= 1) {
    // قرع خفيف يتسارع، ثم الفانفار
    for (let i = 0; i < 9; i++) setTimeout(() => tone([180 + i * 12], 0.05, 'triangle', 0.12), i * (70 - i * 4));
    setTimeout(sStar, 520);
    return;
  }
  if (rank === 2) return tone([587, 740, 880, 1175], 0.14, 'triangle', 0.17);
  if (rank === 3) return tone([523, 659, 784], 0.15, 'triangle', 0.16);
  return tone([440, 554], 0.16, 'triangle', 0.15);
}
