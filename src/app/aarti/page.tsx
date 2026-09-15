"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const AARTI_CATEGORIES = [
  { id: "ganpati", label: "गणपती", labelEn: "Ganpati" },
  { id: "shiva", label: "शिव", labelEn: "Shiva" },
  { id: "devi", label: "देवी", labelEn: "Devi" },
  { id: "vitthal", label: "विठ्ठल", labelEn: "Vitthal" },
  { id: "dattatreya", label: "दत्तात्रेय", labelEn: "Dattatreya" },
  { id: "hanuman", label: "हनुमान / मारुती", labelEn: "Hanuman / Maruti" },
  { id: "krishna", label: "कृष्ण", labelEn: "Krishna" },
  { id: "ram", label: "राम", labelEn: "Rama" },
  { id: "vishnu", label: "विष्णु", labelEn: "Vishnu" },
  { id: "sai", label: "साईं", labelEn: "Sai Baba" },
  { id: "other", label: "इतर", labelEn: "Other" },
];

const AARTI_TYPES: { id: string; label: string; labelEn: string }[] = [
  { id: "aarti", label: "आरती", labelEn: "Aarti" },
  { id: "stotra", label: "स्तोत्र", labelEn: "Stotra" },
  { id: "prayer", label: "प्रार्थना", labelEn: "Prayer" },
  { id: "bhupali", label: "भुपाली", labelEn: "Bhupali" },
  { id: "dhuparti", label: "धुपारती", labelEn: "Dhuparti" },
  { id: "shej", label: "शेज", labelEn: "Shej" },
  { id: "nirop", label: "निरोप", labelEn: "Nirop" },
  { id: "chalisa", label: "चालीसा", labelEn: "Chalisa" },
  { id: "mantra", label: "मंत्र", labelEn: "Mantra" },
];

const AARTI_LANGUAGES: { id: string; label: string; labelEn: string }[] = [
  { id: "marathi", label: "मराठी", labelEn: "Marathi" },
  { id: "hindi", label: "हिंदी", labelEn: "Hindi" },
  { id: "sanskrit", label: "संस्कृत", labelEn: "Sanskrit" },
  { id: "other", label: "इतर", labelEn: "Other" },
];

const LANGUAGE_FILTERS = ["all", "marathi", "hindi", "sanskrit"] as const;
const CATEGORY_FILTERS = [
  "all", "ganpati", "shiva", "devi", "vitthal", "dattatreya",
  "hanuman", "krishna", "ram", "vishnu", "sai", "other",
] as const;
const TYPE_FILTERS = ["all", "aarti", "stotra", "chalisa", "mantra", "prayer"] as const;

export default function AartiPage() {
  const [search, setSearch] = useState("");
  const [activeLanguage, setActiveLanguage] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeType, setActiveType] = useState<string>("all");
  const [aartis, setAartis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (activeLanguage !== "all") params.set("language", activeLanguage);
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (activeType !== "all") params.set("type", activeType);

    const url = `/api/aartis?${params.toString()}`;
    const ctrl = new AbortController();
    setLoading(true);

    fetch(url, { signal: ctrl.signal })
      .then((res) => res.json())
      .then((data) => {
        setAartis(data);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setLoading(false);
      });

    return () => ctrl.abort();
  }, [search, activeLanguage, activeCategory, activeType]);

  const publishedAartis = aartis.filter((a) => a.published);

  const filtered = publishedAartis.filter((a) => {
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.titleDevanagari.includes(search) ||
      a.deity.toLowerCase().includes(search.toLowerCase());
    const matchesLang = activeLanguage === "all" || a.language === activeLanguage;
    const matchesCat = activeCategory === "all" || a.category === activeCategory;
    const matchesType = activeType === "all" || a.type === activeType;
    return matchesSearch && matchesLang && matchesCat && matchesType;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen pb-24" style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #FFFBF5 40%, #F5EDE0 100%)" }}>
        {/* Decorative maroon accent bar */}
        <div className="w-full h-1.5 bg-[#7C2D12]" />

        <div className="max-w-lg mx-auto px-4 py-6">

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-gotu font-bold" style={{ color: "#1C1917" }}>
              Aarti Sangrahalaya
            </h1>
            <p className="text-xs mt-1 font-gotu" style={{ color: "#78716C" }}>
              आरती संग्रह
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-5">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#78716C"
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
                className="w-full bg-[#FFFBF5] border-2 border-[#D6D3D1] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#44403C] placeholder:text-[#78716C] outline-none transition-colors focus:border-[#EA580C]"
              />
            </div>
          </div>

          {/* Language Filter Chips */}
          <div className="mb-3">
            <p className="text-[10px] uppercase tracking-wider font-medium mb-2" style={{ color: "#78716C" }}>
              Language
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {LANGUAGE_FILTERS.map((lang) => {
                const isActive = activeLanguage === lang;
                const label = lang === "all" ? "All" : AARTI_LANGUAGES.find((l) => l.id === lang)?.labelEn ?? lang;
                return (
                  <button
                    key={lang}
                    onClick={() => setActiveLanguage(lang)}
                    aria-pressed={isActive}
                    className="chip"
                    data-active={isActive}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="mb-3">
            <p className="text-[10px] uppercase tracking-wider font-medium mb-2" style={{ color: "#78716C" }}>
              Deity
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {CATEGORY_FILTERS.map((cat) => {
                const isActive = activeCategory === cat;
                const label = cat === "all" ? "All" : AARTI_CATEGORIES.find((c) => c.id === cat)?.labelEn ?? cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className="chip"
                    data-active={isActive}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Type Filter Chips */}
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-wider font-medium mb-2" style={{ color: "#78716C" }}>
              Type
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {TYPE_FILTERS.map((typ) => {
                const isActive = activeType === typ;
                const label = typ === "all" ? "All" : AARTI_TYPES.find((t) => t.id === typ)?.labelEn ?? typ;
                return (
                  <button
                    key={typ}
                    onClick={() => setActiveType(typ)}
                    aria-pressed={isActive}
                    className="chip"
                    data-active={isActive}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-xs mb-4" style={{ color: "#78716C" }}>
            {loading ? "Loading..." : `Showing ${filtered.length} of ${publishedAartis.length} aartis`}
          </p>

          {/* Aarti List */}
          <div className="space-y-3">
            {loading ? (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-[#FFFBF5] border border-[#D6D3D1] rounded-lg p-4">
                    <div className="h-4 w-48 rounded bg-[#E7E5E4]" />
                    <div className="mt-2 h-3 w-24 rounded bg-[#E7E5E4]" />
                    <div className="mt-2 flex gap-1.5">
                      <div className="h-4 w-16 rounded-full bg-[#E7E5E4]" />
                      <div className="h-4 w-16 rounded-full bg-[#E7E5E4]" />
                    </div>
                  </div>
                ))}
              </>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm" style={{ color: "#44403C" }}>
                  No aartis found matching your filters
                </p>
              </div>
            ) : null}

            {filtered.map((aarti) => (
              <Link
                key={aarti.id}
                href={`/aarti/${aarti.slug}`}
                className="block bg-[#FFFBF5] border border-[#D6D3D1] rounded-lg p-4 transition-colors hover:border-[#EA580C]/50 hover:bg-[#FFF8F0]"
              >
                <p className="text-sm font-bold font-gotu" style={{ color: "#44403C" }}>
                  {aarti.title}
                </p>

                {aarti.titleDevanagari && aarti.titleDevanagari !== aarti.title && (
                  <p className="text-xs mt-0.5" style={{ color: "#44403C" }}>
                    {aarti.titleDevanagari}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="bg-[#7C2D12] text-white text-[10px] rounded-full px-2 py-0.5 font-medium">
                    {aarti.deity}
                  </span>
                  <span className="bg-[#FDE68A] text-[#78350F] text-[10px] rounded-full px-2 py-0.5 font-medium">
                    {AARTI_LANGUAGES.find((l) => l.id === aarti.language)?.labelEn ?? aarti.language}
                  </span>
                  <span className="bg-[#E7E5E4] text-[#1C1917] text-[10px] rounded-full px-2 py-0.5 font-medium">
                    {AARTI_TYPES.find((t) => t.id === aarti.type)?.labelEn ?? aarti.type}
                  </span>
                  {aarti.verified && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-[#047857] font-medium">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Aarti Timings Link */}
          <div className="mt-8 text-center">
            <Link
              href="/aarti/timings"
              className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white transition-colors bg-[#7C2D12] hover:bg-[#6B2710] shadow-lg shadow-[#7C2D12]/30"
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
