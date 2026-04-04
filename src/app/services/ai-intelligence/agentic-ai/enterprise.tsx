import { Play } from "lucide-react";

export default function EnterpriseAIBenefits() {
  const left = [
    {
      title: "Operational Excellence",
      desc: "Enterprise AI agents continuously monitor workflows, predict disruptions, and autonomously resolve inefficiencies to keep operations running at peak performance.",
    },
    {
      title: "Insight-Led Decisions",
      desc: "Transform massive volumes of enterprise data into real-time, contextual intelligence that empowers leaders to act faster and with greater confidence.",
    },
    {
      title: "Workforce Amplification",
      desc: "Free your teams from repetitive effort and enable them to focus on innovation, strategy, and high-impact outcomes while AI handles execution at scale.",
    },
  ];

  const right = [
    {
      title: "Elastic Scalability",
      desc: "Instantly expand or contract AI-driven operations in response to market dynamics without the delays and costs of traditional resourcing.",
    },
    {
      title: "Adaptive Learning",
      desc: "With every interaction, AI agents refine their understanding, optimize decisions, and improve performance aligned to your evolving business goals.",
    },
    {
      title: "Sustainable Advantage",
      desc: "Organizations that operationalize AI early create compounding gains in speed, efficiency, and innovation that are difficult for competitors to replicate.",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-wider uppercase text-purple-600">
            Business Impact
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            Transforming Operations with Intelligent AI Agents
          </h2>
        </div>

        {/* description */}
        <p className="mt-6 text-slate-600 leading-relaxed max-w-5xl">
          Enterprise AI agents help organizations run smarter, faster, and more
          efficiently. By autonomously executing tasks, orchestrating workflows,
          and learning from data, they reduce operational overhead while
          empowering teams to focus on strategic initiatives that drive
          measurable growth.
        </p>

        {/* grid */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 mt-10">
          {/* LEFT */}
          <div className="space-y-6">
            {left.map((item, i) => (
              <div key={i} className="flex gap-4">
                <Play className="w-8 h-8 mt-1 text-gray-600 fill-gray-600" />

                <p className="text-slate-700 leading-relaxed">
                  <span className="font-semibold">{item.title}</span> –{" "}
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {right.map((item, i) => (
              <div key={i} className="flex gap-4">
                <Play className="w-8 h-8 mt-1 text-gray-600 fill-gray-600" />

                <p className="text-slate-700 leading-relaxed">
                  <span className="font-semibold">{item.title}</span> –{" "}
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
