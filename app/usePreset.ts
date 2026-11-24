"use client";

import { useEffect, useRef } from "react";
import { parsePreset, stripPresetParams, type Preset } from "./preset";

/**
 * Applies the URL preset once, after every stored setting has loaded (otherwise the load
 * would overwrite it), then removes the preset params from the address bar.
 */
export function usePreset(ready: boolean, apply: (p: Preset) => void) {
  const done = useRef(false);
  const applyRef = useRef(apply);
  useEffect(() => {
    applyRef.current = apply;
  });

  useEffect(() => {
    if (!ready || done.current) return;
    done.current = true;
    const { search, pathname, hash } = window.location;
    const rest = stripPresetParams(search);
    if (rest === null) return;
    applyRef.current(parsePreset(search));
    history.replaceState(history.state, "", pathname + rest + hash);
  }, [ready]);
}
