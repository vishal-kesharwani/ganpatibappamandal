import Link from "next/link";
import { notFound } from "next/navigation";
import { FESTIVAL_DAYS, FESTIVAL_CONFIG } from "@/data/festival";
import { DAILY_SCHEDULES, CATEGORY_LABELS } from "@/data/schedule";
import { getCurrentDay, formatTime12 } from "@/lib/utils";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import ShareButton from "@/components/ShareButton";

export function generateStaticParams() {
  return FESTIVAL_DAYS.map((day) => ({ day: String(day.day) }));
}

export default async function DayDetailPage({ params }: { params: Promise<{ day: string }> }) {
  const { day: dayStr } = await params;
  const dayNum = parseInt(dayStr);
  if (isNaN(dayNum) || dayNum < 1 || dayNum > 7) notFound();
  const dayData = FESTIVAL_DAYS.find((d) => d.day === dayNum);
  const schedule = DAILY_SCHEDULES.find((s) => s.day === dayNum);
  const currentDay = getCurrentDay();
  const isToday = dayNum === currentDay;
  const isVisarjan = dayNum === 7;
  if (!dayData) notFound();

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        <Link href="/festival" className="inline-flex items-center gap-1 text-[#A8A29E] text-sm mb-4 hover:text-[#57534E] transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Festival Diary
        </Link>

        {/* Day Header */}
        <div className="bg-white border border-[#E7E5E4] rounded-lg p-5 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#A8A29E]">
                Day {dayData.day} of 7
              </p>
              <h1 className="text-xl font-bold font-gotu text-[#1C1917] mt-1">
                {dayData.dateMarathi}
              </h1>
              <p className="text-sm font-gotu text-[#57534E] mt-1">
                {dayData.dayOfWeek} · {dayData.dayOfWeekMarathi}
              </p>
            </div>
            <div className="text-right">
              {isToday && (
                <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold bg-[#EA580C] text-white">
                  Today
                </span>
              )}
              {isVisarjan && (
                <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold bg-[#7C2D12] text-white">
                  Visarjan Day
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Day Details */}
        <div className="space-y-3 mb-6">
          {dayData.specialEvent && (
            <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-1">Special Event</p>
              <p className="text-[#1C1917] text-sm font-bold font-gotu">{dayData.specialEvent}</p>
              {dayData.specialEventTime && (
                <p className="text-[#A8A29E] text-xs mt-1">{dayData.specialEventTime}</p>
              )}
            </div>
          )}
          {dayData.description && (
            <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-1">About</p>
              <p className="text-[#57534E] text-sm font-gotu leading-relaxed">{dayData.description}</p>
            </div>
          )}
          {dayData.theme && (
            <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#B45309] font-semibold mb-1">Theme</p>
              <p className="text-[#1C1917] text-sm font-bold font-gotu">{dayData.theme}</p>
            </div>
          )}
        </div>

        {/* Schedule */}
        {schedule && schedule.events.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">Schedule</h2>
            <div className="space-y-2">
              {schedule.events.map((event) => (
                <div key={event.id} className="bg-white border border-[#E7E5E4] rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-right shrink-0 w-16">
                      <p className="text-[#1C1917] text-xs font-mono font-bold">{formatTime12(event.time)}</p>
                      {event.timeEnd && (
                        <p className="text-[#A8A29E] text-[10px] font-mono">{formatTime12(event.timeEnd)}</p>
                      )}
                    </div>
                    <div className="w-px bg-[#E7E5E4] self-stretch shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1C1917] text-sm font-gotu">{event.titleMarathi}</p>
                      <p className="text-[#A8A29E] text-[10px] mt-0.5">
                        {CATEGORY_LABELS[event.category] || event.category}
                      </p>
                      {event.description && (
                        <p className="text-[#A8A29E] text-[11px] font-gotu mt-1">{event.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-6">
          <ShareButton text={`Day ${dayData.day} - ${dayData.dateMarathi}\n${dayData.dayOfWeek} - ${FESTIVAL_CONFIG.name}`} />
        </div>
      </div>
      <BottomNav />
    </>
  );
}
