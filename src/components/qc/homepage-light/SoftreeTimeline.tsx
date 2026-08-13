"use client"

import React, { useState, useRef, useEffect } from "react"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { prefersReducedMotion } from "@/lib/motion"

const timelineData = [
  {
    year: "2013",
    title: "Founded With an Engineering Mindset",
    description: "Softree Technology begins its journey with a focus on building reliable software solutions and establishing a strong engineering foundation for long-term client partnerships.",
  },
  {
    year: "2014",
    title: "Building Our Delivery Foundation",
    description: "The company strengthens its software development capabilities and delivery practices, focusing on quality, collaboration, and dependable execution.",
  },
  {
    year: "2015",
    title: "Expanding Digital Engineering",
    description: "Softree expands its capabilities across modern application development and digital engineering, helping businesses turn ideas into scalable software.",
  },
  {
    year: "2016",
    title: "Growing With Our Clients",
    description: "The team grows alongside client requirements, taking on broader technology challenges and building deeper long-term delivery partnerships.",
  },
  {
    year: "2017",
    title: "Enterprise Solutions Take Shape",
    description: "Softree increasingly focuses on business-critical applications, enterprise workflows, integrations, and solutions designed for operational scale.",
  },
  {
    year: "2018",
    title: "Microsoft Ecosystem Growth",
    description: "Microsoft technologies become an increasingly important part of Softree's engineering capabilities, supporting business applications, collaboration, and workflow transformation.",
  },
  {
    year: "2019",
    title: "Scaling Engineering Capabilities",
    description: "Softree broadens its technical capabilities across application engineering, enterprise platforms, automation, and data-driven solutions.",
  },
  {
    year: "2020",
    title: "Engineering Through Change",
    description: "As businesses rapidly adapted to a changing world, Softree continued helping organizations modernize applications, automate processes, and maintain digital operations.",
  },
  {
    year: "2021",
    title: "Cloud & Data-Driven Transformation",
    description: "Cloud platforms, analytics, automation, and modern application architectures become increasingly central to the solutions Softree delivers.",
  },
  {
    year: "2022",
    title: "Power Platform & Enterprise Automation",
    description: "Softree deepens its Microsoft Power Platform capabilities across Power Apps, Power Automate, SharePoint, Power BI, and enterprise workflow automation.",
  },
  {
    year: "2023",
    title: "Modern Microsoft & AI Capabilities",
    description: "Softree expands its Microsoft ecosystem expertise while building stronger capabilities across AI, data, automation, and modern application engineering.",
  },
  {
    year: "2024",
    title: "Enterprise AI & Digital Engineering",
    description: "AI, automation, Microsoft platforms, data engineering, and modern application development increasingly converge into a broader enterprise engineering practice.",
  },
  {
    year: "2025",
    title: "Engineering the Intelligent Enterprise",
    description: "Softree enters a new phase focused on enterprise AI, AI agents, Microsoft platforms, data & analytics, cloud technologies, and modern digital engineering.",
  }
]

export default function SoftreeTimeline() {
  const [activeYear, setActiveYear] = useState(timelineData[0].year)
  const [isPlaying, setIsPlaying] = useState(true)
  const timelineRef = useRef<HTMLDivElement>(null)

  const activeIndex = timelineData.findIndex(item => item.year === activeYear)
  const activeItem = timelineData[activeIndex]
  const progressPercentage = (activeIndex / (timelineData.length - 1)) * 100

  // Split century ("20") and year suffix ("13", "25", etc.) for advanced visual styling
  const century = activeYear.slice(0, 2)
  const yearSuffix = activeYear.slice(2)

  // Disable autoplay initially if user prefers reduced motion
  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsPlaying(false)
    }
  }, [])

  // Auto-scroll timeline to keep active item in view on mobile
  useEffect(() => {
    if (!timelineRef.current) return
    const container = timelineRef.current
    const activeButton = container.querySelector(`[data-year="${activeYear}"]`) as HTMLElement
    if (activeButton) {
      const scrollLeft = activeButton.offsetLeft - container.offsetWidth / 2 + activeButton.offsetWidth / 2
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeYear])

  // Auto-move timeline every 3 seconds if active
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setActiveYear((prevYear) => {
        const currentIndex = timelineData.findIndex(item => item.year === prevYear)
        const nextIndex = (currentIndex + 1) % timelineData.length
        return timelineData[nextIndex].year
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [isPlaying, activeIndex])

  const handleNext = () => {
    setIsPlaying(false)
    setActiveYear((prevYear) => {
      const currentIndex = timelineData.findIndex(item => item.year === prevYear)
      const nextIndex = (currentIndex + 1) % timelineData.length
      return timelineData[nextIndex].year
    })
  }

  const handlePrev = () => {
    setIsPlaying(false)
    setActiveYear((prevYear) => {
      const currentIndex = timelineData.findIndex(item => item.year === prevYear)
      const prevIndex = (currentIndex - 1 + timelineData.length) % timelineData.length
      return timelineData[prevIndex].year
    })
  }

  return (
    <section
      data-section="evolution"
      className="relative w-full bg-white py-10 md:py-14 overflow-hidden"
      aria-labelledby="evolution-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">

        {/* Custom Designed Section Header (No commas) */}
        <div className="text-center mb-10 md:mb-12 flex flex-col items-center max-w-6xl mx-auto px-4">
          
          {/* Pill Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/05 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#FF5812] mb-5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
            OUR EVOLUTION
          </span>
          
          {/* Designed Main Title (Comma-free, advanced layout, orange span) */}
          <h2 id="evolution-heading" className="text-[#0a0a1a] tracking-tight mb-4 flex flex-col items-center">
           
            <span className="font-black text-3xl md:text-5xl leading-[1.1] max-w-none block w-full">
              <span className="text-[#0a0a1a]">Driving Digital Innovation</span> <span className="text-zinc-400 font-light">&</span> <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">Transformation</span>
            </span>
          </h2>
          
          {/* Subheading Description (Comma-free) */}
          <p className="text-zinc-600/90 font-medium text-base md:text-lg leading-relaxed max-w-2xl mt-1">
            Discover how Softree Technology has evolved through innovation and technology expertise with a commitment to delivering smarter digital solutions
          </p>
        </div>

        {/* Main Content Area */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center pb-4">

          {/* Left Side: Solid Grid Card with Designed Year Text Inside */}
          <div className="lg:col-span-6 relative w-full h-[230px] md:h-[340px] flex items-center justify-center lg:justify-end">
            
            {/* Grid Console Card with Orange-Black Gradient (Completely Static) */}
            <div className="relative w-[280px] md:w-[420px] aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#FF5812]/15 via-[#050505] to-[#FF5812]/5 border border-zinc-800/80 shadow-[0_20px_40px_-16px_rgba(5,5,5,0.4)] overflow-hidden flex items-center justify-center">
              {/* Grid lines overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-10" />
              
              {/* Tech details */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-20 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]" />
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider">ENGINEERING_GRID</span>
              </div>
              <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-500 tracking-wider z-20 pointer-events-none">
                SYS: {activeYear}
              </div>


              {/* Advanced Split Typography Year Text Centered inside the solid grid card */}
              <div className="relative z-20 flex items-baseline font-black text-[80px] md:text-[110px] leading-none tracking-tighter select-none pointer-events-none whitespace-nowrap">
                {/* Century Century (e.g. "20"): Elegant subtle outline */}
                <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.2)] mr-1">
                  {century}
                </span>
                {/* Year Suffix (e.g. "15"): Solid glowing brand orange */}
                <span className="text-[#FF5812] drop-shadow-[0_4px_20px_rgba(255,88,18,0.45)]">
                  {yearSuffix}
                </span>
              </div>
            </div>

          </div>

          {/* Right Side: Editorial Text Description */}
          <div className="lg:col-span-6 relative z-20 flex flex-col justify-center px-4 md:px-8 w-full mt-4 lg:mt-0">
            <div className="w-full text-center lg:text-left max-w-xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start">
              {/* Stage Info */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-mono tracking-wider text-[#1852FF] font-semibold bg-[#1852FF]/10 px-2.5 py-1 rounded-md">
                  {String(activeIndex + 1).padStart(2, '0')} // {String(timelineData.length).padStart(2, '0')}
                </span>
              
              </div>

              {/* Designed Heading with a vertical gradient accent bar and text gradient */}
              <div className="flex gap-4 items-stretch mb-3 text-left">
                <div className="w-[3px] bg-gradient-to-b from-[#1852FF] to-[#FF5812] rounded-full flex-shrink-0" />
                <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.15] bg-gradient-to-r from-[#0a0a1a] to-zinc-600 bg-clip-text text-transparent">
                  {activeItem.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[#0a0a1a]/70 font-normal text-lg leading-relaxed mt-2">
                {activeItem.description}
              </p>

              {/* Year Badge */}
              <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5812]/10 text-[#FF5812] text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812]" />
                EST. {activeYear}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Navigation Scrubber */}
        <div className="relative mt-6 md:mt-8 w-full flex flex-col gap-4">
          
          {/* Scrubber Controls Bar */}
          <div className="flex items-center justify-between px-2 sm:px-4">
            
            {/* Step Navigation Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-950 transition-colors shadow-sm focus:outline-none cursor-pointer"
                aria-label="Previous year"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-950 transition-colors shadow-sm focus:outline-none cursor-pointer"
                aria-label="Next year"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Autoplay Play/Pause Toggle */}
            <div className="flex items-center">
              <button
                onClick={() => setIsPlaying(prev => !prev)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold shadow-sm transition-all focus:outline-none cursor-pointer ${
                  isPlaying
                    ? "bg-[#1852FF]/10 border-[#1852FF]/20 text-[#1852FF]"
                    : "bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Autoplay On</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Autoplay Paused</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Scrubber scroll track */}
          <div className="relative w-full">
            <div
              ref={timelineRef}
              className="relative z-10 flex overflow-x-auto pt-4 pb-6 hide-scrollbar justify-between items-start gap-8 md:gap-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Progress Bar Track */}
              <div className="absolute top-[28px] left-[20px] right-[20px] h-[3px] pointer-events-none z-0">
                <div className="w-full h-full bg-zinc-200/80 rounded-full" />
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1852FF] to-[#FF5812] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {timelineData.map((item, index) => {
                const isActive = activeYear === item.year
                const isPassed = index <= activeIndex
                return (
                  <button
                    key={item.year}
                    data-year={item.year}
                    onClick={() => {
                      setActiveYear(item.year)
                      setIsPlaying(false) // pause autoplay when manually selecting a year
                    }}
                    className="group relative flex flex-col items-center gap-4 flex-shrink-0 focus:outline-none w-10 cursor-pointer"
                    aria-label={`Select year ${item.year}`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    {/* Circle Node */}
                    <div
                      className={`relative w-6 h-6 rounded-full transition-all duration-300 ease-out flex items-center justify-center z-10 border shadow-sm ${
                        isActive
                          ? "bg-[#FF5812] border-[#FF5812] scale-110 shadow-[0_0_12px_rgba(255,88,18,0.4)]"
                          : isPassed
                          ? "bg-[#1852FF] border-[#1852FF]"
                          : "bg-white border-zinc-300 group-hover:border-zinc-500 group-hover:scale-105"
                      }`}
                    >
                      {/* Active center dot */}
                      <div
                        className={`w-2 h-2 rounded-full bg-white transition-transform duration-300 ${
                          isActive ? "scale-100" : "scale-0 group-hover:scale-50"
                        }`}
                      />
                    </div>

                    {/* Year Label */}
                    <span
                      className={`text-sm font-bold transition-all duration-300 mt-1 ${
                        isActive
                          ? "text-[#FF5812] scale-105"
                          : "text-zinc-400 group-hover:text-zinc-800"
                      }`}
                    >
                      {item.year}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  )
}
