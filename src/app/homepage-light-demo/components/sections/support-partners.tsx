"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASE, DUR, STAGGER } from "@/lib/motion";
import { SectionHeader } from "@/components/homepage-light/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE DATA — content preserved byte-for-byte from the previous design.
// Only visual presentation changes (Requirement 3.2, 3.6, 3.7).
// ═══════════════════════════════════════════════════════════════════════════════
const services = [
  {
    badge: "Power Platform",
    title: "Business Applications Delivery Support",
    desc: "Helping partners execute Power Platform and Dynamics implementations.",
    tech: ["Power Apps", "Power Automate", "Dataverse"],
    partner: "We operate as your extended Power Platform engineering team.",
    href: "/services/business-applications/power-platform",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
        <path d="M12 12v4M10 14h4" />
      </svg>
    ),
  },
  {
    badge: "Data & BI",
    title: "Data & Analytics Execution",
    desc: "Building scalable data solutions and BI environments for partners.",
    tech: ["Power BI", "Microsoft Fabric", "Databricks", "Snowflake"],
    partner: "We bring reliable data engineering and up-to-date analytics expertise.",
    href: "/services/data-analytics/power-bi",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    badge: "Intelligent AI",
    title: "AI & Intelligent Automation",
    desc: "Integrating AI solutions to improve business processes and experiences.",
    tech: ["Azure AI Foundry", "Copilot Integration", "AI Agents", "RAG Workflows"],
    partner: "Operate with confidence using our AI integration expertise.",
    href: "/services/ai-intelligence/agentic-ai",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
  {
    badge: "Workspace",
    title: "Digital Workspace & App Engineering",
    desc: "Enhancing and extending your Microsoft 365 collaboration environments.",
    tech: ["SharePoint Online", "Microsoft 365", "Web Applications", "Mobile Applications"],
    partner: "Securely deliver and support modern workspace solutions.",
    href: "/services/digital-workspace/sharepoint",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// LIGHT SERVICE CARD — white surface, hairline border, soft shadow, primary
// CTA in Design_Tokens orange (#FF6B00). All entrance motion routes through
// EASE.silk / DUR.card / STAGGER.default per Requirement 1.6 and 4.1.
// ═══════════════════════════════════════════════════════════════════════════════
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { badge, title, desc, tech, partner, icon, href } = service;

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        delay: reduced ? 0 : index * STAGGER.default,
      });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: reduced ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.01 : DUR.card,
          ease: EASE.silk,
        }
      );

      const elements = contentRef.current?.querySelectorAll(".reveal-child");
      if (elements && elements.length) {
        tl.fromTo(
          elements,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.01 : DUR.card,
            stagger: reduced ? 0 : STAGGER.default,
            ease: EASE.silk,
          },
          "-=0.18"
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#0a0a1a]/10 bg-white shadow-[0_8px_28px_-12px_rgba(10,10,26,0.12)] transition-transform duration-300 hover:-translate-y-1"
    >
      <div ref={contentRef} className="flex flex-col gap-5 p-7">
        <div className="reveal-child flex items-start justify-between gap-4">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{
              color: "#1852FF",
              borderColor: "rgba(24,82,255,0.20)",
              backgroundColor: "rgba(24,82,255,0.08)",
            }}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "#1852FF" }}
            />
            {badge}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0a0a1a]/10 bg-[#F8F9FC] text-[#0a0a1a]/70">
            {icon}
          </div>
        </div>

        <h3 className="reveal-child text-[18px] font-semibold leading-snug tracking-[-0.01em] text-[#0a0a1a]">
          {title}
        </h3>

        <p className="reveal-child text-[14px] leading-relaxed text-[#0a0a1a]/70">
          {desc}
        </p>

        <div className="reveal-child flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#0a0a1a]/10 bg-white px-3 py-1 text-[11px] text-[#0a0a1a]/70"
            >
              {t}
            </span>
          ))}
        </div>

        <p
          className="reveal-child border-l-2 pl-3 text-[12px] leading-snug text-[#0a0a1a]/60"
          style={{ borderColor: "#1852FF" }}
        >
          {partner}
        </p>

        <div className="reveal-child mt-1">
          <Link
            href={href}
            className="group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.10em] text-white transition-transform duration-300 hover:translate-x-1"
            style={{
              backgroundColor: "#FF6B00",
              boxShadow: "0 8px 22px -10px rgba(255,107,0,0.55)",
            }}
          >
            Explore Solution
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SECTION — light surface (#F8F9FC), Section_Rhythm padding/container,
// SectionHeader (badge + headline + body), and Motion_System tokens.
// ═══════════════════════════════════════════════════════════════════════════════
export default function CoreEngineeringServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: reduced ? 0 : 32 },
        {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.01 : DUR.section,
          ease: EASE.silk,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="support-partners"
      className="relative w-full overflow-hidden bg-[#F8F9FC] py-20 font-sans md:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <div ref={headingRef} className="mb-12 md:mb-16">
          <SectionHeader
            badge="Engineering Disciplines"
            accent="#1852FF"
            headline="Core Engineering Services"
            body="Four verticals, one delivery standard. Enterprise-grade engineering across Microsoft and modern web stacks."
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, idx) => (
            <ServiceCard key={service.title} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
