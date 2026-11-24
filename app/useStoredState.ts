"use client";

import { useEffect, useState } from "react";

/** useState that persists to localStorage. `ready` flips true once the saved value has loaded. */
export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      // Loading after mount (not in the initializer) keeps server and client HTML identical.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw !== null) setValue(JSON.parse(raw));
    } catch {
      // unreadable or blocked storage: keep the default
    }
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or blocked: keep working in memory
    }
  }, [key, value, ready]);

  return [value, setValue, ready] as const;
}
