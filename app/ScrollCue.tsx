"use client";

import { useSyncExternalStore } from "react";

const THRESHOLD = 48;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** Quiet "more below" cue for the timer screen. Fades out once the page is scrolled a little. */
export default function ScrollCue({ targetId }: { targetId: string }) {
  // The boolean snapshot only changes at the threshold, so scrolling does not re-render per frame.
  const scrolled = useSyncExternalStore(
    subscribe,
    () => window.scrollY > THRESHOLD,
    () => false,
  );

  const go = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(targetId)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={go}
      aria-label="Scroll to About"
      // inert removes it from tab order, hit testing and the accessibility tree once faded.
      inert={scrolled}
      className={`absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full text-foreground/60 transition-opacity duration-300 hover:text-foreground/80 focus-visible:text-foreground ${
        scrolled ? "opacity-0" : "opacity-100"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}
