/**
 * Shared FAQ content. Rendered visibly on the page and emitted as FAQPage JSON-LD,
 * so the structured data always matches what visitors can read.
 * Every answer is checked against the app source (useTimer.ts, Timer.tsx, Settings.tsx, useHotkeys.ts).
 */

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export const faqs: readonly FaqItem[] = [
  {
    question: "Is Pomoodoro free?",
    answer:
      "Yes. Pomoodoro is free to use, with no ads and no paywall on the timer.",
  },
  {
    question: "Do I need an account to use it?",
    answer:
      "No. There is no signup or login. Open the page and press start.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Your session lengths, focus note and sound and hotkey preferences are saved in your browser's local storage on your own device. Pomoodoro does not send them to a server.",
  },
  {
    question: "Does the timer stay accurate in a background tab?",
    answer:
      "Yes. The timer compares against the system clock instead of counting ticks, so a throttled background tab does not make it drift. Keep the page open until the session ends, because Pomoodoro does not run as a background service. It does not currently work offline.",
  },
  {
    question: "Can I change the session lengths?",
    answer:
      "Yes. Open the settings (the gear button) and set focus, short break and long break lengths anywhere from 1 to 180 minutes. A long break follows every fourth focus session.",
  },
  {
    question: "Are there keyboard shortcuts?",
    answer:
      "Yes. Space starts or pauses, R resets, 1, 2 and 3 switch between focus, short break and long break, and Enter jumps to the focus note. You can turn the shortcuts off in settings.",
  },
];
