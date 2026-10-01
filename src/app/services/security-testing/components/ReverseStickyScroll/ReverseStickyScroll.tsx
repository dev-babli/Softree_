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
          title: "APPLICATION SECURITY TESTING",
          titleSplit: "Application Security<br />Testing",
          desc: "Identify security vulnerabilities across business applications and software workflows to strengthen application protection and reduce security risks throughout the development lifecycle.",
          features: ["Identify Application Vulnerabilities", "Validate Security Controls", "Protect Sensitive Data", "Reduce Security Risks"],
          bg: "#C94716",
          text: "#ffffff",
        },
        {
          num: "02",
          title: "WEB APPLICATION SECURITY TESTING",
          titleSplit: "Web Application<br />Security Testing",
          desc: "Test websites, portals, dashboards, and enterprise web applications for common security weaknesses across authentication, authorization, sessions, inputs, and application workflows.",
          features: ["Authentication Testing", "Authorization Testing", "Session Security", "Input Validation"],
          bg: "#111111",
          text: "#f5f5f5",
        },
        {
          num: "03",
          title: "API SECURITY TESTING",
          titleSplit: "API Security<br />Testing",
          desc: "Secure REST and SOAP APIs by validating authentication, authorization, data protection, input handling, integrations, and backend service security.",
          features: ["REST & SOAP API Security", "Authentication & Authorization", "Data Protection", "Backend Security Validation"],
          bg: "#fcfbf9",
          text: "#111111",
        },
        {
          num: "04",
          title: "MOBILE SECURITY TESTING",
          titleSplit: "Mobile Application<br />Security Testing",
          desc: "Assess Android and iOS applications for vulnerabilities across application logic, authentication, data storage, network communication, APIs, and device interactions.",
          features: ["Android & iOS Security", "Secure Data Storage", "Network Security", "Mobile API Security"],
          bg: "#FF6B00",
          text: "#ffffff",
        },
        {
          num: "05",
          title: "PENETRATION TESTING",
          titleSplit: "Penetration Testing<br />Services",
          desc: "Simulate controlled real-world attacks to identify exploitable vulnerabilities across applications, APIs, networks, and critical business workflows before attackers can take advantage of them.",
          features: ["Identify Exploitable Vulnerabilities", "Simulate Real-World Attack Scenarios", "Validate Security Defenses", "Prioritize Critical Security Risks"],
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