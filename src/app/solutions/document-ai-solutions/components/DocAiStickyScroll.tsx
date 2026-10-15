"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import '@/app/services/ai-development-services/components/ReverseStickyScroll/ReverseStickyScroll.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const DocumentAiStickyScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    const sections = gsap.utils.toArray<HTMLElement>('.rss_section');

    sections.forEach((section, i) => {
      const innerContainer = section.querySelector('.rss_container');
      if (!innerContainer) return;

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

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <>
      <div className="w-full max-w-[1340px] mx-auto px-4 mt-12 md:mt-16 mb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            WHAT WE BUILD
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          Document AI Solutions for <br />
          <span className="text-[#FF6B2C]">Intelligent Document Workflows</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Build intelligent document processing systems from extraction and classification to integrations and governance—backed by offshore and white-label AI engineering.
        </p>
      </div>

      <div ref={containerRef} className="rss_wrap">
        {[
          {
            num: "01",
            tag: "DOCUMENT ASSESSMENT & STRATEGY",
            title: "Document Assessment & Strategy",
            titleSplit: "Document Assessment<br />&amp; Strategy",
            desc: "Assess document types, volumes, formats, and business workflows to identify high-value automation opportunities and define the extraction architecture, integrations, and governance requirements.",
            points: [
              "Identify high-value document automation use cases and define business requirements.",
              "Evaluate data readiness, document quality, and technical feasibility.",
            ],
            bg: "#C94716",
            text: "#ffffff",
          },
          {
            num: "02",
            tag: "INTELLIGENT OCR & EXTRACTION",
            title: "Intelligent OCR & Data Extraction",
            titleSplit: "Intelligent OCR &amp;<br />Data Extraction",
            desc: "Design and implement extraction pipelines using Azure AI Document Intelligence, custom OCR models, or multimodal AI to accurately extract structured data from diverse document types.",
            points: [
              "Select and configure suitable extraction models for each document type.",
              "Implement extraction logic, field mapping, and confidence scoring.",
            ],
            bg: "#111111",
            text: "#f5f5f5",
          },
          {
            num: "03",
            tag: "DOCUMENT CLASSIFICATION",
            title: "Document Classification & Routing",
            titleSplit: "Document Classification<br />&amp; Routing",
            desc: "Build automated classification systems that identify document types, route them to the correct processing pipelines, and handle exceptions with human-in-the-loop review workflows.",
            points: [
              "Develop classification models trained on business-specific document categories.",
              "Implement routing logic, exception queues, and review workflows.",
            ],
            bg: "#fcfbf9",
            text: "#111111",
          },
          {
            num: "04",
            tag: "VALIDATION & QUALITY ASSURANCE",
            title: "Data Validation & Quality Control",
            titleSplit: "Data Validation &amp;<br />Quality Control",
            desc: "Connect extracted document data with validation rules, cross-reference checks, and business logic to ensure accuracy before data flows into downstream systems.",
            points: [
              "Implement field validation, cross-document reconciliation, and error handling.",
              "Configure human review queues for low-confidence or exceptional cases.",
            ],
            bg: "#FF6B00",
            text: "#ffffff",
          },
          {
            num: "05",
            tag: "ERP, CRM & ENTERPRISE INTEGRATION",
            title: "Enterprise Integration & Workflow Automation",
            titleSplit: "Enterprise Integration &amp;<br />Workflow Automation",
            desc: "Connect document AI pipelines with existing ERP, CRM, SharePoint, databases, and business tools so extracted data flows directly into approved workflows and systems.",
            points: [
              "Integrate SAP, Dynamics 365, SharePoint, and other supported enterprise systems.",
              "Configure data mapping, workflow triggers, and inter-system communication.",
            ],
            bg: "#18181b",
            text: "#f5f5f5",
          },
          {
            num: "06",
            tag: "TESTING, SECURITY & GOVERNANCE",
            title: "Testing, Security & Governance",
            titleSplit: "Testing, Security<br />&amp; Governance",
            desc: "Validate extraction accuracy, integration reliability, and access controls before deployment to ensure the document AI solution behaves as intended across business-critical processes.",
            points: [
              "Test extraction accuracy, exception handling, and integration workflows.",
              "Implement access controls, audit logging, and compliance monitoring.",
            ],
            bg: "#fcfbf9",
            text: "#111111",
          },
          {
            num: "07",
            tag: "DEPLOYMENT & CONTINUOUS OPTIMISATION",
            title: "Production Deployment & Optimisation",
            titleSplit: "Production Deployment<br />&amp; Optimisation",
            desc: "Prepare document AI solutions for production with deployment support, performance monitoring, and iterative improvements aligned with business and accuracy requirements.",
            points: [
              "Support deployment, observability, and troubleshooting across the solution.",
              "Refine extraction models using production data and operational feedback.",
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
    </>
  );
};

export default DocumentAiStickyScroll;
