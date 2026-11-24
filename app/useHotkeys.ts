"use client";

import { useEffect, useRef } from "react";

/**
 * Global single-key shortcuts. Keys are lowercase `event.key` values, with "space" for the spacebar.
 *
 * Safe on touch devices: shortcuts never fire while typing in a field (so the on-screen keyboard
 * is unaffected), ignore key repeat and modifier combos (so browser shortcuts still work), and
 * leave Space and Enter to a focused button or link so they keep their native behavior.
 */
export function useHotkeys(map: Record<string, () => void>, enabled = true) {
  const latest = useRef(map);
  const isEnabled = useRef(enabled);
  useEffect(() => {
    latest.current = map;
    isEnabled.current = enabled;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isEnabled.current) return;
      if (e.repeat || e.isComposing || e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;

      const key = e.key === " " ? "space" : e.key.toLowerCase();
      // A focused button or link keeps its native Space/Enter activation.
      if ((key === "space" || key === "enter") && target?.closest("button, a")) return;
      // Enter must not steal focus from the open settings popover.
      if (key === "enter" && document.querySelector("#settings:popover-open")) return;

      const action = latest.current[key];
      if (!action) return;
      e.preventDefault();
      action();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
