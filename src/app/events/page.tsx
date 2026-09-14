"use client";
import { useState } from "react";
import { DAILY_SCHEDULES, CATEGORY_LABELS } from "@/data/schedule";
import { FESTIVAL_CONFIG } from "@/data/festival";
import { formatTime12, getCurrentDay, generateCalendarUrl } from "@/lib/utils";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

const categories = [
  { id: "all", label: "All" },
  { id: "aarti", label: "Aarti" },
  { id: "cultural", label: "Cultural" },
  { id: "children", label: "Children" },
  { id: "bhajan", label: "Bhajan" },
  { id: "dindi", label: "Dindi" },
  { id: "dhol-tasha", label: "Dhol-Tasha" },
  { id: "competition", label: "Competition" },
  { id: "prasad", label: "Mahaprasad" },
  { id: "social", label: "Social" },
  { id: "visarjan", label: "Visarjan" },
];

const categoryEmojis: Record<string, string> = {
  aarti: "🪔",
  cultural: "🎭",
  children: "🎈",
  bhajan: "🎵",
  dindi: "🥁",
  "dhol-tasha": "🥁",
  competition: "🏆",
  prasad: "🍽️",
  social: "🤝",
  visarjan: "🌊",
};

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDay, setSelectedDay] = useState(getCurrentDay() || 1);
  const currentDay = getCurrentDay();
  const daySchedule = DAILY_SCHEDULES.find((s) => s.day === selectedDay);
  const filteredEvents = daySchedule
    ? selectedCategory === "all"
      ? daySchedule.events
      : daySchedule.events.filter((e) => e.category === selectedCategory)
    : [];

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        {/* Title */}
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold text-gradient-saffron font-gotu">Events & Programs</h1>
          <p className="text-cream-dim text-xs mt-1 font-gotu">कार्यक्रम</p>
        </div>

        {/* Day selector */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-4 -mx-4 px-4">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => {
            const isSelected = day === selectedDay;
            const isToday = day === currentDay;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? "gradient-saffron text-white font-bold shadow-lg"
                    : isToday
                    ? "bg-card-bg border border-saffron/30 text-saffron"
                    : "bg-card-bg border border-card-border text-cream-muted"
                }`}
              >
                Day {day}
              </button>
            );
          })}
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-saffron text-white font-bold"
                  : "bg-card-bg border border-card-border text-cream-dim"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events count */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-cream-dim text-xs">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
          </p>
          {currentDay === selectedDay && (
            <span className="bg-saffron/10 text-saffron text-[10px] px-2 py-0.5 rounded-full font-bold">
              Today
            </span>
          )}
        </div>

        {/* Events list */}
        <div className="space-y-3">
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <span className="text-4xl">📅</span>
              <p className="text-cream-muted text-sm mt-3">No events found</p>
              <p className="text-cream-dim text-xs mt-1">Try a different day or category</p>
            </div>
          )}

          {filteredEvents.map((event, idx) => {
            const isAarti = event.category === "aarti";
            const isFeatured = idx === 0 && currentDay === selectedDay;

            return (
              <div
                key={event.id}
                className={`surface-card overflow-hidden ${
                  isFeatured ? "border-saffron/30 card-glow" : ""
                }`}
              >
                {/* Featured banner */}
                {isFeatured && (
                  <div className="gradient-saffron px-4 py-1.5">
                    <p className="text-white text-[10px] font-bold uppercase tracking-wider text-center">
                      Happening Now / Next
                    </p>
                  </div>
                )}

                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Time */}
                    <div className="text-right shrink-0 w-16">
                      <p className="text-cream text-xs font-mono font-bold">
                        {formatTime12(event.time)}
                      </p>
                      {event.timeEnd && (
                        <p className="text-cream-dim text-[10px] font-mono">
                          {formatTime12(event.timeEnd)}
                        </p>
                      )}
                    </div>

                    <div className="w-px bg-card-border self-stretch shrink-0" />

                    {/* Event content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <span className="text-lg shrink-0">
                          {categoryEmojis[event.category] || "📅"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-cream font-gotu ${isFeatured ? "text-lg font-bold" : "text-sm font-bold"}`}>
                            {event.titleMarathi}
                          </p>
                          <p className="text-cream-dim text-[10px] mt-0.5">
                            {CATEGORY_LABELS[event.category] || event.category}
                          </p>
                        </div>
                      </div>

                      {event.description && (
                        <p className="text-cream-muted text-xs font-gotu mt-2 leading-relaxed">
                          {event.description}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 mt-3">
                        <a
                          href={generateCalendarUrl(
                            event.titleMarathi,
                            daySchedule?.date || "2026-09-14",
                            event.time,
                            event.description
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cream-dim text-[10px] hover:text-saffron transition-colors flex items-center gap-1"
                        >
                          📅 Calendar
                        </a>
                        <button
                          onClick={() => {
                            const text = `${event.titleMarathi}\n${formatTime12(event.time)} - ${event.timeEnd ? formatTime12(event.timeEnd) : ""}\n${FESTIVAL_CONFIG.name}`;
                            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
                          }}
                          className="text-cream-dim text-[10px] hover:text-green-500 transition-colors flex items-center gap-1"
                        >
                          📱 WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
