import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  return (
    <section className="bg-[#00091A] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Header Content */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <div className="inline-block px-3 py-1 bg-[#ffffff14] text-[#22d3ee] text-xs font-medium rounded-sm mb-6 w-fit">
              Testimonials
            </div>
            <h2 className="text-[40px] leading-[1.2] font-normal text-white mb-6">
              Our commitment<br />to excellence
            </h2>
            <p className="text-[18px] text-white/70 font-normal mb-8 max-w-sm">
              Our commitment to excellence is reflected in our clients’ experiences
            </p>
            <a
              href="/testimonials"
              className="w-fit px-6 py-2 bg-[#1d4ed8] hover:bg-[#1d4ed8]/90 text-white font-medium text-sm rounded-md transition-colors"
            >
              View All
            </a>
          </div>

          {/* Right Column: Featured Testimonial Card */}
          <div className="lg:col-span-7 relative pt-12">
            {/* Large Decorative Quote Icon */}
            <div className="absolute top-0 left-[-20px] lg:left-[-40px] z-0 opacity-20 pointer-events-none">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/Quote-6.png"
                alt="Quote icon"
                width={120}
                height={90}
                className="object-contain"
              />
            </div>

            {/* Testimonial Card */}
            <div className="relative z-10 glass-card p-10 lg:p-14 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent">
              <p className="text-[20px] lg:text-[24px] leading-relaxed text-white font-normal mb-10 italic">
                “It was very easy to discuss ideas, get feedback from multiple people with the team, and work to move forward.”
              </p>
              
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/Baylee_Gilley-7.webp"
                    alt="Baylee Gilley"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base leading-tight">Baylee Gilley</h4>
                  <p className="text-[#ffffffcc] text-sm font-normal">COO, Hallman Industries</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Trusted By Sub-Section */}
        <div className="mt-24 text-center">
          <h3 className="text-[32px] lg:text-[40px] font-normal text-white mb-10">
            Trusted by Leading Companies<br />Across Industries
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Healthcare', 'Media & Entertainment', 'Retail & E-commerce', 'Real Estate'].map((industry) => (
              <button
                key={industry}
                className="px-6 py-2 rounded-full border border-white/20 text-white/80 text-sm font-normal hover:bg-white/10 hover:border-white/40 transition-all cursor-default"
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;