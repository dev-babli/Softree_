"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Code2,
  Cpu,
  Globe2,
  LayoutGrid,
  Users,
} from "lucide-react";
import AboutGlobeMarkers from "./AboutGlobeMarkers";
import SectionHeader from "./SectionHeader";

const ACCENT = "#FF5812";
const ORANGE_FLOW =
  "about-orange-flow bg-[linear-gradient(90deg,#E64C00,#FF5812,#FF8A4A,#FF5812,#E64C00)] bg-[length:200%_100%] bg-clip-text text-transparent";

const ABOUT_STATS = [
  { icon: Calendar, value: "2013", label: "Founded" },
  { icon: Users, value: "13+", label: "Years of Engineering Experience" },
  { icon: Globe2, value: "Global", label: "Delivery Across Multiple Countries" },
] as const;

const ABOUT_CAPABILITIES = [
  {
    title: "AI Capabilities",
    detail: "Agentic AI • Generative AI • AI Automation • RAG",
    icon: Cpu,
    color: "#7C3AED",
    surface: "rgba(124, 58, 237, 0.08)",
  },
  {
    title: "Modern Engineering",
    detail: "Web • Cloud • APIs • Applications",
    icon: Code2,
    color: "#0D9488",
    surface: "rgba(13, 148, 136, 0.08)",
  },
  {
    title: "Microsoft & Data",
    detail: "Power Platform • SharePoint • Azure • Data & Analytics",
    icon: LayoutGrid,
    color: "#FF5812",
    surface: "rgba(255, 88, 18, 0.08)",
  },
] as const;

export default function AboutIntroGlobe() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="about-bento"
      className="relative z-0 w-full overflow-x-clip bg-gradient-to-b from-zinc-50 via-white to-zinc-50 pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28"
      aria-labelledby="about-bento-heading"
    >
      <style>{`
        @keyframes about-orange-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes about-orange-icon {
          0%, 100% { color: #E64C00; }
          50% { color: #FF8A4A; }
        }
        .about-orange-flow {
          animation: about-orange-flow 3.2s linear infinite;
        }
        .about-orange-icon {
          color: #FF5812;
          animation: about-orange-icon 2.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .about-orange-flow,
          .about-orange-icon { animation: none; }
          .about-orange-flow { color: #FF5812; background: none; -webkit-text-fill-color: #FF5812; }
        }
      `}</style>

      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,88,18,0.07), transparent 72%)",
          filter: "blur(32px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <motion.div
            className="relative z-20 min-w-0"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeader
              badge="About us"
              accent={ACCENT}
              headline={
                <span id="about-bento-heading">
                  Your global offshore development{" "}
                  <span className={ORANGE_FLOW}>partner.</span>
                </span>
              }
              className="gap-4 lg:gap-3.5 [&_h2]:!leading-[1.18] [&_h2]:text-[clamp(1.5rem,2.15vw,2.05rem)] [&_h2]:tracking-[-0.03em]"
            />

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
              {ABOUT_STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.value}
                    className={`flex items-start gap-2 sm:px-4 ${
                      index === 0 ? "sm:pl-0" : "sm:border-l sm:border-[#0a0a1a]/10"
                    }`}
                  >
                    <Icon className="about-orange-icon mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <div className="min-w-0">
                      <p
                        className={`${ORANGE_FLOW} text-[18px] font-semibold leading-none tracking-tight lg:text-[19px] xl:text-[20px]`}
                      >
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-[#0a0a1a]/50 lg:text-[12px]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-5 max-w-xl text-[13.5px] leading-[1.65] text-[#0a0a1a]/65 lg:text-[14px]">
              We help businesses, technology companies, and partners extend their
              engineering capabilities through AI, modern engineering, Microsoft, and
              data expertise.
            </p>

            <div className="mt-5 flex flex-col gap-2">
              {ABOUT_CAPABILITIES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
                    style={{ backgroundColor: item.surface }}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white"
                      style={{ color: item.color }}
                    >
                      <Icon size={14} />
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-[13px] font-semibold leading-none tracking-tight"
                        style={{ color: item.color }}
                      >
                        {item.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-snug text-[#0a0a1a]/55">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/about-us"
              className="group mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-5 py-2.5 text-[13px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(10,10,26,0.35)] transition hover:-translate-y-px"
            >
              Explore our story
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          <motion.div
            className="relative z-10 w-full min-w-0 overflow-x-clip"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <AboutGlobeMarkers variant="light" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
