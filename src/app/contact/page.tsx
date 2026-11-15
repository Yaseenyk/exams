import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, CONTACT_EMAIL, PORTFOLIO_URL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const TITLE = "Contact Exam Dates India";
const DESC = "How to report a wrong date or fee, ask about the site or request deletion of your data, and what this site cannot help with.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE}: report a mistake or ask a question` },
  description: DESC,
  alternates: { canonical: `${SITE_URL}/contact/` },
  openGraph: { type: "website", url: `${SITE_URL}/contact/`, title: TITLE, description: DESC, siteName: "Exam Dates India", locale: "en_IN" },
};

export default function Contact() {
  return (
    <article className="prose-guide">
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact/" }])} />
      <JsonLd data={webPageJsonLd({ title: TITLE, description: DESC, path: "/contact/", modified: "2026-11-16" })} />
      <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">Contact</h1>
      <p className="text-lg">
        Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. This is a one-person site and I read every message myself, so a reply can take a few days.
      </p>

      <h2>Report a wrong or out-of-date fact</h2>
      <p>
        This is the most useful message you can send. Tell me the page, the figure you think is wrong and the official document or notice that says otherwise (a link or the notice number is enough). I check it against the official source and, if you are right, change the figure and the checked date.
      </p>

      <h2>Ask about the site</h2>
      <p>Something that does not load, a page that is hard to read on your phone, or a question about where a figure came from. The source of every figure is linked on its page and listed on the <Link href="/about/">about page</Link>.</p>

      <h2>Your data</h2>
      <p>The site has no accounts and no forms, so it holds no personal data about you apart from what is described in the <Link href="/privacy/">privacy policy</Link>. If you email me, I keep the message only as long as needed to answer it. Ask me to delete it any time.</p>

      <h2>What I cannot help with</h2>
      <ul>
        <li>I cannot see or change your application, admit card, fee payment or result. Those are with the exam body: use the official site and its helpline.</li>
        <li>I cannot tell you whether you will qualify, what a cut-off will be, or which college to pick.</li>
        <li>I do not sell coaching or admission services, and I cannot recommend any.</li>
      </ul>

      <h2>Please do not send</h2>
      <p>Application numbers with passwords, OTPs, Aadhaar numbers, payment details or scanned documents. I never need them.</p>

      <h2>Who you are writing to</h2>
      <p>
        The site is built by <a href={`${PORTFOLIO_URL}/`}>Yaseen Khatib</a> in Hyderabad.
      </p>
    </article>
  );
}
