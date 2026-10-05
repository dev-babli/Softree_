"use client";

import React from "react";
import { ScrollGallery } from "@/components/ui/scroll-gallery";

const slides = [
  {
    title: "LangChain Application Development",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80",
    url: "/solutions/lang-chain-development",
    linkLabel: "Explore App Dev",
  },
  {
    title: "Enterprise RAG Development",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1600&auto=format&fit=crop&q=80",
    url: "/solutions/enterprise-rag-development",
    linkLabel: "Explore RAG",
  },
  {
    title: "LangGraph Multi-Agent Orchestration",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&auto=format&fit=crop&q=80",
    url: "/solutions/ai-agents-development",
    linkLabel: "Explore Agents",
  },
  {
    title: "Vector Database & Semantic Search",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80",
    url: "/solutions/lang-chain-development",
    linkLabel: "Explore Vector DBs",
  },
];

export default function ScrollGalleryDemo() {
  return (
    <div className="w-full h-screen">
      <ScrollGallery slides={slides} variant="studio" prefixLabel="LangChain Services" />
    </div>
  );
}
