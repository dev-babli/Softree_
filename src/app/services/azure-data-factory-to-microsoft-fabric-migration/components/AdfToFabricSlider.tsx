"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import Link from "next/link";
// Reusing the CSS from ReverseStickyScroll since they share the same structure
import "@/app/services/ai-development-services/components/ReverseStickyScroll/ReverseStickyScroll.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AdfToFabricSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      let lenis: Lenis | null = null;

      if (!isMobile) {
        lenis = new Lenis();
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (time: number) => {
          lenis?.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }

      const sections = gsap.utils.toArray<HTMLElement>(".rss_section");

      sections.forEach((section, i) => {
        const innerContainer = section.querySelector(".rss_container");
        if (!innerContainer) return;

        if (i > 0 && !isMobile) {
          const startRotation = isMobile ? 8 : 20;
          gsap.set(innerContainer, {
            rotation: startRotation,
            transformOrigin: "bottom left",
          });

          gsap.to(innerContainer, {
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 25%",
              scrub: true,
            },
          });

          const prevContainer = sections[i - 1]?.querySelector(".rss_container");
          if (prevContainer) {
            gsap.to(prevContainer, {
              scale: 0.96,
              opacity: 0.25,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 35%",
                end: "top top",
                scrub: true,
              },
            });
          }
        }

        if (!isMobile && i < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          });
        }
      });

      return () => {
        lenis?.destroy();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <section className="w-full bg-white pt-12 sm:pt-20 md:pt-24 pb-12 md:pb-20 overflow-hidden font-sans">
      <style>{`
        @media (max-width: 767px) {
          .rss_wrap { padding: 0 0.75rem; }
          .rss_wrap .rss_section { min-height: 0; overflow: visible; }
          .rss_wrap .rss_container {
            min-height: 0;
            padding: 1.35rem 1.1rem 1.6rem;
            gap: 0.75rem;
            justify-content: flex-start;
          }
          .rss_wrap .rss_big { font-size: clamp(1.7rem, 8vw, 2.35rem); line-height: 1.08; }
          .rss_wrap .rss_hr { margin: 0.7rem 0; }
        }
      `}</style>
      <div className="w-full max-w-[1340px] mx-auto px-4 mb-8 flex flex-col items-center text-center">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            SOFTREE'S ADF TO MICROSOFT FABRIC MIGRATION APPROACH
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.12] mb-6">
          From Legacy Azure Data Factory <br className="hidden sm:block" />
          to <span className="text-[#FF6B2C]">Unified Microsoft Fabric</span>
        </h2>

        <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">


          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
            Softree executes a proven, automated approach to migrate Azure Data Factory pipelines, Synapse SQL, and Power BI models into Microsoft Fabric's unified OneLake architecture.
          </p>
        </div>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            title: "Migration Assessment",
            titleSplit: "Migration<br />Assessment",
            desc: "Evaluate existing ADF pipelines, ADLS Gen2 storage, and Synapse SQL pools. Analyze dependencies, assess SSIS packages, and calculate migration risk and capacity sizing.",
            points: [
              "Azure Data Factory pipeline assessment",
              "Synapse SQL and ADLS Gen2 readiness check"
            ],
            bg: "#C94716",
            text: "#ffffff",
          },
          {
            num: "02",
            title: "Fabric Architecture",
            titleSplit: "Fabric<br />Architecture",
            desc: "Design scalable Microsoft Fabric architectures using OneLake and DirectLake. Plan medallion architecture, configure workspaces, capacity sizing, and RBAC security.",
            points: [
              "Medallion architecture and OneLake design",
              "Microsoft Fabric workspace and capacity sizing"
            ],
            bg: "#111111",
            text: "#f5f5f5",
          },
          {
            num: "03",
            title: "Pipeline Conversion",
            titleSplit: "Pipeline<br />Conversion",
            desc: "Convert legacy ADF JSON definitions and SSIS packages into Fabric Data Pipelines and Dataflows Gen2 with automated incremental data load configuration.",
            points: [
              "ADF to Fabric Data Pipelines migration",
              "SSIS to Dataflows Gen2 conversion"
            ],
            bg: "#fcfbf9",
            text: "#111111",
          },
          {
            num: "04",
            title: "DirectLake Optimization",
            titleSplit: "DirectLake<br />Optimization",
            desc: "Upgrade legacy Power BI datasets to leverage OneLake and DirectLake mode. Optimize Delta Parquet formats and migrate DAX measures for high-performance semantic models.",
            points: [
              "Power BI semantic model modernization",
              "DirectLake mode and Delta Parquet optimization"
            ],
            bg: "#FF6B00",
            text: "#ffffff",
          },
          {
            num: "05",
            title: "Production Cutover",
            titleSplit: "Production<br />Cutover",
            desc: "Execute parallel runs, validate data parity, and deploy to production using Fabric Git integration and CI/CD pipelines for a zero-downtime cutover.",
            points: [
              "Zero-downtime analytics migration cutover",
              "Fabric Git integration and CI/CD pipelines"
            ],
            bg: "#18181b",
            text: "#f5f5f5",
          },
        ].map((card, idx) => (
          <section
            key={idx}
            className={`rss_section rss_s${idx + 1}`}
            style={{ zIndex: idx + 1 }}
          >
            <div
              className="rss_container flex flex-col items-start text-left"
              style={{ backgroundColor: card.bg, color: card.text }}
            >
              <p className="rss_tag">
                {card.num} — {card.title}
              </p>
              <hr className="rss_hr w-full" />
              <div className="w-full text-left">
                <h2
                  className="rss_big text-left"
                  dangerouslySetInnerHTML={{ __html: card.titleSplit }}
                ></h2>
              </div>
              <hr className="rss_hr w-full" />
              <p className="rss_sub text-left">{card.desc}</p>

              <div className="mt-auto pt-6 w-full text-left relative z-30">
                <ul className="space-y-2 opacity-90 font-medium">
                  {card.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm sm:text-base">
                      <span className="mt-1 flex-shrink-0 text-[#FF6B2C]">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
