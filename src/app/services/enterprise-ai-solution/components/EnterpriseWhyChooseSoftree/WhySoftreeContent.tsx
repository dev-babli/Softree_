"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WhySoftreeItem } from "./whySoftreeData";
import { contentVariant, imageVariant, staggerContainer, listItemVariant } from "./animations";

interface Props {
  item: WhySoftreeItem;
  currentIndex: number;
  totalItems: number;
}

export const WhySoftreeContent: React.FC<Props> = ({ item, currentIndex, totalItems }) => {
  const progressPercentage = ((currentIndex + 1) / totalItems) * 100;

  return (
    <div className="w-full lg:w-1/2 pr-0 lg:pr-12">
      
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-3 text-lg font-bold text-[#FF6A13]">
          <span>{item.number}</span>
          <span className="text-gray-300 font-normal">/ 0{totalItems}</span>
        </div>
        <div className="w-48 h-[2px] bg-gray-200 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#FF6A13]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          variants={contentVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full flex flex-col md:flex-row gap-8 items-start"
        >
          {/* Text Content */}
          <div className="flex-1">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {item.title}
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {item.description}
            </p>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {item.features.map((feature, idx) => (
                <motion.div key={idx} variants={listItemVariant} className="flex gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100/50 hover:bg-white hover:shadow-sm hover:border-orange-100 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-[#FF6A13]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">{feature.title}</h5>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image Content */}
          <motion.div 
            variants={imageVariant}
            className="w-full md:w-5/12 h-100 md:h-125 rounded-3xl overflow-hidden relative shadow-2xl shadow-orange-500/5 shrink-0 border border-gray-100"
          >
            <Image
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle overlay gradient to match design style */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
