"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Layers, Users, CalendarDays } from "lucide-react";
import { WEB_DEV_VISUALS } from "./web-dev-visuals";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const LEAD_CARDS = [
  {
    icon: Rocket,
    title: "Accelerate MVP launches",
    body: "Discovery-to-demo in weeks — architecture you can grow, not throw away.",
  },
  {
    icon: Layers,
    title: "Built to scale from day one",
    body: "Modular Next.js, CI/CD, and observability wired in before launch.",
  },
  {
    icon: Users,
    title: "End-to-end delivery partner",
    body: "Product, design, and engineering in one squad — no handoff gaps.",
  },
  {
    icon: CalendarDays,
    title: "Weekly demos, fixed milestones",
    body: "Transparent sprints aligned to your schedule — not the other way around.",
  },
] as const;

export default function WebDevScrollLead() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLParagraphElement>(null);
  const lineBotRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current || !pinRef.current || prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=140%",
          pin: pinRef.current,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        mediaRef.current,
        { width: 160, height: 64, borderRadius: 999 },
        { width: 460, height: 280, borderRadius: 20, ease: "none" },
        0,
      )
        .fromTo(
          stageRef.current,
          { scale: 1 },
          { scale: 0.93, ease: "none" },
          0.12,
        )
        .fromTo(
          lineTopRef.current,
          { y: 0, opacity: 1 },
          { y: -36, opacity: 0.3, ease: "none" },
          0.22,
        )
        .fromTo(
          lineBotRef.current,
          { y: 0, opacity: 1 },
          { y: 36, opacity: 0.3, ease: "none" },
          0.22,
        );

      if (cardsRef.current) {
        gsap.from(cardsRef.current.querySelectorAll(".lead-card"), {
          y: 56,
          opacity: 0,
          stagger: 0.08,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      data-section="web-dev-scroll-lead"
      className="relative bg-[#0a0a0a] text-white"
      aria-labelledby="web-dev-lead-heading"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] items-center justify-center overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(24,82,255,0.08), transparent 70%)",
          }}
        />

        <div
          ref={stageRef}
          className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12"
        >
          <p
            ref={lineTopRef}
            className="text-center font-semibold tracking-[-0.04em] text-white/90"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", lineHeight: 0.92 }}
          >
            Web products built to
          </p>

          <div
            id="web-dev-lead-heading"
            className="mt-5 flex flex-wrap items-center justify-center gap-4 md:gap-8"
          >
            <span
              className="font-semibold tracking-[-0.05em] text-[#FF5812]"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)", lineHeight: 0.88 }}
            >
              ship
            </span>

            <div
              ref={mediaRef}
              className="relative shrink-0 overflow-hidden border border-white/15 shadow-[0_30px_90px_-20px_rgba(255,88,18,0.5)]"
              style={{ width: 160, height: 64 }}
            >
              <Image
                src={WEB_DEV_VISUALS.lead.src}
                alt={WEB_DEV_VISUALS.lead.alt}
                fill
                className="object-cover"
                sizes="460px"
              />
            </div>

            <span
              className="font-semibold tracking-[-0.05em] text-white"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)", lineHeight: 0.88 }}
            >
              at scale
            </span>
          </div>

          <p
            ref={lineBotRef}
            className="mt-8 text-center text-base text-white/45 md:text-lg"
          >
            The middle frame expands as you scroll — same rhythm as premium agency landings.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 pb-24 pt-6">
        <div
          ref={cardsRef}
          className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-12"
        >
          {LEAD_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="lead-card rounded-[20px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF5812]/15 text-[#FF5812]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-sm font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {card.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
