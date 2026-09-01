"use client";

/**
 * Softree industry carousel layout:
 * - Left: headline + dashed CTA rail (Softree copy)
 * - Right: industry pills + CDN hero cards + Softree partner logo strip
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { PARTNER_LOGOS } from "@/components/qc/homepage-light/AboutClientLogos";
import { DUR, EASE_T, REVEAL, VIEWPORT } from "@/lib/motion";

const SECTION_SURFACE = "#FFFFFF";
const KORE_CDN = "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b";

type Panel = {
  id: string;
  tab: string;
  title: string;
  subtitle?: string;
  trustedLabel: string;
  bg: string;
};

const PANELS: Panel[] = [
  {
    id: "banking",
    tab: "Banking",
    title: "Banks, Credit Unions, Financial Institutions",
    trustedLabel: "Trusted by Softree partners:",
    bg: `${KORE_CDN}/68c1998017adc89faa49388c_fshome.avif`,
  },
  {
    id: "healthcare",
    tab: "Healthcare",
    title: "Payers, Providers, Life Sciences",
    trustedLabel: "Trusted by Softree partners:",
    bg: `${KORE_CDN}/68c19a3bfda82c7f2e12c79a_healthcarehome.avif`,
  },
  {
    id: "retail",
    tab: "Retail",
    title: "Consumer Goods and Services",
    subtitle:
      "Make work more efficient, intelligent, and valuable across the organization.",
    trustedLabel: "Trusted by Softree partners:",
    bg: `${KORE_CDN}/68c19a3b38b198ea6f222a3f_351a023e6b7126c0fc226cf7c9d3a1df_consumerhome.avif`,
  },
  {
    id: "telecom",
    tab: "Telecom + Media",
    title: "Telecom, Media, Communications",
    subtitle:
      "Make work more efficient, intelligent, and valuable across the organization.",
    trustedLabel: "Trusted by Softree partners:",
    bg: `${KORE_CDN}/68c19a3bfdc0d853dd98ecae_telecomhome.avif`,
  },
  {
    id: "business",
    tab: "Business",
    title: "B2B Goods and Services",
    subtitle:
      "Make work more efficient, intelligent, and valuable across the organization.",
    trustedLabel: "Trusted by Softree partners:",
    bg: `${KORE_CDN}/68c19a3b2513192e19a6dcc2_b2bhome.avif`,
  },
];

function PartnerLogoTile({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="inline-flex h-10 min-w-[128px] items-center justify-center rounded-md bg-white/90 px-3 backdrop-blur-[2px]">
      {failed ? (
        <span className="text-[10px] font-semibold text-[#0a0a1a]/70">{alt}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="max-h-6 w-auto max-w-[100px] object-contain"
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

/** Softree client logos — same strip on every industry card */
function SoftreePartnerStrip() {
  const reduced = useReducedMotion();
  const track = useMemo(
    () => [...PARTNER_LOGOS, ...PARTNER_LOGOS],
    []
  );

  return (
    <div className="overflow-hidden rounded-md border border-white/20 bg-white/35 p-2 backdrop-blur-sm">
      <div
        className={`softree-partner-marquee inline-flex w-max gap-2 ${reduced ? "flex-wrap justify-center" : ""}`}
      >
        {track.map((logo, i) => (
          <PartnerLogoTile key={`${logo.src}-${i}`} src={logo.src} alt={logo.name} />
        ))}
      </div>
    </div>
  );
}

export default function IndustrySoftree() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduced = useReducedMotion();
  const inView = useInView(sectionRef, { ...VIEWPORT.default, amount: 0.1 });

  const activateTab = useCallback(
    (index: number) => {
      setActiveIndex(index);
      const scroller = scrollerRef.current;
      const card = cardRefs.current[index];
      if (scroller && card) {
        const relativeLeft = card.getBoundingClientRect().left - scroller.getBoundingClientRect().left;
        scroller.scrollTo({
          left: scroller.scrollLeft + relativeLeft,
          behavior: reduced ? "auto" : "smooth",
        });
      }
    },
    [reduced]
  );

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % PANELS.length;
      activateTab(nextIndex);
    }, 5500); // Auto slide every 5.5 seconds

    return () => clearInterval(interval);
  }, [activeIndex, reduced, activateTab]);

  return (
    <section
      ref={sectionRef}
      data-section="enterprise-industries"
      className="relative overflow-hidden pt-20 pb-8 md:pt-24 md:pb-12"
      style={{ backgroundColor: SECTION_SURFACE }}
      aria-labelledby="enterprise-industries-heading"
    >
      <div className="relative mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(280px,320px)_minmax(0,1fr)] xl:gap-10">
          {/* Left — Kore-style copy column (plain white panel) */}
          <motion.aside
            className="flex min-h-[420px] flex-col justify-between rounded-2xl border border-[#0a0a1a]/[0.08] bg-white px-6 py-8 md:px-8 md:py-9 lg:min-h-[470px]"
            initial={REVEAL.up.initial}
            animate={inView ? REVEAL.up.animate : REVEAL.up.initial}
            transition={{ duration: DUR.section, ease: EASE_T.silk }}
          >
            <div className="space-y-4">
              <h2
                id="enterprise-industries-heading"
                className="max-w-[16ch] text-[1.85rem] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0a0a1a] md:text-[2.05rem]"
              >
                We&apos;ve built our business by serving global enterprises
              </h2>
              <p className="text-[1rem] leading-relaxed text-[#0a0a1a]/55">
                Engineering partners for regulated teams — Microsoft, industrial,
                and product-led organisations worldwide.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <p className="max-w-[26ch] text-[0.95rem] leading-relaxed text-[#0a0a1a]/60">
                Discover how enterprises partner with Softree for delivery you
                can audit, scale, and own.
              </p>

              <div className="rounded-lg border border-dashed border-[#0a0a1a]/20 bg-[#FAFAF9] p-4">
                <div className="flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#0a0a1a] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#0a0a1a]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a0a1a]"
                  >
                    Let&apos;s talk
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Right — pills + Kore CDN cards + Softree logos */}
          <div className="min-w-0">
            <div
              className="mb-5 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Industry sectors"
            >
              {PANELS.map((panel, index) => {
                const selected = activeIndex === index;
                return (
                  <button
                    key={panel.id}
                    type="button"
                    role="tab"
                    id={`industry-tab-${panel.id}`}
                    aria-selected={selected}
                    aria-controls={`industry-panel-${panel.id}`}
                    onClick={() => activateTab(index)}
                    className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.11em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1852FF] ${
                      selected
                        ? "border-[#0a0a1a] bg-[#0a0a1a] text-white"
                        : "border-[#0a0a1a]/15 bg-white text-[#0a0a1a]/60 hover:border-[#0a0a1a]/30 hover:text-[#0a0a1a]/85"
                    }`}
                  >
                    {panel.tab}
                  </button>
                );
              })}
            </div>

            <div
              ref={scrollerRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
            >
              {PANELS.map((panel, index) => (
                <motion.div
                  key={panel.id}
                  id={`industry-panel-${panel.id}`}
                  role="tabpanel"
                  aria-labelledby={`industry-tab-${panel.id}`}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className="relative h-[440px] w-full min-w-full snap-start overflow-hidden rounded-[10px] ring-1 ring-[#0a0a1a]/10 md:h-[470px]"
                  initial={REVEAL.fade.initial}
                  animate={inView ? REVEAL.fade.animate : REVEAL.fade.initial}
                  transition={{
                    duration: DUR.card,
                    ease: EASE_T.silk,
                    delay: index * 0.05,
                  }}
                >
                  {/* Kore CDN hero — full bleed, no cream wash */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={panel.bg}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40"
                  />

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-7">
                    <div>
                      <h3 className="max-w-[20ch] text-[2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white md:text-[2.35rem]">
                        {panel.title}
                      </h3>
                      {panel.subtitle ? (
                        <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-white/88">
                          {panel.subtitle}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/90">
                        {panel.trustedLabel}
                      </p>
                      <SoftreePartnerStrip />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .softree-partner-marquee {
          display: inline-flex;
          width: max-content;
          gap: 0.55rem;
          animation: softree-partner-marquee 28s linear infinite;
        }
        @keyframes softree-partner-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .softree-partner-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
