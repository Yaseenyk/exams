import type { Metadata } from "next";
import Link from "next/link";
import { EXAMS, type Block } from "@/lib/exams";
import { SITE_URL, CONTACT_EMAIL, PORTFOLIO_URL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { prettyDate } from "@/components/FactTable";
import JsonLd from "@/components/JsonLd";

const TITLE = "About Exam Dates India";
const DESC = "Who runs Exam Dates India, what it covers and does not cover, and the official documents each exam page was read from.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE}: who runs it and where the facts come from` },
  description: DESC,
  alternates: { canonical: `${SITE_URL}/about/` },
  openGraph: { type: "website", url: `${SITE_URL}/about/`, title: TITLE, description: DESC, siteName: "Exam Dates India", locale: "en_IN" },
};

const LABELS = { dates: "Dates", eligibility: "Eligibility", pattern: "Exam pattern", fees: "Fees", apply: "How to apply", portals: "Portals", syllabus: "Syllabus", material: "Study material", afterApply: "After you apply" } as const;

function sourcesOf(e: (typeof EXAMS)[number]) {
  const seen = new Map<string, { name: string; checked: string; used: string[] }>();
  for (const k of Object.keys(LABELS) as (keyof typeof LABELS)[]) {
    const b = e[k] as Block | undefined;
    if (!b) continue;
    const s = seen.get(b.source) ?? { name: b.sourceName, checked: b.checked, used: [] };
    s.used.push(LABELS[k]);
    seen.set(b.source, s);
  }
  return [...seen];
}

export default function About() {
  return (
    <article className="prose-guide">
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about/" }])} />
      <JsonLd data={webPageJsonLd({ title: TITLE, description: DESC, path: "/about/", modified: "2026-11-16" })} />
      <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">{TITLE}</h1>
      <p className="text-lg">{DESC}</p>

      <h2>Who runs it</h2>
      <p>
        I am <a href={`${PORTFOLIO_URL}/`}>Yaseen Khatib</a>, a software developer in Hyderabad. This is a small project I build and maintain alone: I read the official bulletins and notices, put the figures into one data file, and write the pages around them. There is no coaching business, editorial team or sponsor behind it.
      </p>
      <p>
        I started it because the dates, fees and rules for the big entrance exams are scattered across long PDFs, and the pages that rank for them are often coaching sites that repeat last year&apos;s numbers. This site does one narrow thing: for each exam it shows what the official document says, links to that document, and shows the day I read it.
      </p>

      <h2>What it covers</h2>
      <p>Four exams, chosen because their bodies publish clear official bulletins: JEE Main, NEET (UG), CUET (UG) and the UPSC Civil Services Examination. For each one there is an overview with dates, and where the official source has the facts, separate pages for how to apply, eligibility, exam pattern and application fee, plus a complete guide that puts the application route, syllabus pointers, official study material and the steps after applying on one page. The calendar page lists every dated deadline and exam day across the four.</p>
      <p>I add an exam only when I can source it from the exam body&apos;s own site and its pages would not be thin copies of each other. That is why the list is short.</p>

      <h2>What it does not do</h2>
      <ul>
        <li>It is not affiliated with the National Testing Agency, the UPSC or any exam body, and cannot take an application or a fee. Apply and pay only on the official site.</li>
        <li>It does not predict dates, cut-offs, ranks or results, and does not sell coaching, test series or admission help.</li>
        <li>It does not use news sites or coaching sites as a source. If the official site has not published something, the page says &ldquo;not announced yet&rdquo;.</li>
      </ul>

      <h2>How the facts are kept current</h2>
      <p>
        Every fact lives in one data file with its source link and checked date, and the site refuses to build if a block loses either, or cites a source that is not an official government domain. A daily job looks at the official pages and every PDF the site cites and opens an issue when a new notice or a changed document appears; it never edits the site. I then read the notice, update the figures and the checked date. A page whose facts were last read more than 30 days ago shows a warning. The site is rebuilt every day so that lists of upcoming dates drop days that have passed. The method is described in more detail on <Link href="/how-we-check/">How we check</Link>.
      </p>
      <p>
        The government sites sometimes refuse automated readers (the daily job gets an access error from some NTA pages), so some changes are only caught when I read the pages by hand. If you see a figure that disagrees with the official document, please tell me.
      </p>

      <h2>The official documents behind each exam</h2>
      <p>This list is generated from the same data file the pages use, so it always matches what the pages cite.</p>
      {EXAMS.map((e) => (
        <section key={e.slug}>
          <h3>
            <Link href={`/${e.slug}/`}>{e.name}</Link>
          </h3>
          <ul>
            {sourcesOf(e).map(([url, s]) => (
              <li key={url}>
                <a href={url} rel="noopener">{s.name}</a>: used for {s.used.join(", ").toLowerCase()}; read on {prettyDate(s.checked)}.
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Money</h2>
      <p>
        The site is free and shows no ads today. I may apply for Google AdSense later to pay for running it. If ads ever appear they will be labelled and kept away from tables and links, and they will not influence what the pages say. See the <Link href="/privacy/">privacy policy</Link> for what changes then.
      </p>

      <h2>Contact</h2>
      <p>
        Corrections, questions and privacy requests: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or the <Link href="/contact/">contact page</Link>. The <Link href="/terms/">terms of use</Link> explain what the site can and cannot be relied on for.
      </p>
    </article>
  );
}
