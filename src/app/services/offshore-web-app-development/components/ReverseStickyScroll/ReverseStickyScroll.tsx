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
            WHAT WE BUILD
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4 text-left">
          Custom Web Applications for <br />
          <span className="text-[#FF6B2C]">Smarter Business Workflows</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl text-left">
          Softree Technology builds custom web applications that streamline business operations, connect systems, and deliver scalable digital experiences through modern web technologies and offshore development expertise.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            title: "CUSTOM WEB APPLICATION DEVELOPMENT",
            titleSplit: "Custom Web Application<br />Development",
            desc: "Build custom web applications tailored to your business requirements, workflows, and user needs to improve efficiency and support business growth.",
            features: [
              "Develop Custom Web Applications",
              "Build Business-Specific Solutions",
              "Create Responsive User Experiences",
              "Support Scalable Architecture"
            ],
            bg: "#C94716",
            text: "#ffffff",
          },
          {
            num: "02",
            title: "ENTERPRISE WEB APPLICATION DEVELOPMENT",
            titleSplit: "Enterprise Web Application<br />Solutions",
            desc: "Develop enterprise web applications that connect business processes, simplify complex workflows, and support collaboration across teams and systems.",
            features: [
              "Develop Enterprise Web Applications",
              "Streamline Business Workflows",
              "Integrate Enterprise Systems",
              "Support Business Operations"
            ],
            bg: "#111111",
            text: "#f5f5f5",
          },
          {
            num: "03",
            title: "API & SYSTEM INTEGRATION",
            titleSplit: "Web Application API<br />Integration",
            desc: "Connect web applications with third-party APIs, databases, and existing business systems to improve data exchange and create connected digital experiences.",
            features: [
              "Integrate Third-Party APIs",
              "Connect Business Applications",
              "Enable Seamless Data Exchange",
              "Improve System Interoperability"
            ],
            bg: "#fcfbf9",
            text: "#111111",
          },
          {
            num: "04",
            title: "OFFSHORE WEB DEVELOPMENT & SCALING",
            titleSplit: "Offshore Web Development<br />Solutions",
            desc: "Extend your development capabilities with offshore web developers who help build, enhance, and maintain web applications aligned with your technical requirements and business goals.",
            features: [
              "Work With Offshore Web Developers",
              "Scale Development Capacity",
              "Enhance Existing Web Applications",
              "Support Ongoing Application Improvements"
            ],
            bg: "#FF5812",
            text: "#ffffff",
          },
          {
            num: "05",
            title: "WEB APPLICATION MODERNIZATION",
            titleSplit: "Legacy Web Application<br />Modernization",
            desc: "Modernize existing web applications with updated technologies, improved performance, and scalable architecture to meet evolving business requirements.",
            features: [
              "Modernize Legacy Applications",
              "Improve Application Performance",
              "Upgrade Web Technologies",
              "Enhance Scalability"
            ],
            bg: "#18181b",
            text: "#f5f5f5",
          },
          {
            num: "06",
            title: "WEB APPLICATION MAINTENANCE & SUPPORT",
            titleSplit: "Web Application Maintenance<br />and Support",
            desc: "Keep your web applications reliable and up to date with ongoing maintenance, bug fixes, performance improvements, and feature enhancements.",
            features: [
              "Fix Bugs and Technical Issues",
              "Improve Application Performance",
              "Apply Updates and Enhancements",
              "Maintain Application Reliability"
            ],
            bg: "#fafaf9",
            text: "#111111",
          },
          {
            num: "07",
            title: "RESPONSIVE WEB APPLICATION DEVELOPMENT",
            titleSplit: "Responsive Web Application<br />Development",
            desc: "Build responsive web applications that deliver consistent user experiences across desktops, tablets, and mobile devices while supporting accessibility and usability.",
            features: [
              "Develop Responsive Web Interfaces",
              "Optimize Cross-Device Experiences",
              "Improve User Experience",
              "Support Modern Browsers"
            ],
            bg: "#09090b",
            text: "#ffffff",
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

