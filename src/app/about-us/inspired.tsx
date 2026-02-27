"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function WhyChooseWithImage() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="relative">
            {/* Vertical Accent Line */}
            <div className="absolute left-4 top-[90px] bottom-0 w-px bg-gradient-to-b from-blue-600/40 to-transparent hidden md:block" />

            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Why Choose Softree?
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              What Sets Us Apart — We partner with organizations not just as
              vendors, but as long-term technology collaborators committed to
              innovation, quality, and measurable growth.
            </p>

            <div className="space-y-10">
              {[
                "Engineering-First Mindset",
                "Deep Microsoft Expertise",
                "Flexible Engagement Models",
                "Enterprise Delivery Standards",
                "Leadership Accessibility",
              ].map((item, i) => (
                <div key={i} className="relative flex gap-6 items-start group">
                  {/* Number */}
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 text-sm font-semibold text-blue-500">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div>
                    <p className="text-lg font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - GLOBAL DELIVERY SECTION */}
          <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-3xl p-10 shadow-2xl border border-blue-100">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 tracking-tight">
              Global Delivery Model
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 max-w-2xl mb-8 leading-relaxed">
              Supporting clients across borders with a seamless and scalable
              global delivery approach.
            </p>

            {/* Location Pills */}
            <div className="flex flex-wrap gap-4 mb-10">
              {["United States", "Europe", "Latin America", "India"].map(
                (location, index) => (
                  <span
                    key={index}
                    className="px-5 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold shadow-sm hover:bg-blue-200 transition duration-300"
                  >
                    {location}
                  </span>
                ),
              )}
            </div>

            {/* Map Image */}
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/map.png"
                alt="Global Presence Map"
                width={1200}
                height={700}
                className="rounded-2xl object-cover w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
