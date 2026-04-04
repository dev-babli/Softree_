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
    accent: "from-white/35 via-white/15 to-transparent",
    items: [
      { name: "TypeScript", icon: SiJavascript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "C#", icon: FaCode },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS / SCSS", icon: SiCss3 },
    ],
  },
  {
    title: "Tools",
    accent: "from-white/30 via-white/12 to-transparent",
    items: [
      { name: "SharePoint Framework (SPFx)", icon: FaCode },
      { name: "Visual Studio Code", icon: MdDeveloperMode },
      { name: "PnP PowerShell", icon: FaCogs },
      { name: "PowerShell", icon: MdDeveloperMode },
      { name: "Node.js & Gulp", icon: FaCogs },
    ],
  },
  {
    title: "Frameworks & APIs",
    accent: "from-white/20 via-white/8 to-transparent",
    items: [
      { name: "React.js", icon: SiReact },
      { name: "SharePoint REST API", icon: MdDataObject },
      { name: "Microsoft Graph API", icon: MdDataObject },
      { name: ".NET Framework", icon: FaCode },
      { name: "PnP JS", icon: FaLayerGroup },
    ],
  },
  {
    title: "Data & Storage",
    accent: "from-white/20 via-white/8 to-transparent",
    items: [
      { name: "SharePoint Lists", icon: MdStorage },
      { name: "Document Libraries", icon: MdStorage },
      { name: "Microsoft Dataverse", icon: FaDatabase },
      { name: "SQL Server / Azure SQL", icon: FaDatabase },
      { name: "Microsoft 365", icon: FaCloud },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.12),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-4 px-4">
          {/* Eyebrow */}
          <span
            className="
      inline-flex items-center gap-2
      text-sm font-semibold tracking-widest uppercase
      text-blue-600
    "
          >
            <MdAutoAwesome className="text-blue-600" />
            SharePoint Technology Stack
          </span>

          {/* Heading */}
          <h2 className="mt-6 text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-gray-900">
            Built on a Modern, <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Scalable SharePoint Ecosystem
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto">
            Our SharePoint technology stack enables secure portal development,
            custom SPFx solutions, workflow automation, and seamless Microsoft
            365 integration. We build scalable intranets, document management
            systems, and enterprise-grade business applications.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          {techStacks.map((stack, idx) => (
            <div
              key={idx}
              className="relative group rounded-[28px] p-[1px] bg-gradient-to-r from-black via-[#0f2f7a] to-black hover:from-blue-500/40 transition-all duration-500"
            >
              <div className="h-full rounded-[28px] bg-gradient-to-r from-black via-[#0f2f7a] to-black p-7">
                {/* Card title */}
                {/* Card title */}
                <div className="mb-8">
                  <span
                    className={`
      inline-flex items-center
      px-5 py-2
      rounded-full
      text-sm font-semibold text-white
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
                          className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${stack.accent} text-white shadow-lg`}
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
