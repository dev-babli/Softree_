"use client";

import {
  Smartphone,
  Palette,
  Code,
  Layers,
  Watch,
  Gamepad2,
  ShoppingCart,
  CloudUpload,
  Wrench,
  Rocket,
  Users,
  Globe,
  Cpu,
  Box,
  Activity,
} from "lucide-react";

type Service = {
  title: string;
  desc: string;
  icon: any;
};

const services: Service[] = [
  {
    title: "Consultation & Strategy",
    desc: "We help define your app vision and strategy to ensure maximum impact for Softree’s users.",
    icon: Smartphone,
  },
  {
    title: "UI/UX Design",
    desc: "Intuitive and engaging designs tailored to Softree’s target audience for superior user experience.",
    icon: Palette,
  },
  {
    title: "Custom App Development",
    desc: "Bespoke mobile applications built for performance, scalability, and seamless user interactions.",
    icon: Code,
  },
  {
    title: "Native App Development",
    desc: "High-quality native apps for iOS and Android to leverage platform-specific features.",
    icon: Layers,
  },
  {
    title: "Cross-Platform Solutions",
    desc: "Write once, run everywhere. Efficient apps with consistent user experience across devices.",
    icon: Globe,
  },
  {
    title: "IoT App Integration",
    desc: "Smart IoT-enabled applications integrating real-time data and automation for modern workflows.",
    icon: Cpu,
  },
  {
    title: "Wearable Apps",
    desc: "Apps for smartwatches, fitness trackers, and wearable devices to extend Softree’s ecosystem.",
    icon: Watch,
  },
  {
    title: "AR/VR Experiences",
    desc: "Immersive augmented and virtual reality experiences tailored to Softree’s projects.",
    icon: Box,
  },
  {
    title: "Mobile Game Development",
    desc: "Engaging gaming applications that entertain and captivate users across platforms.",
    icon: Gamepad2,
  },
  {
    title: "E-Commerce Apps",
    desc: "Robust e-commerce solutions to make Softree’s products accessible to mobile users worldwide.",
    icon: ShoppingCart,
  },
  {
    title: "App Migration & Upgrades",
    desc: "Seamless migration or upgrades to ensure smooth performance and modern tech integration.",
    icon: CloudUpload,
  },
  {
    title: "Web & PWA Development",
    desc: "Progressive web apps for fast, reliable, and engaging experiences across browsers.",
    icon: Globe,
  },
  {
    title: "Progressive App Solutions",
    desc: "Fast-loading, offline-capable applications that enhance Softree’s user engagement.",
    icon: Rocket,
  },
  {
    title: "App Deployment",
    desc: "End-to-end deployment to app stores with optimized submission and compliance process.",
    icon: Activity,
  },
  {
    title: "Support & Maintenance",
    desc: "Continuous monitoring, bug fixes, and updates to keep Softree’s apps smooth and secure.",
    icon: Wrench,
  },
  {
    title: "App Modernization",
    desc: "Revamp existing applications with advanced features and improved user interface.",
    icon: Rocket,
  },
  {
    title: "On-Demand Solutions",
    desc: "Rapid delivery apps for services such as delivery, bookings, or instant communication.",
    icon: Smartphone,
  },
  {
    title: "Dedicated Developers",
    desc: "Hire Softree’s expert developers to build, scale, and optimize your mobile solutions.",
    icon: Users,
  },
];

const ServiceCard = ({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon: any;
}) => (
  <div className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-300 hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]">
    {/* ICON */}
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-blue-500/20 text-sky-400 group-hover:from-sky-400 group-hover:to-blue-500 group-hover:text-black transition">
      <Icon size={22} />
    </div>

    {/* TITLE */}
    <h3 className="text-lg font-semibold text-white group-hover:text-sky-400 transition">
      {title}
    </h3>

    {/* DESCRIPTION */}
    <p className="mt-2 text-sm text-gray-400 leading-relaxed">{desc}</p>

    {/* GRADIENT LINE */}
    <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-sky-500/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
  </div>
);

export default function SoftreeServices() {
  return (
    <section className="relative bg-black py-28">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#1c1c1c] p-16 rounded-2xl">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-start">
            {/* LEFT STICKY COLUMN WITH GLOW */}
            <div
              className="sticky top-28 self-start space-y-6 
                    bg-[#111111] bg-opacity-60 backdrop-blur-md 
                    rounded-2xl p-6 
                    shadow-[0_0_20px_rgb(56,189,248)] 
                    hover:shadow-[0_0_40px_rgb(56,189,248)] 
                    transition-shadow duration-500"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Core Softree{" "}
                <span className="relative inline-block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                  App Development
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-sky-400 to-blue-500" />
                </span>{" "}
                Services
              </h2>

              {/* CODE TAGS */}
              <div className="flex flex-wrap gap-4 mt-2">
                {["Code", "Mobile", "App", "Development"].map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-sm font-mono px-4 py-1 rounded-full 
                       bg-[#1a1a1a] text-white 
                       shadow-[0_0_10px_rgb(56,189,248)] 
                       hover:shadow-[0_0_20px_rgb(56,189,248)] 
                       transition-shadow duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-gray-200 text-lg max-w-md">
                Softree offers end-to-end mobile app development solutions
                tailored to performance, scalability, and a superior user
                experience.
              </p>
            </div>

            {/* RIGHT SERVICES GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
