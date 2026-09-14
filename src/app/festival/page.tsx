"use client";
import { useState } from "react";
import Link from "next/link";
import { FESTIVAL_DAYS, FESTIVAL_CONFIG } from "@/data/festival";
import { DAILY_SCHEDULES, CATEGORY_LABELS } from "@/data/schedule";
import { getCurrentDay, formatTime12 } from "@/lib/utils";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import ShareButton from "@/components/ShareButton";

export default function FestivalPage() {
  const currentDay = getCurrentDay();
  const [selectedDay, setSelectedDay] = useState(currentDay || 1);

  const dayData = FESTIVAL_DAYS.find((d) => d.day === selectedDay);
  const schedule = DAILY_SCHEDULES.find((s) => s.day === selectedDay);
  const isToday = selectedDay === currentDay;
  const isVisarjan = selectedDay === 7;

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        {/* Title */}
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold text-gradient-saffron font-gotu">7-Day Festival Diary</h1>
          <p className="text-cream-dim text-xs mt-1 font-gotu">७ दिवसांचा गणपती महोत्सव</p>
        </div>

        {/* Day Selector - Horizontal scrollable */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-4 -mx-4 px-4">
          {FESTIVAL_DAYS.map((day) => {
            const isSelected = day.day === selectedDay;
            const isPast = day.day < currentDay;
            return (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`shrink-0 flex flex-col items-center px-4 py-3 rounded-2xl transition-all ${
                  isSelected
                    ? "gradient-saffron text-white shadow-lg shadow-saffron/20"
                    : isPast
                    ? "bg-card-bg/50 border border-card-border/30 text-cream-dim"
                    : "bg-card-bg border border-card-border text-cream hover:border-saffron/30"
                }`}
              >
                <span className={`text-[10px] ${isSelected ? "text-white/70" : "text-cream-dim"}`}>
                  {day.dayOfWeek.slice(0, 3)}
                </span>
                <span className={`text-lg font-bold font-gotu ${isSelected ? "" : "text-cream"}`}>
                  {day.date.split("-")[2]}
                </span>
                <span className={`text-[9px] ${isSelected ? "text-white/60" : "text-cream-dim"}`}>
                  Day {day.day}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Day Content */}
        {dayData && (
          <div className="space-y-4">
            {/* Day Header */}
            <div className={`rounded-2xl border overflow-hidden ${
              isToday ? "border-saffron/30 card-glow" : isVisarjan ? "border-sacred-orange/30" : "border-card-border"
            }`}>
              <div className={`px-5 py-4 ${isToday ? "gradient-gold" : isVisarjan ? "gradient-sacred" : "bg-card-bg"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-[10px] uppercase tracking-wider ${isToday ? "text-temple-bg/60" : "text-cream-dim"}`}>
                      Day {dayData.day} of 7
                    </p>
                    <h2 className={`text-xl font-bold font-gotu ${isToday ? "text-temple-bg" : "text-cream"}`}>
                      {dayData.theme}
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-gotu ${isToday ? "text-temple-bg/70" : "text-cream-muted"}`}>
                      {dayData.dateMarathi}
                    </p>
                    <p className={`text-xs font-gotu ${isToday ? "text-temple-bg/60" : "text-cream-dim"}`}>
                      {dayData.dayOfWeekMarathi}
                    </p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {isToday && (
                    <span className="bg-temple-bg/20 text-temple-bg text-[10px] font-bold px-3 py-1 rounded-full font-gotu">
                      Today
                    </span>
                  )}
                  {isVisarjan && (
                    <span className="bg-red/20 text-cream text-[10px] font-bold px-3 py-1 rounded-full font-gotu">
                      Visarjan Day
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Day Details */}
            <div className="space-y-3">
              <div className="surface-card p-4">
                <p className="text-overline text-gold mb-1">Theme</p>
                <p className="text-cream font-bold font-gotu">{dayData.theme}</p>
              </div>

              <div className="surface-card p-4">
                <p className="text-overline text-gold mb-1">About</p>
                <p className="text-cream-muted text-sm font-gotu leading-relaxed">{dayData.themeDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="surface-card p-4">
                  <p className="text-overline text-gold mb-1">Special</p>
                  <p className="text-cream text-sm font-bold font-gotu">{dayData.specialAttraction}</p>
                </div>
                <div className="surface-card p-4">
                  <p className="text-overline text-gold mb-1">Dress Code</p>
                  <p className="text-cream-muted text-sm font-gotu">{dayData.dressCode}</p>
                </div>
              </div>

              {dayData.highlights.length > 0 && (
                <div className="surface-card p-4">
                  <p className="text-overline text-gold mb-2">Highlights</p>
                  <div className="flex flex-wrap gap-2">
                    {dayData.highlights.map((h, i) => (
                      <span key={i} className="bg-saffron/10 border border-saffron/20 rounded-full px-3 py-1 text-cream text-xs font-gotu">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Schedule */}
            {schedule && (
              <div>
                <h3 className="text-subheading font-bold text-cream font-gotu mb-3">Schedule</h3>
                <div className="space-y-2">
                  {schedule.events.map((event) => (
                    <div key={event.id} className="surface-card p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-right shrink-0 w-16">
                          <p className="text-cream text-xs font-mono font-bold">{formatTime12(event.time)}</p>
                          {event.timeEnd && (
                            <p className="text-cream-dim text-[10px] font-mono">{formatTime12(event.timeEnd)}</p>
                          )}
                        </div>
                        <div className="w-px bg-card-border self-stretch shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-cream text-sm font-gotu">{event.titleMarathi}</p>
                          <p className="text-cream-dim text-[10px] mt-0.5">
                            {CATEGORY_LABELS[event.category] || event.category}
                          </p>
                          {event.description && (
                            <p className="text-cream-dim text-[11px] font-gotu mt-1">{event.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="pt-4">
              <ShareButton text={`Day ${dayData.day} - ${dayData.theme}\n${dayData.dateMarathi}\n${FESTIVAL_CONFIG.name}`} />
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
}
