"use client";

import Image from "next/image";
import Link from "next/link";

const SharePointMigration = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl w-[90%] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ================================================= */}
        {/* LEFT CONTENT – GLASS CARD */}
        {/* ================================================= */}
        <div
          className="
            p-10 lg:p-12
            rounded-3xl
            bg-white/5 backdrop-blur-xl
            border border-white/10

            shadow-[0_30px_90px_rgba(0,0,0,0.6)]
            hover:shadow-[0_40px_120px_rgba(59,130,246,0.25)]
            hover:-translate-y-2

            transition-all duration-500
          "
        >
          {/* Badge */}
          <span className="inline-block mb-5 px-4 py-1.5 text-xs tracking-widest uppercase text-blue-800 bg-blue-500/10 border border-blue-400/20 rounded-full">
            SharePoint Expertise
          </span>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-semibold leading-tight text-black">
            Seamless{" "}
            <span className="bg-gradient-to-r from-blue-700 to-indigo-900 bg-clip-text text-transparent">
              SharePoint Migration
            </span>{" "}
            Solutions
          </h2>

          {/* Paragraphs */}
          <p className="mt-6 text-gray-900 leading-relaxed">
            Accelerate your digital workplace transformation with our expert
            SharePoint migration services. We leverage advanced automation,
            proven frameworks, and enterprise-grade security practices to ensure
            zero data loss, compliance, and minimal downtime.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            From legacy upgrades to complex tenant-to-tenant migrations, our
            specialists help organizations unlock modern collaboration and
            scalable business processes.
          </p>
        </div>

        {/* ================================================= */}
        {/* RIGHT – FLOATING IMAGE CARD */}
        {/* ================================================= */}
        <div className="relative">
          {/* glow behind card */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-2xl rounded-3xl" />

          <div
            className="
              relative rounded-3xl overflow-hidden
              bg-white/5 backdrop-blur-xl
              border border-white/10

              shadow-[0_30px_100px_rgba(0,0,0,0.65)]
              hover:-translate-y-3
              hover:shadow-[0_45px_140px_rgba(59,130,246,0.35)]

              transition-all duration-500 group
            "
          >
            <div className="relative w-full h-[380px] lg:h-[460px]">
              <Image
                src="/images/sharepoint/sp.png"
                alt="Enterprise SharePoint Migration Services"
                fill
                priority
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SharePointMigration;
