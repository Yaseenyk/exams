import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const TITLE = "How we check exam facts";
const DESC = "Where every date, rule and fee on this site comes from, how often it is re-checked, and what we will not do.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Exam Dates India` },
  description: DESC,
  alternates: { canonical: `${SITE_URL}/how-we-check/` },
  openGraph: { type: "website", url: `${SITE_URL}/how-we-check/`, title: TITLE, description: DESC, siteName: "Exam Dates India", locale: "en_IN" },
};

export default function HowWeCheck() {
  return (
    <article className="prose-guide">
      <JsonLd data={breadcrumbJsonLd([{ name: "How we check", path: "/how-we-check/" }])} />
      <JsonLd data={webPageJsonLd({ title: TITLE, description: DESC, path: "/how-we-check/", modified: "2026-11-10" })} />
      <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">{TITLE}</h1>
      <p className="text-lg">{DESC}</p>

      <h2>Where the facts come from</h2>
      <p>
        Only the exam body&apos;s own documents: the information bulletin, the public notice, or the annual calendar, published on the official site (nta.nic.in sites for JEE Main, NEET UG and CUET UG; upsc.gov.in for the Civil Services Examination). We do not copy from news sites, coaching sites or social media, because those repeat mistakes and go out of date.
      </p>

      <h2>What you will see on every page</h2>
      <ul>
        <li>A link to the exact document each table was read from.</li>
        <li>The day we last read it.</li>
        <li>A warning if that day is more than 30 days ago.</li>
        <li>A plain &ldquo;not announced yet&rdquo; list for anything the official site has not published, instead of a guess or last year&apos;s number dressed up as this year&apos;s.</li>
      </ul>

      <h2>When the next bulletin is not out yet</h2>
      <p>
        NTA publishes the bulletin for each cycle a few months before the exam. Until then, pages show the latest bulletin and say which year it is for. Fees, patterns and eligibility often stay the same from year to year, but they can change, so treat last year&apos;s rules as a guide and confirm on the official site.
      </p>

      <h2>How it is enforced</h2>
      <p>
        Every fact lives in one data file. The site refuses to build if any block of facts loses its source link or its checked date. A person reads each change before it is published. We do not publish anything we cannot link to an official document.
      </p>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not predict dates, cut-offs or results.</li>
        <li>We do not sell coaching, test series or admission help.</li>
        <li>We are not affiliated with any exam body. This site cannot take your application or fee. Always apply and pay on the official site.</li>
      </ul>

      <h2>Spotted a mistake?</h2>
      <p>
        Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the page and the official document that says otherwise. We fix confirmed errors the same day. <Link href="/">Back to the exams</Link>.
      </p>
    </article>
  );
}
