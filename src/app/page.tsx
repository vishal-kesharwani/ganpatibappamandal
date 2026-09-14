import Image from "next/image";
import Link from "next/link";
import { FESTIVAL_CONFIG, FESTIVAL_DAYS } from "@/data/festival";
import { DAILY_SCHEDULES } from "@/data/schedule";
import { ANNOUNCEMENTS } from "@/data/announcements";
import { getCurrentDay, isFestivalActive, formatTime12, getTimeUntil } from "@/lib/utils";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

export default function HomePage() {
  const currentDay = getCurrentDay();
  const festivalActive = isFestivalActive();
  const todayData = FESTIVAL_DAYS.find((d) => d.day === currentDay);
  const todaySchedule = DAILY_SCHEDULES.find((s) => s.day === currentDay);
  const importantAnnouncements = ANNOUNCEMENTS.filter(
    (a) => a.active && a.priority === "important"
  );

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto bg-[#FAF7F2] min-h-screen">

        {/* ═══════════════════════════════════════════
            SECTION 1: HERO
        ═══════════════════════════════════════════ */}
        <section className="px-5 pt-10 pb-8">
          <div className="text-center space-y-4">
            <p className="text-[#7C2D12] text-[10px] tracking-[0.25em] uppercase font-gotu">
              श्री गणेशाय नमः
            </p>

            <div className="relative w-full max-w-[200px] mx-auto">
              <Image
                src="/ganpati-hero.png"
                alt="Ganpati Bappa"
                width={200}
                height={200}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-[2rem] leading-tight font-gotu text-[#1C1917]">
                गणपती बाप्पा मोरया!
              </h1>
              <p className="text-sm text-[#57534E]">
                Ganeshotsav 2026
              </p>
              <p className="text-xs text-[#A8A29E] font-gotu">
                १४ सप्टेंबर — २० सप्टेंबर
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 2: DAY COUNTER
        ═══════════════════════════════════════════ */}
        {festivalActive && currentDay >= 1 && currentDay <= 7 && (
          <section className="px-5 pb-8">
            <div className="bg-white border border-[#E7E5E4] rounded-lg p-6 text-center">
              <p className="text-[10px] text-[#A8A29E] uppercase tracking-wider mb-2">
                Festival Status
              </p>
              <p className="text-3xl font-gotu text-[#7C2D12]">
                Day {currentDay} of 7
              </p>

              <div className="flex items-center justify-center gap-2 mt-5">
                {Array.from({ length: 7 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i < currentDay
                        ? "bg-[#EA580C]"
                        : i === currentDay - 1
                        ? "bg-[#7C2D12] ring-2 ring-[#7C2D12]/20"
                        : "bg-[#E7E5E4]"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs text-[#A8A29E] font-gotu mt-4">
                {todayData?.dateMarathi} · {todayData?.dayOfWeekMarathi}
              </p>
            </div>
          </section>
        )}

        {/* Pre-festival */}
        {!festivalActive && currentDay === 0 && (
          <section className="px-5 pb-8">
            <div className="text-center">
              <p className="text-sm text-[#57534E]">Ganpati Festival starts soon!</p>
              <p className="text-[#7C2D12] text-xl font-bold font-gotu mt-2">
                १४ सप्टेंबर २०२६
              </p>
            </div>
          </section>
        )}

        {/* Post-festival */}
        {!festivalActive && currentDay > 7 && (
          <section className="px-5 pb-8">
            <div className="text-center">
              <p className="text-sm text-[#57534E]">Ganpati Festival 2026 has concluded.</p>
              <p className="text-xs text-[#A8A29E] mt-1">
                See you next year! गणपती बाप्पा मोरया!
              </p>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            SECTION 3: ANNOUNCEMENTS
        ═══════════════════════════════════════════ */}
        {importantAnnouncements.length > 0 && (
          <section className="px-5 pb-8">
            {importantAnnouncements.map((ann) => (
              <Link
                key={ann.id}
                href="/announcements"
                className="block bg-[#FEF3C7] border border-amber-200 rounded-lg p-4 hover:bg-[#FDE68A]/30 transition-colors"
              >
                <p className="text-[#1C1917] text-sm font-bold font-gotu">
                  {ann.titleMarathi}
                </p>
                <p className="text-[#57534E] text-xs mt-1">
                  {ann.descriptionMarathi}
                </p>
              </Link>
            ))}
          </section>
        )}

        {/* ═══════════════════════════════════════════
            SECTION 4: HAPPENING NOW / UP NEXT
        ═══════════════════════════════════════════ */}
        {festivalActive && todaySchedule && (
          <section className="px-5 pb-8">
            <NowIndicator schedule={todaySchedule.events} />
          </section>
        )}

        {/* ═══════════════════════════════════════════
            SECTION 5: TODAY'S SCHEDULE
        ═══════════════════════════════════════════ */}
        {festivalActive && todayData && todaySchedule && (
          <section className="px-5 pb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-[#1C1917]">
                  Today&apos;s Schedule
                </h2>
                <p className="text-[10px] text-[#A8A29E] mt-0.5">
                  Day {currentDay} · {todayData.dayOfWeek}
                </p>
              </div>
              <Link
                href={`/festival?day=${currentDay}`}
                className="text-xs text-[#EA580C] font-medium hover:text-[#7C2D12] transition-colors"
              >
                View Full →
              </Link>
            </div>

            <div className="bg-white border border-[#E7E5E4] rounded-lg p-4">
              <div className="space-y-0">
                {todaySchedule.events.slice(0, 5).map((event, idx) => (
                  <div key={event.id} className="flex items-start gap-3 relative">
                    <div className="flex flex-col items-center shrink-0 w-6">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 ${
                          idx === 0 ? "bg-[#EA580C]" : "bg-[#E7E5E4]"
                        }`}
                      />
                      {idx < Math.min(todaySchedule.events.length, 5) - 1 && (
                        <div className="w-px h-8 bg-[#E7E5E4]" />
                      )}
                    </div>

                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-[#1C1917] font-gotu">
                          {event.titleMarathi}
                        </p>
                        <span className="text-[10px] text-[#A8A29E] font-mono shrink-0">
                          {formatTime12(event.time)}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#A8A29E] mt-0.5">
                        {event.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {todaySchedule.events.length > 5 && (
                <Link
                  href="/events"
                  className="block text-center text-xs text-[#EA580C] mt-3 pt-3 border-t border-[#E7E5E4]"
                >
                  View all {todaySchedule.events.length} events →
                </Link>
              )}
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            SECTION 6: AARTI SANGRAHALAYA
        ═══════════════════════════════════════════ */}
        <section className="px-5 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#1C1917] font-gotu">
                Aarti Sangrahalaya
              </h2>
              <p className="text-[10px] text-[#A8A29E] mt-0.5">आरती संग्रह</p>
            </div>
            <Link
              href="/aarti"
              className="text-xs text-[#EA580C] font-medium hover:text-[#7C2D12] transition-colors"
            >
              Explore All →
            </Link>
          </div>

          <div className="space-y-2">
            {[
              {
                slug: "sukhkarta-dukhharta",
                title: "सुखकर्ता दुःखहर्ता",
                subtitle: "Ganpati Aarti",
              },
              {
                slug: "jay-dev-jay-dev",
                title: "जय देव जय देव",
                subtitle: "Mangal Murti Aarti",
              },
              {
                slug: "mangal-murti-aarti",
                title: "मंगलमूर्ती आरती",
                subtitle: "Ganpati Aarti",
              },
            ].map((aarti) => (
              <Link
                key={aarti.slug}
                href={`/aarti/${aarti.slug}`}
                className="flex items-center justify-between bg-white border border-[#E7E5E4] rounded-lg p-4 hover:border-[#EA580C]/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#1C1917] font-gotu truncate">
                    {aarti.title}
                  </p>
                  <p className="text-[10px] text-[#A8A29E] mt-0.5">
                    {aarti.subtitle}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-[#A8A29E] shrink-0 ml-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 7: 7-DAY JOURNEY
        ═══════════════════════════════════════════ */}
        <section className="pb-8">
          <div className="px-5 mb-4">
            <h2 className="text-base font-bold text-[#1C1917]">
              7-Day Journey
            </h2>
          </div>

          <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
            {FESTIVAL_DAYS.map((day) => {
              const isCurrent = festivalActive && day.day === currentDay;
              const isPast = festivalActive && day.day < currentDay;

              return (
                <Link
                  key={day.day}
                  href={`/festival?day=${day.day}`}
                  className={`shrink-0 w-24 bg-white border rounded-lg p-3 text-center transition-colors ${
                    isCurrent
                      ? "border-[#7C2D12] ring-1 ring-[#7C2D12]/20"
                      : isPast
                      ? "border-[#E7E5E4] opacity-60"
                      : "border-[#E7E5E4]"
                  }`}
                >
                  <p
                    className={`text-2xl font-gotu font-bold ${
                      isCurrent ? "text-[#7C2D12]" : "text-[#1C1917]"
                    }`}
                  >
                    {day.day}
                  </p>
                  <p className="text-[10px] text-[#A8A29E] mt-1 font-gotu">
                    {day.dateMarathi.split(" ")[0]}{" "}
                    {day.dateMarathi.split(" ")[1]}
                  </p>
                  <p className="text-[10px] text-[#57534E] mt-0.5 font-gotu">
                    {day.dayOfWeekMarathi}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 8: FOOTER
        ═══════════════════════════════════════════ */}
        <footer className="px-5 pb-28 pt-6 border-t border-[#E7E5E4]">
          <div className="text-center space-y-3">
            <Image
              src="/mandal-logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="mx-auto rounded-full"
            />
            <p className="text-[10px] text-[#A8A29E]">{FESTIVAL_CONFIG.name}</p>
            <p className="text-[10px] text-[#A8A29E]/60">
              {FESTIVAL_CONFIG.location}
            </p>
            <p className="text-[9px] text-[#A8A29E]/40">
              © 2026 All Rights Reserved
            </p>
          </div>
        </footer>
      </div>
      <BottomNav />
    </>
  );
}

/* ═══════════════════════════════════════════
    Now Indicator
═══════════════════════════════════════════ */
function NowIndicator({
  schedule,
}: {
  schedule: Array<{
    time: string;
    timeEnd?: string;
    titleMarathi: string;
    category: string;
  }>;
}) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let liveEvent = null;
  let nextEvent = null;

  for (const event of schedule) {
    const [sh, sm] = event.time.split(":").map(Number);
    const startMin = sh * 60 + sm;
    if (event.timeEnd) {
      const [eh, em] = event.timeEnd.split(":").map(Number);
      if (currentMinutes >= startMin && currentMinutes <= eh * 60 + em) {
        liveEvent = event;
        break;
      }
    }
    if (startMin > currentMinutes && !nextEvent) nextEvent = event;
  }

  if (liveEvent) {
    return (
      <div className="bg-white border border-[#E7E5E4] rounded-lg p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider">
            Happening Now
          </span>
        </div>
        <p className="text-lg font-bold text-[#1C1917] font-gotu">
          {liveEvent.titleMarathi}
        </p>
        {liveEvent.timeEnd && (
          <p className="text-xs text-[#57534E] font-gotu mt-1">
            {formatTime12(liveEvent.time)} – {formatTime12(liveEvent.timeEnd)}
          </p>
        )}
        <div className="mt-3 flex items-center gap-2 text-[10px] text-[#A8A29E]">
          <span>{liveEvent.category}</span>
        </div>
      </div>
    );
  }

  if (nextEvent) {
    const timeUntil = getTimeUntil(nextEvent.time);
    return (
      <div className="bg-white border border-[#E7E5E4] rounded-lg p-5">
        <p className="text-[10px] text-[#EA580C] uppercase tracking-wider font-bold mb-2">
          Up Next
        </p>
        <p className="text-lg font-bold text-[#1C1917] font-gotu">
          {nextEvent.titleMarathi}
        </p>
        <p className="text-xs text-[#57534E] mt-1">
          Starts in{" "}
          <span className="text-[#7C2D12] font-bold">{timeUntil}</span>
        </p>
        <div className="mt-3 flex items-center gap-2 text-[10px] text-[#A8A29E]">
          <span>{formatTime12(nextEvent.time)}</span>
          <span>·</span>
          <span>{nextEvent.category}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E7E5E4] rounded-lg p-5 text-center">
      <p className="text-sm text-[#57534E]">No more events today.</p>
      <p className="text-xs text-[#A8A29E] mt-1">Come back tomorrow!</p>
    </div>
  );
}
