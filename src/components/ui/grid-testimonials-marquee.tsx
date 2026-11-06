"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  content: string;
  highlights?: string[];
}

export interface TestimonialsMarqueeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  firstRow?: TestimonialItem[];
  secondRow?: TestimonialItem[];
  duration?: number;
  pauseOnHover?: boolean;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const DEFAULT_ROW_1: TestimonialItem[] = [
  {
    id: "1",
    name: "Darrell Trimble",
    handle: "CEO · SP Marketplace (California)",
    content:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    highlights: ["SOFTREE", "installation automation"],
  },
  {
    id: "2",
    name: "Natasha Adams",
    handle: "Partner · Wicked Point LLC (Virginia)",
    content:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication.",
    highlights: ["Softree Technology", "responsive", "on time"],
  },
  {
    id: "3",
    name: "Arkady Fedorovtsjev",
    handle: "IT Specialist · ECG International (Netherlands)",
    content:
      "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    highlights: ["collaboration", "makes a difference"],
  },
];

const DEFAULT_ROW_2: TestimonialItem[] = [
  {
    id: "4",
    name: "Rahi Radhakrishnan",
    handle: "Director of Delivery · Nuvento (USA)",
    content:
      "Softree demonstrated strong expertise in PowerApps development and delivered the project with excellent communication, responsiveness, and coordination throughout the engagement.",
    highlights: ["Softree", "PowerApps development"],
  },
  {
    id: "5",
    name: "Asif Mohamed",
    handle: "CTO · Adiva Information Technology LLC (UAE)",
    content:
      "A trusted technology solutions provider with strong expertise in security, compliance, and enterprise delivery.",
    highlights: ["technology solutions provider", "enterprise delivery"],
  },
  {
    id: "6",
    name: "Darrell Trimble",
    handle: "CEO · SP Marketplace (California)",
    content:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    highlights: ["SOFTREE"],
  },
];

const HighlightedText = ({
  text,
  highlights,
}: {
  text: string;
  highlights?: string[];
}) => {
  if (!highlights || highlights.length === 0) return <>{text}</>;

  const regex = new RegExp(`(${highlights.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isMatched = highlights.some(
          (h) => h.toLowerCase() === part.toLowerCase()
        );
        return isMatched ? (
          <span key={index} className="text-[#FF5812] font-semibold">
            {part}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
};

export const TestimonialCard: React.FC<{
  item: TestimonialItem;
  className?: string;
}> = ({ item, className }) => {
  const initials = getInitials(item.name);

  return (
    <figure
      className={cn(
        "w-[300px] xs:w-[340px] sm:w-[380px] md:w-[420px] min-h-[175px] md:h-[195px] flex-shrink-0 p-5 sm:p-6 flex flex-col justify-between select-none",
        "bg-white text-zinc-900",
        "border-r border-zinc-200/90 rounded-none",
        className
      )}
    >
      <figcaption className="flex items-center gap-3 sm:gap-3.5 mb-3">
        {/* Initials Avatar Badge */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#FF5812]/15 via-[#FF5812]/5 to-transparent border border-[#FF5812]/30 text-[#FF5812] font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-sm select-none">
          {initials}
        </div>
        <div className="flex flex-col leading-tight overflow-hidden">
          <span className="text-[13.5px] sm:text-[14.5px] font-bold text-zinc-900 tracking-tight truncate">
            {item.name}
          </span>
          <span className="text-[12px] sm:text-[12.5px] text-zinc-500 mt-0.5 truncate font-medium">
            {item.handle}
          </span>
        </div>
      </figcaption>

      <blockquote className="text-[12.5px] sm:text-[13.5px] leading-[1.55] sm:leading-[1.6] text-zinc-600 font-normal whitespace-pre-line m-0">
        &ldquo;<HighlightedText text={item.content} highlights={item.highlights} />&rdquo;
      </blockquote>
    </figure>
  );
};

export const TestimonialsMarquee = React.forwardRef<
  HTMLDivElement,
  TestimonialsMarqueeProps
>(
  (
    {
      firstRow = DEFAULT_ROW_1,
      secondRow = DEFAULT_ROW_2,
      duration = 60,
      pauseOnHover = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [isRow1Paused, setIsRow1Paused] = React.useState(false);
    const [isRow2Paused, setIsRow2Paused] = React.useState(false);

    const quadRow1 = React.useMemo(
      () => [...firstRow, ...firstRow, ...firstRow, ...firstRow],
      [firstRow]
    );
    const quadRow2 = React.useMemo(
      () => [...secondRow, ...secondRow, ...secondRow, ...secondRow],
      [secondRow]
    );

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Customer Testimonials"
        className={cn(
          "relative w-full bg-white overflow-hidden py-4 sm:py-6",
          className
        )}
        style={
          {
            "--marquee-duration": `${duration}s`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <style>{`
          @keyframes marquee-scroll-left {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }

          @keyframes marquee-scroll-right {
            0% {
              transform: translate3d(-50%, 0, 0);
            }
            100% {
              transform: translate3d(0, 0, 0);
            }
          }

          .track-flex-container {
            display: flex;
            width: max-content;
            will-change: transform;
            backface-visibility: hidden;
            transform-style: preserve-3d;
          }

          .marquee-move-left {
            animation: marquee-scroll-left var(--marquee-duration) linear infinite;
          }

          .marquee-move-right {
            animation: marquee-scroll-right var(--marquee-duration) linear infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .marquee-move-left,
            .marquee-move-right {
              animation: none !important;
            }
          }
        `}</style>

        {/* Dual Side Gradient Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

        {/* Main Grid Wrapper */}
        <div className="flex flex-col w-full border-y border-zinc-200/80">
          {/* Row 1: Left Scroll */}
          <div
            className="flex overflow-hidden w-full border-b border-zinc-200/80 cursor-pointer select-none"
            onPointerEnter={() => pauseOnHover && setIsRow1Paused(true)}
            onPointerLeave={() => pauseOnHover && setIsRow1Paused(false)}
          >
            <div
              className="track-flex-container marquee-move-left"
              style={{
                animationPlayState: isRow1Paused ? "paused" : "running",
              }}
            >
              {/* Primary set */}
              <div className="flex flex-nowrap">
                {quadRow1.map((item, idx) => (
                  <TestimonialCard
                    key={`r1-primary-${item.id}-${idx}`}
                    item={item}
                  />
                ))}
              </div>
              {/* Seamless loop set */}
              <div className="flex flex-nowrap" aria-hidden="true">
                {quadRow1.map((item, idx) => (
                  <TestimonialCard
                    key={`r1-clone-${item.id}-${idx}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Right Scroll */}
          <div
            className="flex overflow-hidden w-full cursor-pointer select-none"
            onPointerEnter={() => pauseOnHover && setIsRow2Paused(true)}
            onPointerLeave={() => pauseOnHover && setIsRow2Paused(false)}
          >
            <div
              className="track-flex-container marquee-move-right"
              style={{
                animationPlayState: isRow2Paused ? "paused" : "running",
              }}
            >
              {/* Primary set */}
              <div className="flex flex-nowrap">
                {quadRow2.map((item, idx) => (
                  <TestimonialCard
                    key={`r2-primary-${item.id}-${idx}`}
                    item={item}
                  />
                ))}
              </div>
              {/* Seamless loop set */}
              <div className="flex flex-nowrap" aria-hidden="true">
                {quadRow2.map((item, idx) => (
                  <TestimonialCard
                    key={`r2-clone-${item.id}-${idx}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TestimonialsMarquee.displayName = "TestimonialsMarquee";

export default TestimonialsMarquee;
export const Component = TestimonialsMarquee;

