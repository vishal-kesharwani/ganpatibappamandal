"use client";

import { useState } from "react";
import Link from "next/link";
import { FESTIVAL_DAYS, FESTIVAL_CONFIG } from "@/data/festival";
import { DAILY_SCHEDULES, CATEGORY_LABELS } from "@/data/schedule";
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
  const [selectedDay, setSelectedDay] = useState(
    currentDay >= 1 && currentDay <= 7 ? currentDay : 1
  );

  const dayData = FESTIVAL_DAYS.find((d) => d.day === selectedDay);
  const schedule = DAILY_SCHEDULES.find((s) => s.day === selectedDay);

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
            {FESTIVAL_DAYS.map((d) => {
              const isSelected = d.day === selectedDay;
              const dayCurrent = d.day === currentDay;
              const dateNum = new Date(d.date).getDate();

              return (
                <button
                  key={d.day}
                  onClick={() => setSelectedDay(d.day)}
                  className="flex flex-col items-center rounded-lg px-3 py-2 text-xs transition-colors shrink-0"
                  style={{
                    backgroundColor: isSelected ? "#7C2D12" : "#FFFFFF",
                    color: isSelected
                      ? "#FFFFFF"
                      : dayCurrent
                        ? "#EA580C"
                        : "#57534E",
                    border: `1px solid ${
                      isSelected
                        ? "#7C2D12"
                        : dayCurrent
                          ? "#EA580C"
                          : "#E7E5E4"
                    }`,
                    minWidth: "52px",
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

        <section className="mb-6">
          <p className="text-sm leading-relaxed" style={{ color: "#57534E" }}>
            {dayData.themeDescription}
          </p>
        </section>

        {schedule && schedule.events.length > 0 && (
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
              {schedule.events.map((event) => (
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
                    <p
                      className="font-gotu text-sm font-medium"
                      style={{ color: "#1C1917" }}
                    >
                      {event.titleMarathi}
                    </p>
                    <span
                      className="text-[10px]"
                      style={{ color: "#A8A29E" }}
                    >
                      {CATEGORY_LABELS[event.category] || event.category}
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
                text: `Day ${dayData.day} - ${dayData.theme}\n${dayData.dateMarathi}`,
                url: window.location.href,
              });
            } else {
              window.open(
                `https://wa.me/?text=${encodeURIComponent(
                  `Day ${dayData.day} - ${dayData.theme}\n${dayData.dateMarathi}\n${FESTIVAL_CONFIG.name}`
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
