"use client";

import React from "react";
import { WHATSAPP_NUMBER } from "@/lib/contactConfig";

export default function WhatsAppFab() {
  if (!WHATSAPP_NUMBER) return null;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in a free 30-min consultation.")}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
      aria-label="WhatsApp"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
        <path d="M20.52 3.48C18.2 1.16 15.07 0 11.83 0 6.79 0 2.34 3.56 1.34 8.32c-.42 1.94-.21 4.24.8 6.64L0 24l8.78-2.28c2.29.63 3.96.61 5.14.31 4.25-.99 7.09-4.85 7.09-9.98 0-3.22-1.16-6.36-3.23-8.21z" fill="#fff" />
      </svg>
    </a>
  );
}
