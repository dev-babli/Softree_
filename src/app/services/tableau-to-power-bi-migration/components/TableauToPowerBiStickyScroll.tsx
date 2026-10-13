"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import '@/app/services/ai-development-services/components/ReverseStickyScroll/ReverseStickyScroll.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const TableauToPowerBiStickyScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    const sections = gsap.utils.toArray<HTMLElement>('.rss_section');

    sections.forEach((section, i) => {
      const innerContainer = section.querySelector('.rss_container');
      if (!innerContainer) return;

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
          Tableau to Power BI <br />
          <span className="text-[#FF6B2C]">Migration Solutions</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Modernize your Tableau environment with structured Power BI migration solutions covering audit, semantic model architecture, DAX translation, dashboard redesign, security, validation, and training.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "WORKBOOK & DATA AUDIT",
            title: "Tableau Inventory & Complexity Assessment",
            titleSplit: "Tableau Inventory &<br />Complexity Assessment",
            desc: "Audit Tableau Server/Cloud workbooks, worksheets, dashboards, published data sources (.hyper, SQL, live), and custom SQL queries to establish migration roadmap and effort.",
            points: ["Categorize workbooks by business impact, complexity, and usage frequency", "Catalog calculated fields, LOD expressions, parameters, and custom SQL"],
            bg: "#C94716",
            text: "#ffffff"
          },
          {
            num: "02",
            tag: "SEMANTIC MODELING",
            title: "Power BI Semantic Model Architecture",
            titleSplit: "Power BI Semantic<br />Model Architecture",
            desc: "Architect star-schema data models in Power BI to consolidate redundant Tableau data extracts into reusable, high-performance central semantic models.",
            points: ["Design star-schema dimensions, facts, relationships, and hierarchies", "Configure Power Query (M) transformations for automated data preparation"],
            bg: "#111111",
            text: "#f5f5f5"
          },
          {
            num: "03",
            tag: "DAX CALCULATION CONVERSION",
            title: "Tableau Calculation & LOD Translation to DAX",
            titleSplit: "Tableau Calculation &<br />LOD Translation to DAX",
            desc: "Re-engineer Tableau calculated fields, table calculations, and Level of Detail (LOD) expressions into clean, performant Power BI DAX measures.",
            points: ["Translate FIXED, INCLUDE, and EXCLUDE LOD expressions into CALCULATE & FILTER logic", "Optimize DAX measures for fast visual rendering and VertiPaq compression"],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "04",
            tag: "REPORT & DASHBOARD REDESIGN",
            title: "Dashboard & Visual Conversion",
            titleSplit: "Dashboard & Visual<br />Conversion to Power BI",
            desc: "Replicate and refine Tableau visual layouts into interactive Power BI reports utilizing native visuals, bookmarks, drill-throughs, and field parameters.",
            points: ["Rebuild Tableau dashboards with pixel-perfect visual fidelity and mobile layouts", "Implement drill-through pages, tooltips, bookmarks, and dynamic slicers"],
            bg: "#FF6B00",
            text: "#ffffff"
          },
          {
            num: "05",
            tag: "DATA SOURCE & GATEWAY INTEGRATION",
            title: "Data Source & Gateway Integration",
            titleSplit: "Data Source &<br />Gateway Integration",
            desc: "Connect Power BI to your cloud data sources (Snowflake, Databricks, SQL Server, Azure) via Import mode, DirectQuery, or Direct Lake.",
            points: ["Configure On-Premises Data Gateways and cloud connector security", "Set up scheduled refreshes, incremental refresh policies, and query caching"],
            bg: "#18181b",
            text: "#f5f5f5"
          },
          {
            num: "06",
            tag: "SECURITY & GOVERNANCE",
            title: "Row-Level Security (RLS) & Governance",
            titleSplit: "Row-Level Security (RLS)<br />& Governance Mapping",
            desc: "Translate Tableau user filters, entitlement tables, and group permissions into Power BI RLS and Object-Level Security (OLS) rules.",
            points: ["Map Tableau user filters to dynamic DAX USERPRINCIPALNAME() rules", "Integrate with Entra ID security groups and Microsoft Purview data governance"],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "07",
            tag: "VALIDATION & USER ADOPTION",
            title: "Parallel Testing, Validation & Training",
            titleSplit: "Parallel Testing,<br />Validation & Training",
            desc: "Conduct side-by-side metric verification between Tableau and Power BI reports, validate data accuracy, execute UAT, and train end business users.",
            points: ["Run side-by-side data verification to guarantee zero metric discrepancies", "Provide user training, administrator documentation, and Tableau decommission support"],
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
