"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Check,
  Cloud,
  Code2,
  Cpu,
  Globe2,
  Handshake,
  LayoutGrid,
  Settings,
  Share2,
  Shield,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Globe } from "@/registry/magicui/globe";
import { AboutUsGlassPillars } from "@/components/sections/about-us/AboutUsGlassPillars";
import AboutGlobeMarkers from "@/components/homepage/AboutGlobeMarkers";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { EASE_T, VIEWPORT } from "@/lib/motion";
import ParallaxGalleryCard from "./ParallaxGalleryCard";
import dynamic from "next/dynamic";

const NewWhoDoWeServeSectionLazy = dynamic(() => import("@/components/sections/NewWhoDoWeServeSection"), { ssr: true });

const EASE_OUT = EASE_T.silk;
const SURFACE = "#F8F9FC";
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

const PARTNER_REASONS = [
  {
    icon: Users,
    iconBg: "bg-orange-50 border-orange-100 text-[#FF5812]",
    title: "Modern engineering expertise",
    description: "Experienced developers across web, mobile and cloud.",
  },
  {
    icon: Settings,
    iconBg: "bg-sky-50 border-sky-100 text-[#00A4EF]",
    title: "Reliable white-label execution",
    description: "We deliver under your brand.",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600",
    title: "End-to-end delivery",
    description: "From architecture through deployment and support.",
  },
  {
    icon: Handshake,
    iconBg: "bg-purple-50 border-purple-100 text-purple-600",
    title: "Flexible engagement models",
    description: "Dedicated teams or project-based delivery based on your needs.",
  },
] as const;

const IDEAL_AUDIENCES = [
  "Software and web development agencies",
  "Microsoft and cloud consultancies",
  "ISVs and SaaS product companies",
  "Businesses looking to extend engineering capacity",
] as const;

const CAPABILITY_PILLARS = [
  {
    number: "01",
    title: "Web Applications",
    description: "Modern, responsive digital experiences built for scale.",
    icon: Code2,
    iconBg: "bg-gradient-to-br from-[#FFF4EE] to-[#FFE6DA] border border-orange-200/90 text-[#FF5812]",
  },
  {
    number: "02",
    title: "APIs & Integrations",
    description: "Connect platforms, business systems, and cloud pipelines.",
    icon: Share2,
    iconBg: "bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border border-blue-200/90 text-[#1852FF]",
  },
  {
    number: "03",
    title: "Cloud Engineering",
    description: "Deploy scalable, resilient cloud-native architectures.",
    icon: Cloud,
    iconBg: "bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] border border-emerald-200/90 text-[#10B981]",
  },
  {
    number: "04",
    title: "Quality & Performance",
    description: "Enterprise software audited for security and velocity.",
    icon: Shield,
    iconBg: "bg-gradient-to-br from-[#FAF5FF] to-[#F3E8FF] border border-purple-200/90 text-[#8B5CF6]",
  },
] as const;

const GALLERY_MIN_H =
  "min-h-[500px] sm:min-h-[540px] md:min-h-[580px] lg:min-h-[620px] xl:min-h-[640px]";

export default function InfinityScrollAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <>
      <section
        ref={sectionRef}
        id="about-bento"
        className="relative w-full overflow-x-clip"
        style={{ backgroundColor: SURFACE }}
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
          {/* ── Row 1: Intro + global reach ── */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-10 lg:gap-8 xl:gap-14">
          <motion.div
            className="col-span-1 lg:col-span-6 relative z-20 min-w-0 flex flex-col justify-between h-full"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col">
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

              <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
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

              <div className="mt-5 sm:mt-6 flex flex-col gap-3">
                {ABOUT_CAPABILITIES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-3.5 rounded-xl px-4 py-3.5"
                      style={{ backgroundColor: item.surface }}
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm"
                        style={{ color: item.color }}
                      >
                        <Icon size={15} />
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
            </div>

            <div className="pt-6">
              <Link
                href="/about-us"
                className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-5 py-2.5 text-[13px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(10,10,26,0.35)] transition hover:-translate-y-px"
              >
                Explore our story
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="col-span-1 lg:col-span-6 relative z-10 w-full min-w-0 overflow-x-clip flex flex-col h-full"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <AboutGlobeMarkers variant="light" />
          </motion.div>
        </div> */}
        </div>
      </section>

      <NewWhoDoWeServeSectionLazy />

      <section className="relative w-full overflow-x-clip pt-10 md:pt-14 lg:pt-16 pb-16 md:pb-24 lg:pb-28" style={{ backgroundColor: SURFACE }}>
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
          {/* ── Row 2: Three About Us glass pillars (from platform showcase) ── */}
          <motion.div
            className="pt-10 md:pt-14 lg:pt-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT.default}
            transition={{ duration: 0.75, ease: EASE_OUT }}
          >
            <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF5812]">
                  THREE WAYS WE PARTNER
                </p>
                <h3 className="mt-3 text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-[#0a0a1a]">
                  Offshore Bench <span className="inline-block mx-1.5 h-2 w-2 rounded-full bg-[#1852FF] align-middle" /> White Label <span className="inline-block mx-1.5 h-2 w-2 rounded-full bg-[#1852FF] align-middle" /><br className="hidden sm:block" />
                  Agentic AI &amp; Microsoft Ecosystem
                </h3>
                <p className="mt-4 text-[15px] leading-[1.6] text-[#0a0a1a]/65 md:text-[16px]">
                  Flexible engagement models. World-class delivery.<br className="hidden sm:block" />
                  Built for speed, scale, and lasting impact.
                </p>
              </div>
              <p className="max-w-md text-[14px] leading-[1.65] text-[#0a0a1a]/65 md:text-[15px]">
                From dedicated offshore teams and white-label
                delivery to Agentic AI solutions and the full power
                of the Microsoft ecosystem—everything you need,
                under one trusted partner.
              </p>
            </div>
            <AboutUsGlassPillars />

          </motion.div>

          {/* ── Row 3: Service gallery + proof stats ── */}
          <div className="mt-10 grid grid-cols-12 items-start lg:items-stretch gap-3 sm:mt-14 sm:gap-4 lg:mt-16">
            <div className="col-span-12 mb-1 lg:col-span-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/45">
                Services in motion
              </p>
              <p className="mt-1 text-sm text-[#0a0a1a]/55">
                Abstract showcases per practice — arrow keys or chevrons to browse.
              </p>
            </div>
            <div className="col-span-12 mb-1 hidden lg:col-span-4 lg:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/45">
                Proof at a glance
              </p>
            </div>

            <motion.div
              className="col-span-12 min-w-0 lg:col-span-8 h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE_OUT }}
            >
              <div className={`h-full w-full ${GALLERY_MIN_H}`}>
                <ParallaxGalleryCard className="h-full min-h-0" />
              </div>
            </motion.div>

            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col lg:justify-between min-w-0 gap-3 sm:gap-4 lg:col-span-4 lg:min-h-0 lg:h-full">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/45 lg:hidden md:col-span-2">
                Proof at a glance
              </p>

              {/* Card 1: Why global partners choose Softree */}
              <motion.div
                className="flex flex-col justify-between rounded-2xl border border-[#0a0a1a]/[0.08] bg-white p-4 sm:p-5 xl:p-5.5 shadow-[0_8px_24px_-12px_rgba(10,10,26,0.08)] lg:flex-1"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                <div>
                  <p className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a0a1a]/50">
                    WHY GLOBAL PARTNERS CHOOSE SOFTREE
                  </p>
                  <div className="mt-2.5 sm:mt-3 flex flex-col gap-2 sm:gap-2.5 xl:gap-3">
                    {PARTNER_REASONS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex items-start gap-2.5 sm:gap-3">
                          <span
                            className={`flex h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 shrink-0 items-center justify-center rounded-xl border ${item.iconBg}`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <h4 className="text-[13px] sm:text-[13.5px] xl:text-[14px] font-bold leading-tight text-slate-900">
                              {item.title}
                            </h4>
                            <p className="mt-0.5 text-[11px] sm:text-[11.5px] xl:text-[12px] leading-snug text-slate-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Ideal For */}
              <motion.div
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#0a0a1a]/[0.08] bg-white p-4 sm:p-5 xl:p-5.5 shadow-[0_8px_24px_-12px_rgba(10,10,26,0.08)] lg:flex-1"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT }}
              >
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5812]/10 border border-[#FF5812]/20 px-2.5 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
                      <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF5812]">
                        IDEAL FOR
                      </span>
                    </div>

                    <h3 className="mt-2 text-[15px] sm:text-[16px] xl:text-[17px] font-bold leading-tight text-slate-900">
                      Technology partners and digital firms
                    </h3>

                    <div className="mt-2.5 sm:mt-3 flex flex-col gap-2 sm:gap-2.5">
                      {IDEAL_AUDIENCES.map((item) => (
                        <div key={item} className="flex items-start gap-2 sm:gap-2.5">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5812] to-[#FF3B00] text-white shadow-sm shadow-orange-500/25">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                          <span className="text-[12px] sm:text-[12.5px] xl:text-[13px] font-medium leading-snug text-slate-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Row 4: 4 Bottom Capability Cards ── */}
            <div className="col-span-12 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3.5 mt-2">
              {CAPABILITY_PILLARS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.number}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-[#0a0a1a]/[0.08] bg-white p-3.5 sm:p-4 shadow-[0_4px_16px_-8px_rgba(10,10,26,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md min-h-[108px] sm:min-h-[114px]"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.06, ease: EASE_OUT }}
                  >
                    {/* Top Row: Icon + Number Badge */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div
                        className={`flex h-8.5 w-8.5 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl transition-all duration-300 group-hover:scale-105 shadow-xs ${card.iconBg}`}
                      >
                        <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={2.2} />
                      </div>

                      <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200/80 px-2 py-0.5 font-mono text-[10px] sm:text-[10.5px] font-bold text-slate-500">
                        {card.number}
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="relative z-10 mt-2 sm:mt-2.5 min-w-0">
                      <h4 className="text-[13.5px] sm:text-[14px] font-bold leading-tight text-slate-900 group-hover:text-[#FF5812] transition-colors">
                        {card.title}
                      </h4>
                      <p className="mt-0.5 text-[11px] sm:text-[11.5px] leading-snug text-slate-600">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
