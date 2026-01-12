"use client";

import Image from "next/image";
import {
  Plug,
  BrainCircuit,
  Database,
  LucideIcon,
} from "lucide-react";

export default function PowerPlatformSection() {
  return (
    <section
      id="plan-pricing"
      className="relative overflow-hidden bg-[#05070C] py-36"
    >
      {/* ===== Ambient Gradients ===== */}
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 bg-cyan-500/20 blur-[160px]" />
      <div className="absolute bottom-0 -right-40 h-[420px] w-[420px] bg-indigo-600/25 blur-[160px]" />
      <div className="absolute top-1/3 -left-40 h-[420px] w-[420px] bg-purple-600/20 blur-[160px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        {/* ===== Heading ===== */}
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Microsoft Power Platform Ecosystem
        </h2>
        <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
          Build, automate, analyze, and extend intelligent business solutions
          using Microsoft’s unified low-code platform.
        </p>

        {/* ===== TOP FLOW ===== */}
        <div className="relative mt-28">
          <div className="hidden md:block absolute top-[56px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 relative">
            <PlatformItem
              title="Power BI"
              desc="Transform data into actionable insights with interactive analytics"
              logo="/images/power-bi.webp"
              glow="shadow-yellow-500/30"
              ring="from-yellow-400/60 to-yellow-600/60"
            />

            <PlatformItem
              title="Power Apps"
              desc="Rapidly build secure business applications using low-code tools"
              logo="/images/power-apps.webp"
              glow="shadow-pink-500/30"
              ring="from-pink-400/60 to-fuchsia-600/60"
            />

            <PlatformItem
              title="Power Automate"
              desc="Automate workflows and integrate systems across the enterprise"
              logo="/images/power-auto.webp"
              glow="shadow-blue-500/30"
              ring="from-blue-400/60 to-cyan-500/60"
            />

            <PlatformItem
              title="Power Virtual Agents"
              desc="Create intelligent conversational agents with minimal coding"
              logo="/images/copilot-logo-1.webp"
              glow="shadow-emerald-500/30"
              ring="from-emerald-400/60 to-teal-500/60"
            />
          </div>
        </div>

      {/* ===== BOTTOM ARCHITECTURE BRANCH ===== */}
<div className="relative mt-36">
  {/* ===== CENTRAL HUB ===== */}
  <div className="hidden md:flex absolute left-1/2 -top-28 -translate-x-1/2 items-center justify-center z-0">
    <div className="relative w-6 h-6 rounded-full bg-white shadow-md">
      <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
    </div>
  </div>

  {/* ===== VERTICAL FROM HUB ===== */}
  <div className="hidden md:block absolute left-1/2 -top-24 h-24 w-px bg-gradient-to-b from-white/50 to-white/10 z-0" />

  {/* ===== HORIZONTAL BUS ===== */}
  <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />

  {/* ===== NODE DROPS ===== */}
  <div className="hidden md:block absolute left-[16.66%] top-0 h-14 w-px bg-gradient-to-b from-white/40 to-white/0 z-0" />
  <div className="hidden md:block absolute left-1/2 top-0 h-14 w-px bg-gradient-to-b from-white/40 to-white/0 z-0" />
  <div className="hidden md:block absolute left-[83.33%] top-0 h-14 w-px bg-gradient-to-b from-white/40 to-white/0 z-0" />

  {/* ===== NODES ===== */}
  <div className="relative grid grid-cols-1 md:grid-cols-3 gap-28">
    <AdvancedBottomNode
      title="Data Connectors"
      desc="Integrate hundreds of cloud and on-premise data sources securely"
      icon={Plug}
      accent="cyan"
    />

    <AdvancedBottomNode
      title="AI Builder"
      desc="Embed AI capabilities such as prediction, vision, and text analysis"
      icon={BrainCircuit}
      accent="purple"
    />

    <AdvancedBottomNode
      title="Dataverse"
      desc="A scalable and secure data platform for business applications"
      icon={Database}
      accent="emerald"
    />
  </div>
</div>

      </div>
    </section>
  );
}

/* ================= COMPONENTS ================= */

function PlatformItem({
  title,
  desc,
  logo,
  glow,
  ring,
}: {
  title: string;
  desc: string;
  logo: string;
  glow: string;
  ring: string;
}) {
  return (
    <div className="group flex flex-col items-center relative z-10">
      <div
        className={`p-[2px] rounded-full bg-gradient-to-br ${ring} transition-all duration-500 group-hover:scale-105`}
      >
        <div
          className={`w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl ${glow} transition-all duration-500 group-hover:-translate-y-2`}
        >
          <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-md">
            <Image src={logo} alt={title} width={40} height={40} />
          </div>
        </div>
      </div>

      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}

function NodeConnector({ align }: { align: "left" | "center" | "right" }) {
  const position =
    align === "left"
      ? "left-[16.66%]"
      : align === "center"
      ? "left-1/2"
      : "left-[83.33%]";

  return (
    <div
      className={`hidden md:block absolute top-0 ${position} -translate-x-1/2 z-0`}
    >
      <div className="h-14 w-px bg-gradient-to-b from-white/30 to-white/0" />
    </div>
  );
}

function AdvancedBottomNode({
  title,
  desc,
  icon: Icon,
  accent,
}: {
  title: string;
  desc: string;
  icon: LucideIcon;
  accent: "cyan" | "purple" | "emerald";
}) {
  const styles = {
    cyan: {
      halo: "bg-cyan-400/30",
      glow: "group-hover:shadow-cyan-500/40",
      icon: "text-cyan-300",
    },
    purple: {
      halo: "bg-purple-400/30",
      glow: "group-hover:shadow-purple-500/40",
      icon: "text-purple-300",
    },
    emerald: {
      halo: "bg-emerald-400/30",
      glow: "group-hover:shadow-emerald-500/40",
      icon: "text-emerald-300",
    },
  }[accent];

  return (
    <div className="group relative isolate z-10 flex flex-col items-center">
      <div
        className={`absolute -inset-8 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${styles.halo} z-0`}
      />

      <div
        className={`relative z-10 w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl transition-all duration-500 group-hover:-translate-y-2 ${styles.glow}`}
      >
        <Icon className={`w-10 h-10 ${styles.icon}`} />
      </div>

      <h4 className="mt-6 text-lg font-semibold text-white z-10">
        {title}
      </h4>
      <p className="mt-2 text-sm text-gray-400 max-w-[240px] text-center z-10">
        {desc}
      </p>
    </div>
  );
}
