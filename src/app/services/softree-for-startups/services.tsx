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
    <section className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <div className="mb-20 text-center">
          <p className="text-sm tracking-widest uppercase text-gray-400">
            empower. deliver. excel.
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            What We Build
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            End-to-end capabilities designed to help startups and growing
            businesses move faster and scale with confidence.
          </p>
        </div>

        {/* SERVICES */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
            >
              {/* IMAGE */}
              <div className="relative w-full h-[360px] rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="relative group">
                {/* AMBIENT GLOW */}
                <div
                  className="absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-100
               bg-gradient-to-r from-blue-500/20 via-cyan-400/10 to-blue-500/20
               blur-3xl transition duration-700"
                />

                {/* CONTENT WRAPPER */}
                <div
                  className="relative rounded-3xl p-8
               bg-white/5 backdrop-blur-xl
               border border-white/10
               transition-all duration-500
               group-hover:border-blue-400/40
               group-hover:shadow-[0_20px_60px_-15px_rgba(56,189,248,0.35)]"
                >
                  {/* INDEX */}
                  <p
                    className="text-8xl font-extrabold mb-4
                 bg-gradient-to-br from-blue-400/30 via-cyan-400/20 to-transparent
                 bg-clip-text text-transparent
                 leading-none select-none"
                  >
                    {service.id}
                  </p>

                  <h3 className="text-3xl font-semibold mb-4 tracking-tight">
                    <a
                      href={service.url}
                      className="relative inline-block
               text-cyan-300/80
               hover:text-cyan-300
               after:absolute after:left-0 after:-bottom-2
               after:h-[2px] after:w-full
               after:bg-cyan-400/40
               after:rounded-full
               transition"
                    >
                      {service.title}
                    </a>
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-white/70 mb-6 max-w-xl leading-relaxed">
                    {service.description}
                  </p>

                  {/* CATEGORIES */}
                  {service.categories && (
                    <ul className="flex flex-wrap gap-3">
                      {service.categories.map((cat) => (
                        <li
                          key={cat}
                          className="px-4 py-1.5 text-sm rounded-full
                       bg-gradient-to-r from-white/5 to-white/0
                       border border-white/10
                       text-white/60
                       hover:text-white
                       hover:border-cyan-400/40
                       transition cursor-pointer"
                        >
                          {cat}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
