"use client";

import Link from "next/link";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const LOGO_URL =
  "https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png";

export default function CaseFooter() {
  return (
    <footer
      className="
        relative overflow-hidden
        bg-gradient-to-b from-white via-[#f6f6f6] to-white
        border-t border-gray-200 text-gray-700
      "
    >
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-7
            gap-12
            items-start
          "
        >
          {/* LOGO + SOCIAL */}
          <div>
            <Link href="/">
              <div className="inline-flex items-center px-4 py-3 rounded-xl bg-gray-900 shadow-md">
                <img
                  src={LOGO_URL}
                  alt="Softree"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>

            <div className="flex gap-5 mt-6 text-xl text-gray-600">
              <Link href="#" className="hover:text-black transition">
                <FaLinkedin />
              </Link>
              <Link href="#" className="hover:text-black transition">
                <FaTwitter />
              </Link>
              <Link href="#" className="hover:text-black transition">
                <FaFacebook />
              </Link>
            </div>
          </div>

          {/* SERVICES */}
          <FooterColumn
            title="Services"
            links={[
              ["Startups", "/services/softree-for-startups"],
              ["Web Apps", "/services/web-app-development"],
              ["Mobile Apps", "/services/mobile-app-development"],
            ]}
          />

          {/* SHAREPOINT */}
          <FooterColumn
            title="SharePoint & M365"
            links={[
              ["SharePoint", "/services/sharepoint"],
              ["SPFx", "/services/spfx-developments"],
              ["PnP PowerShell", "/services/pnp-powershell"],
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
            <h5 className="text-gray-900 text-base font-semibold mb-5 tracking-wide">
              Contact
            </h5>
            <ul className="space-y-3 text-[15px]">
              <li className="flex items-center gap-2 hover:text-black transition">
                <FaPhoneAlt className="text-gray-700" />
                +919876543210
              </li>
              <li className="flex items-center gap-2 hover:text-black transition">
                <FaEnvelope className="text-gray-700" />
                info@softree.com
              </li>
            </ul>
          </div>

          {/* PRESENCE */}
          <div className="min-w-[260px]">
            <h5 className="text-gray-900 text-base font-semibold mb-5 tracking-wide">
              Presence
            </h5>

            <ul className="space-y-5">
              {/* USA */}
              <li className="group flex items-start gap-3 p-2 rounded-lg transition-all hover:bg-gray-100">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-gray-700 group-hover:text-black transition" />
                <div className="group-hover:translate-x-0.5 transition-transform">
                  <span className="block font-medium text-base text-gray-900">
                    USA
                  </span>
                  <p className="text-[15px] text-gray-700 leading-relaxed">
                    166 Geary St. STE 1500 #2439,<br />
                    San Francisco, CA 94108,<br />
                    United States
                  </p>
                </div>
              </li>

              {/* India */}
              <li className="group flex items-start gap-3 p-2 rounded-lg transition-all hover:bg-gray-100">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-gray-700 group-hover:text-black transition" />
                <div className="group-hover:translate-x-0.5 transition-transform">
                  <span className="block font-medium text-base text-gray-900">
                    India
                  </span>
                  <p className="text-[15px] text-gray-700 leading-relaxed">
                    Plot No. B, 06-1628, CDA Sec-10,<br />
                    Odisha 753014, India
                  </p>
                  <p className="text-[15px] text-gray-700 leading-relaxed mt-1">
                    Hatha Coco Nest, Flat No. B308,<br />
                    Kempapura, Bengaluru 560037, India
                  </p>
                </div>
              </li>

              {/* Singapore */}
              <li className="group flex items-start gap-3 p-2 rounded-lg transition-all hover:bg-gray-100">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-gray-700 group-hover:text-black transition" />
                <div className="group-hover:translate-x-0.5 transition-transform">
                  <span className="block font-medium text-base text-gray-900">
                    Singapore
                  </span>
                  <p className="text-[15px] text-gray-700 leading-relaxed">
                    540 Sims Avenue, #03-05,<br />
                    Sims Avenue Centre PMB 1021,<br />
                    Singapore 387603
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-600">
          <span>© {new Date().getFullYear()} Softree. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-black">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-black">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===== HELPER ===== */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h5 className="text-gray-900 text-base font-semibold mb-5 tracking-wide">
        {title}
      </h5>
      <ul className="space-y-3 text-[15px]">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-gray-600 hover:text-black transition"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
