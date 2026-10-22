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

export const SharePointStickyScroll = () => {
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

          // Subtle scale & dim of previous card as new card enters
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
          SharePoint Development Solutions for <br />
          <span className="text-[#FF6B2C]">Modern Business Collaboration</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Build and customize SharePoint solutions with Softree Technology. Our offshore SharePoint developers help businesses create intranets, organize documents, automate workflows, and integrate Microsoft 365 with existing business applications.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "SHAREPOINT REQUIREMENTS ASSESSMENT",
            title: "SharePoint Environment Assessment",
            titleSplit: "SharePoint Environment<br />Assessment",
            desc: "Review your current SharePoint sites, content, permissions, business processes, and integrations to identify requirements and opportunities for improvement.",
            points: [
              "Assess sites, document libraries, lists, and existing workflows.",
              "Identify customization, access, and integration requirements.",
            ],
            bg: "#C94716",
            text: "#ffffff",
          },
          {
            num: "02",
            tag: "SHAREPOINT SOLUTION PLANNING",
            title: "SharePoint Development Strategy & Planning",
            titleSplit: "SharePoint Development<br />Strategy & Planning",
            desc: "Define a SharePoint development approach aligned with your collaboration goals, Microsoft 365 environment, content structure, and business requirements.",
            points: [
              "Plan site architecture, navigation, and development priorities.",
              "Define implementation phases, dependencies, and integration needs.",
            ],
            bg: "#111111",
            text: "#f5f5f5",
          },
          {
            num: "03",
            tag: "SHAREPOINT INTRANET & SITE DEVELOPMENT",
            title: "SharePoint Intranet Development",
            titleSplit: "SharePoint Intranet<br />Development",
            desc: "Build customized SharePoint intranets, team sites, communication sites, and business portals that improve information access and collaboration.",
            points: [
              "Develop SharePoint pages, site layouts, and custom web parts.",
              "Organize business content for better usability and team collaboration.",
            ],
            bg: "#fcfbf9",
            text: "#111111",
          },
          {
            num: "04",
            tag: "SHAREPOINT DOCUMENT MANAGEMENT",
            title: "SharePoint Document Management Solutions",
            titleSplit: "SharePoint Document<br />Management Solutions",
            desc: "Organize business documents with SharePoint libraries, metadata, versioning, and access controls suited to your content management requirements.",
            points: [
              "Structure document libraries and content types.",
              "Support document organization, version control, and permission management.",
            ],
            bg: "#FF6B00",
            text: "#ffffff",
          },
          {
            num: "05",
            tag: "SHAREPOINT WORKFLOW AUTOMATION",
            title: "SharePoint Workflow Automation & Integration",
            titleSplit: "SharePoint Workflow<br />Automation & Integration",
            desc: "Streamline repetitive business processes by connecting SharePoint with Power Automate, Microsoft 365, and supported business applications.",
            points: [
              "Automate approvals, notifications, and routine processes.",
              "Integrate SharePoint with relevant Microsoft 365 services and APIs.",
            ],
            bg: "#18181b",
            text: "#f5f5f5",
          },
          {
            num: "06",
            tag: "SHAREPOINT MODERNIZATION & SUPPORT",
            title: "SharePoint Customization, Modernization & Support",
            titleSplit: "SharePoint Customization,<br />Modernization & Support",
            desc: "Enhance existing SharePoint solutions through customization, functionality improvements, troubleshooting, and ongoing engineering support.",
            points: [
              "Improve existing SharePoint sites and business solutions.",
              "Extend functionality based on evolving business and technical needs.",
            ],
            bg: "#fcfbf9",
            text: "#111111",
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
};

export default SharePointStickyScroll;
