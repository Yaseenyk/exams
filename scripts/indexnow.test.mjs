// Run with: node --test scripts/indexnow.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { selectUrls } from "./indexnow.mjs";

const site = "https://exams.example";
const entries = [
  { url: `${site}/`, lastmod: "2026-11-12" },
  { url: `${site}/calendar/`, lastmod: "2026-11-12" },
  { url: `${site}/jee-main/`, lastmod: "2026-11-12" },
  { url: `${site}/neet-ug/`, lastmod: "2026-11-01" },
  { url: `${site}/privacy/`, lastmod: "2026-11-10" },
];
const pick = (changed) => selectUrls({ site, entries, changed, commitDay: "2026-11-12" });

test("a facts change selects pages whose checked date is recent, not the untouched exam", () => {
  const urls = pick(["src/lib/exams.ts"]);
  assert.ok(urls.includes(`${site}/jee-main/`));
  assert.ok(!urls.includes(`${site}/neet-ug/`));
});
test("a facts change with no recent date falls back to every page", () => {
  assert.equal(selectUrls({ site, entries, changed: ["src/lib/exams.ts"], commitDay: "2027-01-01" }).length, entries.length);
});
test("a static page edit selects that page only", () => {
  assert.deepEqual(pick(["src/app/privacy/page.tsx"]), [`${site}/privacy/`]);
});
test("data-only and image-only commits select nothing", () => {
  assert.deepEqual(pick(["data/source-state.json", "public/og/jee-main.png"]), []);
});
