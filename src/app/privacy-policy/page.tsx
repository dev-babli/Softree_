import Footer from "@/components/sections/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Softree Technology",
  description:
    "Read Softree Technology’s Privacy Policy to understand how we collect, use, and protect your information.",
  keywords: [
    "Privacy Policy",
    "Softree Technology Privacy",
    "data protection",
    "privacy policy India",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Softree Technology",
    description: "Learn how Softree Technology protects your data and privacy.",
    url: "https://www.softreetechnology.com/privacy-policy",
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
    title: "Privacy Policy | Softree Technology",
    description: "Learn how Softree Technology protects your data and privacy.",
    images: ["/og-image.png"],
  },
};

export default function PrivacyPolicy() {
  const sections = [
    {
      id: 1,
      title: "Introduction",
      content: (
        <>
          <p>
            This Privacy Policy explains how Softree Technology collects, uses,
            discloses, and safeguards your information when you visit our
            website.
          </p>
          <p>
            By using our website, you agree to the terms of this Privacy Policy.
          </p>
        </>
      ),
    },
    {
      id: 2,
      title: "Information We Collect",
      content: (
        <>
          <p>We may collect the following types of information:</p>
          <h3 className="subsection-title">a. Personal Information</h3>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Company name</li>
          </ul>
          <h3 className="subsection-title">b. Technical Information</h3>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
          </ul>
          <h3 className="subsection-title">c. Usage Data</h3>
          <ul>
            <li>Pages visited</li>
            <li>Time spent on pages</li>
            <li>Referral sources</li>
          </ul>
          <h3 className="subsection-title">
            d. Cookies &amp; Tracking Technologies
          </h3>
          <p>
            We use cookies and similar technologies to enhance user experience
            and analyze website traffic.
          </p>
        </>
      ),
    },
    {
      id: 3,
      title: "How We Use Your Information",
      content: (
        <ul>
          <li>Provide and maintain our services</li>
          <li>Improve website performance and user experience</li>
          <li>Respond to inquiries and customer support requests</li>
          <li>
            Send updates, newsletters, or marketing communications (with
            consent)
          </li>
          <li>Ensure website security and prevent fraud</li>
        </ul>
      ),
    },
    {
      id: 4,
      title: "Sharing of Information",
      content: (
        <>
          <p>
            We do not sell or rent your personal data. We may share it with:
          </p>
          <ul>
            <li>
              Trusted third-party service providers (e.g., analytics, hosting)
            </li>
            <li>Legal authorities when required by law</li>
            <li>Business partners in case of mergers or acquisitions</li>
          </ul>
        </>
      ),
    },
    {
      id: 5,
      title: "Data Security",
      content: (
        <p>
          We implement appropriate technical and organizational measures to
          protect your data. However, no method of transmission over the
          Internet is 100% secure.
        </p>
      ),
    },
    {
      id: 6,
      title: "Data Retention",
      content: (
        <p>
          We retain your personal data only as long as necessary for the
          purposes outlined in this policy or as required by law.
        </p>
      ),
    },
    {
      id: 7,
      title: "Your Rights",
      content: (
        <ul>
          <li>Access your personal data</li>
          <li>Request correction or deletion</li>
          <li>Withdraw consent at any time</li>
          <li>Object to data processing</li>
        </ul>
      ),
    },
    {
      id: 8,
      title: "Third-Party Links",
      content: (
        <p>
          Our website may contain links to external websites. We are not
          responsible for the privacy practices of those websites.
        </p>
      ),
    },
    {
      id: 9,
      title: "Updates to This Policy",
      content: (
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated date.
        </p>
      ),
    },
    {
      id: 10,
      title: "Contact Us",
      content: (
        <>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us:
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

          <p>
            📞 Phone: <a href="tel:+917008699927">+91 70086 99927</a>
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
    },
  ];

  return (
    <>
      <style>{`
        .pp-page {
          max-width: 860px;
          margin: 0 auto;
          padding: 4rem 2rem 6rem;
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #1a1a1a;
          background: #faf9f7;
          min-height: 100vh;
        }

        .pp-header {
          border-bottom: 2px solid #1a1a1a;
          padding-bottom: 2rem;
          margin-bottom: 2.5rem;
        }

        .pp-eyebrow {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 0.75rem;
        }

        .pp-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 400;
          line-height: 1.05;
          margin: 0 0 1.5rem;
          letter-spacing: -0.02em;
          color: #1a1a1a;
        }

        .pp-meta-row {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .pp-meta-item {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: #888;
        }

        .pp-meta-item strong {
          color: #444;
          font-weight: normal;
        }

        .pp-intro {
          font-size: 1.1rem;
          line-height: 1.75;
          color: #444;
          max-width: 640px;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #ddd;
        }

        .pp-toc {
          background: #f0ede6;
          border-left: 3px solid #1a1a1a;
          padding: 1.5rem 2rem;
          margin-bottom: 3rem;
        }

        .pp-toc-label {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 1rem;
        }

        .pp-toc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.4rem 2rem;
        }

        .pp-toc-item {
          font-size: 13px;
          color: #555;
          font-family: 'Courier New', monospace;
        }

        .pp-section {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 0 3rem;
          padding: 2.5rem 0;
          border-bottom: 1px solid #e0ddd6;
        }

        .pp-section:last-of-type {
          border-bottom: none;
        }

        .pp-section-num {
          font-family: 'Courier New', monospace;
          font-size: 41px;
          color: #aaa;
          padding-top: 5px;
          letter-spacing: 0.05em;
        }

        .pp-section-body h2 {
          font-size: 1.25rem;
          font-weight: 400;
          margin: 0 0 1rem;
          letter-spacing: -0.01em;
          color: #1a1a1a;
        }

        .pp-section-body p {
          font-size: 15px;
          line-height: 1.8;
          color: #555;
          margin: 0 0 0.75rem;
        }

        .pp-section-body ul {
          padding-left: 1.25rem;
          margin: 0 0 0.75rem;
        }

        .pp-section-body li {
          font-size: 15px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 0.25rem;
        }

        .subsection-title {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #888 !important;
          margin: 1.25rem 0 0.5rem !important;
          font-weight: normal !important;
        }

        .contact-line {
          margin-top: 0.75rem !important;
        }

        .pp-section-body a {
          color: #1a1a1a;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
        }

        .pp-section-body a:hover {
          opacity: 0.6;
        }

        .pp-footer {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 2px solid #1a1a1a;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .pp-footer-brand {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: #1a1a1a;
        }

        .pp-footer-copy {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: #aaa;
        }

        @media (max-width: 600px) {
          .pp-section {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          .pp-section-num {
            font-size: 10px;
          }
        }
      `}</style>

      <div className="pp-page">
        {/* Header */}
        <header className="pp-header">
          <p className="pp-eyebrow">Softree Technology — Legal</p>
          <h1 className="pp-title">Privacy Policy</h1>
          <div className="pp-meta-row">
            <span className="pp-meta-item">
              <strong>Last Updated:</strong> 20/04/2026
            </span>
          </div>
        </header>

        {/* Intro */}
        <p className="pp-intro">
          Welcome to Softree Technology ("we", "our", "us"). We are committed to
          protecting your privacy and ensuring that your personal information is
          handled in a safe and responsible manner.
        </p>

        {/* Table of Contents */}
        <div className="pp-toc">
          <p className="pp-toc-label">Contents</p>
          <div className="pp-toc-grid">
            {sections.map((s) => (
              <div key={s.id} className="pp-toc-item">
                {s.id < 10 ? `0${s.id}` : s.id} — {s.title}
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        {sections.map((s) => (
          <div key={s.id} className="pp-section">
            <div className="pp-section-num">
              {s.id < 10 ? `0${s.id}` : s.id}
            </div>
            <div className="pp-section-body">
              <h2>{s.title}</h2>
              {s.content}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
