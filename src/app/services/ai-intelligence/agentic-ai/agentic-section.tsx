import { Globe, Database, Cpu, Settings, Rocket } from "lucide-react";

export default function AgenticProcessFlow() {
  const steps = [
    {
      id: "01",
      icon: Globe,
      title: "Discover Goals",
      desc: "Understand business objectives, challenges, and success metrics.",
    },
    {
      id: "02",
      icon: Database,
      title: "Prepare Data",
      desc: "Collect, clean, and structure data for intelligent automation.",
    },
    {
      id: "03",
      icon: Cpu,
      title: "Design Agents",
      desc: "Build AI agents tailored to workflows and decision models.",
    },
    {
      id: "04",
      icon: Settings,
      title: "Integrate Systems",
      desc: "Connect with enterprise tools, APIs, and environments.",
    },
    {
      id: "05",
      icon: Rocket,
      title: "Launch & Improve",
      desc: "Deploy, monitor performance, and continuously optimize.",
    },
  ];

  return (
    <div className="relative py-24">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900">
          From Vision to Autonomous Execution
        </h2>

        <p className="mt-4 text-zinc-600 leading-relaxed">
          We guide enterprises through a structured journey to design, deploy,
          and scale agentic AI systems. Our approach connects strategy, data,
          engineering, and operations to deliver intelligent automation that
          continuously learns and improves.
        </p>
      </div>

      {/* CONTAINER */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.id} className="relative text-center group">
                {/* NUMBER */}
                <div className="text-blue-600 font-semibold text-lg mb-4">
                  {step.id}
                </div>

                {/* ICON + CONNECTOR */}
                <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                  {index !== steps.length - 1 && (
                    <svg
                      className="hidden lg:block absolute top-1/2 left-full ml-6 -translate-y-1/2"
                      width="100"
                      height="9"
                      viewBox="0 0 80 4"
                    >
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="6"
                          markerHeight="6"
                          refX="5"
                          refY="3"
                          orient="auto"
                          markerUnits="strokeWidth"
                        >
                          <path d="M0,0 L6,3 L0,6 Z" fill="rgb(24, 26, 27)" />
                        </marker>
                      </defs>
                      <line
                        x1="0"
                        y1="2"
                        x2="80"
                        y2="2"
                        stroke="rgb(10, 10, 10)"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        strokeLinecap="round"
                        markerEnd="url(#arrowhead)"
                      />
                    </svg>
                  )}

                  {/* OUTER CIRCLE */}
                  <div className="absolute inset-0 rounded-full border border-zinc-200 bg-white shadow-sm group-hover:shadow-md transition" />

                  {/* ICON BADGE */}
                  <div className="absolute inset-3 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Icon className="w-9 h-9 text-blue-600" />
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="mt-6 text-lg font-semibold text-zinc-900">
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-3 text-zinc-600 leading-relaxed text-sm px-2">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
