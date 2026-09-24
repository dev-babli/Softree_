"use client";

import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EmployeeProductivityCard() {
  const containerRef = useRef<HTMLElement>(null);
  const titleBoxRef = useRef<HTMLDivElement>(null);
  const mainBoxRef = useRef<HTMLDivElement>(null);
  const stage0ContentRef = useRef<HTMLDivElement>(null);
  const stage1ContentRef = useRef<HTMLDivElement>(null);
  const stage2ContentRef = useRef<HTMLDivElement>(null);
  const stage3ContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=600vh", // Extended scroll distance for slower transition
        scrub: 1,
      }
    });

    // Initial state setup
    gsap.set([stage0ContentRef.current, stage1ContentRef.current, stage2ContentRef.current, stage3ContentRef.current], { 
      opacity: 0, 
      y: 32 
    });

    // Reveal Stage 0
    tl.to(stage0ContentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    });
    
    tl.to({}, { duration: 0.5 }); // hold
    
    // Shrink Phase
    tl.addLabel("shrink");
    
    tl.to(titleBoxRef.current, {
      y: -150,
      opacity: 0,
      duration: 1 // Slower fade out
    }, "shrink");

    tl.to(stage0ContentRef.current, {
      y: -50,
      opacity: 0,
      duration: 1 // Slower fade out
    }, "shrink");

    tl.to(mainBoxRef.current, {
      height: "85vh",
      width: "45vw",
      y: -100,
      duration: 4, // Make the physical shrink take 4x as long
      ease: "power2.inOut"
    }, "shrink");
    
    // Reveal Stage 1, 2, 3 with massive scroll gaps between them
    tl.to(stage1ContentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "shrink+=2.5"); // Wait until box is mostly shrunk before revealing Stage 1

    tl.to(stage2ContentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "shrink+=5.5"); // Huge gap before Stage 2

    tl.to(stage3ContentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "shrink+=8.5"); // Huge gap before Stage 3
    
    tl.to({}, { duration: 4 }); // Hold at the end so it doesn't immediately scroll away

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[700vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black flex flex-col items-start justify-end px-0 md:px-[5vw] pb-[5vh]">
        
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2850&auto=format&fit=crop" 
            alt="Employee Productivity Background" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="w-full flex flex-col items-start gap-0 relative z-10 pointer-events-none">
          {/* Title Box */}
          <div ref={titleBoxRef} className="w-full max-w-[800px] pointer-events-auto flex justify-start">
            <div className="bg-black/30 backdrop-blur-md border border-white/10 p-8 min-w-[500px]">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight flex items-baseline gap-4">
                Employee <span className="font-light italic tracking-tight font-serif">Productivity</span>
              </h2>
            </div>
          </div>

          {/* Main Transformable Box */}
          <div 
            ref={mainBoxRef}
            className="w-full bg-black/40 backdrop-blur-xl border border-white/10 border-t-0 h-[50vh] relative overflow-hidden pointer-events-auto origin-left"
          >
            <div className="w-full h-full relative">
              
              {/* Stage 0 Content (Initial large text) */}
              <div ref={stage0ContentRef} className="absolute inset-0 flex items-center px-[10%]">
                <p className="text-4xl md:text-5xl font-light italic text-white/90 leading-tight max-w-4xl">
                  AI agents streamline workflows, automate repetitive tasks, and empower employees to focus on what matters.
                </p>
              </div>

              {/* Stage 1 Content (What you can do) */}
              <div ref={stage1ContentRef} className="flex flex-col gap-6 absolute top-12 left-12 w-[80%]">
                <h3 className="text-xs tracking-widest text-white/50 font-mono uppercase flex items-center gap-2">
                  What you can do <span className="w-2 h-2 bg-emerald-500 inline-block" />
                </h3>
                <ul className="text-2xl md:text-3xl text-white/80 space-y-4 font-light">
                  <li>Internal IT & HR helpdesk</li>
                  <li>Knowledge discovery</li>
                  <li>Process automation</li>
                  <li>Conversational intelligence</li>
                </ul>
              </div>

              {/* Stage 2 Content (Pre-built applications) */}
              <div ref={stage2ContentRef} className="absolute top-[50%] left-12 w-[80%]">
                <h3 className="text-xs tracking-widest text-white/50 font-mono uppercase mb-4">
                  Pre-built applications and solutions
                </h3>
                <div className="flex gap-4">
                  <div className="border border-white/20 bg-white/5 px-6 py-3 text-white/90 text-sm">AI for IT Ops</div>
                  <div className="border border-white/20 bg-white/5 px-6 py-3 text-white/90 text-sm">AI for HR</div>
                  <div className="border border-white/20 bg-white/5 px-6 py-3 text-white/90 text-sm">AI for Sales</div>
                </div>
              </div>

              {/* Stage 3 Content (Capabilities) */}
              <div ref={stage3ContentRef} className="absolute bottom-24 left-12 w-[90%]">
                <div className="flex justify-between items-start gap-4 text-emerald-400">
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl">+</span>
                    <span className="text-xs text-white uppercase tracking-widest font-mono leading-tight">Ready to<br/>Use Today</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl">※</span>
                    <span className="text-xs text-white uppercase tracking-widest font-mono leading-tight">Enterprise<br/>Secure</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl">^</span>
                    <span className="text-xs text-white uppercase tracking-widest font-mono leading-tight">Seamless<br/>Integration</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl">∷</span>
                    <span className="text-xs text-white uppercase tracking-widest font-mono leading-tight">Assured<br/>Outcomes</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl">[]</span>
                    <span className="text-xs text-white uppercase tracking-widest font-mono leading-tight">Built for<br/>Your Business</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="absolute bottom-0 right-0">
                <button className="bg-white text-black px-8 py-5 flex items-center gap-4 hover:bg-gray-200 transition-colors">
                  <span className="font-medium text-sm">Learn about EX optimization</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Little square indicator bottom right */}
              <div className="absolute bottom-6 right-8 w-1.5 h-1.5 bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
