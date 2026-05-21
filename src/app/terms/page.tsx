import Footer from "@/components/sections/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Softree Technology",
  description:
    "Read Softree Technology’s Terms of Use to understand the rules and guidelines for using our website and services.",
  keywords: [
    "Terms of Use",
    "Terms and Conditions",
    "Softree Technology Terms",
    "website terms",
    "service terms",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/terms",
  },
  openGraph: {
    title: "Terms of Use | Softree Technology",
    description:
      "Understand the terms and conditions for using Softree Technology services.",
    url: "https://www.softreetechnology.com/terms",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | Softree Technology",
    description:
      "Understand the terms and conditions for using Softree Technology services.",
    images: ["/og-image.png"],
  },
};

export default function TermsOfUse() {
  const sections = [
    {
      id: 1,
      title: "Acceptance of Terms",
      content: (
        <p>
          By accessing or using the Softree Technology website ("Site"), you
          confirm that you are at least 18 years of age, have read and
          understood these Terms, and agree to be legally bound by them. If you
          are using the Site on behalf of a company or organization, you
          represent that you have authority to bind that entity to these Terms.
        </p>
      ),
    },
    {
      id: 2,
      title: "Use of Website",
      content: (
        <>
          <p>You may use this Site for lawful purposes only. You agree not to:</p>
          <ul>
            <li>
              Use the Site in any way that violates applicable local, national,
              or international laws
            </li>
            <li>
              Transmit any unsolicited or unauthorized advertising or
              promotional material
            </li>
            <li>
              Attempt to gain unauthorized access to any part of the Site or
              its related systems
            </li>
            <li>
              Interfere with or disrupt the integrity or performance of the Site
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 3,
      title: "Intellectual Property",
      content: (
        <>
          <p>
            All content on this Site — including text, graphics, logos, icons,
            images, and software — is the property of Softree Technology and is
            protected by applicable intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, or create derivative
            works from any content on this Site without our prior written
            consent.
          </p>
        </>
      ),
    },
    {
      id: 4,
      title: "User Conduct",
      content: (
        <>
          <p>When interacting with our Site or services, you agree to:</p>
          <ul>
            <li>Provide accurate and truthful information</li>
            <li>Respect the rights and dignity of other users</li>
            <li>
              Not upload or transmit harmful, offensive, or unlawful content
            </li>
            <li>
              Not attempt to reverse-engineer, decompile, or disassemble any
              part of the Site
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 5,
      title: "Disclaimers",
      content: (
        <>
          <div className="highlight-box">
            <p>
              The Site and its content are provided on an "as is" and "as
              available" basis without warranties of any kind, express or
              implied.
            </p>
          </div>
          <p>
            Softree Technology does not warrant that the Site will be
            uninterrupted, error-free, or free of viruses or other harmful
            components. We do not warrant the accuracy or completeness of any
            content on the Site.
          </p>
        </>
      ),
    },
    {
      id: 6,
      title: "Limitation of Liability",
      content: (
        <>
          <p>
            To the fullest extent permitted by law, Softree Technology shall
            not be liable for any indirect, incidental, special, consequential,
            or punitive damages arising from your use of, or inability to use,
            the Site or its content.
          </p>
          <p>
            Our total liability for any claim arising from your use of the Site
            shall not exceed the amount you paid, if any, to access our
            services.
          </p>
        </>
      ),
    },
    {
      id: 7,
      title: "Third-Party Links",
      content: (
        <p>
          Our Site may contain links to third-party websites. These links are
          provided for your convenience only. We have no control over the
          content of those sites and accept no responsibility for them or for
          any loss or damage that may arise from your use of them.
        </p>
      ),
    },
    {
      id: 8,
      title: "Privacy Policy",
      content: (
        <p>
          Your use of this Site is also governed by our{" "}
          <a href="/privacy-policy">Privacy Policy</a>, which is incorporated
          into these Terms by reference. Please review it to understand our
          practices.
        </p>
      ),
    },
    {
      id: 9,
      title: "Termination",
      content: (
        <p>
          We reserve the right to suspend or terminate your access to the Site
          at our sole discretion, without notice, for conduct that we believe
          violates these Terms or is harmful to other users, us, third parties,
          or the integrity of the Site.
        </p>
      ),
    },
    {
      id: 10,
      title: "Governing Law",
      content: (
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of [Your Jurisdiction], without regard to its conflict of law
          provisions. Any disputes arising under these Terms shall be subject to
          the exclusive jurisdiction of the courts located in [Your
          Jurisdiction].
        </p>
      ),
    },
    {
      id: 11,
      title: "Changes to Terms",
      content: (
        <p>
          We reserve the right to modify these Terms at any time. We will
          notify you of significant changes by updating the "Last Updated" date
          at the top of this page. Your continued use of the Site after any
          changes constitutes your acceptance of the new Terms.
        </p>
      ),
    },
    {
  id: 12,
  title: "Contact Us",
  content: (
    <>
      <p>
        If you have any questions about this Privacy Policy, please contact us:
      </p>

      <p className="contact-line">
        📧 Email:{" "}
        <a href="mailto:sales@softreetechnology.com">
          sales@softreetechnology.com
        </a>
      </p>

      <p className="contact-line">
        🌐 Website:{" "}
        <a
          href="https://www.softreetechnology.com"
          target="_blank"
          rel="noreferrer"
        >
          www.softreetechnology.com
        </a>
      </p>

      <p >
        📞 Phone:{" "}
        <a href="tel:+917008699927">+91 70086 99927</a>
      </p>

      <p>
        📍 Address:
        <br />
        Softree Technology Pvt. Ltd.
        <br />
        PLOT 5C/1283, SECTOR-10
        <br />
        CDA, Cuttack, Odisha - 753014
        <br />
        India
      </p>
    </>
  ),
}
  ];

  return (
    <>
      <style>{`
        .tu-page {
          max-width: 860px;
          margin: 0 auto;
          padding: 4rem 2rem 6rem;
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #1a1a1a;
          background: #faf9f7;
          min-height: 100vh;
        }

        .tu-header {
          border-bottom: 2px solid #1a1a1a;
          padding-bottom: 2rem;
          margin-bottom: 2.5rem;
        }

        .tu-eyebrow {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 0.75rem;
        }

        .tu-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 400;
          line-height: 1.05;
          margin: 0 0 1.5rem;
          letter-spacing: -0.02em;
          color: #1a1a1a;
        }

        .tu-meta-row {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .tu-meta-item {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: #aaa;
        }

        .tu-meta-item strong {
          color: #666;
          font-weight: normal;
        }

        .tu-intro {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #555;
          max-width: 640px;
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e0ddd6;
        }

        .tu-toc {
          background: #f0ede6;
          border-left: 3px solid #1a1a1a;
          padding: 1.5rem 2rem;
          margin-bottom: 3rem;
        }

        .tu-toc-label {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 1rem;
        }

        .tu-toc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.4rem 2rem;
        }

        .tu-toc-item {
          font-size: 12px;
          color: #666;
          font-family: 'Courier New', monospace;
        }

        .tu-section {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 0 3rem;
          padding: 2.5rem 0;
          border-bottom: 1px solid #e0ddd6;
        }

        .tu-section:last-of-type {
          border-bottom: none;
        }

        .tu-section-num {
          font-family: 'Courier New', monospace;
          font-size: 41px;
          color: #bbb;
          padding-top: 5px;
          letter-spacing: 0.05em;
        }

        .tu-section-body h2 {
          font-size: 1.2rem;
          font-weight: 400;
          margin: 0 0 1rem;
          letter-spacing: -0.01em;
          color: #1a1a1a;
        }

        .tu-section-body p {
          font-size: 15px;
          line-height: 1.8;
          color: #555;
          margin: 0 0 0.75rem;
        }

        .tu-section-body ul {
          padding-left: 1.25rem;
          margin: 0 0 0.75rem;
        }

        .tu-section-body li {
          font-size: 15px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 0.3rem;
        }

        .tu-section-body a {
          color: #1a1a1a;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
        }

        .tu-section-body a:hover {
          opacity: 0.6;
        }

        .highlight-box {
          background: #fffbf0;
          border-left: 3px solid #e6a817;
          padding: 0.75rem 1rem;
          margin: 0 0 1rem;
        }

        .highlight-box p {
          color: #7a5a10 !important;
          margin: 0 !important;
          font-size: 14px !important;
        }

        .contact-line {
          margin-top: 0.5rem !important;
        }

        .tu-footer {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 2px solid #1a1a1a;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .tu-footer-brand {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: #1a1a1a;
        }

        .tu-footer-copy {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: #bbb;
        }

        @media (max-width: 600px) {
          .tu-section {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
        }
      `}</style>

      <div className="tu-page">
        {/* Header */}
        <header className="tu-header">
          <p className="tu-eyebrow">Softree Technology — Legal</p>
          <h1 className="tu-title">Terms of Use</h1>
          <div className="tu-meta-row">

            <span className="tu-meta-item">
              <strong>Last Updated:</strong> 20/04/2026
            </span>
          </div>
        </header>

        {/* Intro */}
        <p className="tu-intro">
          Please read these Terms of Use carefully before using the Softree
          Technology website. By accessing or using our website, you agree to
          be bound by these terms. If you do not agree, please discontinue use
          immediately.
        </p>

        {/* Table of Contents */}
        <div className="tu-toc">
          <p className="tu-toc-label">Contents</p>
          <div className="tu-toc-grid">
            {sections.map((s) => (
              <div key={s.id} className="tu-toc-item">
                {String(s.id).padStart(2, "0")} — {s.title}
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        {sections.map((s) => (
          <div key={s.id} className="tu-section">
            <div className="tu-section-num">
              {String(s.id).padStart(2, "0")}
            </div>
            <div className="tu-section-body">
              <h2>{s.title}</h2>
              {s.content}
            </div>
          </div>
        ))}

      
      </div>
      <Footer/>
    </>
  );
}