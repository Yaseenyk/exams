import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CALENDAR, EXAMS, SECTIONS, bySlug, sectionsOf } from "@/lib/exams";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import FactTable, { prettyDate } from "@/components/FactTable";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";
import Timeline from "@/components/Timeline";

export const dynamicParams = false;
export const generateStaticParams = () => EXAMS.map((e) => ({ exam: e.slug }));

const titleOf = (name: string) => `${name}: dates and how to apply`;
const descOf = (e: NonNullable<ReturnType<typeof bySlug>>) =>
  `${e.name} dates, read from ${e.officialName}. ${e.statusNow} Each date links to the official document and shows the day it was checked.`.slice(0, 300);

export function generateMetadata({ params }: { params: { exam: string } }): Metadata {
  const e = bySlug(params.exam);
  if (!e) return {};
  const url = `${SITE_URL}/${e.slug}/`;
  return {
    title: { absolute: titleOf(e.name) },
    description: descOf(e),
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: titleOf(e.name), description: descOf(e), siteName: "Exam Dates India", locale: "en_IN", images: [{ url: `${SITE_URL}/og/${e.slug}.png`, width: 1200, height: 630, alt: e.name }] },
    twitter: { card: "summary_large_image", title: titleOf(e.name), description: descOf(e), images: [`${SITE_URL}/og/${e.slug}.png`] },
  };
}

export default function ExamPage({ params }: { params: { exam: string } }) {
  const e = bySlug(params.exam);
  if (!e) notFound();
  const path = `/${e.slug}/`;
  return (
    <article className="prose-guide">
      <JsonLd data={breadcrumbJsonLd([{ name: e.short, path }])} />
      <JsonLd data={webPageJsonLd({ title: titleOf(e.name), description: descOf(e), path, modified: e.dates.checked })} />
      <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">{titleOf(e.name)}</h1>
      <p className="text-lg">{e.what}</p>
      <p>
        Run by {e.conductedBy}. Facts below are for: <strong className="text-zinc-100">{e.cycle}</strong>.
      </p>
      {e.portals && (
        <p className="rounded-xl border border-cyan/40 bg-cyan/5 p-4">
          <strong className="text-zinc-50">New to this exam?</strong> Read the <Link href={`/${e.slug}/complete-guide/`}>complete guide</Link>: who can apply, where to log in, how to apply, the syllabus, where to study from, exam day, and a checklist, all in one page.
        </p>
      )}

      <h2>What the official site shows now</h2>
      <p>{e.statusNow}</p>
      <p className="text-sm text-zinc-500">As of {prettyDate(e.dates.checked)}, on <a href={e.officialSite} rel="noopener">{e.officialName}</a>.</p>

      <Timeline title="The dates in order" events={CALENDAR.filter((c) => c.exam.slug === e.slug)} />

      <FactTable block={e.dates} caption="Key dates" />

      {e.applyAt && (
        <p className="mt-6">
          <a href={e.applyAt.url} rel="noopener" className="inline-flex min-h-11 items-center rounded-lg bg-cyan px-4 font-semibold !text-ink !no-underline hover:opacity-90">{e.applyAt.label}</a>
          <span className="ml-3 text-sm text-zinc-500">Opens the official site, not ours.</span>
        </p>
      )}

      <AdSlot slot="exam-mid" label="Advertisement" />

      {e.pending.length > 0 && (
        <>
          <h2>Not announced yet</h2>
          <p>The official site had not published these when we checked. We do not guess, and this page will be updated when they appear.</p>
          <ul>
            {e.pending.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </>
      )}

      {sectionsOf(e).length > 0 && (
        <>
          <h2>More about {e.short}</h2>
          <ul>
            {sectionsOf(e).map((s) => (
              <li key={s.slug}>
                <Link href={`/${e.slug}/${s.slug}/`}>{e.short} {s.title.toLowerCase()}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="mt-10 text-sm text-zinc-500">
        Other exams: {EXAMS.filter((x) => x.slug !== e.slug).map((x, i) => (
          <span key={x.slug}>{i ? ", " : ""}<Link href={`/${x.slug}/`}>{x.short}</Link></span>
        ))}
        . <Link href="/calendar/">All dates in one list</Link>.
      </p>
      <span hidden>{SECTIONS.length}</span>
    </article>
  );
}
