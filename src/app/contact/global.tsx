"use client";
import { MapPin, Phone } from "lucide-react";


const locations = [
  {
    title: "INDIA (HQ)",
    map: "https://www.google.com/maps?q=Ahmedabad%20Gujarat&output=embed",
    address: (
      <>
        Softree Technology Pvt. Ltd.
        <br />
        Ahmedabad, Gujarat,
        <br />
        India
      </>
    ),
    phone: "+91 8000-161-161",
    highlight: true,
  },
  {
    title: "USA Office",
    map: "https://www.google.com/maps?q=New%20York%20United%20States&output=embed",
    address: (
      <>
        Softree Technologies USA
        <br />
        New York, NY,
        <br />
        United States
      </>
    ),
    phone: "+1 (309) 791-4105",
  },
  {
    title: "UK Office",
    map: "https://www.google.com/maps?q=London%20United%20Kingdom&output=embed",
    address: (
      <>
        Softree Technologies UK
        <br />
        London,
        <br />
        United Kingdom
      </>
    ),
    phone: "+44 20 7946 0958",
  },
  {
    title: "UAE Office",
    map: "https://www.google.com/maps?q=Dubai%20United%20Arab%20Emirates&output=embed",
    address: (
      <>
        Softree Technologies Middle East
        <br />
        Dubai,
        <br />
        United Arab Emirates
      </>
    ),
    phone: "+971 4 123 4567",
  },
];

export default function GlobalLocations() {
  return (
    <section className="bg-white text-gray-900">
      {/* subtle background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-50 via-white to-blue-50" />

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-bold">Global Locations</h2>

        <p className="max-w-3xl text-gray-600 mb-10">
          Softree operates across key global markets to deliver scalable,
          secure, and future-ready digital solutions. Our distributed presence
          enables us to collaborate closely with clients, ensure faster delivery,
          and provide localized support worldwide.
        </p>

{/* ================= LOCATIONS GRID ================= */}
<div className="grid lg:grid-cols-2 gap-8">
  {locations.map((loc, i) => (
    <div
      key={i}
      className="
        group
        grid md:grid-cols-2
        rounded-3xl overflow-hidden
        border border-white/10
        bg-gradient-to-br from-gray-900 to-gray-800
        shadow-lg
        hover:shadow-2xl hover:-translate-y-1
        transition-all duration-300
      "
    >
      {/* ================= MAP ================= */}
      <div className="relative h-[320px] md:h-[340px]">
        <iframe
          className="w-full h-full grayscale group-hover:grayscale-0 transition duration-500"
          src={loc.map}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

    {/* ================= CONTENT ================= */}
<div
  className="
    relative
    p-8
    flex flex-col justify-between
    bg-gradient-to-br from-gray-800/90 to-gray-900
    backdrop-blur
    text-white
  "
>
  {/* Top info */}
  <div className="space-y-5">

    {/* Title */}
    <h3 className="text-lg font-semibold flex items-center gap-2">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20">
        <MapPin className="w-4 h-4 text-cyan-400" />
      </span>
      {loc.title}
    </h3>

    {/* Address */}
    <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-cyan-500/30 pl-4">
      {loc.address}
    </p>
  </div>


  {/* Bottom section */}
  <div className="mt-4 space-y-4">

    {/* Phone */}
    <div className="flex items-center gap-3 text-gray-200">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-700">
        <Phone className="w-4 h-4 text-cyan-400" />
      </span>
      <span className="font-medium">{loc.phone}</span>
    </div>

    {/* CTA */}
    <a
      href={loc.map}
      target="_blank"
      className="
        inline-flex items-center justify-center gap-2
        text-sm font-medium
        bg-cyan-500/10
        hover:bg-cyan-500/20
        text-cyan-400
        px-4 py-2 rounded-lg
        transition
        w-fit
      "
    >
      <MapPin className="w-4 h-4" />
      Get Directions
    </a>
  </div>
</div>

    </div>
  ))}
</div>

      </div>
    </section>
  );
}
