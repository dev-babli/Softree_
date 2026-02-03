"use client";

import Image from "next/image";
import { Plug, BrainCircuit, Database, LucideIcon } from "lucide-react";

export default function PowerPlatformSection() {
  return (
    <section className="py-36 bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* ================= HEADER ================= */}
        <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900">
          Microsoft Power Platform Ecosystem
        </h2>

        <p className="mt-4 text-zinc-600 max-w-3xl mx-auto">
          Build, automate, analyze, and extend intelligent business solutions
          using Microsoft’s unified low-code platform.
        </p>


        {/* ================= TOP FLOW ================= */}
        <div className="relative mt-24">

          {/* connector line */}
          <div className="hidden md:block absolute top-[56px] left-0 right-0 h-px bg-zinc-200" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

            <PlatformItem
              title="Power BI"
              desc="Transform data into actionable insights with interactive analytics"
              logo="/images/power-bi.webp"
            />

            <PlatformItem
              title="Power Apps"
              desc="Rapidly build secure business applications using low-code tools"
              logo="/images/power-apps.webp"
            />

            <PlatformItem
              title="Power Automate"
              desc="Automate workflows and integrate systems across the enterprise"
              logo="/images/power-auto.webp"
            />

            <PlatformItem
              title="Power Virtual Agents"
              desc="Create intelligent conversational agents with minimal coding"
              logo="/images/copilot-logo-1.webp"
            />
          </div>
        </div>


        {/* ================= BOTTOM NODES ================= */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-16">

          <AdvancedBottomNode
            title="Data Connectors"
            desc="Integrate hundreds of cloud and on-premise data sources securely"
            icon={Plug}
          />

          <AdvancedBottomNode
            title="AI Builder"
            desc="Embed AI capabilities such as prediction, vision, and text analysis"
            icon={BrainCircuit}
          />

          <AdvancedBottomNode
            title="Dataverse"
            desc="A scalable and secure data platform for business applications"
            icon={Database}
          />
        </div>
      </div>
    </section>
  );
}


/* ================= PLATFORM ITEM ================= */
function PlatformItem({
  title,
  desc,
  logo,
}: {
  title: string;
  desc: string;
  logo: string;
}) {
  return (
    <div className="group flex flex-col items-center">

      <div
        className="
          w-28 h-28 rounded-full
          bg-white
          border border-zinc-200
          shadow-sm
          flex items-center justify-center
          transition-all duration-300
          group-hover:-translate-y-2 group-hover:shadow-lg
        "
      >
        <Image src={logo} alt={title} width={40} height={40} />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-zinc-900">
        {title}
      </h3>

      <p className="text-sm text-zinc-600 max-w-[240px]">
        {desc}
      </p>
    </div>
  );
}


/* ================= BOTTOM NODE ================= */
function AdvancedBottomNode({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon: LucideIcon;
}) {
  return (
    <div className="group flex flex-col items-center">

      <div
        className="
          w-24 h-24 rounded-2xl
          bg-white
          border border-zinc-200
          shadow-sm
          flex items-center justify-center
          transition-all duration-300
          group-hover:-translate-y-2 group-hover:shadow-lg
        "
      >
        <Icon className="w-10 h-10 text-blue-600" />
      </div>

      <h4 className="mt-6 text-lg font-semibold text-zinc-900">
        {title}
      </h4>

      <p className="mt-2 text-sm text-zinc-600 max-w-[240px] text-center">
        {desc}
      </p>
    </div>
  );
}
