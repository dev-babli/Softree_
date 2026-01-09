"use client";

import {
  FaCode,
  FaDatabase,
  FaCloud,
  FaCogs,
  FaLayerGroup,
} from "react-icons/fa";

import {
  MdDataObject,
  MdDeveloperMode,
  MdStorage,
  MdAutoAwesome,
} from "react-icons/md";

import { SiJavascript, SiHtml5, SiCss3, SiReact } from "react-icons/si";

const techStacks = [
  {
    title: "Languages",
    accent: "from-cyan-400 to-blue-500",
    items: [
      { name: "Power Fx", icon: MdDataObject },
      { name: "JavaScript", icon: SiJavascript },
      { name: "C#", icon: FaCode },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
    ],
  },
  {
    title: "Tools",
    accent: "from-purple-400 to-pink-500",
    items: [
      { name: "Power Apps Studio", icon: MdDeveloperMode },
      { name: "Power BI", icon: FaLayerGroup },
      { name: "Power Automate", icon: FaCogs },
      { name: "Microsoft Dataverse", icon: FaDatabase },
      { name: "Visual Studio Code", icon: MdDeveloperMode },
    ],
  },
  {
    title: "Frameworks",
    accent: "from-emerald-400 to-teal-500",
    items: [
      { name: "Power Platform", icon: FaLayerGroup },
      { name: "Common Data Model", icon: MdDataObject },
      { name: ".NET Framework", icon: FaCode },
      { name: "React Native", icon: SiReact },
      { name: "Model-Driven Apps", icon: MdAutoAwesome },
    ],
  },
  {
    title: "Databases",
    accent: "from-orange-400 to-red-500",
    items: [
      { name: "Microsoft Dataverse", icon: FaDatabase },
      { name: "SQL Server", icon: MdStorage },
      { name: "Azure SQL Database", icon: FaCloud },
      { name: "SharePoint", icon: FaCloud },
      { name: "Common Data Service", icon: FaDatabase },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="relative bg-[#040404] py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.12),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-24">
          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full
    bg-gradient-to-r from-blue-500/10 to-purple-500/10
    border border-white/10 text-sm text-white/70 backdrop-blur"
          >
            <MdAutoAwesome className="text-blue-400" />
            Power Platform Technology Stack
          </span>

          {/* Heading */}
          <h2 className="mt-8 text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight">
            Built on a Modern, <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Scalable Power Apps Ecosystem
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-lg leading-relaxed text-gray-400 max-w-3xl mx-auto">
            Our technology stack is designed to support secure application
            development, seamless system integration, and long-term scalability
            across the Microsoft Power Platform—enabling businesses to automate
            workflows and deliver data-driven experiences with confidence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          {techStacks.map((stack, idx) => (
            <div
              key={idx}
              className="relative group rounded-[28px] p-[1px] bg-gradient-to-br from-white/10 to-white/0 hover:from-blue-500/40 transition-all duration-500"
            >
              <div className="h-full rounded-[28px] bg-[#070707] p-7">
                {/* Card title */}
                {/* Card title */}
                <div className="mb-8">
                  <span
                    className={`
      inline-flex items-center
      px-5 py-2
      rounded-full
      text-sm font-semibold text-black
      bg-gradient-to-r ${stack.accent}
      shadow-[0_0_20px_rgba(255,255,255,0.15)]
    `}
                  >
                    {stack.title}
                  </span>
                </div>

                {/* Items */}
                <ul className="space-y-5">
                  {stack.items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={i}
                        className="flex items-center gap-4 group/item"
                      >
                        <div
                          className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${stack.accent} text-black shadow-lg`}
                        >
                          <Icon size={20} />
                        </div>
                        <span className="text-gray-300 font-medium group-hover/item:text-white transition-colors">
                          {item.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
