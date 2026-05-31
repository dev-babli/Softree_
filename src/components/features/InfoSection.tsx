"use client"

/**
 * InfoSection — clone of Osmo's `.info` section.
 *
 * Architecture (matches Osmo's HTML structure):
 *   • `data-theme-section="light"` — same light canvas as the slider above.
 *     The two sections share one continuous cream background — no visual seam.
 *   • Two-column wrap: a small left column with a decorative graphic
 *     (`info__small-col`) and a large right column with all the content
 *     (`info__large-col`).
 *   • Right column stack:
 *       1. `info__scribble` — a hand-written eyebrow ("Why Softree?")
 *          paired with a curved hand-drawn arrow SVG (Osmo's exact path).
 *       2. `info__title` — long display headline.
 *       3. `info__list` — features list, title (left) + description (right).
 *       4. `trustedby-wrap` — divider row with centred tag pair, then a
 *          continuous logo marquee.
 *
 * Content (FEATURES, HEADLINE, MARQUEE_ITEMS) is preserved as-is per request;
 * only the visual treatment + structure changes to match Osmo.
 */

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { LogoLoop } from "./LogoLoop"
import { EASE_T } from "@/lib/motion"

const EASE = EASE_T.silk

/* ─────────────────────────────────────────────────────────────────
   CONTENT  —  KEEP AS-IS
   ───────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    title: "Security & Governance",
    body: "Enterprise-grade controls, compliance practices, access management, and delivery governance integrated into every engagement.",
  },
  {
    title: "Documentation Discipline",
    body: "Structured documentation, knowledge transfer, and maintainable engineering practices designed for long-term continuity.",
  },
  {
    title: "Scalable Architecture",
    body: "Modern architectures engineered for performance, extensibility, and future business growth.",
  },
  {
    title: "Cross-Team Collaboration",
    body: "Transparent communication and coordinated execution across stakeholders, engineering teams, and business units.",
  },
  {
    title: "AI-Enhanced Productivity",
    body: "AI-assisted workflows that accelerate development, automation, testing, and operational efficiency.",
  },
  {
    title: "Transparent Delivery",
    body: "Clear sprint visibility, milestone tracking, reporting, and accountability throughout the delivery lifecycle.",
  },
]

const HEADLINE =
  "Engineered for enterprise delivery at scale."

/* Partner logos — sourced from the same set we use across the site
 * (`/public/images/logo`). Rendered into the LogoLoop as styled `<img>`
 * tiles so the cream background stays clean and unbranded marks read well. */
type PartnerLogo = { name: string; src: string }
const PARTNER_LOGOS: PartnerLogo[] = [
  { name: "GO ERP", src: "/images/logo/goerp1.jpg" },
  { name: "Nuvento", src: "/images/logo/nuvento.jpg" },
  { name: "Kwiz", src: "/images/logo/kwiz.png" },
  { name: "Jonians", src: "/images/logo/jonians.jpg" },
  { name: "Export Control", src: "/images/logo/ecg.png" },
  { name: "SP Marketplace", src: "/images/logo/sp-marketplace.png" },
  { name: "Bosch", src: "/images/logo/bosch.png" },
  { name: "Emscale", src: "/images/logo/emscale_logo.png" },
  { name: "Link Innovation", src: "/images/logo/link-innovation.png" },
  { name: "Intellectt", src: "/images/logo/Intellectt_logo.png" },
]

const MARQUEE_ITEMS = PARTNER_LOGOS.map((p) => ({
  title: p.name,
  ariaLabel: p.name,
  node: (
    <span
      className="trustedby-logo group/logo inline-flex h-[56px] items-center justify-center px-5"
      style={{ backgroundColor: "#F3F0EE" }}
    >
      <img
        src={p.src}
        alt={p.name}
        loading="lazy"
        decoding="async"
        className="max-h-[44px] w-auto select-none object-contain"
        draggable={false}
      />
    </span>
  ),
}))

/* ─────────────────────────────────────────────────────────────────
   ASSETS
   ───────────────────────────────────────────────────────────────── */

/**
 * Hand-drawn curved arrow that points down from the scribble eyebrow toward
 * the headline — exact path data from Osmo's `scribble-arrow`.
 */
function ScribbleArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 32 32"
      fill="none"
      className="w-7 h-7 md:w-8 md:h-8 text-[#141413]"
      aria-hidden
    >
      <path
        d="M30.3491 31.5811L30.558 30.3311L31.1618 29.9525C29.2036 30.1222 28.2898 27.0739 26.4295 26.369C25.8681 26.1568 25.7735 26.8128 25.9497 27.0119C25.9921 27.0609 26.6775 27.2502 27.0985 27.6516C27.4575 27.9975 29.1938 29.5543 28.8805 29.9492C23.8153 29.4434 19.1711 28.2358 14.7619 25.6477C5.77699 20.3802 0.852119 10.8502 0.0231477 0.612125C-0.616531 15.7327 12.0922 28.8428 26.9223 30.2821C26.5796 31.1372 23.8022 30.2234 23.9882 31.5811H30.3459H30.3491Z"
        fill="currentColor"
      />
    </svg>
  )
}

/**
 * Softree-branded micrographic for the small left column.
 *
 * Composition (all on-brand — `#141413` ink, `#FF7A2F` accent):
 *   • Header bar with the SOFTREE wordmark + version tag
 *   • A stylised "S" curve formed from a sequence of connected capability
 *     nodes (mirrors the company's "soft + tree" identity — soft growth)
 *   • Orange accent node marks the active capability (AI), with annotated
 *     leader line + label
 *   • Concentric radar arcs to read as an engineering blueprint
 *   • Bottom legend listing the four core capability pillars
 */
function MicroGraphic() {
  // S-curve control points — generated by sampling a smooth cubic.
  const NODES = [
    { x: 230, y: 90 },
    { x: 198, y: 110 },
    { x: 158, y: 132 },
    { x: 122, y: 160 },
    { x: 116, y: 200 },
    { x: 138, y: 232 },
    { x: 178, y: 252 },
    { x: 220, y: 268 },
  ]
  const ACCENT_INDEX = 4 // the orange highlighted capability node

  // Smooth cubic curve through the S-path control points.
  const sPath =
    `M ${NODES[0].x} ${NODES[0].y} ` +
    `C 200 90, 130 100, 122 160 ` +
    `S 130 250, ${NODES[NODES.length - 1].x} ${NODES[NODES.length - 1].y}`

  return (
    <svg
      viewBox="0 0 320 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto text-[#141413]"
      aria-hidden
    >
      {/* Outer dotted frame */}
      <rect
        x="6"
        y="6"
        width="308"
        height="388"
        rx="14"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1"
        strokeDasharray="3 4"
      />

      {/* ── Header bar ── */}
      <text
        x="22"
        y="34"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="10"
        fontWeight="600"
        letterSpacing="0.22em"
        fill="currentColor"
        opacity="0.55"
      >
        SOFTREE
      </text>
      <text
        x="80"
        y="34"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="10"
        fontWeight="500"
        letterSpacing="0.18em"
        fill="currentColor"
        opacity="0.35"
      >
        / SYSTEMS
      </text>
      <text
        x="298"
        y="34"
        textAnchor="end"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="10"
        fontWeight="600"
        letterSpacing="0.2em"
        fill="#FF7A2F"
        opacity="0.95"
      >
        v.04 ●
      </text>

      {/* Hairline rule under header */}
      <line
        x1="22"
        y1="44"
        x2="298"
        y2="44"
        stroke="currentColor"
        strokeOpacity="0.18"
      />

      {/* ── Concentric blueprint arcs (radar) ── */}
      <g stroke="currentColor" fill="none" strokeOpacity="0.18">
        <circle cx="170" cy="180" r="40" />
        <circle cx="170" cy="180" r="72" strokeDasharray="2 4" />
        <circle cx="170" cy="180" r="108" strokeDasharray="2 6" strokeOpacity="0.12" />
      </g>

      {/* Crosshairs */}
      <g stroke="currentColor" strokeOpacity="0.12" strokeDasharray="2 3">
        <line x1="22" y1="180" x2="298" y2="180" />
        <line x1="170" y1="58" x2="170" y2="282" />
      </g>

      {/* ── The Softree S-curve (capability spine) ── */}
      <path
        d={sPath}
        stroke="currentColor"
        strokeOpacity="0.85"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Connector links between adjacent S-curve nodes */}
      <g stroke="currentColor" strokeOpacity="0.25">
        {NODES.slice(0, -1).map((n, i) => {
          const next = NODES[i + 1]
          return (
            <line
              key={`link-${i}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              strokeDasharray="1 3"
            />
          )
        })}
      </g>

      {/* Capability nodes along the S-curve */}
      <g>
        {NODES.map((n, i) => {
          const isAccent = i === ACCENT_INDEX
          if (isAccent) {
            return (
              <g key={`node-${i}`}>
                {/* Outer halo */}
                <circle cx={n.x} cy={n.y} r="11" fill="#FF7A2F" opacity="0.18" />
                {/* Ring */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="7"
                  stroke="#FF7A2F"
                  strokeWidth="1.2"
                  fill="none"
                />
                {/* Solid centre */}
                <circle cx={n.x} cy={n.y} r="3.5" fill="#FF7A2F" />
              </g>
            )
          }
          return (
            <g key={`node-${i}`}>
              <circle
                cx={n.x}
                cy={n.y}
                r="4.5"
                fill="#F3F0EE"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx={n.x} cy={n.y} r="1.5" fill="currentColor" />
            </g>
          )
        })}
      </g>

      {/* Annotation leader from the accent node out to a label */}
      <g>
        <line
          x1={NODES[ACCENT_INDEX].x}
          y1={NODES[ACCENT_INDEX].y}
          x2={36}
          y2={NODES[ACCENT_INDEX].y}
          stroke="#FF7A2F"
          strokeOpacity="0.6"
          strokeDasharray="2 3"
        />
        <text
          x={36}
          y={NODES[ACCENT_INDEX].y - 6}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.16em"
          fill="#FF7A2F"
        >
          AI · ACTIVE
        </text>
      </g>

      {/* Top-right small probe / orbit dot */}
      <circle cx="250" cy="120" r="2.5" fill="currentColor" opacity="0.6" />
      <line x1="250" y1="120" x2="220" y2="135" stroke="currentColor" strokeOpacity="0.3" />

      {/* Bottom-left probe */}
      <circle cx="92" cy="252" r="2.5" fill="currentColor" opacity="0.6" />
      <line x1="92" y1="252" x2="116" y2="245" stroke="currentColor" strokeOpacity="0.3" />

      {/* ── Bottom legend block ── */}
      <g transform="translate(20, 304)">
        <rect width="280" height="80" rx="8" fill="currentColor" fillOpacity="0.04" />

        <text
          x="14"
          y="20"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.22em"
          fill="currentColor"
          opacity="0.55"
        >
          CORE CAPABILITIES
        </text>

        {/* Capability chips */}
        <g
          transform="translate(14, 32)"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.1em"
        >
          {/* Row 1 */}
          <g transform="translate(0, 0)">
            <rect width="118" height="16" rx="8" fill="currentColor" fillOpacity="0.06" />
            <circle cx="9" cy="8" r="2.5" fill="currentColor" />
            <text x="18" y="11" fill="currentColor" opacity="0.85">
              POWER PLATFORM
            </text>
          </g>
          <g transform="translate(126, 0)">
            <rect width="60" height="16" rx="8" fill="#FF7A2F" fillOpacity="0.18" />
            <circle cx="9" cy="8" r="2.5" fill="#FF7A2F" />
            <text x="18" y="11" fill="#FF7A2F">AI</text>
          </g>

          {/* Row 2 */}
          <g transform="translate(0, 22)">
            <rect width="60" height="16" rx="8" fill="currentColor" fillOpacity="0.06" />
            <circle cx="9" cy="8" r="2.5" fill="currentColor" />
            <text x="18" y="11" fill="currentColor" opacity="0.85">DATA</text>
          </g>
          <g transform="translate(68, 22)">
            <rect width="60" height="16" rx="8" fill="currentColor" fillOpacity="0.06" />
            <circle cx="9" cy="8" r="2.5" fill="currentColor" />
            <text x="18" y="11" fill="currentColor" opacity="0.85">WEB</text>
          </g>
          <g transform="translate(136, 22)">
            <rect width="118" height="16" rx="8" fill="currentColor" fillOpacity="0.06" />
            <circle cx="9" cy="8" r="2.5" fill="currentColor" />
            <text x="18" y="11" fill="currentColor" opacity="0.85">
              GLOBAL ENG · 24/7
            </text>
          </g>
        </g>
      </g>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */
export default function InfoSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })

  return (
    <section
      ref={ref}
      data-theme-section="light"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 pt-2 md:pt-4 lg:pt-6 pb-20 md:pb-28">
        {/* ── info__wrap ── 2-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
          {/* Small left column — decorative graphic */}
          <motion.div
            className="md:col-span-3 lg:col-span-3 flex md:block"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="w-[180px] sm:w-[220px] md:w-full md:max-w-[260px]">
              <MicroGraphic />
            </div>
          </motion.div>

          {/* Large right column — all content */}
          <div className="md:col-span-9 lg:col-span-9 flex flex-col">
            {/* ── info__scribble ── */}
            <motion.div
              className="flex items-end gap-3 mb-6 md:mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            >
              <p
                className="text-[20px] md:text-[24px] italic text-[#141413] leading-none"
                style={{
                  fontFamily:
                    "'Caveat', 'Brush Script MT', 'Pacifico', 'Snell Roundhand', cursive",
                  transform: "rotate(-3deg)",
                  transformOrigin: "left bottom",
                }}
              >
                Why Softree?
              </p>
              <span
                className="-mb-1"
                style={{ transform: "translateY(2px) rotate(-6deg)" }}
              >
                <ScribbleArrow />
              </span>
            </motion.div>

            {/* ── info__title ── word-by-word blur-up ── */}
            <motion.h3
              className="text-[clamp(28px,4.4vw,58px)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#141413] mb-12 md:mb-16 max-w-[900px]"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
              }}
            >
              {HEADLINE.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  style={{ marginRight: "0.25em" }}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h3>

            {/* ── info__list ── */}
            <ul className="flex flex-col w-full mb-16 md:mb-20">
              {FEATURES.map((feat, i) => (
                <motion.li
                  key={feat.title}
                  className="group/row flex flex-col lg:flex-row border-t border-[#141413]/15 py-8 md:py-10 gap-3 lg:gap-16 transition-colors duration-500 hover:border-[#141413]/35"
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: EASE }}
                >
                  <div className="w-full lg:w-[40%]">
                    <h4 className="relative text-[18px] md:text-[22px] font-semibold tracking-tight text-[#141413] inline-block">
                      <span className="relative">
                        {feat.title}
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-[#141413] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/row:w-full"
                        />
                      </span>
                    </h4>
                  </div>
                  <div className="w-full lg:w-[60%]">
                    <p className="text-[15px] md:text-[17px] text-[#141413]/65 leading-relaxed max-w-[560px] transition-colors duration-300 group-hover/row:text-[#141413]/90">
                      {feat.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* ── trustedby-wrap ── */}
            <div className="w-full">
              {/* tag-row : flanking lines + centred tag pair */}
              <div className="flex items-center gap-4 mb-8 md:mb-10">
                <span className="flex-1 h-px bg-[#141413]/15" />
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-[10px] font-semibold tracking-[0.12em] uppercase text-[#141413]/85"
                    style={{ background: "rgba(20,20,19,0.06)" }}
                  >
                    Trusted by
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.12em] uppercase text-[#141413]/85"
                    style={{ background: "rgba(20,20,19,0.06)" }}
                  >
                    Industry Giants
                  </span>
                </div>
                <span className="flex-1 h-px bg-[#141413]/15" />
              </div>

              {/* trustedby-row : continuous logo marquee */}
              <div className="opacity-95">
                <LogoLoop
                  logos={MARQUEE_ITEMS}
                  speed={70}
                  direction="left"
                  gap={88}
                  logoHeight={56}
                  hoverSpeed={0}
                  fadeOut
                  fadeOutColor="#F3F0EE"
                  ariaLabel="Trusted by partner companies"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
