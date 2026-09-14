import Image from "next/image";
import Link from "next/link";
import { FESTIVAL_CONFIG, FESTIVAL_DAYS } from "@/data/festival";
import { getCurrentDay, isFestivalActive } from "@/lib/utils";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import HomeLive, { JourneyStrip } from "@/components/HomeLive";

export default function HomePage() {
  const currentDay = getCurrentDay();
  const festivalActive = isFestivalActive();
  const todayData = FESTIVAL_DAYS.find((d) => d.day === currentDay);

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

            <div className="relative w-full max-w-[320px] mx-auto overflow-hidden rounded-lg border border-[#E7E5E4] shadow-sm">
              <Image
                src="/ganpati-with-mandal-name.jpeg"
                alt="Ganpati Bappa murti at OM SAI MITRA MANDAL, Kaneri"
                width={640}
                height={853}
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
            LIVE SECTIONS (database-driven, static fallback):
            announcements, happening now, today's schedule
        ═══════════════════════════════════════════ */}
        <HomeLive />

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
            SECTION 7: 7-DAY JOURNEY (database-driven)
        ═══════════════════════════════════════════ */}
        <JourneyStrip />

        {/* ═══════════════════════════════════════════
            SECTION 8: FOOTER
        ═══════════════════════════════════════════ */}
        <footer className="px-5 pb-28 pt-6 border-t border-[#E7E5E4]">
          <div className="text-center space-y-4">
            <Image
              src="/mandal-logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="mx-auto rounded-full"
            />
            <div>
              <p className="text-[10px] text-[#A8A29E] font-semibold">{FESTIVAL_CONFIG.name}</p>
              <p className="text-[9px] text-[#A8A29E]/60 mt-0.5">{FESTIVAL_CONFIG.address}</p>
              <p className="text-[9px] text-[#A8A29E]/60">१४ सप्टेंबर — २० सप्टेंबर २०२६</p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
              {[
                { href: "/", label: "Home" },
                { href: "/festival", label: "Festival" },
                { href: "/aarti", label: "Aarti" },
                { href: "/gallery", label: "Gallery" },
                { href: "/mandal", label: "About" },
                { href: "/location", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[9px] text-[#A8A29E] hover:text-[#7C2D12] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3">
              <a
                href={FESTIVAL_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A8A29E] hover:text-[#7C2D12] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://wa.me/918286328273"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A8A29E] hover:text-[#7C2D12] transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            <p className="text-[9px] text-[#A8A29E]/40">
              © 2026 {FESTIVAL_CONFIG.name}. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
      <BottomNav />
    </>
  );
}


