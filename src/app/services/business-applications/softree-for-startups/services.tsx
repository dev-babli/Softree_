"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Product & Software Engineering",
    url: "/product-software-engineering",
    image: "/images/startup/engineering.jpg",
    description:
      "We design and engineer scalable software products that move fast today and grow confidently tomorrow.",
    categories: [
      "Web Platforms",
      "Mobile Products",
      "Cloud-Native Apps",
      "DevOps & CI/CD",
      "Low-Code Solutions",
      "Platform Modernization",
    ],
  },
  {
    id: "02",
    title: "Data & Intelligence Platforms",
    url: "/data-intelligence-platforms",
    image: "/images/startup/data.jpg",
    description:
      "Turn complex data into actionable intelligence with modern analytics and decision-ready dashboards.",
    categories: [
      "Data Engineering",
      "Analytics Pipelines",
      "Business Intelligence",
      "Reporting & Insights",
      "IoT Data Solutions",
    ],
  },
  {
    id: "03",
    title: "Applied AI & Machine Learning",
    url: "/applied-ai-ml",
    image: "/images/startup/ai.jpg",
    description:
      "Build practical AI solutions that solve real problems, enhance products, and unlock new capabilities.",
    categories: [
      "Generative AI",
      "Predictive Models",
      "Computer Vision",
      "Conversational AI",
      "AR / XR Experiences",
    ],
  },
  {
    id: "04",
    title: "Security & Risk Engineering",
    url: "/security-risk-engineering",
    image: "/images/startup/security.avif",
    description:
      "Embed security into every layer of your product with proactive risk assessment and protection strategies.",
    categories: [
      "Secure DevOps",
      "Application Security",
      "Infrastructure Security",
      "Cloud Risk Management",
    ],
  },
  {
    id: "05",
    title: "Experience & Interface Design",
    url: "/experience-interface-design",
    image: "/images/startup/interface.avif",
    description:
      "Create intuitive, conversion-focused experiences grounded in user research and product strategy.",
    categories: [
      "User Research",
      "UX Strategy",
      "UI Design Systems",
      "Conversion Optimization",
    ],
  },
  {
    id: "06",
    title: "Quality Engineering & Testing",
    url: "/quality-engineering-testing",
    image: "/images/startup/test.avif",
    description:
      "Ensure reliability, performance, and confidence through continuous and automated quality engineering.",
    categories: [
      "Functional Testing",
      "Test Automation",
      "Security Validation",
      "Performance Testing",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <div className="mb-20 text-center">
          <p className="text-sm tracking-widest uppercase text-zinc-500">
            empower. deliver. excel.
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-zinc-900">
            What We Build
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-zinc-600">
            End-to-end capabilities designed to help startups and growing
            businesses move faster and scale with confidence.
          </p>
        </div>

        {/* SERVICES */}
        <div className="relative space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="sticky top-24"
              style={{
                zIndex: index + 1,
              }}
            >
              {/* CARD */}
              <div className="group relative bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* RIGHT GLOW BORDER */}
                <span className="absolute right-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-500 opacity-70 group-hover:opacity-100 transition" />

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* IMAGE */}
                  <div className="relative min-h-[420px] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* DARK OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </div>

                  {/* CONTENT */}
                  <div className="relative p-10 flex flex-col justify-center">
                    {/* FLOATING INDEX */}
                    <p className="absolute top-6 right-6 text-6xl font-extrabold text-zinc-100 group-hover:text-cyan-100 transition">
                      {service.id}
                    </p>

                    {/* TITLE */}
                    <h3 className="text-2xl font-semibold text-zinc-900 mb-4 group-hover:text-cyan-600 transition">
                      {service.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-zinc-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    {/* CATEGORIES */}
                    {service.categories && (
                      <ul className="flex flex-wrap gap-3 mb-6">
                        {service.categories.map((cat) => (
                          <li
                            key={cat}
                            className="
          relative px-4 py-1.5 text-sm font-medium rounded-full
          bg-gradient-to-r from-zinc-100 to-zinc-50
          border border-zinc-200 text-zinc-700
          shadow-sm
          transition-all duration-300 ease-out
          hover:scale-105 hover:-translate-y-0.5
          hover:text-cyan-700
          hover:border-cyan-300
          hover:from-cyan-50 hover:to-blue-50
          hover:shadow-[0_5px_15px_rgba(56,189,248,0.25)]
          cursor-default
        "
                          >
                            {cat}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* HOVER GLOW BACKGROUND */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5" />
              </div>
            </motion.div>
          ))}
          {/* spacer for last card */}
          <div className="h-[60vh]" />
        </div>
      </div>
    </section>
  );
}
