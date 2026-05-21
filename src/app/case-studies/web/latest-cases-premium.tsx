"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { AlertTriangle, TrendingUp, Lightbulb, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EASE_T } from "@/lib/motion"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

const caseStudies = [
  {
    title: "Shopping E-Commerce Platform",
    description:
      "A scalable e-commerce web platform with product management, secure payments, and optimized checkout flow.",
    image: "/images/case-study/web/shopping.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ShoppingEcommerce.pdf",
    challenge:
      "The client needed a scalable online store capable of handling high traffic, secure transactions, and smooth product management without performance issues.",
    solution:
      "Built a high-performance e-commerce platform with optimized checkout flow, secure payment gateway integration, and advanced product management system.",
    result:
      "Increased conversion rates by 35%, improved checkout speed, and delivered a seamless shopping experience across devices.",
  },
  {
    title: "Pet Care Management Platform",
    description:
      "A web-based system for managing pet care services, bookings, and customer interactions.",
    image: "/images/case-study/web/pet.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/PET_CARE.pdf",
    challenge:
      "Manual appointment scheduling and fragmented customer records were causing operational inefficiencies and missed bookings.",
    solution:
      "Developed a centralized platform with online booking, customer management system, and automated notifications.",
    result:
      "Reduced booking errors by 50% and improved customer satisfaction with streamlined service management.",
  },
  {
    title: "Public Blogging Website",
    description:
      "A full-stack blogging platform built with MERN stack supporting publishing, comments, and user authentication.",
    image: "/images/case-study/web/blog.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
    challenge:
      "The platform required secure authentication, scalable backend, and real-time content updates for public users.",
    solution:
      "Developed a MERN-based full-stack blogging system with JWT authentication, dynamic content rendering, and optimized APIs.",
    result:
      "Achieved high user engagement and scalable performance for concurrent users.",
  },
  {
    title: "Food & Wine Website",
    description:
      "A visually rich marketing website designed for food and beverage brands with content-focused UX.",
    image: "/images/case-study/web/food.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf",
    challenge:
      "The brand needed a visually appealing website that showcased products while maintaining performance and SEO optimization.",
    solution:
      "Designed a responsive, content-focused website with high-quality visuals, optimized performance, and SEO-friendly structure.",
    result:
      "Increased online brand visibility and boosted user engagement through immersive design.",
  },
]

export default function LatestCasesPremium() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setIndex((prev) => (prev + 1) % caseStudies.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const study = caseStudies[index]

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1852FF]/15 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-[#C86E4B]/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
        backgroundSize: "52px 52px",
      }} />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: CUSTOM_EASE as any }}
        >
          {/* Badge */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-lg" />
            <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1852FF] px-4 py-2 rounded-full border border-[#1852FF]/20 bg-[#1852FF]/5 backdrop-blur-sm">
              Featured
            </span>
          </div>

          <h2 className="text-[clamp(28px,4vw,46px)] font-black leading-[1.1] text-white mb-4">
            Featured Web App{" "}
            <span className="text-[#1852FF]">
              Success Stories
            </span>
          </h2>

          <p className="text-sm text-white/50 max-w-2xl leading-relaxed">
            Discover how we design and develop powerful web applications that
            deliver seamless user experiences, real-time performance, and
            scalable backend systems across healthcare, fintech, education, and
            entertainment.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div className="relative h-[520px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -1000, opacity: 0 }}
                transition={{
                  duration: 0.7,
                  ease: CUSTOM_EASE as any,
                }}
                className="absolute inset-0"
              >
                {/* Outer Shell */}
                <div className="relative bg-white/5 rounded-3xl p-1 ring-1 ring-white/10">
                  {/* Inner Core */}
                  <div className="relative h-full rounded-[calc(1.5rem-0.25rem)] bg-[#0a0a1a]/80 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <div className="grid md:grid-cols-2 gap-0 h-full">
                      {/* LEFT CONTENT */}
                      <div className="p-8 md:p-10 flex flex-col justify-center border-r border-white/10">
                        <motion.span
                          className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#C86E4B] font-semibold mb-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          Web App Case Study
                        </motion.span>

                        <motion.h2
                          className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {study.title}
                        </motion.h2>

                        <motion.div
                          className="w-14 h-px bg-gradient-to-r from-[#1852FF] via-[#1852FF]/40 to-transparent mb-8"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ delay: 0.4 }}
                        />

                        <div className="space-y-5 pt-2">
                          {/* Challenge */}
                          <motion.div
                            className="flex gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <div className="relative shrink-0">
                              <div className="absolute inset-0 bg-[#ef4444]/10 rounded-lg blur-md" />
                              <div className="relative h-9 w-9 flex items-center justify-center rounded-lg bg-[#ef4444]/10 text-[#ef4444]">
                                <AlertTriangle size={15} />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-[10px] font-semibold text-[#ef4444] uppercase tracking-[0.15em]">
                                Challenge
                              </h4>
                              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                                {study.challenge}
                              </p>
                            </div>
                          </motion.div>

                          {/* Solution */}
                          <motion.div
                            className="flex gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <div className="relative shrink-0">
                              <div className="absolute inset-0 bg-[#1852FF]/10 rounded-lg blur-md" />
                              <div className="relative h-9 w-9 flex items-center justify-center rounded-lg bg-[#1852FF]/10 text-[#1852FF]">
                                <Lightbulb size={15} />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-[10px] font-semibold text-[#1852FF] uppercase tracking-[0.15em]">
                                Solution
                              </h4>
                              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                                {study.solution}
                              </p>
                            </div>
                          </motion.div>

                          {/* Result */}
                          <motion.div
                            className="flex gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                          >
                            <div className="relative shrink-0">
                              <div className="absolute inset-0 bg-[#22c55e]/10 rounded-lg blur-md" />
                              <div className="relative h-9 w-9 flex items-center justify-center rounded-lg bg-[#22c55e]/10 text-[#22c55e]">
                                <TrendingUp size={15} />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-[10px] font-semibold text-[#22c55e] uppercase tracking-[0.15em]">
                                Results
                              </h4>
                              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                                {study.result}
                              </p>
                            </div>
                          </motion.div>
                        </div>

                        <motion.div
                          className="mt-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <Link
                            href={study.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#1852FF] px-6 py-2.5 transition-all duration-700 hover:bg-[#3b82f6] hover:shadow-[0_20px_60px_-20px_rgba(24,82,255,0.4)] active:scale-[0.97]"
                          >
                            <span className="text-sm font-semibold text-white tracking-[0.04em]">View Full Case Study</span>
                            <div className="relative h-8 w-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-110">
                              <ArrowUpRight className="h-4 w-4 text-white" />
                            </div>
                          </Link>
                        </motion.div>
                      </div>

                      {/* RIGHT IMAGE */}
                      <motion.div
                        className="relative p-8 md:p-10 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#1852FF]/20 to-[#C86E4B]/20" />
                          <Image
                            src={study.image}
                            alt={study.title}
                            width={1000}
                            height={600}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
