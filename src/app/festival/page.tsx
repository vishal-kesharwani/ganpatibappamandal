"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, MapPin, Calendar, Share2 } from "lucide-react";
import { useLiveDays, useLiveEvents, categoryLabel } from "@/lib/public-data";
import { getCurrentDay, formatTime12, generateCalendarUrl } from "@/lib/utils";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

const DAY_ABBREV: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

const DAY_ABBREV_MARATHI: Record<string, string> = {
  सोमवार: "सोम",
  मंगळवार: "मंगळ",
  बुधवार: "बुध",
  गुरुवार: "गुरु",
  शुक्रवार: "शुक्र",
  शनिवार: "शनि",
  रविवार: "रवि",
};

const CATEGORY_COLORS: Record<string, string> = {
  aarti: "#7C2D12",
  puja: "#9A3412",
  prasad: "#7C2D12",
  cultural: "#EA580C",
  children: "#B45309",
  bhajan: "#9A3412",
  dindi: "#C2410C",
  "dhol-tasha": "#D97706",
  competition: "#A16207",
  social: "#57534E",
  meeting: "#57534E",
  visarjan: "#7C2D12",
  darshan: "#B45309",
  other: "#57534E",
};

export default function FestivalPage() {
  const currentDay = getCurrentDay();
  const { data: days } = useLiveDays();
  const { events } = useLiveEvents();
  const [selectedDay, setSelectedDay] = useState(
    currentDay >= 1 && currentDay <= 7 ? currentDay : 1
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const dayData = days.find((d) => d.day === selectedDay);
  const schedule = events.filter((e) => e.day === selectedDay);

  const availableCategories = useMemo(() => {
    const cats = new Set(schedule.map((e) => e.category));
    return Array.from(cats);
  }, [schedule]);

  const filteredSchedule = useMemo(() => {
    if (!selectedCategory) return schedule;
    return schedule.filter((e) => e.category === selectedCategory);
  }, [schedule, selectedCategory]);

  if (!dayData) return null;

  const isToday = currentDay === selectedDay;
  const isVisarjan = selectedDay === 7;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <Header />

      <main className="mx-auto max-w-lg px-4 pb-24 pt-6">
        <section className="mb-6 text-center">
          <h1
            className="font-gotu text-2xl font-bold tracking-wide"
            style={{ color: "#1C1917" }}
          >
            7-Day Festival Diary
          </h1>
          <p
            className="mt-1 text-xs tracking-widest"
            style={{ color: "#A8A29E" }}
          >
            ७ दिवसांचा गणपती महोत्सव
          </p>
        </section>

        {/* Day tabs with dates */}
        <section className="mb-5 -mx-4 px-4">
          <div
            className="flex gap-2 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {days.map((d) => {
              const isSelected = d.day === selectedDay;
              const dayCurrent = d.day === currentDay;
              const dateNum = Number(d.date.split("-")[2]);

              return (
                <button
                  key={d.day}
                  onClick={() => {
                    setSelectedDay(d.day);
                    setSelectedCategory(null);
                  }}
                  aria-pressed={isSelected}
                  className="flex flex-col items-center rounded-lg px-3 py-2 text-xs transition-colors shrink-0"
                  style={{
                    backgroundColor: isSelected ? "#6B2E2E" : "#FFFFFF",
                    color: isSelected
                      ? "#FFF8EE"
                      : dayCurrent
                        ? "#EA580C"
                        : "#57534E",
                    border: `1px solid ${
                      isSelected
                        ? "#6B2E2E"
                        : dayCurrent
                          ? "#EA580C"
                          : "#E7E5E4"
                    }`,
                    minWidth: "52px",
                    fontWeight: isSelected ? 700 : 400,
                  }}
                >
                  <span className="text-[10px] leading-none opacity-70">
                    {DAY_ABBREV[d.dayOfWeek]}
                  </span>
                  <span className="my-0.5 text-base font-semibold leading-none">
                    {dateNum}
                  </span>
                  <span className="text-[9px] leading-none opacity-70">
                    Day {d.day}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Day meta card */}
        <section
          className="mb-5 rounded-lg p-5"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E7E5E4",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "#A8A29E" }}
              >
                Day {dayData.day} of 7
              </p>
              <p
                className="font-gotu mt-1 text-lg font-bold"
                style={{ color: "#1C1917" }}
              >
                {dayData.dateMarathi}
              </p>
              <p className="mt-1 text-sm font-medium" style={{ color: "#7C2D12" }}>
                {dayData.title}
              </p>
            </div>
            <div className="text-right">
              <p
                className="font-gotu text-sm"
                style={{ color: "#57534E" }}
              >
                {dayData.dayOfWeek}
              </p>
              <p
                className="font-gotu text-xs"
                style={{ color: "#A8A29E" }}
              >
                {DAY_ABBREV_MARATHI[dayData.dayOfWeekMarathi] || dayData.dayOfWeekMarathi}
              </p>
              {isToday && (
                <span
                  className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{ backgroundColor: "#EA580C", color: "#FFFFFF" }}
                >
                  Today
                </span>
              )}
              {isVisarjan && (
                <span
                  className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{ backgroundColor: "#7C2D12", color: "#FFFFFF" }}
                >
                  Visarjan Day
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Theme */}
        {dayData.theme && (
          <section className="mb-4">
            <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-1">Theme</p>
              <p className="text-[#1C1917] text-sm font-bold font-gotu">{dayData.theme}</p>
            </div>
          </section>
        )}

        {/* Description */}
        {dayData.description && (
          <section className="mb-5">
            <p className="text-sm leading-relaxed" style={{ color: "#57534E" }}>
              {dayData.description}
            </p>
          </section>
        )}

        {/* Category filters */}
        {availableCategories.length > 0 && (
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-wider font-medium mb-2" style={{ color: "#A8A29E" }}>
              Filter by category
            </p>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: "none" }}>
              <button
                onClick={() => setSelectedCategory(null)}
                aria-pressed={!selectedCategory}
                className="chip"
                data-active={!selectedCategory}
              >
                All
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  aria-pressed={selectedCategory === cat}
                  className="chip"
                  data-active={selectedCategory === cat}
                >
                  {categoryLabel(cat)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Schedule */}
        {filteredSchedule.length > 0 ? (
          <section className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#A8A29E" }}>
              Schedule ({filteredSchedule.length})
            </p>
            <div className="space-y-3">
              {filteredSchedule.map((event) => {
                const catColor = CATEGORY_COLORS[event.category] || "#7C2D12";
                return (
                  <div
                    key={event.id}
                    className="rounded-lg border p-4"
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E7E5E4" }}
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Clock size={14} style={{ color: "#A8A29E" }} />
                        <span className="text-sm font-semibold" style={{ color: "#7C2D12" }}>
                          {formatTime12(event.time)}
                          {event.timeEnd && ` - ${formatTime12(event.timeEnd)}`}
                        </span>
                      </div>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{ backgroundColor: `${catColor}15`, color: catColor }}
                      >
                        {categoryLabel(event.category)}
                      </span>
                    </div>

                    {event.aartiSlug ? (
                      <Link href={`/aarti/${event.aartiSlug}`} className="font-gotu text-base font-semibold hover:underline" style={{ color: "#1C1917" }}>
                        {event.titleMarathi}
                      </Link>
                    ) : (
                      <h3 className="font-gotu text-base font-semibold" style={{ color: "#1C1917" }}>
                        {event.titleMarathi}
                      </h3>
                    )}
                    <p className="mt-0.5 text-xs" style={{ color: "#A8A29E" }}>
                      {event.title}
                    </p>

                    {event.description && (
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "#57534E" }}>
                        {event.description}
                      </p>
                    )}

                    {event.location && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <MapPin size={12} style={{ color: "#A8A29E" }} />
                        <span className="text-xs" style={{ color: "#A8A29E" }}>
                          {event.location}
                        </span>
                      </div>
                    )}

                    <div className="mt-3 flex items-center gap-2 border-t pt-3" style={{ borderColor: "#E7E5E4" }}>
                      <a
                        href={generateCalendarUrl(
                          `${event.titleMarathi} - OM SAI MITRA MANDAL`,
                          dayData.date || "",
                          event.time,
                          event.description
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
                        style={{ backgroundColor: "#EA580C10", color: "#EA580C" }}
                      >
                        <Calendar size={12} />
                        Add to Calendar
                      </a>
                      <button
                        onClick={() => {
                          const text = `${event.titleMarathi} - OM SAI MITRA MANDAL`;
                          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
                        }}
                        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
                        style={{ backgroundColor: "#25D36610", color: "#25D366" }}
                      >
                        <Share2 size={12} />
                        Share
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <div className="rounded-lg border p-6 text-center mb-8" style={{ backgroundColor: "#FFFFFF", borderColor: "#E7E5E4" }}>
            <p className="text-sm" style={{ color: "#A8A29E" }}>
              {schedule.length === 0 ? "No events for this day yet." : "No events in this category."}
            </p>
          </div>
        )}

        {/* Share day */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "OM SAI MITRA MANDAL",
                text: `Day ${dayData.day} - ${dayData.dateMarathi}\n${dayData.dayOfWeek}`,
                url: window.location.href,
              });
            } else {
              window.open(
                `https://wa.me/?text=${encodeURIComponent(
                  `Day ${dayData.day} - ${dayData.dateMarathi}\n${dayData.dayOfWeek}\nGanpati Mahotsav 2026`
                )}`,
                "_blank"
              );
            }
          }}
          className="w-full rounded-lg py-3 text-sm font-medium text-white"
          style={{ backgroundColor: "#7C2D12" }}
        >
          Share on WhatsApp
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
