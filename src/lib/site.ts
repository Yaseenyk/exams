/** Production base URL: canonical links, OpenGraph, JSON-LD, sitemap. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exams.streamerosai.com";

export const SITE_NAME = "Exam Dates India";

/** The author's portfolio. Links to it are deliberate and few. */
export const PORTFOLIO_URL = "https://yk.streamerosai.com";

export const SITE_DESCRIPTION =
  "Dates, eligibility, exam pattern and fees for India's big entrance exams (JEE Main, NEET UG, CUET UG, UPSC CSE), each read from the official document and shown with its source and the day it was checked.";

/** Search-engine verification codes. Empty strings are omitted from the page. */
export const VERIFICATION = { google: "OG5PRiRPw3I5jB5p-G7nDzf_mlxdiZzrpLaFYCZ0p1M", bing: "" };

/** GA4 measurement ID and Clarity project ID. Create a GA4 web stream for exams.streamerosai.com and paste the G- ID here;
 *  empty means the tag is not emitted. */
export const GA_ID = "G-WPXKT5VZKH";
export const CLARITY_ID = "";

/** AdSense publisher account (ownership meta tag only: it loads nothing). */
export const ADSENSE_ACCOUNT = "ca-pub-9421223162668437";

export const CONTACT_EMAIL = "contact@streamerosai.com";

/**
 * Google AdSense. Every ad space on the site is an <AdSlot slot="..."/>.
 *   "off":  renders nothing visible (the slot names stay in the markup as data-ad-slot). Used until AdSense approves the domain.
 *   "live": loads AdSense and fills the slots; needs ADSENSE_CLIENT and, per slot, an ad unit id in AD_UNITS.
 */
export const AD_MODE: "off" | "live" = "off";
export const ADSENSE_CLIENT = ""; // "ca-pub-XXXXXXXXXXXXXXXX"
export const AD_UNITS: Record<string, string> = {}; // slot name -> AdSense ad unit id (data-ad-slot)
