import Link from "next/link";
import { CALENDAR, EXAMS } from "@/lib/exams";
import { prettyDate } from "@/components/FactTable";
import AdSlot from "@/components/AdSlot";

const today = () => new Date().toISOString().slice(0, 10);

export default function Home() {
  const upcoming = CALENDAR.filter((c) => c.date >= today()).slice(0, 5);
  return (
    <article className="prose-guide">
      <h1 className="text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl">Exam dates, eligibility, pattern and fees for India&apos;s big entrance exams</h1>
      <p className="text-lg">
        Every date, rule and fee on this site was read from the exam body&apos;s own document (the information bulletin, public notice or annual calendar). Each table links to that document and shows the day it was checked. When the official site has not published something yet, the page says so instead of guessing.
      </p>

      {upcoming.length > 0 && (
        <section aria-labelledby="soon" className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 id="soon" className="!mt-0 text-xl font-semibold text-zinc-50">Coming up</h2>
          <ul className="!mt-3 space-y-3 !pl-0 [list-style:none]">
            {upcoming.map((c) => (
              <li key={c.date + c.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                <span className="w-44 shrink-0 font-mono text-sm text-cyan">{prettyDate(c.date)}</span>
                <span>
                  {c.label}{" "}
                  <Link href={`/${c.exam.slug}/`} className="text-sm">details</Link>
                </span>
              </li>
            ))}
          </ul>
          <p className="!mt-4 text-sm text-zinc-500">
            <Link href="/calendar/">See every date in one list</Link>
          </p>
        </section>
      )}

      <h2>The exams</h2>
      <ul className="!mt-4 grid gap-4 !pl-0 [list-style:none] sm:grid-cols-2">
        {EXAMS.map((e) => (
          <li key={e.slug} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h3 className="!mt-0 text-lg font-semibold text-zinc-50">
              <Link href={`/${e.slug}/`} className="!no-underline hover:!underline">{e.name}</Link>
            </h3>
            <p className="!mt-2 text-sm">{e.statusNow}</p>
            <p className="!mt-3 text-sm text-zinc-500">Run by {e.conductedBy}</p>
          </li>
        ))}
      </ul>

      <AdSlot slot="home-mid" label="Advertisement" />

      <h2>How this site works</h2>
      <p>
        There is one page per question: dates and how to apply, eligibility, exam pattern, and the application fee. The facts live in one data file and the site refuses to build if any entry loses its source link or its checked date. Read <Link href="/how-we-check/">how we check</Link> for the full method and what we do not do.
      </p>
      <p>
        This site is independent. It is not run by, or affiliated with, the National Testing Agency, the Union Public Service Commission or any exam body. Use it to find the right official page fast, then confirm there before you apply or pay.
      </p>
    </article>
  );
}
