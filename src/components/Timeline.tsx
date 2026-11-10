import type { CalendarEvent } from "@/lib/exams";
import { prettyDate } from "./FactTable";

const today = () => new Date().toISOString().slice(0, 10);

/**
 * A vertical timeline of an exam's dated events, drawn from the same facts as the table (nothing typed twice).
 * Past dates are dimmed, the next one is highlighted. It is a plain ordered list, so it reads well without styles.
 */
export default function Timeline({ events, title }: { events: CalendarEvent[]; title: string }) {
  if (events.length < 2) return null;
  const now = today();
  const next = events.find((e) => e.date >= now)?.date;
  return (
    <section aria-label={title} className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
      <h2 className="!mt-0 text-lg font-semibold text-zinc-50">{title}</h2>
      <ol className="!mt-4 !list-none !space-y-0 !pl-0">
        {events.map((e, i) => {
          const past = e.date < now;
          const isNext = e.date === next && !past;
          return (
            <li key={e.date + e.label} className="relative flex gap-4 pb-5 last:pb-0">
              <span aria-hidden="true" className="relative flex w-3 shrink-0 justify-center">
                {i < events.length - 1 && <span className="absolute top-3 h-full w-px bg-zinc-700" />}
                <span className={`relative mt-1.5 h-3 w-3 rounded-full border-2 ${isNext ? "border-cyan bg-cyan shadow-[0_0_0_4px_rgba(34,211,238,0.15)]" : past ? "border-zinc-600 bg-zinc-800" : "border-cyan bg-ink"}`} />
              </span>
              <div className={past ? "opacity-50" : ""}>
                <p className={`!mt-0 font-mono text-sm ${isNext ? "text-cyan" : "text-zinc-400"}`}>
                  {prettyDate(e.date)}
                  {isNext && <span className="ml-2 rounded bg-cyan/10 px-1.5 py-0.5 text-[11px] font-sans font-semibold text-cyan">next</span>}
                </p>
                <p className="!mt-0.5 text-zinc-100">{e.label}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
