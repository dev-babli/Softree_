"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { WhySoftreeItem } from "./whySoftreeData";

interface Props {
  item: WhySoftreeItem;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

export const WhySoftreeCard: React.FC<Props> = ({
  item,
  isActive,
  onClick,
  onMouseEnter,
}) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`relative w-full sm:w-20 lg:w-24 flex-shrink-0 cursor-pointer transition-all duration-500 ease-in-out flex flex-col items-center justify-between rounded-full overflow-hidden ${
        isActive
          ? "h-[500px] sm:h-[600px] bg-white shadow-[0_20px_40px_rgba(255,106,19,0.15)] -translate-y-2 z-10"
          : "h-[450px] sm:h-[500px] bg-white border border-gray-100 hover:shadow-md hover:-translate-y-1 z-0"
      }`}
    >
      {/* Active Glowing Border */}
      {isActive && (
        <>
          <div className="absolute -inset-[2px] rounded-full bg-gradient-to-b from-orange-500 via-orange-300 to-orange-500 opacity-70 blur-sm pointer-events-none animate-pulse" />
          <div className="absolute -inset-[2px] rounded-full bg-gradient-to-b from-orange-500 via-white to-orange-500 opacity-100 pointer-events-none" style={{ maskImage: "linear-gradient(white, white)", maskComposite: "exclude" }} />
        </>
      )}

      {/* Inner Container */}
      <div className="relative w-full h-full bg-white rounded-full flex flex-col items-center justify-between py-6 px-2 z-10 border border-transparent">
        
        {/* Top Number */}
        <span className={`text-xl font-bold transition-colors duration-300 ${isActive ? "text-[#FF6A13]" : "text-gray-400"}`}>
          {item.number}
        </span>

        {/* Icon */}
        <div className="my-4">
          <item.icon 
            className={`w-8 h-8 transition-all duration-300 ${isActive ? "text-[#FF6A13] drop-shadow-[0_0_8px_rgba(255,106,19,0.5)] scale-110" : "text-gray-400 grayscale"}`} 
            strokeWidth={1.5}
          />
        </div>

        {/* Vertical Title */}
        <div className="flex-1 flex items-center justify-center relative w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-center">
            <span className={`font-semibold tracking-wide transition-colors duration-300 ${isActive ? "text-[#FF6A13]" : "text-gray-600"}`}>
              {item.shortTitle}
            </span>
          </div>
        </div>

        {/* Bottom Arrow */}
        <div className={`mt-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-[#FF6A13] text-white shadow-lg" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
