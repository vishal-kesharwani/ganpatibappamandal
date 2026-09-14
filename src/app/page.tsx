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
  const importantAnnouncements = ANNOUNCEMENTS.filter((a) => a.active && a.priority === "important");

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto">

        {/* ═══════════════════════════════════════════
            SECTION 1: HERO - Devotional / Festival Identity
        ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0 diya-pattern" />

          <div className="relative px-5 pt-8 pb-6">
            {/* Mandala top accent */}
            <p className="text-center text-cream-muted text-[10px] tracking-[0.25em] uppercase mb-1 font-gotu">
              श्री गणेशाय नमः
            </p>

            {/* Hero Image */}
            <div className="relative w-full aspect-square max-w-[260px] mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-saffron/10 blur-3xl" />
              <Image
                src="/ganpati-hero.png"
                alt="Ganpati Bappa"
                fill
                className="object-contain relative z-10 animate-float"
                priority
              />
              <div className="absolute inset-0 rounded-full border border-saffron/10" />
            </div>

            {/* Festival Title */}
            <div className="text-center space-y-2">
              <h1 className="text-display font-gotu text-gradient-saffron">
                गणपती बाप्पा मोरया!
              </h1>
              <p className="text-cream-muted text-sm font-gotu">
                Ganeshotsav 2026
              </p>
              <p className="text-cream-dim text-xs font-gotu">
                १४ सप्टेंबर — २० सप्टेंबर
              </p>
            </div>

            {/* Day Counter - Premium */}
            {festivalActive && currentDay >= 1 && currentDay <= 7 && (
              <div className="mt-6 relative">
                <div className="absolute inset-0 bg-saffron/5 rounded-3xl blur-xl" />
                <div className="relative bg-card-bg border border-card-border rounded-3xl p-5 text-center card-glow">
                  <p className="text-overline text-cream-muted mb-1">Festival Status</p>
                  <p className="text-display font-gotu text-gradient-saffron">
                    Day {currentDay}
                  </p>
                  <p className="text-cream-muted text-xs font-gotu mt-1">
                    of 7 days
                  </p>

                  {/* Progress dots */}
                  <div className="flex items-center justify-center gap-1.5 mt-4">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i < currentDay
                            ? "w-6 bg-saffron"
                            : i === currentDay - 1
                            ? "w-8 bg-gold"
                            : "w-1.5 bg-cream/10"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-cream-dim text-xs font-gotu mt-3">
                    {todayData?.dateMarathi} · {todayData?.dayOfWeekMarathi}
                  </p>
                </div>
              </div>
            )}

            {/* Pre-festival */}
            {!festivalActive && currentDay === 0 && (
              <div className="mt-6 text-center">
                <p className="text-cream-muted text-sm font-gotu">Ganpati Festival starts soon!</p>
                <p className="text-gold text-xl font-bold font-gotu mt-2">१४ सप्टेंबर २०२६</p>
              </div>
            )}

            {/* Post-festival */}
            {!festivalActive && currentDay > 7 && (
              <div className="mt-6 text-center">
                <p className="text-cream-muted text-sm font-gotu">Ganpati Festival 2026 has concluded.</p>
                <p className="text-cream-dim text-xs mt-1">See you next year! गणपती बाप्पा मोरया!</p>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            ANNOUNCEMENTS (if any)
        ═══════════════════════════════════════════ */}
        {importantAnnouncements.length > 0 && (
          <section className="px-4 pb-4">
            {importantAnnouncements.map((ann) => (
              <Link key={ann.id} href="/announcements" className="block bg-red/8 border border-red/20 rounded-2xl p-4 hover:bg-red/15 transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-red text-lg shrink-0 mt-0.5">🔔</span>
                  <div>
                    <p className="text-cream text-sm font-bold">{ann.titleMarathi}</p>
                    <p className="text-cream-muted text-xs mt-1">{ann.descriptionMarathi}</p>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* ═══════════════════════════════════════════
            SECTION 2: HAPPENING NOW - What's next
        ═══════════════════════════════════════════ */}
        {festivalActive && todaySchedule && (
          <section className="px-4 pb-6">
            <NowIndicator schedule={todaySchedule.events} />
          </section>
        )}

        {/* ═══════════════════════════════════════════
            SECTION 3: TODAY'S DIARY - Schedule preview
        ═══════════════════════════════════════════ */}
        {festivalActive && todayData && todaySchedule && (
          <section className="px-4 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-subheading font-bold text-cream font-gotu">Today&apos;s Diary</h2>
                <p className="text-overline text-cream-dim mt-0.5">Day {currentDay} · {todayData.dayOfWeek}</p>
              </div>
              <Link href={`/festival?day=${currentDay}`} className="text-saffron text-xs font-medium hover:text-saffron-light transition-colors">
                View Full →
              </Link>
            </div>

            <div className="surface-card overflow-hidden">
              {/* Day theme header */}
              <div className="gradient-gold px-5 py-3">
                <p className="text-temple-bg font-bold text-sm font-gotu">{todayData.theme}</p>
              </div>

              {/* Timeline */}
              <div className="p-4">
                <div className="space-y-0">
                  {todaySchedule.events.slice(0, 5).map((event, idx) => (
                    <div key={event.id} className="flex items-start gap-3 relative">
                      {/* Timeline line */}
                      <div className="flex flex-col items-center shrink-0 w-6">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${idx === 0 ? "bg-saffron" : "bg-cream/15"}`} />
                        {idx < Math.min(todaySchedule.events.length, 5) - 1 && (
                          <div className="w-px h-8 bg-card-border" />
                        )}
                      </div>

                      {/* Event info */}
                      <div className="flex-1 pb-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-cream text-sm font-gotu">{event.titleMarathi}</p>
                          <span className="text-cream-dim text-[10px] font-mono shrink-0">
                            {formatTime12(event.time)}
                          </span>
                        </div>
                        <p className="text-cream-dim text-[10px] mt-0.5">{event.category}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {todaySchedule.events.length > 5 && (
                  <Link href="/events" className="block text-center text-saffron text-xs mt-3 pt-3 border-t border-card-border">
                    View all {todaySchedule.events.length} events →
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            SECTION 4: AARTI SANGRAHALAYA - Featured
        ═══════════════════════════════════════════ */}
        <section className="px-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-subheading font-bold text-cream font-gotu">Aarti Sangrahalaya</h2>
              <p className="text-overline text-cream-dim mt-0.5">आरती संग्रह</p>
            </div>
            <Link href="/aarti" className="text-saffron text-xs font-medium hover:text-saffron-light transition-colors">
              Explore All →
            </Link>
          </div>

          <div className="space-y-2">
            {[
              { slug: "sukhkarta-dukhharta", title: "सुखकर्ता दुःखहर्ता", subtitle: "Ganpati Aarti", featured: true },
              { slug: "jay-dev-jay-dev", title: "जय देव जय देव", subtitle: "Mangal Murti Aarti" },
              { slug: "mangal-murti-aarti", title: "मंगलमूर्ती आरती", subtitle: "Ganpati Aarti" },
            ].map((aarti) => (
              <Link
                key={aarti.slug}
                href={`/aarti/${aarti.slug}`}
                className={`block surface-card p-4 transition-all ${
                  aarti.featured ? "border-saffron/30 card-glow" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    aarti.featured ? "gradient-saffron" : "bg-saffron/10"
                  }`}>
                    <span className="text-xl">🪔</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-cream font-bold text-base font-gotu truncate">{aarti.title}</p>
                    <p className="text-cream-dim text-xs">{aarti.subtitle}</p>
                  </div>
                  <svg className="w-5 h-5 text-cream-dim shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 5: EXPLORE - Quick navigation
        ═══════════════════════════════════════════ */}
        <section className="px-4 pb-6">
          <h2 className="text-subheading font-bold text-cream font-gotu mb-4">Explore</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: "/festival", label: "Festival Diary", sublabel: "७ दिवस", icon: "📅" },
              { href: "/events", label: "Events", sublabel: "कार्यक्रम", icon: "🎭" },
              { href: "/gallery", label: "Gallery", sublabel: "फोटो", icon: "📸" },
              { href: "/info", label: "Ganpati Info", sublabel: "माहिती", icon: "ℹ️" },
              { href: "/visarjan", label: "Visarjan", sublabel: "विसर्जन", icon: "🌊" },
              { href: "/location", label: "Location", sublabel: "स्थान", icon: "📍" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="surface-card p-4 hover:border-saffron/30 transition-all"
              >
                <span className="text-2xl">{link.icon}</span>
                <p className="text-cream text-sm font-bold mt-2">{link.label}</p>
                <p className="text-cream-dim text-[10px] mt-0.5">{link.sublabel}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 6: FOOTER
        ═══════════════════════════════════════════ */}
        <footer className="px-4 pb-28 pt-6 border-t border-card-border">
          <div className="text-center space-y-3">
            <Image src="/mandal-logo.png" alt="Logo" width={48} height={48} className="mx-auto rounded-full opacity-60" />
            <p className="text-cream-dim text-[10px]">{FESTIVAL_CONFIG.name}</p>
            <p className="text-cream-dim/50 text-[10px]">{FESTIVAL_CONFIG.location}</p>
            <div className="divider-ornate text-[10px]">🙏</div>
            <p className="text-cream-dim/30 text-[9px]">© 2026 All Rights Reserved</p>
          </div>
        </footer>
      </div>
      <BottomNav />
    </>
  );
}

/* ═══════════════════════════════════════════
    Now Indicator - Live/Next event
═══════════════════════════════════════════ */
function NowIndicator({ schedule }: { schedule: Array<{ time: string; timeEnd?: string; titleMarathi: string; category: string }> }) {
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
      <div className="relative">
        <div className="absolute inset-0 bg-red/5 rounded-2xl blur-xl" />
        <div className="relative bg-card-bg border border-red/20 rounded-2xl p-5 card-glow-live">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative w-2.5 h-2.5 bg-red rounded-full">
              <span className="absolute inset-0 rounded-full bg-red animate-ping" />
            </span>
            <span className="text-red text-[10px] font-bold uppercase tracking-wider">Live Now</span>
          </div>
          <p className="text-cream font-bold text-lg font-gotu">{liveEvent.titleMarathi}</p>
          {liveEvent.timeEnd && (
            <p className="text-cream-muted text-xs font-gotu mt-1">
              {formatTime12(liveEvent.time)} – {formatTime12(liveEvent.timeEnd)}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2">
            <div className="h-1 flex-1 bg-card-border rounded-full overflow-hidden">
              <div className="h-full bg-red rounded-full progress-bar" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (nextEvent) {
    const timeUntil = getTimeUntil(nextEvent.time);
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-saffron/5 rounded-2xl blur-xl" />
        <div className="relative bg-card-bg border border-saffron/20 rounded-2xl p-5 card-glow">
          <p className="text-overline text-saffron mb-2">Up Next</p>
          <p className="text-cream font-bold text-lg font-gotu">{nextEvent.titleMarathi}</p>
          <p className="text-cream-muted text-xs mt-1">
            Starts in <span className="text-gold font-bold">{timeUntil}</span>
          </p>
          <div className="mt-3 flex items-center gap-2 text-cream-dim text-[10px]">
            <span>⏰</span>
            <span>{formatTime12(nextEvent.time)}</span>
            <span>·</span>
            <span>{nextEvent.category}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="surface-card p-5 text-center">
      <p className="text-cream-dim text-sm">No more events today.</p>
      <p className="text-cream-dim/50 text-xs mt-1">Come back tomorrow!</p>
    </div>
  );
}
