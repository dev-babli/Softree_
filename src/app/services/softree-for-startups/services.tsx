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
              <div>
                <p className="text-6xl font-bold text-white/10 mb-4">
                  {service.id}
                </p>

                <h3 className="text-3xl font-semibold mb-4">
                  <a
                    href={service.url}
                    className="hover:text-blue-400 transition"
                  >
                    {service.title}
                  </a>
                </h3>

                <p className="text-gray-300 mb-6 max-w-xl">
                  {service.description}
                </p>

                {service.categories && (
                  <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400">
                    {service.categories.map((cat) => (
                      <li
                        key={cat}
                        className="hover:text-white transition cursor-pointer"
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
