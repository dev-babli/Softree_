import {
  Brain,
  Bot,
  Sparkles,
  Layers,
  Search,
  Database,
  Workflow,
  Server,
  GitBranch,
  ShieldCheck,
  Activity,
  Code2,
  Cloud,
  Cpu,
  Lock,
  KeyRound,
  FileCode2,
  Boxes,
  Zap,
  Gauge,
  Sliders,
  BarChart3,
  Globe,
  Binary,
  LucideIcon,
} from "lucide-react";

export interface TechItem {
  name: string;
  tag?: string;
  description?: string;
  icon?: LucideIcon;
  featured?: boolean;
}

export interface TechCategory {
  id: string;
  label: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  color: string;
  items: TechItem[];
}

export const langchainTechCategories: TechCategory[] = [
  {
    id: "ai-llm",
    label: "AI & LLM",
    subtitle: "Foundation Models & Reasoning Engines",
    description: "Multi-modal foundation LLMs, frontier reasoning engines, and orchestration frameworks for enterprise agents.",
    badge: "CORE INTELLIGENCE",
    icon: Brain,
    color: "from-orange-500/20 via-orange-500/10 to-transparent",
    items: [
      { name: "LangChain", tag: "Framework", description: "Modular composable chains & agent runtimes", featured: true },
      { name: "LangGraph", tag: "State Machine", description: "Cyclic multi-agent graph orchestration", featured: true },
      { name: "OpenAI", tag: "GPT-4o / o1", description: "Frontier reasoning & multi-modal intelligence", featured: true },
      { name: "Azure OpenAI", tag: "Enterprise", description: "Compliant, private enterprise LLM instances" },
      { name: "Amazon Bedrock", tag: "Managed AI", description: "Unified multi-model serverless endpoints" },
      { name: "Anthropic Claude", tag: "Claude 3.5", description: "High-accuracy coding & reasoning models", featured: true },
      { name: "Gemini", tag: "Google AI", description: "Ultra-long context multi-modal reasoning" },
      { name: "Llama", tag: "Meta Open-Source", description: "Self-hosted high-efficiency open models" },
      { name: "Mistral", tag: "Open / MoE", description: "Compact, high-throughput enterprise inference" },
      { name: "LLMs", tag: "Ecosystem", description: "Custom fine-tuned & specialized SLMs/LLMs" },
    ],
  },
  {
    id: "ai-engineering",
    label: "AI Engineering",
    subtitle: "Agentic Architecture & Tool Calling",
    description: "State-of-the-art agent architectures, cognitive workflows, and robust function-calling integrations.",
    badge: "COGNITIVE SYSTEMS",
    icon: Bot,
    color: "from-amber-500/20 via-amber-500/10 to-transparent",
    items: [
      { name: "RAG", tag: "Architecture", description: "Dense & hybrid retrieval-augmented generation", featured: true },
      { name: "AI Agents", tag: "Autonomous", description: "Goal-driven multi-step reasoning systems", featured: true },
      { name: "Agentic AI", tag: "Supervision", description: "Hierarchical multi-agent supervisor patterns" },
      { name: "Prompt Engineering", tag: "System Design", description: "Dynamic few-shot & DSPy prompt optimization" },
      { name: "LLM Orchestration", tag: "Pipelines", description: "Deterministic routing and failover mechanics" },
      { name: "Tool Calling", tag: "Execution", description: "Live schema-validated API invocation", featured: true },
      { name: "Function Calling", tag: "Structured", description: "Structured JSON output extraction and validation" },
      { name: "AI Workflows", tag: "Automation", description: "Event-driven asynchronous agent pipelines" },
    ],
  },
  {
    id: "backend-apis",
    label: "Backend & APIs",
    subtitle: "Streaming Endpoints & Microservices",
    description: "Low-latency streaming backends, asynchronous queues, and enterprise protocol gateways.",
    badge: "BACKEND RUNTIMES",
    icon: Server,
    color: "from-blue-500/20 via-blue-500/10 to-transparent",
    items: [
      { name: "Python", tag: "Primary Language", description: "Standard LangChain ecosystem environment", featured: true },
      { name: "FastAPI", tag: "Async Web API", description: "Sub-millisecond async streaming REST APIs", featured: true },
      { name: "Node.js", tag: "TypeScript Host", description: "High-concurrency microservice runtimes" },
      { name: "REST APIs", tag: "Standard", description: "OpenAPI 3.0 schema-governed endpoints" },
      { name: "GraphQL", tag: "Query Layer", description: "Flexible declarative data aggregation layer" },
      { name: "API Integration", tag: "Enterprise", description: "Connectors for SAP, Salesforce, and ERPs", featured: true },
      { name: "Webhooks", tag: "Event Gateway", description: "Real-time bi-directional event notifications" },
    ],
  },
  {
    id: "data-vector-search",
    label: "Data & Vector Search",
    subtitle: "High-Dimensional Vector Databases",
    description: "Sub-second similarity search, dense vector indexing, and hybrid lexical-semantic retrieval.",
    badge: "VECTOR RETRIEVAL",
    icon: Search,
    color: "from-emerald-500/20 via-emerald-500/10 to-transparent",
    items: [
      { name: "Vector Databases", tag: "Infrastructure", description: "Scalable high-dimensional embedding storage", featured: true },
      { name: "Pinecone", tag: "Serverless Vector", description: "Zero-ops multi-tenant vector indexing", featured: true },
      { name: "Qdrant", tag: "Rust Engine", description: "Payload-filtered ultra-fast vector search", featured: true },
      { name: "Weaviate", tag: "Graph Vector", description: "Vector-native database with built-in modules" },
      { name: "ChromaDB", tag: "Embedded Store", description: "Lightweight local and container vector store" },
      { name: "Azure AI Search", tag: "Enterprise Cloud", description: "Enterprise-grade semantic ranker & filters", featured: true },
      { name: "Elasticsearch", tag: "BM25 + Dense", description: "Distributed hybrid lexical and neural search" },
      { name: "Semantic Search", tag: "Algorithmic", description: "Cosine, dot-product, and re-ranking pipelines" },
    ],
  },
  {
    id: "knowledge-data",
    label: "Knowledge & Data",
    subtitle: "Enterprise Data Stores & Pipelines",
    description: "Reliable transactional databases, in-memory caches, and continuous indexing pipelines.",
    badge: "DATA PIPELINES",
    icon: Database,
    color: "from-teal-500/20 via-teal-500/10 to-transparent",
    items: [
      { name: "Knowledge Bases", tag: "Corpus Storage", description: "Structured & unstructured organizational docs", featured: true },
      { name: "PostgreSQL", tag: "Relational / pgvector", description: "ACID transactions with vector extension", featured: true },
      { name: "MongoDB", tag: "Document Store", description: "Flexible document storage with vector search" },
      { name: "SQL", tag: "Query Language", description: "Automated Text-to-SQL query generation" },
      { name: "Redis", tag: "Memory & Cache", description: "Ultra-fast chat history and prompt caching", featured: true },
      { name: "Document Stores", tag: "Unstructured", description: "Object storage for PDFs, DOCX, and media" },
      { name: "Data Pipelines", tag: "ETL / Sync", description: "Continuous auto-sync corpus ingestion pipelines" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    subtitle: "Interactive UI & Real-Time Chat SDKs",
    description: "Modern, responsive web apps with real-time token streaming and enterprise design systems.",
    badge: "CLIENT APPS",
    icon: Code2,
    color: "from-cyan-500/20 via-cyan-500/10 to-transparent",
    items: [
      { name: "React", tag: "Component Library", description: "Component-driven interactive UI architecture", featured: true },
      { name: "Next.js", tag: "App Framework", description: "Server components & streaming edge runtime", featured: true },
      { name: "TypeScript", tag: "Type Safety", description: "End-to-end type validation & SDK interfaces", featured: true },
      { name: "JavaScript", tag: "Modern ES6+", description: "Universal client and edge runtime execution" },
      { name: "Tailwind CSS", tag: "Design System", description: "Customizable utility-first enterprise styling" },
    ],
  },
  {
    id: "cloud-infrastructure",
    label: "Cloud & AI Infrastructure",
    subtitle: "Scalable Compute & Serverless",
    description: "Secure, compliant cloud infrastructure for high-throughput LLM workloads and microservices.",
    badge: "CLOUD PLATFORMS",
    icon: Cloud,
    color: "from-indigo-500/20 via-indigo-500/10 to-transparent",
    items: [
      { name: "Microsoft Azure", tag: "Cloud Leader", description: "Private enterprise AI & secure VPC networks", featured: true },
      { name: "AWS", tag: "Cloud Platform", description: "Global scalable compute and AI services", featured: true },
      { name: "Azure AI", tag: "Managed Services", description: "Document intelligence, vision, and speech AI" },
      { name: "Amazon Bedrock", tag: "Foundation Models", description: "Serverless multi-model LLM gateway" },
      { name: "Azure Functions", tag: "Serverless", description: "Event-driven asynchronous micro-tasks" },
      { name: "AWS Lambda", tag: "Serverless", description: "Scalable compute for background processing" },
      { name: "Docker", tag: "Containers", description: "Containerized deployments & reproducible builds", featured: true },
    ],
  },
  {
    id: "observability-evaluation",
    label: "Observability & AI Evaluation",
    subtitle: "Tracing, Quality Metrics & Guardrails",
    description: "Full-lifecycle LLM tracing, regression testing, cost monitoring, and real-time safety guardrails.",
    badge: "LLMOPS & TRACING",
    icon: Activity,
    color: "from-purple-500/20 via-purple-500/10 to-transparent",
    items: [
      { name: "LangSmith", tag: "LLMOps Gold Standard", description: "End-to-end trace observability & evals", featured: true },
      { name: "PostHog", tag: "User Analytics", description: "User behavior tracking & feature flag rollouts" },
      { name: "Application Insights", tag: "APM Telemetry", description: "Enterprise infrastructure performance monitoring" },
      { name: "LLM Evaluation", tag: "Benchmarking", description: "Automated hallucination & accuracy scorers", featured: true },
      { name: "Tracing", tag: "Execution Tree", description: "Step-by-step latency & token cost breakdown", featured: true },
      { name: "Monitoring", tag: "Alerts & Health", description: "Real-time error rate & token usage monitoring" },
    ],
  },
  {
    id: "security-integration",
    label: "Security & Integration",
    subtitle: "Zero-Trust, RBAC & Enterprise Auth",
    description: "Bank-grade identity federation, role-based document access controls, and encrypted data channels.",
    badge: "SECURITY & GOVERNANCE",
    icon: ShieldCheck,
    color: "from-rose-500/20 via-rose-500/10 to-transparent",
    items: [
      { name: "OAuth 2.0", tag: "Identity Standard", description: "Secure federated authentication protocol", featured: true },
      { name: "API Authentication", tag: "Gateways", description: "mTLS, API key rotation, and HMAC signing" },
      { name: "Role-Based Access Control", tag: "RBAC", description: "User-level document filtering in RAG queries", featured: true },
      { name: "Enterprise APIs", tag: "Connectors", description: "Encrypted secure tunnels to internal systems" },
      { name: "Secure Data Access", tag: "Compliance", description: "PII masking, SOC2 & HIPAA aligned security", featured: true },
    ],
  },
];
