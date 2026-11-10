import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EXAMS, SECTIONS, bySlug, sectionsOf } from "@/lib/exams";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import FactTable from "@/components/FactTable";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";

export const dynamicParams = false;
export const generateStaticParams = () => EXAMS.flatMap((e) => sectionsOf(e).map((s) => ({ exam: e.slug, section: s.slug })));

const TITLES: Record<string, (n: string) => string> = {
  eligibility: (n) => `${n} eligibility: who can apply`,
  "exam-pattern": (n) => `${n} exam pattern: papers, marks and marking scheme`,
  fees: (n) => `${n} application fee by category`,
};
const INTROS: Record<string, string> = {
  eligibility: "Who may sit the exam, read from the exam body's own bulletin. Colleges and universities can add their own rules on top, so check the institute you want to join as well.",
  "exam-pattern": "How the paper is built: subjects, number of questions, marks and the marking scheme, read from the official bulletin.",
  fees: "What it costs to apply, by category, read from the official bulletin. Payment gateway charges and GST are added by the bank or gateway and are not part of these figures.",
};

export function generateMetadata({ params }: { params: { exam: string; section: string } }): Metadata {
  const e = bySlug(params.exam);
  const s = SECTIONS.find((x) => x.slug === params.section);
  if (!e || !s) return {};
  const title = TITLES[s.slug](e.name);
  const description = `${INTROS[s.slug]} Cycle: ${e.cycle}.`.slice(0, 300);
  const url = `${SITE_URL}/${e.slug}/${s.slug}/`;
  return { title: { absolute: title }, description, alternates: { canonical: url }, openGraph: { type: "website", url, title, description, siteName: "Exam Dates India", locale: "en_IN" } };
}

export default function SectionPage({ params }: { params: { exam: string; section: string } }) {
  const e = bySlug(params.exam);
  const s = SECTIONS.find((x) => x.slug === params.section);
  if (!e || !s || !e[s.key]) notFound();
  const block = e[s.key]!;
  const title = TITLES[s.slug](e.name);
  const path = `/${e.slug}/${s.slug}/`;
  return (
    <article className="prose-guide">
      <JsonLd data={breadcrumbJsonLd([{ name: e.short, path: `/${e.slug}/` }, { name: s.title, path }])} />
      <JsonLd data={webPageJsonLd({ title, description: INTROS[s.slug], path, modified: block.checked })} />
      <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">{title}</h1>
      <p className="text-lg">{INTROS[s.slug]}</p>
      <p>
        These figures are for: <strong className="text-zinc-100">{e.cycle}</strong>.
      </p>
      <FactTable block={block} caption={s.title} />
      <AdSlot slot="section-mid" label="Advertisement" />
      {e.pending.length > 0 && (
        <p className="text-sm text-zinc-400">
          Not announced yet for the next cycle: {e.pending.join("; ")}. See the <Link href={`/${e.slug}/`}>{e.short} page</Link> for the latest dates.
        </p>
      )}
      <p className="mt-8 text-sm text-zinc-500">
        More on {e.short}: <Link href={`/${e.slug}/`}>dates</Link>
        {sectionsOf(e).filter((x) => x.slug !== s.slug).map((x) => (
          <span key={x.slug}>, <Link href={`/${e.slug}/${x.slug}/`}>{x.title.toLowerCase()}</Link></span>
        ))}
        . Official site: <a href={e.officialSite} rel="noopener">{e.officialName}</a>.
      </p>
    </article>
  );
}
