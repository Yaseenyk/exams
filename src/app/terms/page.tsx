import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const TITLE = "Terms of use";
const DESC = "The terms for using Exam Dates India: information only, always confirm on the official site, no affiliation with any exam body, and how errors are handled.";

export const metadata: Metadata = {
  title: { absolute: "Terms of use | Exam Dates India" },
  description: DESC,
  alternates: { canonical: `${SITE_URL}/terms/` },
  openGraph: { type: "website", url: `${SITE_URL}/terms/`, title: TITLE, description: DESC, siteName: "Exam Dates India", locale: "en_IN" },
};

export default function Terms() {
  return (
    <article className="prose-guide">
      <JsonLd data={breadcrumbJsonLd([{ name: "Terms", path: "/terms/" }])} />
      <JsonLd data={webPageJsonLd({ title: TITLE, description: DESC, path: "/terms/", modified: "2026-11-16" })} />
      <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">{TITLE}</h1>
      <p className="text-lg">{DESC} Last updated 16 November 2026.</p>

      <h2>Information only</h2>
      <p>
        Exam Dates India summarises what exam bodies have published about their exams. It is general information, not official notification, and not advice about whether or how you should apply. Exam bodies change dates, fees and rules, often by a public notice with little warning.
      </p>

      <h2>Always confirm on the official site</h2>
      <p>
        Every page links to the official document its figures were read from and shows the day it was read. Before you apply, pay a fee or rely on a deadline, confirm it on the exam body&apos;s own website. Where the next cycle&apos;s bulletin is not out yet, a page may show the latest published rules and says which year they are for; those can change. I do my best to keep the facts correct and current but give no warranty that they are, and I am not liable for a missed deadline, a lost fee or any other loss that follows from relying on the site.
      </p>

      <h2>No affiliation</h2>
      <p>
        The site is independent. It is not run by, endorsed by or connected to the National Testing Agency, the Union Public Service Commission or any other exam body, institution or coaching provider. Exam names are used only to say which exam a page is about. The site cannot accept an application or a payment.
      </p>

      <h2>Errors</h2>
      <p>
        If you find an error, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the page and the official document that says otherwise. Confirmed errors are corrected and the checked date updated.
      </p>

      <h2>Links to other sites</h2>
      <p>Pages link to official websites and documents. I do not control them and their own terms and privacy policies apply when you follow a link.</p>

      <h2>Content and reuse</h2>
      <p>
        The text and layout were written for this site. You may quote short passages with a link back to the page, but please do not copy whole pages. The figures themselves come from public documents of the exam bodies and are not owned by me.
      </p>

      <h2>Advertising</h2>
      <p>
        The site shows no ads today. If that changes, ads will be labelled and served by Google AdSense, and the <Link href="/privacy/">privacy policy</Link> explains the cookies involved and how to opt out of personalised ads.
      </p>

      <h2>Changes</h2>
      <p>I may update these terms. The date above shows the latest version. Contact: <Link href="/contact/">contact page</Link>. These terms are governed by the laws of India.</p>
    </article>
  );
}
