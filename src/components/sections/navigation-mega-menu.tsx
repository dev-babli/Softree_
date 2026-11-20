/* eslint-disable softree-design/no-untokenized-design-literals */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Code2,
  ShieldCheck,
  Cloud,
  FileText,
  Network,
  LayoutDashboard,
  BrainCircuit,
  LineChart,
  Users,
  Sparkles,
  Workflow,
  Server,
  Layers,
  Database,
  Brain,
  Lightbulb,
  WandSparkles,
  HeartPulse,
  Truck,
  Building2,
  Globe2,
  Smartphone,
  Boxes,
  Cpu,
  CloudSnow,
  Factory,
  Link2,
  Grid2X2,
  Laptop,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type MegaMenuLink = {
  label: string;
  url: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
  group?: string;
};

export type MegaMenuGroup = {
  title: string;
  url?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
  links: MegaMenuLink[];
};

import { FluidFieldBackground } from "@/components/ui/fluid-field";

/* -------------------------------------------------------------------------- */
/*  Editorial Headlines and Introductions for Service Categories               */
/* -------------------------------------------------------------------------- */

const CATEGORY_META: Record<
  string,
  {
    eyebrow: string;
    introHeading: string;
    introDescription: string;
    introCtaText: string;
    introCtaUrl: string;
    featuredEyebrow: string;
    featuredHeading: string;
    featuredDescription: string;
    featuredImage: string;
    featuredCtaText: string;
    featuredCtaUrl: string;
  }
> = {
  "AI & Automation": {
    eyebrow: "AI & AUTOMATION",
    introHeading: "Build AI Solutions for Real Business Impact",
    introDescription:
      "Build intelligent agents, automate workflows and unlock AI-powered business innovation.",
    introCtaText: "Explore AI & Automation",
    introCtaUrl: "/services/ai-development-services",
    featuredEyebrow: "AI & AUTOMATION",
    featuredHeading: "Turn Strategy into Real Results",
    featuredDescription:
      "Build, scale, and deliver digital products with dedicated engineering squads.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Agentic Orchestration": {
    eyebrow: "AUTONOMOUS SYSTEMS",
    introHeading: "Autonomous Multi-Agent Systems at Scale & Intelligent Workflows.",
    introDescription:
      "Architect stateful multi-agent systems, collaborative agent pods, and LangChain/LangGraph pipelines to orchestrate complex operations.",
    introCtaText: "Explore Agentic Systems",
    introCtaUrl: "/solutions/ai-agents-development",
    featuredEyebrow: "AGENTIC ORCHESTRATION",
    featuredHeading: "Scale Autonomous Decision Workflows",
    featuredDescription:
      "Deploy multi-agent networks that coordinate, reason, and execute end-to-end tasks.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Testing & Quality Engineering": {
    eyebrow: "QUALITY & ASSURANCE",
    introHeading: "Zero-Defect Quality, Security & Autonomous AI Testing.",
    introDescription:
      "Ensure software reliability, security validation, and agentic AI accuracy across web, mobile, and mission-critical enterprise systems.",
    introCtaText: "Explore Quality Engineering",
    introCtaUrl: "/quality-engineering/automation-testing-services",
    featuredEyebrow: "QUALITY ENGINEERING",
    featuredHeading: "Elevate Software Excellence & Trust",
    featuredDescription:
      "Modernize QA pipelines with autonomous test generation and continuous compliance.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Document & Process Intelligence": {
    eyebrow: "INTELLIGENT PROCESSING",
    introHeading: "Automate Document Workflows & Extract Actionable Insights.",
    introDescription:
      "Extract structured data from unstructured contracts, invoices, and records with multimodal Document AI and Azure OpenAI systems.",
    introCtaText: "Explore Document Intelligence",
    introCtaUrl: "/solutions/document-ai-solutions",
    featuredEyebrow: "DOCUMENT & PROCESS INTELLIGENCE",
    featuredHeading: "Automate High-Volume Data Ingestion",
    featuredDescription:
      "Achieve straight-through document processing and remove manual data bottlenecks.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Microsoft & Business Applications": {
    eyebrow: "MICROSOFT ECOSYSTEM",
    introHeading: "Enterprise Low-Code, Cloud Solutions & Power Platform.",
    introDescription:
      "Optimize business operations and accelerate productivity with bespoke Power Apps, automated Power Automate flows, and Dataverse architectures.",
    introCtaText: "Explore Microsoft Solutions",
    introCtaUrl: "/services/offshore-power-platform-development",
    featuredEyebrow: "MICROSOFT APPLICATIONS",
    featuredHeading: "Unify Workflows Across Microsoft 365",
    featuredDescription:
      "Scale enterprise workflows with custom Power Apps and automated Power Platform flows.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Data & Analytics": {
    eyebrow: "DATA & ANALYTICS",
    introHeading: "Turn Enterprise Data into Actionable Insight & Strategic Value.",
    introDescription:
      "Transform raw data into real-time decision intelligence with modern analytics platforms like Power BI, Microsoft Fabric, Databricks, and Snowflake.",
    introCtaText: "Explore Data & Analytics",
    introCtaUrl: "/services/power-bi-development-services",
    featuredEyebrow: "DATA & ANALYTICS",
    featuredHeading: "Unified Lakehouse & Real-Time BI",
    featuredDescription:
      "Turn raw enterprise data into executive dashboards with Microsoft Fabric and Power BI.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Digital Engineering": {
    eyebrow: "ENGINEERING EXCELLENCE",
    introHeading: "High-Performance Web, Mobile & Cloud Applications.",
    introDescription:
      "Build scalable digital products, cloud-native microservices, bespoke customer portals, and modernize legacy software systems.",
    introCtaText: "Explore Digital Engineering",
    introCtaUrl: "/services/offshore-web-app-development",
    featuredEyebrow: "DIGITAL ENGINEERING",
    featuredHeading: "Ship Resilient Products at Market Speed",
    featuredDescription:
      "Scale your engineering velocity with dedicated developers, architects, and DevOps specialists.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Digital Workplace": {
    eyebrow: "DIGITAL WORKPLACE",
    introHeading: "Modern Collaboration Portals, Intranets & Digital Workspaces.",
    introDescription:
      "Empower your distributed workforce with secure SharePoint Online intranets, knowledge centers, and custom SPFx platform extensions.",
    introCtaText: "Explore Digital Workplace",
    introCtaUrl: "/services/offshore-sharepoint-development",
    featuredEyebrow: "DIGITAL WORKPLACE",
    featuredHeading: "Modern Collaboration & Intranet Portals",
    featuredDescription:
      "Connect and empower distributed teams across Microsoft 365 and SharePoint intranets.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "Migration & Modernization": {
    eyebrow: "MIGRATION & MODERNIZATION",
    introHeading: "Seamless Analytics, Lakehouse & Cloud Modernization.",
    introDescription:
      "Modernize legacy platforms with confidence: migrate Tableau, SQL Server, Azure Data Factory, and Synapse directly into Microsoft Fabric.",
    introCtaText: "Explore Modernization",
    introCtaUrl: "/services/tableau-migration-services",
    featuredEyebrow: "MIGRATION & MODERNIZATION",
    featuredHeading: "Seamless Analytics & Cloud Modernization",
    featuredDescription:
      "Migrate databases, BI reports, and ETL pipelines smoothly to Microsoft Fabric.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
  "AI for IT Services": {
    eyebrow: "AI FOR IT SERVICES",
    introHeading: "Next-Gen AI for IT Service Desks, AIOps & Incident Triage.",
    introDescription:
      "Accelerate IT service delivery, automated ticket triage, infrastructure anomaly detection, and autonomous Tier-1 support workflows.",
    introCtaText: "Explore AI for IT Services",
    introCtaUrl: "/industries/ai-for-it-services",
    featuredEyebrow: "IT OPERATIONS AI",
    featuredHeading: "Autonomous IT Services & Incident Deflection",
    featuredDescription:
      "Automate Tier-1/2 ticketing, runbook diagnostics, and multi-cloud observability with enterprise AI.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  },
};


const CASE_STUDY_CATEGORY_META: Record<
  string,
  {
    eyebrow: string;
    introHeading: string;
    introDescription: string;
    introCtaText: string;
    introCtaUrl: string;
    featuredEyebrow: string;
    featuredHeading: string;
    featuredDescription: string;
    featuredImage: string;
    featuredCtaText: string;
    featuredCtaUrl: string;
  }
> = {
  "AI & Automation": {
    eyebrow: "AI & AUTOMATION",
    introHeading: "Autonomous Multi-Agent Networks & Generative Copilots",
    introDescription:
      "Engineer production-grade AI agents, RAG architectures, and automated customer service copilots with verifiable business outcomes.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "AI & AUTOMATION",
    featuredHeading: "Customer Support Automation with AI Agent",
    featuredDescription:
      "Multi-agent reasoning system achieving 70%+ Tier-1 support deflection and autonomous resolution.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/intelligent-customer-support-automation-ai-agent",
  },
  "AI Automation": {
    eyebrow: "AI & AUTOMATION",
    introHeading: "Autonomous Multi-Agent Networks & Generative Copilots",
    introDescription:
      "Engineer production-grade AI agents, RAG architectures, and automated customer service copilots with verifiable business outcomes.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "AI & AUTOMATION",
    featuredHeading: "Customer Support Automation with AI Agent",
    featuredDescription:
      "Multi-agent reasoning system achieving 70%+ Tier-1 support deflection and autonomous resolution.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/intelligent-customer-support-automation-ai-agent",
  },
  "Power Apps & Platform": {
    eyebrow: "POWER APPS & PLATFORM",
    introHeading: "Enterprise Low-Code Apps & Dataverse Integrations",
    introDescription:
      "Modernize manual workflows, build canvas & model-driven apps, and connect business systems with Power Platform.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "POWER APPS & AUTOMATION",
    featuredHeading: "Employee Leave Management System",
    featuredDescription:
      "Automated multi-tier approvals, Outlook calendar sync, and Dataverse audit trails for enterprise workforce.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/enterprise-leave-management-system",
  },
  "Power Apps": {
    eyebrow: "POWER APPS & PLATFORM",
    introHeading: "Enterprise Low-Code Apps & Dataverse Integrations",
    introDescription:
      "Modernize manual workflows, build canvas & model-driven apps, and connect business systems with Power Platform.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "POWER APPS & AUTOMATION",
    featuredHeading: "Employee Leave Management System",
    featuredDescription:
      "Automated multi-tier approvals, Outlook calendar sync, and Dataverse audit trails for enterprise workforce.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/enterprise-leave-management-system",
  },
  "Data & Analytics": {
    eyebrow: "DATA & ANALYTICS",
    introHeading: "Executive BI, Microsoft Fabric Lakehouses & Telemetry",
    introDescription:
      "Turn fragmented databases into unified OneLake lakehouses, interactive Power BI executive dashboards, and real-time decision intelligence.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "DATA & ANALYTICS",
    featuredHeading: "Enterprise Fabric & Power BI Lakehouse",
    featuredDescription:
      "Modernized legacy data pipelines into Direct Lake mode for sub-second enterprise dashboard telemetry.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/enterprise-lakehouse-power-bi-modernization",
  },
  "SharePoint & SPFx": {
    eyebrow: "SHAREPOINT & SPFX",
    introHeading: "Modern Intranets, SPFx Solutions & M365 Portals",
    introDescription:
      "Transform corporate communications and document compliance with tailored SharePoint Online intranets and custom SPFx framework web parts.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "SHAREPOINT & SPFX",
    featuredHeading: "SharePoint Site Pages to PDF Export",
    featuredDescription:
      "High-fidelity document conversion and automated archival compliance for enterprise knowledge repositories.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/sharepoint-site-pages-to-pdf",
  },
  "Mobile Applications": {
    eyebrow: "MOBILE ENGINEERING",
    introHeading: "Enterprise iOS & Android Apps & Hardware Integrations",
    introDescription:
      "Deliver fluid cross-platform mobile apps with offline synchronization, device scanner controls, and native performance.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "MOBILE & IOT SOLUTIONS",
    featuredHeading: "Barcode Scanner App for Olympic Equipment",
    featuredDescription:
      "Streamlined audio equipment transfers and provided real-time inventory traceability for the 2026 Winter Olympics.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/barcode-scanner-app-audio-equipment-management",
  },
  "Mobile": {
    eyebrow: "MOBILE ENGINEERING",
    introHeading: "Enterprise iOS & Android Apps & Hardware Integrations",
    introDescription:
      "Deliver fluid cross-platform mobile apps with offline synchronization, device scanner controls, and native performance.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "MOBILE & IOT SOLUTIONS",
    featuredHeading: "Barcode Scanner App for Olympic Equipment",
    featuredDescription:
      "Streamlined audio equipment transfers and provided real-time inventory traceability for the 2026 Winter Olympics.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/barcode-scanner-app-audio-equipment-management",
  },
  "Web Applications": {
    eyebrow: "WEB & CLOUD PLATFORMS",
    introHeading: "Scalable Full-Stack Web Portals & Marketplace Systems",
    introDescription:
      "Engineer high-concurrency React/Next.js portals, multi-tenant SaaS backends, and digital commerce applications.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "DIGITAL PLATFORMS",
    featuredHeading: "Digital Learning & Student Management Platform",
    featuredDescription:
      "Modern education portal that boosted academic administrative efficiency by 60% with real-time analytics.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/digital-learning-management-platform",
  },
  "Web": {
    eyebrow: "WEB & CLOUD PLATFORMS",
    introHeading: "Scalable Full-Stack Web Portals & Marketplace Systems",
    introDescription:
      "Engineer high-concurrency React/Next.js portals, multi-tenant SaaS backends, and digital commerce applications.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "DIGITAL PLATFORMS",
    featuredHeading: "Digital Learning & Student Management Platform",
    featuredDescription:
      "Modern education portal that boosted academic administrative efficiency by 60% with real-time analytics.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/digital-learning-management-platform",
  },
  "Healthcare & Life Sciences": {
    eyebrow: "HEALTHCARE INTELLIGENCE",
    introHeading: "Clinical AI Copilots, Hospital Operations & EMR",
    introDescription:
      "Deploy HIPAA-compliant clinical copilots, hospital bed management agents, and automated EMR workflow integrations.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "HEALTHCARE INTELLIGENCE",
    featuredHeading: "Hospital Operations & Bed Management Agent",
    featuredDescription:
      "Autonomous triage routing, predictive bed occupancy forecasting, and clinical workflow coordination.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/hospital-operations-bed-management-agent",
  },
  "Healthcare": {
    eyebrow: "HEALTHCARE INTELLIGENCE",
    introHeading: "Clinical AI Copilots, Hospital Operations & EMR",
    introDescription:
      "Deploy HIPAA-compliant clinical copilots, hospital bed management agents, and automated EMR workflow integrations.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "HEALTHCARE INTELLIGENCE",
    featuredHeading: "Hospital Operations & Bed Management Agent",
    featuredDescription:
      "Autonomous triage routing, predictive bed occupancy forecasting, and clinical workflow coordination.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/hospital-operations-bed-management-agent",
  },
  "Logistics & Supply Chain": {
    eyebrow: "LOGISTICS & SUPPLY CHAIN",
    introHeading: "Autonomous Customs Compliance, Freight & Warehouse AI",
    introDescription:
      "Accelerate supply chain throughput with AI freight documentation agents, customs compliance verification, and predictive yard scheduling.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "LOGISTICS & SUPPLY CHAIN",
    featuredHeading: "AI Freight Documentation & Customs Agent",
    featuredDescription:
      "Automated commercial invoice parsing, HS code validation, and cross-border regulatory compliance checks.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/ai-freight-documentation-customs-compliance-agent",
  },
  "Logistics": {
    eyebrow: "LOGISTICS & SUPPLY CHAIN",
    introHeading: "Autonomous Customs Compliance, Freight & Warehouse AI",
    introDescription:
      "Accelerate supply chain throughput with AI freight documentation agents, customs compliance verification, and predictive yard scheduling.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "LOGISTICS & SUPPLY CHAIN",
    featuredHeading: "AI Freight Documentation & Customs Agent",
    featuredDescription:
      "Automated commercial invoice parsing, HS code validation, and cross-border regulatory compliance checks.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/ai-freight-documentation-customs-compliance-agent",
  },
};

// Compact, enterprise-grade descriptions tailored for sleek 2-column cards
const CATEGORY_SHORT_DESCS: Record<string, string> = {
  "AI & Automation": "Autonomous AI agents, LLM copilots & smart workflows",
  "AI Automation": "Autonomous AI agents, LLM copilots & smart workflows",
  "Power Apps & Platform": "Custom canvas apps, Power Automate RPA & Dataverse",
  "Power Apps": "Custom canvas apps, Power Automate RPA & Dataverse",
  "Data & Analytics": "Executive Power BI dashboards & Microsoft Fabric lakehouse",
  "SharePoint & SPFx": "Modern SharePoint Online intranets & custom SPFx web parts",
  "Mobile Applications": "High-performance iOS, Android & cross-platform apps",
  "Mobile": "High-performance iOS, Android & cross-platform apps",
  "Web Applications": "Modern Next.js platforms, SaaS portals & cloud apps",
  "Web": "Modern Next.js platforms, SaaS portals & cloud apps",
  "Healthcare & Life Sciences": "Clinical AI copilots, hospital bed management & HIPAA QA",
  "Healthcare": "Clinical AI copilots, hospital bed management & HIPAA QA",
  "Logistics & Supply Chain": "AI customs compliance, freight tracking & warehouse tools",
  "Logistics": "AI customs compliance, freight tracking & warehouse tools",
  "Agentic Orchestration":
    "Multi-agent systems, LangGraph pipelines & reasoning swarms",
  "Testing & Quality Engineering":
    "Continuous QA automation, cybersecurity VAPT & AI testing",
  "Document & Process Intelligence":
    "Multimodal Document AI, smart OCR & Azure OpenAI pipelines",
  "Microsoft & Business Applications":
    "Enterprise Power Apps, Power Automate & Dataverse solutions",
  "Microsoft & Data":
    "Enterprise Power Apps, Power Automate & Dataverse solutions",
  "Digital Engineering & Workspace":
    "Full-stack web apps, native mobile apps & cloud microservices",
  "Digital Engineering":
    "Full-stack web apps, native mobile apps & cloud microservices",
  "Digital Workplace":
    "Modern SharePoint Online intranets & custom SPFx portals",
  "Migration & Modernization":
    "Cloud migrations across Tableau, SQL Server, ADF & Fabric",
  "AI for IT Services":
    "Autonomous IT service desk, AIOps monitoring & incident triage",
};

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*  Services Mega Menu (Screenshot 2 Exact Design: Left Sidebar + Right Main) */
/* -------------------------------------------------------------------------- */

function BrainOutlineIcon({ className }: { className?: string }) {
  return <Brain className={cn("w-5 h-5 shrink-0", className)} strokeWidth={2.2} />;
}

function MicrosoftQuadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("w-5 h-5 shrink-0", className)} fill="none">
      <rect x="0.8" y="0.8" width="8.6" height="8.6" rx="1.5" fill="#F25022" />
      <rect x="10.6" y="0.8" width="8.6" height="8.6" rx="1.5" fill="#7FBA00" />
      <rect x="0.8" y="10.6" width="8.6" height="8.6" rx="1.5" fill="#00A4EF" />
      <rect x="10.6" y="10.6" width="8.6" height="8.6" rx="1.5" fill="#FFB900" />
    </svg>
  );
}

function CodeBracketsIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function CloudMigrationIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <polyline points="9 12 11.5 14.5 15.5 9.5" strokeWidth="2.4" />
    </svg>
  );
}

function RocketFlameIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-7.5 h-7.5 xl:w-8 xl:h-8 shrink-0", className)}
    >
      {/* Outer Flame (Orange) */}
      <path
        d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
        fill="#FF7A00"
      />
      {/* Core Flame (Yellow) */}
      <path
        d="M4.8 17.2c-.8.8-1.2 2.5-1.2 2.5s1.8-.4 2.5-1.2c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.3.1z"
        fill="#FFD200"
      />
      {/* Upper Wing */}
      <path
        d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"
        fill="#FF5812"
      />
      {/* Lower Wing */}
      <path
        d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
        fill="#FF5812"
      />
      {/* Main Fuselage */}
      <path
        d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
        fill="#FF5812"
      />
      {/* Circular Porthole Window Outer */}
      <circle cx="15" cy="9" r="2.2" fill="#FFFFFF" />
      {/* Porthole Inner Ring/Reflection */}
      <circle cx="15" cy="9" r="1.3" fill="#FFEFE5" />
    </svg>
  );
}

function BotFaceIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Top Antenna with small ball */}
      <line x1="12" y1="1.5" x2="12" y2="5" strokeWidth="2.2" />
      <circle cx="12" cy="1.5" r="1.2" fill="currentColor" stroke="none" />
      {/* Head Frame */}
      <rect x="3.5" y="5" width="17" height="15" rx="4" />
      {/* Eyes */}
      <circle cx="8.5" cy="11.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="11.5" r="1.5" fill="currentColor" stroke="none" />
      {/* Smiling Mouth */}
      <path d="M9 15.5c.8.9 1.8 1.4 3 1.4s2.2-.5 3-1.4" strokeWidth="2" strokeLinecap="round" />
      {/* Side Ears */}
      <line x1="1.5" y1="12.5" x2="3.5" y2="12.5" strokeWidth="2.2" />
      <line x1="20.5" y1="12.5" x2="22.5" y2="12.5" strokeWidth="2.2" />
    </svg>
  );
}

function InterlockingChainIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2" />
      <rect x="8.25" y="8.25" width="7.5" height="7.5" rx="2" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="2" />
    </svg>
  );
}

function NeuralPlatformIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Left Brain Hemisphere with 3 curved lobes */}
      <path
        d="M12 3.5c-2.8 0-5.2 1.6-5.5 4.2-.3 2.2.8 3.6.8 4.3 0 1-1.3 2.2-1.3 4 0 2.5 2.5 4.5 6 4.5"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M8 12c1.2 0 2.2-.6 2.8-1.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Center Spine */}
      <line x1="12" y1="3.5" x2="12" y2="20.5" strokeWidth="2.2" strokeLinecap="round" />
      {/* 3 Right Circuit Branches with Terminal Dots */}
      {/* Top Branch (goes right then UP with dot) */}
      <path d="M12 7.5h5v-3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="4.5" r="1.4" fill="currentColor" stroke="none" />
      {/* Middle Branch (straight right with dot) */}
      <path d="M12 12h7.5" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="19.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
      {/* Bottom Branch (goes right then DOWN with dot) */}
      <path d="M12 16.5h5v3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="19.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IsometricLayersIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </svg>
  );
}

function SettingsGearIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

function ClusterNodesIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5.5" cy="17.5" r="2.5" />
      <circle cx="18.5" cy="17.5" r="2.5" />
      <line x1="10.2" y1="7.2" x2="7.3" y2="15.2" />
      <line x1="13.8" y1="7.2" x2="16.7" y2="15.2" />
      <line x1="8" y1="17.5" x2="16" y2="17.5" />
    </svg>
  );
}


function HeartPulseIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l1.5-3 2 6 1.5-3h6.28" />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-5v10Z" />
      <circle cx="7" cy="18.5" r="2.5" />
      <circle cx="17" cy="18.5" r="2.5" />
    </svg>
  );
}

function ServerIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="20" height="8" rx="2" />
      <rect x="2" y="13" width="20" height="8" rx="2" />
      <line x1="6" y1="7" x2="6.01" y2="7" strokeWidth="2.5" />
      <line x1="6" y1="17" x2="6.01" y2="17" strokeWidth="2.5" />
    </svg>
  );
}

function LayoutDashboardIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function BarChartIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  );
}

function SmartphoneIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
    </svg>
  );
}

interface ServiceSubLink {
  label: string;
  url: string;
  description?: string;
}

interface ServiceSubColumn {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeBg: string;
  badgeText: string;
  links: ServiceSubLink[];
}

interface ServiceFeatureCard {
  title: string;
  description: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ServiceCategoryData {
  id: string;
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  isCustomIcon?: boolean;
  rocketSubtitle: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerExploreLabel: string;
  bannerExploreUrl: string;
  featureCards: ServiceFeatureCard[];
  columns: ServiceSubColumn[];
}

export const SERVICES_NAV_DATA: ServiceCategoryData[] = [
  {
    id: "ai-automation",
    title: "AI & Intelligent Automation",
    description: "Autonomous AI agents, LLM copilots & smart workflows",
    icon: BrainOutlineIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our AI experts for a custom roadmap.",
    bannerTitle: "Core AI Services",
    bannerSubtitle: "Our three key AI offerings for enterprise transformation",
    bannerExploreLabel: "",
    bannerExploreUrl: "",
    featureCards: [
      {
        title: "01. AI Development Services",
        description: "Build custom copilots, agentic workflows, and production RAG pipelines.",
        url: "/services/ai-development-services",
        icon: BotFaceIcon,
      },
      {
        title: "02. Amazon Bedrock AgentCore",
        description: "Autonomous cloud agents, Claude integrations, and enterprise knowledge bases.",
        url: "/services/amazon-bedrock-agentcore-development",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. Amazon Nova 2 Sonic Solutions",
        description: "Real-time conversational voice agents, audio intelligence & automated workflows.",
        url: "/services/amazon-nova-2-sonic-solutions",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "AI Agent Services",
        subtitle: "Specialized AI agent capabilities",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          {
            label: "AI Agents Development",
            url: "/solutions/ai-agents-development",
            description: "Autonomous reasoning agents executing complex multi-step workflows",
          },
          {
            label: "AI Chatbot Development",
            url: "/solutions/ai-chatbot-development",
            description: "Contextual conversational assistants with omni-channel integration",
          },
          {
            label: "Multi-Agent Systems",
            url: "/services/multi-agent-systems-development",
            description: "Collaborative multi-agent networks coordinating across business domains",
          },
          {
            label: "LangChain Development",
            url: "/solutions/lang-chain-development",
            description: "Production LLM pipelines with structured outputs, tools & memory",
          },
          {
            label: "LangGraph Development",
            url: "/solutions/lang-graph-development",
            description: "Stateful agent graphs, cyclical workflows & human-in-the-loop logic",
          },
        ],
      },
      {
        title: "AI Automation Services",
        subtitle: "Process and workflow automation",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          {
            label: "AI Consulting Services",
            url: "/services/ai-consulting-services",
            description: "Strategic AI roadmaps, technical feasibility & deployment advisory",
          },
          {
            label: "AI Copilot Development",
            url: "/solutions/ai-copilot-development",
            description: "Context-aware AI copilots embedded directly into employee workflows",
          },
          {
            label: "Document AI Solutions",
            url: "/solutions/document-ai-solutions",
            description: "Automated OCR extraction from unstructured PDFs, invoices & contracts",
          },
        ],
      },
      {
        title: "Enterprise AI Technologies",
        subtitle: "Platform and model capabilities",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          {
            label: "Generative AI Development",
            url: "/services/generative-ai",
            description: "Production LLM applications with fine-tuning & safety guardrails",
          },
          {
            label: "Azure OpenAI Solutions",
            url: "/solutions/azure-openai-development",
            description: "Private, enterprise-grade GPT-4 integrations on dedicated Azure cloud",
          },
          {
            label: "Enterprise RAG Development",
            url: "/solutions/enterprise-rag-development",
            description: "Secure Retrieval-Augmented Generation with hybrid vector search",
          },
        ],
      },
    ],
  },
  {
    id: "microsoft-data",
    title: "Microsoft Ecosystem & Data Engineering",
    description: "Enterprise Power Apps, Power Automate & Dataverse solutions",
    icon: MicrosoftQuadIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our certified Microsoft & Fabric architects.",
    bannerTitle: "Microsoft & Data Platform",
    bannerSubtitle: "Certified enterprise Power Platform, Fabric & cloud lakehouse solutions",
    bannerExploreLabel: "",
    bannerExploreUrl: "",
    featureCards: [
      {
        title: "01. Power Platform",
        description: "Enterprise low-code apps, automated business workflows & Dataverse.",
        url: "/services/offshore-power-platform-development",
        icon: BotFaceIcon,
      },
      {
        title: "02. Microsoft Fabric",
        description: "Next-gen unified analytics lakehouse, OneLake architecture & Synapse.",
        url: "/services/microsoft-fabric-development-services",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. Power BI Analytics",
        description: "Interactive Power BI dashboards and data visualization for smarter business decisions.",
        url: "/services/power-bi-development-services",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "Power Platform Services",
        subtitle: "Apps & business analytics",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          {
            label: "Power Apps",
            url: "/services/offshore-power-platform-development",
            description: "Custom low-code business applications connected to Dataverse & M365",
          },
        ],
      },
      {
        title: "Data & Analytics",
        subtitle: "Business intelligence and unified data platforms",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          {
            label: "Power BI",
            url: "/services/power-bi-development-services",
            description: "Executive dashboards, KPI telemetry & interactive business analytics",
          },
          {
            label: "Microsoft Fabric",
            url: "/services/microsoft-fabric-development-services",
            description: "Unified OneLake analytics, lakehouse architecture & real-time compute",
          },
        ],
      },
      {
        title: "Cloud Data Warehouses",
        subtitle: "Scalable big data & modern analytics",
        icon: ClusterNodesIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          {
            label: "Databricks",
            url: "/services/power-bi-development-services",
            description: "High-performance Apache Spark data engineering & production ML pipelines",
          },
          {
            label: "Snowflake",
            url: "/services/power-bi-development-services",
            description: "Elastic cloud data warehousing, data mesh & secure enterprise sharing",
          },
        ],
      },
    ],
  },
  {
    id: "digital-engineering",
    title: "Application & Digital Engineering",
    description: "Full-stack web apps, native mobile apps & cloud microservices",
    icon: CodeBracketsIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our engineering leads for full-stack squads.",
    bannerTitle: "Core Digital Engineering",
    bannerSubtitle: "Web applications, native mobile apps & enterprise digital workplaces",
    bannerExploreLabel: "",
    bannerExploreUrl: "",
    featureCards: [
      {
        title: "01. Web Applications",
        description: "High-scale cloud-native web apps, SaaS products & APIs.",
        url: "/services/offshore-web-app-development",
        icon: BotFaceIcon,
      },
      {
        title: "02. Mobile Applications",
        description: "Native iOS & Android apps with modern cross-platform tech.",
        url: "/services/offshore-mobile-app-development",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. Modern Workplace",
        description: "SharePoint Online intranets, custom SPFx & employee hubs.",
        url: "/services/offshore-sharepoint-development",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "Custom Engineering",
        subtitle: "Full-stack web & native mobile apps",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          {
            label: "Web Applications",
            url: "/services/offshore-web-app-development",
            description: "High-concurrency React/Next.js portals with cloud-native backends",
          },
          {
            label: "Mobile Applications",
            url: "/services/offshore-mobile-app-development",
            description: "Feature-rich native iOS & Android applications with fluid interactions",
          },
        ],
      },
      {
        title: "Modern Workplace",
        subtitle: "Enterprise collaboration & intranets",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          {
            label: "SharePoint Online",
            url: "/services/offshore-sharepoint-development",
            description: "Corporate intranet portals, document management & knowledge repositories",
          },
          {
            label: "SPFx Development",
            url: "/services/offshore-spfx-development",
            description: "Custom SharePoint Framework extensions & Microsoft 365 web parts",
          },
        ],
      },
      {
        title: "Legacy Modernization",
        subtitle: "Refactoring, cloud-native & microservices",
        icon: ClusterNodesIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          {
            label: "Legacy Modernization",
            url: "/services/legacy-application-modernization",
            description: "Monolith to microservices refactoring & cloud-native modernizations",
          },
        ],
      },
    ],
  },
  {
    id: "migration-modernization",
    title: "Cloud & Data Migration",
    description: "Cloud migrations across Tableau, SQL Server, ADF & Fabric",
    icon: CloudMigrationIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our migration specialists for a seamless data transition.",
    bannerTitle: "Cloud Migration & Modernization",
    bannerSubtitle: "Risk-free migrations across Tableau, SQL Server, ADF & Microsoft Fabric",
    bannerExploreLabel: "",
    bannerExploreUrl: "",
    featureCards: [
      {
        title: "01. Tableau Migrations",
        description: "Full migration from Tableau Server to Tableau Cloud or Power BI.",
        url: "/services/tableau-migration-services",
        icon: BotFaceIcon,
      },
      {
        title: "02. SQL Server to Fabric",
        description: "Modernize on-prem databases to Microsoft Fabric OneLake & Lakehouse.",
        url: "/services/sql-server-to-microsoft-fabric-migration",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. Cloud Modernization",
        description: "Azure Synapse & ADF pipelines to Fabric with zero business downtime.",
        url: "/services/azure-synapse-to-microsoft-fabric-migration",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "Tableau Migrations",
        subtitle: "Cloud & Power BI migrations",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          {
            label: "Tableau Migration Services",
            url: "/services/tableau-migration-services",
            description: "Frictionless migration from legacy Tableau to modern cloud analytics",
          },
          {
            label: "Tableau to Power BI Migration",
            url: "/services/tableau-to-power-bi-migration",
            description: "Modernize Tableau reports & dashboards into Microsoft Power BI",
          },
          {
            label: "Tableau Server to Tableau Cloud Migration",
            url: "/services/tableau-server-to-tableau-cloud-migration",
            description: "Zero-downtime migration of workbooks, security & permissions to cloud",
          },
        ],
      },
      {
        title: "Data Platform Migrations",
        subtitle: "Warehouse & SQL to Fabric",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          {
            label: "Azure Synapse to Fabric Migration",
            url: "/services/azure-synapse-to-microsoft-fabric-migration",
            description: "Modernize dedicated SQL pools and ETL pipelines into Microsoft Fabric",
          },
          {
            label: "SQL Server to Microsoft Fabric Migration",
            url: "/services/sql-server-to-microsoft-fabric-migration",
            description: "Schema and pipeline migration from on-prem SQL to Fabric OneLake",
          },
        ],
      },
      {
        title: "Pipeline & Model Migrations",
        subtitle: "Data pipeline & Direct Lake mode",
        icon: ClusterNodesIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          {
            label: "Azure Data Factory to Microsoft Fabric",
            url: "/services/azure-data-factory-to-microsoft-fabric-migration",
            description: "Automate transition of legacy ADF pipelines into Fabric Data Factory",
          },
          {
            label: "Power BI to Microsoft Fabric Migration",
            url: "/services/power-bi-to-microsoft-fabric-migration",
            description: "Direct Lake mode integration for high-speed enterprise Power BI models",
          },
        ],
      },
    ],
  },
  {
    id: "testing-quality",
    title: "Quality Engineering & Assurance",
    description: "Continuous QA automation, cybersecurity VAPT & AI testing",
    icon: ShieldCheckIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our QA architects for an automated testing audit.",
    bannerTitle: "Core Quality Engineering",
    bannerSubtitle: "Continuous automated testing, cybersecurity VAPT & AI validation",
    bannerExploreLabel: "",
    bannerExploreUrl: "",
    featureCards: [
      {
        title: "01. Automation Testing",
        description: "Continuous automated test suites across web, mobile, API & enterprise apps.",
        url: "/quality-engineering/automation-testing-services",
        icon: BotFaceIcon,
      },
      {
        title: "02. Security Testing & VAPT",
        description: "Penetration testing, OWASP Top 10 vulnerability assessments & DevSecOps.",
        url: "/quality-engineering/security-testing-services",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. Agentic AI Testing",
        description: "Testing AI agent hallucinations, drift, prompt injections & guardrails.",
        url: "/quality-engineering/agentic-ai-testing-services",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "Automated QA & Security",
        subtitle: "Full-spectrum testing & cybersecurity",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          {
            label: "Automation Testing Services",
            url: "/quality-engineering/automation-testing-services",
            description: "Continuous automated test suites across web, mobile, API & enterprise apps",
          },
          {
            label: "Security Testing Services",
            url: "/quality-engineering/security-testing-services",
            description: "Penetration testing, OWASP Top 10 vulnerability assessments & DevSecOps",
          },
        ],
      },
      {
        title: "AI Quality Assurance",
        subtitle: "Agent validation & guardrails",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          {
            label: "Agentic AI Testing Services",
            url: "/quality-engineering/agentic-ai-testing-services",
            description: "Testing AI agent hallucinations, drift, prompt injections & guardrails",
          },
        ],
      },
      {
        title: "Industry Software Testing",
        subtitle: "Domain compliance & logistics QA",
        icon: ClusterNodesIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          {
            label: "Healthcare Software Testing Services",
            url: "/industries/healthcare-software-testing-services",
            description: "HIPAA/FDA verification, EHR interoperability & digital health compliance QA",
          },
          {
            label: "Logistics Testing Services",
            url: "/quality-engineering/logistics-testing-services",
            description: "Comprehensive testing across TMS, WMS, EDI protocols & fleet logistics",
          },
        ],
      },
    ],
  },
];


export const INDUSTRIES_NAV_DATA: ServiceCategoryData[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    icon: HeartPulseIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our healthcare tech architects for HIPAA-compliant solutions.",
    bannerTitle: "Healthcare AI Solutions",
    bannerSubtitle: "Clinical AI copilots, hospital bed management & HIPAA QA",
    bannerExploreLabel: "",
    bannerExploreUrl: "",
    featureCards: [
      {
        title: "01. Healthcare AI",
        description: "Custom AI diagnostic workflows, patient intake copilots & clinical documentation.",
        url: "/industries/healthcare-ai-solutions",
        icon: BotFaceIcon,
      },
      {
        title: "02. Healthcare QA & Testing",
        description: "HIPAA-compliant validation, EHR interoperability testing & clinical accuracy QA.",
        url: "/industries/healthcare-software-testing-services",
        icon: InterlockingChainIcon,
      },

    ],
    columns: [
      {
        title: "Healthcare AI Solutions",
        subtitle: "AI diagnostics & patient copilots",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          {
            label: "Healthcare AI Solutions",
            url: "/industries/healthcare-ai-solutions",
            description: "Clinical copilots, medical document AI & patient engagement platforms",
          },
        ],
      },
      {
        title: "Healthcare QA & Testing",
        subtitle: "HIPAA validation & EHR testing",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          {
            label: "Healthcare Software Testing Services",
            url: "/industries/healthcare-software-testing-services",
            description: "HIPAA-compliant software validation, EHR integration testing & security",
          },
        ],
      },
    ],
  },
  {
    id: "logistics",
    title: "Logistics & Supply Chain",
    icon: TruckIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our supply chain engineers for route & WMS automation.",
    bannerTitle: "Logistics & Supply Chain",
    bannerSubtitle: "AI customs compliance, freight tracking & warehouse tools",
    bannerExploreLabel: "",
    bannerExploreUrl: "",
    featureCards: [
      {
        title: "01. Logistics Engineering",
        description: "AI-driven route optimization, automated document processing & carrier APIs.",
        url: "/industries/offshore-logistics-supply-chain-engineering",
        icon: BotFaceIcon,
      },
      {
        title: "02. Logistics Testing Services",
        description: "WMS/TMS load testing, customs compliance verification & EDI testing.",
        url: "/quality-engineering/logistics-testing-services",
        icon: InterlockingChainIcon,
      },
    ],
    columns: [
      {
        title: "Logistics Engineering",
        subtitle: "Route optimization & tracking",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          {
            label: "Logistics Engineering Excellence",
            url: "/industries/offshore-logistics-supply-chain-engineering",
            description: "AI route optimization, real-time tracking & warehouse software solutions",
          },
        ],
      },
      {
        title: "Logistics QA & Testing",
        subtitle: "WMS & customs QA testing",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          {
            label: "Logistics Testing Services",
            url: "/quality-engineering/logistics-testing-services",
            description: "Comprehensive testing across TMS, WMS, EDI protocols & fleet logistics",
          },
        ],
      },
    ],
  },
  {
    id: "ai-it-services",
    title: "AI for IT Services",
    icon: ServerIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our AIOps leads for autonomous service desk solutions.",
    bannerTitle: "AI for IT Services",
    bannerSubtitle: "Autonomous IT service desk, AIOps monitoring & Tier-1 ticket deflection",
    bannerExploreLabel: "",
    bannerExploreUrl: "",
    featureCards: [
      {
        title: "01. AI for IT Services & Solutions",
        description: "Intelligent Tier-1 ticket deflection and automated incident resolution pipelines.",
        url: "/industries/ai-for-it-services",
        icon: BotFaceIcon,
      },
    ],
    columns: [
      {
        title: "AI for IT Services",
        subtitle: "Tier-1 deflection & triage",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          {
            label: "AI for IT Services & Solutions",
            url: "/industries/ai-for-it-services",
            description: "Autonomous IT service desk, AIOps monitoring & Tier-1 ticket deflection",
          },
        ],
      },
    ],
  },
];

export const CASE_STUDIES_NAV_DATA: ServiceCategoryData[] = [
  {
    id: "cs-ai-automation",
    title: "AI & Automation",
    icon: BrainOutlineIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our AI leads for proven enterprise deployment case studies.",
    bannerTitle: "AI & Automation Case Studies",
    bannerSubtitle: "Autonomous agent networks, enterprise RAG copilots & LLM workflows",
    bannerExploreLabel: "Explore AI Case Studies",
    bannerExploreUrl: "/case-studies/ai",
    featureCards: [
      {
        title: "01. Multi-Agent Reasoning Swarms",
        description: "Deployed collaborative agent networks automating complex operations.",
        url: "/case-studies/ai",
        icon: BotFaceIcon,
      },
      {
        title: "02. Enterprise Knowledge RAG",
        description: "Hybrid vector search across 500k+ documents with zero hallucination.",
        url: "/case-studies/ai",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. Document AI Pipeline",
        description: "Automated OCR extraction from invoices, contracts and claims at scale.",
        url: "/case-studies/ai",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "Autonomous Systems",
        subtitle: "Agent networks & LangGraph",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          { label: "Multi-Agent Systems", url: "/case-studies/ai" },
          { label: "LangGraph Pipelines", url: "/case-studies/ai" },
        ],
      },
      {
        title: "Copilots & GenAI",
        subtitle: "Enterprise LLM applications",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          { label: "Enterprise Copilots", url: "/case-studies/ai" },
          { label: "Azure OpenAI Hub", url: "/case-studies/ai" },
        ],
      },
      {
        title: "Cognitive Automation",
        subtitle: "Document & speech intelligence",
        icon: ClusterNodesIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          { label: "Document AI Workflows", url: "/case-studies/ai" },
          { label: "Voice AI & Speech", url: "/case-studies/ai" },
        ],
      },
    ],
  },
  {
    id: "cs-power-platform",
    title: "Power Apps & Platform",
    icon: LayoutDashboardIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our Microsoft architects for low-code transformation impact.",
    bannerTitle: "Power Platform Case Studies",
    bannerSubtitle: "Enterprise canvas apps, Dataverse architecture & Power Automate RPA",
    bannerExploreLabel: "Explore Platform Studies",
    bannerExploreUrl: "/case-studies/power-platform",
    featureCards: [
      {
        title: "01. Enterprise Canvas Apps",
        description: "Modernized legacy spreadsheet workflows into scalable canvas apps.",
        url: "/case-studies/power-platform",
        icon: BotFaceIcon,
      },
      {
        title: "02. Multi-Stage RPA Flows",
        description: "Power Automate bots synchronizing ERP, CRM & email approval chains.",
        url: "/case-studies/power-platform",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. Model-Driven Architecture",
        description: "Scalable Dataverse database design with enterprise role-based security.",
        url: "/case-studies/power-platform",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "Low-Code Apps",
        subtitle: "Canvas & model-driven solutions",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          { label: "Canvas & Model-Driven Apps", url: "/case-studies/power-platform" },
        ],
      },
      {
        title: "RPA & Workflows",
        subtitle: "Power Automate bots",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          { label: "Power Automate Solutions", url: "/case-studies/power-platform" },
        ],
      },
      {
        title: "Dataverse Integration",
        subtitle: "Enterprise data model",
        icon: ClusterNodesIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          { label: "Dataverse Architecture", url: "/case-studies/power-platform" },
        ],
      },
    ],
  },
  {
    id: "cs-data-analytics",
    title: "Data & Analytics",
    icon: BarChartIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our data leads for BI telemetry & lakehouse modernization.",
    bannerTitle: "Data & Analytics Case Studies",
    bannerSubtitle: "Executive Power BI dashboards, Microsoft Fabric lakehouse & Databricks",
    bannerExploreLabel: "Explore Data Studies",
    bannerExploreUrl: "/case-studies/data-analytics",
    featureCards: [
      {
        title: "01. Executive Power BI",
        description: "High-performance telemetry dashboards tracking real-time enterprise KPIs.",
        url: "/case-studies/data-analytics",
        icon: BotFaceIcon,
      },
      {
        title: "02. Fabric Lakehouse",
        description: "Unified OneLake storage with Direct Lake semantic models for zero-copy queries.",
        url: "/case-studies/data-analytics",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. Cloud Data Engineering",
        description: "Databricks and Snowflake scalable data pipelines processing billions of rows.",
        url: "/case-studies/data-analytics",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "Power BI Analytics",
        subtitle: "Executive KPI portals",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          { label: "Power BI Executive Portals", url: "/case-studies/data-analytics" },
        ],
      },
      {
        title: "Fabric Lakehouse",
        subtitle: "OneLake migrations",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          { label: "OneLake Migrations", url: "/case-studies/data-analytics" },
        ],
      },
      {
        title: "Cloud Warehouses",
        subtitle: "Databricks & Snowflake",
        icon: ClusterNodesIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          { label: "Databricks & Snowflake", url: "/case-studies/data-analytics" },
        ],
      },
    ],
  },
  {
    id: "cs-sharepoint-spfx",
    title: "SharePoint & SPFx",
    icon: BuildingIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our M365 architects for digital workplace transformations.",
    bannerTitle: "SharePoint & SPFx Case Studies",
    bannerSubtitle: "Corporate intranets, custom SPFx web parts & Microsoft 365 hubs",
    bannerExploreLabel: "Explore SharePoint Studies",
    bannerExploreUrl: "/case-studies/sharepoint",
    featureCards: [
      {
        title: "01. Enterprise Intranets",
        description: "Modern SharePoint Online portals uniting distributed global workforces.",
        url: "/case-studies/sharepoint",
        icon: BotFaceIcon,
      },
      {
        title: "02. Custom SPFx Extensions",
        description: "React-powered SPFx web parts integrated with Microsoft Teams & Graph.",
        url: "/case-studies/sharepoint",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. Document Management",
        description: "Automated retention policies, metadata tagging & search optimization.",
        url: "/case-studies/sharepoint",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "Intranet Portals",
        subtitle: "SharePoint Online modern hubs",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          { label: "SharePoint Online Modern Hubs", url: "/case-studies/sharepoint" },
        ],
      },
      {
        title: "SPFx Engineering",
        subtitle: "Custom SPFx solutions",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          { label: "Custom SPFx Solutions", url: "/case-studies/sharepoint" },
        ],
      },
      {
        title: "M365 Collaboration",
        subtitle: "Teams & Viva integrations",
        icon: ClusterNodesIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          { label: "Teams & Viva Integrations", url: "/case-studies/sharepoint" },
        ],
      },
    ],
  },
  {
    id: "cs-mobile-apps",
    title: "Mobile Applications",
    icon: SmartphoneIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our mobile leads for iOS, Android & cross-platform apps.",
    bannerTitle: "Mobile Engineering Case Studies",
    bannerSubtitle: "Native iOS, Android & cross-platform Flutter/React Native solutions",
    bannerExploreLabel: "Explore Mobile Studies",
    bannerExploreUrl: "/case-studies/mobile",
    featureCards: [
      {
        title: "01. Native iOS & Android",
        description: "High-fidelity mobile apps with offline synchronization & biometric auth.",
        url: "/case-studies/mobile",
        icon: BotFaceIcon,
      },
      {
        title: "02. Cross-Platform Speed",
        description: "Unified codebase apps delivering 60fps performance across devices.",
        url: "/case-studies/mobile",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. Mobile Cloud Sync",
        description: "Real-time WebSocket event streaming and low-latency API backends.",
        url: "/case-studies/mobile",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "Native Apps",
        subtitle: "iOS & Android engineering",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          { label: "iOS & Android Engineering", url: "/case-studies/mobile" },
        ],
      },
      {
        title: "Cross-Platform",
        subtitle: "Flutter & React Native",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          { label: "Flutter & React Native", url: "/case-studies/mobile" },
        ],
      },
      {
        title: "Mobile Backends",
        subtitle: "Cloud API integration",
        icon: ClusterNodesIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          { label: "Cloud API Integration", url: "/case-studies/mobile" },
        ],
      },
    ],
  },
  {
    id: "cs-web-apps",
    title: "Web Applications",
    icon: CodeBracketsIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our full-stack leads for cloud-native web SaaS applications.",
    bannerTitle: "Web Engineering Case Studies",
    bannerSubtitle: "Next.js SaaS platforms, scalable web portals & microservices",
    bannerExploreLabel: "Explore Web Studies",
    bannerExploreUrl: "/case-studies/web",
    featureCards: [
      {
        title: "01. SaaS Platforms",
        description: "Multi-tenant cloud applications serving millions of active users.",
        url: "/case-studies/web",
        icon: BotFaceIcon,
      },
      {
        title: "02. High-Traffic Portals",
        description: "Sub-second response times with edge caching and serverless compute.",
        url: "/case-studies/web",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. Cloud Microservices",
        description: "Resilient event-driven architectures deployed on AWS and Azure Kubernetes.",
        url: "/case-studies/web",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "SaaS Engineering",
        subtitle: "Full-stack SaaS platforms",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          { label: "Full-Stack SaaS Platforms", url: "/case-studies/web" },
        ],
      },
      {
        title: "Next.js Portals",
        subtitle: "Modern Next.js solutions",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          { label: "Modern Next.js Solutions", url: "/case-studies/web" },
        ],
      },
      {
        title: "Microservices",
        subtitle: "Cloud microservices",
        icon: ClusterNodesIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          { label: "Cloud Microservices", url: "/case-studies/web" },
        ],
      },
    ],
  },
  {
    id: "cs-healthcare",
    title: "Healthcare & Life Sciences",
    icon: HeartPulseIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our healthcare engineers for HIPAA compliance case studies.",
    bannerTitle: "Healthcare Case Studies",
    bannerSubtitle: "Clinical AI copilots, hospital bed management & HIPAA compliance",
    bannerExploreLabel: "Explore Healthcare Studies",
    bannerExploreUrl: "/case-studies?industry=healthcare",
    featureCards: [
      {
        title: "01. Clinical Intake AI",
        description: "Reduced patient onboarding wait times by 75% with automated intake copilots.",
        url: "/case-studies?industry=healthcare",
        icon: BotFaceIcon,
      },
      {
        title: "02. Bed Management Portal",
        description: "Real-time bed availability tracking integrated with hospital EHR systems.",
        url: "/case-studies?industry=healthcare",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. HIPAA Audit QA",
        description: "Zero compliance violations across comprehensive third-party VAPT audits.",
        url: "/case-studies?industry=healthcare",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "Clinical Copilots",
        subtitle: "Patient intake AI systems",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          { label: "Patient Intake AI Systems", url: "/case-studies?industry=healthcare" },
        ],
      },
      {
        title: "Hospital Operations",
        subtitle: "EHR bed management portals",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          { label: "EHR Bed Management Portals", url: "/case-studies?industry=healthcare" },
        ],
      },
      {
        title: "Security & Compliance",
        subtitle: "HIPAA QA & security audits",
        icon: ClusterNodesIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          { label: "HIPAA QA & Security Audits", url: "/case-studies?industry=healthcare" },
        ],
      },
    ],
  },
  {
    id: "cs-logistics",
    title: "Logistics & Supply Chain",
    icon: TruckIcon,
    isCustomIcon: true,
    rocketSubtitle: "Talk to our supply chain architects for warehouse & fleet case studies.",
    bannerTitle: "Logistics Case Studies",
    bannerSubtitle: "AI customs compliance, freight tracking & warehouse intelligence",
    bannerExploreLabel: "Explore Logistics Studies",
    bannerExploreUrl: "/case-studies?industry=logistics",
    featureCards: [
      {
        title: "01. Customs AI Compliance",
        description: "Automated bill-of-lading classification accelerating clearance times.",
        url: "/case-studies?industry=logistics",
        icon: BotFaceIcon,
      },
      {
        title: "02. Freight Telemetry",
        description: "End-to-end container tracking with predictive ETA machine learning models.",
        url: "/case-studies?industry=logistics",
        icon: InterlockingChainIcon,
      },
      {
        title: "03. WMS Load Testing",
        description: "Stress-tested enterprise warehouse management system handling peak loads.",
        url: "/case-studies?industry=logistics",
        icon: NeuralPlatformIcon,
      },
    ],
    columns: [
      {
        title: "Customs AI",
        subtitle: "Automated document clearance",
        icon: IsometricLayersIcon,
        badgeBg: "bg-[#EEF0FF]",
        badgeText: "text-[#5551FF]",
        links: [
          { label: "Automated Document Clearance", url: "/case-studies?industry=logistics" },
        ],
      },
      {
        title: "Freight Intelligence",
        subtitle: "Container telemetry portals",
        icon: SettingsGearIcon,
        badgeBg: "bg-[#E6F7FF]",
        badgeText: "text-[#0091FF]",
        links: [
          { label: "Container Telemetry Portals", url: "/case-studies?industry=logistics" },
        ],
      },
      {
        title: "Warehouse Performance",
        subtitle: "WMS performance testing",
        icon: ClusterNodesIcon,
        badgeBg: "bg-[#E6F9F0]",
        badgeText: "text-[#00A854]",
        links: [
          { label: "WMS Performance Testing", url: "/case-studies?industry=logistics" },
        ],
      },
    ],
  },
];

export function UnifiedMegaMenu({
  categories,
  onClose,
}: {
  categories: ServiceCategoryData[];
  onClose: () => void;
}) {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const currentCategory = categories[activeCategoryIdx] ?? categories[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.995 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      tabIndex={0}
      className="mx-auto w-full max-w-[1320px] xl:max-w-[1380px] overflow-hidden rounded-[20px] xl:rounded-[24px] border border-black/[0.08] bg-white shadow-[0_24px_70px_-15px_rgba(10,10,26,0.14),0_4px_16px_rgba(0,0,0,0.04)] focus:outline-none transform-gpu will-change-[transform,opacity]"
    >
      <div className="flex items-stretch min-h-0">
        {/* Left Sidebar Rail */}
        <div className="w-[275px] xl:w-[295px] 2xl:w-[315px] shrink-0 border-r border-[#F3EDE8] p-2 xl:p-2.5 flex flex-col justify-between bg-[#FCFAF8]/70 overflow-hidden">
          {/* Categories List */}
          <div className="flex flex-col gap-0.5 xl:gap-1 pr-0.5">
            {categories.map((cat, idx) => {
              const isActive = idx === activeCategoryIdx;
              const Icon = cat.icon;
              const catDesc = cat.description || CATEGORY_SHORT_DESCS[cat.title];

              return (
                <button
                  key={cat.id}
                  type="button"
                  onMouseEnter={() => setActiveCategoryIdx(idx)}
                  onClick={() => setActiveCategoryIdx(idx)}
                  className={cn(
                    "w-full flex items-start justify-between px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-xl text-left transition-all duration-150 group cursor-pointer",
                    isActive
                      ? "bg-gradient-to-r from-[#FFE5D4] to-[#FFD5BC] border border-[#FFA877] text-[#FF5812] shadow-[0_2px_8px_rgba(255,88,18,0.12)]"
                      : "text-[#111827] hover:bg-[#FAF8F5] border border-transparent"
                  )}
                >
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <div
                      className={cn(
                        "w-5 h-5 xl:w-5.5 xl:h-5.5 mt-0.5 flex items-center justify-center shrink-0 transition-colors",
                        isActive
                          ? "text-[#FF5812]"
                          : "text-slate-700 group-hover:text-slate-900"
                      )}
                    >
                      <Icon className="w-4.5 h-4.5 xl:w-5 xl:h-5 shrink-0" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "text-[12.5px] xl:text-[13px] 2xl:text-[13.5px] block leading-snug select-none",
                          isActive ? "font-black text-[#FF5812]" : "font-bold text-[#111827]"
                        )}
                      >
                        {cat.title}
                      </span>
                      {catDesc && (
                        <span
                          className={cn(
                            "text-[11px] xl:text-[11.5px] 2xl:text-[12px] block leading-snug mt-0.5 select-none",
                            isActive
                              ? "text-[#B83E07] font-medium"
                              : "text-slate-500 group-hover:text-slate-600 font-normal"
                          )}
                        >
                          {catDesc}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight
                    size={14}
                    className={cn(
                      "shrink-0 ml-1.5 mt-1 transition-transform duration-150",
                      isActive
                        ? "text-[#FF5812] translate-x-0.5"
                        : "text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5"
                    )}
                    strokeWidth={isActive ? 3 : 2.4}
                  />
                </button>
              );
            })}
          </div>

          {/* Bottom Rocket Card (Solid Orange) */}
          <div className="bg-[#FF5812] border border-[#E04400] rounded-xl xl:rounded-2xl p-2.5 xl:p-3 mt-2.5 xl:mt-3 flex flex-col items-start shrink-0 shadow-[0_4px_16px_rgba(255,88,18,0.18)]">
            <div className="mb-1 w-6 h-6 xl:w-6.5 xl:h-6.5 rounded-lg bg-white flex items-center justify-center shadow-xs">
              <RocketFlameIcon className="w-4 h-4 xl:w-4.5 xl:h-4.5 shrink-0" />
            </div>
            <h4 className="text-[12px] xl:text-[12.5px] 2xl:text-[13px] font-black text-white leading-tight">
              Not sure where to start?
            </h4>
            <p className="text-[10.5px] xl:text-[11px] 2xl:text-[11.5px] text-white/90 font-medium leading-tight mt-0.5 mb-1.5 line-clamp-1 xl:line-clamp-2">
              {currentCategory.rocketSubtitle}
            </p>
            <Link
              href="/contact"
              prefetch={false}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-white/95 text-[#FF5812] text-[10.5px] xl:text-[11px] font-black shadow-sm transition-all active:scale-[0.98]"
            >
              <span>Talk to our Team</span>
              <span className="font-black text-xs leading-none">→</span>
            </Link>
          </div>
        </div>

        {/* Right Main Panel */}
        <div className="flex-1 p-2 xl:p-2.5 2xl:p-3 flex flex-col justify-start min-w-0 bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.12 }}
              className="flex flex-col justify-start gap-1.5 xl:gap-2"
            >
              {/* Upper Solid Orange Banner Card */}
              <div className="bg-[#FF5812] border border-[#E04400] rounded-xl xl:rounded-2xl p-2 xl:p-2.5 shadow-[0_6px_20px_rgba(255,88,18,0.18)]">
                {/* Banner Header */}
                <div className="flex items-center justify-between mb-1 xl:mb-1.5 gap-2">
                  <div className="flex items-center gap-2 xl:gap-2.5 flex-wrap">
                    <h3 className="text-[14px] xl:text-[15.5px] 2xl:text-[17px] font-black text-white tracking-tight">
                      {currentCategory.bannerTitle}
                    </h3>
                    <span className="inline-flex items-center bg-white/20 border border-white/30 text-white text-[10px] xl:text-[10.5px] 2xl:text-[11px] font-bold px-2 xl:px-2.5 py-0.5 rounded-full shadow-2xs backdrop-blur-xs">
                      {currentCategory.bannerSubtitle}
                    </span>
                  </div>
                  {currentCategory.bannerExploreLabel ? (
                    <Link
                      href={currentCategory.bannerExploreUrl}
                      prefetch={false}
                      onClick={onClose}
                      className="text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-black text-white hover:text-white/85 inline-flex items-center gap-1 shrink-0 transition-colors"
                    >
                      <span>{currentCategory.bannerExploreLabel}</span>
                      <span className="font-black text-xs leading-none">→</span>
                    </Link>
                  ) : null}
                </div>

                {/* 3 Feature Cards */}
                <div className="grid grid-cols-3 gap-1.5 xl:gap-2 2xl:gap-2.5 mt-0.5">
                  {currentCategory.featureCards.map((card) => {
                    const CardIcon = card.icon;
                    return (
                      <Link
                        key={card.title}
                        href={card.url}
                        prefetch={false}
                        onClick={onClose}
                        className="bg-white rounded-xl p-2 xl:p-2.5 border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex flex-col justify-between hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:border-white transition-all group"
                      >
                        <div>
                          <div className="w-6 h-6 xl:w-6.5 xl:h-6.5 rounded-lg bg-[#FFEFE5] border border-[#FFD5BE] text-[#FF5812] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform shadow-2xs">
                            <CardIcon className="w-4 h-4 xl:w-4.5 xl:h-4.5 shrink-0" />
                          </div>
                          <h4 className="text-[12px] xl:text-[12.5px] 2xl:text-[13px] font-black text-[#111827] group-hover:text-[#FF5812] transition-colors leading-snug line-clamp-1">
                            {card.title}
                          </h4>
                          <p className="text-[11px] xl:text-[11.5px] 2xl:text-[12px] text-slate-600 font-medium leading-snug mt-0.5 mb-1 line-clamp-2">
                            {card.description}
                          </p>
                        </div>
                        <div className="text-[10px] xl:text-[10.5px] font-black text-[#FF5812] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Explore services</span>
                          <span className="font-black text-xs leading-none">→</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Lower Sub-Services 3-Columns Grid */}
              <div className="grid grid-cols-3 divide-x divide-[#F0ECE8] pt-1 xl:pt-1.5 pb-0.5">
                {currentCategory.columns.map((col, colIdx) => {
                  const ColIcon = col.icon;
                  return (
                    <div
                      key={col.title}
                      className={cn(
                        "flex flex-col min-w-0",
                        colIdx === 0 && "pr-3 xl:pr-4 2xl:pr-5",
                        colIdx === 1 && "px-3 xl:px-4 2xl:px-5",
                        colIdx === 2 && "pl-3 xl:pl-4 2xl:pl-5"
                      )}
                    >
                      {/* Column Header */}
                      <div className="flex items-center gap-2 xl:gap-2.5 mb-2 xl:mb-2.5">
                        <div
                          className={cn(
                            "w-6.5 h-6.5 xl:w-7 xl:h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs",
                            col.badgeBg,
                            col.badgeText
                          )}
                        >
                          <ColIcon className="w-4 h-4 xl:w-4.5 xl:h-4.5 shrink-0" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[13px] xl:text-[13.5px] 2xl:text-[14px] font-bold text-[#111827] leading-tight truncate">
                            {col.title}
                          </h4>
                          <p className="text-[10px] xl:text-[10.5px] 2xl:text-[11px] text-slate-500 font-normal leading-tight truncate mt-0.5">
                            {col.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Subservice Links List */}
                      <div className="flex flex-col gap-0.5 xl:gap-1">
                        {col.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.url}
                            prefetch={false}
                            onClick={onClose}
                            className="group/item flex items-start gap-1.5 py-0.5 text-left transition-colors"
                          >
                            <svg
                              className="w-2.5 h-2.5 text-[#FF5812] shrink-0 mt-0.5 transition-transform duration-150 group-hover/item:translate-x-0.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[12.5px] xl:text-[13px] 2xl:text-[13.5px] font-bold text-[#111827] group-hover/item:text-[#FF5812] transition-colors leading-tight">
                                {link.label}
                              </span>
                              {link.description && (
                                <span className="text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] text-slate-500 group-hover/item:text-slate-600 font-normal leading-snug mt-0.5">
                                  {link.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
export function ServicesMegaMenu({ onClose }: { onClose: () => void }) {
  return <UnifiedMegaMenu categories={SERVICES_NAV_DATA} onClose={onClose} />;
}

export function IndustriesMegaMenu({ onClose }: { onClose: () => void }) {
  return <UnifiedMegaMenu categories={INDUSTRIES_NAV_DATA} onClose={onClose} />;
}

function SharePointLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M17.5 17.5a4.5 4.5 0 0 0 0-9 5.5 5.5 0 0 0-10.3-1.8A4 4 0 0 0 4 10.5a4 4 0 0 0 1 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="2.5" y="7" width="9.5" height="10.5" rx="2" fill="currentColor" />
      <text x="7.25" y="15" fill="white" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif">S</text>
    </svg>
  );
}

const CASE_STUDY_CARDS_DATA = [
  {
    title: "AI & Automation",
    description: "Scaling enterprise workflows with AI agents and automation.",
    url: "/case-studies/ai",
    icon: BotFaceIcon,
  },
  {
    title: "Power Apps & Platform",
    description: "Low-code solutions to modernize and automate business operations.",
    url: "/case-studies/power-platform",
    icon: IsometricLayersIcon,
  },
  {
    title: "Data & Analytics",
    description: "Turning data into actionable insights with modern analytics.",
    url: "/case-studies/data-analytics",
    icon: BarChartIcon,
  },
  {
    title: "SharePoint & SPFx",
    description: "Custom SharePoint solutions and SPFx development at scale.",
    url: "/case-studies/sharepoint",
    icon: SharePointLogoIcon,
  },
  {
    title: "Mobile Applications",
    description: "User-centric, scalable mobile apps for enterprise needs.",
    url: "/case-studies/mobile",
    icon: SmartphoneIcon,
  },
  {
    title: "Web Applications",
    description: "Robust, secure and scalable web applications.",
    url: "/case-studies/web",
    icon: CodeBracketsIcon,
  },
  {
    title: "Healthcare & Life Sciences",
    description: "Compliant, AI-driven solutions for better patient and operational outcomes.",
    url: "/case-studies?industry=healthcare",
    icon: HeartPulse,
  },
  {
    title: "Logistics & Supply Chain",
    description: "Digital solutions to optimize supply chain operations and visibility.",
    url: "/case-studies?industry=logistics",
    icon: TruckIcon,
  },
];

export function CaseStudiesMegaMenu({ onClose }: { onClose: () => void }) {
  const [hoveredCardTitle, setHoveredCardTitle] = useState<string>("SharePoint & SPFx");

  const currentMeta = CASE_STUDY_CATEGORY_META[hoveredCardTitle] || {
    eyebrow: "SHAREPOINT & SPFX",
    introHeading: "Modern Intranets, SPFx Solutions & M365 Portals",
    introDescription:
      "Transform corporate communications and document compliance with tailored SharePoint Online intranets and custom SPFx framework web parts.",
    introCtaText: "Contact Us",
    introCtaUrl: "/contact",
    featuredEyebrow: "SHAREPOINT & SPFX",
    featuredHeading: "SharePoint Site Pages to PDF Export",
    featuredDescription:
      "High-fidelity document conversion and automated archival compliance for enterprise knowledge repositories.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Read Case Study",
    featuredCtaUrl: "/case-studies/sharepoint-site-pages-to-pdf",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.995 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      tabIndex={0}
      className="mx-auto w-full max-w-[1380px] xl:max-w-[1440px] overflow-hidden rounded-[20px] xl:rounded-[24px] border border-black/[0.08] bg-white p-2.5 xl:p-3 2xl:p-3.5 shadow-[0_24px_70px_-15px_rgba(10,10,26,0.14),0_4px_16px_rgba(0,0,0,0.04)] focus:outline-none transform-gpu will-change-[transform,opacity]"
    >
      <div className="flex items-stretch gap-2.5 xl:gap-3.5 2xl:gap-4 min-h-0">
        {/* Left Column: Featured Card */}
        <div className="w-[240px] xl:w-[260px] 2xl:w-[275px] shrink-0 flex flex-col">
          <span className="text-[10px] xl:text-[10.5px] font-bold text-slate-400 tracking-[0.14em] uppercase block mb-1 px-0.5 select-none">
            FEATURED
          </span>
          <div className="relative flex-1 rounded-xl xl:rounded-2xl overflow-hidden flex flex-col justify-end p-3.5 xl:p-4 shadow-sm border border-black/[0.06] group min-h-[290px] xl:min-h-[320px] bg-slate-900">
            {/* Background Image - only /images/nav/ai-featured.jpg */}
            <img
              src="/images/nav/ai-featured.jpg"
              alt="Featured Case Study"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10 z-10" />

            {/* Content Overlay with smooth animated transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredCardTitle + "-content"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.16 }}
                className="relative z-20 flex flex-col items-start w-full"
              >
                <span className="text-[9.5px] xl:text-[10px] font-bold text-[#FF5812] tracking-wider uppercase mb-0.5">
                  {currentMeta.featuredEyebrow}
                </span>
                <h3 className="text-[14px] xl:text-[15.5px] 2xl:text-[16.5px] font-extrabold text-white leading-snug mb-1 line-clamp-2">
                  {currentMeta.featuredHeading}
                </h3>
                <p className="text-[10px] xl:text-[10.5px] text-white/80 font-normal leading-relaxed mb-2.5 line-clamp-2">
                  {currentMeta.featuredDescription}
                </p>
                <Link
                  href={currentMeta.featuredCtaUrl}
                  prefetch={false}
                  onClick={onClose}
                  className="w-full py-1.5 xl:py-2 px-3.5 rounded-full bg-white hover:bg-slate-50 text-[#111827] text-[11px] xl:text-[11.5px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
                >
                  <span>{currentMeta.featuredCtaText || "Read Case Study"}</span>
                  <span className="font-bold text-xs leading-none">→</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Header + 8 Cards Grid + Bottom Banner */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-1 xl:mb-1.5 gap-2 flex-wrap">
            <div className="flex items-center gap-2 xl:gap-2.5 flex-wrap">
              <h2 className="text-[17px] xl:text-[19px] 2xl:text-[21px] font-black text-[#111827] tracking-tight">
                Case Studies
              </h2>
              <span className="inline-flex items-center bg-[#FFF2EB] border border-[#FFDEC9] text-[#4A1D0E] text-[10px] xl:text-[10.5px] 2xl:text-[11px] font-medium px-2 xl:px-2.5 py-0.5 rounded-full shadow-2xs">
                Real outcomes from our AI, cloud and digital engineering solutions
              </span>
            </div>
            <Link
              href="/case-studies"
              prefetch={false}
              onClick={onClose}
              className="text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-bold text-[#FF5812] hover:text-[#E04400] inline-flex items-center gap-1 shrink-0 transition-colors"
            >
              <span>View All Case Studies</span>
              <span className="font-bold text-xs leading-none">→</span>
            </Link>
          </div>

          {/* 8 Case Study Cards Grid (4 columns x 2 rows) */}
          <div className="grid grid-cols-4 gap-1.5 xl:gap-2 2xl:gap-2.5 my-0.5 xl:my-1">
            {CASE_STUDY_CARDS_DATA.map((card) => {
              const CardIcon = card.icon;
              const isSelected = hoveredCardTitle === card.title;
              return (
                <Link
                  key={card.title}
                  href={card.url}
                  prefetch={false}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredCardTitle(card.title)}
                  onFocus={() => setHoveredCardTitle(card.title)}
                  className={cn(
                    "rounded-lg xl:rounded-xl p-2 xl:p-2.5 border flex flex-col justify-between transition-all group min-h-[96px] xl:min-h-[105px]",
                    isSelected
                      ? "border-[#FFBFA0] bg-[#FFF9F5] shadow-[0_4px_16px_rgba(255,88,18,0.12)]"
                      : "border-[#F0ECE8] bg-white hover:border-[#FFD5BE] hover:shadow-[0_4px_16px_rgba(255,88,18,0.07)]"
                  )}
                >
                  <div>
                    <div
                      className={cn(
                        "w-6.5 h-6.5 xl:w-7 xl:h-7 rounded-md flex items-center justify-center mb-1 transition-all shadow-2xs",
                        isSelected
                          ? "bg-[#FF5812] text-white border border-[#FF5812] scale-105"
                          : "bg-[#FFEFE5] border border-[#FFD5BE] text-[#FF5812] group-hover:scale-105"
                      )}
                    >
                      <CardIcon className="w-3.5 h-3.5 shrink-0" />
                    </div>
                    <h3
                      className={cn(
                        "text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-bold leading-snug line-clamp-1 transition-colors",
                        isSelected ? "text-[#FF5812]" : "text-[#111827] group-hover:text-[#FF5812]"
                      )}
                    >
                      {card.title}
                    </h3>
                    <p className="text-[10px] xl:text-[10.5px] text-slate-500 font-medium leading-relaxed mt-0.5 mb-1 line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                  <div className="text-[10px] xl:text-[10.5px] font-bold text-[#FF5812] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View Case Study</span>
                    <span className="font-bold text-xs leading-none">→</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Banner */}
          <div className="bg-[#FFF6F0] border border-[#FFEADA] rounded-lg xl:rounded-xl p-2 xl:p-2.5 flex items-center justify-between gap-2.5 shadow-2xs shrink-0 mt-0.5">
            <div className="flex items-center gap-2 xl:gap-2.5 min-w-0">
              <RocketFlameIcon className="w-6 h-6 xl:w-6.5 xl:h-6.5 shrink-0" />
              <div className="min-w-0">
                <h3 className="text-[12px] xl:text-[12.5px] 2xl:text-[13px] font-extrabold text-[#111827] leading-tight truncate">
                  Let's Solve Your Next Challenge.
                </h3>
                <p className="text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] text-slate-500 font-normal leading-tight truncate mt-0.5">
                  Connect with our team to explore a solution tailored to your business.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              prefetch={false}
              onClick={onClose}
              className="px-3.5 xl:px-4 py-1.5 rounded-full bg-[#FF5812] hover:bg-[#E04400] text-white text-[10.5px] xl:text-[11px] font-bold inline-flex items-center gap-1 shadow-sm active:scale-[0.98] transition-all shrink-0"
            >
              <span>Talk to our Team</span>
              <span className="font-bold text-xs leading-none">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


/* -------------------------------------------------------------------------- */
/*  Main Component: MegaMenuPanel                                             */
/* -------------------------------------------------------------------------- */

export function MegaMenuPanel({
  label: _label,
  groups,
  onClose,
}: {
  label: string;
  groups?: MegaMenuGroup[];
  onClose: () => void;
}) {
  // Navigation view level: "categories" (overview of all 9 categories) or "services" (inside a selected category)
  const [viewLevel, setViewLevel] = useState<"categories" | "services">("categories");
  const [activeIdx, setActiveIdx] = useState(0);

  if (_label === "Services") {
    return <ServicesMegaMenu onClose={onClose} />;
  }
  if (_label === "Industries") {
    return <IndustriesMegaMenu onClose={onClose} />;
  }
  if (_label === "Case Studies") {
    return <CaseStudiesMegaMenu onClose={onClose} />;
  }

  const availableGroups = groups && groups.length > 0 ? groups : [];
  if (availableGroups.length === 0) return null;

  const safeIdx = activeIdx < availableGroups.length ? activeIdx : 0;
  const currentGroup = availableGroups[safeIdx];
  const isCaseStudies = _label === "Case Studies";
  const metaSource = isCaseStudies ? CASE_STUDY_CATEGORY_META : CATEGORY_META;
  const meta = metaSource[currentGroup.title] || CATEGORY_META[currentGroup.title] || {
    eyebrow: _label ? _label.toUpperCase() : "SERVICES & SOLUTIONS",
    introHeading: currentGroup.description || `${currentGroup.title} Solutions`,
    introDescription:
      _label === "Case Studies"
        ? "Explore real-world client success stories, enterprise architecture deployments, and business transformation outcomes."
        : "Comprehensive digital solutions, specialized engineering squads, and modern enterprise services.",
    introCtaText: _label === "Case Studies" ? "Contact Us" : `Explore ${currentGroup.title}`,
    introCtaUrl: _label === "Case Studies" ? "/contact" : (currentGroup.url || currentGroup.links[0]?.url || "/services"),
    featuredEyebrow: currentGroup.title.toUpperCase(),
    featuredHeading: _label === "Case Studies" ? "Client Success & Proven Impact" : "Turn Strategy into Real Results",
    featuredDescription:
      _label === "Case Studies"
        ? "Discover how Softree partners with enterprise leaders to deliver measurable business outcomes."
        : "Work with our specialized engineering teams to build, scale, and deliver digital products.",
    featuredImage: "/images/nav/ai-featured.jpg",
    featuredCtaText: "Talk to Our Team",
    featuredCtaUrl: "/contact",
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + availableGroups.length) % availableGroups.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % availableGroups.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIdx((prev) => (prev - 1 + availableGroups.length) % availableGroups.length);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIdx((prev) => (prev + 1) % availableGroups.length);
    } else if (e.key === "Escape" && viewLevel === "services") {
      e.preventDefault();
      setViewLevel("categories");
    }
  };

  const handleSelectCategory = (idx: number) => {
    setActiveIdx(idx);
    setViewLevel("services");
  };

  const handleBackToCategories = () => {
    setViewLevel("categories");
  };

  const serviceLinks = currentGroup.links || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.995 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="mx-auto w-full max-w-[1340px] overflow-hidden rounded-[22px] border border-black/[0.08] bg-white p-3 sm:p-3.5 lg:p-4 shadow-[0_24px_70px_-15px_rgba(10,10,26,0.16),0_4px_16px_rgba(0,0,0,0.04)] focus:outline-none transform-gpu will-change-[transform,opacity]"
    >
      {/* =================================================================== */}
      {/* 3-Column Layout: Left Intro | Center Services | Right Featured      */}
      {/* =================================================================== */}
      <div className="flex flex-col lg:flex-row gap-3.5 xl:gap-4 items-stretch w-full">
        {/* ================================================================= */}
        {/* LEFT PANEL: Selected Category Intro with Solid Orange-Red Gradient */}
        {/* ================================================================= */}
        <div className="relative w-full lg:w-[280px] xl:w-[300px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#FF6B2C] via-[#FF5812] to-[#D92C00] p-4.5 xl:p-5 flex flex-col justify-between shadow-[0_6px_24px_rgba(255,88,18,0.22)] border border-white/20">
          {/* Luminous inner depth highlight */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/15" />
          <div className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 bg-white/15 rounded-full blur-2xl" />

          {/* Banner content */}
          <div className="relative z-10 flex flex-col justify-between h-full pointer-events-auto">
            <div>
              {/* Header with Eyebrow */}
              <div className="mb-2.5">
                <span className="text-[10px] font-extrabold tracking-[0.14em] text-white uppercase drop-shadow-sm bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full inline-block">
                  {meta.eyebrow}
                </span>
              </div>

              {/* Dynamic Content Based on Selected Category */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGroup.title}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.08, ease: "easeOut" }}
                >
                  <h3 className="text-[18px] xl:text-[20px] font-extrabold leading-[1.2] tracking-tight text-white mb-2 drop-shadow-sm">
                    {meta.introHeading}
                  </h3>
                  <p className="text-[12.5px] xl:text-[13px] leading-relaxed text-white/90 font-medium">
                    {meta.introDescription}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-4 mt-auto">
              <Link
                href={isCaseStudies ? "/contact" : meta.introCtaUrl}
                prefetch={false}
                onClick={onClose}
                className="group inline-flex items-center gap-1.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 text-[12px] font-bold shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-all duration-150"
              >
                <span>{isCaseStudies ? "Contact Us" : meta.introCtaText}</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-1 text-[#FF5812]" />
              </Link>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CENTER PANEL: Two-Level Interactive Category & Services View      */}
        {/* ================================================================= */}
        <div className="flex-1 min-w-0 flex flex-col justify-start">
          {viewLevel === "categories" ? (
            /* ─────────────────────────────────────────────────────────────── */
            /* LEVEL 1: ALL 9 SERVICE CATEGORIES                               */
            /* ─────────────────────────────────────────────────────────────── */
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10.5px] font-bold tracking-[0.14em] text-slate-400 uppercase">
                  {_label === "Case Studies" ? "CASE STUDY DOMAINS" : _label === "Industries" ? "OUR INDUSTRIES" : "OUR SERVICES"}
                </span>
                <span className="text-[10.5px] font-medium text-slate-400">
                  {_label === "Case Studies" ? "Click any domain to explore all related case studies" : _label === "Industries" ? "Select an industry to explore solutions" : "Select a category to view services"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 xl:gap-2">
                {availableGroups.map((group, idx) => {
                  const isSelected = activeIdx === idx;
                  const GroupIcon = group.icon || Bot;

                  const shortDesc =
                    CATEGORY_SHORT_DESCS[group.title] ||
                    group.description ||
                    "Specialized enterprise solutions";

                  const isDirect =
                    _label === "Case Studies" ||
                    (Boolean(group.url) && (!group.links || group.links.length === 0));

                  const cardInner = (
                    <>
                      <div className="flex items-center gap-2.5 xl:gap-3 min-w-0 pr-1.5 flex-1">
                        {/* Solid Orange-Red Gradient Icon Badge */}
                        <div
                          className={`relative w-8 h-8 xl:w-8.5 xl:h-8.5 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150 ${isSelected
                            ? "bg-gradient-to-br from-[#FF6B2C] via-[#FF5812] to-[#D92C00] text-white shadow-[0_3px_10px_rgba(255,88,18,0.35)] scale-[1.03]"
                            : "bg-gradient-to-br from-[#FF6B2C] via-[#FF5812] to-[#D92C00] text-white shadow-[0_2px_6px_rgba(255,88,18,0.22)] group-hover:scale-105"
                            }`}
                        >
                          <GroupIcon size={17} className="stroke-[2.2] transition-transform duration-150" />
                        </div>

                        {/* Title & Description */}
                        <div className="min-w-0 flex-1">
                          <span
                            className={`text-[12.5px] xl:text-[13px] font-bold block leading-tight transition-colors duration-150 ${isSelected
                              ? "text-[#FF5812]"
                              : "text-[#0f172a] group-hover:text-[#FF5812]"
                              }`}
                          >
                            {group.title}
                          </span>
                          <span className="text-[12px] xl:text-[12.5px] text-slate-500 group-hover:text-slate-600 block leading-[1.3] mt-0.5 font-normal line-clamp-1">
                            {shortDesc}
                          </span>
                        </div>
                      </div>

                      {/* Premium Diagonal Arrow Badge with Glide Animation */}
                      <div
                        className={`relative w-6 h-6 xl:w-6.5 xl:h-6.5 rounded-full flex items-center justify-center shrink-0 border overflow-hidden transition-all duration-200 ml-1.5 ${isSelected
                          ? "bg-[#FF5812] border-[#FF5812] text-white shadow-[0_2px_8px_rgba(255,88,18,0.35)]"
                          : "bg-[#FF5812]/[0.06] border-[#FF5812]/15 text-[#FF5812]/75 group-hover:bg-[#FF5812] group-hover:border-[#FF5812] group-hover:text-white group-hover:shadow-[0_2px_8px_rgba(255,88,18,0.35)]"
                          }`}
                      >
                        <ArrowUpRight
                          size={13}
                          className={`stroke-[2.3] transition-transform duration-200 ease-out absolute ${isSelected
                            ? "translate-x-[0.5px] -translate-y-[0.5px] text-white"
                            : "group-hover:translate-x-4 group-hover:-translate-y-4"
                            }`}
                        />
                        {!isSelected && (
                          <ArrowUpRight
                            size={13}
                            className="stroke-[2.3] transition-transform duration-200 ease-out absolute -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 text-white"
                          />
                        )}
                      </div>
                    </>
                  );

                  const cardClass = `group w-full text-left relative flex items-center justify-between py-2 px-2.5 xl:py-2.5 xl:px-3 rounded-lg border transition-all duration-150 cursor-pointer ${isSelected
                    ? "bg-gradient-to-r from-[#FFF7F2] to-[#FFF1E8] border-[#FF5812]/40 shadow-[0_2px_10px_rgba(255,88,18,0.1)]"
                    : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/70"
                    }`;

                  if (isDirect) {
                    return (
                      <Link
                        key={group.title}
                        href={group.url || "/case-studies"}
                        prefetch={false}
                        onClick={onClose}
                        onMouseEnter={() => setActiveIdx(idx)}
                        className={cardClass}
                      >
                        {cardInner}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={group.title}
                      type="button"
                      onClick={() => handleSelectCategory(idx)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={cardClass}
                    >
                      {cardInner}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ─────────────────────────────────────────────────────────────── */
            /* LEVEL 2: SELECTED CATEGORY'S SERVICES + BACK BUTTON            */
            /* ─────────────────────────────────────────────────────────────── */
            <div>
              <div className="flex items-center justify-between mb-3 px-1 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleBackToCategories}
                    aria-label="Back to all categories"
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-white bg-gradient-to-r from-[#FF6B2C] via-[#FF5812] to-[#E64A09] hover:from-[#FF5812] hover:to-[#D92C00] py-1.5 px-3.5 rounded-full shadow-[0_2px_8px_rgba(255,88,18,0.25)] hover:shadow-[0_4px_14px_rgba(255,88,18,0.35)] transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <ChevronLeft size={15} className="stroke-[2.5] transition-transform duration-200 group-hover:-translate-x-0.5" />
                    <span>Back to All {_label === "Case Studies" ? "Domains" : "Categories"}</span>
                  </button>
                  <span className="h-4 w-px bg-slate-200" />
                  <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.1em] text-slate-700 uppercase bg-slate-100/90 px-2.5 py-0.5 rounded-md border border-slate-200/60">
                    {currentGroup.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/70 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]" />
                    <span>{safeIdx + 1} of {availableGroups.length} {_label === "Case Studies" ? "domains" : "categories"}</span>
                  </span>
                  <div className="hidden sm:flex items-center gap-0.5 border border-slate-200/80 rounded-full p-0.5 bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous category"
                      className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#FF5812] transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={12} className="stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next category"
                      className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#FF5812] transition-colors cursor-pointer"
                    >
                      <ChevronRight size={12} className="stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGroup.title}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.08, ease: "easeOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-1.5 xl:gap-2"
                >
                  {serviceLinks.map((link) => {
                    const LinkIcon = link.icon || Bot;
                    return (
                      <Link
                        key={link.label}
                        href={link.url}
                        prefetch={false}
                        onClick={onClose}
                        className="group relative flex items-center justify-between py-2 px-2.5 xl:py-2.5 xl:px-3 rounded-lg border border-slate-100 bg-white hover:border-[#FF5812]/30 hover:bg-slate-50/70 hover:shadow-[0_2px_8px_rgba(255,88,18,0.06)] transition-all duration-150"
                      >
                        <div className="flex items-center gap-2.5 xl:gap-3 min-w-0 pr-1.5 flex-1">
                          {/* Solid Orange-Red Gradient Icon Badge */}
                          <div className="relative w-8 h-8 xl:w-8.5 xl:h-8.5 rounded-lg bg-gradient-to-br from-[#FF6B2C] via-[#FF5812] to-[#D92C00] text-white shadow-[0_2px_6px_rgba(255,88,18,0.22)] group-hover:scale-105 flex items-center justify-center shrink-0 transition-all duration-150">
                            <LinkIcon size={17} className="stroke-[2.2] transition-transform duration-150" />
                          </div>

                          {/* Title & Description */}
                          <div className="min-w-0 flex-1">
                            <span className="text-[12.5px] xl:text-[13px] font-bold text-[#0f172a] group-hover:text-[#FF5812] transition-colors block leading-tight">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="text-[12px] xl:text-[12.5px] text-slate-500 group-hover:text-slate-600 block leading-[1.3] mt-0.5 font-normal line-clamp-1">
                                {link.description}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Premium Diagonal Arrow Badge with Glide Animation */}
                        <div className="relative w-6 h-6 xl:w-6.5 xl:h-6.5 rounded-full flex items-center justify-center shrink-0 border border-[#FF5812]/15 bg-[#FF5812]/[0.06] text-[#FF5812]/75 group-hover:bg-[#FF5812] group-hover:border-[#FF5812] group-hover:text-white group-hover:shadow-[0_2px_8px_rgba(255,88,18,0.35)] overflow-hidden transition-all duration-200 ml-1.5">
                          <ArrowUpRight
                            size={13}
                            className="stroke-[2.3] transition-transform duration-200 ease-out absolute group-hover:translate-x-4 group-hover:-translate-y-4"
                          />
                          <ArrowUpRight
                            size={13}
                            className="stroke-[2.3] transition-transform duration-200 ease-out absolute -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 text-white"
                          />
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* RIGHT PANEL: FEATURED Promotional Card                            */}
        {/* ================================================================= */}
        <div className="w-full lg:w-[250px] xl:w-[270px] shrink-0 flex flex-col">
          <div className="text-[10.5px] font-bold tracking-[0.14em] text-slate-400 uppercase mb-2 px-1">
            FEATURED
          </div>

          <div className="relative flex-1 min-h-[260px] rounded-xl overflow-hidden group shadow-sm flex flex-col justify-end p-3.5 xl:p-4 text-white">
            {/* Background Image */}
            <img
              src={meta.featuredImage}
              alt={meta.featuredHeading}
              className="absolute inset-0 w-full h-full object-cover object-[center_15%] transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Dark gradient overlay anchored to lower portion */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 via-42% to-transparent pointer-events-none" />

            {/* Featured inner content - dynamically updated */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGroup.title}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{ duration: 0.08, ease: "easeOut" }}
                className="relative z-10 flex flex-col"
              >
                <span className="text-[10px] font-extrabold tracking-widest text-[#FF5812] uppercase mb-0.5 drop-shadow">
                  {meta.featuredEyebrow}
                </span>
                <h4 className="text-[14.5px] xl:text-[15.5px] font-extrabold leading-snug text-white mb-1">
                  {meta.featuredHeading}
                </h4>
                <p className="text-[11.5px] xl:text-[12px] text-slate-200 leading-normal mb-2.5 font-normal line-clamp-2">
                  {meta.featuredDescription}
                </p>
                <Link
                  href={meta.featuredCtaUrl}
                  prefetch={false}
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-[11.5px] py-2 px-3 shadow-md transition-all group/btn"
                >
                  <span>{meta.featuredCtaText}</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-150 group-hover/btn:translate-x-1 text-[#FF5812]" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


