"use client";

import Link from "next/link";

/* =========================
   SERVICES DATA
========================= */
const services = [
  {
    id: "service-1",
    slug: "sharepoint-development",
    index: "01",
    title: "SharePoint\nDevelopment",
    description:
      "We design and build enterprise-grade SharePoint solutions that improve collaboration, document management, and intranet experiences.",
    strategies: [
      "SharePoint Online Architecture",
      "Intranet & Portal Development",
      "Custom Lists & Libraries",
      "Permission & Security Setup",
      "Content Migration",
      "Performance Optimization",
    ],
    learnMoreUrl: "/services/sharepoint",
  },
  {
    id: "service-2",
    slug: "spfx-development",
    index: "02",
    title: "SPFx\nDevelopment",
    description:
      "We create modern SharePoint Framework (SPFx) web parts and extensions to deliver rich, scalable user experiences.",
    strategies: [
      "Custom Web Parts",
      "Application Customizers",
      "Extensions & Field Customizers",
      "React & TypeScript",
      "Microsoft Graph Integration",
    ],
    learnMoreUrl: "/services/spfx-developments",
  },
  {
    id: "service-3",
    slug: "power-apps",
    index: "03",
    title: "Power\nApps",
    description:
      "We build low-code Power Apps to automate workflows and streamline business processes across Microsoft 365.",
    strategies: [
      "Canvas Apps",
      "Model-driven Apps",
      "Dataverse Integration",
      "Custom Connectors",
      "User Experience Optimization",
    ],
    learnMoreUrl: "/services/power-apps",
  },
  {
    id: "service-4",
    slug: "power-bi",
    index: "04",
    title: "Power\nBI",
    description:
      "We transform raw data into interactive dashboards and reports that drive informed business decisions.",
    strategies: [
      "Data Modeling",
      "DAX Calculations",
      "Interactive Dashboards",
      "Real-time Reporting",
      "Power BI Service Deployment",
    ],
    learnMoreUrl: "/services/power-bi",
  },
  {
    id: "service-5",
    slug: "web-development",
    index: "05",
    title: "Web\nDevelopment",
    description:
      "We develop modern, scalable web applications using cutting-edge frontend and backend technologies.",
    strategies: [
      "React / Next.js Applications",
      "API Development",
      "Cloud-ready Architecture",
      "Performance Optimization",
      "Security Best Practices",
    ],
    learnMoreUrl: "/services/web-app-development",
  },
  {
    id: "service-6",
    slug: "mobile-app-development",
    index: "06",
    title: "Mobile App\nDevelopment",
    description:
      "We build secure and high-performance mobile applications for iOS and Android platforms.",
    strategies: [
      "iOS & Android Apps",
      "Cross-platform Development",
      "Backend Integration",
      "App Store Deployment",
      "Maintenance & Support",
    ],
    learnMoreUrl: "/services/mobile-app-development",
  },
  {
    id: "service-7",
    slug: "ai-solutions",
    index: "07",
    title: "AI\nSolutions",
    description:
      "We leverage AI to automate processes, extract insights, and enhance decision-making across your business.",
    strategies: [
      "AI Strategy & Consulting",
      "Chatbots & Virtual Assistants",
      "Data Analysis & Predictions",
      "AI Integration with Apps",
      "Responsible AI Practices",
    ],
    learnMoreUrl: "/services/ai-solutions",
  },
];

/* =========================
   COMPONENT
========================= */
export default function ServicesDetails() {
  return (
    <section className="bg-gradient-to-b from-zinc-100 via-white to-zinc-100 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        {services.map((service) => (
          <Link
            key={service.id}
            href={service.learnMoreUrl}
            className="
              group
              block
              relative
              rounded-3xl
         bg-gradient-to-b from-zinc-700 via-zinc-900 to-zinc-600

              backdrop-blur-xl
              border border-white/10
              shadow-[0_0_40px_rgba(255,255,255,0.06)]
              p-10 md:p-16
              overflow-hidden
              transition-transform
              hover:-translate-y-1
              focus:outline-none
              focus:ring-2
              focus:ring-white/30
            "
          >
            {/* ULTRA STRONG MONOCHROME LEFT BORDER */}
            <span
              className="
                pointer-events-none
                absolute
                top-0
                left-0
                h-full
                w-[8px]
                bg-gradient-to-b
                from-white
                via-gray-300
                to-black
                shadow-[0_0_25px_rgba(255,255,255,0.55)]
              "
            />

            {/* INNER GLOW */}
            <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

            {/* ANCHORS */}
            <span id={service.id} className="absolute -top-32" />
            <span id={service.slug} className="absolute -top-32" />

            <div className="grid md:grid-cols-2 gap-16 items-start relative z-10">
              {/* LEFT PANEL */}
              <div
                className="
                  relative
                  h-full
                  flex
                  flex-col
                  justify-between
                  rounded-2xl
                  p-8
                  overflow-hidden
                  bg-gradient-to-bl
                  from-white/10
                  via-black/70
                  to-black
                  backdrop-blur-xl
                  border border-white/10
                "
              >
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-white/12
                    via-transparent
                    to-transparent
                    opacity-25
                  "
                />

                <div className="relative z-10 space-y-6">
                  <span className="text-sm tracking-widest text-gray-300 font-semibold">
                    {service.index}
                  </span>

                  <h3 className="text-4xl md:text-5xl font-bold whitespace-pre-line leading-tight">
                    {service.title}
                  </h3>

                  <div className="h-px w-16 bg-gradient-to-r from-white to-transparent" />
                </div>

                {/* VISUAL CTA (card already clickable) */}
                <span
                  className="
                    inline-flex items-center gap-2
                    mt-10
                    px-6 py-3
                    rounded-full
                    border border-white/20
                    text-sm font-medium
                    text-gray-200
                    group-hover:text-white
                    group-hover:border-white
                    transition
                    self-start
                  "
                >
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {/* RIGHT PANEL */}
              <div
                className="
                  relative
                  h-full
                  flex
                  flex-col
                  rounded-2xl
                  p-8
                  overflow-hidden
                  bg-gradient-to-br
                  from-white/10
                  via-black/60
                  to-black
                  backdrop-blur-xl
                  border border-white/10
                "
              >
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-tr
                    from-white/15
                    via-transparent
                    to-transparent
                    opacity-30
                  "
                />

                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]
                    rounded-2xl
                  "
                />

                <div className="relative z-10 flex flex-col h-full">
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 flex-1">
                    {service.strategies.map((strategy, i) => (
                      <div
                        key={i}
                        className="flex gap-3 items-start border-b border-white/10 pb-4"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-white mt-1"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <p className="font-medium text-gray-200">
                          {strategy}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
