"use client";

import React from "react";

const services = [
  {
    type: "Startup",
    title: "Softree Startup App Development",
    desc: "We empower startups to bring their app ideas to life with cutting-edge technology and scalable solutions.",
    img: "/images/mobile-app/mobile1.jpg", // Replace with Softree image
    style: "bg-white text-gray-900", // White card
  },
  {
    type: "Enhancement",
    title: "Softree Business Enhancement Apps",
    desc: "Boost productivity and streamline operations with custom apps designed to enhance business workflows.",
    img: "/images/mobile-app/mobile2.jpg", // Replace with Softree image
    style: "bg-white/10 backdrop-blur-xl border border-white/20 text-white", // Glassmorphism card
  },
];

export default function TwoCardsSection() {
  return (
    <section className="py-32 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
          Softree <span className="text-blue-400">Custom Mobile</span> App Development
        </h2>
        <p className="text-gray-300 text-lg max-w-4xl mx-auto">
          Softree helps startups and businesses globally by providing innovative, tailor-made mobile app solutions that improve efficiency and drive growth.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-16 md:grid-cols-2">
        {services.map((service, idx) => (
          <div
            key={idx}
            className={`relative rounded-3xl overflow-hidden shadow-2xl p-12 flex flex-col justify-between transition-transform duration-300 hover:scale-105 ${service.style}`}
          >
            <div className="mb-8">
              <span className="uppercase font-bold text-sm text-blue-400">{service.type}</span>
              <h3 className="text-3xl md:text-3xl font-bold mt-4">{service.title}</h3>
              <p className="mt-4 text-lg">{service.desc}</p>
            </div>
            <img
              src={service.img}
              alt={service.title}
              className="w-full object-cover rounded-2xl mt-6"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
