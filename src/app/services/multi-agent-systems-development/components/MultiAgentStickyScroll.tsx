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

export const AIAgentsStickyScroll = () => {
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
          Multi-Agent AI Development Solutions for <br />
          <span className="text-[#FF6B2C]">Coordinated Workflows</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Build coordinated multi-agent systems from architecture and orchestration to integrations and governance—backed by offshore and white-label AI engineering.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "MULTI-AGENT STRATEGY & ARCHITECTURE",
            title: "Multi-Agent Strategy & Architecture",
            titleSplit: "Multi-Agent Strategy &<br />Architecture",
            desc: "Assess business workflows, identify suitable multi-agent automation opportunities, and define the architecture, agent responsibilities, integrations, and governance requirements for your solution.",
            points: [
              "Identify high-value use cases and define business requirements.",
              "Evaluate data readiness, system dependencies, and technical feasibility."
            ],
            bg: "#C94716",
            text: "#ffffff"
          },
          {
            num: "02",
            tag: "AGENT DESIGN & ORCHESTRATION",
            title: "Multi-Agent System Design & Orchestration",
            titleSplit: "Multi-Agent System Design<br />& Orchestration",
            desc: "Design how specialized AI agents collaborate, exchange information, delegate tasks, and coordinate decisions to complete complex business workflows.",
            points: [
              "Define agent roles, communication patterns, task routing, and handoffs.",
              "Select suitable orchestration frameworks and coordination strategies."
            ],
            bg: "#111111",
            text: "#f5f5f5"
          },
          {
            num: "03",
            tag: "CUSTOM AI AGENT DEVELOPMENT",
            title: "Custom AI Agent Development",
            titleSplit: "Custom AI Agent<br />Development",
            desc: "Build specialized AI agents using suitable language models, instructions, tools, and business logic to perform defined tasks within a coordinated multi-agent system.",
            points: [
              "Develop task-specific agents with clearly defined responsibilities.",
              "Implement reasoning workflows, tool calling, and structured outputs."
            ],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "04",
            tag: "SHARED MEMORY & KNOWLEDGE INTEGRATION",
            title: "Shared Memory & Enterprise Knowledge",
            titleSplit: "Shared Memory &<br />Enterprise Knowledge",
            desc: "Connect agents with relevant business knowledge and shared context to support information retrieval, continuity across tasks, and coordinated execution.",
            points: [
              "Integrate enterprise documents, knowledge bases, and RAG pipelines.",
              "Configure context management and memory according to workflow requirements."
            ],
            bg: "#FF6B00",
            text: "#ffffff"
          },
          {
            num: "05",
            tag: "ENTERPRISE TOOLS & API INTEGRATION",
            title: "Enterprise Integration & Workflow Automation",
            titleSplit: "Enterprise Integration &<br />Workflow Automation",
            desc: "Connect multi-agent systems with existing applications, APIs, databases, and business tools so agents can retrieve information and execute authorized workflow actions.",
            points: [
              "Integrate CRM, ERP, databases, and other supported enterprise systems.",
              "Configure tool access, workflow triggers, and inter-system communication."
            ],
            bg: "#18181b",
            text: "#f5f5f5"
          },
          {
            num: "06",
            tag: "TESTING, SECURITY & GOVERNANCE",
            title: "Multi-Agent Testing & Governance",
            titleSplit: "Multi-Agent Testing<br />& Governance",
            desc: "Validate agent collaboration, workflow accuracy, system integrations, and access controls before deployment to help ensure the solution behaves as intended.",
            points: [
              "Test agent handoffs, response quality, failure handling, and workflow execution.",
              "Implement access controls, monitoring, evaluation, and human approval where required."
            ],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "07",
            tag: "DEPLOYMENT & CONTINUOUS OPTIMIZATION",
            title: "Production Deployment & Optimization",
            titleSplit: "Production Deployment<br />& Optimization",
            desc: "Prepare multi-agent solutions for production with deployment support, operational monitoring, and iterative improvements aligned with business and technical requirements.",
            points: [
              "Support deployment, observability, and troubleshooting across the solution.",
              "Refine agent workflows using evaluation findings and operational feedback."
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

export default AIAgentsStickyScroll;
