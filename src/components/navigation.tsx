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
            url: "/softree-for-startups",
            icon: <FaUsers />,
            description: "Custom app solutions tailored for startup growth",
          },
          {
            label: "Mobile App Development",
            url: "/mobile-app-development",
            icon: <FaMobileAlt />,
            description: "Native and cross-platform apps for iOS & Android",
          },
          {
            label: "Web App Development",
            url: "/web-app-development",
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
            url: "/sharepoint",
            icon: <FaShareAlt />,
            description:
              "Enterprise SharePoint solutions for intranet & collaboration",
          },
          {
            label: "SPFx Developments",
            url: "/spfx-developments",
            icon: <FaWpforms />,
            description: "Custom SPFx web parts & extensions",
          },
          {
            label: "PnP PowerShell",
            url: "/pnp-powershell",
            icon: <FaDatabase />,
            description: "Automate SharePoint tasks with PnP PowerShell",
          },
          {
            label: "Teams App Development",
            url: "/teams-app-development",
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
            url: "/power-apps",
            icon: <FaMicrosoft />,
            description: "Build low-code apps to streamline business processes",
          },
          {
            label: "Microsoft Power Pages",
            url: "/power-pages",
            icon: <FaMicrosoft />,
            description: "Create secure, modern web portals with Power Pages",
          },
          {
            label: "Microsoft Power BI",
            url: "/power-bi",
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
    url: "/case-studies/web",
    icon: <FaUsers />,
    children: [
      { label: "Web App Case Studies", url: "/case-studies/web" },
      { label: "Mobile App Case Studies", url: "/case-studies/mobile" },
      { label: "AI Case Studies", url: "/case-studies/ai" },
      { label: "Power Platform Case Studies", url: "/case-studies/power-platform" },
      { label: "SharePoint Case Studies", url: "/case-studies/sharepoint" },
    ],
  },
  { label: "Blog", url: "/blog", icon: <FaBlog /> },
  { label: "Contact", url: "/contact", icon: <FaPhone /> },
];

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
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="flex justify-center gap-8 py-4 font-semibold">
          {menu.map((item, index) => (
            <MenuItem key={index} item={item} isMobile={isMobile} pathname={pathname} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

function MenuItem({ item, isMobile, pathname }: any) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLLIElement>(null);

  const isActive = (url: string) => pathname === url;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // If item has no children/mega menu, render <Link> directly
  if (!item.children && !item.mega) {
    return (
      <li className="relative">
        <Link
          href={item.url}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium cursor-pointer select-none transition-all duration-300
            border-b-2 border-transparent
            ${isActive(item.url) ? "text-green-400 border-green-400" : "text-white hover:text-green-400 hover:border-green-400"}`}
        >
          {item.icon && <span className="text-xl">{item.icon}</span>}
          {item.label}
        </Link>
      </li>
    );
  }

  // Otherwise, items with children or mega menu (dropdowns)
  return (
    <li
      className="relative"
      ref={wrapperRef}
      onMouseEnter={!isMobile ? () => setOpen(true) : undefined}
      onMouseLeave={!isMobile ? () => setOpen(false) : undefined}
    >
      <button
        onClick={isMobile ? () => setOpen(!open) : undefined}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium cursor-pointer select-none transition-all duration-300
          border-b-2 border-transparent
          ${isActive(item.url) ? "text-green-400 border-green-400" : "text-white hover:text-green-400 hover:border-green-400"}`}
      >
        {item.icon && <span className="text-xl">{item.icon}</span>}
        {item.label}
        <span className={`ml-1 text-2xl transition-transform duration-300 ${open ? "rotate-180 text-green-400" : ""}`}>
          <FaChevronDown />
        </span>
      </button>

      {/* Render normal dropdown */}
      {item.children && !item.mega && open && (
        <ul className="absolute top-full left-0 mt-1 min-w-[280px] bg-black border border-gray-800 rounded-xl shadow-xl z-50 pointer-events-auto">
          {item.children.map((child: any, idx: number) => (
            <li key={idx}>
              <Link
                href={child.url}
                className={`block px-4 py-3 rounded-lg transition-all border-b-2 border-transparent
                  ${isActive(child.url) ? "text-green-400 border-green-400" : "text-gray-300 hover:text-green-400 hover:border-green-400"}`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Mega menu */}
      {item.mega && open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-black border border-gray-800 rounded-xl shadow-xl p-6 flex gap-6 z-50 pointer-events-auto">
          {item.children.map((col: any, idx: number) => (
            <div key={idx} className="flex-1">
              <h4 className="text-white font-bold mb-3">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link: any, i: number) => (
                  <li key={i}>
                    <Link
                      href={link.url}
                      className={`flex items-start gap-2 p-2 rounded-lg transition-all border-b-2 border-transparent
                        ${isActive(link.url) ? "text-green-400 border-green-400" : "text-gray-300 hover:text-green-400 hover:border-green-400"}`}
                    >
                      {link.icon && <span className="text-xl">{link.icon}</span>}
                      <div>
                        <span>{link.label}</span>
                        {link.description && (
                          <p className="text-xs text-gray-400">{link.description}</p>
                        )}
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
