"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#FF5812" as const;

const STEPS = [
  {
    n: "01",
    title: "Discovery & research",
    body: "Stakeholder workshops, user flows, and technical feasibility — scope locked before build.",
  },
  {
    n: "02",
    title: "UI / UX design",
    body: "Wireframes to high-fidelity UI with design tokens ready for component implementation.",
  },
  {
    n: "03",
    title: "Frontend engineering",
    body: "Next.js, React, and accessible components — performance budgets enforced from sprint one.",
  },
  {
    n: "04",
    title: "Backend & APIs",
    body: "Secure services, integrations, and data layers architected for scale and observability.",
  },
  {
    n: "05",
    title: "Testing & QA",
    body: "Automated tests, OWASP checks, and UAT cycles before anything reaches production.",
  },
  {
    n: "06",
    title: "Deployment",
    body: "CI/CD pipelines, staging environments, and zero-downtime release playbooks.",
  },
  {
    n: "07",
    title: "Monitoring",
    body: "Logging, alerts, and performance dashboards so issues surface before users feel them.",
  },
  {
    n: "08",
    title: "Maintenance & support",
    body: "Security patches, feature iterations, and SLA-backed support after go-live.",
  },
] as const;

export default function WebDevProcessPinned() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current || !pinRef.current || prefersReducedMotion()) return;

      const stepEls = stepsRef.current?.querySelectorAll(".process-step");
      if (!stepEls?.length) return;

      gsap.set(stepEls, { opacity: 0.25, scale: 0.98 });
      gsap.set(stepEls[0], { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${STEPS.length * 42}%`,
          pin: pinRef.current,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (progressRef.current) {
        tl.fromTo(
          progressRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, ease: "none", duration: STEPS.length },
          0,
        );
      }

      stepEls.forEach((el, i) => {
        if (i === 0) return;
        tl.to(
          stepEls[i - 1],
          { opacity: 0.22, scale: 0.97, ease: "none", duration: 0.85 },
          i,
        ).to(el, { opacity: 1, scale: 1, ease: "none", duration: 0.85 }, i);
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      data-section="web-dev-process-pinned"
      className="relative bg-[#F3F0EE]"
    >
      <div ref={pinRef} className="mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="mb-10 max-w-xl lg:mb-14">
          <SectionHeader
            badge="Delivery process"
            accent={ACCENT}
            headline={
              <>
                Eight phases.
                <span className="block text-[#FF5812]">One scroll story.</span>
              </>
            }
            body="Inspired by agency scrollytelling — each phase activates as you move through the build lifecycle."
          />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="relative hidden lg:block">
            <div className="absolute left-3 top-0 h-full w-px bg-[#0a0a1a]/10" />
            <div
              ref={progressRef}
              className="absolute left-3 top-0 h-full w-px origin-top bg-[#FF5812]"
            />
          </div>

          <div ref={stepsRef} className="space-y-6 md:space-y-8">
            {STEPS.map((step) => (
              <article
                key={step.n}
                className="process-step rounded-2xl border border-[#0a0a1a]/[0.06] bg-white p-6 shadow-[0_12px_40px_-28px_rgba(10,10,26,0.12)] md:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="text-[11px] font-semibold tabular-nums tracking-[0.2em] text-[#FF5812]">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#0a0a1a] md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#0a0a1a]/65 md:text-base">
                      {step.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
