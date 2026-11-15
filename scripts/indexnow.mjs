// Tells IndexNow search engines (Bing, Yandex and others; Google does not use it) which pages are new or changed.
// Run after a deploy (needs fetch-depth: 2). By default it submits only pages the last commit touched.
// DRY_RUN=1 prints the URLs without sending. FORCE=1 submits the whole sitemap (capped at 10000, IndexNow's limit).
// The key is public by design: it is published at /<key>.txt so the engines can check that the site is ours.
import { execSync } from "node:child_process";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exams.streamerosai.com";
export const LIMIT = 10000;

/**
 * Pure: which sitemap pages a commit touched.
 * `entries` are { url, lastmod } from the live sitemap; `commitDay` is the commit's UTC date (yyyy-mm-dd).
 */
export function selectUrls({ site, changed, entries, commitDay }) {
  const all = entries.map((e) => e.url);
  const files = changed.map((f) => f.split("\\").join("/"));
  const set = new Set();
  const addAll = () => all.forEach((u) => set.add(u));
  for (const f of files) {
    if (f === "src/lib/exams.ts") {
      // Facts are dated by the day they were checked, so pages whose date moved to (or past) the day before the commit changed.
      const since = new Date(Date.parse(commitDay) - 86400000).toISOString().slice(0, 10);
      const fresh = entries.filter((e) => e.lastmod && e.lastmod.slice(0, 10) >= since).map((e) => e.url);
      (fresh.length ? fresh : all).forEach((u) => set.add(u));
    } else if (f === "src/app/page.tsx") set.add(`${site}/`);
    else if (/^src\/app\/(calendar|how-we-check|privacy)\/page\.tsx$/.test(f)) set.add(`${site}/${f.split("/")[2]}/`);
    else if (f.startsWith("src/app/[exam]/") || f.startsWith("src/components/") || f === "src/app/layout.tsx" || f === "src/lib/seo.ts") addAll();
  }
  return [...set].filter((u) => all.includes(u)).slice(0, LIMIT);
}

async function main() {
  const keyFile = fs.readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!keyFile) { console.log("No IndexNow key file in public/; nothing to do."); return; }
  const key = keyFile.replace(".txt", "");
  if (process.env.DRY_RUN !== "1") {
    let live = false;
    for (let i = 0; i < 12 && !live; i++) {
      try { live = (await (await fetch(`${SITE}/${keyFile}`)).text()).trim() === key; } catch { /* retry */ }
      if (!live) await new Promise((r) => setTimeout(r, 10000));
    }
    if (!live) { console.log("Key file is not live yet; skipping the ping."); return; }
  }
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)].map((m) => ({ url: m[1], lastmod: m[2] ?? "" }));
  let urls;
  if (process.env.FORCE === "1") urls = entries.map((e) => e.url).slice(0, LIMIT);
  else {
    let changed = [];
    let commitDay = new Date().toISOString().slice(0, 10);
    try {
      changed = execSync("git diff --name-only HEAD^ HEAD", { encoding: "utf8" }).split("\n").filter(Boolean);
      commitDay = execSync("git log -1 --format=%cs HEAD", { encoding: "utf8" }).trim();
    } catch { changed = []; }
    urls = selectUrls({ site: SITE, changed, entries, commitDay });
  }
  if (!urls.length) { console.log("No indexable pages changed in this commit."); return; }
  console.log(`${process.env.DRY_RUN === "1" ? "Would submit" : "Submitting"} ${urls.length} URL(s) to IndexNow:\n  ${urls.join("\n  ")}`);
  if (process.env.DRY_RUN === "1") return;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST", headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation: `${SITE}/${key}.txt`, urlList: urls }),
  });
  console.log(`IndexNow answered HTTP ${res.status}`); // 200 or 202 means accepted
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) await main();
