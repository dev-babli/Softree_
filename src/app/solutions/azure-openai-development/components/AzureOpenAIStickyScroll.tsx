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

export const AzureOpenAIStickyScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Initialize Lenis scroll smoothing
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
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
          Azure OpenAI Solutions for <br />
          <span className="text-[#FF6B2C]">AI Adoption with Offshore Engineering</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          We design and build production Azure OpenAI solutions — from GPT-4o application engineering and RAG pipelines to Microsoft Copilot extensions, secure AI landing zones, cost optimisation, and production-grade AI governance frameworks.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "GPT-4o APPLICATION ENGINEERING",
            title: "Custom GPT-4o Application Development",
            titleSplit: "Custom GPT-4o<br />Application Development",
            desc: "Design and build production-ready GPT-4o applications, REST API middleware, and Azure AI Foundry deployments inside your private Azure subscription with robust, scalable architecture.",
            points: ["Build custom GPT-4o apps, REST APIs, streaming endpoints, and AI orchestration middleware", "Deploy via Azure AI Foundry with model versioning, logging, and quota management"],
            bg: "#C94716",
            text: "#ffffff"
          },
          {
            num: "02",
            tag: "PRODUCTION RAG DEVELOPMENT",
            title: "RAG with Azure AI Search & Semantic Re-ranking",
            titleSplit: "RAG with Azure AI Search<br />& Semantic Re-ranking",
            desc: "Implement hybrid keyword-vector retrieval, semantic re-ranking, citation grounding, and strict content filtering to deliver accurate, hallucination-resistant AI responses grounded in your internal data.",
            points: ["Build RAG pipelines with chunking, embedding, hybrid retrieval, and semantic re-ranking", "Enforce citation grounding, prompt guardrails, and automated evaluation benchmarks"],
            bg: "#111111",
            text: "#f5f5f5"
          },
          {
            num: "03",
            tag: "MICROSOFT COPILOT & M365 INTEGRATION",
            title: "Microsoft Copilot & Teams AI Integration",
            titleSplit: "Microsoft Copilot &<br />Teams AI Integration",
            desc: "Build custom Microsoft Copilot extensions, Teams bots, Power Platform connectors, SharePoint-integrated AI assistants, and Dynamics 365 AI features with user-level permission awareness.",
            points: ["Build Copilot extensions for Microsoft 365, Teams, SharePoint, Power Apps, and Dynamics 365", "Maintain user-level permission awareness with Microsoft Graph and Entra ID authentication"],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "04",
            tag: "SECURE AZURE LANDING ZONE",
            title: "VNet Landing Zone & Security Architecture",
            titleSplit: "VNet Landing Zone &<br />Security Architecture",
            desc: "Provision zero-trust Azure environments aligned with Microsoft Cloud Adoption Framework — with private endpoints, Entra ID RBAC, Key Vault, CMK encryption, and HIPAA/SOC 2 compliance controls.",
            points: ["Zero public internet exposure via Azure Private Link and VNet private endpoints", "Entra ID RBAC, Key Vault secrets, CMK encryption, Azure Monitor audit logging, and AI Content Safety"],
            bg: "#FF6B00",
            text: "#ffffff"
          },
          {
            num: "05",
            tag: "TOKEN COST OPTIMIZATION",
            title: "Azure OpenAI Cost Governance & Optimization",
            titleSplit: "Azure OpenAI Cost<br />Governance & Optimization",
            desc: "Implement multi-tier token governance, semantic caching, intelligent model tiering, prompt compression, and Azure Cost Management controls to maximize AI ROI and prevent runaway consumption.",
            points: ["Deploy semantic caching with Redis/Cosmos DB and intelligent prompt compression", "Route queries via dynamic model tiering between GPT-4o-mini and GPT-4o based on complexity"],
            bg: "#18181b",
            text: "#f5f5f5"
          },
          {
            num: "06",
            tag: "AI EVALUATION & GOVERNANCE",
            title: "Azure OpenAI Evaluation & AI Governance",
            titleSplit: "Azure OpenAI Evaluation<br />& AI Governance",
            desc: "Implement automated AI evaluation suites, continuous model monitoring, prompt regression testing, and AI governance frameworks to ensure accuracy, reliability, and responsible AI deployment.",
            points: ["Benchmark answer relevance, faithfulness, groundedness, and latency before production", "Implement AI governance policies, content safety filters, and continuous evaluation pipelines"],
            bg: "#fcfbf9",
            text: "#111111"
          }
        ].map((card, idx) => (
          <section key={idx} className={`rss_section rss_s${idx + 1}`} style={{ zIndex: idx + 1 }}>
            <div className="rss_container flex flex-col items-start text-left" style={{ backgroundColor: card.bg, color: card.text }}>
              <p className="rss_tag">{card.num} — {card.tag}</p>
              <hr className="rss_hr w-full" />
              <div className="w-full text-left">
                <h3 className="rss_big text-left" dangerouslySetInnerHTML={{ __html: card.titleSplit }}></h3>
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
