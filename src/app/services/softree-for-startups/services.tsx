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
              <div className="bg-white rounded-3xl shadow-xl border border-zinc-200 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* IMAGE */}
                  <div className="relative min-h-[420px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="relative p-10">
                    {/* ACCENT */}
                    <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-cyan-500" />

                    {/* INDEX */}
                    <p className="text-7xl font-extrabold text-zinc-200 leading-none mb-3">
                      {service.id}
                    </p>

                    {/* TITLE */}
                    <h3 className="text-2xl font-semibold text-zinc-900 mb-4">
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
                            className="px-4 py-1.5 text-sm rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700"
                          >
                            {cat}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
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
