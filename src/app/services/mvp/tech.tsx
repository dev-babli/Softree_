import React from "react";
import {
  SiAngular,
  SiReact,
  SiVuedotjs,
  SiJavascript,
  SiPhp,
  SiDjango,
  SiNodedotjs,
  SiLaravel,
  SiPython,
  SiRubyonrails,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiSqlite,
} from "react-icons/si";

import {
  FaDatabase,
  FaCode,
  FaServer,
  FaBrain,
  FaShareAlt,
  FaMicrosoft,
  FaCloud,
} from "react-icons/fa";

/* ---------------- TECH STACK DATA ---------------- */

const techStack = [
  {
    title: "Front-End",
    icon: FaCode,
    items: [
      { name: "Angular JS", icon: SiAngular },
      { name: "React JS", icon: SiReact },
      { name: "VueJS", icon: SiVuedotjs },
      { name: "JavaScript", icon: SiJavascript },
      { name: "PHP", icon: SiPhp },
    ],
  },
  {
    title: "Back-End",
    icon: FaServer,
    items: [
      { name: "Django", icon: SiDjango },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Laravel", icon: SiLaravel },
      { name: "Python", icon: SiPython },
      { name: "Ruby on Rails", icon: SiRubyonrails },
    ],
  },
  {
    title: "Database",
    icon: FaDatabase,
    items: [
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "SQLite", icon: SiSqlite },
      { name: "MS SQL", icon: FaDatabase },
    ],
  },
  {
    title: "AI",
    icon: FaBrain,
    items: [
      { name: "Machine Learning", icon: FaBrain },
      { name: "Generative AI", icon: FaBrain },
      { name: "AI Automation", icon: FaBrain },
      { name: "AI Assistants", icon: FaBrain },
    ],
  },
  {
    title: "SharePoint",
    icon: FaShareAlt,
    items: [
      { name: "SharePoint Online", icon: FaShareAlt },
      { name: "SPFx", icon: FaShareAlt },
      { name: "Power Automate", icon: FaShareAlt },
      { name: "Power Apps", icon: FaShareAlt },
    ],
  },
  {
    title: "Microsoft 365",
    icon: FaMicrosoft,
    items: [
      { name: "Office 365", icon: FaMicrosoft },
      { name: "Microsoft Teams", icon: FaMicrosoft },
      { name: "Outlook Add-ins", icon: FaMicrosoft },
      { name: "OneDrive", icon: FaMicrosoft },
    ],
  },
];

/* ---------------- COMPONENT ---------------- */

export default function MvpTechStackCitrusbug() {
  return (
    <section
      className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50

  py-16 text-white"
    >
      <div
        className="
    mx-auto 
    max-w-7xl 
    px-6 
    py-16
    rounded-3xl
  
    relative
    overflow-hidden
  "
      >
        {/* Optional subtle overlay for depth */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-white/5" />

        <h2 className="relative mb-14 text-center text-3xl font-semibold text-black">
          Technology Stack Behind Our MVP Solutions
        </h2>

        <div className="relative space-y-8">
          {techStack.map((stack, index) => {
            const CategoryIcon = stack.icon;

            return (
              <div
                key={index}
                className="flex flex-col gap-5 md:flex-row md:items-stretch"
              >
                {/* LEFT */}
                <div className="md:w-[28%] flex">
                  <div
                    className="
      relative 
      flex w-full items-center gap-3 
      rounded-xl 
      px-5 py-3 
      shadow-lg
      bg-black
      border-l-4 border-orange-500/70
    "
                  >
                    {/* subtle inner depth */}
                    <div className="absolute inset-0 rounded-xl ring-1 ring-white/5" />

                    <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10">
                      <CategoryIcon className="text-orange-500 text-base" />
                    </div>

                    <span className="relative text-base font-semibold text-white">
                      {stack.title}
                    </span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="md:w-[72%]">
                  <div
                    className="rounded-xl px-6 py-4 shadow-inner marquee-container"
                    style={{
                      background:
                        "linear-gradient(135deg, #000000 0%, #000000 100%)",
                    }}
                  >
                    <div className="marquee-track gap-5">
                      {[...stack.items, ...stack.items].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={i}
                            className="flex min-w-[160px] items-center gap-3 rounded-lg border border-white/10 bg-black px-3 py-2"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10">
                              <Icon className="text-orange-500 text-base" />
                            </div>

                            <span className="text-sm font-medium text-white whitespace-nowrap">
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
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
