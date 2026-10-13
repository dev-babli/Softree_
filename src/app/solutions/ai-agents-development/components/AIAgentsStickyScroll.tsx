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
          AI Agent Development Solutions for <br />
          <span className="text-[#FF6B2C]">Enterprise Automation</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Build custom AI agents through a structured development process covering strategy, architecture, agent engineering, enterprise knowledge integration, workflow automation, security, and deployment.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "AI AGENT STRATEGY & ARCHITECTURE",
            title: "AI Agent Strategy & Architecture",
            titleSplit: "AI Agent Strategy &<br />Architecture",
            desc: "Assess business workflows, identify suitable automation opportunities, and define the architecture, data requirements, integrations, and controls for your AI agent solution.",
            points: [
              "Identify high-value use cases and business requirements.",
              "Evaluate data readiness, system dependencies, and feasibility."
            ],
            bg: "#C94716",
            text: "#ffffff"
          },
          {
            num: "02",
            tag: "CUSTOM AI AGENT DEVELOPMENT",
            title: "Custom AI Agent Development",
            titleSplit: "Custom AI Agent<br />Development",
            desc: "Build AI agents that interpret requests, reason through tasks, use approved tools, and support multi-step business workflows using suitable language models and agent frameworks.",
            points: [
              "Develop agent logic, prompts, and tool-calling capabilities.",
              "Configure task handling and workflow orchestration."
            ],
            bg: "#111111",
            text: "#f5f5f5"
          },
          {
            num: "03",
            tag: "RAG & ENTERPRISE KNOWLEDGE",
            title: "RAG & Enterprise Knowledge Integration",
            titleSplit: "RAG & Enterprise<br />Knowledge Integration",
            desc: "Connect AI agents to relevant enterprise documents, databases, and knowledge bases to support context-aware responses grounded in approved information.",
            points: [
              "Integrate knowledge sources and retrieval pipelines.",
              "Validate source relevance and response grounding."
            ],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "04",
            tag: "TOOL CALLING & SYSTEM INTEGRATION",
            title: "Tool Calling & Enterprise Integration",
            titleSplit: "Tool Calling &<br />Enterprise Integration",
            desc: "Connect AI agents with APIs, databases, CRM, ERP, and other business applications so they can retrieve information and perform configured actions.",
            points: [
              "Integrate tools, APIs, and enterprise services.",
              "Configure permissions and workflow handoffs."
            ],
            bg: "#FF6B00",
            text: "#ffffff"
          },
          {
            num: "05",
            tag: "MEMORY & WORKFLOW ORCHESTRATION",
            title: "Memory & Workflow Orchestration",
            titleSplit: "Memory & Workflow<br />Orchestration",
            desc: "Design conversational context, task sequencing, and coordinated agent workflows to support continuity across interactions and multi-step processes.",
            points: [
              "Manage relevant context and state across tasks.",
              "Coordinate steps, tools, and agent handoffs where required."
            ],
            bg: "#18181b",
            text: "#f5f5f5"
          },
          {
            num: "06",
            tag: "SECURITY, TESTING & GOVERNANCE",
            title: "AI Agent Security & Validation",
            titleSplit: "AI Agent Security &<br />Validation",
            desc: "Evaluate agent behavior and apply appropriate security controls before deployment to help ensure agents operate within defined business permissions and requirements.",
            points: [
              "Test response quality, tool use, and failure handling.",
              "Apply access controls, monitoring, and human approval where needed."
            ],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "07",
            tag: "DEPLOYMENT & OPTIMIZATION",
            title: "AI Agent Deployment & Optimization",
            titleSplit: "AI Agent Deployment<br />& Optimization",
            desc: "Prepare AI agents for production use, monitor their operation, and refine workflows based on evaluation results, user feedback, and changing business needs.",
            points: [
              "Deploy and validate the solution in its target environment.",
              "Monitor performance and improve agent behavior over time."
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
