import { AD_MODE, ADSENSE_CLIENT, AD_UNITS } from "@/lib/site";

/**
 * One Google ad space. While AD_MODE is "off" nothing is drawn (the slot name stays in the markup as data-ad-slot).
 * When "live" the box reserves its height up front so a late ad never shifts the text, and it is kept away from the
 * tables and links people tap: AdSense forbids placements that invite accidental clicks.
 */
export default function AdSlot({ slot, label }: { slot: string; label: string }) {
  if (AD_MODE !== "live" || !ADSENSE_CLIENT || !AD_UNITS[slot]) return <div data-ad-slot={slot} aria-hidden="true" />;
  return (
    <aside data-ad-slot={slot} aria-label={label} className="my-10 min-h-[250px] text-center sm:min-h-[280px]">
      <p className="mb-1 text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={ADSENSE_CLIENT} data-ad-slot={AD_UNITS[slot]} data-ad-format="auto" data-full-width-responsive="true" />
    </aside>
  );
}
