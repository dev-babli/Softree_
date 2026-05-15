import {
  Code2,
  Network,
  Cpu,
  Database,
  RefreshCw,
  Shield,
  BarChart3,
  BrainCircuit,
  LucideIcon,
} from "lucide-react";

/* ================= TYPES ================= */

type ToolCard = {
  icon: LucideIcon;
  title: string;
  tags: string[];
};

/* ================= DATA ================= */

const tools: ToolCard[] = [
  {
    icon: Code2,
    title: "Core Engineering & Languages",
    tags: ["Python", "TypeScript", "Go", "Rust", "Node.js"],
  },
  {
    icon: Network,
    title: "Agent Orchestration Frameworks",
    tags: [
      "LangChain",
      "AutoGen",
      "CrewAI",
      "Semantic Kernel",
      "OpenAI Functions",
    ],
  },
  {
    icon: Cpu,
    title: "Reasoning & Decision Systems",
    tags: ["PyTorch", "TensorFlow", "vLLM", "Ray RLlib", "Gymnasium"],
  },
  {
    icon: Database,
    title: "Memory & Retrieval",
    tags: ["Pinecone", "Weaviate", "FAISS", "Chroma", "Redis"],
  },
  {
    icon: RefreshCw,
    title: "Enterprise Integrations",
    tags: ["REST", "GraphQL", "gRPC", "Kafka", "Apache Airflow"],
  },
  {
    icon: Shield,
    title: "Safety, Risk & Governance",
    tags: [
      "Guardrails AI",
      "NeMo Guardrails",
      "Pydantic",
      "Humanloop",
      "OpenAI Evals",
    ],
  },
  {
    icon: BarChart3,
    title: "Observability & Optimization",
    tags: [
      "LangSmith",
      "Weights & Biases",
      "Arize AI",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    icon: BrainCircuit,
    title: "Foundation Models",
    tags: ["GPT-4", "Claude", "Llama", "Mistral", "Gemini"],
  },
];

/* ================= COMPONENT ================= */

export default function AgenticToolsOverview() {
  return (
    <section className="py-24 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900">
            Enterprise-Ready Agentic AI Stack
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            We design and deploy intelligent agents powered by a proven
            ecosystem of technologies across orchestration, reasoning, memory,
            and governance — enabling secure, scalable, and production-grade AI
            adoption.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, i) => {
            const Icon = tool.icon;

            return (
              <div
                key={i}
                className="
          group
          relative
          rounded-2xl
          p-[1px]
          bg-gradient-to-br from-purple-500/40 via-indigo-500/30 to-transparent
          hover:from-purple-500 hover:via-indigo-500
          transition duration-500
        "
              >
                {/* inner */}
                <div
                  className="
            relative
            h-full
            rounded-2xl
            bg-white/90
            backdrop-blur
            p-6
            shadow-sm
            hover:shadow-2xl
            hover:-translate-y-2
            transition duration-300
            overflow-hidden
          "
                >
                  {/* spotlight */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />

                  {/* icon */}
                  <div className="relative mb-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* title */}
                  <h3 className="relative text-lg font-semibold text-slate-900 mb-4">
                    {tool.title}
                  </h3>

                  {/* tags */}
                  <div className="relative flex flex-wrap gap-2">
                    {tool.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="
                  text-xs
                  px-3 py-1
                  rounded-full
                  bg-white
                  text-slate-700
                  border border-slate-200
                  shadow-sm
                  group-hover:border-purple-300
                  group-hover:text-purple-700
                  transition
                "
                      >
                        {tag}
                      </span>
                    ))}
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
