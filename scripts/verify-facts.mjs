// Fails the build if any block of facts in src/lib/exams.ts loses its source URL or its checked date, or if a
// block's source is not an official domain. Also fails if two rows in a block have the same label.
import { readFileSync } from "node:fs";

const src = readFileSync("src/lib/exams.ts", "utf-8").replaceAll("\r\n", "\n"); // Windows checkouts use CRLF
const OFFICIAL = /^https:\/\/(cdnbbsr\.s3waas\.gov\.in|([a-z0-9-]+\.)?nta\.nic\.in|([a-z0-9-]+\.)?nic\.in|([a-z0-9-]+\.)?upsc\.gov\.in|upsconline\.nic\.in|([a-z0-9-]+\.)?gov\.in)\//;

const consts = Object.fromEntries([...src.matchAll(/const ([A-Z_0-9]+) = "([^"]+)";/g)].map((m) => [m[1], m[2]]));
const blocks = [...src.matchAll(/\{\n\s+sourceName: "([^"]+)",\n\s+source: ([A-Z_0-9]+|"[^"]+"),\n\s+checked: ([A-Z_0-9]+|"[^"]+"),\n\s+rows: \[([\s\S]*?)\n\s+\],\n\s+\}/g)];
let bad = 0;
const resolve = (v) => (v.startsWith('"') ? v.slice(1, -1) : consts[v]);
for (const b of blocks) {
  const name = b[1];
  const url = resolve(b[2]);
  const date = resolve(b[3]);
  if (!url || !OFFICIAL.test(url)) { console.error(`not an official source: ${name} -> ${url}`); bad++; }
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) { console.error(`no checked date: ${name}`); bad++; }
  const labels = [...b[4].matchAll(/label: "([^"]+)"/g)].map((m) => m[1]);
  const dup = labels.find((l, i) => labels.indexOf(l) !== i);
  if (dup) { console.error(`duplicate row label in ${name}: ${dup}`); bad++; }
  if (!labels.length) { console.error(`block with no rows: ${name}`); bad++; }
}
// every block opener must have been matched: count `sourceName:` against matches
const opened = (src.match(/sourceName: "/g) || []).length;
if (opened !== blocks.length) { console.error(`${opened - blocks.length} block(s) could not be parsed: keep the sourceName/source/checked/rows layout`); bad++; }
if (bad) process.exit(1);
console.log(`verify-facts: ${blocks.length} blocks, all from official domains, sourced and dated`);
