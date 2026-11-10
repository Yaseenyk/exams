import type { Block } from "@/lib/exams";

export const prettyDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Whole days between the day a block was checked and the day the site was built. */
const ageDays = (iso: string) => Math.floor((Date.now() - Date.parse(`${iso}T00:00:00Z`)) / 864e5);

/** One block of sourced rows as a table, with its source and the day it was checked underneath. */
export default function FactTable({ block, caption }: { block: Block; caption: string }) {
  return (
    <section className="mt-6">
      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="border-b border-zinc-800 bg-zinc-900/60 px-4 py-3 text-left text-base font-semibold text-zinc-50">{caption}</caption>
          <tbody>
            {block.rows.map((r) => (
              <tr key={r.label} className="border-b border-zinc-800/70 align-top last:border-0">
                <th scope="row" className="w-2/5 px-4 py-3 font-medium text-zinc-300">{r.label}</th>
                <td className="px-4 py-3 text-zinc-100">
                  {r.value}
                  {r.note && <span className="mt-1 block text-xs leading-relaxed text-zinc-500">{r.note}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500">
        Source: <a href={block.source} rel="noopener" className="text-zinc-300 underline">{block.sourceName}</a>. Checked on {prettyDate(block.checked)}.
      </p>
      {ageDays(block.checked) > 30 && (
        <p className="mt-2 rounded-lg border border-amber-500/40 bg-amber-500/5 px-3 py-2 text-xs leading-relaxed text-amber-200">
          This was last checked {ageDays(block.checked)} days ago and may be out of date. Confirm on the official site before you rely on it.
        </p>
      )}
    </section>
  );
}
