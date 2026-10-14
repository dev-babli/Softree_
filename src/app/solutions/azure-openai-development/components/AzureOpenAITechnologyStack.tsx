"use client";

import React, { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Database,
  Server,
  Shield,
  Layers,
  Network,
  Code2,
  Cpu,
} from "lucide-react";

export const azureOpenAITechCategories = [
  {
    label: "AZURE OPENAI",
    icon: Brain,
    items: [
      { name: "GPT-4o" },
      { name: "GPT-4o-mini" },
      { name: "Azure AI Foundry" },
      { name: "Azure OpenAI Studio" },
      { name: "text-embedding-3" },
      { name: "DALL-E 3" },
    ],
  },
  {
    label: "RAG & SEARCH",
    icon: Database,
    items: [
      { name: "Azure AI Search" },
      { name: "Semantic Re-ranking" },
      { name: "Hybrid Retrieval" },
      { name: "Redis Cache" },
      { name: "Cosmos DB" },
      { name: "Vector Indexing" },
    ],
  },
  {
    label: "MICROSOFT PLATFORM",
    icon: Layers,
    items: [
      { name: "Microsoft 365 Copilot" },
      { name: "Teams AI Library" },
      { name: "Power Platform" },
      { name: "SharePoint" },
      { name: "Dynamics 365" },
      { name: "Microsoft Graph" },
    ],
  },
  {
    label: "AZURE INFRASTRUCTURE",
    icon: Server,
    items: [
      { name: "Azure Virtual Network" },
      { name: "Azure Private Link" },
      { name: "Azure API Management" },
      { name: "Azure Functions" },
      { name: "Azure Container Apps" },
      { name: "Azure Kubernetes Service" },
    ],
  },
  {
    label: "SECURITY & GOVERNANCE",
    icon: Shield,
    items: [
      { name: "Microsoft Entra ID" },
      { name: "Azure Key Vault" },
      { name: "Azure Content Safety" },
      { name: "Customer-Managed Keys" },
      { name: "RBAC" },
      { name: "Azure Monitor" },
    ],
  },
  {
    label: "AI ORCHESTRATION",
    icon: Network,
    items: [
      { name: "LangChain" },
      { name: "Semantic Kernel" },
      { name: "AutoGen" },
      { name: "Azure AI Studio" },
      { name: "Prompt Flow" },
    ],
  },
  {
    label: "DEVELOPMENT & APIs",
    icon: Code2,
    items: [
      { name: "Python" },
      { name: "TypeScript" },
      { name: "REST APIs" },
      { name: "Azure DevOps" },
      { name: "GitHub Actions" },
    ],
  },
];

const techToImgUrl: Record<string, string> = {
  "GPT-4o": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "GPT-4o-mini": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "Azure AI Foundry": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure OpenAI Studio": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "text-embedding-3": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "DALL-E 3": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "Azure AI Search": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Semantic Re-ranking": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Hybrid Retrieval": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Redis Cache": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  "Cosmos DB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Vector Indexing": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Microsoft 365 Copilot": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "Teams AI Library": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "Power Platform": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "SharePoint": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "Dynamics 365": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "Microsoft Graph": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "Azure Virtual Network": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure Private Link": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure API Management": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure Functions": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure Container Apps": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure Kubernetes Service": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
  "Microsoft Entra ID": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "Azure Key Vault": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure Content Safety": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Customer-Managed Keys": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "RBAC": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "Azure Monitor": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "LangChain": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "Semantic Kernel": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "AutoGen": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "Azure AI Studio": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Prompt Flow": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "REST APIs": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "Azure DevOps": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "GitHub Actions": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
};

type Tech = {
  name: string;
  category: string;
  categoryIcon?: LucideIcon | React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  imgUrl: string | null;
};

function TechTile({ tech }: { tech: Tech }) {
  const [failed, setFailed] = useState(false);
  const Icon = tech.categoryIcon;
  const showImg = Boolean(tech.imgUrl && !failed);

  return (
    <div className="tech-tile group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/80 py-2.5 pl-2.5 pr-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF5812]/60 hover:bg-white hover:shadow-[0_10px_30px_-10px_rgba(255,88,18,0.35)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-50 ring-1 ring-inset ring-zinc-200 transition-colors duration-300 group-hover:bg-orange-50 group-hover:ring-[#FF5812]/30">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tech.imgUrl || ""}
            alt={`${tech.name} logo`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-6 w-6 object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : Icon ? (
          <Icon className="h-5 w-5 text-[#FF5812]" strokeWidth={1.5} />
        ) : (
          <span className="text-sm font-semibold text-[#FF5812]">
            {tech.name.charAt(0)}
          </span>
        )}
      </span>

      <span className="flex flex-col leading-tight">
        <span className="whitespace-nowrap text-sm font-semibold text-zinc-900">
          {tech.name}
        </span>
        <span className="whitespace-nowrap text-xs text-zinc-500">
          {tech.category}
        </span>
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration,
}: {
  items: Tech[];
  reverse?: boolean;
  duration: number;
}) {
  const strip = useMemo<Tech[]>(() => {
    if (items.length === 0) return [];
    const reps = Math.max(1, Math.ceil(14 / items.length));
    return Array.from({ length: reps }).flatMap(() => items);
  }, [items]);

  return (
    <div className="marquee-mask group/row relative overflow-hidden py-1.5">
      <div
        className="marquee-track flex w-max gap-3"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: (reverse ? "reverse" : "normal") as React.CSSProperties["animationDirection"],
        }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 gap-3"
            aria-hidden={copy === 1}
          >
            {strip.map((tech, i) => (
              <TechTile key={`${copy}-${tech.name}-${i}`} tech={tech} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AzureOpenAITechnologyStack() {
  const [active, setActive] = useState<string>("All");

  const categories = useMemo(
    () =>
      azureOpenAITechCategories.map((c) => ({
        label: c.label,
        icon: c.icon,
        items: c.items,
      })),
    []
  );

  const allTechs = useMemo<Tech[]>(
    () =>
      categories.flatMap((cat) =>
        cat.items.map((item) => ({
          name: item.name,
          category: cat.label,
          categoryIcon: cat.icon,
          imgUrl: techToImgUrl[item.name] || null,
        }))
      ),
    [categories]
  );

  const visible = useMemo<Tech[]>(
    () =>
      active === "All" ? allTechs : allTechs.filter((t) => t.category === active),
    [active, allTechs]
  );

  const rowA = useMemo<Tech[]>(() => visible.filter((_, i) => i % 2 === 0), [visible]);
  const rowB = useMemo<Tech[]>(() => visible.filter((_, i) => i % 2 === 1), [visible]);
  const rows = [rowA, rowB.length ? rowB : rowA];

  const tabs = useMemo<string[]>(
    () => ["All", ...categories.map((c) => c.label)],
    [categories]
  );

  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-white py-12 text-slate-900 md:py-20">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[480px] w-[860px] -translate-x-1/2 rounded-full bg-orange-500/[0.06] blur-[140px]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #e4e4e7 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        {/* HEADER */}
        <div className="mb-10 grid grid-cols-1 items-end gap-x-24 gap-y-6 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-medium text-[#FF5812]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5812] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
              </span>
              AZURE OPENAI TECHNOLOGY STACK
            </span>

            <h2 className="typo-heading-2 text-slate-900 lg:pr-12">
              Technology Stack Powering{" "}
              <span className="bg-gradient-to-r from-[#FF5812] to-amber-500 bg-clip-text text-transparent">
                Enterprise Azure OpenAI
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="typo-description w-full text-slate-500 lg:max-w-xl">
              We work across the full Azure OpenAI ecosystem — from GPT-4o models and Azure AI Search to Microsoft Copilot, secure landing zones, AI orchestration frameworks, and enterprise DevOps pipelines.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              <span className="font-semibold text-zinc-900">40+</span>{" "}
              technologies across{" "}
              <span className="font-semibold text-zinc-900">7</span>{" "}
              layers of the AI stack
            </p>
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div
          role="tablist"
          aria-label="Filter technologies by category"
          className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const isActive = tab === active;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812] focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-[#FF5812] bg-[#FF5812] text-white shadow-[0_8px_20px_-8px_rgba(255,88,18,0.7)]"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-[#FF5812]/50 hover:text-[#FF5812]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* DUAL MARQUEE */}
        <div key={active} className="marquee-fade-in flex flex-col gap-2.5 overflow-hidden">
          {rows.map((row, i) => (
            <MarqueeRow
              key={i}
              items={row}
              reverse={i === 1}
              duration={Math.max(30, row.length * 4.5)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation-name: marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .group\\/row:hover .marquee-track,
        .group\\/row:focus-within .marquee-track {
          animation-play-state: paused;
        }
        .marquee-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
                  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }
        .marquee-fade-in {
          animation: marquee-in 0.45s ease-out both;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
          .marquee-mask { overflow-x: auto; }
          .marquee-fade-in { animation: none; }
        }
      `}</style>
    </section>
  );
}

export default AzureOpenAITechnologyStack;
