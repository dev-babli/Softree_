import NavigationClient from "@/components/sections/navigation-client";
import CaseFooter from "../footer";
import CaseStudyGrid from "./case-study-grid";
import { Factory, AlertTriangle, Workflow, TrendingUp } from "lucide-react";
import StartProjectSection from "./start-project";
import Link from "next/link";
import HeroWithTestimonial from "./hero";

export default function PowerAppsCaseStudiesPage() {
  return (
    <>
      <NavigationClient />
      <HeroWithTestimonial />
      <section className="relative bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        {/* Ambient top glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          {/* Section Title */}
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Featured Power Apps Case Study
            </p>
            <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900">
              Manufacturing Workflow Automation
            </h3>
          </div>

          {/* Card */}
          <div
            className="
        relative grid grid-cols-1 md:grid-cols-2
        overflow-hidden rounded-3xl
        border border-slate-200
        bg-white
        shadow-[0_40px_80px_-40px_rgba(15,23,42,0.25)]
      "
          >
            {/* LEFT CONTENT */}
            <div className="relative z-10 p-8 md:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                <Factory size={16} />
                Manufacturing Industry
              </span>

              <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-900">
                Manufacturing Workflow Automation
              </h3>

              <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-slate-600">
                A custom Power Apps solution designed to automate manufacturing
                workflows, reduce manual intervention, and improve real-time
                production visibility across multiple facilities.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  {
                    title: "Challenge",
                    icon: <AlertTriangle size={20} />,
                    text: "Manual and disconnected processes causing operational delays and lack of production visibility.",
                  },
                  {
                    title: "Solution",
                    icon: <Workflow size={20} />,
                    text: "A custom Power Apps workflow automating approvals, tracking, and real-time data synchronization.",
                  },
                  {
                    title: "Result",
                    icon: <TrendingUp size={20} />,
                    text: "50% faster production cycles with improved transparency and reduced manual intervention.",
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
                src="/images/case-study.jpg"
                alt="Manufacturing Automation"
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-4 right-4 rounded-xl bg-white px-3 py-2 shadow-md">
                <p className="text-[11px] font-medium text-slate-600">
                  Microsoft Partner
                </p>
                <p className="text-[11px] font-semibold text-slate-900">
                  Certified
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CaseStudyGrid />
      <section className="relative bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-24 items-stretch">
            {/* ================= LEFT CARD ================= */}
            <div
              className="
        h-full
        rounded-2xl
        border border-slate-200/60
        bg-white/90
        backdrop-blur-sm
        p-10
        flex flex-col
        shadow-[0_25px_70px_-25px_rgba(15,23,42,0.18)]
        hover:-translate-y-1
        hover:shadow-[0_35px_90px_-25px_rgba(15,23,42,0.25)]
        transition-all duration-300
      "
            >
              <h2 className="text-5xl font-semibold mb-8 text-slate-900">
                Why Choose Us
              </h2>

              <div className="relative pl-10 mb-10">
                <span className="absolute left-2 top-0 h-full w-px bg-slate-300" />
                <p className="text-lg text-slate-600 leading-relaxed">
                  We design Power Platform solutions as long-term digital
                  systems — not short-lived apps.
                </p>
              </div>

              <ul className="space-y-6 text-lg text-slate-600">
                {[
                  "Power Platform–first architecture strategy",
                  "Low-code speed with Azure extensibility",
                  "Enterprise security, governance & ALM",
                  "Seamless Microsoft 365 & Azure integration",
                  "Data-driven automation & insights",
                  "Delivery focused on scale & sustainability",
                ].map((item, i) => (
                  <li key={i} className="group flex items-start gap-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mt-1.5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="6"
                        fill="#3b82f6"
                        opacity="0.15"
                      />
                      <path
                        d="M8.5 12.5L11 15L16 9.5"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= CENTER AXIS ================= */}
            <div className="hidden lg:flex justify-center">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-slate-300/60 to-transparent" />
            </div>

            {/* ================= RIGHT CARD ================= */}
            <div
              className="
  h-full
  rounded-2xl
  border border-slate-200/60
  bg-white
  p-10
  flex flex-col
  shadow-[0_25px_70px_-25px_rgba(15,23,42,0.18)]
  hover:-translate-y-1
  hover:shadow-[0_35px_90px_-25px_rgba(15,23,42,0.25)]
  transition-all duration-300
"
            >
              <h2 className="text-5xl font-semibold mb-8 text-slate-900">
                Tech Stack
              </h2>

              <div className="space-y-10 text-lg text-slate-800">
                {[
                  {
                    label: "Power Platform",
                    value: "Power Apps · Power Automate · Power BI · Dataverse",
                  },
                  {
                    label: "Azure Services",
                    value:
                      "Azure Functions · API Management · Cognitive Services · AKS",
                  },
                  {
                    label: "Data Foundation",
                    value:
                      "Azure SQL · Cosmos DB · Azure Data Lake · SQL Warehouse",
                  },
                  {
                    label: "DevOps & ALM",
                    value: "Azure DevOps · CI/CD Pipelines · Managed Solutions",
                  },
                ].map((item, i) => (
                  <div key={i}>
                    {/* darker label for visibility */}
                    <span
                      className="
          inline-block mb-3
          rounded-full
          bg-blue-600
          px-4 py-1.5
          text-xs font-semibold
          uppercase tracking-widest
          text-white
        "
                    >
                      {item.label}
                    </span>

                    <p className="leading-relaxed text-slate-800">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StartProjectSection />
      <CaseFooter />
    </>
  );
}
