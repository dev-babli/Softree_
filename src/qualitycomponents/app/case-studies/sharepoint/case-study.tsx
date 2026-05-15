"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type CaseStudy = {
  title: string;
  description: string;
  image: string;
  href: string;
  category: string;
};

const ITEMS_PER_PAGE = 6;

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Custom Copy & Move Panel for SharePoint Lists",
    description:
      "A custom SPFx solution built using Fluent UI to enable seamless copy and move operations for SharePoint list items with an enhanced user experience. The solution provides intuitive panel-based interactions, validation handling, and supports large list structures while maintaining performance and usability.",
    image: "/images/case-study/sharepoint/copy.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf",
    category: "SPFx Extension",
  },
  {
    title: "Managing SharePoint Library Folders with Power Apps",
    description:
      "A Power Apps–based solution that allows users to create, manage, and organize SharePoint document library folders through a user-friendly interface. The app simplifies folder management, applies structured naming conventions, and ensures secure access control through SharePoint permissions.",
    image: "/images/case-study/sharepoint/folders.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Managing-SharePoint-Library-Folders-with-Power-Apps-Updated-.pdf",
    category: "Power Apps + SharePoint",
  },
  {
    title: "Dynamic Navigation Bar Using SPFx Application Customizer",
    description:
      "An SPFx Application Customizer that delivers a dynamic, role-based navigation bar across modern SharePoint sites for improved usability. It centralizes navigation management, adapts based on user roles, and enhances the overall site experience without modifying individual pages.",
    image: "/images/case-study/sharepoint/dynamic.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Creating-a-Dynamic-Navigation-Bar-using-SPFx-Application-Customizer.pdf",
    category: "SPFx Application Customizer",
  },
  {
    title: "Custom Footer for SharePoint Online",
    description:
      "A reusable SPFx footer component designed to enhance branding, accessibility, and user experience across SharePoint Online pages. The solution supports dynamic links, organizational branding elements, and centralized configuration for consistent implementation.",
    image: "/images/case-study/sharepoint/footer.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf",
    category: "SPFx UI Customization",
  },
  {
    title: "Global Notification Banner in SharePoint",
    description:
      "A SharePoint-wide notification banner implemented using SPFx Application Customizer to broadcast alerts, announcements, and system updates. The solution ensures organization-wide visibility, configurable display settings, and minimal performance impact.",
    image: "/images/case-study/sharepoint/global.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Implementing-a-Global-Notification-Banner-with-SPFx-Application-Customizer.pdf",
    category: "SPFx Application Customizer",
  },
  {
    title: "Browse Documents Panel Inside SharePoint",
    description:
      "A custom SPFx panel that allows users to browse and select documents directly from SharePoint libraries without leaving the current context. It improves workflow efficiency by integrating document selection, filtering, and preview capabilities within a single interface.",
    image: "/images/case-study/sharepoint/browse.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Inside-a-panel-Browse-Document-From-file-explorer.pdf",
    category: "SPFx Web Part",
  },
  {
    title: "Parent Panel for List & Library Creation",
    description:
      "An SPFx solution providing a guided parent panel to create SharePoint lists or libraries using radio-button driven workflows. The interface simplifies configuration, enforces governance standards, and ensures consistent structure across the tenant.",
    image: "/images/case-study/sharepoint/panel.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/SPFx-1.pdf",
    category: "SPFx Web Part",
  },
  {
    title: "Custom Command Extension in SharePoint Framework",
    description:
      "A SharePoint command extension that adds contextual actions to list and library toolbars, improving productivity and user efficiency. It integrates seamlessly with modern SharePoint UI and supports dynamic visibility based on item selection and user permissions.",
    image: "/images/case-study/sharepoint/custom.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/The-Implementation-of-a-Custom-Command-Extension-in-the-SharePoint-Framework-1.pdf",
    category: "SPFx Command Extension",
  },
  {
    title: "PnP PowerShell – Manage Modern Page Web Parts",
    description:
      "An automation solution using PnP PowerShell to add, remove, and retrieve web parts from SharePoint modern pages efficiently. The script-based approach enhances administrative control, reduces manual effort, and ensures consistent web part deployment.",
    image: "/images/case-study/sharepoint/pnp.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Add-Remove-And-Get-All-Web-Parts-From-Modern-Site-Page-Using-PnP-PowerShell.pdf",
    category: "PnP PowerShell",
  },
  {
    title: "Enable & Disable MFA Using PowerShell",
    description:
      "A PowerShell automation approach to manage Multi-Factor Authentication (MFA) settings for Microsoft 365 users securely. The solution supports bulk operations, improves administrative efficiency, and enhances tenant-wide security governance.",
    image: "/images/case-study/sharepoint/mfa.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/How-To-Enable-And-Disable-MFA-Using-PowerShell-1.pdf",
    category: "Microsoft 365 Automation",
  },
  {
    title: "Fetch SharePoint List Items in Power Apps",
    description:
      "A Power Apps implementation demonstrating how to retrieve, calculate, and display SharePoint list data dynamically in galleries. The solution includes filtering, aggregation logic, and real-time data interaction to create responsive business applications.",
    image: "/images/case-study/sharepoint/fetch.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/How-To-Fetch-Items-From-SharePoint-List-To-PowerApps-Gallery-Calculate.pdf",
    category: "Power Apps + SharePoint",
  },
];

export default function CaseStudyGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(CASE_STUDIES.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleCaseStudies = CASE_STUDIES.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-blue-600">
            Microsoft SharePoint • SPFx • Power Platform
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            SharePoint Case Studies
          </h2>

          <p className="mx-auto mt-2 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Explore real-world SharePoint solutions built using SPFx, Power
            Apps, Power Automate, and Microsoft 365 to modernize collaboration,
            improve governance, and enhance user experience.
          </p>

          <div className="mx-auto mt-2 h-[2px] w-28 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </div>

        {/* ================= CARD CONTAINER ================= */}
        <section
          className="
    relative mt-3 rounded-[48px]  
    px-6 "
        >
          {/* ================= GRID ================= */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCaseStudies.slice(0, 6).map((item, index) => (
              <motion.article
                key={item.href}
                initial="initial"
                whileHover="hover"
                className="
    group relative h-[420px]
    overflow-hidden
    flex flex-col
    bg-white
    border border-slate-200
    shadow-md
    rounded-2xl
    transition-all duration-300
    hover:bg-slate-50
    hover:border-blue-500
    hover:shadow-2xl
  "
              >
                {/* IMAGE — BIGGER */}
                <motion.div
                  variants={{
                    initial: { height: 300, opacity: 1 },
                    hover: { height: 0, opacity: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* CONTENT */}
                <div className="flex flex-col flex-1 px-5 py-4">
                  <motion.div
                    variants={{
                      initial: { y: 0 },
                      hover: { y: -10 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col"
                  >
                    <span className="text-[11px] font-medium bg-blue-50 text-blue-700 px-3 py-1 w-fit rounded-md mb-3">
                      {item.category}
                    </span>

                    <h3 className="text-base font-semibold text-slate-900 leading-snug mb-3">
                      {item.title}
                    </h3>

                    <p
                      className="
      text-sm text-slate-600
      line-clamp-2
      group-hover:line-clamp-none
      transition-all duration-300
    "
                    >
                      {item.description}
                    </p>
                  </motion.div>

                  {/* CTA — FIXED BOTTOM */}
                  <div className="mt-auto pt-4">
                    <Link
                      href={item.href}
                      target="_blank"
                      className="
          inline-flex items-center gap-2
          text-sm font-semibold text-blue-600
          transition-all duration-300
          group-hover:text-blue-700
        "
                    >
                      View Case Study
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          <div className="mt-4 flex items-center justify-center gap-6">
            {/* PREV */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`
      group flex items-center gap-2 rounded-xl px-5 py-3
      text-sm font-semibold transition-all duration-300
      ${
        currentPage === 1
          ? "cursor-not-allowed bg-slate-100 text-slate-400"
          : "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-md"
      }
    `}
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Prev
            </button>

            {/* PAGE INFO */}
            <span className="text-sm text-slate-600">
              Page{" "}
              <span className="font-semibold text-slate-900">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">{totalPages}</span>
            </span>

            {/* NEXT */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`
      group flex items-center gap-2 rounded-xl px-5 py-3
      text-sm font-semibold transition-all duration-300
      ${
        currentPage === totalPages
          ? "cursor-not-allowed bg-slate-100 text-slate-400"
          : "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-md"
      }
    `}
            >
              Next
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
