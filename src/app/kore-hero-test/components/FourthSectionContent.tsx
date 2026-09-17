import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FourthSectionContent() {
  return (
    <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between pointer-events-none">
      
      {/* Left Content - Typography - Shifted UP */}
      <div className="w-full md:w-[25%] absolute left-6 lg:left-[5vw] top-[20%] md:top-[25%]">
        <h2 className="leading-[1.1] tracking-tight flex flex-col">
          <span className="text-white text-[3rem] md:text-[3.8rem] lg:text-[4.5rem] font-bold tracking-tight">
            Build
          </span>
          <span 
            className="text-[3rem] md:text-[3.8rem] lg:text-[4.5rem] italic font-light tracking-tight"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)", color: "transparent" }}
          >
            Scale.
          </span>
          <span 
            className="text-[3rem] md:text-[3.8rem] lg:text-[4.5rem] italic font-light tracking-tight"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)", color: "transparent" }}
          >
            Optimize.
          </span>
        </h2>
      </div>

      {/* Center Label inside Sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-auto z-20">
        <p className="text-white tracking-[0.2em] text-[10px] md:text-xs font-mono mb-4 uppercase font-bold">
          Softree AI Engineering Platform
        </p>
        <h3 className="text-[#4ade80] text-4xl md:text-[4.5rem] font-light italic tracking-wide" style={{ textShadow: "0 0 10px rgba(74, 222, 128, 0.2)" }}>
          {"{ Softree }"}
        </h3>
      </div>

      {/* Right Content - Shifted DOWN */}
      <div className="w-full md:w-[25%] absolute right-6 lg:right-[5vw] bottom-[20%] md:bottom-[20%] flex flex-col items-start text-left pointer-events-auto">
        <div className="w-full">
          <p className="text-white text-base md:text-lg font-normal mb-6 leading-relaxed">
            The AI-programmable platform architected for optimization across the agentic enterprise.
          </p>
          <div>
            <Link 
              href="/services/ai-development-services"
              className="inline-flex items-center justify-between gap-6 border border-white/30 text-white px-5 py-3 hover:bg-white hover:text-black transition-all duration-300 text-sm font-light w-auto group"
            >
              <span>Dive into {"{Softree}"}</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity ml-2" strokeWidth={1} />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
