import { Sparkle } from "lucide-react";

const WORDS = [
  "SYNERGY",
  "LEVERAGE",
  "MINDSET",
  "10X",
  "PIVOT",
  "PARADIGM SHIFT",
  "ECOSYSTEM",
  "GROWTH",
  "REFLECTION",
  "HUMBLEBRAG",
  "THOUGHT LEADERSHIP",
  "GRATITUDE",
  "BANDWIDTH",
  "CIRCLE BACK",
  "DEEP DIVE",
  "LOW-HANGING FRUIT",
];

export default function BuzzMarquee() {
  const line = [...WORDS, ...WORDS];
  return (
    <div className="marquee-track mt-16 overflow-hidden border-y border-slate-200/80 bg-white/60 py-3.5">
      <div className="marquee-inner flex w-max animate-marquee items-center gap-6 pr-6">
        {line.map((w, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
              {w}
            </span>
            <Sparkle className="size-3 shrink-0 fill-linkedin/15 text-linkedin/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
