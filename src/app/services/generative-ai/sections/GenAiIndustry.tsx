"use client"

import { motion } from "framer-motion"
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge"
import IndustryCarousel from "./IndustryCarousel"

const mappedIndustries = [
  {
    id: '01',
    title: 'Financial Services',
    description: 'Enhance fraud detection, automate compliance, and deploy intelligent AI advisors for personalized wealth management.',
    icon: 'finance',
    color: 'from-blue-300/30 to-blue-200/10'
  },
  {
    id: '02',
    title: 'Healthcare',
    description: 'Automate clinical documentation, improve patient triage with AI copilots, and unlock insights from unstructured medical records.',
    icon: 'healthcare',
    color: 'from-slate-300/40 to-slate-200/10'
  },
  {
    id: '03',
    title: 'Manufacturing',
    description: 'Implement predictive maintenance, optimize supply chain forecasting, and deploy AI vision systems for automated quality control.',
    icon: 'manufacturing',
    color: 'from-orange-300/30 to-orange-200/10'
  },
  {
    id: '04',
    title: 'Retail & E-commerce',
    description: 'Drive revenue with hyper-personalized recommendation engines, dynamic pricing algorithms, and 24/7 AI shopping assistants.',
    icon: 'retail',
    color: 'from-purple-300/30 to-purple-200/10'
  },
  {
    id: '05',
    title: 'Logistics',
    description: 'Optimize global route planning, automate warehouse operations, and improve real-time supply chain visibility with predictive AI.',
    icon: 'logistics',
    color: 'from-green-300/30 to-green-200/10'
  }
];

export function GenAiIndustry() {
  return (
    <section id="industry" className="w-full pt-4 pb-16 md:pt-8 md:pb-24 lg:pt-10 lg:pb-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-2 md:mb-4 lg:mb-6 flex flex-col items-center"
        >
          <SectionBadge text="INDUSTRIES" variant="line" />
          <h2 className="mt-4 text-2xl md:text-4xl lg:text-[2.25rem] font-extrabold text-[#111827] mb-3 md:mb-4 tracking-tight text-center leading-tight">
            Expertise across <span className="text-[#FF5812]">every sector</span>
          </h2>
          <p className="text-[15px] lg:text-base text-[#6B7280] text-center max-w-2xl mx-auto leading-relaxed">
            We partner with organizations across industries to design, build, and scale intelligent digital solutions that create measurable impact.
          </p>
        </motion.div>
        
        <div className="w-full">
          <IndustryCarousel items={mappedIndustries} />
        </div>
      </div>
    </section>
  )
}
