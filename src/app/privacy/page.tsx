import type { Metadata } from "next";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";

const TITLE = "Privacy";

export const metadata: Metadata = {
  title: { absolute: "Privacy | Exam Dates India" },
  description: "What this site collects: aggregate visit statistics and, once approved, Google ads. No accounts, no forms.",
  alternates: { canonical: `${SITE_URL}/privacy/` },
  robots: { index: true, follow: true },
};

export default function Privacy() {
  return (
    <article className="prose-guide">
      <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">{TITLE}</h1>
      <p>This site has no accounts and no forms. It does not ask for your name, number or email.</p>
      <h2>Visit statistics</h2>
      <p>
        We use Google Analytics and Microsoft Clarity to count visits and see which pages are read, so we know what to keep up to date. They set cookies or similar identifiers. The scripts load after you first interact with the page. We do not combine this with anything that identifies you.
      </p>
      <h2>Advertising</h2>
      <p>
        Once Google AdSense approves the site, it may show ads. Google and its partners may use cookies to show ads based on your visits to this and other sites. You can manage ad personalisation in your Google account settings and at <a href="https://adssettings.google.com/">adssettings.google.com</a>.
      </p>
      <h2>Links to official sites</h2>
      <p>When you follow a link to an exam body&apos;s site, that site&apos;s own privacy policy applies.</p>
      <h2>Contact</h2>
      <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
    </article>
  );
}
