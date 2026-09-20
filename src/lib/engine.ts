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

export function sanitizeLinkedInEnding(text: string): string {
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  while (paragraphs.length > 0) {
    const last = paragraphs.at(-1) ?? "";
    if (
      /\?\s*$/.test(last) ||
      /(agree\?|sound off|in the comments|your turn|what has|what did|what will|what mundane|what door|what's the|leaders, am i wrong|recruiters:)/i.test(
        last,
      )
    ) {
      paragraphs.pop();
      continue;
    }
    break;
  }

  const cleaned = paragraphs.join("\n\n").trim();
  if (!cleaned) return text.trim();
  return /[.!]$/.test(cleaned) ? cleaned : `${cleaned}.`;
}

const buildPost = (paragraphs: string[]) => sanitizeLinkedInEnding(paragraphs.join("\n\n"));

/* ----------------------- Student-friendly packs ---------------------- */

const moduleFail = (_input = "") =>
  buildPost([
    `Big academic update. 📈`,
    `I failed a module — which, in legacy language, sounds unfortunate. In growth language, it means the university has invited me into an advanced resilience incubator with repeat access to the content ecosystem.`,
    `A fail mark is not a dead end. It is an institutionally verified signal that my first pass was too disruptive, too nonlinear, and too committed to experiential learning for a single semester. 🧠`,
    `I am now entering a strategic re-engagement cycle built on tighter systems, stronger leverage, and slightly less confidence in "I'll study the night before." 🚀`,
    `Setbacks fade. Transcript narratives can be repositioned. Mindset remains fully enrolled. 🙏`,
  ]);

const midtermFifty = (_input = "") =>
  buildPost([
    `I'm proud to share a precision outcome from my academic journey. 📈`,
    `I got 50% for my midterm — a beautifully balanced data point proving that survival, restraint, and just-enough execution can coexist in one performance metric.`,
    `Some people see average. I see disciplined optimization: no wasted overachievement, no catastrophic underdelivery, just a lean operating model calibrated to the exact threshold of progress. 💡`,
    `Half the marks, full ownership of the narrative. The grade may be centered, but the mindset is aggressively upward-facing. 🚀`,
    `This semester isn't about perfection. It's about sustainable throughput, strategic recovery, and knowing when competence is enough to keep the ecosystem moving. 🧠`,
  ]);

const supplementaryExam = (_input = "") =>
  buildPost([
    `Thrilled to announce that I have been selected for an exclusive supplementary assessment opportunity. 🚀`,
    `Not every student gets invited back for a second touchpoint with the same syllabus. That kind of personalized academic follow-up is what premium education looks like.`,
    `The first exam was discovery. The supplementary is execution. This is not repetition — it is a strategic pivot with improved data, clearer alignment, and a far more caffeinated mindset. 📈`,
    `I am approaching this next round with sharpened systems, re-leveraged notes, and the calm of someone who has already seen the boss level once. 🙏`,
  ]);

const dpr = (_input = "") =>
  buildPost([
    `Reflecting on my academic journey this week. ⚖️`,
    `I got DPR — which may alarm those operating in the old paradigm, but I see it as a high-visibility institutional feedback loop with executive-level urgency.`,
    `Some call it an academic warning. I call it a full-spectrum performance review from the university ecosystem, complete with clear signals that my current operating model requires a serious pivot. 🧠`,
    `Moments like this do not end trajectories; they force clarity. Systems tighten, priorities sharpen, and vague optimism gets replaced by real leverage. 📈`,
    `The rebrand starts now: less denial, more structure, and a far more respectful relationship with deadlines. 🚀`,
  ]);

const brokeStudent = (_input = "") =>
  buildPost([
    `I'm currently operating in a pre-revenue student phase. 💡`,
    `Being broke is not financial failure — it's bootstrapping with lecture slides, campus Wi‑Fi, and an overdraft-powered belief in long-term upside.`,
    `My bank account is giving minimalist energy, but my vision remains fully funded. Scarcity has simply accelerated my prioritization framework and removed all non-essential spending from the ecosystem. 📈`,
    `This is not lack. This is lean infrastructure for a future high-output operator with exceptional coupon discipline. 🙏`,
  ]);

const missedEightAm = (_input = "") =>
  buildPost([
    `I'm humbled to share a time-sensitive lesson from this morning. 🧠`,
    `I woke up late and missed my 8 AM lecture — not because I lacked commitment, but because my circadian rhythm declined to align with pre-sunrise performance culture.`,
    `What looked like absence was, in reality, a body-led intervention against low-ROI consciousness. The classroom moved on, but the deeper insight remained: no paradigm shift has ever begun with fluorescent lighting at dawn. 📈`,
    `I am now recalibrating my sleep stack, alarm architecture, and morning execution pipeline for more sustainable attendance going forward. 🚀`,
  ]);

/* ------------------------- Existing chaos packs ---------------------- */

const fired = (_input = "") =>
  buildPost([
    `I'm humbled and thrilled to announce that my organization and I have mutually agreed that my growth had officially outpaced their org chart. 🚀`,
    `Yesterday, HR gifted me something most managers never will: total calendar clarity.`,
    `Being "fired" is simply a company admitting, in writing, that your personal brand has achieved escape velocity. 📈`,
    `No salary? No problem. Abundance is a mindset, and rent is merely a legacy subscription model I am now free to emotionally cancel.`,
    `To my former manager — thank you for the beautifully facilitated career-decompression workshop. The exit interview was the most engaged you've ever been in my development. 🙏`,
    `I am now open to work, open to podcasts, and aggressively open to any ecosystem prepared for my next chapter. 💡`,
  ]);

const arrested = (_input = "") =>
  buildPost([
    `Reflecting on my journey… 🧠`,
    `This week I completed an unplanned, fully immersive compliance residency. Handcuffs included. Transportation provided.`,
    `Allegations are just KPIs you haven't rebranded yet. ⚖️`,
    `"Fraud" was, at its core, an aggressive approach to revenue optimization paired with a distributed interpretation of ownership. I wasn't stealing — I was stress-testing the honor system at enterprise scale.`,
    `Key insight: you haven't truly led until you've presented quarterly results to a judge. 📈`,
    `I'm now channeling every lesson into my upcoming masterclass, "Ethical Boundaries in Hypergrowth." Attendance is mandatory for me, voluntarily inspiring for everyone else.`,
    `The rebrand is underway, the lesson deck is building, and compliance has never felt more synergistic. 🚀`,
  ]);

const scrolling = (_input = "") =>
  buildPost([
    `I don't usually share this, but radical transparency is my personal brand. 💡`,
    `Today I completed a self-directed, four-hour deep dive into distributed sentiment analysis — colloquially known as "scrolling Reddit."`,
    `While colleagues saw procrastination, I was conducting ethnographic research across 12 sub-communities, benchmarking meme velocity and stress-testing the modern attention economy. 📈`,
    `Zero emails answered. Zero standups attended. Immeasurable vibes harvested.`,
    `Multitasking isn't a distraction — it's parallel processing for the modern knowledge ecosystem. 🧠`,
    `Sometimes the most strategic contribution you can make to your employer is absolutely nothing, executed flawlessly, at scale. 🚀`,
    `To my employer, who is definitely reading this: consider it market research delivered with unmatched consistency. 🙏`,
  ]);

const coffee = (_input = "") =>
  buildPost([
    `Big news. ☕`,
    `This morning I architected and deployed a bespoke caffeine-enablement program across a previously underserved team.`,
    `Was it "just coffee"? Only to those lacking vision. Leaders don't make beverages — we build ecosystems of alertness. 🚀`,
    `I owned the entire value chain: ethical water sourcing, grind-size optimization, mug-to-mouth logistics, and post-sip stakeholder engagement. 📈`,
    `Nobody asked me to. That is precisely the point. Servant leadership never appears in the job description, because job descriptions never saw me coming. 🙏`,
    `Early metrics show team productivity up 4% — a figure I generated using the same methodology as the pot itself: strong, dark, and impossible to verify.`,
    `Small acts. Monumental aroma. Infinite synergy. 💡`,
  ]);

const sleptIn = (_input = "") =>
  buildPost([
    `I'm humbled to share a personal milestone. 📈`,
    `This morning, my body made a strategic scheduling decision without consulting my calendar — and I missed a 9:00 AM sync.`,
    `"I overslept" is the old language. The new language: I underwent a body-led, circadian-aligned wellness intervention with REM-heavy deliverables. 🧠`,
    `The meeting happened anyway. It could have been an email. The email could have been a lesson about boundaries.`,
    `Rest is not the absence of work — it is the pre-work of greatness. While the org chart marched on, my subconscious was busy 10x-ing tomorrow's ideation pipeline. 🚀`,
    `Leaders should normalize asynchronous unconsciousness; the REM-to-output pipeline is stronger than ever. 🙏`,
  ]);

const quit = (_input = "") =>
  buildPost([
    `Thrilled to announce my next chapter: everywhere else. 🚀`,
    `After meaningful reflection — and a borderline poetic exit survey — I have decided to consciously uncouple from my role.`,
    `Quitting isn't leaving. It's graduating with honors from a curriculum of meetings that could have been emails. 📈`,
    `I didn't burn a single bridge today. I simply converted them into runway for takeoff. 💡`,
    `Massive gratitude to everyone who shaped this journey, and an end-to-end thank-you to the office chair that supported me more than leadership ever did. 🙏`,
    `My DMs are open, my calendar is clear, and my notice period was, frankly, chef's kiss.`,
  ]);

const promoted = (_input = "") =>
  buildPost([
    `I'm beyond humbled to announce that, after several grueling quarters of baseline competence, the market has officially validated my personal brand. 🚀`,
    `Promotions aren't handed out — they're manifested through strategic proximity to leadership and airtight Reply-All discipline. 📈`,
    `To everyone who said "keep your head down": my head was never down. It was up, scanning for trajectory like a lighthouse of ambition. 💡`,
    `The new title is bigger. The responsibilities are vaguer. The headline writes itself.`,
    `Massive thanks to my team, whose output I will continue to leverage at scale. 🙏`,
    `Remember: you're not climbing a ladder — you're ascending a narrative.`,
  ]);

const failed = (_input = "") =>
  buildPost([
    `Vulnerability time. 🧠`,
    `Yesterday I took something down for 47 unforgettable minutes. Today? I took down the notion that I'd ever play it safe.`,
    `Failure isn't falling short — it's user-testing reality. I didn't break the system; I performed an unscheduled, high-fidelity resilience audit at company scale. 💡`,
    `Every 500 error is a thousand-person lesson in stakeholder communication.`,
    `My incident report ran four pages. My personal growth? Boundless. The uptime will recover — the insights are forever. 🚀`,
    `To the teammate it woke at 3 AM: your sacrifice is my keynote origin story. Thank you for your service. 🙏`,
  ]);

const rejected = (_input = "") =>
  buildPost([
    `Big news from my job-search pipeline. 📈`,
    `After six rounds, a take-home assignment, and a culture interview with the founder's dog, I'm thrilled to announce I've been selected to remain exactly where I am.`,
    `Rejection is simply the market admitting my rate exceeds its imagination. 💡`,
    `The hiring manager called me "overqualified." I prefer "pre-legendary." 🚀`,
    `Every "we've decided to move forward with other candidates" is a free resilience masterclass — and I've now completed more masterclasses than most MBA programs.`,
    `Ghosting isn't unprofessional when it's mentoring you in detachment. 🙏`,
    `The search continues. The narrative remains unstoppable.`,
  ]);

const hungover = (_input = "") =>
  buildPost([
    `Reflecting on last night's relationship-building sprint… 🧠`,
    `Somewhere between the third and fourth round of "networking," I forged several high-bandwidth strategic partnerships I can no longer recall but will absolutely leverage.`,
    `A hangover is simply a full-day, body-hosted retrospective. 💡`,
    `Key insights from today's execution at 40% capacity: hydration scales, tequila doesn't, and the mute button forgives everything. 📈`,
    `To the colleague who said "one quick drink" — your vision outran our collective bandwidth, and I respect that.`,
    `Growth happens outside the comfort zone. Mine is currently anywhere without fluorescent lighting. 🙏`,
  ]);

const cried = (_input = "") =>
  buildPost([
    `Vulnerability post. 🙏`,
    `Today I experienced a high-bandwidth empathy event in the third-floor restroom — and I have never felt more aligned with my authentic leadership brand.`,
    `Crying at work isn't weakness. It's your values system syncing with the cloud in real time. 💡`,
    `Tears are just data that never made it into the dashboard. 📈`,
    `While others built walls, I built wet pathways to psychological safety. My mascara ran — but so did my emotional intelligence, at 10x throughput. 🚀`,
    `To the intern who brought tissues: that is stakeholder management. Learn.`,
  ]);

const lazy = (_input = "") =>
  buildPost([
    `I'll say what nobody else on this platform will. 🚀`,
    `Today I accomplished absolutely nothing — and it was the most strategically aligned day of my quarter.`,
    `Doing nothing is not the absence of work. It is a full-stack audit of why we work at all. 💡`,
    `While the inbox burned, I maintained a flawless uptime of zero deliverables with 100% availability for reflection. 📈`,
    `The grindset crowd won't tell you this: stillness is a deliverable. Presence is a pipeline. My calendar was empty — and, for eight uninterrupted hours, so was my imposter syndrome. 🙏`,
    `Leaders should normalize scheduled strategic idling. The ROI is immeasurable, but the vibes remain enterprise-ready. 🧠`,
  ]);

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

const CLOSERS = [
  `The rebrand is complete, and the narrative remains fully optimized.`,
  `Every setback becomes leverage once the ecosystem hears the polished version. 💡`,
  `Progress is rarely linear, but the personal brand should always sound like it is. 📈`,
  `The moment may have been messy. The positioning is immaculate. 🚀`,
];

const GENERIC_LABELS = [
  "Detected: Raw, Unmonetized Candor",
  "Detected: Pre-Humblebrag Honesty",
  "Detected: Chronically Online Truthfulness",
];

const generic = (input: string) => {
  const t = input.trim().replace(/[.!\s]+$/, "");
  return buildPost([
    pick(OPENINGS),
    `"${t}"`,
    pick(REFRAMES),
    pick(BUZZ),
    pick(LESSONS),
    pick(CLOSERS),
  ]);
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
    key: "dpr",
    match:
      /\b(dpr|academic exclusion|excluded from (the )?program|dismissed from (the )?program|discontinued from (my )?(program|course)|probation letter)\b/i,
    label: "Detected: Institutional Escalation Event",
    build: dpr,
  },
  {
    key: "module-fail",
    match:
      /\b(failed? (a |my |the )?(module|course|subject)|module fail|failed my module|failed the module|repeat(ing)? (a |my )?module|carried (a |my )?module)\b/i,
    label: "Detected: Academic Resilience Loop",
    build: moduleFail,
  },
  {
    key: "supplementary",
    match:
      /\b(supp(le)?(mentary)? exam|supp\b|resit|rewrite|re-write|make[- ]?up exam|deferred exam)\b/i,
    label: "Detected: Premium Second Attempt",
    build: supplementaryExam,
  },
  {
    key: "midterm-50",
    match:
      /(midterm|test|quiz|exam).*\b(50%|50 percent|fifty percent)\b|\b(50%|50 percent|fifty percent)\b.*(midterm|test|quiz|exam)/i,
    label: "Detected: Precision Pass Energy",
    build: midtermFifty,
  },
  {
    key: "broke-student",
    match:
      /\b(i('| a)?m broke|broke|no money|can't afford|cannot afford|empty wallet|bank account|overdraft|allowance|tuition|rent money|transport money)\b/i,
    label: "Detected: Liquidity-Constrained Visionary",
    build: brokeStudent,
  },
  {
    key: "missed-8am",
    match:
      /(miss(ed)?|overslept|woke up late|running late).*(8 ?am|lecture|class|tutorial)|\b(8 ?am|lecture|class|tutorial)\b.*(miss(ed)?|overslept|late)/i,
    label: "Detected: Dawn-Era Non-Compliance",
    build: missedEightAm,
  },
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
    text: sanitizeLinkedInEnding(cat ? cat.build(input) : generic(input)),
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
  "Removing engagement bait…",
  "Reticulating buzzwords…",
];
