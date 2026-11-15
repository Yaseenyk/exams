import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";

const TITLE = "Privacy";

export const metadata: Metadata = {
  title: { absolute: "Privacy | Exam Dates India" },
  description: "What this site collects: visit statistics (Google Analytics, Microsoft Clarity, a first-party visit counter), cookies, and Google AdSense if it is ever switched on, with how to opt out. No accounts, no forms.",
  alternates: { canonical: `${SITE_URL}/privacy/` },
  robots: { index: true, follow: true },
};

export default function Privacy() {
  return (
    <article className="prose-guide">
      <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">{TITLE}</h1>
      <p className="text-sm text-zinc-500">Last updated 16 November 2026. The site is run by Yaseen Khatib, Hyderabad, India.</p>
      <p>This site has no accounts and no forms. It does not ask for your name, number or email.</p>
      <h2>Visit statistics</h2>
      <p>
        We use three tools to count visits and see which pages are read, so we know what to keep up to date:
      </p>
      <ul>
        <li><strong>Google Analytics</strong> counts visits, pages, clicks on links to official sites and the site or campaign that sent you. It sets cookies or similar identifiers.</li>
        <li><strong>Microsoft Clarity</strong> may record anonymised sessions (clicks, scrolling and page layout) to show where a page is hard to use. It also sets cookies or similar identifiers.</li>
        <li><strong>A small counter run by me</strong> (&ldquo;pulse&rdquo;, on my own server) records page views, the page you came from and link clicks, and whether the visit looks like a person or a bot. It sets no cookies and stores no IP address, name or anything you type. Records are deleted after 90 days. It switches itself off if your browser sends Do Not Track or Global Privacy Control.</li>
      </ul>
      <p>
        Google Analytics and Clarity load after you first interact with the page. We do not combine any of this with anything that identifies you. You can block the cookies in your browser settings, use Google&apos;s <a href="https://tools.google.com/dlpage/gaoptout">Analytics opt-out add-on</a>, or turn on Do Not Track.
      </p>
      <h2>Cookies</h2>
      <p>
        The only cookies or local storage on this site come from the analytics tools above (and from Google, if ads are ever switched on). The site itself does not set cookies and keeps nothing about you in your browser except a note of the first site that sent you, used for the analytics reports. Clearing your browser data removes it.
      </p>
      <h2>Advertising</h2>
      <p>
        The site shows no ads today. If Google AdSense approves it and ads are switched on, Google and its partners may use cookies to show ads based on your visits to this and other sites. Ads are labelled and never change what a page says. You can opt out of personalised ads at <a href="https://adssettings.google.com/">adssettings.google.com</a>, in your Google account settings, or at <a href="https://www.aboutads.info/choices/">aboutads.info</a>; you will still see ads, just not personalised ones. This policy will be updated before any ad appears. Google explains how it uses data from sites that use its services at <a href="https://policies.google.com/technologies/partner-sites">policies.google.com/technologies/partner-sites</a>.
      </p>
      <h2>Links to official sites</h2>
      <p>When you follow a link to an exam body&apos;s site, that site&apos;s own privacy policy applies.</p>
      <h2>Your rights and contact</h2>
      <p>
        Ask what is held about you, or ask for it to be deleted, by emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Because the site does not know who you are, we can usually only help with email you have sent us. See also the <Link href="/terms/">terms of use</Link> and <Link href="/about/">about page</Link>.
      </p>
    </article>
  );
}
