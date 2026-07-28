"use client";

import { motion } from "framer-motion";

const stats = [
  {
    title: "Microsoft Solutions",
    subtitle: "Partner",
  },
  {
    title: "100+",
    subtitle: "AI Projects Delivered",
  },
  {
    title: "10+",
    subtitle: "Years of Experience",
  },
  {
    title: "ISO 27001",
    subtitle: "Certified",
  },
];

export const HeroStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="absolute -bottom-16 left-0 right-0 max-w-6xl mx-auto px-4 z-20 hidden lg:block"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-8">
        <div className="grid grid-cols-4 gap-8 divide-x divide-slate-100">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-xl font-bold text-slate-800">{stat.title}</span>
              <span className="text-sm text-slate-500 mt-1 font-medium">{stat.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
