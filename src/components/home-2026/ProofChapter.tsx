"use client";

/**
 * ProofChapter ★ — THE signature moment. Story-spec §5.
 *
 * Pattern: CSS-sticky viewport inside a 400vh wrapper + ScrollTrigger scrub
 * on the wrapper (NO GSAP pin → no pin-spacer → lazy mount can never shift
 * page length; the page.tsx placeholder reserves the same 400vh).
 * Reference: ai-horizontal-story variant (useHorizontalScroll approach) —
 * pattern reference, not lift-and-shift.
 *
 * The unique mechanic — the TRAVELING EMBER: the same scrub timeline
 * interpolates the fixed ambient light's RGB (--ember-color) warm → cool
 * across the four panels. Numerals get velocity skew ≤ 2° (quickTo).
 *
 * Modes (gsap.matchMedia):
 *  - Desktop fine-pointer, motion OK → sticky + horizontal scrub + ember travel
 *  - Touch / coarse pointer         → native horizontal snap-scroll, no pin
 *  - Reduced motion                 → vertical stack, opacity-only, static ember
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import Reveal from "./lib/Reveal";

gsap.registerPlugin(ScrollTrigger);

type Panel = {
  slug: string;
  client: string;
  title: string;
  metric: string;
  quote: string;
  attribution: string;
  image: string;
  /** RGB triplet for the traveling ember at this panel */
  ember: [number, number, number];
};

// Slugs + images verified against public/og/pages (2026-07-04).
// TODO(verify): swap metric/quote lines for real Sanity testimonial content before ship.
const PANELS: Panel[] = [
  {
    slug: "ecg-group-ai-copilot-transformation",
    client: "ECG GROUP",
    title: "AI copilot transformation",
    metric: "Copilots in production",
    quote: "Enterprise workflows rebuilt around AI copilots — adopted by the teams, not just approved by IT.",
    attribution: "ENTERPRISE / EUROPE",
    image: "/og/pages/case-studies--ecg-group-ai-copilot-transformation.png",
    ember: [255, 122, 47],
  },
  {
    slug: "smart-manufacturing-intelligence-platform",
    client: "MANUFACTURING",
    title: "Smart manufacturing intelligence",
    metric: "Plant floor → decisions",
    quote: "Production data unified into one intelligence platform the plant actually runs on.",
    attribution: "MANUFACTURING / INDUSTRY 4.0",
    image: "/og/pages/case-studies--smart-manufacturing-intelligence-platform.png",
    ember: [255, 154, 77],
  },
  {
    slug: "banking-risk-compliance-analytics-global-bank",
    client: "GLOBAL BANK",
    title: "Risk & compliance analytics",
    metric: "Risk visibility, global scale",
    quote: "Compliance analytics delivered at the pace regulators move — across every region at once.",
    attribution: "BANKING / RISK & COMPLIANCE",
    image: "/og/pages/case-studies--banking-risk-compliance-analytics-global-bank.png",
    ember: [201, 139, 255],
  },
  {
    slug: "healthcare-patient-intelligence-platform",
    client: "HEALTHCARE",
    title: "Patient intelligence platform",
    metric: "One patient record, finally",
    quote: "Fragmented systems consolidated into a single patient intelligence layer clinicians trust.",
    attribution: "HEALTHCARE / PLATFORMS",
    image: "/og/pages/case-studies--healthcare-patient-intelligence-platform.png",
    ember: [122, 184, 255],
  },
];

export default function ProofChapter() {
  const scope = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const emberRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      const ember = emberRef.current;
      if (!wrapper || !track || !ember) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          wrapper.dataset.scrub = "true";

          const distance = () => -(track.scrollWidth - window.innerWidth);

          // Ember proxy — tweened on the SAME timeline, sets the CSS var (paint-only).
          const emberProxy = { r: 255, g: 122, b: 47 };
          const applyEmber = () => {
            ember.style.setProperty(
              "--ember-color",
              `${Math.round(emberProxy.r)}, ${Math.round(emberProxy.g)}, ${Math.round(emberProxy.b)}`,
            );
          };

          // Declared BEFORE the timeline: onUpdate can fire during creation.
          const numerals = track.querySelectorAll("[data-numeral]");
          const skewTo = gsap.quickTo(numerals, "skewX", { duration: 0.4, ease: "power3" });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.75,
              onUpdate: (self) => {
                if (railFillRef.current) {
                  gsap.set(railFillRef.current, { scaleX: self.progress });
                }
                // Velocity skew ≤ 2° on numerals
                const skew = Math.max(-2, Math.min(2, self.getVelocity() / 900));
                skewTo(skew);
              },
            },
          });

          // duration: 1 — keeps the track tween spanning the FULL timeline so
          // it stays in sync with the ember tweens (which end at t=1).
          tl.to(track, { x: distance, duration: 1 }, 0);
          for (let i = 1; i < PANELS.length; i++) {
            const [r, g, b] = PANELS[i].ember;
            tl.to(emberProxy, { r, g, b, onUpdate: applyEmber, duration: 1 / (PANELS.length - 1) }, (i - 1) / (PANELS.length - 1));
          }

          // Panel content reveals when panel center crosses viewport center.
          for (const panel of Array.from(track.children)) {
            gsap.from(panel.querySelectorAll("[data-panel-reveal]"), {
              opacity: 0,
              y: 20,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tl,
                start: "left 60%",
                toggleActions: "play none none none",
              },
            });
          }

          // Belt-and-braces: refresh after first image decodes (lazy mount safety).
          const firstImg = track.querySelector("img");
          if (firstImg) {
            (firstImg as HTMLImageElement)
              .decode()
              .then(() => ScrollTrigger.refresh())
              .catch(() => undefined);
          }

          return () => {
            delete wrapper.dataset.scrub;
          };
        },
      );

      // Touch / coarse pointer / reduced motion need no GSAP — handled by CSS modes below.
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="proof" aria-labelledby="proof-heading" className="bg-[#050505]">
      <div className="px-6 pt-28 sm:px-10 lg:px-24">
        <Reveal as="h2" className="font-mono-meta text-white/55">
          <span id="proof-heading">Proof, filmed in production.</span>
        </Reveal>
      </div>

      {/*
        Wrapper: 400vh ONLY in scrub mode (data attr set by matchMedia context).
        Other modes: natural height. The page-level lazy placeholder reserves
        lg:min-h-[400vh] so desktop mount never shifts page length.
      */}
      <div ref={wrapperRef} className="group relative mt-10 data-[scrub=true]:h-[400vh]">
        <div className="relative group-data-[scrub=true]:sticky group-data-[scrub=true]:top-0 group-data-[scrub=true]:h-screen group-data-[scrub=true]:overflow-hidden">
          {/* Traveling ember — fixed behind the track, hue tweened by the scrub */}
          <div
            ref={emberRef}
            aria-hidden
            className="ember-glow"
            style={{ ["--ember-x" as string]: "50%", ["--ember-y" as string]: "70%" }}
          />

          {/*
            Overflow follows the MODE, not the breakpoint:
            - scrub mode (data attr from matchMedia): no snap, overflow visible, GSAP drives x
            - all other modes: native horizontal snap-scroll
            - reduced motion: vertical stack (motion-reduce variants)
          */}
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory overflow-x-auto group-data-[scrub=true]:snap-none group-data-[scrub=true]:overflow-x-visible motion-reduce:snap-none motion-reduce:flex-col motion-reduce:overflow-visible"
          >
            {PANELS.map((p, i) => (
              <article
                key={p.slug}
                className="flex min-h-[80vh] w-[88vw] flex-shrink-0 snap-center flex-col justify-center gap-6 px-6 py-16 sm:px-10 lg:h-screen lg:w-screen lg:px-24 motion-reduce:h-auto motion-reduce:min-h-0 motion-reduce:w-full"
                aria-label={`Case study ${i + 1} of ${PANELS.length}: ${p.title}`}
              >
                <div className="flex items-baseline gap-6">
                  <span
                    data-numeral
                    className="font-semibold text-white/15"
                    style={{ fontSize: "clamp(4rem, 14vw, 12rem)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="font-mono-meta text-white/55">
                    <div>{p.client}</div>
                    <div className="mt-1 text-white/35">{p.attribution}</div>
                  </div>
                </div>

                <div className="grid items-center gap-10 lg:grid-cols-2">
                  <div>
                    <h3
                      data-panel-reveal
                      className="font-semibold text-white"
                      style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1 }}
                    >
                      {p.title}
                    </h3>
                    <p
                      data-panel-reveal
                      className="mt-4 font-semibold text-[#ff7a2f]"
                      style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
                    >
                      {p.metric}
                    </p>
                    <p data-panel-reveal className="mt-6 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-white/55">
                      {p.quote}
                    </p>
                    <Link
                      data-panel-reveal
                      href={`/case-studies/${p.slug}`}
                      className="font-mono-meta mt-8 inline-flex min-h-11 items-center gap-2 text-white/75 transition-colors duration-200 hover:text-[#ff7a2f] focus-visible:text-[#ff7a2f] focus-visible:outline-none"
                    >
                      <span aria-hidden>→</span> READ THE CASE
                    </Link>
                  </div>
                  <div className="hairline relative aspect-square max-h-[52vh] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={`${p.title} — case study cover`}
                      fill
                      sizes="(min-width: 1024px) 40vw, 80vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Progress rail */}
          <div className="font-mono-meta pointer-events-none absolute bottom-8 left-6 flex items-center gap-4 text-white/55 sm:left-10 lg:left-24">
            <span>01</span>
            <div className="relative h-px w-24 bg-white/10 sm:w-40">
              <div ref={railFillRef} className="absolute inset-0 origin-left scale-x-0 bg-[#ff7a2f]" />
            </div>
            <span>04</span>
          </div>
        </div>
      </div>

      <div className="h-20" aria-hidden />
    </section>
  );
}
