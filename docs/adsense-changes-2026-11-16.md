# AdSense readiness changes, exams.streamerosai.com (16 Nov 2026)

Context: the parent domain streamerosai.com was rejected for "Low-value content"; subdomains are judged with it. Policy notes: `portfolio/docs/adsense-readiness-2026-11-16.md`. Ads stay OFF (`AD_MODE = "off"`, empty `ADSENSE_CLIENT`; only the publisher account meta tag is present). This repo has no `verify-no-ads` script and nothing here switches ads on.

## Audit (visible `<main>` words in the built `out/`, 29 HTML files incl. 404)

| Page type | Pages | Words | Verdict |
|---|---|---|---|
| Complete guides | 4 (one per exam) | 2,040 to 3,100 | Strong. Keep. |
| Exam overview | 4 | 507 to 924 | Fine. Keep. |
| How to apply | 4 | 521 to 1,162 | Fine. Keep. |
| Exam pattern | 4 | 432 to 648 | Fine. Keep. |
| Eligibility | 4 | 305 (NEET), 380, 380, 604 | NEET is thin; the rest acceptable. |
| Application fee | 4 | 315 to 360 | Thin: a 3 to 7 row table plus FAQ, same facts as the overview and complete guide. |
| Home, calendar, how-we-check | 3 | 419, 300, 346 | Useful; the calendar is a real dated list. |
| Privacy | 1 | 140 | Too short, missing the visit counter. |
| About, Contact, Terms | 0 (404) | - | Missing. |

No broken internal links (checked over every built page). No placeholder or "under construction" text. Templating: the section pages share a layout but each table holds that exam's own sourced rows, so they are not word-swapped duplicates; the fee pages are the exception because they have too little content to stand alone.

## Changes

| Page | Before | After |
|---|---|---|
| `/about/` | 404 | New, about 900 words: who runs it (Yaseen Khatib, solo, Hyderabad), why the site exists, scope and what is deliberately not covered, how facts are kept current (build gate, daily re-check job, 30-day stale warning, the honest limit that NTA pages sometimes return 403 to the job), and a list of every official document behind each exam, generated from `src/lib/exams.ts` so it cannot drift. |
| `/contact/` | 404 | New: email, how to report a wrong fact, data requests, what cannot be helped with, what not to send. |
| `/terms/` | 404 | New: information only, confirm on the official site, no affiliation with NTA/UPSC, error handling, links, reuse, advertising. |
| `/privacy/` | 140 words | 455 words: Google Analytics, Microsoft Clarity and the first-party visit counter listed separately (no cookies, no IP, nothing typed, 90-day retention, off with Do Not Track or GPC), cookies, Google AdSense for the future with opt-out of personalised ads (Google ad settings, aboutads.info, analytics opt-out add-on), rights and contact. |
| Footer, every page | How we check, Privacy | About, How we check, Contact, Privacy, Terms. |
| 4 fee pages and `neet-ug/eligibility` | indexable, in sitemap | `noindex, follow`, removed from the sitemap, still reachable by links. The rule is `isThinSection()` in `src/lib/exams.ts` (table content under 500 characters), so a page that grows past the threshold re-enters the index and sitemap on the next build. |
| `sitemap.xml` | 28 URLs | 26 (minus 5 thin pages, plus About, Contact and Terms). |

## Gates

`npm run build` passes, including `verify-facts` (36 blocks, all official domains, sourced and dated) and the llms-full generator. `next lint` is not configured in this repo (it asks to set up ESLint interactively), which was already the case; I did not add one. No gate was changed.

## Remaining weaknesses

- Only four exams. For a domain-level reviewer a four-exam site is narrow, though each exam has real depth.
- Eligibility and fee facts are small tables; the pages stay short however well they are written, which is why five are now noindex. If the owner would rather keep them indexed, the right fix is to fold fees into the exam overview page and redirect, not to pad the pages.
- The daily source check gets HTTP 403 from the JEE and NEET notice pages (state file shows 7 failures), so some changes depend on the Monday manual reminder.
- Facts were last checked 10 Nov 2026; NEET and CUET still show the 2026 rules because the 2027 bulletins are not out. This is disclosed on the pages, but a stale checked date reads as unmaintained.
- No visible "last updated by a person" history beyond the checked dates.

## Honest assessment

Content quality was already the best of the four sites (every fact sourced, build gate on sources). The policy gaps were the missing About, Contact and Terms pages, a thin privacy policy, and five pages that could not stand alone. Those are fixed. The site is still small; whether the domain family passes AdSense depends on the domain-level review.

## Owner to-dos

1. Re-read the NEET and CUET official sites for the 2027 bulletin dates and bump `checked`.
2. Confirm the About statements (no coaching or sponsors behind the site).
3. Request the AdSense review only after all four sites are live with their trust pages.
