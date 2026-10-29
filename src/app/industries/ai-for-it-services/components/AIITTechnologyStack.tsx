"use client";

import React, { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Monitor,
  Server,
  Sparkles,
  Bot,
  Database,
  Cloud,
  Workflow,
} from "lucide-react";

export const aiItTechCategories = [
  {
    label: "Frontend & Experience",
    icon: Monitor,
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Microsoft Teams" },
    ],
  },
  {
    label: "Backend & APIs",
    icon: Server,
    items: [
      { name: ".NET" },
      { name: "Python" },
      { name: "REST APIs" },
    ],
  },
  {
    label: "AI & LLM Models",
    icon: Sparkles,
    items: [
      { name: "Azure OpenAI" },
      { name: "Amazon Bedrock" },
      { name: "Generative AI Models" },
    ],
  },
  {
    label: "AI Frameworks",
    icon: Bot,
    items: [
      { name: "LangChain" },
      { name: "LangGraph" },
    ],
  },
  {
    label: "RAG & Enterprise Search",
    icon: Database,
    items: [
      { name: "Vector Databases" },
      { name: "Semantic Search" },
      { name: "Enterprise Knowledge Bases" },
    ],
  },
  {
    label: "Data & Cloud Platforms",
    icon: Cloud,
    items: [
      { name: "Microsoft Fabric" },
      { name: "SQL Server" },
      { name: "Cloud Storage" },
    ],
  },
  {
    label: "IT Automation & Service Management",
    icon: Workflow,
    items: [
      { name: "ServiceNow" },
      { name: "Power Automate" },
      { name: "Custom IT Workflows" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Logo map with real CDN logos                                              */
/* -------------------------------------------------------------------------- */
const techToImgUrl: Record<string, string> = {
  // Frontend & Experience
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "Microsoft Teams": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg",

  // Backend & APIs
  ".NET": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg",
  Python: "https://cdn.simpleicons.org/python/FF5812",
  "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",

  // AI & LLM Models
  "Azure OpenAI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Amazon Bedrock": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "Generative AI Models": "https://cdn.simpleicons.org/openai/FF5812",

  // AI Frameworks
  LangChain: "https://cdn.simpleicons.org/langchain/FF5812",
  LangGraph: "https://cdn.simpleicons.org/langchain/FF5812",

  // RAG & Enterprise Search
  "Vector Databases": "https://cdn.simpleicons.org/pinecone/FF5812",
  "Semantic Search": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Enterprise Knowledge Bases": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",

  // Data & Cloud Platforms
  "Microsoft Fabric": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "SQL Server": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
  "Cloud Storage": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",

  // IT Automation & Service Management
  ServiceNow: "https://cdn.simpleicons.org/servicenow/FF5812",
  "Power Automate": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "Custom IT Workflows": "https://cdn.simpleicons.org/n8n/FF5812",
};

type Tech = {
  name: string;
  category: string;
  categoryIcon?: LucideIcon | React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  imgUrl: string | null;
};

/* -------------------------------------------------------------------------- */
/*  Single tech tile with real logo                                           */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/*  Marquee row                                                               */
/* -------------------------------------------------------------------------- */
function MarqueeRow({
  items,
  reverse = false,
  duration,
}: {
  items: Tech[];
  reverse?: boolean;
  duration: number;
}) {
  // Make sure the strip is long enough to loop seamlessly on wide screens
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
        {/* Two copies → translateX(-50%) loops with no jump */}
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

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */
export function AIITTechnologyStack() {
  const [active, setActive] = useState<string>("All");

  const categories = useMemo(
    () =>
      aiItTechCategories.map((c) => ({
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

  // Split into two rows; the second row runs the other way
  const rowA = useMemo<Tech[]>(() => visible.filter((_, i) => i % 2 === 0), [visible]);
  const rowB = useMemo<Tech[]>(() => visible.filter((_, i) => i % 2 === 1), [visible]);
  const rows = [rowA, rowB.length ? rowB : rowA];

  const tabs = useMemo(
    () => ["All", ...aiItTechCategories.map((c) => c.label)],
    []
  );

  return (
    <section
      aria-labelledby="tech-stack-heading"
      className="relative overflow-hidden bg-white py-10 md:py-14 lg:py-16"
    >
      {/* Background radial accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/2 h-96 w-96 translate-x-1/2 rounded-full bg-gradient-to-br from-orange-400/10 via-orange-100/5 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        {/* ========================= HEADER ========================= */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
              <span className="typo-caption text-[#FF6B2C] uppercase">
                AI FOR IT SERVICES & SOLUTIONS
              </span>
            </div>

            <h2
              id="tech-stack-heading"
              className="typo-heading-2 text-slate-900"
            >
              AI Technology Stack for{" "}
              <span className="text-[#FF6B2C]">
                IT Services
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="typo-description w-full text-slate-500 lg:max-w-xl">
              Build AI solutions for IT services using leading AI models, LLM frameworks, RAG, cloud platforms, and automation tools to streamline IT operations, improve knowledge retrieval, and enhance service delivery.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              <span className="font-semibold text-zinc-900">AI Technologies</span>{" "}
              Across{" "}
              <span className="font-semibold text-zinc-900">7</span>{" "}
              Layers
            </p>
          </div>
        </div>

        {/* ========================= CATEGORY FILTER ====================== */}
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
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812] focus-visible:ring-offset-2 ${isActive
                    ? "border-[#FF5812] bg-[#FF5812] text-white shadow-[0_8px_20px_-8px_rgba(255,88,18,0.7)]"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-[#FF5812]/50 hover:text-[#FF5812]"
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ======================== DUAL MARQUEE (contained) =============== */}
        <div key={active} className="marquee-fade-in flex flex-col gap-2.5 overflow-hidden">
          {rows.map((row, i) => (
            <MarqueeRow
              key={`${active}-row-${i}`}
              items={row}
              reverse={i === 1}
              duration={Math.max(28, row.length * 4)}
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
        /* Pause the row the person is pointing at */
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

export default AIITTechnologyStack;
