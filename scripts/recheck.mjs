// Watches the official pages and documents behind every fact on this site, and opens a GitHub issue when something new appears.
//   - NTA (JEE Main, NEET UG, CUET UG) and UPSC landing pages: any NEW notice or document link (an extension, a new bulletin, a new calendar).
//   - Every official PDF this site cites (see src/lib/exams.ts): whether the document itself changed.
// It never edits the site: a person reads the notice, updates src/lib/exams.ts and bumps `checked`.
// First run only records a baseline. State lives in data/source-state.json (committed by the workflow).
//   node scripts/recheck.mjs        needs GITHUB_TOKEN and GITHUB_REPOSITORY in CI; without them it only prints what it would open.
import { createHash } from "node:crypto";
import fs from "node:fs";

const STATE_FILE = "data/source-state.json";
const UA = "Mozilla/5.0 (compatible; ExamDatesIndia-sourcecheck; +https://exams.streamerosai.com/how-we-check/)";
const FAILS_BEFORE_ISSUE = 3;

/** Landing pages whose notice links we watch, and the site page a human should re-check when one changes. */
export const PAGES = [
  { id: "jee-notices", name: "JEE Main (NTA)", url: "https://jeemain.nta.nic.in/", filter: /\/uploads\//, review: "https://exams.streamerosai.com/jee-main/" },
  { id: "neet-notices", name: "NEET (UG) (NTA)", url: "https://neet.nta.nic.in/", filter: /\/uploads\//, review: "https://exams.streamerosai.com/neet-ug/" },
  { id: "cuet-notices", name: "CUET (UG) (NTA)", url: "https://cuet.nta.nic.in/", filter: /\/uploads\//, review: "https://exams.streamerosai.com/cuet-ug/" },
  { id: "upsc-home", name: "UPSC", url: "https://www.upsc.gov.in/", filter: /civil[-%20 ]*services|calendar|annual-calendar/i, review: "https://exams.streamerosai.com/upsc-cse/" },
];

// ---------------------------------------------------------------- pure pieces (tested)
const clean = (s) => String(s).replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#0?39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();

/** [text, absolute url] for every link on a page whose text or address matches `filter`, de-duplicated by address. */
export function extractLinks(html, base, filter) {
  const out = new Map();
  for (const m of String(html).matchAll(/<a\b[^>]*\bhref=["']([^"'#][^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    let url;
    try { url = new URL(m[1].replace(/&amp;/g, "&"), base).href; } catch { continue; }
    const text = clean(m[2]);
    if (!text || text.length < 6) continue;
    if (!filter.test(url) && !filter.test(text)) continue;
    if (!out.has(url)) out.set(url, text);
  }
  return [...out.entries()].map(([url, text]) => [text, url]);
}

/** Links present now that were not in the previous list. */
export function newLinks(prev, now) {
  const had = new Set((prev || []).map((x) => x[1]));
  return now.filter((x) => !had.has(x[1]));
}

/** A new link that looks like the next cycle's bulletin or a dated change, worth reading first. */
export const isImportant = (text) => /information bulletin|bulletin|extension|extended|re-?schedul|postpone|revised|corrigendum|calendar|notification|result|date sheet|schedule/i.test(text);

/** The official PDFs the site cites: every `const X = "https://....pdf"` in exams.ts. */
export function citedPdfs(src) {
  return [...String(src).matchAll(/const ([A-Z_0-9]+) = "(https:\/\/[^"]+\.pdf)";/g)].map((m) => ({ id: `pdf:${m[1]}`, name: m[1].replaceAll("_", " ").toLowerCase(), url: m[2] }));
}

export const sha = (buf) => createHash("sha256").update(buf).digest("hex");

/** Compare one target's fresh result with its stored state. Returns the new state and what to report. */
export function evaluate(prev, fresh) {
  if (fresh.error) {
    const fails = (prev?.fails || 0) + 1;
    return { state: { ...(prev || {}), fails, lastError: fresh.error }, report: fails === FAILS_BEFORE_ISSUE ? { kind: "unreachable", error: fresh.error, fails } : null };
  }
  const state = { items: fresh.items ?? prev?.items ?? [], hash: fresh.hash ?? prev?.hash ?? null, fails: 0, lastOk: new Date().toISOString() };
  if (!prev || prev.lastOk === undefined) return { state, report: null }; // first sight: baseline only
  if (fresh.items) {
    const added = newLinks(prev.items, fresh.items);
    return { state, report: added.length ? { kind: "new-links", added } : null };
  }
  return { state, report: prev.hash && fresh.hash && prev.hash !== fresh.hash ? { kind: "changed-document" } : null };
}

// ---------------------------------------------------------------- network
async function get(url, asBuffer) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "*/*" }, redirect: "follow", signal: AbortSignal.timeout(45000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return asBuffer ? Buffer.from(await res.arrayBuffer()) : await res.text();
}

async function gh(token, method, path, body) {
  const res = await fetch(`https://api.github.com${path}`, { method, headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "exams-recheck", "X-GitHub-Api-Version": "2022-11-28", ...(body ? { "Content-Type": "application/json" } : {}) }, body: body ? JSON.stringify(body) : undefined });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`GitHub ${res.status} ${path}: ${JSON.stringify(j).slice(0, 160)}`);
  return j;
}

function describe(target, report) {
  if (report.kind === "unreachable") return { title: `Could not read ${target.name} for ${report.fails} checks in a row`, body: `The re-check could not fetch ${target.url}: ${report.error}.\n\nUntil it can, new notices there will not be caught. Open the page by hand and check, and look at the workflow log.` };
  if (report.kind === "changed-document") return { title: `Official document changed: ${target.name}`, body: `The file at ${target.url} is no longer the same as when it was last read (its bytes differ).\n\nRe-read it, compare with the matching block in src/lib/exams.ts, correct anything that changed and bump \`checked\`.` };
  const lines = report.added.slice(0, 25).map(([text, url]) => `- ${isImportant(text) ? "**" : ""}${text}${isImportant(text) ? "**" : ""}: ${url}`);
  const flagged = report.added.some(([t]) => isImportant(t));
  return {
    title: `${flagged ? "Read soon: " : ""}New on ${target.name}: ${report.added[0][0].slice(0, 80)}${report.added.length > 1 ? ` (+${report.added.length - 1} more)` : ""}`,
    body: `New links appeared on ${target.url}:\n\n${lines.join("\n")}\n\nBold lines look like a bulletin, an extension, a reschedule or a calendar change.\n\nIf a date, fee, rule or the next cycle's bulletin is affected: update the matching block in \`src/lib/exams.ts\` from the official document (never from a news site), bump \`checked\`, build, and publish. Page to review: ${target.review ?? "the exam page"}`,
  };
}

async function main() {
  const src = fs.readFileSync("src/lib/exams.ts", "utf-8").replaceAll("\r\n", "\n");
  const state = (() => { try { return JSON.parse(fs.readFileSync(STATE_FILE, "utf8")); } catch { return { targets: {} }; } })();
  const targets = [...PAGES.map((p) => ({ ...p, kind: "links" })), ...citedPdfs(src).map((p) => ({ ...p, kind: "pdf", review: "https://exams.streamerosai.com/" }))];
  const token = process.env.GITHUB_TOKEN, repo = process.env.GITHUB_REPOSITORY;
  const reports = [];
  const next = { checkedAt: new Date().toISOString(), targets: {} };
  for (const t of targets) {
    let fresh;
    try {
      if (t.kind === "links") fresh = { items: extractLinks(await get(t.url), t.url, t.filter) };
      else fresh = { hash: sha(await get(t.url, true)) };
    } catch (e) { fresh = { error: String(e.message || e) }; }
    const { state: s, report } = evaluate(state.targets[t.id], fresh);
    next.targets[t.id] = s;
    console.log(`recheck: ${t.id} ${fresh.error ? `ERROR ${fresh.error} (${s.fails} in a row)` : t.kind === "links" ? `${fresh.items.length} links` : "hashed"}${report ? ` -> ${report.kind}` : ""}`);
    if (report) reports.push({ t, report });
  }
  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(next, null, 1));

  if (!reports.length) { console.log("recheck: nothing new"); return; }
  if (!token || !repo) { for (const r of reports) console.log("would open:", describe(r.t, r.report).title); return; }
  try { await gh(token, "POST", `/repos/${repo}/labels`, { name: "source-changed", color: "d93f0b", description: "An official page or document behind a fact changed" }); } catch { /* label exists */ }
  const open = await gh(token, "GET", `/repos/${repo}/issues?labels=source-changed&state=open&per_page=100`);
  for (const { t, report } of reports) {
    const { title, body } = describe(t, report);
    if (open.some((i) => i.title === title)) continue;
    const made = await gh(token, "POST", `/repos/${repo}/issues`, { title, body, labels: ["source-changed"] });
    console.log(`opened #${made.number}: ${title}`);
  }
}

if (process.argv[1] && /recheck\.mjs$/.test(process.argv[1])) main().catch((e) => { console.error(e); process.exit(1); });
