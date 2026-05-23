// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';

// const caseStudiesData = [
//   {
//     id: 'boston-dynamics',
//     title: 'Boston Dynamics',
//     logoText: 'BostonDynamics',
//     // Replace with your actual public or asset folder paths
//     bgImage: '/images/boston-dynamics-bg.jpg', 
//     logoSvg: (
//       <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-2v2h2v2h-2v2h-2v-2H9V9h6v2z"/>
//       </svg>
//     )
//   },
//   {
//     id: 'hitt-contracting',
//     title: 'HITT Contracting',
//     logoText: 'HITT',
//     bgImage: '/images/hitt-bg.jpg',
//     logoSvg: null
//   },
//   {
//     id: 'bizrate-insights',
//     title: 'Bizrate Insights',
//     logoText: 'bizrate insights',
//     bgImage: '/images/bizrate-bg.jpg',
//     logoSvg: null
//   }
// ];

// export default function CaseStudies() {
//   const [activeSection, setActiveSection] = useState(0);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current) return;

//       const container = containerRef.current;
//       const { top, height } = container.getBoundingClientRect();
//       const windowHeight = window.innerHeight;

//       // Calculate progress of scroll through the whole container section
//       const totalScrollable = height - windowHeight;
//       const currentScroll = -top;

//       if (currentScroll >= 0 && currentScroll <= totalScrollable) {
//         // Divide into equal shares based on array length
//         const progress = currentScroll / totalScrollable;
//         const index = Math.min(
//           Math.floor(progress * caseStudiesData.length),
//           caseStudiesData.length - 1
//         );
//         setActiveSection(index);
//       } else if (currentScroll < 0) {
//         setActiveSection(0);
//       } else {
//         setActiveSection(caseStudiesData.length - 1);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="bg-[#05050A] text-white">
//       {/* The main wrapper defines how long the scroll zone lasts.
//         h-[300vh] gives 3 full screen heights worth of scrolling.
//       */}
//       <div ref={containerRef} className="relative h-[300vh] w-full">
        
//         {/* Sticky viewport frame container */}
//         <div className="sticky top-0 h-screen w-full flex items-center justify-between max-w-7xl mx-auto px-6 md:px-12 gap-12 overflow-hidden">
          
//           {/* Left Side: Unmoving Content Block */}
//           <div className="w-full md:w-5/12 flex flex-col justify-center space-y-6">
//             <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
//               When Our Clients Win, We Win
//             </h2>
//             <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md">
//               Every case study here is a reflection of that mindset. These aren't just project highlights—they're proof that when our clients succeed, so do we. Their wins are our benchmark, and we're proud to share the results.
//             </p>
//           </div>

//           {/* Right Side: Dynamically Changing Card Viewport */}
//           <div className="w-full md:w-7/12 h-[65vh] md:h-[70vh] relative rounded-2xl overflow-hidden bg-[#0F0F1A] shadow-2xl border border-white/5">
//             {caseStudiesData.map((study, index) => {
//               const isActive = index === activeSection;
              
//               return (
//                 <div
//                   key={study.id}
//                   className={`absolute inset-0 w-full h-full flex flex-col justify-between p-8 md:p-12 transition-all duration-700 ease-in-out ${
//                     isActive 
//                       ? 'opacity-100 scale-100 pointer-events-auto z-10' 
//                       : 'opacity-0 scale-95 pointer-events-none z-0'
//                   }`}
//                 >
//                   {/* Visual Background (Using Next.js Image or fallback overlay color blocks) */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-0" />
//                   {study.bgImage && (
//                     <div className="absolute inset-0 z-[-1] opacity-40 mix-blend-luminosity">
//                       {/* Note: Replace src with genuine links or local placeholder vectors 
//                         Uncomment below once images exist in your public directory
//                       */}
//                       {/* <Image src={study.bgImage} alt={study.title} fill className="object-cover" priority /> */}
//                     </div>
//                   )}

//                   {/* Centered Overlay Branding */}
//                   <div className="m-auto z-10 flex flex-col items-center space-y-4 text-center select-none">
//                     {study.logoSvg && <div>{study.logoSvg}</div>}
//                     <span className={`tracking-wider text-white font-extrabold uppercase ${
//                       study.id === 'hitt-contracting' ? 'text-5xl font-serif tracking-widest' : 'text-3xl'
//                     }`}>
//                       {study.logoText}
//                     </span>
//                   </div>

//                   {/* Card Bottom Identifier */}
//                   <div className="z-10 mt-auto pt-4 border-t border-white/10 w-full flex justify-between items-center">
//                     <span className="text-lg font-semibold tracking-wide text-white/90">
//                       {study.title}
//                     </span>
//                     <span className="text-xs font-mono text-gray-500">
//                       0{index + 1} / 0{caseStudiesData.length}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//         </div>
//       </div>

//       {/* Spacer to simulate natural bottom layout flow following the pinned dynamic block */}
//       <div className="h-screen bg-[#05050A] flex items-center justify-center border-t border-white/5">
//         <p className="text-gray-600 font-mono text-sm">Scroll down to view rest of the page...</p>
//       </div>
//     </div>
//   );
// }







'use client';

import React, { useState, useEffect, useRef } from 'react';

const caseStudiesData = [
  {
    id: 'boston-dynamics',
    title: 'Boston Dynamics',
    logoText: 'BOSTONDYNAMICS',
    // High-quality robotics/technology background image
    bgImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200', 
    logoSvg: (
      <svg className="w-8 h-8 text-white mb-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-2v2h2v2h-2v2h-2v-2H9V9h6v2z"/>
      </svg>
    )
  },
  {
    id: 'hitt-contracting',
    title: 'HITT Contracting',
    logoText: 'HITT',
    // High-quality industrial construction background image
    bgImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200',
    logoSvg: null
  },
  {
    id: 'bizrate-insights',
    title: 'Bizrate Insights',
    logoText: 'bizrate insights',
    // High-quality modern workspace/e-commerce background image
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    logoSvg: null
  }
];

export default function CaseStudies() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScrollable = height - windowHeight;
      const currentScroll = -top;

      if (currentScroll >= 0 && currentScroll <= totalScrollable) {
        const progress = currentScroll / totalScrollable;
        const index = Math.min(
          Math.floor(progress * caseStudiesData.length),
          caseStudiesData.length - 1
        );
        setActiveSection(index);
      } else if (currentScroll < 0) {
        setActiveSection(0);
      } else {
        setActiveSection(caseStudiesData.length - 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#05050A] text-white font-sans">
      {/* Scroll Track */}
      <div ref={containerRef} className="relative h-[300vh] w-full">
        
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12 gap-12 overflow-hidden">
          
          {/* Left Content Column */}
          <div className="w-full md:w-5/12 flex flex-col justify-center space-y-6 pt-12 md:pt-0">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              When Our Clients Win, We Win
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md">
              Every case study here is a reflection of that mindset. These aren't just project highlights—they're proof that when our clients succeed, so do we. Their wins are our benchmark, and we're proud to share the results.
            </p>
          </div>

          {/* Right Cards Viewport */}
          <div className="w-full md:w-7/12 h-[55vh] md:h-[65vh] relative rounded-2xl overflow-hidden bg-[#0F0F1A] shadow-2xl border border-white/10 mb-12 md:mb-0">
            {caseStudiesData.map((study, index) => {
              const isActive = index === activeSection;
              
              return (
                <div
                  key={study.id}
                  className={`absolute inset-0 w-full h-full flex flex-col justify-between p-8 md:p-12 transition-all duration-700 ease-in-out ${
                    isActive 
                      ? 'opacity-100 scale-100 pointer-events-auto z-10' 
                      : 'opacity-0 scale-95 pointer-events-none z-0'
                  }`}
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(5, 5, 10, 0.95) 0%, rgba(5, 5, 10, 0.4) 50%, rgba(5, 5, 10, 0.7) 100%), url(${study.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Centered Logo / Brand Text */}
                  <div className="m-auto z-10 flex flex-col items-center text-center select-none">
                    {study.logoSvg && study.logoSvg}
                    <span className={`tracking-widest text-white font-black uppercase ${
                      study.id === 'hitt-contracting' ? 'text-5xl font-serif' : 'text-3xl'
                    }`}>
                      {study.logoText}
                    </span>
                  </div>

                  {/* Card Footer Info */}
                  <div className="z-10 mt-auto pt-4 border-t border-white/10 w-full flex justify-between items-center">
                    <span className="text-lg font-bold tracking-wide text-white">
                      {study.title}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      0{index + 1} / 0{caseStudiesData.length}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Continuation of Page spacer */}
      <div className="h-screen bg-[#05050A]" />
    </div>
  );
}

