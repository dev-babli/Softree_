import Footer from "@/components/sections/footer";
import { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/terms", {
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
    type: "website",
  },
  twitter: {
    title: "Terms of Use | Softree Technology",
    description:
      "Understand the terms and conditions for using Softree Technology services.",
  },
}, "Softree Technology Terms of Use");

export default function TermsOfUse() {
  const sections = [
    {
      id: 1,
      title: "About Softree",
      content: (
        <>
          <p>
            Softree Technology Pvt. Ltd. is a technology services and solutions company providing services and solutions across areas including software engineering, artificial intelligence, automation, Microsoft technologies, cloud, data and analytics, and related technology services.
          </p>
          <p>
            The information presented on this Website is primarily provided for general informational and business purposes.
          </p>
          <p>
            Specific services, deliverables, timelines, fees, warranties, service levels, intellectual-property rights, confidentiality obligations, and other customer-specific terms are governed by the applicable proposal, statement of work, master services agreement, or other written agreement between Softree and the customer.
          </p>
          <p>
            These Website Terms do not replace or modify such customer agreements.
          </p>
        </>
      ),
    },
    {
      id: 2,
      title: "Acceptance of These Terms",
      content: (
        <>
          <p>By accessing, browsing, or using the Website, you confirm that:</p>
          <ul>
            <li>You have read and understood these Terms</li>
            <li>You agree to comply with these Terms</li>
            <li>Your use of the Website is lawful</li>
            <li>You have the authority to enter into these Terms where applicable</li>
          </ul>
          <p>
            If you are accessing the Website on behalf of a company or organization, you represent that you have the authority to bind that organization to these Terms.
          </p>
        </>
      ),
    },
    {
      id: 3,
      title: "Permitted Use",
      content: (
        <>
          <p>You may use the Website for lawful purposes, including:</p>
          <ul>
            <li>Learning about Softree</li>
            <li>Reviewing our services and capabilities</li>
            <li>Reading our articles, insights, and resources</li>
            <li>Reviewing case studies</li>
            <li>Contacting Softree</li>
            <li>Exploring business opportunities</li>
            <li>Applying for career opportunities</li>
          </ul>
          <p>You must use the Website responsibly and in accordance with applicable laws.</p>
        </>
      ),
    },
    {
      id: 4,
      title: "Prohibited Activities",
      content: (
        <>
          <p>You must not use the Website to:</p>
          <ul>
            <li>Violate any applicable law or regulation</li>
            <li>Attempt to gain unauthorized access to the Website or related systems</li>
            <li>Interfere with the operation or security of the Website</li>
            <li>Introduce viruses, malware, malicious code, or other harmful material</li>
            <li>Conduct unauthorized penetration testing or security attacks</li>
            <li>Scrape, crawl, copy, or systematically extract Website content without authorization</li>
            <li>Impersonate another person or organization</li>
            <li>Misrepresent your identity or affiliation with Softree</li>
            <li>Infringe intellectual-property or other rights belonging to Softree or third parties</li>
            <li>Use automated systems in a manner that places unreasonable load on our infrastructure</li>
            <li>Attempt to bypass security measures or access controls</li>
            <li>Use the Website to distribute spam or unsolicited communications</li>
            <li>Use Website content for unlawful, misleading, or fraudulent purposes</li>
          </ul>
          <p>Softree may restrict or terminate access to the Website if we reasonably believe that these Terms have been violated.</p>
        </>
      ),
    },
    {
      id: 5,
      title: "Website Content",
      content: (
        <>
          <p>The Website may contain:</p>
          <ul>
            <li>Company information</li>
            <li>Service descriptions</li>
            <li>Technology information</li>
            <li>Articles and insights</li>
            <li>Case studies</li>
            <li>Images and graphics</li>
            <li>Videos</li>
            <li>Downloadable resources</li>
            <li>Career information</li>
            <li>Other materials</li>
          </ul>
          <p>
            We make reasonable efforts to provide useful and accurate information. However, we do not guarantee that Website content will always be:
          </p>
          <ul>
            <li>Complete</li>
            <li>Accurate</li>
            <li>Current</li>
            <li>Error-free</li>
            <li>Available</li>
            <li>Suitable for a particular purpose</li>
          </ul>
          <p>Website content may change without notice.</p>
        </>
      ),
    },
    {
      id: 6,
      title: "No Professional or Technical Advice",
      content: (
        <>
          <p>Information published on the Website is provided for general informational purposes.</p>
          <p>
            Articles, technical content, insights, case studies, and other materials should not be considered professional, legal, financial, security, or technical advice specific to your circumstances.
          </p>
          <p>Technology environments, business requirements, regulatory requirements, and implementation conditions vary.</p>
          <p>
            Before implementing any technology, architecture, solution, recommendation, or approach described on the Website, you should evaluate its suitability for your specific requirements.
          </p>
        </>
      ),
    },
    {
      id: 7,
      title: "Case Studies and Results",
      content: (
        <>
          <p>Softree may publish case studies, project descriptions, customer examples, business outcomes, or other information describing our work.</p>
          <p>These examples are provided for informational purposes.</p>
          <p>Results achieved in a particular project do not guarantee that the same results will be achieved in another environment.</p>
          <p>Project outcomes may depend on factors including:</p>
          <ul>
            <li>Customer requirements</li>
            <li>Existing systems</li>
            <li>Data quality and availability</li>
            <li>Technology environment</li>
            <li>Implementation scope</li>
            <li>Customer resources</li>
            <li>Project duration</li>
            <li>Business processes</li>
            <li>Other project-specific circumstances</li>
          </ul>
          <p>Any commitments regarding project outcomes, deliverables, timelines, performance, or service levels will be governed by the applicable written agreement.</p>
        </>
      ),
    },
    {
      id: 8,
      title: "Intellectual Property",
      content: (
        <>
          <p>Unless otherwise stated, the Website and its contents are owned by or licensed to Softree and are protected by applicable intellectual-property laws.</p>
          <p>This may include:</p>
          <ul>
            <li>Website design and layout</li>
            <li>Text and written content</li>
            <li>Articles and insights</li>
            <li>Graphics</li>
            <li>Images</li>
            <li>Videos</li>
            <li>Case-study content</li>
            <li>Logos and trademarks</li>
            <li>Original technical materials</li>
            <li>Other Website content</li>
          </ul>
          <p>You may access and use Website content for personal or legitimate internal business purposes.</p>
          <p>You may not, without prior written permission from Softree:</p>
          <ul>
            <li>Reproduce substantial portions of Website content</li>
            <li>Republish Website content</li>
            <li>Modify Website content for redistribution</li>
            <li>Sell or commercially exploit Website content</li>
            <li>Create derivative works from Website content</li>
            <li>Systematically copy or extract Website content</li>
            <li>Use Softree materials to create competing content or services</li>
          </ul>
          <p>Nothing in these Terms transfers ownership of Softree's intellectual property to you.</p>
        </>
      ),
    },
    {
      id: 9,
      title: "Softree Trademarks",
      content: (
        <>
          <p>“Softree,” the Softree name, logo, service names, and related marks may be trademarks or other proprietary marks of Softree or their respective owners.</p>
          <p>You may not use Softree trademarks in a manner that:</p>
          <ul>
            <li>Suggests unauthorized affiliation with Softree</li>
            <li>Implies endorsement or sponsorship</li>
            <li>Creates confusion regarding ownership or association</li>
            <li>Uses the marks for commercial purposes without authorization</li>
          </ul>
          <p>Nothing in these Terms grants you any ownership or license rights to Softree trademarks.</p>
        </>
      ),
    },
    {
      id: 10,
      title: "User-Submitted Information",
      content: (
        <>
          <p>The Website may allow you to submit information through contact forms, project enquiry forms, career applications, talent-pool submissions, or other communication channels.</p>
          <p>You are responsible for ensuring that information you submit:</p>
          <ul>
            <li>Is accurate to the best of your knowledge</li>
            <li>Does not violate applicable laws</li>
            <li>Does not infringe another person's rights</li>
            <li>Does not contain malicious software</li>
            <li>Does not contain information you are not authorized to disclose</li>
          </ul>
          <p>You should not submit passwords, financial credentials, government identification numbers, or other highly sensitive information through general Website forms.</p>
          <p>Information submitted to Softree is handled in accordance with our Privacy Policy.</p>
        </>
      ),
    },
    {
      id: 11,
      title: "Confidential Information",
      content: (
        <>
          <p>Submitting information through a general Website form or sending information to Softree does not automatically establish a confidential relationship.</p>
          <p>If you intend to share confidential, proprietary, or commercially sensitive information in connection with a potential engagement, appropriate confidentiality arrangements should be established where necessary.</p>
          <p>Confidentiality obligations relating to customer engagements will be governed by the applicable written agreement, including any non-disclosure agreement (NDA).</p>
        </>
      ),
    },
    {
      id: 12,
      title: "Recruitment and Career Applications",
      content: (
        <>
          <p>Softree may publish employment opportunities and allow individuals to submit applications or resumes through the Website.</p>
          <p>Submitting an application does not guarantee:</p>
          <ul>
            <li>An interview</li>
            <li>Employment</li>
            <li>A particular position</li>
            <li>A particular compensation package</li>
            <li>Any other employment outcome</li>
          </ul>
          <p>Recruitment information will be handled in accordance with our Privacy Policy and applicable laws.</p>
        </>
      ),
    },
    {
      id: 13,
      title: "Third-Party Websites and Services",
      content: (
        <>
          <p>The Website may contain links to third-party websites, platforms, applications, or services.</p>
          <p>These links may be provided for convenience or informational purposes.</p>
          <p>Softree does not control and is not responsible for:</p>
          <ul>
            <li>Third-party content</li>
            <li>Third-party availability</li>
            <li>Third-party security</li>
            <li>Third-party privacy practices</li>
            <li>Third-party products or services</li>
            <li>Third-party terms and conditions</li>
          </ul>
          <p>Your use of third-party websites and services is subject to the terms and policies of the applicable third party.</p>
        </>
      ),
    },
    {
      id: 14,
      title: "AI and Technology Content",
      content: (
        <>
          <p>Softree may publish content relating to artificial intelligence, agentic AI, automation, Microsoft technologies, cloud computing, software engineering, data, analytics, cybersecurity, and other technology areas.</p>
          <p>Technology changes rapidly. As a result, information published on the Website may become outdated or may not apply to a particular technical or business environment.</p>
          <p>Any technology-related information is provided for general informational purposes and should be independently evaluated before implementation.</p>
          <p>Softree does not guarantee that a technology, architecture, tool, platform, methodology, or recommendation discussed on the Website will be appropriate for your specific requirements.</p>
        </>
      ),
    },
    {
      id: 15,
      title: "Website Availability",
      content: (
        <>
          <p>Softree aims to maintain the availability and functionality of the Website but does not guarantee that:</p>
          <ul>
            <li>The Website will always be available</li>
            <li>Access will always be uninterrupted</li>
            <li>The Website will be free from errors</li>
            <li>The Website will be free from harmful components</li>
            <li>All Website content will always be available</li>
            <li>The Website will work with every device, browser, or operating system</li>
          </ul>
          <p>Softree may modify, suspend, restrict, or discontinue any part of the Website at any time.</p>
        </>
      ),
    },
    {
      id: 16,
      title: "Website Security",
      content: (
        <>
          <p>You must not attempt to compromise or interfere with the security or integrity of the Website.</p>
          <p>This includes:</p>
          <ul>
            <li>Unauthorized penetration testing</li>
            <li>Denial-of-service attacks</li>
            <li>Credential attacks</li>
            <li>Unauthorized system access</li>
            <li>Malware distribution</li>
            <li>Vulnerability exploitation</li>
            <li>Circumvention of security controls</li>
          </ul>
          <p>If you believe you have identified a security vulnerability affecting the Website, please notify Softree through an appropriate contact channel rather than attempting to exploit the vulnerability.</p>
        </>
      ),
    },
    {
      id: 17,
      title: "Disclaimer of Warranties",
      content: (
        <>
          <p>To the maximum extent permitted by applicable law, the Website and its content are provided on an “as is” and “as available” basis.</p>
          <p>Softree makes no express or implied warranties regarding the Website, including warranties relating to:</p>
          <ul>
            <li>Accuracy</li>
            <li>Reliability</li>
            <li>Availability</li>
            <li>Fitness for a particular purpose</li>
            <li>Merchantability</li>
            <li>Non-infringement</li>
            <li>Suitability for a particular business or technical requirement</li>
          </ul>
          <p>Nothing in these Terms excludes any warranty or right that cannot legally be excluded under applicable law.</p>
        </>
      ),
    },
    {
      id: 18,
      title: "Limitation of Liability",
      content: (
        <>
          <p>To the maximum extent permitted by applicable law, Softree Technology Pvt. Ltd. and its directors, officers, employees, affiliates, contractors, and representatives will not be liable for indirect, incidental, special, consequential, or punitive damages arising from or related to your access to or use of the Website.</p>
          <p>This may include losses relating to:</p>
          <ul>
            <li>Business interruption</li>
            <li>Loss of profits</li>
            <li>Loss of revenue</li>
            <li>Loss of data</li>
            <li>Loss of business opportunities</li>
            <li>Loss of goodwill</li>
            <li>Reliance on Website content</li>
          </ul>
          <p>Nothing in these Terms limits or excludes liability that cannot legally be limited or excluded.</p>
          <p>Where a separate written agreement exists between Softree and a customer, that agreement will govern the applicable customer relationship, including any applicable limitations of liability.</p>
        </>
      ),
    },
    {
      id: 19,
      title: "Indemnification",
      content: (
        <>
          <p>To the extent permitted by applicable law, you agree to indemnify and hold harmless Softree Technology Pvt. Ltd., its directors, officers, employees, affiliates, contractors, and representatives from claims, liabilities, losses, damages, and expenses arising from:</p>
          <ul>
            <li>Your violation of these Terms</li>
            <li>Your unlawful use of the Website</li>
            <li>Your violation of another person's rights</li>
            <li>Information or materials you submit to the Website</li>
            <li>Your misuse of Website content</li>
          </ul>
          <p>This obligation does not apply to the extent that a claim results from Softree's own unlawful conduct or liability that cannot legally be excluded.</p>
        </>
      ),
    },
    {
      id: 20,
      title: "Privacy",
      content: (
        <>
          <p>Your use of the Website is also subject to our Privacy Policy, which explains how Softree collects, uses, stores, and protects personal information.</p>
          <p>The Privacy Policy forms part of these Terms by reference.</p>
        </>
      ),
    },
    {
      id: 21,
      title: "Cookies",
      content: (
        <>
          <p>Softree may use cookies and similar technologies on the Website.</p>
          <p>Information about our use of cookies is described in our Privacy Policy and, where applicable, our Cookie Policy.</p>
          <p>You may control certain cookies through your browser settings and available Website cookie controls.</p>
        </>
      ),
    },
    {
      id: 22,
      title: "Changes to These Terms",
      content: (
        <>
          <p>Softree may update these Terms from time to time to reflect:</p>
          <ul>
            <li>Changes to our Website</li>
            <li>Changes to our services</li>
            <li>Changes in our business practices</li>
            <li>New technologies</li>
            <li>Changes in applicable laws or regulations</li>
          </ul>
          <p>When we update these Terms, we will revise the “Last Updated” date at the top of this page.</p>
          <p>Your continued use of the Website after updated Terms are posted constitutes acceptance of the revised Terms to the extent permitted by applicable law.</p>
        </>
      ),
    },
    {
      id: 23,
      title: "Governing Law and Jurisdiction",
      content: (
        <>
          <p>These Terms shall be governed by and interpreted in accordance with the laws of India, without regard to conflict-of-law principles.</p>
          <p>Subject to applicable law, disputes arising from or relating to these Terms or your use of the Website shall be subject to the jurisdiction of the competent courts having jurisdiction over Softree Technology Pvt. Ltd.'s Registered Office in Cuttack, Odisha, India.</p>
          <p>Where a separate written agreement exists between Softree and a customer, the governing-law and dispute-resolution provisions of that agreement will apply to the customer relationship.</p>
        </>
      ),
    },
    {
      id: 24,
      title: "Severability",
      content: (
        <>
          <p>If any provision of these Terms is determined to be invalid, unlawful, or unenforceable, that provision will be interpreted or modified to the minimum extent necessary to make it enforceable, where legally permitted.</p>
          <p>The remaining provisions will continue in full force and effect.</p>
        </>
      ),
    },
    {
      id: 25,
      title: "Entire Agreement",
      content: (
        <>
          <p>These Terms, together with the Privacy Policy and any other policies expressly incorporated into these Terms, govern your use of the Website.</p>
          <p>These Terms do not replace, modify, or supersede any separate written agreement between Softree and its customers, partners, employees, vendors, or other parties.</p>
          <p>Where a separate agreement applies, that agreement will govern the applicable relationship to the extent of any conflict with these Website Terms.</p>
        </>
      ),
    },
    {
      id: 26,
      title: "Contact Us",
      content: (
        <>
          <p>If you have questions about these Terms or the Softree Website, please contact us.</p>
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
          
          <p>For legal or contractual matters, please clearly identify the nature of your request in your communication.</p>
        </>
      ),
    },
    {
      id: 27,
      title: "Effective Date",
      content: (
        <>
          <p>These Terms of Service are effective as of September 14, 2026.</p>
          <p>Softree Technology Pvt. Ltd. reserves the right to update these Terms as necessary to reflect changes in our Website, services, business practices, and applicable legal requirements.</p>
        </>
      ),
    },
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
          padding-left: 1.5rem;
          margin: 0 0 1rem;
          list-style-type: disc !important;
          list-style-position: outside;
        }

        .tu-section-body li {
          font-size: 15px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 0.3rem;
          display: list-item !important;
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
          <h1 className="tu-title">Terms of Service</h1>
          <div className="tu-meta-row">

            <span className="tu-meta-item">
              <strong>Last Updated:</strong> September 14, 2026
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