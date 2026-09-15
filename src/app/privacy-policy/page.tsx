import Footer from "@/components/sections/footer";
import { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/privacy-policy", {
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
    type: "website",
  },
  twitter: {
    title: "Privacy Policy | Softree Technology",
    description: "Learn how Softree Technology protects your data and privacy.",
  },
}, "Softree Technology Privacy Policy");

export default function PrivacyPolicy() {
  const sections = [
    {
      id: 1,
      title: "Scope of This Privacy Policy",
      content: (
        <>
          <p>
            This Privacy Policy applies to information collected through the Softree website and through interactions associated with the website, including:
          </p>
          <ul>
            <li>Contact and enquiry forms</li>
            <li>Project and business enquiries</li>
            <li>Discovery-call requests</li>
            <li>Requests for information about our services</li>
            <li>Career and job applications</li>
            <li>Talent-pool submissions</li>
            <li>Website interactions</li>
            <li>Marketing and business communications</li>
            <li>Other communications you initiate with Softree</li>
          </ul>
          <p>
            This Privacy Policy does not necessarily apply to personal information that Softree processes on behalf of a customer as part of a contracted service.
          </p>
          <p>
            Where Softree processes personal information on behalf of a customer, the applicable customer agreement, statement of work, or data-processing terms may govern that processing.
          </p>
        </>
      ),
    },
    {
      id: 2,
      title: "Information We Collect",
      content: (
        <>
          <p>The information we collect depends on how you interact with Softree.</p>
          <h3 className="subsection-title">2.1 Information You Provide</h3>
          <p>You may voluntarily provide personal information when you:</p>
          <ul>
            <li>Contact us through our website</li>
            <li>Submit a project enquiry</li>
            <li>Request a discovery call</li>
            <li>Request information about our services</li>
            <li>Communicate with our sales or delivery teams</li>
            <li>Apply for a position</li>
            <li>Join our talent pool</li>
            <li>Subscribe to communications or resources</li>
            <li>Otherwise communicate with us</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Full name</li>
            <li>Business email address</li>
            <li>Phone number</li>
            <li>Company or organization name</li>
            <li>Job title or role</li>
            <li>Country or location</li>
            <li>Project or business requirements</li>
            <li>Area of expertise</li>
            <li>Professional experience</li>
            <li>Resume or CV</li>
            <li>Information contained in your message</li>
            <li>Other information you voluntarily provide</li>
          </ul>
          <p>Please provide only information that is reasonably necessary for the purpose of your interaction with Softree.</p>

          <h3 className="subsection-title">2.2 Information Collected Automatically</h3>
          <p>When you visit our website, certain technical and usage information may be collected automatically. This may include:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Device type</li>
            <li>Referring website or URL</li>
            <li>Pages visited</li>
            <li>Date and time of access</li>
            <li>Website interactions</li>
            <li>Approximate geographic information</li>
            <li>Diagnostic and performance information</li>
          </ul>
          <p>This information helps us operate, secure, maintain, and improve our website.</p>
        </>
      ),
    },
    {
      id: 3,
      title: "How We Use Your Information",
      content: (
        <>
          <p>Softree may use the information we collect for legitimate business purposes, including to:</p>
          <ul>
            <li>Respond to enquiries and requests</li>
            <li>Understand your business or project requirements</li>
            <li>Arrange discovery calls or meetings</li>
            <li>Provide information about our services</li>
            <li>Communicate with prospective and existing customers</li>
            <li>Manage business relationships</li>
            <li>Evaluate employment applications</li>
            <li>Manage our talent pool</li>
            <li>Improve our website and digital experience</li>
            <li>Understand website usage and performance</li>
            <li>Improve our content and services</li>
            <li>Maintain website and information security</li>
            <li>Detect and prevent fraud, abuse, or unauthorized activity</li>
            <li>Maintain business and operational records</li>
            <li>Comply with applicable legal and regulatory requirements</li>
            <li>Protect Softree's rights, property, systems, and users</li>
          </ul>
          <p>We will not use personal information for purposes that are incompatible with the purpose for which it was collected unless permitted or required by applicable law.</p>
        </>
      ),
    },
    {
      id: 4,
      title: "Business and Marketing Communications",
      content: (
        <>
          <p>When you contact Softree or request information about our services, we may use the information you provide to respond to your request and communicate with you about relevant business matters.</p>
          <p>Where permitted by applicable law, we may also send business, marketing, or informational communications relating to:</p>
          <ul>
            <li>Softree services and capabilities</li>
            <li>Technology insights</li>
            <li>Industry information</li>
            <li>Events and webinars</li>
            <li>Articles and resources</li>
            <li>Company updates</li>
          </ul>
          <p>You may opt out of marketing communications at any time by using the unsubscribe option included in the communication or by contacting us. We may continue to send essential or transactional communications where reasonably necessary.</p>
        </>
      ),
    },
    {
      id: 5,
      title: "Recruitment and Career Information",
      content: (
        <>
          <p>If you apply for a position or submit your information to Softree's talent pool, we may collect information such as:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Area of expertise</li>
            <li>Professional experience</li>
            <li>Resume or CV</li>
            <li>Introduction</li>
            <li>Other information you choose to provide</li>
          </ul>
          <p>We may use this information to:</p>
          <ul>
            <li>Evaluate your suitability for current opportunities</li>
            <li>Consider you for future opportunities</li>
            <li>Contact you regarding relevant positions</li>
            <li>Manage recruitment activities</li>
            <li>Communicate with candidates</li>
            <li>Maintain appropriate recruitment records</li>
          </ul>
          <p>Softree may retain candidate information for a reasonable period where permitted by applicable law. You should not include unnecessary sensitive personal information in your resume or application.</p>
        </>
      ),
    },
    {
      id: 6,
      title: "Cookies and Similar Technologies",
      content: (
        <>
          <p>Softree may use cookies and similar technologies on its website. Cookies may be used to:</p>
          <ul>
            <li>Enable essential website functionality</li>
            <li>Remember preferences</li>
            <li>Understand website traffic and usage</li>
            <li>Measure website performance</li>
            <li>Improve the user experience</li>
            <li>Understand the effectiveness of website content and campaigns</li>
            <li>Support website security</li>
          </ul>
          <p>You can control or disable cookies through your browser settings. Disabling certain cookies may affect the functionality of parts of the website.</p>
          <p>Where required by applicable law, Softree will provide appropriate cookie choices or consent mechanisms for non-essential cookies.</p>
        </>
      ),
    },
    {
      id: 7,
      title: "Analytics and Third-Party Services",
      content: (
        <>
          <p>Softree may use third-party technology providers to support website analytics, hosting, communications, scheduling, security, recruitment, forms, or other business operations.</p>
          <p>These providers may process information on our behalf and may collect information according to their own privacy policies and applicable contractual requirements.</p>
          <p>Where third-party services are used, Softree seeks to use reputable providers and appropriate safeguards consistent with the nature of the information being processed. Softree does not sell personal information collected through its website.</p>
        </>
      ),
    },
    {
      id: 8,
      title: "How We Share Information",
      content: (
        <>
          <p>Softree does not sell or rent your personal information. We may share personal information where reasonably necessary with:</p>
          <h3 className="subsection-title">Service Providers</h3>
          <p>Third-party service providers that support our business operations, including providers of:</p>
          <ul>
            <li>Website hosting</li>
            <li>Cloud infrastructure</li>
            <li>Analytics</li>
            <li>Communication services</li>
            <li>Scheduling services</li>
            <li>Form processing</li>
            <li>Website security</li>
            <li>Recruitment services</li>
            <li>Other technology and business services</li>
          </ul>
          <p>These providers may process information on our behalf and are expected to handle information in accordance with applicable contractual and legal requirements.</p>
          <br />
          <h3 className="subsection-title">Legal and Regulatory Authorities</h3>
          <p>We may disclose information where reasonably necessary to:</p>
          <ul>
            <li>Comply with applicable law</li>
            <li>Respond to lawful requests from authorities</li>
            <li>Protect our legal rights</li>
            <li>Investigate suspected fraud or unlawful activity</li>
            <li>Protect the safety, security, or property of Softree or others</li>
          </ul>
          <br />
          <h3 className="subsection-title">Business Transactions</h3>
          <p>Personal information may be transferred as part of a merger, acquisition, restructuring, financing, sale of assets, or similar corporate transaction, subject to applicable law.</p>
        </>
      ),
    },
    {
      id: 9,
      title: "International Data Processing",
      content: (
        <>
          <p>Softree works with customers, partners, and service providers across multiple countries. As a result, personal information may be accessed, processed, or stored in countries other than the country in which you reside.</p>
          <p>Where applicable, Softree will take reasonable measures to ensure that international transfers and processing of personal information are handled in accordance with applicable privacy and data-protection requirements.</p>
        </>
      ),
    },
    {
      id: 10,
      title: "Data Retention",
      content: (
        <>
          <p>We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including where necessary to:</p>
          <ul>
            <li>Respond to enquiries</li>
            <li>Maintain business relationships</li>
            <li>Provide services</li>
            <li>Manage recruitment</li>
            <li>Maintain business records</li>
            <li>Meet legal, accounting, or regulatory obligations</li>
            <li>Resolve disputes</li>
            <li>Enforce agreements</li>
            <li>Protect our legitimate business interests</li>
          </ul>
          <p>Retention periods may vary depending on the nature of the information and the purpose for which it was collected. When information is no longer required, we may securely delete, anonymize, or otherwise dispose of it in accordance with applicable requirements.</p>
        </>
      ),
    },
    {
      id: 11,
      title: "Data Security",
      content: (
        <>
          <p>Softree takes reasonable technical and organizational measures designed to protect personal information against unauthorized access, disclosure, alteration, loss, misuse, or destruction.</p>
          <p>These measures may include appropriate access controls, security practices, monitoring, and operational safeguards.</p>
          <p>However, no method of transmission over the Internet or method of electronic storage is completely secure. Accordingly, while we take reasonable steps to protect information, we cannot guarantee absolute security.</p>
        </>
      ),
    },
    {
      id: 12,
      title: "Your Privacy Rights",
      content: (
        <>
          <p>Depending on your location and the laws applicable to you, you may have certain rights regarding your personal information. These rights may include:</p>
          <ul>
            <li>Requesting access to personal information we hold about you</li>
            <li>Requesting correction of inaccurate information</li>
            <li>Requesting deletion of personal information, subject to applicable exceptions</li>
            <li>Objecting to certain processing</li>
            <li>Requesting restriction of certain processing</li>
            <li>Withdrawing consent where processing is based on consent</li>
            <li>Requesting portability of certain information</li>
            <li>Opting out of certain marketing communications</li>
            <li>Lodging a complaint with an applicable privacy or data-protection authority</li>
          </ul>
          <p>To exercise an applicable privacy right, please contact us using the information provided below. We may need to verify your identity before fulfilling certain requests.</p>
        </>
      ),
    },
    {
      id: 13,
      title: "Children's Privacy",
      content: (
        <>
          <p>Our website and services are intended primarily for business and professional audiences. We do not knowingly solicit or collect personal information from children under the age of 18 through our website.</p>
          <p>If you believe that a child has provided personal information to Softree, please contact us so that we can take appropriate action in accordance with applicable law.</p>
        </>
      ),
    },
    {
      id: 14,
      title: "External Websites",
      content: (
        <>
          <p>Our website may contain links to third-party websites, applications, platforms, or services. This Privacy Policy applies only to Softree's website and does not govern the privacy practices of third-party websites.</p>
          <p>Softree is not responsible for the privacy practices, security, content, or policies of external websites. We encourage you to review the privacy policies of third-party websites before providing them with personal information.</p>
        </>
      ),
    },
    {
      id: 15,
      title: "Confidential and Sensitive Information",
      content: (
        <>
          <p>Softree's general website forms are not intended to collect highly sensitive personal information or confidential business information unless specifically requested.</p>
          <p>Please do not submit the following through general website forms:</p>
          <ul>
            <li>Passwords</li>
            <li>Financial account credentials</li>
            <li>Government identification numbers</li>
            <li>Highly sensitive personal information</li>
            <li>Confidential customer information</li>
            <li>Trade secrets</li>
            <li>Proprietary business information</li>
          </ul>
          <p>If confidential information is required for a potential engagement, appropriate confidentiality arrangements, including a non-disclosure agreement (NDA) where applicable, may be established before detailed information is shared.</p>
        </>
      ),
    },
    {
      id: 16,
      title: "Information Processed on Behalf of Customers",
      content: (
        <>
          <p>As part of providing software engineering, AI, automation, Microsoft, cloud, data, analytics, or other technology services, Softree may process personal information on behalf of its customers.</p>
          <p>In such circumstances, Softree's responsibilities may be governed by the applicable customer agreement, statement of work, data-processing terms, or other contractual arrangements.</p>
          <p>Where Softree acts as a service provider or processor on behalf of a customer, the customer may remain responsible for determining the purposes and means of processing.</p>
        </>
      ),
    },
    {
      id: 17,
      title: "Do Not Track Signals",
      content: (
        <>
          <p>Some browsers provide a “Do Not Track” or similar functionality. Because there is currently no universally accepted standard for responding to such signals, our website may not respond to all browser-based Do Not Track settings.</p>
          <p>Where applicable law requires a specific response to browser-based privacy signals, Softree will follow the requirements applicable to us.</p>
        </>
      ),
    },
    {
      id: 18,
      title: "Changes to This Privacy Policy",
      content: (
        <>
          <p>Softree may update this Privacy Policy from time to time to reflect:</p>
          <ul>
            <li>Changes to our business</li>
            <li>Changes to our website</li>
            <li>New technologies or services</li>
            <li>Changes in our information practices</li>
            <li>Changes in applicable privacy laws or regulations</li>
          </ul>
          <p>When we make changes, we will update the “Last Updated” date at the top of this page. We encourage you to review this Privacy Policy periodically.</p>
        </>
      ),
    },
    {
      id: 19,
      title: "Contact Us",
      content: (
        <>
          <p>If you have questions about this Privacy Policy, our privacy practices, or your personal information, please contact us.</p>
          
          <h3 className="subsection-title">Softree Technology Pvt. Ltd.</h3>
          
          <p><strong>Registered Office — Cuttack, India</strong><br />
          Plot 5C/1283, Sector-10, CDA<br />
          Cuttack, Odisha 753014<br />
          India</p>
          
          <p><strong>Bengaluru Office — India</strong><br />
          Bengaluru<br />
          Karnataka<br />
          India</p>
          
          <p><strong>United States Sales Office</strong><br />
          28 Geary St., Suite 650<br />
          San Francisco, CA 94108<br />
          United States</p>
          
          <p className="contact-line">
            Email: <a href="mailto:sales@softreetechnology.com">sales@softreetechnology.com</a><br />
            Website: <a href="http://www.softreetechnology.com/" target="_blank" rel="noreferrer">www.softreetechnology.com</a>
          </p>
          
          <p>For privacy-related requests, please include “Privacy Request” in the subject line of your email and provide sufficient information for us to understand and respond to your request.</p>
        </>
      ),
    },
    {
      id: 20,
      title: "Effective Date",
      content: (
        <p>This Privacy Policy is effective as of September 14, 2026. Softree Technology Pvt. Ltd. reserves the right to update this Privacy Policy as necessary to reflect changes in our business, technology, information practices, and applicable legal requirements.</p>
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
          color: #999;
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
          color: #aaa;
        }

        .pp-meta-item strong {
          color: #666;
          font-weight: normal;
        }

        .pp-intro {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #555;
          max-width: 640px;
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e0ddd6;
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
          color: #999;
          margin-bottom: 1rem;
        }

        .pp-toc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.4rem 2rem;
        }

        .pp-toc-item {
          font-size: 12px;
          color: #666;
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
          padding-left: 1.5rem;
          margin: 0 0 1rem;
          list-style-type: disc !important;
          list-style-position: outside;
        }

        .pp-section-body li {
          font-size: 15px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 0.25rem;
          display: list-item !important;
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
        }
      `}</style>

      <div className="pp-page">
        {/* Header */}
        <header className="pp-header">
          <p className="pp-eyebrow">Softree Technology — Legal</p>
          <h1 className="pp-title">Privacy Policy</h1>
          <div className="pp-meta-row">
            <span className="pp-meta-item">
              <strong>Last Updated:</strong> September 14, 2026
            </span>
          </div>
        </header>

        {/* Intro */}
        <p className="pp-intro">
          Softree Technology Pvt. Ltd. (“Softree,” “we,” “our,” or “us”) respects your privacy and is committed to protecting the personal information entrusted to us.
          This Privacy Policy explains how Softree collects, uses, stores, shares, and protects information when you visit or interact with our website, www.softreetechnology.com, submit an enquiry, contact us, apply for a position, or otherwise communicate with us through our digital channels.
          By accessing or using our website, you acknowledge the practices described in this Privacy Policy.
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
