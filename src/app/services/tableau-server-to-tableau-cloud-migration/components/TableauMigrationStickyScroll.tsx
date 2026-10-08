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

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

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
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <>
      <div className="w-full max-w-[1340px] mx-auto px-4 mt-12 md:mt-16 mb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            WHAT WE MIGRATE
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          Migrate Your Tableau Server Workloads <br />
          <span className="text-[#FF6B2C]">to Tableau Cloud</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Softree helps organizations modernize Tableau Server workbooks, dashboards, data sources, users, and analytics through a structured Tableau Cloud migration approach.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "TABLEAU WORKBOOKS",
            titleSplit: "Tableau<br />Workbooks",
            desc: "Migrate and modernize Tableau workbooks while preserving dashboards, sheets, calculations, filters, and business logic.",
            points: ["Workbooks & dashboards", "Calculations & filters"],
            bg: "#C94716",
            text: "#ffffff"
          },
          {
            num: "02",
            tag: "DATA SOURCES",
            titleSplit: "Tableau<br />Data Sources",
            desc: "Migrate and validate Tableau data sources and connections to support reliable analytics on Tableau Cloud.",
            points: ["Published data sources", "Database connections"],
            bg: "#111111",
            text: "#f5f5f5"
          },
          {
            num: "03",
            tag: "DASHBOARDS & REPORTS",
            titleSplit: "Dashboards<br />& Reports",
            desc: "Transition business dashboards and reporting assets while validating visualizations, metrics, filters, and analytical functionality.",
            points: ["Interactive dashboards", "Reports & visualizations"],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "04",
            tag: "USERS & PERMISSIONS",
            titleSplit: "Users &<br />Permissions",
            desc: "Plan and configure users, groups, roles, permissions, and access controls for the Tableau Cloud environment.",
            points: ["Users, groups & roles", "Permissions & access controls"],
            bg: "#FF6B00",
            text: "#ffffff"
          },
          {
            num: "05",
            tag: "TABLEAU SERVER CONFIGURATION",
            titleSplit: "Server<br />Configuration",
            desc: "Assess Tableau Server configurations and dependencies to determine the appropriate approach for the Tableau Cloud environment.",
            points: ["Server settings & dependencies", "Migration configuration requirements"],
            bg: "#18181b",
            text: "#f5f5f5"
          },
          {
            num: "06",
            tag: "INTEGRATIONS & SCHEDULES",
            titleSplit: "Integrations<br />& Schedules",
            desc: "Modernize connected systems, refresh schedules, subscriptions, and data workflows as part of the Tableau Cloud migration.",
            points: ["Refresh schedules & subscriptions", "Data integrations & workflows"],
            bg: "#f0ece1",
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
