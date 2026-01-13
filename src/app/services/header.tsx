"use client";

import Link from "next/link";
import { Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* =========================
   SERVICES DATA
========================= */
const services: {
  id: string;
  title: string;
  icon: string | LucideIcon;
}[] = [
  {
    id: "sharepoint-development",
    title: "SharePoint\nDevelopment",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  },
  {
    id: "spfx-development",
    title: "SPFx\nDevelopment",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
  },
  {
    id: "power-apps",
    title: "Power\nApps",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732223.png",
  },
  {
    id: "power-bi",
    title: "Power\nBI",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732220.png",
  },
  {
    id: "web-development",
    title: "Web\nDevelopment",
    icon: "https://cdn-icons-png.flaticon.com/512/841/841364.png",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App\nDevelopment",
    icon: Smartphone,
  },
  {
    id: "ai-solutions",
    title: "AI\nSolutions",
    icon: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
  },
];

/* =========================
   COMPONENT
========================= */
export default function ServicesHeader() {
  return (
    <section className="bg-black text-white py-2">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER WRAPPER */}
        <div className="relative mb-20">
          {/* BACKGROUND ACCENT */}
          <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />

          {/* EYEBROW */}
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-gradient-to-r from-cyan-400 to-transparent" />
            <span className="text-sm uppercase tracking-widest font-medium text-cyan-400">
              Our Expertise
            </span>
          </div>

          {/* MAIN HEADING */}
          <h2 className="text-4xl md:text-6xl font-semibold leading-tight">
            Building digital solutions that{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              scale with you
            </span>
            <span className="text-neutral-400">.</span>
          </h2>

          {/* SUBHEADING */}
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-400 leading-relaxed">
            From Microsoft SharePoint and Power Platform to modern web, mobile,
            and AI-driven solutions, we help businesses design, build, and scale
            technology that delivers real impact.
          </p>

          {/* DIVIDER */}
          <div className="mt-10 h-px w-full max-w-xl bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
        </div>

        {/* SHARED BACKGROUND */}
        <div
          className="
    relative
    rounded-3xl
    bg-white/5
    backdrop-blur-xl
    border border-white/10
    px-8
    py-10
    overflow-hidden
  "
        >
          {/* STRONG MONOCHROME BOTTOM BORDER */}
          <span
            className="
      pointer-events-none
      absolute
      bottom-0
      left-0
      w-full
      h-[6px]

      bg-gradient-to-r
      from-white
      via-gray-400
      to-black

      shadow-[0_-4px_18px_rgba(255,255,255,0.35)]
    "
          />

          {/* CONTENT */}
          <div className="relative z-10 grid grid-cols-7 gap-8 items-center">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="
          group
          flex
          flex-col
          items-center
          text-center
          transition-all
          duration-300
          hover:-translate-y-2
        "
              >
                {/* ICON */}
                {typeof service.icon === "string" ? (
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="mb-4 h-10 w-auto object-contain"
                    loading="lazy"
                  />
                ) : (
                  <service.icon className="mb-4 h-10 w-10 text-white" />
                )}

                {/* TITLE */}
                <p className="text-base font-semibold leading-tight whitespace-pre-line text-gray-200 group-hover:text-white transition-colors">
                  {service.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
