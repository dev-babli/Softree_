"use client";

import { useRef } from 'react';
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
            AI COPILOT DEVELOPMENT SERVICES
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4 text-left">
          Custom AI Copilots for <br />
          <span className="text-[#FF6B2C]">Smarter Business Workflows</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl text-left">
          Softree Technology develops custom AI copilots that connect business knowledge, applications, and intelligent automation. Our offshore AI engineering team helps businesses build AI-powered assistants tailored to their workflows and technical requirements.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            title: "CUSTOM AI COPILOT DEVELOPMENT",
            titleSplit: "Custom AI Copilot<br />Development",
            desc: "Build AI copilots tailored to your business needs, helping users access information, get relevant answers, and complete everyday tasks.",
            features: [
              "Develop Custom AI Assistants",
              "Deliver Context-Aware Responses",
              "Connect Business Knowledge",
              "Support Daily Workflows"
            ],
            bg: "#C94716",
            text: "#ffffff",
          },
          {
            num: "02",
            title: "MICROSOFT COPILOT DEVELOPMENT",
            titleSplit: "Microsoft Copilot Studio<br />Solutions",
            desc: "Create AI copilots using Microsoft Copilot Studio and relevant Microsoft technologies to support conversations, business processes, and application integration.",
            features: [
              "Develop Microsoft Copilots",
              "Connect Knowledge Sources",
              "Automate Business Tasks",
              "Integrate Microsoft Services"
            ],
            bg: "#111111",
            text: "#f5f5f5",
          },
          {
            num: "03",
            title: "AI KNOWLEDGE & DATA INTEGRATION",
            titleSplit: "AI Copilot Knowledge<br />Integration",
            desc: "Connect AI copilots with approved documents, knowledge bases, databases, and business applications to provide relevant, context-aware information.",
            features: [
              "Integrate Business Documents",
              "Connect Data Sources",
              "Enable Knowledge Retrieval",
              "Support Contextual Responses"
            ],
            bg: "#fcfbf9",
            text: "#111111",
          },
          {
            num: "04",
            title: "AI WORKFLOW AUTOMATION",
            titleSplit: "AI Copilot Workflow<br />Automation",
            desc: "Connect AI copilots with supported business applications, APIs, and workflows to assist users and automate suitable repetitive tasks.",
            features: [
              "Automate Routine Tasks",
              "Integrate Business Applications",
              "Connect APIs and Workflows",
              "Streamline Business Processes"
            ],
            bg: "#FF6B00",
            text: "#ffffff",
          },
          {
            num: "05",
            title: "AI COPILOT SECURITY & GOVERNANCE",
            titleSplit: "Secure AI Copilot<br />Development",
            desc: "Build AI copilots with appropriate data access controls, security measures, and governance practices to support responsible use across business workflows.",
            features: [
              "Implement Access Controls",
              "Protect Business Data",
              "Manage AI Permissions",
              "Support Responsible AI Adoption"
            ],
            bg: "#18181b",
            text: "#f5f5f5",
          }
        ].map((card, idx) => (
          <section key={idx} className={`rss_section rss_s${idx + 1}`} style={{ zIndex: idx + 1 }}>
            <div className="rss_container flex flex-col items-start text-left" style={{ backgroundColor: card.bg, color: card.text }}>
              <p className="rss_tag">{card.num} — {card.title}</p>
              <hr className="rss_hr w-full" />
              <div className="w-full text-left">
                <h3 className="rss_big text-left" dangerouslySetInnerHTML={{ __html: card.titleSplit }}></h3>
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
    </section>
  );
};

export default ReverseStickyScroll;
