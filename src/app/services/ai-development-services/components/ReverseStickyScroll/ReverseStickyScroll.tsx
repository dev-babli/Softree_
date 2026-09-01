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
        gsap.set(innerContainer, {
          rotation: 30,
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
          title: "AI Agents",
          titleSplit: "AI<br />Agents",
          desc: "Build intelligent AI agents that understand business goals, reason through tasks, make decisions, use tools, access enterprise data, and autonomously execute multi-step workflows.",
          bg: "#C94716", text: "#ffffff",
          link: "/solutions/ai-agents-development"
        },
        {
          num: "02",
          title: "Multi-Agent Systems",
          titleSplit: "Multi-Agent<br />Systems",
          desc: "Design multi-agent AI systems where specialized agents collaborate, exchange information, and coordinate complex tasks to automate end-to-end business processes.",
          bg: "#111111", text: "#f5f5f5",
          link: "/solutions/multi-agent-systems"
        },
        {
          num: "03",
          title: "AI Copilots",
          titleSplit: "AI<br />Copilots",
          desc: "Develop context-aware AI copilots that assist employees and customers with real-time guidance, knowledge access, decision support, and task execution across business applications.",
          bg: "#fcfbf9", text: "#111111",
          link: "/solutions/ai-copilot-development"
        },
        {
          num: "04",
          title: "RAG & Enterprise Knowledge",
          titleSplit: "RAG &<br />Enterprise<br />Knowledge",
          desc: "Build secure Retrieval-Augmented Generation (RAG) solutions that connect AI models with enterprise documents, databases, knowledge bases, and business data for accurate, grounded responses.",
          bg: "#FF6B00", text: "#ffffff",
          link: "/solutions/enterprise-rag-development"
        },
        {
          num: "05",
          title: "Intelligent Automation",
          titleSplit: "Intelligent<br />Automation",
          desc: "Combine AI agents, machine learning, and workflow automation to streamline complex business processes, reduce manual effort, improve efficiency, and accelerate operations.",
          bg: "#2A2A2A", text: "#f5f5f5",
          link: "/services/ai-powered-test-automation"
        },
        {
          num: "06",
          title: "AI-Powered Applications",
          titleSplit: "AI-Powered<br />Applications",
          desc: "Build AI-native applications or embed intelligent capabilities into existing platforms, products, and enterprise applications to deliver smarter user experiences and automated decision-making.",
          bg: "#fcfbf9", text: "#111111",
          link: "/services/generative-ai"
        }
      ].map((card, idx) => (
        <section key={idx} className={`rss_section rss_s${idx + 1}`}>
          <div className="rss_container flex flex-col" style={{ backgroundColor: card.bg, color: card.text }}>
            <p className="rss_tag">{card.num} — {card.title}</p>
            <hr className="rss_hr" />
            <div>
              <h2 className="rss_big" dangerouslySetInnerHTML={{ __html: card.titleSplit }}></h2>
            </div>
            <hr className="rss_hr" />
            <p className="rss_sub">{card.desc}</p>
            
            <div className="mt-auto pt-10 flex justify-center w-full">
              <Link 
                href={card.link}
                className="inline-flex items-center gap-2 px-8 py-3.5 border rounded-full text-[15px] font-semibold tracking-wide transition-all duration-300 hover:opacity-70"
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
