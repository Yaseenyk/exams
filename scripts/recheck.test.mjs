// Run with: node --test scripts/
import test from "node:test";
import assert from "node:assert/strict";
import { citedPdfs, evaluate, extractLinks, isImportant, newLinks } from "./recheck.mjs";

const html = `
<a href="/uploads/2026/10/a.pdf">Inviting Online Application Form for JEE (Main) 2027</a>
<a href="/uploads/2026/10/a.pdf">same address, repeated</a>
<a href="https://cdn.example/uploads/2026/11/b.pdf">Extension of last date for the application form</a>
<a href="/about">About us</a>
<a href="/uploads/x.pdf">short</a>
<a href="#top">Top</a>`;

test("extractLinks keeps matching links once, with absolute addresses", () => {
  const links = extractLinks(html, "https://jeemain.nta.nic.in/", /\/uploads\//);
  assert.deepEqual(links, [
    ["Inviting Online Application Form for JEE (Main) 2027", "https://jeemain.nta.nic.in/uploads/2026/10/a.pdf"],
    ["Extension of last date for the application form", "https://cdn.example/uploads/2026/11/b.pdf"],
  ]);
});

test("newLinks returns only what was not there before", () => {
  const prev = [["A", "https://x/a"]];
  assert.deepEqual(newLinks(prev, [["A", "https://x/a"], ["B", "https://x/b"]]), [["B", "https://x/b"]]);
  assert.equal(newLinks(undefined, [["B", "https://x/b"]]).length, 1);
});

test("a first sighting records a baseline and reports nothing", () => {
  const r = evaluate(undefined, { items: [["A", "https://x/a"]] });
  assert.equal(r.report, null);
  assert.equal(r.state.items.length, 1);
});

test("a new notice is reported, an unchanged page is not", () => {
  const base = evaluate(undefined, { items: [["A", "https://x/a"]] }).state;
  assert.equal(evaluate(base, { items: [["A", "https://x/a"]] }).report, null);
  const r = evaluate(base, { items: [["A", "https://x/a"], ["Extension of last date", "https://x/b"]] });
  assert.equal(r.report.kind, "new-links");
  assert.deepEqual(r.report.added, [["Extension of last date", "https://x/b"]]);
});

test("a changed document is reported, an identical one is not", () => {
  const base = evaluate(undefined, { hash: "aaa" }).state;
  assert.equal(evaluate(base, { hash: "aaa" }).report, null);
  assert.equal(evaluate(base, { hash: "bbb" }).report.kind, "changed-document");
});

test("an unreachable page is reported once, after three misses in a row, and a success resets the count", () => {
  let st = evaluate(undefined, { items: [] }).state;
  let r = evaluate(st, { error: "HTTP 403" });
  assert.equal(r.report, null);
  st = r.state;
  r = evaluate(st, { error: "HTTP 403" });
  assert.equal(r.report, null);
  r = evaluate(r.state, { error: "HTTP 403" });
  assert.equal(r.report.kind, "unreachable");
  const again = evaluate(r.state, { error: "HTTP 403" });
  assert.equal(again.report, null); // fourth miss does not open a second issue
  assert.equal(evaluate(again.state, { items: [] }).state.fails, 0);
});

test("a page known to refuse automated readers never opens an unreachable issue, and still recovers when it opens up", () => {
  let st = evaluate(undefined, { items: [] }, true).state;
  for (let i = 0; i < 5; i++) {
    const r = evaluate(st, { error: "HTTP 403" }, true);
    assert.equal(r.report, null);
    st = r.state;
  }
  assert.equal(st.fails, 5);
  const ok = evaluate(st, { items: [["Extension of last date", "https://x/b"]] }, true);
  assert.equal(ok.state.fails, 0);
  assert.equal(ok.report?.kind, "new-links"); // once readable it compares against the old baseline as usual
});

test("isImportant flags bulletins, extensions and reschedules", () => {
  assert.ok(isImportant("Information Bulletin for NEET(UG)-2027"));
  assert.ok(isImportant("Extension of last date for filling of Online Application Form"));
  assert.ok(isImportant("Re-scheduling of examination"));
  assert.ok(!isImportant("Photo gallery of the toppers' felicitation"));
});

test("citedPdfs finds the official PDFs named in exams.ts", () => {
  const src = 'const CHECKED = "2026-11-10";\nconst JEE_BULLETIN = "https://cdnbbsr.s3waas.gov.in/x/a.pdf";\nconst PORTAL = "https://example.org/page";\nconst UPSC_CALENDAR = "https://www.upsc.gov.in/sites/default/files/c.pdf";';
  assert.deepEqual(citedPdfs(src).map((p) => p.id), ["pdf:JEE_BULLETIN", "pdf:UPSC_CALENDAR"]);
});
