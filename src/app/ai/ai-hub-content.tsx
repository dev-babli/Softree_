"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Bot, BrainCircuit, Sparkles, WandSparkles, FileText } from "lucide-react";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { DUR, EASE_T } from "@/lib/motion";

const SURFACE = "#F3F0EE";

const offerings = [
  {
    title: "Agentic AI",
    href: "/services/offshore-ai-development",
    description:
      "Autonomous AI agents that plan, decide, and execute multi-step workflows across your enterprise systems.",
    icon: Bot,
    accent: "#7C3AED",
  },
  {
    title: "Generative AI",
    href: "/services/offshore-generative-ai-development",
    description:
      "Custom LLM applications, RAG pipelines, and copilots trained on your proprietary data and policies.",
    icon: WandSparkles,
    accent: "#C084FC",
  },
  {
    title: "AI Test Automation",
    href: "/services/ai-powered-test-automation",
    description:
      "AI-assisted QA that accelerates regression coverage and catches defects before production release.",
    icon: BrainCircuit,
    accent: "#2563EB",
  },
  {
    title: "AI Case Studies",
    href: "/case-studies/ai",
    description:
      "Production deployments across automation, analytics, and intelligent workflows — see the outcomes.",
    icon: FileText,
    accent: "#FF5812",
  },
  {
    title: "AI Web Analyser",
    href: "/webanalyser",
    description:
      "Instant AI-powered website intelligence — performance, SEO signals, and growth opportunities.",
    icon: Sparkles,
    accent: "#059669",
  },
] as const;

export default function AiHubContent() {
  return (
    <>
      <section
        role="banner"
        data-section="ai-intro"
        className="relative w-full overflow-x-clip pt-4"
        style={{ backgroundColor: SURFACE }}
        aria-labelledby="ai-hero-heading"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-10 sm:px-6 md:pb-14 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.section, ease: EASE_T.silk }}
          >
            <SectionHeader
              badge="AI Solutions"
              accent="#7C3AED"
              as="h1"
              headline={
                <span id="ai-hero-heading">
                  Enterprise AI,
                  <br />
                  built for production.
                </span>
              }
              body="Agentic AI, generative copilots, intelligent automation, and AI-powered quality engineering — one hub for every AI practice at Softree."
              className="max-w-3xl"
            />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#6D28D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] active:scale-[0.98]"
              >
                Talk to our AI team
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <Link
                href="/case-studies/ai"
                className="inline-flex items-center gap-2 rounded-full border border-[#0a0a1a]/14 bg-white/60 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a0a1a] backdrop-blur-sm transition hover:border-[#7C3AED]/30 hover:text-[#7C3AED] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a0a1a]/30"
              >
                AI case studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="w-full px-4 pb-20 sm:px-6 lg:px-12"
        style={{ backgroundColor: SURFACE }}
        aria-labelledby="ai-offerings-heading"
      >
        <div className="mx-auto max-w-[1400px]">
          <h2 id="ai-offerings-heading" className="sr-only">
            AI offerings
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: DUR.section, ease: EASE_T.silk, delay: index * 0.06 }}
                  className="group flex flex-col rounded-2xl border border-[#0a0a1a]/8 bg-white p-6 shadow-[0_12px_40px_-24px_rgba(10,10,26,0.18)] transition hover:border-[#0a0a1a]/14 hover:shadow-[0_20px_50px_-28px_rgba(10,10,26,0.22)]"
                >
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${item.accent}18`, color: item.accent }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0a0a1a]">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#0a0a1a]/65">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0a0a1a] transition group-hover:text-[#7C3AED]"
                  >
                    Explore {item.title}
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <div className="prose prose-neutral mt-16 max-w-3xl text-[#0a0a1a]/75">
            <h2 className="text-2xl font-semibold text-[#0a0a1a]">
              Why enterprises choose Softree for AI
            </h2>
            <p>
              Softree Technology delivers production-grade AI systems for enterprises that need
              more than prototypes. We design agentic workflows, generative copilots, and
              intelligent automation on Microsoft Azure, OpenAI, and modern cloud stacks — with
              guardrails, observability, and human-in-the-loop controls built in from day one.
            </p>
            <p>
              Whether you are automating service desks, building document intelligence, or
              shipping AI-native products, our teams combine software engineering discipline with
              applied machine learning. Explore our AI case studies to see measurable outcomes, or
              contact us to scope a pilot in weeks — not quarters.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
