"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { AartiRow } from "@/lib/supabase";
import { shareText, shareToWhatsApp } from "@/lib/utils";
import BottomNav from "@/components/BottomNav";
import AdminAartiBar from "@/components/AdminAartiBar";

type Language = "marathi" | "hindi" | "hinglish";

const LANG_LABELS: Record<Language, string> = {
  marathi: "Marathi",
  hindi: "Hindi",
  hinglish: "Hinglish",
};

const CATEGORY_BADGES: Record<string, string> = {
  ganpati: "Ganpati",
  shiva: "Shiva",
  devi: "Devi",
  vitthal: "Vitthal",
  dattatreya: "Dattatreya",
  hanuman: "Hanuman",
  krishna: "Krishna",
  ram: "Ram",
  vishnu: "Vishnu",
  sai: "Sai Baba",
  other: "Other",
};

const TYPE_BADGES: Record<string, string> = {
  aarti: "आरती",
  stotra: "स्तोत्र",
  prayer: "प्रार्थना",
  bhupali: "भुपाली",
  dhuparti: "धुपारती",
  shej: "शेज",
  nirop: "निरोप",
  chalisa: "चालीसा",
  mantra: "मंत्र",
};

export default function AartiDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [aartiData, setAartiData] = useState<AartiRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [fontSize, setFontSize] = useState(22);
  const [isReading, setIsReading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [language, setLanguage] = useState<Language>("marathi");
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  useEffect(() => {
    fetch(`/api/aartis/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setAartiData(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  const hasTransliteration = Boolean(aartiData?.transliteration);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) setScrollProgress((scrollTop / docHeight) * 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isReading && "wakeLock" in navigator) {
      navigator.wakeLock
        .request("screen")
        .then((sentinel) => setWakeLock(sentinel))
        .catch(() => {});
    }
    return () => {
      if (wakeLock) {
        wakeLock.release();
        setWakeLock(null);
      }
    };
  }, [isReading]);

  if (loading || notFound) {
    return (
      <div className="min-h-screen bg-[#F5EDE0] flex items-center justify-center px-4">
        <div className="text-center">
          {loading ? (
            <>
              <p className="text-[#44403C] text-lg font-gotu">Loading...</p>
              <p className="text-[#78716C] text-sm mt-1">Please wait</p>
              <Link
                href="/aarti"
                className="text-[#7C2D12] text-sm mt-6 inline-flex items-center gap-1 hover:underline font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                Library मध्ये परत जा
              </Link>
            </>
          ) : (
            <>
              <p className="text-[#44403C] text-lg font-gotu">आरती सापडली नाही</p>
              <p className="text-[#78716C] text-sm mt-1">Aarti not found</p>
              <Link
                href="/aarti"
                className="text-[#7C2D12] text-sm mt-6 inline-flex items-center gap-1 hover:underline font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                Library मध्ये परत जा
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!aartiData) {
    return (
      <div className="min-h-screen bg-[#F5EDE0] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[#44403C] text-lg font-gotu">आरती सापडली नाही</p>
          <p className="text-[#78716C] text-sm mt-1">Aarti not found</p>
          <Link
            href="/aarti"
            className="text-[#7C2D12] text-sm mt-6 inline-flex items-center gap-1 hover:underline font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Library मध्ये परत जा
          </Link>
        </div>
      </div>
    );
  }

  const getTitle = () => {
    switch (language) {
      case "hinglish":
        return aartiData.title;
      default:
        return aartiData.titleDevanagari;
    }
  };

  const getLyrics = () => {
    switch (language) {
      case "hinglish":
        return aartiData.transliteration || aartiData.lyrics;
      default:
        return aartiData.lyrics;
    }
  };

  const getShareText = () =>
    `${getTitle()}\n\nAarti Sangrahalaya - OM SAI MITRA MANDAL`;

  const isHinglish = language === "hinglish";
  const fontClass = isHinglish ? "font-sans" : "font-gotu";

  return (
    <div className="min-h-screen bg-[#F5EDE0] bg-gradient-to-b from-[#F5EDE0] via-[#EDE7DB] to-[#F5EDE0]">
      {/* Maroon Accent Strip at Top of Content Area */}
      <div className="h-1.5 bg-[#7C2D12] w-full" />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[#7C2D12]/20">
        <div
          className="h-full bg-[#EA580C] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Header - Maroon */}
      <div style={{ backgroundColor: "#7C2D12" }} className="sticky top-0 z-40 border-b border-[#7C2D12]/80">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <Link
            href="/aarti"
            className="text-sm flex items-center gap-1 aarti-back-link"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </Link>
          <h1 style={{ color: "#FFFFFF" }} className="text-sm font-bold font-gotu truncate max-w-[200px]">
            {getTitle()}
          </h1>
          <div className="w-16" />
        </div>
      </div>

      {/* Controls Bar - Maroon Background */}
      <div className="sticky top-[49px] z-30 bg-[#7C2D12] border-b border-[#7C2D12]/80">
        <div className="max-w-lg mx-auto px-4 py-3 space-y-3">
          {/* Language Toggle — chip-on-dark keeps contrast on the maroon bar */}
          <div className="flex items-center justify-center gap-2">
            {(Object.keys(LANG_LABELS) as Language[]).map((lang) => {
              const disabled = lang === "hinglish" && !hasTransliteration;
              return (
                <button
                  key={lang}
                  onClick={() => !disabled && setLanguage(lang)}
                  disabled={disabled}
                  aria-pressed={language === lang}
                  className="chip chip-on-dark"
                  data-active={language === lang}
                >
                  {LANG_LABELS[lang]}
                </button>
              );
            })}
          </div>

          {/* Font Size + Read Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFontSize(Math.max(16, fontSize - 2))}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold bg-[#1C1917] text-[#FAF7F2] border border-[#1C1917]/50 hover:bg-[#292524] hover:text-[#FAF7F2] hover:border-[#B45309] transition-colors"
              >
                A−
              </button>
              <span className="text-[10px] w-8 text-center text-[#FAF7F2] tabular-nums">
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize(Math.min(36, fontSize + 2))}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold bg-[#1C1917] text-[#FAF7F2] border border-[#1C1917]/50 hover:bg-[#292524] hover:text-[#FAF7F2] hover:border-[#B45309] transition-colors"
              >
                A+
              </button>
            </div>

            <button
              onClick={() => {
                setIsReading(!isReading);
                if (!isReading) window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={isReading
                ? { backgroundColor: "#991B1B", color: "#FFFFFF" }
                : { backgroundColor: "#FFFFFF", color: "#7C2D12", border: "1px solid #D6D3D1" }
              }
              className="px-4 py-2 rounded-lg text-xs font-bold shadow-sm"
            >
              {isReading ? "Stop Reading" : "Read Mode"}
            </button>
          </div>
        </div>
      </div>

      <AdminAartiBar slug={aartiData.slug} aartiId={aartiData.id} />

      {/* Aarti Content */}
      <div className="max-w-lg mx-auto px-6 py-10 pb-28">
        {/* Decorative Divider - Maroon */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-[#7C2D12]" />
          <span className="text-[#7C2D12] text-xs">✦</span>
          <div className="flex-1 h-px bg-[#7C2D12]" />
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h1
            className={`font-bold ${fontClass} text-[#1C1917]`}
            style={{ fontSize: `${fontSize + 6}px` }}
          >
            {getTitle()}
          </h1>
        </div>

        {/* Metadata Badges */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#7C2D12] text-white shadow-sm">
            {aartiData.deity}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#1C1917] text-[#FAF7F2]">
            {aartiData.language}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#1C1917] text-[#FAF7F2]">
            {TYPE_BADGES[aartiData.type] || aartiData.type}
          </span>
        </div>

        {/* Verified Badge - Green */}
        {aartiData?.verified && (
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <svg
              className="w-4 h-4 text-[#065F46]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs text-[#065F46] font-medium bg-[#065F46]/10 px-2 py-0.5 rounded-full">Verified Source</span>
          </div>
        )}

        {/* Source Info */}
        <div className="text-center mb-8">
          {aartiData?.sourceUrl ? (
            <a
              href={aartiData?.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#7C2D12] font-medium hover:underline hover:text-[#6B2113] transition-colors underline-offset-2"
            >
              {aartiData?.source}
            </a>
          ) : (
            <span className="text-xs text-[#78716C] font-medium">{aartiData?.source}</span>
          )}
        </div>

        {/* Description - Warm white card */}
        {aartiData?.description && (
          <div className="mb-8 p-5 bg-[#FFFBF5] border border-[#D6D3D1] rounded-lg shadow-sm">
            <p className={`text-sm ${fontClass} leading-relaxed text-[#44403C]`}>
              {aartiData?.description}
            </p>
          </div>
        )}

        {/* Decorative Divider - Maroon */}
        <div className="flex items-center gap-3 my-10">
          <div className="flex-1 h-px bg-[#7C2D12]" />
          <span className="text-[#7C2D12] text-xs">✦</span>
          <div className="flex-1 h-px bg-[#7C2D12]" />
        </div>

        {/* Lyrics */}
        <div
          className={`whitespace-pre-line ${fontClass} text-[#1C1917]`}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: "2.2",
          }}
        >
          {getLyrics()}
        </div>

        {/* Closing Divider - Maroon */}
        <div className="flex items-center gap-3 my-12">
          <div className="flex-1 h-px bg-[#7C2D12]" />
          <span className="text-[#7C2D12] text-xs">✦</span>
          <div className="flex-1 h-px bg-[#7C2D12]" />
        </div>

        {/* Closing Mantra */}
        <div className="text-center mb-8">
          <p className="text-xl font-bold font-gotu text-[#7C2D12]">
            🙏 गणपती बाप्पा मोरया! 🙏
          </p>
        </div>

        {/* Share Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => shareText(getShareText())}
            style={{ backgroundColor: "#1C1917", color: "#FFFFFF" }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Share
          </button>
          <button
            onClick={() => shareToWhatsApp(getShareText())}
            style={{ backgroundColor: "#25D366", color: "#FFFFFF" }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold shadow-lg"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </button>
        </div>
      </div>

      {/* Bottom CTA */}
      {!isReading && (
        <div className="fixed bottom-[60px] left-0 right-0 z-40 p-4 pointer-events-none">
          <div className="max-w-lg mx-auto pointer-events-auto">
            <button
              onClick={() => {
                setIsReading(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{ backgroundColor: "#7C2D12", color: "#FFFFFF", fontSize: "18px", fontWeight: 700 }}
              className="w-full py-4 rounded-lg font-gotu shadow-xl"
            >
              Start Reading
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
