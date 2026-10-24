// أصوات قصيرة تُولَّد بـ WebAudio، فلا ملفات صوتية تُضاف إلى الدرس.
let actx: AudioContext | null = null;
let muted = false;

export const setMuted = (m: boolean) => {
  muted = m;
};
export const isMuted = () => muted;

function tone(freqs: number[], dur = 0.12) {
  if (muted) return;
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    actx = actx ?? new Ctx();
    let t = actx.currentTime;
    for (const f of freqs) {
      const o = actx.createOscillator();
      const g = actx.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
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
