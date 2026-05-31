"use client";

/* ─────────────────────────────────────────────────────────────────────
 *  Careers Talent Pool — Light spontaneous form
 *  ──────────────
 *  Mirrors the editorial split used in `LightContactSection`: pitch on
 *  the left, form on the right. Uploads CV + intro to the same
 *  Formspree endpoint the existing `future-form.tsx` posts to.
 * ───────────────────────────────────────────────────────────────────── */

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, UploadCloud, Copy, CheckCircle2 } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ACCENT = "#ff5812";

const DEPARTMENTS = [
    "AI & Machine Learning",
    "Power Platform / Apps",
    "Power BI & Analytics",
    "QA & Testing Automation",
    "Web & Full-stack",
    "Mobile Development",
    "Marketing & HR",
    "Other",
];

export interface CareersTalentPoolLightProps {
    heading?: string;
    body?: string;
    email?: string;
}

export default function CareersTalentPoolLight({
    heading = "Don’t see the right role?",
    body = "Drop your CV here. When something matching your background opens up, we’ll come back to you first — usually within a few weeks.",
    email = "shradhab@softreetechnology.com",
}: CareersTalentPoolLightProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        department: DEPARTMENTS[0],
        message: "",
    });
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [status, setStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [copied, setCopied] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const mailtoUrl = `mailto:${email}?subject=Job%20Application%20-%20Softree%20Careers&body=Dear%20hiring%20team,%0A%0A`;

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
        if (!resumeFile) next.resume = "Please upload your CV.";
        setErrors(next);
        if (Object.keys(next).length) return;

        setStatus("submitting");
        const data = new FormData();
        data.append("fullName", formData.fullName);
        data.append("email", formData.email);
        data.append("department", formData.department);
        data.append("message", formData.message || "");
        data.append("jobTitle", `Talent Pool — ${formData.department}`);
        if (resumeFile) data.append("resume", resumeFile);

        try {
            const res = await fetch("https://formspree.io/f/mbdwbkad", {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });
            if (res.ok) {
                setStatus("success");
                setFormData({ fullName: "", email: "", department: DEPARTMENTS[0], message: "" });
                setResumeFile(null);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* noop */
        }
    };

    return (
        <section
            id="talent-pool"
            className="relative w-full overflow-hidden bg-[#FAFAF8] py-20 md:py-24 lg:py-28"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full opacity-30 blur-[120px]"
                style={{ background: "radial-gradient(circle, rgba(245,185,71,0.45), transparent 70%)" }}
            />

            <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14"
                >
                    {/* Left — pitch */}
                    <div className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white p-8 sm:p-10">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-[80px]"
                            style={{ background: "radial-gradient(circle, rgba(245,185,71,0.55), transparent 70%)" }}
                        />
                        <div className="relative">
                            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-900/10 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                                Talent pool
                            </span>
                            <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-950">
                                {heading}
                            </h2>
                            <p className="mt-4 max-w-[440px] text-[15px] leading-[1.7] text-neutral-600">
                                {body}
                            </p>

                            <div className="mt-7 flex items-center gap-3 border-t border-neutral-900/8 pt-6">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                                    or send directly
                                </span>
                                <span className="h-px flex-1 bg-neutral-900/8" />
                            </div>

                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-900/10 bg-neutral-50 p-4">
                                <a
                                    href={mailtoUrl}
                                    className="text-[14px] font-medium text-neutral-900 hover:text-[var(--legacy-ff5812)]"
                                >
                                    ✉ {email}
                                </a>
                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className="inline-flex items-center gap-2 rounded-full border border-neutral-900/12 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700 transition hover:border-neutral-900/35"
                                >
                                    {copied ? (
                                        <>
                                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-3.5 w-3.5" />
                                            Copy
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right — form */}
                    <div className="rounded-3xl border border-neutral-900/10 bg-neutral-950 p-8 text-white shadow-[0_24px_70px_-30px_rgba(10,10,26,0.55)] sm:p-10">
                        {status === "success" ? (
                            <div className="grid h-full place-items-center text-center">
                                <div>
                                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#ff5812]/40 bg-[#ff5812]/10">
                                        <CheckCircle2 className="h-6 w-6 text-[#ff5812]" />
                                    </span>
                                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.01em]">
                                        You’re in the pool.
                                    </h3>
                                    <p className="mt-2 max-w-[340px] text-sm leading-[1.65] text-white/60">
                                        Thanks — we’ve saved your details. When something matching your
                                        background opens up, our hiring team will reach out directly.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setStatus("idle")}
                                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/80 hover:border-white/40 hover:text-white"
                                    >
                                        Submit another profile
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                                        Join the talent pool
                                    </p>
                                    <p className="mt-2 text-[18px] font-medium leading-[1.4] text-white">
                                        Tell us about yourself and what you’d love to build next.
                                    </p>
                                </div>

                                <DarkField
                                    label="Full name"
                                    required
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    error={errors.fullName}
                                />
                                <DarkField
                                    label="Email"
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />

                                <label className="block">
                                    <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/50">
                                        Area of expertise
                                    </span>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="h-11 w-full appearance-none rounded-none border-0 border-b border-white/14 bg-transparent px-0 text-[15px] font-medium text-white outline-none transition-colors focus:border-[#ff5812]"
                                    >
                                        {DEPARTMENTS.map((d) => (
                                            <option key={d} value={d} className="bg-neutral-900 text-white">
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                {/* Upload */}
                                <label
                                    htmlFor="cv-upload"
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
                                    className={`group block cursor-pointer rounded-2xl border-2 border-dashed p-5 text-center transition-all ${isDragOver
                                            ? "border-[#ff5812] bg-[#ff5812]/8"
                                            : errors.resume
                                                ? "border-rose-400/50"
                                                : "border-white/15 hover:border-white/35"
                                        }`}
                                >
                                    <input
                                        id="cv-upload"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="sr-only"
                                        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                                    />
                                    <UploadCloud
                                        className="mx-auto h-6 w-6 text-[#ff5812]"
                                        aria-hidden
                                    />
                                    {resumeFile ? (
                                        <p className="mt-2 text-[13px] text-white">
                                            Selected: <span className="font-semibold">{resumeFile.name}</span>
                                        </p>
                                    ) : (
                                        <p className="mt-2 text-[13px] text-white/60">
                                            <span className="font-semibold text-white">Upload CV</span>{" "}
                                            or drag & drop · PDF or DOCX
                                        </p>
                                    )}
                                    {errors.resume ? (
                                        <p className="mt-1 text-[11px] text-rose-400">{errors.resume}</p>
                                    ) : null}
                                </label>

                                <label className="block">
                                    <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/50">
                                        Brief intro (optional)
                                    </span>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="A line or two on what you’ve built recently and what you’re looking for next."
                                        className="w-full resize-none rounded-none border-0 border-b border-white/14 bg-transparent px-0 py-3 text-[14px] font-medium text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#ff5812]"
                                    />
                                </label>

                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="group mt-2 inline-flex h-12 w-full items-center justify-between gap-4 rounded-full bg-[#ff5812] px-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-white hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-65 sm:w-fit sm:px-8"
                                >
                                    <span>{status === "submitting" ? "Submitting…" : "Send to talent pool"}</span>
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                                </button>

                                {status === "error" ? (
                                    <p className="text-[12px] text-rose-300">
                                        Submission failed. Please try again or email us directly.
                                    </p>
                                ) : null}
                                <p className="text-[11px] leading-[1.6] text-white/40">
                                    By submitting, you agree to our{" "}
                                    <a href="/privacy-policy" className="underline hover:text-white/70">
                                        Privacy Policy
                                    </a>
                                    .
                                </p>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function DarkField({
    label,
    required,
    name,
    value,
    onChange,
    type = "text",
    error,
}: {
    label: string;
    required?: boolean;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: string;
}) {
    return (
        <label className="block" htmlFor={`talent-${name}`}>
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/50">
                {label}
                {required ? <span className="ml-0.5 text-[#ff5812]">*</span> : null}
            </span>
            <input
                id={`talent-${name}`}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={`h-11 w-full rounded-none border-0 border-b bg-transparent px-0 text-[15px] font-medium text-white outline-none transition-colors focus:border-[#ff5812] ${error ? "border-rose-400" : "border-white/14"
                    }`}
            />
            {error ? <p className="mt-1 text-[11px] text-rose-400">{error}</p> : null}
        </label>
    );
}
