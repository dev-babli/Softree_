"use client";

import React from "react";
import Link from "next/link";
import { CALENDLY_URL, ZOHO_BOOKING_URL, WHATSAPP_NUMBER, ESTIMATE_URL } from "@/lib/contactConfig";

const CTAGroup: React.FC<{ className?: string }> = ({ className }) => {
  const bookingUrl = CALENDLY_URL || ZOHO_BOOKING_URL || '/contact#booking';
  const whatsappUrl = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in a free 30-min consultation.")}` : '/contact#whatsapp';

  return (
    <div className={`flex items-center gap-3 ${className || ""}`}>
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-[#1D4ED8] hover:bg-[#1e40af] text-white rounded-md font-medium transition transform hover:scale-105"
      >
        Book a Free 30-Min Consultation
      </a>

      <Link
        href={ESTIMATE_URL}
        className="px-6 py-3 bg-white/10 hover:bg-white hover:text-[#051340] text-white rounded-md font-medium transition"
      >
        Get Project Estimate
      </Link>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium"
      >
        WhatsApp
      </a>
    </div>
  );
};

export default CTAGroup;
