"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CustomerExperienceCard, { CustomerExperienceCardRefs } from "./CustomerExperienceCard";
import EmployeeProductivityCard, { EmployeeProductivityCardRefs } from "./EmployeeProductivityCard";
import KoreFourthSection from "./KoreFourthSection";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for the child components
  const cxCardRef = useRef<CustomerExperienceCardRefs>(null);
  const exCardRef = useRef<EmployeeProductivityCardRefs>(null);
  
  // Wrappers for opacity transitions
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const cxWrapperRef = useRef<HTMLDivElement>(null);
  const exWrapperRef = useRef<HTMLDivElement>(null);
  const globeWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Create a master timeline tied to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=600%", // 600vh scroll distance for plenty of room
        pin: true,
        scrub: 1, // Smooth scrubbing
        anticipatePin: 1,
      }
    });

    // ----------------------------------------------------------------
    // STAGE 1: CARD 1 (Customer Experience) - 0% to 33%
    // ----------------------------------------------------------------
    
    // Initially, globe is hidden, ex is hidden, cx is visible
    gsap.set(globeWrapperRef.current, { opacity: 0, pointerEvents: "none" });
    gsap.set(exWrapperRef.current, { opacity: 0, pointerEvents: "none", x: -50 });
    gsap.set(cxWrapperRef.current, { opacity: 1, pointerEvents: "auto", x: 0 });
    
    const cx = cxCardRef.current;
    if (cx && cx.mainBox) {
      // Reveal Stage 0 (Initial large text)
      tl.to(cx.stage0Content, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "cx-start");
      
      // Hold for a moment
      tl.to({}, { duration: 0.5 });
      
      // Now shrink the box, hide Stage 0, and hide the Title Box
      tl.addLabel("cx-shrink");
      
      tl.to(cx.titleBox, {
        y: -150,
        opacity: 0,
        duration: 0.5
      }, "cx-shrink");

      tl.to(cx.stage0Content, {
        y: -50,
        opacity: 0,
        duration: 0.5
      }, "cx-shrink");

      tl.to(cx.mainBox, {
        height: "85vh", // Expand vertically to fill the space
        width: "45vw", // Squeeze horizontally
        y: -100, // Move up to cover where the title was
        duration: 1,
        ease: "power2.inOut"
      }, "cx-shrink");
      
      // Reveal Stage 1 Content
      tl.to(cx.stage1Content, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "cx-shrink+=0.5");

      // Reveal Stage 2 Content
      tl.to(cx.stage2Content, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "cx-shrink+=1.0");

      // Reveal Stage 3 Content
      tl.to(cx.stage3Content, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "cx-shrink+=1.5");
      
      // Hold Card 1 for a moment
      tl.to({}, { duration: 0.5 });
    }

    // ----------------------------------------------------------------
    // TRANSITION: CARD 1 -> CARD 2 (33%)
    // ----------------------------------------------------------------
    
    tl.addLabel("swap-1-2");
    // Hide CX Card
    tl.to(cxWrapperRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.5,
      ease: "power2.inOut"
    }, "swap-1-2");
    
    // Show EX Card
    tl.to(exWrapperRef.current, {
      opacity: 1,
      x: 0,
      pointerEvents: "auto",
      duration: 0.5,
      ease: "power2.inOut"
    }, "swap-1-2");

    // ----------------------------------------------------------------
    // STAGE 2: CARD 2 (Employee Productivity) - 33% to 66%
    // ----------------------------------------------------------------
    
    const ex = exCardRef.current;
    if (ex && ex.mainBox) {
      // Hold briefly before transforming
      tl.to({}, { duration: 0.2 });

      // Reveal Stage 0 (Initial large text)
      tl.to(ex.stage0Content, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "ex-start");
      
      // Hold for a moment
      tl.to({}, { duration: 0.5 });
      
      // Now shrink the box, hide Stage 0, and hide the Title Box
      tl.addLabel("ex-shrink");

      tl.to(ex.titleBox, {
        y: -150,
        opacity: 0,
        duration: 0.5
      }, "ex-shrink");

      tl.to(ex.stage0Content, {
        y: -50,
        opacity: 0,
        duration: 0.5
      }, "ex-shrink");

      tl.to(ex.mainBox, {
        height: "85vh", // Expand vertically to fill the space
        width: "45vw", // Squeeze horizontally
        y: -100, // Move up to cover where the title was
        duration: 1,
        ease: "power2.inOut"
      }, "ex-shrink");
      
      // Reveal Stage 1 Content
      tl.to(ex.stage1Content, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "ex-shrink+=0.5");

      // Reveal Stage 2 Content
      tl.to(ex.stage2Content, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "ex-shrink+=1.0");

      // Reveal Stage 3 Content
      tl.to(ex.stage3Content, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, "ex-shrink+=1.5");
      
      // Hold Card 2 for a moment
      tl.to({}, { duration: 0.5 });
    }

    // ----------------------------------------------------------------
    // TRANSITION: CARD 2 -> GLOBE (66%)
    // ----------------------------------------------------------------
    
    tl.addLabel("swap-2-3");
    
    // Hide Background and EX Card
    tl.to(bgWrapperRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "swap-2-3");
    
    tl.to(exWrapperRef.current, {
      opacity: 0,
      x: -50,
      pointerEvents: "none",
      duration: 0.8,
      ease: "power2.inOut"
    }, "swap-2-3");

    // Show Globe
    tl.to(globeWrapperRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 1,
      ease: "power2.inOut"
    }, "swap-2-3+=0.2");

    // Hold Globe for the remaining scroll distance (66% to 100%)
    tl.to({}, { duration: 3 });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full h-screen relative bg-black overflow-hidden">
      {/* 
        The GSAP pin will hold this entire section on screen while scrubbing the timeline.
      */}
      <div className="w-full h-full relative">
        
        {/* Background Image for Cards 1 and 2 */}
        <div ref={bgWrapperRef} className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2850&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card 1: Customer Experience */}
        <div ref={cxWrapperRef} className="absolute inset-0 w-full h-full z-10">
          <CustomerExperienceCard ref={cxCardRef} />
        </div>

        {/* Card 2: Employee Productivity */}
        <div ref={exWrapperRef} className="absolute inset-0 w-full h-full z-10">
          <EmployeeProductivityCard ref={exCardRef} />
        </div>

        {/* Card 3: Existing Globe */}
        <div ref={globeWrapperRef} className="absolute inset-0 w-full h-full z-20 bg-black">
          <KoreFourthSection />
        </div>

      </div>
    </section>
  );
}
