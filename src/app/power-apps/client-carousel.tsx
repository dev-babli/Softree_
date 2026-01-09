"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ClientCarousel: React.FC = () => {
  const clients = [
    "https://www.softreetechnology.com/wp-content/uploads/2024/07/Client-1.png",
    "https://www.softreetechnology.com/wp-content/uploads/2024/07/Client-2.png",
    "https://www.softreetechnology.com/wp-content/uploads/2024/07/Client-3.png",
    "https://www.softreetechnology.com/wp-content/uploads/2024/07/Client-4.png",
    "https://www.softreetechnology.com/wp-content/uploads/2024/07/Client-5.png",
    "https://www.softreetechnology.com/wp-content/uploads/2024/07/Client-6.png",
    "https://www.softreetechnology.com/wp-content/uploads/2024/07/Client-7.png",
    "https://www.softreetechnology.com/wp-content/uploads/2024/07/Client-8.png",
    "https://www.softreetechnology.com/wp-content/uploads/2024/07/Client-9.png",
  ];

  return (
    <div className="py-10 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <Swiper
          slidesPerView={6}
          spaceBetween={50}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }} // ✅ works without importing Autoplay
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 },
            640: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 6, spaceBetween: 50 },
          }}
        >
          {clients.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              <img
                src={logo}
                alt={`Client ${index + 1}`}
                className="h-16 md:h-20 object-contain transition-transform duration-300 hover:scale-110"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ClientCarousel;
