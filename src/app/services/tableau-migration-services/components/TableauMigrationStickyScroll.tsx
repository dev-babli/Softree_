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

export const TableauMigrationStickyScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

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
      <div className="w-full max-w-[1340px] mx-auto px-4 mt-12 md:mt-16 mb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            WHAT WE BUILD
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          Tableau Migration Solutions for <br />
          <span className="text-[#FF6B2C]">Modern Analytics</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Modernize your Tableau environment with structured migration solutions covering assessment, migration planning, workbooks and dashboard migration, data connectivity, security, validation, and performance optimization.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "MIGRATION ASSESSMENT",
            title: "Tableau Migration Assessment",
            titleSplit: "Tableau Migration<br />Assessment",
            desc: "Assess your existing Tableau environment to understand workloads, dependencies, compatibility considerations, data sources, users, permissions, and migration requirements before moving to the target platform.",
            points: ["Assess Tableau Server, workbooks, dashboards, data sources, extracts, and integrations", "Identify workloads to migrate, modernize, refactor, or retire"],
            bg: "#C94716",
            text: "#ffffff"
          },
          {
            num: "02",
            tag: "MIGRATION PLANNING",
            title: "Tableau Migration Strategy & Planning",
            titleSplit: "Tableau Migration<br />Strategy & Planning",
            desc: "Define a practical Tableau migration strategy based on your existing environment, business requirements, target platform, dependencies, security needs, and expected analytics outcomes.",
            points: ["Define migration waves, priorities, dependencies, and validation requirements", "Plan the target Tableau Cloud, Tableau Server, Power BI, or modern analytics environment"],
            bg: "#111111",
            text: "#f5f5f5"
          },
          {
            num: "03",
            tag: "WORKBOOK & DASHBOARD MIGRATION",
            title: "Tableau Workbook & Dashboard Migration",
            titleSplit: "Tableau Workbook &<br />Dashboard Migration",
            desc: "Migrate and modernize Tableau workbooks, dashboards, reports, and related analytics content while preserving business logic, reporting requirements, and user experience.",
            points: ["Migrate workbooks, dashboards, calculated fields, filters, and reporting logic", "Validate dashboard functionality, usability, and business-critical reporting after migration"],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "04",
            tag: "DATA & CONNECTIVITY MIGRATION",
            title: "Tableau Data Source & Connectivity Migration",
            titleSplit: "Tableau Data Source &<br />Connectivity Migration",
            desc: "Modernize Tableau data sources, extracts, connections, and integrations to establish reliable connectivity between your analytics workloads and the target data environment.",
            points: ["Migrate and validate published data sources, extracts, and database connections", "Address connectivity, dependencies, refresh requirements, and integration considerations"],
            bg: "#FF6B00",
            text: "#ffffff"
          },
          {
            num: "05",
            tag: "SECURITY & GOVERNANCE",
            title: "Tableau Security, Users & Permissions",
            titleSplit: "Tableau Security,<br />Users & Permissions",
            desc: "Maintain secure access throughout migration by addressing Tableau users, groups, projects, permissions, authentication, and governance requirements in the target environment.",
            points: ["Review users, groups, roles, permissions, projects, and access requirements", "Validate authentication, security controls, and data access after migration"],
            bg: "#18181b",
            text: "#f5f5f5"
          },
          {
            num: "06",
            tag: "VALIDATION & OPTIMIZATION",
            title: "Tableau Migration Validation & Optimization",
            titleSplit: "Tableau Migration<br />Validation & Optimization",
            desc: "Validate migrated Tableau workloads, data, dashboards, connectivity, security, and performance before production cutover, then optimize the environment for reliable analytics.",
            points: ["Validate data accuracy, dashboard functionality, refreshes, permissions, and integrations", "Optimize migrated workloads for performance, reliability, and scalable analytics"],
            bg: "#fcfbf9",
            text: "#111111"
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

              <div className="mt-8 flex flex-col gap-3">
                {card.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-3 text-sm md:text-base font-medium opacity-90">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: card.text }} />
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
