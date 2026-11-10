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
  /** Where to apply, if the source gives one. */
  applyAt?: { label: string; url: string };
}

const CHECKED = "2026-11-10";

// ---- JEE Main 2027 -----------------------------------------------------------------------------------------------
const JEE_BULLETIN = "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/202610241890224107.pdf";
const JEE_NOTICE = "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/20261024390682350.pdf";

// ---- NEET (UG): the 2027 bulletin is not out, so these are the 2026 rules ---------------------------------------
const NEET_BULLETIN = "https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/02/202602231394640855.pdf";

// ---- CUET (UG): the 2027 bulletin is not out, so these are the 2026 rules ---------------------------------------
const CUET_BULLETIN = "https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2026/01/202601031633478370.pdf";

// ---- UPSC --------------------------------------------------------------------------------------------------------
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
    statusNow: "The application form for Session 1 is open. NTA's public notice is dated 24 October 2026.",
    pending: ["Dates for Session 2 (the notice only says it will be held in April 2027)", "Result and cut-off for 2027 (published after the exam)"],
    applyAt: { label: "Apply on the official JEE Main site", url: "https://jeemain.nta.nic.in/" },
    dates: {
      sourceName: "NTA public notice, 24 October 2026 (Session 1)",
      source: JEE_NOTICE,
      checked: CHECKED,
      rows: [
        { label: "How many sessions", value: "Two: Session 1 in January 2027 and Session 2 in April 2027" },
        { label: "Application form (Session 1)", value: "24 October 2026 to 22 November 2026, up to 11:50 PM" },
        { label: "Last date to pay the fee", value: "22 November 2026, up to 11:50 PM" },
        { label: "Late application", value: "23 to 26 November 2026, with a late fee of ₹500 over the category fee", note: "Last date for the late fee payment is 26 November 2026, up to 11:50 PM." },
        { label: "Correction in the form", value: "27 to 29 November 2026 (on the website only)" },
        { label: "Exam city announced", value: "30 December 2026" },
        { label: "Admit card", value: "13 January 2027" },
        { label: "Exam dates (Session 1)", value: "20, 21, 22, 23, 24 and 28 January 2027" },
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
    cycle: "2027 (from UPSC's annual calendar)",
    conductedBy: "Union Public Service Commission (UPSC)",
    officialSite: "https://www.upsc.gov.in/",
    officialName: "upsc.gov.in",
    what: "The Civil Services Examination selects officers for the IAS, IPS, IFS and other central services. It has a Preliminary examination and a Main examination, followed by an interview. The Indian Forest Service preliminary stage is held through the same Civil Services (Preliminary) Examination.",
    statusNow: "UPSC's site shows the 2027 calendar published in May 2026. The notification for the 2027 examination is scheduled for 13 January 2027, so it is not out yet.",
    pending: ["The 2027 notification (scheduled for 13 January 2027): eligibility, age limits, number of attempts, vacancies and fee", "Syllabus and scheme as they stand for 2027"],
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
  { date: "2027-01-13", label: "Admit card (JEE Main 2027 Session 1)", exam: EXAMS[0] },
  { date: "2027-01-13", label: "Notification of the Civil Services Examination 2027", exam: EXAMS[3] },
  { date: "2027-01-20", label: "JEE Main 2027 Session 1 begins (20, 21, 22, 23, 24 and 28 January)", exam: EXAMS[0] },
  { date: "2027-02-02", label: "Last date to apply for the Civil Services Examination 2027", exam: EXAMS[3] },
  { date: "2027-05-23", label: "Civil Services (Preliminary) Examination 2027", exam: EXAMS[3] },
  { date: "2027-08-20", label: "Civil Services (Main) Examination 2027 begins (5 days)", exam: EXAMS[3] },
];
