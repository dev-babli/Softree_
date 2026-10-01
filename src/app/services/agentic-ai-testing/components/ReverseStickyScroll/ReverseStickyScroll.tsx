"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

import './ReverseStickyScroll.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ReverseStickyScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Use GSAP ScrollTrigger safely without duplicating full page RAF
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    let lenis: Lenis | null = null;

    if (!isMobile) {
      lenis = new Lenis();
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    // Grab all section elements inside our container
    const sections = gsap.utils.toArray<HTMLElement>('.rss_section');

    sections.forEach((section, i) => {
      const innerContainer = section.querySelector('.rss_container');
      if (!innerContainer) return;

      // 1. Entrance Rotation Animation (for sections after the first one)
      if (i > 0) {
        const startRotation = isMobile ? 8 : 20;
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
      lenis?.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="rss_wrap">
      {[
        {
          num: "01",
          title: "AI AGENT TESTING",
          titleSplit: "AI Agent<br />Testing",
          desc: "Validate AI agents across reasoning, planning, decision-making, task execution, memory, and autonomous workflows to ensure reliable behavior in real-world scenarios.",
          features: ["Agent Behavior Validation", "Autonomous Task Testing", "Decision & Reasoning Evaluation", "Goal Completion Testing"],
          bg: "#C94716",
          text: "#ffffff",
        },
        {
          num: "02",
          title: "LLM & GENERATIVE AI TESTING",
          titleSplit: "LLM & Generative<br />AI Testing",
          desc: "Evaluate LLM-powered applications for response accuracy, relevance, consistency, hallucinations, safety, and performance across real-world user interactions.",
          features: ["LLM Response Evaluation", "Hallucination Detection", "Prompt & Output Testing", "AI Response Quality"],
          bg: "#111111",
          text: "#f5f5f5",
        },
        {
          num: "03",
          title: "RAG & AI KNOWLEDGE TESTING",
          titleSplit: "RAG & AI<br />Knowledge Testing",
          desc: "Test retrieval-augmented generation systems to validate knowledge retrieval, contextual grounding, source relevance, and the accuracy of AI-generated responses.",
          features: ["Retrieval Accuracy", "Context & Grounding Validation", "Knowledge Base Testing", "Source Relevance"],
          bg: "#fcfbf9",
          text: "#111111",
        },
        {
          num: "04",
          title: "AI AGENT SECURITY TESTING",
          titleSplit: "AI Agent<br />Security Testing",
          desc: "Identify security risks across AI agents, LLM applications, prompts, tools, integrations, and data flows to protect intelligent systems from misuse and unauthorized actions.",
          features: ["Prompt Injection Testing", "Data Leakage Testing", "AI Guardrail Validation", "Tool & Access Control Testing"],
          bg: "#FF6B00",
          text: "#ffffff",
        },
        {
          num: "05",
          title: "MULTI-AGENT & WORKFLOW TESTING",
          titleSplit: "Multi-Agent &<br />Workflow Testing",
          desc: "Validate interactions between multiple AI agents, business applications, APIs, and enterprise systems to ensure reliable coordination and end-to-end workflow execution.",
          features: ["Multi-Agent Coordination", "Agent-to-Agent Testing", "Workflow Validation", "API & Tool Integration Testing"],
          bg: "#18181b",
          text: "#f5f5f5",
        },

      ].map((card, idx) => (
        <section key={idx} className={`rss_section rss_s${idx + 1}`} style={{ zIndex: idx + 1 }}>
          <div className="rss_container flex flex-col items-start text-left" style={{ backgroundColor: card.bg, color: card.text }}>
            <p className="rss_tag">{card.num} — {card.title}</p>
            <hr className="rss_hr w-full" />
            <div className="w-full text-left">
              <h2 className="rss_big text-left" dangerouslySetInnerHTML={{ __html: card.titleSplit }}></h2>
            </div>
            <hr className="rss_hr w-full" />
            <div className="w-full text-left">
              <p className="rss_sub text-left">{card.desc}</p>
              {card.features && (
                <ul className="mt-8 space-y-4">
                  {card.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-base font-medium opacity-90">
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};