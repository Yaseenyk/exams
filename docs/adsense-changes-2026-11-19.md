# AdSense revamp, exams.streamerosai.com (19 Nov 2026)

Follows `docs/adsense-changes-2026-11-16.md`. Context: AdSense rejected streamerosai.com for "Low-value content" on 16 Nov 2026, and the review covers the whole domain. Ads stay OFF (`AD_MODE = "off"`, empty `ADSENSE_CLIENT`, no ad script in `out/`). No gate was changed.

## Facts re-checked today

Method: each official PDF was downloaded with WebFetch and its text read (scanned notices were read as images). A block's `checked` date was moved to 2026-11-19 (`RECHECKED` in `src/lib/exams.ts`) only when its rows were read again in the source. Nothing in the existing values was wrong; no value changed.

| Exam | Source | Result |
|---|---|---|
| JEE Main 2027 | Public notice of 24 Oct 2026, https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/20261024390682350.pdf | Session 1 dates, late fee, correction window, city slip, admit card, exam dates and shift times all match. |
| JEE Main 2027 | Information Bulletin, https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/202610241890224107.pdf | Session 2 dates, eligibility, pattern, marking, file sizes, city choice, helpline, gate closing, ₹200 key challenge and fee table all match. 8 blocks moved to 19 Nov. |
| JEE Main 2027 | Syllabus, https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/20261024683680768.pdf | 14 / 20 / 20 units match; the Planning paper's units were read (used below). |
| JEE Main 2027 | https://nta.ac.in/ news list | Latest JEE notices still 24, 28 and 30 Oct 2026; no extension posted. `statusNow` stays true. |
| NEET (UG) | 2026 Information Bulletin, https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/02/202602231394640855.pdf | Dates, fee, age rule, pattern, city choice, photo advice all match. 7 blocks moved to 19 Nov. nta.ac.in shows no NEET (UG) 2027 notice, so the "2027 bulletin not out" disclosure stays. |
| CUET (UG) | 2026 Information Bulletin, https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2026/01/202601031633478370.pdf and https://cuet.nta.nic.in/ | Dates, fee, 37 subjects, 50 questions, 60 minutes, +5/−1, ₹200 challenge all match. Site lists only 2026 items, no 2027 bulletin. All 9 blocks moved to 19 Nov. |

Not re-checked (left at 10 Nov 2026, values unchanged):

- **UPSC CSE, all blocks**: upsc.gov.in returned HTTP 403 to every fetch (calendar PDF, notice PDF, exam-calendar page).
- **JEE "study material" block** (source jeemain.nta.nic.in) and **NEET "study material" block** (source neet.nta.nic.in): both sites returned HTTP 403.
- **NEET syllabus block**: the PDF is a scan with no text layer.

I did not get around the 403s by spoofing a browser.

## Page changes

| Page | Change | Why |
|---|---|---|
| `/jee-main/fees/` | Was noindex. Now has the whole fee table from the bulletin: one-paper fees, the fees for two or three papers (₹2,000 / ₹1,600 / ₹1,000, outside India ₹10,000 / ₹8,000 / ₹5,000), that the fee is paid per session, the uniform late fee and the gateway charges. It passes the `isThinSection` rule by itself, so it is back in the index and sitemap. | The page only listed Paper 1, while B.Arch/B.Planning candidates pay different fees. Real missing facts, not padding. |
| `/neet-ug/eligibility/` | Was noindex. Adds six sourced rows from chapter 6 and chapter 8 of the 2026 bulletin: subjects you need (Physics, Chemistry, Biology/Biotechnology with English, seven qualifying codes), subjects studied after Class 12, result awaited, minimum percentile for admission (50th / 40th, 45th for PwBD), the rule for studying medicine abroad, NRI/OCI/foreign nationals. Back in the index and sitemap. | The page gave only the age rule; the qualifying subjects and admission percentile are what people actually search. |
| `/jee-main/exam-pattern/` | The vague "Paper 2A and 2B" row became two rows with the question count and marks for each part (77 questions / 400 marks; 100 / 400), drawing test mode, tie-break order and how the two sessions merge. | Sourced detail that was missing (section 2.4 of the bulletin). |
| `/jee-main/complete-guide/` | Paper 2B syllabus row now lists Part III Planning units (general awareness, social sciences, thinking skills) instead of "see the official document". | Read from the official syllabus. |
| `/neet-ug/` (dates) | Adds the 2026 application window (8 Feb to 8 Mar, up to 9 PM) and correction window (10 to 12 Mar). | From the bulletin; shows readers last year's rhythm while 2027 is not out. |
| FAQ (JEE pattern, NEET eligibility) | Three new questions, built from the sourced rows above by `src/lib/faq.ts` (B.Arch/B.Planning pattern, NEET subjects, NEET admission score). | FAQ answers are assembled from labelled rows, so they cannot drift. |
| Every re-checked table | "Checked on 19 November 2026" instead of 10 November. | Real re-check; stale dates read as unmaintained. |

Still noindex (and out of the sitemap): `/neet-ug/fees/`, `/cuet-ug/fees/`, `/upsc-cse/fees/`. Their bulletins have no more fee facts than the page already shows, so I did not pad them.

Sitemap: 26 URLs to 28. Fifth exam: not added. I would only add one with every fact read from its official bulletin, and I did not do that research today; UPSC's site (the source for several other candidate exams) returned 403 throughout.

## Gates

`npm run build` passes: next build, `verify-facts` (36 blocks, all official, sourced and dated), llms-full (28 of 28 sitemap pages). Checked in `out/`: noindex only on the three fee pages and 404; sitemap lists 28 URLs; no `adsbygoogle` script anywhere.

## What remains

- UPSC facts and the two "study material" blocks still say 10 Nov 2026. The 30-day stale warning on each table will appear from about 10 Dec 2026 if nobody re-reads them. The owner should open upsc.gov.in in a browser (the notice PDF and the 2027 calendar), confirm the rows, and move those blocks to `RECHECKED` (or a new date).
- NEET (UG) and CUET (UG) 2027 bulletins are not out. When they appear, every NEET/CUET block needs a full re-read and the cycle label must change.
- JEE Main Session 1 closes 22 Nov 2026 (late form to 26 Nov). If NTA posts an extension, the dates block and calendar need an edit.
- Still only four exams. The site's depth is good, but its breadth is small for a domain-level review.
- Three fee pages stay noindex. Folding them into the exam overview with redirects is the cleaner long-term fix.
