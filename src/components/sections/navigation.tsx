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
      bg-gradient-to-r
      from-[#070028]
      via-[#050016]
      to-[#03000D]
      border-b border-white/10
    "
      >
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex justify-center gap-8 py-4 font-semibold text-white">
            {menu.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isMobile={isMobile}
                pathname={pathname}
              />
            ))}
          </ul>
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

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  useEffect(() => {
    if (item.url && pathname.startsWith(item.url)) {
      setOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* SIMPLE LINK */
  if (!item.children && !item.mega) {
    return (
      <li>
        <Link
          href={item.url}
          className={`flex items-center gap-2 px-3 py-2 border-b-2 transition-all
            ${
              isActive(item.url)
                ? "text-green-400 border-green-400"
                : "text-white border-transparent hover:text-green-400 hover:border-green-400"
            }`}
        >
          {item.icon}
          {item.label}
        </Link>
      </li>
    );
  }

  /* DROPDOWN / MEGA */
  return (
    <li
      ref={wrapperRef}
      className="relative"
      onMouseEnter={!isMobile ? () => setOpen(true) : undefined}
      onMouseLeave={!isMobile ? () => setOpen(false) : undefined}
    >
      <button
        onClick={isMobile ? () => setOpen(!open) : undefined}
        className={`flex items-center gap-2 px-3 py-2 border-b-2 transition-all
          ${
            isActive(item.url)
              ? "text-green-400 border-green-400"
              : "text-white border-transparent hover:text-green-400 hover:border-green-400"
          }`}
      >
        {item.icon}
        {item.label}
        <FaChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* NORMAL DROPDOWN */}
      {item.children && !item.mega && open && (
        <ul className="absolute top-full left-0 mt-2 w-64 bg-black border border-gray-800 rounded-xl shadow-xl">
          {item.children.map((child: any, idx: number) => (
            <li key={idx}>
              <Link
                href={child.url}
                onClick={() => isMobile && setOpen(false)}
                className={`block px-4 py-3 transition-all border-b-2
                  ${
                    isActive(child.url)
                      ? "text-green-400 border-green-400"
                      : "text-gray-300 border-transparent hover:text-green-400 hover:border-green-400"
                  }`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* MEGA MENU */}
      {item.mega && open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-black border border-gray-800 rounded-xl shadow-xl p-6 flex gap-6">
          {item.children.map((col: any, idx: number) => (
            <div key={idx} className="flex-1">
              <h4 className="font-bold mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link: any, i: number) => (
                  <li key={i}>
                    <Link
                      href={link.url}
                      onClick={() => isMobile && setOpen(false)}
                      className={`flex gap-2 p-2 rounded-lg transition-all border-b-2
                        ${
                          isActive(link.url)
                            ? "text-green-400 border-green-400"
                            : "text-gray-300 border-transparent hover:text-green-400 hover:border-green-400"
                        }`}
                    >
                      {link.icon}
                      <div>
                        <div>{link.label}</div>
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
