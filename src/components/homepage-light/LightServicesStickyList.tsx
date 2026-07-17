"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import Image from "next/image"
import SectionHeader from "@/components/homepage-light/SectionHeader"
import { EASE_T, DUR } from "@/lib/motion"

const SURFACE = "#F3F0EE"
const ACCENT_ORANGE = "#FF5812"

/* ====================================================================
 *  SERVICES — sticky list with hover image reveal
 *    • Sticky "Services" title on the left
 *    • 4 service rows stacked on the right
 *    • Hover a row → image reveals with a red overlay wipe from bottom
 * ==================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Service = {
  n: string
  title: string
  href: string
  desc: string
  tags: string[]
  img: string
  whiteLabel?: {
    title: string
    subtitle: string
    features: string[]
  }
}

const SERVICES: Service[] = [
 
  {
    n: "01",
    title: "AI Web Analyser",
    href: "/webanalyser",
    desc: "Scan your website instantly with AI. Get a performance audit, conversion optimization report, and custom digital strategy insights designed for growth.",
    tags: ["AI Growth Intelligence", "Website Audit", "Conversion Optimization", "UX Insights"],
    img: "/images/webanalyser-fixed.png",
    whiteLabel: {
      title: "FREE AI CONVERSION AUDIT",
      subtitle: "Instant Report • Actionable Insights • No Obligation",
      features: ["Performance Scoring", "UX Flow Analysis", "CRO Recommendations"]
    }
  },
 
  {
    n: "02",
    title: "Build Power Platform Automations",
    href: "/services/offshore-power-platform-development",
    desc: "Power Apps, Power Automate, and Power BI built by Microsoft Gold Partners. Enterprise governance, security review, ALM pipelines included.",
    tags: ["Power Apps", "Power Automate", "Power BI", "Microsoft"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    whiteLabel: {
      title: "WHITE-LABEL POWER PLATFORM PARTNER",
      subtitle: "Offshore Delivery • Your Brand • Our Expertise",
      features: ["NDA Protected", "Dedicated Team", "Microsoft Specialists"]
    }
  },
  {
    n: "03",
    title: "Modernize SharePoint",
    href: "/services/legacy-application-modernization",
    desc: "SharePoint intranets and SPFx web parts that don’t feel like SharePoint. Migration, custom branding, and Microsoft 365 integrations.",
    tags: ["SharePoint", "SPFx", "M365", "Migration"],
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
    whiteLabel: {
      title: "WHITE-LABEL SHAREPOINT PARTNER",
      subtitle: "Offshore Delivery • Your Brand • Our Expertise",
      features: ["NDA Protected", "Dedicated Team", "SharePoint & SPFx Specialists"]
    }
  },
  {
    n: "04",
    title: "Stand up Data + BI",
    href: "/services/offshore-data-analytics",
    desc: "Microsoft Fabric, Power BI dashboards, and data engineering pipelines that surface revenue signals — not 60-page decks.",
    tags: ["Microsoft Fabric", "Power BI", "Data Engineering", "Analytics"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    whiteLabel: {
      title: "WHITE-LABEL DATA & BI PARTNER",
      subtitle: "Offshore Delivery • Your Brand • Our Expertise",
      features: ["NDA Protected", "Dedicated Team", "Power BI & Fabric Specialists"]
    }
  },
  {
    n: "05",
    title: "Modernize Legacy Applications",
    href: "/services/legacy-application-modernization",
    desc: "Transform outdated systems, desktop applications, or legacy databases into secure, cloud-native platforms. Modern codebase architectures, seamless integrations.",
    tags: ["Legacy Migration", "Cloud Native", "React", "Next.js"],
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    whiteLabel: {
      title: "WHITE-LABEL MODERNIZATION PARTNER",
      subtitle: "Offshore Delivery • Your Brand • Our Expertise",
      features: ["NDA Protected", "Dedicated Team", "Legacy Migration Specialists"]
    }
  },
  {
    n: "06",
    title: "Ship a Web App",
    href: "/services/offshore-web-app-development",
    desc: "Production-grade web apps in Next.js, React, and TypeScript. Senior engineers, fixed scope, weekly demos. From discovery to launch in 12 weeks.",
    tags: ["Next.js", "React", "TypeScript", "Production"],
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    whiteLabel: {
      title: "WHITE-LABEL WEB APP PARTNER",
      subtitle: "Offshore Delivery • Your Brand • Our Expertise",
      features: ["NDA Protected", "Dedicated Team", "Next.js & React Specialists"]
    }
  },
]

/* ====================================================================
 *  ServiceCard — one full-bleed sticky card in the stack
 *    • Pins to top while the next card scrolls up over it (overlap effect)
 *    • Subtle scale + fade as it gets covered (stack feel)
 *    • Image overlay wipes down on enter, mimicking the .image-overlay.red
 * ==================================================================== */
function ServiceCard({
  s,
  index,
  total,
}: {
  s: Service
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const isLast = index === total - 1
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReduced ? [1, 1, 1] : [1, 0.97, isLast ? 1 : 0.92],
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    prefersReduced ? [1, 1, 1] : [1, 0.92, isLast ? 1 : 0.55],
  )
  const y = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : (prefersReduced ? 0 : -16)])

  const overlayRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: enterProgress } = useScroll({
    target: overlayRef,
    offset: ["start 0.98", "start 0.35"],
  })
  const overlayHeight = useTransform(enterProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["100%", "0%"])

  // Progressive sticky top — each card sits a hair lower than the previous,
  // so the stack is physically visible (not all pinned at the same y).
  const stickyOffset = `${index * 14}px`

  return (
    <div
      ref={ref}
      className="sticky w-full px-4 sm:px-6 py-3"
      style={{ top: stickyOffset }}
    >
      <motion.article
        style={{
          scale,
          opacity,
          y,
        }}
        className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[18px] border border-[#0a0a1a]/[0.08] bg-white shadow-[0_1px_2px_rgba(10,10,26,0.04),0_20px_50px_-28px_rgba(10,10,26,0.14)] ring-1 ring-[#FF5812]/10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            background: `radial-gradient(70% 55% at 18% 0%, rgba(24,82,255,0.06), transparent 65%), radial-gradient(50% 40% at 88% 100%, rgba(255,88,18,0.05), transparent 60%)`,
          }}
        />

        <div className="relative z-10 mx-auto w-full px-6 md:px-10">
          <div className="h-px w-full bg-[#0a0a1a]/[0.06]" />

          <div
            ref={overlayRef}
            className="grid min-h-[85svh] grid-cols-1 items-center gap-10 py-10 md:py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
          >
            {/* LEFT — copy block */}
            <div className="flex flex-col">
              <a
                href={s.href}
                className="group/title inline-flex items-baseline gap-3"
              >
                <h3
                  className="font-semibold text-[#0a0a1a] transition-colors duration-500 group-hover/title:text-[#0a0a1a]/65"
                  style={{
                    fontSize: "clamp(48px, 7.4vw, 108px)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {s.title}
                </h3>
                <span
                  className="flex items-baseline font-medium text-[#FF5812]/55"
                  style={{
                    fontSize: "clamp(16px, 1.4vw, 22px)",
                    letterSpacing: "-0.01em",
                    transform: "translateY(-0.35em)",
                  }}
                >
                  <span>{"{"}</span>
                  <span>0</span>
                  <span>{s.n.slice(1)}</span>
                  <span>{"}"}</span>
                </span>
              </a>

              <p className="mt-6 max-w-[480px] text-[15px] leading-[1.55] text-[#0a0a1a]/62 md:text-[16px]">
                {s.desc}
              </p>

              {/* White-Label Partner / Pricing/timeline transparency */}
              {s.whiteLabel ? (
                <div className="mt-5 flex flex-col gap-3.5 self-start rounded-2xl border border-[#0a0a1a]/10 bg-[#F3F0EE]/85 px-5 py-4 w-full max-w-[480px]">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5812]">
                      {s.whiteLabel.title}
                    </span>
                    <span className="text-[13.5px] font-semibold text-[#0a0a1a]/80 leading-snug mt-1">
                      {s.whiteLabel.subtitle}
                    </span>
                  </div>
                  <div className="h-px bg-[#0a0a1a]/10 w-full" />
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {s.whiteLabel.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
                        <span className="text-[12.5px] font-medium text-[#0a0a1a]/70">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Tags pinned to bottom-left of the column */}
              <div className="mt-auto flex flex-wrap gap-2.5 pt-16">
                {s.tags.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
                    className="rounded-full border border-[#0a0a1a]/10 bg-[#F3F0EE]/60 px-4 py-1.5 text-[12px] font-medium tracking-wide text-[#0a0a1a]/65"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* RIGHT — image with red overlay wipe */}
            <a
              href={s.href}
              className="relative block w-full overflow-hidden"
              style={{
                aspectRatio: "4 / 3",
                maxHeight: "min(60svh, 520px)",
              }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: EASE }}
              >
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index < 2}
                />
              </motion.div>
              <motion.div
                style={{ height: overlayHeight }}
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-[#FF5812]/85"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

/* ====================================================================
 *  LightServicesStickyList
 *    • "Services" heading, then 4 sticky-stacked service cards
 * ==================================================================== */
export default function LightServicesStickyList() {
  return (
    <section
      data-section="services-sticky"
      data-theme-section="light"
      className="relative w-full border-t border-[#0a0a1a]/[0.06]"
      style={{ backgroundColor: SURFACE }}
      aria-labelledby="services-sticky-heading"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 pb-8 pt-20 md:px-10 md:pb-10 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <SectionHeader
            badge="Services"
            accent={ACCENT_ORANGE}
            headline={
              <span
                id="services-sticky-heading"
                className="text-balance"
                style={{
                  fontSize: "clamp(40px, 7vw, 88px)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.04em",
                }}
              >
                What we build for you
              </span>
            }
            body="Scroll the stack — each card is a delivery lane with scope, timeline, and a path to the right practice page."
          />
        </motion.div>
      </div>

      {/* Sticky stack track */}
      <div className="relative">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.n} s={s} index={i} total={SERVICES.length} />
        ))}
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 md:px-10 md:pb-20">
        <div className="h-px w-full bg-[#0a0a1a]/[0.08]" />
      </div>
    </section>
  )
}
