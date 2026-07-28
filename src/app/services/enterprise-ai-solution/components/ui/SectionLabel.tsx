interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
}

export function SectionLabel({ children, dark = false }: SectionLabelProps) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span
        className={`h-px w-8 ${dark ? "bg-orange-400/60" : "bg-orange-500/40"}`}
      />
      <span
        className={`badge-label ${
          dark ? "text-orange-400" : "text-orange-600"
        }`}
      >
        {children}
      </span>
      <span
        className={`h-px w-8 ${dark ? "bg-orange-400/60" : "bg-orange-500/40"}`}
      />
    </div>
  );
}
