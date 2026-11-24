# Opportunities: free core product, paid extras

Date: 2026-11-24
Status: First-pass analysis from general knowledge. No market data verified. Competitor pricing and conversion figures below are rules of thumb and must be checked before committing.

## The model

Give away the thing that is cheap to serve and creates habit (the timer). Charge for the things that only matter after the habit exists (history, insight, sharing, identity). Costs stay near zero if the timer runs entirely client-side and data is stored locally until a user pays.

Typical freemium conversion is low (roughly 1-5% of active users). Revenue comes from volume, so distribution matters more than features.

## Why the timer is a good free hook

- Used daily, in short sessions, so it builds a streak and a habit.
- Works fully offline in the browser, so hosting cost is close to zero (static site on Cloudflare Pages, GitHub Pages, or Netlify free tier).
- "No ads, no signup" is a real differentiator. Most free timers are ad-heavy or force accounts.
- Users generate data (sessions, tasks, moods) that becomes valuable to them over time.

## Ranked opportunities

Scores: Cost = cost to build/run (1 low - 5 high). Upside = revenue potential (1-5). Effort = time to first dollar (1 low - 5 high).

| # | Idea | What is paid | Cost | Upside | Effort |
|---|------|--------------|------|--------|--------|
| 1 | Reports and insights | Weekly/monthly focus reports, trends, best time of day, export to PDF/CSV | 1 | 4 | 2 |
| 2 | Cloud sync and backup | Cross-device history, account recovery | 2 | 4 | 3 |
| 3 | Shareable cards and public profiles | Branded share images, streak badges, public focus page, custom URL | 1 | 3 | 2 |
| 4 | Mood and energy correlation (the "pomoodoro" angle) | Link mood check-ins to focus output, show what conditions produce your best work | 1 | 4 | 3 |
| 5 | Team and group sessions | Shared rooms, co-working sessions, team dashboards | 3 | 5 | 4 |
| 6 | Integrations | Push sessions to Notion, Google Calendar, Todoist, Obsidian, Slack status | 2 | 3 | 3 |
| 7 | Customization pack | Themes, sounds, ambient soundscapes, custom intervals | 1 | 2 | 1 |
| 8 | One-time "supporter" or lifetime purchase | Unlocks everything above for a single payment | 1 | 3 | 1 |
| 9 | Employer and coach licensing | Bulk seats for coaches, students, remote teams | 2 | 4 | 4 |
| 10 | Data export / API | Personal API, webhooks, raw export for quantified-self users | 1 | 2 | 2 |

### Notes on the strongest candidates

**1. Reports and insights.** This is the example you gave and the best starting point. The paywall sits on information the user already created, so the value is obvious. Free tier shows today and this week. Paid shows long history, trends, and exports. Build cost is mostly charts over data you already store.

**4. Mood and energy correlation.** The project name suggests this. A one-tap mood check before and after each session produces data no generic timer has. Insight such as "your focus drops after 3pm on days you slept badly" is hard to copy and justifies a subscription. It also gives a story for marketing and press.

**3. Sharing.** Works as marketing and revenue at once. Free users can share a basic card with a small "made with Pomoodoro" mark. Paying removes the mark and adds custom design. Each share is a free acquisition channel.

**5. Teams.** Highest ceiling, because companies pay per seat and budgets are larger. Needs real-time infrastructure and accounts, so cost and effort are higher. Treat as phase 2 or 3.

**8. Lifetime purchase.** Indie users often prefer one payment over a subscription. Offering both (for example a yearly price and a lifetime price) captures both groups and brings cash in early.

## Other monetization angles that cost nothing to run

- **Donations / "buy me a coffee".** Low revenue, but zero build work. Good for day one.
- **Affiliate links.** Recommend books, desk gear, or focus tools in a non-intrusive "resources" page. Keeps the no-ads promise if clearly labeled.
- **Template and content products.** Sell a productivity planner PDF, a focus-habit course, or Notion templates to the same audience.
- **Open-source core plus hosted paid version.** Builds trust and contributors, and people pay for convenience.
- **White label.** License the timer to wellness apps, schools, or coworking spaces.

## What to avoid

- Ads or tracking. It breaks the main differentiator.
- Paywalling the timer itself or basic settings. This kills the habit loop that feeds everything else.
- Heavy backend early. Keep data local until someone pays for sync.
- Building team features before individual users show they will pay.

## Risks

- Crowded market (Forest, Focus To-Do, Pomofocus, Toggl Track, and many others). Differentiation must come from the mood angle, privacy, or simplicity.
- Low conversion means you need thousands of active users for meaningful income. Distribution (SEO, Reddit, Product Hunt, TikTok/YouTube study communities) is the real work.
- Payment processing and tax add admin work. Using Stripe or Lemon Squeezy (merchant of record) reduces the tax burden.
- Privacy expectations are high for mood data. Local-first storage and clear export/delete options help.

## Suggested sequence

1. Ship free timer with local history, no account. Add donation link.
2. Add mood check-in and basic free weekly view.
3. Add paid reports, export, and shareable cards. Offer yearly and lifetime pricing.
4. Add cloud sync once users ask for multi-device support.
5. Explore integrations and team features based on demand.

## Open questions to answer before building

- Who is the target user: students, remote workers, ADHD community, or developers? Each has different willingness to pay.
- Web app, installable PWA, or native? PWA is the cheapest path.
- Is the mood angle the core identity, or an add-on?
- What price points do the direct competitors charge? (Needs checking.)
- What conversion and retention does a similar indie product report? (Needs checking.)
