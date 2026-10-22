"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
// Import original CSS to preserve EXACT styling
import "@/app/services/ai-development-services/components/ReverseStickyScroll/ReverseStickyScroll.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SpfxStickyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Initialize Lenis scroll smoothing
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);

      const updateLenis = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(updateLenis);

      // Grab all section elements inside our container
      const sections = gsap.utils.toArray<HTMLElement>(".rss_section");

      sections.forEach((section, i) => {
        const innerContainer = section.querySelector(".rss_container");
        if (!innerContainer) return;

        // 1. Entrance Rotation Animation (for sections after the first one)
        if (i > 0) {
          const startRotation =
            typeof window !== "undefined" && window.innerWidth < 768 ? 14 : 25;
          gsap.set(innerContainer, {
            rotation: startRotation,
            transformOrigin: "bottom left",
          });

          gsap.to(innerContainer, {
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 25%",
              scrub: true,
            },
          });

          const prevContainer = sections[i - 1]?.querySelector(".rss_container");
          if (prevContainer) {
            gsap.to(prevContainer, {
              scale: 0.96,
              opacity: 0.25,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 35%",
                end: "top top",
                scrub: true,
              },
            });
          }
        }

        // 2. Sticky Pinning Animation (for sections before the last one)
        if (i < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          });
        }
      });

      // Cleanup function
      return () => {
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <>
      <div className="w-full max-w-[1340px] mx-auto px-4 mt-12 md:mt-16 mb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            WHAT WE BUILD
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          SPFx Development Solutions for <br />
          <span className="text-[#FF6B2C]">SharePoint Online</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Softree Technology provides offshore SPFx development services to build custom SharePoint web parts, extensions, and modern business applications. Our solutions help organizations customize SharePoint Online, integrate Microsoft 365 services, and enhance business collaboration.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "CUSTOM SPFX DEVELOPMENT",
            title: "Custom SPFx Web Part Development",
            titleSplit: "Custom SPFx<br />Web Part Development",
            desc: "Build custom SharePoint Framework web parts that extend SharePoint Online with functionality tailored to your business requirements.",
            points: [
              "Develop reusable SPFx web parts for modern SharePoint pages.",
              "Create interactive components and custom user interfaces.",
            ],
            bg: "#C94716",
            text: "#ffffff",
          },
          {
            num: "02",
            tag: "SHAREPOINT FRAMEWORK EXTENSIONS",
            title: "SharePoint Framework Extension Development",
            titleSplit: "SharePoint Framework<br />Extension Development",
            desc: "Customize SharePoint experiences with SPFx extensions that support navigation, page interactions, and business-specific functionality.",
            points: [
              "Develop application customizers, field customizers, and command sets.",
              "Extend modern SharePoint sites with tailored functionality.",
            ],
            bg: "#111111",
            text: "#f5f5f5",
          },
          {
            num: "03",
            tag: "SHAREPOINT ONLINE CUSTOMIZATION",
            title: "Modern SharePoint Online Customization",
            titleSplit: "Modern SharePoint<br />Online Customization",
            desc: "Enhance SharePoint Online sites with customized layouts, components, and features that support your organization’s collaboration needs.",
            points: [
              "Customize modern SharePoint pages and user experiences.",
              "Extend existing SharePoint functionality to meet evolving requirements.",
            ],
            bg: "#fcfbf9",
            text: "#111111",
          },
          {
            num: "04",
            tag: "MICROSOFT 365 INTEGRATION",
            title: "SPFx and Microsoft 365 Integration",
            titleSplit: "SPFx and Microsoft 365<br />Integration",
            desc: "Connect SharePoint Framework solutions with supported Microsoft 365 services to create integrated business experiences.",
            points: [
              "Integrate SharePoint solutions with Microsoft Graph and relevant APIs.",
              "Connect business applications with SharePoint data and services.",
            ],
            bg: "#FF6B00",
            text: "#ffffff",
          },
          {
            num: "05",
            tag: "SHAREPOINT UI DEVELOPMENT",
            title: "Custom SharePoint User Interface Development",
            titleSplit: "Custom SharePoint User<br />Interface Development",
            desc: "Create responsive and user-friendly SharePoint interfaces that make business information and tools easier to access.",
            points: [
              "Build custom interfaces using supported SPFx technologies and React.",
              "Develop reusable UI components for consistent user experiences.",
            ],
            bg: "#18181b",
            text: "#f5f5f5",
          },
          {
            num: "06",
            tag: "SPFX MODERNIZATION",
            title: "SharePoint Framework Modernization",
            titleSplit: "SharePoint Framework<br />Modernization",
            desc: "Improve existing SPFx solutions by updating components, refining functionality, and aligning implementations with current business needs.",
            points: [
              "Enhance existing SPFx web parts and extensions.",
              "Improve maintainability and usability of custom SharePoint solutions.",
            ],
            bg: "#fcfbf9",
            text: "#111111",
          },
          {
            num: "07",
            tag: "OFFSHORE SPFX DEVELOPMENT SUPPORT",
            title: "Dedicated Offshore SPFx Development Support",
            titleSplit: "Dedicated Offshore SPFx<br />Development Support",
            desc: "Extend your engineering capacity with offshore SPFx development support for new projects, ongoing enhancements, and SharePoint customization requirements.",
            points: [
              "Add development capacity for custom SPFx projects.",
              "Support ongoing improvements and Microsoft 365 integration requirements.",
            ],
            bg: "#C94716",
            text: "#ffffff",
          },
        ].map((card, idx) => (
          <section
            key={idx}
            className={`rss_section rss_s${idx + 1}`}
            style={{ zIndex: idx + 1 }}
          >
            <div
              className="rss_container flex flex-col items-start text-left"
              style={{ backgroundColor: card.bg, color: card.text }}
            >
              <p className="rss_tag">
                {card.num} — {card.tag}
              </p>
              <hr className="rss_hr w-full" />
              <div className="w-full text-left">
                <h2
                  className="rss_big text-left"
                  dangerouslySetInnerHTML={{ __html: card.titleSplit }}
                />
              </div>
              <hr className="rss_hr w-full" />
              <p className="rss_sub text-left">{card.desc}</p>

              <div className="mt-8 flex flex-col gap-3">
                {card.points.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-center gap-3 text-sm md:text-base font-medium opacity-90"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: card.text }}
                    />
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
}

export default SpfxStickyScroll;
