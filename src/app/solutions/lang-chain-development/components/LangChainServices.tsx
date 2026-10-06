"use client";

import React from "react";
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge";
import { ScrollGallery, ScrollGallerySlide } from "@/components/ui/scroll-gallery";
import { Sparkles } from "lucide-react";

export const langchainServicesSlides: ScrollGallerySlide[] = [
  {
    number: "01",
    tag: "ENTERPRISE LLM APPS",
    title: "LangChain Application Development",
    description:
      "Custom LLM applications built for enterprise use cases and production environments using LangChain Expression Language (LCEL).",
    deliverables: [
      "Custom LCEL pipeline architecture with streaming token support",
      "Deterministic structured output validation using Pydantic schemas",
      "Enterprise security, role-based access control (RBAC), and encryption",
      "High-concurrency microservices deployment on AWS, Azure, or GCP",
    ],
    techTags: ["LCEL", "FastAPI", "Next.js", "Docker", "Python", "TypeScript"],
    impact: "Accelerates GenAI product launches with 99.9% uptime and enterprise reliability.",
    url: "/solutions/lang-chain-development",
    linkLabel: "Explore Application Dev",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1800&auto=format&fit=crop&q=80",
  },
  {
    number: "02",
    tag: "CONTEXT-AWARE RAG",
    title: "LangChain RAG Development",
    description:
      "Context-aware RAG applications using enterprise data, hybrid vector search, and knowledge bases to eliminate hallucinations.",
    deliverables: [
      "Advanced document chunking (hierarchical, semantic, and markdown splitters)",
      "Hybrid search combining dense vector embeddings with sparse BM25 retrieval",
      "Contextual compression and cross-encoder reranking (Cohere, BGE)",
      "Hallucination detection, source citation attribution, and ground truth scoring",
    ],
    techTags: ["Hybrid RAG", "Cohere Rerank", "Pinecone", "Qdrant", "Azure AI Search"],
    impact: "Achieves >98% retrieval precision and enables accurate, grounded AI answers.",
    url: "/solutions/enterprise-rag-development",
    linkLabel: "Explore Enterprise RAG",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1800&auto=format&fit=crop&q=80",
  },
  {
    number: "03",
    tag: "AUTONOMOUS REASONING",
    title: "LangChain AI Agent Development",
    description:
      "Autonomous AI agents equipped with tool calling, multi-step logical reasoning, memory persistence, and dynamic task execution.",
    deliverables: [
      "Multi-step reasoning frameworks (ReAct, Reflection, and Tree-of-Thought)",
      "Custom tool and API function calling with strict parameter validation",
      "Episodic, working, and semantic memory architectures (Redis, Zep, DynamoDB)",
      "Human-in-the-loop checkpoint mechanisms for mission-critical approvals",
    ],
    techTags: ["ReAct Agents", "Tool Calling", "Memory Buffers", "Zep", "Human-in-the-Loop"],
    impact: "Automates complex multi-step workflows with 70%+ reduction in manual effort.",
    url: "/solutions/ai-agents-development",
    linkLabel: "Explore AI Agents",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1800&auto=format&fit=crop&q=80",
  },
  {
    number: "04",
    tag: "MULTI-MODEL ROUTING",
    title: "LangChain LLM Integration & Routing",
    description:
      "Unified multi-model orchestration layer connecting OpenAI, Azure OpenAI, Anthropic Claude, Bedrock, and open-source models.",
    deliverables: [
      "Multi-provider LLM gateway (GPT-4o, Claude 3.5 Sonnet, Gemini, Bedrock, Mistral)",
      "Dynamic cost-and-latency-based intelligent model routing",
      "Circuit breakers, exponential backoff retries, and automatic provider fallbacks",
      "Integration of self-hosted open-source models via vLLM, Ollama, and HuggingFace",
    ],
    techTags: ["OpenAI", "Azure OpenAI", "Claude 3.5", "AWS Bedrock", "vLLM", "Routing"],
    impact: "Cuts LLM inference costs by 35–50% while safeguarding against outages.",
    url: "/solutions/lang-chain-development",
    linkLabel: "Explore LLM Routing",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1800&auto=format&fit=crop&q=80",
  },
  {
    number: "05",
    tag: "PROCESS AUTOMATION",
    title: "LangChain AI Workflow Development",
    description:
      "Multi-step AI chains, prompt sequencing, conditional logic routing, and asynchronous DAG business process automation.",
    deliverables: [
      "Sequential, parallel, and branch-conditional prompt chains",
      "Asynchronous background task processing and batch document pipelines",
      "Automated prompt versioning, templating, and dynamic injection controls",
      "Real-time event-driven triggers via webhooks and message queues (Kafka, SQS)",
    ],
    techTags: ["DAG Workflows", "Async Chains", "Prompt Sequencing", "Kafka", "Celery"],
    impact: "Transforms fragmented manual workflows into high-throughput AI pipelines.",
    url: "/solutions/ai-workflow-automation",
    linkLabel: "Explore Workflows",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&auto=format&fit=crop&q=80",
  },
  {
    number: "06",
    tag: "SEMANTIC VECTOR SEARCH",
    title: "LangChain Vector Database Integration",
    description:
      "High-performance vector storage and indexing with Pinecone, Qdrant, Weaviate, ChromaDB, and Azure AI Search.",
    deliverables: [
      "Vector database cluster architecture (Pinecone, Qdrant, Weaviate, pgvector, Milvus)",
      "Automated embedding generation pipelines with embedding cache layers",
      "High-speed metadata filtering and hybrid lexical-semantic query optimization",
      "Real-time ETL data synchronization from relational databases and cloud storage",
    ],
    techTags: ["Pinecone", "Qdrant", "Weaviate", "pgvector", "ChromaDB", "Azure AI Search"],
    impact: "Delivers sub-50ms vector query latencies across enterprise knowledge collections.",
    url: "/solutions/lang-chain-development",
    linkLabel: "Explore Vector Search",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1800&auto=format&fit=crop&q=80",
  },
  {
    number: "07",
    tag: "STATEFUL AGENT GRAPHS",
    title: "LangGraph Development Services",
    description:
      "Complex multi-agent workflows, stateful orchestration, cyclical logic, checkpoint persistence, and human-in-the-loop systems.",
    deliverables: [
      "Stateful cyclical graph architectures with shared and isolated agent states",
      "Supervisor-worker and hierarchical multi-agent collaboration topologies",
      "Durable checkpointing and state persistence using PostgreSQL and Redis",
      "Interactive human-in-the-loop review nodes and step-by-step time travel debugging",
    ],
    techTags: ["LangGraph", "State Graphs", "Multi-Agent Systems", "Checkpointing", "Cyclic Logic"],
    impact: "Enables dependable execution of complex enterprise workflows that linear chains cannot handle.",
    url: "/solutions/lang-chain-development",
    linkLabel: "Explore LangGraph",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1800&auto=format&fit=crop&q=80",
  },
  {
    number: "08",
    tag: "LEGACY AI REFACTORING",
    title: "LangChain AI Modernization",
    description:
      "Upgrading legacy chatbots, fragile single-prompt scripts, and deprecated LangChain v0.1 codebases into modern LCEL and LangGraph.",
    deliverables: [
      "Legacy codebase audit, dependency upgrade, and LCEL refactoring",
      "Migration from brittle chains to modular, stateful LangGraph graphs",
      "Semantic caching implementation (GPTCache, Redis) to reduce redundant queries",
      "Benchmarked token reduction and prompt optimization for faster inference",
    ],
    techTags: ["LCEL Migration", "Token Optimization", "Semantic Caching", "Code Refactoring"],
    impact: "Reduces LLM latency by up to 60% while drastically lowering monthly token expenditure.",
    url: "/solutions/lang-chain-development",
    linkLabel: "Explore Modernization",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&auto=format&fit=crop&q=80",
  },
  {
    number: "09",
    tag: "ENTERPRISE CONNECTIVITY",
    title: "LangChain API & System Integration",
    description:
      "Connecting LangChain AI systems with enterprise CRMs, ERPs, databases, webhooks, and internal tools under strict RBAC.",
    deliverables: [
      "Custom enterprise LangChain Toolkits and OpenAPI spec connectors",
      "Secure OAuth2, SAML, and API credential management with zero data leakage",
      "Bidirectional data sync between LLM agent actions and enterprise databases",
      "Webhook listeners for real-time trigger and asynchronous status reporting",
    ],
    techTags: ["Salesforce", "HubSpot", "SAP", "Snowflake", "OpenAPI", "REST / GraphQL"],
    impact: "Allows AI systems to directly execute business actions inside enterprise tools of record.",
    url: "/solutions/lang-chain-development",
    linkLabel: "Explore Integrations",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1800&auto=format&fit=crop&q=80",
  },
  {
    number: "10",
    tag: "STRATEGIC ARCHITECTURE",
    title: "LangChain AI Consulting & Architecture",
    description:
      "Strategic advisory, technology evaluation, vector database selection, latency-cost modeling, and enterprise AI roadmaps.",
    deliverables: [
      "Enterprise AI readiness assessment and architecture blueprints",
      "Vector database and foundation model benchmarking and selection",
      "Security, PII redaction (NeMo Guardrails), and compliance roadmaps",
      "Phased POC-to-Production implementation plan and developer enablement",
    ],
    techTags: ["Architecture Blueprint", "Model Benchmarking", "Security Advisory", "POC-to-Production"],
    impact: "Eliminates architectural mistakes early, saving months of rework and technical debt.",
    url: "#contact",
    linkLabel: "Consult Architects",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&auto=format&fit=crop&q=80",
  },
];

export default function LangChainServices() {
  return (
    <section className="relative w-full bg-[#050508] text-white">
      {/* Schema.org Structured Data for SEO / AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "LangChain Development Services",
            provider: {
              "@type": "Organization",
              name: "Softree Technology",
              url: "https://www.softreetechnology.com",
            },
            serviceType: "Enterprise Generative AI & LangChain Application Development",
            description:
              "End-to-end LangChain and LangGraph development services, enterprise RAG pipelines, autonomous AI agents, multi-model orchestration, vector database integration, and legacy AI modernization.",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "LangChain Services Catalog",
              itemListElement: langchainServicesSlides.map((svc, index) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: svc.title,
                  description: svc.description,
                  position: index + 1,
                },
              })),
            },
          }),
        }}
      />

      {/* Intro Header */}
      <div className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#07070B] via-[#0B0B10] to-[#050508] px-4 sm:px-8 md:px-[3cm] text-center flex flex-col items-center">
        <SectionBadge text="OUR LANGCHAIN DEVELOPMENT SERVICES" variant="line" />

        <h2 className="text-2xl md:text-3xl lg:text-[2.35rem] font-extrabold text-white mb-3 tracking-tight leading-tight max-w-4xl mt-3">
          End-to-End LangChain Development Services for{" "}
          <span className="text-[#FF5812]">Enterprise AI</span>
        </h2>

        <p className="text-[14.5px] lg:text-[16px] text-zinc-300 max-w-3xl leading-relaxed">
          We build scalable LangChain applications that connect LLMs, enterprise data, AI agents, APIs, and business workflows to deliver production-ready generative AI solutions.
        </p>

        {/* Quick Service Highlights Badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-4xl">
          {[
            "Production RAG",
            "LangGraph Multi-Agent",
            "LCEL Pipelines",
            "Vector Search",
            "LangSmith Observability",
            "Multi-LLM Routing",
            "Enterprise Guardrails",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3 text-[#FF5812]" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Cinematic Deadlock Studios ScrollGallery - All Rich Content Inside Card */}
      <div className="w-full relative px-4 sm:px-8 md:px-[2.5cm] lg:px-[3cm] pb-16 sm:pb-24">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollGallery
            slides={langchainServicesSlides}
            variant="studio"
            prefixLabel="LangChain Services"
            scrollPerTransition={750}
            pinStart="top 12%"
            className="h-[500px] sm:h-[560px] md:h-[600px] lg:h-[640px] w-full rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          />
        </div>
      </div>
    </section>
  );
}


