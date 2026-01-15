"use client";

import { useState, useEffect } from "react";
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
            description: "Enterprise SharePoint solutions",
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
            description: "Automate SharePoint tasks",
          },
          {
            label: "Teams App Development",
            url: "/services/teams-app-development",
            icon: <FaMicrosoft />,
            description: "Microsoft Teams integrations",
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
            description: "Low-code business apps",
          },
          {
            label: "Microsoft Power Pages",
            url: "/services/power-pages",
            icon: <FaMicrosoft />,
            description: "Secure external portals",
          },
          {
            label: "Microsoft Power BI",
            url: "/services/power-bi",
            icon: <FaChartLine />,
            description: "Dashboards & analytics",
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
      { label: "Mobile App Case Studies", url: "/case-studies/mobile-app-case-studies" },
      { label: "PowerApps Case Studies", url: "/case-studies/powerapps-case-studies" },
      { label: "SharePoint Case Studies", url: "/case-studies/sharepoint-case-studies" },
      { label: "Web Development Case Studies", url: "/case-studies/web-development-case-studies" },
    ],
  },

  { label: "Blog", url: "/blog/all-posts", icon: <FaBlog /> },
  { label: "Contact", url: "/contact", icon: <FaPhone /> },
];

/* =========================
   NAVIGATION
========================= */
export default function Navigation() {
  const pathname = usePathname();

  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  /* Hydration-safe mount */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Scroll logic (runs ONLY after mount) */
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setHidden(window.scrollY > lastScrollY && window.scrollY > 80);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted, lastScrollY]);

  return (
    <nav
      className={`fixed top-4 z-50 w-full flex justify-center transition-transform duration-500 ${
        mounted && hidden ? "-translate-y-32" : "translate-y-0"
      }`}
    >
      <div className="relative w-[92%] max-w-6xl h-16 px-6 rounded-full backdrop-blur-2xl bg-black/70 border border-white/15 shadow-lg flex items-center">
        <div className="flex items-center w-full">
          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="Softree"
              className="h-8 transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {/* SPACING BETWEEN LOGO & HOME */}
          <div className="w-10" />

          {/* MENU */}
          <ul className="hidden md:flex items-center gap-2 font-medium text-white">
            {menu.map((item, index) => (
              <MenuItem key={index} item={item} pathname={pathname} />
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
function MenuItem({ item, pathname }: any) {
  const [open, setOpen] = useState(false);

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  return (
    <li
      className={`relative px-3 py-1 rounded-full transition-colors duration-300 hover:bg-white/5 ${
        isActive(item.url) ? "bg-white/10" : ""
      } before:absolute before:inset-x-0 before:top-full before:h-4 before:content-['']`}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      {/* MAIN LINK */}
      <Link href={item.url} className="flex items-center gap-2 text-sm">
        <span className="text-white/70">{item.icon}</span>
        {item.label}

        {item.children && (
          <FaChevronDown
            className={`text-xs opacity-60 transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </Link>

      {/* ================= MEGA MENU (SERVICES) ================= */}
      {item.mega && open && (
        <div
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
          className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-[900px] p-8 rounded-2xl bg-black border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.95)] flex gap-10 z-50"
        >
          {item.children.map((col: any, idx: number) => (
            <div key={idx} className="flex-1">
              <h4 className="text-white font-semibold mb-4">{col.title}</h4>

              <ul className="space-y-3">
                {col.links.map((link: any, i: number) => (
                  <li key={i}>
                    <Link
                      href={link.url}
                      className="flex gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-white/5"
                    >
                      <span className="text-white/60 mt-1">{link.icon}</span>
                      <div>
                        <div className="font-medium text-white/90">{link.label}</div>
                        <p className="text-xs text-white/50">{link.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* ================= CASE STUDIES ================= */}
      {item.children && !item.mega && open && (
        <div
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
          className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-[900px] p-6 rounded-2xl bg-black border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.95)] z-50"
        >
          <ul className="grid grid-cols-2 gap-4">
            {item.children.map((child: any, i: number) => (
              <li key={i}>
                <Link
                  href={child.url}
                  className="block p-4 rounded-xl text-white/90 font-medium transition-all duration-300 hover:bg-white/5"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
