"use client";

import { useRef, type Ref } from "react";
import Kbd, { useHotkeysOn } from "./Kbd";

type Props = { value: string; onChange: (value: string) => void; ref?: Ref<HTMLInputElement> };

/**
 * The focus line is an input styled as plain text.
 * Click, tap, or the Enter shortcut selects everything, so typing replaces it and Backspace clears it.
 * Enter or clicking away keeps it. Escape restores what it was before editing.
 */
export default function FocusInput({ value, onChange, ref }: Props) {
  const hotkeysOn = useHotkeysOn();
  const before = useRef(value);
  // True only between a mouse press that will focus the input and its mouse-up.
  const pressFocusing = useRef(false);
  const input = useRef<HTMLInputElement | null>(null);

  // Keep the internal ref and forward the element to the parent's ref.
  const setRef = (el: HTMLInputElement | null) => {
    input.current = el;
    if (typeof ref === "function") return ref(el);
    if (ref) ref.current = el;
  };

  return (
    <div className="relative w-full max-w-2xl">
      <input
        ref={setRef}
        value={value}
        maxLength={100}
        placeholder="What are you focusing on?"
        aria-label="Current focus"
        aria-keyshortcuts={hotkeysOn ? "Enter" : undefined}
        enterKeyHint="done"
        autoComplete="off"
        onFocus={(e) => {
          before.current = value;
          const el = e.currentTarget;
          el.select();
          // iOS Safari ignores select() during focus, so repeat it on the next frame.
          requestAnimationFrame(() => el.setSelectionRange(0, el.value.length));
        }}
        onMouseDown={(e) => {
          pressFocusing.current = document.activeElement !== e.currentTarget;
        }}
        // Without this, the mouse-up that ends the focusing click collapses the selection.
        onMouseUp={(e) => {
          if (pressFocusing.current) e.preventDefault();
          pressFocusing.current = false;
        }}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => {
          pressFocusing.current = false;
          onChange(value.trim());
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") input.current?.blur();
          if (e.key === "Escape") {
            onChange(before.current);
            input.current?.blur();
          }
        }}
        className={`peer w-full truncate rounded-2xl bg-transparent px-6 py-3 text-center text-[clamp(1.125rem,4vmin,2rem)] outline-none transition-colors placeholder:text-foreground/40 hover:bg-foreground/5 focus:bg-foreground/5 ${hotkeysOn ? "pointer-fine:px-16" : ""}`}
      />
      {hotkeysOn && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 peer-focus:hidden">
          <Kbd>Enter</Kbd>
        </span>
      )}
    </div>
  );
}
