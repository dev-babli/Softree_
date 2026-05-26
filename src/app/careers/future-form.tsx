"use client";
import React, { useState } from "react";

export default function FutureForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "AI & ML",
    message: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const emailAddress = "shradhab@softreetechnology.com";
  const mailtoUrl = `mailto:${emailAddress}?subject=Job%20Application%20-%20Softree%20Careers&body=Dear%20hiring%20team,%0A%0A`;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setResumeFile(file);
        setErrors((prev) => ({ ...prev, resume: "" }));
      } else {
        setErrors((prev) => ({ ...prev, resume: "Please upload a PDF or Word document." }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!resumeFile) newErrors.resume = "Please upload your resume.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Clear any previous submission error
    if (errors.submit) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.submit;
        return next;
      });
    }

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("department", formData.department);
    data.append("message", formData.message || "");
    data.append("jobTitle", `JOIN OUR TALENT POOL - ${formData.department}`);
    if (resumeFile) {
      data.append("resume", resumeFile);
    }

    try {
      const response = await fetch("https://formspree.io/f/mbdwbkad", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ fullName: "", email: "", department: "AI & ML", message: "" });
        setResumeFile(null);
      } else {
        const errData = await response.json();
        const errorMessage = errData?.error || errData?.errors?.[0]?.message || "Failed to submit application. Please try again.";
        setIsSubmitting(false);
        setErrors((prev) => ({ ...prev, submit: errorMessage }));
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrors((prev) => ({ ...prev, submit: "A network error occurred. Please check your connection and try again." }));
    }
  };

  const handleCopyEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section style={s.section}>
      <style>{`
        .future-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          align-items: stretch;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }
        @media (max-width: 991px) {
          .future-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
        .future-card-left {
          background: linear-gradient(135deg, #111111 0%, #161616 100%);
          border: 1px solid #242424;
          border-radius: 16px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .future-card-left::before {
          content: '';
          position: absolute;
          top: -50px;
          left: -50px;
          width: 150px;
          height: 150px;
          background: #F97316;
          opacity: 0.05;
          filter: blur(50px);
          border-radius: 50%;
          pointer-events: none;
        }
        .future-card-right {
          background: #0F0F0F;
          border: 1px solid #242424;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        @media (max-width: 480px) {
          .future-card-left, .future-card-right {
            padding: 24px;
          }
        }
        .email-badge {
          background: #1C1C1C;
          border: 1px solid #2E2E2E;
          border-radius: 12px;
          padding: 16px 20px;
          margin-top: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          transition: border-color 0.2s;
        }
        .email-badge:hover {
          border-color: #F97316;
        }
        .email-link {
          color: #FFFFFF;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.02em;
          font-family: 'Syne', sans-serif;
        }
        .copy-btn {
          background: transparent;
          border: none;
          color: #F97316;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          font-family: inherit;
          padding: 4px 8px;
          border-radius: 4px;
          transition: background 0.15s;
        }
        .copy-btn:hover {
          background: rgba(249, 115, 22, 0.08);
        }
        .future-input {
          background: #141414;
          border: 1px solid #222222;
          border-radius: 8px;
          color: #FFFFFF;
          padding: 10px 14px;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .future-input:focus {
          border-color: #F97316;
        }
        .future-input.error {
          border-color: #EF4444;
        }
        .future-select {
          background: #141414;
          border: 1px solid #222222;
          border-radius: 8px;
          color: #FFFFFF;
          padding: 10px 14px;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          cursor: pointer;
          width: 100%;
          box-sizing: border-box;
        }
        .future-textarea {
          background: #141414;
          border: 1px solid #222222;
          border-radius: 8px;
          color: #FFFFFF;
          padding: 10px 14px;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          resize: none;
          width: 100%;
          box-sizing: border-box;
        }
        .future-upload {
          background: #141414;
          border: 2px dashed #242424;
          border-radius: 8px;
          padding: 14px 10px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .future-upload.active {
          border-color: #F97316;
          background: rgba(249, 115, 22, 0.04);
        }
        .future-upload.error {
          border-color: #EF4444;
        }
      `}</style>

      <div className="future-grid">
        {/* Left Column: Direct Email + Text */}
        <div className="future-card-left">
          <div>
            <span style={s.eyebrow}>Talent Community</span>
            <h2 style={s.title}>Didn't find what you were looking for?</h2>
            <p style={s.desc}>
              We are constantly growing and looking for remarkable talent in AI, cloud systems, QA automation, and enterprise web solutions. Submit your profile here to be considered for our future open positions.
            </p>
          </div>

          <div>
            <div style={s.orDivider}>
              <span style={s.orLine} />
              <span style={s.orText}>OR SEND DIRECTLY</span>
              <span style={s.orLine} />
            </div>

            <p style={s.emailNote}>
              Drop your CV and a brief introduction directly into our recruiter mailbox:
            </p>

            <div 
              className="email-badge" 
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.location.href = mailtoUrl;
              }}
            >
              <a href={mailtoUrl} className="email-link" onClick={(e) => e.stopPropagation()}>
                ✉ {emailAddress}
              </a>
              <button className="copy-btn" onClick={handleCopyEmail}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Spontaneous Form */}
        <div className="future-card-right">
          {isSubmitted ? (
            <div style={s.successBox}>
              <div style={s.successRing}>✓</div>
              <h3 style={s.successTitle}>Profile Added to Talent Pool!</h3>
              <p style={s.successText}>
                Thank you! We've saved your details. If an opportunity matching your background opens up, our hiring team will reach out directly.
              </p>
              <button
                style={s.resetBtn}
                onClick={() => setIsSubmitted(false)}
              >
                Submit another profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={s.form}>
              <h3 style={s.formTitle}>JOIN OUR TALENT POOL</h3>

              <div style={s.formGroup}>
                <label style={s.label}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`future-input ${errors.fullName ? "error" : ""}`}
                  placeholder="John Doe"
                />
                {errors.fullName && <span style={s.errorText}>{errors.fullName}</span>}
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`future-input ${errors.email ? "error" : ""}`}
                  placeholder="john@example.com"
                />
                {errors.email && <span style={s.errorText}>{errors.email}</span>}
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Area of Expertise / Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="future-select"
                >
                  <option value="AI & ML">AI & Machine Learning</option>
                  <option value="Power Apps & Platform">Power Platform / Apps</option>
                  <option value="Power BI & Analytics">Power BI & Analytics</option>
                  <option value="QA & Testing Automation">QA & Testing Automation</option>
                  <option value="Web & Full Stack">Web & Full Stack Dev</option>
                  <option value="Marketing & HR">Marketing & HR</option>
                  <option value="Mobile Development">Mobile Development</option>
                </select>
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Resume / CV * (PDF, DOC, DOCX)</label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`future-upload ${isDragOver ? "active" : ""} ${
                    errors.resume ? "error" : ""
                  }`}
                >
                  <input
                    type="file"
                    id="future-resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="future-resume" style={s.uploadLabel}>
                    <span style={s.uploadIcon}>⬆</span>
                    {resumeFile ? (
                      <span style={{ color: "#FFFFFF", fontSize: "12px" }}>
                        Selected: <strong>{resumeFile.name}</strong>
                      </span>
                    ) : (
                      <span><strong>Upload CV</strong> or drag here</span>
                    )}
                  </label>
                </div>
                {errors.resume && <span style={s.errorText}>{errors.resume}</span>}
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>Brief Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={2}
                  className="future-textarea"
                  placeholder="Introduce yourself or mention your ideal role..."
                  style={{ height: "54px" }}
                />
              </div>

              {errors.submit && (
                <div style={{ ...s.errorText, fontSize: "12px", marginBottom: "8px" }}>
                  {errors.submit}
                </div>
              )}
              <button type="submit" style={s.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? "Adding to Talent Pool..." : "Join Talent Pool →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const ORANGE = "#F97316";
const BLACK = "#080808";
const WHITE = "#FFFFFF";
const GRAY = "#888888";
const RED = "#EF4444";

const s: Record<string, React.CSSProperties> = {
  section: {
    padding: "60px 24px 80px",
    background: BLACK,
    fontFamily: "'Outfit', 'DM Sans', sans-serif",
    position: "relative",
    borderTop: "1px solid #1C1C1C",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: ORANGE,
    marginBottom: "8px",
    display: "block",
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "28px",
    fontWeight: 800,
    color: WHITE,
    margin: "0 0 16px",
    lineHeight: 1.2,
  },
  desc: {
    fontSize: "14px",
    color: GRAY,
    lineHeight: 1.6,
    margin: "0 0 24px",
    fontWeight: 300,
  },
  orDivider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "24px 0",
  },
  orLine: {
    flex: 1,
    height: "1px",
    background: "#222222",
  },
  orText: {
    fontSize: "10px",
    color: "#444444",
    fontWeight: 600,
    letterSpacing: "0.1em",
  },
  emailNote: {
    fontSize: "13px",
    color: GRAY,
    lineHeight: 1.5,
    margin: "0 0 12px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  formTitle: {
    fontFamily: "'Outfit', 'DM Sans', sans-serif",
    fontSize: "20px",
    fontWeight: 700,
    color: ORANGE,
    margin: "0 0 8px 0",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    fontSize: "11px",
    fontWeight: 600,
    color: WHITE,
  },
  errorText: {
    fontSize: "10px",
    color: RED,
    marginTop: "2px",
  },
  uploadLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    color: GRAY,
    fontSize: "12px",
    cursor: "pointer",
  },
  uploadIcon: {
    color: ORANGE,
    fontSize: "14px",
  },
  submitBtn: {
    background: ORANGE,
    border: "none",
    borderRadius: "8px",
    color: WHITE,
    padding: "12px 20px",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    marginTop: "6px",
    transition: "background 0.15s",
  },
  successBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "40px 10px",
  },
  successRing: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "rgba(249,115,22,0.1)",
    border: `2px solid ${ORANGE}`,
    color: ORANGE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  successTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "22px",
    fontWeight: 800,
    color: WHITE,
    margin: "0 0 8px 0",
  },
  successText: {
    fontSize: "13px",
    color: GRAY,
    lineHeight: 1.5,
    maxWidth: "340px",
    margin: "0 0 20px 0",
    fontWeight: 300,
  },
  resetBtn: {
    background: "transparent",
    border: `1px solid ${ORANGE}`,
    borderRadius: "8px",
    color: ORANGE,
    padding: "8px 16px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
};
