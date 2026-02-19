import {
  BarChart3,
  Database,
  Cloud,
  Layers,
  RefreshCw,
  Shield,
  Brain,
  Workflow,
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
    icon: BarChart3,
    title: "Power BI Development",
    tags: [
      "Power BI Desktop",
      "Power BI Service",
      "Paginated Reports",
      "DAX",
      "Custom Visuals",
    ],
  },
  {
    icon: Database,
    title: "Data Modeling & Transformation",
    tags: [
      "Power Query (M)",
      "Star Schema",
      "Dataflows",
      "SQL Server",
      "Azure Synapse",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Data Platforms",
    tags: [
      "Azure Data Factory",
      "Azure Data Lake",
      "Azure SQL",
      "Microsoft Fabric",
      "OneLake",
    ],
  },
  {
    icon: Layers,
    title: "Data Integration",
    tags: [
      "REST APIs",
      "SharePoint",
      "Dynamics 365",
      "Excel",
      "Third-Party Systems",
    ],
  },
  {
    icon: Workflow,
    title: "Automation & Scheduling",
    tags: [
      "Power Automate",
      "Scheduled Refresh",
      "Incremental Refresh",
      "Gateway Setup",
      "ETL Pipelines",
    ],
  },
  {
    icon: Shield,
    title: "Governance & Security",
    tags: [
      "Row-Level Security (RLS)",
      "Role-Based Access",
      "Data Policies",
      "Compliance Controls",
      "Tenant Governance",
    ],
  },
  {
    icon: Brain,
    title: "Advanced Analytics",
    tags: [
      "AI Insights",
      "Forecasting",
      "R & Python Integration",
      "Machine Learning",
      "Predictive Modeling",
    ],
  },
  {
    icon: RefreshCw,
    title: "Monitoring & Optimization",
    tags: [
      "Performance Analyzer",
      "Dataset Optimization",
      "Usage Metrics",
      "Capacity Management",
      "Report Tuning",
    ],
  },
];

/* ================= COMPONENT ================= */

export default function PowerBIStackOverview() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900">
            Enterprise-Grade Power BI Technology Stack
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            We architect, implement, and optimize modern business intelligence
            ecosystems using Power BI, Azure, and Microsoft data platforms —
            delivering secure, scalable, and insight-driven analytics solutions.
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
                  bg-gradient-to-br from-amber-400/40 via-yellow-500/30 to-transparent
                  hover:from-amber-500 hover:via-yellow-500
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
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition" />

                  {/* icon */}
                  <div className="relative mb-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg">
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
                          group-hover:border-amber-300
                          group-hover:text-amber-700
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
