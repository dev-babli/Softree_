"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { DUR, EASE_T } from "@/lib/motion";

const SURFACE = "#F3F0EE";
const ACCENT_ORANGE = "#FF5812";
const PANEL_BG = "#FFFFFF";

interface DeliveryModel {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const MODELS: DeliveryModel[] = [
  {
    id: "01",
    number: "(01)",
    title: "Dedicated Teams",
    description:
      "Build a scalable engineering extension aligned with your delivery goals and workflows.",
    tags: ["Agile Delivery", "Scalable Teams", "Long-Term", "Leadership"],
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "02",
    number: "(02)",
    title: "White-Label",
    description:
      "Operate confidently with a trusted engineering partner delivering under your brand.",
    tags: ["Partner Friendly", "Offshore", "Enterprise", "Confidential"],
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "03",
    number: "(03)",
    title: "Staff Augmentation",
    description:
      "Quickly extend your capabilities with experienced engineers across modern tech stacks.",
    tags: ["Flexible", "Fast Onboarding", "Certified", "Remote"],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: "04",
    number: "(04)",
    title: "Project Delivery",
    description:
      "Accelerate project execution with outcome-focused engineering and enterprise standards.",
    tags: ["End-to-End", "Architecture", "Quality", "Production"],
    image:
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "05",
    number: "(05)",
    title: "Managed Services",
    description:
      "Ensure continuous optimization and operational stability with proactive support.",
    tags: ["SLA Support", "Monitoring", "Ops", "Security"],
    image:
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function LightEngagementModels() {
  const [expandedId, setExpandedId] = useState<string>("01");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023.98px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <section
      data-section="engagement-models"
      data-theme-section="light"
      className="w-full border-t border-[#0a0a1a]/[0.06] pt-12 pb-20 md:pt-16 md:pb-28"
      style={{ backgroundColor: SURFACE }}
      aria-labelledby="engagement-models-heading"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-12">
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <SectionHeader
            badge="Engagement"
            accent={ACCENT_ORANGE}
            headline={
              <span id="engagement-models-heading">Engagement models</span>
            }
            body="Choose how Softree embeds with your team — expand one lane to see scope, tags, and fit."
          />
        </motion.div>

        <div
          className="flex w-full flex-col overflow-hidden rounded-[18px] border border-[#0a0a1a]/[0.08] bg-white shadow-[0_1px_2px_rgba(10,10,26,0.04),0_16px_48px_-28px_rgba(10,10,26,0.12)] lg:flex-row"
          role="tablist"
          aria-label="Engagement models"
        >
          {MODELS.map((model) => {
            const isExpanded = expandedId === model.id;

            return (
              <motion.div
                key={model.id}
                role="tab"
                aria-selected={isExpanded}
                tabIndex={0}
                className="relative flex cursor-pointer flex-col overflow-hidden border-b border-[#0a0a1a]/[0.06] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1852FF] lg:border-b-0 lg:border-r lg:last:border-r-0"
                style={{ backgroundColor: isExpanded ? PANEL_BG : SURFACE }}
                initial={false}
                animate={{
                  flex: isExpanded ? 4 : 1.3,
                  height: isMobile ? (isExpanded ? "auto" : "80px") : "700px",
                }}
                transition={{ duration: 0.55, ease: EASE_T.drawer }}
                onClick={() => setExpandedId(model.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedId(model.id);
                  }
                }}
              >
                <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 pt-6 md:px-8 md:pt-8">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0a0a1a]/40">
                    Model
                  </span>
                  <div className="mx-4 h-px flex-1 bg-[#0a0a1a]/[0.08]" />
                  <span className="text-[11px] font-medium tabular-nums text-[#FF5812]/70">
                    {model.number}
                  </span>
                </div>

                <div className="relative z-10 flex h-full flex-col px-6 pb-6 pt-[4.25rem] md:px-8 md:pb-8 md:pt-[4.75rem]">
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        key={model.id}
                        className="flex h-full flex-col"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: DUR.card, ease: EASE_T.silk }}
                      >
                        <div
                          className="relative mb-6 w-full shrink-0 overflow-hidden rounded-2xl border border-[#0a0a1a]/[0.06] bg-[#F3F0EE]/50 md:mb-8"
                          style={{ aspectRatio: "16/9" }}
                        >
                          <Image
                            src={model.image}
                            alt={model.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            priority={model.id === "01"}
                          />
                        </div>

                        <div className="mt-auto flex flex-col">
                          <h3 className="mb-3 text-[1.65rem] font-semibold leading-tight tracking-[-0.03em] text-[#0a0a1a] md:text-[2rem]">
                            {model.title}
                          </h3>
                          <p className="mb-6 max-w-[90%] text-[15px] leading-relaxed text-[#0a0a1a]/62">
                            {model.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {model.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md border border-[#0a0a1a]/10 bg-[#F3F0EE]/80 px-3 py-1.5 text-[11px] font-medium text-[#0a0a1a]/65"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div
                  className={`absolute inset-0 z-0 transition-opacity duration-500 ${
                    isExpanded ? "opacity-0" : "opacity-100"
                  }`}
                  aria-hidden={isExpanded}
                >
                  <div className="absolute left-0 right-0 top-0 h-[50%]">
                    <Image
                      src={model.image}
                      alt=""
                      fill
                      className="object-cover object-top opacity-30 saturate-[0.9]"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom, transparent, ${SURFACE})`,
                      }}
                    />
                  </div>

                  <div className="absolute bottom-10 left-0 right-0 flex justify-center lg:bottom-12">
                    <h3
                      className="whitespace-nowrap text-[1.5rem] font-semibold tracking-tight text-[#0a0a1a]/28 md:text-[2rem]"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {model.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
