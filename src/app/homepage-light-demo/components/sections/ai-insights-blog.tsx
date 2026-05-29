"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE, EASE_T, prefersReducedMotion } from "@/lib/motion";
import { SectionHeader } from "@/components/homepage-light/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

type Article = {
  imageUrl: string;
  title: string;
  date: string;
  readTime: string;
  href: string;
  description: string;
};

const initialFeatured: Article = {
  imageUrl: "/images/case-study/power-apps/hr.png",
  title: "HR Assistant Copilot Agent",
  date: "AI Agent",
  readTime: "Case Study",
  href: "/pdf/HR-Assistant-Copilot-Agent.pptx",
  description:
    "A comprehensive HR copilot agent that streamlines onboarding, employee assistance, and policy management workflows.",
};

const initialRecent: Article[] = [
  {
    imageUrl: "/images/case-study/power-apps/travel.png",
    title: "ES Speaks and Travel Requests Management System",
    date: "AI Agent",
    readTime: "Case Study",
    href: "/pdf/ES Speaks and Travel Requests Management System.pdf",
    description:
      "A Power Platform–based internal communication and travel request management solution that enhances employee engagement through announcements, structured request workflows, feedback collection, and seamless integration with SharePoint and Microsoft Teams.",
  },
  {
    imageUrl: "/images/case-study/power-apps/barcode.png",
    title: "Barcode Scanner App",
    date: "Power Apps",
    readTime: "Case Study",
    href: "/pdf/Barcode Scanner App.pdf",
    description:
      "A Microsoft Dataverse-based barcode scanning app that automates real-time inventory tracking and reduces manual data entry.",
  },
  {
    imageUrl: "/images/case-study/power-apps/copilot.png",
    title: "AI-Powered Task Automation using Copilot in Power Apps",
    date: "AI",
    readTime: "Case Study",
    href: "/pdf/AI-Powered-Task-Automation-using-Copilot-in-Power-Apps.pptx",
    description:
      "A unified student experience platform for accessing academic data, profiles, and institutional services.",
  },
];

export default function AiInsightsBlog() {
  const [featured, setFeatured] = useState<Article>(initialFeatured);
  const [recent] = useState<Article[]>(initialRecent);
  const sectionRef = useRef<HTMLElement>(null);

  // Entrance animations — reroute every GSAP call through Motion_System tokens
  // (Requirement 1.6 / 4.1). Inline `cubic-bezier(...)` literals are forbidden
  // outside `src/lib/motion.ts`, so eases come from `EASE.silk` and durations
  // from `DUR.*`. Reduced-motion is gated via `prefersReducedMotion()` and the
  // `change` event of the matchMedia query (Requirement 10.5).
  useEffect(() => {
    const reduced = prefersReducedMotion();
    if (reduced) return;

    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector(".blog-header");
      const grid = sectionRef.current?.querySelector(".blog-grid");
      if (header) {
        gsap.from(header, {
          opacity: 0,
          y: 28,
          duration: DUR.section,
          ease: EASE.silk,
          scrollTrigger: { trigger: header, start: "top 88%" },
        });
      }
      if (grid) {
        gsap.from(grid, {
          opacity: 0,
          y: 20,
          duration: DUR.section,
          ease: EASE.silk,
          delay: 0.1,
          scrollTrigger: { trigger: grid, start: "top 90%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSelect = (article: Article) => {
    setFeatured(article);
  };

  const isExternalDoc = (href: string) =>
    href.endsWith(".pdf") || href.endsWith(".pptx");

  return (
    <section
      ref={sectionRef}
      data-section="insights"
      className="relative w-full bg-[#FFFFFF] py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header — Design_Tokens accent #1852FF, badge → headline → body order */}
        <div className="blog-header mb-12">
          <SectionHeader
            badge="Latest Blogs"
            accent="#1852FF"
            headline="Our Recent Insights & Articles"
            body="Stay ahead of the curve with engineering insights, platform capabilities, and automation breakthroughs compiled directly by our delivery experts."
          />
        </div>

        <div className="blog-grid grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
          {/* ================= LEFT FEATURED ================= */}
          <div className="lg:col-span-3 h-full">
            <Link
              href={featured.href}
              target={isExternalDoc(featured.href) ? "_blank" : undefined}
              rel={isExternalDoc(featured.href) ? "noopener noreferrer" : undefined}
              className="block h-full"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: DUR.card, ease: EASE_T.silk }}
                className="
                  relative h-full min-h-[520px] overflow-hidden
                  rounded-2xl border border-[#0a0a1a]/10 bg-white
                  shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]
                "
              >
                {/* Image inset — AnimatePresence for smooth swap */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featured.imageUrl}
                    className="absolute inset-0"
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: DUR.card, ease: EASE_T.silk }}
                  >
                    <Image
                      src={featured.imageUrl}
                      alt={featured.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Readability scrim — bottom-anchored gradient (kept dark for
                    contrast over the image, not a section surface). */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

                {/* Content — fades with article change */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featured.title}
                    className="absolute bottom-0 left-0 right-0 p-8 z-10"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: DUR.card, ease: EASE_T.silk }}
                  >
                    <div className="text-xs text-white/80 tracking-widest font-semibold uppercase">
                      {featured.date} • {featured.readTime}
                    </div>

                    <h3 className="mt-2 text-white text-3xl font-semibold leading-snug">
                      {featured.title}
                    </h3>

                    <p className="mt-3 text-white/80 text-sm max-w-xl">
                      {featured.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full border border-white/30 hover:bg-white/10 transition-colors">
                      Read More &rarr;
                    </span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </Link>
          </div>

          {/* ================= RIGHT LIST ================= */}
          <div className="lg:col-span-2 flex flex-col gap-3 h-full">
            {recent.map((article, index) => (
              <Link
                key={index}
                href={article.href}
                target={isExternalDoc(article.href) ? "_blank" : undefined}
                rel={isExternalDoc(article.href) ? "noopener noreferrer" : undefined}
                className="group flex-1"
                onMouseEnter={() => handleSelect(article)}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: DUR.card, ease: EASE_T.silk }}
                  className="
                    relative flex items-center gap-4 h-full p-5
                    rounded-2xl border border-[#0a0a1a]/10 bg-white
                    shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)]
                    transition-colors
                    group-hover:border-[#1852FF]/30
                  "
                >
                  {/* Accent bar — uses Design_Tokens accent #1852FF */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-1 rounded-full bg-[#1852FF] group-hover:h-10 transition-all duration-300"
                  />

                  {/* Thumbnail */}
                  <div className="relative w-36 h-[100px] flex-shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#0a0a1a] leading-snug group-hover:text-[#1852FF] transition-colors">
                      {article.title}
                    </h4>

                    <p className="mt-1 text-xs text-[#0a0a1a]/70 line-clamp-2">
                      {article.description}
                    </p>

                    <p className="mt-2 text-xs text-[#0a0a1a]/60">
                      {article.date} • {article.readTime}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-[#1852FF] rounded-full border border-[#1852FF]/20 bg-[#1852FF]/5 hover:bg-[#1852FF]/10 transition-colors">
                      Read More &rarr;
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
