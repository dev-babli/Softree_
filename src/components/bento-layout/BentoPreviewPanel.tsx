import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BENTO_VIEWPORT, captionStagger, panelReveal, previewSwap } from "./bento.motion";
import { ArrowRight, MapPin, Briefcase, Users, Globe, Building2, AlertTriangle, Settings, Quote } from "lucide-react";

function formatDate(iso?: string) {
  if (!iso) return null;
  const d = Date.parse(iso);
  if (Number.isNaN(d)) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(d));
}

function getImageBgColor(imagePath?: string) {
  if (!imagePath) return "#FAF9F6";
  const path = imagePath.toLowerCase();
  if (path.includes("enterprise")) return "#060814";
  if (path.includes("ai-powered") || path.includes("customer") || path.includes("service")) return "#F7F8FC";
  if (path.includes("security")) return "#0B0E2A";
  if (path.includes("data")) return "#0A0C16";
  return "#ffffff";
}

export type BentoPreviewItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  href?: string;
  excerpt?: string;
  ctaLabel?: string;
  clientDetails?: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  client?: string;
  location?: string;
  industry?: string;
  employees?: string;
  region?: string;
  testimonial?: {
    quote?: string;
    name?: string;
    role?: string;
  };
  highlights?: Array<{ value: string; label: string }>;
  readingTime?: string;
  takeaways?: string[];
  publishedAt?: string;
};

type BentoPreviewPanelProps = {
  item: BentoPreviewItem | null;
  reduced: boolean;
  accent?: "orange" | "blue";
  className?: string;
};

export function BentoPreviewPanel({
  item,
  reduced,
  accent = "orange",
  className,
}: BentoPreviewPanelProps) {
  const swap = previewSwap(reduced);
  const caption = captionStagger(reduced);
  const isBlue = accent === "blue";
  const isBlog = item?.ctaLabel === "Read article" || (!item?.challenge && !item?.approach && !item?.outcome && !!item?.excerpt);

  const badgeClass = isBlue
    ? "border-[#0043CE]/30 bg-[#0043CE]/10 text-[#0043CE]"
    : "border-[#FF5812]/30 bg-[#FF5812]/10 text-[#FF5812]";

  return (
    <motion.div
      className={cn(
        "relative flex flex-col items-stretch overflow-hidden rounded-xl border bg-white border-[#EAEAEA] shadow-[0_8px_24px_rgba(0,0,0,0.03)]",
        isBlog 
          ? "min-h-[18rem] md:min-h-[18.5rem] lg:min-h-[19rem]" 
          : "min-h-[38rem] md:min-h-[40rem] lg:min-h-[42rem]",
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={BENTO_VIEWPORT}
      variants={panelReveal(reduced, 0.06)}
      style={{ willChange: reduced ? undefined : "transform" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {item ? (
          <motion.div
            key={item.id}
            className="absolute inset-0 flex flex-col items-stretch overflow-hidden bg-white"
            {...swap}
            style={{ willChange: "opacity" }}
          >
            {isBlog ? (
              <div className="w-full h-full p-4 md:p-5 flex flex-col justify-between overflow-y-auto relative z-20 bg-[#FDFDFE]">
                <div className="grid grid-cols-1 md:grid-cols-[38%_1fr] gap-4 md:gap-5 items-stretch h-full min-h-0">
                  {/* Left Column: Portrait Cover Graphic */}
                  <div 
                    className="relative rounded-2xl overflow-hidden border border-[#EAEAEA] shadow-sm self-center md:self-start w-full"
                    style={{ backgroundColor: getImageBgColor(item.image) }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-auto block"
                    />
                  </div>

                  {/* Right Column: Title and Details */}
                  <div className="flex flex-col justify-start gap-3 pt-0 pb-1 min-w-0">
                    <div className="space-y-3">
                      <div>
                        <span className={cn(
                          "inline-flex rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em]",
                          badgeClass
                        )}>
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-[23px] font-extrabold leading-[1.25] tracking-[-0.03em] text-[#0a0a1a]">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm leading-relaxed text-[#0a0a1a]/70 font-normal">
                        {item.excerpt}
                      </p>
                    </div>

                    <div className="mt-1.5 space-y-2.5">
                      {/* Date & Reading time */}
                      {item.publishedAt && (
                        <div className="flex items-center gap-1.5 text-xs text-[#0a0a1a]/55 font-semibold tracking-wide">
                          <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                          {item.readingTime && (
                            <>
                              <span>•</span>
                              <span>{item.readingTime}</span>
                            </>
                          )}
                        </div>
                      )}

                      {/* CTA Button */}
                      {item.href && (
                        <div>
                          <Link
                            href={item.href}
                            className="group inline-flex items-center gap-2 rounded-full bg-[#db2727] hover:bg-[#b91c1c] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 active:scale-[0.98] shadow-sm"
                          >
                            <span>Read article</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Scrollable Content Area */}
                <div className="w-full p-5 md:p-7 pb-4 flex-grow overflow-y-auto relative z-20">
                  <motion.div
                    className="flex flex-col relative z-10"
                    variants={{
                      visible: {
                        transition: reduced
                          ? { duration: 0 }
                          : { staggerChildren: 0.05, delayChildren: 0.08 },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Header */}
                    <div>
                      <motion.span
                        variants={caption}
                        className={cn(
                          "inline-flex rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em]",
                          badgeClass,
                        )}
                      >
                        {item.category}
                      </motion.span>
                      <motion.h3
                        variants={caption}
                        className="mt-3.5 max-w-2xl text-balance font-serif text-2xl md:text-3.5xl font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0a0a1a]"
                      >
                        {item.title}
                      </motion.h3>
                      
                      {item.client && (
                        <motion.div 
                          variants={caption}
                          className="mt-2.5 flex items-center gap-2 text-sm text-[#0a0a1a]/60 font-semibold"
                        >
                          <Building2 className="h-4 w-4 shrink-0 text-[#0a0a1a]/40" />
                          <span>{item.client}</span>
                        </motion.div>
                      )}

                      {/* Metadata Grid */}
                      {!isBlog && (
                        <motion.div 
                          variants={caption}
                          className="mt-4 grid grid-cols-2 gap-3 border-t border-b border-[#EAEAEA] py-4 sm:grid-cols-4"
                        >
                          {/* Location */}
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a0a1a]/[0.03] text-[#0a0a1a]/50">
                              <MapPin className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="block text-[9px] font-bold uppercase tracking-wider text-[#0a0a1a]/40">Location</span>
                              <span className="block text-xs font-semibold text-[#0a0a1a]">{item.location || "Global"}</span>
                            </div>
                          </div>

                          {/* Industry */}
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a0a1a]/[0.03] text-[#0a0a1a]/50">
                              <Briefcase className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="block text-[9px] font-bold uppercase tracking-wider text-[#0a0a1a]/40">Industry</span>
                              <span className="block text-xs font-semibold text-[#0a0a1a] truncate max-w-[85px]">{item.industry || "Technology"}</span>
                            </div>
                          </div>

                          {/* Employees */}
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a0a1a]/[0.03] text-[#0a0a1a]/50">
                              <Users className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="block text-[9px] font-bold uppercase tracking-wider text-[#0a0a1a]/40">Employees</span>
                              <span className="block text-xs font-semibold text-[#0a0a1a]">{item.employees || "1,000+"}</span>
                            </div>
                          </div>

                          {/* Regions */}
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a0a1a]/[0.03] text-[#0a0a1a]/50">
                              <Globe className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="block text-[9px] font-bold uppercase tracking-wider text-[#0a0a1a]/40">Regions</span>
                              <span className="block text-xs font-semibold text-[#0a0a1a]">{item.region || "Global"}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Narrative & Visual columns */}
                    <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      {/* Left Column - Challenge & Solution or Article Overview */}
                      <div className="flex-1 min-w-0 flex flex-col gap-4">
                        {item.challenge && (
                          <motion.div 
                            variants={caption}
                            className="rounded-xl border border-[#FF5812]/15 bg-[#FF5812]/[0.02] p-4"
                          >
                            <div className="flex items-center gap-2 text-[#FF5812] mb-1.5">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-[10px] font-bold uppercase tracking-[0.12em]">The Challenge</span>
                            </div>
                            <p className="text-xs md:text-sm leading-relaxed text-[#0a0a1a]/80 font-normal">
                              {item.challenge}
                            </p>
                          </motion.div>
                        )}

                        {item.approach && (
                          <motion.div 
                            variants={caption}
                            className="rounded-xl border border-[#0043CE]/15 bg-[#0043CE]/[0.02] p-4"
                          >
                            <div className="flex items-center gap-2 text-[#0043CE] mb-1.5">
                              <Settings className="h-4 w-4" />
                              <span className="text-[10px] font-bold uppercase tracking-[0.12em]">Our Solution</span>
                            </div>
                            <p className="text-xs md:text-sm leading-relaxed text-[#0a0a1a]/80 font-normal">
                              {item.approach}
                            </p>
                          </motion.div>
                        )}
                      </div>

                      {/* Right Column - Device Mockup & Impact Card Below */}
                      <motion.div 
                        variants={caption}
                        className="w-full md:w-[320px] lg:w-[340px] shrink-0 self-center md:self-start flex flex-col gap-4"
                      >
                        {/* The Composite Preview Graphic */}
                        <div className="w-full rounded-2xl overflow-hidden bg-white border border-[#EAEAEA] shadow-sm">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-auto block" 
                          />
                        </div>

                        {/* The Impact Stats card stacked below */}
                        {item.highlights && item.highlights.length > 0 && (
                          <div className="w-full rounded-xl border border-[#D1E8D9] bg-[#F4FAF6] p-4 shadow-sm">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#107C41] mb-2.5">
                              The Impact
                            </span>
                            <div className="grid grid-cols-3 gap-3">
                              {item.highlights.slice(0, 3).map((hl, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                  <span className="text-base md:text-lg font-black text-[#107C41] leading-none">
                                    {hl.value}
                                  </span>
                                  <span className="text-[9px] text-[#107C41]/85 leading-tight font-bold mt-1.5 uppercase tracking-wide">
                                    {hl.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Sticky Footer Area with Read full case study button */}
                {item.href && (
                  <div className="w-full px-5 py-3.5 md:px-7 border-t border-[#EAEAEA] bg-[#FDFDFD] flex justify-end shrink-0 relative z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.02)]">
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { delay: 0.15 } }
                      }}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 rounded-full bg-[#0a0a1a] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#222233] active:scale-[0.98] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812] focus-visible:ring-offset-2"
                      >
                        <span>{item.ctaLabel ?? "Read full case study"}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </motion.div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        ) : (
          <div className="flex h-full min-h-[22rem] items-center justify-center text-sm text-[#0a0a1a]/40 bg-white">
            Select an item
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
