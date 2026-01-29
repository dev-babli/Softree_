"use client";

import Link from "next/link";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const LOGO_URL =
  "https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-gray-400 bg-gradient-to-b from-[#070707] via-[#1f1f1f] to-[#070707] border-t border-white/10">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-white/5 blur-[220px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white/5 blur-[220px]" />
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-20">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img
                src={LOGO_URL}
                alt="Softree"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <div className="flex gap-8 mt-10 text-3xl">
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

          {/* SERVICES */}
          <FooterColumn
            title="Services"
            links={[
              ["Softree for Startups", "/services/softree-for-startups"],
              ["Web App Development", "/services/web-app-development"],
              ["Mobile App Development", "/services/mobile-app-development"],
            ]}
          />

          {/* SHAREPOINT */}
          <FooterColumn
            title="SharePoint & M365"
            links={[
              ["SharePoint Development", "/services/sharepoint"],
              ["SPFx Solutions", "/services/spfx-developments"],
              ["PnP PowerShell", "/services/pnp-powershell"],
              ["Teams Apps", "/services/teams-app-development"],
            ]}
          />

          {/* POWER PLATFORM */}
          <FooterColumn
            title="Power Platform"
            links={[
              ["Power Apps", "/services/power-apps"],
              ["Power Pages", "/services/power-pages"],
              ["Power BI", "/services/power-bi"],
            ]}
          />

          {/* CONTACT */}
          <div>
            <h5 className="text-white text-lg font-semibold mb-6 tracking-wide">
              Contact
            </h5>
            <ul className="space-y-6 text-base">
              <li className="flex items-start gap-4">
                <FaPhoneAlt className="text-white text-xl mt-1 shrink-0" />
                <span>+919876543210</span>
              </li>

              <li className="flex items-start gap-4">
                <FaEnvelope className="text-white text-xl mt-1 shrink-0" />
                <span>info@softree.com</span>
              </li>
            </ul>
          </div>

          {/* PRESENCE */}
          <div className="min-w-[260px]">
            <h5 className="text-white text-lg font-semibold mb-6 tracking-wide">
              Presence
            </h5>

            <ul className="space-y-6 text-base">
              <PresenceItem
                country="USA"
                address={[
                  "166 Geary St. STE 1500 #2439",
                  "San Francisco, CA 94108",
                  "United States",
                ]}
              />

              <PresenceItem
                country="India"
                address={[
                  "Plot No. B, 06-1628, CDA Sec-10",
                  "Odisha 753014",
                  "Bengaluru 560037",
                ]}
              />

              <PresenceItem
                country="Singapore"
                address={[
                  "540 Sims Avenue, #03-05",
                  "Sims Avenue Centre PMB 1021",
                  "Singapore 387603",
                ]}
              />
            </ul>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-6 text-sm text-gray-500">
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

/* ================= HELPERS ================= */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h5 className="text-white text-lg font-semibold mb-6 tracking-wide">
        {title}
      </h5>
      <ul className="space-y-4 text-base">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="hover:text-white transition">
              {label}
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
      className="hover:text-white transition-transform hover:scale-110"
    >
      {children}
    </Link>
  );
}

function PresenceItem({
  country,
  address,
}: {
  country: string;
  address: string[];
}) {
  return (
    <li className="flex items-start gap-4">
      <FaMapMarkerAlt className="text-white/70 text-xl mt-1 shrink-0" />
      <div>
        <span className="block text-white font-medium">{country}</span>
        {address.map((line) => (
          <p key={line} className="text-gray-400 leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </li>
  );
}
