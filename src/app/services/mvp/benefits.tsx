"use client";

import { useState } from "react";
import { Zap, Users, TrendingUp, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    title: "Faster Time to Market",
    description:
      "Launch your product quicker with an experienced MVP team that removes delays, reduces rework, and delivers production-ready code without compromising quality.",
    icon: Zap,
  },
  {
    title: "Extended Engineering Power",
    description:
      "Instantly strengthen your team with the right skills, senior expertise, and scalable resources tailored to your goals and timelines.",
    icon: Users,
  },
  {
    title: "Built for Long-Term Growth",
    description:
      "We design MVPs with scalability in mind so your architecture supports future expansion — not temporary fixes.",
    icon: TrendingUp,
  },
  {
    title: "Startup-First Mindset",
    description:
      "Having built products ourselves, we understand startup constraints and guide decisions with empathy and clarity.",
    icon: Heart,
  },
];

export default function MvpBenefitsAccordion() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden">
      <div className="relative w-full">
        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl mt-14 md:text-6xl font-semibold tracking-tight text-gray-900">
            Benefits of Our{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              MVP Development Services
            </span>
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Reduce risk, accelerate delivery, and build scalable products with a
            trusted MVP development partner.
          </p>
        </div>

        {/* ================= ACCORDION ================= */}
        <div className="mt-14 space-y-6">
          {items.map((item, index) => {
            const open = active === index;
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                layout
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className={`
                  group relative overflow-hidden rounded-3xl
                  border border-gray-200/70
                  bg-white/70 backdrop-blur-xl
                  shadow-xl
                  hover:shadow-2xl
                  transition-all duration-300
                `}
              >
                {/* Left animated accent */}
                <motion.div
                  animate={{ height: open ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-0 top-0 w-1 bg-gradient-to-b from-orange-600 to-amber-500 rounded-l-3xl"
                />

                {/* Header */}
                <button
                  onClick={() => setActive(open ? null : index)}
                  className="flex w-full items-center justify-between p-8 text-left"
                >
                  <div className="flex items-center gap-6">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        scale: open ? 1.15 : 1,
                      }}
                      className={`
                        flex h-14 w-14 items-center justify-center rounded-2xl
                        transition-all duration-300
                        ${
                          open
                            ? "bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                            : "bg-orange-50 text-orange-600 border border-orange-100"
                        }
                      `}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                  </div>

                  {/* Plus */}
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    className="text-3xl font-light text-gray-400"
                  >
                    +
                  </motion.span>
                </button>

                {/* Content */}
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="px-8 pb-8"
                    >
                      <div className="border-t pt-6">
                        <p className="text-gray-600 leading-relaxed max-w-2xl">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
