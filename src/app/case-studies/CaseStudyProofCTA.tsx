"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, MessageSquareQuote } from "lucide-react"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface CaseStudyProofCTAProps {
  /** Mirrors the problem the viewer is likely experiencing */
  challengeText?: string
  /** The solution framing — what you offer */
  solutionText?: string
  /** Accent color matching the category */
  accentColor?: string
  /** Testimonial shown adjacent to the CTA */
  quote?: string
  /** Name of the person quoted */
  quoteName?: string
  /** Role / company of the person quoted */
  quoteRole?: string
  /** Link for the primary CTA button */
  ctaHref?: string
  /** CTA button label */
  ctaLabel?: string
}

export default function CaseStudyProofCTA({
  challengeText = "Facing the same challenges your competitors already solved?",
  solutionText = "Every project above started with a single conversation. Let's talk about yours.",
  accentColor = "#1852FF",
  quote = "Softree didn't just deliver the project — they delivered results I could show my board on day one.",
  quoteName = "Operations Director",
  quoteRole = "Enterprise Client · UK",
  ctaHref = "/contact",
  ctaLabel = "Start your project",
}: CaseStudyProofCTAProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      className="w-full bg-[#F8F9FC] pb-20 pt-2 md:pb-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="overflow-hidden rounded-3xl border border-[#0a0a1a]/6 bg-white shadow-[0_12px_48px_-16px_rgba(10,10,26,0.1)]"
        >
          <div className="grid md:grid-cols-[1fr_auto]">
            {/* ── Left: Problem mirror + CTA ── */}
            <div className="relative overflow-hidden p-8 md:p-12">
              {/* Subtle accent glow */}
              <div
                className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full blur-[80px]"
                style={{ backgroundColor: `${accentColor}18` }}
              />

              <div className="relative">
                {/* Eyebrow */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}08` }}>
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em]" style={{ color: accentColor }}>
                    Ready to see results like these?
                  </span>
                </div>

                <h2 className="mb-4 max-w-xl text-[clamp(22px,3.5vw,36px)] font-bold leading-[1.2] tracking-tight text-[#0a0a1a]">
                  {challengeText}
                </h2>

                <p className="mb-8 max-w-md text-[15px] leading-relaxed text-[#0a0a1a]/55">
                  {solutionText}
                </p>

                <a
                  href={ctaHref}
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
                  style={{ backgroundColor: accentColor, boxShadow: `0 8px 24px -8px ${accentColor}60` }}
                >
                  {ctaLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                {/* Trust micro-copy below CTA */}
                <p className="mt-4 text-[11px] text-[#0a0a1a]/35">
                  Free consultation &nbsp;·&nbsp; No commitment &nbsp;·&nbsp; Response within 24 hours
                </p>
              </div>
            </div>

            {/* ── Right: Adjacent testimonial ── */}
            <div
              className="flex flex-col justify-center border-t p-8 md:w-80 md:border-l md:border-t-0 md:p-10"
              style={{ borderColor: `${accentColor}15`, backgroundColor: `${accentColor}05` }}
            >
              <MessageSquoteIcon accentColor={accentColor} />

              <blockquote className="mt-5 text-[14.5px] font-medium leading-relaxed text-[#0a0a1a]/75">
                &ldquo;{quote}&rdquo;
              </blockquote>

              <div className="mt-5 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  {quoteName.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#0a0a1a]">{quoteName}</div>
                  <div className="text-[11px] text-[#0a0a1a]/45">{quoteRole}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function MessageSquoteIcon({ accentColor }: { accentColor: string }) {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-xl"
      style={{ backgroundColor: `${accentColor}15` }}
    >
      <MessageSquareQuote className="h-5 w-5" style={{ color: accentColor }} />
    </div>
  )
}
