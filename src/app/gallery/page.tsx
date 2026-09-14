"use client";

import { useState } from "react";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "ganpati", label: "Ganpati 2026" },
  { id: "decoration", label: "Decoration" },
  { id: "aarti", label: "Aarti" },
  { id: "events", label: "Events" },
  { id: "cultural", label: "Cultural" },
  { id: "behind-scenes", label: "Behind the Scenes" },
  { id: "visarjan", label: "Visarjan" },
  { id: "previous", label: "Previous Years" },
];

const GALLERY_ITEMS = [
  { id: "1", src: "/ganpati-hero.png", alt: "Ganpati Bappa", category: "ganpati" },
  { id: "2", src: "/mandal-logo.png", alt: "Mandal Logo", category: "decoration" },
  { id: "3", src: "/mandal-name.png", alt: "Mandal Name", category: "events" },
  { id: "4", src: "/ganpati-hero.png", alt: "Ganpati Decoration", category: "decoration" },
  { id: "5", src: "/ganpati-hero.png", alt: "Aarti Time", category: "aarti" },
  { id: "6", src: "/ganpati-hero.png", alt: "Cultural Program", category: "cultural" },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    selectedCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Header />
      <main
        className="max-w-lg mx-auto px-4 py-4 pb-24"
        style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}
      >
        <div className="text-center mb-6">
          <h1
            className="text-xl font-bold font-gotu"
            style={{ color: "#1C1917" }}
          >
            Photo Gallery
          </h1>
          <p className="text-xs mt-1" style={{ color: "#A8A29E" }}>
            फोटो गॅलरी
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs transition-all"
              style={{
                backgroundColor:
                  selectedCategory === cat.id ? "#7C2D12" : "#FFFFFF",
                color: selectedCategory === cat.id ? "#FFFFFF" : "#57534E",
                border: `1px solid ${selectedCategory === cat.id ? "#7C2D12" : "#E7E5E4"}`,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setLightbox(item.src)}
              className="relative aspect-square rounded-lg overflow-hidden border hover:opacity-90 transition-all"
              style={{ borderColor: "#E7E5E4" }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm" style={{ color: "#A8A29E" }}>
              No photos in this category yet.
            </p>
          </div>
        )}
      </main>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
          <Image
            src={lightbox}
            alt="Gallery"
            width={800}
            height={600}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        </div>
      )}

      <BottomNav />
    </>
  );
}
