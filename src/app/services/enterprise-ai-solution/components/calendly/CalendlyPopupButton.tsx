"use client";

type CalendlyPopupButtonProps = {
  label?: string;
  className?: string;
};

const DEFAULT_CLASS_NAME =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white hover:bg-white hover:text-[#09090d]";

export default function CalendlyPopupButton({
  label = "Book a call",
  className = DEFAULT_CLASS_NAME,
}: CalendlyPopupButtonProps) {
  const bookingUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "mailto:sales@softreetechnology.com?subject=Discovery%20Call";

  return (
    <a
      href={bookingUrl}
      className={className}
      target={bookingUrl.startsWith("http") ? "_blank" : undefined}
      rel={bookingUrl.startsWith("http") ? "noreferrer" : undefined}
    >
      {label}
    </a>
  );
}
