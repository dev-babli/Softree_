"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Calendar, Clock, Video } from "lucide-react";
import { loadCalendlyAssets, openCalendlyPopup } from "./calendly-loader";

export type MeetingType = {
  icon: string;
  label: string;
  duration: string;
  url: string;
  description?: string;
};

type CalendlySchedulePanelProps = {
  meetingTypes: readonly MeetingType[];
  className?: string;
};

function CalendarPreview() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const cells = Array.from({ length: 28 }, (_, i) => i + 1);
  const highlighted = new Set([8, 9, 10, 15, 16, 17, 22, 23]);

  return (
    <div
      aria-hidden
      className="pointer-events-none select-none rounded-xl border border-white/10 bg-white/[0.03] p-4"
    >
      <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
        <span>Availability</span>
        <span className="text-[#ff5812]/80">Live</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-medium text-white/30">
        {days.map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day) => (
          <span
            key={day}
            className={`flex h-7 items-center justify-center rounded-md text-[10px] font-medium ${
              highlighted.has(day)
                ? "bg-[#ff5812]/20 text-[#ff9a5f]"
                : "text-white/20"
            }`}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CalendlySchedulePanel({
  meetingTypes,
  className = "",
}: CalendlySchedulePanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [opening, setOpening] = useState(false);

  const active = meetingTypes[activeIndex];

  const perks = useMemo(
    () => [
      { icon: Clock, text: `${active.duration} video call` },
      { icon: Video, text: "Google Meet link included" },
      { icon: Calendar, text: "Instant calendar invite" },
    ],
    [active.duration],
  );

  useEffect(() => {
    void loadCalendlyAssets();
  }, []);

  const handleOpen = async () => {
    setOpening(true);
    try {
      await openCalendlyPopup(active.url);
    } finally {
      setOpening(false);
    }
  };

  return (
    <div
      className={`flex h-full flex-col rounded-2xl bg-[#09090d] p-6 text-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] sm:p-8 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff5812]">
            Schedule
          </p>
          <h3 className="mt-2 text-[22px] font-medium tracking-[-0.03em] text-white">
            Book a discovery call
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/50">
            {active.description ??
              "Speak with a senior engineer — scope, timeline, and next steps in one sitting."}
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full border border-[#ff5812]/25 bg-[#ff5812]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff9a5f] sm:inline-flex">
          Free
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {meetingTypes.map((type, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={type.label}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-xl border px-3 py-3 text-left transition duration-200 ${
                selected
                  ? "border-[#ff5812]/45 bg-[#ff5812]/12"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <span className="text-base leading-none">{type.icon}</span>
              <p className="mt-2 text-[13px] font-medium text-white/90">
                {type.label}
              </p>
              <p className="mt-0.5 text-[11px] text-white/40">{type.duration}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <CalendarPreview />
      </div>

      <ul className="mt-5 space-y-2.5">
        {perks.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className="flex items-center gap-2.5 text-[13px] text-white/55"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
              <Icon className="h-3.5 w-3.5 text-[#ff5812]" strokeWidth={1.75} />
            </span>
            {text}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={handleOpen}
          disabled={opening}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#ff5812] text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white hover:text-[#09090d] disabled:cursor-wait disabled:opacity-70"
        >
          <span>{opening ? "Opening scheduler…" : "Choose a time"}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </button>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-white/35">
          Opens Calendly in a focused overlay · No account required
        </p>
      </div>
    </div>
  );
}
