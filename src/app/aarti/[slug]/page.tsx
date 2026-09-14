"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AARTIS } from "@/data/aartis";
import { shareText, shareToWhatsApp } from "@/lib/utils";

type Language = "marathi" | "hindi" | "hinglish";
const LANG_LABELS: Record<Language, string> = { marathi: "मराठी", hindi: "हिंदी", hinglish: "Hinglish" };

export default function AartiDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const aarti = AARTIS.find((a) => a.slug === slug);
  const [fontSize, setFontSize] = useState(22);
  const [darkMode, setDarkMode] = useState(false);
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
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <span className="text-4xl">🪔</span>
          <p className="text-cream-muted text-lg mt-4">Aarti not found</p>
          <Link href="/aarti" className="text-saffron text-sm mt-4 inline-block">
            ← Back to Library
          </Link>
        </div>
      </div>
    );
  }

  const getTitle = () => {
    switch (language) {
      case "hindi": return aarti.titleHindi;
      case "hinglish": return aarti.titleHinglish;
      default: return aarti.titleMarathi;
    }
  };
  const getCategory = () => {
    switch (language) {
      case "hindi": return aarti.categoryHindi;
      case "hinglish": return aarti.categoryHinglish;
      default: return aarti.categoryMarathi;
    }
  };
  const getLyrics = () => {
    switch (language) {
      case "hindi": return aarti.lyricsHindi;
      case "hinglish": return aarti.lyricsHinglish;
      default: return aarti.lyrics;
    }
  };
  const getDescription = () => {
    switch (language) {
      case "hindi": return aarti.descriptionHindi || aarti.description;
      case "hinglish": return aarti.descriptionHinglish || aarti.description;
      default: return aarti.description;
    }
  };
  const getShareText = () => `${getTitle()}\n\nAarti Sangrahalaya - OM SAI MITRA MANDAL`;
  const isHinglish = language === "hinglish";
  const fontClass = isHinglish ? "font-sans" : "font-gotu";

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black" : "bg-background"}`}>
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-card-bg">
        <div
          className="h-full progress-bar transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky header */}
      <div className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
        darkMode ? "bg-black/95 border-white/10" : "bg-background/95 border-card-border"
      }`}>
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/aarti" className="text-cream-muted text-sm flex items-center gap-1 hover:text-cream transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </Link>
          <h1 className={`text-sm font-bold font-gotu ${darkMode ? "text-white" : "text-cream"}`}>
            {getTitle()}
          </h1>
          <div className="w-16" />
        </div>
      </div>

      {/* Controls bar */}
      <div className={`sticky top-[52px] z-30 backdrop-blur-xl border-b ${
        darkMode ? "bg-black/95 border-white/10" : "bg-background/95 border-card-border"
      }`}>
        <div className="max-w-lg mx-auto px-4 py-3 space-y-3">
          {/* Language selector */}
          <div className="flex items-center justify-center gap-2">
            {(Object.keys(LANG_LABELS) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                  language === lang
                    ? "gradient-saffron text-white font-bold shadow-lg"
                    : darkMode
                    ? "bg-white/10 text-white/50"
                    : "bg-card-bg border border-card-border text-cream-muted"
                }`}
              >
                {LANG_LABELS[lang]}
              </button>
            ))}
          </div>

          {/* Font size + controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFontSize(Math.max(16, fontSize - 2))}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                  darkMode ? "bg-white/10 text-white" : "bg-card-bg border border-card-border text-cream"
                }`}
              >
                A−
              </button>
              <span className={`text-[10px] w-8 text-center ${darkMode ? "text-white/30" : "text-cream-dim"}`}>
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize(Math.min(36, fontSize + 2))}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                  darkMode ? "bg-white/10 text-white" : "bg-card-bg border border-card-border text-cream"
                }`}
              >
                A+
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  darkMode ? "bg-white/10 text-white" : "bg-card-bg border border-card-border text-cream"
                }`}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={() => {
                  setIsReading(!isReading);
                  if (!isReading) window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isReading
                    ? "bg-red text-white"
                    : "gradient-saffron text-white"
                }`}
              >
                {isReading ? "Stop" : "🪔 Read"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Aarti Content */}
      <div className="max-w-lg mx-auto px-6 py-10">
        {/* Diya decoration */}
        <div className="text-center mb-8">
          <span className={`text-5xl ${isReading ? "animate-diya" : ""}`}>🪔</span>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className={`font-bold text-aarti ${fontClass} ${darkMode ? "text-white" : "text-cream"}`}
              style={{ fontSize: `${fontSize + 6}px` }}>
            {getTitle()}
          </h1>
          <p className={`text-sm ${fontClass} mt-2 ${darkMode ? "text-white/40" : "text-cream-muted"}`}>
            {getCategory()}
          </p>
        </div>

        {/* Description */}
        {getDescription() && (
          <div className={`mb-10 p-4 rounded-2xl ${darkMode ? "bg-white/5" : "bg-card-bg border border-card-border"}`}>
            <p className={`text-sm ${fontClass} leading-relaxed ${darkMode ? "text-white/50" : "text-cream-muted"}`}>
              {getDescription()}
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="divider-ornate mb-10 text-cream-dim">✦</div>

        {/* Lyrics */}
        <div
          className={`whitespace-pre-line text-aarti ${fontClass} ${
            darkMode ? "text-white" : "text-cream"
          }`}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: "2",
          }}
        >
          {getLyrics()}
        </div>

        {/* Closing divider */}
        <div className="divider-ornate my-12 text-cream-dim">✦</div>

        {/* Closing mantra */}
        <div className="text-center mb-8">
          <p className={`text-2xl font-bold font-gotu ${darkMode ? "text-yellow-400" : "text-gold"}`}>
            🙏 गणपती बाप्पा मोरया! 🙏
          </p>
        </div>

        {/* Share buttons */}
        <div className="flex gap-3 justify-center mb-8">
          <button
            onClick={() => shareText(getShareText())}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card-bg border border-card-border text-cream/70 hover:bg-saffron/20 transition-all text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Share
          </button>
          <button
            onClick={() => shareToWhatsApp(getShareText())}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all text-sm font-medium"
          >
            WhatsApp
          </button>
        </div>
      </div>

      {/* Bottom CTA (when not reading) */}
      {!isReading && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-background via-background to-transparent">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => {
                setIsReading(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full py-3.5 rounded-2xl gradient-saffron text-white font-bold font-gotu text-sm hover:opacity-90 transition-opacity shadow-lg shadow-saffron/20"
            >
              🪔 Start Reading
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
