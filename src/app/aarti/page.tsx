"use client";

import { useState } from "react";
import Link from "next/link";
import { AARTIS, AARTI_CATEGORIES } from "@/data/aartis";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

type Language = "marathi" | "hindi" | "hinglish";
const LANG_OPTIONS: Record<Language, string> = { marathi: "मराठी", hindi: "हिंदी", hinglish: "Hinglish" };

const FEATURED_SLUGS = ["sukhkarta-dukhharta", "jay-dev-jay-dev", "mangal-murti-aarti", "ganpati-aarti-stavan"];

const getCatLabel = (cat: { id: string; label: string }, language: Language) => {
  switch (language) {
    case "hindi":
      return AARTIS.find((a) => a.category === cat.id)?.categoryHindi || cat.label;
    case "hinglish":
      return AARTIS.find((a) => a.category === cat.id)?.categoryHinglish || cat.label;
    default:
      return cat.label;
  }
};

const getTitle = (a: (typeof AARTIS)[0], language: Language) => {
  switch (language) {
    case "hindi":
      return a.titleHindi;
    case "hinglish":
      return a.titleHinglish;
    default:
      return a.titleMarathi;
  }
};

const getCategoryForAarti = (a: (typeof AARTIS)[0], language: Language) => {
  switch (language) {
    case "hindi":
      return a.categoryHindi;
    case "hinglish":
      return a.categoryHinglish;
    default:
      return a.categoryMarathi;
  }
};

export default function AartiPage() {
  const [language, setLanguage] = useState<Language>("marathi");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredAartis = AARTIS.filter((a) => {
    const matchesSearch =
      !search ||
      getTitle(a, language).toLowerCase().includes(search.toLowerCase()) ||
      a.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredAartis = AARTIS.filter((a) => FEATURED_SLUGS.includes(a.slug));

  const activeCategories = AARTI_CATEGORIES.filter((cat) =>
    AARTIS.some((a) => a.category === cat.id)
  );

  const showFeatured = !search && !selectedCategory;

  return (
    <>
      <Header />
      <main
        className="min-h-screen pb-24"
        style={{ backgroundColor: "#FAF7F2" }}
      >
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Title */}
          <div className="text-center mb-6">
            <h1
              className="text-xl font-semibold font-gotu tracking-wide"
              style={{ color: "#1C1917" }}
            >
              Aarti Sangrahalaya
            </h1>
            <p
              className="text-xs mt-1 font-gotu"
              style={{ color: "#A8A29E" }}
            >
              आरती संग्रह
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-center gap-2 mb-5">
            {(Object.keys(LANG_OPTIONS) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className="rounded-full px-4 py-1.5 text-xs transition-colors"
                style={
                  language === lang
                    ? { backgroundColor: "#7C2D12", color: "#FFFFFF" }
                    : {
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E7E5E4",
                        color: "#57534E",
                      }
                }
              >
                {LANG_OPTIONS[lang]}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-5">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#A8A29E"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search aartis..."
                className="w-full rounded-lg pl-10 pr-4 py-3 text-sm transition-colors outline-none"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E7E5E4",
                  color: "#1C1917",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#EA580C";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#E7E5E4";
                }}
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-5 -mx-4 px-4 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className="shrink-0 rounded-full px-4 py-1.5 text-xs transition-colors"
              style={
                !selectedCategory
                  ? { backgroundColor: "#7C2D12", color: "#FFFFFF" }
                  : {
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E7E5E4",
                      color: "#57534E",
                    }
              }
            >
              All ({AARTIS.length})
            </button>
            {activeCategories.map((cat) => {
              const count = AARTIS.filter((a) => a.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategory(isSelected ? null : cat.id)
                  }
                  className="shrink-0 rounded-full px-4 py-1.5 text-xs transition-colors whitespace-nowrap"
                  style={
                    isSelected
                      ? { backgroundColor: "#7C2D12", color: "#FFFFFF" }
                      : {
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E7E5E4",
                          color: "#57534E",
                        }
                  }
                >
                  {getCatLabel(cat, language)} ({count})
                </button>
              );
            })}
          </div>

          {/* Featured Aartis */}
          {showFeatured && featuredAartis.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                {featuredAartis.slice(0, 2).map((aarti) => (
                  <Link
                    key={aarti.id}
                    href={`/aarti/${aarti.slug}`}
                    className="block rounded-lg p-4 transition-colors"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E7E5E4",
                    }}
                  >
                    <p
                      className={`text-sm font-semibold truncate ${
                        language === "hinglish" ? "" : "font-gotu"
                      }`}
                      style={{ color: "#1C1917" }}
                    >
                      {getTitle(aarti, language)}
                    </p>
                    <p
                      className="text-[10px] mt-1 font-gotu"
                      style={{ color: "#A8A29E" }}
                    >
                      {getCategoryForAarti(aarti, language)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          {showFeatured && (
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px" style={{ backgroundColor: "#E7E5E4" }} />
              <span className="text-[10px]" style={{ color: "#A8A29E" }}>
                ✦
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#E7E5E4" }} />
            </div>
          )}

          {/* All Aartis List */}
          <div className="space-y-3">
            {filteredAartis.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm" style={{ color: "#57534E" }}>
                  No aartis found
                </p>
                <p className="text-xs mt-1" style={{ color: "#A8A29E" }}>
                  Try a different search or category
                </p>
              </div>
            )}

            {filteredAartis.map((aarti) => (
              <Link
                key={aarti.id}
                href={`/aarti/${aarti.slug}`}
                className="flex items-center gap-4 rounded-lg p-4 transition-colors"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E7E5E4",
                }}
              >
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    border: "1.5px solid #7C2D12",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#7C2D12" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold truncate ${
                      language === "hinglish" ? "" : "font-gotu"
                    }`}
                    style={{ color: "#1C1917" }}
                  >
                    {getTitle(aarti, language)}
                  </p>
                  <p
                    className="text-[10px] mt-0.5 font-gotu"
                    style={{ color: "#A8A29E" }}
                  >
                    {getCategoryForAarti(aarti, language)}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#A8A29E"
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

          {/* Aarti Timings Link */}
          <div className="mt-8 text-center">
            <Link
              href="/aarti/timings"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
              style={{
                backgroundColor: "#7C2D12",
                color: "#FFFFFF",
              }}
            >
              Aarti Timings
            </Link>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
