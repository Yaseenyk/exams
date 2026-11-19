import type { Block, Exam } from "./exams";

/**
 * FAQ answers and the short answer at the top of each page. Nothing is typed here as a fact: every answer is
 * assembled from rows of the sourced blocks in exams.ts, picked by label. If a label is renamed or removed the
 * build fails, so an answer can never drift from the data or lose its source.
 */
export type BlockKey = "dates" | "eligibility" | "pattern" | "fees" | "apply";
export interface Faq {
  q: string;
  a: string;
}
interface Spec {
  /** {s} is replaced with the exam's short name. */
  q: string;
  key: BlockKey;
  labels: string[] | "all";
  notes?: boolean;
}

const A = (q: string, key: BlockKey, labels: string[] | "all", notes = false): Spec => ({ q, key, labels, notes });

const SPECS: Record<Exam["slug"], Spec[]> = {
  "jee-main": [
    A("What are the {s} dates?", "dates", ["Exam dates (Session 1)", "Application form (Session 1)", "Last date to pay the fee", "Admit card"]),
    A("What are the {s} Session 2 dates?", "dates", ["Session 2: application form", "Session 2: admit card", "Session 2: exam dates"]),
    A("Is there an age limit for {s}?", "eligibility", ["Age limit for JEE Main"], true),
    A("Who is eligible for {s}?", "eligibility", ["Who can appear", "Who cannot"]),
    A("What is the {s} exam pattern?", "pattern", ["Papers", "Paper 1 mode", "Paper 1 duration", "Paper 1 subjects", "Total for Paper 1"]),
    A("What is the {s} marking scheme?", "pattern", ["Marking"], true),
    A("What is the {s} pattern for B.Arch and B.Planning?", "pattern", ["Paper 2A (B.Arch)", "Paper 2B (B.Planning)"], true),
    A("In which languages can I take {s}?", "pattern", ["Medium of the question paper"], true),
    A("What is the {s} application fee?", "fees", "all", true),
    A("How do I apply for {s}?", "apply", ["Where", "Step 1: register", "Step 2: fill the form", "Step 3: pay the fee"]),
    A("How many exam cities can I choose for {s}?", "apply", ["Exam city choice"], true),
    A("What are the photo and signature sizes for {s}?", "apply", ["Photograph file", "Signature file"]),
    A("Is the {s} fee refundable?", "apply", ["Refund"]),
  ],
  "neet-ug": [
    A("What is the {s} exam date?", "dates", ["2026 exam date in the bulletin", "2027 dates"], true),
    A("What is the {s} age limit?", "eligibility", ["Minimum age", "Upper age limit"], true),
    A("Which subjects do I need for {s}?", "eligibility", ["Subjects you must have studied", "Class 12 result awaited"], true),
    A("What {s} score do I need for admission?", "eligibility", ["Minimum NEET score for admission"], true),
    A("What is the {s} exam pattern?", "pattern", ["Subjects", "Question type", "Total", "Duration"]),
    A("What is the {s} marking scheme?", "pattern", ["Marking"]),
    A("In which languages can I take {s}?", "pattern", ["Medium of the question paper"], true),
    A("What is the {s} application fee?", "fees", ["General (India)", "General-EWS / OBC-NCL (India)", "SC / ST / PwBD / PwD / Third gender (India)"], true),
    A("Is the {s} fee refundable?", "fees", ["Refund"], true),
    A("How do I apply for {s}?", "apply", ["Where", "Step 1: register", "Step 2: fill the form", "Step 3: pay the fee"]),
    A("How many exam cities can I choose for {s}?", "apply", ["Exam city choice"], true),
    A("What are the photo and signature sizes for {s}?", "apply", ["Photograph file", "Signature file"]),
  ],
  "cuet-ug": [
    A("What are the {s} dates?", "dates", ["2027 dates", "2026 exam window in the bulletin", "2026 application", "2026 last date to pay the fee"]),
    A("Is there an age limit for {s}?", "eligibility", ["Age limit for CUET"], true),
    A("Who is eligible for {s}?", "eligibility", ["Who can appear", "Choice of subjects"]),
    A("What is the {s} exam pattern?", "pattern", ["Mode", "Total subjects", "Questions per test paper", "Duration per test paper"]),
    A("What is the {s} marking scheme?", "pattern", ["Marking"]),
    A("In which languages can I take {s}?", "pattern", ["Medium of the question paper"], true),
    A("What is the {s} application fee?", "fees", ["General (UR), up to 3 subjects", "OBC (NCL) / EWS, up to 3 subjects", "SC / ST / PwD / PwBD / Third gender, up to 3 subjects", "Centres outside India, up to 3 subjects"], true),
    A("Is the {s} fee refundable?", "fees", ["Refund"]),
    A("How do I apply for {s}?", "apply", ["Where", "Step 1: register", "Step 2: fill the form", "Step 3: pay the fee"]),
    A("How many exam cities can I choose for {s}?", "apply", ["Exam city choice"], true),
    A("What are the photo and signature sizes for {s}?", "apply", ["Photograph file", "Signature file"]),
  ],
  "upsc-cse": [
    A("What are the {s} dates?", "dates", ["Civil Services (Preliminary) Examination", "Notification of the examination", "Last date to apply", "Civil Services (Main) Examination"]),
    A("What is the age limit for {s}?", "eligibility", ["Age", "Upper age relaxation"], true),
    A("How many attempts do I get in {s}?", "eligibility", ["Number of attempts"], true),
    A("What qualification do I need for {s}?", "eligibility", ["Education"], true),
    A("What is the {s} exam pattern?", "pattern", ["Stages", "Preliminary", "Main: totals"]),
    A("Is there negative marking in the {s} Preliminary?", "pattern", ["Negative marking in the Preliminary"], true),
    A("In which language can I write {s}?", "pattern", ["Language of the Preliminary papers", "Language of the Main papers"], true),
    A("What is the {s} application fee?", "fees", ["Preliminary", "Main", "How to pay"], true),
    A("How do I apply for {s}?", "apply", ["Where", "The four modules", "URN"]),
  ],
};

const sentence = (t: string) => (/[.!?]$/.test(t) ? t : `${t}.`);

function answer(e: Exam, s: Spec, limit?: number): string {
  const block: Block | undefined = e[s.key];
  if (!block) throw new Error(`faq: ${e.slug} has no ${s.key} block`);
  const labels = s.labels === "all" ? block.rows.map((r) => r.label) : s.labels;
  const rows = labels.slice(0, limit).map((l) => {
    const r = block.rows.find((x) => x.label === l);
    if (!r) throw new Error(`faq: ${e.slug} ${s.key} has no row "${l}"`);
    return r;
  });
  return rows.map((r) => `${r.label}: ${sentence(r.value)}${s.notes && r.note ? ` ${sentence(r.note)}` : ""}`).join(" ");
}

const ask = (e: Exam, s: Spec) => s.q.replace("{s}", e.short);

/** Question-and-answer pairs for one page: "overview" is the dates page, the rest are the section pages. */
export function faqsFor(e: Exam, page: BlockKey): Faq[] {
  const out = SPECS[e.slug]
    .filter((s) => s.key === page)
    .map((s) => ({ q: ask(e, s), a: `${answer(e, s)} These figures are for: ${e.cycle}.` }));
  if (page === "dates" && e.pending.length > 0) {
    out.push({ q: `Has everything for ${e.short} been announced?`, a: `Not yet. When we checked, the official site (${e.officialName}) had not published: ${e.pending.join("; ")}.` });
  }
  if (page === "dates" && e.applyAt) {
    out.push({ q: `Where do I apply for ${e.short}?`, a: `${e.applyAt.label}: ${e.applyAt.url}. This is the exam body's own site, not ours.` });
  }
  return out;
}

/** The one-or-two sentence answer at the top of a page: the first two rows of the page's first question. */
export function shortAnswer(e: Exam, page: BlockKey): string {
  const s = SPECS[e.slug].find((x) => x.key === page);
  if (!s) return "";
  return answer(e, s, 2);
}

