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

export default async function DayDetailPage({ params }: { params: { day: string } }) {
  const { day: dayStr } = params;
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
        <Link href="/festival" className="inline-flex items-center gap-1 text-cream-muted text-sm mb-4 hover:text-cream transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Festival Diary
        </Link>

        {/* Day Header */}
        <div className={`rounded-2xl border overflow-hidden mb-6 ${isToday ? "border-saffron/30 card-glow" : isVisarjan ? "border-sacred-orange/30" : "border-card-border"}`}>
          <div className={`px-5 py-5 ${isToday ? "gradient-gold" : isVisarjan ? "gradient-sacred" : "bg-card-bg"}`}>
            <p className={`text-[10px] uppercase tracking-wider ${isToday ? "text-temple-bg/60" : "text-cream-dim"}`}>
              Day {dayData.day} of 7
            </p>
            <h1 className={`text-xl font-bold font-gotu ${isToday ? "text-temple-bg" : "text-cream"}`}>
              {dayData.theme}
            </h1>
            <p className={`text-sm font-gotu mt-1 ${isToday ? "text-temple-bg/70" : "text-cream-muted"}`}>
              {dayData.dateMarathi} · {dayData.dayOfWeekMarathi}
            </p>
          </div>
        </div>

        {/* Day Details */}
        <div className="space-y-3 mb-6">
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
            <h2 className="text-subheading font-bold text-cream font-gotu mb-3">Schedule</h2>
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
        <div className="mt-6">
          <ShareButton text={`Day ${dayData.day} - ${dayData.theme}\n${dayData.dateMarathi}\n${FESTIVAL_CONFIG.name}`} />
        </div>
      </div>
      <BottomNav />
    </>
  );
}
