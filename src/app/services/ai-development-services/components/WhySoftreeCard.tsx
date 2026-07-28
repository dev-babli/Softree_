"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getIcon = (type: string, className: string) => {
  switch (type) {
    case 'building': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
    case 'microsoft': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
      </svg>
    );
    case 'shield': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
    case 'chart': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    );
    case 'code': return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    );
    default: return <div />;
  }
};

import Image from 'next/image';
const imageMap: Record<string, string> = {
  building: '/images/ai-development-services/why-softree/enterprise.png',
  microsoft: '/images/ai-development-services/why-softree/microsoft.png',
  shield: '/images/ai-development-services/why-softree/secure.png',
  chart: '/images/ai-development-services/why-softree/business.png',
  code: '/images/ai-development-services/why-softree/custom.png',
};

export default function WhySoftreeCard({ item, isActive, onClick, windowWidth }: any) {
  let widthVal = '100%';
  let heightVal = 'auto';

  // Desktop horizontal accordion, Tablet 2-col wrap, Mobile vertical stack
  if (windowWidth >= 1024) {
    widthVal = isActive ? '45%' : '13.75%';
    heightVal = '100%';
  } else if (windowWidth >= 768) {
    widthVal = isActive ? '100%' : 'calc(50% - 8px)';
    heightVal = 'auto';
  }

  const isDesktop = windowWidth >= 1024;

  return (
    <motion.div
      layout
      onClick={onClick}
      initial={false}
      animate={{ width: widthVal, height: heightVal }}
      transition={{ layout: { type: "spring", duration: 0.45, bounce: 0 }, type: "spring", duration: 0.45, bounce: 0 }}
      className={`relative overflow-hidden cursor-pointer rounded-[32px] bg-white transition-shadow duration-300 ${
        isActive 
          ? 'shadow-[0_20px_50px_rgba(255,107,44,0.12)] border-[1.5px] border-[#FF6B2C]' 
          : 'shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#ECECEC] hover:shadow-[0_15px_40px_rgba(255,107,44,0.08)] hover:border-[#FF6B2C]/50 hover:-translate-y-1'
      }`}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
    >
      {/* Top Right Toggle Icon */}
      <div className={`absolute z-20 ${isDesktop ? 'top-6 right-6' : 'top-5 right-5'}`}>
         <motion.div
           animate={{ rotate: isActive ? 180 : 0 }}
           transition={{ type: "spring", stiffness: 300, damping: 20 }}
           className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 shadow-sm ${isActive ? 'bg-[#FF6B2C] text-white' : 'bg-orange-50 text-[#FF6B2C]'}`}
         >
           {isActive ? (
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
             </svg>
           ) : (
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
             </svg>
           )}
         </motion.div>
      </div>

      <div className={`w-full h-full relative z-10 flex flex-col ${isDesktop ? 'p-8' : 'p-6'}`}>
        
        {isDesktop ? (
          <>
            {/* Expanded Desktop */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col h-full absolute inset-0 p-8"
                >
                  <div className={`w-full h-[220px] rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center shadow-inner`}>
                    <Image 
                      src={imageMap[item.icon]}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 550px"
                      quality={95}
                    />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 mt-2">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF6B2C] shadow-sm">
                      {getIcon(item.icon, "w-6 h-6")}
                    </div>
                    <h3 className="text-[24px] font-bold text-[#111827]">{item.title}</h3>
                  </div>
                  
                  <div className="w-12 h-[3px] bg-[#FF6B2C] rounded-full mb-5"></div>
                  
                  <p className="text-[15px] text-[#6B7280] leading-relaxed mb-6 pr-4">{item.description}</p>
                  
                  <div className="mt-auto flex flex-wrap gap-2.5">
                    {item.features.map((feat: string, i: number) => (
                      <span key={i} className="px-3.5 py-1.5 bg-orange-50/50 border border-orange-100 rounded-full text-[13px] font-semibold text-[#FF6B2C] flex items-center gap-1.5 shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed Desktop */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex items-center justify-center h-full w-full absolute inset-0"
                >
                  <h3 
                    className="text-[14px] xl:text-[16px] font-bold text-[#6B7280] tracking-wider whitespace-nowrap uppercase overflow-hidden text-ellipsis"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', maxHeight: '90%' }}
                  >
                    {item.title}
                  </h3>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          /* Mobile/Tablet View */
          <div className="flex flex-col w-full h-full">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF6B2C] shrink-0 shadow-sm">
                 {getIcon(item.icon, "w-6 h-6")}
               </div>
               <h3 className="text-[18px] font-bold text-[#111827] pr-12 leading-tight">{item.title}</h3>
             </div>
             
             <AnimatePresence>
               {isActive && (
                 <motion.div
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   className="overflow-hidden"
                 >
                   <div className="pt-6">
                     <div className={`w-full h-[180px] rounded-xl mb-6 relative overflow-hidden flex items-center justify-center shadow-inner`}>
                        <Image 
                          src={imageMap[item.icon]}
                          alt={item.title}
                          fill
                          className="object-cover object-center"
                          sizes="100vw"
                          quality={95}
                        />
                     </div>
                     <div className="w-8 h-[3px] bg-[#FF6B2C] rounded-full mb-4"></div>
                     <p className="text-[14px] text-[#6B7280] leading-relaxed mb-6">{item.description}</p>
                     <div className="flex flex-wrap gap-2">
                       {item.features.map((feat: string, i: number) => (
                         <span key={i} className="px-3 py-1.5 bg-orange-50/50 border border-orange-100 rounded-full text-[12px] font-semibold text-[#FF6B2C] flex items-center gap-1.5">
                           <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                           </svg>
                           {feat}
                         </span>
                       ))}
                     </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
