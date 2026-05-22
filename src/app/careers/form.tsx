"use client";
import React, { useState, useEffect } from "react";

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

export default function ApplicationForm({ isOpen, onClose, jobTitle }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "Mid-level",
    portfolio: "",
    coverLetter: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prevent scroll behind the modal when it's open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
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
    data.append("phone", formData.phone);
    data.append("experience", formData.experience);
    data.append("portfolio", formData.portfolio || "");
    data.append("coverLetter", formData.coverLetter || "");
    data.append("jobTitle", jobTitle);
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

  return (
    <div className="modal-overlay">
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .modal-box {
          position: relative;
          background: #0F0F0F;
          border: 1px solid #282828;
          border-radius: 16px;
          width: 100%;
          max-width: 820px;
          z-index: 10000;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(249, 115, 22, 0.08);
          font-family: 'Outfit', 'DM Sans', sans-serif;
          color: #FFFFFF;
          overflow-y: auto;
          max-height: 95vh;
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 20px;
          background: transparent;
          border: none;
          color: #777777;
          font-size: 24px;
          cursor: pointer;
          line-height: 1;
          z-index: 10;
          transition: color 0.15s;
        }
        .modal-close:hover {
          color: #F97316;
        }
        .modal-body {
          padding: 24px 32px;
        }
        .modal-header {
          margin-bottom: 16px;
        }
        .modal-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #F97316;
          display: block;
          margin-bottom: 2px;
        }
        .modal-title {
          font-family: 'Syne', 'Outfit', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .modal-subtitle {
          font-size: 12px;
          color: #888888;
          margin-top: 3px;
          margin-bottom: 0;
          font-weight: 300;
        }
        .modal-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .modal-box {
            max-width: 480px;
          }
          .modal-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .modal-body {
            padding: 20px;
          }
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 10px;
        }
        .form-group-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .form-label {
          font-size: 11px;
          font-weight: 600;
          color: #E2E8F0;
          letter-spacing: 0.01em;
        }
        .form-input {
          background: #141414;
          border: 1px solid #222222;
          border-radius: 8px;
          color: #FFFFFF;
          padding: 8px 12px;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          border-color: #F97316;
          box-shadow: 0 0 6px rgba(249, 115, 22, 0.12);
        }
        .form-input.error {
          border-color: #EF4444;
        }
        .form-select {
          background: #141414;
          border: 1px solid #222222;
          border-radius: 8px;
          color: #FFFFFF;
          padding: 8px 12px;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          cursor: pointer;
        }
        .form-textarea {
          background: #141414;
          border: 1px solid #222222;
          border-radius: 8px;
          color: #FFFFFF;
          padding: 8px 12px;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          resize: none;
        }
        .form-upload-zone {
          background: #141414;
          border: 2px dashed #242424;
          border-radius: 8px;
          padding: 12px 10px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .form-upload-zone.active {
          border-color: #F97316;
          background: rgba(249, 115, 22, 0.04);
        }
        .form-upload-zone.error {
          border-color: #EF4444;
        }
        .form-upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          color: #888888;
          font-size: 11px;
          cursor: pointer;
        }
        .form-upload-icon {
          font-size: 16px;
          color: #F97316;
          margin-bottom: 2px;
        }
        .form-error-msg {
          font-size: 10px;
          color: #EF4444;
          margin-top: 1px;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 12px;
        }
        .btn-cancel {
          background: transparent;
          border: 1px solid #222222;
          border-radius: 8px;
          color: #888888;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
        }
        .btn-cancel:hover {
          border-color: #555555;
          color: #FFFFFF;
        }
        .btn-submit {
          background: #F97316;
          border: none;
          border-radius: 8px;
          color: #FFFFFF;
          padding: 8px 20px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          font-family: inherit;
        }
        .btn-submit:hover {
          background: #EA6C0A;
        }
        .btn-submit:active {
          transform: scale(0.98);
        }
        .success-box {
          padding: 32px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .success-ring {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(249, 115, 22, 0.1);
          border: 2px solid #F97316;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 0 16px rgba(249, 115, 22, 0.1);
        }
        .success-check {
          font-size: 24px;
          color: #F97316;
          line-height: 1;
        }
        .success-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 8px 0;
        }
        .success-text {
          font-size: 13px;
          color: #888888;
          line-height: 1.5;
          max-width: 360px;
          margin: 0 0 20px 0;
          font-weight: 300;
        }
        .spinner-icon {
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
          margin-right: 6px;
          vertical-align: middle;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close form">
          ×
        </button>

        {isSubmitted ? (
          <div className="success-box">
            <div className="success-ring">
              <span className="success-check">✓</span>
            </div>
            <h2 className="success-title">Application Submitted!</h2>
            <p className="success-text">
              Thanks for applying for the <strong>{jobTitle}</strong> role. Our recruitment team will review your application and respond within 48 hours.
            </p>
            <button className="btn-submit" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <div className="modal-body">
            <div className="modal-header">
              <span className="modal-eyebrow">Apply for position</span>
              <h2 className="modal-title">{jobTitle}</h2>
              <p className="modal-subtitle">
                Fill out the required information to apply.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-grid">
                {/* Left Column: Form Fields */}
                <div>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.fullName ? "error" : ""}`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? "error" : ""}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className="form-error-msg">{errors.email}</span>}
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-input ${errors.phone ? "error" : ""}`}
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Experience Level *</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="Junior">Junior (0-2y)</option>
                        <option value="Mid-level">Mid-level (2-5y)</option>
                        <option value="Senior">Senior (5y+)</option>
                        <option value="Lead">Lead / Manager</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Portfolio / LinkedIn URL</label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>

                {/* Right Column: Resume & Message */}
                <div>
                  <div className="form-group">
                    <label className="form-label">Resume / CV * (PDF, DOC, DOCX)</label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`form-upload-zone ${isDragOver ? "active" : ""} ${
                        errors.resume ? "error" : ""
                      }`}
                    >
                      <input
                        type="file"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="resume" className="form-upload-label">
                        <span className="form-upload-icon">⬆</span>
                        {resumeFile ? (
                          <span style={{ color: "#FFFFFF" }}>
                            <strong>Selected:</strong> {resumeFile.name} (
                            {(resumeFile.size / 1024 / 1024).toFixed(2)}MB)
                          </span>
                        ) : (
                          <span>
                            <strong>Upload</strong> or drop resume here
                          </span>
                        )}
                      </label>
                    </div>
                    {errors.resume && <span className="form-error-msg">{errors.resume}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cover Letter / Message</label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows={3}
                      className="form-textarea"
                      placeholder="Tell us why you are the perfect fit..."
                      style={{ height: "76px" }}
                    />
                  </div>

                  {errors.submit && (
                    <div className="form-error-msg" style={{ fontSize: "11px", marginBottom: "8px", textAlign: "right" }}>
                      {errors.submit}
                    </div>
                  )}
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span>
                          <span className="spinner-icon" />
                          Submitting...
                        </span>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
