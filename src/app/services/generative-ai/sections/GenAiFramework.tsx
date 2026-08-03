"use client"

import { motion, Variants } from "framer-motion"
import { genFramework } from "../data"
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

export function GenAiFramework() {
  return (
    <section id="framework" className="w-full pt-4 pb-20 md:pt-8 md:pb-28 lg:pt-10 lg:pb-32 bg-white bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-50 via-white to-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14 lg:mb-16 flex flex-col items-center"
        >
          <SectionBadge text="OUR PHILOSOPHY" variant="line" />
          
          <h2 className="mt-4 text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-3 md:mb-4 tracking-tight text-center leading-tight">
            Our Philosophy for Building <span className="text-[#FF5812]">Enterprise Generative AI Solutions</span>
          </h2>
          
          <p className="text-[15px] lg:text-base text-[#6B7280] text-center max-w-2xl mx-auto leading-relaxed">
            Our philosophy focuses on delivering secure, scalable, and business-driven Generative AI solutions. We combine enterprise best practices and responsible AI principles to create measurable value through production-ready innovation.
          </p>
        </motion.div>

        <motion.ol 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {genFramework.map((step) => (
            <motion.li
              key={step.step}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                boxShadow: "0 30px 60px -12px rgba(255, 88, 18, 0.25), 0 0 20px rgba(255, 88, 18, 0.15)",
                borderColor: "#FF6B00"
              }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col h-full rounded-[24px] border-[3px] border-[#FF5812] bg-white p-8 md:p-10 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] cursor-default overflow-hidden"
            >
              {/* Number styling */}
              <div className="mb-10 flex items-center">
                <div className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#FF5812]/10 border border-[#FF5812]/30 shadow-[0_0_15px_rgba(255,88,18,0.15)] transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(255,88,18,0.3)]">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm">
                    <span className="text-[#FF5812] font-mono text-sm font-extrabold tracking-widest pl-1">{step.step}</span>
                  </div>
                </div>
                <div className="ml-5 h-px flex-grow bg-gradient-to-r from-[#FF5812]/30 via-[#FF5812]/10 to-transparent"></div>
              </div>
              
              <h3 className="mb-5 text-[22px] font-bold tracking-tight text-[#111827] group-hover:text-[#FF5812] transition-colors duration-300">{step.title}</h3>
              <p className="text-[16px] leading-relaxed text-[#6B7280] flex-grow">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
