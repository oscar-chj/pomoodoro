import { features, howToSteps, keyFacts, whatIs } from "./_seo/content";
import { faqs } from "./_seo/faq";
import JsonLd from "./_seo/JsonLdScript";
import { buildFaqPage } from "./_seo/jsonld";
import { siteConfig } from "./_seo/site";

/**
 * Visible, crawlable explanation of the product, placed below the full-screen timer.
 * Server component: renders as plain HTML. The Timer renders no <h1>, so this owns it.
 */
export default function AboutSection() {
  return (
    <section
      aria-labelledby="about-title"
      className="mx-auto w-full max-w-2xl px-6 pb-24 pt-16 text-foreground/80"
    >
      <h1 id="about-title" className="text-2xl font-semibold text-foreground">
        {siteConfig.name}: a free, no-signup Pomodoro focus timer
      </h1>
      <p className="mt-4 leading-relaxed">{whatIs}</p>
      <ul className="mt-4 list-disc space-y-1 pl-5">
        {keyFacts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-semibold text-foreground">Features</h2>
      <ul className="mt-4 space-y-3">
        {features.map((f) => (
          <li key={f.title}>
            <strong className="font-medium text-foreground">{f.title}.</strong> {f.description}
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-semibold text-foreground">How to use Pomoodoro</h2>
      <ol className="mt-4 list-decimal space-y-1 pl-5">
        {howToSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h2 className="mt-12 text-xl font-semibold text-foreground">Frequently asked questions</h2>
      <div className="mt-4 divide-y divide-foreground/10 rounded-2xl ring-1 ring-foreground/10">
        {faqs.map((f) => (
          <details key={f.question} className="group px-5 py-3">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {f.question}
              <span aria-hidden="true" className="text-foreground/50 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-2 pt-1 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd data={buildFaqPage()} />
    </section>
  );
}
