"use client";

/* ─────────────────────────────────────────────────────────────────────
 *  Application Form — Light modal
 *  ──────────────
 *  Modal that mirrors the editorial language: cream surface, white card,
 *  thin neutral borders, amber accents on focus + buttons. Posts to the
 *  same Formspree endpoint the dark version uses.
 * ───────────────────────────────────────────────────────────────────── */

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, UploadCloud, CheckCircle2 } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ApplicationFormLightProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
}

export default function ApplicationFormLight({
    isOpen,
    onClose,
    jobTitle,
}: ApplicationFormLightProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        experience: "Mid-level (2–5y)",
        portfolio: "",
        coverLetter: "",
    });
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        if (typeof document === "undefined") return;
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            // Reset on close
            setStatus("idle");
            setErrors({});
        }
    }, [isOpen]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleFile = (file: File | null) => {
        if (!file) return;
        const valid = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (!valid.includes(file.type)) {
            setErrors((prev) => ({ ...prev, resume: "Please upload a PDF or Word document." }));
            return;
        }
        setResumeFile(file);
        setErrors((prev) => ({ ...prev, resume: "" }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const next: Record<string, string> = {};
        if (!formData.fullName.trim()) next.fullName = "Full name is required.";
        if (!formData.email.trim()) {
            next.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            next.email = "Enter a valid email.";
        }
        if (!formData.phone.trim()) next.phone = "Phone is required.";
        if (!resumeFile) next.resume = "Please upload your résumé.";
        setErrors(next);
        if (Object.keys(next).length) return;

        setStatus("submitting");
        const data = new FormData();
        data.append("fullName", formData.fullName);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("experience", formData.experience);
        data.append("portfolio", formData.portfolio || "");
        data.append("coverLetter", formData.coverLetter || "");
        data.append("jobTitle", jobTitle);
        if (resumeFile) data.append("resume", resumeFile);

        try {
            const res = await fetch("https://formspree.io/f/mbdwbkad", {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });
            if (res.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={onClose}
                        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-md"
                    />

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="apply-modal-title"
                        initial={{ opacity: 0, y: 24, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.97 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="relative max-h-[92vh] w-full max-w-[860px] overflow-y-auto rounded-3xl border border-neutral-900/10 bg-[#FAFAF8] shadow-[0_30px_80px_-30px_rgba(10,10,26,0.55)]"
                    >
                        {/* Close */}
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close application form"
                            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-neutral-900/10 bg-white text-neutral-700 transition hover:border-neutral-900/30 hover:text-neutral-900"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
                                <span className="grid h-14 w-14 place-items-center rounded-full border border-[#F5B947]/40 bg-[#FFF8E8]">
                                    <CheckCircle2 className="h-7 w-7 text-[#7c4a03]" />
                                </span>
                                <h3 id="apply-modal-title" className="mt-5 text-2xl font-semibold tracking-[-0.01em] text-neutral-950">
                                    Application submitted.
                                </h3>
                                <p className="mt-2 max-w-[420px] text-[14px] leading-[1.65] text-neutral-600">
                                    Thanks for applying for the{" "}
                                    <span className="font-semibold text-neutral-900">{jobTitle}</span>{" "}
                                    role. Our team will review and respond within 48 hours.
                                </p>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white"
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <div className="px-6 py-7 sm:px-9 sm:py-10">
                                <div className="mb-7">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                                        Apply for position
                                    </p>
                                    <h2
                                        id="apply-modal-title"
                                        className="mt-2 text-[clamp(1.65rem,3vw,2.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-neutral-950"
                                    >
                                        {jobTitle}
                                    </h2>
                                    <p className="mt-1.5 text-[13px] text-neutral-500">
                                        Tell us a bit about yourself. We read every application.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <LightField
                                        label="Full name"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        error={errors.fullName}
                                    />
                                    <LightField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />
                                    <LightField
                                        label="Phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        error={errors.phone}
                                    />
                                    <label className="block">
                                        <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
                                            Experience
                                        </span>
                                        <select
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="h-11 w-full rounded-xl border border-neutral-900/10 bg-white px-3 text-[14px] text-neutral-900 outline-none focus:border-neutral-900/40"
                                        >
                                            <option>Junior (0–2y)</option>
                                            <option>Mid-level (2–5y)</option>
                                            <option>Senior (5y+)</option>
                                            <option>Lead / Manager</option>
                                        </select>
                                    </label>
                                    <LightField
                                        className="md:col-span-2"
                                        label="Portfolio or LinkedIn"
                                        name="portfolio"
                                        type="url"
                                        value={formData.portfolio}
                                        onChange={handleChange}
                                        placeholder="https://"
                                    />

                                    <label
                                        htmlFor="apply-cv"
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            setIsDragOver(true);
                                        }}
                                        onDragLeave={() => setIsDragOver(false)}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            setIsDragOver(false);
                                            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
                                        }}
                                        className={`md:col-span-2 group block cursor-pointer rounded-2xl border-2 border-dashed p-5 text-center transition ${isDragOver
                                                ? "border-[#F5B947] bg-[#FFF8E8]"
                                                : errors.resume
                                                    ? "border-rose-400/60 bg-rose-50"
                                                    : "border-neutral-900/15 bg-white hover:border-neutral-900/35"
                                            }`}
                                    >
                                        <input
                                            id="apply-cv"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            className="sr-only"
                                            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                                        />
                                        <UploadCloud className="mx-auto h-6 w-6 text-[#7c4a03]" />
                                        {resumeFile ? (
                                            <p className="mt-2 text-[13px] text-neutral-800">
                                                Selected: <span className="font-semibold">{resumeFile.name}</span>
                                            </p>
                                        ) : (
                                            <p className="mt-2 text-[13px] text-neutral-600">
                                                <span className="font-semibold text-neutral-900">Upload résumé</span>{" "}
                                                or drag & drop · PDF or DOCX
                                            </p>
                                        )}
                                        {errors.resume ? (
                                            <p className="mt-1 text-[11px] text-rose-500">{errors.resume}</p>
                                        ) : null}
                                    </label>

                                    <label className="md:col-span-2 block">
                                        <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
                                            Cover letter / message
                                        </span>
                                        <textarea
                                            name="coverLetter"
                                            value={formData.coverLetter}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Tell us why this role fits."
                                            className="w-full resize-none rounded-xl border border-neutral-900/10 bg-white px-3 py-3 text-[14px] text-neutral-900 outline-none focus:border-neutral-900/40"
                                        />
                                    </label>

                                    {status === "error" ? (
                                        <p className="md:col-span-2 text-[12px] text-rose-500">
                                            Submission failed. Please try again in a moment.
                                        </p>
                                    ) : null}

                                    <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="rounded-full border border-neutral-900/12 bg-white px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-neutral-700 hover:border-neutral-900/35 hover:text-neutral-900"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            {status === "submitting" ? "Submitting…" : "Submit application"}
                                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

function LightField({
    label,
    required,
    name,
    value,
    onChange,
    type = "text",
    error,
    className,
    placeholder,
}: {
    label: string;
    required?: boolean;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: string;
    className?: string;
    placeholder?: string;
}) {
    return (
        <label className={`block ${className ?? ""}`} htmlFor={`apply-${name}`}>
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
                {label}
                {required ? <span className="ml-0.5 text-[#7c4a03]">*</span> : null}
            </span>
            <input
                id={`apply-${name}`}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`h-11 w-full rounded-xl border bg-white px-3 text-[14px] text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900/40 ${error ? "border-rose-400" : "border-neutral-900/10"
                    }`}
            />
            {error ? <p className="mt-1 text-[11px] text-rose-500">{error}</p> : null}
        </label>
    );
}
