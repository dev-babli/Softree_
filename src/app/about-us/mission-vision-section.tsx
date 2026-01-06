"use client";
import React from "react";

const Card = ({
  title,
  image,
  description,
}: {
  title: string;
  image: string;
  description: string;
}) => {
  return (
    <div className="group relative w-full md:w-1/2 cursor-pointer overflow-hidden rounded-3xl shadow-xl border border-white/20 transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
      {/* Image */}
      <div className="relative w-full h-64 overflow-hidden rounded-t-3xl transition-transform duration-500 group-hover:scale-105">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-3xl pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-3 mb-2">
          {/* Optional icon */}
          {title === "Mission" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}

          <h3 className="text-2xl md:text-3xl font-bold text-white">{title}</h3>
        </div>

        {/* Description hidden by default, expands on hover */}
        <p className="text-gray-400 text-sm md:text-base max-h-0 overflow-hidden group-hover:max-h-72 transition-all duration-500">
          {description}
        </p>
      </div>
    </div>
  );
};

const MissionVisionSection = () => {
  const cards = [
    {
      title: "Mission",
      image: "/images/mission.jpg",
      description:
        "Our mission is to help businesses grow sustainably by combining innovation with a conscience. We focus on solutions that benefit both the bottom line and our customers, creating long-term value for all stakeholders. By leveraging cutting-edge technology and strategic insights, we empower organizations to overcome challenges, optimize operations, and unlock new opportunities.",
    },
    {
      title: "Vision",
      image: "/images/vision.jpg",
      description:
        "Our vision is to create a world where technology empowers businesses and communities alike. Through education, tools, and a supportive ecosystem, we aim to make growth ethical, inclusive, and impactful. We envision a future where innovation drives social and environmental responsibility, bridging gaps and fostering collaboration across industries.",
    },
  ];

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Our Mission & Vision
          </h2>
          <p className="max-w-4xl mx-auto text-lg text-gray-300">
            Driving growth with purpose and empowering communities through
            innovative technology.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-6">
          {cards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
