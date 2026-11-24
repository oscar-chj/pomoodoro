"use client";

// All sounds are synthesized with Web Audio. Every call is a silent no-op when audio is
// unavailable, blocked, or muted.

export type Cue = "start" | "pause" | "reset" | "stage" | "finish";

const MASTER_VOLUME = 0.1;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = true;

export function setSoundEnabled(on: boolean) {
  enabled = on;
}

/** Create (once) and resume the shared context. Call from a user gesture so iOS allows playback. */
export function unlockAudio() {
  try {
    if (!ctx) {
      ctx = new AudioContext();
      master = ctx.createGain();
      master.gain.value = MASTER_VOLUME;
      master.connect(ctx.destination);
    }
    if (ctx.state !== "running") void ctx.resume().catch(() => {});
  } catch {
    ctx = null;
    master = null;
  }
}

/** One soft note: ~5ms attack, then exponential decay, so there are no clicks. */
function tone(freq: number, at: number, duration: number, peak: number, type: OscillatorType = "sine") {
  if (!ctx || !master) return;
  const t = ctx.currentTime + at;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain).connect(master);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

export function playCue(cue: Cue) {
  if (!enabled) return;
  try {
    if (!ctx) return;
    switch (cue) {
      case "start":
        tone(523.25, 0, 0.09, 0.9);
        tone(783.99, 0.07, 0.11, 0.9);
        break;
      case "pause":
        tone(587.33, 0, 0.13, 0.8);
        break;
      case "reset":
        tone(440, 0, 0.05, 0.5, "triangle");
        break;
      case "stage":
        tone(660, 0, 0.05, 0.5, "triangle");
        break;
      case "finish":
        tone(659.25, 0, 1.0, 1);
        tone(880, 0.18, 1.0, 0.9);
        break;
    }
  } catch {
    // audio failure stays silent
  }
}
