"use client";

import { useEffect, useRef, useState } from "react";
import { buildPresetQuery } from "./preset";
import { playCue, setSoundEnabled, unlockAudio } from "./sound";
import Switch from "./Switch";
import { MODE_LABEL, type Durations, type Mode } from "./useTimer";

const MIN = 1;
const MAX = 180;
const MODES: Mode[] = ["focus", "short", "long"];

function Field({ label, value, onCommit }: { label: string; value: number; onCommit: (n: number) => void }) {
  const [draft, setDraft] = useState(String(value));

  return (
    <label className="flex items-center justify-between gap-6">
      <span>{label}</span>
      <span className="flex items-center gap-2 text-foreground/60">
        <input
          type="number"
          inputMode="numeric"
          min={MIN}
          max={MAX}
          value={draft}
          onFocus={(e) => e.currentTarget.select()}
          onChange={(e) => {
            setDraft(e.target.value);
            const n = Number(e.target.value);
            if (Number.isInteger(n) && n >= MIN && n <= MAX) onCommit(n);
          }}
          // Restore the last valid value if the field is left empty or out of range.
          onBlur={() => setDraft(String(value))}
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
          className="h-11 w-20 rounded-xl bg-foreground/5 px-3 text-center text-foreground outline-none focus:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        />
        min
      </span>
    </label>
  );
}

function CopyPresetButton({
  durations,
  soundOn,
  hotkeysOn,
}: {
  durations: Durations;
  soundOn: boolean;
  hotkeysOn: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    const query = buildPresetQuery({ durations, sound: soundOn, hotkeys: hotkeysOn });
    let next: "copied" | "failed" = "failed";
    try {
      await navigator.clipboard.writeText(location.origin + location.pathname + query);
      next = "copied";
    } catch {
      // clipboard unavailable or permission denied
    }
    setStatus(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 1500);
  }

  return (
    <div aria-live="polite" className="flex flex-col">
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-11 items-center justify-center rounded-xl bg-foreground/5 px-3 text-sm text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-safe:active:scale-95"
      >
        {status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy preset link"}
      </button>
    </div>
  );
}

export default function Settings({
  durations,
  onChange,
  soundOn,
  onSoundChange,
  hotkeysOn,
  onHotkeysChange,
}: {
  durations: Durations;
  onChange: (d: Durations) => void;
  soundOn: boolean;
  onSoundChange: (on: boolean) => void;
  hotkeysOn: boolean;
  onHotkeysChange: (on: boolean) => void;
}) {
  return (
    <>
      <button
        popoverTarget="settings"
        aria-label="Timer settings"
        className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] flex size-12 items-center justify-center rounded-full text-2xl text-foreground/50 transition motion-safe:active:scale-95 hover:bg-foreground/5 hover:text-foreground"
      >
        ⚙
      </button>
      {/* Native popover: closes on outside click and Escape with no extra code. */}
      <div
        id="settings"
        popover="auto"
        className="popover-pop inset-auto bottom-20 right-4 m-0 w-72 rounded-3xl bg-background p-5 text-foreground shadow-xl ring-1 ring-foreground/10"
      >
        <div className="flex flex-col gap-3">
          {MODES.map((m) => (
            <Field
              key={m}
              label={MODE_LABEL[m]}
              value={durations[m]}
              onCommit={(n) => onChange({ ...durations, [m]: n })}
            />
          ))}
          <Switch
            label="Sound"
            checked={soundOn}
            onChange={(next) => {
              onSoundChange(next);
              if (next) {
                // Turning on is a user gesture: unlock audio and confirm with a tick.
                setSoundEnabled(true);
                unlockAudio();
                playCue("stage");
              }
            }}
          />
          <Switch label="Hotkeys" checked={hotkeysOn} onChange={onHotkeysChange} />
          <CopyPresetButton durations={durations} soundOn={soundOn} hotkeysOn={hotkeysOn} />
        </div>
      </div>
    </>
  );
}
