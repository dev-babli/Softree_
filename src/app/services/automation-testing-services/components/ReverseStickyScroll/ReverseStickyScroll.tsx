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
          title: "FUNCTIONAL TEST AUTOMATION",
          titleSplit: "Functional Test<br />Automation",
          desc: "Automate critical business workflows and application functionality to improve test coverage, reduce repetitive testing, and identify defects earlier in the software development lifecycle.",
          features: ["Automate Business Workflows", "Improve Test Coverage", "Accelerate Defect Detection", "Reduce Manual Effort"],
          bg: "#C94716",
          text: "#ffffff",
        },
        {
          num: "02",
          title: "WEB & UI TEST AUTOMATION",
          titleSplit: "Web & UI Test<br />Automation",
          desc: "Build reliable UI automation for websites, portals, dashboards, and enterprise applications to validate user journeys, interfaces, workflows, and cross-browser behavior.",
          features: ["Validate User Journeys", "Cross-Browser Testing", "Multi-Device Validation", "Ensure UI Consistency"],
          bg: "#111111",
          text: "#f5f5f5",
        },
        {
          num: "03",
          title: "API TEST AUTOMATION",
          titleSplit: "API Test<br />Automation",
          desc: "Automate REST and SOAP API testing to validate backend services, integrations, data flows, business logic, and application reliability across connected systems.",
          features: ["REST & SOAP API Testing", "Validate Backend Integrations", "Enhance Data Flow Security", "Improve Application Reliability"],
          bg: "#fcfbf9",
          text: "#111111",
        },
        {
          num: "04",
          title: "REGRESSION & END-TO-END TESTING",
          titleSplit: "Regression &<br />End-to-End Testing",
          desc: "Automate critical regression and end-to-end scenarios to detect defects after application changes and maintain consistent software quality across every release.",
          features: ["Automate Critical Scenarios", "Consistent Software Quality", "Validate Workflow Integrity", "Reduce Post-Release Bugs"],
          bg: "#FF6B00",
          text: "#ffffff",
        },
        {
          num: "05",
          title: "CI/CD & CONTINUOUS TESTING",
          titleSplit: "CI/CD & Continuous<br />Testing",
          desc: "Integrate automated testing into CI/CD pipelines for faster feedback, continuous validation, automated quality checks, and more reliable software delivery.",
          features: ["CI/CD Pipeline Integration", "Continuous Validation", "Accelerate Time to Market", "Automated Quality Gates"],
          bg: "#18181b",
          text: "#f5f5f5",
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