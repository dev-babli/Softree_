import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import CaseStudyGrid from "./case-study-grid";
import { Factory, AlertTriangle, Workflow, TrendingUp } from "lucide-react";
import StartProjectSection from "./start-project";

export default function PowerAppsCaseStudiesPage() {
  return (
    <>
      <NavigationClient />
      <section className="relative bg-gradient-to-b from-black via-[#020d1a] to-black py-44 overflow-hidden">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-48 -left-48 h-[700px] w-[700px] rounded-full bg-blue-600/20 blur-[180px]" />
          <div className="absolute -bottom-48 -right-48 h-[700px] w-[700px] rounded-full bg-indigo-600/20 blur-[180px]" />
        </div>

        {/* Subtle Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]
      bg-[linear-gradient(to_right,white_1px,transparent_1px),
          linear-gradient(to_bottom,white_1px,transparent_1px)]
      bg-[size:90px_90px]"
        />

        <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.2fr_1fr] gap-24 items-center">
          {/* LEFT — CONTENT */}
          <div>
            {/* Eyebrow */}
            <p className="text-xs uppercase tracking-[0.35em] text-white/45 mb-8">
              Power Platform · Case Study
            </p>

            {/* Headline */}
            <h1 className="text-6xl lg:text-6xl font-semibold leading-[1.03] mb-10">
              Enterprise Automation Built on{" "}
              <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Microsoft Power Platform
              </span>
            </h1>

            {/* Subtext */}
            <div className="relative pl-8 mb-14">
              <span className="absolute left-0 top-0 h-full w-px bg-white/20" />
              <p className="text-1xl text-white/75 max-w-2xl">
                Designing a governed, scalable low-code ecosystem that
                accelerated business processes while meeting enterprise security
                and compliance standards.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-10 max-w-2xl">
              {[
                { value: "60%", label: "Faster Delivery" },
                { value: "40%", label: "Process Automation" },
                { value: "99.9%", label: "Operational Reliability" },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-4xl font-semibold text-white mb-1">
                    {item.value}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-white/45">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — SYSTEM OVERVIEW (ULTRA ADVANCED) */}
          <div className="relative">
            {/* Outer Frame */}
            <div
              className="
      relative rounded-3xl
      border border-white/10
      bg-gradient-to-b from-white/[0.06] to-white/[0.02]
      backdrop-blur-xl
      p-12
    "
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Solution Architecture
                </p>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs uppercase tracking-widest text-white/40">
                    Enterprise Ready
                  </span>
                </div>
              </div>

              {/* Architecture Stack */}
              <div className="relative pl-10">
                {/* Vertical System Spine */}
                <span className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />

                <div className="space-y-10">
                  {[
                    {
                      layer: "Application Layer",
                      value: "Power Apps (Canvas & Model-Driven)",
                    },
                    {
                      layer: "Automation Layer",
                      value: "Power Automate workflows",
                    },
                    {
                      layer: "Data Layer",
                      value: "Dataverse as secure data foundation",
                    },
                    {
                      layer: "Integration Layer",
                      value: "Azure Functions & REST APIs",
                    },
                    {
                      layer: "Governance Layer",
                      value: "ALM, environments & compliance strategy",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="
              group relative
              flex items-start gap-6
            "
                    >
                      {/* Node */}
                      <div className="relative mt-2">
                        <span
                          className="
                  block h-3 w-3 rounded-full
                  bg-blue-400/80
                  ring-4 ring-blue-400/10
                  group-hover:bg-blue-400
                  transition
                "
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-1">
                        <p className="text-xs uppercase tracking-widest text-white/45">
                          {item.layer}
                        </p>
                        <p className="text-lg text-white/80 group-hover:text-white transition">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CaseStudyGrid />
      <section className="relative bg-gradient-to-b from-black via-[#020d1a] to-black">
        {/* Ambient top glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          {/* Section Title */}
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Featured Power Apps Case Study
            </p>
            <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
              Manufacturing Workflow Automation
            </h3>
          </div>

          {/* Card */}
          <div
            className="
        relative grid grid-cols-1 md:grid-cols-2
        overflow-hidden rounded-3xl
        border border-white/10
        bg-gradient-to-br from-black/40 via-white/10 to-black/50
        shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]
        backdrop-blur-xl
      "
          >
            {/* LEFT CONTENT */}
            <div className="relative z-10 p-8 md:p-10">
              {/* Industry Badge */}
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                <Factory size={16} className="text-zinc-300" />
                Manufacturing Industry
              </span>

              {/* Gradient Title */}
              <h3
                className="
            mt-4 text-2xl md:text-3xl font-semibold
            bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500
            bg-clip-text text-transparent
          "
              >
                Manufacturing Workflow Automation
              </h3>

              {/* Description */}
              <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-zinc-400">
                A custom Power Apps solution designed to automate manufacturing
                workflows, reduce manual intervention, and improve real-time
                production visibility across multiple facilities.
              </p>

              {/* Challenge / Solution / Result */}
              <div className="mt-8 space-y-6">
                {/* Challenge */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                    <AlertTriangle size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      Challenge
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                      Manual and disconnected processes causing operational
                      delays and lack of production visibility.
                    </p>
                  </div>
                </div>

                {/* Solution */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                    <Workflow size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      Solution
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                      A custom Power Apps workflow automating approvals,
                      tracking, and real-time data synchronization across
                      manufacturing plants.
                    </p>
                  </div>
                </div>

                {/* Result */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                    <TrendingUp size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      Result
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                      50% faster production cycles with improved transparency
                      and significantly reduced manual intervention.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative min-h-[300px]">
              <img
                src="/images/case-study.jpg"
                alt="Manufacturing Automation"
                className="h-full w-full object-cover"
              />

              {/* Image gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

              {/* Microsoft Badge */}
              <div className="absolute bottom-4 right-4 rounded-xl bg-white px-3 py-2 shadow-lg">
                <p className="text-[11px] font-medium text-gray-600">
                  Microsoft Partner
                </p>
                <p className="text-[11px] font-semibold text-gray-900">
                  Certified
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-gradient-to-b from-black via-[#020d1a] to-black py-24">
        {/* Subtle Grid Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] 
                  bg-[linear-gradient(to_right,white_1px,transparent_1px),
                      linear-gradient(to_bottom,white_1px,transparent_1px)]
                  bg-[size:80px_80px]"
        />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Eyebrow */}
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-16">
            Enterprise Power Platform Capabilities
          </p>

          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-28 items-stretch">
            {/* LEFT — WHY CHOOSE US */}
            <div className="flex flex-col h-full">
              <h2 className="text-5xl font-semibold leading-[1.03] mb-12">
                Why Choose Us
              </h2>

              {/* Intro with Axis */}
              <div className="relative pl-10 mb-14">
                <span className="absolute left-2 top-0 h-full w-px bg-white/15" />
                <p className="text-1xl text-white/75 max-w-xl">
                  We design Power Platform solutions as long-term digital
                  systems — not short-lived apps.
                </p>
              </div>

              {/* Advanced List */}
              <ul className="relative space-y-9 text-xl text-white/70 mt-auto pl-2">
                {/* Vertical Connector */}
                <span className="absolute left-[18px] top-2 h-full w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />

                {[
                  "Power Platform–first architecture strategy",
                  "Low-code speed with Azure extensibility",
                  "Enterprise security, governance & ALM",
                  "Seamless Microsoft 365 & Azure integration",
                  "Data-driven automation & insights",
                  "Delivery focused on scale & sustainability",
                ].map((item, i) => (
                  <li key={i} className="group relative flex items-start gap-6">
                    {/* Tick SVG */}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0 mt-1.5 transition-transform duration-300 group-hover:scale-110"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="8"
                        stroke="#60a5fa"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M7.5 12.5L10.5 15.5L16.5 9.5"
                        stroke="#60a5fa"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CENTER AXIS */}
            <div className="hidden lg:flex items-stretch">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            </div>
            {/* RIGHT — TECH STACK (WITH BIGGER ICONS) */}
            <div className="flex flex-col h-full">
              <h2 className="relative inline-block text-5xl font-semibold leading-[1.03] mb-14">
                Tech Stack
              </h2>

              <div className="mt-auto">
                <div className="space-y-16 text-xl text-white/70">
                  {[
                    {
                      label: "Power Platform",
                      value:
                        "Power Apps · Power Automate · Power BI · Dataverse",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                        >
                          <path
                            d="M4 7L12 3L20 7V17L12 21L4 17V7Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),
                    },
                    {
                      label: "Azure Services",
                      value:
                        "Azure Functions · API Management · Cognitive Services · AKS",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                        >
                          <path
                            d="M4 18L10 4H15L20 18L12 22L4 18Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),
                    },
                    {
                      label: "Data Foundation",
                      value:
                        "Azure SQL · Cosmos DB · Azure Data Lake · SQL Warehouse",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                        >
                          <ellipse
                            cx="12"
                            cy="6"
                            rx="7"
                            ry="3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M5 6V12C5 13.7 8.1 15 12 15C15.9 15 19 13.7 19 12V6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M5 12V18C5 19.7 8.1 21 12 21C15.9 21 19 19.7 19 18V12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      ),
                    },
                    {
                      label: "DevOps & ALM",
                      value:
                        "Azure DevOps · CI/CD Pipelines · Managed Solutions",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                        >
                          <path
                            d="M3 12H9L12 6L15 18L18 12H21"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),
                    },
                  ].map((item, i) => (
                    <div key={i} className="group">
                      {/* Label Row */}
                      <div className="flex items-center gap-6 mb-4">
                        <span className="h-px flex-1 bg-white/10 group-hover:bg-white/25 transition" />

                        {/* Label with Bigger Icon */}
                        <span
                          className="
                inline-flex items-center gap-3
                px-5 py-2
                text-xs uppercase tracking-widest
                text-white/60
                border border-white/20
                rounded-full
                backdrop-blur-sm
                group-hover:text-white/85
                group-hover:border-white/40
                transition
              "
                        >
                          <span className="text-white/55 group-hover:text-white/85 transition">
                            {item.icon}
                          </span>
                          {item.label}
                        </span>
                      </div>

                      <p className="leading-relaxed group-hover:text-white/90 transition">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StartProjectSection />
      <Footer />
    </>
  );
}
