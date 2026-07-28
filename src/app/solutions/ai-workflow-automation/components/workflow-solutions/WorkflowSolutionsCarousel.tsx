"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { workflowSolutionsData } from "./workflow-solutions-data";
import { useEffect, useState } from "react";

interface WorkflowSolutionsCarouselProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function WorkflowSolutionsCarousel({ activeIndex, onSelect }: WorkflowSolutionsCarouselProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(255,107,0,0.2)] flex items-center justify-center bg-orange-950/30">
      {/* Animated Gradient Border */}
      <div className="absolute w-[150%] h-[150%] bg-[conic-gradient(from_0deg_at_50%_50%,#ea580c_0%,#f97316_25%,#ffedd5_50%,#f97316_75%,#ea580c_100%)] animate-[spin_5s_linear_infinite]" />
      
      {/* Inner Container to create border effect */}
      <div className="absolute inset-[3px] rounded-[calc(2rem-3px)] overflow-hidden bg-black group z-10">
        
        {/* Images */}
        {workflowSolutionsData.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {mounted && (
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover transition-transform duration-[10s] ease-out group-hover:scale-105"
                priority={index === 0}
              />
            )}
            {/* Subtle dark overlay for better text contrast if we had text inside, and to enhance premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>
        ))}

        {/* Inner glow effect */}
        <div className="absolute inset-0 z-20 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
          {workflowSolutionsData.map((_, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
