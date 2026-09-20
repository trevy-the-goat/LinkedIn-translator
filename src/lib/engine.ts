/* ------------------------------------------------------------------
   LinkedIn Translator — Offline Mock Engine ("PowerPhrase 4.2 Turbo")
   Deterministic chaos: detects what brutally honest thing the user
   confessed to, then inflates it into engagement-optimized slop.
------------------------------------------------------------------- */

export interface ViralityStats {
  impressions: number;
  recruiters: number;
  cringe: number; // percentage
}

export interface TranslationResult {
  text: string;
  category: string;
  detectedLabel: string;
  aiPowered: boolean;
  stats: ViralityStats;
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function genStats(): ViralityStats {
  return {
    impressions: Math.floor(12000 + Math.random() * 328000),
    recruiters: Math.floor(2 + Math.random() * 44),
    cringe: Math.floor(63 + Math.random() * 36),
  };
}

export function formatCompact(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

/* ------------------------- Category: FIRED ------------------------- */
const fired = () =>
  [
    `I'm humbled and thrilled to announce that my organization and I have mutually agreed that my growth had officially outpaced their org chart. 🚀`,
    `Yesterday, HR gifted me something most managers never will: total calendar clarity.`,
    `Being "fired" is simply a company admitting, in writing, that your personal brand has achieved escape velocity. 📈`,
    `No salary? No problem. Abundance is a mindset, and rent is merely a legacy subscription model I am now free to emotionally cancel.`,
    `To my former manager — thank you for the beautifully facilitated career-decompression workshop. The exit interview was the most engaged you've ever been in my development. 🙏`,
    `I am now open to work, open to podcasts, and aggressively open to podcasts about work. 💡`,
    `What has YOUR exit velocity taught you about abundance? Agree?`,
  ].join("\n\n");

/* ---------------------- Category: FRAUD / CRIME -------------------- */
const arrested = () =>
  [
    `Reflecting on my journey… 🧠`,
    `This week I completed an unplanned, fully immersive compliance residency. Handcuffs included. Transportation provided.`,
    `Allegations are just KPIs you haven't rebranded yet. ⚖️`,
    `"Fraud" was, at its core, an aggressive approach to revenue optimization paired with a distributed interpretation of ownership. I wasn't stealing — I was stress-testing the honor system at enterprise scale.`,
    `Key insight: you haven't truly led until you've presented quarterly results to a judge. 📈`,
    `I'm now channeling every lesson into my upcoming masterclass, "Ethical Boundaries in Hypergrowth." Attendance is mandatory for me, voluntarily inspiring for everyone else.`,
    `Huge thank-you to my legal team — the only growth hackers who bill by the hour and deliver by the decade. 🙏`,
    `What has YOUR counsel advised you never to admit online? Sound off below. 🚀`,
  ].join("\n\n");

/* --------------------- Category: DOOMSCROLLING --------------------- */
const scrolling = () =>
  [
    `I don't usually share this, but radical transparency is my personal brand. 💡`,
    `Today I completed a self-directed, four-hour deep dive into distributed sentiment analysis — colloquially known as "scrolling Reddit."`,
    `While colleagues saw procrastination, I was conducting ethnographic research across 12 sub-communities, benchmarking meme velocity and stress-testing the modern attention economy. 📈`,
    `Zero emails answered. Zero standups attended. Immeasurable vibes harvested.`,
    `Multitasking isn't a distraction — it's parallel processing for the modern knowledge ecosystem. 🧠`,
    `Sometimes the most strategic contribution you can make to your employer is absolutely nothing, executed flawlessly, at scale. 🚀`,
    `To my employer, who is definitely reading this: synergy.`,
    `How do YOU disguise professional development as procrastination? Agree? 🙏`,
  ].join("\n\n");

/* ------------------------- Category: COFFEE ------------------------ */
const coffee = () =>
  [
    `Big news. ☕`,
    `This morning I architected and deployed a bespoke caffeine-enablement program across a previously underserved team.`,
    `Was it "just coffee"? Only to those lacking vision. Leaders don't make beverages — we build ecosystems of alertness. 🚀`,
    `I owned the entire value chain: ethical water sourcing, grind-size optimization, mug-to-mouth logistics, and post-sip stakeholder engagement. 📈`,
    `Nobody asked me to. That is precisely the point. Servant leadership never appears in the job description, because job descriptions never saw me coming. 🙏`,
    `Early metrics show team productivity up 4% — a figure I generated using the same methodology as the pot itself: strong, dark, and impossible to verify.`,
    `Small acts. Monumental aroma. Infinite synergy. 💡`,
    `What will YOU brew today? Agree?`,
  ].join("\n\n");

/* --------------------- Category: SLEPT IN / LATE ------------------- */
const sleptIn = () =>
  [
    `I'm humbled to share a personal milestone. 📈`,
    `This morning, my body made a strategic scheduling decision without consulting my calendar — and I missed a 9:00 AM sync.`,
    `"I overslept" is the old language. The new language: I underwent a body-led, circadian-aligned wellness intervention with REM-heavy deliverables. 🧠`,
    `The meeting happened anyway. It could have been an email. The email could have been a lesson about boundaries.`,
    `Rest is not the absence of work — it is the pre-work of greatness. While the org chart marched on, my subconscious was busy 10x-ing tomorrow's ideation pipeline. 🚀`,
    `Leaders: normalize asynchronous unconsciousness. The ROI is fully measurable in REM cycles. 🙏`,
    `When did you last let your body calendar-invite YOU? Agree?`,
  ].join("\n\n");

/* -------------------------- Category: QUIT ------------------------- */
const quit = () =>
  [
    `Thrilled to announce my next chapter: everywhere else. 🚀`,
    `After meaningful reflection — and a borderline poetic exit survey — I have decided to consciously uncouple from my role.`,
    `Quitting isn't leaving. It's graduating with honors from a curriculum of meetings that could have been emails. 📈`,
    `I didn't burn a single bridge today. I simply converted them into runway for takeoff. 💡`,
    `Massive gratitude to everyone who shaped this journey, and an end-to-end thank-you to the office chair that supported me more than leadership ever did. 🙏`,
    `My DMs are open, my calendar is clear, and my notice period was, frankly, chef's kiss.`,
    `What door did closing a door open for YOU? Agree?`,
  ].join("\n\n");

/* --------------------- Category: PROMOTED / HIRED ------------------ */
const promoted = () =>
  [
    `I'm beyond humbled to announce that, after several grueling quarters of baseline competence, the market has officially validated my personal brand. 🚀`,
    `Promotions aren't handed out — they're manifested through strategic proximity to leadership and airtight Reply-All discipline. 📈`,
    `To everyone who said "keep your head down": my head was never down. It was up, scanning for trajectory like a lighthouse of ambition. 💡`,
    `The new title is bigger. The responsibilities are vaguer. The headline writes itself.`,
    `Massive thanks to my team, whose output I will continue to leverage at scale. 🙏`,
    `Remember: you're not climbing a ladder — you're ascending a narrative.`,
    `Who else is manifesting their next level today? Agree?`,
  ].join("\n\n");

/* --------------------- Category: FAILED / BROKE IT ----------------- */
const failed = () =>
  [
    `Vulnerability time. 🧠`,
    `Yesterday I took something down for 47 unforgettable minutes. Today? I took down the notion that I'd ever play it safe.`,
    `Failure isn't falling short — it's user-testing reality. I didn't break the system; I performed an unscheduled, high-fidelity resilience audit at company scale. 💡`,
    `Every 500 error is a thousand-person lesson in stakeholder communication.`,
    `My incident report ran four pages. My personal growth? Boundless. The uptime will recover — the insights are forever. 🚀`,
    `To the teammate it woke at 3 AM: your sacrifice is my keynote origin story. Thank you for your service. 🙏`,
    `What's the most expensive lesson that ever paid for itself? Agree?`,
  ].join("\n\n");

/* ------------------- Category: REJECTED / GHOSTED ------------------ */
const rejected = () =>
  [
    `Big news from my job-search pipeline. 📈`,
    `After six rounds, a take-home assignment, and a culture interview with the founder's dog, I'm thrilled to announce I've been selected to remain exactly where I am.`,
    `Rejection is simply the market admitting my rate exceeds its imagination. 💡`,
    `The hiring manager called me "overqualified." I prefer "pre-legendary." 🚀`,
    `Every "we've decided to move forward with other candidates" is a free resilience masterclass — and I've now completed more masterclasses than most MBA programs.`,
    `Ghosting isn't unprofessional when it's mentoring you in detachment. 🙏`,
    `The search continues. The narrative? Unstoppable.`,
    `Recruiters: what don't you understand about overdelivering at interview scale? Agree?`,
  ].join("\n\n");

/* ------------------------ Category: HUNGOVER ----------------------- */
const hungover = () =>
  [
    `Reflecting on last night's relationship-building sprint… 🧠`,
    `Somewhere between the third and fourth round of "networking," I forged several high-bandwidth strategic partnerships I can no longer recall but will absolutely leverage.`,
    `A hangover is simply a full-day, body-hosted retrospective. 💡`,
    `Key insights from today's execution at 40% capacity: hydration scales, tequila doesn't, and the mute button forgives everything. 📈`,
    `To the colleague who said "one quick drink" — your vision outran our collective bandwidth, and I respect that.`,
    `Growth happens outside the comfort zone. Mine is currently anywhere without fluorescent lighting. 🙏`,
    `How do YOU convert zero-proof regrets into full-proof leadership? Agree?`,
  ].join("\n\n");

/* ----------------------- Category: CRIED / EMO --------------------- */
const cried = () =>
  [
    `Vulnerability post. 🙏`,
    `Today I experienced a high-bandwidth empathy event in the third-floor restroom — and I have never felt more aligned with my authentic leadership brand.`,
    `Crying at work isn't weakness. It's your values system syncing with the cloud in real time. 💡`,
    `Tears are just data that never made it into the dashboard. 📈`,
    `While others built walls, I built wet pathways to psychological safety. My mascara ran — but so did my emotional intelligence, at 10x throughput. 🚀`,
    `To the intern who brought tissues: that is stakeholder management. Learn.`,
    `When did you last let your feelings deliver shareholder value? Agree? 🧠`,
  ].join("\n\n");

/* -------------------- Category: DID NOTHING / LAZY ----------------- */
const lazy = () =>
  [
    `I'll say what nobody else on this platform will. 🚀`,
    `Today I accomplished absolutely nothing — and it was the most strategically aligned day of my quarter.`,
    `Doing nothing is not the absence of work. It is a full-stack audit of why we work at all. 💡`,
    `While the inbox burned, I maintained a flawless uptime of zero deliverables with 100% availability for reflection. 📈`,
    `The grindset crowd won't tell you this: stillness is a deliverable. Presence is a pipeline. My calendar was empty — and, for eight uninterrupted hours, so was my imposter syndrome. 🙏`,
    `Leaders, normalize scheduled strategic idling. The ROI is immeasurable — I checked repeatedly, instead of working.`,
    `What did YOU not accomplish today? Agree? 🧠`,
  ].join("\n\n");

/* ----------------------- Generic fallback -------------------------- */

const OPENINGS = [
  `I'm humbled and thrilled to announce:`,
  `Big news.`,
  `Reflecting on my journey today.`,
  `I don't usually post on here — but today calls for it.`,
  `Some personal news:`,
  `Vulnerability alert. 💡`,
  `This may be controversial. It's also true.`,
];

const REFRAMES = [
  `I wrote those words at 7:14 AM. By 7:16, they were core IP. 💡`,
  `Say it out loud. Now say it again, but as a KPI. That is growth. 🚀`,
  `Yesterday that was a confession. Today it's a case study. The only thing that changed was the font choice. 📈`,
  `In the old paradigm, that was a problem. In the new paradigm, it's a podcast episode. 🧠`,
  `Most people would hide that. Thought leaders package it. 🙏`,
];

const BUZZ = [
  `Here's what nobody tells you: every mundane moment is a masterclass if you italicize enough of it.`,
  `The difference between a setback and a setup is a well-lit ring light and the word "journey." 💡`,
  `Growth doesn't ask for permission. It asks for engagement. 📈`,
  `Your average Tuesday is someone's TEDx. Package accordingly. 🚀`,
  `Synergy. Paradigm. Ecosystem. Say them with me. Now say them to your manager. 🧠`,
  `I didn't choose the pivot. The pivot conducted a thorough discovery call and chose me.`,
];

const LESSONS = [
  `Three takeaways I refuse to keep gated:\n1) Own the narrative.\n2) Leverage the cringe.\n3) If it can't be a humblebrag, it shouldn't be on your calendar. 📈`,
  `Mindset isn't everything — it's the only thing, multiplied by ten. 🧠`,
  `Was it ideal? No. Was it leverage? Also no — until this post. 🙏`,
  `The real ROI was the engagement we farmed along the way. 🚀`,
];

const QUESTIONS = [
  `What mundane victory are YOU inflating today? Agree?`,
  `Your turn — when did a setback become your setup? Sound off below.`,
  `Leaders, am I wrong? Tell me in the comments. 🚀`,
  `What would your personal board of directors say? Agree? 🙏`,
];

const GENERIC_LABELS = [
  "Detected: Raw, Unmonetized Candor",
  "Detected: Pre-Humblebrag Honesty",
  "Detected: Chronically Online Truthfulness",
];

const generic = (input: string) => {
  const t = input.trim().replace(/[.!\s]+$/, "");
  return [
    pick(OPENINGS),
    `"${t}"`,
    pick(REFRAMES),
    pick(BUZZ),
    pick(LESSONS),
    pick(QUESTIONS),
  ].join("\n\n");
};

/* ----------------------- Detection matrix -------------------------- */

interface Category {
  key: string;
  match: RegExp;
  label: string;
  build: (input: string) => string;
}

const CATEGORIES: Category[] = [
  {
    key: "arrested",
    match:
      /\b(arrest|fraud|jail|prison|embezzl|launder|handcuff|ponzi|indict|lawsuit|sued|guilty|felon|crime|criminal|illegal|scam|tax evasion|dui|bail)\b/i,
    label: "Detected: Aggressive Compliance Exposure",
    build: arrested,
  },
  {
    key: "fired",
    match:
      /\b(fired|let go|terminated|laid ?off|sacked|dismissed|canned|axed|redundant|downsized|severance)\b/i,
    label: "Detected: Sudden Career Decompression",
    build: fired,
  },
  {
    key: "quit",
    match: /\b(quit|resign|gave (my )?notice|walked out|rage[- ]?quit|two weeks)\b/i,
    label: "Detected: Unscheduled Emancipation",
    build: quit,
  },
  {
    key: "promoted",
    match: /\b(promot|new job|got hired|job offer|raise|new role|signed an offer)\b/i,
    label: "Detected: Baseline Competence, Rewarded",
    build: promoted,
  },
  {
    key: "rejected",
    match: /\b(reject|ghosted|no offer|didn't get the (job|role)|failed (the |my )?interview|interview)\b/i,
    label: "Detected: Pipeline Velocity",
    build: rejected,
  },
  {
    key: "failed",
    match:
      /\b(fail|mistake|error|broke|bug|crash|deleted|outage|screwed up|messed up|botched|dropped (prod|production)|typo)\b/i,
    label: "Detected: Courageous Iteration",
    build: failed,
  },
  {
    key: "hungover",
    match: /\b(hangover|hungover|drunk|wasted|tequila|beer|wine|cocktail|party|vomit|puked|blackout)\b/i,
    label: "Detected: Liquid Networking Aftermath",
    build: hungover,
  },
  {
    key: "cried",
    match: /\b(cr(y|ied|ying)|tears|sob|breakdown|panic attack|anxious|depressed|overwhelmed)\b/i,
    label: "Detected: High-Bandwidth Empathy Event",
    build: cried,
  },
  {
    key: "scrolling",
    match:
      /\b(reddit|twitter|instagram|tiktok|youtube|netflix|binge|doomscroll|brows|scroll|video games|gaming|watched tv|social media)\b/i,
    label: "Detected: Competitive Leisure",
    build: scrolling,
  },
  {
    key: "coffee",
    match: /\b(coffee|latte|espresso|cappuccino|brew|bean|barista|tea run)\b/i,
    label: "Detected: Beverage-Based Leadership",
    build: coffee,
  },
  {
    key: "slept",
    match:
      /\b(slept in|overslept|slept|nap|alarm|woke up late|missed (a |the |my )?meeting|running late|was late|snoozed)\b/i,
    label: "Detected: Circadian Non-Compliance",
    build: sleptIn,
  },
  {
    key: "lazy",
    match:
      /\b(nothing|lazy|procrastinat|slacked|day off|no work|zoned out|stared at|didn't do anything|wasted (the )?day)\b/i,
    label: "Detected: Strategic Inactivity",
    build: lazy,
  },
];

export function translateMock(input: string): TranslationResult {
  const cat = CATEGORIES.find((c) => c.match.test(input));
  return {
    text: cat ? cat.build(input) : generic(input),
    category: cat?.key ?? "generic",
    detectedLabel: cat?.label ?? pick(GENERIC_LABELS),
    aiPowered: false,
    stats: genStats(),
  };
}

/* Rotating loader statuses — pure serotonin */
export const LOADER_LINES = [
  "Consulting the thought leaders…",
  "Inflating achievements 10x…",
  "Adding unearned gratitude…",
  "Pivoting to synergy…",
  "Inserting rhetorical question…",
  "Reticulating buzzwords…",
];
