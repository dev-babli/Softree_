"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import Link from 'next/link';
import { typography } from "@/lib/typography";
// Import original CSS to preserve EXACT styling
import '@/app/services/ai-development-services/components/ReverseStickyScroll/ReverseStickyScroll.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const FabricStickyScroll = () => {
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
          <span className={`${typography.caption.default} text-[#FF6B2C] uppercase`}>
            WHAT WE BUILD
          </span>
        </div>

        <h2 className={`${typography.heading.h2} text-slate-900 mb-4`}>
          Power BI Solutions Built <br />
          <span className="text-[#FF6B2C]">for Modern Analytics</span>
        </h2>

        <p className={`${typography.description.default} text-slate-500 max-w-2xl`}>
          Softree's Power BI team supports the complete analytics lifecycle, from data preparation and modeling to dashboard development and reporting.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            title: "Power BI Dashboard Development",
            titleSplit: "Dashboard<br/>Development",
            desc: "Create custom, highly interactive Power BI dashboards designed around your core business KPIs and executive reporting requirements. We deliver real-time data visualization solutions that transform complex datasets into intuitive, accessible dashboards for faster, data-driven decision-making across your organization.",
            points: ["Interactive Data Visualization", "Real-Time KPI Tracking"],
            bg: "#C94716", text: "#ffffff"
          },
          {
            num: "02",
            title: "Power BI Report Development",
            titleSplit: "Report<br/>Development",
            desc: "Build comprehensive, detailed Power BI reports utilizing interactive visualizations, advanced filtering, and deep drill-down capabilities. Our reporting solutions are engineered to provide granular business insights, operational visibility, and automated paginated reporting tailored to your specific analytical workflows.",
            points: ["Advanced Drill-Down Analysis", "Automated Paginated Reporting"],
            bg: "#111111", text: "#f5f5f5"
          },
          {
            num: "03",
            title: "Power BI Data Modeling",
            titleSplit: "Data<br/>Modeling",
            desc: "Design robust, scalable semantic data models (Star Schema) in Power BI that support highly accurate and efficient enterprise reporting. We architect optimized datasets and relationships to ensure high-performance querying, single version of truth, and seamless self-service BI for business analysts.",
            points: ["Optimized Star Schema Design", "Enterprise Semantic Models"],
            bg: "#fcfbf9", text: "#111111"
          },
          {
            num: "04",
            title: "Power Query & Data Transformation",
            titleSplit: "Data<br/>Transformation",
            desc: "Clean, consolidate, and transform complex raw data from disparate sources using advanced Power Query (M language) techniques. We build reliable, automated ETL pipelines within Power BI to ensure data quality, consistency, and readiness for advanced analytics.",
            points: ["Advanced Data Cleansing", "Automated ETL Pipelines"],
            bg: "#FF6B00", text: "#ffffff"
          },
          {
            num: "05",
            title: "DAX Development",
            titleSplit: "DAX<br/>Development",
            desc: "Develop advanced business logic, complex measures, calculated columns, and precise analytical calculations using Data Analysis Expressions (DAX). We optimize DAX performance to handle large datasets, enabling sophisticated time-intelligence, dynamic KPIs, and custom business rules.",
            points: ["Complex Measure Calculations", "Time-Intelligence Analytics"],
            bg: "#C94716", text: "#ffffff"
          },
          {
            num: "06",
            title: "Power BI Integration",
            titleSplit: "System<br/>Integration",
            desc: "Seamlessly integrate Power BI with a wide ecosystem of databases, cloud services, CRM/ERP applications, and enterprise systems (Azure, SQL, Salesforce, Dynamics 365). We ensure secure, real-time data connectivity through API integration and optimized data gateways.",
            points: ["Enterprise Systems Integration", "Secure Data Gateways"],
            bg: "#111111", text: "#f5f5f5"
          },
          {
            num: "07",
            title: "Power BI Migration",
            titleSplit: "Platform<br/>Migration",
            desc: "Modernize your analytics infrastructure by securely migrating legacy reporting environments (Tableau, Qlik, SSRS, Excel) to Microsoft Power BI. We ensure a seamless transition of historical data, replication of critical reporting workflows, and user adoption strategies to maximize your new BI investment.",
            points: ["Legacy BI Modernization", "Secure Data Migration"],
            bg: "#fcfbf9", text: "#111111"
          },
          {
            num: "08",
            title: "Power BI Support & Optimization",
            titleSplit: "Support &<br/>Optimization",
            desc: "Provide ongoing administration, health checks, and performance optimization for your existing Power BI reports, dashboards, and semantic models. We resolve slow rendering times, optimize DAX queries, manage workspace governance, and implement Row-Level Security (RLS) to keep your analytics environment secure and blazing fast.",
            points: ["Dashboard Performance Tuning", "Governance & Security (RLS)"],
            bg: "#FF6B00", text: "#ffffff"
          }
        ].map((card, idx) => (
          <section key={idx} className={`rss_section rss_s${idx + 1}`} style={{ zIndex: idx + 1 }}>
            <div className="rss_container flex flex-col items-start text-left" style={{ backgroundColor: card.bg, color: card.text }}>
              <p className="rss_tag">{card.num} — {card.title}</p>
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
