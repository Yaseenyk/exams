# exams.streamerosai.com

An independent guide to India's big entrance exams: dates, eligibility, exam pattern and fees for JEE Main, NEET (UG), CUET (UG) and the UPSC Civil Services Examination.

**The rule:** every fact is read from the exam body's own document, and shown with a link to it and the day it was checked. Nothing is typed into a page by hand: all facts live in `src/lib/exams.ts`, and `scripts/verify-facts.mjs` fails the build if a block loses its source or date, or cites a non-official domain. If the official site has not published something, the page says "not announced yet" (the `pending` list), never a guess.

Next.js 14 static export, deployed to GitHub Pages (custom domain, daily rebuild at 00:20 UTC).

## Updating a fact
1. Open the official document (the `source` URL on the block) and read the figure there.
2. Edit the row in `src/lib/exams.ts`, bump `checked` to today.
3. `npm run build`, read the page, commit. A person reviews every change; never publish unreviewed.

## Adding an exam
Add an object to `EXAMS` with one block per page you have official facts for. Do not add an exam you cannot source from its official site, or whose pages would be thin copies of each other.

## Ads
`AD_MODE` in `src/lib/site.ts` is "off" until AdSense approves the domain. Ads never go next to tables or links people tap.
