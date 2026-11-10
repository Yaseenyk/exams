import type { Metadata } from "next";
import Link from "next/link";
import { CALENDAR } from "@/lib/exams";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { prettyDate } from "@/components/FactTable";
import JsonLd from "@/components/JsonLd";

const TITLE = "Exam calendar: upcoming dates for JEE Main, NEET UG, CUET UG and UPSC CSE";
const DESC = "Every dated deadline and exam day we have a source for, in order. Each line links to the exam page with the official document and the day it was checked.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: `${SITE_URL}/calendar/` },
  openGraph: { type: "website", url: `${SITE_URL}/calendar/`, title: TITLE, description: DESC, siteName: "Exam Dates India", locale: "en_IN" },
};

const today = () => new Date().toISOString().slice(0, 10);

export default function CalendarPage() {
  const upcoming = CALENDAR.filter((c) => c.date >= today());
  return (
    <article className="prose-guide">
      <JsonLd data={breadcrumbJsonLd([{ name: "Calendar", path: "/calendar/" }])} />
      <JsonLd data={webPageJsonLd({ title: TITLE, description: DESC, path: "/calendar/", modified: "2026-11-10" })} />
      <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">Exam calendar</h1>
      <p className="text-lg">{DESC}</p>
      {upcoming.length === 0 ? (
        <p>Nothing dated is coming up right now. Check the exam pages for the next cycle.</p>
      ) : (
        <ol className="!mt-6 space-y-4 !pl-0 [list-style:none]">
          {upcoming.map((c) => (
            <li key={c.date + c.label} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <p className="!mt-0 font-mono text-sm text-cyan">{prettyDate(c.date)}</p>
              <p className="!mt-1 text-zinc-100">{c.label}</p>
              <p className="!mt-1 text-sm"><Link href={`/${c.exam.slug}/`}>{c.exam.short} details and source</Link></p>
            </li>
          ))}
        </ol>
      )}
      <p className="mt-8 text-sm text-zinc-500">
        Dates change. UPSC says its calendar dates are liable to alteration, and NTA publishes changes as public notices. Confirm on the official site.
      </p>
    </article>
  );
}
