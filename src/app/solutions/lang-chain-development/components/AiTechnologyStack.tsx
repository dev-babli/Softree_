"use client";

import React, { useEffect, useState } from "react";
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { langchainTechCategories } from "../data/tech-stack";

export default function AiTechnologyStack() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const timeout = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [api, current]);

  // Map technology names to their exact SVG URLs
  const techToImgUrl: Record<string, string> = {
    "LangChain": "https://cdn.simpleicons.org/langchain/FF5812",
    "OpenAI": "https://cdn.simpleicons.org/openai/FF5812",
    "Azure OpenAI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    "Microsoft Azure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    "Azure AI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    "Amazon Bedrock": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "AWS Lambda": "https://cdn.simpleicons.org/awslambda/FF5812",
    "Anthropic Claude": "https://cdn.simpleicons.org/anthropic/FF5812",
    "Gemini": "https://cdn.simpleicons.org/google/FF5812",
    "Mistral": "https://cdn.simpleicons.org/mistral/FF5812",
    "Python": "https://cdn.simpleicons.org/python/FF5812",
    "FastAPI": "https://cdn.simpleicons.org/fastapi/FF5812",
    "Node.js": "https://cdn.simpleicons.org/nodedotjs/FF5812",
    "GraphQL": "https://cdn.simpleicons.org/graphql/FF5812",
    "PostgreSQL": "https://cdn.simpleicons.org/postgresql/FF5812",
    "MongoDB": "https://cdn.simpleicons.org/mongodb/FF5812",
    "Redis": "https://cdn.simpleicons.org/redis/FF5812",
    "Docker": "https://cdn.simpleicons.org/docker/FF5812",
    "React": "https://cdn.simpleicons.org/react/FF5812",
    "Next.js": "https://cdn.simpleicons.org/nextdotjs/FF5812",
    "TypeScript": "https://cdn.simpleicons.org/typescript/FF5812",
    "JavaScript": "https://cdn.simpleicons.org/javascript/FF5812",
    "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/FF5812",
    "Elasticsearch": "https://cdn.simpleicons.org/elasticsearch/FF5812",
    "PostHog": "https://cdn.simpleicons.org/posthog/FF5812",
    "Qdrant": "https://cdn.simpleicons.org/qdrant/FF5812",
    "ChromaDB": "https://cdn.simpleicons.org/chroma/FF5812",
    "Weaviate": "https://cdn.simpleicons.org/weaviate/FF5812"
  };

  // Flatten the tech stack items and attach their parent category icon as a fallback
  const allTechs = langchainTechCategories.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      categoryIcon: category.icon,
      imgUrl: techToImgUrl[item.name] || null,
    }))
  );

  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 text-slate-900 scroll-mt-24 relative overflow-hidden">
      {/* Background Soft Glow & Grid Mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[850px] rounded-full bg-orange-500/[0.04] blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-[350px] w-[350px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #e4e4e7 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col mb-8 sm:mb-12">
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
            <span className="typo-caption text-[#FF5812] uppercase">
              TECHNOLOGY STACK
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-6 items-start">
            <h2 className="typo-heading-2 text-slate-900 lg:pr-12 xl:pr-24">
              Technology Stack for <span className="text-[#FF5812]">LangChain AI Development</span>
            </h2>

            <p className="typo-description text-slate-500 w-full pt-1.5 lg:max-w-xl">
              Modern technologies for building scalable LangChain applications, AI agents, RAG solutions, and enterprise AI platforms.
            </p>
          </div>
        </div>

        {/* ================= EXACT TECHNOLOGY/TOOL CODE ================= */}
        <div className="w-full mt-4">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {allTechs.map((tech, index) => {
                const Icon = tech.categoryIcon;
                return (
                  <CarouselItem className="basis-1/3 sm:basis-1/4 lg:basis-1/6" key={tech.name + index}>
                    <div className="flex flex-col rounded-xl aspect-square bg-white border border-zinc-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.02)] items-center justify-center p-4 gap-3 transition-colors hover:border-[#FF5812] hover:shadow-[0_8px_20px_rgba(255,88,18,0.1)]">
                      {tech.imgUrl ? (
                        <>
                          <img 
                            src={tech.imgUrl} 
                            alt={`${tech.name} logo`} 
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              if (e.currentTarget.nextElementSibling) {
                                (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                              }
                            }}
                          />
                          {Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF5812] hidden" strokeWidth={1.5} />}
                        </>
                      ) : (
                        Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF5812]" strokeWidth={1.5} />
                      )}
                      <span className="text-[11px] sm:text-xs font-bold text-center text-zinc-800 leading-tight">
                        {tech.name}
                      </span>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
