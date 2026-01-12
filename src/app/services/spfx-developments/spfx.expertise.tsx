"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

const expertiseItems = [
  {
    title: "ENTERPRISE SHAREPOINT SOLUTIONS",
    desc: "Softree delivers robust SharePoint implementations that streamline collaboration, document management, and workflow automation across your organization.",
  },
  {
    title: "CUSTOM SPFX DEVELOPMENT",
    desc: "Our developers craft tailored SPFx web parts and extensions to meet unique business requirements, ensuring seamless integration with your existing Microsoft 365 ecosystem.",
  },
  {
    title: "SCALABLE & FUTURE-READY",
    desc: "We design solutions that grow with your business, leveraging modern SharePoint frameworks and best practices to stay ahead of technological evolution.",
  },
  {
    title: "PERFORMANCE & SECURITY",
    desc: "Optimized for speed, reliability, and compliance, our SharePoint solutions ensure a secure and efficient user experience across devices.",
  },
  {
    title: "CONTINUOUS SUPPORT & TESTING",
    desc: "From rigorous testing to ongoing support, Softree guarantees your SharePoint environment remains stable, updated, and fully functional.",
  },
];

export default function SoftreeExpertiseTimeline() {
  return (
    <section className="relative bg-black py-24">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0057]/70 via-black/30 to-[#240F8E]/50 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Softree Expertise in SharePoint & SPFx
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Our journey in delivering cutting-edge SharePoint solutions combines innovation, performance, and reliability. Each step showcases our commitment to driving digital transformation.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-gray-700"></div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-12">
            {expertiseItems.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`relative flex w-full items-start ${
                    isLeft ? "justify-start md:pr-16" : "justify-end md:pl-16"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900 z-10"></div>

                  {/* Card */}
                  <div
                    className={`bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg w-full md:w-1/2 hover:scale-105 transition-transform ${
                      isLeft ? "ml-6 md:ml-0" : "mr-6 md:mr-0"
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      <CheckIcon className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
