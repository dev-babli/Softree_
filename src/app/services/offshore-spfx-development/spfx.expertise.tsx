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
    <section className="relative overflow-hidden">
      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* ================= EXPERTISE HEADER ================= */}
          <div className="text-center mb-12 max-w-4xl mx-auto">
            {/* Eyebrow */}
            <span
              className="
                inline-block mb-5
                px-4 py-1.5
                rounded-full
                text-xs font-semibold tracking-widest uppercase
                bg-orange-50 text-orange-600 border border-orange-100/50 shadow-sm
              "
            >
              Our Expertise
            </span>

            {/* Title */}
            <h2
              className="
                text-4xl md:text-5xl lg:text-5xl
                font-semibold
                text-zinc-900
                tracking-tight
                leading-tight
                mb-6
              "
            >
              Softree Expertise in{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                SharePoint & SPFx
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                text-zinc-600
                text-base md:text-lg
                leading-relaxed
                max-w-3xl
                mx-auto
              "
            >
              Our journey in delivering cutting-edge SharePoint solutions
              combines innovation, performance, and reliability. Each step
              reflects our commitment to enabling secure, scalable, and modern
              digital workplaces.
            </p>

            {/* Accent divider */}
            <div className="mt-8 h-[2px] w-20 mx-auto bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
          </div>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 h-full border-l-2 border-zinc-200/80"></div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-12">
            {expertiseItems.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className={`relative flex w-full items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row pl-8 md:pl-0`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full border-4 border-white z-10 shadow-md hover:scale-125 transition-transform duration-300"></div>

                  {/* Card */}
                  <div
                    className={`w-full md:w-1/2 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div
                      className={`bg-white/90 backdrop-blur-md border border-orange-100/60 rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(249,115,22,0.08)] flex gap-4 items-start ${
                        isLeft ? "md:flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Check Icon Wrapper */}
                      <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 text-orange-600 shadow-inner">
                        <CheckIcon className="w-5 h-5" />
                      </div>

                      {/* Content Text */}
                      <div className="flex-1">
                        <h3 className="text-zinc-900 font-semibold text-lg tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-zinc-600 text-sm mt-1.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Spacer Column */}
                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

