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
    <footer className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 border-t border-gray-200 text-gray-600">

      {/* Soft background glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full" />

      {/* ================= MAIN FOOTER ================= */}
      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-16">

          {/* ================= BRAND ================= */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img
                src={LOGO_URL}
                alt="Softree"
                className="h-10 w-auto object-contain invert"
              />
            </Link>

            <p className="text-gray-500 text-sm max-w-xs">
              Building scalable, secure and modern digital experiences for
              startups and enterprises worldwide.
            </p>

            <div className="flex gap-6 mt-8 text-xl text-gray-500">
              <SocialLink href="https://www.linkedin.com/company/softree-technology-pvt-ltd/"><FaLinkedin /></SocialLink>
              <SocialLink href="https://twitter.com/"><FaTwitter /></SocialLink>
              <SocialLink href="https://www.facebook.com/softreetechnology"><FaFacebook /></SocialLink>
              <SocialLink href="https://www.instagram.com/softreetechnology/"><FaInstagram /></SocialLink>
              <SocialLink href="https://www.youtube.com/@softreetechnologypvt.ltd.9452"><FaYoutube /></SocialLink>
            </div>
          </div>

          {/* ================= SERVICES ================= */}
          <FooterColumn
            title="Services"
            links={[
              ["Softree for Startups", "/services/softree-for-startups"],
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
              ["PnP PowerShell", "/services/pnp-powershell"],
              ["Teams Apps", "/services/teams-app-development"],
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

          {/* ================= CONTACT ================= */}
          <div>
            <h5 className="text-gray-900 text-base font-semibold mb-5">
              Contact
            </h5>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-blue-600 mt-1 shrink-0" />
                <span>+919876543210</span>
              </li>

              <li className="flex items-start gap-3">
                <FaEnvelope className="text-blue-600 mt-1 shrink-0" />
                <span>info@softree.com</span>
              </li>
            </ul>
          </div>

          {/* ================= PRESENCE ================= */}
          <div>
            <h5 className="text-gray-900 text-base font-semibold mb-5">
              Presence
            </h5>

            <ul className="space-y-5 text-sm">
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
                  "Singapore 387603",
                ]}
              />
            </ul>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} Softree. All rights reserved.</span>

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
    <div>
      <h5 className="text-gray-900 text-base font-semibold mb-5">{title}</h5>

      <ul className="space-y-3 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="hover:text-blue-600 transition">
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
      className="hover:text-blue-600 transition-transform hover:scale-110"
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
    <li className="flex items-start gap-3">
      <FaMapMarkerAlt className="text-blue-600 mt-1 shrink-0" />
      <div>
        <span className="block font-medium text-gray-900">{country}</span>
        {address.map((line) => (
          <p key={line} className="text-gray-500">
            {line}
          </p>
        ))}
      </div>
    </li>
  );
}
