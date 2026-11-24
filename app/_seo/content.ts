/**
 * Plain-language product facts shared by the on-page AboutSection and llms.txt.
 * Every statement here is verified against the timer source (useTimer, Timer, Settings,
 * sound, useHotkeys, useStoredState). Update both when behaviour changes.
 */

export interface Feature {
  readonly title: string;
  readonly description: string;
}

/** One-paragraph explanation of what the product is. */
export const whatIs =
  "Pomoodoro is a free Pomodoro focus timer that runs in your browser. It has three stages, Focus, Short break and Long break, and a single large countdown. There are no ads, no account and no sign-up. Your settings and focus note stay in your browser's local storage on your device.";

/** Short facts, suitable for a bullet list. */
export const keyFacts: ReadonlyArray<string> = [
  "Free, with no ads",
  "No account or sign-up",
  "Settings and focus note are stored only in your browser (localStorage)",
  "Works in the browser on desktop and mobile",
];

export const features: ReadonlyArray<Feature> = [
  {
    title: "Three stages",
    description: "Focus (25 min), Short break (5 min) and Long break (15 min) by default.",
  },
  {
    title: "Adjustable lengths",
    description: "Set each stage to any whole number of minutes from 1 to 180 in the settings.",
  },
  {
    title: "Automatic stage order",
    description:
      "After a focus session the timer moves to a short break, and after every fourth focus session to a long break. You press start for each stage.",
  },
  {
    title: "Focus note",
    description: "Write what you are working on in one line under the clock. It is remembered on your device.",
  },
  {
    title: "Soft sounds",
    description: "Gentle synthesized tones for start, pause, reset and when a session ends. Sound can be switched off.",
  },
  {
    title: "Keyboard shortcuts",
    description: "Space starts or pauses, R resets, 1, 2 and 3 pick a stage, Enter edits the focus note. Shortcuts can be switched off.",
  },
  {
    title: "Countdown in the tab title",
    description: "While the timer runs, the remaining time shows in the browser tab title.",
  },
];

/** Ordered steps for the how-to-use section. */
export const howToSteps: ReadonlyArray<string> = [
  "Pick a stage at the top: Focus, Short break or Long break.",
  "Optionally type what you are focusing on in the line under the clock.",
  "Press the play button (or Space) to start the countdown.",
  "Work until the chime sounds, then take the break the timer switches to.",
  "Use the gear button to change stage lengths, sound and shortcuts.",
];
