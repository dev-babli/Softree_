"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import Link from 'next/link';
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
    <section className="w-full bg-white pt-10 md:pt-14 pb-8 md:pb-12">
      {/* Reverse Sticky Scroll Overall Header */}
      <div className="w-full max-w-[1340px] mx-auto px-4 mb-8 md:mb-12 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase font-semibold">
            WHAT WE HELP YOU PLAN
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4 text-left">
          AI Consulting for <br />
          <span className="text-[#FF6B2C]">AI Agents, Automation & Generative AI</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl text-left">
          Explore the right AI solutions for your business with Softree Technology. Our offshore AI consulting and engineering team helps you assess opportunities, plan AI architectures, select suitable technologies, and prepare for practical AI implementation.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            title: "AI AGENT CONSULTING",
            titleSplit: "AI Agent Strategy<br />& Consulting",
            desc: "Identify business tasks suited to AI agents and plan solutions that use business data, tools, and APIs to support workflows and improve operational efficiency.",
            bg: "#C94716",
            text: "#ffffff",
            link: "/solutions/ai-agents-development"
          },
          {
            num: "02",
            title: "MULTI-AGENT SYSTEMS",
            titleSplit: "Multi-Agent Systems<br />Consulting",
            desc: "Evaluate when multiple AI agents can work together across business processes. Plan agent roles, coordination, integrations, and suitable implementation approaches.",
            bg: "#111111",
            text: "#f5f5f5",
            link: "/solutions/multi-agent-systems"
          },
          {
            num: "03",
            title: "RAG & KNOWLEDGE INTEGRATION",
            titleSplit: "RAG Consulting &<br />AI Knowledge Solutions",
            desc: "Assess how retrieval-augmented generation (RAG) can connect AI applications with business documents, knowledge bases, and databases to provide context-aware responses.",
            bg: "#fcfbf9",
            text: "#111111",
            link: "/solutions/enterprise-rag-development"
          },
          {
            num: "04",
            title: "AI WORKFLOW AUTOMATION",
            titleSplit: "AI Workflow<br />Automation Consulting",
            desc: "Identify repetitive and decision-driven workflows that could benefit from AI automation. Plan integrations between AI agents, business applications, and existing processes.",
            bg: "#FF6B00",
            text: "#ffffff",
            link: "/solutions/ai-workflow-automation"
          },
          {
            num: "05",
            title: "AI COPILOTS",
            titleSplit: "AI Copilot<br />Consulting & Strategy",
            desc: "Explore AI copilots that help employees and customers access information, receive contextual guidance, and complete tasks across supported business applications.",
            bg: "#18181b",
            text: "#f5f5f5",
            link: "/solutions/ai-copilot-development"
          },
          {
            num: "06",
            title: "GENERATIVE AI",
            titleSplit: "Generative AI<br />Consulting Services",
            desc: "Identify suitable generative AI use cases for content creation, information processing, knowledge assistance, and AI-powered business applications. Define a practical approach based on your goals and technical requirements.",
            bg: "#fcfbf9",
            text: "#111111",
            link: "/services/generative-ai"
          },
          {
            num: "07",
            title: "AZURE OPENAI",
            titleSplit: "Azure OpenAI<br />Consulting Services",
            desc: "Evaluate Azure OpenAI for generative AI applications, RAG solutions, AI assistants, and business workflow integrations. Plan the architecture, security considerations, and implementation requirements for your use case.",
            bg: "#2A2A2A",
            text: "#f5f5f5",
            link: "/solutions/azure-openai-development"
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
                  Learn More <span className="text-lg leading-none">→</span>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export const AIConsultingStickyScroll = ReverseStickyScroll;
export default ReverseStickyScroll;
