"use client";

import { motion } from "framer-motion";

import { IndustryCarousel } from "@/app/services/ai-consulting-services/ai-consulting-services-components/industries/IndustryCarousel";

export const DocumentAiIndustries = () => {
    return (
        <section className="relative py-12 lg:py-16 overflow-hidden bg-white">
            <div className="relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto mb-6 lg:mb-8 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 flex items-center justify-center gap-4 md:gap-6"
                    >
                        <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
                            <div className="absolute left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
                        </div>
                        <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] uppercase">
                            INDUSTRIES WE SERVE
                        </span>
                        <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
                            <div className="absolute right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#111827] mb-6 tracking-tight leading-tight max-w-5xl mx-auto"
                    >
                        Industry-Specific <span className="text-[#FF5812]">AI Document Solutions for Enterprise Automation</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-[15px] lg:text-[17px] text-[#6B7280] max-w-3xl mx-auto"
                    >
                        Help organizations automate document-intensive processes with AI-powered Intelligent Document Processing (IDP), Azure AI Document Intelligence, OCR, and workflow automation. Softree delivers secure Document AI solutions for healthcare, finance, manufacturing, logistics, retail, education, and other document-driven industries.
                    </motion.p>
                </div>

                {/* Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <IndustryCarousel />
                </motion.div>


            </div>
        </section>
    );
};
