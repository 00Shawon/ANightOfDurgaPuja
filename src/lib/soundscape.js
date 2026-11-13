// Generative nocturnal ambient soundscape using Web Audio API
// Completely client-side, lightweight, zero external file dependencies
// Optional, muted by default, requires user click to start

class AmbientSoundscape {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.timerId = null;
  }

  init() {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  start() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Warm nocturnal pad drone (subtle warm fifths: A1 55Hz, E2 82.4Hz, A2 110Hz)
    const baseFreqs = [55, 82.41, 110, 164.81];
    this.oscillators = [];

    baseFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Low pass filter for soft nighttime texture
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280 + idx * 60, this.ctx.currentTime);

      const level = 0.04 / (idx + 1);
      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(level, this.ctx.currentTime + 3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.oscillators.push({ osc, gain });
    });

    // Schedule subtle resonant brass chime / temple bell harmonic every 12-18 seconds
    this.scheduleBell();

    // Fade master in gently
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 2.5);
    this.isPlaying = true;
  }

  scheduleBell() {
    if (!this.isPlaying && this.ctx && this.masterGain) {
      // Allow first bell once started
    }

    const bellFrequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (mystical pure notes)

    const trigger = () => {
      if (!this.isPlaying || !this.ctx) return;
      const freq = bellFrequencies[Math.floor(Math.random() * bellFrequencies.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 5.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 6);

      const nextDelay = 12000 + Math.random() * 8000;
      this.timerId = setTimeout(trigger, nextDelay);
    };

    const initialDelay = 5000 + Math.random() * 4000;
    this.timerId = setTimeout(trigger, initialDelay);
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return;

    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    // Fade out master smoothly
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

    setTimeout(() => {
      this.oscillators.forEach(({ osc }) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // ignore already stopped
        }
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 1300);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const soundscape = new AmbientSoundscape();
