"use client";

import { CertificationCard, certifications } from "@/components/sections/certification";

export default function Certifications() {
  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20 px-4">
          <h2 className="text-3xl lg:text-5xl font-semibold text-gray-900 tracking-tight">
            Certifications &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Recognitions
            </span>
          </h2>

          <p className="mt-5 text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Trusted standards that reinforce our focus on security, compliance,
            and operational excellence.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10">
          {certifications.map((item, index) => (
            <CertificationCard key={index} item={item} dark={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
