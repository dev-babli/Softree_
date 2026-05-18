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
    title: "Barcode Scanner App",
    description:
      "A Power Apps barcode scanner solution built to streamline inventory and asset management through real-time product scanning, automated data capture, and seamless integration with SharePoint and Dataverse. The app improves operational accuracy while reducing manual entry errors.",
    image: "/images/case-study/power-apps/barcode.png",
    href: "/pdf/Barcode Scanner App.pdf",
    category: "Power Apps",
  },
  {
    title: "ES Speaks and Travel Requests Management System",
    description:
      "A Power Platform–based internal communication and travel request management solution that enhances employee engagement through announcements, structured request workflows, feedback collection, and seamless integration with SharePoint and Microsoft Teams.",
    image: "/images/case-study/power-apps/travel.png",
    href: "/pdf/ES Speaks and Travel Requests Management System.pdf",
    category: "Power Platform",
  },
  {
    title: "New Store Opening Process",
    description:
      "A centralized Power Apps and Power Automate solution designed to manage new store setup activities, task assignments, approval workflows, vendor coordination, and real-time progress tracking with structured SharePoint integration.",
    image: "/images/case-study/power-apps/store.png",
    href: "/pdf/New Store Opening Process.pdf",
    category: "Power Platform",
  },
  {
    title: "Employee Details Tracking System",
    description:
      "A centralized employee management system developed using Power Apps to maintain employee records, roles, and organizational hierarchies with improved data visibility, validation, and reporting capabilities.",
    image: "/images/case-study/power-apps/emp.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Employee-Details-tracking-System.pdf",
    category: "Power Apps",
  },
  {
    title: "Health Plan Selector Mobile Application",
    description:
      "A mobile-first Power Apps application that enables users to compare, filter, and select health plans based on eligibility, coverage benefits, and preferences, offering an intuitive and guided decision-making experience.",
    image: "/images/case-study/power-apps/health.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Health-Plan-Selector-Mobile-Application.pdf",
    category: "Power Apps",
  },
  {
    title: "Projects Portfolio Management",
    description:
      "A portfolio management solution built on Microsoft Dataverse that enables organizations to manage projects, track milestones, monitor KPIs, and improve strategic decision-making through centralized dashboards.",
    image: "/images/case-study/power-apps/project.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf",
    category: "Power Apps",
  },
  {
    title: "Students Portal Mobile App",
    description:
      "A student-focused mobile application built using Power Apps that centralizes academic information, profile management, attendance tracking, and communication with institutional services in one unified interface.",
    image: "/images/case-study/power-apps/student.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Students-Portal-Mobile-App.pdf",
    category: "Power Apps",
  },
  {
    title: "Ticket Generation Mobile App",
    description:
      "A mobile ticketing and issue tracking solution that allows users to log incidents, prioritize requests, assign tasks, and monitor resolution status through structured workflows and centralized reporting.",
    image: "/images/case-study/power-apps/ticket.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Ticket-Generation-Mobile-App.pdf",
    category: "Power Apps",
  },
  {
    title: "Travel Agency Multiple Authentication System",
    description:
      "A secure authentication and access control system designed for travel agencies, supporting multiple login mechanisms and role-based permissions to enhance data protection and system security.",
    image: "/images/case-study/power-apps/travel.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Travel-Agency-Multiple-Authentication-System.pdf",
    category: "Power Apps",
  },
  {
    title: "Interview Management System",
    description:
      "An end-to-end interview management solution that automates candidate scheduling, interviewer coordination, evaluation tracking, and feedback consolidation for streamlined HR operations.",
    image: "/images/case-study/power-apps/interview.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Interview-Managing-System.pdf",
    category: "Power Apps",
  },
  {
    title: "Multiple Signature Approval Process",
    description:
      "A workflow-driven approval system built using Power Apps and Power Automate that supports multi-level digital signatures, ensuring compliance, accountability, and complete audit traceability.",
    image: "/images/case-study/power-apps/sign.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Multiple-Signature-Approval-Process.pdf",
    category: "Power Apps",
  },
  {
    title: "Car Rental System",
    description:
      "A Power Apps–based vehicle rental management solution that streamlines booking, vehicle availability tracking, customer management, billing, and operational reporting within a unified system.",
    image: "/images/case-study/power-apps/car.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Car-Rental-System-doc.pdf",
    category: "Power Apps",
  },
  {
    title: "Automated Request Submission & Approval Workflow",
    description:
      "A structured Power Apps and Power Automate workflow that automates request submissions, approval routing, notifications, and status tracking to enhance transparency and reduce manual processing delays.",
    image: "/images/case-study/power-apps/automated.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Automated-Request-Submission-and-Approval-Workflow-in-Power-Apps.pdf",
    category: "Power Apps",
  },
  {
    title: "Claim Request Management",
    description:
      "A claims processing application that enables users to submit, validate, track, and approve claims through structured workflows, centralized documentation, and real-time status visibility.",
    image: "/images/case-study/power-apps/claim.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Claim-Request-Management.pdf",
    category: "Power Apps",
  },
  {
    title: "Power Apps – Working with List Relationships",
    description:
      "A Power Apps solution demonstrating how to build scalable applications using SharePoint list relationships to manage related datasets, enforce referential logic, and improve data consistency across business processes.",
    image: "/images/case-study/power-apps/list.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Power-App-Working-with-List-Relationships.pdf",
    category: "Power Apps",
  },
  {
    title: "Project Management System",
    description:
      "A structured project management application that helps teams plan tasks, track milestones, manage dependencies, and monitor performance using centralized dashboards and automated workflows.",
    image: "/images/case-study/power-apps/projectm.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Project-Management-For-Blog.pdf",
    category: "Power Apps",
  },
  {
    title: "Reservation Booking System for Events",
    description:
      "An event management and reservation solution that enables event creation, attendee registration, booking management, and real-time tracking through a user-friendly Power Apps interface.",
    image: "/images/case-study/power-apps/reservation.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Reservation-booking-system-for-an-event-For-Blog.pdf",
    category: "Power Apps",
  },
  {
    title: "Sales Invoice Management",
    description:
      "A Power Apps–based invoicing system designed to generate, manage, and track sales invoices with automated calculations, structured data storage, and improved financial visibility for businesses.",
    image: "/images/case-study/power-apps/invoice.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Sales-Invoice.pdf",
    category: "Power Apps",
  },
  {
    title: "Power Apps Shopping Cart",
    description:
      "A dynamic shopping cart application built using Power Apps that supports product browsing, cart management, order submission, and workflow-driven approval for internal business purchasing scenarios.",
    image: "/images/case-study/power-apps/shopping1.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Power-Apps-Shopping-Cart.pdf",
    category: "Power Apps",
  },
  {
    title: "Time Sheet Management System",
    description:
      "A time sheet management solution that allows employees to log work hours, submit timesheets for approval, track productivity metrics, and streamline payroll-related workflows through automation.",
    image: "/images/case-study/power-apps/time.jpg",
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
    <section
      className="relative bg-gradient-to-b from-zinc-50 via-white to-zinc-50
"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* ================= HEADER ================= */}
        <div className="mb-1 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-blue-600">
            Power Platform • Power Apps
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Power Apps Case Studies: Real Business Impact
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Discover how organizations leverage custom Power Apps solutions to
            modernize business processes, automate operations, and drive
            measurable efficiency across enterprise environments.
          </p>

          <div className="mx-auto mt-8 h-[2px] w-28 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
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
