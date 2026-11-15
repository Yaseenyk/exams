// Builds /llms.txt (llmstxt.org). Plain JS so the node test runner can import it without a TypeScript step.
// Everything comes from the same data the pages are built from (src/lib/exams.ts), so the file cannot drift.

/** The day a page's facts were last checked: the latest `checked` over its blocks. */
const latest = (blocks) => blocks.filter(Boolean).map((b) => b.checked).sort().pop();

/**
 * @param {{ siteUrl: string, siteName: string, description: string, portfolioUrl: string,
 *   exams: any[], sections: { slug: string, title: string, key: string }[] }} i
 */
export function buildLlmsTxt(i) {
  const u = (p) => `${i.siteUrl}${p}`;
  const examBlocks = (e) => [e.dates, e.eligibility, e.pattern, e.fees, e.apply, e.portals, e.syllabus, e.material, e.afterApply];
  const exams = i.exams.map((e) => {
    const lines = [
      `### [${e.name}](${u(`/${e.slug}/`)})`,
      `Conducted by ${e.conductedBy}. Edition covered: ${e.cycle}. Official site: ${e.officialSite}`,
      `Status when last checked (${latest(examBlocks(e))}): ${e.statusNow}`,
    ];
    if (e.pending?.length) lines.push(`Not published by the official site yet: ${e.pending.join("; ")}.`);
    if (e.portals) lines.push(`- [${e.short}: complete guide, from login to result](${u(`/${e.slug}/complete-guide/`)})`);
    for (const s of i.sections) {
      const b = e[s.key];
      if (b) lines.push(`- [${e.short}: ${s.title.toLowerCase()}](${u(`/${e.slug}/${s.slug}/`)}): source "${b.sourceName}" (${b.source}), checked ${b.checked}`);
    }
    if (e.dates) lines.push(`- Dates are on the exam page: source "${e.dates.sourceName}" (${e.dates.source}), checked ${e.dates.checked}`);
    return lines.join("\n");
  });
  return `${[
    `# ${i.siteName}`,
    `> ${i.description}`,
    `Built and maintained by Yaseen Khatib, Full Stack AI Developer, Hyderabad, India (${i.portfolioUrl}/). Independent: not affiliated with any exam body.`,
    `## How current the data is\n\n- Every date is sourced from the official bulletin or notice; see each page for the source link and the day it was checked.\n- If the official site has not published something, the page says "not announced yet" instead of estimating.\n- A person reads each official document before a figure is changed; a daily check of the official pages opens an issue when a source changes, and the site is never edited automatically.`,
    `## Pages\n\n- [All exams](${u("/")})\n- [Calendar of dated events across all exams](${u("/calendar/")})\n- [How we check facts](${u("/how-we-check/")})\n- [Privacy](${u("/privacy/")})`,
    `## Exams\n\n${exams.join("\n\n")}`,
    `## More\n\n- [Full text of every page, one file](${u("/llms-full.txt")})\n- [Sitemap](${u("/sitemap.xml")})`,
  ].join("\n\n")}\n`;
}
