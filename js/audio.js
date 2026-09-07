/**
 * EnchantedAudio: Web Audio API Synthesizer
 * Plays Hedwig's Theme on celesta, Patronus galloping mist, Hogwarts Express train whistle,
 * Alohomora unlock, wax cracking, quill scratches, and owl hoots.
 */
class MagicalAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.themePlaying = false;
    this.themeTimers = [];

    // Iconic Hedwig's Theme Notes & Durations (Note, duration in beats)
    // Tempo: ~140 bpm -> 1 beat ≈ 0.43s
    this.hedwigMelody = [
      { note: 493.88, dur: 0.45 }, // B4
      { note: 659.25, dur: 0.70 }, // E5
      { note: 783.99, dur: 0.25 }, // G5
      { note: 739.99, dur: 0.45 }, // F#5
      { note: 659.25, dur: 0.90 }, // E5
      { note: 987.77, dur: 0.45 }, // B5
      { note: 880.00, dur: 1.20 }, // A5
      { note: 739.99, dur: 1.20 }, // F#5
      { note: 659.25, dur: 0.70 }, // E5
      { note: 783.99, dur: 0.25 }, // G5
      { note: 739.99, dur: 0.45 }, // F#5
      { note: 622.25, dur: 0.70 }, // D#5
      { note: 698.46, dur: 0.45 }, // F5
      { note: 493.88, dur: 1.50 }  // B4
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.init();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playHedwigsTheme();
    } else {
      this.stopHedwigsTheme();
    }
    return !this.isMuted;
  }

  // Play crystalline celesta chime with bell harmonics
  playCelestaNote(freq, startTime, duration = 0.8) {
    if (this.isMuted || !this.ctx) return;
    try {
      const fundamental = this.ctx.createOscillator();
      const overtone1 = this.ctx.createOscillator();
      const overtone2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      fundamental.type = 'sine';
      fundamental.frequency.setValueAtTime(freq, startTime);

      overtone1.type = 'sine';
      overtone1.frequency.setValueAtTime(freq * 2.0, startTime); // Octave

      overtone2.type = 'sine';
      overtone2.frequency.setValueAtTime(freq * 3.01, startTime); // Bell chime shimmer

      // Celesta volume envelope (sharp attack, ringing decay)
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.22, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      fundamental.connect(gain);
      overtone1.connect(gain);
      overtone2.connect(gain);
      gain.connect(this.ctx.destination);

      fundamental.start(startTime);
      overtone1.start(startTime);
      overtone2.start(startTime);

      fundamental.stop(startTime + duration);
      overtone1.stop(startTime + duration);
      overtone2.stop(startTime + duration);
    } catch (e) {}
  }

  // Plays the authentic Hedwig's Theme on celesta
  playHedwigsTheme() {
    if (this.isMuted || !this.ctx) return;
    this.stopHedwigsTheme();
    this.themePlaying = true;

    let delay = 0;
    const now = this.ctx.currentTime + 0.1;

    this.hedwigMelody.forEach((step) => {
      const timer = setTimeout(() => {
        if (this.themePlaying && !this.isMuted) {
          this.playCelestaNote(step.note, this.ctx.currentTime, step.dur * 1.3);
        }
      }, delay * 1000);
      this.themeTimers.push(timer);
      delay += step.dur;
    });

    // Loop after finished
    const loopTimer = setTimeout(() => {
      if (this.themePlaying && !this.isMuted) {
        this.playHedwigsTheme();
      }
    }, (delay + 3) * 1000);
    this.themeTimers.push(loopTimer);
  }

  stopHedwigsTheme() {
    this.themePlaying = false;
    this.themeTimers.forEach((t) => clearTimeout(t));
    this.themeTimers = [];
  }

  // Single crystalline chime note
  playChime(freq = 587.33, duration = 0.8) {
    if (this.isMuted || !this.ctx) return;
    this.playCelestaNote(freq, this.ctx.currentTime, duration);
  }

  // Patronus galloping whoosh and ethereal choir chime
  playPatronusSpell() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // High mystical chord (Expecto Patronum)
      this.playCelestaNote(523.25, now, 2.0); // C5
      this.playCelestaNote(659.25, now + 0.1, 2.0); // E5
      this.playCelestaNote(783.99, now + 0.2, 2.2); // G5
      this.playCelestaNote(1046.50, now + 0.3, 2.5); // C6

      // Ethereal sweep
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 1.2);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.8);
    } catch (e) {}
  }

  // Alohomora unlocking mechanism click
  playAlohomora() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Double click like ancient tumbler
      this._click(now);
      this._click(now + 0.08);
      this.playCelestaNote(880, now + 0.12, 0.6);
    } catch (e) {}
  }

  _click(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(900, time);
    osc.frequency.exponentialRampToValueAtTime(200, time + 0.03);
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.03);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.03);
  }

  // Hogwarts Express distant steam train whistle
  playTrainWhistle() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Dual tone brass whistle
      const f1 = 440;
      const f2 = 554.37; // Major third C#
      [f1, f2].forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.linearRampToValueAtTime(freq * 1.05, now + 0.8);
        osc.frequency.linearRampToValueAtTime(freq * 0.98, now + 1.6);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1100;

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.8);
      });
    } catch (e) {}
  }

  // Wax seal breaking snap and crumble
  playWaxCrack() {
    if (this.isMuted || !this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.02));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      filter.Q.value = 3;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
      this.playChime(493.88, 0.4);
    } catch (e) {}
  }

  // Wand whoosh / Lumos spell
  playWandWhoosh() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    } catch (e) {}
  }

  // Quill pen ink scratch
  playQuillScratch() {
    if (this.isMuted || !this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.04;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 3500;
      const gain = this.ctx.createGain();
      gain.gain.value = 0.12;
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch (e) {}
  }

  // Gentle owl hoot
  playOwlHoot() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this._singleHoot(now, 380, 0.25);
      this._singleHoot(now + 0.35, 420, 0.38);
    } catch (e) {}
  }

  _singleHoot(startTime, baseFreq, duration) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.88, startTime + duration);
    gain.gain.setValueAtTime(0.01, startTime);
    gain.gain.linearRampToValueAtTime(0.18, startTime + duration * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }
}

window.EnchantedAudio = new MagicalAudioEngine();
