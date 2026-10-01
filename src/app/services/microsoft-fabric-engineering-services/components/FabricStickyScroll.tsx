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
          <span className="typo-caption text-[#FF6B2C] uppercase">
            WHAT WE BUILD
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          Build an Fabric <br />
          <span className="text-[#FF6B2C]">AI-Ready Data Foundation</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          AI initiatives depend on accessible, governed, high-quality enterprise data. Softree combines Microsoft Fabric with our AI engineering capabilities to help organizations prepare data platforms for AI, analytics, automation & applications.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "MICROSOFT FABRIC DATA ENGINEERING",
            title: "Microsoft Fabric Data Engineering",
            titleSplit: "Fabric Data<br />Engineering",
            desc: "Build scalable Microsoft Fabric data engineering solutions using OneLake, Lakehouse, Data Factory, pipelines, and Spark. We design reliable data platforms that bring enterprise data together for analytics, reporting, and AI-ready workloads.",
            points: ["OneLake Data Integration", "Lakehouse & Data Pipelines"],
            bg: "#C94716",
            text: "#ffffff"
          },
          {
            num: "02",
            tag: "MICROSOFT FABRIC DATA ANALYTICS",
            title: "Microsoft Fabric Data Analytics",
            titleSplit: "Fabric Data<br />Analytics",
            desc: "Build unified data analytics solutions with Microsoft Fabric, connecting enterprise data across Lakehouse, Warehouse, semantic models, and Power BI. We help organizations turn complex data into trusted insights for faster, data-driven decision-making.",
            points: ["Enterprise Data Analytics", "Power BI & Semantic Models"],
            bg: "#111111",
            text: "#f5f5f5"
          },
          {
            num: "03",
            tag: "MICROSOFT FABRIC DATA WAREHOUSE",
            title: "Microsoft Fabric Data Warehouse",
            titleSplit: "Fabric Data<br />Warehouse",
            desc: "Build modern cloud data warehouses with Microsoft Fabric to centralize enterprise data and support scalable analytics, reporting, and business intelligence. We develop structured data solutions designed for performance, governance, and reliable business reporting.",
            points: ["Fabric Data Warehouse", "Enterprise Data Modeling"],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "04",
            tag: "MICROSOFT FABRIC REAL-TIME INTELLIGENCE",
            title: "Microsoft Fabric Real-Time Intelligence",
            titleSplit: "Real-Time<br />Intelligence",
            desc: "Build real-time data solutions with Microsoft Fabric to monitor events, analyze streaming data, and support faster operational decisions. We connect real-time data sources with analytics and business intelligence workflows for actionable insights.",
            points: ["Real-Time Data Analytics", "Event & Streaming Intelligence"],
            bg: "#FF6B00",
            text: "#ffffff"
          },
          {
            num: "05",
            tag: "MICROSOFT FABRIC AI-READY DATA",
            title: "Microsoft Fabric AI-Ready Data",
            titleSplit: "AI-Ready<br />Data",
            desc: "Prepare enterprise data for AI applications with Microsoft Fabric by creating governed, accessible, and reliable data foundations. We connect Fabric data environments with AI, RAG, automation, and intelligent applications.",
            points: ["AI-Ready Data Foundations", "RAG & Enterprise AI"],
            bg: "#18181b",
            text: "#f5f5f5"
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
