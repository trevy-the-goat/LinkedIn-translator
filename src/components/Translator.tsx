import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationControls,
} from "framer-motion";
import {
  ArrowRightLeft,
  BadgeCheck,
  Check,
  Copy,
  Flame,
  Loader2,
  Quote,
  Radar,
  RefreshCw,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  Users,
  X,
} from "lucide-react";
import { translateToLinkedIn } from "../lib/api";
import {
  LOADER_LINES,
  formatCompact,
  type TranslationResult,
} from "../lib/engine";
import { cn } from "../utils/cn";

type Status = "idle" | "loading" | "done";

const PRESETS = [
  "I was fired",
  "I got arrested for fraud",
  "I browsed Reddit for 4 hours at work",
  "I made coffee for the team",
];

const MAX_LEN = 500;

/* ------------------------------ hooks ------------------------------ */

function useCountUp(target: number, active: boolean, duration = 1.2) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [target, active, duration]);
  return val;
}

/* --------------------------- small pieces -------------------------- */

function StatChip({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-mono text-[10.5px] font-medium tracking-tight text-slate-600 ring-1 ring-slate-200 shadow-soft">
      <Icon className="size-3.5 text-linkedin" strokeWidth={2.2} />
      {children}
    </span>
  );
}

function SwapButton({
  rotated,
  onSwap,
  className,
  iconClassName,
}: {
  rotated: number;
  onSwap: () => void;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div className={className}>
      <motion.button
        type="button"
        title="Swap languages"
        aria-label="Swap languages"
        onClick={onSwap}
        animate={{ rotate: rotated }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        className="grid size-11 place-items-center rounded-full bg-white text-linkedin ring-1 ring-slate-200 shadow-soft transition-colors hover:text-linkedin-deep hover:ring-linkedin/50"
      >
        <ArrowRightLeft className={cn("size-4.5", iconClassName)} strokeWidth={2.2} />
      </motion.button>
    </div>
  );
}

/* ---------------------------- main panel --------------------------- */

export default function Translator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<{ msg: string; kind: "warn" | "info" } | null>(null);
  const [spin, setSpin] = useState(0);
  const [loaderIdx, setLoaderIdx] = useState(0);
  const [runId, setRunId] = useState(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const shake = useAnimationControls();

  const loading = status === "loading";

  const impressions = useCountUp(result?.stats.impressions ?? 0, status === "done" && !!result);
  const recruiters = useCountUp(result?.stats.recruiters ?? 0, status === "done" && !!result, 1.4);
  const cringe = useCountUp(result?.stats.cringe ?? 0, status === "done" && !!result, 1.6);

  /* rotate the loader status lines */
  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => setLoaderIdx((i) => (i + 1) % LOADER_LINES.length), 520);
    return () => clearInterval(id);
  }, [loading]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (toastRef.current) clearTimeout(toastRef.current);
    };
  }, []);

  const showToast = (msg: string, kind: "warn" | "info" = "info") => {
    setToast({ msg, kind });
    if (toastRef.current) clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3400);
  };

  const handleTranslate = (payload?: string) => {
    if (loading) return;
    const text = (payload ?? input).trim();
    if (!text) {
      shake.start({ x: [0, -9, 9, -6, 6, -3, 3, 0], transition: { duration: 0.45 } });
      showToast("Type something incriminating first — the algorithm needs source material.", "warn");
      textareaRef.current?.focus();
      return;
    }
    setStatus("loading");
    setCopied(false);
    setLoaderIdx(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    const delay = 1350 + Math.random() * 650;
    timerRef.current = setTimeout(async () => {
      const res = await translateToLinkedIn(text);
      setResult(res);
      setRunId((r) => r + 1);
      setStatus("done");
    }, delay);
  };

  const handlePreset = (preset: string) => {
    if (loading) return;
    setInput(preset);
    handleTranslate(preset);
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
    setStatus("idle");
    setCopied(false);
    textareaRef.current?.focus();
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      showToast("Clipboard blocked by your browser. Peak corporate security.", "warn");
    }
  };

  const handleSwap = () => {
    setSpin((s) => s + 360);
    showToast("Reverse translation unavailable — corporate doublespeak cannot decompose back into human honesty.", "info");
  };

  const paragraphs = result ? result.text.split(/\n\n+/) : [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 28, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <motion.div
        animate={shake}
        className="overflow-visible rounded-[24px] bg-white shadow-card ring-1 ring-slate-200/80 sm:rounded-[28px]"
      >
        {/* ------------------------------ panes ------------------------------ */}
        <div className="relative grid md:grid-cols-2">
          {/* LEFT — plain english */}
          <div className="flex min-h-[300px] flex-col p-5 sm:p-6 md:min-h-[360px] md:pr-14">
            <div className="mb-3 flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-slate-400" />
                <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  Plain English <span className="font-serif normal-case italic tracking-normal text-slate-400">/ the truth</span>
                </h2>
              </div>
              <AnimatePresence>
                {result && (
                  <motion.span
                    key={`${runId}-label`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 font-mono text-[10px] text-slate-500 ring-1 ring-slate-200"
                  >
                    <Radar className="size-3 text-linkedin" />
                    {result.detectedLabel}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <textarea
              ref={textareaRef}
              value={input}
              maxLength={MAX_LEN}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleTranslate();
              }}
              placeholder="Type what actually happened (e.g., 'I slept in and missed a meeting' or 'I got fired')…"
              className="nice-scroll w-full flex-1 bg-transparent text-[15.5px] leading-7 text-slate-800"
            />

            <div className="mt-3 flex items-center justify-between">
              <span
                className={cn(
                  "font-mono text-[11px] tabular-nums",
                  input.length > MAX_LEN * 0.9 ? "text-rose-500" : "text-slate-400",
                )}
              >
                {input.length} / {MAX_LEN}
              </span>
              <AnimatePresence>
                {input.length > 0 && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    onClick={handleClear}
                    title="Clear"
                    aria-label="Clear input"
                    className="grid size-7 place-items-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X className="size-4" strokeWidth={2.2} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* mobile swap divider */}
          <SwapButton
            rotated={spin}
            onSwap={handleSwap}
            className="relative z-20 -my-5 flex justify-center md:hidden"
            iconClassName="rotate-90"
          />

          {/* RIGHT — linkedin speak */}
          <div className="flex min-h-[300px] flex-col rounded-b-[24px] border-t border-slate-200/80 bg-slate-50/70 p-5 sm:rounded-b-[28px] sm:p-6 md:min-h-[360px] md:rounded-b-none md:rounded-r-[28px] md:border-l md:border-t-0 md:pl-14">
            <div className="mb-3 flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-linkedin" />
                <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-linkedin-deep">
                  LinkedIn Speak <span className="font-serif normal-case italic tracking-normal text-linkedin/60">/ corporate jargon</span>
                </h2>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-linkedin/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-linkedin-deep ring-1 ring-linkedin/20">
                <BadgeCheck className="size-3" />
                Native fluency
              </span>
            </div>

            <div className="nice-scroll relative flex-1 overflow-y-auto pr-1">
              {/* idle */}
              {status === "idle" && (
                <div className="flex h-full min-h-[180px] flex-col items-center justify-center gap-3 text-center">
                  <div className="grid size-11 place-items-center rounded-2xl bg-white text-linkedin/50 ring-1 ring-slate-200 shadow-soft">
                    <Sparkles className="size-5" strokeWidth={1.8} />
                  </div>
                  <p className="max-w-[26ch] text-[14px] leading-6 text-slate-400">
                    Your exaggerated, engagement-optimized truth will appear here.
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300">
                    Awaiting raw honesty
                  </p>
                </div>
              )}

              {/* loading skeleton */}
              {status === "loading" && (
                <div aria-live="polite">
                  <div className="mb-5 flex items-center gap-2">
                    <Loader2 className="size-3.5 animate-spin text-linkedin" />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={loaderIdx}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-linkedin-deep/80"
                      >
                        {LOADER_LINES[loaderIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="space-y-3.5">
                    <div className="skeleton-bar h-6 w-3/4 rounded-lg" />
                    {[100, 94, 98, 72].map((w, i) => (
                      <div key={i} className="skeleton-bar h-3.5 rounded-md" style={{ width: `${w}%`, animationDelay: `${i * 90}ms` }} />
                    ))}
                    <div className="pt-2" />
                    {[96, 90, 58].map((w, i) => (
                      <div key={`b${i}`} className="skeleton-bar h-3.5 rounded-md" style={{ width: `${w}%`, animationDelay: `${360 + i * 90}ms` }} />
                    ))}
                    <div className="pt-2" />
                    {[88, 66].map((w, i) => (
                      <div key={`c${i}`} className="skeleton-bar h-3.5 rounded-md" style={{ width: `${w}%`, animationDelay: `${630 + i * 90}ms` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* result */}
              {status === "done" && result && (
                <motion.article
                  key={runId}
                  className="post-body"
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.11 } } }}
                >
                  {paragraphs.map((p, i) => (
                    <motion.p
                      key={`${runId}-${i}`}
                      variants={{
                        hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
                        show: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                      className="whitespace-pre-line text-[14.5px] leading-7 text-slate-700 first:text-[16px] first:font-semibold first:text-slate-900"
                    >
                      {p}
                    </motion.p>
                  ))}
                </motion.article>
              )}
            </div>

            {/* stats row */}
            <AnimatePresence>
              {status === "done" && result && (
                <motion.div
                  key={`${runId}-stats`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex flex-wrap items-center gap-2"
                >
                  <StatChip icon={TrendingUp}>{formatCompact(Math.round(impressions))} projected impressions</StatChip>
                  <StatChip icon={Users}>{Math.round(recruiters)} recruiters notified</StatChip>
                  <StatChip icon={Flame}>{Math.round(cringe)}% cringe coefficient</StatChip>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-3 flex items-center justify-between border-t border-slate-200/70 pt-3">
              <span className="font-mono text-[11px] text-slate-400">0 facts · 100% synergy</span>
              <div className="flex items-center gap-1.5">
                <AnimatePresence>
                  {status === "done" && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      onClick={() => handleTranslate()}
                      title="Re-roll the narrative"
                      aria-label="Regenerate translation"
                      className="grid size-8 place-items-center rounded-full text-slate-400 transition-colors hover:bg-linkedin/10 hover:text-linkedin-deep"
                    >
                      <RefreshCw className="size-4" strokeWidth={2.1} />
                    </motion.button>
                  )}
                </AnimatePresence>

                <motion.button
                  type="button"
                  onClick={handleCopy}
                  disabled={status !== "done"}
                  whileTap={{ scale: 0.94 }}
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-semibold ring-1 transition-all",
                    copied
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-300"
                      : "bg-white text-slate-600 ring-slate-200 hover:text-linkedin-deep hover:ring-linkedin/50 disabled:cursor-not-allowed disabled:opacity-40",
                  )}
                >
                  <span className="relative grid size-3.5 place-items-center">
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span key="c" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} className="absolute">
                          <Check className="size-3.5" strokeWidth={2.6} />
                        </motion.span>
                      ) : (
                        <motion.span key="k" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} className="absolute">
                          <Copy className="size-3.5" strokeWidth={2.1} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  {copied ? "Copied!" : "Copy"}
                </motion.button>
              </div>
            </div>
          </div>

          {/* desktop swap */}
          <SwapButton
            rotated={spin}
            onSwap={handleSwap}
            className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:flex"
          />
        </div>

        {/* ---------------------------- bottom bar ---------------------------- */}
        <div className="flex flex-col gap-4 border-t border-slate-200/80 px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
              Or pick a pre-loaded confession
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <motion.button
                  key={p}
                  type="button"
                  onClick={() => handlePreset(p)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12.5px] font-medium text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-linkedin/[0.06] hover:text-linkedin-deep hover:ring-linkedin/40"
                >
                  <Quote className="size-3 text-slate-300 transition-colors group-hover:text-linkedin" strokeWidth={2.4} />
                  {p}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            type="button"
            onClick={() => handleTranslate()}
            disabled={loading}
            whileHover={loading ? undefined : { y: -2 }}
            whileTap={loading ? undefined : { scale: 0.97 }}
            className="group relative inline-flex h-12 shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-linkedin px-7 text-[14px] font-bold text-white shadow-lift transition-colors hover:bg-linkedin-deep disabled:cursor-wait"
          >
            {/* shine sweep */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {loading ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={2.4} />
            ) : (
              <Sparkles className="size-4" strokeWidth={2.2} />
            )}
            <span>{loading ? "Thought-leading…" : "Translate to LinkedIn"}</span>
            <span className="kbd hidden sm:inline-flex">⌘↵</span>
          </motion.button>
        </div>
      </motion.div>

      {/* ------------------------------ toast ------------------------------ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="fixed bottom-6 left-1/2 z-50 flex max-w-[92vw] -translate-x-1/2 items-center gap-2.5 rounded-full bg-slate-900 py-3 pl-4 pr-5 text-[13px] font-medium text-white shadow-xl"
          >
            {toast.kind === "warn" ? (
              <TriangleAlert className="size-4 shrink-0 text-amber-400" />
            ) : (
              <ArrowRightLeft className="size-4 shrink-0" style={{ color: "#5eb0ef" }} />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
