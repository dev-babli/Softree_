import React from 'react';
import Image from 'next/image';

const industries = [
  {
    title: 'Healthcare',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/health-2.png',
    href: '/healthcare-industry',
  },
  {
    title: 'Media & Entertainment',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/Media-3.png',
    href: '/media-and-entertainment-solutions',
  },
  {
    title: 'Retail & Ecommerce',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/Retail-4.png',
    href: '/retail-and-e-commerce-industry',
  },
  {
    title: 'Real Estate',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f9231059-3647-4f7a-ab8a-965fcb6abfb0-cynoteck-com/assets/images/Estate-5.png',
    href: '/Real-Estate-IT-Services',
  },
];

const IndustryCards = () => {
  return (
    <section className="bg-[#EFF9FF] py-[56px] lg:py-[80px]">
      <div className="container mx-auto px-6 max-w-[1280px] w-full lg:w-[87%]">
        <h2 className="text-[36px] md:text-[40px] font-normal text-[#00091A] text-center mb-12">
          Our Solutions Were Made for Every Industry
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((industry) => (
            <a
              key={industry.title}
              href={industry.href}
              className="group relative h-[400px] w-full rounded-[12px] overflow-hidden block"
            >
              {/* Background Image Container for Zoom Effect */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out scale-100 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h3 className="text-[24px] font-bold text-white leading-tight">
                  {industry.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryCards;