"use client";

import { motion } from "framer-motion";
import { Shield, Brain, TrendingUp, Bot, type LucideIcon } from "lucide-react";

interface TrustItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const trustItems: TrustItem[] = [
  {
    icon: Shield,
    title: "Offshore AI Teams",
    description: "Microsoft-certified talent.",
  },
  {
    icon: Brain,
    title: "White-Label Delivery",
    description: "Powered by our experts.",
  },
  {
    icon: TrendingUp,
    title: "Enterprise AI Solutions",
    description: "Secure, scalable AI for business",
  },
  {
    icon: Bot,
    title: "Business ROI",
    description: "Reduce costs. Accelerate delivery",
  },
];

export const TrustStrip = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-[1200px] relative z-20"
    >
      {/* Gradient hairline frame */}
      <div className="rounded-2xl md:rounded-[32px] p-[1px] bg-gradient-to-b from-[#FFDCC2] via-[#ECECEC] to-[#ECECEC] shadow-[0_8px_30px_rgb(0,0,0,0.04),_0_20px_40px_rgb(255,107,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06),_0_20px_50px_rgb(255,107,0,0.09)] transition-shadow duration-500">
        <div className="bg-white/80 backdrop-blur-md rounded-[calc(1rem-1px)] md:rounded-[calc(2rem-1px)] flex flex-col md:flex-row">
          {trustItems.map((item, index) => (
            <div
              key={item.title}
              className="relative flex-1 group"
            >
              {/* Fading divider — vertical on desktop, horizontal on mobile */}
              {index !== trustItems.length - 1 && (
                <>
                  <div className="hidden md:block absolute right-0 top-[18%] bottom-[18%] w-px bg-gradient-to-b from-transparent via-[#E5E5E5] to-transparent" />
                  <div className="md:hidden absolute left-[8%] right-[8%] bottom-0 h-px bg-gradient-to-r from-transparent via-[#E5E5E5] to-transparent" />
                </>
              )}

              <div className="flex items-center md:items-start gap-3 xl:gap-4 py-4 px-4 md:py-5 lg:py-6 lg:px-4 xl:px-6 transition-transform duration-300 md:group-hover:-translate-y-[3px]">
                {/* Icon: duotone ring instead of flat fill */}
                <div className="relative w-10 h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFE4CC] to-[#FFF3EB] transition-transform duration-300 group-hover:scale-[1.1]" />
                  <div className="absolute inset-[3px] rounded-full bg-white/40 flex items-center justify-center">
                    <item.icon
                      className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] xl:w-[22px] xl:h-[22px] text-[#FF6B00] transition-transform duration-300 group-hover:rotate-[8deg]"
                      strokeWidth={2}
                    />
                  </div>
                </div>

                <div className="flex flex-col pt-0.5 text-left min-w-0">
                  <h3 className="text-sm md:text-[15px] lg:text-[15px] xl:text-[17px] font-bold text-[#111827] leading-tight tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  {/* Signature element: a small accent bar that reads as a "confidence" indicator and fills out on hover */}
                  <span className="block h-[2px] w-5 bg-[#FF6B00]/60 rounded-full mt-1.5 mb-1.5 transition-all duration-300 ease-out group-hover:w-10 group-hover:bg-[#FF6B00]" />
                  <p className="text-[12px] md:text-[12.5px] xl:text-[13.5px] font-medium text-[#6B7280] leading-[1.45]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};