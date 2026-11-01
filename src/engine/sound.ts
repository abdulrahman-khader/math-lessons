// أصوات قصيرة تُولَّد بـ WebAudio، فلا ملفات صوتية تُضاف إلى الدرس.
let actx: AudioContext | null = null;
let muted = false;

export const setMuted = (m: boolean) => {
  muted = m;
};
export const isMuted = () => muted;

function tone(freqs: number[], dur = 0.12, type: OscillatorType = 'sine', peak = 0.18) {
  if (muted) return;
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    actx = actx ?? new Ctx();
    let t = actx.currentTime;
    for (const f of freqs) {
      const o = actx.createOscillator();
      const g = actx.createGain();
      o.type = type;
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + Math.min(0.02, dur / 3));
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(actx.destination);
      o.start(t);
      o.stop(t + dur + 0.02);
      t += dur * 0.9;
    }
  } catch {
    /* الصوت تحسين اختياري */
  }
}

export const sGood = () => tone([660, 880], 0.13);
export const sBad = () => tone([300], 0.18);
export const sEnd = () => tone([523, 659, 784, 1046], 0.18);
/** كشف إجابة: رنّة قصيرة ناعمة، هي نفسها في كل مرة */
export const sAns = () => tone([784, 1175], 0.11);
/** نجمة لطالب: صعود سريع، ثم وتر يرنّ، ثم لمعات عالية (هو نفسه في كل نجمة) */
export function sStar() {
  if (muted) return;
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    actx = actx ?? new Ctx();
    const ac = actx;
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
  } catch {
    /* الصوت تحسين اختياري */
  }
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
