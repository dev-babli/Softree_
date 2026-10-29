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

export const AIITCapabilitiesStickyScroll = () => {
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
      <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            WHAT WE BUILD
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          AI-Powered IT Capabilities <br />
          <span className="text-[#FF6B2C]">We Build</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Build next-generation AI capabilities for IT services and operations—from intelligent ticketing and AIOps to proactive incident detection, IT copilots, and RAG knowledge systems.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "AI-POWERED ITSM",
            title: "Automate IT Service Management Workflows",
            titleSplit: "Automate IT Service<br />Management Workflows",
            desc: "Build AI-powered IT service management solutions that streamline ticket handling, automate service requests, improve support workflows, and help IT teams deliver faster service.",
            points: [
              "Automate repetitive IT service desk tasks and service requests.",
              "Improve ticket classification, routing, and resolution workflows."
            ],
            bg: "#C94716",
            text: "#ffffff"
          },
          {
            num: "02",
            tag: "AIOPS & INTELLIGENT MONITORING",
            title: "Make IT Operations Smarter with AIOps",
            titleSplit: "Make IT Operations<br />Smarter with AIOps",
            desc: "Use AI for IT operations (AIOps) to analyze infrastructure, application, and system data, identify unusual behavior, and help teams detect operational issues earlier.",
            points: [
              "Analyze logs, metrics, and events to identify anomalies.",
              "Improve infrastructure monitoring and operational visibility."
            ],
            bg: "#111111",
            text: "#f5f5f5"
          },
          {
            num: "03",
            tag: "AI INCIDENT MANAGEMENT",
            title: "Accelerate IT Incident Detection and Resolution",
            titleSplit: "Accelerate IT Incident<br />Detection and Resolution",
            desc: "Implement AI-driven incident management solutions that help IT teams detect, classify, prioritize, and investigate incidents while supporting faster troubleshooting and resolution.",
            points: [
              "Automate incident categorization and prioritization.",
              "Provide AI-assisted root cause analysis and resolution recommendations."
            ],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "04",
            tag: "IT SERVICE DESK COPILOTS",
            title: "Enhance IT Support with AI Copilots",
            titleSplit: "Enhance IT Support<br />with AI Copilots",
            desc: "Develop AI copilots for IT service desks that help support teams find relevant knowledge, summarize tickets, troubleshoot issues, and respond to common employee requests.",
            points: [
              "Retrieve answers from internal documentation and knowledge bases.",
              "Assist agents with ticket summaries, troubleshooting, and response drafting."
            ],
            bg: "#FF6B00",
            text: "#ffffff"
          },
          {
            num: "05",
            tag: "PREDICTIVE IT OPERATIONS",
            title: "Anticipate IT Issues Before They Escalate",
            titleSplit: "Anticipate IT Issues<br />Before They Escalate",
            desc: "Apply AI-driven analytics to historical and real-time operational data to identify emerging patterns, forecast potential failures, and help IT teams address risks proactively.",
            points: [
              "Identify patterns associated with recurring incidents and system failures.",
              "Support proactive maintenance and operational risk management."
            ],
            bg: "#18181b",
            text: "#f5f5f5"
          },
          {
            num: "06",
            tag: "INTELLIGENT IT AUTOMATION",
            title: "Automate Repetitive IT Processes with AI",
            titleSplit: "Automate Repetitive<br />IT Processes with AI",
            desc: "Build intelligent IT automation solutions that combine AI models, business rules, and workflow integrations to reduce manual effort and improve operational consistency.",
            points: [
              "Automate routine IT workflows and repetitive operational tasks.",
              "Connect AI capabilities with existing enterprise systems and tools."
            ],
            bg: "#fcfbf9",
            text: "#111111"
          },
          {
            num: "07",
            tag: "AI AGENTS FOR IT",
            title: "Build AI Agents for IT Operations",
            titleSplit: "Build AI Agents<br />for IT Operations",
            desc: "Develop AI agents for IT that can interpret requests, retrieve relevant information, coordinate multi-step workflows, and execute approved tasks through connected systems and tools.",
            points: [
              "Create AI agents for troubleshooting, knowledge retrieval, and workflow execution.",
              "Integrate appropriate tools, permissions, and human approval steps."
            ],
            bg: "#C94716",
            text: "#ffffff"
          },
          {
            num: "08",
            tag: "IT KNOWLEDGE & RAG",
            title: "Turn IT Documentation into Actionable Knowledge",
            titleSplit: "Turn IT Documentation<br />into Actionable Knowledge",
            desc: "Implement retrieval-augmented generation (RAG) solutions that connect AI models to internal IT documentation, technical runbooks, policies, and knowledge bases to provide context-aware responses.",
            points: [
              "Retrieve relevant information from enterprise knowledge sources.",
              "Generate grounded answers using internal documentation and approved data."
            ],
            bg: "#111111",
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

export default AIITCapabilitiesStickyScroll;
