"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const industries = [
  {
    title: "Healthcare",
    subtitle: "Solution Development",
    image: "/images/web/health.avif",
    items: [
      "Healthcare App Development",
      "Fitness App Development",
      "Wellness App Development",
      "Mental Health App Development",
      "Telemedicine Apps",
      "Clinic Management Solutions",
    ],
  },
  {
    title: "Fintech",
    subtitle: "Solution Development",
    image: "/images/web/fintech.avif",
    items: [
      "Finance Management Apps",
      "Stock Trading Apps",
      "Insurance Apps",
      "Digital Banking Solutions",
      "Digital Payment Solutions",
    ],
  },
  {
    title: "Manufacturing",
    subtitle: "Solution Development",
    image: "/images/web/manufacturing.jpg",
    items: [
      "Warehouse Management Systems",
      "Fleet Management Applications",
      "Supply Chain Automation",
      "Logistics Management Solutions",
      "Order Tracking Systems",
    ],
  },
  {
    title: "Entertainment",
    subtitle: "Solution Development",
    image: "/images/web/entertainment.avif",
    items: [
      "Video Streaming Platforms",
      "Music Streaming Apps",
      "Photo & Video Editing Apps",
      "Event Management Platforms",
      "OTT Solutions",
    ],
  },
  {
    title: "Travel",
    subtitle: "Solution Development",
    image: "/images/web/travel.avif",
    items: [
      "Travel Booking Apps",
      "Trip Planning Platforms",
      "Hotel & Flight Management",
      "Virtual Tours & AR Apps",
      "Travel CRM Systems",
    ],
  },
];

export default function IndustrySlider() {
  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Industry-Specific Web Development Solutions
          </h2>
          <p className="text-gray-400">
            We craft scalable, secure, and high-performance digital solutions
            tailored to the unique demands of every industry.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={40}
          slidesPerView={1}
          navigation={{
            nextEl: ".industry-next",
            prevEl: ".industry-prev",
          }}
          breakpoints={{
            1024: {
              slidesPerView: 1.2,
            },
          }}
        >
          {industries.map((industry, index) => (
            <SwiperSlide key={index}>
              <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                {/* Image */}
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover opacity-90"
                  />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <h3 className="text-2xl font-medium mb-6 leading-tight">
                    {industry.title}
                    <br />
                    <span className="text-gray-400">{industry.subtitle}</span>
                  </h3>

                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    {industry.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        <div className="flex items-center gap-10 mt-10">
          <button className="industry-prev text-gray-400 hover:text-white transition">
            ← Prev
          </button>
          <button className="industry-next font-medium text-white hover:underline">
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
