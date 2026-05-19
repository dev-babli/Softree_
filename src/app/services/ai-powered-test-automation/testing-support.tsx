"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const solutions = [
  {
    id: "enterprise",
    label: "Enterprise Web",
    title: "Enterprise Web Applications",
    description:
      "Automation testing for large-scale business applications and enterprise portals.",
    accent: "#f97316",
    tag: "Large Scale",
    stats: "10K+ Test Cases",
  },

  {
    id: "saas",
    label: "SaaS Platforms",
    title: "SaaS Platforms",
    description:
      "Scalable QA automation for cloud-native SaaS products.",
    accent: "#f97316",
    tag: "Cloud Native",
    stats: "99.9% Uptime",
  },

  {
    id: "microsoft",
    label: "Microsoft",
    title: "Microsoft Ecosystem",
    description:
      "Automation support for SharePoint, Power Platform, and Microsoft enterprise solutions.",
    accent: "#f97316",
    tag: "SharePoint",
    stats: "M365 Ready",
  },

  {
    id: "mobile",
    label: "Mobile Apps",
    title: "Mobile Applications",
    description:
      "End-to-end testing automation for Android and iOS applications.",
    accent: "#f97316",
    tag: "iOS & Android",
    stats: "Cross-Platform",
  },

  {
    id: "api",
    label: "API & Micro",
    title: "API & Microservices",
    description:
      "Continuous API testing for modern distributed systems.",
    accent: "#f97316",
    tag: "REST & GraphQL",
    stats: "CI/CD Integrated",
  },

  {
    id: "ai",
    label: "AI & Automation",
    title: "AI-Powered Testing",
    description:
      "Intelligent automation testing powered by AI-driven validation, visual testing, and predictive QA workflows.",
    accent: "#f97316",
    tag: "AI Powered",
    stats: "Smart QA",
  },
];

export default function AutomationTestingSolutions() {
  const [active, setActive] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-20"
      style={{
        background: "#fafafa",
        }}
    >
      {/* Header */}
      <div
        className="text-center mb-16"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease",
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#f97316",
            fontWeight: 600,
            marginBottom: 18,
          }}
        >
          QA Automation Suite
        </div>

        <h1
          style={{
            fontSize: "4rem",
            fontWeight: 800,
            color: "#18181b",
            letterSpacing: "-0.05em",
            lineHeight: 1.05,
          }}
        >
          Automation Testing
          <br />
          <span style={{ color: "#f97316" }}>
            Solutions We Support
          </span>
        </h1>

        <p
          style={{
            marginTop: 20,
            fontSize: "1rem",
            color: "#71717a",
            maxWidth: 640,
            lineHeight: 1.8,
            marginInline: "auto",
          }}
        >
          Enterprise-grade QA automation solutions designed for modern
          applications, cloud platforms, APIs, and mobile ecosystems.
        </p>
      </div>

      {/* Cards */}
      <div className="w-full max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {solutions.map((sol) => (
    <Card
      key={sol.id}
      sol={sol}
      active={active === sol.id}
      onClick={() =>
        setActive(active === sol.id ? null : sol.id)
      }
    />
  ))}
</div>
       
      </div>

      {/* CTA */}
      <div className="mt-16 mb-16">
        <Link
          href="/contact"
          style={{
            background: "#f97316",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "14px 30px",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            transition: "all 0.25s ease",
            textDecoration: "none",
          }}
        >
          Start Automation Journey
        </Link>
      </div>
    </div>
  );
}

interface CardProps {
  sol: {
    id: string;
    label: string;
    title: string;
    description: string;
    accent: string;
    tag: string;
    stats: string;
  };
  active: boolean;
  onClick: () => void;
}

function Card({ sol, active, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: active ? "#fff7ed" : "#ffffff",
        border: active
          ? "1px solid #f97316"
          : "1px solid #e4e4e7",
        borderRadius: 28,
        padding: 32,
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      {/* Tag */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "6px 12px",
          borderRadius: 999,
          background: "#fff7ed",
          border: "1px solid #fed7aa",
          color: "#ea580c",
          fontSize: 11,
          fontWeight: 600,
          marginBottom: 24,
        }}
      >
        {sol.tag}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "#18181b",
          lineHeight: 1.3,
          letterSpacing: "-0.03em",
          marginBottom: 14,
        }}
      >
        {sol.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "0.95rem",
          color: "#71717a",
          lineHeight: 1.8,
          marginBottom: 30,
        }}
      >
        {sol.description}
      </p>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
          borderTop: "1px solid #f4f4f5",
        }}
      >
        <span
          style={{
            color: "#f97316",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {sol.stats}
        </span>

        <span
          style={{
            color: "#18181b",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Explore →
        </span>
      </div>
    </div>
  );
}