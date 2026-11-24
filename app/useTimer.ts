"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playCue, unlockAudio } from "./sound";

export type Mode = "focus" | "short" | "long";
/** Minutes per mode. */
export type Durations = Record<Mode, number>;

export const MODE_LABEL: Record<Mode, string> = {
  focus: "Focus",
  short: "Short break",
  long: "Long break",
};

export const DEFAULT_DURATIONS: Durations = { focus: 25, short: 5, long: 15 };

export function formatTime(ms: number) {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function useTimer(durations: Durations) {
  const [mode, setModeState] = useState<Mode>("focus");
  // Milliseconds left once started. null means untouched, so changing durations updates the display.
  const [left, setLeft] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const endAt = useRef(0);
  const focusRounds = useRef(0);
  // Bumped on every stage change / finished session so the UI can animate them (not on load).
  const [stageSeq, setStageSeq] = useState(0);
  const [finishSeq, setFinishSeq] = useState(0);

  const remaining = left ?? durations[mode] * 60_000;

  const start = useCallback(() => {
    // Create the audio context inside a user gesture so iOS lets the chime play later.
    unlockAudio();
    playCue("start");
    endAt.current = Date.now() + remaining;
    setLeft(remaining);
    setRunning(true);
  }, [remaining]);

  const pause = useCallback(() => {
    playCue("pause");
    setLeft(Math.max(0, endAt.current - Date.now()));
    setRunning(false);
  }, []);

  const toggle = useCallback(() => (running ? pause() : start()), [running, pause, start]);

  const reset = useCallback(() => {
    if (left !== null || running) playCue("reset");
    setLeft(null);
    setRunning(false);
  }, [left, running]);

  const setMode = useCallback(
    (m: Mode) => {
      // Re-selecting the active stage still restarts it, but silently and without a fade.
      if (m !== mode) {
        playCue("stage");
        setModeState(m);
        setStageSeq((n) => n + 1);
      }
      setLeft(null);
      setRunning(false);
    },
    [mode],
  );

  useEffect(() => {
    if (!running) return;
    // Read the clock each tick instead of counting ticks, so background throttling cannot cause drift.
    const id = setInterval(() => {
      const ms = endAt.current - Date.now();
      if (ms > 0) return setLeft(ms);
      playCue("finish");
      setFinishSeq((n) => n + 1);
      setStageSeq((n) => n + 1);
      let next: Mode = "focus";
      if (mode === "focus") {
        focusRounds.current += 1;
        next = focusRounds.current % 4 === 0 ? "long" : "short";
      }
      setModeState(next);
      setLeft(null);
      setRunning(false);
    }, 250);
    return () => clearInterval(id);
  }, [running, mode]);

  return { mode, remaining, running, stageSeq, finishSeq, toggle, reset, setMode };
}
