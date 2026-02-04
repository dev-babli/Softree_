"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "No-Code & Low-Code MVP Solutions",
    image: "/images/mvp/code.jpg",
    points: [
      "Build and launch functional MVPs in weeks using no-code and low-code platforms.",
      "Lower development costs with visual workflows, ready-made components, and automation.",
      "Extend and scale effortlessly by integrating APIs and third-party tools.",
    ],
  },
  {
    title: "AI-Driven MVP Development",
    image: "/images/mvp/ai.jpg",
    points: [
      "Embed AI features like chatbots, smart automation, and personalized recommendations.",
      "Improve security with AI-powered fraud detection and real-time risk analysis.",
      "Leverage data-driven insights to refine features and boost user engagement.",
    ],
  },
  {
    title: "Custom MVP Software Development",
    image: "/images/mvp/software.avif",
    points: [
      "Develop robust MVPs with API-first architecture using REST and GraphQL.",
      "Ensure scalability through microservices, cloud infrastructure, and containers.",
      "Streamline operations with automation and secure data synchronization.",
    ],
  },
  {
    title: "SaaS MVP Development Services",
    image: "/images/mvp/saas.avif",
    points: [
      "Design multi-tenant SaaS MVPs with role-based access and core features.",
      "Launch faster with built-in subscriptions, billing, and integrations.",
      "Validate pricing strategies and user adoption early.",
    ],
  },
  {
    title: "Marketplace MVP Development",
    image: "/images/mvp/marketplace.avif",
    points: [
      "Build scalable B2B/B2C marketplaces with vendor onboarding and order flows.",
      "Test commissions, escrow payments, and multi-currency models.",
      "Increase engagement with dashboards and AI recommendations.",
    ],
  },
  {
    title: "Mobile App MVP Development",
    image: "/images/mvp/mobile.avif",
    points: [
      "Create cross-platform MVPs using React Native, Flutter, Swift, or Kotlin.",
      "Enable tracking, geolocation, and push notifications.",
      "Deliver secure and scalable API-driven apps.",
    ],
  },
];

export default function MvpServices() {
  return (
    <section
      id="services_sec"
      className="relative overflow-hidden py-28 bg-gradient-to-b from-zinc-50 via-white to-zinc-50"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-5xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BUILD
            </span>{" "}
            MVPs That Scale Into Products
          </h2>

          <p className="mt-4 text-gray-600">
            We design, build, and launch MVPs that help startups validate ideas,
            attract users, and grow confidently.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="
                group relative overflow-hidden rounded-3xl
                bg-white/80 backdrop-blur-xl
                border border-gray-200
                shadow-md hover:shadow-2xl
                transition-all duration-300
                p-7
              "
            >
              {/* Image */}
              <div className="mb-6 overflow-hidden rounded-2xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={240}
                  className="h-[190px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {service.title}
              </h3>

              {/* Points */}
              <ul className="space-y-4 text-sm text-gray-600">
                {service.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {/* Fixed icon wrapper */}
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    </span>

                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
