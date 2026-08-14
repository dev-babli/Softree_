import type { TechCategory } from "@/app/services/offshore-power-platform-development/tech-stack";
import {
  Brain,
  Bot,
  Sparkles,
  Layers,
  Box,
  Network,
  Cloud,
  LayoutGrid,
  Search,
  Database,
  Workflow,
  Server,
  GitBranch,
  ShieldCheck,
  Activity,
  CheckCircle,
  MessageSquare,
} from "lucide-react";

/** Enterprise AI stack for industry solution pages (not LangChain-specific). */
export const industryTechnologyCategories: TechCategory[] = [
  {
    id: "MODELS",
    label: "MODELS",
    items: [
      { name: "OpenAI", icon: Brain },
      { name: "Anthropic", icon: Sparkles },
      { name: "Azure OpenAI", icon: Cloud },
      { name: "GPT Models", icon: Brain },
      { name: "Claude", icon: MessageSquare },
      { name: "Embeddings", icon: Network },
    ],
  },
  {
    id: "DATA & RAG",
    label: "DATA & RAG",
    items: [
      { name: "Pinecone", icon: Search },
      { name: "pgvector", icon: Database },
      { name: "Azure AI Search", icon: Search },
      { name: "Document Loaders", icon: LayoutGrid },
      { name: "Hybrid Retrieval", icon: Server },
      { name: "Knowledge Graphs", icon: Network },
    ],
  },
  {
    id: "ORCHESTRATION",
    label: "ORCHESTRATION",
    items: [
      { name: "LangGraph", icon: GitBranch },
      { name: "Multi-Agent Flows", icon: Bot },
      { name: "FastAPI", icon: Server },
      { name: "Workers / Queues", icon: Workflow },
      { name: "Redis", icon: Database },
      { name: "Webhooks", icon: Network },
    ],
  },
  {
    id: "CLOUD & DEVOPS",
    label: "CLOUD & DEVOPS",
    items: [
      { name: "AWS / Azure / GCP", icon: Cloud },
      { name: "Docker", icon: Server },
      { name: "Kubernetes", icon: Layers },
      { name: "GitHub Actions", icon: GitBranch },
      { name: "CI/CD Pipelines", icon: Workflow },
      { name: "Terraform", icon: Box },
    ],
  },
  {
    id: "GOVERNANCE",
    label: "GOVERNANCE",
    items: [
      { name: "RBAC / SSO", icon: ShieldCheck },
      { name: "Audit Logging", icon: Activity },
      { name: "Eval Harnesses", icon: CheckCircle },
      { name: "PII Controls", icon: ShieldCheck },
      { name: "HITL Reviews", icon: Bot },
      { name: "Observability", icon: Activity },
    ],
  },
];
