"use client";

import React, { useRef, useEffect } from 'react';
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
    <div ref={containerRef} className="rss_wrap">
      {[
        {
          num: "01",
          title: "Generative AI",
          titleSplit: "Generative<br />AI",
          desc: "Build enterprise generative AI applications, custom foundation models, and intelligent capabilities to deliver smarter user experiences and automated decision-making.",
          bg: "#C94716", text: "#ffffff",
          link: "/services/generative-ai"
        },
        {
          num: "02",
          title: "Azure OpenAI",
          titleSplit: "Azure<br />OpenAI",
          desc: "Build secure, production-ready Azure OpenAI solutions—custom GPT apps, enterprise RAG, Microsoft copilots, and governed AI services deployed in your Microsoft ecosystem.",
          bg: "#111111", text: "#f5f5f5",
          link: "/solutions/azure-openai-development"
        },
        {
          num: "03",
          title: "AI Agents",
          titleSplit: "AI<br />Agents",
          desc: "Build intelligent AI agents that understand business goals, reason through tasks, make decisions, use tools, access enterprise data, and autonomously execute multi-step workflows.",
          bg: "#fcfbf9", text: "#111111",
          link: "/solutions/ai-agents-development"
        },
        {
          num: "04",
          title: "Multi-Agent Systems",
          titleSplit: "Multi-Agent<br />Systems",
          desc: "Design multi-agent AI systems where specialized agents collaborate, exchange information, and coordinate complex tasks to automate end-to-end business processes.",
          bg: "#FF6B00", text: "#ffffff",
          link: "/solutions/multi-agent-systems"
        },
        {
          num: "05",
          title: "AI Copilots",
          titleSplit: "AI<br />Copilots",
          desc: "Develop context-aware AI copilots that assist employees and customers with real-time guidance, knowledge access, decision support, and task execution across business applications.",
          bg: "#18181b", text: "#f5f5f5",
          link: "/solutions/ai-copilot-development"
        },
        {
          num: "06",
          title: "RAG & Enterprise Knowledge",
          titleSplit: "RAG &<br />Enterprise<br />Knowledge",
          desc: "Build secure Retrieval-Augmented Generation (RAG) solutions that connect AI models with enterprise documents, databases, knowledge bases, and business data for accurate, grounded responses.",
          bg: "#fcfbf9", text: "#111111",
          link: "/solutions/enterprise-rag-development"
        },
        {
          num: "07",
          title: "AI Workflow Automation",
          titleSplit: "AI Workflow<br />Automation",
          desc: "Combine AI agents, machine learning, and workflow automation to streamline complex business processes, reduce manual effort, improve efficiency, and accelerate operations.",
          bg: "#2A2A2A", text: "#f5f5f5",
          link: "/solutions/ai-workflow-automation"
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
                prefetch={false}
                className="inline-flex items-center gap-2 px-8 py-3.5 border rounded-full text-[15px] font-semibold tracking-wide transition-all duration-300 hover:opacity-75 hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto select-auto"
                style={{ borderColor: card.text, color: card.text }}
              >
                Learn More <span className="text-lg leading-none">→</span>
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};