"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { typography } from '@/lib/typography';
// Import original CSS to preserve EXACT styling
import '@/app/services/ai-development-services/components/ReverseStickyScroll/ReverseStickyScroll.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const MobileAppDevStickyScroll = () => {
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
    <section className="w-full bg-white py-12 md:py-16">
      <div className="w-full max-w-[1340px] mx-auto px-4 mb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className={`${typography.caption.default} text-[#FF6B2C] uppercase`}>
            OUR MOBILE APP DEVELOPMENT SERVICES
          </span>
        </div>

        <h2 className={`${typography.heading.h2} text-slate-900 mb-4`}>
          Custom Mobile App Development<br />
          <span className="text-[#FF6B2C]">Services for Modern Businesses</span>
        </h2>

        <p className={`${typography.description.default} text-slate-500 max-w-3xl`}>
          Softree provides offshore mobile app development services to help businesses, startups, and technology partners design, build, integrate, and scale mobile applications. Our engineering team supports iOS and Android app development, cross-platform solutions, backend integrations, testing, deployment, and ongoing maintenance to meet your product and business requirements.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "MOBILE APP ARCHITECTURE",
            title: "Mobile App Architecture",
            titleSplit: "Mobile App<br />Architecture",
            desc: "Design scalable mobile app architectures around your product requirements, user journeys, backend systems, and security needs.",
            points: [
              "Architecture planning for iOS and Android applications",
              "API integration and backend system design",
            ],
            bg: "#C94716",
            text: "#ffffff",
          },
          {
            num: "02",
            tag: "IOS APP DEVELOPMENT",
            title: "iOS App Development",
            titleSplit: "iOS App<br />Development",
            desc: "Build custom iOS applications for iPhone and iPad with user-focused interfaces and functionality tailored to your business goals.",
            points: [
              "Custom iOS application development",
              "Device compatibility and performance optimization",
            ],
            bg: "#111111",
            text: "#f5f5f5",
          },
          {
            num: "03",
            tag: "ANDROID APP DEVELOPMENT",
            title: "Android App Development",
            titleSplit: "Android App<br />Development",
            desc: "Develop Android applications that support your product features, user experience requirements, and integration needs.",
            points: [
              "Custom Android app development",
              "Device testing and application optimization",
            ],
            bg: "#fcfbf9",
            text: "#111111",
          },
          {
            num: "04",
            tag: "CROSS-PLATFORM APP DEVELOPMENT",
            title: "Cross-Platform App Development",
            titleSplit: "Cross-Platform<br />App Development",
            desc: "Build mobile applications for iOS and Android using cross-platform technologies where they fit your product requirements.",
            points: [
              "Flutter and React Native development",
              "Shared codebases and consistent user experiences",
            ],
            bg: "#FF6B00",
            text: "#ffffff",
          },
          {
            num: "05",
            tag: "BACKEND & API INTEGRATION",
            title: "Backend & API Integration",
            titleSplit: "Backend & API<br />Integration",
            desc: "Connect mobile apps with backend services, databases, third-party APIs, and enterprise systems to support connected digital experiences.",
            points: [
              "REST API and backend integration",
              "Authentication, data exchange, and service connectivity",
            ],
            bg: "#18181b",
            text: "#f5f5f5",
          },
          {
            num: "06",
            tag: "TESTING & QUALITY ASSURANCE",
            title: "Mobile App Testing & Quality Assurance",
            titleSplit: "Mobile App Testing<br />& Quality Assurance",
            desc: "Validate mobile application functionality, usability, compatibility, and performance before release.",
            points: [
              "Functional and device compatibility testing",
              "Performance, regression, and release validation",
            ],
            bg: "#fcfbf9",
            text: "#111111",
          },
          {
            num: "07",
            tag: "MAINTENANCE & MODERNIZATION",
            title: "Mobile App Maintenance & Modernization",
            titleSplit: "Mobile App Maintenance<br />& Modernization",
            desc: "Maintain and enhance existing mobile applications with bug fixes, performance improvements, feature updates, and platform compatibility changes.",
            points: [
              "Ongoing app support and enhancements",
              "Legacy app updates and modernization",
            ],
            bg: "#C94716",
            text: "#ffffff",
          },
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
    </section>
  );
};


export default MobileAppDevStickyScroll;
