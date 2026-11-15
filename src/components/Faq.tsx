import type { Faq } from "@/lib/faq";
import { faqJsonLd } from "@/lib/seo";
import JsonLd from "./JsonLd";

/** Questions people search for, each answered only with rows from the sourced tables above. */
export default function FaqList({ items }: { items: Faq[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="faq-h" className="mt-10">
      <JsonLd data={faqJsonLd(items)} />
      <h2 id="faq-h">Common questions</h2>
      <p className="text-sm text-zinc-500">Each answer repeats a row from the tables on this site, with the same source and date.</p>
      <dl className="!mt-4 space-y-5">
        {items.map((f) => (
          <div key={f.q}>
            <dt className="font-semibold text-zinc-50">{f.q}</dt>
            <dd className="!mt-1 ml-0 text-zinc-300">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
