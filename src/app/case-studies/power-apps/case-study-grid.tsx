"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type CaseStudy = {
  title: string;
  description: string;
  image: string;
  href: string;
  highlight?: string;
  category: string;
};

const ITEMS_PER_PAGE = 6;

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Model Driven App",
    description:
      "A Power Apps model-driven application designed to streamline business processes with structured data, role-based access, and scalable workflows.",
    image: "/images/case-study/power-apps/model.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Model-Driven-App-1.pdf",
    category: "Power Apps",
  },
  {
    title: "Employee Details Tracking System",
    description:
      "A centralized employee management solution to track employee details, roles, and organizational data with improved visibility and accuracy.",
    image: "/images/case-study/power-apps/emp.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Employee-Details-tracking-System.pdf",
    category: "Power Apps",
  },
  {
    title: "Health Plan Selector Mobile Application",
    description:
      "A mobile-first Power Apps solution that allows users to compare and select health plans based on eligibility, coverage, and preferences.",
    image: "/images/case-study/power-apps/health.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Health-Plan-Selector-Mobile-Application.pdf",
    category: "Power Apps",
  },
  {
    title: "Projects Portfolio Management",
    description:
      "A portfolio management application built on Microsoft Dataverse to manage projects, track progress, and improve decision-making across teams.",
    image: "/images/case-study/power-apps/project.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf",
    category: "Power Apps",
  },
  {
    title: "Students Portal Mobile App",
    description:
      "A mobile application for students to access academic information, manage profiles, and interact with institutional services in one place.",
    image: "/images/case-study/power-apps/student.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Students-Portal-Mobile-App.pdf",
    category: "Power Apps",
  },
  {
    title: "Ticket Generation Mobile App",
    description:
      "A ticket generation and tracking application enabling efficient issue reporting, prioritization, and resolution through mobile devices.",
    image: "/images/case-study/power-apps/ticket.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Ticket-Generation-Mobile-App.pdf",
    category: "Power Apps",
  },
  {
    title: "Travel Agency Multiple Authentication System",
    description:
      "A secure authentication system for travel agencies supporting multiple login mechanisms to enhance security and user access control.",
    image:
      "/images/case-study/power-apps/travel-agency-multiple-authentication-system.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Travel-Agency-Multiple-Authentication-System.pdf",
    category: "Power Apps",
  },
  {
    title: "Interview Managing System",
    description:
      "An interview management solution that automates scheduling, candidate tracking, and feedback collection for HR teams.",
    image: "/images/case-study/power-apps/interview-managing-system.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Interview-Managing-System.pdf",
    category: "Power Apps",
  },
  {
    title: "Multiple Signature Approval Process",
    description:
      "A workflow-driven approval system requiring multiple digital signatures to ensure compliance, accountability, and audit readiness.",
    image:
      "/images/case-study/power-apps/multiple-signature-approval-process.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Multiple-Signature-Approval-Process.pdf",
    category: "Power Apps",
  },
  {
    title: "Car Rental System",
    description:
      "A Power Apps–based car rental management system that streamlines vehicle booking, availability tracking, and rental operations.",
    image: "/images/case-study/power-apps/car-rental-system.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Car-Rental-System-doc.pdf",
    category: "Power Apps",
  },
  {
    title: "Automated Request Submission & Approval Workflow",
    description:
      "A Power Apps workflow solution that automates request submission, approval routing, and status tracking to improve operational efficiency.",
    image: "/images/case-study/power-apps/automated-request-submission.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Automated-Request-Submission-and-Approval-Workflow-in-Power-Apps.pdf",
    category: "Power Apps",
  },
  {
    title: "Claim Request Management",
    description:
      "A claim management application that enables users to submit, track, and approve claims with structured workflows and centralized data handling.",
    image: "/images/case-study/power-apps/claim-request-management.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Claim-Request-Management.pdf",
    category: "Power Apps",
  },
  {
    title: "Power Apps – Working with List Relationships",
    description:
      "A Power Apps solution demonstrating how to work with SharePoint list relationships to manage related data efficiently and build scalable business apps.",
    image: "/images/case-study/power-apps/list-relationships.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Power-App-Working-with-List-Relationships.pdf",
    category: "Power Apps",
  },
  {
    title: "Project Management System",
    description:
      "A project management application that helps teams plan, track, and manage projects with structured workflows, timelines, and centralized data.",
    image: "/images/case-study/power-apps/project-management-system.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Project-Management-For-Blog.pdf",
    category: "Power Apps",
  },
  {
    title: "Reservation Booking System for Events",
    description:
      "An event reservation and booking system that enables users to create events, manage reservations, and track attendee bookings efficiently.",
    image: "/images/case-study/power-apps/reservation-booking-system.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Reservation-booking-system-for-an-event-For-Blog.pdf",
    category: "Power Apps",
  },
  {
    title: "Sales Invoice Management",
    description:
      "A Power Apps–based sales invoice solution that helps generate, manage, and track invoices with structured data and improved financial visibility.",
    image: "/images/case-study/power-apps/sales-invoice-management.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Sales-Invoice.pdf",
    category: "Power Apps",
  },
  {
    title: "Power Apps Shopping Cart",
    description:
      "A shopping cart application built using Power Apps that enables product selection, cart management, and order processing for business scenarios.",
    image: "/images/case-study/power-apps/shopping-cart.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Power-Apps-Shopping-Cart.pdf",
    category: "Power Apps",
  },
  {
    title: "Time Sheet Management System",
    description:
      "A time sheet management application that allows employees to log work hours, track productivity, and simplify approval workflows.",
    image: "/images/case-study/power-apps/time-sheet-management.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/TimeSheet.pdf",
    category: "Power Apps",
  },
];

export default function CaseStudyGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(CASE_STUDIES.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleCaseStudies = CASE_STUDIES.slice(startIndex, endIndex);

  return (
    <section className="relative bg-gradient-to-b from-black via-[#020d1a] to-black">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-blue-400">
            Power Platform • Power Apps
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Power Apps Case Studies: Delivering Measurable Business Outcomes
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Discover how organizations leverage custom Power Apps solutions to
            modernize business processes, automate operations, and drive
            measurable efficiency across enterprise environments.
          </p>

          <div className="mx-auto mt-8 h-[2px] w-28 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        <section
          className="
    relative mt-24 rounded-[48px]
    bg-gradient-to-b from-zinc-900 via-black to-black
    border border-white/10
    px-6 py-20
    shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]
  "
        >
          {/* GRID */}
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
            {visibleCaseStudies.slice(0, 5).map((item, index) => {
              const isBigCard = index === 0 || index === 1;

              return (
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
                  whileHover={{ y: -8 }}
                  className={`
          group relative overflow-hidden rounded-3xl
          border border-white/10 bg-black
          shadow-[0_30px_60px_-25px_rgba(0,0,0,0.85)]
          flex flex-col h-full
          ${isBigCard ? "lg:col-span-3" : "lg:col-span-2"}
        `}
                >
                  {/* IMAGE */}
                  <motion.div
                    className={`relative overflow-hidden ${
                      isBigCard ? "h-[300px]" : "h-[200px]"
                    }`}
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
                  <div
                    className="
            relative z-10 flex flex-1 flex-col justify-between
            gap-4 p-6 overflow-hidden
            rounded-1xl
            bg-gradient-to-b
            from-[#1b2430]/60
            via-[#0f172a]/40
            to-transparent
            backdrop-blur-sm
            border border-white/10
          "
                  >
                    {/* TEXT BLOCK */}
                    <div className="flex flex-col gap-4">
                      <span
                        className={`pointer-events-none absolute right-4 top-2 z-0
                font-extrabold leading-none select-none
                ${
                  isBigCard
                    ? "text-[70px] text-zinc-600/30"
                    : "text-[60px] text-zinc-700/40"
                }`}
                      >
                        {String(startIndex + index + 1).padStart(2, "0")}
                      </span>

                      <span className="relative z-10 w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                        {item.category}
                      </span>

                      <h3
                        className={`relative z-10 font-semibold leading-snug tracking-tight text-white
                ${isBigCard ? "text-2xl" : "text-xl"}`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`relative z-10 line-clamp-3 leading-relaxed text-white/75
                ${isBigCard ? "text-base" : "text-sm"}`}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* CTA — pinned bottom */}
                    <Link
                      href={item.href}
                      target="_blank"
                      className="
              relative z-10 group/button mt-4
              inline-flex items-center justify-between
              rounded-xl
              bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900
              px-4 py-3 text-sm font-semibold text-white
              transition-all duration-300
              hover:from-zinc-600 hover:to-black hover:shadow-lg
            "
                    >
                      View Case Study
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* PAGINATION */}
          <div className="mt-20 flex items-center justify-center gap-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`
        group flex items-center gap-2 rounded-xl border px-5 py-3
        text-sm font-semibold transition-all duration-300
        ${
          currentPage === 1
            ? "cursor-not-allowed border-white/10 text-white/30"
            : "border-white/20 text-white hover:border-blue-400 hover:text-blue-400 hover:shadow-[0_0_20px_-4px_rgba(96,165,250,0.6)]"
        }
      `}
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Prev
            </button>

            <span className="text-sm text-white/60">
              Page{" "}
              <span className="font-semibold text-white">{currentPage}</span> of{" "}
              <span className="font-semibold text-white">{totalPages}</span>
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`
        group flex items-center gap-2 rounded-xl border px-5 py-3
        text-sm font-semibold transition-all duration-300
        ${
          currentPage === totalPages
            ? "cursor-not-allowed border-white/10 text-white/30"
            : "border-white/20 text-white hover:border-blue-400 hover:text-blue-400 hover:shadow-[0_0_20px_-4px_rgba(96,165,250,0.6)]"
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
