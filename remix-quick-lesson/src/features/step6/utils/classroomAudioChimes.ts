import { ChimeSound } from '../types/timerTypes';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) audioCtx = new AudioCtx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq: number, start: number, duration: number, type: OscillatorType = 'sine', gain = 0.25) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

  gainNode.gain.setValueAtTime(gain, ctx.currentTime + start);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration);
}

export function playStartChime(sound: ChimeSound = 'marimba') {
  if (sound === 'silent') return;
  playTone(523.25, 0, 0.4, 'triangle', 0.2); // C5
  playTone(659.25, 0.15, 0.6, 'triangle', 0.25); // E5
  playTone(783.99, 0.3, 0.8, 'sine', 0.3); // G5
}

export function playFiveSecTick(secondsRemaining: number) {
  const baseFreq = secondsRemaining === 1 ? 880 : 587.33; // Higher pitch on 1
  playTone(baseFreq, 0, 0.12, 'sine', 0.18);
}

export function playEndAlarm(sound: ChimeSound = 'marimba') {
  if (sound === 'silent') return;
  if (sound === 'zen') {
    playTone(261.63, 0, 2.8, 'sine', 0.4); // C4 deep resonant bowl
    playTone(523.25, 0.05, 2.5, 'sine', 0.2);
    return;
  }
  if (sound === 'schoolBell') {
    // Westminster 4-note chime
    playTone(659.25, 0, 0.5, 'triangle', 0.3); // E
    playTone(587.33, 0.35, 0.5, 'triangle', 0.3); // D
    playTone(523.25, 0.7, 0.5, 'triangle', 0.3); // C
    playTone(392.00, 1.05, 1.2, 'triangle', 0.35); // G
    return;
  }
  if (sound === 'digital') {
    playTone(800, 0, 0.1, 'square', 0.15);
    playTone(800, 0.15, 0.1, 'square', 0.15);
    playTone(1000, 0.3, 0.35, 'square', 0.2);
    return;
  }
  // Default: Marimba chime chord
  playTone(523.25, 0, 0.6, 'triangle', 0.3); // C5
  playTone(659.25, 0.12, 0.6, 'triangle', 0.3); // E5
  playTone(783.99, 0.24, 0.8, 'triangle', 0.3); // G5
  playTone(1046.50, 0.36, 1.2, 'sine', 0.35); // C6
}
