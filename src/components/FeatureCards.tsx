import { motion } from "framer-motion";
import { BrainCircuit, Gauge, ShieldOff } from "lucide-react";

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "10x Vocabulary Engine",
    desc: "4,096 enterprise-grade buzzwords, cross-indexed by how little they mean. Synergy guaranteed in every output.",
    tag: "NLP — Natural Language Padding",
  },
  {
    icon: Gauge,
    title: "Cringe Forecast™",
    desc: "Real-time analytics project impressions, recruiter outreach, and the exact percentage of secondhand embarrassment.",
    tag: "Now with regret telemetry",
  },
  {
    icon: ShieldOff,
    title: "Zero Accuracy Guarantee",
    desc: "No fact-checking layer was installed, ever. What you confess gets rebranded — never verified.",
    tag: "Fact-free since launch",
  },
];

export default function FeatureCards() {
  return (
    <section className="mx-auto mt-16 grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-3">
      {FEATURES.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="group rounded-3xl bg-white p-6 ring-1 ring-slate-200/80 shadow-soft transition-shadow hover:shadow-card"
        >
          <div className="mb-5 grid size-11 place-items-center rounded-2xl bg-linkedin/[0.07] text-linkedin ring-1 ring-linkedin/15 transition-colors group-hover:bg-linkedin group-hover:text-white">
            <f.icon className="size-5" strokeWidth={1.9} />
          </div>
          <h3 className="text-[15.5px] font-bold tracking-tight text-slate-900">{f.title}</h3>
          <p className="mt-2 text-[13.5px] leading-6 text-slate-500">{f.desc}</p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-linkedin/70">
            {f.tag}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
