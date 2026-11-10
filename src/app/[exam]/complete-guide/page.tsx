import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CALENDAR, EXAMS, bySlug, sectionsOf } from "@/lib/exams";
import type { Block, Exam } from "@/lib/exams";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import FactTable from "@/components/FactTable";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";
import Timeline from "@/components/Timeline";

export const dynamicParams = false;
export const generateStaticParams = () => EXAMS.filter((e) => e.portals).map((e) => ({ exam: e.slug }));

const titleOf = (e: Exam) => `${e.short}: the complete guide, from login to result`;
const descOf = (e: Exam) =>
  `Everything in one page for ${e.name}: who can apply, where to log in, how to apply, the syllabus, where to find study material, the admit card and exam day, and a checklist. Every step links to the official source.`;

export function generateMetadata({ params }: { params: { exam: string } }): Metadata {
  const e = bySlug(params.exam);
  if (!e) return {};
  const url = `${SITE_URL}/${e.slug}/complete-guide/`;
  return {
    title: { absolute: titleOf(e) },
    description: descOf(e),
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: titleOf(e), description: descOf(e), siteName: "Exam Dates India", locale: "en_IN", images: [{ url: `${SITE_URL}/og/${e.slug}.png`, width: 1200, height: 630, alt: e.name }] },
    twitter: { card: "summary_large_image", title: titleOf(e), description: descOf(e), images: [`${SITE_URL}/og/${e.slug}.png`] },
  };
}

interface Part {
  id: string;
  title: string;
  lead: string;
  blocks: { block?: Block; caption: string }[];
}

function partsOf(e: Exam): Part[] {
  return [
    {
      id: "eligibility",
      title: "1. Can you sit this exam?",
      lead: "Check this first. It is read from the official bulletin or notice, and the institute or university you want may add its own rules.",
      blocks: [{ block: e.eligibility, caption: "Who can apply" }],
    },
    {
      id: "apply",
      title: "2. Where to log in and how to apply",
      lead: "Everything happens on the official site. This is the order of the steps, the exact file sizes to prepare, and what to do if payment does not go through.",
      blocks: [
        { block: e.portals, caption: "Where to go and what you log in with" },
        { block: e.apply, caption: "The steps and the files to prepare" },
        { block: e.fees, caption: "What it costs" },
      ],
    },
    {
      id: "dates",
      title: "3. The dates, in order",
      lead: "Dates change, so confirm on the official site before you rely on one.",
      blocks: [{ block: e.dates, caption: "Key dates" }],
    },
    {
      id: "pattern",
      title: "4. How the exam is built",
      lead: "Papers, marks and the marking scheme, so you know how to spend the time.",
      blocks: [{ block: e.pattern, caption: "Exam pattern" }],
    },
    {
      id: "syllabus",
      title: "5. The syllabus",
      lead: "The unit and topic structure from the official syllabus document. The document itself has the detailed topics under each unit.",
      blocks: [{ block: e.syllabus, caption: "What is examined" }],
    },
    {
      id: "material",
      title: "6. Where to find study material",
      lead: "Only official sources are listed here: the syllabus, the bulletin, past papers and practice published by the exam body, and the links the official site itself gives.",
      blocks: [{ block: e.material, caption: "Official sources to study from" }],
    },
    {
      id: "exam-day",
      title: "7. Admit card, exam day and what comes after",
      lead: "What to download, what to carry and when to arrive, then how the answer key and result work.",
      blocks: [{ block: e.afterApply, caption: "From admit card to result" }],
    },
  ];
}

export default function CompleteGuide({ params }: { params: { exam: string } }) {
  const e = bySlug(params.exam);
  if (!e || !e.portals) notFound();
  const path = `/${e.slug}/complete-guide/`;
  const parts = partsOf(e).filter((p) => p.blocks.some((b) => b.block));
  const modified = [e.dates, e.eligibility, e.pattern, e.fees, e.apply, e.portals, e.syllabus, e.material, e.afterApply]
    .filter((b): b is Block => !!b)
    .map((b) => b.checked)
    .sort()
    .pop()!;
  return (
    <article className="prose-guide">
      <JsonLd data={breadcrumbJsonLd([{ name: e.short, path: `/${e.slug}/` }, { name: "Complete guide", path }])} />
      <JsonLd data={webPageJsonLd({ title: titleOf(e), description: descOf(e), path, modified })} />
      <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">{titleOf(e)}</h1>
      <p className="text-lg">
        The whole path for {e.name} in one page: whether you can sit it, where to log in, how to apply, the syllabus, where to study from, and what happens from the admit card to the result. Every step links to the official source, and every table shows the day it was checked.
      </p>
      <p>
        These facts are for: <strong className="text-zinc-100">{e.cycle}</strong>. Run by {e.conductedBy}. Official site: <a href={e.officialSite} rel="noopener">{e.officialName}</a>.
      </p>

      <nav aria-label="On this page" className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
        <p className="!mt-0 text-sm font-semibold text-zinc-50">On this page</p>
        <ol className="!mt-3 !list-none !space-y-1 !pl-0 text-sm">
          {parts.map((p) => (
            <li key={p.id}>
              <a href={`#${p.id}`}>{p.title}</a>
            </li>
          ))}
          {e.checklist && (
            <li>
              <a href="#checklist">8. Your checklist</a>
            </li>
          )}
        </ol>
      </nav>

      {e.pending.length > 0 && (
        <aside className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 text-sm leading-relaxed text-amber-100">
          <p className="!mt-0 font-semibold">Not announced yet</p>
          <ul className="!mt-2">
            {e.pending.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </aside>
      )}

      {parts.map((p, i) => (
        <section key={p.id} id={p.id} aria-labelledby={`${p.id}-h`} className="scroll-mt-6">
          <h2 id={`${p.id}-h`}>{p.title}</h2>
          <p>{p.lead}</p>
          {p.id === "dates" && <Timeline title="The dates in order" events={CALENDAR.filter((c) => c.exam.slug === e.slug)} />}
          {p.blocks.map((b) => (b.block ? <FactTable key={b.caption} block={b.block} caption={b.caption} /> : null))}
          {i === 2 && <AdSlot slot="guide-mid" label="Advertisement" />}
        </section>
      ))}

      {e.checklist && (
        <section id="checklist" aria-labelledby="checklist-h" className="scroll-mt-6">
          <h2 id="checklist-h">8. Your checklist</h2>
          <p>Tick these off as you go. Each one comes from the sections above.</p>
          <ul className="!mt-4 !list-none !space-y-3 !pl-0">
            {e.checklist.map((t, i) => (
              <li key={t}>
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-cyan-400" />
                  <span>
                    <span className="mr-2 font-mono text-xs text-zinc-500">{String(i + 1).padStart(2, "0")}</span>
                    {t}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10 text-sm text-zinc-500">
        Prefer a separate page for one topic? {sectionsOf(e).map((s, i) => (
          <span key={s.slug}>
            {i ? ", " : ""}
            <Link href={`/${e.slug}/${s.slug}/`}>{s.title.toLowerCase()}</Link>
          </span>
        ))}
        . Back to the <Link href={`/${e.slug}/`}>{e.short} dates page</Link>. This site is independent and cannot take your application: always apply and pay on the official site.
      </p>
    </article>
  );
}
