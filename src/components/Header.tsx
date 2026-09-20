import { motion } from "framer-motion";
import { ArrowRightLeft, BadgeCheck } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative grid size-9 place-items-center rounded-xl bg-linkedin text-white shadow-lift">
            <ArrowRightLeft className="size-4.5" strokeWidth={2.4} />
            <span className="absolute -right-1 -top-1 grid size-3.5 place-items-center rounded-full bg-white">
              <BadgeCheck className="size-3.5 fill-linkedin text-white" />
            </span>
          </div>
          <div className="leading-tight">
            <p className="text-[15px] font-extrabold tracking-tight text-slate-900">
              LinkedIn{" "}
              <span className="font-serif italic font-normal text-linkedin">Translator</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
              PowerPhrase™ 4.2 Turbo
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <p className="text-[13px] text-slate-500">
            Turn your mundane life into a{" "}
            <span className="font-serif italic text-[15px] text-linkedin">10x Thought Leader</span>{" "}
            post.
          </p>
          <span className="rounded-full bg-linkedin/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-linkedin-deep ring-1 ring-linkedin/20">
            100% cringe-free*
          </span>
        </div>
      </div>
    </motion.header>
  );
}
