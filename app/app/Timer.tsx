"use client";

import { useEffect, useRef, useState } from "react";
import FocusInput from "./FocusInput";
import Kbd, { HotkeysContext } from "./Kbd";
import Settings from "./Settings";
import { setSoundEnabled } from "./sound";
import { useHotkeys } from "./useHotkeys";
import { useStoredState } from "./useStoredState";
import {
  DEFAULT_DURATIONS,
  MODE_LABEL,
  formatTime,
  useTimer,
  type Durations,
  type Mode,
} from "./useTimer";

const MODES: Mode[] = ["focus", "short", "long"];

export default function Timer() {
  const [durations, setDurations, durationsReady] = useStoredState<Durations>(
    "pomoodoro.durations",
    DEFAULT_DURATIONS,
  );
  const [focus, setFocus, focusReady] = useStoredState("pomoodoro.focus", "");
  const [soundOn, setSoundOn] = useStoredState("pomoodoro.sound", true);
  const [hotkeysOn, setHotkeysOn, hotkeysReady] = useStoredState("pomoodoro.hotkeys", true);
  const { mode, remaining, running, stageSeq, finishSeq, toggle, reset, setMode } = useTimer(durations);
  // Icon swap animates only after the first toggle, never on load.
  const [toggled, setToggled] = useState(false);
  const focusRef = useRef<HTMLInputElement>(null);
  const onToggle = () => {
    setToggled(true);
    toggle();
  };

  useEffect(() => setSoundEnabled(soundOn), [soundOn]);

  useHotkeys({
    space: onToggle,
    enter: () => focusRef.current?.focus(),
    r: reset,
    "1": () => setMode("focus"),
    "2": () => setMode("short"),
    "3": () => setMode("long"),
  }, hotkeysOn);

  const time = formatTime(remaining);
  useEffect(() => {
    document.title = running ? `${time} · ${MODE_LABEL[mode]}` : "Pomoodoro";
  }, [time, running, mode]);

  // Hide until saved values load so a saved 50-minute timer never flashes as 25:00.
  const ready = durationsReady && focusReady && hotkeysReady;

  return (
    <HotkeysContext value={hotkeysOn}>
    <main
      className={`relative flex flex-1 flex-col items-center justify-center gap-[clamp(1rem,4vmin,2.5rem)] px-6 py-24 transition-opacity duration-200 ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <nav
        aria-label="Timer stage"
        className="absolute top-[max(1.25rem,env(safe-area-inset-top))] flex flex-wrap justify-center gap-1"
      >
        {MODES.map((m, i) => (
          <button
            key={m}
            aria-pressed={m === mode}
            aria-keyshortcuts={hotkeysOn ? String(i + 1) : undefined}
            onClick={() => setMode(m)}
            className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition motion-safe:active:scale-95 ${
              m === mode ? "bg-accent/95" : "text-foreground/60 hover:bg-foreground/5"
            }`}
          >
            {MODE_LABEL[m]}
            <Kbd active={m === mode}>{i + 1}</Kbd>
          </button>
        ))}
      </nav>

      {/* Size follows the viewport but is bounded in rem, so browser zoom still scales it
          at the extremes instead of the timer staying fixed. The wrapper is keyed so a stage change
          fades the clock in (stageSeq is 0 on load, so nothing animates then). */}
      <div key={stageSeq} className={stageSeq > 0 ? "animate-stage-in" : ""}>
        <div
          key={finishSeq}
          role="timer"
          aria-label={`${MODE_LABEL[mode]} ${time}`}
          className={`text-[clamp(5rem,min(26vw,38vh),18rem)] font-semibold leading-none tabular-nums tracking-tight ${finishSeq > 0 ? "animate-settle" : ""}`}
        >
          {time}
        </div>
      </div>

      <div className="-mb-1 -mt-2 flex items-center gap-1">
        <button
          onClick={onToggle}
          aria-label={running ? "Pause" : "Start"}
          aria-keyshortcuts={hotkeysOn ? "Space" : undefined}
          className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-foreground/5 px-3 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground focus-visible:text-foreground motion-safe:active:scale-95"
        >
          <svg
            key={running ? "pause" : "play"}
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`size-5 shrink-0 ${toggled ? "animate-icon-in" : ""}`}
          >
            {running ? (
              <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
            ) : (
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
            )}
          </svg>
          <Kbd>Space</Kbd>
        </button>
        <button
          onClick={reset}
          aria-label="Reset"
          aria-keyshortcuts={hotkeysOn ? "R" : undefined}
          className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-foreground/65 transition hover:bg-foreground/5 hover:text-foreground focus-visible:text-foreground motion-safe:active:scale-95"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 shrink-0"
          >
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v5h5" />
          </svg>
          <Kbd>R</Kbd>
        </button>
      </div>

      <FocusInput ref={focusRef} value={focus} onChange={setFocus} />

      <Settings
        durations={durations}
        onChange={setDurations}
        soundOn={soundOn}
        onSoundChange={setSoundOn}
        hotkeysOn={hotkeysOn}
        onHotkeysChange={setHotkeysOn}
      />
    </main>
    </HotkeysContext>
  );
}
