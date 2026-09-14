"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Calendar, Share2, Clock, MapPin } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { useLiveEvents, useLiveDays, categoryLabel } from "@/lib/public-data";
import { formatTime12, getCurrentDay, generateCalendarUrl } from "@/lib/utils";

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

export default function EventsPage() {
  const currentDay = getCurrentDay();
  const { events } = useLiveEvents();
  const { data: days } = useLiveDays();
  const [selectedDay, setSelectedDay] = useState(currentDay >= 1 && currentDay <= 7 ? currentDay : 1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const dayEvents = useMemo(
    () => events.filter((e) => e.day === selectedDay),
    [events, selectedDay]
  );
  const dayMeta = useMemo(() => days.find((d) => d.day === selectedDay), [days, selectedDay]);

  const availableCategories = useMemo(() => {
    const cats = new Set(dayEvents.map((e) => e.category));
    return Array.from(cats);
  }, [dayEvents]);

  const filteredEvents = useMemo(() => {
    if (!selectedCategory) return dayEvents;
    return dayEvents.filter((e) => e.category === selectedCategory);
  }, [dayEvents, selectedCategory]);

  const handleShare = (title: string, date: string, time: string) => {
    const text = `${title} - OM SAI MITRA MANDAL`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <Header />

      <main className="mx-auto max-w-md px-4 pb-24 pt-4">
        <div className="mb-6">
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "'Gotu Devanagari', serif", color: "#7C2D12" }}
          >
            Events & Programs
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#A8A29E" }}>
            कार्यक्रम
          </p>
        </div>

        <div className="mb-5">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: "none" }}>
            {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => {
              const isSelected = day === selectedDay;
              const isToday = day === currentDay;
              return (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setSelectedCategory(null);
                  }}
                  aria-pressed={isSelected}
                  className="flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: isSelected ? "#6B2E2E" : "#FFFFFF",
                    color: isSelected ? "#FFF8EE" : isToday ? "#EA580C" : "#57534E",
                    border: isSelected
                      ? "1px solid #6B2E2E"
                      : isToday
                        ? "2px solid #EA580C"
                        : "1px solid #E7E5E4",
                    fontWeight: isSelected ? 700 : 500,
                  }}
                >
                  Day {day}
                </button>
              );
            })}
          </div>
        </div>

        {dayMeta && (
          <p className="mb-4 text-xs font-medium uppercase tracking-wider" style={{ color: "#A8A29E" }}>
            {dayMeta.date} · {dayMeta.dayOfWeek}
          </p>
        )}

        {availableCategories.length > 0 && (
          <div className="mb-5">
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

        <div className="space-y-3">
          {filteredEvents.length === 0 && (
            <div className="rounded-lg border p-6 text-center" style={{ backgroundColor: "white", borderColor: "#E7E5E4" }}>
              <p className="text-sm" style={{ color: "#A8A29E" }}>
                No events for this day.
              </p>
            </div>
          )}

          {filteredEvents.map((event) => {
            const categoryColor = CATEGORY_COLORS[event.category] || "#7C2D12";
            return (
              <div
                key={event.id}
                className="rounded-lg border p-4"
                style={{ backgroundColor: "white", borderColor: "#E7E5E4" }}
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
                    style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}
                  >
                    {categoryLabel(event.category)}
                  </span>
                </div>

                {event.aartiSlug ? (
                  <Link href={`/aarti/${event.aartiSlug}`} className="text-base font-semibold hover:underline" style={{ color: "#1C1917" }}>
                    {event.titleMarathi}
                  </Link>
                ) : (
                  <h3 className="text-base font-semibold" style={{ color: "#1C1917" }}>
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
                      dayMeta?.date || "",
                      event.time,
                      event.description
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      backgroundColor: "#EA580C10",
                      color: "#EA580C",
                    }}
                  >
                    <Calendar size={12} />
                    Add to Calendar
                  </a>
                  <button
                    onClick={() => handleShare(event.titleMarathi, dayMeta?.date || "", event.time)}
                    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      backgroundColor: "#25D36610",
                      color: "#25D366",
                    }}
                  >
                    <Share2 size={12} />
                    Share
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
