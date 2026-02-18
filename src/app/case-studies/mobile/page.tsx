import NavigationClient from "@/components/sections/navigation-client";
import MobileCaseStudyGrid from "./case-study-grid";
import ProjectProcessSection from "./start-project";
import { Factory, AlertTriangle, Workflow, TrendingUp } from "lucide-react";
import CaseFooter from "../footer";
import Link from "next/link";
import WhyChooseUs from "./why-chose";

export default function MobileCaseStudiesPage() {
  return (
    <div>
      <NavigationClient />
      <section className="relative bg-gradient-to-br from-[#0b3ea8] to-[#1e73d8] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-10 items-center relative z-10">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold">
              Mobile App Case Studies
            </h1>

            <p className="mt-4 text-white/80">
              Real-world mobile applications delivering performance, scale, and
              measurable business impact.
            </p>
            <div className="flex gap-4 mt-8">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center hover:bg-blue-50 transition"
              >
                Talk to a Mobile App Expert
              </Link>

              <Link
                href="/services/mobile-app-development"
                className="border border-white/40 px-6 py-3 rounded-lg inline-flex items-center justify-center hover:bg-white/10 transition"
              >
                View Mobile Services
              </Link>
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
                  Mobile App Dashboard
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-1">
                App Performance Overview
              </h3>
              <p className="text-sm text-white/70 mb-6">
                Live insights from iOS & Android applications
              </p>

              {/* KPIs */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-white/60">Apps Launched</p>
                  <p className="text-xl font-semibold">38+</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-white/60">Active Users</p>
                  <p className="text-xl font-semibold">120K+</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-white/60">Performance Gain</p>
                  <p className="text-xl font-semibold">+45%</p>
                </div>
              </div>

              {/* Chart mock */}
              <div>
                <p className="text-xs text-white/60 mb-3">
                  User Engagement Trend
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
      <section className="relative bg-gradient-to-b from-white via-slate-50 to-white">
        {/* Ambient top glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          {/* Section Title */}
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Featured Mobile App Case Study
            </p>
            <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900">
              Smart Manufacturing Mobile App
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
                Mobile App • Manufacturing
              </span>

              <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-900">
                Smart Manufacturing Mobile App
              </h3>

              <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-slate-600">
                A custom mobile application built for manufacturing teams to
                monitor production, manage workflows, and gain real-time
                visibility across facilities using iOS and Android devices.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  {
                    title: "Challenge",
                    icon: <AlertTriangle size={20} />,
                    text: "Lack of real-time production insights and delayed reporting from shop-floor operations.",
                  },
                  {
                    title: "Solution",
                    icon: <Workflow size={20} />,
                    text: "A mobile-first application enabling live tracking, approvals, and instant alerts for production teams.",
                  },
                  {
                    title: "Result",
                    icon: <TrendingUp size={20} />,
                    text: "45% faster issue resolution and significantly improved operational visibility across plants.",
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
                src="/images/wellkies.png"
                alt="Mobile Manufacturing App"
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-4 right-4 rounded-xl bg-white px-3 py-2 shadow-md">
                <p className="text-[11px] font-medium text-slate-600">
                  Mobile Solution
                </p>
                <p className="text-[11px] font-semibold text-slate-900">
                  iOS & Android
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MobileCaseStudyGrid />
      <WhyChooseUs />

      <ProjectProcessSection />
      <CaseFooter />
    </div>
  );
}
