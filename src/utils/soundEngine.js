/**
 * Web Audio API synthesizer for realistic robotic motor hums and sensor ticks.
 * Zero external audio files required!
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.motorOsc = null;
    this.motorGain = null;
    this.isMuted = true; // start muted by default, user can unmute with one click
    this.lastMotorSpeed = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Motor drone oscillator
      this.motorOsc = this.ctx.createOscillator();
      this.motorOsc.type = 'sawtooth';
      this.motorOsc.frequency.setValueAtTime(60, this.ctx.currentTime);

      // Low pass filter for motor mechanical resonance
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(280, this.ctx.currentTime);

      this.motorGain = this.ctx.createGain();
      this.motorGain.gain.setValueAtTime(0, this.ctx.currentTime);

      this.motorOsc.connect(this.filter);
      this.filter.connect(this.motorGain);
      this.motorGain.connect(this.ctx.destination);
      this.motorOsc.start();
    } catch {
      console.warn('Web Audio API not supported on this browser.');
    }
  }

  toggleMute() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.motorGain) {
      this.motorGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
    }
    return !this.isMuted;
  }

  updateMotorHum(speed) {
    if (this.isMuted || !this.ctx || !this.motorGain) return;
    const absSpeed = Math.abs(speed);
    if (absSpeed < 0.05) {
      this.motorGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
      return;
    }

    // Dynamic pitch between 70Hz and 220Hz
    const targetFreq = 70 + (absSpeed / 4) * 150;
    this.motorOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.05);
    this.motorGain.gain.setTargetAtTime(0.04, this.ctx.currentTime, 0.05);
  }

  playPinClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {}
  }

  playSuccessChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, C
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.1 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.1);
        osc.stop(this.ctx.currentTime + i * 0.1 + 0.26);
      });
    } catch {}
  }
}

export const soundEngine = new SoundEngine();
