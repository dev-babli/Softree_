"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import Link from 'next/link';
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
            title: "Agentic AI",
            titleSplit: "Agentic AI",
            desc: "Provide AI agents with governed access to enterprise data and business context, enabling them to retrieve relevant information and support intelligent business workflows.",
            bg: "#C94716", text: "#ffffff",
            link: "/services/ai-development-services"
          },
          {
            num: "02",
            title: "Generative AI",
            titleSplit: "Generative AI",
            desc: "Prepare enterprise data for RAG and knowledge-based AI applications with structured, accessible, and governed data foundations that support reliable AI experiences.",
            bg: "#111111", text: "#f5f5f5",
            link: "/services/generative-ai"
          },
          {
            num: "03",
            title: "AI Automation",
            titleSplit: "AI Automation",
            desc: "Connect enterprise data with intelligent workflows and automation, helping AI-powered processes access the information they need to execute business tasks efficiently.",
            bg: "#fcfbf9", text: "#111111",
            link: "/solutions/ai-workflow-automation"
          },
          {
            num: "04",
            title: "Enterprise Analytics",
            titleSplit: "Enterprise Analytics",
            desc: "Bring BI, analytics, and AI workloads together on a unified data foundation, enabling teams to work with trusted data for reporting, insights, and intelligent decision-making.",
            bg: "#FF6B00", text: "#ffffff",
            link: "/services/offshore-data-analytics"
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

              <div className="rss_btn_wrap mt-auto pt-10 flex justify-start w-full relative z-30 pointer-events-auto">
                <Link
                  href={card.link}
                  prefetch={true}
                  className="typo-button-lg inline-flex items-center gap-2 px-8 py-3.5 border rounded-full transition-all duration-300 hover:opacity-75 hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto select-auto"
                  style={{ borderColor: card.text, color: card.text }}
                >
                  Learn More <span className="text-lg leading-none">↗</span>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};
