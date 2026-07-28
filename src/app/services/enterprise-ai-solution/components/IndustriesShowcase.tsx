"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Truck,
} from "lucide-react";

const industries = [
  {
    id: "healthcare",
    label: "Healthcare",
    icon: HeartPulse,
    title: "Intelligent Care Operations",
    description:
      "Secure AI systems that improve patient access, automate clinical workflows, and help care teams act on the right information faster.",
    metric: "60%",
    metricLabel: "faster patient routing",
    capabilities: ["Patient Triage", "Clinical Search", "HIPAA-ready"],
    partners: ["Care Networks", "Health Systems", "MedTech"],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: Factory,
    title: "Autonomous Production Intelligence",
    description:
      "Connect plant data, maintenance systems, and frontline workflows to predict failures and continuously improve production performance.",
    metric: "35%",
    metricLabel: "less unplanned downtime",
    capabilities: ["Predictive Maintenance", "Quality AI", "Plant Automation"],
    partners: ["Industrial Teams", "OEMs", "Smart Factories"],
  },
  {
    id: "finance",
    label: "Finance",
    icon: Landmark,
    title: "Trusted Financial Intelligence",
    description:
      "Deploy auditable AI for fraud operations, risk analysis, document processing, and personalized financial experiences.",
    metric: "40%",
    metricLabel: "faster risk decisions",
    capabilities: ["Fraud Detection", "Risk Modeling", "Audit Trails"],
    partners: ["Banks", "FinTech", "Credit Unions"],
  },
  {
    id: "retail",
    label: "Retail",
    icon: ShoppingBag,
    title: "Connected Commerce Experiences",
    description:
      "Unify customer, inventory, and product intelligence to deliver more relevant journeys across every retail channel.",
    metric: "28%",
    metricLabel: "higher conversion",
    capabilities: ["Customer 360", "Demand Planning", "Commerce Agents"],
    partners: ["Retailers", "Marketplaces", "D2C Brands"],
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: Truck,
    title: "Adaptive Logistics Networks",
    description:
      "Use real-time operational intelligence to optimize routes, predict exceptions, and keep complex supply chains moving.",
    metric: "22%",
    metricLabel: "lower delivery cost",
    capabilities: ["Route Intelligence", "ETA Prediction", "Exception Agents"],
    partners: ["3PL Teams", "Carriers", "Supply Chains"],
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    title: "Personalized Learning Operations",
    description:
      "Give students, educators, and administrators secure AI assistance that makes knowledge easier to access and act on.",
    metric: "3×",
    metricLabel: "faster student support",
    capabilities: ["Student Support", "Knowledge Search", "Learning Analytics"],
    partners: ["Universities", "EdTech", "Training Teams"],
  },
];

export default function IndustriesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndustry = industries[activeIndex];
  const ActiveIcon = activeIndustry.icon;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % industries.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="industries"
      className="overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-24"
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/50 bg-orange-50/50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812] animate-pulse" />
            Industries
          </div>
          <h2 className="section-h2 text-[#0a0a1a]">
            Enterprise AI, Built for{" "}
            <span className="bg-gradient-to-r from-[#FF5812] to-[#FF7A2F] bg-clip-text text-transparent font-bold">
              Your Industry
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#0a0a1a]/70">
            Purpose-built intelligence for complex workflows, regulated data,
            and measurable operational outcomes.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[28px] border border-orange-200/70 bg-[#f4f0e8] p-3 shadow-[0_22px_60px_rgba(15,23,42,0.12)] lg:grid-cols-[0.32fr_0.68fr]">
          <div className="flex flex-col rounded-[22px] bg-white p-6 sm:p-8 lg:min-h-[520px]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]">Industry Expertise</span>
            <h3 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#0a0a1a] lg:text-4xl">
              Built around the way your business works.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#0a0a1a]/70">
              We combine enterprise engineering, responsible AI, and deep
              workflow understanding to build systems your teams can trust.
            </p>

            <div className="mt-6 space-y-3">
              {[
                { title: "Secure by Design", desc: "GDPR & HIPAA compliant architectures." },
                { title: "Seamless Stack Integration", desc: "Plugs into Microsoft 365, Azure, and custom APIs." },
                { title: "Direct Business ROI", desc: "Measured in hours saved and error reduction." }
              ].map(
                (item) => (
                  <div key={item.title} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#FF5812] mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0a0a1a]/85">{item.title}</h4>
                      <p className="text-[10.5px] text-[#0a0a1a]/55 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="mt-auto grid gap-2 pt-6">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a0a1a] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-[0_4px_12px_rgba(10,10,26,0.15)] transition-all duration-300 hover:bg-[#FF5812] hover:shadow-[0_6px_16px_rgba(255,88,18,0.25)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]"
              >
                Discuss your use case <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#case-studies"
                className="inline-flex items-center justify-center rounded-xl border border-[#0a0a1a]/14 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#0a0a1a] transition-all duration-300 hover:bg-slate-50 hover:border-[#FF5812]/45 hover:text-[#FF5812] active:scale-[0.98]"
              >
                Explore case studies
              </a>
            </div>
          </div>

          <div className="min-w-0 p-3 sm:p-5">
            <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                const isActive = activeIndex === index;

                return (
                  <button
                    key={industry.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] transition ${
                      isActive
                        ? "bg-[#0a0a1a] text-white shadow-lg"
                        : "border border-white bg-white/85 text-[#0a0a1a]/55 hover:text-[#FF5812]"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isActive ? "text-[#FF6B00]" : ""}`} />
                    {industry.label}
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-[430px] overflow-hidden rounded-[24px] bg-[#111a32] text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_25%,rgba(255,88,18,0.18),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.05),transparent_45%)]" />
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
              <div className="absolute -right-6 -top-6 h-48 w-48 rounded-full border border-[#FF5812]/25" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndustry.id}
                  initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(5px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 flex min-h-[430px] flex-col p-6 sm:p-9"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="badge-label text-[#FF8A50]">
                        {activeIndustry.label} AI
                      </p>
                      <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
                        {activeIndustry.title}
                      </h3>
                    </div>
                    <motion.div
                      initial={{ scale: 0.75, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/10 text-[#FF8A50] backdrop-blur"
                    >
                      <ActiveIcon className="h-7 w-7" />
                    </motion.div>
                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
                    {activeIndustry.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {activeIndustry.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-white/75"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-[0.38fr_0.62fr] sm:items-end">
                    <div>
                      <motion.p
                        key={activeIndustry.metric}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-5xl font-bold leading-none tracking-[-0.05em] text-[#FF6B00]"
                      >
                        {activeIndustry.metric}
                      </motion.p>
                      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-white/50">
                        {activeIndustry.metricLabel}
                      </p>
                    </div>
                    <div>
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">
                        Built for teams like
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeIndustry.partners.map((partner) => (
                          <span
                            key={partner}
                            className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-[10px] font-semibold text-[#0a0a1a]"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
