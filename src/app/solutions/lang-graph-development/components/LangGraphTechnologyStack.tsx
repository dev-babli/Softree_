"use client";

import React, { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { langchainTechCategories } from "@/app/solutions/lang-chain-development/data/tech-stack";

/* -------------------------------------------------------------------------- */
/*  Logo map                                                                  */
/* -------------------------------------------------------------------------- */
const techToImgUrl: Record<string, string> = {
  LangChain: "https://cdn.simpleicons.org/langchain/FF5812",
  OpenAI: "https://cdn.simpleicons.org/openai/FF5812",
  "Azure OpenAI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Microsoft Azure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure AI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Amazon Bedrock": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "AWS Lambda": "https://cdn.simpleicons.org/awslambda/FF5812",
  "Anthropic Claude": "https://cdn.simpleicons.org/anthropic/FF5812",
  Gemini: "https://cdn.simpleicons.org/google/FF5812",
  Mistral: "https://cdn.simpleicons.org/mistral/FF5812",
  Python: "https://cdn.simpleicons.org/python/FF5812",
  FastAPI: "https://cdn.simpleicons.org/fastapi/FF5812",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/FF5812",
  GraphQL: "https://cdn.simpleicons.org/graphql/FF5812",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql/FF5812",
  MongoDB: "https://cdn.simpleicons.org/mongodb/FF5812",
  Redis: "https://cdn.simpleicons.org/redis/FF5812",
  Docker: "https://cdn.simpleicons.org/docker/FF5812",
  React: "https://cdn.simpleicons.org/react/FF5812",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/FF5812",
  TypeScript: "https://cdn.simpleicons.org/typescript/FF5812",
  JavaScript: "https://cdn.simpleicons.org/javascript/FF5812",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/FF5812",
  Elasticsearch: "https://cdn.simpleicons.org/elasticsearch/FF5812",
  PostHog: "https://cdn.simpleicons.org/posthog/FF5812",
  Qdrant: "https://cdn.simpleicons.org/qdrant/FF5812",
  ChromaDB: "https://cdn.simpleicons.org/chroma/FF5812",
  Weaviate: "https://cdn.simpleicons.org/weaviate/FF5812",
};

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
export default function LangGraphTechnologyStack() {
  const [active, setActive] = useState<string>("All");

  const categories = useMemo(
    () =>
      langchainTechCategories.map((c) => ({
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
  const rows = rowB.length ? [rowA, rowB] : [rowA];

  const tabs = useMemo<string[]>(
    () => ["All", ...categories.map((c) => c.label)],
    [categories]
  );

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
                LangGraph AI Agent Development
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="typo-description w-full text-slate-500 lg:max-w-xl">
              Modern technologies for building scalable LangGraph applications, AI agents, multi-agent systems, stateful workflows, and enterprise agentic AI platforms.
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
