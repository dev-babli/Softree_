"use client";

import React, { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Bot,
  Server,
  Search,
  Database,
  Code2,
  Cloud,
  Activity,
  ShieldCheck,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Logo map                                                                  */
/* -------------------------------------------------------------------------- */
const techToImgUrl: Record<string, string> = {
  LangChain: "https://cdn.simpleicons.org/langchain/FF5812",
  LangGraph: "https://cdn.simpleicons.org/langchain/FF5812",
  "Azure OpenAI Service": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure OpenAI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Microsoft Azure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure AI Services": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure Functions": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure Container Apps": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure AI Search": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure Monitor": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Microsoft Application Insights": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Microsoft Entra ID": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "Anthropic Claude": "https://cdn.simpleicons.org/anthropic/FF5812",
  "Google Gemini": "https://cdn.simpleicons.org/google/FF5812",
  Python: "https://cdn.simpleicons.org/python/FF5812",
  FastAPI: "https://cdn.simpleicons.org/fastapi/FF5812",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/FF5812",
  GraphQL: "https://cdn.simpleicons.org/graphql/FF5812",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql/FF5812",
  "SQL Server": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
  Docker: "https://cdn.simpleicons.org/docker/FF5812",
  React: "https://cdn.simpleicons.org/react/FF5812",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/FF5812",
  TypeScript: "https://cdn.simpleicons.org/typescript/FF5812",
  JavaScript: "https://cdn.simpleicons.org/javascript/FF5812",
  Elasticsearch: "https://cdn.simpleicons.org/elasticsearch/FF5812",
  Qdrant: "https://cdn.simpleicons.org/qdrant/FF5812",
};

interface TechCategoryDef {
  id: string;
  label: string;
  icon: LucideIcon;
  items: string[];
}

const copilotTechCategories: TechCategoryDef[] = [
  {
    id: "ai-llm",
    label: "AI & LLM",
    icon: Brain,
    items: [
      "OpenAI",
      "Azure OpenAI Service",
      "Anthropic Claude",
      "Google Gemini",
      "LLMs",
      "Prompt Engineering",
    ],
  },
  {
    id: "ai-engineering",
    label: "AI Engineering",
    icon: Bot,
    items: [
      "Microsoft Copilot Studio",
      "Microsoft Foundry",
      "LangChain",
      "LangGraph",
      "Semantic Kernel",
      "LlamaIndex",
      "AI Agents",
    ],
  },
  {
    id: "backend-apis",
    label: "Backend & APIs",
    icon: Server,
    items: [
      "Python",
      "Node.js",
      "FastAPI",
      "REST APIs",
      "GraphQL",
      "Function Calling",
    ],
  },
  {
    id: "data-vector-search",
    label: "Data & Vector Search",
    icon: Search,
    items: [
      "Azure AI Search",
      "Pinecone",
      "Qdrant",
      "ChromaDB",
      "Weaviate",
      "Elasticsearch",
    ],
  },
  {
    id: "knowledge-data",
    label: "Knowledge & Data",
    icon: Database,
    items: [
      "SharePoint",
      "Microsoft Graph API",
      "Dataverse",
      "SQL Server",
      "PostgreSQL",
      "Document Processing",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Microsoft Teams Apps",
      "Chat Interfaces",
    ],
  },
  {
    id: "cloud-infrastructure",
    label: "Cloud & AI Infrastructure",
    icon: Cloud,
    items: [
      "Microsoft Azure",
      "Azure AI Services",
      "Azure Functions",
      "Azure Container Apps",
      "AWS",
      "Docker",
    ],
  },
  {
    id: "observability",
    label: "Observability & AI Evaluation",
    icon: Activity,
    items: [
      "Microsoft Application Insights",
      "Azure Monitor",
      "LangSmith",
      "Prompt Evaluation",
      "LLM Tracing",
    ],
  },
  {
    id: "security-integration",
    label: "Security & Integration",
    icon: ShieldCheck,
    items: [
      "Microsoft Entra ID",
      "OAuth 2.0",
      "Microsoft Power Platform",
      "API Authentication",
      "Role-Based Access Control",
      "CI/CD",
    ],
  },
];

type Tech = {
  name: string;
  category: string;
  categoryIcon?: LucideIcon | React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  imgUrl: string | null;
};

/* -------------------------------------------------------------------------- */
/*  Single tech tile                                                          */
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
            alt={`${tech.name} logo for AI copilot development`}
            width={24}
            height={24}
            loading="lazy"
            decoding="async"
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
  const repeated = useMemo(() => {
    if (items.length === 0) return [];
    let list = [...items];
    while (list.length < 14) {
      list = [...list, ...items];
    }
    return list;
  }, [items]);

  if (repeated.length === 0) return null;

  return (
    <div className="group/row relative flex w-full overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`marquee-track flex shrink-0 items-center gap-3 py-1.5 will-change-transform group-hover/row:[animation-play-state:paused] ${reverse ? "direction-reverse" : ""
          }`}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {repeated.map((tech, i) => (
          <TechTile key={`a-${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
      <div
        aria-hidden
        className={`marquee-track flex shrink-0 items-center gap-3 py-1.5 will-change-transform group-hover/row:[animation-play-state:paused] ${reverse ? "direction-reverse" : ""
          }`}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {repeated.map((tech, i) => (
          <TechTile key={`b-${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */
export function CopilotTechStack() {
  const [active, setActive] = useState<string>("All");

  const categories = copilotTechCategories;

  const allTechs = useMemo<Tech[]>(() => {
    const list: Tech[] = [];
    categories.forEach((cat) => {
      cat.items.forEach((itemName) => {
        list.push({
          name: itemName,
          category: cat.label,
          categoryIcon: cat.icon,
          imgUrl: techToImgUrl[itemName] ?? null,
        });
      });
    });
    return list;
  }, [categories]);

  const tabs = useMemo(() => ["All", ...categories.map((c) => c.label)], [categories]);

  const filtered = useMemo<Tech[]>(() => {
    if (active === "All") return allTechs;
    return allTechs.filter((t) => t.category === active);
  }, [active, allTechs]);

  const rows = useMemo<[Tech[], Tech[]]>(() => {
    const half = Math.ceil(filtered.length / 2);
    return [filtered.slice(0, half), filtered.slice(half)];
  }, [filtered]);

  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-white py-12 text-slate-900 md:py-20">
      {/* Backdrop: soft glow + dotted grid fading out toward the edges */}
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
        {/* ============================ HEADER ============================ */}
        <div className="mb-10 grid grid-cols-1 items-end gap-x-24 gap-y-6 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-medium text-[#FF5812]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5812] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
              </span>
              TECHNOLOGY STACK
            </span>

            <h2 className="typo-heading-2 text-slate-900 lg:pr-12">
              Technology Stack for{" "}
              <span className="bg-gradient-to-r from-[#FF5812] to-amber-500 bg-clip-text text-transparent">
                AI Copilot Development
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="typo-description w-full text-slate-500 lg:max-w-xl">
              Explore the technologies behind custom AI copilots, including LLMs, RAG, vector search, cloud AI platforms, and business application integrations.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              <span className="font-semibold text-zinc-900">
                {allTechs.length}
              </span>{" "}
              tools across{" "}
              <span className="font-semibold text-zinc-900">
                {categories.length}
              </span>{" "}
              layers of the stack
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
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% - 0.75rem));
          }
        }
        .marquee-fade-in {
          animation: marquee-fade 350ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes marquee-fade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

export default CopilotTechStack;
