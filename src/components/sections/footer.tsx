"use client";

import Link from "next/link";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
const LOGO_URL =
  "https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png";

export default function Footer() {
  return (
    <footer
      className="relative text-gray-400 overflow-hidden
      bg-gradient-to-b from-[#070707] via-[#1f1f1f] to-[#070707]
      border-t border-white/10"
    >
      {/* Subtle ambient accents */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-white/5 blur-[220px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white/5 blur-[220px]" />
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* LOGO */}
            <Link href="/" className="inline-block mb-6">
              <img
                src={LOGO_URL}
                alt="Softree"
                className="h-10 w-auto object-contain"
                loading="lazy"
              />
            </Link>

            <p className="text-base leading-relaxed max-w-md">
              Softree is a Microsoft-focused technology partner delivering
              scalable SharePoint, Power Platform, and cloud-based solutions
              that help organizations automate workflows and drive productivity.
            </p>

            {/* Social Icons */}
            <div className="flex gap-8 mt-10 text-3xl">
              <Link
                href="#"
                className="hover:text-white transition-transform hover:scale-110"
              >
                <FaLinkedin />
              </Link>
              <Link
                href="#"
                className="hover:text-white transition-transform hover:scale-110"
              >
                <FaTwitter />
              </Link>
              <Link
                href="#"
                className="hover:text-white transition-transform hover:scale-110"
              >
                <FaFacebook />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-6 tracking-wide">
              Services
            </h5>
            <ul className="space-y-4 text-base">
              <li>
                <Link
                  href="/services/softree-for-startups"
                  className="hover:text-white"
                >
                  Softree for Startups
                </Link>
              </li>
              <li>
                <Link
                  href="/services/web-app-development"
                  className="hover:text-white"
                >
                  Web App Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mobile-app-development"
                  className="hover:text-white"
                >
                  Mobile App Development
                </Link>
              </li>
            </ul>
          </div>

          {/* SharePoint */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-6 tracking-wide">
              SharePoint & M365
            </h5>
            <ul className="space-y-4 text-base">
              <li>
                <Link href="/services/sharepoint" className="hover:text-white">
                  SharePoint Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/spfx-developments"
                  className="hover:text-white"
                >
                  SPFx Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/services/pnp-powershell"
                  className="hover:text-white"
                >
                  PnP PowerShell
                </Link>
              </li>
              <li>
                <Link
                  href="/services/teams-app-development"
                  className="hover:text-white"
                >
                  Teams Apps
                </Link>
              </li>
            </ul>
          </div>

          {/* Power Platform */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-6 tracking-wide">
              Power Platform
            </h5>
            <ul className="space-y-4 text-base">
              <li>
                <Link href="/services/power-apps" className="hover:text-white">
                  Power Apps
                </Link>
              </li>
              <li>
                <Link href="/services/power-pages" className="hover:text-white">
                  Power Pages
                </Link>
              </li>
              <li>
                <Link href="/services/power-bi" className="hover:text-white">
                  Power BI
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-6 tracking-wide">
              Contact
            </h5>

            <ul className="space-y-6 text-base">
              <li className="flex items-start gap-5">
                <FaPhoneAlt className="text-white/80 text-2xl mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  +91&nbsp;98765&nbsp;43210
                </span>
              </li>

              <li className="flex items-start gap-5">
                <FaEnvelope className="text-white/80 text-2xl mt-0.5 shrink-0" />
                <span className="leading-relaxed">info@softree.com</span>
              </li>

              <li className="flex items-start gap-5">
                <FaMapMarkerAlt className="text-white/80 text-2xl mt-0.5 shrink-0" />
                <span className="leading-relaxed">India · USA</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="border-t border-white/10">
        <div
          className="max-w-7xl mx-auto px-6 py-10
          flex flex-col md:flex-row justify-between gap-6
          text-base text-gray-500"
        >
          <span>
            © {new Date().getFullYear()} Softree. All rights reserved.
          </span>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
