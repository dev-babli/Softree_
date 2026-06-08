"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function SoftreeSolutions() {
  const cards = [
    {
      title: "Custom Header & Footer",
      desc: "Enhance navigation and branding with custom headers, footers, and global notifications across your SharePoint sites.",
      icon: <CheckIcon className="w-6 h-6 text-orange-500" />,
    },
    {
      title: "Personalized User Experience",
      desc: "Deliver dynamic content, role-based UI, and contextual notifications to improve employee engagement and productivity.",
      icon: <CheckIcon className="w-6 h-6 text-orange-500" />,
    },
  ];

  return (
    <section className="relative bg-black py-16 overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#4c1c02] to-black pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Solutions: <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Application Customizer</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Softree’s Application Customizers allow you to enhance SharePoint globally – from headers and footers to personalized content – ensuring a consistent, interactive, and engaging user experience across your organization.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Big Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 relative"
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/images/spfx/app-customizer-big.jpg"
                alt="Application Customizer"
                className="w-full h-full object-cover max-h-[600px]"
              />
            </div>
          </motion.div>

          {/* Two Cards */}
          <div className="flex flex-col gap-8">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="flex gap-4 p-6 bg-gradient-to-br from-black via-[#4c1c02]/40 to-black border border-orange-500/20 rounded-2xl shadow-lg hover:scale-105 transition-transform"
              >
                {card.icon}
                <div>
                  <h3 className="text-white font-semibold text-xl">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
