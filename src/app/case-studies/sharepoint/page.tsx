import NavigationClient from "@/components/sections/navigation-client";
import ProjectProcessSection from "./start-project";
import { Factory, AlertTriangle, Workflow, TrendingUp } from "lucide-react";
import CaseFooter from "../footer";
import CaseStudyGrid from "./case-study";

export default function webCaseStudiesPage() {
  return (
    <div>
      <NavigationClient />
   <section className="relative bg-gradient-to-br from-[#0b3ea8] to-[#1e73d8] text-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-10 items-center relative z-10">
    {/* LEFT CONTENT */}
    <div>
      <h1 className="text-4xl lg:text-5xl font-semibold">
        SharePoint Case Studies
      </h1>

      <p className="mt-4 text-white/80">
        Real-world SharePoint solutions delivering secure collaboration,
        automated workflows, and scalable enterprise content management.
      </p>

      <div className="flex gap-4 mt-8">
        <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium">
          Talk to a SharePoint Expert
        </button>
        <button className="border border-white/40 px-6 py-3 rounded-lg">
          View SharePoint Services
        </button>
      </div>
    </div>

    {/* RIGHT GLASS CARD */}
    <div className="relative">
      {/* Outer glow */}
      <div className="absolute -inset-2 rounded-2xl bg-white/20 blur-xl"></div>

      {/* Glass box */}
      <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl shadow-2xl p-6 text-white">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-white/70">
            SharePoint Admin Dashboard
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-1">
          SharePoint Performance Overview
        </h3>
        <p className="text-sm text-white/70 mb-6">
          Live insights from SharePoint Online & Microsoft 365
        </p>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <p className="text-xs text-white/60">Sites Delivered</p>
            <p className="text-xl font-semibold">70+</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <p className="text-xs text-white/60">Active Users</p>
            <p className="text-xl font-semibold">300K+</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <p className="text-xs text-white/60">Process Automation</p>
            <p className="text-xl font-semibold">+65%</p>
          </div>
        </div>

        {/* Chart mock */}
        <div>
          <p className="text-xs text-white/60 mb-3">
            Adoption & Workflow Efficiency
          </p>
          <div className="grid grid-cols-5 gap-2 items-end h-28">
            <div className="bg-white/40 rounded h-12" />
            <div className="bg-white/50 rounded h-20" />
            <div className="bg-white/70 rounded h-28" />
            <div className="bg-white/45 rounded h-16" />
            <div className="bg-white/35 rounded h-10" />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* 🌊 WAVE BOTTOM */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
    <svg
      viewBox="0 0 1440 120"
      className="w-full h-[120px]"
      preserveAspectRatio="none"
    >
      <path
        d="M0,64 C240,96 480,96 720,80 960,64 1200,32 1440,32 L1440,120 L0,120 Z"
        fill="#ffffff"
      />
    </svg>
  </div>
</section>
<CaseStudyGrid/>
<section className="relative bg-gradient-to-b from-white via-slate-50 to-white">
  {/* Ambient top glow */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)]" />

  <div className="relative mx-auto max-w-7xl px-6 py-24">
    {/* Section Title */}
    <div className="mb-12">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Featured SharePoint Case Study
      </p>
      <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900">
        Enterprise SharePoint Intranet Portal
      </h3>
    </div>

    {/* Card */}
    <div className="relative grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_40px_80px_-40px_rgba(15,23,42,0.25)]">
      {/* LEFT CONTENT */}
      <div className="relative z-10 p-8 md:p-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          <Factory size={16} />
          SharePoint • Microsoft 365
        </span>

        <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-900">
          Enterprise SharePoint Intranet Portal
        </h3>

        <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-slate-600">
          A modern SharePoint Online intranet designed to centralize content,
          streamline collaboration, and automate business workflows across
          departments using Microsoft 365.
        </p>

        <div className="mt-8 space-y-6">
          {[
            {
              title: "Challenge",
              icon: <AlertTriangle size={20} />,
              text: "Disconnected document repositories, manual processes, and low employee engagement across teams.",
            },
            {
              title: "Solution",
              icon: <Workflow size={20} />,
              text: "A centralized SharePoint intranet with custom site templates, Power Automate workflows, and role-based access.",
            },
            {
              title: "Result",
              icon: <TrendingUp size={20} />,
              text: "65% improvement in content discoverability and faster internal collaboration across the organization.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative min-h-[300px]">
        <img
          src="/images/sharepoint/document.png"
          alt="SharePoint Intranet Portal"
          className="h-full w-full object-cover"
        />

        <div className="absolute bottom-4 right-4 rounded-xl bg-white px-3 py-2 shadow-md">
          <p className="text-[11px] font-medium text-slate-600">
            SharePoint Online
          </p>
          <p className="text-[11px] font-semibold text-slate-900">
            Secure & Scalable
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="relative bg-white py-14">
  <div className="mx-auto max-w-7xl px-6">
    <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-24 items-stretch">
      {/* LEFT CARD */}
      <div className="h-full rounded-2xl border border-slate-200 bg-white p-10 shadow-sm flex flex-col">
        <h2 className="text-5xl font-semibold mb-8 text-slate-900">
          Why Choose Us
        </h2>

        <div className="relative pl-10 mb-10">
          <span className="absolute left-2 top-0 h-full w-px bg-slate-300" />
          <p className="text-lg text-slate-600 leading-relaxed">
            We design SharePoint solutions as enterprise-grade digital workplaces
            — secure, governed, and built for long-term adoption.
          </p>
        </div>

        <ul className="space-y-6 text-lg text-slate-600">
          {[
            "SharePoint Online & Microsoft 365 expertise",
            "Custom intranet, portals & document management",
            "Power Automate & Power Apps integration",
            "Security, governance & compliance best practices",
            "SPFx extensions & modern UI customization",
            "Scalable architecture with long-term support",
          ].map((item, i) => (
            <li key={i} className="group flex items-start gap-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-1.5 shrink-0 transition-transform duration-300 group-hover:scale-110"
              >
                <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="6" fill="#3b82f6" opacity="0.15" />
                <path
                  d="M8.5 12.5L11 15L16 9.5"
                  stroke="#3b82f6"
                  strokeWidth="2"
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
      <div className="hidden lg:flex justify-center">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
      </div>

      {/* RIGHT CARD */}
      <div className="h-full rounded-2xl border border-slate-200 bg-white p-10 shadow-sm flex flex-col">
        <h2 className="text-5xl font-semibold mb-8 text-slate-900">
          Tech Stack
        </h2>

        <div className="space-y-10 text-lg text-slate-700">
          {[
            {
              label: "Platform",
              value: "SharePoint Online · Microsoft 365 · OneDrive",
            },
            {
              label: "Customization",
              value: "SPFx · React · TypeScript · Fluent UI",
            },
            {
              label: "Automation",
              value: "Power Automate · Power Apps · Dataverse",
            },
            {
              label: "Security & DevOps",
              value: "Azure AD · Permissions · CI/CD Pipelines",
            },
          ].map((item, i) => (
            <div key={i}>
              <span className="inline-block mb-3 rounded-full border border-slate-300 bg-blue-500 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-slate-700">
                {item.label}
              </span>

              <p className="leading-relaxed text-slate-700">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


      <ProjectProcessSection />
      <CaseFooter />
    </div>
  );
}
