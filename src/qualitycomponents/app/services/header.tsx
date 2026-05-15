"use client";

import Link from "next/link";
import { Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

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
  /* ✅ SSR SAFE ACTIVE HASH */
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);

    updateHash(); // on load
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-zinc-100 via-white to-zinc-100 py-24">
      {/* Soft glow background */}
      <div className="absolute -top-20 -left-20 h-64 w-64 bg-cyan-400/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 h-64 w-64 bg-blue-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div className="mb-20 text-center md:text-left">
          <span className="text-sm uppercase tracking-widest text-cyan-600 font-semibold">
            Our Expertise
          </span>

          <h2 className="mt-4 text-4xl md:text-6xl font-semibold text-black leading-tight">
            Building digital solutions that{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              scale with you
            </span>
            .
          </h2>

          <p className="mt-6 max-w-3xl text-lg text-gray-500">
            From SharePoint and Power Platform to modern web, mobile, and AI
            solutions — we design, build, and scale technology that drives real
            business impact.
          </p>
        </div>

        {/* ================= SERVICES GRID ================= */}
        <div className="relative rounded-3xl bg-gradient-to-b from-white to-zinc-50 border border-zinc-200 shadow-xl backdrop-blur-xl p-8 md:p-10">
          {/* soft glows */}
          <div className="absolute -top-16 -left-16 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-400/10 blur-3xl rounded-full" />

          {/* grid */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {services.map((service) => {
              const isActive = activeHash === `#${service.id}`;

              return (
                <Link
                  key={service.id}
                  href={`/services#${service.id}`}
                  className={`
                    group
                    rounded-2xl
                    p-6
                    text-center
                    transition-all duration-300

                    ${
                      isActive
                        ? "bg-white shadow-lg border-2 border-cyan-500 scale-[1.05]"
                        : "bg-white/70 border border-zinc-200 hover:-translate-y-2 hover:shadow-lg hover:border-cyan-400/40"
                    }
                  `}
                >
                  {/* ICON */}
                  <div className="flex justify-center mb-4">
                    {typeof service.icon === "string" ? (
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="h-10 w-auto object-contain transition-transform group-hover:scale-110"
                      />
                    ) : (
                      <service.icon className="h-10 w-10 text-cyan-600 transition-transform group-hover:scale-110" />
                    )}
                  </div>

                  {/* TITLE */}
                  <p
                    className={`text-sm font-semibold whitespace-pre-line transition-colors ${
                      isActive
                        ? "text-black"
                        : "text-gray-600 group-hover:text-black"
                    }`}
                  >
                    {service.title}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
