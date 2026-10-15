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

export const GenerativeAiStickyScroll = () => {
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
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 pt-10 md:pt-14 lg:pt-16 pb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            WHAT WE BUILD
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          Generative AI Development Solutions for <br />
          <span className="text-[#FF6B2C]">Intelligent Business Workflows</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Build custom Generative AI solutions spanning LLM application development, RAG architecture, enterprise integrations, testing, and deployment—backed by Softree’s offshore and white-label AI engineering services.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "GENERATIVE AI STRATEGY & DISCOVERY",
            title: "Identify High-Value Generative AI Opportunities",
            titleSplit: "Identify High-Value<br />Generative AI Opportunities",
            desc: "Assess business workflows, identify suitable Generative AI use cases, and define the technical requirements for your solution.",
            points: [
              "Identify high-value use cases and define business requirements.",
              "Evaluate data readiness, system dependencies, and technical feasibility."
            ],
            bg: "#C94716",
            text: "#ffffff"
          },
          {
            num: "02",
            tag: "LLM SOLUTION ARCHITECTURE",
            title: "Design the Generative AI Solution Architecture",
            titleSplit: "Design the Generative AI<br />Solution Architecture",
            desc: "Design an architecture that connects suitable language models, enterprise data, application components, and business workflows.",
            points: [
              "Select appropriate LLMs, integration patterns, and deployment options.",
              "Define data flows, security requirements, and solution architecture."
            ],
            bg: "#111111",
            text: "#f5f5f5"
          },
          {
            num: "03",
            tag: "CUSTOM LLM APPLICATION DEVELOPMENT",
            title: "Build Custom Generative AI Applications",
            titleSplit: "Build Custom Generative AI<br />Applications",
            desc: "Develop LLM-powered applications tailored to business requirements, product capabilities, and user needs.",
            points: [
              "Implement prompt engineering, structured outputs, and application logic.",
              "Build AI-powered features for content generation, summarization, and information processing."
            ],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "04",
            tag: "RAG & ENTERPRISE KNOWLEDGE INTEGRATION",
            title: "Connect AI Models with Business Knowledge",
            titleSplit: "Connect AI Models with<br />Business Knowledge",
            desc: "Build retrieval-augmented generation solutions that use relevant enterprise information to provide context-aware responses.",
            points: [
              "Integrate documents, knowledge bases, embeddings, and retrieval pipelines.",
              "Connect LLMs with relevant business data to support grounded responses."
            ],
            bg: "#FF6B00",
            text: "#ffffff"
          },
          {
            num: "05",
            tag: "ENTERPRISE INTEGRATION & WORKFLOW AUTOMATION",
            title: "Connect Generative AI with Business Systems",
            titleSplit: "Connect Generative AI with<br />Business Systems",
            desc: "Integrate AI applications with existing APIs, databases, enterprise platforms, and workflow automation tools.",
            points: [
              "Connect CRM, ERP, document repositories, and business applications.",
              "Implement approved tool access, workflow triggers, and data exchange."
            ],
            bg: "#18181b",
            text: "#f5f5f5"
          },
          {
            num: "06",
            tag: "AI TESTING, SECURITY & GOVERNANCE",
            title: "Validate AI Quality, Security, and Reliability",
            titleSplit: "Validate AI Quality,<br />Security, and Reliability",
            desc: "Evaluate application behavior, response quality, data access, and integration reliability before production release.",
            points: [
              "Test response accuracy, retrieval quality, and failure handling.",
              "Implement access controls, monitoring, and human approval where required."
            ],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "07",
            tag: "DEPLOYMENT, MONITORING & OPTIMIZATION",
            title: "Deploy and Improve Generative AI Solutions",
            titleSplit: "Deploy and Improve<br />Generative AI Solutions",
            desc: "Deploy Generative AI applications into suitable environments and improve their performance through ongoing evaluation and monitoring.",
            points: [
              "Configure production deployment, observability, and performance tracking.",
              "Optimize prompts, retrieval, integrations, and resource usage based on evaluation results."
            ],
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

export default GenerativeAiStickyScroll;
