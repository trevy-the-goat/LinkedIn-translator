import { ArrowRightLeft } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center sm:px-6">
        <span className="grid size-8 place-items-center rounded-lg bg-linkedin/10 text-linkedin">
          <ArrowRightLeft className="size-3.5" strokeWidth={2.2} />
        </span>
        <p className="max-w-md text-[12.5px] leading-6 text-slate-500">
          LinkedIn Translator is satire. Not affiliated with LinkedIn, your employer, or anyone
          with dignity.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          Side effects may include recruiters, endorsements, and existential dread
        </p>
        <p className="mt-2 text-[12.5px] text-slate-500">
          Designed by{" "}
          <span className="font-serif italic text-[15px] font-medium text-linkedin">Rovert</span>
        </p>
      </div>
    </footer>
  );
}
