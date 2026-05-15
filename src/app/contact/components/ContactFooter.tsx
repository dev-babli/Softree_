"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Work", href: "/our-work" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  const isExternal = href.startsWith("http");
  const className = "group relative inline-flex items-center gap-1.5 text-[13px] font-medium text-(--cp-text-alt) transition-colors duration-300 hover:text-(--cp-text)";
  const inner = (
    <>
      {label}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
        -&gt;
      </span>
    </>
  );
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export default function ContactFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-(--cp-border) px-6 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-semibold tracking-[-0.03em] text-(--cp-text)">
              SOFTREE
            </Link>
            <p className="mt-4 max-w-[16rem] text-[13px] leading-[1.6] text-(--cp-text-alt)">
              Award-winning design &amp; development studio building digital experiences for ambitious brands.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cp-text-alt) opacity-60">
              Navigation
            </p>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cp-text-alt) opacity-60">
              Connect
            </p>
            <div className="flex flex-col gap-2.5">
              {SOCIALS.map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </div>
          </div>

          {/* Offices */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cp-text-alt) opacity-60">
              Offices
            </p>
            <div className="flex flex-col gap-2.5">
              <span className="text-[13px] font-medium text-(--cp-text-alt)">London</span>
              <span className="text-[13px] font-medium text-(--cp-text-alt)">Glasgow</span>
            </div>
            <p className="mb-5 mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cp-text-alt) opacity-60">
              Admin
            </p>
            <div className="flex flex-col gap-2.5">
              <FooterLink label="Privacy" href="/privacy" />
              <FooterLink label="Careers" href="/careers" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-(--cp-border) pt-8 sm:flex-row">
          <p className="text-[11px] text-(--cp-text-alt) opacity-50">
            &copy; {new Date().getFullYear()} Softree Technology. All rights reserved.
          </p>
          <p className="text-[11px] text-(--cp-text-alt) opacity-50">
            Built with care in London &amp; Glasgow
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
