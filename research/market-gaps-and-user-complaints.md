# Market gaps, complaints, and underserved users

Date: 2026-11-24
Goal (from owner): maximize usage. Only hard cost is the yearly domain. Any other income is a bonus.
Method: web search of app-store reviews, review sites, and articles on ADHD/pomodoro. Evidence is snippets from search results, not a full review scrape. Sources are listed at the end. Treat counts and sentiment as directional.

## Constraint that shapes everything

Cost = domain only means: static site / PWA, no server, no database, no accounts, no paid APIs. All data stays on the user's device. Anything needing a backend (sync, live rooms) either stays out or must run on a free tier with a plan for what happens if it gets popular.

## What people complain about

### 1. Timers that stop or drift when the screen locks or the tab is in the background
The most concrete, repeated defect. A Pomofocus iOS app review says the countdown stops when the screen locks. Another timer's marketing page calls out a competitor for the same issue ("sessions that feel suspiciously long"). Android reviews mention alarms that don't sound, timers going into negative numbers, and the wrong break type firing.
- Fix: compute remaining time from a fixed end timestamp, never from a ticking counter. Use a service worker plus Notification API and a Wake Lock for foreground use. Test on locked iPhone, Android with battery saver, and a throttled background browser tab.
- Cost to you: none. This is a quality bar, and it is a real differentiator.

### 2. Rigid 25/5 structure
Many ADHD-focused sources say fixed blocks cut off hyperfocus, add costly task switches, and let breaks drift. A user review of another app praises 20/10 working better than 25/5 and loud custom alarm sounds, because the default ding was missed.
- Fix: flexible presets, "extend this session" instead of forced stops, open-ended count-up mode, break reminders that don't end the work state abruptly, and a loud/gentle sound choice.

### 3. Alarms that are easy to miss, and skipped sessions that break the cycle
Reviews mention alarms that only sound if ring volume is on, and a skipped session that stops the cycle from continuing.
- Fix: visual + sound + notification + title-bar countdown; skip must continue the cycle sensibly.

### 4. Paywalls and price
Pomofocus keeps the timer free but sells project tracking, yearly reports, CSV export, more templates, integrations, and ad-free. A Pomofocus app reviewer asks for cheaper monthly plans because students can't afford a lifetime price. Forest is described as free and ad-free on the browser extension but trailing the mobile app, with locked species and unreliable sync.
- Opening: make reports, history, and CSV export free. This is the exact set competitors paywall, so it is a clear "everything free" claim. It also costs nothing if data is local.

### 5. Timer fatigue
One article claims most pomodoro apps are abandoned within a week because they offer nothing beyond a countdown. This is a blog's claim, not measured data, but it matches the pattern of "novelty wears off."
- Fix: give people a reason to come back that is not guilt. See the mood and energy idea below.

### 6. Account walls and ads
Many results are either ad-supported or push account creation. No-account, no-ads, offline-capable is still a clear promise.

## Gaps (what is thin or missing)

| Gap | Evidence | Fit with zero-cost goal |
|-----|----------|-------------------------|
| Reliable background timing in a web app | Repeated bug reports on competitors | Excellent. Pure engineering. |
| Free reports/CSV/history | Competitors gate them | Excellent. Local data. |
| Mood or energy tied to focus sessions | Many energy trackers exist (spoon-theory apps) but they are separate from timers. Timers rarely capture how you felt. | Excellent. Local data. This is the unique angle. |
| Pacing and rest-first timers for fatigue | Spoon-theory apps exist as planners, not timers. Pomodoro advice is aimed at pushing output. | Excellent. Same timer, different defaults. |
| Free body doubling / co-working | Focusmate and Flown are paid at higher tiers (Focusmate from about $8/month yearly, Flown about $19-25/month per a third-party site). Free alternatives exist but are small. | Hard. Needs realtime. See below. |
| Flexible, ADHD-aware timer with no account | Lots of articles advise adjusting; few tools do it by default | Good. Mostly UX. |

## Underserved users

1. **People with ADHD who find fixed pomodoro hostile.** Large audience, strong search demand, many "pomodoro doesn't work for ADHD" articles. They want flexible blocks, soft endings, and no guilt. Most existing answers are paid (Routinery, Inflow, Focusmate) or gamified.
2. **People with fatigue-limiting conditions (chronic illness, long COVID, ME/CFS, burnout).** They use spoon-theory planners, but those don't pair with a focus timer. A "pacing" mode (short blocks, mandatory rest, a daily energy budget, no streak shaming) is largely unaddressed. Must be careful with health claims: describe it as a pacing tool, not treatment.
3. **Students who cannot afford subscriptions.** Direct review comment about price. A fully free tool with full history serves them.
4. **People who want privacy.** Mood data is sensitive. "Stays on your device, export anytime" is a selling point that cloud-first apps cannot match.
5. **Study-with-me and co-working crowd.** Large on YouTube and Discord. A shareable synced timer fits (see below).

## Recommended positioning

"The free focus timer that actually keeps time, adapts to how you feel, and keeps your data on your device. Reports and export included."

Three pillars:
1. **Reliability** (timing that survives lock screen and background).
2. **Flexibility** (custom blocks, extend, count-up, soft transitions).
3. **Mood and energy** (the pomoodoro identity): one-tap check-in before/after, free reports showing patterns.

## Zero-cost ways to get usage

- **PWA install** so it works offline and from the home screen. Hosting on a free static host.
- **SEO pages** targeting the real search terms: "pomodoro timer for ADHD", "pomodoro timer that works when screen is locked", "pomodoro timer with no ads or signup", "20/10 pomodoro timer", "study with me timer". The ADHD queries already return many articles, so write something more useful than those, such as presets with a short explanation of why each works.
- **Shareable links with settings encoded in the URL** (for example `?focus=50&break=10`). Needs no backend. Streamers, teachers, and study groups can share a preset. This doubles as free distribution.
- **Embeddable or OBS-friendly timer view** for study streams. No backend.
- **Community posts** where complaints already live: Reddit (r/ADHD, r/getdisciplined, r/studytips, r/chronicillness with care), Product Hunt, Hacker News "Show HN", and a short demo showing the lock-screen test.
- **Open source** the repo. Trust plus contributors plus GitHub discoverability.
- **Browser extension version** (Chrome/Firefox store listings are free or a small one-time fee). Note that Chrome has a one-time developer fee, which would break "domain only". Skip or accept that decision explicitly.

## Co-working / body doubling: option and risk

Demand is real (Focusmate, Flown, and many newer apps). The free version that costs nothing needs a way to sync a countdown between people. Options:
- **Link-synced timer with no server:** both people open the same URL with a start time in it. Everyone sees the same countdown. Presence is not shown. Costs nothing and still gives the shared-rhythm effect described by some co-op timers.
- **Peer-to-peer (WebRTC) presence:** needs a signaling service. Free tiers exist, but they come with limits and terms that can change.
- **Free-tier realtime backend:** works at small scale. Cost and shutdown risk if it goes viral.
Recommendation: start with the link-synced timer. Add presence only if usage justifies it and a free option holds up.

## Income that doesn't cost anything

Because usage is the goal, keep everything useful free and take money only in ways that don't gate features:
- Donation link ("buy me a coffee", GitHub Sponsors, Ko-fi). Visible but not nagging.
- Optional supporter extras that don't gate function: extra themes, soundscapes, a supporter badge. Payment processors take a cut but have no fixed cost.
- Clearly labeled affiliate links on a resources page (books, noise-cancelling headphones, desk lamps), not in the timer.
- Template or guide products (an ADHD-friendly focus guide, a printable planner) sold through a processor with no monthly fee.
Expect small amounts. The benefit of this approach is that it cannot hurt adoption.

## Things to rule out for now

- Accounts and cloud sync: costs money and removes the privacy advantage. Offer export/import of a file instead.
- Ads: contradicts positioning.
- Paywalled reports: contradicts positioning and is the main competitor weakness.
- Medical claims about ADHD, fatigue conditions, or mental health. Frame as tools people say help them.
- Mobile app store listings (Apple charges yearly, Google a one-time fee) - a PWA avoids both.

## Priority list

1. Rock-solid timing (end-timestamp model, notifications, wake lock, lock-screen tested).
2. Flexible modes: custom lengths, extend, count-up, soft end, loud/gentle alerts.
3. One-tap mood/energy check-ins with free local reports and CSV export.
4. PWA install and offline use.
5. URL-shareable presets and an OBS/stream view.
6. Pacing mode for low-energy days (short blocks, forced rest, no streaks).
7. Link-synced group timer.
8. SEO pages and launch posts.
9. Donation link.

## What I'd check next (not done yet)

- Direct review scrape of Pomofocus, Forest, Focus To-Do, and Be Focused for complaint frequency, not just examples.
- Search volume for the SEO phrases above using a keyword tool.
- Whether Safari/iOS PWAs allow reliable background notifications today (this decides how good a web-only timer can be on iPhone). It is the biggest technical risk to idea 1.
- Browser support for Wake Lock and Notification on the target browsers.

## Sources

- Pomodoro Productivity Timer, Google Play reviews: https://play.google.com/store/apps/details?hl=en_US&id=com.hamatim.podomoro
- Pomodrone app reviews: https://play.google.com/store/apps/details?hl=en_US&id=com.pomodrone.app
- Pomodoro app review on 20/10 and alarm sounds: https://play.google.com/store/apps/details?hl=en_US&id=com.onceupon.pomodoro
- Pomofocus iOS reviews (lock screen bug): https://apps.apple.com/us/app/pomofocus-focus-timer/id6467185071?platform=iphone&see-all=reviews
- Pomofocus Google Play review (pricing): https://play.google.com/store/apps/details?id=com.appfactory.pomofocus
- Pomofocus free vs premium: https://www.thegeeksclub.com/platforms/pomofocus/
- Nudge, claim about Focus Keeper stopping on lock: https://www.nudge-timer.com/
- Why pomodoro apps get abandoned (blog, claim not measured): https://ikuna.squarespace.com/blog/why-your-pomodoro-app-stops-working-after-a-week-and-what-to-do-about-it
- Pomodoro and ADHD: https://www.audhdpsychiatry.co.uk/insights/does-pomodoro-really-work-for-adhd/, https://www.routinery.app/guides/pomodoro-for-adhd, https://focusbox.io/blog/pomodoro-technique-for-adhd/, https://www.studyclock.com/blog/pomodoro-timer-for-adhd
- Forest vs Flora: https://nerdynav.com/forest-vs-flora-pomodoro
- Forest extension note (sync, locked species): https://tooltivity.com/extensions/compare/forest-vs-new-tab-studio
- Body doubling tools and pricing: https://www.routinery.app/blog/best-virtual-body-doubling-tools-working-from-home, https://neurolaunch.com/adhd-body-doubling-app-focusmate-vs-flown/
- Co-op timer example: https://copomo.ca/
- Spoon theory and energy apps: https://neurolaunch.com/spoon-theory/, https://apps.apple.com/us/app/spoondo-energy-task-planner/id6758527036, https://www.psychologytoday.com/gb/blog/disability-is-diversity/202505/pace-yourself-the-key-to-managing-chronic-illness/amp
