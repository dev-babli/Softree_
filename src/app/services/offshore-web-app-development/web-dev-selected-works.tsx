"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEB_DEV_VISUALS } from "./web-dev-visuals";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function WebDevSelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current || prefersReducedMotion()) return;

      const track = trackRef.current;
      const getScroll = () => track.scrollWidth - window.innerWidth + 80;

      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-section="web-dev-works"
      className="relative overflow-hidden bg-[#0a0a0a] text-white"
      aria-labelledby="web-dev-works-heading"
    >
      <div className="flex h-[100svh] flex-col justify-center">
        <div
          ref={headerRef}
          className="mx-auto mb-10 flex w-full max-w-[1400px] flex-col gap-4 px-4 sm:px-6 md:mb-14 md:flex-row md:items-end md:justify-between lg:px-12"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FF5812]">
              Selected builds
            </p>
            <h2
              id="web-dev-works-heading"
              className="mt-3 font-semibold tracking-[-0.04em]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", lineHeight: 0.95 }}
            >
              Web applications
              <span className="block text-white/45">2024 — 2026</span>
            </h2>
          </div>
          <Link
            href="/case-studies/web"
            className="inline-flex w-max items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md transition hover:border-white/30 hover:text-white"
          >
            All case studies
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-4 sm:gap-6 sm:px-6 lg:px-12"
          >
            {WEB_DEV_VISUALS.works.map((work) => (
              <Link
                key={work.title}
                href="/case-studies/web"
                className="group relative w-[min(78vw,420px)] shrink-0 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={work.src}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="420px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                      {work.year}
                    </p>
                    <p
                      className="mt-2 font-semibold tracking-[-0.03em] text-white"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                    >
                      {work.title}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF5812] opacity-0 transition group-hover:opacity-100">
                      View project
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
