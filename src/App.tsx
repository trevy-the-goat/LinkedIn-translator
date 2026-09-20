import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import Header from "./components/Header";
import Translator from "./components/Translator";
import BuzzMarquee from "./components/BuzzMarquee";
import FeatureCards from "./components/FeatureCards";
import Footer from "./components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

function HeroLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function App() {
  return (
    <div className="dot-grid relative min-h-screen overflow-x-clip">
      {/* ambient blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-linkedin/[0.07] blur-3xl"
      />

      <Header />

      <main className="relative">
        {/* ---------------------------- hero ---------------------------- */}
        <section className="mx-auto max-w-6xl px-4 pb-11 pt-12 text-center sm:px-6 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-slate-200 shadow-soft"
          >
            <Languages className="size-3.5 text-linkedin" strokeWidth={2.2} />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-500">
              Honesty <span className="text-slate-300">→</span> enterprise-grade doublespeak
            </span>
          </motion.div>

          <h1 className="text-balance text-[clamp(2.5rem,7vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-slate-900">
            <HeroLine delay={0.12}>Radical honesty in,</HeroLine>
            <HeroLine delay={0.24}>
              <span className="font-serif font-normal italic tracking-[-0.01em] text-linkedin">
                thought leadership out.
              </span>
            </HeroLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-7 text-slate-500"
          >
            Paste what actually happened. Receive a post your network never asked for — complete
            with unearned gratitude, rocket emojis, and one deeply rhetorical question.
          </motion.p>
        </section>

        {/* ------------------------- translator ------------------------- */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Translator />
        </div>

        <BuzzMarquee />
        <FeatureCards />
      </main>

      <Footer />
    </div>
  );
}
