"use client";

/**
 * Database-driven home sections with static fallbacks:
 * announcements, What's Happening Now / Next (dynamic clock),
 * today's schedule, and the 7-day journey strip.
 */
import Link from "next/link";
import { getCurrentDay, isFestivalActive, formatTime12, getTimeUntil } from "@/lib/utils";
import {
  useLiveEvents,
  useLiveAnnouncements,
  useLiveDays,
  getHappeningNow,
  categoryLabel,
  type DbEvent,
} from "@/lib/public-data";

function NowCard({ events }: { events: DbEvent[] }) {
  const { live, next } = getHappeningNow(events);

  if (live) {
    return (
      <div className="rounded-lg border border-[#E7E5E4] bg-white p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
            Happening Now
          </span>
        </div>
        <p className="font-gotu text-lg font-bold text-[#1C1917]">{live.titleMarathi}</p>
        {live.timeEnd && (
          <p className="mt-1 font-gotu text-xs text-[#57534E]">
            {formatTime12(live.time)} – {formatTime12(live.timeEnd)}
          </p>
        )}
        <div className="mt-3 flex items-center gap-2 text-[10px] text-[#A8A29E]">
          <span>{live.time}</span>
          <span>·</span>
          <span>{categoryLabel(live.category)}</span>
        </div>
      </div>
    );
  }

  if (next) {
    return (
      <div className="rounded-lg border border-[#E7E5E4] bg-white p-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#EA580C]">Up Next</p>
        <p className="font-gotu text-lg font-bold text-[#1C1917]">{next.titleMarathi}</p>
        <p className="mt-1 text-xs text-[#57534E]">
          Starts in <span className="font-bold text-[#7C2D12]">{getTimeUntil(next.time)}</span>
        </p>
        <div className="mt-3 flex items-center gap-2 text-[10px] text-[#A8A29E]">
          <span>{formatTime12(next.time)}</span>
          <span>·</span>
          <span>{categoryLabel(next.category)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#E7E5E4] bg-white p-5 text-center">
      <p className="text-sm text-[#57534E]">No more events today.</p>
      <p className="mt-1 text-xs text-[#A8A29E]">Come back tomorrow!</p>
    </div>
  );
}

/** Live festival date range, e.g. "१४ सप्टेंबर — २० सप्टेंबर २०२६". */
export function FestivalDateRange({ className = "" }: { className?: string }) {
  const { data: days } = useLiveDays();
  if (days.length === 0) return null;
  const first = days[0].dateMarathi.split(" ");
  const last = days[days.length - 1].dateMarathi;
  const range = `${first.slice(0, 2).join(" ")} — ${last}`;
  return <p className={className}>{range}</p>;
}

/** Live "Day X of N" festival status card with progress dots. */
export function FestivalStatusCard() {
  const currentDay = getCurrentDay();
  const festivalActive = isFestivalActive();
  const { data: days } = useLiveDays();
  const total = days.length || 7;
  const todayMeta = days.find((d) => d.day === currentDay);

  if (!festivalActive || currentDay < 1 || currentDay > total) return null;

  return (
    <section className="px-5 pb-8">
      <div className="rounded-lg border border-[#E7E5E4] bg-white p-6 text-center">
        <p className="mb-2 text-[10px] uppercase tracking-wider text-[#A8A29E]">
          Festival Status
        </p>
        <p className="font-gotu text-3xl text-[#7C2D12]">
          Day {currentDay} of {total}
        </p>

        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                i < currentDay
                  ? "bg-[#EA580C]"
                  : i === currentDay - 1
                    ? "bg-[#7C2D12] ring-2 ring-[#7C2D12]/20"
                    : "bg-[#E7E5E4]"
              }`}
            />
          ))}
        </div>

        {todayMeta && (
          <p className="mt-4 font-gotu text-xs text-[#A8A29E]">
            {todayMeta.dateMarathi} · {todayMeta.dayOfWeekMarathi}
          </p>
        )}
      </div>
    </section>
  );
}

/** Live pre-festival note showing the actual start date. */
export function PreFestivalNote() {
  const currentDay = getCurrentDay();
  const festivalActive = isFestivalActive();
  const { data: days } = useLiveDays();
  if (festivalActive || currentDay !== 0 || days.length === 0) return null;
  return (
    <section className="px-5 pb-8">
      <div className="text-center">
        <p className="text-sm text-[#57534E]">Ganpati Festival starts soon!</p>
        <p className="mt-2 font-gotu text-xl font-bold text-[#7C2D12]">
          {days[0].dateMarathi}
        </p>
      </div>
    </section>
  );
}

export function JourneyStrip() {
  const currentDay = getCurrentDay();
  const festivalActive = isFestivalActive();
  const { data: days } = useLiveDays();

  return (
    <section className="pb-8">
      <div className="mb-4 px-5">
        <h2 className="text-base font-bold text-[#1C1917]">7-Day Journey</h2>
      </div>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto px-5 pb-2">
        {days.map((day) => {
          const isCurrent = festivalActive && day.day === currentDay;
          const isPast = festivalActive && day.day < currentDay;
          return (
            <Link
              key={day.day}
              href={`/festival?day=${day.day}`}
              className={`w-24 shrink-0 rounded-lg border bg-white p-3 text-center transition-colors ${
                isCurrent
                  ? "border-[#7C2D12] ring-1 ring-[#7C2D12]/20"
                  : isPast
                    ? "border-[#E7E5E4] opacity-60"
                    : "border-[#E7E5E4]"
              }`}
            >
              <p className={`font-gotu text-2xl font-bold ${isCurrent ? "text-[#7C2D12]" : "text-[#1C1917]"}`}>
                {day.day}
              </p>
              <p className="mt-1 font-gotu text-[10px] text-[#A8A29E]">
                {day.dateMarathi.split(" ")[0]} {day.dateMarathi.split(" ")[1]}
              </p>
              <p className="mt-0.5 font-gotu text-[10px] text-[#57534E]">{day.dayOfWeekMarathi}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function HomeLive() {
  const currentDay = getCurrentDay();
  const festivalActive = isFestivalActive();
  const { events } = useLiveEvents();
  const { data: announcements } = useLiveAnnouncements();
  const { data: days } = useLiveDays();

  const important = announcements.filter((a) => a.active && a.priority === "important");
  const todayEvents = events.filter((e) => e.day === currentDay);
  const todayMeta = days.find((d) => d.day === currentDay);

  return (
    <>
      {important.length > 0 && (
        <section className="px-5 pb-8">
          {important.map((ann) => (
            <Link
              key={ann.id}
              href="/announcements"
              className="block rounded-lg border border-amber-200 bg-[#FEF3C7] p-4 transition-colors hover:bg-[#FDE68A]/30"
            >
              <p className="font-gotu text-sm font-bold text-[#1C1917]">{ann.titleMarathi}</p>
              <p className="mt-1 text-xs text-[#57534E]">{ann.descriptionMarathi}</p>
            </Link>
          ))}
        </section>
      )}

      {festivalActive && todayEvents.length > 0 && (
        <section className="px-5 pb-8">
          <NowCard events={todayEvents} />
        </section>
      )}

      {festivalActive && todayEvents.length > 0 && (
        <section className="px-5 pb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1C1917]">Today&apos;s Schedule</h2>
              <p className="mt-0.5 text-[10px] text-[#A8A29E]">
                Day {currentDay}
                {todayMeta ? ` · ${todayMeta.dayOfWeek}` : ""}
              </p>
            </div>
            <Link
              href={`/festival?day=${currentDay}`}
              className="text-xs font-medium text-[#EA580C] transition-colors hover:text-[#7C2D12]"
            >
              View Full →
            </Link>
          </div>

          <div className="rounded-lg border border-[#E7E5E4] bg-white p-4">
            <div className="space-y-0">
              {todayEvents.slice(0, 5).map((event, idx) => (
                <div key={event.id} className="relative flex items-start gap-3">
                  <div className="flex w-6 shrink-0 flex-col items-center">
                    <div className={`mt-1.5 h-2 w-2 rounded-full ${idx === 0 ? "bg-[#EA580C]" : "bg-[#E7E5E4]"}`} />
                    {idx < Math.min(todayEvents.length, 5) - 1 && <div className="h-8 w-px bg-[#E7E5E4]" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="flex items-center justify-between gap-2">
                      {event.aartiSlug ? (
                        <Link href={`/aarti/${event.aartiSlug}`} className="font-gotu text-sm text-[#1C1917] hover:text-[#7C2D12] hover:underline">
                          {event.titleMarathi}
                        </Link>
                      ) : (
                        <p className="font-gotu text-sm text-[#1C1917]">{event.titleMarathi}</p>
                      )}
                      <span className="shrink-0 font-mono text-[10px] text-[#A8A29E]">
                        {formatTime12(event.time)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-[#A8A29E]">{categoryLabel(event.category)}</p>
                  </div>
                </div>
              ))}
            </div>

            {todayEvents.length > 5 && (
              <Link
                href="/events"
                className="mt-3 block border-t border-[#E7E5E4] pt-3 text-center text-xs text-[#EA580C]"
              >
                View all {todayEvents.length} events →
              </Link>
            )}
          </div>
        </section>
      )}

    </>
  );
}
