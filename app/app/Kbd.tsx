import { createContext, useContext } from "react";

/** Whether hotkeys are on. Provided by Timer; Kbd hints and aria-keyshortcuts follow it. */
export const HotkeysContext = createContext(true);
export const useHotkeysOn = () => useContext(HotkeysContext);

// Dimmed key hint. Only rendered for mouse-and-keyboard devices, never on touch, or when hotkeys are off.
// `active` is for the highlighted stage pill. Text stays at 70% foreground so it keeps at least
// 3.6:1 contrast even on top of a button's hover fill.
export default function Kbd({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  if (!useHotkeysOn()) return null;
  const tone = active
    ? "bg-background/50 text-foreground/80"
    : "bg-foreground/5 text-foreground/70";
  return (
    <kbd
      aria-hidden="true"
      className={`pointer-events-none hidden select-none items-center rounded px-1 py-0.5 font-mono text-[0.6875rem] leading-none pointer-fine:inline-flex ${tone}`}
    >
      {children}
    </kbd>
  );
}
