/**
 * Every fact this site states about an exam lives here, with where it came from and the day it was checked.
 * Pages are built from this file and nothing is typed inline. scripts/verify-facts.mjs fails the build if a block
 * loses its source URL or its checked date, so a number can never reach a page without a source.
 *
 * Rules for editing:
 *  - Copy figures from the official document, not from a news site or a coaching site.
 *  - If the official site has not published something yet, say so in `pending`, never guess.
 *  - After re-checking, change `checked`. A page that was not re-checked says so on its face.
 */
export interface Row {
  label: string;
  value: string;
  note?: string;
  /** Official link the value points to (the document, page or portal itself). */
  href?: string;
}
export interface Block {
  /** Official document or page the rows were read from. */
  sourceName: string;
  source: string;
  /** ISO date the source was last read. */
  checked: string;
  rows: Row[];
}
export interface Exam {
  slug: "jee-main" | "neet-ug" | "cuet-ug" | "upsc-cse";
  name: string;
  short: string;
  /** Edition the facts are about, e.g. "2027 Session 1". */
  cycle: string;
  conductedBy: string;
  officialSite: string;
  officialName: string;
  /** What the exam is, in one plain sentence, from the sources below. */
  what: string;
  /** What the official site shows at the time of checking, in plain words. */
  statusNow: string;
  /** Things the official site has not published for the next cycle. Shown on the page as such. */
  pending: string[];
  dates: Block;
  eligibility?: Block;
  pattern?: Block;
  fees?: Block;
  apply?: Block;
  /** The complete-guide page: where to log in, the syllabus, official study material and what happens after you apply. */
  portals?: Block;
  syllabus?: Block;
  material?: Block;
  afterApply?: Block;
  /** A checklist for the person applying. It repeats facts from the blocks above and adds none. */
  checklist?: string[];
  /** Where to apply, if the source gives one. */
  applyAt?: { label: string; url: string };
}

const CHECKED = "2026-11-10";

// ---- JEE Main 2027 -----------------------------------------------------------------------------------------------
const JEE_BULLETIN = "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/202610241890224107.pdf";
const JEE_NOTICE = "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/20261024390682350.pdf";
const JEE_NOTICE_FRESH = "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/202610302102025182.pdf";
const JEE_NOTICE_ADVISORY = "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/202610281658843201.pdf";
const JEE_SYLLABUS = "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/20261024683680768.pdf";

// ---- NEET (UG): the 2027 bulletin is not out, so these are the 2026 rules ---------------------------------------
const NEET_SYLLABUS = "https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/01/202601081066816297.pdf";
const NEET_BULLETIN = "https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/02/202602231394640855.pdf";

// ---- CUET (UG): the 2027 bulletin is not out, so these are the 2026 rules ---------------------------------------
const CUET_BULLETIN = "https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2026/01/202601031633478370.pdf";

// ---- UPSC --------------------------------------------------------------------------------------------------------
const UPSC_NOTIF = "https://www.upsc.gov.in/sites/default/files/Notif-CSP-2026-Engl-060226Rev.pdf";
const UPSC_CALENDAR = "https://www.upsc.gov.in/sites/default/files/Calendar-Year-2027-Engl-200526.pdf";

export const EXAMS: Exam[] = [
  {
    slug: "jee-main",
    name: "JEE Main 2027",
    short: "JEE Main",
    cycle: "2027, Session 1 (January)",
    conductedBy: "National Testing Agency (NTA)",
    officialSite: "https://jeemain.nta.nic.in/",
    officialName: "jeemain.nta.nic.in",
    what: "JEE (Main) is the entrance test for undergraduate engineering (B.E./B.Tech) at NITs, IIITs and other centrally funded technical institutions, and for B.Arch and B.Planning. It is also the eligibility test for JEE (Advanced), which is held for the IITs.",
    statusNow: "The application form for Session 1 is open. NTA's latest public notices are dated 24, 28 and 30 October 2026, and the last one allows a fresh application.",
    pending: ["Dates for displaying the answer keys and the results of both sessions (the bulletin says they will be shown on the NTA website)"],
    applyAt: { label: "Apply on the official JEE Main site", url: "https://jeemain.nta.nic.in/" },
    dates: {
      sourceName: "NTA public notice, 24 October 2026 (Session 1)",
      source: JEE_NOTICE,
      checked: CHECKED,
      rows: [
        { label: "How many sessions", value: "Two: Session 1 in January 2027 and Session 2 in April 2027", note: "The Session 2 rows below are from the bulletin. The Session 1 rows are from the 24 October 2026 public notice." },
        { label: "Application form (Session 1)", value: "24 October 2026 to 22 November 2026, up to 11:50 PM" },
        { label: "Last date to pay the fee", value: "22 November 2026, up to 11:50 PM" },
        { label: "Late application", value: "23 to 26 November 2026, with a late fee of ₹500 over the category fee", note: "Last date for the late fee payment is 26 November 2026, up to 11:50 PM." },
        { label: "Correction in the form", value: "27 to 29 November 2026 (on the website only)" },
        { label: "Exam city announced", value: "30 December 2026" },
        { label: "Admit card", value: "13 January 2027" },
        { label: "Exam dates (Session 1)", value: "20, 21, 22, 23, 24 and 28 January 2027" },
        { label: "Session 2: application form", value: "5 January 2027 to 3 February 2027, up to 11:50 PM", note: "Source: the JEE (Main) 2027 Information Bulletin, which gives both sessions." },
        { label: "Session 2: last date to pay the fee", value: "3 February 2027, up to 11:50 PM" },
        { label: "Session 2: late application", value: "4 to 7 February 2027, with the same late fee of ₹500" },
        { label: "Session 2: correction in the form", value: "8 to 10 February 2027, up to 11:50 PM" },
        { label: "Session 2: exam city slip", value: "12 March 2027" },
        { label: "Session 2: admit card", value: "25 March 2027" },
        { label: "Session 2: exam dates", value: "2, 3, 4, 5, 6 and 7 April 2027" },
        { label: "Shifts for the 3-hour paper", value: "9:00 AM to 12:00 noon and 3:00 PM to 6:00 PM (IST)" },
        { label: "Shifts for the 3 hour 30 minute paper", value: "9:00 AM to 12:30 PM and 3:00 PM to 6:30 PM (IST)", note: "Applies to Paper 2A (B.Arch) and Paper 2B (B.Planning) when taken together." },
      ],
    },
    eligibility: {
      sourceName: "JEE (Main) 2027 Information Bulletin, chapter 3",
      source: JEE_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Age limit for JEE Main", value: "None", note: "The institute you apply to may have its own age rule." },
        { label: "Who can appear", value: "Candidates who passed Class XII (or equivalent) in 2025 or 2026, or are appearing in 2027" },
        { label: "Who cannot", value: "Candidates who passed Class XII (or equivalent) in 2024 or before" },
        { label: "Qualifying exams accepted", value: "10+2 from any recognised Central or State board, intermediate or two-year pre-university exams, NIOS senior secondary (minimum five subjects), the NDA two-year joint services course, a recognised 3-year diploma, A-levels, IB, and other exams the AIU recognises as equivalent" },
        { label: "State of eligibility", value: "The State where you passed Class XII, not your native State or domicile", note: "It decides Home State quota in NITs, IIITs and other CFTIs." },
      ],
    },
    pattern: {
      sourceName: "JEE (Main) 2027 Information Bulletin, section 2.4",
      source: JEE_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Papers", value: "Paper 1 (B.E./B.Tech), Paper 2A (B.Arch), Paper 2B (B.Planning)" },
        { label: "Paper 1 mode", value: "Computer Based Test (CBT)" },
        { label: "Paper 1 duration", value: "3 hours" },
        { label: "Paper 1 subjects", value: "Mathematics, Physics, Chemistry" },
        { label: "Questions per subject", value: "25: 20 multiple choice (Section A) and 5 numerical value (Section B)" },
        { label: "Total for Paper 1", value: "75 questions, 300 marks" },
        { label: "Marking", value: "Correct answer +4. Incorrect answer −1. Unanswered or marked for review 0", note: "The bulletin says there is negative marking in both Section A and Section B." },
        { label: "Numerical answers", value: "Typed with the on-screen keypad and rounded to the nearest integer" },
        { label: "Paper 2A and 2B", value: "Different structure (Mathematics and an aptitude test, plus drawing for B.Arch). Read section 2.4 of the bulletin for the exact split." },
      ],
    },
    apply: {
      sourceName: "JEE (Main) 2027 Information Bulletin, how to apply online",
      source: JEE_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Where", value: "Online only, on jeemain.nta.nic.in", note: "Registration is enabled through the MeriPehchaan single sign-on service." },
        { label: "Fresh application allowed (notice of 30 October 2026)", value: "You may submit a fresh Session 1 form even if you already have an Application Number or paid the fee. Only the last form with the fee paid and the Confirmation Page generated counts. A new Application Number is made, and every detail, photograph, signature and document must be entered and uploaded again.", note: "The fee paid on the earlier form is neither refunded nor adjusted against the new one. A fresh form must be completed, with the fee, by the last date in the dates table.", href: JEE_NOTICE_FRESH },
        { label: "To fix only a few details", value: "Use the correction window (27 to 29 November 2026) instead of a fresh form, as NTA advises" },
        { label: "One attempt per session", value: "More than one Application Number does not let you appear more than once in a session. Appearing with more than one number is treated as unfair means. Merely holding more than one is not." },
        { label: "Log in with your own credentials (notice of 28 October 2026)", value: "Use your own DigiLocker, JanParichay or e-Pramaan (MeriPehchaan) login, so identity and biometric details match at later stages. Do Re-KYC through DigiLocker before you fill the form, so your latest details are fetched.", href: JEE_NOTICE_ADVISORY },
        { label: "Name and date of birth", value: "Must be the same as in your Class 10 certificate or marksheet" },
        { label: "Step 1: register", value: "Register for the online form and note the system-generated Application Number. Create a password.", note: "The same Application Number is used for both sessions of JEE (Main) 2027." },
        { label: "Step 2: fill the form", value: "Log in with the Application Number and password. Fill personal details, apply for the paper, choose exam cities, give your educational qualification details, and upload the images and documents." },
        { label: "Step 3: pay the fee", value: "Pay by net banking, debit card, credit card or UPI and keep the proof of payment. Processing charges and GST are charged by the bank or gateway on top of the fee.", note: "After a successful payment you can print the Confirmation Page." },
        { label: "If no Confirmation Page appears", value: "Check the payment status with the bank. If the payment failed, pay again before the deadline. If the bank says it succeeded, contact the NTA helpline so the page can be regenerated.", note: "NTA says duplicate payments that arise this way are refunded after fee reconciliation, through the same payment mode." },
        { label: "Live photograph", value: "Taken while you fill the form, with your camera or webcam. Use a white background and good light, with 80% of the face visible (including ears, no mask).", note: "If your device has no webcam, you can scan a QR code and use a mobile device or tablet." },
        { label: "Photograph file", value: "Recent passport-size photograph in colour, white background, 80% face (including ears, no mask). JPG/JPEG, 10 kB to 200 kB" },
        { label: "Signature file", value: "JPG/JPEG, clearly legible, 10 kB to 100 kB" },
        { label: "Class 10 certificate or marksheet", value: "PDF, clearly legible, 50 kB to 300 kB" },
        { label: "Disability or UDID certificate (if it applies)", value: "PDF, clearly legible, 50 kB to 300 kB" },
        { label: "Certificate of physical limitation to write (if it applies)", value: "PDF, clearly legible, 50 kB to 300 kB" },
        { label: "Passport (foreign nationals including OCI)", value: "Scanned non-Indian passport, PDF, 50 kB to 300 kB" },
        { label: "Use your own documents", value: "Upload your own photograph, signature and certificates. NTA treats uploading someone else's as an unfair means practice, and there is no correction after the correction window closes." },
        { label: "Refund", value: "No request for a refund of a successfully paid application fee is entertained" },
      ],
    },
    portals: {
      sourceName: "JEE (Main) 2027 Information Bulletin and jeemain.nta.nic.in",
      source: JEE_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Official site", value: "jeemain.nta.nic.in, run by NTA", href: "https://jeemain.nta.nic.in/" },
        { label: "Register and apply", value: "Use the Online Application Form for JEE (Main) 2027 (Session 1) link on the official site. Register once, then log in to finish the form.", note: "Registration is enabled through the MeriPehchaan single sign-on service.", href: "https://jeemain.nta.nic.in/online-application-form-for-jee-main-2027-session-1/" },
        { label: "What you log in with", value: "The system-generated Application Number and the password you created in Step 1", note: "The same Application Number is used for both sessions." },
        { label: "Where the admit card is", value: "On jeemain.nta.nic.in. Session 1 from 13 January 2027, Session 2 from 25 March 2027." },
        { label: "Helpline", value: "NTA helpline 011-40759000 / 69227700, 10:00 AM to 5:00 PM, or write to jeemain@nta.ac.in" },
        { label: "Answer keys and results", value: "Shown on the same site: the provisional answer key, your recorded responses and question paper, then the NTA score." },
      ],
    },
    syllabus: {
      sourceName: "JEE (Main) 2027 syllabus, official NTA document",
      source: JEE_SYLLABUS,
      checked: CHECKED,
      rows: [
        { label: "Paper 1 (B.E./B.Tech): Mathematics, 14 units", value: "Sets, relations and functions · Complex numbers and quadratic equations · Matrices and determinants · Permutations and combinations · Binomial theorem and its simple applications · Sequence and series · Limit, continuity and differentiability · Integral calculus · Differential equations · Co-ordinate geometry · Three dimensional geometry · Vector algebra · Statistics and probability · Trigonometry" },
        { label: "Paper 1: Physics, 20 units", value: "Units and measurements · Kinematics · Laws of motion · Work, energy and power · Rotational motion · Gravitation · Properties of solids and liquids · Thermodynamics · Kinetic theory of gases · Oscillations and waves · Electrostatics · Current electricity · Magnetic effects of current and magnetism · Electromagnetic induction and alternating currents · Electromagnetic waves · Optics · Dual nature of matter and radiation · Atoms and nuclei · Electronic devices · Experimental skills" },
        { label: "Paper 1: Chemistry, 20 units", value: "Some basic concepts in chemistry · Atomic structure · Chemical bonding and molecular structure · Chemical thermodynamics · Solutions · Equilibrium · Redox reactions and electrochemistry · Chemical kinetics · Classification of elements and periodicity in properties · p-block elements · d- and f-block elements · Coordination compounds · Purification and characterisation of organic compounds · Some basic principles of organic chemistry · Hydrocarbons · Organic compounds containing halogens · Organic compounds containing oxygen · Organic compounds containing nitrogen · Biomolecules · Principles related to practical chemistry" },
        { label: "Paper 2A (B.Arch)", value: "Part I Mathematics (the same 14 units), Part II Aptitude Test, Part III Drawing Test" },
        { label: "Paper 2B (B.Planning)", value: "See the official syllabus document for the Planning paper" },
        { label: "The full topic list", value: "Every unit has a detailed list of topics in the official syllabus document", href: "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/20261024683680768.pdf" },
      ],
    },
    material: {
      sourceName: "jeemain.nta.nic.in and nta.ac.in (official links)",
      source: "https://jeemain.nta.nic.in/",
      checked: CHECKED,
      rows: [
        { label: "Syllabus", value: "The official JEE (Main) 2027 syllabus, as a PDF", href: "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/20261024683680768.pdf" },
        { label: "Information Bulletin", value: "The rules, pattern, marking and dates for 2027. Read it fully once.", href: "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/202610241890224107.pdf" },
        { label: "Past question papers", value: "The official site lists question papers of the 2026 sessions, shift by shift, under Question Papers", href: "https://jeemain.nta.nic.in/" },
        { label: "Practice", value: "National Testing Abhyas, linked from the official JEE (Main) and CUET sites", href: "https://www.nta.ac.in/abhyas" },
        { label: "After JEE Main", value: "The official site links JEE Advanced (jeeadv.ac.in), JoSAA (josaa.nic.in) and CSAB (csab.nic.in)", href: "https://josaa.nic.in/" },
      ],
    },
    afterApply: {
      sourceName: "JEE (Main) 2027 Information Bulletin: admit card, exam day, key challenge and result",
      source: JEE_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Exam city slip", value: "Session 1: 30 December 2026. Session 2: 12 March 2027." },
        { label: "Admit card", value: "Download it from jeemain.nta.nic.in and print at least four copies. NTA never posts it, and no duplicate is issued at the centre." },
        { label: "Carry on the exam day", value: "A clear A4 print of the admit card with the self-declaration filled in; 2 extra passport-size photographs (the same as uploaded) to paste on the admit card and the attendance sheet; and one original, valid, non-expired photo ID", note: "Accepted IDs listed in the bulletin: school ID, PAN, driving licence, voter ID, passport, Aadhaar (with photo), e-Aadhaar with photo, Class 12 board admit card with photo, ration card with photo, bank passbook with photo. Without these documents you are not allowed to sit the exam." },
        { label: "Reporting time", value: "Gates close 30 minutes before the exam starts. A candidate who arrives after that is not allowed in." },
        { label: "Problem with the admit card", value: "Call the NTA helpline between 10:00 AM and 5:00 PM, or write to jeemain@nta.ac.in, before the exam" },
        { label: "Answer key challenge", value: "NTA displays the provisional answer key. You can challenge a question by paying a non-refundable ₹200 per question during the stated time, with a justification.", note: "Challenges without a reason, or sent any other way, are not considered. NTA's decision is final." },
        { label: "Your recorded responses", value: "NTA displays your question paper and recorded responses before the result, for about two to three days. Download your response sheet then: it is not provided later." },
        { label: "Result", value: "The result uses the final answer key. In multi-shift papers, raw marks are converted to the NTA score. If you appear in both sessions, your best NTA score is used for the merit list." },
      ],
    },
    checklist: [
      "Read the Information Bulletin once, fully (link in the study material section).",
      "Check you are eligible: your Class XII passing year, and the paper you need (Paper 1 for B.E./B.Tech, 2A for B.Arch, 2B for B.Planning).",
      "Get your files ready in the right sizes: photograph, signature and Class 10 certificate (sizes on the how-to-apply page).",
      "Do Re-KYC through DigiLocker first, and log in with your own DigiLocker, JanParichay or e-Pramaan credentials. Your name and date of birth must match your Class 10 certificate.",
    "Register on the official site and note your Application Number. Keep your password.",
      "Fill the form, upload your own photograph and documents, and pay the fee before the last date in the dates table. If you made a mistake, you may submit a fresh form before that date (only the last one with the fee paid counts) or wait for the correction window.",
      "Print the Confirmation Page once it is generated. If it does not appear, follow the steps on the how-to-apply page.",
      "Use the correction window if something is wrong. There is no correction after it closes.",
      "On the release date, download the admit card and print at least four copies. Fill in the self-declaration.",
      "Pack the admit card, 2 photographs and one original photo ID. Reach the centre before the gates close.",
      "After the exam, download your response sheet. Challenge a question only with a reason; each challenge costs a fee.",
      "Check your NTA score. If you sat both sessions, the better one counts.",
      "Plan counselling: JoSAA and CSAB for admission, and JEE Advanced if you are aiming for the IITs.",
    ],
    fees: {
      sourceName: "JEE (Main) 2027 Information Bulletin, fee table (Paper 1 only, Session 1)",
      source: JEE_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "General, male (India)", value: "₹1,000", note: "Outside India: ₹5,000" },
        { label: "General, female (India)", value: "₹800", note: "Outside India: ₹4,000" },
        { label: "General-EWS / OBC (NCL), male (India)", value: "₹900", note: "Outside India: ₹4,500" },
        { label: "General-EWS / OBC (NCL), female (India)", value: "₹800", note: "Outside India: ₹4,000" },
        { label: "SC / ST / PwD / PwBD (India)", value: "₹500", note: "Outside India: ₹2,500" },
        { label: "Third gender (India)", value: "₹500", note: "Outside India: ₹2,500" },
        { label: "Late fee", value: "₹500 extra, on top of the category fee" },
      ],
    },
  },
  {
    slug: "neet-ug",
    name: "NEET (UG)",
    short: "NEET UG",
    cycle: "2026 rules (the 2027 bulletin is not out yet)",
    conductedBy: "National Testing Agency (NTA)",
    officialSite: "https://neet.nta.nic.in/",
    officialName: "neet.nta.nic.in",
    what: "NEET (UG) is the single national entrance test for admission to undergraduate medical courses.",
    statusNow: "NTA's site shows the NEET (UG) 2026 results, a re-examination held on 21 June 2026, and a fee refund for candidates of the exam held on 3 May 2026. No NEET (UG) 2027 notice is on the site yet.",
    pending: ["The 2027 information bulletin", "Dates for the 2027 application and exam", "Any change to the fee or pattern for 2027"],
    applyAt: { label: "NEET (UG) official site", url: "https://neet.nta.nic.in/" },
    dates: {
      sourceName: "NEET (UG) 2026 Information Bulletin (the latest published)",
      source: NEET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "2026 exam date in the bulletin", value: "3 May 2026 (Sunday), 2:00 PM to 5:00 PM, single shift", note: "NTA's site later lists a re-examination on 21 June 2026. Use the official site for the 2027 dates when they appear." },
        { label: "2026 last date to pay the fee", value: "8 March 2026" },
        { label: "Duration", value: "180 minutes (3 hours)" },
        { label: "Mode", value: "Pen and paper (OMR), in a single day and single shift" },
        { label: "2027 dates", value: "Not announced", note: "NTA's NEET (UG) site has no 2027 notice at the time of checking." },
      ],
    },
    eligibility: {
      sourceName: "NEET (UG) 2026 Information Bulletin, eligibility",
      source: NEET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Minimum age", value: "17 years completed on or before 31 December of the year you appear" },
        { label: "2026 cut-off birth date", value: "General (UR) and General-EWS candidates must be born on or before 31 December 2009", note: "The bulletin gives a separate line for SC/ST/OBC-NCL/PwBD. See the bulletin." },
        { label: "Upper age limit", value: "None", note: "Per the National Medical Commission's letter cited in the bulletin." },
      ],
    },
    pattern: {
      sourceName: "NEET (UG) 2026 Information Bulletin, pattern",
      source: NEET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Subjects", value: "Physics, Chemistry, Biology (Botany and Zoology)" },
        { label: "Question type", value: "Multiple choice, four options, one correct answer" },
        { label: "Physics", value: "45 questions, 180 marks" },
        { label: "Chemistry", value: "45 questions, 180 marks" },
        { label: "Biology (Botany and Zoology)", value: "90 questions, 360 marks" },
        { label: "Total", value: "180 questions, 720 marks" },
        { label: "Marking", value: "Correct answer +4. Any incorrect option −1" },
        { label: "Duration", value: "3 hours (180 minutes)" },
      ],
    },
    apply: {
      sourceName: "NEET (UG) 2026 Information Bulletin, how to apply online (the latest published)",
      source: NEET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Where", value: "Online only, on the NEET (UG) site neet.nta.nic.in" },
        { label: "Step 1: register", value: "Register for the online form and note the system-generated Application Number. Create a password and choose a security question and answer." },
        { label: "Step 2: fill the form", value: "Log in with the Application Number and password. Fill personal details, choose the question paper medium and exam cities, give your educational qualification details, and upload the images and documents." },
        { label: "Step 3: pay the fee", value: "Pay by debit card, credit card, UPI or net banking. Processing charges and GST are charged by the bank or gateway on top of the fee.", note: "After a successful payment you can print the Confirmation Page." },
        { label: "If no Confirmation Page appears", value: "The transaction is treated as cancelled. Contact the bank or payment gateway at the helpline in the bulletin, and make another payment.", note: "NTA says it reconciles multiple payments after the final result and refunds them." },
        { label: "Live photograph", value: "Taken while you fill the form" },
        { label: "Photograph file", value: "Recent passport-size photograph taken after 1 January 2026, in colour or black and white, white background, 80% of the image your face (including ears, no mask). JPG/JPEG, 10 kB to 200 kB" },
        { label: "Signature file", value: "JPG/JPEG, 10 kB to 100 kB" },
        { label: "Left and right hand finger and thumb impressions", value: "JPG/JPEG, 10 kB to 200 kB. Unclear impressions are rejected." },
        { label: "Class 10 certificate and marksheet", value: "Each as a PDF, 50 kB to 300 kB" },
        { label: "Conversion certificate (if your Class 10 marks are in CGPA)", value: "PDF, 50 kB to 300 kB" },
        { label: "Category certificate (if it applies)", value: "PDF, 50 kB to 300 kB" },
        { label: "Photograph advice", value: "The bulletin advises keeping 6 to 8 colour passport-size photographs with a white background. The same photograph should be used for the form, the exam and counselling." },
        { label: "Refund", value: "The fee once deposited is not refunded, and is not carried forward to a future exam" },
      ],
    },
    portals: {
      sourceName: "NEET (UG) 2026 Information Bulletin and neet.nta.nic.in (the latest published)",
      source: NEET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Official site", value: "neet.nta.nic.in, run by NTA", href: "https://neet.nta.nic.in/" },
        { label: "Register and apply", value: "Register on the official site, note the system-generated Application Number, create a password and a security question, then log in to finish the form.", href: "https://neet.nta.nic.in/" },
        { label: "What you log in with", value: "The Application Number and the password you created" },
        { label: "Where the admit card is", value: "Downloaded from neet.nta.nic.in. The 2027 release date is not announced." },
        { label: "Helpdesk", value: "NTA helpdesk page on the official site", href: "https://neet.nta.nic.in/nta-helpdesk/" },
        { label: "Answer keys and scorecard", value: "Published on the official site. The bulletin says the Confirmation Page, scanned OMR sheet and score card are sent to your registered email." },
      ],
    },
    syllabus: {
      sourceName: "NEET (UG) 2026 syllabus, official NTA document",
      source: NEET_SYLLABUS,
      checked: CHECKED,
      rows: [
        { label: "Physics, 20 units", value: "Physics and measurement · Kinematics · Laws of motion · Work, energy and power · Rotational motion · Gravitation · Properties of solids and liquids · Thermodynamics · Kinetic theory of gases · Oscillations and waves · Electrostatics · Current electricity · Magnetic effects of current and magnetism · Electromagnetic induction and alternating currents · Electromagnetic waves · Optics · Dual nature of matter and radiation · Atoms and nuclei · Electronic devices · Experimental skills" },
        { label: "Chemistry, 20 units", value: "Some basic concepts in chemistry · Atomic structure · Chemical bonding and molecular structure · Chemical thermodynamics · Solutions · Equilibrium · Redox reactions and electrochemistry · Chemical kinetics · Classification of elements and periodicity in properties · p-block elements · d- and f-block elements · Co-ordination compounds · Purification and characterisation of organic compounds · Some basic principles of organic chemistry · Hydrocarbons · Organic compounds containing halogens · Organic compounds containing oxygen · Organic compounds containing nitrogen · Biomolecules · Principles related to practical chemistry" },
        { label: "Biology (Botany and Zoology), 10 units", value: "Diversity in living world · Structural organisation in animals and plants · Cell structure and function · Plant physiology · Human physiology · Reproduction · Genetics and evolution · Biology and human welfare · Biotechnology and its applications · Ecology and environment" },
        { label: "The full topic list", value: "Each unit has a detailed topic list in the official syllabus document", href: "https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/01/202601081066816297.pdf" },
      ],
    },
    material: {
      sourceName: "neet.nta.nic.in (official links)",
      source: "https://neet.nta.nic.in/",
      checked: CHECKED,
      rows: [
        { label: "Syllabus", value: "The official NEET (UG) syllabus, as a PDF", href: "https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/01/202601081066816297.pdf" },
        { label: "Information Bulletin", value: "The rules, pattern, marking and procedure. The latest published is for 2026.", href: "https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/02/202602231394640855.pdf" },
        { label: "Answer keys", value: "The official site publishes the final answer keys after each exam", href: "https://neet.nta.nic.in/" },
        { label: "Help", value: "Helpdesk and help pages on the official site", href: "https://neet.nta.nic.in/help/" },
      ],
    },
    afterApply: {
      sourceName: "NEET (UG) 2026 Information Bulletin: admit card and exam day (the latest published)",
      source: NEET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Admit card", value: "Download it from neet.nta.nic.in. NTA does not post it, and no duplicate is issued at the centre." },
        { label: "Carry on the exam day", value: "A printed admit card with your passport-size photograph pasted on it; one passport-size photograph (same as uploaded) for the attendance sheet; one 4 x 6 inch colour photograph with a white background to paste on the proforma downloaded with the admit card; and one original, valid photo ID", note: "Accepted IDs in the bulletin include PAN card, driving licence, voter ID, passport, Aadhaar, DigiLocker and APAAR ID. Add your PwBD certificate if you claim that relaxation. Without these documents you are not allowed to sit the exam." },
        { label: "Dress code", value: "Heavy clothes and long sleeves are not preferred. If you wear cultural or customary dress, report an hour before the last reporting time. For articles of faith, report two hours before." },
        { label: "Score card", value: "The bulletin lists the OMR sheet and score card among the documents sent to your registered email, and keeps them in DigiLocker. Keep several copies of your documents for counselling." },
      ],
    },
    checklist: [
      "Wait for the 2027 Information Bulletin on the official site. Until then, treat these pages as last year's rules.",
      "Check eligibility: the minimum age rule (17 completed by 31 December of the exam year) and that there is no upper age limit.",
      "Get a recent passport-size photograph with a white background and keep 6 to 8 prints. Scan the photograph, signature and finger and thumb impressions in the right sizes.",
      "Register, note the Application Number, then fill the form, upload and pay before the last date.",
      "Print the Confirmation Page. If it does not appear, follow the steps on the how-to-apply page.",
      "Download the admit card on its release date and print it. Paste your photograph on it.",
      "Prepare the 4 x 6 inch colour photograph for the proforma, the attendance-sheet photograph and one original photo ID.",
      "Plan your dress and your arrival time using the dress code rules.",
      "Keep your Confirmation Page, admit card and score card copies for counselling.",
    ],
    fees: {
      sourceName: "NEET (UG) 2026 Information Bulletin, fee table",
      source: NEET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "General (India)", value: "₹1,700", note: "Outside India: ₹9,500" },
        { label: "General-EWS / OBC-NCL (India)", value: "₹1,600" },
        { label: "SC / ST / PwBD / PwD / Third gender (India)", value: "₹1,000" },
        { label: "Refund", value: "Fee once deposited is not refunded", note: "The bulletin says so, but NTA announced a refund for the exam of 3 May 2026. Read NTA's notices." },
      ],
    },
  },
  {
    slug: "cuet-ug",
    name: "CUET (UG)",
    short: "CUET UG",
    cycle: "2026 rules (the 2027 bulletin is not out yet)",
    conductedBy: "National Testing Agency (NTA)",
    officialSite: "https://cuet.nta.nic.in/",
    officialName: "cuet.nta.nic.in",
    what: "CUET (UG) is the Common University Entrance Test for undergraduate admission to Central Universities and the State and other universities that accept its scores.",
    statusNow: "NTA's site shows the CUET (UG) 2026 results and score cards (June 2026). Its page header still says 2025. No CUET (UG) 2027 bulletin is on the site yet.",
    pending: ["The 2027 information bulletin", "Application and exam dates for 2027", "Any change to the subjects, fee or pattern for 2027"],
    applyAt: { label: "CUET (UG) official site", url: "https://cuet.nta.nic.in/" },
    dates: {
      sourceName: "CUET (UG) 2026 Information Bulletin (the latest published)",
      source: CUET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "2026 application", value: "3 to 30 January 2026, up to 11:50 PM" },
        { label: "2026 last date to pay the fee", value: "31 January 2026, up to 11:50 PM" },
        { label: "2026 correction window", value: "2 to 4 February 2026" },
        { label: "2026 exam window in the bulletin", value: "11 to 31 May 2026 (tentative)", note: "NTA's site shows the exam began on 11 May 2026 and that one shift on 30 May 2026 was rescheduled after a technical glitch." },
        { label: "2027 dates", value: "Not announced", note: "NTA's CUET (UG) site has no 2027 notice at the time of checking." },
      ],
    },
    eligibility: {
      sourceName: "CUET (UG) 2026 Information Bulletin, eligibility",
      source: CUET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Age limit for CUET", value: "None", note: "The university you apply to may have its own age criteria." },
        { label: "Who can appear", value: "Candidates who passed Class 12 (or equivalent), or are appearing in 2026 (the year of that bulletin)" },
        { label: "Qualifying exams accepted", value: "10+2 from a recognised Central or State board, intermediate or pre-university exams, the NDA two-year joint services course, NIOS senior secondary (minimum five subjects), and exams recognised as equivalent by AIU or UGC" },
        { label: "Choice of subjects", value: "Up to five, including languages and the General Aptitude Test, whatever subjects you took in Class 12", note: "Pick subjects according to the programme and university you want." },
      ],
    },
    pattern: {
      sourceName: "CUET (UG) 2026 Information Bulletin, information at a glance",
      source: CUET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Mode", value: "Computer Based Test (CBT), in multiple shifts" },
        { label: "Total subjects", value: "37: 13 languages, 23 domain subjects and 1 General Aptitude Test" },
        { label: "Languages", value: "Assamese, Bengali, English, Gujarati, Hindi, Kannada, Malayalam, Marathi, Punjabi, Odia, Tamil, Telugu and Urdu" },
        { label: "Questions per test paper", value: "50, all compulsory" },
        { label: "Duration per test paper", value: "60 minutes" },
        { label: "Marking", value: "Correct answer +5. Each incorrect answer −1" },
        { label: "Domain subject syllabus", value: "As per the NCERT syllabus" },
        { label: "General Aptitude Test", value: "General knowledge, current affairs, general mental ability, numerical ability, quantitative reasoning, logical and analytical reasoning" },
      ],
    },
    apply: {
      sourceName: "CUET (UG) 2026 Information Bulletin, how to apply online (the latest published)",
      source: CUET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Where", value: "Online only, at cuet.nta.nic.in", note: "Read the Information Bulletin first to be sure of your eligibility." },
        { label: "Step 1: register", value: "Register for the online form and note the system-generated Application Number. Create a password and choose a security question and answer." },
        { label: "Step 2: fill the form", value: "Log in with the Application Number and password. Fill personal details and educational qualification, choose universities and programmes, pick your test papers and exam cities, and upload the images and documents." },
        { label: "Step 3: pay the fee", value: "Pay online by net banking, credit card, debit card or UPI. Processing charges and GST are charged by the bank or gateway on top of the fee." },
        { label: "Step 4: Confirmation Page", value: "Download, save and print the Confirmation Page, which is available only after the fee is paid.", note: "The three steps can be done together or at separate times. Your application counts as successful only after the fee is received." },
        { label: "Live photograph", value: "Taken while you fill the form" },
        { label: "Photograph file", value: "Recent passport-size photograph in colour, white background, 80% face (including ears, no mask). JPG/JPEG, 10 kB to 200 kB" },
        { label: "Signature file", value: "JPG/JPEG, clearly legible, 10 kB to 50 kB" },
        { label: "Disability or UDID certificate (if it applies)", value: "PDF, clearly legible, 50 kB to 300 kB" },
        { label: "Password", value: "Note your password: you need it for every later login" },
        { label: "Refund", value: "No request for a refund of the fee once paid is entertained" },
      ],
    },
    portals: {
      sourceName: "CUET (UG) 2026 Information Bulletin and cuet.nta.nic.in (the latest published)",
      source: CUET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Official site", value: "cuet.nta.nic.in, run by NTA", href: "https://cuet.nta.nic.in/" },
        { label: "Register and apply", value: "Register on the official site, note the Application Number, create a password and a security question, then log in to finish the form.", href: "https://cuet.nta.nic.in/" },
        { label: "What you log in with", value: "The Application Number and the password you created", note: "Note the password: you need it for every later login." },
        { label: "Universities that accept CUET", value: "The official site keeps the list of participating universities", href: "https://cuet.nta.nic.in/participating-universities/" },
        { label: "Helpdesk", value: "NTA help desk page on the official site", href: "https://cuet.nta.nic.in/nta-helpdesk/" },
        { label: "Admit card, answer keys, score card", value: "All on cuet.nta.nic.in. The 2027 dates are not announced." },
      ],
    },
    syllabus: {
      sourceName: "CUET (UG) 2026 Information Bulletin, information at a glance and Appendix II",
      source: CUET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "How the syllabus is organised", value: "37 test papers: 13 languages, 23 domain-specific subjects and 1 General Aptitude Test. You choose up to five." },
        { label: "Languages (13)", value: "Assamese · Bengali · English · Gujarati · Hindi · Kannada · Malayalam · Marathi · Punjabi · Odia · Tamil · Telugu · Urdu", note: "A language is tested by reading comprehension (factual, literary and narrative passages), literary aptitude and vocabulary." },
        { label: "Domain subjects (23)", value: "Accountancy / Book Keeping · Agriculture · Anthropology · Biology / Biological Science / Biotechnology / Biochemistry · Business Studies · Chemistry · Environmental Science · Computer Science / Information Practices · Economics / Business Economics · Fine Arts / Visual Arts / Commercial Arts · Geography / Geology · History · Home Science · Knowledge Tradition and Practices in India · Mass Media / Mass Communication · Mathematics / Applied Mathematics · Performing Arts · Physical Education · Physics · Political Science · Psychology · Sanskrit · Sociology", note: "The syllabus for domain subjects is as per the NCERT syllabus." },
        { label: "General Aptitude Test", value: "General knowledge, current affairs, general mental ability, numerical ability, quantitative reasoning (basic arithmetic, algebra, geometry, mensuration, statistics) and logical and analytical reasoning" },
        { label: "Subject-wise topics", value: "Every test paper has its own syllabus on the official site", href: "https://cuet.nta.nic.in/cuetug-2026-syllabus/" },
      ],
    },
    material: {
      sourceName: "cuet.nta.nic.in and nta.ac.in (official links)",
      source: "https://cuet.nta.nic.in/",
      checked: CHECKED,
      rows: [
        { label: "Syllabus", value: "The official CUET (UG) syllabus page, with a syllabus for each test paper", href: "https://cuet.nta.nic.in/cuetug-2026-syllabus/" },
        { label: "Information Bulletin", value: "The rules, pattern, marking and procedure. The latest published is for 2026.", href: "https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2026/01/202601031633478370.pdf" },
        { label: "Domain subjects", value: "The bulletin says the domain-subject syllabus follows the NCERT syllabus, so NCERT textbooks for the subject are the base", href: "https://ncert.nic.in/" },
        { label: "Practice", value: "National Testing Abhyas, linked from the official CUET and JEE (Main) sites", href: "https://www.nta.ac.in/abhyas" },
        { label: "Universities and programmes", value: "Check the programme's own eligibility and the subjects it asks for on the participating universities page", href: "https://cuet.nta.nic.in/participating-universities/" },
      ],
    },
    afterApply: {
      sourceName: "CUET (UG) 2026 Information Bulletin: admit card, exam day, key challenge and score (the latest published)",
      source: CUET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "Admit card", value: "Download it from cuet.nta.nic.in. NTA does not post it, and no duplicate is issued at the centre." },
        { label: "Carry on the exam day", value: "A clear A4 print of the admit card with the self-declaration filled in; one passport-size photograph (the same as uploaded) for the attendance sheet; and one original, valid, non-expired photo ID", note: "Accepted IDs in the bulletin: school ID, PAN, passport, Aadhaar (with photo), e-Aadhaar with photo, Class 12 board admit card with photo, bank passbook with photo. Add your PwD or PwBD certificate if you claim that relaxation. Without these documents you are not allowed to sit the exam." },
        { label: "Reporting time", value: "A candidate who reaches the centre after the gate closing time is not allowed to appear. The time is on the admit card." },
        { label: "Answer key challenge", value: "NTA displays the provisional answer key for two to three days. You can challenge a question by paying a non-refundable ₹200 per question, with a justification." },
        { label: "Marking", value: "Correct answer +5. Incorrect answer −1. Unanswered 0." },
        { label: "Score", value: "NTA publishes your NTA score, which the participating universities use for admission. Check each programme's own cut-off and rules." },
      ],
    },
    checklist: [
      "Wait for the 2027 Information Bulletin on the official site. Until then, treat these pages as last year's rules.",
      "Decide the universities and programmes you want, and check which test papers each one asks for. You can choose up to five.",
      "Check you are eligible: no age limit for CUET itself, but the university may have its own rule.",
      "Get your photograph and signature ready in the right sizes (on the how-to-apply page).",
      "Register, note the Application Number and password, then fill the form, upload and pay before the last date.",
      "Print the Confirmation Page, which appears only after the fee is paid.",
      "Download the admit card on its release date. Print it and fill in the self-declaration.",
      "Pack the admit card, one photograph and one original photo ID, and arrive before the gates close.",
      "After the exam, check the provisional answer key. A challenge costs a fee per question.",
      "Check your NTA score and each university's own admission rules.",
    ],
    fees: {
      sourceName: "CUET (UG) 2026 Information Bulletin, fee structure",
      source: CUET_BULLETIN,
      checked: CHECKED,
      rows: [
        { label: "General (UR), up to 3 subjects", value: "₹1,000", note: "Each additional subject: ₹400" },
        { label: "OBC (NCL) / EWS, up to 3 subjects", value: "₹900", note: "Each additional subject: ₹375" },
        { label: "SC / ST / PwD / PwBD / Third gender, up to 3 subjects", value: "₹800", note: "Each additional subject: ₹350" },
        { label: "Centres outside India, up to 3 subjects", value: "₹4,500", note: "Each additional subject: ₹1,800" },
        { label: "Refund", value: "No request for a refund of the fee is entertained" },
      ],
    },
  },
  {
    slug: "upsc-cse",
    name: "UPSC Civil Services Examination 2027",
    short: "UPSC CSE",
    cycle: "2027 dates from UPSC's calendar. Rules from the 2026 notice, until the 2027 notice on 13 January 2027",
    conductedBy: "Union Public Service Commission (UPSC)",
    officialSite: "https://www.upsc.gov.in/",
    officialName: "upsc.gov.in",
    what: "The Civil Services Examination selects officers for the IAS, IPS, IFS and other central services. It has a Preliminary examination and a Main examination, followed by an interview. The Indian Forest Service preliminary stage is held through the same Civil Services (Preliminary) Examination.",
    statusNow: "UPSC's site shows the 2027 calendar published in May 2026. The notification for the 2027 examination is scheduled for 13 January 2027, so it is not out yet.",
    pending: ["The 2027 notification (scheduled for 13 January 2027): the final eligibility, age limits, number of attempts, vacancies and fee for 2027", "Any change to the syllabus and scheme for 2027"],
    applyAt: { label: "UPSC online application (ORA)", url: "https://upsconline.nic.in/ora/" },
    dates: {
      sourceName: "UPSC programme of examinations, calendar year 2027 (published May 2026)",
      source: UPSC_CALENDAR,
      checked: CHECKED,
      rows: [
        { label: "Notification of the examination", value: "13 January 2027" },
        { label: "Last date to apply", value: "2 February 2027" },
        { label: "Civil Services (Preliminary) Examination", value: "23 May 2027 (Sunday), 1 day" },
        { label: "Civil Services (Main) Examination", value: "20 August 2027 (Friday), 5 days" },
        { label: "Indian Forest Service (Preliminary)", value: "Through the Civil Services (Preliminary) Examination 2027, same notification dates" },
        { label: "Indian Forest Service (Main)", value: "21 November 2027, 7 days" },
        { label: "Calendar disclaimer", value: "UPSC says the dates of notification, commencement and duration are liable to alteration if circumstances warrant" },
      ],
    },
    eligibility: {
      sourceName: "UPSC Civil Services Examination 2026 notice (the latest published rules)",
      source: UPSC_NOTIF,
      checked: CHECKED,
      rows: [
        { label: "Age", value: "At least 21 and not yet 32 on 1 August of the exam year", note: "In 2026 that meant born between 2 August 1994 and 1 August 2005. The 2027 notice will give the 2027 dates." },
        { label: "Upper age relaxation", value: "Up to 5 years for SC and ST, and up to 3 years for OBC candidates eligible for reservation", note: "The notice lists further relaxations." },
        { label: "Number of attempts", value: "Six attempts", note: "SC and ST: unlimited. OBC: nine. PwBD: nine for General, EWS and OBC, and unlimited for SC and ST." },
        { label: "Education", value: "A graduate degree from a recognised university, or an equivalent qualification", note: "Final-year students can appear, and must produce proof of passing within the time the rules give." },
        { label: "Provisional admission", value: "Admission to every stage is provisional. UPSC checks eligibility against original documents only after you qualify for the Interview / Personality Test." },
      ],
    },
    pattern: {
      sourceName: "UPSC Civil Services Examination 2026 notice (the latest published rules)",
      source: UPSC_NOTIF,
      checked: CHECKED,
      rows: [
        { label: "Stages", value: "Preliminary (objective), Main (written), then the Interview / Personality Test" },
        { label: "Preliminary", value: "Two objective papers (multiple choice) of 200 marks each, 400 in all, two hours each", note: "The Preliminary is a screening test. Its marks do not count in the final merit." },
        { label: "Preliminary Paper II", value: "Qualifying only: you need at least 33%" },
        { label: "Negative marking in the Preliminary", value: "One-third (0.33) of a question's marks is deducted for a wrong answer", note: "More than one answer marked counts as wrong." },
        { label: "Who reaches the Main", value: "About twelve to thirteen times the number of vacancies" },
        { label: "Main: qualifying papers", value: "Paper A (an Indian language) 300 marks and Paper B (English) 300 marks, of Matriculation standard", note: "Marks in these do not count for ranking." },
        { label: "Main: papers that count", value: "Essay 250. General Studies I, II, III and IV, 250 each. Optional subject Paper I and Paper II, 250 each" },
        { label: "Main: totals", value: "Written 1750 marks, Personality Test 275 marks, grand total 2025 marks" },
        { label: "Main: duration", value: "Each paper is three hours" },
      ],
    },
    fees: {
      sourceName: "UPSC Civil Services Examination 2026 notice (the latest published rules)",
      source: UPSC_NOTIF,
      checked: CHECKED,
      rows: [
        { label: "Preliminary", value: "₹100", note: "Women, SC, ST and PwBD candidates pay no fee." },
        { label: "Main", value: "A further ₹200", note: "Same exemptions. It is paid in a 10-day window after the Preliminary result." },
        { label: "How to pay", value: "Net banking of any bank, or a Visa, Master or RuPay credit or debit card, or UPI" },
      ],
    },
    apply: {
      sourceName: "UPSC Civil Services Examination 2026 notice, how to apply (the latest published)",
      source: UPSC_NOTIF,
      checked: CHECKED,
      rows: [
        { label: "Where", value: "Online only, at upsconline.nic.in" },
        { label: "The four modules", value: "Account creation, Universal Registration and the Common Application Form (all three can be filled at any time), then the examination-specific module, which opens in the window the notice allows" },
        { label: "URN", value: "Registering gives you a Universal Registration Number, used for every UPSC exam. You register once in your lifetime." },
        { label: "Application Number", value: "Generated when you finish the exam-specific form. It differs for each exam. Keep it with your URN for any contact with UPSC." },
        { label: "ID document", value: "UPSC strongly advises Aadhaar. You give the details of one photo ID while filling the URN profile and should carry that ID to the exam." },
        { label: "Photo and signature", value: "Uploaded in the form; the portal has instructions under Photos and Signature" },
        { label: "Before you start", value: "Read the portal's general instructions first and have your documents ready" },
      ],
    },
    portals: {
      sourceName: "UPSC Civil Services Examination 2026 notice and upsc.gov.in (the latest published)",
      source: UPSC_NOTIF,
      checked: CHECKED,
      rows: [
        { label: "Official site", value: "upsc.gov.in", href: "https://www.upsc.gov.in/" },
        { label: "Apply, log in and download the e-admit card", value: "upsconline.nic.in, the Online Application Portal", href: "https://upsconline.nic.in/ora/" },
        { label: "What you log in with", value: "The account you create there; the URN and Application Number identify you after that" },
        { label: "E-admit card", value: "Issued on the last working day of the week before the exam and downloaded from the portal. No admit card is sent by post or email." },
        { label: "Question paper representations", value: "After the Preliminary, you can send representations on the questions and the answer key at upsconline.nic.in, under Examinations, then Representations on Question Paper, in a window from the third day after the exam to 6:00 PM on the seventh day", note: "UPSC accepts nothing by email, post or hand, and nothing after the window." },
      ],
    },
    syllabus: {
      sourceName: "UPSC Civil Services Examination 2026 notice, Section III: syllabi",
      source: UPSC_NOTIF,
      checked: CHECKED,
      rows: [
        { label: "Preliminary Paper I (General Studies, 200 marks)", value: "Current events of national and international importance · History of India and the Indian National Movement · Indian and world geography (physical, social, economic) · Indian polity and governance · Economic and social development · General issues on environment, ecology, bio-diversity and climate change · General science" },
        { label: "Preliminary Paper II (CSAT, 200 marks, qualifying)", value: "Comprehension · Interpersonal skills including communication skills · Logical reasoning and analytical ability · Decision making and problem solving · General mental ability · Basic numeracy and data interpretation (Class X level)" },
        { label: "Main: Essay (250)", value: "You may be asked to write essays on several topics, and are expected to keep closely to the subject" },
        { label: "Main: General Studies I (250)", value: "Indian heritage and culture, history and geography of the world, and society" },
        { label: "Main: General Studies II (250)", value: "Governance, constitution, polity, social justice and international relations" },
        { label: "Main: General Studies III (250)", value: "Technology, economic development, bio-diversity, environment, security and disaster management" },
        { label: "Main: General Studies IV (250)", value: "Ethics, integrity and aptitude" },
        { label: "Main: Optional subject (two papers, 250 each)", value: "One subject from the list of optional subjects in the notice, with its own syllabus" },
        { label: "The full syllabus", value: "The complete syllabi, including every optional subject, are in Section III of the notice", href: "https://www.upsc.gov.in/sites/default/files/Notif-CSP-2026-Engl-060226Rev.pdf" },
      ],
    },
    material: {
      sourceName: "upsc.gov.in (official links)",
      source: "https://www.upsc.gov.in/",
      checked: CHECKED,
      rows: [
        { label: "The notice with the full syllabus", value: "The 2026 Civil Services notice, which contains the rules, plan of examination and syllabus", href: "https://www.upsc.gov.in/sites/default/files/Notif-CSP-2026-Engl-060226Rev.pdf" },
        { label: "Previous question papers", value: "UPSC publishes past question papers on its site", href: "https://www.upsc.gov.in/examinations/previous-question-papers" },
        { label: "Revised syllabus and scheme", value: "UPSC's page of syllabus and scheme documents", href: "https://www.upsc.gov.in/examinations/revised-syllabus-scheme" },
        { label: "Answer keys", value: "UPSC's answer keys page", href: "https://www.upsc.gov.in/examinations/answer-key" },
        { label: "Cut-off marks", value: "UPSC's cut-off marks page", href: "https://www.upsc.gov.in/examinations/cutoff-marks--" },
        { label: "Exam calendar", value: "The programme of examinations for the year", href: "https://www.upsc.gov.in/examinations/exam-calendar" },
        { label: "FAQs and help", value: "UPSC's FAQs page, helpdesk 011-24041001 / 011-40303444, and the helpline for SC, ST, OBC, EWS and PwBD candidates 1800-118-711", href: "https://www.upsc.gov.in/faqs" },
      ],
    },
    afterApply: {
      sourceName: "UPSC Civil Services Examination 2026 notice: admit card and exam day (the latest published)",
      source: UPSC_NOTIF,
      checked: CHECKED,
      rows: [
        { label: "E-admit card", value: "Download it from upsconline.nic.in. It comes out on the last working day of the week before the exam." },
        { label: "Carry on the exam day", value: "Your e-admit card and the photo ID whose details you gave in the URN profile", note: "The notice advises carrying that ID when you appear for the exam or the Personality Test." },
        { label: "Wrong answers", value: "The Preliminary has negative marking, so guess with care" },
        { label: "Admission is provisional", value: "A valid e-admit card does not mean UPSC has cleared your candidature. UPSC checks eligibility documents only after the Main." },
        { label: "Question paper representation", value: "Open for five days after the Preliminary, only on the portal" },
      ],
    },
    checklist: [
      "Wait for the 2027 notice (scheduled for 13 January 2027). The rules here are from the 2026 notice and may change.",
      "Check the age, attempts and degree rules for your category once the 2027 notice is out.",
      "Create your account and complete your Universal Registration at upsconline.nic.in now: it can be done at any time and is only done once in your life.",
      "Keep a valid photo ID ready, ideally Aadhaar, and note your URN.",
      "Pick your optional subject from the list in the notice and read its syllabus.",
      "When the exam window opens, fill the exam-specific form, upload, pay if you are not exempt, and apply before the last date.",
      "Download the e-admit card in the week before the Preliminary. Carry it and your photo ID.",
      "After the Preliminary, use the question-paper representation window if you need it.",
      "If you qualify for the Main, pay the Main fee in its window (unless exempt) and prepare for the written papers.",
    ],
  },
];

export const bySlug = (slug: string) => EXAMS.find((e) => e.slug === slug);

export interface Section {
  slug: "how-to-apply" | "eligibility" | "exam-pattern" | "fees";
  title: string;
  key: "apply" | "eligibility" | "pattern" | "fees";
}
export const SECTIONS: Section[] = [
  { slug: "how-to-apply", title: "How to apply", key: "apply" },
  { slug: "eligibility", title: "Eligibility", key: "eligibility" },
  { slug: "exam-pattern", title: "Exam pattern", key: "pattern" },
  { slug: "fees", title: "Application fee", key: "fees" },
];

/** The sections an exam actually has facts for. UPSC has only dates until its notification is out. */
export const sectionsOf = (e: Exam) => SECTIONS.filter((s) => e[s.key]);

/** Dated events for the all-exams calendar, sorted by date. Only rows with a day we can read are used. */
export interface CalendarEvent {
  date: string; // ISO yyyy-mm-dd, the first day of the event
  label: string;
  exam: Exam;
}
export const CALENDAR: CalendarEvent[] = [
  { date: "2026-11-22", label: "Last date to apply (JEE Main 2027 Session 1), up to 11:50 PM", exam: EXAMS[0] },
  { date: "2026-11-26", label: "Last date to apply with late fee (JEE Main 2027 Session 1)", exam: EXAMS[0] },
  { date: "2026-11-27", label: "Correction window opens (JEE Main 2027 Session 1)", exam: EXAMS[0] },
  { date: "2026-12-30", label: "Exam city announced (JEE Main 2027 Session 1)", exam: EXAMS[0] },
  { date: "2027-01-05", label: "Application opens (JEE Main 2027 Session 2)", exam: EXAMS[0] },
  { date: "2027-01-13", label: "Admit card (JEE Main 2027 Session 1)", exam: EXAMS[0] },
  { date: "2027-01-13", label: "Notification of the Civil Services Examination 2027", exam: EXAMS[3] },
  { date: "2027-01-20", label: "JEE Main 2027 Session 1 begins (20, 21, 22, 23, 24 and 28 January)", exam: EXAMS[0] },
  { date: "2027-02-02", label: "Last date to apply for the Civil Services Examination 2027", exam: EXAMS[3] },
  { date: "2027-02-03", label: "Last date to apply (JEE Main 2027 Session 2), up to 11:50 PM", exam: EXAMS[0] },
  { date: "2027-03-25", label: "Admit card (JEE Main 2027 Session 2)", exam: EXAMS[0] },
  { date: "2027-04-02", label: "JEE Main 2027 Session 2 begins (2, 3, 4, 5, 6 and 7 April)", exam: EXAMS[0] },
  { date: "2027-05-23", label: "Civil Services (Preliminary) Examination 2027", exam: EXAMS[3] },
  { date: "2027-08-20", label: "Civil Services (Main) Examination 2027 begins (5 days)", exam: EXAMS[3] },
];
