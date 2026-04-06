"use client";
import { useEffect, useState } from "react";
import { Layers, Workflow, Database, Settings } from "lucide-react";

const items = [
  {
    title: "Custom Power Apps Development",
    icon: Layers,
    image: "/images/power-apps/stack1.png",
    desc: "Tailored enterprise apps built for productivity and faster internal operations.",
    points: ["Approval systems", "Inspection apps", "Internal tools"],
    challenges: ["Manual spreadsheets", "Slow approvals", "Disconnected teams"],
  },
  {
    title: "Business Process Automation",
    icon: Workflow,
    image: "/images/power-apps/stack2.png",
    desc: "Automate repetitive tasks with intelligent workflows and Power Automate.",
    points: ["Faster approvals", "Reduced errors", "Process transparency"],
    challenges: ["Manual handoffs", "Human mistakes", "Delayed processes"],
  },
  {
    title: "Enterprise Dataverse Design",
    icon: Database,
    image: "/images/power-apps/stack3.png",
    desc: "Secure, scalable and centralized data architecture for enterprise systems.",
    points: [
      "Microsoft 365 integration",
      "SQL Server sync",
      "API connectivity",
    ],
    challenges: ["Data silos", "Duplicate records", "Poor reporting"],
  },
  {
    title: "Modernization & Support",
    icon: Settings,
    image: "/images/power-apps/stack4.png",
    desc: "Upgrade legacy apps and continuously optimize performance and security.",
    points: ["App enhancements", "Performance tuning", "Security & roles"],
    challenges: ["Outdated systems", "Slow performance", "Security risks"],
  },
];

export default function StackedSlider() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % items.length);

  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-14 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900">
          What We Do with Power Apps
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Build Smart Apps, Automate Workflows, and Transform Business
          Operations
        </p>
      </div>

      {/* STACK */}
      <div className="relative w-[1100px] h-[500px] mx-auto">
        {items.map((item, index) => {
          const offset = (index - active + items.length) % items.length;
          const isActive = offset === 0;
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[440px]
  rounded-3xl overflow-hidden transition-all duration-700"
              style={{
                transform: `translateX(${offset * 80}px) scale(${1 - Math.abs(offset) * 0.06})`,
                zIndex: items.length - Math.abs(offset),
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
            >
              {/* BACKGROUND IMAGE */}
              <img
                src={item.image}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/70" />

              {/* CONTENT */}
              <div className="relative p-10 text-white h-full flex flex-col justify-between">
                {/* TOP */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                  </div>

                  <p className="text-white/80 mb-6 max-w-xl">{item.desc}</p>
                </div>

                {/* BOTTOM BOX */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-l p-6 shadow-lg">
                  <div className="grid grid-cols-2 gap-6">
                    {/* POINTS */}
                    <div>
                      <h4 className="font-semibold mb-3 text-green-400 text-lg">
                        ✅ Key Benefits
                      </h4>

                      <ul className="space-y-2 text-sm text-white/90">
                        {item.points.map((p, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-400">•</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CHALLENGES */}
                    <div>
                      <h4 className="font-semibold mb-3 text-red-400 text-lg">
                        ⚠ Challenges Solved
                      </h4>

                      <ul className="space-y-2 text-sm text-white/90">
                        {item.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-400">•</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
