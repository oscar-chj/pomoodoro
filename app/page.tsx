import AboutSection from "./AboutSection";
import Timer from "./Timer";

export default function Home() {
  return (
    <>
      {/* The timer's <main> is flex-1; this wrapper keeps it exactly one viewport tall
          now that content follows it, so the timer still fills the screen. */}
      <div className="flex min-h-dvh flex-col">
        <Timer />
      </div>
      <AboutSection />
    </>
  );
}
