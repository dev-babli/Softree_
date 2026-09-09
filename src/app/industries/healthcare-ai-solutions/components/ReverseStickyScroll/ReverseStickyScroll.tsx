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
          rotation: 25,
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

        // Smoothly fade out previous card as the new card enters so it never leaks behind/above
        const prevContainer = sections[i - 1]?.querySelector('.rss_container');
        if (prevContainer) {
          gsap.to(prevContainer, {
            opacity: 0,
            scale: 0.94,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top 40%',
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
          title: "AI Patient Assistant",
          titleSplit: "AI Patient<br />Assistant",
          desc: "Help patients find information, schedule appointments and navigate healthcare services.",
          bg: "#C94716", text: "#ffffff",
          link: "/solutions/ai-agents-development"
        },
        {
          num: "02",
          title: "Medical Document Intelligence",
          titleSplit: "Medical<br />Document<br />Intelligence",
          desc: "Extract and organize information from healthcare documents.",
          bg: "#111111", text: "#f5f5f5",
          link: "/solutions/multi-agent-systems"
        },
        {
          num: "03",
          title: "Healthcare AI Copilot",
          titleSplit: "Healthcare<br />AI Copilot",
          desc: "Help teams search knowledge, summarize information and automate repetitive tasks.",
          bg: "#fcfbf9", text: "#111111",
          link: "/solutions/ai-copilot-development"
        },
        {
          num: "04",
          title: "Healthcare Analytics Platform",
          titleSplit: "Healthcare<br />Analytics<br />Platform",
          desc: "Turn healthcare data into actionable operational insights.",
          bg: "#FF6B00", text: "#ffffff",
          link: "/solutions/enterprise-rag-development"
        },
        {
          num: "05",
          title: "AI Workflow Automation",
          titleSplit: "AI Workflow<br />Automation",
          desc: "Automate repetitive administrative processes.",
          bg: "#2A2A2A", text: "#f5f5f5",
          link: "/services/ai-powered-test-automation"
        },
        {
          num: "06",
          title: "Custom Healthcare AI",
          titleSplit: "Custom<br />Healthcare AI",
          desc: "Build AI around your existing healthcare workflow.",
          bg: "#fcfbf9", text: "#111111",
          link: "/services/generative-ai"
        }
      ].map((card, idx) => (
        <section key={idx} className={`rss_section rss_s${idx + 1}`}>
          <div className="rss_container flex flex-col items-start text-left" style={{ backgroundColor: card.bg, color: card.text }}>
            <p className="rss_tag">{card.num} — {card.title}</p>
            <hr className="rss_hr w-full" />
            <div className="w-full text-left">
              <h2 className="rss_big text-left" dangerouslySetInnerHTML={{ __html: card.titleSplit }}></h2>
            </div>
            <hr className="rss_hr w-full" />
            <p className="rss_sub text-left">{card.desc}</p>
            
            <div className="mt-auto pt-10 flex justify-start w-full">
              <Link 
                href={card.link}
                className="inline-flex items-center gap-2 px-8 py-3.5 border rounded-full text-[15px] font-semibold tracking-wide transition-all duration-300 hover:opacity-70"
                style={{ borderColor: card.text, color: card.text }}
              >
                Explore AI Solutions <span className="text-lg leading-none">→</span>
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};