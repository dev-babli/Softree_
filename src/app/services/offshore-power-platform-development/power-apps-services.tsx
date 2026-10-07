"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPaintBrush,
  FaBolt,
  FaDatabase,
  FaGlobe,
  FaRobot,
  FaCloud,
  FaCheckDouble,
  FaDesktop,
  FaSitemap,
  FaShieldAlt,
  FaChartPie,
  FaChartLine,
  FaUsers,
  FaCommentDots,
  FaBrain,
} from "react-icons/fa";
import { ArrowRight, Sparkles } from "lucide-react";

/* =========================
   SERVICES DATA
========================= */
export interface CapabilityItem {
  category: string;
  categoryBadge: string;
  title: string;
  icon: React.ReactNode;
  shortDesc: string;
  description: string;
  image: string;
  tags: string[];
}

const allCapabilities: CapabilityItem[] = [
  // --- Power Apps ---
  {
    category: "Power Apps",
    categoryBadge: "Custom UI / UX",
    title: "Canvas Apps Development",
    icon: <FaPaintBrush className="text-white" />,
    shortDesc: "Custom UI apps for mobile, tablet & desktop workflows.",
    description:
      "We create intuitive Canvas Apps that offer complete design flexibility, allowing businesses to build task-focused applications tailored to their unique workflows. These apps deliver a seamless user experience across mobile, tablet, and desktop devices.",
    image: "/images/power-apps/1.webp",
    tags: ["Mobile First", "Tablet & Desktop", "Custom UI/UX", "Offline Sync"],
  },
  {
    category: "Power Apps",
    categoryBadge: "Low-Code Speed",
    title: "Low-Code Business Applications",
    icon: <FaBolt className="text-white" />,
    shortDesc: "Rapid low-code apps to streamline business operations.",
    description:
      "Our Power Apps solutions enable organizations to rapidly build secure and scalable applications using low-code capabilities, helping teams streamline operations, reduce development time, and improve productivity.",
    image: "/images/power-apps/2.webp",
    tags: ["Rapid Prototyping", "Low-Code Speed", "Role Permissions", "Teams Integration"],
  },
  {
    category: "Power Apps",
    categoryBadge: "Dataverse Ready",
    title: "Model-Driven Dataverse Apps",
    icon: <FaDatabase className="text-white" />,
    shortDesc: "Enterprise, data-driven solutions using Dataverse.",
    description:
      "We develop robust Model-Driven Apps that leverage structured data and business rules to deliver consistent, data-centric experiences, ideal for complex business processes and data-driven applications.",
    image: "/images/power-apps/3.webp",
    tags: ["Dataverse Architecture", "Business Process Flows", "Automated Forms", "Audit Logs"],
  },
  {
    category: "Power Apps",
    categoryBadge: "External Access",
    title: "External Portals & Collaboration",
    icon: <FaGlobe className="text-white" />,
    shortDesc: "Secure external portals for customers & partners.",
    description:
      "Our portal solutions provide secure, role-based access for customers, partners, and employees, enabling seamless external collaboration while maintaining security and performance.",
    image: "/images/power-apps/4.webp",
    tags: ["External Access", "B2B Collaboration", "Customer Self-Service", "Single Sign-On"],
  },
  {
    category: "Power Apps",
    categoryBadge: "AI & APIs",
    title: "Custom Connectors & AI Builder",
    icon: <FaRobot className="text-white" />,
    shortDesc: "Integrations, automation & AI-powered intelligence.",
    description:
      "We enhance Power Apps with custom connectors and AI Builder capabilities to integrate external systems, automate workflows, and introduce intelligent capabilities into business applications.",
    image: "/images/power-apps/5.webp",
    tags: ["REST APIs", "AI Builder OCR", "Document Processing", "Legacy Systems"],
  },

  // --- Power Automate ---
  {
    category: "Power Automate",
    categoryBadge: "Cloud Automation",
    title: "Automated Cloud Flows",
    icon: <FaCloud className="text-white" />,
    shortDesc: "Automate cloud-based business processes across connected services.",
    description:
      "We build cloud-based Power Automate flows that connect applications and services to automate business processes, trigger actions, and reduce repetitive manual work.",
    image: "/images/power-apps/automate-5.webp",
    tags: ["Event Triggers", "Multi-Stage Approvals", "Microsoft 365 Sync", "Webhook Actions"],
  },
  {
    category: "Power Automate",
    categoryBadge: "Smart Routing",
    title: "Multi-Level Approval Workflows",
    icon: <FaCheckDouble className="text-white" />,
    shortDesc: "Streamline approvals with automated routing and notifications.",
    description:
      "We automate approval workflows with defined routing, notifications, conditions, and actions to help teams reduce delays and maintain consistent business processes.",
    image: "/images/power-apps/automate-1.webp",
    tags: ["Teams Notifications", "Email Routing", "Conditional Logic", "Delegation Rules"],
  },
  {
    category: "Power Automate",
    categoryBadge: "RPA Bots",
    title: "Desktop Flows & RPA Automation",
    icon: <FaDesktop className="text-white" />,
    shortDesc: "Automate repetitive desktop tasks with Microsoft RPA.",
    description:
      "We use Power Automate Desktop to automate repetitive desktop tasks and selected legacy application processes through robotic process automation.",
    image: "/images/power-apps/automate-4.webp",
    tags: ["Unattended RPA", "Legacy App Scraping", "UI Automation", "Scheduled Batches"],
  },

  // --- Dataverse ---
  {
    category: "Dataverse",
    categoryBadge: "Data Architecture",
    title: "Data Modeling & Architecture",
    icon: <FaSitemap className="text-white" />,
    shortDesc: "Structured data models for connected Power Platform applications.",
    description:
      "We design structured Dataverse data models that provide a reliable foundation for Power Apps, Power Automate, Power BI, Power Pages, and connected business solutions.",
    image: "/images/power-apps/data-1.webp",
    tags: ["Entity Relationships", "Normalized Tables", "Business Rules", "Cascade Behaviors"],
  },
  {
    category: "Dataverse",
    categoryBadge: "Zero Trust",
    title: "Enterprise Dataverse Security",
    icon: <FaShieldAlt className="text-white" />,
    shortDesc: "Protect business data with roles, permissions, and controlled access.",
    description:
      "We configure Dataverse security using appropriate roles, permissions, and access controls to help protect business data across Power Platform solutions.",
    image: "/images/power-apps/data-3.webp",
    tags: ["Role-Based Access", "Field-Level Security", "Business Units", "Audit Trails"],
  },

  // --- Power BI ---
  {
    category: "Power BI",
    categoryBadge: "Executive BI",
    title: "Executive BI Dashboards",
    icon: <FaChartPie className="text-white" />,
    shortDesc: "Interactive dashboards for operational and management visibility.",
    description:
      "We develop interactive Power BI dashboards that bring business metrics and operational data together for clear, actionable visibility and data-driven decision making.",
    image: "/images/power-apps/powerbi-1.webp",
    tags: ["DAX Modeling", "Live Data Refresh", "Executive KPIs", "Drill-Down Analytics"],
  },
  {
    category: "Power BI",
    categoryBadge: "Embedded Analytics",
    title: "Power BI Embedded Analytics",
    icon: <FaChartLine className="text-white" />,
    shortDesc: "Embed interactive analytics inside web and mobile apps.",
    description:
      "We integrate secure Power BI reports directly into custom portals, CRM, and SaaS web applications for contextual reporting without external licenses.",
    image: "/images/power-apps/powerbi-3.webp",
    tags: ["Embedded Capacity", "Row-Level Security", "Custom Visuals", "REST API Sync"],
  },

  // --- Power Pages ---
  {
    category: "Power Pages",
    categoryBadge: "B2B & Customer Portals",
    title: "Customer & Vendor Portals",
    icon: <FaUsers className="text-white" />,
    shortDesc: "Secure self-service experiences for customers and external users.",
    description:
      "We build secure Power Pages customer portals that provide controlled access to information, requests, forms, and business processes connected directly to Dataverse.",
    image: "/images/power-apps/pages-1.webp",
    tags: ["Azure B2C Auth", "Liquid Templates", "Custom Web Forms", "Real-Time Sync"],
  },

  // --- Copilot Studio & AI ---
  {
    category: "Copilot Studio & AI",
    categoryBadge: "Conversational Copilots",
    title: "Enterprise Custom Copilots",
    icon: <FaCommentDots className="text-white" />,
    shortDesc: "Intelligent assistants for information and business tasks.",
    description:
      "We build and configure Microsoft Copilot Studio solutions for conversational experiences, business assistance, generative enterprise knowledge queries, and connected workflows.",
    image: "/images/power-apps/copilot-2.webp",
    tags: ["Generative Answers", "Enterprise Knowledge RAG", "Action Plugins", "Multi-Turn Context"],
  },
  {
    category: "Copilot Studio & AI",
    categoryBadge: "Autonomous Workflows",
    title: "Agentic AI Process Workflows",
    icon: <FaBrain className="text-white" />,
    shortDesc: "Apply AI across applications, workflows, and business operations.",
    description:
      "We combine AI capabilities with Power Platform automation to support complex unstructured data processing, intelligent routing, and autonomous agentic workflows.",
    image: "/images/power-apps/copilot-5.webp",
    tags: ["Autonomous Agents", "Document AI", "Azure OpenAI", "Guardrails"],
  },
];

const CATEGORIES = [
  "Power Apps",
  "Power Automate",
  "Dataverse",
  "Power BI",
  "Power Pages",
  "Copilot Studio & AI",
];

export default function PowerAppsServices() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Power Apps");

  const filteredItems = useMemo(() => {
    return allCapabilities.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="relative w-full py-12 md:py-16 bg-white text-slate-900">
      {/* Background soft ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 transform-gpu blur-3xl opacity-30"
      >
        <div className="aspect-[1155/678] w-[60rem] bg-gradient-to-tr from-orange-100 via-rose-50 to-amber-100" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-orange-50 text-orange-600 border border-orange-200 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Power Platform Architecture</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Complete Microsoft{" "}
            <span className="bg-gradient-to-r from-[#FF5500] via-[#E63900] to-[#B31D00] bg-clip-text text-transparent">
              Power Platform Capabilities
            </span>
          </h2>

          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From tailored Canvas and Model-Driven apps to high-throughput Power Automate flows,
            Dataverse architectures, and autonomous Copilot Studio agents.
          </p>
        </div>

        {/* ================= FILTER PILLS ================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 md:mb-14">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300
                  ${
                    isSelected
                      ? "bg-gradient-to-r from-[#FF5500] to-[#C92A00] text-white shadow-md shadow-orange-500/20 scale-105"
                      : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-orange-200 hover:bg-orange-50/50"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ================= STICKY STACKED CARDS CONTAINER ================= */}
        <div className="w-full relative">
          {filteredItems.map((item, index) => {
            const isLast = index === filteredItems.length - 1;
            return (
              <div
                key={`${item.title}-${index}`}
                className={`sticky rounded-[32px] p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_40px_rgba(76,28,2,0.45)] border border-white/15 bg-gradient-to-r from-black via-[#4c1c02] to-black text-white transition-all duration-300 ${
                  isLast ? "mb-0" : "mb-8 md:mb-12"
                }`}
                style={{
                  top: `${95 + (index % 8) * 16}px`,
                  zIndex: index + 10,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
                  {/* Left info column */}
                  <div className="lg:col-span-6 flex flex-col justify-center space-y-4 text-white">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/30 backdrop-blur-md shadow-sm">
                        {item.category} • {item.categoryBadge}
                      </span>
                      <span className="text-xs font-mono text-white/60">
                        {String(index + 1).padStart(2, "0")} / {filteredItems.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <div className="p-2.5 rounded-xl bg-orange-500/15 border border-orange-500/30 text-xl text-orange-400 shrink-0 backdrop-blur-sm">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:brightness-110 group transition-all bg-gradient-to-r from-orange-600 via-orange-700 to-amber-600 px-5 py-2.5 rounded-full shadow-lg shadow-orange-950/50 w-fit"
                      >
                        <span>Consult Power Platform Engineer</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Right image showcase column */}
                  <div className="lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/20 bg-black/60 shadow-2xl group">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-white shadow-lg">
                      <span className="font-medium text-white line-clamp-1">{item.shortDesc}</span>
                      <span className="hidden sm:inline-block text-[10px] uppercase font-bold text-amber-400 shrink-0 ml-2">
                        Enterprise Grade
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
