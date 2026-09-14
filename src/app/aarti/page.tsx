"use client";
import { useState } from "react";
import Link from "next/link";
import { AARTIS, AARTI_CATEGORIES } from "@/data/aartis";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

type Language = "marathi" | "hindi" | "hinglish";
const LANG_OPTIONS: Record<Language, string> = { marathi: "मराठी", hindi: "हिंदी", hinglish: "Hinglish" };

const FEATURED_SLUGS = ["sukhkarta-dukhharta", "jay-dev-jay-dev", "mangal-murti-aarti", "ganpati-aarti-stavan"];

export default function AartiPage() {
  const [language, setLanguage] = useState<Language>("marathi");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getCatLabel = (cat: { id: string; label: string }) => {
    switch (language) {
      case "hindi": return AARTIS.find((a) => a.category === cat.id)?.categoryHindi || cat.label;
      case "hinglish": return AARTIS.find((a) => a.category === cat.id)?.categoryHinglish || cat.label;
      default: return cat.label;
    }
  };

  const getTitle = (a: (typeof AARTIS)[0]) => {
    switch (language) {
      case "hindi": return a.titleHindi;
      case "hinglish": return a.titleHinglish;
      default: return a.titleMarathi;
    }
  };

  const filteredAartis = AARTIS.filter((a) => {
    const matchesSearch = !search ||
      getTitle(a).toLowerCase().includes(search.toLowerCase()) ||
      a.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredAartis = AARTIS.filter((a) => FEATURED_SLUGS.includes(a.slug));

  // Get unique categories that have aartis
  const activeCategories = AARTI_CATEGORIES.filter((cat) =>
    AARTIS.some((a) => a.category === cat.id)
  );

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto px-4 py-4 pb-24">
        {/* Title */}
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold text-gradient-saffron font-gotu">Aarti Sangrahalaya</h1>
          <p className="text-cream-dim text-xs mt-1 font-gotu">आरती संग्रह</p>
        </div>

        {/* Language selector */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {(Object.keys(LANG_OPTIONS) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                language === lang
                  ? "gradient-saffron text-white font-bold shadow-lg"
                  : "bg-card-bg border border-card-border text-cream-muted"
              }`}
            >
              {LANG_OPTIONS[lang]}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-dim" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search aartis..."
              className="w-full bg-card-bg border border-card-border rounded-2xl pl-10 pr-4 py-3 text-cream text-sm placeholder:text-cream-dim focus:outline-none focus:border-saffron/50 transition-colors"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-4 -mx-4 px-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              !selectedCategory
                ? "gradient-saffron text-white font-bold"
                : "bg-card-bg border border-card-border text-cream-muted"
            }`}
          >
            All ({AARTIS.length})
          </button>
          {activeCategories.map((cat) => {
            const count = AARTIS.filter((a) => a.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "gradient-saffron text-white font-bold"
                    : "bg-card-bg border border-card-border text-cream-muted"
                }`}
              >
                {getCatLabel(cat)} ({count})
              </button>
            );
          })}
        </div>

        {/* Featured Aartis (only when no search/filter) */}
        {!search && !selectedCategory && (
          <div className="mb-6">
            <h2 className="text-overline text-cream-dim mb-3">Featured</h2>
            <div className="grid grid-cols-2 gap-3">
              {featuredAartis.slice(0, 2).map((aarti) => (
                <Link
                  key={aarti.id}
                  href={`/aarti/${aarti.slug}`}
                  className="surface-card p-4 border-saffron/20 hover:border-saffron/40 transition-all"
                >
                  <div className="text-center">
                    <span className="text-3xl">🪔</span>
                    <p className={`text-cream text-sm font-bold mt-2 truncate ${language === "hinglish" ? "" : "font-gotu"}`}>
                      {getTitle(aarti)}
                    </p>
                    <p className="text-cream-dim text-[10px] mt-1">{aarti.categoryMarathi}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        {!search && !selectedCategory && (
          <div className="divider-ornate text-cream-dim mb-6 text-[10px]">✦</div>
        )}

        {/* Aarti List */}
        <div className="space-y-4">
          {filteredAartis.length === 0 && (
            <div className="text-center py-12">
              <span className="text-4xl">🔍</span>
              <p className="text-cream-muted text-sm mt-3">No aartis found</p>
              <p className="text-cream-dim text-xs mt-1">Try a different search or category</p>
            </div>
          )}

          {!selectedCategory && !search && (
            <h2 className="text-overline text-cream-dim">All Aartis</h2>
          )}

          {filteredAartis.map((aarti) => (
            <Link
              key={aarti.id}
              href={`/aarti/${aarti.slug}`}
              className="block surface-card p-4 hover:border-saffron/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-saffron/10 flex items-center justify-center shrink-0">
                  <span className="text-xl">🪔</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-cream text-sm font-bold truncate ${language === "hinglish" ? "" : "font-gotu"}`}>
                    {getTitle(aarti)}
                  </p>
                  <p className="text-cream-dim text-[10px] mt-0.5">{aarti.categoryMarathi}</p>
                </div>
                <svg className="w-5 h-5 text-cream-dim shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Aarti Timings link */}
        <div className="mt-8 text-center">
          <Link href="/aarti/timings" className="inline-flex items-center gap-2 surface-card px-6 py-3 hover:border-saffron/30 transition-all">
            <span className="text-lg">⏰</span>
            <span className="text-cream text-sm font-medium">Aarti Timings</span>
          </Link>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
