"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const services = [
  {
    title: "Business Applications & Automation",
    description:
      "Building scalable business applications and automated workflows using Microsoft Power Platform — Power Apps, Power Automate, Power BI, and Dataverse.",
    bg: "from-purple-700 to-indigo-600",
    icons: [
      "/images/hero/power-apps.webp",
      "/images/hero/power-auto.webp",
      "/images/hero/power-bi.webp",
    ],
  },
  {
    title: "Modern Digital Workplace",
    description:
      "Creating intelligent digital workplaces with SharePoint, Microsoft Teams, Viva, and Microsoft 365 to improve collaboration, content management, and employee experience.",
    bg: "from-slate-900 to-emerald-800",
    icons: ["/images/hero/sharepoint.svg", "/images/hero/teams.svg"],
  },
  {
    title: "Microsoft 365 Management",
    description:
      "Helping organisations securely manage users, devices, and information using Microsoft 365, Intune, Security, and Compliance solutions.",
    bg: "from-blue-700 to-indigo-500",
    icons: [
      "/images/hero/office.svg",
      "/images/hero/intune.svg",
      "/images/hero/security.svg",
    ],
  },
  {
    title: "Azure Cloud Solutions",
    description:
      "Designing, migrating, and optimising secure cloud architectures on Microsoft Azure — from infrastructure and networking to advanced cloud services.",
    bg: "from-sky-100 to-cyan-200",
    icons: ["/images/hero/azure.svg"],
    light: true,
  },
  {
    title: "Data Analytics & AI",
    description:
      "Delivering data-driven insights and AI-powered solutions using Microsoft Fabric, Power BI, and Azure AI to support smarter business decisions.",
    bg: "from-indigo-700 to-blue-400",
    icons: ["/images/hero/power-bi.webp", "/images/copilot-logo-1.webp"],
  },
];

export default function ServicesSection() {
  const [index, setIndex] = useState(0);

  const cardsPerView = 2;
  const maxIndex = Math.max(0, services.length - cardsPerView);

  const next = () => setIndex((i) => Math.min(i + cardsPerView, maxIndex));
  const prev = () => setIndex((i) => Math.max(i - cardsPerView, 0));

  return (
    <section className="bg-gradient-to-b from-black via-[var(--legacy-020d1a)] to-black py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
              Our Services
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Industry-leading expertise across Microsoft platforms
            </h2>

            {/* Optional sub text */}
            <p className="mt-2 text-base text-white/70">
              We help organisations modernise, automate, and scale using proven
              Microsoft technologies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              disabled={index === 0}
              className="h-12 w-12 rounded-full bg-white/10 text-white disabled:opacity-30 hover:bg-white/20 transition"
            >
              ←
            </button>
            <button
              onClick={next}
              disabled={index >= maxIndex}
              className="h-12 w-12 rounded-full bg-white/10 text-white disabled:opacity-30 hover:bg-white/20 transition"
            >
              →
            </button>

            <Link
              href="/services"
              className="ml-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white font-semibold shadow-lg hover:scale-[1.03] transition"
            >
              View All Services
            </Link>
          </div>
        </div>

        {/* Slider viewport (NO SCROLL) */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * 50}%)`,
            }}
          >
            {services.map((service) => (
              <div
                key={service.title}
                className={`shrink-0 w-full lg:w-[48%] h-[420px]
                rounded-3xl p-8 flex flex-col justify-between
                bg-gradient-to-br ${service.bg}
                ${service.light ? "text-slate-900" : "text-white"}
                shadow-2xl`}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p
                    className={`text-base leading-relaxed ${
                      service.light ? "text-slate-700" : "text-white/80"
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Icons */}
                <div className="flex gap-4 mt-8">
                  {service.icons.map((icon) => (
                    <div
                      key={icon}
                      className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg"
                    >
                      <Image src={icon} alt="" width={54} height={54} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
