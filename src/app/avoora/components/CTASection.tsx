"use client";

import { useState, FormEvent } from "react";
import { Reveal } from "./Reveal";
import styles from "../avoora.module.css";

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Facebook", href: "https://facebook.com" },
  { name: "X", href: "https://x.com" },
];

const SERVICES = [
  "UI UX Design",
  "Web Development",
  "Brand Identity",
  "Growth Ops",
  "Content Strategy",
];

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") {
    return (
      <svg width="18" height="18" viewBox="0 0 23 23" fill="currentColor">
        <path d="M16.6957 0H5.56522C2.49322 0 0 2.49322 0 5.56522V16.6957C0 19.7677 2.49322 22.2609 5.56522 22.2609H16.6957C19.7677 22.2609 22.2609 19.7677 22.2609 16.6957V5.56522C22.2609 2.49322 19.7677 0 16.6957 0ZM11.1304 16.6957C8.05844 16.6957 5.56522 14.2024 5.56522 11.1304C5.56522 8.05844 8.05844 5.56522 11.1304 5.56522C14.2024 5.56522 16.6957 8.05844 16.6957 11.1304C16.6957 14.2024 14.2024 16.6957 11.1304 16.6957ZM17.0852 6.2553C16.473 6.2553 15.9722 5.75444 15.9722 5.14226C15.9722 4.53009 16.473 4.02922 17.0852 4.02922C17.6974 4.02922 18.1983 4.53009 18.1983 5.14226C18.1983 5.75444 17.6974 6.2553 17.0852 6.2553Z" />
        <path d="M11.1301 14.4703C12.9743 14.4703 14.4693 12.9753 14.4693 11.1311C14.4693 9.28697 12.9743 7.79199 11.1301 7.79199C9.286 7.79199 7.79102 9.28697 7.79102 11.1311C7.79102 12.9753 9.286 14.4703 11.1301 14.4703Z" />
      </svg>
    );
  }
  if (name === "LinkedIn") {
    return (
      <svg width="18" height="18" viewBox="0 0 23 23" fill="currentColor">
        <path d="M22.2611 22.261V14.108C22.2611 10.101 21.3985 7.04016 16.7237 7.04016C14.4698 7.04016 12.9672 8.26451 12.355 9.4332H12.2993V7.4019H7.875V22.261H12.4941V14.8871C12.4941 12.9393 12.8559 11.0749 15.2489 11.0749C17.6141 11.0749 17.6419 13.2732 17.6419 14.9984V22.2332H22.2611V22.261Z" />
        <path d="M0.361328 7.40149H4.98045V22.2606H0.361328V7.40149Z" />
        <path d="M2.6713 0C1.19652 0 0 1.19652 0 2.6713C0 4.14608 1.19652 5.37043 2.6713 5.37043C4.14608 5.37043 5.3426 4.14608 5.3426 2.6713C5.3426 1.19652 4.14608 0 2.6713 0Z" />
      </svg>
    );
  }
  if (name === "Facebook") {
    return (
      <svg width="18" height="18" viewBox="0 0 23 23" fill="currentColor">
        <path d="M12.8552 22.2601V12.1067H16.262L16.7731 8.14849H12.8552V5.62177C12.8552 4.47615 13.172 3.69542 14.8167 3.69542L16.911 3.69456V0.154237C16.5488 0.107172 15.3056 -0.000732422 13.8586 -0.000732422C10.8372 -0.000732422 8.76863 1.84354 8.76863 5.22976V8.14849H5.35156V12.1067H8.76863V22.2601H12.8552Z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 23 23" fill="currentColor">
      <path d="M13.2036 9.42559L21.3125 -0.000366211H19.391L12.35 8.18406L6.72639 -0.000366211H0.240234L8.74423 12.3759L0.240234 22.2605H2.1619L9.59734 13.6175L15.5363 22.2605H22.0224L13.2031 9.42559H13.2036ZM10.5716 12.485L9.70999 11.2526L2.8543 1.44623H5.80586L11.3385 9.36026L12.2001 10.5927L19.3919 20.8797H16.4403L10.5716 12.4854V12.485Z" />
    </svg>
  );
}

export function CTASection() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", company: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaHeading}>
              Let&apos;s <span className={styles.ctaHeadingAccent}>Talk</span>
            </h2>

            <div className={styles.ctaGrid}>
              {/* Social */}
              <div>
                <h3 className={styles.ctaColumnTitle}>Follow us</h3>
                <div className={styles.socialLinks}>
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={s.name}
                    >
                      <SocialIcon name={s.name} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className={styles.ctaColumnTitle}>What we offer</h3>
                <div className={styles.servicesTags}>
                  {SERVICES.map((s) => (
                    <span key={s} className={styles.serviceTag}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div>
                <h3 className={styles.ctaColumnTitle}>E-Mail</h3>
                <a href="mailto:info.avoora@agency.com" className={styles.contactLink}>
                  info.avoora@agency.com
                </a>
                <h3 className={styles.ctaColumnTitle} style={{ marginTop: "1.5rem" }}>
                  Office
                </h3>
                <p className={styles.teamRole}>
                  452 Riverside Dr,<br />Apt 1C, New York, NY 10027
                </p>
              </div>
            </div>

            <div className={styles.ctaDivider} />

            {/* Form */}
            <h3 className={styles.ctaColumnTitle}>Got a question, challenge, or idea?</h3>
            <p className={styles.teamRole} style={{ marginBottom: "1.5rem" }}>
              Fill out the form — we&apos;ll get back to you shortly.
            </p>

            {submitted ? (
              <div className={styles.formSuccess}>
                <div className={styles.formSuccessIcon}>✓</div>
                <p style={{ margin: 0, fontWeight: 600 }}>Message sent!</p>
                <p style={{ margin: 0, fontSize: "0.875rem" }}>We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className={styles.formGrid}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={styles.formInput}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="E-Mail"
                    className={styles.formInput}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Company name"
                    className={styles.formInput}
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                <textarea
                  placeholder="Your message"
                  className={styles.formTextarea}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
                <div className={styles.formActions}>
                  <button type="submit" className={styles.primaryButton}>
                    <span>Submit</span>
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path
                        d="M9.61648 5.8006L0.360093 0.0358623C0.250469 -0.0329162 0.105835 0.000195883 0.0370565 0.109843C0.0155525 0.144118 0.00328985 0.183378 0.0014624 0.223799C-0.000365041 0.264221 0.00830504 0.304427 0.0266285 0.340503L2.85674 5.99955L0.0254568 11.6595C-0.0331514 11.7749 0.0128727 11.916 0.128261 11.9746C0.164336 11.9929 0.204543 12.0016 0.244965 11.9998C0.285387 11.998 0.324647 11.9857 0.358921 11.9642L9.61531 6.19944C9.7253 6.13127 9.75924 5.98683 9.69104 5.87681C9.67198 5.84605 9.64606 5.82013 9.61531 5.80107L9.61648 5.8006Z"
                        fill="#FF5812"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
