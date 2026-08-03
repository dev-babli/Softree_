"use client"

import { motion, Variants } from "framer-motion"
import { genProcess } from "../data"
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge"
import { Search, Database, Sparkles, Sliders, Cloud, Activity } from "lucide-react"

const icons = [Search, Database, Sparkles, Sliders, Cloud, Activity]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const lineVariants: Variants = {
  hidden: { width: "0%" },
  visible: { width: "100%", transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 } }
}

export function GenAiProcess() {
  return (
    <section id="process" className="relative w-full pt-4 pb-20 md:pt-8 md:pb-28 lg:pt-10 lg:pb-32 bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#FF5812]/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      
      {/* Very faint dotted pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 flex flex-col items-center"
        >
          <SectionBadge text="DEVELOPMENT PROCESS" variant="line" />
          
          <h2 className="mt-4 text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-3 md:mb-4 tracking-tight text-center leading-tight">
            From concept to <span className="text-[#FF5812]">intelligent automation</span>
          </h2>
          
          <p className="text-[15px] lg:text-base text-[#6B7280] text-center max-w-2xl mx-auto leading-relaxed">
            We design, build, and deploy enterprise-grade generative AI systems that transform workflows and unlock new digital capabilities.
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated subtle connector lines (desktop only) */}
          <div className="absolute top-[25%] left-0 right-0 h-px hidden lg:block z-0 pointer-events-none">
             <motion.div 
               variants={lineVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               className="h-full bg-gradient-to-r from-transparent via-[#FF5812]/20 to-transparent" 
             />
          </div>
          <div className="absolute top-[75%] left-0 right-0 h-px hidden lg:block z-0 pointer-events-none">
             <motion.div 
               variants={lineVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               className="h-full bg-gradient-to-r from-transparent via-[#FF5812]/20 to-transparent" 
             />
          </div>
          
          <motion.ol 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative z-10 perspective-[2000px]"
          >
            {genProcess.map((step, index) => {
              const Icon = icons[index % icons.length]
              return (
                <motion.li
                  key={step.step}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -12, 
                    scale: 1.03,
                    rotateX: 3,
                    rotateY: 3,
                    boxShadow: "0 40px 80px -20px rgba(255, 88, 18, 0.15), 0 0 40px rgba(255, 88, 18, 0.05)",
                    borderColor: "#FF5812"
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group relative flex flex-col h-full overflow-hidden rounded-[28px] border border-gray-200 bg-white/80 backdrop-blur-md p-8 md:p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] cursor-default transform-gpu"
                >
                  {/* Subtle glass lighting effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none z-0" />
                  
                  {/* Top animated accent line */}
                  <div className="absolute top-0 left-0 h-[3px] w-full bg-[#FF5812] opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_15px_#FF5812] transition-all duration-400 ease-out z-10" />
                  
                  {/* Badge */}
                  <div className="mb-10 flex items-center relative z-10">
                    <div className="inline-flex items-center rounded-full bg-[#FF5812]/10 p-1.5 shadow-sm transition-transform duration-400 group-hover:scale-[1.05] group-hover:shadow-[0_5px_15px_rgba(255,88,18,0.2)]">
                      <div className="flex h-8 px-4 items-center justify-center rounded-full bg-white shadow-sm border border-[#FF5812]/20">
                        <span className="text-[#FF5812] font-mono text-[11px] font-extrabold uppercase tracking-[0.15em]">STEP {step.step}</span>
                      </div>
                      <div className="px-3 text-[#FF5812]">
                        <Icon size={20} strokeWidth={2} className="opacity-80 transition-all duration-400 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_0_8px_rgba(255,88,18,0.6)]" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="mb-4 text-[22px] font-bold tracking-tight text-[#111827] relative z-10 transition-colors duration-400">{step.title}</h3>
                  <p className="text-[16px] leading-relaxed text-[#6B7280] flex-grow relative z-10">{step.body}</p>
                </motion.li>
              )
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
