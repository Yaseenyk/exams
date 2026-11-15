// Run with: node --test scripts/
import test from "node:test";
import assert from "node:assert/strict";
import { buildLlmsTxt } from "../src/lib/llms.mjs";

const block = (n, c) => ({ sourceName: n, source: `https://nta.nic.in/${n}.pdf`, checked: c, rows: [] });
const exam = {
  slug: "x-exam", name: "X Exam 2027", short: "X Exam", cycle: "2027", conductedBy: "Agency", officialSite: "https://x.nic.in/",
  statusNow: "Form is open.", pending: ["Result date"], dates: block("Notice", "2026-11-10"), fees: block("Bulletin", "2026-11-12"),
};
const out = buildLlmsTxt({
  siteUrl: "https://exams.example", siteName: "Exam Dates India", description: "Dates from official sources.", portfolioUrl: "https://yk.streamerosai.com",
  exams: [exam], sections: [{ slug: "fees", title: "Application fee", key: "fees" }, { slug: "eligibility", title: "Eligibility", key: "eligibility" }],
});

test("has the llms.txt skeleton, the maker and the sourcing promise", () => {
  assert.match(out, /^# Exam Dates India\n\n> Dates from official sources\./);
  assert.match(out, /Yaseen Khatib, Full Stack AI Developer, Hyderabad, India \(https:\/\/yk\.streamerosai\.com\/\)/);
  assert.match(out, /every date is sourced from the official bulletin/i);
  assert.ok(out.includes("https://exams.example/sitemap.xml"));
});
test("lists an exam with its source and the day it was checked, and skips sections it has no facts for", () => {
  assert.ok(out.includes("[X Exam 2027](https://exams.example/x-exam/)"));
  assert.ok(out.includes("https://exams.example/x-exam/fees/"));
  assert.ok(out.includes("checked 2026-11-12"));
  assert.ok(!out.includes("/x-exam/eligibility/"));
  assert.ok(out.includes("Not published by the official site yet: Result date."));
});
