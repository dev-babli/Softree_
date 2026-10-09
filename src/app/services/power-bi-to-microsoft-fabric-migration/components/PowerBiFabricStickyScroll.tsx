"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
// Import original CSS to preserve EXACT styling
import '@/app/services/ai-development-services/components/ReverseStickyScroll/ReverseStickyScroll.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const PowerBiFabricStickyScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    // Full-viewport pinning clips the card copy on phones. Stack the cards instead.
    if (window.matchMedia("(max-width: 767px)").matches) return;

    // Initialize Lenis scroll smoothing
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      // gsap.ticker time is in seconds, lenis expects milliseconds
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    // Grab all section elements inside our container
    const sections = gsap.utils.toArray<HTMLElement>('.rss_section');

    sections.forEach((section, i) => {
      const innerContainer = section.querySelector('.rss_container');
      if (!innerContainer) return;

      // 1. Entrance Rotation Animation (for sections after the first one)
      if (i > 0) {
        const startRotation = typeof window !== 'undefined' && window.innerWidth < 768 ? 14 : 25;
        gsap.set(innerContainer, {
          rotation: startRotation,
          transformOrigin: 'bottom left',
        });

        gsap.to(innerContainer, {
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top 25%',
            scrub: true,
          },
        });

        // Keep previous card fully visible & interactive while the new card is entering.
        // Only subtly scale/dim as the new card actually takes over the upper viewport.
        const prevContainer = sections[i - 1]?.querySelector('.rss_container');
        if (prevContainer) {
          gsap.to(prevContainer, {
            scale: 0.96,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 35%',
              end: 'top top',
              scrub: true,
            },
          });
        }
      }

      // 2. Sticky Pinning Animation (for sections before the last one)
      if (i < sections.length - 1) {
        ScrollTrigger.create({
          trigger: section,
          start: 'bottom bottom',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
        });
      }
    });

    // Cleanup function
    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <>
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
          .rss_wrap .rss_big {
            font-size: clamp(1.7rem, 8vw, 2.35rem);
            line-height: 1.08;
            overflow-wrap: anywhere;
          }
          .rss_wrap .rss_tag { overflow-wrap: anywhere; }
          .rss_wrap .rss_hr { margin: 0.7rem 0; }
          .rss_wrap .rss_sub { font-size: 0.95rem; line-height: 1.55; }
        }
      `}</style>
      <div className="w-full max-w-[1340px] mx-auto px-4 mt-12 md:mt-16 mb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            WHAT WE BUILD
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          Power BI to Microsoft Fabric <br />
          <span className="text-[#FF6B2C]">Migration Solutions</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Modernize your Power BI environment with structured Microsoft Fabric migration solutions covering assessment, workload migration, data engineering, analytics, security, validation, and optimization.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "MIGRATION ASSESSMENT",
            title: "Power BI Migration Assessment",
            titleSplit: "Power BI<br />Migration Assessment",
            desc: "Assess your existing Power BI environment to identify workloads, dependencies, compatibility considerations, and modernization opportunities before migration.",
            points: ["Assess Power BI reports, datasets, semantic models, and integrations", "Identify workloads to migrate, refactor, replace, or retire"],
            bg: "#C94716",
            text: "#ffffff"
          },
          {
            num: "02",
            tag: "MIGRATION ARCHITECTURE",
            title: "Microsoft Fabric Migration Architecture",
            titleSplit: "Microsoft Fabric<br />Migration Architecture",
            desc: "Design a practical migration architecture for moving Power BI workloads into Microsoft Fabric while aligning data, analytics, security, and integration requirements.",
            points: ["Define the target Fabric architecture, workloads, and migration approach", "Plan OneLake, data integration, security, governance, and deployment requirements"],
            bg: "#111111",
            text: "#f5f5f5"
          },
          {
            num: "03",
            tag: "DATA & PIPELINE MIGRATION",
            title: "Power BI Data & Pipeline Migration",
            titleSplit: "Power BI Data &<br />Pipeline Migration",
            desc: "Migrate and modernize Power BI data workloads and pipelines for Microsoft Fabric, with attention to dependencies, orchestration, and data reliability.",
            points: ["Migrate data flows, datasets, and supported data workloads", "Modernize data movement and integration for the Fabric environment"],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "04",
            tag: "DATASET & SEMANTIC MODEL MODERNIZATION",
            title: "Power BI Semantic Model Modernization",
            titleSplit: "Power BI Semantic<br />Model Modernization",
            desc: "Modernize compatible Power BI datasets for Microsoft Fabric while identifying models that require refactoring or redesign for DirectLake.",
            points: ["Assess and refactor datasets and Power BI workloads", "Optimize workloads for Fabric capabilities, performance, and maintainability"],
            bg: "#FF6B00",
            text: "#ffffff"
          },
          {
            num: "05",
            tag: "REPORT & ANALYTICS MIGRATION",
            title: "Power BI Report Modernization",
            titleSplit: "Power BI Report<br />Modernization",
            desc: "Align existing Power BI reports, dashboards, semantic models, and analytics workloads with the Microsoft Fabric environment.",
            points: ["Assess reports, datasets, semantic models, and existing data dependencies", "Connect Fabric data workloads with Power BI for unified analytics"],
            bg: "#18181b",
            text: "#f5f5f5"
          },
          {
            num: "06",
            tag: "SECURITY & GOVERNANCE",
            title: "Microsoft Fabric Security & Governance",
            titleSplit: "Microsoft Fabric<br />Security & Governance",
            desc: "Establish secure access, permissions, governance, and data protection requirements throughout the Power BI-to-Fabric migration.",
            points: ["Map users, roles, permissions, authentication, and data access requirements", "Apply governance and security controls across the modernized Fabric environment"],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "07",
            tag: "VALIDATION & OPTIMIZATION",
            title: "Fabric Migration Validation & Optimization",
            titleSplit: "Fabric Migration<br />Validation & Optimization",
            desc: "Validate migrated workloads, data quality, performance, integrations, and analytics before production deployment, then optimize the Fabric environment for ongoing use.",
            points: ["Validate data, workloads, integrations, security, and performance after migration", "Optimize the Microsoft Fabric environment for reliability, scalability, and analytics"],
            bg: "#C94716",
            text: "#ffffff"
          }
        ].map((card, idx) => (
          <section key={idx} className={`rss_section rss_s${idx + 1}`} style={{ zIndex: idx + 1 }}>
            <div className="rss_container flex flex-col items-start text-left" style={{ backgroundColor: card.bg, color: card.text }}>
              <p className="rss_tag">{card.num} — {card.tag}</p>
              <hr className="rss_hr w-full" />
              <div className="w-full text-left">
                <h2 className="rss_big text-left" dangerouslySetInnerHTML={{ __html: card.titleSplit }}></h2>
              </div>
              <hr className="rss_hr w-full" />
              <p className="rss_sub text-left">{card.desc}</p>

              <div className="mt-4 sm:mt-8 flex flex-col gap-3">
                {card.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3 text-sm md:text-base font-medium opacity-90">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: card.text }} />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};
