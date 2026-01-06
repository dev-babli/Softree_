"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function SoftreeProcessSlider() {
  const steps = [
    {
      number: "01",
      title: "Ideation",
      desc: "Collaborate with Softree experts to brainstorm ideas and define your project vision for a tailored software solution."
    },
    {
      number: "02",
      title: "Planning",
      desc: "Softree team outlines project scope, sets milestones, and prepares a roadmap to ensure smooth execution and delivery."
    },
    {
      number: "03",
      title: "Design",
      desc: "Craft interactive UI/UX prototypes, wireframes, and design systems to give your solution a unique and user-friendly experience."
    },
    {
      number: "04",
      title: "Development",
      desc: "Our developers implement scalable, secure, and efficient code using modern technologies to build your product."
    },
    {
      number: "05",
      title: "Quality Assurance",
      desc: "Comprehensive testing—manual and automated—to ensure your software is bug-free and performs seamlessly."
    },
    {
      number: "06",
      title: "Deployment",
      desc: "Softree assists with production launch, deployment strategies, and ensures your solution reaches your audience effectively."
    },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
          Softree Custom Software Development Lifecycle
        </h2>
        <span className="inline-block w-32 h-1 bg-blue-600 rounded mb-6"></span>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-16">
          Softree delivers innovative software solutions tailored to your business needs.
        </p>

        <Swiper
          modules={[Navigation]}
          spaceBetween={40}
          slidesPerView={3}
          centeredSlides={true}
          navigation
          breakpoints={{
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
        >
          {steps.map((step, index) => (
            <SwiperSlide key={step.number}>
              <div
                className={`relative flex flex-col rounded-3xl p-10 h-[28rem] transition-transform duration-500 shadow-2xl hover:-translate-y-3
                  ${
                    index % 2 === 1
                      ? "bg-gradient-to-r from-blue-800/40 via-blue-600/20 to-purple-800/40 backdrop-blur-xl text-white border border-white/20 shadow-lg hover:shadow-blue-500/50"
                      : "bg-white text-black shadow-md"
                  }
                `}
              >
                <span
                  className={`text-4xl font-bold mb-4 ${
                    index % 2 === 1 ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  {step.number}
                </span>

                <h3 className="text-3xl md:text-4xl font-semibold mb-4">{step.title}</h3>

                <span
                  className={`block w-20 h-1 rounded mb-4 ${
                    index % 2 === 1 ? "bg-blue-300" : "bg-blue-600"
                  }`}
                ></span>

                <p className={index % 2 === 1 ? "text-gray-200 text-lg" : "text-gray-700 text-lg"}>
                  {step.desc}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
