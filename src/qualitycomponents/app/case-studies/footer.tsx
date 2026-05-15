"use client";

import Link from "next/link";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const LOGO_URL =
  "https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600">
      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* ================= BRAND ================= */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img
                src={LOGO_URL}
                alt="Softree"
                className="h-10 w-auto object-contain invert"
              />
            </Link>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Building scalable, secure and modern digital experiences for
              startups and enterprises worldwide.
            </p>

            {/* Social */}
            <div className="flex gap-5 mt-8 text-xl text-gray-500">
              <SocialLink href="https://www.linkedin.com/company/softree-technology-pvt-ltd/">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href="https://twitter.com/">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="https://www.facebook.com/softreetechnology">
                <FaFacebook />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/softreetechnology/">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="https://www.youtube.com/@softreetechnologypvt.ltd.9452">
                <FaYoutube />
              </SocialLink>
            </div>
          </div>

          {/* ================= SERVICES ================= */}
          <FooterColumn
            title="Digital Engineering"
            links={[
              ["Web App Development", "/services/web-app-development"],
              ["Mobile App Development", "/services/mobile-app-development"],
            ]}
          />

          {/* ================= SHAREPOINT ================= */}
          <FooterColumn
            title="SharePoint & M365"
            links={[
              ["SharePoint Development", "/services/sharepoint"],
              ["SPFx Solutions", "/services/spfx-developments"],
            ]}
          />

          {/* ================= POWER PLATFORM ================= */}
          <FooterColumn
            title="Power Platform"
            links={[
              ["Power Apps", "/services/power-apps"],
              ["Power Pages", "/services/power-pages"],
              ["Power BI", "/services/power-bi"],
            ]}
          />

          {/* ================= AI SERVICES ================= */}
          <FooterColumn
            title="AI Services"
            links={[
              ["Agentic AI Solutions", "/services/agentic-ai"],
              ["Generative AI", "/services/generative-ai"],
            ]}
          />

          {/* ================= CONTACT ================= */}
          <div>
            <h5 className="text-gray-900 text-xl font-bold mb-6">Contact</h5>

            <ul className="space-y-5 text-base">
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-blue-600 mt-1 shrink-0 text-lg" />
                <a
                  href="tel:+917008699927"
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  +91 70086 99927
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FaEnvelope className="text-blue-600 mt-1 shrink-0 text-lg" />
                <a
                  href="mailto:sales@softreetechnology.com"
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  sales@softreetechnology.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">
          <span>
            © {new Date().getFullYear()} Softree. All rights reserved.
          </span>

          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================= HELPERS ================= */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div className="min-w-[160px]">
      {/* TITLE */}
      <h5
        className="
        text-gray-900 text-lg font-semibold
        mb-7 tracking-tight
      "
      >
        {title}
      </h5>

      {/* LINKS */}
      <ul className="space-y-4">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="
                group relative inline-flex items-center
                text-base text-gray-500
                transition-all duration-300
                hover:text-blue-600
              "
            >
              {/* text */}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {label}
              </span>

              {/* animated underline */}
              <span
                className="
                  absolute left-0 -bottom-1
                  h-[2px] w-0
                  bg-blue-600
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group inline-flex items-center justify-center
        w-10 h-10 rounded-full
        bg-gray-800 border border-gray-600
        text-white
        hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600
        hover:border-transparent
        hover:-translate-y-1 hover:shadow-lg
        transition-all duration-300
      "
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        {children}
      </span>
    </Link>
  );
}
