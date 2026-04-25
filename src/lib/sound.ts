"use client";

// Web Audio API 기반의 효과음 합성 엔진
export class AudioSystem {
    private ctx: AudioContext | null = null;
    private droneOsc: OscillatorNode | null = null;
    private droneGain: GainNode | null = null;

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    private playTone(freq: number, type: OscillatorType, duration: number, vol = 0.1) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playTap() {
        this.init();
        this.playTone(800, 'sine', 0.1, 0.05);
    }

    playSuccess() {
        this.init();
        this.playTone(440, 'sine', 0.1, 0.1);
        setTimeout(() => this.playTone(554, 'sine', 0.1, 0.1), 100);
        setTimeout(() => this.playTone(659, 'sine', 0.2, 0.1), 200);
    }

    playError() {
        this.init();
        this.playTone(300, 'square', 0.2, 0.1);
        setTimeout(() => this.playTone(250, 'square', 0.3, 0.1), 150);
    }

    playEngineHum() {
        this.init();
        // Simple low rumble
        this.playTone(60, 'square', 2.0, 0.05);
    }

    startMeditationDrone() {
        this.init();
        if (!this.ctx || this.droneOsc) return;

        this.droneOsc = this.ctx.createOscillator();
        this.droneGain = this.ctx.createGain();

        this.droneOsc.type = 'sine';
        this.droneOsc.frequency.setValueAtTime(77, this.ctx.currentTime); // 77Hz base
        
        this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.droneGain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 2); // Fade in over 2 sec

        this.droneOsc.connect(this.droneGain);
        this.droneGain.connect(this.ctx.destination);
        this.droneOsc.start();
    }

    stopMeditationDrone() {
        if (this.droneGain && this.ctx) {
            this.droneGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1); // Fade out
            setTimeout(() => {
                if (this.droneOsc) {
                    this.droneOsc.stop();
                    this.droneOsc.disconnect();
                    this.droneOsc = null;
                }
                if (this.droneGain) {
                    this.droneGain.disconnect();
                    this.droneGain = null;
                }
            }, 1000);
        }
    }
}

export const sound = typeof window !== 'undefined' ? new AudioSystem() : null;
