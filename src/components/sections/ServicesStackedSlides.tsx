"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

type ServiceSlide = {
  key: string
  phase: string
  index: string
  title: string
  headline: string
  description: string
  outcomes: string[]
  media: string
  tone: "light" | "dark" | "ember" | "violet"
}

const SERVICE_SLIDES: ServiceSlide[] = [
  {
    key: "global-delivery",
    phase: "PHASE 01",
    index: "01",
    title: "GLOBAL DELIVERY",
    headline: "Distributed teams built for continuous delivery.",
    description:
      "India-based engineering teams across time zones — scalable capacity, reliable continuity.",
    outcomes: ["Offshore Teams", "Global Reach", "Always-On"],
    media: "",
    tone: "light",
  },
  {
    key: "delivery-framework",
    phase: "PHASE 02",
    index: "02",
    title: "DELIVERY FRAMEWORK",
    headline: "A proven process designed for predictable outcomes.",
    description:
      "A structured framework aligning goals, architecture, and planning to reduce risk and accelerate execution.",
    outcomes: ["Discovery", "Design", "Agile Delivery"],
    media: "",
    tone: "ember",
  },
  {
    key: "engineering-execution",
    phase: "PHASE 03",
    index: "03",
    title: "ENGINEERING EXECUTION",
    headline: "Modern engineering for enterprise systems.",
    description:
      "Cloud platforms, Microsoft ecosystems, AI automation, custom apps — shipped to production.",
    outcomes: ["Cloud", "Microsoft", "AI Automation"],
    media: "",
    tone: "dark",
  },
  {
    key: "long-term-partnership",
    phase: "PHASE 04",
    index: "04",
    title: "LONG-TERM PARTNERSHIP",
    headline: "A delivery partner focused on long-term growth.",
    description:
      "Dedicated teams, ongoing optimization, and reliable support that scales with your business.",
    outcomes: ["Dedicated Teams", "Support", "Optimization"],
    media: "",
    tone: "violet",
  },
]

export function ServicesStackedSlides({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  /* INTENTIONAL SIMPLIFICATION (matching stack.html):
   * No GSAP. No ScrollTrigger. No animation-timeline. No scroll listeners.
   * Cards stack via pure CSS `position: sticky; top: 0`. Later sibling paints
   * on top of earlier one — no fade needed, no bleed-through possible. */

  return (
    <div ref={rootRef} className={`ssx-root ${className}`}>
      <header className="ssx-intro" aria-label="Delivery lifecycle">
        <div className="ssx-intro-copy">
          <div className="ssx-kicker-row">
            <span className="ssx-kicker-line" />
            <span className="ssx-kicker">Delivery Lifecycle</span>
          </div>
          <h2>From Strategy to Production — We Own Every Layer.</h2>
          <p className="ssx-subheadline mt-4 text-white/60 max-w-2xl">
            A structured offshore delivery model designed for speed, scalability, and long-term business impact.
          </p>
        </div>
        <Link href="/contact" className="ssx-intro-action">
          <span>Start a Project</span>
          <ArrowRight className="ssx-action-icon" aria-hidden />
        </Link>
      </header>

      <div className="ssx-slides-wrapper">
        {SERVICE_SLIDES.map((slide, i) => (
          <section
            key={slide.key}
            className={`ssx-section ssx-section-${slide.key} ssx-tone-${slide.tone}${i % 2 === 1 ? " ssx-section--reverse" : ""}`}
          >
            <div className="ssx-section-content">
              <div className="ssx-section-inner">
                <div className="ssx-copy">
                  <div className="ssx-phase">
                    <span className="ssx-index">{slide.index}</span>
                    <span>{slide.phase}</span>
                  </div>
                  <h3>{slide.title}</h3>
                  <p className="ssx-headline">{slide.headline}</p>
                  <p className="ssx-description">{slide.description}</p>
                  <ul className="ssx-outcomes" aria-label={`${slide.title} outcomes`}>
                    {slide.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                  <div className="ssx-actions">
                    <Link href="/contact" className="ssx-action-primary">
                      <span>Start a Project</span>
                      <ArrowRight className="ssx-action-icon" aria-hidden />
                    </Link>
                    <Link href="/services" className="ssx-action-secondary">
                      <span>View Services</span>
                    </Link>
                  </div>
                </div>

                <div className="ssx-media-block">
                  <div className="ssx-map-wrap ssx-map-wrap--webp">
                    <Image
                      src={`/images/slides/${slide.key}.webp`}
                      alt={slide.title}
                      fill
                      unoptimized
                      className="ssx-slide-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <style jsx>{`
        .ssx-root {
          width: 100%;
          background: #000;
          color: #fff;
          overflow-x: clip;
          font-family: "Outfit", sans-serif;
          color-scheme: dark;
        }

        .ssx-intro {
          width: min(100% - 2rem, 1320px);
          margin: 0 auto;
          padding: clamp(2.25rem, 5vw, 5rem) clamp(0.25rem, 2vw, 1.5rem) clamp(1rem, 2vw, 1.75rem);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .ssx-intro-copy {
          min-width: 0;
          display: grid;
          gap: 0.85rem;
        }

        .ssx-kicker-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #ff6b00;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .ssx-kicker-line {
          width: 44px;
          height: 1px;
          background: linear-gradient(90deg, #ff6b00, transparent);
          opacity: 0.75;
        }

        .ssx-intro h2 {
          max-width: 700px;
          margin: 0;
          font-size: clamp(1.7rem, 3.6vw, 3rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
          text-wrap: balance;
        }

        .ssx-skeleton {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
        }
        .ssx-skeleton-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.18);
          animation: ssx-pulse 1.4s ease-in-out infinite;
        }
        @keyframes ssx-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .ssx-intro-action {
          flex: 0 0 auto;
          min-height: 2.6rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.6rem 1.2rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: linear-gradient(135deg, #ff6b00 0%, #c8501c 100%);
          box-shadow: 0 8px 24px rgba(255, 107, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.22);
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0;
          overflow: hidden;
          position: relative;
          text-decoration: none;
          touch-action: manipulation;
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .ssx-intro-action::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255, 87, 34, 0.7) 0%, transparent 40%, transparent 60%, rgba(255, 255, 255, 0.3) 100%);
          mix-blend-mode: color-dodge;
          pointer-events: none;
        }

        /* PERF: dropped infinite glare animation on intro CTA */

        .ssx-intro-action:hover {
          transform: scale(1.03);
          box-shadow: 0 12px 32px rgba(255, 107, 0, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.28);
        }

        .ssx-intro-action:focus-visible {
          outline: 2px solid #ff6b00;
          outline-offset: 3px;
        }

        .ssx-slides-wrapper {
          width: 100%;
          padding: 0 clamp(0.75rem, 1.5vw, 1.25rem) clamp(0.75rem, 1.5vw, 1.25rem);
        }

        /* PURE STICKY STACK (matching stack.html). No animation-timeline,
           no @keyframes, no JS. Cards pin at viewport top; the next card in
           DOM order slides up and PAINTS OVER the previous one. Browser
           handles compositing natively at 120fps with zero main-thread cost. */
        .ssx-section {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100svh;
          min-height: 520px;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
          overflow: hidden;
          border-radius: 10px;
          isolation: isolate;
        }

        .ssx-section + .ssx-section {
          margin-top: 0.75rem;
        }

        .ssx-section::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .ssx-tone-light {
          background: #0e0e0e;
          color: #fff;
        }

        .ssx-tone-light::before {
          background:
            radial-gradient(900px 520px at 18% 86%, rgba(255, 107, 0, 0.12), transparent 68%),
            radial-gradient(700px 420px at 82% 12%, rgba(255, 255, 255, 0.04), transparent 62%);
        }

        .ssx-tone-ember {
          background: #11100e;
          color: #fff;
        }

        .ssx-tone-ember::before {
          background:
            radial-gradient(900px 560px at 22% 80%, rgba(255, 107, 0, 0.16), transparent 68%),
            radial-gradient(800px 540px at 82% 18%, rgba(255, 255, 255, 0.05), transparent 65%);
        }

        .ssx-tone-dark {
          background: #050506;
          color: #fff;
        }

        .ssx-tone-dark::before {
          background:
            radial-gradient(760px 520px at 15% 85%, rgba(10, 228, 72, 0.09), transparent 70%),
            radial-gradient(980px 540px at 80% 12%, rgba(255, 255, 255, 0.06), transparent 70%);
        }

        .ssx-tone-violet {
          background: #0c0c0e;
          color: #fff;
        }

        .ssx-tone-violet::before {
          background:
            radial-gradient(860px 540px at 22% 82%, rgba(255, 107, 0, 0.13), transparent 68%),
            radial-gradient(760px 460px at 82% 20%, rgba(255, 255, 255, 0.06), transparent 68%);
        }

        .ssx-section-content {
          position: relative;
          z-index: 1;
          width: min(100%, 1320px);
          height: 100%;
        }

        /* ACCESSIBILITY: Respect user motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .ssx-section {
            content-visibility: visible !important;
            animation: none !important;
          }
        }

        .ssx-section-inner {
          min-height: 100%;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: minmax(340px, 0.86fr) minmax(420px, 1.14fr);
          gap: clamp(2rem, 4.5vw, 4.75rem);
          align-items: center;
          padding: clamp(2rem, 4vw, 4.5rem);
        }

        /* ALTERNATING DIRECTION (matching stack.html data-direction="right"):
           even-indexed cards flip text and media sides. */
        .ssx-section--reverse .ssx-section-inner {
          grid-template-columns: minmax(420px, 1.14fr) minmax(340px, 0.86fr);
        }
        .ssx-section--reverse .ssx-copy {
          order: 2;
          align-items: flex-start;
        }
        .ssx-section--reverse .ssx-media-block {
          order: 1;
          justify-self: start;
        }

        .ssx-copy {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(0.8rem, 1.2vw, 1.05rem);
          max-width: 560px;
        }

        .ssx-phase {
          display: inline-flex;
          align-items: baseline;
          gap: 0.8rem;
          color: color-mix(in srgb, currentColor 42%, transparent);
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .ssx-index {
          color: #ff6b00;
          font-size: clamp(0.85rem, 1.1vw, 1rem);
          letter-spacing: -0.02em;
        }

        .ssx-copy h3 {
          max-width: 100%;
          margin: 0;
          font-size: clamp(1.6rem, 3vw, 2.6rem);
          font-weight: 900;
          line-height: 0.96;
          letter-spacing: -0.02em;
          overflow-wrap: normal;
          text-wrap: balance;
        }

        .ssx-headline {
          max-width: 30ch;
          margin: 0;
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: 0;
          text-wrap: balance;
        }

        .ssx-description {
          max-width: 48ch;
          margin: 0;
          font-size: clamp(0.8rem, 0.85vw, 0.88rem);
          line-height: 1.55;
          color: color-mix(in srgb, currentColor 60%, transparent);
          text-wrap: pretty;
        }

        .ssx-outcomes {
          list-style: none;
          padding: 0;
          width: 100%;
          margin: clamp(0.3rem, 0.8vw, 0.65rem) 0 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.5rem;
        }

        .ssx-outcomes li {
          display: inline-flex;
          align-items: center;
          min-height: 1.65rem;
          padding: 0.32rem 0.6rem;
          min-width: 0;
          border: 1px solid color-mix(in srgb, currentColor 14%, transparent);
          border-radius: 999px;
          background: color-mix(in srgb, currentColor 5%, transparent);
          color: color-mix(in srgb, currentColor 70%, transparent);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: left;
          overflow-wrap: anywhere;
        }

        .ssx-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          margin-top: clamp(0.35rem, 1vw, 0.85rem);
        }

        .ssx-action-primary,
        .ssx-action-secondary {
          min-height: 2.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.55rem 1.1rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0;
          text-decoration: none;
          touch-action: manipulation;
          position: relative;
          overflow: hidden;
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, color 220ms ease;
        }

        /* PERF: removed backdrop-filter blur — was THE #1 scroll-jank source.
           GPU was re-blurring behind every button on every scroll frame. */
        .ssx-action-primary {
          background: linear-gradient(135deg, #ff6b00 0%, #c8501c 100%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 22px rgba(255, 107, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.22);
          color: #ffffff;
        }

        .ssx-action-secondary {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.78);
        }

        .ssx-action-primary::before,
        .ssx-action-secondary::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          mix-blend-mode: color-dodge;
          pointer-events: none;
        }

        .ssx-action-primary::before {
          background: linear-gradient(135deg, rgba(255, 87, 34, 0.7) 0%, transparent 40%, transparent 60%, rgba(255, 255, 255, 0.3) 100%);
        }

        .ssx-action-secondary::before {
          background: linear-gradient(135deg, rgba(255, 122, 47, 0.35) 0%, transparent 50%, rgba(255, 255, 255, 0.15) 100%);
        }

        /* PERF: removed infinite hyper-glare animation (8 perpetual compositor anims). */

        .ssx-action-primary:hover,
        .ssx-action-secondary:hover {
          transform: scale(1.03);
        }

        .ssx-action-primary:hover {
          box-shadow: 0 12px 32px rgba(255, 107, 0, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.28);
        }

        .ssx-action-secondary:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.22);
        }

        .ssx-action-icon {
          width: 0.85rem;
          height: 0.85rem;
          position: relative;
          z-index: 1;
          flex: 0 0 auto;
          transition: transform 220ms ease;
        }

        .ssx-action-primary span,
        .ssx-action-secondary span,
        .ssx-intro-action span {
          position: relative;
          z-index: 1;
        }

        .ssx-action-primary:hover .ssx-action-icon,
        .ssx-intro-action:hover .ssx-action-icon {
          transform: translateX(0.25rem);
        }

        @keyframes ssx-hyper-glare {
          0% {
            left: -100%;
          }
          15% {
            left: 200%;
          }
          100% {
            left: 200%;
          }
        }

        .ssx-action-primary:focus-visible,
        .ssx-action-secondary:focus-visible {
          outline: 2px solid #ff6b00;
          outline-offset: 3px;
        }

        .ssx-media-block {
          width: 100%;
          max-width: 660px;
          justify-self: end;
          align-self: center;
          min-height: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.85rem;
        }

        .ssx-map-wrap {
          width: 100%;
          aspect-ratio: 16 / 10;
          max-height: min(66svh, 620px);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #080808;
          box-shadow:
            0 36px 110px rgba(0, 0, 0, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .ssx-map-wrap--diagram {
          aspect-ratio: 16 / 9;
        }

        .ssx-map-wrap--webp {
          position: relative;
          aspect-ratio: 16 / 10;
          max-height: min(66svh, 620px);
        }

        .ssx-slide-img {
          object-fit: cover;
          object-position: center;
          border-radius: 12px;
        }

        .ssx-media-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-height: min(66svh, 620px);
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #080808;
          box-shadow:
            0 36px 110px rgba(0, 0, 0, 0.34),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        :global(.ssx-image) {
          object-fit: cover;
          object-position: center;
        }

        .ssx-media-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.32)),
            radial-gradient(900px 380px at 50% 100%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.42));
        }

        .ssx-caption {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          color: color-mix(in srgb, currentColor 62%, transparent);
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          min-width: 0;
        }

        .ssx-caption span:first-child {
          color: #ff6b00;
          font-size: 1.15rem;
          letter-spacing: 0;
        }

        @media (max-width: 1100px) {
          .ssx-section {
            min-height: 840px;
          }

          .ssx-section-inner {
            grid-template-columns: 1fr;
            align-content: center;
            gap: 1.75rem;
          }

          .ssx-copy {
            max-width: 740px;
          }

          .ssx-copy h3 {
            font-size: clamp(1.5rem, 4vw, 2.4rem);
          }

          .ssx-media-frame {
            max-height: 36svh;
            aspect-ratio: 16 / 9;
          }

          .ssx-map-wrap {
            max-height: 38svh;
            aspect-ratio: 16 / 9;
          }

          .ssx-media-block {
            justify-self: start;
            max-width: 740px;
          }
        }

        @media (max-width: 767px) {
          .ssx-intro {
            width: min(100% - 1.5rem, 1440px);
            padding-top: 1.75rem;
            padding-bottom: 1rem;
            flex-direction: column;
            align-items: flex-start;
          }

          .ssx-kicker-row {
            font-size: 0.62rem;
            letter-spacing: 0.24em;
          }

          .ssx-intro h2 {
            font-size: clamp(1.55rem, 7vw, 2.2rem);
            line-height: 1.02;
          }

          .ssx-slides-wrapper {
            padding: 0.75rem;
          }

          .ssx-section {
            height: auto;
            min-height: auto;
            overflow: visible;
          }

          .ssx-section-inner {
            min-height: auto;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: clamp(1.25rem, 7vw, 2.25rem);
            padding-bottom: clamp(1.75rem, 8vw, 2.75rem);
          }

          .ssx-phase {
            font-size: 0.62rem;
            letter-spacing: 0.16em;
          }

          .ssx-copy h3 {
            font-size: clamp(1.5rem, 7vw, 2rem);
            line-height: 0.98;
          }

          .ssx-headline {
            max-width: 100%;
            font-size: clamp(0.95rem, 3.6vw, 1.1rem);
            line-height: 1.25;
          }

          .ssx-description {
            font-size: 0.82rem;
            line-height: 1.55;
          }

          .ssx-outcomes {
            grid-template-columns: 1fr;
          }

          .ssx-outcomes li {
            justify-content: flex-start;
          }

          .ssx-actions,
          .ssx-action-primary,
          .ssx-action-secondary,
          .ssx-intro-action {
            width: 100%;
          }

          .ssx-media-frame {
            max-height: none;
            aspect-ratio: 4 / 3;
          }

          .ssx-map-wrap {
            max-height: none;
            aspect-ratio: 4 / 3;
          }

          .ssx-caption {
            letter-spacing: 0.12em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ssx-intro-action::after,
          .ssx-action-primary::after,
          .ssx-action-secondary::after {
            animation: none;
            display: none;
          }

          .ssx-section {
            height: auto;
            min-height: auto;
            transform: none !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .ssx-section-inner {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default ServicesStackedSlides
