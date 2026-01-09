import React from 'react';
import Image from 'next/image';

const CTABanner = () => {
  // Asset link from provided list
  const backgroundImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/images_21.png";

  return (
    <section className="relative w-full overflow-hidden bg-[#00091A]">
      {/* Background Image Container with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Digital excellence background"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        {/* Dark overlay to ensure text readability as seen in high level design and screenshots */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00091A] via-[#00091A]/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-[87%] py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Heading */}
          <div>
            <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-balance">
              Your Partners for Digital Excellence. Let’s Get Started Today.
            </h2>
          </div>

          {/* Right Column - Text and CTA */}
          <div className="flex flex-col items-start gap-8">
            <p className="text-[#FFFFFFCC] text-base md:text-lg leading-relaxed max-w-xl">
              We make it easy to kickstart your digital transformation. Schedule a free consultation to discuss your goals, and we'll craft a roadmap that aligns with your vision. From planning to implementation and ongoing optimization, our team ensures your success at every step.
            </p>
            
            <a
              href="/contact?utm_source=website_footer_cta&utm_medium=button&utm_content=get_in_touch"
              className="px-8 py-3 bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-base font-medium rounded-md transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
