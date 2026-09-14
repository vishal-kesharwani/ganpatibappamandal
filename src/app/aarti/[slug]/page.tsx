"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AARTIS } from "@/data/aartis";
import { shareText, shareToWhatsApp } from "@/lib/utils";

type Language = "marathi" | "hindi" | "hinglish";

const LANG_LABELS: Record<Language, string> = {
  marathi: "मराठी",
  hindi: "हिंदी",
  hinglish: "Hinglish",
};

export default function AartiDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const aarti = AARTIS.find((a) => a.slug === slug);

  const [fontSize, setFontSize] = useState(22);
  const [isReading, setIsReading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [language, setLanguage] = useState<Language>("marathi");

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) setScrollProgress((scrollTop / docHeight) * 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isReading && "wakeLock" in navigator) {
      navigator.wakeLock.request("screen").catch(() => {});
    }
  }, [isReading]);

  if (!aarti) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[#57534E] text-lg font-gotu">आरती सापडली नाही</p>
          <p className="text-[#A8A29E] text-sm mt-1">Aarti not found</p>
          <Link
            href="/aarti"
            className="text-[#7C2D12] text-sm mt-6 inline-flex items-center gap-1 hover:underline"
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
      case "hindi":
        return aarti.titleHindi;
      case "hinglish":
        return aarti.titleHinglish;
      default:
        return aarti.titleMarathi;
    }
  };

  const getCategory = () => {
    switch (language) {
      case "hindi":
        return aarti.categoryHindi;
      case "hinglish":
        return aarti.categoryHinglish;
      default:
        return aarti.categoryMarathi;
    }
  };

  const getLyrics = () => {
    switch (language) {
      case "hindi":
        return aarti.lyricsHindi;
      case "hinglish":
        return aarti.lyricsHinglish;
      default:
        return aarti.lyrics;
    }
  };

  const getDescription = () => {
    switch (language) {
      case "hindi":
        return aarti.descriptionHindi || aarti.description;
      case "hinglish":
        return aarti.descriptionHinglish || aarti.description;
      default:
        return aarti.description;
    }
  };

  const getShareText = () =>
    `${getTitle()}\n\nAarti Sangrahalaya - OM SAI MITRA MANDAL`;

  const isHinglish = language === "hinglish";
  const fontClass = isHinglish ? "font-sans" : "font-gotu";

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
        <div
          className="h-full bg-[#EA580C] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#FAF7F2] border-b border-[#E7E5E4]">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <Link
            href="/aarti"
            className="text-[#57534E] text-sm flex items-center gap-1 hover:text-[#1C1917] transition-colors"
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
          <h1
            className={`text-sm font-bold font-gotu text-[#1C1917] truncate max-w-[200px]`}
          >
            {getTitle()}
          </h1>
          <div className="w-16" />
        </div>
      </div>

      {/* Controls Bar */}
      <div className="sticky top-[49px] z-30 bg-[#FAF7F2] border-b border-[#E7E5E4]">
        <div className="max-w-lg mx-auto px-4 py-3 space-y-3">
          {/* Language Selector */}
          <div className="flex items-center justify-center gap-2">
            {(Object.keys(LANG_LABELS) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  language === lang
                    ? "bg-[#7C2D12] text-white"
                    : "bg-white border border-[#E7E5E4] text-[#57534E] hover:border-[#D6D3D1]"
                }`}
              >
                {LANG_LABELS[lang]}
              </button>
            ))}
          </div>

          {/* Font Size + Read Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFontSize(Math.max(16, fontSize - 2))}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold bg-white border border-[#E7E5E4] text-[#1C1917] hover:border-[#D6D3D1] transition-colors"
              >
                A−
              </button>
              <span className="text-[10px] w-8 text-center text-[#A8A29E] tabular-nums">
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize(Math.min(36, fontSize + 2))}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold bg-white border border-[#E7E5E4] text-[#1C1917] hover:border-[#D6D3D1] transition-colors"
              >
                A+
              </button>
            </div>

            <button
              onClick={() => {
                setIsReading(!isReading);
                if (!isReading) window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                isReading
                  ? "bg-[#991B1B] text-white"
                  : "bg-[#7C2D12] text-white hover:bg-[#6B2113]"
              }`}
            >
              {isReading ? "Stop Reading" : "Read Mode"}
            </button>
          </div>
        </div>
      </div>

      {/* Aarti Content */}
      <div className="max-w-lg mx-auto px-6 py-10">
        {/* Decorative Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-[#E7E5E4]" />
          <span className="text-[#A8A29E] text-xs">&#10022;</span>
          <div className="flex-1 h-px bg-[#E7E5E4]" />
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

        {/* Category */}
        <p
          className={`text-center text-xs ${fontClass} text-[#A8A29E] mb-8 tracking-wide uppercase`}
        >
          {getCategory()}
        </p>

        {/* Description */}
        {getDescription() && (
          <div className="mb-10 p-4 bg-white border border-[#E7E5E4] rounded-lg">
            <p
              className={`text-sm ${fontClass} leading-relaxed text-[#57534E]`}
            >
              {getDescription()}
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-10">
          <div className="flex-1 h-px bg-[#E7E5E4]" />
          <span className="text-[#A8A29E] text-xs">&#10022;</span>
          <div className="flex-1 h-px bg-[#E7E5E4]" />
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

        {/* Closing Divider */}
        <div className="flex items-center gap-3 my-12">
          <div className="flex-1 h-px bg-[#E7E5E4]" />
          <span className="text-[#A8A29E] text-xs">&#10022;</span>
          <div className="flex-1 h-px bg-[#E7E5E4]" />
        </div>

        {/* Closing Mantra */}
        <div className="text-center mb-8">
          <p className="text-xl font-bold font-gotu text-[#B45309]">
            &#x1F64F; गणपती बाप्पा मोरया! &#x1F64F;
          </p>
        </div>

        {/* Share Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => shareText(getShareText())}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-[#E7E5E4] text-[#57534E] hover:border-[#D6D3D1] transition-colors text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Share
          </button>
          <button
            onClick={() => shareToWhatsApp(getShareText())}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </button>
        </div>
      </div>

      {/* Bottom CTA */}
      {!isReading && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2] to-transparent pointer-events-none">
          <div className="max-w-lg mx-auto pointer-events-auto">
            <button
              onClick={() => {
                setIsReading(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full py-3.5 rounded-lg bg-[#7C2D12] text-white font-bold font-gotu text-sm hover:bg-[#6B2113] transition-colors"
            >
              Start Reading
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
