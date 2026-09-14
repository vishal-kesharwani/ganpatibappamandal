"use client";

import { useState } from "react";
import Link from "next/link";
import { FESTIVAL_CONFIG } from "@/data/festival";
import { useLiveDays, useLiveEvents, categoryLabel } from "@/lib/public-data";
import { getCurrentDay, formatTime12 } from "@/lib/utils";
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

export default function FestivalPage() {
  const currentDay = getCurrentDay();
  const { data: days } = useLiveDays();
  const { events } = useLiveEvents();
  const [selectedDay, setSelectedDay] = useState(
    currentDay >= 1 && currentDay <= 7 ? currentDay : 1
  );

  const dayData = days.find((d) => d.day === selectedDay);
  const schedule = events.filter((e) => e.day === selectedDay);

  if (!dayData) return null;

  const isToday = currentDay === selectedDay;
  const isVisarjan = selectedDay === 7;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F2" }}>
      <Header />

      <main className="mx-auto max-w-lg px-4 pb-24 pt-6">
        <section className="mb-8 text-center">
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

        <section className="mb-8 -mx-4 px-4">
          <div
            className="flex gap-2 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {days.map((d) => {
              const isSelected = d.day === selectedDay;
              const dayCurrent = d.day === currentDay;
              const dateNum = new Date(d.date).getDate();

              return (
                <button
                  key={d.day}
                  onClick={() => setSelectedDay(d.day)}
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

        <section
          className="mb-6 rounded-lg p-5"
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
                  style={{
                    backgroundColor: "#EA580C",
                    color: "#FFFFFF",
                  }}
                >
                  Today
                </span>
              )}
              {isVisarjan && (
                <span
                  className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{
                    backgroundColor: "#7C2D12",
                    color: "#FFFFFF",
                  }}
                >
                  Visarjan Day
                </span>
              )}
            </div>
          </div>
        </section>

        {dayData.theme && (
          <section className="mb-4">
            <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-1">Theme</p>
              <p className="text-[#1C1917] text-sm font-bold font-gotu">{dayData.theme}</p>
            </div>
          </section>
        )}

        {dayData.description && (
          <section className="mb-6">
            <p className="text-sm leading-relaxed" style={{ color: "#57534E" }}>
              {dayData.description}
            </p>
          </section>
        )}

        {schedule.length > 0 && (
          <section className="mb-8">
            <h2
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#A8A29E" }}
            >
              Schedule
            </h2>
            <div
              className="divide-y"
              style={{ borderColor: "#E7E5E4" }}
            >
              {schedule.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 py-3"
                  style={{ borderBottom: "1px solid #E7E5E4" }}
                >
                  <div
                    className="shrink-0 pt-0.5 font-mono text-xs"
                    style={{ color: "#57534E", width: "52px" }}
                  >
                    {formatTime12(event.time)}
                  </div>
                  <div
                    className="w-px self-stretch"
                    style={{ backgroundColor: "#E7E5E4" }}
                  />
                  <div className="min-w-0 flex-1">
                    {event.aartiSlug ? (
                      <Link
                        href={`/aarti/${event.aartiSlug}`}
                        className="font-gotu text-sm font-medium hover:text-[#7C2D12] hover:underline"
                        style={{ color: "#1C1917" }}
                      >
                        {event.titleMarathi}
                      </Link>
                    ) : (
                      <p
                        className="font-gotu text-sm font-medium"
                        style={{ color: "#1C1917" }}
                      >
                        {event.titleMarathi}
                      </p>
                    )}
                    <span
                      className="text-[10px]"
                      style={{ color: "#A8A29E" }}
                    >
                      {categoryLabel(event.category)}
                    </span>
                    {event.description && (
                      <p
                        className="mt-1 text-xs leading-relaxed"
                        style={{ color: "#78716C" }}
                      >
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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
                  `Day ${dayData.day} - ${dayData.dateMarathi}\n${dayData.dayOfWeek}\n${FESTIVAL_CONFIG.name}`
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
