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
      <p className="text-sm text-zinc-500">Last updated 24 November 2026. The site is run by Yaseen Khatib, Hyderabad, India.</p>
      <p>This site has no accounts and no forms. It does not ask for your name, number or email.</p>
      <h2>Visit statistics</h2>
      <p>
        We use three tools to count visits and see which pages are read, so we know what to keep up to date:
      </p>
      <ul>
        <li><strong>Google Analytics</strong> (googletagmanager.com) counts visits, pages, clicks on links to official sites and the site or campaign that sent you. It sets cookies (<code>_ga</code>, <code>_ga_*</code>). Google signals is on, so for visitors signed in to a Google account with ad personalisation turned on, Google may associate this site&apos;s visit data with that account to give us aggregated reports on age group, gender and interests; no individual is identified to us. You can turn this off in your Google account under Data &amp; privacy, or in <a href="https://myadcenter.google.com/">My Ad Center</a>.</li>
        <li><strong>Microsoft Clarity</strong> (clarity.ms) records session replays and heatmaps (mouse movement, clicks, scrolling and page layout) to show where a page is hard to use. It sets its own cookies (<code>_clck</code>, <code>_clsk</code>) and Microsoft cookies on clarity.ms and bing.com (such as <code>MUID</code>). Microsoft explains its use in the <a href="https://privacy.microsoft.com/privacystatement">Microsoft privacy statement</a>.</li>
        <li><strong>Pulse, a small counter run by me</strong> (a script from pulse.yaseenyk.workers.dev, a Cloudflare Worker) records the page (without the query string), the page you came from and campaign tags, country, device type, browser and system name, screen size, language, the name of your network provider, scroll depth, time on the page, page speed, and which links and buttons were clicked, so it can tell a person from a bot. Since 24 November 2026 it also records a few technical details: up to three script error messages per page (the message, script file and line), whether your browser translated the page and into which language, the connection type (such as 4g or 3g), how fast the page responded to a tap, layout jumps, and the name of a form that was sent or started but not sent (never what was typed; this site has no forms today). It sets no cookies and stores no IP address or browser string. The IP address is used in memory only, to limit abuse and to make a visitor code that changes every day (a one-way hash with a random salt that is deleted the next day), so visits cannot be linked across days. Records are deleted after 90 days. It switches itself off if your browser sends Do Not Track or Global Privacy Control.</li>
      </ul>
      <p>
        Google Analytics and Clarity load after you first interact with the page. We do not combine any of this with anything that identifies you. You can block the cookies in your browser settings, use Google&apos;s <a href="https://tools.google.com/dlpage/gaoptout">Analytics opt-out add-on</a>, or block them with a browser extension. Do Not Track or Global Privacy Control turns off the Pulse counter.
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
