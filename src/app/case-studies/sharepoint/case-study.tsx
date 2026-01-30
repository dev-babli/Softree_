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
      "A custom SPFx solution built using Fluent UI to enable seamless copy and move operations for SharePoint list items with enhanced user experience.",
    image: "/images/case-study/sharepoint/copy-move-panel.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf",
    category: "SPFx Extension",
  },
  {
    title: "Managing SharePoint Library Folders with Power Apps",
    description:
      "A Power Apps–based solution that allows users to create, manage, and organize SharePoint document library folders through a user-friendly interface.",
    image: "/images/case-study/sharepoint/library-folders.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Managing-SharePoint-Library-Folders-with-Power-Apps-Updated-.pdf",
    category: "Power Apps + SharePoint",
  },
  {
    title: "Dynamic Navigation Bar Using SPFx Application Customizer",
    description:
      "An SPFx Application Customizer that delivers a dynamic, role-based navigation bar across modern SharePoint sites for improved usability.",
    image: "/images/case-study/sharepoint/navigation-bar.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Creating-a-Dynamic-Navigation-Bar-using-SPFx-Application-Customizer.pdf",
    category: "SPFx Application Customizer",
  },
  {
    title: "Custom Footer for SharePoint Online",
    description:
      "A reusable SPFx footer component designed to enhance branding, accessibility, and user experience across SharePoint Online pages.",
    image: "/images/case-study/sharepoint/custom-footer.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf",
    category: "SPFx UI Customization",
  },
  {
    title: "Global Notification Banner in SharePoint",
    description:
      "A SharePoint-wide notification banner implemented using SPFx Application Customizer to broadcast alerts, announcements, and system updates.",
    image: "/images/case-study/sharepoint/notification-banner.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Implementing-a-Global-Notification-Banner-with-SPFx-Application-Customizer.pdf",
    category: "SPFx Application Customizer",
  },
  {
    title: "Browse Documents Panel Inside SharePoint",
    description:
      "A custom SPFx panel that allows users to browse and select documents directly from SharePoint libraries without leaving the current context.",
    image: "/images/case-study/sharepoint/browse-documents.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Inside-a-panel-Browse-Document-From-file-explorer.pdf",
    category: "SPFx Web Part",
  },
  {
    title: "Parent Panel for List & Library Creation",
    description:
      "An SPFx solution providing a guided parent panel to create SharePoint lists or libraries using radio-button driven workflows.",
    image: "/images/case-study/sharepoint/list-library-panel.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/SPFx-1.pdf",
    category: "SPFx Web Part",
  },
  {
    title: "Custom Command Extension in SharePoint Framework",
    description:
      "A SharePoint command extension that adds contextual actions to list and library toolbars, improving productivity and user efficiency.",
    image: "/images/case-study/sharepoint/command-extension.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/The-Implementation-of-a-Custom-Command-Extension-in-the-SharePoint-Framework-1.pdf",
    category: "SPFx Command Extension",
  },
  {
    title: "PnP PowerShell – Manage Modern Page Web Parts",
    description:
      "An automation solution using PnP PowerShell to add, remove, and retrieve web parts from SharePoint modern pages efficiently.",
    image: "/images/case-study/sharepoint/pnp-webparts.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Add-Remove-And-Get-All-Web-Parts-From-Modern-Site-Page-Using-PnP-PowerShell.pdf",
    category: "PnP PowerShell",
  },
  {
    title: "Enable & Disable MFA Using PowerShell",
    description:
      "A PowerShell automation approach to manage Multi-Factor Authentication (MFA) settings for Microsoft 365 users securely.",
    image: "/images/case-study/sharepoint/mfa-powershell.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/How-To-Enable-And-Disable-MFA-Using-PowerShell-1.pdf",
    category: "Microsoft 365 Automation",
  },
  {
    title: "Fetch SharePoint List Items in Power Apps",
    description:
      "A Power Apps implementation demonstrating how to retrieve, calculate, and display SharePoint list data dynamically in galleries.",
    image: "/images/case-study/sharepoint/powerapps-gallery.webp",
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
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* HEADER */}
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-blue-600">
            Microsoft SharePoint • SPFx • Power Platform
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            SharePoint Case Studies
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Explore real-world SharePoint solutions built using SPFx, Power
            Apps, Power Automate, and Microsoft 365 to modernize collaboration,
            improve governance, and enhance user experience.
          </p>

          <div className="mx-auto mt-8 h-[2px] w-28 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </div>

        {/* ================= CARD CONTAINER ================= */}
        <section
          className="
    relative mt-24 rounded-[48px]  
    px-6 "
        >
          {/* ================= GRID ================= */}
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCaseStudies.slice(0, 6).map((item, index) => (
              <motion.article
                key={item.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="
          group relative overflow-hidden rounded-3xl
          bg-white border border-slate-200
          shadow-[0_20px_40px_-20px_rgba(15,23,42,0.25)]
          flex flex-col h-full
          transition-all duration-300
          hover:shadow-[0_30px_60px_-25px_rgba(15,23,42,0.35)]
        "
              >
                {/* IMAGE */}
                <motion.div
                  className="relative overflow-hidden h-[220px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                {/* CONTENT */}
                <div className="relative z-10 flex flex-1 flex-col justify-between gap-4 p-6 bg-white border-t border-slate-200">
                  {/* INDEX */}
                  <span
                    className="
              pointer-events-none absolute right-4 top-2
              text-[56px] font-extrabold text-slate-200 select-none
            "
                  >
                    {String(startIndex + index + 1).padStart(2, "0")}
                  </span>

                  {/* TEXT */}
                  <div className="flex flex-col gap-4">
                    <span className="w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {item.category}
                    </span>

                    <h3 className="text-xl font-semibold leading-snug tracking-tight text-slate-900">
                      {item.title}
                    </h3>

                    <p className="line-clamp-3 leading-relaxed text-slate-600 text-sm">
                      {item.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href={item.href}
                    target="_blank"
                    className="
              mt-4 inline-flex items-center justify-between
              rounded-xl bg-blue-600
              px-4 py-3 text-sm font-semibold text-white
              transition-all duration-300
              hover:bg-blue-700 hover:shadow-lg
            "
                  >
                    View Case Study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          <div className="mt-20 flex items-center justify-center gap-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`
        group flex items-center gap-2 rounded-xl border px-5 py-3
        text-sm font-semibold transition-all duration-300
        ${
          currentPage === 1
            ? "cursor-not-allowed border-slate-200 text-slate-400"
            : "border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
        }
      `}
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Prev
            </button>

            <span className="text-sm text-slate-600">
              Page{" "}
              <span className="font-semibold text-slate-900">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">{totalPages}</span>
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`
        group flex items-center gap-2 rounded-xl border px-5 py-3
        text-sm font-semibold transition-all duration-300
        ${
          currentPage === totalPages
            ? "cursor-not-allowed border-slate-200 text-slate-400"
            : "border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
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
