"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaUsers,
  FaMobileAlt,
  FaLaptopCode,
  FaShareAlt,
  FaWpforms,
  FaMicrosoft,
  FaDatabase,
  FaChartLine,
  FaBlog,
  FaPhone,
  FaChevronDown,
} from "react-icons/fa";
const LOGO_URL =
  "https://www.softreetechnology.com/wp-content/uploads/elementor/thumbs/white-logo-soft-qt16xqrm9tl34ewl9f9uhep3zaj8m5zkpgualw8uf4.png";

/* =========================
   MENU CONFIG
========================= */
const menu = [
  { label: "Home", url: "/", icon: <FaHome /> },
  { label: "About", url: "/about-us", icon: <FaInfoCircle /> },

  {
    label: "Services",
    url: "/services",
    mega: true,
    icon: <FaCogs />,
    children: [
      {
        title: "App Development",
        links: [
          {
            label: "Softree for Startups",
            url: "/services/softree-for-startups",
            icon: <FaUsers />,
            description: "Custom app solutions tailored for startup growth",
          },
          {
            label: "Mobile App Development",
            url: "/services/mobile-app-development",
            icon: <FaMobileAlt />,
            description: "Native and cross-platform apps for iOS & Android",
          },
          {
            label: "Web App Development",
            url: "/services/web-app-development",
            icon: <FaLaptopCode />,
            description: "Scalable web applications with modern tech stack",
          },
        ],
      },
      {
        title: "SharePoint Services",
        links: [
          {
            label: "SharePoint Development",
            url: "/services/sharepoint",
            icon: <FaShareAlt />,
            description:
              "Enterprise SharePoint solutions for intranet & collaboration",
          },
          {
            label: "SPFx Developments",
            url: "/services/spfx-developments",
            icon: <FaWpforms />,
            description: "Custom SPFx web parts & extensions",
          },
          {
            label: "PnP PowerShell",
            url: "/services/pnp-powershell",
            icon: <FaDatabase />,
            description: "Automate SharePoint tasks with PnP PowerShell",
          },
          {
            label: "Teams App Development",
            url: "/services/teams-app-development",
            icon: <FaMicrosoft />,
            description:
              "Integrate your business workflow with Microsoft Teams",
          },
        ],
      },
      {
        title: "Power Platform",
        links: [
          {
            label: "Microsoft PowerApps",
            url: "/services/power-apps",
            icon: <FaMicrosoft />,
            description: "Build low-code apps to streamline business processes",
          },
          {
            label: "Microsoft Power Pages",
            url: "/services/power-pages",
            icon: <FaMicrosoft />,
            description: "Create secure, modern web portals with Power Pages",
          },
          {
            label: "Microsoft Power BI",
            url: "/services/power-bi",
            icon: <FaChartLine />,
            description:
              "Interactive dashboards & analytics for data-driven decisions",
          },
        ],
      },
    ],
  },

  {
    label: "Case Studies",
    url: "/case-studies",
    icon: <FaUsers />,
    children: [
      {
        label: "Mobile App Case Studies",
        url: "/case-studies/mobile-app-case-studies",
      },
      {
        label: "PowerApps Case Studies",
        url: "/case-studies/powerapps-case-studies",
      },
    ],
  },

  { label: "Blog", url: "/blog/all-posts", icon: <FaBlog /> },
  { label: "Contact", url: "/contact", icon: <FaPhone /> },
];

/* =========================
   NAVIGATION
========================= */
export default function Navigation() {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div
        className="
    w-full
    backdrop-blur-xl
    bg-gradient-to-r
    from-[#070028]/80
    via-[#050016]/80
    to-[#03000D]/80
    border-b border-white/10
  "
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src={LOGO_URL}
                alt="Softree"
                className="h-9 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* MENU */}
            <ul className="hidden md:flex items-center gap-10 font-medium text-white">
              {menu.map((item, index) => (
                <MenuItem
                  key={index}
                  item={item}
                  isMobile={false}
                  pathname={pathname}
                />
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/contact"
              className="
            hidden md:inline-flex
            items-center gap-2
            px-5 py-2.5
            rounded-full
            bg-gradient-to-r from-green-400 to-emerald-500
            text-black font-semibold
            shadow-lg shadow-green-500/30
            transition-all
            hover:scale-105
            hover:shadow-green-500/50
          "
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* =========================
   MENU ITEM
========================= */
function MenuItem({ item, isMobile, pathname }: any) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLLIElement>(null);

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <li
      ref={wrapperRef}
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* NAV LINK */}
      <Link
        href={item.url}
        className={`
          relative flex items-center gap-2 py-2
          transition-all duration-300
          ${isActive(item.url) ? "text-green-400" : "text-white"}
        `}
      >
        <span className="group-hover:text-green-400 transition">
          {item.icon}
        </span>

        {item.label}

        {item.children && (
          <FaChevronDown className="text-xs opacity-70 group-hover:rotate-180 transition" />
        )}

        {/* Animated underline */}
        <span
          className={`
          absolute -bottom-1 left-0 h-[2px] w-full
          bg-gradient-to-r from-green-400 to-emerald-500
          scale-x-0 origin-left
          transition-transform duration-300
          ${isActive(item.url) ? "scale-x-100" : "group-hover:scale-x-100"}
        `}
        />
      </Link>

      {/* MEGA MENU */}
      {item.mega && open && (
        <div
          className="
          absolute top-full left-1/2 -translate-x-1/2
          mt-6 w-[900px]
          rounded-2xl
          bg-[#050016]/95 backdrop-blur-xl
          border border-white/10
          shadow-2xl
          p-8
          flex gap-10
          animate-[fadeIn_0.2s_ease-out]
        "
        >
          {item.children.map((col: any, idx: number) => (
            <div key={idx} className="flex-1">
              <h4 className="text-green-400 font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link: any, i: number) => (
                  <li key={i}>
                    <Link
                      href={link.url}
                      className="
    flex gap-3 p-3 rounded-xl
    border border-transparent
    transition-all duration-300
    hover:border-white/15
    hover:backdrop-blur-sm
  "
                    >
                      <span className="text-green-400 mt-1">{link.icon}</span>
                      <div>
                        <div className="font-medium text-white">
                          {link.label}
                        </div>
                        <p className="text-xs text-gray-400">
                          {link.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}
