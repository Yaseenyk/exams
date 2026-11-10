import type { MetadataRoute } from "next";
import { EXAMS, sectionsOf } from "@/lib/exams";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** Every page, each dated by the day its facts were last checked (never by the build day). */
export default function sitemap(): MetadataRoute.Sitemap {
  const latest = EXAMS.map((e) => e.dates.checked).sort().pop() ?? "2026-11-10";
  const out: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/calendar/`, lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/how-we-check/`, lastModified: "2026-11-10", changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/privacy/`, lastModified: "2026-11-10", changeFrequency: "yearly", priority: 0.2 },
  ];
  for (const e of EXAMS) {
    out.push({ url: `${SITE_URL}/${e.slug}/`, lastModified: e.dates.checked, changeFrequency: "weekly", priority: 0.9 });
    for (const s of sectionsOf(e)) {
      const b = e[s.key]!;
      out.push({ url: `${SITE_URL}/${e.slug}/${s.slug}/`, lastModified: b.checked, changeFrequency: "monthly", priority: 0.7 });
    }
  }
  return out;
}
